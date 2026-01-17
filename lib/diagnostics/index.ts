/**
 * Diagnostics Index
 * Consolidated exports for clinical decision support tools
 *
 * Darwin-MFC Diagnostic System
 * For healthcare workers in resource-limited settings
 */

// WHO IMCI (Integrated Management of Childhood Illness)
export * from './who-imci';

// Clinical-only diagnostic criteria (no labs required)
export * from './clinical-only-criteria';

// Point-of-care clinical decision algorithms
export * from './point-of-care-algorithms';

// Red flags database for danger sign detection
export * from './red-flags';

// Syndromic management protocols (WHO approach)
export * from './syndromic-management';

// Urgency triage system
export * from './urgency-triage';

// Re-export commonly used types
export type {
  IMCIAssessment,
  DangerSignAssessment,
  CoughAssessment,
  DiarrheaAssessment,
  FeverAssessment,
  NutritionAssessment,
  DehydrationSigns,
  PneumoniaClassification,
  DiarrheaClassification,
  FeverClassification,
  NutritionClassification,
  IMCITreatment,
  FollowUpSchedule
} from './who-imci';

export type {
  ClinicalDiagnosis,
  ClinicalCriteria,
  TreatmentProtocol,
  DiagnosticCategory
} from './clinical-only-criteria';

export type {
  DecisionNode,
  DiagnosticOutcome,
  ClinicalAlgorithm
} from './point-of-care-algorithms';

export type {
  RedFlagCategory,
  RedFlag
} from './red-flags';

export type {
  SyndromicProtocol,
  PossibleCause,
  SyndromicTreatment,
  TreatmentRegimen
} from './syndromic-management';

export type {
  UrgencyLevel,
  SymptomTriageEntry,
  TriageAssessmentResult,
  UrgencyCategory
} from './urgency-triage';

/**
 * Quick access to diagnostic tools by context
 */
export const DIAGNOSTIC_TOOLS = {
  pediatric: [
    'imci-assessment',
    'imci-pneumonia',
    'imci-diarrhea',
    'imci-fever',
    'imci-nutrition'
  ],
  clinicalOnly: [
    'pneumonia-clinical',
    'malaria-clinical',
    'dehydration-clinical',
    'meningitis-clinical',
    'appendicitis-clinical',
    'typhoid-clinical',
    'preeclampsia-clinical',
    'heart-failure-clinical'
  ],
  emergency: [
    'danger-signs-assessment',
    'dehydration-assessment',
    'nutrition-assessment'
  ]
} as const;

/**
 * Conditions that can be diagnosed clinically without labs
 */
export const CLINICAL_ONLY_CONDITIONS = [
  { id: 'pneumonia', reliability: 'high' },
  { id: 'dehydration', reliability: 'high' },
  { id: 'malaria', reliability: 'moderate' },
  { id: 'meningitis', reliability: 'moderate' },
  { id: 'appendicitis', reliability: 'moderate' },
  { id: 'typhoid', reliability: 'moderate' },
  { id: 'preeclampsia', reliability: 'high' },
  { id: 'heart-failure', reliability: 'moderate' }
] as const;

/**
 * WHO IMCI treatment plans quick reference
 */
export const IMCI_TREATMENT_PLANS = {
  dehydration: {
    planA: 'Home fluids + ORS after each stool + zinc',
    planB: 'ORS 75ml/kg over 4 hours in clinic',
    planC: 'IV Ringer\'s Lactate 100ml/kg (urgent)'
  },
  pneumonia: {
    noSigns: 'No antibiotic, supportive care',
    pneumonia: 'Amoxicillin 40mg/kg/day x 5 days',
    severe: 'Ampicillin + Gentamicin, refer'
  },
  malaria: {
    uncomplicated: 'Artemether-Lumefantrine per weight x 3 days',
    severe: 'Artesunate IV/IM, refer'
  }
} as const;
