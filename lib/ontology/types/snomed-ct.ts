/**
 * DARWIN-MFC SNOMED-CT TYPES
 * ==========================
 *
 * Type definitions for SNOMED CT integration including:
 * - ECL (Expression Constraint Language) support
 * - SNOMED CT Browser API types
 * - Concept hierarchy types
 * - Relationship types
 */

import type {
  OntologyIdentifier,
  Concept,
  ConceptRelationship,
  ConceptStatus,
  SemanticType,
} from './ontology';

// =============================================================================
// SNOMED CT EDITIONS
// =============================================================================

/**
 * Available SNOMED CT editions
 */
export type SnomedEdition =
  | 'MAIN'           // International Edition
  | 'SNOMEDCT-US'    // US Edition
  | 'SNOMEDCT-AU'    // Australian Edition
  | 'SNOMEDCT-UK'    // UK Edition
  | 'SNOMEDCT-ES'    // Spanish Edition
  | 'SNOMEDCT-BE'    // Belgian Edition
  | 'SNOMEDCT-NL'    // Dutch Edition
  | 'SNOMEDCT-SE'    // Swedish Edition
  | 'SNOMEDCT-NO'    // Norwegian Edition
  | 'SNOMEDCT-DK'    // Danish Edition
  | 'SNOMEDCT-CH'    // Swiss Edition
  | 'SNOMEDCT-EE'    // Estonian Edition
  | 'SNOMEDCT-NZ';   // New Zealand Edition

export interface SnomedEditionInfo {
  shortName: string;
  title: string;
  branchPath: string;
  defaultLanguageCode: string;
  effectiveTime?: string;
}

export const SNOMED_EDITIONS: Record<SnomedEdition, SnomedEditionInfo> = {
  'MAIN': {
    shortName: 'MAIN',
    title: 'SNOMED CT International Edition',
    branchPath: 'MAIN',
    defaultLanguageCode: 'en',
  },
  'SNOMEDCT-US': {
    shortName: 'SNOMEDCT-US',
    title: 'SNOMED CT US Edition',
    branchPath: 'MAIN/SNOMEDCT-US',
    defaultLanguageCode: 'en',
  },
  'SNOMEDCT-AU': {
    shortName: 'SNOMEDCT-AU',
    title: 'SNOMED CT Australian Edition',
    branchPath: 'MAIN/SNOMEDCT-AU',
    defaultLanguageCode: 'en',
  },
  'SNOMEDCT-UK': {
    shortName: 'SNOMEDCT-UK',
    title: 'SNOMED CT UK Edition',
    branchPath: 'MAIN/SNOMEDCT-UK',
    defaultLanguageCode: 'en',
  },
  'SNOMEDCT-ES': {
    shortName: 'SNOMEDCT-ES',
    title: 'SNOMED CT Spanish Edition',
    branchPath: 'MAIN/SNOMEDCT-ES',
    defaultLanguageCode: 'es',
  },
  'SNOMEDCT-BE': {
    shortName: 'SNOMEDCT-BE',
    title: 'SNOMED CT Belgian Edition',
    branchPath: 'MAIN/SNOMEDCT-BE',
    defaultLanguageCode: 'nl',
  },
  'SNOMEDCT-NL': {
    shortName: 'SNOMEDCT-NL',
    title: 'SNOMED CT Dutch Edition',
    branchPath: 'MAIN/SNOMEDCT-NL',
    defaultLanguageCode: 'nl',
  },
  'SNOMEDCT-SE': {
    shortName: 'SNOMEDCT-SE',
    title: 'SNOMED CT Swedish Edition',
    branchPath: 'MAIN/SNOMEDCT-SE',
    defaultLanguageCode: 'sv',
  },
  'SNOMEDCT-NO': {
    shortName: 'SNOMEDCT-NO',
    title: 'SNOMED CT Norwegian Edition',
    branchPath: 'MAIN/SNOMEDCT-NO',
    defaultLanguageCode: 'no',
  },
  'SNOMEDCT-DK': {
    shortName: 'SNOMEDCT-DK',
    title: 'SNOMED CT Danish Edition',
    branchPath: 'MAIN/SNOMEDCT-DK',
    defaultLanguageCode: 'da',
  },
  'SNOMEDCT-CH': {
    shortName: 'SNOMEDCT-CH',
    title: 'SNOMED CT Swiss Edition',
    branchPath: 'MAIN/SNOMEDCT-CH',
    defaultLanguageCode: 'de',
  },
  'SNOMEDCT-EE': {
    shortName: 'SNOMEDCT-EE',
    title: 'SNOMED CT Estonian Edition',
    branchPath: 'MAIN/SNOMEDCT-EE',
    defaultLanguageCode: 'et',
  },
  'SNOMEDCT-NZ': {
    shortName: 'SNOMEDCT-NZ',
    title: 'SNOMED CT New Zealand Edition',
    branchPath: 'MAIN/SNOMEDCT-NZ',
    defaultLanguageCode: 'en',
  },
};

