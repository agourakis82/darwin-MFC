import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { adaptClinicalInput } from '../lib/clinical-kernel/adapter';
import type { ClinicalEvidenceBundle } from '../lib/clinical-kernel/types';
import {
  EMPTY_PEDIATRIC_DIARRHEA_SAFETY_INPUT,
  evaluatePediatricDiarrheaSafety,
  isPediatricDiarrheaSafetyRelevant,
  type PediatricDiarrheaSafetyInput,
} from '../lib/clinical-safety/pediatric-diarrhea';

interface FixtureExpectation {
  applicable: boolean;
  ageBand: string;
  classification: string;
  youngInfantSignCount: number;
  dangerSignIds: string[];
  prioritySignIds: string[];
  priority: string;
  heuristicSymptoms: string[];
  kernelSymptoms: string[];
  requiredNextQuestionIds?: string[];
}

interface PediatricDiarrheaSafetyFixtures {
  schemaVersion: string;
  status: string;
  sourceBoundary: Record<string, boolean>;
  references: Array<{ id: string; url: string }>;
  defaults: PediatricDiarrheaSafetyInput;
  fixtures: Array<{
    id: string;
    useUnknownDefaults?: boolean;
    input: Partial<PediatricDiarrheaSafetyInput>;
    expected: FixtureExpectation;
  }>;
}

const root = process.cwd();
const fixturePath = resolve(root, 'clinical/epistemic-firewall/fixtures/pediatric-diarrhea-safety.v1.json');
const evidencePath = resolve(root, 'clinical/sounio/evidence-bundle.json');
const fixtureBundle = JSON.parse(readFileSync(fixturePath, 'utf8')) as PediatricDiarrheaSafetyFixtures;
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as ClinicalEvidenceBundle;

assert.equal(fixtureBundle.schemaVersion, 'darwin.sounio.pediatric-diarrhea-safety-fixtures.v1');
assert.equal(fixtureBundle.status, 'synthetic-safety-only');
assert.equal(fixtureBundle.fixtures.length, 16);
assert.equal(fixtureBundle.references.length, 5);
assert.deepEqual(fixtureBundle.sourceBoundary, {
  dehydrationAddedToKernel: false,
  shockScoreCalculated: false,
  fluidPlanAuthorized: false,
  zincDoseAuthorized: false,
  antibioticRecommendationAuthorized: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
});

function inputFor(fixture: PediatricDiarrheaSafetyFixtures['fixtures'][number]): PediatricDiarrheaSafetyInput {
  const defaults: PediatricDiarrheaSafetyInput = fixture.useUnknownDefaults
    ? {
        ...EMPTY_PEDIATRIC_DIARRHEA_SAFETY_INPUT,
        diarrheaPresent: true,
      }
    : fixtureBundle.defaults;
  return { ...defaults, ...fixture.input };
}

for (const fixture of fixtureBundle.fixtures) {
  const result = evaluatePediatricDiarrheaSafety(inputFor(fixture));
  assert.equal(result.applicable, fixture.expected.applicable, fixture.id);
  assert.equal(result.ageBand, fixture.expected.ageBand, fixture.id);
  assert.equal(result.classification, fixture.expected.classification, fixture.id);
  assert.equal(result.youngInfantSignCount, fixture.expected.youngInfantSignCount, fixture.id);
  assert.deepEqual(result.dangerSignIds, fixture.expected.dangerSignIds, fixture.id);
  assert.deepEqual(result.prioritySignIds, fixture.expected.prioritySignIds, fixture.id);
  assert.equal(result.priority, fixture.expected.priority, fixture.id);
  assert.deepEqual(result.heuristicSymptoms, fixture.expected.heuristicSymptoms, fixture.id);
  assert.deepEqual(result.kernelSymptoms, fixture.expected.kernelSymptoms, fixture.id);
  for (const questionId of fixture.expected.requiredNextQuestionIds ?? []) {
    assert.ok(result.nextQuestionIds.includes(questionId as never), `${fixture.id}:${questionId}`);
  }
  assert.deepEqual(result.guardrails, {
    dehydrationAddedToKernel: false,
    shockScoreCalculated: false,
    fluidPlanAuthorized: false,
    zincDoseAuthorized: false,
    antibioticRecommendationAuthorized: false,
    prescriptionAuthorized: false,
    clinicalActivationAuthorized: false,
  }, fixture.id);
}

