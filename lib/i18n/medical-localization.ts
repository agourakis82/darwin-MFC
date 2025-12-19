/**
 * MEDICAL LOCALIZATION SYSTEM - DARWIN MFC
 * =========================================
 * 
 * Sistema de localização médica que adapta:
 * - Ontologias médicas específicas de cada país
 * - Nomes comerciais de medicamentos
 * - Protocolos e diretrizes nacionais
 * - Práticas médicas locais
 * 
 * OVER SOTA: Vai além de tradução simples, adapta conhecimento médico
 * ao contexto de cada país-alvo.
 */

import type { Locale } from '@/i18n/config';

// =============================================================================
// PAÍSES-ALVO E SUAS ONTOLOGIAS MÉDICAS
// =============================================================================

export type CountryCode = 'BR' | 'US' | 'ES' | 'FR' | 'RU' | 'SA' | 'CN' | 'GR';

export interface MedicalOntologyConfig {
  /** Código do país (ISO 3166-1 alpha-2) */
  countryCode: CountryCode;
  
  /** Nome do país */
  countryName: string;
  
  /** Sistema de classificação de doenças principal */
  diseaseClassification: {
    /** Sistema primário (ex: CID-10, ICD-10-CM) */
    primary: string;
    /** Versão específica do país (ex: ICD-10-CM para EUA) */
    version?: string;
    /** Sistema secundário (ex: CIAP-2 no Brasil) */
    secondary?: string;
    /** Sistema terciário (ex: SNOMED-CT) */
    tertiary?: string;
  };
  
  /** Sistema de classificação de medicamentos */
  medicationClassification: {
    /** Sistema primário (ex: ATC, NDC) */
    primary: string;
    /** Sistema secundário (ex: RxNorm, DCB) */
    secondary?: string;
    /** Sistema terciário (ex: DrugBank) */
    tertiary?: string;
  };
  
  /** Sistema de saúde */
  healthSystem: {
    /** Nome do sistema (ex: SUS, NHS, SNS) */
    name: string;
    /** Tipo (ex: universal, insurance-based) */
    type: 'universal' | 'insurance' | 'mixed' | 'private';
    /** Lista nacional de medicamentos essenciais */
    essentialMedicationsList?: string;
  };
  
  /** Diretrizes nacionais principais */
  nationalGuidelines: {
    /** Organização principal (ex: Ministério da Saúde, NICE) */
    organization: string;
    /** URL base das diretrizes */
    guidelinesUrl?: string;
  };
  
  /** Práticas médicas específicas */
  medicalPractices: {
    /** Uso de medicina tradicional/complementar */
    traditionalMedicine?: boolean;
    /** Protocolos específicos do país */
    countrySpecificProtocols?: string[];
  };
}

// =============================================================================
// CONFIGURAÇÕES POR PAÍS
// =============================================================================

