/**
 * OBSTETRIC EMERGENCIES PROTOCOL
 *
 * Life-threatening obstetric conditions requiring immediate intervention
 * Designed for both hospital and resource-limited settings
 *
 * Key emergencies covered:
 * - Postpartum Hemorrhage (PPH)
 * - Eclampsia
 * - Cord Prolapse
 * - Shoulder Dystocia
 * - Uterine Rupture
 *
 * References:
 * - WHO Managing Complications in Pregnancy and Childbirth (MCPC)
 * - ACOG Practice Bulletins
 * - RCOG Green-top Guidelines
 * - FIGO Guidelines
 */

import type { EmergencyProtocol, RegionalAdaptation } from './emergency-protocols';

// ============================================================
// POSTPARTUM HEMORRHAGE (PPH) PROTOCOL
// ============================================================

export interface PPHAssessment {
  estimatedBloodLoss: number; // mL
  severity: 'minor' | 'major' | 'massive';
  cause: PPHCause;
  vitalSigns: {
    bp: { systolic: number; diastolic: number };
    heartRate: number;
    respiratoryRate: number;
    oxygenSat?: number;
  };
  uterusTone: 'firm' | 'soft' | 'boggy';
  bleedingSource: 'uterine' | 'cervical' | 'vaginal' | 'perineal' | 'unknown';
  responseToTreatment: 'responding' | 'not_responding' | 'deteriorating';
}

export type PPHCause = 'tone' | 'trauma' | 'tissue' | 'thrombin'; // 4 T's

