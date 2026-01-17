/**
 * Drug Alternatives for Resource-Limited Settings
 * When primary medications are unavailable, what can be used instead
 *
 * References:
 * - WHO Model List of Essential Medicines 23rd Edition (2023)
 * - MSF Essential Drugs Manual
 * - WHO Clinical Management Guidelines
 * - Surviving Sepsis Campaign Guidelines
 *
 * For healthcare workers facing medication shortages in:
 * - Rural/remote clinics
 * - Humanitarian emergencies
 * - Conflict zones
 * - Resource-limited settings
 */

export interface DrugAlternative {
  id: string;
  primaryDrug: string;
  primaryClass: string;
  indication: string;
  alternatives: Alternative[];
  ivToPoConversion?: IVtoPOConversion;
  dilutionGuide?: DilutionGuide;
  notes: string;
}

export interface Alternative {
  drug: string;
  dose: string;
  route: string;
  effectiveness: 'equivalent' | 'acceptable' | 'suboptimal';
  caveats: string[];
  whoEML: boolean; // On WHO Essential Medicines List
}

export interface IVtoPOConversion {
  ivDose: string;
  poDose: string;
  bioavailabilityNote: string;
  whenToSwitch: string;
}

export interface DilutionGuide {
  originalConcentration: string;
  targetConcentration: string;
  dilutionInstructions: string;
}

// ============================================================================
// ANTIBIOTICS - ALTERNATIVES
// ============================================================================

