'use client';

/**
 * DARWIN-MFC SNOMED BROWSER REACT HOOK
 * =====================================
 *
 * React hooks for interacting with the SNOMED-CT Browser API.
 * Provides search, concept lookup, and hierarchy navigation
 * with built-in caching, error handling, and loading states.
 *
 * @example
 * ```tsx
 * function ConceptSearch() {
 *   const { search, results, isLoading } = useSnomedSearch();
 *
 *   return (
 *     <input onChange={(e) => search(e.target.value)} />
 *     {isLoading && <Spinner />}
 *     {results.map(r => <Concept key={r.conceptId} {...r} />)}
 *   );
 * }
 * ```
 */

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  SnomedBrowserService,
  snomedBrowser,
  SnomedApiError,
  getSnomedConcept,
} from '../services/snomed-browser';
import type {
  SnomedConceptSimple,
  SnomedConceptFull,
  SnomedSearchResponse,
  SnomedHierarchyResult,
} from '../types/snomed-ct';

// Type alias for simpler usage
type SnomedConcept = SnomedConceptSimple;
import type { ExpansionResult } from '../types/ontology';

// =============================================================================
// TYPES
// =============================================================================

export interface UseSnomedSearchOptions {
  /** Debounce delay in milliseconds */
  debounce?: number;
  /** Minimum query length before searching */
  minLength?: number;
  /** Maximum results to return */
  limit?: number;
  /** Only search active concepts */
  activeOnly?: boolean;
  /** Language for results */
  language?: string;
}

export interface UseSnomedSearchResult {
  /** Search function */
  search: (query: string) => void;
  /** Clear search results */
  clear: () => void;
  /** Current search query */
  query: string;
  /** Search results */
  results: SnomedSearchResponse | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
}

export interface UseSnomedConceptResult {
  /** Concept data */
  concept: SnomedConceptFull | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
}

export interface UseSnomedHierarchyResult {
  /** Ancestors of the concept */
  ancestors: SnomedHierarchyResult | null;
  /** Descendants of the concept */
  descendants: SnomedHierarchyResult | null;
  /** Parent concepts (direct) */
  parents: SnomedConcept[];
  /** Child concepts (direct) */
  children: SnomedConcept[];
  /** Loading states */
  isLoading: {
    ancestors: boolean;
    descendants: boolean;
    parents: boolean;
    children: boolean;
  };
  /** Error state */
  error: Error | null;
  /** Fetch ancestors */
  fetchAncestors: () => void;
  /** Fetch descendants */
  fetchDescendants: () => void;
  /** Fetch parents */
  fetchParents: () => void;
  /** Fetch children */
  fetchChildren: () => void;
}

export interface UseSnomedECLResult {
  /** Execute ECL query */
  execute: (ecl: string, term?: string) => void;
  /** Query results */
  results: SnomedSearchResponse | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Clear results */
  clear: () => void;
}

// =============================================================================
// UTILITY HOOKS
// =============================================================================

