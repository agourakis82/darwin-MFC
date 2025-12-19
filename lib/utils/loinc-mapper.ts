/**
 * Utility functions for mapping exam names to LOINC codes
 */

import { mapExamNameToLOINC, getLOINCCode, searchLOINCByName, LOINCCode } from '../ontologies/loinc';

/**
 * Extract LOINC codes from a list of exam names
 */
export function extractLOINCCodes(examNames: string[]): string[] {
  const loincCodes: string[] = [];
  const seen = new Set<string>();

  for (const examName of examNames) {
    const loincKey = mapExamNameToLOINC(examName);
    if (loincKey) {
      const loincCode = getLOINCCode(loincKey);
      if (loincCode && !seen.has(loincCode.code)) {
        loincCodes.push(loincCode.code);
        seen.add(loincCode.code);
      }
    } else {
      // Try direct search
      const searchResults = searchLOINCByName(examName);
      if (searchResults.length > 0 && !seen.has(searchResults[0].code)) {
        loincCodes.push(searchResults[0].code);
        seen.add(searchResults[0].code);
      }
    }
  }

  return loincCodes;
}

/**
 * Find LOINC code for a given exam name
 */
export function findLOINCForExam(examName: string): LOINCCode | undefined {
  const loincKey = mapExamNameToLOINC(examName);
  if (loincKey) {
    return getLOINCCode(loincKey);
  }
  
  const searchResults = searchLOINCByName(examName);
  return searchResults.length > 0 ? searchResults[0] : undefined;
}

/**
 * Enrich disease data with LOINC codes from exam names
 */
export function enrichDiseaseWithLOINC(examsIniciais: string[]): string[] {
  return extractLOINCCodes(examsIniciais);
}

