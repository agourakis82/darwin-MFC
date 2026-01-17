/**
 * Respiratory Emergencies
 * Life-threatening respiratory conditions for crisis settings
 *
 * Darwin-MFC Emergency System
 * For healthcare workers in resource-limited settings
 */

// ============================================================================
// TYPES
// ============================================================================

export interface RespiratoryProtocol {
  id: string;
  name: string;
  category: 'obstructive' | 'restrictive' | 'vascular' | 'infectious' | 'airway';
  severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
  diagnosticCriteria: DiagnosticCriteria;
  immediateActions: string[];
  treatmentProtocol: TreatmentStep[];
  medications: MedicationDose[];
  escalationCriteria: string[];
  specialConsiderations: SpecialConsideration[];
  monitoring: RespiratoryMonitoringParameter[];
}

export interface DiagnosticCriteria {
  clinical: string[];
  vitals: VitalCriteria[];
  physicalExam: string[];
  redFlags: string[];
}

export interface VitalCriteria {
  parameter: string;
  mild: string;
  moderate: string;
  severe: string;
}

export interface TreatmentStep {
  order: number;
  action: string;
  details: string;
  timing: string;
  ifNoImprovement?: string;
}

export interface MedicationDose {
  drug: string;
  route: 'IV' | 'IM' | 'SC' | 'INH' | 'NEB' | 'PO';
  dose: string;
  frequency: string;
  maxDose?: string;
  pediatricDose?: string;
  contraindications?: string[];
  notes?: string;
}

export interface SpecialConsideration {
  population: string;
  modification: string;
}

export interface RespiratoryMonitoringParameter {
  parameter: string;
  frequency: string;
  target: string;
  action: string;
}

// ============================================================================
// SEVERE ASTHMA EXACERBATION
// ============================================================================

