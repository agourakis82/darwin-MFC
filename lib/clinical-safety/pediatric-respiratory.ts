import type { ClinicalAnswer } from './pertussis';

export type RespiratoryRateMeasurementState = 'calm' | 'not-calm' | 'unknown';
export type OxygenMeasurementContext = 'room-air' | 'supplemental-oxygen' | 'unknown';
export type DerivedObservation = 'present' | 'absent' | 'unknown';

export interface PediatricRespiratorySafetyInput {
  ageDays?: number;
  respiratorySymptomsPresent: boolean;
  respiratoryRatePerMinute?: number;
  repeatRespiratoryRatePerMinute?: number;
  respiratoryRateMeasurementState: RespiratoryRateMeasurementState;
  spo2Percent?: number;
  oxygenMeasurementContext: OxygenMeasurementContext;
  chestIndrawing: ClinicalAnswer;
  severeWorkOfBreathing: ClinicalAnswer;
  unableToDrinkOrBreastfeed: ClinicalAnswer;
  vomitingEverything: ClinicalAnswer;
  reducedOralIntakeOrDehydration: ClinicalAnswer;
  lethargyOrUnconsciousness: ClinicalAnswer;
  convulsions: ClinicalAnswer;
  apnea: ClinicalAnswer;
  centralCyanosis: ClinicalAnswer;
  stridorAtRest: ClinicalAnswer;
}

export type PediatricRespiratoryQuestionId =
  | 'age'
  | 'respiratoryRatePerMinute'
  | 'repeatRespiratoryRatePerMinute'
  | 'respiratoryRateMeasurementState'
  | 'spo2Percent'
  | 'oxygenMeasurementContext'
  | 'apnea'
  | 'centralCyanosis'
  | 'chestIndrawing'
  | 'severeWorkOfBreathing'
  | 'unableToDrinkOrBreastfeed'
  | 'vomitingEverything'
  | 'reducedOralIntakeOrDehydration'
  | 'lethargyOrUnconsciousness'
  | 'convulsions'
  | 'stridorAtRest';

export type PediatricRespiratoryDangerSignId =
  | 'apnea'
  | 'central-cyanosis'
  | 'convulsions'
  | 'lethargy-or-unconsciousness'
  | 'unable-to-drink-or-breastfeed'
  | 'vomiting-everything'
  | 'severe-work-of-breathing'
  | 'chest-indrawing'
  | 'stridor-at-rest'
  | 'room-air-spo2-below-92';

export type PediatricRespiratoryPrioritySignId =
  | 'tachypnea-for-age'
  | 'young-infant-repeat-count-required'
  | 'reduced-intake-or-dehydration';

export interface PediatricRespiratorySafetyAssessment {
  applicable: boolean;
  ageBand: 'under-2-months' | '2-to-11-months' | '1-to-under-5-years' | '5-to-17-years' | 'adult' | 'unknown';
  fastBreathingThreshold: 60 | 50 | 40 | null;
  tachypnea: DerivedObservation;
  hypoxemia: DerivedObservation;
  repeatCountRequired: boolean;
  dangerSignIds: PediatricRespiratoryDangerSignId[];
  prioritySignIds: PediatricRespiratoryPrioritySignId[];
  priority: 'routine' | 'same-day-assessment' | 'immediate-referral';
  nextQuestionIds: PediatricRespiratoryQuestionId[];
  heuristicSymptoms: string[];
  kernelSymptoms: string[];
  guardrails: {
    nonFrozenSafetySignalsAddedToKernel: false;
    posteriorAdjustedInTypeScript: false;
    antibioticRecommendationAuthorized: false;
    prescriptionAuthorized: false;
    clinicalActivationAuthorized: false;
  };
}

export const PEDIATRIC_RESPIRATORY_SAFETY_REFERENCES = [
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
    id: 'who-young-infant-2019',
    label: 'OMS · Lactente até 2 meses',
    url: 'https://www.who.int/publications/i/item/9789241516365',
  },
  {
    id: 'nice-bronchiolitis-ng9',
    label: 'NICE · Bronquiolite NG9',
    url: 'https://www.nice.org.uk/guidance/ng9/chapter/Recommendations',
  },
] as const;

export const EMPTY_PEDIATRIC_RESPIRATORY_SAFETY_INPUT: Omit<
  PediatricRespiratorySafetyInput,
  'ageDays' | 'respiratorySymptomsPresent'