export const ANTIBIOTIC_ALTERNATIVES: DrugAlternative[] = [
  {
    id: 'ceftriaxone-alt',
    primaryDrug: 'Ceftriaxone',
    primaryClass: '3rd generation cephalosporin',
    indication: 'Severe infections (meningitis, sepsis, pneumonia)',
    alternatives: [
      {
        drug: 'Cefotaxime',
        dose: '2g IV q8h (adult), 200mg/kg/day divided q6h (child)',
        route: 'IV',
        effectiveness: 'equivalent',
        caveats: ['More frequent dosing required', 'Shorter half-life'],
        whoEML: true
      },
      {
        drug: 'Ampicillin + Gentamicin',
        dose: 'Ampicillin 2g IV q4h + Gentamicin 5mg/kg/day',
        route: 'IV',
        effectiveness: 'acceptable',
        caveats: ['Nephrotoxicity monitoring needed', 'Not for meningitis if cephalosporin-resistant organisms suspected'],
        whoEML: true
      },
      {
        drug: 'Chloramphenicol',
        dose: '50-100mg/kg/day divided q6h (max 4g/day)',
        route: 'IV/PO',
        effectiveness: 'acceptable',
        caveats: ['Bone marrow toxicity risk', 'Monitor CBC if possible', 'Good CNS penetration'],
        whoEML: true
      }
    ],
    ivToPoConversion: {
      ivDose: '1-2g IV daily',
      poDose: 'N/A (no oral form)',
      bioavailabilityNote: 'Must use oral alternatives: cefixime 400mg daily or amoxicillin-clavulanate',
      whenToSwitch: 'When patient afebrile 24-48h and clinically improving'
    },
    notes: 'Ceftriaxone is irreplaceable for some indications (meningitis). Stock as priority.'
  },
  {
    id: 'amoxicillin-alt',
    primaryDrug: 'Amoxicillin',
    primaryClass: 'Aminopenicillin',
    indication: 'Respiratory infections, UTI, otitis media',
    alternatives: [
      {
        drug: 'Ampicillin',
        dose: '500mg-1g PO q6h',
        route: 'PO/IV',
        effectiveness: 'equivalent',
        caveats: ['Same spectrum but less GI absorption', 'IV form available'],
        whoEML: true
      },
      {
        drug: 'Penicillin V',
        dose: '250-500mg PO q6h',
        route: 'PO',
        effectiveness: 'acceptable',
        caveats: ['Narrower spectrum', 'Better for strep pharyngitis'],
        whoEML: true
      },
      {
        drug: 'Erythromycin',
        dose: '250-500mg PO q6h',
        route: 'PO',
        effectiveness: 'acceptable',
        caveats: ['For penicillin-allergic patients', 'GI side effects common'],
        whoEML: true
      }
    ],
    ivToPoConversion: {
      ivDose: 'Ampicillin 1g IV q6h',
      poDose: 'Amoxicillin 500mg-1g PO q8h',
      bioavailabilityNote: 'Amoxicillin has 90% oral bioavailability, ampicillin only 50%',
      whenToSwitch: 'When patient tolerating oral and clinically improving'
    },
    notes: 'Amoxicillin is first-line for many community infections - high priority essential medicine'
  },
  {
    id: 'azithromycin-alt',
    primaryDrug: 'Azithromycin',
    primaryClass: 'Macrolide',
    indication: 'Atypical pneumonia, STIs, traveler\'s diarrhea',
    alternatives: [
      {
        drug: 'Erythromycin',
        dose: '500mg PO q6h x 7-14 days',
        route: 'PO/IV',
        effectiveness: 'equivalent',
        caveats: ['More frequent dosing', 'GI upset common', 'Drug interactions (CYP3A4)'],
        whoEML: true
      },
      {
        drug: 'Doxycycline',
        dose: '100mg PO BID',
        route: 'PO',
        effectiveness: 'equivalent',
        caveats: ['Avoid in pregnancy/children <8y', 'Photosensitivity'],
        whoEML: true
      },
      {
        drug: 'Clarithromycin',
        dose: '500mg PO BID',
        route: 'PO',
        effectiveness: 'equivalent',
        caveats: ['Taste disturbance', 'Drug interactions'],
        whoEML: false
      }
    ],
    notes: 'For Chlamydia: doxycycline 100mg BID x 7d is equally effective'
  },
  {
    id: 'ciprofloxacin-alt',
    primaryDrug: 'Ciprofloxacin',
    primaryClass: 'Fluoroquinolone',
    indication: 'UTI, GI infections, bone/joint infections',
    alternatives: [
      {
        drug: 'Norfloxacin',
        dose: '400mg PO BID',
        route: 'PO',
        effectiveness: 'acceptable',
        caveats: ['Good for uncomplicated UTI', 'Not systemic infection'],
        whoEML: true
      },
      {
        drug: 'Ofloxacin',
        dose: '200-400mg PO BID',
        route: 'PO',
        effectiveness: 'equivalent',
        caveats: ['Similar spectrum'],
        whoEML: true
      },
      {
        drug: 'TMP-SMX',
        dose: '160/800mg PO BID',
        route: 'PO',
        effectiveness: 'acceptable',
        caveats: ['For UTI', 'Check local resistance patterns', 'Sulfa allergy precaution'],
        whoEML: true
      },
      {
        drug: 'Ceftriaxone + Metronidazole',
        dose: 'Ceftriaxone 1g IV + Metro 500mg IV q8h',
        route: 'IV',
        effectiveness: 'acceptable',
        caveats: ['For intra-abdominal infections when cipro unavailable'],
        whoEML: true
      }
    ],
    ivToPoConversion: {
      ivDose: '400mg IV q12h',
      poDose: '500-750mg PO BID',
      bioavailabilityNote: 'Excellent oral bioavailability (70-80%), IV rarely needed',
      whenToSwitch: 'Can often start oral unless severely ill'
    },
    notes: 'Fluoroquinolone resistance increasing - reserve for appropriate indications'
  },
  {
    id: 'metronidazole-alt',
    primaryDrug: 'Metronidazole',
    primaryClass: 'Nitroimidazole',
    indication: 'Anaerobic infections, C. diff, giardia, amebiasis',
    alternatives: [
      {
        drug: 'Tinidazole',
        dose: '2g PO single dose (giardia), 500mg BID (anaerobes)',
        route: 'PO',
        effectiveness: 'equivalent',
        caveats: ['Longer half-life', 'May be better tolerated'],
        whoEML: true
      },
      {
        drug: 'Ornidazole',
        dose: '500mg PO BID',
        route: 'PO',
        effectiveness: 'equivalent',
        caveats: ['Available in some regions'],
        whoEML: false
      },
      {
        drug: 'Clindamycin',
        dose: '600mg IV q8h or 300mg PO q6h',
        route: 'IV/PO',
        effectiveness: 'suboptimal',
        caveats: ['For anaerobic coverage only', 'Not antiprotozoal', 'C. diff risk'],
        whoEML: true
      }
    ],
    ivToPoConversion: {
      ivDose: '500mg IV q8h',
      poDose: '500mg PO q8h',
      bioavailabilityNote: 'Near 100% oral bioavailability - IV rarely needed',
      whenToSwitch: 'Switch to oral as soon as patient can tolerate'
    },
    notes: 'Metronidazole is the only effective drug for some protozoal infections - stock essential'
  }
];