export const SEVERE_ASTHMA_PROTOCOL: RespiratoryProtocol = {
  id: 'asthma-severe',
  name: 'Severe Asthma Exacerbation',
  category: 'obstructive',
  severity: 'severe',

  diagnosticCriteria: {
    clinical: [
      'Severe dyspnea at rest',
      'Speaking in words only (not sentences)',
      'Accessory muscle use',
      'Agitation or drowsiness',
      'History of asthma or atopy'
    ],
    vitals: [
      { parameter: 'SpO2', mild: '>94%', moderate: '90-94%', severe: '<90%' },
      { parameter: 'RR', mild: '<25', moderate: '25-30', severe: '>30' },
      { parameter: 'HR', mild: '<100', moderate: '100-120', severe: '>120' },
      { parameter: 'PEF', mild: '>50%', moderate: '33-50%', severe: '<33%' }
    ],
    physicalExam: [
      'Diffuse bilateral wheezing',
      'Prolonged expiratory phase',
      'Decreased air entry (severe)',
      'Silent chest (life-threatening)',
      'Accessory muscle use',
      'Inability to lie flat'
    ],
    redFlags: [
      'Silent chest (no wheezing)',
      'Cyanosis',
      'Altered mental status',
      'Bradycardia',
      'Exhaustion',
      'SpO2 <90% despite O2',
      'PaCO2 >45 mmHg (if ABG available)'
    ]
  },

  immediateActions: [
    '1. High-flow oxygen (target SpO2 94-98%)',
    '2. Sit patient upright',
    '3. Continuous nebulized salbutamol',
    '4. IV access',
    '5. IV corticosteroids STAT',
    '6. Prepare for intubation if deteriorating'
  ],

  treatmentProtocol: [
    {
      order: 1,
      action: 'Oxygen Therapy',
      details: 'High-flow O2 via non-rebreather mask',
      timing: 'Immediate',
      ifNoImprovement: 'Prepare for non-invasive ventilation'
    },
    {
      order: 2,
      action: 'Nebulized SABA',
      details: 'Salbutamol 5mg nebulized back-to-back x3, then q20min',
      timing: 'Start immediately',
      ifNoImprovement: 'Add ipratropium bromide'
    },
    {
      order: 3,
      action: 'Add Ipratropium',
      details: 'Ipratropium 500mcg nebulized with salbutamol',
      timing: 'First 3 doses',
      ifNoImprovement: 'Consider IV magnesium'
    },
    {
      order: 4,
      action: 'Systemic Corticosteroids',
      details: 'Hydrocortisone 200mg IV or Prednisolone 40-50mg PO',
      timing: 'Within 30 minutes of arrival',
      ifNoImprovement: 'Continue steroids, reassess'
    },
    {
      order: 5,
      action: 'IV Magnesium Sulfate',
      details: '2g IV over 20 minutes (single dose)',
      timing: 'If poor response to initial therapy',
      ifNoImprovement: 'Consider aminophylline or intubation'
    },
    {
      order: 6,
      action: 'IV Aminophylline',
      details: 'Load 5mg/kg over 20min, then 0.5mg/kg/hr infusion',
      timing: 'If no response to above',
      ifNoImprovement: 'Prepare for intubation'
    }
  ],

  medications: [
    {
      drug: 'Salbutamol',
      route: 'NEB',
      dose: '5mg',
      frequency: 'q20min x3, then q1-4h',
      pediatricDose: '2.5-5mg based on age',
      notes: 'Can give continuously in severe cases'
    },
    {
      drug: 'Ipratropium bromide',
      route: 'NEB',
      dose: '500mcg',
      frequency: 'q20min x3 doses only',
      pediatricDose: '250-500mcg',
      notes: 'Only for first 3 doses, no ongoing benefit'
    },
    {
      drug: 'Hydrocortisone',
      route: 'IV',
      dose: '200mg',
      frequency: 'q6h',
      pediatricDose: '4mg/kg (max 100mg)',
      notes: 'Or methylprednisolone 60-125mg IV'
    },
    {
      drug: 'Prednisolone',
      route: 'PO',
      dose: '40-50mg',
      frequency: 'Once daily x5 days',
      pediatricDose: '1-2mg/kg (max 40mg)',
      notes: 'If patient can swallow'
    },
    {
      drug: 'Magnesium sulfate',
      route: 'IV',
      dose: '2g in 100ml NS over 20min',
      frequency: 'Single dose',
      pediatricDose: '40mg/kg (max 2g)',
      contraindications: ['Renal failure', 'Myasthenia gravis'],
      notes: 'Monitor for hypotension, flushing'
    },
    {
      drug: 'Epinephrine',
      route: 'IM',
      dose: '0.3-0.5mg (1:1000)',
      frequency: 'q20min x3 if needed',
      pediatricDose: '0.01mg/kg (max 0.3mg)',
      notes: 'For anaphylaxis-associated or refractory cases'
    }
  ],

  escalationCriteria: [
    'Deteriorating despite maximal therapy',
    'SpO2 <90% on high-flow O2',
    'Rising PaCO2 or respiratory acidosis',
    'Exhaustion or altered mental status',
    'Silent chest',
    'Respiratory arrest imminent'
  ],

  specialConsiderations: [
    { population: 'Pregnancy', modification: 'Same treatment; fetal hypoxia risk from undertreating' },
    { population: 'Elderly', modification: 'More cautious with aminophylline (arrhythmia risk)' },
    { population: 'Cardiac disease', modification: 'Avoid excessive beta-agonist; monitor for tachyarrhythmia' },
    { population: 'On beta-blockers', modification: 'May need higher doses of SABA; consider IV magnesium early' }
  ],

  monitoring: [
    { parameter: 'SpO2', frequency: 'Continuous', target: '94-98%', action: 'Adjust O2 if below target' },
    { parameter: 'RR', frequency: 'q15min', target: '<25', action: 'Escalate if rising' },
    { parameter: 'HR', frequency: 'q15min', target: '<120', action: 'Watch for excessive tachycardia' },
    { parameter: 'PEF', frequency: 'q30min if able', target: '>50% predicted', action: 'Document response' },
    { parameter: 'Mental status', frequency: 'Continuous', target: 'Alert', action: 'Intubate if deteriorating' }
  ]
};

// ============================================================================
// COPD EXACERBATION
// ============================================================================