export const MEDICAL_LOCALIZATION: Record<Locale, MedicalOntologyConfig> = {
  // BRASIL
  pt: {
    countryCode: 'BR',
    countryName: 'Brasil',
    diseaseClassification: {
      primary: 'CID-10',
      version: 'CID-10 (Brasil)',
      secondary: 'CIAP-2',
      tertiary: 'SNOMED-CT',
    },
    medicationClassification: {
      primary: 'DCB',
      secondary: 'RENAME',
      tertiary: 'ATC',
    },
    healthSystem: {
      name: 'SUS',
      type: 'universal',
      essentialMedicationsList: 'RENAME',
    },
    nationalGuidelines: {
      organization: 'Ministério da Saúde',
      guidelinesUrl: 'https://www.gov.br/saude',
    },
    medicalPractices: {
      traditionalMedicine: true,
      countrySpecificProtocols: [
        'Protocolos Clínicos e Diretrizes Terapêuticas (PCDT)',
        'Cadernos de Atenção Básica',
        'Linhas de Cuidado',
      ],
    },
  },
  
  // ESTADOS UNIDOS
  en: {
    countryCode: 'US',
    countryName: 'United States',
    diseaseClassification: {
      primary: 'ICD-10-CM',
      version: 'ICD-10-CM (US Clinical Modification)',
      secondary: 'SNOMED-CT',
      tertiary: 'ICD-11',
    },
    medicationClassification: {
      primary: 'NDC',
      secondary: 'RxNorm',
      tertiary: 'ATC',
    },
    healthSystem: {
      name: 'Mixed (Private/Public)',
      type: 'insurance',
      essentialMedicationsList: 'FDA Orange Book',
    },
    nationalGuidelines: {
      organization: 'USPSTF, AAFP, CDC',
      guidelinesUrl: 'https://www.uspreventiveservicestaskforce.org',
    },
    medicalPractices: {
      traditionalMedicine: false,
      countrySpecificProtocols: [
        'USPSTF Recommendations',
        'AAFP Clinical Practice Guidelines',
        'CDC Guidelines',
      ],
    },
  },
  
  // ESPANHA
  es: {
    countryCode: 'ES',
    countryName: 'España',
    diseaseClassification: {
      primary: 'CIE-10',
      version: 'CIE-10 (España)',
      secondary: 'CIE-11',
      tertiary: 'SNOMED-CT',
    },
    medicationClassification: {
      primary: 'Código Nacional',
      secondary: 'ATC',
      tertiary: 'RxNorm',
    },
    healthSystem: {
      name: 'SNS',
      type: 'universal',
      essentialMedicationsList: 'Catálogo de Medicamentos',
    },
    nationalGuidelines: {
      organization: 'Ministerio de Sanidad',
      guidelinesUrl: 'https://www.sanidad.gob.es',
    },
    medicalPractices: {
      traditionalMedicine: false,
      countrySpecificProtocols: [
        'Guías de Práctica Clínica (GPC)',
        'Protocolos de la Sociedad Española de Medicina de Familia',
      ],
    },
  },
  
  // FRANÇA
  fr: {
    countryCode: 'FR',
    countryName: 'France',
    diseaseClassification: {
      primary: 'CIM-10',
      version: 'CIM-10 (France)',
      secondary: 'CIM-11',
      tertiary: 'SNOMED-CT',
    },
    medicationClassification: {
      primary: 'CIP',
      secondary: 'ATC',
      tertiary: 'RxNorm',
    },
    healthSystem: {
      name: 'Sécurité Sociale',
      type: 'universal',
      essentialMedicationsList: 'Liste des Médicaments Remboursables',
    },
    nationalGuidelines: {
      organization: 'HAS (Haute Autorité de Santé)',
      guidelinesUrl: 'https://www.has-sante.fr',
    },
    medicalPractices: {
      traditionalMedicine: false,
      countrySpecificProtocols: [
        'Recommandations HAS',
        'Protocoles Nationaux de Diagnostic et de Soins (PNDS)',
      ],
    },
  },
  
  // RÚSSIA
  ru: {
    countryCode: 'RU',
    countryName: 'Россия',
    diseaseClassification: {
      primary: 'МКБ-10',
      version: 'МКБ-10 (Россия)',
      secondary: 'МКБ-11',
      tertiary: 'SNOMED-CT',
    },
    medicationClassification: {
      primary: 'ГРЛС',
      secondary: 'ATC',
      tertiary: 'RxNorm',
    },
    healthSystem: {
      name: 'ОМС',
      type: 'universal',
      essentialMedicationsList: 'Перечень ЖНВЛП',
    },
    nationalGuidelines: {
      organization: 'Минздрав России',
      guidelinesUrl: 'https://www.rosminzdrav.ru',
    },
    medicalPractices: {
      traditionalMedicine: true,
      countrySpecificProtocols: [
        'Клинические рекомендации',
        'Стандарты медицинской помощи',
      ],
    },
  },
  
  // ARÁBIA SAUDITA / PAÍSES ÁRABES
  ar: {
    countryCode: 'SA',
    countryName: 'المملكة العربية السعودية',
    diseaseClassification: {
      primary: 'ICD-10',
      version: 'ICD-10 (Arabic)',
      secondary: 'ICD-11',
      tertiary: 'SNOMED-CT',
    },
    medicationClassification: {
      primary: 'SFDA',
      secondary: 'ATC',
      tertiary: 'RxNorm',
    },
    healthSystem: {
      name: 'Ministry of Health',
      type: 'universal',
      essentialMedicationsList: 'National Essential Medicines List',
    },
    nationalGuidelines: {
      organization: 'Ministry of Health',
      guidelinesUrl: 'https://www.moh.gov.sa',
    },
    medicalPractices: {
      traditionalMedicine: true,
      countrySpecificProtocols: [
        'Clinical Practice Guidelines',
        'National Treatment Protocols',
      ],
    },
  },
  
  // CHINA
  zh: {
    countryCode: 'CN',
    countryName: '中国',
    diseaseClassification: {
      primary: 'ICD-10',
      version: 'ICD-10 (China)',
      secondary: 'ICD-11',
      tertiary: 'SNOMED-CT',
    },
    medicationClassification: {
      primary: '国家药品编码',
      secondary: 'ATC',
      tertiary: 'RxNorm',
    },
    healthSystem: {
      name: '国家基本医疗保险',
      type: 'universal',
      essentialMedicationsList: '国家基本药物目录',
    },
    nationalGuidelines: {
      organization: '国家卫生健康委员会',
      guidelinesUrl: 'http://www.nhc.gov.cn',
    },
    medicalPractices: {
      traditionalMedicine: true,
      countrySpecificProtocols: [
        '临床诊疗指南',
        '国家基本药物临床应用指南',
      ],
    },
  },
  
  // GRÉCIA
  el: {
    countryCode: 'GR',
    countryName: 'Ελλάδα',
    diseaseClassification: {
      primary: 'ICD-10',
      version: 'ICD-10 (Greece)',
      secondary: 'ICD-11',
      tertiary: 'SNOMED-CT',
    },
    medicationClassification: {
      primary: 'ΕΟΦ',
      secondary: 'ATC',
      tertiary: 'RxNorm',
    },
    healthSystem: {
      name: 'ΕΣΥ',
      type: 'universal',
      essentialMedicationsList: 'Κατάλογος Βασικών Φαρμάκων',
    },
    nationalGuidelines: {
      organization: 'Υπουργείο Υγείας',
      guidelinesUrl: 'https://www.moh.gov.gr',
    },
    medicalPractices: {
      traditionalMedicine: false,
      countrySpecificProtocols: [
        'Κλινικές Οδηγίες',
        'Πρωτόκολλα Εθνικού Συστήματος Υγείας',
      ],
    },
  },
};