> = {
  respiratoryRatePerMinute: undefined,
  repeatRespiratoryRatePerMinute: undefined,
  respiratoryRateMeasurementState: 'unknown',
  spo2Percent: undefined,
  oxygenMeasurementContext: 'unknown',
  chestIndrawing: 'unknown',
  severeWorkOfBreathing: 'unknown',
  unableToDrinkOrBreastfeed: 'unknown',
  vomitingEverything: 'unknown',
  reducedOralIntakeOrDehydration: 'unknown',
  lethargyOrUnconsciousness: 'unknown',
  convulsions: 'unknown',
  apnea: 'unknown',
  centralCyanosis: 'unknown',
  stridorAtRest: 'unknown',
};

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

function isValidRespiratoryRate(value: number | undefined): value is number {
  return value !== undefined && Number.isFinite(value) && value > 0 && value <= 200;
}

function isValidSpo2(value: number | undefined): value is number {
  return value !== undefined && Number.isFinite(value) && value >= 50 && value <= 100;
}

function isYes(value: ClinicalAnswer): boolean {
  return value === 'yes';
}

export function isPediatricRespiratorySafetyRelevant(symptoms: string[], ageDays?: number): boolean {
  const pediatricOrUnknown = !isKnownNonNegative(ageDays) || ageDays < 18 * 365.2425;
  if (!pediatricOrUnknown) return false;

  return symptoms.some(symptom => {
    const normalized = normalize(symptom);
    return normalized.includes('tosse')
      || normalized.includes('coriza')
      || normalized.includes('respir')
      || normalized.includes('dispneia')
      || normalized.includes('falta de ar')
      || normalized.includes('sibil')
      || normalized.includes('chiado')
      || normalized.includes('estridor')
      || normalized.includes('bronquiolite')
      || normalized.includes('pneumonia');
  });
}

function classifyAge(ageDays?: number): Pick<
  PediatricRespiratorySafetyAssessment,
  'ageBand' | 'fastBreathingThreshold'
> {
  if (!isKnownNonNegative(ageDays)) return { ageBand: 'unknown', fastBreathingThreshold: null };
  if (ageDays < 60) return { ageBand: 'under-2-months', fastBreathingThreshold: 60 };
  if (ageDays < 365) return { ageBand: '2-to-11-months', fastBreathingThreshold: 50 };
  if (ageDays < 5 * 365.2425) return { ageBand: '1-to-under-5-years', fastBreathingThreshold: 40 };
  if (ageDays < 18 * 365.2425) return { ageBand: '5-to-17-years', fastBreathingThreshold: null };
  return { ageBand: 'adult', fastBreathingThreshold: null };
}

