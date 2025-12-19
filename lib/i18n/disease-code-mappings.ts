/**
 * DISEASE CODE MAPPINGS BY COUNTRY
 * =================================
 * 
 * Mapeamento de códigos de doenças entre diferentes sistemas de classificação
 * por país-alvo.
 * 
 * OVER SOTA: Adapta códigos de doenças às ontologias específicas de cada país.
 */

import type { Locale } from '@/i18n/config';
import type { DiseaseCodeMapping } from './medical-localization';

// =============================================================================
// MAPEAMENTO DE CÓDIGOS DE DOENÇAS POR PAÍS
// =============================================================================

/**
 * Mapeamento de códigos de doenças por locale
 * Estrutura: { diseaseId: DiseaseCodeMapping }
 */
export const DISEASE_CODE_MAPPINGS: Record<Locale, Record<string, DiseaseCodeMapping>> = {
  // BRASIL (Português) - CID-10 é padrão
  pt: {
    'hipertensao-arterial': {
      cid10: 'I10',
      countryCode: 'I10',
      snomedCT: '38341003',
      icd11: 'BA00',
      doid: 'DOID:10763',
    },
    'diabetes-mellitus-tipo-2': {
      cid10: 'E11',
      countryCode: 'E11',
      snomedCT: '44054006',
      icd11: '5A11',
      doid: 'DOID:9351',
    },
    'insuficiencia-cardiaca': {
      cid10: 'I50',
      countryCode: 'I50',
      snomedCT: '84114007',
      icd11: 'BD10',
      doid: 'DOID:6000',
    },
  },
  
  // ESTADOS UNIDOS (Inglês) - ICD-10-CM
  en: {
    'hipertensao-arterial': {
      cid10: 'I10',
      countryCode: 'I10', // ICD-10-CM usa I10 também
      snomedCT: '38341003',
      icd11: 'BA00',
      doid: 'DOID:10763',
    },
    'diabetes-mellitus-tipo-2': {
      cid10: 'E11',
      countryCode: 'E11.9', // ICD-10-CM mais específico
      snomedCT: '44054006',
      icd11: '5A11',
      doid: 'DOID:9351',
    },
    'insuficiencia-cardiaca': {
      cid10: 'I50',
      countryCode: 'I50.9', // ICD-10-CM mais específico
      snomedCT: '84114007',
      icd11: 'BD10',
      doid: 'DOID:6000',
    },
  },
  
  // ESPANHA (Espanhol) - CIE-10
  es: {
    'hipertensao-arterial': {
      cid10: 'I10',
      countryCode: 'I10', // CIE-10 usa mesmo código
      snomedCT: '38341003',
      icd11: 'BA00',
      doid: 'DOID:10763',
    },
    'diabetes-mellitus-tipo-2': {
      cid10: 'E11',
      countryCode: 'E11', // CIE-10 usa mesmo código
      snomedCT: '44054006',
      icd11: '5A11',
      doid: 'DOID:9351',
    },
    'insuficiencia-cardiaca': {
      cid10: 'I50',
      countryCode: 'I50', // CIE-10 usa mesmo código
      snomedCT: '84114007',
      icd11: 'BD10',
      doid: 'DOID:6000',
    },
  },
  
  // FRANÇA (Francês) - CIM-10
  fr: {
    'hipertensao-arterial': {
      cid10: 'I10',
      countryCode: 'I10', // CIM-10 usa mesmo código
      snomedCT: '38341003',
      icd11: 'BA00',
      doid: 'DOID:10763',
    },
    'diabetes-mellitus-tipo-2': {
      cid10: 'E11',
      countryCode: 'E11', // CIM-10 usa mesmo código
      snomedCT: '44054006',
      icd11: '5A11',
      doid: 'DOID:9351',
    },
    'insuficiencia-cardiaca': {
      cid10: 'I50',
      countryCode: 'I50', // CIM-10 usa mesmo código
      snomedCT: '84114007',
      icd11: 'BD10',
      doid: 'DOID:6000',
    },
  },
  
  // RÚSSIA (Russo) - МКБ-10
  ru: {
    'hipertensao-arterial': {
      cid10: 'I10',
      countryCode: 'I10', // МКБ-10 usa mesmo código
      snomedCT: '38341003',
      icd11: 'BA00',
      doid: 'DOID:10763',
    },
    'diabetes-mellitus-tipo-2': {
      cid10: 'E11',
      countryCode: 'E11', // МКБ-10 usa mesmo código
      snomedCT: '44054006',
      icd11: '5A11',
      doid: 'DOID:9351',
    },
    'insuficiencia-cardiaca': {
      cid10: 'I50',
      countryCode: 'I50', // МКБ-10 usa mesmo código
      snomedCT: '84114007',
      icd11: 'BD10',
      doid: 'DOID:6000',
    },
  },
  
  // ARÁBIA SAUDITA (Árabe) - ICD-10
  ar: {
    'hipertensao-arterial': {
      cid10: 'I10',
      countryCode: 'I10', // ICD-10 padrão
      snomedCT: '38341003',
      icd11: 'BA00',
      doid: 'DOID:10763',
    },
    'diabetes-mellitus-tipo-2': {
      cid10: 'E11',
      countryCode: 'E11', // ICD-10 padrão
      snomedCT: '44054006',
      icd11: '5A11',
      doid: 'DOID:9351',
    },
    'insuficiencia-cardiaca': {
      cid10: 'I50',
      countryCode: 'I50', // ICD-10 padrão
      snomedCT: '84114007',
      icd11: 'BD10',
      doid: 'DOID:6000',
    },
  },
  
  // CHINA (Chinês) - ICD-10
  zh: {
    'hipertensao-arterial': {
      cid10: 'I10',
      countryCode: 'I10', // ICD-10 padrão
      snomedCT: '38341003',
      icd11: 'BA00',
      doid: 'DOID:10763',
    },
    'diabetes-mellitus-tipo-2': {
      cid10: 'E11',
      countryCode: 'E11', // ICD-10 padrão
      snomedCT: '44054006',
      icd11: '5A11',
      doid: 'DOID:9351',
    },
    'insuficiencia-cardiaca': {
      cid10: 'I50',
      countryCode: 'I50', // ICD-10 padrão
      snomedCT: '84114007',
      icd11: 'BD10',
      doid: 'DOID:6000',
    },
  },
  
  // GRÉCIA (Grego) - ICD-10
  el: {
    'hipertensao-arterial': {
      cid10: 'I10',
      countryCode: 'I10', // ICD-10 padrão
      snomedCT: '38341003',
      icd11: 'BA00',
      doid: 'DOID:10763',
    },
    'diabetes-mellitus-tipo-2': {
      cid10: 'E11',
      countryCode: 'E11', // ICD-10 padrão
      snomedCT: '44054006',
      icd11: '5A11',
      doid: 'DOID:9351',
    },
    'insuficiencia-cardiaca': {
      cid10: 'I50',
      countryCode: 'I50', // ICD-10 padrão
      snomedCT: '84114007',
      icd11: 'BD10',
      doid: 'DOID:6000',
    },
  },
};

// =============================================================================
// FUNÇÕES UTILITÁRIAS
// =============================================================================

/**
 * Obtém código de doença específico do país
 */
export function getCountrySpecificDiseaseCode(
  diseaseId: string,
  locale: Locale
): string | undefined {
  return DISEASE_CODE_MAPPINGS[locale]?.[diseaseId]?.countryCode;
}

/**
 * Obtém código primário de classificação de doenças para um país
 */
export function getPrimaryDiseaseCode(diseaseId: string, locale: Locale): string | undefined {
  const mapping = DISEASE_CODE_MAPPINGS[locale]?.[diseaseId];
  if (!mapping) return undefined;
  
  // Retorna código específico do país se disponível, senão CID-10
  return mapping.countryCode || mapping.cid10;
}

