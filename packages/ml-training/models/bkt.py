"""
Darwin MFC ML: Bayesian Knowledge Tracing (BKT)
Tracks student knowledge state over time using the classic BKT model.

Parameters:
- P(L0): Initial knowledge probability
- P(T): Learning/transition probability (from unknown to known)
- P(G): Guess probability (correct answer despite not knowing)
- P(S): Slip probability (incorrect answer despite knowing)
"""
import numpy as np
from typing import List, Dict, Tuple, Optional
from collections import defaultdict
import json
from pathlib import Path


class BKT:
    """Bayesian Knowledge Tracing model for student knowledge estimation."""

    def __init__(self, skills: Optional[List[str]] = None,
                 default_params: Optional[Dict[str, float]] = None):
        """Initialize BKT model.

        Args:
            skills: List of skill/knowledge component names
            default_params: Default BKT parameters {p_l0, p_t, p_g, p_s}
        """
        if default_params is None:
            default_params = {
                'p_l0': 0.3,  # Initial knowledge
                'p_t': 0.1,   # Learning rate
                'p_g': 0.2,   # Guess rate
                'p_s': 0.1    # Slip rate
            }

        self.default_params = default_params
        self.params: Dict[str, Dict[str, float]] = {}
        self.state: Dict[str, float] = {}

        if skills:
            for skill in skills:
                self.params[skill] = default_params.copy()
                self.state[skill] = default_params['p_l0']

    def _forward_backward(self, sequence: List[int], params: Dict[str, float]
                         ) -> Tuple[List[List[float]], List[List[float]], float]:
        """Run forward-backward algorithm.

        Args:
            sequence: List of observations (1=correct, 0=incorrect)
            params: BKT parameters

        Returns:
            Tuple of (alpha, beta, likelihood)
        """
        T = len(sequence)
        if T == 0:
            return [], [], 1.0

        p_l0 = params['p_l0']
        p_t = params['p_t']
        p_g = params['p_g']
        p_s = params['p_s']

        # Emission probabilities
        def emit(state: int, obs: int) -> float:
            if state == 1:  # Knows
                return (1 - p_s) if obs == 1 else p_s
            else:  # Doesn't know
                return p_g if obs == 1 else (1 - p_g)

        # Forward pass
        alpha = []
        obs = sequence[0]
        alpha.append([
            (1 - p_l0) * emit(0, obs),
            p_l0 * emit(1, obs)
        ])

        for t in range(1, T):
            obs = sequence[t]
            prev = alpha[-1]
            # State 0 (doesn't know): can only stay from state 0
            a0 = prev[0] * (1 - p_t) * emit(0, obs)
            # State 1 (knows): can come from 0 (learning) or 1 (staying)
            a1 = (prev[0] * p_t + prev[1]) * emit(1, obs)
            alpha.append([a0, a1])

        likelihood = alpha[-1][0] + alpha[-1][1]

        # Backward pass
        beta = [[1.0, 1.0] for _ in range(T)]

        for t in range(T - 2, -1, -1):
            obs_next = sequence[t + 1]
            b = beta[t + 1]
            # From state 0
            beta[t][0] = (
                (1 - p_t) * emit(0, obs_next) * b[0] +
                p_t * emit(1, obs_next) * b[1]
            )
            # From state 1
            beta[t][1] = emit(1, obs_next) * b[1]

        return alpha, beta, likelihood

    def _em_step(self, sequences: List[List[int]], params: Dict[str, float]
                ) -> Dict[str, float]:
        """Single EM iteration.

        Args:
            sequences: List of observation sequences
            params: Current parameters

        Returns:
            Updated parameters
        """
        # Accumulators for M-step
        gamma_l0_sum = 0.0
        gamma_l0_count = 0
        xi_learn_sum = 0.0
        gamma_0_sum = 0.0
        guess_correct_sum = 0.0
        gamma_0_obs_sum = 0.0
        slip_incorrect_sum = 0.0
        gamma_1_obs_sum = 0.0

        p_l0 = params['p_l0']
        p_t = params['p_t']
        p_g = params['p_g']
        p_s = params['p_s']

        for seq in sequences:
            if len(seq) == 0:
                continue

            alpha, beta, likelihood = self._forward_backward(seq, params)

            if likelihood <= 0:
                continue

            T = len(seq)

            # Compute gammas (posterior state probabilities)
            for t in range(T):
                gamma_0 = (alpha[t][0] * beta[t][0]) / likelihood
                gamma_1 = (alpha[t][1] * beta[t][1]) / likelihood

                if t == 0:
                    gamma_l0_sum += gamma_1
                    gamma_l0_count += 1

                if t < T - 1:
                    gamma_0_sum += gamma_0

                    # Xi for learning transition (0 -> 1)
                    obs_next = seq[t + 1]
                    emit_1_next = (1 - p_s) if obs_next == 1 else p_s
                    xi_01 = (alpha[t][0] * p_t * emit_1_next * beta[t + 1][1]) / likelihood
                    xi_learn_sum += xi_01

                # For guess/slip estimation
                obs = seq[t]
                if obs == 1:
                    guess_correct_sum += gamma_0
                else:
                    slip_incorrect_sum += gamma_1
                gamma_0_obs_sum += gamma_0
                gamma_1_obs_sum += gamma_1

        # M-step: update parameters
        new_p_l0 = gamma_l0_sum / max(gamma_l0_count, 1)
        new_p_t = xi_learn_sum / max(gamma_0_sum, 1e-10)
        new_p_g = guess_correct_sum / max(gamma_0_obs_sum, 1e-10)
        new_p_s = slip_incorrect_sum / max(gamma_1_obs_sum, 1e-10)

        # Constrain parameters to valid range
        return {
            'p_l0': np.clip(new_p_l0, 0.01, 0.99),
            'p_t': np.clip(new_p_t, 0.01, 0.5),
            'p_g': np.clip(new_p_g, 0.01, 0.4),
            'p_s': np.clip(new_p_s, 0.01, 0.3)
        }

    def fit(self, sequences: List[List[Tuple[str, int]]],
            max_iter: int = 100, tol: float = 1e-4) -> None:
        """Fit BKT parameters using EM algorithm.

        Args:
            sequences: List of student sequences, each containing (skill, observation) tuples
            max_iter: Maximum EM iterations
            tol: Convergence tolerance
        """
        # Group sequences by skill
        skill_sequences: Dict[str, List[List[int]]] = defaultdict(list)

        for seq in sequences:
            skill_obs: Dict[str, List[int]] = defaultdict(list)
            for skill, obs in seq:
                skill_obs[skill].append(obs)
            for skill, obs_list in skill_obs.items():
                if obs_list:
                    skill_sequences[skill].append(obs_list)

        # Fit each skill independently
        for skill, seqs in skill_sequences.items():
            params = self.default_params.copy()

            for _ in range(max_iter):
                new_params = self._em_step(seqs, params)

                # Check convergence
                delta = max(abs(new_params[k] - params[k]) for k in params)
                params = new_params

                if delta < tol:
                    break

            self.params[skill] = params
            self.state[skill] = params['p_l0']

    def update(self, skill: str, observation: int) -> float:
        """Update knowledge state after observing a response.

        Args:
            skill: Skill name
            observation: 1 for correct, 0 for incorrect

        Returns:
            Updated knowledge probability
        """
        if skill not in self.params:
            self.params[skill] = self.default_params.copy()
            self.state[skill] = self.default_params['p_l0']

        params = self.params[skill]
        p_ln = self.state[skill]

        p_t = params['p_t']
        p_g = params['p_g']
        p_s = params['p_s']

        # Compute emission probabilities
        if observation == 1:
            p_obs_knows = 1 - p_s
            p_obs_not_knows = p_g
        else:
            p_obs_knows = p_s
            p_obs_not_knows = 1 - p_g

        # Posterior P(knows | observation)
        p_obs = p_obs_knows * p_ln + p_obs_not_knows * (1 - p_ln)
        p_knows_given_obs = (p_obs_knows * p_ln) / max(p_obs, 1e-10)

        # Update with learning transition
        new_p_ln = p_knows_given_obs + (1 - p_knows_given_obs) * p_t

        self.state[skill] = new_p_ln
        return new_p_ln

    def predict(self, skill: str) -> float:
        """Get current knowledge probability for a skill.

        Args:
            skill: Skill name

        Returns:
            Probability of knowing the skill
        """
        if skill not in self.state:
            return self.default_params['p_l0']
        return self.state[skill]

    def predict_correct(self, skill: str) -> float:
        """Predict probability of correct response.

        Args:
            skill: Skill name

        Returns:
            Probability of correct response
        """
        p_knows = self.predict(skill)
        params = self.params.get(skill, self.default_params)

        # P(correct) = P(knows) * (1 - slip) + P(not knows) * guess
        return p_knows * (1 - params['p_s']) + (1 - p_knows) * params['p_g']

    def reset_state(self) -> None:
        """Reset knowledge states to initial values."""
        for skill in self.state:
            self.state[skill] = self.params[skill]['p_l0']

    def save(self, path: str) -> None:
        """Save model parameters to JSON.

        Args:
            path: File path
        """
        data = {
            'default_params': self.default_params,
            'params': self.params,
            'state': self.state
        }
        with open(path, 'w') as f:
            json.dump(data, f, indent=2)

    @classmethod
    def load(cls, path: str) -> 'BKT':
        """Load model from JSON.

        Args:
            path: File path

        Returns:
            Loaded BKT instance
        """
        with open(path, 'r') as f:
            data = json.load(f)

        model = cls(default_params=data['default_params'])
        model.params = data['params']
        model.state = data['state']
        return model


if __name__ == '__main__':
    # Demo
    print("Creating BKT model...")
    skills = ['antibiotics', 'cardiology', 'endocrinology']
    model = BKT(skills=skills)

    # Simulate student practice
    print("\nSimulating student practice on 'antibiotics':")
    observations = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1]

    for i, obs in enumerate(observations):
        p_before = model.predict('antibiotics')
        p_after = model.update('antibiotics', obs)
        print(f"  Trial {i+1}: {'Correct' if obs else 'Wrong'} | "
              f"P(knows): {p_before:.3f} -> {p_after:.3f}")

    print(f"\nFinal P(knows): {model.predict('antibiotics'):.3f}")
    print(f"P(next correct): {model.predict_correct('antibiotics'):.3f}")

    # Save
    output_dir = Path(__file__).parent.parent / 'output'
    output_dir.mkdir(exist_ok=True)
    model.save(str(output_dir / 'bkt_model.json'))
    print(f"\nModel saved to {output_dir / 'bkt_model.json'}")
