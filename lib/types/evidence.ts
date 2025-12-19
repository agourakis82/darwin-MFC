/**
 * Evidence-based medicine types
 * For grading evidence levels and quality
 */

/**
 * Evidence levels (Oxford Centre for Evidence-Based Medicine)
 */
export type EvidenceLevel = 'Ia' | 'Ib' | 'IIa' | 'IIb' | 'III' | 'IV';

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

