/**
 * RESILIENT BATCH GENERATOR
 * =========================
 *
 * Generates medical modules with:
 * - Exponential backoff retry logic
 * - Circuit breaker pattern
 * - Progress tracking for resume capability
 * - Configurable batch parameters
 *
 * Usage:
 *   npx tsx scripts/generate-resilient-batch.ts [options]
 *
 * Options:
 *   --tier 1|2|3         Select priority tier (default: 1)
 *   --start N            Start from index N (default: 0)
 *   --count N            Generate N modules (default: all in tier)
 *   --retry-failed       Retry previously failed modules
 *   --dry-run            Show what would be generated without running
 */

import { readdir, writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  batchSize: 6,                    // Modules per batch
  interModuleDelay: 5000,          // 5 seconds between modules
  interBatchDelay: 120000,         // 2 minutes between batches
  retryDelayBase: 30000,           // 30 seconds base retry delay
  maxRetries: 3,                   // Max retry attempts
  timeout: 180000,                 // 3 minutes per module
  circuitBreakerThreshold: 3,      // Consecutive failures to trigger
  circuitBreakerCooldown: 300000,  // 5 minutes cooldown
};

// ============================================================================
// PRIORITY TIERS
// ============================================================================

const TIER_1_HIGH_PRIORITY = [
  // Critical infectious diseases
  { id: 'tuberculose-pulmonar', name: 'Tuberculose Pulmonar' },
  { id: 'hepatite-b', name: 'Hepatite B' },
  { id: 'faringoamigdalite', name: 'Faringoamigdalite' },
  { id: 'varicela', name: 'Varicela' },
  { id: 'doenca-chagas', name: 'Doenca de Chagas' },
  // Cardiovascular
  { id: 'angina-estavel', name: 'Angina Estavel' },
  { id: 'hipertensao-pulmonar', name: 'Hipertensao Pulmonar' },
  // Respiratory
  { id: 'pneumonia-comunitaria', name: 'Pneumonia Adquirida na Comunidade' },
  { id: 'asma-infantil', name: 'Asma Infantil' },
  { id: 'bronquite-cronica', name: 'Bronquite Cronica' },
  // Mental Health
  { id: 'transtorno-ansiedade-generalizada', name: 'Transtorno de Ansiedade Generalizada' },
  { id: 'fobia-social', name: 'Fobia Social' },
  { id: 'depressao-idoso', name: 'Depressao no Idoso' },
  // Gynecologic
  { id: 'pre-eclampsia', name: 'Pre-eclampsia' },
  { id: 'sindrome-ovarios-policisticos', name: 'Sindrome dos Ovarios Policisticos' },
  { id: 'endometriose', name: 'Endometriose' },
  // Hematologic
  { id: 'anemia-megaloblastica', name: 'Anemia Megaloblastica' },
  { id: 'anemia-falciforme', name: 'Anemia Falciforme' },
  { id: 'deficiencia-vitamina-b12', name: 'Deficiencia de Vitamina B12' },
  // Neurologic
  { id: 'neuropatia-periferica-diabetica', name: 'Neuropatia Periferica Diabetica' },
];

const TIER_2_MEDIUM_PRIORITY = [
  // Infectious
  { id: 'hepatite-a', name: 'Hepatite A' },
  { id: 'hepatite-e', name: 'Hepatite E' },
  { id: 'leishmaniose-visceral', name: 'Leishmaniose Visceral' },
  { id: 'febre-amarela', name: 'Febre Amarela' },
  { id: 'esquistossomose', name: 'Esquistossomose' },
  { id: 'mononucleose-infecciosa', name: 'Mononucleose Infecciosa' },
  // Dermatologic
  { id: 'dermatite-contato', name: 'Dermatite de Contato' },
  { id: 'hanseniase', name: 'Hanseniase' },
  { id: 'dermatite-seborreica', name: 'Dermatite Seborreica' },
  // Endocrine
  { id: 'hipotireoidismo-subclinico', name: 'Hipotireoidismo Subclinico' },
  { id: 'bocio-simples', name: 'Bocio Simples' },
  { id: 'obesidade-infantil', name: 'Obesidade Infantil' },
  { id: 'deficiencia-vitamina-d', name: 'Deficiencia de Vitamina D' },
  // Pediatric
  { id: 'dermatite-atopica-pediatrica', name: 'Dermatite Atopica Pediatrica' },
  { id: 'anemia-ferropriva-pediatrica', name: 'Anemia Ferropriva Pediatrica' },
  { id: 'otite-media-aguda', name: 'Otite Media Aguda' },
  // Other
  { id: 'hiperplasia-prostatica-benigna', name: 'Hiperplasia Prostatica Benigna' },
  { id: 'neuropatia-periferica', name: 'Neuropatia Periferica' },
];

