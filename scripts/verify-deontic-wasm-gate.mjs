import {createHash} from 'node:crypto';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal',
);
const vectorsPath = resolve(
  formalDir,
  'vectors/deontic-transport-finite-vectors.v2.json',
);
const evidencePath = resolve(
  formalDir,
  'evidence/wasm-execution-evidence.v0.3.json',
);
const receiptPath = resolve(formalDir, 'formal-wasm-gate.receipt.v0.3.json');
const parentReceiptPath = resolve(formalDir, 'formal-finite-gate.receipt.v0.2.json');
const sourcePath = resolve(
  formalDir,
  'sounio/deontic_transport_finite_wasm_v0_3.sio',
);
const closureNotePath = resolve(
  formalDir,
  'wasm/wasm-backend-closure-v0.3.md',
);
const wasmPath = resolve(
  formalDir,
  'wasm/deontic_transport_finite.v0.3.wasm',
);
const vectors = JSON.parse(readFileSync(vectorsPath, 'utf8'));
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
const receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
const bytes = readFileSync(wasmPath);
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256File = (path) =>
  createHash('sha256').update(readFileSync(path)).digest('hex');

check(
  bytes.length >= 8 && bytes.subarray(0, 4).equals(Buffer.from([0, 97, 115, 109])),
  'WASM: invalid magic number',
);
check(WebAssembly.validate(bytes), 'WASM: runtime validation failed');

let module;
let instance;
try {
  module = await WebAssembly.compile(bytes);
  instance = await WebAssembly.instantiate(module, {});
} catch (error) {
  errors.push(`WASM: compile or instantiate failed: ${error.message}`);
}

const expectedExports = [
  'dt_case_code',
  'dt_classify',
  'dt_contains_a',
  'dt_contains_b',
  'dt_intersect_many8',
  'dt_intersect_masks',
  'dt_union_many8',
  'dt_union_masks',
  'dt_verify_case',
  'main',
  'memory',
];
const imports = module ? WebAssembly.Module.imports(module) : [];
const exports = module
  ? WebAssembly.Module.exports(module).map((entry) => entry.name).sort()
  : [];
check(imports.length === 0, 'WASM: executable ABI must have zero imports');
check(
  JSON.stringify(exports) === JSON.stringify(expectedExports),
  'WASM: export surface drift',
);

const observedFamilies = [];
if (instance) {
  const api = instance.exports;
  for (const family of vectors.families ?? []) {
    const padded = [...family.decisions, 0, 0, 0, 0, 0, 0, 0, 0].slice(0, 8);
    const args = [...padded, family.decisions.length].map(BigInt);
    const identifiedSet = Number(api.dt_union_many8(...args));
    const robustCore = Number(api.dt_intersect_many8(...args));
    const state = Number(api.dt_classify(BigInt(identifiedSet), BigInt(robustCore)));
    const caseCode = Number(api.dt_case_code(...args));
    const expectedCaseCode =
      family.expected.identifiedSet +
      family.expected.robustCore * 4 +
      family.expected.state * 16;

    check(
      identifiedSet === family.expected.identifiedSet,
      `${family.id}: identified-set mismatch`,
    );
    check(
      robustCore === family.expected.robustCore,
      `${family.id}: robust-core mismatch`,
    );
    check(state === family.expected.state, `${family.id}: state mismatch`);
    check(caseCode === expectedCaseCode, `${family.id}: case-code mismatch`);
    observedFamilies.push({
      id: family.id,
      identifiedSet,
      robustCore,
      state,
      caseCode,
    });
  }

  const zeroes = new Array(8).fill(0n);
  check(
    api.dt_union_many8(...zeroes, -1n) === -1n,
    'WASM: negative union count was accepted',
  );
  check(
    api.dt_intersect_many8(...zeroes, 9n) === -1n,
    'WASM: oversized intersection count was accepted',
  );
  check(api.main() === 87n, 'WASM: self-check result is not 87');
}

