/**
 * DARWIN-MFC ECG MODULE TYPES
 * ===========================
 *
 * Comprehensive TypeScript types for the ECG module with DUAL PURPOSE:
 * 1. EDUCATIONAL TYPES - For students and medical residents learning ECG interpretation
 * 2. CLINICAL SUPPORT TYPES - For non-cardiologist physicians in clinical practice
 *
 * This module follows GRADE evidence methodology and Vancouver citation standards.
 *
 * @see AHA/ACC/HRS ECG Guidelines
 * @see European Society of Cardiology ECG Recommendations
 */

import type { Citation } from './references';
import type { GradeEvidenceLevel, StudyType } from './evidence';
import type { Difficulty } from './learning';

// =============================================================================
// SECTION 1: EDUCATIONAL TYPES
// Types designed for learning ECG interpretation
// =============================================================================

// -----------------------------------------------------------------------------
// 1.1 ECG Signal Types
// -----------------------------------------------------------------------------

/**
 * Standard ECG lead identifiers
 * Includes standard 12-lead plus extended leads
 */
export type ECGLeadName =
  | 'I' | 'II' | 'III'           // Limb leads
  | 'aVR' | 'aVL' | 'aVF'        // Augmented limb leads
  | 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6'  // Precordial leads
  | 'V7' | 'V8' | 'V9'           // Posterior leads (extended)
  | 'V3R' | 'V4R';               // Right-sided leads

/**
 * Raw ECG signal data from a single lead
 * Represents the electrical activity captured by a lead
 */
export interface ECGSignal {
  /** Unique identifier for this signal recording */
  id: string;

  /** Lead name (e.g., 'II', 'V1') */
  leadName: ECGLeadName;

  /** Sampling rate in Hz (typically 250-500 Hz) */
  samplingRate: number;

  /** Signal values in millivolts (mV) */
  values: number[];

  /** Duration of recording in seconds */
  duration: number;

  /** Timestamp when recording started (ISO 8601) */
  recordedAt: string;

  /** Signal quality indicator (0-100) */
  signalQuality?: number;

  /** Any noise or artifacts detected */
  artifacts?: ECGArtifact[];

  /** Calibration factor (mm/mV, typically 10) */
  calibration?: number;

  /** Paper speed (mm/s, typically 25 or 50) */
  paperSpeed?: number;
}

/**
 * Types of artifacts that can affect ECG signals
 */
export type ECGArtifactType =
  | 'baseline_wander'     // Low-frequency drift
  | 'muscle_tremor'       // High-frequency noise from patient movement
  | 'powerline_interference'  // 50/60 Hz interference
  | 'electrode_motion'    // Motion artifact
  | 'poor_contact';       // Electrode contact issues

/**
 * ECG artifact annotation
 */
export interface ECGArtifact {
  /** Type of artifact */
  type: ECGArtifactType;

  /** Start time in seconds from recording start */
  startTime: number;

  /** End time in seconds */
  endTime: number;

  /** Severity (0-1) */
  severity: number;
}

/**
 * Complete 12-lead ECG recording
 */
export interface ECGRecording {
  /** Unique identifier */
  id: string;

  /** Patient identifier (anonymized for education) */
  patientId?: string;

  /** All lead signals */
  leads: ECGSignal[];

  /** Recording date/time */
  recordedAt: string;

  /** Recording duration in seconds */
  duration: number;

  /** Device/equipment used */
  device?: string;

  /** Institution/location */
  institution?: string;

  /** Overall signal quality score (0-100) */
  overallQuality: number;

  /** Technical comments */
  technicalNotes?: string;
}

// -----------------------------------------------------------------------------
// 1.2 Processed ECG Types
// -----------------------------------------------------------------------------

/**
 * Cardiac axis range classification
 */
export type AxisClassification =
  | 'normal'              // -30 to +90 degrees
  | 'left_axis_deviation' // -30 to -90 degrees
  | 'right_axis_deviation' // +90 to +180 degrees
  | 'extreme_axis_deviation' // -90 to -180 degrees (northwest axis)
  | 'indeterminate';

/**
 * Heart rhythm classification
 */
export type RhythmType =
  | 'sinus_rhythm'
  | 'sinus_bradycardia'
  | 'sinus_tachycardia'
  | 'sinus_arrhythmia'
  | 'atrial_fibrillation'
  | 'atrial_flutter'
  | 'atrial_tachycardia'
  | 'svt'                 // Supraventricular tachycardia
  | 'avnrt'               // AV nodal reentrant tachycardia
  | 'avrt'                // AV reentrant tachycardia (WPW)
  | 'ventricular_tachycardia'
  | 'ventricular_fibrillation'
  | 'idioventricular_rhythm'
  | 'junctional_rhythm'
  | 'asystole'
  | 'paced_rhythm'
  | 'unknown';

/**
 * QRS morphology classification
 */
export type QRSMorphology =
  | 'normal'
  | 'rbbb'                // Right bundle branch block
  | 'lbbb'                // Left bundle branch block
  | 'lafb'                // Left anterior fascicular block
  | 'lpfb'                // Left posterior fascicular block
  | 'bifascicular'        // RBBB + LAFB or RBBB + LPFB
  | 'trifascicular'       // Bifascicular + first degree AV block
  | 'nonspecific_ivcd'    // Nonspecific intraventricular conduction delay
  | 'wpw';                // Wolff-Parkinson-White pattern

