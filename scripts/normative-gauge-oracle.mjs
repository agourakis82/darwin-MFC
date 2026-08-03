export const dispositions = [
  'REFUSE',
  'GLOBALLY_FLAT',
  'BIND_TRANSLATIONS',
  'ABSTAIN_NONTRIVIAL_HOLONOMY',
  'REVIEW_LOCAL_PROOF',
  'REFUSE_INTERNAL_INCONSISTENCY',
  'REFUSE_GAUGE_ANOMALY',
  'RESERVED',
];

const candidateOrder = [0, 1, 2, 4, 3, 5, 6, 7];

export const popcount = (mask) => {
  let count = 0;
  for (let bit = 0; bit < 7; bit += 1) {
    if ((mask & (1 << bit)) !== 0) count += 1;
  }
  return count;
};

export const subset = (left, right) => (left & right) === left;

export const validInput = ([declared, bound, mapAB, mapBC, mapCA]) =>
  Number.isInteger(declared) && declared >= 0 && declared <= 7 &&
  Number.isInteger(bound) && bound >= 0 && bound <= 7 && subset(bound, declared) &&
  [mapAB, mapBC, mapCA].every(
    (mapCode) => Number.isInteger(mapCode) && mapCode >= 0 && mapCode <= 3,
  );

export const applyMap = (mapCode, input) => (mapCode >> input) & 1;

const locallyInvalid = (declared, maps) => {
  let mask = 0;
  for (let index = 0; index < 3; index += 1) {
    const edge = 1 << index;
    if ((declared & edge) !== 0 && maps[index] !== 1 && maps[index] !== 2) {
      mask |= edge;
    }
  }
  return mask;
};

const satisfies = (declared, maps, assignment) => {
  const [mapAB, mapBC, mapCA] = maps;
  const valueA = assignment & 1;
  const valueB = (assignment >> 1) & 1;
  const valueC = (assignment >> 2) & 1;
  if ((declared & 1) !== 0 && valueB !== applyMap(mapAB, valueA)) return false;
  if ((declared & 2) !== 0 && valueC !== applyMap(mapBC, valueB)) return false;
  if ((declared & 4) !== 0 && valueA !== applyMap(mapCA, valueC)) return false;
  return true;
};

const solutions = (declared, maps) =>
  Array.from({length: 8}, (_, assignment) => assignment)
    .filter((assignment) => satisfies(declared, maps, assignment));

const basisSufficient = (declared, candidate, maps) =>
  subset(candidate, declared) &&
  Array.from({length: 8}, (_, assignment) => assignment).every(
    (assignment) => !satisfies(candidate, maps, assignment) ||
      satisfies(declared, maps, assignment),
  );

const minimum = (predicate) => candidateOrder.find(predicate) ?? -1;
const inheritedPack = (disposition, certificateMask) =>
  disposition + certificateMask * 8 +
  (((certificateMask & 1) !== 0 ? 1 : 0) +
    ((certificateMask & 2) !== 0 ? 1 : 0) +
    ((certificateMask & 4) !== 0 ? 1 : 0)) * 64;

export const analyze = (input) => {
  if (!validInput(input)) return 0;
  const [declared, bound, ...maps] = input;
  const issue = locallyInvalid(declared, maps);
  if (issue !== 0) return inheritedPack(4, issue);
  if (solutions(declared, maps).length === 0) return inheritedPack(3, declared);
  const basis = minimum(
    (candidate) => subset(candidate, bound) && basisSufficient(declared, candidate, maps),
  );
  if (basis >= 0) return inheritedPack(1, basis);
  const unbound = declared & ~bound;
  const binding = minimum(
    (candidate) => subset(candidate, unbound) &&
      basisSufficient(declared, bound | candidate, maps),
  );
  if (binding >= 0) return inheritedPack(2, binding);
  return 5;
};

export const repairCut = (input) => {
  if (!validInput(input)) return -1;
  const [declared, , ...maps] = input;
  if (locallyInvalid(declared, maps) !== 0) return -1;
  if (solutions(declared, maps).length > 0) return 0;
  return minimum(
    (candidate) => candidate !== 0 && subset(candidate, declared) &&
      solutions(declared & ~candidate, maps).length > 0,
  );
};

const xor = (left, right) => left === right ? 0 : 1;
const gaugeBit = (gauge, vertex) => (gauge & vertex) === vertex ? 1 : 0;

export const transformMap = (mapCode, sourceFlip, targetFlip) => {
  const outputZero = xor(targetFlip, applyMap(mapCode, xor(0, sourceFlip)));
  const outputOne = xor(targetFlip, applyMap(mapCode, xor(1, sourceFlip)));
  return outputZero + outputOne * 2;
};

