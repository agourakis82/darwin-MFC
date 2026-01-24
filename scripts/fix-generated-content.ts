/**
 * FIX GENERATED CONTENT
 * ====================
 * Fixes syntax errors and issues in generated content files.
 */

import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { glob } from 'glob';
import { join } from 'path';

interface FixResult {
  file: string;
  issues: string[];
  fixed: boolean;
}

// ============================================================================
// FIX FUNCTIONS
// ============================================================================

/**
 * Fix malformed object syntax errors in clinical cases
 * e.g., { id: 'd': { becomes { id: 'd',
 */
function fixObjectSyntax(content: string): { content: string; issues: string[] } {
  const issues: string[] = [];
  let fixed = content;

  // Fix pattern: { id: 'X': { (extra colon and brace)
  const pattern1 = /\{\s*id:\s*'([^']+)':\s*\{/g;
  const matches1 = [...fixed.matchAll(pattern1)];
  if (matches1.length > 0) {
    fixed = fixed.replace(pattern1, "{ id: '$1', ");
    issues.push(`Fixed ${matches1.length} malformed object syntax (id:'X':{ → id:'X',)`);
  }

  // Fix pattern: { id: 'c', 'string here', correta: (missing texto: property)
  const pattern2 = /\{\s*id:\s*'([^']+)',\s*'([^']+)',\s*correta:/g;
  const matches2 = [...fixed.matchAll(pattern2)];
  if (matches2.length > 0) {
    fixed = fixed.replace(pattern2, "{ id: '$1', texto: '$2', correta:");
    issues.push(`Fixed ${matches2.length} missing 'texto:' properties in option objects`);
  }

  // Fix pattern: { id: 'd': texto: (colon instead of comma)
  const pattern3 = /\{\s*id:\s*'([^']+)':\s+texto:/g;
  const matches3 = [...fixed.matchAll(pattern3)];
  if (matches3.length > 0) {
    fixed = fixed.replace(pattern3, "{ id: '$1', texto:");
    issues.push(`Fixed ${matches3.length} colon-instead-of-comma errors in option objects`);
  }

  return { content: fixed, issues };
}

/**
 * Fix missing closing braces at end of files
 */
function fixClosingBraces(content: string): { content: string; issues: string[] } {
  const issues: string[] = [];
  let fixed = content;

  // Count opening and closing braces
  const openCount = (fixed.match(/\{/g) || []).length;
  const closeCount = (fixed.match(/\}/g) || []).length;

  if (openCount > closeCount) {
    const needed = openCount - closeCount;
    fixed = fixed.trimRight() + '\n' + '}'.repeat(needed);
    issues.push(`Added ${needed} closing brace(s) at end of file`);
  } else if (closeCount > openCount) {
    issues.push(`Warning: More closing braces (${closeCount}) than opening (${openCount})`);
  }

  return { content: fixed, issues };
}

/**
 * Remove duplicate citations
 */
function removeDuplicateCitations(content: string): { content: string; issues: string[] } {
  const issues: string[] = [];
  let fixed = content;

  // Fix pattern: [1,1] or [2,2,3,3]
  const pattern = /\[([0-9,\s]+)\]/g;
  const fixed2 = fixed.replace(pattern, (match) => {
    const nums = match
      .slice(1, -1)
      .split(',')
      .map((n) => n.trim())
      .filter((n) => n);
    const unique = [...new Set(nums)];
    if (unique.length < nums.length) {
      issues.push(`Removed duplicate citations in ${match}`);
      return `[${unique.join(',')}]`;
    }
    return match;
  });

  return { content: fixed2, issues };
}

/**
 * Fix common JSON/TypeScript patterns
 */
function fixCommonPatterns(content: string): { content: string; issues: string[] } {
  const issues: string[] = [];
  let fixed = content;

  // Fix trailing commas before closing braces/brackets
  const pattern1 = /,(\s*[}\]])/g;
  const matches1 = (fixed.match(pattern1) || []).length;
  if (matches1 > 0) {
    fixed = fixed.replace(pattern1, '$1');
    issues.push(`Removed ${matches1} trailing commas`);
  }

  // Fix consecutive commas
  const pattern2 = /,(\s*,)/g;
  const matches2 = (fixed.match(pattern2) || []).length;
  if (matches2 > 0) {
    fixed = fixed.replace(pattern2, ',');
    issues.push(`Fixed ${matches2} consecutive commas`);
  }

  return { content: fixed, issues };
}

