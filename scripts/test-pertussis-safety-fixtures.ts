import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { adaptClinicalInput } from '../lib/clinical-kernel/adapter';
import type { ClinicalEvidenceBundle } from '../lib/clinical-kernel/types';
import { generateDifferentialDiagnosis } from '../lib/utils/differential-diagnosis';
import {
  evaluatePertussisSafety,
  type PertussisSafetyInput,
} from '../lib/clinical-safety/pertussis';

interface FixtureExpectation {
  surveillanceDefinitionMet: boolean;
  surveillanceRoute: string;
  durationThresholdDays: number | null;
  dangerSignIds: string[];
  highRiskIds: string[];
  priority: string;
  kernelSymptoms: string[];
  requiredNextQuestionIds?: string[];
}

interface PertussisSafetyFixtures {
  schemaVersion: string;
  status: string;
  sourceBoundary: Record<string, boolean>;
  references: Array<{ id: string; url: string }>;
  fixtures: Array<{
    id: string;
    input: PertussisSafetyInput;
    expected: FixtureExpectation;
  }>;
}

const root = process.cwd();
const fixturePath = resolve(root, 'clinical/epistemic-firewall/fixtures/pertussis-safety.v1.json');
const evidencePath = resolve(root, 'clinical/sounio/evidence-bundle.json');
const fixtureBundle = JSON.parse(readFileSync(fixturePath, 'utf8')) as PertussisSafetyFixtures;
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8')) as ClinicalEvidenceBundle;

assert.equal(fixtureBundle.schemaVersion, 'darwin.sounio.pertussis-safety-fixtures.v1');
assert.equal(fixtureBundle.status, 'synthetic-safety-only');
assert.equal(fixtureBundle.fixtures.length, 6);
assert.equal(fixtureBundle.references.length, 3);
assert.deepEqual(fixtureBundle.sourceBoundary, {
  sinanAggregateCountsUsedAsPrior: false,
  posteriorAdjustedInTypeScript: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
});

for (const fixture of fixtureBundle.fixtures) {
  const result = evaluatePertussisSafety(fixture.input);
  assert.equal(result.surveillanceDefinitionMet, fixture.expected.surveillanceDefinitionMet, fixture.id);
  assert.equal(result.surveillanceRoute, fixture.expected.surveillanceRoute, fixture.id);
  assert.equal(result.durationThresholdDays, fixture.expected.durationThresholdDays, fixture.id);
  assert.deepEqual(result.dangerSignIds, fixture.expected.dangerSignIds, fixture.id);
  assert.deepEqual(result.highRiskIds, fixture.expected.highRiskIds, fixture.id);
  assert.equal(result.priority, fixture.expected.priority, fixture.id);
  assert.deepEqual(result.kernelSymptoms, fixture.expected.kernelSymptoms, fixture.id);
  for (const questionId of fixture.expected.requiredNextQuestionIds ?? []) {
    assert.ok(result.nextQuestionIds.includes(questionId as never), `${fixture.id}:${questionId}`);
  }
  assert.deepEqual(result.guardrails, {
    sinanCountsUsedAsPrior: false,
    vaccinationUsedAsExclusion: false,
    posteriorAdjustedInTypeScript: false,
    prescriptionAuthorized: false,
    clinicalActivationAuthorized: false,
  }, fixture.id);
}

const vaccinatedContact = fixtureBundle.fixtures.find(fixture => fixture.id === 'vaccinated-adolescent-confirmed-contact');
assert.ok(vaccinatedContact);
const contactAssessment = evaluatePertussisSafety(vaccinatedContact.input);
const sameClinicalFeaturesWithoutContact = evaluatePertussisSafety({
  ...vaccinatedContact.input,
  closeContact: 'no',
  vaccinationStatus: 'incomplete',
});
assert.deepEqual(contactAssessment.kernelSymptoms, sameClinicalFeaturesWithoutContact.kernelSymptoms);
assert.equal(contactAssessment.surveillanceDefinitionMet, true);
assert.equal(sameClinicalFeaturesWithoutContact.surveillanceDefinitionMet, false);

const contactVector = adaptClinicalInput({
  ageYears: vaccinatedContact.input.ageDays! / 365.2425,
  symptoms: ['Tosse', ...contactAssessment.kernelSymptoms],
}, evidence).vector;
const noContactVector = adaptClinicalInput({
  ageYears: vaccinatedContact.input.ageDays! / 365.2425,
  symptoms: ['Tosse', ...sameClinicalFeaturesWithoutContact.kernelSymptoms],
}, evidence).vector;
assert.deepEqual(Array.from(contactVector), Array.from(noContactVector));

const infantTenDays = fixtureBundle.fixtures.find(fixture => fixture.id === 'young-infant-ten-days-cyanosis');
assert.ok(infantTenDays);
const infantAssessment = evaluatePertussisSafety(infantTenDays.input);
assert.equal(infantAssessment.surveillanceDefinitionMet, true);
assert.ok(!infantAssessment.kernelSymptoms.includes('Mais de 10 dias'));
assert.equal(evaluatePertussisSafety({ ...infantTenDays.input, ageDays: 182 }).durationThresholdDays, 10);
assert.equal(evaluatePertussisSafety({ ...infantTenDays.input, ageDays: 183 }).durationThresholdDays, 14);

const nonspecificInfantCough = generateDifferentialDiagnosis(
  'Tosse',
  [],
  [],
  { ageValue: 3, ageUnit: 'meses' },
);
const nonspecificPertussis = nonspecificInfantCough.diagnosticosDiferenciais
  .find(differential => differential.doenca.id === 'coqueluche');
assert.ok(nonspecificPertussis);
assert.equal(nonspecificPertussis.probabilidade, 'baixa');
assert.ok(nonspecificPertussis.score <= 39);

console.log('PERTUSSIS_SAFETY_FIXTURES_VALID');
console.log(JSON.stringify({
  schemaVersion: 'darwin.sounio.pertussis-safety-fixture-test.v1',
  fixturesPassed: fixtureBundle.fixtures.length,
  ageSpecificDurationRulesPassed: true,
  infantApneaCyanosisSafetyPassed: true,
  vaccinationNeverExcludesPassed: true,
  contactDoesNotAlterKernelVector: true,
  nonspecificCoughNotHighAdherence: true,
  sinanAggregateCountsUsedAsPrior: false,
  posteriorAdjustedInTypeScript: false,
  prescriptionAuthorized: false,
  clinicalActivationAuthorized: false,
}, null, 2));
