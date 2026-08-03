import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildTranscriptSource} from './generate-normative-holonomy-native-transcript.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/normative-holonomy/formal');
const defaultWasmPath = resolve(formalDir, 'wasm/normative_holonomy.v0.9.wasm');
const vectorsPath = resolve(formalDir, 'vectors/normative-holonomy-vectors.v0.9.json');
const transcriptPath = resolve(formalDir, 'transcripts/canonical-domain.v0.9.txt');
const canonicalSourcePath = resolve(formalDir, 'sounio/normative_holonomy_v0_9.sio');
const nativeTranscriptSourcePath = resolve(
  formalDir,
  'transcripts/normative_holonomy_transcript_v0_9.sio',
);
const nativeTranscriptGeneratorPath = resolve(
  repoRoot,
  'scripts/generate-normative-holonomy-native-transcript.mjs',
);
const evidencePath = resolve(formalDir, 'evidence/runtime-verification.v0.9.json');
const arguments_ = process.argv.slice(2);
const writeEvidence = arguments_.includes('--write-evidence');
const artifactArgument = arguments_.find((argument) => !argument.startsWith('--'));
const wasmPath = resolve(artifactArgument ?? defaultWasmPath);

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const pathFromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

const wasmBytes = readFileSync(wasmPath);
const canonicalSource = readFileSync(canonicalSourcePath, 'utf8');
const nativeTranscriptSource = readFileSync(nativeTranscriptSourcePath, 'utf8');
check(
  nativeTranscriptSource === buildTranscriptSource(canonicalSource),
  'native transcript source is not the deterministic transform of canonical source',
);
check(
  wasmBytes.length >= 8 && wasmBytes.subarray(0, 4).equals(Buffer.from([0, 97, 115, 109])),
  'invalid WASM magic',
);
check(WebAssembly.validate(wasmBytes), 'WebAssembly.validate rejected the artifact');

let wasmModule;
let instance;
try {
  wasmModule = await WebAssembly.compile(wasmBytes);
  instance = await WebAssembly.instantiate(wasmModule, {});
} catch (error) {
  errors.push(`WASM compile or instantiate failed: ${error.message}`);
}

const expectedExports = [
  'main',
  'memory',
  'nhy_abi_valid',
  'nhy_analyze',
  'nhy_apply_map',
  'nhy_assignment_satisfies',
  'nhy_basis_sufficient',
  'nhy_contains',
  'nhy_exhaustive_self_check',
  'nhy_exhaustive_walk',
  'nhy_has_global_section',
  'nhy_local_issue_mask',
  'nhy_map_bijective',
  'nhy_minimal_basis',
  'nhy_minimal_binding',
  'nhy_pack',
  'nhy_popcount',
  'nhy_rank',
  'nhy_reference_analyze',
  'nhy_reference_best_basis',
  'nhy_reference_best_binding',
  'nhy_reference_consider_basis',
  'nhy_reference_consider_binding',
  'nhy_reference_consider_cut',
  'nhy_reference_has_global_section',
  'nhy_reference_repair_cut',
  'nhy_repair_cut',
  'nhy_score',
  'nhy_subset',
  'nhy_valid_map',
  'nhy_valid_mask',
  'nhy_verify_case',
].sort();
const imports = wasmModule ? WebAssembly.Module.imports(wasmModule) : [];
const exports = wasmModule
  ? WebAssembly.Module.exports(wasmModule).map((entry) => entry.name).sort()
  : [];
check(imports.length === 0, 'kernel must have zero imports');
check(JSON.stringify(exports) === JSON.stringify(expectedExports), 'WASM export surface drift');

const dispositions = [
  'REFUSE',
  'GLOBALLY_FLAT',
  'BIND_TRANSLATIONS',
  'ABSTAIN_NONTRIVIAL_HOLONOMY',
  'REVIEW_LOCAL_PROOF',
  'REFUSE_INTERNAL_INCONSISTENCY',
];
const candidateOrder = [0, 1, 2, 4, 3, 5, 6, 7];
const popcount = (mask) => ((mask & 1) !== 0 ? 1 : 0) +
  ((mask & 2) !== 0 ? 1 : 0) + ((mask & 4) !== 0 ? 1 : 0);
const subset = (left, right) => (left & right) === left;
const validInput = ([declared, bound, mapAB, mapBC, mapCA]) =>
  Number.isInteger(declared) && declared >= 0 && declared <= 7 &&
  Number.isInteger(bound) && bound >= 0 && bound <= 7 && subset(bound, declared) &&
  [mapAB, mapBC, mapCA].every(
    (mapCode) => Number.isInteger(mapCode) && mapCode >= 0 && mapCode <= 3,
  );
