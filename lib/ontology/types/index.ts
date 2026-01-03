/**
 * DARWIN-MFC ONTOLOGY TYPES
 * =========================
 *
 * Type definitions for all supported ontology systems.
 */

// Core ontology types
export * from './ontology';

// SNOMED-CT types
export * from './snomed-ct';

// LOINC types (explicit exports to avoid naming conflicts)
export type {
  LoincStatus,
  LoincClass,
  LoincProperty,
  LoincTimeAspect,
  LoincSystem,
  LoincScale,
  LoincMethodType,
  LoincConcept,
  LoincConceptMini,
  LoincPartType,
  LoincPart,
  LoincPanelMember,
  LoincPanel,
  LoincAnswer,
  LoincAnswerList,
  LoincTranslation,
  LoincGroupType,
  LoincGroup,
  LoincHierarchyNode,
  LoincMultiAxialHierarchy,
  LoincSearchParams,
  LoincSearchResult,
  LoincSearchResponse,
  LoincSearchFacets,
} from './loinc';

export {
  LOINC_CHEMISTRY,
  LOINC_HEMATOLOGY,
  LOINC_URINALYSIS,
  LOINC_MICROBIOLOGY,
  LOINC_VITALS,
  LOINC_PANELS,
  toUnifiedConcept as loincToUnifiedConcept,
  formatLoincCode,
  isValidLoincFormat,
  calculateLoincCheckDigit,
} from './loinc';
