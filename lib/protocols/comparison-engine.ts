/**
 * PROTOCOL COMPARISON ENGINE - DARWIN-MFC
 * ========================================
 *
 * Engine for comparing preventive care and screening recommendations
 * across multiple health systems and guidelines:
 *
 * - Brazil SUS (Sistema Único de Saúde)
 * - USA USPSTF (U.S. Preventive Services Task Force)
 * - UK NHS/NICE (National Health Service / NICE)
 * - WHO (World Health Organization)
 * - India NP-NCD (National Programme for NCDs)
 *
 * Features:
 * - Side-by-side comparison of recommendations
 * - Convergence/divergence analysis
 * - Regional adaptation based on resource availability
 * - Evidence level comparison
 */

import type { LanguageCode } from '@/lib/ontology/types/ontology';
import { USPSTF_RECOMMENDATIONS, type USPSTFRecommendation, type USPSTFGrade } from '@/lib/data/protocols/uspstf';
import { NHS_RECOMMENDATIONS, type NHSRecommendation, type NICEEvidenceLevel } from '@/lib/data/protocols/nhs';

// =============================================================================
// TYPES
// =============================================================================

export type ProtocolSource = 'sus' | 'uspstf' | 'nhs' | 'who' | 'india';

export type ConvergenceStatus = 'convergence' | 'partial' | 'divergence' | 'not_comparable';

export type ResourceLevel = 'high' | 'medium' | 'low';

export interface ProtocolRecommendation {
  source: ProtocolSource;
  conditionId: string;
  condition: string;
  conditionI18n: Partial<Record<LanguageCode, string>>;
  recommendation: Partial<Record<LanguageCode, string>>;
  population: {
    description: string;
    ageRange?: { min?: number; max?: number };
    sex?: 'male' | 'female' | 'all';
    riskFactors?: string[];
  };
  interval?: string;
  method?: string[];
  grade?: {
    value: string;
    label: Partial<Record<LanguageCode, string>>;
    color: string;
  };
  evidenceLevel?: {
    value: string;
    label: Partial<Record<LanguageCode, string>>;
    color: string;
  };
  reference: string;
  publicationDate?: string;
  relatedCodes?: {
    icd10?: string[];
    icd11?: string[];
  };
}

export interface ComparisonPoint {
  aspect: string;
  aspectI18n: Partial<Record<LanguageCode, string>>;
  positions: Record<ProtocolSource, string | undefined>;
  convergence: ConvergenceStatus;
  clinicalNote?: Partial<Record<LanguageCode, string>>;
}

export interface ProtocolComparison {
  conditionId: string;
  condition: string;
  conditionI18n: Partial<Record<LanguageCode, string>>;
  sources: Partial<Record<ProtocolSource, ProtocolRecommendation>>;
  comparisonPoints: ComparisonPoint[];
  overallConvergence: ConvergenceStatus;
  summary: Partial<Record<LanguageCode, string>>;
  clinicalImplications: Partial<Record<LanguageCode, string>>;
}

export interface RegionalContext {
  country: string;
  healthSystem: 'public' | 'private' | 'mixed';
  resourceLevel: ResourceLevel;
  locale: LanguageCode;
  primaryProtocol: ProtocolSource;
}

export interface AdaptedRecommendation {
  original: ProtocolRecommendation;
  adapted: {
    recommendation: string;
    interval?: string;
    method?: string[];
    feasibilityNotes: string;
    alternativeApproaches?: string[];
  };
  resourceConsiderations: string[];
}

// =============================================================================
// GRADE/EVIDENCE MAPPING
// =============================================================================

const USPSTF_GRADE_COLORS: Record<USPSTFGrade, string> = {
  A: '#22c55e',
  B: '#84cc16',
  C: '#eab308',
  D: '#ef4444',
  I: '#6b7280',
};

const NICE_EVIDENCE_COLORS: Record<NICEEvidenceLevel, string> = {
  high: '#22c55e',
  moderate: '#eab308',
  low: '#f97316',
  very_low: '#ef4444',
};

// =============================================================================
// CONDITION MAPPING
// =============================================================================

