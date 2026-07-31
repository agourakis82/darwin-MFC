import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { adaptClinicalInput } from '../lib/clinical-kernel/adapter';
import type { ClinicalEvidenceBundle } from '../lib/clinical-kernel/types';
import {
  EMPTY_PEDIATRIC_ABDOMINAL_SAFETY_INPUT,
  evaluatePediatricAbdominalSafety,
  isPediatricAbdominalSafetyRelevant,
  type PediatricAbdominalSafetyInput,
} from '../lib/clinical-safety/pediatric-abdominal';

interface FixtureExpectation {
  applicable: boolean;
  ageBand: string;
  dangerSignIds: string[];
  prioritySignIds: string[];
  patternIds: string[];
  priority: string;
  heuristicSymptoms: string[];
  kernelSymptoms: string[];
  requiredNextQuestionIds?: string[];
}

interface PediatricAbdominalSafetyFixtures {
  schemaVersion: string;
  status: string;
  sourceBoundary: Record<string, boolean>;
  references: Array<{ id: string; url: string }>;
  defaults: PediatricAbdominalSafetyInput;
  fixtures: Array<{
    id: string;
    useUnknownDefaults?: boolean;
    input: Partial<PediatricAbdominalSafetyInput>;
    expected: FixtureExpectation;
  }>;
}

const root = process.cwd();
const fixturePath = resolve(root, 'clinical/epistemic-firewall/fixtures/pediatric-abdominal-safety.v1.json');
const evidencePath = resolve(root, 'clinical/sounio/evidence-bundle.json');
const fixtureBundle = JSON.parse(readFileSync(fixturePath, 'utf8')) as PediatricAbdominalSafetyFixtures;
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as ClinicalEvidenceBundle;

assert.equal(fixtureBundle.schemaVersion, 'darwin.sounio.pediatric-abdominal-safety-fixtures.v1');
assert.equal(fixtureBundle.status, 'synthetic-safety-only');
assert.equal(fixtureBundle.fixtures.length, 18);
assert.equal(fixtureBundle.references.length, 6);
assert.deepEqual(fixtureBundle.sourceBoundary, {
  abdominalSignsAddedToKernel: false,
  appendicitisScoreCalculated: false,
  intussusceptionDiagnosed: false,
  imagingAutomaticallyOrdered: false,
  antiemeticAuthorized: false,
  antibioticAuthorized: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
});

function inputFor(fixture: PediatricAbdominalSafetyFixtures['fixtures'][number]): PediatricAbdominalSafetyInput {
  const defaults: PediatricAbdominalSafetyInput = fixture.useUnknownDefaults
    ? {
        ...EMPTY_PEDIATRIC_ABDOMINAL_SAFETY_INPUT,
        abdominalOrVomitingPresent: true,
      }
    : fixtureBundle.defaults;
  return { ...defaults, ...fixture.input };
}

for (const fixture of fixtureBundle.fixtures) {
  const result = evaluatePediatricAbdominalSafety(inputFor(fixture));
  assert.equal(result.applicable, fixture.expected.applicable, fixture.id);
  assert.equal(result.ageBand, fixture.expected.ageBand, fixture.id);
  assert.deepEqual(result.dangerSignIds, fixture.expected.dangerSignIds, fixture.id);
  assert.deepEqual(result.prioritySignIds, fixture.expected.prioritySignIds, fixture.id);
  assert.deepEqual(result.patternIds, fixture.expected.patternIds, fixture.id);
  assert.equal(result.priority, fixture.expected.priority, fixture.id);
  assert.deepEqual(result.heuristicSymptoms, fixture.expected.heuristicSymptoms, fixture.id);
  assert.deepEqual(result.kernelSymptoms, fixture.expected.kernelSymptoms, fixture.id);
  for (const questionId of fixture.expected.requiredNextQuestionIds ?? []) {
    assert.ok(result.nextQuestionIds.includes(questionId as never), `${fixture.id}:${questionId}`);
  }
  assert.deepEqual(result.guardrails, {
    abdominalSignsAddedToKernel: false,
    appendicitisScoreCalculated: false,
    intussusceptionDiagnosed: false,
    imagingAutomaticallyOrdered: false,
    antiemeticAuthorized: false,
    antibioticAuthorized: false,
    prescriptionAuthorized: false,
    clinicalActivationAuthorized: false,
  }, fixture.id);
}

