/**
 * SERVER-SIDE SUPABASE UTILITIES - DOENCAS
 * ==========================================
 *
 * Server-side utilities for fetching disease data from Supabase
 * Falls back to TypeScript constants for static builds
 *
 * Usage (in Server Components):
 *   import { getDoencaServer } from '@/lib/supabase/server-utils-doencas';
 *   const doenca = await getDoencaServer(id);
 */

import { createServerSupabaseClient, isSupabaseConfigured } from './client';
import type { Database } from './types';
import type { Doenca, CategoriaDoenca } from '@/lib/types/doenca';
import type { Citation } from '@/lib/types/references';
import {
  doencasConsolidadas,
  getDoencaById as getLocalDoencaById,
} from '@/lib/data/doencas/index';

// Type alias for Supabase disease row
type DoencaRow = Database['public']['Tables']['doencas']['Row'];

/**
 * Convert Supabase row to Partial<Doenca> type (same as client service)
 */
function convertToDoenca(row: DoencaRow): Partial<Doenca> {
  const epidemioData = row.epidemiologia as Record<string, unknown> | null;
  const quadroData = row.quadro_clinico as Record<string, unknown> | null;
  const diagnosticoData = row.diagnostico as Record<string, unknown> | null;
  const tratamentoData = row.tratamento as Record<string, unknown> | null;
  const criteriosData = row.criterios_diagnosticos as Record<string, unknown> | null;
  const referencias = Array.isArray(row.referencias) ? row.referencias as unknown as Citation[] : [];

  const quickView = {
    definicao: row.descricao || '',
    criteriosDiagnosticos: Array.isArray(criteriosData?.criterios)
      ? criteriosData.criterios as string[]
      : Array.isArray(quadroData?.sintomas)
        ? quadroData.sintomas as string[]
        : [],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: Array.isArray(tratamentoData?.nao_farmacologico)
        ? tratamentoData.nao_farmacologico as string[]
        : [],
      farmacologico: Array.isArray(tratamentoData?.farmacologico)
        ? (tratamentoData.farmacologico as Array<Record<string, unknown>>).map(f => String(f.classe || f.medicamento || f))
        : [],
    },
    redFlags: row.quando_encaminhar || [],
  };

  const fullContent = {
    epidemiologia: {
      prevalencia: epidemioData?.prevalencia ? String(epidemioData.prevalencia) : undefined,
      incidencia: epidemioData?.incidencia ? String(epidemioData.incidencia) : undefined,
      mortalidade: epidemioData?.mortalidade ? String(epidemioData.mortalidade) : undefined,
      faixaEtaria: epidemioData?.faixa_etaria ? String(epidemioData.faixa_etaria) : undefined,
      fatoresRisco: Array.isArray(epidemioData?.fatores_risco)
        ? epidemioData.fatores_risco as string[]
        : [],
      citations: referencias,
    },
    fisiopatologia: row.fisiopatologia
      ? { texto: row.fisiopatologia, citations: referencias }
      : undefined,
    quadroClinico: {
      sintomasPrincipais: Array.isArray(quadroData?.sintomas)
        ? quadroData.sintomas as string[]
        : [],
      sinaisExameFisico: Array.isArray(quadroData?.sinais)
        ? quadroData.sinais as string[]
        : [],
      formasClinicas: quadroData?.apresentacao_tipica
        ? [String(quadroData.apresentacao_tipica)]
        : undefined,
      citations: referencias,
    },
    diagnostico: {
      criterios: Array.isArray(diagnosticoData?.clinico)
        ? diagnosticoData.clinico as string[]
        : diagnosticoData?.clinico
          ? [String(diagnosticoData.clinico)]
          : [],
      diagnosticoDiferencial: Array.isArray(diagnosticoData?.diferencial)
        ? diagnosticoData.diferencial as string[]
        : [],
      examesLaboratoriais: Array.isArray(diagnosticoData?.laboratorial)
        ? diagnosticoData.laboratorial as string[]
        : diagnosticoData?.laboratorial
          ? [String(diagnosticoData.laboratorial)]
          : undefined,
      examesImagem: Array.isArray(diagnosticoData?.imagem)
        ? diagnosticoData.imagem as string[]
        : diagnosticoData?.imagem
          ? [String(diagnosticoData.imagem)]
          : undefined,
      citations: referencias,
    },
    tratamento: {
      objetivos: [],
      naoFarmacologico: {
        medidas: Array.isArray(tratamentoData?.nao_farmacologico)
          ? tratamentoData.nao_farmacologico as string[]
          : [],
        citations: referencias,
      },
      farmacologico: {
        primeiraLinha: Array.isArray(tratamentoData?.farmacologico)
          ? (tratamentoData.farmacologico as Array<Record<string, unknown>>).map(f => ({
              classe: String(f.classe || ''),
              medicamentos: Array.isArray(f.medicamentos) ? f.medicamentos as string[] : [],
              posologia: f.posologia ? String(f.posologia) : undefined,
              observacoes: f.observacoes ? String(f.observacoes) : undefined,
            }))
          : [],
        citations: referencias,
      },
    },
    acompanhamento: {
      frequenciaConsultas: '',
      metasTerapeuticas: [],
      criteriosEncaminhamento: row.quando_encaminhar || [],
      citations: referencias,
    },
    prevencao: row.prevencao
      ? { primaria: row.prevencao, secundaria: [], citations: referencias }
      : undefined,
  };

  const cid10 = row.cid10 ? row.cid10.split(',').map(c => c.trim()) : [];
  const ciap2 = row.ciap2 ? row.ciap2.split(',').map(c => c.trim()) : [];

  return {
    id: row.id,
    titulo: row.nome,
    sinonimos: row.nome_alternativo || undefined,
    categoria: row.categoria as CategoriaDoenca,
    subcategoria: row.subcategoria || undefined,
    cid10,
    ciap2,
    quickView,
    fullContent,
    protocolos: row.protocolos_relacionados || [],
    medicamentos: row.medicamentos_relacionados || [],
    calculadoras: [],
    citations: referencias,
    lastUpdate: row.updated_at,
    regionalOverlays: row.regional_overlays as unknown as Doenca['regionalOverlays'],
  };
}

