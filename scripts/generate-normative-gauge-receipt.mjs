import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildNormativeGaugeSource} from './generate-normative-gauge-source.mjs';
import {buildTranscriptSource} from './generate-normative-gauge-native-transcript.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/normative-gauge/formal');
const receiptPath = resolve(formalDir, 'normative-gauge-gate.receipt.v1.0.json');
const runtimeEvidencePath = resolve(formalDir, 'evidence/runtime-verification.v1.0.json');
const leanEvidencePath = resolve(formalDir, 'evidence/lean-verification.v1.0.json');
const buildEvidencePath = resolve(formalDir, 'evidence/source-fresh-build.v1.0.json');
const compilerReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
);
const parentReceiptPath = resolve(
  repoRoot,
  'docs/research/normative-holonomy/formal/normative-holonomy-gate.receipt.v0.9.json',
);
const parentSourcePath = resolve(
  repoRoot,
  'docs/research/normative-holonomy/formal/sounio/normative_holonomy_v0_9.sio',
);
const sourcePath = resolve(formalDir, 'sounio/normative_gauge_v1_0.sio');
const wasmPath = resolve(formalDir, 'wasm/normative_gauge.v1.0.wasm');
const nativePath = resolve(formalDir, 'native/normative_gauge.v1.0.linux-x86_64');
const nativeTranscriptPath = resolve(
  formalDir,
  'native/normative_gauge_transcript.v1.0.linux-x86_64',
);
const transcriptPath = resolve(formalDir, 'transcripts/canonical-domain.v1.0.txt');
const transcriptSourcePath = resolve(
  formalDir,
  'transcripts/normative_gauge_transcript_v1_0.sio',
);
const writeReceipt = process.argv.slice(2).includes('--write-receipt');

const artifactPaths = [
  'package.json',
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
  'docs/research/normative-holonomy/formal/normative-holonomy-gate.receipt.v0.9.json',
  'docs/research/normative-gauge/README.md',
  'docs/research/normative-gauge/normative-gauge-theory-v1.0.md',
  'docs/research/normative-gauge/prior-art-frontier-v1.0.md',
  'docs/research/normative-gauge/formal/closure-v1.0.md',
  'docs/research/normative-gauge/formal/evidence/runtime-verification.v1.0.json',
  'docs/research/normative-gauge/formal/evidence/lean-verification.v1.0.json',
  'docs/research/normative-gauge/formal/evidence/source-fresh-build.v1.0.json',
  'docs/research/normative-gauge/formal/evidence/build-logs/ng-wasm-a.log',
  'docs/research/normative-gauge/formal/evidence/build-logs/ng-wasm-b.log',
  'docs/research/normative-gauge/formal/evidence/build-logs/ng-native-a.log',
  'docs/research/normative-gauge/formal/evidence/build-logs/ng-native-b.log',
  'docs/research/normative-gauge/formal/evidence/build-logs/ng-transcript-a.log',
  'docs/research/normative-gauge/formal/evidence/build-logs/ng-transcript-b.log',
  'docs/research/normative-gauge/formal/lean4/NormativeGauge.lean',
  'docs/research/normative-gauge/formal/lean4/NormativeGaugeAudit.lean',
  'docs/research/normative-gauge/formal/lean4/lakefile.lean',
  'docs/research/normative-gauge/formal/lean4/lake-manifest.json',
  'docs/research/normative-gauge/formal/lean4/lean-toolchain',
  'docs/research/normative-gauge/formal/sounio/normative_gauge_v1_0.sio',
  'docs/research/normative-gauge/formal/vectors/normative-gauge-vectors.v1.0.json',
  'docs/research/normative-gauge/formal/transcripts/canonical-domain.v1.0.txt',
  'docs/research/normative-gauge/formal/transcripts/normative_gauge_transcript_v1_0.sio',
  'docs/research/normative-gauge/formal/native/normative_gauge.v1.0.linux-x86_64',
  'docs/research/normative-gauge/formal/native/normative_gauge_transcript.v1.0.linux-x86_64',
  'docs/research/normative-gauge/formal/wasm/normative_gauge.v1.0.wasm',
  'scripts/generate-normative-gauge-source.mjs',
  'scripts/generate-normative-gauge-native-transcript.mjs',
  'scripts/generate-normative-gauge-vectors.mjs',
  'scripts/normative-gauge-oracle.mjs',
  'scripts/verify-normative-gauge.mjs',
  'scripts/verify-normative-gauge-lean.mjs',
  'scripts/generate-normative-gauge-receipt.mjs',
  'scripts/verify-normative-gauge-gate.mjs',
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
check(build.verified === true, 'source-fresh build evidence is not verified');

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
  build.parentReceipt?.sha256 === sha256File(parentReceiptPath) &&
    build.parentReceipt?.bytes === statSync(parentReceiptPath).size,
  'build/parent receipt cross-link mismatch',
);
check(
  build.compiler?.sha256 === compilerReceipt.compiler?.sha256 &&
    build.compiler?.commit === compilerReceipt.repository?.commit &&
    build.compiler?.tree === compilerReceipt.repository?.tree &&
    build.compiler?.compilerReconciled === true,
  'build/compiler identity mismatch',
);

