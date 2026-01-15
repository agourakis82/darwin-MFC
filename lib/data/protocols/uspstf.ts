/**
 * USPSTF RECOMMENDATIONS - DARWIN-MFC
 * ===================================
 *
 * U.S. Preventive Services Task Force recommendations for
 * preventive services and screenings.
 *
 * Grade Definitions:
 * - A: High certainty of substantial net benefit
 * - B: High certainty of moderate benefit OR moderate certainty of substantial benefit
 * - C: Moderate certainty of small net benefit (offer selectively)
 * - D: Moderate/high certainty of no benefit or harms outweigh benefits
 * - I: Insufficient evidence
 *
 * Source: https://www.uspreventiveservicestaskforce.org/
 * Last Updated: 2024
 */

import type { LanguageCode } from '@/lib/ontology/types/ontology';

// =============================================================================
// TYPES
// =============================================================================

export type USPSTFGrade = 'A' | 'B' | 'C' | 'D' | 'I';

export interface USPSTFRecommendation {
  /** Unique identifier */
  id: string;

  /** Condition/topic being screened */
  condition: string;

  /** Condition in multiple languages */
  conditionI18n: Partial<Record<LanguageCode, string>>;

  /** Grade (A, B, C, D, I) */
  grade: USPSTFGrade;

  /** Target population */
  population: {
    description: string;
    descriptionI18n: Partial<Record<LanguageCode, string>>;
    ageRange?: { min?: number; max?: number };
    sex?: 'male' | 'female' | 'all';
    riskFactors?: string[];
  };

  /** Recommendation text */
  recommendation: Partial<Record<LanguageCode, string>>;

  /** Screening interval */
  interval?: string;

  /** Screening method */
  method?: string[];

  /** Date of recommendation */
  publicationDate: string;

  /** Related ICD codes */
  relatedCodes?: {
    icd10?: string[];
    icd11?: string[];
  };

  /** PMID or URL reference */
  reference: string;

  /** Evidence summary */
  evidenceSummary?: Partial<Record<LanguageCode, string>>;
}

// =============================================================================
// GRADE DEFINITIONS
// =============================================================================

export const USPSTF_GRADE_DEFINITIONS: Record<USPSTFGrade, {
  label: Partial<Record<LanguageCode, string>>;
  meaning: Partial<Record<LanguageCode, string>>;
  practice: Partial<Record<LanguageCode, string>>;
  color: string;
}> = {
  A: {
    label: { en: 'Grade A', pt: 'Grau A', es: 'Grado A' },
    meaning: {
      en: 'High certainty that net benefit is substantial',
      pt: 'Alta certeza de que o benefício líquido é substancial',
      es: 'Alta certeza de que el beneficio neto es sustancial',
    },
    practice: {
      en: 'Offer or provide this service',
      pt: 'Oferecer ou fornecer este serviço',
      es: 'Ofrecer o proporcionar este servicio',
    },
    color: '#22c55e', // green
  },
  B: {
    label: { en: 'Grade B', pt: 'Grau B', es: 'Grado B' },
    meaning: {
      en: 'High certainty of moderate benefit OR moderate certainty of substantial benefit',
      pt: 'Alta certeza de benefício moderado OU certeza moderada de benefício substancial',
      es: 'Alta certeza de beneficio moderado O certeza moderada de beneficio sustancial',
    },
    practice: {
      en: 'Offer or provide this service',
      pt: 'Oferecer ou fornecer este serviço',
      es: 'Ofrecer o proporcionar este servicio',
    },
    color: '#3b82f6', // blue
  },
  C: {
    label: { en: 'Grade C', pt: 'Grau C', es: 'Grado C' },
    meaning: {
      en: 'Moderate certainty of small net benefit',
      pt: 'Certeza moderada de pequeno benefício líquido',
      es: 'Certeza moderada de pequeño beneficio neto',
    },
    practice: {
      en: 'Offer selectively based on professional judgment and patient preferences',
      pt: 'Oferecer seletivamente com base no julgamento profissional e preferências do paciente',
      es: 'Ofrecer selectivamente según el juicio profesional y las preferencias del paciente',
    },
    color: '#f59e0b', // amber
  },
  D: {
    label: { en: 'Grade D', pt: 'Grau D', es: 'Grado D' },
    meaning: {
      en: 'Moderate/high certainty of no benefit or harms outweigh benefits',
      pt: 'Certeza moderada/alta de ausência de benefício ou danos superam benefícios',
      es: 'Certeza moderada/alta de que no hay beneficio o los daños superan los beneficios',
    },
    practice: {
      en: 'Discourage the use of this service',
      pt: 'Desencorajar o uso deste serviço',
      es: 'Desalentar el uso de este servicio',
    },
    color: '#ef4444', // red
  },
  I: {
    label: { en: 'Grade I', pt: 'Grau I', es: 'Grado I' },
    meaning: {
      en: 'Current evidence is insufficient to assess the balance of benefits and harms',
      pt: 'Evidência atual é insuficiente para avaliar o equilíbrio entre benefícios e danos',
      es: 'La evidencia actual es insuficiente para evaluar el equilibrio entre beneficios y daños',
    },
    practice: {
      en: 'If offered, patients should understand uncertainty about benefits and harms',
      pt: 'Se oferecido, pacientes devem entender a incerteza sobre benefícios e danos',
      es: 'Si se ofrece, los pacientes deben entender la incertidumbre sobre beneficios y daños',
    },
    color: '#6b7280', // gray
  },
};

