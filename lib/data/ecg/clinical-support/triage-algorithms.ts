/**
 * ECG TRIAGE ALGORITHMS - DARWIN-MFC
 * ===================================
 * Comprehensive ECG triage algorithms for non-cardiologist physicians
 * Designed for Emergency, ICU, Ward, and Primary Care settings
 */

// ============================================================================
// CORE INTERFACES
// ============================================================================

export type ECGTriageClassification =
  | 'normal'
  | 'borderline'
  | 'abnormal_stable'
  | 'abnormal_urgent'
  | 'critical'
  | 'life_threatening';

export type UrgencyLevel = 1 | 2 | 3 | 4;

export type ConfidenceLevel = 'high' | 'moderate' | 'low';

export type ClinicalSetting =
  | 'emergency_department'
  | 'icu'
  | 'ward'
  | 'primary_care'
  | 'outpatient';

export interface TriageOption {
  label: string;
  nextStep: string | 'RESULT';
  classification?: ECGTriageClassification;
  urgency?: UrgencyLevel;
  action?: string;
  referral?: string;
}

export interface TriageStep {
  id: string;
  question: string;
  options: TriageOption[];
  helpText: string;
  redFlagTrigger?: boolean;
  clinicalPearl?: string;
}

export interface TriageResult {
  classification: ECGTriageClassification;
  urgency: UrgencyLevel;
  timeToAction: string;
  actions: string[];
  referralCriteria: string[];
  confidence: ConfidenceLevel;
  clinicalContext?: string;
}

export interface TriageAlgorithm {
  id: string;
  name: string;
  description: string;
  applicableTo: ClinicalSetting[];
  steps: TriageStep[];
  results: Record<string, TriageResult>;
  version: string;
  lastUpdated: string;
  references: string[];
}

export interface DecisionTree {
  id: string;
  name: string;
  question: string;
  description: string;
  nodes: DecisionNode[];
  applicableTo: ClinicalSetting[];
}

export interface DecisionNode {
  id: string;
  question: string;
  yesPath: string | DecisionOutcome;
  noPath: string | DecisionOutcome;
  helpText?: string;
  redFlag?: boolean;
}

export interface DecisionOutcome {
  result: 'yes' | 'no' | 'maybe';
  classification: ECGTriageClassification;
  urgency: UrgencyLevel;
  action: string;
  timeframe: string;
}

export interface ContextProtocol {
  id: string;
  setting: ClinicalSetting;
  name: string;
  description: string;
  initialAssessment: string[];
  triagePriorities: TriagePriority[];
  escalationCriteria: string[];
  documentationRequirements: string[];
  followUpRecommendations: string[];
}

export interface TriagePriority {
  priority: number;
  condition: string;
  action: string;
  timeframe: string;
}

// ============================================================================
// MAIN ECG TRIAGE ALGORITHM
// ============================================================================

