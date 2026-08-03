import {createHash} from 'node:crypto';
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  analyzeV13,
  decodeResultV13,
  exactBlockerResultV13,
  popcount3V13,
  profileCountV13,
  statesFromProfileV13,
  subsetV13,
} from './epistemic-revocation-distance-v13-oracle.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/epistemic-revocation-distance/formal');
const paths = {
  vectors: resolve(formalDir, 'vectors/epistemic-revocation-distance.v1.3.json'),
  transcript: resolve(formalDir, 'transcripts/abstract-domain.v1.3.txt'),
  evidence: resolve(formalDir, 'evidence/benchmark-generation.v1.3.json'),
};
const writeArtifacts = process.argv.includes('--write-artifacts');
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const bitCount8 = (value) => {
  let count = 0;
  for (let bit = 0; bit < 8; bit += 1) {
    if ((value & (1 << bit)) !== 0) count += 1;
  }
  return count;
};

const cases = [];
let lowerBoundChecks = 0;
let lowerBoundViolations = 0;
let exactCutChecks = 0;
let exactCutViolations = 0;
let completeFamilyChecks = 0;
let completeFamilyViolations = 0;
let lexicalFirstMutantKills = 0;
let criticalIntersectionMutantKills = 0;

for (let active = 1; active < 8; active += 1) {
  const possibleBlockers = [];
  for (let blocker = 1; blocker < 8; blocker += 1) {
    if (subsetV13(blocker, active)) possibleBlockers.push(blocker);
  }
  const familyCount = 1 << possibleBlockers.length;
  for (let familyCode = 1; familyCode < familyCount; familyCode += 1) {
    const blockers = possibleBlockers.filter(
      (_blocker, index) => (familyCode & (1 << index)) !== 0,
    );
    const exact = exactBlockerResultV13(active, blockers);
    const decoded = decodeResultV13(exact.expectedPacked);
    check(decoded.jointDistance === exact.expected.distance,
      `distance mismatch for active=${active} family=${familyCode}`);
    check(decoded.minimumCutFamily === exact.expected.minimumCutFamily,
      `minimum family mismatch for active=${active} family=${familyCode}`);
    check(decoded.criticalReceiptMask === exact.expected.criticalReceiptMask,
      `critical union mismatch for active=${active} family=${familyCode}`);

    for (let revoked = 0; revoked < 8; revoked += 1) {
      if (!subsetV13(revoked, active) ||
          popcount3V13(revoked) >= exact.expected.distance) continue;
      lowerBoundChecks += 1;
      if (blockers.some((blocker) => subsetV13(blocker, revoked))) {
        lowerBoundViolations += 1;
      }
    }
    for (const minimumCut of exact.expected.minimumCuts) {
      exactCutChecks += 1;
      if (!blockers.some((blocker) => subsetV13(blocker, minimumCut))) {
        exactCutViolations += 1;
      }
    }
    completeFamilyChecks += 1;
    const decodedCuts = [];
    for (let cut = 0; cut < 8; cut += 1) {
      if ((decoded.minimumCutFamily & (1 << cut)) !== 0) decodedCuts.push(cut);
    }
    if (JSON.stringify(decodedCuts) !== JSON.stringify(exact.expected.minimumCuts)) {
      completeFamilyViolations += 1;
    }
    if (exact.expected.minimumCuts.length > 1) lexicalFirstMutantKills += 1;
    const intersection = exact.expected.minimumCuts
      .reduce((value, cut) => value & cut, 7);
    if (intersection !== exact.expected.criticalReceiptMask) {
      criticalIntersectionMutantKills += 1;
    }

    cases.push({
      id: `erd13-a${active}-f${familyCode}`,
      activeReceiptMask: active,
      blockerMasks: blockers,
      postRevocationStates: exact.states,
      expectedPacked: exact.expectedPacked,
      expected: exact.expected,
    });
  }
}

check(cases.length === 151, `blocker benchmark cardinality drift: ${cases.length}`);
check(lowerBoundViolations === 0, `lower-bound violations: ${lowerBoundViolations}`);
check(exactCutViolations === 0, `exact-cut violations: ${exactCutViolations}`);
check(completeFamilyViolations === 0,
  `complete-family violations: ${completeFamilyViolations}`);
check(lexicalFirstMutantKills > 0, 'lexical-first minimum mutant survived');
check(criticalIntersectionMutantKills > 0,
  'critical-intersection mutant survived');