// =============================================================================
// SNOMED CT CONCEPT
// =============================================================================

/**
 * Definition status of a SNOMED CT concept
 */
export type SnomedDefinitionStatus = 'PRIMITIVE' | 'FULLY_DEFINED';

/**
 * SNOMED CT-specific concept representation
 */
export interface SnomedConcept {
  /** SNOMED CT Identifier (SCTID) */
  conceptId: string;

  /** Active flag */
  active: boolean;

  /** Definition status */
  definitionStatus: SnomedDefinitionStatus;

  /** Module ID */
  moduleId: string;

  /** Effective time (YYYYMMDD) */
  effectiveTime: string;

  /** Fully Specified Name (FSN) */
  fsn: {
    term: string;
    lang: string;
  };

  /** Preferred term for display */
  pt: {
    term: string;
    lang: string;
  };

  /** All descriptions (synonyms) */
  descriptions?: SnomedDescription[];

  /** Relationships to other concepts */
  relationships?: SnomedRelationship[];

  /** Parent concepts (is-a) */
  parents?: SnomedConceptMini[];

  /** Child concepts (subtypes) */
  children?: SnomedConceptMini[];

  /** Inferred ancestors (all parents up the hierarchy) */
  ancestors?: SnomedConceptMini[];

  /** Semantic tag from FSN */
  semanticTag?: string;
}

/**
 * Minimal concept representation for hierarchy
 */
export interface SnomedConceptMini {
  conceptId: string;
  active: boolean;
  fsn: {
    term: string;
    lang: string;
  };
  pt: {
    term: string;
    lang: string;
  };
  definitionStatus?: SnomedDefinitionStatus;
}

// =============================================================================
// SNOMED CT DESCRIPTIONS
// =============================================================================

/**
 * Description type in SNOMED CT
 */
export type SnomedDescriptionType = 'FSN' | 'SYNONYM' | 'DEFINITION';

/**
 * Acceptability of a description in a language reference set
 */
export type SnomedAcceptability = 'PREFERRED' | 'ACCEPTABLE';

/**
 * A description (term) associated with a SNOMED CT concept
 */
export interface SnomedDescription {
  descriptionId: string;
  active: boolean;
  term: string;
  lang: string;
  type: SnomedDescriptionType;
  caseSignificance: 'CASE_INSENSITIVE' | 'INITIAL_CASE_INSENSITIVE' | 'CASE_SENSITIVE';
  acceptabilityMap?: Record<string, SnomedAcceptability>;
  moduleId: string;
  effectiveTime: string;
}

// =============================================================================
// SNOMED CT RELATIONSHIPS
// =============================================================================

/**
 * Characteristic type of a relationship
 */
export type SnomedCharacteristicType =
  | 'STATED_RELATIONSHIP'
  | 'INFERRED_RELATIONSHIP'
  | 'ADDITIONAL_RELATIONSHIP';

/**
 * Common SNOMED CT relationship types (Attribute concepts)
 */
