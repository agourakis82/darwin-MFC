/**
 * NLP EVALUATION METRICS - DARWIN-MFC
 * ====================================
 *
 * Comprehensive metrics calculation for entity extraction quality evaluation.
 * Measures precision, recall, F1 score, and accuracy against ground truth.
 *
 * Target: F1 > 0.85 on test dataset
 */

// =============================================================================
// TYPES
// =============================================================================

export type EntityType = 'DISEASE' | 'MEDICATION' | 'SYMPTOM' | 'EXAM';

export interface Entity {
  text: string;
  type: EntityType;
  startIndex: number;
  endIndex: number;
  codes?: {
    icd10?: string;
    atc?: string;
    ciap2?: string;
    snomed?: string;
  };
  confidence?: number; // For predicted entities
}

export interface ConfusionMatrix {
  truePositives: number;
  falsePositives: number;
  falseNegatives: number;
  trueNegatives: number;
}

export interface PerClassMetrics {
  type: EntityType;
  precision: number;
  recall: number;
  f1Score: number;
  support: number; // Number of entities of this type in ground truth
}

export interface EvaluationMetrics {
  precision: number;
  recall: number;
  f1Score: number;
  accuracy: number;
  confusionMatrix: ConfusionMatrix;
  perClassMetrics: PerClassMetrics[];
  weightedF1: number;
  macroF1: number;
}

export interface EvaluationResult {
  metrics: EvaluationMetrics;
  passedThreshold: boolean;
  targetF1: number;
  achievedF1: number;
  details: {
    totalPredictions: number;
    totalGroundTruth: number;
    correctExactMatches: number;
    partialMatches: number;
  };
}

// =============================================================================
// CORE METRICS CALCULATIONS
// =============================================================================

/**
 * Calculate precision: TP / (TP + FP)
 * Measures: Of all predicted positive entities, how many were correct?
 */
export function calculatePrecision(
  truePositives: number,
  falsePositives: number
): number {
  const denominator = truePositives + falsePositives;
  if (denominator === 0) return 0;
  return truePositives / denominator;
}

/**
 * Calculate recall: TP / (TP + FN)
 * Measures: Of all actual positive entities, how many did we find?
 */
export function calculateRecall(
  truePositives: number,
  falseNegatives: number
): number {
  const denominator = truePositives + falseNegatives;
  if (denominator === 0) return 0;
  return truePositives / denominator;
}

/**
 * Calculate F1 score: 2 * (precision * recall) / (precision + recall)
 * Harmonic mean of precision and recall (0-1 scale)
 */
export function calculateF1(precision: number, recall: number): number {
  const denominator = precision + recall;
  if (denominator === 0) return 0;
  return (2 * precision * recall) / denominator;
}

/**
 * Calculate accuracy: (TP + TN) / (TP + TN + FP + FN)
 * Measures: Overall correctness
 */
export function calculateAccuracy(
  truePositives: number,
  trueNegatives: number,
  falsePositives: number,
  falseNegatives: number
): number {
  const total = truePositives + trueNegatives + falsePositives + falseNegatives;
  if (total === 0) return 0;
  return (truePositives + trueNegatives) / total;
}

// =============================================================================
// ENTITY MATCHING LOGIC
// =============================================================================

export interface MatchResult {
  type: 'exact' | 'partial' | 'no_match';
  predicted: Entity;
  groundTruth: Entity | null;
  overlapRatio: number; // 0-1, intersection / union
  isCaseMatch: boolean;
  isTypeMatch: boolean;
}

/**
 * Calculate Jaccard similarity (overlap) between two entities
 * Used to detect partial matches and measure overlap
 */
function calculateOverlap(entity1: Entity, entity2: Entity): number {
  const start1 = entity1.startIndex;
  const end1 = entity1.endIndex;
  const start2 = entity2.startIndex;
  const end2 = entity2.endIndex;

  // Calculate intersection
  const interStart = Math.max(start1, start2);
  const interEnd = Math.min(end1, end2);
  const intersection = Math.max(0, interEnd - interStart);

  // Calculate union
  const union = Math.max(end1, end2) - Math.min(start1, start2);

  return union === 0 ? 0 : intersection / union;
}

/**
 * Match predicted entity against ground truth entities
 * Returns best match with overlap ratio
 */
function findBestMatch(
  predicted: Entity,
  groundTruth: Entity[]
): MatchResult {
  let bestMatch: MatchResult = {
    type: 'no_match',
    predicted,
    groundTruth: null,
    overlapRatio: 0,
    isCaseMatch: false,
    isTypeMatch: false,
  };

  for (const gt of groundTruth) {
    const overlap = calculateOverlap(predicted, gt);
    const typeMatch = predicted.type === gt.type;
    const caseMatch = predicted.text.toLowerCase() === gt.text.toLowerCase();

    // Exact match: perfect overlap + same type + same text (case-insensitive)
    if (
      overlap === 1 &&
      typeMatch &&
      caseMatch &&
      bestMatch.overlapRatio < 1
    ) {
      bestMatch = {
        type: 'exact',
        predicted,
        groundTruth: gt,
        overlapRatio: overlap,
        isCaseMatch: caseMatch,
        isTypeMatch: typeMatch,
      };
      break;
    }

    // Partial match: significant overlap
    if (overlap > 0.5 && overlap > bestMatch.overlapRatio) {
      bestMatch = {
        type: 'partial',
        predicted,
        groundTruth: gt,
        overlapRatio: overlap,
        isCaseMatch: caseMatch,
        isTypeMatch: typeMatch,
      };
    }
  }

  return bestMatch;
}

