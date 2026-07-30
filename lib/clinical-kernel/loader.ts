import { adaptClinicalInput } from './adapter';
import type {
  AdaptedClinicalInput,
  ClinicalCalibrationCertificate,
  ClinicalEvidenceBundle,
  ClinicalFirewallDecision,
  ClinicalFirewallPolicy,
  ClinicalFirewallReceipt,
  ClinicalKernelInput,
  ClinicalKernelReceipt,
  EpistemicDifferential,
  SounioCompilerSourceReceipt,
} from './types';

const RECEIPT_SCHEMA = 'darwin.sounio.clinical-receipt.v3';
const EVIDENCE_SCHEMA = 'darwin.sounio.clinical-evidence.v1';
const CALIBRATION_SCHEMA = 'darwin.sounio.calibration-certificate.v1';
const POLICY_SCHEMA = 'darwin.sounio.epistemic-firewall-policy.v1';
const FIREWALL_RECEIPT_SCHEMA = 'darwin.sounio.epistemic-firewall-receipt.v2';
const COMPILER_SOURCE_RECEIPT_SCHEMA = 'darwin.sounio.compiler-source-receipt.v1';
const COMPILER_SOURCE_BRANCH = 'integration/sounio-dev-ready-base';
const INPUT_OFFSET = 0;
const MODEL_OFFSET = 4096;
const OUTPUT_OFFSET = 32768;

interface KernelAssets {
  receipt: ClinicalKernelReceipt;
  calibration: ClinicalCalibrationCertificate;
  policy: ClinicalFirewallPolicy;
  firewallReceipt: ClinicalFirewallReceipt;
  compilerSourceReceipt: SounioCompilerSourceReceipt;
  evidence: ClinicalEvidenceBundle;
  model: ArrayBuffer;
  wasm: ArrayBuffer;
}

function assetRoot(): string {
  if (typeof window === 'undefined') return '/clinical-kernel';
  const prefix = window.location.pathname.startsWith('/darwin-MFC/') ? '/darwin-MFC' : '';
  return `${prefix}/clinical-kernel`;
}

async function sha256Hex(bytes: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

async function fetchBytes(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`asset-unavailable:${response.status}`);
  return response.arrayBuffer();
}

