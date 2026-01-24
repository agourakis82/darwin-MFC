/**
 * TEST AGGREGATOR
 * ===============
 * 
 * Test data aggregation from multiple fetchers.
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

async function testAggregator() {
  console.log('🧪 Testing Data Aggregator\n');
  console.log('='.repeat(80));

  const aggregator = new DataAggregator();
  
  // Create cached fetchers
  const pubmed = withCache(new PubMedFetcher());
  const societies = withCache(new MedicalSocietiesFetcher());
  const brazil = withCache(new BrazilFetcher());
  const ontology = withCache(new OntologyFetcher());

  const query: FetchQuery = { topic: 'diabetes' };

  console.log('\n📊 Step 1: Fetching from all sources...\n');
  
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

  console.log('\n📊 Step 2: Aggregating data...\n');
  
  const startAggregate = Date.now();
  const aggregated = aggregator.aggregate(results);
  aggregated.topic = 'diabetes';
  const aggregateTime = Date.now() - startAggregate;
  
  console.log(`   ✅ Aggregated in ${aggregateTime}ms`);

  console.log('\n📊 Step 3: Aggregated Data Summary\n');
  
  console.log(`   Topic: ${aggregated.topic}`);
  console.log(`   Total Sources: ${aggregated.metadata.totalSources}`);
  console.log(`   Articles: ${aggregated.articles.length}`);
  console.log(`   Guidelines: ${aggregated.guidelines.length}`);
  console.log(`   Ontology Codes:`);
  console.log(`     - ICD-11: ${aggregated.ontologyCodes.icd11.length}`);
  console.log(`     - SNOMED-CT: ${aggregated.ontologyCodes.snomedCT.length}`);
  console.log(`     - LOINC: ${aggregated.ontologyCodes.loinc.length}`);
  console.log(`     - ATC: ${aggregated.ontologyCodes.atc.length}`);
  console.log(`     - CIAP-2: ${aggregated.ontologyCodes.ciap2.length}`);

  console.log('\n📊 Step 4: Source Breakdown\n');
  
  aggregated.metadata.sources.forEach((source, index) => {
    console.log(`   ${index + 1}. ${source.name}`);
    console.log(`      Type: ${source.type}`);
    console.log(`      Priority: ${source.priority}/10`);
    console.log(`      Results: ${source.resultCount}`);
  });

  console.log('\n📊 Step 5: Sample Articles (Top 3)\n');
  
  aggregated.articles.slice(0, 3).forEach((article, index) => {
    console.log(`   ${index + 1}. ${article.title}`);
    console.log(`      PMID: ${article.pmid}`);
    console.log(`      Journal: ${article.journal}`);
    console.log(`      Year: ${article.publicationDate.getFullYear()}`);
    console.log(`      Study Type: ${article.studyType || 'N/A'}`);
    console.log(`      Source: ${article.source} (Priority: ${article.priority}/10)`);
  });

  console.log('\n📊 Step 6: Sample Guidelines (Top 3)\n');
  
  aggregated.guidelines.slice(0, 3).forEach((guideline, index) => {
    console.log(`   ${index + 1}. ${guideline.title}`);
    console.log(`      Organization: ${guideline.organization}`);
    console.log(`      Year: ${guideline.publicationDate.getFullYear()}`);
    console.log(`      Source: ${guideline.source} (Priority: ${guideline.priority}/10)`);
  });

  console.log('\n📊 Step 7: Sample Ontology Codes\n');
  
  console.log(`   ICD-11: ${aggregated.ontologyCodes.icd11.slice(0, 3).join(', ')}...`);
  console.log(`   SNOMED-CT: ${aggregated.ontologyCodes.snomedCT.slice(0, 3).join(', ')}...`);
  console.log(`   LOINC: ${aggregated.ontologyCodes.loinc.slice(0, 3).join(', ')}...`);
  console.log(`   ATC: ${aggregated.ontologyCodes.atc.slice(0, 3).join(', ')}...`);

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ Aggregator Test Complete!\n');
  
  const totalItems = aggregated.articles.length + aggregated.guidelines.length + 
                     Object.values(aggregated.ontologyCodes).reduce((sum, arr) => sum + arr.length, 0);
  
  console.log('📈 Summary:\n');
  console.log(`   Total Items: ${totalItems}`);
  console.log(`   Fetch Time: ${fetchTime}ms`);
  console.log(`   Aggregate Time: ${aggregateTime}ms`);
  console.log(`   Total Time: ${fetchTime + aggregateTime}ms`);
  
  console.log('\n🎉 Ready for AI Synthesis!');
  
  return aggregated;
}

// Run test
testAggregator().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});

