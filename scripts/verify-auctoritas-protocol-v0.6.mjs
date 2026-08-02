import {createHash} from 'node:crypto';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const verifierPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(verifierPath), '..');
const packageDir = resolve(
  repoRoot,
  'docs/research/auctoritas-protocol-calculus',
);
const formalDir = resolve(packageDir, 'formal');
const sourcePath = resolve(formalDir, 'sounio/auctoritas_protocol_v0_6.sio');
const wasmPath = resolve(formalDir, 'wasm/auctoritas_protocol.v0.6.wasm');
const nativePath = resolve(
  formalDir,
  'native/auctoritas_protocol.v0.6.linux-x86_64',
);
const vectorsPath = resolve(
  formalDir,
  'vectors/auctoritas-protocol-v0.6.json',
);
const evidencePath = resolve(
  formalDir,
  'evidence/auctoritas-protocol-execution-evidence.v0.6.json',
);
const receiptPath = resolve(
  formalDir,
  'auctoritas-protocol-gate.receipt.v0.6.json',
);
const closurePath = resolve(formalDir, 'closure-v0.6.md');
const parentReceiptPath = resolve(
  repoRoot,
  'docs/research/auctoritas/formal/auctoritas-gate.receipt.v0.5.json',
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
  'ap_candidate_score',
  'ap_candidate_sufficient',
  'ap_certificate',
  'ap_check_encoded_index',
  'ap_contains_q0',
  'ap_contains_q1',
  'ap_contains_q2',
  'ap_difference_mask',
  'ap_exhaustive_self_check',
  'ap_exhaustive_walk',
  'ap_identifies3',
  'ap_minimal_expansion',
  'ap_pack_certificate',
  'ap_pair_separated',
  'ap_popcount',
  'ap_reference_certificate',
  'ap_reference_minimal_expansion',
  'ap_valid_inputs',
  'ap_valid_mask',
  'ap_valid_recommendation',
  'ap_verify_case',
  'main',
  'memory',
];
const imports = module ? WebAssembly.Module.imports(module) : [];
const exports = module
  ? WebAssembly.Module.exports(module).map((entry) => entry.name).sort()
  : [];
check(imports.length === 0, 'WASM: protocol witness must have zero imports');
check(
  JSON.stringify(exports) === JSON.stringify(expectedExports),
  'WASM: export surface drift',
);
check(
  !exports.some((name) => name.includes('select_recommendation')),
  'WASM: executable must not export a recommendation selector',
);

const validMask = (value) => Number.isInteger(value) && value >= 0 && value <= 7;
const validRecommendation = (value) => value === 1 || value === 2;
const popcount = (mask) =>
  (mask & 1 ? 1 : 0) + (mask & 2 ? 1 : 0) + (mask & 4 ? 1 : 0);
const validInput = ([authority, answers0, answers1, answers2, r0, r1, r2]) =>
  validMask(authority) &&
  validMask(answers0) &&
  validMask(answers1) &&
  validMask(answers2) &&
  validRecommendation(r0) &&
  validRecommendation(r1) &&
  validRecommendation(r2);
const identifies = (mask, answers, recommendations) => {
  for (let left = 0; left < 3; left += 1) {
    for (let right = left + 1; right < 3; right += 1) {
      if (
        recommendations[left] !== recommendations[right] &&
        (((answers[left] ^ answers[right]) & mask) === 0)
      ) {
        return false;
      }
    }
  }
  return true;
};
const candidateSufficient = (input, candidate) => {
  const [authority, ...rest] = input;
  const answers = rest.slice(0, 3);
  const recommendations = rest.slice(3, 6);
  return (
    (authority & candidate) === 0 &&
    identifies(authority | candidate, answers, recommendations)
  );
};
const candidateRank = (candidate) => popcount(candidate) * 8 + candidate;
const oracleExpansion = (input) => {
  const candidates = [];
  for (let candidate = 0; candidate <= 7; candidate += 1) {
    if (candidateSufficient(input, candidate)) candidates.push(candidate);
  }
  candidates.sort((left, right) => candidateRank(left) - candidateRank(right));
  return candidates[0] ?? -1;
};
const packCertificate = (disposition, expansion) =>
  disposition + expansion * 8 + popcount(expansion) * 64;
