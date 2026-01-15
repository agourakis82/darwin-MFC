/**
 * NHS/NICE RECOMMENDATIONS - DARWIN-MFC
 * ======================================
 *
 * National Health Service (UK) and National Institute for Health
 * and Care Excellence (NICE) guidelines for preventive services,
 * screenings, and clinical practice.
 *
 * Evidence Levels:
 * - High: Further research very unlikely to change confidence
 * - Moderate: Further research likely to have important impact
 * - Low: Further research very likely to change estimate
 * - Very Low: Any estimate is uncertain
 *
 * Recommendation Strength:
 * - Strong: Benefits clearly outweigh risks (or vice versa)
 * - Conditional: Benefits and risks closely balanced
 *
 * Sources:
 * - NHS Screening Programmes: https://www.gov.uk/topic/population-screening-programmes
 * - NICE Guidelines: https://www.nice.org.uk/guidance
 * Last Updated: 2024
 */

import type { LanguageCode } from '@/lib/ontology/types/ontology';

// =============================================================================
// TYPES
// =============================================================================

export type NICEEvidenceLevel = 'high' | 'moderate' | 'low' | 'very_low';
export type NICERecommendationStrength = 'strong' | 'conditional';
export type NHSProgrammeStatus = 'national' | 'pilot' | 'planned' | 'discontinued';

export interface NHSRecommendation {
  /** Unique identifier */
  id: string;

  /** Condition/topic being screened or managed */
  condition: string;

  /** Condition in multiple languages */
  conditionI18n: Partial<Record<LanguageCode, string>>;

  /** Source: NHS Screening Programme or NICE Guideline */
  source: 'nhs_screening' | 'nice_guideline';

  /** Programme status (for NHS screenings) */
  programmeStatus?: NHSProgrammeStatus;

  /** NICE evidence level */
  evidenceLevel?: NICEEvidenceLevel;

  /** Recommendation strength */
  strength?: NICERecommendationStrength;

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

  /** Screening/review interval */
  interval?: string;

  /** Method/modality */
  method?: string[];

  /** Publication/update date */
  publicationDate: string;

  /** NICE guideline number or NHS programme ID */
  guidelineId: string;

  /** Related ICD codes */
  relatedCodes?: {
    icd10?: string[];
    icd11?: string[];
  };

  /** Reference URL */
  reference: string;

  /** Key recommendations summary */
  keySummary?: Partial<Record<LanguageCode, string>>;
}

// =============================================================================
// EVIDENCE LEVEL DEFINITIONS
// =============================================================================

export const NICE_EVIDENCE_DEFINITIONS: Record<NICEEvidenceLevel, {
  label: Partial<Record<LanguageCode, string>>;
  meaning: Partial<Record<LanguageCode, string>>;
  color: string;
}> = {
  high: {
    label: {
      en: 'High Quality',
      pt: 'Alta Qualidade',
      es: 'Alta Calidad',
    },
    meaning: {
      en: 'Further research is very unlikely to change our confidence in the estimate of effect',
      pt: 'Pesquisas adicionais dificilmente mudarão nossa confiança na estimativa do efeito',
      es: 'Es muy improbable que investigaciones adicionales cambien nuestra confianza en la estimación del efecto',
    },
    color: '#22c55e', // green
  },
  moderate: {
    label: {
      en: 'Moderate Quality',
      pt: 'Qualidade Moderada',
      es: 'Calidad Moderada',
    },
    meaning: {
      en: 'Further research is likely to have an important impact on our confidence',
      pt: 'Pesquisas adicionais provavelmente terão um impacto importante na nossa confiança',
      es: 'Es probable que investigaciones adicionales tengan un impacto importante en nuestra confianza',
    },
    color: '#eab308', // yellow
  },
  low: {
    label: {
      en: 'Low Quality',
      pt: 'Baixa Qualidade',
      es: 'Baja Calidad',
    },
    meaning: {
      en: 'Further research is very likely to have an important impact and change the estimate',
      pt: 'Pesquisas adicionais provavelmente mudarão a estimativa',
      es: 'Es muy probable que investigaciones adicionales cambien la estimación',
    },
    color: '#f97316', // orange
  },
  very_low: {
    label: {
      en: 'Very Low Quality',
      pt: 'Qualidade Muito Baixa',
      es: 'Calidad Muy Baja',
    },
    meaning: {
      en: 'Any estimate of effect is very uncertain',
      pt: 'Qualquer estimativa de efeito é muito incerta',
      es: 'Cualquier estimación del efecto es muy incierta',
    },
    color: '#ef4444', // red
  },
};

export const NHS_PROGRAMME_STATUS: Record<NHSProgrammeStatus, {
  label: Partial<Record<LanguageCode, string>>;
  color: string;
}> = {
  national: {
    label: { en: 'National Programme', pt: 'Programa Nacional', es: 'Programa Nacional' },
    color: '#22c55e',
  },
  pilot: {
    label: { en: 'Pilot Programme', pt: 'Programa Piloto', es: 'Programa Piloto' },
    color: '#3b82f6',
  },
  planned: {
    label: { en: 'Planned', pt: 'Planejado', es: 'Planificado' },
    color: '#8b5cf6',
  },
  discontinued: {
    label: { en: 'Discontinued', pt: 'Descontinuado', es: 'Descontinuado' },
    color: '#6b7280',
  },
};

// =============================================================================
// NHS SCREENING PROGRAMMES
// =============================================================================

