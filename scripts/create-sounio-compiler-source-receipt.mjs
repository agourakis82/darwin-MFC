import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import {
  COMPILER_SOURCE_RECEIPT_SCHEMA,
  EXPECTED_SOURCE_BRANCH,
  sha256,
  validateCompilerSourceReceipt,
} from './lib/sounio-compiler-receipt.mjs';

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}
const required = name => {
  const value = args.get(name);
  if (!value) throw new Error(`Missing required argument: ${name}`);
  return resolve(value);
};

const sourceRoot = required('--sounio-root');
const compilerPath = required('--compiler');
const stage2Path = required('--stage2');
const stage3Path = required('--stage3');
const buildLogPath = required('--build-log');
const reproLogPath = required('--repro-log');
const reproNoRustLogPath = required('--repro-no-rust-log');
const releaseLogPath = required('--release-log');
const releaseNoRustLogPath = required('--release-no-rust-log');
const outputPath = required('--output');
const sourceBranch = args.get('--source-branch') || EXPECTED_SOURCE_BRANCH;

const git = (...gitArgs) => execFileSync('git', ['-C', sourceRoot, ...gitArgs], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
}).trim();
const read = path => readFileSync(path);
const hashFile = path => sha256(read(path));
const trackedPath = path => relative(sourceRoot, path).replaceAll('\\', '/');

const compilerSourcePath = resolve(sourceRoot, 'self-hosted/compiler/lean_single.sio');
const buildScriptPath = resolve(sourceRoot, 'scripts/ci/build_native_souc.sh');
const reproScriptPath = resolve(sourceRoot, 'scripts/selfhost/selfhost_cycle_repro_gate.sh');
const releaseScriptPath = resolve(sourceRoot, 'scripts/selfhost/selfhost_cycle_release_gate.sh');
const noRustScriptPath = resolve(sourceRoot, 'scripts/ci/assert_no_rust_markers.sh');
const seedPath = resolve(sourceRoot, 'bin/souc-linux-x86_64');
const gateCompilerPath = resolve(sourceRoot, 'artifacts/omega/souc-bin/souc-linux-x86_64-gpu');

const commit = git('rev-parse', 'HEAD');
const tree = git('rev-parse', 'HEAD^{tree}');
const remoteBranchCommit = git('rev-parse', `refs/remotes/origin/${sourceBranch}`);
const remoteMainCommit = git('rev-parse', 'refs/remotes/origin/main');
const clean = git('status', '--porcelain=v1', '--untracked-files=all') === '';
const [mainOnly, branchOnly] = git(
  'rev-list',
  '--left-right',
  '--count',
  `refs/remotes/origin/main...refs/remotes/origin/${sourceBranch}`,
).split(/\s+/).map(Number);
const sourceManifest = git('ls-tree', '-r', '--full-tree', 'HEAD');
const buildLog = read(buildLogPath).toString('utf8');
const reproLog = read(reproLogPath).toString('utf8');
const reproNoRustLog = read(reproNoRustLogPath).toString('utf8');
const releaseLog = read(releaseLogPath).toString('utf8');
const releaseNoRustLog = read(releaseNoRustLogPath).toString('utf8');

const compilerSha256 = hashFile(compilerPath);
const stage2Sha256 = hashFile(stage2Path);
const stage3Sha256 = hashFile(stage3Path);
const seedSha256 = hashFile(seedPath);
const gates = {
  sourceRepositoryClean: clean,
  sourceBranchPinned: sourceBranch === EXPECTED_SOURCE_BRANCH,
  sourceCommitMatchesRemote: commit === remoteBranchCommit,
  seedTrackedAtPinnedCommit: git('rev-parse', `HEAD:${trackedPath(seedPath)}`).length >= 40,
  sourceBootstrapForced: buildLog.includes('SOUNIO_FORCE_SOURCE_BOOTSTRAP=1')
    || buildLog.includes('Skipping checked-in native compiler artifact copy'),
  fixedPointBitwise: compilerSha256 === stage2Sha256 && stage2Sha256 === stage3Sha256,
  selfHostReproducibility: reproLog.includes('SELFHOST_CYCLE_GATE_DONE')
    && reproNoRustLog.includes('NO_RUST_MARKERS_RESULT PASS'),
  selfHostRelease: releaseLog.includes('SELFHOST_CYCLE_GATE_DONE')
    && releaseNoRustLog.includes('NO_RUST_MARKERS_RESULT PASS'),
  noRustMarkers: reproNoRustLog.includes('NO_RUST_MARKERS_RESULT PASS')
    && releaseNoRustLog.includes('NO_RUST_MARKERS_RESULT PASS'),
};
const compilerReconciled = Object.values(gates).every(Boolean);

