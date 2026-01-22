/**
 * BATCH QUALITY VALIDATOR FOR ALL MODULES
 * ========================================
 *
 * Validates all 100 generated modules for:
 * - Required fields
 * - Inline citations
 * - Evidence levels
 * - Ontology codes
 * - References completeness
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const MODULES_DIR = 'lib/content-generation/output/modules';

// Required fields
const REQUIRED_FIELDS = ['id', 'titulo', 'categoria', 'descricao', 'recomendacoes', 'epidemiologia', 'ontologia', 'referencias'];
const REQUIRED_RECOMENDACOES = ['sus', 'sociedadesMedicas', 'convergencia'];
const REQUIRED_SUS_FIELDS = ['indicacao', 'populacaoAlvo', 'periodicidade', 'metodos', 'evidencia'];
const REQUIRED_EPIDEMIOLOGIA = ['prevalencia', 'incidencia', 'mortalidade'];
const REQUIRED_ONTOLOGIA = ['cid11', 'snomedCT', 'loinc', 'ciap2', 'atc'];

// Valid evidence levels
const VALID_EVIDENCE_LEVELS = ['Ia', 'Ib', 'IIa', 'IIb', 'III', 'IV'];

// Valid convergence values
const VALID_CONVERGENCE = ['convergencia', 'parcial', 'divergencia', 'em_disputa'];

interface ValidationResult {
  moduleId: string;
  score: number;
  grade: string;
  issues: string[];
  checks: {
    requiredFields: boolean;
    citations: boolean;
    evidenceLevel: boolean;
    ontology: boolean;
    references: boolean;
    convergence: boolean;
  };
}

interface SummaryResult {
  totalModules: number;
  passed: number;
  failed: number;
  gradeDistribution: Record<string, number>;
  commonIssues: Record<string, number>;
  averageScore: number;
}

function parseModuleContent(content: string): any {
  // Remove TypeScript export and convert to evaluable object
  const cleanContent = content
    .replace(/^export\s+const\s+\w+\s*=\s*/, '')
    .replace(/;?\s*$/, '');

  try {
    // Use Function constructor to safely evaluate the object literal
    const fn = new Function(`return ${cleanContent}`);
    return fn();
  } catch (e) {
    return null;
  }
}

function checkInlineCitations(text: string): { found: number; valid: boolean } {
  const citationPattern = /\[[\d,\s]+\]/g;
  const matches = text.match(citationPattern) || [];
  return {
    found: matches.length,
    valid: matches.length > 0
  };
}

