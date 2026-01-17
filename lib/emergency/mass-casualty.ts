/**
 * Mass Casualty Incident (MCI) Management
 * Protocols for multi-victim events and disaster response
 *
 * Darwin-MFC Emergency System
 * For healthcare workers in resource-limited settings
 */

// ============================================================================
// TYPES
// ============================================================================

export interface MCIProtocol {
  id: string;
  name: string;
  phase: 'preparation' | 'activation' | 'response' | 'recovery';
  objectives: string[];
  keyPersonnel: PersonnelRole[];
  procedures: MCIProcedure[];
  resourceManagement: ResourcePlan;
  communicationPlan: CommunicationPlan;
  documentationRequirements: string[];
}

export interface PersonnelRole {
  role: string;
  responsibilities: string[];
  reportingTo: string;
  authority: string[];
}

export interface MCIProcedure {
  name: string;
  when: string;
  steps: string[];
  resources: string[];
  pitfalls: string[];
}

export interface ResourcePlan {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
  requests: RequestChannel[];
}

export interface RequestChannel {
  type: string;
  contact: string;
  responseTime: string;
}

export interface CommunicationPlan {
  internalChannels: string[];
  externalChannels: string[];
  mediaProtocol: string[];
  familyNotification: string[];
}

export interface MCIScenario {
  type: string;
  characteristics: string[];
  expectedCasualties: string;
  uniqueChallenges: string[];
  priorityActions: string[];
}

// ============================================================================
// MCI INCIDENT COMMAND SYSTEM (ICS)
// ============================================================================

export const INCIDENT_COMMAND_STRUCTURE = {
  name: 'Hospital Incident Command System (HICS)',
  positions: [
    {
      role: 'Incident Commander',
      responsibilities: [
        'Overall authority for incident response',
        'Activate hospital emergency operations plan',
        'Establish command post',
        'Interface with external agencies',
        'Make strategic decisions'
      ],
      reportingTo: 'Hospital Administration',
      authority: ['Declare disaster', 'Authorize surge protocols', 'Request external resources']
    },
    {
      role: 'Operations Section Chief',
      responsibilities: [
        'Direct all tactical operations',
        'Manage patient care areas',
        'Coordinate treatment resources',
        'Establish treatment areas'
      ],
      reportingTo: 'Incident Commander',
      authority: ['Assign clinical staff', 'Open surge areas', 'Direct patient flow']
    },
    {
      role: 'Planning Section Chief',
      responsibilities: [
        'Track patient census and resources',
        'Develop action plans',
        'Document situation status',
        'Plan for next operational period'
      ],
      reportingTo: 'Incident Commander',
      authority: ['Access all data', 'Convene planning meetings']
    },
    {
      role: 'Logistics Section Chief',
      responsibilities: [
        'Manage supplies and equipment',
        'Coordinate transportation',
        'Ensure facility services',
        'Support staff needs'
      ],
      reportingTo: 'Incident Commander',
      authority: ['Procure resources', 'Activate contracts', 'Assign support staff']
    },
    {
      role: 'Finance/Administration Section Chief',
      responsibilities: [
        'Track costs and expenditures',
        'Document personnel time',
        'Manage contracts',
        'Coordinate with payroll/HR'
      ],
      reportingTo: 'Incident Commander',
      authority: ['Authorize emergency purchases', 'Process emergency contracts']
    },
    {
      role: 'Medical/Technical Specialist',
      responsibilities: [
        'Provide expert guidance',
        'Advise on clinical protocols',
        'Liaison with specialists'
      ],
      reportingTo: 'Incident Commander',
      authority: ['Recommend clinical protocols']
    },
    {
      role: 'Public Information Officer',
      responsibilities: [
        'Coordinate media relations',
        'Prepare public statements',
        'Manage social media',
        'Interface with external PIOs'
      ],
      reportingTo: 'Incident Commander',
      authority: ['Release approved information']
    },
    {
      role: 'Liaison Officer',
      responsibilities: [
        'Coordinate with external agencies',
        'Facilitate interagency cooperation',
        'Manage mutual aid'
      ],
      reportingTo: 'Incident Commander',
      authority: ['Negotiate resources', 'Establish agreements']
    },
    {
      role: 'Safety Officer',
      responsibilities: [
        'Monitor safety conditions',
        'Identify hazards',
        'Implement safety measures',
        'Authority to stop unsafe actions'
      ],
      reportingTo: 'Incident Commander',
      authority: ['Stop unsafe operations', 'Evacuate areas']
    }
  ]
};

