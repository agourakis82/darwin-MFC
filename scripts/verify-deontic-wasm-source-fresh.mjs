import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFileSync, statSync} from 'node:fs';
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
  'evidence/wasm-execution-evidence.v0.4.json',
);
const semanticReceiptPath = resolve(
  formalDir,
  'formal-semantic-refinement.receipt.v0.4.json',
);
const receiptPath = resolve(formalDir, 'formal-wasm-gate.receipt.v0.4.json');
const parentReceiptPath = resolve(formalDir, 'formal-wasm-gate.receipt.v0.3.json');
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
  'wasm/wasm-source-fresh-closure-v0.4.md',
);

const compilerReceipt = JSON.parse(readFileSync(compilerReceiptPath, 'utf8'));
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
const semanticReceipt = JSON.parse(readFileSync(semanticReceiptPath, 'utf8'));
const receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
const wasmBytes = readFileSync(wasmPath);
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const sha256File = (path) => sha256(readFileSync(path));
const artifactRecordValid = (artifact) => {
  const path = resolve(repoRoot, artifact.path);
  return (
    sha256File(path) === artifact.sha256 &&
    statSync(path).size === artifact.bytes
  );
};
const refusalBoundaryValid = (value) =>
  value.clinicalDisposition === 'REFUSE' &&
  value.clinicalUseAllowed === false &&
  value.productionAuthorized === false &&
  value.noveltyEstablished === false &&
  value.signed === false;

check(WebAssembly.validate(wasmBytes), 'WASM: runtime validation failed');
let module;
let instance;
try {
  module = await WebAssembly.compile(wasmBytes);
  instance = await WebAssembly.instantiate(module, {});
} catch (error) {
  errors.push(`WASM: compile or instantiate failed: ${error.message}`);
}

const imports = module ? WebAssembly.Module.imports(module) : [];
const exports = module
  ? WebAssembly.Module.exports(module).map((entry) => entry.name).sort()
  : [];
const mainResult = instance ? instance.exports.main() : null;
check(imports.length === 0, 'WASM: executable witness must have zero imports');
check(
  JSON.stringify(exports) === JSON.stringify(evidence.wasm?.exports),
  'WASM: export surface drift',
);
check(mainResult === 87n, 'WASM: self-check did not return 87');

const exhaustiveRun = spawnSync(
  process.execPath,
  [resolve(repoRoot, 'scripts/verify-deontic-wasm-exhaustive.mjs')],
  {cwd: repoRoot, encoding: 'utf8', timeout: 30_000},
);
let exhaustive = null;
if (exhaustiveRun.status !== 0 || exhaustiveRun.error) {
  errors.push(
    `exhaustive gate failed: ${
      exhaustiveRun.error?.message ?? exhaustiveRun.stderr.trim()
    }`,
  );
} else {
  try {
    exhaustive = JSON.parse(exhaustiveRun.stdout);
  } catch (error) {
    errors.push(`exhaustive gate emitted invalid JSON: ${error.message}`);
  }
}

check(
  compilerReceipt.schema === 'darwin.sounio.compiler-source-receipt.v1',
  'compiler receipt: unexpected schema',
);
check(
  compilerReceipt.status === 'SOURCE_FRESH_RECONCILED',
  'compiler receipt: source is not fresh',
);
check(
  compilerReceipt.compilerReconciled === true,
  'compiler receipt: compiler is not reconciled',
);
check(
  compilerReceipt.repository?.remoteBranchVerified === true &&
    compilerReceipt.repository?.remoteBranchCommit ===
      compilerReceipt.repository?.commit,
  'compiler receipt: branch is not published',
);
check(
  compilerReceipt.repository?.clean === true,
  'compiler receipt: clean-worktree claim is incomplete',
);
check(
  compilerReceipt.repository?.commit === evidence.executionEnvironment?.repositoryCommit &&
    compilerReceipt.repository?.tree === evidence.executionEnvironment?.repositoryTree,
  'compiler receipt: commit/tree cross-link mismatch',
);
check(
  compilerReceipt.repository?.behindOriginMain === 0,
  'compiler receipt: source branch was behind its recorded upstream',
);

