import type { ClinicalAnswer } from './pertussis';

export type TemperatureMeasurementSite = 'axillary' | 'rectal' | 'other' | 'unknown';
export type YoungInfantTemperatureStatus = 'normal' | 'aidpi-fever' | 'fever' | 'hypothermia' | 'unknown';
export type YoungInfantAgeBand = '0-to-7-days' | '8-to-21-days' | '22-to-28-days' | '29-to-59-days' | '60-to-89-days' | 'not-young-infant' | 'unknown';

export interface YoungInfantFeverSafetyInput {
  ageDays?: number;
  feverConcernPresent: boolean;
  temperatureC?: number;
  temperatureMeasurementSite: TemperatureMeasurementSite;
  documentedHomeFeverAtOrAbove38: ClinicalAnswer;
  illAppearance: ClinicalAnswer;
  reducedMovement: ClinicalAnswer;
  unableToFeed: ClinicalAnswer;
  vomitingEverything: ClinicalAnswer;
  convulsions: ClinicalAnswer;
  apnea: ClinicalAnswer;
  centralCyanosis: ClinicalAnswer;
  severeRespiratoryDistress: ClinicalAnswer;
  poorPerfusion: ClinicalAnswer;
  bulgingFontanelle: ClinicalAnswer;
  nonBlanchingRash: ClinicalAnswer;
  umbilicalInfectionExtendingToSkin: ClinicalAnswer;
  extensiveSkinPustules: ClinicalAnswer;
  pretermOrMedicallyComplex: ClinicalAnswer;
}

export type YoungInfantFeverQuestionId =
  | 'age'
  | 'temperatureC'
  | 'temperatureMeasurementSite'
  | 'documentedHomeFeverAtOrAbove38'
  | 'illAppearance'
  | 'reducedMovement'
  | 'unableToFeed'
  | 'vomitingEverything'
  | 'convulsions'
  | 'apnea'
  | 'centralCyanosis'
  | 'severeRespiratoryDistress'
  | 'poorPerfusion'
  | 'bulgingFontanelle'
  | 'nonBlanchingRash'
  | 'umbilicalInfectionExtendingToSkin'
  | 'extensiveSkinPustules'
  | 'pretermOrMedicallyComplex';

export type YoungInfantFeverDangerSignId =
  | 'axillary-temperature-below-36'
  | 'axillary-temperature-at-or-above-37-5'
  | 'measured-temperature-at-or-above-38'
  | 'documented-home-fever-at-or-above-38'
  | 'ill-appearance'
  | 'reduced-movement'
  | 'unable-to-feed'
  | 'vomiting-everything'
  | 'convulsions'
  | 'apnea'
  | 'central-cyanosis'
  | 'severe-respiratory-distress'
  | 'poor-perfusion'
  | 'bulging-fontanelle'
  | 'non-blanching-rash'
  | 'umbilical-infection-extending-to-skin'
  | 'extensive-skin-pustules';

export type YoungInfantFeverPrioritySignId =
  | 'age-required'
  | 'temperature-measurement-required'
  | 'measurement-site-required'
  | 'incomplete-danger-screen'
  | 'higher-risk-clinical-context';

export interface YoungInfantFeverSafetyAssessment {
  applicable: boolean;
  ageBand: YoungInfantAgeBand;
  completedAgeDays: number | null;
  temperatureStatus: YoungInfantTemperatureStatus;
  aidpiTemperatureDangerMet: boolean;
  internationalFeverThresholdMet: boolean;
  aapAgeScope: boolean;
  dangerSignIds: YoungInfantFeverDangerSignId[];
  prioritySignIds: YoungInfantFeverPrioritySignId[];
  priority: 'routine' | 'same-day-assessment' | 'immediate-referral';
  nextQuestionIds: YoungInfantFeverQuestionId[];
  heuristicSymptoms: string[];
  kernelSymptoms: string[];
  guardrails: {
    homeFeverAddedToKernel: false;
    nonFrozenSafetySignalsAddedToKernel: false;
    sepsisRiskScoreCalculated: false;
    posteriorAdjustedInTypeScript: false;
    antibioticRecommendationAuthorized: false;
    prescriptionAuthorized: false;
    clinicalActivationAuthorized: false;
  };
}

