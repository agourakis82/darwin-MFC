import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { adaptClinicalInput } from '../lib/clinical-kernel/adapter';
import type { ClinicalEvidenceBundle } from '../lib/clinical-kernel/types';
import { patientAgeInDays } from '../lib/utils/differential-diagnosis';
import {
  EMPTY_YOUNG_INFANT_FEVER_SAFETY_INPUT,
  evaluateYoungInfantFeverSafety,
  isYoungInfantFeverConcernSymptom,
  isYoungInfantFeverSafetyRelevant,
  type YoungInfantFeverSafetyInput,
} from '../lib/clinical-safety/young-infant-fever';

interface FixtureExpectation {
  applicable: boolean;
  ageBand: string;
  temperatureStatus: string;
  aidpiTemperatureDangerMet: boolean;
  internationalFeverThresholdMet: boolean;
  aapAgeScope: boolean;
  dangerSignIds: string[];
  prioritySignIds: string[];
  priority: string;
  heuristicSymptoms: string[];
  kernelSymptoms: string[];
  requiredNextQuestionIds?: string[];
}

interface FeverSafetyFixtures {
  schemaVersion: string;
  status: string;
  sourceBoundary: Record<string, boolean>;
  references: Array<{ id: string; url: string }>;
  defaults: YoungInfantFeverSafetyInput;
  fixtures: Array<{
    id: string;
    useUnknownDefaults?: boolean;
    input: Partial<YoungInfantFeverSafetyInput>;
    expected: FixtureExpectation;
  }>;
}

const root = process.cwd();
const fixturePath = resolve(root, 'clinical/epistemic-firewall/fixtures/young-infant-fever-safety.v1.json');
const evidencePath = resolve(root, 'clinical/sounio/evidence-bundle.json');
const fixtureBundle = JSON.parse(readFileSync(fixturePath, 'utf8')) as FeverSafetyFixtures;
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as ClinicalEvidenceBundle;

assert.equal(fixtureBundle.schemaVersion, 'darwin.sounio.young-infant-fever-safety-fixtures.v1');
assert.equal(fixtureBundle.status, 'synthetic-safety-only');
assert.equal(fixtureBundle.fixtures.length, 14);
assert.equal(fixtureBundle.references.length, 5);
assert.deepEqual(fixtureBundle.sourceBoundary, {
  homeFeverAddedToKernel: false,
  nonFrozenSafetySignalsAddedToKernel: false,
  sepsisRiskScoreCalculated: false,
  posteriorAdjustedInTypeScript: false,
  antibioticRecommendationAuthorized: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
});

function inputFor(fixture: FeverSafetyFixtures['fixtures'][number]): YoungInfantFeverSafetyInput {
  const defaults: YoungInfantFeverSafetyInput = fixture.useUnknownDefaults
    ? {
        ...EMPTY_YOUNG_INFANT_FEVER_SAFETY_INPUT,
        feverConcernPresent: true,
      }
    : fixtureBundle.defaults;
  return { ...defaults, ...fixture.input };
}

for (const fixture of fixtureBundle.fixtures) {
  const result = evaluateYoungInfantFeverSafety(inputFor(fixture));
  assert.equal(result.applicable, fixture.expected.applicable, fixture.id);
  assert.equal(result.ageBand, fixture.expected.ageBand, fixture.id);
  assert.equal(result.temperatureStatus, fixture.expected.temperatureStatus, fixture.id);
  assert.equal(result.aidpiTemperatureDangerMet, fixture.expected.aidpiTemperatureDangerMet, fixture.id);
  assert.equal(result.internationalFeverThresholdMet, fixture.expected.internationalFeverThresholdMet, fixture.id);
  assert.equal(result.aapAgeScope, fixture.expected.aapAgeScope, fixture.id);
  assert.deepEqual(result.dangerSignIds, fixture.expected.dangerSignIds, fixture.id);
  assert.deepEqual(result.prioritySignIds, fixture.expected.prioritySignIds, fixture.id);
  assert.equal(result.priority, fixture.expected.priority, fixture.id);
  assert.deepEqual(result.heuristicSymptoms, fixture.expected.heuristicSymptoms, fixture.id);
  assert.deepEqual(result.kernelSymptoms, fixture.expected.kernelSymptoms, fixture.id);
  for (const questionId of fixture.expected.requiredNextQuestionIds ?? []) {
    assert.ok(result.nextQuestionIds.includes(questionId as never), `${fixture.id}:${questionId}`);
  }
  assert.deepEqual(result.guardrails, {
    homeFeverAddedToKernel: false,
    nonFrozenSafetySignalsAddedToKernel: false,
    sepsisRiskScoreCalculated: false,
    posteriorAdjustedInTypeScript: false,
    antibioticRecommendationAuthorized: false,
    prescriptionAuthorized: false,
    clinicalActivationAuthorized: false,
  }, fixture.id);
}

