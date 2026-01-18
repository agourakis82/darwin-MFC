/**
 * NLP BENCHMARK SUITE - DARWIN-MFC
 * =================================
 *
 * Run comprehensive evaluation suite on entity extractors.
 * Compares BioBERT vs regex baseline and generates detailed reports.
 *
 * Target: F1 > 0.85 on test dataset
 */

import {
  Entity,
  evaluateNER,
  evaluateBatch,
  generateReport,
  EvaluationMetrics,
  BatchEvaluationResult,
  MetricsReport,
} from './metrics';
import {
  TEST_DATASET,
  TestCase,
  testCaseToEntities,
  getDatasetStatistics,
  getTestCasesByCategory,
  getTestCasesByDifficulty,
} from './test-dataset';

// =============================================================================
// TYPES
// =============================================================================

export interface ExtractorFunction {
  name: string;
  description: string;
  extract: (text: string) => Promise<Entity[]> | Entity[];
}

export interface BenchmarkResult {
  extractorName: string;
  timestamp: string;
  metrics: EvaluationMetrics;
  report: MetricsReport;
  executionTimeMs: number;
  sampleCount: number;
  failedSamples: Array<{
    caseId: string;
    error: string;
  }>;
}

export interface ComparativeBenchmarkResult {
  results: BenchmarkResult[];
  winner: BenchmarkResult;
  recommendations: string[];
  summary: string;
}

// =============================================================================
// BASELINE REGEX EXTRACTOR
// =============================================================================

/**
 * Simple regex-based baseline extractor
 * Provides baseline for comparison with advanced models
 */
export class RegexExtractor implements ExtractorFunction {
  name = 'Regex Baseline';
  description = 'Rule-based regex patterns for entity extraction';

  // Brazilian medical terminology patterns
  private patterns = {
    DISEASE: [
      /(?:diabetes|diabético|diabética)(?:\s+(?:tipo\s+[12]|mellitus))?/gi,
      /hipertensão\s+arterial|hipertensivo/gi,
      /(?:insuficiência|insufficiência)\s+cardíaca/gi,
      /fibrilação\s+atrial/gi,
      /doença\s+renal\s+crônica/gi,
      /asma|asmático|asmática/gi,
      /pneumonia/gi,
      /gastroenterite/gi,
      /depressão(?:\s+maior)?/gi,
      /hipotireoidismo|hipertireoidismo/gi,
      /dislipidemia|hipercolesterolemia/gi,
      /osteoartrite|artrite/gi,
      /síndrome\s+metabólica/gi,
      /infecção\s+(?:urinária|respiratória|gastrointestinal)/gi,
    ],
    MEDICATION: [
      /(?:metformina|glibenclamida|insulina)/gi,
      /(?:losartana|valsartana|enalapril|lisinopril)/gi,
      /(?:atorvastatina|sinvastatina|rosuvastatina)/gi,
      /(?:dipirona|paracetamol|ibuprofeno|naproxeno|diclofenaco)/gi,
      /(?:amoxicilina|nitrofurantoína|azitromicina)/gi,
      /(?:furosemida|espironolactona)/gi,
      /(?:sertralina|fluoxetina|paroxetina)/gi,
      /(?:levotiroxina|propranolol)/gi,
      /(?:salbutamol|prednisona|omeprazol)/gi,
      /(?:varfarina)/gi,
      /amoxicilina-clavulânico/gi,
    ],
    SYMPTOM: [
      /(?:diarreia|diarréia)/gi,
      /(?:dor\s+(?:abdominal|lombar|precordial))/gi,
      /febre|febril/gi,
      /cefaleia|dor\s+de\s+cabeça/gi,
      /tosse\s+(?:seca|produtiva|noturna)?/gi,
      /dispneia|falta\s+de\s+ar/gi,
      /edema(?:\s+(?:de|em)\s+(?:membros|MMII|face))?/gi,
      /hematúria/gi,
      /poliúria|polidipsia/gi,
      /fadiga|cansaço/gi,
      /tremor(?:\s+nas\s+mãos)?/gi,
      /palpitações/gi,
      /ganho\s+de\s+peso/gi,
      /intolerância\s+ao\s+frio/gi,
    ],
    EXAM: [
      /(?:pressão\s+arterial|PA|tensão\s+arterial|TA)/gi,
      /(?:frequência\s+cardíaca|FC|pulso)/gi,
      /(?:frequência\s+respiratória|FR)/gi,
      /(?:saturação\s+de\s+oxigênio|SatO2|SpO2)/gi,
      /glicemia(?:\s+(?:de\s+jejum|pós-prandial))?/gi,
      /(?:hemoglobina|Hb)/gi,
      /(?:creatinina|TFG|taxa\s+de\s+filtração\s+glomerular)/gi,
      /(?:colesterol\s+(?:total|HDL|LDL)|triglicérides)/gi,
      /(?:TSH|T4\s+livre)/gi,
      /(?:urocultura)/gi,
      /(?:eletrólitos|potássio|sódio)/gi,
      /(?:INR)/gi,
      /(?:BNP)/gi,
      /(?:sibilos|estertores|ruído\s+hidroaéreo)/gi,
      /(?:ECG|Rx\s+(?:tórax|abdômen)|espirometria|ecocardiograma)/gi,
      /(?:reflexos|palpação|ausculta)/gi,
      /(?:PFE|pico\s+de\s+fluxo\s+expiratório)/gi,
    ],
  };

