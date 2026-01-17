/**
 * Clinical Pearls, Mnemonics, and Communication Templates
 * Quick-reference memory aids for healthcare workers
 */

export interface ClinicalPearl {
  id: string;
  category: PearlCategory;
  title: string;
  pearl: string;
  explanation?: string;
  source?: string;
}

export interface Mnemonic {
  id: string;
  category: MnemonicCategory;
  letters: string;
  fullForm: string[];
  context: string;
  explanation?: string;
}

export interface SBARTemplate {
  id: string;
  scenario: string;
  situation: string[];
  background: string[];
  assessment: string[];
  recommendation: string[];
}

export type PearlCategory =
  | 'emergency'
  | 'cardiology'
  | 'pulmonary'
  | 'neurology'
  | 'pediatrics'
  | 'obstetrics'
  | 'trauma'
  | 'infectious'
  | 'general';

export type MnemonicCategory =
  | 'assessment'
  | 'differential'
  | 'treatment'
  | 'emergency'
  | 'examination';

// ============================================================================
// CLINICAL PEARLS
// ============================================================================

export const CLINICAL_PEARLS: ClinicalPearl[] = [
  // Emergency
  {
    id: 'pearl-shock-cold-warm',
    category: 'emergency',
    title: 'Cold vs Warm Shock',
    pearl: 'Cold extremities + tachycardia = hypovolemic/cardiogenic shock. Warm extremities + tachycardia = septic/anaphylactic shock (early).',
    explanation: 'Early recognition of shock type guides treatment. Cold shock needs volume/pressors, warm septic shock needs antibiotics + volume.'
  },
  {
    id: 'pearl-tension-pneumo',
    category: 'emergency',
    title: 'Tension Pneumothorax Direction',
    pearl: 'Trachea deviates AWAY from the tension. Decompress the side with absent breath sounds.',
    explanation: 'The increased pressure pushes mediastinum away. Always decompress the side that sounds bad, not the side the trachea points to.'
  },
  {
    id: 'pearl-anaphylaxis-epi',
    category: 'emergency',
    title: 'Epinephrine in Anaphylaxis',
    pearl: 'Never delay epinephrine for antihistamines. Epinephrine is the ONLY drug that saves lives in anaphylaxis.',
    explanation: 'Antihistamines and steroids are adjuncts. Epinephrine reverses bronchospasm and hypotension - give it first, then other meds.'
  },

  // Cardiology
  {
    id: 'pearl-stemi-time',
    category: 'cardiology',
    title: 'STEMI Time Windows',
    pearl: '"Time is muscle." Door-to-balloon <90 min for PCI, door-to-needle <30 min for thrombolysis. Every 30 min delay = 7.5% more mortality.',
    explanation: 'Emphasize rapid reperfusion in STEMI. If no PCI, give thrombolytics if no contraindication.'
  },
  {
    id: 'pearl-afib-rate-rhythm',
    category: 'cardiology',
    title: 'AF Rate vs Rhythm Control',
    pearl: 'Rate control is usually enough. Consider rhythm control only if: HFrEF, symptomatic despite rate control, or patient prefers.',
    explanation: 'AFFIRM trial showed no mortality benefit of rhythm over rate control. Focus on rate control and anticoagulation.'
  },
  {
    id: 'pearl-heart-failure-wet-dry',
    category: 'cardiology',
    title: 'Heart Failure Assessment',
    pearl: 'Is the patient wet or dry? Cold or warm? Wet = diuresis needed. Cold = inotrope needed. Warm + dry = optimized.',
    explanation: 'Simple classification guides HF management. Wet = congested, cold = poor perfusion.'
  },

  // Pulmonary
  {
    id: 'pearl-copd-oxygen',
    category: 'pulmonary',
    title: 'Oxygen in COPD',
    pearl: 'Don\'t withhold oxygen in hypoxic COPD. Target SpO2 88-92%. The risk of hypercapnia is overstated compared to untreated hypoxia.',
    explanation: 'Oxygen kills less than hypoxia. Give oxygen, titrate to 88-92%, and monitor. Don\'t let fear of CO2 retention cause harm.'
  },
  {
    id: 'pearl-asthma-silent-chest',
    category: 'pulmonary',
    title: 'Silent Chest in Asthma',
    pearl: 'A "quiet" or silent chest in severe asthma is a DANGER sign, not improvement. It means air movement is critically reduced.',
    explanation: 'Wheezing requires air flow. No wheeze + distress = impending respiratory failure. Prepare for intubation.'
  },

  // Neurology
  {
    id: 'pearl-stroke-fast',
    category: 'neurology',
    title: 'Stroke FAST Assessment',
    pearl: 'FAST: Face drooping, Arm weakness, Speech difficulty, Time to call. BE-FAST adds Balance and Eyes (vision) for posterior strokes.',
    explanation: 'Quick stroke screening. Any positive sign = suspect stroke. Time last seen normal is critical for thrombolysis decision.'
  },
  {
    id: 'pearl-gcs-intubate',
    category: 'neurology',
    title: 'GCS and Airway',
    pearl: 'GCS ≤8 = intubate. The patient cannot protect their airway.',
    explanation: 'This is a rough guide. Some patients with GCS 9 also need intubation. Key is: can they protect from aspiration?'
  },
  {
    id: 'pearl-pupil-blown',
    category: 'neurology',
    title: 'Unilateral Dilated Pupil',
    pearl: 'A blown pupil (unilateral dilation) in trauma = uncal herniation until proven otherwise. This is a neurosurgical emergency.',
    explanation: 'CN III compression from temporal lobe herniation causes ipsilateral pupil dilation. Urgent decompression needed.'
  },

  // Pediatrics
  {
    id: 'pearl-peds-weight',
    category: 'pediatrics',
    title: 'Pediatric Weight Estimation',
    pearl: 'Weight (kg) = (Age in years + 4) × 2. Example: 4-year-old = (4+4) × 2 = 16 kg. Works for ages 1-10.',
    explanation: 'Quick estimation for drug dosing when actual weight unknown. Broselow tape is more accurate if available.'
  },
  {
    id: 'pearl-peds-dehydration',
    category: 'pediatrics',
    title: 'Pediatric Dehydration Assessment',
    pearl: 'Mild (5%): slightly dry mouth. Moderate (10%): sunken eyes, decreased tears, skin tenting. Severe (15%): lethargy, very sunken eyes, skin tenting >2sec.',
    explanation: 'Dehydration severity guides rehydration plan (oral vs IV) and urgency of intervention.'
  },
  {
    id: 'pearl-peds-fever',
    category: 'pediatrics',
    title: 'Fever in Young Infants',
    pearl: 'Fever (≥38°C rectal) in infant <28 days = full sepsis workup and admit. Age 29-60 days = workup, consider admission based on risk stratification.',
    explanation: 'Young infants have immature immune systems and can\'t localize infection well. Serious bacterial infection rate is higher.'
  },

  // Obstetrics
  {
    id: 'pearl-obs-magnesium',
    category: 'obstetrics',
    title: 'Magnesium Toxicity Signs',
    pearl: 'MgSO4 toxicity: loss of reflexes (8-12 mg/dL) → respiratory depression (12-15) → cardiac arrest (>15). Antidote: Calcium gluconate 1g IV.',
    explanation: 'Always check reflexes, respiratory rate, and urine output before each MgSO4 dose. Keep calcium gluconate at bedside.'
  },
  {
    id: 'pearl-obs-pph-4t',
    category: 'obstetrics',
    title: 'PPH 4 T\'s',
    pearl: 'Causes of PPH: Tone (70%), Trauma (20%), Tissue (10%), Thrombin (<1%). Start with fundal massage for tone.',
    explanation: 'Atony is most common. Massage the fundus, give uterotonics, then look for other causes if not responding.'
  },
  {
    id: 'pearl-obs-shoulder',
    category: 'obstetrics',
    title: 'Shoulder Dystocia - HELPERR',
    pearl: 'HELPERR: call for Help, Episiotomy (consider), Legs (McRoberts), suprapubic Pressure, Enter (Rubin/Woods), Remove posterior arm, Roll to all fours.',
    explanation: 'Systematic approach to shoulder dystocia. McRoberts + suprapubic pressure resolves most cases. NEVER use fundal pressure.'
  },

  // Trauma
  {
    id: 'pearl-trauma-lethal-triad',
    category: 'trauma',
    title: 'Trauma Lethal Triad',
    pearl: 'The lethal triad: Hypothermia + Acidosis + Coagulopathy. Each worsens the others. Aggressive warming and early blood products critical.',
    explanation: 'Break the cycle by preventing hypothermia, giving blood products (not just crystalloid), and damage control surgery.'
  },
  {
    id: 'pearl-trauma-permissive',
    category: 'trauma',
    title: 'Permissive Hypotension',
    pearl: 'In uncontrolled hemorrhage, target SBP 80-90 (or palpable radial pulse). Exception: target SBP 100-110 if TBI suspected.',
    explanation: 'High BP can "pop the clot" and worsen bleeding. But brain needs perfusion, so higher target in TBI.'
  },
  {
    id: 'pearl-trauma-txa',
    category: 'trauma',
    title: 'TXA Timing',
    pearl: 'TXA must be given within 3 hours of injury. After 3 hours, it may INCREASE mortality. Give 1g IV over 10 min + 1g over 8 hours.',
    explanation: 'CRASH-2 trial showed mortality benefit only when given early. Later TXA may worsen outcomes.'
  },

  // Infectious
  {
    id: 'pearl-sepsis-hour1',
    category: 'infectious',
    title: 'Sepsis Hour-1 Bundle',
    pearl: 'Sepsis Hour-1: Lactate, Blood cultures, Antibiotics, Fluids (30ml/kg crystalloid if hypotensive), Vasopressors (if still hypotensive).',
    explanation: 'Every hour of antibiotic delay increases mortality 7.6%. Start antibiotics within 1 hour of recognition.'
  },
  {
    id: 'pearl-meningitis-abx',
    category: 'infectious',
    title: 'Meningitis Antibiotics',
    pearl: 'Don\'t delay antibiotics for LP or imaging. If meningitis suspected, give antibiotics first, then LP. Time matters more than CSF sample.',
    explanation: 'LP can be done after antibiotics and CSF will still show findings for hours. But antibiotics delay costs lives.'
  },

  // General
  {
    id: 'pearl-general-qsofa',
    category: 'general',
    title: 'qSOFA for Sepsis',
    pearl: 'qSOFA: Respiratory rate ≥22, Altered mental status, SBP ≤100. Score ≥2 suggests high risk of poor outcome in infection.',
    explanation: 'Quick bedside screen for sepsis when full SOFA can\'t be calculated. Prompts escalation of care.'
  },
  {
    id: 'pearl-general-pain',
    category: 'general',
    title: 'Pain Won\'t Mask Peritonitis',
    pearl: 'Giving pain medication does NOT mask peritonitis or interfere with surgical diagnosis. Treat pain - it\'s humane and improves exam cooperation.',
    explanation: 'Old myth debunked by multiple studies. Analgesia may actually improve exam quality as patient can cooperate better.'
  }
];

