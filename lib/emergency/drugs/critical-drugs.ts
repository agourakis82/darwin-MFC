/**
 * CRITICAL EMERGENCY DRUGS
 *
 * Essential medications for life-threatening emergencies
 * Includes dosing, administration, and resource-limited alternatives
 *
 * Based on WHO Essential Medicines List (EML) 2023
 *
 * References:
 * - WHO Model List of Essential Medicines 2023
 * - Pediatric Advanced Life Support (PALS)
 * - Advanced Cardiac Life Support (ACLS)
 * - Managing Complications in Pregnancy and Childbirth (MCPC)
 */

export interface CriticalDrug {
  id: string;
  name: string;
  genericName: string;
  atcCode: string;
  whoEML: boolean; // On WHO Essential Medicines List
  category: 'cardiac' | 'respiratory' | 'neurological' | 'obstetric' | 'toxicology' | 'metabolic' | 'anaphylaxis';
  indications: string[];
  adultDose: DoseRegimen;
  pediatricDose: DoseRegimen;
  route: string[];
  onset: string;
  duration: string;
  contraindications: string[];
  sideEffects: string[];
  monitoring: string[];
  storage: string;
  availability: AvailabilityInfo;
  alternatives: string[];
  quickReference: string;
}

export interface DoseRegimen {
  dose: string;
  frequency?: string;
  maxDose?: string;
  preparation?: string;
  administration?: string;
  specialPopulations?: Record<string, string>;
}

export interface AvailabilityInfo {
  common: boolean; // Available in most settings
  lowResource: boolean; // Available in low-resource settings
  refrigeration: boolean; // Requires cold chain
  notes?: string;
}

// ============================================================
// EPINEPHRINE (ADRENALINE)
// ============================================================

export const EPINEPHRINE: CriticalDrug = {
  id: 'epinephrine-001',
  name: 'Epinephrine (Adrenaline)',
  genericName: 'Epinephrine',
  atcCode: 'C01CA24',
  whoEML: true,
  category: 'anaphylaxis',
  indications: [
    'Anaphylaxis (first-line)',
    'Cardiac arrest (all rhythms)',
    'Severe asthma (adjunct)',
    'Severe bradycardia (refractory)',
    'Septic shock (after norepinephrine)'
  ],
  adultDose: {
    dose: 'Anaphylaxis: 0.3-0.5 mg IM (1:1000)\nCardiac arrest: 1 mg IV/IO (1:10,000)\nInfusion: 1-10 mcg/min',
    frequency: 'Anaphylaxis: q5-15 min as needed\nCardiac arrest: q3-5 min',
    preparation: '1:1000 = 1 mg/mL (IM)\n1:10,000 = 0.1 mg/mL (IV)',
    administration: 'IM: Mid-outer thigh, through clothing if needed\nIV: Central line preferred for infusion'
  },
  pediatricDose: {
    dose: 'Anaphylaxis: 0.01 mg/kg IM (max 0.5 mg)\nCardiac arrest: 0.01 mg/kg IV/IO (max 1 mg)',
    maxDose: '0.5 mg per dose',
    preparation: 'Use 1:1000 for IM\nFor IV: dilute to 1:10,000',
    specialPopulations: {
      infant: '<15 kg: Consider EpiPen Jr 0.15 mg',
      schoolAge: '>30 kg: Adult dose'
    }
  },
  route: ['IM (preferred for anaphylaxis)', 'IV', 'IO', 'ET (last resort)'],
  onset: 'IM: 5-10 minutes\nIV: 1-2 minutes',
  duration: '15-20 minutes',
  contraindications: ['None in true anaphylaxis or cardiac arrest'],
  sideEffects: ['Tachycardia', 'Hypertension', 'Anxiety', 'Tremor', 'Headache', 'Arrhythmias at high doses'],
  monitoring: ['Heart rate', 'Blood pressure', 'ECG if available'],
  storage: 'Protect from light. Room temperature. Check expiration.',
  availability: {
    common: true,
    lowResource: true,
    refrigeration: false,
    notes: 'Available worldwide. Auto-injectors may be costly.'
  },
  alternatives: ['None for anaphylaxis - epinephrine is irreplaceable'],
  quickReference: `
ANAPHYLAXIS: 0.5 mg IM (1:1000) mid-thigh. Repeat q5-15min.
CARDIAC ARREST: 1 mg IV q3-5min.
PEDS: 0.01 mg/kg IM/IV (max 0.5mg IM, 1mg IV)
`
};