/**
 * Debounce a value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// =============================================================================
// MAIN HOOKS
// =============================================================================

/**
 * Hook for searching SNOMED concepts
 *
 * @param options Search options
 * @returns Search state and functions
 *
 * @example
 * ```tsx
 * function Search() {
 *   const { search, results, isLoading } = useSnomedSearch({ debounce: 300 });
 *
 *   return (
 *     <>
 *       <input onChange={(e) => search(e.target.value)} />
 *       {isLoading ? (
 *         <Spinner />
 *       ) : (
 *         results?.items.map(item => (
 *           <div key={item.concept.conceptId}>
 *             {item.concept.pt}
 *           </div>
 *         ))
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useSnomedSearch(
  options: UseSnomedSearchOptions = {}
): UseSnomedSearchResult {
  const {
    debounce = 300,
    minLength = 2,
    limit = 25,
    activeOnly = true,
    language = 'en',
  } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SnomedSearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedQuery = useDebounce(query, debounce);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Perform search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < minLength) {
      setResults(null);
      setError(null);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const performSearch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await snomedBrowser.search({
          term: debouncedQuery,
          limit,
          activeOnly,
          language,
        });
        setResults(response);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedQuery, minLength, limit, activeOnly, language]);

  const search = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
    setResults(null);
    setError(null);
  }, []);

  return {
    search,
    clear,
    query,
    results,
    isLoading,
    error,
  };
}

/**
 * Hook for fetching a single SNOMED concept
 *
 * @param conceptId SNOMED CT concept ID
 * @returns Concept data and state
 *
 * @example
 * ```tsx
 * function ConceptDetail({ conceptId }: { conceptId: string }) {
 *   const { concept, isLoading, error } = useSnomedConcept(conceptId);
 *
 *   if (isLoading) return <Spinner />;
 *   if (error) return <Error message={error.message} />;
 *   if (!concept) return null;
 *
 *   return (
 *     <div>
 *       <h1>{concept.pt}</h1>
 *       <p>{concept.fsn}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useSnomedConcept(conceptId: string | null): UseSnomedConceptResult {
  const [concept, setConcept] = useState<SnomedConceptFull | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchConcept = useCallback(async () => {
    if (!conceptId) {
      setConcept(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getSnomedConcept(conceptId);
      setConcept(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch concept'));
      setConcept(null);
    } finally {
      setIsLoading(false);
    }
  }, [conceptId]);

  useEffect(() => {
    fetchConcept();
  }, [fetchConcept]);

  return {
    concept,
    isLoading,
    error,
    refetch: fetchConcept,
  };
}

/**
 * Hook for navigating SNOMED concept hierarchy
 *
 * @param conceptId SNOMED CT concept ID
 * @returns Hierarchy data and navigation functions
 *
 * @example
 * ```tsx
 * function ConceptHierarchy({ conceptId }: { conceptId: string }) {
 *   const {
 *     parents,
 *     children,
 *     fetchParents,
 *     fetchChildren,
 *     isLoading
 *   } = useSnomedHierarchy(conceptId);
 *
 *   useEffect(() => {
 *     fetchParents();
 *     fetchChildren();
 *   }, []);
 *
 *   return (
 *     <div>
 *       <h3>Parents</h3>
 *       {parents.map(p => <div key={p.conceptId}>{p.pt}</div>)}
 *       <h3>Children</h3>
 *       {children.map(c => <div key={c.conceptId}>{c.pt}</div>)}
 *     </div>
 *   );
 * }
 * ```
 */
