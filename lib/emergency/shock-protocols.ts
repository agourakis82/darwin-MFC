/**
 * SHOCK PROTOCOLS - Complete Suite for Crisis Settings
 *
 * Four types of shock with management algorithms:
 * 1. Anaphylactic Shock
 * 2. Cardiogenic Shock
 * 3. Hypovolemic/Hemorrhagic Shock
 * 4. Septic Shock
 *
 * Designed for resource-limited and crisis settings
 *
 * References:
 * - European Resuscitation Council Guidelines 2021
 * - Surviving Sepsis Campaign 2021
 * - ATLS 10th Edition
 * - WHO Emergency Triage Assessment and Treatment (ETAT)
 */

import type { EmergencyProtocol, EmergencyStep, EmergencyMedication, RegionalAdaptation } from './emergency-protocols';

// ============================================================
// SHOCK ASSESSMENT
// ============================================================

export interface ShockAssessment {
  type: 'anaphylactic' | 'cardiogenic' | 'hypovolemic' | 'septic' | 'neurogenic' | 'obstructive' | 'undifferentiated';
  severity: 'compensated' | 'decompensated' | 'irreversible';
  clinicalSigns: ShockClinicalSigns;
  estimatedFluidLoss?: string; // For hypovolemic
  allergenExposure?: string; // For anaphylactic
  infectionSource?: string; // For septic
  cardiacHistory?: string; // For cardiogenic
}

export interface ShockClinicalSigns {
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  respiratoryRate: number;
  capillaryRefill: number; // seconds
  mentalStatus: 'alert' | 'confused' | 'verbal' | 'pain' | 'unresponsive';
  skinFindings: 'warm_dry' | 'cool_clammy' | 'mottled' | 'cyanotic' | 'flushed' | 'urticaria';
  urineOutput?: number; // mL/kg/hr
  temperature?: number;
  oxygenSaturation?: number;
}

export function classifyShockSeverity(signs: ShockClinicalSigns): 'compensated' | 'decompensated' | 'irreversible' {
  // Decompensated: Hypotension (SBP <90 or MAP <65)
  const map = (signs.systolicBP + 2 * signs.diastolicBP) / 3;

  if (signs.mentalStatus === 'unresponsive' || signs.systolicBP < 60) {
    return 'irreversible';
  }
  if (signs.systolicBP < 90 || map < 65 || signs.mentalStatus === 'pain' || signs.mentalStatus === 'verbal') {
    return 'decompensated';
  }
  return 'compensated';
}

// ============================================================
// 1. ANAPHYLACTIC SHOCK PROTOCOL
// ============================================================

