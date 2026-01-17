/**
 * Pediatric Emergencies
 * Emergency protocols specifically for children
 *
 * Darwin-MFC Emergency System
 * For healthcare workers in resource-limited settings
 */

// ============================================================================
// TYPES
// ============================================================================

export interface PediatricProtocol {
  id: string;
  name: string;
  ageGroups: AgeGroup[];
  recognition: RecognitionCriteria;
  immediateActions: string[];
  treatmentByAge: TreatmentByAge;
  medications: PediatricMedication[];
  monitoring: PediatricMonitoringParameter[];
  disposition: string;
  parentGuidance: string[];
}

export interface AgeGroup {
  name: 'neonate' | 'infant' | 'toddler' | 'child' | 'adolescent';
  range: string;
  weightEstimate: string;
}

export interface RecognitionCriteria {
  symptoms: string[];
  vitalsByAge: VitalRanges[];
  physicalExam: string[];
  redFlags: string[];
}

export interface VitalRanges {
  ageGroup: string;
  normalHR: string;
  normalRR: string;
  normalSBP: string;
  concerningValues: string;
}

export interface TreatmentByAge {
  general: string[];
  neonate?: string[];
  infant?: string[];
  toddler?: string[];
  child?: string[];
}

export interface PediatricMedication {
  drug: string;
  indication: string;
  dosePerKg: string;
  maxDose: string;
  route: string;
  frequency: string;
  notes: string;
}

export interface PediatricMonitoringParameter {
  parameter: string;
  frequency: string;
  target: string;
}

// ============================================================================
// NORMAL PEDIATRIC VITAL SIGNS
// ============================================================================

export const NORMAL_PEDIATRIC_VITALS: VitalRanges[] = [
  {
    ageGroup: 'Neonate (0-28 days)',
    normalHR: '100-180',
    normalRR: '30-60',
    normalSBP: '60-90',
    concerningValues: 'HR <100 or >180, RR <30 or >60, SBP <60'
  },
  {
    ageGroup: 'Infant (1-12 months)',
    normalHR: '100-160',
    normalRR: '25-50',
    normalSBP: '70-100',
    concerningValues: 'HR <100 or >160, RR >50, SBP <70'
  },
  {
    ageGroup: 'Toddler (1-3 years)',
    normalHR: '90-150',
    normalRR: '20-40',
    normalSBP: '80-110',
    concerningValues: 'HR <90 or >150, RR >40, SBP <80'
  },
  {
    ageGroup: 'Preschool (3-5 years)',
    normalHR: '80-140',
    normalRR: '20-30',
    normalSBP: '85-110',
    concerningValues: 'HR <80 or >140, RR >30, SBP <85'
  },
  {
    ageGroup: 'School age (6-12 years)',
    normalHR: '70-120',
    normalRR: '15-25',
    normalSBP: '90-120',
    concerningValues: 'HR <70 or >120, RR >25, SBP <90'
  },
  {
    ageGroup: 'Adolescent (>12 years)',
    normalHR: '60-100',
    normalRR: '12-20',
    normalSBP: '100-135',
    concerningValues: 'HR <60 or >100, RR >20, SBP <100'
  }
];

// ============================================================================
// PEDIATRIC SHOCK
// ============================================================================