/**
 * Maps conditions across different protocol sources for comparison
 */
export const CONDITION_MAPPINGS: Array<{
  id: string;
  condition: string;
  conditionI18n: Partial<Record<LanguageCode, string>>;
  mappings: Partial<Record<ProtocolSource, string>>;
  icd10: string[];
  category: string;
}> = [
  // Cancer Screening
  {
    id: 'breast-cancer-screening',
    condition: 'Breast Cancer Screening',
    conditionI18n: {
      en: 'Breast Cancer Screening',
      pt: 'Rastreamento de Câncer de Mama',
      es: 'Detección de Cáncer de Mama',
    },
    mappings: {
      uspstf: 'uspstf-breast-cancer',
      nhs: 'nhs-breast-screening',
    },
    icd10: ['C50', 'Z12.31'],
    category: 'cancer',
  },
  {
    id: 'cervical-cancer-screening',
    condition: 'Cervical Cancer Screening',
    conditionI18n: {
      en: 'Cervical Cancer Screening',
      pt: 'Rastreamento de Câncer do Colo do Útero',
      es: 'Detección de Cáncer Cervical',
    },
    mappings: {
      uspstf: 'uspstf-cervical-cancer',
      nhs: 'nhs-cervical-screening',
    },
    icd10: ['C53', 'Z12.4'],
    category: 'cancer',
  },
  {
    id: 'colorectal-cancer-screening',
    condition: 'Colorectal Cancer Screening',
    conditionI18n: {
      en: 'Colorectal Cancer Screening',
      pt: 'Rastreamento de Câncer Colorretal',
      es: 'Detección de Cáncer Colorrectal',
    },
    mappings: {
      uspstf: 'uspstf-colorectal-cancer',
      nhs: 'nhs-bowel-screening',
    },
    icd10: ['C18', 'C19', 'C20', 'Z12.11'],
    category: 'cancer',
  },
  {
    id: 'lung-cancer-screening',
    condition: 'Lung Cancer Screening',
    conditionI18n: {
      en: 'Lung Cancer Screening',
      pt: 'Rastreamento de Câncer de Pulmão',
      es: 'Detección de Cáncer de Pulmón',
    },
    mappings: {
      uspstf: 'uspstf-lung-cancer',
      nhs: 'nhs-lung-screening',
    },
    icd10: ['C34', 'Z12.2'],
    category: 'cancer',
  },

  // Cardiovascular
  {
    id: 'hypertension-screening',
    condition: 'Hypertension Screening',
    conditionI18n: {
      en: 'Hypertension Screening',
      pt: 'Rastreamento de Hipertensão',
      es: 'Detección de Hipertensión',
    },
    mappings: {
      uspstf: 'uspstf-hypertension',
      nhs: 'nice-hypertension',
    },
    icd10: ['I10', 'I11', 'Z13.6'],
    category: 'cardiovascular',
  },
  {
    id: 'cvd-risk-assessment',
    condition: 'Cardiovascular Disease Risk Assessment',
    conditionI18n: {
      en: 'Cardiovascular Disease Risk Assessment',
      pt: 'Avaliação de Risco Cardiovascular',
      es: 'Evaluación de Riesgo Cardiovascular',
    },
    mappings: {
      uspstf: 'uspstf-cvd-risk-statins',
      nhs: 'nice-cvd-risk-assessment',
    },
    icd10: ['I25', 'Z13.6'],
    category: 'cardiovascular',
  },
  {
    id: 'aaa-screening',
    condition: 'Abdominal Aortic Aneurysm Screening',
    conditionI18n: {
      en: 'Abdominal Aortic Aneurysm Screening',
      pt: 'Rastreamento de Aneurisma de Aorta Abdominal',
      es: 'Detección de Aneurisma de Aorta Abdominal',
    },
    mappings: {
      uspstf: 'uspstf-aaa',
      nhs: 'nhs-aaa-screening',
    },
    icd10: ['I71.4'],
    category: 'cardiovascular',
  },

  // Metabolic
  {
    id: 'diabetes-screening',
    condition: 'Diabetes Screening',
    conditionI18n: {
      en: 'Diabetes Screening',
      pt: 'Rastreamento de Diabetes',
      es: 'Detección de Diabetes',
    },
    mappings: {
      uspstf: 'uspstf-prediabetes-diabetes',
      nhs: 'nice-diabetes-prevention',
    },
    icd10: ['E11', 'R73.03', 'Z13.1'],
    category: 'metabolic',
  },
  {
    id: 'obesity-screening',
    condition: 'Obesity Screening',
    conditionI18n: {
      en: 'Obesity Screening',
      pt: 'Rastreamento de Obesidade',
      es: 'Detección de Obesidad',
    },
    mappings: {
      uspstf: 'uspstf-obesity',
    },
    icd10: ['E66', 'Z68'],
    category: 'metabolic',
  },

  // Infectious Diseases
  {
    id: 'hiv-screening',
    condition: 'HIV Screening',
    conditionI18n: {
      en: 'HIV Screening',
      pt: 'Rastreamento de HIV',
      es: 'Detección de VIH',
    },
    mappings: {
      uspstf: 'uspstf-hiv',
      nhs: 'nice-hiv-testing',
    },
    icd10: ['B20', 'Z21', 'Z11.4'],
    category: 'infectious',
  },
  {
    id: 'hepatitis-b-screening',
    condition: 'Hepatitis B Screening',
    conditionI18n: {
      en: 'Hepatitis B Screening',
      pt: 'Rastreamento de Hepatite B',
      es: 'Detección de Hepatitis B',
    },
    mappings: {
      uspstf: 'uspstf-hepatitis-b',
      nhs: 'nice-hepatitis-b-screening',
    },
    icd10: ['B16', 'B18.1', 'Z11.59'],
    category: 'infectious',
  },
  {
    id: 'hepatitis-c-screening',
    condition: 'Hepatitis C Screening',
    conditionI18n: {
      en: 'Hepatitis C Screening',
      pt: 'Rastreamento de Hepatite C',
      es: 'Detección de Hepatitis C',
    },
    mappings: {
      uspstf: 'uspstf-hepatitis-c',
      nhs: 'nice-hepatitis-c-screening',
    },
    icd10: ['B17.1', 'B18.2', 'Z11.59'],
    category: 'infectious',
  },

  // Mental Health
  {
    id: 'depression-screening',
    condition: 'Depression Screening',
    conditionI18n: {
      en: 'Depression Screening',
      pt: 'Rastreamento de Depressão',
      es: 'Detección de Depresión',
    },
    mappings: {
      uspstf: 'uspstf-depression',
      nhs: 'nice-depression-screening',
    },
    icd10: ['F32', 'F33'],
    category: 'mental-health',
  },

  // Pregnancy
  {
    id: 'gestational-diabetes-screening',
    condition: 'Gestational Diabetes Screening',
    conditionI18n: {
      en: 'Gestational Diabetes Screening',
      pt: 'Rastreamento de Diabetes Gestacional',
      es: 'Detección de Diabetes Gestacional',
    },
    mappings: {
      uspstf: 'uspstf-gestational-diabetes',
      nhs: 'nice-gestational-diabetes',
    },
    icd10: ['O24.4'],
    category: 'pregnancy',
  },

  // Osteoporosis
  {
    id: 'osteoporosis-screening',
    condition: 'Osteoporosis Screening',
    conditionI18n: {
      en: 'Osteoporosis Screening',
      pt: 'Rastreamento de Osteoporose',
      es: 'Detección de Osteoporosis',
    },
    mappings: {
      nhs: 'nice-osteoporosis-fracture-risk',
    },
    icd10: ['M80', 'M81'],
    category: 'bone-health',
  },
];

