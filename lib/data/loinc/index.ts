/**
 * LOINC Data Index
 * ================
 *
 * Export all LOINC laboratory codes and utilities
 */

export {
  // Individual category exports
  CHEMISTRY_CODES,
  HEMATOLOGY_CODES,
  URINALYSIS_CODES,
  ENDOCRINOLOGY_CODES,
  SEROLOGY_CODES,
  MICROBIOLOGY_CODES,

  // Consolidated exports
  ALL_LOINC_CODES,
  POPULATED_LOINC_CATEGORIES,

  // Initialization
  initializeAllLOINCCodes,

  // Statistics
  LOINC_STATS,
} from './common-labs';

// Re-export types and functions from loinc.ts
export {
  type LOINCCode,
  type LOINCCategory,
  type LOINCSearchResult,
  type DiseaseLOINCMapping,
  LOINC_CATEGORIES,
  searchLOINC,
  getLOINCByCode,
  getLOINCByCategory,
  getRecommendedTests,
  initializeLOINCStore,
} from '@/lib/types/loinc';
