import type {
  MedicationDoseRuleV1,
  MedicationKnowledgeBundleV1,
  MedicationSafetyEvaluationRequestV1,
  MedicationSafetyReceiptV1,
  MedicationSafetyResultV1,
} from './types';

interface SigningKeyRegistryV1 {
  schemaVersion: 'darwin.medication-signing-key-registry.v1';
  keys: Array<{
    keyId: string;
    algorithm: 'Ed25519';
    publicKeyBase64: string;
    status: 'active' | 'revoked';
  }>;
}

interface CompilerReceiptBoundary {
  schemaVersion: 'darwin.sounio.compiler-source-receipt.v1';
  compilerReconciled: boolean;
  hashes: { compilerSha256: string };
}

interface LoadedMedicationSafetyKernel {
  receipt: MedicationSafetyReceiptV1;
  receiptSha256: string;
  bundle: MedicationKnowledgeBundleV1;
  instance: WebAssembly.Instance;
  signatureVerified: boolean;
}

const ROOT = '/medication-safety';
const BASIS_CODES = {
  fixed: 0,
  microgram_per_kg_per_dose: 1,
  microgram_per_kg_per_day: 2,
} as const;

async function fetchBytes(path: string): Promise<Uint8Array> {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`medication-safety-asset-${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const source = new Uint8Array(bytes.byteLength);
  source.set(bytes);
  const digest = await crypto.subtle.digest('SHA-256', source.buffer);
  return [...new Uint8Array(digest)].map(value => value.toString(16).padStart(2, '0')).join('');
}

function decodeJson<T>(bytes: Uint8Array): T {
  return JSON.parse(new TextDecoder().decode(bytes)) as T;
}

function decodeBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function exactArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(new ArrayBuffer(bytes.byteLength));
  copy.set(bytes);
  return copy.buffer;
}

async function verifyBundleSignature(
  bundle: MedicationKnowledgeBundleV1,
  registry: SigningKeyRegistryV1,
): Promise<boolean> {
  if (!bundle.signature || bundle.signature.algorithm !== 'Ed25519') return false;
  const keyRecord = registry.keys.find(key => (
    key.keyId === bundle.signature?.keyId
    && key.status === 'active'
    && key.algorithm === 'Ed25519'
  ));
  if (!keyRecord) return false;
  const publicKey = await crypto.subtle.importKey(
    'raw',
    exactArrayBuffer(decodeBase64(keyRecord.publicKeyBase64)),
    { name: 'Ed25519' },
    false,
    ['verify'],
  );
  const unsignedPayload = new TextEncoder().encode(`${JSON.stringify({ ...bundle, signature: null }, null, 2)}\n`);
  return crypto.subtle.verify(
    { name: 'Ed25519' },
    publicKey,
    exactArrayBuffer(decodeBase64(bundle.signature.value)),
    exactArrayBuffer(unsignedPayload),
  );
}

let cachedKernel: Promise<LoadedMedicationSafetyKernel> | null = null;

export function loadMedicationSafetyKernel(): Promise<LoadedMedicationSafetyKernel> {
  cachedKernel ??= (async () => {
    const [receiptBytes, bundleBytes, wasmBytes, compilerBytes, registryBytes] = await Promise.all([
      fetchBytes(`${ROOT}/medication-safety.receipt.json`),
      fetchBytes(`${ROOT}/medication-knowledge-bundle.json`),
      fetchBytes(`${ROOT}/medication-safety-kernel.wasm`),
      fetchBytes(`${ROOT}/compiler-source.receipt.json`),
      fetchBytes(`${ROOT}/trusted-signing-keys.v1.json`),
    ]);
    const receipt = decodeJson<MedicationSafetyReceiptV1>(receiptBytes);
    const bundle = decodeJson<MedicationKnowledgeBundleV1>(bundleBytes);
    const compilerReceipt = decodeJson<CompilerReceiptBoundary>(compilerBytes);
    const registry = decodeJson<SigningKeyRegistryV1>(registryBytes);
    if (receipt.schemaVersion !== 'darwin.sounio.medication-safety-receipt.v1') throw new Error('medication-receipt-schema-mismatch');
    if (bundle.schemaVersion !== 'darwin.medication-knowledge-bundle.v1') throw new Error('medication-bundle-schema-mismatch');
    if (registry.schemaVersion !== 'darwin.medication-signing-key-registry.v1') throw new Error('medication-key-registry-schema-mismatch');
    if (compilerReceipt.schemaVersion !== 'darwin.sounio.compiler-source-receipt.v1') throw new Error('medication-compiler-receipt-schema-mismatch');
    const [bundleHash, wasmHash, compilerHash, registryHash, receiptHash] = await Promise.all([
      sha256Hex(bundleBytes),
      sha256Hex(wasmBytes),
      sha256Hex(compilerBytes),
      sha256Hex(registryBytes),
      sha256Hex(receiptBytes),
    ]);
    if (bundleHash !== receipt.hashes.medicationKnowledgeBundleSha256) throw new Error('medication-bundle-hash-mismatch');
    if (wasmHash !== receipt.hashes.wasmSha256) throw new Error('medication-wasm-hash-mismatch');
    if (compilerHash !== receipt.hashes.compilerSourceReceiptSha256) throw new Error('medication-compiler-receipt-hash-mismatch');
    if (registryHash !== receipt.hashes.trustedSigningKeysSha256) throw new Error('medication-key-registry-hash-mismatch');
    if (!compilerReceipt.compilerReconciled || compilerReceipt.hashes.compilerSha256 !== receipt.compiler.sha256) {
      throw new Error('medication-compiler-identity-mismatch');
    }
    if (bundle.medications.length !== 717 || new Set(bundle.medications.map(item => item.medicationId)).size !== 717) {
      throw new Error('medication-catalog-identity-mismatch');
    }
    const signatureVerified = await verifyBundleSignature(bundle, registry);
    if (signatureVerified !== receipt.gates.signatureVerified) throw new Error('medication-signature-gate-mismatch');
    const instance = new WebAssembly.Instance(new WebAssembly.Module(exactArrayBuffer(wasmBytes)));
    if (!(instance.exports.memory instanceof WebAssembly.Memory) || typeof instance.exports.evaluate !== 'function') {
      throw new Error('medication-wasm-abi-mismatch');
    }
    return { receipt, receiptSha256: receiptHash, bundle, instance, signatureVerified };
  })();
  return cachedKernel;
}

function reviewerGate(rule: MedicationDoseRuleV1): boolean {
  const approved = rule.review.reviewers.filter(reviewer => reviewer.decision === 'approved');
  return approved.some(reviewer => reviewer.role === 'physician')
    && approved.some(reviewer => reviewer.role === 'pharmacist');
}

function refusalResult(
  request: MedicationSafetyEvaluationRequestV1,
  reasons: string[],
  receiptSha256: string | null,
  integrityVerified: boolean,
): MedicationSafetyResultV1 {
  return {
    schemaVersion: 'darwin.sounio.medication-safety-result.v1',
    disposition: 'REFUSE',
    medicationId: request.medicationId,
    ruleId: request.ruleId || null,
    calculatedDoseMicrogram: null,
    unroundedDoseMicrogram: null,
    administrationVolumeMicroliter: null,
    maximumDoseApplied: false,
    blockers: reasons.map(code => ({ code, message: code.replaceAll('-', ' ') })),
    warnings: [],
    explanation: ['O Darwin Rx não executou matemática clínica.'],
    sourceIds: [],
    receiptSha256,
    integrityVerified,
  };
}

function messagesForMask(mask: number, kind: 'blocker' | 'warning') {
  const table = kind === 'blocker'
    ? [
        [1, 'integrity-invalid'], [2, 'rule-not-approved'], [4, 'independent-review-missing'],
        [8, 'indication-missing'], [16, 'presentation-missing'], [32, 'age-outside-rule'],
        [64, 'weight-required'], [128, 'severe-interaction'], [256, 'medication-limit-exceeded'],
        [512, 'source-expired'], [1024, 'allergy-blocked'], [2048, 'renal-context-blocked'],
        [4096, 'hepatic-context-blocked'], [8192, 'reproductive-context-blocked'],
        [16384, 'duplicate-therapy'], [32768, 'integer-contract-invalid'],
      ] as const
    : [[1, 'moderate-interaction-review'], [2, 'lactation-review']] as const;
  return table
    .filter(([bit]) => (mask & bit) !== 0)
    .map(([, code]) => ({ code, message: code.replaceAll('-', ' ') }));
}

export async function evaluateMedicationSafety(
  request: MedicationSafetyEvaluationRequestV1,
): Promise<MedicationSafetyResultV1> {
  let kernel: LoadedMedicationSafetyKernel;
  try {
    kernel = await loadMedicationSafetyKernel();
  } catch (error) {
    return refusalResult(request, [error instanceof Error ? error.message : 'integrity-invalid'], null, false);
  }
  const rule = kernel.bundle.doseRules.find(candidate => (
    candidate.id === request.ruleId && candidate.medicationId === request.medicationId
  ));
  const currentDate = new Date().toISOString().slice(0, 10);
  const preflightReasons = [
    ...(!kernel.receipt.gates.productionAuthorized ? kernel.receipt.refusalReasons : []),
    ...(!rule ? ['structured-rule-not-found'] : []),
    ...(rule && rule.review.status !== 'approved' ? ['structured-rule-not-approved'] : []),
    ...(rule && !reviewerGate(rule) ? ['independent-review-missing'] : []),
    ...(rule && (currentDate < rule.review.validFrom || currentDate > rule.review.validUntil) ? ['structured-rule-expired'] : []),
  ];
  if (!rule || preflightReasons.length > 0) {
    return refusalResult(request, [...new Set(preflightReasons)], kernel.receiptSha256, true);
  }

  const input = [
    1,
    rule.review.status === 'approved' ? 1 : 0,
    rule.review.reviewers.some(item => item.role === 'physician' && item.decision === 'approved') ? 1 : 0,
    rule.review.reviewers.some(item => item.role === 'pharmacist' && item.decision === 'approved') ? 1 : 0,
    request.indicationSelected ? 1 : 0,
    request.presentationSelected ? 1 : 0,
    BASIS_CODES[rule.dose.basis],
    rule.dose.amountMicrogram,
    request.patient.weightGram ?? 0,
    rule.dose.dosesPerDay,
    rule.dose.maximumMicrogramPerDose ?? 0,
    kernel.bundle.medications.find(item => item.medicationId === request.medicationId)
      ?.presentations.find(item => item.id === rule.presentationId)?.concentrationMicrogramPerMilliliter ?? 0,
    kernel.bundle.medications.find(item => item.medicationId === request.medicationId)
      ?.presentations.find(item => item.id === rule.presentationId)?.administrationIncrementMicroliter ?? 0,
    request.patient.ageDays ?? -1,
    rule.population.minimumAgeDays,
    rule.population.maximumAgeDaysExclusive,
    request.severeInteraction ? 1 : 0,
    request.moderateInteraction ? 1 : 0,
    request.patient.currentMedicationIds.length,
    1,
    request.allergyBlocked ? 1 : 0,
    request.renalContextBlocked ? 1 : 0,
    request.hepaticContextBlocked ? 1 : 0,
    request.reproductiveContextBlocked ? 1 : 0,
    request.lactationWarning ? 1 : 0,
    request.duplicateTherapy ? 1 : 0,
  ];
  const memory = kernel.instance.exports.memory as WebAssembly.Memory;
  const evaluate = kernel.instance.exports.evaluate as (inputOffset: number, outputOffset: number) => number;
  const view = new DataView(memory.buffer);
  input.forEach((value, index) => view.setBigInt64(kernel.receipt.abi.inputOffsetBytes + index * 8, BigInt(value), true));
  evaluate(kernel.receipt.abi.inputOffsetBytes, kernel.receipt.abi.outputOffsetBytes);
  const output = Array.from({ length: 8 }, (_, index) => (
    Number(view.getBigInt64(kernel.receipt.abi.outputOffsetBytes + index * 8, true))
  ));
  const dispositions = ['REFUSE', 'REVIEW', 'READY_FOR_CONFIRMATION'] as const;
  return {
    schemaVersion: 'darwin.sounio.medication-safety-result.v1',
    disposition: dispositions[output[0]] || 'REFUSE',
    medicationId: request.medicationId,
    ruleId: rule.id,
    calculatedDoseMicrogram: output[0] === 0 ? null : output[3],
    administrationVolumeMicroliter: output[0] === 0 ? null : output[4],
    unroundedDoseMicrogram: output[0] === 0 ? null : output[5],
    maximumDoseApplied: output[6] === 1,
    blockers: messagesForMask(output[1], 'blocker'),
    warnings: messagesForMask(output[2], 'warning'),
    explanation: [`Regra ${rule.id} executada pelo kernel Sounio inteiro.`],
    sourceIds: rule.review.sourceIds,
    receiptSha256: kernel.receiptSha256,
    integrityVerified: true,
  };
}
