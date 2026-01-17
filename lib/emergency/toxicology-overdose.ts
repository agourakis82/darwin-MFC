/**
 * Toxicology & Overdose Protocols
 * Emergency management of poisoning and drug overdose
 *
 * Darwin-MFC Emergency System
 * For healthcare workers in resource-limited settings
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ToxicologyProtocol {
  id: string;
  name: string;
  category: 'opioid' | 'sedative' | 'stimulant' | 'analgesic' | 'cardiac' | 'anticholinergic' | 'cholinergic' | 'environmental';
  commonAgents: string[];
  toxidrome: Toxidrome;
  diagnosticClues: string[];
  immediateActions: string[];
  decontamination: DecontaminationStrategy;
  antidote?: Antidote;
  supportiveCare: SupportiveCareItem[];
  monitoring: MonitoringItem[];
  disposition: string;
}

export interface Toxidrome {
  vitals: {
    hr: 'increased' | 'decreased' | 'variable' | 'normal';
    bp: 'increased' | 'decreased' | 'variable' | 'normal';
    rr: 'increased' | 'decreased' | 'variable' | 'normal';
    temp: 'increased' | 'decreased' | 'variable' | 'normal';
  };
  pupils: 'mydriasis' | 'miosis' | 'normal' | 'variable';
  skin: string;
  mental: string;
  other: string[];
}

export interface DecontaminationStrategy {
  indicated: boolean;
  method: string;
  contraindications: string[];
  timing: string;
}

export interface Antidote {
  drug: string;
  mechanism: string;
  dose: string;
  route: string;
  frequency: string;
  maxDose?: string;
  pediatricDose?: string;
  warnings: string[];
  availability: 'common' | 'hospital' | 'specialized';
}

export interface SupportiveCareItem {
  issue: string;
  intervention: string;
}

export interface MonitoringItem {
  parameter: string;
  frequency: string;
  significance: string;
}

// ============================================================================
// OPIOID OVERDOSE
// ============================================================================

export const OPIOID_OVERDOSE_PROTOCOL: ToxicologyProtocol = {
  id: 'opioid-overdose',
  name: 'Opioid Overdose',
  category: 'opioid',
  commonAgents: [
    'Heroin',
    'Fentanyl (illicit)',
    'Morphine',
    'Oxycodone',
    'Hydrocodone',
    'Methadone',
    'Tramadol',
    'Codeine'
  ],

  toxidrome: {
    vitals: { hr: 'decreased', bp: 'decreased', rr: 'decreased', temp: 'decreased' },
    pupils: 'miosis',
    skin: 'Pale, cool, clammy; may be cyanotic',
    mental: 'CNS depression → obtundation → coma',
    other: [
      'Classic triad: Miosis, CNS depression, respiratory depression',
      'Bradypnea (<12/min) or apnea',
      'Track marks (if IV use)',
      'Pulmonary edema (non-cardiogenic)'
    ]
  },

  diagnosticClues: [
    'History of opioid use or prescription',
    'Drug paraphernalia',
    'Pinpoint pupils even in bright light',
    'Response to naloxone (diagnostic and therapeutic)',
    'May have mixed ingestion (opioid + benzo/alcohol)'
  ],

  immediateActions: [
    '1. Open airway, assess breathing',
    '2. If not breathing: bag-valve-mask ventilation',
    '3. Administer naloxone',
    '4. Call for help/emergency services',
    '5. Place in recovery position if responsive',
    '6. Prepare for repeat naloxone doses'
  ],

  decontamination: {
    indicated: false,
    method: 'N/A for injectable/inhaled opioids; activated charcoal only if large oral ingestion <1 hour and airway protected',
    contraindications: ['Altered mental status', 'Unprotected airway'],
    timing: 'Not typically indicated'
  },

  antidote: {
    drug: 'Naloxone (Narcan)',
    mechanism: 'Competitive opioid receptor antagonist',
    dose: '0.4-2mg IV/IM/IN, repeat q2-3min as needed',
    route: 'IV preferred; IM, IN, SC all effective',
    frequency: 'q2-3min until respiratory improvement',
    maxDose: 'No max; may need 10mg+ for fentanyl/potent opioids',
    pediatricDose: '0.1mg/kg (max 2mg), may repeat',
    warnings: [
      'May precipitate acute withdrawal in dependent patients',
      'Short half-life (30-90min) - may need repeat doses or infusion',
      'Fentanyl may require higher doses',
      'Start low in opioid-dependent patients to avoid severe withdrawal'
    ],
    availability: 'common'
  },

  supportiveCare: [
    { issue: 'Respiratory depression', intervention: 'BVM ventilation, titrate naloxone to RR >12' },
    { issue: 'Hypotension', intervention: 'IV fluids; usually responds to reversal' },
    { issue: 'Hypothermia', intervention: 'Warming measures' },
    { issue: 'Pulmonary edema', intervention: 'Oxygen, consider CPAP, supportive care' },
    { issue: 'Seizures', intervention: 'Benzodiazepines (rare with pure opioids, consider co-ingestion)' }
  ],

  monitoring: [
    { parameter: 'Respiratory rate', frequency: 'Continuous', significance: 'Primary toxicity marker' },
    { parameter: 'SpO2', frequency: 'Continuous', significance: 'Monitor for re-sedation' },
    { parameter: 'Level of consciousness', frequency: 'q15min', significance: 'Track naloxone effect duration' },
    { parameter: 'Pupils', frequency: 'q30min', significance: 'Re-miosis suggests wearing off' }
  ],

  disposition: 'Observe minimum 4-6 hours after last naloxone; longer for long-acting opioids (methadone: 24+ hours). Consider naloxone infusion (2/3 effective bolus dose per hour).'
};

// ============================================================================
// BENZODIAZEPINE OVERDOSE
// ============================================================================

export const BENZODIAZEPINE_OVERDOSE_PROTOCOL: ToxicologyProtocol = {
  id: 'benzodiazepine-overdose',
  name: 'Benzodiazepine Overdose',
  category: 'sedative',
  commonAgents: [
    'Diazepam (Valium)',
    'Alprazolam (Xanax)',
    'Lorazepam (Ativan)',
    'Clonazepam (Klonopin)',
    'Midazolam',
    'Temazepam',
    'Flunitrazepam (Rohypnol)'
  ],

  toxidrome: {
    vitals: { hr: 'normal', bp: 'decreased', rr: 'decreased', temp: 'normal' },
    pupils: 'normal',
    skin: 'Normal',
    mental: 'CNS depression, slurred speech, ataxia, drowsiness → coma',
    other: [
      'Less respiratory depression than opioids (unless combined)',
      'Paradoxical agitation in some patients',
      'Hyporeflexia',
      'Anterograde amnesia'
    ]
  },

  diagnosticClues: [
    'History of benzodiazepine use or prescription',
    'Normal pupils (unlike opioids)',
    'CNS depression with relatively preserved respirations',
    'May have mixed ingestion (commonly with opioids or alcohol)',
    'Response to flumazenil (if used)'
  ],

  immediateActions: [
    '1. Assess airway, breathing, circulation',
    '2. Supplemental oxygen if hypoxic',
    '3. IV access',
    '4. Consider co-ingestants (especially opioids, alcohol)',
    '5. Supportive care is usually sufficient',
    '6. Flumazenil is NOT routine (risk of seizures)'
  ],

  decontamination: {
    indicated: true,
    method: 'Activated charcoal 1g/kg (max 50g) if large recent ingestion',
    contraindications: ['Altered mental status', 'Risk of aspiration', '>1-2 hours post-ingestion'],
    timing: 'Within 1-2 hours of ingestion if airway protected'
  },

  antidote: {
    drug: 'Flumazenil (Romazicon)',
    mechanism: 'Competitive GABA-A receptor antagonist',
    dose: '0.2mg IV over 30 sec, then 0.3mg, then 0.5mg q1min',
    route: 'IV only',
    frequency: 'q1min until response or max dose',
    maxDose: '3-5mg total',
    pediatricDose: '0.01mg/kg (max 0.2mg), repeat to max 1mg',
    warnings: [
      'CONTRAINDICATED if chronic benzo use (precipitates seizures)',
      'CONTRAINDICATED if co-ingestion with pro-convulsant (TCA, cocaine)',
      'Short half-life - resedation common',
      'Reserved for iatrogenic oversedation in benzo-naive patients',
      'NOT for routine overdose'
    ],
    availability: 'hospital'
  },

  supportiveCare: [
    { issue: 'Respiratory depression', intervention: 'BVM ventilation, intubation if severe' },
    { issue: 'Hypotension', intervention: 'IV fluids, vasopressors rarely needed' },
    { issue: 'Airway protection', intervention: 'Lateral decubitus, intubate if GCS <8' },
    { issue: 'Aspiration risk', intervention: 'NPO, lateral position, suction available' }
  ],

  monitoring: [
    { parameter: 'Level of consciousness', frequency: 'q30min-1h', significance: 'Track progression' },
    { parameter: 'Respiratory rate', frequency: 'q30min', significance: 'Watch for delayed depression' },
    { parameter: 'SpO2', frequency: 'Continuous', significance: 'Early hypoxia detection' },
    { parameter: 'Blood pressure', frequency: 'q1h', significance: 'Usually stable' }
  ],

  disposition: 'Observe until mental status clears. Long-acting agents (diazepam, clonazepam) may require 24+ hour observation. Pure benzo OD rarely fatal; look for co-ingestants if severe.'
};

// ============================================================================
// ACETAMINOPHEN (PARACETAMOL) OVERDOSE
// ============================================================================

export const ACETAMINOPHEN_OVERDOSE_PROTOCOL: ToxicologyProtocol = {
  id: 'acetaminophen-overdose',
  name: 'Acetaminophen (Paracetamol) Overdose',
  category: 'analgesic',
  commonAgents: [
    'Tylenol',
    'Paracetamol',
    'Panadol',
    'Combination products (Vicodin, Percocet, NyQuil)',
    'Extended-release formulations'
  ],

  toxidrome: {
    vitals: { hr: 'normal', bp: 'normal', rr: 'normal', temp: 'normal' },
    pupils: 'normal',
    skin: 'Normal initially; jaundice if liver failure develops',
    mental: 'Normal initially; encephalopathy late if hepatic failure',
    other: [
      'Stage 1 (0-24h): Asymptomatic or mild GI symptoms',
      'Stage 2 (24-72h): RUQ pain, elevated LFTs',
      'Stage 3 (72-96h): Peak hepatotoxicity, possible liver failure',
      'Stage 4 (4d-2wk): Recovery or death'
    ]
  },

  diagnosticClues: [
    'History of ingestion (intentional or accidental)',
    'Initially ASYMPTOMATIC - do not be reassured',
    'Toxic dose: >150mg/kg or >7.5g in adults',
    'Check 4-hour acetaminophen level for Rumack-Matthew nomogram',
    'Check LFTs, INR, creatinine, lactate'
  ],

  immediateActions: [
    '1. Determine time and amount of ingestion',
    '2. Activated charcoal if <4 hours post-ingestion',
    '3. Draw serum acetaminophen level at 4 hours post-ingestion',
    '4. Start NAC if ingestion >150mg/kg or level above treatment line',
    '5. Check LFTs, INR, BMP, lactate',
    '6. Contact Poison Control'
  ],

  decontamination: {
    indicated: true,
    method: 'Activated charcoal 1g/kg (max 50g)',
    contraindications: ['Altered mental status', '>4 hours post-ingestion', 'Vomiting'],
    timing: 'Within 4 hours of ingestion, ideally within 1-2 hours'
  },

  antidote: {
    drug: 'N-Acetylcysteine (NAC, Acetadote, Mucomyst)',
    mechanism: 'Glutathione precursor; directly detoxifies NAPQI metabolite',
    dose: 'IV: 150mg/kg over 1h → 50mg/kg over 4h → 100mg/kg over 16h (21h protocol). PO: 140mg/kg load → 70mg/kg q4h x17 doses',
    route: 'IV preferred; PO if IV unavailable',
    frequency: 'Continuous infusion (IV) or q4h (PO)',
    maxDose: 'None for initial dosing',
    pediatricDose: 'Same mg/kg dosing',
    warnings: [
      'Most effective within 8 hours of ingestion',
      'Still beneficial up to 24+ hours if hepatotoxicity present',
      'Anaphylactoid reactions possible with IV NAC (slow infusion)',
      'PO NAC causes nausea/vomiting - give with antiemetics',
      'Continue until INR normalizing and LFTs improving'
    ],
    availability: 'hospital'
  },

  supportiveCare: [
    { issue: 'Nausea/vomiting', intervention: 'Ondansetron 4-8mg IV; metoclopramide' },
    { issue: 'Hepatic encephalopathy', intervention: 'Lactulose, restrict protein, ICU' },
    { issue: 'Coagulopathy', intervention: 'Vitamin K 10mg IV, FFP only if bleeding' },
    { issue: 'Hypoglycemia', intervention: 'Dextrose infusion, frequent glucose monitoring' },
    { issue: 'Acute kidney injury', intervention: 'Supportive; may need RRT' },
    { issue: 'Fulminant hepatic failure', intervention: 'Transfer for liver transplant evaluation' }
  ],

  monitoring: [
    { parameter: 'Acetaminophen level', frequency: 'At 4h, repeat if extended-release', significance: 'Plot on nomogram' },
    { parameter: 'LFTs (AST/ALT)', frequency: 'q12-24h', significance: 'Peak 72-96h; >1000 indicates severe' },
    { parameter: 'INR/PT', frequency: 'q12-24h', significance: 'Best prognostic marker' },
    { parameter: 'Creatinine', frequency: 'q12-24h', significance: 'Hepatorenal syndrome risk' },
    { parameter: 'Blood glucose', frequency: 'q4-6h', significance: 'Hypoglycemia in liver failure' },
    { parameter: 'Lactate', frequency: 'q12-24h', significance: 'Elevated = poor prognosis' }
  ],

  disposition: 'Admit all patients requiring NAC. Transfer to liver center if INR >3 at 48h, creatinine >3.3, pH <7.3, grade 3-4 encephalopathy, or lactate >3.5 after fluid resuscitation.'
};

// ============================================================================
// TRICYCLIC ANTIDEPRESSANT OVERDOSE
// ============================================================================

export const TCA_OVERDOSE_PROTOCOL: ToxicologyProtocol = {
  id: 'tca-overdose',
  name: 'Tricyclic Antidepressant Overdose',
  category: 'cardiac',
  commonAgents: [
    'Amitriptyline (Elavil)',
    'Nortriptyline (Pamelor)',
    'Imipramine (Tofranil)',
    'Desipramine (Norpramin)',
    'Doxepin (Sinequan)',
    'Clomipramine (Anafranil)'
  ],

  toxidrome: {
    vitals: { hr: 'increased', bp: 'variable', rr: 'variable', temp: 'increased' },
    pupils: 'mydriasis',
    skin: 'Dry, flushed, hot',
    mental: 'Agitation → lethargy → seizures → coma',
    other: [
      'Anticholinergic effects (dry, hot, red, blind, mad)',
      'Wide QRS complex (>100ms) on ECG - hallmark',
      'R wave in aVR >3mm',
      'Right axis deviation',
      'Seizures',
      'Hypotension'
    ]
  },

  diagnosticClues: [
    'History of TCA prescription or access',
    'RAPID deterioration (can go from awake to seizing in minutes)',
    'ECG changes: Wide QRS >100ms, R wave aVR >3mm',
    'Anticholinergic symptoms',
    'Combination of altered mental status + seizures + cardiac conduction abnormalities'
  ],

  immediateActions: [
    '1. Immediate ECG - look for QRS widening',
    '2. IV access, continuous cardiac monitoring',
    '3. Sodium bicarbonate if QRS >100ms',
    '4. Prepare for rapid deterioration and seizures',
    '5. Avoid flumazenil (lowers seizure threshold)',
    '6. Intubate early if declining'
  ],

  decontamination: {
    indicated: true,
    method: 'Activated charcoal 1g/kg if within 1-2 hours',
    contraindications: ['Altered mental status', 'Seizures', 'Deteriorating rapidly'],
    timing: 'Very early (<1 hour); rapid absorption'
  },

  antidote: {
    drug: 'Sodium Bicarbonate',
    mechanism: 'Increases serum pH → reduces TCA binding to sodium channels; also provides sodium load',
    dose: '1-2 mEq/kg IV bolus, repeat until QRS narrows',
    route: 'IV bolus, then infusion',
    frequency: 'Bolus q3-5min until QRS <100ms, then infusion',
    maxDose: 'No max; titrate to serum pH 7.50-7.55',
    pediatricDose: 'Same mEq/kg dosing',
    warnings: [
      'Goal serum pH 7.50-7.55',
      'Monitor for hypokalemia (shifts K intracellularly)',
      'Watch for volume overload',
      'May need continuous infusion (150mEq in D5W at 2x maintenance)'
    ],
    availability: 'common'
  },

  supportiveCare: [
    { issue: 'Wide QRS >100ms', intervention: 'Sodium bicarbonate boluses' },
    { issue: 'Seizures', intervention: 'Benzodiazepines (diazepam 5-10mg IV); NOT phenytoin' },
    { issue: 'Hypotension', intervention: 'IV fluids, then norepinephrine (NOT dopamine)' },
    { issue: 'Arrhythmias', intervention: 'Sodium bicarbonate; lidocaine for refractory VT; avoid Class IA/IC' },
    { issue: 'Refractory VT/VF', intervention: 'Lipid emulsion therapy (Intralipid 20%)' }
  ],

  monitoring: [
    { parameter: 'Continuous ECG', frequency: 'Continuous', significance: 'QRS width most important' },
    { parameter: 'Serum pH', frequency: 'q2-4h', significance: 'Target 7.50-7.55' },
    { parameter: 'Potassium', frequency: 'q2-4h', significance: 'Bicarb causes hypokalemia' },
    { parameter: 'Blood pressure', frequency: 'Continuous', significance: 'Watch for refractory hypotension' },
    { parameter: 'Mental status', frequency: 'q30min', significance: 'Anticipate rapid changes' }
  ],

  disposition: 'ICU admission mandatory. High risk of sudden deterioration. Monitor for minimum 6 hours after QRS normalizes. Deaths have occurred up to 24 hours post-ingestion.'
};

// ============================================================================
// BETA-BLOCKER OVERDOSE
// ============================================================================

export const BETA_BLOCKER_OVERDOSE_PROTOCOL: ToxicologyProtocol = {
  id: 'beta-blocker-overdose',
  name: 'Beta-Blocker Overdose',
  category: 'cardiac',
  commonAgents: [
    'Metoprolol',
    'Atenolol',
    'Propranolol',
    'Carvedilol',
    'Labetalol',
    'Sotalol (also antiarrhythmic)'
  ],

  toxidrome: {
    vitals: { hr: 'decreased', bp: 'decreased', rr: 'decreased', temp: 'normal' },
    pupils: 'normal',
    skin: 'Cool, pale',
    mental: 'Lethargy, confusion, coma',
    other: [
      'Bradycardia (most consistent finding)',
      'Hypotension',
      'Hypoglycemia (especially in children)',
      'Bronchospasm (asthmatic patients)',
      'Heart block, QRS/QT prolongation (sotalol)'
    ]
  },

  diagnosticClues: [
    'Access to beta-blockers',
    'Bradycardia out of proportion to hypotension',
    'Relative preservation of mental status initially',
    'Check glucose (hypoglycemia common)',
    'ECG: Sinus bradycardia, heart block'
  ],

  immediateActions: [
    '1. IV access, continuous cardiac monitoring',
    '2. Check blood glucose immediately',
    '3. Atropine 0.5-1mg IV (often ineffective)',
    '4. IV glucagon (first-line specific therapy)',
    '5. High-dose insulin euglycemic therapy if severe',
    '6. Prepare for pacing if refractory bradycardia'
  ],

  decontamination: {
    indicated: true,
    method: 'Activated charcoal 1g/kg if within 1-2 hours',
    contraindications: ['Hemodynamically unstable', 'Altered mental status'],
    timing: 'Early if patient stable'
  },

  antidote: {
    drug: 'Glucagon',
    mechanism: 'Activates adenylate cyclase independent of beta-receptors → increases cAMP → positive inotropy/chronotropy',
    dose: '3-5mg IV bolus, can repeat up to 10mg total',
    route: 'IV bolus, then infusion',
    frequency: 'Bolus, then 2-5mg/hr infusion',
    maxDose: '10mg bolus, infusion titrated to effect',
    pediatricDose: '0.05-0.15mg/kg (max 1mg)',
    warnings: [
      'Causes significant nausea/vomiting - pretreat with antiemetic',
      'Hyperglycemia expected',
      'Effect may wane - may need HIGH-DOSE INSULIN as second-line',
      'Short supply at many hospitals'
    ],
    availability: 'hospital'
  },

  supportiveCare: [
    { issue: 'Bradycardia', intervention: 'Atropine → Glucagon → Pacing' },
    { issue: 'Hypotension', intervention: 'IV fluids, glucagon, then norepinephrine/epinephrine' },
    { issue: 'Hypoglycemia', intervention: 'Dextrose 25-50g IV, frequent monitoring' },
    { issue: 'Heart block', intervention: 'Transcutaneous then transvenous pacing' },
    { issue: 'Refractory shock', intervention: 'High-dose insulin euglycemic therapy (HIET): Regular insulin 1 U/kg bolus, then 1 U/kg/hr + dextrose' },
    { issue: 'Cardiac arrest', intervention: 'Lipid emulsion therapy (Intralipid 20%), consider ECMO' }
  ],

  monitoring: [
    { parameter: 'Heart rate', frequency: 'Continuous', significance: 'Primary toxicity marker' },
    { parameter: 'Blood pressure', frequency: 'Continuous', significance: 'May need arterial line' },
    { parameter: 'Blood glucose', frequency: 'q1h', significance: 'Hypoglycemia common' },
    { parameter: 'Potassium', frequency: 'q2-4h', significance: 'Shifts with HIET' },
    { parameter: 'ECG', frequency: 'Continuous', significance: 'Watch for blocks, QT (sotalol)' }
  ],

  disposition: 'ICU for symptomatic patients. Observe asymptomatic patients 6-12 hours (longer for sustained-release). Sotalol requires longer monitoring due to QT prolongation risk.'
};

// ============================================================================
// CALCIUM CHANNEL BLOCKER OVERDOSE
// ============================================================================

export const CCB_OVERDOSE_PROTOCOL: ToxicologyProtocol = {
  id: 'ccb-overdose',
  name: 'Calcium Channel Blocker Overdose',
  category: 'cardiac',
  commonAgents: [
    'Verapamil (most toxic)',
    'Diltiazem',
    'Amlodipine',
    'Nifedipine',
    'Felodipine'
  ],

  toxidrome: {
    vitals: { hr: 'decreased', bp: 'decreased', rr: 'normal', temp: 'normal' },
    pupils: 'normal',
    skin: 'Warm (vasodilation) despite hypotension',
    mental: 'Initially preserved, then confusion, coma',
    other: [
      'Bradycardia (verapamil, diltiazem)',
      'Hypotension (all, especially dihydropyridines)',
      'Hyperglycemia (insulin secretion blocked)',
      'Reflex tachycardia possible with dihydropyridines',
      'Heart block'
    ]
  },

  diagnosticClues: [
    'Access to calcium channel blockers',
    'Hypotension with warm extremities (vasodilation)',
    'Hyperglycemia (unlike beta-blocker which causes hypoglycemia)',
    'Bradycardia with verapamil/diltiazem',
    'ECG: Sinus bradycardia, AV block'
  ],

  immediateActions: [
    '1. IV access, continuous cardiac monitoring',
    '2. Check blood glucose (hyperglycemia expected)',
    '3. IV calcium (first-line)',
    '4. IV fluids cautiously',
    '5. High-dose insulin euglycemic therapy for shock',
    '6. Prepare for pacing'
  ],

  decontamination: {
    indicated: true,
    method: 'Activated charcoal 1g/kg, especially for sustained-release',
    contraindications: ['Hemodynamically unstable', 'Altered mental status'],
    timing: 'May be beneficial even late for sustained-release formulations'
  },

  antidote: {
    drug: 'Calcium (Calcium chloride or Calcium gluconate)',
    mechanism: 'Increases extracellular calcium to overcome channel blockade',
    dose: 'Calcium chloride 10% 1-2g IV (central line) or Calcium gluconate 3-6g IV',
    route: 'IV; calcium chloride only via central line',
    frequency: 'q10-20min, can give as continuous infusion',
    maxDose: 'No max; goal ionized Ca 2x normal',
    pediatricDose: 'CaCl 20mg/kg or CaGluc 60mg/kg',
    warnings: [
      'Calcium chloride: 3x more elemental calcium, requires central line (tissue necrosis)',
      'Calcium gluconate: safer peripherally, less potent',
      'Target ionized calcium 2x normal (4 mg/dL)',
      'Monitor for hypercalcemia, tissue injury if extravasation'
    ],
    availability: 'common'
  },

  supportiveCare: [
    { issue: 'Hypotension', intervention: 'Calcium → IV fluids (careful) → vasopressors → HIET' },
    { issue: 'Bradycardia/block', intervention: 'Calcium, atropine usually ineffective, pacing' },
    { issue: 'Refractory shock', intervention: 'HIGH-DOSE INSULIN: 1 U/kg bolus + 1-10 U/kg/hr infusion + dextrose' },
    { issue: 'Hyperglycemia', intervention: 'Expected; do NOT treat with insulin until HIET started' },
    { issue: 'Cardiac arrest', intervention: 'Lipid emulsion 20%, consider ECMO' }
  ],

  monitoring: [
    { parameter: 'Heart rate', frequency: 'Continuous', significance: 'Bradycardia with non-DHP' },
    { parameter: 'Blood pressure', frequency: 'Continuous (arterial line)', significance: 'Primary concern' },
    { parameter: 'Ionized calcium', frequency: 'q2h', significance: 'Target 2x normal' },
    { parameter: 'Blood glucose', frequency: 'q1h during HIET', significance: 'Requires dextrose infusion' },
    { parameter: 'Potassium', frequency: 'q2-4h', significance: 'Shifts with HIET' },
    { parameter: 'Lactate', frequency: 'q4h', significance: 'Marker of tissue perfusion' }
  ],

  disposition: 'ICU mandatory for symptomatic patients. Sustained-release formulations may have delayed and prolonged toxicity (observe 24+ hours). High mortality - early aggressive treatment essential.'
};

// ============================================================================
// ORGANOPHOSPHATE/NERVE AGENT POISONING
// ============================================================================

export const ORGANOPHOSPHATE_PROTOCOL: ToxicologyProtocol = {
  id: 'organophosphate-poisoning',
  name: 'Organophosphate/Nerve Agent Poisoning',
  category: 'cholinergic',
  commonAgents: [
    'Malathion',
    'Parathion',
    'Chlorpyrifos',
    'Diazinon',
    'Nerve agents: Sarin, VX, Novichok'
  ],

  toxidrome: {
    vitals: { hr: 'variable', bp: 'variable', rr: 'decreased', temp: 'normal' },
    pupils: 'miosis',
    skin: 'Diaphoretic, salivation',
    mental: 'Anxiety → confusion → seizures → coma',
    other: [
      'SLUDGE/BBB: Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis / Bradycardia, Bronchorrhea, Bronchospasm',
      'DUMBELS: Diarrhea, Urination, Miosis, Bronchospasm/Bradycardia, Emesis, Lacrimation, Salivation',
      'Muscle fasciculations → weakness → paralysis',
      'Garlic/petroleum odor',
      'Respiratory failure (bronchospasm + secretions + paralysis)'
    ]
  },

  diagnosticClues: [
    'Exposure history (agricultural, industrial, military)',
    'Cholinergic crisis: wet everywhere (sweating, salivating, tearing, incontinent)',
    'Miosis (pinpoint pupils)',
    'Muscle fasciculations',
    'Characteristic odor',
    'Low RBC/plasma cholinesterase (if available)'
  ],

  immediateActions: [
    '1. DECONTAMINATE: Remove clothing, wash skin with soap/water',
    '2. PROTECT YOURSELF: PPE, avoid secondary contamination',
    '3. Atropine: Large doses until secretions dry',
    '4. Pralidoxime (2-PAM) as soon as possible',
    '5. Suction airway, oxygen',
    '6. Benzodiazepines for seizures'
  ],

  decontamination: {
    indicated: true,
    method: 'Remove all clothing, wash entire body with soap and water, copious irrigation',
    contraindications: ['None - decontamination is critical'],
    timing: 'IMMEDIATE - before other interventions if possible'
  },

  antidote: {
    drug: 'Atropine + Pralidoxime (2-PAM)',
    mechanism: 'Atropine: Competitive muscarinic antagonist. Pralidoxime: Reactivates acetylcholinesterase before aging',
    dose: 'Atropine 2-4mg IV q5-10min (may need 10-20mg+ total). Pralidoxime 1-2g IV over 15-30min',
    route: 'IV; atropine can be given IM if no IV',
    frequency: 'Atropine: titrate to secretions. Pralidoxime: load then infusion 500mg/hr',
    maxDose: 'Atropine: no max (titrate). Pralidoxime: load + infusion',
    pediatricDose: 'Atropine 0.02-0.05mg/kg. Pralidoxime 25-50mg/kg',
    warnings: [
      'Atropine doses in OP poisoning are MUCH HIGHER than usual',
      'Endpoint: Drying of secretions, NOT heart rate or pupil size',
      'Pralidoxime must be given early (before enzyme "ages")',
      'Continue pralidoxime infusion until clinical improvement',
      'Tachycardia is NOT a contraindication to atropine in OP poisoning'
    ],
    availability: 'hospital'
  },

  supportiveCare: [
    { issue: 'Bronchorrhea/bronchospasm', intervention: 'Atropine, suction, oxygen, intubation PRN' },
    { issue: 'Seizures', intervention: 'Diazepam 5-10mg IV or midazolam; NOT phenytoin' },
    { issue: 'Muscle weakness/paralysis', intervention: 'Ventilatory support; pralidoxime' },
    { issue: 'Respiratory failure', intervention: 'Early intubation; avoid succinylcholine' },
    { issue: 'Contamination', intervention: 'Strict decontamination; protect staff' }
  ],

  monitoring: [
    { parameter: 'Secretions', frequency: 'Continuous', significance: 'Atropine endpoint = dry secretions' },
    { parameter: 'Respiratory status', frequency: 'Continuous', significance: 'Most common cause of death' },
    { parameter: 'Pupil size', frequency: 'q30min', significance: 'NOT atropine endpoint' },
    { parameter: 'Muscle strength', frequency: 'q2h', significance: 'Intermediate syndrome at 1-4 days' },
    { parameter: 'Cholinesterase', frequency: 'Daily if available', significance: 'Confirms diagnosis, tracks recovery' }
  ],

  disposition: 'ICU mandatory. Prolonged monitoring needed (days to weeks). Watch for intermediate syndrome (weakness 1-4 days post-exposure) and delayed neuropathy (2-3 weeks).'
};

// ============================================================================
// QUICK REFERENCE: TOXICOLOGY
// ============================================================================

export const TOXICOLOGY_QUICK_REFERENCE = {
  opioids: {
    triad: 'Miosis + CNS depression + Respiratory depression',
    antidote: 'Naloxone 0.4-2mg IV/IM/IN q2-3min',
    pitfall: 'Re-sedation (naloxone shorter half-life than most opioids)'
  },
  benzos: {
    presentation: 'CNS depression, normal pupils, preserved respirations',
    antidote: 'Flumazenil (AVOID if chronic use - causes seizures)',
    pitfall: 'Usually not fatal alone; look for co-ingestants'
  },
  acetaminophen: {
    warning: 'ASYMPTOMATIC initially, deadly later',
    antidote: 'NAC (N-acetylcysteine) - most effective within 8 hours',
    key_tests: '4-hour level, LFTs, INR'
  },
  tca: {
    ecg: 'Wide QRS >100ms, R wave aVR >3mm',
    antidote: 'Sodium bicarbonate until QRS narrows',
    pitfall: 'Rapid deterioration, avoid flumazenil (seizures)'
  },
  beta_blocker: {
    clue: 'Bradycardia + hypoglycemia',
    antidote: 'Glucagon 3-10mg IV, then High-dose Insulin',
    pitfall: 'Atropine usually ineffective'
  },
  ccb: {
    clue: 'Bradycardia/hypotension + HYPERglycemia + warm skin',
    antidote: 'Calcium + High-dose Insulin (HIET)',
    pitfall: 'Sustained-release - delayed and prolonged toxicity'
  },
  organophosphate: {
    mnemonic: 'SLUDGE/BBB or DUMBELS',
    antidote: 'HIGH-dose atropine (endpoint: dry secretions) + Pralidoxime',
    critical: 'DECONTAMINATE first, protect yourself'
  }
};

// ============================================================================
// ANTIDOTE SUMMARY TABLE
// ============================================================================

export const ANTIDOTE_SUMMARY = [
  {
    toxin: 'Opioids',
    antidote: 'Naloxone',
    dose: '0.4-2mg IV/IM/IN',
    notes: 'May need 10mg+ for fentanyl'
  },
  {
    toxin: 'Benzodiazepines',
    antidote: 'Flumazenil',
    dose: '0.2mg IV, up to 3-5mg',
    notes: 'AVOID if chronic use or TCA coingest'
  },
  {
    toxin: 'Acetaminophen',
    antidote: 'N-Acetylcysteine (NAC)',
    dose: '150mg/kg IV load, then infusion',
    notes: 'Best within 8h, still works later'
  },
  {
    toxin: 'TCAs',
    antidote: 'Sodium Bicarbonate',
    dose: '1-2 mEq/kg IV boluses',
    notes: 'Goal: narrow QRS, pH 7.50-7.55'
  },
  {
    toxin: 'Beta-blockers',
    antidote: 'Glucagon',
    dose: '3-10mg IV bolus, then 2-5mg/hr',
    notes: 'Causes nausea; may need HIET'
  },
  {
    toxin: 'Calcium Channel Blockers',
    antidote: 'Calcium + High-dose Insulin',
    dose: 'CaCl 1-2g or CaGluc 3-6g; Insulin 1U/kg',
    notes: 'HIET is cornerstone for severe'
  },
  {
    toxin: 'Organophosphates',
    antidote: 'Atropine + Pralidoxime',
    dose: 'Atropine 2-4mg q5min; 2-PAM 1-2g',
    notes: 'Very high atropine doses needed'
  },
  {
    toxin: 'Methanol/Ethylene glycol',
    antidote: 'Fomepizole or Ethanol',
    dose: 'Fomepizole 15mg/kg IV load',
    notes: 'Hemodialysis for severe'
  },
  {
    toxin: 'Digoxin',
    antidote: 'Digibind (Fab fragments)',
    dose: 'Based on level or empiric 10-20 vials',
    notes: 'For life-threatening toxicity'
  },
  {
    toxin: 'Iron',
    antidote: 'Deferoxamine',
    dose: '15mg/kg/hr IV infusion',
    notes: 'Vin rose urine indicates chelation'
  },
  {
    toxin: 'Cyanide',
    antidote: 'Hydroxocobalamin',
    dose: '5g IV over 15min (adult)',
    notes: 'Or cyanide antidote kit'
  },
  {
    toxin: 'Carbon monoxide',
    antidote: 'Oxygen (100%)',
    dose: 'High-flow or hyperbaric',
    notes: 'Hyperbaric for severe/pregnancy'
  }
];

// ============================================================================
// EXPORTS
// ============================================================================

export const TOXICOLOGY_PROTOCOLS = [
  OPIOID_OVERDOSE_PROTOCOL,
  BENZODIAZEPINE_OVERDOSE_PROTOCOL,
  ACETAMINOPHEN_OVERDOSE_PROTOCOL,
  TCA_OVERDOSE_PROTOCOL,
  BETA_BLOCKER_OVERDOSE_PROTOCOL,
  CCB_OVERDOSE_PROTOCOL,
  ORGANOPHOSPHATE_PROTOCOL
] as const;

export const TOXICOLOGY_CATEGORIES = {
  opioid: ['opioid-overdose'],
  sedative: ['benzodiazepine-overdose'],
  analgesic: ['acetaminophen-overdose'],
  cardiac: ['tca-overdose', 'beta-blocker-overdose', 'ccb-overdose'],
  cholinergic: ['organophosphate-poisoning']
} as const;

export function getToxicologyProtocol(id: string): ToxicologyProtocol | undefined {
  return TOXICOLOGY_PROTOCOLS.find(p => p.id === id);
}

export function getProtocolsByToxCategory(category: ToxicologyProtocol['category']): ToxicologyProtocol[] {
  return TOXICOLOGY_PROTOCOLS.filter(p => p.category === category);
}

export function getAntidoteForToxin(toxin: string): typeof ANTIDOTE_SUMMARY[number] | undefined {
  return ANTIDOTE_SUMMARY.find(a =>
    a.toxin.toLowerCase().includes(toxin.toLowerCase())
  );
}
