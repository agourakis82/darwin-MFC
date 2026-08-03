import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/epistemic-revocation-distance/formal');
const outputPath = resolve(
  formalDir,
  'epistemic-revocation-distance-gate.receipt.v1.3.json',
);
const writeReceipt = process.argv.includes('--write-receipt');
const compilerReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/' +
    'compiler-source-fresh.receipt.v0.4.json',
);
const parentReceiptPath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/' +
    'no-hidden-gauge-fixing-gate.receipt.v1.2.json',
);
const evidencePaths = {
  capabilityAudit: resolve(formalDir, 'evidence/sounio-capability-audit.v1.3.json'),
  priorArt: resolve(formalDir, 'evidence/prior-art-search.v1.3.json'),
  benchmark: resolve(formalDir, 'evidence/benchmark-generation.v1.3.json'),
  lean: resolve(formalDir, 'evidence/lean-verification.v1.3.json'),
  runtime: resolve(formalDir, 'evidence/runtime-verification.v1.3.json'),
  reproduction: resolve(
    formalDir,
    'evidence/cross-language-reproduction.v1.3.json',
  ),
  sourceFresh: resolve(formalDir, 'evidence/source-fresh-build.v1.3.json'),
};
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const descriptor = (path) => ({
  path: fromRoot(path),
  bytes: statSync(path).size,
  sha256: sha256(readFileSync(path)),
});
const readJson = (path) => JSON.parse(readFileSync(path));
const compilerReceipt = readJson(compilerReceiptPath);
const parentReceipt = readJson(parentReceiptPath);
const evidence = Object.fromEntries(
  Object.entries(evidencePaths).map(([name, path]) => [name, readJson(path)]),
);
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const checkBoundary = (name, value) => {
  check(value.clinicalDisposition === 'REFUSE', `${name}: clinical boundary drift`);
  check(value.clinicalUseAllowed === false, `${name}: clinical use boundary drift`);
  check(value.productionAuthorized === false, `${name}: production boundary drift`);
  check(value.noveltyEstablished === false, `${name}: novelty boundary drift`);
  check(value.signed === false, `${name}: signature boundary drift`);
};

check(compilerReceipt.compilerReconciled === true, 'compiler is not reconciled');
check(parentReceipt.verified === true, 'parent v1.2 receipt is not verified');
checkBoundary('parent', parentReceipt);
for (const [name, value] of Object.entries(evidence)) {
  check(value.verified === true, `${name} evidence is not verified`);
  checkBoundary(name, value);
}
check(evidence.capabilityAudit.claims?.allSounioFeaturesUsed === false,
  'capability audit silently claims feature maximalism');
check(evidence.capabilityAudit.claims?.compilerEnforcedNoReplayEstablished === false,
  'compiler-enforced no-replay was silently established');
check(evidence.priorArt.formalPriorArtSearchExecuted === true,
  'formal prior-art search is absent');
check(evidence.priorArt.searchComplete === false,
  'incomplete prior-art search was marked complete');
check(evidence.priorArt.candidateConjunction?.candidateOnly === true,
  'candidate-only boundary drift');
check(evidence.benchmark.blockerBenchmark?.cases === 151,
  'blocker benchmark cardinality drift');
check(evidence.benchmark.completeAbstractDomain?.states === 66356,
  'abstract domain cardinality drift');
check(evidence.benchmark.mutationAdequacy?.allDeclaredMutantsKilled === true,
  'declared mutation suite is incomplete');
check(evidence.lean.theorem?.globalRevocationDistanceExact === true,
  'global exact-distance theorem is absent');
check(evidence.lean.theorem?.emittedWasmSemanticsMechanized === false,
  'WASM semantics were silently mechanized');
check(evidence.runtime.canonicalWasm?.mainResult === 143,
  'canonical Sounio self-check drift');
check(evidence.runtime.canonicalWasm?.focusedSelfCheck === 0,
  'canonical focused self-check drift');
check(evidence.runtime.canonicalWasm?.exhaustiveSelfCheck === 0 &&
  evidence.runtime.canonicalWasm?.exhaustiveSelfCheckComposedInMain === true,
  'canonical exhaustive self-check drift');
check(evidence.runtime.canonicalWasm?.singularWitnessExportCount === 0,
  'canonical WASM exposes a singular witness');
check(evidence.runtime.completeAbstractDomain?.oracleMismatches === 0,
  'Sounio/JavaScript parity mismatch');