// ============================================================================
// MCI ACTIVATION AND INITIAL RESPONSE
// ============================================================================

export const MCI_ACTIVATION_PROTOCOL: MCIProtocol = {
  id: 'mci-activation',
  name: 'MCI Activation Protocol',
  phase: 'activation',

  objectives: [
    'Rapidly activate emergency response',
    'Establish command structure',
    'Prepare for patient surge',
    'Communicate to all stakeholders',
    'Maximize use of available resources'
  ],

  keyPersonnel: INCIDENT_COMMAND_STRUCTURE.positions,

  procedures: [
    {
      name: 'Initial Notification',
      when: 'Upon learning of MCI',
      steps: [
        'Receive notification (EMS, 911, direct)',
        'Gather initial information: type, location, estimated casualties',
        'Notify hospital administrator on-call',
        'Activate emergency call tree',
        'Consider activation level (Level 1/2/3)'
      ],
      resources: ['Emergency notification system', 'Call lists'],
      pitfalls: ['Incomplete information', 'Delayed activation', 'Communication failures']
    },
    {
      name: 'Command Center Activation',
      when: 'Within 15 minutes of notification',
      steps: [
        'Open Hospital Command Center (HCC)',
        'Incident Commander arrives and assumes command',
        'Establish communication links',
        'Activate section chiefs as needed',
        'Begin logging all actions'
      ],
      resources: ['HCC equipment', 'Communication devices', 'Job action sheets'],
      pitfalls: ['No designated space', 'Communication equipment failure', 'Untrained personnel']
    },
    {
      name: 'Clinical Area Preparation',
      when: 'Concurrent with command activation',
      steps: [
        'Clear ED of non-critical patients',
        'Identify patients for discharge or transfer',
        'Open surge treatment areas',
        'Activate additional staff',
        'Set up triage area at entrance'
      ],
      resources: ['Triage supplies', 'Surge beds', 'Additional staff'],
      pitfalls: ['Delayed bed clearing', 'Insufficient surge capacity', 'Staff not responding']
    }
  ],

  resourceManagement: {
    immediate: [
      'Blood bank notification and preparation',
      'OR availability assessment',
      'Ventilator and monitor inventory',
      'Medication cache access',
      'Personal protective equipment'
    ],
    shortTerm: [
      'Staff call-back',
      'Supply reorder',
      'Transportation coordination',
      'Food and water for staff'
    ],
    longTerm: [
      'Mutual aid agreements',
      'State/federal resource requests',
      'Volunteer management',
      'Mental health support'
    ],
    requests: [
      { type: 'Blood products', contact: 'Blood bank manager', responseTime: '30 minutes' },
      { type: 'Additional staff', contact: 'Nursing supervisor', responseTime: '1-2 hours' },
      { type: 'External resources', contact: 'Liaison officer', responseTime: 'Variable' }
    ]
  },

  communicationPlan: {
    internalChannels: [
      'Overhead paging system',
      'Internal radio network',
      'Mass notification system',
      'In-person runners (backup)'
    ],
    externalChannels: [
      'EMS radio',
      'Hospital-to-hospital network',
      'Emergency management radio',
      'Phone/cell (backup)'
    ],
    mediaProtocol: [
      'All media inquiries to PIO only',
      'No staff interviews without approval',
      'Prepared statements only',
      'Regular press briefings if needed'
    ],
    familyNotification: [
      'Establish family reception area',
      'Provide regular updates',
      'Patient tracking system',
      'Mental health support available'
    ]
  },

  documentationRequirements: [
    'All patients receive MCI tracking tag',
    'Triage category documented',
    'Treatments documented (even briefly)',
    'Disposition tracked',
    'Time-stamped activity log',
    'Resource utilization tracked'
  ]
};

