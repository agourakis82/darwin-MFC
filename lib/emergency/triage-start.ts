/**
 * START TRIAGE SYSTEM - Mass Casualty Incident Protocol
 * Simple Triage And Rapid Treatment
 *
 * For healthcare workers in crisis/disaster settings
 * Works without any equipment - just clinical assessment
 *
 * References:
 * - SALT Mass Casualty Triage (CHEMM)
 * - START Triage Algorithm (Newport Beach Fire Department, 1983)
 * - WHO Mass Casualty Management Guidelines
 */

export type TriageCategory = 'immediate' | 'delayed' | 'minor' | 'expectant';

export interface TriageColor {
  category: TriageCategory;
  color: 'red' | 'yellow' | 'green' | 'black';
  priority: 1 | 2 | 3 | 4;
  description: string;
  criteria: string[];
  treatmentPriority: string;
  transportPriority: string;
}

export interface TriageAssessment {
  patientId: string;
  timestamp: Date;
  assessorId?: string;
  canWalk: boolean;
  breathing: 'none' | 'after_positioning' | 'less_than_30' | 'greater_than_30';
  respiratoryRate?: number;
  perfusion: 'capillary_less_2s' | 'capillary_greater_2s' | 'radial_pulse_present' | 'radial_pulse_absent';
  mentalStatus: 'follows_commands' | 'does_not_follow';
  result: TriageCategory;
  notes?: string;
}

export interface MassCasualtyIncident {
  incidentId: string;
  type: 'natural_disaster' | 'conflict' | 'industrial' | 'transport' | 'epidemic' | 'other';
  location: string;
  startTime: Date;
  estimatedVictims: number;
  assessedVictims: number;
  triageCounts: Record<TriageCategory, number>;
  status: 'active' | 'contained' | 'resolved';
  resourcesNeeded: string[];
  commandPost?: string;
}

// TRIAGE CATEGORIES
export const TRIAGE_CATEGORIES: Record<TriageCategory, TriageColor> = {
  immediate: {
    category: 'immediate',
    color: 'red',
    priority: 1,
    description: 'Life-threatening, treatable condition - Immediate care needed',
    criteria: [
      'Airway compromise requiring intervention',
      'Respiratory rate >30 or <10',
      'Uncontrolled hemorrhage',
      'Signs of shock (capillary refill >2s, absent radial pulse)',
      'Altered mental status in trauma patient',
      'Tension pneumothorax signs',
      'Open chest wound'
    ],
    treatmentPriority: 'First priority - Immediate life-saving interventions',
    transportPriority: 'First transport to definitive care'
  },
  delayed: {
    category: 'delayed',
    color: 'yellow',
    priority: 2,
    description: 'Serious but not immediately life-threatening',
    criteria: [
      'Stable vital signs',
      'Injuries requiring surgery but can wait 4-6 hours',
      'Open fractures without vascular compromise',
      'Burns 10-30% TBSA (non-airway)',
      'Eye injuries',
      'Penetrating abdominal trauma (hemodynamically stable)'
    ],
    treatmentPriority: 'Can wait for care after RED patients',
    transportPriority: 'Second priority transport'
  },
  minor: {
    category: 'minor',
    color: 'green',
    priority: 3,
    description: 'Walking wounded - Minor injuries',
    criteria: [
      'Can walk unassisted',
      'Minor lacerations',
      'Sprains/strains',
      'Minor burns (<10% TBSA)',
      'Psychological distress without physical injury',
      'Closed fractures (non-displaced)'
    ],
    treatmentPriority: 'Can wait hours for treatment',
    transportPriority: 'Transport when resources available'
  },
  expectant: {
    category: 'expectant',
    color: 'black',
    priority: 4,
    description: 'Not expected to survive or already deceased',
    criteria: [
      'No breathing after airway repositioning',
      'Massive head injury with brain matter visible',
      'Severe burns >90% TBSA',
      'Cardiac arrest in MCI setting (no CPR resources)',
      'Agonal respirations with no other signs of life',
      'Multiple traumatic amputations with no pulse'
    ],
    treatmentPriority: 'Comfort measures only when resources allow',
    transportPriority: 'No transport priority'
  }
};

