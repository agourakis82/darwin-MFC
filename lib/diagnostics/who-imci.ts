/**
 * WHO IMCI (Integrated Management of Childhood Illness)
 * Evidence-based algorithm for managing sick children aged 2 months to 5 years
 *
 * References:
 * - WHO IMCI Chart Booklet (2014)
 * - WHO Pocket Book of Hospital Care for Children (2013)
 * - WHO/UNICEF IMCI Adaptation Guide (2022)
 *
 * Designed for healthcare workers in resource-limited settings
 */

export interface IMCIAssessment {
  dangerSigns: DangerSignAssessment;
  mainSymptoms: MainSymptomAssessment;
  nutritionStatus: NutritionAssessment;
  vaccineStatus: VaccineAssessment;
  otherProblems: string[];
}

export interface DangerSignAssessment {
  convulsions: boolean;
  lethargicOrUnconscious: boolean;
  unableToFeed: boolean;
  vomitsEverything: boolean;
  hasDangerSigns: boolean;
}

export interface MainSymptomAssessment {
  cough?: CoughAssessment;
  diarrhea?: DiarrheaAssessment;
  fever?: FeverAssessment;
  ear?: EarAssessment;
}

export interface CoughAssessment {
  durationDays: number;
  breathingFast: boolean;
  chestIndrawing: boolean;
  stridor: boolean;
  wheeze: boolean;
  classification: PneumoniaClassification;
}

export interface DiarrheaAssessment {
  durationDays: number;
  bloodInStool: boolean;
  dehydrationSigns: DehydrationSigns;
  classification: DiarrheaClassification;
}

export interface FeverAssessment {
  durationDays: number;
  malariaTested: boolean;
  malariaResult: 'positive' | 'negative' | 'not_done';
  stiffNeck: boolean;
  runnyNose: boolean;
  measlesLast3Months: boolean;
  classification: FeverClassification;
}

export interface EarAssessment {
  earPain: boolean;
  earDischarge: boolean;
  dischargeDays: number;
  tenderSwellingBehindEar: boolean;
  classification: EarClassification;
}

export interface DehydrationSigns {
  condition: 'well_alert' | 'restless_irritable' | 'lethargic_unconscious';
  eyes: 'normal' | 'sunken';
  thirst: 'drinks_normally' | 'drinks_eagerly' | 'unable_to_drink';
  skinPinch: 'goes_back_quickly' | 'goes_back_slowly' | 'goes_back_very_slowly';
}

export interface NutritionAssessment {
  visibleSevereWasting: boolean;
  edemaOfBothFeet: boolean;
  palmarPallor: 'none' | 'some' | 'severe';
  weightForAge: 'normal' | 'low' | 'very_low';
  muac?: number; // Mid-upper arm circumference in cm
  classification: NutritionClassification;
}

export interface VaccineAssessment {
  bcg: boolean;
  opv: number; // doses
  pentavalent: number; // doses
  measles: boolean;
  vitamineA: boolean;
  needsVaccines: boolean;
}

// Classifications
export type PneumoniaClassification =
  | 'severe_pneumonia_or_very_severe_disease'
  | 'pneumonia'
  | 'cough_or_cold';

export type DiarrheaClassification =
  | 'severe_dehydration'
  | 'some_dehydration'
  | 'no_dehydration';

export type DysenteryClassification =
  | 'dysentery';

export type PersistentDiarrheaClassification =
  | 'severe_persistent_diarrhea'
  | 'persistent_diarrhea';

export type FeverClassification =
  | 'very_severe_febrile_disease'
  | 'malaria'
  | 'malaria_unlikely'
  | 'measles_with_complications'
  | 'measles';

export type EarClassification =
  | 'mastoiditis'
  | 'acute_ear_infection'
  | 'chronic_ear_infection'
  | 'no_ear_infection';

export type NutritionClassification =
  | 'severe_acute_malnutrition'
  | 'moderate_acute_malnutrition'
  | 'no_acute_malnutrition'
  | 'severe_anemia'
  | 'anemia'
  | 'no_anemia';

// Treatment protocols
export interface IMCITreatment {
  urgentReferral: boolean;
  preTreatment: string[];
  homeTreatment: string[];
  counseling: string[];
  followUp: FollowUpSchedule;
}

export interface FollowUpSchedule {
  days: number;
  instructions: string;
}

