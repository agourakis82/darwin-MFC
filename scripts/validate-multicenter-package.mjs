import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
const outputPath = join(root, '.clinical-kernel-build/multicenter/package-validation.json');

const args = process.argv.slice(2);
const mappingPaths = args.flatMap((value, index) => (
  value === '--mapping' && args[index + 1] ? [resolve(args[index + 1])] : []
));
const requireLocked = args.includes('--require-locked');
const sha256 = value => createHash('sha256').update(value).digest('hex');
const readJson = path => JSON.parse(readFileSync(path, 'utf8'));
const unique = values => new Set(values).size === values.length;
const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

const evidence = readJson(evidencePath);
const dictionary = readJson(dictionaryPath);
const template = readJson(templatePath);
readJson(mappingSchemaPath);
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

const validateMapping = (mapping, path, locked) => {
  requireCondition(mapping.schemaVersion === 'darwin.sounio.site-mapping.v1', `site-mapping-schema-mismatch:${path}`);
  requireCondition(mapping.dictionaryVersion === dictionary.dictionaryVersion, `site-mapping-dictionary-version-mismatch:${path}`);
  requireCondition(mapping.cohortSchemaVersion === 'darwin.sounio.retrospective-cohort.v1', `site-mapping-cohort-schema-mismatch:${path}`);
  requireCondition(mapping.pseudonyms?.algorithm === 'HMAC-SHA-256', `site-mapping-pseudonym-algorithm-mismatch:${path}`);
  requireCondition(mapping.pseudonyms?.siteHeldSecretNeverExported === true, `site-mapping-secret-boundary-invalid:${path}`);
  requireCondition(mapping.privacy?.freeTextExported === false, `site-mapping-free-text-export-forbidden:${path}`);
  requireCondition(mapping.privacy?.directIdentifiersExported === false, `site-mapping-direct-identifiers-forbidden:${path}`);
  requireCondition(mapping.privacy?.dateOfBirthExported === false, `site-mapping-date-of-birth-forbidden:${path}`);
  requireCondition(mapping.privacy?.linkageTableLeavesSite === false, `site-mapping-linkage-export-forbidden:${path}`);
  const ids = mapping.observations?.map(observation => observation.featureId) ?? [];
  requireCondition(JSON.stringify(ids) === JSON.stringify(featureIds), `site-mapping-feature-order-mismatch:${path}`);
  if (locked) {
    requireCondition(mapping.status === 'locked' && mapping.approval?.mappingLocked === true, `site-mapping-not-locked:${path}`);
    requireCondition(!mapping.siteCode.includes('REPLACE_WITH'), `site-mapping-site-code-placeholder:${path}`);
    requireCondition(!mapping.sourceSystem.includes('REPLACE_WITH'), `site-mapping-source-system-placeholder:${path}`);
    requireCondition(!mapping.dataUseApprovalId.includes('REPLACE_WITH'), `site-mapping-approval-placeholder:${path}`);
    requireCondition(mapping.observations.every(observation => (
      observation.sourceFields.length > 0 && typeof observation.transformation === 'string' && observation.transformation.length > 0
    )), `site-mapping-observation-incomplete:${path}`);
    requireCondition(Boolean(mapping.referenceStandard?.disagreementResolution), `site-mapping-adjudication-incomplete:${path}`);
    requireCondition(Boolean(mapping.privacy?.reidentificationRiskAssessmentId), `site-mapping-risk-assessment-missing:${path}`);
  }
};

validateMapping(template, templatePath, false);
const mappings = mappingPaths.map(path => ({ path, mapping: readJson(path) }));
mappings.forEach(({ path, mapping }) => validateMapping(mapping, path, requireLocked));
if (requireLocked) {
  requireCondition(mappings.length >= 2, 'multicenter-at-least-two-locked-site-mappings-required');
  requireCondition(unique(mappings.map(({ mapping }) => mapping.siteCode)), 'multicenter-site-code-duplicate');
}

const intendedUse = readFileSync(intendedUsePath, 'utf8');
const sap = readFileSync(sapPath, 'utf8');
const checklist = readFileSync(checklistPath, 'utf8');
requireCondition(intendedUse.includes('Frozen on 2026-07-30'), 'multicenter-intended-use-not-frozen');
requireCondition(sap.includes('Frozen: 2026-07-30'), 'multicenter-sap-not-frozen');
requireCondition(sap.includes('Passing this SAP never changes the firewall from `REFUSE`'), 'multicenter-sap-activation-boundary-missing');
requireCondition(checklist.includes('No name, social name, CPF, CNS'), 'multicenter-deidentification-checklist-incomplete');

const files = [
  dictionaryPath,
  templatePath,
  mappingSchemaPath,
  cohortSchemaPath,
  intendedUsePath,
  sapPath,
  checklistPath,
  ...mappingPaths,
];
const report = {
  schemaVersion: 'darwin.sounio.multicenter-package-validation.v1',
  status: requireLocked ? 'locked-site-package-valid' : 'template-package-valid',
  generatedAt: new Date().toISOString(),
  observations: dictionary.observations.length,
  conditions: dictionary.referenceConditions.length,
  lockedSiteMappings: requireLocked ? mappings.length : 0,
  containsPatientRecords: false,
  hashes: Object.fromEntries(files.map(path => [
    path.slice(root.length + 1),
    sha256(readFileSync(path)),
  ])),
};
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
console.log('MULTICENTER_PACKAGE_VALID');