check(
  evidence.schema === 'darwin.deontic-transport-wasm-execution-evidence.v0.3',
  'evidence: unexpected schema',
);
check(evidence.clinicalDisposition === 'REFUSE', 'evidence: must remain REFUSE');
check(evidence.clinicalUseAllowed === false, 'evidence: clinical use must be false');
check(evidence.productionAuthorized === false, 'evidence: production must be false');
check(evidence.noveltyEstablished === false, 'evidence: novelty must not be claimed');
check(
  evidence.parentGate?.sha256 === sha256File(parentReceiptPath),
  'evidence: parent receipt hash mismatch',
);
check(evidence.source?.sha256 === sha256File(sourcePath), 'evidence: source hash mismatch');
check(evidence.source?.remoteCopySha256 === evidence.source?.sha256, 'evidence: remote source drift');
check(evidence.wasm?.sha256 === sha256File(wasmPath), 'evidence: WASM hash mismatch');
check(evidence.wasm?.bytes === statSync(wasmPath).size, 'evidence: WASM size mismatch');
check(evidence.wasm?.runtimeValidated === true, 'evidence: runtime not validated');
check(evidence.wasm?.imports?.length === 0, 'evidence: imported runtime dependency');
check(evidence.native?.executionExitCode === 87, 'evidence: native self-check mismatch');
check(evidence.native?.expectedSelfCheckCode === 87, 'evidence: native expectation drift');
check(evidence.verdict?.fixedPointSeedVerified === true, 'evidence: fixed-point seed missing');
check(
  evidence.verdict?.canonicalCompilerGateVerified === true,
  'evidence: canonical compiler gate missing',
);
check(
  evidence.verdict?.nativeWasmParityEstablished === true,
  'evidence: native/WASM parity missing',
);
check(evidence.compiler?.diagnosticGatePassed === false, 'evidence: diagnostics overclaimed');
check(evidence.compiler?.compilerReconciled === false, 'evidence: compiler overclaimed');
check(evidence.executionEnvironment?.repositoryClean === false, 'evidence: dirty worktree hidden');
check(
  evidence.compiler?.bootstrapChainGate?.status === 'INCOMPLETE',
  'evidence: incomplete bootstrap gate hidden',
);
check(
  JSON.stringify(evidence.observedFamilies) === JSON.stringify(observedFamilies),
  'evidence: observed vectors drift',
);

check(
  receipt.schema === 'darwin.deontic-transport-wasm-gate-receipt.v0.3',
  'receipt: unexpected schema',
);
check(receipt.clinicalDisposition === 'REFUSE', 'receipt: must remain REFUSE');
check(receipt.clinicalUseAllowed === false, 'receipt: clinical use must be false');
check(receipt.productionAuthorized === false, 'receipt: production must be false');
check(receipt.noveltyEstablished === false, 'receipt: novelty must not be claimed');
check(receipt.signed === false, 'receipt: unexpected signature claim');
check(receipt.compilerReconciled === false, 'receipt: compiler overclaimed');
check(receipt.nativeWasmParityEstablished === true, 'receipt: parity missing');
check(receipt.parent?.sha256 === sha256File(parentReceiptPath), 'receipt: parent hash mismatch');
check(receipt.compiler?.sha256 === evidence.compiler?.artifact?.sha256, 'receipt: compiler hash drift');
check(receipt.wasm?.sha256 === evidence.wasm?.sha256, 'receipt: WASM hash drift');
check(receipt.native?.sha256 === evidence.native?.sha256, 'receipt: native hash drift');

const expectedArtifactPaths = new Set([
  'docs/research/deontic-transportability/formal/evidence/wasm-execution-evidence.v0.3.json',
  'docs/research/deontic-transportability/formal/sounio/deontic_transport_finite_wasm_v0_3.sio',
  'docs/research/deontic-transportability/formal/vectors/deontic-transport-finite-vectors.v2.json',
  'docs/research/deontic-transportability/formal/wasm/deontic_transport_finite.v0.3.wasm',
  'docs/research/deontic-transportability/formal/wasm/wasm-backend-closure-v0.3.md',
  'scripts/verify-deontic-wasm-gate.mjs',
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
check(readFileSync(closureNotePath, 'utf8').includes('compilerReconciled=false'), 'closure note: reconciliation boundary missing');

const result = {
  schema: 'darwin.deontic-transport-wasm-runtime-verification.v0.3',
  artifactBytes: bytes.length,
  imports,
  exports,
  mainResult: instance ? String(instance.exports.main()) : null,
  families: observedFamilies,
  fixedPointSeedVerified: evidence.verdict?.fixedPointSeedVerified === true,
  canonicalCompilerGateVerified:
    evidence.verdict?.canonicalCompilerGateVerified === true,
  nativeWasmParityEstablished:
    evidence.verdict?.nativeWasmParityEstablished === true,
  compilerReconciled: false,
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