/**
 * WHO IMCI Danger Signs Assessment
 * CRITICAL: If ANY danger sign present, refer URGENTLY
 */
export function assessDangerSigns(
  convulsions: boolean,
  lethargicOrUnconscious: boolean,
  unableToFeed: boolean,
  vomitsEverything: boolean
): DangerSignAssessment {
  const hasDangerSigns = convulsions || lethargicOrUnconscious || unableToFeed || vomitsEverything;

  return {
    convulsions,
    lethargicOrUnconscious,
    unableToFeed,
    vomitsEverything,
    hasDangerSigns
  };
}

/**
 * Respiratory rate thresholds by age (breaths/minute)
 */
export const BREATHING_RATE_THRESHOLDS = {
  '2_11_months': 50,  // Fast if ≥50/min
  '12_59_months': 40  // Fast if ≥40/min
};

/**
 * Classify pneumonia based on IMCI algorithm
 */
export function classifyPneumonia(
  ageMonths: number,
  respiratoryRate: number,
  chestIndrawing: boolean,
  stridor: boolean,
  dangerSigns: boolean
): { classification: PneumoniaClassification; treatment: IMCITreatment } {
  const threshold = ageMonths < 12 ? 50 : 40;
  const breathingFast = respiratoryRate >= threshold;

  // SEVERE PNEUMONIA OR VERY SEVERE DISEASE
  if (dangerSigns || chestIndrawing || stridor) {
    return {
      classification: 'severe_pneumonia_or_very_severe_disease',
      treatment: {
        urgentReferral: true,
        preTreatment: [
          'Give first dose of appropriate antibiotic',
          'Ampicillin 50mg/kg IM/IV + Gentamicin 7.5mg/kg IM/IV',
          'OR Benzylpenicillin 50,000 units/kg IM + Gentamicin',
          'If wheezing: give rapid-acting bronchodilator',
          'If high fever (≥38.5°C): give paracetamol'
        ],
        homeTreatment: [],
        counseling: ['Refer URGENTLY to hospital'],
        followUp: { days: 0, instructions: 'Refer immediately' }
      }
    };
  }

  // PNEUMONIA
  if (breathingFast) {
    return {
      classification: 'pneumonia',
      treatment: {
        urgentReferral: false,
        preTreatment: [],
        homeTreatment: [
          'Oral amoxicillin for 5 days:',
          '  2-11 months (4-<10kg): 250mg twice daily',
          '  12-35 months (10-<14kg): 500mg twice daily',
          '  36-59 months (14-<19kg): 750mg twice daily',
          'Soothe throat and relieve cough with safe remedy',
          'If wheezing: give inhaled salbutamol'
        ],
        counseling: [
          'Give more fluids',
          'Continue feeding',
          'Return in 2 days for follow-up',
          'Return IMMEDIATELY if: breathing becomes difficult, breathing becomes fast, unable to drink, becomes sicker'
        ],
        followUp: { days: 2, instructions: 'Reassess breathing rate and danger signs' }
      }
    };
  }

  // COUGH OR COLD (no pneumonia)
  return {
    classification: 'cough_or_cold',
    treatment: {
      urgentReferral: false,
      preTreatment: [],
      homeTreatment: [
        'No antibiotic needed',
        'Soothe throat and relieve cough with safe remedy:',
        '  Honey (if >12 months old)',
        '  Warm drinks',
        'If wheezing: treat with inhaled salbutamol if available'
      ],
      counseling: [
        'Continue feeding',
        'Give more fluids',
        'Clear nose if it interferes with feeding',
        'Return in 5 days if not improving',
        'Return IMMEDIATELY if: breathing becomes difficult or fast, unable to drink, becomes sicker'
      ],
      followUp: { days: 5, instructions: 'Return if not improving' }
    }
  };
}

/**
 * Classify dehydration based on IMCI algorithm
 */
