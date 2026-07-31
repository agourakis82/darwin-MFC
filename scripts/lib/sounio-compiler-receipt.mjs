import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const COMPILER_SOURCE_RECEIPT_SCHEMA = 'darwin.sounio.compiler-source-receipt.v1';
export const EXPECTED_SOURCE_BRANCH = 'integration/sounio-dev-ready-base';

export const sha256 = value => createHash('sha256').update(value).digest('hex');
export const isSha256 = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const isGitObjectId = value => typeof value === 'string' && /^[a-f0-9]{40,64}$/.test(value);

function requireCondition(condition, reason) {
  if (!condition) throw new Error(reason);
}

export function validateCompilerSourceReceipt(
  receipt,
  { expectedCompilerSha256, requireReconciled = false } = {},
) {
  requireCondition(receipt && typeof receipt === 'object', 'compiler-source-receipt-invalid');
  requireCondition(
    receipt.schemaVersion === COMPILER_SOURCE_RECEIPT_SCHEMA,
    'compiler-source-receipt-schema-mismatch',
  );
  requireCondition(receipt.repository?.sourceBranch === EXPECTED_SOURCE_BRANCH, 'compiler-source-branch-mismatch');
  requireCondition(receipt.repository?.clean === true, 'compiler-source-repository-dirty');
  requireCondition(
    receipt.repository?.commit === receipt.repository?.remoteBranchCommit,
    'compiler-source-commit-divergent',
  );
  requireCondition(isGitObjectId(receipt.repository?.tree), 'compiler-source-tree-invalid');
  requireCondition(isSha256(receipt.hashes?.sourceManifestSha256), 'compiler-source-manifest-hash-invalid');
  requireCondition(isSha256(receipt.hashes?.compilerSourceSha256), 'compiler-source-hash-invalid');
  requireCondition(isSha256(receipt.hashes?.seedSha256), 'compiler-seed-hash-invalid');
  requireCondition(receipt.source?.seed?.sha256 === receipt.hashes.seedSha256, 'compiler-seed-hash-mismatch');
  requireCondition(isSha256(receipt.hashes?.compilerSha256), 'compiler-artifact-hash-invalid');
  requireCondition(
    receipt.artifacts?.compiler?.sha256 === receipt.hashes.compilerSha256,
    'compiler-artifact-receipt-hash-mismatch',
  );
  if (expectedCompilerSha256) {
    requireCondition(
      expectedCompilerSha256 === receipt.hashes.compilerSha256,
      'compiler-artifact-hash-mismatch',
    );
  }

  const requiredGates = [
    'sourceRepositoryClean',
    'sourceBranchPinned',
    'sourceCommitMatchesRemote',
    'seedTrackedAtPinnedCommit',
    'sourceBootstrapForced',
    'fixedPointBitwise',
    'selfHostReproducibility',
    'selfHostRelease',
    'noRustMarkers',
  ];
  const gatesPassed = requiredGates.every(gate => receipt.gates?.[gate] === true);
  const internallyReconciled = gatesPassed
    && receipt.repository.clean === true
    && receipt.repository.commit === receipt.repository.remoteBranchCommit
    && receipt.artifacts?.fixedPointStage2?.sha256 === receipt.hashes.compilerSha256
    && receipt.artifacts?.fixedPointStage3?.sha256 === receipt.hashes.compilerSha256
    && receipt.signature === null;

  requireCondition(
    receipt.compilerReconciled === internallyReconciled,
    'compiler-reconciled-claim-invalid',
  );
  if (requireReconciled) requireCondition(internallyReconciled, 'compiler-source-not-reconciled');

  return {
    compilerReconciled: internallyReconciled,
    compilerSha256: receipt.hashes.compilerSha256,
    branch: receipt.repository.sourceBranch,
    commit: receipt.repository.commit,
    tree: receipt.repository.tree,
  };
}

export function loadCompilerSourceReceipt(path, options = {}) {
  if (!path) throw new Error('compiler-source-receipt-path-missing');
  const bytes = readFileSync(path);
  const receipt = JSON.parse(bytes.toString('utf8'));
  const validation = validateCompilerSourceReceipt(receipt, options);
  return { bytes, receipt, validation };
}
