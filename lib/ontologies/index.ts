/**
 * Ontologies Index
 * Central export for all ontology integrations
 * Includes enhanced unified ontology system with revolutionary medical terminology management
 */

// Core ontology systems
export * from './loinc';
export * from './ordo';
export * from './pharmgkb';
export * from './ciap2';
export * from './rxnorm';
export * from './icd10';

// Enhanced unified ontology system (Revolutionary Enhancement)
export * from './enhanced-integration-system';

// Legacy compatibility exports
export { ciap2Manager } from './ciap2';
export { rxnormManager } from './rxnorm';
export { loincManager } from './loinc';
export { icd10Manager } from './icd10';
export { getPharmacogenomicsForMedication } from './pharmgkb';
export { searchORDOByName } from './ordo';

// Enhanced system exports
export { EnhancedOntologyManager, enhancedOntologyManager } from './enhanced-integration-system';

// Validation and testing utilities
export { validateOntologySystem } from './validate-ontology-system';

