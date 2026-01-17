/**
 * STROKE PROTOCOL - Time-Critical Interventions
 *
 * "Time is Brain" - Every minute of ischemia = 1.9 million neurons lost
 *
 * Designed for resource-limited settings with clear escalation pathways
 *
 * References:
 * - AHA/ASA Acute Ischemic Stroke Guidelines 2019
 * - European Stroke Organisation Guidelines 2021
 * - WHO HEARTS Technical Package
 */

import type { EmergencyProtocol, EmergencyStep, RegionalAdaptation } from './emergency-protocols';

// ============================================================
// STROKE RECOGNITION - FAST & BE-FAST
// ============================================================

export interface StrokeAssessment {
  patientId?: string;
  timestamp: Date;
  lastKnownWell: Date;
  symptoms: StrokeSymptoms;
  fastScore: FASTScore;
  nihssEstimate?: number;
  bloodPressure: { systolic: number; diastolic: number };
  bloodGlucose?: number;
  contraindications: ThrombolysisContraindications;
  strokeType?: 'ischemic' | 'hemorrhagic' | 'tia' | 'mimic' | 'unknown';
}

export interface StrokeSymptoms {
  facialDroop: boolean;
  armWeakness: boolean;
  speechDifficulty: boolean;
  legWeakness: boolean;
  visionChanges: boolean;
  headache: boolean;
  ataxia: boolean;
  vertigo: boolean;
  confusion: boolean;
  sensoryLoss: boolean;
}

export interface FASTScore {
  face: 0 | 1; // 0 = normal, 1 = asymmetry
  arm: 0 | 1; // 0 = normal drift, 1 = drifts down
  speech: 0 | 2; // 0 = normal, 2 = slurred/wrong words
  time: number; // minutes since symptom onset
  total: number;
  interpretation: string;
}

export interface ThrombolysisContraindications {
  absolute: string[];
  relative: string[];
  eligible: boolean;
  reason?: string;
}

// FAST Assessment Tool
export const FAST_ASSESSMENT = {
  id: 'fast-stroke',
  name: 'FAST Stroke Recognition',
  description: 'Face-Arm-Speech-Time screening for stroke',
  components: [
    {
      letter: 'F',
      name: 'Face',
      assessment: 'Ask person to smile',
      positive: 'One side of face droops or is numb',
      score: { normal: 0, abnormal: 1 }
    },
    {
      letter: 'A',
      name: 'Arm',
      assessment: 'Ask person to raise both arms',
      positive: 'One arm drifts downward or cannot be raised',
      score: { normal: 0, abnormal: 1 }
    },
    {
      letter: 'S',
      name: 'Speech',
      assessment: 'Ask person to repeat a simple sentence',
      positive: 'Speech is slurred, uses wrong words, or cannot speak',
      score: { normal: 0, abnormal: 2 }
    },
    {
      letter: 'T',
      name: 'Time',
      assessment: 'Note the time symptoms first appeared',
      action: 'If ANY positive, call emergency services immediately',
      critical: 'Time window for thrombolysis = 4.5 hours from symptom onset'
    }
  ]
};

// BE-FAST (expanded for posterior circulation)
export const BE_FAST_ASSESSMENT = {
  id: 'be-fast-stroke',
  name: 'BE-FAST Stroke Recognition (Expanded)',
  description: 'Includes posterior circulation stroke symptoms',
  components: [
    {
      letter: 'B',
      name: 'Balance',
      assessment: 'Sudden loss of balance or coordination',
      positive: 'Cannot stand or walk, severe dizziness'
    },
    {
      letter: 'E',
      name: 'Eyes',
      assessment: 'Sudden vision changes',
      positive: 'Double vision, vision loss in one or both eyes'
    },
    ...FAST_ASSESSMENT.components
  ]
};

// ============================================================
// TIME WINDOWS - Critical Thresholds
// ============================================================

export const STROKE_TIME_WINDOWS = {
  thrombolysis: {
    standard: {
      window: '0-4.5 hours',
      benefit: 'Highest benefit, NNT = 3-10'
    },
    extended: {
      window: '4.5-9 hours',
      benefit: 'May benefit with perfusion imaging guidance',
      requirement: 'CT perfusion showing salvageable tissue'
    }
  },
  thrombectomy: {
    standard: {
      window: '0-6 hours',
      benefit: 'High benefit for large vessel occlusion'
    },
    extended: {
      window: '6-24 hours',
      benefit: 'May benefit with favorable imaging (DAWN/DEFUSE criteria)',
      requirement: 'CT/MR perfusion showing mismatch'
    }
  },
  doorToNeedle: {
    target: '≤60 minutes',
    ideal: '≤45 minutes',
    metric: 'Door-to-needle time for tPA'
  },
  doorToGroin: {
    target: '≤90 minutes',
    metric: 'Door-to-groin puncture for thrombectomy'
  }
};

