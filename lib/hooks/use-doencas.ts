/**
 * REACT HOOKS FOR DOENCAS
 * ========================
 *
 * Custom hooks for fetching disease data with caching
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Doenca } from '@/lib/types/doenca';
import {
  getDoencas,
  getDoencaById,
  getDoencasByCategoria,
  searchDoencas,
  getDoencasStats,
  getDoencasPaginated,
  getDoencasByCid10,
  getDoencasByCiap2,
} from '@/lib/supabase/services/doencas';

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
 * Hook for fetching all diseases
 */
export function useDoencas() {
  const [data, setData] = useState<Partial<Doenca>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = 'doencas:all';
      const cached = getCached<Partial<Doenca>[]>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getDoencas();
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch diseases'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for fetching a single disease by ID
 */
export function useDoenca(id: string | null) {
  const [data, setData] = useState<Partial<Doenca> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const cacheKey = `doenca:${id}`;
      const cached = getCached<Partial<Doenca>>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getDoencaById(id);
        setData(result);
        if (result) {
          setCache(cacheKey, result);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch disease'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
}

/**
 * Hook for fetching diseases by category
 */
export function useDoencasByCategoria(categoria: string | null) {
  const [data, setData] = useState<Partial<Doenca>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categoria) {
      setData([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const cacheKey = `doencas:categoria:${categoria}`;
      const cached = getCached<Partial<Doenca>[]>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getDoencasByCategoria(categoria);
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch diseases by category'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoria]);

  return { data, loading, error };
}

/**
 * Hook for searching diseases with debounce
 */
export function useDoencasSearch(query: string) {
  const [data, setData] = useState<Partial<Doenca>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setData([]);
      return;
    }

    const cacheKey = `doencas:search:${searchQuery.toLowerCase()}`;
    const cached = getCached<Partial<Doenca>[]>(cacheKey);

    if (cached) {
      setData(cached);
      return;
    }

    try {
      setLoading(true);
      const result = await searchDoencas(searchQuery);
      setData(result);
      setCache(cacheKey, result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search diseases'));
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
 * Hook for fetching diseases by CID-10 code
 */
export function useDoencasByCid10(code: string | null) {
  const [data, setData] = useState<Partial<Doenca>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!code) {
      setData([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const cacheKey = `doencas:cid10:${code}`;
      const cached = getCached<Partial<Doenca>[]>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getDoencasByCid10(code);
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch diseases by CID-10'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  return { data, loading, error };
}

/**
 * Hook for fetching disease statistics
 */
export function useDoencasStats() {
  const [data, setData] = useState<{
    total: number;
    porCategoria: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = 'doencas:stats';
      const cached = getCached<typeof data>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getDoencasStats();
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch disease stats'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for paginated diseases
 */
export function useDoencasPaginated(
  page: number = 1,
  pageSize: number = 50,
  filters?: {
    categoria?: string;
    search?: string;
  }
) {
  const [data, setData] = useState<Partial<Doenca>[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const filterKey = useMemo(() => {
    return JSON.stringify(filters || {});
  }, [filters]);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `doencas:paginated:${page}:${pageSize}:${filterKey}`;
      const cached = getCached<{
        data: Partial<Doenca>[];
        total: number;
        totalPages: number;
      }>(cacheKey);

      if (cached) {
        setData(cached.data);
        setTotal(cached.total);
        setTotalPages(cached.totalPages);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getDoencasPaginated(page, pageSize, filters);
        setData(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
        setCache(cacheKey, {
          data: result.data,
          total: result.total,
          totalPages: result.totalPages,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch paginated diseases'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, filterKey, filters]);

  return { data, total, totalPages, loading, error, page, pageSize };
}
