export const dispositionsV12 = [
  'REFUSE_INVALID_ABI',
  'UNIQUE_WITHIN_DECLARED_MODEL',
  'REVIEW_NONUNIQUE',
  'ABSTAIN_STABILIZER_OBSTRUCTION',
  'REVIEW_LOCAL_PROOF',
  'ABSTAIN_NO_GLOBAL_SECTION',
  'REFUSE_INTERNAL_INCONSISTENCY',
  'RESERVED',
];

export const candidateOrderV12 = [0, 1, 2, 4, 3, 5, 6, 7];

export const popcount8V12 = (mask) => {
  let count = 0;
  for (let bit = 0; bit < 8; bit += 1) {
    if ((mask & (1 << bit)) !== 0) count += 1;
  }
  return count;
};

export const validInputV12 = (input) => {
  if (!Array.isArray(input) || input.length !== 6) return false;
  const [declared, anchors, anchorValues, mapAB, mapBC, mapCA] = input;
  return Number.isInteger(declared) && declared >= 0 && declared <= 7 &&
    Number.isInteger(anchors) && anchors >= 0 && anchors <= 7 &&
    Number.isInteger(anchorValues) && anchorValues >= 0 && anchorValues <= 7 &&
    (anchorValues & anchors) === anchorValues &&
    [mapAB, mapBC, mapCA].every(
      (mapCode) => Number.isInteger(mapCode) && mapCode >= 0 && mapCode <= 3,
    );
};

export const applyMapV12 = (mapCode, input) => (mapCode >> input) & 1;

export const transformMapV12 = (mapCode, sourceFlip, targetFlip) => {
  const atZero = targetFlip ^ applyMapV12(mapCode, sourceFlip);
  const atOne = targetFlip ^ applyMapV12(mapCode, 1 ^ sourceFlip);
  return atZero + atOne * 2;
};

const gaugeBit = (gauge, vertex) => (gauge & vertex) === 0 ? 0 : 1;

export const transformMapsV12 = ([mapAB, mapBC, mapCA], gauge) => [
  transformMapV12(mapAB, gaugeBit(gauge, 1), gaugeBit(gauge, 2)),
  transformMapV12(mapBC, gaugeBit(gauge, 2), gaugeBit(gauge, 4)),
  transformMapV12(mapCA, gaugeBit(gauge, 4), gaugeBit(gauge, 1)),
];

export const gaugeRespectsObservationV12 = (gauge, anchors) =>
  (gauge & anchors) === 0;

export const transformResidualInputV12 = (input, gauge) => {
  const [declared, anchors, anchorValues, ...maps] = input;
  if (!gaugeRespectsObservationV12(gauge, anchors)) return null;
  return [declared, anchors, anchorValues, ...transformMapsV12(maps, gauge)];
};

const localIssueMask = (declared, maps) => maps.reduce(
  (mask, mapCode, index) => {
    const edge = 1 << index;
    return (declared & edge) !== 0 && mapCode !== 1 && mapCode !== 2
      ? mask | edge
      : mask;
  },
  0,
);

export const assignmentMatchesObservationV12 = (
  assignment,
  anchors,
  anchorValues,
) => (assignment & anchors) === anchorValues;

export const assignmentSatisfiesV12 = (input, assignment) => {
  const [declared, anchors, anchorValues, mapAB, mapBC, mapCA] = input;
  if (!assignmentMatchesObservationV12(assignment, anchors, anchorValues)) {
    return false;
  }
  const values = [assignment & 1, (assignment >> 1) & 1, (assignment >> 2) & 1];
  if ((declared & 1) !== 0 &&
      values[1] !== applyMapV12(mapAB, values[0])) return false;
  if ((declared & 2) !== 0 &&
      values[2] !== applyMapV12(mapBC, values[1])) return false;
  if ((declared & 4) !== 0 &&
      values[0] !== applyMapV12(mapCA, values[2])) return false;
  return true;
};

export const solutionAssignmentsV12 = (input) =>
  Array.from({length: 8}, (_, assignment) => assignment)
    .filter((assignment) => assignmentSatisfiesV12(input, assignment));