export function useSnomedHierarchy(conceptId: string | null): UseSnomedHierarchyResult {
  const [ancestors, setAncestors] = useState<SnomedHierarchyResult | null>(null);
  const [descendants, setDescendants] = useState<SnomedHierarchyResult | null>(null);
  const [parents, setParents] = useState<SnomedConcept[]>([]);
  const [children, setChildren] = useState<SnomedConcept[]>([]);
  const [isLoading, setIsLoading] = useState({
    ancestors: false,
    descendants: false,
    parents: false,
    children: false,
  });
  const [error, setError] = useState<Error | null>(null);

  const fetchAncestors = useCallback(async () => {
    if (!conceptId) return;

    setIsLoading((prev) => ({ ...prev, ancestors: true }));
    try {
      const result = await snomedBrowser.getAncestors({ conceptId });
      setAncestors(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch ancestors'));
    } finally {
      setIsLoading((prev) => ({ ...prev, ancestors: false }));
    }
  }, [conceptId]);

  const fetchDescendants = useCallback(async () => {
    if (!conceptId) return;

    setIsLoading((prev) => ({ ...prev, descendants: true }));
    try {
      const result = await snomedBrowser.getDescendants({ conceptId });
      setDescendants(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch descendants'));
    } finally {
      setIsLoading((prev) => ({ ...prev, descendants: false }));
    }
  }, [conceptId]);

  const fetchParents = useCallback(async () => {
    if (!conceptId) return;

    setIsLoading((prev) => ({ ...prev, parents: true }));
    try {
      const result = await snomedBrowser.getParents(conceptId);
      setParents(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch parents'));
    } finally {
      setIsLoading((prev) => ({ ...prev, parents: false }));
    }
  }, [conceptId]);

  const fetchChildren = useCallback(async () => {
    if (!conceptId) return;

    setIsLoading((prev) => ({ ...prev, children: true }));
    try {
      const result = await snomedBrowser.getChildren(conceptId);
      setChildren(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch children'));
    } finally {
      setIsLoading((prev) => ({ ...prev, children: false }));
    }
  }, [conceptId]);

  // Reset when concept changes
  useEffect(() => {
    setAncestors(null);
    setDescendants(null);
    setParents([]);
    setChildren([]);
    setError(null);
  }, [conceptId]);

  return {
    ancestors,
    descendants,
    parents,
    children,
    isLoading,
    error,
    fetchAncestors,
    fetchDescendants,
    fetchParents,
    fetchChildren,
  };
}

/**
 * Hook for executing ECL (Expression Constraint Language) queries
 *
 * @returns ECL query state and functions
 *
 * @example
 * ```tsx
 * function ECLSearch() {
 *   const { execute, results, isLoading } = useSnomedECL();
 *
 *   return (
 *     <>
 *       <button onClick={() => execute('<<73211009')}>
 *         Search Diabetes Disorders
 *       </button>
 *       {results?.items.map(item => (
 *         <div key={item.concept.conceptId}>
 *           {item.concept.pt}
 *         </div>
 *       ))}
 *     </>
 *   );
 * }
 * ```
 */
export function useSnomedECL(): UseSnomedECLResult {
  const [results, setResults] = useState<SnomedSearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (ecl: string, term?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await snomedBrowser.searchByECL({
        ecl,
        term,
        limit: 100,
      });
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('ECL query failed'));
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return {
    execute,
    results,
    isLoading,
    error,
    clear,
  };
}

/**
 * Hook for semantic expansion of a concept
 *
 * @param conceptId SNOMED CT concept ID
 * @returns Expanded concept set
 *
 * @example
 * ```tsx
 * function RelatedConcepts({ conceptId }: { conceptId: string }) {
 *   const { expansion, isLoading, expand } = useSnomedExpansion(conceptId);
 *
 *   useEffect(() => {
 *     expand({ direction: 'both', maxDepth: 2 });
 *   }, [expand]);
 *
 *   return (
 *     <div>
 *       {expansion?.expanded.map(item => (
 *         <div key={item.concept.id}>
 *           {item.concept.preferredTerm} (distance: {item.distance})
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useSnomedExpansion(conceptId: string | null) {
  const [expansion, setExpansion] = useState<ExpansionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const expand = useCallback(
    async (options?: { direction?: 'up' | 'down' | 'both'; maxDepth?: number }) => {
      if (!conceptId) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await snomedBrowser.expandConcept(conceptId, options);
        setExpansion(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Expansion failed'));
        setExpansion(null);
      } finally {
        setIsLoading(false);
      }
    },
    [conceptId]
  );

  // Reset when concept changes
  useEffect(() => {
    setExpansion(null);
    setError(null);
  }, [conceptId]);

  return {
    expansion,
    isLoading,
    error,
    expand,
  };
}

/**
 * Hook for finding similar concepts
 *
 * @param conceptId SNOMED CT concept ID
 * @returns Similar concepts
 */
export function useSnomedSimilar(conceptId: string | null, limit = 10) {
  const [similar, setSimilar] = useState<SnomedConcept[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!conceptId) {
      setSimilar([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await snomedBrowser.findSimilarConcepts(conceptId, limit);
      setSimilar(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to find similar concepts'));
      setSimilar([]);
    } finally {
      setIsLoading(false);
    }
  }, [conceptId, limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    similar,
    isLoading,
    error,
    refetch: fetch,
  };
}

/**
 * Hook for checking SNOMED API availability
 *
 * @returns API health status
 */
export function useSnomedHealth() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const check = useCallback(async () => {
    try {
      const healthy = await snomedBrowser.healthCheck();
      setIsHealthy(healthy);
      setLastChecked(new Date());
    } catch {
      setIsHealthy(false);
      setLastChecked(new Date());
    }
  }, []);

  useEffect(() => {
    check();
    // Re-check every 5 minutes
    const interval = setInterval(check, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [check]);

  return {
    isHealthy,
    lastChecked,
    check,
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  useSnomedSearch,
  useSnomedConcept,
  useSnomedHierarchy,
  useSnomedECL,
  useSnomedExpansion,
  useSnomedSimilar,
  useSnomedHealth,
};
