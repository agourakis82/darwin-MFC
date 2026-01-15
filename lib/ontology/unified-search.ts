/**
 * UNIFIED SEMANTIC SEARCH - DARWIN-MFC
 * ====================================
 *
 * Provides unified semantic search across all medical ontologies,
 * medications, diseases, and clinical data.
 *
 * Features:
 * - Search by any ontology code (ICD-10, ICD-11, SNOMED, LOINC, etc.)
 * - Semantic search by term in any of 9 languages
 * - Fuzzy matching with relevance scoring
 * - Cross-ontology result enrichment
 * - Type-specific search (diseases, medications, labs, genes)
 */

import type { LanguageCode, OntologySystem } from './types/ontology';
import {
  getUnifiedEntities,
  findEntityByCode,
  getCrossMappings,
  type UnifiedEntity,
  type UnifiedEntityType,
} from './cross-mapping';
import { searchICD11, type ICD11SearchResult } from './icd11';
import { searchTestsByComponent, type LOINCTest } from './loinc';
import {
  getGeneBySymbol,
  getDrugsByGene,
  type PharmGKBGene,
} from './pharmgkb';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Search result from unified search
 */
export interface UnifiedSearchResult {
  /** Unique result ID */
  id: string;

  /** Entity type */
  type: UnifiedEntityType;

  /** Primary display title */
  title: string;

  /** Title in all available languages */
  titles?: Partial<Record<LanguageCode, string>>;

  /** Brief description or definition */
  description?: string;

  /** Relevance score (0-100) */
  score: number;

  /** What the query matched on */
  matchedOn: 'code' | 'title' | 'synonym' | 'definition' | 'relation';

  /** The specific term/code that matched */
  matchedTerm?: string;

  /** Which ontology system was the primary match */
  matchedSystem?: OntologySystem;

  /** All ontology codes for this result */
  codes: {
    icd10?: string[];
    icd11?: string[];
    snomedCT?: string;
    ciap2?: string[];
    loinc?: string;
    atc?: string;
    doid?: string;
    meshId?: string;
    umlsCui?: string;
  };

  /** Category/chapter for grouping */
  category?: string;

  /** Related entities for context */
  related?: Array<{
    id: string;
    type: UnifiedEntityType;
    title: string;
    relation: string;
  }>;

  /** Source data for detailed view */
  sourceData?: UnifiedEntity;
}

/**
 * Search options
 */
export interface UnifiedSearchOptions {
  /** Language for results (default: 'pt') */
  language?: LanguageCode;

  /** Filter by entity types */
  types?: UnifiedEntityType[];

  /** Filter by ontology systems */
  systems?: OntologySystem[];

  /** Include fuzzy matching */
  fuzzy?: boolean;

  /** Minimum score threshold (0-100) */
  minScore?: number;

  /** Maximum results */
  limit?: number;

  /** Include related entities in results */
  includeRelated?: boolean;

  /** Include cross-mappings */
  includeCrossMappings?: boolean;
}

/**
 * Search response with metadata
 */
export interface UnifiedSearchResponse {
  /** Search results */
  results: UnifiedSearchResult[];

  /** Original query */
  query: string;

  /** Total matches (before limit) */
  total: number;

  /** Execution time in ms */
  executionTimeMs: number;

  /** Detected query type */
  queryType: 'code' | 'term' | 'mixed';

  /** Suggestions for related searches */
  suggestions?: string[];
}

// =============================================================================
// QUERY ANALYSIS
// =============================================================================

/**
 * Patterns for detecting ontology codes
 */
const CODE_PATTERNS: Record<string, RegExp> = {
  icd10: /^[A-Z]\d{2}(\.\d{1,2})?$/i,
  icd11: /^[A-Z0-9]{2,4}(\.[A-Z0-9]+)?$/i,
  loinc: /^\d{4,7}-\d$/,
  snomed: /^\d{6,18}$/,
  ciap2: /^[A-Z]\d{2}$/i,
  atc: /^[A-Z]\d{2}[A-Z]{2}\d{2}$/i,
  doid: /^DOID:\d+$/i,
  mesh: /^D\d{6}$/i,
  umls: /^C\d{7}$/i,
};