const applyMap = (mapCode, input) => (mapCode >> input) & 1;
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
  const a = assignment & 1;
  const b = (assignment >> 1) & 1;
  const c = (assignment >> 2) & 1;
  if ((declared & 1) !== 0 && b !== applyMap(mapAB, a)) return false;
  if ((declared & 2) !== 0 && c !== applyMap(mapBC, b)) return false;
  if ((declared & 4) !== 0 && a !== applyMap(mapCA, c)) return false;
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
const pack = (disposition, certificateMask) =>
  disposition + certificateMask * 8 + popcount(certificateMask) * 64;
const decodePacked = (packed) => ({
  dispositionCode: packed & 7,
  disposition: dispositions[packed & 7] ?? 'UNKNOWN',
  certificateMask: (packed >> 3) & 7,
  certificateCardinality: (packed >> 6) & 3,
});

const oracleAnalyze = (input) => {
  if (!validInput(input)) return 0;
  const [declared, bound, ...maps] = input;
  const issue = locallyInvalid(declared, maps);
  if (issue !== 0) return pack(4, issue);
  if (solutions(declared, maps).length === 0) return pack(3, declared);
  const basis = minimum(
    (candidate) => subset(candidate, bound) && basisSufficient(declared, candidate, maps),
  );
  if (basis >= 0) return pack(1, basis);
  const unbound = declared & ~bound;
  const binding = minimum(
    (candidate) => subset(candidate, unbound) &&
      basisSufficient(declared, bound | candidate, maps),
  );
  if (binding >= 0) return pack(2, binding);
  return 5;
};

const oracleRepairCut = (input) => {
  if (!validInput(input)) return -1;
  const [declared, , ...maps] = input;
  if (locallyInvalid(declared, maps) !== 0) return -1;
  if (solutions(declared, maps).length > 0) return 0;
  return minimum(
    (candidate) => candidate !== 0 && subset(candidate, declared) &&
      solutions(declared & ~candidate, maps).length > 0,
  );
};

const call = (name, input) => Number(instance.exports[name](...input.map(BigInt)));
const census = Object.fromEntries(dispositions.map((name) => [name, 0]));
let canonicalStates = 0;
let canonicalValidStates = 0;
let canonicalMismatches = 0;
let sounioReferenceMismatches = 0;
const transcript = [];

if (instance) {
  for (let index = 0; index < 4096; index += 1) {
    const mapCA = index % 4;
    const mapBC = Math.floor(index / 4) % 4;
    const mapAB = Math.floor(index / 16) % 4;
    const bound = Math.floor(index / 64) % 8;
    const declared = Math.floor(index / 512) % 8;
    const input = [declared, bound, mapAB, mapBC, mapCA];
    const expected = oracleAnalyze(input);
    const expectedRepair = oracleRepairCut(input);
    const actual = call('nhy_analyze', input);
    const actualRepair = call('nhy_repair_cut', input);
    const internalReference = call('nhy_reference_analyze', input);
    const internalRepair = call('nhy_reference_repair_cut', input);
    if (actual !== expected || actualRepair !== expectedRepair) canonicalMismatches += 1;
    if (internalReference !== expected || internalRepair !== expectedRepair) {
      sounioReferenceMismatches += 1;
    }
    if (validInput(input)) canonicalValidStates += 1;
    const decoded = decodePacked(actual);
    census[decoded.disposition] = (census[decoded.disposition] ?? 0) + 1;
    transcript.push(`${index}|${actual}|${actualRepair}`);
    canonicalStates += 1;
  }
}

check(canonicalStates === 4096, 'canonical domain cardinality drift');
check(canonicalMismatches === 0, `canonical oracle mismatches: ${canonicalMismatches}`);
check(
  sounioReferenceMismatches === 0,
  `Sounio independent-reference mismatches: ${sounioReferenceMismatches}`,
);