async function loadAssets(): Promise<KernelAssets> {
  const root = assetRoot();
  const receiptBytes = await fetchBytes(`${root}/clinical-kernel.receipt.json`);
  const receipt = JSON.parse(new TextDecoder().decode(receiptBytes)) as ClinicalKernelReceipt;
  if (receipt.schemaVersion !== RECEIPT_SCHEMA) throw new Error('receipt-schema-mismatch');

  const [
    evidenceBytes,
    model,
    wasm,
    calibrationBytes,
    policyBytes,
    firewallReceiptBytes,
    compilerSourceReceiptBytes,
  ] = await Promise.all([
    fetchBytes(`${root}/evidence-bundle.json`),
    fetchBytes(`${root}/clinical-model.bin`),
    fetchBytes(`${root}/clinical-kernel.wasm`),
    fetchBytes(`${root}/calibration-certificate.json`),
    fetchBytes(`${root}/epistemic-firewall.policy.json`),
    fetchBytes(`${root}/epistemic-firewall.receipt.json`),
    fetchBytes(`${root}/compiler-source.receipt.json`),
  ]);
  const evidence = JSON.parse(new TextDecoder().decode(evidenceBytes)) as ClinicalEvidenceBundle;
  const calibration = JSON.parse(new TextDecoder().decode(calibrationBytes)) as ClinicalCalibrationCertificate;
  const policy = JSON.parse(new TextDecoder().decode(policyBytes)) as ClinicalFirewallPolicy;
  const firewallReceipt = JSON.parse(new TextDecoder().decode(firewallReceiptBytes)) as ClinicalFirewallReceipt;
  const compilerSourceReceipt = JSON.parse(
    new TextDecoder().decode(compilerSourceReceiptBytes),
  ) as SounioCompilerSourceReceipt;
  if (evidence.schemaVersion !== EVIDENCE_SCHEMA) throw new Error('evidence-schema-mismatch');
  if (calibration.schemaVersion !== CALIBRATION_SCHEMA) throw new Error('calibration-schema-mismatch');
  if (policy.schemaVersion !== POLICY_SCHEMA) throw new Error('firewall-policy-schema-mismatch');
  if (firewallReceipt.schemaVersion !== FIREWALL_RECEIPT_SCHEMA) throw new Error('firewall-receipt-schema-mismatch');
  if (compilerSourceReceipt.schemaVersion !== COMPILER_SOURCE_RECEIPT_SCHEMA) {
    throw new Error('compiler-source-receipt-schema-mismatch');
  }
  if (evidence.modelVersion !== receipt.modelVersion) throw new Error('model-version-mismatch');
  if (calibration.modelVersion !== receipt.modelVersion) throw new Error('calibration-model-version-mismatch');
  if (firewallReceipt.modelVersion !== receipt.modelVersion) throw new Error('firewall-model-version-mismatch');
  if (firewallReceipt.policyVersion !== policy.policyVersion) throw new Error('firewall-policy-version-mismatch');

  const [
    receiptHash,
    evidenceHash,
    modelHash,
    wasmHash,
    calibrationHash,
    policyHash,
    compilerSourceReceiptHash,
  ] = await Promise.all([
    sha256Hex(receiptBytes),
    sha256Hex(evidenceBytes),
    sha256Hex(model),
    sha256Hex(wasm),
    sha256Hex(calibrationBytes),
    sha256Hex(policyBytes),
    sha256Hex(compilerSourceReceiptBytes),
  ]);
  if (evidenceHash !== receipt.hashes.evidenceSha256) throw new Error('evidence-hash-mismatch');
  if (modelHash !== receipt.hashes.modelSha256) throw new Error('model-hash-mismatch');
  if (wasmHash !== receipt.hashes.wasmSha256) throw new Error('wasm-hash-mismatch');
  if (calibrationHash !== receipt.hashes.calibrationCertificateSha256) throw new Error('calibration-hash-mismatch');
  if (policyHash !== receipt.hashes.epistemicFirewallPolicySha256) throw new Error('firewall-policy-hash-mismatch');
  if (receiptHash !== firewallReceipt.hashes.clinicalReceiptSha256) throw new Error('firewall-clinical-receipt-hash-mismatch');
  if (compilerSourceReceiptHash !== receipt.hashes.compilerSourceReceiptSha256) {
    throw new Error('compiler-source-receipt-hash-mismatch');
  }
  if (
    evidenceHash !== firewallReceipt.hashes.evidenceSha256
    || modelHash !== firewallReceipt.hashes.modelSha256
    || wasmHash !== firewallReceipt.hashes.wasmSha256
    || calibrationHash !== firewallReceipt.hashes.calibrationCertificateSha256
    || policyHash !== firewallReceipt.hashes.policySha256
    || receipt.compiler.sha256 !== firewallReceipt.hashes.compilerSha256
    || compilerSourceReceiptHash !== firewallReceipt.hashes.compilerSourceReceiptSha256
    || compilerSourceReceipt.artifacts.compiler.sha256 !== receipt.compiler.sha256
  ) {
    throw new Error('firewall-cross-binding-mismatch');
  }
  const compilerSourceGatesPassed = Object.values(compilerSourceReceipt.gates).every(value => value === true);
  const compilerSourceInternallyReconciled = compilerSourceGatesPassed
    && compilerSourceReceipt.repository.clean === true
    && compilerSourceReceipt.repository.sourceBranch === COMPILER_SOURCE_BRANCH
    && compilerSourceReceipt.repository.commit === compilerSourceReceipt.repository.remoteBranchCommit
    && compilerSourceReceipt.artifacts.fixedPointStage2?.sha256 === receipt.compiler.sha256
    && compilerSourceReceipt.artifacts.fixedPointStage3?.sha256 === receipt.compiler.sha256
    && compilerSourceReceipt.signature === null;
  if (
    compilerSourceReceipt.compilerReconciled !== compilerSourceInternallyReconciled
    || receipt.gates.compilerReconciled !== compilerSourceInternallyReconciled
    || firewallReceipt.gates.compilerReconciled !== compilerSourceInternallyReconciled
  ) {
    throw new Error('compiler-reconciliation-gate-mismatch');
  }
  if (receipt.abi.features !== evidence.features.length || receipt.abi.conditions !== evidence.conditions.length) {
    throw new Error('abi-count-mismatch');
  }
  if (
    receipt.abi.informationGainOffsetBytes !== 288
    || receipt.abi.nextQuestionOffsetBytes !== 384
    || receipt.abi.outputBytes !== 400
    || receipt.abi.imports.length !== 1
    || receipt.abi.imports[0].module !== 'env'
    || receipt.abi.imports[0].name !== 'log'
    || receipt.abi.imports[0].signature !== '(f64)->f64'
  ) {
    throw new Error('abi-v2-layout-mismatch');
  }
  if (!receipt.gates.nativeOracleExecuted || !receipt.gates.nativeWasmParity) {
    throw new Error('parity-gate-failed');
  }
  const masks = new Set(policy.entries.map(entry => entry.mask));
  if (
    policy.entries.length !== 256
    || masks.size !== 256
    || !firewallReceipt.gates.policyOracleExecuted
    || !firewallReceipt.gates.policyTableComplete
  ) {
    throw new Error('firewall-policy-table-incomplete');
  }
  if (
    receipt.status === 'calibrated'
    && (!compilerSourceInternallyReconciled || !receipt.signature || !receipt.gates.signatureVerified)
  ) {
    throw new Error('calibrated-receipt-signature-required');
  }

  return { receipt, calibration, policy, firewallReceipt, compilerSourceReceipt, evidence, model, wasm };
}