export const PPH_PROTOCOL: EmergencyProtocol = {
  id: 'pph-001',
  name: 'Postpartum Hemorrhage (PPH) Protocol',
  category: 'obstetric',
  severity: 'critical',
  estimatedTime: 60,
  code: 'PPH-001',
  steps: [
    {
      id: 'pph-step-001',
      title: 'CALL FOR HELP & ACTIVATE PPH PROTOCOL',
      description: 'Massive hemorrhage requires team approach',
      duration: 30,
      critical: true,
      actions: [
        'Call for help - senior obstetrician, anesthesia, midwives',
        'Activate massive transfusion protocol if available',
        'Assign roles: Resuscitation, Uterine management, Documentation'
      ]
    },
    {
      id: 'pph-step-002',
      title: 'ASSESS - Estimate Blood Loss',
      description: 'Quantify blood loss and assess severity',
      parameters: {
        minor: '<500 mL vaginal / <1000 mL cesarean',
        major: '500-1000 mL or signs of shock',
        massive: '>1000 mL or signs of shock'
      },
      tip: 'Visual estimation underestimates by 30-50%. Use graduated drapes/containers.'
    },
    {
      id: 'pph-step-003',
      title: 'RESUSCITATE - ABCs',
      description: 'Stabilize patient while treating cause',
      critical: true,
      actions: [
        'High-flow oxygen 15 L/min via face mask',
        'Two large-bore IV lines (14-16G)',
        'Rapid crystalloid infusion (warmed if possible)',
        'Draw blood: CBC, coagulation, type & crossmatch',
        'Foley catheter to monitor urine output',
        'Keep patient warm (prevent hypothermia)'
      ]
    },
    {
      id: 'pph-step-004',
      title: 'IDENTIFY CAUSE - The 4 T\'s',
      description: 'Systematic evaluation of bleeding cause',
      critical: true,
      parameters: {
        tone: {
          cause: 'Uterine atony (70% of PPH)',
          signs: 'Soft, boggy uterus',
          treatment: 'Massage, uterotonics'
        },
        trauma: {
          cause: 'Genital tract laceration',
          signs: 'Firm uterus, continued bleeding',
          treatment: 'Inspect and repair lacerations'
        },
        tissue: {
          cause: 'Retained placenta/membranes',
          signs: 'Incomplete placenta on inspection',
          treatment: 'Manual removal, exploration'
        },
        thrombin: {
          cause: 'Coagulopathy',
          signs: 'Non-clotting blood, oozing from IV sites',
          treatment: 'Blood products, correct coagulopathy'
        }
      }
    },
    {
      id: 'pph-step-005',
      title: 'UTERINE MASSAGE',
      description: 'First-line treatment for uterine atony',
      duration: 120,
      critical: true,
      actions: [
        'Rub up a contraction - vigorous bimanual massage',
        'Empty bladder (Foley catheter)',
        'Continue until uterus is firm'
      ],
      visual: 'bimanual_massage'
    },
    {
      id: 'pph-step-006',
      title: 'UTEROTONICS - Medication Protocol',
      description: 'Pharmacological management of atony',
      critical: true,
      parameters: {
        firstLine: {
          drug: 'Oxytocin',
          dose: '10 IU IM or 5 IU slow IV',
          alternative: '10-40 IU in 500-1000 mL NS infusion',
          maxDose: 'No maximum in emergency'
        },
        secondLine: {
          drug: 'Ergometrine (Methergine)',
          dose: '0.2 mg IM or slow IV',
          repeat: 'May repeat after 15 min',
          maxDose: '1 mg (5 doses)',
          contraindications: 'Hypertension, pre-eclampsia, cardiac disease'
        },
        thirdLine: {
          drug: 'Carboprost (Hemabate)',
          dose: '250 mcg IM or intramyometrial',
          repeat: 'Every 15-90 min',
          maxDose: '2 mg (8 doses)',
          contraindications: 'Asthma'
        },
        alternative: {
          drug: 'Misoprostol',
          dose: '800-1000 mcg sublingual or rectal',
          indication: 'If other uterotonics unavailable'
        }
      }
    },
    {
      id: 'pph-step-007',
      title: 'TRANEXAMIC ACID (TXA)',
      description: 'Give within 3 hours of delivery',
      critical: true,
      parameters: {
        dose: '1 g IV over 10 minutes',
        repeat: 'Second dose of 1 g if bleeding continues after 30 min',
        evidence: 'WOMAN trial: Reduces death from bleeding by 1/3'
      },
      warning: 'DO NOT delay for TXA - give alongside other treatments'
    },
    {
      id: 'pph-step-008',
      title: 'If ATONY persists - BIMANUAL COMPRESSION',
      description: 'Mechanical compression of uterus',
      actions: [
        'Insert fist into vagina (anterior fornix)',
        'Place other hand on abdomen behind uterus',
        'Compress uterus between hands',
        'Maintain until bleeding controlled'
      ],
      tip: 'Can maintain for extended period while other interventions prepared'
    },
    {
      id: 'pph-step-009',
      title: 'If TRAUMA - Inspect and Repair',
      description: 'Systematic inspection of genital tract',
      actions: [
        'Adequate analgesia/anesthesia',
        'Good lighting and exposure',
        'Inspect cervix (anteriorly, posteriorly, laterally)',
        'Inspect vagina systematically',
        'Inspect perineum',
        'Repair all lacerations with absorbable sutures',
        'Check for hematomas'
      ]
    },
    {
      id: 'pph-step-010',
      title: 'If TISSUE - Manual Removal',
      description: 'Remove retained placenta or membranes',
      actions: [
        'Adequate analgesia (epidural, spinal, or general)',
        'One hand on abdomen to stabilize uterus',
        'Other hand in uterus to manually separate and remove',
        'Sweep cavity to ensure complete',
        'Uterotonics after removal',
        'Antibiotics'
      ],
      warning: 'Risk of perforation and infection'
    },
    {
      id: 'pph-step-011',
      title: 'INTRAUTERINE BALLOON TAMPONADE',
      description: 'Mechanical tamponade for refractory atony',
      parameters: {
        devices: ['Bakri balloon', 'Condom catheter (improvised)'],
        technique: [
          'Insert balloon into uterine cavity',
          'Inflate with 300-500 mL saline',
          'Pack vagina with gauze',
          'Maintain traction on catheter',
          'Continue uterotonics'
        ],
        success: '80-90% success rate'
      }
    },
    {
      id: 'pph-step-012',
      title: 'IMPROVISED BALLOON - Condom Catheter',
      description: 'For resource-limited settings without commercial balloon',
      actions: [
        'Tie condom to end of Foley catheter',
        'Insert into uterine cavity',
        'Inflate with 300-500 mL NS via Foley',
        'Clamp catheter',
        'Pack vagina to keep in place'
      ],
      tip: 'Effective and inexpensive alternative to commercial balloons'
    },
    {
      id: 'pph-step-013',
      title: 'SURGICAL INTERVENTIONS',
      description: 'If medical and balloon fail',
      parameters: {
        procedures: [
          {
            name: 'B-Lynch compression suture',
            description: 'Uterine compression suture',
            preserves: 'Yes (fertility preserving)'
          },
          {
            name: 'Uterine artery ligation',
            description: 'Ligate uterine arteries',
            preserves: 'Yes'
          },
          {
            name: 'Internal iliac artery ligation',
            description: 'Bilateral hypogastric artery ligation',
            preserves: 'Yes'
          },
          {
            name: 'Hysterectomy',
            description: 'Last resort - subtotal or total',
            preserves: 'No',
            indication: 'Life-saving when all else fails'
          }
        ]
      }
    },
    {
      id: 'pph-step-014',
      title: 'TRANSFUSION SUPPORT',
      description: 'Blood product replacement',
      parameters: {
        trigger: 'Hb <7 g/dL or ongoing massive hemorrhage',
        ratio: '1:1:1 (PRBC:FFP:Platelets) for massive transfusion',
        targets: {
          hemoglobin: '>7 g/dL (>8 if cardiac disease)',
          platelets: '>50,000/µL (>75,000 if ongoing)',
          fibrinogen: '>2 g/L',
          inr: '<1.5'
        }
      }
    },
    {
      id: 'pph-step-015',
      title: 'DOCUMENTATION & DEBRIEF',
      description: 'Record events and debrief team',
      actions: [
        'Document estimated blood loss',
        'Document all interventions and timing',
        'Notify senior staff',
        'Complete incident report',
        'Team debrief',
        'Support for patient and family'
      ]
    }
  ],
  medications: [
    {
      rxcui: 'RX-OXY',
      name: 'Oxytocin',
      dose: '10 IU IM or 5 IU slow IV',
      route: 'IM or IV',
      timing: 'Immediately after diagnosis',
      precautions: ['Slow IV push - rapid can cause hypotension']
    },
    {
      rxcui: 'RX-ERG',
      name: 'Ergometrine (Methergine)',
      dose: '0.2 mg',
      route: 'IM or slow IV',
      timing: 'Second-line after oxytocin',
      maxDose: '1 mg total',
      precautions: ['Contraindicated in hypertension, pre-eclampsia']
    },
    {
      rxcui: 'RX-CARBO',
      name: 'Carboprost (Hemabate)',
      dose: '250 mcg',
      route: 'IM or intramyometrial',
      timing: 'Third-line',
      maxDose: '2 mg (8 doses)',
      precautions: ['Contraindicated in asthma']
    },
    {
      rxcui: 'RX-MISO',
      name: 'Misoprostol',
      dose: '800-1000 mcg',
      route: 'Sublingual or rectal',
      timing: 'When other uterotonics unavailable',
      precautions: ['Side effects: shivering, fever']
    },
    {
      rxcui: 'RX-TXA',
      name: 'Tranexamic Acid',
      dose: '1 g IV over 10 min',
      route: 'IV',
      timing: 'Within 3 hours of delivery',
      precautions: ['Second dose if bleeding continues']
    }
  ],
  equipment: [
    'IV access supplies (14-16G)',
    'Crystalloid fluids',
    'Blood bank access/crossmatch',
    'Foley catheter',
    'Uterotonic medications',
    'Suture materials',
    'Retractors, speculum, lighting',
    'Bakri balloon or condom catheter',
    'Surgical instruments (if surgery needed)'
  ],
  monitoring: [
    'Blood loss (quantitative)',
    'Vital signs (q5 min in acute phase)',
    'Urine output (q1h)',
    'Level of consciousness',
    'Lab monitoring (Hb, coag, fibrinogen)'
  ],
  regionalAdaptations: [
    {
      region: 'haiti',
      modifiedSteps: ['Misoprostol may be only uterotonic available'],
      alternativeMedications: ['Misoprostol 800-1000 mcg SL/PR as first-line'],
      availabilityNotes: 'Blood products may be limited - walking blood bank',
      culturalConsiderations: 'Family blood donation common'
    },
    {
      region: 'syria',
      modifiedSteps: ['May need to improvise equipment'],
      availabilityNotes: 'Surgical intervention may be limited',
      culturalConsiderations: 'Family involvement in care decisions'
    },
    {
      region: 'brasil',
      localGuidelines: ['Protocolo de Hemorragia Pós-Parto - Ministério da Saúde'],
      availabilityNotes: 'Full resources in most maternities'
    },
    {
      region: 'grecia',
      localGuidelines: ['RCOG and FIGO Guidelines'],
      availabilityNotes: 'Full resources available'
    }
  ],
  visualFlowchart: [
    'RECOGNIZE PPH (>500mL vaginal, >1000mL CS, or signs shock)',
    '↓',
    'CALL FOR HELP + RESUSCITATE (O2, IV x2, fluids, labs)',
    '↓',
    'IDENTIFY CAUSE (4 T\'s: Tone, Trauma, Tissue, Thrombin)',
    '↓',
    'TONE (atony) → Massage + Uterotonics',
    '├── Oxytocin 10 IU IM → Ergometrine 0.2mg → Carboprost 250mcg',
    '├── + TXA 1g IV',
    '├── If persists → Bimanual compression → Balloon tamponade',
    '└── If all fail → Surgery (B-Lynch → Artery ligation → Hysterectomy)',
    '↓',
    'TRAUMA → Inspect & repair lacerations',
    'TISSUE → Manual removal of retained products',
    'THROMBIN → Blood products, correct coagulopathy',
    '↓',
    'TRANSFUSE if massive: 1:1:1 ratio'
  ]
};