export const NHS_RECOMMENDATIONS: NHSRecommendation[] = [
  // -------------------------------------------------------------------------
  // CANCER SCREENING
  // -------------------------------------------------------------------------
  {
    id: 'nhs-breast-screening',
    condition: 'Breast Cancer',
    conditionI18n: {
      en: 'Breast Cancer',
      pt: 'Câncer de Mama',
      es: 'Cáncer de Mama',
      fr: 'Cancer du Sein',
      ar: 'سرطان الثدي',
      zh: '乳腺癌',
      ru: 'Рак молочной железы',
      el: 'Καρκίνος Μαστού',
      hi: 'स्तन कैंसर',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Women aged 50-70, extending to 47-73 in some areas',
      descriptionI18n: {
        en: 'Women aged 50-70, extending to 47-73 in some areas',
        pt: 'Mulheres de 50-70 anos, estendendo-se para 47-73 em algumas áreas',
        es: 'Mujeres de 50-70 años, extendiéndose a 47-73 en algunas áreas',
      },
      ageRange: { min: 50, max: 70 },
      sex: 'female',
    },
    recommendation: {
      en: 'Triennial mammography screening. Women over 70 can self-refer.',
      pt: 'Rastreamento mamográfico trienal. Mulheres acima de 70 podem se auto-encaminhar.',
      es: 'Mamografía de detección cada 3 años. Mujeres mayores de 70 pueden autoremitirse.',
    },
    interval: 'Every 3 years',
    method: ['Mammography'],
    publicationDate: '2023',
    guidelineId: 'NHS-BSP',
    relatedCodes: {
      icd10: ['C50'],
      icd11: ['2C6Y'],
    },
    reference: 'https://www.gov.uk/guidance/breast-screening-programme-overview',
    keySummary: {
      en: 'National programme invites women every 3 years. Age extension trial ongoing.',
      pt: 'Programa nacional convida mulheres a cada 3 anos. Teste de extensão de idade em andamento.',
    },
  },
  {
    id: 'nhs-cervical-screening',
    condition: 'Cervical Cancer',
    conditionI18n: {
      en: 'Cervical Cancer',
      pt: 'Câncer do Colo do Útero',
      es: 'Cáncer de Cuello Uterino',
      fr: 'Cancer du Col de l\'Utérus',
      ar: 'سرطان عنق الرحم',
      zh: '宫颈癌',
      ru: 'Рак шейки матки',
      el: 'Καρκίνος Τραχήλου Μήτρας',
      hi: 'गर्भाशय ग्रीवा कैंसर',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Women and people with a cervix aged 25-64',
      descriptionI18n: {
        en: 'Women and people with a cervix aged 25-64',
        pt: 'Mulheres e pessoas com colo do útero de 25-64 anos',
        es: 'Mujeres y personas con cuello uterino de 25-64 años',
      },
      ageRange: { min: 25, max: 64 },
      sex: 'female',
    },
    recommendation: {
      en: 'HPV primary screening. Ages 25-49: every 3 years. Ages 50-64: every 5 years.',
      pt: 'Rastreamento primário por HPV. 25-49 anos: a cada 3 anos. 50-64 anos: a cada 5 anos.',
      es: 'Detección primaria de VPH. 25-49 años: cada 3 años. 50-64 años: cada 5 años.',
    },
    interval: '3-5 years depending on age',
    method: ['HPV Test', 'Cervical cytology if HPV positive'],
    publicationDate: '2023',
    guidelineId: 'NHS-CSP',
    relatedCodes: {
      icd10: ['C53'],
      icd11: ['2C77'],
    },
    reference: 'https://www.gov.uk/guidance/cervical-screening-programme-overview',
    keySummary: {
      en: 'HPV primary testing rolled out nationally. Cytology only for HPV positive cases.',
      pt: 'Teste primário de HPV implementado nacionalmente. Citologia apenas para casos HPV positivos.',
    },
  },
  {
    id: 'nhs-bowel-screening',
    condition: 'Colorectal Cancer',
    conditionI18n: {
      en: 'Colorectal Cancer',
      pt: 'Câncer Colorretal',
      es: 'Cáncer Colorrectal',
      fr: 'Cancer Colorectal',
      ar: 'سرطان القولون والمستقيم',
      zh: '结直肠癌',
      ru: 'Колоректальный рак',
      el: 'Καρκίνος Παχέος Εντέρου',
      hi: 'कोलोरेक्टल कैंसर',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Adults aged 60-74 (England expanding to 50-59)',
      descriptionI18n: {
        en: 'Adults aged 60-74 (England expanding to 50-59)',
        pt: 'Adultos de 60-74 anos (Inglaterra expandindo para 50-59)',
        es: 'Adultos de 60-74 años (Inglaterra expandiendo a 50-59)',
      },
      ageRange: { min: 60, max: 74 },
      sex: 'all',
    },
    recommendation: {
      en: 'Biennial FIT (faecal immunochemical test) home kit. Colonoscopy if positive.',
      pt: 'Kit domiciliar FIT (teste imunoquímico fecal) bienal. Colonoscopia se positivo.',
      es: 'Kit casero FIT (prueba inmunoquímica fecal) bienal. Colonoscopia si es positivo.',
    },
    interval: 'Every 2 years',
    method: ['FIT (Faecal Immunochemical Test)', 'Colonoscopy'],
    publicationDate: '2023',
    guidelineId: 'NHS-BCSP',
    relatedCodes: {
      icd10: ['C18', 'C19', 'C20'],
      icd11: ['2B90', '2B91', '2B92'],
    },
    reference: 'https://www.gov.uk/guidance/bowel-screening-programme-overview',
    keySummary: {
      en: 'Age expansion ongoing to include 50-59 year olds. FIT replaced guaiac test.',
      pt: 'Expansão de idade em andamento para incluir 50-59 anos. FIT substituiu teste de guáiaco.',
    },
  },
  {
    id: 'nhs-lung-screening',
    condition: 'Lung Cancer',
    conditionI18n: {
      en: 'Lung Cancer',
      pt: 'Câncer de Pulmão',
      es: 'Cáncer de Pulmón',
      fr: 'Cancer du Poumon',
      ar: 'سرطان الرئة',
      zh: '肺癌',
      ru: 'Рак легких',
      el: 'Καρκίνος Πνεύμονα',
      hi: 'फेफड़ों का कैंसर',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Adults aged 55-74 who are current or former smokers',
      descriptionI18n: {
        en: 'Adults aged 55-74 who are current or former smokers',
        pt: 'Adultos de 55-74 anos que são fumantes atuais ou ex-fumantes',
        es: 'Adultos de 55-74 años que son fumadores actuales o exfumadores',
      },
      ageRange: { min: 55, max: 74 },
      sex: 'all',
      riskFactors: ['Current smoker', 'Former smoker'],
    },
    recommendation: {
      en: 'Targeted Lung Health Check with low-dose CT for eligible individuals.',
      pt: 'Verificação de Saúde Pulmonar Direcionada com TC de baixa dose para indivíduos elegíveis.',
      es: 'Chequeo de Salud Pulmonar Dirigido con TC de baja dosis para individuos elegibles.',
    },
    interval: 'Annual LDCT for those at high risk',
    method: ['Low-dose CT', 'Lung Health Check'],
    publicationDate: '2023',
    guidelineId: 'NHS-TLHC',
    relatedCodes: {
      icd10: ['C34'],
      icd11: ['2C25'],
    },
    reference: 'https://www.england.nhs.uk/contact-us/privacy-notice/how-we-use-your-information/our-services/the-nhs-lung-health-check-programme/',
    keySummary: {
      en: 'National rollout 2024. Risk-assessed screening using PLCO or Liverpool Lung Project models.',
      pt: 'Implementação nacional 2024. Rastreamento por avaliação de risco usando modelos PLCO ou Liverpool.',
    },
  },
  {
    id: 'nhs-aaa-screening',
    condition: 'Abdominal Aortic Aneurysm',
    conditionI18n: {
      en: 'Abdominal Aortic Aneurysm',
      pt: 'Aneurisma de Aorta Abdominal',
      es: 'Aneurisma de Aorta Abdominal',
      fr: 'Anévrisme de l\'Aorte Abdominale',
      ar: 'تمدد الأوعية الدموية الأبهري البطني',
      zh: '腹主动脉瘤',
      ru: 'Аневризма брюшной аорты',
      el: 'Ανεύρυσμα Κοιλιακής Αορτής',
      hi: 'उदर महाधमनी धमनीविस्फार',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Men in their 65th year',
      descriptionI18n: {
        en: 'Men in their 65th year',
        pt: 'Homens no seu 65º ano de vida',
        es: 'Hombres en su año 65 de vida',
      },
      ageRange: { min: 65, max: 65 },
      sex: 'male',
    },
    recommendation: {
      en: 'One-time ultrasound screening for abdominal aortic aneurysm.',
      pt: 'Rastreamento ultrassonográfico único para aneurisma de aorta abdominal.',
      es: 'Detección única por ultrasonido para aneurisma de aorta abdominal.',
    },
    interval: 'One-time at age 65',
    method: ['Abdominal ultrasound'],
    publicationDate: '2023',
    guidelineId: 'NHS-AAA',
    relatedCodes: {
      icd10: ['I71.4'],
      icd11: ['BD50.1'],
    },
    reference: 'https://www.gov.uk/guidance/abdominal-aortic-aneurysm-screening-programme-overview',
    keySummary: {
      en: 'Single scan at 65. Surveillance for small aneurysms (3-5.4cm). Surgery for large (>5.5cm).',
      pt: 'Exame único aos 65. Vigilância para aneurismas pequenos (3-5,4cm). Cirurgia para grandes (>5,5cm).',
    },
  },

  // -------------------------------------------------------------------------
  // DIABETES AND METABOLIC
  // -------------------------------------------------------------------------
  {
    id: 'nice-diabetes-prevention',
    condition: 'Type 2 Diabetes Prevention',
    conditionI18n: {
      en: 'Type 2 Diabetes Prevention',
      pt: 'Prevenção do Diabetes Tipo 2',
      es: 'Prevención de Diabetes Tipo 2',
      fr: 'Prévention du Diabète de Type 2',
      ar: 'الوقاية من داء السكري من النوع 2',
      zh: '2型糖尿病预防',
      ru: 'Профилактика диабета 2 типа',
      el: 'Πρόληψη Διαβήτη Τύπου 2',
      hi: 'टाइप 2 मधुमेह की रोकथाम',
    },
    source: 'nice_guideline',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Adults at high risk of developing type 2 diabetes (HbA1c 42-47 mmol/mol or fasting plasma glucose 5.5-6.9 mmol/L)',
      descriptionI18n: {
        en: 'Adults at high risk (HbA1c 42-47 mmol/mol or FPG 5.5-6.9 mmol/L)',
        pt: 'Adultos de alto risco (HbA1c 42-47 mmol/mol ou GJ 5,5-6,9 mmol/L)',
        es: 'Adultos de alto riesgo (HbA1c 42-47 mmol/mol o GPA 5,5-6,9 mmol/L)',
      },
      ageRange: { min: 18 },
      sex: 'all',
      riskFactors: ['Prediabetes', 'High BMI', 'Family history'],
    },
    recommendation: {
      en: 'Refer to NHS Diabetes Prevention Programme. Intensive lifestyle intervention with structured education.',
      pt: 'Encaminhar para o Programa de Prevenção de Diabetes do NHS. Intervenção intensiva no estilo de vida.',
      es: 'Derivar al Programa de Prevención de Diabetes del NHS. Intervención intensiva en estilo de vida.',
    },
    interval: 'Annual HbA1c monitoring for those at high risk',
    method: ['HbA1c', 'Fasting glucose', 'Lifestyle intervention'],
    publicationDate: '2023',
    guidelineId: 'PH38',
    relatedCodes: {
      icd10: ['R73.03', 'E11'],
      icd11: ['5A11'],
    },
    reference: 'https://www.nice.org.uk/guidance/ph38',
    keySummary: {
      en: 'NHS DPP offers 9-month behavioural support programme. 58% reduction in diabetes incidence.',
      pt: 'NHS DPP oferece programa de suporte comportamental de 9 meses. 58% de redução na incidência de diabetes.',
    },
  },
  {
    id: 'nhs-diabetic-eye-screening',
    condition: 'Diabetic Retinopathy',
    conditionI18n: {
      en: 'Diabetic Retinopathy',
      pt: 'Retinopatia Diabética',
      es: 'Retinopatía Diabética',
      fr: 'Rétinopathie Diabétique',
      ar: 'اعتلال الشبكية السكري',
      zh: '糖尿病视网膜病变',
      ru: 'Диабетическая ретинопатия',
      el: 'Διαβητική Αμφιβληστροειδοπάθεια',
      hi: 'डायबिटिक रेटिनोपैथी',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'All people with diabetes aged 12 and over',
      descriptionI18n: {
        en: 'All people with diabetes aged 12 and over',
        pt: 'Todas as pessoas com diabetes com 12 anos ou mais',
        es: 'Todas las personas con diabetes mayores de 12 años',
      },
      ageRange: { min: 12 },
      sex: 'all',
      riskFactors: ['Type 1 diabetes', 'Type 2 diabetes'],
    },
    recommendation: {
      en: 'Annual digital retinal photography. Biennial screening possible for low-risk groups.',
      pt: 'Fotografia retinal digital anual. Rastreamento bienal possível para grupos de baixo risco.',
      es: 'Fotografía retinal digital anual. Detección bienal posible para grupos de bajo riesgo.',
    },
    interval: 'Annual (or 2-yearly if consistently low risk)',
    method: ['Digital retinal photography', 'Mydriatic drops'],
    publicationDate: '2023',
    guidelineId: 'NHS-DESP',
    relatedCodes: {
      icd10: ['H36.0', 'E11.3', 'E10.3'],
      icd11: ['9B71.0'],
    },
    reference: 'https://www.gov.uk/guidance/diabetic-eye-screening-programme-overview',
    keySummary: {
      en: 'Leading cause of preventable blindness. Two-yearly screening safe for no/minimal retinopathy.',
      pt: 'Principal causa de cegueira evitável. Rastreamento bienal seguro sem/mínima retinopatia.',
    },
  },

  // -------------------------------------------------------------------------
  // CARDIOVASCULAR
  // -------------------------------------------------------------------------
  {
    id: 'nice-cvd-risk-assessment',
    condition: 'Cardiovascular Disease Prevention',
    conditionI18n: {
      en: 'Cardiovascular Disease Prevention',
      pt: 'Prevenção de Doença Cardiovascular',
      es: 'Prevención de Enfermedad Cardiovascular',
      fr: 'Prévention des Maladies Cardiovasculaires',
      ar: 'الوقاية من أمراض القلب والأوعية الدموية',
      zh: '心血管疾病预防',
      ru: 'Профилактика сердечно-сосудистых заболеваний',
      el: 'Πρόληψη Καρδιαγγειακών Νοσημάτων',
      hi: 'हृदय रोग की रोकथाम',
    },
    source: 'nice_guideline',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Adults aged 40-74 without pre-existing CVD',
      descriptionI18n: {
        en: 'Adults aged 40-74 without pre-existing CVD',
        pt: 'Adultos de 40-74 anos sem DCV pré-existente',
        es: 'Adultos de 40-74 años sin ECV preexistente',
      },
      ageRange: { min: 40, max: 74 },
      sex: 'all',
    },
    recommendation: {
      en: 'Use QRISK3 to estimate 10-year CVD risk. Offer statins if risk ≥10%. Consider at ≥7.5% with discussion.',
      pt: 'Usar QRISK3 para estimar risco de DCV em 10 anos. Oferecer estatinas se risco ≥10%.',
      es: 'Usar QRISK3 para estimar riesgo de ECV a 10 años. Ofrecer estatinas si riesgo ≥10%.',
    },
    interval: 'NHS Health Check every 5 years',
    method: ['QRISK3', 'Lipid profile', 'Blood pressure', 'HbA1c'],
    publicationDate: '2023',
    guidelineId: 'CG181',
    relatedCodes: {
      icd10: ['I25', 'I63', 'I21'],
      icd11: ['BA80', 'BA81'],
    },
    reference: 'https://www.nice.org.uk/guidance/cg181',
    keySummary: {
      en: 'QRISK3 includes additional factors (e.g., migraine, SLE, HIV). Atorvastatin 20mg first-line.',
      pt: 'QRISK3 inclui fatores adicionais (enxaqueca, LES, HIV). Atorvastatina 20mg primeira linha.',
    },
  },
  {
    id: 'nice-hypertension',
    condition: 'Hypertension',
    conditionI18n: {
      en: 'Hypertension',
      pt: 'Hipertensão',
      es: 'Hipertensión',
      fr: 'Hypertension',
      ar: 'ارتفاع ضغط الدم',
      zh: '高血压',
      ru: 'Гипертензия',
      el: 'Υπέρταση',
      hi: 'उच्च रक्तचाप',
    },
    source: 'nice_guideline',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Adults with clinic BP ≥140/90 mmHg',
      descriptionI18n: {
        en: 'Adults with clinic BP ≥140/90 mmHg',
        pt: 'Adultos com PA clínica ≥140/90 mmHg',
        es: 'Adultos con PA clínica ≥140/90 mmHg',
      },
      ageRange: { min: 18 },
      sex: 'all',
    },
    recommendation: {
      en: 'Confirm with ABPM/HBPM. Target <140/90 (or <130/80 if diabetes). Step 1: ACEi/ARB (<55yo, not Black) or CCB (≥55yo or Black).',
      pt: 'Confirmar com MAPA/MRPA. Meta <140/90 (ou <130/80 se diabetes). Etapa 1: iECA/BRA (<55a, não negro) ou BCC.',
      es: 'Confirmar con MAPA/AMPA. Meta <140/90 (o <130/80 si diabetes). Paso 1: IECA/ARA (<55a) o BCC.',
    },
    interval: 'Annual review minimum',
    method: ['ABPM (ambulatory BP monitoring)', 'HBPM (home BP monitoring)'],
    publicationDate: '2023',
    guidelineId: 'NG136',
    relatedCodes: {
      icd10: ['I10', 'I11', 'I15'],
      icd11: ['BA00', 'BA01'],
    },
    reference: 'https://www.nice.org.uk/guidance/ng136',
    keySummary: {
      en: 'ABPM is gold standard for diagnosis. Race-based recommendations under review after SPRINT.',
      pt: 'MAPA é padrão-ouro para diagnóstico. Recomendações baseadas em raça em revisão após SPRINT.',
    },
  },
  {
    id: 'nice-atrial-fibrillation',
    condition: 'Atrial Fibrillation',
    conditionI18n: {
      en: 'Atrial Fibrillation',
      pt: 'Fibrilação Atrial',
      es: 'Fibrilación Auricular',
      fr: 'Fibrillation Auriculaire',
      ar: 'الرجفان الأذيني',
      zh: '心房颤动',
      ru: 'Фибрилляция предсердий',
      el: 'Κολπική Μαρμαρυγή',
      hi: 'अलिंद तंतुविकंपन',
    },
    source: 'nice_guideline',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Adults with diagnosed or suspected AF',
      descriptionI18n: {
        en: 'Adults with diagnosed or suspected AF',
        pt: 'Adultos com FA diagnosticada ou suspeita',
        es: 'Adultos con FA diagnosticada o sospechada',
      },
      ageRange: { min: 18 },
      sex: 'all',
    },
    recommendation: {
      en: 'Use CHA2DS2-VASc for stroke risk. Anticoagulate if score ≥2 (men) or ≥3 (women). DOACs preferred over warfarin.',
      pt: 'Usar CHA2DS2-VASc para risco de AVC. Anticoagular se escore ≥2 (homens) ou ≥3 (mulheres). DOACs preferidos.',
      es: 'Usar CHA2DS2-VASc para riesgo de ictus. Anticoagular si puntuación ≥2 (hombres) o ≥3 (mujeres).',
    },
    interval: 'Annual review of anticoagulation',
    method: ['ECG', 'CHA2DS2-VASc', 'HAS-BLED'],
    publicationDate: '2023',
    guidelineId: 'NG196',
    relatedCodes: {
      icd10: ['I48'],
      icd11: ['BC81'],
    },
    reference: 'https://www.nice.org.uk/guidance/ng196',
    keySummary: {
      en: 'DOACs (apixaban, rivaroxaban, edoxaban, dabigatran) first-line. Consider LAA occlusion if anticoag contraindicated.',
      pt: 'DOACs primeira linha. Considerar oclusão de apêndice atrial se anticoag contraindicado.',
    },
  },

  // -------------------------------------------------------------------------
  // PREGNANCY
  // -------------------------------------------------------------------------
  {
    id: 'nhs-antenatal-screening',
    condition: 'Antenatal Screening',
    conditionI18n: {
      en: 'Antenatal and Newborn Screening',
      pt: 'Rastreamento Pré-natal e Neonatal',
      es: 'Detección Prenatal y Neonatal',
      fr: 'Dépistage Prénatal et Néonatal',
      ar: 'فحص ما قبل الولادة وحديثي الولادة',
      zh: '产前和新生儿筛查',
      ru: 'Антенатальный и неонатальный скрининг',
      el: 'Προγεννητικός και Νεογνικός Έλεγχος',
      hi: 'प्रसव पूर्व और नवजात जांच',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'All pregnant women',
      descriptionI18n: {
        en: 'All pregnant women',
        pt: 'Todas as gestantes',
        es: 'Todas las mujeres embarazadas',
      },
      sex: 'female',
    },
    recommendation: {
      en: 'Offer screening for: HIV, hepatitis B, syphilis, sickle cell/thalassaemia, Downs/Edwards/Patau syndromes. NIPT available.',
      pt: 'Oferecer rastreamento para: HIV, hepatite B, sífilis, falciforme/talassemia, síndromes de Down/Edwards/Patau. NIPT disponível.',
      es: 'Ofrecer detección de: VIH, hepatitis B, sífilis, drepanocitosis/talasemia, síndromes de Down/Edwards/Patau.',
    },
    interval: 'Booking appointment (8-10 weeks)',
    method: ['Blood tests', 'Combined test (12-14 weeks)', 'Quadruple test (15-20 weeks)', 'NIPT'],
    publicationDate: '2023',
    guidelineId: 'NHS-ANNB',
    relatedCodes: {
      icd10: ['Z36'],
      icd11: ['QA48'],
    },
    reference: 'https://www.gov.uk/guidance/nhs-fetal-anomaly-screening-programme-overview',
    keySummary: {
      en: 'Combined test at 12-14 weeks (NT + beta-hCG + PAPP-A). NIPT offered if risk >1:150 for T21.',
      pt: 'Teste combinado às 12-14 semanas (TN + beta-hCG + PAPP-A). NIPT oferecido se risco >1:150 para T21.',
    },
  },
  {
    id: 'nice-gestational-diabetes',
    condition: 'Gestational Diabetes',
    conditionI18n: {
      en: 'Gestational Diabetes',
      pt: 'Diabetes Gestacional',
      es: 'Diabetes Gestacional',
      fr: 'Diabète Gestationnel',
      ar: 'سكري الحمل',
      zh: '妊娠糖尿病',
      ru: 'Гестационный диабет',
      el: 'Διαβήτης Κύησης',
      hi: 'गर्भकालीन मधुमेह',
    },
    source: 'nice_guideline',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Pregnant women with risk factors (BMI >30, previous GDM, family history, South Asian/Black ethnicity)',
      descriptionI18n: {
        en: 'Pregnant women with risk factors',
        pt: 'Gestantes com fatores de risco',
        es: 'Mujeres embarazadas con factores de riesgo',
      },
      sex: 'female',
      riskFactors: ['BMI >30', 'Previous GDM', 'Previous macrosomia', 'Family history DM', 'South Asian/Black ethnicity'],
    },
    recommendation: {
      en: 'OGTT at 24-28 weeks for at-risk women. Immediate OGTT if previous GDM. Diagnose if fasting ≥5.6 or 2hr ≥7.8 mmol/L.',
      pt: 'TOTG às 24-28 semanas para mulheres de risco. TOTG imediato se DMG prévio. Diagnosticar se jejum ≥5,6 ou 2h ≥7,8 mmol/L.',
      es: 'PTOG a las 24-28 semanas para mujeres de riesgo. PTOG inmediato si DMG previa. Diagnosticar si ayuno ≥5,6 o 2h ≥7,8 mmol/L.',
    },
    interval: '24-28 weeks gestation (or earlier if previous GDM)',
    method: ['75g OGTT', 'Blood glucose monitoring'],
    publicationDate: '2023',
    guidelineId: 'NG3',
    relatedCodes: {
      icd10: ['O24.4'],
      icd11: ['JA63'],
    },
    reference: 'https://www.nice.org.uk/guidance/ng3',
    keySummary: {
      en: 'Lower thresholds than WHO/IADPSG. Metformin first-line if diet fails. Postnatal 6-13 week HbA1c.',
      pt: 'Limites mais baixos que OMS/IADPSG. Metformina primeira linha se dieta falhar. HbA1c 6-13 semanas pós-parto.',
    },
  },

  // -------------------------------------------------------------------------
  // INFECTIOUS DISEASES
  // -------------------------------------------------------------------------
  {
    id: 'nice-hiv-testing',
    condition: 'HIV',
    conditionI18n: {
      en: 'HIV',
      pt: 'HIV',
      es: 'VIH',
      fr: 'VIH',
      ar: 'فيروس نقص المناعة البشرية',
      zh: '艾滋病毒',
      ru: 'ВИЧ',
      el: 'HIV',
      hi: 'एचआईवी',
    },
    source: 'nice_guideline',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'All adults in areas with HIV prevalence ≥2/1000. High-risk groups everywhere.',
      descriptionI18n: {
        en: 'All adults in high-prevalence areas (≥2/1000)',
        pt: 'Todos os adultos em áreas de alta prevalência (≥2/1000)',
        es: 'Todos los adultos en áreas de alta prevalencia (≥2/1000)',
      },
      ageRange: { min: 16 },
      sex: 'all',
      riskFactors: ['MSM', 'PWID', 'Partners from high-prevalence countries', 'Blood transfusion in non-screened areas'],
    },
    recommendation: {
      en: 'Offer HIV test to all new registrations in high-prevalence areas. Routine opt-out testing in antenatal, GUM, drug services.',
      pt: 'Oferecer teste de HIV a todos os novos registros em áreas de alta prevalência. Teste opt-out de rotina em pré-natal.',
      es: 'Ofrecer prueba de VIH a todos los nuevos registros en áreas de alta prevalencia.',
    },
    interval: 'As per risk exposure',
    method: ['4th generation HIV test', 'Point-of-care rapid test'],
    publicationDate: '2023',
    guidelineId: 'NG60',
    relatedCodes: {
      icd10: ['B20', 'Z21'],
      icd11: ['1C62'],
    },
    reference: 'https://www.nice.org.uk/guidance/ng60',
    keySummary: {
      en: 'Opt-out testing normalizes HIV screening. Late diagnosis (CD4 <350) associated with poor outcomes.',
      pt: 'Teste opt-out normaliza rastreamento de HIV. Diagnóstico tardio (CD4 <350) associado a piores desfechos.',
    },
  },
  {
    id: 'nice-hepatitis-b-screening',
    condition: 'Hepatitis B',
    conditionI18n: {
      en: 'Hepatitis B',
      pt: 'Hepatite B',
      es: 'Hepatitis B',
      fr: 'Hépatite B',
      ar: 'التهاب الكبد B',
      zh: '乙型肝炎',
      ru: 'Гепатит B',
      el: 'Ηπατίτιδα Β',
      hi: 'हेपेटाइटिस बी',
    },
    source: 'nice_guideline',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Pregnant women, high-risk groups, healthcare workers, household contacts',
      descriptionI18n: {
        en: 'Pregnant women, high-risk groups, healthcare workers',
        pt: 'Gestantes, grupos de alto risco, profissionais de saúde',
        es: 'Mujeres embarazadas, grupos de alto riesgo, trabajadores de salud',
      },
      sex: 'all',
      riskFactors: ['PWID', 'MSM', 'Born in high-prevalence country', 'Household contact of HBsAg+'],
    },
    recommendation: {
      en: 'Universal antenatal HBsAg screening. Vaccinate high-risk groups. Test household contacts.',
      pt: 'Rastreamento pré-natal universal de HBsAg. Vacinar grupos de alto risco. Testar contatos domiciliares.',
      es: 'Detección prenatal universal de HBsAg. Vacunar grupos de alto riesgo. Testar contactos domiciliarios.',
    },
    interval: 'At booking (pregnant), as per risk (others)',
    method: ['HBsAg serology', 'HBV DNA if positive'],
    publicationDate: '2023',
    guidelineId: 'NG165',
    relatedCodes: {
      icd10: ['B16', 'B18.1'],
      icd11: ['1E50.1'],
    },
    reference: 'https://www.nice.org.uk/guidance/ng165',
    keySummary: {
      en: 'Neonatal immunoprophylaxis for HBsAg+ mothers. Tenofovir in 3rd trimester if high VL to prevent MTCT.',
      pt: 'Imunoprofilaxia neonatal para mães HBsAg+. Tenofovir no 3º trimestre se CV alta para prevenir TVMF.',
    },
  },
  {
    id: 'nice-hepatitis-c-screening',
    condition: 'Hepatitis C',
    conditionI18n: {
      en: 'Hepatitis C',
      pt: 'Hepatite C',
      es: 'Hepatitis C',
      fr: 'Hépatite C',
      ar: 'التهاب الكبد C',
      zh: '丙型肝炎',
      ru: 'Гепатит C',
      el: 'Ηπατίτιδα C',
      hi: 'हेपेटाइटिस सी',
    },
    source: 'nice_guideline',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'PWID (current/past), recipients of blood products before 1991, born in high-prevalence countries',
      descriptionI18n: {
        en: 'PWID, blood transfusion before 1991, born in high-prevalence areas',
        pt: 'UDIV, transfusão antes de 1991, nascidos em áreas de alta prevalência',
        es: 'UDVP, transfusión antes de 1991, nacidos en áreas de alta prevalencia',
      },
      sex: 'all',
      riskFactors: ['PWID', 'Blood transfusion <1991', 'Born in high-prevalence country', 'HIV positive', 'Tattoo/piercing in unsterile setting'],
    },
    recommendation: {
      en: 'Offer HCV antibody test to all at-risk individuals. Reflex HCV RNA if positive. DAA treatment to all with active infection.',
      pt: 'Oferecer teste de anticorpos HCV a todos em risco. RNA HCV se positivo. Tratamento DAA para todos com infecção ativa.',
      es: 'Ofrecer prueba de anticuerpos VHC a todos en riesgo. ARN VHC si positivo. Tratamiento AAD para infección activa.',
    },
    interval: 'Annual for ongoing risk (active PWID)',
    method: ['HCV Ab', 'HCV RNA if Ab positive'],
    publicationDate: '2023',
    guidelineId: 'NG225',
    relatedCodes: {
      icd10: ['B17.1', 'B18.2'],
      icd11: ['1E50.2'],
    },
    reference: 'https://www.nice.org.uk/guidance/ng225',
    keySummary: {
      en: 'WHO elimination target 2030. DAAs achieve >95% cure. Treat-all strategy regardless of fibrosis.',
      pt: 'Meta de eliminação OMS 2030. DAAs alcançam >95% de cura. Estratégia tratar-todos independente de fibrose.',
    },
  },

  // -------------------------------------------------------------------------
  // MENTAL HEALTH
  // -------------------------------------------------------------------------
  {
    id: 'nice-depression-screening',
    condition: 'Depression',
    conditionI18n: {
      en: 'Depression',
      pt: 'Depressão',
      es: 'Depresión',
      fr: 'Dépression',
      ar: 'الاكتئاب',
      zh: '抑郁症',
      ru: 'Депрессия',
      el: 'Κατάθλιψη',
      hi: 'अवसाद',
    },
    source: 'nice_guideline',
    evidenceLevel: 'moderate',
    strength: 'conditional',
    population: {
      description: 'Adults with chronic physical health problems, previous depression, or unexplained symptoms',
      descriptionI18n: {
        en: 'Adults with chronic conditions or history of depression',
        pt: 'Adultos com condições crônicas ou histórico de depressão',
        es: 'Adultos con condiciones crónicas o historia de depresión',
      },
      ageRange: { min: 18 },
      sex: 'all',
      riskFactors: ['Chronic physical illness', 'Previous depression', 'Unexplained symptoms', 'Social isolation'],
    },
    recommendation: {
      en: 'Be alert to possible depression. Use PHQ-2/9. Stepped care: watchful waiting → guided self-help → CBT/antidepressants.',
      pt: 'Estar atento a possível depressão. Usar PHQ-2/9. Cuidado escalonado: vigilância → autoajuda → TCC/antidepressivos.',
      es: 'Estar atento a posible depresión. Usar PHQ-2/9. Cuidado escalonado: vigilancia → autoayuda → TCC/antidepresivos.',
    },
    interval: 'Opportunistic screening',
    method: ['PHQ-2', 'PHQ-9', 'Clinical interview'],
    publicationDate: '2022',
    guidelineId: 'CG90/CG91',
    relatedCodes: {
      icd10: ['F32', 'F33'],
      icd11: ['6A70', '6A71'],
    },
    reference: 'https://www.nice.org.uk/guidance/cg90',
    keySummary: {
      en: 'Stepped care model. SSRIs first-line. Consider mirtazapine if poor sleep. Review in 2 weeks after starting.',
      pt: 'Modelo de cuidado escalonado. ISRS primeira linha. Considerar mirtazapina se sono ruim. Revisar em 2 semanas.',
    },
  },
  {
    id: 'nice-dementia-screening',
    condition: 'Dementia',
    conditionI18n: {
      en: 'Dementia',
      pt: 'Demência',
      es: 'Demencia',
      fr: 'Démence',
      ar: 'الخرف',
      zh: '痴呆症',
      ru: 'Деменция',
      el: 'Άνοια',
      hi: 'मनोभ्रंश',
    },
    source: 'nice_guideline',
    evidenceLevel: 'moderate',
    strength: 'conditional',
    population: {
      description: 'Adults presenting with memory concerns or cognitive symptoms',
      descriptionI18n: {
        en: 'Adults with memory concerns or cognitive symptoms',
        pt: 'Adultos com queixas de memória ou sintomas cognitivos',
        es: 'Adultos con quejas de memoria o síntomas cognitivos',
      },
      ageRange: { min: 40 },
      sex: 'all',
    },
    recommendation: {
      en: 'Do not screen asymptomatic adults. For symptomatic: take history, cognitive assessment (10-CS, GPCOG, MoCA), bloods (TFTs, B12, glucose).',
      pt: 'Não rastrear adultos assintomáticos. Para sintomáticos: história, avaliação cognitiva, exames laboratoriais.',
      es: 'No detectar adultos asintomáticos. Para sintomáticos: historia, evaluación cognitiva, análisis.',
    },
    interval: 'As clinically indicated',
    method: ['10-CS', 'GPCOG', '6-CIT', 'MoCA', 'Blood tests'],
    publicationDate: '2023',
    guidelineId: 'NG97',
    relatedCodes: {
      icd10: ['F00', 'F01', 'F02', 'F03', 'G30'],
      icd11: ['6D80', '6D81', '6D82', '8A20'],
    },
    reference: 'https://www.nice.org.uk/guidance/ng97',
    keySummary: {
      en: 'Memory services for specialist diagnosis. AChE inhibitors for mild-moderate AD. Memantine for moderate-severe.',
      pt: 'Serviços de memória para diagnóstico especializado. Inibidores AChE para DA leve-moderada. Memantina para moderada-grave.',
    },
  },

  // -------------------------------------------------------------------------
  // NEONATAL
  // -------------------------------------------------------------------------
  {
    id: 'nhs-newborn-blood-spot',
    condition: 'Newborn Blood Spot Screening',
    conditionI18n: {
      en: 'Newborn Blood Spot Screening',
      pt: 'Triagem Neonatal (Teste do Pezinho)',
      es: 'Prueba del Talón Neonatal',
      fr: 'Dépistage Néonatal par Prélèvement Sanguin',
      ar: 'فحص بقعة الدم لحديثي الولادة',
      zh: '新生儿血斑筛查',
      ru: 'Скрининг новорожденных (пяточный тест)',
      el: 'Νεογνικός Έλεγχος Αίματος',
      hi: 'नवजात रक्त स्थान जांच',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'All newborns at 5 days of age',
      descriptionI18n: {
        en: 'All newborns at 5 days of age',
        pt: 'Todos os recém-nascidos aos 5 dias de vida',
        es: 'Todos los recién nacidos a los 5 días de vida',
      },
      ageRange: { min: 0, max: 0 },
      sex: 'all',
    },
    recommendation: {
      en: 'Screen for 9 conditions: PKU, CHT, CF, MCADD, HCU, MSUD, GA1, IVA, sickle cell disease.',
      pt: 'Rastrear 9 condições: PKU, HC, FC, MCADD, HCU, MSUD, GA1, AIV, doença falciforme.',
      es: 'Detectar 9 condiciones: PKU, HC, FQ, MCADD, HCU, MSUD, GA1, AIV, enfermedad falciforme.',
    },
    interval: 'One-time at day 5',
    method: ['Heel prick blood spot'],
    publicationDate: '2023',
    guidelineId: 'NHS-NBS',
    relatedCodes: {
      icd10: ['E70.0', 'E03', 'E84', 'E71.1'],
      icd11: ['5C50.0', '5A00.1', 'CA25', '5C52.0'],
    },
    reference: 'https://www.gov.uk/guidance/newborn-blood-spot-screening-programme-overview',
    keySummary: {
      en: 'Ideally day 5 (acceptable day 5-8). 9 conditions currently screened. SCID screening piloting.',
      pt: 'Idealmente dia 5 (aceitável dia 5-8). 9 condições atualmente rastreadas. Piloto de rastreamento de SCID.',
    },
  },
  {
    id: 'nhs-newborn-hearing',
    condition: 'Newborn Hearing Screening',
    conditionI18n: {
      en: 'Newborn Hearing Screening',
      pt: 'Triagem Auditiva Neonatal',
      es: 'Prueba de Audición Neonatal',
      fr: 'Dépistage Auditif Néonatal',
      ar: 'فحص السمع لحديثي الولادة',
      zh: '新生儿听力筛查',
      ru: 'Скрининг слуха новорожденных',
      el: 'Νεογνικός Έλεγχος Ακοής',
      hi: 'नवजात श्रवण जांच',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'All newborns, ideally within first 4-5 weeks',
      descriptionI18n: {
        en: 'All newborns, ideally within first 4-5 weeks',
        pt: 'Todos os recém-nascidos, idealmente nas primeiras 4-5 semanas',
        es: 'Todos los recién nacidos, idealmente en las primeras 4-5 semanas',
      },
      ageRange: { min: 0, max: 0 },
      sex: 'all',
    },
    recommendation: {
      en: 'Automated otoacoustic emissions (AOAE). Automated auditory brainstem response (AABR) if AOAE refer.',
      pt: 'Emissões otoacústicas automatizadas (EOAT). Potencial evocado auditivo automatizado (PEATE) se falha na EOAT.',
      es: 'Emisiones otoacústicas automatizadas (EOA). Potenciales evocados auditivos automatizados (PEAT) si falla EOA.',
    },
    interval: 'One-time in newborn period',
    method: ['AOAE', 'AABR'],
    publicationDate: '2023',
    guidelineId: 'NHS-NHSP',
    relatedCodes: {
      icd10: ['H90', 'H91'],
      icd11: ['AB50', 'AB51'],
    },
    reference: 'https://www.gov.uk/guidance/newborn-hearing-screening-programme-nhsp-overview',
    keySummary: {
      en: 'Detection of moderate+ hearing loss. 1-2 per 1000 affected. Early intervention improves outcomes.',
      pt: 'Detecção de perda auditiva moderada+. 1-2 por 1000 afetados. Intervenção precoce melhora desfechos.',
    },
  },
  {
    id: 'nhs-newborn-physical-exam',
    condition: 'Newborn and Infant Physical Examination',
    conditionI18n: {
      en: 'Newborn and Infant Physical Examination',
      pt: 'Exame Físico do Recém-nascido e Lactente',
      es: 'Examen Físico del Recién Nacido y Lactante',
      fr: 'Examen Physique du Nouveau-né et Nourrisson',
      ar: 'الفحص البدني لحديثي الولادة والرضع',
      zh: '新生儿和婴儿体格检查',
      ru: 'Физикальный осмотр новорожденного и младенца',
      el: 'Φυσική Εξέταση Νεογνού και Βρέφους',
      hi: 'नवजात और शिशु शारीरिक परीक्षा',
    },
    source: 'nhs_screening',
    programmeStatus: 'national',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'All newborns within 72 hours and at 6-8 weeks',
      descriptionI18n: {
        en: 'All newborns within 72 hours and at 6-8 weeks',
        pt: 'Todos os recém-nascidos em 72 horas e às 6-8 semanas',
        es: 'Todos los recién nacidos dentro de 72 horas y a las 6-8 semanas',
      },
      ageRange: { min: 0, max: 0 },
      sex: 'all',
    },
    recommendation: {
      en: 'Screen for: congenital cataracts, DDH, cryptorchidism, congenital heart disease.',
      pt: 'Rastrear: catarata congênita, DDQ, criptorquidia, cardiopatia congênita.',
      es: 'Detectar: cataratas congénitas, DDC, criptorquidia, cardiopatía congénita.',
    },
    interval: 'Within 72 hours + 6-8 weeks',
    method: ['Physical examination', 'Red reflex', 'Hip examination', 'Heart auscultation', 'Testicular examination'],
    publicationDate: '2023',
    guidelineId: 'NHS-NIPE',
    relatedCodes: {
      icd10: ['Q12.0', 'Q65', 'Q53', 'Q20-Q28'],
      icd11: ['LA13.0', 'LB72', 'LB04', 'LA8Y'],
    },
    reference: 'https://www.gov.uk/guidance/newborn-and-infant-physical-examination-screening-programme-overview',
    keySummary: {
      en: 'Two examinations: newborn and 6-8 week check. Repeat hip exam at 6-8 weeks critical for DDH detection.',
      pt: 'Dois exames: neonatal e 6-8 semanas. Repetição do exame do quadril às 6-8 semanas crítica para DDQ.',
    },
  },

  // -------------------------------------------------------------------------
  // BONE HEALTH
  // -------------------------------------------------------------------------
  {
    id: 'nice-osteoporosis-fracture-risk',
    condition: 'Osteoporosis and Fracture Risk',
    conditionI18n: {
      en: 'Osteoporosis and Fracture Risk',
      pt: 'Osteoporose e Risco de Fratura',
      es: 'Osteoporosis y Riesgo de Fractura',
      fr: 'Ostéoporose et Risque de Fracture',
      ar: 'هشاشة العظام ومخاطر الكسر',
      zh: '骨质疏松症和骨折风险',
      ru: 'Остеопороз и риск переломов',
      el: 'Οστεοπόρωση και Κίνδυνος Κατάγματος',
      hi: 'ऑस्टियोपोरोसिस और फ्रैक्चर जोखिम',
    },
    source: 'nice_guideline',
    evidenceLevel: 'high',
    strength: 'strong',
    population: {
      description: 'Women ≥65, men ≥75, or younger adults with risk factors',
      descriptionI18n: {
        en: 'Women ≥65, men ≥75, or with risk factors',
        pt: 'Mulheres ≥65, homens ≥75, ou com fatores de risco',
        es: 'Mujeres ≥65, hombres ≥75, o con factores de riesgo',
      },
      ageRange: { min: 50 },
      sex: 'all',
      riskFactors: ['Previous fragility fracture', 'Systemic glucocorticoids', 'Rheumatoid arthritis', 'Low BMI', 'Parental hip fracture'],
    },
    recommendation: {
      en: 'Use FRAX (with BMD if available) to assess 10-year fracture risk. Consider treatment if major osteoporotic fracture risk >10% or hip fracture risk >3%.',
      pt: 'Usar FRAX (com DMO se disponível). Considerar tratamento se risco de fratura osteoporótica maior >10% ou quadril >3%.',
      es: 'Usar FRAX (con DMO si disponible). Considerar tratamiento si riesgo de fractura osteoporótica mayor >10% o cadera >3%.',
    },
    interval: 'Reassess fracture risk every 5 years or after new fracture',
    method: ['FRAX', 'DXA BMD'],
    publicationDate: '2023',
    guidelineId: 'CG146',
    relatedCodes: {
      icd10: ['M80', 'M81'],
      icd11: ['FB83.0', 'FB83.1'],
    },
    reference: 'https://www.nice.org.uk/guidance/cg146',
    keySummary: {
      en: 'Bisphosphonates first-line. Alendronate 70mg weekly. Denosumab if bisphosphonate intolerant.',
      pt: 'Bisfosfonatos primeira linha. Alendronato 70mg semanal. Denosumabe se intolerância a bisfosfonatos.',
    },
  },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get recommendation by ID
 */
