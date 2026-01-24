/**
 * COMPREHENSIVE MODULE QUALITY REVIEW
 * ====================================
 * 
 * Reviews all generated modules for quality, completeness, and accuracy.
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface ModuleReview {
  moduleId: string;
  fileSize: number;
  lineCount: number;
  hasAllFields: boolean;
  missingFields: string[];
  citationCount: number;
  referenceCount: number;
  ontologySystems: string[];
  missingOntologies: string[];
  convergenceStatus: string;
  issues: string[];
  grade: string;
}

const REQUIRED_FIELDS = [
  'id',
  'titulo',
  'categoria',
  'descricao',
  'recomendacoes',
  'epidemiologia',
  'ontologia',
  'referencias',
];

const REQUIRED_ONTOLOGIES = ['cid11', 'snomedCT', 'loinc', 'ciap2', 'atc'];

async function reviewModule(filePath: string): Promise<ModuleReview> {
  const content = await readFile(filePath, 'utf-8');
  const moduleId = filePath.split('/').pop()?.replace('.ts', '') || '';
  
  const review: ModuleReview = {
    moduleId,
    fileSize: Buffer.byteLength(content, 'utf-8'),
    lineCount: content.split('\n').length,
    hasAllFields: true,
    missingFields: [],
    citationCount: 0,
    referenceCount: 0,
    ontologySystems: [],
    missingOntologies: [],
    convergenceStatus: '',
    issues: [],
    grade: 'A',
  };

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    const regex = new RegExp(`${field}:\\s*['{[]`);
    if (!regex.test(content)) {
      review.missingFields.push(field);
      review.hasAllFields = false;
    }
  }

  // Count inline citations [1,2,3]
  const citationMatches = content.match(/\[\d+(?:,\s*\d+)*\]/g);
  review.citationCount = citationMatches ? citationMatches.length : 0;

  // Count references
  const referencesMatch = content.match(/referencias:\s*\[([\s\S]*?)\]/);
  if (referencesMatch) {
    const refContent = referencesMatch[1];
    const refMatches = refContent.match(/\{\s*id:/g);
    review.referenceCount = refMatches ? refMatches.length : 0;
  }

  // Check ontology systems
  for (const ont of REQUIRED_ONTOLOGIES) {
    const regex = new RegExp(`${ont}:\\s*\\[`);
    if (regex.test(content)) {
      review.ontologySystems.push(ont);
    } else {
      review.missingOntologies.push(ont);
    }
  }

  // Check convergence status
  const convergenceMatch = content.match(/convergencia:\s*['"](\w+)['"]/);
  review.convergenceStatus = convergenceMatch ? convergenceMatch[1] : 'MISSING';

  // Identify issues
  if (review.missingFields.length > 0) {
    review.issues.push(`Missing fields: ${review.missingFields.join(', ')}`);
  }
  if (review.citationCount === 0) {
    review.issues.push('No inline citations found');
  }
  if (review.referenceCount === 0) {
    review.issues.push('No references found');
  }
  if (review.missingOntologies.length > 0) {
    review.issues.push(`Missing ontologies: ${review.missingOntologies.join(', ')}`);
  }
  if (review.convergenceStatus === 'MISSING') {
    review.issues.push('Convergence status missing');
  }
  if (review.lineCount < 40) {
    review.issues.push('Module too short (< 40 lines)');
  }

  // Calculate grade
  let score = 100;
  if (review.missingFields.length > 0) score -= 20;
  if (review.citationCount === 0) score -= 30;
  if (review.referenceCount === 0) score -= 20;
  if (review.missingOntologies.length > 0) score -= 10 * review.missingOntologies.length;
  if (review.convergenceStatus === 'MISSING') score -= 10;

  if (score >= 90) review.grade = 'A';
  else if (score >= 80) review.grade = 'B';
  else if (score >= 70) review.grade = 'C';
  else if (score >= 60) review.grade = 'D';
  else review.grade = 'F';

  return review;
}

async function reviewAllModules() {
  console.log('🔍 COMPREHENSIVE MODULE QUALITY REVIEW');
  console.log('='.repeat(80));

  const modulesDir = 'lib/content-generation/output/modules';
  const files = await readdir(modulesDir);
  const moduleFiles = files.filter(f => f.endsWith('.ts'));

  console.log(`\nReviewing ${moduleFiles.length} modules...\n`);

  const reviews: ModuleReview[] = [];

  for (const file of moduleFiles) {
    const filePath = join(modulesDir, file);
    const review = await reviewModule(filePath);
    reviews.push(review);

    const status = review.issues.length === 0 ? '✅' : '⚠️';
    console.log(`${status} ${review.moduleId.padEnd(30)} Grade: ${review.grade} (${review.lineCount} lines, ${review.citationCount} citations, ${review.referenceCount} refs)`);
    
    if (review.issues.length > 0) {
      review.issues.forEach(issue => console.log(`   ⚠️  ${issue}`));
    }
  }

  // Summary statistics
  const gradeA = reviews.filter(r => r.grade === 'A').length;
  const gradeB = reviews.filter(r => r.grade === 'B').length;
  const gradeC = reviews.filter(r => r.grade === 'C').length;
  const gradeD = reviews.filter(r => r.grade === 'D').length;
  const gradeF = reviews.filter(r => r.grade === 'F').length;

  const avgCitations = reviews.reduce((sum, r) => sum + r.citationCount, 0) / reviews.length;
  const avgReferences = reviews.reduce((sum, r) => sum + r.referenceCount, 0) / reviews.length;
  const avgLines = reviews.reduce((sum, r) => sum + r.lineCount, 0) / reviews.length;

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SUMMARY\n');
  console.log(`Total Modules: ${reviews.length}`);
  console.log(`\nGrade Distribution:`);
  console.log(`  A: ${'█'.repeat(gradeA)} ${gradeA} (${Math.round(gradeA/reviews.length*100)}%)`);
  if (gradeB > 0) console.log(`  B: ${'█'.repeat(gradeB)} ${gradeB} (${Math.round(gradeB/reviews.length*100)}%)`);
  if (gradeC > 0) console.log(`  C: ${'█'.repeat(gradeC)} ${gradeC} (${Math.round(gradeC/reviews.length*100)}%)`);
  if (gradeD > 0) console.log(`  D: ${'█'.repeat(gradeD)} ${gradeD} (${Math.round(gradeD/reviews.length*100)}%)`);
  if (gradeF > 0) console.log(`  F: ${'█'.repeat(gradeF)} ${gradeF} (${Math.round(gradeF/reviews.length*100)}%)`);

  console.log(`\nAverages:`);
  console.log(`  Lines per module: ${avgLines.toFixed(1)}`);
  console.log(`  Citations per module: ${avgCitations.toFixed(1)}`);
  console.log(`  References per module: ${avgReferences.toFixed(1)}`);

  const modulesWithIssues = reviews.filter(r => r.issues.length > 0);
  if (modulesWithIssues.length > 0) {
    console.log(`\n⚠️  Modules with Issues: ${modulesWithIssues.length}`);
    modulesWithIssues.forEach(r => {
      console.log(`\n  ${r.moduleId} (Grade: ${r.grade}):`);
      r.issues.forEach(issue => console.log(`    • ${issue}`));
    });
  } else {
    console.log(`\n✅ All modules passed quality review!`);
  }

  // Save detailed report
  await writeFile(
    'lib/content-generation/output/quality-review-report.json',
    JSON.stringify(reviews, null, 2)
  );

  console.log(`\n💾 Detailed report saved to: lib/content-generation/output/quality-review-report.json`);
  console.log('\n✅ Review complete!\n');
}

reviewAllModules().catch(console.error);