// ============================================================================
// ANALGESICS - ALTERNATIVES
// ============================================================================

export const ANALGESIC_ALTERNATIVES: DrugAlternative[] = [
  {
    id: 'morphine-alt',
    primaryDrug: 'Morphine',
    primaryClass: 'Opioid analgesic',
    indication: 'Severe pain, palliative care, MI',
    alternatives: [
      {
        drug: 'Tramadol',
        dose: '50-100mg PO/IV q4-6h',
        route: 'PO/IV',
        effectiveness: 'suboptimal',
        caveats: ['Less potent (1/10 morphine)', 'Max 400mg/day', 'Seizure risk'],
        whoEML: true
      },
      {
        drug: 'Codeine',
        dose: '30-60mg PO q4-6h',
        route: 'PO',
        effectiveness: 'suboptimal',
        caveats: ['Requires CYP2D6 metabolism', 'Variable response', 'Max 240mg/day'],
        whoEML: true
      },
      {
        drug: 'Pethidine (Meperidine)',
        dose: '50-100mg IM/IV q3-4h',
        route: 'IM/IV',
        effectiveness: 'acceptable',
        caveats: ['Not for chronic use (normeperidine toxicity)', 'Seizure risk', 'Short-acting'],
        whoEML: false
      },
      {
        drug: 'Fentanyl',
        dose: '25-100mcg IV/IM',
        route: 'IV/IM/Transdermal',
        effectiveness: 'equivalent',
        caveats: ['More potent (100x morphine)', 'Shorter duration IV', 'Transdermal for chronic'],
        whoEML: true
      }
    ],
    ivToPoConversion: {
      ivDose: '10mg IV morphine',
      poDose: '30mg PO morphine',
      bioavailabilityNote: 'Oral morphine 30% bioavailable - need 3x IV dose',
      whenToSwitch: 'When pain controlled and patient tolerating oral'
    },
    notes: 'Morphine is the gold standard for severe pain - essential medicine'
  },
  {
    id: 'ketamine-alt',
    primaryDrug: 'Ketamine',
    primaryClass: 'Dissociative anesthetic',
    indication: 'Procedural sedation, anesthesia, analgesia',
    alternatives: [
      {
        drug: 'Midazolam + Fentanyl',
        dose: 'Midazolam 0.05mg/kg + Fentanyl 1mcg/kg IV',
        route: 'IV',
        effectiveness: 'acceptable',
        caveats: ['More respiratory depression', 'Need monitoring', 'Reversal agents available'],
        whoEML: true
      },
      {
        drug: 'Propofol',
        dose: '0.5-1mg/kg IV',
        route: 'IV',
        effectiveness: 'acceptable',
        caveats: ['More respiratory/cardiac depression', 'Needs airway support ready'],
        whoEML: true
      },
      {
        drug: 'Thiopental',
        dose: '3-5mg/kg IV',
        route: 'IV',
        effectiveness: 'acceptable',
        caveats: ['Respiratory depression', 'Short duration', 'Old standard'],
        whoEML: true
      }
    ],
    notes: 'Ketamine is ideal for resource-limited settings - maintains airway reflexes and BP'
  },
  {
    id: 'ibuprofen-alt',
    primaryDrug: 'Ibuprofen',
    primaryClass: 'NSAID',
    indication: 'Pain, fever, inflammation',
    alternatives: [
      {
        drug: 'Diclofenac',
        dose: '50mg PO TID or 75mg IM',
        route: 'PO/IM/Topical',
        effectiveness: 'equivalent',
        caveats: ['Similar GI risk', 'IM form useful', 'CV risk'],
        whoEML: true
      },
      {
        drug: 'Naproxen',
        dose: '250-500mg PO BID',
        route: 'PO',
        effectiveness: 'equivalent',
        caveats: ['Longer half-life', 'Less CV risk than diclofenac'],
        whoEML: false
      },
      {
        drug: 'Aspirin',
        dose: '325-650mg PO q4-6h',
        route: 'PO',
        effectiveness: 'acceptable',
        caveats: ['More GI bleeding risk', 'Avoid in children (Reye)', 'Good for CV protection'],
        whoEML: true
      },
      {
        drug: 'Paracetamol (Acetaminophen)',
        dose: '500-1000mg PO q4-6h (max 4g/day)',
        route: 'PO/IV',
        effectiveness: 'suboptimal',
        caveats: ['Good for pain/fever', 'NO anti-inflammatory effect', 'Liver toxicity in overdose'],
        whoEML: true
      }
    ],
    notes: 'For inflammatory conditions, paracetamol is not a substitute - need NSAID'
  }
];

