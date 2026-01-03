/**
 * DARWIN-MFC SNOMED-CT BROWSER API SERVICE
 * =========================================
 *
 * Client for the SNOMED International Browser API.
 * API Documentation: https://browser.ihtsdotools.org/snowstorm/snomed-ct
 *
 * Features:
 * - Concept search by term
 * - ECL (Expression Constraint Language) queries
 * - Hierarchy navigation (ancestors, descendants)
 * - Concept lookup by SCTID
 * - Relationship browsing
 * - Multi-language support
 *
 * @see https://browser.ihtsdotools.org
 */

import type {
  SnomedEdition,
  SnomedConceptSimple,
  SnomedConceptFull,
  SnomedDescription,
  SnomedRelationshipSimple,
  SnomedSearchResult,
  SnomedSearchResponse,
  SnomedHierarchyResult,
  ECLQuery,
} from '../types/snomed-ct';

// Re-export for convenience
export type {
  SnomedConceptSimple as SnomedConcept,
  SnomedConceptFull,
  SnomedSearchResponse,
  SnomedHierarchyResult,
};

import type {
  Concept,
  ConceptSearchParams,
  ConceptSearchResult,
  ConceptSearchResponse,
  HierarchyNode,
  ExpansionOptions,
  ExpansionResult,
} from '../types/ontology';

// =============================================================================
// API CONFIGURATION
// =============================================================================

/**
 * SNOMED Browser API base URL
 * Using the Snowstorm terminology server
 */
const API_BASE_URL = 'https://browser.ihtsdotools.org/snowstorm/snomed-ct';

/**
 * Default edition and version
 */
const DEFAULT_EDITION = 'MAIN';
const DEFAULT_VERSION = 'MAIN';

/**
 * API request timeout in milliseconds
 */
const REQUEST_TIMEOUT = 10000;

/**
 * Maximum results per search
 */
const MAX_SEARCH_RESULTS = 50;

// =============================================================================
// CACHE CONFIGURATION
// =============================================================================

/**
 * In-memory cache for API responses
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

/**
 * Cache TTL in milliseconds (15 minutes)
 */
const CACHE_TTL = 15 * 60 * 1000;

/**
 * Generate cache key from request parameters
 */
function getCacheKey(endpoint: string, params?: Record<string, string>): string {
  const paramStr = params ? JSON.stringify(params) : '';
  return `${endpoint}:${paramStr}`;
}

/**
 * Get cached response if valid
 */
function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (entry && entry.expiresAt > Date.now()) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

/**
 * Store response in cache
 */
function setInCache<T>(key: string, data: T): void {
  const now = Date.now();
  cache.set(key, {
    data,
    timestamp: now,
    expiresAt: now + CACHE_TTL,
  });
}

/**
 * Clear expired cache entries
 */
function cleanCache(): void {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (entry.expiresAt <= now) {
      cache.delete(key);
    }
  }
}

// Run cache cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(cleanCache, 5 * 60 * 1000);
}

// =============================================================================
// API REQUEST UTILITIES
// =============================================================================

/**
 * Error class for SNOMED API errors
 */
export class SnomedApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'SnomedApiError';
  }
}

/**
 * Build URL with query parameters
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Make API request with timeout and error handling
 */