// ============================================================
// MAIN STROKE PROTOCOL
// ============================================================

export const ACUTE_STROKE_PROTOCOL: EmergencyProtocol = {
  id: 'acute-stroke-001',
  name: 'Acute Stroke Protocol',
  category: 'cardiac', // Using closest existing category
  severity: 'critical',
  estimatedTime: 60,
  code: 'STROKE-001',
  steps: [
    {
      id: 'stroke-step-001',
      title: 'RECOGNIZE STROKE - FAST/BE-FAST',
      description: 'Rapid stroke recognition using screening tools',
      duration: 60,
      critical: true,
      parameters: {
        fast: ['F - Face drooping', 'A - Arm weakness', 'S - Speech difficulty', 'T - Time to call emergency'],
        beFast: ['B - Balance problem', 'E - Eye/vision changes', '+ FAST criteria']
      },
      actions: [
        'Ask: When did symptoms start? (LAST KNOWN WELL time)',
        'If unsure: When was patient last seen normal?',
        'If wake-up stroke: Use time went to sleep'
      ],
      warning: 'Time of symptom onset is CRITICAL for treatment decisions'
    },
    {
      id: 'stroke-step-002',
      title: 'Activate Stroke Alert',
      description: 'Notify stroke team, prepare for rapid assessment',
      duration: 30,
      critical: true,
      actions: [
        'Call "Stroke Alert" or "Code Stroke"',
        'Notify CT/radiology for immediate scan',
        'Alert pharmacy for tPA preparation',
        'Notify interventional team if large vessel occlusion suspected'
      ]
    },
    {
      id: 'stroke-step-003',
      title: 'ABC Assessment & Stabilization',
      description: 'Secure airway, breathing, circulation',
      duration: 120,
      actions: [
        'Airway: Position, suction if needed, intubation if GCS ≤8',
        'Breathing: Oxygen if SpO2 <94%',
        'Circulation: IV access x2, cardiac monitoring',
        'Position: Head of bed 0-30°'
      ],
      warning: 'Do NOT give supplemental O2 if SpO2 ≥94% (no benefit, possible harm)'
    },
    {
      id: 'stroke-step-004',
      title: 'Check Blood Glucose',
      description: 'Rule out hypoglycemia as stroke mimic',
      duration: 30,
      critical: true,
      parameters: {
        target: '140-180 mg/dL',
        hypoglycemia: '<60 mg/dL → Give D50W, recheck, may explain symptoms',
        hyperglycemia: '>180 mg/dL → Treat with insulin (associated with worse outcomes)'
      },
      tip: 'Hypoglycemia can mimic stroke perfectly - always check!'
    },
    {
      id: 'stroke-step-005',
      title: 'Blood Pressure Management',
      description: 'BP management depends on treatment plan',
      critical: true,
      parameters: {
        ifThrombolysisCandiate: {
          target: '<185/110 mmHg BEFORE tPA',
          postTPA: '<180/105 mmHg for 24 hours',
          treatment: 'Labetalol 10-20mg IV or Nicardipine infusion'
        },
        ifNotThrombolysisCandidate: {
          target: 'Permissive hypertension <220/120 mmHg',
          treat: 'Only treat if >220/120 or end-organ damage'
        },
        hemorrhagicStroke: {
          target: '<140 mmHg systolic',
          treatment: 'Nicardipine infusion preferred'
        }
      },
      warning: 'Dropping BP too fast/too low can extend infarct!'
    },
    {
      id: 'stroke-step-006',
      title: 'NON-CONTRAST CT HEAD - Immediate',
      description: 'Rule out hemorrhage before any treatment',
      duration: 300,
      critical: true,
      parameters: {
        purpose: 'Differentiate ischemic vs hemorrhagic stroke',
        mustRuleOut: ['Intracerebral hemorrhage', 'Subarachnoid hemorrhage', 'Mass lesion'],
        findings: {
          normal: 'May still be ischemic stroke (changes take hours)',
          hyperdense: 'Early ischemic changes, dense vessel sign',
          hemorrhage: 'NO thrombolysis, different management path'
        }
      },
      tip: 'Door-to-CT should be <25 minutes'
    },
    {
      id: 'stroke-step-007',
      title: 'NIHSS Score',
      description: 'National Institutes of Health Stroke Scale',
      parameters: {
        purpose: 'Quantify stroke severity, guide treatment',
        scoring: {
          mild: '1-4 points',
          moderate: '5-15 points',
          moderateSevere: '16-20 points',
          severe: '21-42 points'
        },
        components: [
          'Level of consciousness (0-3)',
          'Best gaze (0-2)',
          'Visual fields (0-3)',
          'Facial palsy (0-3)',
          'Motor arm L/R (0-4 each)',
          'Motor leg L/R (0-4 each)',
          'Limb ataxia (0-2)',
          'Sensory (0-2)',
          'Best language (0-3)',
          'Dysarthria (0-2)',
          'Extinction/inattention (0-2)'
        ]
      },
      tip: 'NIHSS ≥6 suggests large vessel occlusion - consider thrombectomy'
    },
    {
      id: 'stroke-step-008',
      title: 'Thrombolysis Decision - tPA/Alteplase',
      description: 'If ischemic stroke within 4.5 hours, evaluate for tPA',
      critical: true,
      parameters: {
        inclusionCriteria: [
          'Ischemic stroke with measurable deficit',
          'Symptom onset <4.5 hours (or last known well)',
          'Age ≥18 years',
          'CT excludes hemorrhage'
        ],
        absoluteContraindications: [
          'Active internal bleeding',
          'Recent intracranial surgery/trauma (<3 months)',
          'Intracranial hemorrhage on CT',
          'Intracranial neoplasm, AVM, aneurysm',
          'Aortic dissection suspected',
          'Severe uncontrolled hypertension despite treatment'
        ],
        relativeContraindications: [
          'Recent major surgery (<14 days)',
          'GI/GU hemorrhage (<21 days)',
          'Recent MI (<3 months)',
          'Seizure at onset',
          'Glucose <50 or >400 mg/dL',
          'Platelets <100,000',
          'INR >1.7 or on anticoagulant'
        ],
        dose: {
          total: '0.9 mg/kg (max 90 mg)',
          bolus: '10% of total dose IV push over 1 minute',
          infusion: 'Remaining 90% over 60 minutes'
        }
      },
      warning: 'Consent from patient/family if able - document risks/benefits'
    },
    {
      id: 'stroke-step-009',
      title: 'Thrombectomy Evaluation',
      description: 'Consider mechanical thrombectomy for large vessel occlusion',
      parameters: {
        indications: [
          'Large vessel occlusion (ICA, M1, basilar)',
          'NIHSS ≥6',
          'Within 6 hours of onset (up to 24h with favorable imaging)',
          'Pre-stroke independence (mRS 0-1)'
        ],
        imaging: 'CTA to identify occlusion, CT perfusion for extended window',
        transfer: 'If not thrombectomy-capable, initiate rapid transfer'
      },
      tip: 'tPA and thrombectomy are NOT mutually exclusive - can do both ("drip and ship")'
    },
    {
      id: 'stroke-step-010',
      title: 'Post-tPA Care / Stroke Unit',
      description: 'Intensive monitoring after thrombolysis',
      actions: [
        'Neuro checks every 15 min x 2h, then every 30 min x 6h, then hourly',
        'BP monitoring: <180/105 for 24 hours post-tPA',
        'No antiplatelet/anticoagulant for 24 hours post-tPA',
        'Repeat CT at 24 hours',
        'NPO until swallow screen',
        'DVT prophylaxis (mechanical initially)'
      ]
    },
    {
      id: 'stroke-step-011',
      title: 'Hemorrhagic Stroke Management',
      description: 'If CT shows intracerebral hemorrhage',
      parameters: {
        reverseAnticoagulation: {
          warfarin: 'Vitamin K 10mg IV + PCC (4-factor) or FFP',
          doac: 'Idarucizumab for dabigatran, Andexanet alpha for Xa inhibitors',
          aspirin: 'Platelet transfusion controversial, consider if surgery planned'
        },
        bpTarget: '<140 mmHg systolic (INTERACT2, ATACH-2)',
        neurosurgery: 'Consider for cerebellar hemorrhage >3cm, deteriorating, hydrocephalus',
        seizureProphylaxis: 'Not routine, treat if seizures occur'
      }
    },
    {
      id: 'stroke-step-012',
      title: 'Secondary Prevention (after acute phase)',
      description: 'Prevent recurrent stroke',
      actions: [
        'Antiplatelet: Aspirin 81-325mg or Clopidogrel 75mg',
        'Dual antiplatelet (ASA + clopidogrel) for minor stroke/TIA x 21 days',
        'Statin: High-intensity (atorvastatin 40-80mg)',
        'BP control: Target <130/80 after acute phase',
        'Atrial fibrillation: Anticoagulation (DOAC preferred)',
        'Carotid stenosis: CEA or stenting if >70%',
        'Diabetes management, smoking cessation, lifestyle'
      ]
    }
  ],
  medications: [
    {
      rxcui: 'RX-TPA',
      name: 'Alteplase (tPA)',
      dose: '0.9 mg/kg (max 90 mg)',
      route: 'IV: 10% bolus, 90% over 60 min infusion',
      timing: 'Within 4.5 hours of symptom onset',
      maxDose: '90 mg total',
      precautions: ['Multiple contraindications - see protocol', 'Monitor for bleeding']
    },
    {
      rxcui: 'RX-LABETALOL',
      name: 'Labetalol',
      dose: '10-20 mg IV, may repeat',
      route: 'IV push',
      timing: 'Pre-tPA if BP >185/110',
      maxDose: '300 mg in 24 hours',
      precautions: ['Avoid if bradycardic', 'Monitor for hypotension']
    },
    {
      rxcui: 'RX-NICARDIPINE',
      name: 'Nicardipine',
      dose: '5 mg/hr, increase by 2.5 mg/hr q5-15 min',
      route: 'IV infusion',
      timing: 'BP control pre/post tPA',
      maxDose: '15 mg/hr'
    },
    {
      rxcui: 'RX-ASA',
      name: 'Aspirin',
      dose: '325 mg initially, then 81-325 mg daily',
      route: 'PO or rectal',
      timing: '24-48 hours after tPA (or immediately if no tPA)',
      precautions: ['Not within 24h of tPA']
    }
  ],
  equipment: [
    'CT scanner (non-contrast)',
    'tPA (alteplase) - available immediately',
    'IV pumps',
    'Cardiac monitor',
    'Glucometer',
    'BP monitor',
    'Swallow screening supplies'
  ],
  monitoring: [
    'Neurological status (NIHSS/neuro checks)',
    'Blood pressure (continuous arterial line recommended)',
    'Heart rhythm (A-fib common)',
    'Glucose',
    'Signs of bleeding post-tPA',
    'Airway/respiratory status'
  ],
  regionalAdaptations: [
    {
      region: 'haiti',
      modifiedSteps: ['tPA likely unavailable - focus on supportive care'],
      alternativeMedications: ['Aspirin if tPA unavailable'],
      availabilityNotes: 'CT may not be available - clinical diagnosis only',
      culturalConsiderations: 'Transfer to Port-au-Prince if feasible for advanced care'
    },
    {
      region: 'syria',
      modifiedSteps: ['Focus on stabilization and BP control'],
      availabilityNotes: 'tPA and thrombectomy unlikely - maximize supportive care',
      culturalConsiderations: 'May need to manage without imaging'
    },
    {
      region: 'brasil',
      localGuidelines: ['ABN Stroke Guidelines', 'Protocolo AVC SUS'],
      availabilityNotes: 'tPA available in certified stroke centers'
    },
    {
      region: 'grecia',
      localGuidelines: ['ESO Guidelines 2021'],
      availabilityNotes: 'Full stroke unit care available'
    }
  ],
  visualFlowchart: [
    'FAST/BE-FAST Recognition → Note LAST KNOWN WELL time',
    '↓',
    'Stroke Alert → CT within 25 min',
    '↓',
    'CT RESULT?',
    '├── Hemorrhage → BP <140, reverse anticoagulation, neurosurgery consult',
    '└── No hemorrhage → Ischemic stroke pathway',
    '    ↓',
    '    Within 4.5h + No contraindications?',
    '    ├── YES → tPA 0.9 mg/kg (10% bolus, 90% infusion)',
    '    └── NO → Aspirin + supportive care',
    '    ↓',
    '    NIHSS ≥6 + Large vessel?',
    '    └── YES → Thrombectomy evaluation (up to 24h)',
    '    ↓',
    '    Stroke unit care + Secondary prevention'
  ]
};