export const solutionMaskV12 = (input) => solutionAssignmentsV12(input)
  .reduce((mask, assignment) => mask | (1 << assignment), 0);

export const gaugeStabilizesV12 = (input, gauge) => {
  const [declared, anchors, , ...maps] = input;
  if (!gaugeRespectsObservationV12(gauge, anchors)) return false;
  const transformed = transformMapsV12(maps, gauge);
  return maps.every((mapCode, index) => {
    const edge = 1 << index;
    return (declared & edge) === 0 || transformed[index] === mapCode;
  });
};

export const stabilizerElementsV12 = (input) =>
  Array.from({length: 8}, (_, gauge) => gauge)
    .filter((gauge) => gaugeStabilizesV12(input, gauge));

export const stabilizerMaskV12 = (input) => stabilizerElementsV12(input)
  .reduce((mask, gauge) => mask | (1 << gauge), 0);

export const minimumAdditionalAnchorV12 = (input) => {
  const [declared, anchors, anchorValues, ...maps] = input;
  const available = 7 & ~anchors;
  return candidateOrderV12.find((candidate) =>
    (candidate & available) === candidate &&
    stabilizerMaskV12([
      declared,
      anchors | candidate,
      anchorValues,
      ...maps,
    ]) === 1) ?? -1;
};

export const packResultV12 = ({
  disposition,
  stabilizer,
  additionalAnchor,
  solutionCount,
  stabilizerOrder,
  localIssue,
}) => disposition + stabilizer * 8 + additionalAnchor * 2048 +
  solutionCount * 16384 + stabilizerOrder * 262144 + localIssue * 4194304;

export const decodeResultV12 = (packed) => ({
  dispositionCode: packed % 8,
  disposition: dispositionsV12[packed % 8] ?? 'UNKNOWN',
  stabilizerMask: Math.floor(packed / 8) % 256,
  minimumAdditionalAnchorMask: Math.floor(packed / 2048) % 8,
  solutionCount: Math.floor(packed / 16384) % 16,
  stabilizerOrder: Math.floor(packed / 262144) % 16,
  localIssueMask: Math.floor(packed / 4194304) % 8,
});

export const analyzeV12 = (input) => {
  if (!validInputV12(input)) return 0;
  const [declared, , , ...maps] = input;
  const localIssue = localIssueMask(declared, maps);
  if (localIssue !== 0) {
    return packResultV12({
      disposition: 4,
      stabilizer: 0,
      additionalAnchor: 0,
      solutionCount: 0,
      stabilizerOrder: 0,
      localIssue,
    });
  }

  const solutionCount = solutionAssignmentsV12(input).length;
  const stabilizer = stabilizerMaskV12(input);
  const stabilizerOrder = popcount8V12(stabilizer);
  const additionalAnchor = minimumAdditionalAnchorV12(input);
  if (additionalAnchor < 0) {
    return packResultV12({
      disposition: 6,
      stabilizer,
      additionalAnchor: 0,
      solutionCount,
      stabilizerOrder,
      localIssue: 0,
    });
  }
  if (solutionCount === 0) {
    return packResultV12({
      disposition: 5,
      stabilizer,
      additionalAnchor,
      solutionCount,
      stabilizerOrder,
      localIssue: 0,
    });
  }
  if (stabilizerOrder > 1) {
    return packResultV12({
      disposition: 3,
      stabilizer,
      additionalAnchor,
      solutionCount,
      stabilizerOrder,
      localIssue: 0,
    });
  }
  return packResultV12({
    disposition: solutionCount === 1 ? 1 : 2,
    stabilizer,
    additionalAnchor,
    solutionCount,
    stabilizerOrder,
    localIssue: 0,
  });
};

export const inputFromIndexV12 = (index) => [
  Math.floor(index / 4096) % 8,
  Math.floor(index / 512) % 8,
  Math.floor(index / 64) % 8,
  Math.floor(index / 16) % 4,
  Math.floor(index / 4) % 4,
  index % 4,
];
