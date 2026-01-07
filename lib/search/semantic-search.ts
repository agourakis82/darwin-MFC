/**
 * SEMANTIC SEARCH ENGINE
 * ======================
 *
 * Enhanced search system with:
 * - Medical synonym expansion
 * - Fuzzy matching with Fuse.js
 * - Multi-field search (diseases, medications, symptoms)
 * - Faceted filtering (category, evidence level, etc.)
 * - Relevance ranking with custom scoring
 *
 * Designed for client-side static export (Next.js SSG)
 * Can be extended to integrate with Elasticsearch
 */

import Fuse, { IFuseOptions, FuseResult } from 'fuse.js';
import {
  getAllSynonyms,
  expandAbbreviation,
  getTermMetadata,
  normalizeText,
  MEDICAL_ABBREVIATIONS,
} from './medical-synonyms';
import { medicamentosConsolidados } from '../data/medicamentos/index';
import { todasDoencas } from '../data/doencas/index';
import { calculadoras } from '../utils/calculators';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type SearchEntityType =
  | 'disease'
  | 'medication'
  | 'calculator'
  | 'protocol'
  | 'symptom'
  | 'exam';

export interface SearchableDocument {
  id: string;
  type: SearchEntityType;
  /** Primary title/name */
  title: string;
  /** Alternative names, synonyms */
  aliases: string[];
  /** Full description */
  description: string;
  /** Category/class for faceting */
  category: string;
  /** Subcategory for faceting */
  subcategory?: string;
  /** Medical codes (CID-10, CIAP-2, ATC, etc.) */
  codes: string[];
  /** Searchable tags */
  tags: string[];
  /** Additional metadata */
  metadata: {
    /** Available on SUS (RENAME) */
    availableSUS?: boolean;
    /** Pregnancy category */
    pregnancyCategory?: string;
    /** Evidence level */
    evidenceLevel?: string;
    /** Severity/priority */
    severity?: string;
    /** Last update date */
    lastUpdate?: string;
    /** Original data reference */
    originalData?: unknown;
  };
}

export interface SearchResult extends SearchableDocument {
  /** Relevance score (lower is better in Fuse.js) */
  score: number;
  /** Matched fields */
  matchedFields: string[];
  /** Highlighted matches */
  highlights: Array<{
    field: string;
    text: string;
    indices: [number, number][];
  }>;
  /** Query expansion info */
  expandedFrom?: string;
}

export interface SearchFilters {
  /** Filter by entity types */
  types?: SearchEntityType[];
  /** Filter by categories */
  categories?: string[];
  /** Filter by subcategories */
  subcategories?: string[];
  /** Filter by codes (CID-10, CIAP-2, etc.) */
  codes?: string[];
  /** Only SUS available */
  susOnly?: boolean;
  /** Pregnancy safe only */
  pregnancySafe?: boolean;
  /** Minimum evidence level */
  minEvidenceLevel?: string;
}

export interface SearchOptions {
  /** Search query */
  query: string;
  /** Filters to apply */
  filters?: SearchFilters;
  /** Maximum results */
  limit?: number;
  /** Enable synonym expansion */
  expandSynonyms?: boolean;
  /** Fuzzy matching threshold (0-1, lower = stricter) */
  threshold?: number;
  /** Boost exact matches */
  boostExactMatch?: boolean;
}

export interface FacetCount {
  value: string;
  count: number;
  label?: string;
}

export interface SearchStats {
  totalDocuments: number;
  byType: Record<SearchEntityType, number>;
  byCategory: Record<string, number>;
  topTags: FacetCount[];
}

// =============================================================================
// SEARCH INDEX CLASS
// =============================================================================

export class SemanticSearchIndex {
  private documents: SearchableDocument[] = [];
  private fuseIndex: Fuse<SearchableDocument> | null = null;
  private initialized = false;