export function classifyDehydration(signs: DehydrationSigns): {
  classification: DiarrheaClassification;
  treatment: IMCITreatment;
  plan: 'A' | 'B' | 'C';
} {
  // Two or more of the following: lethargic, sunken eyes, unable to drink, very slow pinch
  const severeCount = [
    signs.condition === 'lethargic_unconscious',
    signs.eyes === 'sunken',
    signs.thirst === 'unable_to_drink',
    signs.skinPinch === 'goes_back_very_slowly'
  ].filter(Boolean).length;

  if (severeCount >= 2) {
    return {
      classification: 'severe_dehydration',
      plan: 'C',
      treatment: {
        urgentReferral: true,
        preTreatment: [
          'PLAN C: Treat severe dehydration quickly',
          'Start IV immediately. If can give IV:',
          '  Ringer\'s Lactate (preferred) or Normal Saline',
          '  <12 months: 30ml/kg in 1 hour, then 70ml/kg in 5 hours',
          '  >12 months: 30ml/kg in 30 min, then 70ml/kg in 2.5 hours',
          'If IV not possible, give ORS by nasogastric tube: 20ml/kg/hour for 6 hours',
          'If unable to give IV or NG, refer URGENTLY while giving ORS sips'
        ],
        homeTreatment: [],
        counseling: ['Refer URGENTLY to hospital for IV rehydration'],
        followUp: { days: 0, instructions: 'Monitor every 15-30 minutes during rehydration' }
      }
    };
  }

  // Two or more of: restless, sunken eyes, drinks eagerly, slow pinch
  const someCount = [
    signs.condition === 'restless_irritable',
    signs.eyes === 'sunken',
    signs.thirst === 'drinks_eagerly',
    signs.skinPinch === 'goes_back_slowly'
  ].filter(Boolean).length;

  if (someCount >= 2) {
    return {
      classification: 'some_dehydration',
      plan: 'B',
      treatment: {
        urgentReferral: false,
        preTreatment: [],
        homeTreatment: [
          'PLAN B: Treat some dehydration with ORS',
          'Give ORS solution in clinic over 4 hours:',
          '  <4 months (<5kg): 200-400ml',
          '  4-11 months (5-7.9kg): 400-600ml',
          '  12-23 months (8-10.9kg): 600-800ml',
          '  24-59 months (11-15.9kg): 800-1200ml',
          'After 4 hours, reassess and classify dehydration',
          'Continue breastfeeding'
        ],
        counseling: [
          'If no dehydration after 4 hours, send home with ORS (Plan A)',
          'Return if child does not improve in 2 days',
          'Return IMMEDIATELY if: blood in stool, drinks poorly, becomes sicker'
        ],
        followUp: { days: 0, instructions: 'Reassess after 4 hours of ORS' }
      }
    };
  }

  // No dehydration
  return {
    classification: 'no_dehydration',
    plan: 'A',
    treatment: {
      urgentReferral: false,
      preTreatment: [],
      homeTreatment: [
        'PLAN A: Treat diarrhea at home',
        'Give extra fluids:',
        '  <6 months with exclusive breastfeeding: breastfeed more frequently',
        '  Other children: ORS or home fluids after each loose stool',
        '    <2 years: 50-100ml',
        '    2-5 years: 100-200ml',
        'Continue feeding',
        'Give zinc supplementation for 10-14 days:',
        '  <6 months: 10mg/day',
        '  ≥6 months: 20mg/day'
      ],
      counseling: [
        'Recognize dehydration signs to return immediately',
        'Return in 5 days if not improving',
        'Return IMMEDIATELY if: blood in stool, drinks poorly, fever, becomes sicker'
      ],
      followUp: { days: 5, instructions: 'Return if not improving' }
    }
  };
}

/**
 * Classify fever based on IMCI algorithm (malaria-endemic areas)
 */
