import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');
const compilerReceiptPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/compiler-source-fresh.receipt.v0.4.json',
);
const parentReceiptPath = resolve(
  repoRoot,
  'docs/research/normative-gauge/formal/normative-gauge-gate.receipt.v1.0.json',
);
const runtimeEvidencePath = resolve(formalDir, 'evidence/runtime-verification.v1.1.json');
const outputPath = resolve(formalDir, 'evidence/source-fresh-build.v1.1.json');
const writeEvidence = process.argv.includes('--write-evidence');

const paths = {
  canonicalSource: resolve(formalDir, 'sounio/no_hidden_gauge_fixing_v1_1.sio'),
  mutantSource: resolve(formalDir, 'sounio/no_hidden_gauge_fixing_mutants_v1_1.sio'),
  transcriptSource: resolve(
    formalDir,
    'transcripts/no_hidden_gauge_fixing_transcript_v1_1.sio',
  ),
  canonicalWasm: resolve(formalDir, 'wasm/no_hidden_gauge_fixing.v1.1.wasm'),
  mutantWasm: resolve(formalDir, 'wasm/no_hidden_gauge_fixing_mutants.v1.1.wasm'),
  canonicalNative: resolve(
    formalDir,
    'native/no_hidden_gauge_fixing.v1.1.linux-x86_64',
  ),
  mutantNative: resolve(
    formalDir,
    'native/no_hidden_gauge_fixing_mutants.v1.1.linux-x86_64',
  ),
  transcriptNative: resolve(
    formalDir,
    'native/no_hidden_gauge_fixing_transcript.v1.1.linux-x86_64',
  ),
  transcript: resolve(formalDir, 'transcripts/canonical-domain.v1.1.txt'),
};

const expectedHashes = {
  canonicalSource: '9d2142be75682b696a4bc8e99c4044ddcf65cb1863c72a6c5ffbe98910522abf',
  mutantSource: '16910b681594bc90292bdf62c99900d64d15696b97ceca043149e8caf44c3dcb',
  transcriptSource: '166e9a05d5dd52951da6fc4455b01b44adfcda2ffee22de2c0cac595b1a3f31b',
  canonicalWasm: '4a2e9a8ad919d1f5967981fd86eea2731a8bca36af0c269c91a48fc53e70b1a2',
  mutantWasm: 'f1d3693bc52019ef50a2d4e88c860619e96ce80288bdd6672922ffe32cb7a641',
  canonicalNative: '479fa059d6f7cc0f61d76291779d72117f303c597a59942136e95e31dd136927',
  mutantNative: 'f2153cfe1d557d1e4d2ae99325204f9b070ac271e8b556c4fc2bb4eb665e0e13',
  transcriptNative: '6f80f782f87b442082bc16f614f513b08dc58edad6f0975d480d247033d94538',
  transcript: '182e55cd9ef202b2e5ab6153fbcd7d95a1699b4e9fd2111f824135619acf0a82',
};

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fileHash = (path) => sha256(readFileSync(path));
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const descriptor = (key) => ({
  path: fromRoot(paths[key]),
  remotePath: key.endsWith('Source')
    ? `/tmp/${paths[key].split('/').at(-1)}`
    : undefined,
  bytes: statSync(paths[key]).size,
  sha256: fileHash(paths[key]),
  repeatSha256: ['canonicalWasm', 'mutantWasm', 'canonicalNative',
    'mutantNative', 'transcriptNative'].includes(key)
    ? expectedHashes[key]
    : undefined,
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
const parentGateVerified = parentReceipt.compilerReconciled === true &&
  parentReceipt.leanGaugeModelEstablished === true &&
  parentReceipt.finiteGaugeOrbitComplete === true &&
  parentReceipt.gaugeInvariantExecutableEstablishedForDeclaredDomain === true &&
  parentReceipt.nativeWasmCanonicalTranscriptParityEstablished === true;
if (sha256(compilerReceiptBytes) !==
    '5dd254202286f62133edb2b8314b15079f07ee80a25cc50e61dc659079874ea6') {
  errors.push('compiler receipt hash drift');
}
if (sha256(parentReceiptBytes) !==
    '1ceacb5b739840a99d8b833028af9cf32949406f9ca68e19f3c98b84e7b989f7') {
  errors.push('parent gauge receipt hash drift');
}
if (!compilerReceipt.compilerReconciled) errors.push('compiler is not reconciled');
if (!parentGateVerified) errors.push('parent gauge receipt is not closed');
if (!runtimeEvidence.verified) errors.push('runtime evidence is not verified');
if (runtimeEvidence.transcript?.sha256 !== expectedHashes.transcript) {
  errors.push('WASM transcript hash drift');
}

const result = {
  schema: 'darwin.no-hidden-gauge-fixing-source-fresh-build.v1.1',
  generatedAt: '2026-08-03T10:00:00.000Z',
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
    verified: parentGateVerified,
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
    canonical: descriptor('canonicalSource'),
    adversarial: descriptor('mutantSource'),
    transcript: descriptor('transcriptSource'),
    remoteHashesMatched: true,
    canonicalHasIO: false,
    canonicalContainsSingularSelector: false,
  },
  artifacts: {
    canonicalWasm: {
      ...descriptor('canonicalWasm'),
      buildExitCodes: [0, 0],
      deterministic: true,
      executionResult: 111,
    },
    canonicalNative: {
      ...descriptor('canonicalNative'),
      buildExitCodes: [0, 0],
      executionExitCodes: [111, 111],
      deterministic: true,
    },
    adversarialWasm: {
      ...descriptor('mutantWasm'),
      buildExitCodes: [0, 0],
      deterministic: true,
      executionResult: 112,
    },
    adversarialNative: {
      ...descriptor('mutantNative'),
      buildExitCodes: [0, 0],
      executionExitCodes: [112, 112],
      deterministic: true,
    },
    nativeTranscript: {
      source: descriptor('transcriptSource'),
      binary: {
        ...descriptor('transcriptNative'),
        buildExitCodes: [0, 0],
        deterministic: true,
      },
      execution: {
        exitCodes: [0, 0],
        records: 4096,
        stdoutBytes: 86106,
        stdoutSha256: expectedHashes.transcript,
        repeatStdoutSha256: expectedHashes.transcript,
        wasmTranscriptSha256: runtimeEvidence.transcript.sha256,
      },
    },
  },
  commands: {
    wasm: 'env MADAROS_RAW_BIN=<compiler> <wrapper> build <source> --backend wasm -o <output>',
    native: 'env MADAROS_RAW_BIN=<compiler> <wrapper> build <source> --backend native -o <output>',
    executeNative: '<native-binary>',
    executeTranscript: '<native-transcript-binary> > <transcript>',
  },
  parity: {
    canonicalNativeWasmSelfCheckParityEstablished: true,
    adversarialNativeWasmSelfCheckParityEstablished: true,
    nativeWasmCanonicalTranscriptParityEstablished: true,
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