export const ANAPHYLACTIC_SHOCK_PROTOCOL: EmergencyProtocol = {
  id: 'anaphylactic-shock-001',
  name: 'Anaphylactic Shock Protocol',
  category: 'cardiac', // Closest existing category
  severity: 'critical',
  estimatedTime: 30,
  code: 'ANA-001',
  steps: [
    {
      id: 'ana-step-001',
      title: 'Remove Allergen',
      description: 'Stop IV infusion, remove stinger, stop medication administration',
      duration: 10,
      critical: true,
      actions: ['Stop IV fluids if suspected', 'Remove bee stinger by scraping', 'Note suspected allergen']
    },
    {
      id: 'ana-step-002',
      title: 'Call for Help',
      description: 'Alert team, prepare crash cart, prepare epinephrine',
      duration: 10,
      critical: true,
      actions: ['Call code/emergency team', 'Get epinephrine', 'Prepare IV access equipment']
    },
    {
      id: 'ana-step-003',
      title: 'Position Patient',
      description: 'Lay flat with legs elevated (Trendelenburg) unless respiratory distress',
      duration: 15,
      tip: 'If pregnant: left lateral position. If vomiting: recovery position',
      warning: 'Do NOT sit patient up - this can cause cardiac arrest'
    },
    {
      id: 'ana-step-004',
      title: 'EPINEPHRINE - FIRST LINE',
      description: 'Give IM epinephrine 1:1000 (1mg/mL) into mid-outer thigh',
      duration: 30,
      critical: true,
      visual: 'im_injection_thigh',
      parameters: {
        adultDose: '0.5 mg (0.5 mL of 1:1000) IM',
        childDose: '0.01 mg/kg (max 0.5 mg) IM',
        autoInjector: 'EpiPen: Adult 0.3mg, Jr 0.15mg',
        repeatInterval: 'Repeat every 5-15 minutes if no improvement'
      },
      warning: 'IM in thigh - NOT IV for first dose unless established arrest'
    },
    {
      id: 'ana-step-005',
      title: 'Establish IV Access',
      description: 'Large bore IV (16-18G) x 2 if possible',
      duration: 60,
      actions: ['Insert large bore IV', 'Prepare crystalloid fluids', 'Draw blood if time permits']
    },
    {
      id: 'ana-step-006',
      title: 'IV Fluid Bolus',
      description: 'Rapid crystalloid infusion for hypotension',
      duration: 300,
      parameters: {
        adult: '1-2 L normal saline or Ringer\'s lactate',
        pediatric: '20 mL/kg bolus, may repeat',
        rate: 'As fast as possible through large bore IV'
      }
    },
    {
      id: 'ana-step-007',
      title: 'Oxygen Therapy',
      description: 'High-flow oxygen via face mask',
      duration: 30,
      parameters: {
        flow: '15 L/min via non-rebreather mask',
        target: 'SpO2 ≥94%'
      }
    },
    {
      id: 'ana-step-008',
      title: 'Second-Line Medications',
      description: 'After epinephrine and fluids, consider adjuncts',
      actions: [
        'Antihistamine: Diphenhydramine 50mg IV/IM (H1 blocker)',
        'Corticosteroid: Methylprednisolone 125mg IV (prevents biphasic reaction)',
        'H2 blocker: Ranitidine 50mg IV (if available)',
        'Bronchodilator: Salbutamol nebulizer if wheezing'
      ],
      warning: 'These do NOT replace epinephrine - give epinephrine first!'
    },
    {
      id: 'ana-step-009',
      title: 'Refractory Anaphylaxis',
      description: 'If no response after 3 doses IM epinephrine',
      critical: true,
      actions: [
        'Start IV epinephrine infusion: 1-4 mcg/min',
        'Consider glucagon if on beta-blockers (1-5 mg IV)',
        'Vasopressin 20 units IV if refractory',
        'Prepare for intubation if airway swelling'
      ]
    },
    {
      id: 'ana-step-010',
      title: 'Post-Event Care',
      description: 'Monitor for biphasic reaction (can occur up to 72 hours)',
      actions: [
        'Observe minimum 4-6 hours (24 hours if severe)',
        'Prescribe epinephrine auto-injector',
        'Allergy referral',
        'Anaphylaxis action plan education'
      ]
    }
  ],
  medications: [
    {
      rxcui: 'RX-EPI-IM',
      name: 'Epinephrine (Adrenaline) 1:1000',
      dose: '0.5 mg (0.5 mL)',
      route: 'IM (intramuscular)',
      timing: 'Immediately, repeat every 5-15 min',
      maxDose: 'No maximum in anaphylaxis',
      precautions: ['Monitor heart rate', 'IM preferred over IV initially']
    },
    {
      rxcui: 'RX-DPH',
      name: 'Diphenhydramine',
      dose: '50 mg',
      route: 'IV or IM',
      timing: 'After epinephrine',
      maxDose: '50 mg/dose'
    },
    {
      rxcui: 'RX-MPRED',
      name: 'Methylprednisolone',
      dose: '125 mg',
      route: 'IV',
      timing: 'After epinephrine',
      precautions: ['May take 4-6 hours for effect']
    }
  ],
  equipment: [
    'Epinephrine 1:1000 vials or auto-injector',
    'Large bore IV catheters (16-18G)',
    'Crystalloid fluids (NS or RL)',
    'Non-rebreather oxygen mask',
    'Intubation equipment (standby)',
    'Diphenhydramine, corticosteroids'
  ],
  monitoring: [
    'Blood pressure every 2-5 minutes',
    'Heart rate continuous',
    'Oxygen saturation continuous',
    'Respiratory status (stridor, wheeze)',
    'Skin changes (urticaria, angioedema)',
    'Level of consciousness'
  ],
  regionalAdaptations: [
    {
      region: 'haiti',
      modifiedSteps: ['May need to use oral antihistamine if IV unavailable'],
      alternativeMedications: ['Oral prednisolone if IV corticosteroid unavailable'],
      availabilityNotes: 'Epinephrine may be limited - prioritize IM injection'
    },
    {
      region: 'syria',
      modifiedSteps: ['May need to manage without monitoring equipment'],
      alternativeMedications: ['Adrenaline from local sources may have different concentration'],
      culturalConsiderations: 'Family members may want to be present - allow if not interfering'
    },
    {
      region: 'brasil',
      localGuidelines: ['ACLS Brasil protocol', 'SAMU transport protocol'],
      availabilityNotes: 'Epinephrine available in most UBS/UPA'
    },
    {
      region: 'grecia',
      localGuidelines: ['ERC Guidelines 2021'],
      availabilityNotes: 'Full resources typically available'
    }
  ],
  visualFlowchart: [
    'Recognize anaphylaxis → Call for help',
    'Remove allergen → Position patient flat',
    'EPINEPHRINE IM (repeat every 5-15 min)',
    'High-flow O2 + IV access + Fluid bolus',
    'Second-line: Antihistamine + Steroid',
    'If refractory → IV epinephrine infusion',
    'Monitor for biphasic reaction'
  ]
};