export const COPD_EXACERBATION_PROTOCOL: RespiratoryProtocol = {
  id: 'copd-exacerbation',
  name: 'COPD Acute Exacerbation',
  category: 'obstructive',
  severity: 'severe',

  diagnosticCriteria: {
    clinical: [
      'Known COPD or significant smoking history',
      'Increased dyspnea',
      'Increased sputum volume',
      'Increased sputum purulence',
      'May have fever if infectious trigger'
    ],
    vitals: [
      { parameter: 'SpO2', mild: '92-94%', moderate: '88-92%', severe: '<88%' },
      { parameter: 'RR', mild: '<25', moderate: '25-30', severe: '>30' },
      { parameter: 'pH (if ABG)', mild: '>7.35', moderate: '7.30-7.35', severe: '<7.30' }
    ],
    physicalExam: [
      'Pursed lip breathing',
      'Barrel chest',
      'Decreased breath sounds',
      'Wheezing and/or rhonchi',
      'Accessory muscle use',
      'Paradoxical abdominal movement (severe)'
    ],
    redFlags: [
      'Altered mental status (CO2 narcosis)',
      'Cyanosis',
      'Unable to speak',
      'Hemodynamic instability',
      'pH <7.25',
      'PaCO2 >70 mmHg with acidosis'
    ]
  },

  immediateActions: [
    '1. Controlled oxygen (target SpO2 88-92%)',
    '2. Nebulized bronchodilators',
    '3. Systemic corticosteroids',
    '4. Antibiotics if purulent sputum',
    '5. Consider non-invasive ventilation if acidotic'
  ],

  treatmentProtocol: [
    {
      order: 1,
      action: 'Controlled Oxygen',
      details: 'Venturi mask 24-28% or nasal cannula 1-2L/min',
      timing: 'Immediate',
      ifNoImprovement: 'Increase FiO2 cautiously, check ABG'
    },
    {
      order: 2,
      action: 'Nebulized Bronchodilators',
      details: 'Salbutamol 5mg + Ipratropium 500mcg',
      timing: 'Immediate, repeat q4-6h',
      ifNoImprovement: 'Consider IV aminophylline'
    },
    {
      order: 3,
      action: 'Systemic Corticosteroids',
      details: 'Prednisolone 40mg PO or Hydrocortisone 100mg IV',
      timing: 'Within 1 hour',
      ifNoImprovement: 'Continue 5-7 day course'
    },
    {
      order: 4,
      action: 'Antibiotics',
      details: 'Amoxicillin-clavulanate 625mg PO TID or Doxycycline 100mg BD',
      timing: 'If increased/purulent sputum or fever',
      ifNoImprovement: 'Consider respiratory fluoroquinolone'
    },
    {
      order: 5,
      action: 'Non-Invasive Ventilation (NIV)',
      details: 'BiPAP: IPAP 10-15, EPAP 4-6 cmH2O',
      timing: 'If pH <7.35 and PaCO2 >45',
      ifNoImprovement: 'Prepare for intubation'
    }
  ],

  medications: [
    {
      drug: 'Salbutamol',
      route: 'NEB',
      dose: '5mg',
      frequency: 'q4-6h or PRN',
      notes: 'Can combine with ipratropium'
    },
    {
      drug: 'Ipratropium',
      route: 'NEB',
      dose: '500mcg',
      frequency: 'q6h',
      notes: 'Particularly effective in COPD'
    },
    {
      drug: 'Prednisolone',
      route: 'PO',
      dose: '40mg',
      frequency: 'Once daily x5 days',
      notes: 'No taper needed for 5-day course'
    },
    {
      drug: 'Amoxicillin-clavulanate',
      route: 'PO',
      dose: '625mg',
      frequency: 'TID x5-7 days',
      notes: 'First-line antibiotic'
    },
    {
      drug: 'Doxycycline',
      route: 'PO',
      dose: '100mg',
      frequency: 'BD x5-7 days',
      contraindications: ['Pregnancy'],
      notes: 'Alternative if penicillin allergic'
    },
    {
      drug: 'Azithromycin',
      route: 'PO',
      dose: '500mg day 1, then 250mg',
      frequency: 'Once daily x5 days',
      notes: 'Alternative antibiotic'
    }
  ],

  escalationCriteria: [
    'pH <7.30 despite NIV',
    'Rising PaCO2 despite NIV',
    'Unable to tolerate NIV',
    'Hemodynamic instability',
    'Respiratory arrest',
    'Decreasing level of consciousness'
  ],

  specialConsiderations: [
    { population: 'CO2 retainers', modification: 'Maintain SpO2 88-92%, avoid excessive O2' },
    { population: 'On home O2', modification: 'May need higher baseline, still target 88-92%' },
    { population: 'Previous NIV', modification: 'Lower threshold to restart NIV' },
    { population: 'End-stage COPD', modification: 'Discuss goals of care, ceiling of treatment' }
  ],

  monitoring: [
    { parameter: 'SpO2', frequency: 'Continuous', target: '88-92%', action: 'Titrate O2 carefully' },
    { parameter: 'ABG', frequency: 'q2-4h if acidotic', target: 'pH >7.30', action: 'NIV or escalate' },
    { parameter: 'Mental status', frequency: 'q1h', target: 'GCS 15', action: 'Check CO2 if drowsy' },
    { parameter: 'RR', frequency: 'q1h', target: '<25', action: 'Consider NIV if elevated' }
  ]
};