const TIER_3_LOWER_PRIORITY = [
  // Rare diseases
  { id: 'ataxia-friedreich', name: 'Ataxia de Friedreich' },
  { id: 'sindrome-wiskott-aldrich', name: 'Sindrome de Wiskott-Aldrich' },
  { id: 'talassemia-major', name: 'Talassemia Major' },
  { id: 'purpura-trombocitopenica-trombotica', name: 'Purpura Trombocitopenica Trombotica' },
  // Specialized
  { id: 'doenca-inflamatoria-pelvica', name: 'Doenca Inflamatoria Pelvica' },
  { id: 'mioma-uterino', name: 'Mioma Uterino' },
  { id: 'epididimite', name: 'Epididimite' },
  { id: 'leishmaniose-tegumentar', name: 'Leishmaniose Tegumentar' },
  { id: 'escarlatina', name: 'Escarlatina' },
  { id: 'anemia-hemolitica', name: 'Anemia Hemolitica' },
];

const TIERS: Record<number, { id: string; name: string }[]> = {
  1: TIER_1_HIGH_PRIORITY,
  2: TIER_2_MEDIUM_PRIORITY,
  3: TIER_3_LOWER_PRIORITY,
};

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

interface ProgressState {
  completed: string[];
  failed: Array<{ id: string; error: string; attempts: number }>;
  pending: string[];
  lastRun: string;
}

const PROGRESS_FILE = 'lib/content-generation/output/generation-progress.json';

async function loadProgress(): Promise<ProgressState> {
  try {
    if (existsSync(PROGRESS_FILE)) {
      const content = await readFile(PROGRESS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    // Ignore parse errors
  }
  return { completed: [], failed: [], pending: [], lastRun: '' };
}

async function saveProgress(state: ProgressState): Promise<void> {
  state.lastRun = new Date().toISOString();
  await writeFile(PROGRESS_FILE, JSON.stringify(state, null, 2));
}

// ============================================================================
// CIRCUIT BREAKER
// ============================================================================

class CircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      const elapsed = Date.now() - this.lastFailure;
      if (elapsed > CONFIG.circuitBreakerCooldown) {
        console.log('🔄 Circuit breaker: half-open, testing...');
        this.state = 'half-open';
      } else {
        const remaining = Math.ceil((CONFIG.circuitBreakerCooldown - elapsed) / 1000);
        throw new Error(`Circuit breaker open. Wait ${remaining}s`);
      }
    }

    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  private recordFailure(): void {
    this.failures++;
    this.lastFailure = Date.now();
    if (this.failures >= CONFIG.circuitBreakerThreshold) {
      this.state = 'open';
      console.log(`\n⚡ Circuit breaker OPEN after ${this.failures} failures`);
      console.log(`   Cooling down for ${CONFIG.circuitBreakerCooldown / 1000}s...\n`);
    }
  }

  private reset(): void {
    if (this.state === 'half-open') {
      console.log('✅ Circuit breaker: closed (recovered)');
    }
    this.failures = 0;
    this.state = 'closed';
  }

  isOpen(): boolean {
    return this.state === 'open';
  }

  async waitForCooldown(): Promise<void> {
    if (this.state === 'open') {
      const elapsed = Date.now() - this.lastFailure;
      const remaining = CONFIG.circuitBreakerCooldown - elapsed;
      if (remaining > 0) {
        console.log(`⏳ Waiting ${Math.ceil(remaining / 1000)}s for circuit breaker cooldown...`);
        await sleep(remaining);
        this.state = 'half-open';
      }
    }
  }
}

// ============================================================================
// HELPERS
// ============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseArgs(): { tier: number; start: number; count: number; retryFailed: boolean; dryRun: boolean } {
  const args = process.argv.slice(2);
  let tier = 1;
  let start = 0;
  let count = -1; // -1 means all
  let retryFailed = false;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--tier' && args[i + 1]) {
      tier = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--start' && args[i + 1]) {
      start = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--count' && args[i + 1]) {
      count = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--retry-failed') {
      retryFailed = true;
    } else if (args[i] === '--dry-run') {
      dryRun = true;
    }
  }

  return { tier, start, count, retryFailed, dryRun };
}

// ============================================================================
// MAIN GENERATOR
// ============================================================================

