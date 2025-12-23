/**
 * ADVANCED SEARCH FEATURES
 * ========================
 *
 * Enhanced search with:
 * - Medical synonyms integration
 * - CID-10/ATC code lookup
 * - "Did you mean?" suggestions
 * - Related searches
 * - Search highlights
 * - Saved searches
 */

import { expandQueryWithSynonyms, normalizeSearchText, getCanonicalTerm } from './synonyms';
import { calculateSemanticSimilarity } from './semantic';
import { search, type SearchOptions, type SearchResult, buildSearchIndex } from './searchIndex';

// ==============================================
// CID-10 / ATC CODE DIRECT LOOKUP
// ==============================================

/**
 * Search by CID-10 or ATC code directly
 */
export function searchByCode(code: string): SearchResult[] {
  const normalizedCode = code.toUpperCase().replace(/[.-]/g, '');

  return search({
    query: normalizedCode,
    limit: 20,
  }).filter(result => {
    const metadata = result.metadata || {};

    // Check CID-10
    if (metadata.cid10?.codigo) {
      const cid = metadata.cid10.codigo.replace(/[.-]/g, '');
      if (cid === normalizedCode || cid.startsWith(normalizedCode)) {
        return true;
      }
    }

    // Check ATC code in tags
    if (result.tags) {
      return result.tags.some(tag => {
        const tagNormalized = tag.toUpperCase().replace(/[.-]/g, '');
        return tagNormalized === normalizedCode || tagNormalized.startsWith(normalizedCode);
      });
    }

    return false;
  });
}

/**
 * Detect if query is a code (CID-10 or ATC)
 */
export function isCodeQuery(query: string): boolean {
  const normalized = query.toUpperCase().trim();

  // CID-10 pattern: letter followed by digits (e.g., E11, I10.0, J45.9)
  const cid10Pattern = /^[A-Z]\d{1,3}(\.\d{1,2})?$/;

  // ATC pattern: letter(s) followed by digits (e.g., A10BA02, C09AA01)
  const atcPattern = /^[A-Z]\d{2}[A-Z]{2}\d{2}$/;

  return cid10Pattern.test(normalized) || atcPattern.test(normalized);
}

// ==============================================
// SEMANTIC SEARCH WITH SYNONYMS
// ==============================================

/**
 * Enhanced search with synonym expansion
 */
export function searchWithSynonyms(options: SearchOptions): SearchResult[] {
  const { query } = options;

  // Expand query with medical synonyms
  const expandedQueries = expandQueryWithSynonyms(query);

  // Search with each expanded query
  const allResults = new Map<string, SearchResult>();

  expandedQueries.forEach(expandedQuery => {
    const results = search({
      ...options,
      query: expandedQuery,
    });

    results.forEach(result => {
      const existing = allResults.get(result.id);

      // Keep the best score
      if (!existing || result.score < existing.score) {
        allResults.set(result.id, result);
      }
    });
  });

  return Array.from(allResults.values())
    .sort((a, b) => a.score - b.score)
    .slice(0, options.limit || 50);
}

// ==============================================
// "DID YOU MEAN?" SUGGESTIONS
// ==============================================

export interface SpellingSuggestion {
  original: string;
  suggestion: string;
  confidence: number;
}

/**
 * Get spelling suggestions for misspelled queries
 */
export function getSpellingSuggestions(query: string): SpellingSuggestion[] {
  const suggestions: SpellingSuggestion[] = [];

  // Check if query has a canonical medical term
  const canonical = getCanonicalTerm(query);
  if (canonical && canonical.toLowerCase() !== query.toLowerCase()) {
    suggestions.push({
      original: query,
      suggestion: canonical,
      confidence: 1.0,
    });
  }

  // Find similar terms in index
  const index = buildSearchIndex();
  const allTerms = new Set<string>();

  index.forEach(entity => {
    allTerms.add(entity.title.toLowerCase());
    entity.tags.forEach(tag => allTerms.add(tag.toLowerCase()));
  });

  const normalized = normalizeSearchText(query);

  // Calculate similarity with all terms
  const similarTerms = Array.from(allTerms)
    .map(term => ({
      term,
      similarity: calculateSemanticSimilarity(normalized, normalizeSearchText(term)),
    }))
    .filter(item => item.similarity > 0.6 && item.similarity < 1.0) // Similar but not exact
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  similarTerms.forEach(({ term, similarity }) => {
    suggestions.push({
      original: query,
      suggestion: term,
      confidence: similarity,
    });
  });

  return suggestions;
}

// ==============================================
// RELATED SEARCHES
// ==============================================

/**
 * Get related search suggestions based on current query
 */
export function getRelatedSearches(query: string, limit = 5): string[] {
  const results = search({ query, limit: 10 });

  if (results.length === 0) return [];

  // Get categories and tags from top results
  const relatedTerms = new Set<string>();

  results.slice(0, 5).forEach(result => {
    if (result.category) {
      relatedTerms.add(result.category);
    }
    if (result.specialty) {
      relatedTerms.add(result.specialty);
    }
    result.tags.slice(0, 3).forEach(tag => {
      if (tag.length > 3) { // Skip very short tags
        relatedTerms.add(tag);
      }
    });
  });

  // Filter out the original query
  const filtered = Array.from(relatedTerms)
    .filter(term => !query.toLowerCase().includes(term.toLowerCase()))
    .slice(0, limit);

  return filtered;
}