export function getNHSRecommendationById(id: string): NHSRecommendation | undefined {
  return NHS_RECOMMENDATIONS.find(r => r.id === id);
}

/**
 * Get recommendations by source type
 */
export function getRecommendationsBySource(source: 'nhs_screening' | 'nice_guideline'): NHSRecommendation[] {
  return NHS_RECOMMENDATIONS.filter(r => r.source === source);
}

/**
 * Get NHS screening programmes by status
 */
export function getScreeningProgrammesByStatus(status: NHSProgrammeStatus): NHSRecommendation[] {
  return NHS_RECOMMENDATIONS.filter(r => r.programmeStatus === status);
}

/**
 * Get recommendations applicable to a specific age and sex
 */
export function getApplicableNHSRecommendations(
  age: number,
  sex: 'male' | 'female'
): NHSRecommendation[] {
  return NHS_RECOMMENDATIONS.filter(rec => {
    // Check sex
    if (rec.population.sex && rec.population.sex !== 'all' && rec.population.sex !== sex) {
      return false;
    }
    // Check age range
    const range = rec.population.ageRange;
    if (range) {
      if (range.min !== undefined && age < range.min) return false;
      if (range.max !== undefined && age > range.max) return false;
    }
    return true;
  });
}

/**
 * Get recommendations by evidence level
 */