async function generateWithRetry(
  condition: { id: string; name: string },
  circuitBreaker: CircuitBreaker,
  synthesizer: any,
  aggregator: any,
  fetchers: { pubmed: any; societies: any; brazil: any; ontology: any },
  modulesDir: string,
  progress: ProgressState,
  attempt = 1
): Promise<{ success: boolean; error?: string }> {
  const retryDelay = CONFIG.retryDelayBase * Math.pow(3, attempt - 1);

  try {
    // Check circuit breaker
    await circuitBreaker.waitForCooldown();

    // Fetch data
    const query = { topic: condition.id };
    const fetchResults = await Promise.all([
      fetchers.pubmed.fetch(query),
      fetchers.societies.fetch(query),
      fetchers.brazil.fetch(query),
      fetchers.ontology.fetch(query),
    ]);

    // Aggregate
    const aggregated = aggregator.aggregate(fetchResults);
    aggregated.topic = condition.id;

    // Synthesize with circuit breaker
    const moduleCode = await circuitBreaker.execute(async () => {
      return await synthesizer.generateModule(aggregated);
    });

    // Save
    const outputFile = `${modulesDir}/${condition.id}.ts`;
    await writeFile(outputFile, moduleCode);

    // Update progress
    if (!progress.completed.includes(condition.id)) {
      progress.completed.push(condition.id);
    }
    // Remove from failed if it was there
    progress.failed = progress.failed.filter(f => f.id !== condition.id);
    await saveProgress(progress);

    return { success: true };

  } catch (error: any) {
    const errorMsg = error.message || 'Unknown error';
    console.log(`   ❌ Attempt ${attempt}/${CONFIG.maxRetries}: ${errorMsg}`);

    if (attempt < CONFIG.maxRetries) {
      console.log(`   ⏳ Retrying in ${retryDelay / 1000}s...`);
      await sleep(retryDelay);
      return generateWithRetry(
        condition, circuitBreaker, synthesizer, aggregator, fetchers, modulesDir, progress, attempt + 1
      );
    }

    // Max retries reached - record failure
    const existingFail = progress.failed.find(f => f.id === condition.id);
    if (existingFail) {
      existingFail.attempts = attempt;
      existingFail.error = errorMsg;
    } else {
      progress.failed.push({ id: condition.id, error: errorMsg, attempts: attempt });
    }
    await saveProgress(progress);

    return { success: false, error: errorMsg };
  }
}

