import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const leanDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal/lean4');
const theoremPath = resolve(leanDir, 'NoHiddenGaugeFixingV12.lean');
const auditPath = resolve(leanDir, 'NoHiddenGaugeFixingV12Audit.lean');
const evidencePath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/evidence/lean-verification.v1.2.json',
);
const writeEvidence = process.argv.includes('--write-evidence');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const run = (command, arguments_) => spawnSync(command, arguments_, {
  cwd: leanDir,
  encoding: 'utf8',
  maxBuffer: 8 * 1024 * 1024,
  env: process.env,
});

const buildOutput = resolve(
  leanDir,
  '.lake/build/lib/lean/NoHiddenGaugeFixingV12.olean',
);
mkdirSync(dirname(buildOutput), {recursive: true});
const build = run('lake', [
  'env',
  'lean',
  '-o',
  buildOutput,
  'NoHiddenGaugeFixingV12.lean',
]);
check(!build.error, `Lean build could not start: ${build.error?.message ?? ''}`);
check(build.status === 0, `Lean build failed: ${(build.stderr || build.stdout).trim()}`);
const audit = run('lake', ['env', 'lean', 'NoHiddenGaugeFixingV12Audit.lean']);
check(!audit.error, `Lean audit could not start: ${audit.error?.message ?? ''}`);
check(audit.status === 0, `Lean audit failed: ${(audit.stderr || audit.stdout).trim()}`);
const auditOutput = `${audit.stdout ?? ''}${audit.stderr ?? ''}`;
const versionRun = run('lean', ['--version']);
check(versionRun.status === 0, 'Lean version command failed');

const expectedAxioms = {
  'Darwin.NoHiddenGaugeFixingV12.observedValueRestrictsAssignments': ['propext'],
  'Darwin.NoHiddenGaugeFixingV12.diagonalFlipCannotPreserveObservedValue': ['propext'],
  'Darwin.NoHiddenGaugeFixingV12.identitySectionDeterminedByAnchorA': ['Quot.sound'],
  'Darwin.NoHiddenGaugeFixingV12.identityAnchorAHasUniqueSection': ['Quot.sound'],
  'Darwin.NoHiddenGaugeFixingV12.noAnchorRetainsTwoIdentitySections': ['propext'],
  'Darwin.NoHiddenGaugeFixingV12.authorizationImpliesTrusted': ['propext'],
  'Darwin.NoHiddenGaugeFixingV12.revokedReceiptCannotAuthorize': ['propext'],
  'Darwin.NoHiddenGaugeFixingV12.expiredReceiptCannotAuthorize': ['propext'],
  'Darwin.NoHiddenGaugeFixingV12.invalidSignatureCannotAuthorize': ['propext'],
  'Darwin.NoHiddenGaugeFixingV12.encodedIdentityAnchorAIsShapeValid': ['propext'],
  'Darwin.NoHiddenGaugeFixingV12.identityAnchorARefinesPackedKernelResult': [],
  'Darwin.NoHiddenGaugeFixingV12.identityAnchorAUniqueIsModelRelative': ['Quot.sound'],
};
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
    : (withAxioms?.[1] ?? '').split(',').map((value) => value.trim()).filter(Boolean);
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
};
for (const [name, count] of Object.entries(forbidden)) {
  check(count === 0, `Lean source contains forbidden ${name}`);
}
const allowedAxioms = new Set(['propext', 'Quot.sound']);
const onlyApprovedAxioms = Object.values(observedAxioms).flat()
  .every((axiom) => allowedAxioms.has(axiom));
check(onlyApprovedAxioms, 'Lean audit contains an unapproved axiom');

const result = {
  schema: 'darwin.no-hidden-gauge-fixing-lean-verification.v1.2',
  generatedAt: '2026-08-03T12:00:00.000Z',
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
    command: 'lake env lean -o <lake-build>/NoHiddenGaugeFixingV12.olean ' +
      'NoHiddenGaugeFixingV12.lean',
    exitCode: build.status,
    verified: build.status === 0,
  },
  audit: {
    command: 'lake env lean NoHiddenGaugeFixingV12Audit.lean',
    exitCode: audit.status,
    observedAxioms,
    allowedAxioms: [...allowedAxioms],
    onlyApprovedAxioms,
    forbidden,
  },
  refinement: {
    observedValueRestrictsSections: true,
    observationDestroysMovingGauge: true,
    identityAnchorYieldsUniqueModelSection: true,
    receiptRevocationRefusesEvaluation: true,
    receiptExpiryRefusesEvaluation: true,
    invalidSignatureRefusesEvaluation: true,
    identityFixturePackedResult: 278537,
    abstractRefinementEstablished: true,
    completeSounioOperationalSemanticsMechanized: false,
    emittedWasmSemanticsMechanized: false,
  },
  artifacts: [
    theoremPath,
    auditPath,
    resolve(leanDir, 'lakefile.lean'),
    resolve(leanDir, 'lake-manifest.json'),
    resolve(leanDir, 'lean-toolchain'),
  ].map((path) => ({
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
