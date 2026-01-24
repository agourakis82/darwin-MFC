/**
 * GENERATE PILOT MODULE (SIMPLIFIED)
 * ===================================
 * 
 * Generate diabetes module - simplified version that writes prompt to file.
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

async function generatePilot() {
  console.log('🚀 Generating Pilot Module: Diabetes (Simplified)\n');
  console.log('='.repeat(80));

  // Step 1: Fetch data
  console.log('\n📊 Step 1: Fetching data...\n');
  
  const pubmed = withCache(new PubMedFetcher());
  const societies = withCache(new MedicalSocietiesFetcher());
  const brazil = withCache(new BrazilFetcher());
  const ontology = withCache(new OntologyFetcher());

  const query: FetchQuery = { topic: 'diabetes' };

  const results = await Promise.all([
    pubmed.fetch(query),
    societies.fetch(query),
    brazil.fetch(query),
    ontology.fetch(query),
  ]);
  
  console.log(`   ✅ Fetched from ${results.length} sources`);

  // Step 2: Aggregate
  console.log('\n📊 Step 2: Aggregating...\n');
  
  const aggregator = new DataAggregator();
  const data = aggregator.aggregate(results);
  data.topic = 'Diabetes Mellitus';
  
  console.log(`   ✅ Aggregated ${data.articles.length} articles + ${data.guidelines.length} guidelines`);

  // Step 3: Prepare prompt using synthesizer
  console.log('\n📊 Step 3: Preparing prompt with synthesizer...\n');

  const { AISynthesizer } = await import('../lib/content-generation/synthesizer');
  const synthesizer = new AISynthesizer({
    provider: 'minimax',
    maxTokens: 8000, // Increased for reference list
    temperature: 0.3,
  });

  // Use synthesizer's preparePrompt method
  const { readFile: readFileSync } = await import('fs/promises');
  const templatePath = 'lib/content-generation/prompts/module-generation.txt';
  const template = await readFileSync(templatePath, 'utf-8');

  // Format articles with full citation info
  const articlesText = data.articles.slice(0, 10).map((a, i) => {
    return `[${i+1}] ${a.title}
  Authors: ${a.authors.slice(0, 3).join(', ')}${a.authors.length > 3 ? ' et al.' : ''}
  Journal: ${a.journal}, ${a.publicationDate.getFullYear()}
  PMID: ${a.pmid}${a.doi ? `, DOI: ${a.doi}` : ''}
  Study Type: ${a.studyType || 'N/A'}`;
  }).join('\n\n');

  // Format medical societies guidelines
  const societiesText = data.guidelines
    .filter(g => g.source.includes('Medical'))
    .map((g, i) => {
      return `[${i+1}] ${g.title}
  Organization: ${g.organization}
  Year: ${g.publicationDate.getFullYear()}
  URL: ${g.url}`;
    }).join('\n\n');

  // Format Brazil guidelines
  const brazilText = data.guidelines
    .filter(g => g.source.includes('Brazil'))
    .map((g, i) => {
      return `[${i+1}] ${g.title}
  Organization: ${g.organization}
  Year: ${g.publicationDate.getFullYear()}
  URL: ${g.url}`;
    }).join('\n\n');

  // Format ontology codes - ALL 5 SYSTEMS
  const ontologyText = `
ICD-11: ${data.ontologyCodes.icd11.join(', ')}
SNOMED-CT: ${data.ontologyCodes.snomedCT.slice(0, 10).join(', ')}
LOINC: ${data.ontologyCodes.loinc.join(', ')}
ATC: ${data.ontologyCodes.atc.slice(0, 10).join(', ')}
CIAP-2: ${data.ontologyCodes.ciap2.join(', ')}`;

  // Replace placeholders
  const prompt = template
    .replace('{{TOPIC}}', 'Diabetes Mellitus')
    .replace('{{TOPIC_ID}}', 'diabetes-screening')
    .replace('{{ARTICLES}}', articlesText)
    .replace('{{MEDICAL_SOCIETIES_GUIDELINES}}', societiesText)
    .replace('{{BRAZIL_GUIDELINES}}', brazilText)
    .replace('{{ONTOLOGY_CODES}}', ontologyText);

  // Save prompt
  await writeFile('lib/content-generation/output/diabetes-prompt.txt', prompt);
  console.log(`   ✅ Saved prompt to: lib/content-generation/output/diabetes-prompt.txt`);
  console.log(`   📝 Prompt length: ${prompt.length} characters`);

  console.log('\n📊 Step 4: Run this command to generate:\n');
  console.log('   cat lib/content-generation/output/diabetes-prompt.txt | llm-offload --provider minimax --max-tokens 8000 --temperature 0.3 --no-stream > lib/content-generation/output/diabetes-module.ts');
  
  console.log('\n✅ Preparation Complete!');
}

generatePilot().catch(error => {
  console.error('\n❌ Failed:', error);
  process.exit(1);
});

