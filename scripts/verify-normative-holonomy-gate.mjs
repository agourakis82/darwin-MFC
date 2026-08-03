import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/normative-holonomy/formal');
const receiptPath = resolve(formalDir, 'normative-holonomy-gate.receipt.v0.9.json');
const runtimeEvidencePath = resolve(formalDir, 'evidence/runtime-verification.v0.9.json');
const leanEvidencePath = resolve(formalDir, 'evidence/lean-verification.v0.9.json');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256File = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const spawnJson = (command, arguments_, options = {}) => {
  const run = spawnSync(command, arguments_, {
    cwd: repoRoot,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    ...options,
  });
  if (run.error || run.status !== 0) {
    errors.push(
      `${arguments_[0]} failed: ${run.error?.message ?? run.stderr.trim() ?? run.stdout.trim()}`,
    );
    return {};
  }
  try {
    return JSON.parse(run.stdout);
  } catch (error) {
    errors.push(`${arguments_[0]} emitted invalid JSON: ${error.message}`);
    return {};
  }
};
const boundaryValid = (value) =>
  value.status === 'ABSTRACT_RESEARCH_ONLY' &&
  value.clinicalDisposition === 'REFUSE' &&
  value.clinicalUseAllowed === false &&
  value.productionAuthorized === false &&
  value.noveltyEstablished === false &&
  value.signed === false;
const artifactHashesValid = (receipt) =>
  (receipt.artifacts ?? []).every((artifact) => {
    const path = resolve(repoRoot, artifact.path);
    return sha256File(path) === artifact.sha256 && statSync(path).size === artifact.bytes;
  });

const receipt = readJson(receiptPath);
const runtimeEvidence = readJson(runtimeEvidencePath);
const leanEvidence = readJson(leanEvidencePath);
check(boundaryValid(receipt), 'receipt refusal/novelty boundary drift');
check(artifactHashesValid(receipt), 'one or more receipt artifact hashes drifted');

const runtime = spawnJson(process.execPath, ['scripts/verify-normative-holonomy.mjs']);
check(runtime.verified === true, 'runtime re-execution is not verified');
for (const key of [
  'wasm',
  'boundedDomain',
  'transcript',
  'nativeTranscriptSource',
  'vectors',
  'integrity',
  'independentOracle',
]) {
  check(
    JSON.stringify(runtime[key]) === JSON.stringify(runtimeEvidence[key]),
    `runtime evidence drift: ${key}`,
  );
}

const lean = spawnJson(process.execPath, ['scripts/verify-normative-holonomy-lean.mjs']);
check(lean.verified === true, 'Lean re-execution is not verified');
for (const key of ['toolchain', 'build', 'audit', 'artifacts', 'binarySemanticsMechanized']) {
  check(
    JSON.stringify(lean[key]) === JSON.stringify(leanEvidence[key]),
    `Lean evidence drift: ${key}`,
  );
}

const regenerated = spawnJson(
  process.execPath,
  ['scripts/generate-normative-holonomy-receipt.mjs'],
  {env: {...process.env, RECEIPT_GENERATED_AT: receipt.generatedAt}},
);
check(
  JSON.stringify(regenerated) === JSON.stringify(receipt),
  'stored receipt is not the deterministic reconstruction of current artifacts',
);

const tamperedHash = structuredClone(receipt);
tamperedHash.artifacts[0].sha256 = '0'.repeat(64);
const tamperedBoundary = structuredClone(receipt);
tamperedBoundary.productionAuthorized = true;
const tamperedNovelty = structuredClone(receipt);
tamperedNovelty.noveltyEstablished = true;
const tamperTests = {
  artifactHashRejected: !artifactHashesValid(tamperedHash),
  productionAuthorizationRejected: !boundaryValid(tamperedBoundary),
  noveltyOverclaimRejected: !boundaryValid(tamperedNovelty),
};
check(Object.values(tamperTests).every(Boolean), 'one or more negative tamper tests failed');

const result = {
  schema: 'darwin.normative-holonomy-gate-verification.v0.9',
  receiptPath,
  receiptSha256: sha256File(receiptPath),
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  noveltyEstablished: false,
  canonicalStates: runtime.boundedDomain?.canonicalStates ?? null,
  hostileStates: runtime.boundedDomain?.hostileStates ?? null,
  nativeWasmTranscriptSha256: receipt.nativeTranscript?.stdoutSha256 ?? null,
  leanCentralTheoremsAxiomFree: lean.audit?.centralTheoremsAxiomFree ?? false,
  compilerReconciled: receipt.compilerReconciled === true,
  nativeWasmCanonicalResultParityEstablished:
    receipt.nativeWasmCanonicalResultParityEstablished === true,
  tamperTests,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
