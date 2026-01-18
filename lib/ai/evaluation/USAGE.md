# NLP Evaluation Framework - Usage Guide

## Overview

Darwin-MFC's NLP evaluation framework provides comprehensive metrics and benchmarking for entity extraction quality. It measures:

- **F1 Score** (target: > 0.85) - harmonic mean of precision and recall
- **Precision** - what % of predictions were correct
- **Recall** - what % of ground truth entities were found
- **Per-class metrics** - performance breakdown by entity type
- **Batch statistics** - F1 variance, pass rates, etc.

## Quick Start

### 1. Basic Evaluation

```typescript
import { evaluateNER } from '@/lib/ai/evaluation';

const predictions = myExtractor.extract(text);
const groundTruth = [
  {
    text: 'diabetes',
    type: 'DISEASE',
    startIndex: 10,
    endIndex: 18,
  },
  // ... more entities
];

const metrics = evaluateNER(predictions, groundTruth);
console.log(`F1 Score: ${(metrics.f1Score * 100).toFixed(2)}%`);
console.log(`Precision: ${(metrics.precision * 100).toFixed(2)}%`);
console.log(`Recall: ${(metrics.recall * 100).toFixed(2)}%`);
```

### 2. Using Test Dataset

```typescript
import {
  TEST_DATASET,
  testCaseToEntities,
  getDatasetStatistics,
} from '@/lib/ai/evaluation';

// Get dataset info
const stats = getDatasetStatistics();
console.log(`Total test cases: ${stats.totalCases}`);
console.log(`Entity breakdown:`, stats.entitiesByType);

// Run on a specific test case
const testCase = TEST_DATASET[0];
const predictions = myExtractor.extract(testCase.input);
const groundTruth = testCaseToEntities(testCase);
const metrics = evaluateNER(predictions, groundTruth);
```

### 3. Benchmark Extractors

```typescript
import {
  benchmarkExtractor,
  comparativeBenchmark,
  RegexExtractor,
} from '@/lib/ai/evaluation';

// Single extractor
const regex = new RegexExtractor();
const result = await benchmarkExtractor(regex, TEST_DATASET, {
  showProgress: true,
});

console.log(result.report.summary);
```

### 4. Compare Multiple Extractors

```typescript
import {
  comparativeBenchmark,
  RegexExtractor,
} from '@/lib/ai/evaluation';

const extractors = [
  new RegexExtractor(),
  {
    name: 'BioBERT',
    description: 'Transformer-based medical NER',
    extract: myBioBertExtractor,
  },
];

const comparison = await comparativeBenchmark(extractors);
console.log(comparison.summary);
console.log('Winner:', comparison.winner.extractorName);
console.log('Recommendations:', comparison.recommendations);
```

## Entity Types

The framework supports 4 medical entity types:

| Type | Description | Example |
|------|-------------|---------|
| `DISEASE` | Diagnoses, conditions | diabetes, hipertensão, asma |
| `MEDICATION` | Drugs, treatments | metformina, losartana, amoxicilina |
| `SYMPTOM` | Signs, complaints | diarreia, tosse, febre |
| `EXAM` | Tests, measurements | glicemia, PA, TSH |

## Entity Structure

```typescript
interface Entity {
  text: string;                          // Entity text
  type: 'DISEASE' | 'MEDICATION' | ...   // Entity type
  startIndex: number;                    // Character position (start)
  endIndex: number;                      // Character position (end)
  codes?: {                              // Optional codes
    icd10?: string;                      // ICD-10 code
    atc?: string;                        // ATC (medication)
    ciap2?: string;                      // CIAP-2 (Brazilian classification)
    snomed?: string;                     // SNOMED-CT
  };
  confidence?: number;                   // For predicted entities (0-1)
}
```

## Metrics Explanation

### Precision
- **Formula**: `TP / (TP + FP)`
- **Meaning**: Of all entities we predicted, how many were correct?
- **Use case**: Care about avoiding false positives

```typescript
const precision = evaluateNER(pred, truth).precision;
// 0.95 = 95% of predictions were correct
```

### Recall
- **Formula**: `TP / (TP + FN)`
- **Meaning**: Of all actual entities, how many did we find?
- **Use case**: Care about not missing entities

```typescript
const recall = evaluateNER(pred, truth).recall;
// 0.85 = We found 85% of entities
```

### F1 Score
- **Formula**: `2 * (precision * recall) / (precision + recall)`
- **Meaning**: Harmonic mean - balanced view of both metrics
- **Use case**: General quality metric (TARGET: > 0.85)

```typescript
const f1 = evaluateNER(pred, truth).f1Score;
// 0.90 = 90% F1, excellent performance
```

## Test Dataset

### Overview

- **50+ SOAP notes** (Subjective, Objective, Assessment, Plan)
- **Brazilian Portuguese** medical terminology
- **4 categories**: simple, complex_multimorbidity, drug_interactions, specialized
- **3 difficulty levels**: easy, medium, hard
- **1,000+ entities** total