export const PEDIATRIC_SHOCK_PROTOCOL: PediatricProtocol = {
  id: 'pediatric-shock',
  name: 'Pediatric Shock',
  ageGroups: [
    { name: 'neonate', range: '0-28 days', weightEstimate: '3-4 kg' },
    { name: 'infant', range: '1-12 months', weightEstimate: '(age in months + 9) / 2 kg' },
    { name: 'toddler', range: '1-3 years', weightEstimate: '2 x (age + 4) kg' },
    { name: 'child', range: '3-12 years', weightEstimate: '2 x (age + 4) kg' }
  ],

  recognition: {
    symptoms: [
      'Altered mental status (irritability, lethargy)',
      'Decreased urine output',
      'Poor feeding',
      'Weak cry',
      'Mottled skin'
    ],
    vitalsByAge: NORMAL_PEDIATRIC_VITALS,
    physicalExam: [
      'Tachycardia (early, most sensitive sign)',
      'Prolonged capillary refill >3 seconds',
      'Weak peripheral pulses',
      'Cool extremities',
      'Mottled skin',
      'Decreased mental status',
      'Hypotension is a LATE sign in children'
    ],
    redFlags: [
      'Hypotension (SBP <70 + (2 x age) or <90 in adolescents)',
      'Bradycardia (preterminal sign)',
      'Absent peripheral pulses',
      'Unresponsive',
      'Gasping respirations',
      'Central cyanosis'
    ]
  },

  immediateActions: [
    '1. Recognize shock EARLY (do not wait for hypotension)',
    '2. High-flow oxygen',
    '3. IV/IO access (IO if IV not within 90 seconds)',
    '4. Fluid bolus 20 ml/kg isotonic crystalloid',
    '5. Reassess after each bolus',
    '6. Identify and treat cause'
  ],

  treatmentByAge: {
    general: [
      'Fluid bolus: 20 ml/kg NS or LR, push rapidly',
      'Repeat boluses up to 60 ml/kg in first hour',
      'If no response after 40-60 ml/kg: consider pressors',
      'Address underlying cause',
      'Keep warm - prevent hypothermia'
    ],
    neonate: [
      'Consider sepsis - start antibiotics early',
      'Consider congenital heart disease',
      'More sensitive to fluid overload',
      'May need prostaglandin (PGE1) for ductal-dependent lesions'
    ],
    infant: [
      'High risk for dehydration from diarrhea',
      'Consider intussusception, pyloric stenosis',
      'Monitor fontanelle (sunken = dehydration)'
    ],
    child: [
      'Consider trauma, especially abdominal',
      'Anaphylaxis from food/insect allergy common',
      'Diabetic ketoacidosis in known diabetics'
    ]
  },

  medications: [
    {
      drug: 'Normal Saline / Lactated Ringers',
      indication: 'Fluid resuscitation',
      dosePerKg: '20 ml/kg',
      maxDose: 'Up to 60 ml/kg in first hour',
      route: 'IV/IO',
      frequency: 'Rapid push, repeat PRN',
      notes: 'Reassess after each bolus'
    },
    {
      drug: 'Epinephrine',
      indication: 'Fluid-refractory shock',
      dosePerKg: '0.1-1 mcg/kg/min',
      maxDose: 'Titrate to response',
      route: 'IV/IO infusion',
      frequency: 'Continuous',
      notes: 'First-line pressor for cold shock'
    },
    {
      drug: 'Norepinephrine',
      indication: 'Warm shock (vasodilatory)',
      dosePerKg: '0.1-2 mcg/kg/min',
      maxDose: 'Titrate to response',
      route: 'IV/IO infusion',
      frequency: 'Continuous',
      notes: 'Preferred for warm shock'
    },
    {
      drug: 'Dopamine',
      indication: 'Alternative if epi/norepi unavailable',
      dosePerKg: '5-20 mcg/kg/min',
      maxDose: '20 mcg/kg/min',
      route: 'IV/IO infusion',
      frequency: 'Continuous',
      notes: 'Less preferred but widely available'
    },
    {
      drug: 'Hydrocortisone',
      indication: 'Catecholamine-resistant shock',
      dosePerKg: '2 mg/kg',
      maxDose: '100 mg',
      route: 'IV',
      frequency: 'q6h',
      notes: 'Consider in fluid/pressor refractory shock'
    },
    {
      drug: 'Ceftriaxone',
      indication: 'Empiric sepsis coverage',
      dosePerKg: '50-100 mg/kg',
      maxDose: '2g (4g for meningitis)',
      route: 'IV',
      frequency: 'Once daily',
      notes: 'Give within first hour for septic shock'
    }
  ],

  monitoring: [
    { parameter: 'Heart rate', frequency: 'Continuous', target: 'Normal for age' },
    { parameter: 'Blood pressure', frequency: 'q5min in acute phase', target: 'SBP >70 + (2 x age)' },
    { parameter: 'Capillary refill', frequency: 'q15min', target: '<2 seconds' },
    { parameter: 'Urine output', frequency: 'q1h', target: '>1 ml/kg/hr' },
    { parameter: 'Mental status', frequency: 'q15min', target: 'Alert, interactive' },
    { parameter: 'Lactate', frequency: 'q2-4h if available', target: '<2 mmol/L' }
  ],

  disposition: 'All children with shock require ICU admission. Transfer to pediatric center if available.',

  parentGuidance: [
    'Your child is very sick and needs intensive care',
    'We are giving fluids and medicines through an IV',
    'We will monitor your child very closely',
    'It may take time to see improvement'
  ]
};

