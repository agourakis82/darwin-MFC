import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { adaptClinicalInput } from '../lib/clinical-kernel/adapter';
import type { ClinicalEvidenceBundle } from '../lib/clinical-kernel/types';
import {
  evaluatePediatricRespiratorySafety,
  isPediatricRespiratorySafetyRelevant,
  type PediatricRespiratorySafetyInput,
} from '../lib/clinical-safety/pediatric-respiratory';

interface FixtureExpectation {
  ageBand: string;
  fastBreathingThreshold: number | null;
  tachypnea: string;
  hypoxemia: string;
  repeatCountRequired: boolean;
  dangerSignIds: string[];
  prioritySignIds: string[];
  priority: string;
  kernelSymptoms: string[];
  requiredNextQuestionIds?: string[];
}

interface PediatricRespiratorySafetyFixtures {
  schemaVersion: string;
  status: string;
  sourceBoundary: Record<string, boolean>;
  references: Array<{ id: string; url: string }>;
  fixtures: Array<{
    id: string;
    input: PediatricRespiratorySafetyInput;
    expected: FixtureExpectation;
  }>;
}

const root = process.cwd();
const fixturePath = resolve(root, 'clinical/epistemic-firewall/fixtures/pediatric-respiratory-safety.v1.json');
const evidencePath = resolve(root, 'clinical/sounio/evidence-bundle.json');
const fixtureBundle = JSON.parse(readFileSync(fixturePath, 'utf8')) as PediatricRespiratorySafetyFixtures;
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as ClinicalEvidenceBundle;

assert.equal(fixtureBundle.schemaVersion, 'darwin.sounio.pediatric-respiratory-safety-fixtures.v1');
assert.equal(fixtureBundle.status, 'synthetic-safety-only');
assert.equal(fixtureBundle.fixtures.length, 14);
assert.equal(fixtureBundle.references.length, 4);
assert.deepEqual(fixtureBundle.sourceBoundary, {
  nonFrozenSafetySignalsAddedToKernel: false,
  posteriorAdjustedInTypeScript: false,
  antibioticRecommendationAuthorized: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
});

for (const fixture of fixtureBundle.fixtures) {
  const result = evaluatePediatricRespiratorySafety(fixture.input);
  assert.equal(result.ageBand, fixture.expected.ageBand, fixture.id);
  assert.equal(result.fastBreathingThreshold, fixture.expected.fastBreathingThreshold, fixture.id);
  assert.equal(result.tachypnea, fixture.expected.tachypnea, fixture.id);
  assert.equal(result.hypoxemia, fixture.expected.hypoxemia, fixture.id);
  assert.equal(result.repeatCountRequired, fixture.expected.repeatCountRequired, fixture.id);
  assert.deepEqual(result.dangerSignIds, fixture.expected.dangerSignIds, fixture.id);
  assert.deepEqual(result.prioritySignIds, fixture.expected.prioritySignIds, fixture.id);
  assert.equal(result.priority, fixture.expected.priority, fixture.id);
  assert.deepEqual(result.kernelSymptoms, fixture.expected.kernelSymptoms, fixture.id);
  for (const questionId of fixture.expected.requiredNextQuestionIds ?? []) {
    assert.ok(result.nextQuestionIds.includes(questionId as never), `${fixture.id}:${questionId}`);
  }
  assert.deepEqual(result.guardrails, {
    nonFrozenSafetySignalsAddedToKernel: false,
    posteriorAdjustedInTypeScript: false,
    antibioticRecommendationAuthorized: false,
    prescriptionAuthorized: false,
    clinicalActivationAuthorized: false,
  }, fixture.id);
}

function fixture(id: string) {
  const value = fixtureBundle.fixtures.find(candidate => candidate.id === id);
  assert.ok(value, id);
  return value;
}

function adaptedFeatures(input: PediatricRespiratorySafetyInput): Set<string> {
  const assessment = evaluatePediatricRespiratorySafety(input);
  const adapted = adaptClinicalInput({
    ageYears: input.ageDays === undefined ? undefined : input.ageDays / 365.2425,
    symptoms: ['Tosse', ...assessment.kernelSymptoms],
  }, evidence);
  return adapted.presentFeatureIds;
}

function changedFeatures(
  input: PediatricRespiratorySafetyInput,
  comparison: PediatricRespiratorySafetyInput,
): string[] {
  const present = adaptedFeatures(input);
  const baseline = adaptedFeatures(comparison);
  return evidence.features
    .map(feature => feature.id)
    .filter(id => present.has(id) !== baseline.has(id));
}