const transcript = [];
const dispositionCensus = {
  INVALID: 0,
  FRAGILE: 0,
  ROBUST_WITHIN_ENUMERATION: 0,
  BASE_NOT_IDENTIFIED: 0,
};
const dispositionNames = {
  0: 'INVALID',
  1: 'FRAGILE',
  2: 'ROBUST_WITHIN_ENUMERATION',
  3: 'BASE_NOT_IDENTIFIED',
};
const distanceCensus = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0};
let abstractStates = 0;
let jointReuseMutantKills = 0;
let baseGuardMutantKills = 0;
let completeFamilyProfiles = 0;
let ordinal = 0;
for (let active = 0; active < 8; active += 1) {
  const profileCount = profileCountV13(active);
  for (let profileCode = 0; profileCode < profileCount; profileCode += 1) {
    const states = statesFromProfileV13(active, profileCode);
    const packed = analyzeV13(active, states);
    const decoded = decodeResultV13(packed);
    const dispositionName = dispositionNames[decoded.disposition] ?? 'INVALID';
    dispositionCensus[dispositionName] += 1;
    distanceCensus[decoded.jointDistance] += 1;
    if (decoded.modelDistance !== decoded.jointDistance ||
        decoded.symmetryDistance !== decoded.jointDistance) {
      jointReuseMutantKills += 1;
    }
    if (decoded.disposition === 3) baseGuardMutantKills += 1;
    if (bitCount8(decoded.minimumCutFamily) > 1) completeFamilyProfiles += 1;
    transcript.push(`${ordinal}|${active}|${profileCode}|${packed}`);
    ordinal += 1;
    abstractStates += 1;
  }
}

check(abstractStates === 66356,
  `complete abstract domain cardinality drift: ${abstractStates}`);
check(Object.values(dispositionCensus).reduce((sum, value) => sum + value, 0) ===
  abstractStates, 'disposition census does not close');
check(jointReuseMutantKills > 0, 'joint-distance-reuse mutant survived');
check(baseGuardMutantKills > 0, 'base-identification-guard mutant survived');
check(completeFamilyProfiles > 0, 'complete minimum-cut family was not exercised');

const vectors = {
  schema: 'darwin.epistemic-revocation-distance-vectors.v1.3',
  generatedAt: '2026-08-03T14:00:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  theoremProfile: {
    evidenceBits: 3,
    activeMasks: 7,
    cases: cases.length,
    blockerFamiliesComplete: true,
  },
  cases,
};
const vectorsBytes = Buffer.from(`${JSON.stringify(vectors, null, 2)}\n`);
const transcriptBytes = Buffer.from(`${transcript.join('\n')}\n`);
const result = {
  schema: 'darwin.epistemic-revocation-distance-benchmark-generation.v1.3',
  generatedAt: '2026-08-03T14:00:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  blockerBenchmark: {
    cases: cases.length,
    lowerBoundChecks,
    lowerBoundViolations,
    exactCutChecks,
    exactCutViolations,
    completeFamilyChecks,
    completeFamilyViolations,
  },
  completeAbstractDomain: {
    states: abstractStates,
    dispositionCensus,
    distanceCensus,
    completeFamilyProfiles,
  },
  mutationAdequacy: {
    lexicalFirstMutantKills,
    criticalIntersectionMutantKills,
    jointReuseMutantKills,
    baseGuardMutantKills,
    allDeclaredMutantsKilled: lexicalFirstMutantKills > 0 &&
      criticalIntersectionMutantKills > 0 &&
      jointReuseMutantKills > 0 &&
      baseGuardMutantKills > 0,
  },
  artifacts: {
    vectors: {
      path: fromRoot(paths.vectors),
      bytes: vectorsBytes.length,
      sha256: sha256(vectorsBytes),
    },
    transcript: {
      path: fromRoot(paths.transcript),
      bytes: transcriptBytes.length,
      sha256: sha256(transcriptBytes),
    },
  },
  verified: errors.length === 0,
  errors,
};

if (writeArtifacts && errors.length === 0) {
  for (const path of Object.values(paths)) mkdirSync(dirname(path), {recursive: true});
  writeFileSync(paths.vectors, vectorsBytes);
  writeFileSync(paths.transcript, transcriptBytes);
  writeFileSync(paths.evidence, `${JSON.stringify(result, null, 2)}\n`);
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