// ============================================================
// ECLAMPSIA PROTOCOL
// ============================================================

export const ECLAMPSIA_PROTOCOL: EmergencyProtocol = {
  id: 'eclampsia-001',
  name: 'Eclampsia Protocol',
  category: 'obstetric',
  severity: 'critical',
  estimatedTime: 30,
  code: 'ECL-001',
  steps: [
    {
      id: 'ecl-step-001',
      title: 'PROTECT & CALL FOR HELP',
      description: 'Prevent injury during seizure, call team',
      duration: 60,
      critical: true,
      actions: [
        'Call for help (obstetric emergency)',
        'Lower bed, put side rails up',
        'Turn to left lateral position',
        'Do NOT restrain or put anything in mouth',
        'Start timer to document seizure duration'
      ]
    },
    {
      id: 'ecl-step-002',
      title: 'AIRWAY & OXYGEN',
      description: 'Maintain airway, give oxygen',
      actions: [
        'Position head to maintain airway',
        'Suction if needed after seizure',
        'High-flow oxygen via face mask',
        'Consider airway adjunct if prolonged'
      ]
    },
    {
      id: 'ecl-step-003',
      title: 'IV ACCESS',
      description: 'Establish IV access',
      actions: [
        'Large bore IV if not already in place',
        'Draw labs: CBC, LFT, creatinine, uric acid, coagulation, magnesium'
      ]
    },
    {
      id: 'ecl-step-004',
      title: 'MAGNESIUM SULFATE - LOADING DOSE',
      description: 'First-line treatment and prevention of seizures',
      critical: true,
      parameters: {
        ivRegimen: {
          loading: '4-6 g IV over 15-20 minutes',
          preparation: 'Dilute in 100 mL NS',
          maintenance: '1-2 g/hour IV infusion'
        },
        imRegimen: {
          loading: '4 g IV over 5 min + 5 g IM each buttock (total 14 g)',
          maintenance: '5 g IM every 4 hours',
          note: 'IM painful - add 1 mL lidocaine to each injection'
        }
      },
      warning: 'Monitor for toxicity: reflexes, respirations, urine output'
    },
    {
      id: 'ecl-step-005',
      title: 'MAGNESIUM TOXICITY MONITORING',
      description: 'Before each dose, check:',
      critical: true,
      parameters: {
        checks: [
          'Patellar reflex PRESENT',
          'Respiratory rate ≥12/min',
          'Urine output ≥30 mL/hr'
        ],
        levels: {
          therapeutic: '4-7 mEq/L (4.8-8.4 mg/dL)',
          lossOfReflexes: '>10 mEq/L',
          respiratoryDepression: '>12 mEq/L',
          cardiacArrest: '>25 mEq/L'
        }
      }
    },
    {
      id: 'ecl-step-006',
      title: 'IF TOXICITY - CALCIUM GLUCONATE',
      description: 'Antidote for magnesium toxicity',
      parameters: {
        indication: 'Loss of reflexes, respiratory depression, or arrest',
        dose: 'Calcium gluconate 1 g IV over 3 minutes',
        preparation: '10 mL of 10% solution'
      }
    },
    {
      id: 'ecl-step-007',
      title: 'RECURRENT SEIZURE',
      description: 'If seizure recurs despite magnesium',
      actions: [
        'Additional magnesium: 2 g IV over 5 min',
        'If still seizing: Lorazepam 4 mg IV or Diazepam 10 mg IV',
        'Consider intubation if airway not protected',
        'Exclude other causes (intracranial hemorrhage)'
      ]
    },
    {
      id: 'ecl-step-008',
      title: 'BLOOD PRESSURE CONTROL',
      description: 'Treat severe hypertension (SBP ≥160 or DBP ≥110)',
      critical: true,
      parameters: {
        target: '140-155/90-105 mmHg',
        firstLine: {
          drug: 'Labetalol',
          dose: '20 mg IV, double dose every 10 min (40, 80 mg)',
          maxDose: '300 mg cumulative'
        },
        secondLine: {
          drug: 'Hydralazine',
          dose: '5-10 mg IV every 20-30 min',
          maxDose: '20 mg'
        },
        alternative: {
          drug: 'Nifedipine',
          dose: '10-20 mg PO every 30 min',
          note: 'Oral route - use if IV unavailable'
        }
      },
      warning: 'Do NOT drop BP too rapidly - risk of fetal distress'
    },
    {
      id: 'ecl-step-009',
      title: 'FETAL MONITORING',
      description: 'Assess fetal status after maternal stabilization',
      actions: [
        'Continuous fetal heart rate monitoring',
        'Expect transient fetal bradycardia during/after seizure',
        'Allow 15-20 min for fetal recovery before emergency CS'
      ]
    },
    {
      id: 'ecl-step-010',
      title: 'DELIVERY PLANNING',
      description: 'Eclampsia is indication for delivery',
      parameters: {
        timing: 'Deliver after maternal stabilization (ideally within 12 hours)',
        route: 'Vaginal preferred if cervix favorable, CS if not',
        continueMagnesium: 'Continue for 24-48 hours postpartum'
      }
    }
  ],
  medications: [
    {
      rxcui: 'RX-MGSO4',
      name: 'Magnesium Sulfate',
      dose: '4-6 g IV loading, 1-2 g/hr maintenance',
      route: 'IV',
      timing: 'Immediately',
      precautions: ['Monitor reflexes, respirations, urine output']
    },
    {
      rxcui: 'RX-CAGL',
      name: 'Calcium Gluconate',
      dose: '1 g IV over 3 min',
      route: 'IV',
      timing: 'Only for magnesium toxicity',
      precautions: ['Have at bedside for all magnesium infusions']
    },
    {
      rxcui: 'RX-LAB',
      name: 'Labetalol',
      dose: '20 mg IV, escalate to 40, 80 mg',
      route: 'IV',
      timing: 'If SBP ≥160 or DBP ≥110',
      maxDose: '300 mg'
    }
  ],
  visualFlowchart: [
    'ECLAMPTIC SEIZURE → Protect, Call for help, Left lateral',
    '↓',
    'AIRWAY: O2, suction after seizure',
    '↓',
    'MAGNESIUM SULFATE:',
    '├── IV: 4-6 g over 15-20 min → 1-2 g/hr infusion',
    '└── OR IM: 4g IV + 10g IM (5g each buttock) → 5g IM q4h',
    '↓',
    'MONITOR FOR TOXICITY (before each dose):',
    '├── Patellar reflex present?',
    '├── Resp rate ≥12?',
    '└── Urine output ≥30 mL/hr?',
    '↓',
    'IF TOXICITY: Calcium gluconate 1g IV over 3 min',
    '↓',
    'BP CONTROL: Labetalol 20mg IV → 40mg → 80mg',
    '(Target: 140-155/90-105)',
    '↓',
    'PLAN DELIVERY (after stabilization, within 12h)'
  ],
  regionalAdaptations: [
    {
      region: 'haiti',
      modifiedSteps: ['IM regimen may be more practical'],
      alternativeMedications: ['Diazepam if magnesium unavailable (less effective)'],
      availabilityNotes: 'Magnesium sulfate should be prioritized'
    },
    {
      region: 'syria',
      availabilityNotes: 'May need to manage without BP monitoring equipment',
      culturalConsiderations: 'Family support important'
    },
    {
      region: 'brasil',
      localGuidelines: ['Protocolo de Eclâmpsia - Ministério da Saúde']
    },
    {
      region: 'grecia',
      localGuidelines: ['ESC/ISSHP Guidelines']
    }
  ]
};