/**
 * Get a disease by ID (server-side)
 * Falls back to TypeScript constants if Supabase is not configured
 */
export async function getDoencaServer(id: string): Promise<Partial<Doenca> | null> {
  if (!isSupabaseConfigured) {
    return getLocalDoencaById(id) || null;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return getLocalDoencaById(id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('doencas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching doenca from Supabase:', error);
      return getLocalDoencaById(id) || null;
    }

    return convertToDoenca(data);
  } catch (err) {
    console.error('Error in getDoencaServer:', err);
    return getLocalDoencaById(id) || null;
  }
}

/**
 * Get all diseases (server-side)
 */
export async function getDoencasServer(): Promise<Partial<Doenca>[]> {
  if (!isSupabaseConfigured) {
    return doencasConsolidadas;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return doencasConsolidadas;
  }

  try {
    const { data, error } = await supabase
      .from('doencas')
      .select('*')
      .order('nome');

    if (error) {
      console.error('Error fetching doencas from Supabase:', error);
      return doencasConsolidadas;
    }

    return data.map(convertToDoenca);
  } catch (err) {
    console.error('Error in getDoencasServer:', err);
    return doencasConsolidadas;
  }
}

/**
 * Get disease IDs for static generation
 * Always returns local data for generateStaticParams
 */
export function getDoencaIdsForStatic(): string[] {
  return doencasConsolidadas
    .filter(d => d.id)
    .map(d => d.id!);
}

/**
 * Check if a disease exists (for 404 handling)
 */
export async function doencaExists(id: string): Promise<boolean> {
  const localDoenca = getLocalDoencaById(id);
  if (localDoenca) return true;

  if (!isSupabaseConfigured) {
    return false;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return false;
  }

  try {
    const { count, error } = await supabase
      .from('doencas')
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