// ============================================================================
// ARDS (Acute Respiratory Distress Syndrome)
// ============================================================================

export const ARDS_PROTOCOL: RespiratoryProtocol = {
  id: 'ards',
  name: 'Acute Respiratory Distress Syndrome',
  category: 'restrictive',
  severity: 'life_threatening',

  diagnosticCriteria: {
    clinical: [
      'Acute onset (within 1 week of insult)',
      'Bilateral opacities on imaging',
      'Not fully explained by cardiac failure/fluid overload',
      'Known risk factor (sepsis, pneumonia, aspiration, trauma, pancreatitis)'
    ],
    vitals: [
      { parameter: 'P/F ratio', mild: '200-300', moderate: '100-200', severe: '<100' },
      { parameter: 'SpO2', mild: '>90% on low O2', moderate: '<90% moderate O2', severe: '<90% high O2' },
      { parameter: 'RR', mild: '<30', moderate: '30-40', severe: '>40' }
    ],
    physicalExam: [
      'Severe respiratory distress',
      'Cyanosis',
      'Diffuse crackles bilaterally',
      'Accessory muscle use',
      'Intercostal retractions'
    ],
    redFlags: [
      'Refractory hypoxemia (SpO2 <88% on FiO2 100%)',
      'Multi-organ failure',
      'Severe acidosis (pH <7.20)',
      'Hemodynamic collapse',
      'Unresponsive to conventional ventilation'
    ]
  },

  immediateActions: [
    '1. High-flow oxygen or non-invasive support',
    '2. Prepare for intubation and mechanical ventilation',
    '3. Treat underlying cause (antibiotics for sepsis, etc.)',
    '4. Conservative fluid management',
    '5. Position: prone if possible'
  ],

  treatmentProtocol: [
    {
      order: 1,
      action: 'Oxygen Therapy',
      details: 'High-flow nasal cannula (HFNC) 40-60 L/min or NIV',
      timing: 'Immediate',
      ifNoImprovement: 'Early intubation; avoid delayed intubation'
    },
    {
      order: 2,
      action: 'Lung-Protective Ventilation',
      details: 'Vt 6 ml/kg IBW, Pplat <30 cmH2O, PEEP 8-15',
      timing: 'If intubated',
      ifNoImprovement: 'Higher PEEP, consider prone positioning'
    },
    {
      order: 3,
      action: 'Prone Positioning',
      details: 'Prone for 16+ hours/day',
      timing: 'If P/F <150 despite optimal ventilation',
      ifNoImprovement: 'Consider ECMO referral if available'
    },
    {
      order: 4,
      action: 'Conservative Fluid Management',
      details: 'Target CVP 4-8 or euvolemia, diuretics if volume overloaded',
      timing: 'Once hemodynamically stable',
      ifNoImprovement: 'Reassess volume status'
    },
    {
      order: 5,
      action: 'Treat Underlying Cause',
      details: 'Antibiotics for pneumonia/sepsis, source control',
      timing: 'Immediate and ongoing',
      ifNoImprovement: 'Broaden coverage, search for source'
    },
    {
      order: 6,
      action: 'Neuromuscular Blockade',
      details: 'Cisatracurium 0.15-0.2 mg/kg bolus, then infusion',
      timing: 'Consider in first 48h if P/F <150',
      ifNoImprovement: 'Continue for 48h, reassess daily'
    }
  ],

  medications: [
    {
      drug: 'Midazolam',
      route: 'IV',
      dose: '0.05-0.1 mg/kg/hr',
      frequency: 'Continuous infusion',
      notes: 'For sedation during mechanical ventilation'
    },
    {
      drug: 'Fentanyl',
      route: 'IV',
      dose: '0.5-2 mcg/kg/hr',
      frequency: 'Continuous infusion',
      notes: 'For analgesia and sedation'
    },
    {
      drug: 'Cisatracurium',
      route: 'IV',
      dose: '0.15 mg/kg bolus, then 1-3 mcg/kg/min',
      frequency: 'Continuous infusion',
      notes: 'For severe ARDS, use with adequate sedation'
    },
    {
      drug: 'Furosemide',
      route: 'IV',
      dose: '20-80mg',
      frequency: 'q6-12h or infusion',
      notes: 'For conservative fluid strategy'
    },
    {
      drug: 'Dexamethasone',
      route: 'IV',
      dose: '6mg',
      frequency: 'Once daily',
      notes: 'If COVID-19 associated ARDS'
    }
  ],

  escalationCriteria: [
    'P/F <80 despite optimal ventilation and proning',
    'pH <7.15 with PaCO2 >80',
    'Refractory hypoxemia despite FiO2 100%',
    'Unable to achieve lung-protective ventilation',
    'Multi-organ failure progression'
  ],

  specialConsiderations: [
    { population: 'Resource-limited', modification: 'Focus on PEEP optimization, consider prone on any ventilator' },
    { population: 'No ICU available', modification: 'High-flow oxygen, avoid intubation if possible, transfer' },
    { population: 'Pregnancy', modification: 'Higher O2 targets, left lateral position, early delivery consideration' },
    { population: 'COVID-19', modification: 'Higher PEEP often needed, prone early, dexamethasone indicated' }
  ],

  monitoring: [
    { parameter: 'P/F ratio', frequency: 'q4-6h ABG', target: '>150', action: 'Optimize PEEP/FiO2' },
    { parameter: 'Pplat', frequency: 'q4h', target: '<30 cmH2O', action: 'Reduce Vt if elevated' },
    { parameter: 'SpO2', frequency: 'Continuous', target: '88-95%', action: 'Titrate FiO2' },
    { parameter: 'Fluid balance', frequency: 'q24h', target: 'Even or negative', action: 'Diurese if positive' },
    { parameter: 'Sedation (RASS)', frequency: 'q4h', target: '-2 to -1', action: 'Titrate sedation' }
  ]
};

