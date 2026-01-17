/**
 * Interactive Clinical Simulations
 * Scenario-based training for crisis healthcare workers
 *
 * Features:
 * - Branching decision trees
 * - Time-sensitive scenarios
 * - Feedback on decisions
 * - Designed for offline use
 */

export interface ClinicalSimulation {
  id: string;
  title: string;
  category: SimulationCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  description: string;
  learningObjectives: string[];
  scenario: SimulationScenario;
  debrief: SimulationDebrief;
}

export interface SimulationScenario {
  setting: string;
  resources: string[];
  initialPresentation: string;
  vitalSigns: VitalSigns;
  steps: SimulationStep[];
}

export interface VitalSigns {
  hr?: number;
  bp?: string;
  rr?: number;
  spo2?: number;
  temp?: number;
  gcs?: number;
  notes?: string;
}

export interface SimulationStep {
  id: string;
  narrative: string;
  timeLimit?: number; // seconds
  vitalSigns?: Partial<VitalSigns>;
  options: SimulationOption[];
  criticalAction?: string;
}

export interface SimulationOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  consequence: 'improve' | 'stable' | 'deteriorate' | 'death';
  nextStepId?: string;
  pointsAwarded: number;
}

export interface SimulationDebrief {
  keyTakeaways: string[];
  commonMistakes: string[];
  references: string[];
}

export type SimulationCategory =
  | 'trauma'
  | 'medical'
  | 'pediatric'
  | 'obstetric'
  | 'mass_casualty'
  | 'conflict_zone';

// ============================================================================
// MASS CASUALTY INCIDENT SIMULATION
// ============================================================================

