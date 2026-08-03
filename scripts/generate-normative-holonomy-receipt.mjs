import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildTranscriptSource} from './generate-normative-holonomy-native-transcript.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/normative-holonomy/formal');
const receiptPath = resolve(formalDir, 'normative-holonomy-gate.receipt.v0.9.json');
const runtimeEvidencePath = resolve(formalDir, 'evidence/runtime-verification.v0.9.json');
const leanEvidencePath = resolve(formalDir, 'evidence/lean-verification.v0.9.json');
const buildEvidencePath = resolve(formalDir, 'evidence/source-fresh-build.v0.9.json');
const compilerReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
);
const parentReceiptPath = resolve(
  repoRoot,
  'docs/research/normative-hermeticity/formal/normative-hermeticity-gate.receipt.v0.8.json',
);
const sourcePath = resolve(formalDir, 'sounio/normative_holonomy_v0_9.sio');
const wasmPath = resolve(formalDir, 'wasm/normative_holonomy.v0.9.wasm');
const nativePath = resolve(formalDir, 'native/normative_holonomy.v0.9.linux-x86_64');
const nativeTranscriptPath = resolve(
  formalDir,
  'native/normative_holonomy_transcript.v0.9.linux-x86_64',
);
const transcriptPath = resolve(formalDir, 'transcripts/canonical-domain.v0.9.txt');
const transcriptSourcePath = resolve(
  formalDir,
  'transcripts/normative_holonomy_transcript_v0_9.sio',
);
const writeReceipt = process.argv.slice(2).includes('--write-receipt');

const artifactPaths = [
  'package.json',
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
  'docs/research/normative-hermeticity/formal/normative-hermeticity-gate.receipt.v0.8.json',
  'docs/research/normative-holonomy/README.md',
  'docs/research/normative-holonomy/normative-holonomy-theory-v0.9.md',
  'docs/research/normative-holonomy/prior-art-frontier-v0.9.md',
  'docs/research/normative-holonomy/formal/closure-v0.9.md',
  'docs/research/normative-holonomy/formal/evidence/runtime-verification.v0.9.json',
  'docs/research/normative-holonomy/formal/evidence/lean-verification.v0.9.json',
  'docs/research/normative-holonomy/formal/evidence/source-fresh-build.v0.9.json',
  'docs/research/normative-holonomy/formal/lean4/NormativeHolonomy.lean',
  'docs/research/normative-holonomy/formal/lean4/NormativeHolonomyAudit.lean',
  'docs/research/normative-holonomy/formal/lean4/lakefile.lean',
  'docs/research/normative-holonomy/formal/lean4/lake-manifest.json',
  'docs/research/normative-holonomy/formal/lean4/lean-toolchain',
  'docs/research/normative-holonomy/formal/sounio/normative_holonomy_v0_9.sio',
  'docs/research/normative-holonomy/formal/vectors/normative-holonomy-vectors.v0.9.json',
  'docs/research/normative-holonomy/formal/transcripts/canonical-domain.v0.9.txt',
  'docs/research/normative-holonomy/formal/transcripts/normative_holonomy_transcript_v0_9.sio',
  'docs/research/normative-holonomy/formal/native/normative_holonomy.v0.9.linux-x86_64',
  'docs/research/normative-holonomy/formal/native/normative_holonomy_transcript.v0.9.linux-x86_64',
  'docs/research/normative-holonomy/formal/wasm/normative_holonomy.v0.9.wasm',
  'scripts/generate-normative-holonomy-native-transcript.mjs',
  'scripts/verify-normative-holonomy.mjs',
  'scripts/verify-normative-holonomy-lean.mjs',
  'scripts/generate-normative-holonomy-receipt.mjs',
  'scripts/verify-normative-holonomy-gate.mjs',
];

const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256Value = (value) => createHash('sha256').update(value).digest('hex');
const sha256File = (path) => sha256Value(readFileSync(path));
const readJson = (path, label) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    errors.push(`${label}: invalid JSON (${error.message})`);
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
const recordFor = (relativePath) => {
  const path = resolve(repoRoot, relativePath);
  return {path: relativePath, sha256: sha256File(path), bytes: statSync(path).size};
};

const runtime = readJson(runtimeEvidencePath, 'runtime evidence');
const lean = readJson(leanEvidencePath, 'Lean evidence');
const build = readJson(buildEvidencePath, 'source-fresh build evidence');
const compilerReceipt = readJson(compilerReceiptPath, 'compiler receipt');
const parentReceipt = readJson(parentReceiptPath, 'parent receipt');

