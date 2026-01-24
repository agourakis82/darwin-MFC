/**
 * VALIDATE DIABETES MODULE
 * ========================
 * 
 * Run automated validation on the generated diabetes module.
 */

import { readFile } from 'fs/promises';
import { 
  PubMedFetcher, 
  MedicalSocietiesFetcher, 
  BrazilFetcher,
  OntologyFetcher,
  type FetchQuery 
} from '../lib/content-generation/fetchers';
import { withCache } from '../lib/content-generation/cache';
import { DataAggregator } from '../lib/content-generation/aggregator';
import { ContentValidator, type ModuleToValidate } from '../lib/content-generation/validator';

async function validateDiabetesModule() {
  console.log('🔍 Validating Diabetes Module\n');
  console.log('='.repeat(80));

  // Step 1: Load generated module
  console.log('\n📄 Step 1: Loading generated module...\n');

  const moduleText = await readFile('lib/content-generation/output/diabetes-module-v2.ts', 'utf-8');
  
  // Parse the TypeScript object (remove markdown code fences)
  const cleanText = moduleText.replace(/```typescript\n?/g, '').replace(/```\n?/g, '');
  
  // Evaluate as JavaScript object
  const module: ModuleToValidate = eval(`(${cleanText})`);
  
  console.log(`   ✅ Loaded module: ${module.titulo}`);

  // Step 2: Fetch source data
  console.log('\n📊 Step 2: Fetching source data...\n');
  
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

  const aggregator = new DataAggregator();
  const sourceData = aggregator.aggregate(results);
  
  console.log(`   ✅ Aggregated ${sourceData.metadata.totalSources} sources`);

  // Step 3: Run validation
  console.log('\n🔍 Step 3: Running validation...\n');
  
  const validator = new ContentValidator();
  const report = validator.validate(module, sourceData);

  // Step 4: Display results
  console.log('='.repeat(80));
  console.log('\n📊 VALIDATION REPORT\n');
  console.log(`Overall Score: ${report.overallScore}/100 (Grade: ${report.grade})`);
  console.log(`Status: ${report.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Timestamp: ${report.timestamp.toISOString()}`);

  console.log('\n' + '─'.repeat(80));
  console.log('\n📋 Detailed Checks:\n');

  for (const check of report.checks) {
    const icon = check.passed ? '✅' : '❌';
    const scoreBar = '█'.repeat(Math.floor(check.score / 10)) + '░'.repeat(10 - Math.floor(check.score / 10));
    
    console.log(`${icon} ${check.name.padEnd(30)} ${scoreBar} ${check.score}/100 (${(check.weight * 100).toFixed(0)}%)`);
    
    if (check.issues.length > 0) {
      console.log(`   Issues (${check.issues.length}):`);
      check.issues.forEach(issue => console.log(`     • ${issue}`));
    }
    
    if (check.warnings.length > 0) {
      console.log(`   Warnings (${check.warnings.length}):`);
      check.warnings.forEach(warning => console.log(`     ⚠️  ${warning}`));
    }
    
    if (check.suggestions.length > 0) {
      console.log(`   Suggestions:`);
      check.suggestions.forEach(suggestion => console.log(`     💡 ${suggestion}`));
    }
    
    console.log('');
  }

  // Summary
  console.log('─'.repeat(80));
  console.log('\n📈 Summary:\n');
  console.log(`   Total Issues: ${report.summary.totalIssues}`);
  console.log(`   Total Warnings: ${report.summary.totalWarnings}`);
  
  if (report.summary.criticalIssues.length > 0) {
    console.log(`\n   🚨 Critical Issues (${report.summary.criticalIssues.length}):`);
    report.summary.criticalIssues.forEach(issue => console.log(`     • ${issue}`));
  }

  // Recommendations
  console.log('\n' + '='.repeat(80));
  console.log('\n🎯 Recommendations:\n');

  if (report.grade === 'F' || report.grade === 'D') {
    console.log('   ❌ CRITICAL: Module needs major improvements before use');
    console.log('   Priority: Fix citation coverage and ontology codes');
  } else if (report.grade === 'C') {
    console.log('   ⚠️  Module is acceptable but needs improvements');
    console.log('   Priority: Add missing citations and complete ontology codes');
  } else if (report.grade === 'B') {
    console.log('   ✅ Module is good quality with minor issues');
    console.log('   Priority: Address warnings and suggestions');
  } else {
    console.log('   🎉 Module meets all quality standards!');
  }

  console.log('\n✅ Validation Complete!');
  
  // Exit with appropriate code
  process.exit(report.passed ? 0 : 1);
}

// Run
validateDiabetesModule().catch(error => {
  console.error('\n❌ Validation failed:', error);
  process.exit(1);
});

