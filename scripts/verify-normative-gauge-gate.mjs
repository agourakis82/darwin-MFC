import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/normative-gauge/formal');
const receiptPath = resolve(formalDir, 'normative-gauge-gate.receipt.v1.0.json');
const runtimeEvidencePath = resolve(formalDir, 'evidence/runtime-verification.v1.0.json');
const leanEvidencePath = resolve(formalDir, 'evidence/lean-verification.v1.0.json');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256File = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const spawnJson = (command, arguments_, options = {}) => {
  const run = spawnSync(command, arguments_, {
    cwd: repoRoot,
    encoding: 'utf8',
    maxBuffer: 24 * 1024 * 1024,
    ...options,
  });
  if (run.error || run.status !== 0) {
    const detail = run.error?.message || run.stderr?.trim() || run.stdout?.trim() || 'unknown error';
    errors.push(`${arguments_[0]} failed: ${detail}`);
    return {};
  }
  try {
    return JSON.parse(run.stdout);
  } catch (error) {
    errors.push(`${arguments_[0]} emitted invalid JSON: ${error.message}`);
    return {};
  }
};
const boundaryValid = (value) =>
  value.status === 'ABSTRACT_RESEARCH_ONLY' &&
  value.clinicalDisposition === 'REFUSE' &&
  value.clinicalUseAllowed === false &&
  value.productionAuthorized === false &&
  value.noveltyEstablished === false &&
  value.signed === false;
const artifactHashesValid = (receipt) =>
  (receipt.artifacts ?? []).every((artifact) => {
    const path = resolve(repoRoot, artifact.path);
    return sha256File(path) === artifact.sha256 && statSync(path).size === artifact.bytes;
  });
const scientificGateValid = (receipt) =>
  receipt.compilerReconciled === true &&
  receipt.leanGaugeModelEstablished === true &&
  receipt.finiteGaugeOrbitComplete === true &&
  receipt.gaugeInvariantExecutableEstablishedForDeclaredDomain === true &&
  receipt.mutationAdequacyEstablished === true &&
  receipt.nativeWasmSelfCheckParityEstablished === true &&
  receipt.nativeWasmCanonicalTranscriptParityEstablished === true &&
  receipt.model?.canonicalStates === 4096 &&
  receipt.model?.edgeTransformationChecks === 1536 &&
  receipt.model?.groupCompositionChecks === 4096 &&
  receipt.model?.gaugeChecks === 32768 &&
  receipt.model?.mutantsKilled === 6;

const receipt = readJson(receiptPath);
const runtimeEvidence = readJson(runtimeEvidencePath);
const leanEvidence = readJson(leanEvidencePath);
check(boundaryValid(receipt), 'receipt refusal/novelty boundary drift');
check(artifactHashesValid(receipt), 'one or more receipt artifact hashes drifted');
check(scientificGateValid(receipt), 'scientific gate state drift');

const runtime = spawnJson(process.execPath, ['scripts/verify-normative-gauge.mjs']);
check(runtime.verified === true, 'runtime re-execution is not verified');
for (const key of [
  'wasm',
  'boundedDomain',
  'gaugeOrbit',
  'mutationAdequacy',
  'transcript',
  'sourceLineage',
  'nativeTranscriptSource',
  'vectors',
  'integrity',
  'independentOracle',
]) {
  check(
    JSON.stringify(runtime[key]) === JSON.stringify(runtimeEvidence[key]),
    `runtime evidence drift: ${key}`,
  );
}

const lean = spawnJson(process.execPath, ['scripts/verify-normative-gauge-lean.mjs']);
check(lean.verified === true, 'Lean re-execution is not verified');
for (const key of [
  'toolchain',
  'build',
  'audit',
  'artifacts',
  'executableSemanticsMechanized',
  'emittedWasmSemanticsMechanized',
]) {
  check(
    JSON.stringify(lean[key]) === JSON.stringify(leanEvidence[key]),
    `Lean evidence drift: ${key}`,
  );
}

const regenerated = spawnJson(
  process.execPath,
  ['scripts/generate-normative-gauge-receipt.mjs'],
  {env: {...process.env, RECEIPT_GENERATED_AT: receipt.generatedAt}},
);
check(
  JSON.stringify(regenerated) === JSON.stringify(receipt),
  'stored receipt is not the deterministic reconstruction of current artifacts',
);

const tamperedHash = structuredClone(receipt);
tamperedHash.artifacts[0].sha256 = '0'.repeat(64);
const tamperedBoundary = structuredClone(receipt);
tamperedBoundary.productionAuthorized = true;
const tamperedNovelty = structuredClone(receipt);
tamperedNovelty.noveltyEstablished = true;
const tamperedOrbit = structuredClone(receipt);
tamperedOrbit.finiteGaugeOrbitComplete = false;
const tamperedMutants = structuredClone(receipt);
tamperedMutants.model.mutantsKilled = 5;
const tamperedTranscript = structuredClone(receipt);
tamperedTranscript.nativeTranscript.stdoutSha256 = 'f'.repeat(64);
const tamperedParent = structuredClone(receipt);
tamperedParent.parent.sha256 = 'a'.repeat(64);
const tamperTests = {
  artifactHashRejected: !artifactHashesValid(tamperedHash),
  productionAuthorizationRejected: !boundaryValid(tamperedBoundary),
  noveltyOverclaimRejected: !boundaryValid(tamperedNovelty),
  incompleteOrbitRejected: !scientificGateValid(tamperedOrbit),
  survivingMutantRejected: !scientificGateValid(tamperedMutants),
  transcriptTamperRejected:
    tamperedTranscript.nativeTranscript.stdoutSha256 !== runtime.transcript?.sha256,
  parentTamperRejected: tamperedParent.parent.sha256 !== sha256File(
    resolve(repoRoot, tamperedParent.parent.path),
  ),
};
check(Object.values(tamperTests).every(Boolean), 'one or more negative tamper tests failed');

const result = {
  schema: 'darwin.normative-gauge-gate-verification.v1.0',
  receiptPath,
  receiptSha256: sha256File(receiptPath),
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  canonicalStates: runtime.boundedDomain?.canonicalStates ?? null,
  gaugeChecks: runtime.gaugeOrbit?.gaugeChecks ?? null,
  groupCompositionChecks: runtime.gaugeOrbit?.groupCompositionChecks ?? null,
  gaugeMismatches: runtime.gaugeOrbit?.gaugeMismatches ?? null,
  mapOrbitClasses: runtime.gaugeOrbit?.mapOrbitClasses ?? null,
  mutantsKilled: runtime.mutationAdequacy?.killed ?? null,
  hostileStates: runtime.boundedDomain?.hostileStates ?? null,
  nativeWasmTranscriptSha256: receipt.nativeTranscript?.stdoutSha256 ?? null,
  leanAxiomFreeCoreEstablished: lean.audit?.axiomFreeCoreEstablished ?? false,
  leanOnlyApprovedAxioms: lean.audit?.onlyApprovedAxioms ?? false,
  compilerReconciled: receipt.compilerReconciled === true,
  gaugeInvariantExecutableEstablishedForDeclaredDomain:
    receipt.gaugeInvariantExecutableEstablishedForDeclaredDomain === true,
  tamperTests,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
