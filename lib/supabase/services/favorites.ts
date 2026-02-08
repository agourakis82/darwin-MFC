/**
 * SUPABASE FAVORITES SERVICE
 * ===========================
 *
 * Service layer for favorites with build-safe null checks.
 * Falls back to appStore local state when Supabase is not configured.
 *
 * Note: appStore already syncs favorites to Supabase via syncToCloud/loadFromCloud.
 * This service provides direct Supabase access for richer queries (metadata, tags, timestamps).
 */

import { supabase, isSupabaseConfigured } from '../client';
import type { SupabaseClient } from '../client';
import type { Database } from '../types';

type FavoriteRow = Database['public']['Tables']['favorites']['Row'];
type FavoriteEntityType = FavoriteRow['entity_type'];

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
 * Add an item to favorites in Supabase
 */
export async function addFavoriteToSupabase(
  entityType: FavoriteEntityType,
  entityId: string,
  options?: { notes?: string; tags?: string[] }
): Promise<{ data: FavoriteRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };

  try {
    const { data, error } = await auth.client
      .from('favorites')
      .insert({
        user_id: auth.userId,
        entity_type: entityType,
        entity_id: entityId,
        notes: options?.notes,
        tags: options?.tags,
      })
      .select()
      .single();

    return { data, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to add favorite' };
  }
}

/**
 * Remove an item from favorites in Supabase
 */
export async function removeFavoriteFromSupabase(
  entityType: FavoriteEntityType,
  entityId: string
): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };

  try {
    const { error } = await auth.client
      .from('favorites')
      .delete()
      .eq('user_id', auth.userId)
      .eq('entity_type', entityType)
      .eq('entity_id', entityId);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to remove favorite' };
  }
}

/**
 * Check if an item is favorited in Supabase
 */
export async function checkIsFavorite(
  entityType: FavoriteEntityType,
  entityId: string
): Promise<boolean> {
  const auth = await getAuthClient();
  if (!auth) return false;

  try {
    const { data } = await auth.client
      .from('favorites')
      .select('id')
      .eq('user_id', auth.userId)
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .single();

    return !!data;
  } catch {
    return false;
  }
}

/**
 * Get all favorites for the current user, optionally filtered by entity type
 */
export async function getFavoritesFromSupabase(
  entityType?: FavoriteEntityType
): Promise<{ data: FavoriteRow[]; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: null };

  try {
    let query = auth.client
      .from('favorites')
      .select('*')
      .eq('user_id', auth.userId);

    if (entityType) {
      query = query.eq('entity_type', entityType);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch favorites' };
  }
}

/**
 * Get favorites count by entity type
 */
export async function getFavoritesCount(
  entityType?: FavoriteEntityType
): Promise<number> {
  const auth = await getAuthClient();
  if (!auth) return 0;

  try {
    let query = auth.client
      .from('favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', auth.userId);

    if (entityType) {
      query = query.eq('entity_type', entityType);
    }

    const { count } = await query;
    return count ?? 0;
  } catch {
    return 0;
  }
}
