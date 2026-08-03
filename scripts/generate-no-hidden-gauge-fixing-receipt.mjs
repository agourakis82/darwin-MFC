import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');
const outputPath = resolve(formalDir, 'no-hidden-gauge-fixing-gate.receipt.v1.1.json');
const writeReceipt = process.argv.includes('--write-receipt');
const compilerReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
);
const parentReceiptPath = resolve(
  repoRoot,
  'docs/research/normative-gauge/formal/normative-gauge-gate.receipt.v1.0.json',
);
const runtimeEvidencePath = resolve(formalDir, 'evidence/runtime-verification.v1.1.json');
const leanEvidencePath = resolve(formalDir, 'evidence/lean-verification.v1.1.json');
const sourceFreshEvidencePath = resolve(formalDir, 'evidence/source-fresh-build.v1.1.json');

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const descriptor = (path) => ({
  path: fromRoot(path),
  sha256: sha256(readFileSync(path)),
  bytes: statSync(path).size,
});

const compilerReceipt = JSON.parse(readFileSync(compilerReceiptPath));
const runtime = JSON.parse(readFileSync(runtimeEvidencePath));
const lean = JSON.parse(readFileSync(leanEvidencePath));
const sourceFresh = JSON.parse(readFileSync(sourceFreshEvidencePath));
const errors = [];
if (!compilerReceipt.compilerReconciled) errors.push('compiler is not reconciled');
if (!runtime.verified) errors.push('runtime evidence is not verified');
if (!lean.verified) errors.push('Lean evidence is not verified');
if (!sourceFresh.verified) errors.push('source-fresh evidence is not verified');
if (runtime.canonicalWasm.singularWitnessExportCount !== 0) {
  errors.push('canonical WASM exports a singular witness');
}
if (runtime.mutationAdequacy.killed !== 4) errors.push('mutation suite is incomplete');
if (runtime.gaugeAction.gaugeMismatches !== 0) errors.push('gauge mismatch present');
if (runtime.stabilizerObstruction.fixedPointsFound !== 0) {
  errors.push('stabilizer fixed point found');
}
if (!lean.audit.axiomFreeCoreEstablished || !lean.audit.onlyApprovedAxioms) {
  errors.push('Lean axiom boundary failed');
}
if (!sourceFresh.parity.nativeWasmCanonicalTranscriptParityEstablished) {
  errors.push('native/WASM transcript parity absent');
}

const artifactPaths = [
  'docs/research/no-hidden-gauge-fixing/README.md',
  'docs/research/no-hidden-gauge-fixing/no-hidden-gauge-fixing-theory-v1.1.md',
  'docs/research/no-hidden-gauge-fixing/prior-art-frontier-v1.1.md',
  'docs/research/no-hidden-gauge-fixing/formal/closure-v1.1.md',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/NoHiddenGaugeFixing.lean',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/NoHiddenGaugeFixingAudit.lean',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/lakefile.lean',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/lake-manifest.json',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/lean-toolchain',
  'docs/research/no-hidden-gauge-fixing/formal/sounio/no_hidden_gauge_fixing_v1_1.sio',
  'docs/research/no-hidden-gauge-fixing/formal/sounio/no_hidden_gauge_fixing_mutants_v1_1.sio',
  'docs/research/no-hidden-gauge-fixing/formal/wasm/no_hidden_gauge_fixing.v1.1.wasm',
  'docs/research/no-hidden-gauge-fixing/formal/wasm/no_hidden_gauge_fixing_mutants.v1.1.wasm',
  'docs/research/no-hidden-gauge-fixing/formal/native/no_hidden_gauge_fixing.v1.1.linux-x86_64',
  'docs/research/no-hidden-gauge-fixing/formal/native/no_hidden_gauge_fixing_mutants.v1.1.linux-x86_64',
  'docs/research/no-hidden-gauge-fixing/formal/native/no_hidden_gauge_fixing_transcript.v1.1.linux-x86_64',
  'docs/research/no-hidden-gauge-fixing/formal/transcripts/no_hidden_gauge_fixing_transcript_v1_1.sio',
  'docs/research/no-hidden-gauge-fixing/formal/transcripts/canonical-domain.v1.1.txt',
  'docs/research/no-hidden-gauge-fixing/formal/vectors/no-hidden-gauge-fixing-vectors.v1.1.json',
  'docs/research/no-hidden-gauge-fixing/formal/evidence/runtime-verification.v1.1.json',
  'docs/research/no-hidden-gauge-fixing/formal/evidence/lean-verification.v1.1.json',
  'docs/research/no-hidden-gauge-fixing/formal/evidence/source-fresh-build.v1.1.json',
  'scripts/no-hidden-gauge-fixing-oracle.mjs',
  'scripts/generate-no-hidden-gauge-fixing-vectors.mjs',
  'scripts/generate-no-hidden-gauge-fixing-mutant-source.mjs',
  'scripts/generate-no-hidden-gauge-fixing-native-transcript.mjs',
  'scripts/generate-no-hidden-gauge-fixing-source-fresh-evidence.mjs',
  'scripts/verify-no-hidden-gauge-fixing.mjs',
  'scripts/verify-no-hidden-gauge-fixing-lean.mjs',
  'scripts/generate-no-hidden-gauge-fixing-receipt.mjs',
  'scripts/verify-no-hidden-gauge-fixing-gate.mjs',
].map((path) => resolve(repoRoot, path));