/**
 * Detect if query is a code and which system
 */
function detectCodeSystem(query: string): OntologySystem | null {
  const trimmed = query.trim().toUpperCase();

  // Check specific patterns
  if (CODE_PATTERNS.loinc.test(query)) return 'loinc';
  if (CODE_PATTERNS.snomed.test(query)) return 'snomed-ct';
  if (CODE_PATTERNS.doid.test(query)) return 'doid';
  if (CODE_PATTERNS.mesh.test(query)) return 'mesh';
  if (CODE_PATTERNS.umls.test(query)) return 'umls';
  if (CODE_PATTERNS.atc.test(query)) return 'atc';
  if (CODE_PATTERNS.ciap2.test(query)) return 'ciap2';

  // ICD-10 vs ICD-11 disambiguation
  if (CODE_PATTERNS.icd10.test(query)) {
    // ICD-10 typically starts with letter followed by 2 digits
    return 'icd10';
  }

  // ICD-11 codes are more varied (5A11, BA00, etc.)
  if (/^[0-9A-Z]{2,4}$/i.test(trimmed)) {
    return 'icd11';
  }

  return null;
}

/**
 * Analyze query type
 */
function analyzeQuery(query: string): {
  type: 'code' | 'term' | 'mixed';
  detectedSystem?: OntologySystem;
  normalizedQuery: string;
} {
  const trimmed = query.trim();
  const system = detectCodeSystem(trimmed);

  if (system) {
    return {
      type: 'code',
      detectedSystem: system,
      normalizedQuery: trimmed.toUpperCase(),
    };
  }

  // Check if mixed (contains both code-like and text)
  const hasCode = Object.values(CODE_PATTERNS).some(p => p.test(trimmed.split(/\s+/)[0]));
  const hasText = /[a-zA-Z]{3,}/.test(trimmed);

  if (hasCode && hasText) {
    return {
      type: 'mixed',
      normalizedQuery: trimmed.toLowerCase(),
    };
  }

  return {
    type: 'term',
    normalizedQuery: trimmed.toLowerCase(),
  };
}

// =============================================================================
// SEARCH FUNCTIONS
// =============================================================================

/**
 * Calculate text similarity score (simple Jaccard-like)
 */
function calculateSimilarity(text: string, query: string): number {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  // Exact match
  if (textLower === queryLower) return 100;

  // Contains exact query
  if (textLower.includes(queryLower)) {
    // Higher score if query is at start
    if (textLower.startsWith(queryLower)) return 90;
    return 80;
  }

  // Word-level matching
  const textWords = new Set(textLower.split(/\s+/));
  const queryWords = queryLower.split(/\s+/);
  const matchedWords = queryWords.filter(w => textWords.has(w));

  if (matchedWords.length > 0) {
    return 50 + (matchedWords.length / queryWords.length) * 30;
  }

  // Partial word matching
  const hasPartialMatch = queryWords.some(qw =>
    Array.from(textWords).some(tw => tw.includes(qw) || qw.includes(tw))
  );

  if (hasPartialMatch) return 40;

  return 0;
}

/**
 * Search by ontology code
 */