function technicalRefusal(reason: string): EpistemicDifferential {
  return {
    status: 'refused',
    hypotheses: [],
    nextQuestion: null,
    redFlags: [],
    modelVersion: 'unavailable',
    evidenceVersion: 'unavailable',
    compilerIdentity: 'unavailable',
    integrityVerified: false,
    signatureVerified: false,
    policy: {
      disposition: 'REFUSE',
      reason,
      mask: 0,
      policyVersion: 'unavailable',
      certificateId: 'unavailable',
      certificateStatus: 'unavailable',
    },
    refusalReasons: [reason],
  };
}

function evaluateFirewall(
  assets: KernelAssets,
  input: ClinicalKernelInput,
  adapted: AdaptedClinicalInput,
): ClinicalFirewallDecision {
  const { receipt, calibration, policy, firewallReceipt } = assets;
  const now = Date.now();
  const validFrom = calibration.validFrom ? Date.parse(calibration.validFrom) : Number.NaN;
  const validUntil = calibration.validUntil ? Date.parse(calibration.validUntil) : Number.NaN;
  const isSha256 = (value: string | null | undefined): value is string => (
    typeof value === 'string' && /^[a-f0-9]{64}$/.test(value)
  );
  const classCoverage = Object.values(calibration.coverage.classConditional);
  const subgroupCoverage = Object.values(calibration.coverage.subgroupConditional);
  const calibrationEvidenceComplete = Number.isFinite(calibration.coverage.marginalObserved)
    && Number.isFinite(calibration.coverage.lowerConfidenceBound)
    && calibration.coverage.lowerConfidenceBound! >= calibration.coverage.target
    && classCoverage.length === assets.evidence.conditions.length
    && classCoverage.every(value => Number.isFinite(value) && value >= calibration.coverage.target)
    && subgroupCoverage.length > 0
    && subgroupCoverage.every(value => Number.isFinite(value) && value >= calibration.coverage.target)
    && Object.values(calibration.clinicalUtility).every(value => Number.isFinite(value))
    && isSha256(calibration.distribution.referenceFingerprint)
    && Object.values(calibration.hashes).every(isSha256);
  const calibrationValid = calibration.status === 'calibrated'
    && calibrationEvidenceComplete
    && receipt.gates.retrospectiveCalibration === true
    && firewallReceipt.gates.calibrationCertificateValid
    && receipt.gates.compilerReconciled === true
    && firewallReceipt.gates.compilerReconciled === true;
  const signatureVerified = receipt.gates.signatureVerified === true
    && firewallReceipt.gates.signatureVerified
    && Boolean(receipt.signature)
    && Boolean(firewallReceipt.signature)
    && Boolean(calibration.signature);
  const ageDays = input.ageYears === undefined ? Number.NaN : input.ageYears * 365.2425;
  const populationSupported = Number.isFinite(ageDays)
    && ageDays >= calibration.population.ageMinimumDays
    && input.ageYears! < calibration.population.ageMaximumYearsExclusive
    && calibration.population.country === 'BR'
    && calibration.population.careSetting === 'APS/SUS';
  const temporalValidity = calibrationValid
    && Number.isFinite(validFrom)
    && Number.isFinite(validUntil)
    && now >= validFrom
    && now <= validUntil;
  const distributionInBounds = calibrationValid
    && calibration.distribution.status === 'in-bounds'
    && firewallReceipt.gates.distributionInBounds;

  const states: Array<[keyof ClinicalFirewallPolicy['bitOrder'], boolean]> = [
    ['integrityVerified', true],
    ['calibrationValid', calibrationValid],
    ['signatureVerified', signatureVerified],
    ['populationSupported', populationSupported],
    ['temporalValidity', temporalValidity],
    ['distributionInBounds', distributionInBounds],
    ['redFlagPresent', adapted.redFlags.length > 0],
    ['additionalObservationRequired', adapted.vector.some(value => value === -1)],
  ];
  const mask = states.reduce(
    (value, [key, enabled]) => enabled ? value | policy.bitOrder[key] : value,
    0,
  );
  const entry = policy.entries.find(candidate => candidate.mask === mask);
  if (!entry) throw new Error(`firewall-policy-mask-missing:${mask}`);

  return {
    disposition: entry.disposition,
    reason: entry.reason,
    mask,
    policyVersion: policy.policyVersion,
    certificateId: calibration.certificateId,
    certificateStatus: calibration.status,
  };
}

