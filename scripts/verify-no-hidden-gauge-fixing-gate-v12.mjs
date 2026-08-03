import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const receiptPath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/' +
    'no-hidden-gauge-fixing-gate.receipt.v1.2.json',
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

check(receipt.schema === 'darwin.no-hidden-gauge-fixing-gate-receipt.v1.2',
  'schema drift');
check(receipt.status === 'ABSTRACT_RESEARCH_ONLY', 'research status drift');
check(receipt.clinicalDisposition === 'REFUSE', 'clinical disposition drift');
check(receipt.clinicalUseAllowed === false, 'clinical use became allowed');
check(receipt.productionAuthorized === false, 'production became authorized');
check(receipt.noveltyEstablished === false, 'novelty was silently established');
check(receipt.signed === false, 'research gate became signed');
check(receipt.manuscriptSubmissionReady === false,
  'artifact gate silently claimed manuscript readiness');
check(receipt.externalObservationValueReceiptImplemented === true,
  'value-carrying receipt boundary drift');
check(receipt.externalClinicalObservationEstablished === false,
  'external clinical observation was silently established');
check(receipt.productionObservationTrustEstablished === false,
  'fixture trust became production trust');
check(receipt.authorIndependentReproductionComplete === false,
  'author independence was silently established');
check(receipt.formalPriorArtSearchExecuted === true,
  'formal prior-art search disappeared');
check(receipt.priorArtSearchComplete === false,
  'prior-art gaps were silently closed');
check(receipt.candidateConjunctionOnly === true,
  'candidate conjunction boundary drift');
check(receipt.verified === true, 'receipt is not verified');
check(verifyDescriptor(receipt.parent), 'parent receipt identity mismatch');
check(verifyDescriptor(receipt.compilerReceipt), 'compiler receipt identity mismatch');
for (const [name, entry] of Object.entries(receipt.evidence)) {
  check(verifyDescriptor(entry), `${name} evidence identity mismatch`);
}
for (const entry of receipt.artifacts) {
  check(verifyDescriptor(entry), `artifact identity mismatch: ${entry.path}`);
}

const runJson = (script, arguments_ = []) => {
  const execution = spawnSync(
    process.execPath,
    [resolve(repoRoot, script), ...arguments_],
    {
      cwd: repoRoot,
      encoding: 'utf8',
      env: process.env,
      maxBuffer: 64 * 1024 * 1024,
    },
  );
  check(execution.status === 0,
    `${script} exited ${execution.status}: ${execution.stderr}`);
  try {
    return JSON.parse(execution.stdout);
  } catch (error) {
    errors.push(`${script} did not emit JSON: ${error.message}`);
    return {verified: false};
  }
};

const observation = runJson('scripts/verify-observation-receipt-v12.mjs');
const runtime = runJson('scripts/verify-no-hidden-gauge-fixing-v12.mjs');
const lean = runJson('scripts/verify-no-hidden-gauge-fixing-lean-v12.mjs');
const graph = runJson('scripts/verify-constraint-graph-benchmark-v12.mjs');
const reproduction = runJson('scripts/verify-cross-language-reproduction-v12.mjs');
const sourceFresh = runJson(
  'scripts/generate-no-hidden-gauge-fixing-source-fresh-evidence-v12.mjs',
);
const parentGate = runJson('scripts/verify-no-hidden-gauge-fixing-gate.mjs');
const regenerated = runJson('scripts/generate-no-hidden-gauge-fixing-receipt-v12.mjs');
const priorArt = JSON.parse(readFileSync(resolve(repoRoot, receipt.evidence.priorArt.path)));

check(observation.verified === true, 'fresh observation verification failed');
check(observation.negativeCasesPassed === 9, 'fresh observation negatives failed');
check(runtime.verified === true, 'fresh triangle runtime verification failed');
check(runtime.completeAbiDomain?.rawStates === 32768,
  'fresh complete ABI domain drift');
check(runtime.canonicalWasm?.singularWitnessExportCount === 0,
  'fresh triangle WASM exposes a singular witness');
check(runtime.receiptFirewall?.tamperedReceiptKernelCalls === 0,
  'fresh invalid receipt reached the kernel');
check(lean.verified === true, 'fresh Lean verification failed');
check(lean.refinement?.abstractRefinementEstablished === true,
  'fresh Lean refinement failed');