export const SNOMED_RELATIONSHIP_TYPES = {
  IS_A: '116680003',
  FINDING_SITE: '363698007',
  ASSOCIATED_MORPHOLOGY: '116676008',
  CAUSATIVE_AGENT: '246075003',
  PROCEDURE_SITE: '363704007',
  METHOD: '260686004',
  DIRECT_SUBSTANCE: '363701004',
  HAS_ACTIVE_INGREDIENT: '127489000',
  HAS_DOSE_FORM: '411116001',
  OCCURRENCE: '246454002',
  INTERPRETS: '363714003',
  HAS_INTERPRETATION: '363713009',
  LATERALITY: '272741003',
  SEVERITY: '246112005',
  COURSE: '263502005',
  CLINICAL_COURSE: '263502005',
} as const;

/**
 * A relationship between two SNOMED CT concepts
 */
export interface SnomedRelationship {
  relationshipId: string;
  active: boolean;
  sourceId: string;
  destinationId: string;
  typeId: string;
  type: SnomedConceptMini;
  target: SnomedConceptMini;
  groupId: number;
  characteristicType: SnomedCharacteristicType;
  moduleId: string;
  effectiveTime: string;
}

// =============================================================================
// ECL (Expression Constraint Language)
// =============================================================================

/**
 * ECL constraint operators
 */
export type ECLOperator =
  | '<'    // Descendant of
  | '<<'   // Descendant or self
  | '>'    // Ancestor of
  | '>>'   // Ancestor or self
  | '^'    // Member of refset
  | '*'    // Any concept
  | 'AND'  // Conjunction
  | 'OR'   // Disjunction
  | 'MINUS' // Exclusion
  | ':'    // Refinement
  | '='    // Attribute value equals
  | '!='   // Attribute value not equals
  | ','    // Multiple values
  | '{'    // Attribute group start
  | '}'    // Attribute group end
  | '('    // Subexpression start
  | ')';   // Subexpression end

/**
 * ECL query configuration
 */
export interface ECLQuery {
  /** Raw ECL expression */
  expression: string;

  /** Human-readable description */
  description?: string;

  /** Expected result count (for validation) */
  expectedCount?: number;
}

/**
 * Pre-defined ECL queries for Darwin-MFC clinical domains
 */
export const DARWIN_ECL_QUERIES: Record<string, ECLQuery> = {
  // Cardiovascular
  CARDIOVASCULAR_DISORDERS: {
    expression: '<<49601007',
    description: 'All cardiovascular disorders',
  },
  HYPERTENSION: {
    expression: '<<38341003',
    description: 'Hypertensive disorders',
  },
  HEART_FAILURE: {
    expression: '<<84114007',
    description: 'Heart failure disorders',
  },
  ARRHYTHMIA: {
    expression: '<<698247007',
    description: 'Cardiac arrhythmias',
  },

  // Endocrine/Metabolic
  DIABETES_MELLITUS: {
    expression: '<<73211009',
    description: 'Diabetes mellitus disorders',
  },
  THYROID_DISORDERS: {
    expression: '<<14304000',
    description: 'Thyroid disorders',
  },
  LIPID_DISORDERS: {
    expression: '<<370992007',
    description: 'Lipid metabolism disorders',
  },

  // Respiratory
  RESPIRATORY_DISORDERS: {
    expression: '<<50043002',
    description: 'Respiratory tract disorders',
  },
  ASTHMA: {
    expression: '<<195967001',
    description: 'Asthma',
  },
  COPD: {
    expression: '<<13645005',
    description: 'COPD',
  },

  // Infectious
  INFECTIOUS_DISEASES: {
    expression: '<<40733004',
    description: 'Infectious diseases',
  },
  BACTERIAL_INFECTIONS: {
    expression: '<<87628006',
    description: 'Bacterial infections',
  },
  VIRAL_INFECTIONS: {
    expression: '<<34014006',
    description: 'Viral infections',
  },

  // Mental Health
  MENTAL_DISORDERS: {
    expression: '<<74732009',
    description: 'Mental disorders',
  },
  ANXIETY_DISORDERS: {
    expression: '<<197480006',
    description: 'Anxiety disorders',
  },
  DEPRESSIVE_DISORDERS: {
    expression: '<<35489007',
    description: 'Depressive disorders',
  },

  // Medications by therapeutic class
  ANTIHYPERTENSIVES: {
    expression: '<<372586001',
    description: 'Antihypertensive agents',
  },
  ANTIDIABETICS: {
    expression: '<<418218007',
    description: 'Antidiabetic agents',
  },
  ANTIBIOTICS: {
    expression: '<<281789004',
    description: 'Antibacterial agents',
  },
  ANALGESICS: {
    expression: '<<373265006',
    description: 'Analgesic agents',
  },

  // Procedures
  SURGICAL_PROCEDURES: {
    expression: '<<387713003',
    description: 'Surgical procedures',
  },
  DIAGNOSTIC_PROCEDURES: {
    expression: '<<103693007',
    description: 'Diagnostic procedures',
  },
};

