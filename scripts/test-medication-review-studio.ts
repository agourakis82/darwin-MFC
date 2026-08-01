import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { MedicationReviewReceiptV1, MedicationReviewSeedV1 } from '../lib/medication-safety/review-types';
import {
  toFhirMedicationReviewAuditEvent,
  toFhirMedicationReviewProvenance,
  toFhirMedicationReviewTask,
} from '../lib/medication-safety/review-fhir';

const root = process.cwd();
const publicDir = resolve(root, 'public/medication-safety');
const clinicalDir = resolve(root, 'clinical/medication-safety');
const sha256 = (value: Buffer | string) => createHash('sha256').update(value).digest('hex');
const seedBytes = readFileSync(resolve(publicDir, 'medication-review-seed.json'));
const receiptBytes = readFileSync(resolve(publicDir, 'medication-review.receipt.json'));
const identityBytes = readFileSync(resolve(publicDir, 'medication-identity-bundle.json'));
const doseRulesBytes = readFileSync(resolve(clinicalDir, 'dose-rules.v1.json'));
const generatorBytes = readFileSync(resolve(root, 'scripts/build-medication-review-studio.ts'));
const seed = JSON.parse(seedBytes.toString('utf8')) as MedicationReviewSeedV1;
const receipt = JSON.parse(receiptBytes.toString('utf8')) as MedicationReviewReceiptV1;
const doseRules = JSON.parse(doseRulesBytes.toString('utf8')) as { rules: unknown[] };

assert.equal(seed.schemaVersion, 'darwin.medication-review-seed.v1');
assert.equal(seed.tasks.length, 177);
assert.equal(seed.tasks.filter(task => task.targetType === 'identity-conflict').length, 25);
assert.equal(seed.tasks.filter(task => task.targetType === 'interaction-pair').length, 152);
assert.equal(seed.tasks.filter(task => task.metadata.severityConflict).length, 7);
assert.equal(new Set(seed.tasks.map(task => task.id)).size, 177);
assert.equal(new Set(seed.tasks.map(task => `${task.targetType}:${task.targetId}`)).size, 177);
assert.equal(seed.deferredPresentationIds.length, 295);
assert.equal(seed.doseRuleCandidates.length, 5);
assert.equal(seed.doseReviewTasks.length, 5);
assert.equal(seed.doseReviewTasks.every(task => task.targetType === 'dose-rule' && task.metadata.deferred), true);
assert.equal(new Set(seed.doseReviewTasks.map(task => task.id)).size, 5);
assert.equal(seed.doseRuleCandidates.every(candidate => candidate.structuredRule === null), true);
assert.equal(seed.doseRuleCandidates.every(candidate => candidate.productionAuthorized === false), true);
assert.equal(seed.doseRuleCandidates.every(candidate => candidate.status === 'evidence-required'), true);
assert.equal(doseRules.rules.length, 0);

assert.equal(receipt.schemaVersion, 'darwin.medication-review-receipt.v1');
assert.equal(receipt.signature, null);
assert.equal(receipt.gates.productionAuthorized, false);
assert.equal(Object.values(receipt.gates).every(value => value === true || value === false), true);
assert.equal(receipt.hashes.reviewSeedSha256, sha256(seedBytes));
assert.equal(receipt.hashes.identityBundleSha256, sha256(identityBytes));
assert.equal(receipt.hashes.doseRulesSha256, sha256(doseRulesBytes));
assert.equal(receipt.hashes.generatorSha256, sha256(generatorBytes));

for (const [bytes, expected] of [
  [seedBytes, receipt.hashes.reviewSeedSha256],
  [identityBytes, receipt.hashes.identityBundleSha256],
  [doseRulesBytes, receipt.hashes.doseRulesSha256],
] as const) {
  const tampered = Buffer.from(bytes);
  tampered[Math.max(0, tampered.length - 1)] ^= 1;
  assert.notEqual(sha256(tampered), expected);
}

