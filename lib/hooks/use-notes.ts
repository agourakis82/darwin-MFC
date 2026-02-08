/**
 * REACT HOOKS FOR NOTES
 * ======================
 *
 * Custom hooks combining local Zustand state (appStore) with Supabase.
 * appStore provides simple notes (Record<string, string>) for offline use.
 * Supabase provides rich notes (titles, tags, privacy, timestamps).
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store/appStore';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  getAllNotesFromSupabase,
  getNotesForEntityFromSupabase,
  createNoteInSupabase,
  updateNoteInSupabase,
  deleteNoteFromSupabase,
  searchNotesInSupabase,
} from '@/lib/supabase/services/notes';
import type { Database } from '@/lib/supabase/types';

type NoteRow = Database['public']['Tables']['notes']['Row'];
type NoteEntityType = NoteRow['entity_type'];

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

function invalidateCache(prefix: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
}

/**
 * Hook for local notes from appStore.
 * Returns the simple Record<string, string> notes.
 */
export function useLocalNotes() {
  const notes = useAppStore((s) => s.notes);
  const setNote = useAppStore((s) => s.setNote);
  const removeNote = useAppStore((s) => s.removeNote);

  return {
    notes,
    setNote,
    removeNote,
    getNote: (entityId: string) => notes[entityId] ?? null,
    hasNote: (entityId: string) => entityId in notes,
    count: Object.keys(notes).length,
  };
}

/**
 * Hook for rich Supabase notes (with titles, tags, timestamps).
 * Falls back to empty state when Supabase is not configured.
 */
export function useNotes(entityType?: NoteEntityType) {
  const [data, setData] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const cacheKey = `notes:all:${entityType ?? 'all'}`;
    const cached = getCached<NoteRow[]>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getAllNotesFromSupabase(entityType);
      if (result.error) {
        setError(new Error(result.error));
      } else {
        setData(result.data);
        setCache(cacheKey, result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch notes'));
    } finally {
      setLoading(false);
    }
  }, [entityType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for notes attached to a specific entity.
 */
export function useEntityNotes(entityType: NoteEntityType, entityId: string) {
  const [data, setData] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Also get local note from appStore
  const localNote = useAppStore((s) => s.notes[entityId] ?? null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured || !entityId) {
      setLoading(false);
      return;
    }

    const cacheKey = `notes:entity:${entityType}:${entityId}`;
    const cached = getCached<NoteRow[]>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getNotesForEntityFromSupabase(entityType, entityId);
      if (result.error) {
        setError(new Error(result.error));
      } else {
        setData(result.data);
        setCache(cacheKey, result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch entity notes'));
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, localNote, loading, error, refetch: fetchData };
}

/**
 * Hook for creating notes.
 */
export function useCreateNote() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const setLocalNote = useAppStore((s) => s.setNote);

  const createNote = useCallback(
    async (
      content: string,
      options?: {
        entityType?: NoteEntityType;
        entityId?: string;
        title?: string;
        tags?: string[];
        isPrivate?: boolean;
      }
    ) => {
      // Always update local state for offline support
      if (options?.entityId) {
        setLocalNote(options.entityId, content);
      }

      // Try to save to Supabase too
      if (!isSupabaseConfigured) {
        return { data: null, error: null };
      }

      try {
        setLoading(true);
        setError(null);
        const result = await createNoteInSupabase(content, options);
        if (result.error) {
          setError(new Error(result.error));
        }
        invalidateCache('notes:');
        return result;
      } catch (err) {
        const e = err instanceof Error ? err : new Error('Failed to create note');
        setError(e);
        return { data: null, error: e.message };
      } finally {
        setLoading(false);
      }
    },
    [setLocalNote]
  );

  return { createNote, loading, error };
}

/**
 * Hook for updating notes.
 */
export function useUpdateNote() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateNote = useCallback(
    async (
      noteId: string,
      updates: {
        title?: string;
        content?: string;
        tags?: string[];
        isPrivate?: boolean;
      }
    ) => {
      if (!isSupabaseConfigured) {
        return { data: null, error: 'Supabase not configured' };
      }

      try {
        setLoading(true);
        setError(null);
        const result = await updateNoteInSupabase(noteId, updates);
        if (result.error) {
          setError(new Error(result.error));
        }
        invalidateCache('notes:');
        return result;
      } catch (err) {
        const e = err instanceof Error ? err : new Error('Failed to update note');
        setError(e);
        return { data: null, error: e.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateNote, loading, error };
}

/**
 * Hook for deleting notes.
 */
export function useDeleteNote() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const removeLocalNote = useAppStore((s) => s.removeNote);

  const deleteNote = useCallback(
    async (noteId: string, entityId?: string) => {
      // Remove from local store
      if (entityId) {
        removeLocalNote(entityId);
      }

      if (!isSupabaseConfigured) {
        return { error: null };
      }

      try {
        setLoading(true);
        setError(null);
        const result = await deleteNoteFromSupabase(noteId);
        if (result.error) {
          setError(new Error(result.error));
        }
        invalidateCache('notes:');
        return result;
      } catch (err) {
        const e = err instanceof Error ? err : new Error('Failed to delete note');
        setError(e);
        return { error: e.message };
      } finally {
        setLoading(false);
      }
    },
    [removeLocalNote]
  );

  return { deleteNote, loading, error };
}

/**
 * Hook for searching notes.
 */
export function useSearchNotes() {
  const [data, setData] = useState<NoteRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (query: string) => {
    if (!isSupabaseConfigured || !query.trim()) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await searchNotesInSupabase(query);
      if (result.error) {
        setError(new Error(result.error));
      } else {
        setData(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search notes'));
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, search };
}
