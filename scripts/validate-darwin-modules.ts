/**
 * VALIDATE DARWIN-MFC MODULES BEFORE MERGE
 * =========================================
 * 
 * Validates the generated darwin-mfc-modules.ts file to ensure
 * it's ready for integration into lib/data/rastreamentos.ts
 */

import { readFile } from 'fs/promises';

interface ValidationResult {
  moduleId: string;
  valid: boolean;
  issues: string[];
  warnings: string[];
}

async function validateModules() {
  console.log('🔍 VALIDATING DARWIN-MFC MODULES');
  console.log('='.repeat(80));

  const filePath = 'lib/content-generation/output/darwin-mfc-modules.ts';
  const content = await readFile(filePath, 'utf-8');

  const results: ValidationResult[] = [];
  let totalIssues = 0;
  let totalWarnings = 0;

  // Extract module IDs
  const moduleMatches = content.matchAll(/'([^']+)':\s*\{/g);
  const moduleIds = Array.from(moduleMatches).map(m => m[1]);

  console.log(`\nFound ${moduleIds.length} modules to validate...\n`);

  for (const moduleId of moduleIds) {
    const result: ValidationResult = {
      moduleId,
      valid: true,
      issues: [],
      warnings: [],
    };

    // Extract module section
    const moduleRegex = new RegExp(`'${moduleId}':\\s*\\{([\\s\\S]*?)\\n  \\},`, 'm');
    const moduleMatch = content.match(moduleRegex);
    
    if (!moduleMatch) {
      result.valid = false;
      result.issues.push('Module section not found');
      results.push(result);
      continue;
    }

    const moduleContent = moduleMatch[1];

    // Check required fields
    const requiredFields = [
      'id:',
      'title:',
      'category:',
      'description:',
      'recommendations:',
      'epidemiology:',
      'lastUpdate:',
    ];

    for (const field of requiredFields) {
      if (!moduleContent.includes(field)) {
        result.valid = false;
        result.issues.push(`Missing required field: ${field}`);
      }
    }

    // Check category is valid
    const validCategories = ['neonatal', 'infantil', 'adultos', 'cancer', 'gestacao', 'infecciosas', 'saude_mental', 'outros'];
    const categoryMatch = moduleContent.match(/category:\s*'([^']+)'/);
    if (categoryMatch) {
      const category = categoryMatch[1];
      if (!validCategories.includes(category)) {
        result.valid = false;
        result.issues.push(`Invalid category: ${category}`);
      }
    }

    // Check for citations
    const citationCount = (moduleContent.match(/refId:/g) || []).length;
    if (citationCount === 0) {
      result.warnings.push('No citations found');
    }

    // Check for backticks in description (should use template literals)
    if (!moduleContent.includes('description: `')) {
      result.warnings.push('Description not using template literal');
    }

    // Check convergence status
    const convergenceMatch = moduleContent.match(/status:\s*'([^']+)'/);
    if (convergenceMatch) {
      const status = convergenceMatch[1];
      const validStatuses = ['convergencia', 'parcial', 'divergencia', 'em_disputa'];
      if (!validStatuses.includes(status)) {
        result.valid = false;
        result.issues.push(`Invalid convergence status: ${status}`);
      }
    }

    // Check lastUpdate format (should be YYYY-MM)
    const updateMatch = moduleContent.match(/lastUpdate:\s*'([^']+)'/);
    if (updateMatch) {
      const update = updateMatch[1];
      if (!/^\d{4}-\d{2}$/.test(update)) {
        result.warnings.push(`lastUpdate format should be YYYY-MM, got: ${update}`);
      }
    }

    if (result.issues.length > 0) {
      totalIssues += result.issues.length;
    }
    if (result.warnings.length > 0) {
      totalWarnings += result.warnings.length;
    }

    results.push(result);

    // Print result
    const status = result.valid ? '✅' : '❌';
    const issueText = result.issues.length > 0 ? ` (${result.issues.length} issues)` : '';
    const warnText = result.warnings.length > 0 ? ` (${result.warnings.length} warnings)` : '';
    console.log(`${status} ${moduleId.padEnd(30)}${issueText}${warnText}`);

    if (result.issues.length > 0) {
      result.issues.forEach(issue => console.log(`   ❌ ${issue}`));
    }
    if (result.warnings.length > 0) {
      result.warnings.forEach(warn => console.log(`   ⚠️  ${warn}`));
    }
  }

  // Validate references
  console.log('\n' + '='.repeat(80));
  console.log('\n🔍 VALIDATING REFERENCES\n');

  const refMatches = content.matchAll(/'([^']+)':\s*\{\s*citation:/g);
  const refIds = Array.from(refMatches).map(m => m[1]);

  console.log(`Found ${refIds.length} references`);

  // Check for duplicate refIds
  const duplicates = refIds.filter((id, index) => refIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    console.log(`\n❌ Duplicate reference IDs found: ${duplicates.join(', ')}`);
    totalIssues += duplicates.length;
  } else {
    console.log('✅ No duplicate reference IDs');
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 VALIDATION SUMMARY\n');

  const validModules = results.filter(r => r.valid).length;
  const invalidModules = results.filter(r => !r.valid).length;

  console.log(`Total Modules: ${results.length}`);
  console.log(`Valid: ${validModules} ✅`);
  console.log(`Invalid: ${invalidModules} ❌`);
  console.log(`Total Issues: ${totalIssues}`);
  console.log(`Total Warnings: ${totalWarnings}`);

  if (invalidModules === 0 && totalIssues === 0) {
    console.log('\n✅ ALL MODULES VALID - READY FOR INTEGRATION! 🎉');
  } else if (invalidModules > 0) {
    console.log('\n❌ VALIDATION FAILED - Fix issues before integration');
  } else {
    console.log('\n⚠️  VALIDATION PASSED WITH WARNINGS - Review before integration');
  }

  console.log('\n');
}

validateModules().catch(console.error);