// ============================================================
// NALOXONE
// ============================================================

export const NALOXONE: CriticalDrug = {
  id: 'naloxone-001',
  name: 'Naloxone (Narcan)',
  genericName: 'Naloxone',
  atcCode: 'V03AB15',
  whoEML: true,
  category: 'toxicology',
  indications: [
    'Opioid overdose (respiratory depression, pinpoint pupils, decreased consciousness)',
    'Empiric treatment of coma of unknown etiology',
    'Opioid-induced respiratory depression (iatrogenic)'
  ],
  adultDose: {
    dose: '0.4-2 mg IV/IM/IN/SC',
    frequency: 'Repeat every 2-3 minutes until adequate respiration',
    maxDose: '10 mg total (if no response, consider other causes)',
    preparation: 'IV: Can dilute with NS\nIN: 4 mg/0.1 mL per nostril',
    administration: 'Start with 0.4 mg in opioid-dependent patients to avoid withdrawal'
  },
  pediatricDose: {
    dose: '0.1 mg/kg IV/IM/IN (max 2 mg initial dose)',
    frequency: 'Repeat every 2-3 minutes as needed',
    maxDose: '10 mg total',
    specialPopulations: {
      neonate: '0.01-0.1 mg/kg IV/IM',
      infant: '0.1 mg/kg'
    }
  },
  route: ['IV (preferred)', 'IM', 'SC', 'IN (intranasal)', 'ET'],
  onset: 'IV: 1-2 minutes\nIM/SC: 2-5 minutes\nIN: 3-5 minutes',
  duration: '30-90 minutes (may need repeat dosing - opioids last longer)',
  contraindications: ['Known hypersensitivity'],
  sideEffects: [
    'Acute withdrawal syndrome (if opioid-dependent)',
    'Nausea, vomiting',
    'Tachycardia, hypertension',
    'Pulmonary edema (rare)',
    'Seizures (rare)'
  ],
  monitoring: ['Respiratory rate', 'Level of consciousness', 'Signs of withdrawal', 'Return of symptoms (re-sedation)'],
  storage: 'Room temperature. Protect from light.',
  availability: {
    common: true,
    lowResource: true,
    refrigeration: false,
    notes: 'Increasingly available as nasal spray for community use'
  },
  alternatives: ['None - naloxone is specific antidote'],
  quickReference: `
OPIOID OVERDOSE: 0.4-2 mg IV/IM/IN
Repeat q2-3min until breathing
WATCH FOR RE-SEDATION (opioids last longer than naloxone)
May need infusion: 2/3 of reversal dose per hour
PEDS: 0.1 mg/kg IV/IM (max 2 mg)
`
};

// ============================================================
// OXYTOCIN
// ============================================================

export const OXYTOCIN: CriticalDrug = {
  id: 'oxytocin-001',
  name: 'Oxytocin (Pitocin)',
  genericName: 'Oxytocin',
  atcCode: 'H01BB02',
  whoEML: true,
  category: 'obstetric',
  indications: [
    'Postpartum hemorrhage (PPH) - first-line',
    'Prevention of PPH after delivery',
    'Augmentation of labor',
    'Induction of labor'
  ],
  adultDose: {
    dose: 'PPH treatment: 10 units IM OR 5 units slow IV\nPPH prevention: 10 units IM after delivery\nInfusion: 10-40 units in 500 mL NS',
    frequency: 'PPH: May repeat IM dose after 10-15 min',
    maxDose: '3 doses IM (30 units) for PPH',
    preparation: '10 units/mL typical concentration',
    administration: 'IV BOLUS CAN CAUSE HYPOTENSION - give slowly over 1 min minimum'
  },
  pediatricDose: {
    dose: 'Not applicable (obstetric use only)',
    specialPopulations: {
      adolescent_pregnancy: 'Same as adult dosing'
    }
  },
  route: ['IM (preferred for PPH)', 'IV infusion', 'IV slow bolus'],
  onset: 'IM: 3-5 minutes\nIV: <1 minute',
  duration: 'IM: 30-60 minutes\nIV: 20 minutes',
  contraindications: ['Hypersensitivity', 'Unfavorable fetal position (for labor)', 'Placenta previa', 'Cord prolapse', 'Previous uterine surgery (relative)'],
  sideEffects: ['Uterine hyperstimulation', 'Fetal distress', 'Nausea', 'Hypotension (IV bolus)', 'Water intoxication (prolonged use)'],
  monitoring: ['Uterine contractions', 'Fetal heart rate (if antepartum)', 'Blood loss', 'Blood pressure'],
  storage: 'Refrigerate. Protect from light. Stable at room temp short-term.',
  availability: {
    common: true,
    lowResource: true,
    refrigeration: true,
    notes: 'Essential for any facility managing deliveries'
  },
  alternatives: ['Misoprostol 800 mcg SL/PR if oxytocin unavailable', 'Ergometrine 0.2 mg IM', 'Carbetocin (heat-stable oxytocin analog)'],
  quickReference: `
PPH TREATMENT: 10 units IM (can repeat x2)
PPH PREVENTION: 10 units IM after placenta delivery
IV INFUSION: 10-40 units in 500 mL NS
⚠️ IV BOLUS SLOWLY - can cause hypotension
If no response: Add misoprostol 800 mcg SL/PR
`
};

