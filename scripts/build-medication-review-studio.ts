import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  MedicationDoseRuleCandidateV2,
  MedicationReviewReceiptV1,
  MedicationReviewSeedV1,
  MedicationReviewTaskV1,
  MedicationReviewRisk,
} from '../lib/medication-safety/review-types';
import type {
  CanonicalMedicationInteractionPairV1,
  MedicationIdentityBundleV1,
  MedicationIdentityConflictV1,
  MedicationLegacyAliasV1,
} from '../lib/medication-safety/identity-types';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'public/medication-safety');
const clinicalDir = resolve(root, 'clinical/medication-safety');
const identityBundlePath = resolve(publicDir, 'medication-identity-bundle.json');
const seedPath = resolve(publicDir, 'medication-review-seed.json');
const receiptPath = resolve(publicDir, 'medication-review.receipt.json');
const doseCandidatePath = resolve(clinicalDir, 'dose-rule-candidates.v2.json');
const doseRulesPath = resolve(clinicalDir, 'dose-rules.v1.json');

const sha256 = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
const jsonBytes = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nested]) => [key, stableValue(nested)]),
    );
  }
  return value;
}

function targetDigest(value: unknown): string {
  return sha256(JSON.stringify(stableValue(value)));
}

function taskId(bundleSha256: string, targetType: string, targetId: string, digest: string): string {
  return `rxr-${sha256(`${bundleSha256}|${targetType}|${targetId}|${digest}`).slice(0, 24)}`;
}

function interactionRisk(interaction: CanonicalMedicationInteractionPairV1): MedicationReviewRisk {
  if (interaction.severityConflict) return 'critical';
  const severityText = interaction.severities.join(' ').toLocaleLowerCase('pt-BR');
  if (/contraindic|grave|major|severe/.test(severityText)) return 'high';
  return 'routine';
}

function buildIdentityTask(
  conflict: MedicationIdentityConflictV1,
  bundle: MedicationIdentityBundleV1,
  bundleSha256: string,
  aliasesById: Map<string, MedicationLegacyAliasV1>,
): MedicationReviewTaskV1 {
  const digest = targetDigest(conflict);
  const aliases = conflict.legacyIds.map(id => aliasesById.get(id)).filter(Boolean) as MedicationLegacyAliasV1[];
  const canonicalIds = [...new Set(aliases.map(alias => alias.conceptId))].sort();
  const atcCodes = [...new Set(aliases.map(alias => alias.legacyAtcCode).filter(Boolean))] as string[];
  return {
    schemaVersion: 'darwin.medication-review-task.v1',
    id: taskId(bundleSha256, 'identity-conflict', conflict.id, digest),
    bundleVersion: bundle.bundleVersion,
    bundleSha256,
    targetType: 'identity-conflict',
    targetId: conflict.id,
    targetDigest: digest,
    category: 'identity',
    risk: 'high',
    status: 'OPEN',
    requiredReviewerRoles: ['pharmacist_reviewer', 'terminology_steward'],
    title: atcCodes.length > 0 ? `Reconciliação ATC ${atcCodes.join(' / ')}` : 'Reconciliação de identidade',
    summary: conflict.message,
    sourceStatus: 'evidence-required',
    legacyValues: aliases.map(alias => ({
      label: alias.displayName,
      value: alias.legacyAtcCode ? `ATC legado ${alias.legacyAtcCode}` : 'ATC legado ausente',
    })),
    target: conflict as unknown as Record<string, unknown>,
    metadata: {
      severityConflict: false,
      legacyIds: [...conflict.legacyIds].sort(),
      canonicalIds,
      deferred: false,
    },
  };
}