  extract(text: string): Entity[] {
    const entities: Entity[] = [];
    let entityId = 0;

    const entityTypes = ['DISEASE', 'MEDICATION', 'SYMPTOM', 'EXAM'] as const;

    for (const entityType of entityTypes) {
      const typePatterns = this.patterns[entityType as keyof typeof this.patterns];

      for (const pattern of typePatterns) {
        let match;
        while ((match = pattern.exec(text)) !== null) {
          entities.push({
            text: match[0],
            type: entityType,
            startIndex: match.index,
            endIndex: match.index + match[0].length,
          });
        }
      }
    }

    // Remove duplicates and overlaps
    return this.deduplicateEntities(entities);
  }

  private deduplicateEntities(entities: Entity[]): Entity[] {
    // Sort by position
    entities.sort((a, b) => a.startIndex - b.startIndex);

    const result: Entity[] = [];
    const usedIndices = new Set<number>();

    for (let i = 0; i < entities.length; i++) {
      if (usedIndices.has(i)) continue;

      const entity = entities[i];
      result.push(entity);

      // Mark overlapping entities as used
      for (let j = i + 1; j < entities.length; j++) {
        const other = entities[j];
        if (
          other.startIndex < entity.endIndex &&
          other.endIndex > entity.startIndex
        ) {
          usedIndices.add(j);
        }
      }
    }

    return result;
  }
}

// =============================================================================
// BENCHMARK EXECUTION
// =============================================================================

/**
 * Run benchmark on a single extractor
 */
export async function benchmarkExtractor(
  extractor: ExtractorFunction,
  testCases: TestCase[] = TEST_DATASET,
  options: {
    targetF1?: number;
    showProgress?: boolean;
  } = {}
): Promise<BenchmarkResult> {
  const targetF1 = options.targetF1 ?? 0.85;
  const startTime = performance.now();
  const failedSamples: Array<{ caseId: string; error: string }> = [];

  const evaluationSamples = [];

  for (const testCase of testCases) {
    try {
      const predictions = await extractor.extract(testCase.input);
      const groundTruth = testCaseToEntities(testCase);

      evaluationSamples.push({
        predictions,
        groundTruth,
      });

      if (options.showProgress) {
        console.log(`✓ ${testCase.id}`);
      }
    } catch (error) {
      failedSamples.push({
        caseId: testCase.id,
        error: String(error),
      });

      if (options.showProgress) {
        console.error(`✗ ${testCase.id}: ${error}`);
      }
    }
  }

  const endTime = performance.now();

  // Calculate metrics
  const metrics = evaluateNER(
    evaluationSamples.flatMap(s => s.predictions),
    evaluationSamples.flatMap(s => s.groundTruth)
  );

  const report = generateReport(metrics, targetF1);

  return {
    extractorName: extractor.name,
    timestamp: new Date().toISOString(),
    metrics,
    report,
    executionTimeMs: endTime - startTime,
    sampleCount: evaluationSamples.length,
    failedSamples,
  };
}

/**
 * Compare multiple extractors
 */
export async function comparativeBenchmark(
  extractors: ExtractorFunction[],
  testCases: TestCase[] = TEST_DATASET,
  options: {
    targetF1?: number;
    showProgress?: boolean;
  } = {}
): Promise<ComparativeBenchmarkResult> {
  const results: BenchmarkResult[] = [];

  console.log(`Running benchmark on ${extractors.length} extractors...`);

  for (const extractor of extractors) {
    console.log(`\nBenchmarking: ${extractor.name}`);
    const result = await benchmarkExtractor(extractor, testCases, options);
    results.push(result);
  }

  // Determine winner
  const winner = results.reduce((best, current) =>
    current.metrics.f1Score > best.metrics.f1Score ? current : best
  );

  // Generate recommendations
  const recommendations: string[] = [];

  const firstResult = results[0];
  const f1Variance = results.map(r => r.metrics.f1Score);
  const f1Range = Math.max(...f1Variance) - Math.min(...f1Variance);

  if (f1Range > 0.1) {
    recommendations.push(
      `Large F1 variance (${(f1Range * 100).toFixed(1)}%) detected between extractors. Consider ensemble methods.`
    );
  }

  const lowPrecisionExtractors = results.filter(r => r.metrics.precision < 0.7);
  if (lowPrecisionExtractors.length > 0) {
    recommendations.push(
      `${lowPrecisionExtractors.map(r => r.extractorName).join(', ')} have low precision. Consider post-filtering.`
    );
  }

  const lowRecallExtractors = results.filter(r => r.metrics.recall < 0.7);
  if (lowRecallExtractors.length > 0) {
    recommendations.push(
      `${lowRecallExtractors.map(r => r.extractorName).join(', ')} have low recall. Consider expanding patterns or training data.`
    );
  }

  const summary = `
BENCHMARK RESULTS
=================

Winner: ${winner.extractorName}
  F1 Score: ${(winner.metrics.f1Score * 100).toFixed(2)}%
  Precision: ${(winner.metrics.precision * 100).toFixed(2)}%
  Recall: ${(winner.metrics.recall * 100).toFixed(2)}%
  Execution Time: ${winner.executionTimeMs.toFixed(2)}ms
  Sample Count: ${winner.sampleCount}

All Results:
${results
  .map(
    r =>
      `  ${r.extractorName}:
    F1: ${(r.metrics.f1Score * 100).toFixed(2)}% | P: ${(r.metrics.precision * 100).toFixed(2)}% | R: ${(r.metrics.recall * 100).toFixed(2)}% | Time: ${r.executionTimeMs.toFixed(0)}ms`
  )
  .join('\n')}
  `.trim();

  return {
    results,
    winner,
    recommendations,
    summary,
  };
}

