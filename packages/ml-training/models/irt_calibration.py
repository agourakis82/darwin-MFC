"""
Darwin MFC ML: Item Response Theory (IRT) Calibration
2-Parameter Logistic (2PL) model for quiz item calibration.

Model: P(correct | theta) = 1 / (1 + exp(-a(theta - b)))
- a: Discrimination parameter (how well item differentiates abilities)
- b: Difficulty parameter (ability level for 50% correct)
- theta: Student ability parameter
"""
import numpy as np
from scipy.optimize import minimize
from scipy.stats import norm
from typing import Dict, List, Tuple, Optional
import json
from pathlib import Path


def prob_2pl(theta: float, a: float, b: float) -> float:
    """Calculate 2PL probability of correct response.

    Args:
        theta: Student ability
        a: Item discrimination
        b: Item difficulty

    Returns:
        Probability of correct response
    """
    exponent = -a * (theta - b)
    # Prevent overflow
    exponent = np.clip(exponent, -20, 20)
    return 1 / (1 + np.exp(exponent))


def item_information(theta: float, a: float, b: float) -> float:
    """Calculate item information at given ability.

    Args:
        theta: Student ability
        a: Item discrimination
        b: Item difficulty

    Returns:
        Item information value
    """
    p = prob_2pl(theta, a, b)
    return a**2 * p * (1 - p)


def test_information(theta: float, items: Dict[str, Dict[str, float]]) -> float:
    """Calculate total test information.

    Args:
        theta: Student ability
        items: Dict of item_id -> {a, b}

    Returns:
        Total test information
    """
    return sum(item_information(theta, params['a'], params['b'])
               for params in items.values())


class IRT2PL:
    """2-Parameter Logistic IRT model for item calibration."""

    def __init__(self):
        """Initialize IRT model."""
        self.item_params: Dict[str, Dict[str, float]] = {}
        self.abilities: Dict[str, float] = {}

    def _neg_log_likelihood(self, params: np.ndarray,
                           X: np.ndarray,
                           N: int, K: int) -> float:
        """Calculate negative joint log-likelihood.

        Args:
            params: Flattened [thetas, a's, b's]
            X: N x K response matrix
            N: Number of students
            K: Number of items

        Returns:
            Negative log-likelihood
        """
        thetas = params[:N]
        a_params = params[N:N+K]
        b_params = params[N+K:]

        ll = 0.0
        for i in range(N):
            for j in range(K):
                if np.isnan(X[i, j]):
                    continue

                p = prob_2pl(thetas[i], a_params[j], b_params[j])
                p = np.clip(p, 1e-10, 1 - 1e-10)

                if X[i, j] == 1:
                    ll += np.log(p)
                else:
                    ll += np.log(1 - p)

        # L2 regularization
        ll -= 0.01 * (np.sum(thetas**2) +
                     np.sum((a_params - 1)**2) +
                     np.sum(b_params**2))

        return -ll if np.isfinite(ll) else 1e10

    def calibrate(self, X: np.ndarray, item_ids: List[str],
                 student_ids: Optional[List[str]] = None) -> Dict[str, float]:
        """Calibrate item parameters using joint MLE.

        Args:
            X: N x K binary response matrix (students x items)
            item_ids: List of K item identifiers
            student_ids: Optional list of N student identifiers

        Returns:
            Dict with calibration metrics
        """
        N, K = X.shape

        if student_ids is None:
            student_ids = [f"student_{i}" for i in range(N)]

        # Initialize parameters
        init_thetas = np.zeros(N)
        init_a = np.ones(K)

        # Initialize difficulty from proportion correct
        prop_correct = np.nanmean(X, axis=0)
        prop_correct = np.clip(prop_correct, 0.01, 0.99)
        init_b = -np.log(prop_correct / (1 - prop_correct))

        init_params = np.concatenate([init_thetas, init_a, init_b])

        # Bounds
        bounds = (
            [(-4, 4)] * N +      # theta bounds
            [(0.2, 3)] * K +     # a bounds (positive discrimination)
            [(-4, 4)] * K        # b bounds
        )

        # Optimize
        result = minimize(
            self._neg_log_likelihood,
            init_params,
            args=(X, N, K),
            method='L-BFGS-B',
            bounds=bounds,
            options={'maxiter': 500, 'disp': False}
        )

        if not result.success:
            print(f"Warning: Optimization may not have converged: {result.message}")

        # Extract parameters
        thetas = result.x[:N]
        a_params = result.x[N:N+K]
        b_params = result.x[N+K:]

        # Store results
        for j, item_id in enumerate(item_ids):
            self.item_params[item_id] = {
                'a': float(a_params[j]),
                'b': float(b_params[j])
            }

        for i, student_id in enumerate(student_ids):
            self.abilities[student_id] = float(thetas[i])

        return {
            'n_students': N,
            'n_items': K,
            'final_nll': float(result.fun),
            'converged': result.success
        }

    def estimate_ability(self, responses: np.ndarray,
                        item_ids: List[str],
                        prior_mean: float = 0.0,
                        prior_sd: float = 1.0,
                        grid_points: int = 100) -> float:
        """Estimate student ability using EAP (Expected A Posteriori).

        Args:
            responses: Binary response vector
            item_ids: List of item IDs matching responses
            prior_mean: Prior mean for ability
            prior_sd: Prior SD for ability
            grid_points: Number of integration points

        Returns:
            EAP ability estimate
        """
        # Grid for integration
        theta_grid = np.linspace(-4, 4, grid_points)
        d_theta = theta_grid[1] - theta_grid[0]

        # Prior
        prior = norm.pdf(theta_grid, prior_mean, prior_sd)

        # Likelihood
        likelihood = np.ones(grid_points)
        for j, item_id in enumerate(item_ids):
            if item_id not in self.item_params:
                continue
            if np.isnan(responses[j]):
                continue

            params = self.item_params[item_id]
            p = np.array([prob_2pl(th, params['a'], params['b'])
                         for th in theta_grid])
            p = np.clip(p, 1e-10, 1 - 1e-10)

            if responses[j] == 1:
                likelihood *= p
            else:
                likelihood *= (1 - p)

        # Posterior
        posterior = likelihood * prior
        marginal = np.sum(posterior * d_theta)

        if marginal < 1e-10:
            return prior_mean

        # EAP
        eap = np.sum(theta_grid * posterior * d_theta) / marginal
        return float(eap)

    def predict_probability(self, theta: float, item_id: str) -> float:
        """Predict probability of correct response.

        Args:
            theta: Student ability
            item_id: Item identifier

        Returns:
            Probability of correct response
        """
        if item_id not in self.item_params:
            raise ValueError(f"Unknown item: {item_id}")

        params = self.item_params[item_id]
        return prob_2pl(theta, params['a'], params['b'])

    def select_next_item(self, theta: float,
                        available_items: List[str]) -> str:
        """Select most informative item for adaptive testing.

        Args:
            theta: Current ability estimate
            available_items: List of available item IDs

        Returns:
            Item ID with maximum information
        """
        max_info = -1
        best_item = available_items[0]

        for item_id in available_items:
            if item_id not in self.item_params:
                continue
            params = self.item_params[item_id]
            info = item_information(theta, params['a'], params['b'])
            if info > max_info:
                max_info = info
                best_item = item_id

        return best_item

    def save(self, path: str) -> None:
        """Save calibrated parameters to JSON.

        Args:
            path: File path
        """
        data = {
            'item_params': self.item_params,
            'abilities': self.abilities
        }
        with open(path, 'w') as f:
            json.dump(data, f, indent=2)

    @classmethod
    def load(cls, path: str) -> 'IRT2PL':
        """Load model from JSON.

        Args:
            path: File path

        Returns:
            Loaded IRT2PL instance
        """
        with open(path, 'r') as f:
            data = json.load(f)

        model = cls()
        model.item_params = data['item_params']
        model.abilities = data.get('abilities', {})
        return model


