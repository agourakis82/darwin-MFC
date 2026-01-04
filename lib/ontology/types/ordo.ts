/**
 * DARWIN-MFC ORDO TYPES
 * =====================
 *
 * Type definitions for ORDO (Orphanet Rare Disease Ontology)
 * integration including:
 * - Rare disease concepts
 * - Gene-disease relationships
 * - Epidemiological data
 * - Cross-references to ICD-10, OMIM, SNOMED-CT
 */

import type {
  OntologyIdentifier,
  OntologySystem,
  Concept,
  ConceptRelationship,
  SemanticType,
} from './ontology';

// =============================================================================
// ORDO CORE STRUCTURE
// =============================================================================

/**
 * ORDO concept status
 */
export type OrdoStatus =
  | 'active'      // Active concept
  | 'obsolete'    // Obsolete/deprecated concept
  | 'inactive';   // Inactive concept

/**
 * ORDO disease type classification
 */
export type OrdoDiseaseType =
  | 'Disease'                    // Single rare disease entity
  | 'Group of disorders'         // Group of related disorders
  | 'Subtype of a disorder'      // Subtype or variant
  | 'Clinical syndrome'          // Clinical syndrome
  | 'Morphological anomaly'      // Structural/morphological anomaly
  | 'Particular clinical situation in a disease or syndrome'
  | 'Malformation syndrome'      // Malformation syndrome
  | 'Etiological subtype'        // Subtype by etiology
  | 'Clinical subtype'           // Subtype by clinical presentation
  | 'Histopathological subtype'; // Subtype by histopathology

/**
 * Inheritance patterns
 */
export type OrdoInheritance =
  | 'Autosomal dominant'
  | 'Autosomal recessive'
  | 'X-linked dominant'
  | 'X-linked recessive'
  | 'Y-linked'
  | 'Mitochondrial'
  | 'Multigenic/multifactorial'
  | 'Not applicable'
  | 'Unknown';

/**
 * Age of onset categories
 */
export type OrdoAgeOfOnset =
  | 'Antenatal'
  | 'Neonatal'
  | 'Infancy'
  | 'Childhood'
  | 'Adolescent'
  | 'Adult'
  | 'Elderly'
  | 'All ages'
  | 'No data available';

/**
 * Disease prevalence categories
 */
export type OrdoPrevalence =
  | '>1/1000'           // Common
  | '1-5/10000'         // Uncommon
  | '6-9/10000'
  | '1-9/100000'        // Rare
  | '1-9/1000000'       // Very rare
  | '<1/1000000'        // Ultra-rare
  | 'Unknown'
  | 'Not yet documented';

/**
 * Prevalence type
 */
export type OrdoPrevalenceType =
  | 'Point prevalence'
  | 'Birth prevalence'
  | 'Lifetime prevalence'
  | 'Annual incidence'
  | 'Cases/families';

// =============================================================================
// ORDO CONCEPT
// =============================================================================

/**
 * Full ORDO concept representation
 */
export interface OrdoConcept {
  /** ORPHAcode (e.g., "101952") */
  orphaCode: string;

  /** Full ORDO IRI */
  iri: string;

  /** Disease/concept name */
  label: string;

  /** Definition/description */
  definition?: string;

  /** Alternative names/synonyms */
  synonyms?: string[];

  /** Disease type classification */
  diseaseType?: OrdoDiseaseType;

  /** Concept status */
  status: OrdoStatus;

  /** Inheritance patterns */
  inheritance?: OrdoInheritance[];

  /** Age of onset */
  ageOfOnset?: OrdoAgeOfOnset[];

  /** Prevalence information */
  prevalence?: OrdoPrevalenceInfo;

  /** Parent concepts (is-a relationships) */
  parents?: string[];

  /** Child concepts */
  children?: string[];

  /** Associated genes */
  genes?: OrdoGeneAssociation[];

  /** Cross-references to other systems */
  crossReferences?: OrdoCrossReference[];

  /** HPO phenotype associations */
  phenotypes?: OrdoPhenotypeAssociation[];

  /** Associated ICD-10 codes */
  icd10Codes?: string[];

  /** Associated OMIM codes */
  omimCodes?: string[];

  /** Average age of death (if applicable) */
  averageAgeOfDeath?: string;

  /** Annotations/additional properties */
  annotations?: Record<string, string>;
}