export function getRecommendationsByEvidenceLevel(level: NICEEvidenceLevel): NHSRecommendation[] {
  return NHS_RECOMMENDATIONS.filter(r => r.evidenceLevel === level);
}

/**
 * Get recommendations by strength
 */
export function getRecommendationsByStrength(strength: NICERecommendationStrength): NHSRecommendation[] {
  return NHS_RECOMMENDATIONS.filter(r => r.strength === strength);
}

/**
 * Get recommendations by ICD-10 code
 */
export function getRecommendationsByICD10(icd10Code: string): NHSRecommendation[] {
  return NHS_RECOMMENDATIONS.filter(rec =>
    rec.relatedCodes?.icd10?.some(code =>
      code.toLowerCase() === icd10Code.toLowerCase() ||
      icd10Code.toLowerCase().startsWith(code.toLowerCase())
    )
  );
}

/**
 * Search recommendations by term in any language
 */
export function searchNHSRecommendations(
  query: string,
  language: LanguageCode = 'en'
): NHSRecommendation[] {
  const lowerQuery = query.toLowerCase();
  return NHS_RECOMMENDATIONS.filter(rec => {
    // Search in condition
    if (rec.condition.toLowerCase().includes(lowerQuery)) return true;
    if (rec.conditionI18n[language]?.toLowerCase().includes(lowerQuery)) return true;

    // Search in recommendation text
    if (rec.recommendation[language]?.toLowerCase().includes(lowerQuery)) return true;

    // Search in key summary
    if (rec.keySummary?.[language]?.toLowerCase().includes(lowerQuery)) return true;

    return false;
  });
}

