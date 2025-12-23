/**
 * Evidence-based medicine types
 * For grading evidence levels and quality
 */

/**
 * Evidence levels (Oxford Centre for Evidence-Based Medicine)
 */
export type OxfordEvidenceLevel = 'Ia' | 'Ib' | 'IIa' | 'IIb' | 'III' | 'IV';

/**
 * GRADE-style evidence levels (simplified, DynaMed-style)
 * A: Strong - High-quality RCTs or meta-analyses
 * B: Moderate - Lower-quality RCTs or well-designed observational studies
 * C: Weak - Observational studies, case series, or expert consensus
 * D: Expert - Expert opinion or clinical experience without strong evidence
 * GPP: Good Practice Point - Based on clinical experience of guideline group
 */
export type GradeEvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'GPP';

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