/**
 * ST segment changes
 */
export type STChange =
  | 'normal'
  | 'elevation'
  | 'depression'
  | 'nonspecific';

/**
 * T wave morphology
 */
export type TWaveMorphology =
  | 'normal'
  | 'inverted'
  | 'biphasic'
  | 'flattened'
  | 'peaked'              // Hyperkalemia
  | 'deep_symmetric_inversion';  // Wellens syndrome

/**
 * Processed ECG with all calculated measurements
 */
export interface ProcessedECG {
  /** Reference to original recording */
  recordingId: string;

  /** Processing timestamp */
  processedAt: string;

  /** Heart rate measurements */
  heartRate: {
    /** Average heart rate in bpm */
    average: number;
    /** Minimum heart rate */
    minimum: number;
    /** Maximum heart rate */
    maximum: number;
    /** Heart rate variability (SDNN in ms) */
    variability?: number;
  };

  /** Rhythm analysis */
  rhythm: {
    /** Primary rhythm classification */
    type: RhythmType;
    /** Is rhythm regular? */
    isRegular: boolean;
    /** Confidence score (0-1) */
    confidence: number;
  };

  /** Interval measurements (in milliseconds) */
  intervals: {
    /** PR interval (normal: 120-200ms) */
    pr: number;
    /** QRS duration (normal: <120ms) */
    qrs: number;
    /** QT interval */
    qt: number;
    /** Corrected QT (Bazett formula) */
    qtc: number;
    /** QT correction formula used */
    qtCorrectionMethod: 'bazett' | 'fridericia' | 'framingham';
    /** RR interval */
    rr: number;
  };

  /** Cardiac axis */
  axis: {
    /** Axis in degrees */
    degrees: number;
    /** Classification */
    classification: AxisClassification;
  };

  /** QRS morphology analysis */
  qrsMorphology: {
    /** Primary classification */
    type: QRSMorphology;
    /** Additional findings */
    findings: string[];
  };

  /** ST segment analysis per lead */
  stSegment: {
    /** Lead name */
    lead: ECGLeadName;
    /** ST change type */
    change: STChange;
    /** Magnitude in mm (1mm = 0.1mV) */
    magnitude: number;
    /** Shape (concave up, convex, horizontal) */
    shape?: 'concave_up' | 'convex' | 'horizontal';
  }[];

  /** T wave analysis per lead */
  tWave: {
    /** Lead name */
    lead: ECGLeadName;
    /** T wave morphology */
    morphology: TWaveMorphology;
  }[];

  /** P wave analysis */
  pWave: {
    /** P wave present? */
    present: boolean;
    /** P wave morphology */
    morphology: 'normal' | 'peaked' | 'bifid' | 'inverted' | 'absent';
    /** P mitrale (LAE) */
    pMitrale?: boolean;
    /** P pulmonale (RAE) */
    pPulmonale?: boolean;
  };

  /** Voltage criteria */
  voltage: {
    /** Low voltage criteria met (<5mm limb, <10mm precordial) */
    lowVoltage: boolean;
    /** High voltage criteria (LVH/RVH screening) */
    highVoltage: boolean;
    /** Sokolow-Lyon index (S V1 + R V5/V6) */
    sokolowLyon?: number;
    /** Cornell voltage */
    cornell?: number;
  };

  /** Q wave analysis */
  qWaves: {
    /** Lead with pathological Q waves */
    lead: ECGLeadName;
    /** Width in ms */
    width: number;
    /** Depth as % of R wave */
    depthPercentage: number;
    /** Is pathological? (>40ms or >25% of R wave) */
    pathological: boolean;
  }[];

  /** Processing algorithm version */
  algorithmVersion: string;

  /** Processing confidence score (0-100) */
  overallConfidence: number;
}

// -----------------------------------------------------------------------------
// 1.3 ECG Classification Types (AI-assisted)
// -----------------------------------------------------------------------------

/**
 * ECG diagnostic category for classification
 */
export type ECGDiagnosticCategory =
  | 'normal'
  | 'arrhythmia'
  | 'conduction_abnormality'
  | 'ischemia'
  | 'infarction'
  | 'hypertrophy'
  | 'electrolyte_abnormality'
  | 'drug_effect'
  | 'pericardial'
  | 'other';

/**
 * AI/algorithmic classification result for an ECG
 */
export interface ECGClassification {
  /** Unique identifier */
  id: string;

  /** Reference to processed ECG */
  processedEcgId: string;

  /** Classification timestamp */
  classifiedAt: string;

  /** Primary diagnosis */
  primaryDiagnosis: {
    /** Diagnosis code (e.g., 'STEMI_anterior') */
    code: string;
    /** Diagnosis label for display */
    label: string;
    /** Diagnostic category */
    category: ECGDiagnosticCategory;
    /** Confidence score (0-1) */
    confidence: number;
  };

  /** All detected findings (may have multiple) */
  findings: ECGFinding[];

  /** Urgency level */
  urgency: ECGUrgencyLevel;