// =============================================================================
// CONVERSION FUNCTIONS
// =============================================================================

/**
 * Convert USPSTF recommendation to unified format
 */
function convertUSPSTF(rec: USPSTFRecommendation): ProtocolRecommendation {
  return {
    source: 'uspstf',
    conditionId: rec.id,
    condition: rec.condition,
    conditionI18n: rec.conditionI18n,
    recommendation: rec.recommendation,
    population: {
      description: rec.population.description,
      ageRange: rec.population.ageRange,
      sex: rec.population.sex,
      riskFactors: rec.population.riskFactors,
    },
    interval: rec.interval,
    method: rec.method,
    grade: {
      value: rec.grade,
      label: { en: `Grade ${rec.grade}`, pt: `Grau ${rec.grade}` },
      color: USPSTF_GRADE_COLORS[rec.grade],
    },
    reference: rec.reference,
    publicationDate: rec.publicationDate,
    relatedCodes: rec.relatedCodes,
  };
}

/**
 * Convert NHS/NICE recommendation to unified format
 */
function convertNHS(rec: NHSRecommendation): ProtocolRecommendation {
  return {
    source: 'nhs',
    conditionId: rec.id,
    condition: rec.condition,
    conditionI18n: rec.conditionI18n,
    recommendation: rec.recommendation,
    population: {
      description: rec.population.description,
      ageRange: rec.population.ageRange,
      sex: rec.population.sex,
      riskFactors: rec.population.riskFactors,
    },
    interval: rec.interval,
    method: rec.method,
    grade: rec.strength ? {
      value: rec.strength,
      label: {
        en: rec.strength === 'strong' ? 'Strong Recommendation' : 'Conditional Recommendation',
        pt: rec.strength === 'strong' ? 'Recomendação Forte' : 'Recomendação Condicional',
      },
      color: rec.strength === 'strong' ? '#22c55e' : '#eab308',
    } : undefined,
    evidenceLevel: rec.evidenceLevel ? {
      value: rec.evidenceLevel,
      label: {
        en: rec.evidenceLevel.charAt(0).toUpperCase() + rec.evidenceLevel.slice(1).replace('_', ' ') + ' Quality',
        pt: rec.evidenceLevel === 'high' ? 'Alta Qualidade' :
            rec.evidenceLevel === 'moderate' ? 'Qualidade Moderada' :
            rec.evidenceLevel === 'low' ? 'Baixa Qualidade' : 'Qualidade Muito Baixa',
      },
      color: NICE_EVIDENCE_COLORS[rec.evidenceLevel],
    } : undefined,
    reference: rec.reference,
    publicationDate: rec.publicationDate,
    relatedCodes: rec.relatedCodes,
  };
}