// START TRIAGE ALGORITHM
export const START_TRIAGE_ALGORITHM = {
  id: 'start-triage',
  name: 'START Triage Algorithm',
  description: 'Simple Triage And Rapid Treatment - 30-second assessment',
  steps: [
    {
      id: 'step-1',
      question: 'Can the patient WALK?',
      yes: { action: 'Tag GREEN (Minor)', result: 'minor' as TriageCategory },
      no: { action: 'Continue to Step 2', nextStep: 'step-2' }
    },
    {
      id: 'step-2',
      question: 'Is the patient BREATHING?',
      checkFirst: 'If NO breathing, reposition airway (head-tilt chin-lift)',
      yes: { action: 'Continue to Step 3', nextStep: 'step-3' },
      no: {
        afterIntervention: {
          breathing: { action: 'Tag RED (Immediate)', result: 'immediate' as TriageCategory },
          notBreathing: { action: 'Tag BLACK (Expectant)', result: 'expectant' as TriageCategory }
        }
      }
    },
    {
      id: 'step-3',
      question: 'Respiratory Rate?',
      assessment: 'Count breaths for 15 seconds, multiply by 4',
      greaterThan30: { action: 'Tag RED (Immediate)', result: 'immediate' as TriageCategory },
      lessThan30: { action: 'Continue to Step 4', nextStep: 'step-4' }
    },
    {
      id: 'step-4',
      question: 'Check PERFUSION',
      methods: [
        'Capillary refill: Press nail bed, count seconds to pink return',
        'OR Check radial pulse presence'
      ],
      capillaryGreater2s: { action: 'Tag RED (Immediate)', result: 'immediate' as TriageCategory },
      noPulse: { action: 'Tag RED (Immediate)', result: 'immediate' as TriageCategory },
      normal: { action: 'Continue to Step 5', nextStep: 'step-5' }
    },
    {
      id: 'step-5',
      question: 'Check MENTAL STATUS',
      assessment: 'Give simple command: "Squeeze my hand" or "Open your eyes"',
      followsCommands: { action: 'Tag YELLOW (Delayed)', result: 'delayed' as TriageCategory },
      doesNotFollow: { action: 'Tag RED (Immediate)', result: 'immediate' as TriageCategory }
    }
  ]
};

// JUMPSTART PEDIATRIC TRIAGE (for children under 8)
export const JUMPSTART_PEDIATRIC_TRIAGE = {
  id: 'jumpstart-triage',
  name: 'JumpSTART Pediatric Triage',
  description: 'Modified START for children under 8 years',
  ageGroup: 'Under 8 years',
  modifications: [
    {
      parameter: 'Respiratory Rate',
      adult: '>30/min = RED',
      pediatric: '<15 or >45/min = RED'
    },
    {
      parameter: 'No Breathing',
      adult: 'Reposition airway, if still no breathing = BLACK',
      pediatric: 'Reposition airway → If pulse present, give 5 rescue breaths → reassess'
    },
    {
      parameter: 'Mental Status',
      adult: 'Follows commands',
      pediatric: 'AVPU scale: A/V = YELLOW, P/U = RED'
    }
  ],
  steps: [
    {
      id: 'js-step-1',
      question: 'Can the child WALK? (Or appropriate for age: infant can move/cry)',
      yes: { result: 'minor' as TriageCategory },
      no: { nextStep: 'js-step-2' }
    },
    {
      id: 'js-step-2',
      question: 'Is the child BREATHING?',
      yes: { nextStep: 'js-step-3' },
      no: {
        action: 'Reposition airway, check for pulse',
        noPulse: { result: 'expectant' as TriageCategory },
        pulsePresent: {
          action: 'Give 5 rescue breaths',
          breathingAfter: { result: 'immediate' as TriageCategory },
          notBreathingAfter: { result: 'expectant' as TriageCategory }
        }
      }
    },
    {
      id: 'js-step-3',
      question: 'Respiratory Rate?',
      lessThan15orGreaterThan45: { result: 'immediate' as TriageCategory },
      between15and45: { nextStep: 'js-step-4' }
    },
    {
      id: 'js-step-4',
      question: 'Check PERFUSION (capillary refill)',
      greaterThan2s: { result: 'immediate' as TriageCategory },
      lessThan2s: { nextStep: 'js-step-5' }
    },
    {
      id: 'js-step-5',
      question: 'AVPU Mental Status',
      assessment: 'A = Alert, V = responds to Voice, P = responds to Pain, U = Unresponsive',
      alertOrVoice: { result: 'delayed' as TriageCategory },
      painOrUnresponsive: { result: 'immediate' as TriageCategory }
    }
  ]
};

