/**
 * Conflict Zone Emergency Protocols
 * Protocols for blast injuries, ballistic trauma, and crisis situations
 *
 * References:
 * - ICRC War Surgery Manual (2020)
 * - Tactical Combat Casualty Care (TCCC) Guidelines (2021)
 * - WHO Emergency Care in Armed Conflict (2022)
 * - MSF Clinical Guidelines (2020)
 * - Joint Trauma System Clinical Practice Guidelines
 *
 * For healthcare workers in conflict zones, unstable regions, and mass casualty events
 */

// Custom interfaces for conflict zone protocols
export interface ConflictZoneProtocol {
  id: string;
  name: string;
  category: string;
  severity: 'critical' | 'emergent' | 'urgent';
  description: string;
  initialAssessment: string[];
  steps: ConflictZoneStep[];
  medications: ConflictZoneMedication[];
  equipment: string[];
  monitoring: string[];
  contraindications: string[];
  complications: string[];
  references: string[];
}

export interface ConflictZoneStep {
  order: number;
  action: string;
  details: string[];
  timeframe: string;
  critical: boolean;
}

export interface ConflictZoneMedication {
  name: string;
  dose: string;
  route: string;
  frequency: string;
  notes: string;
}

export interface RegionalAdaptation {
  region: string;
  considerations: string[];
  resourceAlternatives: Record<string, string>;
  languageSupport: string[];
}

// ============================================================================
// BLAST INJURY MANAGEMENT
// ============================================================================

export interface BlastInjuryAssessment {
  mechanism: BlastMechanism;
  primaryInjuries: PrimaryBlastInjury[];
  secondaryInjuries: SecondaryBlastInjury[];
  tertiaryInjuries: TertiaryBlastInjury[];
  quaternaryInjuries: QuaternaryBlastInjury[];
  triageCategory: 'immediate' | 'delayed' | 'minimal' | 'expectant';
}

export type BlastMechanism = 'explosive_device' | 'ied' | 'artillery' | 'landmine' | 'grenade' | 'vbied';

export type PrimaryBlastInjury =
  | 'blast_lung' // Pulmonary barotrauma
  | 'blast_ear' // Tympanic membrane rupture
  | 'blast_gi' // GI perforation
  | 'blast_eye' // Ocular barotrauma
  | 'air_embolism';

export type SecondaryBlastInjury =
  | 'penetrating_fragment'
  | 'shrapnel'
  | 'traumatic_amputation'
  | 'open_fracture'
  | 'vascular_injury';

export type TertiaryBlastInjury =
  | 'blunt_trauma'
  | 'crush_injury'
  | 'closed_fracture'
  | 'traumatic_brain_injury';

export type QuaternaryBlastInjury =
  | 'burns'
  | 'inhalation_injury'
  | 'chemical_exposure'
  | 'radiation';

/**
 * Blast Lung Injury Protocol
 * Most common fatal primary blast injury
 */
