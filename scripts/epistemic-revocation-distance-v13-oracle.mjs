export const erd13StateClasses = Object.freeze({
  IDENTIFIED: 278537,
  MODEL_LOSS: 294913,
  SYMMETRY_LOSS: 540673,
  JOINT_LOSS: 557059,
});

export const erd13StateClassOrder = Object.freeze([
  erd13StateClasses.IDENTIFIED,
  erd13StateClasses.MODEL_LOSS,
  erd13StateClasses.SYMMETRY_LOSS,
  erd13StateClasses.JOINT_LOSS,
]);

export const erd13Dispositions = Object.freeze({
  INVALID: 0,
  FRAGILE: 1,
  ROBUST_WITHIN_ENUMERATION: 2,
  BASE_NOT_IDENTIFIED: 3,
});

export const validMaskV13 = (mask) =>
  Number.isInteger(mask) && mask >= 0 && mask <= 7;

export const subsetV13 = (subset, superset) =>
  (subset & superset) === subset;

export const popcount3V13 = (mask) =>
  Number((mask & 1) !== 0) +
  Number((mask & 2) !== 0) +
  Number((mask & 4) !== 0);

export const cutBitV13 = (cut) => 1 << cut;

export const dispositionV13 = (packed) => packed % 8;

export const solutionCountV13 = (packed) => Math.floor(packed / 16384) % 16;

export const stabilizerOrderV13 = (packed) => Math.floor(packed / 262144) % 16;

export const identifiedV13 = (state) =>
  state > 0 &&
  dispositionV13(state) === 1 &&
  solutionCountV13(state) === 1 &&
  stabilizerOrderV13(state) === 1;

export const stateLosesV13 = (state, mode = 0) => {
  if (state <= 0) return true;
  const modelLoss = solutionCountV13(state) === 1 ? 0 : 1;
  const symmetryLoss = stabilizerOrderV13(state) === 1 ? 0 : 1;
  if (mode === 1) return modelLoss === 1;
  if (mode === 2) return symmetryLoss === 1;
  return dispositionV13(state) !== 1 || modelLoss === 1 || symmetryLoss === 1;
};

export const inputValidV13 = (active, states) => {
  if (!validMaskV13(active) || states.length !== 8) return false;
  return states.every((state, cut) =>
    subsetV13(cut, active)
      ? Number.isInteger(state) && state > 0
      : state === -1,
  );
};

const distanceV13 = (active, states, mode) => {
  let distance = 4;
  for (let cut = 0; cut < 8; cut += 1) {
    if (!subsetV13(cut, active) || !stateLosesV13(states[cut], mode)) continue;
    distance = Math.min(distance, popcount3V13(cut));
  }
  return distance;
};

const minimumCutFamilyV13 = (active, states, distance) => {
  if (distance >= 4) return 0;
  let family = 0;
  for (let cut = 0; cut < 8; cut += 1) {
    if (subsetV13(cut, active) &&
        popcount3V13(cut) === distance &&
        stateLosesV13(states[cut], 0)) {
      family |= cutBitV13(cut);
    }
  }
  return family;
};

export const criticalReceiptsV13 = (family) => {
  let critical = 0;
  for (let cut = 1; cut < 8; cut += 1) {
    if ((family & cutBitV13(cut)) !== 0) critical |= cut;
  }
  return critical;
};

export const packResultV13 = ({
  disposition,
  jointDistance,
  modelDistance,
  symmetryDistance,
  family,
  critical,
  active,
}) => disposition + jointDistance * 8 + modelDistance * 64 +
  symmetryDistance * 512 + family * 4096 +
  critical * 1048576 + active * 8388608;

export const decodeResultV13 = (packed) => ({
  disposition: packed % 8,
  jointDistance: Math.floor(packed / 8) % 8,
  modelDistance: Math.floor(packed / 64) % 8,
  symmetryDistance: Math.floor(packed / 512) % 8,
  minimumCutFamily: Math.floor(packed / 4096) % 256,
  criticalReceiptMask: Math.floor(packed / 1048576) % 8,
  activeReceiptMask: Math.floor(packed / 8388608) % 8,
});

export const analyzeV13 = (active, states) => {
  if (!inputValidV13(active, states)) return 0;
  if (!identifiedV13(states[0])) {
    return packResultV13({
      disposition: erd13Dispositions.BASE_NOT_IDENTIFIED,
      jointDistance: 0,
      modelDistance: 0,
      symmetryDistance: 0,
      family: 1,
      critical: 0,
      active,
    });
  }

  const jointDistance = distanceV13(active, states, 0);
  const modelDistance = distanceV13(active, states, 1);
  const symmetryDistance = distanceV13(active, states, 2);
  const family = minimumCutFamilyV13(active, states, jointDistance);
  return packResultV13({
    disposition: jointDistance >= 4
      ? erd13Dispositions.ROBUST_WITHIN_ENUMERATION
      : erd13Dispositions.FRAGILE,
    jointDistance,
    modelDistance,
    symmetryDistance,
    family,
    critical: criticalReceiptsV13(family),
    active,
  });
};

export const profileCountV13 = (active) =>
  4 ** (2 ** popcount3V13(active));

export const statesFromProfileV13 = (active, profileCode) => {
  if (!validMaskV13(active) || !Number.isInteger(profileCode) || profileCode < 0 ||
      profileCode >= profileCountV13(active)) return null;
  const states = Array(8).fill(-1);
  let remainder = profileCode;
  for (let cut = 0; cut < 8; cut += 1) {
    if (!subsetV13(cut, active)) continue;
    states[cut] = erd13StateClassOrder[remainder % 4];
    remainder = Math.floor(remainder / 4);
  }
  return states;
};

export const statesFromBlockersV13 = (active, blockerMasks) => {
  if (!validMaskV13(active) || blockerMasks.length === 0 ||
      blockerMasks.some((mask) => mask === 0 || !subsetV13(mask, active))) {
    return null;
  }
  return Array.from({length: 8}, (_unused, cut) => {
    if (!subsetV13(cut, active)) return -1;
    const restoresBadSymmetry = blockerMasks.some((blocker) => subsetV13(blocker, cut));
    return restoresBadSymmetry
      ? erd13StateClasses.JOINT_LOSS
      : erd13StateClasses.IDENTIFIED;
  });
};

export const exactBlockerResultV13 = (active, blockerMasks) => {
  const states = statesFromBlockersV13(active, blockerMasks);
  if (states === null) return null;
  const minimumDistance = Math.min(...blockerMasks.map(popcount3V13));
  const minimumBlockers = [...new Set(blockerMasks)]
    .filter((mask) => popcount3V13(mask) === minimumDistance)
    .sort((left, right) => left - right);
  const minimumCutFamily = minimumBlockers
    .reduce((family, cut) => family | cutBitV13(cut), 0);
  return {
    states,
    expectedPacked: analyzeV13(active, states),
    expected: {
      distance: minimumDistance,
      minimumCuts: minimumBlockers,
      minimumCutFamily,
      criticalReceiptMask: criticalReceiptsV13(minimumCutFamily),
    },
  };
};