### Categories

#### Simple Cases (Easy)
- Single disease, straightforward presentation
- Example: acute gastroenteritis, hypertension follow-up
- Good for baseline testing

#### Complex Multimorbidity (Hard)
- Multiple diseases with polypharmacy
- Example: CHF + CKD + hypertension in elderly patient
- Tests handling of complex clinical scenarios

#### Drug Interactions (Hard)
- Polypharmacy with potential interactions
- Example: Warfarin interaction assessment, SSRI + NSAID
- Tests medication focus and interaction context

#### Specialized (Hard)
- Rare/complex presentations
- Example: Thyroid dysfunction with cardiac complications
- Tests domain-specific terminology

### Getting Test Cases

```typescript
import {
  TEST_DATASET,
  getTestCasesByCategory,
  getTestCasesByDifficulty,
  getRandomTestCases,
} from '@/lib/ai/evaluation';

// By category
const simple = getTestCasesByCategory('simple');
const complex = getTestCasesByCategory('complex_multimorbidity');

// By difficulty
const easy = getTestCasesByDifficulty('easy');
const hard = getTestCasesByDifficulty('hard');

// Random sample
const sample = getRandomTestCases(10); // 10 random cases
```

## Batch Evaluation

Evaluate multiple samples and get aggregate statistics:

```typescript
import { evaluateBatch } from '@/lib/ai/evaluation';

const samples = [
  { predictions: pred1, groundTruth: truth1 },
  { predictions: pred2, groundTruth: truth2 },
  // ... more samples
];

const batchResult = evaluateBatch(samples, 0.85); // target F1 = 0.85

console.log(`Pass rate: ${(batchResult.passRate * 100).toFixed(1)}%`);
console.log(`Mean F1: ${(batchResult.meanF1 * 100).toFixed(2)}%`);
console.log(`Std Dev: ${(batchResult.stdDevF1 * 100).toFixed(2)}%`);
console.log(`Best F1: ${(batchResult.bestF1 * 100).toFixed(2)}%`);
console.log(`Worst F1: ${(batchResult.worstF1 * 100).toFixed(2)}%`);
```

## Per-Class Metrics

Get breakdown by entity type:

```typescript
const metrics = evaluateNER(predictions, groundTruth);

for (const classMetric of metrics.perClassMetrics) {
  console.log(`${classMetric.type}:`);
  console.log(`  F1: ${(classMetric.f1Score * 100).toFixed(2)}%`);
  console.log(`  Precision: ${(classMetric.precision * 100).toFixed(2)}%`);
  console.log(`  Recall: ${(classMetric.recall * 100).toFixed(2)}%`);
  console.log(`  Support: ${classMetric.support}`);
}

// Per-class metrics show which entity types need improvement
// If MEDICATION F1 is low, focus on medication terminology
```

## Regex Baseline Extractor

A rule-based baseline for quick comparison:

```typescript
import { RegexExtractor } from '@/lib/ai/evaluation';

const regex = new RegexExtractor();
const entities = regex.extract(soapNote);

// 170+ patterns for Brazilian medical terminology
// Good baseline: typically F1 0.65-0.75
// Target: Advanced model should achieve F1 > 0.85
```

## Matching Logic

### Exact Match
- Character-perfect overlap (100%)
- Correct entity type
- Case-insensitive text comparison

### Partial Match
- Significant overlap (>50%)
- Counts as TP in non-strict mode
- Useful for boundary detection

### Overlap Calculation
- Uses Jaccard similarity: `intersection / union`
- Detects partial entity captures
- Reported in match details

## Generating Reports

```typescript
import { generateReport } from '@/lib/ai/evaluation';

const metrics = evaluateNER(predictions, groundTruth);
const report = generateReport(metrics, 0.85);

console.log(report.title);
console.log(report.summary);
console.log('Recommendations:');
report.recommendations.forEach(r => console.log('  -', r));
```

## Integration with Darwin-MFC

### NER Feature

```typescript
import { evaluateNER } from '@/lib/ai/evaluation';
import { nlpExtractor } from '@/lib/ai/nlp-extractor';

// Extract entities from SOAP note
const soapText = req.body.note;
const entities = nlpExtractor.extract(soapText);

// Evaluate quality
const metrics = evaluateNER(entities, expectedEntities);

if (metrics.f1Score > 0.85) {
  // High confidence extraction
  return { entities, confidence: 'high' };
} else {
  // Request manual review
  return { entities, confidence: 'medium', review: true };
}
```

### Clinical Decision Support

```typescript
import { evaluateNER, TestCase } from '@/lib/ai/evaluation';

// Use test cases for clinical protocol validation
const clinicalProtocol = TEST_DATASET.find(tc =>
  tc.clinicalContext.includes('diabetes')
);

const predictions = nlpExtractor.extract(clinicalProtocol.input);
const groundTruth = testCaseToEntities(clinicalProtocol);

const metrics = evaluateNER(predictions, groundTruth);
// Use metrics to validate protocol adherence
```

## Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| F1 Score | > 0.85 | Main quality metric |
| Precision | > 0.80 | Avoid false positives |
| Recall | > 0.80 | Don't miss entities |
| Per-class F1 | > 0.80 | All types should perform |
| Execution time | < 1000ms | For 500-token note |

## Troubleshooting

### Low F1 Score

1. **Check precision** - Are predictions mostly wrong?
   - Solution: Stricter filtering, more careful pattern matching

2. **Check recall** - Are we missing entities?
   - Solution: Expand patterns, add more training data

3. **Check per-class metrics** - Which entity types struggle?
   - Solution: Targeted improvements for weak types

### High False Positive Rate

```typescript
const metrics = evaluateNER(predictions, groundTruth);
const falsePositiveRate =
  metrics.confusionMatrix.falsePositives / predictions.length;

if (falsePositiveRate > 0.2) {
  // More than 20% of predictions are wrong
  // Implement stricter filtering
}
```

### Low Recall

```typescript
const missedEntities = groundTruth.length -
  metrics.confusionMatrix.truePositives;

if (missedEntities > 5) {
  // Missing many entities
  // Check for rare terminology not in patterns
  // May need to add more training data
}
```

## API Reference

### Core Functions

```typescript
// Calculate individual metrics
calculatePrecision(tp, fp): number
calculateRecall(tp, fn): number
calculateF1(precision, recall): number
calculateAccuracy(tp, tn, fp, fn): number

// Main evaluation
evaluateNER(predictions, groundTruth, options?): EvaluationMetrics
evaluateWithThreshold(predictions, groundTruth, targetF1?): EvaluationResult
evaluateBatch(samples, targetF1?): BatchEvaluationResult

// Reports
generateReport(metrics, targetF1?): MetricsReport
```

### Benchmark Functions

```typescript
benchmarkExtractor(extractor, testCases?, options?): Promise<BenchmarkResult>
comparativeBenchmark(extractors, testCases?, options?): Promise<ComparativeBenchmarkResult>
analyzeByCateogry(extractor): Promise<...>
analyzeByDifficulty(extractor): Promise<...>
generateDetailedReport(benchmarkResults): DetailedBenchmarkReport
exportBenchmarkResults(results): string
```

### Dataset Functions

```typescript
getTestCasesByCategory(category): TestCase[]
getTestCasesByDifficulty(difficulty): TestCase[]
getRandomTestCases(count): TestCase[]
testCaseToEntities(testCase): Entity[]
getDatasetStatistics(): { ... }
```

## Examples

### End-to-End Evaluation Pipeline

```typescript
import {
  evaluateNER,
  TEST_DATASET,
  testCaseToEntities,
  generateReport,
} from '@/lib/ai/evaluation';

// Your extractor
class MyExtractor {
  extract(text: string) {
    // Implementation
  }
}

const extractor = new MyExtractor();

// Evaluate on all test cases
let totalMetrics = null;

for (const testCase of TEST_DATASET) {
  const predictions = extractor.extract(testCase.input);
  const groundTruth = testCaseToEntities(testCase);
  const metrics = evaluateNER(predictions, groundTruth);

  console.log(`${testCase.id}: F1=${(metrics.f1Score * 100).toFixed(2)}%`);
}

// Final evaluation on all samples
const allPredictions = TEST_DATASET.map(tc =>
  extractor.extract(tc.input)
).flat();

const allGroundTruth = TEST_DATASET.map(tc =>
  testCaseToEntities(tc)
).flat();

const finalMetrics = evaluateNER(allPredictions, allGroundTruth);
const report = generateReport(finalMetrics);

console.log(report.summary);
```

### Continuous Evaluation

```typescript
import { evaluateNER } from '@/lib/ai/evaluation';

// Track metrics over time
const evaluationHistory = [];

app.post('/evaluate', (req, res) => {
  const { predictions, groundTruth } = req.body;
  const metrics = evaluateNER(predictions, groundTruth);

  evaluationHistory.push({
    timestamp: new Date(),
    f1: metrics.f1Score,
    precision: metrics.precision,
    recall: metrics.recall,
  });

  // Alert if F1 drops below threshold
  if (metrics.f1Score < 0.85) {
    notifyTeam('F1 score dropped to ' + metrics.f1Score);
  }

  res.json({ metrics, passed: metrics.f1Score > 0.85 });
});
```

## Next Steps

1. **Integrate with your NER model** - Implement the `extract()` function
2. **Run initial benchmark** - Get baseline F1 score
3. **Identify weak areas** - Check per-class metrics
4. **Iterative improvement** - Add patterns, training data, fine-tune
5. **Monitor in production** - Track metrics over time

## References

- Precision/Recall/F1: Standard ML classification metrics
- Entity extraction: NLP named entity recognition
- Brazilian medical terminology: CIAP-2, ICD-10
- Test data: Realistic SOAP notes from clinical practice
