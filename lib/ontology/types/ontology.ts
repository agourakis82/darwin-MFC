/**
 * DARWIN-MFC ONTOLOGY CORE TYPES
 * ==============================
 *
 * Core type definitions for the unified ontology service layer.
 * Provides abstractions over multiple medical terminologies:
 * - SNOMED-CT (clinical concepts)
 * - ICD-10/ICD-11 (classification)
 * - ATC (medications)
 * - RxNorm (medications, US)
 * - LOINC (lab tests)
 * - UMLS (unified mapping)
 */

// =============================================================================
// ONTOLOGY SYSTEMS
// =============================================================================

/**
 * Supported ontology systems
 */
export type OntologySystem =
  | 'snomed-ct'
  | 'icd10'
  | 'icd11'
  | 'atc'
  | 'rxnorm'
  | 'loinc'
  | 'umls'
  | 'mesh'
  | 'hpo'      // Human Phenotype Ontology
  | 'doid'     // Disease Ontology
  | 'ordo'     // Orphanet Rare Diseases
  | 'ciap2'    // ICPC-2 (Primary Care)
  | 'pharmgkb' // PharmGKB (Pharmacogenomics)
  | 'drugbank';

/**
 * Ontology system metadata
 */
export interface OntologySystemInfo {
  id: OntologySystem;
  name: string;
  version?: string;
  url?: string;
  description: string;
  apiAvailable: boolean;
}

export const ONTOLOGY_SYSTEMS: Record<OntologySystem, OntologySystemInfo> = {
  'snomed-ct': {
    id: 'snomed-ct',
    name: 'SNOMED CT',
    version: 'International Edition 2024-01',
    url: 'https://browser.ihtsdotools.org',
    description: 'Systematized Nomenclature of Medicine Clinical Terms',
    apiAvailable: true,
  },
  'icd10': {
    id: 'icd10',
    name: 'ICD-10',
    version: '2024',
    url: 'https://icd.who.int/browse10',
    description: 'International Classification of Diseases, 10th Revision',
    apiAvailable: false,
  },
  'icd11': {
    id: 'icd11',
    name: 'ICD-11',
    version: '2024-01',
    url: 'https://icd.who.int/icdapi',
    description: 'International Classification of Diseases, 11th Revision',
    apiAvailable: true,
  },
  'atc': {
    id: 'atc',
    name: 'ATC',
    version: '2024',
    url: 'https://www.whocc.no/atc_ddd_index',
    description: 'Anatomical Therapeutic Chemical Classification',
    apiAvailable: false,
  },
  'rxnorm': {
    id: 'rxnorm',
    name: 'RxNorm',
    version: 'Current',
    url: 'https://rxnav.nlm.nih.gov',
    description: 'US normalized names for clinical drugs',
    apiAvailable: true,
  },
  'loinc': {
    id: 'loinc',
    name: 'LOINC',
    version: '2.77',
    url: 'https://loinc.org',
    description: 'Logical Observation Identifiers Names and Codes',
    apiAvailable: true,
  },
  'umls': {
    id: 'umls',
    name: 'UMLS',
    version: '2024AA',
    url: 'https://www.nlm.nih.gov/research/umls',
    description: 'Unified Medical Language System',
    apiAvailable: true,
  },
  'mesh': {
    id: 'mesh',
    name: 'MeSH',
    version: '2024',
    url: 'https://meshb.nlm.nih.gov',
    description: 'Medical Subject Headings',
    apiAvailable: true,
  },
  'hpo': {
    id: 'hpo',
    name: 'HPO',
    version: 'Current',
    url: 'https://hpo.jax.org',
    description: 'Human Phenotype Ontology',
    apiAvailable: true,
  },
  'doid': {
    id: 'doid',
    name: 'DOID',
    version: 'Current',
    url: 'https://disease-ontology.org',
    description: 'Disease Ontology',
    apiAvailable: true,
  },
  'ordo': {
    id: 'ordo',
    name: 'ORDO',
    version: 'Current',
    url: 'https://www.orpha.net',
    description: 'Orphanet Rare Disease Ontology',
    apiAvailable: true,
  },
  'ciap2': {
    id: 'ciap2',
    name: 'CIAP-2/ICPC-2',
    version: '2',
    description: 'International Classification of Primary Care',
    apiAvailable: false,
  },
  'pharmgkb': {
    id: 'pharmgkb',
    name: 'PharmGKB',
    version: 'Current',
    url: 'https://www.pharmgkb.org',
    description: 'Pharmacogenomics Knowledge Base',
    apiAvailable: true,
  },
  'drugbank': {
    id: 'drugbank',
    name: 'DrugBank',
    version: '5.1',
    url: 'https://go.drugbank.com',
    description: 'Drug and Drug Target Database',
    apiAvailable: false,
  },
};

