import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  analyzeV12,
  decodeResultV12,
  dispositionsV12,
  inputFromIndexV12,
  minimumAdditionalAnchorV12,
  popcount8V12,
  solutionAssignmentsV12,
  stabilizerElementsV12,
  stabilizerMaskV12,
  transformResidualInputV12,
  validInputV12,
} from './no-hidden-gauge-fixing-v12-oracle.mjs';
import {
  observationPathsV12,
  verifyObservationReceiptV12,
  sha256V12,
} from './observation-receipt-v12.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');
const sourcePath = resolve(formalDir, 'sounio/no_hidden_gauge_fixing_v1_2.sio');
const wasmPath = resolve(
  formalDir,
  'wasm-v1.2/no_hidden_gauge_fixing.v1.2.wasm',
);
const transcriptPath = resolve(
  formalDir,
  'transcripts/canonical-domain.v1.2.txt',
);
const evidencePath = resolve(
  formalDir,
  'evidence/runtime-verification.v1.2.json',
);
const writeEvidence = process.argv.includes('--write-evidence');
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

const source = readFileSync(sourcePath, 'utf8');
const wasmBytes = readFileSync(wasmPath);
check(wasmBytes.subarray(0, 4).equals(Buffer.from([0, 97, 115, 109])),
  'WASM magic mismatch');
check(WebAssembly.validate(wasmBytes), 'WASM validation failed');
check(!/\bwith\s+IO\b/.test(source), 'canonical source gained IO');
check(!/\b(selector|first_solution|selected_assignment)\b/.test(source),
  'canonical source contains a singular selector');

let module;
let instance;
try {
  module = await WebAssembly.compile(wasmBytes);
  instance = await WebAssembly.instantiate(module, {});
} catch (error) {
  errors.push(`WASM instantiation failed: ${error.message}`);
}
const imports = module ? WebAssembly.Module.imports(module) : [];
const exports = module
  ? WebAssembly.Module.exports(module).map((entry) => entry.name).sort()
  : [];
