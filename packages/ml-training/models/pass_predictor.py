"""
Darwin MFC ML: Pass Predictor Model
Predicts quiz pass/fail based on study behavior using Random Forest and XGBoost.

Features:
- study_time: hours spent studying
- flashcards_reviewed: number of flashcards reviewed
- previous_score: score on previous quiz (0-100)
- days_since_last_study: days since last study session
- topic_difficulty: difficulty rating (1-5)
"""
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
import xgboost as xgb
import joblib
import json
from pathlib import Path
from typing import Dict, List, Tuple, Optional

# Feature names for model
FEATURES = [
    'study_time',
    'flashcards_reviewed',
    'previous_score',
    'days_since_last_study',
    'topic_difficulty'
]


class PassPredictor:
    """Ensemble model for predicting quiz pass/fail."""

    def __init__(self, model_type: str = 'xgboost'):
        """Initialize predictor.

        Args:
            model_type: 'random_forest' or 'xgboost'
        """
        self.model_type = model_type
        self.model = None
        self.feature_importance = None

    def train(self, X: pd.DataFrame, y: pd.Series,
              test_size: float = 0.2) -> Dict[str, float]:
        """Train the model.

        Args:
            X: Feature DataFrame
            y: Target Series (0=fail, 1=pass)
            test_size: Fraction for test split

        Returns:
            Dictionary with metrics
        """
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )

        if self.model_type == 'random_forest':
            self.model = RandomForestClassifier(
                n_estimators=100,
                max_depth=10,
                min_samples_split=5,
                random_state=42,
                n_jobs=-1
            )
        else:  # xgboost
            self.model = xgb.XGBClassifier(
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1,
                random_state=42,
                eval_metric='logloss',
                use_label_encoder=False
            )

        self.model.fit(X_train, y_train)

        # Evaluate
        y_pred = self.model.predict(X_test)
        y_proba = self.model.predict_proba(X_test)[:, 1]

        # Cross-validation
        cv_scores = cross_val_score(self.model, X, y, cv=5, scoring='accuracy')

        # Feature importance
        self.feature_importance = dict(zip(
            FEATURES,
            self.model.feature_importances_
        ))

        return {
            'accuracy': float(accuracy_score(y_test, y_pred)),
            'roc_auc': float(roc_auc_score(y_test, y_proba)),
            'cv_mean': float(np.mean(cv_scores)),
            'cv_std': float(np.std(cv_scores)),
            'feature_importance': self.feature_importance
        }

    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """Predict pass/fail.

        Args:
            X: Feature DataFrame

        Returns:
            Array of predictions (0 or 1)
        """
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        return self.model.predict(X)

    def predict_proba(self, X: pd.DataFrame) -> np.ndarray:
        """Get probability of passing.

        Args:
            X: Feature DataFrame

        Returns:
            Array of probabilities [P(fail), P(pass)]
        """
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        return self.model.predict_proba(X)

    def save(self, path: str) -> None:
        """Save model to disk.

        Args:
            path: Path to save model (without extension)
        """
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")

        # Save with joblib
        joblib.dump(self.model, f"{path}.joblib")

        # Save metadata
        metadata = {
            'model_type': self.model_type,
            'features': FEATURES,
            'feature_importance': self.feature_importance
        }
        with open(f"{path}_metadata.json", 'w') as f:
            json.dump(metadata, f, indent=2)

        # Save XGBoost native format if applicable
        if self.model_type == 'xgboost':
            self.model.save_model(f"{path}.json")

    @classmethod
    def load(cls, path: str) -> 'PassPredictor':
        """Load model from disk.

        Args:
            path: Path to model (without extension)

        Returns:
            Loaded PassPredictor instance
        """
        with open(f"{path}_metadata.json", 'r') as f:
            metadata = json.load(f)

        predictor = cls(model_type=metadata['model_type'])
        predictor.model = joblib.load(f"{path}.joblib")
        predictor.feature_importance = metadata.get('feature_importance')

        return predictor

    def export_onnx(self, path: str) -> None:
        """Export model to ONNX format.

        Args:
            path: Path to save ONNX model
        """
        if self.model_type != 'random_forest':
            raise NotImplementedError("ONNX export only supported for Random Forest")

        from skl2onnx import convert_sklearn
        from skl2onnx.common.data_types import FloatTensorType

        initial_type = [('float_input', FloatTensorType([None, len(FEATURES)]))]
        onnx_model = convert_sklearn(self.model, initial_types=initial_type)

        with open(path, 'wb') as f:
            f.write(onnx_model.SerializeToString())


def generate_sample_data(n_samples: int = 1000) -> Tuple[pd.DataFrame, pd.Series]:
    """Generate synthetic training data.

    Args:
        n_samples: Number of samples to generate

    Returns:
        Tuple of (features DataFrame, target Series)
    """
    np.random.seed(42)

    data = {
        'study_time': np.clip(np.random.normal(5, 2, n_samples), 0, 20),
        'flashcards_reviewed': np.random.poisson(50, n_samples),
        'previous_score': np.clip(np.random.normal(75, 15, n_samples), 0, 100),
        'days_since_last_study': np.clip(np.random.exponential(3, n_samples), 0, 30),
        'topic_difficulty': np.clip(np.random.normal(3, 1, n_samples), 1, 5),
    }

    df = pd.DataFrame(data)

    # Generate target based on features (more realistic)
    logit = (
        0.3 * df['study_time'] +
        0.01 * df['flashcards_reviewed'] +
        0.05 * df['previous_score'] -
        0.2 * df['days_since_last_study'] -
        0.5 * df['topic_difficulty'] -
        2.0
    )
    prob = 1 / (1 + np.exp(-logit))
    y = (np.random.random(n_samples) < prob).astype(int)

    return df, pd.Series(y, name='pass')


if __name__ == '__main__':
    # Demo training
    print("Generating sample data...")
    X, y = generate_sample_data(2000)

    print("\nTraining XGBoost model...")
    predictor = PassPredictor(model_type='xgboost')
    metrics = predictor.train(X, y)

    print(f"\nResults:")
    print(f"  Accuracy: {metrics['accuracy']:.4f}")
    print(f"  ROC AUC: {metrics['roc_auc']:.4f}")
    print(f"  CV Accuracy: {metrics['cv_mean']:.4f} (+/- {metrics['cv_std']*2:.4f})")
    print(f"\nFeature Importance:")
    for feat, imp in sorted(metrics['feature_importance'].items(), key=lambda x: -x[1]):
        print(f"  {feat}: {imp:.4f}")

    # Save model
    output_dir = Path(__file__).parent.parent / 'output'
    output_dir.mkdir(exist_ok=True)
    predictor.save(str(output_dir / 'pass_predictor'))
    print(f"\nModel saved to {output_dir}")
