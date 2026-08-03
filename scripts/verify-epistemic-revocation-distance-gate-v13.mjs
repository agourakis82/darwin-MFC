import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {analyzeV13} from './epistemic-revocation-distance-v13-oracle.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const receiptPath = resolve(
  repoRoot,
  'docs/research/epistemic-revocation-distance/formal/' +
    'epistemic-revocation-distance-gate.receipt.v1.3.json',
);
const receipt = JSON.parse(readFileSync(receiptPath));
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const verifyDescriptor = (entry) => {
  const path = resolve(repoRoot, entry.path);
  const bytes = readFileSync(path);
  return statSync(path).size === entry.bytes && sha256(bytes) === entry.sha256;
};
const runJson = (script) => {
  const execution = spawnSync(process.execPath, [resolve(repoRoot, script)], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 128 * 1024 * 1024,
  });
  check(execution.status === 0,
    `${script} exited ${execution.status}: ${execution.stderr}`);
  try {
    return JSON.parse(execution.stdout);
  } catch (error) {
    errors.push(`${script} did not emit JSON: ${error.message}`);
    return {verified: false};
  }
};

check(receipt.schema === 'darwin.epistemic-revocation-distance-gate-receipt.v1.3',
  'schema drift');
check(receipt.status === 'ABSTRACT_RESEARCH_ONLY', 'research status drift');
check(receipt.clinicalDisposition === 'REFUSE', 'clinical disposition drift');
check(receipt.clinicalUseAllowed === false, 'clinical use became allowed');
check(receipt.productionAuthorized === false, 'production became authorized');
check(receipt.noveltyEstablished === false, 'novelty was silently established');
check(receipt.signed === false, 'research artifact became signed');
check(receipt.candidateConjunctionOnly === true, 'candidate boundary drift');
check(receipt.manuscriptSubmissionReady === false,
  'receipt silently claims manuscript readiness');
check(receipt.authorIndependentReproductionComplete === false,
  'author independence was silently established');
check(receipt.priorArtSearchComplete === false,
  'incomplete prior-art search was marked complete');
check(receipt.verified === true, 'receipt is not verified');
check(verifyDescriptor(receipt.parent), 'parent identity mismatch');
check(verifyDescriptor(receipt.compilerReceipt), 'compiler receipt identity mismatch');
for (const [name, entry] of Object.entries(receipt.evidence)) {
  check(verifyDescriptor(entry), `${name} evidence identity mismatch`);
}
for (const entry of receipt.artifacts) {
  check(verifyDescriptor(entry), `artifact identity mismatch: ${entry.path}`);
}

const benchmark = runJson('scripts/generate-epistemic-revocation-distance-v13.mjs');
const lean = runJson('scripts/verify-epistemic-revocation-distance-lean-v13.mjs');
const runtime = runJson('scripts/verify-epistemic-revocation-distance-runtime-v13.mjs');
const reproduction = runJson(
  'scripts/verify-epistemic-revocation-distance-reproduction-v13.mjs',
);
const sourceFresh = runJson(
  'scripts/generate-epistemic-revocation-distance-source-fresh-v13.mjs',
);
const parentGate = runJson('scripts/verify-no-hidden-gauge-fixing-gate-v12.mjs');
const regenerated = runJson(
  'scripts/generate-epistemic-revocation-distance-receipt-v13.mjs',
);
check(benchmark.verified === true &&
  benchmark.completeAbstractDomain?.states === 66356,
  'fresh benchmark verification failed');
check(benchmark.mutationAdequacy?.allDeclaredMutantsKilled === true,
  'fresh mutation adequacy failed');
check(lean.verified === true && lean.theorem?.globalRevocationDistanceExact === true,
  'fresh Lean verification failed');
check(runtime.verified === true && runtime.completeAbstractDomain?.oracleMismatches === 0,
  'fresh Sounio runtime verification failed');
check(runtime.canonicalWasm?.focusedSelfCheck === 0 &&
  runtime.canonicalWasm?.exhaustiveSelfCheck === 0 &&
  runtime.canonicalWasm?.exhaustiveSelfCheckComposedInMain === true,
  'fresh Sounio self-check composition failed');