  // Fuse.js configuration
  private fuseOptions: IFuseOptions<SearchableDocument> = {
    keys: [
      { name: 'title', weight: 4 },
      { name: 'aliases', weight: 3 },
      { name: 'codes', weight: 2.5 },
      { name: 'description', weight: 1.5 },
      { name: 'tags', weight: 2 },
      { name: 'category', weight: 1 },
      { name: 'subcategory', weight: 1 },
    ],
    threshold: 0.35,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
    useExtendedSearch: true,
    findAllMatches: true,
  };

  /**
   * Initialize the search index with all data sources
   */
  public initialize(): void {
    if (this.initialized) return;

    this.documents = [];

    // Index medications
    this.indexMedications();

    // Index diseases
    this.indexDiseases();

    // Index calculators
    this.indexCalculators();

    // Build Fuse.js index
    this.fuseIndex = new Fuse(this.documents, this.fuseOptions);
    this.initialized = true;
  }

  /**
   * Index medications from the database
   */
  private indexMedications(): void {
    medicamentosConsolidados.forEach(med => {
      const aliases: string[] = [
        ...(med.nomesComerciais || []),
        ...(med.tags || []),
      ];

      // Add synonyms from medical synonyms database
      const medSynonyms = getAllSynonyms(med.nomeGenerico);
      aliases.push(...medSynonyms.filter(s => s !== med.nomeGenerico));

      const codes: string[] = [];
      if (med.atcCode) codes.push(med.atcCode);
      if (med.rxNormCui) codes.push(med.rxNormCui);
      if (med.drugBankId) codes.push(med.drugBankId);
      if (med.dcbCode) codes.push(med.dcbCode);

      this.documents.push({
        id: med.id,
        type: 'medication',
        title: med.nomeGenerico,
        aliases,
        description: med.mecanismoAcao || med.indicacoes?.join('. ') || '',
        category: med.classeTerapeutica,
        subcategory: med.subclasse || undefined,
        codes,
        tags: [
          med.classeTerapeutica,
          med.subclasse || '',
          ...(med.indicacoes || []),
          ...(med.tags || []),
        ].filter(Boolean),
        metadata: {
          availableSUS: med.rename || med.apresentacoes?.some(a => a.disponivelSUS),
          pregnancyCategory: med.gestacao,
          lastUpdate: med.lastUpdate,
          originalData: med,
        },
      });
    });
  }

  /**
   * Index diseases from the database
   */
  private indexDiseases(): void {
    todasDoencas.forEach(doenca => {
      if (!doenca.id) return;

      const titulo = doenca.titulo || '';
      const aliases: string[] = [
        ...(doenca.sinonimos || []),
        ...(doenca.tags || []),
      ];

      // Add synonyms from medical synonyms database
      const diseaseSynonyms = getAllSynonyms(titulo);
      aliases.push(...diseaseSynonyms.filter(s => s !== titulo));

      const codes: string[] = [
        ...(doenca.ciap2 || []),
        ...(doenca.cid10 || []),
        ...(doenca.cid11 || []),
      ];
      if (doenca.doid) codes.push(doenca.doid);
      if (doenca.snomedCT) codes.push(doenca.snomedCT);
      if (doenca.meshId) codes.push(doenca.meshId);
      if (doenca.umlsCui) codes.push(doenca.umlsCui);

      const description = doenca.quickView?.definicao || '';

      this.documents.push({
        id: doenca.id,
        type: 'disease',
        title: titulo,
        aliases,
        description,
        category: doenca.categoria || 'outros',
        subcategory: doenca.subcategoria,
        codes,
        tags: [
          doenca.categoria || '',
          ...(doenca.tags || []),
          ...(doenca.ciap2 || []),
          ...(doenca.cid10 || []),
        ].filter(Boolean),
        metadata: {
          lastUpdate: doenca.lastUpdate,
          originalData: doenca,
        },
      });
    });
  }

  /**
   * Index calculators
   */
  private indexCalculators(): void {
    calculadoras.forEach(calc => {
      this.documents.push({
        id: calc.id,
        type: 'calculator',
        title: calc.nome,
        aliases: calc.tags || [],
        description: calc.descricao,
        category: calc.categoria,
        codes: [],
        tags: [calc.categoria, ...(calc.tags || [])].filter(Boolean),
        metadata: {
          originalData: calc,
        },
      });
    });
  }