// ============================================================================
// MNEMONICS
// ============================================================================

export const MNEMONICS: Mnemonic[] = [
  // Assessment Mnemonics
  {
    id: 'mnemonic-sample',
    category: 'assessment',
    letters: 'SAMPLE',
    fullForm: [
      'S - Signs and Symptoms',
      'A - Allergies',
      'M - Medications',
      'P - Past medical history',
      'L - Last oral intake',
      'E - Events leading to illness'
    ],
    context: 'Quick patient history gathering in emergency situations'
  },
  {
    id: 'mnemonic-opqrst',
    category: 'assessment',
    letters: 'OPQRST',
    fullForm: [
      'O - Onset (When did it start?)',
      'P - Provocation/Palliation (What makes it better/worse?)',
      'Q - Quality (Describe the pain/symptom)',
      'R - Region/Radiation (Where? Does it spread?)',
      'S - Severity (Scale 1-10)',
      'T - Time (Duration, constant or intermittent?)'
    ],
    context: 'Characterizing pain or any symptom'
  },
  {
    id: 'mnemonic-avpu',
    category: 'assessment',
    letters: 'AVPU',
    fullForm: [
      'A - Alert',
      'V - Responds to Verbal stimuli',
      'P - Responds to Painful stimuli',
      'U - Unresponsive'
    ],
    context: 'Quick mental status assessment (alternative to GCS)'
  },

  // Emergency Mnemonics
  {
    id: 'mnemonic-march',
    category: 'emergency',
    letters: 'MARCH',
    fullForm: [
      'M - Massive hemorrhage control',
      'A - Airway',
      'R - Respiration',
      'C - Circulation',
      'H - Hypothermia prevention'
    ],
    context: 'TCCC/Tactical trauma assessment priority order'
  },
  {
    id: 'mnemonic-hs-ts',
    category: 'emergency',
    letters: 'H\'s and T\'s',
    fullForm: [
      'H - Hypovolemia',
      'H - Hypoxia',
      'H - Hydrogen ion (acidosis)',
      'H - Hypo/Hyperkalemia',
      'H - Hypothermia',
      'H - Hypoglycemia',
      'T - Tension pneumothorax',
      'T - Tamponade (cardiac)',
      'T - Toxins',
      'T - Thrombosis (pulmonary)',
      'T - Thrombosis (coronary)'
    ],
    context: 'Reversible causes of cardiac arrest (PEA/asystole)'
  },
  {
    id: 'mnemonic-fast',
    category: 'emergency',
    letters: 'FAST',
    fullForm: [
      'F - Face drooping',
      'A - Arm weakness',
      'S - Speech difficulty',
      'T - Time to call emergency'
    ],
    context: 'Stroke recognition'
  },
  {
    id: 'mnemonic-befast',
    category: 'emergency',
    letters: 'BE-FAST',
    fullForm: [
      'B - Balance problems',
      'E - Eyes (vision changes)',
      'F - Face drooping',
      'A - Arm weakness',
      'S - Speech difficulty',
      'T - Time to call emergency'
    ],
    context: 'Extended stroke recognition (includes posterior circulation)'
  },

  // Differential Mnemonics
  {
    id: 'mnemonic-mudpiles',
    category: 'differential',
    letters: 'MUDPILES',
    fullForm: [
      'M - Methanol',
      'U - Uremia',
      'D - DKA/Alcoholic ketoacidosis',
      'P - Propylene glycol / Paraldehyde',
      'I - Isoniazid / Iron',
      'L - Lactate',
      'E - Ethylene glycol',
      'S - Salicylates'
    ],
    context: 'Causes of high anion gap metabolic acidosis'
  },
  {
    id: 'mnemonic-vindicate',
    category: 'differential',
    letters: 'VINDICATE',
    fullForm: [
      'V - Vascular',
      'I - Infectious/Inflammatory',
      'N - Neoplastic',
      'D - Degenerative/Drug',
      'I - Intoxication/Iatrogenic',
      'C - Congenital',
      'A - Autoimmune/Allergic',
      'T - Traumatic',
      'E - Endocrine/Metabolic'
    ],
    context: 'Systematic approach to differential diagnosis'
  },

  // Treatment Mnemonics
  {
    id: 'mnemonic-mona',
    category: 'treatment',
    letters: 'MONA',
    fullForm: [
      'M - Morphine (if pain persists)',
      'O - Oxygen (if hypoxic)',
      'N - Nitrates',
      'A - Aspirin'
    ],
    context: 'Initial ACS treatment (note: routine O2 no longer recommended if SpO2 >94%)'
  },
  {
    id: 'mnemonic-mrsopa',
    category: 'treatment',
    letters: 'MR SOPA',
    fullForm: [
      'M - Mask adjustment (seal)',
      'R - Reposition head (sniffing position)',
      'S - Suction (mouth then nose)',
      'O - Open mouth (jaw thrust)',
      'P - Pressure increase',
      'A - Alternative airway (ETT, LMA)'
    ],
    context: 'NRP corrective steps when PPV not working in newborn'
  },
  {
    id: 'mnemonic-helperr',
    category: 'treatment',
    letters: 'HELPERR',
    fullForm: [
      'H - Call for Help',
      'E - Evaluate for Episiotomy',
      'L - Legs (McRoberts position)',
      'P - suprapubic Pressure',
      'E - Enter (Rubin/Woods maneuver)',
      'R - Remove posterior arm',
      'R - Roll to all fours'
    ],
    context: 'Shoulder dystocia management sequence'
  }
];