// =============================================================================
// CONCEPT IDENTIFIER
// =============================================================================

/**
 * Unique identifier for a concept in an ontology system
 */
export interface OntologyIdentifier {
  /** The ontology system (e.g., 'snomed-ct', 'icd11') */
  system: OntologySystem;

  /** The code within the system */
  code: string;

  /** Human-readable display name */
  display: string;

  /** Version of the terminology (optional) */
  version?: string;
}

/**
 * Create an ontology identifier
 */
export function createIdentifier(
  system: OntologySystem,
  code: string,
  display: string,
  version?: string
): OntologyIdentifier {
  return { system, code, display, version };
}

// =============================================================================
// CONCEPT
// =============================================================================

/**
 * Status of a concept in the ontology
 */
export type ConceptStatus = 'active' | 'inactive' | 'deprecated';

/**
 * A unified concept representation across ontologies
 */
export interface Concept {
  /** Unique internal identifier */
  id: string;

  /** Primary identifier in the source ontology */
  identifier: OntologyIdentifier;

  /** Equivalent identifiers in other ontologies */
  equivalentIdentifiers: OntologyIdentifier[];

  /** Preferred term (language-specific) */
  preferredTerm: string;

  /** Labels in different languages */
  labels: Record<string, string>;

  /** Synonyms and alternate names */
  synonyms: string[];

  /** Definition of the concept */
  definition?: string;

  /** Relationships to other concepts */
  relationships: ConceptRelationship[];

  /** Semantic type/category */
  semanticType?: SemanticType;

  /** Status in the terminology */
  status: ConceptStatus;

  /** Last modification date */
  lastModified?: string;
}

// =============================================================================
// CONCEPT RELATIONSHIPS
// =============================================================================

/**
 * Types of relationships between concepts
 */
export type RelationshipType =
  // Hierarchical
  | 'is-a'           // Subtype/parent relationship
  | 'part-of'        // Component/whole relationship

  // Clinical
  | 'treats'         // Medication treats condition
  | 'causes'         // Condition causes symptom
  | 'associated-with' // General association
  | 'contraindicated-with' // Drug contraindication
  | 'interacts-with' // Drug-drug interaction

  // Anatomical
  | 'finding-site'   // Anatomical location
  | 'procedure-site' // Where procedure is performed

  // Temporal
  | 'occurs-before'  // Temporal ordering
  | 'occurs-after'
  | 'occurs-during'

  // Mapping
  | 'same-as'        // Exact equivalence
  | 'broader-than'   // Narrower concept
  | 'narrower-than'  // Broader concept
  | 'related-to';    // General relation

/**
 * Relationship between two concepts
 */
export interface ConceptRelationship {
  /** Type of relationship */
  type: RelationshipType;

  /** Target concept identifier */
  targetId: string;

  /** Target concept display name */
  targetDisplay: string;

  /** Target ontology system (if different from source) */
  targetSystem?: OntologySystem;

  /** Relationship strength/confidence (0-1) */
  confidence?: number;

  /** Source of the relationship */
  source?: 'asserted' | 'inferred' | 'mapped';

  /** Additional attributes */
  attributes?: Record<string, string>;
}

// =============================================================================
// SEMANTIC TYPES
// =============================================================================

/**
 * High-level semantic categories for concepts
 */
export type SemanticType =
  // Clinical
  | 'disorder'
  | 'finding'
  | 'procedure'
  | 'body-structure'
  | 'organism'
  | 'substance'

  // Pharmacological
  | 'pharmaceutical'
  | 'ingredient'
  | 'dose-form'
  | 'route'

  // Laboratory
  | 'observable'
  | 'specimen'
  | 'unit'

  // Administrative
  | 'qualifier'
  | 'attribute'
  | 'metadata'
  | 'record';

// =============================================================================
// SEARCH & FILTERING
// =============================================================================

/**
 * Search parameters for concept lookup
 */
export interface ConceptSearchParams {
  /** Search query string */
  query: string;

  /** Target ontology systems (default: all) */
  systems?: OntologySystem[];

  /** Filter by semantic type */
  semanticTypes?: SemanticType[];

  /** Filter by status */
  status?: ConceptStatus[];

  /** Language for labels */
  language?: string;

  /** Maximum results */
  limit?: number;

  /** Pagination offset */
  offset?: number;

  /** Include inactive/deprecated concepts */
  includeInactive?: boolean;

