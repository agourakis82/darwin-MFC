import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const defaultArtifact = resolve(
  repoRoot,
  'docs/research/deontic-transportability/formal/wasm/deontic_transport_finite.v0.4.wasm',
);
const artifactPath = resolve(process.argv[2] ?? defaultArtifact);
const bytes = readFileSync(artifactPath);
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

check(
  bytes.length >= 8 && bytes.subarray(0, 4).equals(Buffer.from([0, 97, 115, 109])),
  'invalid WASM magic',
);
check(WebAssembly.validate(bytes), 'WebAssembly.validate rejected the artifact');

let module;
let instance;
try {
  module = await WebAssembly.compile(bytes);
  instance = await WebAssembly.instantiate(module, {});
} catch (error) {
  errors.push(`compile or instantiate failed: ${error.message}`);
}

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
].sort();
const imports = module ? WebAssembly.Module.imports(module) : [];
const exports = module
  ? WebAssembly.Module.exports(module).map((entry) => entry.name).sort()
  : [];
check(imports.length === 0, 'kernel must have zero imports');
check(
  JSON.stringify(exports) === JSON.stringify(expectedExports),
  'WASM export surface drift',
);

let exhaustiveCases = 0;
let pairCases = 0;
let rejectionCases = 0;

if (instance) {
  const api = instance.exports;
  const invokeMany = (fn, masks, count) => {
    const padded = [...masks, 0, 0, 0, 0, 0, 0, 0, 0].slice(0, 8);
    return Number(fn(...padded.map(BigInt), BigInt(count)));
  };
  const expectedState = (identified, core) => {
    if (identified === 0) return 0;
    if (identified === 1 && core === 1) return 1;
    if (identified === 2 && core === 2) return 2;
    return 3;
  };

  for (let left = 0; left <= 3; left += 1) {
    for (let right = 0; right <= 3; right += 1) {
      check(
        Number(api.dt_union_masks(BigInt(left), BigInt(right))) === (left | right),
        `pair union mismatch for ${left},${right}`,
      );
      check(
        Number(api.dt_intersect_masks(BigInt(left), BigInt(right))) === (left & right),
        `pair intersection mismatch for ${left},${right}`,
      );
      pairCases += 1;
    }
  }

  for (let count = 0; count <= 8; count += 1) {
    const familyCount = 4 ** count;
    for (let encoded = 0; encoded < familyCount; encoded += 1) {
      let cursor = encoded;
      const masks = [];
      for (let index = 0; index < count; index += 1) {
        masks.push(cursor % 4);
        cursor = Math.floor(cursor / 4);
      }
      const expectedUnion = masks.reduce((acc, mask) => acc | mask, 0);
      const expectedIntersection = masks.reduce((acc, mask) => acc & mask, 3);
      const state = expectedState(expectedUnion, expectedIntersection);
      const expectedCode = expectedUnion + expectedIntersection * 4 + state * 16;

      check(
        invokeMany(api.dt_union_many8, masks, count) === expectedUnion,
        `union mismatch at count=${count} encoded=${encoded}`,
      );
      check(
        invokeMany(api.dt_intersect_many8, masks, count) === expectedIntersection,
        `intersection mismatch at count=${count} encoded=${encoded}`,
      );
      check(
        invokeMany(api.dt_case_code, masks, count) === expectedCode,
        `case-code mismatch at count=${count} encoded=${encoded}`,
      );
      exhaustiveCases += 1;
    }
  }

  for (const count of [-1, 9]) {
    check(invokeMany(api.dt_union_many8, [], count) === -1, `union accepted count ${count}`);
    check(
      invokeMany(api.dt_intersect_many8, [], count) === -1,
      `intersection accepted count ${count}`,
    );
    check(invokeMany(api.dt_case_code, [], count) === -1, `case accepted count ${count}`);
    rejectionCases += 3;
  }

  for (const invalidMask of [-1, 4, 9, 9223372036854775807n]) {
    for (let count = 1; count <= 8; count += 1) {
      for (let index = 0; index < count; index += 1) {
        const masks = new Array(count).fill(0);
        masks[index] = invalidMask;
        check(
          invokeMany(api.dt_union_many8, masks, count) === -1,
          `union accepted mask ${invalidMask} at ${index}/${count}`,
        );
        check(
          invokeMany(api.dt_intersect_many8, masks, count) === -1,
          `intersection accepted mask ${invalidMask} at ${index}/${count}`,
        );
        check(
          invokeMany(api.dt_case_code, masks, count) === -1,
          `case accepted mask ${invalidMask} at ${index}/${count}`,
        );
        rejectionCases += 3;
      }
    }
  }

  const inactivePadding = [1, 2, 3, 99, -1, 9, 4, 9223372036854775807n];
  check(
    invokeMany(api.dt_case_code, inactivePadding, 3) === 51,
    'inactive padded masks changed the active family result',
  );
  check(api.main() === 87n, 'self-check result is not 87');
}

const result = {
  schema: 'darwin.deontic-transport-semantic-refinement-verification.v0.4',
  artifactPath,
  artifactBytes: bytes.length,
  artifactSha256: createHash('sha256').update(bytes).digest('hex'),
  imports,
  exports,
  pairCases,
  exhaustiveCases,
  rejectionCases,
  boundedDomainComplete: exhaustiveCases === 87381,
  mainResult: instance ? String(instance.exports.main()) : null,
  clinicalDisposition: 'REFUSE',
  productionAuthorized: false,
  verified: errors.length === 0,
  errors,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
