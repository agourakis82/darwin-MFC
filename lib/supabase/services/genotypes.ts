/**
 * SUPABASE GENOTYPES SERVICE
 * ===========================
 *
 * Service layer for patient pharmacogenomic genotype persistence.
 * Falls back gracefully when Supabase is not configured.
 */

import { supabase, isSupabaseConfigured } from '../client';
import type { SupabaseClient } from '../client';
import type { Database } from '../types';

type GenotypeRow = Database['public']['Tables']['patient_genotypes']['Row'];

/**
 * Get authenticated client + userId, or null if unavailable
 */
async function getAuthClient(): Promise<{ client: SupabaseClient; userId: string } | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) return null;
    return { client: supabase, userId: session.user.id };
  } catch {
    return null;
  }
}

/**
 * Get all genotypes for the current user
 */
export async function getGenotypesFromSupabase(): Promise<{
  data: GenotypeRow[];
  error: string | null;
}> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: null };

  try {
    const { data, error } = await auth.client
      .from('patient_genotypes')
      .select('*')
      .eq('user_id', auth.userId);

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch genotypes' };
  }
}

/**
 * Upsert a single genotype (insert or update)
 */
export async function upsertGenotypeInSupabase(
  gene: string,
  diplotype: string,
  source: string = 'self_reported'
): Promise<{ data: GenotypeRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };

  try {
    const { data, error } = await auth.client
      .from('patient_genotypes')
      .upsert(
        {
          user_id: auth.userId,
          gene,
          diplotype,
          source,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,gene' }
      )
      .select()
      .single();

    return { data, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to upsert genotype' };
  }
}

/**
 * Delete a single genotype by gene name
 */
export async function deleteGenotypeFromSupabase(
  gene: string
): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };

  try {
    const { error } = await auth.client
      .from('patient_genotypes')
      .delete()
      .eq('user_id', auth.userId)
      .eq('gene', gene);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to delete genotype' };
  }
}

/**
 * Clear all genotypes for the current user
 */
export async function clearAllGenotypesFromSupabase(): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };

  try {
    const { error } = await auth.client
      .from('patient_genotypes')
      .delete()
      .eq('user_id', auth.userId);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to clear genotypes' };
  }
}
