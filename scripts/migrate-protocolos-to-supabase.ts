/**
 * DARWIN-MFC - Protocol Data Migration Script
 * =============================================
 *
 * Migrates protocol data from TypeScript constants to Supabase
 *
 * Usage:
 *   npx tsx scripts/migrate-protocolos-to-supabase.ts
 *
 * Requirements:
 *   - SUPABASE_SERVICE_KEY environment variable (service role key)
 *   - NEXT_PUBLIC_SUPABASE_URL environment variable
 */

import { createClient } from '@supabase/supabase-js';
import { todosProtocolosFlowchart } from '../lib/data/protocolos-flowchart';
import type { Protocolo } from '../lib/types/protocolo';
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
 * Convert TypeScript Protocolo to Supabase format
 */
function convertToSupabaseFormat(protocolo: Protocolo): Database['public']['Tables']['protocolos']['Insert'] {
  // Store nodes and edges in fluxograma JSONB
  const fluxograma = {
    nodes: protocolo.nodes,
    edges: protocolo.edges,
  };

  // Store additional metadata in etapas JSONB
  const etapas = {
    objetivos: protocolo.objetivos || [],
    populacaoAlvo: protocolo.populacaoAlvo || '',
    complexidade: protocolo.complexidade || 'basico',
    versao: protocolo.versao || '1.0',
    sinaisAlerta: protocolo.sinaisAlerta || [],
    encaminhamento: protocolo.encaminhamento || null,
    calculadoras: protocolo.calculadorasRelacionadas || [],
    tags: protocolo.tags || [],
  };

  return {
    id: protocolo.id,
    titulo: protocolo.titulo,
    categoria: protocolo.categoria,
    descricao: protocolo.descricao || null,
    condicoes: protocolo.doencasRelacionadas || null,
    fluxograma,
    etapas,
    criterios_inclusao: protocolo.criteriosInclusao || null,
    criterios_exclusao: protocolo.criteriosExclusao || null,
    medicamentos: protocolo.medicamentosRelacionados || null,
    exames: null,
    monitoramento: null,
    fonte: protocolo.fonte || null,
    ano_publicacao: protocolo.ultimaAtualizacao
      ? parseInt(protocolo.ultimaAtualizacao.substring(0, 4), 10) || null
      : null,
    referencias: protocolo.referencias || null,
  };
}

/**
 * Main migration function
 */
async function migrateProtocolos() {
  console.log('🚀 Starting protocol migration to Supabase');
  console.log(`   Total protocols to migrate: ${todosProtocolosFlowchart.length}`);
  console.log('');

  let successCount = 0;
  let errorCount = 0;
  const errors: Array<{ id: string; error: string }> = [];

  // Protocols are a small dataset (~13-40), no need for batching
  for (const protocolo of todosProtocolosFlowchart) {
    try {
      const supabaseData = convertToSupabaseFormat(protocolo);

      const { error } = await supabase
        .from('protocolos')
        .upsert(supabaseData, { onConflict: 'id' });

      if (error) {
        console.error(`   ❌ ${protocolo.id}: ${error.message}`);
        errors.push({ id: protocolo.id, error: error.message });
        errorCount++;
      } else {
        console.log(`   ✅ ${protocolo.titulo} (${protocolo.categoria})`);
        successCount++;
      }
    } catch (err) {
      console.error(`   ❌ ${protocolo.id}:`, err);
      errors.push({ id: protocolo.id, error: String(err) });
      errorCount++;
    }
  }

  // Print summary
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('                    MIGRATION SUMMARY                       ');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`   Total in source: ${todosProtocolosFlowchart.length}`);
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
    .from('protocolos')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('   ❌ Could not verify count:', countError.message);
  } else {
    console.log(`   📊 Total protocols in Supabase: ${count}`);
  }

  // Sample check
  const { data: sample, error: sampleError } = await supabase
    .from('protocolos')
    .select('id, titulo, categoria, fonte')
    .limit(5);

  if (!sampleError && sample) {
    console.log('');
    console.log('📋 Sample protocols:');
    sample.forEach(p => {
      console.log(`   - ${p.titulo} (${p.categoria}) [${p.fonte || 'N/A'}]`);
    });
  }

  console.log('');
  console.log('✨ Migration complete!');
}

// Run migration
migrateProtocolos().catch(console.error);
