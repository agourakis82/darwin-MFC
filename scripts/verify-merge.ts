/**
 * VERIFY MERGE - Quick test that modules and references loaded correctly
 */

import { rastreamentos, getAllRastreamentos } from '../lib/data/rastreamentos';
import { references, getReference } from '../lib/data/references';

console.log('🔍 VERIFYING MERGE');
console.log('='.repeat(60));

// Count modules
const moduleCount = Object.keys(rastreamentos).length;
console.log(`\n📊 Total modules: ${moduleCount}`);

// Check for new modules
const newModules = ['acne', 'diabetes-mellitus-2', 'ansiedade', 'hipertensao-arterial', 'asma'];
console.log('\n🆕 Checking new modules:');
for (const id of newModules) {
  const module = rastreamentos[id];
  if (module) {
    console.log(`  ✅ ${id}: "${module.title}" (${module.category})`);
  } else {
    console.log(`  ❌ ${id}: NOT FOUND`);
  }
}

// Count references
const refCount = Object.keys(references).length;
console.log(`\n📚 Total references: ${refCount}`);

// Check for new references
const newRefs = ['acne-ref-1', 'diabetes-mellitus-2-ref-1', 'ansiedade-ref-1'];
console.log('\n🆕 Checking new references:');
for (const id of newRefs) {
  const ref = getReference(id);
  if (ref) {
    console.log(`  ✅ ${id}: "${ref.title.substring(0, 50)}..."`);
  } else {
    console.log(`  ❌ ${id}: NOT FOUND`);
  }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('✅ MERGE VERIFICATION COMPLETE');
console.log(`   Modules: ${moduleCount}`);
console.log(`   References: ${refCount}`);