// ============================================================================
// PEDIATRIC SEPSIS
// ============================================================================

export const PEDIATRIC_SEPSIS_PROTOCOL: PediatricProtocol = {
  id: 'pediatric-sepsis',
  name: 'Pediatric Sepsis',
  ageGroups: [
    { name: 'neonate', range: '0-28 days', weightEstimate: '3-4 kg' },
    { name: 'infant', range: '1-12 months', weightEstimate: '(age in months + 9) / 2 kg' },
    { name: 'child', range: '1-12 years', weightEstimate: '2 x (age + 4) kg' }
  ],

  recognition: {
    symptoms: [
      'Fever OR hypothermia',
      'Tachycardia',
      'Tachypnea',
      'Altered mental status',
      'Poor perfusion (cold extremities, mottling)',
      'Decreased urine output'
    ],
    vitalsByAge: NORMAL_PEDIATRIC_VITALS,
    physicalExam: [
      'Temperature instability (fever >38.5°C or hypothermia <36°C)',
      'Signs of poor perfusion',
      'Petechiae or purpura (concerning for meningococcemia)',
      'Source of infection (pneumonia, UTI, meningitis, cellulitis)',
      'Toxic appearance'
    ],
    redFlags: [
      'Petechial/purpuric rash (meningococcemia)',
      'Bulging fontanelle (meningitis)',
      'Neck stiffness',
      'Hypotension',
      'Need for increasing respiratory support',
      'Lactate >4 mmol/L'
    ]
  },

  immediateActions: [
    '1. Recognize sepsis early - high index of suspicion',
    '2. High-flow oxygen',
    '3. IV/IO access within 5 minutes',
    '4. Blood cultures (do not delay antibiotics for cultures)',
    '5. Antibiotics within 60 MINUTES of recognition',
    '6. Fluid bolus 20 ml/kg',
    '7. Reassess frequently'
  ],

  treatmentByAge: {
    general: [
      'Antibiotics within 1 hour - this is critical',
      'Fluid boluses 20 ml/kg, up to 60 ml/kg',
      'Vasopressors if fluid-refractory',
      'Source control (drain abscesses)',
      'Avoid hypoglycemia - check glucose'
    ],
    neonate: [
      'Ampicillin + Gentamicin (covers GBS, E. coli, Listeria)',
      'Add Cefotaxime if meningitis suspected',
      'Consider HSV - add Acyclovir if risk factors',
      'Very subtle presentations - maintain high suspicion'
    ],
    infant: [
      'Ceftriaxone + Vancomycin if sick-appearing',
      'Consider UTI as source',
      'Meningitis workup if febrile without source'
    ],
    child: [
      'Ceftriaxone + Vancomycin for severe sepsis',
      'Add coverage based on source',
      'Consider toxic shock syndrome (staph/strep)'
    ]
  },

  medications: [
    {
      drug: 'Ceftriaxone',
      indication: 'Empiric broad-spectrum coverage',
      dosePerKg: '50-100 mg/kg',
      maxDose: '2g (4g for meningitis)',
      route: 'IV',
      frequency: 'q24h',
      notes: 'Avoid in neonates <28 days if receiving calcium'
    },
    {
      drug: 'Ampicillin',
      indication: 'Neonatal sepsis (Listeria, GBS)',
      dosePerKg: '50-100 mg/kg',
      maxDose: '2g',
      route: 'IV',
      frequency: 'q6-8h',
      notes: 'Essential for neonates'
    },
    {
      drug: 'Gentamicin',
      indication: 'Neonatal sepsis (gram-negatives)',
      dosePerKg: '4-5 mg/kg',
      maxDose: '7 mg/kg',
      route: 'IV',
      frequency: 'q24h',
      notes: 'Monitor levels if available'
    },
    {
      drug: 'Vancomycin',
      indication: 'MRSA, resistant gram-positives',
      dosePerKg: '15-20 mg/kg',
      maxDose: '2g',
      route: 'IV',
      frequency: 'q6-8h',
      notes: 'Add for severe sepsis or MRSA risk'
    },
    {
      drug: 'Acyclovir',
      indication: 'Neonatal HSV',
      dosePerKg: '20 mg/kg',
      maxDose: '20 mg/kg',
      route: 'IV',
      frequency: 'q8h',
      notes: 'Add if vesicles, maternal history, or ill neonate'
    },
    {
      drug: 'Dexamethasone',
      indication: 'Bacterial meningitis',
      dosePerKg: '0.15 mg/kg',
      maxDose: '10 mg',
      route: 'IV',
      frequency: 'q6h x 2-4 days',
      notes: 'Give before or with first antibiotic dose'
    }
  ],

  monitoring: [
    { parameter: 'Temperature', frequency: 'q1h', target: 'Normothermia' },
    { parameter: 'Heart rate', frequency: 'Continuous', target: 'Normal for age' },
    { parameter: 'Blood pressure', frequency: 'q5-15min', target: 'Normal for age' },
    { parameter: 'Capillary refill', frequency: 'q1h', target: '<2 seconds' },
    { parameter: 'Urine output', frequency: 'q1h', target: '>1 ml/kg/hr' },
    { parameter: 'Glucose', frequency: 'q4h', target: '60-180 mg/dL' },
    { parameter: 'Lactate', frequency: 'q4h', target: '<2 mmol/L' }
  ],

  disposition: 'ICU admission. Reassess response to fluids and antibiotics frequently. Escalate to vasopressors early if poor response.',

  parentGuidance: [
    'Your child has a serious infection that has spread',
    'We are giving strong antibiotics through the IV',
    'We are giving fluids to support blood pressure',
    'Close monitoring is essential'
  ]
};

