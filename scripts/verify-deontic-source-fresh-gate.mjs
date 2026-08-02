import {createHash} from 'node:crypto';
import {readFileSync, statSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal',
);
const compilerReceiptPath = resolve(
  formalDir,
  'compiler-source-fresh.receipt.v0.4.json',
);
const evidencePath = resolve(
  formalDir,
  'evidence/semantic-refinement-evidence.v0.4.json',
);
const receiptPath = resolve(
  formalDir,
  'formal-semantic-refinement.receipt.v0.4.json',
);
const parentReceiptPath = resolve(
  formalDir,
  'formal-wasm-gate.receipt.v0.3.json',
);
const sourcePath = resolve(
  formalDir,
  'sounio/deontic_transport_finite_wasm_v0_4.sio',
);
const wasmPath = resolve(
  formalDir,
  'wasm/deontic_transport_finite.v0.4.wasm',
);
const closurePath = resolve(
  formalDir,
  'wasm/source-fresh-semantic-closure-v0.4.md',
);
const semanticVerifierPath = resolve(
  repoRoot,
  'scripts/verify-deontic-semantic-refinement.mjs',
);

const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256File = (path) =>
  createHash('sha256').update(readFileSync(path)).digest('hex');
const isSha256 = (value) => /^[0-9a-f]{64}$/.test(value ?? '');
const readJson = (path, label) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    errors.push(`${label}: invalid JSON (${error.message})`);
    return {};
  }
};

const compilerReceipt = readJson(compilerReceiptPath, 'compiler receipt');
const evidence = readJson(evidencePath, 'evidence');
const receipt = readJson(receiptPath, 'receipt');
const closure = readFileSync(closurePath, 'utf8');

const semanticRun = spawnSync(
  process.execPath,
  [semanticVerifierPath, wasmPath],
  {encoding: 'utf8', maxBuffer: 8 * 1024 * 1024},
);
let semanticResult = {};
if (semanticRun.status !== 0 || semanticRun.error) {
  errors.push(
    `semantic verifier failed: ${semanticRun.error?.message ?? semanticRun.stderr.trim()}`,
  );
} else {
  try {
    semanticResult = JSON.parse(semanticRun.stdout);
  } catch (error) {
    errors.push(`semantic verifier returned invalid JSON: ${error.message}`);
  }
}

check(
  compilerReceipt.schema === 'darwin.sounio.compiler-source-receipt.v1',
  'compiler receipt: unexpected schema',
);
check(
  compilerReceipt.status === 'SOURCE_FRESH_RECONCILED',
  'compiler receipt: source-fresh status missing',
);
check(
  compilerReceipt.compilerReconciled === true,
  'compiler receipt: compiler reconciliation missing',
);
check(compilerReceipt.signed === false, 'compiler receipt: unexpected signature claim');
check(
  compilerReceipt.repository?.url === 'https://github.com/Sounio-lang/sounio.git',
  'compiler receipt: repository identity drift',
);
check(
  compilerReceipt.repository?.branch ===
    'codex/madaros-wasm-deontic-v3-20260802',
  'compiler receipt: branch identity drift',
);
check(
  /^[0-9a-f]{40}$/.test(compilerReceipt.repository?.commit ?? ''),
  'compiler receipt: invalid commit identity',
);
check(
  /^[0-9a-f]{40}$/.test(compilerReceipt.repository?.tree ?? ''),
  'compiler receipt: invalid tree identity',
);
check(compilerReceipt.repository?.clean === true, 'compiler receipt: dirty source hidden');
check(
  compilerReceipt.repository?.aheadOfOriginMain === 2 &&
    compilerReceipt.repository?.behindOriginMain === 0,
  'compiler receipt: origin/main divergence drift',
);

const sourceEntries = compilerReceipt.repository?.sourceFiles ?? [];
const sourcePaths = sourceEntries.map((entry) => entry.path);
check(sourceEntries.length === 17, 'compiler receipt: source manifest cardinality drift');
check(
  new Set(sourcePaths).size === sourcePaths.length,
  'compiler receipt: duplicate source manifest path',
);
for (const entry of sourceEntries) {
  check(typeof entry.path === 'string' && entry.path.length > 0, 'compiler receipt: empty source path');
  check(isSha256(entry.sha256), `${entry.path}: invalid source SHA-256`);
}
for (const requiredPath of [
  'self-hosted/compiler/module_native_driver.sio',
  'self-hosted/wasm/lower.sio',
  'scripts/ci/build_modular_madaros.sh',
  'scripts/ci/madaros_wasm_backend_gate.mjs',
  'tests/wasm/deontic_transport_finite_wasm_v0_4.sio',
]) {
  check(sourcePaths.includes(requiredPath), `${requiredPath}: missing from source manifest`);
}

