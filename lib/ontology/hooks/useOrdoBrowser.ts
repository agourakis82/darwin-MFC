'use client';

/**
 * DARWIN-MFC ORDO BROWSER REACT HOOKS
 * ===================================
 *
 * React hooks for interacting with the ORDO (Orphanet Rare Disease Ontology) Browser service.
 * Provides search, concept lookup, and hierarchy navigation for rare diseases.
 *
 * @example
 * ```tsx
 * function RareDiseaseSearch() {
 *   const { search, results, isLoading } = useOrdoSearch();
 *
 *   return (
 *     <input onChange={(e) => search(e.target.value)} />
 *     {isLoading && <Spinner />}
 *     {results?.results.map(r => <Disease key={r.concept.orphaCode} {...r} />)}
 *   );
 * }
 * ```
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { getOrdoBrowser } from '../services/ordo-browser';
import type {
  OrdoConcept,
  OrdoConceptMini,
  OrdoSearchParams,
  OrdoSearchResponse,
  OrdoDiseaseType,
  OrdoInheritance,
  OrdoAgeOfOnset,
} from '../types/ordo';

// =============================================================================
// TYPES
// =============================================================================

export interface UseOrdoSearchOptions {
  /** Debounce delay in milliseconds */
  debounce?: number;
  /** Minimum query length before searching */
  minLength?: number;
  /** Maximum results to return */
  limit?: number;
  /** Filter by disease type */
  diseaseType?: OrdoDiseaseType | OrdoDiseaseType[];
  /** Filter by inheritance pattern */
  inheritance?: OrdoInheritance | OrdoInheritance[];
  /** Filter by age of onset */
  ageOfOnset?: OrdoAgeOfOnset | OrdoAgeOfOnset[];
  /** Include obsolete concepts */
  includeObsolete?: boolean;
}

export interface UseOrdoSearchResult {
  /** Search function */
  search: (query: string) => void;
  /** Clear search results */
  clear: () => void;
  /** Current search query */
  query: string;
  /** Search results */
  results: OrdoSearchResponse | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
}

export interface UseOrdoConceptResult {
  /** Concept data */
  concept: OrdoConcept | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
}

export interface UseOrdoHierarchyResult {
  /** Parent concepts */
  parents: OrdoConceptMini[];
  /** Child concepts */
  children: OrdoConceptMini[];
  /** Loading states */
  isLoading: {
    parents: boolean;
    children: boolean;
  };
  /** Error state */
  error: Error | null;
  /** Fetch parents */
  fetchParents: () => void;
  /** Fetch children */
  fetchChildren: () => void;
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
 * Hook for searching ORDO concepts (rare diseases)
 *
 * @param options Search options
 * @returns Search state and functions
 *
 * @example
 * ```tsx
 * function DiseaseSearch() {
 *   const { search, results, isLoading } = useOrdoSearch({ debounce: 300 });
 *
 *   return (
 *     <>
 *       <input onChange={(e) => search(e.target.value)} />
 *       {isLoading ? (
 *         <Spinner />
 *       ) : (
 *         results?.results.map(r => (
 *           <div key={r.concept.orphaCode}>
 *             {r.concept.label}
 *           </div>
 *         ))
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useOrdoSearch(
  options: UseOrdoSearchOptions = {}
): UseOrdoSearchResult {
  const {
    debounce = 300,
    minLength = 2,
    limit = 25,
    diseaseType,
    inheritance,
    ageOfOnset,
    includeObsolete = false,
  } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<OrdoSearchResponse | null>(null);
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
        const browser = getOrdoBrowser();
        const searchParams: OrdoSearchParams = {
          query: debouncedQuery,
          limit,
          diseaseType,
          inheritance,
          ageOfOnset,
          includeObsolete,
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
  }, [debouncedQuery, minLength, limit, diseaseType, inheritance, ageOfOnset, includeObsolete]);

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
 * Hook for fetching a single ORDO concept (rare disease)
 *
 * @param orphaCode ORPHAcode
 * @returns Concept data and state
 *
 * @example
 * ```tsx
 * function DiseaseDetail({ orphaCode }: { orphaCode: string }) {
 *   const { concept, isLoading, error } = useOrdoConcept(orphaCode);
 *
 *   if (isLoading) return <Spinner />;
 *   if (error) return <Error message={error.message} />;
 *   if (!concept) return null;
 *
 *   return (
 *     <div>
 *       <h1>{concept.label}</h1>
 *       <p>{concept.definition}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useOrdoConcept(orphaCode: string | null): UseOrdoConceptResult {
  const [concept, setConcept] = useState<OrdoConcept | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchConcept = useCallback(async () => {
    if (!orphaCode) {
      setConcept(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const browser = getOrdoBrowser();
      const data = await browser.getConcept(orphaCode);
      setConcept(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch ORDO concept'));
      setConcept(null);
    } finally {
      setIsLoading(false);
    }
  }, [orphaCode]);

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
 * Hook for navigating ORDO concept hierarchy
 *
 * @param orphaCode ORPHAcode
 * @returns Hierarchy data and navigation functions
 */
export function useOrdoHierarchy(orphaCode: string | null): UseOrdoHierarchyResult {
  const [parents, setParents] = useState<OrdoConceptMini[]>([]);
  const [children, setChildren] = useState<OrdoConceptMini[]>([]);
  const [isLoading, setIsLoading] = useState({
    parents: false,
    children: false,
  });
  const [error, setError] = useState<Error | null>(null);

  const fetchParents = useCallback(async () => {
    if (!orphaCode) return;

    setIsLoading((prev) => ({ ...prev, parents: true }));
    try {
      const browser = getOrdoBrowser();
      const result = await browser.getParents(orphaCode);
      setParents(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch parents'));
    } finally {
      setIsLoading((prev) => ({ ...prev, parents: false }));
    }
  }, [orphaCode]);

  const fetchChildren = useCallback(async () => {
    if (!orphaCode) return;

    setIsLoading((prev) => ({ ...prev, children: true }));
    try {
      const browser = getOrdoBrowser();
      const result = await browser.getChildren(orphaCode);
      setChildren(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch children'));
    } finally {
      setIsLoading((prev) => ({ ...prev, children: false }));
    }
  }, [orphaCode]);

  // Reset when concept changes
  useEffect(() => {
    setParents([]);
    setChildren([]);
    setError(null);
  }, [orphaCode]);

  return {
    parents,
    children,
    isLoading,
    error,
    fetchParents,
    fetchChildren,
  };
}

/**
 * Hook for validating an ORPHAcode
 *
 * @param orphaCode ORPHAcode to validate
 * @returns Validation result
 */
export function useOrdoValidation(orphaCode: string | null) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const validate = useCallback(async () => {
    if (!orphaCode) {
      setIsValid(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const browser = getOrdoBrowser();
      const valid = await browser.validateCode(orphaCode);
      setIsValid(valid);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to validate ORPHAcode'));
      setIsValid(null);
    } finally {
      setIsLoading(false);
    }
  }, [orphaCode]);

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
  useOrdoSearch,
  useOrdoConcept,
  useOrdoHierarchy,
  useOrdoValidation,
};