// ============================================================================
// PEDIATRIC STATUS EPILEPTICUS
// ============================================================================

export const PEDIATRIC_SEIZURE_PROTOCOL: PediatricProtocol = {
  id: 'pediatric-seizure',
  name: 'Pediatric Status Epilepticus',
  ageGroups: [
    { name: 'infant', range: '1-12 months', weightEstimate: '(age in months + 9) / 2 kg' },
    { name: 'toddler', range: '1-3 years', weightEstimate: '2 x (age + 4) kg' },
    { name: 'child', range: '3-12 years', weightEstimate: '2 x (age + 4) kg' }
  ],

  recognition: {
    symptoms: [
      'Generalized tonic-clonic movements',
      'Focal seizure activity',
      'Unresponsiveness',
      'Eye deviation',
      'Subtle: lip smacking, eye fluttering, cycling movements'
    ],
    vitalsByAge: NORMAL_PEDIATRIC_VITALS,
    physicalExam: [
      'Active seizure activity',
      'Post-ictal confusion',
      'Tongue laceration',
      'Incontinence',
      'Focal neurological deficits (Todd paralysis)',
      'Signs of trauma'
    ],
    redFlags: [
      'Seizure >5 minutes = status epilepticus',
      'Fever + seizure (may be simple febrile vs meningitis)',
      'Focal seizure or focal deficits',
      'No return to baseline between seizures',
      'Signs of increased ICP',
      'History of trauma'
    ]
  },

  immediateActions: [
    '1. Protect airway - position on side, suction',
    '2. Time the seizure - >5 min = status epilepticus',
    '3. Oxygen',
    '4. Check glucose IMMEDIATELY',
    '5. IV/IO access',
    '6. Give benzodiazepine if seizure ongoing'
  ],

  treatmentByAge: {
    general: [
      '0-5 min: Stabilize, time seizure, check glucose',
      '5-10 min: First-line benzo (IV lorazepam or IM midazolam)',
      '10-20 min: Second benzo dose or fosphenytoin/levetiracetam',
      '20-40 min: Third-line agents (phenobarbital, continuous midazolam)',
      '>40 min: Refractory status - consider RSI and continuous EEG'
    ],
    infant: [
      'Consider pyridoxine-dependent seizures - give B6',
      'Hypoglycemia and hypocalcemia common causes',
      'Consider inborn errors of metabolism'
    ],
    child: [
      'Febrile seizure: typically brief, self-limited',
      'Epilepsy: may need home rescue medications',
      'Consider toxic ingestion'
    ]
  },

  medications: [
    {
      drug: 'Lorazepam',
      indication: 'First-line for status epilepticus',
      dosePerKg: '0.1 mg/kg',
      maxDose: '4 mg',
      route: 'IV/IO',
      frequency: 'May repeat once in 5 min',
      notes: 'Preferred IV benzodiazepine'
    },
    {
      drug: 'Midazolam',
      indication: 'No IV access',
      dosePerKg: '0.2 mg/kg IM or 0.5 mg/kg intranasal',
      maxDose: '10 mg IM, 5 mg IN each nostril',
      route: 'IM/IN/buccal',
      frequency: 'Once',
      notes: 'Faster onset than rectal diazepam'
    },
    {
      drug: 'Diazepam',
      indication: 'Alternative benzodiazepine',
      dosePerKg: '0.2-0.5 mg/kg rectally; 0.1-0.2 mg/kg IV',
      maxDose: '20 mg rectal, 10 mg IV',
      route: 'PR/IV',
      frequency: 'Once',
      notes: 'Rectal form widely available'
    },
    {
      drug: 'Fosphenytoin',
      indication: 'Second-line if benzo fails',
      dosePerKg: '20 mg PE/kg',
      maxDose: '1500 mg PE',
      route: 'IV/IO',
      frequency: 'Once',
      notes: 'Infuse at 3 mg PE/kg/min max'
    },
    {
      drug: 'Levetiracetam',
      indication: 'Alternative to fosphenytoin',
      dosePerKg: '40-60 mg/kg',
      maxDose: '3000 mg',
      route: 'IV',
      frequency: 'Once',
      notes: 'Fewer drug interactions, safer'
    },
    {
      drug: 'Phenobarbital',
      indication: 'Refractory status',
      dosePerKg: '20 mg/kg',
      maxDose: '1000 mg',
      route: 'IV',
      frequency: 'Once',
      notes: 'Causes respiratory depression - be ready to intubate'
    },
    {
      drug: 'Dextrose',
      indication: 'Hypoglycemia',
      dosePerKg: 'D10W: 5 ml/kg (0.5g/kg)',
      maxDose: '25g',
      route: 'IV/IO',
      frequency: 'PRN',
      notes: 'Use D10 in children, NOT D50 (sclerosis)'
    },
    {
      drug: 'Pyridoxine (Vitamin B6)',
      indication: 'Pyridoxine-dependent seizures (infants)',
      dosePerKg: '100 mg',
      maxDose: '500 mg',
      route: 'IV',
      frequency: 'Once',
      notes: 'Give empirically in refractory neonatal/infant seizures'
    }
  ],

  monitoring: [
    { parameter: 'Seizure activity', frequency: 'Continuous', target: 'Seizure cessation' },
    { parameter: 'Respiratory status', frequency: 'Continuous', target: 'Adequate ventilation' },
    { parameter: 'SpO2', frequency: 'Continuous', target: '>94%' },
    { parameter: 'Glucose', frequency: 'q1h during treatment', target: '>60 mg/dL' },
    { parameter: 'Mental status', frequency: 'Post-ictal', target: 'Return to baseline' }
  ],

  disposition: 'Admit if first seizure, prolonged seizure, persistent altered mental status, or abnormal neuroimaging. Consider outpatient if known epilepsy with quick return to baseline.',

  parentGuidance: [
    'Seizures look scary but most stop on their own',
    'Keep your child safe - do not put anything in their mouth',
    'Turn them on their side after the seizure',
    'Time the seizure - call emergency if >5 minutes'
  ]
};