check(evidence.runtime.lifecycleFirewall?.invalidEnvelopeKernelCalls === 0,
  'invalid lifecycle envelope reached the kernel');
check(evidence.runtime.lifecycleFirewall?.signedAuthorityEstablished === false,
  'fixture lifecycle became signed authority');
check(evidence.reproduction.parity?.freshTranscriptExact === true,
  'fresh Rust transcript parity is absent');
check(evidence.reproduction.independence
  ?.implementationIndependentReproductionComplete === true,
  'implementation-independent reproduction is absent');
check(evidence.reproduction.independence
  ?.authorIndependentReproductionComplete === false,
  'author independence was silently established');
check(evidence.sourceFresh.compiler?.reconstructedHashMatchedReceipt === true,
  'reconstructed compiler does not match source-fresh receipt');
check(evidence.sourceFresh.artifacts?.deterministicNative === true,
  'native build determinism is absent');
check(evidence.sourceFresh.artifacts?.deterministicWasm === true,
  'WASM build determinism is absent');
check(evidence.sourceFresh.parity?.nativeWasmMainParity === true,
  'native/WASM main parity is absent');

const artifactPaths = [
  'docs/research/epistemic-revocation-distance/README.md',
  'docs/research/epistemic-revocation-distance/epistemic-revocation-distance-theory-v1.3.md',
  'docs/research/epistemic-revocation-distance/falsification-preregistration-v1.3.md',
  'docs/research/epistemic-revocation-distance/manuscript-outline-v1.3.md',
  'docs/research/epistemic-revocation-distance/prior-art-frontier-v1.3.md',
  'docs/research/epistemic-revocation-distance/sounio-capability-audit-v1.3.md',
  'docs/research/epistemic-revocation-distance/formal/lean4/EpistemicRevocationDistance.lean',
  'docs/research/epistemic-revocation-distance/formal/lean4/EpistemicRevocationDistanceAudit.lean',
  'docs/research/epistemic-revocation-distance/formal/lean4/lakefile.lean',
  'docs/research/epistemic-revocation-distance/formal/lean4/lake-manifest.json',
  'docs/research/epistemic-revocation-distance/formal/lean4/lean-toolchain',
  'docs/research/epistemic-revocation-distance/formal/sounio/epistemic_revocation_distance_v1_3.sio',
  'docs/research/epistemic-revocation-distance/formal/wasm/epistemic_revocation_distance.v1.3.wasm',
  'docs/research/epistemic-revocation-distance/formal/native/epistemic_revocation_distance.v1.3.linux-x86_64',
  'docs/research/epistemic-revocation-distance/formal/native/epistemic_revocation_distance_oracle.v1.3.macos-arm64',
  'docs/research/epistemic-revocation-distance/formal/rust/epistemic_revocation_distance_oracle_v1_3.rs',
  'docs/research/epistemic-revocation-distance/formal/vectors/epistemic-revocation-distance.v1.3.json',
  'docs/research/epistemic-revocation-distance/formal/transcripts/abstract-domain.v1.3.txt',
  'docs/research/epistemic-revocation-distance/formal/transcripts/source-fresh-build.v1.3.txt',
  'docs/research/epistemic-revocation-distance/formal/evidence/compiler-reconstruction.v1.3.json',
  'scripts/epistemic-revocation-distance-v13-oracle.mjs',
  'scripts/generate-epistemic-revocation-distance-v13.mjs',
  'scripts/verify-epistemic-revocation-distance-lean-v13.mjs',
  'scripts/verify-epistemic-revocation-distance-runtime-v13.mjs',
  'scripts/verify-epistemic-revocation-distance-reproduction-v13.mjs',
  'scripts/generate-epistemic-revocation-distance-source-fresh-v13.mjs',
  'scripts/generate-epistemic-revocation-distance-receipt-v13.mjs',
  'scripts/verify-epistemic-revocation-distance-gate-v13.mjs',
  ...Object.values(evidencePaths).map(fromRoot),
].map((path) => resolve(repoRoot, path));

