/**
 * ANALYZE DARWIN-MFC DISEASES
 * ===========================
 * 
 * Extract all diseases and identify top Primary Care conditions.
 */

import { doencasConsolidadas } from '../lib/data/doencas/index';

async function analyzeDiseases() {
  console.log('🔍 Analyzing Darwin-MFC Disease Database\n');
  console.log('='.repeat(80));

  const diseases = doencasConsolidadas;
  
  console.log(`\n📊 Total Diseases: ${diseases.length}\n`);

  // Group by category
  const byCategory: Record<string, number> = {};
  diseases.forEach(d => {
    const cat = d.categoria || 'Uncategorized';
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  });

  console.log('📋 By Category:\n');
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      const bar = '█'.repeat(Math.min(50, count));
      console.log(`  ${cat.padEnd(30)} ${bar} ${count}`);
    });

  // Identify Primary Care conditions (common, high prevalence)
  console.log('\n' + '='.repeat(80));
  console.log('\n🏥 Top 50 Primary Care Conditions (by prevalence/importance):\n');

  // Filter for common Primary Care conditions
  const primaryCareKeywords = [
    'diabetes', 'hipertensão', 'hypertension', 'dislipidemia', 'dyslipidemia',
    'obesidade', 'obesity', 'asma', 'asthma', 'dpoc', 'copd',
    'depressão', 'depression', 'ansiedade', 'anxiety',
    'osteoporose', 'osteoporosis', 'hipotireoidismo', 'hypothyroidism',
    'doença renal crônica', 'chronic kidney disease', 'ckd',
    'fibrilação atrial', 'atrial fibrillation',
    'insuficiência cardíaca', 'heart failure',
    'pneumonia', 'infecção urinária', 'urinary tract infection', 'uti',
    'celulite', 'cellulitis', 'infecção de pele',
    'lombalgia', 'low back pain', 'dor lombar',
    'artrose', 'osteoarthritis',
    'gastrite', 'gastritis', 'refluxo', 'gerd',
    'anemia', 'hipovitaminose', 'vitamin deficiency',
    'rinite', 'rhinitis', 'sinusite', 'sinusitis',
    'dermatite', 'dermatitis', 'eczema',
    'conjuntivite', 'conjunctivitis',
    'faringite', 'pharyngitis', 'amigdalite', 'tonsillitis',
    'otite', 'otitis',
    'dengue', 'zika', 'chikungunya',
    'tuberculose', 'tuberculosis',
    'hanseníase', 'leprosy', 'hansen',
    'esquistossomose', 'schistosomiasis',
    'doença de chagas', 'chagas',
    'leishmaniose', 'leishmaniasis',
    'hepatite', 'hepatitis',
    'hiv', 'aids',
    'sífilis', 'syphilis',
    'gonorreia', 'gonorrhea',
    'clamídia', 'chlamydia',
  ];

  const primaryCareDiseases = diseases.filter(d => {
    const searchText = `${d.titulo || ''} ${d.sinonimos?.join(' ') || ''} ${d.quickView?.definicao || ''}`.toLowerCase();
    return primaryCareKeywords.some(keyword => searchText.includes(keyword.toLowerCase()));
  });

  console.log(`Found ${primaryCareDiseases.length} Primary Care conditions\n`);

  // Display top 50
  primaryCareDiseases.slice(0, 50).forEach((d, i) => {
    console.log(`${(i + 1).toString().padStart(2)}. ${(d.titulo || '').padEnd(50)} [${d.categoria}]`);
  });

  // Export list for guideline mapping
  console.log('\n' + '='.repeat(80));
  console.log('\n📝 Exporting condition list for guideline mapping...\n');

  const conditionList = primaryCareDiseases.slice(0, 100).map(d => ({
    id: d.id,
    titulo: d.titulo,
    sinonimos: d.sinonimos,
    categoria: d.categoria,
    cid10: d.cid10?.[0] || '',
    prevalencia: d.fullContent?.epidemiologia?.prevalencia || '',
  }));

  const { writeFile } = await import('fs/promises');
  await writeFile(
    'lib/content-generation/output/primary-care-conditions.json',
    JSON.stringify(conditionList, null, 2)
  );

  console.log(`   ✅ Saved ${conditionList.length} conditions to: lib/content-generation/output/primary-care-conditions.json`);

  // Summary statistics
  console.log('\n' + '='.repeat(80));
  console.log('\n📈 Summary:\n');
  console.log(`   Total Diseases in Database: ${diseases.length}`);
  console.log(`   Primary Care Conditions: ${primaryCareDiseases.length}`);
  console.log(`   Top 100 for Guidelines: ${Math.min(100, primaryCareDiseases.length)}`);
  console.log(`   Categories: ${Object.keys(byCategory).length}`);

  console.log('\n✅ Analysis Complete!');
}

// Run
analyzeDiseases().catch(error => {
  console.error('\n❌ Analysis failed:', error);
  process.exit(1);
});