// =============================================================================
// SIMPLIFIED CONCEPT (for API responses)
// =============================================================================

/**
 * Simplified SNOMED concept with string terms (for API convenience)
 */
export interface SnomedConceptSimple {
  conceptId: string;
  active: boolean;
  definitionStatus: SnomedDefinitionStatus;
  moduleId: string;
  effectiveTime: string;
  fsn: string;
  pt: string;
  id?: string;
}

/**
 * Full SNOMED concept with all details
 */
export interface SnomedConceptFull extends SnomedConceptSimple {
  descriptions?: SnomedDescription[];
  relationships?: SnomedRelationshipSimple[];
}

/**
 * Simplified relationship (for API responses)
 */
export interface SnomedRelationshipSimple {
  relationshipId: string;
  active: boolean;
  sourceId: string;
  destinationId: string;
  typeId: string;
  typePt: string;
  targetPt: string;
  characteristicTypeId: string;
  relationshipGroup: number;
}

/**
 * Search result item
 */
export interface SnomedSearchResult {
  concept: SnomedConceptSimple;
  score: number;
  term: string;
  active: boolean;
  fsn: string;
}

/**
 * Search response wrapper
 */
export interface SnomedSearchResponse {
  items: SnomedSearchResult[];
  total: number;
  limit: number;
  offset: number;
  searchAfter?: string;
  searchAfterArray?: string[];
}

/**
 * Hierarchy result for ancestors/descendants
 */
export interface SnomedHierarchyResult {
  sourceConcept: string;
  ancestors?: Array<{ concept: SnomedConceptSimple; depth: number }>;
  descendants?: Array<{ concept: SnomedConceptSimple; depth: number }>;
  total: number;
}

// =============================================================================
// SNOMED CT BROWSER API TYPES
// =============================================================================

/**
 * Search parameters for SNOMED CT Browser API
 */
export interface SnomedSearchParams {
  /** Search term */
  term: string;

  /** Branch path (edition) */
  branch?: string;

  /** Active concepts only */
  activeFilter?: boolean;

  /** Semantic tag filter */
  semanticTag?: string;

  /** Language codes for descriptions */
  language?: string[];

  /** Preferred or acceptable terms */
  preferredIn?: string;
  acceptableIn?: string;

  /** Concept IDs to search within (OR) */
  conceptIds?: string[];

  /** ECL filter */
  ecl?: string;

  /** Return limit */
  limit?: number;

  /** Offset for pagination */
  offset?: number;

  /** Search mode */
  searchMode?: 'STANDARD' | 'REGEX' | 'WHOLE_WORD';

  /** Include descendants in ECL */
  includeDescendants?: boolean;
}

/**
 * ECL evaluation response
 */
export interface ECLResponse {
  items: SnomedConceptMini[];
  total: number;
  limit: number;
  offset: number;
}

