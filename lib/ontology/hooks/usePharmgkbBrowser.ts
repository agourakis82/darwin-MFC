/**
 * PHARMGKB REACT HOOKS
 * ====================
 *
 * React hooks for PharmGKB pharmacogenomics data.
 * Provides search, gene details, drug interactions, and dosing guidelines.
 */

'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { getPharmgkbBrowser } from '../services/pharmgkb-browser';
import type {
  PharmacogeneMini,
  Pharmacogene,
  GeneDrugPair,
  DosingGuideline,
  PhenotypeGuidance,
  StarAllele,
  PharmgkbSearchResponse,
  DrugInteractionResult,
  MetabolizerPhenotype,
  CpicLevel,
} from '../types/pharmgkb';

// =============================================================================
// SEARCH HOOK
// =============================================================================

export interface UsePharmgkbSearchOptions {
  /** Debounce delay in ms */
  debounce?: number;

  /** Minimum query length */
  minLength?: number;

  /** Maximum results */
  limit?: number;

  /** Filter by CPIC level */
  cpicLevel?: CpicLevel | CpicLevel[];

  /** Only genes with guidelines */
  hasGuideline?: boolean;
}

export interface UsePharmgkbSearchResult {
  /** Trigger search */
  search: (query: string) => void;

  /** Search results */
  results: PharmgkbSearchResponse | null;

  /** Loading state */
  isLoading: boolean;

  /** Error message */
  error: string | null;

  /** Current query */
  query: string;

  /** Clear results */
  clear: () => void;
}

/**
 * Hook for searching pharmacogenes
 */
export function usePharmgkbSearch(options: UsePharmgkbSearchOptions = {}): UsePharmgkbSearchResult {
  const {
    debounce = 300,
    minLength = 2,
    limit = 20,
    cpicLevel,
    hasGuideline,
  } = options;

  const [results, setResults] = useState<PharmgkbSearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const browserRef = useRef(getPharmgkbBrowser());

  const search = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Clear results for short queries
      if (!newQuery || newQuery.length < minLength) {
        setResults(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      // Debounce search
      timeoutRef.current = setTimeout(async () => {
        try {
          const response = await browserRef.current.search({
            query: newQuery,
            limit,
            cpicLevel,
            hasGuideline,
          });
          setResults(response);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Search failed');
          setResults(null);
        } finally {
          setIsLoading(false);
        }
      }, debounce);
    },
    [debounce, minLength, limit, cpicLevel, hasGuideline]
  );

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setQuery('');
    setResults(null);
    setError(null);
    setIsLoading(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    search,
    results,
    isLoading,
    error,
    query,
    clear,
  };
}

// =============================================================================
// GENE DETAILS HOOK
// =============================================================================

export interface UsePharmgkbGeneResult {
  /** Gene details */
  gene: Pharmacogene | null;

  /** Star alleles for the gene */
  starAlleles: StarAllele[];

  /** Gene-drug pairs */
  drugPairs: GeneDrugPair[];

  /** Dosing guidelines */
  guidelines: DosingGuideline[];

  /** Loading state */
  isLoading: boolean;

  /** Error message */
  error: string | null;

  /** Refresh data */
  refresh: () => void;
}

/**
 * Hook for fetching pharmacogene details
 */