function buildInteractionTask(
  interaction: CanonicalMedicationInteractionPairV1,
  bundle: MedicationIdentityBundleV1,
  bundleSha256: string,
): MedicationReviewTaskV1 {
  const digest = targetDigest(interaction);
  const canonicalIds = interaction.endpoints
    .filter(endpoint => endpoint.kind === 'medication-concept')
    .map(endpoint => endpoint.id)
    .sort();
  return {
    schemaVersion: 'darwin.medication-review-task.v1',
    id: taskId(bundleSha256, 'interaction-pair', interaction.id, digest),
    bundleVersion: bundle.bundleVersion,
    bundleSha256,
    targetType: 'interaction-pair',
    targetId: interaction.id,
    targetDigest: digest,
    category: 'interaction',
    risk: interactionRisk(interaction),
    status: 'OPEN',
    requiredReviewerRoles: ['physician_reviewer', 'pharmacist_reviewer'],
    title: interaction.endpoints.map(endpoint => endpoint.label).join(' + '),
    summary: interaction.severityConflict
      ? `Conflito explícito de gravidade: ${interaction.severities.join(' versus ')}.`
      : `Par legado com ${interaction.observations.length} observação(ões); promoção clínica bloqueada.`,
    sourceStatus: interaction.sourceStatus,
    legacyValues: interaction.observations.map(observation => ({
      label: observation.severity,
      value: `${observation.effect} Conduta legada: ${observation.management}`,
      source: observation.source,
    })),
    target: interaction as unknown as Record<string, unknown>,
    metadata: {
      severityConflict: interaction.severityConflict,
      legacyIds: [...new Set(interaction.legacyRuleIds)].sort(),
      canonicalIds,
      deferred: false,
    },
  };
}

const identityBundleBytes = readFileSync(identityBundlePath);
const identityBundle = JSON.parse(identityBundleBytes.toString('utf8')) as MedicationIdentityBundleV1;
const identityBundleSha256 = sha256(identityBundleBytes);
const aliasesById = new Map(identityBundle.aliases.map(alias => [alias.id, alias]));

const identityTasks = identityBundle.conflicts
  .filter(conflict => conflict.type === 'atc-inconsistent')
  .map(conflict => buildIdentityTask(conflict, identityBundle, identityBundleSha256, aliasesById));
const interactionTasks = identityBundle.interactions
  .map(interaction => buildInteractionTask(interaction, identityBundle, identityBundleSha256));
const tasks = [...identityTasks, ...interactionTasks].sort((left, right) => (
  left.risk === right.risk
    ? left.title.localeCompare(right.title, 'pt-BR', { sensitivity: 'base' })
    : ({ critical: 0, high: 1, routine: 2 })[left.risk] - ({ critical: 0, high: 1, routine: 2 })[right.risk]
));

const rawCandidates = JSON.parse(readFileSync(doseCandidatePath, 'utf8')) as {
  candidates: Array<Omit<MedicationDoseRuleCandidateV2, 'medicationConceptId'> & { medicationLegacyId: string }>;
};
const doseRuleCandidates: MedicationDoseRuleCandidateV2[] = rawCandidates.candidates.map(candidate => {
  const { medicationLegacyId, ...rest } = candidate;
  return {
    ...rest,
    medicationConceptId: aliasesById.get(medicationLegacyId)?.conceptId ?? null,
  };
});
const doseReviewTasks: MedicationReviewTaskV1[] = doseRuleCandidates.map(candidate => {
  const digest = targetDigest(candidate);
  return {
    schemaVersion: 'darwin.medication-review-task.v1',
    id: taskId(identityBundleSha256, 'dose-rule', candidate.id, digest),
    bundleVersion: identityBundle.bundleVersion,
    bundleSha256: identityBundleSha256,
    targetType: 'dose-rule',
    targetId: candidate.id,
    targetDigest: digest,
    category: 'dose',
    risk: 'high',
    status: 'OPEN',
    requiredReviewerRoles: ['physician_reviewer', 'pharmacist_reviewer'],
    title: candidate.indicationLabel,
    summary: `Candidato estruturado sem matemática clínica: ${candidate.populationLabel}.`,
    sourceStatus: 'evidence-required',
    legacyValues: [],
    target: candidate as unknown as Record<string, unknown>,
    metadata: {
      severityConflict: false,
      legacyIds: [],
      canonicalIds: candidate.medicationConceptId ? [candidate.medicationConceptId] : [],
      deferred: true,
    },
  };
});

