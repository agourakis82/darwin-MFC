import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  analyzeGraphV12,
  decodeGraphResultV12,
  graphDispositionsV12,
  graphSolutionsV12,
  graphStabilizersV12,
  transformGraphInputV12,
} from './constraint-graph-oracle-v12.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');
const sourcePath = resolve(formalDir, 'sounio/constraint_graph_benchmark_v1_2.sio');
const wasmPath = resolve(formalDir, 'wasm-v1.2/constraint_graph_benchmark.v1.2.wasm');
const vectorsPath = resolve(formalDir, 'vectors/constraint-graph-benchmark.v1.2.json');
const transcriptPath = resolve(formalDir, 'transcripts/constraint-graph-benchmark.v1.2.txt');
const evidencePath = resolve(formalDir, 'evidence/constraint-graph-benchmark.v1.2.json');
const writeEvidence = process.argv.includes('--write-evidence');
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

const source = readFileSync(sourcePath, 'utf8');
const wasmBytes = readFileSync(wasmPath);
const benchmark = JSON.parse(readFileSync(vectorsPath));
check(WebAssembly.validate(wasmBytes), 'benchmark WASM failed validation');
check(!/\bwith\s+IO\b/.test(source), 'benchmark source gained IO');
check(!/\b(selector|first_solution|selected_assignment)\b/.test(source),
  'benchmark source contains a singular selector');