export const YOUNG_INFANT_FEVER_SAFETY_REFERENCES = [
  {
    id: 'ms-aidpi-neonatal',
    label: 'MS · AIDPI Neonatal',
    url: 'https://bvsms.saude.gov.br/bvs/publicacoes/maual_aidpi_neonatal_quadro_procedimentos.pdf',
  },
  {
    id: 'ms-child-danger-signs',
    label: 'MS · Sinais de perigo',
    url: 'https://linhasdecuidado.saude.gov.br/portal/puericultura/sou-paciente/',
  },
  {
    id: 'who-young-infant-2019',
    label: 'OMS · Lactente até 2 meses',
    url: 'https://www.who.int/publications/i/item/9789241516365',
  },
  {
    id: 'aap-febrile-infant-2021',
    label: 'AAP · Lactente febril 8–60 dias',
    url: 'https://publications.aap.org/pediatrics/article/148/2/e2021052228/179783/Evaluation-and-Management-of-Well-Appearing',
  },
  {
    id: 'nice-fever-under-5-ng143',
    label: 'NICE · Febre abaixo de 5 anos',
    url: 'https://www.nice.org.uk/guidance/ng143/chapter/recommendations',
  },
] as const;

export const EMPTY_YOUNG_INFANT_FEVER_SAFETY_INPUT: Omit<
  YoungInfantFeverSafetyInput,
  'ageDays' | 'feverConcernPresent'