export const transformMaps = ([mapAB, mapBC, mapCA], gauge) => [
  transformMap(mapAB, gaugeBit(gauge, 1), gaugeBit(gauge, 2)),
  transformMap(mapBC, gaugeBit(gauge, 2), gaugeBit(gauge, 4)),
  transformMap(mapCA, gaugeBit(gauge, 4), gaugeBit(gauge, 1)),
];

export const transformInput = ([declared, bound, ...maps], gauge) =>
  [declared, bound, ...transformMaps(maps, gauge)];

export const encodeMaps = ([mapAB, mapBC, mapCA]) =>
  mapAB * 16 + mapBC * 4 + mapCA;

export const orbitEncodings = (maps) =>
  Array.from({length: 8}, (_, gauge) => encodeMaps(transformMaps(maps, gauge)));

export const canonicalRepresentative = (maps) => Math.min(...orbitEncodings(maps));
export const orbitCardinality = (maps) => new Set(orbitEncodings(maps)).size;

const anomalyMask = (analyzer, input) => {
  const baseline = analyzer(input);
  let mask = 0;
  for (let gauge = 1; gauge < 8; gauge += 1) {
    if (analyzer(transformInput(input, gauge)) !== baseline) mask |= 1 << (gauge - 1);
  }
  return mask;
};

export const analyzerAnomalyMask = (input) =>
  validInput(input) ? anomalyMask(analyze, input) : 0;

export const repairAnomalyMask = (input) =>
  validInput(input) ? anomalyMask(repairCut, input) : 0;

export const certificateAnomalyMask = (maps) => {
  const baselineCanonical = canonicalRepresentative(maps);
  const baselineCardinality = orbitCardinality(maps);
  let mask = 0;
  for (let gauge = 1; gauge < 8; gauge += 1) {
    const transformed = transformMaps(maps, gauge);
    if (canonicalRepresentative(transformed) !== baselineCanonical ||
        orbitCardinality(transformed) !== baselineCardinality) {
      mask |= 1 << (gauge - 1);
    }
  }
  return mask;
};

export const packGaugeResult = ({
  disposition,
  inherited,
  canonical,
  orbit,
  analyzerAnomaly,
  repairAnomaly,
  certificateAnomaly,
}) => disposition + inherited * 8 + canonical * 2048 + orbit * 131072 +
  analyzerAnomaly * 2097152 + repairAnomaly * 268435456 +
  certificateAnomaly * 34359738368;

export const gaugeAnalyze = (input) => {
  if (!validInput(input)) return 0;
  const inherited = analyze(input);
  const maps = input.slice(2);
  const canonical = canonicalRepresentative(maps);
  const orbit = orbitCardinality(maps);
  const analyzerAnomaly = analyzerAnomalyMask(input);
  const repairAnomaly = repairAnomalyMask(input);
  const certificateAnomaly = certificateAnomalyMask(maps);
  const disposition = analyzerAnomaly !== 0 || repairAnomaly !== 0 ||
    certificateAnomaly !== 0 ? 6 : inherited % 8;
  return packGaugeResult({
    disposition,
    inherited,
    canonical,
    orbit,
    analyzerAnomaly,
    repairAnomaly,
    certificateAnomaly,
  });
};

export const decodeGaugeResult = (packed) => ({
  dispositionCode: packed % 8,
  disposition: dispositions[packed % 8] ?? 'UNKNOWN',
  inherited: Math.floor(packed / 8) % 256,
  canonicalRepresentative: Math.floor(packed / 2048) % 64,
  orbitCardinality: Math.floor(packed / 131072) % 16,
  analyzerAnomalyMask: Math.floor(packed / 2097152) % 128,
  repairAnomalyMask: Math.floor(packed / 268435456) % 128,
  certificateAnomalyMask: Math.floor(packed / 34359738368) % 128,
});

export const mutantOutput = (mutant, input) => {
  const inherited = analyze(input);
  const [declared, , mapAB, mapBC, mapCA] = input;
  if (mutant === 1) return inherited * 4 + mapAB;
  if (mutant === 2) return inherited * 4 + mapBC;
  if (mutant === 3) return inherited * 4 + mapCA;
  if (mutant === 4) return inherited * 64 + encodeMaps([mapAB, mapBC, mapCA]);
  if (mutant === 5) return inherited * 2 + applyMap(mapAB, 0);
  if (mutant === 6) {
    return inherited * 2 + (satisfies(declared, [mapAB, mapBC, mapCA], 0) ? 1 : 0);
  }
  return inherited;
};

export const mutantAnomalyMask = (mutant, input) =>
  anomalyMask((candidate) => mutantOutput(mutant, candidate), input);

export const inputFromIndex = (index) => [
  Math.floor(index / 512) % 8,
  Math.floor(index / 64) % 8,
  Math.floor(index / 16) % 4,
  Math.floor(index / 4) % 4,
  index % 4,
];
