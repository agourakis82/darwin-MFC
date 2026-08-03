import {createHash} from 'node:crypto';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildTranscriptSource} from './generate-normative-hermeticity-native-transcript-v0.8.mjs';

const verifierPath = fileURLToPath(import.meta.url);
const repoRoot = resolve(dirname(verifierPath), '..');
const packageDir = resolve(
  repoRoot,
  'docs/research/normative-hermeticity',
);
const formalDir = resolve(packageDir, 'formal');
const sourcePath = resolve(formalDir, 'sounio/normative_hermeticity_v0_8.sio');
const wasmPath = resolve(formalDir, 'wasm/normative_hermeticity.v0.8.wasm');
const nativePath = resolve(
  formalDir,
  'native/normative_hermeticity.v0.8.linux-x86_64',
);
const transcriptSourcePath = resolve(
  formalDir,
  'transcript/normative_hermeticity_transcript_v0_8.sio',
);
const transcriptNativePath = resolve(
  formalDir,
  'native/normative_hermeticity_transcript.v0.8.linux-x86_64',
);
const transcriptGeneratorPath = resolve(
  repoRoot,
  'scripts/generate-normative-hermeticity-native-transcript-v0.8.mjs',
);
const vectorsPath = resolve(
  formalDir,
  'vectors/normative-hermeticity-v0.8.json',
);
const evidencePath = resolve(
  formalDir,
  'evidence/normative-hermeticity-execution-evidence.v0.8.json',
);
const receiptPath = resolve(
  formalDir,
  'normative-hermeticity-gate.receipt.v0.8.json',
);
const closurePath = resolve(formalDir, 'closure-v0.8.md');
const parentReceiptPath = resolve(
  repoRoot,
  'docs/research/revocable-normative-influence/formal/revocable-influence-gate.receipt.v0.7.json',
);
const compilerReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
);
const runtimeOnly = process.argv.includes('--runtime-only');

const vectors = JSON.parse(readFileSync(vectorsPath, 'utf8'));
const evidence = runtimeOnly
  ? null
  : JSON.parse(readFileSync(evidencePath, 'utf8'));
const receipt = runtimeOnly
  ? null
  : JSON.parse(readFileSync(receiptPath, 'utf8'));
const parentReceipt = JSON.parse(readFileSync(parentReceiptPath, 'utf8'));
const compilerReceipt = JSON.parse(readFileSync(compilerReceiptPath, 'utf8'));
const wasmBytes = readFileSync(wasmPath);
const canonicalSource = readFileSync(sourcePath, 'utf8');
const transcriptSource = readFileSync(transcriptSourcePath, 'utf8');
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
  transcriptSource === buildTranscriptSource(canonicalSource),
  'native transcript: generated source drift',
);

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
  'main',
  'memory',
  'nh_basis_score',
  'nh_basis_sufficient',
  'nh_binding_score',
  'nh_binding_sufficient',
  'nh_certificate',
  'nh_check_encoded_index',
  'nh_contains_q0',
  'nh_contains_q1',
  'nh_contains_q2',
  'nh_cut_score',
  'nh_cut_sufficient',
  'nh_difference_mask',
  'nh_exhaustive_self_check',
  'nh_exhaustive_walk',
  'nh_identifies3',
  'nh_min8',
  'nh_minimal_basis',
  'nh_minimal_binding',
  'nh_minimal_semantic_cut',
  'nh_pack_certificate',
  'nh_pair_separated',
  'nh_popcount',
  'nh_reference_certificate',
  'nh_reference_minimal_basis',
  'nh_reference_minimal_binding',
  'nh_reference_minimal_semantic_cut',
  'nh_remove_mask',
  'nh_subset',
  'nh_unbound_mask',
  'nh_valid_inputs',
  'nh_valid_label',
  'nh_valid_mask',
  'nh_verify_case',
];
const imports = module ? WebAssembly.Module.imports(module) : [];
const exports = module
  ? WebAssembly.Module.exports(module).map((entry) => entry.name).sort()
  : [];
check(imports.length === 0, 'WASM: hermeticity witness must have zero imports');
check(
  JSON.stringify(exports) === JSON.stringify(expectedExports),
  'WASM: export surface drift',
);
check(
  !exports.some((name) =>
    name.includes('select_label') || name.includes('label_for')),
  'WASM: executable must not export a normative-label selector',
);

