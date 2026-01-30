# Darwin MFC ML Training

Machine Learning models for the Darwin MFC medical education platform.

## Models

### 1. Pass Predictor
Predicts quiz pass/fail based on study behavior using:
- **XGBoost** (primary)
- **Random Forest** (alternative)

Features:
- `study_time`: Hours spent studying
- `flashcards_reviewed`: Number of flashcards reviewed
- `previous_score`: Score on previous quiz (0-100)
- `days_since_last_study`: Days since last study session
- `topic_difficulty`: Difficulty rating (1-5)

### 2. Bayesian Knowledge Tracing (BKT)
Tracks student knowledge state over time using classic BKT parameters:
- **P(L0)**: Initial knowledge probability
- **P(T)**: Learning/transition probability
- **P(G)**: Guess probability
- **P(S)**: Slip probability

### 3. Item Response Theory (IRT)
2-Parameter Logistic model for quiz item calibration:
- **a**: Discrimination parameter
- **b**: Difficulty parameter
- **theta**: Student ability parameter

Supports:
- Joint MLE estimation
- EAP ability estimation
- Adaptive item selection

## Installation

```bash
cd packages/ml-training
pip install -r requirements.txt
```

## Usage

### Full Pipeline
```bash
python -m training.pipeline --output ./output
```

### Individual Models
```bash
# Pass Predictor only
python -m training.pipeline --model pass

# BKT only
python -m training.pipeline --model bkt

# IRT only
python -m training.pipeline --model irt
```

### With Custom Data
```bash
python -m training.pipeline --data ./data --output ./output
```

Expected data files:
- `study_behavior.csv` - For Pass Predictor
- `practice_sequences.json` - For BKT
- `quiz_responses.csv` - For IRT

## Output

Models are saved to the output directory:
- `pass_predictor.joblib` - XGBoost model
- `pass_predictor_rf.joblib` - Random Forest model
- `pass_predictor_rf.onnx` - ONNX export
- `bkt_model.json` - BKT parameters
- `irt_params.json` - IRT item parameters
- `training_summary.json` - Metrics summary

## Integration

### TypeScript API
Models are consumed via the Next.js API routes:
- `/api/ai/predict-pass` - Pass prediction
- `/api/ai/knowledge-state` - BKT knowledge tracking
- `/api/ai/ability-estimate` - IRT ability estimation

### ONNX Runtime (Browser)
The Random Forest model can run client-side using ONNX Runtime Web.
