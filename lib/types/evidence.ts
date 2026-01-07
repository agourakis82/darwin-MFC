/**
 * Evidence-based medicine types
 * For grading evidence levels and quality
 *
 * Implements GRADE (Grading of Recommendations, Assessment, Development and Evaluations)
 * methodology for systematic evidence assessment.
 *
 * @see https://www.gradeworkinggroup.org/
 */

/**
 * Evidence levels (Oxford Centre for Evidence-Based Medicine)
 */
export type OxfordEvidenceLevel = 'Ia' | 'Ib' | 'IIa' | 'IIb' | 'III' | 'IV';

/**
 * GRADE Evidence Quality Levels
 *
 * High (A): Very confident that the true effect lies close to the estimate
 * Moderate (B): Moderately confident - true effect likely close to estimate but may differ
 * Low (C): Limited confidence - true effect may be substantially different from estimate
 * Very Low (D): Very little confidence - true effect likely substantially different
 * GPP: Good Practice Point - Based on clinical experience of guideline group
 */
export type GradeEvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'GPP';

/**
 * GRADE Quality of Evidence (expanded enum for clarity)
 */
export type GradeQualityOfEvidence = 'high' | 'moderate' | 'low' | 'very_low';

/**
 * GRADE Recommendation Strength
 */
export type GradeRecommendationStrength = 'strong_for' | 'weak_for' | 'weak_against' | 'strong_against';

/**
 * Combined evidence level type for backwards compatibility
 */
export type EvidenceLevel = OxfordEvidenceLevel | GradeEvidenceLevel;

/**
 * Study types
 */
export type StudyType =
  | 'RCT' // Randomized Controlled Trial
  | 'SystematicReview' // Systematic Review
  | 'MetaAnalysis' // Meta-Analysis
  | 'Cohort' // Cohort Study
  | 'CaseControl' // Case-Control Study
  | 'CaseSeries' // Case Series
  | 'CaseReport' // Case Report
  | 'ExpertOpinion' // Expert Opinion
  | 'Guideline' // Clinical Practice Guideline
  | 'Consensus' // Consensus Statement
  | 'Observational' // Observational Study
  | 'CrossSectional'; // Cross-Sectional Study

/**
 * Evidence quality score (0-10)
 */
export interface EvidenceQuality {
  score: number; // 0-10
  components: {
    methodology: number; // Quality of methodology (0-3)
    sampleSize: number; // Adequacy of sample size (0-2)
    followUp: number; // Follow-up duration/completeness (0-2)
    bias: number; // Risk of bias (0-2)
    applicability: number; // Applicability to target population (0-1)
  };
}

// =============================================================================
// GRADE QUALITY FACTORS (Five domains for downgrading/upgrading)
// =============================================================================

/**
 * GRADE Risk of Bias Assessment
 * Assesses methodological quality of included studies
 */
export type GradeRiskOfBias = 'not_serious' | 'serious' | 'very_serious';

/**
 * GRADE Inconsistency Assessment
 * Assesses heterogeneity of results across studies
 */
export type GradeInconsistency = 'not_serious' | 'serious' | 'very_serious';

/**
 * GRADE Indirectness Assessment
 * Assesses applicability of evidence to the question (PICO)
 */
export type GradeIndirectness = 'not_serious' | 'serious' | 'very_serious';

/**
 * GRADE Imprecision Assessment
 * Assesses width of confidence intervals and sample size
 */
export type GradeImprecision = 'not_serious' | 'serious' | 'very_serious';

/**
 * GRADE Publication Bias Assessment
 */
export type GradePublicationBias = 'undetected' | 'strongly_suspected';

/**
 * GRADE domains for downgrading evidence quality
 * These factors can lower the quality of evidence
 */
export interface GradeDowngradingFactors {
  /**
   * Risk of bias (study limitations)
   * - Selection bias, performance bias, detection bias, attrition bias, reporting bias
   * - Assessed via tools like Cochrane Risk of Bias, Newcastle-Ottawa Scale
   */
  riskOfBias: {
    rating: GradeRiskOfBias;
    rationale?: string;
    concerns?: string[];
  };

  /**
   * Inconsistency (heterogeneity)
   * - Unexplained variability in results across studies
   * - Assessed via I^2 statistic, visual inspection of forest plots
   */
  inconsistency: {
    rating: GradeInconsistency;
    rationale?: string;
    i2Statistic?: number; // 0-100%
  };

  /**
   * Indirectness (applicability)
   * - Population differs from question of interest
   * - Intervention/comparator differs
   * - Outcomes are surrogate or intermediate
   * - Setting/context differs
   */
  indirectness: {
    rating: GradeIndirectness;
    rationale?: string;
    concerns?: ('population' | 'intervention' | 'comparator' | 'outcome' | 'setting')[];
  };

