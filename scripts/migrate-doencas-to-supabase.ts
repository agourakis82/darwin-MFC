/**
 * DARWIN-MFC - Disease Data Migration Script
 * ============================================
 *
 * Migrates disease data from TypeScript constants to Supabase
 *
 * Usage:
 *   npx tsx scripts/migrate-doencas-to-supabase.ts
 *
 * Requirements:
 *   - SUPABASE_SERVICE_KEY environment variable (service role key)
 *   - NEXT_PUBLIC_SUPABASE_URL environment variable
 */

import { createClient } from '@supabase/supabase-js';
import { doencasConsolidadas } from '../lib/data/doencas/index';
import type { Doenca } from '../lib/types/doenca';
import type { Database } from '../lib/supabase/types';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  if (!supabaseUrl) console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseServiceKey) console.error('   - SUPABASE_SERVICE_KEY');
  console.error('\nCreate .env.local with:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.error('SUPABASE_SERVICE_KEY=your-service-role-key');
  process.exit(1);
}

// Create Supabase client with service role (bypasses RLS)
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Convert TypeScript Doenca to Supabase format
 */
function convertToSupabaseFormat(doenca: Partial<Doenca>): Database['public']['Tables']['doencas']['Insert'] | null {
  if (!doenca.id || !doenca.titulo) {
    return null;
  }

  // Convert epidemiologia to JSONB
  const epidemiologia = doenca.fullContent?.epidemiologia ? {
    prevalencia: doenca.fullContent.epidemiologia.prevalencia || null,
    incidencia: doenca.fullContent.epidemiologia.incidencia || null,
    mortalidade: doenca.fullContent.epidemiologia.mortalidade || null,
    faixa_etaria: doenca.fullContent.epidemiologia.faixaEtaria || null,
    fatores_risco: doenca.fullContent.epidemiologia.fatoresRisco || [],
  } : null;

  // Convert quadro_clinico to JSONB
  const quadroClinico = doenca.fullContent?.quadroClinico ? {
    sintomas: doenca.fullContent.quadroClinico.sintomasPrincipais || [],
    sinais: doenca.fullContent.quadroClinico.sinaisExameFisico || [],
    apresentacao_tipica: doenca.fullContent.quadroClinico.formasClinicas?.[0] || null,
  } : null;

  // Convert diagnostico to JSONB
  const diagnostico = doenca.fullContent?.diagnostico ? {
    clinico: doenca.fullContent.diagnostico.criterios || [],
    laboratorial: doenca.fullContent.diagnostico.examesLaboratoriais || [],
    imagem: doenca.fullContent.diagnostico.examesImagem || [],
    diferencial: doenca.fullContent.diagnostico.diagnosticoDiferencial || [],
  } : null;

  // Convert tratamento to JSONB
  const tratamento = doenca.fullContent?.tratamento ? {
    farmacologico: doenca.fullContent.tratamento.farmacologico?.primeiraLinha?.map(t => ({
      classe: t.classe,
      medicamentos: t.medicamentos,
      posologia: t.posologia || null,
      observacoes: t.observacoes || null,
    })) || [],
    nao_farmacologico: doenca.fullContent.tratamento.naoFarmacologico?.medidas || [],
  } : null;

  // Convert criterios_diagnosticos to JSONB
  const criteriosDiagnosticos = doenca.quickView ? {
    criterios: doenca.quickView.criteriosDiagnosticos || [],
    red_flags: doenca.quickView.redFlags || [],
    metas_terapeuticas: doenca.quickView.metasTerapeuticas || [],
    exames_iniciais: doenca.quickView.examesIniciais || [],
  } : null;

  // CID-10 and CIAP-2 as comma-separated strings (DB stores as TEXT)
  const cid10 = doenca.cid10?.join(', ') || '';
  const ciap2 = doenca.ciap2?.join(', ') || null;

  // Prevencao: merge primary and secondary
  const prevencao = [
    ...(doenca.fullContent?.prevencao?.primaria || []),
    ...(doenca.fullContent?.prevencao?.secundaria || []),
  ];

  return {
    id: doenca.id,
    nome: doenca.titulo,
    nome_alternativo: doenca.sinonimos || null,
    categoria: doenca.categoria || 'outros',
    subcategoria: doenca.subcategoria || null,
    descricao: doenca.quickView?.definicao || null,
    epidemiologia,
    fisiopatologia: doenca.fullContent?.fisiopatologia?.texto || null,
    quadro_clinico: quadroClinico,
    diagnostico,
    tratamento,
    prognostico: null,
    prevencao: prevencao.length > 0 ? prevencao : null,
    complicacoes: null,
    quando_encaminhar: doenca.fullContent?.acompanhamento?.criteriosEncaminhamento || doenca.quickView?.redFlags || null,
    cid10,
    ciap2,
    criterios_diagnosticos: criteriosDiagnosticos,
    medicamentos_relacionados: doenca.medicamentos || null,
    protocolos_relacionados: doenca.protocolos || null,
    regional_overlays: doenca.regionalOverlays || null,
    referencias: doenca.citations || null,
  };
}

