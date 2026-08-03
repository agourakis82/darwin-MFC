import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildNormativeGaugeSource} from './generate-normative-gauge-source.mjs';
import {buildTranscriptSource} from './generate-normative-gauge-native-transcript.mjs';
import {
  analyzerAnomalyMask,
  analyze,
  canonicalRepresentative,
  certificateAnomalyMask,
  decodeGaugeResult,
  dispositions,
  gaugeAnalyze,
  inputFromIndex,
  mutantAnomalyMask,
  orbitCardinality,
  popcount,
  repairAnomalyMask,
  repairCut,
  transformInput,
  transformMaps,
  validInput,
} from './normative-gauge-oracle.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/normative-gauge/formal');
const defaultWasmPath = resolve(formalDir, 'wasm/normative_gauge.v1.0.wasm');
const sourcePath = resolve(formalDir, 'sounio/normative_gauge_v1_0.sio');
const parentSourcePath = resolve(
  repoRoot,
  'docs/research/normative-holonomy/formal/sounio/normative_holonomy_v0_9.sio',
);
const sourceGeneratorPath = resolve(repoRoot, 'scripts/generate-normative-gauge-source.mjs');
const oraclePath = resolve(repoRoot, 'scripts/normative-gauge-oracle.mjs');
const vectorsPath = resolve(formalDir, 'vectors/normative-gauge-vectors.v1.0.json');
const transcriptPath = resolve(formalDir, 'transcripts/canonical-domain.v1.0.txt');
const transcriptSourcePath = resolve(
  formalDir,
  'transcripts/normative_gauge_transcript_v1_0.sio',
);
const transcriptGeneratorPath = resolve(
  repoRoot,
  'scripts/generate-normative-gauge-native-transcript.mjs',
);
const evidencePath = resolve(formalDir, 'evidence/runtime-verification.v1.0.json');
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
const source = readFileSync(sourcePath, 'utf8');
const parentSource = readFileSync(parentSourcePath, 'utf8');
const transcriptSource = readFileSync(transcriptSourcePath, 'utf8');
check(
  source === buildNormativeGaugeSource(parentSource),
  'canonical source is not the deterministic transform of Normative Holonomy v0.9',
);
check(
  transcriptSource === buildTranscriptSource(source),
  'transcript source is not the deterministic transform of canonical source',
);
check(!/\bwith\s+IO\b/.test(source), 'canonical source gained an IO effect');
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