  /** Algorithm/model used for classification */
  algorithm: {
    /** Algorithm name */
    name: string;
    /** Version */
    version: string;
    /** Model type (e.g., 'CNN', 'XGBoost', 'rules-based') */
    type: string;
  };

  /** Whether this classification requires human review */
  requiresReview: boolean;

  /** Human reviewer validation (if reviewed) */
  humanValidation?: {
    /** Reviewer ID */
    reviewerId: string;
    /** Reviewed timestamp */
    reviewedAt: string;
    /** Is classification correct? */
    isCorrect: boolean;
    /** Corrected diagnosis if different */
    correctedDiagnosis?: string;
    /** Reviewer comments */
    comments?: string;
  };
}

/**
 * Individual ECG finding
 */
export interface ECGFinding {
  /** Finding code */
  code: string;

  /** Human-readable label */
  label: string;

  /** i18n key for localization */
  labelKey: string;

  /** Category of finding */
  category: ECGDiagnosticCategory;

  /** Confidence (0-1) */
  confidence: number;

  /** Which leads show this finding */
  leadsAffected?: ECGLeadName[];

  /** Is this a critical finding? */
  isCritical: boolean;

  /** Detailed description */
  description?: string;

  /** Associated clinical conditions */
  associatedConditions?: string[];

  /** Evidence/citations for this finding */
  citations?: Citation[];
}

/**
 * ECG urgency levels
 */
export type ECGUrgencyLevel =
  | 'routine'      // Normal or minor abnormality
  | 'soon'         // Should be reviewed within hours
  | 'urgent'       // Requires prompt attention
  | 'emergent';    // Immediate action required (STEMI, VT/VF, etc.)

// -----------------------------------------------------------------------------
// 1.4 Educational Case Types
// -----------------------------------------------------------------------------

/**
 * ECG clinical case for educational purposes
 */
export interface ECGCase {
  /** Unique identifier */
  id: string;

  /** Case title (i18n key) */
  titleKey: string;

  /** Brief description */
  descriptionKey: string;

  /** Difficulty level */
  difficulty: Difficulty;

  /** Target learner level */
  targetLevel: ECGLearnerLevel;

  /** ECG recording associated with this case */
  ecgRecording: ECGRecording;

  /** Clinical presentation */
  clinicalContext: {
    /** Patient demographics */
    patient: {
      /** Age in years */
      age: number;
      /** Sex */
      sex: 'male' | 'female' | 'other';
      /** Relevant medical history (i18n keys) */
      historyKeys: string[];
    };
    /** Chief complaint (i18n key) */
    chiefComplaintKey: string;
    /** Vital signs */
    vitals?: {
      heartRate: number;
      bloodPressure: { systolic: number; diastolic: number };
      respiratoryRate?: number;
      oxygenSaturation?: number;
      temperature?: number;
    };
    /** Relevant symptoms (i18n keys) */
    symptomKeys: string[];
    /** Current medications */
    medications?: string[];
    /** Lab values if relevant */
    labValues?: Record<string, { value: number; unit: string; isAbnormal?: boolean }>;
  };

  /** Key findings the learner should identify */
  keyFindings: ECGCaseKeyFinding[];

  /** Correct diagnosis/diagnoses */
  correctDiagnoses: {
    /** Diagnosis code */
    code: string;
    /** Label (i18n key) */
    labelKey: string;
    /** Explanation (i18n key) */
    explanationKey: string;
    /** Is this the primary diagnosis? */
    isPrimary: boolean;
  }[];

  /** Teaching points (i18n keys) */
  teachingPointKeys: string[];

  /** Related ECG cases (for similar/differential learning) */
  relatedCases?: string[];

  /** Competencies this case teaches */
  competencies: string[];

  /** References and citations */
  citations: Citation[];

  /** Learning objectives (i18n keys) */
  learningObjectiveKeys: string[];

  /** Tags for categorization */
  tags: string[];

  /** Is this case published/active? */
  isPublished: boolean;
}

/**
 * Key finding in an educational ECG case
 */
export interface ECGCaseKeyFinding {
  /** Finding identifier */
  id: string;

  /** Label (i18n key) */
  labelKey: string;

  /** Description/explanation (i18n key) */
  descriptionKey: string;

  /** Which leads best demonstrate this finding */
  bestLeads: ECGLeadName[];

  /** Points awarded for identifying this finding */
  points: number;

  /** Is this finding essential (must identify)? */
  isEssential: boolean;

  /** Hint to provide if learner misses it (i18n key) */
  hintKey?: string;

  /** Common mistakes learners make (i18n keys) */
  commonMistakeKeys?: string[];
}

/**
 * Learner experience level for ECG interpretation
 */
export type ECGLearnerLevel =
  | 'medical_student'      // Basic ECG concepts
  | 'intern'               // Common patterns
  | 'resident'             // Advanced interpretation
  | 'fellow'               // Subspecialty level
  | 'attending';           // Expert level

// -----------------------------------------------------------------------------
// 1.5 Competency and Learning Path Types
// -----------------------------------------------------------------------------

/**
 * ECG interpretation competency
 */
export interface ECGCompetency {
  /** Unique identifier */
  id: string;