// ============================================================================
// CARDIOVASCULAR - ALTERNATIVES
// ============================================================================

export const CARDIOVASCULAR_ALTERNATIVES: DrugAlternative[] = [
  {
    id: 'adrenaline-alt',
    primaryDrug: 'Epinephrine (Adrenaline)',
    primaryClass: 'Catecholamine',
    indication: 'Cardiac arrest, anaphylaxis, severe asthma',
    alternatives: [
      {
        drug: 'Norepinephrine',
        dose: '0.1-0.5 mcg/kg/min infusion',
        route: 'IV infusion',
        effectiveness: 'acceptable',
        caveats: ['Better for septic shock', 'Not for anaphylaxis (no beta-2)', 'Needs infusion pump'],
        whoEML: true
      },
      {
        drug: 'Vasopressin',
        dose: '40 units IV (cardiac arrest)',
        route: 'IV',
        effectiveness: 'suboptimal',
        caveats: ['Alternative in cardiac arrest only', 'Not for anaphylaxis'],
        whoEML: false
      },
      {
        drug: 'Dopamine',
        dose: '5-20 mcg/kg/min infusion',
        route: 'IV infusion',
        effectiveness: 'suboptimal',
        caveats: ['More arrhythmogenic', 'Variable response', 'Needs infusion'],
        whoEML: true
      }
    ],
    dilutionGuide: {
      originalConcentration: '1mg/mL (1:1000)',
      targetConcentration: '0.1mg/mL (1:10,000) for IV use',
      dilutionInstructions: 'Dilute 1mg (1mL) in 9mL NS = 1:10,000 for IV push in cardiac arrest'
    },
    notes: 'NOTHING substitutes epinephrine for anaphylaxis - this is the most critical drug to stock'
  },
  {
    id: 'atropine-alt',
    primaryDrug: 'Atropine',
    primaryClass: 'Anticholinergic',
    indication: 'Bradycardia, organophosphate poisoning',
    alternatives: [
      {
        drug: 'Glycopyrrolate',
        dose: '0.2mg IV (repeat q2-3min)',
        route: 'IV',
        effectiveness: 'acceptable',
        caveats: ['Does not cross blood-brain barrier', 'Not for organophosphate central effects'],
        whoEML: false
      },
      {
        drug: 'Isoproterenol',
        dose: '2-10 mcg/min infusion',
        route: 'IV infusion',
        effectiveness: 'suboptimal',
        caveats: ['For bradycardia only', 'Needs infusion', 'Arrhythmia risk'],
        whoEML: false
      },
      {
        drug: 'External pacing',
        dose: 'N/A',
        route: 'Transcutaneous',
        effectiveness: 'acceptable',
        caveats: ['For symptomatic bradycardia', 'If defibrillator with pacing available'],
        whoEML: false
      }
    ],
    notes: 'Atropine is irreplaceable for organophosphate poisoning - stock high quantities'
  },
  {
    id: 'furosemide-alt',
    primaryDrug: 'Furosemide',
    primaryClass: 'Loop diuretic',
    indication: 'Pulmonary edema, heart failure, fluid overload',
    alternatives: [
      {
        drug: 'Bumetanide',
        dose: '1-2mg IV/PO (40:1 potency vs furosemide)',
        route: 'IV/PO',
        effectiveness: 'equivalent',
        caveats: ['More potent', '1mg bumetanide = 40mg furosemide'],
        whoEML: false
      },
      {
        drug: 'Torsemide',
        dose: '10-20mg PO/IV',
        route: 'PO/IV',
        effectiveness: 'equivalent',
        caveats: ['Better oral bioavailability', 'Longer half-life'],
        whoEML: false
      },
      {
        drug: 'Hydrochlorothiazide',
        dose: '25-50mg PO daily',
        route: 'PO',
        effectiveness: 'suboptimal',
        caveats: ['Less potent', 'Not for acute pulmonary edema', 'Good for mild CHF'],
        whoEML: true
      }
    ],
    ivToPoConversion: {
      ivDose: '40mg IV',
      poDose: '80mg PO',
      bioavailabilityNote: 'Oral bioavailability ~50%, need double oral dose',
      whenToSwitch: 'When patient not in acute distress'
    },
    notes: 'Furosemide is the mainstay for acute fluid overload - essential to stock'
  },
  {
    id: 'amiodarone-alt',
    primaryDrug: 'Amiodarone',
    primaryClass: 'Class III antiarrhythmic',
    indication: 'VF/VT, atrial fibrillation',
    alternatives: [
      {
        drug: 'Lidocaine',
        dose: '1-1.5mg/kg IV bolus, then 1-4mg/min infusion',
        route: 'IV',
        effectiveness: 'acceptable',
        caveats: ['Less effective for VF', 'Still on ACLS algorithm', 'Shorter acting'],
        whoEML: true
      },
      {
        drug: 'Procainamide',
        dose: '20mg/min until arrhythmia controlled (max 17mg/kg)',
        route: 'IV',
        effectiveness: 'acceptable',
        caveats: ['Slower loading', 'Hypotension risk', 'QT prolongation'],
        whoEML: false
      },
      {
        drug: 'Magnesium sulfate',
        dose: '2g IV over 5-20 min',
        route: 'IV',
        effectiveness: 'suboptimal',
        caveats: ['For Torsades de Pointes specifically', 'Adjunct for refractory VF'],
        whoEML: true
      }
    ],
    notes: 'Amiodarone is first-line for VF/VT - prioritize stocking'
  }
];

