import {createHash} from 'node:crypto';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const verifierPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(verifierPath), '..');
const packageDir = resolve(repoRoot, 'docs/research/auctoritas');
const formalDir = resolve(packageDir, 'formal');
const sourcePath = resolve(formalDir, 'sounio/auctoritas_finite_v0_5.sio');
const wasmPath = resolve(formalDir, 'wasm/auctoritas_finite.v0.5.wasm');
const nativePath = resolve(
  formalDir,
  'native/auctoritas_finite.v0.5.linux-x86_64',
);
const vectorsPath = resolve(formalDir, 'vectors/auctoritas-v0.5.json');
const evidencePath = resolve(
  formalDir,
  'evidence/auctoritas-execution-evidence.v0.5.json',
);
const receiptPath = resolve(formalDir, 'auctoritas-gate.receipt.v0.5.json');
const closurePath = resolve(formalDir, 'closure-v0.5.md');
const parentReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/formal-wasm-gate.receipt.v0.4.json',
);
const compilerReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
);

const vectors = JSON.parse(readFileSync(vectorsPath, 'utf8'));
const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
const receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
const parentReceipt = JSON.parse(readFileSync(parentReceiptPath, 'utf8'));
const compilerReceipt = JSON.parse(readFileSync(compilerReceiptPath, 'utf8'));
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

check(
  wasmBytes.length >= 8 &&
    wasmBytes.subarray(0, 4).equals(Buffer.from([0, 97, 115, 109])),
  'WASM: invalid magic number',
);
check(WebAssembly.validate(wasmBytes), 'WASM: runtime validation failed');

let module;
let instance;
try {
  module = await WebAssembly.compile(wasmBytes);
  instance = await WebAssembly.instantiate(module, {});
} catch (error) {
  errors.push(`WASM: compile or instantiate failed: ${error.message}`);
}

const expectedExports = [
  'ax_check_encoded_index',
  'ax_contains_q0',
  'ax_contains_q1',
  'ax_difference_mask',
  'ax_disposition',
  'ax_exhaustive_self_check',
  'ax_exhaustive_walk',
  'ax_reference_disposition',
  'ax_valid_bit',
  'ax_valid_inputs',
  'ax_valid_mask',
  'ax_valid_recommendation',
  'ax_verify_case',
  'main',
  'memory',
];
const imports = module ? WebAssembly.Module.imports(module) : [];
const exports = module
  ? WebAssembly.Module.exports(module).map((entry) => entry.name).sort()
  : [];
check(imports.length === 0, 'WASM: authority witness must have zero imports');
check(
  JSON.stringify(exports) === JSON.stringify(expectedExports),
  'WASM: export surface drift',
);
check(
  !exports.some((name) => name.includes('recommendation') && name !== 'ax_valid_recommendation'),
  'WASM: executable must not export a recommendation selector',
);

const containsQ0 = (mask) => mask === 1 || mask === 3;
const containsQ1 = (mask) => mask === 2 || mask === 3;
const validMask = (mask) => Number.isInteger(mask) && mask >= 0 && mask <= 3;
const validBit = (value) => value === 0 || value === 1;
const validRecommendation = (value) => value === 1 || value === 2;
const validInput = ([authority, observed, q0w0, q1w0, q0w1, q1w1, r0, r1]) =>
  validMask(authority) &&
  validMask(observed) &&
  (!containsQ0(observed) || containsQ0(authority)) &&
  (!containsQ1(observed) || containsQ1(authority)) &&
  validBit(q0w0) &&
  validBit(q1w0) &&
  validBit(q0w1) &&
  validBit(q1w1) &&
  validRecommendation(r0) &&
  validRecommendation(r1);

// Independent host oracle. It computes the separating-query set directly and
// never calls a Sounio helper to derive the expected disposition.
const oracleDisposition = (input) => {
  if (!validInput(input)) return 0;
  const [authority, observed, q0w0, q1w0, q0w1, q1w1, r0, r1] = input;
  if (r0 === r1) return 1;
  const differenceMask =
    (q0w0 === q0w1 ? 0 : 1) + (q1w0 === q1w1 ? 0 : 2);
  if ((differenceMask & observed) !== 0) return 1;
  if ((differenceMask & authority) !== 0) return 2;
  if (differenceMask !== 0) return 3;
  return 4;
};

const maskValues = [-1, 0, 1, 2, 3, 4];
const bitValues = [-1, 0, 1, 2];
const recommendationValues = [0, 1, 2, 3];
const coverage = {
  boundedStatesChecked: 0,
  validStatesChecked: 0,
  invalidStatesRefused: 0,
  dispositions: {
    REFUSE: 0,
    IDENTIFIED: 0,
    ASK: 0,
    DELEGATE: 0,
    ABSTAIN_AUTHORITY: 0,
  },
};
const dispositionNames = [
  'REFUSE',
  'IDENTIFIED',
  'ASK',
  'DELEGATE',
  'ABSTAIN_AUTHORITY',
];
let parityMismatches = 0;
let referenceMismatches = 0;
let validityMismatches = 0;

