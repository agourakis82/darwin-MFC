/**
 * Multilingual Medical Terms Utility
 * ===================================
 *
 * Provides translated disease and medication names from Wikidata ontology.
 * Falls back to original Portuguese names if translation not available.
 *
 * Usage:
 *   import { getTranslatedDiseaseName, getTranslatedMedicationName } from '@/lib/i18n/medical-terms';
 *
 *   const name = getTranslatedDiseaseName('I10', 'en'); // "essential hypertension"
 */

// Import translations by ICD-10 code
import diseaseTranslations from '@/lib/data/translations/diseases-icd10.json';
import medicationTranslations from '@/lib/data/translations/medications-atc.json';

type Locale = 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';

interface TranslationMap {
  [code: string]: {
    [lang: string]: string;
  };
}

const diseaseMap = diseaseTranslations as TranslationMap;
const medicationMap = medicationTranslations as TranslationMap;

/**
 * Get translated disease name by ICD-10 code
 * @param icd10Code - The ICD-10 code (e.g., "I10", "E11")
 * @param locale - Target language code
 * @param fallback - Fallback name if translation not found
 * @returns Translated name or fallback
 */
export function getTranslatedDiseaseName(
  icd10Code: string,
  locale: Locale,
  fallback?: string
): string {
  // Try exact match first
  if (diseaseMap[icd10Code]?.[locale]) {
    return diseaseMap[icd10Code][locale];
  }

  // Try base code (e.g., "I10.0" -> "I10")
  const baseCode = icd10Code.split('.')[0];
  if (diseaseMap[baseCode]?.[locale]) {
    return diseaseMap[baseCode][locale];
  }

  // Try range codes (e.g., "I10" might be in "I10-I15")
  for (const code of Object.keys(diseaseMap)) {
    if (code.includes('-')) {
      const [start, end] = code.split('-');
      if (icd10Code >= start && icd10Code <= end) {
        if (diseaseMap[code]?.[locale]) {
          return diseaseMap[code][locale];
        }
      }
    }
  }

  // Fall back to Portuguese if available
  if (locale !== 'pt' && diseaseMap[icd10Code]?.pt) {
    return diseaseMap[icd10Code].pt;
  }

  // Fall back to English if available
  if (locale !== 'en' && diseaseMap[icd10Code]?.en) {
    return diseaseMap[icd10Code].en;
  }

  return fallback || icd10Code;
}

/**
 * Get translated medication name by ATC code
 * @param atcCode - The ATC code (e.g., "C09AA02" for enalapril)
 * @param locale - Target language code
 * @param fallback - Fallback name if translation not found
 * @returns Translated name or fallback
 */
export function getTranslatedMedicationName(
  atcCode: string,
  locale: Locale,
  fallback?: string
): string {
  // Try exact match
  if (medicationMap[atcCode]?.[locale]) {
    return medicationMap[atcCode][locale];
  }

  // Fall back to Portuguese
  if (locale !== 'pt' && medicationMap[atcCode]?.pt) {
    return medicationMap[atcCode].pt;
  }

  // Fall back to English
  if (locale !== 'en' && medicationMap[atcCode]?.en) {
    return medicationMap[atcCode].en;
  }

  return fallback || atcCode;
}

/**
 * Get all available translations for a disease
 * @param icd10Code - The ICD-10 code
 * @returns Object with all available translations
 */
export function getDiseaseTranslations(
  icd10Code: string
): Record<string, string> | null {
  return diseaseMap[icd10Code] || null;
}

/**
 * Get all available translations for a medication
 * @param atcCode - The ATC code
 * @returns Object with all available translations
 */
export function getMedicationTranslations(
  atcCode: string
): Record<string, string> | null {
  return medicationMap[atcCode] || null;
}

/**
 * Check if translation is available for a disease
 * @param icd10Code - The ICD-10 code
 * @param locale - Target language code
 */
export function hasDiseaseTranslation(icd10Code: string, locale: Locale): boolean {
  return !!diseaseMap[icd10Code]?.[locale];
}

/**
 * Check if translation is available for a medication
 * @param atcCode - The ATC code
 * @param locale - Target language code
 */
export function hasMedicationTranslation(atcCode: string, locale: Locale): boolean {
  return !!medicationMap[atcCode]?.[locale];
}

/**
 * Get translation coverage statistics
 */
export function getTranslationStats(): {
  diseases: { total: number; byLocale: Record<string, number> };
  medications: { total: number; byLocale: Record<string, number> };
} {
  const locales: Locale[] = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

  const diseaseStats = {
    total: Object.keys(diseaseMap).length,
    byLocale: {} as Record<string, number>,
  };

  const medStats = {
    total: Object.keys(medicationMap).length,
    byLocale: {} as Record<string, number>,
  };

  for (const locale of locales) {
    diseaseStats.byLocale[locale] = Object.values(diseaseMap).filter(
      (t) => t[locale]
    ).length;
    medStats.byLocale[locale] = Object.values(medicationMap).filter(
      (t) => t[locale]
    ).length;
  }

  return {
    diseases: diseaseStats,
    medications: medStats,
  };
}
