'use client';

/**
 * DARWIN-MFC LOINC BROWSER REACT HOOKS
 * ====================================
 *
 * React hooks for interacting with the LOINC Browser service.
 * Provides search, concept lookup, and panel navigation
 * with built-in caching, error handling, and loading states.
 *
 * @example
 * ```tsx
 * function LabCodeSearch() {
 *   const { search, results, isLoading } = useLoincSearch();
 *
 *   return (
 *     <input onChange={(e) => search(e.target.value)} />
 *     {isLoading && <Spinner />}
 *     {results?.results.map(r => <LabCode key={r.concept.loincNum} {...r} />)}
 *   );
 * }
 * ```
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { getLoincBrowser } from '../services/loinc-browser';
import type {
  LoincConcept,
  LoincConceptMini,
  LoincSearchParams,
  LoincSearchResponse,
  LoincPanelMember,
  LoincClass,
} from '../types/loinc';

// =============================================================================
// TYPES
// =============================================================================

export interface UseLoincSearchOptions {
  /** Debounce delay in milliseconds */
  debounce?: number;
  /** Minimum query length before searching */
  minLength?: number;
  /** Maximum results to return */
  limit?: number;
  /** Filter by class */
  class?: LoincClass | LoincClass[];
  /** Include deprecated codes */
  includeDeprecated?: boolean;
}

export interface UseLoincSearchResult {
  /** Search function */
  search: (query: string) => void;
  /** Clear search results */
  clear: () => void;
  /** Current search query */
  query: string;
  /** Search results */
  results: LoincSearchResponse | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
}

export interface UseLoincConceptResult {
  /** Concept data */
  concept: LoincConcept | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
}

export interface UseLoincPanelResult {
  /** Panel members */
  members: LoincPanelMember[];
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
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
 * Hook for searching LOINC codes
 *
 * @param options Search options
 * @returns Search state and functions
 *
 * @example
 * ```tsx
 * function LabSearch() {
 *   const { search, results, isLoading } = useLoincSearch({ debounce: 300 });
 *
 *   return (
 *     <>
 *       <input onChange={(e) => search(e.target.value)} />
 *       {isLoading ? (
 *         <Spinner />
 *       ) : (
 *         results?.results.map(r => (
 *           <div key={r.concept.loincNum}>
 *             {r.concept.longCommonName}
 *           </div>
 *         ))
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useLoincSearch(
  options: UseLoincSearchOptions = {}
): UseLoincSearchResult {
  const {
    debounce = 300,
    minLength = 2,
    limit = 25,
    class: loincClass,
    includeDeprecated = false,
  } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LoincSearchResponse | null>(null);
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
        const browser = getLoincBrowser();
        const searchParams: LoincSearchParams = {
          query: debouncedQuery,
          limit,
          class: loincClass,
          status: includeDeprecated ? undefined : ['ACTIVE'],
        };
        const response = await browser.search(searchParams);
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
  }, [debouncedQuery, minLength, limit, loincClass, includeDeprecated]);

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
 * Hook for fetching a single LOINC concept
 *
 * @param loincNum LOINC code
 * @returns Concept data and state
 *
 * @example
 * ```tsx
 * function LabDetail({ loincNum }: { loincNum: string }) {
 *   const { concept, isLoading, error } = useLoincConcept(loincNum);
 *
 *   if (isLoading) return <Spinner />;
 *   if (error) return <Error message={error.message} />;
 *   if (!concept) return null;
 *
 *   return (
 *     <div>
 *       <h1>{concept.longCommonName}</h1>
 *       <p>{concept.component}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLoincConcept(loincNum: string | null): UseLoincConceptResult {
  const [concept, setConcept] = useState<LoincConcept | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchConcept = useCallback(async () => {
    if (!loincNum) {
      setConcept(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const browser = getLoincBrowser();
      const data = await browser.getConcept(loincNum);
      setConcept(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch LOINC concept'));
      setConcept(null);
    } finally {
      setIsLoading(false);
    }
  }, [loincNum]);

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
 * Hook for fetching LOINC panel members
 *
 * @param panelLoincNum LOINC panel code
 * @returns Panel members and state
 *
 * @example
 * ```tsx
 * function PanelDetail({ panelCode }: { panelCode: string }) {
 *   const { members, isLoading } = useLoincPanel(panelCode);
 *
 *   if (isLoading) return <Spinner />;
 *
 *   return (
 *     <ul>
 *       {members.map(m => (
 *         <li key={m.loincNum}>{m.longCommonName}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useLoincPanel(panelLoincNum: string | null): UseLoincPanelResult {
  const [members, setMembers] = useState<LoincPanelMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPanel = useCallback(async () => {
    if (!panelLoincNum) {
      setMembers([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const browser = getLoincBrowser();
      const data = await browser.getPanelMembers(panelLoincNum);
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch panel members'));
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  }, [panelLoincNum]);

  useEffect(() => {
    fetchPanel();
  }, [fetchPanel]);

  return {
    members,
    isLoading,
    error,
    refetch: fetchPanel,
  };
}

/**
 * Hook for fetching LOINC codes by class
 *
 * @param loincClass LOINC class
 * @param limit Maximum results
 * @returns Concepts in the class
 */
export function useLoincByClass(loincClass: LoincClass | null, limit = 50) {
  const [concepts, setConcepts] = useState<LoincConceptMini[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!loincClass) {
      setConcepts([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const browser = getLoincBrowser();
      const data = await browser.getByClass(loincClass, limit);
      setConcepts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch codes by class'));
      setConcepts([]);
    } finally {
      setIsLoading(false);
    }
  }, [loincClass, limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    concepts,
    isLoading,
    error,
    refetch: fetch,
  };
}

/**
 * Hook for validating a LOINC code
 *
 * @param loincNum LOINC code to validate
 * @returns Validation result
 */
export function useLoincValidation(loincNum: string | null) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const validate = useCallback(async () => {
    if (!loincNum) {
      setIsValid(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const browser = getLoincBrowser();
      const valid = await browser.validateCode(loincNum);
      setIsValid(valid);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to validate LOINC code'));
      setIsValid(null);
    } finally {
      setIsLoading(false);
    }
  }, [loincNum]);

  useEffect(() => {
    validate();
  }, [validate]);

  return {
    isValid,
    isLoading,
    error,
    revalidate: validate,
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  useLoincSearch,
  useLoincConcept,
  useLoincPanel,
  useLoincByClass,
  useLoincValidation,
};