// ============================================================================
// SURGE CAPACITY MANAGEMENT
// ============================================================================

export const SURGE_CAPACITY_PROTOCOL: MCIProtocol = {
  id: 'surge-capacity',
  name: 'Hospital Surge Capacity Protocol',
  phase: 'response',

  objectives: [
    'Expand treatment capacity rapidly',
    'Maintain quality of care',
    'Protect ongoing operations',
    'Sustain surge as long as needed'
  ],

  keyPersonnel: [
    {
      role: 'Surge Coordinator',
      responsibilities: [
        'Identify surge areas',
        'Coordinate bed management',
        'Track capacity in real-time',
        'Authorize surge activations'
      ],
      reportingTo: 'Operations Section Chief',
      authority: ['Open surge areas', 'Authorize discharges']
    }
  ],

  procedures: [
    {
      name: 'Immediate Bed Creation',
      when: 'Within 30 minutes',
      steps: [
        'Cancel elective procedures',
        'Identify patients for immediate discharge',
        'Convert single rooms to doubles',
        'Open hallway/holding spaces',
        'Deploy stretchers in surge areas'
      ],
      resources: ['Stretchers', 'Monitors', 'Oxygen equipment'],
      pitfalls: ['Insufficient equipment', 'Staff resistance', 'Patient complaints']
    },
    {
      name: 'Staff Surge',
      when: 'Within 1-2 hours',
      steps: [
        'Activate staff callback',
        'Extend current shifts',
        'Reassign non-clinical staff',
        'Request mutual aid staffing',
        'Activate volunteer protocols'
      ],
      resources: ['Call lists', 'Credentialing files', 'Volunteer database'],
      pitfalls: ['Staff fatigue', 'Credentialing delays', 'Communication failures']
    },
    {
      name: 'Supply Surge',
      when: 'Ongoing',
      steps: [
        'Access emergency supply cache',
        'Activate emergency procurement',
        'Implement conservation measures',
        'Request resupply from partners',
        'Track consumption rates'
      ],
      resources: ['Emergency supplies', 'Procurement contacts', 'Inventory system'],
      pitfalls: ['Stockpile not maintained', 'Supply chain disruption', 'Hoarding']
    }
  ],

  resourceManagement: {
    immediate: [
      '50% capacity increase in first hour',
      'Blood products for 20 trauma patients',
      'Ventilators: identify all available',
      'OR: 4 rooms within 30 minutes'
    ],
    shortTerm: [
      '100% capacity increase by 4 hours',
      'Staff callback complete by 4 hours',
      'Supply resupply initiated'
    ],
    longTerm: [
      '150%+ capacity for sustained event',
      'Rotation schedules established',
      'External resources integrated'
    ],
    requests: [
      { type: 'Surge supplies', contact: 'Logistics Chief', responseTime: '1 hour' },
      { type: 'Additional beds', contact: 'Surge Coordinator', responseTime: '30 minutes' },
      { type: 'Transfer capacity', contact: 'Regional coordinator', responseTime: '2 hours' }
    ]
  },

  communicationPlan: {
    internalChannels: ['Bed board system', 'Capacity hotline', 'Radio network'],
    externalChannels: ['Regional bed tracking', 'Mutual aid network'],
    mediaProtocol: ['Capacity updates through PIO only'],
    familyNotification: ['Waiting area capacity status', 'Expected delays communication']
  },

  documentationRequirements: [
    'Real-time bed tracking',
    'Staff assignments logged',
    'Supply usage documented',
    'Transfers tracked'
  ]
};