// =============================================================================
// MAIN EVALUATION FUNCTION
// =============================================================================

/**
 * Evaluate NER predictions against ground truth
 * Returns comprehensive metrics including F1 score
 */
export function evaluateNER(
  predictions: Entity[],
  groundTruth: Entity[],
  options: {
    strictMode?: boolean; // Only count exact matches as TP
  } = {}
): EvaluationMetrics {
  const strictMode = options.strictMode ?? false;
  let confusionMatrix: ConfusionMatrix = {
    truePositives: 0,
    falsePositives: 0,
    falseNegatives: 0,
    trueNegatives: 0,
  };

  const matchedGroundTruth = new Set<number>();

  // Find matches for each prediction
  for (const prediction of predictions) {
    const match = findBestMatch(prediction, groundTruth);

    if (match.type === 'exact') {
      confusionMatrix.truePositives++;
      if (match.groundTruth) {
        matchedGroundTruth.add(groundTruth.indexOf(match.groundTruth));
      }
    } else if (!strictMode && match.type === 'partial' && match.overlapRatio > 0.5) {
      // In non-strict mode, partial matches with >50% overlap count as TP with reduced confidence
      confusionMatrix.truePositives++;
      if (match.groundTruth) {
        matchedGroundTruth.add(groundTruth.indexOf(match.groundTruth));
      }
    } else {
      confusionMatrix.falsePositives++;
    }
  }

  // Unmatched ground truth entities are false negatives
  confusionMatrix.falseNegatives =
    groundTruth.length - matchedGroundTruth.size;

  // Calculate basic metrics
  const precision = calculatePrecision(
    confusionMatrix.truePositives,
    confusionMatrix.falsePositives
  );
  const recall = calculateRecall(
    confusionMatrix.truePositives,
    confusionMatrix.falseNegatives
  );
  const f1Score = calculateF1(precision, recall);
  const accuracy = calculateAccuracy(
    confusionMatrix.truePositives,
    confusionMatrix.trueNegatives,
    confusionMatrix.falsePositives,
    confusionMatrix.falseNegatives
  );

  // Calculate per-class metrics
  const entityTypes: EntityType[] = ['DISEASE', 'MEDICATION', 'SYMPTOM', 'EXAM'];
  const perClassMetrics: PerClassMetrics[] = [];

  for (const entityType of entityTypes) {
    const gtOfType = groundTruth.filter(e => e.type === entityType);
    const predOfType = predictions.filter(e => e.type === entityType);

    let tpOfType = 0;
    const matchedGTOfType = new Set<number>();

    for (const pred of predOfType) {
      const match = findBestMatch(pred, gtOfType);
      if (match.type === 'exact' || (!strictMode && match.type === 'partial')) {
        tpOfType++;
        if (match.groundTruth) {
          matchedGTOfType.add(gtOfType.indexOf(match.groundTruth));
        }
      }
    }

    const fpOfType = predOfType.length - tpOfType;
    const fnOfType = gtOfType.length - matchedGTOfType.size;

    const precisionOfType = calculatePrecision(tpOfType, fpOfType);
    const recallOfType = calculateRecall(tpOfType, fnOfType);
    const f1OfType = calculateF1(precisionOfType, recallOfType);

    perClassMetrics.push({
      type: entityType,
      precision: precisionOfType,
      recall: recallOfType,
      f1Score: f1OfType,
      support: gtOfType.length,
    });
  }

  // Calculate weighted F1 (weighted by support)
  const totalSupport = perClassMetrics.reduce((sum, m) => sum + m.support, 0);
  const weightedF1 =
    totalSupport === 0
      ? 0
      : perClassMetrics.reduce(
          (sum, m) => sum + (m.f1Score * m.support) / totalSupport,
          0
        );

  // Calculate macro F1 (unweighted average)
  const macroF1 =
    perClassMetrics.length === 0
      ? 0
      : perClassMetrics.reduce((sum, m) => sum + m.f1Score, 0) /
        perClassMetrics.length;

  return {
    precision,
    recall,
    f1Score,
    accuracy,
    confusionMatrix,
    perClassMetrics,
    weightedF1,
    macroF1,
  };
}

/**
 * Comprehensive evaluation with threshold checking
 */