// ============================================================
// MAGNESIUM SULFATE
// ============================================================

export const MAGNESIUM_SULFATE: CriticalDrug = {
  id: 'magnesium-sulfate-001',
  name: 'Magnesium Sulfate',
  genericName: 'Magnesium Sulfate',
  atcCode: 'B05XA05',
  whoEML: true,
  category: 'obstetric',
  indications: [
    'Eclampsia (seizures in pregnancy) - first-line',
    'Severe pre-eclampsia (seizure prophylaxis)',
    'Torsades de pointes (cardiac)',
    'Severe asthma (refractory)',
    'Hypomagnesemia'
  ],
  adultDose: {
    dose: 'Eclampsia/Pre-eclampsia:\nLoading: 4-6 g IV over 15-20 min\nMaintenance: 1-2 g/hr IV infusion\n\nOR Pritchard IM regimen:\nLoading: 4 g IV + 5 g IM each buttock\nMaintenance: 5 g IM q4h',
    maxDose: 'Maintenance until 24h postpartum or 24h after last seizure',
    preparation: '4 g in 100 mL NS for IV bolus\n1 g/hr = 20 g in 500 mL NS at 25 mL/hr',
    administration: 'IM injection painful - use with 1 mL lidocaine'
  },
  pediatricDose: {
    dose: 'Hypomagnesemia: 25-50 mg/kg IV over 3-4 hours\nAsthma: 25-75 mg/kg IV over 20 min (max 2 g)',
    maxDose: '2 g/dose for asthma',
    specialPopulations: {
      adolescent_pregnancy: 'Same as adult dosing for eclampsia'
    }
  },
  route: ['IV infusion', 'IM (Pritchard regimen)'],
  onset: 'IV: Immediate\nIM: 60 minutes',
  duration: '4-6 hours',
  contraindications: ['Myasthenia gravis', 'Heart block', 'Severe renal failure (use with caution)'],
  sideEffects: ['Flushing', 'Hypotension', 'Respiratory depression (toxicity)', 'Loss of DTRs (toxicity)', 'Cardiac arrest (severe toxicity)'],
  monitoring: [
    'Deep tendon reflexes (check q1h - loss = toxicity)',
    'Respiratory rate (>12/min)',
    'Urine output (>30 mL/hr)',
    'Magnesium level if available (therapeutic 4-7 mEq/L)'
  ],
  storage: 'Room temperature',
  availability: {
    common: true,
    lowResource: true,
    refrigeration: false,
    notes: 'Should be available at any facility managing deliveries'
  },
  alternatives: ['Diazepam or phenytoin for seizures if MgSO4 unavailable (less effective)'],
  quickReference: `
ECLAMPSIA/PRE-ECLAMPSIA:
Loading: 4-6 g IV over 15-20 min
Maintenance: 1-2 g/hr IV infusion
Continue 24h postpartum

TOXICITY SIGNS (STOP infusion):
• Loss of patellar reflex
• Resp rate <12
• Urine output <30 mL/hr

ANTIDOTE: Calcium gluconate 1 g IV over 3 min
`
};

// ============================================================
// DEXTROSE 50%
// ============================================================

