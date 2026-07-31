import type { ClinicalAnswer } from './pertussis';

export type PediatricAbdominalAgeBand =
  | 'under-3-months'
  | '3-months-to-under-2-years'
  | '2-to-under-5-years'
  | '5-to-under-12-years'
  | '12-to-under-18-years'
  | 'adult'
  | 'unknown';
export type AbdominalPainOnset = 'sudden' | 'gradual' | 'unknown';
export type AbdominalPainPattern = 'constant-progressive' | 'intermittent-colicky' | 'other' | 'none' | 'unknown';
export type AbdominalPainLocation =
  | 'diffuse'
  | 'periumbilical'
  | 'right-lower-quadrant'
  | 'other-localized'
  | 'pelvic-lower'
  | 'none'
  | 'unknown';
export type AbdominalPainSeverity = 'mild' | 'moderate' | 'severe' | 'none' | 'unknown';

export interface PediatricAbdominalSafetyInput {
  ageDays?: number;
  abdominalOrVomitingPresent: boolean;
  painDurationHours?: number;
  vomitingEpisodesLast24Hours?: number;
  painOnset: AbdominalPainOnset;
  painPattern: AbdominalPainPattern;
  painLocation: AbdominalPainLocation;
  painSeverity: AbdominalPainSeverity;
  migrationToRightLowerQuadrant: ClinicalAnswer;
  painWithMovementOrUnableToWalkHop: ClinicalAnswer;
  feverPresent: ClinicalAnswer;
  guardingOrRigidity: ClinicalAnswer;
  reboundOrPercussionTenderness: ClinicalAnswer;
  abdominalDistension: ClinicalAnswer;
  palpableMassOrIncarceratedHernia: ClinicalAnswer;
  biliousVomiting: ClinicalAnswer;
  hematemesis: ClinicalAnswer;
  projectileVomiting: ClinicalAnswer;
  vomitingEverything: ClinicalAnswer;
  visibleBloodInStool: ClinicalAnswer;
  drawsLegsUp: ClinicalAnswer;
  pallorOrEpisodicLethargy: ClinicalAnswer;
  scrotalOrInguinalPainSwelling: ClinicalAnswer;
  suddenPelvicPainOrPregnancyConcern: ClinicalAnswer;
  morningHeadacheOrMorningVomiting: ClinicalAnswer;
  abnormalNeurologyMeningismOrBulgingFontanelle: ClinicalAnswer;
  polyuriaPolydipsiaWeightLossOrDeepBreathing: ClinicalAnswer;
  suspectedPoisoningOrIngestion: ClinicalAnswer;
  previousAbdominalSurgeryOrObstruction: ClinicalAnswer;
  urinarySymptoms: ClinicalAnswer;
}

export type PediatricAbdominalQuestionId = Exclude<keyof PediatricAbdominalSafetyInput, 'abdominalOrVomitingPresent'> | 'age';

export type PediatricAbdominalDangerSignId =
  | 'bilious-vomiting'
  | 'hematemesis'
  | 'peritonism'
  | 'abdominal-mass-or-incarcerated-hernia'
  | 'acute-scrotal-pain-or-swelling'
  | 'acute-pelvic-pain-or-pregnancy-concern'
  | 'severe-sudden-or-progressive-pain'
  | 'bowel-obstruction-pattern'
  | 'intussusception-pattern'
  | 'projectile-vomiting-young-infant'
  | 'neurological-red-flags'
  | 'dka-pattern'
  | 'suspected-poisoning';

export type PediatricAbdominalPrioritySignId =
  | 'age-required'
  | 'incomplete-core-surgical-screen'
  | 'appendicitis-compatible-pattern'
  | 'recurrent-vomiting'
  | 'localized-abdominal-pain'
  | 'young-infant-nonspecific-symptoms'
  | 'urinary-symptoms';

export interface PediatricAbdominalSafetyAssessment {
  applicable: boolean;
  ageBand: PediatricAbdominalAgeBand;
  completedAgeDays: number | null;
  dangerSignIds: PediatricAbdominalDangerSignId[];
  prioritySignIds: PediatricAbdominalPrioritySignId[];
  patternIds: Array<'possible-intussusception' | 'possible-appendicitis' | 'possible-obstruction'>;
  priority: 'routine' | 'same-day-assessment' | 'immediate-referral';
  nextQuestionIds: PediatricAbdominalQuestionId[];
  heuristicSymptoms: string[];
  kernelSymptoms: [];
  guardrails: {
    abdominalSignsAddedToKernel: false;
    appendicitisScoreCalculated: false;
    intussusceptionDiagnosed: false;
    imagingAutomaticallyOrdered: false;
    antiemeticAuthorized: false;
    antibioticAuthorized: false;
    prescriptionAuthorized: false;
    clinicalActivationAuthorized: false;
  };
}