> = {
  temperatureC: undefined,
  temperatureMeasurementSite: 'unknown',
  documentedHomeFeverAtOrAbove38: 'unknown',
  illAppearance: 'unknown',
  reducedMovement: 'unknown',
  unableToFeed: 'unknown',
  vomitingEverything: 'unknown',
  convulsions: 'unknown',
  apnea: 'unknown',
  centralCyanosis: 'unknown',
  severeRespiratoryDistress: 'unknown',
  poorPerfusion: 'unknown',
  bulgingFontanelle: 'unknown',
  nonBlanchingRash: 'unknown',
  umbilicalInfectionExtendingToSkin: 'unknown',
  extensiveSkinPustules: 'unknown',
  pretermOrMedicallyComplex: 'unknown',
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

function isValidTemperature(value: number | undefined): value is number {
  return value !== undefined && Number.isFinite(value) && value >= 30 && value <= 45;
}

function isYes(value: ClinicalAnswer): boolean {
  return value === 'yes';
}

function classifyAge(ageDays?: number): { ageBand: YoungInfantAgeBand; completedAgeDays: number | null } {
  if (!isKnownNonNegative(ageDays)) return { ageBand: 'unknown', completedAgeDays: null };
  const completedAgeDays = Math.floor(ageDays);
  if (completedAgeDays <= 7) return { ageBand: '0-to-7-days', completedAgeDays };
  if (completedAgeDays <= 21) return { ageBand: '8-to-21-days', completedAgeDays };
  if (completedAgeDays <= 28) return { ageBand: '22-to-28-days', completedAgeDays };
  if (completedAgeDays <= 59) return { ageBand: '29-to-59-days', completedAgeDays };
  if (completedAgeDays <= 89) return { ageBand: '60-to-89-days', completedAgeDays };
  return { ageBand: 'not-young-infant', completedAgeDays };
}

export function isYoungInfantFeverSafetyRelevant(symptoms: string[], ageDays?: number): boolean {
  const youngInfantOrUnknown = !isKnownNonNegative(ageDays) || Math.floor(ageDays) <= 89;
  if (!youngInfantOrUnknown) return false;

  return symptoms.some(isYoungInfantFeverConcernSymptom);
}

export function isYoungInfantFeverConcernSymptom(symptom: string): boolean {
  const normalized = normalize(symptom);
  return normalized.includes('febre')
    || normalized.includes('febril')
    || normalized.includes('hipotermia')
    || normalized.includes('temperatura alta')
    || normalized.includes('temperatura baixa');
}

export function evaluateYoungInfantFeverSafety(
  input: YoungInfantFeverSafetyInput,
): YoungInfantFeverSafetyAssessment {
  const { ageBand, completedAgeDays } = classifyAge(input.ageDays);
  const under60Days = completedAgeDays !== null && completedAgeDays <= 59;
  const under90Days = completedAgeDays !== null && completedAgeDays <= 89;
  const applicable = input.feverConcernPresent && ageBand !== 'not-young-infant';
  const temperatureC = input.temperatureC;
  const validTemperature = isValidTemperature(temperatureC);
  const axillaryMeasurement = input.temperatureMeasurementSite === 'axillary';
  const measuredFeverAtOrAbove38 = validTemperature && temperatureC >= 38;
  const axillaryHypothermia = under60Days && axillaryMeasurement && validTemperature && temperatureC < 36;
  const axillaryAidpiFever = under60Days
    && axillaryMeasurement
    && validTemperature
    && temperatureC >= 37.5
    && temperatureC < 38;
  const homeFeverDocumented = isYes(input.documentedHomeFeverAtOrAbove38);
  const aidpiTemperatureDangerMet = axillaryHypothermia || axillaryAidpiFever || (under60Days && measuredFeverAtOrAbove38);
  const internationalFeverThresholdMet = under90Days && (measuredFeverAtOrAbove38 || homeFeverDocumented);

  let temperatureStatus: YoungInfantTemperatureStatus = 'unknown';
  if (validTemperature) {
    temperatureStatus = axillaryHypothermia
      ? 'hypothermia'
      : measuredFeverAtOrAbove38
        ? 'fever'
        : axillaryAidpiFever
          ? 'aidpi-fever'
          : 'normal';
  }

  const dangerSignIds: YoungInfantFeverDangerSignId[] = [];
  if (axillaryHypothermia) dangerSignIds.push('axillary-temperature-below-36');
  if (axillaryAidpiFever) dangerSignIds.push('axillary-temperature-at-or-above-37-5');
  if (under90Days && measuredFeverAtOrAbove38) dangerSignIds.push('measured-temperature-at-or-above-38');
  if (under90Days && homeFeverDocumented) dangerSignIds.push('documented-home-fever-at-or-above-38');
  if (isYes(input.illAppearance)) dangerSignIds.push('ill-appearance');
  if (isYes(input.reducedMovement)) dangerSignIds.push('reduced-movement');
  if (isYes(input.unableToFeed)) dangerSignIds.push('unable-to-feed');
  if (isYes(input.vomitingEverything)) dangerSignIds.push('vomiting-everything');
  if (isYes(input.convulsions)) dangerSignIds.push('convulsions');
  if (isYes(input.apnea)) dangerSignIds.push('apnea');
  if (isYes(input.centralCyanosis)) dangerSignIds.push('central-cyanosis');
  if (isYes(input.severeRespiratoryDistress)) dangerSignIds.push('severe-respiratory-distress');
  if (isYes(input.poorPerfusion)) dangerSignIds.push('poor-perfusion');
  if (isYes(input.bulgingFontanelle)) dangerSignIds.push('bulging-fontanelle');
  if (isYes(input.nonBlanchingRash)) dangerSignIds.push('non-blanching-rash');
  if (isYes(input.umbilicalInfectionExtendingToSkin)) dangerSignIds.push('umbilical-infection-extending-to-skin');
  if (isYes(input.extensiveSkinPustules)) dangerSignIds.push('extensive-skin-pustules');

  const prioritySignIds: YoungInfantFeverPrioritySignId[] = [];
  if (ageBand === 'unknown') prioritySignIds.push('age-required');
  if (!validTemperature && !homeFeverDocumented) prioritySignIds.push('temperature-measurement-required');
  if (validTemperature && input.temperatureMeasurementSite === 'unknown') prioritySignIds.push('measurement-site-required');
  const dangerScreenAnswers: ClinicalAnswer[] = [
    input.documentedHomeFeverAtOrAbove38,
    input.illAppearance,
    input.reducedMovement,
    input.unableToFeed,
    input.vomitingEverything,
    input.convulsions,
    input.apnea,
    input.centralCyanosis,
    input.severeRespiratoryDistress,
    input.poorPerfusion,
    input.bulgingFontanelle,
    input.nonBlanchingRash,
    input.umbilicalInfectionExtendingToSkin,
    input.extensiveSkinPustules,
  ];
  if (dangerScreenAnswers.includes('unknown')) prioritySignIds.push('incomplete-danger-screen');
  if (isYes(input.pretermOrMedicallyComplex)) prioritySignIds.push('higher-risk-clinical-context');

  const nextQuestionIds: YoungInfantFeverQuestionId[] = [];
  if (ageBand === 'unknown') nextQuestionIds.push('age');
  if (!validTemperature) nextQuestionIds.push('temperatureC');
  if (input.temperatureMeasurementSite === 'unknown') nextQuestionIds.push('temperatureMeasurementSite');
  if (input.documentedHomeFeverAtOrAbove38 === 'unknown') nextQuestionIds.push('documentedHomeFeverAtOrAbove38');
  if (input.illAppearance === 'unknown') nextQuestionIds.push('illAppearance');
  if (input.reducedMovement === 'unknown') nextQuestionIds.push('reducedMovement');
  if (input.unableToFeed === 'unknown') nextQuestionIds.push('unableToFeed');
  if (input.vomitingEverything === 'unknown') nextQuestionIds.push('vomitingEverything');
  if (input.convulsions === 'unknown') nextQuestionIds.push('convulsions');
  if (input.apnea === 'unknown') nextQuestionIds.push('apnea');
  if (input.centralCyanosis === 'unknown') nextQuestionIds.push('centralCyanosis');
  if (input.severeRespiratoryDistress === 'unknown') nextQuestionIds.push('severeRespiratoryDistress');
  if (input.poorPerfusion === 'unknown') nextQuestionIds.push('poorPerfusion');
  if (input.bulgingFontanelle === 'unknown') nextQuestionIds.push('bulgingFontanelle');
  if (input.nonBlanchingRash === 'unknown') nextQuestionIds.push('nonBlanchingRash');
  if (input.umbilicalInfectionExtendingToSkin === 'unknown') nextQuestionIds.push('umbilicalInfectionExtendingToSkin');
  if (input.extensiveSkinPustules === 'unknown') nextQuestionIds.push('extensiveSkinPustules');
  if (input.pretermOrMedicallyComplex === 'unknown') nextQuestionIds.push('pretermOrMedicallyComplex');

  const heuristicSymptoms = applicable && (measuredFeverAtOrAbove38 || axillaryAidpiFever || homeFeverDocumented)
    ? ['Febre']
    : [];
  const kernelSymptoms = applicable && measuredFeverAtOrAbove38 ? ['Febre'] : [];

  return {
    applicable,
    ageBand,
    completedAgeDays,
    temperatureStatus,
    aidpiTemperatureDangerMet,
    internationalFeverThresholdMet,
    aapAgeScope: completedAgeDays !== null && completedAgeDays >= 8 && completedAgeDays <= 60,
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
      homeFeverAddedToKernel: false,
      nonFrozenSafetySignalsAddedToKernel: false,
      sepsisRiskScoreCalculated: false,
      posteriorAdjustedInTypeScript: false,
      antibioticRecommendationAuthorized: false,
      prescriptionAuthorized: false,
      clinicalActivationAuthorized: false,
    },
  };
}