check(boundaryValid(runtime), 'runtime evidence boundary drift');
check(boundaryValid(lean), 'Lean evidence boundary drift');
check(boundaryValid(build), 'build evidence boundary drift');
check(boundaryValid(parentReceipt), 'parent receipt boundary drift');
check(runtime.verified === true, 'runtime evidence is not verified');
check(lean.verified === true, 'Lean evidence is not verified');

check(
  compilerReceipt.schema === 'darwin.sounio.compiler-source-receipt.v1' &&
    compilerReceipt.status === 'SOURCE_FRESH_RECONCILED' &&
    compilerReceipt.compilerReconciled === true &&
    compilerReceipt.repository?.clean === true,
  'compiler is not source-fresh reconciled',
);
check(
  build.compilerReceipt?.sha256 === sha256File(compilerReceiptPath) &&
    build.compilerReceipt?.bytes === statSync(compilerReceiptPath).size,
  'build/compiler receipt cross-link mismatch',
);
check(
  build.compiler?.sha256 === compilerReceipt.compiler?.sha256 &&
    build.compiler?.commit === compilerReceipt.repository?.commit &&
    build.compiler?.tree === compilerReceipt.repository?.tree &&
    build.compiler?.compilerReconciled === true,
  'build/compiler identity mismatch',
);

check(
  build.source?.sha256 === sha256File(sourcePath) &&
    build.source?.remoteSha256 === build.source?.sha256 &&
    build.source?.bytes === statSync(sourcePath).size &&
    build.source?.ioEffects === false,
  'canonical Sounio source identity drift',
);
check(!/\bwith\s+IO\b/.test(readFileSync(sourcePath, 'utf8')), 'canonical source gained IO');
check(
  build.wasm?.sha256 === sha256File(wasmPath) &&
    build.wasm?.repeatSha256 === build.wasm?.sha256 &&
    build.wasm?.bytes === statSync(wasmPath).size &&
    build.wasm?.deterministic === true &&
    build.wasm?.selfCheckResult === 109,
  'WASM source-fresh build drift',
);
check(
  runtime.wasm?.sha256 === sha256File(wasmPath) &&
    runtime.wasm?.bytes === statSync(wasmPath).size &&
    runtime.wasm?.imports?.length === 0 &&
    runtime.wasm?.mainResult === 109,
  'WASM runtime evidence drift',
);
check(
  build.native?.sha256 === sha256File(nativePath) &&
    build.native?.repeatSha256 === build.native?.sha256 &&
    build.native?.bytes === statSync(nativePath).size &&
    build.native?.executionExitCode === 109 &&
    build.native?.repeatExecutionExitCode === 109 &&
    build.native?.deterministic === true,
  'native source-fresh build drift',
);

const canonicalSource = readFileSync(sourcePath, 'utf8');
const transcriptSource = readFileSync(transcriptSourcePath, 'utf8');
check(
  transcriptSource === buildTranscriptSource(canonicalSource),
  'native transcript source is not a deterministic canonical-source transform',
);
check(
  build.nativeTranscript?.source?.sha256 === sha256File(transcriptSourcePath) &&
    build.nativeTranscript?.source?.remoteSha256 ===
      build.nativeTranscript?.source?.sha256 &&
    build.nativeTranscript?.binary?.sha256 === sha256File(nativeTranscriptPath) &&
    build.nativeTranscript?.binary?.repeatSha256 ===
      build.nativeTranscript?.binary?.sha256 &&
    build.nativeTranscript?.binary?.deterministic === true,
  'native transcript source or binary drift',
);
check(
  build.nativeTranscript?.execution?.records === 4096 &&
    build.nativeTranscript?.execution?.stdoutBytes === statSync(transcriptPath).size &&
    build.nativeTranscript?.execution?.stdoutSha256 === sha256File(transcriptPath) &&
    build.nativeTranscript?.execution?.repeatStdoutSha256 === sha256File(transcriptPath) &&
    build.nativeTranscript?.execution?.wasmTranscriptSha256 === sha256File(transcriptPath) &&
    build.parity?.nativeWasmCanonicalResultParityEstablished === true,
  'exact native/WASM transcript parity missing',
);

check(
  runtime.boundedDomain?.canonicalStates === 4096 &&
    runtime.boundedDomain?.canonicalValidStates === 1728 &&
    runtime.boundedDomain?.canonicalMismatches === 0 &&
    runtime.boundedDomain?.sounioReferenceMismatches === 0 &&
    runtime.boundedDomain?.hostileStates === 21600 &&
    runtime.boundedDomain?.hostileInvalidStates === 19872 &&
    runtime.boundedDomain?.hostileMismatches === 0,
  'bounded-domain coverage drift',
);
check(
  runtime.boundedDomain?.census?.ABSTAIN_NONTRIVIAL_HOLONOMY === 32 &&
    runtime.boundedDomain?.census?.REFUSE_INTERNAL_INCONSISTENCY === 0,
  'holonomy census drift',
);
check(
  runtime.transcript?.sha256 === sha256File(transcriptPath) &&
    runtime.transcript?.lines === 4096 &&
    runtime.transcript?.bytes === statSync(transcriptPath).size,
  'runtime transcript identity drift',
);
check(
  runtime.vectors?.cases === 12 && runtime.vectors?.passed === 12,
  'representative vector coverage drift',
);