// =============================================================================
// REFERENCE SETS
// =============================================================================

/**
 * Reference set types
 */
export type RefsetType =
  | 'simple'
  | 'simpleMap'
  | 'complexMap'
  | 'extendedMap'
  | 'language'
  | 'descriptionType'
  | 'associationType'
  | 'moduleDependent'
  | 'attributeValue'
  | 'querySpecification';

/**
 * Reference set member
 */
export interface RefsetMember {
  memberId: string;
  active: boolean;
  moduleId: string;
  refsetId: string;
  referencedComponentId: string;
  additionalFields?: Record<string, string>;
  effectiveTime: string;
}

// =============================================================================
// SEMANTIC SIMILARITY
// =============================================================================

/**
 * Semantic similarity method
 */
export type SimilarityMethod =
  | 'path'        // Path-based distance
  | 'wu-palmer'   // Wu & Palmer measure
  | 'lin'         // Lin information content
  | 'resnik'      // Resnik information content
  | 'jiang-conrath'; // Jiang & Conrath

/**
 * Semantic similarity result
 */
export interface SimilarityResult {
  concept1: SnomedConceptMini;
  concept2: SnomedConceptMini;
  similarity: number;
  method: SimilarityMethod;
  commonAncestor?: SnomedConceptMini;
}

// =============================================================================
// CONVERSION UTILITIES
// =============================================================================

/**
 * Convert SNOMED CT concept to unified Concept type
 */
export function toUnifiedConcept(snomed: SnomedConcept): Concept {
  const identifier: OntologyIdentifier = {
    system: 'snomed-ct',
    code: snomed.conceptId,
    display: snomed.pt.term,
  };

  const relationships: ConceptRelationship[] = (snomed.relationships || []).map(rel => ({
    type: rel.typeId === SNOMED_RELATIONSHIP_TYPES.IS_A ? 'is-a' : 'associated-with',
    targetId: rel.destinationId,
    targetDisplay: rel.target.pt.term,
    targetSystem: 'snomed-ct',
    source: rel.characteristicType === 'STATED_RELATIONSHIP' ? 'asserted' : 'inferred',
  }));

  const synonyms = (snomed.descriptions || [])
    .filter(d => d.active && d.type === 'SYNONYM')
    .map(d => d.term);

  const semanticType = extractSemanticType(snomed.semanticTag);

  return {
    id: `snomed:${snomed.conceptId}`,
    identifier,
    equivalentIdentifiers: [],
    preferredTerm: snomed.pt.term,
    labels: {
      [snomed.pt.lang]: snomed.pt.term,
      [`${snomed.fsn.lang}-fsn`]: snomed.fsn.term,
    },
    synonyms,
    definition: snomed.descriptions?.find(d => d.type === 'DEFINITION')?.term,
    relationships,
    semanticType,
    status: snomed.active ? 'active' : 'inactive',
    lastModified: snomed.effectiveTime,
  };
}

/**
 * Extract semantic type from FSN semantic tag
 */
function extractSemanticType(tag?: string): SemanticType | undefined {
  if (!tag) return undefined;

  const tagMap: Record<string, SemanticType> = {
    'disorder': 'disorder',
    'disease': 'disorder',
    'finding': 'finding',
    'procedure': 'procedure',
    'body structure': 'body-structure',
    'organism': 'organism',
    'substance': 'substance',
    'product': 'pharmaceutical',
    'medicinal product': 'pharmaceutical',
    'clinical drug': 'pharmaceutical',
    'dose form': 'dose-form',
    'observable entity': 'observable',
    'specimen': 'specimen',
    'qualifier value': 'qualifier',
    'attribute': 'attribute',
  };

  const normalizedTag = tag.toLowerCase().replace(/[()]/g, '').trim();
  return tagMap[normalizedTag];
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  SNOMED_EDITIONS,
  SNOMED_RELATIONSHIP_TYPES,
  DARWIN_ECL_QUERIES,
  toUnifiedConcept,
};