function validateModule(content: string, filename: string): ValidationResult {
  const issues: string[] = [];
  const checks = {
    requiredFields: true,
    citations: true,
    evidenceLevel: true,
    ontology: true,
    references: true,
    convergence: true,
  };

  // Parse module
  const module = parseModuleContent(content);

  if (!module) {
    return {
      moduleId: filename.replace('.ts', ''),
      score: 0,
      grade: 'F',
      issues: ['Failed to parse module content'],
      checks: { ...checks, requiredFields: false },
    };
  }

  // 1. Check required fields (25 points)
  for (const field of REQUIRED_FIELDS) {
    if (!module[field]) {
      issues.push(`Missing required field: ${field}`);
      checks.requiredFields = false;
    }
  }

  // Check recomendacoes structure
  if (module.recomendacoes) {
    for (const field of REQUIRED_RECOMENDACOES) {
      if (!module.recomendacoes[field]) {
        issues.push(`Missing recomendacoes.${field}`);
        checks.requiredFields = false;
      }
    }

    // Check SUS fields
    if (module.recomendacoes.sus) {
      for (const field of REQUIRED_SUS_FIELDS) {
        if (!module.recomendacoes.sus[field]) {
          issues.push(`Missing recomendacoes.sus.${field}`);
          checks.requiredFields = false;
        }
      }
    }

    // Check sociedadesMedicas fields
    if (module.recomendacoes.sociedadesMedicas) {
      for (const field of REQUIRED_SUS_FIELDS) {
        if (!module.recomendacoes.sociedadesMedicas[field]) {
          issues.push(`Missing recomendacoes.sociedadesMedicas.${field}`);
          checks.requiredFields = false;
        }
      }
    }
  }

  // Check epidemiologia structure
  if (module.epidemiologia) {
    for (const field of REQUIRED_EPIDEMIOLOGIA) {
      if (!module.epidemiologia[field]) {
        issues.push(`Missing epidemiologia.${field}`);
        checks.requiredFields = false;
      }
    }
  }

  // 2. Check inline citations (25 points)
  const textFields = [
    module.descricao,
    module.recomendacoes?.sus?.indicacao,
    module.recomendacoes?.sus?.populacaoAlvo,
    module.recomendacoes?.sociedadesMedicas?.indicacao,
    module.epidemiologia?.prevalencia,
    module.epidemiologia?.incidencia,
  ].filter(Boolean);

  let totalCitations = 0;
  for (const text of textFields) {
    const { found } = checkInlineCitations(text);
    totalCitations += found;
  }

  if (totalCitations < 5) {
    issues.push(`Low citation count: ${totalCitations} (minimum 5 expected)`);
    checks.citations = false;
  }

  // 3. Check evidence levels (15 points)
  const susEvidence = module.recomendacoes?.sus?.evidencia;
  const socEvidence = module.recomendacoes?.sociedadesMedicas?.evidencia;

  if (susEvidence && !VALID_EVIDENCE_LEVELS.includes(susEvidence)) {
    issues.push(`Invalid SUS evidence level: ${susEvidence}`);
    checks.evidenceLevel = false;
  }
  if (socEvidence && !VALID_EVIDENCE_LEVELS.includes(socEvidence)) {
    issues.push(`Invalid societies evidence level: ${socEvidence}`);
    checks.evidenceLevel = false;
  }

  // 4. Check ontology codes (15 points)
  if (module.ontologia) {
    for (const code of REQUIRED_ONTOLOGIA) {
      const codeArray = module.ontologia[code];
      if (!codeArray || !Array.isArray(codeArray) || codeArray.length === 0) {
        issues.push(`Missing or empty ontology: ${code}`);
        checks.ontology = false;
      }
    }
  }

  // 5. Check references (15 points)
  if (!module.referencias || !Array.isArray(module.referencias)) {
    issues.push('Missing referencias array');
    checks.references = false;
  } else if (module.referencias.length < 5) {
    issues.push(`Low reference count: ${module.referencias.length} (minimum 5 expected)`);
    checks.references = false;
  } else {
    // Check reference structure
    for (const ref of module.referencias) {
      if (!ref.id || !ref.citation) {
        issues.push('Invalid reference structure (missing id or citation)');
        checks.references = false;
        break;
      }
    }
  }

  // 6. Check convergence value (5 points)
  const convergence = module.recomendacoes?.convergencia;
  if (convergence && !VALID_CONVERGENCE.includes(convergence)) {
    issues.push(`Invalid convergence value: ${convergence}`);
    checks.convergence = false;
  }

  // Calculate score
  let score = 0;
  if (checks.requiredFields) score += 25;
  if (checks.citations) score += 25;
  if (checks.evidenceLevel) score += 15;
  if (checks.ontology) score += 15;
  if (checks.references) score += 15;
  if (checks.convergence) score += 5;

  // Determine grade
  let grade: string;
  if (score >= 90) grade = 'A';
  else if (score >= 80) grade = 'B';
  else if (score >= 70) grade = 'C';
  else if (score >= 60) grade = 'D';
  else grade = 'F';

  return {
    moduleId: module.id || filename.replace('.ts', ''),
    score,
    grade,
    issues,
    checks,
  };
}