check(graph.verified === true, 'fresh graph benchmark failed');
check(graph.parity?.vectorMismatches === 0, 'fresh graph parity mismatch');
check(graph.canonicalWasm?.singularWitnessExportCount === 0,
  'fresh graph WASM exposes a singular witness');
check(reproduction.verified === true, 'fresh cross-language reproduction failed');
check(reproduction.blindGraphPackage?.commitmentMatched === true,
  'fresh blind commitment mismatch');
check(sourceFresh.verified === true, 'fresh source-fresh verification failed');
check(parentGate.verified === true, 'fresh parent v1.1 gate failed');
check(priorArt.verified === true && priorArt.formalPriorArtSearchExecuted === true,
  'prior-art snapshot is not verified');
check(priorArt.searchComplete === false && priorArt.noveltyEstablished === false,
  'prior-art boundary drift');

const regeneratedMatches = JSON.stringify(regenerated) === JSON.stringify(receipt);
check(regeneratedMatches, 'receipt does not match fresh deterministic generation');

const triangleWasmEntry = receipt.artifacts.find(
  (entry) => entry.path.endsWith('/no_hidden_gauge_fixing.v1.2.wasm'),
);
const observationReceiptEntry = receipt.artifacts.find(
  (entry) => entry.path.endsWith('/value-carrying-observation.receipt.v1.2.json'),
);
const priorArtEntry = receipt.evidence.priorArt;
const tamperedWasm = Buffer.from(readFileSync(resolve(repoRoot, triangleWasmEntry.path)));
tamperedWasm[tamperedWasm.length - 1] ^= 1;
const artifactMutationDetected = sha256(tamperedWasm) !== triangleWasmEntry.sha256;
const tamperedObservation = Buffer.from(
  readFileSync(resolve(repoRoot, observationReceiptEntry.path)),
);
tamperedObservation[tamperedObservation.length - 2] ^= 1;
const observationMutationDetected =
  sha256(tamperedObservation) !== observationReceiptEntry.sha256;
const tamperedParent = {...receipt.parent, sha256: '0'.repeat(64)};
const parentMutationDetected = !verifyDescriptor(tamperedParent);
const tamperedPriorArt = {...priorArtEntry, sha256: 'f'.repeat(64)};
const priorArtMutationDetected = !verifyDescriptor(tamperedPriorArt);
const tamperedBoundary = {...receipt, clinicalDisposition: 'READY'};
const boundaryMutationDetected = tamperedBoundary.clinicalDisposition !== 'REFUSE';
const tamperedNovelty = {...receipt, noveltyEstablished: true};
const noveltyMutationDetected = tamperedNovelty.noveltyEstablished !== false;
const tamperedSearch = {...priorArt, searchComplete: true};
const searchMutationDetected = tamperedSearch.searchComplete !== false;
check(artifactMutationDetected, 'artifact tampering was not detected');
check(observationMutationDetected, 'observation tampering was not detected');
check(parentMutationDetected, 'parent tampering was not detected');
check(priorArtMutationDetected, 'prior-art tampering was not detected');
check(boundaryMutationDetected, 'clinical boundary tampering was not detected');
check(noveltyMutationDetected, 'novelty tampering was not detected');
check(searchMutationDetected, 'search-completeness tampering was not detected');

const result = {
  schema: 'darwin.no-hidden-gauge-fixing-gate-verification.v1.2',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  receiptPath,
  receiptSha256: sha256(readFileSync(receiptPath)),
  artifactCount: receipt.artifacts.length,
  observationVerified: observation.verified === true,
  runtimeVerified: runtime.verified === true,
  leanVerified: lean.verified === true,
  graphBenchmarkVerified: graph.verified === true,
  crossLanguageReproductionVerified: reproduction.verified === true,
  sourceFreshVerified: sourceFresh.verified === true,
  parentGateVerified: parentGate.verified === true,
  priorArtSnapshotVerified: priorArt.verified === true,
  priorArtLiveQueriesReexecutedByGate: false,
  regeneratedReceiptMatched: regeneratedMatches,
  negativeTests: {
    artifactMutationDetected,
    observationMutationDetected,
    parentMutationDetected,
    priorArtMutationDetected,
    boundaryMutationDetected,
    noveltyMutationDetected,
    searchMutationDetected,
  },
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
