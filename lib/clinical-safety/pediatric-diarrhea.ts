import type { ClinicalAnswer } from './pertussis';

export type PediatricDiarrheaAgeBand =
  | 'under-2-months'
  | '2-months-to-under-5-years'
  | 'not-aidpi'
  | 'unknown';
export type GeneralCondition = 'normal' | 'restless-irritable' | 'lethargic-unconscious' | 'unknown';
export type DrinkingAbility = 'normal' | 'eager-thirsty' | 'poor-unable' | 'unknown';
export type SkinPinchReturn = 'normal' | 'slow' | 'very-slow' | 'unknown';
export type DehydrationClassification =
  | 'young-infant-dehydration'
  | 'severe-dehydration'
  | 'some-dehydration'
  | 'no-dehydration'
  | 'incomplete'
  | 'not-applicable';

export interface PediatricDiarrheaSafetyInput {
  ageDays?: number;
  diarrheaPresent: boolean;
  durationDays?: number;
  bloodInStool: ClinicalAnswer;
  generalCondition: GeneralCondition;
  sunkenEyes: ClinicalAnswer;
  drinkingAbility: DrinkingAbility;
  skinPinchReturn: SkinPinchReturn;
  vomitingEverything: ClinicalAnswer;
  decreasedUrineOutput: ClinicalAnswer;
  paleOrMottledSkin: ClinicalAnswer;
  coldExtremities: ClinicalAnswer;
  weakPeripheralPulse: ClinicalAnswer;
  capillaryRefillOver2Seconds: ClinicalAnswer;
  hypotension: ClinicalAnswer;
  biliousVomiting: ClinicalAnswer;
  severeLocalizedAbdominalPain: ClinicalAnswer;
  abdominalDistensionOrRebound: ClinicalAnswer;
  stoolsLast24Hours?: number;
  vomitingEpisodesLast24Hours?: number;
  stoppedBreastfeeding: ClinicalAnswer;
  lowBirthWeightOrMalnutrition: ClinicalAnswer;
}

export type PediatricDiarrheaQuestionId =
  | 'age'
  | 'durationDays'
  | 'bloodInStool'
  | 'generalCondition'
  | 'sunkenEyes'
  | 'drinkingAbility'
  | 'skinPinchReturn'
  | 'vomitingEverything'
  | 'decreasedUrineOutput'
  | 'paleOrMottledSkin'
  | 'coldExtremities'
  | 'weakPeripheralPulse'
  | 'capillaryRefillOver2Seconds'
  | 'hypotension'
  | 'biliousVomiting'
  | 'severeLocalizedAbdominalPain'
  | 'abdominalDistensionOrRebound'
  | 'stoolsLast24Hours'
  | 'vomitingEpisodesLast24Hours'
  | 'stoppedBreastfeeding'
  | 'lowBirthWeightOrMalnutrition';

export type PediatricDiarrheaDangerSignId =
  | 'young-infant-dehydration'
  | 'severe-dehydration'
  | 'lethargic-or-unconscious'
  | 'unable-to-drink-or-breastfeed'
  | 'vomiting-everything'
  | 'pale-or-mottled-skin'
  | 'cold-extremities'
  | 'weak-peripheral-pulse'
  | 'capillary-refill-over-2-seconds'
  | 'hypotension'
  | 'young-infant-diarrhea-7-days-or-more'
  | 'young-infant-blood-in-stool'
  | 'persistent-diarrhea-with-dehydration'
  | 'bilious-vomiting';

export type PediatricDiarrheaPrioritySignId =
  | 'age-required'
  | 'incomplete-dehydration-screen'
  | 'some-dehydration'
  | 'persistent-diarrhea'
  | 'blood-in-stool-dysentery'
  | 'decreased-urine-output'
  | 'increased-dehydration-risk'
  | 'alternative-diagnosis-sign';

export interface PediatricDiarrheaSafetyAssessment {
  applicable: boolean;
  ageBand: PediatricDiarrheaAgeBand;
  completedAgeDays: number | null;
  classification: DehydrationClassification;
  severeSignCount: number;
  someSignCount: number;
  youngInfantSignCount: number;
  dangerSignIds: PediatricDiarrheaDangerSignId[];
  prioritySignIds: PediatricDiarrheaPrioritySignId[];
  priority: 'routine' | 'same-day-assessment' | 'immediate-referral';
  nextQuestionIds: PediatricDiarrheaQuestionId[];
  heuristicSymptoms: string[];
  kernelSymptoms: [];
  guardrails: {
    dehydrationAddedToKernel: false;
    shockScoreCalculated: false;
    fluidPlanAuthorized: false;
    zincDoseAuthorized: false;
    antibioticRecommendationAuthorized: false;
    prescriptionAuthorized: false;
    clinicalActivationAuthorized: false;
  };
}