function searchByCode(
  code: string,
  system: OntologySystem | null,
  options: UnifiedSearchOptions
): UnifiedSearchResult[] {
  const results: UnifiedSearchResult[] = [];
  const language = options.language || 'pt';

  // Find entity by code
  const entity = findEntityByCode(code, system || undefined);

  if (entity) {
    results.push({
      id: entity.id,
      type: entity.type,
      title: entity.name[language] || entity.name.en || entity.name.pt || '',
      titles: entity.name,
      description: entity.definition?.[language] || entity.definition?.en,
      score: 100,
      matchedOn: 'code',
      matchedTerm: code,
      matchedSystem: entity.source,
      codes: {
        icd10: entity.codes.icd10,
        icd11: entity.codes.icd11,
        snomedCT: entity.codes.snomedCT,
        ciap2: entity.codes.ciap2,
        loinc: entity.codes.loinc,
        atc: entity.codes.atc,
        doid: entity.codes.doid,
        meshId: entity.codes.meshId,
        umlsCui: entity.codes.umlsCui,
      },
      sourceData: entity,
    });

    // Add cross-mappings if requested
    if (options.includeCrossMappings) {
      const mappings = getCrossMappings(code, { sourceSystem: system || undefined });
      // Cross-mappings are already in the entity codes
    }
  }

  // Also search ICD-11 directly for more context
  if (!system || system === 'icd11') {
    const icd11Results = searchICD11(code, { language, limit: 5 });
    icd11Results.forEach((r: ICD11SearchResult) => {
      // Avoid duplicates
      if (!results.some(existing => existing.codes.icd11?.includes(r.entity.code))) {
        results.push({
          id: `icd11-${r.entity.code}`,
          type: 'disease',
          title: r.entity.title[language] || r.entity.title.en || '',
          titles: r.entity.title,
          description: r.entity.definition?.[language] || r.entity.definition?.en,
          score: r.score,
          matchedOn: r.matchedOn === 'code' ? 'code' : 'title',
          matchedTerm: code,
          matchedSystem: 'icd11',
          codes: {
            icd11: [r.entity.code],
            icd10: r.entity.crossMappings.icd10,
            snomedCT: r.entity.crossMappings.snomedCT,
            ciap2: r.entity.crossMappings.ciap2,
            doid: r.entity.crossMappings.doid,
            meshId: r.entity.crossMappings.meshId,
            umlsCui: r.entity.crossMappings.umlsCui,
          },
        });
      }
    });
  }

  return results;
}

/**
 * Search by term across all data
 */