// ============================================================================
// PULMONARY EMBOLISM
// ============================================================================

export const PULMONARY_EMBOLISM_PROTOCOL: RespiratoryProtocol = {
  id: 'pulmonary-embolism',
  name: 'Acute Pulmonary Embolism',
  category: 'vascular',
  severity: 'severe',

  diagnosticCriteria: {
    clinical: [
      'Sudden onset dyspnea',
      'Pleuritic chest pain',
      'Hemoptysis (minority)',
      'Risk factors: recent surgery, immobility, cancer, VTE history, OCP'
    ],
    vitals: [
      { parameter: 'SpO2', mild: '>94%', moderate: '90-94%', severe: '<90%' },
      { parameter: 'HR', mild: '<100', moderate: '100-125', severe: '>125' },
      { parameter: 'BP', mild: 'Normal', moderate: 'Borderline', severe: 'SBP <90' }
    ],
    physicalExam: [
      'Tachypnea',
      'Tachycardia',
      'Clear lungs (often)',
      'JVD (massive PE)',
      'Loud P2',
      'Unilateral leg swelling (DVT)'
    ],
    redFlags: [
      'Hypotension (SBP <90)',
      'Signs of RV strain',
      'Syncope',
      'Cardiac arrest',
      'Severe hypoxemia',
      'Rising lactate'
    ]
  },

  immediateActions: [
    '1. Oxygen to maintain SpO2 >94%',
    '2. IV access x2',
    '3. Start anticoagulation immediately if high suspicion',
    '4. Assess hemodynamic stability',
    '5. Consider thrombolysis if massive PE with hypotension'
  ],

  treatmentProtocol: [
    {
      order: 1,
      action: 'Oxygen Therapy',
      details: 'Supplemental O2 to maintain SpO2 >94%',
      timing: 'Immediate',
      ifNoImprovement: 'High-flow or intubation for severe hypoxemia'
    },
    {
      order: 2,
      action: 'Anticoagulation',
      details: 'LMWH (enoxaparin 1mg/kg q12h) or UFH bolus + infusion',
      timing: 'Immediate once PE suspected/confirmed',
      ifNoImprovement: 'Ensure therapeutic dosing'
    },
    {
      order: 3,
      action: 'Risk Stratification',
      details: 'Assess for massive PE (shock) or submassive (RV strain)',
      timing: 'Within first hour',
      ifNoImprovement: 'Escalate therapy if high-risk'
    },
    {
      order: 4,
      action: 'Thrombolysis (Massive PE)',
      details: 'Alteplase 100mg IV over 2 hours',
      timing: 'If hypotensive and no contraindications',
      ifNoImprovement: 'Consider surgical embolectomy or catheter-directed'
    },
    {
      order: 5,
      action: 'Hemodynamic Support',
      details: 'IV fluids (cautious, 500ml bolus), vasopressors if needed',
      timing: 'For hypotensive patients',
      ifNoImprovement: 'Norepinephrine, consider dobutamine for RV failure'
    }
  ],

  medications: [
    {
      drug: 'Enoxaparin',
      route: 'SC',
      dose: '1mg/kg',
      frequency: 'q12h',
      contraindications: ['CrCl <30', 'Active bleeding'],
      notes: 'Reduce to 1mg/kg daily if CrCl 15-30'
    },
    {
      drug: 'Unfractionated heparin',
      route: 'IV',
      dose: '80 units/kg bolus, then 18 units/kg/hr',
      frequency: 'Continuous infusion',
      notes: 'Preferred if thrombolysis possible or renal failure'
    },
    {
      drug: 'Alteplase (tPA)',
      route: 'IV',
      dose: '100mg over 2 hours',
      frequency: 'Single dose',
      contraindications: ['Recent surgery', 'Active bleeding', 'Stroke <3 months'],
      notes: 'For massive PE with shock; accept higher bleeding risk'
    },
    {
      drug: 'Rivaroxaban',
      route: 'PO',
      dose: '15mg BD x3 weeks, then 20mg daily',
      frequency: 'As indicated',
      notes: 'Can use for initial treatment if stable, hemodynamically'
    },
    {
      drug: 'Norepinephrine',
      route: 'IV',
      dose: '0.05-0.5 mcg/kg/min',
      frequency: 'Continuous infusion',
      notes: 'For hemodynamic support in massive PE'
    }
  ],

  escalationCriteria: [
    'Hemodynamic deterioration',
    'Refractory hypoxemia',
    'Rising lactate or troponin',
    'Need for increasing vasopressors',
    'Cardiac arrest'
  ],

  specialConsiderations: [
    { population: 'Pregnancy', modification: 'LMWH preferred; UFH near delivery; avoid DOACs' },
    { population: 'Cancer', modification: 'LMWH or DOACs for extended treatment' },
    { population: 'Renal failure', modification: 'Use UFH; if LMWH, dose-adjust' },
    { population: 'Active bleeding', modification: 'IVC filter; may still need anticoagulation' }
  ],

  monitoring: [
    { parameter: 'SpO2', frequency: 'Continuous', target: '>94%', action: 'Escalate O2 support' },
    { parameter: 'BP', frequency: 'q15min initially', target: 'SBP >90', action: 'Vasopressors or thrombolysis' },
    { parameter: 'aPTT (if UFH)', frequency: 'q6h until stable', target: '60-80 sec', action: 'Adjust heparin' },
    { parameter: 'Troponin', frequency: 'q6-12h', target: 'Not rising', action: 'Indicates RV strain' }
  ]
};

