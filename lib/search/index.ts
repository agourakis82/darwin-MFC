/**
 * Search Index
 * Central export for search functionality
 */

// Core search functionality
export * from './searchIndex';
export * from './advancedSearch';

// Semantic search (enhanced version)
export * from './semantic';
export {
  // Export semantic-search with prefixed names to avoid conflicts
  SemanticSearchIndex,
  getSearchIndex,
  semanticSearchQuery,
  smartSearch,
  getSearchSuggestions,
  getSemanticSearchStats,
  getSearchFacets,
  type SearchableDocument,
  type SearchFilters,
  type SearchStats,
  type FacetCount,
  type SearchEntityType,
  type SearchResult as SemanticSearchResult,
  type SearchOptions as SemanticSearchOptions,
} from './semantic-search';

// Synonyms - export from original synonyms module first
export {
  MEDICAL_SYNONYMS_PT as BASIC_SYNONYMS_PT,
  SYNONYM_TO_CANONICAL_PT,
  normalizeSearchText,
  expandQueryWithSynonyms,
  getCanonicalTerm as getBasicCanonicalTerm,
} from './synonyms';

// Medical synonyms (extended version)
export {
  MEDICAL_SYNONYMS_PT,
  MEDICAL_SYNONYMS_EN,
  MEDICAL_ABBREVIATIONS,
  normalizeText,
  getAllSynonyms,
  expandAbbreviation,
  getCanonicalTerm,
  getTermMetadata,
  getTermsByCategory,
  searchSynonyms,
  type SynonymEntry,
} from './medical-synonyms';

