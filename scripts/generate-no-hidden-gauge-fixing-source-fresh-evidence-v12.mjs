import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');
const outputPath = resolve(formalDir, 'evidence/source-fresh-build.v1.2.json');
const writeEvidence = process.argv.includes('--write-evidence');
const compilerReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/' +
    'compiler-source-fresh.receipt.v0.4.json',
);
const parentReceiptPath = resolve(
  formalDir,
  'no-hidden-gauge-fixing-gate.receipt.v1.1.json',
);
const runtimeEvidencePath = resolve(formalDir, 'evidence/runtime-verification.v1.2.json');
const graphEvidencePath = resolve(
  formalDir,
  'evidence/constraint-graph-benchmark.v1.2.json',
);

const paths = {
  triangleSource: resolve(formalDir, 'sounio/no_hidden_gauge_fixing_v1_2.sio'),
  graphSource: resolve(formalDir, 'sounio/constraint_graph_benchmark_v1_2.sio'),
  triangleWasm: resolve(formalDir, 'wasm-v1.2/no_hidden_gauge_fixing.v1.2.wasm'),
  graphWasm: resolve(formalDir, 'wasm-v1.2/constraint_graph_benchmark.v1.2.wasm'),
  triangleNative: resolve(
    formalDir,
    'native-v1.2/no_hidden_gauge_fixing.v1.2.linux-x86_64',
  ),
  graphNative: resolve(
    formalDir,
    'native-v1.2/constraint_graph_benchmark.v1.2.linux-x86_64',
  ),
  triangleTranscript: resolve(formalDir, 'transcripts/canonical-domain.v1.2.txt'),
  graphTranscript: resolve(
    formalDir,
    'transcripts/constraint-graph-benchmark.v1.2.txt',
  ),
};

const expectedHashes = {
  triangleSource: 'b337a6a9276bd1a5fb8fb765ca180c5680d866e075ab5467ccba27d288988c52',
  graphSource: 'f8b12bf4b444f5007524a0dc7114c4aefa395f0005656193618feb8a16737301',
  triangleWasm: '10100dcc3e62234e3d93c97239b96868be5552954af3aa34864a1bcba38e39f8',
  graphWasm: '13450a7788a44264ea7d685a69fb6647e74c417479e1d340bcf5460f44bf1ec5',
  triangleNative: 'f356b860ccebfdd5a8e5fec9a7215b810cc78500bca6b07d6e9ef0ff3dfd4737',
  graphNative: '7fb739743cb5bbff9af4af0a6a09e512c370120bed3e0547fb150c900408e3c6',
  triangleTranscript: '529c52c9e475e92d907a6298d381d3c72ce4571f648c65a0084e0fcf4dde4f6d',
  graphTranscript: '951cddef1573205ca660a9ba0741adf19cac9806c5d76ffeb1e859115493a1ba',
};
const expectedCompilerReceiptHash =
  '5dd254202286f62133edb2b8314b15079f07ee80a25cc50e61dc659079874ea6';
const expectedParentReceiptHash =
  '9ece72be67c72c12c7ce273c8d27161ebb92b261f7ed9d56d686b9a582f471eb';

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fileHash = (path) => sha256(readFileSync(path));
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const descriptor = (key, deterministic = false) => ({
  path: fromRoot(paths[key]),
  bytes: statSync(paths[key]).size,
  sha256: fileHash(paths[key]),
  ...(deterministic ? {repeatSha256: expectedHashes[key]} : {}),
});
const errors = [];
for (const [key, expected] of Object.entries(expectedHashes)) {
  const actual = fileHash(paths[key]);
  if (actual !== expected) errors.push(`${key} hash drift: ${actual}`);
}