function fixture(id: string): PediatricDiarrheaSafetyInput {
  const value = fixtureBundle.fixtures.find(candidate => candidate.id === id);
  assert.ok(value, id);
  return inputFor(value);
}

function adaptedFeatures(input: PediatricDiarrheaSafetyInput): Set<string> {
  const assessment = evaluatePediatricDiarrheaSafety(input);
  return adaptClinicalInput({
    ageYears: input.ageDays === undefined ? undefined : input.ageDays / 365.2425,
    symptoms: ['Diarreia', ...assessment.kernelSymptoms],
  }, evidence).presentFeatureIds;
}

function changedFeatures(
  input: PediatricDiarrheaSafetyInput,
  comparison: PediatricDiarrheaSafetyInput,
): string[] {
  const present = adaptedFeatures(input);
  const baseline = adaptedFeatures(comparison);
  return evidence.features
    .map(feature => feature.id)
    .filter(id => present.has(id) !== baseline.has(id));
}

const severeDehydration = fixture('day-60-two-severe-signs-classify-severe-dehydration');
assert.deepEqual(changedFeatures(severeDehydration, {
  ...severeDehydration,
  generalCondition: 'normal',
  sunkenEyes: 'no',
}), []);

const shock = fixture('shock-signs-are-independent-and-urgent');
assert.deepEqual(changedFeatures(shock, {
  ...shock,
  paleOrMottledSkin: 'no',
  coldExtremities: 'no',
  weakPeripheralPulse: 'no',
  capillaryRefillOver2Seconds: 'no',
  hypotension: 'no',
}), []);

const blood = fixture('young-infant-blood-in-stool-is-urgent');
assert.deepEqual(changedFeatures(blood, { ...blood, bloodInStool: 'no' }), []);

const risk = fixture('risk-and-alternative-diagnosis-signs-are-same-day');
assert.deepEqual(changedFeatures(risk, {
  ...risk,
  decreasedUrineOutput: 'no',
  stoolsLast24Hours: 3,
  vomitingEpisodesLast24Hours: 0,
  stoppedBreastfeeding: 'no',
  lowBirthWeightOrMalnutrition: 'no',
  severeLocalizedAbdominalPain: 'no',
  abdominalDistensionOrRebound: 'no',
}), []);

assert.ok(!evidence.features.some(feature => (
  feature.id.includes('diarr') || feature.id.includes('dehydr') || feature.id.includes('shock')
)));
assert.equal(isPediatricDiarrheaSafetyRelevant(['Diarreia'], undefined), true);
assert.equal(isPediatricDiarrheaSafetyRelevant(['Fezes aquosas'], 120), true);
assert.equal(isPediatricDiarrheaSafetyRelevant(['Vômito'], 120), false);
assert.equal(isPediatricDiarrheaSafetyRelevant(['Diarreia'], (5 * 365.2425) - 0.01), true);
assert.equal(isPediatricDiarrheaSafetyRelevant(['Diarreia'], 5 * 365.2425), false);

console.log('PEDIATRIC_DIARRHEA_SAFETY_FIXTURES_VALID');
console.log(JSON.stringify({
  schemaVersion: 'darwin.sounio.pediatric-diarrhea-safety-fixture-test.v1',
  fixturesPassed: fixtureBundle.fixtures.length,
  youngInfantTwoSignMatrixPassed: true,
  olderChildSevereAndSomeMatricesPassed: true,
  ageSpecificPersistenceThresholdsPassed: true,
  bloodInStoolAgeBoundaryPassed: true,
  shockAndAlternativeDiagnosisSignsPassed: true,
  exactFiveYearBoundaryPassed: true,
  unknownNeverCoercedToAbsent: true,
  frozenFeatureIsolationPassed: true,
  dehydrationAddedToKernel: false,
  shockScoreCalculated: false,
  fluidPlanAuthorized: false,
  zincDoseAuthorized: false,
  antibioticRecommendationAuthorized: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
}, null, 2));