// ============================================================================
// SBAR TEMPLATES
// ============================================================================

export const SBAR_TEMPLATES: SBARTemplate[] = [
  {
    id: 'sbar-critical-deterioration',
    scenario: 'Patient Deterioration',
    situation: [
      'I am calling about [patient name] in [location]',
      'The problem is [acute change]: vital sign abnormality / change in mental status / breathing difficulty / chest pain / new symptom',
      'I am concerned because [reason for call]'
    ],
    background: [
      'The patient was admitted on [date] for [reason]',
      'Relevant history: [diagnoses, recent procedures]',
      'Current treatment: [relevant medications, interventions]',
      'Recent trends: [labs, vitals, clinical course]'
    ],
    assessment: [
      'I think the problem is [your clinical impression]',
      'The patient is [stable/unstable]',
      'I\'m not sure what the problem is but the patient is deteriorating'
    ],
    recommendation: [
      'I need you to [come see the patient / give an order / transfer to higher level of care]',
      'Do you want me to [specific intervention]?',
      'Is there anything else you want me to do before you arrive?'
    ]
  },
  {
    id: 'sbar-handoff',
    scenario: 'Shift Handoff',
    situation: [
      'I am handing off [patient name], [age] [gender]',
      'Room [number], admitted for [chief complaint/diagnosis]',
      'Current status: [stable/improving/deteriorating]'
    ],
    background: [
      'Brief history: [relevant medical/surgical history]',
      'Hospital course: [what has happened during admission]',
      'Current medications: [key medications]',
      'Allergies: [list]',
      'Code status: [full code / DNR / etc.]'
    ],
    assessment: [
      'Currently: [summary of current condition]',
      'Recent vitals: [HR, BP, RR, SpO2, Temp]',
      'Latest labs/studies of concern: [results]',
      'Outstanding issues: [pending tests, consultations]'
    ],
    recommendation: [
      'Anticipate: [potential problems to watch for]',
      'Tasks pending: [what needs to be done]',
      'If [problem], then [action plan]',
      'Questions?'
    ]
  },
  {
    id: 'sbar-emergency-referral',
    scenario: 'Emergency Referral/Transfer',
    situation: [
      'This is [your name] from [facility]',
      'I have a patient who needs [emergency transfer/consultation]',
      'The patient is [stable/unstable for transport]'
    ],
    background: [
      'Patient: [name, age, gender]',
      'Presenting complaint: [chief complaint]',
      'Onset: [when symptoms started]',
      'Interventions already done: [treatments given]',
      'Relevant history: [PMH, medications, allergies]'
    ],
    assessment: [
      'Working diagnosis: [suspected condition]',
      'Current vitals: [HR, BP, RR, SpO2, GCS]',
      'Clinical status: [description]',
      'This is urgent because: [reason]'
    ],
    recommendation: [
      'This patient needs: [surgery / ICU / specialist care]',
      'Can you accept this patient?',
      'Estimated time of arrival: [ETA]',
      'What should we do during transport?'
    ]
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getPearlsByCategory(category: PearlCategory): ClinicalPearl[] {
  return CLINICAL_PEARLS.filter(p => p.category === category);
}

export function getMnemonicsByCategory(category: MnemonicCategory): Mnemonic[] {
  return MNEMONICS.filter(m => m.category === category);
}

export function searchPearls(query: string): ClinicalPearl[] {
  const lower = query.toLowerCase();
  return CLINICAL_PEARLS.filter(p =>
    p.title.toLowerCase().includes(lower) ||
    p.pearl.toLowerCase().includes(lower)
  );
}

export function searchMnemonics(query: string): Mnemonic[] {
  const lower = query.toLowerCase();
  return MNEMONICS.filter(m =>
    m.letters.toLowerCase().includes(lower) ||
    m.context.toLowerCase().includes(lower)
  );
}

export default {
  CLINICAL_PEARLS,
  MNEMONICS,
  SBAR_TEMPLATES,
  getPearlsByCategory,
  getMnemonicsByCategory,
  searchPearls,
  searchMnemonics
};
