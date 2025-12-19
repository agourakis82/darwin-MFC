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
 * Helper type for entities with ontology mappings
 */
export interface WithOntologies {
  ontologies?: OntologyMapping;
}