const stages = compilerReceipt.bootstrap?.fixedPointStages ?? [];
check(stages.length === 3, 'compiler receipt: fixed-point stage count drift');
check(
  stages.every((stage) => stage.sha256 === compilerReceipt.bootstrap?.seedSha256),
  'compiler receipt: fixed-point SHA-256 mismatch',
);
check(
  stages.every((stage) => stage.md5 === compilerReceipt.bootstrap?.seedMd5),
  'compiler receipt: fixed-point MD5 mismatch',
);
check(
  compilerReceipt.bootstrap?.fixedPointBitIdentical === true,
  'compiler receipt: fixed-point gate missing',
);
check(
  compilerReceipt.bootstrap?.canonicalCompilerGateVerified === true,
  'compiler receipt: canonical compiler gate missing',
);
check(
  compilerReceipt.bootstrap?.bootstrapChain?.passed === 8 &&
    compilerReceipt.bootstrap?.bootstrapChain?.failed === 0,
  'compiler receipt: bootstrap S1-S8 incomplete',
);

check(isSha256(compilerReceipt.compiler?.sha256), 'compiler receipt: invalid compiler hash');
check(
  compilerReceipt.compiler?.sha256 === compilerReceipt.compiler?.repeatSha256,
  'compiler receipt: nondeterministic compiler builds',
);
check(
  compilerReceipt.compiler?.deterministic === true,
  'compiler receipt: deterministic build gate missing',
);
check(
  compilerReceipt.compiler?.errorDiagnostics === 0 &&
    compilerReceipt.compiler?.diagnosticGatePassed === true,
  'compiler receipt: error diagnostics hidden',
);
const expectedVersion = {
  abi_version: 1,
  runtime_version: '1.0.0',
  ir_max_funcs: 1024,
  ir_max_instrs: 128,
  supports_ffi: true,
  supports_gpu: false,
};
check(
  JSON.stringify(compilerReceipt.compiler?.versionJson) ===
    JSON.stringify(expectedVersion),
  'compiler receipt: version JSON drift',
);
check(
  compilerReceipt.gates?.every((gate) => gate.verified === true),
  'compiler receipt: one or more gates are not verified',
);

check(
  evidence.schema === 'darwin.deontic-transport-semantic-evidence.v0.4',
  'evidence: unexpected schema',
);
check(evidence.clinicalDisposition === 'REFUSE', 'evidence: must remain REFUSE');
check(evidence.clinicalUseAllowed === false, 'evidence: clinical use must remain false');
check(evidence.productionAuthorized === false, 'evidence: production must remain false');
check(evidence.noveltyEstablished === false, 'evidence: novelty overclaimed');
check(
  evidence.parent?.sha256 === sha256File(parentReceiptPath),
  'evidence: parent receipt hash mismatch',
);
check(
  evidence.compilerReceipt?.sha256 === sha256File(compilerReceiptPath),
  'evidence: compiler receipt hash mismatch',
);
check(evidence.source?.sha256 === sha256File(sourcePath), 'evidence: source hash mismatch');
check(evidence.wasm?.sha256 === sha256File(wasmPath), 'evidence: WASM hash mismatch');
check(evidence.wasm?.bytes === statSync(wasmPath).size, 'evidence: WASM size mismatch');
check(evidence.wasm?.imports?.length === 0, 'evidence: WASM imports hidden');
check(evidence.wasm?.mainResult === 87, 'evidence: WASM self-check mismatch');
check(evidence.native?.executionExitCode === 87, 'evidence: native self-check mismatch');
check(evidence.native?.deterministic === true, 'evidence: native build drift');
check(
  evidence.verdict?.compilerReconciled === true,
  'evidence: compiler reconciliation missing',
);
check(
  evidence.verdict?.nativeWasmParityEstablished === true,
  'evidence: native/WASM parity missing',
);
check(
  evidence.semanticCoverage?.validFamilies === 87381 &&
    evidence.semanticCoverage?.pairCases === 16 &&
    evidence.semanticCoverage?.rejectionCases === 438,
  'evidence: exhaustive coverage drift',
);
check(evidence.lean?.buildVerified === true, 'evidence: Lean build missing');
check(evidence.lean?.sorryCount === 0, 'evidence: Lean sorry hidden');
check(evidence.lean?.nativeDecideCount === 0, 'evidence: Lean native_decide hidden');
check(
  JSON.stringify(evidence.lean?.centralTheoremAxioms) === JSON.stringify(['propext']),
  'evidence: Lean central-theorem axioms drift',
);