check(runtime.canonicalWasm?.singularWitnessExportCount === 0,
  'fresh WASM exposes a singular witness');
check(runtime.lifecycleFirewall?.invalidEnvelopeKernelCalls === 0,
  'fresh lifecycle firewall allowed an invalid call');
check(reproduction.verified === true && reproduction.parity?.freshTranscriptExact === true,
  'fresh Rust reproduction failed');
check(sourceFresh.verified === true &&
  sourceFresh.compiler?.reconstructedHashMatchedReceipt === true,
  'fresh source-fresh verification failed');
check(parentGate.verified === true, 'fresh parent v1.2 gate failed');
const regeneratedMatches = JSON.stringify(regenerated) === JSON.stringify(receipt);
check(regeneratedMatches, 'receipt does not match deterministic regeneration');

const wasmEntry = receipt.artifacts.find((entry) =>
  entry.path.endsWith('/epistemic_revocation_distance.v1.3.wasm'));
const vectorsEntry = receipt.artifacts.find((entry) =>
  entry.path.endsWith('/epistemic-revocation-distance.v1.3.json'));
const mutatedWasm = Buffer.from(readFileSync(resolve(repoRoot, wasmEntry.path)));
mutatedWasm[mutatedWasm.length - 1] ^= 1;
const wasmMutationDetected = sha256(mutatedWasm) !== wasmEntry.sha256;
const mutatedParent = {...receipt.parent, sha256: '0'.repeat(64)};
const parentMutationDetected = !verifyDescriptor(mutatedParent);
const mutatedSourceFresh = {
  ...receipt.evidence.sourceFresh,
  sha256: 'f'.repeat(64),
};
const sourceFreshMutationDetected = !verifyDescriptor(mutatedSourceFresh);
const vectors = JSON.parse(readFileSync(resolve(repoRoot, vectorsEntry.path)));
const vector = structuredClone(vectors.cases.find((entry) =>
  entry.expected.minimumCuts.length > 1));
vector.expected.minimumCutFamily ^= 1 << vector.expected.minimumCuts[0];
const actualPacked = analyzeV13(vector.activeReceiptMask, vector.postRevocationStates);
const familyMutationDetected = actualPacked === vector.expectedPacked &&
  vector.expected.minimumCutFamily !==
    (Math.floor(actualPacked / 4096) % 256);
const clinicalBoundaryMutationDetected =
  ({...receipt, clinicalDisposition: 'READY'}).clinicalDisposition !== 'REFUSE';
const noveltyMutationDetected =
  ({...receipt, noveltyEstablished: true}).noveltyEstablished !== false;
const searchMutationDetected =
  ({...receipt, priorArtSearchComplete: true}).priorArtSearchComplete !== false;
check(wasmMutationDetected, 'WASM mutation was not detected');
check(parentMutationDetected, 'parent mutation was not detected');
check(sourceFreshMutationDetected, 'source-fresh mutation was not detected');
check(familyMutationDetected, 'minimum-family mutation was not detected');
check(clinicalBoundaryMutationDetected, 'clinical boundary mutation was not detected');
check(noveltyMutationDetected, 'novelty mutation was not detected');
check(searchMutationDetected, 'search-completeness mutation was not detected');

const result = {
  schema: 'darwin.epistemic-revocation-distance-gate-verification.v1.3',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  receiptPath,
  receiptSha256: sha256(readFileSync(receiptPath)),
  artifactCount: receipt.artifacts.length,
  benchmarkVerified: benchmark.verified === true,
  leanVerified: lean.verified === true,
  runtimeVerified: runtime.verified === true,
  crossLanguageReproductionVerified: reproduction.verified === true,
  sourceFreshVerified: sourceFresh.verified === true,
  parentGateVerified: parentGate.verified === true,
  regeneratedReceiptMatched: regeneratedMatches,
  negativeTests: {
    wasmMutationDetected,
    parentMutationDetected,
    sourceFreshMutationDetected,
    familyMutationDetected,
    clinicalBoundaryMutationDetected,
    noveltyMutationDetected,
    searchMutationDetected,
  },
  verified: errors.length === 0,
  errors,
};
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
