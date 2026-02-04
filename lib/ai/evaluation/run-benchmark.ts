/**
 * Benchmark Runner Script
 * =======================
 *
 * Runs comparative benchmark between Regex and BioBERT extractors.
 * Uses the unified NER service for consistent comparison.
 *
 * Run: npx tsx lib/ai/evaluation/run-benchmark.ts
 */

import {
  RegexExtractor,
  benchmarkExtractor,
  comparativeBenchmark,
  exportBenchmarkResults,
  type ExtractorFunction,
} from './benchmark';
import {
  extractEntities,
  initializeBioBERT,
  getBioBERTStatus,
} from '@/lib/ai/services/unified-ner-service';
import type { Entity } from './metrics';

// =============================================================================
// UNIFIED SERVICE EXTRACTORS
// =============================================================================

/**
 * BioBERT extractor using unified service
 */
class BioBERTExtractor implements ExtractorFunction {
  name = 'BioBERT (Unified Service)';
  description = 'Transformer-based NER using pre-trained BioBERT model';

  async extract(text: string): Promise<Entity[]> {
    const result = await extractEntities(text, { mode: 'biobert' });
    return result.entities.map((e) => ({
      text: e.text,
      type: e.type as Entity['type'],
      startIndex: e.startChar,
      endIndex: e.endChar,
    }));
  }
}

/**
 * Hybrid extractor using unified service
 */
class HybridExtractor implements ExtractorFunction {
  name = 'Hybrid (Regex + BioBERT)';
  description = 'Combined approach merging regex patterns with ML predictions';

  async extract(text: string): Promise<Entity[]> {
    const result = await extractEntities(text, { mode: 'hybrid' });
    return result.entities.map((e) => ({
      text: e.text,
      type: e.type as Entity['type'],
      startIndex: e.startChar,
      endIndex: e.endChar,
    }));
  }
}

/**
 * Regex extractor using unified service (for consistency)
 */
class UnifiedRegexExtractor implements ExtractorFunction {
  name = 'Regex (Unified Service)';
  description = 'Rule-based extraction via unified service';

  async extract(text: string): Promise<Entity[]> {
    const result = await extractEntities(text, { mode: 'regex' });
    return result.entities.map((e) => ({
      text: e.text,
      type: e.type as Entity['type'],
      startIndex: e.startChar,
      endIndex: e.endChar,
    }));
  }
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║           DARWIN-MFC NER BENCHMARK SUITE                     ║');
  console.log('║         Regex vs BioBERT Comparative Analysis                ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log();

  // Check BioBERT status
  const status = getBioBERTStatus();
  console.log(`BioBERT Model Status: ${status.loaded ? 'Loaded ✓' : 'Not Loaded'}`);

  // Try to initialize BioBERT
  if (!status.loaded) {
    console.log('Attempting to load BioBERT model...');
    try {
      const loaded = await initializeBioBERT((progress, msg) => {
        process.stdout.write(`\r  ${msg} (${progress}%)`);
      });
      console.log();
      if (loaded) {
        console.log('BioBERT model loaded successfully ✓');
      } else {
        console.log('BioBERT model failed to load - will use regex fallback');
      }
    } catch (error) {
      console.log('BioBERT loading error:', error);
      console.log('Continuing with regex-only benchmark');
    }
  }

  console.log();

  // Create extractors
  const extractors: ExtractorFunction[] = [
    new RegexExtractor(),  // Baseline regex from benchmark.ts
    new UnifiedRegexExtractor(),  // Regex via unified service
  ];

  // Add BioBERT/Hybrid if model is available
  const currentStatus = getBioBERTStatus();
  if (currentStatus.loaded) {
    extractors.push(new BioBERTExtractor());
    extractors.push(new HybridExtractor());
  }

  // Run comparative benchmark
  console.log('Running benchmark...');
  console.log(`Extractors: ${extractors.map((e) => e.name).join(', ')}`);
  console.log();

  const results = await comparativeBenchmark(extractors, undefined, {
    targetF1: 0.85,
    showProgress: false,
  });

  // Print results
  console.log();
  console.log('════════════════════════════════════════════════════════════════');
  console.log(results.summary);
  console.log('════════════════════════════════════════════════════════════════');
  console.log();

  // Print recommendations
  if (results.recommendations.length > 0) {
    console.log('RECOMMENDATIONS:');
    results.recommendations.forEach((rec, i) => {
      console.log(`  ${i + 1}. ${rec}`);
    });
    console.log();
  }

  // Check against target
  const TARGET_F1 = 0.85;
  const bestF1 = results.winner.metrics.f1Score;
  const meetsTarget = bestF1 >= TARGET_F1;

  console.log('════════════════════════════════════════════════════════════════');
  console.log(`TARGET F1: ${(TARGET_F1 * 100).toFixed(1)}%`);
  console.log(`BEST F1:   ${(bestF1 * 100).toFixed(2)}%`);
  console.log(`STATUS:    ${meetsTarget ? '✓ TARGET MET' : '✗ BELOW TARGET'}`);
  console.log('════════════════════════════════════════════════════════════════');

  // Export JSON results
  const jsonResults = exportBenchmarkResults(results);
  console.log();
  console.log('JSON Export:');
  console.log(jsonResults);
}

// Run if executed directly
main().catch(console.error);

export { BioBERTExtractor, HybridExtractor, UnifiedRegexExtractor };