export const BLAST_LUNG_PROTOCOL: ConflictZoneProtocol = {
  id: 'blast-lung',
  name: 'Blast Lung Injury',
  category: 'trauma',
  severity: 'critical',
  description: 'Primary blast injury to lungs causing pulmonary contusion, hemorrhage, and potential air embolism',

  initialAssessment: [
    'Mechanism: proximity to blast, enclosed space increases severity',
    'Symptoms may be delayed 24-48 hours',
    'Triad: dyspnea, cough, hemoptysis',
    'Check for tympanic membrane rupture (indicates significant blast exposure)',
    'Respiratory distress without obvious chest trauma = suspect blast lung'
  ],

  steps: [
    {
      order: 1,
      action: 'Position and Oxygen',
      details: [
        'Elevate head 30-45 degrees if no spinal injury concern',
        'HIGH-FLOW oxygen (target SpO2 >94%)',
        'Do NOT use positive pressure ventilation initially if possible (risk of air embolism)',
        'If intubation required: use low tidal volumes (6ml/kg), avoid high PEEP'
      ],
      timeframe: 'Immediate',
      critical: true
    },
    {
      order: 2,
      action: 'IV Access and Monitoring',
      details: [
        'Large bore IV access (avoid overhydration)',
        'Conservative fluid resuscitation: target MAP >65, avoid fluid overload',
        'Permissive hypotension acceptable if hemorrhage controlled',
        'Continuous SpO2 monitoring'
      ],
      timeframe: '0-5 minutes',
      critical: true
    },
    {
      order: 3,
      action: 'Chest Assessment',
      details: [
        'Bilateral breath sounds assessment',
        'Look for pneumothorax (hyperresonance, decreased breath sounds)',
        'Consider prophylactic chest tube if positive pressure ventilation needed',
        'Serial chest X-rays if available'
      ],
      timeframe: '5-15 minutes',
      critical: true
    },
    {
      order: 4,
      action: 'Manage Complications',
      details: [
        'Tension pneumothorax: needle decompression then chest tube',
        'Hemothorax: chest tube drainage',
        'Air embolism prevention: avoid positive pressure, keep supine/head down if suspected',
        'Bronchospasm: nebulized bronchodilators'
      ],
      timeframe: 'Ongoing',
      critical: true
    },
    {
      order: 5,
      action: 'Transfer Considerations',
      details: [
        'CONTRAINDICATION: Air evacuation (fixed-wing aircraft) within 72 hours',
        'Air transport can cause expansion of air in tissues and pneumothorax',
        'If air transport unavoidable: fly at lowest safe altitude, ensure chest tubes patent',
        'Ground evacuation preferred'
      ],
      timeframe: 'When stabilized',
      critical: true
    }
  ],

  medications: [
    {
      name: 'Oxygen',
      dose: 'High-flow',
      route: 'Inhalation',
      frequency: 'Continuous',
      notes: 'Target SpO2 >94%'
    },
    {
      name: 'Ketamine',
      dose: '0.5-1 mg/kg',
      route: 'IV',
      frequency: 'For sedation/analgesia',
      notes: 'Preferred for hemodynamically unstable patients'
    },
    {
      name: 'Salbutamol',
      dose: '2.5-5 mg',
      route: 'Nebulized',
      frequency: 'Every 4-6 hours PRN',
      notes: 'For bronchospasm'
    }
  ],

  equipment: [
    'Oxygen source and delivery devices',
    'Pulse oximeter',
    'IV access supplies',
    'Chest tube kit (14-16 French)',
    'Needle decompression kit (14G needle)',
    'BVM with PEEP valve'
  ],

  monitoring: [
    'Continuous SpO2',
    'Respiratory rate every 15 minutes',
    'Serial chest exams',
    'Urine output (if catheterized)',
    'Mental status'
  ],

  contraindications: [
    'Avoid high PEEP in mechanically ventilated patients',
    'Avoid positive pressure ventilation if possible',
    'NO air evacuation within 72 hours',
    'Avoid aggressive fluid resuscitation'
  ],

  complications: [
    'Air embolism (can be fatal - worse with positive pressure)',
    'Tension pneumothorax',
    'ARDS development',
    'Pulmonary hemorrhage',
    'Death (mortality 10-50%)'
  ],

  references: [
    'ICRC War Surgery Manual 2020',
    'Blast Injury Guidelines - Joint Trauma System',
    'WHO Emergency Care in Armed Conflict'
  ]
};

/**
 * Ballistic (Gunshot) Wound Protocol
 */