export const PEDIATRIC_ABDOMINAL_SAFETY_REFERENCES = [
  {
    id: 'sbp-nausea-vomiting-2024',
    label: 'SBP 2024 · Náuseas e vômitos',
    url: 'https://www.sbp.com.br/fileadmin/user_upload/24101c-DC_NauseasVomitos_em_pediatria_como_abordar-atualiz.pdf',
  },
  {
    id: 'nice-gastroenteritis-cg84',
    label: 'NICE CG84 · Sinais alternativos',
    url: 'https://www.nice.org.uk/guidance/cg84/chapter/Recommendations',
  },
  {
    id: 'rch-acute-abdominal-pain',
    label: 'RCH 2024 · Dor abdominal aguda',
    url: 'https://www.rch.org.au/clinicalguide/guideline_index/Abdominal_pain/',
  },
  {
    id: 'rch-vomiting',
    label: 'RCH · Vômitos',
    url: 'https://www.rch.org.au/clinicalguide/guideline_index/Vomiting/',
  },
  {
    id: 'rch-intussusception',
    label: 'RCH · Invaginação intestinal',
    url: 'https://www.rch.org.au/clinicalguide/guideline_index/intussusception_guideline/',
  },
  {
    id: 'idsa-appendicitis-imaging-2024',
    label: 'IDSA 2024 · Imagem na apendicite',
    url: 'https://www.idsociety.org/practice-guideline/intra-abdominal-infections/',
  },
] as const;

export const EMPTY_PEDIATRIC_ABDOMINAL_SAFETY_INPUT: Omit<
  PediatricAbdominalSafetyInput,
  'ageDays' | 'abdominalOrVomitingPresent'
