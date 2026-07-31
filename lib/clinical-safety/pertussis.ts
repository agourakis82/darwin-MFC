export type ClinicalAnswer = 'yes' | 'no' | 'unknown';
export type PertussisVaccinationStatus = 'up-to-date' | 'incomplete' | 'unknown';

export interface PertussisSafetyInput {
  ageDays?: number;
  coughPresent: boolean;
  coughDurationDays?: number;
  paroxysmalCough: ClinicalAnswer;
  inspiratoryWhoop: ClinicalAnswer;
  postTussiveVomiting: ClinicalAnswer;
  apnea: ClinicalAnswer;
  cyanosis: ClinicalAnswer;
  choking: ClinicalAnswer;
  closeContact: ClinicalAnswer;
  vaccinationStatus: PertussisVaccinationStatus;
}

export type PertussisSafetyQuestionId =
  | 'age'
  | 'coughDurationDays'
  | 'apnea'
  | 'cyanosis'
  | 'choking'
  | 'paroxysmalCough'
  | 'inspiratoryWhoop'
  | 'postTussiveVomiting'
  | 'closeContact'
  | 'vaccinationStatus';

export interface PertussisSafetyAssessment {
  applicable: boolean;
  surveillanceDefinitionMet: boolean;
  surveillanceRoute: 'age-duration-features' | 'confirmed-close-contact' | 'not-met';
  durationThresholdDays: 10 | 14 | null;
  dangerSignIds: Array<'apnea' | 'cyanosis'>;
  highRiskIds: Array<'age-under-6-months'>;
  priority: 'routine' | 'priority-assessment' | 'immediate-assessment';
  nextQuestionIds: PertussisSafetyQuestionId[];
  heuristicSymptoms: string[];
  kernelSymptoms: string[];
  guardrails: {
    sinanCountsUsedAsPrior: false;
    vaccinationUsedAsExclusion: false;
    posteriorAdjustedInTypeScript: false;
    prescriptionAuthorized: false;
    clinicalActivationAuthorized: false;
  };
}

export const PERTUSSIS_SAFETY_REFERENCES = [
  {
    id: 'ms-nt-70-2024',
    label: 'MS · Nota Técnica 70/2024',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/coqueluche/nota-tecnica-e-informativa/nota-tecnica-conjunta-no-70-2024-dpni-svsa-ms',
  },
  {
    id: 'ms-nt-165-2025',
    label: 'MS · Nota Técnica 165/2025',
    url: 'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2025/nota-tecnica-conjunta-no-165-2025-dpni-svsa-ms.pdf/view',
  },
  {
    id: 'cdc-pertussis-clinical-features-2025',
    label: 'CDC · Clinical features',
    url: 'https://www.cdc.gov/pertussis/signs-symptoms/index.html',
  },
] as const;

