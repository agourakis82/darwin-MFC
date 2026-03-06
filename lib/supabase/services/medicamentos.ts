/**
 * SUPABASE MEDICAMENTOS SERVICE
 * ==============================
 *
 * Service layer for fetching medication data from Supabase
 * Falls back to TypeScript constants when Supabase is not configured
 *
 * Usage:
 *   import { getMedicamentos, getMedicamentoById } from '@/lib/supabase/services/medicamentos';
 */

import { supabase, isSupabaseConfigured } from '../client';
import type { Medicamento } from '@/lib/types/medicamento';
import {
  medicamentosConsolidados,
  getMedicamentoById as getLocalMedicamentoById,
  getMedicamentosByClasse as getLocalMedicamentosByClasse,
  searchMedicamentos as searchLocalMedicamentos,
  getMedicamentoStats as getLocalMedicamentoStats,
} from '@/lib/data/medicamentos/index';
import { convertMedicamentoRowToMedicamento } from '@/lib/supabase/transforms/medicamentos';

/**
 * Get all medications
 * Falls back to TypeScript constants if Supabase is not configured
 */
export async function getMedicamentos(): Promise<Medicamento[]> {
  if (!isSupabaseConfigured || !supabase) {
    return medicamentosConsolidados;
  }

  const { data, error } = await supabase
    .from('medicamentos')
    .select('*')
    .order('nome_generico');

  if (error) {
    console.error('Error fetching medicamentos from Supabase:', error);
    return medicamentosConsolidados;
  }

  return data.map(convertMedicamentoRowToMedicamento);
}

/**
 * Get a single medication by ID
 */
export async function getMedicamentoById(id: string): Promise<Medicamento | null> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalMedicamentoById(id) || null;
  }

  const { data, error } = await supabase
    .from('medicamentos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching medicamento from Supabase:', error);
    return getLocalMedicamentoById(id) || null;
  }

  return convertMedicamentoRowToMedicamento(data);
}

/**
 * Get medications by therapeutic class
 */
export async function getMedicamentosByClasse(classe: string): Promise<Medicamento[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalMedicamentosByClasse(classe);
  }

  const { data, error } = await supabase
    .from('medicamentos')
    .select('*')
    .eq('classe_terapeutica', classe)
    .order('nome_generico');

  if (error) {
    console.error('Error fetching medicamentos by classe from Supabase:', error);
    return getLocalMedicamentosByClasse(classe);
  }

  return data.map(convertMedicamentoRowToMedicamento);
}

/**
 * Search medications by name, indication, or class
 */
export async function searchMedicamentos(query: string): Promise<Medicamento[]> {
  if (!isSupabaseConfigured || !supabase) {
    return searchLocalMedicamentos(query);
  }

  const normalizedQuery = query.toLowerCase().trim();

  // Use full-text search for Portuguese
  const { data, error } = await supabase
    .from('medicamentos')
    .select('*')
    .or(`nome_generico.ilike.%${normalizedQuery}%,classe_terapeutica.ilike.%${normalizedQuery}%,indicacoes.cs.{${normalizedQuery}}`)
    .order('nome_generico')
    .limit(50);

  if (error) {
    console.error('Error searching medicamentos from Supabase:', error);
    return searchLocalMedicamentos(query);
  }

  return data.map(convertMedicamentoRowToMedicamento);
}

/**
 * Get medications available in SUS
 */
export async function getMedicamentosSUS(): Promise<Medicamento[]> {
  if (!isSupabaseConfigured || !supabase) {
    return medicamentosConsolidados.filter(m => m.rename || m.apresentacoes.some(a => a.disponivelSUS));
  }

  const { data, error } = await supabase
    .from('medicamentos')
    .select('*')
    .eq('disponivel_sus', true)
    .order('nome_generico');

  if (error) {
    console.error('Error fetching SUS medicamentos from Supabase:', error);
    return medicamentosConsolidados.filter(m => m.rename);
  }

  return data.map(convertMedicamentoRowToMedicamento);
}

/**
 * Get medication statistics
 */
export async function getMedicamentoStats(): Promise<{
  total: number;
  rename: number;
  disponivelSUS: number;
  byClasse: Record<string, number>;
  percentRENAME: number;
  percentSUS: number;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalMedicamentoStats();
  }

  // Get total count
  const { count: total, error: totalError } = await supabase
    .from('medicamentos')
    .select('*', { count: 'exact', head: true });

  // Get SUS count
  const { count: susCount, error: susError } = await supabase
    .from('medicamentos')
    .select('*', { count: 'exact', head: true })
    .eq('disponivel_sus', true);

  // Get counts by class
  const { data: classCounts, error: classError } = await supabase
    .from('medicamentos')
    .select('classe_terapeutica');

  if (totalError || susError || classError) {
    console.error('Error fetching medicamento stats from Supabase');
    return getLocalMedicamentoStats();
  }

  const byClasse = (classCounts ?? []).reduce((acc, row) => {
    const classe = (row as { classe_terapeutica: string }).classe_terapeutica;
    acc[classe] = (acc[classe] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalCount = total || 0;
  const susTotal = susCount || 0;

  return {
    total: totalCount,
    rename: susTotal,
    disponivelSUS: susTotal,
    byClasse,
    percentRENAME: totalCount > 0 ? Math.round((susTotal / totalCount) * 100) : 0,
    percentSUS: totalCount > 0 ? Math.round((susTotal / totalCount) * 100) : 0,
  };
}

/**
 * Get medications with pagination
 */
export async function getMedicamentosPaginated(
  page: number = 1,
  pageSize: number = 50,
  filters?: {
    classe?: string;
    disponivelSUS?: boolean;
    search?: string;
  }
): Promise<{
  data: Medicamento[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  if (!isSupabaseConfigured || !supabase) {
    // Local pagination fallback
    let filtered = medicamentosConsolidados;

    if (filters?.classe) {
      filtered = filtered.filter(m => m.classeTerapeutica === filters.classe);
    }
    if (filters?.disponivelSUS) {
      filtered = filtered.filter(m => m.rename || m.apresentacoes.some(a => a.disponivelSUS));
    }
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(m =>
        m.nomeGenerico.toLowerCase().includes(query) ||
        m.nomesComerciais?.some(n => n.toLowerCase().includes(query)) ||
        m.classeTerapeutica.toLowerCase().includes(query)
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
  let query = supabase.from('medicamentos').select('*', { count: 'exact' });

  if (filters?.classe) {
    query = query.eq('classe_terapeutica', filters.classe);
  }
  if (filters?.disponivelSUS) {
    query = query.eq('disponivel_sus', true);
  }
  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    query = query.or(`nome_generico.ilike.%${searchTerm}%,classe_terapeutica.ilike.%${searchTerm}%`);
  }

  const start = (page - 1) * pageSize;
  const { data, error, count } = await query
    .order('nome_generico')
    .range(start, start + pageSize - 1);

  if (error) {
    console.error('Error fetching paginated medicamentos:', error);
    return getMedicamentosPaginated(page, pageSize, filters);
  }

  const total = count || 0;

  return {
    data: data.map(convertMedicamentoRowToMedicamento),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
