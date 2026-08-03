export const dispositions = [
  'REFUSE',
  'NO_STABILIZER_OBSTRUCTION',
  'RESERVED',
  'ABSTAIN_STABILIZER_OBSTRUCTION',
  'REVIEW_LOCAL_PROOF',
  'ABSTAIN_NO_GLOBAL_SECTION',
  'REFUSE_INTERNAL_INCONSISTENCY',
  'RESERVED',
];

export const candidateOrder = [0, 1, 2, 4, 3, 5, 6, 7];

export const popcount = (mask) => {
  let count = 0;
  for (let bit = 0; bit < 8; bit += 1) {
    if ((mask & (1 << bit)) !== 0) count += 1;
  }
  return count;
};

export const validInput = ([declared, anchors, mapAB, mapBC, mapCA]) =>
  Number.isInteger(declared) && declared >= 0 && declared <= 7 &&
  Number.isInteger(anchors) && anchors >= 0 && anchors <= 7 &&
  [mapAB, mapBC, mapCA].every(
    (mapCode) => Number.isInteger(mapCode) && mapCode >= 0 && mapCode <= 3,
  );

export const applyMap = (mapCode, input) => (mapCode >> input) & 1;

export const transformMap = (mapCode, sourceFlip, targetFlip) => {
  const atZero = targetFlip ^ applyMap(mapCode, sourceFlip);
  const atOne = targetFlip ^ applyMap(mapCode, 1 ^ sourceFlip);
  return atZero + atOne * 2;
};

const gaugeBit = (gauge, vertex) => (gauge & vertex) === 0 ? 0 : 1;

export const transformMaps = ([mapAB, mapBC, mapCA], gauge) => [
  transformMap(mapAB, gaugeBit(gauge, 1), gaugeBit(gauge, 2)),
  transformMap(mapBC, gaugeBit(gauge, 2), gaugeBit(gauge, 4)),
  transformMap(mapCA, gaugeBit(gauge, 4), gaugeBit(gauge, 1)),
];

export const transformInput = ([declared, anchors, ...maps], gauge) =>
  [declared, anchors, ...transformMaps(maps, gauge)];

export const transformAssignment = (assignment, gauge) => assignment ^ gauge;

const localIssueMask = (declared, maps) => maps.reduce(
  (mask, mapCode, index) => {
    const edge = 1 << index;
    return (declared & edge) !== 0 && mapCode !== 1 && mapCode !== 2
      ? mask | edge
      : mask;
  },
  0,
);

const assignmentSatisfies = (declared, maps, assignment) => {
  const values = [assignment & 1, (assignment >> 1) & 1, (assignment >> 2) & 1];
  const [mapAB, mapBC, mapCA] = maps;
  if ((declared & 1) !== 0 && values[1] !== applyMap(mapAB, values[0])) return false;
  if ((declared & 2) !== 0 && values[2] !== applyMap(mapBC, values[1])) return false;
  if ((declared & 4) !== 0 && values[0] !== applyMap(mapCA, values[2])) return false;
  return true;
};

export const solutionAssignments = (declared, maps) =>
  Array.from({length: 8}, (_, assignment) => assignment)
    .filter((assignment) => assignmentSatisfies(declared, maps, assignment));

export const solutionMask = (declared, maps) => solutionAssignments(declared, maps)
  .reduce((mask, assignment) => mask | (1 << assignment), 0);

export const gaugeRespectsAnchors = (gauge, anchors) => (gauge & anchors) === 0;

export const gaugeStabilizes = ([declared, anchors, ...maps], gauge) => {
  if (!gaugeRespectsAnchors(gauge, anchors)) return false;
  const transformed = transformMaps(maps, gauge);
  return maps.every((mapCode, index) => {
    const edge = 1 << index;
    return (declared & edge) === 0 || transformed[index] === mapCode;
  });
};

export const stabilizerElements = (input) =>
  Array.from({length: 8}, (_, gauge) => gauge)
    .filter((gauge) => gaugeStabilizes(input, gauge));

