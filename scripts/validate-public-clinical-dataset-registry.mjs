import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(root, 'clinical/epistemic-firewall/public-data/public-dataset-registry.v1.json');
const schemaPath = join(root, 'clinical/epistemic-firewall/public-data/public-dataset-registry.schema.json');
const evidencePath = join(root, 'clinical/sounio/evidence-bundle.json');
const dictionaryPath = join(root, 'clinical/epistemic-firewall/multicenter/data-dictionary.v1.json');
const feasibilityPath = join(root, 'docs/research/epistemic-firewall/public-data-feasibility-v1.md');
const sivepAuditPath = join(root, 'docs/research/epistemic-firewall/sivep-srag-stratified-safety-v2.md');
const namcsAuditPath = join(root, 'docs/research/epistemic-firewall/namcs2018-ambulatory-audit-v1.md');
const namcsHcAuditPath = join(root, 'docs/research/epistemic-firewall/namcs-hc-2024-transportability-audit-v1.md');
const esusAuditPath = join(root, 'docs/research/epistemic-firewall/esus-notifica-2024-availability-audit-v1.md');
const sinanAuditPath = join(root, 'docs/research/epistemic-firewall/sinan-pertussis-tabnet-audit-v1.md');
const outputPath = join(root, '.clinical-kernel-build/public-data/registry-validation.json');

const readJson = path => JSON.parse(readFileSync(path, 'utf8'));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};
const unique = values => new Set(values).size === values.length;

const registryBytes = readFileSync(registryPath);
const schemaBytes = readFileSync(schemaPath);
const registry = JSON.parse(registryBytes.toString('utf8'));
const schema = JSON.parse(schemaBytes.toString('utf8'));
const evidence = readJson(evidencePath);
const dictionary = readJson(dictionaryPath);
const feasibility = readFileSync(feasibilityPath, 'utf8');
const sivepAudit = readFileSync(sivepAuditPath, 'utf8');
const namcsAudit = readFileSync(namcsAuditPath, 'utf8');
const namcsHcAudit = readFileSync(namcsHcAuditPath, 'utf8');
const esusAudit = readFileSync(esusAuditPath, 'utf8');
const sinanAudit = readFileSync(sinanAuditPath, 'utf8');

const featureIds = evidence.features.map(feature => feature.id);
const conditionIds = evidence.conditions.map(condition => condition.id);
const forbiddenUses = [
  'aps-prior-calibration',
  'nine-class-calibration',
  'clinical-activation',
  'prescription-generation',
];
const featureFidelities = new Set(['exact', 'positive-only', 'proxy', 'unavailable']);
const conditionFidelities = new Set(['exact-subset', 'diagnosis-code-proxy', 'syndromic-proxy']);
const sourceRoles = new Set([
  'severity-safety-validation',
  'syndromic-development',
  'ambulatory-treatment-pattern-audit',
  'diagnosis-transportability-audit',
  'epidemiologic-context-only',
]);

requireCondition(
  schema.properties?.schemaVersion?.const === 'darwin.sounio.public-clinical-dataset-registry.v1',
  'public-data-schema-version-mismatch',
);
requireCondition(registry.schemaVersion === schema.properties.schemaVersion.const, 'public-data-registry-version-mismatch');
requireCondition(registry.status === 'research-feasibility-only', 'public-data-registry-status-invalid');
requireCondition(registry.targetSetting === 'APS/SUS pediatric respiratory pilot', 'public-data-target-setting-mismatch');
requireCondition(/^\d{4}-\d{2}-\d{2}$/.test(registry.reviewedAt), 'public-data-reviewed-at-invalid');
requireCondition(registry.invariants.apsCalibrationAuthorized === false, 'public-data-aps-calibration-must-remain-blocked');
requireCondition(registry.invariants.clinicalActivationAuthorized === false, 'public-data-clinical-activation-must-remain-blocked');
requireCondition(registry.invariants.patientRowsStoredInRepository === false, 'public-data-patient-rows-forbidden');
requireCondition(registry.invariants.credentialsStoredInRepository === false, 'public-data-credentials-forbidden');
requireCondition(registry.invariants.unknownNeverCoercedToAbsent === true, 'public-data-unknown-policy-invalid');
requireCondition(dictionary.observationEncoding.unknown === -1, 'public-data-dictionary-unknown-code-mismatch');
requireCondition(registry.datasets.length >= 4, 'public-data-source-count-insufficient');
requireCondition(unique(registry.datasets.map(dataset => dataset.sourceId)), 'public-data-source-id-duplicate');