  /** Competency name (i18n key) */
  nameKey: string;

  /** Description (i18n key) */
  descriptionKey: string;

  /** Category */
  category: ECGCompetencyCategory;

  /** Required learner level */
  level: ECGLearnerLevel;

  /** Specific skills/knowledge within this competency */
  subCompetencies: ECGSubCompetency[];

  /** Minimum cases required for proficiency */
  requiredCases: number;

  /** Minimum accuracy required (0-1) */
  requiredAccuracy: number;

  /** Prerequisites (other competency IDs) */
  prerequisites?: string[];

  /** Citations for educational standards */
  citations?: Citation[];
}

/**
 * Competency category
 */
export type ECGCompetencyCategory =
  | 'rhythm_recognition'
  | 'interval_measurement'
  | 'axis_determination'
  | 'chamber_abnormalities'
  | 'ischemia_infarction'
  | 'conduction_abnormalities'
  | 'arrhythmia_management'
  | 'special_populations'  // Pediatric, athletes, etc.
  | 'clinical_correlation';

/**
 * Sub-competency within a main ECG competency
 */
export interface ECGSubCompetency {
  /** Identifier */
  id: string;

  /** Name (i18n key) */
  nameKey: string;

  /** Specific learning objectives */
  objectiveKeys: string[];

  /** Weight in overall competency score (0-1) */
  weight: number;
}

/**
 * Performance metrics for ECG learning
 */
export interface ECGMetrics {
  /** User/learner ID */
  learnerId: string;

  /** Competency ID being measured */
  competencyId: string;

  /** Number of cases attempted */
  casesAttempted: number;

  /** Number of cases completed correctly */
  casesCorrect: number;

  /** Accuracy rate (0-1) */
  accuracy: number;

  /** Average time per case (seconds) */
  averageTimePerCase: number;

  /** Performance trend (improving, stable, declining) */
  trend: 'improving' | 'stable' | 'declining';

  /** Last assessment date */
  lastAssessedAt: string;

  /** Detailed breakdown by finding type */
  findingAccuracy: {
    /** Finding code */
    findingCode: string;
    /** Times encountered */
    encountered: number;
    /** Times correctly identified */
    correct: number;
    /** Accuracy for this finding */
    accuracy: number;
  }[];

  /** Common errors made */
  commonErrors: {
    /** Error type */
    type: string;
    /** Count */
    count: number;
    /** Description */
    description: string;
  }[];

  /** Mastery level achieved */
  masteryLevel: ECGMasteryLevel;
}

/**
 * Mastery levels for ECG competencies
 */
export type ECGMasteryLevel =
  | 'novice'         // <50% accuracy
  | 'beginner'       // 50-65%
  | 'intermediate'   // 65-80%
  | 'proficient'     // 80-90%
  | 'expert';        // >90%

/**
 * ECG learning path structure
 */
export interface ECGLearningPath {
  /** Unique identifier */
  id: string;

  /** Path title (i18n key) */
  titleKey: string;

  /** Description (i18n key) */
  descriptionKey: string;

  /** Target learner level */
  targetLevel: ECGLearnerLevel;

  /** Estimated hours to complete */
  estimatedHours: number;

  /** Modules in this learning path */
  modules: ECGLearningModule[];

  /** Competencies covered */
  competencies: string[];

  /** Prerequisites (other path IDs) */
  prerequisites?: string[];

  /** Certification offered upon completion */
  certification?: {
    /** Certification name */
    name: string;
    /** CME credits if applicable */
    cmeCredits?: number;
    /** Validity period in months */
    validityMonths?: number;
  };

  /** Is this path active? */
  isPublished: boolean;

  /** Version */
  version: string;
}

/**
 * Module within an ECG learning path
 */
export interface ECGLearningModule {
  /** Module ID */
  id: string;

  /** Title (i18n key) */
  titleKey: string;

  /** Description (i18n key) */
  descriptionKey: string;

  /** Order in the learning path */
  order: number;

  /** Type of module */
  type: 'theory' | 'practice' | 'assessment' | 'case_study';

  /** Content (theory modules) */
  content?: {
    /** Content sections (i18n keys) */
    sectionKeys: string[];
    /** Associated media (images, videos) */
    media?: { type: 'image' | 'video'; url: string; captionKey?: string }[];
  };

  /** Practice cases (practice modules) */
  cases?: string[];  // ECGCase IDs

  /** Assessment configuration */
  assessment?: {
    /** Number of questions */
    questionCount: number;
    /** Passing score (0-1) */
    passingScore: number;
    /** Time limit in minutes */
    timeLimitMinutes?: number;
    /** Allow retakes? */
    allowRetakes: boolean;
  };

  /** Estimated time in minutes */
  estimatedMinutes: number;
}

// =============================================================================
// SECTION 2: CLINICAL SUPPORT TYPES
// Types designed for non-cardiologist physicians in clinical practice
// =============================================================================

// -----------------------------------------------------------------------------
// 2.1 Clinical Context Types
// -----------------------------------------------------------------------------

/**
 * Clinical setting where ECG is being interpreted
 */