  /**
   * Imprecision
   * - Wide confidence intervals
   * - Small sample size/few events
   * - Optimal Information Size (OIS) not met
   */
  imprecision: {
    rating: GradeImprecision;
    rationale?: string;
    confidenceInterval?: string;
    sampleSize?: number;
    events?: number;
  };

  /**
   * Publication bias
   * - Selective publication of positive studies
   * - Assessed via funnel plots, Egger's test
   */
  publicationBias: {
    rating: GradePublicationBias;
    rationale?: string;
    funnelPlotAssessment?: string;
  };
}

/**
 * GRADE factors that can upgrade observational evidence
 * Only apply to observational studies initially rated as low quality
 */
export interface GradeUpgradingFactors {
  /**
   * Large magnitude of effect
   * - RR >2 or <0.5 with consistent evidence: upgrade 1 level
   * - RR >5 or <0.2: upgrade 2 levels
   */
  largeMagnitudeOfEffect?: {
    present: boolean;
    relativeRisk?: number;
    rationale?: string;
  };

  /**
   * Dose-response gradient
   * - Clear relationship between dose/exposure and outcome
   */
  doseResponseGradient?: {
    present: boolean;
    description?: string;
  };

  /**
   * All plausible confounders would reduce effect
   * - Residual confounding would decrease, not increase, observed effect
   */
  plausibleConfoundingWouldReduceEffect?: {
    present: boolean;
    rationale?: string;
  };
}

/**
 * Complete GRADE Assessment for a recommendation or body of evidence
 */
export interface GradeAssessment {
  /**
   * Initial quality based on study design
   * RCTs start at "high", observational at "low"
   */
  initialQuality: GradeQualityOfEvidence;

  /**
   * Study design type(s) comprising the evidence
   */
  studyDesigns: StudyType[];

  /**
   * Number of studies included
   */
  numberOfStudies: number;

  /**
   * Total sample size across studies
   */
  totalSampleSize?: number;

  /**
   * Factors for downgrading quality
   */
  downgradingFactors: GradeDowngradingFactors;

  /**
   * Factors for upgrading quality (observational studies only)
   */
  upgradingFactors?: GradeUpgradingFactors;

  /**
   * Final quality of evidence after adjustments
   */
  finalQuality: GradeQualityOfEvidence;

  /**
   * Mapped to simple letter grade (A/B/C/D)
   */
  letterGrade: GradeEvidenceLevel;

  /**
   * Recommendation strength
   */
  recommendationStrength?: GradeRecommendationStrength;

  /**
   * Summary of findings narrative
   */
  summaryOfFindings?: string;

  /**
   * Key references supporting this assessment
   */
  keyReferences?: string[];
}

/**
 * Simplified GRADE assessment for quick display
 * Use when full GradeAssessment is too detailed
 */
export interface GradeAssessmentSimple {
  /** Letter grade: A (High), B (Moderate), C (Low), D (Very Low), GPP */
  grade: GradeEvidenceLevel;

  /** Quality of evidence */
  quality: GradeQualityOfEvidence;

  /** Primary study type */
  primaryStudyType: StudyType;

  /** Brief rationale for the grade */
  rationale: string;

  /** Main limitations (optional) */
  limitations?: string[];

  /** Recommendation strength if applicable */
  strength?: GradeRecommendationStrength;
}

/**
 * Citation with evidence metadata
 */
export interface CitationWithEvidence {
  refId: string;
  evidenceLevel?: EvidenceLevel;
  studyType?: StudyType;
  qualityScore?: number;
  quality?: EvidenceQuality;
  limitations?: string[];
  conflictsOfInterest?: string;
  page?: string;
  note?: string;
}

/**
 * View modes for content display (AMBOSS-style High-Yield mode)
 * full: Show all content (default)
 * high_yield: Show only high-yield content
 * print_friendly: Optimized for printing/PDF export
 */
export type ViewMode = 'full' | 'high_yield' | 'print_friendly';

/**
 * High-yield content categories
 */
export type HighYieldCategory =
  | 'key_point'      // Essential facts
  | 'critical_value' // Lab values, vital signs requiring action
  | 'red_flag'       // Warning signs, urgent symptoms
  | 'quick_decision' // Decision points for clinical flow
  | 'pearl';         // Clinical pearls, tips

/**
 * High-yield content marker
 * Used to identify content that should be shown in High-Yield mode
 */
export interface HighYieldContent {
  isHighYield: boolean;
  category?: HighYieldCategory;
  priority?: 1 | 2 | 3; // 1 = highest priority
}

/**
 * Evidence strength configuration for UI rendering
 */
