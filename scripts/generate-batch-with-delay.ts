/**
 * GENERATE MODULES IN BATCHES WITH DELAY
 * =======================================
 * 
 * Generates modules in smaller batches with delays to avoid rate limits.
 */

import { 
  PubMedFetcher, 
  MedicalSocietiesFetcher, 
  BrazilFetcher,
  OntologyFetcher,
  type FetchQuery 
} from '../lib/content-generation/fetchers';
import { withCache } from '../lib/content-generation/cache';
import { DataAggregator } from '../lib/content-generation/aggregator';
import { AISynthesizer } from '../lib/content-generation/synthesizer';
import { writeFile, mkdir, readdir } from 'fs/promises';

// High-priority conditions to add (10 most important)
const PRIORITY_CONDITIONS = [
  { id: 'diabetes-mellitus-1', name: 'Diabetes Mellitus Tipo 1' },
  { id: 'doenca-arterial-coronariana', name: 'Doença Arterial Coronariana' },
  { id: 'avc', name: 'Acidente Vascular Cerebral' },
  { id: 'tuberculose', name: 'Tuberculose' },
  { id: 'dengue', name: 'Dengue' },
  { id: 'covid-19', name: 'COVID-19' },
  { id: 'gastrite', name: 'Gastrite e Úlcera Péptica' },
  { id: 'drge', name: 'Doença do Refluxo Gastroesofágico' },
  { id: 'artrite-reumatoide', name: 'Artrite Reumatoide' },
  { id: 'enxaqueca', name: 'Enxaqueca' },
];

const DELAY_BETWEEN_MODULES = 2000; // 2 seconds delay

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateBatchWithDelay() {
  console.log('🚀 BATCH GENERATION WITH DELAY');
  console.log('='.repeat(80));
  console.log(`\nGenerating ${PRIORITY_CONDITIONS.length} priority conditions...\n`);

  // Check which modules already exist
  const modulesDir = 'lib/content-generation/output/modules';
  const existingFiles = await readdir(modulesDir);
  const existingIds = existingFiles.map(f => f.replace('.ts', ''));
  
  const conditionsToGenerate = PRIORITY_CONDITIONS.filter(c => !existingIds.includes(c.id));
  
  if (conditionsToGenerate.length === 0) {
    console.log('✅ All priority conditions already generated!\n');
    return;
  }
  
  console.log(`Found ${conditionsToGenerate.length} new conditions to generate\n`);

  const results: any[] = [];
  const startTime = Date.now();

  // Initialize
  const aggregator = new DataAggregator();
  const synthesizer = new AISynthesizer({ provider: 'grok', maxTokens: 8000 });
  
  const pubmed = withCache(new PubMedFetcher());
  const societies = withCache(new MedicalSocietiesFetcher());
  const brazil = withCache(new BrazilFetcher());
  const ontology = withCache(new OntologyFetcher());

  for (let i = 0; i < conditionsToGenerate.length; i++) {
    const condition = conditionsToGenerate[i];
    const conditionStart = Date.now();

    console.log(`\n[${i + 1}/${conditionsToGenerate.length}] ${condition.name}`);
    console.log('-'.repeat(80));

    try {
      // Fetch
      console.log('  📊 Fetching...');
      const query: FetchQuery = { topic: condition.id };
      const fetchResults = await Promise.all([
        pubmed.fetch(query),
        societies.fetch(query),
        brazil.fetch(query),
        ontology.fetch(query),
      ]);
      
      const totalSources = fetchResults.reduce((sum, r) => sum + r.metadata.resultCount, 0);
      console.log(`     ✅ ${totalSources} sources`);

      // Aggregate
      const aggregated = aggregator.aggregate(fetchResults);
      aggregated.topic = condition.id;

      // Synthesize
      console.log('  🤖 Synthesizing...');
      const moduleCode = await synthesizer.generateModule(aggregated);
      console.log(`     ✅ ${moduleCode.split('\n').length} lines`);

      // Save
      const outputFile = `lib/content-generation/output/modules/${condition.id}.ts`;
      await writeFile(outputFile, moduleCode);
      console.log(`     💾 Saved`);

      const duration = Date.now() - conditionStart;
      results.push({
        conditionId: condition.id,
        conditionName: condition.name,
        success: true,
        duration,
      });

      console.log(`     ⏱️  ${(duration / 1000).toFixed(1)}s`);

      // Delay before next module (except for last one)
      if (i < conditionsToGenerate.length - 1) {
        console.log(`     ⏸️  Waiting ${DELAY_BETWEEN_MODULES / 1000}s...`);
        await delay(DELAY_BETWEEN_MODULES);
      }

    } catch (error) {
      const duration = Date.now() - conditionStart;
      console.error(`     ❌ Error: ${error instanceof Error ? error.message : String(error)}`);
      
      results.push({
        conditionId: condition.id,
        conditionName: condition.name,
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration,
      });
    }
  }

  // Summary
  const totalDuration = Date.now() - startTime;
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SUMMARY\n');
  console.log(`✅ Successful: ${successful}/${conditionsToGenerate.length}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏱️  Total: ${(totalDuration / 60000).toFixed(1)} min`);

  // Save results
  await writeFile(
    'lib/content-generation/output/priority-batch-results.json',
    JSON.stringify(results, null, 2)
  );

  console.log('\n✅ Complete!\n');
}

generateBatchWithDelay().catch(console.error);