// ============================================================================
// MAIN FIX LOGIC
// ============================================================================

async function fixClinicalCases(): Promise<FixResult[]> {
  const files = await glob('lib/data/casos-clinicos/**/*.ts', {
    ignore: ['**/index.ts'],
  });

  const results: FixResult[] = [];

  for (const file of files) {
    try {
      let content = await readFile(file, 'utf-8');
      const issues: string[] = [];

      // Apply all fixes
      let result = fixObjectSyntax(content);
      content = result.content;
      issues.push(...result.issues);

      result = fixClosingBraces(content);
      content = result.content;
      issues.push(...result.issues);

      result = removeDuplicateCitations(content);
      content = result.content;
      issues.push(...result.issues);

      result = fixCommonPatterns(content);
      content = result.content;
      issues.push(...result.issues);

      // Write back if changed
      if (issues.length > 0) {
        await writeFile(file, content);
        results.push({ file, issues, fixed: true });
      } else {
        results.push({ file, issues: [], fixed: false });
      }
    } catch (error: any) {
      results.push({ file, issues: [`Error: ${error.message}`], fixed: false });
    }
  }

  return results;
}

async function fixQuizQuestions(): Promise<FixResult[]> {
  const files = await glob('lib/data/quiz-questions/**/*.ts', {
    ignore: ['**/index.ts'],
  });

  const results: FixResult[] = [];

  for (const file of files) {
    try {
      let content = await readFile(file, 'utf-8');
      const issues: string[] = [];

      // For quiz questions, mainly fix common patterns and trailing commas
      let result = fixCommonPatterns(content);
      content = result.content;
      issues.push(...result.issues);

      result = removeDuplicateCitations(content);
      content = result.content;
      issues.push(...result.issues);

      result = fixClosingBraces(content);
      content = result.content;
      issues.push(...result.issues);

      if (issues.length > 0) {
        await writeFile(file, content);
        results.push({ file, issues, fixed: true });
      } else {
        results.push({ file, issues: [], fixed: false });
      }
    } catch (error: any) {
      results.push({ file, issues: [`Error: ${error.message}`], fixed: false });
    }
  }

  return results;
}

async function fixLearningPaths(): Promise<FixResult[]> {
  const files = await glob('lib/data/learning-paths/**/*.ts', {
    ignore: ['**/index.ts'],
  });

  const results: FixResult[] = [];

  for (const file of files) {
    try {
      let content = await readFile(file, 'utf-8');
      const issues: string[] = [];

      let result = fixCommonPatterns(content);
      content = result.content;
      issues.push(...result.issues);

      result = fixClosingBraces(content);
      content = result.content;
      issues.push(...result.issues);

      if (issues.length > 0) {
        await writeFile(file, content);
        results.push({ file, issues, fixed: true });
      } else {
        results.push({ file, issues: [], fixed: false });
      }
    } catch (error: any) {
      results.push({ file, issues: [`Error: ${error.message}`], fixed: false });
    }
  }

  return results;
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('FIXING GENERATED CONTENT');
  console.log('='.repeat(60));

  console.log('\n📁 Fixing Clinical Cases...');
  const caseResults = await fixClinicalCases();
  const casesFixed = caseResults.filter((r) => r.fixed).length;
  console.log(`  ✅ Fixed ${casesFixed}/${caseResults.length} files`);
  caseResults
    .filter((r) => r.issues.length > 0)
    .slice(0, 5)
    .forEach((r) => {
      console.log(`     ${r.file.split('/').pop()}: ${r.issues[0]}`);
    });

  console.log('\n❓ Fixing Quiz Questions...');
  const quizResults = await fixQuizQuestions();
  const quizFixed = quizResults.filter((r) => r.fixed).length;
  console.log(`  ✅ Fixed ${quizFixed}/${quizResults.length} files`);

  console.log('\n📚 Fixing Learning Paths...');
  const pathResults = await fixLearningPaths();
  const pathsFixed = pathResults.filter((r) => r.fixed).length;
  console.log(`  ✅ Fixed ${pathsFixed}/${pathResults.length} files`);

  console.log('\n' + '='.repeat(60));
  const totalFixed = casesFixed + quizFixed + pathsFixed;
  console.log(`Fixed ${totalFixed} files total`);
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