// =============================================================================
// MAPEAMENTO DE CÓDIGOS DE DOENÇAS POR PAÍS
// =============================================================================

export interface DiseaseCodeMapping {
  /** Código no sistema brasileiro (CID-10) */
  cid10?: string;
  /** Código no sistema do país-alvo */
  countryCode?: string;
  /** Código SNOMED-CT (universal) */
  snomedCT?: string;
  /** Código ICD-11 (universal) */
  icd11?: string;
  /** Código DOID (universal) */
  doid?: string;
}

// =============================================================================
// MAPEAMENTO DE MEDICAMENTOS POR PAÍS
// =============================================================================

export interface MedicationLocalization {
  /** ID do medicamento (universal) */
  medicationId: string;
  
  /** Nome genérico no país */
  genericName: string;
  
  /** Nomes comerciais no país */
  commercialNames: string[];
  
  /** Código nacional do medicamento */
  nationalCode?: string;
  
  /** Disponível no sistema público? */
  availableInPublicSystem?: boolean;
  
  /** Nome do sistema público (ex: SUS, NHS) */
  publicSystemName?: string;
}

// =============================================================================
// FUNÇÕES UTILITÁRIAS
// =============================================================================

/**
 * Obtém configuração de localização médica para um locale
 */
export function getMedicalLocalization(locale: Locale): MedicalOntologyConfig {
  return MEDICAL_LOCALIZATION[locale];
}

/**
 * Obtém o código do país para um locale
 */
export function getCountryCode(locale: Locale): CountryCode {
  return MEDICAL_LOCALIZATION[locale].countryCode;
}

/**
 * Obtém o sistema de classificação de doenças primário para um país
 */
export function getPrimaryDiseaseClassification(locale: Locale): string {
  return MEDICAL_LOCALIZATION[locale].diseaseClassification.primary;
}

/**
 * Obtém o sistema de classificação de medicamentos primário para um país
 */
export function getPrimaryMedicationClassification(locale: Locale): string {
  return MEDICAL_LOCALIZATION[locale].medicationClassification.primary;
}

/**
 * Verifica se o país usa medicina tradicional/complementar
 */
export function usesTraditionalMedicine(locale: Locale): boolean {
  return MEDICAL_LOCALIZATION[locale].medicalPractices.traditionalMedicine ?? false;
}