export const DEXTROSE_50: CriticalDrug = {
  id: 'dextrose-50-001',
  name: 'Dextrose 50% (D50W)',
  genericName: 'Dextrose',
  atcCode: 'B05BA03',
  whoEML: true,
  category: 'metabolic',
  indications: [
    'Hypoglycemia (glucose <70 mg/dL with symptoms)',
    'Altered mental status of unknown cause',
    'Coma workup (empiric treatment)',
    'Hyperkalemia (with insulin)'
  ],
  adultDose: {
    dose: '25-50 g IV (50-100 mL of D50W)',
    frequency: 'Repeat glucose check in 15 min, repeat dose if still low',
    preparation: 'D50W = 50% dextrose = 500 mg/mL',
    administration: 'Give via large vein - caustic, can cause phlebitis'
  },
  pediatricDose: {
    dose: 'D25W: 0.5-1 g/kg (2-4 mL/kg of D25W)\nD10W for neonates: 2 mL/kg',
    maxDose: '25 g',
    preparation: 'Dilute D50W 1:1 with sterile water to make D25W\nDilute further for neonates',
    specialPopulations: {
      neonate: 'D10W 2-4 mL/kg - D50W too concentrated for neonates',
      infant: 'D25W preferred over D50W'
    }
  },
  route: ['IV (preferred)', 'IO'],
  onset: '1-5 minutes',
  duration: 'Variable - depends on cause of hypoglycemia',
  contraindications: ['Hyperglycemia', 'Known intracranial hemorrhage (relative)'],
  sideEffects: ['Phlebitis (caustic to veins)', 'Hyperglycemia', 'Hypokalemia', 'Fluid overload'],
  monitoring: ['Blood glucose (q15-30 min initially)', 'IV site for infiltration'],
  storage: 'Room temperature',
  availability: {
    common: true,
    lowResource: true,
    refrigeration: false,
    notes: 'Essential emergency medication'
  },
  alternatives: [
    'Oral glucose gel/juice if conscious and able to swallow',
    'Glucagon 1 mg IM if no IV access',
    'NG dextrose if IV not possible and unconscious'
  ],
  quickReference: `
HYPOGLYCEMIA: 50 mL D50W IV (25g dextrose)
Recheck glucose in 15 min
Repeat if still <70 mg/dL

PEDS: 0.5-1 g/kg IV
• Neonate: D10W 2-4 mL/kg
• Child: D25W 2-4 mL/kg

NO IV? → Glucagon 1 mg IM
CONSCIOUS? → Oral glucose/juice
`
};

// ============================================================
// CALCIUM GLUCONATE
// ============================================================

export const CALCIUM_GLUCONATE: CriticalDrug = {
  id: 'calcium-gluconate-001',
  name: 'Calcium Gluconate',
  genericName: 'Calcium Gluconate',
  atcCode: 'A12AA03',
  whoEML: true,
  category: 'metabolic',
  indications: [
    'Hyperkalemia (cardiac membrane stabilization)',
    'Hypocalcemia (tetany, seizures)',
    'Calcium channel blocker overdose',
    'Magnesium sulfate toxicity (antidote)',
    'Hydrofluoric acid burns'
  ],
  adultDose: {
    dose: 'Hyperkalemia: 1-2 g (10-20 mL of 10%) IV over 2-5 min\nHypocalcemia: 1-2 g IV over 10-20 min\nMg toxicity: 1 g IV over 3 min',
    frequency: 'Hyperkalemia: Effect lasts 30-60 min, may repeat',
    preparation: '10% solution = 100 mg/mL = 9.3 mg elemental calcium/mL',
    administration: 'Give slowly - rapid administration can cause bradycardia'
  },
  pediatricDose: {
    dose: '60-100 mg/kg IV (max 3 g) over 5-10 min',
    maxDose: '3 g',
    preparation: 'Dilute in D5W or NS',
    specialPopulations: {
      neonate: '100 mg/kg IV over 5-10 min'
    }
  },
  route: ['IV (preferred)', 'IO'],
  onset: '1-3 minutes',
  duration: '30-60 minutes',
  contraindications: ['Digoxin toxicity (relative - can worsen)', 'Hypercalcemia'],
  sideEffects: ['Bradycardia (if given too fast)', 'Hypotension', 'Tissue necrosis if extravasation'],
  monitoring: ['ECG', 'Calcium levels', 'IV site'],
  storage: 'Room temperature',
  availability: {
    common: true,
    lowResource: true,
    refrigeration: false,
    notes: 'Calcium chloride is alternative (3x more potent, more irritating)'
  },
  alternatives: ['Calcium chloride 500 mg IV (more potent but more irritating)'],
  quickReference: `
HYPERKALEMIA: 1-2 g IV over 2-5 min
(Stabilizes heart, does NOT lower K+)

MG TOXICITY: 1 g IV over 3 min
(Antidote for magnesium sulfate overdose)

CA CHANNEL BLOCKER OD: 3-6 g IV bolus, then 0.5-2 g/hr infusion

PEDS: 60-100 mg/kg IV (max 3 g)
`
};