export const BALLISTIC_TRAUMA_PROTOCOL: ConflictZoneProtocol = {
  id: 'ballistic-trauma',
  name: 'Ballistic Trauma (Gunshot Wounds)',
  category: 'trauma',
  severity: 'critical',
  description: 'Management of penetrating trauma from projectile weapons',

  initialAssessment: [
    'SCENE SAFETY: Ensure active shooter threat neutralized',
    'Apply TCCC principles: Massive hemorrhage, Airway, Respiration, Circulation, Hypothermia',
    'Count entrance AND exit wounds (exit often larger)',
    'Assess trajectory to predict organ involvement',
    'High-velocity vs low-velocity: determines tissue destruction'
  ],

  steps: [
    {
      order: 1,
      action: 'MASSIVE HEMORRHAGE Control (M)',
      details: [
        'TOURNIQUET for extremity hemorrhage - high and tight',
        'Note time of application',
        'For junctional/truncal wounds: wound packing with hemostatic gauze',
        'Direct pressure if no hemostatic agents available',
        'Pelvic binder for suspected pelvic fracture'
      ],
      timeframe: 'Immediate - First priority',
      critical: true
    },
    {
      order: 2,
      action: 'AIRWAY Management (A)',
      details: [
        'If unconscious: jaw thrust, recovery position',
        'Surgical airway (cricothyrotomy) if facial trauma prevents oral airway',
        'Nasopharyngeal airway if unconscious but breathing'
      ],
      timeframe: '0-2 minutes',
      critical: true
    },
    {
      order: 3,
      action: 'RESPIRATION (R)',
      details: [
        'Expose chest - look for penetrating wounds',
        'SEAL open chest wound with occlusive dressing (3-sided tape)',
        'Tension pneumothorax: needle decompression 2nd ICS MCL or 5th ICS AAL',
        'Chest seal with valve if available'
      ],
      timeframe: '2-5 minutes',
      critical: true
    },
    {
      order: 4,
      action: 'CIRCULATION (C)',
      details: [
        'IV/IO access',
        'Tranexamic acid (TXA) 1g IV if within 3 hours of injury',
        'Permissive hypotension: target SBP 90 (or radial pulse palpable)',
        'Exception: target SBP 100-110 if TBI suspected',
        'Warmed fluids if available'
      ],
      timeframe: '5-15 minutes',
      critical: true
    },
    {
      order: 5,
      action: 'HYPOTHERMIA Prevention (H)',
      details: [
        'Remove wet clothing',
        'Cover with blankets/space blanket',
        'Warm IV fluids if possible',
        'Minimize patient exposure during exam'
      ],
      timeframe: 'Ongoing',
      critical: true
    },
    {
      order: 6,
      action: 'Wound Management',
      details: [
        'DO NOT remove penetrating objects (stabilize in place)',
        'DO NOT probe wounds',
        'Cover wounds with sterile dressing',
        'Splint fractures',
        'Tetanus prophylaxis',
        'Antibiotics: Cefazolin 2g IV (add metronidazole if abdominal)'
      ],
      timeframe: 'After hemorrhage control',
      critical: false
    }
  ],

  medications: [
    {
      name: 'Tranexamic Acid (TXA)',
      dose: '1g IV over 10 min, then 1g over 8 hours',
      route: 'IV',
      frequency: 'Single course',
      notes: 'MUST give within 3 hours of injury. Reduces mortality by 30%'
    },
    {
      name: 'Ketamine',
      dose: '20-50 mg IV or 50-100 mg IM',
      route: 'IV/IM',
      frequency: 'PRN for pain',
      notes: 'Preferred analgesic - maintains BP and airway reflexes'
    },
    {
      name: 'Cefazolin',
      dose: '2g',
      route: 'IV',
      frequency: 'Single dose',
      notes: 'Antibiotic prophylaxis for penetrating trauma'
    },
    {
      name: 'Metronidazole',
      dose: '500mg',
      route: 'IV',
      frequency: 'Add if abdominal involvement',
      notes: 'For anaerobic coverage'
    }
  ],

  equipment: [
    'Tourniquets (CAT, SOFT-T)',
    'Hemostatic gauze (QuikClot, Celox)',
    'Chest seals (Hyfin, Asherman)',
    'Needle decompression kit',
    'Pelvic binder',
    'IV/IO supplies',
    'Hypothermia prevention kit'
  ],

  monitoring: [
    'Tourniquet time (convert within 2 hours if possible)',
    'Respiratory status',
    'Mental status (GCS)',
    'Pulse strength and rate',
    'Urine output if catheterized'
  ],

  contraindications: [
    'Do not remove impaled objects',
    'Do not give TXA after 3 hours',
    'Avoid aggressive fluid resuscitation (permissive hypotension)'
  ],

  complications: [
    'Exsanguination',
    'Tension pneumothorax',
    'Compartment syndrome (from tourniquet)',
    'Infection',
    'Missed injuries'
  ],

  references: [
    'Tactical Combat Casualty Care Guidelines 2021',
    'ICRC War Surgery Manual',
    'CRASH-2 Trial (TXA)'
  ]
};

