/**
 * PharmGKB API Test Script
 * Tests connectivity and basic functionality
 */

const PharmGKBClient = require('../lib/pharmacogenetics/pharmgkb-client').default;

async function testPharmGKB() {
  console.log('Testing PharmGKB API connection...\n');

  const client = new PharmGKBClient({
    apiKey: process.env.PHARMGKB_API_KEY,
    cacheTTL: 3600000,
  });

  try {
    // Test 1: Get variant info
    console.log('Test 1: Getting variant info for PA166104948 (CYP2C19*2)...');
    const variant = await client.getVariantInfo('PA166104948');
    console.log('✓ Variant:', variant.name);
    console.log('  Gene:', variant.geneSymbol);
    console.log('  Clinical Significance:', variant.clinicalSignificance);

    // Test 2: Get drug guidelines
    console.log('\nTest 2: Getting drug guidelines for PA128179466 (Clopidogrel)...');
    const guidelines = await client.getDrugGuidelines('PA128179466');
    console.log(`✓ Found ${guidelines.length} guidelines`);
    if (guidelines.length > 0) {
      console.log('  First guideline:', guidelines[0].name);
    }

    // Test 3: Get gene drugs
    console.log('\nTest 3: Getting drugs for CYP2C19 gene...');
    const drugs = await client.getGeneDrugs('CYP2C19');
    console.log(`✓ Found ${drugs.length} drugs`);
    if (drugs.length > 0) {
      console.log('  First 3 drugs:', drugs.slice(0, 3).map(d => d.name).join(', '));
    }

    console.log('\n✅ All PharmGKB tests passed!');
  } catch (error) {
    console.error('❌ PharmGKB test failed:', error.message);
    console.error('\nNote: You need a valid PharmGKB API key.');
    console.error('Get one at: https://api.pharmgkb.org/v1/account/register');
    process.exit(1);
  }
}

testPharmGKB();
