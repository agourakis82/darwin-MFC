import type {
  MedicationAssuranceReceiptV1,
  MedicationEnvelopeArtifactBundleV1,
  MedicationEnvelopeRequestV1,
  MedicationEnvelopeResultV1,
  MedicationEvidenceGraphV1,
} from './types';

interface CompilerReceiptBoundary {
  schemaVersion: 'darwin.sounio.compiler-source-receipt.v1';
  compilerReconciled: boolean;
  artifacts: { compiler: { sha256: string } };
}

interface PilotKeyRegistryBoundary {
  schemaVersion: 'darwin.medication-pilot-key-registry.v1';
  environment: 'staging-synthetic-only';
  keys: Array<{
    keyId: string;
    algorithm: 'Ed25519';
    publicKeyBase64: string;
    status: 'active' | 'revoked';
  }>;
}

export interface MedicationEnvelopeRuntimeInspectionV1 {
  receipt: MedicationAssuranceReceiptV1;
  receiptSha256: string;
  graph: MedicationEvidenceGraphV1;
  artifacts: MedicationEnvelopeArtifactBundleV1;
  wasmInstantiated: boolean;
  syntheticPilotAvailable: boolean;
  refusalReasons: string[];
}

const ROOT = '/medication-envelope';

async function fetchBytes(path: string): Promise<Uint8Array> {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`medication-envelope-asset-${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const digest = await crypto.subtle.digest('SHA-256', copy.buffer);
  return [...new Uint8Array(digest)].map(value => value.toString(16).padStart(2, '0')).join('');
}

function decodeJson<T>(bytes: Uint8Array): T {
  return JSON.parse(new TextDecoder().decode(bytes)) as T;
}

function exactArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(new ArrayBuffer(bytes.byteLength));
  copy.set(bytes);
  return copy.buffer;
}

let cachedInspection: Promise<MedicationEnvelopeRuntimeInspectionV1> | null = null;

export function inspectMedicationEnvelopeRuntime(): Promise<MedicationEnvelopeRuntimeInspectionV1> {
  cachedInspection ??= (async () => {
    const [receiptBytes, graphBytes, artifactBytes, wasmBytes, compilerBytes, pilotKeyBytes] = await Promise.all([
      fetchBytes(`${ROOT}/medication-assurance.receipt.json`),
      fetchBytes(`${ROOT}/medication-evidence-graph.json`),
      fetchBytes(`${ROOT}/medication-envelope-artifacts.json`),
      fetchBytes(`${ROOT}/medication-envelope-kernel.wasm`),
      fetchBytes(`${ROOT}/compiler-source.receipt.json`),
      fetchBytes(`${ROOT}/trusted-pilot-keys.v1.json`),
    ]);
    const receipt = decodeJson<MedicationAssuranceReceiptV1>(receiptBytes);
    const graph = decodeJson<MedicationEvidenceGraphV1>(graphBytes);
    const artifacts = decodeJson<MedicationEnvelopeArtifactBundleV1>(artifactBytes);
    const compilerReceipt = decodeJson<CompilerReceiptBoundary>(compilerBytes);
    const pilotKeys = decodeJson<PilotKeyRegistryBoundary>(pilotKeyBytes);
    if (receipt.schemaVersion !== 'darwin.sounio.medication-assurance-receipt.v1') throw new Error('envelope-receipt-schema-mismatch');
    if (graph.schemaVersion !== 'darwin.medication-evidence-graph.v1') throw new Error('envelope-graph-schema-mismatch');
    if (artifacts.schemaVersion !== 'darwin.medication-envelope-artifact-bundle.v1') throw new Error('envelope-artifact-schema-mismatch');
    if (compilerReceipt.schemaVersion !== 'darwin.sounio.compiler-source-receipt.v1') throw new Error('envelope-compiler-schema-mismatch');
    if (pilotKeys.schemaVersion !== 'darwin.medication-pilot-key-registry.v1') throw new Error('envelope-pilot-key-schema-mismatch');

    const [receiptHash, graphHash, artifactHash, wasmHash, compilerHash, pilotKeysHash] = await Promise.all([
      sha256Hex(receiptBytes),
      sha256Hex(graphBytes),
      sha256Hex(artifactBytes),
      sha256Hex(wasmBytes),
      sha256Hex(compilerBytes),
      sha256Hex(pilotKeyBytes),
    ]);
    if (graphHash !== receipt.hashes.evidenceGraphSha256) throw new Error('envelope-graph-hash-mismatch');
    if (graph.merkleRootSha256 !== receipt.hashes.evidenceGraphMerkleRootSha256) throw new Error('envelope-merkle-root-mismatch');
    if (artifactHash !== receipt.hashes.artifactBundleSha256) throw new Error('envelope-artifact-hash-mismatch');
    if (wasmHash !== receipt.hashes.wasmSha256) throw new Error('envelope-wasm-hash-mismatch');
    if (compilerHash !== receipt.hashes.compilerSourceReceiptSha256) throw new Error('envelope-compiler-receipt-hash-mismatch');
    if (compilerReceipt.artifacts.compiler.sha256 !== receipt.hashes.compilerSha256) throw new Error('envelope-compiler-identity-mismatch');
    if (!compilerReceipt.compilerReconciled) throw new Error('envelope-compiler-not-reconciled');
    if (pilotKeysHash !== receipt.hashes.trustedPilotKeysSha256) throw new Error('envelope-pilot-key-hash-mismatch');
    const wasmBuffer = exactArrayBuffer(wasmBytes);
    if (!WebAssembly.validate(wasmBuffer)) throw new Error('envelope-wasm-invalid');
    const module = new WebAssembly.Module(wasmBuffer);
    if (WebAssembly.Module.imports(module).length !== 0) throw new Error('envelope-wasm-imports-forbidden');
    const instance = new WebAssembly.Instance(module);
    if (!(instance.exports.memory instanceof WebAssembly.Memory) || typeof instance.exports.evaluate !== 'function') {
      throw new Error('envelope-wasm-abi-incomplete');
    }

    const allRequiredGates = [
      receipt.gates.graphIntegrity,
      receipt.gates.graphCycleFree,
      receipt.gates.allEvidenceCurrent,
      receipt.gates.compilerReconciled,
      receipt.gates.nativeWasmExactParity,
      receipt.gates.cvc5ProofVerified,
      receipt.gates.z3CountermodelAgreement,
      receipt.gates.leanSemanticsVerified,
      receipt.gates.solverAgreement,
      receipt.gates.pilotCredentialKeyAvailable,
      receipt.gates.pilotAuthorized,
    ];
    const syntheticPilotAvailable = allRequiredGates.every(Boolean)
      && Boolean((artifacts as unknown as { pilotAuthorized: boolean }).pilotAuthorized)
      && pilotKeys.keys.some(key => key.status === 'active');
    return {
      receipt,
      receiptSha256: receiptHash,
      graph,
      artifacts,
      wasmInstantiated: true,
      syntheticPilotAvailable,
      refusalReasons: syntheticPilotAvailable ? [] : receipt.refusalReasons,
    };
  })();
  return cachedInspection;
}

export async function evaluateMedicationEnvelope(
  request: MedicationEnvelopeRequestV1,
): Promise<MedicationEnvelopeResultV1> {
  try {
    const runtime = await inspectMedicationEnvelopeRuntime();
    const artifact = runtime.artifacts.artifacts.find(item => item.artifactId === request.artifactId);
    const requestBound = request.expectedGraphMerkleRootSha256 === runtime.graph.merkleRootSha256
      && request.expectedReceiptSha256 === runtime.receiptSha256;
    if (!runtime.syntheticPilotAvailable || !artifact || !requestBound) {
      return {
        schemaVersion: 'darwin.sounio.medication-envelope-result.v1',
        disposition: 'REFUSE',
        artifactId: request.artifactId,
        evaluatedConstraints: [],
        unknownVariables: [],
        counterexample: null,
        graphMerkleRootSha256: runtime.graph.merkleRootSha256,
        receiptSha256: runtime.receiptSha256,
        credentialId: null,
        integrityVerified: requestBound,
        clinicalSafetyClaim: null,
      };
    }
    // Candidate artifacts deliberately have no clinical ABI encoder. Shipping
    // one before reviewed constraints would create a TypeScript fallback path.
    return {
      schemaVersion: 'darwin.sounio.medication-envelope-result.v1',
      disposition: 'REFUSE',
      artifactId: artifact.artifactId,
      evaluatedConstraints: [],
      unknownVariables: [],
      counterexample: null,
      graphMerkleRootSha256: runtime.graph.merkleRootSha256,
      receiptSha256: runtime.receiptSha256,
      credentialId: null,
      integrityVerified: true,
      clinicalSafetyClaim: null,
    };
  } catch {
    return {
      schemaVersion: 'darwin.sounio.medication-envelope-result.v1',
      disposition: 'REFUSE',
      artifactId: request.artifactId,
      evaluatedConstraints: [],
      unknownVariables: [],
      counterexample: null,
      graphMerkleRootSha256: null,
      receiptSha256: null,
      credentialId: null,
      integrityVerified: false,
      clinicalSafetyClaim: null,
    };
  }
}