const result = {
  schema: 'darwin.epistemic-revocation-distance-gate-receipt.v1.3',
  generatedAt: '2026-08-03T15:00:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  verified: errors.length === 0,
  candidateConjunctionOnly: true,
  compilerReconciled: compilerReceipt.compilerReconciled === true,
  compilerReconstructedFromFixedPoint:
    evidence.sourceFresh.compiler.reconstructedHashMatchedReceipt === true,
  generalFiniteRestorationTheoremEstablished:
    evidence.lean.theorem.globalRevocationDistanceExact === true,
  completeThreeReceiptExecutionEstablished:
    evidence.runtime.completeAbstractDomain.states === 66356,
  implementationIndependentReproductionComplete: true,
  authorIndependentReproductionComplete: false,
  unrelatedThirdPartyReproductionComplete: false,
  formalPriorArtSearchExecuted: true,
  priorArtSearchComplete: false,
  legalOpinionEstablished: false,
  manuscriptSubmissionReady: false,
  internalPreprintDraftPackageReady: errors.length === 0,
  parent: descriptor(parentReceiptPath),
  compilerReceipt: descriptor(compilerReceiptPath),
  evidence: Object.fromEntries(
    Object.entries(evidencePaths).map(([name, path]) => [name, descriptor(path)]),
  ),
  spectrum: {
    coordinates: [
      'jointDistance',
      'modelDistance',
      'symmetryDistance',
      'minimumCutFamily',
      'criticalReceiptMask',
    ],
    blockerCases: evidence.benchmark.blockerBenchmark.cases,
    abstractStates: evidence.runtime.completeAbstractDomain.states,
    oracleMismatches: evidence.runtime.completeAbstractDomain.oracleMismatches,
    transcriptSha256: evidence.runtime.completeAbstractDomain.transcript.sha256,
    singularWitnessExports: evidence.runtime.canonicalWasm.singularWitnessExportCount,
  },
  theorem: evidence.lean.theorem,
  reproduction: {
    language: evidence.reproduction.implementation.language,
    transcriptExact: evidence.reproduction.parity.freshTranscriptExact,
    authorIndependent: false,
    binaryBitReproducibilityEstablished: false,
  },
  priorArt: {
    candidateName: evidence.priorArt.candidateConjunction.name,
    completeDisclosureLocated:
      evidence.priorArt.candidateConjunction.locatedAsCompleteDisclosure,
    absenceOfDisclosureEstablished: false,
    searchComplete: false,
  },
  sourceFresh: {
    compilerHashMatchedReceipt:
      evidence.sourceFresh.compiler.reconstructedHashMatchedReceipt,
    deterministicNative: evidence.sourceFresh.artifacts.deterministicNative,
    deterministicWasm: evidence.sourceFresh.artifacts.deterministicWasm,
    nativeWasmMainParity: evidence.sourceFresh.parity.nativeWasmMainParity,
    completeNativeWasmExportParityEstablished: false,
  },
  artifacts: artifactPaths.map(descriptor),
  claims: {
    established: [
      'an exact finite restoration lower bound and minimum-cut existence theorem in Lean',
      'a three-coordinate epistemic revocation spectrum with the complete minimum-cut family',
      'complete Sounio WASM and independent JavaScript parity over 66,356 abstract ABI states',
      'complete enumeration of 151 nonempty blocker families over one to three receipts',
      'mutation adequacy against lexical-first, cut-intersection, joint-reuse, and base-guard shortcuts',
      'implementation-independent no-crate Rust reproduction of the complete transcript',
      'source-fresh fixed-point compiler reconstruction and deterministic native/WASM builds',
      'epoch and hash mutations refused before the Sounio kernel is called',
    ],
    notEstablished: [
      'scientific novelty, priority, patentability, freedom to operate, or absence of prior art',
      'scaling of the executable subset search beyond three receipt identities',
      'compiler-enforced stale-alias invalidation through every Sounio control-flow path',
      'mechanized Sounio operational semantics or emitted WASM byte semantics',
      'complete native/WASM export parity beyond the exhaustive self-check result',
      'author-independent or unrelated third-party reproduction',
      'empirical, clinical, regulatory, legal, or production validity',
    ],
  },
  invalidation: [
    'parent, compiler, source, artifact, evidence, or transcript identity changes',
    'a stale epoch or mismatched state digest reaches the Sounio kernel',
    'a minimum cut is omitted or a non-minimum cut is emitted',
    'Lean build, forbidden-token scan, or axiom audit changes',
    'Sounio, JavaScript, or Rust transcript parity changes',
    'a singular result or selected cut appears in the canonical WASM export surface',
    'a blocked prior-art database is represented as a negative finding',
    'clinical refusal, production, signature, or novelty boundaries change',
  ],
  errors,
};

if (writeReceipt && errors.length === 0) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
