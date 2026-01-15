/**
 * DARWIN-MFC ONTOLOGY LAYER
 * =========================
 *
 * Unified ontology integration layer providing:
 * - SNOMED-CT: Clinical terminology
 * - LOINC: Laboratory and clinical observations
 * - PharmGKB: Pharmacogenomics data
 * - ORDO: Rare diseases
 * - ICD-10/ICD-11: Diagnosis codes
 * - RxNorm: Medications
 */

// Types
export * from './types';

// Services
export * from './services';

// React Hooks
export * from './hooks';

// ============================================================================
// DATA MODULES
// ============================================================================

// LOINC Laboratory Tests Data
export {
  // Types
  type LOINCTest,
  type LOINCCategory,
  type ReferenceRange,
  type ReferenceRanges,
  // Data
  LOINC_TESTS,
  LOINC_PANELS,
  CATEGORY_NAMES as LOINC_CATEGORY_NAMES,
  // Functions
  getTestByCode,
  getTestsByCategory,
  searchTestsByComponent,
  getTestsInPanel,
  isValidLoincCode,
  getReferenceRange,
} from './loinc';

// PharmGKB Pharmacogenomics Data
export {
  // Types
  type PharmGKBGene,
  type AffectedDrug,
  type PhenotypeDefinition,
  type StarAllele,
  type EvidenceLevel as PharmGKBEvidenceLevel,
  type MetabolizerPhenotype as PharmGKBMetabolizerPhenotype,
  // Data
  PHARMGKB_GENES,
  EVIDENCE_LEVEL_DESCRIPTIONS,
  PHENOTYPE_COLORS,
  // Functions
  getGeneBySymbol,
  getDrugsByGene,
  getGenesAffectingDrug,
  getGenesWithCpicGuidelines,
  getDrugRecommendation,
  getPhenotypeByAbbreviation,
  getStarAllele,
  getHighEvidencePairs,
} from './pharmgkb';

// ICD-11 Classification Data
export {
  // Types
  type ICD11Chapter,
  type ICD11Entity,
  type ICD11SearchResult,
  // Data
  ICD11_CHAPTERS,
  ICD11_ENTITIES,
  // Functions
  getICD11ByCode,
  getICD11ByICD10,
  getICD11BySNOMED,
  getICD11ByCIAP2,
  getICD11ByChapter,
  searchICD11,
  getChapterName,
  isValidICD11Code,
  getCrossMappings as getICD11CrossMappings,
  getICD11ByDOID,
  getICD11Stats,
} from './icd11';

// Cross-Mapping Service
export {
  // Types
  type UnifiedEntityType,
  type OntologyCodes,
  type UnifiedEntity,
  type CrossMappingResult,
  type CrossMappingOptions,
  // Functions
  getUnifiedEntities,
  getCrossMappings,
  mapICD10toICD11,
  mapICD11toICD10,
  mapSNOMEDtoICD,
  mapCIAP2toICD,
  findEntityByCode,
  getAllCodesForEntity,
  areCodesEquivalent,
  getCrossMappingStats,
} from './cross-mapping';

// Unified Semantic Search
export {
  // Types
  type UnifiedSearchResult,
  type UnifiedSearchOptions,
  type UnifiedSearchResponse,
  // Functions
  unifiedSearch,
  searchDiseases,
  searchMedications,
  searchLabTests,
  searchGenes,
  searchByCodeWithMappings,
} from './unified-search';

// Extended PharmGKB with Dosing Recommendations
export {
  // Types
  type DosingRecommendation,
  type ActivityScoreResult,
  type DrugGeneInteraction,
  // Data
  ALL_PHARMGKB_GENES,
  EXTENDED_PHARMGKB_GENES,
  DOSING_RECOMMENDATIONS,
  // Functions
  getAllGenes,
  getExtendedGeneBySymbol,
  getDosingRecommendation,
  getDosingRecommendationsForDrug,
  getDosingRecommendationsForGene,
  calculateActivityScore,
  getDrugInteractionSummary,
  searchGenesByPhenotypeConcern,
  getGenesRelevantForPopulation,
  getContraindicatedPairs,
  getRecommendedPanel,
  getPharmGKBStats,
} from './pharmgkb-extended';
