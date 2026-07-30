import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { computeSiteMappingSha256, sha256 } from './lib/multicenter-site-mapping.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const validatorPath = join(root, 'scripts/validate-multicenter-package.mjs');
const lockerPath = join(root, 'scripts/lock-multicenter-site-mapping.mjs');
const calibratorPath = join(root, 'scripts/calibrate-epistemic-firewall.mjs');
const templatePath = join(root, 'clinical/epistemic-firewall/multicenter/site-mapping.template.json');
const evidencePath = join(root, 'clinical/sounio/evidence-bundle.json');
const buildDir = join(root, '.clinical-kernel-build/multicenter/onboarding-fixture');
const resultPath = join(root, '.clinical-kernel-build/multicenter/onboarding-fixture-test.json');
const asOf = '2026-07-30';
const template = JSON.parse(readFileSync(templatePath, 'utf8'));
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'));

rmSync(buildDir, { recursive: true, force: true });
mkdirSync(buildDir, { recursive: true });

function syntheticDraft(siteCode) {
  const mapping = structuredClone(template);
  mapping.mappingVersion = `synthetic-${siteCode.toLowerCase()}-v1`;
  mapping.siteKind = 'synthetic-fixture';
  mapping.siteCode = siteCode;
  mapping.sourceSystem = 'synthetic-ehr-v1';
  mapping.governance = {
    researchProtocolId: 'SYNTHETIC-PROTOCOL-ONLY',
    coordinatingCenterCode: 'SYN_COORDINATOR',
    participatingCenterCode: siteCode,
    ethicsReviewModel: 'single-review-coordinating-cep',
    ethicsApprovalId: 'SYNTHETIC-NOT-AN-ETHICS-APPROVAL',
    ethicsApprovalIssuedAt: '2026-01-01',
    ethicsApprovalValidUntil: null,
    localResponsibilityAttested: true,
    databaseControllerAuthorizationId: 'SYNTHETIC-CONTROLLER-AUTHORIZATION',
    databaseControllerAuthorizationAttested: true,
    dataUseAgreementId: `SYNTHETIC-LOCAL-DUA-${siteCode}`,
    multicenterDataUseApprovalId: 'SYNTHETIC-DUA-ONLY',
    dataUseAgreementValidUntil: '2030-12-31',
    legalBasisAssessmentId: 'SYNTHETIC-LEGAL-ASSESSMENT',
    researchBodyEligibilityAttested: true,
    ripdId: 'SYNTHETIC-RIPD',
    dataControllerCode: `${siteCode}_CONTROLLER`,
    dataProcessorCode: 'SYNTHETIC_PROCESSOR',
    dpoChannelHeldOffRepository: true,
  };
  mapping.indexEncounter = {
    selectionRule: 'earliest eligible synthetic encounter per synthetic patient',
    encounterDateField: 'synthetic_encounter_date',
    ageDaysDerivation: 'synthetic_age_days',
  };
  mapping.pseudonyms = {
    algorithm: 'HMAC-SHA-256',
    patientSourceField: 'synthetic_patient_id',
    encounterSourceField: 'synthetic_encounter_id',
    siteHashDerivation: 'SHA-256(darwin.sounio.site:v1:<siteCode>)',
    siteHeldSecretNeverExported: true,
  };
  mapping.observations = mapping.observations.map(observation => ({
    ...observation,
    sourceFields: [`synthetic_${observation.featureId}`],
    transformation: 'map synthetic boolean to trivalent code',
  }));
  mapping.referenceStandard = {
    adjudicationMethod: 'chart-review-double',
    adjudicatorsBlindedToKernel: true,
    conditionSourceFields: ['synthetic_condition'],
    severityOutcomeSourceFields: ['synthetic_severity'],
    disagreementResolution: 'synthetic third-review rule',
  };
  mapping.privacy = {
    freeTextExported: false,
    directIdentifiersExported: false,
    dateOfBirthExported: false,
    linkageTableLeavesSite: false,
    crossBorderTransfer: false,
    minimumNecessaryAttested: true,
    reidentificationRiskAssessmentId: 'SYNTHETIC-RISK-ASSESSMENT',
    secureEnvironmentAssessmentId: 'SYNTHETIC-SECURE-ENVIRONMENT',
    retentionPlanId: 'SYNTHETIC-RETENTION-PLAN',
    breachResponsePlanId: 'SYNTHETIC-BREACH-PLAN',
  };
  mapping.representation = {
    careSetting: 'APS-SUS',
    coverageStart: '2024-01-01',
    coverageEnd: '2025-12-31',
    sourcePopulationDescription: 'synthetic pediatric APS population',
    inclusionExclusionProtocolId: 'SYNTHETIC-INCLUSION-PROTOCOL',
    variables: mapping.representation.variables.map(variable => ({
      ...variable,
      availability: 'unavailable-source',
      sourceFields: [],
      transformation: null,
    })),
  };
  mapping.approval = {
    mappingLocked: false,
    clinicalReviewerId: 'SYNTHETIC_CLINICAL_REVIEWER_ROLE',
    dataStewardId: 'SYNTHETIC_DATA_STEWARD_ROLE',
    principalInvestigatorId: 'SYNTHETIC_PI_ROLE',
    lockedAt: null,
    reviewDueAt: '2030-12-31',
    documentsHeldOffRepository: true,
    mappingSha256: null,
  };
  return mapping;
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function run(script, arguments_) {
  return execFileSync(process.execPath, [script, ...arguments_], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function expectFailure(name, operation, expectedMessage) {
  try {
    operation();
  } catch (error) {
    const output = `${error.message}\n${error.stderr || ''}`;
    if (!output.includes(expectedMessage)) {
      throw new Error(`${name} failed for an unexpected reason: ${output}`);
    }
    return { name, refused: true, reason: expectedMessage };
  }
  throw new Error(`${name} unexpectedly passed.`);
}

const siteADraftPath = join(buildDir, 'site-a.draft.json');
const siteBDraftPath = join(buildDir, 'site-b.draft.json');
const siteALockedPath = join(buildDir, 'site-a.locked.json');
const siteBLockedPath = join(buildDir, 'site-b.locked.json');
writeJson(siteADraftPath, syntheticDraft('SYN_SITE_A'));
writeJson(siteBDraftPath, syntheticDraft('SYN_SITE_B'));

run(lockerPath, ['--input', siteADraftPath, '--output', siteALockedPath, '--locked-at', asOf, '--synthetic']);
run(lockerPath, ['--input', siteBDraftPath, '--output', siteBLockedPath, '--locked-at', asOf, '--synthetic']);
const siteA = JSON.parse(readFileSync(siteALockedPath, 'utf8'));
const siteB = JSON.parse(readFileSync(siteBLockedPath, 'utf8'));

run(validatorPath, [
  '--mapping', siteALockedPath,
  '--mapping', siteBLockedPath,
  '--require-locked',
  '--allow-synthetic',
  '--as-of', asOf,
]);
const packageReceipt = JSON.parse(readFileSync(join(root, '.clinical-kernel-build/multicenter/package-validation.json'), 'utf8'));
if (
  packageReceipt.status !== 'synthetic-onboarding-fixture-valid'
  || packageReceipt.mappingGateReady !== false
  || packageReceipt.governanceDocumentsVerified !== false
  || packageReceipt.calibrationAuthorized !== false
) {
  throw new Error('Synthetic onboarding receipt crossed the clinical authorization boundary.');
}

const cohort = {
  schemaVersion: 'darwin.sounio.retrospective-cohort.v1',
  datasetId: 'synthetic-onboarding-binding-only',
  createdAt: '2026-07-30T00:00:00.000Z',
  provenance: {
    kind: 'retrospective-clinical',
    sourceSystem: 'synthetic-binding-test',
    dataUseApprovalId: 'SYNTHETIC-DUA-ONLY',
    deidentificationAttested: true,
    adjudicationProtocol: 'synthetic-binding-test',
  },
  records: [
    {
      patientHash: sha256(Buffer.from('synthetic-binding-patient-a', 'utf8')),
      encounterHash: sha256(Buffer.from('synthetic-binding-encounter-a', 'utf8')),
      siteHash: siteA.siteHash,
      encounterDate: '2025-01-01',
      ageDays: 1460,
      features: Array(12).fill(0),
      adjudicatedConditionId: evidence.conditions[0].id,
      severityOutcome: false,
      adjudicationMethod: 'chart-review-double',
    },
    {
      patientHash: sha256(Buffer.from('synthetic-binding-patient-b', 'utf8')),
      encounterHash: sha256(Buffer.from('synthetic-binding-encounter-b', 'utf8')),
      siteHash: siteB.siteHash,
      encounterDate: '2025-01-02',
      ageDays: 1825,
      features: Array(12).fill(0),
      adjudicatedConditionId: evidence.conditions[1].id,
      severityOutcome: true,
      adjudicationMethod: 'chart-review-double',
    },
  ],
};
const cohortPath = join(buildDir, 'cohort-binding.json');
writeJson(cohortPath, cohort);
run(validatorPath, [
  '--mapping', siteALockedPath,
  '--mapping', siteBLockedPath,
  '--require-locked',
  '--allow-synthetic',
  '--cohort', cohortPath,
  '--require-cohort-binding',
  '--as-of', asOf,
]);
const boundReceipt = JSON.parse(readFileSync(join(root, '.clinical-kernel-build/multicenter/package-validation.json'), 'utf8'));
if (boundReceipt.cohortSiteBinding !== 'exact-approved-site-set') {
  throw new Error('Synthetic cohort was not bound to the exact approved site set.');
}

const scenarios = [];
const tamperedPath = join(buildDir, 'site-a.tampered.json');
const tampered = structuredClone(siteA);
tampered.observations[0].transformation = 'tampered transformation';
writeJson(tamperedPath, tampered);
scenarios.push(expectFailure('tampered-mapping', () => run(validatorPath, [
  '--mapping', tamperedPath,
  '--mapping', siteBLockedPath,
  '--require-locked',
  '--allow-synthetic',
  '--as-of', asOf,
]), 'site-mapping-lock-hash-mismatch'));

scenarios.push(expectFailure('duplicate-site', () => run(validatorPath, [
  '--mapping', siteALockedPath,
  '--mapping', siteALockedPath,
  '--require-locked',
  '--allow-synthetic',
  '--as-of', asOf,
]), 'multicenter-site-code-duplicate'));

const expiredPath = join(buildDir, 'site-a.expired.json');
const expired = structuredClone(siteA);
expired.approval.reviewDueAt = '2026-01-01';
expired.approval.mappingSha256 = computeSiteMappingSha256(expired);
writeJson(expiredPath, expired);
scenarios.push(expectFailure('expired-review', () => run(validatorPath, [
  '--mapping', expiredPath,
  '--mapping', siteBLockedPath,
  '--require-locked',
  '--allow-synthetic',
  '--as-of', asOf,
]), 'site-mapping-review-expired'));

const expiredEthicsPath = join(buildDir, 'site-a.expired-ethics.json');
const expiredEthics = structuredClone(siteA);
expiredEthics.governance.ethicsApprovalValidUntil = '2026-01-01';
expiredEthics.approval.mappingSha256 = computeSiteMappingSha256(expiredEthics);
writeJson(expiredEthicsPath, expiredEthics);
scenarios.push(expectFailure('expired-ethics-approval', () => run(validatorPath, [
  '--mapping', expiredEthicsPath,
  '--mapping', siteBLockedPath,
  '--require-locked',
  '--allow-synthetic',
  '--as-of', asOf,
]), 'site-mapping-ethics-approval-expired'));

const mismatchedProtocolPath = join(buildDir, 'site-b.protocol-mismatch.json');
const mismatchedProtocol = structuredClone(siteB);
mismatchedProtocol.governance.researchProtocolId = 'DIFFERENT-SYNTHETIC-PROTOCOL';
mismatchedProtocol.approval.mappingSha256 = computeSiteMappingSha256(mismatchedProtocol);
writeJson(mismatchedProtocolPath, mismatchedProtocol);
scenarios.push(expectFailure('protocol-mismatch', () => run(validatorPath, [
  '--mapping', siteALockedPath,
  '--mapping', mismatchedProtocolPath,
  '--require-locked',
  '--allow-synthetic',
  '--as-of', asOf,
]), 'multicenter-research-protocol-mismatch'));

const unknownSiteCohortPath = join(buildDir, 'cohort-unknown-site.json');
const unknownSiteCohort = structuredClone(cohort);
unknownSiteCohort.records[1].siteHash = sha256(Buffer.from('unapproved-site', 'utf8'));
writeJson(unknownSiteCohortPath, unknownSiteCohort);
scenarios.push(expectFailure('unknown-cohort-site', () => run(validatorPath, [
  '--mapping', siteALockedPath,
  '--mapping', siteBLockedPath,
  '--require-locked',
  '--allow-synthetic',
  '--cohort', unknownSiteCohortPath,
  '--require-cohort-binding',
  '--as-of', asOf,
]), 'multicenter-cohort-site-set-mismatch'));

const unboundApprovalCohortPath = join(buildDir, 'cohort-unbound-approval.json');
const unboundApprovalCohort = structuredClone(cohort);
unboundApprovalCohort.provenance.dataUseApprovalId = 'UNBOUND-SYNTHETIC-DUA';
writeJson(unboundApprovalCohortPath, unboundApprovalCohort);
scenarios.push(expectFailure('unbound-data-use-approval', () => run(validatorPath, [
  '--mapping', siteALockedPath,
  '--mapping', siteBLockedPath,
  '--require-locked',
  '--allow-synthetic',
  '--cohort', unboundApprovalCohortPath,
  '--require-cohort-binding',
  '--as-of', asOf,
]), 'multicenter-cohort-data-use-approval-unbound'));

scenarios.push(expectFailure('missing-cohort-binding', () => run(validatorPath, [
  '--mapping', siteALockedPath,
  '--mapping', siteBLockedPath,
  '--require-locked',
  '--require-cohort-binding',
  '--allow-synthetic',
  '--as-of', asOf,
]), 'multicenter-cohort-binding-missing'));

scenarios.push(expectFailure('real-mapping-inside-repository', () => run(lockerPath, [
  '--input', siteADraftPath,
  '--output', join(buildDir, 'forbidden-real-output.json'),
  '--locked-at', asOf,
]), 'Real locked site mappings must remain outside the repository'));

scenarios.push(expectFailure('calibrator-rejects-synthetic-sites', () => run(calibratorPath, [
  '--cohort', cohortPath,
  '--site-mapping', siteALockedPath,
  '--site-mapping', siteBLockedPath,
  '--validate-only',
]), 'site-mapping-synthetic-not-allowed'));

const result = {
  schemaVersion: 'darwin.sounio.multicenter-onboarding-fixture-test.v1',
  status: 'pass',
  syntheticOnly: true,
  calibrationAuthorized: false,
  lockedSyntheticSites: 2,
  exactCohortSiteBinding: true,
  refusalScenarios: scenarios,
};
writeJson(resultPath, result);
console.log(JSON.stringify(result, null, 2));
console.log('MULTICENTER_ONBOARDING_FIXTURE_PASS');