// ==============================================
// SEARCH HIGHLIGHTS
// ==============================================

interface HighlightMatch {
  text: string;
  highlighted: boolean;
}

/**
 * Highlight matching terms in text
 */
export function highlightMatches(text: string, query: string): HighlightMatch[] {
  const normalized = normalizeSearchText(text);
  const queryNormalized = normalizeSearchText(query);

  if (!queryNormalized || queryNormalized.length < 2) {
    return [{ text, highlighted: false }];
  }

  // Find all occurrences
  const matches: HighlightMatch[] = [];
  let lastIndex = 0;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  let index = lowerText.indexOf(lowerQuery, lastIndex);

  while (index !== -1) {
    // Add non-highlighted part before match
    if (index > lastIndex) {
      matches.push({
        text: text.substring(lastIndex, index),
        highlighted: false,
      });
    }

    // Add highlighted match
    matches.push({
      text: text.substring(index, index + query.length),
      highlighted: true,
    });

    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  // Add remaining non-highlighted text
  if (lastIndex < text.length) {
    matches.push({
      text: text.substring(lastIndex),
      highlighted: false,
    });
  }

  return matches.length > 0 ? matches : [{ text, highlighted: false }];
}

/**
 * Generate highlighted HTML string
 */
export function getHighlightedHtml(text: string, query: string): string {
  const matches = highlightMatches(text, query);
  return matches
    .map(match =>
      match.highlighted
        ? `<mark class="bg-yellow-200 dark:bg-yellow-800">${match.text}</mark>`
        : match.text
    )
    .join('');
}

// ==============================================
// SAVED SEARCHES
// ==============================================

const SAVED_SEARCHES_KEY = 'darwin-mfc-saved-searches';

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: Partial<SearchOptions>;
  createdAt: number;
  lastUsed?: number;
}

/**
 * Save a search for later use
 */
export function saveSearch(name: string, query: string, filters: Partial<SearchOptions> = {}): SavedSearch {
  const saved = getSavedSearches();

  const newSearch: SavedSearch = {
    id: `search-${Date.now()}`,
    name,
    query,
    filters,
    createdAt: Date.now(),
  };

  saved.push(newSearch);

  try {
    localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(saved));
  } catch (error) {
    console.error('Failed to save search:', error);
  }

  return newSearch;
}

/**
 * Get all saved searches
 */
export function getSavedSearches(): SavedSearch[] {
  try {
    const stored = localStorage.getItem(SAVED_SEARCHES_KEY);
    if (!stored) return [];

    const searches = JSON.parse(stored);
    return Array.isArray(searches) ? searches : [];
  } catch (error) {
    console.error('Failed to load saved searches:', error);
    return [];
  }
}

/**
 * Delete a saved search
 */
export function deleteSavedSearch(id: string): void {
  const saved = getSavedSearches();
  const filtered = saved.filter(s => s.id !== id);

  try {
    localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete saved search:', error);
  }
}

/**
 * Update last used timestamp for a saved search
 */
export function updateSavedSearchUsage(id: string): void {
  const saved = getSavedSearches();
  const search = saved.find(s => s.id === id);

  if (search) {
    search.lastUsed = Date.now();

    try {
      localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(saved));
    } catch (error) {
      console.error('Failed to update saved search:', error);
    }
  }
}

// ==============================================
// SEARCH ANALYTICS
// ==============================================

const SEARCH_ANALYTICS_KEY = 'darwin-mfc-search-analytics';

export interface SearchAnalytics {
  query: string;
  resultCount: number;
  timestamp: number;
  clickedResults: string[]; // IDs of results clicked
}

/**
 * Log search analytics
 */
export function logSearch(query: string, resultCount: number): void {
  try {
    const analytics = getSearchAnalytics();

    analytics.push({
      query: query.toLowerCase().trim(),
      resultCount,
      timestamp: Date.now(),
      clickedResults: [],
    });

    // Keep only last 100 searches
    const limited = analytics.slice(-100);

    localStorage.setItem(SEARCH_ANALYTICS_KEY, JSON.stringify(limited));
  } catch (error) {
    console.error('Failed to log search:', error);
  }
}

/**
 * Get search analytics
 */
export function getSearchAnalytics(): SearchAnalytics[] {
  try {
    const stored = localStorage.getItem(SEARCH_ANALYTICS_KEY);
    if (!stored) return [];

    const analytics = JSON.parse(stored);
    return Array.isArray(analytics) ? analytics : [];
  } catch (error) {
    console.error('Failed to load search analytics:', error);
    return [];
  }
}

/**
 * Get most searched terms
 */
export function getMostSearchedTerms(limit = 10): Array<{ query: string; count: number }> {
  const analytics = getSearchAnalytics();

  const counts = analytics.reduce((acc, item) => {
    acc[item.query] = (acc[item.query] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts)
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Get searches with no results
 */
export function getNoResultSearches(limit = 10): string[] {
  const analytics = getSearchAnalytics();

  return analytics
    .filter(item => item.resultCount === 0)
    .map(item => item.query)
    .filter((query, index, self) => self.indexOf(query) === index) // Unique
    .slice(-limit);
}