async function validateAllModules(): Promise<void> {
  console.log('='.repeat(80));
  console.log('BATCH QUALITY VALIDATION - 100 MODULES');
  console.log('='.repeat(80));
  console.log('');

  const files = await readdir(MODULES_DIR);
  const tsFiles = files.filter(f => f.endsWith('.ts'));

  console.log(`Found ${tsFiles.length} modules to validate\n`);

  const results: ValidationResult[] = [];
  const gradeDistribution: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  const commonIssues: Record<string, number> = {};

  for (let i = 0; i < tsFiles.length; i++) {
    const file = tsFiles[i];
    const content = await readFile(join(MODULES_DIR, file), 'utf-8');
    const result = validateModule(content, file);
    results.push(result);
    gradeDistribution[result.grade]++;

    // Track common issues
    for (const issue of result.issues) {
      const shortIssue = issue.split(':')[0];
      commonIssues[shortIssue] = (commonIssues[shortIssue] || 0) + 1;
    }

    // Progress indicator
    if ((i + 1) % 20 === 0) {
      console.log(`Validated ${i + 1}/${tsFiles.length} modules...`);
    }
  }

  // Sort results by score (lowest first for problem identification)
  results.sort((a, b) => a.score - b.score);

  // Calculate summary
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const averageScore = totalScore / results.length;
  const passed = results.filter(r => r.score >= 70).length;
  const failed = results.filter(r => r.score < 70).length;

  console.log('\n' + '='.repeat(80));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(80));
  console.log('');
  console.log(`Total Modules:    ${tsFiles.length}`);
  console.log(`Average Score:    ${averageScore.toFixed(1)}/100`);
  console.log(`Passed (≥70):     ${passed} (${((passed/tsFiles.length)*100).toFixed(1)}%)`);
  console.log(`Failed (<70):     ${failed} (${((failed/tsFiles.length)*100).toFixed(1)}%)`);
  console.log('');
  console.log('Grade Distribution:');
  console.log(`  A (90-100): ${gradeDistribution.A} modules (${((gradeDistribution.A/tsFiles.length)*100).toFixed(1)}%)`);
  console.log(`  B (80-89):  ${gradeDistribution.B} modules (${((gradeDistribution.B/tsFiles.length)*100).toFixed(1)}%)`);
  console.log(`  C (70-79):  ${gradeDistribution.C} modules (${((gradeDistribution.C/tsFiles.length)*100).toFixed(1)}%)`);
  console.log(`  D (60-69):  ${gradeDistribution.D} modules (${((gradeDistribution.D/tsFiles.length)*100).toFixed(1)}%)`);
  console.log(`  F (<60):    ${gradeDistribution.F} modules (${((gradeDistribution.F/tsFiles.length)*100).toFixed(1)}%)`);

  // Show common issues
  const sortedIssues = Object.entries(commonIssues)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  if (sortedIssues.length > 0) {
    console.log('\nMost Common Issues:');
    for (const [issue, count] of sortedIssues) {
      console.log(`  ${count}x - ${issue}`);
    }
  }

  // Show failing modules details
  const failing = results.filter(r => r.score < 70);
  if (failing.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('FAILING MODULES (Score < 70)');
    console.log('='.repeat(80));
    for (const result of failing) {
      console.log(`\n${result.moduleId}: ${result.score}/100 (${result.grade})`);
      for (const issue of result.issues.slice(0, 5)) {
        console.log(`  - ${issue}`);
      }
    }
  }

  // Show top and bottom performers
  console.log('\n' + '='.repeat(80));
  console.log('SAMPLE RESULTS');
  console.log('='.repeat(80));

  console.log('\nTop 5 Performers:');
  const top5 = [...results].sort((a, b) => b.score - a.score).slice(0, 5);
  for (const r of top5) {
    console.log(`  ${r.moduleId}: ${r.score}/100 (${r.grade})`);
  }

  console.log('\nBottom 5 Performers:');
  const bottom5 = results.slice(0, 5);
  for (const r of bottom5) {
    console.log(`  ${r.moduleId}: ${r.score}/100 (${r.grade}) - Issues: ${r.issues.length}`);
  }

  // Final verdict
  console.log('\n' + '='.repeat(80));
  if (passed === tsFiles.length) {
    console.log('✅ ALL MODULES PASSED QUALITY CHECK');
  } else if (passed >= tsFiles.length * 0.9) {
    console.log(`⚠️  ${passed}/${tsFiles.length} MODULES PASSED (90%+ threshold met)`);
  } else {
    console.log(`❌ QUALITY CHECK FAILED: ${failed} modules need attention`);
  }
  console.log('='.repeat(80));
}

validateAllModules().catch(console.error);