async function main() {
  const { tier, start, count, retryFailed, dryRun } = parseArgs();

  console.log('='.repeat(80));
  console.log('🚀 RESILIENT BATCH GENERATOR');
  console.log('='.repeat(80));
  console.log(`\nConfig: Tier ${tier}, Start: ${start}, Count: ${count === -1 ? 'all' : count}`);
  console.log(`Retry mode: ${retryFailed}, Dry run: ${dryRun}\n`);

  // Load progress
  const progress = await loadProgress();
  console.log(`📊 Progress: ${progress.completed.length} completed, ${progress.failed.length} failed\n`);

  // Get existing modules
  const modulesDir = 'lib/content-generation/output/modules';
  const existingFiles = await readdir(modulesDir);
  const existingIds = new Set(existingFiles.map(f => f.replace('.ts', '')));

  // Determine what to generate
  let toGenerate: { id: string; name: string }[];

  if (retryFailed) {
    // Retry failed modules
    toGenerate = progress.failed.map(f => {
      const allTiers = [...TIER_1_HIGH_PRIORITY, ...TIER_2_MEDIUM_PRIORITY, ...TIER_3_LOWER_PRIORITY];
      const found = allTiers.find(t => t.id === f.id);
      return found || { id: f.id, name: f.id };
    });
    console.log(`🔄 Retrying ${toGenerate.length} failed modules\n`);
  } else {
    // Get tier conditions
    const tierConditions = TIERS[tier] || TIER_1_HIGH_PRIORITY;

    // Filter out already generated
    toGenerate = tierConditions.filter(c => !existingIds.has(c.id));

    // Apply start and count
    if (start > 0) {
      toGenerate = toGenerate.slice(start);
    }
    if (count > 0) {
      toGenerate = toGenerate.slice(0, count);
    }
  }

  if (toGenerate.length === 0) {
    console.log('✅ No modules to generate!');
    return;
  }

  console.log(`📋 Modules to generate (${toGenerate.length}):`);
  toGenerate.forEach((c, i) => console.log(`   ${i + 1}. ${c.name} (${c.id})`));

  if (dryRun) {
    console.log('\n🔍 Dry run - not generating anything.');
    return;
  }

  // Pre-flight check
  console.log('\n🧪 Testing llm-offload API...');
  const { execSync } = await import('child_process');
  try {
    const tempFile = `/tmp/test-prompt-${Date.now()}.txt`;
    await writeFile(tempFile, 'Say OK');
    execSync(
      `cat "${tempFile}" | timeout 30 llm-offload --provider grok --max-tokens 10 --no-stream 2>&1`,
      { encoding: 'utf-8', timeout: 35000 }
    );
    console.log('✅ API is working!\n');
  } catch (error: any) {
    console.log('❌ API not working:', error.message);
    console.log('\n💡 Try again later or check API status');
    return;
  }

  // Import dependencies
  const { DataAggregator } = await import('../lib/content-generation/aggregator');
  const { AISynthesizer } = await import('../lib/content-generation/synthesizer');
  const {
    PubMedFetcher,
    MedicalSocietiesFetcher,
    BrazilFetcher,
    OntologyFetcher
  } = await import('../lib/content-generation/fetchers');
  const { withCache } = await import('../lib/content-generation/cache');

  const aggregator = new DataAggregator();
  const synthesizer = new AISynthesizer({
    provider: 'grok',
    fallbackProviders: ['minimax'],
    maxTokens: 8000,
    enableFallback: true,
  });

  const fetchers = {
    pubmed: withCache(new PubMedFetcher()),
    societies: withCache(new MedicalSocietiesFetcher()),
    brazil: withCache(new BrazilFetcher()),
    ontology: withCache(new OntologyFetcher()),
  };

  const circuitBreaker = new CircuitBreaker();

  // Statistics
  let successCount = 0;
  let failCount = 0;
  const startTime = Date.now();

  // Process in batches
  const totalBatches = Math.ceil(toGenerate.length / CONFIG.batchSize);

  for (let batchNum = 0; batchNum < totalBatches; batchNum++) {
    const batchStart = batchNum * CONFIG.batchSize;
    const batchEnd = Math.min(batchStart + CONFIG.batchSize, toGenerate.length);
    const batch = toGenerate.slice(batchStart, batchEnd);

    console.log('\n' + '─'.repeat(60));
    console.log(`📦 BATCH ${batchNum + 1}/${totalBatches} (${batch.length} modules)`);
    console.log('─'.repeat(60));

    for (let i = 0; i < batch.length; i++) {
      const condition = batch[i];
      const globalIndex = batchStart + i + 1;
      console.log(`\n[${globalIndex}/${toGenerate.length}] ${condition.name}`);

      const result = await generateWithRetry(
        condition, circuitBreaker, synthesizer, aggregator, fetchers, modulesDir, progress
      );

      if (result.success) {
        successCount++;
        console.log(`   ✅ Generated successfully`);
      } else {
        failCount++;
        console.log(`   ❌ Failed after ${CONFIG.maxRetries} attempts`);
      }

      // Inter-module delay (except last in batch)
      if (i < batch.length - 1) {
        console.log(`   ⏳ Waiting ${CONFIG.interModuleDelay / 1000}s...`);
        await sleep(CONFIG.interModuleDelay);
      }
    }

    // Inter-batch delay (except last batch)
    if (batchNum < totalBatches - 1) {
      console.log(`\n⏸️  Batch complete. Cooling down ${CONFIG.interBatchDelay / 1000}s...`);
      await sleep(CONFIG.interBatchDelay);
    }
  }

  // Summary
  const totalTime = (Date.now() - startTime) / 1000;
  console.log('\n' + '='.repeat(80));
  console.log('🎉 GENERATION COMPLETE');
  console.log('='.repeat(80));
  console.log(`\n   ✅ Success: ${successCount}/${toGenerate.length}`);
  console.log(`   ❌ Failed: ${failCount}/${toGenerate.length}`);
  console.log(`   ⏱️  Total time: ${Math.floor(totalTime / 60)}m ${Math.round(totalTime % 60)}s`);
  console.log(`   📊 Avg per module: ${(totalTime / toGenerate.length).toFixed(1)}s`);

  // Show failed modules
  const finalProgress = await loadProgress();
  if (finalProgress.failed.length > 0) {
    console.log(`\n📋 Failed modules (retry with --retry-failed):`);
    finalProgress.failed.forEach(f => console.log(`   - ${f.id}: ${f.error}`));
  }

  console.log(`\n📁 Total modules: ${existingIds.size + successCount}`);
}

main().catch(console.error);