export const MCI_SIMULATION: ClinicalSimulation = {
  id: 'mci-bus-accident',
  title: 'Mass Casualty: Bus Accident',
  category: 'mass_casualty',
  difficulty: 'advanced',
  estimatedMinutes: 20,
  description: 'A bus carrying 35 passengers has crashed. You are the first medical responder with limited supplies.',

  learningObjectives: [
    'Apply START triage algorithm correctly',
    'Prioritize patients by severity',
    'Make difficult resource allocation decisions',
    'Coordinate with incoming help'
  ],

  scenario: {
    setting: 'Rural highway, 30 minutes from nearest hospital. You have a basic trauma kit, AED, and 2 assistants.',
    resources: [
      '1 trauma kit',
      '4 tourniquets',
      '10 bandages',
      '2 chest seals',
      '1 AED',
      '2 untrained assistants'
    ],
    initialPresentation: 'You arrive to find passengers scattered around the bus. Some are walking, some are lying still, some are screaming. Fuel is leaking but no fire yet.',
    vitalSigns: { notes: 'Multiple patients - assess individually' },

    steps: [
      {
        id: 'initial',
        narrative: 'You see approximately 20 patients visible. Several are walking around dazed, 3 are lying motionless, and 5-6 are on the ground crying out for help. What do you do first?',
        timeLimit: 30,
        options: [
          {
            id: 'a1',
            text: 'Run to the nearest screaming patient',
            isCorrect: false,
            feedback: 'This is a natural instinct but incorrect. The screaming patients are breathing and conscious - they can wait. You need to establish a systematic approach.',
            consequence: 'stable',
            pointsAwarded: 0,
            nextStepId: 'triage_start'
          },
          {
            id: 'a2',
            text: 'Call for backup and start START triage - announce "Everyone who can walk, move to that tree!"',
            isCorrect: true,
            feedback: 'Correct! This is the first step of START triage - sorting walking wounded. You\'ve just triaged ~12 patients as GREEN in seconds. Now you can focus on those who couldn\'t walk.',
            consequence: 'improve',
            pointsAwarded: 20,
            nextStepId: 'triage_nonwalking'
          },
          {
            id: 'a3',
            text: 'Start CPR on the nearest motionless patient',
            isCorrect: false,
            feedback: 'In a mass casualty incident, you cannot dedicate resources to a single patient who may be unsavable. Triage first, then treat.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: 'triage_start'
          },
          {
            id: 'a4',
            text: 'Set up a treatment area and wait for patients to come to you',
            isCorrect: false,
            feedback: 'Passive approach won\'t work - non-ambulatory patients need to be assessed where they lie. Active triage is essential.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: 'triage_start'
          }
        ],
        criticalAction: 'Establish triage system immediately'
      },
      {
        id: 'triage_nonwalking',
        narrative: 'The walking wounded (GREEN) have moved aside. You approach the first non-walking patient - a 45-year-old male lying still. He is not breathing. What do you do?',
        timeLimit: 20,
        options: [
          {
            id: 'b1',
            text: 'Open his airway with head tilt-chin lift',
            isCorrect: true,
            feedback: 'Correct! In START triage, if someone isn\'t breathing, you open the airway. If they start breathing, they\'re RED (immediate). If not, they\'re BLACK (expectant).',
            consequence: 'stable',
            pointsAwarded: 15,
            nextStepId: 'triage_airway_result'
          },
          {
            id: 'b2',
            text: 'Tag him BLACK (expectant) and move on',
            isCorrect: false,
            feedback: 'You must attempt to open the airway first. He may have airway obstruction from positioning. Only tag BLACK after airway maneuver fails.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: 'triage_airway_result'
          },
          {
            id: 'b3',
            text: 'Start CPR immediately',
            isCorrect: false,
            feedback: 'In MCI triage, CPR for cardiac arrest consumes too many resources. First check if simple airway opening restores breathing.',
            consequence: 'stable',
            pointsAwarded: 5,
            nextStepId: 'triage_airway_result'
          }
        ],
        criticalAction: 'Perform airway maneuver before declaring expectant'
      },
      {
        id: 'triage_airway_result',
        narrative: 'After opening the airway, he begins breathing at 28 breaths/min. He has a weak radial pulse and doesn\'t follow commands when you shout at him. What is his triage category?',
        timeLimit: 15,
        options: [
          {
            id: 'c1',
            text: 'RED (Immediate) - needs urgent intervention',
            isCorrect: true,
            feedback: 'Correct! He is breathing (after airway), RR <30, has radial pulse, but does NOT follow commands. Any "No" in the assessment = RED.',
            consequence: 'stable',
            pointsAwarded: 15,
            nextStepId: 'triage_continue'
          },
          {
            id: 'c2',
            text: 'YELLOW (Delayed) - can wait for treatment',
            isCorrect: false,
            feedback: 'He doesn\'t follow commands, indicating altered mental status or severe injury. He needs to be RED.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: 'triage_continue'
          },
          {
            id: 'c3',
            text: 'GREEN (Minor) - walking wounded',
            isCorrect: false,
            feedback: 'He couldn\'t walk and has altered mental status. Definitely not GREEN.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: 'triage_continue'
          }
        ],
        criticalAction: 'Correctly classify using START algorithm'
      },
      {
        id: 'triage_continue',
        narrative: 'You move to the next patient - a 22-year-old female with an obvious open femur fracture and arterial bleeding from her thigh. She is screaming and alert. What do you do?',
        timeLimit: 30,
        vitalSigns: { hr: 120, bp: '90/60', rr: 24 },
        options: [
          {
            id: 'd1',
            text: 'Apply tourniquet high and tight, tag RED, move on',
            isCorrect: true,
            feedback: 'Excellent! Life-saving intervention (tourniquet for arterial bleed) takes 15-30 seconds. She\'s now RED priority but hemorrhage controlled. Continue triage.',
            consequence: 'improve',
            pointsAwarded: 20,
            nextStepId: 'resource_decision'
          },
          {
            id: 'd2',
            text: 'Apply direct pressure bandage and stay with her',
            isCorrect: false,
            feedback: 'Direct pressure alone won\'t control arterial femoral bleeding. A tourniquet is needed. Staying with one patient in MCI delays triage of others.',
            consequence: 'deteriorate',
            pointsAwarded: 5,
            nextStepId: 'resource_decision'
          },
          {
            id: 'd3',
            text: 'Tag her RED and continue - someone else can apply tourniquet',
            isCorrect: false,
            feedback: 'She will bleed out in minutes without immediate intervention. The 30 seconds to apply a tourniquet will save her life.',
            consequence: 'death',
            pointsAwarded: 0,
            nextStepId: 'resource_decision'
          }
        ],
        criticalAction: 'Apply tourniquet for life-threatening extremity hemorrhage'
      },
      {
        id: 'resource_decision',
        narrative: 'You\'ve triaged 18 patients: 4 RED, 6 YELLOW, 6 GREEN, 2 BLACK. Helicopter is 20 minutes out, can take 2 patients. Ground ambulance is 25 minutes out, can take 4 patients. How do you allocate?',
        timeLimit: 60,
        options: [
          {
            id: 'e1',
            text: 'Helicopter: 2 most critical RED patients. Ambulance: remaining 2 RED patients.',
            isCorrect: true,
            feedback: 'Correct prioritization. RED patients need immediate transport. YELLOW patients can wait for the next wave of transport.',
            consequence: 'improve',
            pointsAwarded: 20,
            nextStepId: 'final'
          },
          {
            id: 'e2',
            text: 'Helicopter: 2 YELLOW patients (they\'ve been waiting). Ambulance: 4 RED patients.',
            isCorrect: false,
            feedback: 'YELLOW can wait - that\'s why they\'re YELLOW. The helicopter is faster and should take the most critical patients.',
            consequence: 'deteriorate',
            pointsAwarded: 5,
            nextStepId: 'final'
          },
          {
            id: 'e3',
            text: 'Helicopter: The 2 BLACK patients - they deserve a chance.',
            isCorrect: false,
            feedback: 'BLACK patients have been assessed as unlikely to survive. Sending them over RED patients means savable patients may die.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: 'final'
          }
        ],
        criticalAction: 'Prioritize transport for RED patients'
      },
      {
        id: 'final',
        narrative: 'The scene is under control. Additional resources are arriving. What is your final task before handing over?',
        options: [
          {
            id: 'f1',
            text: 'Provide verbal handoff with patient count and triage categories',
            isCorrect: true,
            feedback: 'Excellent! Clear communication is essential. "4 RED, 6 YELLOW, 6 GREEN, 2 BLACK. 4 RED transported. Key injuries include..." gives incoming help the full picture.',
            consequence: 'improve',
            pointsAwarded: 10,
            nextStepId: undefined
          },
          {
            id: 'f2',
            text: 'Leave without saying anything - they can figure it out',
            isCorrect: false,
            feedback: 'Never leave a scene without handoff. Critical information could be lost.',
            consequence: 'stable',
            pointsAwarded: 0,
            nextStepId: undefined
          }
        ],
        criticalAction: 'Complete handoff communication'
      }
    ]
  },

  debrief: {
    keyTakeaways: [
      'START triage begins with "Everyone who can walk, move to..."',
      'Open airway before declaring anyone dead',
      'Life-saving interventions (tourniquet, airway) take precedence over completing triage',
      'RED patients get priority for transport',
      'Communication and handoff are essential'
    ],
    commonMistakes: [
      'Focusing on the loudest/most emotional patient',
      'Starting CPR on individual patients in MCI',
      'Not controlling obvious hemorrhage during triage',
      'Sending YELLOW before RED patients'
    ],
    references: [
      'START Triage Algorithm',
      'SALT Mass Casualty Triage',
      'TCCC Triage Guidelines'
    ]
  }
};