export function evaluatePediatricRespiratorySafety(
  input: PediatricRespiratorySafetyInput,
): PediatricRespiratorySafetyAssessment {
  const { ageBand, fastBreathingThreshold } = classifyAge(input.ageDays);
  const respiratoryRate = input.respiratoryRatePerMinute;
  const repeatRespiratoryRate = input.repeatRespiratoryRatePerMinute;
  const spo2Percent = input.spo2Percent;
  const rateValid = isValidRespiratoryRate(respiratoryRate);
  const calmMeasurement = input.respiratoryRateMeasurementState === 'calm';
  const firstCountElevated = rateValid
    && fastBreathingThreshold !== null
    && respiratoryRate >= fastBreathingThreshold;
  const repeatCountRequired = ageBand === 'under-2-months' && calmMeasurement && firstCountElevated;
  const repeatRateValid = isValidRespiratoryRate(repeatRespiratoryRate);

  let tachypnea: DerivedObservation = 'unknown';
  if (calmMeasurement && rateValid && fastBreathingThreshold !== null) {
    if (repeatCountRequired) {
      tachypnea = repeatRateValid
        ? repeatRespiratoryRate >= fastBreathingThreshold ? 'present' : 'absent'
        : 'unknown';
    } else {
      tachypnea = firstCountElevated ? 'present' : 'absent';
    }
  }

  const spo2Valid = isValidSpo2(spo2Percent);
  const roomAirSpo2 = input.oxygenMeasurementContext === 'room-air';
  const hypoxemia: DerivedObservation = roomAirSpo2 && spo2Valid
    ? spo2Percent < 92 ? 'present' : 'absent'
    : 'unknown';

  const dangerSignIds: PediatricRespiratoryDangerSignId[] = [];
  if (isYes(input.apnea)) dangerSignIds.push('apnea');
  if (isYes(input.centralCyanosis)) dangerSignIds.push('central-cyanosis');
  if (isYes(input.convulsions)) dangerSignIds.push('convulsions');
  if (isYes(input.lethargyOrUnconsciousness)) dangerSignIds.push('lethargy-or-unconsciousness');
  if (isYes(input.unableToDrinkOrBreastfeed)) dangerSignIds.push('unable-to-drink-or-breastfeed');
  if (isYes(input.vomitingEverything)) dangerSignIds.push('vomiting-everything');
  if (isYes(input.severeWorkOfBreathing)) dangerSignIds.push('severe-work-of-breathing');
  if (isYes(input.chestIndrawing)) dangerSignIds.push('chest-indrawing');
  if (isYes(input.stridorAtRest)) dangerSignIds.push('stridor-at-rest');
  if (hypoxemia === 'present') dangerSignIds.push('room-air-spo2-below-92');

  const prioritySignIds: PediatricRespiratoryPrioritySignId[] = [];
  if (tachypnea === 'present') prioritySignIds.push('tachypnea-for-age');
  if (repeatCountRequired && !repeatRateValid) prioritySignIds.push('young-infant-repeat-count-required');
  if (isYes(input.reducedOralIntakeOrDehydration)) prioritySignIds.push('reduced-intake-or-dehydration');

  const nextQuestionIds: PediatricRespiratoryQuestionId[] = [];
  if (ageBand === 'unknown') nextQuestionIds.push('age');
  if (input.apnea === 'unknown') nextQuestionIds.push('apnea');
  if (input.centralCyanosis === 'unknown') nextQuestionIds.push('centralCyanosis');
  if (input.severeWorkOfBreathing === 'unknown') nextQuestionIds.push('severeWorkOfBreathing');
  if (input.chestIndrawing === 'unknown') nextQuestionIds.push('chestIndrawing');
  if (input.stridorAtRest === 'unknown') nextQuestionIds.push('stridorAtRest');
  if (input.unableToDrinkOrBreastfeed === 'unknown') nextQuestionIds.push('unableToDrinkOrBreastfeed');
  if (input.vomitingEverything === 'unknown') nextQuestionIds.push('vomitingEverything');
  if (input.lethargyOrUnconsciousness === 'unknown') nextQuestionIds.push('lethargyOrUnconsciousness');
  if (input.convulsions === 'unknown') nextQuestionIds.push('convulsions');
  if (input.reducedOralIntakeOrDehydration === 'unknown') nextQuestionIds.push('reducedOralIntakeOrDehydration');
  if (!rateValid) nextQuestionIds.push('respiratoryRatePerMinute');
  if (input.respiratoryRateMeasurementState === 'unknown') nextQuestionIds.push('respiratoryRateMeasurementState');
  if (repeatCountRequired && !repeatRateValid) nextQuestionIds.push('repeatRespiratoryRatePerMinute');
  if (!spo2Valid) nextQuestionIds.push('spo2Percent');
  if (input.oxygenMeasurementContext === 'unknown') nextQuestionIds.push('oxygenMeasurementContext');

  const heuristicSymptoms: string[] = [];
  if (tachypnea === 'present') heuristicSymptoms.push('Taquipneia');
  if (isYes(input.chestIndrawing) || isYes(input.severeWorkOfBreathing)) heuristicSymptoms.push('Dispneia');
  if (isYes(input.stridorAtRest)) heuristicSymptoms.push('Estridor');
  if (hypoxemia === 'present') heuristicSymptoms.push('Hipoxemia');
  if (isYes(input.apnea)) heuristicSymptoms.push('Apneia');
  if (isYes(input.centralCyanosis)) heuristicSymptoms.push('Cianose');

  const kernelSymptoms: string[] = [];
  if (tachypnea === 'present') kernelSymptoms.push('Frequência respiratória elevada');
  if (isYes(input.chestIndrawing) || isYes(input.severeWorkOfBreathing)) {
    kernelSymptoms.push('Dificuldade para respirar');
  }
  if (isYes(input.stridorAtRest)) kernelSymptoms.push('Estridor');
  if (hypoxemia === 'present') kernelSymptoms.push('SpO2 baixa');

  return {
    applicable: input.respiratorySymptomsPresent && ageBand !== 'adult',
    ageBand,
    fastBreathingThreshold,
    tachypnea,
    hypoxemia,
    repeatCountRequired,
    dangerSignIds,
    prioritySignIds,
    priority: dangerSignIds.length > 0
      ? 'immediate-referral'
      : prioritySignIds.length > 0
        ? 'same-day-assessment'
        : 'routine',
    nextQuestionIds,
    heuristicSymptoms,
    kernelSymptoms,
    guardrails: {
      nonFrozenSafetySignalsAddedToKernel: false,
      posteriorAdjustedInTypeScript: false,
      antibioticRecommendationAuthorized: false,
      prescriptionAuthorized: false,
      clinicalActivationAuthorized: false,
    },
  };
}