// =============================================================================
// USPSTF RECOMMENDATIONS DATABASE
// =============================================================================

export const USPSTF_RECOMMENDATIONS: USPSTFRecommendation[] = [
  // ==========================================================================
  // CANCER SCREENING
  // ==========================================================================
  {
    id: 'breast-cancer-screening',
    condition: 'Breast Cancer Screening',
    conditionI18n: {
      en: 'Breast Cancer Screening',
      pt: 'Rastreamento de Câncer de Mama',
      es: 'Detección de Cáncer de Mama',
    },
    grade: 'B',
    population: {
      description: 'Women aged 50-74 years',
      descriptionI18n: {
        en: 'Women aged 50-74 years',
        pt: 'Mulheres de 50 a 74 anos',
        es: 'Mujeres de 50 a 74 años',
      },
      ageRange: { min: 50, max: 74 },
      sex: 'female',
    },
    recommendation: {
      en: 'Screen for breast cancer with mammography every 2 years',
      pt: 'Rastrear câncer de mama com mamografia a cada 2 anos',
      es: 'Realizar detección de cáncer de mama con mamografía cada 2 años',
    },
    interval: 'Every 2 years',
    method: ['Mammography'],
    publicationDate: '2024-04',
    relatedCodes: {
      icd10: ['Z12.31'],
      icd11: ['2C6Y'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening',
    evidenceSummary: {
      en: 'Mammography screening reduces breast cancer mortality. Benefits are greatest for women 50-74.',
      pt: 'Rastreamento com mamografia reduz mortalidade por câncer de mama. Benefícios são maiores para mulheres de 50-74 anos.',
    },
  },
  {
    id: 'breast-cancer-screening-40-49',
    condition: 'Breast Cancer Screening (40-49)',
    conditionI18n: {
      en: 'Breast Cancer Screening (Ages 40-49)',
      pt: 'Rastreamento de Câncer de Mama (40-49 anos)',
      es: 'Detección de Cáncer de Mama (40-49 años)',
    },
    grade: 'B',
    population: {
      description: 'Women aged 40-49 years',
      descriptionI18n: {
        en: 'Women aged 40-49 years',
        pt: 'Mulheres de 40 a 49 anos',
        es: 'Mujeres de 40 a 49 años',
      },
      ageRange: { min: 40, max: 49 },
      sex: 'female',
    },
    recommendation: {
      en: 'Screen for breast cancer with mammography every 2 years',
      pt: 'Rastrear câncer de mama com mamografia a cada 2 anos',
      es: 'Realizar detección de cáncer de mama con mamografía cada 2 años',
    },
    interval: 'Every 2 years',
    method: ['Mammography'],
    publicationDate: '2024-04',
    relatedCodes: {
      icd10: ['Z12.31'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening',
    evidenceSummary: {
      en: 'Updated 2024 recommendation now includes women 40-49 with Grade B (previously C).',
      pt: 'Recomendação atualizada em 2024 agora inclui mulheres de 40-49 com Grau B (anteriormente C).',
    },
  },
  {
    id: 'colorectal-cancer-screening',
    condition: 'Colorectal Cancer Screening',
    conditionI18n: {
      en: 'Colorectal Cancer Screening',
      pt: 'Rastreamento de Câncer Colorretal',
      es: 'Detección de Cáncer Colorrectal',
    },
    grade: 'A',
    population: {
      description: 'Adults aged 45-75 years',
      descriptionI18n: {
        en: 'Adults aged 45-75 years',
        pt: 'Adultos de 45 a 75 anos',
        es: 'Adultos de 45 a 75 años',
      },
      ageRange: { min: 45, max: 75 },
      sex: 'all',
    },
    recommendation: {
      en: 'Screen for colorectal cancer using stool-based tests, colonoscopy, or other approved methods',
      pt: 'Rastrear câncer colorretal usando testes fecais, colonoscopia ou outros métodos aprovados',
      es: 'Detectar cáncer colorrectal mediante pruebas de heces, colonoscopia u otros métodos aprobados',
    },
    interval: 'Varies by method (annual FIT, 10-year colonoscopy)',
    method: ['Colonoscopy', 'FIT', 'FIT-DNA', 'CT Colonography', 'Flexible Sigmoidoscopy'],
    publicationDate: '2021-05',
    relatedCodes: {
      icd10: ['Z12.11', 'Z12.12'],
      icd11: ['2B91', '2B92'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/colorectal-cancer-screening',
    evidenceSummary: {
      en: 'Screening substantially reduces colorectal cancer mortality. Starting at age 45 provides additional benefit.',
      pt: 'Rastreamento reduz substancialmente mortalidade por câncer colorretal. Iniciar aos 45 anos fornece benefício adicional.',
    },
  },
  {
    id: 'cervical-cancer-screening',
    condition: 'Cervical Cancer Screening',
    conditionI18n: {
      en: 'Cervical Cancer Screening',
      pt: 'Rastreamento de Câncer de Colo de Útero',
      es: 'Detección de Cáncer de Cuello Uterino',
    },
    grade: 'A',
    population: {
      description: 'Women aged 21-65 years',
      descriptionI18n: {
        en: 'Women aged 21-65 years with a cervix',
        pt: 'Mulheres de 21 a 65 anos com colo de útero',
        es: 'Mujeres de 21 a 65 años con cuello uterino',
      },
      ageRange: { min: 21, max: 65 },
      sex: 'female',
    },
    recommendation: {
      en: 'Screen with cytology alone every 3 years (21-29), or cytology every 3 years, hrHPV testing every 5 years, or co-testing every 5 years (30-65)',
      pt: 'Rastrear com citologia a cada 3 anos (21-29), ou citologia a cada 3 anos, teste hrHPV a cada 5 anos, ou co-teste a cada 5 anos (30-65)',
      es: 'Detectar con citología cada 3 años (21-29), o citología cada 3 años, prueba hrHPV cada 5 años, o co-prueba cada 5 años (30-65)',
    },
    interval: '3-5 years depending on age and method',
    method: ['Pap smear', 'hrHPV testing', 'Co-testing'],
    publicationDate: '2018-08',
    relatedCodes: {
      icd10: ['Z12.4'],
      icd11: ['2C77'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/cervical-cancer-screening',
    evidenceSummary: {
      en: 'Screening with cytology and/or HPV testing prevents cervical cancer deaths effectively.',
      pt: 'Rastreamento com citologia e/ou teste de HPV previne mortes por câncer cervical de forma eficaz.',
    },
  },
  {
    id: 'lung-cancer-screening',
    condition: 'Lung Cancer Screening',
    conditionI18n: {
      en: 'Lung Cancer Screening',
      pt: 'Rastreamento de Câncer de Pulmão',
      es: 'Detección de Cáncer de Pulmón',
    },
    grade: 'B',
    population: {
      description: 'Adults aged 50-80 with 20 pack-year smoking history who currently smoke or quit within 15 years',
      descriptionI18n: {
        en: 'Adults aged 50-80 with 20 pack-year smoking history who currently smoke or quit within 15 years',
        pt: 'Adultos de 50 a 80 anos com história de 20 maços-ano que fumam atualmente ou pararam nos últimos 15 anos',
        es: 'Adultos de 50 a 80 años con historial de 20 paquetes-año que fuman actualmente o dejaron de fumar en los últimos 15 años',
      },
      ageRange: { min: 50, max: 80 },
      sex: 'all',
      riskFactors: ['20 pack-year smoking history', 'Current smoker or quit within 15 years'],
    },
    recommendation: {
      en: 'Screen annually with low-dose CT',
      pt: 'Rastrear anualmente com TC de baixa dose',
      es: 'Detectar anualmente con TC de baja dosis',
    },
    interval: 'Annual',
    method: ['Low-dose CT'],
    publicationDate: '2021-03',
    relatedCodes: {
      icd10: ['Z12.2'],
      icd11: ['2C25'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/lung-cancer-screening',
    evidenceSummary: {
      en: 'LDCT screening reduces lung cancer mortality in high-risk individuals.',
      pt: 'Rastreamento com TCBD reduz mortalidade por câncer de pulmão em indivíduos de alto risco.',
    },
  },
  {
    id: 'prostate-cancer-screening',
    condition: 'Prostate Cancer Screening',
    conditionI18n: {
      en: 'Prostate Cancer Screening',
      pt: 'Rastreamento de Câncer de Próstata',
      es: 'Detección de Cáncer de Próstata',
    },
    grade: 'C',
    population: {
      description: 'Men aged 55-69 years',
      descriptionI18n: {
        en: 'Men aged 55-69 years',
        pt: 'Homens de 55 a 69 anos',
        es: 'Hombres de 55 a 69 años',
      },
      ageRange: { min: 55, max: 69 },
      sex: 'male',
    },
    recommendation: {
      en: 'Individualized decision-making about PSA screening after discussion of potential benefits and harms',
      pt: 'Decisão individualizada sobre rastreamento com PSA após discussão de potenciais benefícios e danos',
      es: 'Toma de decisiones individualizada sobre detección con PSA después de discutir los posibles beneficios y daños',
    },
    interval: 'Individualized',
    method: ['PSA blood test'],
    publicationDate: '2018-05',
    relatedCodes: {
      icd10: ['Z12.5'],
      icd11: ['2C82'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening',
    evidenceSummary: {
      en: 'PSA screening may reduce prostate cancer mortality but is associated with overdiagnosis and overtreatment.',
      pt: 'Rastreamento com PSA pode reduzir mortalidade por câncer de próstata, mas está associado a sobrediagnóstico e sobretratamento.',
    },
  },

  // ==========================================================================
  // CARDIOVASCULAR DISEASE
  // ==========================================================================
  {
    id: 'hypertension-screening',
    condition: 'Hypertension Screening',
    conditionI18n: {
      en: 'High Blood Pressure Screening',
      pt: 'Rastreamento de Hipertensão Arterial',
      es: 'Detección de Hipertensión Arterial',
    },
    grade: 'A',
    population: {
      description: 'Adults aged 18 years or older',
      descriptionI18n: {
        en: 'Adults aged 18 years or older',
        pt: 'Adultos de 18 anos ou mais',
        es: 'Adultos de 18 años o más',
      },
      ageRange: { min: 18 },
      sex: 'all',
    },
    recommendation: {
      en: 'Screen for high blood pressure with office blood pressure measurement',
      pt: 'Rastrear hipertensão arterial com medida de pressão arterial em consultório',
      es: 'Detectar hipertensión arterial con medición de presión arterial en consultorio',
    },
    interval: 'Annual (or more frequently if elevated)',
    method: ['Office blood pressure measurement', 'Ambulatory blood pressure monitoring'],
    publicationDate: '2021-04',
    relatedCodes: {
      icd10: ['I10'],
      icd11: ['BA00'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/hypertension-in-adults-screening',
    evidenceSummary: {
      en: 'Screening and treatment of high blood pressure substantially reduces cardiovascular events.',
      pt: 'Rastreamento e tratamento de hipertensão arterial reduz substancialmente eventos cardiovasculares.',
    },
  },
  {
    id: 'cardiovascular-risk-assessment',
    condition: 'Cardiovascular Disease Risk Assessment',
    conditionI18n: {
      en: 'Cardiovascular Disease Risk Assessment with Statins',
      pt: 'Avaliação de Risco Cardiovascular e Estatinas',
      es: 'Evaluación de Riesgo Cardiovascular con Estatinas',
    },
    grade: 'B',
    population: {
      description: 'Adults aged 40-75 with at least 1 CVD risk factor and 10-year CVD risk ≥10%',
      descriptionI18n: {
        en: 'Adults aged 40-75 with at least 1 CVD risk factor and 10-year CVD risk ≥10%',
        pt: 'Adultos de 40 a 75 anos com pelo menos 1 fator de risco CV e risco de DCV em 10 anos ≥10%',
        es: 'Adultos de 40 a 75 años con al menos 1 factor de riesgo CV y riesgo de ECV a 10 años ≥10%',
      },
      ageRange: { min: 40, max: 75 },
      sex: 'all',
      riskFactors: ['Dyslipidemia', 'Diabetes', 'Hypertension', 'Smoking'],
    },
    recommendation: {
      en: 'Prescribe a statin for the primary prevention of CVD',
      pt: 'Prescrever estatina para prevenção primária de DCV',
      es: 'Prescribir estatina para prevención primaria de ECV',
    },
    interval: 'Ongoing if prescribed',
    method: ['Risk calculator', 'Lipid panel', 'Statin therapy'],
    publicationDate: '2022-08',
    relatedCodes: {
      icd10: ['Z82.49', 'E78'],
      icd11: ['BA80'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/statin-use-in-adults-preventive-medication',
    evidenceSummary: {
      en: 'Statins reduce CVD events and mortality in adults with elevated risk.',
      pt: 'Estatinas reduzem eventos de DCV e mortalidade em adultos com risco elevado.',
    },
  },
  {
    id: 'abdominal-aortic-aneurysm',
    condition: 'Abdominal Aortic Aneurysm Screening',
    conditionI18n: {
      en: 'Abdominal Aortic Aneurysm Screening',
      pt: 'Rastreamento de Aneurisma de Aorta Abdominal',
      es: 'Detección de Aneurisma de Aorta Abdominal',
    },
    grade: 'B',
    population: {
      description: 'Men aged 65-75 who have ever smoked',
      descriptionI18n: {
        en: 'Men aged 65-75 who have ever smoked',
        pt: 'Homens de 65 a 75 anos que já fumaram',
        es: 'Hombres de 65 a 75 años que alguna vez fumaron',
      },
      ageRange: { min: 65, max: 75 },
      sex: 'male',
      riskFactors: ['Ever smoker'],
    },
    recommendation: {
      en: 'Perform one-time screening with ultrasonography',
      pt: 'Realizar rastreamento único com ultrassonografia',
      es: 'Realizar detección única con ecografía',
    },
    interval: 'One-time',
    method: ['Abdominal ultrasound'],
    publicationDate: '2019-12',
    relatedCodes: {
      icd10: ['I71.4'],
      icd11: ['BD50'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/abdominal-aortic-aneurysm-screening',
    evidenceSummary: {
      en: 'One-time screening reduces AAA-related mortality in men who have smoked.',
      pt: 'Rastreamento único reduz mortalidade relacionada a AAA em homens que fumaram.',
    },
  },

  // ==========================================================================
  // METABOLIC CONDITIONS
  // ==========================================================================
  {
    id: 'diabetes-screening',
    condition: 'Prediabetes and Type 2 Diabetes Screening',
    conditionI18n: {
      en: 'Prediabetes and Type 2 Diabetes Screening',
      pt: 'Rastreamento de Pré-diabetes e Diabetes Tipo 2',
      es: 'Detección de Prediabetes y Diabetes Tipo 2',
    },
    grade: 'B',
    population: {
      description: 'Adults aged 35-70 who are overweight or obese',
      descriptionI18n: {
        en: 'Adults aged 35-70 who are overweight or obese',
        pt: 'Adultos de 35 a 70 anos com sobrepeso ou obesidade',
        es: 'Adultos de 35 a 70 años con sobrepeso u obesidad',
      },
      ageRange: { min: 35, max: 70 },
      sex: 'all',
      riskFactors: ['Overweight', 'Obesity'],
    },
    recommendation: {
      en: 'Screen for prediabetes and type 2 diabetes and offer preventive interventions for prediabetes',
      pt: 'Rastrear pré-diabetes e diabetes tipo 2 e oferecer intervenções preventivas para pré-diabetes',
      es: 'Detectar prediabetes y diabetes tipo 2 y ofrecer intervenciones preventivas para prediabetes',
    },
    interval: 'Every 3 years',
    method: ['Fasting glucose', 'HbA1c', 'Oral glucose tolerance test'],
    publicationDate: '2021-08',
    relatedCodes: {
      icd10: ['R73.03', 'E11'],
      icd11: ['5A11'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/screening-for-prediabetes-and-type-2-diabetes',
    evidenceSummary: {
      en: 'Early detection and intervention can prevent or delay progression to diabetes.',
      pt: 'Detecção precoce e intervenção podem prevenir ou retardar progressão para diabetes.',
    },
  },
  {
    id: 'obesity-screening',
    condition: 'Obesity Screening and Counseling',
    conditionI18n: {
      en: 'Obesity Screening and Behavioral Interventions',
      pt: 'Rastreamento de Obesidade e Intervenções Comportamentais',
      es: 'Detección de Obesidad e Intervenciones Conductuales',
    },
    grade: 'B',
    population: {
      description: 'Adults',
      descriptionI18n: {
        en: 'Adults with obesity (BMI ≥30)',
        pt: 'Adultos com obesidade (IMC ≥30)',
        es: 'Adultos con obesidad (IMC ≥30)',
      },
      ageRange: { min: 18 },
      sex: 'all',
    },
    recommendation: {
      en: 'Screen for obesity and offer or refer to intensive behavioral interventions',
      pt: 'Rastrear obesidade e oferecer ou encaminhar para intervenções comportamentais intensivas',
      es: 'Detectar obesidad y ofrecer o derivar a intervenciones conductuales intensivas',
    },
    interval: 'Annual',
    method: ['BMI calculation', 'Behavioral counseling'],
    publicationDate: '2018-09',
    relatedCodes: {
      icd10: ['E66'],
      icd11: ['5B80'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/obesity-in-adults-interventions',
    evidenceSummary: {
      en: 'Intensive behavioral interventions produce sustained weight loss and improve health outcomes.',
      pt: 'Intervenções comportamentais intensivas produzem perda de peso sustentada e melhoram desfechos de saúde.',
    },
  },

  // ==========================================================================
  // MENTAL HEALTH
  // ==========================================================================
  {
    id: 'depression-screening',
    condition: 'Depression Screening',
    conditionI18n: {
      en: 'Depression Screening',
      pt: 'Rastreamento de Depressão',
      es: 'Detección de Depresión',
    },
    grade: 'B',
    population: {
      description: 'Adults 18 years and older',
      descriptionI18n: {
        en: 'Adults 18 years and older',
        pt: 'Adultos de 18 anos ou mais',
        es: 'Adultos de 18 años o más',
      },
      ageRange: { min: 18 },
      sex: 'all',
    },
    recommendation: {
      en: 'Screen for depression in the general adult population when adequate systems are in place for diagnosis, treatment, and follow-up',
      pt: 'Rastrear depressão na população adulta geral quando sistemas adequados estão disponíveis para diagnóstico, tratamento e acompanhamento',
      es: 'Detectar depresión en la población adulta general cuando existen sistemas adecuados para diagnóstico, tratamiento y seguimiento',
    },
    interval: 'Periodic (no specific interval)',
    method: ['PHQ-9', 'PHQ-2', 'Clinical interview'],
    publicationDate: '2016-01',
    relatedCodes: {
      icd10: ['F32', 'F33'],
      icd11: ['6A70'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/depression-in-adults-screening',
    evidenceSummary: {
      en: 'Screening and treatment of depression improves outcomes when follow-up care is available.',
      pt: 'Rastreamento e tratamento de depressão melhoram desfechos quando cuidados de acompanhamento estão disponíveis.',
    },
  },
  {
    id: 'anxiety-screening',
    condition: 'Anxiety Screening',
    conditionI18n: {
      en: 'Anxiety Disorders Screening',
      pt: 'Rastreamento de Transtornos de Ansiedade',
      es: 'Detección de Trastornos de Ansiedad',
    },
    grade: 'B',
    population: {
      description: 'Adults younger than 65 years',
      descriptionI18n: {
        en: 'Adults younger than 65 years',
        pt: 'Adultos com menos de 65 anos',
        es: 'Adultos menores de 65 años',
      },
      ageRange: { min: 18, max: 64 },
      sex: 'all',
    },
    recommendation: {
      en: 'Screen for anxiety disorders in adults including pregnant and postpartum persons',
      pt: 'Rastrear transtornos de ansiedade em adultos, incluindo gestantes e puérperas',
      es: 'Detectar trastornos de ansiedad en adultos, incluidas personas embarazadas y en posparto',
    },
    interval: 'Periodic',
    method: ['GAD-7', 'Clinical interview'],
    publicationDate: '2023-06',
    relatedCodes: {
      icd10: ['F41'],
      icd11: ['6A80'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/anxiety-adults-screening',
    evidenceSummary: {
      en: 'Screening and treatment of anxiety can improve symptoms and function.',
      pt: 'Rastreamento e tratamento de ansiedade podem melhorar sintomas e função.',
    },
  },

  // ==========================================================================
  // INFECTIOUS DISEASES
  // ==========================================================================
  {
    id: 'hepatitis-c-screening',
    condition: 'Hepatitis C Screening',
    conditionI18n: {
      en: 'Hepatitis C Virus Infection Screening',
      pt: 'Rastreamento de Infecção pelo Vírus da Hepatite C',
      es: 'Detección de Infección por Virus de Hepatitis C',
    },
    grade: 'B',
    population: {
      description: 'Adults aged 18-79 years',
      descriptionI18n: {
        en: 'Adults aged 18-79 years',
        pt: 'Adultos de 18 a 79 anos',
        es: 'Adultos de 18 a 79 años',
      },
      ageRange: { min: 18, max: 79 },
      sex: 'all',
    },
    recommendation: {
      en: 'Screen for hepatitis C virus infection in adults aged 18-79 years',
      pt: 'Rastrear infecção pelo vírus da hepatite C em adultos de 18 a 79 anos',
      es: 'Detectar infección por virus de hepatitis C en adultos de 18 a 79 años',
    },
    interval: 'One-time (or periodic if ongoing risk)',
    method: ['HCV antibody test', 'HCV RNA if antibody positive'],
    publicationDate: '2020-03',
    relatedCodes: {
      icd10: ['B17.1', 'B18.2'],
      icd11: ['1E91'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/hepatitis-c-screening',
    evidenceSummary: {
      en: 'One-time universal screening enables treatment that can cure HCV and prevent cirrhosis and liver cancer.',
      pt: 'Rastreamento universal único permite tratamento que pode curar VHC e prevenir cirrose e câncer de fígado.',
    },
  },
  {
    id: 'hepatitis-b-screening',
    condition: 'Hepatitis B Screening',
    conditionI18n: {
      en: 'Hepatitis B Virus Infection Screening',
      pt: 'Rastreamento de Infecção pelo Vírus da Hepatite B',
      es: 'Detección de Infección por Virus de Hepatitis B',
    },
    grade: 'B',
    population: {
      description: 'Adults at increased risk for HBV infection',
      descriptionI18n: {
        en: 'Adults at increased risk for HBV infection',
        pt: 'Adultos com risco aumentado de infecção por VHB',
        es: 'Adultos con mayor riesgo de infección por VHB',
      },
      ageRange: { min: 18 },
      sex: 'all',
      riskFactors: ['Injection drug use', 'Men who have sex with men', 'Endemic regions'],
    },
    recommendation: {
      en: 'Screen for hepatitis B virus infection in adolescents and adults at increased risk',
      pt: 'Rastrear infecção pelo vírus da hepatite B em adolescentes e adultos com risco aumentado',
      es: 'Detectar infección por virus de hepatitis B en adolescentes y adultos con mayor riesgo',
    },
    interval: 'Periodic if ongoing risk',
    method: ['HBsAg', 'Anti-HBs', 'Anti-HBc'],
    publicationDate: '2020-12',
    relatedCodes: {
      icd10: ['B16', 'B18.1'],
      icd11: ['1E90'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/hepatitis-b-virus-infection-screening',
  },
  {
    id: 'hiv-screening',
    condition: 'HIV Screening',
    conditionI18n: {
      en: 'Human Immunodeficiency Virus (HIV) Screening',
      pt: 'Rastreamento de HIV',
      es: 'Detección de VIH',
    },
    grade: 'A',
    population: {
      description: 'Adults and adolescents aged 15-65 years',
      descriptionI18n: {
        en: 'Adults and adolescents aged 15-65 years',
        pt: 'Adultos e adolescentes de 15 a 65 anos',
        es: 'Adultos y adolescentes de 15 a 65 años',
      },
      ageRange: { min: 15, max: 65 },
      sex: 'all',
    },
    recommendation: {
      en: 'Screen for HIV infection in all adults and adolescents aged 15-65',
      pt: 'Rastrear infecção pelo HIV em todos adultos e adolescentes de 15 a 65 anos',
      es: 'Detectar infección por VIH en todos los adultos y adolescentes de 15 a 65 años',
    },
    interval: 'One-time (more frequent if high risk)',
    method: ['HIV antigen/antibody test', 'HIV-1/2 differentiation'],
    publicationDate: '2019-06',
    relatedCodes: {
      icd10: ['Z11.4', 'B20'],
      icd11: ['1C60'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/human-immunodeficiency-virus-hiv-infection-screening',
  },

  // ==========================================================================
  // PREGNANCY
  // ==========================================================================
  {
    id: 'gestational-diabetes-screening',
    condition: 'Gestational Diabetes Screening',
    conditionI18n: {
      en: 'Gestational Diabetes Mellitus Screening',
      pt: 'Rastreamento de Diabetes Mellitus Gestacional',
      es: 'Detección de Diabetes Mellitus Gestacional',
    },
    grade: 'B',
    population: {
      description: 'Pregnant persons at 24 weeks of gestation or after',
      descriptionI18n: {
        en: 'Pregnant persons at 24 weeks of gestation or after',
        pt: 'Gestantes a partir de 24 semanas de gestação',
        es: 'Personas embarazadas a partir de las 24 semanas de gestación',
      },
      sex: 'female',
    },
    recommendation: {
      en: 'Screen for gestational diabetes mellitus after 24 weeks of gestation',
      pt: 'Rastrear diabetes mellitus gestacional após 24 semanas de gestação',
      es: 'Detectar diabetes mellitus gestacional después de las 24 semanas de gestación',
    },
    interval: 'Once at 24-28 weeks',
    method: ['1-step 75g OGTT', '2-step screening (50g followed by 100g)'],
    publicationDate: '2021-08',
    relatedCodes: {
      icd10: ['O24.4'],
      icd11: ['5A13'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/gestational-diabetes-screening',
  },
  {
    id: 'preeclampsia-prevention',
    condition: 'Preeclampsia Prevention',
    conditionI18n: {
      en: 'Aspirin Use to Prevent Preeclampsia',
      pt: 'Uso de Aspirina para Prevenir Pré-eclâmpsia',
      es: 'Uso de Aspirina para Prevenir Preeclampsia',
    },
    grade: 'B',
    population: {
      description: 'Pregnant persons at high risk for preeclampsia',
      descriptionI18n: {
        en: 'Pregnant persons at high risk for preeclampsia',
        pt: 'Gestantes com alto risco de pré-eclâmpsia',
        es: 'Personas embarazadas con alto riesgo de preeclampsia',
      },
      sex: 'female',
      riskFactors: ['Previous preeclampsia', 'Chronic hypertension', 'Diabetes', 'Multifetal pregnancy'],
    },
    recommendation: {
      en: 'Use low-dose aspirin (81mg/day) after 12 weeks of gestation',
      pt: 'Usar aspirina em baixa dose (81mg/dia) após 12 semanas de gestação',
      es: 'Usar aspirina en dosis baja (81mg/día) después de las 12 semanas de gestación',
    },
    interval: 'Daily until delivery',
    method: ['Low-dose aspirin 81mg'],
    publicationDate: '2021-09',
    relatedCodes: {
      icd10: ['O14', 'O11'],
    },
    reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/low-dose-aspirin-use-for-the-prevention-of-morbidity-and-mortality-from-preeclampsia-preventive-medication',
  },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get recommendation by ID
 */
export function getUSPSTFRecommendationById(id: string): USPSTFRecommendation | undefined {
  return USPSTF_RECOMMENDATIONS.find(r => r.id === id);
}

/**
 * Get recommendations by grade
 */
export function getUSPSTFRecommendationsByGrade(grade: USPSTFGrade): USPSTFRecommendation[] {
  return USPSTF_RECOMMENDATIONS.filter(r => r.grade === grade);
}

/**
 * Get recommendations applicable to a specific age and sex
 */
export function getApplicableUSPSTFRecommendations(
  age: number,
  sex: 'male' | 'female'
): USPSTFRecommendation[] {
  return USPSTF_RECOMMENDATIONS.filter(r => {
    const pop = r.population;

    // Check age
    if (pop.ageRange) {
      if (pop.ageRange.min !== undefined && age < pop.ageRange.min) return false;
      if (pop.ageRange.max !== undefined && age > pop.ageRange.max) return false;
    }

    // Check sex
    if (pop.sex && pop.sex !== 'all' && pop.sex !== sex) return false;

    return true;
  });
}

/**
 * Get all Grade A and B recommendations (strongly recommended)
 */
export function getStronglyRecommendedUSPSTF(): USPSTFRecommendation[] {
  return USPSTF_RECOMMENDATIONS.filter(r => r.grade === 'A' || r.grade === 'B');
}

/**
 * Search recommendations by condition
 */
export function searchUSPSTFRecommendations(query: string): USPSTFRecommendation[] {
  const normalizedQuery = query.toLowerCase();
  return USPSTF_RECOMMENDATIONS.filter(r =>
    r.condition.toLowerCase().includes(normalizedQuery) ||
    Object.values(r.conditionI18n).some(c => c?.toLowerCase().includes(normalizedQuery)) ||
    Object.values(r.recommendation).some(c => c?.toLowerCase().includes(normalizedQuery))
  );
}

/**
 * Get USPSTF statistics
 */
export function getUSPSTFStats() {
  const byGrade: Record<USPSTFGrade, number> = { A: 0, B: 0, C: 0, D: 0, I: 0 };
  USPSTF_RECOMMENDATIONS.forEach(r => {
    byGrade[r.grade]++;
  });

  return {
    total: USPSTF_RECOMMENDATIONS.length,
    byGrade,
    stronglyRecommended: byGrade.A + byGrade.B,
    conditionallyRecommended: byGrade.C,
    notRecommended: byGrade.D,
    insufficientEvidence: byGrade.I,
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  USPSTF_RECOMMENDATIONS,
  USPSTF_GRADE_DEFINITIONS,
  getUSPSTFRecommendationById,
  getUSPSTFRecommendationsByGrade,
  getApplicableUSPSTFRecommendations,
  getStronglyRecommendedUSPSTF,
  searchUSPSTFRecommendations,
  getUSPSTFStats,
};