// ============================================================================
// POSTPARTUM HEMORRHAGE SIMULATION
// ============================================================================

export const PPH_SIMULATION: ClinicalSimulation = {
  id: 'pph-rural-clinic',
  title: 'Postpartum Hemorrhage in Rural Clinic',
  category: 'obstetric',
  difficulty: 'intermediate',
  estimatedMinutes: 15,
  description: 'A 28-year-old woman delivered 20 minutes ago. She is now bleeding heavily.',

  learningObjectives: [
    'Recognize postpartum hemorrhage',
    'Apply the 4 T\'s framework',
    'Perform uterine massage',
    'Administer uterotonics in correct sequence',
    'Prepare for emergency interventions'
  ],

  scenario: {
    setting: 'Rural health clinic, 2 hours from hospital. Limited supplies but trained midwife assistant available.',
    resources: [
      'Oxytocin 10 IU vials x 5',
      'Misoprostol 200mcg tablets x 10',
      'IV fluids (Normal Saline 1L x 4)',
      'Foley catheter',
      'Basic delivery kit',
      'No blood products'
    ],
    initialPresentation: 'Maria delivered a healthy baby 20 minutes ago. The placenta delivered complete 10 minutes later. Now she is pale, anxious, and there is blood pooling beneath her.',
    vitalSigns: { hr: 110, bp: '100/70', rr: 22, notes: 'Pad soaked, blood on floor' },

    steps: [
      {
        id: 'initial',
        narrative: 'You estimate 600-800ml blood loss and it\'s continuing. What is your first action?',
        timeLimit: 20,
        options: [
          {
            id: 'a1',
            text: 'Perform vigorous fundal massage while calling for help',
            isCorrect: true,
            feedback: 'Correct! Uterine atony (TONE) is the most common cause of PPH. Fundal massage is the immediate first intervention while you assess and prepare medications.',
            consequence: 'improve',
            pointsAwarded: 20,
            nextStepId: 'assess_uterus'
          },
          {
            id: 'a2',
            text: 'Start IV fluids immediately',
            isCorrect: false,
            feedback: 'IV fluids are important but won\'t stop the bleeding. You need to address the source - likely uterine atony - first with fundal massage.',
            consequence: 'stable',
            pointsAwarded: 5,
            nextStepId: 'assess_uterus'
          },
          {
            id: 'a3',
            text: 'Examine the perineum for lacerations',
            isCorrect: false,
            feedback: 'The most common cause is uterine atony (70%). Start fundal massage while you\'re examining - it should happen simultaneously.',
            consequence: 'stable',
            pointsAwarded: 5,
            nextStepId: 'assess_uterus'
          }
        ],
        criticalAction: 'Fundal massage for uterine atony'
      },
      {
        id: 'assess_uterus',
        narrative: 'You feel the uterus - it is boggy and large, not contracted. The bleeding continues. What do you do next?',
        timeLimit: 30,
        vitalSigns: { hr: 120, bp: '90/60', notes: 'More pallor' },
        options: [
          {
            id: 'b1',
            text: 'Continue massage + Oxytocin 10 IU IM + Empty bladder + IV access',
            isCorrect: true,
            feedback: 'Excellent! This covers the ABCs of PPH: massage (A), uterotonics (B), bladder empty (C), IV access. A full bladder prevents uterine contraction.',
            consequence: 'improve',
            pointsAwarded: 20,
            nextStepId: 'response_check'
          },
          {
            id: 'b2',
            text: 'Give Misoprostol 800mcg rectally',
            isCorrect: false,
            feedback: 'Misoprostol is a backup uterotonic. Oxytocin is first-line. However, misoprostol is a good option if oxytocin is unavailable.',
            consequence: 'stable',
            pointsAwarded: 10,
            nextStepId: 'response_check'
          },
          {
            id: 'b3',
            text: 'Check for retained placenta',
            isCorrect: false,
            feedback: 'You already confirmed the placenta was complete. The boggy uterus indicates atony - focus on contracting it.',
            consequence: 'stable',
            pointsAwarded: 5,
            nextStepId: 'response_check'
          }
        ],
        criticalAction: 'Administer first-line uterotonic (Oxytocin)'
      },
      {
        id: 'response_check',
        narrative: '5 minutes later. Oxytocin given, bladder emptied, fundal massage continues. Uterus is firmer but bleeding persists. Blood loss now ~1000ml. BP 85/55, HR 130.',
        timeLimit: 30,
        vitalSigns: { hr: 130, bp: '85/55', rr: 26 },
        options: [
          {
            id: 'c1',
            text: 'IV Oxytocin infusion (20 IU in 1L saline) + Misoprostol 800mcg SL/PR',
            isCorrect: true,
            feedback: 'Correct escalation! Adding oxytocin infusion and second-line uterotonic (misoprostol) is the right step. You\'re working through the uterotonics ladder.',
            consequence: 'improve',
            pointsAwarded: 20,
            nextStepId: 'still_bleeding'
          },
          {
            id: 'c2',
            text: 'Prepare for blood transfusion',
            isCorrect: false,
            feedback: 'You don\'t have blood products. Focus on stopping the bleeding with uterotonics and mechanical interventions.',
            consequence: 'stable',
            pointsAwarded: 5,
            nextStepId: 'still_bleeding'
          },
          {
            id: 'c3',
            text: 'Transfer to hospital immediately',
            isCorrect: false,
            feedback: 'Hospital is 2 hours away. She could die en route if bleeding isn\'t controlled. Stabilize first.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: 'still_bleeding'
          }
        ],
        criticalAction: 'Escalate uterotonics'
      },
      {
        id: 'still_bleeding',
        narrative: 'Despite uterotonics, bleeding continues. Estimated loss now 1500ml. She is confused. BP 70/50. What mechanical intervention can you attempt?',
        timeLimit: 30,
        vitalSigns: { hr: 140, bp: '70/50', notes: 'Confused, cold extremities' },
        options: [
          {
            id: 'd1',
            text: 'Bimanual uterine compression + prepare uterine balloon tamponade',
            isCorrect: true,
            feedback: 'Excellent! Bimanual compression (one hand in vagina, one on abdomen compressing uterus) can control bleeding. Balloon tamponade (Foley or condom catheter in uterus) is your next step.',
            consequence: 'improve',
            pointsAwarded: 20,
            nextStepId: 'balloon'
          },
          {
            id: 'd2',
            text: 'Aortic compression',
            isCorrect: false,
            feedback: 'Aortic compression is a temporizing measure but doesn\'t treat the atonic uterus. Try bimanual compression and balloon first.',
            consequence: 'stable',
            pointsAwarded: 10,
            nextStepId: 'balloon'
          },
          {
            id: 'd3',
            text: 'Pack the uterus with gauze',
            isCorrect: false,
            feedback: 'Uterine packing is used but balloon tamponade is more effective and easier to monitor. Try balloon first.',
            consequence: 'stable',
            pointsAwarded: 10,
            nextStepId: 'balloon'
          }
        ],
        criticalAction: 'Bimanual compression and balloon tamponade'
      },
      {
        id: 'balloon',
        narrative: 'You don\'t have a Bakri balloon. How can you improvise balloon tamponade?',
        timeLimit: 45,
        options: [
          {
            id: 'e1',
            text: 'Foley catheter: insert into uterus, inflate with 60-80ml saline, apply traction',
            isCorrect: true,
            feedback: 'Correct! A Foley catheter can be improvised as uterine balloon. You can also tie a condom to a catheter (condom tamponade) and fill with 300-500ml saline.',
            consequence: 'improve',
            pointsAwarded: 15,
            nextStepId: 'final'
          },
          {
            id: 'e2',
            text: 'Condom tied to NG tube, filled with 300-500ml saline',
            isCorrect: true,
            feedback: 'Excellent! The condom-catheter tamponade is a WHO-recommended improvised device. Fill with saline, apply traction, and secure.',
            consequence: 'improve',
            pointsAwarded: 15,
            nextStepId: 'final'
          },
          {
            id: 'e3',
            text: 'I can\'t improvise - just continue fundal massage',
            isCorrect: false,
            feedback: 'Improvisation is essential in resource-limited settings. Foley or condom tamponade can be lifesaving.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: 'final'
          }
        ],
        criticalAction: 'Improvise balloon tamponade'
      },
      {
        id: 'final',
        narrative: 'Balloon tamponade is in place. Bleeding has slowed significantly. BP improving to 90/60. What are your next steps?',
        vitalSigns: { hr: 110, bp: '90/60', notes: 'More alert' },
        options: [
          {
            id: 'f1',
            text: 'Continue IV fluids, monitor, arrange transfer to hospital for observation',
            isCorrect: true,
            feedback: 'Correct! She\'s stabilizing but needs hospital care. Maintain tamponade during transport, continue fluids and uterotonics, and monitor closely.',
            consequence: 'improve',
            pointsAwarded: 15,
            nextStepId: undefined
          },
          {
            id: 'f2',
            text: 'Remove the balloon to check if bleeding stopped',
            isCorrect: false,
            feedback: 'Never remove tamponade in the field! Leave it in place for 12-24 hours minimum. Remove only in a facility with surgical backup.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: undefined
          }
        ],
        criticalAction: 'Maintain tamponade during transfer'
      }
    ]
  },

  debrief: {
    keyTakeaways: [
      '4 T\'s of PPH: Tone (70%), Trauma, Tissue, Thrombin',
      'Fundal massage is the first intervention for atony',
      'Uterotonics ladder: Oxytocin → Misoprostol → Ergometrine → Carboprost',
      'Condom-catheter tamponade is an effective improvised device',
      'Never remove tamponade in the field'
    ],
    commonMistakes: [
      'Forgetting to empty the bladder (full bladder prevents contraction)',
      'Not escalating uterotonics quickly enough',
      'Attempting transfer before stabilization',
      'Removing tamponade too early'
    ],
    references: [
      'WHO PPH Guidelines 2018',
      'FIGO PPH Bundle',
      'MSF Obstetric Guidelines'
    ]
  }
};