/**
 * Tourniquet Application Guidelines
 */
export const TOURNIQUET_PROTOCOL = {
  indications: [
    'Life-threatening extremity hemorrhage',
    'Traumatic amputation',
    'Multiple casualties (apply liberally, reassess later)',
    'Hemorrhage not controlled by direct pressure'
  ],

  application: {
    steps: [
      '1. Apply tourniquet 2-3 inches ABOVE the wound (high and tight)',
      '2. If over joint, apply ABOVE the joint',
      '3. Tighten until bleeding stops',
      '4. Note TIME of application (write on patient or tourniquet)',
      '5. Do NOT cover tourniquet - must remain visible',
      '6. Do NOT release in field unless instructed by physician'
    ],

    improvised: {
      materials: 'Wide cloth/belt (>2 inches) + rigid object (stick, pen)',
      method: [
        'Wrap material twice around limb above wound',
        'Tie half-knot, place rigid object on top',
        'Complete square knot over object',
        'Twist object until bleeding stops',
        'Secure object in place'
      ],
      warning: 'Improvised tourniquets less effective - commercial preferred'
    }
  },

  timeLimit: {
    safe: '2 hours',
    extended: '6 hours with monitoring',
    note: 'Limb loss risk increases after 2 hours but survival takes priority'
  },

  conversion: {
    when: 'In controlled medical environment, within 2 hours if possible',
    method: [
      'Ensure IV access and blood products available',
      'Loosen tourniquet slowly',
      'Apply direct pressure and wound packing',
      'If bleeding recurs, retighten tourniquet',
      'Do NOT convert in austere environment or if blood products unavailable'
    ]
  }
};

/**
 * Wound Packing for Junctional Hemorrhage
 */
export const WOUND_PACKING_PROTOCOL = {
  indications: [
    'Junctional hemorrhage (neck, axilla, groin)',
    'Truncal wounds not amenable to tourniquet',
    'Deep extremity wounds'
  ],

  technique: [
    '1. Expose wound completely',
    '2. Use hemostatic gauze if available (QuikClot Combat Gauze, Celox)',
    '3. Pack gauze DIRECTLY into wound, deep as possible',
    '4. Pack tightly, filling entire wound cavity',
    '5. Apply direct pressure for minimum 3 minutes',
    '6. Apply pressure dressing over packed wound',
    '7. DO NOT remove packing to check bleeding'
  ],

  hemostaticAgents: {
    kaolin: 'QuikClot Combat Gauze - mineral based, stable',
    chitosan: 'Celox - crustacean derived (shellfish allergy caution)',
    method: 'Same technique - pack deep, hold pressure 3 min minimum'
  }
};

// ============================================================================
// PSYCHOLOGICAL FIRST AID (PFA)
// ============================================================================

export interface PFAAssessment {
  safetyThreats: string[];
  basicNeeds: BasicNeeds;
  distressLevel: DistressLevel;
  copingResources: string[];
  referralNeeded: boolean;
}

export interface BasicNeeds {
  shelter: boolean;
  food: boolean;
  water: boolean;
  medicalCare: boolean;
  familyReunification: boolean;
  information: boolean;
}

export type DistressLevel = 'minimal' | 'mild' | 'moderate' | 'severe' | 'crisis';