const result = {
  schema: 'darwin.no-hidden-gauge-fixing-gate-receipt.v1.1',
  generatedAt: '2026-08-03T10:00:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  verified: errors.length === 0,
  compilerReconciled: compilerReceipt.compilerReconciled === true,
  leanStabilizerTheoremEstablished: lean.verified === true,
  pointwiseTriangleCountermodelEstablished: lean.verified === true,
  completeFiniteDomainEstablished: runtime.verified === true,
  canonicalGaugeInvarianceEstablished: runtime.gaugeAction.gaugeMismatches === 0,
  minimumAnchorCertificateEstablished:
    runtime.stabilizerObstruction.minimumAnchorMismatches === 0,
  mutationAdequacyEstablished: runtime.mutationAdequacy.killed === 4,
  canonicalSingularWitnessExportCount: runtime.canonicalWasm.singularWitnessExportCount,
  nativeWasmSelfCheckParityEstablished:
    sourceFresh.parity.canonicalNativeWasmSelfCheckParityEstablished,
  nativeWasmCanonicalTranscriptParityEstablished:
    sourceFresh.parity.nativeWasmCanonicalTranscriptParityEstablished,
  allInternalExportParityEstablished: false,
  executableSemanticsMechanized: false,
  emittedWasmSemanticsMechanized: false,
  externalObservationValueReceiptImplemented: false,
  parent: descriptor(parentReceiptPath),
  compilerReceipt: descriptor(compilerReceiptPath),
  evidence: {
    runtime: descriptor(runtimeEvidencePath),
    lean: descriptor(leanEvidencePath),
    sourceFreshBuild: descriptor(sourceFreshEvidencePath),
  },
  model: {
    inputDomain: '[0..7] x [0..7] x [0..3]^3',
    gaugeGroup: 'C2^3',
    canonicalStates: runtime.boundedDomain.canonicalStates,
    gaugeChecks: runtime.gaugeAction.gaugeChecks,
    edgeTransformationChecks: runtime.gaugeAction.transformationChecks,
    groupCompositionChecks: runtime.gaugeAction.groupCompositionChecks,
    stabilizerSubgroupChecks: runtime.gaugeAction.subgroupChecks,
    minimumAnchorChecks: runtime.stabilizerObstruction.minimumAnchorChecks,
    fixedPointChecks: runtime.stabilizerObstruction.fixedPointChecks,
    hostileStates: runtime.boundedDomain.hostileStates,
    mutants: runtime.mutationAdequacy.mutants,
    mutantsKilled: runtime.mutationAdequacy.killed,
    expectedCanonicalSelfCheckCode: 111,
    expectedAdversarialSelfCheckCode: 112,
    transcriptSha256: runtime.transcript.sha256,
    dispositionCensus: runtime.boundedDomain.dispositionCensus,
  },
  compiler: {
    repository: compilerReceipt.repository.url,
    commit: compilerReceipt.repository.commit,
    tree: compilerReceipt.repository.tree,
    identity: compilerReceipt.compiler.identity,
    sha256: compilerReceipt.compiler.sha256,
  },
  artifacts: artifactPaths.map(descriptor),
  claims: {
    established: [
      'an equivariant selector output is fixed by every input stabilizer element in the Lean model',
      'a stabilizer that moves every admissible output obstructs deterministic equivariant admissible selection',
      'the Boolean identity triangle has two sections exchanged by a pointwise input stabilizer',
      'the canonical Sounio artifact emits obstruction data and no singular witness export',
      'complete finite-domain agreement with an independent exhaustive oracle',
      'exact residual stabilizer subgroup and minimum additional anchor mask over the declared domain',
      'four isolated hidden-choice mutants are killed with executable counterexamples',
      'source-fresh deterministic native and WASM builds',
      'exact native/WASM six-field transcript parity over 4,096 states',
    ],
    notEstablished: [
      'content-addressed value, provenance, reliability, or authorization for an external observation',
      'a unique or justified normative output after removal of the finite stabilizer obstruction',
      'mechanized Sounio executable semantics or emitted WASM byte semantics',
      'parity of every internal native and WASM helper export',
      'scientific novelty, priority, or absence of prior art',
      'real-world normative, empirical, clinical, regulatory, legal, or production validity',
    ],
  },
  invalidation: [
    'parent or compiler receipt identity changes',
    'any listed artifact hash or byte size changes',
    'Lean build, forbidden-token scan, or axiom audit changes',
    'canonical, hostile, gauge, subgroup, or minimum-anchor verification ceases to pass',
    'one or more hidden-choice mutants survive',
    'a singular-witness function appears in the canonical export surface',
    'native/WASM transcript identity changes',
    'clinical refusal, authorization, signature, or novelty boundary changes',
  ],
  errors,
};

if (writeReceipt && errors.length === 0) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