// =============================================================================
// COMPARISON FUNCTIONS
// =============================================================================

/**
 * Get unified recommendation for a condition from a specific source
 */
export function getRecommendation(conditionMappingId: string, source: ProtocolSource): ProtocolRecommendation | undefined {
  const mapping = CONDITION_MAPPINGS.find(m => m.id === conditionMappingId);
  if (!mapping) return undefined;

  const sourceId = mapping.mappings[source];
  if (!sourceId) return undefined;

  if (source === 'uspstf') {
    const rec = USPSTF_RECOMMENDATIONS.find(r => r.id === sourceId);
    return rec ? convertUSPSTF(rec) : undefined;
  }

  if (source === 'nhs') {
    const rec = NHS_RECOMMENDATIONS.find(r => r.id === sourceId);
    return rec ? convertNHS(rec) : undefined;
  }

  return undefined;
}

/**
 * Analyze convergence between two age ranges
 */
function analyzeAgeConvergence(
  range1?: { min?: number; max?: number },
  range2?: { min?: number; max?: number }
): ConvergenceStatus {
  if (!range1 || !range2) return 'not_comparable';

  const min1 = range1.min ?? 0;
  const max1 = range1.max ?? 120;
  const min2 = range2.min ?? 0;
  const max2 = range2.max ?? 120;

  // Same range
  if (min1 === min2 && max1 === max2) return 'convergence';

  // No overlap
  if (max1 < min2 || max2 < min1) return 'divergence';

  // Overlapping ranges
  return 'partial';
}

/**
 * Compare recommendations across multiple sources for a condition
 */