// ============================================================
// 2. CARDIOGENIC SHOCK PROTOCOL
// ============================================================

export const CARDIOGENIC_SHOCK_PROTOCOL: EmergencyProtocol = {
  id: 'cardiogenic-shock-001',
  name: 'Cardiogenic Shock Protocol',
  category: 'cardiac',
  severity: 'critical',
  estimatedTime: 60,
  code: 'CARD-001',
  steps: [
    {
      id: 'card-step-001',
      title: 'Recognize Cardiogenic Shock',
      description: 'Hypotension + signs of poor perfusion + evidence of cardiac dysfunction',
      critical: true,
      parameters: {
        criteria: [
          'SBP <90 mmHg or MAP <65 for >30 min',
          'Signs of organ hypoperfusion (cool extremities, oliguria, confusion)',
          'Cardiac index <2.2 L/min/m² (if measured)',
          'PCWP >15 mmHg (if measured)'
        ],
        commonCauses: ['Acute MI (most common)', 'Arrhythmia', 'Valvular disease', 'Myocarditis', 'Cardiomyopathy']
      }
    },
    {
      id: 'card-step-002',
      title: 'Call for Help & Prepare',
      description: 'Alert cardiology/ICU, prepare vasopressors, ECG',
      duration: 30,
      critical: true,
      actions: ['12-lead ECG immediately', 'Activate cath lab if STEMI', 'Prepare norepinephrine', 'Central line kit']
    },
    {
      id: 'card-step-003',
      title: 'Oxygen & Position',
      description: 'Optimize oxygenation, semi-upright position if tolerated',
      actions: [
        'High-flow O2 to maintain SpO2 ≥94%',
        'Head of bed 30-45° if no hypotension',
        'Prepare for intubation if respiratory failure'
      ],
      warning: 'Avoid excessive positive pressure - can worsen cardiac output'
    },
    {
      id: 'card-step-004',
      title: 'IV Access & Fluids - CAUTIOUS',
      description: 'Unlike other shock - AVOID large fluid boluses',
      critical: true,
      parameters: {
        approach: 'Small fluid challenges only (250 mL)',
        indication: 'Only if no pulmonary edema',
        target: 'CVP 8-12 mmHg if measurable'
      },
      warning: 'Aggressive fluids can worsen pulmonary edema!'
    },
    {
      id: 'card-step-005',
      title: 'Vasopressor - Norepinephrine',
      description: 'First-line vasopressor for cardiogenic shock',
      critical: true,
      parameters: {
        drug: 'Norepinephrine',
        dose: '0.1-0.5 mcg/kg/min, titrate to MAP ≥65',
        maxDose: 'Up to 2 mcg/kg/min',
        route: 'Central line preferred, can use peripheral short-term'
      },
      tip: 'Dopamine associated with more arrhythmias - avoid if possible'
    },
    {
      id: 'card-step-006',
      title: 'Inotrope - Dobutamine',
      description: 'Add if persistent low cardiac output despite vasopressor',
      parameters: {
        drug: 'Dobutamine',
        dose: '2-20 mcg/kg/min',
        indication: 'Low cardiac output with adequate MAP',
        monitoring: 'May cause hypotension - ensure MAP supported'
      }
    },
    {
      id: 'card-step-007',
      title: 'Treat Underlying Cause',
      description: 'Identify and treat reversible causes',
      critical: true,
      actions: [
        'STEMI → Emergency PCI (door-to-balloon <90 min)',
        'Arrhythmia → Cardioversion/antiarrhythmic',
        'Mechanical complication → Emergent surgery',
        'Massive PE → Thrombolysis/embolectomy',
        'Tamponade → Pericardiocentesis'
      ]
    },
    {
      id: 'card-step-008',
      title: 'STEMI-Specific Management',
      description: 'If acute MI is the cause',
      actions: [
        'Aspirin 325 mg chewed immediately',
        'P2Y12 inhibitor (clopidogrel 600 mg if PCI available)',
        'Anticoagulation (heparin or enoxaparin)',
        'Avoid fibrinolytics if cardiogenic shock + PCI available',
        'Emergency coronary angiography'
      ]
    },
    {
      id: 'card-step-009',
      title: 'Mechanical Circulatory Support',
      description: 'Consider if refractory to medical therapy',
      parameters: {
        options: [
          'IABP (Intra-aortic balloon pump)',
          'Impella device',
          'ECMO (if available)'
        ],
        indication: 'Refractory shock despite vasopressors/inotropes'
      },
      tip: 'Transfer to cardiac center if these unavailable'
    },
    {
      id: 'card-step-010',
      title: 'Monitoring & Reassessment',
      description: 'Continuous monitoring, frequent reassessment',
      actions: [
        'Arterial line for continuous BP',
        'Central line for CVP/ScvO2',
        'Urine output target >0.5 mL/kg/hr',
        'Lactate trending (should decrease)',
        'Serial ECG/troponin'
      ]
    }
  ],
  medications: [
    {
      rxcui: 'RX-NOREPI',
      name: 'Norepinephrine (Noradrenaline)',
      dose: '0.1-2 mcg/kg/min',
      route: 'IV infusion (central preferred)',
      timing: 'Continuous infusion',
      precautions: ['Extravasation causes necrosis', 'Arrhythmogenic']
    },
    {
      rxcui: 'RX-DOBUT',
      name: 'Dobutamine',
      dose: '2-20 mcg/kg/min',
      route: 'IV infusion',
      timing: 'After MAP stabilized',
      precautions: ['May cause hypotension', 'Increases myocardial O2 demand']
    },
    {
      rxcui: 'RX-ASA',
      name: 'Aspirin',
      dose: '325 mg chewed',
      route: 'PO',
      timing: 'Immediately if MI suspected',
      precautions: ['Avoid if true aspirin allergy']
    }
  ],
  equipment: [
    'ECG monitor/12-lead',
    'Central line kit',
    'Arterial line kit',
    'Vasopressor infusions',
    'Defibrillator',
    'Ultrasound (if available)'
  ],
  monitoring: [
    'Continuous ECG',
    'Arterial BP (invasive preferred)',
    'CVP if central access',
    'Urine output hourly',
    'Lactate q2-4h',
    'ScvO2 if available'
  ],
  regionalAdaptations: [
    {
      region: 'haiti',
      modifiedSteps: ['May not have vasopressors - use fluid cautiously'],
      alternativeMedications: ['Dopamine if norepinephrine unavailable'],
      availabilityNotes: 'PCI unlikely available - consider transfer if stable'
    },
    {
      region: 'syria',
      modifiedSteps: ['Focus on stabilization for potential transfer'],
      availabilityNotes: 'Advanced cardiac care limited'
    },
    {
      region: 'brasil',
      localGuidelines: ['SBC Cardiogenic Shock Guidelines'],
      availabilityNotes: 'PCI available in most capitals'
    },
    {
      region: 'grecia',
      localGuidelines: ['ESC Guidelines'],
      availabilityNotes: 'Full cardiac care available'
    }
  ],
  contraindications: ['Avoid aggressive fluid resuscitation', 'Avoid dopamine if norepinephrine available'],
  visualFlowchart: [
    'Recognize: Hypotension + cold extremities + cardiac cause',
    'ECG immediately → Identify MI/arrhythmia',
    'O2 + Semi-upright position',
    'CAUTIOUS fluids (250 mL challenge only)',
    'Norepinephrine first-line (MAP ≥65)',
    'Add Dobutamine if low CO',
    'Treat cause: PCI for STEMI, cardioversion for arrhythmia',
    'Consider mechanical support if refractory'
  ]
};

