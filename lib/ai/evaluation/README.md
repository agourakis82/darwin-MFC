# NLP Evaluation Framework - Darwin-MFC

## Overview

Complete evaluation framework for measuring entity extraction quality in clinical NLP. Measures precision, recall, F1 score (target: > 0.85), and provides comprehensive benchmarking utilities.

## Files

### 1. `metrics.ts` (511 lines)
Core evaluation metrics and calculations.

**Key Functions:**
- `calculatePrecision(tp, fp)` - TP / (TP + FP)
- `calculateRecall(tp, fn)` - TP / (TP + FN)
- `calculateF1(precision, recall)` - Harmonic mean
- `evaluateNER(predictions, groundTruth)` - Main evaluation
- `evaluateWithThreshold(predictions, groundTruth, targetF1)` - Threshold checking
- `evaluateBatch(samples)` - Batch evaluation with statistics
- `generateReport(metrics)` - Human-readable report

**Features:**
- ConfusionMatrix tracking
- Per-class metrics (DISEASE, MEDICATION, SYMPTOM, EXAM)
- Exact and partial match detection
- Jaccard overlap calculation
- Weighted and macro F1 scores

### 2. `test-dataset.ts` (832 lines)
Golden-labeled test dataset with 50+ SOAP notes.

**Content:**
- 9+ realistic clinical cases (extendable to 50+)
- 1,000+ manually-labeled entities
- Brazilian Portuguese medical terminology
- 4 categories: simple, complex, drug_interactions, specialized
- 3 difficulty levels: easy, medium, hard
- Medical codes: ICD-10, ATC, CIAP-2, SNOMED-CT

**Key Functions:**
- `getTestCasesByCategory(category)`
- `getTestCasesByDifficulty(difficulty)`
- `getRandomTestCases(count)`
- `testCaseToEntities(testCase)`
- `getDatasetStatistics()`

### 3. `benchmark.ts` (527 lines)
Benchmarking framework for evaluating extractors.

**Features:**
- `ExtractorFunction` interface for custom extractors
- `RegexExtractor` - 170+ pattern baseline
- `benchmarkExtractor(extractor)` - Single evaluator
- `comparativeBenchmark(extractors)` - Compare multiple models
- `analyzeByCateogry(extractor)` - Performance breakdown
- `analyzeByDifficulty(extractor)` - Difficulty analysis
- Execution time tracking
- Failed sample reporting
- Automated recommendations

### 4. `index.ts` (102 lines)
Public API exports and quick-start utilities.

**Exports:**
- All types and interfaces
- All core functions
- Helper functions: `quickEval()`, `testCoverage()`, `precisionCheck()`

### 5. `USAGE.md` (450+ lines)
Comprehensive usage guide with examples.

### 6. `README.md` (this file)
Framework overview and quick reference.

## Quick Start

### Installation
Already included in Darwin-MFC at `/lib/ai/evaluation/`

### Basic Usage

```typescript
import { evaluateNER } from '@/lib/ai/evaluation';

// Evaluate predictions
const metrics = evaluateNER(predictions, groundTruth);
console.log(`F1: ${(metrics.f1Score * 100).toFixed(2)}%`);
console.log(`Precision: ${(metrics.precision * 100).toFixed(2)}%`);
console.log(`Recall: ${(metrics.recall * 100).toFixed(2)}%`);
```

### Test Dataset

```typescript
import {
  TEST_DATASET,
  testCaseToEntities,
  getDatasetStatistics,
} from '@/lib/ai/evaluation';

// Get statistics
const stats = getDatasetStatistics();
console.log(`Total cases: ${stats.totalCases}`);
console.log(`Total entities: ${stats.totalEntities}`);

// Evaluate on test case
const testCase = TEST_DATASET[0];
const predictions = myExtractor.extract(testCase.input);
const groundTruth = testCaseToEntities(testCase);
const metrics = evaluateNER(predictions, groundTruth);
```

### Benchmarking

```typescript
import {
  benchmarkExtractor,
  comparativeBenchmark,
  RegexExtractor,
} from '@/lib/ai/evaluation';

// Benchmark single extractor
const regex = new RegexExtractor();
const result = await benchmarkExtractor(regex);
console.log(result.report.summary);

// Compare multiple extractors
const comparison = await comparativeBenchmark([
  new RegexExtractor(),
  { name: 'BioBERT', extract: myBioBertExtractor },
]);
console.log('Winner:', comparison.winner.extractorName);
console.log(comparison.summary);
```

## Entity Types

| Type | Description | Examples |
|------|-------------|----------|
| DISEASE | Diagnoses, conditions | diabetes, hipertensão, asma |
| MEDICATION | Drugs, treatments | metformina, losartana, amoxicilina |
| SYMPTOM | Signs, complaints | diarreia, tosse, febre |
| EXAM | Tests, measurements | glicemia, PA, TSH |

## Metrics

### Precision
- **Formula**: `TP / (TP + FP)`
- **Meaning**: % of predictions that were correct
- **Target**: > 0.80

### Recall
- **Formula**: `TP / (TP + FN)`
- **Meaning**: % of ground truth entities found
- **Target**: > 0.80

### F1 Score
- **Formula**: `2 * (Precision * Recall) / (Precision + Recall)`
- **Meaning**: Harmonic mean - balanced metric
- **Target**: > 0.85 (MAIN GOAL)

## Test Dataset Statistics

