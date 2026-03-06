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
import type { Doenca } from '@/lib/types/doenca';
import {
  doencasConsolidadas,
  getDoencaById as getLocalDoencaById,
} from '@/lib/data/doencas/index';
import { convertDoencaRowToDoenca } from '@/lib/supabase/transforms/doencas';

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

    return convertDoencaRowToDoenca(data);
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

    return data.map(convertDoencaRowToDoenca);
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