// ============================================================================
// PEDIATRIC RESPIRATORY EMERGENCIES
// ============================================================================

export const PEDIATRIC_RESPIRATORY_PROTOCOL: PediatricProtocol = {
  id: 'pediatric-respiratory',
  name: 'Pediatric Respiratory Emergencies',
  ageGroups: [
    { name: 'infant', range: '1-12 months', weightEstimate: '(age in months + 9) / 2 kg' },
    { name: 'toddler', range: '1-3 years', weightEstimate: '2 x (age + 4) kg' },
    { name: 'child', range: '3-12 years', weightEstimate: '2 x (age + 4) kg' }
  ],

  recognition: {
    symptoms: [
      'Increased work of breathing',
      'Nasal flaring',
      'Grunting',
      'Stridor (upper airway)',
      'Wheezing (lower airway)',
      'Cyanosis'
    ],
    vitalsByAge: NORMAL_PEDIATRIC_VITALS,
    physicalExam: [
      'Nasal flaring',
      'Intercostal retractions',
      'Subcostal retractions',
      'Head bobbing (infants)',
      'Tracheal tug',
      'Accessory muscle use',
      'Grunting',
      'Stridor vs wheezing'
    ],
    redFlags: [
      'Cyanosis',
      'Altered mental status',
      'Silent chest',
      'Severe stridor at rest',
      'Drooling, tripod position (epiglottitis)',
      'Apnea',
      'Bradycardia with respiratory distress'
    ]
  },

  immediateActions: [
    '1. Assess airway, breathing, circulation',
    '2. Provide oxygen',
    '3. Position of comfort (do not lay flat with upper airway obstruction)',
    '4. Identify cause: croup vs asthma vs bronchiolitis vs foreign body vs epiglottitis',
    '5. Specific treatment based on etiology'
  ],

  treatmentByAge: {
    general: [
      'CROUP: Dexamethasone + nebulized epinephrine if severe',
      'BRONCHIOLITIS: Supportive care, suctioning, oxygen',
      'ASTHMA: Albuterol, steroids, ipratropium if severe',
      'FOREIGN BODY: Back blows/chest thrusts; Heimlich; bronchoscopy',
      'EPIGLOTTITIS: Do NOT examine throat; keep calm; call anesthesia'
    ],
    infant: [
      'Bronchiolitis most common',
      'RSV season important',
      'Apnea risk in young infants with bronchiolitis'
    ],
    toddler: [
      'Croup most common (6 months - 3 years)',
      'Foreign body aspiration peak age',
      'Reactive airway disease emerging'
    ],
    child: [
      'Asthma more common',
      'Consider pneumonia',
      'Foreign body less common but still possible'
    ]
  },

  medications: [
    {
      drug: 'Dexamethasone',
      indication: 'Croup',
      dosePerKg: '0.6 mg/kg',
      maxDose: '10 mg',
      route: 'PO/IM/IV',
      frequency: 'Single dose',
      notes: 'Gold standard for croup; can use 0.15mg/kg for mild'
    },
    {
      drug: 'Racemic Epinephrine',
      indication: 'Severe croup with stridor at rest',
      dosePerKg: '0.5 ml of 2.25% solution',
      maxDose: '0.5 ml',
      route: 'Nebulized',
      frequency: 'q20min PRN',
      notes: 'Observe 2-4 hours for rebound; can use regular epinephrine 1:1000 (5ml) if unavailable'
    },
    {
      drug: 'Albuterol',
      indication: 'Asthma, wheezing',
      dosePerKg: '2.5-5 mg nebulized',
      maxDose: '5 mg',
      route: 'Nebulized',
      frequency: 'q20min x3, then q1-4h',
      notes: 'MDI with spacer equally effective if able to use'
    },
    {
      drug: 'Ipratropium',
      indication: 'Severe asthma',
      dosePerKg: '250-500 mcg',
      maxDose: '500 mcg',
      route: 'Nebulized',
      frequency: 'q20min x3 doses only',
      notes: 'Add to albuterol in first hour for severe'
    },
    {
      drug: 'Prednisolone',
      indication: 'Asthma exacerbation',
      dosePerKg: '1-2 mg/kg',
      maxDose: '60 mg',
      route: 'PO',
      frequency: 'Once daily x 3-5 days',
      notes: 'Or dexamethasone 0.6mg/kg x 1-2 days'
    },
    {
      drug: 'Magnesium Sulfate',
      indication: 'Severe asthma',
      dosePerKg: '25-75 mg/kg (typically 50 mg/kg)',
      maxDose: '2g',
      route: 'IV over 20 min',
      frequency: 'Single dose',
      notes: 'For severe asthma not responding to bronchodilators'
    },
    {
      drug: 'Hypertonic Saline 3%',
      indication: 'Bronchiolitis',
      dosePerKg: '4 ml',
      maxDose: '4 ml',
      route: 'Nebulized',
      frequency: 'q2-4h',
      notes: 'May help with secretion clearance; evidence mixed'
    }
  ],

  monitoring: [
    { parameter: 'Respiratory rate', frequency: 'q15min initially', target: 'Normal for age' },
    { parameter: 'SpO2', frequency: 'Continuous', target: '>90-92%' },
    { parameter: 'Work of breathing', frequency: 'q15min', target: 'Decreasing retractions' },
    { parameter: 'Stridor/wheeze', frequency: 'q15min', target: 'Improving' },
    { parameter: 'Mental status', frequency: 'q30min', target: 'Alert' }
  ],

  disposition: 'Discharge if good response to treatment, tolerating PO, SpO2 >90% on room air, no stridor at rest, parents comfortable. Admit if persistent distress, hypoxia, inability to feed, toxic appearance.',

  parentGuidance: [
    'Keep your child calm - crying worsens breathing difficulty',
    'Cool mist or steam may help croup at home',
    'Return if breathing gets worse, lips turn blue, or child becomes very sleepy',
    'Offer small amounts of fluids frequently'
  ]
};