export function evaluateWithThreshold(
  predictions: Entity[],
  groundTruth: Entity[],
  targetF1: number = 0.85
): EvaluationResult {
  const metrics = evaluateNER(predictions, groundTruth);

  return {
    metrics,
    passedThreshold: metrics.f1Score >= targetF1,
    targetF1,
    achievedF1: metrics.f1Score,
    details: {
      totalPredictions: predictions.length,
      totalGroundTruth: groundTruth.length,
      correctExactMatches: metrics.confusionMatrix.truePositives,
      partialMatches: predictions.filter(
        pred =>
          findBestMatch(pred, groundTruth).type === 'partial'
      ).length,
    },
  };
}

// =============================================================================
// BATCH EVALUATION
// =============================================================================

export interface BatchEvaluationResult {
  sampleResults: EvaluationResult[];
  aggregatedMetrics: EvaluationMetrics;
  passRate: number; // % of samples that passed threshold
  bestF1: number;
  worstF1: number;
  meanF1: number;
  stdDevF1: number;
}

/**
 * Evaluate multiple samples and aggregate results
 */
export function evaluateBatch(
  samples: Array<{
    predictions: Entity[];
    groundTruth: Entity[];
  }>,
  targetF1: number = 0.85
): BatchEvaluationResult {
  const sampleResults = samples.map(sample =>
    evaluateWithThreshold(sample.predictions, sample.groundTruth, targetF1)
  );

  // Aggregate predictions and ground truth
  const allPredictions = samples.flatMap(s => s.predictions);
  const allGroundTruth = samples.flatMap(s => s.groundTruth);

  const aggregatedMetrics = evaluateNER(allPredictions, allGroundTruth);

  // Calculate statistics
  const f1Scores = sampleResults.map(r => r.achievedF1);
  const passRate = sampleResults.filter(r => r.passedThreshold).length / sampleResults.length;
  const bestF1 = Math.max(...f1Scores);
  const worstF1 = Math.min(...f1Scores);
  const meanF1 = f1Scores.reduce((a, b) => a + b, 0) / f1Scores.length;

  // Standard deviation
  const variance =
    f1Scores.reduce((sum, score) => sum + Math.pow(score - meanF1, 2), 0) /
    f1Scores.length;
  const stdDevF1 = Math.sqrt(variance);

  return {
    sampleResults,
    aggregatedMetrics,
    passRate,
    bestF1,
    worstF1,
    meanF1,
    stdDevF1,
  };
}

// =============================================================================
// REPORTING
// =============================================================================

export interface MetricsReport {
  title: string;
  timestamp: string;
  metrics: EvaluationMetrics;
  summary: string;
  recommendations: string[];
}

/**
 * Generate a human-readable metrics report
 */
export function generateReport(
  metrics: EvaluationMetrics,
  targetF1: number = 0.85
): MetricsReport {
  const passed = metrics.f1Score >= targetF1;
  const statusEmoji = passed ? '✓' : '✗';

  const summary = `
${statusEmoji} F1 Score: ${(metrics.f1Score * 100).toFixed(2)}% (Target: ${(targetF1 * 100).toFixed(2)}%)
  - Precision: ${(metrics.precision * 100).toFixed(2)}%
  - Recall: ${(metrics.recall * 100).toFixed(2)}%
  - Accuracy: ${(metrics.accuracy * 100).toFixed(2)}%

Confusion Matrix:
  - True Positives: ${metrics.confusionMatrix.truePositives}
  - False Positives: ${metrics.confusionMatrix.falsePositives}
  - False Negatives: ${metrics.confusionMatrix.falseNegatives}
  - True Negatives: ${metrics.confusionMatrix.trueNegatives}

Per-Class Metrics:
${metrics.perClassMetrics
  .map(
    m =>
      `  ${m.type}:
    - F1: ${(m.f1Score * 100).toFixed(2)}%
    - Precision: ${(m.precision * 100).toFixed(2)}%
    - Recall: ${(m.recall * 100).toFixed(2)}%
    - Support: ${m.support}`
  )
  .join('\n')}

Aggregated:
  - Macro F1: ${(metrics.macroF1 * 100).toFixed(2)}%
  - Weighted F1: ${(metrics.weightedF1 * 100).toFixed(2)}%
`.trim();

  const recommendations: string[] = [];

  if (metrics.precision < 0.8) {
    recommendations.push(
      'Low precision detected. Consider reducing false positives through stricter filtering.'
    );
  }

  if (metrics.recall < 0.8) {
    recommendations.push(
      'Low recall detected. Consider expanding entity boundaries or improving detection patterns.'
    );
  }

  const lowF1Classes = metrics.perClassMetrics.filter(m => m.f1Score < targetF1);
  if (lowF1Classes.length > 0) {
    recommendations.push(
      `Classes with low F1: ${lowF1Classes.map(m => m.type).join(', ')}. Consider adding more training data for these types.`
    );
  }

  return {
    title: `NER Evaluation Report - ${new Date().toLocaleDateString('pt-BR')}`,
    timestamp: new Date().toISOString(),
    metrics,
    summary,
    recommendations,
  };
}