// ============================================================
// 3. HYPOVOLEMIC/HEMORRHAGIC SHOCK PROTOCOL
// ============================================================

export const HYPOVOLEMIC_SHOCK_PROTOCOL: EmergencyProtocol = {
  id: 'hypovolemic-shock-001',
  name: 'Hypovolemic/Hemorrhagic Shock Protocol',
  category: 'trauma',
  severity: 'critical',
  estimatedTime: 60,
  code: 'HYP-001',
  steps: [
    {
      id: 'hyp-step-001',
      title: 'Control External Hemorrhage',
      description: 'Direct pressure, tourniquet if extremity',
      duration: 30,
      critical: true,
      actions: [
        'Direct pressure on bleeding site',
        'Tourniquet for extremity hemorrhage (mark time)',
        'Pack wound if needed',
        'Hemostatic agents if available'
      ],
      warning: 'Tourniquet should be TIGHT enough to stop arterial flow'
    },
    {
      id: 'hyp-step-002',
      title: 'Assess Shock Class',
      description: 'Estimate blood loss to guide resuscitation',
      parameters: {
        classI: {
          bloodLoss: '<15% (750 mL)',
          heartRate: '<100',
          BP: 'Normal',
          respiratoryRate: '14-20',
          urineOutput: '>30 mL/hr',
          mentalStatus: 'Slightly anxious'
        },
        classII: {
          bloodLoss: '15-30% (750-1500 mL)',
          heartRate: '100-120',
          BP: 'Normal or decreased pulse pressure',
          respiratoryRate: '20-30',
          urineOutput: '20-30 mL/hr',
          mentalStatus: 'Mildly anxious'
        },
        classIII: {
          bloodLoss: '30-40% (1500-2000 mL)',
          heartRate: '120-140',
          BP: 'Decreased',
          respiratoryRate: '30-40',
          urineOutput: '5-15 mL/hr',
          mentalStatus: 'Anxious, confused'
        },
        classIV: {
          bloodLoss: '>40% (>2000 mL)',
          heartRate: '>140 or bradycardic',
          BP: 'Very decreased',
          respiratoryRate: '>35',
          urineOutput: 'Negligible',
          mentalStatus: 'Confused, lethargic'
        }
      }
    },
    {
      id: 'hyp-step-003',
      title: 'Large Bore IV Access x2',
      description: 'Establish two large bore peripheral IVs',
      duration: 60,
      critical: true,
      parameters: {
        size: '14-16 gauge preferred',
        alternatives: ['Intraosseous (IO) if IV fails', 'Central line if needed']
      }
    },
    {
      id: 'hyp-step-004',
      title: 'Initial Fluid Resuscitation',
      description: 'Warm crystalloid bolus - permissive hypotension if bleeding not controlled',
      duration: 300,
      critical: true,
      parameters: {
        traumaWithUncontrolledBleeding: {
          target: 'SBP 80-90 mmHg (permissive hypotension)',
          initialBolus: '1 L crystalloid',
          rationale: 'Prevents "popping the clot"'
        },
        controlledBleedingOrNonTrauma: {
          target: 'SBP >90, MAP >65',
          initialBolus: '2 L crystalloid',
          followUp: 'Blood products if not responding'
        }
      },
      warning: 'Excessive crystalloid → dilutional coagulopathy, hypothermia'
    },
    {
      id: 'hyp-step-005',
      title: 'Activate Massive Transfusion Protocol',
      description: 'If ongoing hemorrhage + hemodynamic instability',
      critical: true,
      parameters: {
        triggers: [
          'SBP <90 despite 2L crystalloid',
          'Ongoing visible hemorrhage',
          'Anticipated need for >4 units PRBCs',
          'Hemoglobin <7 g/dL'
        ],
        ratio: '1:1:1 ratio (PRBC:FFP:Platelets)',
        calledAs: 'Massive Transfusion Protocol / Code Red Blood'
      }
    },
    {
      id: 'hyp-step-006',
      title: 'Tranexamic Acid (TXA)',
      description: 'Give within 3 hours of injury for trauma',
      critical: true,
      parameters: {
        dose: '1 g IV over 10 minutes, then 1 g over 8 hours',
        timing: 'Within 3 hours of injury',
        contraindications: ['Active thromboembolic disease']
      },
      tip: 'Also effective in postpartum hemorrhage'
    },
    {
      id: 'hyp-step-007',
      title: 'Prevent Lethal Triad',
      description: 'Combat hypothermia, acidosis, coagulopathy',
      critical: true,
      actions: [
        'WARM: Heated fluids/blood, warm blankets, increase room temp',
        'ACIDOSIS: Treat with perfusion, avoid excessive crystalloid',
        'COAGULOPATHY: Give blood products, TXA, avoid hypothermia'
      ]
    },
    {
      id: 'hyp-step-008',
      title: 'Source Control',
      description: 'Definitive management of bleeding source',
      critical: true,
      parameters: {
        surgical: ['Trauma laparotomy', 'Thoracotomy', 'Vascular repair'],
        interventional: ['IR embolization for pelvic/solid organ injury'],
        obstetric: ['Uterine massage', 'Uterotonics', 'B-Lynch suture']
      }
    },
    {
      id: 'hyp-step-009',
      title: 'Reassess Response',
      description: 'Evaluate response to resuscitation',
      parameters: {
        rapid_responder: 'BP normalizes, stays stable → continue monitoring',
        transient_responder: 'BP improves then drops → ongoing bleeding, needs surgery',
        non_responder: 'No improvement → massive hemorrhage, immediate surgery'
      }
    },
    {
      id: 'hyp-step-010',
      title: 'Laboratory Monitoring',
      description: 'If available, guide resuscitation',
      actions: [
        'Hemoglobin/Hematocrit (may be normal initially)',
        'Lactate (trending down = improving)',
        'Base deficit',
        'INR/PTT, Fibrinogen',
        'TEG/ROTEM if available'
      ]
    }
  ],
  medications: [
    {
      rxcui: 'RX-TXA',
      name: 'Tranexamic Acid (TXA)',
      dose: '1 g IV over 10 min, then 1 g over 8 hrs',
      route: 'IV',
      timing: 'Within 3 hours of injury',
      precautions: ['Avoid if >3 hours from injury in trauma']
    },
    {
      rxcui: 'RX-NS',
      name: 'Normal Saline / Lactated Ringer\'s',
      dose: '1-2 L initial',
      route: 'IV rapid infusion',
      timing: 'Immediately',
      precautions: ['Excessive crystalloid worsens coagulopathy']
    }
  ],
  equipment: [
    'Large bore IV catheters (14-16G)',
    'Intraosseous kit (backup)',
    'Tourniquets',
    'Pressure dressings',
    'Hemostatic agents (QuikClot, Celox)',
    'Blood warmer',
    'Rapid infuser (if available)',
    'Pelvic binder'
  ],
  monitoring: [
    'Blood pressure q5 min during resuscitation',
    'Heart rate continuous',
    'Urine output',
    'Mental status',
    'Lactate trending',
    'Temperature (prevent hypothermia)'
  ],
  regionalAdaptations: [
    {
      region: 'haiti',
      modifiedSteps: ['Blood products likely unavailable - maximize crystalloid + TXA'],
      alternativeMedications: ['TXA especially important when blood unavailable'],
      availabilityNotes: 'Focus on external hemorrhage control and rapid transfer'
    },
    {
      region: 'syria',
      modifiedSteps: ['Expect blast/ballistic injuries', 'Walking blood bank may be needed'],
      availabilityNotes: 'Fresh whole blood from donors if products unavailable'
    },
    {
      region: 'brasil',
      localGuidelines: ['ATLS Brasil', 'Protocolo de Trauma ABRAMET'],
      availabilityNotes: 'Blood bank available in most hospitals'
    },
    {
      region: 'grecia',
      localGuidelines: ['ERC Trauma Guidelines'],
      availabilityNotes: 'Full trauma services available'
    }
  ],
  visualFlowchart: [
    'STOP THE BLEEDING: Direct pressure / Tourniquet',
    'Large bore IV x2 + Warm crystalloid',
    'Assess shock class (I-IV)',
    'Permissive hypotension if uncontrolled bleeding',
    'TXA within 3 hours',
    'Massive Transfusion Protocol if needed (1:1:1)',
    'Prevent lethal triad: Warm + Treat acidosis + Blood products',
    'Source control: Surgery/IR',
    'Reassess: Responder / Transient / Non-responder'
  ]
};

