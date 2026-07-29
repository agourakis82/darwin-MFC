import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sounioRoot = process.env.SOUNIO_ROOT || '/Users/demetriosagourakis/dev/sounio';
const compiler = join(sounioRoot, 'artifacts/self-hosted/souc-self-hosted-x86_64');
const sourceDir = join(root, 'clinical/sounio');
const firewallDir = join(root, 'clinical/epistemic-firewall');
const publicDir = join(root, 'public/clinical-kernel');
const buildDir = join(root, '.clinical-kernel-build');
const evidencePath = join(sourceDir, 'evidence-bundle.json');
const vectorsPath = join(sourceDir, 'test-vectors.json');
const oracleTemplatePath = join(sourceDir, 'clinical-kernel.sio');
const codegenPath = join(sourceDir, 'clinical-kernel-codegen.sio');
const firewallSourcePath = join(firewallDir, 'epistemic-firewall.sio');
const calibrationPath = join(firewallDir, 'calibration-certificate.json');
const wasmPath = join(publicDir, 'clinical-kernel.wasm');
const modelPath = join(publicDir, 'clinical-model.bin');
const receiptPath = join(publicDir, 'clinical-kernel.receipt.json');
const policyPath = join(publicDir, 'epistemic-firewall.policy.json');
const publicCalibrationPath = join(publicDir, 'calibration-certificate.json');
const firewallReceiptPath = join(publicDir, 'epistemic-firewall.receipt.json');

mkdirSync(publicDir, { recursive: true });
mkdirSync(buildDir, { recursive: true });

const evidenceBytes = readFileSync(evidencePath);
const vectorBytes = readFileSync(vectorsPath);
const calibrationBytes = readFileSync(calibrationPath);
const evidence = JSON.parse(evidenceBytes.toString('utf8'));
const vectorBundle = JSON.parse(vectorBytes.toString('utf8'));
const calibration = JSON.parse(calibrationBytes.toString('utf8'));

if (evidence.features.length !== 12 || evidence.conditions.length !== 9) {
  throw new Error('Clinical kernel ABI v1 requires exactly 12 features and 9 conditions.');
}
if (
  calibration.schemaVersion !== 'darwin.sounio.calibration-certificate.v1'
  || calibration.modelVersion !== evidence.modelVersion
) {
  throw new Error('Calibration certificate is incompatible with the clinical evidence bundle.');
}

const sha256 = value => createHash('sha256').update(value).digest('hex');
const isSha256 = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const formatNumber = value => {
  if (!Number.isFinite(value)) throw new Error(`Non-finite model value: ${value}`);
  return Number(value).toPrecision(17).replace(/e\+/, 'e');
};
const requiredCalibrationHashes = [
  calibration.hashes.developmentCohortSha256,
  calibration.hashes.calibrationCohortSha256,
  calibration.hashes.evaluationCohortSha256,
  calibration.hashes.analysisPlanSha256,
  calibration.hashes.analysisCodeSha256,
];
const classCoverageValues = Object.values(calibration.coverage.classConditional);
const subgroupCoverageValues = Object.values(calibration.coverage.subgroupConditional);
const calibrationEvidenceComplete = calibration.status === 'calibrated'
  && typeof calibration.issuedAt === 'string'
  && typeof calibration.validFrom === 'string'
  && typeof calibration.validUntil === 'string'
  && Number.isFinite(calibration.coverage.marginalObserved)
  && Number.isFinite(calibration.coverage.lowerConfidenceBound)
  && calibration.coverage.lowerConfidenceBound >= calibration.coverage.target
  && classCoverageValues.length === evidence.conditions.length
  && classCoverageValues.every(value => Number.isFinite(value) && value >= calibration.coverage.target)
  && subgroupCoverageValues.length > 0
  && subgroupCoverageValues.every(value => Number.isFinite(value) && value >= calibration.coverage.target)
  && Object.values(calibration.clinicalUtility).every(Number.isFinite)
  && calibration.distribution.status === 'in-bounds'
  && isSha256(calibration.distribution.referenceFingerprint)
  && requiredCalibrationHashes.every(isSha256);
if (calibration.status === 'calibrated' && !calibrationEvidenceComplete) {
  throw new Error('Calibrated status requires complete coverage, utility, distribution, cohort, and analysis evidence.');
}