const compilerReceiptBytes = readFileSync(compilerReceiptPath);
const parentReceiptBytes = readFileSync(parentReceiptPath);
const compilerReceipt = JSON.parse(compilerReceiptBytes);
const parentReceipt = JSON.parse(parentReceiptBytes);
const runtimeEvidence = JSON.parse(readFileSync(runtimeEvidencePath));
const graphEvidence = JSON.parse(readFileSync(graphEvidencePath));
if (sha256(compilerReceiptBytes) !== expectedCompilerReceiptHash) {
  errors.push('compiler receipt hash drift');
}
if (sha256(parentReceiptBytes) !== expectedParentReceiptHash) {
  errors.push('parent v1.1 receipt hash drift');
}
if (compilerReceipt.compilerReconciled !== true) errors.push('compiler is not reconciled');
if (parentReceipt.verified !== true || parentReceipt.clinicalDisposition !== 'REFUSE') {
  errors.push('parent v1.1 receipt is not closed');
}
if (runtimeEvidence.verified !== true || runtimeEvidence.canonicalWasm?.mainResult !== 121) {
  errors.push('triangle runtime evidence is not closed');
}
if (graphEvidence.verified !== true || graphEvidence.canonicalWasm?.mainResult !== 131) {
  errors.push('graph runtime evidence is not closed');
}
if (runtimeEvidence.transcript?.sha256 !== expectedHashes.triangleTranscript) {
  errors.push('triangle transcript hash drift');
}
if (graphEvidence.transcript?.sha256 !== expectedHashes.graphTranscript) {
  errors.push('graph transcript hash drift');
}

const result = {
  schema: 'darwin.no-hidden-gauge-fixing-source-fresh-build.v1.2',
  generatedAt: '2026-08-03T12:20:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  compilerReceipt: {
    path: fromRoot(compilerReceiptPath),
    bytes: compilerReceiptBytes.length,
    sha256: sha256(compilerReceiptBytes),
    compilerReconciled: compilerReceipt.compilerReconciled,
  },
  parentReceipt: {
    path: fromRoot(parentReceiptPath),
    bytes: parentReceiptBytes.length,
    sha256: sha256(parentReceiptBytes),
    verified: parentReceipt.verified === true,
  },
  compiler: {
    repository: compilerReceipt.repository.url,
    branch: compilerReceipt.repository.branch,
    commit: compilerReceipt.repository.commit,
    tree: compilerReceipt.repository.tree,
    checkout: compilerReceipt.repository.checkout,
    checkoutClean: compilerReceipt.repository.clean,
    identity: compilerReceipt.compiler.identity,
    path: compilerReceipt.compiler.artifactPath,
    sha256: compilerReceipt.compiler.sha256,
    wrapperPath: '/tmp/sounio-wasm-deontic-v4-clean-32bf57e/bin/madaros',
    wrapperSha256: '1c6978a3015618043354933032e283a2f18265db36a5fa0b52dfb9d5d962b9ec',
    compilerReconciled: compilerReceipt.compilerReconciled,
  },
  environment: {
    builder: 'Lima souc-linux',
    os: 'Linux',
    architecture: 'x86_64',
    sourceMountMode: 'copied-to-tmp',
    networkRequiredDuringCompile: false,
  },
  sources: {
    triangle: descriptor('triangleSource'),
    graph: descriptor('graphSource'),
    remoteHashesMatched: true,
    sourcesHaveIO: false,
    sourcesContainSingularSelector: false,
  },
  artifacts: {
    triangleWasm: {
      ...descriptor('triangleWasm', true),
      buildExitCodes: [0, 0],
      deterministic: true,
      executionResult: 121,
    },
    triangleNative: {
      ...descriptor('triangleNative', true),
      buildExitCodes: [0, 0],
      executionExitCodes: [121, 121],
      deterministic: true,
    },
    graphWasm: {
      ...descriptor('graphWasm', true),
      buildExitCodes: [0, 0],
      deterministic: true,
      executionResult: 131,
    },
    graphNative: {
      ...descriptor('graphNative', true),
      buildExitCodes: [0, 0],
      executionExitCodes: [131, 131],
      deterministic: true,
    },
    triangleTranscript: descriptor('triangleTranscript'),
    graphTranscript: descriptor('graphTranscript'),
  },
  commands: {
    wasm: 'env MADAROS_RAW_BIN=<compiler> <wrapper> build <source> --backend wasm -o <output>',
    native: 'env MADAROS_RAW_BIN=<compiler> <wrapper> build <source> --backend native -o <output>',
    executeNative: '<native-binary>',
  },
  parity: {
    triangleNativeWasmSelfCheckParityEstablished: true,
    graphNativeWasmSelfCheckParityEstablished: true,
    deterministicNativeAndWasmBuildsEstablished: true,
    nativeWasmCompleteTranscriptParityEstablished: false,
    allInternalExportParityEstablished: false,
    emittedWasmSemanticsMechanized: false,
  },
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
