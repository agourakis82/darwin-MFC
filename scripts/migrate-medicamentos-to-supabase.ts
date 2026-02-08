/**
 * DARWIN-MFC - Data Migration Script
 * ===================================
 *
 * Migrates medication data from TypeScript constants to Supabase
 *
 * Usage:
 *   npx tsx scripts/migrate-medicamentos-to-supabase.ts
 *
 * Requirements:
 *   - SUPABASE_SERVICE_KEY environment variable (service role key)
 *   - NEXT_PUBLIC_SUPABASE_URL environment variable
 */

import { createClient } from '@supabase/supabase-js';
import { medicamentosConsolidados } from '../lib/data/medicamentos/index';
import type { Medicamento } from '../lib/types/medicamento';
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
 * Convert TypeScript Medicamento to Supabase format
 */
function convertToSupabaseFormat(med: Medicamento): Database['public']['Tables']['medicamentos']['Insert'] {
  // Convert apresentacoes to string array
  const apresentacoes = med.apresentacoes.map(ap =>
    `${ap.forma} ${ap.concentracao}${ap.quantidade ? ` (${ap.quantidade})` : ''}${ap.disponivelSUS ? ' [SUS]' : ''}`
  );

  // Check if any apresentacao is available in SUS
  const disponivelSUS = med.apresentacoes.some(ap => ap.disponivelSUS) || med.rename;

  // Convert posologia to JSON format
  const posologia = med.posologias.length > 0 ? med.posologias.map(pos => ({
    indicacao: pos.indicacao,
    adultos: pos.adultos,
    pediatrico: pos.pediatrico,
    idosos: pos.idosos,
  })) : null;

  // Convert interacoes to JSON format
  const interacoes = med.interacoes.length > 0 ? med.interacoes.map(int => ({
    medicamento: int.medicamento,
    gravidade: int.gravidade,
    efeito: int.efeito,
    mecanismo: int.mecanismo,
    conduta: int.conduta,
  })) : null;

  // Convert efeitos adversos
  const efeitosAdversos = {
    comuns: med.efeitosAdversos.comuns,
    graves: med.efeitosAdversos.graves || [],
  };

  // Convert ajuste dose renal
  const ajusteDose = med.ajusteDoseRenal ? {
    renal: med.ajusteDoseRenal.map(adj => ({
      tfg: adj.tfg,
      ajuste: adj.ajuste,
      observacao: adj.observacao,
    })),
    hepatico: med.consideracoesEspeciais?.hepatopatas ? [med.consideracoesEspeciais.hepatopatas] : [],
  } : null;

  // Convert SNOMED-CT to string
  const snomedCt = Array.isArray(med.snomedCT) ? med.snomedCT[0] : med.snomedCT;

  return {
    id: med.id,
    nome_generico: med.nomeGenerico,
    nome_comercial: med.nomesComerciais || null,
    classe_terapeutica: med.classeTerapeutica,
    subclasse: med.subclasse || null,
    mecanismo_acao: med.mecanismoAcao || null,
    indicacoes: med.indicacoes || null,
    contraindicacoes: med.contraindicacoes || null,
    efeitos_adversos: efeitosAdversos,
    interacoes: interacoes,
    posologia: posologia,
    apresentacoes: apresentacoes,
    disponivel_sus: disponivelSUS,
    disponivel_farmacia_popular: false, // Default, can be updated later
    atc_code: med.atcCode || null,
    gestacao: med.gestacao || null,
    lactacao: med.amamentacao ? (med.amamentacao.compativel ? 'Compatível' : 'Não compatível') + ': ' + med.amamentacao.observacao : null,
    insuficiencia_renal: med.ajusteDoseRenal ? JSON.stringify(med.ajusteDoseRenal) : null,
    insuficiencia_hepatica: med.consideracoesEspeciais?.hepatopatas || null,
    idoso: med.consideracoesEspeciais?.idosos || null,
    pediatrico: med.consideracoesEspeciais?.pediatrico || null,
    monitoramento: med.monitorizacao || null,
    ajuste_dose: ajusteDose,
    regional_overlays: med.regionalOverlays || null,
    referencias: med.citations || null,
    pharmgkb: med.pharmgkb || null,
    loinc: med.loinc || null,
    rxnorm_cui: med.rxNormCui || null,
    drugbank_id: med.drugBankId || null,
    snomed_ct: snomedCt || null,
  };
}

/**
 * Main migration function
 */
async function migrateMedicamentos() {
  console.log('🚀 Starting medication migration to Supabase');
  console.log(`   Total medications to migrate: ${medicamentosConsolidados.length}`);
  console.log('');

  // Process in batches of 100
  const BATCH_SIZE = 100;
  let successCount = 0;
  let errorCount = 0;
  const errors: Array<{ id: string; error: string }> = [];

  for (let i = 0; i < medicamentosConsolidados.length; i += BATCH_SIZE) {
    const batch = medicamentosConsolidados.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(medicamentosConsolidados.length / BATCH_SIZE);

    console.log(`📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} medications)...`);

    // Convert batch to Supabase format
    const supabaseBatch = batch.map(med => {
      try {
        return convertToSupabaseFormat(med);
      } catch (err) {
        console.error(`   ❌ Error converting ${med.id}:`, err);
        errors.push({ id: med.id, error: String(err) });
        errorCount++;
        return null;
      }
    }).filter((item): item is NonNullable<typeof item> => item !== null);

    // Upsert batch to Supabase (insert or update if exists)
    const { data, error } = await supabase
      .from('medicamentos')
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
          .from('medicamentos')
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
      console.log(`   ✅ Batch ${batchNumber} completed (${supabaseBatch.length} medications)`);
    }

    // Small delay between batches to avoid rate limiting
    if (i + BATCH_SIZE < medicamentosConsolidados.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Print summary
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('                    MIGRATION SUMMARY                       ');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`   Total processed: ${medicamentosConsolidados.length}`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
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
    .from('medicamentos')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('   ❌ Could not verify count:', countError.message);
  } else {
    console.log(`   📊 Total medications in Supabase: ${count}`);
  }

  // Sample check
  const { data: sample, error: sampleError } = await supabase
    .from('medicamentos')
    .select('id, nome_generico, classe_terapeutica, disponivel_sus')
    .limit(5);

  if (!sampleError && sample) {
    console.log('');
    console.log('📋 Sample medications:');
    sample.forEach(med => {
      console.log(`   - ${med.nome_generico} (${med.classe_terapeutica}) ${med.disponivel_sus ? '[SUS]' : ''}`);
    });
  }

  console.log('');
  console.log('✨ Migration complete!');
}

// Run migration
migrateMedicamentos().catch(console.error);