export const stabilizerMask = (input) => stabilizerElements(input)
  .reduce((mask, gauge) => mask | (1 << gauge), 0);

export const minimumAdditionalAnchor = (input) => {
  const [declared, anchors, ...maps] = input;
  const available = 7 & ~anchors;
  return candidateOrder.find((candidate) =>
    (candidate & available) === candidate &&
    stabilizerMask([declared, anchors | candidate, ...maps]) === 1) ?? -1;
};

export const packResult = ({
  disposition,
  stabilizer,
  additionalAnchor,
  solutions,
  stabilizerOrder,
  localIssue,
}) => disposition + stabilizer * 8 + additionalAnchor * 2048 +
  solutions * 16384 + stabilizerOrder * 262144 + localIssue * 4194304;

export const decodeResult = (packed) => ({
  dispositionCode: packed % 8,
  disposition: dispositions[packed % 8] ?? 'UNKNOWN',
  stabilizerMask: Math.floor(packed / 8) % 256,
  minimumAdditionalAnchorMask: Math.floor(packed / 2048) % 8,
  solutionCount: Math.floor(packed / 16384) % 16,
  stabilizerOrder: Math.floor(packed / 262144) % 16,
  localIssueMask: Math.floor(packed / 4194304) % 8,
});

export const analyze = (input) => {
  if (!validInput(input)) return 0;
  const [declared, , ...maps] = input;
  const localIssue = localIssueMask(declared, maps);
  if (localIssue !== 0) {
    return packResult({
      disposition: 4,
      stabilizer: 0,
      additionalAnchor: 0,
      solutions: 0,
      stabilizerOrder: 0,
      localIssue,
    });
  }
  const solutionCount = solutionAssignments(declared, maps).length;
  const stabilizer = stabilizerMask(input);
  const stabilizerOrder = popcount(stabilizer);
  const additionalAnchor = minimumAdditionalAnchor(input);
  if (additionalAnchor < 0) {
    return packResult({
      disposition: 6,
      stabilizer,
      additionalAnchor: 0,
      solutions: solutionCount,
      stabilizerOrder,
      localIssue: 0,
    });
  }
  const disposition = solutionCount === 0 ? 5 : stabilizerOrder > 1 ? 3 : 1;
  return packResult({
    disposition,
    stabilizer,
    additionalAnchor,
    solutions: solutionCount,
    stabilizerOrder,
    localIssue: 0,
  });
};

const firstCyclicSolution = (solutions, start) => {
  for (let offset = 0; offset < 8; offset += 1) {
    const candidate = (start + offset) % 8;
    if (solutions.includes(candidate)) return candidate;
  }
  return -1;
};

export const mutantSelector = (kind, input) => {
  const [declared, , ...maps] = input;
  const solutions = solutionAssignments(declared, maps);
  if (solutions.length === 0) return -1;
  if (kind === 0) return Math.min(...solutions);
  if (kind === 1) return Math.max(...solutions);
  if (kind === 2) return firstCyclicSolution(solutions, 5);
  const [mapAB, mapBC, mapCA] = maps;
  return firstCyclicSolution(solutions, (mapAB + mapBC * 2 + mapCA * 4) % 8);
};

export const mutantAnomalyMask = (kind, input) => {
  const baseline = mutantSelector(kind, input);
  let mask = 0;
  for (let gauge = 1; gauge < 8; gauge += 1) {
    if (!gaugeRespectsAnchors(gauge, input[1])) continue;
    const transformed = mutantSelector(kind, transformInput(input, gauge));
    const expected = baseline < 0 ? baseline : transformAssignment(baseline, gauge);
    if (transformed !== expected) mask |= 1 << (gauge - 1);
  }
  return mask;
};

export const inputFromIndex = (index) => [
  Math.floor(index / 512) % 8,
  Math.floor(index / 64) % 8,
  Math.floor(index / 16) % 4,
  Math.floor(index / 4) % 4,
  index % 4,
];
