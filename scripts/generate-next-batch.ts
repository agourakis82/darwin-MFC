/**
 * GENERATE NEXT BATCH OF MODULES
 * ===============================
 * 
 * Generates 20 high-priority conditions not yet created.
 */

import { readdir, writeFile } from 'fs/promises';
import { execSync } from 'child_process';

// Next 20 high-priority conditions (not yet generated)
const NEXT_BATCH = [
  { id: 'diabetes-mellitus-1', name: 'Diabetes Mellitus Tipo 1' },
  { id: 'doenca-arterial-coronariana', name: 'Doença Arterial Coronariana' },
  { id: 'avc', name: 'Acidente Vascular Cerebral' },
  { id: 'tuberculose', name: 'Tuberculose' },
  { id: 'dengue', name: 'Dengue' },
  { id: 'gastrite', name: 'Gastrite e Doença Péptica' },
  { id: 'drge', name: 'Doença do Refluxo Gastroesofágico' },
  { id: 'artrite-reumatoide', name: 'Artrite Reumatoide' },
  { id: 'enxaqueca', name: 'Enxaqueca' },
  { id: 'cefaleia-tensional', name: 'Cefaleia Tensional' },
  { id: 'gota', name: 'Gota' },
  { id: 'anemia-ferropriva', name: 'Anemia Ferropriva' },
  { id: 'hipotensao-ortostatica', name: 'Hipotensão Ortostática' },
  { id: 'vertigem', name: 'Vertigem e Tontura' },
  { id: 'conjuntivite', name: 'Conjuntivite' },
  { id: 'otite-media', name: 'Otite Média Aguda' },
  { id: 'faringite', name: 'Faringite e Amigdalite' },
  { id: 'cistite', name: 'Cistite Aguda' },
  { id: 'herpes-zoster', name: 'Herpes Zoster' },
  { id: 'escabiose', name: 'Escabiose' },
];

async function generateNextBatch() {
  console.log('🚀 GENERATING NEXT BATCH OF 20 MODULES');
  console.log('='.repeat(80));
  
  // Check existing modules
  const modulesDir = 'lib/content-generation/output/modules';
  const existingFiles = await readdir(modulesDir);
  const existingIds = new Set(existingFiles.map(f => f.replace('.ts', '')));
  
  console.log(`\n📊 Existing modules: ${existingIds.size}`);
  
  const toGenerate = NEXT_BATCH.filter(c => !existingIds.has(c.id));
  console.log(`📋 New to generate: ${toGenerate.length}\n`);
  
  if (toGenerate.length === 0) {
    console.log('✅ All conditions already generated!');
    return;
  }

  // Test llm-offload first
  console.log('🧪 Testing llm-offload API...');
  try {
    const testPrompt = 'Say "OK" if working';
    const tempFile = `/tmp/test-prompt-${Date.now()}.txt`;
    await writeFile(tempFile, testPrompt);
    
    const result = execSync(
      `cat "${tempFile}" | timeout 30 llm-offload --provider grok --max-tokens 10 --no-stream 2>&1`,
      { encoding: 'utf-8', timeout: 35000 }
    );
    
    if (result.toLowerCase().includes('ok') || result.length > 0) {
      console.log('✅ llm-offload API is working!\n');
    } else {
      console.log('⚠️  llm-offload response:', result.substring(0, 100));
    }
  } catch (error: any) {
    console.log('❌ llm-offload API not working:', error.message);
    console.log('\n💡 Try again later or check API status');
    return;
  }

  console.log('📋 Conditions to generate:');
  toGenerate.forEach((c, i) => console.log(`   ${i + 1}. ${c.name} (${c.id})`));
  
  console.log('\n' + '='.repeat(80));
  console.log('🚀 Starting generation...');
  console.log('   This will take ~7-10 minutes for 20 modules');
  console.log('   Each module takes ~20-30 seconds\n');

  // Import and run the batch generator
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
  const synthesizer = new AISynthesizer({ provider: 'grok', maxTokens: 8000 });
  
  const pubmed = withCache(new PubMedFetcher());
  const societies = withCache(new MedicalSocietiesFetcher());
  const brazil = withCache(new BrazilFetcher());
  const ontology = withCache(new OntologyFetcher());

  let successCount = 0;
  let failCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < toGenerate.length; i++) {
    const condition = toGenerate[i];
    console.log(`\n[${i + 1}/${toGenerate.length}] ${condition.name}`);

    try {
      // Fetch data
      const query = { topic: condition.id };
      const fetchResults = await Promise.all([
        pubmed.fetch(query),
        societies.fetch(query),
        brazil.fetch(query),
        ontology.fetch(query),
      ]);

      // Aggregate
      const aggregated = aggregator.aggregate(fetchResults);
      aggregated.topic = condition.id;

      // Synthesize
      const moduleCode = await synthesizer.generateModule(aggregated);

      // Save
      const outputFile = `${modulesDir}/${condition.id}.ts`;
      await writeFile(outputFile, moduleCode);

      successCount++;
      console.log(`   ✅ Generated (${moduleCode.split('\\n').length} lines)`);

    } catch (error: any) {
      failCount++;
      console.log(`   ❌ Failed: ${error.message}`);
    }

    // Small delay between modules
    if (i < toGenerate.length - 1) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  const totalTime = (Date.now() - startTime) / 1000;
  console.log('\n' + '='.repeat(80));
  console.log(`\n🎉 BATCH COMPLETE!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   ⏱️  Total time: ${totalTime.toFixed(1)}s`);
  console.log(`   📊 Avg per module: ${(totalTime / toGenerate.length).toFixed(1)}s`);
}

generateNextBatch().catch(console.error);

