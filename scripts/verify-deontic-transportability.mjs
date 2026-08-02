import {createHash} from 'node:crypto';
import {readFileSync, statSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageDir = resolve(repoRoot, 'docs/research/deontic-transportability');
const counterexamplesPath = resolve(packageDir, 'counterexamples-v0.1.json');
const atlasPath = resolve(packageDir, 'ash-latam-discovery-atlas-v0.1.json');
const receiptPath = resolve(packageDir, 'deontic-transportability.receipt.v0.1.json');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

function sha256Bytes(value) {
  return createHash('sha256').update(value).digest('hex');
}

function sha256File(path) {
  return sha256Bytes(readFileSync(path));
}

function evidenceDigest(outcomeVectorByAction) {
  return sha256Bytes(JSON.stringify(canonicalize(outcomeVectorByAction)));
}

function absolute(value) {
  return value < 0n ? -value : value;
}

function greatestCommonDivisor(left, right) {
  let a = absolute(left);
  let b = absolute(right);
  while (b !== 0n) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
}

function rational(numerator, denominator = 1n) {
  if (denominator === 0n) throw new Error('zero denominator');
  const sign = denominator < 0n ? -1n : 1n;
  const signedNumerator = numerator * sign;
  const positiveDenominator = denominator * sign;
  const divisor = greatestCommonDivisor(signedNumerator, positiveDenominator) || 1n;
  return {
    numerator: signedNumerator / divisor,
    denominator: positiveDenominator / divisor,
  };
}

function parseRational(value) {
  return rational(BigInt(value.numerator), BigInt(value.denominator));
}

function addRational(left, right) {
  return rational(
    left.numerator * right.denominator + right.numerator * left.denominator,
    left.denominator * right.denominator,
  );
}

function multiplyRationalByInteger(value, integer) {
  return rational(value.numerator * BigInt(integer), value.denominator);
}

function compareRational(left, right) {
  const difference = left.numerator * right.denominator - right.numerator * left.denominator;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

function rationalEquals(left, right) {
  return left.numerator === right.numerator && left.denominator === right.denominator;
}

function rationalForJson(value) {
  return {
    numerator: Number(value.numerator),
    denominator: Number(value.denominator),
  };
}

function scoreAction(outcomes, weights) {
  let score = rational(0n);
  for (const [metric, outcome] of Object.entries(outcomes)) {
    if (!(metric in weights)) throw new Error(`missing weight for ${metric}`);
    score = addRational(score, multiplyRationalByInteger(parseRational(weights[metric]), outcome));
  }
  return score;
}

function sortedUnique(values) {
  return [...new Set(values)].sort();
}

function sameStringArray(left, right) {
  return JSON.stringify(sortedUnique(left)) === JSON.stringify(sortedUnique(right));
}

function intersection(sets) {
  if (sets.length === 0) return [];
  return sortedUnique([...sets[0]].filter((value) => sets.every((set) => set.has(value))));
}

const counterexamples = readJson(counterexamplesPath);

if (process.argv.includes('--print-evidence-digests')) {
  const digests = Object.fromEntries(
    counterexamples.cases.map((fixture) => [
      fixture.id,
      evidenceDigest(fixture.outcomeVectorByAction),
    ]),
  );
  process.stdout.write(`${JSON.stringify(digests, null, 2)}\n`);
  process.exit(0);
}

const atlas = readJson(atlasPath);
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

check(
  counterexamples.schema === 'darwin.deontic-transport-counterexamples.v0.1',
  'counterexamples: unexpected schema',
);
check(
  counterexamples.benchmarkId === 'deontic-transport-counterexamples-4',
  'counterexamples: unexpected benchmark id',
);
check(counterexamples.status === 'ABSTRACT_RESEARCH_ONLY', 'counterexamples: invalid status');
check(counterexamples.clinicalDisposition === 'REFUSE', 'counterexamples: must remain REFUSE');
check(counterexamples.clinicalUseAllowed === false, 'counterexamples: clinical use must be false');
check(counterexamples.productionAuthorized === false, 'counterexamples: production must be false');
check(counterexamples.noveltyEstablished === false, 'counterexamples: novelty must not be claimed');
check(counterexamples.actionsAreClinical === false, 'counterexamples: actions must be abstract');
check(counterexamples.cases?.length === 4, 'counterexamples: expected exactly four cases');

const caseIds = new Set();
const verifiedCounterexamples = [];

for (const fixture of counterexamples.cases ?? []) {
  check(/^DT-00[1-4]$/.test(fixture.id), `${fixture.id}: invalid fixture id`);
  check(!caseIds.has(fixture.id), `${fixture.id}: duplicate fixture id`);
  caseIds.add(fixture.id);
  check(sameStringArray(fixture.actions, ['A', 'B']), `${fixture.id}: actions must be A and B`);
  check(
    fixture.evidenceSha256 === evidenceDigest(fixture.outcomeVectorByAction),
    `${fixture.id}: evidence digest mismatch`,
  );
  check(fixture.contexts?.length === 2, `${fixture.id}: expected two contexts`);

  const decisions = [];
  const contextResults = [];

  for (const context of fixture.contexts ?? []) {
    check(Boolean(context.decisionAuthority), `${context.id}: missing decision authority`);
    check(context.feasibleActions?.length > 0, `${context.id}: empty feasible action set`);
    check(
      context.feasibleActions.every((action) => fixture.actions.includes(action)),
      `${context.id}: unknown feasible action`,
    );

    const scores = {};
    for (const action of fixture.actions) {
      try {
        scores[action] = scoreAction(fixture.outcomeVectorByAction[action], context.weights);
        check(
          rationalEquals(scores[action], parseRational(context.expectedScores[action])),
          `${context.id}: score mismatch for ${action}`,
        );
      } catch (error) {
        errors.push(`${context.id}: ${error.message}`);
      }
    }

    const feasible = context.feasibleActions.filter((action) => scores[action]);
    let selected = [];
    if (feasible.length > 0) {
      let best = scores[feasible[0]];
      for (const action of feasible.slice(1)) {
        if (compareRational(scores[action], best) > 0) best = scores[action];
      }
      selected = feasible.filter((action) => compareRational(scores[action], best) === 0).sort();
    }
    check(sameStringArray(selected, context.expectedDecision), `${context.id}: decision mismatch`);
    decisions.push(new Set(selected));
    contextResults.push({
      contextId: context.id,
      decision: selected,
      scores: Object.fromEntries(
        Object.entries(scores).map(([action, value]) => [action, rationalForJson(value)]),
      ),
    });
  }

  const identifiedActionSet = sortedUnique(decisions.flatMap((decision) => [...decision]));
  const robustActionCore = intersection(decisions);
  const decisionSetChanges = new Set(decisions.map((decision) => JSON.stringify([...decision].sort()))).size > 1;

  check(
    fixture.expected.sameCausalEvidenceAcrossContexts === true,
    `${fixture.id}: invariant-evidence expectation missing`,
  );
  check(
    fixture.expected.decisionSetChanges === decisionSetChanges,
    `${fixture.id}: decision-change expectation mismatch`,
  );
  check(
    sameStringArray(identifiedActionSet, fixture.expected.identifiedActionSet),
    `${fixture.id}: identified action set mismatch`,
  );
  check(
    sameStringArray(robustActionCore, fixture.expected.robustActionCore),
    `${fixture.id}: robust action core mismatch`,
  );

  if (fixture.id === 'DT-004') {
    check(fixture.expected.authorityBoundaryRequired === true, 'DT-004: authority boundary missing');
    check(
      new Set(fixture.contexts.map((context) => context.decisionAuthority)).size === 2,
      'DT-004: authorities must differ',
    );
  }

  verifiedCounterexamples.push({
    id: fixture.id,
    evidenceSha256: fixture.evidenceSha256,
    decisionSetChanges,
    identifiedActionSet,
    robustActionCore,
    contexts: contextResults,
  });
}

check(atlas.schema === 'darwin.deontic-transport-atlas.v0.1', 'atlas: unexpected schema');
check(atlas.status === 'DISCOVERY_METADATA_ONLY', 'atlas: invalid status');
check(atlas.clinicalDisposition === 'REFUSE', 'atlas: must remain REFUSE');
check(atlas.clinicalUseAllowed === false, 'atlas: clinical use must be false');
check(atlas.productionAuthorized === false, 'atlas: production must be false');
check(atlas.noveltyEstablished === false, 'atlas: novelty must not be claimed');
check(
  atlas.sourceSnapshotStatus === 'EXTERNAL_BYTES_HASHED_NOT_REDISTRIBUTED',
  'atlas: unexpected source snapshot status',
);
check(atlas.source?.publisher === 'American Society of Hematology', 'atlas: unexpected publisher');
check(atlas.source?.recommendationTextIncluded === false, 'atlas: recommendation text must be absent');
check(/^[a-f0-9]{64}$/.test(atlas.source?.sha256), 'atlas: invalid source SHA-256');
check(atlas.source?.bytes === 1508712, 'atlas: unexpected source byte size');
check(atlas.source?.mediaType === 'application/pdf', 'atlas: unexpected source media type');
check(atlas.source?.pages === 47, 'atlas: unexpected source page count');

try {
  const sourceUrl = new URL(atlas.source.url);
  check(sourceUrl.protocol === 'https:', 'atlas: source must use HTTPS');
  check(sourceUrl.hostname === 'www.hematology.org', 'atlas: source host is not official ASH');
} catch {
  errors.push('atlas: invalid source URL');
}

check(atlas.records?.length === 10, 'atlas: expected ten discovery records');
const expectedRecommendationNumbers = [2, 6, 9, 10, 11, 12, 13, 16, 18, 19];
const recommendationNumbers = [];
const atlasIds = new Set();
const changePropertyCounts = {DIRECTION: 0, STRENGTH: 0};
const driverCounts = {
  ADDITIONAL_INDIRECT_EVIDENCE: 0,
  RESOURCE_ACCESS_EQUITY: 0,
  VALUES_PREFERENCES: 0,
};

for (const record of atlas.records ?? []) {
  check(!atlasIds.has(record.id), `${record.id}: duplicate atlas id`);
  atlasIds.add(record.id);
  recommendationNumbers.push(record.recommendationNumber);
  check(record.changeProperty in changePropertyCounts, `${record.id}: invalid change property`);
  check(record.reportedDriverGroup in driverCounts, `${record.id}: invalid driver group`);
  if (record.changeProperty in changePropertyCounts) changePropertyCounts[record.changeProperty] += 1;
  if (record.reportedDriverGroup in driverCounts) driverCounts[record.reportedDriverGroup] += 1;
  check(record.effectTransportStatus === 'NOT_ADJUDICATED', `${record.id}: effect transport overclaimed`);
  check(record.picoAlignmentStatus === 'NOT_ADJUDICATED', `${record.id}: PICO alignment overclaimed`);
  check(record.confirmatoryEligible === false, `${record.id}: discovery row promoted prematurely`);
  check(Boolean(record.sourceLocator), `${record.id}: missing source locator`);
  check(Boolean(record.reportedRationaleParaphrase), `${record.id}: missing rationale paraphrase`);
  check(!('recommendationText' in record), `${record.id}: recommendation text must be absent`);
  check(!('dose' in record), `${record.id}: dose must be absent`);
  check(!('patientContext' in record), `${record.id}: patient context must be absent`);
}

check(
  sameStringArray(recommendationNumbers.map(String), expectedRecommendationNumbers.map(String)),
  'atlas: recommendation-number set mismatch',
);
check(changePropertyCounts.DIRECTION === 6, 'atlas: expected six direction changes');
check(changePropertyCounts.STRENGTH === 4, 'atlas: expected four strength changes');
check(driverCounts.ADDITIONAL_INDIRECT_EVIDENCE === 2, 'atlas: indirect-evidence count mismatch');
check(driverCounts.RESOURCE_ACCESS_EQUITY === 6, 'atlas: resource/access/equity count mismatch');
check(driverCounts.VALUES_PREFERENCES === 2, 'atlas: values/preferences count mismatch');
check(atlas.reportedPopulation?.totalRecommendations === 21, 'atlas: expected 21 reported recommendations');
check(atlas.reportedPopulation?.changedDirection === 6, 'atlas: reported direction count mismatch');
check(atlas.reportedPopulation?.changedStrength === 4, 'atlas: reported strength count mismatch');

const receipt = readJson(receiptPath);
check(
  receipt.schema === 'darwin.deontic-transport-research-receipt.v0.1',
  'receipt: unexpected schema',
);
check(receipt.clinicalDisposition === 'REFUSE', 'receipt: must remain REFUSE');
check(receipt.clinicalUseAllowed === false, 'receipt: clinical use must be false');
check(receipt.productionAuthorized === false, 'receipt: production must be false');
check(receipt.noveltyEstablished === false, 'receipt: novelty must not be claimed');
check(receipt.sourceSnapshotsFrozen === false, 'receipt: source snapshots must remain unfrozen');
check(receipt.sourceBytesHashed === true, 'receipt: source-byte hash must be recorded');
check(receipt.preregistered === false, 'receipt: protocol must remain unregistered');
check(receipt.publicSource?.sha256 === atlas.source?.sha256, 'receipt: source SHA-256 mismatch');
check(receipt.publicSource?.bytes === atlas.source?.bytes, 'receipt: source byte-size mismatch');

const expectedArtifactPaths = new Set([
  'docs/research/deontic-transportability/README.md',
  'docs/research/deontic-transportability/deontic-transportability-theory-v0.1.md',
  'docs/research/deontic-transportability/preregistration-protocol-v0.1.md',
  'docs/research/deontic-transportability/novelty-map-2026-08-02.md',
  'docs/research/deontic-transportability/ash-latam-discovery-atlas-v0.1.json',
  'docs/research/deontic-transportability/counterexamples-v0.1.json',
  'scripts/verify-deontic-transportability.mjs',
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
  sameStringArray([...receivedArtifactPaths], [...expectedArtifactPaths]),
  'receipt: artifact set mismatch',
);

const result = {
  schema: 'darwin.deontic-transport-research-verification.v0.1',
  benchmarkId: counterexamples.benchmarkId,
  counterexampleCount: verifiedCounterexamples.length,
  allCounterexamplesChangeDecision: verifiedCounterexamples.every(
    (fixture) => fixture.decisionSetChanges,
  ),
  allRobustCoresEmpty: verifiedCounterexamples.every(
    (fixture) => fixture.robustActionCore.length === 0,
  ),
  atlas: {
    recordCount: atlas.records?.length ?? 0,
    reportedTotalRecommendations: atlas.reportedPopulation?.totalRecommendations,
    changePropertyCounts,
    reportedDriverGroupCounts: driverCounts,
    effectTransportAdjudicated: false,
    confirmatoryEligible: false,
  },
  sourceSnapshotsFrozen: false,
  sourceBytesHashed: true,
  preregistered: false,
  noveltyEstablished: false,
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