function policyRefusal(
  assets: KernelAssets,
  decision: ClinicalFirewallDecision,
  redFlags: string[],
): EpistemicDifferential {
  const refusalReasons = Array.from(new Set([
    decision.reason,
    ...assets.firewallReceipt.refusalReasons,
    ...assets.calibration.refusalReasons,
  ]));
  return {
    status: 'refused',
    hypotheses: [],
    nextQuestion: null,
    redFlags,
    modelVersion: assets.receipt.modelVersion,
    evidenceVersion: assets.evidence.schemaVersion,
    compilerIdentity: `${assets.receipt.compiler.identity}:${assets.receipt.compiler.sha256.slice(0, 12)}`,
    integrityVerified: true,
    signatureVerified: false,
    policy: decision,
    refusalReasons,
  };
}

export async function runSilentClinicalKernel(input: ClinicalKernelInput): Promise<EpistemicDifferential> {
  try {
    const assets = await loadAssets();
    const { receipt, evidence, model, wasm } = assets;
    const adapted = adaptClinicalInput(input, evidence);
    const policy = evaluateFirewall(assets, input, adapted);
    if (policy.disposition === 'REFUSE') {
      return policyRefusal(assets, policy, adapted.redFlags);
    }
    const { instance } = await WebAssembly.instantiate(wasm, { env: { log: Math.log } });
    const memory = instance.exports.memory;
    const infer = instance.exports.infer;
    const nextQuestion = instance.exports.next_question;
    if (!(memory instanceof WebAssembly.Memory) || typeof infer !== 'function' || typeof nextQuestion !== 'function') {
      throw new Error('wasm-abi-exports-missing');
    }

    new Int32Array(memory.buffer, INPUT_OFFSET, adapted.vector.length).set(adapted.vector);
    new Uint8Array(memory.buffer, MODEL_OFFSET, model.byteLength).set(new Uint8Array(model));
    const nextQuestionIndex = (nextQuestion as (input: number, model: number, output: number) => number)(
      INPUT_OFFSET,
      MODEL_OFFSET,
      OUTPUT_OFFSET,
    );
    if (nextQuestionIndex < -1 || nextQuestionIndex >= evidence.features.length) {
      throw new Error(`wasm-invalid-next-question:${nextQuestionIndex}`);
    }
    const outputView = new DataView(memory.buffer);
    if (outputView.getInt32(OUTPUT_OFFSET + receipt.abi.nextQuestionOffsetBytes, true) !== nextQuestionIndex) {
      throw new Error('wasm-next-question-abi-mismatch');
    }

    const output = new Float64Array(memory.buffer, OUTPUT_OFFSET, evidence.conditions.length * 4);
    const hypotheses = evidence.conditions.map((condition, index) => {
      const posterior = output[index * 4];
      const lower = output[index * 4 + 1];
      const upper = output[index * 4 + 2];
      const confidence = output[index * 4 + 3];
      if (![posterior, lower, upper, confidence].every(Number.isFinite)) {
        throw new Error('wasm-non-finite-output');
      }
      return {
        conditionId: condition.id,
        label: condition.label,
        posterior,
        interval: [lower, upper] as [number, number],
        confidence,
        contributions: Object.entries(condition.likelihoods)
          .filter(([featureId]) => adapted.presentFeatureIds.has(featureId))
          .map(([featureId, likelihood]) => ({
            featureId,
            label: evidence.features.find(feature => feature.id === featureId)?.label ?? featureId,
            direction: likelihood[0] > 1 ? 'increased' as const : likelihood[0] < 1 ? 'reduced' as const : 'neutral' as const,
            provenanceReferenceIds: evidence.references.map(reference => reference.id),
          })),
      };
    }).sort((a, b) => b.posterior - a.posterior);

    return {
      status: receipt.status,
      hypotheses,
      nextQuestion: nextQuestionIndex >= 0 ? {
        featureId: evidence.features[nextQuestionIndex].id,
        question: evidence.features[nextQuestionIndex].question,
        informationGain: outputView.getFloat64(
          OUTPUT_OFFSET + receipt.abi.informationGainOffsetBytes + nextQuestionIndex * 8,
          true,
        ),
      } : null,
      redFlags: adapted.redFlags,
      modelVersion: receipt.modelVersion,
      evidenceVersion: evidence.schemaVersion,
      compilerIdentity: `${receipt.compiler.identity}:${receipt.compiler.sha256.slice(0, 12)}`,
      integrityVerified: true,
      signatureVerified: receipt.gates.signatureVerified,
      policy,
      refusalReasons: receipt.refusalReasons,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'unknown-kernel-error';
    return technicalRefusal(reason);
  }
}