const parentSource = readFileSync(parentSourcePath, 'utf8');
const source = readFileSync(sourcePath, 'utf8');
const transcriptSource = readFileSync(transcriptSourcePath, 'utf8');
check(source === buildNormativeGaugeSource(parentSource), 'canonical source lineage drift');
check(transcriptSource === buildTranscriptSource(source), 'transcript source lineage drift');
check(!/\bwith\s+IO\b/.test(source), 'canonical source gained IO');
check(
  build.source?.sha256 === sha256File(sourcePath) &&
    build.source?.remoteSha256 === build.source?.sha256 &&
    build.source?.bytes === statSync(sourcePath).size &&
    build.source?.ioEffects === false,
  'canonical Sounio source identity drift',
);

check(
  build.wasm?.sha256 === sha256File(wasmPath) &&
    build.wasm?.repeatSha256 === build.wasm?.sha256 &&
    build.wasm?.bytes === statSync(wasmPath).size &&
    build.wasm?.deterministic === true &&
    build.wasm?.selfCheckResult === 110,
  'WASM source-fresh build drift',
);
check(
  runtime.wasm?.sha256 === sha256File(wasmPath) &&
    runtime.wasm?.bytes === statSync(wasmPath).size &&
    runtime.wasm?.imports?.length === 0 &&
    runtime.wasm?.expectedExportCount === 61 &&
    runtime.wasm?.mainResult === 110,
  'WASM runtime evidence drift',
);
check(
  build.native?.sha256 === sha256File(nativePath) &&
    build.native?.repeatSha256 === build.native?.sha256 &&
    build.native?.bytes === statSync(nativePath).size &&
    JSON.stringify(build.native?.executionExitCodes) === JSON.stringify([110, 110]) &&
    build.native?.deterministic === true,
  'native source-fresh build drift',
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
    build.parity?.nativeWasmCanonicalTranscriptParityEstablished === true,
  'exact native/WASM transcript parity missing',
);
for (const log of build.buildLogs ?? []) {
  const path = resolve(repoRoot, log.path);
  const text = readFileSync(path, 'utf8');
  check(log.sha256 === sha256File(path) && log.bytes === statSync(path).size,
    `build log drift: ${log.path}`);
  check(text.includes('Compilation successful!'), `build did not report success: ${log.path}`);
}