/**
 * Minimal ORDO concept for search results
 */
export interface OrdoConceptMini {
  orphaCode: string;
  label: string;
  definition?: string;
  diseaseType?: string;
  status: OrdoStatus;
  synonymCount?: number;
}

// =============================================================================
// ORDO RELATIONSHIPS
// =============================================================================

/**
 * Gene-disease association
 */
export interface OrdoGeneAssociation {
  /** Gene symbol (e.g., "BRCA1") */
  geneSymbol: string;

  /** Gene name */
  geneName: string;

  /** HGNC ID */
  hgncId?: string;

  /** Ensembl ID */
  ensemblId?: string;

  /** OMIM gene ID */
  omimGeneId?: string;

  /** Association type */
  associationType: OrdoGeneAssociationType;

  /** Association status */
  associationStatus: 'Assessed' | 'Not yet assessed';
}

/**
 * Gene-disease association types
 */
export type OrdoGeneAssociationType =
  | 'Disease-causing germline mutation(s) in'
  | 'Disease-causing somatic mutation(s) in'
  | 'Disease-causing germline mutation(s) (loss of function) in'
  | 'Disease-causing germline mutation(s) (gain of function) in'
  | 'Role in the phenotype of'
  | 'Candidate gene tested in'
  | 'Major susceptibility factor in'
  | 'Modifying germline mutation in'
  | 'Part of a fusion gene in'
  | 'Biomarker tested in';

/**
 * Cross-reference to external system
 */
export interface OrdoCrossReference {
  /** Source system */
  source: OrdoCrossReferenceSource;

  /** Reference code/ID */
  reference: string;

  /** Mapping relation type */
  mappingRelation?: 'exact' | 'broader' | 'narrower' | 'related';
}

/**
 * Supported cross-reference sources
 */
export type OrdoCrossReferenceSource =
  | 'ICD-10'
  | 'ICD-11'
  | 'OMIM'
  | 'SNOMED CT'
  | 'UMLS'
  | 'MeSH'
  | 'MedDRA'
  | 'GARD'
  | 'MONDO';

/**
 * Phenotype association (link to HPO)
 */
export interface OrdoPhenotypeAssociation {
  /** HPO term ID */
  hpoId: string;

  /** HPO term label */
  hpoLabel: string;

  /** Frequency of phenotype */
  frequency?: OrdoPhenotypeFrequency;
}

/**
 * Phenotype frequency categories
 */
export type OrdoPhenotypeFrequency =
  | 'Obligate (100%)'
  | 'Very frequent (99-80%)'
  | 'Frequent (79-30%)'
  | 'Occasional (29-5%)'
  | 'Very rare (<4-1%)'
  | 'Excluded (0%)';

/**
 * Prevalence information
 */
export interface OrdoPrevalenceInfo {
  /** Prevalence class */
  prevalenceClass?: OrdoPrevalence;

  /** Prevalence type */
  type?: OrdoPrevalenceType;

  /** Geographic area */
  geographicArea?: string;

  /** Validation status */
  validationStatus?: 'Validated' | 'Not yet validated';

  /** Mean value (if quantified) */
  meanValue?: number;

  /** Point prevalence value */
  pointPrevalence?: string;
}

// =============================================================================
// ORDO CLASSIFICATION HIERARCHY
// =============================================================================

/**
 * ORDO classification level
 */
export interface OrdoClassificationLevel {
  orphaCode: string;
  label: string;
  level: number;
  children: OrdoClassificationLevel[];
}

/**
 * Top-level ORDO classification categories
 */
export type OrdoClassificationCategory =
  | 'Rare genetic disease'
  | 'Rare developmental defect during embryogenesis'
  | 'Rare neurological disease'
  | 'Rare eye disease'
  | 'Rare cardiac disease'
  | 'Rare respiratory disease'
  | 'Rare hepatic disease'
  | 'Rare renal disease'
  | 'Rare bone disease'
  | 'Rare skin disease'
  | 'Rare endocrine disease'
  | 'Rare hematological disease'
  | 'Rare immunological disease'
  | 'Rare infectious disease'
  | 'Rare neoplastic disease'
  | 'Rare systemic or rheumatological disease'
  | 'Rare otorhinolaryngological disease'
  | 'Rare gynecological and obstetric disease'
  | 'Rare urogenital disease'
  | 'Rare inborn errors of metabolism'
  | 'Rare surgical disease'
  | 'Rare allergic disease'
  | 'Rare intoxication'
  | 'Rare circulatory system disease'
  | 'Rare abdominal surgical disease'
  | 'Teratogenic disease'
  | 'Rare odontological disease';

