/**
 * DARWIN-MFC ONTOLOGY HOOKS
 * =========================
 *
 * React hooks for interacting with ontology services.
 */

// SNOMED-CT hooks
export {
  useSnomedSearch,
  useSnomedConcept,
  useSnomedHierarchy,
  useSnomedECL,
  useSnomedExpansion,
  useSnomedSimilar,
  useSnomedHealth,
  type UseSnomedSearchOptions,
  type UseSnomedSearchResult,
  type UseSnomedConceptResult,
  type UseSnomedHierarchyResult,
  type UseSnomedECLResult,
} from './useSnomedBrowser';

// LOINC hooks
export {
  useLoincSearch,
  useLoincConcept,
  useLoincPanel,
  useLoincByClass,
  useLoincValidation,
  type UseLoincSearchOptions,
  type UseLoincSearchResult,
  type UseLoincConceptResult,
  type UseLoincPanelResult,
} from './useLoincBrowser';