const featureIndex = new Map(evidence.features.map((feature, index) => [feature.id, index]));
const modelValues = [];
for (const condition of evidence.conditions) {
  modelValues.push(
    condition.prior,
    condition.uncertainty.lowerFactor,
    condition.uncertainty.upperFactor,
    condition.uncertainty.confidence,
  );
  for (const feature of evidence.features) {
    const likelihood = condition.likelihoods[feature.id] || [1, 1];
    modelValues.push(likelihood[0], likelihood[1]);
  }
}

const modelBuffer = Buffer.alloc(modelValues.length * 8);
modelValues.forEach((value, index) => modelBuffer.writeDoubleLE(value, index * 8));
writeFileSync(modelPath, modelBuffer);
writeFileSync(join(publicDir, 'evidence-bundle.json'), evidenceBytes);
writeFileSync(publicCalibrationPath, calibrationBytes);

const vectorValues = vectorBundle.vectors.map(vector => {
  const values = new Array(evidence.features.length).fill(-1);
  for (const id of vector.present || []) values[featureIndex.get(id)] = 1;
  for (const id of vector.absent || []) values[featureIndex.get(id)] = 0;
  return values;
});

let generated = `${readFileSync(oracleTemplatePath, 'utf8')}\n\n`;
generated += 'fn load_model() with Mut, Panic {\n';
modelValues.forEach((value, index) => {
  generated += `    ORACLE_MODEL[${index} as usize] = ${formatNumber(value)}\n`;
});
generated += '}\n\n';

vectorValues.forEach((values, vectorIndex) => {
  generated += `fn load_vector_${vectorIndex}() with Mut, Panic {\n`;
  values.forEach((value, index) => {
    generated += `    ORACLE_INPUT[${index} as usize] = ${value}\n`;
  });
  generated += '}\n\n';
});

generated += `fn print_result(vector_index: i64) with IO, Mut, Div, Panic {
    infer_oracle()
    compute_oracle_information_gain()
    var condition: i64 = 0
    while condition < CONDITION_COUNT {
        print("R ")
        print_int(vector_index)
        print(" ")
        print_int(condition)
        print(" ")
        println(ORACLE_POSTERIOR[condition as usize])
        condition = condition + 1
    }
    print("Q ")
    print_int(vector_index)
    print(" ")
    print_int(ORACLE_NEXT_QUESTION)
    print(" ")
    if ORACLE_NEXT_QUESTION >= 0 {
        println(ORACLE_INFORMATION_GAIN[ORACLE_NEXT_QUESTION as usize])
    } else {
        println(-1.0)
    }
}

fn main() -> i64 with IO, Mut, Div, Observe, Panic {
    load_model()
`;
vectorValues.forEach((_, index) => {
  generated += `    load_vector_${index}()\n    print_result(${index})\n`;
});
generated += '    println("SOUNIO_CLINICAL_ORACLE_OK")\n    0\n}\n';

const generatedOraclePath = join(buildDir, 'clinical-kernel.generated.sio');
writeFileSync(generatedOraclePath, generated);

const shellQuote = value => `'${String(value).replaceAll("'", "'\\''")}'`;
const runLinux = command => execFileSync(
  'limactl',
  ['shell', 'souc-linux', '/bin/bash', '-lc', command],
  { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 32 * 1024 * 1024 },
);

execFileSync('limactl', ['start', 'souc-linux'], { stdio: 'ignore' });

const codegenElf = join(buildDir, 'clinical-kernel-codegen.elf');
const oracleElf = join(buildDir, 'clinical-kernel-oracle.elf');
const firewallElf = join(buildDir, 'epistemic-firewall.elf');
const guestCodegenElf = '/tmp/darwin-clinical-kernel-codegen.elf';
const guestOracleElf = '/tmp/darwin-clinical-kernel-oracle.elf';
const guestFirewallElf = '/tmp/darwin-epistemic-firewall.elf';
const guestWasm = '/tmp/darwin-clinical-kernel.wasm';
const guestCodegenSource = '/tmp/darwin-clinical-kernel-codegen.sio';
const guestOracleSource = '/tmp/darwin-clinical-kernel-oracle.sio';
const guestFirewallSource = '/tmp/darwin-epistemic-firewall.sio';
const copyToGuest = (hostPath, guestPath) => execFileSync(
  'limactl',
  ['copy', '--backend=scp', hostPath, `souc-linux:${guestPath}`],
  { cwd: root, stdio: 'pipe' },
);
const copyFromGuest = (guestPath, hostPath) => execFileSync(
  'limactl',
  ['copy', '--backend=scp', `souc-linux:${guestPath}`, hostPath],
  { cwd: root, stdio: 'pipe' },
);
const compile = (source, guestSource, guestOutput, hostOutput) => {
  copyToGuest(source, guestSource);
  runLinux(
  `export SOUNIO_STDLIB_PATH=${shellQuote(join(sounioRoot, 'stdlib'))}; ` +
    `${shellQuote(compiler)} ${shellQuote(guestSource)} ${shellQuote(guestOutput)} && chmod +x ${shellQuote(guestOutput)}`,
  );
  copyFromGuest(guestOutput, hostOutput);
};

