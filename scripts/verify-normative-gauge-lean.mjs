import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const leanDir = resolve(repoRoot, 'docs/research/normative-gauge/formal/lean4');
const theoremPath = resolve(leanDir, 'NormativeGauge.lean');
const auditPath = resolve(leanDir, 'NormativeGaugeAudit.lean');
const lakefilePath = resolve(leanDir, 'lakefile.lean');
const manifestPath = resolve(leanDir, 'lake-manifest.json');
const toolchainPath = resolve(leanDir, 'lean-toolchain');
const evidencePath = resolve(
  repoRoot,
  'docs/research/normative-gauge/formal/evidence/lean-verification.v1.0.json',
);
const writeEvidence = process.argv.slice(2).includes('--write-evidence');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
const pathFromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const run = (command, arguments_) => spawnSync(command, arguments_, {
  cwd: leanDir,
  encoding: 'utf8',
  maxBuffer: 4 * 1024 * 1024,
});

const build = run('lake', ['build']);
check(!build.error, `Lean build could not start: ${build.error?.message ?? ''}`);
check(build.status === 0, `Lean build failed: ${(build.stderr || build.stdout).trim()}`);

const audit = run('lake', ['env', 'lean', 'NormativeGaugeAudit.lean']);
check(!audit.error, `Lean axiom audit could not start: ${audit.error?.message ?? ''}`);
check(audit.status === 0, `Lean axiom audit failed: ${(audit.stderr || audit.stdout).trim()}`);
const auditOutput = `${audit.stdout ?? ''}${audit.stderr ?? ''}`;

const versionRun = run('lean', ['--version']);
check(!versionRun.error, `Lean version command could not start: ${versionRun.error?.message ?? ''}`);
check(versionRun.status === 0, 'Lean version command failed');
const version = versionRun.stdout.trim();

const expectedAxioms = {
  'Darwin.NormativeGauge.globalSectionIffHolonomyFixedPoint': [],
  'Darwin.NormativeGauge.transformGlobalSection': [],
  'Darwin.NormativeGauge.untransformGlobalSection': [],
  'Darwin.NormativeGauge.globalSectionGaugeInvariant': [],
  'Darwin.NormativeGauge.holonomyGaugeConjugacy': ['propext'],
  'Darwin.NormativeGauge.holonomyFixedPointGaugeInvariant': ['propext'],
  'Darwin.NormativeGauge.zeroErrorGaugeCovariant': [],
  'Darwin.NormativeGauge.gaugeTransformedNoGlobalForcesAbstention': [],
  'Darwin.NormativeGauge.seededGaugeTransformedNoGlobalForcesAbstention': [],
  'Darwin.NormativeGauge.coordinateSensitiveAnalyzer_hasGaugeAnomaly': ['propext'],
  'Darwin.NormativeGauge.coordinateSensitiveAnalyzer_notGaugeInvariant': ['propext'],
};
const observedAxioms = {};
for (const [theorem, axioms] of Object.entries(expectedAxioms)) {
  const escaped = theorem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const noAxioms = new RegExp(`'${escaped}' does not depend on any axioms`).test(auditOutput);
  const withAxioms = auditOutput.match(
    new RegExp(`'${escaped}' depends on axioms: \\[([^\\]]*)\\]`),
  );
  const observed = noAxioms
    ? []
    : (withAxioms?.[1] ?? '').split(',').map((value) => value.trim()).filter(Boolean);
  observedAxioms[theorem] = observed;
  check(
    JSON.stringify(observed) === JSON.stringify(axioms),
    `${theorem}: axiom audit drift (${JSON.stringify(observed)})`,
  );
}

const theoremSource = readFileSync(theoremPath, 'utf8');
const forbidden = {
  sorry: (theoremSource.match(/\bsorry\b/g) ?? []).length,
  nativeDecide: (theoremSource.match(/\bnative_decide\b/g) ?? []).length,
  projectAxiomDeclarations: (theoremSource.match(/^\s*axiom\b/gm) ?? []).length,
  unsafeDeclarations: (theoremSource.match(/^\s*unsafe\b/gm) ?? []).length,
};
check(forbidden.sorry === 0, 'Lean source contains sorry');
check(forbidden.nativeDecide === 0, 'Lean source contains native_decide');
check(forbidden.projectAxiomDeclarations === 0, 'Lean source declares project axioms');
check(forbidden.unsafeDeclarations === 0, 'Lean source contains unsafe declarations');

const allowedAxioms = new Set(['propext']);
const onlyApprovedAxioms = Object.values(observedAxioms)
  .flat()
  .every((axiom) => allowedAxioms.has(axiom));
check(onlyApprovedAxioms, 'Lean audit contains an unapproved axiom');

const generatedAt = process.env.SOURCE_DATE_EPOCH
  ? new Date(Number(process.env.SOURCE_DATE_EPOCH) * 1000).toISOString()
  : new Date().toISOString();
const axiomFreeCore = [
  'Darwin.NormativeGauge.globalSectionIffHolonomyFixedPoint',
  'Darwin.NormativeGauge.transformGlobalSection',
  'Darwin.NormativeGauge.untransformGlobalSection',
  'Darwin.NormativeGauge.globalSectionGaugeInvariant',
  'Darwin.NormativeGauge.zeroErrorGaugeCovariant',
  'Darwin.NormativeGauge.gaugeTransformedNoGlobalForcesAbstention',
  'Darwin.NormativeGauge.seededGaugeTransformedNoGlobalForcesAbstention',
];
const result = {
  schema: 'darwin.normative-gauge-lean-verification.v1.0',
  generatedAt,
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  toolchain: {
    declaration: readFileSync(toolchainPath, 'utf8').trim(),
    version,
  },
  build: {
    command: 'lake build',
    exitCode: build.status,
    verified: build.status === 0,
  },
  audit: {
    command: 'lake env lean NormativeGaugeAudit.lean',
    exitCode: audit.status,
    observedAxioms,
    allowedAxioms: [...allowedAxioms],
    onlyApprovedAxioms,
    axiomFreeCoreEstablished: axiomFreeCore.every(
      (name) => observedAxioms[name]?.length === 0,
    ),
    forbidden,
  },
  artifacts: [theoremPath, auditPath, lakefilePath, manifestPath, toolchainPath].map((path) => ({
    path: pathFromRoot(path),
    sha256: sha256(path),
    bytes: readFileSync(path).length,
  })),
  executableSemanticsMechanized: false,
  emittedWasmSemanticsMechanized: false,
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`);
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
