import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  analyzeV13,
  decodeResultV13,
  profileCountV13,
  statesFromProfileV13,
} from './epistemic-revocation-distance-v13-oracle.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/epistemic-revocation-distance/formal');
const paths = {
  source: resolve(formalDir, 'sounio/epistemic_revocation_distance_v1_3.sio'),
  wasm: resolve(formalDir, 'wasm/epistemic_revocation_distance.v1.3.wasm'),
  vectors: resolve(formalDir, 'vectors/epistemic-revocation-distance.v1.3.json'),
  transcript: resolve(formalDir, 'transcripts/abstract-domain.v1.3.txt'),
  generation: resolve(formalDir, 'evidence/benchmark-generation.v1.3.json'),
  parentReceipt: resolve(
    repoRoot,
    'docs/research/no-hidden-gauge-fixing/formal/' +
      'no-hidden-gauge-fixing-gate.receipt.v1.2.json',
  ),
  evidence: resolve(formalDir, 'evidence/runtime-verification.v1.3.json'),
};
const writeEvidence = process.argv.includes('--write-evidence');
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const fileHash = (path) => sha256(readFileSync(path));
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');

const source = readFileSync(paths.source, 'utf8');
const wasmBytes = readFileSync(paths.wasm);
const vectors = JSON.parse(readFileSync(paths.vectors));
const generation = JSON.parse(readFileSync(paths.generation));
const committedTranscript = readFileSync(paths.transcript);
const parentReceiptBytes = readFileSync(paths.parentReceipt);

check(wasmBytes.subarray(0, 4).equals(Buffer.from([0, 97, 115, 109])),
  'WASM magic mismatch');
check(WebAssembly.validate(wasmBytes), 'WASM validation failed');
check(!/\bwith\s+IO\b/.test(source), 'canonical source gained IO');
check(!/\b(selector|selected_cut|selected_assignment|singular_output)\b/.test(source),
  'canonical source contains a singular selector');
check(vectors.schema === 'darwin.epistemic-revocation-distance-vectors.v1.3',
  'vector schema drift');
check(vectors.cases.length === 151, 'blocker vector cardinality drift');
check(generation.verified === true, 'benchmark generation is not verified');
check(generation.completeAbstractDomain?.states === 66356,
  'generated abstract domain is incomplete');

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
// Madaros exports functions that survive optimization. Pin the physical ABI
// to the source-fresh v0.80 artifact instead of inferring it from source names.
const expectedExports = [
  'erd13_analyze',
  'erd13_contains',
  'erd13_critical_receipts',
  'erd13_cut_bit',
  'erd13_cut_is_minimum',
  'erd13_disposition',
  'erd13_distance',
  'erd13_exhaustive_self_check',
  'erd13_identified',
  'erd13_input_valid',
  'erd13_minimum_cut_family',
  'erd13_pack',
  'erd13_popcount3',
  'erd13_profile_count',
  'erd13_profile_divisor',
  'erd13_profile_failures',
  'erd13_profile_state',
  'erd13_result_active',
  'erd13_self_check',
  'erd13_solution_count',
  'erd13_stabilizer_order',
  'erd13_state_loses',
  'erd13_state_matches_cut',
  'erd13_subset',
  'erd13_update_distance',
  'erd13_valid_mask',
  'erd13_verify_active_profiles',
  'main',
  'memory',
].sort();
const logicalApi = ['erd13_analyze', 'erd13_self_check', 'main'];
check(imports.length === 0, 'canonical WASM has imports');
check(JSON.stringify(exports) === JSON.stringify(expectedExports),
  'canonical export surface drift');
check(logicalApi.every((name) => exports.includes(name)),
  'canonical logical API is incomplete');
const singularWitnessExports = exports.filter((name) =>
  /(selector|selected_cut|selected_assignment|singular_output)/.test(name));
check(singularWitnessExports.length === 0,
  `singular witness export detected: ${singularWitnessExports.join(',')}`);

const call = (name, input = []) =>
  Number(instance.exports[name](...input.map(BigInt)));
const analyzeWasm = (active, states) =>
  call('erd13_analyze', [active, ...states]);

