import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  REPRESENTATION_VARIABLE_IDS,
  SITE_MAPPING_SCHEMA_VERSION,
  sha256,
  stableStringify,
  validateSiteMapping,
} from './lib/multicenter-site-mapping.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageDir = join(root, 'clinical/epistemic-firewall/multicenter');
const dictionaryPath = join(packageDir, 'data-dictionary.v1.json');
const templatePath = join(packageDir, 'site-mapping.template.json');
const mappingSchemaPath = join(packageDir, 'site-mapping.schema.json');
const cohortSchemaPath = join(root, 'clinical/epistemic-firewall/schemas/retrospective-cohort.schema.json');
const evidencePath = join(root, 'clinical/sounio/evidence-bundle.json');
const intendedUsePath = join(root, 'docs/research/epistemic-firewall/intended-use-v1.md');
const sapPath = join(root, 'docs/research/epistemic-firewall/statistical-analysis-plan-v1.md');
const checklistPath = join(root, 'docs/research/epistemic-firewall/extraction-deidentification-checklist.md');
const onboardingPath = join(root, 'docs/research/epistemic-firewall/site-onboarding-runbook.md');
const outputPath = join(root, '.clinical-kernel-build/multicenter/package-validation.json');

const args = process.argv.slice(2);
const valuesAfter = flag => args.flatMap((value, index) => (
  value === flag && args[index + 1] ? [args[index + 1]] : []
));
const mappingPaths = valuesAfter('--mapping').map(path => resolve(path));
const cohortArguments = valuesAfter('--cohort');
const cohortPath = cohortArguments.length === 1 ? resolve(cohortArguments[0]) : null;
const asOfArguments = valuesAfter('--as-of');
const asOf = asOfArguments.length === 1 ? asOfArguments[0] : new Date().toISOString().slice(0, 10);
const requireLocked = args.includes('--require-locked');
const requireCohortBinding = args.includes('--require-cohort-binding');
const allowSynthetic = args.includes('--allow-synthetic');
const readJson = path => JSON.parse(readFileSync(path, 'utf8'));
const unique = values => new Set(values).size === values.length;
const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

requireCondition(cohortArguments.length <= 1, 'multicenter-only-one-cohort-allowed');
requireCondition(asOfArguments.length <= 1, 'multicenter-only-one-as-of-date-allowed');
requireCondition(
  /^\d{4}-\d{2}-\d{2}$/.test(asOf)
    && new Date(`${asOf}T00:00:00.000Z`).toISOString().slice(0, 10) === asOf,
  'multicenter-as-of-date-invalid',
);
requireCondition(!requireCohortBinding || requireLocked, 'multicenter-cohort-binding-requires-locked-mappings');
requireCondition(!requireCohortBinding || cohortPath, 'multicenter-cohort-binding-missing');
requireCondition(!cohortPath || requireLocked, 'multicenter-cohort-requires-locked-mappings');

const evidence = readJson(evidencePath);
const dictionary = readJson(dictionaryPath);
const template = readJson(templatePath);
const mappingSchema = readJson(mappingSchemaPath);
const cohortSchema = readJson(cohortSchemaPath);

const featureIds = evidence.features.map(feature => feature.id);
const conditionIds = evidence.conditions.map(condition => condition.id);
const dictionaryFeatureIds = dictionary.observations.map(observation => observation.id);
const dictionaryConditionIds = dictionary.referenceConditions.map(condition => condition.id);