// ============================================================================
// EMERGENCY DRUGS - ALTERNATIVES
// ============================================================================

export const EMERGENCY_ALTERNATIVES: DrugAlternative[] = [
  {
    id: 'dextrose-alt',
    primaryDrug: 'Dextrose 50%',
    primaryClass: 'Glucose',
    indication: 'Hypoglycemia',
    alternatives: [
      {
        drug: 'Dextrose 10%',
        dose: '100-250mL IV (adult), 2-4mL/kg (child)',
        route: 'IV',
        effectiveness: 'equivalent',
        caveats: ['Safer for peripheral IV', 'Larger volume needed', 'Less tissue damage if extravasated'],
        whoEML: true
      },
      {
        drug: 'Oral glucose/sugar',
        dose: '15-20g (3-4 tsp sugar, juice, candy)',
        route: 'PO',
        effectiveness: 'equivalent',
        caveats: ['Only if patient conscious and protecting airway', 'Fast acting'],
        whoEML: true
      },
      {
        drug: 'Glucagon',
        dose: '1mg IM/SC (0.5mg if <20kg)',
        route: 'IM/SC',
        effectiveness: 'acceptable',
        caveats: ['Works when no IV access', 'Less effective if glycogen depleted (malnourished, alcoholics)'],
        whoEML: true
      }
    ],
    dilutionGuide: {
      originalConcentration: 'D50W (50%)',
      targetConcentration: 'D10W (10%)',
      dilutionInstructions: 'Mix 20mL D50W + 80mL sterile water = 100mL D10W'
    },
    notes: 'D10W is preferred for pediatrics and peripheral access - less hyperosmolar'
  },
  {
    id: 'naloxone-alt',
    primaryDrug: 'Naloxone',
    primaryClass: 'Opioid antagonist',
    indication: 'Opioid overdose',
    alternatives: [
      {
        drug: 'Supportive care',
        dose: 'Bag-mask ventilation until drug wears off',
        route: 'N/A',
        effectiveness: 'acceptable',
        caveats: ['Labor intensive', 'Need continuous airway support', 'Patient will eventually wake up'],
        whoEML: false
      },
      {
        drug: 'Nalmefene',
        dose: '1mg IV/IM/SC',
        route: 'IV/IM/SC',
        effectiveness: 'equivalent',
        caveats: ['Longer duration', 'Less widely available'],
        whoEML: false
      }
    ],
    notes: 'There is NO substitute for naloxone in opioid overdose. Stock as essential.'
  },
  {
    id: 'calcium-gluconate-alt',
    primaryDrug: 'Calcium gluconate 10%',
    primaryClass: 'Calcium salt',
    indication: 'Hyperkalemia, calcium channel blocker OD, hypocalcemia',
    alternatives: [
      {
        drug: 'Calcium chloride 10%',
        dose: '500-1000mg IV (10-20mL)',
        route: 'IV (central line preferred)',
        effectiveness: 'equivalent',
        caveats: ['3x more elemental calcium', 'More caustic - extravasation causes necrosis', 'Central line preferred'],
        whoEML: true
      }
    ],
    dilutionGuide: {
      originalConcentration: '10% calcium gluconate (100mg/mL)',
      targetConcentration: 'No dilution needed for slow IV push',
      dilutionInstructions: 'Give 10mL (1g) slow IV push over 5-10 minutes, monitor HR'
    },
    notes: 'Calcium gluconate safer peripherally. CaCl for central access or severe emergency.'
  },
  {
    id: 'sodium-bicarb-alt',
    primaryDrug: 'Sodium bicarbonate 8.4%',
    primaryClass: 'Buffer',
    indication: 'Severe metabolic acidosis, TCA overdose, hyperkalemia',
    alternatives: [
      {
        drug: 'THAM (Tromethamine)',
        dose: 'Dose based on base deficit',
        route: 'IV',
        effectiveness: 'equivalent',
        caveats: ['Does not increase CO2 like bicarb', 'Less available'],
        whoEML: false
      },
      {
        drug: 'Treat underlying cause',
        dose: 'N/A',
        route: 'N/A',
        effectiveness: 'acceptable',
        caveats: ['Fluids for lactic acidosis', 'Insulin/glucose for DKA', 'Dialysis for severe cases'],
        whoEML: false
      }
    ],
    dilutionGuide: {
      originalConcentration: '8.4% (1 mEq/mL)',
      targetConcentration: '4.2% for neonates',
      dilutionInstructions: 'Dilute 1:1 with sterile water for neonatal use'
    },
    notes: 'For TCA overdose, early bicarb is life-saving. Stock adequate quantities.'
  }
];