compile(codegenPath, guestCodegenSource, guestCodegenElf, codegenElf);
// The checked bootstrap emitter currently exits 154 after a successful large
// global-buffer write. Treat only a non-empty output as success, then validate
// the module structurally and numerically below.
runLinux(`${shellQuote(guestCodegenElf)} ${shellQuote(guestWasm)} || test -s ${shellQuote(guestWasm)}`);
copyFromGuest(guestWasm, wasmPath);
compile(generatedOraclePath, guestOracleSource, guestOracleElf, oracleElf);
const oracleOutput = runLinux(shellQuote(guestOracleElf));
if (!oracleOutput.includes('SOUNIO_CLINICAL_ORACLE_OK')) {
  throw new Error(`Sounio oracle did not complete:\n${oracleOutput}`);
}

compile(firewallSourcePath, guestFirewallSource, guestFirewallElf, firewallElf);
const firewallOracleOutput = runLinux(shellQuote(guestFirewallElf));
if (!firewallOracleOutput.includes('SOUNIO_EPISTEMIC_FIREWALL_OK')) {
  throw new Error(`Sounio epistemic firewall oracle did not complete:\n${firewallOracleOutput}`);
}

const dispositionNames = ['REFUSE', 'ASK', 'DEFER', 'ACT'];
const reasonNames = new Map([
  [10, 'integrity-invalid'],
  [11, 'calibration-invalid'],
  [12, 'signature-invalid'],
  [13, 'population-unsupported'],
  [14, 'certificate-expired'],
  [15, 'distribution-out-of-bounds'],
  [20, 'red-flag-requires-clinician'],
  [30, 'additional-observation-required'],
  [40, 'authorized'],
]);
const policyEntries = [];
for (const match of firewallOracleOutput.matchAll(/P\s+(\d+)\s+(\d+)\s+(\d+)/g)) {
  const mask = Number(match[1]);
  const disposition = dispositionNames[Number(match[2])];
  const reason = reasonNames.get(Number(match[3]));
  if (!disposition || !reason) throw new Error(`Unknown Sounio firewall output: ${match[0]}`);
  policyEntries.push({ mask, disposition, reason });
}
if (policyEntries.length !== 256 || new Set(policyEntries.map(entry => entry.mask)).size !== 256) {
  throw new Error(`Sounio firewall policy table is incomplete: ${policyEntries.length}/256 entries.`);
}
policyEntries.sort((a, b) => a.mask - b.mask);
const policyBundle = {
  schemaVersion: 'darwin.sounio.epistemic-firewall-policy.v1',
  policyVersion: 'epistemic-firewall-v0.1.0',
  generatedBy: 'clinical/epistemic-firewall/epistemic-firewall.sio',
  bitOrder: {
    integrityVerified: 1,
    calibrationValid: 2,
    signatureVerified: 4,
    populationSupported: 8,
    temporalValidity: 16,
    distributionInBounds: 32,
    redFlagPresent: 64,
    additionalObservationRequired: 128,
  },
  entries: policyEntries,
};
const policyBytes = Buffer.from(`${JSON.stringify(policyBundle, null, 2)}\n`);
writeFileSync(policyPath, policyBytes);

const oracleValues = Array.from({ length: vectorValues.length }, () => new Array(evidence.conditions.length));
for (const match of oracleOutput.matchAll(/R\s+(\d+)\s+(\d+)\s+([-+\d.eE]+)/g)) {
  oracleValues[Number(match[1])][Number(match[2])] = Number(match[3]);
}
if (oracleValues.some(row => row.some(value => !Number.isFinite(value)))) {
  throw new Error(`Could not parse all Sounio oracle values:\n${oracleOutput}`);
}
const oracleQuestions = new Array(vectorValues.length);
for (const match of oracleOutput.matchAll(/Q\s+(\d+)\s+(-?\d+)\s+([-+\d.eE]+)/g)) {
  oracleQuestions[Number(match[1])] = { index: Number(match[2]), informationGain: Number(match[3]) };
}
if (oracleQuestions.some(value => !value || !Number.isFinite(value.informationGain))) {
  throw new Error(`Could not parse all Sounio oracle next questions:\n${oracleOutput}`);
}