export interface GradeEvidenceConfig {
  level: GradeEvidenceLevel;
  label: string;
  labelKey: string;
  description: string;
  descriptionKey: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

/**
 * Evidence level ordering for sorting (GRADE-style)
 */
export const GRADE_EVIDENCE_ORDER: Record<GradeEvidenceLevel, number> = {
  'A': 1,
  'B': 2,
  'C': 3,
  'D': 4,
  'GPP': 5,
};

/**
 * Compare GRADE evidence levels for sorting
 * Returns negative if a is stronger than b
 */
export const compareGradeEvidenceLevels = (
  a: GradeEvidenceLevel,
  b: GradeEvidenceLevel
): number => {
  return GRADE_EVIDENCE_ORDER[a] - GRADE_EVIDENCE_ORDER[b];
};

// =============================================================================
// GRADE UTILITY FUNCTIONS
// =============================================================================

/**
 * Map letter grade to quality of evidence
 */
export const GRADE_LETTER_TO_QUALITY: Record<GradeEvidenceLevel, GradeQualityOfEvidence | 'gpp'> = {
  'A': 'high',
  'B': 'moderate',
  'C': 'low',
  'D': 'very_low',
  'GPP': 'gpp' as unknown as GradeQualityOfEvidence,
};

/**
 * Map quality of evidence to letter grade
 */
export const GRADE_QUALITY_TO_LETTER: Record<GradeQualityOfEvidence, GradeEvidenceLevel> = {
  'high': 'A',
  'moderate': 'B',
  'low': 'C',
  'very_low': 'D',
};

/**
 * GRADE quality labels in multiple languages
 */
export const GRADE_QUALITY_LABELS: Record<GradeQualityOfEvidence, { en: string; pt: string }> = {
  'high': { en: 'High', pt: 'Alta' },
  'moderate': { en: 'Moderate', pt: 'Moderada' },
  'low': { en: 'Low', pt: 'Baixa' },
  'very_low': { en: 'Very Low', pt: 'Muito Baixa' },
};

/**
 * GRADE recommendation strength labels
 */
export const GRADE_STRENGTH_LABELS: Record<GradeRecommendationStrength, { en: string; pt: string }> = {
  'strong_for': { en: 'Strong For', pt: 'Forte a Favor' },
  'weak_for': { en: 'Weak/Conditional For', pt: 'Fraca/Condicional a Favor' },
  'weak_against': { en: 'Weak/Conditional Against', pt: 'Fraca/Condicional Contra' },
  'strong_against': { en: 'Strong Against', pt: 'Forte Contra' },
};

/**
 * GRADE quality descriptions
 */
export const GRADE_QUALITY_DESCRIPTIONS: Record<GradeQualityOfEvidence, { en: string; pt: string }> = {
  'high': {
    en: 'We are very confident that the true effect lies close to the estimate of effect',
    pt: 'Temos alta confianca de que o efeito verdadeiro esta proximo do efeito estimado',
  },
  'moderate': {
    en: 'We are moderately confident in the effect estimate. The true effect is likely to be close to the estimate, but may be substantially different',
    pt: 'Temos confianca moderada no efeito estimado. O efeito verdadeiro provavelmente esta proximo do estimado, mas pode ser substancialmente diferente',
  },
  'low': {
    en: 'Our confidence in the effect estimate is limited. The true effect may be substantially different from the estimate',
    pt: 'Nossa confianca no efeito estimado e limitada. O efeito verdadeiro pode ser substancialmente diferente do estimado',
  },
  'very_low': {
    en: 'We have very little confidence in the effect estimate. The true effect is likely to be substantially different from the estimate',
    pt: 'Temos muito pouca confianca no efeito estimado. O efeito verdadeiro provavelmente e substancialmente diferente do estimado',
  },
};

/**
 * GRADE domain labels
 */
export const GRADE_DOMAIN_LABELS = {
  riskOfBias: { en: 'Risk of Bias', pt: 'Risco de Vies' },
  inconsistency: { en: 'Inconsistency', pt: 'Inconsistencia' },
  indirectness: { en: 'Indirectness', pt: 'Indirecao' },
  imprecision: { en: 'Imprecision', pt: 'Imprecisao' },
  publicationBias: { en: 'Publication Bias', pt: 'Vies de Publicacao' },
};

/**
 * GRADE rating labels for domains
 */
export const GRADE_RATING_LABELS = {
  not_serious: { en: 'Not Serious', pt: 'Nao Serio' },
  serious: { en: 'Serious', pt: 'Serio' },
  very_serious: { en: 'Very Serious', pt: 'Muito Serio' },
  undetected: { en: 'Undetected', pt: 'Nao Detectado' },
  strongly_suspected: { en: 'Strongly Suspected', pt: 'Fortemente Suspeito' },
};

