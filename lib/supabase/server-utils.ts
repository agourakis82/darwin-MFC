/**
 * SERVER-SIDE SUPABASE UTILITIES
 * ================================
 *
 * Server-side utilities for fetching data from Supabase
 * Falls back to TypeScript constants for static builds
 *
 * Usage (in Server Components):
 *   import { getMedicamentoServer } from '@/lib/supabase/server-utils';
 *   const med = await getMedicamentoServer(id);
 */

import { createServerSupabaseClient, isSupabaseConfigured } from './client';
import type { Database } from './types';
import type { Medicamento, ClasseTerapeutica } from '@/lib/types/medicamento';
import {
  medicamentosConsolidados,
  getMedicamentoById as getLocalMedicamentoById,
} from '@/lib/data/medicamentos/index';

// Type alias for Supabase medication row
type MedicamentoRow = Database['public']['Tables']['medicamentos']['Row'];

/**
 * Convert Supabase row to Medicamento type (same as client service)
 */
function convertToMedicamento(row: MedicamentoRow): Medicamento {
  // Parse apresentacoes from string array
  const apresentacoes = (row.apresentacoes || []).map(ap => {
    const match = ap.match(/^(\w+)\s+(.+?)(?:\s+\((.+)\))?(?:\s+\[SUS\])?$/);
    const disponivelSUS = ap.includes('[SUS]');
    return {
      forma: (match?.[1] || 'comprimido') as Medicamento['apresentacoes'][0]['forma'],
      concentracao: match?.[2] || ap,
      quantidade: match?.[3],
      disponivelSUS,
    };
  });

  // Parse posologia from JSON
  const posologiaArray = Array.isArray(row.posologia) ? row.posologia : [];
  const posologias = posologiaArray.map((pos) => {
    const posObj = pos as Record<string, unknown>;
    return {
      indicacao: String(posObj.indicacao || ''),
      adultos: posObj.adultos as Medicamento['posologias'][0]['adultos'],
      pediatrico: posObj.pediatrico as Medicamento['posologias'][0]['pediatrico'],
      idosos: posObj.idosos as Medicamento['posologias'][0]['idosos'],
    };
  });

  // Parse interacoes from JSON
  const interacoesArray = Array.isArray(row.interacoes) ? row.interacoes : [];
  const interacoes = interacoesArray.map((int) => {
    const intObj = int as Record<string, unknown>;
    return {
      medicamento: String(intObj.medicamento || ''),
      gravidade: String(intObj.gravidade || 'moderada') as Medicamento['interacoes'][0]['gravidade'],
      efeito: String(intObj.efeito || ''),
      mecanismo: intObj.mecanismo ? String(intObj.mecanismo) : undefined,
      conduta: String(intObj.conduta || ''),
    };
  });

  // Parse efeitos adversos
  const efeitosAdversos = row.efeitos_adversos as { comuns?: string[]; graves?: string[] } | null;

  // Parse ajuste dose renal
  const ajusteDose = row.ajuste_dose as { renal?: Array<{ tfg: string; ajuste: string; observacao?: string }> } | null;

  // Parse lactacao
  const lactacaoStr = row.lactacao || '';
  const lactacaoCompativel = lactacaoStr.toLowerCase().startsWith('compatível');
  const lactacaoObs = lactacaoStr.replace(/^(Compatível|Não compatível):\s*/, '');

  return {
    id: row.id,
    nomeGenerico: row.nome_generico,
    nomesComerciais: row.nome_comercial || undefined,
    classeTerapeutica: row.classe_terapeutica as ClasseTerapeutica,
    subclasse: row.subclasse as Medicamento['subclasse'],
    rename: row.disponivel_sus,
    apresentacoes,
    indicacoes: row.indicacoes || [],
    mecanismoAcao: row.mecanismo_acao || '',
    posologias,
    contraindicacoes: row.contraindicacoes || [],
    efeitosAdversos: {
      comuns: efeitosAdversos?.comuns || [],
      graves: efeitosAdversos?.graves,
    },
    interacoes,
    ajusteDoseRenal: ajusteDose?.renal,
    gestacao: (row.gestacao || 'N') as Medicamento['gestacao'],
    amamentacao: {
      compativel: lactacaoCompativel,
      observacao: lactacaoObs || 'Dados não disponíveis',
    },
    consideracoesEspeciais: {
      idosos: row.idoso || undefined,
      hepatopatas: row.insuficiencia_hepatica || undefined,
      pediatrico: row.pediatrico || undefined,
    },
    monitorizacao: row.monitoramento || undefined,
    doencasRelacionadas: [],
    citations: Array.isArray(row.referencias) ? row.referencias as unknown as Medicamento['citations'] : [],
    lastUpdate: row.updated_at,
    atcCode: row.atc_code || undefined,
    rxNormCui: row.rxnorm_cui || undefined,
    drugBankId: row.drugbank_id || undefined,
    snomedCT: row.snomed_ct || undefined,
    loinc: row.loinc || undefined,
    pharmgkb: Array.isArray(row.pharmgkb) ? row.pharmgkb as unknown as Medicamento['pharmgkb'] : undefined,
    regionalOverlays: row.regional_overlays as unknown as Medicamento['regionalOverlays'],
  };
}

/**
 * Get a medication by ID (server-side)
 * Falls back to TypeScript constants if Supabase is not configured
 */
export async function getMedicamentoServer(id: string): Promise<Medicamento | null> {
  // For static builds or when Supabase is not configured, use local data
  if (!isSupabaseConfigured) {
    return getLocalMedicamentoById(id) || null;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return getLocalMedicamentoById(id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('medicamentos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching medicamento from Supabase:', error);
      // Fallback to local data
      return getLocalMedicamentoById(id) || null;
    }

    return convertToMedicamento(data);
  } catch (err) {
    console.error('Error in getMedicamentoServer:', err);
    return getLocalMedicamentoById(id) || null;
  }
}

/**
 * Get all medications (server-side)
 */
export async function getMedicamentosServer(): Promise<Medicamento[]> {
  if (!isSupabaseConfigured) {
    return medicamentosConsolidados;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return medicamentosConsolidados;
  }

  try {
    const { data, error } = await supabase
      .from('medicamentos')
      .select('*')
      .order('nome_generico');

    if (error) {
      console.error('Error fetching medicamentos from Supabase:', error);
      return medicamentosConsolidados;
    }

    return data.map(convertToMedicamento);
  } catch (err) {
    console.error('Error in getMedicamentosServer:', err);
    return medicamentosConsolidados;
  }
}

/**
 * Get medication IDs for static generation
 * Always returns local data for generateStaticParams
 */
export function getMedicamentoIdsForStatic(): string[] {
  return medicamentosConsolidados.map(m => m.id);
}

/**
 * Check if a medication exists (for 404 handling)
 */
export async function medicamentoExists(id: string): Promise<boolean> {
  // Always check local data first (for static generation)
  const localMed = getLocalMedicamentoById(id);
  if (localMed) return true;

  // If not in local data, check Supabase
  if (!isSupabaseConfigured) {
    return false;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return false;
  }

  try {
    const { count, error } = await supabase
      .from('medicamentos')
      .select('*', { count: 'exact', head: true })
      .eq('id', id);

    if (error) {
      return false;
    }

    return (count || 0) > 0;
  } catch {
    return false;
  }
}
