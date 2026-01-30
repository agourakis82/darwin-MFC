"""
Darwin MFC ML: Training Pipeline
Orchestrates training of all ML models for the education platform.
"""
import argparse
import json
import logging
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional

import numpy as np
import pandas as pd

# Import models
import sys
sys.path.insert(0, str(Path(__file__).parent.parent))

from models.pass_predictor import PassPredictor, generate_sample_data, FEATURES
from models.bkt import BKT
from models.irt_calibration import IRT2PL, generate_sample_responses

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('darwin-ml-pipeline')


class TrainingPipeline:
    """Orchestrates training of all Darwin MFC ML models."""

    def __init__(self, output_dir: str = './output', data_dir: Optional[str] = None):
        """Initialize pipeline.

        Args:
            output_dir: Directory for model outputs
            data_dir: Directory containing training data (optional)
        """
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

        self.data_dir = Path(data_dir) if data_dir else None
        self.metrics: Dict[str, Any] = {}
        self.timestamp = datetime.now().isoformat()

    def load_data(self) -> Dict[str, Any]:
        """Load training data from files or generate synthetic data.

        Returns:
            Dictionary with training data for each model
        """
        data = {}

        # Pass Predictor data
        if self.data_dir and (self.data_dir / 'study_behavior.csv').exists():
            logger.info("Loading study behavior data from file...")
            df = pd.read_csv(self.data_dir / 'study_behavior.csv')
            data['pass_predictor'] = {
                'X': df[FEATURES],
                'y': df['pass']
            }
        else:
            logger.info("Generating synthetic study behavior data...")
            X, y = generate_sample_data(n_samples=5000)
            data['pass_predictor'] = {'X': X, 'y': y}

        # BKT data
        if self.data_dir and (self.data_dir / 'practice_sequences.json').exists():
            logger.info("Loading practice sequences from file...")
            with open(self.data_dir / 'practice_sequences.json', 'r') as f:
                sequences = json.load(f)
            data['bkt'] = {'sequences': sequences}
        else:
            logger.info("Generating synthetic practice sequences...")
            # Generate synthetic BKT data
            np.random.seed(42)
            skills = ['antibiotics', 'cardiology', 'endocrinology', 'pediatrics', 'neurology']
            sequences = []
            for _ in range(500):  # 500 students
                seq = []
                for _ in range(np.random.randint(20, 50)):  # 20-50 attempts
                    skill = np.random.choice(skills)
                    # Simulate learning: P(correct) increases with position
                    obs = np.random.binomial(1, 0.5 + 0.3 * np.random.random())
                    seq.append((skill, obs))
                sequences.append(seq)
            data['bkt'] = {'sequences': sequences, 'skills': skills}

        # IRT data
        if self.data_dir and (self.data_dir / 'quiz_responses.csv').exists():
            logger.info("Loading quiz responses from file...")
            df = pd.read_csv(self.data_dir / 'quiz_responses.csv')
            item_cols = [c for c in df.columns if c.startswith('item_')]
            data['irt'] = {
                'X': df[item_cols].values,
                'item_ids': item_cols
            }
        else:
            logger.info("Generating synthetic quiz response data...")
            X, item_ids = generate_sample_responses(n_students=1000, n_items=50)
            data['irt'] = {'X': X, 'item_ids': item_ids}

        return data

    def train_pass_predictor(self, X: pd.DataFrame, y: pd.Series) -> Dict[str, Any]:
        """Train pass predictor models.

        Args:
            X: Features DataFrame
            y: Target Series

        Returns:
            Training metrics
        """
        logger.info("Training Pass Predictor (XGBoost)...")

        predictor = PassPredictor(model_type='xgboost')
        metrics = predictor.train(X, y)

        # Save model
        model_path = self.output_dir / 'pass_predictor'
        predictor.save(str(model_path))
        logger.info(f"Saved to {model_path}")

        # Also train RF for comparison
        logger.info("Training Pass Predictor (Random Forest)...")
        rf_predictor = PassPredictor(model_type='random_forest')
        rf_metrics = rf_predictor.train(X, y)
        rf_predictor.save(str(self.output_dir / 'pass_predictor_rf'))

        # Export ONNX
        try:
            rf_predictor.export_onnx(str(self.output_dir / 'pass_predictor_rf.onnx'))
            logger.info("Exported ONNX model")
        except Exception as e:
            logger.warning(f"ONNX export failed: {e}")

        return {
            'xgboost': metrics,
            'random_forest': rf_metrics
        }

    def train_bkt(self, sequences: list, skills: list = None) -> Dict[str, Any]:
        """Train BKT model.

        Args:
            sequences: List of practice sequences
            skills: List of skill names

        Returns:
            Training metrics
        """
        logger.info("Training BKT model...")

        model = BKT(skills=skills)
        model.fit(sequences, max_iter=100, tol=1e-4)

        # Save model
        model_path = self.output_dir / 'bkt_model.json'
        model.save(str(model_path))
        logger.info(f"Saved to {model_path}")

        return {
            'skills_fitted': list(model.params.keys()),
            'params': model.params
        }

    def train_irt(self, X: np.ndarray, item_ids: list) -> Dict[str, Any]:
        """Train IRT model.

        Args:
            X: Response matrix
            item_ids: Item identifiers

        Returns:
            Training metrics
        """
        logger.info("Calibrating IRT 2PL model...")

        model = IRT2PL()
        metrics = model.calibrate(X, item_ids)

        # Save model
        model_path = self.output_dir / 'irt_params.json'
        model.save(str(model_path))
        logger.info(f"Saved to {model_path}")

        # Compute item statistics
        difficulties = [p['b'] for p in model.item_params.values()]
        discriminations = [p['a'] for p in model.item_params.values()]

        return {
            **metrics,
            'difficulty_mean': float(np.mean(difficulties)),
            'difficulty_std': float(np.std(difficulties)),
            'discrimination_mean': float(np.mean(discriminations)),
            'discrimination_std': float(np.std(discriminations))
        }

    def run(self) -> Dict[str, Any]:
        """Run full training pipeline.

        Returns:
            Complete training metrics
        """
        logger.info("=" * 60)
        logger.info("Darwin MFC ML Training Pipeline")
        logger.info(f"Timestamp: {self.timestamp}")
        logger.info(f"Output: {self.output_dir}")
        logger.info("=" * 60)

        # Load data
        data = self.load_data()

        # Train models
        results = {}

        # 1. Pass Predictor
        logger.info("\n" + "-" * 40)
        logger.info("STAGE 1: Pass Predictor")
        logger.info("-" * 40)
        results['pass_predictor'] = self.train_pass_predictor(
            data['pass_predictor']['X'],
            data['pass_predictor']['y']
        )

        # 2. BKT
        logger.info("\n" + "-" * 40)
        logger.info("STAGE 2: Bayesian Knowledge Tracing")
        logger.info("-" * 40)
        results['bkt'] = self.train_bkt(
            data['bkt']['sequences'],
            data['bkt'].get('skills')
        )

        # 3. IRT
        logger.info("\n" + "-" * 40)
        logger.info("STAGE 3: Item Response Theory")
        logger.info("-" * 40)
        results['irt'] = self.train_irt(
            data['irt']['X'],
            data['irt']['item_ids']
        )

        # Save summary
        summary = {
            'timestamp': self.timestamp,
            'output_dir': str(self.output_dir),
            'results': results
        }

        summary_path = self.output_dir / 'training_summary.json'
        with open(summary_path, 'w') as f:
            json.dump(summary, f, indent=2, default=str)

        logger.info("\n" + "=" * 60)
        logger.info("Training Complete!")
        logger.info(f"Summary saved to: {summary_path}")
        logger.info("=" * 60)

        return results


def main():
    """CLI entrypoint."""
    parser = argparse.ArgumentParser(
        description='Darwin MFC ML Training Pipeline'
    )
    parser.add_argument(
        '--output', '-o',
        default='./output',
        help='Output directory for models'
    )
    parser.add_argument(
        '--data', '-d',
        default=None,
        help='Input data directory (optional, uses synthetic if not provided)'
    )
    parser.add_argument(
        '--model',
        choices=['all', 'pass', 'bkt', 'irt'],
        default='all',
        help='Which model(s) to train'
    )

    args = parser.parse_args()

    pipeline = TrainingPipeline(
        output_dir=args.output,
        data_dir=args.data
    )

    if args.model == 'all':
        pipeline.run()
    else:
        data = pipeline.load_data()

        if args.model == 'pass':
            pipeline.train_pass_predictor(
                data['pass_predictor']['X'],
                data['pass_predictor']['y']
            )
        elif args.model == 'bkt':
            pipeline.train_bkt(
                data['bkt']['sequences'],
                data['bkt'].get('skills')
            )
        elif args.model == 'irt':
            pipeline.train_irt(
                data['irt']['X'],
                data['irt']['item_ids']
            )


if __name__ == '__main__':
    main()