export function classifyFeverMalariaEndemic(
  temperature: number,
  stiffNeck: boolean,
  malariaTestResult: 'positive' | 'negative' | 'not_done',
  dangerSigns: boolean,
  runnyNose: boolean,
  measlesHistory: boolean
): { classification: FeverClassification; treatment: IMCITreatment } {
  // Very severe febrile disease
  if (dangerSigns || stiffNeck) {
    return {
      classification: 'very_severe_febrile_disease',
      treatment: {
        urgentReferral: true,
        preTreatment: [
          'Give first dose of appropriate antibiotic:',
          '  Ceftriaxone 50mg/kg IM (max 1g)',
          '  OR Ampicillin 50mg/kg IM + Chloramphenicol 25mg/kg IM',
          'Give first dose antimalarial if malaria positive or not tested',
          'Treat to prevent hypoglycemia',
          'If high fever: give paracetamol'
        ],
        homeTreatment: [],
        counseling: ['Refer URGENTLY to hospital - possible meningitis/sepsis'],
        followUp: { days: 0, instructions: 'Refer immediately' }
      }
    };
  }

  // Malaria
  if (malariaTestResult === 'positive' || (temperature >= 37.5 && malariaTestResult === 'not_done')) {
    return {
      classification: 'malaria',
      treatment: {
        urgentReferral: false,
        preTreatment: [],
        homeTreatment: [
          'Give first-line antimalarial:',
          '  Artemether-Lumefantrine (AL):',
          '    5-14kg: 1 tab twice daily x 3 days',
          '    15-24kg: 2 tabs twice daily x 3 days',
          '    25-34kg: 3 tabs twice daily x 3 days',
          '  OR Artesunate-Amodiaquine per national protocol',
          'Give paracetamol for fever ≥38.5°C:',
          '  10-15mg/kg every 6 hours as needed'
        ],
        counseling: [
          'Complete full course of antimalarial',
          'Use insecticide-treated bed nets',
          'Return in 2 days for follow-up',
          'Return IMMEDIATELY if: convulsions, unable to drink, becomes sicker'
        ],
        followUp: { days: 2, instructions: 'If fever persists, reassess completely' }
      }
    };
  }

  // Malaria unlikely (negative test OR no test in low-endemic area with other cause)
  return {
    classification: 'malaria_unlikely',
    treatment: {
      urgentReferral: false,
      preTreatment: [],
      homeTreatment: [
        'NO antimalarial needed (if test negative)',
        'Give paracetamol for fever ≥38.5°C:',
        '  10-15mg/kg every 6 hours as needed',
        'Look for other causes of fever',
        'If bacterial infection suspected: give appropriate antibiotic'
      ],
      counseling: [
        'Give more fluids',
        'Continue feeding',
        'Return in 2 days if fever persists',
        'Return IMMEDIATELY if: convulsions, unable to drink, becomes sicker'
      ],
      followUp: { days: 2, instructions: 'If fever persists, repeat malaria test' }
    }
  };
}

/**
 * Classify ear problem based on IMCI algorithm
 */
export function classifyEarProblem(
  earPain: boolean,
  earDischarge: boolean,
  dischargeDays: number,
  tenderSwellingBehindEar: boolean
): { classification: EarClassification; treatment: IMCITreatment } {
  // Mastoiditis
  if (tenderSwellingBehindEar) {
    return {
      classification: 'mastoiditis',
      treatment: {
        urgentReferral: true,
        preTreatment: [
          'Give first dose of appropriate antibiotic:',
          '  Ampicillin 50mg/kg IM',
          '  OR Ceftriaxone 50mg/kg IM',
          'Give paracetamol for pain and fever'
        ],
        homeTreatment: [],
        counseling: ['Refer URGENTLY - surgical complication possible'],
        followUp: { days: 0, instructions: 'Refer immediately' }
      }
    };
  }

  // Acute ear infection
  if (earPain || (earDischarge && dischargeDays < 14)) {
    return {
      classification: 'acute_ear_infection',
      treatment: {
        urgentReferral: false,
        preTreatment: [],
        homeTreatment: [
          'Give oral antibiotic for 5 days:',
          '  Amoxicillin (first-line):',
          '    <10kg: 250mg twice daily',
          '    10-19kg: 500mg twice daily',
          '    ≥20kg: 750mg twice daily',
          'Give paracetamol for pain:',
          '  10-15mg/kg every 6 hours as needed',
          'Dry the ear by wicking (for discharge)'
        ],
        counseling: [
          'Return in 5 days',
          'If discharge, wick ear 3 times daily',
          'Return IMMEDIATELY if: swelling behind ear, fever persists'
        ],
        followUp: { days: 5, instructions: 'Reassess ear' }
      }
    };
  }

  // Chronic ear infection
  if (earDischarge && dischargeDays >= 14) {
    return {
      classification: 'chronic_ear_infection',
      treatment: {
        urgentReferral: false,
        preTreatment: [],
        homeTreatment: [
          'Dry the ear by wicking',
          'Treat with quinolone ear drops if available:',
          '  Ciprofloxacin 0.3% ear drops',
          '  3 drops twice daily for 14 days',
          'NO oral antibiotic unless signs of acute infection',
          'Refer to ENT if available'
        ],
        counseling: [
          'Keep ear dry - no swimming',
          'Wick ear at least 3 times daily',
          'Return in 5 days',
          'Refer if not improving after 14 days of treatment'
        ],
        followUp: { days: 5, instructions: 'Check if discharge improving' }
      }
    };
  }

  // No ear infection
  return {
    classification: 'no_ear_infection',
    treatment: {
      urgentReferral: false,
      preTreatment: [],
      homeTreatment: ['No treatment needed'],
      counseling: ['Return if ear pain or discharge develops'],
      followUp: { days: 0, instructions: 'No follow-up needed' }
    }
  };
}

