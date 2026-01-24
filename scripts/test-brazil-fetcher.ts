/**
 * TEST BRAZIL FETCHER
 * ===================
 * 
 * Test the expanded Brazil MS/ANVISA/CONITEC fetcher.
 */

import { BrazilFetcher, type FetchQuery } from '../lib/content-generation/fetchers';

async function testBrazilFetcher() {
  console.log('🧪 Testing Brazil Health Authorities Fetcher - Expanded Coverage\n');
  console.log('='.repeat(80));

  const fetcher = new BrazilFetcher();

  // Test topics (same as Medical Societies)
  const topics = [
    'diabetes',
    'hypertension',
    'dyslipidemia',
    'obesity',
    'asthma',
    'copd',
    'depression',
    'anxiety',
    'osteoporosis',
    'hypothyroidism',
    'chronic kidney disease',
    'atrial fibrillation',
    'heart failure',
  ];

  let totalGuidelines = 0;
  const results: Record<string, number> = {};

  for (const topic of topics) {
    const query: FetchQuery = { topic };
    const result = await fetcher.fetch(query);
    const count = result.metadata.resultCount;
    
    results[topic] = count;
    totalGuidelines += count;

    console.log(`\n📚 ${topic.toUpperCase()}`);
    console.log(`   Guidelines found: ${count}`);

    if (count > 0) {
      const guidelines = (result.data as any).guidelines;
      guidelines.forEach((guideline: any, index: number) => {
        console.log(`\n   ${index + 1}. ${guideline.title}`);
        console.log(`      Organization: ${guideline.organization}`);
        console.log(`      Year: ${guideline.publicationDate.getFullYear()}`);
        console.log(`      Type: ${(guideline as any).summary.split(' ')[0]}`);
      });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 Summary:\n');
  console.log(`   Total Guidelines: ${totalGuidelines}`);
  console.log(`   Topics Covered: ${Object.keys(results).filter(k => results[k] > 0).length}/${topics.length}`);
  console.log(`   Average per Topic: ${(totalGuidelines / topics.length).toFixed(1)}`);

  console.log('\n📈 Coverage by Topic:\n');
  Object.entries(results)
    .sort((a, b) => b[1] - a[1])
    .forEach(([topic, count]) => {
      const bar = '█'.repeat(count) + '░'.repeat(Math.max(0, 5 - count));
      console.log(`   ${topic.padEnd(25)} ${bar} ${count}`);
    });

  // Organization breakdown
  console.log('\n🏛️  By Organization:\n');
  const orgCounts = {
    'MS': 0,
    'ANVISA': 0,
    'CONITEC': 0,
  };
  
  for (const topic of topics) {
    const query: FetchQuery = { topic };
    const result = await fetcher.fetch(query);
    const guidelines = (result.data as any).guidelines;
    
    guidelines.forEach((g: any) => {
      if (g.organization.includes('Ministério da Saúde')) orgCounts.MS++;
      else if (g.organization.includes('ANVISA')) orgCounts.ANVISA++;
      else if (g.organization.includes('CONITEC')) orgCounts.CONITEC++;
    });
  }

  console.log(`   Ministério da Saúde (MS): ${orgCounts.MS}`);
  console.log(`   ANVISA: ${orgCounts.ANVISA}`);
  console.log(`   CONITEC: ${orgCounts.CONITEC}`);

  console.log('\n🎉 Test Complete!');
}

// Run test
testBrazilFetcher().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});