const sourceFunctions = [...source.matchAll(/^fn\s+([A-Za-z0-9_]+)\s*\(/gm)]
  .map((match) => match[1]);
const expectedExports = [...sourceFunctions, 'memory'].sort();
check(imports.length === 0, 'canonical WASM has imports');
check(JSON.stringify(exports) === JSON.stringify(expectedExports),
  'canonical export surface drift');
const singularWitnessExports = exports.filter((name) =>
  /(selector|first_solution|selected_assignment|solution_mask)/.test(name));
check(singularWitnessExports.length === 0,
  `singular witness export detected: ${singularWitnessExports.join(',')}`);

const call = (name, input = []) =>
  Number(instance.exports[name](...input.map(BigInt)));

let rawStates = 0;
let validStates = 0;
let invalidStates = 0;
let oracleMismatches = 0;
let residualGaugeChecks = 0;
let residualGaugeMismatches = 0;
let subgroupChecks = 0;
let subgroupMismatches = 0;
let anchorRestrictionChecks = 0;
let anchorRestrictionMismatches = 0;
let uniqueBoundaryChecks = 0;
let uniqueBoundaryMismatches = 0;
let invalidKernelOutputs = 0;
const dispositionCensus = Object.fromEntries(
  dispositionsV12.map((name) => [name, 0]),
);
const transcript = [];

if (instance) {
  for (let index = 0; index < 32768; index += 1) {
    const input = inputFromIndexV12(index);
    const expectedPacked = analyzeV12(input);
    const actualPacked = call('nhgf12_analyze', input);
    if (actualPacked !== expectedPacked) oracleMismatches += 1;
    if (!validInputV12(input)) {
      invalidStates += 1;
      if (actualPacked !== 0) invalidKernelOutputs += 1;
      transcript.push(`${index}|0|${actualPacked}|0|0|0`);
      rawStates += 1;
      continue;
    }

    validStates += 1;
    const [declared, anchors, anchorValues, ...maps] = input;
    const expectedSolutions = solutionAssignmentsV12(input);
    const expectedStabilizer = stabilizerMaskV12(input);
    const expectedMinimum = minimumAdditionalAnchorV12(input);
    const actualSolutionCount = call('nhgf12_solution_count', input);
    const actualStabilizer = call(
      'nhgf12_stabilizer_mask',
      [declared, anchors, ...maps],
    );
    const actualMinimum = call(
      'nhgf12_minimal_additional_anchor',
      [declared, anchors, ...maps],
    );
    if (actualSolutionCount !== expectedSolutions.length ||
        actualStabilizer !== expectedStabilizer ||
        actualMinimum !== expectedMinimum) oracleMismatches += 1;

    const decoded = decodeResultV12(actualPacked);
    dispositionCensus[decoded.disposition] =
      (dispositionCensus[decoded.disposition] ?? 0) + 1;
    if (decoded.localIssueMask === 0 && decoded.solutionCount > 0 &&
        decoded.stabilizerOrder === 1) {
      uniqueBoundaryChecks += 1;
      if ((decoded.disposition === 'UNIQUE_WITHIN_DECLARED_MODEL') !==
          (decoded.solutionCount === 1)) uniqueBoundaryMismatches += 1;
    }
    if (decoded.disposition === 'UNIQUE_WITHIN_DECLARED_MODEL') {
      uniqueBoundaryChecks += 1;
      if (anchors === 0 || decoded.solutionCount !== 1 ||
          decoded.stabilizerOrder !== 1) uniqueBoundaryMismatches += 1;
    }

    const unanchored = [declared, 0, 0, ...maps];
    const unanchoredSolutions = new Set(solutionAssignmentsV12(unanchored));
    for (const assignment of expectedSolutions) {
      anchorRestrictionChecks += 1;
      if (!unanchoredSolutions.has(assignment) ||
          (assignment & anchors) !== anchorValues) {
        anchorRestrictionMismatches += 1;
      }
    }

    const stabilizers = stabilizerElementsV12(input);
    if (!stabilizers.includes(0)) subgroupMismatches += 1;
    subgroupChecks += 1;
    for (const left of stabilizers) {
      for (const right of stabilizers) {
        subgroupChecks += 1;
        if (!stabilizers.includes(left ^ right)) subgroupMismatches += 1;
      }
    }

    for (let gauge = 0; gauge < 8; gauge += 1) {
      const transformed = transformResidualInputV12(input, gauge);
      if (transformed === null) continue;
      const transformedPacked = call('nhgf12_analyze', transformed);
      residualGaugeChecks += 1;
      if (transformedPacked !== actualPacked ||
          analyzeV12(transformed) !== expectedPacked) {
        residualGaugeMismatches += 1;
      }
    }
    transcript.push(
      `${index}|1|${actualPacked}|${actualStabilizer}|${actualMinimum}|${actualSolutionCount}`,
    );
    rawStates += 1;
  }
}

check(rawStates === 32768, `raw ABI cardinality drift: ${rawStates}`);
check(validStates === 13824, `valid ABI cardinality drift: ${validStates}`);
check(invalidStates === 18944, `invalid ABI cardinality drift: ${invalidStates}`);
check(invalidKernelOutputs === 0, 'an invalid ABI escaped REFUSE');
check(oracleMismatches === 0, `oracle mismatches: ${oracleMismatches}`);
check(residualGaugeChecks === 32768,
  `residual gauge cardinality drift: ${residualGaugeChecks}`);
check(residualGaugeMismatches === 0,
  `residual gauge mismatches: ${residualGaugeMismatches}`);
check(subgroupMismatches === 0, `subgroup mismatches: ${subgroupMismatches}`);
check(anchorRestrictionChecks > 0, 'anchor restrictions were not exercised');
check(anchorRestrictionMismatches === 0,
  `anchor restriction mismatches: ${anchorRestrictionMismatches}`);
check(uniqueBoundaryChecks > 0, 'model-relative uniqueness was not exercised');
check(uniqueBoundaryMismatches === 0,
  `model-relative uniqueness boundary mismatches: ${uniqueBoundaryMismatches}`);

const identityNoObservation = [7, 0, 0, 2, 2, 2];
const identityObservedFalse = [7, 1, 0, 2, 2, 2];
const identityObservedTrue = [7, 1, 1, 2, 2, 2];
const invalidValueWithoutAnchor = [7, 0, 1, 2, 2, 2];
check(decodeResultV12(call('nhgf12_analyze', identityNoObservation)).disposition ===
  'ABSTAIN_STABILIZER_OBSTRUCTION', 'unobserved identity triangle did not abstain');
check(decodeResultV12(call('nhgf12_analyze', identityObservedFalse)).disposition ===
  'UNIQUE_WITHIN_DECLARED_MODEL', 'false observation did not constrain the model');
check(decodeResultV12(call('nhgf12_analyze', identityObservedTrue)).disposition ===
  'UNIQUE_WITHIN_DECLARED_MODEL', 'true observation did not constrain the model');
check(call('nhgf12_analyze', invalidValueWithoutAnchor) === 0,
  'value without an anchor did not refuse');

const receipt = JSON.parse(readFileSync(observationPathsV12.receipt));
const registry = JSON.parse(readFileSync(observationPathsV12.registry));
const sourceBytes = readFileSync(observationPathsV12.source);
const receiptContext = {
  contextHash: sha256V12('urn:darwin:synthetic-context:identity-triangle'),
  minimumReliabilityBps: 9000,
  purpose: 'research:no-hidden-gauge-fixing:v1.2',
  scopeHash: sha256V12('research:no-hidden-gauge-fixing:v1.2'),
  subjectHash: sha256V12('urn:darwin:synthetic-subject:nhgf-v1.2'),
};
let gatedKernelCalls = 0;
const evaluateWithReceipt = (candidateReceipt) => {
  const verification = verifyObservationReceiptV12({
    context: receiptContext,
    evaluatedAt: '2026-08-03T12:00:00.000Z',
    receipt: candidateReceipt,
    registry,
    sourceBytes,
  });
  if (!verification.valid) return {packed: null, verification};
  gatedKernelCalls += 1;
  return {packed: call('nhgf12_analyze', verification.abi), verification};
};
const acceptedEvaluation = evaluateWithReceipt(receipt);
check(acceptedEvaluation.verification.valid, 'valid fixture receipt was refused');
check(decodeResultV12(acceptedEvaluation.packed).disposition ===
  'UNIQUE_WITHIN_DECLARED_MODEL', 'accepted receipt did not constrain the model');
const tamperedReceipt = structuredClone(receipt);
tamperedReceipt.payload.observation.values[0].value = true;
const refusedEvaluation = evaluateWithReceipt(tamperedReceipt);
check(!refusedEvaluation.verification.valid && refusedEvaluation.packed === null,
  'tampered receipt reached the kernel');
check(gatedKernelCalls === 1, `unexpected gated kernel calls: ${gatedKernelCalls}`);

const mainResult = instance ? call('main') : null;
check(mainResult === 121, `Sounio self-check returned ${mainResult}`);
const transcriptBytes = Buffer.from(`${transcript.join('\n')}\n`);
const result = {
  schema: 'darwin.no-hidden-gauge-fixing-runtime-verification.v1.2',
  generatedAt: '2026-08-03T12:00:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
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
  completeAbiDomain: {
    rawStates,
    validStates,
    invalidStates,
    invalidKernelOutputs,
    oracleMismatches,
    dispositionCensus,
  },
  observationSemantics: {
    anchorRestrictionChecks,
    anchorRestrictionMismatches,
    uniqueBoundaryChecks,
    uniqueBoundaryMismatches,
    uniquenessMeaning: 'unique only within the declared finite model',
  },
  residualGaugeAction: {
    group: 'subgroups of C2^3 preserving observed values',
    residualGaugeChecks,
    residualGaugeMismatches,
    subgroupChecks,
    subgroupMismatches,
  },
  receiptFirewall: {
    acceptedFixtureKernelCalls: gatedKernelCalls,
    tamperedReceiptKernelCalls: 0,
    acceptedFixtureDisposition: decodeResultV12(acceptedEvaluation.packed).disposition,
    tamperedReceiptDisposition: refusedEvaluation.verification.disposition,
    fixtureOnly: true,
    externalClinicalObservationEstablished: false,
  },
  transcript: {
    path: fromRoot(transcriptPath),
    encoding: 'index|abiValid|packed|stabilizerMask|minimumAdditionalAnchorMask|solutionCount',
    lines: transcript.length,
    bytes: transcriptBytes.length,
    sha256: sha256(transcriptBytes),
  },
  independentOracle: {
    path: 'scripts/no-hidden-gauge-fixing-v12-oracle.mjs',
    sha256: sha256(readFileSync(resolve(
      repoRoot,
      'scripts/no-hidden-gauge-fixing-v12-oracle.mjs',
    ))),
    language: 'JavaScript',
    reusesSounioImplementation: false,
    clinicalMathematicsFallback: false,
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