function searchByTerm(
  term: string,
  options: UnifiedSearchOptions
): UnifiedSearchResult[] {
  const results: UnifiedSearchResult[] = [];
  const language = options.language || 'pt';
  const entities = getUnifiedEntities();

  // Search unified entities
  entities.forEach(entity => {
    // Filter by type if specified
    if (options.types && !options.types.includes(entity.type)) return;

    let bestScore = 0;
    let matchedOn: UnifiedSearchResult['matchedOn'] = 'title';
    let matchedTerm: string | undefined;

    // Check name in target language
    const name = entity.name[language];
    if (name) {
      const score = calculateSimilarity(name, term);
      if (score > bestScore) {
        bestScore = score;
        matchedOn = 'title';
        matchedTerm = name;
      }
    }

    // Check name in all languages
    Object.entries(entity.name).forEach(([, value]) => {
      if (value) {
        const score = calculateSimilarity(value, term) * 0.9; // Slight penalty for non-target language
        if (score > bestScore) {
          bestScore = score;
          matchedOn = 'title';
          matchedTerm = value;
        }
      }
    });

    // Check synonyms
    entity.synonyms?.forEach(syn => {
      const score = calculateSimilarity(syn, term) * 0.85; // Penalty for synonym match
      if (score > bestScore) {
        bestScore = score;
        matchedOn = 'synonym';
        matchedTerm = syn;
      }
    });

    // Check definition
    const def = entity.definition?.[language] || entity.definition?.en;
    if (def) {
      const score = calculateSimilarity(def, term) * 0.6; // Lower score for definition match
      if (score > bestScore) {
        bestScore = score;
        matchedOn = 'definition';
        matchedTerm = def.substring(0, 100);
      }
    }

    // Add if above minimum score
    const minScore = options.minScore || 30;
    if (bestScore >= minScore) {
      results.push({
        id: entity.id,
        type: entity.type,
        title: entity.name[language] || entity.name.en || entity.name.pt || '',
        titles: entity.name,
        description: entity.definition?.[language] || entity.definition?.en,
        score: Math.round(bestScore),
        matchedOn,
        matchedTerm,
        matchedSystem: entity.source,
        codes: {
          icd10: entity.codes.icd10,
          icd11: entity.codes.icd11,
          snomedCT: entity.codes.snomedCT,
          ciap2: entity.codes.ciap2,
          loinc: entity.codes.loinc,
          atc: entity.codes.atc,
          doid: entity.codes.doid,
          meshId: entity.codes.meshId,
          umlsCui: entity.codes.umlsCui,
        },
        sourceData: entity,
      });
    }
  });

  // Also search ICD-11 directly
  if (!options.types || options.types.includes('disease')) {
    const icd11Results = searchICD11(term, { language, limit: 20 });
    icd11Results.forEach((r: ICD11SearchResult) => {
      // Avoid duplicates
      if (!results.some(existing => existing.codes.icd11?.includes(r.entity.code))) {
        results.push({
          id: `icd11-${r.entity.code}`,
          type: 'disease',
          title: r.entity.title[language] || r.entity.title.en || '',
          titles: r.entity.title,
          description: r.entity.definition?.[language] || r.entity.definition?.en,
          score: r.score,
          matchedOn: r.matchedOn === 'synonym' ? 'synonym' : 'title',
          matchedSystem: 'icd11',
          codes: {
            icd11: [r.entity.code],
            icd10: r.entity.crossMappings.icd10,
            snomedCT: r.entity.crossMappings.snomedCT,
            ciap2: r.entity.crossMappings.ciap2,
            doid: r.entity.crossMappings.doid,
            meshId: r.entity.crossMappings.meshId,
            umlsCui: r.entity.crossMappings.umlsCui,
          },
        });
      }
    });
  }

  // Search LOINC if looking for lab tests
  if (!options.types || options.types.includes('lab-test')) {
    const loincResults = searchTestsByComponent(term);
    loincResults.slice(0, 10).forEach((test: LOINCTest) => {
      if (!results.some(existing => existing.codes.loinc === test.code)) {
        const titlePt = test.consumerNamePt || test.shortName;
        const titleEn = test.consumerNameEn || test.longName;
        results.push({
          id: `loinc-${test.code}`,
          type: 'lab-test',
          title: language === 'pt' ? titlePt : titleEn,
          titles: { pt: titlePt, en: titleEn },
          score: 75,
          matchedOn: 'title',
          matchedSystem: 'loinc',
          codes: {
            loinc: test.code,
          },
        });
      }
    });
  }

  // Search PharmGKB genes if looking for genes
  if (!options.types || options.types.includes('gene')) {
    const gene = getGeneBySymbol(term.toUpperCase());
    if (gene) {
      results.push({
        id: `gene-${gene.gene}`,
        type: 'gene',
        title: gene.gene,
        description: gene.description,
        score: 100,
        matchedOn: 'title',
        matchedSystem: 'pharmgkb',
        codes: {
          umlsCui: gene.pharmgkbId,
        },
        related: gene.affectedDrugs.slice(0, 5).map(drug => ({
          id: `drug-${drug.drugName}`,
          type: 'medication' as UnifiedEntityType,
          title: drug.drugName,
          relation: 'affected by gene',
        })),
      });
    }
  }

  return results;
}

/**
 * Main unified search function
 */
export function unifiedSearch(
  query: string,
  options: UnifiedSearchOptions = {}
): UnifiedSearchResponse {
  const startTime = Date.now();
  const { limit = 20 } = options;

  // Analyze query
  const analysis = analyzeQuery(query);

  let results: UnifiedSearchResult[] = [];

  if (analysis.type === 'code') {
    // Code search
    results = searchByCode(analysis.normalizedQuery, analysis.detectedSystem || null, options);
  } else if (analysis.type === 'term') {
    // Term search
    results = searchByTerm(analysis.normalizedQuery, options);
  } else {
    // Mixed: try both
    const codeResults = searchByCode(analysis.normalizedQuery.split(/\s+/)[0], null, options);
    const termResults = searchByTerm(analysis.normalizedQuery, options);
    results = [...codeResults, ...termResults];
  }

  // Deduplicate by ID
  const seen = new Set<string>();
  results = results.filter(r => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });

  // Sort by score
  results.sort((a, b) => b.score - a.score);

  // Apply limit
  const total = results.length;
  results = results.slice(0, limit);

  // Generate suggestions
  const suggestions = generateSuggestions(query, results);

  return {
    results,
    query,
    total,
    executionTimeMs: Date.now() - startTime,
    queryType: analysis.type,
    suggestions,
  };
}

