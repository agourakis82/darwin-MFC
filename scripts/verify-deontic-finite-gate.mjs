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
  'vectors/deontic-transport-finite-vectors.v2.json',
);
const evidencePath = resolve(
  formalDir,
  'evidence/finite-execution-evidence.v2.json',
);
const receiptPath = resolve(formalDir, 'formal-finite-gate.receipt.v0.2.json');
const parentReceiptPath = resolve(formalDir, 'formal-gate.receipt.v0.1.json');
const baseLeanPath = resolve(formalDir, 'lean4/DeonticTransport.lean');
const finiteLeanPath = resolve(formalDir, 'lean4/DeonticTransportFinite.lean');
const auditPath = resolve(formalDir, 'lean4/DeonticTransportFiniteAudit.lean');
const sounioPath = resolve(formalDir, 'sounio/deontic_transport_finite.sio');
const wasmGapPath = resolve(formalDir, 'wasm/wasm-backend-gap-v0.1.md');
const extensionNotePath = resolve(formalDir, 'finite-extension-v0.2.md');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function sha256File(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
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

function foldBounded(decisions, count, initial, operation) {
  if (count < 0 || count > 8) return -1;
  let result = initial;
  for (let index = 0; index < count; index += 1) {
    result = operation(result, decisions[index] ?? 0);
  }
  return result;
}

const vectors = readJson(vectorsPath);
const evidence = readJson(evidencePath);
const receipt = readJson(receiptPath);
const parentReceipt = readJson(parentReceiptPath);
const finiteLean = readFileSync(finiteLeanPath, 'utf8');
const audit = readFileSync(auditPath, 'utf8');
const sounio = readFileSync(sounioPath, 'utf8');
const wasmGap = readFileSync(wasmGapPath, 'utf8');
const extensionNote = readFileSync(extensionNotePath, 'utf8');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

check(
  vectors.schema === 'darwin.deontic-transport-finite-vectors.v2',
  'vectors: unexpected schema',
);
check(vectors.status === 'ABSTRACT_RESEARCH_ONLY', 'vectors: invalid status');
check(vectors.clinicalDisposition === 'REFUSE', 'vectors: must remain REFUSE');
check(vectors.clinicalUseAllowed === false, 'vectors: clinical use must be false');
check(vectors.productionAuthorized === false, 'vectors: production must be false');
check(vectors.noveltyEstablished === false, 'vectors: novelty must not be claimed');
check(vectors.maximumExecutableFamilySize === 8, 'vectors: executable bound drift');
check(vectors.families?.length === 4, 'vectors: expected four finite families');

const expectedIds = [
  'DT-FIN-001',
  'DT-FIN-002',
  'DT-FIN-003',
  'DT-FIN-004',
];
const computed = [];
for (const [index, family] of (vectors.families ?? []).entries()) {
  check(family.id === expectedIds[index], `vectors: unexpected family ${family.id}`);
  check(family.decisions.length <= 8, `${family.id}: executable bound exceeded`);
  check(
    family.decisions.every((decision) => Number.isInteger(decision) && decision >= 0 && decision <= 3),
    `${family.id}: invalid decision mask`,
  );
  const identifiedSet = foldBounded(
    family.decisions,
    family.decisions.length,
    0,
    unionMasks,
  );
  const robustCore = foldBounded(
    family.decisions,
    family.decisions.length,
    3,
    intersectMasks,
  );
  const state = classify(identifiedSet, robustCore);
  check(identifiedSet === family.expected.identifiedSet, `${family.id}: identified-set mismatch`);
  check(robustCore === family.expected.robustCore, `${family.id}: robust-core mismatch`);
  check(state === family.expected.state, `${family.id}: state mismatch`);
  computed.push({
    id: family.id,
    count: family.decisions.length,
    identifiedSet,
    robustCore,
    state,
  });
}

for (const count of vectors.negativeCounts ?? []) {
  check(
    foldBounded(new Array(8).fill(0), count, 0, unionMasks) === -1,
    `negative gate: union count ${count} was accepted`,
  );
  check(
    foldBounded(new Array(8).fill(0), count, 3, intersectMasks) === -1,
    `negative gate: intersection count ${count} was accepted`,
  );
}

const expectedStdoutLines = computed.flatMap((family) => [
  `FAMILY ${family.id}`,
  String(family.count),
  String(family.identifiedSet),
  String(family.robustCore),
  String(family.state),
]);
expectedStdoutLines.push('ALL PASS');

check(
  evidence.schema === 'darwin.deontic-transport-finite-execution-evidence.v2',
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

check(
  parentReceipt.schema === 'darwin.deontic-transport-formal-gate-receipt.v0.1',
  'parent: unexpected schema',
);
check(parentReceipt.clinicalDisposition === 'REFUSE', 'parent: clinical state drift');
check(parentReceipt.productionAuthorized === false, 'parent: production state drift');
check(
  evidence.parentGate?.sha256 === sha256File(parentReceiptPath),
  'parent: evidence hash mismatch',
);
check(evidence.parentGate?.verifiedBeforeExtension === true, 'parent: unverified extension base');

check(evidence.sounio?.check?.exitCode === 0, 'Sounio: check did not pass');
check(evidence.sounio?.compile?.exitCode === 0, 'Sounio: native compile did not pass');
check(evidence.sounio?.directExecution?.exitCode === 0, 'Sounio: native run did not pass');
check(
  sameJson(evidence.sounio?.directExecution?.stdoutLines, expectedStdoutLines),
  'Sounio: captured output does not match finite vectors',
);
check(
  evidence.sounio?.source?.sha256 === sha256File(sounioPath),
  'Sounio: local source hash mismatch',
);
check(
  evidence.sounio?.source?.sha256 === evidence.sounio?.source?.remoteCopySha256,
  'Sounio: remote source copy mismatch',
);
check(
  evidence.sounio?.compiler?.sourceFreshReceiptPresent === false,
  'Sounio: unexpected source-fresh claim',
);
check(
  evidence.sounio?.compiler?.sourceArtifactIdentityEstablished === false,
  'Sounio: source/artifact identity overclaimed',
);
check(
  evidence.sounio?.compiler?.compilerReconciled === false,
  'Sounio: compiler reconciliation overclaimed',
);
check(evidence.sounio?.wasm?.attempted === true, 'Sounio: WASM was not attempted');
check(evidence.sounio?.wasm?.publicCliAttempt?.exitCode === 2, 'Sounio: public WASM exit drift');
check(evidence.sounio?.wasm?.rawCompilerAttempt?.exitCode === 255, 'Sounio: raw WASM exit drift');
check(evidence.sounio?.wasm?.artifactProduced === false, 'Sounio: nonexistent WASM claimed');
check(
  evidence.sounio?.wasm?.publicCliAttempt?.artifactProduced === false &&
    evidence.sounio?.wasm?.rawCompilerAttempt?.artifactProduced === false,
  'Sounio: a failed WASM attempt claims an artifact',
);
check(
  evidence.sounio?.wasm?.nativeWasmParityEstablished === false,
  'Sounio: native/WASM parity overclaimed',
);
check(
  wasmGap.includes('WASM backend is not yet split into module_native_driver'),
  'WASM: driver boundary is not documented',
);
check(
  extensionNote.includes('arbitrary finite list') &&
    extensionNote.includes('Clinical disposition: **REFUSE**'),
  'extension note: formal scope or refusal boundary missing',
);

check(evidence.lean?.toolchain === readFileSync(resolve(formalDir, 'lean4/lean-toolchain'), 'utf8').trim(), 'Lean: toolchain pin mismatch');
check(evidence.lean?.baseBuild?.exitCode === 0, 'Lean: base build did not pass');
check(evidence.lean?.finiteBuild?.exitCode === 0, 'Lean: finite build did not pass');
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
check(sha256File(baseLeanPath) === evidence.lean.sourceCopies[0].sha256, 'Lean: parent source drift');

const expectedAxiomDependencies = new Map([
  ['decision_ext', ['propext']],
  ['contains_unionDecision', ['propext']],
  ['contains_intersectDecision', ['propext']],
  ['contains_identifiedSetMany_iff', ['propext', 'Quot.sound']],
  ['contains_robustCoreMany_iff', ['propext', 'Quot.sound']],
  ['robustDominanceManyA', ['propext']],
  ['robustDominanceManyB', ['propext']],
  ['noEvidenceOnlyOperatorFamily', []],
  ['dtFinite001_mixed_family', ['propext']],
  ['dtFinite002_robust_a', ['propext']],
  ['dtFinite003_robust_b', ['propext']],
  ['dtFinite004_empty_family', ['propext']],
]);
for (const [theorem, dependencies] of expectedAxiomDependencies) {
  check(
    sameJson(evidence.lean?.axiomAudit?.dependencies?.[theorem], dependencies),
    `Lean: unexpected axiom dependencies for ${theorem}`,
  );
  check(audit.includes(`#print axioms ${theorem}`), `Lean: audit missing ${theorem}`);
  check(finiteLean.includes(`theorem ${theorem}`), `Lean: theorem missing ${theorem}`);
}

const leanCodeWithoutComments = finiteLean
  .replace(/\/-[\s\S]*?-\//g, '')
  .replace(/--.*$/gm, '');
check(
  !/^\s*(axiom|opaque|sorry|admit)\b/m.test(leanCodeWithoutComments),
  'Lean: forbidden declaration or proof escape present',
);
check(!/\bnative_decide\b/.test(leanCodeWithoutComments), 'Lean: native_decide reintroduced');
check(
  finiteLean.includes('theorem contains_identifiedSetMany_iff') &&
    finiteLean.includes('theorem contains_robustCoreMany_iff'),
  'Lean: finite-family characterizations missing',
);
check(
  finiteLean.includes('theorem noEvidenceOnlyOperatorFamily'),
  'Lean: family impossibility theorem missing',
);
check(sounio.includes('fn union_many8('), 'Sounio: bounded union fold missing');
check(sounio.includes('fn intersect_many8('), 'Sounio: bounded intersection fold missing');

check(evidence.verdict?.parentGateVerified === true, 'verdict: parent gate not verified');
check(
  evidence.verdict?.arbitraryFiniteFamilySemanticsVerified === true,
  'verdict: finite semantics not verified',
);
check(evidence.verdict?.sounioBoundedFoldVerified === true, 'verdict: bounded fold not verified');
check(
  evidence.verdict?.leanSounioAggregationAgreement === true,
  'verdict: language agreement missing',
);
check(evidence.verdict?.compilerReconciled === false, 'verdict: compiler overclaimed');
check(
  evidence.verdict?.nativeWasmParityEstablished === false,
  'verdict: native/WASM parity overclaimed',
);
check(evidence.verdict?.clinicalDisposition === 'REFUSE', 'verdict: must remain REFUSE');
check(evidence.verdict?.productionAuthorized === false, 'verdict: production must remain false');

check(
  receipt.schema === 'darwin.deontic-transport-finite-gate-receipt.v0.2',
  'receipt: unexpected schema',
);
check(receipt.clinicalDisposition === 'REFUSE', 'receipt: must remain REFUSE');
check(receipt.clinicalUseAllowed === false, 'receipt: clinical use must be false');
check(receipt.productionAuthorized === false, 'receipt: production must be false');
check(receipt.noveltyEstablished === false, 'receipt: novelty must not be claimed');
check(receipt.compilerReconciled === false, 'receipt: compiler overclaimed');
check(receipt.nativeWasmParityEstablished === false, 'receipt: WASM parity overclaimed');
check(receipt.signed === false, 'receipt: unexpected signature claim');
check(receipt.parent?.sha256 === sha256File(parentReceiptPath), 'receipt: parent hash mismatch');
check(receipt.model?.formalContextCardinality === 'ARBITRARY_FINITE_LIST', 'receipt: formal scope drift');
check(receipt.model?.executableMaximumContexts === 8, 'receipt: executable bound drift');

const expectedArtifactPaths = new Set([
  'docs/research/deontic-transportability/formal/finite-extension-v0.2.md',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransportFinite.lean',
  'docs/research/deontic-transportability/formal/lean4/DeonticTransportFiniteAudit.lean',
  'docs/research/deontic-transportability/formal/sounio/deontic_transport_finite.sio',
  'docs/research/deontic-transportability/formal/vectors/deontic-transport-finite-vectors.v2.json',
  'docs/research/deontic-transportability/formal/evidence/finite-execution-evidence.v2.json',
  'docs/research/deontic-transportability/formal/wasm/wasm-backend-gap-v0.1.md',
  'scripts/verify-deontic-finite-gate.mjs',
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
  schema: 'darwin.deontic-transport-finite-gate-verification.v0.2',
  vectorSetId: vectors.vectorSetId,
  familyCount: computed.length,
  arbitraryFiniteFamilySemanticsVerified:
    evidence.verdict?.arbitraryFiniteFamilySemanticsVerified === true,
  boundedExecutableFamilySize: vectors.maximumExecutableFamilySize,
  lean: {
    buildVerified: evidence.verdict?.leanBuildVerified === true,
    axiomAuditVerified: evidence.verdict?.leanAxiomAuditVerified === true,
    familyImpossibilityTheoremAxiomFree:
      sameJson(evidence.lean?.axiomAudit?.dependencies?.noEvidenceOnlyOperatorFamily, []),
    sorryAxPresent: evidence.lean?.axiomAudit?.sorryAxPresent,
    nativeDecideAxiomPresent: evidence.lean?.axiomAudit?.nativeDecideAxiomPresent,
  },
  sounio: {
    boundedFoldVerified: evidence.verdict?.sounioBoundedFoldVerified === true,
    nativeExecutionVerified: evidence.sounio?.directExecution?.exitCode === 0,
    compilerReconciled: false,
    wasmArtifactProduced: false,
    nativeWasmParityEstablished: false,
  },
  parentGateChained: receipt.parent?.sha256 === sha256File(parentReceiptPath),
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  noveltyEstablished: false,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