// ============================================================
// SHOULDER DYSTOCIA PROTOCOL
// ============================================================

export const SHOULDER_DYSTOCIA_PROTOCOL = {
  id: 'shoulder-dystocia-001',
  name: 'Shoulder Dystocia - HELPERR Mnemonic',
  description: 'Obstetric emergency: impacted anterior shoulder after head delivery',
  recognitionSigns: [
    'Head delivery with retraction (turtle sign)',
    'Chin pressing into perineum',
    'Failure of external rotation',
    'Failure of shoulder to deliver with gentle traction'
  ],
  timeLimit: 'Aim to resolve within 5 minutes to minimize fetal hypoxia',
  mnemonicHELPERR: [
    {
      letter: 'H',
      action: 'Help',
      details: 'Call for help - senior obstetrician, pediatrician, anesthesia, extra nurses'
    },
    {
      letter: 'E',
      action: 'Evaluate for Episiotomy',
      details: 'Consider episiotomy to allow more room for maneuvers (does not relieve bony obstruction)'
    },
    {
      letter: 'L',
      action: 'Legs - McRoberts Position',
      details: 'Hyperflexion of maternal thighs to abdomen. Flattens lumbar lordosis, rotates pubic symphysis. Most effective single maneuver. Try with suprapubic pressure.'
    },
    {
      letter: 'P',
      action: 'Pressure - Suprapubic',
      details: 'Apply pressure above pubic bone, directed posteriorly and laterally (toward fetal back). NOT fundal pressure. Reduces bisacromial diameter.'
    },
    {
      letter: 'E',
      action: 'Enter - Internal Maneuvers',
      details: 'Rubin II: Pressure on posterior aspect of anterior shoulder (adduct to chest). Woods screw: Pressure on anterior aspect of posterior shoulder (rotate 180°). Remove posterior arm: Flex elbow, sweep across chest, deliver arm.'
    },
    {
      letter: 'R',
      action: 'Roll - All Fours',
      details: 'Roll patient to hands and knees (Gaskin maneuver). Gravity and position change may dislodge shoulder.'
    },
    {
      letter: 'R',
      action: 'Last Resort Maneuvers',
      details: 'Zavanelli: Push head back, cesarean delivery. Clavicle fracture: Intentional fracture. Symphysiotomy: Surgical division of symphysis.'
    }
  ],
  documentation: [
    'Time of head delivery',
    'Time of shoulder/body delivery',
    'Maneuvers performed (in order)',
    'Personnel present',
    'Cord blood gases',
    'Infant status'
  ],
  complications: {
    fetal: ['Brachial plexus injury', 'Clavicle/humerus fracture', 'Hypoxic injury'],
    maternal: ['3rd/4th degree tear', 'PPH', 'Uterine rupture (if Zavanelli)']
  }
};