// ============================================================================
// TRIAGE OFFICER PROTOCOL
// ============================================================================

export const TRIAGE_OFFICER_PROTOCOL = {
  role: 'Triage Officer',
  location: 'Main entrance/triage point',
  authority: 'Assign triage categories, direct patient flow',

  responsibilities: [
    'Perform rapid START/JumpSTART triage',
    'Assign triage categories',
    'Direct patients to treatment areas',
    'Identify and prioritize critical patients',
    'Maintain triage documentation'
  ],

  triageArea: {
    setup: [
      'Designate triage point (outside ED if possible)',
      'Set up color-coded treatment areas',
      'Ensure adequate lighting',
      'Have triage tags/supplies ready',
      'Establish flow pattern'
    ],
    equipment: [
      'Triage tags (color-coded)',
      'Triage tape',
      'Markers',
      'Patient tracking forms',
      'PPE',
      'Radio/communication device'
    ]
  },

  patientFlow: {
    red_immediate: 'Direct to resuscitation area immediately',
    yellow_delayed: 'Direct to delayed treatment area',
    green_minor: 'Direct to minor treatment area (may be outside)',
    black_expectant: 'Direct to expectant area (separate, with comfort care)'
  },

  reTriageGuidelines: [
    'Re-triage if patient deteriorates',
    'Re-triage when resources become available',
    'Re-triage at each treatment point',
    'Document all triage changes'
  ],

  commonChallenges: [
    { challenge: 'Overwhelmed by volume', solution: 'Request additional triage officers, simplify to color-only' },
    { challenge: 'Families interfering', solution: 'Establish family area, assign family liaison' },
    { challenge: 'Walk-ins bypassing triage', solution: 'Security at all entrances, physical barriers' },
    { challenge: 'Disagreement on category', solution: 'Err on side of higher acuity, re-triage quickly' }
  ]
};

// ============================================================================
// MCI SCENARIO-SPECIFIC GUIDANCE
// ============================================================================