// ============================================================
// 4. SEPTIC SHOCK PROTOCOL
// ============================================================

export const SEPTIC_SHOCK_PROTOCOL: EmergencyProtocol = {
  id: 'septic-shock-001',
  name: 'Septic Shock Protocol (Surviving Sepsis)',
  category: 'sepsis',
  severity: 'critical',
  estimatedTime: 60,
  code: 'SEP-001',
  steps: [
    {
      id: 'sep-step-001',
      title: 'Recognize Sepsis & Septic Shock',
      description: 'qSOFA ≥2 or SOFA increase + suspected infection',
      critical: true,
      parameters: {
        qSOFA: {
          criteria: ['RR ≥22', 'Altered mental status', 'SBP ≤100 mmHg'],
          interpretation: '≥2 criteria = high risk, screen further'
        },
        septicShock: {
          definition: 'Sepsis + vasopressors needed for MAP ≥65 + lactate >2 mmol/L despite fluids'
        }
      }
    },
    {
      id: 'sep-step-002',
      title: 'START THE HOUR-1 BUNDLE',
      description: 'All actions should be completed within 1 hour',
      critical: true,
      tip: 'Time is tissue - every hour delay increases mortality'
    },
    {
      id: 'sep-step-003',
      title: 'Measure Lactate',
      description: 'Initial lactate level to assess severity',
      duration: 10,
      critical: true,
      parameters: {
        normal: '<2 mmol/L',
        elevated: '≥2 mmol/L - indicates tissue hypoperfusion',
        severelyElevated: '>4 mmol/L - very high mortality'
      },
      tip: 'Repeat lactate in 2-4 hours to assess clearance'
    },
    {
      id: 'sep-step-004',
      title: 'Obtain Cultures BEFORE Antibiotics',
      description: 'Blood cultures x2, urine, other sites as indicated',
      duration: 15,
      actions: [
        '2 sets of blood cultures (different sites)',
        'Urine culture',
        'Sputum if respiratory source',
        'Wound culture if skin/soft tissue',
        'LP if meningitis suspected'
      ],
      warning: 'Do NOT delay antibiotics >45 min for cultures'
    },
    {
      id: 'sep-step-005',
      title: 'BROAD-SPECTRUM ANTIBIOTICS',
      description: 'Give within 1 hour of sepsis recognition',
      duration: 30,
      critical: true,
      parameters: {
        empiric: {
          community: 'Piperacillin-tazobactam 4.5g IV OR Ceftriaxone 2g + Metronidazole 500mg',
          hospital: 'Meropenem 1g IV OR Piperacillin-tazobactam 4.5g + Vancomycin 25-30 mg/kg',
          immunocompromised: 'Meropenem 1g + Vancomycin + consider antifungal'
        },
        adjustments: 'Tailor once culture results available'
      },
      warning: 'Each hour delay in antibiotics increases mortality 7.6%'
    },
    {
      id: 'sep-step-006',
      title: 'RAPID FLUID RESUSCITATION',
      description: '30 mL/kg crystalloid within 3 hours',
      duration: 180,
      critical: true,
      parameters: {
        dose: '30 mL/kg ideal body weight',
        fluid: 'Balanced crystalloid (LR) preferred over NS',
        rate: 'As rapidly as tolerated',
        example: '70 kg patient = 2100 mL'
      },
      tip: 'Reassess fluid responsiveness (leg raise, IVC variability)'
    },
    {
      id: 'sep-step-007',
      title: 'Vasopressors for Refractory Hypotension',
      description: 'If MAP <65 despite fluid resuscitation',
      critical: true,
      parameters: {
        firstLine: {
          drug: 'Norepinephrine',
          dose: 'Start 0.1 mcg/kg/min, titrate to MAP ≥65'
        },
        secondLine: {
          drug: 'Vasopressin',
          dose: '0.03 units/min (fixed dose)',
          indication: 'Add when norepinephrine >0.25 mcg/kg/min'
        },
        thirdLine: {
          drug: 'Epinephrine',
          dose: '0.1-0.5 mcg/kg/min',
          indication: 'If norepinephrine + vasopressin inadequate'
        }
      },
      warning: 'Can start via peripheral IV while central access obtained'
    },
    {
      id: 'sep-step-008',
      title: 'Source Control',
      description: 'Identify and eliminate infection source',
      critical: true,
      actions: [
        'Drain abscesses (percutaneous or surgical)',
        'Remove infected devices (lines, catheters)',
        'Debride necrotic tissue',
        'Decompress obstructed organs (biliary, urinary)',
        'Surgical source control if needed'
      ],
      tip: 'Source control within 6-12 hours if feasible'
    },
    {
      id: 'sep-step-009',
      title: 'Consider Corticosteroids',
      description: 'For refractory septic shock',
      parameters: {
        indication: 'Ongoing vasopressor requirement despite fluid resuscitation',
        dose: 'Hydrocortisone 200 mg/day (50 mg q6h or 200 mg continuous)',
        duration: 'Continue until vasopressors weaned'
      }
    },
    {
      id: 'sep-step-010',
      title: 'Reassess & Ongoing Management',
      description: 'Continuous assessment and de-escalation',
      actions: [
        'Repeat lactate in 2-4 hours (target >10% decrease)',
        'Reassess fluid responsiveness',
        'De-escalate antibiotics once cultures return',
        'Wean vasopressors when stable',
        'DVT prophylaxis when stable',
        'Stress ulcer prophylaxis if indicated',
        'Glucose control (target <180 mg/dL)'
      ]
    }
  ],
  medications: [
    {
      rxcui: 'RX-NOREPI',
      name: 'Norepinephrine',
      dose: '0.1-2 mcg/kg/min',
      route: 'IV infusion',
      timing: 'If MAP <65 despite fluids',
      precautions: ['Central line preferred', 'Titrate to response']
    },
    {
      rxcui: 'RX-PIPTAZ',
      name: 'Piperacillin-Tazobactam',
      dose: '4.5 g IV q6h',
      route: 'IV',
      timing: 'Within 1 hour',
      precautions: ['Adjust for renal function']
    },
    {
      rxcui: 'RX-MERO',
      name: 'Meropenem',
      dose: '1 g IV q8h',
      route: 'IV',
      timing: 'Within 1 hour',
      precautions: ['Adjust for renal function']
    },
    {
      rxcui: 'RX-VANCO',
      name: 'Vancomycin',
      dose: '25-30 mg/kg loading',
      route: 'IV',
      timing: 'If MRSA suspected',
      precautions: ['Nephrotoxic', 'Infuse over 1-2 hours']
    },
    {
      rxcui: 'RX-HYDRO',
      name: 'Hydrocortisone',
      dose: '200 mg/day',
      route: 'IV',
      timing: 'If refractory shock',
      precautions: ['Taper when vasopressors weaned']
    }
  ],
  equipment: [
    'Central line kit',
    'Arterial line kit',
    'IV pumps for vasopressors',
    'Blood culture bottles',
    'Lactate meter (POC if available)',
    'Crystalloid fluids (LR preferred)'
  ],
  monitoring: [
    'MAP target ≥65 mmHg',
    'Lactate trending (q2-4h)',
    'Urine output ≥0.5 mL/kg/hr',
    'ScvO2 if available (>70%)',
    'CVP 8-12 mmHg if measured',
    'Mental status'
  ],
  regionalAdaptations: [
    {
      region: 'haiti',
      modifiedSteps: ['Lactate may not be available - use clinical signs'],
      alternativeMedications: ['Ampicillin + Gentamicin if broader agents unavailable'],
      availabilityNotes: 'Vasopressors may be limited - prioritize source control'
    },
    {
      region: 'syria',
      modifiedSteps: ['May need to use available antibiotics empirically'],
      availabilityNotes: 'Limited monitoring - use clinical assessment'
    },
    {
      region: 'brasil',
      localGuidelines: ['ILAS Sepsis Guidelines'],
      availabilityNotes: 'Full resources typically available in ICU settings'
    },
    {
      region: 'grecia',
      localGuidelines: ['Surviving Sepsis Campaign 2021'],
      availabilityNotes: 'Full resources available'
    }
  ],
  visualFlowchart: [
    'Suspect Sepsis (qSOFA ≥2 + infection)',
    '→ HOUR-1 BUNDLE:',
    '  1. Measure LACTATE',
    '  2. Blood CULTURES (before antibiotics)',
    '  3. Broad ANTIBIOTICS within 1 hour',
    '  4. 30 mL/kg CRYSTALLOID',
    '  5. VASOPRESSORS if MAP <65 after fluids',
    '→ Source Control within 6-12 hours',
    '→ Reassess lactate, wean vasopressors',
    '→ De-escalate antibiotics when cultures return'
  ]
};