assert.equal(seed.tasks.every(task => task.status === 'OPEN'), true);
assert.equal(seed.tasks.every(task => task.bundleSha256 === seed.identityBundleSha256), true);
assert.equal(seed.tasks.filter(task => task.category === 'interaction').every(task => (
  task.requiredReviewerRoles.join(',') === 'physician_reviewer,pharmacist_reviewer'
)), true);
assert.equal(seed.tasks.filter(task => task.category === 'identity').every(task => (
  task.requiredReviewerRoles.join(',') === 'pharmacist_reviewer,terminology_steward'
)), true);

const migrationSource = readFileSync(resolve(root, 'supabase/migrations/017_medication_review_studio.sql'), 'utf8');
assert.equal(migrationSource.includes('protect_public_users_role'), true);
assert.equal(migrationSource.includes('public-users-role-is-not-a-clinical-credential'), true);
assert.equal(migrationSource.includes('independent-reviewer-required'), true);
assert.equal(migrationSource.includes('stale-review-target'), true);
assert.equal(migrationSource.includes('Decisions remain blinded until consensus'), true);
assert.equal(migrationSource.includes('clinical-field-overlay-forbidden'), true);
assert.equal(migrationSource.includes("'commercialAliases', 'searchSynonyms', 'editorialSummary'"), true);
assert.equal(/CREATE POLICY[^;]+medication_review_decisions[^;]+FOR INSERT/is.test(migrationSource), false);
assert.equal(/CREATE POLICY[^;]+medication_review_events[^;]+FOR INSERT/is.test(migrationSource), false);

const task = seed.tasks[0];
const decisionIds = ['00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000002'];
const decisions = decisionIds.map((id, index) => ({
  schemaVersion: 'darwin.medication-review-decision.v1' as const,
  id,
  taskId: task.id,
  reviewerId: `00000000-0000-4000-8000-00000000000${index + 3}`,
  reviewerRole: task.requiredReviewerRoles[index],
  taskDigest: task.targetDigest,
  decision: 'approve' as const,
  proposedPatch: {},
  rationale: 'Synthetic interoperability fixture only.',
  decidedAt: seed.generatedAt,
}));
const consensus = {
  schemaVersion: 'darwin.medication-review-consensus.v1' as const,
  taskId: task.id,
  bundleSha256: task.bundleSha256,
  targetDigest: task.targetDigest,
  decisionIds,
  result: 'approved' as const,
  disposition: 'reviewed-candidate' as const,
  finalPatch: {},
  receiptDigest: 'a'.repeat(64),
  reachedAt: seed.generatedAt,
};
const fhirTask = toFhirMedicationReviewTask(task);
const fhirProvenance = toFhirMedicationReviewProvenance(task, decisions, consensus);
const fhirAudit = toFhirMedicationReviewAuditEvent({
  taskId: task.id,
  actorId: decisions[0].reviewerId,
  eventType: 'review-decision-submitted',
  recordedAt: seed.generatedAt,
  eventDigest: 'b'.repeat(64),
});
assert.equal(fhirTask.resourceType, 'Task');
assert.equal(fhirTask.status, 'requested');
assert.equal(fhirTask.intent, 'proposal');
assert.equal(fhirProvenance.resourceType, 'Provenance');
assert.equal(fhirProvenance.agent.length, 2);
assert.equal(fhirAudit.resourceType, 'AuditEvent');
assert.equal(fhirAudit.entity[0].detail[0].valueString, 'b'.repeat(64));

console.log('MEDICATION_REVIEW_STUDIO_VALID');
console.log(JSON.stringify({
  passed: true,
  taskCount: seed.tasks.length,
  severityConflicts: seed.tasks.filter(task => task.metadata.severityConflict).length,
  deferredPresentations: seed.deferredPresentationIds.length,
  doseRuleCandidates: seed.doseRuleCandidates.length,
  doseReviewTasks: seed.doseReviewTasks.length,
  productionAuthorized: false,
  fhirResources: ['Task', 'Provenance', 'AuditEvent'],
  directDecisionInsertPolicy: false,
}, null, 2));
