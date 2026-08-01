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
import {
  applyMedicationEditorialOverlay,
  applyMedicationEditorialOverlaysV2,
  mergeMedicamentoCatalogs,
  toMedicationEditorialOverlay,
} from '@/lib/supabase/merge-medicamentos';
import { getMedicationEditorialOverlaysV2 } from './services/medication-editorial-overlays';

/**
 * Get a medication by ID (server-side)
 * Falls back to TypeScript constants if Supabase is not configured
 */
export async function getMedicamentoServer(id: string): Promise<Medicamento | null> {
  const localMedication = getLocalMedicamentoById(id) || null;
  // Unknown remote rows are audit candidates, never automatic catalog entries.
  if (!localMedication) return null;
  // For static builds or when Supabase is not configured, use local data
  if (!isSupabaseConfigured) {
    return localMedication;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return localMedication;
  }

  try {
    const { data, error } = await supabase
      .from('medicamentos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error('Error fetching medicamento from Supabase:', error);
      }
      // Fallback to local data
      return localMedication;
    }

    const merged = applyMedicationEditorialOverlay(
      localMedication,
      toMedicationEditorialOverlay(convertMedicamentoRowToMedicamento(data)),
    );
    const overlays = await getMedicationEditorialOverlaysV2(supabase as any, [id]);
    return applyMedicationEditorialOverlaysV2([merged], overlays)[0];
  } catch (err) {
    console.error('Error in getMedicamentoServer:', err);
    return localMedication;
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

    if (error || !data?.length) {
      if (error) {
        console.error('Error fetching medicamentos from Supabase:', error);
      }
      return medicamentosConsolidados;
    }

    const merged = mergeMedicamentoCatalogs(
      medicamentosConsolidados,
      data.map(convertMedicamentoRowToMedicamento)
    );
    const overlays = await getMedicationEditorialOverlaysV2(supabase as any, merged.map(item => item.id));
    return applyMedicationEditorialOverlaysV2(merged, overlays);
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

  return false;
}