let blockerVectorChecks = 0;
let blockerVectorMismatches = 0;
if (instance) {
  for (const vector of vectors.cases) {
    const actual = analyzeWasm(
      vector.activeReceiptMask,
      vector.postRevocationStates,
    );
    blockerVectorChecks += 1;
    if (actual !== vector.expectedPacked ||
        actual !== analyzeV13(vector.activeReceiptMask, vector.postRevocationStates)) {
      blockerVectorMismatches += 1;
    }
  }
}
check(blockerVectorChecks === 151,
  `blocker vector checks drift: ${blockerVectorChecks}`);
check(blockerVectorMismatches === 0,
  `blocker vector mismatches: ${blockerVectorMismatches}`);

const transcript = [];
let abstractStates = 0;
let oracleMismatches = 0;
let invalidKernelOutputs = 0;
let ordinal = 0;
if (instance) {
  for (let active = 0; active < 8; active += 1) {
    for (let profileCode = 0;
      profileCode < profileCountV13(active);
      profileCode += 1) {
      const states = statesFromProfileV13(active, profileCode);
      const expected = analyzeV13(active, states);
      const actual = analyzeWasm(active, states);
      if (actual !== expected) oracleMismatches += 1;
      if (actual <= 0) invalidKernelOutputs += 1;
      transcript.push(`${ordinal}|${active}|${profileCode}|${actual}`);
      ordinal += 1;
      abstractStates += 1;
    }
  }
}
const transcriptBytes = Buffer.from(`${transcript.join('\n')}\n`);
check(abstractStates === 66356, `abstract state count drift: ${abstractStates}`);
check(oracleMismatches === 0, `oracle mismatches: ${oracleMismatches}`);
check(invalidKernelOutputs === 0,
  `valid abstract profiles refused by kernel: ${invalidKernelOutputs}`);
check(sha256(transcriptBytes) === sha256(committedTranscript),
  'abstract-domain transcript drift');

const negativeInputs = [
  {active: -1, states: Array(8).fill(-1)},
  {active: 8, states: Array(8).fill(-1)},
  {active: 0, states: [0, -1, -1, -1, -1, -1, -1, -1]},
  {active: 1, states: [278537, -1, -1, -1, -1, -1, -1, -1]},
  {active: 1, states: [278537, 278537, 278537, -1, -1, -1, -1, -1]},
  {active: 3, states: [278537, 278537, 278537, -1, -1, -1, -1, -1]},
];
let negativeCasesPassed = 0;
if (instance) {
  for (const input of negativeInputs) {
    if (analyzeWasm(input.active, input.states) === 0) negativeCasesPassed += 1;
  }
}
check(negativeCasesPassed === negativeInputs.length,
  `hostile ABI negatives passed ${negativeCasesPassed}/${negativeInputs.length}`);

const kernelSourceHash = fileHash(paths.source);
const parentReceiptHash = sha256(parentReceiptBytes);
const lifecycleFixture = {
  schema: 'darwin.epistemic-revocation-evaluation-envelope.v1.3',
  epoch: 13,
  activeReceiptMask: 7,
  postRevocationStates: vectors.cases.find((entry) =>
    entry.activeReceiptMask === 7 &&
    JSON.stringify(entry.blockerMasks) === JSON.stringify([3, 5]))
    ?.postRevocationStates,
  parentReceiptSha256: parentReceiptHash,
  kernelSourceSha256: kernelSourceHash,
};
lifecycleFixture.stateDigest = sha256(Buffer.from(
  JSON.stringify({
    activeReceiptMask: lifecycleFixture.activeReceiptMask,
    postRevocationStates: lifecycleFixture.postRevocationStates,
  }),
));
const currentEpoch = 13;
let lifecycleKernelCalls = 0;
const evaluateEnvelope = (envelope) => {
  const digest = sha256(Buffer.from(JSON.stringify({
    activeReceiptMask: envelope.activeReceiptMask,
    postRevocationStates: envelope.postRevocationStates,
  })));
  const accepted = envelope.schema === lifecycleFixture.schema &&
    envelope.epoch === currentEpoch &&
    envelope.parentReceiptSha256 === parentReceiptHash &&
    envelope.kernelSourceSha256 === kernelSourceHash &&
    envelope.stateDigest === digest;
  if (!accepted) return {accepted: false, packed: null};
  lifecycleKernelCalls += 1;
  return {
    accepted: true,
    packed: analyzeWasm(envelope.activeReceiptMask, envelope.postRevocationStates),
  };
};
const acceptedEnvelope = instance
  ? evaluateEnvelope(structuredClone(lifecycleFixture))
  : {accepted: false, packed: null};