/**
 * WHO Psychological First Aid Protocol
 * "Look, Listen, Link"
 */
export const PSYCHOLOGICAL_FIRST_AID_PROTOCOL = {
  id: 'pfa',
  name: 'Psychological First Aid (PFA)',

  principles: {
    look: {
      actions: [
        'Check for safety',
        'Check for people with obvious urgent basic needs',
        'Check for people with serious distress reactions'
      ],
      safetyChecklist: [
        'Ongoing danger (active conflict, structural damage)',
        'Access to harmful means',
        'Crowd control needs',
        'Vulnerable populations (children, elderly, disabled)'
      ]
    },

    listen: {
      actions: [
        'Approach people who may need support',
        'Ask about their needs and concerns',
        'Listen to people and help them feel calm'
      ],
      communication: [
        'Introduce yourself and your role',
        'Find quiet, safe space if possible',
        'Stay near but respect personal space',
        'Use calm, slow voice',
        'Ask simple questions',
        'Accept silence - do not force conversation',
        'Acknowledge their experience',
        'Give honest information in simple terms'
      ],
      donts: [
        'Do NOT pressure to talk',
        'Do NOT interrupt or rush',
        'Do NOT make promises you cannot keep',
        'Do NOT tell them how to feel',
        'Do NOT share their story with others',
        'Do NOT judge their actions or feelings',
        'Do NOT give false reassurance'
      ]
    },

    link: {
      actions: [
        'Help people address basic needs and access services',
        'Help people cope with problems',
        'Give information',
        'Connect people with loved ones and social support'
      ],
      practicalHelp: [
        'Help access food, water, shelter',
        'Help find family members',
        'Provide accurate information about situation',
        'Connect to available services',
        'Help with immediate practical problems'
      ]
    }
  },

  distressReactions: {
    normal: [
      'Shock, disbelief, denial',
      'Fear, anxiety, worry',
      'Anger, irritability',
      'Sadness, grief',
      'Guilt, shame',
      'Confusion, poor concentration',
      'Physical symptoms (headache, fatigue, insomnia)',
      'Social withdrawal'
    ],

    referralIndicators: [
      'Unable to care for self or dependents',
      'Poses danger to self or others',
      'Severe dissociation (staring, unresponsive)',
      'Psychotic symptoms (hallucinations, delusions)',
      'Severe panic attacks',
      'High-risk populations: children alone, elderly, pregnant, disabled'
    ]
  },

  specialPopulations: {
    children: {
      approach: [
        'Get down to eye level',
        'Use simple, concrete language',
        'Allow comfort objects',
        'Reassure they are safe',
        'Reunite with caregivers ASAP'
      ],
      signs: 'Regression, clinginess, nightmares, separation anxiety, play reenactment'
    },

    elderly: {
      approach: [
        'Check hearing/vision needs',
        'Speak clearly and slowly',
        'Provide repeated information',
        'Ensure medication access',
        'Prevent isolation'
      ],
      signs: 'Confusion, disorientation, withdrawal, physical complaints'
    },

    genderBasedViolenceSurvivors: {
      approach: [
        'Ensure privacy and safety',
        'Offer same-gender support if preferred',
        'Believe and validate',
        'Respect their choices',
        'Provide information on available services',
        'Do NOT pressure to report'
      ],
      referral: 'Connect to specialized GBV services when available'
    }
  },

  selfCare: {
    forProviders: [
      'Take breaks - you cannot help if depleted',
      'Work in pairs when possible',
      'Stay hydrated and fed',
      'Limit exposure to traumatic stories',
      'Debrief with colleagues',
      'Recognize your own stress reactions',
      'Seek support if needed'
    ],
    warningSignsInSelf: [
      'Persistent intrusive memories',
      'Difficulty sleeping',
      'Substance use to cope',
      'Isolation from others',
      'Irritability with clients or family',
      'Physical symptoms'
    ]
  }
};