// ============================================================================
// PNEUMOTHORAX
// ============================================================================

export const TENSION_PNEUMOTHORAX_PROTOCOL: RespiratoryProtocol = {
  id: 'tension-pneumothorax',
  name: 'Tension Pneumothorax',
  category: 'airway',
  severity: 'life_threatening',

  diagnosticCriteria: {
    clinical: [
      'Sudden severe dyspnea',
      'Chest pain (often pleuritic)',
      'History of trauma, procedure, or COPD/asthma',
      'Rapid deterioration'
    ],
    vitals: [
      { parameter: 'SpO2', mild: 'N/A', moderate: 'N/A', severe: 'Rapidly falling' },
      { parameter: 'HR', mild: 'N/A', moderate: 'N/A', severe: '>120' },
      { parameter: 'BP', mild: 'N/A', moderate: 'N/A', severe: 'Hypotensive' }
    ],
    physicalExam: [
      'Absent breath sounds on affected side',
      'Tracheal deviation AWAY from affected side',
      'Hyperresonance to percussion',
      'JVD (may be absent if hypovolemic)',
      'Cyanosis',
      'Subcutaneous emphysema'
    ],
    redFlags: [
      'Hemodynamic collapse',
      'PEA arrest (tension physiology)',
      'Tracheal deviation',
      'Absent breath sounds with hypoxia',
      'Distended neck veins'
    ]
  },

  immediateActions: [
    '1. CLINICAL DIAGNOSIS - DO NOT DELAY FOR IMAGING',
    '2. Immediate needle decompression (2nd ICS, MCL)',
    '3. High-flow oxygen',
    '4. Prepare for chest tube insertion',
    '5. If arrest: continue CPR, decompress immediately'
  ],

  treatmentProtocol: [
    {
      order: 1,
      action: 'Needle Decompression',
      details: '14-16G needle, 2nd ICS midclavicular line, affected side',
      timing: 'IMMEDIATE - do not wait for X-ray',
      ifNoImprovement: 'Repeat or use different site (5th ICS anterior axillary line)'
    },
    {
      order: 2,
      action: 'High-Flow Oxygen',
      details: '15L/min via non-rebreather',
      timing: 'Immediate',
      ifNoImprovement: 'Intubate if needed after decompression'
    },
    {
      order: 3,
      action: 'Chest Tube Insertion',
      details: '28-32Fr tube, 5th ICS anterior axillary line',
      timing: 'As soon as possible after needle decompression',
      ifNoImprovement: 'Check tube position and patency'
    },
    {
      order: 4,
      action: 'Connect to Drainage System',
      details: 'Underwater seal or Heimlich valve',
      timing: 'Immediately after insertion',
      ifNoImprovement: 'Consider second chest tube or surgical consult'
    }
  ],

  medications: [
    {
      drug: 'Lidocaine 1%',
      route: 'SC',
      dose: '10-20ml',
      frequency: 'Once for chest tube insertion',
      maxDose: '4.5mg/kg',
      notes: 'Local anesthesia for chest tube if patient conscious'
    },
    {
      drug: 'Ketamine',
      route: 'IV',
      dose: '0.5-1mg/kg',
      frequency: 'Once',
      notes: 'For procedural sedation if time permits'
    }
  ],

  escalationCriteria: [
    'No improvement after needle decompression',
    'Persistent air leak',
    'Hemothorax developing',
    'Bilateral pneumothoraces',
    'Need for positive pressure ventilation'
  ],

  specialConsiderations: [
    { population: 'Trauma', modification: 'Consider hemothorax, use larger chest tube (32-36Fr)' },
    { population: 'Ventilated patient', modification: 'May need immediate decompression; high-risk for tension' },
    { population: 'COPD/Asthma', modification: 'Higher risk of recurrence; consider surgical referral' },
    { population: 'Resource-limited', modification: 'Finger thoracostomy or improvised Heimlich valve' }
  ],

  monitoring: [
    { parameter: 'SpO2', frequency: 'Continuous', target: '>94%', action: 'Reassess if not improving' },
    { parameter: 'BP', frequency: 'q5min initially', target: 'Normotensive', action: 'Fluid resuscitation' },
    { parameter: 'Breath sounds', frequency: 'q15min', target: 'Bilateral equal', action: 'CXR after stabilized' },
    { parameter: 'Chest tube output', frequency: 'q1h', target: 'Air leak resolving', action: 'Surgical consult if persistent' }
  ]
};