const fixedPointStages = compilerReceipt.bootstrap?.fixedPointStages ?? [];
const seedSha = compilerReceipt.bootstrap?.seedSha256;
check(
  fixedPointStages.length === 3 &&
    fixedPointStages.every((stage) => stage.sha256 === seedSha) &&
    compilerReceipt.bootstrap?.fixedPointBitIdentical === true &&
    compilerReceipt.bootstrap?.canonicalCompilerGateVerified === true,
  'compiler receipt: fixed-point chain mismatch',
);
check(
  compilerReceipt.bootstrap?.bootstrapChain?.passed === 8 &&
    compilerReceipt.bootstrap?.bootstrapChain?.failed === 0 &&
    compilerReceipt.bootstrap?.bootstrapChain?.notRun === 0,
  'compiler receipt: bootstrap S1-S8 gate incomplete',
);

const compilerSha = compilerReceipt.compiler?.sha256;
check(
  compilerSha === compilerReceipt.compiler?.repeatSha256 &&
    compilerSha === compilerReceipt.compiler?.diagnosticArtifactSha256 &&
    compilerReceipt.compiler?.deterministic === true,
  'compiler receipt: clean compiler builds are not bit-identical',
);
check(
  compilerReceipt.compiler?.pinnedSeedRequired === true &&
    compilerReceipt.compiler?.automaticSeedFallbackUsed === false,
  'compiler receipt: pinned-seed build was not strict',
);
check(
  compilerReceipt.compiler?.diagnosticGatePassed === true &&
    compilerReceipt.compiler?.errorDiagnostics === 0 &&
    compilerReceipt.gates?.some(
      (gate) => gate.id === 'error-diagnostic-fail-closed' && gate.verified === true,
    ),
  'compiler receipt: diagnostic refusal gate incomplete',
);
check(
  compilerReceipt.compiler?.versionJson?.abi_version === 1 &&
    compilerReceipt.compiler?.versionJson?.runtime_version === '1.0.0',
  'compiler receipt: version identity mismatch',
);
check(
  compilerReceipt.gates?.some(
    (gate) => gate.id === 'item-kind-dispatch-27-of-27' && gate.verified === true,
  ),
  'compiler receipt: ItemKind dispatch gate incomplete',
);
const remoteDeonticSource = compilerReceipt.repository?.sourceFiles?.find(
  (entry) => entry.path === 'tests/wasm/deontic_transport_finite_wasm_v0_4.sio',
);
check(
  remoteDeonticSource?.sha256 === sha256File(sourcePath),
  'compiler receipt: deontic source hash mismatch',
);
check(
  compilerReceipt.genericWasmFixture?.sha256 ===
    '5f42f212cdee7ade73c19d08be249d627dd5f81f722d2d33be93f3bcc5dcd9f5' &&
    compilerReceipt.genericWasmFixture?.runtimeValidated === true,
  'compiler receipt: generic WASM fixture mismatch',
);
check(compilerReceipt.signed === false, 'compiler receipt: unexpected signature claim');

check(
  semanticReceipt.schema ===
    'darwin.deontic-transport-source-fresh-gate-receipt.v0.4',
  'semantic receipt: unexpected schema',
);
check(
  refusalBoundaryValid(semanticReceipt),
  'semantic receipt: clinical refusal boundary drift',
);
check(
  semanticReceipt.compilerReceipt?.sha256 === sha256File(compilerReceiptPath),
  'semantic receipt: compiler receipt hash mismatch',
);
check(
  semanticReceipt.compiler?.sha256 === compilerSha &&
    semanticReceipt.compiler?.commit === compilerReceipt.repository?.commit &&
    semanticReceipt.compiler?.tree === compilerReceipt.repository?.tree,
  'semantic receipt: compiler identity mismatch',
);