const validMask = (value) => Number.isInteger(value) && value >= 0 && value <= 7;
const validLabel = (value) => value === 1 || value === 2;
const subset = (candidate, allowed) => (candidate & allowed) === candidate;
const popcount = (mask) =>
  (mask & 1 ? 1 : 0) + (mask & 2 ? 1 : 0) + (mask & 4 ? 1 : 0);
const validInput = ([declared, bound, resolutions0, resolutions1, resolutions2, label0, label1, label2]) =>
  validMask(declared) &&
  validMask(bound) &&
  validMask(resolutions0) &&
  validMask(resolutions1) &&
  validMask(resolutions2) &&
  validLabel(label0) &&
  validLabel(label1) &&
  validLabel(label2) &&
  subset(bound, declared);
const identifies = (mask, resolutions, labels) => {
  for (let left = 0; left < 3; left += 1) {
    for (let right = left + 1; right < 3; right += 1) {
      if (
        labels[left] !== labels[right] &&
        (((resolutions[left] ^ resolutions[right]) & mask) === 0)
      ) {
        return false;
      }
    }
  }
  return true;
};
const rankedMasks = [0, 1, 2, 4, 3, 5, 6, 7];
const minimalBasis = (allowed, resolutions, labels) =>
  rankedMasks.find(
    (candidate) =>
      subset(candidate, allowed) && identifies(candidate, resolutions, labels),
  ) ?? -1;
const minimalBinding = (bound, unbound, resolutions, labels) =>
  rankedMasks.find(
    (candidate) =>
      subset(candidate, unbound) &&
      identifies(bound | candidate, resolutions, labels),
  ) ?? -1;
const removeMask = (original, cut) => original & (7 ^ cut);
const minimalSemanticCut = (declared, resolutions, labels) =>
  rankedMasks.find(
    (candidate) =>
      subset(candidate, declared) &&
      !identifies(removeMask(declared, candidate), resolutions, labels),
  ) ?? -1;
const packCertificate = (disposition, mask) =>
  disposition + mask * 8 + popcount(mask) * 64;
const oracleCertificate = (input) => {
  if (!validInput(input)) return 0;
  const [declared, bound, ...rest] = input;
  const resolutions = rest.slice(0, 3);
  const labels = rest.slice(3, 6);
  if (!identifies(declared, resolutions, labels)) return 3;
  const basis = minimalBasis(bound, resolutions, labels);
  if (basis >= 0) return packCertificate(1, basis);
  const unbound = declared & (7 ^ bound);
  const binding = minimalBinding(bound, unbound, resolutions, labels);
  return binding < 0 ? 4 : packCertificate(2, binding);
};
const decodeCertificate = (packed) => ({
  dispositionCode: packed % 8,
  mask: Math.floor(packed / 8) % 8,
  cost: Math.floor(packed / 64) % 4,
});
const inputFromCanonicalIndex = (index) => [
  Math.floor(index / 32768) % 8,
  Math.floor(index / 4096) % 8,
  Math.floor(index / 512) % 8,
  Math.floor(index / 64) % 8,
  Math.floor(index / 8) % 8,
  (Math.floor(index / 4) % 2) + 1,
  (Math.floor(index / 2) % 2) + 1,
  (index % 2) + 1,
];
const certificateIsMinimal = (input, packed) => {
  if (!validInput(input)) return packed === 0;
  const decoded = decodeCertificate(packed);
  const [declared, bound, ...rest] = input;
  const resolutions = rest.slice(0, 3);
  const labels = rest.slice(3, 6);
  if (!identifies(declared, resolutions, labels)) {
    return (
      decoded.dispositionCode === 3 && decoded.mask === 0 && decoded.cost === 0
    );
  }
  const basis = minimalBasis(bound, resolutions, labels);
  if (basis >= 0) {
    return (
      decoded.dispositionCode === 1 &&
      decoded.mask === basis &&
      decoded.cost === popcount(basis) &&
      subset(decoded.mask, bound) &&
      identifies(decoded.mask, resolutions, labels)
    );
  }
  const unbound = declared & (7 ^ bound);
  const binding = minimalBinding(bound, unbound, resolutions, labels);
  return (
    binding >= 0 &&
    decoded.dispositionCode === 2 &&
    decoded.mask === binding &&
    decoded.cost === popcount(binding) &&
    subset(decoded.mask, unbound) &&
    identifies(bound | decoded.mask, resolutions, labels)
  );
};
const semanticCutIsMinimal = (declared, resolutions, labels, cut) => {
  const expected = minimalSemanticCut(declared, resolutions, labels);
  return (
    cut === expected &&
    (cut < 0 ||
      (subset(cut, declared) &&
        !identifies(removeMask(declared, cut), resolutions, labels)))
  );
};