// =============================================================================
// ORDO SEARCH
// =============================================================================

/**
 * ORDO search parameters
 */
export interface OrdoSearchParams {
  /** Search query */
  query: string;

  /** Filter by disease type */
  diseaseType?: OrdoDiseaseType | OrdoDiseaseType[];

  /** Filter by inheritance pattern */
  inheritance?: OrdoInheritance | OrdoInheritance[];

  /** Filter by age of onset */
  ageOfOnset?: OrdoAgeOfOnset | OrdoAgeOfOnset[];

  /** Include obsolete concepts */
  includeObsolete?: boolean;

  /** Language for results */
  language?: string;

  /** Maximum results */
  limit?: number;

  /** Pagination offset */
  offset?: number;
}

/**
 * ORDO search result
 */
export interface OrdoSearchResult {
  concept: OrdoConceptMini;
  score: number;
  matchedOn: 'label' | 'code' | 'synonym' | 'definition';
  highlight?: string;
}

/**
 * ORDO search response
 */
export interface OrdoSearchResponse {
  results: OrdoSearchResult[];
  total: number;
  offset: number;
  limit: number;
  query: string;
  executionTimeMs: number;
}

// =============================================================================
// COMMON RARE DISEASE CATEGORIES
// =============================================================================

/**
 * Pre-defined common rare disease parent codes
 */
export const ORDO_CATEGORIES = {
  // Major disease groups
  RARE_GENETIC: '98053',           // Rare genetic disease
  RARE_DEVELOPMENTAL: '93890',     // Rare developmental defect during embryogenesis
  RARE_NEUROLOGICAL: '71859',      // Rare neurological disease
  RARE_EYE: '519325',              // Rare eye disease
  RARE_CARDIAC: '97929',           // Rare cardiac disease
  RARE_RESPIRATORY: '97931',       // Rare respiratory disease
  RARE_HEPATIC: '101939',          // Rare hepatic disease
  RARE_RENAL: '93587',             // Rare renal disease
  RARE_BONE: '93441',              // Rare bone disease
  RARE_SKIN: '79379',              // Rare skin disease
  RARE_ENDOCRINE: '97978',         // Rare endocrine disease
  RARE_HEMATOLOGIC: '68334',       // Rare hematologic disease
  RARE_IMMUNOLOGIC: '101995',      // Rare immune disease
  RARE_NEOPLASTIC: '68341',        // Rare neoplastic disease
  RARE_METABOLIC: '68367',         // Rare inborn errors of metabolism
} as const;

/**
 * Common rare diseases (frequently referenced)
 */
export const ORDO_COMMON_DISEASES = {
  // Metabolic
  PHENYLKETONURIA: '716',
  CYSTIC_FIBROSIS: '586',
  GAUCHER_DISEASE: '355',
  FABRY_DISEASE: '324',
  POMPE_DISEASE: '365',

  // Neuromuscular
  DUCHENNE_MD: '98896',
  SPINAL_MUSCULAR_ATROPHY: '70',
  ALS: '803',
  HUNTINGTON: '399',

  // Hematological
  SICKLE_CELL: '232',
  HEMOPHILIA_A: '169',
  HEMOPHILIA_B: '98878',
  THALASSEMIA_MAJOR: '848',

  // Connective Tissue
  MARFAN_SYNDROME: '558',
  EHLERS_DANLOS: '98249',
  OSTEOGENESIS_IMPERFECTA: '666',

  // Immunological
  SEVERE_COMBINED_ID: '183660',
  CHRONIC_GRANULOMATOUS: '379',

  // Other
  PRADER_WILLI: '739',
  ANGELMAN: '72',
  WILLIAMS: '904',
  RETT: '778',
  FRAGILE_X: '908',
} as const;

// =============================================================================
// CONVERSION UTILITIES
// =============================================================================

/**
 * Convert ORDO concept to unified Concept type
 */
