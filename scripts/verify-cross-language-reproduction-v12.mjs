import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');
const sourcePath = resolve(formalDir, 'rust/no_hidden_gauge_fixing_oracle_v1_2.rs');
const committedBinaryPath = resolve(
  formalDir,
  'native-v1.2/no_hidden_gauge_fixing_oracle.v1.2.macos-arm64',
);
const triangleTranscriptPath = resolve(formalDir, 'transcripts/canonical-domain.v1.2.txt');
const graphTranscriptPath = resolve(
  formalDir,
  'transcripts/cross-language-graph.v1.2.txt',
);
const inputPath = resolve(formalDir, 'reproduction-v1.2/blind-inputs.v1.2.txt');
const manifestPath = resolve(
  formalDir,
  'reproduction-v1.2/blind-reproduction-manifest.v1.2.json',
);
const attestationPath = resolve(
  formalDir,
  'reproduction-v1.2/third-party-attestation.template.json',
);
const evidencePath = resolve(
  formalDir,
  'evidence/cross-language-reproduction.v1.2.json',
);
const writeEvidence = process.argv.includes('--write-evidence');
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const run = (command, arguments_, options = {}) => spawnSync(command, arguments_, {
  cwd: repoRoot,
  encoding: null,
  maxBuffer: 32 * 1024 * 1024,
  ...options,
});

const rustVersion = run('rustc', ['--version'], {encoding: 'utf8'});
check(rustVersion.status === 0, 'rustc --version failed');
const tempDirectory = mkdtempSync(resolve(tmpdir(), 'darwin-nhgf-v12-rust-'));
const tempBinary = resolve(tempDirectory, 'oracle');
const compileArguments = [
  '--edition=2021',
  '-C', 'opt-level=2',
  '-C', 'debuginfo=0',
  '-C', 'strip=symbols',
  '-C', 'metadata=darwin-nhgf-v12',
  sourcePath,
  '-o', tempBinary,
];
const manifest = JSON.parse(readFileSync(manifestPath));
const blindInputs = readFileSync(inputPath);
const canonicalTriangle = readFileSync(triangleTranscriptPath);
const firstBuild = run('rustc', compileArguments, {encoding: 'utf8'});
check(firstBuild.status === 0, `first Rust build failed: ${firstBuild.stderr}`);
const firstBinary = firstBuild.status === 0 ? readFileSync(tempBinary) : Buffer.alloc(0);
const firstSelfCheck = run(tempBinary, ['self-check'], {encoding: 'utf8'});
const firstTriangleRun = run(tempBinary, ['triangle-transcript']);
const firstGraphRun = run(tempBinary, ['graph-transcript', inputPath]);
const secondBuild = run('rustc', compileArguments, {encoding: 'utf8'});
check(secondBuild.status === 0, `second Rust build failed: ${secondBuild.stderr}`);
const secondBinary = secondBuild.status === 0 ? readFileSync(tempBinary) : Buffer.alloc(0);
const selfCheck = run(tempBinary, ['self-check'], {encoding: 'utf8'});
const triangleRun = run(tempBinary, ['triangle-transcript']);
const graphRun = run(tempBinary, ['graph-transcript', inputPath]);
const binaryBitwiseDeterministic = sha256(firstBinary) === sha256(secondBinary);
const executionTranscriptDeterministic =
  firstSelfCheck.stdout === selfCheck.stdout &&
  firstTriangleRun.stdout.equals(triangleRun.stdout) &&
  firstGraphRun.stdout.equals(graphRun.stdout);
check(firstSelfCheck.status === 0 && selfCheck.status === 0 &&
  selfCheck.stdout.trim() === '131',
  'Rust self-check failed');
check(firstTriangleRun.status === 0 && triangleRun.status === 0,
  'Rust triangle transcript failed');
check(firstGraphRun.status === 0 && graphRun.status === 0,
  'Rust graph transcript failed');
check(executionTranscriptDeterministic,
  'two Rust builds emitted different execution transcripts');