// ============================================================
// CORD PROLAPSE PROTOCOL
// ============================================================

export const CORD_PROLAPSE_PROTOCOL = {
  id: 'cord-prolapse-001',
  name: 'Umbilical Cord Prolapse',
  description: 'Cord presenting ahead of or alongside fetal presenting part',
  recognition: [
    'Cord visible at introitus',
    'Cord palpable on vaginal exam',
    'Acute fetal bradycardia after ROM'
  ],
  immediateActions: [
    {
      step: 1,
      action: 'CALL FOR HELP',
      details: 'Emergency cesarean section likely needed'
    },
    {
      step: 2,
      action: 'ELEVATE PRESENTING PART',
      details: 'Insert hand into vagina, push presenting part up. Maintain until cesarean delivery.',
      critical: true
    },
    {
      step: 3,
      action: 'POSITION',
      details: 'Knee-chest position or steep Trendelenburg (head down)',
      rationale: 'Gravity helps elevate presenting part off cord'
    },
    {
      step: 4,
      action: 'FILL BLADDER (optional)',
      details: 'Insert Foley, fill bladder with 500-700 mL saline',
      rationale: 'Elevates presenting part mechanically'
    },
    {
      step: 5,
      action: 'DO NOT REPLACE CORD',
      details: 'Do not push cord back into uterus',
      rationale: 'Risk of vasospasm from handling'
    },
    {
      step: 6,
      action: 'KEEP CORD MOIST AND WARM',
      details: 'Cover with warm, moist towels if outside vagina',
      rationale: 'Prevents vasospasm from cooling/drying'
    },
    {
      step: 7,
      action: 'EMERGENCY CESAREAN',
      details: 'Immediate cesarean section unless vaginal delivery imminent',
      timing: 'Decision-to-delivery <30 minutes, ideally <15 minutes'
    }
  ],
  exceptions: [
    'If cervix fully dilated and head on perineum: Operative vaginal delivery may be faster',
    'If fetus is previable or known to have died: No emergency cesarean'
  ]
};