export type ClinicalContext =
  | 'emergency'       // Emergency department
  | 'icu'             // Intensive care unit
  | 'ccu'             // Coronary care unit
  | 'ward'            // General hospital ward
  | 'primary_care'    // Outpatient/clinic setting
  | 'preoperative'    // Pre-surgical evaluation
  | 'telemedicine';   // Remote consultation

/**
 * Clinical urgency context
 */
export interface ClinicalUrgencyContext {
  /** Clinical setting */
  setting: ClinicalContext;

  /** Patient stability */
  patientStability: 'stable' | 'unstable' | 'critical';

  /** Is this a code/arrest situation? */
  isCodeSituation: boolean;

  /** Time-sensitive condition suspected? */
  timeSensitive: boolean;

  /** Primary clinical concern */
  primaryConcern?: string;
}

// -----------------------------------------------------------------------------
// 2.2 Triage Types
// -----------------------------------------------------------------------------

/**
 * ECG triage category for clinical decision making
 */
export type ECGTriageCategory =
  | 'normal'      // No significant abnormality
  | 'abnormal'    // Abnormality present, but not immediately dangerous
  | 'urgent'      // Requires prompt cardiology consultation
  | 'emergency';  // Requires immediate intervention

/**
 * ECG triage result for clinical decision support
 */
export interface ECGTriageResult {
  /** Unique identifier */
  id: string;

  /** Reference to the ECG recording */
  ecgRecordingId: string;

  /** Triage timestamp */
  triageAt: string;

  /** Triage category */
  category: ECGTriageCategory;

  /** Confidence in triage decision (0-1) */
  confidence: number;

  /** Primary finding driving the triage decision */
  primaryFinding: {
    /** Finding code */
    code: string;
    /** Description (i18n key) */
    descriptionKey: string;
    /** Severity (1-5, 5 being most severe) */
    severity: 1 | 2 | 3 | 4 | 5;
  };

  /** All significant findings */
  allFindings: ECGTriageFinding[];

  /** Recommended actions based on triage */
  recommendedActions: ECGRecommendedAction[];

  /** Red flags present */
  redFlags: ECGRedFlag[];

  /** Time frame for action */
  timeFrame: ECGTimeFrame;

  /** Whether cardiology consultation is recommended */
  cardiologyConsult: {
    /** Is consult recommended? */
    recommended: boolean;
    /** Urgency of consult */
    urgency: 'routine' | 'same_day' | 'urgent' | 'emergent';
    /** Reason for consultation (i18n key) */
    reasonKey?: string;
  };

  /** Clinical pearls relevant to this ECG (i18n keys) */
  clinicalPearlKeys: string[];

  /** Evidence supporting triage decision */
  evidence?: {
    /** Guideline references */
    guidelines: Citation[];
    /** Evidence level */
    evidenceLevel: GradeEvidenceLevel;
  };
}

/**
 * Individual finding in triage result
 */
export interface ECGTriageFinding {
  /** Finding code */
  code: string;

  /** Label (i18n key) */
  labelKey: string;

  /** Severity level */
  severity: 'mild' | 'moderate' | 'severe' | 'critical';

  /** Leads where finding is present */
  leads?: ECGLeadName[];

  /** Brief explanation for non-specialists (i18n key) */
  explanationKey: string;

  /** What this finding might indicate (i18n key) */
  clinicalSignificanceKey: string;
}

/**
 * Recommended action based on ECG findings
 */
export interface ECGRecommendedAction {
  /** Action identifier */
  id: string;

  /** Action description (i18n key) */
  actionKey: string;

  /** Priority */
  priority: 'immediate' | 'urgent' | 'soon' | 'routine';

  /** Category of action */
  category: 'diagnostic' | 'therapeutic' | 'monitoring' | 'consultation';

  /** Specific details (i18n key) */
  detailsKey?: string;

  /** Evidence level for this recommendation */
  evidenceLevel?: GradeEvidenceLevel;
}

/**
 * Time frame for clinical action
 */
export interface ECGTimeFrame {
  /** Maximum time to action */
  maxTime: number;

  /** Time unit */
  unit: 'minutes' | 'hours' | 'days';

  /** Rationale (i18n key) */
  rationaleKey: string;
}

// -----------------------------------------------------------------------------
// 2.3 Systematic Checklist Types
// -----------------------------------------------------------------------------

/**
 * Systematic ECG interpretation checklist
 * Ensures non-specialists don't miss important findings
 */
export interface ECGChecklist {
  /** Checklist identifier */
  id: string;

  /** Checklist name (i18n key) */
  nameKey: string;

  /** Description (i18n key) */
  descriptionKey: string;

  /** Clinical context this checklist is designed for */
  context: ClinicalContext;

  /** Checklist sections */
  sections: ECGChecklistSection[];

  /** Total items in checklist */
  totalItems: number;

  /** Estimated time to complete (minutes) */
  estimatedMinutes: number;

  /** Evidence/guideline basis */
  citations: Citation[];

  /** Version */
  version: string;
}

/**
 * Section within an ECG checklist
 */
export interface ECGChecklistSection {
  /** Section ID */
  id: string;

  /** Section title (i18n key) */
  titleKey: string;

  /** Order in checklist */
  order: number;

  /** Items in this section */
  items: ECGChecklistItem[];
}