// SALT TRIAGE (Sort, Assess, Lifesaving Interventions, Treatment/Transport)
export const SALT_TRIAGE_ALGORITHM = {
  id: 'salt-triage',
  name: 'SALT Mass Casualty Triage',
  description: 'National guideline for mass casualty triage (US CDC/CHEMM)',
  phases: [
    {
      phase: 'SORT',
      description: 'Global sorting based on mobility',
      commands: [
        'Step 1: "Everyone who can walk, move to [designated area]" → Assess third',
        'Step 2: "Everyone who can wave or move, show me" → Assess second',
        'Step 3: Remaining patients still, not moving → Assess first'
      ]
    },
    {
      phase: 'ASSESS',
      description: 'Individual assessment in priority order',
      steps: [
        'Check breathing',
        'Check perfusion',
        'Check mental status'
      ]
    },
    {
      phase: 'LIFESAVING INTERVENTIONS',
      description: 'Only 3 quick interventions allowed',
      interventions: [
        'Control major hemorrhage (tourniquet, direct pressure)',
        'Open airway (head-tilt chin-lift, recovery position)',
        'Chest decompression (if trained and equipped)',
        '2 rescue breaths (children only)'
      ],
      timeLimit: '60 seconds maximum per patient'
    },
    {
      phase: 'TREATMENT/TRANSPORT',
      description: 'Assign category and move to treatment area',
      categories: Object.values(TRIAGE_CATEGORIES)
    }
  ]
};

// TRIAGE FUNCTION
export function performSTARTTriage(assessment: Omit<TriageAssessment, 'result' | 'timestamp'>): TriageAssessment {
  let result: TriageCategory;

  // Step 1: Can walk?
  if (assessment.canWalk) {
    result = 'minor';
  }
  // Step 2: Breathing?
  else if (assessment.breathing === 'none') {
    result = 'expectant';
  }
  else if (assessment.breathing === 'after_positioning') {
    result = 'immediate';
  }
  // Step 3: Respiratory rate
  else if (assessment.breathing === 'greater_than_30' || (assessment.respiratoryRate && assessment.respiratoryRate > 30)) {
    result = 'immediate';
  }
  // Step 4: Perfusion
  else if (assessment.perfusion === 'capillary_greater_2s' || assessment.perfusion === 'radial_pulse_absent') {
    result = 'immediate';
  }
  // Step 5: Mental status
  else if (assessment.mentalStatus === 'does_not_follow') {
    result = 'immediate';
  }
  else {
    result = 'delayed';
  }

  return {
    ...assessment,
    timestamp: new Date(),
    result
  };
}

// MASS CASUALTY INCIDENT MANAGEMENT
export interface MCICommandStructure {
  incidentCommander: string;
  triageOfficer: string;
  treatmentOfficer: string;
  transportOfficer: string;
  staging: string;
}

export interface ResourceAllocation {
  treatmentAreas: {
    red: { location: string; capacity: number; staff: number };
    yellow: { location: string; capacity: number; staff: number };
    green: { location: string; capacity: number; staff: number };
    black: { location: string; capacity: number; staff: number };
  };
  transport: {
    ambulances: number;
    helicopters: number;
    alternativeVehicles: number;
  };
  supplies: {
    tourniquets: number;
    ivKits: number;
    airwayEquipment: number;
    medications: string[];
  };
}

export const MCI_RESPONSE_CHECKLIST = {
  immediate: [
    'Establish incident command',
    'Request additional resources',
    'Designate triage area (entry point)',
    'Designate treatment areas by color',
    'Designate transport staging area',
    'Establish communication channel'
  ],
  triage: [
    'Begin with non-walking patients first',
    'Tag each patient with color',
    'Do NOT stop to treat during triage sweep',
    'Only perform immediate life-saving interventions',
    'Record triage counts to command'
  ],
  treatment: [
    'RED area: Airway, bleeding control, shock treatment',
    'YELLOW area: Wound care, splinting, pain management',
    'GREEN area: Self-care station, psychological support',
    'BLACK area: Respectful handling, documentation'
  ],
  transport: [
    'RED patients to trauma centers first',
    'Distribute patients across hospitals (avoid overwhelming one)',
    'Track patient destinations',
    'Notify receiving hospitals of incoming patients'
  ]
};

// HOSPITAL SURGE CAPACITY
export interface SurgeCapacity {
  level: 'green' | 'yellow' | 'red' | 'black';
  description: string;
  bedCapacity: string;
  staffRatio: string;
  actions: string[];
}

export const HOSPITAL_SURGE_LEVELS: SurgeCapacity[] = [
  {
    level: 'green',
    description: 'Normal operations',
    bedCapacity: 'Normal census',
    staffRatio: 'Standard staffing',
    actions: ['Normal operations', 'Staff awareness of potential MCI']
  },
  {
    level: 'yellow',
    description: 'Increased demand - Activate surge plan',
    bedCapacity: 'Up to 120% capacity',
    staffRatio: 'Call in additional staff',
    actions: [
      'Cancel elective procedures',
      'Expedite discharges',
      'Open surge beds',
      'Call in off-duty staff',
      'Notify administration'
    ]
  },
  {
    level: 'red',
    description: 'Maximum surge - Crisis standards',
    bedCapacity: 'Up to 150% capacity',
    staffRatio: 'Extended shifts, cross-training deployment',
    actions: [
      'Implement crisis standards of care',
      'Convert non-clinical spaces',
      'Deploy medical students/residents',
      'Request mutual aid',
      'Activate emergency caches'
    ]
  },
  {
    level: 'black',
    description: 'Overwhelmed - Scarce resource allocation',
    bedCapacity: 'Above sustainable capacity',
    staffRatio: 'Crisis staffing ratios',
    actions: [
      'Implement scarce resource allocation protocols',
      'Triage for available resources',
      'Request state/federal assistance',
      'Consider patient transfer to other regions',
      'Document all allocation decisions'
    ]
  }
];