// ============================================================
// SHOCK QUICK REFERENCE
// ============================================================

export const SHOCK_QUICK_REFERENCE = `
╔══════════════════════════════════════════════════════════════════╗
║                    SHOCK QUICK REFERENCE                         ║
╠══════════════════════════════════════════════════════════════════╣
║ TYPE          │ KEY SIGNS              │ FIRST INTERVENTION      ║
╠═══════════════╪════════════════════════╪═════════════════════════╣
║ ANAPHYLACTIC  │ Urticaria, wheeze,     │ EPINEPHRINE IM         ║
║               │ angioedema, hypotension│ 0.5mg (0.5mL 1:1000)   ║
╠═══════════════╪════════════════════════╪═════════════════════════╣
║ CARDIOGENIC   │ JVD, pulmonary edema,  │ NOREPINEPHRINE IV      ║
║               │ cold extremities       │ + treat cause (PCI)     ║
╠═══════════════╪════════════════════════╪═════════════════════════╣
║ HYPOVOLEMIC   │ Tachycardia, flat JVD, │ STOP BLEEDING +        ║
║               │ dry skin, trauma       │ IV fluids + TXA         ║
╠═══════════════╪════════════════════════╪═════════════════════════╣
║ SEPTIC        │ Fever, warm skin,      │ ANTIBIOTICS within 1hr ║
║               │ infection source       │ + 30mL/kg fluids        ║
╚══════════════════════════════════════════════════════════════════╝

UNIVERSAL TARGETS:
• MAP ≥65 mmHg
• Urine output ≥0.5 mL/kg/hr
• Lactate trending DOWN
• Mental status improving

VASOPRESSOR LADDER:
1. Norepinephrine (first line for all except anaphylaxis)
2. Vasopressin (add to norepi in sepsis)
3. Epinephrine (if still refractory)
4. Dopamine (only if bradycardic + low risk arrhythmia)
`;

export default {
  ANAPHYLACTIC_SHOCK_PROTOCOL,
  CARDIOGENIC_SHOCK_PROTOCOL,
  HYPOVOLEMIC_SHOCK_PROTOCOL,
  SEPTIC_SHOCK_PROTOCOL,
  classifyShockSeverity,
  SHOCK_QUICK_REFERENCE
};