for (const dataset of registry.datasets) {
  requireCondition(/^[a-z0-9][a-z0-9-]+$/.test(dataset.sourceId), `public-data-source-id-invalid:${dataset.sourceId}`);
  requireCondition(dataset.authority.length > 0, `public-data-authority-missing:${dataset.sourceId}`);
  requireCondition(dataset.officialDatasetUrl.startsWith('https://'), `public-data-official-url-invalid:${dataset.sourceId}`);
  requireCondition(dataset.documentationUrls.length > 0, `public-data-documentation-missing:${dataset.sourceId}`);
  requireCondition(dataset.documentationUrls.every(url => url.startsWith('https://')), `public-data-documentation-url-invalid:${dataset.sourceId}`);
  requireCondition(dataset.access.credentialsStored === false, `public-data-source-credentials-forbidden:${dataset.sourceId}`);
  requireCondition(sourceRoles.has(dataset.role), `public-data-role-invalid:${dataset.sourceId}`);
  requireCondition(dataset.allowedUses.length > 0, `public-data-allowed-use-missing:${dataset.sourceId}`);
  requireCondition(
    forbiddenUses.every(use => dataset.forbiddenUses.includes(use)),
    `public-data-forbidden-use-incomplete:${dataset.sourceId}`,
  );
  requireCondition(dataset.selectionBias.length > 0, `public-data-selection-bias-missing:${dataset.sourceId}`);

  const mappedFeatureIds = dataset.featureMappings.map(mapping => mapping.featureId);
  requireCondition(
    JSON.stringify(mappedFeatureIds) === JSON.stringify(featureIds),
    `public-data-feature-order-mismatch:${dataset.sourceId}`,
  );
  for (const mapping of dataset.featureMappings) {
    requireCondition(featureFidelities.has(mapping.fidelity), `public-data-feature-fidelity-invalid:${dataset.sourceId}:${mapping.featureId}`);
    requireCondition(mapping.missingMapsTo === -1, `public-data-missingness-invalid:${dataset.sourceId}:${mapping.featureId}`);
    requireCondition(mapping.apsCalibrationEligible === false, `public-data-feature-calibration-forbidden:${dataset.sourceId}:${mapping.featureId}`);
    requireCondition(mapping.rule.length > 0, `public-data-feature-rule-missing:${dataset.sourceId}:${mapping.featureId}`);
    if (mapping.fidelity === 'unavailable') {
      requireCondition(mapping.sourceFields.length === 0, `public-data-unavailable-feature-has-source:${dataset.sourceId}:${mapping.featureId}`);
      requireCondition(mapping.rule.toLowerCase().includes('unknown'), `public-data-unavailable-feature-not-unknown:${dataset.sourceId}:${mapping.featureId}`);
    } else {
      requireCondition(mapping.sourceFields.length > 0, `public-data-feature-source-missing:${dataset.sourceId}:${mapping.featureId}`);
    }
    if (mapping.fidelity === 'positive-only') {
      requireCondition(mapping.rule.includes('never absent'), `public-data-positive-only-absence-unsafe:${dataset.sourceId}:${mapping.featureId}`);
    }
    if (mapping.fidelity === 'proxy') {
      requireCondition(mapping.rule.toLowerCase().includes('canonical value remains unknown'), `public-data-proxy-entered-canonical-vector:${dataset.sourceId}:${mapping.featureId}`);
    }
  }

  const mappedConditionIds = dataset.conditionMappings.map(mapping => mapping.conditionId);
  requireCondition(unique(mappedConditionIds), `public-data-condition-duplicate:${dataset.sourceId}`);
  requireCondition(mappedConditionIds.every(id => conditionIds.includes(id)), `public-data-condition-unknown:${dataset.sourceId}`);
  for (const mapping of dataset.conditionMappings) {
    requireCondition(conditionFidelities.has(mapping.fidelity), `public-data-condition-fidelity-invalid:${dataset.sourceId}:${mapping.conditionId}`);
    requireCondition(mapping.sourceFields.length > 0, `public-data-condition-source-missing:${dataset.sourceId}:${mapping.conditionId}`);
    requireCondition(mapping.nineClassCalibrationEligible === false, `public-data-condition-calibration-forbidden:${dataset.sourceId}:${mapping.conditionId}`);
  }

  requireCondition(dataset.probes.length > 0, `public-data-probe-missing:${dataset.sourceId}`);
  requireCondition(unique(dataset.probes.map(probe => probe.probeId)), `public-data-probe-id-duplicate:${dataset.sourceId}`);
  for (const probe of dataset.probes) {
    requireCondition(['HEAD', 'RANGE_HEADER'].includes(probe.method), `public-data-probe-method-invalid:${dataset.sourceId}:${probe.probeId}`);
    requireCondition(probe.url.startsWith('https://'), `public-data-probe-url-invalid:${dataset.sourceId}:${probe.probeId}`);
    requireCondition(!('headers' in probe), `public-data-probe-auth-header-forbidden:${dataset.sourceId}:${probe.probeId}`);
    if (probe.method === 'RANGE_HEADER') {
      requireCondition(probe.delimiter?.length === 1, `public-data-probe-delimiter-invalid:${dataset.sourceId}:${probe.probeId}`);
      requireCondition(probe.requiredColumns?.length > 0, `public-data-probe-required-columns-missing:${dataset.sourceId}:${probe.probeId}`);
    }
  }
}