// ============================================================
// QUICK REFERENCE CARDS
// ============================================================

export const PPH_QUICK_CARD = `
╔════════════════════════════════════════════════════════════════════════════╗
║                    PPH QUICK REFERENCE                                     ║
╠════════════════════════════════════════════════════════════════════════════╣
║ DEFINITION: Blood loss >500mL vaginal / >1000mL cesarean / signs of shock ║
╠════════════════════════════════════════════════════════════════════════════╣
║ 4 T's - CAUSES:                                                            ║
║ • TONE (70%) - Atony, boggy uterus → Massage + Uterotonics                ║
║ • TRAUMA - Lacerations → Inspect & Repair                                  ║
║ • TISSUE - Retained products → Manual removal                              ║
║ • THROMBIN - Coagulopathy → Blood products                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ UTEROTONICS (in order):                                                    ║
║ 1. Oxytocin 10 IU IM (or 5 IU slow IV)                                    ║
║ 2. Ergometrine 0.2 mg IM (avoid if hypertensive)                          ║
║ 3. Carboprost 250 mcg IM (avoid if asthmatic)                             ║
║ 4. Misoprostol 800-1000 mcg SL/PR (if others unavailable)                 ║
╠════════════════════════════════════════════════════════════════════════════╣
║ + TXA 1 g IV over 10 min (within 3 hours!)                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ IF PERSISTS:                                                               ║
║ • Bimanual compression                                                     ║
║ • Uterine balloon tamponade (Bakri or condom catheter)                    ║
║ • Surgery: B-Lynch → Artery ligation → Hysterectomy                       ║
╚════════════════════════════════════════════════════════════════════════════╝
`;