const mutations = {
  staleEpoch: structuredClone(lifecycleFixture),
  parentHash: structuredClone(lifecycleFixture),
  sourceHash: structuredClone(lifecycleFixture),
  states: structuredClone(lifecycleFixture),
  stateDigest: structuredClone(lifecycleFixture),
};
mutations.staleEpoch.epoch -= 1;
mutations.parentHash.parentReceiptSha256 = '0'.repeat(64);
mutations.sourceHash.kernelSourceSha256 = 'f'.repeat(64);
mutations.states.postRevocationStates[3] = 278537;
mutations.stateDigest.stateDigest = 'a'.repeat(64);
let lifecycleMutationsRefused = 0;
if (instance) {
  for (const mutation of Object.values(mutations)) {
    const outcome = evaluateEnvelope(mutation);
    if (!outcome.accepted && outcome.packed === null) lifecycleMutationsRefused += 1;
  }
}
check(acceptedEnvelope.accepted === true && acceptedEnvelope.packed > 0,
  'valid lifecycle envelope was refused');
check(lifecycleMutationsRefused === Object.keys(mutations).length,
  `lifecycle mutations refused ${lifecycleMutationsRefused}/` +
    `${Object.keys(mutations).length}`);
check(lifecycleKernelCalls === 1,
  `invalid lifecycle envelopes reached kernel: calls=${lifecycleKernelCalls}`);

const focusedSelfCheck = instance ? call('erd13_self_check') : null;
const exhaustiveSelfCheck = instance
  ? call('erd13_exhaustive_self_check')
  : null;
const mainResult = instance ? call('main') : null;
const exhaustiveSelfCheckExported = exports.includes(
  'erd13_exhaustive_self_check',
);
const exhaustiveSelfCheckComposedInMain = source.includes(
  'let exhaustive_failures = erd13_exhaustive_self_check()',
);
check(focusedSelfCheck === 0, `focused Sounio self-check returned ${focusedSelfCheck}`);
check(exhaustiveSelfCheckExported === true,
  'canonical WASM omitted the exhaustive self-check export');
check(exhaustiveSelfCheck === 0,
  `exhaustive Sounio self-check returned ${exhaustiveSelfCheck}`);
check(exhaustiveSelfCheckComposedInMain,
  'main no longer composes the exhaustive Sounio self-check');
check(mainResult === 143, `Sounio main returned ${mainResult}`);

const result = {
  schema: 'darwin.epistemic-revocation-distance-runtime-verification.v1.3',
  generatedAt: '2026-08-03T14:20:00.000Z',
  status: 'ABSTRACT_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  canonicalWasm: {
    path: fromRoot(paths.wasm),
    bytes: wasmBytes.length,
    sha256: sha256(wasmBytes),
    imports,
    exports,
    logicalApi,
    singularWitnessExportCount: singularWitnessExports.length,
    focusedSelfCheck,
    exhaustiveSelfCheckExported,
    exhaustiveSelfCheck,
    exhaustiveSelfCheckComposedInMain,
    mainResult,
  },
  source: {
    path: fromRoot(paths.source),
    bytes: Buffer.byteLength(source),
    sha256: kernelSourceHash,
    hasIO: /\bwith\s+IO\b/.test(source),
  },
  blockerBenchmark: {
    checks: blockerVectorChecks,
    mismatches: blockerVectorMismatches,
  },
  completeAbstractDomain: {
    states: abstractStates,
    oracleMismatches,
    invalidKernelOutputs,
    transcript: {
      path: fromRoot(paths.transcript),
      bytes: transcriptBytes.length,
      sha256: sha256(transcriptBytes),
    },
  },
  hostileAbi: {
    cases: negativeInputs.length,
    passed: negativeCasesPassed,
  },
  lifecycleFirewall: {
    schema: lifecycleFixture.schema,
    currentEpoch,
    acceptedEnvelopeKernelCalls: lifecycleKernelCalls,
    invalidEnvelopeKernelCalls: 0,
    mutations: Object.keys(mutations),
    mutationsRefused: lifecycleMutationsRefused,
    fixtureOnly: true,
    signedAuthorityEstablished: false,
  },
  upstream: {
    parentReceipt: fromRoot(paths.parentReceipt),
    parentReceiptSha256: parentReceiptHash,
  },
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(paths.evidence), {recursive: true});
  writeFileSync(paths.evidence, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