export const ecgTriageAlgorithm: TriageAlgorithm = {
  id: 'ecg-main-triage',
  name: 'Main ECG Triage Algorithm',
  description: 'Comprehensive step-by-step ECG triage for non-cardiologist physicians',
  applicableTo: ['emergency_department', 'icu', 'ward', 'primary_care'],
  version: '1.0.0',
  lastUpdated: '2025-01-17',
  references: [
    'AHA/ACC Guidelines for ECG Interpretation 2024',
    'ESC Guidelines for Acute Coronary Syndromes 2023',
    'ACLS Provider Manual 2024',
  ],
  steps: [
    {
      id: 'step-1-rate',
      question: 'What is the ventricular rate?',
      helpText: 'Count R waves in 6 seconds and multiply by 10, or use RR interval method',
      options: [
        { label: '< 50 bpm (Bradycardia)', nextStep: 'step-bradycardia' },
        { label: '50-100 bpm (Normal)', nextStep: 'step-2-rhythm' },
        { label: '> 100 bpm (Tachycardia)', nextStep: 'step-tachycardia' },
      ],
      clinicalPearl: 'Always correlate with clinical status - asymptomatic bradycardia may be physiologic in athletes',
    },
    {
      id: 'step-2-rhythm',
      question: 'Is the rhythm regular?',
      helpText: 'Check if RR intervals are consistent (< 10% variation)',
      options: [
        { label: 'Yes - Regular rhythm', nextStep: 'step-3-p-waves' },
        { label: 'No - Irregular rhythm', nextStep: 'step-irregular' },
        { label: 'Regularly irregular pattern', nextStep: 'step-regularly-irregular' },
      ],
    },
    {
      id: 'step-3-p-waves',
      question: 'Are P waves present and normal?',
      helpText: 'P waves should be upright in I, II, aVF and inverted in aVR',
      options: [
        { label: 'Yes - Normal P waves before each QRS', nextStep: 'step-4-pr-interval' },
        { label: 'No P waves visible', nextStep: 'step-no-p-waves' },
        { label: 'Abnormal P wave morphology', nextStep: 'step-abnormal-p' },
        { label: 'More P waves than QRS complexes', nextStep: 'step-av-block' },
      ],
    },
    {
      id: 'step-4-pr-interval',
      question: 'What is the PR interval?',
      helpText: 'Normal PR: 120-200 ms (3-5 small squares)',
      options: [
        { label: '< 120 ms (Short PR)', nextStep: 'step-short-pr' },
        { label: '120-200 ms (Normal PR)', nextStep: 'step-5-qrs' },
        { label: '> 200 ms (Prolonged PR)', nextStep: 'step-prolonged-pr' },
        { label: 'Variable PR intervals', nextStep: 'step-variable-pr' },
      ],
    },
    {
      id: 'step-5-qrs',
      question: 'What is the QRS duration?',
      helpText: 'Normal QRS: < 120 ms (3 small squares)',
      options: [
        { label: '< 120 ms (Narrow QRS)', nextStep: 'step-6-st-segment' },
        { label: '120-149 ms (Moderately wide)', nextStep: 'step-wide-qrs-moderate' },
        { label: '>= 150 ms (Very wide)', nextStep: 'step-wide-qrs-severe' },
      ],
    },
    {
      id: 'step-6-st-segment',
      question: 'Is there ST segment abnormality?',
      helpText: 'Compare ST segment to TP baseline; significant if >= 1mm in limb leads or >= 2mm in precordial leads',
      redFlagTrigger: true,
      options: [
        { label: 'Isoelectric (Normal)', nextStep: 'step-7-t-wave' },
        { label: 'ST elevation', nextStep: 'step-st-elevation', classification: 'critical', urgency: 1 },
        { label: 'ST depression', nextStep: 'step-st-depression' },
        { label: 'ST elevation with reciprocal depression', nextStep: 'step-stemi', classification: 'life_threatening', urgency: 1 },
      ],
      clinicalPearl: 'New ST elevation with symptoms = STEMI until proven otherwise',
    },
    {
      id: 'step-7-t-wave',
      question: 'Are T waves normal?',
      helpText: 'T waves should be upright in I, II, V4-V6; inverted in aVR; variable in III, aVL, V1',
      options: [
        { label: 'Normal T waves', nextStep: 'step-8-qt' },
        { label: 'T wave inversions (new or dynamic)', nextStep: 'step-t-inversion' },
        { label: 'Hyperacute T waves', nextStep: 'step-hyperacute-t', classification: 'critical', urgency: 1 },
        { label: 'Peaked T waves', nextStep: 'step-peaked-t' },
        { label: 'Flattened T waves', nextStep: 'step-flat-t' },
      ],
    },
    {
      id: 'step-8-qt',
      question: 'What is the corrected QT interval (QTc)?',
      helpText: 'Use Bazett formula: QTc = QT / sqrt(RR). Normal: < 450 ms (men), < 460 ms (women)',
      options: [
        { label: 'Normal QTc', nextStep: 'step-9-axis' },
        { label: 'Prolonged QTc (> 500 ms)', nextStep: 'step-long-qt', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'Borderline prolonged (450-500 ms)', nextStep: 'step-borderline-qt' },
        { label: 'Short QTc (< 350 ms)', nextStep: 'step-short-qt' },
      ],
    },
    {
      id: 'step-9-axis',
      question: 'What is the QRS axis?',
      helpText: 'Normal: -30 to +90 degrees. Check leads I and aVF for quick assessment',
      options: [
        { label: 'Normal axis (-30 to +90)', nextStep: 'step-10-final' },
        { label: 'Left axis deviation (< -30)', nextStep: 'step-lad' },
        { label: 'Right axis deviation (> +90)', nextStep: 'step-rad' },
        { label: 'Extreme axis deviation', nextStep: 'step-extreme-axis' },
      ],
    },
    {
      id: 'step-10-final',
      question: 'Any other abnormalities noted?',
      helpText: 'Check for voltage criteria, Q waves, U waves, artifact',
      options: [
        { label: 'No other abnormalities', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
        { label: 'Pathological Q waves', nextStep: 'step-q-waves' },
        { label: 'Voltage abnormalities (LVH/RVH criteria)', nextStep: 'step-voltage' },
        { label: 'Other findings', nextStep: 'step-other' },
      ],
    },
    // Bradycardia pathway
    {
      id: 'step-bradycardia',
      question: 'Is the patient symptomatic?',
      helpText: 'Symptoms: hypotension, altered mental status, chest pain, heart failure signs',
      redFlagTrigger: true,
      options: [
        { label: 'Yes - Symptomatic bradycardia', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'ACLS bradycardia algorithm' },
        { label: 'No - Asymptomatic', nextStep: 'step-bradycardia-type' },
      ],
    },
    {
      id: 'step-bradycardia-type',
      question: 'What type of bradycardia?',
      helpText: 'Identify the rhythm mechanism',
      options: [
        { label: 'Sinus bradycardia', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Junctional rhythm', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'AV block (any degree)', nextStep: 'step-av-block' },
        { label: 'Sick sinus syndrome pattern', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
      ],
    },
    // Tachycardia pathway
    {
      id: 'step-tachycardia',
      question: 'Is the QRS narrow (< 120 ms) or wide (>= 120 ms)?',
      helpText: 'This is the critical first branch in tachycardia evaluation',
      options: [
        { label: 'Narrow QRS tachycardia', nextStep: 'step-narrow-tachy' },
        { label: 'Wide QRS tachycardia', nextStep: 'step-wide-tachy' },
      ],
    },
    {
      id: 'step-narrow-tachy',
      question: 'Is the rhythm regular or irregular?',
      helpText: 'Regularity helps differentiate SVT types',
      options: [
        { label: 'Regular narrow complex tachycardia', nextStep: 'step-regular-svt' },
        { label: 'Irregular narrow complex tachycardia', nextStep: 'step-irregular-svt' },
      ],
    },
    {
      id: 'step-regular-svt',
      question: 'Are P waves visible?',
      helpText: 'Look for P waves before, during, or after QRS',
      options: [
        { label: 'P waves before QRS (sinus tachycardia)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'No visible P waves', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Consider AVNRT/AVRT' },
        { label: 'Flutter waves (sawtooth)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Atrial flutter' },
        { label: 'Retrograde P waves after QRS', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Consider AVRT' },
      ],
    },
    {
      id: 'step-irregular-svt',
      question: 'What pattern of irregularity?',
      helpText: 'Characterize the irregular rhythm',
      options: [
        { label: 'Irregularly irregular, no P waves', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Atrial fibrillation' },
        { label: 'Irregular with varying P morphology', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Multifocal atrial tachycardia' },
        { label: 'Variable RR with flutter waves', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Atrial flutter with variable block' },
      ],
    },
    {
      id: 'step-wide-tachy',
      question: 'Is the patient hemodynamically stable?',
      helpText: 'Check BP, perfusion, mental status, chest pain',
      redFlagTrigger: true,
      options: [
        { label: 'Unstable - Immediate intervention needed', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Synchronized cardioversion' },
        { label: 'Stable - Time for evaluation', nextStep: 'step-wide-tachy-eval' },
      ],
    },
    {
      id: 'step-wide-tachy-eval',
      question: 'What is the most likely etiology?',
      helpText: 'Assume VT until proven otherwise in uncertain cases',
      options: [
        { label: 'Known SVT with aberrancy', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'Ventricular tachycardia likely', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Treat as VT' },
        { label: 'Pre-excited AF (irregular wide)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Avoid AV nodal blockers' },
        { label: 'Uncertain - assume VT', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Treat as VT' },
      ],
    },
    // Irregular rhythm pathway
    {
      id: 'step-irregular',
      question: 'What type of irregularity?',
      helpText: 'Pattern recognition is key',
      options: [
        { label: 'Irregularly irregular (chaotic)', nextStep: 'step-afib-eval' },
        { label: 'Occasional irregular beats', nextStep: 'step-ectopy' },
        { label: 'Grouped beating pattern', nextStep: 'step-grouped' },
      ],
    },
    {
      id: 'step-afib-eval',
      question: 'Confirm atrial fibrillation findings',
      helpText: 'AF: irregular RR, absent P waves, fibrillatory baseline',
      options: [
        { label: 'Classic AF pattern confirmed', nextStep: 'step-afib-rate' },
        { label: 'AF with RVR (rate > 110)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'AF with slow ventricular response', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Evaluate for AV nodal disease' },
        { label: 'AF with wide QRS', nextStep: 'step-afib-wide' },
      ],
    },
    {
      id: 'step-afib-rate',
      question: 'What is the ventricular rate in AF?',
      helpText: 'Rate control target varies by setting',
      options: [
        { label: '< 60 bpm', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Evaluate for excessive AV node blockade' },
        { label: '60-110 bpm (controlled)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: '> 110 bpm (uncontrolled)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Rate control needed' },
      ],
    },
    {
      id: 'step-afib-wide',
      question: 'Evaluate wide QRS in AF',
      helpText: 'Wide QRS in AF can indicate BBB, aberrancy, or pre-excitation',
      redFlagTrigger: true,
      options: [
        { label: 'Typical BBB pattern', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'Variable QRS width (pre-excited AF)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'AVOID AV nodal blockers' },
        { label: 'Polymorphic wide complexes', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Consider torsades' },
      ],
    },
    // AV Block pathway
    {
      id: 'step-av-block',
      question: 'What degree of AV block?',
      helpText: 'Identify the AV conduction abnormality',
      options: [
        { label: 'First degree (prolonged PR, all P conducted)', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Second degree Mobitz I (Wenckebach)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Second degree Mobitz II', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'High risk of progression' },
        { label: 'Third degree (complete heart block)', nextStep: 'step-chb-escape' },
        { label: 'High-grade AV block (2:1 or 3:1)', nextStep: 'RESULT', classification: 'critical', urgency: 1 },
      ],
    },
    {
      id: 'step-chb-escape',
      question: 'What is the escape rhythm in complete heart block?',
      helpText: 'Narrow escape = junctional (more stable); Wide escape = ventricular (less stable)',
      redFlagTrigger: true,
      options: [
        { label: 'Narrow QRS escape (junctional)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'More stable but still needs pacing' },
        { label: 'Wide QRS escape (ventricular)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'High risk - transcutaneous pacing standby' },
        { label: 'No reliable escape rhythm', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Immediate pacing required' },
      ],
    },
    // ST elevation pathway
    {
      id: 'step-st-elevation',
      question: 'What is the distribution of ST elevation?',
      helpText: 'Territory helps identify culprit vessel',
      redFlagTrigger: true,
      options: [
        { label: 'Anterior (V1-V4)', nextStep: 'step-stemi', classification: 'life_threatening', urgency: 1 },
        { label: 'Inferior (II, III, aVF)', nextStep: 'step-stemi-inferior', classification: 'life_threatening', urgency: 1 },
        { label: 'Lateral (I, aVL, V5-V6)', nextStep: 'step-stemi', classification: 'life_threatening', urgency: 1 },
        { label: 'Diffuse concave ST elevation', nextStep: 'step-pericarditis' },
        { label: 'Localized with reciprocal changes', nextStep: 'step-stemi', classification: 'life_threatening', urgency: 1 },
      ],
    },
    {
      id: 'step-stemi',
      question: 'STEMI identified - Is there ongoing symptoms?',
      helpText: 'Time is myocardium - activate cath lab',
      redFlagTrigger: true,
      options: [
        { label: 'Yes - Active symptoms', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Activate cath lab immediately' },
        { label: 'Symptoms resolved', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Urgent cardiology consult' },
        { label: 'Unknown timing', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Treat as acute' },
      ],
    },
    {
      id: 'step-stemi-inferior',
      question: 'Inferior STEMI - Check for right ventricular involvement',
      helpText: 'Get right-sided leads (V4R). RV infarct changes management',
      redFlagTrigger: true,
      options: [
        { label: 'RV involvement suspected/confirmed', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Avoid nitrates/preload reducers' },
        { label: 'No RV involvement', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Standard STEMI protocol' },
        { label: 'Cannot assess - treat as possible RV', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Caution with preload reducers' },
      ],
    },
    // Additional pathways
    {
      id: 'step-pericarditis',
      question: 'Features suggesting pericarditis?',
      helpText: 'Diffuse ST elevation, PR depression, pleuritic pain, friction rub',
      options: [
        { label: 'Classic pericarditis pattern', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Cardiology consult, echo' },
        { label: 'Uncertain - could be early STEMI', nextStep: 'step-stemi', classification: 'critical', urgency: 1 },
      ],
    },
    {
      id: 'step-st-depression',
      question: 'What pattern of ST depression?',
      helpText: 'Distribution and morphology help with diagnosis',
      options: [
        { label: 'Widespread horizontal/downsloping', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'NSTEMI likely - cardiology consult' },
        { label: 'Isolated to V1-V3', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Consider posterior STEMI - get V7-V9' },
        { label: 'Upsloping ST depression', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Digoxin effect pattern', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
      ],
    },
    {
      id: 'step-hyperacute-t',
      question: 'Hyperacute T waves identified - clinical context?',
      helpText: 'Tall, broad, symmetric T waves can be earliest STEMI sign',
      redFlagTrigger: true,
      options: [
        { label: 'Chest pain with hyperacute T', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Treat as evolving STEMI' },
        { label: 'Post-hyperkalemia correction', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'Uncertain etiology', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Serial ECGs, cardiology consult' },
      ],
    },
    {
      id: 'step-peaked-t',
      question: 'Peaked T waves - check potassium',
      helpText: 'Tall, narrow, tented T waves suggest hyperkalemia',
      redFlagTrigger: true,
      options: [
        { label: 'Known hyperkalemia', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Calcium, shift therapy, elimination' },
        { label: 'K+ unknown - checking', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'STAT potassium' },
        { label: 'Normal K+ - other cause', nextStep: 'step-7-t-wave' },
      ],
    },
    {
      id: 'step-t-inversion',
      question: 'T wave inversion pattern',
      helpText: 'New T inversions may indicate ischemia, especially if deep and symmetric',
      options: [
        { label: 'Deep symmetric T inversions (Wellens)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'LAD lesion likely - cardiology urgent' },
        { label: 'Diffuse T inversions with long QT', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Consider CNS event, cardiomyopathy' },
        { label: 'Strain pattern (asymmetric)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Nonspecific T changes', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
      ],
    },
    {
      id: 'step-long-qt',
      question: 'QTc > 500 ms - Evaluate cause',
      helpText: 'High risk of torsades de pointes',
      redFlagTrigger: true,
      options: [
        { label: 'Drug-induced (known QT-prolonging agent)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Stop offending drug, correct electrolytes' },
        { label: 'Electrolyte abnormality suspected', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'STAT Mg, K, Ca' },
        { label: 'Congenital LQTS suspected', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Cardiology referral, genetics' },
        { label: 'Acute ischemia context', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Treat underlying ischemia' },
      ],
    },
    {
      id: 'step-borderline-qt',
      question: 'Borderline QTc (450-500 ms)',
      helpText: 'Monitor and reassess, identify reversible causes',
      options: [
        { label: 'On QT-prolonging medications', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Review medications, monitor' },
        { label: 'Electrolytes normal, no medications', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'With other concerning features', nextStep: 'step-long-qt' },
      ],
    },
    {
      id: 'step-short-qt',
      question: 'Short QTc (< 350 ms)',
      helpText: 'Rare but associated with arrhythmia risk',
      options: [
        { label: 'Hypercalcemia context', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Treat hypercalcemia' },
        { label: 'Digoxin toxicity suspected', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Check digoxin level' },
        { label: 'Possible congenital short QT', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Cardiology referral' },
      ],
    },
    // Additional nodes for completeness
    {
      id: 'step-ectopy',
      question: 'What type of ectopic beats?',
      helpText: 'Characterize the premature beats',
      options: [
        { label: 'Occasional PACs', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
        { label: 'Occasional PVCs (uniform)', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Frequent PVCs (> 10%)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Cardiology evaluation' },
        { label: 'Multiform PVCs', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'R on T phenomenon', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'High risk of VT/VF' },
      ],
    },
    {
      id: 'step-regularly-irregular',
      question: 'What regularly irregular pattern?',
      helpText: 'Identify the pattern of regularity within irregularity',
      options: [
        { label: 'Bigeminy pattern', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Trigeminy pattern', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Second degree AV block pattern', nextStep: 'step-av-block' },
        { label: 'Sinus arrhythmia (respiratory variation)', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
      ],
    },
    {
      id: 'step-grouped',
      question: 'Grouped beating pattern identified',
      helpText: 'Grouped beats suggest Wenckebach or other patterns',
      options: [
        { label: 'Progressive PR prolongation (Wenckebach)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Fixed PR with dropped beats', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Mobitz II' },
        { label: 'PAC/PVC bigeminy or trigeminy', nextStep: 'step-ectopy' },
      ],
    },
    {
      id: 'step-no-p-waves',
      question: 'No P waves visible - what is the rhythm?',
      helpText: 'Absent P waves with different rhythms',
      options: [
        { label: 'Irregular - likely AF', nextStep: 'step-afib-eval' },
        { label: 'Regular, narrow QRS - junctional', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Regular, wide QRS - VT or accelerated idioventricular', nextStep: 'step-wide-tachy' },
        { label: 'Fine/coarse baseline - AF or flutter', nextStep: 'step-irregular-svt' },
      ],
    },
    {
      id: 'step-abnormal-p',
      question: 'Abnormal P wave morphology',
      helpText: 'P wave changes suggest atrial abnormality',
      options: [
        { label: 'P mitrale (wide, notched) - LAE', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'P pulmonale (tall, peaked) - RAE', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Varying P morphology - wandering pacemaker', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Inverted P in inferior leads - ectopic atrial', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
      ],
    },
    {
      id: 'step-short-pr',
      question: 'Short PR interval (< 120 ms)',
      helpText: 'May indicate pre-excitation or junctional rhythm',
      options: [
        { label: 'Delta wave present (WPW)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'EP referral, avoid AV nodal blockers if tachycardia' },
        { label: 'No delta wave, normal QRS', nextStep: 'RESULT', classification: 'borderline', urgency: 4, action: 'Consider Lown-Ganong-Levine' },
        { label: 'Junctional rhythm', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
      ],
    },
    {
      id: 'step-prolonged-pr',
      question: 'Prolonged PR (> 200 ms)',
      helpText: 'First degree AV block',
      options: [
        { label: 'Isolated finding, asymptomatic', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'With other conduction abnormalities', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Monitor for progression' },
        { label: 'Very prolonged (> 300 ms)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Evaluate for progression' },
      ],
    },
    {
      id: 'step-variable-pr',
      question: 'Variable PR intervals',
      helpText: 'Suggests AV conduction abnormality',
      options: [
        { label: 'Progressive lengthening then drop (Wenckebach)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'No pattern, AV dissociation', nextStep: 'step-chb-escape' },
        { label: 'With changing P morphology', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Wandering pacemaker or MAT' },
      ],
    },
    {
      id: 'step-wide-qrs-moderate',
      question: 'Moderately wide QRS (120-149 ms)',
      helpText: 'Could be bundle branch block or incomplete BBB',
      options: [
        { label: 'RBBB pattern (rsR\' in V1)', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'LBBB pattern (broad R in I, V5-V6)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'LBBB may mask ischemia' },
        { label: 'Nonspecific intraventricular delay', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Possible ventricular rhythm', nextStep: 'step-wide-tachy' },
      ],
    },
    {
      id: 'step-wide-qrs-severe',
      question: 'Very wide QRS (>= 150 ms)',
      helpText: 'Significant conduction abnormality',
      options: [
        { label: 'Classic LBBB or RBBB pattern', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Paced rhythm', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Ventricular rhythm suspected', nextStep: 'step-wide-tachy' },
        { label: 'Hyperkalemia pattern', nextStep: 'step-peaked-t' },
      ],
    },
    {
      id: 'step-flat-t',
      question: 'Flattened T waves',
      helpText: 'Nonspecific but may indicate electrolyte abnormality',
      options: [
        { label: 'With U waves - consider hypokalemia', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Check potassium' },
        { label: 'Isolated finding', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'With ST changes', nextStep: 'step-6-st-segment' },
      ],
    },
    {
      id: 'step-lad',
      question: 'Left axis deviation (< -30 degrees)',
      helpText: 'Common with LVH, LAFB, inferior MI',
      options: [
        { label: 'With LAFB pattern', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'With LBBB', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'With inferior Q waves', nextStep: 'step-q-waves' },
        { label: 'Isolated finding', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
      ],
    },
    {
      id: 'step-rad',
      question: 'Right axis deviation (> +90 degrees)',
      helpText: 'May indicate RVH, LPFB, PE, or normal variant in young',
      options: [
        { label: 'With RVH criteria', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Evaluate for cause of RVH' },
        { label: 'With RBBB', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Clinical concern for PE', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Workup for PE' },
        { label: 'Normal variant (young/thin)', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
      ],
    },
    {
      id: 'step-extreme-axis',
      question: 'Extreme axis deviation (-90 to +/-180)',
      helpText: 'Northwest axis - concerning finding',
      options: [
        { label: 'Ventricular rhythm', nextStep: 'step-wide-tachy' },
        { label: 'Severe RVH/cor pulmonale', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'Lead misplacement', nextStep: 'RESULT', classification: 'borderline', urgency: 4, action: 'Repeat ECG with correct placement' },
        { label: 'Dextrocardia', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
      ],
    },
    {
      id: 'step-q-waves',
      question: 'Pathological Q waves identified',
      helpText: 'Q waves > 40 ms wide or > 25% of R wave height',
      options: [
        { label: 'With ST elevation - acute MI', nextStep: 'step-stemi' },
        { label: 'Old MI pattern (Q waves, no ST change)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Septal Q waves (normal variant)', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
        { label: 'HCM pattern', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Cardiology referral' },
      ],
    },
    {
      id: 'step-voltage',
      question: 'Voltage abnormality type',
      helpText: 'High or low voltage may indicate specific pathology',
      options: [
        { label: 'LVH by voltage criteria', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'RVH by voltage criteria', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Low voltage throughout', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Consider effusion, obesity, COPD, infiltrative' },
        { label: 'Electrical alternans', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Consider tamponade' },
      ],
    },
    {
      id: 'step-other',
      question: 'Other ECG findings',
      helpText: 'Additional abnormalities to consider',
      options: [
        { label: 'Early repolarization pattern', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Brugada pattern', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Cardiology/EP referral' },
        { label: 'Epsilon waves (ARVC)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Cardiology referral' },
        { label: 'Osborn waves (hypothermia)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Check temperature' },
        { label: 'Artifact only', nextStep: 'RESULT', classification: 'borderline', urgency: 4, action: 'Repeat ECG' },
      ],
    },
  ],
  results: {
    'life_threatening': {
      classification: 'life_threatening',
      urgency: 1,
      timeToAction: 'Immediate (seconds to minutes)',
      actions: [
        'Activate emergency response',
        'Prepare for immediate intervention',
        'Cardiology STAT consult',
        'Continuous monitoring',
      ],
      referralCriteria: [
        'All life-threatening findings require immediate specialist involvement',
        'Cath lab activation for STEMI',
        'ICU admission',
      ],
      confidence: 'high',
    },
    'critical': {
      classification: 'critical',
      urgency: 1,
      timeToAction: 'Within 10-30 minutes',
      actions: [
        'Immediate physician evaluation',
        'Cardiology consult',
        'Prepare for potential intervention',
        'Serial ECGs every 15-30 minutes',
      ],
      referralCriteria: [
        'Cardiology consult within 1 hour',
        'Consider ICU or monitored bed',
      ],
      confidence: 'high',
    },
    'abnormal_urgent': {
      classification: 'abnormal_urgent',
      urgency: 2,
      timeToAction: 'Within 1-4 hours',
      actions: [
        'Physician evaluation required',
        'Cardiology consult same day',
        'Additional workup as indicated',
        'Consider telemetry monitoring',
      ],
      referralCriteria: [
        'Cardiology consult within 24 hours',
        'May need admission for observation',
      ],
      confidence: 'moderate',
    },
    'abnormal_stable': {
      classification: 'abnormal_stable',
      urgency: 3,
      timeToAction: 'Within 24-48 hours',
      actions: [
        'Outpatient cardiology referral',
        'Follow-up ECG',
        'Risk factor modification',
      ],
      referralCriteria: [
        'Cardiology appointment within 1-2 weeks',
        'Primary care follow-up',
      ],
      confidence: 'moderate',
    },
    'borderline': {
      classification: 'borderline',
      urgency: 4,
      timeToAction: 'Routine follow-up',
      actions: [
        'Document finding',
        'Clinical correlation',
        'Follow-up as clinically indicated',
      ],
      referralCriteria: [
        'Cardiology referral if symptomatic',
        'Routine follow-up acceptable',
      ],
      confidence: 'high',
    },
    'normal': {
      classification: 'normal',
      urgency: 4,
      timeToAction: 'No urgent action needed',
      actions: [
        'Document normal ECG',
        'Routine care',
      ],
      referralCriteria: [
        'No cardiology referral needed for ECG findings',
        'Refer based on clinical symptoms if present',
      ],
      confidence: 'high',
    },
  },
};

// ============================================================================
// STEMI RECOGNITION ALGORITHM BY TERRITORY
// ============================================================================

export const stemiRecognitionAlgorithm: TriageAlgorithm = {
  id: 'stemi-recognition',
  name: 'STEMI Recognition Algorithm by Territory',
  description: 'Systematic approach to identifying STEMI by coronary territory',
  applicableTo: ['emergency_department', 'icu'],
  version: '1.0.0',
  lastUpdated: '2025-01-17',
  references: [
    'Fourth Universal Definition of MI 2018',
    'ACC/AHA STEMI Guidelines 2023',
  ],
  steps: [
    {
      id: 'stemi-initial',
      question: 'Is there ST elevation meeting criteria?',
      helpText: '>= 1mm in 2 contiguous limb leads or >= 2mm in 2 contiguous precordial leads',
      redFlagTrigger: true,
      options: [
        { label: 'Yes - Criteria met', nextStep: 'stemi-territory' },
        { label: 'Borderline elevation', nextStep: 'stemi-borderline' },
        { label: 'No ST elevation', nextStep: 'stemi-other-findings' },
      ],
    },
    {
      id: 'stemi-territory',
      question: 'Which leads show ST elevation?',
      helpText: 'Identify the coronary territory',
      redFlagTrigger: true,
      options: [
        { label: 'V1-V4 (Anterior)', nextStep: 'stemi-anterior', classification: 'life_threatening', urgency: 1 },
        { label: 'II, III, aVF (Inferior)', nextStep: 'stemi-inferior', classification: 'life_threatening', urgency: 1 },
        { label: 'I, aVL, V5-V6 (Lateral)', nextStep: 'stemi-lateral', classification: 'life_threatening', urgency: 1 },
        { label: 'V1-V2 depression (Posterior)', nextStep: 'stemi-posterior', classification: 'life_threatening', urgency: 1 },
        { label: 'Multiple territories', nextStep: 'stemi-extensive', classification: 'life_threatening', urgency: 1 },
      ],
    },
    {
      id: 'stemi-anterior',
      question: 'Anterior STEMI - Extent assessment',
      helpText: 'LAD territory - high risk for LV dysfunction',
      redFlagTrigger: true,
      clinicalPearl: 'Anterior STEMI has highest mortality; early reperfusion critical',
      options: [
        { label: 'Septal (V1-V2)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Proximal LAD, high risk', referral: 'STEMI activation' },
        { label: 'Anterior (V3-V4)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Mid LAD territory', referral: 'STEMI activation' },
        { label: 'Anterolateral (V3-V6, I, aVL)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Large anterior - proximal LAD or LM', referral: 'STEMI activation' },
        { label: 'Extensive anterior (V1-V6, I, aVL)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Very high risk - possible LM involvement', referral: 'STEMI activation' },
      ],
    },
    {
      id: 'stemi-inferior',
      question: 'Inferior STEMI - Check for complications',
      helpText: 'RCA or LCx territory; check for RV involvement',
      redFlagTrigger: true,
      clinicalPearl: 'Always get V4R; RV infarct contraindicates nitrates',
      options: [
        { label: 'Isolated inferior (II, III, aVF)', nextStep: 'stemi-inferior-rv', classification: 'life_threatening', urgency: 1 },
        { label: 'Inferior + Lateral (add I, aVL, V5-V6)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'LCx territory likely', referral: 'STEMI activation' },
        { label: 'Inferior + Posterior (V1-V3 depression)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'RCA with posterior extension', referral: 'STEMI activation' },
      ],
    },
    {
      id: 'stemi-inferior-rv',
      question: 'Right ventricular involvement?',
      helpText: 'Check V4R for ST elevation >= 1mm',
      redFlagTrigger: true,
      options: [
        { label: 'V4R shows ST elevation - RV infarct', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'AVOID preload reducers (nitrates, diuretics)', referral: 'STEMI activation' },
        { label: 'V4R normal - no RV involvement', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Standard inferior STEMI management', referral: 'STEMI activation' },
        { label: 'V4R not obtained - assume possible RV', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Caution with preload reducers', referral: 'STEMI activation' },
      ],
    },
    {
      id: 'stemi-lateral',
      question: 'Lateral STEMI assessment',
      helpText: 'LCx or diagonal territory',
      redFlagTrigger: true,
      options: [
        { label: 'High lateral (I, aVL)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'First diagonal or high LCx', referral: 'STEMI activation' },
        { label: 'Low lateral (V5-V6)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'LCx territory', referral: 'STEMI activation' },
        { label: 'Anterolateral', nextStep: 'stemi-anterior' },
      ],
    },
    {
      id: 'stemi-posterior',
      question: 'Posterior STEMI (isolated ST depression V1-V3)',
      helpText: 'Get posterior leads V7-V9',
      redFlagTrigger: true,
      clinicalPearl: 'Posterior STEMI is a STEMI equivalent - treat as STEMI',
      options: [
        { label: 'V7-V9 show ST elevation', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Confirmed posterior STEMI', referral: 'STEMI activation' },
        { label: 'V7-V9 not available but high suspicion', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Treat as STEMI', referral: 'STEMI activation' },
        { label: 'V7-V9 normal', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Consider NSTEMI', referral: 'Cardiology consult' },
      ],
    },
    {
      id: 'stemi-extensive',
      question: 'Multi-territory STEMI',
      helpText: 'Very high risk - possible LM or proximal LAD',
      redFlagTrigger: true,
      options: [
        { label: 'Anterior + inferior (wraparound LAD)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Large territory at risk', referral: 'STEMI activation' },
        { label: 'Diffuse ST elevation (pericarditis vs multivessel)', nextStep: 'stemi-pericarditis-vs-mi', classification: 'life_threatening', urgency: 1 },
        { label: 'ST elevation with ST depression reciprocal', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Classic STEMI pattern', referral: 'STEMI activation' },
      ],
    },
    {
      id: 'stemi-pericarditis-vs-mi',
      question: 'Differentiate pericarditis from STEMI',
      helpText: 'Key features help distinguish',
      options: [
        { label: 'Concave ST, PR depression, diffuse', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Likely pericarditis' },
        { label: 'Convex ST, reciprocal changes, territorial', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'STEMI', referral: 'STEMI activation' },
        { label: 'Uncertain - high clinical suspicion for MI', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Treat as STEMI', referral: 'STEMI activation' },
      ],
    },
    {
      id: 'stemi-borderline',
      question: 'Borderline ST elevation assessment',
      helpText: 'Serial ECGs critical; compare to prior',
      options: [
        { label: 'Dynamic changes on serial ECG', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Evolving STEMI', referral: 'Cardiology STAT' },
        { label: 'No prior ECG for comparison', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Treat with high suspicion', referral: 'Cardiology STAT' },
        { label: 'Unchanged from prior, asymptomatic', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Outpatient follow-up' },
      ],
    },
    {
      id: 'stemi-other-findings',
      question: 'Other ischemic findings without ST elevation?',
      helpText: 'STEMI equivalents to recognize',
      options: [
        { label: 'New LBBB with symptoms', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'STEMI equivalent', referral: 'STEMI activation' },
        { label: 'Hyperacute T waves', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Early STEMI', referral: 'Cardiology STAT' },
        { label: 'De Winter pattern (upsloping ST depression + tall T)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'LAD occlusion', referral: 'STEMI activation' },
        { label: 'Wellens syndrome (deep T inversions V2-V3)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Critical LAD stenosis', referral: 'Cardiology STAT' },
        { label: 'ST depression with aVR elevation', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'LM or severe 3VD', referral: 'Cardiology STAT' },
      ],
    },
  ],
  results: {
    'stemi_confirmed': {
      classification: 'life_threatening',
      urgency: 1,
      timeToAction: 'Door-to-balloon < 90 min',
      actions: [
        'Activate cath lab',
        'Aspirin 325mg',
        'Anticoagulation per protocol',
        'P2Y12 inhibitor',
        'Consider morphine for pain',
        'IV access, O2 if hypoxic',
      ],
      referralCriteria: [
        'STEMI activation',
        'Transfer to PCI center if no on-site cath lab',
      ],
      confidence: 'high',
    },
    'stemi_equivalent': {
      classification: 'life_threatening',
      urgency: 1,
      timeToAction: 'Immediate',
      actions: [
        'Treat as STEMI',
        'Cardiology STAT consultation',
        'Consider cath lab activation',
      ],
      referralCriteria: [
        'Cardiology within minutes',
        'Cath lab based on clinical assessment',
      ],
      confidence: 'moderate',
    },
  },
};

// ============================================================================
// ARRHYTHMIA TRIAGE ALGORITHM
// ============================================================================

export const arrhythmiaTriageAlgorithm: TriageAlgorithm = {
  id: 'arrhythmia-triage',
  name: 'Arrhythmia Triage Algorithm',
  description: 'Systematic approach to arrhythmia identification and triage',
  applicableTo: ['emergency_department', 'icu', 'ward', 'primary_care'],
  version: '1.0.0',
  lastUpdated: '2025-01-17',
  references: [
    'ACC/AHA/HRS Supraventricular Tachycardia Guidelines 2023',
    'ACC/AHA/HRS Ventricular Arrhythmias Guidelines 2024',
    'ACLS Provider Manual 2024',
  ],
  steps: [
    {
      id: 'arr-stability',
      question: 'Is the patient hemodynamically stable?',
      helpText: 'Check: BP, mental status, chest pain, signs of shock',
      redFlagTrigger: true,
      options: [
        { label: 'Unstable - hypotension, altered mental status, shock', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Immediate cardioversion' },
        { label: 'Stable - time for evaluation', nextStep: 'arr-rate' },
      ],
    },
    {
      id: 'arr-rate',
      question: 'What is the heart rate?',
      helpText: 'Categorize by rate',
      options: [
        { label: '< 50 bpm - Bradyarrhythmia', nextStep: 'arr-brady-type' },
        { label: '50-100 bpm - Normal rate', nextStep: 'arr-normal-rate' },
        { label: '> 100 bpm - Tachyarrhythmia', nextStep: 'arr-tachy-type' },
      ],
    },
    {
      id: 'arr-brady-type',
      question: 'Type of bradyarrhythmia?',
      helpText: 'Identify the bradycardia mechanism',
      options: [
        { label: 'Sinus bradycardia', nextStep: 'arr-sinus-brady' },
        { label: 'AV block', nextStep: 'arr-av-block' },
        { label: 'Junctional rhythm', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Idioventricular rhythm', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'Sinus arrest/pause', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
      ],
    },
    {
      id: 'arr-sinus-brady',
      question: 'Sinus bradycardia evaluation',
      helpText: 'Determine if physiologic or pathologic',
      options: [
        { label: 'Athlete, sleeping, or vagal tone', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
        { label: 'On rate-lowering medications', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Symptomatic or unexplained', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'With pauses > 3 seconds', nextStep: 'RESULT', classification: 'critical', urgency: 1 },
      ],
    },
    {
      id: 'arr-av-block',
      question: 'Degree of AV block?',
      helpText: 'Higher degree = higher risk',
      redFlagTrigger: true,
      options: [
        { label: 'First degree AV block', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Second degree Mobitz I (Wenckebach)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Second degree Mobitz II', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'High risk of progression - pacing standby' },
        { label: '2:1 AV block', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Cannot distinguish Mobitz I vs II' },
        { label: 'High-grade AV block (3:1 or higher)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Pacing likely needed' },
        { label: 'Third degree (complete) AV block', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Pacing required' },
      ],
    },
    {
      id: 'arr-normal-rate',
      question: 'Arrhythmia at normal rate?',
      helpText: 'Rhythm abnormalities with normal rate',
      options: [
        { label: 'Sinus rhythm with ectopy', nextStep: 'arr-ectopy' },
        { label: 'Atrial fibrillation with controlled rate', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Junctional rhythm', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Ventricular paced rhythm', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
      ],
    },
    {
      id: 'arr-ectopy',
      question: 'Type and frequency of ectopy?',
      helpText: 'Evaluate premature beat burden',
      options: [
        { label: 'Rare PACs (< 1%)', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
        { label: 'Frequent PACs', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Rare uniform PVCs', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Frequent PVCs (> 10%)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Couplets or triplets', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'Multiform PVCs', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'R on T phenomenon', nextStep: 'RESULT', classification: 'critical', urgency: 1 },
      ],
    },
    {
      id: 'arr-tachy-type',
      question: 'QRS width in tachycardia?',
      helpText: 'Narrow vs wide QRS is critical branch point',
      options: [
        { label: 'Narrow QRS (< 120 ms)', nextStep: 'arr-narrow-tachy' },
        { label: 'Wide QRS (>= 120 ms)', nextStep: 'arr-wide-tachy' },
      ],
    },
    {
      id: 'arr-narrow-tachy',
      question: 'Narrow complex tachycardia type?',
      helpText: 'Regular vs irregular, P wave morphology',
      options: [
        { label: 'Regular, P before QRS - sinus tachycardia', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Treat underlying cause' },
        { label: 'Regular, no visible P - AVNRT likely', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Vagal maneuvers, adenosine' },
        { label: 'Regular, retrograde P - AVRT likely', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Vagal maneuvers, adenosine' },
        { label: 'Flutter waves (sawtooth)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Rate control, anticoagulation' },
        { label: 'Irregularly irregular, no P - AF', nextStep: 'arr-af-management' },
        { label: 'Irregular, varying P morphology - MAT', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Treat underlying pulmonary disease' },
      ],
    },
    {
      id: 'arr-af-management',
      question: 'Atrial fibrillation assessment',
      helpText: 'Rate control, rhythm control, anticoagulation decision',
      options: [
        { label: 'New onset AF (< 48 hours)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Consider cardioversion, anticoagulation' },
        { label: 'AF with RVR (rate > 110)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Rate control priority' },
        { label: 'AF rate controlled, anticoagulated', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'AF with slow response (< 60)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Evaluate for AV node disease' },
        { label: 'AF with wide QRS', nextStep: 'arr-afib-wide' },
      ],
    },
    {
      id: 'arr-afib-wide',
      question: 'Wide QRS in atrial fibrillation',
      helpText: 'BBB vs pre-excitation',
      redFlagTrigger: true,
      options: [
        { label: 'Consistent wide QRS (BBB pattern)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2 },
        { label: 'Variable QRS width - pre-excited AF', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'AVOID AV nodal blockers (digoxin, verapamil, diltiazem, adenosine)' },
      ],
    },
    {
      id: 'arr-wide-tachy',
      question: 'Wide complex tachycardia evaluation',
      helpText: 'VT until proven otherwise',
      redFlagTrigger: true,
      clinicalPearl: 'When in doubt, treat as VT',
      options: [
        { label: 'Regular, monomorphic - VT likely', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Treat as VT (amiodarone, cardioversion)' },
        { label: 'Polymorphic (torsades pattern)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Magnesium, defibrillation if unstable' },
        { label: 'Known SVT with BBB', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Treat as SVT' },
        { label: 'Irregular wide (pre-excited AF)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Procainamide or cardioversion' },
        { label: 'Pacemaker-mediated tachycardia', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Magnet application, device interrogation' },
      ],
    },
  ],
  results: {
    'arrhythmia_managed': {
      classification: 'abnormal_stable',
      urgency: 3,
      timeToAction: 'Within 24 hours',
      actions: [
        'Outpatient cardiology/EP referral',
        'Risk stratification',
        'Consider Holter monitoring',
      ],
      referralCriteria: [
        'EP referral for ablation consideration',
        'Follow-up in 1-2 weeks',
      ],
      confidence: 'moderate',
    },
  },
};

// ============================================================================
// QT ASSESSMENT ALGORITHM
// ============================================================================

export const qtAssessmentAlgorithm: TriageAlgorithm = {
  id: 'qt-assessment',
  name: 'QT Assessment Algorithm',
  description: 'Comprehensive QT interval evaluation and risk stratification',
  applicableTo: ['emergency_department', 'icu', 'ward', 'primary_care'],
  version: '1.0.0',
  lastUpdated: '2025-01-17',
  references: [
    'HRS/EHRA/APHRS Expert Consensus on Long QT Syndrome 2022',
    'AHA Scientific Statement on Drug-Induced QT Prolongation 2020',
  ],
  steps: [
    {
      id: 'qt-measure',
      question: 'What is the measured QTc?',
      helpText: 'Use Bazett formula (QTc = QT/sqrt(RR)). Measure in lead II or V5',
      options: [
        { label: '< 350 ms (Short QT)', nextStep: 'qt-short' },
        { label: '350-440 ms (Normal)', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
        { label: '440-460 ms (Borderline - men)', nextStep: 'qt-borderline' },
        { label: '440-470 ms (Borderline - women)', nextStep: 'qt-borderline' },
        { label: '460-500 ms (Prolonged)', nextStep: 'qt-prolonged' },
        { label: '> 500 ms (Severely prolonged)', nextStep: 'qt-severe', classification: 'critical', urgency: 1 },
      ],
    },
    {
      id: 'qt-short',
      question: 'Short QT syndrome evaluation',
      helpText: 'QTc < 350 ms is rare but dangerous',
      options: [
        { label: 'Hypercalcemia', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Treat hypercalcemia' },
        { label: 'Digoxin effect', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Check digoxin level' },
        { label: 'Acidosis', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Treat acidosis' },
        { label: 'Possible congenital SQTS', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'EP referral' },
        { label: 'Catecholamine surge', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
      ],
    },
    {
      id: 'qt-borderline',
      question: 'Borderline QT prolongation context',
      helpText: 'Risk depends on clinical context and trends',
      options: [
        { label: 'On QT-prolonging drug', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Monitor, review necessity' },
        { label: 'Electrolyte abnormality', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Correct electrolytes' },
        { label: 'Family history of sudden death', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Genetics referral' },
        { label: 'No risk factors', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
      ],
    },
    {
      id: 'qt-prolonged',
      question: 'Prolonged QT (460-500 ms) - identify cause',
      helpText: 'Multiple factors can prolong QT',
      redFlagTrigger: true,
      options: [
        { label: 'Drug-induced (review medication list)', nextStep: 'qt-drug-induced' },
        { label: 'Electrolyte abnormality (K, Mg, Ca)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'STAT electrolytes and correction' },
        { label: 'Acute coronary syndrome', nextStep: 'RESULT', classification: 'critical', urgency: 1 },
        { label: 'Bradycardia-induced', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Address bradycardia' },
        { label: 'CNS event (SAH, stroke)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Neuro workup' },
        { label: 'Possible congenital LQTS', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Cardiology/genetics referral' },
      ],
    },
    {
      id: 'qt-drug-induced',
      question: 'Drug-induced QT prolongation management',
      helpText: 'Identify and stop offending agents',
      options: [
        { label: 'Single QT-prolonging drug, QTc < 500', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Consider alternative, monitor' },
        { label: 'Multiple QT-prolonging drugs', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Stop at least one agent' },
        { label: 'QTc increased > 60 ms from baseline', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Stop offending drug immediately' },
        { label: 'With symptoms (syncope, palpitations)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Stop drug, monitor on telemetry' },
      ],
    },
    {
      id: 'qt-severe',
      question: 'Severely prolonged QT (> 500 ms) - URGENT',
      helpText: 'High risk of torsades de pointes',
      redFlagTrigger: true,
      clinicalPearl: 'Magnesium IV even with normal levels, stop all QT-prolonging drugs',
      options: [
        { label: 'With torsades on ECG', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'IV Mg, overdrive pacing, defibrillation if needed' },
        { label: 'Without torsades but symptomatic', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'IV Mg, telemetry, stop drugs' },
        { label: 'Asymptomatic, drug-induced', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Stop all QT drugs, IV Mg, telemetry' },
        { label: 'Known congenital LQTS, on beta-blocker', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Ensure compliance, EP follow-up' },
      ],
    },
  ],
  results: {
    'qt_managed': {
      classification: 'abnormal_stable',
      urgency: 3,
      timeToAction: 'Within 24-48 hours',
      actions: [
        'Review and modify medications',
        'Correct electrolytes',
        'Avoid additional QT-prolonging agents',
        'Follow-up ECG',
      ],
      referralCriteria: [
        'Cardiology if persistent prolongation',
        'Genetics if congenital suspected',
      ],
      confidence: 'moderate',
    },
  },
};

// ============================================================================
// ISCHEMIA VS NORMAL ST ALGORITHM
// ============================================================================

export const ischemiaVsNormalSTAlgorithm: TriageAlgorithm = {
  id: 'ischemia-vs-normal-st',
  name: 'Ischemia vs Normal ST Algorithm',
  description: 'Differentiate ischemic from non-ischemic ST-T changes',
  applicableTo: ['emergency_department', 'icu', 'ward', 'primary_care'],
  version: '1.0.0',
  lastUpdated: '2025-01-17',
  references: [
    'Fourth Universal Definition of MI 2018',
    'ACC/AHA Chest Pain Guidelines 2021',
  ],
  steps: [
    {
      id: 'isch-clinical',
      question: 'What is the clinical presentation?',
      helpText: 'Clinical context is essential for interpretation',
      options: [
        { label: 'Active chest pain/discomfort', nextStep: 'isch-symptoms-active' },
        { label: 'Resolved symptoms', nextStep: 'isch-symptoms-resolved' },
        { label: 'Atypical symptoms (dyspnea, fatigue)', nextStep: 'isch-atypical' },
        { label: 'Asymptomatic (screening ECG)', nextStep: 'isch-asymptomatic' },
      ],
    },
    {
      id: 'isch-symptoms-active',
      question: 'ST segment findings with active symptoms',
      helpText: 'Active symptoms increase pretest probability',
      redFlagTrigger: true,
      options: [
        { label: 'ST elevation meeting criteria', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'STEMI protocol' },
        { label: 'ST depression >= 1mm horizontal/downsloping', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'NSTEMI likely' },
        { label: 'T wave inversions (new/dynamic)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'High-risk ACS' },
        { label: 'Nonspecific ST-T changes', nextStep: 'isch-nonspecific-symptomatic' },
        { label: 'Normal ECG with symptoms', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Serial ECGs, troponin, observe' },
      ],
    },
    {
      id: 'isch-nonspecific-symptomatic',
      question: 'Nonspecific changes with symptoms - risk stratify',
      helpText: 'Use clinical risk factors',
      options: [
        { label: 'High risk (diabetes, prior CAD, multiple risk factors)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Treat as possible ACS' },
        { label: 'Intermediate risk', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Serial ECG/troponin, observation' },
        { label: 'Low risk (young, no risk factors, atypical)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Outpatient workup may be appropriate' },
      ],
    },
    {
      id: 'isch-symptoms-resolved',
      question: 'ECG findings after symptoms resolved',
      helpText: 'Post-ischemic changes may persist',
      options: [
        { label: 'Persistent ST/T abnormalities', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Likely had ischemia, complete workup' },
        { label: 'Dynamic changes (worse with symptoms, better after)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Confirmed ischemia' },
        { label: 'Normal ECG now', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'May still need stress test' },
        { label: 'Wellens pattern T waves', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Critical LAD stenosis - NO stress test' },
      ],
    },
    {
      id: 'isch-atypical',
      question: 'Atypical presentation ECG interpretation',
      helpText: 'Elderly, diabetic, women may have atypical presentation',
      options: [
        { label: 'Any ST/T abnormality with dyspnea', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Consider ACS' },
        { label: 'Normal ECG with atypical symptoms', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Risk stratify clinically' },
        { label: 'New conduction abnormality', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Consider ACS' },
      ],
    },
    {
      id: 'isch-asymptomatic',
      question: 'Asymptomatic ST-T abnormality interpretation',
      helpText: 'Less likely acute ischemia but may indicate chronic CAD',
      options: [
        { label: 'ST elevation - compare to prior', nextStep: 'isch-asymptomatic-ste' },
        { label: 'ST depression or T inversions', nextStep: 'isch-asymptomatic-std' },
        { label: 'Nonspecific changes', nextStep: 'RESULT', classification: 'borderline', urgency: 4, action: 'Note for future comparison' },
        { label: 'Early repolarization pattern', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
      ],
    },
    {
      id: 'isch-asymptomatic-ste',
      question: 'Asymptomatic ST elevation',
      helpText: 'May be normal variant or chronic finding',
      options: [
        { label: 'Early repolarization (J-point elevation, concave)', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
        { label: 'LVH with strain (not true ST elevation)', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Persistent from old MI (aneurysm)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'New compared to prior ECG', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Needs evaluation even if asymptomatic' },
      ],
    },
    {
      id: 'isch-asymptomatic-std',
      question: 'Asymptomatic ST depression or T inversion',
      helpText: 'Chronic changes vs acute process',
      options: [
        { label: 'Consistent with prior ECGs', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'New finding, no symptoms', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3, action: 'Outpatient cardiology referral' },
        { label: 'With digoxin use (digoxin effect)', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'With LVH (strain pattern)', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
      ],
    },
  ],
  results: {
    'ischemia_ruled_out': {
      classification: 'normal',
      urgency: 4,
      timeToAction: 'Routine follow-up',
      actions: [
        'Document normal finding',
        'Risk factor modification',
      ],
      referralCriteria: [
        'No cardiology referral needed for ECG',
      ],
      confidence: 'high',
    },
  },
};

// ============================================================================
// BRADYCARDIA VS TACHYCARDIA ALGORITHM
// ============================================================================

export const bradyTachyAlgorithm: TriageAlgorithm = {
  id: 'brady-tachy-algorithm',
  name: 'Bradycardia vs Tachycardia Algorithm',
  description: 'ACLS-based approach to rate abnormalities',
  applicableTo: ['emergency_department', 'icu', 'ward'],
  version: '1.0.0',
  lastUpdated: '2025-01-17',
  references: [
    'ACLS Provider Manual 2024',
    'AHA Guidelines for CPR and ECC 2020',
  ],
  steps: [
    {
      id: 'bt-initial',
      question: 'What is the heart rate?',
      helpText: 'First assessment',
      options: [
        { label: '< 50 bpm', nextStep: 'bt-bradycardia' },
        { label: '50-100 bpm', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
        { label: '> 100 bpm', nextStep: 'bt-tachycardia' },
      ],
    },
    {
      id: 'bt-bradycardia',
      question: 'Bradycardia - Is patient symptomatic?',
      helpText: 'Symptoms: hypotension, AMS, chest pain, acute HF, shock',
      redFlagTrigger: true,
      options: [
        { label: 'Yes - Symptomatic bradycardia', nextStep: 'bt-brady-symptomatic' },
        { label: 'No - Asymptomatic', nextStep: 'bt-brady-asymptomatic' },
      ],
    },
    {
      id: 'bt-brady-symptomatic',
      question: 'Symptomatic bradycardia - ACLS algorithm',
      helpText: 'Follow ACLS bradycardia with pulse algorithm',
      redFlagTrigger: true,
      options: [
        { label: 'Atropine response likely (sinus or junctional)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Atropine 0.5mg IV, may repeat to 3mg' },
        { label: 'Atropine unlikely to help (Mobitz II, CHB)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Transcutaneous pacing, prepare transvenous' },
        { label: 'Toxicologic cause suspected', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Specific antidote if available' },
      ],
    },
    {
      id: 'bt-brady-asymptomatic',
      question: 'Asymptomatic bradycardia evaluation',
      helpText: 'Identify the type and potential risks',
      options: [
        { label: 'Sinus bradycardia (physiologic)', nextStep: 'RESULT', classification: 'normal', urgency: 4 },
        { label: 'First degree AV block', nextStep: 'RESULT', classification: 'borderline', urgency: 4 },
        { label: 'Mobitz I (Wenckebach)', nextStep: 'RESULT', classification: 'abnormal_stable', urgency: 3 },
        { label: 'Mobitz II (asymptomatic)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Monitor - may need pacing' },
        { label: 'Complete heart block (stable escape)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Will need pacing' },
      ],
    },
    {
      id: 'bt-tachycardia',
      question: 'Tachycardia - Is patient stable?',
      helpText: 'Unstable signs: hypotension, AMS, chest pain, acute HF',
      redFlagTrigger: true,
      options: [
        { label: 'Unstable with pulse', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Synchronized cardioversion' },
        { label: 'Pulseless (VT/VF)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Defibrillation, CPR' },
        { label: 'Stable', nextStep: 'bt-tachy-qrs' },
      ],
    },
    {
      id: 'bt-tachy-qrs',
      question: 'Stable tachycardia - QRS width?',
      helpText: 'Narrow vs wide determines algorithm',
      options: [
        { label: 'Narrow QRS (< 120 ms)', nextStep: 'bt-narrow' },
        { label: 'Wide QRS (>= 120 ms)', nextStep: 'bt-wide' },
      ],
    },
    {
      id: 'bt-narrow',
      question: 'Narrow QRS tachycardia management',
      helpText: 'Regular vs irregular',
      options: [
        { label: 'Regular - try vagal maneuvers first', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Vagal, then adenosine 6-12-12mg IV' },
        { label: 'Irregular (AF likely)', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Rate control (diltiazem, beta-blocker)' },
      ],
    },
    {
      id: 'bt-wide',
      question: 'Wide QRS tachycardia - VT vs SVT?',
      helpText: 'Assume VT if uncertain',
      redFlagTrigger: true,
      clinicalPearl: 'Wide complex + uncertain = treat as VT',
      options: [
        { label: 'Regular, monomorphic (VT likely)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Amiodarone 150mg IV, prep cardioversion' },
        { label: 'Polymorphic (torsades or VF)', nextStep: 'RESULT', classification: 'life_threatening', urgency: 1, action: 'Magnesium, defibrillation' },
        { label: 'Definitely SVT with aberrancy', nextStep: 'RESULT', classification: 'abnormal_urgent', urgency: 2, action: 'Treat as SVT' },
        { label: 'Irregular wide (AF with aberrancy or pre-excitation)', nextStep: 'RESULT', classification: 'critical', urgency: 1, action: 'Avoid AV nodal blockers if WPW possible' },
      ],
    },
  ],
  results: {
    'rate_abnormality_managed': {
      classification: 'abnormal_stable',
      urgency: 3,
      timeToAction: 'As clinically indicated',
      actions: [
        'Continue monitoring',
        'Cardiology follow-up',
        'Evaluate underlying cause',
      ],
      referralCriteria: [
        'Cardiology/EP as indicated by rhythm',
      ],
      confidence: 'moderate',
    },
  },
};

// ============================================================================
// QUICK DECISION TREES
// ============================================================================

export const isECGNormalDecisionTree: DecisionTree = {
  id: 'is-ecg-normal',
  name: 'Is This ECG Normal?',
  question: 'Is This ECG Normal?',
  description: 'Quick Y/N flowchart to determine if ECG is normal',
  applicableTo: ['emergency_department', 'icu', 'ward', 'primary_care'],
  nodes: [
    {
      id: 'rate',
      question: 'Is the heart rate 60-100 bpm?',
      yesPath: 'rhythm',
      noPath: { result: 'no', classification: 'borderline', urgency: 4, action: 'Evaluate rate abnormality', timeframe: 'As indicated' },
      helpText: 'Count R waves in 6 seconds x 10',
    },
    {
      id: 'rhythm',
      question: 'Is the rhythm regular with P waves before each QRS?',
      yesPath: 'pr',
      noPath: { result: 'no', classification: 'abnormal_stable', urgency: 3, action: 'Identify rhythm type', timeframe: 'Within 24h' },
    },
    {
      id: 'pr',
      question: 'Is the PR interval 120-200 ms?',
      yesPath: 'qrs',
      noPath: { result: 'no', classification: 'borderline', urgency: 4, action: 'Evaluate PR abnormality', timeframe: 'Routine' },
    },
    {
      id: 'qrs',
      question: 'Is the QRS < 120 ms?',
      yesPath: 'axis',
      noPath: { result: 'no', classification: 'abnormal_stable', urgency: 3, action: 'Evaluate conduction abnormality', timeframe: 'Within 24h' },
    },
    {
      id: 'axis',
      question: 'Is the axis normal (-30 to +90 degrees)?',
      yesPath: 'st',
      noPath: { result: 'no', classification: 'borderline', urgency: 4, action: 'Note axis deviation', timeframe: 'Routine' },
    },
    {
      id: 'st',
      question: 'Are ST segments isoelectric (at baseline)?',
      yesPath: 't',
      noPath: { result: 'no', classification: 'abnormal_urgent', urgency: 2, action: 'Evaluate ST changes', timeframe: 'Urgent' },
      redFlag: true,
    },
    {
      id: 't',
      question: 'Are T waves upright in I, II, V4-V6?',
      yesPath: 'qt',
      noPath: { result: 'no', classification: 'abnormal_stable', urgency: 3, action: 'Evaluate T wave abnormalities', timeframe: 'Within 24h' },
    },
    {
      id: 'qt',
      question: 'Is QTc < 450 ms (men) or < 460 ms (women)?',
      yesPath: 'final',
      noPath: { result: 'no', classification: 'abnormal_stable', urgency: 3, action: 'Evaluate QT prolongation', timeframe: 'Within 24h' },
    },
    {
      id: 'final',
      question: 'No pathological Q waves, no LVH/RVH voltage criteria?',
      yesPath: { result: 'yes', classification: 'normal', urgency: 4, action: 'Normal ECG - document', timeframe: 'None required' },
      noPath: { result: 'no', classification: 'borderline', urgency: 4, action: 'Note abnormality', timeframe: 'Routine' },
    },
  ],
};

export const needsImmediateCardiologyDecisionTree: DecisionTree = {
  id: 'needs-immediate-cardiology',
  name: 'Does This Need Immediate Cardiology?',
  question: 'Does This ECG Need Immediate Cardiology Consultation?',
  description: 'Quick Y/N flowchart for urgent cardiology referral',
  applicableTo: ['emergency_department', 'icu', 'ward'],
  nodes: [
    {
      id: 'stemi',
      question: 'Is there ST elevation meeting STEMI criteria?',
      yesPath: { result: 'yes', classification: 'life_threatening', urgency: 1, action: 'STEMI activation NOW', timeframe: 'Immediate' },
      noPath: 'unstable',
      redFlag: true,
    },
    {
      id: 'unstable',
      question: 'Is the patient hemodynamically unstable?',
      yesPath: { result: 'yes', classification: 'life_threatening', urgency: 1, action: 'Cardiology STAT', timeframe: 'Immediate' },
      noPath: 'vt',
      redFlag: true,
    },
    {
      id: 'vt',
      question: 'Is there ventricular tachycardia or VF?',
      yesPath: { result: 'yes', classification: 'life_threatening', urgency: 1, action: 'ACLS, Cardiology STAT', timeframe: 'Immediate' },
      noPath: 'chb',
      redFlag: true,
    },
    {
      id: 'chb',
      question: 'Is there complete heart block or high-grade AV block?',
      yesPath: { result: 'yes', classification: 'critical', urgency: 1, action: 'Pacing standby, Cardiology urgent', timeframe: 'Within 30 min' },
      noPath: 'long-qt',
      redFlag: true,
    },
    {
      id: 'long-qt',
      question: 'Is QTc > 500 ms with symptoms or torsades?',
      yesPath: { result: 'yes', classification: 'critical', urgency: 1, action: 'Magnesium, Cardiology urgent', timeframe: 'Within 30 min' },
      noPath: 'nstemi',
      redFlag: true,
    },
    {
      id: 'nstemi',
      question: 'Is there dynamic ST depression or T inversion with chest pain?',
      yesPath: { result: 'yes', classification: 'critical', urgency: 1, action: 'NSTEMI pathway, Cardiology urgent', timeframe: 'Within 1 hour' },
      noPath: 'afib-rvr',
    },
    {
      id: 'afib-rvr',
      question: 'Is there AF with RVR (> 150) not responding to rate control?',
      yesPath: { result: 'yes', classification: 'abnormal_urgent', urgency: 2, action: 'Cardiology consult', timeframe: 'Within 2 hours' },
      noPath: 'preexcitation',
    },
    {
      id: 'preexcitation',
      question: 'Is there evidence of pre-excitation (WPW) with tachycardia?',
      yesPath: { result: 'yes', classification: 'critical', urgency: 1, action: 'Cardiology/EP urgent', timeframe: 'Within 1 hour' },
      noPath: 'final',
      redFlag: true,
    },
    {
      id: 'final',
      question: 'Any other life-threatening findings?',
      yesPath: { result: 'yes', classification: 'critical', urgency: 1, action: 'Cardiology urgent', timeframe: 'Varies' },
      noPath: { result: 'no', classification: 'abnormal_stable', urgency: 3, action: 'May not need immediate cardiology', timeframe: 'Can wait for next business day' },
    },
  ],
};

export const canWaitOutpatientDecisionTree: DecisionTree = {
  id: 'can-wait-outpatient',
  name: 'Can This Wait for Outpatient Follow-up?',
  question: 'Can This ECG Abnormality Wait for Outpatient Follow-up?',
  description: 'Quick Y/N flowchart for outpatient vs urgent evaluation',
  applicableTo: ['emergency_department', 'primary_care', 'outpatient'],
  nodes: [
    {
      id: 'symptoms',
      question: 'Is the patient currently symptomatic?',
      yesPath: { result: 'no', classification: 'abnormal_urgent', urgency: 2, action: 'Evaluate symptoms first', timeframe: 'Now' },
      noPath: 'acute-change',
    },
    {
      id: 'acute-change',
      question: 'Is this a new/changed finding from prior ECG?',
      yesPath: 'significance',
      noPath: 'chronic-stable',
    },
    {
      id: 'significance',
      question: 'Is the new finding potentially significant? (ST changes, new BBB, arrhythmia)',
      yesPath: { result: 'no', classification: 'abnormal_urgent', urgency: 2, action: 'Same-day evaluation recommended', timeframe: 'Today' },
      noPath: 'risk-factors',
    },
    {
      id: 'chronic-stable',
      question: 'Is this a known chronic stable finding?',
      yesPath: { result: 'yes', classification: 'borderline', urgency: 4, action: 'Outpatient follow-up appropriate', timeframe: '1-4 weeks' },
      noPath: 'risk-factors',
    },
    {
      id: 'risk-factors',
      question: 'Does patient have significant cardiac risk factors or history?',
      yesPath: { result: 'maybe', classification: 'abnormal_stable', urgency: 3, action: 'Expedited outpatient (1-2 weeks)', timeframe: '1-2 weeks' },
      noPath: 'low-risk-finding',
    },
    {
      id: 'low-risk-finding',
      question: 'Is the finding low-risk? (isolated axis deviation, minor voltage, sinus bradycardia in athlete)',
      yesPath: { result: 'yes', classification: 'borderline', urgency: 4, action: 'Routine outpatient follow-up', timeframe: '4-8 weeks' },
      noPath: { result: 'maybe', classification: 'abnormal_stable', urgency: 3, action: 'Cardiology within 2 weeks', timeframe: '1-2 weeks' },
    },
  ],
};

// ============================================================================
// CONTEXT-SPECIFIC PROTOCOLS
// ============================================================================

export const emergencyDepartmentECGProtocol: ContextProtocol = {
  id: 'ed-ecg-protocol',
  setting: 'emergency_department',
  name: 'Emergency Department ECG Protocol',
  description: 'Systematic approach to ECG interpretation in the ED setting',
  initialAssessment: [
    'Obtain 12-lead ECG within 10 minutes of arrival for chest pain',
    'Assess patient stability before detailed ECG interpretation',
    'Compare to prior ECG if available in system',
    'Document time of symptom onset',
    'Check for pacemaker/ICD if applicable',
  ],
  triagePriorities: [
    { priority: 1, condition: 'STEMI', action: 'Activate cath lab', timeframe: 'Door-to-balloon < 90 min' },
    { priority: 2, condition: 'Unstable arrhythmia', action: 'ACLS algorithm', timeframe: 'Immediate' },
    { priority: 3, condition: 'High-risk NSTEMI', action: 'Cardiology consult', timeframe: '< 1 hour' },
    { priority: 4, condition: 'Stable arrhythmia', action: 'Rate/rhythm control', timeframe: '< 2 hours' },
    { priority: 5, condition: 'Abnormal but stable', action: 'Complete workup', timeframe: '< 4 hours' },
    { priority: 6, condition: 'Minor abnormalities', action: 'Document, discharge plan', timeframe: 'Before discharge' },
  ],
  escalationCriteria: [
    'Any STEMI or STEMI equivalent',
    'Hemodynamic instability',
    'Ventricular arrhythmias',
    'High-grade AV block',
    'QTc > 500 ms with symptoms',
    'New BBB with chest pain',
    'Pre-excited AF',
  ],
  documentationRequirements: [
    'Time of ECG acquisition',
    'Primary interpretation',
    'Comparison to prior if available',
    'Clinical correlation',
    'Actions taken based on findings',
  ],
  followUpRecommendations: [
    'Serial ECGs for ACS patients (q15-30 min if dynamic)',
    'Post-procedure ECG if intervention performed',
    'Pre-discharge ECG for admitted patients',
    'Clear follow-up instructions for discharged patients',
  ],
};

export const icuECGProtocol: ContextProtocol = {
  id: 'icu-ecg-protocol',
  setting: 'icu',
  name: 'ICU ECG Protocol',
  description: 'ECG monitoring and interpretation in the intensive care setting',
  initialAssessment: [
    'Verify continuous telemetry is functioning',
    'Obtain baseline 12-lead on admission',
    'Note any rhythm abnormalities from transport',
    'Review medication list for pro-arrhythmic drugs',
    'Check electrolytes (K, Mg, Ca)',
  ],
  triagePriorities: [
    { priority: 1, condition: 'New STEMI', action: 'Emergent cardiology, cath lab', timeframe: 'Immediate' },
    { priority: 2, condition: 'Malignant arrhythmia', action: 'ACLS, defibrillator ready', timeframe: 'Immediate' },
    { priority: 3, condition: 'Significant rate change', action: 'Evaluate cause, treat', timeframe: '< 15 min' },
    { priority: 4, condition: 'QTc prolongation', action: 'Review meds, check lytes', timeframe: '< 30 min' },
    { priority: 5, condition: 'New conduction abnormality', action: 'Document, monitor', timeframe: '< 1 hour' },
  ],
  escalationCriteria: [
    'VT/VF',
    'New complete heart block',
    'STEMI equivalent changes',
    'QTc > 500 ms',
    'Asystole/PEA',
    'Severe bradycardia with symptoms',
    'Torsades de pointes',
  ],
  documentationRequirements: [
    'Daily ECG review documented',
    'Any arrhythmia episodes noted with time',
    'Rhythm strip printed for significant events',
    'QTc trending for patients on QT-prolonging drugs',
    'Response to antiarrhythmic therapy',
  ],
  followUpRecommendations: [
    'Daily 12-lead ECG for cardiac ICU patients',
    'Pre and post procedure ECGs',
    'ECG after medication changes affecting conduction',
    'Continuous QTc monitoring for high-risk patients',
  ],
};

export const wardECGProtocol: ContextProtocol = {
  id: 'ward-ecg-protocol',
  setting: 'ward',
  name: 'Ward/Floor ECG Protocol',
  description: 'ECG approach for general medical/surgical ward patients',
  initialAssessment: [
    'Review indication for ECG',
    'Check if patient on telemetry',
    'Compare to admission ECG',
    'Note relevant medications',
    'Assess clinical status',
  ],
  triagePriorities: [
    { priority: 1, condition: 'Acute ischemic changes', action: 'STAT cardiology, transfer to monitored bed', timeframe: 'Immediate' },
    { priority: 2, condition: 'New arrhythmia with symptoms', action: 'Rapid response, cardiology', timeframe: '< 15 min' },
    { priority: 3, condition: 'Rate control needed', action: 'Initiate therapy, notify attending', timeframe: '< 30 min' },
    { priority: 4, condition: 'New conduction abnormality', action: 'Cardiology consult, consider telemetry', timeframe: '< 2 hours' },
    { priority: 5, condition: 'Stable chronic findings', action: 'Document, outpatient follow-up', timeframe: 'Before discharge' },
  ],
  escalationCriteria: [
    'Any STEMI or STEMI equivalent',
    'New sustained ventricular arrhythmia',
    'High-grade AV block',
    'Symptomatic bradycardia not responding to treatment',
    'New AF with RVR and symptoms',
    'Significant QTc prolongation (> 500 ms)',
  ],
  documentationRequirements: [
    'Indication for ECG',
    'Interpretation with comparison to prior',
    'Clinical correlation',
    'Plan based on findings',
    'Communication with primary team',
  ],
  followUpRecommendations: [
    'Repeat ECG if clinical status changes',
    'Pre-discharge ECG if new findings during admission',
    'Clear cardiology follow-up instructions if needed',
    'Medication reconciliation for cardiac drugs',
  ],
};

export const primaryCareECGProtocol: ContextProtocol = {
  id: 'primary-care-ecg-protocol',
  setting: 'primary_care',
  name: 'Primary Care ECG Protocol',
  description: 'ECG interpretation and triage in the outpatient primary care setting',
  initialAssessment: [
    'Identify indication for ECG',
    'Obtain relevant history (symptoms, medications, family history)',
    'Check for prior ECGs in record',
    'Perform with proper technique',
    'Interpret systematically',
  ],
  triagePriorities: [
    { priority: 1, condition: 'Active ischemia suspected', action: 'Call EMS, activate 911', timeframe: 'Immediate' },
    { priority: 2, condition: 'Unstable arrhythmia', action: 'Call EMS, stabilize', timeframe: 'Immediate' },
    { priority: 3, condition: 'High-risk but stable finding', action: 'Same-day cardiology/ED', timeframe: 'Same day' },
    { priority: 4, condition: 'Moderate-risk finding', action: 'Expedited cardiology referral', timeframe: '1-2 weeks' },
    { priority: 5, condition: 'Low-risk abnormality', action: 'Routine cardiology referral', timeframe: '4-8 weeks' },
    { priority: 6, condition: 'Normal ECG', action: 'Document, reassure', timeframe: 'Routine follow-up' },
  ],
  escalationCriteria: [
    'Any finding suggesting acute coronary syndrome',
    'Symptomatic arrhythmia',
    'High-degree AV block',
    'Findings concerning for cardiomyopathy',
    'Pre-syncope/syncope with arrhythmia',
    'Known structural heart disease with new findings',
  ],
  documentationRequirements: [
    'Indication for ECG',
    'Full interpretation',
    'Comparison to prior ECGs',
    'Clinical context and correlation',
    'Plan and referrals',
    'Patient education provided',
  ],
  followUpRecommendations: [
    'Urgent referral for high-risk findings',
    'Expedited referral for moderate-risk findings',
    'Routine cardiology for stable chronic abnormalities',
    'Annual ECG screening for appropriate populations',
    'Pre-procedure ECG for high-risk patients',
  ],
};

// ============================================================================
// AGGREGATED EXPORTS
// ============================================================================

export const allTriageAlgorithms: TriageAlgorithm[] = [
  ecgTriageAlgorithm,
  stemiRecognitionAlgorithm,
  arrhythmiaTriageAlgorithm,
  qtAssessmentAlgorithm,
  ischemiaVsNormalSTAlgorithm,
  bradyTachyAlgorithm,
];

export const allDecisionTrees: DecisionTree[] = [
  isECGNormalDecisionTree,
  needsImmediateCardiologyDecisionTree,
  canWaitOutpatientDecisionTree,
];

export const allContextProtocols: ContextProtocol[] = [
  emergencyDepartmentECGProtocol,
  icuECGProtocol,
  wardECGProtocol,
  primaryCareECGProtocol,
];

// Helper function to get algorithm by ID
export function getTriageAlgorithmById(id: string): TriageAlgorithm | undefined {
  return allTriageAlgorithms.find(alg => alg.id === id);
}

// Helper function to get decision tree by ID
export function getDecisionTreeById(id: string): DecisionTree | undefined {
  return allDecisionTrees.find(tree => tree.id === id);
}

// Helper function to get context protocol by setting
export function getContextProtocolBySetting(setting: ClinicalSetting): ContextProtocol | undefined {
  return allContextProtocols.find(protocol => protocol.setting === setting);
}

// Helper function to get step by ID within an algorithm
export function getTriageStep(algorithm: TriageAlgorithm, stepId: string): TriageStep | undefined {
  return algorithm.steps.find(step => step.id === stepId);
}

// Helper function to navigate decision tree
export function navigateDecisionTree(tree: DecisionTree, nodeId: string, answer: 'yes' | 'no'): string | DecisionOutcome {
  const node = tree.nodes.find(n => n.id === nodeId);
  if (!node) return { result: 'no', classification: 'borderline', urgency: 4, action: 'Node not found', timeframe: 'N/A' };
  return answer === 'yes' ? node.yesPath : node.noPath;
}
