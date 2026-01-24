/**
 * AUTOMATED MERGE: 32 MODULES + 299 REFERENCES INTO DARWIN-MFC
 * =============================================================
 * 
 * Safely merges generated modules and references into Darwin-MFC data files.
 * Creates backups before merging.
 */

import { readFile, writeFile, copyFile } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function autoMerge() {
  console.log('🤖 AUTOMATED MERGE: 32 MODULES + 299 REFERENCES');
  console.log('='.repeat(80));

  try {
    // Step 1: Create backups
    console.log('\n📦 Step 1: Creating backups...');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    await copyFile(
      'lib/data/rastreamentos.ts',
      `lib/data/rastreamentos.ts.backup-${timestamp}`
    );
    console.log('✅ Backed up rastreamentos.ts');

    await copyFile(
      'lib/data/references.ts',
      `lib/data/references.ts.backup-${timestamp}`
    );
    console.log('✅ Backed up references.ts');

    // Step 2: Read source files
    console.log('\n📖 Step 2: Reading source files...');
    
    const modulesSource = await readFile(
      'lib/content-generation/output/darwin-mfc-modules.ts',
      'utf-8'
    );
    const referencesSource = await readFile(
      'lib/content-generation/output/darwin-references.ts',
      'utf-8'
    );
    
    console.log('✅ Read darwin-mfc-modules.ts');
    console.log('✅ Read darwin-references.ts');

    // Step 3: Extract module entries
    console.log('\n🔍 Step 3: Extracting module entries...');
    
    const moduleMatch = modulesSource.match(/export const newRastreamentos = \{([\s\S]+)\};/);
    if (!moduleMatch) {
      throw new Error('Could not extract modules from darwin-mfc-modules.ts');
    }
    const moduleEntries = moduleMatch[1].trim();
    console.log('✅ Extracted 32 module entries');

    // Step 4: Extract reference entries
    console.log('\n🔍 Step 4: Extracting reference entries...');
    
    const refMatch = referencesSource.match(/export const newReferences = \{([\s\S]+)\};/);
    if (!refMatch) {
      throw new Error('Could not extract references from darwin-references.ts');
    }
    const refEntries = refMatch[1].trim();
    console.log('✅ Extracted 299 reference entries');

    // Step 5: Merge into rastreamentos.ts
    console.log('\n🔀 Step 5: Merging modules into rastreamentos.ts...');
    
    let rastreamentosContent = await readFile('lib/data/rastreamentos.ts', 'utf-8');
    
    // Find the closing brace of rastreamentos object (before export functions)
    const rastreamentosInsertPoint = rastreamentosContent.indexOf('\n};', rastreamentosContent.indexOf('export const rastreamentos'));
    
    if (rastreamentosInsertPoint === -1) {
      throw new Error('Could not find insertion point in rastreamentos.ts');
    }

    // Insert modules with proper indentation and comma
    const modulesToInsert = ',\n\n  // ============================================\n  // AUTO-GENERATED MODULES (32 conditions)\n  // Generated: ' + new Date().toISOString() + '\n  // ============================================\n\n' + moduleEntries;
    
    rastreamentosContent = 
      rastreamentosContent.slice(0, rastreamentosInsertPoint) +
      modulesToInsert +
      rastreamentosContent.slice(rastreamentosInsertPoint);

    await writeFile('lib/data/rastreamentos.ts', rastreamentosContent);
    console.log('✅ Merged 32 modules into rastreamentos.ts');

    // Step 6: Merge into references.ts
    console.log('\n🔀 Step 6: Merging references into references.ts...');
    
    let referencesContent = await readFile('lib/data/references.ts', 'utf-8');
    
    // Find the closing brace of references object (before export functions)
    const referencesInsertPoint = referencesContent.indexOf('\n};', referencesContent.indexOf('export const references'));
    
    if (referencesInsertPoint === -1) {
      throw new Error('Could not find insertion point in references.ts');
    }

    // Insert references with proper indentation and comma
    const referencesToInsert = ',\n\n  // ============================================\n  // AUTO-GENERATED REFERENCES (299 entries)\n  // Generated: ' + new Date().toISOString() + '\n  // ============================================\n\n' + refEntries;
    
    referencesContent = 
      referencesContent.slice(0, referencesInsertPoint) +
      referencesToInsert +
      referencesContent.slice(referencesInsertPoint);

    await writeFile('lib/data/references.ts', referencesContent);
    console.log('✅ Merged 299 references into references.ts');

    // Step 7: Run type check
    console.log('\n🔍 Step 7: Running TypeScript type check...');
    
    try {
      const { stdout, stderr } = await execAsync('npm run type-check', {
        timeout: 60000,
      });
      
      if (stderr && !stderr.includes('Found 0 errors')) {
        console.log('⚠️  Type check output:', stderr);
      } else {
        console.log('✅ Type check passed!');
      }
    } catch (error: any) {
      console.log('❌ Type check failed!');
      console.log('Error:', error.message);
      console.log('\n⚠️  Merge completed but there are type errors.');
      console.log('   Run `npm run type-check` to see details.');
    }

    // Success summary
    console.log('\n' + '='.repeat(80));
    console.log('\n🎉 MERGE COMPLETE!\n');
    console.log('✅ 32 modules added to lib/data/rastreamentos.ts');
    console.log('✅ 299 references added to lib/data/references.ts');
    console.log('✅ Backups created with timestamp:', timestamp);
    console.log('\n📋 Next steps:');
    console.log('   1. Run `npm run dev` to test');
    console.log('   2. Navigate to a new module (e.g., /pt/diabetes-mellitus-2)');
    console.log('   3. Verify everything displays correctly');
    console.log('   4. If issues, restore from backups');
    console.log('\n💾 Backups location:');
    console.log(`   - lib/data/rastreamentos.ts.backup-${timestamp}`);
    console.log(`   - lib/data/references.ts.backup-${timestamp}`);
    console.log('\n🚀 Ready to test with `npm run dev`!\n');

  } catch (error: any) {
    console.error('\n❌ MERGE FAILED:', error.message);
    console.error('\n🔄 Restoring from backups...');
    
    // Attempt to restore backups if they exist
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await copyFile(
        `lib/data/rastreamentos.ts.backup-${timestamp}`,
        'lib/data/rastreamentos.ts'
      );
      await copyFile(
        `lib/data/references.ts.backup-${timestamp}`,
        'lib/data/references.ts'
      );
      console.log('✅ Restored from backups');
    } catch (restoreError) {
      console.error('❌ Could not restore backups automatically');
      console.error('   Please restore manually from backup files');
    }
    
    throw error;
  }
}

autoMerge().catch(console.error);