const wasmBytes = readFileSync(wasmPath);
const { instance } = await WebAssembly.instantiate(wasmBytes, { env: { log: Math.log } });
const { memory, infer, next_question: nextQuestion } = instance.exports;
if (!(memory instanceof WebAssembly.Memory) || typeof infer !== 'function' || typeof nextQuestion !== 'function') {
  throw new Error('Generated WASM does not expose the clinical ABI.');
}

const inputOffset = 0;
const modelOffset = 4096;
const outputOffset = 32768;
new Uint8Array(memory.buffer, modelOffset, modelBuffer.length).set(modelBuffer);

let maxAbsoluteError = 0;
let maxInformationGainError = 0;
const vectorResults = [];
for (let vectorIndex = 0; vectorIndex < vectorValues.length; vectorIndex += 1) {
  new Int32Array(memory.buffer, inputOffset, evidence.features.length).set(vectorValues[vectorIndex]);
  const rc = infer(inputOffset, modelOffset, outputOffset);
  if (rc !== 0) throw new Error(`WASM inference failed for vector ${vectorIndex}: ${rc}`);
  const output = new Float64Array(memory.buffer, outputOffset, evidence.conditions.length * 4);
  const posteriors = evidence.conditions.map((_, conditionIndex) => output[conditionIndex * 4]);
  posteriors.forEach((value, conditionIndex) => {
    maxAbsoluteError = Math.max(maxAbsoluteError, Math.abs(value - oracleValues[vectorIndex][conditionIndex]));
  });
  const leaderIndex = posteriors.indexOf(Math.max(...posteriors));
  const nextIndex = nextQuestion(inputOffset, modelOffset, outputOffset);
  const outputView = new DataView(memory.buffer);
  const storedNextIndex = outputView.getInt32(outputOffset + 384, true);
  const informationGain = outputView.getFloat64(outputOffset + 392, true);
  if (nextIndex !== storedNextIndex) throw new Error(`Next-question ABI mismatch for vector ${vectorIndex}`);
  maxInformationGainError = Math.max(
    maxInformationGainError,
    Math.abs(informationGain - oracleQuestions[vectorIndex].informationGain),
  );
  const expectedNextQuestionId = vectorBundle.vectors[vectorIndex].expectedNextQuestion;
  const expectedNextQuestionIndex = expectedNextQuestionId === null
    ? -1
    : featureIndex.get(expectedNextQuestionId);
  if (expectedNextQuestionIndex === undefined) {
    throw new Error(`Unknown expected next question: ${expectedNextQuestionId}`);
  }
  vectorResults.push({
    id: vectorBundle.vectors[vectorIndex].id,
    expectedLeader: vectorBundle.vectors[vectorIndex].expectedLeader,
    observedLeader: evidence.conditions[leaderIndex].id,
    passed: evidence.conditions[leaderIndex].id === vectorBundle.vectors[vectorIndex].expectedLeader,
    expectedNextQuestion: expectedNextQuestionIndex,
    oracleNextQuestion: oracleQuestions[vectorIndex].index,
    observedNextQuestion: nextIndex,
    nextQuestionPassed: nextIndex === expectedNextQuestionIndex
      && oracleQuestions[vectorIndex].index === expectedNextQuestionIndex,
    expectedInformationGain: oracleQuestions[vectorIndex].informationGain,
    observedInformationGain: informationGain,
  });
}

// The checked native runtime prints f64 values with six fractional digits.
// WASM retains full precision, so the captured-output parity bound is 1e-6.
const parityTolerance = 1e-6;
const parityPassed = maxAbsoluteError <= parityTolerance;
const informationGainParityPassed = maxInformationGainError <= parityTolerance;
const leadersPassed = vectorResults.every(result => result.passed);
const nextQuestionsPassed = vectorResults.every(result => result.nextQuestionPassed);
if (!parityPassed || !informationGainParityPassed || !leadersPassed || !nextQuestionsPassed) {
  throw new Error(
    `Clinical kernel gate failed: parity=${parityPassed}, EIGParity=${informationGainParityPassed}, ` +
    `maxError=${maxAbsoluteError}, maxEIGError=${maxInformationGainError}, ` +
    `oracle=${JSON.stringify(oracleValues)}, leaders=${JSON.stringify(vectorResults)}`,
  );
}