export function compareProtocols(conditionMappingId: string): ProtocolComparison | undefined {
  const mapping = CONDITION_MAPPINGS.find(m => m.id === conditionMappingId);
  if (!mapping) return undefined;

  const sources: Partial<Record<ProtocolSource, ProtocolRecommendation>> = {};
  const availableSources: ProtocolSource[] = ['uspstf', 'nhs', 'sus', 'who', 'india'];

  // Collect all available recommendations
  for (const source of availableSources) {
    const rec = getRecommendation(conditionMappingId, source);
    if (rec) {
      sources[source] = rec;
    }
  }

  const sourceKeys = Object.keys(sources) as ProtocolSource[];
  if (sourceKeys.length < 2) {
    return undefined; // Need at least 2 sources to compare
  }

  // Build comparison points
  const comparisonPoints: ComparisonPoint[] = [];

  // 1. Compare age ranges
  const agePositions: Record<ProtocolSource, string | undefined> = {} as Record<ProtocolSource, string | undefined>;
  for (const source of sourceKeys) {
    const rec = sources[source]!;
    if (rec.population.ageRange) {
      const { min, max } = rec.population.ageRange;
      agePositions[source] = min && max
        ? `${min}-${max} years`
        : min
          ? `≥${min} years`
          : max
            ? `≤${max} years`
            : undefined;
    }
  }

  let ageConvergence: ConvergenceStatus = 'convergence';
  const ranges = sourceKeys.map(s => sources[s]?.population.ageRange);
  for (let i = 1; i < ranges.length; i++) {
    const conv = analyzeAgeConvergence(ranges[0], ranges[i]);
    if (conv === 'divergence') {
      ageConvergence = 'divergence';
      break;
    } else if (conv === 'partial') {
      ageConvergence = 'partial';
    }
  }

  comparisonPoints.push({
    aspect: 'Age Range',
    aspectI18n: { en: 'Age Range', pt: 'Faixa Etária', es: 'Rango de Edad' },
    positions: agePositions,
    convergence: ageConvergence,
  });

  // 2. Compare intervals
  const intervalPositions: Record<ProtocolSource, string | undefined> = {} as Record<ProtocolSource, string | undefined>;
  for (const source of sourceKeys) {
    intervalPositions[source] = sources[source]?.interval;
  }

  const intervals = sourceKeys.map(s => sources[s]?.interval?.toLowerCase());
  const allSameInterval = intervals.every(i => i === intervals[0]);
  const intervalConvergence: ConvergenceStatus = allSameInterval ? 'convergence' :
    intervals.some(i => i?.includes('year') && intervals.some(j => j?.includes('month'))) ? 'divergence' : 'partial';

  comparisonPoints.push({
    aspect: 'Screening Interval',
    aspectI18n: { en: 'Screening Interval', pt: 'Intervalo de Rastreamento', es: 'Intervalo de Detección' },
    positions: intervalPositions,
    convergence: intervalConvergence,
  });

  // 3. Compare methods
  const methodPositions: Record<ProtocolSource, string | undefined> = {} as Record<ProtocolSource, string | undefined>;
  for (const source of sourceKeys) {
    methodPositions[source] = sources[source]?.method?.join(', ');
  }

  const methods = sourceKeys.map(s => sources[s]?.method);
  const primaryMethods = methods.map(m => m?.[0]?.toLowerCase());
  const methodConvergence: ConvergenceStatus = primaryMethods.every(m => m === primaryMethods[0])
    ? 'convergence'
    : primaryMethods.some(m => m !== primaryMethods[0])
      ? 'partial'
      : 'not_comparable';

  comparisonPoints.push({
    aspect: 'Screening Method',
    aspectI18n: { en: 'Screening Method', pt: 'Método de Rastreamento', es: 'Método de Detección' },
    positions: methodPositions,
    convergence: methodConvergence,
  });

  // 4. Compare evidence/grade
  const gradePositions: Record<ProtocolSource, string | undefined> = {} as Record<ProtocolSource, string | undefined>;
  for (const source of sourceKeys) {
    const rec = sources[source];
    if (rec?.grade) {
      gradePositions[source] = rec.grade.label.en ?? rec.grade.value;
    } else if (rec?.evidenceLevel) {
      gradePositions[source] = rec.evidenceLevel.label.en ?? rec.evidenceLevel.value;
    }
  }

  comparisonPoints.push({
    aspect: 'Evidence Grade',
    aspectI18n: { en: 'Evidence Grade', pt: 'Grau de Evidência', es: 'Grado de Evidencia' },
    positions: gradePositions,
    convergence: 'not_comparable', // Grades from different systems aren't directly comparable
  });

  // Calculate overall convergence
  const convergenceCounts = comparisonPoints.reduce((acc, p) => {
    if (p.convergence !== 'not_comparable') {
      acc[p.convergence] = (acc[p.convergence] || 0) + 1;
    }
    return acc;
  }, {} as Record<ConvergenceStatus, number>);

  let overallConvergence: ConvergenceStatus = 'partial';
  if (convergenceCounts.divergence > 0) {
    overallConvergence = 'divergence';
  } else if (convergenceCounts.partial === 0 && convergenceCounts.convergence > 0) {
    overallConvergence = 'convergence';
  }

  // Generate summary
  const summaryTexts: Partial<Record<LanguageCode, string>> = {};
  const sourceNames: Record<ProtocolSource, string> = {
    uspstf: 'USPSTF (USA)',
    nhs: 'NHS/NICE (UK)',
    sus: 'SUS (Brazil)',
    who: 'WHO',
    india: 'NP-NCD (India)',
  };

  const sourceList = sourceKeys.map(s => sourceNames[s]).join(', ');

  if (overallConvergence === 'convergence') {
    summaryTexts.en = `Guidelines from ${sourceList} show strong convergence on recommendations for ${mapping.condition}.`;
    summaryTexts.pt = `Diretrizes de ${sourceList} mostram forte convergência nas recomendações para ${mapping.conditionI18n.pt || mapping.condition}.`;
  } else if (overallConvergence === 'divergence') {
    summaryTexts.en = `Guidelines from ${sourceList} show significant divergence on recommendations for ${mapping.condition}. Clinical judgment should consider local context.`;
    summaryTexts.pt = `Diretrizes de ${sourceList} mostram divergência significativa nas recomendações para ${mapping.conditionI18n.pt || mapping.condition}. O julgamento clínico deve considerar o contexto local.`;
  } else {
    summaryTexts.en = `Guidelines from ${sourceList} show partial agreement on recommendations for ${mapping.condition}. Key differences exist in specific criteria.`;
    summaryTexts.pt = `Diretrizes de ${sourceList} mostram concordância parcial nas recomendações para ${mapping.conditionI18n.pt || mapping.condition}. Existem diferenças-chave em critérios específicos.`;
  }

  return {
    conditionId: mapping.id,
    condition: mapping.condition,
    conditionI18n: mapping.conditionI18n,
    sources,
    comparisonPoints,
    overallConvergence,
    summary: summaryTexts,
    clinicalImplications: {
      en: `When treating patients, consider the most applicable guideline based on the local health system, available resources, and patient preferences.`,
      pt: `Ao tratar pacientes, considere a diretriz mais aplicável com base no sistema de saúde local, recursos disponíveis e preferências do paciente.`,
    },
  };
}