// ============================================================================
// MASS CASUALTY TRIAGE IN CONFLICT
// ============================================================================

/**
 * SALT Triage for Conflict Settings
 * Sort-Assess-Lifesaving Interventions-Treatment/Transport
 */
export const SALT_TRIAGE_CONFLICT = {
  sort: {
    step1_walk: 'Can you walk? → Move to designated area (MINOR - Green)',
    step2_wave: 'Can you wave/follow commands? → Assess second (DELAYED - Yellow)',
    step3_still: 'Still/obvious life threat → Assess first (IMMEDIATE - Red)'
  },

  assess: {
    lifesavingInterventions: [
      'Control major hemorrhage',
      'Open airway (positioning)',
      'Chest seal for open pneumothorax',
      '2 rescue breaths for children'
    ],

    criteria: {
      dead: 'No breathing after airway opened → BLACK',
      expectant: {
        criteria: 'Unlikely to survive given available resources',
        examples: [
          'Severe TBI with posturing',
          'Severe burns (>90% TBSA)',
          'Multiple penetrating trauma with massive hemorrhage uncontrolled'
        ],
        note: 'Expectant is NOT dead - reassess if resources become available'
      },
      immediate: {
        criteria: 'Obeys commands OR has peripheral pulse OR not in distress → RED',
        treatment: 'Immediate life-threatening injury requiring immediate intervention'
      },
      delayed: {
        criteria: 'Following commands, adequate perfusion, can wait for treatment → YELLOW'
      },
      minor: {
        criteria: 'Walking wounded → GREEN'
      }
    }
  },

  resourceScarcity: {
    principle: 'Greatest good for greatest number',
    modifications: [
      'In extreme scarcity, some Immediate patients may become Expectant',
      'When resources become available, re-triage',
      'Document triage decisions',
      'Provide comfort care to Expectant patients'
    ]
  }
};

// ============================================================================
// FIELD AMPUTATION CONSIDERATIONS
// ============================================================================

export const FIELD_AMPUTATION_PROTOCOL = {
  indication: {
    primary: 'Entrapped casualty with life-threatening hemorrhage or crush injury where extrication is impossible or will cause death',
    strict: 'LAST RESORT - only when all other options exhausted'
  },

  prerequisites: [
    'Casualty will die without amputation',
    'Amputation will allow survival and evacuation',
    'Surgical capability available (trained provider)',
    'Consent if conscious (or implied consent if unconscious)',
    'Resources for hemorrhage control post-amputation'
  ],

  procedure: {
    note: 'This is a damage control procedure - not definitive surgery',
    steps: [
      '1. Tourniquet BEFORE amputation if possible',
      '2. Ketamine sedation/analgesia',
      '3. Amputate through zone of injury or at highest tourniquet level',
      '4. Ligate visible vessels',
      '5. Leave wound open - do not close',
      '6. Apply pressure dressing',
      '7. IV antibiotics: Cefazolin 2g + Metronidazole 500mg'
    ]
  },

  postAmputation: [
    'Maintain tourniquet until surgical facility',
    'Fluid resuscitation (permissive hypotension)',
    'Hypothermia prevention',
    'Pain management',
    'Evacuate to surgical facility ASAP'
  ],

  documentation: [
    'Time of injury',
    'Time of tourniquet application',
    'Time of amputation',
    'Level of amputation',
    'Medications given',
    'Provider performing amputation'
  ]
};

// ============================================================================
// QUICK REFERENCE CARDS
// ============================================================================

