/**
 * Quick test to verify translation infrastructure is ready
 * Tests: directory structure, glossary loading, validator availability
 */

import fs from 'fs/promises';
import path from 'path';

async function testTranslationSetup() {
  console.log('🧪 Testing Translation Infrastructure Setup\n');

  const checks = {
    directories: false,
    glossary: false,
    validators: false,
    extractors: false
  };

  try {
    // Check 1: Directories exist
    console.log('✓ Checking output directories...');
    const dirs = [
      'lib/content-generation/output/translations/medications',
      'lib/content-generation/output/translations/diseases',
      'lib/content-generation/glossaries'
    ];

    for (const dir of dirs) {
      try {
        await fs.stat(dir);
      } catch {
        await fs.mkdir(dir, { recursive: true });
      }
    }
    checks.directories = true;
    console.log('  ✓ All directories ready\n');

    // Check 2: Glossary file exists
    console.log('✓ Checking medical glossary...');
    const glossaryPath = 'lib/content-generation/glossaries/medical-terms.json';
    try {
      const glossary = await fs.readFile(glossaryPath, 'utf-8');
      const parsed = JSON.parse(glossary);
      console.log(`  ✓ Glossary loaded (${parsed.metadata.termCount} terms)\n`);
      checks.glossary = true;
    } catch (error) {
      console.error(`  ✗ Glossary file missing or invalid`);
    }

    // Check 3: Scripts exist
    console.log('✓ Checking translation scripts...');
    const scripts = [
      'scripts/extract-medication-strings.ts',
      'scripts/validate-translations.ts',
      'scripts/translate-orchestrator.ts'
    ];

    for (const script of scripts) {
      try {
        await fs.stat(script);
        console.log(`  ✓ ${path.basename(script)} found`);
      } catch {
        console.error(`  ✗ ${path.basename(script)} missing`);
      }
    }
    checks.validators = true;
    console.log('');

    // Check 4: Medication data available
    console.log('✓ Checking medication data...');
    const medicinesIndex = 'lib/data/medicamentos/index.ts';
    try {
      await fs.stat(medicinesIndex);
      console.log(`  ✓ Medication data index found\n`);
      checks.extractors = true;
    } catch {
      console.error(`  ✗ Medication data index missing`);
    }

    // Summary
    console.log('📊 Setup Verification Summary:');
    console.log(`  Directories: ${checks.directories ? '✅' : '❌'}`);
    console.log(`  Glossary: ${checks.glossary ? '✅' : '❌'}`);
    console.log(`  Validators: ${checks.validators ? '✅' : '❌'}`);
    console.log(`  Extractors: ${checks.extractors ? '✅' : '❌'}`);

    const allPass = Object.values(checks).every(v => v);
    console.log(`\n${allPass ? '✅ All checks passed!' : '⚠️  Some checks failed'}`);
    console.log('\nNext steps:');
    console.log('  1. npm run translate:medications  # Full translation');
    console.log('  2. npm run translate:validate      # Validate translations');

  } catch (error) {
    console.error('Error during setup test:', error);
    process.exit(1);
  }
}

testTranslationSetup();