check(
  runtime.boundedDomain?.canonicalStates === 4096 &&
    runtime.boundedDomain?.canonicalValidStates === 1728 &&
    runtime.boundedDomain?.canonicalMismatches === 0 &&
    runtime.boundedDomain?.hostileStates === 21600 &&
    runtime.boundedDomain?.hostileInvalidStates === 19872 &&
    runtime.boundedDomain?.hostileMismatches === 0,
  'bounded-domain coverage drift',
);
check(
  runtime.gaugeOrbit?.group === 'C2^3' &&
    runtime.gaugeOrbit?.transformationChecks === 1536 &&
    runtime.gaugeOrbit?.transformationMismatches === 0 &&
    runtime.gaugeOrbit?.groupCompositionChecks === 4096 &&
    runtime.gaugeOrbit?.groupCompositionMismatches === 0 &&
    runtime.gaugeOrbit?.gaugeChecks === 32768 &&
    runtime.gaugeOrbit?.gaugeMismatches === 0 &&
    runtime.gaugeOrbit?.mapOrbitClasses === 9 &&
    runtime.gaugeOrbit?.canonicalAnalyzerAnomalies === 0 &&
    runtime.gaugeOrbit?.canonicalRepairAnomalies === 0 &&
    runtime.gaugeOrbit?.canonicalCertificateAnomalies === 0,
  'gauge-orbit coverage drift',
);
check(
  runtime.mutationAdequacy?.mutants === 6 &&
    runtime.mutationAdequacy?.killed === 6 &&
    runtime.mutationAdequacy?.results?.every(
      (entry) => entry.killed && entry.oracleMismatches === 0 && entry.minimalCounterexample,
    ),
  'gauge mutation adequacy drift',
);
check(
  runtime.boundedDomain?.dispositionCensus?.REFUSE_GAUGE_ANOMALY === 0 &&
    runtime.boundedDomain?.dispositionCensus?.REFUSE_INTERNAL_INCONSISTENCY === 0,
  'canonical disposition census drift',
);
check(
  runtime.transcript?.sha256 === sha256File(transcriptPath) &&
    runtime.transcript?.lines === 4096 &&
    runtime.transcript?.bytes === statSync(transcriptPath).size,
  'runtime transcript identity drift',
);
check(runtime.vectors?.cases === 12 && runtime.vectors?.passed === 12,
  'representative vector coverage drift');

check(
  lean.build?.verified === true &&
    lean.audit?.axiomFreeCoreEstablished === true &&
    lean.audit?.onlyApprovedAxioms === true &&
    Object.values(lean.audit?.forbidden ?? {}).every((count) => count === 0) &&
    lean.executableSemanticsMechanized === false &&
    lean.emittedWasmSemanticsMechanized === false,
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
  schema: 'darwin.normative-gauge-gate-receipt.v1.0',
  generatedAt,
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  compilerReconciled: true,
  leanGaugeModelEstablished: true,
  finiteGaugeOrbitComplete: true,
  gaugeInvariantExecutableEstablishedForDeclaredDomain: true,
  mutationAdequacyEstablished: true,
  nativeWasmSelfCheckParityEstablished: true,
  nativeWasmCanonicalTranscriptParityEstablished: true,
  allInternalExportParityEstablished: false,
  executableSemanticsMechanized: false,
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
    localGaugeGroup: 'C2^3',
    gaugeElements: 8,
    edgeMaskDomain: [0, 7],
    mapCodeDomain: [0, 3],
    canonicalStates: 4096,
    canonicalValidStates: 1728,
    edgeTransformationChecks: 1536,
    groupCompositionChecks: 4096,
    gaugeChecks: 32768,
    hostileStates: 21600,
    mapOrbitClasses: 9,
    mutants: 6,
    mutantsKilled: 6,
    expectedSelfCheckCode: 110,
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
    axiomFreeCoreEstablished: true,
    onlyApprovedAxioms: true,
    executableSemanticsMechanized: false,
  },
  artifacts,
  claims: {
    established: [
      'global-section existence is invariant under the declared local bijective gauges',
      'holonomy fixed-point existence and forced abstention are gauge invariant in the Lean model',
      'a coordinate-sensitive analyzer has a constructive gauge anomaly',
      'the executable Boolean gauge action satisfies the C2^3 composition law over all map triples',
      'complete finite-orbit invariance over 4,096 states and 8 gauges per state',
      'six coordinate-sensitive executable mutants are detected with counterexamples',
      'source-fresh deterministic native and WASM builds',
      'exact native/WASM five-field transcript parity over 4,096 canonical states',
    ],
    notEstablished: [
      'mechanized semantics of the Sounio executable or emitted WASM bytes',
      'parity of every internal native and WASM helper export',
      'semantic equivalence or authority of any real terminology mapping',
      'correctness of any real-world normative translation',
      'scientific novelty or priority',
      'empirical, clinical, regulatory, legal, or production validity',
    ],
  },
  invalidation: [
    'parent or compiler receipt identity changes',
    'any listed artifact hash or byte size changes',
    'Lean build, forbidden-token scan, or axiom audit changes',
    'canonical, hostile, or complete gauge-orbit verification ceases to pass',
    'one or more coordinate-sensitive mutants survive',
    'native/WASM transcript identity changes',
    'clinical refusal, authorization, signature, or novelty boundary changes',
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