> = {
  painDurationHours: undefined,
  vomitingEpisodesLast24Hours: undefined,
  painOnset: 'unknown',
  painPattern: 'unknown',
  painLocation: 'unknown',
  painSeverity: 'unknown',
  migrationToRightLowerQuadrant: 'unknown',
  painWithMovementOrUnableToWalkHop: 'unknown',
  feverPresent: 'unknown',
  guardingOrRigidity: 'unknown',
  reboundOrPercussionTenderness: 'unknown',
  abdominalDistension: 'unknown',
  palpableMassOrIncarceratedHernia: 'unknown',
  biliousVomiting: 'unknown',
  hematemesis: 'unknown',
  projectileVomiting: 'unknown',
  vomitingEverything: 'unknown',
  visibleBloodInStool: 'unknown',
  drawsLegsUp: 'unknown',
  pallorOrEpisodicLethargy: 'unknown',
  scrotalOrInguinalPainSwelling: 'unknown',
  suddenPelvicPainOrPregnancyConcern: 'unknown',
  morningHeadacheOrMorningVomiting: 'unknown',
  abnormalNeurologyMeningismOrBulgingFontanelle: 'unknown',
  polyuriaPolydipsiaWeightLossOrDeepBreathing: 'unknown',
  suspectedPoisoningOrIngestion: 'unknown',
  previousAbdominalSurgeryOrObstruction: 'unknown',
  urinarySymptoms: 'unknown',
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

function isValidCount(value: number | undefined, maximum = 100): value is number {
  return isKnownNonNegative(value) && value <= maximum;
}

function classifyAge(ageDays?: number): Pick<PediatricAbdominalSafetyAssessment, 'ageBand' | 'completedAgeDays'> {
  if (!isKnownNonNegative(ageDays)) return { ageBand: 'unknown', completedAgeDays: null };
  const completedAgeDays = Math.floor(ageDays);
  if (ageDays < 90) return { ageBand: 'under-3-months', completedAgeDays };
  if (ageDays < 2 * 365.2425) return { ageBand: '3-months-to-under-2-years', completedAgeDays };
  if (ageDays < 5 * 365.2425) return { ageBand: '2-to-under-5-years', completedAgeDays };
  if (ageDays < 12 * 365.2425) return { ageBand: '5-to-under-12-years', completedAgeDays };
  if (ageDays < 18 * 365.2425) return { ageBand: '12-to-under-18-years', completedAgeDays };
  return { ageBand: 'adult', completedAgeDays };
}

export function isPediatricAbdominalSafetyRelevant(symptoms: string[], ageDays?: number): boolean {
  if (isKnownNonNegative(ageDays) && ageDays >= 18 * 365.2425) return false;
  return symptoms.some(symptom => {
    const normalized = normalize(symptom);
    if (normalized.includes('vomito pos tosse') || normalized.includes('post tussive')) return false;
    return normalized.includes('dor abdominal')
      || normalized.includes('dor de barriga')
      || normalized.includes('dor na barriga')
      || normalized.includes('colica abdominal')
      || normalized.includes('vomito')
      || normalized.includes('nausea')
      || normalized.includes('hematemese')
      || normalized.includes('distensao abdominal');
  });
}

export function evaluatePediatricAbdominalSafety(
  input: PediatricAbdominalSafetyInput,
): PediatricAbdominalSafetyAssessment {
  const { ageBand, completedAgeDays } = classifyAge(input.ageDays);
  const applicable = input.abdominalOrVomitingPresent && ageBand !== 'adult';
  const dangerSignIds: PediatricAbdominalDangerSignId[] = [];
  const prioritySignIds: PediatricAbdominalPrioritySignId[] = [];
  const patternIds: PediatricAbdominalSafetyAssessment['patternIds'] = [];

  const hasVomiting = input.vomitingEverything === 'yes'
    || input.biliousVomiting === 'yes'
    || input.hematemesis === 'yes'
    || input.projectileVomiting === 'yes'
    || (isValidCount(input.vomitingEpisodesLast24Hours) && input.vomitingEpisodesLast24Hours > 0);
  const localizedPain = ['right-lower-quadrant', 'other-localized', 'pelvic-lower'].includes(input.painLocation);
  const progressivePain = input.painPattern === 'constant-progressive';
  const intussusceptionSupport = [
    input.drawsLegsUp,
    input.pallorOrEpisodicLethargy,
    input.visibleBloodInStool,
  ].filter(answer => answer === 'yes').length;
  const intussusceptionPattern = input.painPattern === 'intermittent-colicky'
    && (intussusceptionSupport >= 2
      || (ageBand === '3-months-to-under-2-years' && intussusceptionSupport >= 1));
  const obstructionPattern = input.abdominalDistension === 'yes'
    && (hasVomiting || input.previousAbdominalSurgeryOrObstruction === 'yes');
  const appendicitisSupport = [
    input.painLocation === 'right-lower-quadrant',
    input.migrationToRightLowerQuadrant === 'yes',
    input.painWithMovementOrUnableToWalkHop === 'yes',
    progressivePain,
    input.feverPresent === 'yes',
  ].filter(Boolean).length;
  const appendicitisPattern = appendicitisSupport >= 2
    && (input.painLocation === 'right-lower-quadrant'
      || input.migrationToRightLowerQuadrant === 'yes'
      || (ageBand === '2-to-under-5-years' && hasVomiting));

  if (applicable) {
    if (input.biliousVomiting === 'yes') dangerSignIds.push('bilious-vomiting');
    if (input.hematemesis === 'yes') dangerSignIds.push('hematemesis');
    if (input.guardingOrRigidity === 'yes' || input.reboundOrPercussionTenderness === 'yes') {
      dangerSignIds.push('peritonism');
    }
    if (input.palpableMassOrIncarceratedHernia === 'yes') {
      dangerSignIds.push('abdominal-mass-or-incarcerated-hernia');
    }
    if (input.scrotalOrInguinalPainSwelling === 'yes') dangerSignIds.push('acute-scrotal-pain-or-swelling');
    if (input.suddenPelvicPainOrPregnancyConcern === 'yes') {
      dangerSignIds.push('acute-pelvic-pain-or-pregnancy-concern');
    }
    if (
      input.painSeverity === 'severe'
      && (input.painOnset === 'sudden' || progressivePain || input.painWithMovementOrUnableToWalkHop === 'yes')
    ) {
      dangerSignIds.push('severe-sudden-or-progressive-pain');
    }
    if (obstructionPattern) {
      dangerSignIds.push('bowel-obstruction-pattern');
      patternIds.push('possible-obstruction');
    }
    if (intussusceptionPattern) {
      dangerSignIds.push('intussusception-pattern');
      patternIds.push('possible-intussusception');
    }
    if (ageBand === 'under-3-months' && input.projectileVomiting === 'yes') {
      dangerSignIds.push('projectile-vomiting-young-infant');
    }
    if (
      input.morningHeadacheOrMorningVomiting === 'yes'
      || input.abnormalNeurologyMeningismOrBulgingFontanelle === 'yes'
    ) {
      dangerSignIds.push('neurological-red-flags');
    }
    if (input.polyuriaPolydipsiaWeightLossOrDeepBreathing === 'yes') dangerSignIds.push('dka-pattern');
    if (input.suspectedPoisoningOrIngestion === 'yes') dangerSignIds.push('suspected-poisoning');

    if (ageBand === 'unknown') prioritySignIds.push('age-required');
    const coreAnswers = [
      input.biliousVomiting,
      input.hematemesis,
      input.guardingOrRigidity,
      input.reboundOrPercussionTenderness,
      input.abdominalDistension,
      input.palpableMassOrIncarceratedHernia,
      input.scrotalOrInguinalPainSwelling,
    ];
    if (coreAnswers.some(answer => answer === 'unknown')) prioritySignIds.push('incomplete-core-surgical-screen');
    if (appendicitisPattern) {
      prioritySignIds.push('appendicitis-compatible-pattern');
      patternIds.push('possible-appendicitis');
    }
    if (isValidCount(input.vomitingEpisodesLast24Hours) && input.vomitingEpisodesLast24Hours >= 3) {
      prioritySignIds.push('recurrent-vomiting');
    }
    if (localizedPain && input.painSeverity !== 'none' && !appendicitisPattern) {
      prioritySignIds.push('localized-abdominal-pain');
    }
    if (ageBand === 'under-3-months' && (hasVomiting || input.painSeverity !== 'none')) {
      prioritySignIds.push('young-infant-nonspecific-symptoms');
    }
    if (input.urinarySymptoms === 'yes') prioritySignIds.push('urinary-symptoms');
  }

  const nextQuestionIds: PediatricAbdominalQuestionId[] = [];
  if (applicable) {
    if (ageBand === 'unknown') nextQuestionIds.push('age');
    if (!isValidCount(input.painDurationHours, 720)) nextQuestionIds.push('painDurationHours');
    if (!isValidCount(input.vomitingEpisodesLast24Hours)) nextQuestionIds.push('vomitingEpisodesLast24Hours');
    if (input.painOnset === 'unknown') nextQuestionIds.push('painOnset');
    if (input.painPattern === 'unknown') nextQuestionIds.push('painPattern');
    if (input.painLocation === 'unknown') nextQuestionIds.push('painLocation');
    if (input.painSeverity === 'unknown') nextQuestionIds.push('painSeverity');
    const answerKeys: Array<keyof PediatricAbdominalSafetyInput> = [
      'migrationToRightLowerQuadrant',
      'painWithMovementOrUnableToWalkHop',
      'feverPresent',
      'guardingOrRigidity',
      'reboundOrPercussionTenderness',
      'abdominalDistension',
      'palpableMassOrIncarceratedHernia',
      'biliousVomiting',
      'hematemesis',
      'projectileVomiting',
      'vomitingEverything',
      'visibleBloodInStool',
      'drawsLegsUp',
      'pallorOrEpisodicLethargy',
      'scrotalOrInguinalPainSwelling',
      'suddenPelvicPainOrPregnancyConcern',
      'morningHeadacheOrMorningVomiting',
      'abnormalNeurologyMeningismOrBulgingFontanelle',
      'polyuriaPolydipsiaWeightLossOrDeepBreathing',
      'suspectedPoisoningOrIngestion',
      'previousAbdominalSurgeryOrObstruction',
      'urinarySymptoms',
    ];
    answerKeys.forEach(key => {
      if (input[key] === 'unknown') nextQuestionIds.push(key as PediatricAbdominalQuestionId);
    });
  }

  const heuristicSymptoms: string[] = [];
  if (applicable && (input.painSeverity !== 'none' && input.painSeverity !== 'unknown')) heuristicSymptoms.push('Dor abdominal');
  if (applicable && hasVomiting) heuristicSymptoms.push('Vômito');
  if (applicable && input.hematemesis === 'yes') heuristicSymptoms.push('Hematêmese');
  if (applicable && input.abdominalDistension === 'yes') heuristicSymptoms.push('Distensão abdominal');

  return {
    applicable,
    ageBand,
    completedAgeDays,
    dangerSignIds,
    prioritySignIds,
    patternIds,
    priority: dangerSignIds.length > 0
      ? 'immediate-referral'
      : prioritySignIds.length > 0
        ? 'same-day-assessment'
        : 'routine',
    nextQuestionIds,
    heuristicSymptoms,
    kernelSymptoms: [],
    guardrails: {
      abdominalSignsAddedToKernel: false,
      appendicitisScoreCalculated: false,
      intussusceptionDiagnosed: false,
      imagingAutomaticallyOrdered: false,
      antiemeticAuthorized: false,
      antibioticAuthorized: false,
      prescriptionAuthorized: false,
      clinicalActivationAuthorized: false,
    },
  };
}