  /** Include synonyms in search */
  includeSynonyms?: boolean;

  /** Fuzzy matching */
  fuzzy?: boolean;
}

/**
 * Search result with relevance scoring
 */
export interface ConceptSearchResult {
  concept: Concept;
  score: number;
  matchedOn: 'preferred' | 'synonym' | 'code' | 'definition';
  highlight?: string;
}

/**
 * Paginated search response
 */
export interface ConceptSearchResponse {
  results: ConceptSearchResult[];
  total: number;
  offset: number;
  limit: number;
  query: string;
  executionTimeMs: number;
}

// =============================================================================
// HIERARCHY & NAVIGATION
// =============================================================================

/**
 * Node in a concept hierarchy tree
 */
export interface HierarchyNode {
  concept: Concept;
  children: HierarchyNode[];
  parent?: HierarchyNode;
  depth: number;
  isLeaf: boolean;
  childCount: number;
}

/**
 * Path from root to a specific concept
 */
export interface ConceptPath {
  concepts: Concept[];
  relationships: ConceptRelationship[];
}

// =============================================================================
// CROSS-ONTOLOGY MAPPING
// =============================================================================

/**
 * Mapping quality/confidence level
 */
export type MappingConfidence =
  | 'exact'      // 100% equivalent
  | 'broad'      // Source is narrower than target
  | 'narrow'     // Source is broader than target
  | 'related'    // Conceptually related but not equivalent
  | 'inexact';   // Approximate match

/**
 * Cross-ontology concept mapping
 */
export interface OntologyMapping {
  /** Source concept */
  source: OntologyIdentifier;

  /** Target concept */
  target: OntologyIdentifier;

  /** Mapping confidence */
  confidence: MappingConfidence;

  /** Numeric confidence score (0-1) */
  score: number;

  /** Mapping source/method */
  mappingSource: 'umls' | 'manual' | 'inferred' | 'external';

  /** Validation status */
  validated?: boolean;

  /** Notes about the mapping */
  notes?: string;
}

// =============================================================================
// EXPANSION & INFERENCE
// =============================================================================

/**
 * Direction for concept expansion
 */
export type ExpansionDirection = 'up' | 'down' | 'both';

/**
 * Options for semantic expansion
 */
export interface ExpansionOptions {
  /** Direction to expand (ancestors, descendants, or both) */
  direction: ExpansionDirection;

  /** Maximum depth to expand */
  maxDepth: number;

  /** Relationship types to follow */
  relationshipTypes?: RelationshipType[];

  /** Include cross-ontology mappings */
  includeMappings?: boolean;

  /** Target systems for mappings */
  mappingSystems?: OntologySystem[];
}

/**
 * Result of semantic expansion
 */
export interface ExpansionResult {
  /** Original concept */
  source: Concept;

  /** Expanded concepts with distance */
  expanded: Array<{
    concept: Concept;
    distance: number;
    path: ConceptRelationship[];
  }>;

  /** Total concepts found */
  total: number;
}

// =============================================================================
// CLINICAL CODING
// =============================================================================

/**
 * Suggested clinical code
 */
export interface CodeSuggestion {
  identifier: OntologyIdentifier;
  confidence: number;
  matchType: 'exact' | 'partial' | 'semantic';
  context?: string;
}

/**
 * Clinical coding result
 */
export interface CodingResult {
  /** Input text */
  text: string;

  /** Suggested codes ordered by confidence */
  suggestions: CodeSuggestion[];

  /** Entities extracted from text */
  entities?: ExtractedEntity[];

  /** Processing time */
  processingTimeMs: number;
}

/**
 * Entity extracted from clinical text
 */
export interface ExtractedEntity {
  text: string;
  start: number;
  end: number;
  type: SemanticType;
  concept?: Concept;
  confidence: number;
}

// =============================================================================
// VALIDATION
// =============================================================================

/**
 * Code validation result
 */
export interface ValidationResult {
  identifier: OntologyIdentifier;
  isValid: boolean;
  status: ConceptStatus;
  message?: string;
  suggestions?: OntologyIdentifier[];
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Language code (ISO 639-1)
 */
export type LanguageCode =
  | 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi'
  | 'de' | 'it' | 'ja' | 'ko' | 'nl' | 'pl' | 'sv' | 'tr';

/**
 * Region code (ISO 3166-1 alpha-2)
 */
export type RegionCode = 'BR' | 'IN' | 'EU' | 'US' | 'UK' | 'WHO';

/**
 * Cache entry for ontology data
 */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  source: OntologySystem;
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  ONTOLOGY_SYSTEMS,
  createIdentifier,
};