/**
 * Individual checklist item
 */
export interface ECGChecklistItem {
  /** Item ID */
  id: string;

  /** Item text (i18n key) - what to check */
  textKey: string;

  /** Order within section */
  order: number;

  /** What findings to look for */
  findingsToAssess: string[];

  /** Normal range/value if applicable */
  normalRange?: {
    /** Minimum normal value */
    min?: number;
    /** Maximum normal value */
    max?: number;
    /** Unit */
    unit?: string;
    /** Description for qualitative items (i18n key) */
    descriptionKey?: string;
  };

  /** What abnormalities indicate (i18n keys) */
  abnormalImplicationsKeys: string[];

  /** Quick reference guide (i18n key) */
  quickReferenceKey?: string;

  /** Associated red flags if abnormal */
  redFlagIfAbnormal?: string[];

  /** Is this item critical (must not be skipped)? */
  isCritical: boolean;

  /** Help content for non-specialists (i18n key) */
  helpKey?: string;

  /** Visual aid reference (image/diagram ID) */
  visualAid?: string;
}

/**
 * User's progress through a checklist
 */
export interface ECGChecklistProgress {
  /** Progress record ID */
  id: string;

  /** Checklist ID */
  checklistId: string;

  /** ECG recording being evaluated */
  ecgRecordingId: string;

  /** User/clinician ID */
  userId: string;

  /** Started timestamp */
  startedAt: string;

  /** Completed timestamp */
  completedAt?: string;

  /** Item responses */
  responses: ECGChecklistResponse[];

  /** Overall assessment */
  assessment?: {
    /** Is ECG normal? */
    isNormal: boolean;
    /** Summary of findings */
    findings: string[];
    /** Confidence in assessment (0-1) */
    confidence: number;
  };
}

/**
 * Response to a checklist item
 */
export interface ECGChecklistResponse {
  /** Item ID */
  itemId: string;

  /** Is finding normal? */
  isNormal: boolean;

  /** Measured value if applicable */
  value?: number;

  /** Selected finding if abnormal */
  selectedFinding?: string;

  /** User notes */
  notes?: string;

  /** Timestamp */
  assessedAt: string;
}

// -----------------------------------------------------------------------------
// 2.4 Red Flag Types
// -----------------------------------------------------------------------------

/**
 * ECG red flag - critical finding requiring immediate attention
 */
export interface ECGRedFlag {
  /** Red flag identifier */
  id: string;

  /** Code for the red flag condition */
  code: ECGRedFlagCode;

  /** Title (i18n key) */
  titleKey: string;

  /** Description (i18n key) */
  descriptionKey: string;

  /** Severity level */
  severity: 'warning' | 'critical' | 'life_threatening';

  /** Criteria that triggered this flag */
  triggerCriteria: string[];

  /** Immediate actions required (i18n keys) */
  immediateActionKeys: string[];

  /** Do NOT do these things (i18n keys) - common mistakes to avoid */
  avoidActionKeys?: string[];

  /** Time-sensitive? */
  timeSensitive: boolean;

  /** Maximum time to intervention (minutes) */
  maxTimeToIntervention?: number;

  /** Associated clinical conditions */
  associatedConditions: string[];

  /** Evidence/guidelines */
  citations: Citation[];

  /** Visual example reference */
  exampleImageId?: string;
}

/**
 * Predefined ECG red flag codes
 */
export type ECGRedFlagCode =
  // Ischemia/Infarction
  | 'STEMI'
  | 'NSTEMI_high_risk'
  | 'wellens_syndrome'
  | 'de_winter_t_waves'
  | 'posterior_mi'
  | 'right_ventricular_mi'

  // Arrhythmias
  | 'vt_sustained'
  | 'vt_polymorphic'
  | 'torsades_de_pointes'
  | 'vf'
  | 'svt_unstable'
  | 'afib_rvr'
  | 'complete_heart_block'
  | 'mobitz_ii'
  | 'sick_sinus'
  | 'long_pause'

  // Conduction
  | 'new_lbbb'
  | 'trifascicular_block'

  // Other critical
  | 'severe_hyperkalemia'
  | 'severe_hypokalemia'
  | 'brugada_pattern'
  | 'long_qt'
  | 'short_qt'
  | 'massive_pe'
  | 'pericarditis_with_effusion'
  | 'pacemaker_failure';

// -----------------------------------------------------------------------------
// 2.5 Referral Criteria Types
// -----------------------------------------------------------------------------

/**
 * Criteria for cardiology referral
 */
export interface ECGReferralCriteria {
  /** Criteria ID */
  id: string;

  /** ECG finding/pattern code */
  findingCode: string;

  /** Finding description (i18n key) */
  findingDescriptionKey: string;

  /** Referral urgency */
  urgency: ECGReferralUrgency;

  /** Referral recommendation (i18n key) */
  recommendationKey: string;

  /** Rationale for referral (i18n key) */
  rationaleKey: string;

  /** What information to include in referral (i18n keys) */
  referralContentKeys: string[];

  /** Pre-referral workup to consider (i18n keys) */
  preReferralWorkupKeys?: string[];

