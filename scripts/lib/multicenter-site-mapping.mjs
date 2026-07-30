import { createHash } from 'node:crypto';

export const SITE_MAPPING_SCHEMA_VERSION = 'darwin.sounio.site-mapping.v2';
export const SITE_HASH_DOMAIN = 'darwin.sounio.site:v1:';
export const REPRESENTATION_VARIABLE_IDS = [
  'sex_at_birth',
  'race_skin_color',
  'comorbidity',
  'immunization',
  'geography',
  'socioeconomic_proxy',
];

const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const SITE_CODE_PATTERN = /^[A-Z][A-Z0-9_-]{2,31}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function siteHashForCode(siteCode) {
  return sha256(Buffer.from(`${SITE_HASH_DOMAIN}${siteCode}`, 'utf8'));
}

export function computeSiteMappingSha256(mapping) {
  const payload = structuredClone(mapping);
  payload.approval = { ...payload.approval, mappingSha256: null };
  return sha256(Buffer.from(stableStringify(payload), 'utf8'));
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function validDate(value) {
  return typeof value === 'string'
    && DATE_PATTERN.test(value)
    && new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
}

function placeholderFree(value) {
  if (typeof value === 'string') return !value.includes('REPLACE_WITH');
  if (Array.isArray(value)) return value.every(placeholderFree);
  if (value && typeof value === 'object') return Object.values(value).every(placeholderFree);
  return true;
}

function validOptionalExpiry(value, asOf, context) {
  if (value === null) return;
  requireCondition(validDate(value), `${context}-invalid`);
  requireCondition(value >= asOf, `${context}-expired`);
}

export function validateSiteMapping(mapping, options = {}) {
  const {
    asOf = new Date().toISOString().slice(0, 10),
    featureIds,
    requireLocked = false,
    allowSynthetic = false,
  } = options;

  requireCondition(mapping && typeof mapping === 'object' && !Array.isArray(mapping), 'site-mapping-invalid');
  requireCondition(mapping.schemaVersion === SITE_MAPPING_SCHEMA_VERSION, 'site-mapping-schema-mismatch');
  requireCondition(['clinical-site', 'synthetic-fixture'].includes(mapping.siteKind), 'site-mapping-kind-invalid');
  if (mapping.siteKind === 'synthetic-fixture') {
    requireCondition(allowSynthetic, 'site-mapping-synthetic-not-allowed');
  }
  requireCondition(SITE_CODE_PATTERN.test(mapping.siteCode), 'site-mapping-site-code-invalid');
  requireCondition(mapping.siteHash === siteHashForCode(mapping.siteCode), 'site-mapping-site-hash-mismatch');
  requireCondition(typeof mapping.sourceSystem === 'string' && mapping.sourceSystem.length > 0, 'site-mapping-source-system-missing');
  requireCondition(mapping.dictionaryVersion === '1.0.0', 'site-mapping-dictionary-version-mismatch');
  requireCondition(mapping.cohortSchemaVersion === 'darwin.sounio.retrospective-cohort.v1', 'site-mapping-cohort-schema-mismatch');

  const governance = mapping.governance;
  requireCondition(governance && typeof governance === 'object', 'site-mapping-governance-missing');
  for (const key of [
    'researchProtocolId',
    'coordinatingCenterCode',
    'participatingCenterCode',
    'ethicsApprovalId',
    'databaseControllerAuthorizationId',
    'dataUseAgreementId',
    'multicenterDataUseApprovalId',
    'legalBasisAssessmentId',
    'ripdId',
    'dataControllerCode',
    'dataProcessorCode',
  ]) {
    requireCondition(typeof governance[key] === 'string' && governance[key].length > 0, `site-mapping-governance-${key}-missing`);
  }
  requireCondition(
    ['single-review-coordinating-cep', 'local-review'].includes(governance.ethicsReviewModel),
    'site-mapping-ethics-review-model-invalid',
  );
  requireCondition(validDate(governance.ethicsApprovalIssuedAt), 'site-mapping-ethics-approval-date-invalid');
  requireCondition(governance.ethicsApprovalIssuedAt <= asOf, 'site-mapping-ethics-approval-in-future');
  validOptionalExpiry(governance.ethicsApprovalValidUntil, asOf, 'site-mapping-ethics-approval');
  validOptionalExpiry(governance.dataUseAgreementValidUntil, asOf, 'site-mapping-data-use-agreement');
  requireCondition(governance.localResponsibilityAttested === true, 'site-mapping-local-responsibility-missing');
  requireCondition(governance.researchBodyEligibilityAttested === true, 'site-mapping-research-body-attestation-missing');
  requireCondition(governance.databaseControllerAuthorizationAttested === true, 'site-mapping-database-controller-attestation-missing');
  requireCondition(governance.dpoChannelHeldOffRepository === true, 'site-mapping-dpo-channel-boundary-invalid');

  requireCondition(mapping.indexEncounter?.selectionRule?.length > 0, 'site-mapping-index-rule-missing');
  requireCondition(mapping.indexEncounter?.encounterDateField?.length > 0, 'site-mapping-index-date-field-missing');
  requireCondition(mapping.indexEncounter?.ageDaysDerivation?.length > 0, 'site-mapping-age-derivation-missing');
  requireCondition(mapping.pseudonyms?.algorithm === 'HMAC-SHA-256', 'site-mapping-pseudonym-algorithm-mismatch');
  requireCondition(mapping.pseudonyms?.siteHeldSecretNeverExported === true, 'site-mapping-secret-boundary-invalid');
  for (const key of ['patientSourceField', 'encounterSourceField']) {
    requireCondition(typeof mapping.pseudonyms?.[key] === 'string' && mapping.pseudonyms[key].length > 0, `site-mapping-pseudonym-${key}-missing`);
  }
  requireCondition(
    mapping.pseudonyms?.siteHashDerivation === 'SHA-256(darwin.sounio.site:v1:<siteCode>)',
    'site-mapping-site-hash-derivation-invalid',
  );

  const observationIds = mapping.observations?.map(observation => observation.featureId) ?? [];
  requireCondition(observationIds.length === 12, 'site-mapping-observation-count-mismatch');
  if (featureIds) {
    requireCondition(JSON.stringify(observationIds) === JSON.stringify(featureIds), 'site-mapping-feature-order-mismatch');
  }
  requireCondition(mapping.observations.every(observation => (
    Array.isArray(observation.sourceFields)
      && observation.sourceFields.length > 0
      && observation.sourceFields.every(field => typeof field === 'string' && field.length > 0)
      && typeof observation.transformation === 'string'
      && observation.transformation.length > 0
  )), 'site-mapping-observation-incomplete');

  requireCondition(mapping.referenceStandard?.adjudicationMethod === 'chart-review-double', 'site-mapping-double-adjudication-required');
  requireCondition(mapping.referenceStandard?.adjudicatorsBlindedToKernel === true, 'site-mapping-adjudicator-blinding-required');
  requireCondition(mapping.referenceStandard?.conditionSourceFields?.length > 0, 'site-mapping-condition-source-missing');
  requireCondition(mapping.referenceStandard?.severityOutcomeSourceFields?.length > 0, 'site-mapping-severity-source-missing');
  requireCondition(mapping.referenceStandard?.disagreementResolution?.length > 0, 'site-mapping-adjudication-incomplete');

  requireCondition(mapping.missingness?.unknownCode === -1, 'site-mapping-unknown-code-invalid');
  requireCondition(mapping.missingness?.absentCode === 0, 'site-mapping-absent-code-invalid');
  requireCondition(mapping.missingness?.presentCode === 1, 'site-mapping-present-code-invalid');
  requireCondition(mapping.missingness?.notDocumentedMapsTo === -1, 'site-mapping-not-documented-policy-invalid');

  const privacy = mapping.privacy;
  for (const key of [
    'freeTextExported',
    'directIdentifiersExported',
    'dateOfBirthExported',
    'linkageTableLeavesSite',
    'crossBorderTransfer',
  ]) {
    requireCondition(privacy?.[key] === false, `site-mapping-privacy-${key}-forbidden`);
  }
  requireCondition(privacy?.minimumNecessaryAttested === true, 'site-mapping-minimum-necessary-missing');
  for (const key of ['reidentificationRiskAssessmentId', 'secureEnvironmentAssessmentId', 'retentionPlanId', 'breachResponsePlanId']) {
    requireCondition(typeof privacy?.[key] === 'string' && privacy[key].length > 0, `site-mapping-privacy-${key}-missing`);
  }

  const representation = mapping.representation;
  requireCondition(representation?.careSetting === 'APS-SUS', 'site-mapping-care-setting-invalid');
  requireCondition(validDate(representation?.coverageStart), 'site-mapping-coverage-start-invalid');
  requireCondition(validDate(representation?.coverageEnd), 'site-mapping-coverage-end-invalid');
  requireCondition(representation.coverageStart <= representation.coverageEnd, 'site-mapping-coverage-range-invalid');
  requireCondition(representation?.sourcePopulationDescription?.length > 0, 'site-mapping-source-population-missing');
  requireCondition(representation?.inclusionExclusionProtocolId?.length > 0, 'site-mapping-inclusion-protocol-missing');
  const representationIds = representation?.variables?.map(variable => variable.id) ?? [];
  requireCondition(
    JSON.stringify(representationIds) === JSON.stringify(REPRESENTATION_VARIABLE_IDS),
    'site-mapping-representation-variable-order-mismatch',
  );
  for (const variable of representation.variables) {
    requireCondition(
      ['available-mapped', 'unavailable-source', 'not-approved'].includes(variable.availability),
      `site-mapping-representation-${variable.id}-availability-invalid`,
    );
    if (variable.availability === 'available-mapped') {
      requireCondition(variable.sourceFields?.length > 0, `site-mapping-representation-${variable.id}-source-missing`);
      requireCondition(variable.transformation?.length > 0, `site-mapping-representation-${variable.id}-transformation-missing`);
    } else {
      requireCondition(variable.sourceFields?.length === 0, `site-mapping-representation-${variable.id}-unexpected-source`);
      requireCondition(variable.transformation === null, `site-mapping-representation-${variable.id}-unexpected-transformation`);
    }
  }

  if (requireLocked) {
    requireCondition(mapping.status === 'locked', 'site-mapping-not-locked');
    requireCondition(placeholderFree(mapping), 'site-mapping-placeholder-present');
    requireCondition(mapping.approval?.mappingLocked === true, 'site-mapping-lock-attestation-missing');
    for (const key of ['clinicalReviewerId', 'dataStewardId', 'principalInvestigatorId']) {
      requireCondition(typeof mapping.approval?.[key] === 'string' && mapping.approval[key].length > 0, `site-mapping-approval-${key}-missing`);
    }
    requireCondition(validDate(mapping.approval?.lockedAt), 'site-mapping-locked-at-invalid');
    requireCondition(mapping.approval.lockedAt <= asOf, 'site-mapping-locked-in-future');
    requireCondition(validDate(mapping.approval?.reviewDueAt), 'site-mapping-review-due-invalid');
    requireCondition(mapping.approval.reviewDueAt >= asOf, 'site-mapping-review-expired');
    requireCondition(mapping.approval?.documentsHeldOffRepository === true, 'site-mapping-document-boundary-invalid');
    requireCondition(SHA256_PATTERN.test(mapping.approval?.mappingSha256), 'site-mapping-lock-hash-invalid');
    requireCondition(mapping.approval.mappingSha256 === computeSiteMappingSha256(mapping), 'site-mapping-lock-hash-mismatch');
  } else {
    requireCondition(['draft', 'locked', 'retired'].includes(mapping.status), 'site-mapping-status-invalid');
  }

  return {
    siteCode: mapping.siteCode,
    siteHash: mapping.siteHash,
    siteKind: mapping.siteKind,
    mappingSha256: mapping.approval?.mappingSha256 ?? null,
  };
}

export function lockSiteMapping(mapping, options = {}) {
  const { lockedAt = new Date().toISOString().slice(0, 10), allowSynthetic = false, featureIds } = options;
  requireCondition(mapping.status === 'draft', 'site-mapping-lock-requires-draft');
  const locked = structuredClone(mapping);
  locked.status = 'locked';
  locked.siteHash = siteHashForCode(locked.siteCode);
  locked.approval = {
    ...locked.approval,
    mappingLocked: true,
    lockedAt,
    mappingSha256: null,
  };
  locked.approval.mappingSha256 = computeSiteMappingSha256(locked);
  validateSiteMapping(locked, {
    asOf: lockedAt,
    requireLocked: true,
    allowSynthetic,
    featureIds,
  });
  return locked;
}
