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
} from '@/lib/data/medicamentos/index';
import { convertMedicamentoRowToMedicamento } from '@/lib/supabase/transforms/medicamentos';
import {
  applyMedicationEditorialOverlay,
  mergeMedicamentoCatalogs,
  toMedicationEditorialOverlay,
} from '@/lib/supabase/merge-medicamentos';

const getLocalMedicamentosSUS = () =>
  medicamentosConsolidados.filter(
    (medicamento) =>
      medicamento.rename || medicamento.apresentacoes.some((apresentacao) => apresentacao.disponivelSUS)
  );

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

  return mergeMedicamentoCatalogs(
    medicamentosConsolidados,
    data.map(convertMedicamentoRowToMedicamento)
  );
}

/**
 * Get a single medication by ID
 */
export async function getMedicamentoById(id: string): Promise<Medicamento | null> {
  const localMedication = getLocalMedicamentoById(id) || null;
  if (!localMedication) return null;
  if (!isSupabaseConfigured || !supabase) {
    return localMedication;
  }

  const { data, error } = await supabase
    .from('medicamentos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching medicamento from Supabase:', error);
    return localMedication;
  }

  return applyMedicationEditorialOverlay(
    localMedication,
    toMedicationEditorialOverlay(convertMedicamentoRowToMedicamento(data)),
  );
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

  return mergeMedicamentoCatalogs(
    getLocalMedicamentosByClasse(classe),
    data.map(convertMedicamentoRowToMedicamento)
  );
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

  return mergeMedicamentoCatalogs(
    searchLocalMedicamentos(query),
    data.map(convertMedicamentoRowToMedicamento)
  ).slice(0, 50);
}

/**
 * Get medications available in SUS
 */
export async function getMedicamentosSUS(): Promise<Medicamento[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalMedicamentosSUS();
  }

  const { data, error } = await supabase
    .from('medicamentos')
    .select('*')
    .eq('disponivel_sus', true)
    .order('nome_generico');

  if (error) {
    console.error('Error fetching SUS medicamentos from Supabase:', error);
    return getLocalMedicamentosSUS();
  }

  return mergeMedicamentoCatalogs(
    getLocalMedicamentosSUS(),
    data.map(convertMedicamentoRowToMedicamento)
  );
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
  const medicamentos = await getMedicamentos();
  const byClasse = medicamentos.reduce((acc, medicamento) => {
    acc[medicamento.classeTerapeutica] = (acc[medicamento.classeTerapeutica] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const susTotal = medicamentos.filter(
    (medicamento) =>
      medicamento.rename || medicamento.apresentacoes.some((apresentacao) => apresentacao.disponivelSUS)
  ).length;
  const renameTotal = medicamentos.filter((medicamento) => medicamento.rename).length;
  const totalCount = medicamentos.length;

  return {
    total: totalCount,
    rename: renameTotal,
    disponivelSUS: susTotal,
    byClasse,
    percentRENAME: totalCount > 0 ? Math.round((renameTotal / totalCount) * 100) : 0,
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
  let filtered = await getMedicamentos();
  if (filters?.classe) {
    filtered = filtered.filter((medicamento) => medicamento.classeTerapeutica === filters.classe);
  }
  if (filters?.disponivelSUS) {
    filtered = filtered.filter(
      (medicamento) =>
        medicamento.rename || medicamento.apresentacoes.some((apresentacao) => apresentacao.disponivelSUS)
    );
  }
  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      (medicamento) =>
        medicamento.nomeGenerico.toLowerCase().includes(searchTerm) ||
        medicamento.nomesComerciais?.some((nome) => nome.toLowerCase().includes(searchTerm)) ||
        medicamento.classeTerapeutica.toLowerCase().includes(searchTerm)
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