export const EMPTY_PERTUSSIS_SAFETY_INPUT: Omit<PertussisSafetyInput, 'ageDays' | 'coughPresent'> = {
  coughDurationDays: undefined,
  paroxysmalCough: 'unknown',
  inspiratoryWhoop: 'unknown',
  postTussiveVomiting: 'unknown',
  apnea: 'unknown',
  cyanosis: 'unknown',
  choking: 'unknown',
  closeContact: 'unknown',
  vaccinationStatus: 'unknown',
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

export function isPertussisSafetyRelevant(symptoms: string[]): boolean {
  return symptoms.some(symptom => {
    const normalized = normalize(symptom);
    return normalized.includes('tosse')
      || normalized.includes('coqueluche')
      || normalized.includes('pertussis')
      || normalized.includes('guincho inspiratorio');
  });
}

function knownYes(value: ClinicalAnswer): boolean {
  return value === 'yes';
}

export function evaluatePertussisSafety(input: PertussisSafetyInput): PertussisSafetyAssessment {
  const ageKnown = input.ageDays !== undefined && Number.isFinite(input.ageDays) && input.ageDays >= 0;
  const completedAgeDays = ageKnown ? Math.round(input.ageDays!) : undefined;
  const ageUnderSixMonths = completedAgeDays !== undefined && completedAgeDays < 183;
  const durationThresholdDays = completedAgeDays === undefined ? null : ageUnderSixMonths ? 10 : 14;
  const durationKnown = input.coughDurationDays !== undefined
    && Number.isFinite(input.coughDurationDays)
    && input.coughDurationDays >= 0;
  const meetsDuration = durationKnown
    && durationThresholdDays !== null
    && input.coughDurationDays! >= durationThresholdDays;

  const commonDefiningFeature = knownYes(input.paroxysmalCough)
    || knownYes(input.inspiratoryWhoop)
    || knownYes(input.postTussiveVomiting);
  const infantDefiningFeature = commonDefiningFeature
    || knownYes(input.apnea)
    || knownYes(input.cyanosis)
    || knownYes(input.choking);
  const ageDurationFeatureRoute = input.coughPresent
    && meetsDuration
    && (ageUnderSixMonths ? infantDefiningFeature : commonDefiningFeature);
  const confirmedContactRoute = input.coughPresent && knownYes(input.closeContact);

  const dangerSignIds: PertussisSafetyAssessment['dangerSignIds'] = [];
  if (knownYes(input.apnea)) dangerSignIds.push('apnea');
  if (knownYes(input.cyanosis)) dangerSignIds.push('cyanosis');

  const highRiskIds: PertussisSafetyAssessment['highRiskIds'] = ageUnderSixMonths && input.coughPresent
    ? ['age-under-6-months']
    : [];

  const nextQuestionIds: PertussisSafetyQuestionId[] = [];
  if (!ageKnown) nextQuestionIds.push('age');
  if (input.apnea === 'unknown') nextQuestionIds.push('apnea');
  if (input.cyanosis === 'unknown') nextQuestionIds.push('cyanosis');
  if (input.choking === 'unknown') nextQuestionIds.push('choking');
  if (!durationKnown) nextQuestionIds.push('coughDurationDays');
  if (input.paroxysmalCough === 'unknown') nextQuestionIds.push('paroxysmalCough');
  if (input.inspiratoryWhoop === 'unknown') nextQuestionIds.push('inspiratoryWhoop');
  if (input.postTussiveVomiting === 'unknown') nextQuestionIds.push('postTussiveVomiting');
  if (input.closeContact === 'unknown') nextQuestionIds.push('closeContact');
  if (input.vaccinationStatus === 'unknown') nextQuestionIds.push('vaccinationStatus');

  const heuristicSymptoms: string[] = [];
  if (knownYes(input.paroxysmalCough)) heuristicSymptoms.push('Paroxismos de tosse');
  if (knownYes(input.inspiratoryWhoop)) heuristicSymptoms.push('Guincho inspiratório');
  if (knownYes(input.postTussiveVomiting)) heuristicSymptoms.push('Vômito pós-tosse');
  if (knownYes(input.apnea)) heuristicSymptoms.push('Apneia');
  if (knownYes(input.cyanosis)) heuristicSymptoms.push('Cianose');
  if (knownYes(input.choking)) heuristicSymptoms.push('Engasgo');

  const kernelSymptoms: string[] = [];
  if (commonDefiningFeature) kernelSymptoms.push('Tosse paroxística');
  // The frozen Sounio feature is strictly greater than 10 completed days.
  if (durationKnown && input.coughDurationDays! > 10) kernelSymptoms.push('Mais de 10 dias');

  return {
    applicable: input.coughPresent,
    surveillanceDefinitionMet: ageDurationFeatureRoute || confirmedContactRoute,
    surveillanceRoute: confirmedContactRoute
      ? 'confirmed-close-contact'
      : ageDurationFeatureRoute
        ? 'age-duration-features'
        : 'not-met',
    durationThresholdDays,
    dangerSignIds,
    highRiskIds,
    priority: dangerSignIds.length > 0
      ? 'immediate-assessment'
      : highRiskIds.length > 0
        ? 'priority-assessment'
        : 'routine',
    nextQuestionIds,
    heuristicSymptoms,
    kernelSymptoms,
    guardrails: {
      sinanCountsUsedAsPrior: false,
      vaccinationUsedAsExclusion: false,
      posteriorAdjustedInTypeScript: false,
      prescriptionAuthorized: false,
      clinicalActivationAuthorized: false,
    },
  };
}