check(
  evidence.schema === 'darwin.deontic-transport-wasm-execution-evidence.v0.4',
  'evidence: unexpected schema',
);
check(refusalBoundaryValid(evidence), 'evidence: clinical refusal boundary drift');
check(
  evidence.parentGate?.sha256 === sha256File(parentReceiptPath),
  'evidence: parent receipt hash mismatch',
);
check(
  evidence.compilerReceipt?.sha256 === sha256File(compilerReceiptPath),
  'evidence: compiler receipt hash mismatch',
);
check(evidence.source?.sha256 === sha256File(sourcePath), 'evidence: source hash mismatch');
check(
  evidence.source?.remoteCopySha256 === evidence.source?.sha256,
  'evidence: local/remote source drift',
);
check(evidence.wasm?.sha256 === sha256File(wasmPath), 'evidence: WASM hash mismatch');
check(evidence.wasm?.bytes === statSync(wasmPath).size, 'evidence: WASM size mismatch');
check(evidence.wasm?.runtimeValidated === true, 'evidence: runtime not validated');
check(evidence.wasm?.mainResult === 87, 'evidence: WASM self-check mismatch');
check(
  evidence.compiler?.artifact?.sha256 === compilerSha,
  'evidence: compiler artifact cross-link mismatch',
);
check(
  evidence.compiler?.fixedPointSeedSha256 === seedSha,
  'evidence: fixed-point seed cross-link mismatch',
);
check(
  evidence.native?.sha256 ===
    semanticReceipt.native?.sha256 &&
    evidence.native?.executionExitCode === 87,
  'evidence: native artifact cross-link mismatch',
);
for (const [pathKey, hashKey] of [
  ['basePath', 'baseSha256'],
  ['finitePath', 'finiteSha256'],
  ['refinementPath', 'refinementSha256'],
  ['auditPath', 'auditSha256'],
]) {
  const path = resolve(repoRoot, evidence.formalRefinement?.[pathKey] ?? '');
  check(
    evidence.formalRefinement?.[hashKey] === sha256File(path),
    `evidence: formal artifact hash mismatch for ${pathKey}`,
  );
}
check(
  evidence.formalRefinement?.compiled === true &&
    evidence.formalRefinement?.projectDeclaredAxioms?.length === 0,
  'evidence: formal refinement boundary mismatch',
);
check(exhaustive?.verified === true, 'exhaustive gate: result is not verified');
check(
  exhaustive?.wasmSha256 === evidence.wasm?.sha256 &&
    exhaustive?.sounioSourceSha256 === evidence.source?.sha256 &&
    exhaustive?.leanSpecificationSha256 ===
      evidence.formalRefinement?.refinementSha256,
  'exhaustive gate: artifact identity mismatch',
);
check(
  exhaustive?.packedStatesChecked ===
    evidence.exhaustiveRefinement?.packedStatesChecked &&
    exhaustive?.canonicalFamiliesRepresented ===
      evidence.exhaustiveRefinement?.canonicalFamiliesRepresented &&
    exhaustive?.invalidActiveMaskCasesRefused ===
      evidence.exhaustiveRefinement?.invalidActiveMaskCasesRefused &&
    exhaustive?.invalidInactiveMaskCasesIgnored ===
      evidence.exhaustiveRefinement?.invalidInactiveMaskCasesIgnored,
  'exhaustive gate: coverage count mismatch',
);

check(
  receipt.schema === 'darwin.deontic-transport-wasm-gate-receipt.v0.4',
  'receipt: unexpected schema',
);
check(refusalBoundaryValid(receipt), 'receipt: clinical refusal boundary drift');
check(receipt.compilerReconciled === true, 'receipt: compiler reconciliation missing');
check(
  receipt.parent?.sha256 === sha256File(parentReceiptPath),
  'receipt: parent hash mismatch',
);
check(
  receipt.compilerReceipt?.sha256 === sha256File(compilerReceiptPath),
  'receipt: compiler receipt hash mismatch',
);
check(
  receipt.semanticReceipt?.sha256 === sha256File(semanticReceiptPath),
  'receipt: semantic receipt hash mismatch',
);
check(
  receipt.executionEvidence?.sha256 === sha256File(evidencePath),
  'receipt: execution evidence hash mismatch',
);
check(
  receipt.compiler?.sha256 === evidence.compiler?.artifact?.sha256 &&
    receipt.wasm?.sha256 === evidence.wasm?.sha256 &&
    receipt.native?.sha256 === evidence.native?.sha256 &&
    receipt.wasm?.sha256 === semanticReceipt.wasm?.sha256 &&
    receipt.native?.sha256 === semanticReceipt.native?.sha256,
  'receipt: executable identity cross-link mismatch',
);