/**
 * Get all available comparisons
 */
export function getAllComparisons(): ProtocolComparison[] {
  return CONDITION_MAPPINGS
    .map(m => compareProtocols(m.id))
    .filter((c): c is ProtocolComparison => c !== undefined);
}

/**
 * Get comparisons by category
 */
export function getComparisonsByCategory(category: string): ProtocolComparison[] {
  return CONDITION_MAPPINGS
    .filter(m => m.category === category)
    .map(m => compareProtocols(m.id))
    .filter((c): c is ProtocolComparison => c !== undefined);
}

/**
 * Get comparison by ICD-10 code
 */
export function getComparisonByICD10(icd10Code: string): ProtocolComparison | undefined {
  const mapping = CONDITION_MAPPINGS.find(m =>
    m.icd10.some(code =>
      code.toLowerCase() === icd10Code.toLowerCase() ||
      icd10Code.toLowerCase().startsWith(code.toLowerCase())
    )
  );
  return mapping ? compareProtocols(mapping.id) : undefined;
}

// =============================================================================
// REGIONAL ADAPTATION
// =============================================================================

/**
 * Resource requirements for different screening methods
 */
const METHOD_RESOURCE_REQUIREMENTS: Record<string, ResourceLevel> = {
  'Mammography': 'high',
  'Low-dose CT': 'high',
  'LDCT': 'high',
  'Colonoscopy': 'high',
  'DXA': 'high',
  'MRI': 'high',
  'Ultrasound': 'medium',
  'Abdominal ultrasound': 'medium',
  'HPV Test': 'medium',
  'FIT': 'low',
  'Faecal Immunochemical Test': 'low',
  'gFOBT': 'low',
  'Blood pressure': 'low',
  'HbA1c': 'medium',
  'Fasting glucose': 'low',
  'PHQ-9': 'low',
  'PHQ-2': 'low',
  'Visual inspection': 'low',
  'Pap smear': 'medium',
};