export const PEDIATRIC_DIARRHEA_SAFETY_REFERENCES = [
  {
    id: 'ms-acute-child-care-aidpi',
    label: 'MS · Linha de Cuidado AIDPI',
    url: 'https://linhasdecuidado.saude.gov.br/portal/puericultura/unidade-de-atencao-primaria/condicoes-agudas/index.php',
  },
  {
    id: 'ms-aidpi-child-2017',
    label: 'MS · Manual AIDPI Criança',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/manual_quadros_procedimentos_aidpi_crianca_2meses_5anos.pdf',
  },
  {
    id: 'who-imci-diarrhoea-2014',
    label: 'OMS · AIDPI Diarreia',
    url: 'https://www.who.int/publications/i/item/9789241506823',
  },
  {
    id: 'who-young-infant-2019',
    label: 'OMS · Lactente até 2 meses',
    url: 'https://www.who.int/publications/i/item/9789241516365',
  },
  {
    id: 'nice-gastroenteritis-cg84',
    label: 'NICE · Gastroenterite abaixo de 5 anos',
    url: 'https://www.nice.org.uk/guidance/cg84/chapter/Recommendations',
  },
] as const;

export const EMPTY_PEDIATRIC_DIARRHEA_SAFETY_INPUT: Omit<
  PediatricDiarrheaSafetyInput,
  'ageDays' | 'diarrheaPresent'
> = {
  durationDays: undefined,
  bloodInStool: 'unknown',
  generalCondition: 'unknown',
  sunkenEyes: 'unknown',
  drinkingAbility: 'unknown',
  skinPinchReturn: 'unknown',
  vomitingEverything: 'unknown',
  decreasedUrineOutput: 'unknown',
  paleOrMottledSkin: 'unknown',
  coldExtremities: 'unknown',
  weakPeripheralPulse: 'unknown',
  capillaryRefillOver2Seconds: 'unknown',
  hypotension: 'unknown',
  biliousVomiting: 'unknown',
  severeLocalizedAbdominalPain: 'unknown',
  abdominalDistensionOrRebound: 'unknown',
  stoolsLast24Hours: undefined,
  vomitingEpisodesLast24Hours: undefined,
  stoppedBreastfeeding: 'unknown',
  lowBirthWeightOrMalnutrition: 'unknown',
};

type ScoreState = 'present' | 'absent' | 'unknown';

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isKnownNonNegative(value: number | undefined): value is number {
  return value !== undefined && Number.isFinite(value) && value >= 0;
}

function isValidCount(value: number | undefined): value is number {
  return value !== undefined && Number.isFinite(value) && value >= 0 && value <= 100;
}

function answerState(value: ClinicalAnswer): ScoreState {
  return value === 'yes' ? 'present' : value === 'no' ? 'absent' : 'unknown';
}

function categoryState<T extends string>(value: T, present: T[]): ScoreState {
  if (value === 'unknown') return 'unknown';
  return present.includes(value) ? 'present' : 'absent';
}

function countStates(states: ScoreState[]): { present: number; unknown: number } {
  return {
    present: states.filter(state => state === 'present').length,
    unknown: states.filter(state => state === 'unknown').length,
  };
}

function classifyAge(ageDays?: number): Pick<PediatricDiarrheaSafetyAssessment, 'ageBand' | 'completedAgeDays'> {
  if (!isKnownNonNegative(ageDays)) return { ageBand: 'unknown', completedAgeDays: null };
  const completedAgeDays = Math.floor(ageDays);
  if (ageDays < 60) return { ageBand: 'under-2-months', completedAgeDays };
  if (ageDays < 5 * 365.2425) return { ageBand: '2-months-to-under-5-years', completedAgeDays };
  return { ageBand: 'not-aidpi', completedAgeDays };
}

export function isPediatricDiarrheaSafetyRelevant(symptoms: string[], ageDays?: number): boolean {
  const aidpiAgeOrUnknown = !isKnownNonNegative(ageDays) || ageDays < 5 * 365.2425;
  if (!aidpiAgeOrUnknown) return false;

  return symptoms.some(symptom => {
    const normalized = normalize(symptom);
    return normalized.includes('diarreia')
      || normalized.includes('diarrhea')
      || normalized.includes('fezes liquidas')
      || normalized.includes('fezes aquosas')
      || normalized.includes('gastroenterite');
  });
}