const expectedArtifactPaths = new Set([
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
  'docs/research/deontic-transportability/formal/evidence/wasm-execution-evidence.v0.4.json',
  'docs/research/deontic-transportability/formal/formal-semantic-refinement.receipt.v0.4.json',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransport.lean',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransportFinite.lean',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransportFiniteAudit.lean',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransportWasmRefinement.lean',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransportWasmRefinementAudit.lean',
  'docs/research/deontic-transportability/formal/sounio/deontic_transport_finite_wasm_v0_4.sio',
  'docs/research/deontic-transportability/formal/vectors/deontic-transport-finite-vectors.v2.json',
  'docs/research/deontic-transportability/formal/wasm/deontic_transport_finite.v0.4.wasm',
  'docs/research/deontic-transportability/formal/wasm/wasm-source-fresh-closure-v0.4.md',
  'scripts/verify-deontic-wasm-exhaustive.mjs',
  'scripts/verify-deontic-wasm-source-fresh.mjs',
]);
const receivedArtifactPaths = new Set();
for (const artifact of receipt.artifacts ?? []) {
  check(expectedArtifactPaths.has(artifact.path), `${artifact.path}: unexpected artifact`);
  check(!receivedArtifactPaths.has(artifact.path), `${artifact.path}: duplicate artifact`);
  receivedArtifactPaths.add(artifact.path);
  check(artifactRecordValid(artifact), `${artifact.path}: hash or byte-size mismatch`);
}
check(
  JSON.stringify([...receivedArtifactPaths].sort()) ===
    JSON.stringify([...expectedArtifactPaths].sort()),
  'receipt: artifact set mismatch',
);
check(
  readFileSync(closurePath, 'utf8').includes('compilerReconciled=true') &&
    readFileSync(closurePath, 'utf8').includes('clinicalDisposition=REFUSE'),
  'closure note: mandatory boundary text missing',
);

const firstArtifact = receipt.artifacts?.[0];
const tamperedArtifact = firstArtifact
  ? {...firstArtifact, sha256: '0'.repeat(64)}
  : null;
const tamperedArtifactDetected =
  tamperedArtifact !== null && !artifactRecordValid(tamperedArtifact);
const promotedReceiptRejected = !refusalBoundaryValid({
  ...receipt,
  clinicalDisposition: 'READY_FOR_CONFIRMATION',
  productionAuthorized: true,
});
const tamperedEvidence = {
  ...evidence,
  compiler: {
    ...evidence.compiler,
    artifact: {
      ...evidence.compiler?.artifact,
      sha256: '0'.repeat(64),
    },
  },
};
const compilerMismatchRejected =
  tamperedEvidence.compiler?.artifact?.sha256 !== compilerSha;
check(tamperedArtifactDetected, 'negative gate: artifact hash tampering was accepted');
check(promotedReceiptRejected, 'negative gate: clinical promotion was accepted');
check(compilerMismatchRejected, 'negative gate: compiler identity mismatch was accepted');

const result = {
  schema: 'darwin.deontic-transport-wasm-source-fresh-verification.v0.4',
  compilerCommit: compilerReceipt.repository?.commit,
  compilerTree: compilerReceipt.repository?.tree,
  compilerSha256: compilerSha,
  fixedPointSeedSha256: seedSha,
  wasmSha256: sha256(wasmBytes),
  wasmBytes: wasmBytes.length,
  imports,
  exports,
  mainResult: mainResult === null ? null : String(mainResult),
  packedStatesChecked: exhaustive?.packedStatesChecked ?? null,
  canonicalFamiliesRepresented: exhaustive?.canonicalFamiliesRepresented ?? null,
  negativeGates: {
    tamperedArtifactDetected,
    promotedReceiptRejected,
    compilerMismatchRejected,
  },
  compilerReconciled: true,
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
