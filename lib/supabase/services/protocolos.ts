/**
 * SUPABASE PROTOCOLOS SERVICE
 * ============================
 *
 * Service layer for fetching protocol data from Supabase
 * Falls back to TypeScript constants when Supabase is not configured
 *
 * Usage:
 *   import { getProtocolos, getProtocoloById } from '@/lib/supabase/services/protocolos';
 */

import { supabase, isSupabaseConfigured } from '../client';
import type { Database } from '../types';
import type { Protocolo, CategoriaProtocolo, NivelComplexidade } from '@/lib/types/protocolo';
import {
  todosProtocolosFlowchart,
  getProtocoloById as getLocalProtocoloById,
  getProtocolosByCategoria as getLocalProtocolosByCategoria,
} from '@/lib/data/protocolos-flowchart';

// Type alias for Supabase protocol row
type ProtocoloRow = Database['public']['Tables']['protocolos']['Row'];

/**
 * Convert Supabase row to Protocolo type
 *
 * The DB stores fluxograma as JSONB with {nodes, edges}.
 * We reconstruct the full Protocolo type from it.
 */
function convertToProtocolo(row: ProtocoloRow): Protocolo {
  // Parse fluxograma from JSONB
  const fluxogramaData = row.fluxograma as Record<string, unknown> | null;
  const nodes = Array.isArray(fluxogramaData?.nodes) ? fluxogramaData.nodes as Protocolo['nodes'] : [];
  const edges = Array.isArray(fluxogramaData?.edges) ? fluxogramaData.edges as Protocolo['edges'] : [];

  // Parse etapas from JSONB
  const etapasData = row.etapas as Record<string, unknown> | null;

  // Parse monitoramento from JSONB
  const monitoramentoData = row.monitoramento as Record<string, unknown> | null;

  // Parse referencias
  const referencias = Array.isArray(row.referencias) ? row.referencias as string[] : [];

  return {
    id: row.id,
    titulo: row.titulo,
    categoria: row.categoria as CategoriaProtocolo,
    complexidade: (etapasData?.complexidade as NivelComplexidade) || 'basico',
    versao: etapasData?.versao ? String(etapasData.versao) : '1.0',
    ultimaAtualizacao: row.updated_at,
    fonte: row.fonte || '',
    descricao: row.descricao || '',
    objetivos: Array.isArray(etapasData?.objetivos) ? etapasData.objetivos as string[] : [],
    populacaoAlvo: etapasData?.populacaoAlvo ? String(etapasData.populacaoAlvo) : '',
    nodes,
    edges,
    criteriosInclusao: row.criterios_inclusao || undefined,
    criteriosExclusao: row.criterios_exclusao || undefined,
    sinaisAlerta: Array.isArray(etapasData?.sinaisAlerta) ? etapasData.sinaisAlerta as string[] : undefined,
    encaminhamento: etapasData?.encaminhamento ? etapasData.encaminhamento as Protocolo['encaminhamento'] : undefined,
    referencias,
    doencasRelacionadas: row.condicoes || undefined,
    medicamentosRelacionados: row.medicamentos || undefined,
    calculadorasRelacionadas: Array.isArray(etapasData?.calculadoras) ? etapasData.calculadoras as string[] : undefined,
    tags: Array.isArray(etapasData?.tags) ? etapasData.tags as string[] : [],
  };
}

/**
 * Get all protocols
 * Falls back to TypeScript constants if Supabase is not configured
 */
export async function getProtocolos(): Promise<Protocolo[]> {
  if (!isSupabaseConfigured || !supabase) {
    return todosProtocolosFlowchart;
  }

  const { data, error } = await supabase
    .from('protocolos')
    .select('*')
    .order('titulo');

  if (error) {
    console.error('Error fetching protocolos from Supabase:', error);
    return todosProtocolosFlowchart;
  }

  return data.map(convertToProtocolo);
}

/**
 * Get a single protocol by ID
 */
export async function getProtocoloById(id: string): Promise<Protocolo | null> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalProtocoloById(id) || null;
  }

  const { data, error } = await supabase
    .from('protocolos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching protocolo from Supabase:', error);
    return getLocalProtocoloById(id) || null;
  }

  return convertToProtocolo(data);
}

/**
 * Get protocols by category
 */
export async function getProtocolosByCategoria(categoria: string): Promise<Protocolo[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalProtocolosByCategoria(categoria);
  }

  const { data, error } = await supabase
    .from('protocolos')
    .select('*')
    .eq('categoria', categoria)
    .order('titulo');

  if (error) {
    console.error('Error fetching protocolos by categoria from Supabase:', error);
    return getLocalProtocolosByCategoria(categoria);
  }

  return data.map(convertToProtocolo);
}

/**
 * Search protocols by title or description
 */
export async function searchProtocolos(query: string): Promise<Protocolo[]> {
  if (!isSupabaseConfigured || !supabase) {
    const normalizedQuery = query.toLowerCase().trim();
    return todosProtocolosFlowchart.filter(p =>
      p.titulo.toLowerCase().includes(normalizedQuery) ||
      p.descricao.toLowerCase().includes(normalizedQuery) ||
      p.tags.some(t => t.toLowerCase().includes(normalizedQuery))
    );
  }

  const normalizedQuery = query.toLowerCase().trim();

  const { data, error } = await supabase
    .from('protocolos')
    .select('*')
    .or(`titulo.ilike.%${normalizedQuery}%,descricao.ilike.%${normalizedQuery}%,categoria.ilike.%${normalizedQuery}%`)
    .order('titulo')
    .limit(50);

  if (error) {
    console.error('Error searching protocolos from Supabase:', error);
    return todosProtocolosFlowchart.filter(p =>
      p.titulo.toLowerCase().includes(normalizedQuery)
    );
  }

  return data.map(convertToProtocolo);
}

/**
 * Get protocols related to a disease
 */
export async function getProtocolosByDoenca(doencaId: string): Promise<Protocolo[]> {
  if (!isSupabaseConfigured || !supabase) {
    return todosProtocolosFlowchart.filter(p =>
      p.doencasRelacionadas?.includes(doencaId)
    );
  }

  const { data, error } = await supabase
    .from('protocolos')
    .select('*')
    .contains('condicoes', [doencaId])
    .order('titulo');

  if (error) {
    console.error('Error fetching protocolos by doenca from Supabase:', error);
    return todosProtocolosFlowchart.filter(p =>
      p.doencasRelacionadas?.includes(doencaId)
    );
  }

  return data.map(convertToProtocolo);
}

/**
 * Get protocol statistics
 */
export async function getProtocolosStats(): Promise<{
  total: number;
  porCategoria: Record<string, number>;
}> {
  if (!isSupabaseConfigured || !supabase) {
    const porCategoria: Record<string, number> = {};
    todosProtocolosFlowchart.forEach(p => {
      porCategoria[p.categoria] = (porCategoria[p.categoria] || 0) + 1;
    });
    return { total: todosProtocolosFlowchart.length, porCategoria };
  }

  const { count: total, error: totalError } = await supabase
    .from('protocolos')
    .select('*', { count: 'exact', head: true });

  const { data: catCounts, error: catError } = await supabase
    .from('protocolos')
    .select('categoria');

  if (totalError || catError) {
    console.error('Error fetching protocolo stats from Supabase');
    const porCategoria: Record<string, number> = {};
    todosProtocolosFlowchart.forEach(p => {
      porCategoria[p.categoria] = (porCategoria[p.categoria] || 0) + 1;
    });
    return { total: todosProtocolosFlowchart.length, porCategoria };
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
