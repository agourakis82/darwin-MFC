/**
 * REACT HOOKS FOR PROTOCOLOS
 * ===========================
 *
 * Custom hooks for fetching protocol data with caching
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Protocolo } from '@/lib/types/protocolo';
import {
  getProtocolos,
  getProtocoloById,
  getProtocolosByCategoria,
  searchProtocolos,
  getProtocolosByDoenca,
  getProtocolosStats,
} from '@/lib/supabase/services/protocolos';

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

/**
 * Hook for fetching all protocols
 */
export function useProtocolos() {
  const [data, setData] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = 'protocolos:all';
      const cached = getCached<Protocolo[]>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getProtocolos();
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch protocols'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for fetching a single protocol by ID
 */
export function useProtocolo(id: string | null) {
  const [data, setData] = useState<Protocolo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const cacheKey = `protocolo:${id}`;
      const cached = getCached<Protocolo>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getProtocoloById(id);
        setData(result);
        if (result) {
          setCache(cacheKey, result);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch protocol'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
}

/**
 * Hook for fetching protocols by category
 */
export function useProtocolosByCategoria(categoria: string | null) {
  const [data, setData] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categoria) {
      setData([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const cacheKey = `protocolos:categoria:${categoria}`;
      const cached = getCached<Protocolo[]>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getProtocolosByCategoria(categoria);
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch protocols by category'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoria]);

  return { data, loading, error };
}

/**
 * Hook for searching protocols with debounce
 */
export function useProtocolosSearch(query: string) {
  const [data, setData] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setData([]);
      return;
    }

    const cacheKey = `protocolos:search:${searchQuery.toLowerCase()}`;
    const cached = getCached<Protocolo[]>(cacheKey);

    if (cached) {
      setData(cached);
      return;
    }

    try {
      setLoading(true);
      const result = await searchProtocolos(searchQuery);
      setData(result);
      setCache(cacheKey, result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search protocols'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, 300); // Debounce

    return () => clearTimeout(timeoutId);
  }, [query, search]);

  return { data, loading, error };
}

/**
 * Hook for fetching protocols related to a disease
 */
export function useProtocolosByDoenca(doencaId: string | null) {
  const [data, setData] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!doencaId) {
      setData([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const cacheKey = `protocolos:doenca:${doencaId}`;
      const cached = getCached<Protocolo[]>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getProtocolosByDoenca(doencaId);
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch protocols by disease'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doencaId]);

  return { data, loading, error };
}

/**
 * Hook for fetching protocol statistics
 */
export function useProtocolosStats() {
  const [data, setData] = useState<{
    total: number;
    porCategoria: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = 'protocolos:stats';
      const cached = getCached<typeof data>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getProtocolosStats();
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch protocol stats'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