// ============================================================
// SIMPLIFIED STROKE PROTOCOL (Resource-Limited)
// ============================================================

export const SIMPLIFIED_STROKE_PROTOCOL = {
  id: 'stroke-simplified',
  name: 'Stroke Protocol - Resource-Limited Settings',
  description: 'For settings without CT, tPA, or stroke units',
  steps: [
    {
      step: 1,
      action: 'RECOGNIZE - FAST',
      details: 'Face droop, Arm weakness, Speech problems, Time - call for help'
    },
    {
      step: 2,
      action: 'Check Blood Sugar',
      details: 'If <70 mg/dL, give glucose - may be hypoglycemia mimicking stroke'
    },
    {
      step: 3,
      action: 'Position & Oxygen',
      details: 'Head up 30°, oxygen only if SpO2 <94%'
    },
    {
      step: 4,
      action: 'Blood Pressure',
      details: 'Do NOT lower BP unless >220/120 mmHg in suspected ischemic stroke'
    },
    {
      step: 5,
      action: 'Aspirin',
      details: 'If fairly certain NOT hemorrhagic (no severe headache at onset): Aspirin 300mg'
    },
    {
      step: 6,
      action: 'NPO',
      details: 'Nothing by mouth until swallowing assessed (stroke patients often cannot swallow safely)'
    },
    {
      step: 7,
      action: 'Transfer',
      details: 'Arrange transfer to facility with CT/stroke care if possible'
    },
    {
      step: 8,
      action: 'Supportive Care',
      details: 'IV fluids (NS), prevent fever, prevent aspiration, reposition q2h'
    }
  ],
  redFlags: [
    'Sudden severe headache ("worst headache of life") → suspect hemorrhage, avoid aspirin',
    'Vomiting + headache + decreased consciousness → increased ICP',
    'Rapid deterioration → possible hemorrhage or edema',
    'Fever → possible infection, worse prognosis'
  ],
  whenToTransfer: [
    'Within 4.5 hours of symptom onset (thrombolysis window)',
    'Severe deficit (cannot walk, cannot talk)',
    'Deteriorating patient',
    'Suspected hemorrhagic stroke'
  ]
};