/**
 * Classify nutrition status based on IMCI algorithm
 */
export function classifyNutrition(
  visibleSevereWasting: boolean,
  edemaOfBothFeet: boolean,
  palmarPallor: 'none' | 'some' | 'severe',
  muac?: number // Mid-upper arm circumference in cm
): { classification: NutritionClassification; treatment: IMCITreatment } {
  // Severe acute malnutrition
  if (visibleSevereWasting || edemaOfBothFeet || (muac && muac < 11.5)) {
    return {
      classification: 'severe_acute_malnutrition',
      treatment: {
        urgentReferral: true,
        preTreatment: [
          'Test for hypoglycemia and treat if present',
          'Keep child warm',
          'Give first dose of antibiotic:',
          '  Amoxicillin 25mg/kg',
          'If edema or hypothermia: refer more urgently',
          'Do NOT give iron'
        ],
        homeTreatment: [],
        counseling: [
          'Refer URGENTLY for inpatient therapeutic feeding',
          'Explain importance of nutrition rehabilitation program'
        ],
        followUp: { days: 0, instructions: 'Refer immediately' }
      }
    };
  }

  // Moderate acute malnutrition
  if (muac && muac >= 11.5 && muac < 12.5) {
    return {
      classification: 'moderate_acute_malnutrition',
      treatment: {
        urgentReferral: false,
        preTreatment: [],
        homeTreatment: [
          'Enroll in supplementary feeding program if available',
          'Give Ready-to-Use Supplementary Food (RUSF) if available',
          'Give multivitamins',
          'Assess for underlying illness',
          'Deworm if not done in last 6 months (>12 months old):',
          '  Albendazole 200mg (12-23 months) or 400mg (≥24 months)'
        ],
        counseling: [
          'Feed more frequently',
          'Add oil/fat to food for energy',
          'Give nutrient-rich foods (eggs, fish, meat, legumes)',
          'Continue breastfeeding if <2 years',
          'Return in 14 days'
        ],
        followUp: { days: 14, instructions: 'Reassess MUAC and feeding practices' }
      }
    };
  }

  // Severe anemia
  if (palmarPallor === 'severe') {
    return {
      classification: 'severe_anemia',
      treatment: {
        urgentReferral: true,
        preTreatment: [
          'May need blood transfusion',
          'Give first dose of antimalarial if in endemic area'
        ],
        homeTreatment: [],
        counseling: ['Refer URGENTLY - may need transfusion'],
        followUp: { days: 0, instructions: 'Refer immediately' }
      }
    };
  }

  // Anemia
  if (palmarPallor === 'some') {
    return {
      classification: 'anemia',
      treatment: {
        urgentReferral: false,
        preTreatment: [],
        homeTreatment: [
          'Give iron + folic acid for 3 months:',
          '  <12 months: Ferrous sulfate syrup 12.5mg iron + 0.1mg folic acid daily',
          '  12-59 months: Ferrous sulfate syrup 30mg iron + 0.25mg folic acid daily',
          'Give antimalarial if in endemic area',
          'Give mebendazole if child ≥12 months and not treated in last 6 months:',
          '  12-23 months: 250mg single dose',
          '  ≥24 months: 500mg single dose'
        ],
        counseling: [
          'Give iron-rich foods (meat, fish, dark leafy vegetables)',
          'Give vitamin C with iron for better absorption',
          'Return in 14 days'
        ],
        followUp: { days: 14, instructions: 'Check pallor, assess compliance' }
      }
    };
  }

  // No acute malnutrition
  return {
    classification: 'no_acute_malnutrition',
    treatment: {
      urgentReferral: false,
      preTreatment: [],
      homeTreatment: [
        'If child <2 years: counsel on breastfeeding and complementary feeding',
        'Continue routine care'
      ],
      counseling: [
        'Praise mother for good feeding',
        'Give feeding recommendations appropriate for age'
      ],
      followUp: { days: 0, instructions: 'Follow routine schedule' }
    }
  };
}

/**
 * Complete IMCI Assessment Algorithm
 */