/**
 * Get all cancer screening recommendations
 */
export function getCancerScreeningRecommendations(): NHSRecommendation[] {
  const cancerIds = ['nhs-breast-screening', 'nhs-cervical-screening', 'nhs-bowel-screening', 'nhs-lung-screening'];
  return NHS_RECOMMENDATIONS.filter(r => cancerIds.includes(r.id));
}

/**
 * Get all neonatal screening recommendations
 */
export function getNeonatalScreeningRecommendations(): NHSRecommendation[] {
  return NHS_RECOMMENDATIONS.filter(r =>
    r.id.includes('newborn') || r.id.includes('neonatal')
  );
}

/**
 * Get all cardiovascular recommendations
 */
export function getCardiovascularRecommendations(): NHSRecommendation[] {
  const cvdIds = ['nice-cvd-risk-assessment', 'nice-hypertension', 'nice-atrial-fibrillation', 'nhs-aaa-screening'];
  return NHS_RECOMMENDATIONS.filter(r => cvdIds.includes(r.id));
}

/**
 * Compare NHS recommendation with another protocol source
 * Returns comparison points for the same condition
 */
export function compareWithNHS(conditionTerm: string): {
  nhsRecommendation?: NHSRecommendation;
  matchedBy: 'id' | 'condition' | 'icd10' | 'none';
} {
  // Try to find by ID first
  let recommendation = getNHSRecommendationById(conditionTerm);
  if (recommendation) {
    return { nhsRecommendation: recommendation, matchedBy: 'id' };
  }

  // Try to find by condition name
  recommendation = NHS_RECOMMENDATIONS.find(r =>
    r.condition.toLowerCase() === conditionTerm.toLowerCase()
  );
  if (recommendation) {
    return { nhsRecommendation: recommendation, matchedBy: 'condition' };
  }

  // Try to find by ICD-10 code
  const byICD = getRecommendationsByICD10(conditionTerm);
  if (byICD.length > 0) {
    return { nhsRecommendation: byICD[0], matchedBy: 'icd10' };
  }

  return { matchedBy: 'none' };
}