/**
 * Generate search suggestions
 */
function generateSuggestions(query: string, results: UnifiedSearchResult[]): string[] {
  const suggestions: string[] = [];

  // If no results, suggest related terms
  if (results.length === 0) {
    suggestions.push(`Tente buscar por código (ex: E11, I10, J45)`);
    suggestions.push(`Ou busque por nome (ex: diabetes, hipertensão)`);
    return suggestions;
  }

  // If results have related entities, suggest them
  results.slice(0, 3).forEach(r => {
    r.related?.slice(0, 2).forEach(rel => {
      if (!suggestions.includes(rel.title)) {
        suggestions.push(rel.title);
      }
    });
  });

  return suggestions.slice(0, 5);
}

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Quick search for diseases
 */
export function searchDiseases(
  query: string,
  language: LanguageCode = 'pt',
  limit = 10
): UnifiedSearchResult[] {
  const response = unifiedSearch(query, {
    language,
    types: ['disease'],
    limit,
  });
  return response.results;
}

/**
 * Quick search for medications
 */
export function searchMedications(
  query: string,
  language: LanguageCode = 'pt',
  limit = 10
): UnifiedSearchResult[] {
  const response = unifiedSearch(query, {
    language,
    types: ['medication'],
    limit,
  });
  return response.results;
}

/**
 * Quick search for lab tests
 */
export function searchLabTests(
  query: string,
  language: LanguageCode = 'pt',
  limit = 10
): UnifiedSearchResult[] {
  const response = unifiedSearch(query, {
    language,
    types: ['lab-test'],
    limit,
  });
  return response.results;
}

/**
 * Quick search for genes
 */
export function searchGenes(
  query: string,
  limit = 10
): UnifiedSearchResult[] {
  const response = unifiedSearch(query, {
    types: ['gene'],
    limit,
  });
  return response.results;
}

/**
 * Search by any code and get all equivalent codes
 */
export function searchByCodeWithMappings(
  code: string
): {
  entity: UnifiedSearchResult | null;
  mappings: Array<{ system: OntologySystem; code: string }>;
} {
  const response = unifiedSearch(code, {
    includeCrossMappings: true,
    limit: 1,
  });

  if (response.results.length === 0) {
    return { entity: null, mappings: [] };
  }

  const entity = response.results[0];
  const mappings: Array<{ system: OntologySystem; code: string }> = [];

  if (entity.codes.icd10) {
    entity.codes.icd10.forEach(c => mappings.push({ system: 'icd10', code: c }));
  }
  if (entity.codes.icd11) {
    entity.codes.icd11.forEach(c => mappings.push({ system: 'icd11', code: c }));
  }
  if (entity.codes.snomedCT) {
    mappings.push({ system: 'snomed-ct', code: entity.codes.snomedCT });
  }
  if (entity.codes.ciap2) {
    entity.codes.ciap2.forEach(c => mappings.push({ system: 'ciap2', code: c }));
  }
  if (entity.codes.loinc) {
    mappings.push({ system: 'loinc', code: entity.codes.loinc });
  }
  if (entity.codes.doid) {
    mappings.push({ system: 'doid', code: entity.codes.doid });
  }
  if (entity.codes.meshId) {
    mappings.push({ system: 'mesh', code: entity.codes.meshId });
  }
  if (entity.codes.umlsCui) {
    mappings.push({ system: 'umls', code: entity.codes.umlsCui });
  }

  return { entity, mappings };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  unifiedSearch,
  searchDiseases,
  searchMedications,
  searchLabTests,
  searchGenes,
  searchByCodeWithMappings,
};