export function toUnifiedConcept(ordo: OrdoConcept): Concept {
  const identifier: OntologyIdentifier = {
    system: 'ordo',
    code: ordo.orphaCode,
    display: ordo.label,
  };

  const relationships: ConceptRelationship[] = [];

  // Add parent relationships
  if (ordo.parents) {
    for (const parent of ordo.parents) {
      relationships.push({
        type: 'is-a',
        targetId: parent,
        targetDisplay: `ORPHA:${parent}`,
        targetSystem: 'ordo',
        source: 'asserted',
      });
    }
  }

  // Add gene associations (no targetSystem since genes are not in our OntologySystem)
  if (ordo.genes) {
    for (const gene of ordo.genes) {
      relationships.push({
        type: 'associated-with',
        targetId: gene.hgncId || gene.geneSymbol,
        targetDisplay: `${gene.geneSymbol} (${gene.geneName})`,
        source: 'asserted',
      });
    }
  }

  // Add cross-references
  if (ordo.crossReferences) {
    for (const xref of ordo.crossReferences) {
      const targetSystem = mapCrossRefSourceToOntology(xref.source);
      relationships.push({
        type: 'same-as',
        targetId: xref.reference,
        targetDisplay: `${xref.source}: ${xref.reference}`,
        targetSystem,
        source: 'mapped',
      });
    }
  }

  const semanticType = mapDiseaseTypeToSemanticType(ordo.diseaseType);

  // Build equivalent identifiers with proper display
  const equivalentIdentifiers: OntologyIdentifier[] = [];
  if (ordo.crossReferences) {
    for (const xref of ordo.crossReferences) {
      const system = mapCrossRefSourceToOntology(xref.source);
      if (system) {
        equivalentIdentifiers.push({
          system,
          code: xref.reference,
          display: `${xref.source}: ${xref.reference}`,
        });
      }
    }
  }

  return {
    id: `ordo:${ordo.orphaCode}`,
    identifier,
    equivalentIdentifiers,
    preferredTerm: ordo.label,
    labels: {
      en: ordo.label,
    },
    synonyms: ordo.synonyms || [],
    definition: ordo.definition,
    relationships,
    semanticType,
    status: ordo.status === 'active' ? 'active' :
            ordo.status === 'obsolete' ? 'deprecated' : 'inactive',
  };
}

/**
 * Map cross-reference source to OntologySystem
 */
function mapCrossRefSourceToOntology(source: OrdoCrossReferenceSource): OntologySystem | undefined {
  switch (source) {
    case 'ICD-10':
      return 'icd10';
    case 'ICD-11':
      return 'icd11';
    case 'SNOMED CT':
      return 'snomed-ct';
    case 'UMLS':
      return 'umls';
    case 'MeSH':
      return 'mesh';
    case 'MONDO':
      return 'doid'; // MONDO maps to Disease Ontology
    default:
      return undefined;
  }
}

/**
 * Map ORDO disease type to semantic type
 */
function mapDiseaseTypeToSemanticType(diseaseType?: OrdoDiseaseType): SemanticType {
  if (!diseaseType) return 'disorder';

  switch (diseaseType) {
    case 'Disease':
    case 'Subtype of a disorder':
    case 'Etiological subtype':
    case 'Clinical subtype':
    case 'Histopathological subtype':
      return 'disorder';
    case 'Group of disorders':
      return 'disorder';
    case 'Clinical syndrome':
    case 'Malformation syndrome':
      return 'disorder';
    case 'Morphological anomaly':
      return 'body-structure';
    default:
      return 'disorder';
  }
}

/**
 * Format ORPHAcode for display
 */
export function formatOrphaCode(code: string): string {
  // Remove any prefix and ensure consistent format
  const numericCode = code.replace(/^(ORPHA:|Orphanet_|ORDO:)/i, '');
  return `ORPHA:${numericCode}`;
}

/**
 * Validate ORPHAcode format
 */
export function isValidOrphaCode(code: string): boolean {
  // ORPHAcodes are numeric (1-6 digits typically)
  const numericCode = code.replace(/^(ORPHA:|Orphanet_|ORDO:)/i, '');
  return /^\d{1,6}$/.test(numericCode);
}

/**
 * Extract numeric code from full IRI
 */
export function extractOrphaCode(iri: string): string {
  const match = iri.match(/Orphanet_(\d+)/);
  return match ? match[1] : iri;
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  ORDO_CATEGORIES,
  ORDO_COMMON_DISEASES,
  toUnifiedConcept,
  formatOrphaCode,
  isValidOrphaCode,
  extractOrphaCode,
};
