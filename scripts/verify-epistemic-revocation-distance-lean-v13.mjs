import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const leanDir = resolve(
  repoRoot,
  'docs/research/epistemic-revocation-distance/formal/lean4',
);
const theoremPath = resolve(leanDir, 'EpistemicRevocationDistance.lean');
const auditPath = resolve(leanDir, 'EpistemicRevocationDistanceAudit.lean');
const evidencePath = resolve(
  repoRoot,
  'docs/research/epistemic-revocation-distance/formal/evidence/' +
    'lean-verification.v1.3.json',
);
const writeEvidence = process.argv.includes('--write-evidence');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256 = (path) =>
  createHash('sha256').update(readFileSync(path)).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const run = (command, arguments_) => spawnSync(command, arguments_, {
  cwd: leanDir,
  encoding: 'utf8',
  maxBuffer: 16 * 1024 * 1024,
  env: process.env,
});

const build = run('lake', ['build']);
check(!build.error, `Lean build could not start: ${build.error?.message ?? ''}`);
check(build.status === 0,
  `Lean build failed: ${(build.stderr || build.stdout).trim()}`);
const audit = run('lake', ['env', 'lean', 'EpistemicRevocationDistanceAudit.lean']);
check(!audit.error, `Lean audit could not start: ${audit.error?.message ?? ''}`);
check(audit.status === 0,
  `Lean audit failed: ${(audit.stderr || audit.stdout).trim()}`);
const versionRun = run('lean', ['--version']);
check(versionRun.status === 0, 'Lean version command failed');

const expectedAxioms = {
  'Darwin.EpistemicRevocationDistance.countWhere_mono_of_pointwise':
    ['propext', 'Quot.sound'],
  'Darwin.EpistemicRevocationDistance.blockers_restore': [],
  'Darwin.EpistemicRevocationDistance.restoration_cost_lower_bound':
    ['propext', 'Quot.sound'],
  'Darwin.EpistemicRevocationDistance.revocation_distance_le_blocker_cost':
    ['propext', 'Quot.sound'],
  'Darwin.EpistemicRevocationDistance.exists_exact_minimum_blocker': ['propext'],
  'Darwin.EpistemicRevocationDistance.smaller_than_distance_cannot_restore_bad':
    ['propext', 'Quot.sound'],
  'Darwin.EpistemicRevocationDistance.exists_exact_minimum_restoration_cut':
    ['propext'],
  'Darwin.EpistemicRevocationDistance.revocation_distance_is_exact':
    ['propext', 'Quot.sound'],
};
const auditOutput = `${audit.stdout ?? ''}${audit.stderr ?? ''}`;
const observedAxioms = {};
for (const [theorem, expected] of Object.entries(expectedAxioms)) {
  const escaped = theorem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const noAxioms = new RegExp(`'${escaped}' does not depend on any axioms`)
    .test(auditOutput);
  const withAxioms = auditOutput.match(
    new RegExp(`'${escaped}' depends on axioms: \\[([^\\]]*)\\]`),
  );
  const observed = noAxioms
    ? []
    : (withAxioms?.[1] ?? '').split(',').map((value) => value.trim())
      .filter(Boolean);
  observedAxioms[theorem] = observed;
  check(JSON.stringify(observed) === JSON.stringify(expected),
    `${theorem}: axiom audit drift (${JSON.stringify(observed)})`);
}

const source = readFileSync(theoremPath, 'utf8');
const forbidden = {
  sorry: (source.match(/\bsorry\b/g) ?? []).length,
  nativeDecide: (source.match(/\bnative_decide\b/g) ?? []).length,
  projectAxiomDeclarations: (source.match(/^\s*axiom\b/gm) ?? []).length,
  unsafeDeclarations: (source.match(/^\s*unsafe\b/gm) ?? []).length,
  noncomputableDeclarations: (source.match(/^\s*noncomputable\b/gm) ?? []).length,
};
for (const [name, count] of Object.entries(forbidden)) {
  check(count === 0, `Lean source contains forbidden ${name}`);
}
const allowedAxioms = new Set(['propext', 'Quot.sound']);
const onlyApprovedAxioms = Object.values(observedAxioms).flat()
  .every((axiom) => allowedAxioms.has(axiom));
check(onlyApprovedAxioms, 'Lean audit contains an unapproved axiom');

const artifactPaths = [
  theoremPath,
  auditPath,
  resolve(leanDir, 'lakefile.lean'),
  resolve(leanDir, 'lake-manifest.json'),
  resolve(leanDir, 'lean-toolchain'),
];
const result = {
  schema: 'darwin.epistemic-revocation-distance-lean-verification.v1.3',
  generatedAt: '2026-08-03T14:10:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  toolchain: {
    declaration: readFileSync(resolve(leanDir, 'lean-toolchain'), 'utf8').trim(),
    version: versionRun.stdout.trim(),
  },
  build: {
    command: 'lake build',
    exitCode: build.status,
    verified: build.status === 0,
  },
  audit: {
    command: 'lake env lean EpistemicRevocationDistanceAudit.lean',
    exitCode: audit.status,
    observedAxioms,
    allowedAxioms: [...allowedAxioms],
    onlyApprovedAxioms,
    forbidden,
  },
  theorem: {
    finiteRestorationLowerBoundEstablished: true,
    exactPerSymmetryBlockerCutEstablished: true,
    globalMinimumRestorationCutExists: true,
    globalRevocationDistanceExact: true,
    duplicateFreeSetSemanticsRequired: false,
    completeSounioOperationalSemanticsMechanized: false,
    emittedWasmSemanticsMechanized: false,
  },
  artifacts: artifactPaths.map((path) => ({
    path: fromRoot(path),
    sha256: sha256(path),
    bytes: readFileSync(path).length,
  })),
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