const confirmedYoungInfant = fixture('young-infant-repeat-confirms-60');
const youngInfantBaseline: PediatricRespiratorySafetyInput = {
  ...confirmedYoungInfant.input,
  respiratoryRatePerMinute: 59,
  repeatRespiratoryRatePerMinute: undefined,
};
assert.deepEqual(changedFeatures(confirmedYoungInfant.input, youngInfantBaseline), ['tachypnea']);

const hypoxemia = fixture('room-air-spo2-91-is-danger');
assert.deepEqual(changedFeatures(hypoxemia.input, { ...hypoxemia.input, spo2Percent: 92 }), ['hypoxemia']);

const chestIndrawing = fixture('chest-indrawing-maps-only-to-dyspnea');
assert.deepEqual(changedFeatures(chestIndrawing.input, { ...chestIndrawing.input, chestIndrawing: 'no' }), ['dyspnea']);

const stridor = fixture('stridor-at-rest-is-danger-and-frozen-feature');
assert.deepEqual(changedFeatures(stridor.input, { ...stridor.input, stridorAtRest: 'no' }), ['stridor']);

const safetyOnly = fixture('general-danger-signs-stay-safety-only');
assert.deepEqual(changedFeatures(safetyOnly.input, {
  ...safetyOnly.input,
  unableToDrinkOrBreastfeed: 'no',
  vomitingEverything: 'no',
  reducedOralIntakeOrDehydration: 'no',
  lethargyOrUnconsciousness: 'no',
  convulsions: 'no',
}), []);

const apneaOnly = fixture('bronchiolitis-young-infant-apnea-without-tachypnea');
assert.deepEqual(changedFeatures(apneaOnly.input, { ...apneaOnly.input, apnea: 'no' }), []);

const postOxygen = fixture('post-oxygen-spo2-does-not-enter-kernel');
assert.ok(!adaptedFeatures(postOxygen.input).has('hypoxemia'));

const twoMonth = fixture('two-month-threshold-is-50');
const agitatedMeasurement = evaluatePediatricRespiratorySafety({
  ...twoMonth.input,
  respiratoryRateMeasurementState: 'not-calm',
});
assert.equal(agitatedMeasurement.tachypnea, 'unknown');
assert.ok(!agitatedMeasurement.kernelSymptoms.includes('Frequência respiratória elevada'));

assert.equal(evaluatePediatricRespiratorySafety({ ...hypoxemia.input, spo2Percent: 92 }).hypoxemia, 'absent');
assert.equal(evaluatePediatricRespiratorySafety({ ...twoMonth.input, ageDays: 59 }).fastBreathingThreshold, 60);
assert.equal(evaluatePediatricRespiratorySafety({ ...twoMonth.input, ageDays: 60 }).fastBreathingThreshold, 50);
assert.equal(evaluatePediatricRespiratorySafety({ ...twoMonth.input, ageDays: 364 }).fastBreathingThreshold, 50);
assert.equal(evaluatePediatricRespiratorySafety({ ...twoMonth.input, ageDays: 365 }).fastBreathingThreshold, 40);

assert.equal(isPediatricRespiratorySafetyRelevant(['Tosse'], undefined), true);
assert.equal(isPediatricRespiratorySafetyRelevant(['Tosse'], 18 * 365.2425), false);
assert.equal(isPediatricRespiratorySafetyRelevant(['Cefaleia'], 100), false);

console.log('PEDIATRIC_RESPIRATORY_SAFETY_FIXTURES_VALID');
console.log(JSON.stringify({
  schemaVersion: 'darwin.sounio.pediatric-respiratory-safety-fixture-test.v1',
  fixturesPassed: fixtureBundle.fixtures.length,
  ageSpecificFastBreathingRulesPassed: true,
  youngInfantRepeatCountPassed: true,
  roomAirHypoxemiaBoundaryPassed: true,
  bronchiolitisApneaWithoutTachypneaPassed: true,
  generalDangerSignsRemainIndependentPassed: true,
  frozenFeatureIsolationPassed: true,
  unknownNeverCoercedToAbsent: true,
  nonFrozenSafetySignalsAddedToKernel: false,
  posteriorAdjustedInTypeScript: false,
  antibioticRecommendationAuthorized: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
}, null, 2));