// ============================================================
// QUICK REFERENCE CARD
// ============================================================

export const STROKE_QUICK_CARD = `
╔════════════════════════════════════════════════════════════════╗
║                    STROKE QUICK REFERENCE                      ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  🚨 FAST RECOGNITION:                                         ║
║     F - Face drooping                                          ║
║     A - Arm weakness                                           ║
║     S - Speech difficulty                                      ║
║     T - Time to call emergency (NOTE TIME!)                    ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  ⏱️ TIME WINDOWS:                                              ║
║     tPA:         0-4.5 hours from symptom onset               ║
║     Thrombectomy: 0-24 hours (with imaging selection)         ║
║     Door-to-CT:  <25 minutes                                   ║
║     Door-to-needle: <60 minutes                                ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  📋 KEY ACTIONS:                                               ║
║     1. Check glucose (hypoglycemia mimics stroke)             ║
║     2. CT head (rule out hemorrhage)                          ║
║     3. BP: <185/110 if tPA candidate                          ║
║     4. tPA 0.9 mg/kg if eligible (10% bolus, 90% infusion)   ║
║     5. Thrombectomy if large vessel occlusion + NIHSS ≥6     ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  🚫 tPA ABSOLUTE CONTRAINDICATIONS:                           ║
║     • Hemorrhage on CT                                         ║
║     • Recent intracranial surgery/trauma                       ║
║     • Intracranial mass/AVM/aneurysm                          ║
║     • Active internal bleeding                                 ║
║     • Uncontrolled severe HTN                                  ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  💊 MEDICATIONS:                                               ║
║     tPA: 0.9 mg/kg (max 90mg) - 10% bolus, 90% over 60 min   ║
║     Labetalol: 10-20mg IV for BP control                      ║
║     Aspirin: 325mg (24h after tPA, or immediately if no tPA) ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`;

export default {
  FAST_ASSESSMENT,
  BE_FAST_ASSESSMENT,
  STROKE_TIME_WINDOWS,
  ACUTE_STROKE_PROTOCOL,
  SIMPLIFIED_STROKE_PROTOCOL,
  STROKE_QUICK_CARD
};
