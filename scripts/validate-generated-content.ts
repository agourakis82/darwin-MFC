/**
 * CONTENT VALIDATION SCRIPT
 * =========================
 *
 * Validates generated educational content for quality and completeness.
 *
 * Usage:
 *   npx tsx scripts/validate-generated-content.ts [options]
 *
 * Options:
 *   --learning-paths   Validate learning paths only
 *   --flashcards       Validate flashcards only
 *   --quiz             Validate quiz questions only
 *   --cases            Validate clinical cases only
 *   --all              Validate all content types
 *   --fix              Attempt to fix minor issues
 *   --verbose          Show detailed validation output
 */

import { readFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  learningPathsDir: 'lib/data/learning-paths',
  flashcardsDir: 'lib/data/flashcards',
  quizQuestionsDir: 'lib/data/quiz-questions',
  clinicalCasesDir: 'lib/data/casos-clinicos',
};

// ============================================================================
// TYPES
// ============================================================================

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  file?: string;
  line?: number;
}

interface ValidationResult {
  file: string;
  passed: boolean;
  score: number;
  issues: ValidationIssue[];
}

interface ValidationReport {
  category: string;
  totalFiles: number;
  passed: number;
  failed: number;
  averageScore: number;
  issues: ValidationIssue[];
  results: ValidationResult[];
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

function checkCitationCoverage(content: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Count sentences with factual claims (rough heuristic)
  const sentences = content.split(/[.!?]\s+/);
  const factualPatterns = [
    /\d+%/, // percentages
    /\d+\s*(mg|ml|mmHg|bpm|kg)/i, // measurements
    /segundo|de acordo|conforme|recomenda/i, // Portuguese citations
    /guidelines?|diretrizes?|protocolo/i, // guideline references
  ];

  let factualSentences = 0;
  let citedSentences = 0;

  for (const sentence of sentences) {
    const isFactual = factualPatterns.some(p => p.test(sentence));
    const hasCitation = /\[\d+(,\s*\d+)*\]/.test(sentence);

    if (isFactual) {
      factualSentences++;
      if (hasCitation) {
        citedSentences++;
      }
    }
  }

  const coverage = factualSentences > 0 ? (citedSentences / factualSentences) * 100 : 100;

  if (coverage < 70) {
    issues.push({
      type: 'error',
      message: `Low citation coverage: ${coverage.toFixed(0)}% (${citedSentences}/${factualSentences} factual claims cited)`,
    });
  } else if (coverage < 90) {
    issues.push({
      type: 'warning',
      message: `Citation coverage could be improved: ${coverage.toFixed(0)}%`,
    });
  }

  return issues;
}

function checkDifficultyDistribution(content: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const beginnerCount = (content.match(/difficulty:\s*['"]beginner['"]/g) || []).length;
  const intermediateCount = (content.match(/difficulty:\s*['"]intermediate['"]/g) || []).length;
  const advancedCount = (content.match(/difficulty:\s*['"]advanced['"]/g) || []).length;

  const total = beginnerCount + intermediateCount + advancedCount;

  if (total > 0) {
    const beginnerPct = (beginnerCount / total) * 100;
    const advancedPct = (advancedCount / total) * 100;

    if (beginnerPct < 20 || beginnerPct > 50) {
      issues.push({
        type: 'warning',
        message: `Beginner difficulty distribution: ${beginnerPct.toFixed(0)}% (target: 30-40%)`,
      });
    }

    if (advancedPct > 30) {
      issues.push({
        type: 'warning',
        message: `High advanced difficulty: ${advancedPct.toFixed(0)}% (target: <25%)`,
      });
    }
  }

  return issues;
}

function checkTypeScriptSyntax(content: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check for common syntax issues
  const syntaxPatterns = [
    { pattern: /,\s*\}/, message: 'Trailing comma before closing brace' },
    { pattern: /\{\s*\}/, message: 'Empty object (might be intentional)', type: 'info' as const },
    { pattern: /undefined/, message: 'Contains undefined value', type: 'warning' as const },
    { pattern: /TODO|FIXME/, message: 'Contains TODO/FIXME comment', type: 'warning' as const },
  ];

  for (const { pattern, message, type } of syntaxPatterns) {
    if (pattern.test(content)) {
      issues.push({
        type: type || 'warning',
        message,
      });
    }
  }

  // Check for unclosed braces
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;

  if (openBraces !== closeBraces) {
    issues.push({
      type: 'error',
      message: `Mismatched braces: ${openBraces} open, ${closeBraces} close`,
    });
  }

  return issues;
}

function checkRequiredFields(content: string, requiredFields: string[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const field of requiredFields) {
    const pattern = new RegExp(`${field}\\s*:`);
    if (!pattern.test(content)) {
      issues.push({
        type: 'error',
        message: `Missing required field: ${field}`,
      });
    }
  }

  return issues;
}

function checkPortugueseContent(content: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check for common English phrases that should be Portuguese
  const englishPatterns = [
    /\bthe\b/gi,
    /\band\b/gi,
    /\bwith\b/gi,
    /\bfor\b/gi,
    /\bpatient\b/gi,
    /\btreatment\b/gi,
  ];

  let englishCount = 0;
  for (const pattern of englishPatterns) {
    const matches = content.match(pattern) || [];
    englishCount += matches.length;
  }

  if (englishCount > 10) {
    issues.push({
      type: 'warning',
      message: `Possible English content detected (${englishCount} potential matches)`,
    });
  }

  return issues;
}

function checkDuplicates(content: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Extract IDs
  const ids = content.match(/id:\s*['"]([^'"]+)['"]/g) || [];
  const uniqueIds = new Set(ids);

  if (ids.length !== uniqueIds.size) {
    issues.push({
      type: 'error',
      message: `Duplicate IDs found: ${ids.length} total, ${uniqueIds.size} unique`,
    });
  }

  return issues;
}

// ============================================================================
// VALIDATORS BY CONTENT TYPE
// ============================================================================

async function validateLearningPath(filePath: string): Promise<ValidationResult> {
  const content = await readFile(filePath, 'utf-8');
  const issues: ValidationIssue[] = [];

  // Required fields for learning paths
  const requiredFields = ['id', 'titleKey', 'category', 'difficulty', 'modules', 'estimatedHours'];
  issues.push(...checkRequiredFields(content, requiredFields));

  // Check citation coverage in custom content
  issues.push(...checkCitationCoverage(content));

  // Check TypeScript syntax
  issues.push(...checkTypeScriptSyntax(content));

  // Check difficulty distribution within modules
  issues.push(...checkDifficultyDistribution(content));

  // Check for Portuguese content
  issues.push(...checkPortugueseContent(content));

  // Check for duplicate module IDs
  issues.push(...checkDuplicates(content));

  // Check module count (should have 6-12 modules)
  const moduleCount = (content.match(/type:\s*['"]content['"]|type:\s*['"]quiz['"]|type:\s*['"]flashcards['"]|type:\s*['"]case_study['"]/g) || []).length;
  if (moduleCount < 4) {
    issues.push({ type: 'warning', message: `Low module count: ${moduleCount} (target: 6-12)` });
  } else if (moduleCount > 15) {
    issues.push({ type: 'warning', message: `High module count: ${moduleCount} (target: 6-12)` });
  }

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;
  const score = Math.max(0, 100 - (errorCount * 20) - (warningCount * 5));

  return {
    file: filePath,
    passed: errorCount === 0,
    score,
    issues: issues.map(i => ({ ...i, file: filePath })),
  };
}

async function validateFlashcards(filePath: string): Promise<ValidationResult> {
  const content = await readFile(filePath, 'utf-8');
  const issues: ValidationIssue[] = [];

  // Check citation coverage
  issues.push(...checkCitationCoverage(content));

  // Check TypeScript syntax
  issues.push(...checkTypeScriptSyntax(content));

  // Check difficulty distribution
  issues.push(...checkDifficultyDistribution(content));

  // Check for duplicates
  issues.push(...checkDuplicates(content));

  // Check card count (should be ~25)
  const cardCount = (content.match(/id:\s*['"]fc-/g) || []).length;
  if (cardCount < 15) {
    issues.push({ type: 'warning', message: `Low card count: ${cardCount} (target: 25)` });
  } else if (cardCount > 35) {
    issues.push({ type: 'warning', message: `High card count: ${cardCount} (target: 25)` });
  }

  // Check required fields per card
  const requiredCardFields = ['frontKey', 'backKey'];
  issues.push(...checkRequiredFields(content, requiredCardFields));

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;
  const score = Math.max(0, 100 - (errorCount * 20) - (warningCount * 5));

  return {
    file: filePath,
    passed: errorCount === 0,
    score,
    issues: issues.map(i => ({ ...i, file: filePath })),
  };
}

async function validateQuizQuestions(filePath: string): Promise<ValidationResult> {
  const content = await readFile(filePath, 'utf-8');
  const issues: ValidationIssue[] = [];

  // Check citation coverage
  issues.push(...checkCitationCoverage(content));

  // Check TypeScript syntax
  issues.push(...checkTypeScriptSyntax(content));

  // Check difficulty distribution
  issues.push(...checkDifficultyDistribution(content));

  // Check for duplicates
  issues.push(...checkDuplicates(content));

  // Check question count (should be 10)
  const questionCount = (content.match(/id:\s*['"]quiz-/g) || []).length;
  if (questionCount < 8) {
    issues.push({ type: 'warning', message: `Low question count: ${questionCount} (target: 10)` });
  }

  // Check for explanations
  const explanationCount = (content.match(/explanationKey:\s*['"]/g) || []).length;
  if (explanationCount < questionCount) {
    issues.push({ type: 'warning', message: `Missing explanations: ${explanationCount}/${questionCount}` });
  }

  // Check question type distribution
  const singleCount = (content.match(/type:\s*['"]single['"]/g) || []).length;
  const multipleCount = (content.match(/type:\s*['"]multiple['"]/g) || []).length;

  if (singleCount === 0) {
    issues.push({ type: 'warning', message: 'No single-choice questions' });
  }

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;
  const score = Math.max(0, 100 - (errorCount * 20) - (warningCount * 5));

  return {
    file: filePath,
    passed: errorCount === 0,
    score,
    issues: issues.map(i => ({ ...i, file: filePath })),
  };
}

async function validateClinicalCase(filePath: string): Promise<ValidationResult> {
  const content = await readFile(filePath, 'utf-8');
  const issues: ValidationIssue[] = [];

  // Required fields for clinical cases
  const requiredFields = ['id', 'titulo', 'categoria', 'dificuldade', 'apresentacao', 'etapas', 'desfecho'];
  issues.push(...checkRequiredFields(content, requiredFields));

  // Check citation coverage
  issues.push(...checkCitationCoverage(content));

  // Check TypeScript syntax
  issues.push(...checkTypeScriptSyntax(content));

  // Check for Portuguese content
  issues.push(...checkPortugueseContent(content));

  // Check stage count (should be 5-6)
  const stageCount = (content.match(/id:\s*['"]etapa-/g) || []).length;
  if (stageCount < 4) {
    issues.push({ type: 'warning', message: `Low stage count: ${stageCount} (target: 5-6)` });
  } else if (stageCount > 8) {
    issues.push({ type: 'warning', message: `High stage count: ${stageCount} (target: 5-6)` });
  }

  // Check for learning objectives
  if (!content.includes('objetivosAprendizagem')) {
    issues.push({ type: 'error', message: 'Missing learning objectives' });
  }

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;
  const score = Math.max(0, 100 - (errorCount * 20) - (warningCount * 5));

  return {
    file: filePath,
    passed: errorCount === 0,
    score,
    issues: issues.map(i => ({ ...i, file: filePath })),
  };
}

// ============================================================================
// MAIN VALIDATION FUNCTIONS
// ============================================================================

async function validateDirectory(
  dirPath: string,
  category: string,
  validator: (filePath: string) => Promise<ValidationResult>,
  verbose: boolean
): Promise<ValidationReport> {
  const fullPath = join(process.cwd(), dirPath);

  if (!existsSync(fullPath)) {
    return {
      category,
      totalFiles: 0,
      passed: 0,
      failed: 0,
      averageScore: 0,
      issues: [{ type: 'error', message: `Directory not found: ${fullPath}` }],
      results: [],
    };
  }

  const files = await glob(`${fullPath}/**/*.ts`);
  const tsFiles = files.filter(f => !f.endsWith('index.ts'));

  if (tsFiles.length === 0) {
    return {
      category,
      totalFiles: 0,
      passed: 0,
      failed: 0,
      averageScore: 0,
      issues: [{ type: 'info', message: `No files to validate in ${dirPath}` }],
      results: [],
    };
  }

  const results: ValidationResult[] = [];
  const allIssues: ValidationIssue[] = [];

  for (const file of tsFiles) {
    try {
      const result = await validator(file);
      results.push(result);
      allIssues.push(...result.issues);

      if (verbose) {
        const status = result.passed ? '✅' : '❌';
        console.log(`  ${status} ${file.split('/').pop()} - Score: ${result.score}`);
        if (result.issues.length > 0 && !result.passed) {
          result.issues.forEach(i => console.log(`    ${i.type.toUpperCase()}: ${i.message}`));
        }
      }
    } catch (error: any) {
      results.push({
        file,
        passed: false,
        score: 0,
        issues: [{ type: 'error', message: `Parse error: ${error.message}`, file }],
      });
    }
  }

  const passed = results.filter(r => r.passed).length;
  const failed = results.length - passed;
  const averageScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;

  return {
    category,
    totalFiles: results.length,
    passed,
    failed,
    averageScore,
    issues: allIssues,
    results,
  };
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const validateAll = args.includes('--all') || args.length === 0;
  const validatePaths = args.includes('--learning-paths') || validateAll;
  const validateFlash = args.includes('--flashcards') || validateAll;
  const validateQuiz = args.includes('--quiz') || validateAll;
  const validateCases = args.includes('--cases') || validateAll;
  const verbose = args.includes('--verbose');

  console.log('='.repeat(60));
  console.log('CONTENT VALIDATION');
  console.log('='.repeat(60));

  const reports: ValidationReport[] = [];

  if (validatePaths) {
    console.log('\n📚 Validating Learning Paths...');
    const report = await validateDirectory(
      CONFIG.learningPathsDir,
      'Learning Paths',
      validateLearningPath,
      verbose
    );
    reports.push(report);
  }

  if (validateFlash) {
    console.log('\n🎴 Validating Flashcards...');
    const report = await validateDirectory(
      CONFIG.flashcardsDir,
      'Flashcards',
      validateFlashcards,
      verbose
    );
    reports.push(report);
  }

  if (validateQuiz) {
    console.log('\n❓ Validating Quiz Questions...');
    const report = await validateDirectory(
      CONFIG.quizQuestionsDir,
      'Quiz Questions',
      validateQuizQuestions,
      verbose
    );
    reports.push(report);
  }

  if (validateCases) {
    console.log('\n🏥 Validating Clinical Cases...');
    const report = await validateDirectory(
      CONFIG.clinicalCasesDir,
      'Clinical Cases',
      validateClinicalCase,
      verbose
    );
    reports.push(report);
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));

  let totalPassed = 0;
  let totalFailed = 0;
  let totalFiles = 0;

  for (const report of reports) {
    const emoji = report.failed === 0 ? '✅' : '❌';
    console.log(`\n${emoji} ${report.category}`);
    console.log(`   Files: ${report.totalFiles}`);
    console.log(`   Passed: ${report.passed}`);
    console.log(`   Failed: ${report.failed}`);
    console.log(`   Average Score: ${report.averageScore.toFixed(1)}`);

    if (report.failed > 0 && !verbose) {
      const errors = report.issues.filter(i => i.type === 'error');
      console.log(`   Errors: ${errors.length}`);
      errors.slice(0, 3).forEach(e => console.log(`     - ${e.message}`));
      if (errors.length > 3) {
        console.log(`     ... and ${errors.length - 3} more`);
      }
    }

    totalPassed += report.passed;
    totalFailed += report.failed;
    totalFiles += report.totalFiles;
  }

  console.log('\n' + '='.repeat(60));
  console.log('OVERALL');
  console.log('='.repeat(60));
  console.log(`Total Files: ${totalFiles}`);
  console.log(`Passed: ${totalPassed} (${totalFiles > 0 ? ((totalPassed / totalFiles) * 100).toFixed(1) : 0}%)`);
  console.log(`Failed: ${totalFailed}`);

  if (totalFailed > 0) {
    console.log('\n⚠️  Some content failed validation. Run with --verbose for details.');
    process.exit(1);
  } else if (totalFiles > 0) {
    console.log('\n✅ All content passed validation!');
  } else {
    console.log('\n📭 No content to validate. Run generation scripts first.');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