if (instance) {
  const api = instance.exports;
  for (const authority of maskValues) {
    for (const observed of maskValues) {
      for (const q0w0 of bitValues) {
        for (const q1w0 of bitValues) {
          for (const q0w1 of bitValues) {
            for (const q1w1 of bitValues) {
              for (const r0 of recommendationValues) {
                for (const r1 of recommendationValues) {
                  const input = [
                    authority,
                    observed,
                    q0w0,
                    q1w0,
                    q0w1,
                    q1w1,
                    r0,
                    r1,
                  ];
                  const args = input.map(BigInt);
                  const expected = oracleDisposition(input);
                  const actualValidity = Number(api.ax_valid_inputs(...args));
                  const actual = Number(api.ax_disposition(...args));
                  const reference = Number(api.ax_reference_disposition(...args));
                  const expectedValidity = validInput(input) ? 1 : 0;

                  coverage.boundedStatesChecked += 1;
                  if (expectedValidity === 1) coverage.validStatesChecked += 1;
                  else if (actual === 0) coverage.invalidStatesRefused += 1;
                  const actualName = dispositionNames[actual];
                  if (actualName) coverage.dispositions[actualName] += 1;
                  else parityMismatches += 1;

                  if (actualValidity !== expectedValidity) validityMismatches += 1;
                  if (actual !== expected) parityMismatches += 1;
                  if (reference !== expected) referenceMismatches += 1;
                }
              }
            }
          }
        }
      }
    }
  }

  check(api.main() === 95n, 'WASM: self-check did not return 95');
  check(
    api.ax_exhaustive_self_check() === 0n,
    'WASM: 1,024-state internal exhaustive check failed',
  );
}

check(validityMismatches === 0, 'WASM: input-validity oracle mismatch');
check(parityMismatches === 0, 'WASM: disposition oracle mismatch');
check(referenceMismatches === 0, 'WASM: internal reference oracle mismatch');
check(
  coverage.boundedStatesChecked === 147456 &&
    coverage.validStatesChecked === 576 &&
    coverage.invalidStatesRefused === 146880,
  'WASM: bounded-domain coverage drift',
);
check(
  JSON.stringify(coverage.dispositions) ===
    JSON.stringify({
      REFUSE: 146880,
      IDENTIFIED: 376,
      ASK: 72,
      DELEGATE: 56,
      ABSTAIN_AUTHORITY: 72,
    }),
  'WASM: disposition census drift',
);

const observedVectors = [];
if (instance) {
  for (const vector of vectors.cases ?? []) {
    const actual = Number(
      instance.exports.ax_disposition(...vector.input.map(BigInt)),
    );
    check(actual === vector.expectedCode, `${vector.id}: disposition mismatch`);
    check(
      dispositionNames[actual] === vector.expectedDisposition,
      `${vector.id}: disposition label mismatch`,
    );
    observedVectors.push({id: vector.id, code: actual});
  }
}

check(
  vectors.schema === 'darwin.auctoritas.finite-vectors.v0.5',
  'vectors: unexpected schema',
);
check(vectors.clinicalMeaning === false, 'vectors: clinical meaning introduced');
check(vectors.cases?.length === 9, 'vectors: canonical case count drift');

check(
  compilerReceipt.schema === 'darwin.sounio.compiler-source-receipt.v1' &&
    compilerReceipt.compilerReconciled === true &&
    compilerReceipt.status === 'SOURCE_FRESH_RECONCILED',
  'compiler receipt: source-fresh reconciliation missing',
);
check(
  compilerReceipt.repository?.commit ===
      '32bf57e880d5a0bc64d39edff98491a6c7c6101d' &&
    compilerReceipt.repository?.tree ===
      '3560e7e17d931d12244c3232869faf010019c962',
  'compiler receipt: repository identity drift',
);
check(
  compilerReceipt.compiler?.sha256 ===
    'b5208b7a82bf5a369d1188858a3ab57ceba3bdd83cceb28f30cc90f05b94322d',
  'compiler receipt: compiler artifact drift',
);
check(
  parentReceipt.schema === 'darwin.deontic-transport-wasm-gate-receipt.v0.4' &&
    parentReceipt.compilerReconciled === true &&
    refusalBoundaryValid(parentReceipt),
  'parent receipt: v0.4 gate or refusal boundary invalid',
);

