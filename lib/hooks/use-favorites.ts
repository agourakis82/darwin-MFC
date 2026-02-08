/**
 * REACT HOOKS FOR FAVORITES
 * ==========================
 *
 * Custom hooks combining local Zustand state (appStore) with Supabase.
 * Local state (appStore) is the primary source of truth for offline-first.
 * Supabase provides persistence and richer metadata when authenticated.
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppStore } from '@/lib/store/appStore';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  getFavoritesFromSupabase,
  addFavoriteToSupabase,
  removeFavoriteFromSupabase,
} from '@/lib/supabase/services/favorites';
import type { Database } from '@/lib/supabase/types';

type FavoriteRow = Database['public']['Tables']['favorites']['Row'];
type FavoriteEntityType = FavoriteRow['entity_type'];

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
 * Hook for managing favorites with local + Supabase sync.
 * Uses appStore as the primary state, optionally enriched with Supabase metadata.
 */
export function useFavorites(entityType?: FavoriteEntityType) {
  const favorites = useAppStore((s) => s.favorites);
  const favoritosDoencas = useAppStore((s) => s.favoritosDoencas);
  const favoritosMedicamentos = useAppStore((s) => s.favoritosMedicamentos);
  const favoritosProtocolos = useAppStore((s) => s.favoritosProtocolos);

  // Return the appropriate local favorites based on entity type
  const localFavorites = useMemo(() => {
    if (!entityType) {
      return [
        ...favorites.map((id) => ({ entityType: 'screening' as const, entityId: id })),
        ...favoritosDoencas.map((id) => ({ entityType: 'disease' as const, entityId: id })),
        ...favoritosMedicamentos.map((id) => ({ entityType: 'medication' as const, entityId: id })),
        ...favoritosProtocolos.map((id) => ({ entityType: 'protocol' as const, entityId: id })),
      ];
    }

    switch (entityType) {
      case 'disease':
        return favoritosDoencas.map((id) => ({ entityType: 'disease' as const, entityId: id }));
      case 'medication':
        return favoritosMedicamentos.map((id) => ({ entityType: 'medication' as const, entityId: id }));
      case 'protocol':
        return favoritosProtocolos.map((id) => ({ entityType: 'protocol' as const, entityId: id }));
      default:
        return favorites.map((id) => ({ entityType: entityType ?? ('screening' as const), entityId: id }));
    }
  }, [entityType, favorites, favoritosDoencas, favoritosMedicamentos, favoritosProtocolos]);

  return {
    data: localFavorites,
    count: localFavorites.length,
  };
}

/**
 * Hook for rich Supabase favorites data (includes metadata, tags, timestamps).
 * Only fetches from Supabase when configured and authenticated.
 */
export function useSupabaseFavorites(entityType?: FavoriteEntityType) {
  const [data, setData] = useState<FavoriteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const cacheKey = `favorites:supabase:${entityType ?? 'all'}`;
    const cached = getCached<FavoriteRow[]>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getFavoritesFromSupabase(entityType);
      if (result.error) {
        setError(new Error(result.error));
      } else {
        setData(result.data);
        setCache(cacheKey, result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch favorites'));
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
 * Hook for checking if an entity is favorited.
 * Uses local appStore state for instant response.
 */
export function useIsFavorite(entityType: string, entityId: string): boolean {
  const favorites = useAppStore((s) => s.favorites);
  const favoritosDoencas = useAppStore((s) => s.favoritosDoencas);
  const favoritosMedicamentos = useAppStore((s) => s.favoritosMedicamentos);
  const favoritosProtocolos = useAppStore((s) => s.favoritosProtocolos);

  return useMemo(() => {
    switch (entityType) {
      case 'disease':
        return favoritosDoencas.includes(entityId);
      case 'medication':
        return favoritosMedicamentos.includes(entityId);
      case 'protocol':
        return favoritosProtocolos.includes(entityId);
      default:
        return favorites.includes(entityId);
    }
  }, [entityType, entityId, favorites, favoritosDoencas, favoritosMedicamentos, favoritosProtocolos]);
}

/**
 * Hook that returns a toggle function for favorites.
 * Updates local state immediately and syncs to Supabase in background.
 */
export function useToggleFavorite() {
  const addFavorite = useAppStore((s) => s.addFavorite);
  const removeFavorite = useAppStore((s) => s.removeFavorite);
  const addFavoritoDoenca = useAppStore((s) => s.addFavoritoDoenca);
  const removeFavoritoDoenca = useAppStore((s) => s.removeFavoritoDoenca);
  const addFavoritoMedicamento = useAppStore((s) => s.addFavoritoMedicamento);
  const removeFavoritoMedicamento = useAppStore((s) => s.removeFavoritoMedicamento);
  const addFavoritoProtocolo = useAppStore((s) => s.addFavoritoProtocolo);
  const removeFavoritoProtocolo = useAppStore((s) => s.removeFavoritoProtocolo);
  const favorites = useAppStore((s) => s.favorites);
  const favoritosDoencas = useAppStore((s) => s.favoritosDoencas);
  const favoritosMedicamentos = useAppStore((s) => s.favoritosMedicamentos);
  const favoritosProtocolos = useAppStore((s) => s.favoritosProtocolos);

  const toggle = useCallback(
    async (entityType: string, entityId: string) => {
      let isFav = false;

      // Check current state
      switch (entityType) {
        case 'disease':
          isFav = favoritosDoencas.includes(entityId);
          break;
        case 'medication':
          isFav = favoritosMedicamentos.includes(entityId);
          break;
        case 'protocol':
          isFav = favoritosProtocolos.includes(entityId);
          break;
        default:
          isFav = favorites.includes(entityId);
          break;
      }

      // Update local state immediately (appStore handles cloud sync via triggerCloudSync)
      if (isFav) {
        switch (entityType) {
          case 'disease':
            removeFavoritoDoenca(entityId);
            break;
          case 'medication':
            removeFavoritoMedicamento(entityId);
            break;
          case 'protocol':
            removeFavoritoProtocolo(entityId);
            break;
          default:
            removeFavorite(entityId);
            break;
        }
      } else {
        switch (entityType) {
          case 'disease':
            addFavoritoDoenca(entityId);
            break;
          case 'medication':
            addFavoritoMedicamento(entityId);
            break;
          case 'protocol':
            addFavoritoProtocolo(entityId);
            break;
          default:
            addFavorite(entityId);
            break;
        }
      }

      // Invalidate Supabase cache
      invalidateCache('favorites:');

      return !isFav; // Return new favorite state
    },
    [
      favorites,
      favoritosDoencas,
      favoritosMedicamentos,
      favoritosProtocolos,
      addFavorite,
      removeFavorite,
      addFavoritoDoenca,
      removeFavoritoDoenca,
      addFavoritoMedicamento,
      removeFavoritoMedicamento,
      addFavoritoProtocolo,
      removeFavoritoProtocolo,
    ]
  );

  return toggle;
}