export function performIMCIAssessment(
  ageMonths: number,
  // Danger signs
  convulsions: boolean,
  lethargicOrUnconscious: boolean,
  unableToFeed: boolean,
  vomitsEverything: boolean,
  // Respiratory
  hasCough: boolean,
  respiratoryRate: number,
  chestIndrawing: boolean,
  stridor: boolean,
  // Diarrhea
  hasDiarrhea: boolean,
  dehydrationSigns: DehydrationSigns | null,
  bloodInStool: boolean,
  // Fever
  hasFever: boolean,
  temperature: number,
  malariaTestResult: 'positive' | 'negative' | 'not_done',
  stiffNeck: boolean,
  // Ear
  hasEarProblem: boolean,
  earPain: boolean,
  earDischarge: boolean,
  dischargeDays: number,
  tenderSwellingBehindEar: boolean,
  // Nutrition
  visibleSevereWasting: boolean,
  edemaOfBothFeet: boolean,
  palmarPallor: 'none' | 'some' | 'severe',
  muac?: number
): {
  needsUrgentReferral: boolean;
  dangerSigns: DangerSignAssessment;
  classifications: string[];
  treatments: IMCITreatment[];
  quickReference: string;
} {
  const classifications: string[] = [];
  const treatments: IMCITreatment[] = [];
  let needsUrgentReferral = false;

  // 1. Check danger signs
  const dangerSigns = assessDangerSigns(convulsions, lethargicOrUnconscious, unableToFeed, vomitsEverything);
  if (dangerSigns.hasDangerSigns) {
    needsUrgentReferral = true;
    classifications.push('DANGER SIGNS PRESENT');
  }

  // 2. Assess cough/breathing
  if (hasCough || respiratoryRate > 0) {
    const pneumonia = classifyPneumonia(ageMonths, respiratoryRate, chestIndrawing, stridor, dangerSigns.hasDangerSigns);
    classifications.push(`RESPIRATORY: ${pneumonia.classification}`);
    treatments.push(pneumonia.treatment);
    if (pneumonia.treatment.urgentReferral) needsUrgentReferral = true;
  }

  // 3. Assess diarrhea
  if (hasDiarrhea && dehydrationSigns) {
    const diarrhea = classifyDehydration(dehydrationSigns);
    classifications.push(`DIARRHEA: ${diarrhea.classification} (Plan ${diarrhea.plan})`);
    treatments.push(diarrhea.treatment);
    if (diarrhea.treatment.urgentReferral) needsUrgentReferral = true;

    if (bloodInStool) {
      classifications.push('DIARRHEA: Dysentery');
    }
  }

  // 4. Assess fever
  if (hasFever) {
    const fever = classifyFeverMalariaEndemic(temperature, stiffNeck, malariaTestResult, dangerSigns.hasDangerSigns, false, false);
    classifications.push(`FEVER: ${fever.classification}`);
    treatments.push(fever.treatment);
    if (fever.treatment.urgentReferral) needsUrgentReferral = true;
  }

  // 5. Assess ear
  if (hasEarProblem) {
    const ear = classifyEarProblem(earPain, earDischarge, dischargeDays, tenderSwellingBehindEar);
    classifications.push(`EAR: ${ear.classification}`);
    treatments.push(ear.treatment);
    if (ear.treatment.urgentReferral) needsUrgentReferral = true;
  }

  // 6. Assess nutrition
  const nutrition = classifyNutrition(visibleSevereWasting, edemaOfBothFeet, palmarPallor, muac);
  classifications.push(`NUTRITION: ${nutrition.classification}`);
  treatments.push(nutrition.treatment);
  if (nutrition.treatment.urgentReferral) needsUrgentReferral = true;

  // Generate quick reference
  const quickReference = generateIMCIQuickReference(classifications, needsUrgentReferral);

  return {
    needsUrgentReferral,
    dangerSigns,
    classifications,
    treatments,
    quickReference
  };
}

/**
 * Generate ASCII quick reference card
 */
