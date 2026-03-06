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
import type { Medicamento } from '@/lib/types/medicamento';
import {
  medicamentosConsolidados,
  getMedicamentoById as getLocalMedicamentoById,
} from '@/lib/data/medicamentos/index';
import { convertMedicamentoRowToMedicamento } from '@/lib/supabase/transforms/medicamentos';

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

    return convertMedicamentoRowToMedicamento(data);
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

    return data.map(convertMedicamentoRowToMedicamento);
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
