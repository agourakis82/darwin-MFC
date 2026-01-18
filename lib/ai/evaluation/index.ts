/**
 * NLP EVALUATION FRAMEWORK - DARWIN-MFC
 * ====================================
 *
 * Complete evaluation framework for measuring entity extraction quality.
 * Provides metrics, test dataset, and benchmarking utilities.
 *
 * Usage:
 *   import { evaluateNER, TEST_DATASET, benchmarkExtractor } from '@/lib/ai/evaluation';
 *
 *   const predictions = myExtractor.extract(text);
 *   const metrics = evaluateNER(predictions, groundTruth);
 *   console.log(`F1 Score: ${(metrics.f1Score * 100).toFixed(2)}%`);
 */

// =============================================================================
// METRICS
// =============================================================================

export type { Entity, EntityType, ConfusionMatrix, PerClassMetrics, EvaluationMetrics, EvaluationResult, MetricsReport } from './metrics';
export {
  calculatePrecision,
  calculateRecall,
  calculateF1,
  calculateAccuracy,
  evaluateNER,
  evaluateWithThreshold,
  evaluateBatch,
  generateReport,
} from './metrics';

// =============================================================================
// TEST DATASET
// =============================================================================

export type { TestCase } from './test-dataset';
export {
  TEST_DATASET,
  simpleTestCases,
  complexTestCases,
  drugInteractionTestCases,
  specializedTestCases,
  getTestCasesByCategory,
  getTestCasesByDifficulty,
  getRandomTestCases,
  testCaseToEntities,
  getDatasetStatistics,
} from './test-dataset';

// =============================================================================
// BENCHMARK
// =============================================================================

export type { ExtractorFunction, BenchmarkResult, ComparativeBenchmarkResult, DetailedBenchmarkReport } from './benchmark';
export {
  benchmarkExtractor,
  comparativeBenchmark,
  analyzeByCateogry,
  analyzeByDifficulty,
  generateDetailedReport,
  exportBenchmarkResults,
  RegexExtractor,
} from './benchmark';

// =============================================================================
// QUICK START UTILITIES
// =============================================================================

/**
 * Quick evaluation: get F1 score for predictions
 * @example
 *   const f1 = quickEval(predictions, groundTruth);
 *   console.log(`F1: ${(f1 * 100).toFixed(2)}%`);
 */
export function quickEval(predictions: any[], groundTruth: any[]): number {
  const { evaluateNER } = require('./metrics');
  return evaluateNER(predictions, groundTruth).f1Score;
}

/**
 * Test coverage: what % of ground truth entities were found?
 * @example
 *   const coverage = testCoverage(predictions, groundTruth);
 *   console.log(`Coverage: ${(coverage * 100).toFixed(2)}%`);
 */
export function testCoverage(predictions: any[], groundTruth: any[]): number {
  const { evaluateNER } = require('./metrics');
  const metrics = evaluateNER(predictions, groundTruth);
  return metrics.recall;
}

/**
 * Precision check: what % of predictions were correct?
 * @example
 *   const accuracy = precisionCheck(predictions, groundTruth);
 *   console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`);
 */
export function precisionCheck(predictions: any[], groundTruth: any[]): number {
  const { evaluateNER } = require('./metrics');
  const metrics = evaluateNER(predictions, groundTruth);
  return metrics.precision;
}
