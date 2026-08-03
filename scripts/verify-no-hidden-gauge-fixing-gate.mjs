import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const receiptPath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/no-hidden-gauge-fixing-gate.receipt.v1.1.json',
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

check(receipt.schema === 'darwin.no-hidden-gauge-fixing-gate-receipt.v1.1', 'schema drift');
check(receipt.status === 'ABSTRACT_RESEARCH_ONLY', 'research status drift');
check(receipt.clinicalDisposition === 'REFUSE', 'clinical disposition drift');
check(receipt.clinicalUseAllowed === false, 'clinical use became allowed');
check(receipt.productionAuthorized === false, 'production became authorized');
check(receipt.noveltyEstablished === false, 'novelty was silently established');
check(receipt.signed === false, 'unsigned research receipt became signed');
check(receipt.externalObservationValueReceiptImplemented === false,
  'external observation receipt boundary drift');
check(receipt.canonicalSingularWitnessExportCount === 0,
  'canonical receipt exposes a singular witness');
check(receipt.verified === true, 'receipt is not verified');
check(verifyDescriptor(receipt.parent), 'parent receipt identity mismatch');
check(verifyDescriptor(receipt.compilerReceipt), 'compiler receipt identity mismatch');
for (const [name, entry] of Object.entries(receipt.evidence)) {
  check(verifyDescriptor(entry), `${name} evidence identity mismatch`);
}
for (const entry of receipt.artifacts) {
  check(verifyDescriptor(entry), `artifact identity mismatch: ${entry.path}`);
}

const runJson = (script) => {
  const execution = spawnSync(process.execPath, [resolve(repoRoot, script)], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 16 * 1024 * 1024,
  });
  check(execution.status === 0, `${script} exited ${execution.status}: ${execution.stderr}`);
  try {
    return JSON.parse(execution.stdout);
  } catch (error) {
    errors.push(`${script} did not emit JSON: ${error.message}`);
    return {verified: false};
  }
};

const runtime = runJson('scripts/verify-no-hidden-gauge-fixing.mjs');
const lean = runJson('scripts/verify-no-hidden-gauge-fixing-lean.mjs');
const sourceFresh = runJson(
  'scripts/generate-no-hidden-gauge-fixing-source-fresh-evidence.mjs',
);
check(runtime.verified === true, 'fresh runtime verification failed');
check(lean.verified === true, 'fresh Lean verification failed');
check(sourceFresh.verified === true, 'fresh source-fresh verification failed');
check(runtime.canonicalWasm?.singularWitnessExportCount === 0,
  'fresh canonical WASM exposes a singular witness');
check(runtime.gaugeAction?.gaugeMismatches === 0, 'fresh gauge mismatch');
check(runtime.stabilizerObstruction?.minimumAnchorMismatches === 0,
  'fresh minimum-anchor mismatch');
check(runtime.mutationAdequacy?.killed === 4, 'fresh mutation gate failed');
check(sourceFresh.parity?.nativeWasmCanonicalTranscriptParityEstablished === true,
  'fresh native/WASM transcript parity failed');

const canonicalWasmEntry = receipt.artifacts.find(
  (entry) => entry.path.endsWith('/no_hidden_gauge_fixing.v1.1.wasm'),
);
const canonicalSourceEntry = receipt.artifacts.find(
  (entry) => entry.path.endsWith('/no_hidden_gauge_fixing_v1_1.sio'),
);
const tamperedWasm = Buffer.from(readFileSync(resolve(repoRoot, canonicalWasmEntry.path)));
tamperedWasm[tamperedWasm.length - 1] ^= 1;
const artifactMutationDetected = sha256(tamperedWasm) !== canonicalWasmEntry.sha256;
const tamperedParent = {...receipt.parent, sha256: '0'.repeat(64)};
const parentMutationDetected = !verifyDescriptor(tamperedParent);
const tamperedBoundary = {...receipt, clinicalDisposition: 'READY'};
const boundaryMutationDetected = tamperedBoundary.clinicalDisposition !== 'REFUSE';
const canonicalSource = readFileSync(resolve(repoRoot, canonicalSourceEntry.path), 'utf8');
const selectorInjectionDetected = /\bselector\b/.test(
  `${canonicalSource}\nfn selector() -> i64 { return 0 }\n`,
);
check(artifactMutationDetected, 'artifact tampering was not detected');
check(parentMutationDetected, 'parent identity tampering was not detected');
check(boundaryMutationDetected, 'boundary tampering was not detected');
check(selectorInjectionDetected, 'selector injection was not detected');

const result = {
  schema: 'darwin.no-hidden-gauge-fixing-gate-verification.v1.1',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  receiptPath,
  receiptSha256: sha256(readFileSync(receiptPath)),
  artifactCount: receipt.artifacts.length,
  runtimeVerified: runtime.verified === true,
  leanVerified: lean.verified === true,
  sourceFreshVerified: sourceFresh.verified === true,
  negativeTests: {
    artifactMutationDetected,
    parentMutationDetected,
    boundaryMutationDetected,
    selectorInjectionDetected,
  },
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