// ============================================================================
// PEDIATRIC DEHYDRATION
// ============================================================================

export const PEDIATRIC_DEHYDRATION_PROTOCOL: PediatricProtocol = {
  id: 'pediatric-dehydration',
  name: 'Pediatric Dehydration',
  ageGroups: [
    { name: 'infant', range: '1-12 months', weightEstimate: '(age in months + 9) / 2 kg' },
    { name: 'toddler', range: '1-3 years', weightEstimate: '2 x (age + 4) kg' },
    { name: 'child', range: '3-12 years', weightEstimate: '2 x (age + 4) kg' }
  ],

  recognition: {
    symptoms: [
      'Decreased urine output',
      'Vomiting',
      'Diarrhea',
      'Poor feeding',
      'Lethargy'
    ],
    vitalsByAge: NORMAL_PEDIATRIC_VITALS,
    physicalExam: [
      'MILD (3-5%): Slightly dry mucous membranes, normal skin turgor',
      'MODERATE (6-9%): Dry mucous membranes, decreased skin turgor, sunken eyes',
      'SEVERE (≥10%): Very dry membranes, tenting skin, sunken fontanelle, lethargy, hypotension'
    ],
    redFlags: [
      'Altered mental status',
      'Hypotension',
      'Absent tears',
      'Capillary refill >3 seconds',
      'Sunken fontanelle in infant',
      'No urine output >8 hours'
    ]
  },

  immediateActions: [
    '1. Assess degree of dehydration',
    '2. Mild-Moderate: Oral rehydration therapy (ORT)',
    '3. Severe: IV/IO fluid bolus 20 ml/kg',
    '4. Address underlying cause',
    '5. Monitor response'
  ],

  treatmentByAge: {
    general: [
      'MILD: ORS 50 ml/kg over 4 hours + ongoing losses',
      'MODERATE: ORS 100 ml/kg over 4 hours + ongoing losses',
      'SEVERE: IV NS/LR 20 ml/kg bolus, repeat PRN, then transition to ORS',
      'Replace ongoing losses (10 ml/kg per diarrhea stool)',
      'ZINC supplementation for diarrhea in resource-limited settings'
    ],
    infant: [
      'Continue breastfeeding if breastfed',
      'Small frequent volumes to avoid vomiting',
      'Watch for hypoglycemia'
    ],
    child: [
      'Offer ORS by spoon or syringe if refusing',
      'Ondansetron can reduce vomiting and improve ORT success',
      'Return to regular diet early'
    ]
  },

  medications: [
    {
      drug: 'Oral Rehydration Solution (ORS)',
      indication: 'Mild-moderate dehydration',
      dosePerKg: '50-100 ml/kg over 4 hours',
      maxDose: 'Titrate to response',
      route: 'PO',
      frequency: 'Small frequent sips',
      notes: 'WHO ORS formula; or homemade: 1L water + 6 tsp sugar + 1/2 tsp salt'
    },
    {
      drug: 'Normal Saline / Lactated Ringers',
      indication: 'Severe dehydration or shock',
      dosePerKg: '20 ml/kg',
      maxDose: 'Repeat PRN',
      route: 'IV/IO',
      frequency: 'Bolus over 20-60 min',
      notes: 'May need 40-60 ml/kg total'
    },
    {
      drug: 'Ondansetron',
      indication: 'Vomiting preventing ORT',
      dosePerKg: '0.15 mg/kg',
      maxDose: '8 mg',
      route: 'PO/ODT/IV',
      frequency: 'Once',
      notes: 'Improves ORT success rate'
    },
    {
      drug: 'Zinc',
      indication: 'Diarrhea in children (WHO recommendation)',
      dosePerKg: '10 mg (<6 mo) or 20 mg (>6 mo)',
      maxDose: '20 mg',
      route: 'PO',
      frequency: 'Daily x 10-14 days',
      notes: 'Reduces duration and severity of diarrhea'
    }
  ],

  monitoring: [
    { parameter: 'Weight', frequency: 'Admission and q12-24h', target: 'Approaching baseline' },
    { parameter: 'Urine output', frequency: 'q4-8h', target: '>1 ml/kg/hr' },
    { parameter: 'Capillary refill', frequency: 'q2-4h', target: '<2 seconds' },
    { parameter: 'Mental status', frequency: 'q4h', target: 'Alert, active' },
    { parameter: 'Mucous membranes', frequency: 'q4h', target: 'Moist' }
  ],

  disposition: 'Discharge if tolerating ORS, alert, making urine, and parents can manage at home. Admit if severe dehydration, failed oral trial, unable to keep up with losses, or concerning underlying cause.',

  parentGuidance: [
    'Give small amounts of ORS frequently (1-2 teaspoons every few minutes)',
    'Continue breastfeeding',
    'Return to normal diet once rehydrated',
    'Call if unable to keep fluids down, no wet diapers >8 hours, blood in stool, or lethargy'
  ]
};