export function evaluatePediatricDiarrheaSafety(
  input: PediatricDiarrheaSafetyInput,
): PediatricDiarrheaSafetyAssessment {
  const { ageBand, completedAgeDays } = classifyAge(input.ageDays);
  const applicable = input.diarrheaPresent && ageBand !== 'not-aidpi';
  const sunkenEyes = answerState(input.sunkenEyes);
  const severeStates: ScoreState[] = [
    categoryState(input.generalCondition, ['lethargic-unconscious']),
    sunkenEyes,
    categoryState(input.drinkingAbility, ['poor-unable']),
    categoryState(input.skinPinchReturn, ['very-slow']),
  ];
  const someStates: ScoreState[] = [
    categoryState(input.generalCondition, ['restless-irritable']),
    sunkenEyes,
    categoryState(input.drinkingAbility, ['eager-thirsty']),
    categoryState(input.skinPinchReturn, ['slow']),
  ];
  const youngInfantStates: ScoreState[] = [
    categoryState(input.generalCondition, ['restless-irritable', 'lethargic-unconscious']),
    sunkenEyes,
    categoryState(input.drinkingAbility, ['poor-unable']),
    categoryState(input.skinPinchReturn, ['slow', 'very-slow']),
  ];
  const severe = countStates(severeStates);
  const some = countStates(someStates);
  const youngInfant = countStates(youngInfantStates);

  let classification: DehydrationClassification = 'not-applicable';
  if (applicable && ageBand === 'unknown') {
    classification = 'incomplete';
  } else if (applicable && ageBand === 'under-2-months') {
    classification = youngInfant.present >= 2
      ? 'young-infant-dehydration'
      : youngInfant.present + youngInfant.unknown >= 2
        ? 'incomplete'
        : 'no-dehydration';
  } else if (applicable && ageBand === '2-months-to-under-5-years') {
    classification = severe.present >= 2
      ? 'severe-dehydration'
      : severe.present + severe.unknown >= 2
        ? 'incomplete'
        : some.present >= 2
          ? 'some-dehydration'
          : some.present + some.unknown >= 2
            ? 'incomplete'
            : 'no-dehydration';
  }

  const dangerSignIds: PediatricDiarrheaDangerSignId[] = [];
  const prioritySignIds: PediatricDiarrheaPrioritySignId[] = [];
  const validDuration = isValidCount(input.durationDays);
  const durationDays = validDuration ? input.durationDays : undefined;

  if (applicable) {
    if (classification === 'young-infant-dehydration') dangerSignIds.push('young-infant-dehydration');
    if (classification === 'severe-dehydration') dangerSignIds.push('severe-dehydration');
    if (input.generalCondition === 'lethargic-unconscious') dangerSignIds.push('lethargic-or-unconscious');
    if (input.drinkingAbility === 'poor-unable') dangerSignIds.push('unable-to-drink-or-breastfeed');
    if (input.vomitingEverything === 'yes') dangerSignIds.push('vomiting-everything');
    if (input.paleOrMottledSkin === 'yes') dangerSignIds.push('pale-or-mottled-skin');
    if (input.coldExtremities === 'yes') dangerSignIds.push('cold-extremities');
    if (input.weakPeripheralPulse === 'yes') dangerSignIds.push('weak-peripheral-pulse');
    if (input.capillaryRefillOver2Seconds === 'yes') dangerSignIds.push('capillary-refill-over-2-seconds');
    if (input.hypotension === 'yes') dangerSignIds.push('hypotension');
    if (input.biliousVomiting === 'yes') dangerSignIds.push('bilious-vomiting');

    if (ageBand === 'under-2-months' && durationDays !== undefined && durationDays >= 7) {
      dangerSignIds.push('young-infant-diarrhea-7-days-or-more');
    }
    if (ageBand === 'under-2-months' && input.bloodInStool === 'yes') {
      dangerSignIds.push('young-infant-blood-in-stool');
    }
    if (
      ageBand === '2-months-to-under-5-years'
      && durationDays !== undefined
      && durationDays >= 14
      && (classification === 'some-dehydration' || classification === 'severe-dehydration')
    ) {
      dangerSignIds.push('persistent-diarrhea-with-dehydration');
    }

    if (ageBand === 'unknown') prioritySignIds.push('age-required');
    if (classification === 'incomplete') prioritySignIds.push('incomplete-dehydration-screen');
    if (classification === 'some-dehydration') prioritySignIds.push('some-dehydration');
    if (
      ageBand === '2-months-to-under-5-years'
      && durationDays !== undefined
      && durationDays >= 14
      && !dangerSignIds.includes('persistent-diarrhea-with-dehydration')
    ) {
      prioritySignIds.push('persistent-diarrhea');
    }
    if (ageBand === '2-months-to-under-5-years' && input.bloodInStool === 'yes') {
      prioritySignIds.push('blood-in-stool-dysentery');
    }
    if (input.decreasedUrineOutput === 'yes') prioritySignIds.push('decreased-urine-output');
    if (
      (isValidCount(input.stoolsLast24Hours) && input.stoolsLast24Hours > 5)
      || (isValidCount(input.vomitingEpisodesLast24Hours) && input.vomitingEpisodesLast24Hours > 2)
      || input.stoppedBreastfeeding === 'yes'
      || input.lowBirthWeightOrMalnutrition === 'yes'
    ) {
      prioritySignIds.push('increased-dehydration-risk');
    }
    if (input.severeLocalizedAbdominalPain === 'yes' || input.abdominalDistensionOrRebound === 'yes') {
      prioritySignIds.push('alternative-diagnosis-sign');
    }
  }

  const nextQuestionIds: PediatricDiarrheaQuestionId[] = [];
  if (applicable) {
    if (ageBand === 'unknown') nextQuestionIds.push('age');
    if (!validDuration) nextQuestionIds.push('durationDays');
    if (input.bloodInStool === 'unknown') nextQuestionIds.push('bloodInStool');
    if (input.generalCondition === 'unknown') nextQuestionIds.push('generalCondition');
    if (input.sunkenEyes === 'unknown') nextQuestionIds.push('sunkenEyes');
    if (input.drinkingAbility === 'unknown') nextQuestionIds.push('drinkingAbility');
    if (input.skinPinchReturn === 'unknown') nextQuestionIds.push('skinPinchReturn');
    if (input.vomitingEverything === 'unknown') nextQuestionIds.push('vomitingEverything');
    if (input.decreasedUrineOutput === 'unknown') nextQuestionIds.push('decreasedUrineOutput');
    if (input.paleOrMottledSkin === 'unknown') nextQuestionIds.push('paleOrMottledSkin');
    if (input.coldExtremities === 'unknown') nextQuestionIds.push('coldExtremities');
    if (input.weakPeripheralPulse === 'unknown') nextQuestionIds.push('weakPeripheralPulse');
    if (input.capillaryRefillOver2Seconds === 'unknown') nextQuestionIds.push('capillaryRefillOver2Seconds');
    if (input.hypotension === 'unknown') nextQuestionIds.push('hypotension');
    if (input.biliousVomiting === 'unknown') nextQuestionIds.push('biliousVomiting');
    if (input.severeLocalizedAbdominalPain === 'unknown') nextQuestionIds.push('severeLocalizedAbdominalPain');
    if (input.abdominalDistensionOrRebound === 'unknown') nextQuestionIds.push('abdominalDistensionOrRebound');
    if (!isValidCount(input.stoolsLast24Hours)) nextQuestionIds.push('stoolsLast24Hours');
    if (!isValidCount(input.vomitingEpisodesLast24Hours)) nextQuestionIds.push('vomitingEpisodesLast24Hours');
    if (input.stoppedBreastfeeding === 'unknown') nextQuestionIds.push('stoppedBreastfeeding');
    if (input.lowBirthWeightOrMalnutrition === 'unknown') nextQuestionIds.push('lowBirthWeightOrMalnutrition');
  }

  const heuristicSymptoms: string[] = [];
  if (applicable && input.bloodInStool === 'yes') heuristicSymptoms.push('Sangue nas fezes');
  if (applicable && (input.vomitingEverything === 'yes' || (input.vomitingEpisodesLast24Hours ?? 0) > 0)) {
    heuristicSymptoms.push('Vômito');
  }

  return {
    applicable,
    ageBand,
    completedAgeDays,
    classification,
    severeSignCount: severe.present,
    someSignCount: some.present,
    youngInfantSignCount: youngInfant.present,
    dangerSignIds,
    prioritySignIds,
    priority: dangerSignIds.length > 0
      ? 'immediate-referral'
      : prioritySignIds.length > 0
        ? 'same-day-assessment'
        : 'routine',
    nextQuestionIds,
    heuristicSymptoms,
    kernelSymptoms: [],
    guardrails: {
      dehydrationAddedToKernel: false,
      shockScoreCalculated: false,
      fluidPlanAuthorized: false,
      zincDoseAuthorized: false,
      antibioticRecommendationAuthorized: false,
      prescriptionAuthorized: false,
      clinicalActivationAuthorized: false,
    },
  };
}