// ============================================================================
// MASTER EXPORT
// ============================================================================

export const ALL_DRUG_ALTERNATIVES: DrugAlternative[] = [
  ...ANTIBIOTIC_ALTERNATIVES,
  ...ANALGESIC_ALTERNATIVES,
  ...CARDIOVASCULAR_ALTERNATIVES,
  ...EMERGENCY_ALTERNATIVES
];

export function findAlternatives(drugName: string): DrugAlternative | undefined {
  return ALL_DRUG_ALTERNATIVES.find(
    alt => alt.primaryDrug.toLowerCase().includes(drugName.toLowerCase())
  );
}

export function getAlternativesByClass(drugClass: string): DrugAlternative[] {
  return ALL_DRUG_ALTERNATIVES.filter(
    alt => alt.primaryClass.toLowerCase().includes(drugClass.toLowerCase())
  );
}

export function getWHOEMLAlternatives(drugName: string): Alternative[] {
  const drugAlt = findAlternatives(drugName);
  if (!drugAlt) return [];
  return drugAlt.alternatives.filter(alt => alt.whoEML);
}

// Quick reference for common substitutions
export const QUICK_SUBSTITUTION_GUIDE = `
╔════════════════════════════════════════════════════════════════════════════╗
║                    DRUG SUBSTITUTION QUICK REFERENCE                        ║
║                    For Resource-Limited Settings                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║ IF UNAVAILABLE          → USE INSTEAD                                       ║
╠════════════════════════════════════════════════════════════════════════════╣
║ ANTIBIOTICS:                                                               ║
║ Ceftriaxone             → Cefotaxime OR Amp+Gent OR Chloramphenicol        ║
║ Amoxicillin             → Ampicillin OR Penicillin V OR Erythromycin       ║
║ Azithromycin            → Erythromycin OR Doxycycline                      ║
║ Ciprofloxacin           → Norfloxacin (UTI) OR TMP-SMX                     ║
║ Metronidazole           → Tinidazole                                       ║
╠════════════════════════════════════════════════════════════════════════════╣
║ PAIN/SEDATION:                                                             ║
║ Morphine                → Tramadol OR Fentanyl OR Codeine                  ║
║ Ketamine                → Midazolam + Fentanyl (but more respiratory risk) ║
║ Ibuprofen               → Diclofenac OR Naproxen OR Aspirin                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ EMERGENCY:                                                                 ║
║ Epinephrine             → NOTHING (stock this as #1 priority)              ║
║ Atropine                → Glycopyrrolate (not for organophosphate CNS)     ║
║ Amiodarone              → Lidocaine (less effective for VF)                ║
║ Furosemide              → Bumetanide (40:1 potency)                        ║
║ D50W                    → D10W (larger volume) OR Glucagon IM              ║
║ Naloxone                → Bag-mask ventilation (no true substitute)        ║
╠════════════════════════════════════════════════════════════════════════════╣
║ IV → PO CONVERSIONS:                                                       ║
║ Metronidazole IV        → PO 1:1 (100% bioavailable!)                     ║
║ Ciprofloxacin IV        → PO ~1:1 (80% bioavailable)                      ║
║ Morphine IV             → PO 3:1 (30% bioavailable)                       ║
║ Furosemide IV           → PO 2:1 (50% bioavailable)                       ║
╠════════════════════════════════════════════════════════════════════════════╣
║ CRITICAL: NEVER SUBSTITUTE FOR:                                            ║
║ • Epinephrine (anaphylaxis) - there is NO alternative                      ║
║ • Naloxone (opioid OD) - only supportive ventilation                       ║
║ • Atropine (organophosphate) - massive doses needed                        ║
║ • Oxytocin (PPH) - see specific alternatives in obstetric protocols        ║
╚════════════════════════════════════════════════════════════════════════════╝
`;