function fixture(id: string): PediatricAbdominalSafetyInput {
  const value = fixtureBundle.fixtures.find(candidate => candidate.id === id);
  assert.ok(value, id);
  return inputFor(value);
}

function adaptedFeatures(input: PediatricAbdominalSafetyInput): Set<string> {
  const assessment = evaluatePediatricAbdominalSafety(input);
  return adaptClinicalInput({
    ageYears: input.ageDays === undefined ? undefined : input.ageDays / 365.2425,
    symptoms: ['Dor abdominal', ...assessment.kernelSymptoms],
  }, evidence).presentFeatureIds;
}

function changedFeatures(
  input: PediatricAbdominalSafetyInput,
  comparison: PediatricAbdominalSafetyInput,
): string[] {
  const present = adaptedFeatures(input);
  const baseline = adaptedFeatures(comparison);
  return evidence.features
    .map(feature => feature.id)
    .filter(id => present.has(id) !== baseline.has(id));
}

const bilious = fixture('bilious-vomiting-is-urgent');
assert.deepEqual(changedFeatures(bilious, { ...bilious, biliousVomiting: 'no' }), []);

const obstruction = fixture('distension-plus-vomiting-requires-obstruction-exclusion');
assert.deepEqual(changedFeatures(obstruction, {
  ...obstruction,
  abdominalDistension: 'no',
  vomitingEpisodesLast24Hours: 0,
}), []);

const intussusception = fixture('six-month-colicky-pallor-pattern-requires-intussusception-exclusion');
assert.deepEqual(changedFeatures(intussusception, {
  ...intussusception,
  painPattern: 'other',
  pallorOrEpisodicLethargy: 'no',
}), []);

const appendicitis = fixture('right-lower-quadrant-migration-pattern-is-same-day-not-diagnosis');
assert.deepEqual(changedFeatures(appendicitis, {
  ...appendicitis,
  painPattern: 'other',
  painLocation: 'diffuse',
  migrationToRightLowerQuadrant: 'no',
  painWithMovementOrUnableToWalkHop: 'no',
  feverPresent: 'no',
}), []);

assert.ok(!evidence.features.some(feature => (
  feature.id.includes('abdominal')
  || feature.id.includes('vomit')
  || feature.id.includes('append')
  || feature.id.includes('intuss')
)));
assert.equal(isPediatricAbdominalSafetyRelevant(['Dor abdominal'], undefined), true);
assert.equal(isPediatricAbdominalSafetyRelevant(['Vômito'], 180), true);
assert.equal(isPediatricAbdominalSafetyRelevant(['Vômito pós-tosse'], 180), false);
assert.equal(isPediatricAbdominalSafetyRelevant(['Náusea'], (18 * 365.2425) - 0.01), true);
assert.equal(isPediatricAbdominalSafetyRelevant(['Dor abdominal'], 18 * 365.2425), false);

console.log('PEDIATRIC_ABDOMINAL_SAFETY_FIXTURES_VALID');
console.log(JSON.stringify({
  schemaVersion: 'darwin.sounio.pediatric-abdominal-safety-fixture-test.v1',
  fixturesPassed: fixtureBundle.fixtures.length,
  surgicalDangerSignsPassed: true,
  biliousAndObstructionRoutesPassed: true,
  intussusceptionPatternPassed: true,
  appendicitisPatternWithoutDiagnosisPassed: true,
  neurologicDkaAndPoisoningRoutesPassed: true,
  exactEighteenYearBoundaryPassed: true,
  unknownNeverCoercedToAbsent: true,
  frozenFeatureIsolationPassed: true,
  abdominalSignsAddedToKernel: false,
  appendicitisScoreCalculated: false,
  intussusceptionDiagnosed: false,
  imagingAutomaticallyOrdered: false,
  antiemeticAuthorized: false,
  antibioticAuthorized: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
}, null, 2));