const oracleCertificate = (input) => {
  if (!validInput(input)) return 0;
  const expansion = oracleExpansion(input);
  if (expansion < 0) return 4;
  return packCertificate(expansion === 0 ? 1 : 2, expansion);
};
const decodeCertificate = (packed) => ({
  dispositionCode: packed % 8,
  expansionMask: Math.floor(packed / 8) % 8,
  cost: Math.floor(packed / 64) % 4,
});
const certificateIsMinimal = (input, packed) => {
  if (!validInput(input)) return packed === 0;
  const decoded = decodeCertificate(packed);
  const expectedExpansion = oracleExpansion(input);
  if (expectedExpansion < 0) {
    return (
      decoded.dispositionCode === 4 &&
      decoded.expansionMask === 0 &&
      decoded.cost === 0
    );
  }
  const expectedDisposition = expectedExpansion === 0 ? 1 : 2;
  return (
    decoded.dispositionCode === expectedDisposition &&
    decoded.expansionMask === expectedExpansion &&
    decoded.cost === popcount(expectedExpansion) &&
    candidateSufficient(input, decoded.expansionMask)
  );
};

const maskValues = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
const recommendationValues = [0, 1, 2, 3];
const dispositionNames = {
  0: 'REFUSE',
  1: 'IDENTIFIED',
  2: 'EXPAND_AUTHORITY',
  4: 'ABSTAIN_QUERY_UNIVERSE',
};
const coverage = {
  boundedStatesChecked: 0,
  validStatesChecked: 0,
  invalidStatesRefused: 0,
  dispositions: {
    REFUSE: 0,
    IDENTIFIED: 0,
    EXPAND_AUTHORITY: 0,
    ABSTAIN_QUERY_UNIVERSE: 0,
  },
  expansionCardinality: {zero: 0, one: 0, two: 0, three: 0},
};
let parityMismatches = 0;
let referenceMismatches = 0;
let validityMismatches = 0;
let minimalityFailures = 0;

if (instance) {
  const api = instance.exports;
  for (const authority of maskValues) {
    for (const answers0 of maskValues) {
      for (const answers1 of maskValues) {
        for (const answers2 of maskValues) {
          for (const r0 of recommendationValues) {
            for (const r1 of recommendationValues) {
              for (const r2 of recommendationValues) {
                const input = [authority, answers0, answers1, answers2, r0, r1, r2];
                const args = input.map(BigInt);
                const expected = oracleCertificate(input);
                const expectedValidity = validInput(input) ? 1 : 0;
                const actualValidity = Number(api.ap_valid_inputs(...args));
                const actual = Number(api.ap_certificate(...args));
                const reference = Number(api.ap_reference_certificate(...args));
                const decoded = decodeCertificate(actual);
                const name = dispositionNames[decoded.dispositionCode];

                coverage.boundedStatesChecked += 1;
                if (expectedValidity === 1) {
                  coverage.validStatesChecked += 1;
                  const costNames = ['zero', 'one', 'two', 'three'];
                  if (costNames[decoded.cost]) {
                    coverage.expansionCardinality[costNames[decoded.cost]] += 1;
                  }
                } else if (actual === 0) {
                  coverage.invalidStatesRefused += 1;
                }
                if (name) coverage.dispositions[name] += 1;
                else parityMismatches += 1;

                if (actualValidity !== expectedValidity) validityMismatches += 1;
                if (actual !== expected) parityMismatches += 1;
                if (reference !== expected) referenceMismatches += 1;
                if (!certificateIsMinimal(input, actual)) minimalityFailures += 1;
              }
            }
          }
        }
      }
    }
  }

  check(api.main() === 96n, 'WASM: self-check did not return 96');
  check(
    api.ap_exhaustive_self_check() === 0n,
    'WASM: 32,768-state internal exhaustive check failed',
  );
}