// ============================================================
// ACTIVATED CHARCOAL
// ============================================================

export const ACTIVATED_CHARCOAL: CriticalDrug = {
  id: 'activated-charcoal-001',
  name: 'Activated Charcoal',
  genericName: 'Activated Charcoal',
  atcCode: 'A07BA01',
  whoEML: true,
  category: 'toxicology',
  indications: [
    'Oral poisoning (most drugs/toxins)',
    'Drug overdose (within 1-2 hours of ingestion)',
    'Multi-dose for sustained-release or enteric-coated meds'
  ],
  adultDose: {
    dose: '50-100 g PO or via NG tube',
    frequency: 'Single dose usually. Multi-dose: 25-50 g q4-6h for some toxins',
    preparation: 'Mix with water to make slurry (8:1 water:charcoal)',
    administration: 'More effective if given within 1 hour of ingestion'
  },
  pediatricDose: {
    dose: '1-2 g/kg PO or NG (max 50 g)',
    maxDose: '50 g',
    preparation: 'May mix with fruit juice to improve palatability',
    specialPopulations: {
      infant: '10-25 g',
      child: '25-50 g'
    }
  },
  route: ['PO', 'NG tube'],
  onset: 'Immediate adsorption',
  duration: 'Single passage through GI tract',
  contraindications: [
    'Unprotected airway (risk of aspiration)',
    'GI obstruction or perforation',
    'Substances not adsorbed: alcohols, metals (iron, lithium), acids, alkalis, cyanide'
  ],
  sideEffects: ['Aspiration pneumonitis', 'Vomiting', 'Constipation', 'Black stools'],
  monitoring: ['Airway protection', 'Aspiration risk', 'Bowel sounds'],
  storage: 'Room temperature. Shelf-stable.',
  availability: {
    common: true,
    lowResource: true,
    refrigeration: false,
    notes: 'Can use universal activated charcoal without cathartic'
  },
  alternatives: ['Gastric lavage (rarely indicated)', 'Whole bowel irrigation (for packets, sustained-release)'],
  quickReference: `
POISONING/OVERDOSE: 50-100 g PO/NG
Best within 1 hour of ingestion

DOES NOT WORK FOR:
• Alcohols (ethanol, methanol, ethylene glycol)
• Iron, lithium, potassium
• Acids, alkalis (caustics)
• Cyanide, heavy metals

PEDS: 1-2 g/kg (max 50 g)

⚠️ PROTECT AIRWAY - aspiration risk
`
};

// ============================================================
// HYDROCORTISONE
// ============================================================

export const HYDROCORTISONE: CriticalDrug = {
  id: 'hydrocortisone-001',
  name: 'Hydrocortisone (Solu-Cortef)',
  genericName: 'Hydrocortisone Sodium Succinate',
  atcCode: 'H02AB09',
  whoEML: true,
  category: 'metabolic',
  indications: [
    'Adrenal crisis (primary adrenal insufficiency)',
    'Septic shock (refractory to vasopressors)',
    'Anaphylaxis (adjunct - not first-line)',
    'Acute asthma exacerbation (alternative to methylprednisolone)'
  ],
  adultDose: {
    dose: 'Adrenal crisis: 100 mg IV bolus, then 50-100 mg IV q6-8h or 200 mg/day continuous\nSeptic shock: 200 mg/day (50 mg q6h or continuous)',
    frequency: 'q6-8h or continuous infusion',
    maxDose: 'No maximum in crisis',
    preparation: 'Reconstitute with provided diluent',
    administration: 'IV push or infusion'
  },
  pediatricDose: {
    dose: 'Adrenal crisis: 2 mg/kg IV bolus (max 100 mg), then 50-100 mg/m²/day divided q6h',
    maxDose: '100 mg/dose',
    preparation: 'Same as adult',
    specialPopulations: {
      neonate: '25-50 mg IV, then 25 mg q6h'
    }
  },
  route: ['IV', 'IM'],
  onset: '1-2 hours for clinical effect',
  duration: '8-12 hours',
  contraindications: ['Systemic fungal infection (relative)'],
  sideEffects: ['Hyperglycemia', 'Hypertension', 'Immunosuppression (prolonged use)', 'Hypokalemia'],
  monitoring: ['Blood glucose', 'Blood pressure', 'Electrolytes', 'Signs of infection'],
  storage: 'Reconstituted: Use within 24 hours',
  availability: {
    common: true,
    lowResource: true,
    refrigeration: false,
    notes: 'Essential for adrenal crisis - can be lifesaving'
  },
  alternatives: ['Dexamethasone 4 mg IV (if hydrocortisone unavailable)', 'Methylprednisolone'],
  quickReference: `
ADRENAL CRISIS: 100 mg IV bolus
Then 50-100 mg IV q6-8h (or 200 mg/day continuous)
+ NS fluid resuscitation

SEPTIC SHOCK: 200 mg/day (50 mg q6h)
Only if refractory to vasopressors
Taper when vasopressors weaned

PEDS: 2 mg/kg IV (max 100 mg)
`
};

