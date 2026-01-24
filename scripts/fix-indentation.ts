/**
 * FIX INDENTATION - Add proper spacing to merged module/reference keys
 */

import { readFile, writeFile } from 'fs/promises';

async function fixIndentation() {
  console.log('🔧 Fixing indentation in merged files...\n');

  // Fix rastreamentos.ts
  let rastreamentos = await readFile('lib/data/rastreamentos.ts', 'utf-8');
  
  // Fix module keys that start at column 0 (after AUTO-GENERATED comment)
  rastreamentos = rastreamentos.replace(/\n'([a-z])/g, "\n  '$1");
  
  await writeFile('lib/data/rastreamentos.ts', rastreamentos);
  console.log('✅ Fixed rastreamentos.ts');

  // Fix references.ts
  let references = await readFile('lib/data/references.ts', 'utf-8');
  
  // Fix reference keys that start at column 0 (after AUTO-GENERATED comment)
  references = references.replace(/\n'([a-z])/g, "\n  '$1");
  
  await writeFile('lib/data/references.ts', references);
  console.log('✅ Fixed references.ts');

  console.log('\n✅ Indentation fixed!');
}

fixIndentation().catch(console.error);