// ============================================================================
// QUICK REFERENCE CARDS
// ============================================================================

export const PEDIATRIC_QUICK_REFERENCE = {
  shock: {
    recognition: 'Tachycardia + poor perfusion (hypotension is LATE)',
    fluid: '20 ml/kg NS bolus, repeat up to 60 ml/kg',
    pressors: 'Epinephrine 0.1-1 mcg/kg/min (cold shock) or Norepinephrine (warm)'
  },
  sepsis: {
    antibiotics: 'Within 60 minutes! Ceftriaxone 50-100mg/kg',
    neonate: 'Amp + Gent ± Acyclovir',
    fluids: '20 ml/kg boluses'
  },
  seizure: {
    first_line: 'Lorazepam 0.1 mg/kg IV or Midazolam 0.2 mg/kg IM',
    second_line: 'Fosphenytoin 20 PE/kg or Levetiracetam 40-60 mg/kg',
    check_glucose: 'ALWAYS'
  },
  respiratory: {
    croup: 'Dexamethasone 0.6 mg/kg PO + Epi neb if severe',
    asthma: 'Albuterol + steroids ± ipratropium ± MgSO4',
    bronchiolitis: 'Supportive (suction, O2)'
  },
  dehydration: {
    mild: 'ORS 50 ml/kg over 4h',
    moderate: 'ORS 100 ml/kg over 4h',
    severe: 'IV 20 ml/kg bolus × PRN then ORS'
  },
  weight_estimate: {
    infant: '(age in months + 9) / 2',
    child_1_10: '2 × (age + 4)',
    adolescent: '3 × age'
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export const PEDIATRIC_PROTOCOLS = [
  PEDIATRIC_SHOCK_PROTOCOL,
  PEDIATRIC_SEPSIS_PROTOCOL,
  PEDIATRIC_SEIZURE_PROTOCOL,
  PEDIATRIC_RESPIRATORY_PROTOCOL,
  PEDIATRIC_DEHYDRATION_PROTOCOL
] as const;

export function getPediatricProtocol(id: string): PediatricProtocol | undefined {
  return PEDIATRIC_PROTOCOLS.find(p => p.id === id);
}

export function getWeightEstimate(ageInMonths: number): number {
  if (ageInMonths <= 12) {
    return Math.round((ageInMonths + 9) / 2);
  } else {
    const ageInYears = ageInMonths / 12;
    return Math.round(2 * (ageInYears + 4));
  }
}

export function getMedicationDose(
  drug: string,
  weightKg: number,
  protocol: PediatricProtocol
): { dose: string; max: string } | undefined {
  const med = protocol.medications.find(m => m.drug.toLowerCase() === drug.toLowerCase());
  if (!med) return undefined;

  // Parse dose per kg
  const doseMatch = med.dosePerKg.match(/^([\d.]+)/);
  if (!doseMatch) return { dose: med.dosePerKg, max: med.maxDose };

  const dosePerKg = parseFloat(doseMatch[1]);
  const calculatedDose = dosePerKg * weightKg;
  const maxDoseMatch = med.maxDose.match(/^([\d.]+)/);
  const maxDose = maxDoseMatch ? parseFloat(maxDoseMatch[1]) : Infinity;

  const finalDose = Math.min(calculatedDose, maxDose);
  const unit = med.dosePerKg.replace(/^[\d.]+\s*/, '');

  return {
    dose: `${finalDose.toFixed(1)} ${unit}`,
    max: med.maxDose
  };
}
