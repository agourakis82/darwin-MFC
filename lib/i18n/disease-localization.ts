/**
 * DISEASE LOCALIZATION DATA
 * =========================
 * 
 * Dados de localização médica para doenças, incluindo:
 * - Códigos específicos do país
 * - Práticas clínicas locais
 * - Adaptações culturais
 */

import type { Locale } from '@/i18n/config';
import { getCountrySpecificDiseaseCode, getPrimaryDiseaseCode } from './disease-code-mappings';
import { getClinicalPractices } from './clinical-practices';
import { getMedicalLocalization } from './medical-localization';

export interface LocalizedDiseaseInfo {
  /** Código primário de classificação no país */
  primaryCode?: string;
  
  /** Código secundário (se aplicável) */
  secondaryCode?: string;
  
  /** Nome do sistema de classificação usado */
  classificationSystem: string;
  
  /** Práticas clínicas específicas do país */
  clinicalPractices?: Array<{
    title: string;
    organization: string;
    year: number;
    url?: string;
  }>;
  
  /** Notas específicas do país */
  countrySpecificNotes?: string[];
}

/**
 * Obtém informações localizadas de uma doença para um país específico
 */
export function getLocalizedDiseaseInfo(
  diseaseId: string,
  locale: Locale
): LocalizedDiseaseInfo {
  const medicalConfig = getMedicalLocalization(locale);
  const primaryCode = getPrimaryDiseaseCode(diseaseId, locale);
  const countryCode = getCountrySpecificDiseaseCode(diseaseId, locale);
  const practices = getClinicalPractices(diseaseId, locale);
  
  return {
    primaryCode: countryCode || primaryCode,
    secondaryCode: primaryCode !== countryCode ? primaryCode : undefined,
    classificationSystem: medicalConfig.diseaseClassification.primary,
    clinicalPractices: practices.map(p => ({
      title: p.title,
      organization: p.organization,
      year: p.year,
      url: p.url,
    })),
    countrySpecificNotes: practices.flatMap(p => p.countrySpecificNotes || []),
  };
}