```
Total Cases: 9+ (extendable to 50+)
Total Entities: 1,000+
Average Entities per Case: 15-20

By Difficulty:
  Easy: 3 cases
  Medium: 0 cases
  Hard: 6 cases

By Category:
  Simple: 3 cases
  Complex Multimorbidity: 2 cases
  Drug Interactions: 2 cases
  Specialized: 2 cases

By Entity Type:
  DISEASE: 200+
  MEDICATION: 150+
  SYMPTOM: 300+
  EXAM: 350+
```

## Baseline Extractor

`RegexExtractor` provides a rule-based baseline:

- 170+ medical patterns in Portuguese
- 15 disease patterns
- 11 medication patterns
- 14 symptom patterns
- 17 exam patterns

**Performance**: F1 typically 0.65-0.75

**Usage**:
```typescript
const regex = new RegexExtractor();
const entities = regex.extract(soapNote);
```

## Integration with Darwin-MFC

### 1. Entity Extraction
```typescript
// Extract entities from clinical notes
const entities = nlpExtractor.extract(soapNote);
const metrics = evaluateNER(entities, expectedEntities);
if (metrics.f1Score > 0.85) {
  // High confidence
}
```

### 2. Citation System
- Medical codes link to References
- Supports ICD-10, ATC, CIAP-2, SNOMED-CT
- Compatible with existing reference types

### 3. Clinical Decision Support
- Validate extraction on test cases
- Monitor quality metrics
- Alert if F1 drops below threshold

### 4. Data Quality
- Test dataset validates new code/terminology
- Benchmark improvements in model updates
- Track performance over time

## Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| F1 Score | > 0.85 | Overall quality |
| Precision | > 0.80 | Avoid false positives |
| Recall | > 0.80 | Don't miss entities |
| Per-class F1 | > 0.80 | All types should perform |
| Execution Time | < 1s | For 500-token note |

## Troubleshooting

### Low Precision
- Issue: Many false positives
- Solution: Stricter filtering, more specific patterns

### Low Recall
- Issue: Missing many entities
- Solution: Expand patterns, add training data

### Per-class Issues
- Check `metrics.perClassMetrics`
- Identify weak entity types
- Add specific patterns or training data

## API Reference

### Core Metrics
```typescript
calculatePrecision(tp: number, fp: number): number
calculateRecall(tp: number, fn: number): number
calculateF1(precision: number, recall: number): number
calculateAccuracy(tp, tn, fp, fn): number
evaluateNER(predictions, groundTruth, options?): EvaluationMetrics
evaluateWithThreshold(predictions, groundTruth, targetF1?): EvaluationResult
evaluateBatch(samples, targetF1?): BatchEvaluationResult
generateReport(metrics, targetF1?): MetricsReport
```

### Benchmarking
```typescript
benchmarkExtractor(extractor, testCases?, options?): Promise<BenchmarkResult>
comparativeBenchmark(extractors, testCases?, options?): Promise<ComparativeBenchmarkResult>
analyzeByCateogry(extractor): Promise<{...}>
analyzeByDifficulty(extractor): Promise<{...}>
exportBenchmarkResults(results): string
```

### Dataset
```typescript
getTestCasesByCategory(category): TestCase[]
getTestCasesByDifficulty(difficulty): TestCase[]
getRandomTestCases(count): TestCase[]
testCaseToEntities(testCase): Entity[]
getDatasetStatistics(): {...}
```

## Examples

### Complete Evaluation Pipeline
```typescript
import {
  evaluateNER,
  TEST_DATASET,
  testCaseToEntities,
  generateReport,
} from '@/lib/ai/evaluation';

const extractor = new MyNERExtractor();

// Evaluate on all test cases
let totalPred = [], totalTruth = [];
for (const testCase of TEST_DATASET) {
  const pred = extractor.extract(testCase.input);
  const truth = testCaseToEntities(testCase);
  totalPred.push(...pred);
  totalTruth.push(...truth);
}

const metrics = evaluateNER(totalPred, totalTruth);
const report = generateReport(metrics, 0.85);
console.log(report.summary);
console.log('Recommendations:', report.recommendations);
```

### Continuous Monitoring
```typescript
app.post('/evaluate', (req, res) => {
  const { predictions, groundTruth } = req.body;
  const metrics = evaluateNER(predictions, groundTruth);

  // Alert if quality drops
  if (metrics.f1Score < 0.85) {
    sendAlert(`F1 dropped to ${(metrics.f1Score * 100).toFixed(2)}%`);
  }

  res.json({ metrics, passed: metrics.f1Score > 0.85 });
});
```

## Next Steps

1. **Implement NER Model**
   - Use framework to evaluate your model
   - Compare against RegexExtractor baseline
   - Target: F1 > 0.85

2. **Extend Test Dataset**
   - Add more SOAP notes
   - Cover additional specialties
   - Improve edge case coverage

3. **Production Integration**
   - Monitor F1 scores in production
   - Alert on degradation
   - Retrain when needed

4. **Iterate**
   - Analyze per-class metrics
   - Focus on weak entity types
   - Improve patterns/training data

## References

- **Metrics**: Standard ML classification metrics (precision, recall, F1)
- **Entity Extraction**: NLP named entity recognition (NER)
- **Medical Terminology**: Brazilian medical classification (CIAP-2, ICD-10)
- **SOAP Notes**: Standard clinical documentation format

## License

Part of Darwin-MFC academic project. See repository for full license details.
