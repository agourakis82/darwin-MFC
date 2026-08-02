import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal',
);
const wasmPath = resolve(
  formalDir,
  'wasm/deontic_transport_finite.v0.4.wasm',
);
const sourcePath = resolve(
  formalDir,
  'sounio/deontic_transport_finite_wasm_v0_4.sio',
);
const leanPath = resolve(
  formalDir,
  'lean4/DeonticTransportWasmRefinement.lean',
);
const bytes = readFileSync(wasmPath);
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const errors = [];
const check = (condition, message) => {
  if (!condition && errors.length < 64) errors.push(message);
};

check(WebAssembly.validate(bytes), 'WebAssembly.validate rejected the artifact');
const module = await WebAssembly.compile(bytes);
const imports = WebAssembly.Module.imports(module);
check(imports.length === 0, 'executable ABI must have zero imports');
const expectedExports = [
  'dt_active_masks_valid8',
  'dt_case_code',
  'dt_classify',
  'dt_contains_a',
  'dt_contains_b',
  'dt_exhaustive_bounded_self_check',
  'dt_exhaustive_walk',
  'dt_intersect_many8',
  'dt_intersect_masks',
  'dt_reference_case_code',
  'dt_union_many8',
  'dt_union_masks',
  'dt_valid_mask',
  'dt_verify_case',
  'main',
  'memory',
];
const exports = WebAssembly.Module.exports(module)
  .map((entry) => entry.name)
  .sort();
check(
  JSON.stringify(exports) === JSON.stringify(expectedExports),
  'executable ABI export surface drifted',
);
const instance = await WebAssembly.instantiate(module, {});
const api = instance.exports;

const containsA = (mask) => mask === 1 || mask === 3;
const containsB = (mask) => mask === 2 || mask === 3;
const union = (left, right) =>
  (containsA(left) || containsA(right) ? 1 : 0) +
  (containsB(left) || containsB(right) ? 2 : 0);
const intersect = (left, right) =>
  (containsA(left) && containsA(right) ? 1 : 0) +
  (containsB(left) && containsB(right) ? 2 : 0);
const classify = (identified, core) => {
  if (identified === 0) return 0;
  if (identified === 1 && core === 1) return 1;
  if (identified === 2 && core === 2) return 2;
  return 3;
};

for (let left = 0; left < 4; left += 1) {
  for (let right = 0; right < 4; right += 1) {
    check(
      Number(api.dt_union_masks(BigInt(left), BigInt(right))) === union(left, right),
      `union mismatch for ${left},${right}`,
    );
    check(
      Number(api.dt_intersect_masks(BigInt(left), BigInt(right))) ===
        intersect(left, right),
      `intersection mismatch for ${left},${right}`,
    );
  }
}

for (let mask = -1; mask <= 4; mask += 1) {
  check(
    api.dt_valid_mask(BigInt(mask)) === BigInt(mask >= 0 && mask <= 3 ? 1 : 0),
    `mask-domain mismatch for ${mask}`,
  );
}

let packedStatesChecked = 0;
for (let packed = 0; packed < 4 ** 8; packed += 1) {
  const masks = new Array(8);
  let cursor = packed;
  for (let index = 0; index < 8; index += 1) {
    masks[index] = cursor % 4;
    cursor = Math.floor(cursor / 4);
  }
  const wasmMasks = masks.map(BigInt);

  for (let count = 0; count <= 8; count += 1) {
    let expectedUnion = 0;
    let expectedIntersection = 3;
    for (let index = 0; index < count; index += 1) {
      expectedUnion = union(expectedUnion, masks[index]);
      expectedIntersection = intersect(expectedIntersection, masks[index]);
    }
    const expectedState = classify(expectedUnion, expectedIntersection);
    const expectedCaseCode =
      expectedUnion + expectedIntersection * 4 + expectedState * 16;
    const args = [...wasmMasks, BigInt(count)];

    check(
      Number(api.dt_union_many8(...args)) === expectedUnion,
      `union-many mismatch for packed=${packed}, count=${count}`,
    );
    check(
      Number(api.dt_intersect_many8(...args)) === expectedIntersection,
      `intersection-many mismatch for packed=${packed}, count=${count}`,
    );
    check(
      Number(api.dt_case_code(...args)) === expectedCaseCode,
      `case-code mismatch for packed=${packed}, count=${count}`,
    );
    packedStatesChecked += 1;
  }
}

const zeroMasks = new Array(8).fill(0n);
for (const invalidCount of [-1n, 9n]) {
  const args = [...zeroMasks, invalidCount];
  check(api.dt_union_many8(...args) === -1n, `union accepted count ${invalidCount}`);
  check(
    api.dt_intersect_many8(...args) === -1n,
    `intersection accepted count ${invalidCount}`,
  );
  check(api.dt_case_code(...args) === -1n, `case-code accepted count ${invalidCount}`);
}

let invalidActiveMaskCases = 0;
for (let index = 0; index < 8; index += 1) {
  for (const invalidMask of [-1n, 4n]) {
    const masks = [...zeroMasks];
    masks[index] = invalidMask;
    const args = [...masks, BigInt(index + 1)];
    check(
      api.dt_active_masks_valid8(...args) === 0n,
      `active-mask validator accepted ${invalidMask} at ${index}`,
    );
    check(
      api.dt_union_many8(...args) === -1n,
      `union accepted active mask ${invalidMask} at ${index}`,
    );
    check(
      api.dt_intersect_many8(...args) === -1n,
      `intersection accepted active mask ${invalidMask} at ${index}`,
    );
    check(
      api.dt_case_code(...args) === -1n,
      `case-code accepted active mask ${invalidMask} at ${index}`,
    );
    invalidActiveMaskCases += 1;
  }
}

let invalidInactiveMaskCases = 0;
for (let index = 0; index < 8; index += 1) {
  const masks = [...zeroMasks];
  masks[index] = 99n;
  const count = BigInt(index);
  const args = [...masks, count];
  const expectedIntersection = index === 0 ? 3n : 0n;
  const expectedCaseCode = index === 0 ? 12n : 0n;
  check(
    api.dt_active_masks_valid8(...args) === 1n,
    `inactive padding at ${index} contaminated validation`,
  );
  check(
    api.dt_union_many8(...args) === 0n,
    `inactive padding at ${index} contaminated union`,
  );
  check(
    api.dt_intersect_many8(...args) === expectedIntersection,
    `inactive padding at ${index} contaminated intersection`,
  );
  check(
    api.dt_case_code(...args) === expectedCaseCode,
    `inactive padding at ${index} contaminated case-code`,
  );
  invalidInactiveMaskCases += 1;
}
check(api.main() === 87n, 'artifact self-check did not return 87');

const result = {
  schema: 'darwin.deontic-transport-wasm-exhaustive-refinement.v0.4',
  wasmSha256: sha256(bytes),
  sounioSourceSha256: sha256(readFileSync(sourcePath)),
  leanSpecificationSha256: sha256(readFileSync(leanPath)),
  imports,
  exports,
  maskPairsChecked: 16,
  packedStatesChecked,
  canonicalFamiliesRepresented: (4 ** 9 - 1) / 3,
  unusedSlotNoninterferenceCovered: true,
  invalidCountsRefused: [-1, 9],
  invalidActiveMaskCasesRefused: invalidActiveMaskCases,
  invalidInactiveMaskCasesIgnored: invalidInactiveMaskCases,
  mainResult: String(api.main()),
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