// ============================================================================
// AIRWAY OBSTRUCTION / CHOKING
// ============================================================================

export const AIRWAY_OBSTRUCTION_PROTOCOL: RespiratoryProtocol = {
  id: 'airway-obstruction',
  name: 'Foreign Body Airway Obstruction',
  category: 'airway',
  severity: 'life_threatening',

  diagnosticCriteria: {
    clinical: [
      'Sudden onset while eating or with object in mouth',
      'Clutching throat (universal choking sign)',
      'Unable to speak, cough, or breathe',
      'Stridor or complete silence'
    ],
    vitals: [
      { parameter: 'Status', mild: 'Can cough/speak', moderate: 'Weak cough', severe: 'Cannot cough/speak/breathe' },
      { parameter: 'Color', mild: 'Normal', moderate: 'Flushed', severe: 'Cyanotic' },
      { parameter: 'LOC', mild: 'Alert', moderate: 'Anxious', severe: 'Unresponsive' }
    ],
    physicalExam: [
      'Universal choking sign',
      'Inability to vocalize',
      'Ineffective or absent cough',
      'Increasing respiratory distress',
      'Cyanosis',
      'Loss of consciousness'
    ],
    redFlags: [
      'Complete obstruction (silent)',
      'Cyanosis',
      'Loss of consciousness',
      'No air movement'
    ]
  },

  immediateActions: [
    '1. Ask "Are you choking?" - if nodding yes, act immediately',
    '2. If mild (can cough): encourage coughing, do NOT intervene',
    '3. If severe (cannot cough/speak): abdominal thrusts (Heimlich)',
    '4. If unconscious: CPR with airway checks',
    '5. Prepare for advanced airway if object not expelled'
  ],

  treatmentProtocol: [
    {
      order: 1,
      action: 'Mild Obstruction (effective cough)',
      details: 'Encourage coughing, do not interfere, stay with patient',
      timing: 'Observe continuously',
      ifNoImprovement: 'If becomes ineffective, proceed to severe protocol'
    },
    {
      order: 2,
      action: 'Severe Obstruction - Conscious Adult',
      details: '5 back blows + 5 abdominal thrusts (Heimlich), repeat',
      timing: 'Immediate',
      ifNoImprovement: 'Continue cycle until relieved or unconscious'
    },
    {
      order: 3,
      action: 'Unconscious Patient',
      details: 'Lower to ground, call for help, start CPR (30:2)',
      timing: 'Immediate when LOC lost',
      ifNoImprovement: 'Look in mouth before each breath, remove visible object'
    },
    {
      order: 4,
      action: 'Advanced Airway',
      details: 'Direct laryngoscopy, Magill forceps to remove object',
      timing: 'If BLS measures fail',
      ifNoImprovement: 'Cricothyrotomy if complete obstruction'
    }
  ],

  medications: [
    {
      drug: 'None initially',
      route: 'IV',
      dose: 'N/A',
      frequency: 'N/A',
      notes: 'Focus on physical maneuvers first'
    },
    {
      drug: 'Epinephrine',
      route: 'IV',
      dose: '1mg',
      frequency: 'q3-5min during CPR',
      notes: 'If arrest occurs from hypoxia'
    }
  ],

  escalationCriteria: [
    'Object not expelled after multiple cycles',
    'Loss of consciousness',
    'Need for advanced airway',
    'Cardiac arrest'
  ],

  specialConsiderations: [
    { population: 'Infant (<1 year)', modification: '5 back blows + 5 chest thrusts (no abdominal thrusts)' },
    { population: 'Pregnant', modification: 'Chest thrusts instead of abdominal thrusts' },
    { population: 'Obese', modification: 'Chest thrusts may be more effective' },
    { population: 'Self-rescue', modification: 'Self-administered abdominal thrusts against chair' }
  ],

  monitoring: [
    { parameter: 'Airway patency', frequency: 'Continuous', target: 'Air movement', action: 'Continue maneuvers' },
    { parameter: 'LOC', frequency: 'Continuous', target: 'Conscious', action: 'Start CPR if unconscious' },
    { parameter: 'Color', frequency: 'Continuous', target: 'Pink', action: 'More aggressive if cyanotic' }
  ]
};