const sourceFunctions = [...source.matchAll(/^fn\s+([A-Za-z0-9_]+)\s*\(/gm)]
  .map((match) => match[1]);
const expectedExports = [...sourceFunctions, 'memory'].sort();
const imports = wasmModule ? WebAssembly.Module.imports(wasmModule) : [];
const exports = wasmModule
  ? WebAssembly.Module.exports(wasmModule).map((entry) => entry.name).sort()
  : [];
check(imports.length === 0, 'kernel must have zero imports');
check(
  JSON.stringify(exports) === JSON.stringify(expectedExports),
  `WASM export surface drift: expected ${expectedExports.length}, observed ${exports.length}`,
);

const call = (name, input = []) => Number(instance.exports[name](...input.map(BigInt)));
const dispositionCensus = Object.fromEntries(dispositions.map((name) => [name, 0]));
const orbitCardinalityCensus = {};
const orbitRepresentatives = new Set();
let transformationChecks = 0;
let transformationMismatches = 0;
let groupCompositionChecks = 0;
let groupCompositionMismatches = 0;
let canonicalStates = 0;
let canonicalValidStates = 0;
let canonicalMismatches = 0;
let gaugeChecks = 0;
let gaugeMismatches = 0;
let nontrivialGaugeChecks = 0;
let canonicalAnalyzerAnomalies = 0;
let canonicalRepairAnomalies = 0;
let canonicalCertificateAnomalies = 0;
const transcript = [];

if (instance) {
  for (let encoded = 0; encoded < 64; encoded += 1) {
    const maps = [
      Math.floor(encoded / 16) % 4,
      Math.floor(encoded / 4) % 4,
      encoded % 4,
    ];
    for (let gauge = 0; gauge < 8; gauge += 1) {
      const expected = transformMaps(maps, gauge);
      const actual = [
        call('ng_transform_map_ab', [maps[0], gauge]),
        call('ng_transform_map_bc', [maps[1], gauge]),
        call('ng_transform_map_ca', [maps[2], gauge]),
      ];
      for (let edge = 0; edge < 3; edge += 1) {
        if (actual[edge] !== expected[edge]) transformationMismatches += 1;
        transformationChecks += 1;
      }
      for (let secondGauge = 0; secondGauge < 8; secondGauge += 1) {
        const composed = [
          call('ng_transform_map_ab', [actual[0], secondGauge]),
          call('ng_transform_map_bc', [actual[1], secondGauge]),
          call('ng_transform_map_ca', [actual[2], secondGauge]),
        ];
        const expectedComposed = transformMaps(maps, gauge ^ secondGauge);
        if (JSON.stringify(composed) !== JSON.stringify(expectedComposed)) {
          groupCompositionMismatches += 1;
        }
        groupCompositionChecks += 1;
      }
    }
  }

  for (let index = 0; index < 4096; index += 1) {
    const input = inputFromIndex(index);
    const maps = input.slice(2);
    const expectedInherited = analyze(input);
    const expectedRepair = repairCut(input);
    const expectedCanonical = canonicalRepresentative(maps);
    const expectedOrbit = orbitCardinality(maps);
    const expectedAnalyzerAnomaly = analyzerAnomalyMask(input);
    const expectedRepairAnomaly = repairAnomalyMask(input);
    const expectedCertificateAnomaly = certificateAnomalyMask(maps);
    const expectedRich = gaugeAnalyze(input);
    const actualInherited = call('nhy_analyze', input);
    const actualRepair = call('nhy_repair_cut', input);
    const actualCanonical = call('ng_canonical_representative', maps);
    const actualOrbit = call('ng_orbit_cardinality', maps);
    const actualAnalyzerAnomaly = call('ng_analyzer_anomaly_mask', input);
    const actualRepairAnomaly = call('ng_repair_anomaly_mask', input);
    const actualCertificateAnomaly = call('ng_certificate_anomaly_mask', maps);
    const actualRich = call('ng_analyze', input);

    if (actualInherited !== expectedInherited || actualRepair !== expectedRepair ||
        actualCanonical !== expectedCanonical || actualOrbit !== expectedOrbit ||
        actualAnalyzerAnomaly !== expectedAnalyzerAnomaly ||
        actualRepairAnomaly !== expectedRepairAnomaly ||
        actualCertificateAnomaly !== expectedCertificateAnomaly ||
        actualRich !== expectedRich) {
      canonicalMismatches += 1;
    }
    if (actualAnalyzerAnomaly !== 0) canonicalAnalyzerAnomalies += 1;
    if (actualRepairAnomaly !== 0) canonicalRepairAnomalies += 1;
    if (actualCertificateAnomaly !== 0) canonicalCertificateAnomalies += 1;

    for (let gauge = 0; gauge < 8; gauge += 1) {
      const transformed = transformInput(input, gauge);
      const transformedRich = call('ng_analyze', transformed);
      const transformedRepair = call('nhy_repair_cut', transformed);
      if (transformedRich !== actualRich || transformedRepair !== actualRepair) {
        gaugeMismatches += 1;
      }
      gaugeChecks += 1;
      if (gauge !== 0) nontrivialGaugeChecks += 1;
    }

    const decoded = decodeGaugeResult(actualRich);
    dispositionCensus[decoded.disposition] =
      (dispositionCensus[decoded.disposition] ?? 0) + 1;
    orbitCardinalityCensus[String(actualOrbit)] =
      (orbitCardinalityCensus[String(actualOrbit)] ?? 0) + 1;
    orbitRepresentatives.add(actualCanonical);
    if (validInput(input)) canonicalValidStates += 1;
    transcript.push(
      `${index}|${actualRich}|${actualRepair}|${actualCanonical}|${actualOrbit}`,
    );
    canonicalStates += 1;
  }
}

check(transformationChecks === 1536, 'edge transformation check cardinality drift');
check(
  transformationMismatches === 0,
  `edge transformation oracle mismatches: ${transformationMismatches}`,
);
check(groupCompositionChecks === 4096, 'gauge group-law check cardinality drift');
check(
  groupCompositionMismatches === 0,
  `gauge group-law mismatches: ${groupCompositionMismatches}`,
);
check(canonicalStates === 4096, 'canonical domain cardinality drift');
check(canonicalValidStates === 1728, 'canonical valid-state cardinality drift');
check(canonicalMismatches === 0, `canonical oracle mismatches: ${canonicalMismatches}`);
check(gaugeChecks === 32768, 'complete gauge-orbit check cardinality drift');
check(nontrivialGaugeChecks === 28672, 'nontrivial gauge check cardinality drift');
check(gaugeMismatches === 0, `gauge metamorphic mismatches: ${gaugeMismatches}`);
check(canonicalAnalyzerAnomalies === 0, 'canonical analyzer has gauge anomalies');
check(canonicalRepairAnomalies === 0, 'canonical repair has gauge anomalies');
check(canonicalCertificateAnomalies === 0, 'canonical certificate has gauge anomalies');
check(orbitRepresentatives.size === 9, 'Boolean map orbit count drift');
check(
  orbitCardinalityCensus['4'] === 512 && orbitCardinalityCensus['8'] === 3584,
  'orbit-cardinality census drift',
);

const mutantResults = [];
for (let mutant = 1; mutant <= 6; mutant += 1) {
  let statesWithAnomaly = 0;
  let gaugeViolations = 0;
  let oracleMismatches = 0;
  let minimalCounterexample = null;
  for (let index = 0; index < 4096; index += 1) {
    const input = inputFromIndex(index);
    const expectedMask = mutantAnomalyMask(mutant, input);
    const actualMask = instance
      ? call('ng_mutant_anomaly_mask', [mutant, ...input])
      : 0;
    if (actualMask !== expectedMask) oracleMismatches += 1;
    if (actualMask !== 0) {
      statesWithAnomaly += 1;
      gaugeViolations += popcount(actualMask);
      if (!minimalCounterexample) {
        const lowestBit = Math.floor(Math.log2(actualMask & -actualMask));
        minimalCounterexample = {
          index,
          input,
          gauge: lowestBit + 1,
          anomalyMask: actualMask,
        };
      }
    }
  }
  check(oracleMismatches === 0, `mutant ${mutant} oracle mismatches: ${oracleMismatches}`);
  check(statesWithAnomaly > 0, `mutant ${mutant} survived the gauge suite`);
  mutantResults.push({
    mutant,
    statesChecked: 4096,
    statesWithAnomaly,
    gaugeViolations,
    oracleMismatches,
    killed: statesWithAnomaly > 0,
    minimalCounterexample,
  });
}
check(mutantResults.every((entry) => entry.killed), 'not every gauge-sensitive mutant was killed');

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
            const expectedRich = gaugeAnalyze(input);
            const expectedRepair = repairCut(input);
            const actualRich = call('ng_analyze', input);
            const actualRepair = call('nhy_repair_cut', input);
            if (actualRich !== expectedRich || actualRepair !== expectedRepair) {
              hostileMismatches += 1;
            }
            if (!validInput(input)) hostileInvalidStates += 1;
            hostileStates += 1;
          }
        }
      }
    }
  }
}
check(hostileStates === 21600, 'hostile domain cardinality drift');
check(hostileInvalidStates === 19872, 'hostile invalid-state cardinality drift');
check(hostileMismatches === 0, `hostile oracle mismatches: ${hostileMismatches}`);