requireCondition(dictionary.schemaVersion === 'darwin.sounio.multicenter-data-dictionary.v1', 'multicenter-dictionary-schema-mismatch');
requireCondition(dictionary.status === 'frozen-research-only', 'multicenter-dictionary-not-frozen');
requireCondition(dictionary.observations.length === 12, 'multicenter-observation-count-mismatch');
requireCondition(dictionary.referenceConditions.length === 9, 'multicenter-condition-count-mismatch');
requireCondition(unique(dictionaryFeatureIds), 'multicenter-observation-id-duplicate');
requireCondition(unique(dictionaryConditionIds), 'multicenter-condition-id-duplicate');
requireCondition(JSON.stringify(dictionaryFeatureIds) === JSON.stringify(featureIds), 'multicenter-observation-order-mismatch');
requireCondition(JSON.stringify(dictionaryConditionIds) === JSON.stringify(conditionIds), 'multicenter-condition-order-mismatch');
requireCondition(dictionary.observations.every((observation, index) => observation.index === index), 'multicenter-observation-index-mismatch');
requireCondition(dictionary.referenceConditions.every((condition, index) => condition.index === index), 'multicenter-condition-index-mismatch');
requireCondition(
  dictionary.observationEncoding.unknown === -1
    && dictionary.observationEncoding.absent === 0
    && dictionary.observationEncoding.present === 1,
  'multicenter-observation-encoding-mismatch',
);
requireCondition(cohortSchema.properties?.schemaVersion?.const === 'darwin.sounio.retrospective-cohort.v1', 'multicenter-cohort-schema-mismatch');
requireCondition(mappingSchema.properties?.schemaVersion?.const === SITE_MAPPING_SCHEMA_VERSION, 'multicenter-site-schema-mismatch');

requireCondition(template.schemaVersion === SITE_MAPPING_SCHEMA_VERSION, 'multicenter-template-schema-mismatch');
requireCondition(template.status === 'draft' && template.siteKind === 'clinical-site', 'multicenter-template-state-invalid');
requireCondition(template.siteHash === null, 'multicenter-template-must-not-claim-site-hash');
requireCondition(template.siteCode.includes('REPLACE_WITH'), 'multicenter-template-site-placeholder-missing');
requireCondition(
  JSON.stringify(template.observations.map(observation => observation.featureId)) === JSON.stringify(featureIds),
  'multicenter-template-feature-order-mismatch',
);
requireCondition(
  JSON.stringify(template.representation.variables.map(variable => variable.id)) === JSON.stringify(REPRESENTATION_VARIABLE_IDS),
  'multicenter-template-representation-order-mismatch',
);
requireCondition(template.privacy.directIdentifiersExported === false, 'multicenter-template-direct-identifiers-forbidden');
requireCondition(template.privacy.freeTextExported === false, 'multicenter-template-free-text-forbidden');
requireCondition(template.approval.mappingLocked === false && template.approval.mappingSha256 === null, 'multicenter-template-lock-invalid');

const mappings = mappingPaths.map(path => ({ path, mapping: readJson(path) }));
const validatedMappings = mappings.map(({ mapping }) => validateSiteMapping(mapping, {
  asOf,
  featureIds,
  requireLocked,
  allowSynthetic,
}));

if (requireLocked) {
  requireCondition(mappings.length >= 2, 'multicenter-at-least-two-locked-site-mappings-required');
  requireCondition(unique(validatedMappings.map(mapping => mapping.siteCode)), 'multicenter-site-code-duplicate');
  requireCondition(unique(validatedMappings.map(mapping => mapping.siteHash)), 'multicenter-site-hash-duplicate');
  requireCondition(
    new Set(mappings.map(({ mapping }) => mapping.governance.researchProtocolId)).size === 1,
    'multicenter-research-protocol-mismatch',
  );
  requireCondition(
    new Set(mappings.map(({ mapping }) => mapping.governance.coordinatingCenterCode)).size === 1,
    'multicenter-coordinating-center-mismatch',
  );
  requireCondition(
    new Set(mappings.map(({ mapping }) => mapping.governance.multicenterDataUseApprovalId)).size === 1,
    'multicenter-data-use-approval-mismatch',
  );
}