  /**
   * Main search method with synonym expansion and filtering
   */
  public search(options: SearchOptions): SearchResult[] {
    if (!this.initialized) {
      this.initialize();
    }

    const {
      query,
      filters,
      limit = 50,
      expandSynonyms = true,
      threshold,
      boostExactMatch = true,
    } = options;

    if (!query || query.trim().length < 2) {
      return [];
    }

    // Update threshold if provided
    if (threshold !== undefined && this.fuseIndex) {
      this.fuseIndex.setCollection(this.documents);
      (this.fuseIndex as any).options.threshold = threshold;
    }

    // Expand query with synonyms
    let searchQueries = [query];
    if (expandSynonyms) {
      // Check if it's an abbreviation first
      const expanded = expandAbbreviation(query);
      if (expanded) {
        searchQueries.push(expanded);
      }

      // Get all synonyms
      const synonyms = getAllSynonyms(query);
      searchQueries = [...new Set([...searchQueries, ...synonyms])];
    }

    // Perform search with all expanded queries
    const allResults = new Map<string, SearchResult>();

    searchQueries.forEach(searchQuery => {
      const fuseResults = this.fuseIndex!.search(searchQuery);

      fuseResults.forEach(result => {
        const existing = allResults.get(result.item.id);
        const newResult = this.transformResult(result, searchQuery !== query ? query : undefined);

        // Keep the best score (lower is better)
        if (!existing || newResult.score < existing.score) {
          allResults.set(result.item.id, newResult);
        }
      });
    });

    // Convert to array and apply filters
    let results = Array.from(allResults.values());
    results = this.applyFilters(results, filters);

    // Boost exact matches
    if (boostExactMatch) {
      results = this.boostExactMatches(results, query);
    }

    // Sort by score (ascending - lower is better)
    results.sort((a, b) => a.score - b.score);

    // Apply limit
    return results.slice(0, limit);
  }

  /**
   * Transform Fuse.js result to SearchResult
   */
  private transformResult(
    fuseResult: FuseResult<SearchableDocument>,
    expandedFrom?: string
  ): SearchResult {
    const matchedFields = fuseResult.matches?.map(m => m.key || '') || [];
    const highlights = (fuseResult.matches || []).map(match => ({
      field: match.key || '',
      text: String(match.value || ''),
      indices: (match.indices || []) as [number, number][],
    }));

    return {
      ...fuseResult.item,
      score: fuseResult.score || 1,
      matchedFields: [...new Set(matchedFields)],
      highlights,
      expandedFrom,
    };
  }