/**
 * Get resource level required for a method
 */
function getMethodResourceLevel(method: string): ResourceLevel {
  const normalized = method.trim();
  if (METHOD_RESOURCE_REQUIREMENTS[normalized]) {
    return METHOD_RESOURCE_REQUIREMENTS[normalized];
  }
  // Check partial matches
  for (const [key, level] of Object.entries(METHOD_RESOURCE_REQUIREMENTS)) {
    if (normalized.toLowerCase().includes(key.toLowerCase())) {
      return level;
    }
  }
  return 'medium'; // Default
}

/**
 * Check if a method is feasible given resource constraints
 */
function isMethodFeasible(method: string, resourceLevel: ResourceLevel): boolean {
  const required = getMethodResourceLevel(method);
  const levels: ResourceLevel[] = ['low', 'medium', 'high'];
  return levels.indexOf(required) <= levels.indexOf(resourceLevel);
}

/**
 * Suggest alternative methods based on resource availability
 */
function suggestAlternatives(method: string, resourceLevel: ResourceLevel): string[] {
  const alternatives: Record<string, Record<ResourceLevel, string[]>> = {
    'Mammography': {
      high: ['Digital mammography'],
      medium: ['Clinical breast examination'],
      low: ['Breast self-examination education'],
    },
    'Low-dose CT': {
      high: ['LDCT'],
      medium: ['Chest X-ray'],
      low: ['Symptom awareness'],
    },
    'Colonoscopy': {
      high: ['Colonoscopy', 'CT colonography'],
      medium: ['Flexible sigmoidoscopy'],
      low: ['FIT', 'gFOBT'],
    },
    'HPV Test': {
      high: ['HPV DNA test'],
      medium: ['Pap smear'],
      low: ['VIA (Visual Inspection with Acetic Acid)'],
    },
  };

  const levels: ResourceLevel[] = ['low', 'medium', 'high'];
  const resourceIndex = levels.indexOf(resourceLevel);

  for (const [key, alts] of Object.entries(alternatives)) {
    if (method.toLowerCase().includes(key.toLowerCase())) {
      return levels.slice(0, resourceIndex + 1).flatMap(l => alts[l] || []);
    }
  }

  return [];
}

/**
 * Adapt a recommendation based on regional context
 */