export const ECLAMPSIA_QUICK_CARD = `
╔════════════════════════════════════════════════════════════════════════════╗
║                    ECLAMPSIA QUICK REFERENCE                               ║
╠════════════════════════════════════════════════════════════════════════════╣
║ DURING SEIZURE:                                                            ║
║ • Protect from injury, side rails up                                       ║
║ • Left lateral position                                                    ║
║ • Do NOT restrain, do NOT put anything in mouth                           ║
║ • Oxygen when seizure stops                                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ MAGNESIUM SULFATE (First-line):                                            ║
║ Loading: 4-6 g IV over 15-20 min (or 4g IV + 10g IM)                      ║
║ Maintenance: 1-2 g/hr IV (or 5g IM q4h)                                   ║
╠════════════════════════════════════════════════════════════════════════════╣
║ BEFORE EACH DOSE - CHECK:                                                  ║
║ ✓ Patellar reflex present                                                  ║
║ ✓ Resp rate ≥12/min                                                        ║
║ ✓ Urine output ≥30 mL/hr                                                   ║
╠════════════════════════════════════════════════════════════════════════════╣
║ MG TOXICITY → Calcium gluconate 1 g IV over 3 min                         ║
╠════════════════════════════════════════════════════════════════════════════╣
║ BP CONTROL (if SBP ≥160 or DBP ≥110):                                      ║
║ Labetalol 20 mg IV → 40 mg → 80 mg (q10 min, max 300 mg)                  ║
║ Target: 140-155/90-105 mmHg                                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ PLAN DELIVERY after stabilization (within 12 hours)                        ║
║ Continue MgSO4 for 24-48 hours postpartum                                  ║
╚════════════════════════════════════════════════════════════════════════════╝
`;

export default {
  PPH_PROTOCOL,
  ECLAMPSIA_PROTOCOL,
  SHOULDER_DYSTOCIA_PROTOCOL,
  CORD_PROLAPSE_PROTOCOL,
  PPH_QUICK_CARD,
  ECLAMPSIA_QUICK_CARD
};