const vectors = JSON.parse(readFileSync(vectorsPath, 'utf8'));
const vectorResults = [];
for (const vector of vectors.vectors ?? []) {
  const actualRich = instance ? call('ng_analyze', vector.input) : null;
  const actualRepairCut = instance ? call('nhy_repair_cut', vector.input) : null;
  const decoded = actualRich === null ? null : decodeGaugeResult(actualRich);
  const passed = actualRich === vector.expectedRich &&
    actualRepairCut === vector.expectedRepairCut &&
    decoded?.disposition === vector.expectedDisposition &&
    (actualRich === 0 || (
      decoded?.canonicalRepresentative === vector.expectedCanonicalRepresentative &&
      decoded?.orbitCardinality === vector.expectedOrbitCardinality
    ));
  check(passed, `vector failed: ${vector.id}`);
  vectorResults.push({id: vector.id, actualRich, actualRepairCut, passed});
}

const mainResult = instance ? call('main') : null;
check(mainResult === 110, `self-check result is ${mainResult}, expected 110`);
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
  schema: 'darwin.normative-gauge-runtime-verification.v1.0',
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
    expectedExportCount: expectedExports.length,
    mainResult,
  },
  boundedDomain: {
    canonicalStates,
    canonicalValidStates,
    canonicalMismatches,
    hostileStates,
    hostileInvalidStates,
    hostileMismatches,
    dispositionCensus,
  },
  gaugeOrbit: {
    group: 'C2^3',
    gaugesPerState: 8,
    transformationChecks,
    transformationMismatches,
    groupCompositionChecks,
    groupCompositionMismatches,
    gaugeChecks,
    nontrivialGaugeChecks,
    gaugeMismatches,
    mapOrbitClasses: orbitRepresentatives.size,
    orbitCardinalityCensus,
    canonicalAnalyzerAnomalies,
    canonicalRepairAnomalies,
    canonicalCertificateAnomalies,
  },
  mutationAdequacy: {
    mutants: mutantResults.length,
    killed: mutantResults.filter((entry) => entry.killed).length,
    results: mutantResults,
  },
  transcript: {
    path: pathFromRoot(transcriptPath),
    lines: transcript.length,
    bytes: transcriptBytes.length,
    sha256: sha256(transcriptBytes),
    encoding: 'index|richGaugeResult|repairCutMask|canonicalRepresentative|orbitCardinality',
  },
  sourceLineage: {
    parentPath: pathFromRoot(parentSourcePath),
    parentSha256: sha256(parentSource),
    sourcePath: pathFromRoot(sourcePath),
    sourceSha256: sha256(source),
    sourceBytes: Buffer.byteLength(source),
    sourceGeneratorPath: pathFromRoot(sourceGeneratorPath),
    sourceGeneratorSha256: sha256(readFileSync(sourceGeneratorPath)),
    deterministicParentTransformVerified: source === buildNormativeGaugeSource(parentSource),
    canonicalSourceHasIO: /\bwith\s+IO\b/.test(source),
  },
  nativeTranscriptSource: {
    path: pathFromRoot(transcriptSourcePath),
    sha256: sha256(transcriptSource),
    bytes: Buffer.byteLength(transcriptSource),
    generatorPath: pathFromRoot(transcriptGeneratorPath),
    generatorSha256: sha256(readFileSync(transcriptGeneratorPath)),
    deterministicTransformVerified: transcriptSource === buildTranscriptSource(source),
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
    path: pathFromRoot(oraclePath),
    sha256: sha256(readFileSync(oraclePath)),
    language: 'JavaScript',
    strategy: 'independent assignment enumeration plus explicit finite group action',
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
