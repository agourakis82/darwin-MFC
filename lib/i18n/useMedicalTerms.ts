/**
 * React Hook for Multilingual Medical Terms
 * ==========================================
 *
 * Provides translated disease and medication names based on current locale.
 *
 * Usage:
 *   const { translateDisease, translateMedication } = useMedicalTerms();
 *   const translatedName = translateDisease(doenca.cid10[0], doenca.titulo);
 */

'use client';

import { useLocale } from 'next-intl';
import {
  getTranslatedDiseaseName,
  getTranslatedMedicationName,
  hasDiseaseTranslation,
  hasMedicationTranslation,
} from './medical-terms';

type Locale = 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';

export function useMedicalTerms() {
  const locale = useLocale() as Locale;

  /**
   * Translate disease name using ICD-10 code
   * @param icd10Code - ICD-10 code (or array of codes)
   * @param fallback - Fallback name (usually the Portuguese title)
   * @returns Translated name or fallback
   */
  const translateDisease = (
    icd10Code: string | string[] | undefined,
    fallback: string
  ): string => {
    // For Portuguese, always use the original fallback (our data is in PT)
    if (locale === 'pt') {
      return fallback;
    }

    if (!icd10Code) {
      return fallback;
    }

    // Try each ICD-10 code until we find a translation
    const codes = Array.isArray(icd10Code) ? icd10Code : [icd10Code];

    for (const code of codes) {
      const translated = getTranslatedDiseaseName(code, locale, '');
      if (translated && translated !== code) {
        // Capitalize first letter
        return translated.charAt(0).toUpperCase() + translated.slice(1);
      }
    }

    return fallback;
  };

  /**
   * Translate medication name using ATC code
   * @param atcCode - ATC code (or array of codes)
   * @param fallback - Fallback name (usually the Portuguese name)
   * @returns Translated name or fallback
   */
  const translateMedication = (
    atcCode: string | string[] | undefined,
    fallback: string
  ): string => {
    // For Portuguese, always use the original fallback
    if (locale === 'pt') {
      return fallback;
    }

    if (!atcCode) {
      return fallback;
    }

    const codes = Array.isArray(atcCode) ? atcCode : [atcCode];

    for (const code of codes) {
      const translated = getTranslatedMedicationName(code, locale, '');
      if (translated && translated !== code) {
        return translated.charAt(0).toUpperCase() + translated.slice(1);
      }
    }

    return fallback;
  };

  /**
   * Check if disease translation is available
   */
  const hasDiseaseI18n = (icd10Code: string | string[] | undefined): boolean => {
    if (locale === 'pt' || !icd10Code) return true;

    const codes = Array.isArray(icd10Code) ? icd10Code : [icd10Code];
    return codes.some((code) => hasDiseaseTranslation(code, locale));
  };

  /**
   * Check if medication translation is available
   */
  const hasMedicationI18n = (atcCode: string | string[] | undefined): boolean => {
    if (locale === 'pt' || !atcCode) return true;

    const codes = Array.isArray(atcCode) ? atcCode : [atcCode];
    return codes.some((code) => hasMedicationTranslation(code, locale));
  };

  return {
    locale,
    translateDisease,
    translateMedication,
    hasDiseaseI18n,
    hasMedicationI18n,
  };
}
