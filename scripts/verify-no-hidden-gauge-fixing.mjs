import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildMutantSource} from './generate-no-hidden-gauge-fixing-mutant-source.mjs';
import {buildTranscriptSource} from './generate-no-hidden-gauge-fixing-native-transcript.mjs';
import {
  analyze,
  candidateOrder,
  decodeResult,
  dispositions,
  inputFromIndex,
  minimumAdditionalAnchor,
  mutantAnomalyMask,
  popcount,
  solutionAssignments,
  solutionMask,
  stabilizerElements,
  stabilizerMask,
  transformAssignment,
  transformInput,
  transformMaps,
  validInput,
} from './no-hidden-gauge-fixing-oracle.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');
const canonicalWasmPath = resolve(
  formalDir,
  'wasm/no_hidden_gauge_fixing.v1.1.wasm',
);
const mutantWasmPath = resolve(
  formalDir,
  'wasm/no_hidden_gauge_fixing_mutants.v1.1.wasm',
);
const sourcePath = resolve(formalDir, 'sounio/no_hidden_gauge_fixing_v1_1.sio');
const mutantSourcePath = resolve(
  formalDir,
  'sounio/no_hidden_gauge_fixing_mutants_v1_1.sio',
);
const transcriptSourcePath = resolve(
  formalDir,
  'transcripts/no_hidden_gauge_fixing_transcript_v1_1.sio',
);
const transcriptPath = resolve(formalDir, 'transcripts/canonical-domain.v1.1.txt');
const vectorsPath = resolve(
  formalDir,
  'vectors/no-hidden-gauge-fixing-vectors.v1.1.json',
);
const evidencePath = resolve(formalDir, 'evidence/runtime-verification.v1.1.json');
const oraclePath = resolve(repoRoot, 'scripts/no-hidden-gauge-fixing-oracle.mjs');
const mutantGeneratorPath = resolve(
  repoRoot,
  'scripts/generate-no-hidden-gauge-fixing-mutant-source.mjs',
);
const transcriptGeneratorPath = resolve(
  repoRoot,
  'scripts/generate-no-hidden-gauge-fixing-native-transcript.mjs',
);
const vectorGeneratorPath = resolve(
  repoRoot,
  'scripts/generate-no-hidden-gauge-fixing-vectors.mjs',
);
const writeEvidence = process.argv.includes('--write-evidence');

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

const canonicalBytes = readFileSync(canonicalWasmPath);
const mutantBytes = readFileSync(mutantWasmPath);
const source = readFileSync(sourcePath, 'utf8');
const mutantSource = readFileSync(mutantSourcePath, 'utf8');
const transcriptSource = readFileSync(transcriptSourcePath, 'utf8');

check(mutantSource === buildMutantSource(source), 'mutant source transform drift');
check(transcriptSource === buildTranscriptSource(source), 'transcript source transform drift');
check(!/\bwith\s+IO\b/.test(source), 'canonical source gained an IO effect');
check(!/\bnhgfm_/.test(source), 'canonical source contains adversarial selector code');
check(!/\bselector\b/.test(source), 'canonical source exposes a singular selector');

const validateWasm = (bytes, label) => {
  check(
    bytes.length >= 8 && bytes.subarray(0, 4).equals(Buffer.from([0, 97, 115, 109])),
    `${label} has invalid WASM magic`,
  );
  check(WebAssembly.validate(bytes), `${label} failed WebAssembly.validate`);
};
validateWasm(canonicalBytes, 'canonical artifact');
validateWasm(mutantBytes, 'mutant artifact');

let canonicalModule;
let mutantModule;
let canonicalInstance;
let mutantInstance;
try {
  canonicalModule = await WebAssembly.compile(canonicalBytes);
  canonicalInstance = await WebAssembly.instantiate(canonicalModule, {});
  mutantModule = await WebAssembly.compile(mutantBytes);
  mutantInstance = await WebAssembly.instantiate(mutantModule, {});
} catch (error) {
  errors.push(`WASM compile or instantiate failed: ${error.message}`);
}