const maskValues = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
const labelValues = [0, 1, 2, 3];
const dispositionNames = {
  0: 'REFUSE',
  1: 'HERMETIC',
  2: 'BIND_REFERENCES',
  3: 'ABSTAIN_OPEN_SEMANTICS',
  4: 'REFUSE_INTERNAL_INCONSISTENCY',
};
const coverage = {
  hostileStatesChecked: 0,
  canonicalStatesChecked: 262144,
  validStatesChecked: 0,
  invalidStatesRefused: 0,
  distinctCutStatesChecked: 32768,
  dispositions: {
    REFUSE: 0,
    HERMETIC: 0,
    BIND_REFERENCES: 0,
    ABSTAIN_OPEN_SEMANTICS: 0,
    REFUSE_INTERNAL_INCONSISTENCY: 0,
  },
  certificateCardinality: {zero: 0, one: 0, two: 0, three: 0},
  cutCardinality: {none: 0, zero: 0, one: 0, two: 0, three: 0},
};
let parityMismatches = 0;
let referenceMismatches = 0;
let validityMismatches = 0;
let minimalityFailures = 0;
let cutMismatches = 0;
let cutMinimalityFailures = 0;
let wasmTranscript = {records: 0, bytes: 0, sha256: null};

if (instance) {
  const api = instance.exports;
  for (const declared of maskValues) {
    for (const bound of maskValues) {
      for (const resolutions0 of maskValues) {
        for (const resolutions1 of maskValues) {
          for (const resolutions2 of maskValues) {
            for (const label0 of labelValues) {
              for (const label1 of labelValues) {
                for (const label2 of labelValues) {
                  const input = [
                    declared,
                    bound,
                    resolutions0,
                    resolutions1,
                    resolutions2,
                    label0,
                    label1,
                    label2,
                  ];
                  const args = input.map(BigInt);
                  const expected = oracleCertificate(input);
                  const expectedValidity = validInput(input) ? 1 : 0;
                  const actualValidity = Number(api.nh_valid_inputs(...args));
                  const actual = Number(api.nh_certificate(...args));
                  const reference = Number(api.nh_reference_certificate(...args));
                  const decoded = decodeCertificate(actual);

                  coverage.hostileStatesChecked += 1;
                  if (expectedValidity === 1) {
                    coverage.validStatesChecked += 1;
                    const name = dispositionNames[decoded.dispositionCode];
                    if (name) coverage.dispositions[name] += 1;
                    const cardinalityName = ['zero', 'one', 'two', 'three'][decoded.cost];
                    if (cardinalityName) {
                      coverage.certificateCardinality[cardinalityName] += 1;
                    }
                    if (!certificateIsMinimal(input, actual)) minimalityFailures += 1;
                  } else if (actual === 0) {
                    coverage.invalidStatesRefused += 1;
                    coverage.dispositions.REFUSE += 1;
                  }

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

  for (let declared = 0; declared <= 7; declared += 1) {
    for (let resolutions0 = 0; resolutions0 <= 7; resolutions0 += 1) {
      for (let resolutions1 = 0; resolutions1 <= 7; resolutions1 += 1) {
        for (let resolutions2 = 0; resolutions2 <= 7; resolutions2 += 1) {
          for (let label0 = 1; label0 <= 2; label0 += 1) {
            for (let label1 = 1; label1 <= 2; label1 += 1) {
              for (let label2 = 1; label2 <= 2; label2 += 1) {
                const resolutions = [resolutions0, resolutions1, resolutions2];
                const labels = [label0, label1, label2];
                const expected = minimalSemanticCut(declared, resolutions, labels);
                const actual = Number(
                  api.nh_minimal_semantic_cut(
                    BigInt(declared),
                    BigInt(resolutions0),
                    BigInt(resolutions1),
                    BigInt(resolutions2),
                    BigInt(label0),
                    BigInt(label1),
                    BigInt(label2),
                  ),
                );
                const reference = Number(
                  api.nh_reference_minimal_semantic_cut(
                    BigInt(declared),
                    BigInt(resolutions0),
                    BigInt(resolutions1),
                    BigInt(resolutions2),
                    BigInt(label0),
                    BigInt(label1),
                    BigInt(label2),
                  ),
                );
                const cardinalityName =
                  actual < 0
                    ? 'none'
                    : ['zero', 'one', 'two', 'three'][popcount(actual)];
                coverage.cutCardinality[cardinalityName] += 1;
                if (actual !== expected || reference !== expected) cutMismatches += 1;
                if (!semanticCutIsMinimal(declared, resolutions, labels, actual)) {
                  cutMinimalityFailures += 1;
                }
              }
            }
          }
        }
      }
    }
  }

  const transcriptHash = createHash('sha256');
  let transcriptBytes = 0;
  for (let index = 0; index < 262144; index += 1) {
    const input = inputFromCanonicalIndex(index);
    const packed = Number(api.nh_certificate(...input.map(BigInt)));
    const cut = Number(
      api.nh_minimal_semantic_cut(
        ...[input[0], ...input.slice(2, 5), ...input.slice(5, 8)].map(BigInt),
      ),
    );
    const line = `${index}|${packed}|${cut}\n`;
    transcriptHash.update(line);
    transcriptBytes += Buffer.byteLength(line);
  }
  wasmTranscript = {
    records: 262144,
    bytes: transcriptBytes,
    sha256: transcriptHash.digest('hex'),
  };

  check(api.main() === 103n, 'WASM: self-check did not return 103');
  check(
    api.nh_exhaustive_self_check() === 0n,
    'WASM: 262,144-state internal exhaustive check failed',
  );
}

check(validityMismatches === 0, 'WASM: input-validity oracle mismatch');
check(parityMismatches === 0, 'WASM: host certificate oracle mismatch');
check(referenceMismatches === 0, 'WASM: internal reference oracle mismatch');
check(minimalityFailures === 0, 'WASM: certificate minimality failure');
check(cutMismatches === 0, 'WASM: semantic-cut oracle mismatch');
check(cutMinimalityFailures === 0, 'WASM: semantic-cut minimality failure');
check(
  coverage.hostileStatesChecked === 6400000 &&
    coverage.validStatesChecked === 110592 &&
    coverage.invalidStatesRefused === 6289408,
  'WASM: hostile-domain coverage drift',
);
check(
  JSON.stringify(coverage.dispositions) ===
    JSON.stringify({
      REFUSE: 6289408,
      HERMETIC: 49584,
      BIND_REFERENCES: 22224,
      ABSTAIN_OPEN_SEMANTICS: 38784,
      REFUSE_INTERNAL_INCONSISTENCY: 0,
    }),
  'WASM: disposition census drift',
);
check(
  JSON.stringify(coverage.certificateCardinality) ===
    JSON.stringify({zero: 66432, one: 39264, two: 4896, three: 0}),
  'WASM: certificate-cardinality census drift',
);
check(
  JSON.stringify(coverage.cutCardinality) ===
    JSON.stringify({none: 8192, zero: 14736, one: 8496, two: 1296, three: 48}),
  'WASM: semantic-cut census drift',
);

const observedVectors = [];
if (instance) {
  for (const vector of vectors.cases ?? []) {
    const packed = Number(
      instance.exports.nh_certificate(...vector.input.map(BigInt)),
    );
    const cut = Number(
      instance.exports.nh_minimal_semantic_cut(
        ...[
          vector.input[0],
          ...vector.input.slice(2, 5),
          ...vector.input.slice(5, 8),
        ].map(BigInt),
      ),
    );
    const decoded = decodeCertificate(packed);
    check(packed === vector.expected.packed, `${vector.id}: packed result mismatch`);
    check(
      dispositionNames[decoded.dispositionCode] === vector.expected.disposition,
      `${vector.id}: disposition mismatch`,
    );
    check(decoded.mask === vector.expected.mask, `${vector.id}: mask mismatch`);
    check(decoded.cost === vector.expected.cost, `${vector.id}: cost mismatch`);
    check(cut === vector.expected.cut, `${vector.id}: cut mismatch`);
    observedVectors.push({
      id: vector.id,
      packed,
      disposition: dispositionNames[decoded.dispositionCode],
      mask: decoded.mask,
      cost: decoded.cost,
      cut,
    });
  }
}

check(
  vectors.schema === 'darwin.normative-hermeticity.vectors.v0.8',
  'vectors: unexpected schema',
);
check(vectors.clinicalMeaning === false, 'vectors: clinical meaning introduced');
check(vectors.normativeLabelReturned === false, 'vectors: normative-label output introduced');
check(vectors.cases?.length === 8, 'vectors: canonical case count drift');

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
  parentReceipt.schema === 'darwin.revocable-normative-influence-receipt.v0.7' &&
    parentReceipt.compilerReconciled === true &&
    parentReceipt.nativeWasmParityEstablished === true &&
    refusalBoundaryValid(parentReceipt),
  'parent receipt: v0.7 gate or refusal boundary invalid',
);

if (runtimeOnly) {
  const result = {
    schema:
      'darwin.normative-hermeticity.runtime-only-verification.v0.8',
    compilerCommit: compilerReceipt.repository?.commit,
    compilerTree: compilerReceipt.repository?.tree,
    compilerSha256: compilerReceipt.compiler?.sha256,
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
    cutMismatches,
    cutMinimalityFailures,
    wasmTranscript,
    compilerReconciled: true,
    clinicalDisposition: 'REFUSE',
    productionAuthorized: false,
    noveltyEstablished: false,
    verified: errors.length === 0,
    errors,
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(errors.length === 0 ? 0 : 1);
}

check(
  evidence.schema ===
    'darwin.normative-hermeticity.execution-evidence.v0.8',
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
check(evidence.wasm?.mainResult === 103, 'evidence: WASM self-check mismatch');
check(evidence.wasm?.imports?.length === 0, 'evidence: WASM imports hidden');
check(
  JSON.stringify(evidence.wasm?.exports) === JSON.stringify(expectedExports),
  'evidence: WASM export surface mismatch',
);
check(
  evidence.native?.sha256 === evidence.native?.repeatSha256 &&
    evidence.native?.sha256 === sha256File(nativePath) &&
    evidence.native?.bytes === statSync(nativePath).size &&
    evidence.native?.executionExitCode === 103 &&
    evidence.native?.repeatExecutionExitCode === 103,
  'evidence: native identity, determinism, or execution mismatch',
);
check(
  evidence.nativeTranscript?.source?.sha256 === sha256File(transcriptSourcePath) &&
    evidence.nativeTranscript?.source?.bytes === statSync(transcriptSourcePath).size &&
    evidence.nativeTranscript?.source?.generatorSha256 ===
      sha256File(transcriptGeneratorPath),
  'evidence: native transcript source or generator mismatch',
);
check(
  evidence.nativeTranscript?.executable?.sha256 ===
      evidence.nativeTranscript?.executable?.repeatSha256 &&
    evidence.nativeTranscript?.executable?.sha256 ===
      sha256File(transcriptNativePath) &&
    evidence.nativeTranscript?.executable?.bytes ===
      statSync(transcriptNativePath).size &&
    evidence.nativeTranscript?.execution?.exitCode === 0 &&
    evidence.nativeTranscript?.execution?.repeatExitCode === 0 &&
    evidence.nativeTranscript?.execution?.stdoutSha256 ===
      evidence.nativeTranscript?.execution?.repeatStdoutSha256 &&
    evidence.nativeTranscript?.execution?.stdoutSha256 ===
      wasmTranscript.sha256 &&
    evidence.nativeTranscript?.execution?.stdoutBytes === wasmTranscript.bytes &&
    evidence.nativeTranscript?.execution?.records === wasmTranscript.records &&
    evidence.nativeTranscript?.exactNativeWasmParity === true,
  'evidence: exact native/WASM transcript parity missing',
);
check(
  evidence.lean?.buildPassed === true &&
    evidence.lean?.projectDeclaredAxioms?.length === 0 &&
    evidence.lean?.theorems?.noUnboundInfluence?.standardAxioms?.length === 0 &&
    evidence.lean?.theorems?.forcedAbstention?.standardAxioms?.length === 0 &&
    evidence.lean?.theorems?.seededForcedAbstention?.standardAxioms?.length === 0,
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
  evidence.exhaustive?.hostileStatesChecked === coverage.hostileStatesChecked &&
    evidence.exhaustive?.canonicalStatesChecked === coverage.canonicalStatesChecked &&
    evidence.exhaustive?.validStatesChecked === coverage.validStatesChecked &&
    evidence.exhaustive?.invalidStatesRefused === coverage.invalidStatesRefused &&
    evidence.exhaustive?.distinctCutStatesChecked ===
      coverage.distinctCutStatesChecked &&
    JSON.stringify(evidence.exhaustive?.dispositions) ===
      JSON.stringify(coverage.dispositions) &&
    JSON.stringify(evidence.exhaustive?.certificateCardinality) ===
      JSON.stringify(coverage.certificateCardinality) &&
    JSON.stringify(evidence.exhaustive?.cutCardinality) ===
      JSON.stringify(coverage.cutCardinality),
  'evidence: exhaustive coverage mismatch',
);
check(
  JSON.stringify(evidence.observedVectors) === JSON.stringify(observedVectors),
  'evidence: canonical vector observations drift',
);

check(
  receipt.schema === 'darwin.normative-hermeticity-receipt.v0.8',
  'receipt: unexpected schema',
);
check(refusalBoundaryValid(receipt), 'receipt: clinical refusal boundary drift');
check(receipt.status === 'ABSTRACT_RESEARCH_ONLY', 'receipt: status drift');
check(receipt.compilerReconciled === true, 'receipt: compiler reconciliation missing');
check(
  receipt.nativeWasmParityEstablished === true,
  'receipt: native/WASM parity missing',
);
check(
  receipt.nativeTranscript?.stdoutSha256 === wasmTranscript.sha256 &&
    receipt.nativeTranscript?.stdoutBytes === wasmTranscript.bytes &&
    receipt.nativeTranscript?.records === wasmTranscript.records &&
    receipt.nativeTranscript?.exactParity === true,
  'receipt: exact native/WASM transcript parity mismatch',
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
    receipt.sounio?.internalCanonicalStatesChecked === 262144 &&
    receipt.sounio?.selfCheckCode === 103 &&
    receipt.sounio?.normativeLabelReturned === false,
  'receipt: Sounio identity, coverage, or boundary mismatch',
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
  receipt.formal?.noUnboundInfluenceProved === true &&
    receipt.formal?.zeroErrorForcedAbstentionProved === true &&
    receipt.formal?.seededZeroErrorForcedAbstentionProved === true &&
    receipt.formal?.centralTheoremStandardAxioms?.length === 0,
  'receipt: formal theorem claim mismatch',
);
check(
  receipt.exhaustive?.hostileStatesChecked === coverage.hostileStatesChecked &&
    receipt.exhaustive?.parityMismatches === 0 &&
    receipt.exhaustive?.minimalityFailures === 0 &&
    receipt.exhaustive?.cutMinimalityFailures === 0,
  'receipt: exhaustive certificate claim mismatch',
);

const expectedArtifactPaths = new Set([
  'docs/research/normative-hermeticity/README.md',
  'docs/research/normative-hermeticity/prior-art-frontier-v0.8.md',
  'docs/research/normative-hermeticity/normative-hermeticity-theory-v0.8.md',
  'docs/research/normative-hermeticity/formal/closure-v0.8.md',
  'docs/research/normative-hermeticity/formal/evidence/normative-hermeticity-execution-evidence.v0.8.json',
  'docs/research/normative-hermeticity/formal/lean4/NormativeHermeticity.lean',
  'docs/research/normative-hermeticity/formal/lean4/NormativeHermeticityAudit.lean',
  'docs/research/normative-hermeticity/formal/lean4/lake-manifest.json',
  'docs/research/normative-hermeticity/formal/lean4/lakefile.lean',
  'docs/research/normative-hermeticity/formal/lean4/lean-toolchain',
  'docs/research/normative-hermeticity/formal/native/normative_hermeticity.v0.8.linux-x86_64',
  'docs/research/normative-hermeticity/formal/native/normative_hermeticity_transcript.v0.8.linux-x86_64',
  'docs/research/normative-hermeticity/formal/sounio/normative_hermeticity_v0_8.sio',
  'docs/research/normative-hermeticity/formal/transcript/normative_hermeticity_transcript_v0_8.sio',
  'docs/research/normative-hermeticity/formal/vectors/normative-hermeticity-v0.8.json',
  'docs/research/normative-hermeticity/formal/wasm/normative_hermeticity.v0.8.wasm',
  'scripts/verify-normative-hermeticity-v0.8.mjs',
  'scripts/generate-normative-hermeticity-native-transcript-v0.8.mjs',
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
  instance?.exports.nh_certificate(8n, 0n, 0n, 0n, 0n, 1n, 2n, 1n) === 0n;
const boundOutsideDeclaredRejected =
  instance?.exports.nh_certificate(1n, 2n, 0n, 1n, 0n, 1n, 2n, 1n) === 0n;
const forgedNonMinimalBasisRejected = !certificateIsMinimal(
  [3, 3, 0, 1, 0, 1, 2, 1],
  packCertificate(1, 3),
);
const forgedBindingUsesBoundRejected = !certificateIsMinimal(
  [3, 1, 0, 1, 2, 1, 2, 2],
  packCertificate(2, 3),
);
const forgedNonMinimalBindingRejected = !certificateIsMinimal(
  [3, 0, 0, 1, 0, 1, 2, 1],
  packCertificate(2, 3),
);
const forgedNonSeparatingSemanticCutRejected = !semanticCutIsMinimal(
  3,
  [0, 1, 0],
  [1, 2, 1],
  2,
);
const forgedNonMinimalSemanticCutRejected = !semanticCutIsMinimal(
  3,
  [0, 1, 0],
  [1, 2, 1],
  3,
);
const impossibleInconsistencyPromotionRejected = !certificateIsMinimal(
  [3, 0, 0, 1, 0, 1, 2, 1],
  4,
);
check(tamperedArtifactDetected, 'negative gate: artifact tampering was accepted');
check(promotedReceiptRejected, 'negative gate: clinical promotion was accepted');
check(parentMismatchRejected, 'negative gate: parent mutation was accepted');
check(compilerMismatchRejected, 'negative gate: compiler mutation was accepted');
check(invalidMaskRejected, 'negative gate: invalid mask was accepted');
check(
  boundOutsideDeclaredRejected,
  'negative gate: a bound reference outside the declared set was accepted',
);
check(
  forgedNonMinimalBasisRejected,
  'negative gate: nonminimal hermetic basis was accepted',
);
check(
  forgedBindingUsesBoundRejected,
  'negative gate: binding reused an already bound reference',
);
check(
  forgedNonMinimalBindingRejected,
  'negative gate: nonminimal reference binding was accepted',
);
check(
  forgedNonSeparatingSemanticCutRejected,
  'negative gate: non-separating semantic cut was accepted',
);
check(
  forgedNonMinimalSemanticCutRejected,
  'negative gate: nonminimal semantic cut was accepted',
);
check(
  impossibleInconsistencyPromotionRejected,
  'negative gate: impossible internal disposition was promoted',
);

const result = {
  schema: 'darwin.normative-hermeticity.runtime-verification.v0.8',
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
  cutMismatches,
  cutMinimalityFailures,
  wasmTranscript,
  negativeGates: {
    tamperedArtifactDetected,
    promotedReceiptRejected,
    parentMismatchRejected,
    compilerMismatchRejected,
    invalidMaskRejected,
    boundOutsideDeclaredRejected,
    forgedNonMinimalBasisRejected,
    forgedBindingUsesBoundRejected,
    forgedNonMinimalBindingRejected,
    forgedNonSeparatingSemanticCutRejected,
    forgedNonMinimalSemanticCutRejected,
    impossibleInconsistencyPromotionRejected,
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