// ============================================================================
// PEDIATRIC SEIZURE SIMULATION
// ============================================================================

export const PEDIATRIC_SEIZURE_SIMULATION: ClinicalSimulation = {
  id: 'pediatric-seizure-febrile',
  title: 'Pediatric Febrile Seizure',
  category: 'pediatric',
  difficulty: 'beginner',
  estimatedMinutes: 10,
  description: 'A 2-year-old child is brought in actively seizing.',

  learningObjectives: [
    'Manage airway during seizure',
    'Time the seizure',
    'Administer appropriate anti-epileptic medication',
    'Identify febrile seizure vs other causes',
    'Counsel parents'
  ],

  scenario: {
    setting: 'Primary care clinic. Basic medications available.',
    resources: [
      'Diazepam rectal gel',
      'Midazolam (can give buccal)',
      'Oxygen',
      'Suction',
      'Thermometer',
      'Paracetamol'
    ],
    initialPresentation: 'Mother rushes in carrying her 2-year-old son who is having whole-body jerking movements. Eyes rolled back. She says he felt hot this morning.',
    vitalSigns: { temp: 39.5, notes: 'Actively seizing, generalized tonic-clonic' },

    steps: [
      {
        id: 'initial',
        narrative: 'The child is actively seizing. What do you do first?',
        timeLimit: 15,
        options: [
          {
            id: 'a1',
            text: 'Place child on side (recovery position), protect from injury, note time',
            isCorrect: true,
            feedback: 'Correct! Position safely on side to protect airway, move hazards away, and START TIMING the seizure. Most febrile seizures stop within 2-3 minutes.',
            consequence: 'stable',
            pointsAwarded: 20,
            nextStepId: 'timing'
          },
          {
            id: 'a2',
            text: 'Hold the child down to stop the shaking',
            isCorrect: false,
            feedback: 'Never restrain a seizing patient. You cannot stop a seizure by holding them, and you risk injury to both patient and yourself.',
            consequence: 'stable',
            pointsAwarded: 0,
            nextStepId: 'timing'
          },
          {
            id: 'a3',
            text: 'Put something in his mouth to protect the tongue',
            isCorrect: false,
            feedback: 'Dangerous myth! Never put anything in the mouth during a seizure. This can cause broken teeth, aspiration, or bite injury to your fingers.',
            consequence: 'deteriorate',
            pointsAwarded: 0,
            nextStepId: 'timing'
          }
        ],
        criticalAction: 'Position safely and time seizure'
      },
      {
        id: 'timing',
        narrative: 'The seizure has been going for 3 minutes and continues. What do you do?',
        timeLimit: 20,
        options: [
          {
            id: 'b1',
            text: 'Give benzodiazepine: Midazolam 0.3mg/kg buccal or Diazepam 0.5mg/kg rectal',
            isCorrect: true,
            feedback: 'Correct! A seizure lasting >5 minutes is status epilepticus and needs treatment. Since this is approaching 5 min, giving benzodiazepine now is appropriate.',
            consequence: 'improve',
            pointsAwarded: 20,
            nextStepId: 'post_seizure'
          },
          {
            id: 'b2',
            text: 'Wait - febrile seizures usually stop on their own',
            isCorrect: false,
            feedback: 'Simple febrile seizures usually stop in 1-2 minutes. At 3+ minutes, you should be preparing/giving benzodiazepine. After 5 minutes it\'s status epilepticus.',
            consequence: 'deteriorate',
            pointsAwarded: 5,
            nextStepId: 'post_seizure'
          },
          {
            id: 'b3',
            text: 'Give paracetamol to lower the fever',
            isCorrect: false,
            feedback: 'Antipyretics cannot stop an active seizure. Treat the seizure first with benzodiazepine, then address the fever.',
            consequence: 'stable',
            pointsAwarded: 5,
            nextStepId: 'post_seizure'
          }
        ],
        criticalAction: 'Benzodiazepine for prolonged seizure'
      },
      {
        id: 'post_seizure',
        narrative: 'The seizure stops after midazolam. Child is now postictal (sleepy, confused). Temperature 39.5°C. What is your assessment?',
        timeLimit: 30,
        vitalSigns: { hr: 130, rr: 28, temp: 39.5, notes: 'Postictal, arousable' },
        options: [
          {
            id: 'c1',
            text: 'Likely simple febrile seizure. Give paracetamol, find source of fever.',
            isCorrect: true,
            feedback: 'Correct! In a 2-year-old with fever, first-time generalized seizure lasting <15 min, with no focal features, simple febrile seizure is most likely.',
            consequence: 'improve',
            pointsAwarded: 15,
            nextStepId: 'fever_source'
          },
          {
            id: 'c2',
            text: 'Meningitis until proven otherwise. Start antibiotics.',
            isCorrect: false,
            feedback: 'You should look for signs of meningitis (neck stiffness, bulging fontanelle, petechiae), but a classic febrile seizure in an otherwise well child doesn\'t mandate empiric antibiotics.',
            consequence: 'stable',
            pointsAwarded: 10,
            nextStepId: 'fever_source'
          },
          {
            id: 'c3',
            text: 'Start anti-epileptic maintenance therapy',
            isCorrect: false,
            feedback: 'Simple febrile seizures don\'t require maintenance anti-epileptics. They have an excellent prognosis and recurrence doesn\'t increase epilepsy risk.',
            consequence: 'stable',
            pointsAwarded: 0,
            nextStepId: 'fever_source'
          }
        ],
        criticalAction: 'Identify simple febrile seizure'
      },
      {
        id: 'fever_source',
        narrative: 'On examination: mild ear redness (otitis media), no neck stiffness, no rash, fontanelle soft. Mother is very worried. What do you tell her?',
        options: [
          {
            id: 'd1',
            text: 'Reassure that febrile seizures are common (2-5% of children), usually benign, and don\'t cause brain damage. Explain when to seek help.',
            isCorrect: true,
            feedback: 'Excellent! Parent education is crucial. Febrile seizures are scary but benign. 1/3 will have recurrence. Antipyretics don\'t prevent seizures but treat comfort.',
            consequence: 'improve',
            pointsAwarded: 15,
            nextStepId: undefined
          },
          {
            id: 'd2',
            text: 'Tell her the child has epilepsy and will need lifelong medication',
            isCorrect: false,
            feedback: 'Incorrect. Simple febrile seizures are NOT epilepsy. Most children outgrow them by age 5-6 with no long-term effects.',
            consequence: 'stable',
            pointsAwarded: 0,
            nextStepId: undefined
          }
        ],
        criticalAction: 'Parent education and reassurance'
      }
    ]
  },

  debrief: {
    keyTakeaways: [
      'Position safely on side, do NOT restrain',
      'Never put anything in the mouth',
      'Time the seizure - >5 min = status epilepticus',
      'Benzodiazepine is first-line: Midazolam buccal or Diazepam rectal',
      'Simple febrile seizures: 6 months - 5 years, <15 min, generalized, single in 24h',
      'Reassure parents - febrile seizures don\'t cause brain damage'
    ],
    commonMistakes: [
      'Putting objects in mouth',
      'Restraining the patient',
      'Waiting too long to give benzodiazepine',
      'Starting maintenance anti-epileptics for simple febrile seizure'
    ],
    references: [
      'AAP Febrile Seizure Guidelines 2011',
      'WHO Pocket Book of Pediatric Hospital Care'
    ]
  }
};

