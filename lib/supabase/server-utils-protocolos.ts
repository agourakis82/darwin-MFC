/**
 * SERVER-SIDE SUPABASE UTILITIES - PROTOCOLOS
 * =============================================
 *
 * Server-side utilities for fetching protocol data from Supabase
 * Falls back to TypeScript constants for static builds
 *
 * Usage (in Server Components):
 *   import { getProtocoloServer } from '@/lib/supabase/server-utils-protocolos';
 *   const protocolo = await getProtocoloServer(id);
 */

import { createServerSupabaseClient, isSupabaseConfigured } from './client';
import type { Database } from './types';
import type { Protocolo, CategoriaProtocolo, NivelComplexidade } from '@/lib/types/protocolo';
import {
  todosProtocolosFlowchart,
  getProtocoloById as getLocalProtocoloById,
} from '@/lib/data/protocolos-flowchart';

// Type alias for Supabase protocol row
type ProtocoloRow = Database['public']['Tables']['protocolos']['Row'];

/**
 * Convert Supabase row to Protocolo type (same as client service)
 */
function convertToProtocolo(row: ProtocoloRow): Protocolo {
  const fluxogramaData = row.fluxograma as Record<string, unknown> | null;
  const nodes = Array.isArray(fluxogramaData?.nodes) ? fluxogramaData.nodes as Protocolo['nodes'] : [];
  const edges = Array.isArray(fluxogramaData?.edges) ? fluxogramaData.edges as Protocolo['edges'] : [];

  const etapasData = row.etapas as Record<string, unknown> | null;
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
 * Get a protocol by ID (server-side)
 * Falls back to TypeScript constants if Supabase is not configured
 */
export async function getProtocoloServer(id: string): Promise<Protocolo | null> {
  if (!isSupabaseConfigured) {
    return getLocalProtocoloById(id) || null;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return getLocalProtocoloById(id) || null;
  }

  try {
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
  } catch (err) {
    console.error('Error in getProtocoloServer:', err);
    return getLocalProtocoloById(id) || null;
  }
}

/**
 * Get all protocols (server-side)
 */
export async function getProtocolosServer(): Promise<Protocolo[]> {
  if (!isSupabaseConfigured) {
    return todosProtocolosFlowchart;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return todosProtocolosFlowchart;
  }

  try {
    const { data, error } = await supabase
      .from('protocolos')
      .select('*')
      .order('titulo');

    if (error) {
      console.error('Error fetching protocolos from Supabase:', error);
      return todosProtocolosFlowchart;
    }

    return data.map(convertToProtocolo);
  } catch (err) {
    console.error('Error in getProtocolosServer:', err);
    return todosProtocolosFlowchart;
  }
}

/**
 * Get protocol IDs for static generation
 * Always returns local data for generateStaticParams
 */
export function getProtocoloIdsForStatic(): string[] {
  return todosProtocolosFlowchart.map(p => p.id);
}

/**
 * Check if a protocol exists (for 404 handling)
 */
export async function protocoloExists(id: string): Promise<boolean> {
  const localProtocolo = getLocalProtocoloById(id);
  if (localProtocolo) return true;

  if (!isSupabaseConfigured) {
    return false;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return false;
  }

  try {
    const { count, error } = await supabase
      .from('protocolos')
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