const hostileMasks = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
const hostileMaps = [-1, 0, 1, 2, 3, 4];
let hostileStates = 0;
let hostileInvalidStates = 0;
let hostileMismatches = 0;
if (instance) {
  for (const declared of hostileMasks) {
    for (const bound of hostileMasks) {
      for (const mapAB of hostileMaps) {
        for (const mapBC of hostileMaps) {
          for (const mapCA of hostileMaps) {
            const input = [declared, bound, mapAB, mapBC, mapCA];
            const expected = oracleAnalyze(input);
            const expectedRepair = oracleRepairCut(input);
            const actual = call('nhy_analyze', input);
            const actualRepair = call('nhy_repair_cut', input);
            if (actual !== expected || actualRepair !== expectedRepair) hostileMismatches += 1;
            if (!validInput(input)) hostileInvalidStates += 1;
            hostileStates += 1;
          }
        }
      }
    }
  }
}
check(hostileStates === 21600, 'hostile domain cardinality drift');
check(hostileMismatches === 0, `hostile oracle mismatches: ${hostileMismatches}`);

const vectors = JSON.parse(readFileSync(vectorsPath, 'utf8'));
const vectorResults = [];
for (const vector of vectors.vectors ?? []) {
  const actualPacked = instance ? call('nhy_analyze', vector.input) : null;
  const actualRepairCut = instance ? call('nhy_repair_cut', vector.input) : null;
  const decoded = actualPacked === null ? null : decodePacked(actualPacked);
  const passed = actualPacked === vector.expectedPacked &&
    actualRepairCut === vector.expectedRepairCut &&
    decoded?.disposition === vector.expectedDisposition &&
    decoded?.certificateMask === vector.expectedCertificateMask;
  check(passed, `vector failed: ${vector.id}`);
  vectorResults.push({id: vector.id, actualPacked, actualRepairCut, passed});
}

const mainResult = instance ? Number(instance.exports.main()) : null;
check(mainResult === 109, `self-check result is ${mainResult}, expected 109`);
const transcriptText = `${transcript.join('\n')}\n`;
const transcriptBytes = Buffer.from(transcriptText);
const mutated = Buffer.from(wasmBytes);
if (mutated.length > 0) mutated[mutated.length - 1] ^= 1;
const mutationDetected = sha256(mutated) !== sha256(wasmBytes);
check(mutationDetected, 'single-byte artifact mutation was not detected by SHA-256');

const generatedAt = process.env.SOURCE_DATE_EPOCH
  ? new Date(Number(process.env.SOURCE_DATE_EPOCH) * 1000).toISOString()
  : new Date().toISOString();
const result = {
  schema: 'darwin.normative-holonomy-runtime-verification.v0.9',
  generatedAt,
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  wasm: {
    path: pathFromRoot(wasmPath),
    bytes: wasmBytes.length,
    sha256: sha256(wasmBytes),
    runtimeValidated: WebAssembly.validate(wasmBytes),
    imports,
    exports,
    mainResult,
  },
  boundedDomain: {
    canonicalStates,
    canonicalValidStates,
    canonicalMismatches,
    sounioReferenceMismatches,
    hostileStates,
    hostileInvalidStates,
    hostileMismatches,
    census,
  },
  transcript: {
    path: pathFromRoot(transcriptPath),
    lines: transcript.length,
    bytes: transcriptBytes.length,
    sha256: sha256(transcriptBytes),
    encoding: 'index|packedDispositionAndCertificate|repairCutMask',
  },
  nativeTranscriptSource: {
    path: pathFromRoot(nativeTranscriptSourcePath),
    sha256: sha256(Buffer.from(nativeTranscriptSource)),
    bytes: Buffer.byteLength(nativeTranscriptSource),
    generatorPath: pathFromRoot(nativeTranscriptGeneratorPath),
    generatorSha256: sha256(readFileSync(nativeTranscriptGeneratorPath)),
    deterministicTransformVerified:
      nativeTranscriptSource === buildTranscriptSource(canonicalSource),
  },
  vectors: {
    path: pathFromRoot(vectorsPath),
    sha256: sha256(readFileSync(vectorsPath)),
    cases: vectorResults.length,
    passed: vectorResults.filter((entry) => entry.passed).length,
    results: vectorResults,
  },
  integrity: {
    algorithm: 'SHA-256',
    singleByteMutationDetected: mutationDetected,
  },
  independentOracle: {
    language: 'JavaScript',
    strategy: 'enumerate all Boolean assignments and cardinality-ranked edge subsets',
    reusesSounioImplementation: false,
    typescriptClinicalMathematics: false,
  },
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(transcriptPath), {recursive: true});
  mkdirSync(dirname(evidencePath), {recursive: true});
  writeFileSync(transcriptPath, transcriptText);
  writeFileSync(evidencePath, `${JSON.stringify(result, null, 2)}\n`);
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