/**
 * Main migration function
 */
async function migrateDoencas() {
  console.log('🚀 Starting disease migration to Supabase');
  console.log(`   Total diseases to migrate: ${doencasConsolidadas.length}`);
  console.log('');

  // Process in batches of 100
  const BATCH_SIZE = 100;
  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  const errors: Array<{ id: string; error: string }> = [];

  for (let i = 0; i < doencasConsolidadas.length; i += BATCH_SIZE) {
    const batch = doencasConsolidadas.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(doencasConsolidadas.length / BATCH_SIZE);

    console.log(`📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} diseases)...`);

    // Convert batch to Supabase format
    const supabaseBatch = batch.map(doenca => {
      try {
        return convertToSupabaseFormat(doenca);
      } catch (err) {
        console.error(`   ❌ Error converting ${doenca.id}:`, err);
        errors.push({ id: doenca.id || 'unknown', error: String(err) });
        errorCount++;
        return null;
      }
    }).filter((item): item is NonNullable<typeof item> => item !== null);

    const skipped = batch.length - supabaseBatch.length - errorCount;
    skippedCount += skipped > 0 ? skipped : 0;

    if (supabaseBatch.length === 0) {
      console.log(`   ⏭️ Batch ${batchNumber} skipped (no valid items)`);
      continue;
    }

    // Upsert batch to Supabase (insert or update if exists)
    const { data, error } = await supabase
      .from('doencas')
      .upsert(supabaseBatch, {
        onConflict: 'id',
        ignoreDuplicates: false,
      })
      .select('id');

    if (error) {
      console.error(`   ❌ Batch ${batchNumber} failed:`, error.message);
      // Try individual inserts for this batch
      for (const item of supabaseBatch) {
        const { error: singleError } = await supabase
          .from('doencas')
          .upsert(item, { onConflict: 'id' });

        if (singleError) {
          console.error(`      ❌ ${item.id}: ${singleError.message}`);
          errors.push({ id: item.id, error: singleError.message });
          errorCount++;
        } else {
          successCount++;
        }
      }
    } else {
      successCount += supabaseBatch.length;
      console.log(`   ✅ Batch ${batchNumber} completed (${supabaseBatch.length} diseases)`);
    }

    // Small delay between batches to avoid rate limiting
    if (i + BATCH_SIZE < doencasConsolidadas.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Print summary
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('                    MIGRATION SUMMARY                       ');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`   Total in source: ${doencasConsolidadas.length}`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   ⏭️ Skipped (no id/title): ${skippedCount}`);
  console.log('═══════════════════════════════════════════════════════════');

  if (errors.length > 0) {
    console.log('');
    console.log('❌ Errors:');
    errors.forEach(({ id, error }) => {
      console.log(`   - ${id}: ${error}`);
    });
  }

  // Verify migration
  console.log('');
  console.log('🔍 Verifying migration...');
  const { count, error: countError } = await supabase
    .from('doencas')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('   ❌ Could not verify count:', countError.message);
  } else {
    console.log(`   📊 Total diseases in Supabase: ${count}`);
  }

  // Sample check
  const { data: sample, error: sampleError } = await supabase
    .from('doencas')
    .select('id, nome, categoria, cid10')
    .limit(5);

  if (!sampleError && sample) {
    console.log('');
    console.log('📋 Sample diseases:');
    sample.forEach(d => {
      console.log(`   - ${d.nome} (${d.categoria}) [${d.cid10}]`);
    });
  }

  // Category distribution
  const { data: catData } = await supabase
    .from('doencas')
    .select('categoria');

  if (catData) {
    const catCounts: Record<string, number> = {};
    catData.forEach(d => {
      catCounts[d.categoria] = (catCounts[d.categoria] || 0) + 1;
    });
    console.log('');
    console.log('📊 By category:');
    Object.entries(catCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        console.log(`   - ${cat}: ${count}`);
      });
  }

  console.log('');
  console.log('✨ Migration complete!');
}

// Run migration
migrateDoencas().catch(console.error);
