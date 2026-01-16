/**
 * Types for expanded ontologies
 */

export interface OntologyMapping {
  loinc?: string[]; // LOINC codes
  ordo?: string[]; // ORDO codes
  pharmgkb?: {
    gene: string;
    variant?: string;
  }[];
}

/**
 * Extended ontology mapping for screening programs
 * Adds ICD-10, ICD-O-3, and SNOMED-CT support
 */
export interface ScreeningOntologyMapping extends OntologyMapping {
  // ICD-10 codes for conditions detected by screening
  icd10?: string[];

  // ICD-O-3 morphology codes (for cancers)
  icdO3?: {
    morphology: string;
    topography?: string[];
    description?: string;
  }[];

  // SNOMED-CT concept IDs for condition/disease
  snomedCT?: string[];

  // SNOMED-CT procedure codes (screening procedures)
  snomedProcedure?: string[];

  // CIAP-2 codes for primary care classification
  ciap2?: string[];

  // CID-11 codes (future proofing)
  cid11?: string[];
}

/**
 * Helper type for entities with ontology mappings
 */
export interface WithOntologies {
  ontologies?: OntologyMapping;
}

/**
 * Helper type for entities with extended screening ontologies
 */
export interface WithScreeningOntologies {
  ontologies?: ScreeningOntologyMapping;
}