const deferredPresentationIds = identityBundle.products
  .filter(product => product.status !== 'resolved')
  .map(product => product.id)
  .sort();

if (identityTasks.length !== 25) throw new Error(`expected-25-identity-tasks-got-${identityTasks.length}`);
if (interactionTasks.length !== 152) throw new Error(`expected-152-interaction-tasks-got-${interactionTasks.length}`);
if (tasks.length !== 177) throw new Error(`expected-177-review-tasks-got-${tasks.length}`);
if (new Set(tasks.map(task => `${task.targetType}:${task.targetId}`)).size !== 177) throw new Error('duplicate-review-target');
if (interactionTasks.filter(task => task.metadata.severityConflict).length !== 7) throw new Error('severity-conflict-accounting-failed');
if (deferredPresentationIds.length !== 295) throw new Error('deferred-presentation-accounting-failed');
if (doseRuleCandidates.some(candidate => candidate.structuredRule !== null || candidate.productionAuthorized !== false)) {
  throw new Error('dose-candidate-can-calculate');
}
if (doseReviewTasks.length !== 5) throw new Error('expected-five-respiratory-dose-review-tasks');

const seed: MedicationReviewSeedV1 = {
  schemaVersion: 'darwin.medication-review-seed.v1',
  bundleVersion: identityBundle.bundleVersion,
  generatedAt: identityBundle.generatedAt,
  identityBundleSha256,
  tasks,
  doseReviewTasks,
  deferredPresentationIds,
  doseRuleCandidates,
  audit: {
    taskCount: 177,
    identityConflictTaskCount: 25,
    interactionTaskCount: 152,
    interactionSeverityConflictCount: 7,
    doseReviewTaskCount: 5,
    deferredPresentationCount: 295,
    promotedInteractionCount: 0,
    productionDoseRuleCount: 0,
  },
};

const seedBytes = jsonBytes(seed);
writeFileSync(seedPath, seedBytes);

const doseRules = JSON.parse(readFileSync(doseRulesPath, 'utf8')) as { rules: unknown[] };
if (doseRules.rules.length !== 0) throw new Error('production-dose-rules-must-remain-empty');

const receipt: MedicationReviewReceiptV1 = {
  schemaVersion: 'darwin.medication-review-receipt.v1',
  generatedAt: identityBundle.generatedAt,
  bundleVersion: identityBundle.bundleVersion,
  hashes: {
    identityBundleSha256,
    reviewSeedSha256: sha256(seedBytes),
    generatorSha256: sha256(readFileSync(fileURLToPath(import.meta.url))),
    doseRulesSha256: sha256(readFileSync(doseRulesPath)),
  },
  gates: {
    exactTaskCount: tasks.length === 177,
    noDuplicateTargets: new Set(tasks.map(task => `${task.targetType}:${task.targetId}`)).size === tasks.length,
    severityConflictsLinkedNotDuplicated: interactionTasks.filter(task => task.metadata.severityConflict).length === 7,
    presentationsDeferred: deferredPresentationIds.length === 295,
    doseCandidatesCannotCalculate: doseRuleCandidates.every(candidate => candidate.structuredRule === null),
    interactionsRemainNotPromoted: identityBundle.interactions.every(interaction => interaction.promotionStatus === 'not-promoted'),
    productionDoseRulesRemainEmpty: doseRules.rules.length === 0,
    productionAuthorized: false,
  },
  signature: null,
};

writeFileSync(receiptPath, jsonBytes(receipt));
console.log(JSON.stringify({
  schemaVersion: seed.schemaVersion,
  taskCount: tasks.length,
  identityConflictTaskCount: identityTasks.length,
  interactionTaskCount: interactionTasks.length,
  severityConflicts: interactionTasks.filter(task => task.metadata.severityConflict).length,
  deferredPresentations: deferredPresentationIds.length,
  doseRuleCandidates: doseRuleCandidates.length,
  doseReviewTasks: doseReviewTasks.length,
  productionAuthorized: false,
  reviewSeedSha256: receipt.hashes.reviewSeedSha256,
}, null, 2));