const sourceFunctions = (text) => [...text.matchAll(/^fn\s+([A-Za-z0-9_]+)\s*\(/gm)]
  .map((match) => match[1]);
const canonicalExpectedExports = [...sourceFunctions(source), 'memory'].sort();
const mutantExpectedExports = [...sourceFunctions(mutantSource), 'memory'].sort();
const canonicalImports = canonicalModule ? WebAssembly.Module.imports(canonicalModule) : [];
const mutantImports = mutantModule ? WebAssembly.Module.imports(mutantModule) : [];
const canonicalExports = canonicalModule
  ? WebAssembly.Module.exports(canonicalModule).map((entry) => entry.name).sort()
  : [];
const mutantExports = mutantModule
  ? WebAssembly.Module.exports(mutantModule).map((entry) => entry.name).sort()
  : [];
check(canonicalImports.length === 0, 'canonical artifact must have zero imports');
check(mutantImports.length === 0, 'mutant artifact must have zero imports');
check(
  JSON.stringify(canonicalExports) === JSON.stringify(canonicalExpectedExports),
  `canonical export drift: expected ${canonicalExpectedExports.length}, observed ${canonicalExports.length}`,
);
check(
  JSON.stringify(mutantExports) === JSON.stringify(mutantExpectedExports),
  `mutant export drift: expected ${mutantExpectedExports.length}, observed ${mutantExports.length}`,
);
check(
  canonicalExports.every((name) => !/(selector|first_solution|transform_assignment|nhgfm_)/.test(name)),
  'canonical export surface can emit a singular witness',
);

const call = (instance, name, input = []) =>
  Number(instance.exports[name](...input.map(BigInt)));

let transformationChecks = 0;
let transformationMismatches = 0;
let groupCompositionChecks = 0;
let groupCompositionMismatches = 0;
if (canonicalInstance) {
  for (let encoded = 0; encoded < 64; encoded += 1) {
    const maps = [
      Math.floor(encoded / 16) % 4,
      Math.floor(encoded / 4) % 4,
      encoded % 4,
    ];
    for (let gauge = 0; gauge < 8; gauge += 1) {
      const expected = transformMaps(maps, gauge);
      const actual = [
        call(canonicalInstance, 'nhgf_transform_map_ab', [maps[0], gauge]),
        call(canonicalInstance, 'nhgf_transform_map_bc', [maps[1], gauge]),
        call(canonicalInstance, 'nhgf_transform_map_ca', [maps[2], gauge]),
      ];
      for (let edge = 0; edge < 3; edge += 1) {
        if (actual[edge] !== expected[edge]) transformationMismatches += 1;
        transformationChecks += 1;
      }
      for (let secondGauge = 0; secondGauge < 8; secondGauge += 1) {
        const composed = [
          call(canonicalInstance, 'nhgf_transform_map_ab', [actual[0], secondGauge]),
          call(canonicalInstance, 'nhgf_transform_map_bc', [actual[1], secondGauge]),
          call(canonicalInstance, 'nhgf_transform_map_ca', [actual[2], secondGauge]),
        ];
        if (JSON.stringify(composed) !==
            JSON.stringify(transformMaps(maps, gauge ^ secondGauge))) {
          groupCompositionMismatches += 1;
        }
        groupCompositionChecks += 1;
      }
    }
  }
}

let canonicalStates = 0;
let canonicalMismatches = 0;
let gaugeChecks = 0;
let gaugeMismatches = 0;
let nontrivialGaugeChecks = 0;
let subgroupChecks = 0;
let subgroupMismatches = 0;
let minimumAnchorChecks = 0;
let minimumAnchorMismatches = 0;
let obstructionFixedPointChecks = 0;
let obstructionFixedPointsFound = 0;
const dispositionCensus = Object.fromEntries(dispositions.map((name) => [name, 0]));
const stabilizerOrderCensus = {};
const minimumAnchorCensus = {};
const transcript = [];

if (canonicalInstance) {
  for (let index = 0; index < 4096; index += 1) {
    const input = inputFromIndex(index);
    const [declared, anchors, ...maps] = input;
    const expectedPacked = analyze(input);
    const expectedStabilizer = stabilizerMask(input);
    const expectedMinimumAnchor = minimumAdditionalAnchor(input);
    const expectedSolutionMask = solutionMask(declared, maps);
    const expectedSolutionCount = popcount(expectedSolutionMask);
    const expectedStabilizerOrder = popcount(expectedStabilizer);
    const actualPacked = call(canonicalInstance, 'nhgf_analyze', input);
    const actualStabilizer = call(canonicalInstance, 'nhgf_stabilizer_mask', input);
    const actualMinimumAnchor = call(
      canonicalInstance,
      'nhgf_minimal_additional_anchor',
      input,
    );
    const actualSolutionMask = call(
      canonicalInstance,
      'nhgf_solution_mask',
      [declared, ...maps],
    );
    const actualSolutionCount = call(
      canonicalInstance,
      'nhgf_popcount8',
      [actualSolutionMask],
    );
    const actualStabilizerOrder = call(
      canonicalInstance,
      'nhgf_popcount8',
      [actualStabilizer],
    );
    if (actualPacked !== expectedPacked || actualStabilizer !== expectedStabilizer ||
        actualMinimumAnchor !== expectedMinimumAnchor ||
        actualSolutionMask !== expectedSolutionMask ||
        actualSolutionCount !== expectedSolutionCount ||
        actualStabilizerOrder !== expectedStabilizerOrder) {
      canonicalMismatches += 1;
    }

    const stabilizers = stabilizerElements(input);
    if (!stabilizers.includes(0)) subgroupMismatches += 1;
    subgroupChecks += 1;
    for (const left of stabilizers) {
      for (const right of stabilizers) {
        if (!stabilizers.includes(left ^ right)) subgroupMismatches += 1;
        subgroupChecks += 1;
      }
    }

    const resolved = [declared, anchors | actualMinimumAnchor, ...maps];
    if (stabilizerMask(resolved) !== 1) minimumAnchorMismatches += 1;
    minimumAnchorChecks += 1;
    const available = 7 & ~anchors;
    const selectedRank = candidateOrder.indexOf(actualMinimumAnchor);
    for (const prior of candidateOrder.slice(0, selectedRank)) {
      if ((prior & available) === prior &&
          stabilizerMask([declared, anchors | prior, ...maps]) === 1) {
        minimumAnchorMismatches += 1;
      }
      minimumAnchorChecks += 1;
    }

    const decoded = decodeResult(actualPacked);
    if (decoded.localIssueMask === 0 && decoded.solutionCount > 0 &&
        decoded.stabilizerOrder > 1) {
      for (const gauge of stabilizers.filter((candidate) => candidate !== 0)) {
        for (const assignment of solutionAssignments(declared, maps)) {
          if (transformAssignment(assignment, gauge) === assignment) {
            obstructionFixedPointsFound += 1;
          }
          obstructionFixedPointChecks += 1;
        }
      }
    }

    for (let gauge = 0; gauge < 8; gauge += 1) {
      const transformedInput = transformInput(input, gauge);
      const transformedPacked = call(canonicalInstance, 'nhgf_analyze', transformedInput);
      const transformedStabilizer = call(
        canonicalInstance,
        'nhgf_stabilizer_mask',
        transformedInput,
      );
      const transformedMinimum = call(
        canonicalInstance,
        'nhgf_minimal_additional_anchor',
        transformedInput,
      );
      const transformedSolutions = call(
        canonicalInstance,
        'nhgf_solution_mask',
        [declared, ...transformedInput.slice(2)],
      );
      if (transformedPacked !== actualPacked ||
          transformedStabilizer !== actualStabilizer ||
          transformedMinimum !== actualMinimumAnchor ||
          popcount(transformedSolutions) !== actualSolutionCount) {
        gaugeMismatches += 1;
      }
      gaugeChecks += 1;
      if (gauge !== 0) nontrivialGaugeChecks += 1;
    }

    dispositionCensus[decoded.disposition] =
      (dispositionCensus[decoded.disposition] ?? 0) + 1;
    stabilizerOrderCensus[String(actualStabilizerOrder)] =
      (stabilizerOrderCensus[String(actualStabilizerOrder)] ?? 0) + 1;
    minimumAnchorCensus[String(actualMinimumAnchor)] =
      (minimumAnchorCensus[String(actualMinimumAnchor)] ?? 0) + 1;
    transcript.push(
      `${index}|${actualPacked}|${actualStabilizer}|${actualMinimumAnchor}|${actualSolutionCount}|${actualStabilizerOrder}`,
    );
    canonicalStates += 1;
  }
}

check(transformationChecks === 1536, 'edge transformation check cardinality drift');
check(transformationMismatches === 0, `edge transformation mismatches: ${transformationMismatches}`);
check(groupCompositionChecks === 4096, 'group composition check cardinality drift');
check(groupCompositionMismatches === 0, `group composition mismatches: ${groupCompositionMismatches}`);
check(canonicalStates === 4096, 'canonical domain cardinality drift');
check(canonicalMismatches === 0, `canonical oracle mismatches: ${canonicalMismatches}`);
check(gaugeChecks === 32768, 'gauge check cardinality drift');
check(nontrivialGaugeChecks === 28672, 'nontrivial gauge check cardinality drift');
check(gaugeMismatches === 0, `gauge invariance mismatches: ${gaugeMismatches}`);
check(subgroupMismatches === 0, `stabilizer subgroup mismatches: ${subgroupMismatches}`);
check(minimumAnchorMismatches === 0, `minimum anchor mismatches: ${minimumAnchorMismatches}`);
check(obstructionFixedPointChecks > 0, 'stabilizer obstruction was never exercised');
check(obstructionFixedPointsFound === 0, 'a nonidentity translation fixed an admissible assignment');
check(
  JSON.stringify(dispositionCensus) === JSON.stringify({
    REFUSE: 0,
    NO_STABILIZER_OBSTRUCTION: 716,
    RESERVED: 0,
    ABSTAIN_STABILIZER_OBSTRUCTION: 980,
    REVIEW_LOCAL_PROOF: 2368,
    ABSTAIN_NO_GLOBAL_SECTION: 32,
    REFUSE_INTERNAL_INCONSISTENCY: 0,
  }),
  'disposition census drift',
);
check(
  JSON.stringify(stabilizerOrderCensus) ===
    JSON.stringify({'1': 2056, '2': 1496, '4': 480, '8': 64}),
  'stabilizer-order census drift',
);
check(
  JSON.stringify(minimumAnchorCensus) === JSON.stringify({
    '0': 2056,
    '1': 600,
    '2': 480,
    '3': 192,
    '4': 416,
    '5': 160,
    '6': 128,
    '7': 64,
  }),
  'minimum-anchor census drift',
);
check(subgroupChecks === 23912, 'stabilizer subgroup check cardinality drift');
check(minimumAnchorChecks === 9688, 'minimum-anchor check cardinality drift');
check(obstructionFixedPointChecks === 12520, 'fixed-point check cardinality drift');

const mutantResults = [];
if (mutantInstance) {
  for (let kind = 0; kind < 4; kind += 1) {
    let statesWithAnomaly = 0;
    let gaugeViolations = 0;
    let oracleMismatches = 0;
    let minimalCounterexample = null;
    for (let index = 0; index < 4096; index += 1) {
      const input = inputFromIndex(index);
      const expectedMask = mutantAnomalyMask(kind, input);
      const actualMask = call(mutantInstance, 'nhgfm_anomaly_mask', [kind, ...input]);
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
    check(oracleMismatches === 0, `mutant ${kind} oracle mismatches: ${oracleMismatches}`);
    check(statesWithAnomaly > 0, `mutant ${kind} survived the complete domain`);
    mutantResults.push({
      kind,
      statesChecked: 4096,
      statesWithAnomaly,
      gaugeViolations,
      oracleMismatches,
      killed: statesWithAnomaly > 0,
      minimalCounterexample,
    });
  }
}
check(mutantResults.length === 4, 'mutation suite cardinality drift');
check(mutantResults.every((entry) => entry.killed), 'at least one hidden-choice mutant survived');

const hostileMasks = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
const hostileMaps = [-1, 0, 1, 2, 3, 4];
let hostileStates = 0;
let hostileInvalidStates = 0;
let hostileMismatches = 0;
if (canonicalInstance) {
  for (const declared of hostileMasks) {
    for (const anchors of hostileMasks) {
      for (const mapAB of hostileMaps) {
        for (const mapBC of hostileMaps) {
          for (const mapCA of hostileMaps) {
            const input = [declared, anchors, mapAB, mapBC, mapCA];
            if (call(canonicalInstance, 'nhgf_analyze', input) !== analyze(input)) {
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
check(hostileInvalidStates === 17504, 'hostile invalid-state cardinality drift');
check(hostileMismatches === 0, `hostile oracle mismatches: ${hostileMismatches}`);

const vectorDocument = JSON.parse(readFileSync(vectorsPath, 'utf8'));
const vectorResults = [];
for (const vector of vectorDocument.vectors ?? []) {
  const actualPacked = canonicalInstance
    ? call(canonicalInstance, 'nhgf_analyze', vector.input)
    : null;
  const decoded = actualPacked === null ? null : decodeResult(actualPacked);
  const passed = actualPacked === vector.expectedPacked &&
    decoded?.disposition === vector.expectedDisposition &&
    decoded?.stabilizerMask === vector.expectedStabilizerMask &&
    decoded?.minimumAdditionalAnchorMask === vector.expectedMinimumAdditionalAnchorMask &&
    decoded?.solutionCount === vector.expectedSolutionCount &&
    decoded?.stabilizerOrder === vector.expectedStabilizerOrder &&
    decoded?.localIssueMask === vector.expectedLocalIssueMask;
  check(passed, `vector failed: ${vector.id}`);
  vectorResults.push({id: vector.id, actualPacked, passed});
}

const canonicalMainResult = canonicalInstance ? call(canonicalInstance, 'main') : null;
const mutantMainResult = mutantInstance ? call(mutantInstance, 'main') : null;
check(canonicalMainResult === 111, `canonical self-check returned ${canonicalMainResult}`);
check(mutantMainResult === 112, `mutant self-check returned ${mutantMainResult}`);

const transcriptText = `${transcript.join('\n')}\n`;
const transcriptBytes = Buffer.from(transcriptText);
const mutatedArtifact = Buffer.from(canonicalBytes);
if (mutatedArtifact.length > 0) mutatedArtifact[mutatedArtifact.length - 1] ^= 1;
const mutationDetected = sha256(mutatedArtifact) !== sha256(canonicalBytes);
check(mutationDetected, 'single-byte artifact mutation was not detected');

const generatedAt = process.env.SOURCE_DATE_EPOCH
  ? new Date(Number(process.env.SOURCE_DATE_EPOCH) * 1000).toISOString()
  : new Date().toISOString();
const result = {
  schema: 'darwin.no-hidden-gauge-fixing-runtime-verification.v1.1',
  generatedAt,
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  canonicalWasm: {
    path: fromRoot(canonicalWasmPath),
    bytes: canonicalBytes.length,
    sha256: sha256(canonicalBytes),
    imports: canonicalImports,
    exports: canonicalExports,
    expectedExportCount: canonicalExpectedExports.length,
    singularWitnessExportCount: canonicalExports.filter(
      (name) => /(selector|first_solution|transform_assignment|nhgfm_)/.test(name),
    ).length,
    mainResult: canonicalMainResult,
  },
  adversarialWasm: {
    path: fromRoot(mutantWasmPath),
    bytes: mutantBytes.length,
    sha256: sha256(mutantBytes),
    imports: mutantImports,
    exports: mutantExports,
    expectedExportCount: mutantExpectedExports.length,
    mainResult: mutantMainResult,
  },
  boundedDomain: {
    canonicalStates,
    canonicalMismatches,
    hostileStates,
    hostileInvalidStates,
    hostileMismatches,
    dispositionCensus,
    stabilizerOrderCensus,
    minimumAnchorCensus,
  },
  gaugeAction: {
    group: 'C2^3',
    transformationChecks,
    transformationMismatches,
    groupCompositionChecks,
    groupCompositionMismatches,
    gaugeChecks,
    nontrivialGaugeChecks,
    gaugeMismatches,
    subgroupChecks,
    subgroupMismatches,
  },
  stabilizerObstruction: {
    minimumAnchorChecks,
    minimumAnchorMismatches,
    fixedPointChecks: obstructionFixedPointChecks,
    fixedPointsFound: obstructionFixedPointsFound,
  },
  mutationAdequacy: {
    canonicalArtifactContainsMutants: false,
    mutants: mutantResults.length,
    killed: mutantResults.filter((entry) => entry.killed).length,
    results: mutantResults,
  },
  transcript: {
    path: fromRoot(transcriptPath),
    lines: transcript.length,
    bytes: transcriptBytes.length,
    sha256: sha256(transcriptBytes),
    encoding: 'index|packed|stabilizerMask|minimumAdditionalAnchorMask|solutionCount|stabilizerOrder',
  },
  sourceLineage: {
    canonical: {
      path: fromRoot(sourcePath),
      bytes: Buffer.byteLength(source),
      sha256: sha256(source),
      hasIO: /\bwith\s+IO\b/.test(source),
    },
    adversarial: {
      path: fromRoot(mutantSourcePath),
      bytes: Buffer.byteLength(mutantSource),
      sha256: sha256(mutantSource),
      generatorPath: fromRoot(mutantGeneratorPath),
      generatorSha256: sha256(readFileSync(mutantGeneratorPath)),
      deterministicTransformVerified: mutantSource === buildMutantSource(source),
    },
    transcript: {
      path: fromRoot(transcriptSourcePath),
      bytes: Buffer.byteLength(transcriptSource),
      sha256: sha256(transcriptSource),
      generatorPath: fromRoot(transcriptGeneratorPath),
      generatorSha256: sha256(readFileSync(transcriptGeneratorPath)),
      deterministicTransformVerified: transcriptSource === buildTranscriptSource(source),
    },
  },
  vectors: {
    path: fromRoot(vectorsPath),
    sha256: sha256(readFileSync(vectorsPath)),
    generatorPath: fromRoot(vectorGeneratorPath),
    generatorSha256: sha256(readFileSync(vectorGeneratorPath)),
    cases: vectorResults.length,
    passed: vectorResults.filter((entry) => entry.passed).length,
    results: vectorResults,
  },
  independentOracle: {
    path: fromRoot(oraclePath),
    sha256: sha256(readFileSync(oraclePath)),
    language: 'JavaScript',
    strategy: 'independent exhaustive assignment and subgroup enumeration',
    reusesSounioImplementation: false,
    clinicalMathematicsFallback: false,
  },
  integrity: {
    algorithm: 'SHA-256',
    singleByteMutationDetected: mutationDetected,
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