export const MCI_SCENARIOS: MCIScenario[] = [
  {
    type: 'Mass Shooting / Active Shooter',
    characteristics: [
      'Multiple penetrating trauma victims',
      'Ongoing threat may delay EMS access',
      'Witnesses/survivors with psychological trauma',
      'Potential for secondary devices/threats'
    ],
    expectedCasualties: '10-100+ depending on event',
    uniqueChallenges: [
      'Hospital security concerns',
      'Law enforcement investigation',
      'Media intense interest',
      'Massive psychological impact'
    ],
    priorityActions: [
      'Lockdown/secure facility',
      'Trauma team activation',
      'Blood bank massive transfusion protocol',
      'Coordinate with law enforcement',
      'Establish family assistance center'
    ]
  },
  {
    type: 'Motor Vehicle Collision (Multi-Victim)',
    characteristics: [
      'Blunt and penetrating trauma',
      'Extrication delays',
      'Mix of adult and pediatric patients',
      'Spinal precautions common'
    ],
    expectedCasualties: '5-30 depending on event',
    uniqueChallenges: [
      'Extrication time varies',
      'Patient arrival in waves',
      'May involve buses/vans with many passengers'
    ],
    priorityActions: [
      'Clear trauma bays',
      'Prepare for multiple C-spine precautions',
      'Have pediatric equipment ready',
      'Coordinate with multiple EMS agencies'
    ]
  },
  {
    type: 'Building Collapse',
    characteristics: [
      'Crush injuries',
      'Prolonged extrication (hours to days)',
      'Delayed presentations',
      'Dust/debris inhalation injuries'
    ],
    expectedCasualties: 'Variable, may be ongoing',
    uniqueChallenges: [
      'Extended operational period',
      'Crush syndrome risk',
      'Ongoing search and rescue',
      'Structural engineering needs'
    ],
    priorityActions: [
      'Prepare for crush injuries (dialysis, fasciotomy)',
      'Establish sustained operations plan',
      'Nephrology consultation',
      'Coordinate with search and rescue'
    ]
  },
  {
    type: 'HAZMAT / Chemical Incident',
    characteristics: [
      'Contaminated patients',
      'Respiratory symptoms prominent',
      'Potential for secondary contamination',
      'May not know agent initially'
    ],
    expectedCasualties: 'Highly variable',
    uniqueChallenges: [
      'Decontamination requirements',
      'Staff safety concerns',
      'Unknown agent identification',
      'Antidote availability'
    ],
    priorityActions: [
      'Activate decontamination',
      'PPE for all staff',
      'Identify and isolate contaminated zone',
      'Contact Poison Control',
      'Request antidote supplies'
    ]
  },
  {
    type: 'Explosion / Blast',
    characteristics: [
      'Primary, secondary, tertiary, quaternary blast injuries',
      'Burns and inhalation injuries',
      'Penetrating trauma from fragments',
      'Tympanic membrane rupture common'
    ],
    expectedCasualties: 'Depends on scale, can be massive',
    uniqueChallenges: [
      'Multiple injury mechanisms',
      'Blast lung may have delayed presentation',
      'Secondary explosion risk',
      'Burns compounding trauma'
    ],
    priorityActions: [
      'Trauma and burn team activation',
      'Prepare for blast lung (avoid positive pressure ventilation if possible)',
      'Burn center coordination',
      'Security for secondary device risk'
    ]
  },
  {
    type: 'Infectious Disease Outbreak',
    characteristics: [
      'Progressive surge over days/weeks',
      'Infection control critical',
      'Staff illness risk',
      'Isolation requirements'
    ],
    expectedCasualties: 'Progressive surge',
    uniqueChallenges: [
      'Sustaining operations over extended period',
      'PPE consumption',
      'Staff illness reducing workforce',
      'Isolation capacity'
    ],
    priorityActions: [
      'Establish isolation protocols',
      'PPE conservation strategy',
      'Staff health monitoring',
      'Consider alternate care sites'
    ]
  }
];

// ============================================================================
// QUICK REFERENCE
// ============================================================================

export const MCI_QUICK_REFERENCE = {
  activation_triggers: [
    '5+ critical patients expected',
    'Hospital capacity exceeded or threatened',
    'Declared disaster or MCI by authorities',
    'Request from EMS/emergency management'
  ],
  immediate_actions: [
    'Activate incident command',
    'Clear ED of non-critical patients',
    'Call back staff',
    'Open surge areas',
    'Establish triage point'
  ],
  triage_times: {
    start_per_patient: '30-60 seconds',
    jumpstart_per_patient: '60 seconds',
    reassessment: 'Every 10-15 minutes'
  },
  surge_targets: {
    immediate: '50% capacity increase in 1 hour',
    short_term: '100% capacity increase by 4 hours',
    sustained: '150%+ capacity for prolonged events'
  },
  communication_priorities: [
    'Internal staff notification',
    'EMS coordination',
    'Administration/leadership',
    'Regional healthcare partners',
    'Media (through PIO only)'
  ],
  common_mistakes: [
    'Delayed activation (waiting for certainty)',
    'Treating patients before triage complete',
    'Poor communication/radio discipline',
    'Not tracking patients',
    'Staff freelancing (not following ICS)',
    'Ignoring staff needs (food, rest, support)'
  ]
};

// ============================================================================
// PEDIATRIC MCI CONSIDERATIONS
// ============================================================================

