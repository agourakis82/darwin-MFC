/**
 * GENERATE PILOT MODULE
 * =====================
 * 
 * Generate diabetes module from 125 authoritative sources.
 */

import { writeFile } from 'fs/promises';
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

async function generatePilotModule() {
  console.log('🚀 Generating Pilot Module: Diabetes\n');
  console.log('='.repeat(80));

  // Step 1: Fetch data
  console.log('\n📊 Step 1: Fetching data from all sources...\n');
  
  const pubmed = withCache(new PubMedFetcher());
  const societies = withCache(new MedicalSocietiesFetcher());
  const brazil = withCache(new BrazilFetcher());
  const ontology = withCache(new OntologyFetcher());

  const query: FetchQuery = { topic: 'diabetes' };

  const startFetch = Date.now();
  const results = await Promise.all([
    pubmed.fetch(query),
    societies.fetch(query),
    brazil.fetch(query),
    ontology.fetch(query),
  ]);
  const fetchTime = Date.now() - startFetch;
  
  console.log(`   ✅ Fetched from ${results.length} sources in ${fetchTime}ms`);
  
  results.forEach((result, index) => {
    console.log(`   ${index + 1}. ${result.source}: ${result.metadata.resultCount} results`);
  });

  // Step 2: Aggregate data
  console.log('\n📊 Step 2: Aggregating data...\n');
  
  const aggregator = new DataAggregator();
  const aggregated = aggregator.aggregate(results);
  aggregated.topic = 'Diabetes Mellitus';
  
  const totalItems = aggregated.articles.length + aggregated.guidelines.length + 
                     Object.values(aggregated.ontologyCodes).reduce((sum, arr) => sum + arr.length, 0);
  
  console.log(`   ✅ Aggregated ${totalItems} items`);
  console.log(`      - Articles: ${aggregated.articles.length}`);
  console.log(`      - Guidelines: ${aggregated.guidelines.length}`);
  console.log(`      - Ontology Codes: ${totalItems - aggregated.articles.length - aggregated.guidelines.length}`);

  // Step 3: Generate module with AI
  console.log('\n📊 Step 3: Generating module with AI (MiniMax 2.1)...\n');

  const synthesizer = new AISynthesizer({
    provider: 'minimax',
    maxTokens: 4000,
    temperature: 0.3,
  });

  const startGenerate = Date.now();
  const module = await synthesizer.generateModule(aggregated);
  const generateTime = Date.now() - startGenerate;
  
  console.log(`   ✅ Generated module in ${(generateTime / 1000).toFixed(1)}s`);
  console.log(`   📝 Module length: ${module.length} characters`);

  // Step 4: Save module
  console.log('\n📊 Step 4: Saving module...\n');
  
  const outputPath = 'lib/content-generation/output/diabetes-module.ts';
  await writeFile(outputPath, module, 'utf-8');
  
  console.log(`   ✅ Saved to: ${outputPath}`);

  // Step 5: Display preview
  console.log('\n📊 Step 5: Module Preview\n');
  console.log('─'.repeat(80));
  console.log(module.substring(0, 1000));
  console.log('─'.repeat(80));
  console.log(`\n   ... (${module.length - 1000} more characters)\n`);

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n✅ Pilot Module Generation Complete!\n');
  
  console.log('📈 Summary:\n');
  console.log(`   Topic: Diabetes Mellitus`);
  console.log(`   Sources: ${totalItems} (${aggregated.articles.length} articles + ${aggregated.guidelines.length} guidelines + ${totalItems - aggregated.articles.length - aggregated.guidelines.length} codes)`);
  console.log(`   Fetch Time: ${fetchTime}ms`);
  console.log(`   Generation Time: ${(generateTime / 1000).toFixed(1)}s`);
  console.log(`   Total Time: ${((fetchTime + generateTime) / 1000).toFixed(1)}s`);
  console.log(`   Output: ${outputPath}`);
  
  console.log('\n🎉 Next Steps:\n');
  console.log('   1. Review generated module for quality');
  console.log('   2. Validate citations and evidence levels');
  console.log('   3. Compare with UpToDate');
  console.log('   4. Iterate on prompt template if needed');
  console.log('   5. Generate modules for other 12 conditions');
}

// Run
generatePilotModule().catch(error => {
  console.error('\n❌ Generation failed:', error);
  process.exit(1);
});