let cohortSiteBinding = 'not-provided';
let cohortSiteHashes = [];
if (cohortPath) {
  const cohort = readJson(cohortPath);
  requireCondition(cohort.schemaVersion === 'darwin.sounio.retrospective-cohort.v1', 'multicenter-cohort-input-schema-mismatch');
  requireCondition(cohort.provenance?.kind === 'retrospective-clinical', 'multicenter-cohort-binding-requires-clinical-provenance');
  cohortSiteHashes = [...new Set(cohort.records.map(record => record.siteHash))].sort();
  const approvedSiteHashes = validatedMappings.map(mapping => mapping.siteHash).sort();
  requireCondition(
    JSON.stringify(cohortSiteHashes) === JSON.stringify(approvedSiteHashes),
    'multicenter-cohort-site-set-mismatch',
  );
  const [multicenterDataUseApprovalId] = new Set(
    mappings.map(({ mapping }) => mapping.governance.multicenterDataUseApprovalId),
  );
  requireCondition(
    cohort.provenance.dataUseApprovalId === multicenterDataUseApprovalId,
    'multicenter-cohort-data-use-approval-unbound',
  );
  cohortSiteBinding = 'exact-approved-site-set';
}

const intendedUse = readFileSync(intendedUsePath, 'utf8');
const sap = readFileSync(sapPath, 'utf8');
const checklist = readFileSync(checklistPath, 'utf8');
const onboarding = readFileSync(onboardingPath, 'utf8');
requireCondition(intendedUse.includes('Frozen on 2026-07-30'), 'multicenter-intended-use-not-frozen');
requireCondition(sap.includes('Frozen: 2026-07-30'), 'multicenter-sap-not-frozen');
requireCondition(sap.includes('Passing this SAP never changes the firewall from `REFUSE`'), 'multicenter-sap-activation-boundary-missing');
requireCondition(checklist.includes('No name, social name, CPF, CNS'), 'multicenter-deidentification-checklist-incomplete');
requireCondition(onboarding.includes('No locked mapping authorizes calibration or clinical use.'), 'multicenter-onboarding-activation-boundary-missing');

const packageFiles = [
  dictionaryPath,
  templatePath,
  mappingSchemaPath,
  cohortSchemaPath,
  intendedUsePath,
  sapPath,
  checklistPath,
  onboardingPath,
];
const mappingHashSet = validatedMappings.map(mapping => mapping.mappingSha256).filter(Boolean).sort();
const allClinicalSites = validatedMappings.length > 0
  && validatedMappings.every(mapping => mapping.siteKind === 'clinical-site');
const report = {
  schemaVersion: 'darwin.sounio.multicenter-package-validation.v2',
  status: requireLocked
    ? allClinicalSites ? 'locked-site-onboarding-valid' : 'synthetic-onboarding-fixture-valid'
    : 'template-package-valid',
  generatedAt: new Date().toISOString(),
  evaluatedAsOf: asOf,
  observations: dictionary.observations.length,
  conditions: dictionary.referenceConditions.length,
  lockedSiteMappings: requireLocked ? mappings.length : 0,
  siteCodes: validatedMappings.map(mapping => mapping.siteCode).sort(),
  siteHashes: validatedMappings.map(mapping => mapping.siteHash).sort(),
  siteMappingSetSha256: mappingHashSet.length > 0
    ? sha256(Buffer.from(stableStringify(mappingHashSet), 'utf8'))
    : null,
  cohortSiteBinding,
  cohortSiteHashes,
  mappingGateReady: requireLocked && allClinicalSites,
  governanceDocumentsVerified: false,
  calibrationAuthorized: false,
  containsPatientRecords: false,
  hashes: Object.fromEntries(packageFiles.map(path => [
    path.slice(root.length + 1),
    createHash('sha256').update(readFileSync(path)).digest('hex'),
  ])),
  siteMappings: validatedMappings.map(mapping => ({
    siteCode: mapping.siteCode,
    siteHash: mapping.siteHash,
    siteKind: mapping.siteKind,
    mappingSha256: mapping.mappingSha256,
  })),
};
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
console.log('MULTICENTER_PACKAGE_VALID');
