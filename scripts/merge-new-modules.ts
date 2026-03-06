/**
 * MERGE NEW MODULES (68 new ones not yet in Darwin-MFC)
 * =====================================================
 * Only merges modules NOT already present in rastreamentos.ts
 */

import { readdir, readFile, writeFile, copyFile } from 'fs/promises';
import { join } from 'path';

const CATEGORY_MAP: Record<string, string> = {
  'doenças crônicas não transmissíveis': 'adultos',
  'saúde mental': 'saude_mental',
  'doenças respiratórias': 'adultos',
  'doenças cardiovasculares': 'adultos',
  'doenças neurológicas': 'adultos',
  'doenças dermatológicas': 'outros',
  'doenças musculoesqueléticas': 'adultos',
  'doenças infecciosas': 'infecciosas',
};

function mapCategory(cat: string): string {
  return CATEGORY_MAP[cat] || 'outros';
}

function refId(moduleId: string, n: number): string {
  return `${moduleId}-ref-${n}`;
}

async function main() {
  console.log('🔄 MERGING NEW MODULES INTO DARWIN-MFC\n');

  const modulesDir = 'lib/content-generation/output/modules';
  const rastreamentosPath = 'lib/data/rastreamentos.ts';
  const referencesPath = 'lib/data/references.ts';

  // Read current rastreamentos to find already-merged IDs
  const currentRastreamentos = await readFile(rastreamentosPath, 'utf-8');
  const alreadyMerged = new Set<string>(
    [...currentRastreamentos.matchAll(/id:\s*'([a-z-]+)'/g)].map(m => m[1])
  );
  console.log(`📋 Already merged: ${alreadyMerged.size} modules`);

  // Find new modules
  const files = (await readdir(modulesDir)).filter(f => f.endsWith('.ts'));
  const newFiles = files.filter(f => !alreadyMerged.has(f.replace('.ts', '')));
  console.log(`🆕 New modules to merge: ${newFiles.length}\n`);

  if (newFiles.length === 0) {
    console.log('✅ Nothing to merge!');
    return;
  }

  // Backup
  const ts = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 22);
  await copyFile(rastreamentosPath, `${rastreamentosPath}.backup-${ts}`);
  await copyFile(referencesPath, `${referencesPath}.backup-${ts}`);
  console.log(`💾 Backups created: *.backup-${ts}\n`);

  let moduleEntries = '';
  let referenceEntries = '';
  let successCount = 0;

  for (const file of newFiles) {
    try {
      const content = await readFile(join(modulesDir, file), 'utf-8');
      const m = eval(`(${content})`);
      const cat = mapCategory(m.categoria);

      const refs = (m.referencias || []);

      moduleEntries += `
  '${m.id}': {
    id: '${m.id}',
    title: '${(m.titulo || m.id).replace(/'/g, "\\'")}',
    category: '${cat}',
    description: \`${(m.descricao || '').replace(/`/g, "'").replace(/\[[\d,\s]+\]/g, '').substring(0, 600)}\`,
    recommendations: {
      sus: {
        population: \`${(m.recomendacoes?.sus?.populacaoAlvo || '').replace(/`/g, "'")}\`,
        method: \`${(m.recomendacoes?.sus?.metodos || []).join('; ').replace(/`/g, "'")}\`,
        periodicity: \`${(m.recomendacoes?.sus?.periodicidade || '').replace(/`/g, "'")}\`,
        justification: \`${(m.recomendacoes?.sus?.indicacao || '').replace(/`/g, "'")}\`,
        citations: [${(m.recomendacoes?.sus?.referencias || [1]).map((r: number) => `{ refId: '${refId(m.id, r)}' }`).join(', ')}]
      },
      societies: {
        organization: ['Sociedades Médicas Brasileiras'],
        population: \`${(m.recomendacoes?.sociedadesMedicas?.populacaoAlvo || '').replace(/`/g, "'")}\`,
        method: \`${(m.recomendacoes?.sociedadesMedicas?.metodos || []).join('; ').replace(/`/g, "'")}\`,
        periodicity: \`${(m.recomendacoes?.sociedadesMedicas?.periodicidade || '').replace(/`/g, "'")}\`,
        recommendation: \`${(m.recomendacoes?.sociedadesMedicas?.indicacao || '').replace(/`/g, "'")}\`,
        citations: [${(m.recomendacoes?.sociedadesMedicas?.referencias || [1]).map((r: number) => `{ refId: '${refId(m.id, r)}' }`).join(', ')}]
      },
      convergence: {
        status: '${m.recomendacoes?.convergencia || 'parcial'}',
        description: 'Análise de convergência entre SUS e Sociedades Médicas.',
        citations: [{ refId: '${refId(m.id, 1)}' }]
      }
    },
    epidemiology: {
      ${m.epidemiologia?.prevalencia ? `prevalence: \`${m.epidemiologia.prevalencia.replace(/`/g, "'")}\`,` : ''}
      ${m.epidemiologia?.incidencia ? `incidence: \`${m.epidemiologia.incidencia.replace(/`/g, "'")}\`,` : ''}
      ${m.epidemiologia?.mortalidade ? `mortality: \`${m.epidemiologia.mortalidade.replace(/`/g, "'")}\`,` : ''}
      citations: [${(m.epidemiologia?.referencias || [1]).map((r: number) => `{ refId: '${refId(m.id, r)}' }`).join(', ')}]
    },
    lastUpdate: '2026-01'
  },`;

      for (const ref of refs) {
        const rid = refId(m.id, ref.id);
        referenceEntries += `
  '${rid}': {
    id: '${rid}',
    type: 'diretriz',
    title: \`${(ref.citation || '').substring(0, 120).replace(/`/g, "'")}\`,
    authors: [],
    year: 2024,
    note: 'Auto-imported from ${m.id} module'
  },`;
      }

      successCount++;
      console.log(`  ✅ ${m.id}`);
    } catch (e: any) {
      console.log(`  ❌ ${file}: ${e.message}`);
    }
  }

  // Insert into rastreamentos.ts
  const insertPoint = currentRastreamentos.lastIndexOf('\n};');
  const newRastreamentos = 
    currentRastreamentos.slice(0, insertPoint) +
    '\n\n  // ============================================\n' +
    `  // AUTO-GENERATED MODULES (${successCount} new conditions)\n` +
    `  // Generated: ${new Date().toISOString()}\n` +
    '  // ============================================\n' +
    moduleEntries +
    currentRastreamentos.slice(insertPoint);

  await writeFile(rastreamentosPath, newRastreamentos);

  // Insert into references.ts
  const currentRefs = await readFile(referencesPath, 'utf-8');
  const refInsertPoint = currentRefs.lastIndexOf('\n};');
  const newRefs =
    currentRefs.slice(0, refInsertPoint) +
    '\n\n  // ============================================\n' +
    `  // AUTO-GENERATED REFERENCES (batch 2)\n` +
    '  // ============================================\n' +
    referenceEntries +
    currentRefs.slice(refInsertPoint);

  await writeFile(referencesPath, newRefs);

  console.log(`\n🎉 DONE!`);
  console.log(`   ✅ ${successCount} modules merged`);
  console.log(`   📚 References added`);
}

main().catch(console.error);