export const CONFLICT_ZONE_QUICK_REFERENCE = `
╔══════════════════════════════════════════════════════════════════════════╗
║              CONFLICT ZONE EMERGENCY QUICK REFERENCE                     ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║ TCCC/MARCH: Massive hemorrhage → Airway → Respiration → Circulation → H ║
║                                                                          ║
║ MASSIVE HEMORRHAGE:                                                      ║
║   • Tourniquet HIGH and TIGHT for extremity bleeding                     ║
║   • Wound packing with hemostatic gauze for junctional                   ║
║   • Note TIME of tourniquet application                                  ║
║   • TXA 1g IV within 3 hours                                             ║
║                                                                          ║
║ CHEST TRAUMA:                                                            ║
║   • Open wound: 3-sided occlusive dressing or chest seal                 ║
║   • Tension pneumo: decompress 2nd ICS MCL (14G needle)                  ║
║   • Blast lung: NO positive pressure if possible, LOW tidal volume       ║
║   • NO air evacuation within 72 hours of blast lung                      ║
║                                                                          ║
║ BALLISTIC TRAUMA:                                                        ║
║   • Count ALL wounds (entry AND exit)                                    ║
║   • DO NOT remove impaled objects                                        ║
║   • DO NOT probe wounds                                                  ║
║   • Antibiotics: Cefazolin 2g IV (+ Metro if abdominal)                  ║
║                                                                          ║
║ PERMISSIVE HYPOTENSION:                                                  ║
║   • Target SBP 90 (radial pulse palpable)                                ║
║   • Exception: SBP 100-110 if TBI suspected                              ║
║   • Warmed fluids, avoid overresuscitation                               ║
║                                                                          ║
║ TOURNIQUET TIMES:                                                        ║
║   • Safe: <2 hours                                                       ║
║   • Extended: up to 6 hours with monitoring                              ║
║   • Limb loss risk increases but SURVIVAL PRIORITY                       ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║ PSYCHOLOGICAL FIRST AID: LOOK - LISTEN - LINK                            ║
║                                                                          ║
║ LOOK: Safety, urgent needs, serious distress                             ║
║ LISTEN: Approach, ask, listen, help calm                                 ║
║ LINK: Basic needs, coping, information, social support                   ║
║                                                                          ║
║ DO NOT: Pressure to talk, promise what you can't deliver, judge          ║
║                                                                          ║
║ REFER IF: Unable to care for self, danger to self/others,                ║
║           severe dissociation, psychotic symptoms                        ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║ SALT TRIAGE (Conflict):                                                  ║
║                                                                          ║
║ 1. WALK? → MINOR (Green)                                                 ║
║ 2. WAVE? → DELAYED (Yellow)                                              ║
║ 3. STILL? → Assess first → IMMEDIATE (Red) or EXPECTANT (Gray)           ║
║                                                                          ║
║ Lifesaving: Control hemorrhage, open airway, chest seal                  ║
║ Expectant: Unlikely to survive with available resources                  ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
`;

export const BLAST_INJURY_QUICK_REFERENCE = `
╔══════════════════════════════════════════════════════════════════════════╗
║                     BLAST INJURY QUICK REFERENCE                         ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║ BLAST INJURY TYPES:                                                      ║
║                                                                          ║
║ PRIMARY (pressure wave):                                                 ║
║   • Lungs (blast lung) - dyspnea, hemoptysis, may be delayed             ║
║   • Ears (TM rupture) - hearing loss, tinnitus, vertigo                  ║
║   • GI (perforation) - abdominal pain, may be delayed                    ║
║   • Eyes (globe rupture)                                                 ║
║                                                                          ║
║ SECONDARY (fragments):                                                   ║
║   • Penetrating trauma, shrapnel, amputations                            ║
║                                                                          ║
║ TERTIARY (thrown by blast):                                              ║
║   • Blunt trauma, fractures, TBI                                         ║
║                                                                          ║
║ QUATERNARY (other):                                                      ║
║   • Burns, inhalation, chemical, crush                                   ║
║                                                                          ║
╠══════════════════════════════════════════════════════════════════════════╣
║ BLAST LUNG - CRITICAL POINTS:                                            ║
║                                                                          ║
║   ⚠️  TM rupture indicates significant blast exposure                    ║
║   ⚠️  Symptoms may be DELAYED 24-48 hours                                ║
║   ⚠️  AVOID positive pressure ventilation if possible                    ║
║   ⚠️  If ventilating: LOW tidal volume (6ml/kg), LOW PEEP                ║
║   ⚠️  NO AIR EVACUATION within 72 hours                                  ║
║   ⚠️  Air embolism risk with positive pressure                           ║
║                                                                          ║
║ MANAGEMENT:                                                              ║
║   • High-flow oxygen                                                     ║
║   • Position: head up 30-45°                                             ║
║   • Conservative fluids                                                  ║
║   • Watch for tension pneumothorax                                       ║
║   • Ground evacuation preferred                                          ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
`;

