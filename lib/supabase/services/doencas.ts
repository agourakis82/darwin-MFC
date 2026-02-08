/**
 * SUPABASE DOENCAS SERVICE
 * ========================
 *
 * Service layer for fetching disease data from Supabase
 * Falls back to TypeScript constants when Supabase is not configured
 *
 * Usage:
 *   import { getDoencas, getDoencaById } from '@/lib/supabase/services/doencas';
 */

import { supabase, isSupabaseConfigured } from '../client';
import type { Database } from '../types';
import type { Doenca, CategoriaDoenca } from '@/lib/types/doenca';
import type { Citation } from '@/lib/types/references';
import {
  doencasConsolidadas,
  getDoencaById as getLocalDoencaById,
  filterByCategoria as getLocalDoencasByCategoria,
  searchDoencas as searchLocalDoencas,
  getDoencasByCID10 as getLocalDoencasByCID10,
  getDoencasByCIAP2 as getLocalDoencasByCIAP2,
  getDoencasStats as getLocalDoencasStats,
} from '@/lib/data/doencas/index';

// Type alias for Supabase disease row
type DoencaRow = Database['public']['Tables']['doencas']['Row'];

/**
 * Convert Supabase row to Partial<Doenca> type
 *
 * The disease data in the DB uses a flatter JSONB structure.
 * We reconstruct the nested QuickView + FullContent from it.
 */
function convertToDoenca(row: DoencaRow): Partial<Doenca> {
  // Parse epidemiologia from JSONB
  const epidemioData = row.epidemiologia as Record<string, unknown> | null;

  // Parse quadro_clinico from JSONB
  const quadroData = row.quadro_clinico as Record<string, unknown> | null;

  // Parse diagnostico from JSONB
  const diagnosticoData = row.diagnostico as Record<string, unknown> | null;

  // Parse tratamento from JSONB
  const tratamentoData = row.tratamento as Record<string, unknown> | null;

  // Parse criterios_diagnosticos from JSONB
  const criteriosData = row.criterios_diagnosticos as Record<string, unknown> | null;

  // Parse referencias
  const referencias = Array.isArray(row.referencias) ? row.referencias as unknown as Citation[] : [];

  // Build quickView from available data
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

  // Build fullContent from available data
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

  // Parse cid10 - DB stores as single string, TypeScript expects array
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
 * Get all diseases
 * Falls back to TypeScript constants if Supabase is not configured
 */
export async function getDoencas(): Promise<Partial<Doenca>[]> {
  if (!isSupabaseConfigured || !supabase) {
    return doencasConsolidadas;
  }

  const { data, error } = await supabase
    .from('doencas')
    .select('*')
    .order('nome');

  if (error) {
    console.error('Error fetching doencas from Supabase:', error);
    return doencasConsolidadas;
  }

  return data.map(convertToDoenca);
}

/**
 * Get a single disease by ID
 */
export async function getDoencaById(id: string): Promise<Partial<Doenca> | null> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalDoencaById(id) || null;
  }

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
}

/**
 * Get diseases by category
 */
export async function getDoencasByCategoria(categoria: string): Promise<Partial<Doenca>[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalDoencasByCategoria(categoria);
  }

  const { data, error } = await supabase
    .from('doencas')
    .select('*')
    .eq('categoria', categoria)
    .order('nome');

  if (error) {
    console.error('Error fetching doencas by categoria from Supabase:', error);
    return getLocalDoencasByCategoria(categoria);
  }

  return data.map(convertToDoenca);
}

/**
 * Search diseases by name, synonym, or code
 */
export async function searchDoencas(query: string): Promise<Partial<Doenca>[]> {
  if (!isSupabaseConfigured || !supabase) {
    return searchLocalDoencas(query);
  }

  const normalizedQuery = query.toLowerCase().trim();

  const { data, error } = await supabase
    .from('doencas')
    .select('*')
    .or(`nome.ilike.%${normalizedQuery}%,cid10.ilike.%${normalizedQuery}%,ciap2.ilike.%${normalizedQuery}%,categoria.ilike.%${normalizedQuery}%`)
    .order('nome')
    .limit(50);

  if (error) {
    console.error('Error searching doencas from Supabase:', error);
    return searchLocalDoencas(query);
  }

  return data.map(convertToDoenca);
}

/**
 * Get diseases by CID-10 code
 */
export async function getDoencasByCid10(code: string): Promise<Partial<Doenca>[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalDoencasByCID10(code);
  }

  const { data, error } = await supabase
    .from('doencas')
    .select('*')
    .ilike('cid10', `%${code}%`)
    .order('nome');

  if (error) {
    console.error('Error fetching doencas by CID-10 from Supabase:', error);
    return getLocalDoencasByCID10(code);
  }

  return data.map(convertToDoenca);
}

/**
 * Get diseases by CIAP-2 code
 */
export async function getDoencasByCiap2(code: string): Promise<Partial<Doenca>[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalDoencasByCIAP2(code);
  }

  const { data, error } = await supabase
    .from('doencas')
    .select('*')
    .ilike('ciap2', `%${code}%`)
    .order('nome');

  if (error) {
    console.error('Error fetching doencas by CIAP-2 from Supabase:', error);
    return getLocalDoencasByCIAP2(code);
  }

  return data.map(convertToDoenca);
}

/**
 * Get disease statistics
 */
export async function getDoencasStats(): Promise<{
  total: number;
  porCategoria: Record<string, number>;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalDoencasStats();
  }

  // Get total count
  const { count: total, error: totalError } = await supabase
    .from('doencas')
    .select('*', { count: 'exact', head: true });

  // Get counts by category
  const { data: catCounts, error: catError } = await supabase
    .from('doencas')
    .select('categoria');

  if (totalError || catError) {
    console.error('Error fetching doenca stats from Supabase');
    return getLocalDoencasStats();
  }

  const porCategoria = (catCounts ?? []).reduce((acc, row) => {
    const cat = (row as { categoria: string }).categoria;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: total || 0,
    porCategoria,
  };
}

/**
 * Get diseases with pagination
 */
export async function getDoencasPaginated(
  page: number = 1,
  pageSize: number = 50,
  filters?: {
    categoria?: string;
    search?: string;
  }
): Promise<{
  data: Partial<Doenca>[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  if (!isSupabaseConfigured || !supabase) {
    // Local pagination fallback
    let filtered = doencasConsolidadas as Partial<Doenca>[];

    if (filters?.categoria) {
      filtered = filtered.filter(d => d.categoria === filters.categoria);
    }
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(d =>
        d.titulo?.toLowerCase().includes(query) ||
        d.sinonimos?.some(s => s.toLowerCase().includes(query)) ||
        d.cid10?.some(c => c.toLowerCase().includes(query)) ||
        d.ciap2?.some(c => c.toLowerCase().includes(query))
      );
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // Build Supabase query
  let query = supabase.from('doencas').select('*', { count: 'exact' });

  if (filters?.categoria) {
    query = query.eq('categoria', filters.categoria);
  }
  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    query = query.or(`nome.ilike.%${searchTerm}%,cid10.ilike.%${searchTerm}%`);
  }

  const start = (page - 1) * pageSize;
  const { data, error, count } = await query
    .order('nome')
    .range(start, start + pageSize - 1);

  if (error) {
    console.error('Error fetching paginated doencas:', error);
    // Fallback to local
    return getDoencasPaginated(page, pageSize, filters);
  }

  const total = count || 0;

  return {
    data: data.map(convertToDoenca),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