export function usePharmgkbGene(geneSymbol: string | null): UsePharmgkbGeneResult {
  const [gene, setGene] = useState<Pharmacogene | null>(null);
  const [starAlleles, setStarAlleles] = useState<StarAllele[]>([]);
  const [drugPairs, setDrugPairs] = useState<GeneDrugPair[]>([]);
  const [guidelines, setGuidelines] = useState<DosingGuideline[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const browserRef = useRef(getPharmgkbBrowser());

  const fetchData = useCallback(async () => {
    if (!geneSymbol) {
      setGene(null);
      setStarAlleles([]);
      setDrugPairs([]);
      setGuidelines([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [geneData, alleles, pairs, guidelineData] = await Promise.all([
        browserRef.current.getGene(geneSymbol),
        browserRef.current.getStarAlleles(geneSymbol),
        browserRef.current.getGeneDrugPairs(geneSymbol),
        browserRef.current.getGeneGuidelines(geneSymbol),
      ]);

      setGene(geneData);
      setStarAlleles(alleles);
      setDrugPairs(pairs);
      setGuidelines(guidelineData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gene data');
    } finally {
      setIsLoading(false);
    }
  }, [geneSymbol]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    gene,
    starAlleles,
    drugPairs,
    guidelines,
    isLoading,
    error,
    refresh: fetchData,
  };
}

// =============================================================================
// DRUG INTERACTIONS HOOK
// =============================================================================

export interface UseDrugInteractionsResult {
  /** Drug interaction data */
  interactions: DrugInteractionResult | null;

  /** Loading state */
  isLoading: boolean;

  /** Error message */
  error: string | null;

  /** Search for drug */
  searchDrug: (drugName: string) => void;

  /** Clear results */
  clear: () => void;
}

/**
 * Hook for searching drug-gene interactions
 */
export function useDrugInteractions(): UseDrugInteractionsResult {
  const [interactions, setInteractions] = useState<DrugInteractionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const browserRef = useRef(getPharmgkbBrowser());

  const searchDrug = useCallback(async (drugName: string) => {
    if (!drugName || drugName.length < 2) {
      setInteractions(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await browserRef.current.searchDrugInteractions(drugName);
      setInteractions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search drug interactions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setInteractions(null);
    setError(null);
  }, []);

  return {
    interactions,
    isLoading,
    error,
    searchDrug,
    clear,
  };
}

// =============================================================================
// DOSING RECOMMENDATION HOOK
// =============================================================================

export interface UseDosingRecommendationResult {
  /** Dosing guideline */
  guideline: DosingGuideline | null;

  /** Specific phenotype recommendation */
  recommendation: PhenotypeGuidance | null;

  /** Loading state */
  isLoading: boolean;

  /** Error message */
  error: string | null;
}

/**
 * Hook for fetching dosing recommendations
 */
export function useDosingRecommendation(
  geneSymbol: string | null,
  drugName: string | null,
  phenotype?: MetabolizerPhenotype
): UseDosingRecommendationResult {
  const [guideline, setGuideline] = useState<DosingGuideline | null>(null);
  const [recommendation, setRecommendation] = useState<PhenotypeGuidance | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const browserRef = useRef(getPharmgkbBrowser());

  useEffect(() => {
    if (!geneSymbol || !drugName) {
      setGuideline(null);
      setRecommendation(null);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const guidelineData = await browserRef.current.getDosingGuideline(geneSymbol, drugName);
        setGuideline(guidelineData);

        if (guidelineData && phenotype) {
          const rec = guidelineData.phenotypeGuidance.find(g => g.phenotype === phenotype);
          setRecommendation(rec || null);
        } else {
          setRecommendation(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dosing recommendation');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [geneSymbol, drugName, phenotype]);

  return {
    guideline,
    recommendation,
    isLoading,
    error,
  };
}

// =============================================================================
// GENE VALIDATION HOOK
// =============================================================================

export interface UseGeneValidationResult {
  /** Is gene valid */
  isValid: boolean | null;

  /** Validation in progress */
  isValidating: boolean;

  /** Error message */
  error: string | null;
}

/**
 * Hook for validating gene symbol
 */
export function useGeneValidation(geneSymbol: string | null): UseGeneValidationResult {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const browserRef = useRef(getPharmgkbBrowser());

  useEffect(() => {
    if (!geneSymbol) {
      setIsValid(null);
      return;
    }

    const validate = async () => {
      setIsValidating(true);
      setError(null);

      try {
        const valid = await browserRef.current.validateGene(geneSymbol);
        setIsValid(valid);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Validation failed');
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validate();
  }, [geneSymbol]);

  return {
    isValid,
    isValidating,
    error,
  };
}

// =============================================================================
// ALL GENES HOOK
// =============================================================================

export interface UseAllPharmacogenesResult {
  /** All pharmacogenes */
  genes: PharmacogeneMini[];

  /** Genes filtered by CPIC level */
  genesByLevel: (level: CpicLevel) => PharmacogeneMini[];

  /** Total count */
  total: number;
}

/**
 * Hook for accessing all pharmacogenes
 */
export function useAllPharmacogenes(): UseAllPharmacogenesResult {
  const browserRef = useRef(getPharmgkbBrowser());

  const genes = useMemo(() => browserRef.current.getAllGenes(), []);

  const genesByLevel = useCallback(
    (level: CpicLevel) => browserRef.current.getGenesByCpicLevel(level),
    []
  );

  return {
    genes,
    genesByLevel,
    total: genes.length,
  };
}

// =============================================================================
// ALL GENE-DRUG PAIRS HOOK
// =============================================================================

export interface UseAllGeneDrugPairsResult {
  /** All gene-drug pairs */
  pairs: GeneDrugPair[];

  /** Pairs for a specific gene */
  pairsForGene: (geneSymbol: string) => GeneDrugPair[];

  /** Pairs for a specific drug */
  pairsForDrug: (drugName: string) => GeneDrugPair[];

  /** Total count */
  total: number;
}

/**
 * Hook for accessing all gene-drug pairs
 */
export function useAllGeneDrugPairs(): UseAllGeneDrugPairsResult {
  const browserRef = useRef(getPharmgkbBrowser());

  const pairs = useMemo(() => browserRef.current.getAllGeneDrugPairs(), []);

  const pairsForGene = useCallback(
    (geneSymbol: string) =>
      pairs.filter(p => p.geneSymbol.toUpperCase() === geneSymbol.toUpperCase()),
    [pairs]
  );

  const pairsForDrug = useCallback(
    (drugName: string) =>
      pairs.filter(p => p.drugName.toLowerCase().includes(drugName.toLowerCase())),
    [pairs]
  );

  return {
    pairs,
    pairsForGene,
    pairsForDrug,
    total: pairs.length,
  };
}
