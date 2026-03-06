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
import type { Doenca, CategoriaDoenca } from '@/lib/types/doenca';
import {
  doencasConsolidadas,
  getDoencaById as getLocalDoencaById,
  filterByCategoria as getLocalDoencasByCategoria,
  searchDoencas as searchLocalDoencas,
  getDoencasByCID10 as getLocalDoencasByCID10,
  getDoencasByCIAP2 as getLocalDoencasByCIAP2,
  getDoencasStats as getLocalDoencasStats,
} from '@/lib/data/doencas/index';
import { convertDoencaRowToDoenca } from '@/lib/supabase/transforms/doencas';

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

  return data.map(convertDoencaRowToDoenca);
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

  return convertDoencaRowToDoenca(data);
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

  return data.map(convertDoencaRowToDoenca);
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

  return data.map(convertDoencaRowToDoenca);
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

  return data.map(convertDoencaRowToDoenca);
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

  return data.map(convertDoencaRowToDoenca);
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
    data: data.map(convertDoencaRowToDoenca),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