// ============================================================================
// REGIONAL ADAPTATIONS
// ============================================================================

export const CONFLICT_ZONE_ADAPTATIONS: Record<string, RegionalAdaptation> = {
  syria: {
    region: 'Syria',
    considerations: [
      'Limited access to blood products',
      'Intermittent electricity - battery-powered equipment essential',
      'Security constraints - rapid evacuation may not be possible',
      'High incidence of explosive injuries',
      'Chemical weapon exposure possibility'
    ],
    resourceAlternatives: {
      tourniquets: 'Improvised from clothing/belts if commercial unavailable',
      chestSeals: 'Plastic sheeting with tape',
      hemostatics: 'Direct pressure with available clean cloth',
      iv_fluids: 'Oral rehydration if IV unavailable'
    },
    languageSupport: ['ar', 'en']
  },

  yemen: {
    region: 'Yemen',
    considerations: [
      'Severe resource scarcity',
      'Malnutrition complicates trauma care',
      'Cholera endemic - water safety critical',
      'Limited surgical capability',
      'Air evacuation often not possible'
    ],
    resourceAlternatives: {
      tourniquets: 'Improvised',
      iv_fluids: 'ORS solution for mild hypovolemia',
      antibiotics: 'Use available broad-spectrum'
    },
    languageSupport: ['ar', 'en']
  },

  ukraine: {
    region: 'Ukraine',
    considerations: [
      'Modern military weapons - high energy transfer',
      'Cold weather - hypothermia major factor',
      'Mine/UXO contamination',
      'Relatively developed medical system but damaged',
      'TCCC training widespread'
    ],
    resourceAlternatives: {
      hypothermia: 'Priority - aggressive warming',
      blood: 'Walking blood bank protocols',
      evacuation: 'Variable - plan for delayed'
    },
    languageSupport: ['uk', 'ru', 'en']
  },

  sudan: {
    region: 'Sudan',
    considerations: [
      'Extreme heat - heat injury and dehydration',
      'Limited infrastructure',
      'Multiple conflict zones',
      'Traditional medicine practices',
      'Malaria endemic'
    ],
    resourceAlternatives: {
      cooling: 'Shade, wet cloths, hydration',
      malaria: 'Presumptive treatment for fever',
      tourniquets: 'Improvised'
    },
    languageSupport: ['ar', 'en']
  },

  gaza: {
    region: 'Gaza',
    considerations: [
      'Extremely limited resources',
      'High casualty volumes',
      'Electricity shortages',
      'Limited evacuation options',
      'Pediatric population significant'
    ],
    resourceAlternatives: {
      everything: 'Maximum improvisation required',
      triage: 'Strict expectant criteria due to scarcity',
      anesthesia: 'Ketamine only if available'
    },
    languageSupport: ['ar', 'en']
  }
};

export default {
  BLAST_LUNG_PROTOCOL,
  BALLISTIC_TRAUMA_PROTOCOL,
  TOURNIQUET_PROTOCOL,
  WOUND_PACKING_PROTOCOL,
  PSYCHOLOGICAL_FIRST_AID_PROTOCOL,
  SALT_TRIAGE_CONFLICT,
  FIELD_AMPUTATION_PROTOCOL,
  CONFLICT_ZONE_QUICK_REFERENCE,
  BLAST_INJURY_QUICK_REFERENCE,
  CONFLICT_ZONE_ADAPTATIONS
};
