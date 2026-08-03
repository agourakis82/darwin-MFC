import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  analyzeGraphV12,
  graphSolutionsV12,
  graphStabilizersV12,
} from './constraint-graph-oracle-v12.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');
const packageDir = resolve(formalDir, 'reproduction-v1.2');
const benchmarkPath = resolve(
  formalDir,
  'vectors/constraint-graph-benchmark.v1.2.json',
);
const rustPath = resolve(
  formalDir,
  'rust/no_hidden_gauge_fixing_oracle_v1_2.rs',
);
const inputPath = resolve(packageDir, 'blind-inputs.v1.2.txt');
const manifestPath = resolve(packageDir, 'blind-reproduction-manifest.v1.2.json');
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const benchmark = JSON.parse(readFileSync(benchmarkPath));
const seed = 'darwin-nhgf-blind-reproduction-v1.2';
const selected = [];
for (const family of benchmark.dimensions.families) {
  const candidates = benchmark.vectors.filter((vector) => vector.family === family)
    .map((vector) => ({
      vector,
      rank: sha256(`${seed}|${vector.id}|${vector.input.join(',')}`),
    }))
    .sort((left, right) => left.rank.localeCompare(right.rank, 'en'))
    .slice(0, 64)
    .map((entry) => entry.vector);
  selected.push(...candidates);
}
selected.sort((left, right) => left.id.localeCompare(right.id, 'en'));

const inputText = [
  '# darwin.no-hidden-gauge-fixing.blind-inputs.v1.2',
  '# format: vector-id|vertexCount,edgeMask,parityMask,anchorMask,anchorValueMask',
  '# expected values are committed by hash in the manifest and omitted here',
  ...selected.map((vector) => `${vector.id}|${vector.input.join(',')}`),
  '',
].join('\n');
const expectedText = `${selected.map((vector) => [
  vector.id,
  analyzeGraphV12(vector.input),
  graphSolutionsV12(vector.input).length,
  graphStabilizersV12(vector.input).length,
].join('|')).join('\n')}\n`;
const familyCounts = Object.fromEntries(benchmark.dimensions.families.map((family) => [
  family,
  selected.filter((vector) => vector.family === family).length,
]));
const manifest = {
  schema: 'darwin.blind-cross-language-reproduction-manifest.v1.2',
  generatedAt: '2026-08-03T12:00:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  packageState: 'READY_FOR_EXTERNAL_REPRODUCTION',
  implementationIndependentReproductionComplete: false,
  externalHumanReproductionComplete: false,
  selection: {
    algorithm: 'SHA-256 rank within each family',
    seed,
    cases: selected.length,
    familyCounts,
  },
  inputs: {
    path: relative(repoRoot, inputPath).replaceAll('\\', '/'),
    bytes: Buffer.byteLength(inputText),
    sha256: sha256(inputText),
  },
  expectedCommitment: {
    disclosedInInputPackage: false,
    encoding: 'vector-id|packed|solutionCount|stabilizerOrder',
    lines: selected.length,
    bytes: Buffer.byteLength(expectedText),
    sha256: sha256(expectedText),
  },
  sourceLineage: {
    benchmark: {
      path: relative(repoRoot, benchmarkPath).replaceAll('\\', '/'),
      sha256: sha256(readFileSync(benchmarkPath)),
    },
    rustOracle: {
      path: relative(repoRoot, rustPath).replaceAll('\\', '/'),
      sha256: sha256(readFileSync(rustPath)),
      externalCrates: 0,
    },
  },
  command: '<compiled-rust-oracle> graph-transcript <blind-inputs.v1.2.txt>',
  attestationRequiredForExternalCompletion:
    'signed third-party attestation bound to input, output, source, compiler and environment hashes',
};

mkdirSync(packageDir, {recursive: true});
writeFileSync(inputPath, inputText);
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  schema: 'darwin.blind-reproduction-package-generation.v1.2',
  cases: selected.length,
  familyCounts,
  inputSha256: sha256(readFileSync(inputPath)),
  expectedCommitmentSha256: sha256(expectedText),
  manifestSha256: sha256(readFileSync(manifestPath)),
}, null, 2)}\n`);