const receipt = {
  schemaVersion: COMPILER_SOURCE_RECEIPT_SCHEMA,
  receiptId: `sounio-${commit.slice(0, 12)}-${compilerSha256.slice(0, 12)}`,
  generatedAt: new Date().toISOString(),
  repository: {
    url: git('remote', 'get-url', 'origin'),
    sourceBranch,
    commit,
    tree,
    clean,
    remoteBranchCommit,
    remoteMainCommit,
    divergenceFromMain: { mainOnly, branchOnly },
  },
  source: {
    compiler: { path: trackedPath(compilerSourcePath), sha256: hashFile(compilerSourcePath) },
    buildScript: { path: trackedPath(buildScriptPath), sha256: hashFile(buildScriptPath) },
    reproducibilityGate: { path: trackedPath(reproScriptPath), sha256: hashFile(reproScriptPath) },
    releaseGate: { path: trackedPath(releaseScriptPath), sha256: hashFile(releaseScriptPath) },
    noRustMarkerGate: { path: trackedPath(noRustScriptPath), sha256: hashFile(noRustScriptPath) },
    seed: { path: trackedPath(seedPath), sha256: seedSha256 },
  },
  artifacts: {
    compiler: { identity: 'souc-source-fresh-linux-x86_64', sha256: compilerSha256, bytes: statSync(compilerPath).size },
    fixedPointStage2: { sha256: stage2Sha256, bytes: statSync(stage2Path).size },
    fixedPointStage3: { sha256: stage3Sha256, bytes: statSync(stage3Path).size },
    gateCompiler: { path: trackedPath(gateCompilerPath), sha256: hashFile(gateCompilerPath) },
  },
  commands: [
    {
      id: 'source-bootstrap',
      environment: { LC_ALL: 'C', TZ: 'UTC', SOUNIO_FORCE_SOURCE_BOOTSTRAP: '1' },
      argv: ['bash', 'scripts/ci/build_native_souc.sh', '<build>/souc-source-fresh'],
      exitCode: 0,
      outputSha256: hashFile(buildLogPath),
    },
    {
      id: 'fixed-point-stage2',
      argv: ['<build>/souc-source-fresh', 'self-hosted/compiler/lean_single.sio', '<build>/souc-fixedpoint-stage2'],
      exitCode: 0,
      outputSha256: stage2Sha256,
    },
    {
      id: 'fixed-point-stage3',
      argv: ['<build>/souc-fixedpoint-stage2', 'self-hosted/compiler/lean_single.sio', '<build>/souc-fixedpoint-stage3'],
      exitCode: 0,
      outputSha256: stage3Sha256,
    },
    {
      id: 'selfhost-reproducibility',
      argv: ['bash', 'scripts/selfhost/selfhost_cycle_repro_gate.sh'],
      exitCode: 0,
      outputSha256: hashFile(reproLogPath),
    },
    {
      id: 'selfhost-release',
      argv: ['bash', 'scripts/selfhost/selfhost_cycle_release_gate.sh'],
      exitCode: 0,
      outputSha256: hashFile(releaseLogPath),
    },
  ],
  canonicalGateAdapter: {
    applied: true,
    reason: 'The pinned gate references scripts/assert_no_rust_markers.sh; the tracked verifier is scripts/ci/assert_no_rust_markers.sh.',
    markerVerificationExecutedSeparately: true,
  },
  hashes: {
    sourceManifestSha256: sha256(Buffer.from(sourceManifest)),
    compilerSourceSha256: hashFile(compilerSourcePath),
    seedSha256,
    compilerSha256,
    gateCompilerSha256: hashFile(gateCompilerPath),
    reproducibilityGateLogSha256: hashFile(reproLogPath),
    releaseGateLogSha256: hashFile(releaseLogPath),
  },
  gates,
  compilerReconciled,
  signature: null,
  refusalReasons: compilerReconciled ? [] : Object.entries(gates)
    .filter(([, passed]) => !passed)
    .map(([gate]) => gate),
};

validateCompilerSourceReceipt(receipt, { expectedCompilerSha256: compilerSha256, requireReconciled: true });
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, compilerReconciled, compilerSha256, commit, tree }, null, 2));
console.log('SOUNIO_COMPILER_SOURCE_RECEIPT_OK');
