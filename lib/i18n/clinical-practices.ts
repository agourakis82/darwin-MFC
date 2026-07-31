/**
 * CLINICAL PRACTICES BY COUNTRY
 * ==============================
 * 
 * Adaptação de práticas clínicas, protocolos e diretrizes específicas
 * de cada país-alvo.
 * 
 * OVER SOTA: Adapta não apenas conteúdo, mas também práticas médicas
 * e protocolos nacionais.
 */

import type { Locale } from '@/i18n/config';

// =============================================================================
// PROTOCOLOS E DIRETRIZES POR PAÍS
// =============================================================================

export interface ClinicalPractice {
  /** ID do protocolo/diretriz */
  id: string;
  
  /** Título no país */
  title: string;
  
  /** Organização responsável */
  organization: string;
  
  /** Ano de publicação/atualização */
  year: number;
  
  /** URL da diretriz */
  url?: string;
  
  /** Diferenças específicas do país */
  countrySpecificNotes?: string[];
}

export const CLINICAL_PRACTICES: Record<Locale, Record<string, ClinicalPractice[]>> = {
  // BRASIL
  pt: {
    'hipertensao-arterial': [
      {
        id: 'pcdt-has-2025',
        title: 'PCDT da Hipertensão Arterial Sistêmica',
        organization: 'Ministério da Saúde',
        year: 2025,
        url: 'https://www.gov.br/saude/pt-br/assuntos/pcdt/h/hipertensao-arterial-sistemica.pdf/view',
      },
      {
        id: 'esc-has-2024',
        title: '2024 ESC Guidelines for Elevated Blood Pressure and Hypertension',
        organization: 'European Society of Cardiology',
        year: 2024,
        url: 'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/elevated-blood-pressure-and-hypertension/',
        countrySpecificNotes: [
          'Contexto internacional: alvo sistólico de 120-129 mmHg para a maioria dos adultos tratados, se tolerado',
          'Aplicar as metas e a disponibilidade terapêutica do PCDT/SUS no contexto brasileiro',
        ],
      },
    ],
    'diabetes-mellitus-2': [
      {
        id: 'pcdt-dm2-2026',
        title: 'PCDT do Diabete Melito Tipo 2',
        organization: 'Ministério da Saúde',
        year: 2026,
        url: 'https://www.gov.br/saude/pt-br/assuntos/pcdt/d/diabete-melito-tipo-2.pdf/view',
      },
      {
        id: 'sbd-2025',
        title: 'Diretriz Oficial: Tratamento do DM2 no SUS',
        organization: 'Sociedade Brasileira de Diabetes',
        year: 2025,
        url: 'https://diretriz.diabetes.org.br/tratamento-do-dm2-no-sus/',
      },
    ],
  },
  
  // ESTADOS UNIDOS
  en: {
    'hipertensao-arterial': [
      {
        id: 'acc-aha-2017',
        title: '2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults',
        organization: 'ACC/AHA',
        year: 2017,
        url: 'https://www.acc.org',
        countrySpecificNotes: [
          'Meta de PA <130/80 mmHg para maioria dos pacientes',
          'Uso de calculadoras de risco cardiovascular (ASCVD)',
        ],
      },
      {
        id: 'aafp-hypertension-2023',
        title: 'AAFP Clinical Practice Guideline: Hypertension',
        organization: 'AAFP',
        year: 2023,
        url: 'https://www.aafp.org',
      },
    ],
    'diabetes-mellitus-2': [
      {
        id: 'ada-2024',
        title: 'Standards of Care in Diabetes - 2024',
        organization: 'ADA',
        year: 2024,
        url: 'https://www.diabetes.org',
        countrySpecificNotes: [
          'Meta HbA1c <7% para maioria',
          'Uso de calculadoras de risco cardiovascular',
        ],
      },
    ],
  },
  
  // ESPANHA
  es: {
    'hipertensao-arterial': [
      {
        id: 'sehh-2023',
        title: 'Guía de Hipertensión Arterial - 2023',
        organization: 'SEHH-ALHA',
        year: 2023,
        url: 'https://www.sehh.es',
      },
    ],
    'diabetes-mellitus-2': [
      {
        id: 'sed-2023',
        title: 'Guía de Práctica Clínica sobre Diabetes Tipo 2',
        organization: 'SED',
        year: 2023,
        url: 'https://www.sediabetes.org',
      },
    ],
  },
  
  // FRANÇA
  fr: {
    'hipertensao-arterial': [
      {
        id: 'has-hypertension-2023',
        title: 'Recommandation de bonne pratique: Prise en charge de l\'hypertension artérielle',
        organization: 'HAS',
        year: 2023,
        url: 'https://www.has-sante.fr',
      },
    ],
    'diabetes-mellitus-2': [
      {
        id: 'has-diabetes-2023',
        title: 'Recommandation de bonne pratique: Diabète de type 2',
        organization: 'HAS',
        year: 2023,
        url: 'https://www.has-sante.fr',
      },
    ],
  },
  
  // RÚSSIA
  ru: {
    'hipertensao-arterial': [
      {
        id: 'rsh-2020',
        title: 'Клинические рекомендации: Артериальная гипертензия у взрослых',
        organization: 'Российское кардиологическое общество',
        year: 2020,
        url: 'https://www.scardio.ru',
      },
    ],
    'diabetes-mellitus-2': [
      {
        id: 'rda-2021',
        title: 'Клинические рекомендации: Сахарный диабет 2 типа',
        organization: 'Российская ассоциация эндокринологов',
        year: 2021,
        url: 'https://www.endocrincentr.ru',
      },
    ],
  },
  
  // ARÁBIA SAUDITA
  ar: {
    'hipertensao-arterial': [
      {
        id: 'saudi-hypertension-2023',
        title: 'المبادئ التوجيهية السريرية: ارتفاع ضغط الدم',
        organization: 'وزارة الصحة',
        year: 2023,
        url: 'https://www.moh.gov.sa',
      },
    ],
    'diabetes-mellitus-2': [
      {
        id: 'saudi-diabetes-2023',
        title: 'المبادئ التوجيهية السريرية: داء السكري من النوع 2',
        organization: 'وزارة الصحة',
        year: 2023,
        url: 'https://www.moh.gov.sa',
      },
    ],
  },
  
  // CHINA
  zh: {
    'hipertensao-arterial': [
      {
        id: 'china-hypertension-2023',
        title: '中国高血压防治指南 - 2023',
        organization: '国家心血管病中心',
        year: 2023,
        url: 'http://www.nccd.org.cn',
      },
    ],
    'diabetes-mellitus-2': [
      {
        id: 'china-diabetes-2021',
        title: '中国2型糖尿病防治指南 - 2021',
        organization: '中华医学会糖尿病学分会',
        year: 2021,
        url: 'http://www.cds.org.cn',
      },
    ],
  },
  
  // GRÉCIA
  el: {
    'hipertensao-arterial': [
      {
        id: 'hellenic-hypertension-2023',
        title: 'Κλινικές Οδηγίες: Αρτηριακή Υπέρταση',
        organization: 'Ελληνική Καρδιολογική Εταιρεία',
        year: 2023,
        url: 'https://www.hellenic-cardiology.org',
      },
    ],
    'diabetes-mellitus-2': [
      {
        id: 'hellenic-diabetes-2023',
        title: 'Κλινικές Οδηγίες: Σακχαρώδης Διαβήτης Τύπου 2',
        organization: 'Ελληνική Εταιρεία Διαβήτη',
        year: 2023,
        url: 'https://www.hellenic-diabetes.org',
      },
    ],
  },

  // ÍNDIA
  hi: {
    'hipertensao-arterial': [
      {
        id: 'india-hypertension-2020',
        title: 'भारतीय उच्च रक्तचाप दिशानिर्देश - 2020',
        organization: 'Hypertension India / ICMR',
        year: 2020,
        url: 'https://www.icmr.gov.in',
        countrySpecificNotes: [
          'NP-NCD 2023-2030 screening protocol integration',
          'ASHA worker-based community screening',
        ],
      },
    ],
    'diabetes-mellitus-2': [
      {
        id: 'india-diabetes-2024',
        title: 'भारतीय मधुमेह दिशानिर्देश - 2024',
        organization: 'Research Society for the Study of Diabetes in India',
        year: 2024,
        url: 'https://www.rssdi.in',
        countrySpecificNotes: [
          'NP-NCD integration for population screening',
          'Focus on prediabetes detection in rural areas',
        ],
      },
    ],
  },
};

// =============================================================================
// FUNÇÕES UTILITÁRIAS
// =============================================================================

/**
 * Obtém práticas clínicas para uma doença em um país específico
 */
export function getClinicalPractices(
  diseaseId: string,
  locale: Locale
): ClinicalPractice[] {
  return CLINICAL_PRACTICES[locale]?.[diseaseId] || [];
}
