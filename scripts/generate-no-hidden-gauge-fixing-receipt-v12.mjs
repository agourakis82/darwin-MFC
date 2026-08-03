import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');
const outputPath = resolve(formalDir, 'no-hidden-gauge-fixing-gate.receipt.v1.2.json');
const writeReceipt = process.argv.includes('--write-receipt');
const compilerReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/' +
    'compiler-source-fresh.receipt.v0.4.json',
);
const parentReceiptPath = resolve(
  formalDir,
  'no-hidden-gauge-fixing-gate.receipt.v1.1.json',
);
const evidencePaths = {
  observation: resolve(
    formalDir,
    'evidence/observation-receipt-verification.v1.2.json',
  ),
  runtime: resolve(formalDir, 'evidence/runtime-verification.v1.2.json'),
  lean: resolve(formalDir, 'evidence/lean-verification.v1.2.json'),
  graph: resolve(formalDir, 'evidence/constraint-graph-benchmark.v1.2.json'),
  reproduction: resolve(
    formalDir,
    'evidence/cross-language-reproduction.v1.2.json',
  ),
  sourceFreshBuild: resolve(formalDir, 'evidence/source-fresh-build.v1.2.json'),
  priorArt: resolve(formalDir, 'evidence/prior-art-search.v1.2.json'),
};

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const descriptor = (path) => ({
  path: fromRoot(path),
  sha256: sha256(readFileSync(path)),
  bytes: statSync(path).size,
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
  check(value.clinicalDisposition === 'REFUSE', `${name} clinical boundary drift`);
  check(value.clinicalUseAllowed === false, `${name} clinical use boundary drift`);
  check(value.productionAuthorized === false, `${name} production boundary drift`);
  check(value.noveltyEstablished === false, `${name} novelty boundary drift`);
};

check(compilerReceipt.compilerReconciled === true, 'compiler is not reconciled');
check(parentReceipt.verified === true, 'parent v1.1 receipt is not verified');
checkBoundary('parent', parentReceipt);
for (const [name, value] of Object.entries(evidence)) {
  check(value.verified === true, `${name} evidence is not verified`);
  checkBoundary(name, value);
}
check(evidence.observation.fixtureSignatureValid === true,
  'synthetic observation signature is not valid');
check(evidence.observation.negativeCasesPassed === 9,
  'observation negative suite is incomplete');
check(evidence.observation.externalClinicalObservationEstablished === false,
  'external clinical observation was silently established');
check(evidence.runtime.completeAbiDomain?.rawStates === 32768,
  'complete ABI domain is incomplete');
check(evidence.runtime.completeAbiDomain?.oracleMismatches === 0,
  'triangle oracle mismatch present');
check(evidence.runtime.canonicalWasm?.singularWitnessExportCount === 0,
  'triangle WASM exports a singular witness');
check(evidence.runtime.receiptFirewall?.acceptedFixtureKernelCalls === 1,
  'valid fixture does not make exactly one kernel call');
check(evidence.runtime.receiptFirewall?.tamperedReceiptKernelCalls === 0,
  'tampered receipt reached the kernel');
check(evidence.lean.refinement?.abstractRefinementEstablished === true,
  'Lean abstract refinement is absent');
check(evidence.lean.refinement?.completeSounioOperationalSemanticsMechanized === false,
  'Lean semantics boundary drift');
check(evidence.graph.benchmark?.cases === 1536, 'graph benchmark count drift');
check(evidence.graph.parity?.vectorMismatches === 0, 'graph parity mismatch');
check(evidence.graph.mutationAdequacy?.killed === true,
  'hidden graph selector mutant survived');
check(evidence.graph.canonicalWasm?.singularWitnessExportCount === 0,
  'graph WASM exports a singular witness');
check(evidence.reproduction.independence
  ?.implementationIndependentReproductionComplete === true,
'implementation-independent reproduction is absent');
check(evidence.reproduction.independence
  ?.authorIndependentReproductionComplete === false,
'author independence was silently established');
check(evidence.sourceFreshBuild.compilerReceipt?.compilerReconciled === true,
  'source-fresh compiler is not reconciled');
check(evidence.sourceFreshBuild.parity
  ?.deterministicNativeAndWasmBuildsEstablished === true,
'deterministic native/WASM builds are absent');
check(evidence.priorArt.formalPriorArtSearchExecuted === true,
  'formal prior-art search was not executed');
check(evidence.priorArt.searchComplete === false,
  'incomplete search was silently marked complete');
check(evidence.priorArt.legalOpinion === false,
  'prior-art snapshot became a legal opinion');
check(evidence.priorArt.candidateConjunction?.candidateOnly === true,
  'candidate conjunction boundary drift');

const artifactPaths = [
  'docs/research/no-hidden-gauge-fixing/README.md',
  'docs/research/no-hidden-gauge-fixing/README-v1.2.md',
  'docs/research/no-hidden-gauge-fixing/no-hidden-gauge-fixing-theory-v1.1.md',
  'docs/research/no-hidden-gauge-fixing/prior-art-frontier-v1.1.md',
  'docs/research/no-hidden-gauge-fixing/prior-art-search-protocol-v1.2.md',
  'docs/research/no-hidden-gauge-fixing/prior-art-claim-matrix-v1.2.md',
  'docs/research/no-hidden-gauge-fixing/formal/closure-v1.2.md',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/NoHiddenGaugeFixingV12.lean',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/NoHiddenGaugeFixingV12Audit.lean',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/lakefile.lean',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/lake-manifest.json',
  'docs/research/no-hidden-gauge-fixing/formal/lean4/lean-toolchain',
  'docs/research/no-hidden-gauge-fixing/formal/sounio/no_hidden_gauge_fixing_v1_2.sio',
  'docs/research/no-hidden-gauge-fixing/formal/sounio/constraint_graph_benchmark_v1_2.sio',
  'docs/research/no-hidden-gauge-fixing/formal/wasm-v1.2/no_hidden_gauge_fixing.v1.2.wasm',
  'docs/research/no-hidden-gauge-fixing/formal/wasm-v1.2/constraint_graph_benchmark.v1.2.wasm',
  'docs/research/no-hidden-gauge-fixing/formal/native-v1.2/no_hidden_gauge_fixing.v1.2.linux-x86_64',
  'docs/research/no-hidden-gauge-fixing/formal/native-v1.2/constraint_graph_benchmark.v1.2.linux-x86_64',
  'docs/research/no-hidden-gauge-fixing/formal/native-v1.2/no_hidden_gauge_fixing_oracle.v1.2.macos-arm64',
  'docs/research/no-hidden-gauge-fixing/formal/rust/no_hidden_gauge_fixing_oracle_v1_2.rs',
  'docs/research/no-hidden-gauge-fixing/formal/observations/synthetic-observation-source.v1.2.json',
  'docs/research/no-hidden-gauge-fixing/formal/observations/revocation-registry.v1.2.json',
  'docs/research/no-hidden-gauge-fixing/formal/observations/value-carrying-observation.receipt.v1.2.json',
  'docs/research/no-hidden-gauge-fixing/formal/reproduction-v1.2/README.md',
  'docs/research/no-hidden-gauge-fixing/formal/reproduction-v1.2/blind-inputs.v1.2.txt',
  'docs/research/no-hidden-gauge-fixing/formal/reproduction-v1.2/blind-reproduction-manifest.v1.2.json',
  'docs/research/no-hidden-gauge-fixing/formal/reproduction-v1.2/third-party-attestation.template.json',
  'docs/research/no-hidden-gauge-fixing/formal/transcripts/canonical-domain.v1.2.txt',
  'docs/research/no-hidden-gauge-fixing/formal/transcripts/constraint-graph-benchmark.v1.2.txt',
  'docs/research/no-hidden-gauge-fixing/formal/transcripts/cross-language-graph.v1.2.txt',
  'docs/research/no-hidden-gauge-fixing/formal/vectors/constraint-graph-benchmark.v1.2.json',
  ...Object.values(evidencePaths).map(fromRoot),
  'scripts/no-hidden-gauge-fixing-v12-oracle.mjs',
  'scripts/observation-receipt-v12.mjs',
  'scripts/verify-observation-receipt-v12.mjs',
  'scripts/verify-no-hidden-gauge-fixing-v12.mjs',
  'scripts/constraint-graph-oracle-v12.mjs',
  'scripts/generate-constraint-graph-benchmark-v12.mjs',
  'scripts/verify-constraint-graph-benchmark-v12.mjs',
  'scripts/generate-blind-reproduction-package-v12.mjs',
  'scripts/verify-cross-language-reproduction-v12.mjs',
  'scripts/verify-no-hidden-gauge-fixing-lean-v12.mjs',
  'scripts/generate-no-hidden-gauge-fixing-source-fresh-evidence-v12.mjs',
  'scripts/generate-no-hidden-gauge-fixing-receipt-v12.mjs',
  'scripts/verify-no-hidden-gauge-fixing-gate-v12.mjs',
].map((path) => resolve(repoRoot, path));

const result = {
  schema: 'darwin.no-hidden-gauge-fixing-gate-receipt.v1.2',
  generatedAt: '2026-08-03T12:30:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  verified: errors.length === 0,
  compilerReconciled: compilerReceipt.compilerReconciled === true,
  fiveTaskEngineeringClosureEstablished: errors.length === 0,
  manuscriptSubmissionReady: false,
  preprintArtifactPackageReadyForIndependentReplication: errors.length === 0,
  externalObservationValueReceiptImplemented: true,
  externalClinicalObservationEstablished: false,
  testFixtureObservationSignatureValid: evidence.observation.fixtureSignatureValid,
  productionObservationTrustEstablished: false,
  abstractLeanRefinementEstablished:
    evidence.lean.refinement.abstractRefinementEstablished,
  completeSounioOperationalSemanticsMechanized: false,
  emittedWasmSemanticsMechanized: false,
  completeAbiDomainEstablished: evidence.runtime.completeAbiDomain.rawStates === 32768,
  generalGraphBenchmarkEstablished: evidence.graph.benchmark.cases === 1536,
  implementationIndependentReproductionComplete: true,
  authorIndependentReproductionComplete: false,
  externalHumanReproductionComplete: false,
  formalPriorArtSearchExecuted: true,
  priorArtSearchComplete: false,
  legalOpinionEstablished: false,
  candidateConjunctionOnly: true,
  parent: descriptor(parentReceiptPath),
  compilerReceipt: descriptor(compilerReceiptPath),
  evidence: Object.fromEntries(
    Object.entries(evidencePaths).map(([name, path]) => [name, descriptor(path)]),
  ),
  observation: {
    schema: 'darwin.value-carrying-observation-receipt.v1.2',
    fixtureOnly: true,
    acceptedAbi: evidence.observation.baselineAbi,
    negativeCasesPassed: evidence.observation.negativeCasesPassed,
    invalidReceiptKernelCalls: evidence.runtime.receiptFirewall.tamperedReceiptKernelCalls,
    validReceiptKernelCalls: evidence.runtime.receiptFirewall.acceptedFixtureKernelCalls,
    trustRootsProductionEligible: false,
  },
  models: {
    triangle: {
      rawAbiStates: evidence.runtime.completeAbiDomain.rawStates,
      validAbiStates: evidence.runtime.completeAbiDomain.validStates,
      invalidAbiStates: evidence.runtime.completeAbiDomain.invalidStates,
      oracleMismatches: evidence.runtime.completeAbiDomain.oracleMismatches,
      residualGaugeChecks: evidence.runtime.residualGaugeAction.residualGaugeChecks,
      residualGaugeMismatches: evidence.runtime.residualGaugeAction.residualGaugeMismatches,
      anchorRestrictionChecks: evidence.runtime.observationSemantics.anchorRestrictionChecks,
      anchorRestrictionMismatches:
        evidence.runtime.observationSemantics.anchorRestrictionMismatches,
      dispositionCensus: evidence.runtime.completeAbiDomain.dispositionCensus,
      transcriptSha256: evidence.runtime.transcript.sha256,
    },
    graph: {
      cases: evidence.graph.benchmark.cases,
      familyCensus: evidence.graph.benchmark.familyCensus,
      gaugeChecks: evidence.graph.parity.gaugeChecks,
      gaugeMismatches: evidence.graph.parity.gaugeMismatches,
      affineTorsorChecks: evidence.graph.parity.affineTorsorChecks,
      affineTorsorMismatches: evidence.graph.parity.affineTorsorMismatches,
      hiddenSelectorAnomalies:
        evidence.graph.mutationAdequacy.hiddenSelectorAnomalies,
      dispositionCensus: evidence.graph.benchmark.dispositionCensus,
      transcriptSha256: evidence.graph.transcript.sha256,
    },
  },
  reproduction: {
    language: 'Rust',
    noExternalCrates: evidence.reproduction.independence.noExternalCrates,
    triangleStates: evidence.reproduction.triangle.states,
    exactTriangleParity: evidence.reproduction.triangle.exactParity,
    blindedGraphCases: evidence.reproduction.blindGraphPackage.cases,
    blindedCommitmentMatched:
      evidence.reproduction.blindGraphPackage.commitmentMatched,
    tamperedCommitmentRejected:
      evidence.reproduction.blindGraphPackage.tamperedCommitmentRejected,
    thirdPartyAttestationSigned: false,
  },
  priorArt: {
    claimAssessments: evidence.priorArt.claimAssessment,
    candidateName: evidence.priorArt.candidateConjunction.name,
    completeDisclosureLocated:
      evidence.priorArt.candidateConjunction.locatedAsCompleteDisclosure,
    directQueriesExecuted: evidence.priorArt.coverage.directQueriesExecuted,
    blockedOrIncompleteDatabases:
      evidence.priorArt.coverage.directQueriesBlockedOrIncomplete,
    noveltyEstablished: false,
  },
  compiler: {
    repository: compilerReceipt.repository.url,
    commit: compilerReceipt.repository.commit,
    tree: compilerReceipt.repository.tree,
    identity: compilerReceipt.compiler.identity,
    sha256: compilerReceipt.compiler.sha256,
  },
  sourceFresh: {
    deterministicNativeAndWasmBuildsEstablished:
      evidence.sourceFreshBuild.parity.deterministicNativeAndWasmBuildsEstablished,
    triangleNativeWasmSelfCheckParityEstablished:
      evidence.sourceFreshBuild.parity.triangleNativeWasmSelfCheckParityEstablished,
    graphNativeWasmSelfCheckParityEstablished:
      evidence.sourceFreshBuild.parity.graphNativeWasmSelfCheckParityEstablished,
    nativeWasmCompleteTranscriptParityEstablished: false,
    allInternalExportParityEstablished: false,
  },
  artifacts: artifactPaths.map(descriptor),
  claims: {
    established: [
      'a signed synthetic value receipt is accepted only within its declared scope, time, reliability, provenance, and revocation policy',
      'invalid or revoked synthetic observation receipts are refused before the Sounio kernel is called',
      'the declared Lean model refines the identity-triangle observation fixture and preserves model-relative uniqueness',
      'complete 32,768-state ABI agreement between the Sounio WASM kernel and an independent JavaScript oracle',
      'zero-mismatch gauge and affine-torsor checks over a 1,536-case, six-family graph benchmark',
      'a hidden minimum-assignment selector is killed on every obstructed graph case',
      'independent Rust reproduction of the complete triangle transcript and blinded graph commitment',
      'source-fresh deterministic native and WASM builds with self-check parity',
      'a dated claim-by-claim prior-art search with access failures preserved as coverage gaps',
    ],
    notEstablished: [
      'a general revocation-restoration theorem beyond the declared finite fixture',
      'content-addressed authorization from any external clinical observation',
      'mechanized Sounio operational semantics or emitted WASM byte semantics',
      'complete internal native/WASM export or transcript parity for v1.2',
      'author-independent or unrelated third-party reproduction',
      'complete prior-art coverage, patentability, freedom to operate, priority, or scientific novelty',
      'real-world normative, empirical, clinical, regulatory, legal, or production validity',
    ],
  },
  invalidation: [
    'parent or compiler receipt identity changes',
    'any listed artifact hash or byte size changes',
    'observation signature, provenance, reliability, scope, validity, or revocation verification changes',
    'an invalid observation reaches the Sounio kernel',
    'Lean build, forbidden-token scan, or axiom audit changes',
    'triangle or graph oracle, gauge, torsor, hostile-ABI, or mutation checks cease to pass',
    'a singular-witness function appears in either canonical WASM export surface',
    'Rust transcript or blinded commitment parity changes',
    'a blocked prior-art database is represented as a negative finding',
    'clinical refusal, production authorization, signature, or novelty boundary changes',
  ],
  errors,
};

if (writeReceipt && errors.length === 0) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