const module = await WebAssembly.compile(wasmBytes);
const instance = await WebAssembly.instantiate(module, {});
const imports = WebAssembly.Module.imports(module);
const exports = WebAssembly.Module.exports(module).map((entry) => entry.name).sort();
const sourceFunctions = [...source.matchAll(/^fn\s+([A-Za-z0-9_]+)\s*\(/gm)]
  .map((match) => match[1]);
const expectedExports = [...sourceFunctions, 'memory'].sort();
const singularWitnessExports = exports.filter((name) =>
  /(selector|first_solution|selected_assignment|solution_mask)/.test(name));
check(imports.length === 0, 'benchmark WASM has imports');
check(JSON.stringify(exports) === JSON.stringify(expectedExports),
  'benchmark WASM export surface drift');
check(singularWitnessExports.length === 0, 'benchmark exports a singular witness');
const call = (name, input = []) =>
  Number(instance.exports[name](...input.map(BigInt)));

let vectorMismatches = 0;
let gaugeChecks = 0;
let gaugeMismatches = 0;
let affineTorsorChecks = 0;
let affineTorsorMismatches = 0;
let hiddenSelectorAnomalies = 0;
let hiddenSelectorCasesKilled = 0;
let inconsistentCases = 0;
let uniqueCases = 0;
let stabilizerCases = 0;
const familyCensus = {};
const dispositionCensus = Object.fromEntries(
  graphDispositionsV12.map((name) => [name, 0]),
);
const transcript = [];

for (const vector of benchmark.vectors ?? []) {
  const actualPacked = call('cgb12_analyze', vector.input);
  const expectedPacked = analyzeGraphV12(vector.input);
  const decoded = decodeGraphResultV12(actualPacked);
  const solutions = graphSolutionsV12(vector.input);
  const stabilizers = graphStabilizersV12(vector.input);
  const actualSolutions = call('cgb12_solution_count', vector.input);
  const actualStabilizers = call('cgb12_stabilizer_order', [
    vector.input[0],
    vector.input[1],
    vector.input[3],
  ]);
  if (actualPacked !== expectedPacked || actualPacked !== vector.expectedPacked ||
      actualSolutions !== vector.expectedSolutionCount ||
      actualStabilizers !== vector.expectedStabilizerOrder ||
      decoded.disposition !== vector.expectedDisposition) vectorMismatches += 1;

  familyCensus[vector.family] = (familyCensus[vector.family] ?? 0) + 1;
  dispositionCensus[decoded.disposition] =
    (dispositionCensus[decoded.disposition] ?? 0) + 1;
  if (decoded.disposition === 'ABSTAIN_NO_GLOBAL_SECTION') inconsistentCases += 1;
  if (decoded.disposition === 'UNIQUE_WITHIN_DECLARED_MODEL') uniqueCases += 1;
  if (decoded.disposition === 'ABSTAIN_STABILIZER_OBSTRUCTION') stabilizerCases += 1;
  if (solutions.length > 0) {
    affineTorsorChecks += 1;
    if (solutions.length !== stabilizers.length) affineTorsorMismatches += 1;
  }

  let selectorCaseKilled = false;
  const selected = solutions.length === 0 ? -1 : Math.min(...solutions);
  const gaugeLimit = 1 << vector.input[0];
  for (let gauge = 0; gauge < gaugeLimit; gauge += 1) {
    const transformed = transformGraphInputV12(vector.input, gauge);
    const transformedPacked = call('cgb12_analyze', transformed);
    gaugeChecks += 1;
    if (transformedPacked !== actualPacked ||
        analyzeGraphV12(transformed) !== expectedPacked) gaugeMismatches += 1;
    if (selected < 0) continue;
    const transformedSolutions = graphSolutionsV12(transformed);
    const transformedSelected = Math.min(...transformedSolutions);
    if (transformedSelected !== (selected ^ gauge)) {
      hiddenSelectorAnomalies += 1;
      selectorCaseKilled = true;
    }
  }
  if (selectorCaseKilled) hiddenSelectorCasesKilled += 1;
  transcript.push([
    vector.id,
    vector.family,
    vector.input.join(','),
    actualPacked,
    actualSolutions,
    actualStabilizers,
  ].join('|'));
}

check(benchmark.vectors?.length === 1536, 'benchmark case cardinality drift');
check(new Set(benchmark.vectors.map((vector) => vector.input.join(','))).size === 1536,
  'benchmark contains duplicate inputs');
check(JSON.stringify(familyCensus) === JSON.stringify({
  path: 256,
  cycle: 256,
  star: 256,
  complete: 256,
  disconnected: 256,
  random: 256,
}), 'benchmark family balance drift');
check(vectorMismatches === 0, `benchmark vector mismatches: ${vectorMismatches}`);
check(gaugeChecks > 0, 'gauge action was not exercised');
check(gaugeMismatches === 0, `general graph gauge mismatches: ${gaugeMismatches}`);
check(affineTorsorChecks > 0, 'affine torsor law was not exercised');
check(affineTorsorMismatches === 0,
  `solution/stabilizer torsor mismatches: ${affineTorsorMismatches}`);
check(inconsistentCases > 0, 'no globally inconsistent graph was exercised');
check(uniqueCases > 0, 'no uniquely constrained graph was exercised');
check(stabilizerCases > 0, 'no stabilizer obstruction was exercised');
check(hiddenSelectorAnomalies > 0 && hiddenSelectorCasesKilled > 0,
  'coordinate-sensitive minimum selector survived');

const hostileInputs = [
  [0, 0, 0, 0, 0],
  [7, 0, 0, 0, 0],
  [3, 4, 0, 0, 0],
  [3, 1, 2, 0, 0],
  [3, 0, 0, 8, 0],
  [3, 0, 0, 0, 1],
];
let hostileRefusals = 0;
for (const input of hostileInputs) {
  if (call('cgb12_analyze', input) === 0 && analyzeGraphV12(input) === 0) {
    hostileRefusals += 1;
  }
}
check(hostileRefusals === hostileInputs.length,
  'an invalid graph ABI escaped REFUSE');
const mainResult = call('main');
check(mainResult === 131, `benchmark Sounio self-check returned ${mainResult}`);

const transcriptBytes = Buffer.from(`${transcript.join('\n')}\n`);
const result = {
  schema: 'darwin.constraint-graph-benchmark-verification.v1.2',
  generatedAt: '2026-08-03T12:00:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  benchmark: {
    path: fromRoot(vectorsPath),
    bytes: readFileSync(vectorsPath).length,
    sha256: sha256(readFileSync(vectorsPath)),
    cases: benchmark.vectors.length,
    familyCensus,
    dispositionCensus,
    inconsistentCases,
    uniqueCases,
    stabilizerCases,
  },
  canonicalWasm: {
    path: fromRoot(wasmPath),
    bytes: wasmBytes.length,
    sha256: sha256(wasmBytes),
    imports,
    exports,
    singularWitnessExportCount: singularWitnessExports.length,
    mainResult,
  },
  source: {
    path: fromRoot(sourcePath),
    bytes: Buffer.byteLength(source),
    sha256: sha256(source),
    hasIO: /\bwith\s+IO\b/.test(source),
  },
  parity: {
    vectorMismatches,
    gaugeChecks,
    gaugeMismatches,
    affineTorsorChecks,
    affineTorsorMismatches,
  },
  mutationAdequacy: {
    mutant: 'minimum numeric satisfying assignment',
    hiddenSelectorAnomalies,
    casesKilled: hiddenSelectorCasesKilled,
    killed: hiddenSelectorAnomalies > 0,
  },
  hostileAbi: {cases: hostileInputs.length, refused: hostileRefusals},
  transcript: {
    path: fromRoot(transcriptPath),
    encoding: 'id|family|input|packed|solutionCount|stabilizerOrder',
    lines: transcript.length,
    bytes: transcriptBytes.length,
    sha256: sha256(transcriptBytes),
  },
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(transcriptPath), {recursive: true});
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(transcriptPath, transcriptBytes);
  writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
