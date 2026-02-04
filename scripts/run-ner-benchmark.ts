#!/usr/bin/env npx tsx
/**
 * NER Benchmark Runner - Darwin-MFC
 * ==================================
 *
 * Runs the NER benchmark suite using the Regex baseline extractor.
 * Outputs detailed metrics and generates a report.
 *
 * Usage:
 *   npx tsx scripts/run-ner-benchmark.ts
 *
 * Target: F1 >= 0.85
 */

import {
  RegexExtractor,
  benchmarkExtractor,
  analyzeByCateogry,
  analyzeByDifficulty,
  exportBenchmarkResults,
  comparativeBenchmark,
} from '../lib/ai/evaluation/benchmark';
import {
  TEST_DATASET,
  getDatasetStatistics,
} from '../lib/ai/evaluation/test-dataset';

const TARGET_F1 = 0.85;

async function main() {
  console.log('═'.repeat(70));
  console.log('DARWIN-MFC NER BENCHMARK');
  console.log('═'.repeat(70));
  console.log();

  // Dataset statistics
  const stats = getDatasetStatistics();
  console.log('📊 Dataset Statistics:');
  console.log(`   Total test cases: ${stats.totalCases}`);
  console.log(`   Total entities: ${stats.totalEntities}`);
  console.log();
  console.log('   By Category:');
  Object.entries(stats.byCategory).forEach(([cat, count]) => {
    console.log(`     - ${cat}: ${count}`);
  });
  console.log();
  console.log('   By Difficulty:');
  Object.entries(stats.byDifficulty).forEach(([diff, count]) => {
    console.log(`     - ${diff}: ${count}`);
  });
  console.log();
  console.log('   By Entity Type:');
  Object.entries(stats.entitiesByType).forEach(([type, count]) => {
    console.log(`     - ${type}: ${count}`);
  });
  console.log();

  // Run benchmark
  console.log('─'.repeat(70));
  console.log('🔬 Running Regex Baseline Benchmark...');
  console.log('─'.repeat(70));
  console.log();

  const regexExtractor = new RegexExtractor();

  const result = await benchmarkExtractor(regexExtractor, TEST_DATASET, {
    targetF1: TARGET_F1,
    showProgress: false,
  });

  // Print results
  console.log('📈 RESULTS');
  console.log('─'.repeat(70));
  console.log();
  console.log(`Extractor: ${result.extractorName}`);
  console.log(`Timestamp: ${result.timestamp}`);
  console.log(`Execution Time: ${result.executionTimeMs.toFixed(2)}ms`);
  console.log(`Sample Count: ${result.sampleCount}`);
  console.log(`Failed Samples: ${result.failedSamples.length}`);
  console.log();

  // Main metrics
  const passedIcon = result.metrics.f1Score >= TARGET_F1 ? '✓' : '✗';
  console.log(`${passedIcon} F1 Score: ${(result.metrics.f1Score * 100).toFixed(2)}% (Target: ${(TARGET_F1 * 100).toFixed(0)}%)`);
  console.log(`   Precision: ${(result.metrics.precision * 100).toFixed(2)}%`);
  console.log(`   Recall: ${(result.metrics.recall * 100).toFixed(2)}%`);
  console.log(`   Accuracy: ${(result.metrics.accuracy * 100).toFixed(2)}%`);
  console.log();

  // Confusion Matrix
  console.log('Confusion Matrix:');
  console.log(`   True Positives: ${result.metrics.confusionMatrix.truePositives}`);
  console.log(`   False Positives: ${result.metrics.confusionMatrix.falsePositives}`);
  console.log(`   False Negatives: ${result.metrics.confusionMatrix.falseNegatives}`);
  console.log(`   True Negatives: ${result.metrics.confusionMatrix.trueNegatives}`);
  console.log();

  // Per-class metrics
  console.log('Per-Class Metrics:');
  console.log('┌────────────────┬──────────┬───────────┬──────────┬─────────┐');
  console.log('│ Entity Type    │ F1 Score │ Precision │ Recall   │ Support │');
  console.log('├────────────────┼──────────┼───────────┼──────────┼─────────┤');
  result.metrics.perClassMetrics.forEach(m => {
    const typeStr = m.type.padEnd(14);
    const f1Str = `${(m.f1Score * 100).toFixed(1)}%`.padStart(7);
    const pStr = `${(m.precision * 100).toFixed(1)}%`.padStart(8);
    const rStr = `${(m.recall * 100).toFixed(1)}%`.padStart(7);
    const sStr = String(m.support).padStart(7);
    console.log(`│ ${typeStr} │ ${f1Str} │ ${pStr} │ ${rStr} │ ${sStr} │`);
  });
  console.log('└────────────────┴──────────┴───────────┴──────────┴─────────┘');
  console.log();

  // Aggregated F1 scores
  console.log('Aggregated F1 Scores:');
  console.log(`   Macro F1: ${(result.metrics.macroF1 * 100).toFixed(2)}%`);
  console.log(`   Weighted F1: ${(result.metrics.weightedF1 * 100).toFixed(2)}%`);
  console.log();

  // Analysis by category
  console.log('─'.repeat(70));
  console.log('📊 Analysis by Category');
  console.log('─'.repeat(70));

  const categoryAnalysis = await analyzeByCateogry(regexExtractor);
  Object.entries(categoryAnalysis.byCategory).forEach(([category, metrics]) => {
    console.log(`\n${category}:`);
    console.log(`   F1: ${(metrics.f1 * 100).toFixed(2)}%`);
    console.log(`   Precision: ${(metrics.precision * 100).toFixed(2)}%`);
    console.log(`   Recall: ${(metrics.recall * 100).toFixed(2)}%`);
    console.log(`   Samples: ${metrics.sampleCount}`);
  });
  console.log();

  // Analysis by difficulty
  console.log('─'.repeat(70));
  console.log('📊 Analysis by Difficulty');
  console.log('─'.repeat(70));

  const difficultyAnalysis = await analyzeByDifficulty(regexExtractor);
  Object.entries(difficultyAnalysis.byDifficulty).forEach(([difficulty, metrics]) => {
    console.log(`\n${difficulty}:`);
    console.log(`   F1: ${(metrics.f1 * 100).toFixed(2)}%`);
    console.log(`   Precision: ${(metrics.precision * 100).toFixed(2)}%`);
    console.log(`   Recall: ${(metrics.recall * 100).toFixed(2)}%`);
    console.log(`   Samples: ${metrics.sampleCount}`);
  });
  console.log();

  // Recommendations
  console.log('─'.repeat(70));
  console.log('💡 Recommendations');
  console.log('─'.repeat(70));
  console.log();

  if (result.report.recommendations.length > 0) {
    result.report.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
  } else {
    console.log('No specific recommendations - metrics look good!');
  }
  console.log();

  // Final verdict
  console.log('═'.repeat(70));
  if (result.metrics.f1Score >= TARGET_F1) {
    console.log('✅ BENCHMARK PASSED');
    console.log(`   F1 Score ${(result.metrics.f1Score * 100).toFixed(2)}% >= Target ${(TARGET_F1 * 100).toFixed(0)}%`);
  } else {
    console.log('❌ BENCHMARK FAILED');
    console.log(`   F1 Score ${(result.metrics.f1Score * 100).toFixed(2)}% < Target ${(TARGET_F1 * 100).toFixed(0)}%`);
    console.log();
    console.log('   Consider:');
    console.log('   - Expanding regex patterns to improve recall');
    console.log('   - Adding more entity patterns for low-performing classes');
    console.log('   - Reviewing false positives to improve precision');
  }
  console.log('═'.repeat(70));

  // Exit with appropriate code
  process.exit(result.metrics.f1Score >= TARGET_F1 ? 0 : 1);
}

main().catch(error => {
  console.error('Benchmark failed with error:', error);
  process.exit(1);
});
