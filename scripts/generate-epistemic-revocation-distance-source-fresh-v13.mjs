import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/epistemic-revocation-distance/formal');
const outputPath = resolve(formalDir, 'evidence/source-fresh-build.v1.3.json');
const writeEvidence = process.argv.includes('--write-evidence');
const paths = {
  compilerReceipt: resolve(
    repoRoot,
    'docs/research/deontic-transportability/formal/' +
      'compiler-source-fresh.receipt.v0.4.json',
  ),
  parentReceipt: resolve(
    repoRoot,
    'docs/research/no-hidden-gauge-fixing/formal/' +
      'no-hidden-gauge-fixing-gate.receipt.v1.2.json',
  ),
  reconstruction: resolve(formalDir, 'evidence/compiler-reconstruction.v1.3.json'),
  runtime: resolve(formalDir, 'evidence/runtime-verification.v1.3.json'),
  source: resolve(formalDir, 'sounio/epistemic_revocation_distance_v1_3.sio'),
  wasm: resolve(formalDir, 'wasm/epistemic_revocation_distance.v1.3.wasm'),
  native: resolve(
    formalDir,
    'native/epistemic_revocation_distance.v1.3.linux-x86_64',
  ),
  transcript: resolve(formalDir, 'transcripts/source-fresh-build.v1.3.txt'),
};
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fileHash = (path) => sha256(readFileSync(path));
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const descriptor = (path) => ({
  path: fromRoot(path),
  bytes: statSync(path).size,
  sha256: fileHash(path),
});
const readJson = (path) => JSON.parse(readFileSync(path));
const compilerReceiptBytes = readFileSync(paths.compilerReceipt);
const compilerReceipt = JSON.parse(compilerReceiptBytes);
const parentReceipt = readJson(paths.parentReceipt);
const reconstruction = readJson(paths.reconstruction);
const runtime = readJson(paths.runtime);
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const expectedCompilerReceiptHash =
  '5dd254202286f62133edb2b8314b15079f07ee80a25cc50e61dc659079874ea6';

check(sha256(compilerReceiptBytes) === expectedCompilerReceiptHash,
  'compiler receipt identity drift');
check(compilerReceipt.compilerReconciled === true, 'compiler is not reconciled');
check(parentReceipt.verified === true, 'parent v1.2 receipt is not verified');
check(reconstruction.verified === true, 'compiler reconstruction is not verified');
check(reconstruction.repository?.commit === compilerReceipt.repository.commit,
  'reconstruction commit differs from compiler receipt');
check(reconstruction.repository?.tree === compilerReceipt.repository.tree,
  'reconstruction tree differs from compiler receipt');
check(reconstruction.fixedPoint?.bitIdentical === true,
  'reconstructed bootstrap is not at a fixed point');
check(reconstruction.fixedPoint?.sha256 === compilerReceipt.bootstrap.seedSha256,
  'fixed-point seed identity drift');
check(reconstruction.compiler?.sha256 === compilerReceipt.compiler.sha256,
  'reconstructed compiler hash differs from receipt');
check(reconstruction.compiler?.bytes === compilerReceipt.compiler.bytes,
  'reconstructed compiler size differs from receipt');
check(reconstruction.compiler?.errorDiagnostics === 0,
  'reconstructed compiler emitted error diagnostics');
check(reconstruction.builds?.sourceSha256 === fileHash(paths.source),
  'Sounio source identity differs from reconstruction evidence');
check(reconstruction.builds?.wasmSha256 === fileHash(paths.wasm),
  'WASM identity differs from reconstruction evidence');
check(reconstruction.builds?.wasmRepeatSha256 === fileHash(paths.wasm),
  'repeat WASM build is not deterministic');
check(reconstruction.builds?.nativeSha256 === fileHash(paths.native),
  'native identity differs from reconstruction evidence');
check(reconstruction.builds?.nativeRepeatSha256 === fileHash(paths.native),
  'repeat native build is not deterministic');
check(reconstruction.builds?.wasmMainResults?.every((value) => value === 143),
  'WASM self-check parity drift');
check(reconstruction.builds?.wasmFocusedSelfChecks
  ?.every((value) => value === 0),
  'focused WASM self-check drift');
check(reconstruction.builds?.wasmExhaustiveSelfChecks
  ?.every((value) => value === 0),
  'exhaustive WASM self-check drift');
check(reconstruction.builds?.nativeExitCodes?.every((value) => value === 143),
  'native self-check parity drift');
check(runtime.verified === true && runtime.canonicalWasm?.mainResult === 143,
  'runtime evidence is not closed');
check(runtime.canonicalWasm?.focusedSelfCheck === 0,
  'runtime focused self-check is not closed');
check(runtime.canonicalWasm?.exhaustiveSelfCheck === 0 &&
  runtime.canonicalWasm?.exhaustiveSelfCheckComposedInMain === true,
  'runtime exhaustive self-check is not closed');
check(runtime.canonicalWasm?.sha256 === fileHash(paths.wasm),
  'runtime WASM identity drift');
check(fileHash(paths.transcript) === reconstruction.buildTranscript?.sha256,
  'source-fresh build transcript identity drift');

const result = {
  schema: 'darwin.epistemic-revocation-distance-source-fresh-build.v1.3',
  generatedAt: '2026-08-03T14:50:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  compilerReceipt: {
    ...descriptor(paths.compilerReceipt),
    compilerReconciled: compilerReceipt.compilerReconciled,
  },
  parentReceipt: {
    ...descriptor(paths.parentReceipt),
    verified: parentReceipt.verified === true,
  },
  reconstruction: descriptor(paths.reconstruction),
  compiler: {
    repository: compilerReceipt.repository.url,
    branch: compilerReceipt.repository.branch,
    commit: compilerReceipt.repository.commit,
    tree: compilerReceipt.repository.tree,
    identity: compilerReceipt.compiler.identity,
    expectedSha256: compilerReceipt.compiler.sha256,
    reconstructedSha256: reconstruction.compiler.sha256,
    reconstructedHashMatchedReceipt:
      reconstruction.compiler.sha256 === compilerReceipt.compiler.sha256,
    artifactPersistedInRepository: false,
  },
  fixedPoint: reconstruction.fixedPoint,
  artifacts: {
    source: descriptor(paths.source),
    wasm: descriptor(paths.wasm),
    native: descriptor(paths.native),
    buildTranscript: descriptor(paths.transcript),
    deterministicWasm:
      reconstruction.builds.wasmSha256 === reconstruction.builds.wasmRepeatSha256,
    deterministicNative:
      reconstruction.builds.nativeSha256 ===
        reconstruction.builds.nativeRepeatSha256,
  },
  parity: {
    nativeMainResults: reconstruction.builds.nativeExitCodes,
    wasmMainResults: reconstruction.builds.wasmMainResults,
    wasmFocusedSelfChecks: reconstruction.builds.wasmFocusedSelfChecks,
    wasmExhaustiveSelfChecks: reconstruction.builds.wasmExhaustiveSelfChecks,
    nativeWasmMainParity:
      reconstruction.builds.nativeExitCodes.every((value) => value === 143) &&
      reconstruction.builds.wasmMainResults.every((value) => value === 143),
    completeNativeWasmExportParityEstablished: false,
    emittedWasmSemanticsMechanized: false,
  },
  environment: reconstruction.environment,
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