async function apiRequest<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
  options?: { useCache?: boolean; timeout?: number }
): Promise<T> {
  const { useCache = true, timeout = REQUEST_TIMEOUT } = options || {};

  // Check cache first
  if (useCache) {
    const cacheKey = getCacheKey(endpoint, params as Record<string, string>);
    const cached = getFromCache<T>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const url = buildUrl(endpoint, params);

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new SnomedApiError(
        `SNOMED API error: ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    const data = await response.json();

    // Cache successful response
    if (useCache) {
      const cacheKey = getCacheKey(endpoint, params as Record<string, string>);
      setInCache(cacheKey, data);
    }

    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof SnomedApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new SnomedApiError(`Request timeout after ${timeout}ms`, undefined, endpoint);
      }
      throw new SnomedApiError(error.message, undefined, endpoint);
    }

    throw new SnomedApiError('Unknown API error', undefined, endpoint);
  }
}

// =============================================================================
// RESPONSE TYPES FROM SNOMED API
// =============================================================================

interface SnomedBrowserSearchResponse {
  items: SnomedBrowserConcept[];
  total: number;
  limit: number;
  offset: number;
  searchAfter?: string;
  searchAfterArray?: string[];
}

interface SnomedBrowserConcept {
  conceptId: string;
  active: boolean;
  definitionStatus: 'PRIMITIVE' | 'FULLY_DEFINED';
  moduleId: string;
  effectiveTime: string;
  fsn: {
    term: string;
    lang: string;
  };
  pt: {
    term: string;
    lang: string;
  };
  id: string;
}

interface SnomedBrowserConceptFull extends SnomedBrowserConcept {
  descriptions: SnomedBrowserDescription[];
  relationships?: SnomedBrowserRelationship[];
  classAxioms?: unknown[];
  gciAxioms?: unknown[];
}

interface SnomedBrowserDescription {
  descriptionId: string;
  active: boolean;
  term: string;
  conceptId: string;
  moduleId: string;
  typeId: string;
  type: 'FSN' | 'SYNONYM' | 'DEFINITION';
  lang: string;
  caseSignificance: 'INITIAL_CHARACTER_CASE_INSENSITIVE' | 'CASE_INSENSITIVE' | 'ENTIRE_TERM_CASE_SENSITIVE';
  acceptabilityMap?: Record<string, 'PREFERRED' | 'ACCEPTABLE'>;
}

interface SnomedBrowserRelationship {
  relationshipId: string;
  active: boolean;
  moduleId: string;
  sourceId: string;
  destinationId: string;
  relationshipGroup: number;
  typeId: string;
  type: {
    conceptId: string;
    pt: { term: string };
    fsn: { term: string };
  };
  target: {
    conceptId: string;
    pt: { term: string };
    fsn: { term: string };
    active: boolean;
  };
  characteristicTypeId: string;
  modifierId: string;
}

interface SnomedBrowserHierarchyResponse {
  items: SnomedBrowserConcept[];
  total: number;
  limit: number;
  offset: number;
}

// =============================================================================
// TYPE CONVERTERS
// =============================================================================

/**
 * Convert SNOMED Browser API concept to internal format
 */
function convertToSnomedConcept(apiConcept: SnomedBrowserConcept): SnomedConceptSimple {
  return {
    conceptId: apiConcept.conceptId,
    active: apiConcept.active,
    definitionStatus: apiConcept.definitionStatus,
    moduleId: apiConcept.moduleId,
    effectiveTime: apiConcept.effectiveTime,
    fsn: apiConcept.fsn.term,
    pt: apiConcept.pt.term,
    id: apiConcept.id,
  };
}

/**
 * Convert SNOMED Browser API full concept to internal format
 */
function convertToSnomedConceptFull(apiConcept: SnomedBrowserConceptFull): SnomedConceptFull {
  const descriptions: SnomedDescription[] = (apiConcept.descriptions || []).map((desc) => ({
    descriptionId: desc.descriptionId,
    active: desc.active,
    term: desc.term,
    lang: desc.lang,
    type: desc.type,
    caseSignificance: desc.caseSignificance === 'INITIAL_CHARACTER_CASE_INSENSITIVE'
      ? 'INITIAL_CASE_INSENSITIVE'
      : desc.caseSignificance === 'CASE_INSENSITIVE'
        ? 'CASE_INSENSITIVE'
        : 'CASE_SENSITIVE',
    acceptabilityMap: desc.acceptabilityMap,
    moduleId: desc.moduleId || '',
    effectiveTime: '',
  }));

  const relationships: SnomedRelationshipSimple[] = (apiConcept.relationships || []).map((rel) => ({
    relationshipId: rel.relationshipId,
    active: rel.active,
    sourceId: rel.sourceId,
    destinationId: rel.destinationId,
    typeId: rel.typeId,
    typePt: rel.type?.pt?.term || '',
    targetPt: rel.target?.pt?.term || '',
    characteristicTypeId: rel.characteristicTypeId,
    relationshipGroup: rel.relationshipGroup,
  }));

  return {
    conceptId: apiConcept.conceptId,
    active: apiConcept.active,
    definitionStatus: apiConcept.definitionStatus,
    moduleId: apiConcept.moduleId,
    effectiveTime: apiConcept.effectiveTime,
    fsn: apiConcept.fsn.term,
    pt: apiConcept.pt.term,
    id: apiConcept.id,
    descriptions,
    relationships,
  };
}

// =============================================================================
// SNOMED BROWSER SERVICE
// =============================================================================

export interface SnomedBrowserConfig {
  edition?: string;
  version?: string;
  language?: string;
}

export interface SearchOptions {
  term: string;
  limit?: number;
  offset?: number;
  activeOnly?: boolean;
  conceptIds?: string[];
  semanticTags?: string[];
  language?: string;
}

export interface ECLSearchOptions {
  ecl: string;
  term?: string;
  limit?: number;
  offset?: number;
  activeOnly?: boolean;
}

export interface HierarchyOptions {
  conceptId: string;
  limit?: number;
  offset?: number;
  stated?: boolean;
}

/**
 * SNOMED-CT Browser API Service
 *
 * Provides methods to interact with the SNOMED International Browser API
 * for concept search, hierarchy navigation, and ECL queries.
 *
 * @example
 * ```typescript
 * const browser = new SnomedBrowserService();
 *
 * // Search for concepts
 * const results = await browser.search({ term: 'diabetes' });
 *
 * // Get concept by ID
 * const concept = await browser.getConcept('73211009');
 *
 * // ECL query
 * const descendants = await browser.searchByECL({ ecl: '<<73211009' });
 * ```
 */
export class SnomedBrowserService {
  private readonly edition: string;
  private readonly version: string;
  private readonly language: string;

  constructor(config?: SnomedBrowserConfig) {
    this.edition = config?.edition || DEFAULT_EDITION;
    this.version = config?.version || DEFAULT_VERSION;
    this.language = config?.language || 'en';
  }

  /**
   * Get the branch path for API requests
   */
  private getBranch(): string {
    if (this.edition === 'MAIN' && this.version === 'MAIN') {
      return 'MAIN';
    }
    return `MAIN/${this.edition}/${this.version}`;
  }

  // ===========================================================================
  // SEARCH METHODS
  // ===========================================================================

  /**
   * Search for concepts by term
   *
   * @param options Search options
   * @returns Search results with matching concepts
   *
   * @example
   * ```typescript
   * const results = await browser.search({ term: 'hypertension', limit: 10 });
   * ```
   */
  async search(options: SearchOptions): Promise<SnomedSearchResponse> {
    const { term, limit = 25, offset = 0, activeOnly = true, semanticTags, language } = options;

    const branch = this.getBranch();
    const endpoint = `/browser/${branch}/descriptions`;

    const params: Record<string, string | number | boolean> = {
      term,
      limit,
      offset,
      active: activeOnly,
      language: language || this.language,
      conceptActive: activeOnly,
      groupByConcept: true,
    };

    if (semanticTags && semanticTags.length > 0) {
      params.semanticTags = semanticTags.join(',');
    }

    const response = await apiRequest<SnomedBrowserSearchResponse>(endpoint, params);

    return {
      items: response.items.map((item) => ({
        concept: convertToSnomedConcept(item),
        score: 1.0, // API doesn't provide score, so default to 1.0
        term: item.pt.term,
        active: item.active,
        fsn: item.fsn.term,
      })),
      total: response.total,
      limit: response.limit,
      offset: response.offset,
    };
  }

  /**
   * Search concepts using ECL (Expression Constraint Language)
   *
   * @param options ECL search options
   * @returns Concepts matching the ECL expression
   *
   * @example
   * ```typescript
   * // All descendants of diabetes mellitus
   * const results = await browser.searchByECL({ ecl: '<<73211009' });
   *
   * // Cardiac disorders with finding site = heart
   * const results = await browser.searchByECL({
   *   ecl: '<<49601007:363698007=<<80891009'
   * });
   * ```
   */
  async searchByECL(options: ECLSearchOptions): Promise<SnomedSearchResponse> {
    const { ecl, term, limit = 50, offset = 0, activeOnly = true } = options;

    const branch = this.getBranch();
    const endpoint = `/browser/${branch}/concepts`;

    const params: Record<string, string | number | boolean> = {
      ecl,
      limit,
      offset,
      activeFilter: activeOnly,
    };

    if (term) {
      params.term = term;
    }

    const response = await apiRequest<SnomedBrowserSearchResponse>(endpoint, params);

    return {
      items: response.items.map((item) => ({
        concept: convertToSnomedConcept(item),
        score: 1.0,
        term: item.pt.term,
        active: item.active,
        fsn: item.fsn.term,
      })),
      total: response.total,
      limit: response.limit,
      offset: response.offset,
    };
  }

  // ===========================================================================
  // CONCEPT RETRIEVAL
  // ===========================================================================

  /**
   * Get a single concept by SCTID
   *
   * @param conceptId SNOMED CT concept ID
   * @returns Full concept with descriptions and relationships
   *
   * @example
   * ```typescript
   * const concept = await browser.getConcept('73211009');
   * console.log(concept.pt); // "Diabetes mellitus"
   * ```
   */
  async getConcept(conceptId: string): Promise<SnomedConceptFull> {
    const branch = this.getBranch();
    const endpoint = `/browser/${branch}/concepts/${conceptId}`;

    const response = await apiRequest<SnomedBrowserConceptFull>(endpoint);

    return convertToSnomedConceptFull(response);
  }

  /**
   * Get multiple concepts by their IDs
   *
   * @param conceptIds Array of SNOMED CT concept IDs
   * @returns Array of concepts
   */
  async getConceptsBatch(conceptIds: string[]): Promise<SnomedConceptSimple[]> {
    if (conceptIds.length === 0) return [];

    const branch = this.getBranch();
    const endpoint = `/browser/${branch}/concepts`;

    // API accepts comma-separated concept IDs
    const params: Record<string, string | number> = {
      conceptIds: conceptIds.join(','),
      limit: conceptIds.length,
    };

    const response = await apiRequest<SnomedBrowserSearchResponse>(endpoint, params);

    return response.items.map(convertToSnomedConcept);
  }

  // ===========================================================================
  // HIERARCHY NAVIGATION
  // ===========================================================================

  /**
   * Get ancestors of a concept (is-a relationships going up)
   *
   * @param options Hierarchy options
   * @returns Ancestor concepts
   *
   * @example
   * ```typescript
   * // Get all ancestors of Type 2 diabetes
   * const ancestors = await browser.getAncestors({ conceptId: '44054006' });
   * ```
   */
  async getAncestors(options: HierarchyOptions): Promise<SnomedHierarchyResult> {
    const { conceptId, limit = 50, offset = 0, stated = false } = options;

    const branch = this.getBranch();
    const form = stated ? 'stated' : 'inferred';
    const endpoint = `/${branch}/concepts/${conceptId}/ancestors`;

    const params: Record<string, string | number | boolean> = {
      limit,
      offset,
      form,
    };

    const response = await apiRequest<SnomedBrowserHierarchyResponse>(endpoint, params);

    return {
      sourceConcept: conceptId,
      ancestors: response.items.map((item) => ({
        concept: convertToSnomedConcept(item),
        depth: -1, // API doesn't provide depth
      })),
      total: response.total,
    };
  }

  /**
   * Get descendants of a concept (is-a relationships going down)
   *
   * @param options Hierarchy options
   * @returns Descendant concepts
   *
   * @example
   * ```typescript
   * // Get immediate children of diabetes mellitus
   * const descendants = await browser.getDescendants({
   *   conceptId: '73211009',
   *   limit: 100
   * });
   * ```
   */
  async getDescendants(options: HierarchyOptions): Promise<SnomedHierarchyResult> {
    const { conceptId, limit = 50, offset = 0, stated = false } = options;

    const branch = this.getBranch();
    const form = stated ? 'stated' : 'inferred';

    // Use ECL for descendants - more reliable than hierarchy endpoint
    const ecl = `<${conceptId}`;

    const response = await this.searchByECL({
      ecl,
      limit,
      offset,
    });

    return {
      sourceConcept: conceptId,
      descendants: response.items.map((item) => ({
        concept: item.concept,
        depth: 1, // ECL doesn't provide depth
      })),
      total: response.total,
    };
  }

  /**
   * Get direct parents of a concept (immediate is-a relationships)
   *
   * @param conceptId SNOMED CT concept ID
   * @returns Parent concepts
   */
  async getParents(conceptId: string): Promise<SnomedConceptSimple[]> {
    const concept = await this.getConcept(conceptId);

    // Filter relationships to get IS_A (116680003) relationships
    const isARelationships = (concept.relationships || []).filter(
      (rel) => rel.typeId === '116680003' && rel.active
    );

    if (isARelationships.length === 0) {
      return [];
    }

    const parentIds = isARelationships.map((rel) => rel.destinationId);
    return this.getConceptsBatch(parentIds);
  }

  /**
   * Get direct children of a concept (concepts with is-a relationship to this)
   *
   * @param conceptId SNOMED CT concept ID
   * @param limit Maximum number of children to return
   * @returns Child concepts
   */
  async getChildren(conceptId: string, limit = 100): Promise<SnomedConceptSimple[]> {
    // Use ECL for direct children only (single <)
    const ecl = `<!${conceptId}`;

    const response = await this.searchByECL({
      ecl,
      limit,
    });

    return response.items.map((item) => item.concept);
  }

  // ===========================================================================
  // RELATIONSHIP METHODS
  // ===========================================================================

  /**
   * Get all relationships for a concept
   *
   * @param conceptId SNOMED CT concept ID
   * @returns All relationships (both stated and inferred)
   */
  async getRelationships(conceptId: string): Promise<SnomedRelationshipSimple[]> {
    const concept = await this.getConcept(conceptId);
    return concept.relationships || [];
  }

  /**
   * Get concepts that have a specific relationship to the given concept
   *
   * @param conceptId Target concept ID
   * @param relationshipTypeId Relationship type SCTID
   * @param limit Maximum results
   * @returns Related concepts
   *
   * @example
   * ```typescript
   * // Get all disorders with finding site = heart
   * const disorders = await browser.getIncomingRelationships(
   *   '80891009', // Heart
   *   '363698007' // Finding site relationship
   * );
   * ```
   */
  async getIncomingRelationships(
    conceptId: string,
    relationshipTypeId: string,
    limit = 50
  ): Promise<SnomedConceptSimple[]> {
    // Use ECL: concepts where relationship type = conceptId
    const ecl = `*:${relationshipTypeId}=${conceptId}`;

    const response = await this.searchByECL({
      ecl,
      limit,
    });

    return response.items.map((item) => item.concept);
  }

  // ===========================================================================
  // SEMANTIC METHODS
  // ===========================================================================

  /**
   * Find similar concepts based on semantic similarity
   *
   * @param conceptId Source concept ID
   * @param limit Maximum results
   * @returns Semantically similar concepts
   */
  async findSimilarConcepts(conceptId: string, limit = 10): Promise<SnomedConceptSimple[]> {
    // Get the concept to find its parents
    const parents = await this.getParents(conceptId);

    if (parents.length === 0) {
      return [];
    }

    // Get siblings (other children of same parent)
    const siblings: SnomedConceptSimple[] = [];
    for (const parent of parents.slice(0, 2)) {
      // Limit to first 2 parents
      const children = await this.getChildren(parent.conceptId, Math.floor(limit / 2));
      for (const child of children) {
        if (child.conceptId !== conceptId && siblings.length < limit) {
          siblings.push(child);
        }
      }
    }

    return siblings;
  }

  /**
   * Expand a concept to include all related concepts
   *
   * @param conceptId Concept to expand
   * @param options Expansion options
   * @returns Expanded concept set
   */
  async expandConcept(
    conceptId: string,
    options?: Partial<ExpansionOptions>
  ): Promise<ExpansionResult> {
    const { direction = 'down', maxDepth = 1 } = options || {};

    const sourceConcept = await this.getConcept(conceptId);

    const expanded: ExpansionResult['expanded'] = [];

    if (direction === 'up' || direction === 'both') {
      const ancestors = await this.getAncestors({ conceptId, limit: maxDepth * 10 });
      for (const ancestor of ancestors.ancestors || []) {
        expanded.push({
          concept: {
            id: ancestor.concept.conceptId,
            identifier: {
              system: 'snomed-ct',
              code: ancestor.concept.conceptId,
              display: ancestor.concept.pt,
            },
            equivalentIdentifiers: [],
            preferredTerm: ancestor.concept.pt,
            labels: { en: ancestor.concept.pt },
            synonyms: [],
            relationships: [],
            status: ancestor.concept.active ? 'active' : 'inactive',
          },
          distance: Math.abs(ancestor.depth),
          path: [],
        });
      }
    }

    if (direction === 'down' || direction === 'both') {
      const descendants = await this.getDescendants({ conceptId, limit: maxDepth * 10 });
      for (const descendant of descendants.descendants || []) {
        expanded.push({
          concept: {
            id: descendant.concept.conceptId,
            identifier: {
              system: 'snomed-ct',
              code: descendant.concept.conceptId,
              display: descendant.concept.pt,
            },
            equivalentIdentifiers: [],
            preferredTerm: descendant.concept.pt,
            labels: { en: descendant.concept.pt },
            synonyms: [],
            relationships: [],
            status: descendant.concept.active ? 'active' : 'inactive',
          },
          distance: descendant.depth,
          path: [],
        });
      }
    }

    return {
      source: {
        id: sourceConcept.conceptId,
        identifier: {
          system: 'snomed-ct',
          code: sourceConcept.conceptId,
          display: sourceConcept.pt,
        },
        equivalentIdentifiers: [],
        preferredTerm: sourceConcept.pt,
        labels: { en: sourceConcept.pt },
        synonyms: sourceConcept.descriptions?.map((d) => d.term) || [],
        relationships: [],
        status: sourceConcept.active ? 'active' : 'inactive',
      },
      expanded,
      total: expanded.length,
    };
  }

  // ===========================================================================
  // VALIDATION METHODS
  // ===========================================================================

  /**
   * Check if a concept ID is valid
   *
   * @param conceptId SNOMED CT concept ID to validate
   * @returns True if concept exists and is active
   */
  async isValidConcept(conceptId: string): Promise<boolean> {
    try {
      const concept = await this.getConcept(conceptId);
      return concept.active;
    } catch {
      return false;
    }
  }

  /**
   * Validate a list of concept IDs
   *
   * @param conceptIds Array of concept IDs to validate
   * @returns Validation results for each concept
   */
  async validateConcepts(
    conceptIds: string[]
  ): Promise<Map<string, { valid: boolean; active: boolean; message?: string }>> {
    const results = new Map<
      string,
      { valid: boolean; active: boolean; message?: string }
    >();

    try {
      const concepts = await this.getConceptsBatch(conceptIds);
      const foundIds = new Set(concepts.map((c) => c.conceptId));

      for (const id of conceptIds) {
        if (foundIds.has(id)) {
          const concept = concepts.find((c) => c.conceptId === id);
          results.set(id, {
            valid: true,
            active: concept?.active ?? false,
            message: concept?.active ? undefined : 'Concept is inactive',
          });
        } else {
          results.set(id, {
            valid: false,
            active: false,
            message: 'Concept not found',
          });
        }
      }
    } catch (error) {
      for (const id of conceptIds) {
        results.set(id, {
          valid: false,
          active: false,
          message: error instanceof Error ? error.message : 'Validation failed',
        });
      }
    }

    return results;
  }

  // ===========================================================================
  // UTILITY METHODS
  // ===========================================================================

  /**
   * Get available SNOMED CT editions
   *
   * @returns List of available editions
   */
  async getEditions(): Promise<Array<{ code: string; name: string }>> {
    const endpoint = '/codesystems';

    interface CodeSystem {
      shortName: string;
      name: string;
    }

    const response = await apiRequest<{ items: CodeSystem[] }>(endpoint);

    return response.items.map((item) => ({
      code: item.shortName,
      name: item.name,
    }));
  }

  /**
   * Check API health and connectivity
   *
   * @returns True if API is accessible
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.getEditions();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clear the response cache
   */
  clearCache(): void {
    cache.clear();
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

/**
 * Default SNOMED Browser service instance
 * Uses MAIN edition for international content
 */
export const snomedBrowser = new SnomedBrowserService();

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Quick search for SNOMED concepts by term
 */
export async function searchSnomed(term: string, limit = 25): Promise<SnomedSearchResponse> {
  return snomedBrowser.search({ term, limit });
}

/**
 * Quick ECL query
 */
export async function querySnomedECL(ecl: string, limit = 50): Promise<SnomedSearchResponse> {
  return snomedBrowser.searchByECL({ ecl, limit });
}

/**
 * Quick concept lookup
 */
export async function getSnomedConcept(conceptId: string): Promise<SnomedConceptFull> {
  return snomedBrowser.getConcept(conceptId);
}

/**
 * Get descendants of a concept using ECL
 */
export async function getSnomedDescendants(
  conceptId: string,
  limit = 100
): Promise<SnomedConceptSimple[]> {
  const result = await snomedBrowser.getDescendants({ conceptId, limit });
  return (result.descendants || []).map((d) => d.concept);
}

/**
 * Check if a concept is valid
 */
export async function isSnomedValid(conceptId: string): Promise<boolean> {
  return snomedBrowser.isValidConcept(conceptId);
}

export default snomedBrowser;