check(validityMismatches === 0, 'WASM: input-validity oracle mismatch');
check(parityMismatches === 0, 'WASM: host certificate oracle mismatch');
check(referenceMismatches === 0, 'WASM: internal reference oracle mismatch');
check(minimalityFailures === 0, 'WASM: certificate minimality failure');
check(
  coverage.boundedStatesChecked === 640000 &&
    coverage.validStatesChecked === 32768 &&
    coverage.invalidStatesRefused === 607232,
  'WASM: bounded-domain coverage drift',
);
check(
  JSON.stringify(coverage.dispositions) ===
    JSON.stringify({
      REFUSE: 607232,
      IDENTIFIED: 18032,
      EXPAND_AUTHORITY: 8976,
      ABSTAIN_QUERY_UNIVERSE: 5760,
    }),
  'WASM: disposition census drift',
);
check(
  JSON.stringify(coverage.expansionCardinality) ===
    JSON.stringify({zero: 23792, one: 8112, two: 864, three: 0}),
  'WASM: expansion-cardinality census drift',
);

const observedVectors = [];
if (instance) {
  for (const vector of vectors.cases ?? []) {
    const packed = Number(
      instance.exports.ap_certificate(...vector.input.map(BigInt)),
    );
    const decoded = decodeCertificate(packed);
    check(packed === vector.expected.packed, `${vector.id}: packed result mismatch`);
    check(
      dispositionNames[decoded.dispositionCode] === vector.expected.disposition,
      `${vector.id}: disposition mismatch`,
    );
    check(
      decoded.expansionMask === vector.expected.expansionMask,
      `${vector.id}: expansion-mask mismatch`,
    );
    check(decoded.cost === vector.expected.cost, `${vector.id}: cost mismatch`);
    observedVectors.push({
      id: vector.id,
      packed,
      disposition: dispositionNames[decoded.dispositionCode],
      expansionMask: decoded.expansionMask,
      cost: decoded.cost,
    });
  }
}

check(
  vectors.schema === 'darwin.auctoritas.protocol-vectors.v0.6',
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
  parentReceipt.schema === 'darwin.auctoritas.authority-identifiability-receipt.v0.5' &&
    parentReceipt.compilerReconciled === true &&
    refusalBoundaryValid(parentReceipt),
  'parent receipt: v0.5 gate or refusal boundary invalid',
);

