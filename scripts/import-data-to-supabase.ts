/**
 * Import Medical Data to Supabase
 * ================================
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=xxx pnpm tsx scripts/import-data-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import { medicamentosConsolidados } from '../lib/data/medicamentos/index';
import { doencasConsolidadas } from '../lib/data/doencas/index';
import type { Medicamento } from '../lib/types/medicamento';
import type { Doenca } from '../lib/types/doenca';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

/**
 * Transform Medicamento to database format (matches actual TypeScript type)
 */
function transformMedicamento(med: Medicamento) {
  return {
    id: med.id,
    nome_generico: med.nomeGenerico,
    nome_comercial: med.nomesComerciais || [],
    classe_terapeutica: med.classeTerapeutica,
    subclasse: med.subclasse || null,
    mecanismo_acao: med.mecanismoAcao || null,
    indicacoes: med.indicacoes || [],
    contraindicacoes: med.contraindicacoes || [],
    efeitos_adversos: med.efeitosAdversos || { comuns: [] },
    interacoes: med.interacoes || [],
    posologia: med.posologias || [], // posologias in TS type
    apresentacoes: med.apresentacoes || [],
    disponivel_sus: med.apresentacoes?.some(ap => ap.disponivelSUS) || false,
    atc_code: med.atcCode || null,
    gestacao: med.gestacao || null,
    lactacao: med.amamentacao ? JSON.stringify(med.amamentacao) : null,
    monitoramento: med.monitorizacao || [],
    ajuste_dose: med.ajusteDoseRenal || [],
    regional_overlays: med.regionalOverlays || null,
    referencias: med.citations || [],
  };
}

/**
 * Transform Doenca to database format (matches actual TypeScript type)
 */
function transformDoenca(doenca: Partial<Doenca>) {
  return {
    id: doenca.id,
    nome: doenca.titulo || '', // titulo in TS type
    nome_alternativo: doenca.sinonimos || [], // sinonimos in TS type
    categoria: doenca.categoria || 'outros',
    subcategoria: doenca.subcategoria || null,
    descricao: doenca.quickView?.definicao || null,
    epidemiologia: doenca.fullContent?.epidemiologia || null,
    fisiopatologia: doenca.fullContent?.fisiopatologia?.texto || null,
    quadro_clinico: doenca.fullContent?.quadroClinico || null,
    diagnostico: doenca.fullContent?.diagnostico || null,
    tratamento: doenca.fullContent?.tratamento || null,
    cid10: Array.isArray(doenca.cid10) ? doenca.cid10[0] : (doenca.cid10 || ''),
    ciap2: Array.isArray(doenca.ciap2) ? doenca.ciap2[0] : (doenca.ciap2 || null),
    medicamentos_relacionados: doenca.medicamentos || [],
    protocolos_relacionados: doenca.protocolos || [],
    regional_overlays: doenca.regionalOverlays || null,
    referencias: doenca.citations || [],
  };
}

async function importMedicamentos() {
  console.log(`\n📦 Importing ${medicamentosConsolidados.length} medications...`);

  const BATCH_SIZE = 50;
  let imported = 0;
  let errors = 0;

  for (let i = 0; i < medicamentosConsolidados.length; i += BATCH_SIZE) {
    const batch = medicamentosConsolidados.slice(i, i + BATCH_SIZE);
    const transformedBatch = batch.map(transformMedicamento);

    const { error } = await supabase
      .from('medicamentos')
      .upsert(transformedBatch, { onConflict: 'id' });

    if (error) {
      console.error(`  ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      errors += batch.length;
    } else {
      imported += batch.length;
      process.stdout.write(`  ✓ ${imported}/${medicamentosConsolidados.length}\r`);
    }
  }

  console.log(`\n  ✅ Medications: ${imported} imported, ${errors} errors`);
  return { imported, errors };
}

async function importDoencas() {
  console.log(`\n🏥 Importing ${doencasConsolidadas.length} diseases...`);

  const BATCH_SIZE = 50;
  let imported = 0;
  let errors = 0;

  for (let i = 0; i < doencasConsolidadas.length; i += BATCH_SIZE) {
    const batch = doencasConsolidadas.slice(i, i + BATCH_SIZE);
    const transformedBatch = batch.map(transformDoenca);

    const { error } = await supabase
      .from('doencas')
      .upsert(transformedBatch, { onConflict: 'id' });

    if (error) {
      console.error(`  ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      errors += batch.length;
    } else {
      imported += batch.length;
      process.stdout.write(`  ✓ ${imported}/${doencasConsolidadas.length}\r`);
    }
  }

  console.log(`\n  ✅ Diseases: ${imported} imported, ${errors} errors`);
  return { imported, errors };
}

async function verifyImport() {
  console.log('\n🔍 Verifying...');

  const { count: medCount } = await supabase
    .from('medicamentos')
    .select('*', { count: 'exact', head: true });

  const { count: diseaseCount } = await supabase
    .from('doencas')
    .select('*', { count: 'exact', head: true });

  console.log(`  📊 Medications: ${medCount}`);
  console.log(`  📊 Diseases: ${diseaseCount}`);

  return { medCount, diseaseCount };
}

async function main() {
  console.log('============================================');
  console.log('  DARWIN-MFC Data Import to Supabase');
  console.log('============================================');

  try {
    const medResult = await importMedicamentos();
    const diseaseResult = await importDoencas();
    await verifyImport();

    console.log('\n✅ Import complete!');

    if (medResult.errors > 0 || diseaseResult.errors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  }
}

main();