// ============================================================================
// COLLECTION OF SIMULATIONS
// ============================================================================

export const CLINICAL_SIMULATIONS: ClinicalSimulation[] = [
  MCI_SIMULATION,
  PPH_SIMULATION,
  PEDIATRIC_SEIZURE_SIMULATION
];

export function getSimulationById(id: string): ClinicalSimulation | undefined {
  return CLINICAL_SIMULATIONS.find(s => s.id === id);
}

export function getSimulationsByCategory(category: SimulationCategory): ClinicalSimulation[] {
  return CLINICAL_SIMULATIONS.filter(s => s.category === category);
}

export function calculateScore(simulation: ClinicalSimulation, answers: Record<string, string>): {
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  feedback: string[];
} {
  let score = 0;
  let maxScore = 0;
  const feedback: string[] = [];

  for (const step of simulation.scenario.steps) {
    for (const option of step.options) {
      if (option.isCorrect) {
        maxScore += option.pointsAwarded;
      }
    }

    const answerId = answers[step.id];
    if (answerId) {
      const selectedOption = step.options.find(o => o.id === answerId);
      if (selectedOption) {
        score += selectedOption.pointsAwarded;
        if (!selectedOption.isCorrect) {
          feedback.push(`Step "${step.narrative.slice(0, 50)}...": ${selectedOption.feedback}`);
        }
      }
    }
  }

  const percentage = Math.round((score / maxScore) * 100);
  const passed = percentage >= 70;

  return { score, maxScore, percentage, passed, feedback };
}

export default {
  CLINICAL_SIMULATIONS,
  getSimulationById,
  getSimulationsByCategory,
  calculateScore
};
