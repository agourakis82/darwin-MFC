/**
 * SUPABASE NOTES SERVICE
 * =======================
 *
 * Service layer for notes with build-safe null checks.
 * Falls back gracefully when Supabase is not configured.
 *
 * Note: appStore already syncs simple notes (Record<string, string>) via syncToCloud.
 * This service provides richer note management (titles, tags, privacy, timestamps).
 */

import { supabase, isSupabaseConfigured } from '../client';
import type { SupabaseClient } from '../client';
import type { Database } from '../types';

type NoteRow = Database['public']['Tables']['notes']['Row'];
type NoteEntityType = NoteRow['entity_type'];

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
 * Get a non-null Supabase client (for operations that don't need auth)
 */
function getClient(): SupabaseClient | null {
  if (!isSupabaseConfigured || !supabase) return null;
  return supabase;
}

/**
 * Create a new note in Supabase
 */
export async function createNoteInSupabase(
  content: string,
  options?: {
    entityType?: NoteEntityType;
    entityId?: string;
    title?: string;
    tags?: string[];
    isPrivate?: boolean;
  }
): Promise<{ data: NoteRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };

  try {
    const { data, error } = await auth.client
      .from('notes')
      .insert({
        user_id: auth.userId,
        entity_type: options?.entityType ?? 'general',
        entity_id: options?.entityId,
        title: options?.title,
        content,
        tags: options?.tags,
        is_private: options?.isPrivate ?? true,
      })
      .select()
      .single();

    return { data, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to create note' };
  }
}

/**
 * Update an existing note
 */
export async function updateNoteInSupabase(
  noteId: string,
  updates: {
    title?: string;
    content?: string;
    tags?: string[];
    isPrivate?: boolean;
  }
): Promise<{ data: NoteRow | null; error: string | null }> {
  const client = getClient();
  if (!client) return { data: null, error: 'Supabase not configured' };

  try {
    const { data, error } = await client
      .from('notes')
      .update({
        title: updates.title,
        content: updates.content,
        tags: updates.tags,
        is_private: updates.isPrivate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', noteId)
      .select()
      .single();

    return { data, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to update note' };
  }
}

/**
 * Delete a note
 */
export async function deleteNoteFromSupabase(
  noteId: string
): Promise<{ error: string | null }> {
  const client = getClient();
  if (!client) return { error: 'Supabase not configured' };

  try {
    const { error } = await client
      .from('notes')
      .delete()
      .eq('id', noteId);

    return { error: error?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to delete note' };
  }
}

/**
 * Get notes for a specific entity
 */
export async function getNotesForEntityFromSupabase(
  entityType: NoteEntityType,
  entityId: string
): Promise<{ data: NoteRow[]; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: null };

  try {
    const { data, error } = await auth.client
      .from('notes')
      .select('*')
      .eq('user_id', auth.userId)
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch notes' };
  }
}

/**
 * Get all notes for the current user
 */
export async function getAllNotesFromSupabase(
  entityType?: NoteEntityType
): Promise<{ data: NoteRow[]; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: null };

  try {
    let query = auth.client
      .from('notes')
      .select('*')
      .eq('user_id', auth.userId);

    if (entityType) {
      query = query.eq('entity_type', entityType);
    }

    const { data, error } = await query.order('updated_at', { ascending: false });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch notes' };
  }
}

/**
 * Search notes by content
 */
export async function searchNotesInSupabase(
  query: string
): Promise<{ data: NoteRow[]; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: null };

  try {
    const { data, error } = await auth.client
      .from('notes')
      .select('*')
      .eq('user_id', auth.userId)
      .or(`content.ilike.%${query}%,title.ilike.%${query}%`)
      .order('updated_at', { ascending: false });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to search notes' };
  }
}

/**
 * Get notes count
 */
export async function getNotesCount(
  entityType?: NoteEntityType
): Promise<number> {
  const auth = await getAuthClient();
  if (!auth) return 0;

  try {
    let query = auth.client
      .from('notes')
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
