/**
 * SINGLE MODULE GENERATION TEST
 * ==============================
 * 
 * Test generation for one condition to debug issues.
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
import { writeFile, mkdir } from 'fs/promises';

async function generateSingleModule() {
  console.log('🧪 SINGLE MODULE GENERATION TEST');
  console.log('='.repeat(80));

  const condition = { id: 'diabetes-mellitus-2', name: 'Diabetes Mellitus Tipo 2' };

  // Initialize
  const aggregator = new DataAggregator();
  const synthesizer = new AISynthesizer({
    provider: 'grok',  // Using Grok (grok-4-fast-reasoning model)
    maxTokens: 8000
  });
  
  const pubmed = withCache(new PubMedFetcher());
  const societies = withCache(new MedicalSocietiesFetcher());
  const brazil = withCache(new BrazilFetcher());
  const ontology = withCache(new OntologyFetcher());

  console.log(`\n📊 Generating: ${condition.name}\n`);

  try {
    // Step 1: Fetch
    console.log('Step 1: Fetching from all sources...');
    const query: FetchQuery = { topic: condition.id };
    
    const fetchResults = await Promise.all([
      pubmed.fetch(query),
      societies.fetch(query),
      brazil.fetch(query),
      ontology.fetch(query),
    ]);
    
    const totalSources = fetchResults.reduce((sum, r) => sum + r.metadata.resultCount, 0);
    console.log(`✅ ${totalSources} sources fetched\n`);

    // Step 2: Aggregate
    console.log('Step 2: Aggregating data...');
    const aggregated = aggregator.aggregate(fetchResults);
    aggregated.topic = condition.id;
    console.log(`✅ Aggregated ${aggregated.articles.length} articles, ${aggregated.guidelines.length} guidelines\n`);

    // Step 3: Synthesize
    console.log('Step 3: Synthesizing module with Grok (grok-4-fast-reasoning)...');
    console.log('(This may take 5-15 seconds...)\n');
    
    const startSynth = Date.now();
    const moduleCode = await synthesizer.generateModule(aggregated);
    const synthTime = Date.now() - startSynth;
    
    console.log(`✅ Module generated in ${(synthTime / 1000).toFixed(1)}s`);
    console.log(`   Lines: ${moduleCode.split('\n').length}\n`);

    // Step 4: Save
    await mkdir('lib/content-generation/output/modules', { recursive: true });
    const outputFile = `lib/content-generation/output/modules/${condition.id}.ts`;
    await writeFile(outputFile, moduleCode);
    console.log(`💾 Saved to: ${outputFile}\n`);

    // Show preview
    console.log('📄 Preview (first 30 lines):\n');
    console.log(moduleCode.split('\n').slice(0, 30).join('\n'));
    console.log('\n...\n');

    console.log('='.repeat(80));
    console.log('\n✅ Test Complete!\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

// Run
generateSingleModule();

