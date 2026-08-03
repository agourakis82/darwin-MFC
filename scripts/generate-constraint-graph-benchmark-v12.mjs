import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  allowedEdgeMaskV12,
  analyzeGraphV12,
  decodeGraphResultV12,
  edgeMaskForPairsV12,
  graphSolutionsV12,
  graphStabilizersV12,
  vertexMaskV12,
} from './constraint-graph-oracle-v12.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/vectors/constraint-graph-benchmark.v1.2.json',
);
const seed = 0x4e484746;
let state = seed;
const next = () => {
  state ^= state << 13;
  state ^= state >>> 17;
  state ^= state << 5;
  return state >>> 0;
};
const families = ['path', 'cycle', 'star', 'complete', 'disconnected', 'random'];

const pairsFor = (family, vertexCount) => {
  if (family === 'path') {
    return Array.from({length: Math.max(0, vertexCount - 1)}, (_, index) =>
      [index, index + 1]);
  }
  if (family === 'cycle') {
    const path = pairsFor('path', vertexCount);
    return vertexCount >= 3 ? [...path, [0, vertexCount - 1]] : path;
  }
  if (family === 'star') {
    return Array.from({length: Math.max(0, vertexCount - 1)}, (_, index) =>
      [0, index + 1]);
  }
  if (family === 'complete') {
    const pairs = [];
    for (let left = 0; left < vertexCount; left += 1) {
      for (let right = left + 1; right < vertexCount; right += 1) {
        pairs.push([left, right]);
      }
    }
    return pairs;
  }
  if (family === 'disconnected') {
    const pairs = [];
    for (let left = 0; left + 1 < vertexCount; left += 2) {
      pairs.push([left, left + 1]);
    }
    return pairs;
  }
  return null;
};

const familyVertexCount = (family) => {
  if (family === 'cycle') return 3 + (next() % 4);
  if (family === 'disconnected') return 4 + (next() % 3);
  return 1 + (next() % 6);
};

const makeCandidate = (family) => {
  const vertexCount = familyVertexCount(family);
  const pairs = pairsFor(family, vertexCount);
  const allowed = allowedEdgeMaskV12(vertexCount);
  const edgeMask = pairs === null ? next() & allowed : edgeMaskForPairsV12(pairs);
  const parityMask = next() & edgeMask;
  const anchorMask = next() & vertexMaskV12(vertexCount);
  const anchorValueMask = next() & anchorMask;
  return [vertexCount, edgeMask, parityMask, anchorMask, anchorValueMask];
};

const sentinels = [
  ['path', [6, edgeMaskForPairsV12(pairsFor('path', 6)), 0, 0, 0]],
  ['path', [6, edgeMaskForPairsV12(pairsFor('path', 6)), 0, 1, 0]],
  ['cycle', [3, edgeMaskForPairsV12(pairsFor('cycle', 3)), 0, 0, 0]],
  ['cycle', [3, edgeMaskForPairsV12(pairsFor('cycle', 3)), 1, 0, 0]],
  ['star', [6, edgeMaskForPairsV12(pairsFor('star', 6)), 0, 0, 0]],
  ['star', [6, edgeMaskForPairsV12(pairsFor('star', 6)), 0, 1, 1]],
  ['complete', [6, allowedEdgeMaskV12(6), 0, 0, 0]],
  ['complete', [6, allowedEdgeMaskV12(6), 0, 1, 0]],
  ['disconnected', [6, edgeMaskForPairsV12(pairsFor('disconnected', 6)), 0, 0, 0]],
  ['disconnected', [6, edgeMaskForPairsV12(pairsFor('disconnected', 6)), 0, 21, 0]],
  ['random', [1, 0, 0, 0, 0]],
  ['random', [6, 32767, 1, 0, 0]],
];

const seen = new Set();
const familyCounts = Object.fromEntries(families.map((family) => [family, 0]));
const vectors = [];
const add = (family, input) => {
  const key = input.join(',');
  if (seen.has(key) || familyCounts[family] >= 256) return false;
  seen.add(key);
  const packed = analyzeGraphV12(input);
  const decoded = decodeGraphResultV12(packed);
  vectors.push({
    id: `cgb12-${String(vectors.length).padStart(4, '0')}`,
    family,
    input,
    expectedPacked: packed,
    expectedDisposition: decoded.disposition,
    expectedSolutionCount: graphSolutionsV12(input).length,
    expectedStabilizerOrder: graphStabilizersV12(input).length,
  });
  familyCounts[family] += 1;
  return true;
};

for (const [family, input] of sentinels) add(family, input);
for (const family of families) {
  let attempts = 0;
  while (familyCounts[family] < 256 && attempts < 2_000_000) {
    add(family, makeCandidate(family));
    attempts += 1;
  }
  if (familyCounts[family] !== 256) {
    throw new Error(`${family} generated ${familyCounts[family]} unique vectors`);
  }
}

vectors.sort((left, right) =>
  families.indexOf(left.family) - families.indexOf(right.family) ||
  left.input.join(',').localeCompare(right.input.join(','), 'en'));
for (let index = 0; index < vectors.length; index += 1) {
  vectors[index].id = `cgb12-${String(index).padStart(4, '0')}`;
}
const oraclePath = resolve(repoRoot, 'scripts/constraint-graph-oracle-v12.mjs');
const sourcePath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/sounio/constraint_graph_benchmark_v1_2.sio',
);
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const document = {
  schema: 'darwin.constraint-graph-benchmark.v1.2',
  generatedAt: '2026-08-03T12:00:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  seed,
  generator: {
    path: relative(repoRoot, fileURLToPath(import.meta.url)).replaceAll('\\', '/'),
  },
  oracle: {
    path: relative(repoRoot, oraclePath).replaceAll('\\', '/'),
    sha256: sha256(readFileSync(oraclePath)),
  },
  sounioSource: {
    path: relative(repoRoot, sourcePath).replaceAll('\\', '/'),
    sha256: sha256(readFileSync(sourcePath)),
  },
  dimensions: {
    maximumVertices: 6,
    maximumEdges: 15,
    cases: vectors.length,
    casesPerFamily: familyCounts,
    families,
  },
  vectors,
};
mkdirSync(dirname(outputPath), {recursive: true});
writeFileSync(outputPath, `${JSON.stringify(document, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  schema: 'darwin.constraint-graph-benchmark-generation.v1.2',
  outputPath: relative(repoRoot, outputPath).replaceAll('\\', '/'),
  cases: vectors.length,
  familyCounts,
  sha256: sha256(readFileSync(outputPath)),
}, null, 2)}\n`);