  /** Can this be managed in primary care under certain conditions? */
  primaryCareManageable?: {
    /** Can be managed if these conditions met */
    conditions: string[];
    /** Management guidance (i18n key) */
    managementKey: string;
  };

  /** Evidence/guidelines supporting this referral criteria */
  citations: Citation[];

  /** Evidence level */
  evidenceLevel: GradeEvidenceLevel;
}

/**
 * Referral urgency levels
 */
export type ECGReferralUrgency =
  | 'emergent'       // Call cardiology NOW, consider transfer
  | 'urgent'         // Same day consultation
  | 'soon'           // Within 1-2 weeks
  | 'routine'        // Standard outpatient referral
  | 'optional';      // Consider referral, not mandatory

/**
 * Complete referral recommendation
 */
export interface ECGReferralRecommendation {
  /** Recommendation ID */
  id: string;

  /** ECG recording ID */
  ecgRecordingId: string;

  /** Criteria that triggered recommendation */
  matchedCriteria: ECGReferralCriteria[];

  /** Overall urgency (highest of all matched criteria) */
  overallUrgency: ECGReferralUrgency;

  /** Summary for referring physician (i18n key) */
  summaryKey: string;

  /** Suggested referral note template (i18n key) */
  referralNoteTemplateKey: string;

  /** Questions cardiology will likely ask */
  anticipatedQuestions: string[];
}

// -----------------------------------------------------------------------------
// 2.6 Interpretation Report Types
// -----------------------------------------------------------------------------

/**
 * Complete ECG interpretation report for non-specialists
 * Designed to be educational while providing clinical guidance
 */
export interface ECGInterpretationReport {
  /** Report ID */
  id: string;

  /** ECG recording ID */
  ecgRecordingId: string;

  /** Report generation timestamp */
  generatedAt: string;

  /** Clinical context provided */
  clinicalContext: ClinicalUrgencyContext;

  /** Report sections */
  sections: {
    /** Technical quality assessment */
    quality: {
      /** Overall quality score (0-100) */
      score: number;
      /** Quality issues if any */
      issues?: string[];
      /** Is ECG interpretable? */
      isInterpretable: boolean;
    };

    /** Rate and rhythm */
    rateRhythm: {
      /** Heart rate */
      heartRate: number;
      /** Rhythm classification */
      rhythm: RhythmType;
      /** Regular? */
      isRegular: boolean;
      /** Plain language description (i18n key) */
      descriptionKey: string;
      /** Clinical significance (i18n key) */
      significanceKey?: string;
    };

    /** Intervals */
    intervals: {
      /** PR interval with interpretation */
      pr: ECGIntervalResult;
      /** QRS duration with interpretation */
      qrs: ECGIntervalResult;
      /** QTc with interpretation */
      qtc: ECGIntervalResult;
    };

    /** Axis */
    axis: {
      /** Axis value */
      degrees: number;
      /** Classification */
      classification: AxisClassification;
      /** Interpretation (i18n key) */
      interpretationKey: string;
    };

    /** Morphology findings */
    morphology: {
      /** P wave findings */
      pWave: string;
      /** QRS findings */
      qrs: string;
      /** ST segment findings */
      stSegment: string;
      /** T wave findings */
      tWave: string;
    };

    /** Significant findings */
    significantFindings: ECGReportFinding[];

    /** Overall impression */
    impression: {
      /** Summary (i18n key) */
      summaryKey: string;
      /** Is this ECG normal? */
      isNormal: boolean;
      /** Primary diagnosis if abnormal */
      primaryDiagnosis?: string;
      /** Differential diagnoses */
      differentialDiagnoses?: string[];
    };

    /** Clinical recommendations */
    recommendations: {
      /** Immediate actions */
      immediate: ECGRecommendedAction[];
      /** Follow-up recommendations */
      followUp: ECGRecommendedAction[];
      /** Monitoring recommendations */
      monitoring?: string[];
    };
  };

  /** Red flags identified */
  redFlags: ECGRedFlag[];

  /** Triage result */
  triageResult: ECGTriageResult;

  /** Referral recommendation if applicable */
  referral?: ECGReferralRecommendation;

  /** Comparison with previous ECG if available */
  comparison?: {
    /** Previous ECG ID */
    previousEcgId: string;
    /** Date of previous ECG */
    previousDate: string;
    /** Changes identified (i18n keys) */
    changeKeys: string[];
    /** Is change significant? */
    significantChange: boolean;
  };

  /** Educational content for the interpreter */
  education: {
    /** Key learning points (i18n keys) */
    keyPointKeys: string[];
    /** Related educational resources */
    relatedResources: { titleKey: string; url: string }[];
    /** Common pitfalls to avoid (i18n keys) */
    pitfallKeys: string[];
  };

  /** Confidence and limitations */
  confidence: {
    /** Overall confidence (0-1) */
    score: number;
    /** Limitations of this interpretation */
    limitations: string[];
    /** Recommendations for unclear findings */
    uncertaintyGuidance?: string;
  };

  /** Metadata */
  metadata: {
    /** Report version */
    version: string;
    /** Algorithm version */
    algorithmVersion: string;
    /** Was AI-assisted? */
    aiAssisted: boolean;
    /** Reviewed by human? */
    humanReviewed: boolean;
    /** Reviewer ID if reviewed */
    reviewerId?: string;
  };
}

