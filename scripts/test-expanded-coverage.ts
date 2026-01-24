/**
 * TEST EXPANDED COVERAGE
 * ======================
 * 
 * Test coverage for all 19 conditions (13 original + 6 new).
 */

import { MedicalSocietiesFetcher, BrazilFetcher, type FetchQuery } from '../lib/content-generation/fetchers';

async function testExpandedCoverage() {
  console.log('🧪 Testing Expanded Coverage - 19 Conditions\n');
  console.log('='.repeat(80));

  const societies = new MedicalSocietiesFetcher();
  const brazil = new BrazilFetcher();

  // All 19 conditions
  const conditions = [
    // Original 13
    'diabetes', 'hypertension', 'dyslipidemia', 'obesity',
    'asthma', 'copd', 'depression', 'anxiety',
    'osteoporosis', 'hypothyroidism', 'chronic kidney disease',
    'atrial fibrillation', 'heart failure',
    // New 6
    'pneumonia', 'urinary tract infection', 'skin infection',
    'low back pain', 'osteoarthritis',
  ];

  let totalSocieties = 0;
  let totalBrazil = 0;
  const results: Record<string, { societies: number; brazil: number }> = {};

  for (const condition of conditions) {
    const query: FetchQuery = { topic: condition };
    
    const societiesResult = await societies.fetch(query);
    const brazilResult = await brazil.fetch(query);
    
    const societiesCount = societiesResult.metadata.resultCount;
    const brazilCount = brazilResult.metadata.resultCount;
    
    results[condition] = { societies: societiesCount, brazil: brazilCount };
    totalSocieties += societiesCount;
    totalBrazil += brazilCount;
  }

  // Display results
  console.log('\n📊 Coverage by Condition:\n');
  console.log('Condition'.padEnd(30) + 'Societies'.padEnd(12) + 'Brazil'.padEnd(12) + 'Total');
  console.log('─'.repeat(80));

  for (const condition of conditions) {
    const { societies: s, brazil: b } = results[condition];
    const total = s + b;
    const bar = '█'.repeat(total) + '░'.repeat(Math.max(0, 6 - total));
    console.log(
      condition.padEnd(30) +
      s.toString().padEnd(12) +
      b.toString().padEnd(12) +
      `${bar} ${total}`
    );
  }

  console.log('─'.repeat(80));
  console.log(
    'TOTAL'.padEnd(30) +
    totalSocieties.toString().padEnd(12) +
    totalBrazil.toString().padEnd(12) +
    (totalSocieties + totalBrazil).toString()
  );

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n📈 Summary:\n');
  console.log(`   Total Conditions: ${conditions.length}`);
  console.log(`   Conditions with Coverage: ${Object.values(results).filter(r => r.societies + r.brazil > 0).length}/${conditions.length}`);
  console.log(`   Total Medical Societies Guidelines: ${totalSocieties}`);
  console.log(`   Total Brazil MS Guidelines: ${totalBrazil}`);
  console.log(`   Total Guidelines: ${totalSocieties + totalBrazil}`);
  console.log(`   Average per Condition: ${((totalSocieties + totalBrazil) / conditions.length).toFixed(1)}`);

  // Coverage breakdown
  const fullCoverage = Object.values(results).filter(r => r.societies >= 2 && r.brazil >= 2).length;
  const partialCoverage = Object.values(results).filter(r => (r.societies + r.brazil) > 0 && (r.societies < 2 || r.brazil < 2)).length;
  const noCoverage = Object.values(results).filter(r => r.societies + r.brazil === 0).length;

  console.log('\n📊 Coverage Quality:\n');
  console.log(`   Full Coverage (≥2 each): ${fullCoverage}/${conditions.length} (${(fullCoverage / conditions.length * 100).toFixed(0)}%)`);
  console.log(`   Partial Coverage: ${partialCoverage}/${conditions.length} (${(partialCoverage / conditions.length * 100).toFixed(0)}%)`);
  console.log(`   No Coverage: ${noCoverage}/${conditions.length} (${(noCoverage / conditions.length * 100).toFixed(0)}%)`);

  console.log('\n🎉 Test Complete!');
}

// Run
testExpandedCoverage().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});