// ============================================================
// COLLECTION OF ALL CRITICAL DRUGS
// ============================================================

export const CRITICAL_EMERGENCY_DRUGS: CriticalDrug[] = [
  EPINEPHRINE,
  NALOXONE,
  OXYTOCIN,
  MAGNESIUM_SULFATE,
  DEXTROSE_50,
  CALCIUM_GLUCONATE,
  ACTIVATED_CHARCOAL,
  HYDROCORTISONE
];

// Quick lookup by indication
export function getDrugsByIndication(indication: string): CriticalDrug[] {
  return CRITICAL_EMERGENCY_DRUGS.filter(drug =>
    drug.indications.some(ind => ind.toLowerCase().includes(indication.toLowerCase()))
  );
}

// Quick lookup by category
export function getDrugsByCategory(category: CriticalDrug['category']): CriticalDrug[] {
  return CRITICAL_EMERGENCY_DRUGS.filter(drug => drug.category === category);
}

// Check WHO EML status
export function getWHOEMLDrugs(): CriticalDrug[] {
  return CRITICAL_EMERGENCY_DRUGS.filter(drug => drug.whoEML);
}

// ============================================================
// EMERGENCY DRUG QUICK REFERENCE CARD
// ============================================================

export const CRITICAL_DRUGS_QUICK_CARD = `
╔══════════════════════════════════════════════════════════════════╗
║               CRITICAL EMERGENCY DRUGS                           ║
╠══════════════════════════════════════════════════════════════════╣
║ CONDITION          │ DRUG              │ ADULT DOSE              ║
╠════════════════════╪═══════════════════╪═════════════════════════╣
║ Anaphylaxis        │ EPINEPHRINE       │ 0.5 mg IM (1:1000)     ║
║ Cardiac arrest     │ EPINEPHRINE       │ 1 mg IV q3-5min        ║
║ Opioid overdose    │ NALOXONE          │ 0.4-2 mg IV/IM/IN      ║
║ Postpartum hemorrh │ OXYTOCIN          │ 10 units IM            ║
║ Eclampsia/seizure  │ MAGNESIUM SULFATE │ 4-6 g IV loading       ║
║ Hypoglycemia       │ DEXTROSE 50%      │ 50 mL IV (25 g)        ║
║ Hyperkalemia       │ CALCIUM GLUCONATE │ 1-2 g IV over 2-5 min  ║
║ Mg toxicity        │ CALCIUM GLUCONATE │ 1 g IV over 3 min      ║
║ Poisoning/OD       │ ACTIVATED CHARCOAL│ 50-100 g PO/NG         ║
║ Adrenal crisis     │ HYDROCORTISONE    │ 100 mg IV bolus        ║
╚══════════════════════════════════════════════════════════════════╝
`;

export default {
  EPINEPHRINE,
  NALOXONE,
  OXYTOCIN,
  MAGNESIUM_SULFATE,
  DEXTROSE_50,
  CALCIUM_GLUCONATE,
  ACTIVATED_CHARCOAL,
  HYDROCORTISONE,
  CRITICAL_EMERGENCY_DRUGS,
  getDrugsByIndication,
  getDrugsByCategory,
  getWHOEMLDrugs,
  CRITICAL_DRUGS_QUICK_CARD
};
