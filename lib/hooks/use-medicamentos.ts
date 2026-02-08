/**
 * REACT HOOKS FOR MEDICAMENTOS
 * ==============================
 *
 * Custom hooks for fetching medication data with caching
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Medicamento } from '@/lib/types/medicamento';
import {
  getMedicamentos,
  getMedicamentoById,
  getMedicamentosByClasse,
  searchMedicamentos,
  getMedicamentosSUS,
  getMedicamentoStats,
  getMedicamentosPaginated,
} from '@/lib/supabase/services/medicamentos';

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
 * Hook for fetching all medications
 */
export function useMedicamentos() {
  const [data, setData] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = 'medicamentos:all';
      const cached = getCached<Medicamento[]>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getMedicamentos();
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch medications'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for fetching a single medication by ID
 */
export function useMedicamento(id: string | null) {
  const [data, setData] = useState<Medicamento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const cacheKey = `medicamento:${id}`;
      const cached = getCached<Medicamento>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getMedicamentoById(id);
        setData(result);
        if (result) {
          setCache(cacheKey, result);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch medication'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
}

/**
 * Hook for fetching medications by class
 */
export function useMedicamentosByClasse(classe: string | null) {
  const [data, setData] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!classe) {
      setData([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const cacheKey = `medicamentos:classe:${classe}`;
      const cached = getCached<Medicamento[]>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getMedicamentosByClasse(classe);
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch medications by class'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classe]);

  return { data, loading, error };
}

/**
 * Hook for searching medications
 */
export function useMedicamentosSearch(query: string) {
  const [data, setData] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setData([]);
      return;
    }

    const cacheKey = `medicamentos:search:${searchQuery.toLowerCase()}`;
    const cached = getCached<Medicamento[]>(cacheKey);

    if (cached) {
      setData(cached);
      return;
    }

    try {
      setLoading(true);
      const result = await searchMedicamentos(searchQuery);
      setData(result);
      setCache(cacheKey, result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search medications'));
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
 * Hook for fetching SUS medications
 */
export function useMedicamentosSUS() {
  const [data, setData] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = 'medicamentos:sus';
      const cached = getCached<Medicamento[]>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getMedicamentosSUS();
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch SUS medications'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for fetching medication statistics
 */
export function useMedicamentoStats() {
  const [data, setData] = useState<{
    total: number;
    rename: number;
    disponivelSUS: number;
    byClasse: Record<string, number>;
    percentRENAME: number;
    percentSUS: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = 'medicamentos:stats';
      const cached = getCached<typeof data>(cacheKey);

      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getMedicamentoStats();
        setData(result);
        setCache(cacheKey, result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch medication stats'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook for paginated medications
 */
export function useMedicamentosPaginated(
  page: number = 1,
  pageSize: number = 50,
  filters?: {
    classe?: string;
    disponivelSUS?: boolean;
    search?: string;
  }
) {
  const [data, setData] = useState<Medicamento[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const filterKey = useMemo(() => {
    return JSON.stringify(filters || {});
  }, [filters]);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `medicamentos:paginated:${page}:${pageSize}:${filterKey}`;
      const cached = getCached<{
        data: Medicamento[];
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
        const result = await getMedicamentosPaginated(page, pageSize, filters);
        setData(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
        setCache(cacheKey, {
          data: result.data,
          total: result.total,
          totalPages: result.totalPages,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch paginated medications'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, filterKey, filters]);

  return { data, total, totalPages, loading, error, page, pageSize };
}