export function adaptRecommendation(
  recommendation: ProtocolRecommendation,
  context: RegionalContext
): AdaptedRecommendation {
  const resourceConsiderations: string[] = [];
  let adaptedRecommendation = recommendation.recommendation[context.locale] ||
                               recommendation.recommendation.en ||
                               '';
  let adaptedInterval = recommendation.interval;
  let adaptedMethods = recommendation.method || [];
  const alternativeApproaches: string[] = [];

  // Check method feasibility
  if (adaptedMethods.length > 0) {
    const feasibleMethods = adaptedMethods.filter(m => isMethodFeasible(m, context.resourceLevel));
    const infeasibleMethods = adaptedMethods.filter(m => !isMethodFeasible(m, context.resourceLevel));

    if (infeasibleMethods.length > 0) {
      resourceConsiderations.push(
        context.locale === 'pt'
          ? `Métodos com requisitos de recursos elevados: ${infeasibleMethods.join(', ')}`
          : `Methods with high resource requirements: ${infeasibleMethods.join(', ')}`
      );

      // Find alternatives
      for (const method of infeasibleMethods) {
        const alts = suggestAlternatives(method, context.resourceLevel);
        alternativeApproaches.push(...alts);
      }
    }

    if (feasibleMethods.length > 0) {
      adaptedMethods = feasibleMethods;
    } else if (alternativeApproaches.length > 0) {
      adaptedMethods = alternativeApproaches;
    }
  }

  // Adjust interval for low-resource settings
  if (context.resourceLevel === 'low') {
    resourceConsiderations.push(
      context.locale === 'pt'
        ? 'Em configurações de baixos recursos, intervalos de rastreamento podem precisar ser estendidos'
        : 'In low-resource settings, screening intervals may need to be extended'
    );
  }

  // Add primary protocol guidance
  resourceConsiderations.push(
    context.locale === 'pt'
      ? `Protocolo primário recomendado: ${context.primaryProtocol.toUpperCase()}`
      : `Recommended primary protocol: ${context.primaryProtocol.toUpperCase()}`
  );

  const feasibilityNotes = context.locale === 'pt'
    ? `Adaptado para contexto de ${context.country} (${context.healthSystem}, recursos ${context.resourceLevel})`
    : `Adapted for ${context.country} context (${context.healthSystem} system, ${context.resourceLevel} resources)`;

  return {
    original: recommendation,
    adapted: {
      recommendation: adaptedRecommendation,
      interval: adaptedInterval,
      method: adaptedMethods,
      feasibilityNotes,
      alternativeApproaches: alternativeApproaches.length > 0 ? alternativeApproaches : undefined,
    },
    resourceConsiderations,
  };
}

/**
 * Get adapted comparison for a regional context
 */
export function getAdaptedComparison(
  conditionMappingId: string,
  context: RegionalContext
): {
  comparison: ProtocolComparison;
  adaptedRecommendation: AdaptedRecommendation;
} | undefined {
  const comparison = compareProtocols(conditionMappingId);
  if (!comparison) return undefined;

  // Get the primary protocol recommendation
  let primaryRec = comparison.sources[context.primaryProtocol];

  // If primary not available, try other sources
  if (!primaryRec) {
    const availableSources = Object.keys(comparison.sources) as ProtocolSource[];
    if (availableSources.length > 0) {
      primaryRec = comparison.sources[availableSources[0]];
    }
  }

  if (!primaryRec) return undefined;

  const adaptedRecommendation = adaptRecommendation(primaryRec, context);

  return {
    comparison,
    adaptedRecommendation,
  };
}

// =============================================================================
// SEARCH AND QUERY FUNCTIONS
// =============================================================================

/**
 * Search for condition mappings by term
 */
export function searchConditionMappings(
  query: string,
  language: LanguageCode = 'en'
): typeof CONDITION_MAPPINGS {
  const lowerQuery = query.toLowerCase();
  return CONDITION_MAPPINGS.filter(m => {
    if (m.condition.toLowerCase().includes(lowerQuery)) return true;
    if (m.conditionI18n[language]?.toLowerCase().includes(lowerQuery)) return true;
    if (m.icd10.some(code => code.toLowerCase().includes(lowerQuery))) return true;
    if (m.category.toLowerCase().includes(lowerQuery)) return true;
    return false;
  });
}

/**
 * Get all available categories
 */
export function getCategories(): string[] {
  return [...new Set(CONDITION_MAPPINGS.map(m => m.category))];
}

/**
 * Get condition mappings by category
 */
export function getConditionMappingsByCategory(category: string): typeof CONDITION_MAPPINGS {
  return CONDITION_MAPPINGS.filter(m => m.category === category);
}

/**
 * Get available sources for a condition
 */
export function getAvailableSources(conditionMappingId: string): ProtocolSource[] {
  const mapping = CONDITION_MAPPINGS.find(m => m.id === conditionMappingId);
  if (!mapping) return [];
  return Object.keys(mapping.mappings) as ProtocolSource[];
}

// Types are already exported with their definitions above