const compilerBytes = readFileSync(compiler);
const sourceBundle = Buffer.concat([
  readFileSync(codegenPath),
  readFileSync(oracleTemplatePath),
  readFileSync(firewallSourcePath),
  Buffer.from(generated),
]);
const receipt = {
  schemaVersion: 'darwin.sounio.clinical-receipt.v2',
  modelVersion: evidence.modelVersion,
  status: 'experimental',
  generatedAt: new Date().toISOString(),
  abi: {
    conditions: evidence.conditions.length,
    features: evidence.features.length,
    modelStrideBytes: 224,
    outputStrideBytes: 32,
    informationGainOffsetBytes: 288,
    nextQuestionOffsetBytes: 384,
    outputBytes: 400,
    imports: [
      { module: 'env', name: 'log', signature: '(f64)->f64', purpose: 'Shannon entropy' },
    ],
  },
  compiler: {
    identity: 'souc-self-hosted-x86_64',
    sha256: sha256(compilerBytes),
    sourceFreshness: 'local-snapshot-unverified-against-remote',
  },
  hashes: {
    sourceBundleSha256: sha256(sourceBundle),
    evidenceSha256: sha256(evidenceBytes),
    vectorsSha256: sha256(vectorBytes),
    modelSha256: sha256(modelBuffer),
    wasmSha256: sha256(wasmBytes),
    nativeOracleOutputSha256: sha256(Buffer.from(oracleOutput)),
    calibrationCertificateSha256: sha256(calibrationBytes),
    epistemicFirewallPolicySha256: sha256(policyBytes),
    epistemicFirewallSourceSha256: sha256(readFileSync(firewallSourcePath)),
    epistemicFirewallOracleOutputSha256: sha256(Buffer.from(firewallOracleOutput)),
  },
  gates: {
    nativeOracleExecuted: true,
    wasmInstantiated: true,
    nativeWasmParity: parityPassed,
    informationGainParity: informationGainParityPassed,
    oracleOutputPrecisionDecimals: 6,
    parityTolerance,
    maxAbsoluteError,
    maxInformationGainError,
    vectorLeaders: vectorResults,
    retrospectiveCalibration: calibrationEvidenceComplete,
    epistemicFirewallOracleExecuted: true,
    epistemicFirewallPolicyTableComplete: policyEntries.length === 256,
    signatureVerified: false,
  },
  signature: null,
  refusalReasons: [
    'Retrospective calibration has not been performed.',
    'The compiler artifact has not been reconciled with the current remote Sounio workspace.',
    'No production signing key was provided.',
  ],
};
const receiptBytes = Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`);
writeFileSync(receiptPath, receiptBytes);

const firewallReceipt = {
  schemaVersion: 'darwin.sounio.epistemic-firewall-receipt.v1',
  policyVersion: policyBundle.policyVersion,
  modelVersion: evidence.modelVersion,
  status: 'refused',
  generatedAt: receipt.generatedAt,
  hashes: {
    clinicalReceiptSha256: sha256(receiptBytes),
    evidenceSha256: sha256(evidenceBytes),
    modelSha256: sha256(modelBuffer),
    wasmSha256: sha256(wasmBytes),
    compilerSha256: sha256(compilerBytes),
    calibrationCertificateSha256: sha256(calibrationBytes),
    policySha256: sha256(policyBytes),
    policySourceSha256: sha256(readFileSync(firewallSourcePath)),
    policyOracleOutputSha256: sha256(Buffer.from(firewallOracleOutput)),
  },
  gates: {
    policyOracleExecuted: true,
    policyTableComplete: policyEntries.length === 256,
    calibrationCertificateValid: calibrationEvidenceComplete,
    compilerReconciled: false,
    distributionInBounds: calibrationEvidenceComplete && calibration.distribution.status === 'in-bounds',
    signatureVerified: false,
  },
  signature: null,
  refusalReasons: calibration.refusalReasons,
};
writeFileSync(firewallReceiptPath, `${JSON.stringify(firewallReceipt, null, 2)}\n`);

console.log(`Sounio clinical kernel built: ${wasmBytes.length} bytes`);
console.log(`Native/WASM max absolute error: ${maxAbsoluteError}`);
console.log(`Receipt: ${receiptPath}`);
console.log(`Epistemic firewall: ${firewallReceipt.status} (${policyEntries.length} Sounio policy states)`);