/**
 * Interval measurement result with interpretation
 */
export interface ECGIntervalResult {
  /** Measured value (ms) */
  value: number;

  /** Normal range */
  normalRange: { min: number; max: number };

  /** Is within normal limits? */
  isNormal: boolean;

  /** Classification */
  classification: 'normal' | 'short' | 'prolonged' | 'borderline';

  /** Clinical interpretation (i18n key) */
  interpretationKey: string;

  /** Possible causes if abnormal (i18n keys) */
  possibleCausesKeys?: string[];
}

/**
 * Finding for the interpretation report
 */
export interface ECGReportFinding {
  /** Finding code */
  code: string;

  /** Title (i18n key) */
  titleKey: string;

  /** Description for non-specialists (i18n key) */
  descriptionKey: string;

  /** Severity */
  severity: 'incidental' | 'mild' | 'moderate' | 'severe' | 'critical';

  /** Clinical significance (i18n key) */
  clinicalSignificanceKey: string;

  /** Leads affected */
  leadsAffected?: ECGLeadName[];

  /** What to do about this finding (i18n key) */
  actionKey: string;
}

// =============================================================================
// SECTION 3: SHARED/UTILITY TYPES
// Types used by both educational and clinical components
// =============================================================================

/**
 * ECG image annotation for teaching/reporting
 */
export interface ECGAnnotation {
  /** Annotation ID */
  id: string;

  /** X coordinate (% from left) */
  x: number;

  /** Y coordinate (% from top) */
  y: number;

  /** Width (% of image) */
  width?: number;

  /** Height (% of image) */
  height?: number;

  /** Lead this annotation is on */
  lead?: ECGLeadName;

  /** Annotation type */
  type: 'point' | 'region' | 'arrow' | 'bracket';

  /** Label (i18n key) */
  labelKey: string;

  /** Description (i18n key) */
  descriptionKey?: string;

  /** Color */
  color: string;
}

/**
 * ECG comparison result
 */
export interface ECGComparisonResult {
  /** Current ECG ID */
  currentEcgId: string;

  /** Previous ECG ID */
  previousEcgId: string;

  /** Time between ECGs */
  timeDifference: {
    value: number;
    unit: 'hours' | 'days' | 'weeks' | 'months' | 'years';
  };

  /** Parameters that changed */
  changes: ECGParameterChange[];

  /** Overall assessment */
  overallAssessment: {
    /** Are there significant changes? */
    hasSignificantChanges: boolean;
    /** Summary (i18n key) */
    summaryKey: string;
    /** Clinical implications (i18n key) */
    implicationsKey?: string;
  };
}

/**
 * Change in an ECG parameter between two ECGs
 */
export interface ECGParameterChange {
  /** Parameter name */
  parameter: string;

  /** Previous value */
  previousValue: number | string;

  /** Current value */
  currentValue: number | string;

  /** Is this change significant? */
  isSignificant: boolean;

  /** Clinical interpretation (i18n key) */
  interpretationKey: string;
}

/**
 * User feedback on ECG interpretation (for quality improvement)
 */
export interface ECGFeedback {
  /** Feedback ID */
  id: string;

  /** ECG or report ID */
  targetId: string;

  /** Type of target */
  targetType: 'classification' | 'triage' | 'report';

  /** User ID */
  userId: string;

  /** Timestamp */
  submittedAt: string;

  /** Was the interpretation correct? */
  wasCorrect: boolean;

  /** If incorrect, what was the correct interpretation? */
  correctInterpretation?: string;

  /** Specific feedback */
  feedback?: string;

  /** Suggestions for improvement */
  suggestions?: string;
}

// =============================================================================
// EXPORT AGGREGATION
// =============================================================================

// All types are exported via named exports above.
// This section provides additional type guards and utility types.

/**
 * Type guard to check if a finding is a red flag
 */
export function isRedFlag(finding: ECGFinding): finding is ECGFinding & { isCritical: true } {
  return finding.isCritical === true;
}

/**
 * Type guard to check if triage result requires immediate action
 */
export function requiresImmediateAction(triage: ECGTriageResult): boolean {
  return triage.category === 'emergency' || triage.redFlags.some(rf => rf.severity === 'life_threatening');
}

/**
 * All ECG-related types grouped for convenient importing
 */
export type ECGTypes = {
  // Signal types
  ECGSignal: ECGSignal;
  ECGRecording: ECGRecording;
  ProcessedECG: ProcessedECG;

  // Classification types
  ECGClassification: ECGClassification;
  ECGFinding: ECGFinding;

  // Educational types
  ECGCase: ECGCase;
  ECGCompetency: ECGCompetency;
  ECGMetrics: ECGMetrics;
  ECGLearningPath: ECGLearningPath;

  // Clinical types
  ECGTriageResult: ECGTriageResult;
  ECGChecklist: ECGChecklist;
  ECGChecklistItem: ECGChecklistItem;
  ECGRedFlag: ECGRedFlag;
  ECGReferralCriteria: ECGReferralCriteria;
  ECGInterpretationReport: ECGInterpretationReport;
};