  /**
   * Apply filters to search results
   */
  private applyFilters(
    results: SearchResult[],
    filters?: SearchFilters
  ): SearchResult[] {
    if (!filters) return results;

    return results.filter(result => {
      // Filter by type
      if (filters.types && filters.types.length > 0) {
        if (!filters.types.includes(result.type)) return false;
      }

      // Filter by category
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(result.category)) return false;
      }

      // Filter by subcategory
      if (filters.subcategories && filters.subcategories.length > 0) {
        if (!result.subcategory || !filters.subcategories.includes(result.subcategory)) {
          return false;
        }
      }

      // Filter by codes
      if (filters.codes && filters.codes.length > 0) {
        const hasCode = filters.codes.some(code =>
          result.codes.some(c => c.toLowerCase().includes(code.toLowerCase()))
        );
        if (!hasCode) return false;
      }

      // Filter SUS only
      if (filters.susOnly && !result.metadata.availableSUS) {
        return false;
      }

      // Filter pregnancy safe
      if (filters.pregnancySafe) {
        const cat = result.metadata.pregnancyCategory;
        if (cat && (cat === 'D' || cat === 'X')) return false;
      }

      return true;
    });
  }

  /**
   * Boost exact matches to appear first
   */
  private boostExactMatches(results: SearchResult[], query: string): SearchResult[] {
    const normalizedQuery = normalizeText(query);

    return results.map(result => {
      const normalizedTitle = normalizeText(result.title);
      const normalizedAliases = result.aliases.map(normalizeText);

      // Check for exact match in title
      if (normalizedTitle === normalizedQuery) {
        return { ...result, score: result.score * 0.1 };
      }

      // Check for exact match in aliases
      if (normalizedAliases.includes(normalizedQuery)) {
        return { ...result, score: result.score * 0.2 };
      }

      // Check for title starts with query
      if (normalizedTitle.startsWith(normalizedQuery)) {
        return { ...result, score: result.score * 0.5 };
      }

      // Check for code match
      if (result.codes.some(c => c.toLowerCase() === query.toLowerCase())) {
        return { ...result, score: result.score * 0.3 };
      }

      return result;
    });
  }

  /**
   * Search by medical code (CID-10, CIAP-2, ATC, etc.)
   */
  public searchByCode(code: string): SearchResult[] {
    if (!this.initialized) {
      this.initialize();
    }

    const normalizedCode = code.toUpperCase().replace(/[.-]/g, '');

    return this.documents
      .filter(doc =>
        doc.codes.some(c => {
          const normalized = c.toUpperCase().replace(/[.-]/g, '');
          return normalized === normalizedCode || normalized.startsWith(normalizedCode);
        })
      )
      .map(doc => ({
        ...doc,
        score: 0,
        matchedFields: ['codes'],
        highlights: [],
      }));
  }

  /**
   * Check if query looks like a medical code
   */
  public isCodeQuery(query: string): boolean {
    const normalized = query.toUpperCase().trim();

    // CID-10 pattern: letter followed by digits (e.g., E11, I10.0, J45.9)
    const cid10Pattern = /^[A-Z]\d{1,3}(\.\d{1,2})?$/;

    // CIAP-2 pattern: letter followed by digits (e.g., K86, T90)
    const ciap2Pattern = /^[A-Z]\d{2}$/;

    // ATC pattern: letter(s) followed by digits (e.g., A10BA02, C09AA01)
    const atcPattern = /^[A-Z]\d{2}[A-Z]{2}\d{2}$/;

    return (
      cid10Pattern.test(normalized) ||
      ciap2Pattern.test(normalized) ||
      atcPattern.test(normalized)
    );
  }

  /**
   * Get suggestions for autocomplete
   */
  public getSuggestions(query: string, limit = 10): string[] {
    if (!this.initialized) {
      this.initialize();
    }

    if (!query || query.length < 2) return [];

    const results = this.search({ query, limit, expandSynonyms: false });
    const suggestions = new Set<string>();

    results.forEach(r => {
      suggestions.add(r.title);
      // Add matching aliases
      r.aliases.forEach(alias => {
        if (normalizeText(alias).includes(normalizeText(query))) {
          suggestions.add(alias);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }

  /**
   * Get facet counts for filtering
   */
  public getFacets(results?: SearchResult[]): {
    types: FacetCount[];
    categories: FacetCount[];
    subcategories: FacetCount[];
    susAvailable: FacetCount[];
    pregnancyCategories: FacetCount[];
  } {
    const source = results || this.documents;

    const types = new Map<string, number>();
    const categories = new Map<string, number>();
    const subcategories = new Map<string, number>();
    const susCount = { available: 0, notAvailable: 0 };
    const pregnancyCategories = new Map<string, number>();

    source.forEach(doc => {
      // Count types
      types.set(doc.type, (types.get(doc.type) || 0) + 1);

      // Count categories
      categories.set(doc.category, (categories.get(doc.category) || 0) + 1);

      // Count subcategories
      if (doc.subcategory) {
        subcategories.set(doc.subcategory, (subcategories.get(doc.subcategory) || 0) + 1);
      }

      // Count SUS availability
      if (doc.metadata.availableSUS) {
        susCount.available++;
      } else {
        susCount.notAvailable++;
      }

      // Count pregnancy categories
      if (doc.metadata.pregnancyCategory) {
        const cat = doc.metadata.pregnancyCategory;
        pregnancyCategories.set(cat, (pregnancyCategories.get(cat) || 0) + 1);
      }
    });

    return {
      types: Array.from(types.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count),
      categories: Array.from(categories.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count),
      subcategories: Array.from(subcategories.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count),
      susAvailable: [
        { value: 'available', count: susCount.available, label: 'Disponivel SUS' },
        { value: 'not_available', count: susCount.notAvailable, label: 'Nao disponivel SUS' },
      ],
      pregnancyCategories: Array.from(pregnancyCategories.entries())
        .map(([value, count]) => ({ value, count, label: `Categoria ${value}` }))
        .sort((a, b) => a.value.localeCompare(b.value)),
    };
  }

  /**
   * Get search statistics
   */
  public getStats(): SearchStats {
    if (!this.initialized) {
      this.initialize();
    }

    const byType: Record<SearchEntityType, number> = {
      disease: 0,
      medication: 0,
      calculator: 0,
      protocol: 0,
      symptom: 0,
      exam: 0,
    };

    const byCategory: Record<string, number> = {};
    const tagCounts: Record<string, number> = {};

    this.documents.forEach(doc => {
      byType[doc.type] = (byType[doc.type] || 0) + 1;
      byCategory[doc.category] = (byCategory[doc.category] || 0) + 1;

      doc.tags.forEach(tag => {
        if (tag) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      });
    });

    const topTags = Object.entries(tagCounts)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    return {
      totalDocuments: this.documents.length,
      byType,
      byCategory,
      topTags,
    };
  }

  /**
   * Get related terms based on a search result
   */
  public getRelatedTerms(resultId: string, limit = 5): string[] {
    const doc = this.documents.find(d => d.id === resultId);
    if (!doc) return [];

    const related = new Set<string>();

    // Add category as related term
    related.add(doc.category);

    // Add subcategory
    if (doc.subcategory) {
      related.add(doc.subcategory);
    }

    // Add top tags
    doc.tags.slice(0, 3).forEach(tag => {
      if (tag && tag.length > 3) {
        related.add(tag);
      }
    });

    // Remove the document's own title
    related.delete(doc.title);

    return Array.from(related).slice(0, limit);
  }

  /**
   * Get all indexed documents (for debugging/testing)
   */
  public getAllDocuments(): SearchableDocument[] {
    if (!this.initialized) {
      this.initialize();
    }
    return [...this.documents];
  }

  /**
   * Clear and reinitialize the index
   */
  public reset(): void {
    this.documents = [];
    this.fuseIndex = null;
    this.initialized = false;
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

let searchIndexInstance: SemanticSearchIndex | null = null;

/**
 * Get the singleton search index instance
 */
export function getSearchIndex(): SemanticSearchIndex {
  if (!searchIndexInstance) {
    searchIndexInstance = new SemanticSearchIndex();
    searchIndexInstance.initialize();
  }
  return searchIndexInstance;
}

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Quick search function
 */
export function semanticSearchQuery(
  query: string,
  options?: Partial<SearchOptions>
): SearchResult[] {
  const index = getSearchIndex();
  return index.search({ query, ...options });
}

/**
 * Search with auto-detection of code queries
 */
export function smartSearch(query: string, options?: Partial<SearchOptions>): SearchResult[] {
  const index = getSearchIndex();

  // Check if it's a code query
  if (index.isCodeQuery(query)) {
    return index.searchByCode(query);
  }

  // Regular semantic search
  return index.search({ query, ...options });
}

/**
 * Get search suggestions for autocomplete
 */
export function getSearchSuggestions(query: string, limit = 10): string[] {
  const index = getSearchIndex();
  return index.getSuggestions(query, limit);
}

/**
 * Get search statistics
 */
export function getSemanticSearchStats(): SearchStats {
  const index = getSearchIndex();
  return index.getStats();
}

/**
 * Get facets for a set of results
 */
export function getSearchFacets(results?: SearchResult[]) {
  const index = getSearchIndex();
  return index.getFacets(results);
}