const roles = new Set(registry.datasets.map(dataset => dataset.role));
for (const requiredRole of ['severity-safety-validation', 'syndromic-development', 'ambulatory-treatment-pattern-audit']) {
  requireCondition(roles.has(requiredRole), `public-data-required-role-missing:${requiredRole}`);
}

const serialized = JSON.stringify(registry).toLowerCase();
for (const forbiddenSecretKey of ['"password"', '"senha"', '"authorization"', '"api_key"', '"apikey"']) {
  requireCondition(!serialized.includes(forbiddenSecretKey), `public-data-secret-material-detected:${forbiddenSecretKey}`);
}

requireCondition(feasibility.includes('No open patient-level APS/SUS cohort identified'), 'public-data-target-domain-gap-missing');
requireCondition(feasibility.includes('Public data cannot promote the firewall'), 'public-data-firewall-boundary-missing');
requireCondition(feasibility.includes('SIVEP-Gripe'), 'public-data-sivep-documentation-missing');
requireCondition(feasibility.includes('NAMCS 2018'), 'public-data-namcs-documentation-missing');
requireCondition(sivepAudit.includes('minimum cell threshold is 30'), 'public-data-sivep-disclosure-threshold-missing');
requireCondition(sivepAudit.includes('simple marginal subtraction'), 'public-data-sivep-complementary-suppression-missing');
requireCondition(sivepAudit.includes('patientRowsPersisted=false'), 'public-data-sivep-row-persistence-boundary-missing');
requireCondition(sivepAudit.includes('firewall disposition `REFUSE`'), 'public-data-sivep-firewall-boundary-missing');
requireCondition(namcsAudit.includes('RFV omission always remains unknown'), 'public-data-namcs-missingness-boundary-missing');
requireCondition(namcsAudit.includes('prescriptionRecommendationAuthorized=false'), 'public-data-namcs-prescription-boundary-missing');
requireCondition(namcsAudit.includes('860,385,638.653'), 'public-data-namcs-weight-reconciliation-missing');
requireCondition(namcsHcAudit.includes('503,799'), 'public-data-namcs-hc-row-reconciliation-missing');
requireCondition(namcsHcAudit.includes('54 totals and ratios'), 'public-data-namcs-hc-parity-count-missing');
requireCondition(namcsHcAudit.includes('99 design degrees of freedom'), 'public-data-namcs-hc-degrees-freedom-missing');
requireCondition(namcsHcAudit.includes('patientRowsPersisted=false'), 'public-data-namcs-hc-row-persistence-boundary-missing');
requireCondition(namcsHcAudit.includes('not formal NCHS publication certification'), 'public-data-namcs-hc-reliability-boundary-missing');
requireCondition(namcsHcAudit.includes('prescriptionRecommendationAuthorized=false'), 'public-data-namcs-hc-prescription-boundary-missing');
requireCondition(esusAudit.includes('28 of 28 published CSV resources returned HTTP 403'), 'public-data-esus-endpoint-status-missing');
requireCondition(esusAudit.includes('patientRowsRead=false'), 'public-data-esus-row-read-boundary-missing');
requireCondition(esusAudit.includes('patientRowsPersisted=false'), 'public-data-esus-row-persistence-boundary-missing');
requireCondition(esusAudit.includes('extractionAuthorized=false'), 'public-data-esus-extraction-boundary-missing');
requireCondition(esusAudit.includes('unknownNeverCoercedToAbsent=true'), 'public-data-esus-missingness-boundary-missing');
requireCondition(esusAudit.includes('firewall disposition `REFUSE`'), 'public-data-esus-firewall-boundary-missing');
requireCondition(sinanAudit.includes('44,878 confirmed notifications'), 'public-data-sinan-grand-total-missing');
requireCondition(sinanAudit.includes('7,748'), 'public-data-sinan-2024-total-missing');
requireCondition(sinanAudit.includes('exactUnder18AgeBandAvailable=false'), 'public-data-sinan-age-boundary-missing');
requireCondition(sinanAudit.includes('symptomaticEncounterPriorEstimated=false'), 'public-data-sinan-prior-boundary-missing');
requireCondition(sinanAudit.includes('raw TabNet matrix and suppressed values are not persisted'), 'public-data-sinan-persistence-boundary-missing');
requireCondition(sinanAudit.includes('firewall disposition `REFUSE`'), 'public-data-sinan-firewall-boundary-missing');