check(
  evidence.schema === 'darwin.auctoritas.protocol-execution-evidence.v0.6',
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
check(evidence.wasm?.mainResult === 96, 'evidence: WASM self-check mismatch');
check(evidence.wasm?.imports?.length === 0, 'evidence: WASM imports hidden');
check(
  JSON.stringify(evidence.wasm?.exports) === JSON.stringify(expectedExports),
  'evidence: WASM export surface mismatch',
);
check(
  evidence.native?.sha256 === evidence.native?.repeatSha256 &&
    evidence.native?.sha256 === sha256File(nativePath) &&
    evidence.native?.bytes === statSync(nativePath).size &&
    evidence.native?.executionExitCode === 96 &&
    evidence.native?.repeatExecutionExitCode === 96,
  'evidence: native identity, determinism, or execution mismatch',
);
check(
  evidence.lean?.buildPassed === true &&
    evidence.lean?.projectDeclaredAxioms?.length === 0 &&
    evidence.lean?.theorems?.adaptiveNoEscape?.standardAxioms?.length === 0 &&
    evidence.lean?.theorems?.adaptiveZeroErrorForcesAbstention
      ?.standardAxioms?.length === 0 &&
    evidence.lean?.theorems?.seededZeroErrorForcesAbstention
      ?.standardAxioms?.length === 0,
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
      JSON.stringify(coverage.dispositions) &&
    JSON.stringify(evidence.exhaustive?.expansionCardinality) ===
      JSON.stringify(coverage.expansionCardinality),
  'evidence: exhaustive coverage mismatch',
);
check(
  JSON.stringify(evidence.observedVectors) === JSON.stringify(observedVectors),
  'evidence: canonical vector observations drift',
);

check(
  receipt.schema === 'darwin.auctoritas.protocol-calculus-receipt.v0.6',
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
    receipt.compiler?.sha256 === compilerReceipt.compiler?.sha256,
  'receipt: compiler identity mismatch',
);
check(
  receipt.sounio?.sourceSha256 === sha256File(sourcePath) &&
    receipt.sounio?.internalCanonicalStatesChecked === 32768 &&
    receipt.sounio?.selfCheckCode === 96,
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
  receipt.formal?.adaptiveNoEscapeProved === true &&
    receipt.formal?.adaptiveZeroErrorForcesAbstentionProved === true &&
    receipt.formal?.seededZeroErrorForcesAbstentionProved === true &&
    receipt.formal?.centralTheoremStandardAxioms?.length === 0,
  'receipt: formal theorem claim mismatch',
);
check(
  receipt.exhaustive?.boundedStatesChecked === coverage.boundedStatesChecked &&
    receipt.exhaustive?.parityMismatches === 0 &&
    receipt.exhaustive?.minimalityFailures === 0,
  'receipt: exhaustive certificate claim mismatch',
);

const expectedArtifactPaths = new Set([
  'docs/research/auctoritas-protocol-calculus/README.md',
  'docs/research/auctoritas-protocol-calculus/prior-art-frontier-v0.6.md',
  'docs/research/auctoritas-protocol-calculus/protocol-calculus-theory-v0.6.md',
  'docs/research/auctoritas-protocol-calculus/formal/closure-v0.6.md',
  'docs/research/auctoritas-protocol-calculus/formal/evidence/auctoritas-protocol-execution-evidence.v0.6.json',
  'docs/research/auctoritas-protocol-calculus/formal/lean4/AuctoritasProtocol.lean',
  'docs/research/auctoritas-protocol-calculus/formal/lean4/AuctoritasProtocolAudit.lean',
  'docs/research/auctoritas-protocol-calculus/formal/lean4/lake-manifest.json',
  'docs/research/auctoritas-protocol-calculus/formal/lean4/lakefile.lean',
  'docs/research/auctoritas-protocol-calculus/formal/lean4/lean-toolchain',
  'docs/research/auctoritas-protocol-calculus/formal/native/auctoritas_protocol.v0.6.linux-x86_64',
  'docs/research/auctoritas-protocol-calculus/formal/sounio/auctoritas_protocol_v0_6.sio',
  'docs/research/auctoritas-protocol-calculus/formal/vectors/auctoritas-protocol-v0.6.json',
  'docs/research/auctoritas-protocol-calculus/formal/wasm/auctoritas_protocol.v0.6.wasm',
  'scripts/verify-auctoritas-protocol-v0.6.mjs',
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
const invalidMaskRejected =
  instance?.exports.ap_certificate(8n, 0n, 0n, 0n, 1n, 2n, 1n) === 0n;
const forgedNonMinimalRejected = !certificateIsMinimal(
  [0, 0, 1, 0, 1, 2, 1],
  packCertificate(2, 3),
);
const forgedOverlapRejected = !certificateIsMinimal(
  [1, 0, 1, 2, 1, 2, 2],
  packCertificate(2, 3),
);
const forgedImpossiblePromotionRejected = !certificateIsMinimal(
  [0, 0, 0, 0, 1, 2, 1],
  packCertificate(2, 1),
);
check(tamperedArtifactDetected, 'negative gate: artifact tampering was accepted');
check(promotedReceiptRejected, 'negative gate: clinical promotion was accepted');
check(parentMismatchRejected, 'negative gate: parent mutation was accepted');
check(compilerMismatchRejected, 'negative gate: compiler mutation was accepted');
check(invalidMaskRejected, 'negative gate: invalid mask was accepted');
check(forgedNonMinimalRejected, 'negative gate: nonminimal certificate was accepted');
check(forgedOverlapRejected, 'negative gate: overlapping expansion was accepted');
check(
  forgedImpossiblePromotionRejected,
  'negative gate: impossible family was promoted',
);

const result = {
  schema: 'darwin.auctoritas.protocol-runtime-verification.v0.6',
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
  minimalityFailures,
  negativeGates: {
    tamperedArtifactDetected,
    promotedReceiptRejected,
    parentMismatchRejected,
    compilerMismatchRejected,
    invalidMaskRejected,
    forgedNonMinimalRejected,
    forgedOverlapRejected,
    forgedImpossiblePromotionRejected,
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