const triangleParity = triangleRun.stdout.equals(canonicalTriangle);
check(triangleParity, 'Rust and Sounio/WASM triangle transcripts differ');

check(sha256(blindInputs) === manifest.inputs.sha256, 'blind input hash mismatch');
const graphCommitmentMatched = sha256(graphRun.stdout) ===
  manifest.expectedCommitment.sha256;
check(graphCommitmentMatched, 'Rust graph output missed the sealed commitment');
const committedGraphTranscript = readFileSync(graphTranscriptPath);
check(graphRun.stdout.equals(committedGraphTranscript),
  'committed cross-language graph transcript drift');

const tamperedInputPath = resolve(tempDirectory, 'tampered-inputs.txt');
const tamperedText = blindInputs.toString('utf8').replace(/\|(\d+),(\d+),(\d+),(\d+),(\d+)\n/,
  (_match, vertices, edges, parity, anchors, values) =>
    `|${vertices},${edges},${parity},${anchors},${Number(values) ^ 1}\n`);
writeFileSync(tamperedInputPath, tamperedText);
const tamperedRun = run(tempBinary, ['graph-transcript', tamperedInputPath]);
const tamperedCommitmentRejected = tamperedRun.status !== 0 ||
  sha256(tamperedRun.stdout) !== manifest.expectedCommitment.sha256;
check(tamperedCommitmentRejected, 'tampered blind input matched the commitment');

const rustSource = readFileSync(sourcePath, 'utf8');
check(rustSource.includes('#![forbid(unsafe_code)]'), 'Rust source permits unsafe code');
check(!/^\s*extern\s+crate\s+/m.test(rustSource), 'Rust source imports an external crate');
const attestation = JSON.parse(readFileSync(attestationPath));
check(attestation.attestationStatus === 'UNSIGNED_TEMPLATE',
  'third-party attestation status drift');
check(manifest.externalHumanReproductionComplete === false,
  'manifest silently claims external reproduction');

const descriptor = (path) => ({
  path: fromRoot(path),
  bytes: readFileSync(path).length,
  sha256: sha256(readFileSync(path)),
});
const result = {
  schema: 'darwin.cross-language-reproduction-verification.v1.2',
  generatedAt: '2026-08-03T12:00:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  compiler: {
    identity: rustVersion.stdout.trim(),
    command: 'rustc --edition=2021 -C opt-level=2 -C debuginfo=0 -C strip=symbols -C metadata=darwin-nhgf-v12 <source> -o <fixed-output>',
    builds: 2,
    binaryBitwiseDeterministic,
    executionTranscriptDeterministic,
    binaryDeterminismNote:
      'Mach-O LC_UUID may differ while exact execution transcripts remain identical.',
    binarySha256: sha256(secondBinary),
  },
  triangle: {
    states: 32768,
    transcriptSha256: sha256(triangleRun.stdout),
    sounioWasmTranscriptSha256: sha256(canonicalTriangle),
    exactParity: triangleParity,
  },
  blindGraphPackage: {
    cases: manifest.selection.cases,
    familyCounts: manifest.selection.familyCounts,
    inputSha256: sha256(blindInputs),
    expectedCommitmentSha256: manifest.expectedCommitment.sha256,
    rustOutputSha256: sha256(graphRun.stdout),
    commitmentMatched: graphCommitmentMatched,
    tamperedCommitmentRejected,
    readyForExternalReproduction: true,
  },
  independence: {
    differentLanguage: true,
    noExternalCrates: true,
    reusesSounioImplementation: false,
    implementationIndependentReproductionComplete: true,
    authorIndependentReproductionComplete: false,
    externalHumanReproductionComplete: false,
    reason: 'No unrelated third party has returned a signed attestation.',
  },
  artifacts: [
    sourcePath,
    committedBinaryPath,
    triangleTranscriptPath,
    graphTranscriptPath,
    inputPath,
    manifestPath,
    attestationPath,
  ].map(descriptor),
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`);
}
rmSync(tempDirectory, {recursive: true, force: true});
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