const namcs2018 = registry.datasets.find(dataset => dataset.sourceId === 'us-namcs-office-2018');
const namcsHc2024 = registry.datasets.find(dataset => dataset.sourceId === 'us-namcs-health-center-2024');
const esus2024 = registry.datasets.find(dataset => dataset.sourceId === 'br-esus-notifica-sg-2024');
const sinanPertussis = registry.datasets.find(dataset => dataset.sourceId === 'br-sinan-pertussis-tabnet');
const namcsAgeUnder2 = namcs2018?.featureMappings.find(mapping => mapping.featureId === 'age_under_2');
requireCondition(namcsAgeUnder2?.rule.includes('AGE 0 or 1'), 'public-data-namcs-age-under-2-rule-invalid');
requireCondition(namcs2018?.probes.some(probe => probe.probeId === 'value-formats'), 'public-data-namcs-value-formats-probe-missing');
requireCondition(namcsHc2024?.population.description.includes('503,799'), 'public-data-namcs-hc-source-row-count-invalid');
requireCondition(namcsHc2024?.selectionBias.some(bias => bias.includes('27.9 percent')), 'public-data-namcs-hc-response-rate-boundary-missing');
requireCondition(esus2024?.access.level === 'public-metadata', 'public-data-esus-access-level-invalid');
requireCondition(esus2024?.access.retrievalStatus.includes('all 28 published state CSV endpoints returned HTTP 403'), 'public-data-esus-retrieval-status-invalid');
requireCondition(esus2024?.access.snapshot.includes('revalidated 2026-07-30'), 'public-data-esus-snapshot-review-missing');
requireCondition(esus2024?.allowedUses.some(use => use.includes('without reading response bodies')), 'public-data-esus-body-read-boundary-missing');
requireCondition(sinanPertussis?.access.patientLevel === false, 'public-data-sinan-patient-level-boundary-invalid');
requireCondition(sinanPertussis?.access.retrievalStatus.includes('hash-bound national age-by-symptom-year aggregate'), 'public-data-sinan-retrieval-status-invalid');
requireCondition(sinanPertussis?.access.snapshot.includes('symptom years 2007-2024'), 'public-data-sinan-snapshot-invalid');
requireCondition(sinanPertussis?.documentationUrls.some(url => url.includes('coquebr.def')), 'public-data-sinan-tabnet-form-missing');
requireCondition(sinanPertussis?.selectionBias.some(bias => bias.includes('15-19')), 'public-data-sinan-cross-boundary-age-missing');

const report = {
  schemaVersion: 'darwin.sounio.public-data-registry-validation.v1',
  status: 'public-data-prevalidation-package-valid',
  generatedAt: new Date().toISOString(),
  reviewedAt: registry.reviewedAt,
  sourceCount: registry.datasets.length,
  patientLevelSourceCount: registry.datasets.filter(dataset => dataset.access.patientLevel).length,
  aggregateSourceCount: registry.datasets.filter(dataset => !dataset.access.patientLevel).length,
  roleCoverage: [...roles].sort(),
  exactFeatureMappings: registry.datasets.reduce(
    (count, dataset) => count + dataset.featureMappings.filter(mapping => mapping.fidelity === 'exact').length,
    0,
  ),
  proxyOrPositiveOnlyMappings: registry.datasets.reduce(
    (count, dataset) => count + dataset.featureMappings.filter(mapping => ['proxy', 'positive-only'].includes(mapping.fidelity)).length,
    0,
  ),
  apsCalibrationAuthorized: false,
  clinicalActivationAuthorized: false,
  containsPatientRows: false,
  containsCredentials: false,
  hashes: {
    registrySha256: sha256(registryBytes),
    schemaSha256: sha256(schemaBytes),
    feasibilitySha256: sha256(readFileSync(feasibilityPath)),
    sivepAuditSha256: sha256(readFileSync(sivepAuditPath)),
    namcsAuditSha256: sha256(readFileSync(namcsAuditPath)),
    namcsHcAuditSha256: sha256(readFileSync(namcsHcAuditPath)),
    esusAuditSha256: sha256(readFileSync(esusAuditPath)),
    sinanAuditSha256: sha256(readFileSync(sinanAuditPath)),
  },
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
console.log('PUBLIC_CLINICAL_DATASET_REGISTRY_VALID');