function fixture(id: string) {
  const value = fixtureBundle.fixtures.find(candidate => candidate.id === id);
  assert.ok(value, id);
  return inputFor(value);
}

function adaptedFeatures(input: YoungInfantFeverSafetyInput): Set<string> {
  const assessment = evaluateYoungInfantFeverSafety(input);
  const reportedSymptoms = ['Febre'].filter(symptom => !isYoungInfantFeverConcernSymptom(symptom));
  return adaptClinicalInput({
    ageYears: input.ageDays === undefined ? undefined : input.ageDays / 365.2425,
    symptoms: [...reportedSymptoms, ...assessment.kernelSymptoms],
  }, evidence).presentFeatureIds;
}

function changedFeatures(
  input: YoungInfantFeverSafetyInput,
  comparison: YoungInfantFeverSafetyInput,
): string[] {
  const present = adaptedFeatures(input);
  const baseline = adaptedFeatures(comparison);
  return evidence.features
    .map(feature => feature.id)
    .filter(id => present.has(id) !== baseline.has(id));
}

const measuredFever = fixture('day-60-exact-38');
assert.deepEqual(changedFeatures(measuredFever, { ...measuredFever, temperatureC: 37.9 }), ['fever']);

const homeFever = fixture('documented-home-fever-does-not-enter-kernel');
assert.deepEqual(changedFeatures(homeFever, { ...homeFever, documentedHomeFeverAtOrAbove38: 'no' }), []);

const aidpiFever = fixture('neonate-day-7-axillary-37-5');
assert.deepEqual(changedFeatures(aidpiFever, { ...aidpiFever, temperatureC: 37.4 }), []);

const systemicSafetySigns = fixture('ill-appearance-and-poor-perfusion-stay-safety-only');
assert.deepEqual(changedFeatures(systemicSafetySigns, {
  ...systemicSafetySigns,
  illAppearance: 'no',
  poorPerfusion: 'no',
}), []);

const neurologicSafetySigns = fixture('neurologic-and-skin-danger-signs-stay-safety-only');
assert.deepEqual(changedFeatures(neurologicSafetySigns, {
  ...neurologicSafetySigns,
  convulsions: 'no',
  bulgingFontanelle: 'no',
  nonBlanchingRash: 'no',
}), []);

assert.equal(isYoungInfantFeverSafetyRelevant(['Febre'], undefined), true);
assert.equal(isYoungInfantFeverSafetyRelevant(['Febre'], 89), true);
assert.equal(isYoungInfantFeverSafetyRelevant(['Febre'], 90), false);
assert.equal(isYoungInfantFeverSafetyRelevant(['Tosse'], 30), false);
assert.equal(isYoungInfantFeverConcernSymptom('Temperatura baixa'), true);
assert.equal(patientAgeInDays({ ageValue: 59, ageUnit: 'dias' }), 59);
assert.equal(patientAgeInDays({ ageValue: 60, ageUnit: 'dias' }), 60);
assert.equal(patientAgeInDays({ ageValue: 89, ageUnit: 'dias' }), 89);
assert.equal(patientAgeInDays({ ageValue: 90, ageUnit: 'dias' }), 90);

console.log('YOUNG_INFANT_FEVER_SAFETY_FIXTURES_VALID');
console.log(JSON.stringify({
  schemaVersion: 'darwin.sounio.young-infant-fever-safety-fixture-test.v1',
  fixturesPassed: fixtureBundle.fixtures.length,
  aidpiAxillaryThresholdsPassed: true,
  internationalUnderThreeMonthThresholdPassed: true,
  aapAgeBoundaryPassed: true,
  homeFeverDoesNotEnterKernel: true,
  rawFeverTextSanitizedBeforeKernel: true,
  onlyMeasuredFeverChangesFrozenVector: true,
  systemicDangerSignsRemainSafetyOnly: true,
  unknownNeverCoercedToAbsent: true,
  sepsisRiskScoreCalculated: false,
  posteriorAdjustedInTypeScript: false,
  antibioticRecommendationAuthorized: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
}, null, 2));