function generateIMCIQuickReference(classifications: string[], urgent: boolean): string {
  return `
╔═══════════════════════════════════════════════════════════════╗
║                    WHO IMCI ASSESSMENT                         ║
╠═══════════════════════════════════════════════════════════════╣
║ ${urgent ? '🔴 URGENT REFERRAL REQUIRED' : '🟢 Can be managed at outpatient level'}
║                                                                 ║
║ Classifications:                                                ║
${classifications.map(c => `║  • ${c.padEnd(55)}║`).join('\n')}
║                                                                 ║
╠═══════════════════════════════════════════════════════════════╣
║ DANGER SIGNS (Check ALL children):                             ║
║  □ Convulsions now or recently                                 ║
║  □ Lethargic or unconscious                                    ║
║  □ Unable to drink or breastfeed                               ║
║  □ Vomits everything                                           ║
║                                                                 ║
║ If ANY danger sign → REFER URGENTLY                            ║
╠═══════════════════════════════════════════════════════════════╣
║ BREATHING RATE THRESHOLDS (FAST BREATHING):                    ║
║  • 2-11 months: ≥50 breaths/min                                ║
║  • 12-59 months: ≥40 breaths/min                               ║
╠═══════════════════════════════════════════════════════════════╣
║ DEHYDRATION ASSESSMENT (2+ signs = some/severe):               ║
║                                                                 ║
║  SOME DEHYDRATION (Plan B):         SEVERE (Plan C):           ║
║  • Restless/irritable               • Lethargic/unconscious    ║
║  • Sunken eyes                      • Sunken eyes              ║
║  • Drinks eagerly                   • Unable to drink          ║
║  • Skin pinch slow                  • Skin pinch very slow     ║
╠═══════════════════════════════════════════════════════════════╣
║ ORS AMOUNTS (Plan B - 4 hours):                                ║
║  • <5kg: 200-400ml    • 8-11kg: 600-800ml                      ║
║  • 5-8kg: 400-600ml   • 11-16kg: 800-1200ml                    ║
╠═══════════════════════════════════════════════════════════════╣
║ MUAC (Mid-Upper Arm Circumference):                            ║
║  • <11.5cm: SEVERE malnutrition → REFER                        ║
║  • 11.5-12.5cm: MODERATE malnutrition                          ║
║  • >12.5cm: Normal                                             ║
╚═══════════════════════════════════════════════════════════════╝
`;
}

/**
 * IMCI Quick Reference for Resource-Limited Settings
 */
export const IMCI_QUICK_REFERENCE = {
  dangerSigns: {
    title: 'DANGER SIGNS - Refer Urgently',
    signs: [
      'Unable to drink or breastfeed',
      'Vomits everything',
      'Convulsions',
      'Lethargic or unconscious'
    ]
  },

  breathingThresholds: {
    '2-11 months': { fast: 50, description: '≥50/min is FAST BREATHING' },
    '12-59 months': { fast: 40, description: '≥40/min is FAST BREATHING' }
  },

  dehydrationPlans: {
    A: {
      when: 'No dehydration',
      treatment: 'Home fluids + ORS after each stool + zinc 10-14 days'
    },
    B: {
      when: 'Some dehydration (2+ signs)',
      treatment: 'ORS 75ml/kg over 4 hours in clinic, then reassess'
    },
    C: {
      when: 'Severe dehydration (2+ severe signs)',
      treatment: 'IV Ringer\'s Lactate 100ml/kg (30ml/kg rapid + 70ml/kg over hours)'
    }
  },

  oralAntibioticDoses: {
    amoxicillin: [
      { weight: '<10kg', dose: '250mg twice daily' },
      { weight: '10-19kg', dose: '500mg twice daily' },
      { weight: '≥20kg', dose: '750mg twice daily' }
    ]
  },

  antimalarialDoses: {
    'artemether-lumefantrine': [
      { weight: '5-14kg', dose: '1 tab twice daily x 3 days' },
      { weight: '15-24kg', dose: '2 tabs twice daily x 3 days' },
      { weight: '25-34kg', dose: '3 tabs twice daily x 3 days' }
    ]
  },

  muacClassification: {
    severe: { cutoff: '<11.5cm', action: 'Refer for therapeutic feeding' },
    moderate: { cutoff: '11.5-12.5cm', action: 'Supplementary feeding' },
    normal: { cutoff: '≥12.5cm', action: 'Continue routine care' }
  },

  zincDoses: {
    '<6 months': '10mg/day for 10-14 days',
    '≥6 months': '20mg/day for 10-14 days'
  }
};

export default {
  assessDangerSigns,
  classifyPneumonia,
  classifyDehydration,
  classifyFeverMalariaEndemic,
  classifyEarProblem,
  classifyNutrition,
  performIMCIAssessment,
  IMCI_QUICK_REFERENCE,
  BREATHING_RATE_THRESHOLDS
};