// ============================================================================
// QUICK REFERENCE CARDS
// ============================================================================

export const RESPIRATORY_QUICK_REFERENCE = {
  asthma: {
    mild_moderate: 'Salbutamol NEB q20min x3 → reassess → q1-4h PRN + steroids',
    severe: 'Continuous salbutamol + ipratropium + IV steroids + IV MgSO4 2g',
    life_threatening: 'All above + prepare intubation + aminophylline'
  },
  copd: {
    controlled_o2: 'Target 88-92%, not higher',
    treatment: 'Salbutamol + ipratropium + steroids ± antibiotics',
    niv_criteria: 'pH <7.35 with PaCO2 >45'
  },
  ards: {
    ventilation: 'Vt 6ml/kg IBW, Pplat <30, PEEP 8-15+',
    proning: 'P/F <150 → prone 16+ hours/day',
    fluids: 'Conservative - target even or negative balance'
  },
  pe: {
    anticoag: 'Start LMWH/UFH immediately on suspicion',
    massive: 'Shock → thrombolysis (alteplase 100mg/2h)',
    pregnancy: 'LMWH preferred, avoid DOACs'
  },
  pneumothorax: {
    tension: 'CLINICAL DIAGNOSIS → immediate needle decompression',
    needle: '14-16G, 2nd ICS MCL',
    chest_tube: '28-32Fr, 5th ICS anterior axillary line'
  },
  choking: {
    mild: 'Encourage cough, observe',
    severe_conscious: '5 back blows + 5 abdominal thrusts',
    unconscious: 'CPR with airway checks before each breath'
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export const RESPIRATORY_PROTOCOLS = [
  SEVERE_ASTHMA_PROTOCOL,
  COPD_EXACERBATION_PROTOCOL,
  ARDS_PROTOCOL,
  PULMONARY_EMBOLISM_PROTOCOL,
  TENSION_PNEUMOTHORAX_PROTOCOL,
  AIRWAY_OBSTRUCTION_PROTOCOL
] as const;

export const RESPIRATORY_CATEGORIES = {
  obstructive: ['asthma-severe', 'copd-exacerbation'],
  restrictive: ['ards'],
  vascular: ['pulmonary-embolism'],
  airway: ['tension-pneumothorax', 'airway-obstruction']
} as const;

export function getRespiratoryProtocol(id: string): RespiratoryProtocol | undefined {
  return RESPIRATORY_PROTOCOLS.find(p => p.id === id);
}

export function getProtocolsByCategory(category: RespiratoryProtocol['category']): RespiratoryProtocol[] {
  return RESPIRATORY_PROTOCOLS.filter(p => p.category === category);
}