def generate_sample_responses(n_students: int = 200,
                             n_items: int = 30) -> Tuple[np.ndarray, List[str]]:
    """Generate synthetic IRT response data.

    Args:
        n_students: Number of students
        n_items: Number of items

    Returns:
        Tuple of (response matrix, item IDs)
    """
    np.random.seed(42)

    # True parameters
    thetas = np.random.normal(0, 1, n_students)
    a_params = np.random.uniform(0.5, 2.0, n_items)
    b_params = np.random.normal(0, 1, n_items)

    # Generate responses
    X = np.zeros((n_students, n_items))
    for i in range(n_students):
        for j in range(n_items):
            p = prob_2pl(thetas[i], a_params[j], b_params[j])
            X[i, j] = np.random.binomial(1, p)

    item_ids = [f"item_{j:03d}" for j in range(n_items)]

    return X, item_ids


if __name__ == '__main__':
    print("Generating sample response data...")
    X, item_ids = generate_sample_responses(200, 30)

    print(f"Data shape: {X.shape}")
    print(f"Overall accuracy: {np.mean(X):.3f}")

    print("\nCalibrating 2PL model...")
    model = IRT2PL()
    metrics = model.calibrate(X, item_ids)

    print(f"\nCalibration results:")
    print(f"  Converged: {metrics['converged']}")
    print(f"  Final NLL: {metrics['final_nll']:.2f}")

    print("\nSample item parameters:")
    for item_id in item_ids[:5]:
        params = model.item_params[item_id]
        print(f"  {item_id}: a={params['a']:.3f}, b={params['b']:.3f}")

    # Demonstrate ability estimation
    print("\nEstimating ability for a new student...")
    new_responses = np.random.binomial(1, 0.7, len(item_ids)).astype(float)
    ability = model.estimate_ability(new_responses, item_ids)
    print(f"  Estimated ability: {ability:.3f}")

    # Save
    output_dir = Path(__file__).parent.parent / 'output'
    output_dir.mkdir(exist_ok=True)
    model.save(str(output_dir / 'irt_params.json'))
    print(f"\nModel saved to {output_dir / 'irt_params.json'}")