// =============================================================================
// ANALYSIS BY CATEGORY & DIFFICULTY
// =============================================================================

/**
 * Analyze extractor performance by category
 */
export async function analyzeByCateogry(
  extractor: ExtractorFunction
): Promise<{
  byCategory: Record<
    string,
    {
      f1: number;
      precision: number;
      recall: number;
      sampleCount: number;
    }
  >;
}> {
  const categories = ['simple', 'complex_multimorbidity', 'drug_interactions', 'specialized'] as const;
  const results: Record<
    string,
    {
      f1: number;
      precision: number;
      recall: number;
      sampleCount: number;
    }
  > = {};

  for (const category of categories) {
    const testCases = getTestCasesByCategory(category);

    const samples = testCases.map(tc => ({
      predictions: extractor.extract(tc.input),
      groundTruth: testCaseToEntities(tc),
    }));

    const metrics = evaluateNER(
      samples.flatMap(s =>
        Array.isArray(s.predictions) ? s.predictions : []
      ),
      samples.flatMap(s => s.groundTruth)
    );

    results[category] = {
      f1: metrics.f1Score,
      precision: metrics.precision,
      recall: metrics.recall,
      sampleCount: testCases.length,
    };
  }

  return { byCategory: results };
}

/**
 * Analyze extractor performance by difficulty
 */
export async function analyzeByDifficulty(
  extractor: ExtractorFunction
): Promise<{
  byDifficulty: Record<
    string,
    {
      f1: number;
      precision: number;
      recall: number;
      sampleCount: number;
    }
  >;
}> {
  const difficulties = ['easy', 'medium', 'hard'] as const;
  const results: Record<
    string,
    {
      f1: number;
      precision: number;
      recall: number;
      sampleCount: number;
    }
  > = {};

  for (const difficulty of difficulties) {
    const testCases = getTestCasesByDifficulty(difficulty);

    const samples = testCases.map(tc => ({
      predictions: extractor.extract(tc.input),
      groundTruth: testCaseToEntities(tc),
    }));

    const metrics = evaluateNER(
      samples.flatMap(s =>
        Array.isArray(s.predictions) ? s.predictions : []
      ),
      samples.flatMap(s => s.groundTruth)
    );

    results[difficulty] = {
      f1: metrics.f1Score,
      precision: metrics.precision,
      recall: metrics.recall,
      sampleCount: testCases.length,
    };
  }

  return { byDifficulty: results };
}

// =============================================================================
// REPORT GENERATION
// =============================================================================

export interface DetailedBenchmarkReport {
  timestamp: string;
  datasetInfo: ReturnType<typeof getDatasetStatistics>;
  benchmarkResults: BenchmarkResult[];
  byCategory: Array<{
    category: string;
    results: Record<string, BenchmarkResult>;
  }>;
  byDifficulty: Array<{
    difficulty: string;
    results: Record<string, BenchmarkResult>;
  }>;
  recommendations: string[];
}

/**
 * Generate comprehensive benchmark report
 */
export function generateDetailedReport(
  benchmarkResults: ComparativeBenchmarkResult
): DetailedBenchmarkReport {
  const datasetStats = getDatasetStatistics();

  return {
    timestamp: new Date().toISOString(),
    datasetInfo: datasetStats,
    benchmarkResults: benchmarkResults.results,
    byCategory: [], // Would require re-running analysis per category
    byDifficulty: [], // Would require re-running analysis per difficulty
    recommendations: benchmarkResults.recommendations,
  };
}

/**
 * Export results to JSON
 */
export function exportBenchmarkResults(
  results: ComparativeBenchmarkResult
): string {
  return JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      summary: results.summary,
      winner: {
        name: results.winner.extractorName,
        f1: results.winner.metrics.f1Score,
        precision: results.winner.metrics.precision,
        recall: results.winner.metrics.recall,
      },
      allResults: results.results.map(r => ({
        name: r.extractorName,
        f1: r.metrics.f1Score,
        precision: r.metrics.precision,
        recall: r.metrics.recall,
        executionTimeMs: r.executionTimeMs,
        failedSamples: r.failedSamples.length,
      })),
      recommendations: results.recommendations,
    },
    null,
    2
  );
}

// NOTE: RegexExtractor is already exported as a class above