export const PEDIATRIC_MCI_CONSIDERATIONS = {
  triage: {
    method: 'JumpSTART triage for children',
    differences: [
      'Higher respiratory rates normal',
      '5 rescue breaths before declaring expectant',
      'Capillary refill replaces radial pulse',
      'AVPU mental status assessment'
    ]
  },
  treatment: {
    priorities: [
      'Weight-based dosing essential',
      'Smaller IV access challenges',
      'Consider IO early',
      'Hypothermia risk higher',
      'Family presence/psychological support'
    ]
  },
  equipment: {
    broselow_tape: 'Keep readily available for rapid weight estimation',
    pediatric_crash_cart: 'Ensure stocked and accessible',
    age_appropriate: 'ETT, IV, medications sized for children'
  },
  reunification: {
    priority: 'High priority for family reunification',
    tracking: 'Separate pediatric tracking system',
    support: 'Child life specialists, social work'
  }
};

// ============================================================================
// RESOURCE-LIMITED ADAPTATIONS
// ============================================================================

export const RESOURCE_LIMITED_MCI = {
  principles: [
    'Do the most good for the most people',
    'Use crisis standards of care when needed',
    'Improvise with available resources',
    'Prioritize life-saving interventions'
  ],
  adaptations: {
    triage: 'Paper tags, tape marking, or counting numbers',
    treatment_areas: 'Any available space with lighting',
    documentation: 'Minimal documentation, focus on care',
    communication: 'Runners if no radios available'
  },
  crisis_standards: {
    activation: 'When resources clearly insufficient for all patients',
    principles: [
      'Shift from individual to population focus',
      'Allocate resources to maximize benefit',
      'Document decisions',
      'Reassess frequently'
    ],
    examples: [
      'Single-dose medications for multiple patients',
      'Sharing oxygen supplies',
      'Earlier discharge criteria',
      'Expectant category expansion'
    ]
  }
};

// ============================================================================
// DEMOBILIZATION
// ============================================================================

export const DEMOBILIZATION_PROTOCOL = {
  triggers: [
    'Patient flow normalized',
    'Resources stabilized',
    'No anticipated additional casualties',
    'Operations can return to normal'
  ],
  steps: [
    'Incident Commander authorizes demobilization',
    'Return borrowed/mutual aid resources',
    'Document final patient dispositions',
    'Debrief all participants',
    'Restock supplies',
    'Reset for next event',
    'Prepare after-action report'
  ],
  debriefing: {
    hot_debrief: 'Immediately after event (15-30 min)',
    cold_debrief: 'Detailed review within 1-2 weeks',
    topics: [
      'What went well',
      'What could be improved',
      'Equipment/supply issues',
      'Communication effectiveness',
      'Staff performance',
      'Patient outcomes'
    ]
  },
  documentation: [
    'Total patients treated',
    'Triage categories',
    'Deaths',
    'Resources consumed',
    'Costs incurred',
    'Timeline of events',
    'Lessons learned'
  ],
  staff_support: [
    'Psychological first aid available',
    'Critical incident stress debriefing',
    'Employee assistance program referrals',
    'Follow-up check-ins'
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const MCI_PROTOCOLS = {
  activation: MCI_ACTIVATION_PROTOCOL,
  surge: SURGE_CAPACITY_PROTOCOL,
  incidentCommand: INCIDENT_COMMAND_STRUCTURE,
  triageOfficer: TRIAGE_OFFICER_PROTOCOL,
  scenarios: MCI_SCENARIOS,
  pediatric: PEDIATRIC_MCI_CONSIDERATIONS,
  resourceLimited: RESOURCE_LIMITED_MCI,
  demobilization: DEMOBILIZATION_PROTOCOL,
  quickReference: MCI_QUICK_REFERENCE
} as const;

export function getMCIScenario(type: string): MCIScenario | undefined {
  return MCI_SCENARIOS.find(s => s.type.toLowerCase().includes(type.toLowerCase()));
}

export function getICCPosition(role: string) {
  return INCIDENT_COMMAND_STRUCTURE.positions.find(p =>
    p.role.toLowerCase().includes(role.toLowerCase())
  );
}
