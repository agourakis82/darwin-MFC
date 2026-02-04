/**
 * Evidence-based medicine types
 * For grading evidence levels and quality following the GRADE framework
 * (Grading of Recommendations Assessment, Development and Evaluation)
 */

/**
 * Evidence levels (Oxford Centre for Evidence-Based Medicine)
 */
export type OxfordEvidenceLevel = 'Ia' | 'Ib' | 'IIa' | 'IIb' | 'III' | 'IV';

/**
 * DynaMed-style evidence levels (simplified GRADE)
 * A: Strong - High-quality RCTs or meta-analyses
 * B: Moderate - Lower-quality RCTs or well-designed observational studies
 * C: Weak - Observational studies, case series, or expert consensus
 * D: Expert - Expert opinion or clinical experience without strong evidence
 * GPP: Good Practice Point - Based on clinical experience of guideline group
 */
export type GradeEvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'GPP';

// =============================================================================
// GRADE FRAMEWORK - Full Implementation
// =============================================================================

/**
 * GRADE Certainty of Evidence (Quality of Evidence)
 * The 4-level official GRADE certainty ratings
 */
export type GradeCertainty = 'high' | 'moderate' | 'low' | 'very_low';

/**
 * GRADE Recommendation Strength
 * Strong: Benefits clearly outweigh harms (or vice versa)
 * Weak/Conditional: Benefits and harms closely balanced, or uncertainty
 */
export type GradeRecommendationStrength = 'strong_for' | 'weak_for' | 'weak_against' | 'strong_against';

/**
 * GRADE domains that can downgrade evidence certainty
 */
export interface GradeDowngradeDomains {
  /** Risk of bias (limitations in study design/execution) */
  riskOfBias?: 'none' | 'serious' | 'very_serious';
  /** Inconsistency (heterogeneity across studies) */
  inconsistency?: 'none' | 'serious' | 'very_serious';
  /** Indirectness (differences in PICO) */
  indirectness?: 'none' | 'serious' | 'very_serious';
  /** Imprecision (wide confidence intervals) */
  imprecision?: 'none' | 'serious' | 'very_serious';
  /** Publication bias */
  publicationBias?: 'none' | 'likely' | 'strongly_suspected';
}

/**
 * GRADE domains that can upgrade evidence certainty (for observational studies)
 */
export interface GradeUpgradeDomains {
  /** Large effect size (RR >2 or <0.5) */
  largeEffect?: boolean;
  /** Dose-response gradient */
  doseResponse?: boolean;
  /** All plausible confounders would reduce the effect */
  confoundersReduceEffect?: boolean;
}

/**
 * Complete GRADE assessment for a body of evidence
 */
export interface GradeAssessment {
  /** Starting certainty (high for RCTs, low for observational) */
  startingCertainty: 'high' | 'low';
  /** Downgrade factors */
  downgrade: GradeDowngradeDomains;
  /** Upgrade factors (only for observational studies) */
  upgrade?: GradeUpgradeDomains;
  /** Final certainty after adjustments */
  finalCertainty: GradeCertainty;
  /** Rationale for the assessment */
  rationale?: string;
}

/**
 * GRADE Recommendation with full metadata
 */
export interface GradeRecommendation {
  /** Unique identifier */
  id: string;
  /** The recommendation text */
  recommendation: string;
  /** Strength of recommendation */
  strength: GradeRecommendationStrength;
  /** Certainty of evidence */
  certainty: GradeCertainty;
  /** GRADE assessment details */
  assessment?: GradeAssessment;
  /** Population this applies to */
  population?: string;
  /** Intervention */
  intervention?: string;
  /** Comparator */
  comparator?: string;
  /** Outcomes considered */
  outcomes?: string[];
  /** Key references supporting this recommendation */
  references?: string[];
  /** Remarks or caveats */
  remarks?: string;
  /** Date of last review */
  lastReviewed?: string;
}

/**
 * GRADE certainty configuration for UI
 */
export const GRADE_CERTAINTY_CONFIG: Record<
  GradeCertainty,
  { label: string; labelPt: string; symbol: string; color: string; bgColor: string; borderColor: string; description: string }
> = {
  high: {
    label: 'High',
    labelPt: 'Alta',
    symbol: '⊕⊕⊕⊕',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    description: 'We are very confident that the true effect lies close to that of the estimate of the effect',
  },
  moderate: {
    label: 'Moderate',
    labelPt: 'Moderada',
    symbol: '⊕⊕⊕⊖',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    description: 'We are moderately confident in the effect estimate: the true effect is likely to be close to the estimate of the effect, but there is a possibility that it is substantially different',
  },
  low: {
    label: 'Low',
    labelPt: 'Baixa',
    symbol: '⊕⊕⊖⊖',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    description: 'Our confidence in the effect estimate is limited: the true effect may be substantially different from the estimate of the effect',
  },
  very_low: {
    label: 'Very Low',
    labelPt: 'Muito Baixa',
    symbol: '⊕⊖⊖⊖',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    description: 'We have very little confidence in the effect estimate: the true effect is likely to be substantially different from the estimate of effect',
  },
};

/**
 * GRADE recommendation strength configuration for UI
 */
export const GRADE_STRENGTH_CONFIG: Record<
  GradeRecommendationStrength,
  { label: string; labelPt: string; icon: string; color: string; description: string }
> = {
  strong_for: {
    label: 'Strong recommendation for',
    labelPt: 'Recomendação forte a favor',
    icon: '↑↑',
    color: 'text-green-400',
    description: 'Most patients should receive the intervention. Clinicians should offer it to most patients.',
  },
  weak_for: {
    label: 'Weak recommendation for',
    labelPt: 'Recomendação fraca a favor',
    icon: '↑?',
    color: 'text-yellow-400',
    description: 'Many patients would want the intervention, but many would not. Shared decision-making is appropriate.',
  },
  weak_against: {
    label: 'Weak recommendation against',
    labelPt: 'Recomendação fraca contra',
    icon: '↓?',
    color: 'text-orange-400',
    description: 'Many patients would not want the intervention, but some would. Shared decision-making is appropriate.',
  },
  strong_against: {
    label: 'Strong recommendation against',
    labelPt: 'Recomendação forte contra',
    icon: '↓↓',
    color: 'text-red-400',
    description: 'Most patients should not receive the intervention. Clinicians should not offer it.',
  },
};

/**
 * Map DynaMed-style levels to GRADE certainty
 */
export function mapDynamedToGrade(level: GradeEvidenceLevel): GradeCertainty {
  switch (level) {
    case 'A':
      return 'high';
    case 'B':
      return 'moderate';
    case 'C':
      return 'low';
    case 'D':
    case 'GPP':
      return 'very_low';
  }
}

/**
 * Map GRADE certainty to DynaMed-style levels
 */
export function mapGradeToDynaMed(certainty: GradeCertainty): GradeEvidenceLevel {
  switch (certainty) {
    case 'high':
      return 'A';
    case 'moderate':
      return 'B';
    case 'low':
      return 'C';
    case 'very_low':
      return 'D';
  }
}

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