check(
  receipt.schema === 'darwin.deontic-transport-source-fresh-gate-receipt.v0.4',
  'receipt: unexpected schema',
);
check(receipt.clinicalDisposition === 'REFUSE', 'receipt: must remain REFUSE');
check(receipt.clinicalUseAllowed === false, 'receipt: clinical use must remain false');
check(receipt.productionAuthorized === false, 'receipt: production must remain false');
check(receipt.noveltyEstablished === false, 'receipt: novelty overclaimed');
check(receipt.signed === false, 'receipt: unexpected signature claim');
check(receipt.compilerReconciled === true, 'receipt: compiler reconciliation missing');
check(receipt.nativeWasmParityEstablished === true, 'receipt: parity missing');
check(receipt.parent?.sha256 === sha256File(parentReceiptPath), 'receipt: parent hash mismatch');
check(
  receipt.compilerReceipt?.sha256 === sha256File(compilerReceiptPath),
  'receipt: compiler receipt hash mismatch',
);
check(receipt.evidence?.sha256 === sha256File(evidencePath), 'receipt: evidence hash mismatch');
check(receipt.compiler?.sha256 === compilerReceipt.compiler?.sha256, 'receipt: compiler hash drift');
check(receipt.wasm?.sha256 === sha256File(wasmPath), 'receipt: WASM hash drift');
check(receipt.native?.sha256 === evidence.native?.sha256, 'receipt: native hash drift');

const expectedArtifactPaths = new Set([
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
  'docs/research/deontic-transportability/formal/evidence/semantic-refinement-evidence.v0.4.json',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransportWasmRefinement.lean',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransportWasmRefinementAudit.lean',
  'docs/research/deontic-transportability/formal/lean4/lake-manifest.json',
  'docs/research/deontic-transportability/formal/lean4/lakefile.lean',
  'docs/research/deontic-transportability/formal/lean4/lean-toolchain',
  'docs/research/deontic-transportability/formal/sounio/deontic_transport_finite_wasm_v0_4.sio',
  'docs/research/deontic-transportability/formal/wasm/deontic_transport_finite.v0.4.wasm',
  'docs/research/deontic-transportability/formal/wasm/source-fresh-semantic-closure-v0.4.md',
  'scripts/verify-deontic-semantic-refinement.mjs',
  'scripts/verify-deontic-source-fresh-gate.mjs',
]);
const receivedArtifactPaths = new Set();
for (const artifact of receipt.artifacts ?? []) {
  check(expectedArtifactPaths.has(artifact.path), `${artifact.path}: unexpected artifact`);
  check(!receivedArtifactPaths.has(artifact.path), `${artifact.path}: duplicate artifact`);
  receivedArtifactPaths.add(artifact.path);
  const path = resolve(repoRoot, artifact.path);
  check(sha256File(path) === artifact.sha256, `${artifact.path}: SHA-256 mismatch`);
  check(statSync(path).size === artifact.bytes, `${artifact.path}: byte-size mismatch`);
}
check(
  JSON.stringify([...receivedArtifactPaths].sort()) ===
    JSON.stringify([...expectedArtifactPaths].sort()),
  'receipt: artifact set mismatch',
);

check(semanticResult.verified === true, 'runtime: semantic verifier did not pass');
check(semanticResult.boundedDomainComplete === true, 'runtime: bounded domain incomplete');
check(semanticResult.exhaustiveCases === 87381, 'runtime: exhaustive count drift');
check(semanticResult.rejectionCases === 438, 'runtime: rejection count drift');
check(semanticResult.mainResult === '87', 'runtime: WASM main result drift');
check(semanticResult.clinicalDisposition === 'REFUSE', 'runtime: clinical boundary drift');
check(semanticResult.productionAuthorized === false, 'runtime: production boundary drift');

for (const boundary of [
  'compilerReconciled=true',
  'clinicalDisposition=REFUSE',
  'productionAuthorized=false',
  'noveltyEstablished=false',
  'loop-bearing control flow remains unsupported',
]) {
  check(closure.includes(boundary), `closure note: missing boundary ${boundary}`);
}

const result = {
  schema: 'darwin.deontic-transport-source-fresh-verification.v0.4',
  compilerCommit: compilerReceipt.repository?.commit ?? null,
  compilerTree: compilerReceipt.repository?.tree ?? null,
  compilerSha256: compilerReceipt.compiler?.sha256 ?? null,
  wasmSha256: sha256File(wasmPath),
  exhaustiveCases: semanticResult.exhaustiveCases ?? 0,
  rejectionCases: semanticResult.rejectionCases ?? 0,
  leanBuildVerified: evidence.lean?.buildVerified === true,
  compilerReconciled: compilerReceipt.compilerReconciled === true,
  nativeWasmParityEstablished:
    evidence.verdict?.nativeWasmParityEstablished === true,
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  noveltyEstablished: false,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
