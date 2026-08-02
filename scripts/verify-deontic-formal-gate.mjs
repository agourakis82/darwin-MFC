import {createHash} from 'node:crypto';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal',
);
const vectorsPath = resolve(
  formalDir,
  'vectors/deontic-transport-formal-vectors.v1.json',
);
const evidencePath = resolve(formalDir, 'evidence/execution-evidence.v1.json');
const receiptPath = resolve(formalDir, 'formal-gate.receipt.v0.1.json');
const sourceCounterexamplesPath = resolve(
  repoRoot,
  'docs/research/deontic-transportability/counterexamples-v0.1.json',
);
const leanSourcePath = resolve(formalDir, 'lean4/DeonticTransport.lean');
const leanAuditPath = resolve(formalDir, 'lean4/DeonticTransportAudit.lean');
const sounioSourcePath = resolve(formalDir, 'sounio/deontic_transport.sio');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function sha256File(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function dot(outcomes, weights) {
  return outcomes.reduce((total, outcome, index) => total + outcome * weights[index], 0);
}

function choose(scoreA, scoreB, feasibleMask) {
  if (feasibleMask === 0) return 0;
  if (feasibleMask === 1) return 1;
  if (feasibleMask === 2) return 2;
  if (scoreA > scoreB) return 1;
  if (scoreB > scoreA) return 2;
  return 3;
}

function containsA(mask) {
  return mask === 1 || mask === 3;
}

function containsB(mask) {
  return mask === 2 || mask === 3;
}

function unionMasks(left, right) {
  return (containsA(left) || containsA(right) ? 1 : 0) +
    (containsB(left) || containsB(right) ? 2 : 0);
}

function intersectMasks(left, right) {
  return (containsA(left) && containsA(right) ? 1 : 0) +
    (containsB(left) && containsB(right) ? 2 : 0);
}

function classify(identified, core) {
  if (identified === 0) return 0;
  if (identified === 1 && core === 1) return 1;
  if (identified === 2 && core === 2) return 2;
  return 3;
}

const vectors = readJson(vectorsPath);
const evidence = readJson(evidencePath);
const counterexamples = readJson(sourceCounterexamplesPath);
const receipt = readJson(receiptPath);
const leanSource = readFileSync(leanSourcePath, 'utf8');
const leanAudit = readFileSync(leanAuditPath, 'utf8');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

check(
  vectors.schema === 'darwin.deontic-transport-formal-vectors.v1',
  'vectors: unexpected schema',
);
check(vectors.status === 'ABSTRACT_RESEARCH_ONLY', 'vectors: invalid status');
check(vectors.clinicalDisposition === 'REFUSE', 'vectors: must remain REFUSE');
check(vectors.clinicalUseAllowed === false, 'vectors: clinical use must be false');
check(vectors.productionAuthorized === false, 'vectors: production must be false');
check(vectors.noveltyEstablished === false, 'vectors: novelty must not be claimed');
check(vectors.arithmetic === 'SIGNED_INTEGER_DOT_PRODUCT', 'vectors: invalid arithmetic');
check(vectors.vectors?.length === 4, 'vectors: expected exactly four vectors');

const sourceCounterexamples = new Map(
  (counterexamples.cases ?? []).map((fixture) => [fixture.id, fixture]),
);
const theoremByVector = {
  'DT-001': 'dt001_value_shift',
  'DT-002': 'dt002_feasibility_shift',
  'DT-003': 'dt003_equity_shift',
  'DT-004': 'dt004_authority_boundary',
};
const computed = [];

for (const vector of vectors.vectors ?? []) {
  const source = sourceCounterexamples.get(vector.id);
  check(Boolean(source), `${vector.id}: missing source counterexample`);
  check(vector.evidenceSha256 === source?.evidenceSha256, `${vector.id}: evidence hash drift`);
  check(
    sameJson(vector.evidence.actionA, Object.values(source?.outcomeVectorByAction?.A ?? {})),
    `${vector.id}: action A evidence drift`,
  );
  check(
    sameJson(vector.evidence.actionB, Object.values(source?.outcomeVectorByAction?.B ?? {})),
    `${vector.id}: action B evidence drift`,
  );
  check(vector.contexts?.length === 2, `${vector.id}: expected two contexts`);
  check(
    vector.contexts?.[0]?.authority !== vector.contexts?.[1]?.authority,
    `${vector.id}: authority ids must remain distinct`,
  );

  const scores = (vector.contexts ?? []).map((context) => [
    dot(vector.evidence.actionA, context.weights),
    dot(vector.evidence.actionB, context.weights),
  ]);
  const decisions = (vector.contexts ?? []).map((context, index) =>
    choose(scores[index][0], scores[index][1], context.feasibleMask),
  );
  const identifiedSet = unionMasks(decisions[0], decisions[1]);
  const robustCore = intersectMasks(decisions[0], decisions[1]);
  const state = classify(identifiedSet, robustCore);

  check(sameJson(scores, vector.expected.scores), `${vector.id}: score mismatch`);
  check(sameJson(decisions, vector.expected.decisions), `${vector.id}: decision mismatch`);
  check(identifiedSet === vector.expected.identifiedSet, `${vector.id}: identified set mismatch`);
  check(robustCore === vector.expected.robustCore, `${vector.id}: robust core mismatch`);
  check(state === vector.expected.state, `${vector.id}: state mismatch`);
  check(
    leanSource.includes(`theorem ${theoremByVector[vector.id]}`),
    `${vector.id}: Lean witness theorem missing`,
  );

  computed.push({
    id: vector.id,
    scores,
    decisions,
    identifiedSet,
    robustCore,
    state,
  });
}

const expectedStdoutLines = computed.flatMap((fixture) => [
  `CASE ${fixture.id}`,
  String(fixture.decisions[0]),
  String(fixture.decisions[1]),
  String(fixture.identifiedSet),
  String(fixture.robustCore),
  String(fixture.state),
]);
expectedStdoutLines.push('ALL PASS');

check(
  evidence.schema === 'darwin.deontic-transport-formal-execution-evidence.v1',
  'evidence: unexpected schema',
);
check(evidence.clinicalDisposition === 'REFUSE', 'evidence: must remain REFUSE');
check(evidence.clinicalUseAllowed === false, 'evidence: clinical use must be false');
check(evidence.productionAuthorized === false, 'evidence: production must be false');
check(evidence.noveltyEstablished === false, 'evidence: novelty must not be claimed');
check(evidence.executionEnvironment?.repositoryClean === false, 'evidence: dirty repo hidden');
check(
  evidence.executionEnvironment?.workspaceModifiedByGate === false,
  'evidence: shared workspace mutation claimed',
);

check(evidence.sounio?.check?.exitCode === 0, 'Sounio: check did not pass');
check(evidence.sounio?.compile?.exitCode === 0, 'Sounio: native compile did not pass');
check(evidence.sounio?.directExecution?.exitCode === 0, 'Sounio: direct ELF run did not pass');
check(
  sameJson(evidence.sounio?.directExecution?.stdoutLines, expectedStdoutLines),
  'Sounio: captured output does not match formal vectors',
);
check(
  evidence.sounio?.source?.sha256 === sha256File(sounioSourcePath),
  'Sounio: local source hash mismatch',
);
check(
  evidence.sounio?.source?.sha256 === evidence.sounio?.source?.remoteCopySha256,
  'Sounio: remote source copy mismatch',
);
check(
  evidence.sounio?.compiler?.sourceFreshReceiptPresent === false,
  'Sounio: unexpected source-fresh receipt claim',
);
check(
  evidence.sounio?.compiler?.compilerReconciled === false,
  'Sounio: compiler reconciliation overclaimed',
);
check(evidence.sounio?.wasm?.attempted === true, 'Sounio: WASM backend was not attempted');
check(evidence.sounio?.wasm?.exitCode === 2, 'Sounio: unexpected WASM attempt result');
check(evidence.sounio?.wasm?.artifactProduced === false, 'Sounio: nonexistent WASM claimed');
check(
  evidence.sounio?.wasm?.nativeWasmParityEstablished === false,
  'Sounio: native/WASM parity overclaimed',
);

check(evidence.lean?.toolchain === readFileSync(resolve(formalDir, 'lean4/lean-toolchain'), 'utf8').trim(), 'Lean: toolchain pin mismatch');
check(evidence.lean?.build?.exitCode === 0, 'Lean: build did not pass');
check(evidence.lean?.axiomAudit?.exitCode === 0, 'Lean: axiom audit did not pass');
check(evidence.lean?.axiomAudit?.sorryAxPresent === false, 'Lean: sorryAx present');
check(
  evidence.lean?.axiomAudit?.nativeDecideAxiomPresent === false,
  'Lean: native_decide axiom present',
);
check(evidence.lean?.axiomAudit?.newAxiomsDeclared === false, 'Lean: new axiom declared');

for (const sourceCopy of evidence.lean?.sourceCopies ?? []) {
  const path = resolve(repoRoot, sourceCopy.path);
  check(sha256File(path) === sourceCopy.sha256, `${sourceCopy.path}: local Lean hash mismatch`);
  check(sourceCopy.sha256 === sourceCopy.remoteCopySha256, `${sourceCopy.path}: remote Lean copy mismatch`);
}

const expectedAxiomDependencies = new Map([
  ['noEvidenceOnlyOperator', []],
  ['infeasibleA_ne_onlyA', ['propext']],
  ['infeasibleB_ne_onlyB', ['propext']],
  ['disagreement_set_identified', ['propext']],
  ['robustDominanceA', ['propext']],
  ['robustDominanceB', ['propext']],
  ['dt001_value_shift', ['propext']],
  ['dt002_feasibility_shift', ['propext']],
  ['dt003_equity_shift', ['propext']],
  ['dt004_authority_boundary', ['propext']],
]);
for (const [theorem, dependencies] of expectedAxiomDependencies) {
  check(
    sameJson(evidence.lean?.axiomAudit?.dependencies?.[theorem], dependencies),
    `Lean: unexpected axiom dependencies for ${theorem}`,
  );
  check(leanAudit.includes(`#print axioms ${theorem}`), `Lean: audit missing ${theorem}`);
}

const leanCodeWithoutComments = leanSource
  .replace(/\/-[\s\S]*?-\//g, '')
  .replace(/--.*$/gm, '');
check(
  !/^\s*(axiom|opaque|sorry|admit)\b/m.test(leanCodeWithoutComments),
  'Lean: forbidden declaration or proof escape present',
);
check(!/\bnative_decide\b/.test(leanCodeWithoutComments), 'Lean: native_decide reintroduced');
check(
  leanSource.includes('theorem noEvidenceOnlyOperator'),
  'Lean: evidence-only impossibility theorem missing',
);
check(leanSource.includes('theorem robustDominanceA'), 'Lean: robust-dominance theorem missing');
check(leanSource.includes('theorem robustDominanceB'), 'Lean: robust-dominance theorem missing');

check(evidence.verdict?.leanBuildVerified === true, 'verdict: Lean build not verified');
check(evidence.verdict?.leanAxiomAuditVerified === true, 'verdict: Lean audit not verified');
check(evidence.verdict?.sounioNativeExecutionVerified === true, 'verdict: Sounio native not verified');
check(evidence.verdict?.leanSounioVectorAgreement === true, 'verdict: language agreement missing');
check(evidence.verdict?.compilerReconciled === false, 'verdict: compiler reconciliation overclaimed');
check(
  evidence.verdict?.nativeWasmParityEstablished === false,
  'verdict: native/WASM parity overclaimed',
);
check(evidence.verdict?.clinicalDisposition === 'REFUSE', 'verdict: must remain REFUSE');
check(evidence.verdict?.productionAuthorized === false, 'verdict: production must remain false');

check(
  receipt.schema === 'darwin.deontic-transport-formal-gate-receipt.v0.1',
  'receipt: unexpected schema',
);
check(receipt.clinicalDisposition === 'REFUSE', 'receipt: must remain REFUSE');
check(receipt.clinicalUseAllowed === false, 'receipt: clinical use must be false');
check(receipt.productionAuthorized === false, 'receipt: production must be false');
check(receipt.noveltyEstablished === false, 'receipt: novelty must not be claimed');
check(receipt.compilerReconciled === false, 'receipt: compiler reconciliation overclaimed');
check(receipt.nativeWasmParityEstablished === false, 'receipt: native/WASM parity overclaimed');
check(receipt.signed === false, 'receipt: unexpected signature claim');

const expectedArtifactPaths = new Set([
  'docs/research/deontic-transportability/formal/README.md',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransport.lean',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransportAudit.lean',
  'docs/research/deontic-transportability/formal/lean4/lakefile.lean',
  'docs/research/deontic-transportability/formal/lean4/lean-toolchain',
  'docs/research/deontic-transportability/formal/sounio/deontic_transport.sio',
  'docs/research/deontic-transportability/formal/vectors/deontic-transport-formal-vectors.v1.json',
  'docs/research/deontic-transportability/formal/evidence/execution-evidence.v1.json',
  'scripts/verify-deontic-formal-gate.mjs',
]);
const receivedArtifactPaths = new Set();

for (const artifact of receipt.artifacts ?? []) {
  check(expectedArtifactPaths.has(artifact.path), `${artifact.path}: unexpected receipt artifact`);
  check(!receivedArtifactPaths.has(artifact.path), `${artifact.path}: duplicate receipt artifact`);
  receivedArtifactPaths.add(artifact.path);
  const path = resolve(repoRoot, artifact.path);
  check(sha256File(path) === artifact.sha256, `${artifact.path}: SHA-256 mismatch`);
  check(statSync(path).size === artifact.bytes, `${artifact.path}: byte-size mismatch`);
}
check(
  sameJson([...receivedArtifactPaths].sort(), [...expectedArtifactPaths].sort()),
  'receipt: artifact set mismatch',
);

const result = {
  schema: 'darwin.deontic-transport-formal-gate-verification.v0.1',
  vectorSetId: vectors.vectorSetId,
  vectorCount: computed.length,
  allVectorsPartiallyIdentified: computed.every(
    (fixture) => fixture.identifiedSet === 3 && fixture.robustCore === 0 && fixture.state === 3,
  ),
  lean: {
    buildVerified: evidence.verdict?.leanBuildVerified === true,
    axiomAuditVerified: evidence.verdict?.leanAxiomAuditVerified === true,
    evidenceOnlyTheoremAxiomFree:
      sameJson(evidence.lean?.axiomAudit?.dependencies?.noEvidenceOnlyOperator, []),
    sorryAxPresent: evidence.lean?.axiomAudit?.sorryAxPresent,
    nativeDecideAxiomPresent: evidence.lean?.axiomAudit?.nativeDecideAxiomPresent,
  },
  sounio: {
    checkVerified: evidence.verdict?.sounioCheckVerified === true,
    nativeExecutionVerified: evidence.verdict?.sounioNativeExecutionVerified === true,
    compilerReconciled: false,
    wasmAttempted: true,
    nativeWasmParityEstablished: false,
  },
  leanSounioVectorAgreement: evidence.verdict?.leanSounioVectorAgreement === true,
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  noveltyEstablished: false,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;

