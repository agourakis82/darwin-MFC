import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/epistemic-revocation-distance/formal');
const paths = {
  source: resolve(formalDir, 'rust/epistemic_revocation_distance_oracle_v1_3.rs'),
  binary: resolve(
    formalDir,
    'native/epistemic_revocation_distance_oracle.v1.3.macos-arm64',
  ),
  transcript: resolve(formalDir, 'transcripts/abstract-domain.v1.3.txt'),
  evidence: resolve(formalDir, 'evidence/cross-language-reproduction.v1.3.json'),
};
const writeEvidence = process.argv.includes('--write-evidence');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');

const source = readFileSync(paths.source, 'utf8');
const committedBinary = readFileSync(paths.binary);
const expectedTranscript = readFileSync(paths.transcript);
const forbidden = {
  unsafe: (source.match(/\bunsafe\b/g) ?? []).length,
  externalCrate: (source.match(/\bextern\s+crate\b/g) ?? []).length,
  wasmLoader: (source.match(/\b(WebAssembly|wasmtime|wasmer)\b/g) ?? []).length,
  sourceInclude: (source.match(/\b(include|include_bytes|include_str)!/g) ?? []).length,
};
for (const [name, count] of Object.entries(forbidden)) {
  check(count === 0, `Rust oracle contains forbidden ${name}`);
}

const rustcVersion = spawnSync('rustc', ['-vV'], {encoding: 'utf8'});
check(rustcVersion.status === 0, 'rustc version probe failed');
const freshPath = resolve('/tmp', `darwin-erd13-rust-${process.pid}`);
const compile = spawnSync('rustc', [
  '-C', 'opt-level=2',
  '-C', 'debuginfo=0',
  '-C', 'strip=symbols',
  paths.source,
  '-o', freshPath,
], {cwd: repoRoot, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024});
check(compile.status === 0, `fresh Rust compile failed: ${compile.stderr}`);
let freshBinary = Buffer.alloc(0);
let committedRun = {status: null, stdout: Buffer.alloc(0), stderr: Buffer.alloc(0)};
let freshRun = {status: null, stdout: Buffer.alloc(0), stderr: Buffer.alloc(0)};
if (compile.status === 0) {
  freshBinary = readFileSync(freshPath);
  committedRun = spawnSync(paths.binary, [], {
    cwd: repoRoot,
    encoding: null,
    maxBuffer: 8 * 1024 * 1024,
  });
  freshRun = spawnSync(freshPath, [], {
    cwd: repoRoot,
    encoding: null,
    maxBuffer: 8 * 1024 * 1024,
  });
}
rmSync(freshPath, {force: true});

check(committedRun.status === 0, 'committed Rust oracle execution failed');
check(freshRun.status === 0, 'fresh Rust oracle execution failed');
const committedTranscript = Buffer.from(committedRun.stdout ?? []);
const freshTranscript = Buffer.from(freshRun.stdout ?? []);
check(committedTranscript.equals(expectedTranscript),
  'committed Rust transcript differs from the Sounio/JavaScript commitment');
check(freshTranscript.equals(expectedTranscript),
  'fresh Rust transcript differs from the Sounio/JavaScript commitment');
const records = freshTranscript.toString('utf8').trimEnd().split('\n').length;
check(records === 66356, `Rust transcript cardinality drift: ${records}`);
const tamperedTranscript = Buffer.from(expectedTranscript);
tamperedTranscript[tamperedTranscript.length - 2] ^= 1;
const tamperedCommitmentRejected =
  sha256(tamperedTranscript) !== sha256(expectedTranscript);
check(tamperedCommitmentRejected, 'tampered transcript commitment was accepted');

const result = {
  schema: 'darwin.epistemic-revocation-distance-cross-language-reproduction.v1.3',
  generatedAt: '2026-08-03T14:30:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  implementation: {
    language: 'Rust',
    compiler: rustcVersion.stdout.trim(),
    noExternalCrates: forbidden.externalCrate === 0,
    unsafeForbidden: forbidden.unsafe === 0,
    wasmNotLoaded: forbidden.wasmLoader === 0,
    sourceNotIncluded: forbidden.sourceInclude === 0,
  },
  artifacts: {
    source: {
      path: fromRoot(paths.source),
      bytes: Buffer.byteLength(source),
      sha256: sha256(source),
    },
    binary: {
      path: fromRoot(paths.binary),
      bytes: committedBinary.length,
      sha256: sha256(committedBinary),
      freshBuildBytes: freshBinary.length,
      freshBuildExecuted: compile.status === 0,
      deterministic: false,
      deterministicBinaryEstablished: false,
    },
    transcript: {
      path: fromRoot(paths.transcript),
      bytes: expectedTranscript.length,
      sha256: sha256(expectedTranscript),
      records,
    },
  },
  parity: {
    committedTranscriptExact: committedTranscript.equals(expectedTranscript),
    freshTranscriptExact: freshTranscript.equals(expectedTranscript),
    tamperedCommitmentRejected,
    deterministicBinaryRequiredForTranscriptParity: false,
  },
  independence: {
    implementationIndependentReproductionComplete: errors.length === 0,
    languageIndependentReproductionComplete: errors.length === 0,
    authorIndependentReproductionComplete: false,
    unrelatedThirdPartyReproductionComplete: false,
  },
  forbidden,
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(paths.evidence), {recursive: true});
  writeFileSync(paths.evidence, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