// REGIONAL ADAPTATIONS
export const TRIAGE_REGIONAL_ADAPTATIONS = {
  haiti: {
    region: 'Haiti / Resource-Limited',
    modifications: [
      'No ambulance availability - use any available vehicle',
      'Limited hospital capacity - consider field hospitals',
      'May need to perform definitive care on site',
      'Traditional healers may be first responders',
      'Communication may be limited - use runners'
    ],
    alternativeTransport: ['Motorcycle', 'Cart/wheelbarrow', 'Carried stretcher', 'Boat (coastal areas)'],
    localResources: ['MSF facilities', 'UN compound clinics', 'Church/NGO clinics']
  },
  syria: {
    region: 'Syria / Active Conflict',
    modifications: [
      'Security assessment before triage',
      'Underground/bunker triage when under attack',
      'Expect blast injuries predominant',
      'Limited re-supply - conserve resources',
      'Document for potential war crimes evidence'
    ],
    securityProtocol: [
      'Identify safe approach routes',
      'Have evacuation plan before starting',
      'Mark medical facility clearly',
      'Coordinate with all parties if possible'
    ],
    expectedInjuries: ['Blast lung', 'Shrapnel wounds', 'Burns', 'Crush injuries', 'Psychological trauma']
  },
  brasil: {
    region: 'Brasil / SUS System',
    modifications: [
      'Activate SAMU (192) for coordination',
      'Manchester Protocol integration',
      'UPA/UBS as secondary receiving facilities',
      'National disaster response system integration'
    ],
    contactNumbers: {
      samu: '192',
      bombeiros: '193',
      defesaCivil: '199'
    }
  },
  grecia: {
    region: 'Grécia / EU System',
    modifications: [
      'EKAB (166) coordination',
      'EU Civil Protection Mechanism if needed',
      'Refugee population may require interpreters',
      'Island settings may require maritime evacuation'
    ],
    contactNumbers: {
      ekab: '166',
      europeanEmergency: '112'
    }
  }
};

// QUICK REFERENCE CARD
export const START_TRIAGE_QUICK_CARD = `
╔════════════════════════════════════════════════════════════╗
║              START TRIAGE - QUICK REFERENCE                ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  1. CAN WALK? ──────────────────────→ YES → 🟢 GREEN      ║
║        │                                    (Minor)        ║
║        ↓ NO                                                ║
║                                                            ║
║  2. BREATHING? ─────────────────────→ NO → Reposition     ║
║        │                                    Airway         ║
║        │                                      │            ║
║        │                          Still NO → ⚫ BLACK      ║
║        │                          YES → 🔴 RED             ║
║        ↓ YES                                               ║
║                                                            ║
║  3. RESP RATE >30/min? ─────────────→ YES → 🔴 RED        ║
║        │                                    (Immediate)    ║
║        ↓ NO                                                ║
║                                                            ║
║  4. CAPILLARY REFILL >2s ───────────→ YES → 🔴 RED        ║
║     or NO RADIAL PULSE?                     (Immediate)    ║
║        │                                                   ║
║        ↓ NO                                                ║
║                                                            ║
║  5. FOLLOWS COMMANDS? ──────────────→ NO → 🔴 RED         ║
║        │                                   (Immediate)     ║
║        ↓ YES                                               ║
║                                                            ║
║        🟡 YELLOW (Delayed)                                 ║
║                                                            ║
╠════════════════════════════════════════════════════════════╣
║  🔴 RED = Immediate (life-threatening, treatable)         ║
║  🟡 YELLOW = Delayed (serious, can wait)                  ║
║  🟢 GREEN = Minor (walking wounded)                       ║
║  ⚫ BLACK = Expectant (unlikely to survive)               ║
╚════════════════════════════════════════════════════════════╝
`;

export default {
  TRIAGE_CATEGORIES,
  START_TRIAGE_ALGORITHM,
  JUMPSTART_PEDIATRIC_TRIAGE,
  SALT_TRIAGE_ALGORITHM,
  performSTARTTriage,
  MCI_RESPONSE_CHECKLIST,
  HOSPITAL_SURGE_LEVELS,
  TRIAGE_REGIONAL_ADAPTATIONS,
  START_TRIAGE_QUICK_CARD
};