check(
  evidence.schema === 'darwin.auctoritas.execution-evidence.v0.5',
  'evidence: unexpected schema',
);
check(refusalBoundaryValid(evidence), 'evidence: clinical refusal boundary drift');
check(
  evidence.parent?.sha256 === sha256File(parentReceiptPath),
  'evidence: parent receipt hash mismatch',
);
check(
  evidence.compilerReceipt?.sha256 === sha256File(compilerReceiptPath),
  'evidence: compiler receipt hash mismatch',
);
check(
  evidence.compiler?.sha256 === compilerReceipt.compiler?.sha256,
  'evidence: compiler identity mismatch',
);
check(evidence.source?.sha256 === sha256File(sourcePath), 'evidence: source hash mismatch');
check(evidence.source?.bytes === statSync(sourcePath).size, 'evidence: source size mismatch');
check(
  evidence.source?.remoteCopySha256 === evidence.source?.sha256,
  'evidence: local/remote source drift',
);
check(evidence.wasm?.sha256 === sha256File(wasmPath), 'evidence: WASM hash mismatch');
check(evidence.wasm?.bytes === statSync(wasmPath).size, 'evidence: WASM size mismatch');
check(evidence.wasm?.repeatSha256 === evidence.wasm?.sha256, 'evidence: WASM nondeterminism');
check(evidence.wasm?.mainResult === 95, 'evidence: WASM self-check mismatch');
check(evidence.wasm?.imports?.length === 0, 'evidence: WASM imports hidden');
check(
  JSON.stringify(evidence.wasm?.exports) === JSON.stringify(expectedExports),
  'evidence: WASM export surface mismatch',
);
check(
  evidence.native?.sha256 === evidence.native?.repeatSha256 &&
    evidence.native?.sha256 === sha256File(nativePath) &&
    evidence.native?.bytes === statSync(nativePath).size &&
    evidence.native?.executionExitCode === 95 &&
    evidence.native?.repeatExecutionExitCode === 95,
  'evidence: native determinism or self-check mismatch',
);
check(
  evidence.lean?.buildPassed === true &&
    evidence.lean?.projectDeclaredAxioms?.length === 0 &&
    evidence.lean?.theorems?.noLegitimateQuery?.standardAxioms?.length === 0 &&
    evidence.lean?.theorems?.soundnessForcesAbstention?.proved === true &&
    evidence.lean?.theorems?.soundnessForcesAbstention?.standardAxioms?.length === 0,
  'evidence: central Lean theorem boundary mismatch',
);
check(
  evidence.lean?.source?.sha256 ===
      sha256File(resolve(repoRoot, evidence.lean?.source?.path ?? '')) &&
    evidence.lean?.audit?.sha256 ===
      sha256File(resolve(repoRoot, evidence.lean?.audit?.path ?? '')),
  'evidence: Lean source or audit hash mismatch',
);
check(
  evidence.hostVerifier?.sha256 === sha256File(verifierPath),
  'evidence: host verifier hash mismatch',
);
check(
  evidence.exhaustive?.boundedStatesChecked === coverage.boundedStatesChecked &&
    evidence.exhaustive?.validStatesChecked === coverage.validStatesChecked &&
    evidence.exhaustive?.invalidStatesRefused === coverage.invalidStatesRefused &&
    JSON.stringify(evidence.exhaustive?.dispositions) ===
      JSON.stringify(coverage.dispositions),
  'evidence: exhaustive coverage mismatch',
);
check(
  JSON.stringify(evidence.observedVectors) === JSON.stringify(observedVectors),
  'evidence: canonical vector observations drift',
);

check(
  receipt.schema === 'darwin.auctoritas.authority-identifiability-receipt.v0.5',
  'receipt: unexpected schema',
);
check(refusalBoundaryValid(receipt), 'receipt: clinical refusal boundary drift');
check(receipt.status === 'ABSTRACT_RESEARCH_ONLY', 'receipt: status drift');
check(receipt.compilerReconciled === true, 'receipt: compiler reconciliation missing');
check(
  receipt.nativeWasmParityEstablished === true,
  'receipt: native/WASM parity missing',
);
check(receipt.parent?.sha256 === sha256File(parentReceiptPath), 'receipt: parent hash mismatch');
check(
  receipt.compilerReceipt?.sha256 === sha256File(compilerReceiptPath),
  'receipt: compiler receipt hash mismatch',
);
check(
  receipt.executionEvidence?.sha256 === sha256File(evidencePath),
  'receipt: execution evidence hash mismatch',
);
check(
  receipt.compiler?.repositoryCommit === compilerReceipt.repository?.commit &&
    receipt.compiler?.repositoryTree === compilerReceipt.repository?.tree &&
    receipt.compiler?.sha256 === compilerReceipt.compiler?.sha256 &&
    receipt.compiler?.fixedPointSeedSha256 ===
      compilerReceipt.bootstrap?.seedSha256,
  'receipt: compiler identity mismatch',
);
check(
  receipt.sounio?.sourceSha256 === sha256File(sourcePath) &&
    receipt.sounio?.internalCanonicalStatesChecked === 1024 &&
    receipt.sounio?.selfCheckCode === 95,
  'receipt: Sounio identity or internal coverage mismatch',
);
check(
  receipt.wasm?.sha256 === evidence.wasm?.sha256 &&
    receipt.wasm?.repeatSha256 === evidence.wasm?.repeatSha256 &&
    receipt.native?.sha256 === evidence.native?.sha256 &&
    receipt.native?.repeatSha256 === evidence.native?.repeatSha256 &&
    receipt.native?.path === evidence.native?.path,
  'receipt: executable identity mismatch',
);
check(
  receipt.formal?.noLegitimateQueryProved === true &&
    receipt.formal?.soundnessForcesAbstentionProved === true &&
    receipt.formal?.centralTheoremStandardAxioms?.length === 0,
  'receipt: formal theorem claim mismatch',
);
check(
  receipt.exhaustive?.boundedStatesChecked === coverage.boundedStatesChecked &&
    receipt.exhaustive?.parityMismatches === 0,
  'receipt: exhaustive parity claim mismatch',
);

