/**
 * Semantic search utilities
 * Enhanced search with synonym expansion and concept matching
 */

import Fuse from 'fuse.js';
import { expandQueryWithSynonyms, normalizeSearchText } from './synonyms';

/**
 * Semantic search configuration
 */
export interface SemanticSearchConfig {
  threshold?: number; // Fuse.js threshold (0-1, lower = stricter)
  fieldWeights?: Record<string, number>; // Field weights for scoring
  maxResults?: number; // Maximum results to return
  expandSynonyms?: boolean; // Whether to expand queries with synonyms
}

/**
 * Semantic search result with enhanced metadata
 */
export interface SemanticSearchResult<T> {
  item: T;
  score: number; // Fuse.js score (lower = better match)
  matches: Array<{
    field: string;
    value: string;
    indices: [number, number][]; // Character indices of match
  }>;
  semanticScore?: number; // Additional semantic similarity score
}

/**
 * Perform semantic search with synonym expansion
 */
export function semanticSearch<T>(
  items: T[],
  query: string,
  keys: Array<{ name: string; weight?: number }>,
  config: SemanticSearchConfig = {}
): SemanticSearchResult<T>[] {
  const {
    threshold = 0.4,
    maxResults = 50,
    expandSynonyms = true,
  } = config;

  // Expand query with synonyms if enabled
  const expandedQueries = expandSynonyms
    ? expandQueryWithSynonyms(query)
    : [query];

  // Configure Fuse.js with field weights
  const fuseKeys = keys.map(key => ({
    name: key.name,
    weight: key.weight || 1,
  }));

  const fuse = new Fuse(items, {
    keys: fuseKeys,
    threshold,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
  });

  // Perform search with all expanded queries
  const allResults = new Map<T, SemanticSearchResult<T>>();

  expandedQueries.forEach((expandedQuery) => {
    const results = fuse.search(expandedQuery);
    
    results.forEach((result) => {
      const existing = allResults.get(result.item);
      
      if (!existing || result.score! < existing.score) {
        // Better match found
        allResults.set(result.item, {
          item: result.item,
          score: result.score!,
          matches: (result.matches || []).map(match => ({
            field: match.key || '',
            value: match.value?.toString() || '',
            indices: (match.indices || []) as [number, number][],
          })),
        });
      }
    });
  });

  // Sort by score (ascending - lower is better)
  const sortedResults = Array.from(allResults.values())
    .sort((a, b) => a.score - b.score)
    .slice(0, maxResults);

  return sortedResults;
}

/**
 * Faceted search - filter and search with multiple criteria
 */
export interface FacetFilter {
  field: string;
  value: string | string[];
  operator?: 'equals' | 'includes' | 'startsWith' | 'contains';
}

export function facetedSearch<T>(
  items: T[],
  query: string,
  keys: Array<{ name: string; weight?: number }>,
  facets: FacetFilter[],
  config: SemanticSearchConfig = {}
): SemanticSearchResult<T>[] {
  // First apply facet filters
  let filteredItems = items;

  facets.forEach((facet) => {
    filteredItems = filteredItems.filter((item) => {
      const fieldValue = getFieldValue(item, facet.field);
      
      if (Array.isArray(facet.value)) {
        // Multiple values - check if field value is in the array
        if (Array.isArray(fieldValue)) {
          return facet.value.some(val => fieldValue.includes(val));
        }
        return facet.value.includes(String(fieldValue));
      }

      // Single value
      const facetValue = String(facet.value).toLowerCase();
      const itemValue = String(fieldValue).toLowerCase();

      switch (facet.operator || 'equals') {
        case 'equals':
          return itemValue === facetValue;
        case 'includes':
          return Array.isArray(fieldValue) && fieldValue.includes(facet.value);
        case 'startsWith':
          return itemValue.startsWith(facetValue);
        case 'contains':
          return itemValue.includes(facetValue);
        default:
          return false;
      }
    });
  });

  // Then perform semantic search on filtered items
  return semanticSearch(filteredItems, query, keys, config);
}

/**
 * Get nested field value from object
 */
function getFieldValue(obj: any, fieldPath: string): any {
  const parts = fieldPath.split('.');
  let value = obj;
  
  for (const part of parts) {
    if (value == null) return null;
    value = value[part];
  }
  
  return value;
}

/**
 * Calculate semantic similarity between two strings
 * Simple implementation using common substring matching
 */
export function calculateSemanticSimilarity(str1: string, str2: string): number {
  const normalized1 = normalizeSearchText(str1);
  const normalized2 = normalizeSearchText(str2);

  if (normalized1 === normalized2) return 1.0;

  // Calculate longest common subsequence
  const lcs = longestCommonSubsequence(normalized1, normalized2);
  const maxLength = Math.max(normalized1.length, normalized2.length);
  
  return lcs.length / maxLength;
}

/**
 * Find longest common subsequence
 */
function longestCommonSubsequence(str1: string, str2: string): string {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruct LCS
  let i = m;
  let j = n;
  let lcs = '';

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