check(
  lean.build?.verified === true &&
    lean.audit?.centralTheoremsAxiomFree === true &&
    Object.values(lean.audit?.forbidden ?? {}).every((count) => count === 0) &&
    lean.binarySemanticsMechanized === false,
  'Lean proof or declared formal boundary drift',
);
for (const artifact of lean.artifacts ?? []) {
  const path = resolve(repoRoot, artifact.path);
  check(
    artifact.sha256 === sha256File(path) && artifact.bytes === statSync(path).size,
    `Lean artifact drift: ${artifact.path}`,
  );
}

const artifacts = artifactPaths.map(recordFor);
const generatedAt = process.env.RECEIPT_GENERATED_AT ?? new Date().toISOString();
const receipt = {
  schema: 'darwin.normative-holonomy-gate-receipt.v0.9',
  generatedAt,
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  compilerReconciled: true,
  leanModelEstablished: true,
  boundedDomainsComplete: true,
  nativeWasmSelfCheckParityEstablished: true,
  nativeWasmCanonicalResultParityEstablished: true,
  allInternalExportParityEstablished: false,
  emittedWasmSemanticsMechanized: false,
  parent: recordFor(relative(repoRoot, parentReceiptPath).replaceAll('\\', '/')),
  compilerReceipt: recordFor(relative(repoRoot, compilerReceiptPath).replaceAll('\\', '/')),
  evidence: {
    runtime: recordFor(relative(repoRoot, runtimeEvidencePath).replaceAll('\\', '/')),
    lean: recordFor(relative(repoRoot, leanEvidencePath).replaceAll('\\', '/')),
    sourceFreshBuild: recordFor(relative(repoRoot, buildEvidencePath).replaceAll('\\', '/')),
  },
  model: {
    vertices: ['A', 'B', 'C'],
    edgeMaskDomain: [0, 7],
    mapCodeDomain: [0, 3],
    canonicalStates: 4096,
    canonicalValidStates: 1728,
    hostileStates: 21600,
    expectedSelfCheckCode: 109,
    transcriptSha256: runtime.transcript?.sha256,
  },
  compiler: {
    repository: build.compiler?.repository,
    commit: build.compiler?.commit,
    tree: build.compiler?.tree,
    identity: build.compiler?.identity,
    sha256: build.compiler?.sha256,
  },
  wasm: recordFor(relative(repoRoot, wasmPath).replaceAll('\\', '/')),
  native: recordFor(relative(repoRoot, nativePath).replaceAll('\\', '/')),
  nativeTranscript: {
    binary: recordFor(relative(repoRoot, nativeTranscriptPath).replaceAll('\\', '/')),
    records: 4096,
    stdoutBytes: runtime.transcript?.bytes,
    stdoutSha256: runtime.transcript?.sha256,
  },
  lean: {
    toolchain: lean.toolchain?.declaration,
    centralTheoremsAxiomFree: true,
    binarySemanticsMechanized: false,
  },
  artifacts,
  claims: {
    established: [
      'global-section iff holonomy-fixed-point theorem in the declared triangle model',
      'locally bijective Boolean countermodel with no global section',
      'zero-error and seeded zero-error forced abstention',
      'source-fresh deterministic native and WASM builds',
      'complete independent-oracle coverage of the declared canonical and hostile domains',
      'exact native/WASM analyze and repair-cut transcript parity over 4,096 canonical states',
    ],
    notEstablished: [
      'mechanized semantics of emitted WASM bytes',
      'parity of every internal helper export',
      'correctness of any real-world normative translation',
      'scientific novelty or priority',
      'empirical, clinical, regulatory, or production validity',
    ],
  },
  invalidation: [
    'parent or compiler receipt identity changes',
    'any listed artifact hash or byte size changes',
    'Lean build or axiom audit changes',
    'canonical or hostile domain verification ceases to pass',
    'native/WASM transcript identity changes',
    'clinical refusal or novelty boundary changes',
  ],
};

if (errors.length > 0) {
  process.stdout.write(`${JSON.stringify({verified: false, errors}, null, 2)}\n`);
  process.exitCode = 1;
} else {
  if (writeReceipt) {
    mkdirSync(dirname(receiptPath), {recursive: true});
    writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  }
  process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
}