const expectedArtifactPaths = new Set([
  'docs/research/auctoritas/README.md',
  'docs/research/auctoritas/auctoritas-theory-v0.5.md',
  'docs/research/auctoritas/formal/closure-v0.5.md',
  'docs/research/auctoritas/formal/evidence/auctoritas-execution-evidence.v0.5.json',
  'docs/research/auctoritas/formal/lean4/Auctoritas.lean',
  'docs/research/auctoritas/formal/lean4/AuctoritasAudit.lean',
  'docs/research/auctoritas/formal/lean4/lake-manifest.json',
  'docs/research/auctoritas/formal/lean4/lakefile.lean',
  'docs/research/auctoritas/formal/lean4/lean-toolchain',
  'docs/research/auctoritas/formal/native/auctoritas_finite.v0.5.linux-x86_64',
  'docs/research/auctoritas/formal/sounio/auctoritas_finite_v0_5.sio',
  'docs/research/auctoritas/formal/vectors/auctoritas-v0.5.json',
  'docs/research/auctoritas/formal/wasm/auctoritas_finite.v0.5.wasm',
  'scripts/verify-auctoritas-v0.5.mjs',
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

const closure = readFileSync(closurePath, 'utf8');
check(
  closure.includes('clinicalDisposition=REFUSE') &&
    closure.includes('productionAuthorized=false') &&
    closure.includes('noveltyEstablished=false'),
  'closure note: mandatory refusal boundaries missing',
);

const firstArtifact = receipt.artifacts?.[0];
const tamperedArtifactDetected = firstArtifact
  ? !artifactRecordValid({...firstArtifact, sha256: '0'.repeat(64)})
  : false;
const promotedReceiptRejected = !refusalBoundaryValid({
  ...receipt,
  clinicalDisposition: 'WITHIN_REVIEWED_ENVELOPE',
  productionAuthorized: true,
});
const parentMismatchRejected =
  ({...receipt.parent, sha256: '0'.repeat(64)}).sha256 !==
  sha256File(parentReceiptPath);
const compilerMismatchRejected =
  ({...receipt.compilerReceipt, sha256: '0'.repeat(64)}).sha256 !==
  sha256File(compilerReceiptPath);
const unauthorizedObservationRejected =
  instance?.exports.ax_disposition(1n, 2n, 0n, 0n, 0n, 1n, 1n, 2n) === 0n;
check(tamperedArtifactDetected, 'negative gate: artifact tampering was accepted');
check(promotedReceiptRejected, 'negative gate: clinical promotion was accepted');
check(parentMismatchRejected, 'negative gate: parent mutation was accepted');
check(compilerMismatchRejected, 'negative gate: compiler mutation was accepted');
check(
  unauthorizedObservationRejected,
  'negative gate: unauthorized observation was accepted',
);

const result = {
  schema: 'darwin.auctoritas.runtime-verification.v0.5',
  compilerCommit: compilerReceipt.repository?.commit,
  compilerTree: compilerReceipt.repository?.tree,
  compilerSha256: compilerReceipt.compiler?.sha256,
  leanToolchain: evidence.lean?.toolchain,
  wasmSha256: sha256(wasmBytes),
  wasmBytes: wasmBytes.length,
  imports,
  exports,
  mainResult: instance ? String(instance.exports.main()) : null,
  coverage,
  parityMismatches,
  referenceMismatches,
  validityMismatches,
  negativeGates: {
    tamperedArtifactDetected,
    promotedReceiptRejected,
    parentMismatchRejected,
    compilerMismatchRejected,
    unauthorizedObservationRejected,
  },
  compilerReconciled: true,
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  noveltyEstablished: false,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
