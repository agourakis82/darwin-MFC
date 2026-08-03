export const graphDispositionsV12 = [
  'REFUSE_INVALID_ABI',
  'UNIQUE_WITHIN_DECLARED_MODEL',
  'REVIEW_NONUNIQUE',
  'ABSTAIN_STABILIZER_OBSTRUCTION',
  'RESERVED',
  'ABSTAIN_NO_GLOBAL_SECTION',
  'REFUSE_INTERNAL_INCONSISTENCY',
  'RESERVED',
];

export const edgePairsV12 = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 3], [2, 4], [2, 5],
  [3, 4], [3, 5],
  [4, 5],
];

export const vertexMaskV12 = (vertexCount) => (1 << vertexCount) - 1;

export const allowedEdgeMaskV12 = (vertexCount) => edgePairsV12.reduce(
  (mask, [left, right], index) =>
    left < vertexCount && right < vertexCount ? mask | (1 << index) : mask,
  0,
);

export const validGraphInputV12 = (input) => {
  if (!Array.isArray(input) || input.length !== 5) return false;
  const [vertexCount, edgeMask, parityMask, anchorMask, anchorValueMask] = input;
  if (![vertexCount, edgeMask, parityMask, anchorMask, anchorValueMask]
    .every(Number.isSafeInteger)) return false;
  if (vertexCount < 1 || vertexCount > 6) return false;
  const allowedEdges = allowedEdgeMaskV12(vertexCount);
  const vertices = vertexMaskV12(vertexCount);
  return edgeMask >= 0 && (edgeMask & allowedEdges) === edgeMask &&
    parityMask >= 0 && (parityMask & edgeMask) === parityMask &&
    anchorMask >= 0 && (anchorMask & vertices) === anchorMask &&
    anchorValueMask >= 0 && (anchorValueMask & anchorMask) === anchorValueMask;
};

const bit = (mask, index) => (mask >> index) & 1;

export const graphAssignmentSatisfiesV12 = (input, assignment) => {
  const [vertexCount, edgeMask, parityMask, anchorMask, anchorValueMask] = input;
  if (assignment < 0 || assignment > vertexMaskV12(vertexCount)) return false;
  if ((assignment & anchorMask) !== anchorValueMask) return false;
  return edgePairsV12.every(([left, right], edgeIndex) =>
    bit(edgeMask, edgeIndex) === 0 ||
      (bit(assignment, left) ^ bit(assignment, right)) === bit(parityMask, edgeIndex));
};

export const graphSolutionsV12 = (input) => {
  const limit = 1 << input[0];
  return Array.from({length: limit}, (_, assignment) => assignment)
    .filter((assignment) => graphAssignmentSatisfiesV12(input, assignment));
};

export const graphGaugeRespectsObservationsV12 = (input, gauge) =>
  (gauge & input[3]) === 0;

export const graphGaugeStabilizesV12 = (input, gauge) => {
  const [vertexCount, edgeMask] = input;
  if (gauge < 0 || gauge >= (1 << vertexCount) ||
      !graphGaugeRespectsObservationsV12(input, gauge)) return false;
  return edgePairsV12.every(([left, right], edgeIndex) =>
    bit(edgeMask, edgeIndex) === 0 || bit(gauge, left) === bit(gauge, right));
};

export const graphStabilizersV12 = (input) => {
  const limit = 1 << input[0];
  return Array.from({length: limit}, (_, gauge) => gauge)
    .filter((gauge) => graphGaugeStabilizesV12(input, gauge));
};

export const transformGraphInputV12 = (input, gauge) => {
  const [vertexCount, edgeMask, parityMask, anchorMask, anchorValueMask] = input;
  let transformedParity = parityMask;
  for (let edgeIndex = 0; edgeIndex < edgePairsV12.length; edgeIndex += 1) {
    if (bit(edgeMask, edgeIndex) === 0) continue;
    const [left, right] = edgePairsV12[edgeIndex];
    if ((bit(gauge, left) ^ bit(gauge, right)) === 1) {
      transformedParity ^= 1 << edgeIndex;
    }
  }
  return [vertexCount, edgeMask, transformedParity,
    anchorMask, anchorValueMask ^ (gauge & anchorMask)];
};

export const packGraphResultV12 = (disposition, solutionCount, stabilizerOrder) =>
  disposition + solutionCount * 8 + stabilizerOrder * 1024;

export const decodeGraphResultV12 = (packed) => ({
  dispositionCode: packed % 8,
  disposition: graphDispositionsV12[packed % 8] ?? 'UNKNOWN',
  solutionCount: Math.floor(packed / 8) % 128,
  stabilizerOrder: Math.floor(packed / 1024) % 128,
});

export const analyzeGraphV12 = (input) => {
  if (!validGraphInputV12(input)) return 0;
  const solutionCount = graphSolutionsV12(input).length;
  const stabilizerOrder = graphStabilizersV12(input).length;
  if (solutionCount === 0) return packGraphResultV12(5, 0, stabilizerOrder);
  if (stabilizerOrder > 1) {
    return packGraphResultV12(3, solutionCount, stabilizerOrder);
  }
  return packGraphResultV12(
    solutionCount === 1 ? 1 : 2,
    solutionCount,
    stabilizerOrder,
  );
};

export const edgeMaskForPairsV12 = (pairs) => {
  const keys = new Set(pairs.map(([left, right]) =>
    `${Math.min(left, right)}:${Math.max(left, right)}`));
  return edgePairsV12.reduce((mask, [left, right], index) =>
    keys.has(`${left}:${right}`) ? mask | (1 << index) : mask, 0);
};
