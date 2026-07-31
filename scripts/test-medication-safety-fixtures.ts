import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { medicamentosConsolidados } from '../lib/data/medicamentos/index';
import { analyzeMedicationIds, INTERACTION_KNOWLEDGE_STATUS } from '../lib/utils/drug-interactions';
import { toFhirMedicationRequestDraft } from '../lib/medication-safety/fhir';
import type { StructuredPrescriptionDraftV2 } from '../lib/medication-safety/types';
import { convertMedicamentoRowToMedicamento } from '../lib/supabase/transforms/medicamentos';

const root = process.cwd();
const publicDir = resolve(root, 'public/medication-safety');
const clinicalDir = resolve(root, 'clinical/medication-safety');
const hash = (bytes: Buffer | Uint8Array) => createHash('sha256').update(bytes).digest('hex');

const receiptBytes = readFileSync(resolve(publicDir, 'medication-safety.receipt.json'));
const bundleBytes = readFileSync(resolve(publicDir, 'medication-knowledge-bundle.json'));
const wasmBytes = readFileSync(resolve(publicDir, 'medication-safety-kernel.wasm'));
const compilerBytes = readFileSync(resolve(publicDir, 'compiler-source.receipt.json'));
const keyRegistryBytes = readFileSync(resolve(publicDir, 'trusted-signing-keys.v1.json'));
const registryBytes = readFileSync(resolve(clinicalDir, 'source-registry.v1.json'));
const rulesBytes = readFileSync(resolve(clinicalDir, 'dose-rules.v1.json'));
const sourceBytes = readFileSync(resolve(clinicalDir, 'medication-safety-kernel.sio'));
const codegenBytes = readFileSync(resolve(clinicalDir, 'medication-safety-kernel-codegen.sio'));
const vectorBytes = readFileSync(resolve(clinicalDir, 'test-vectors.v1.json'));
const receipt = JSON.parse(receiptBytes.toString('utf8'));
const bundle = JSON.parse(bundleBytes.toString('utf8'));
const compilerReceipt = JSON.parse(compilerBytes.toString('utf8'));
const keyRegistry = JSON.parse(keyRegistryBytes.toString('utf8'));
const vectors = JSON.parse(vectorBytes.toString('utf8'));

assert.equal(medicamentosConsolidados.length, 717);
assert.equal(new Set(medicamentosConsolidados.map(item => item.id)).size, 717);
assert.equal(bundle.medications.length, 717);
assert.equal(new Set(bundle.medications.map((item: { medicationId: string }) => item.medicationId)).size, 717);
assert.equal(bundle.doseRules.length, 0);
assert.equal(bundle.audit.doseReviewedCount, 0);
assert.equal(bundle.signature, null);

const expectedHashes: Array<[Buffer, string]> = [
  [bundleBytes, receipt.hashes.medicationKnowledgeBundleSha256],
  [wasmBytes, receipt.hashes.wasmSha256],
  [compilerBytes, receipt.hashes.compilerSourceReceiptSha256],
  [keyRegistryBytes, receipt.hashes.trustedSigningKeysSha256],
  [registryBytes, receipt.hashes.sourceRegistrySha256],
  [rulesBytes, receipt.hashes.doseRulesSha256],
  [sourceBytes, receipt.hashes.sounioSourceSha256],
  [codegenBytes, receipt.hashes.sounioCodegenSha256],
  [vectorBytes, receipt.hashes.testVectorsSha256],
];
for (const [bytes, expected] of expectedHashes) {
  assert.equal(hash(bytes), expected);
  const tampered = Buffer.from(bytes);
  tampered[Math.max(0, tampered.length - 1)] ^= 1;
  assert.notEqual(hash(tampered), expected);
}

assert.equal(receipt.schemaVersion, 'darwin.sounio.medication-safety-receipt.v1');
assert.equal(receipt.status, 'reference-only');
assert.equal(receipt.gates.compilerReconciled, true);
assert.equal(receipt.gates.nativeOracleExecuted, true);
assert.equal(receipt.gates.nativeWasmExactParity, true);
assert.equal(receipt.gates.integerOverflowEnvelopeTested, true);
assert.equal(receipt.gates.noWasmImports, true);
assert.equal(receipt.gates.productionReviewedRules, false);
assert.equal(receipt.gates.signatureVerified, false);
assert.equal(receipt.gates.productionAuthorized, false);
assert.deepEqual(receipt.refusalReasons, ['no-double-reviewed-dose-rules', 'bundle-signature-absent']);
assert.equal(compilerReceipt.compilerReconciled, true);
assert.equal(compilerReceipt.hashes.compilerSha256, receipt.compiler.sha256);
assert.equal(keyRegistry.keys.length, 0);

assert.equal(WebAssembly.validate(wasmBytes), true);
const module = new WebAssembly.Module(wasmBytes);
assert.deepEqual(WebAssembly.Module.imports(module), []);
const instance = new WebAssembly.Instance(module);
assert.ok(instance.exports.memory instanceof WebAssembly.Memory);
assert.equal(typeof instance.exports.evaluate, 'function');
const view = new DataView((instance.exports.memory as WebAssembly.Memory).buffer);
const evaluate = instance.exports.evaluate as (inputOffset: number, outputOffset: number) => number;
for (const vector of vectors.vectors) {
  vector.input.forEach((value: number, index: number) => view.setBigInt64(index * 8, BigInt(value), true));
  assert.equal(evaluate(0, 512), 0);
  const output = Array.from({ length: 8 }, (_, index) => Number(view.getBigInt64(512 + index * 8, true)));
  assert.deepEqual(output, vector.expected, vector.id);
}

const treatmentSource = readFileSync(resolve(root, 'app/components/Diagnosis/TreatmentSuggestionPanel.tsx'), 'utf8');
const soapSource = readFileSync(resolve(root, 'app/components/Export/SOAPExport.tsx'), 'utf8');
const interactionSource = readFileSync(resolve(root, 'lib/utils/drug-interactions.ts'), 'utf8');
assert.equal(treatmentSource.includes('calculateWeightReference'), false);
assert.equal(treatmentSource.includes('onAddMedication'), false);
assert.equal(treatmentSource.includes('O Darwin Rx não interpreta, calcula nem libera esta dose.'), true);
assert.equal(soapSource.includes('posologiaCompleta'), false);
assert.equal(soapSource.includes("verificationStatus: 'legacy-unverified'"), false);
assert.equal(interactionSource.includes('INTERACTION_DATABASE'), false);
assert.equal(interactionSource.includes("from '@/lib/data/interacoes-medicamentosas'"), true);

const canonicalInteraction = analyzeMedicationIds(['varfarina', 'aas']);
assert.equal(canonicalInteraction.length, 1);
assert.equal(canonicalInteraction[0].interaction.gravidade, 'grave');
assert.equal(analyzeMedicationIds(['amoxicilina', 'paracetamol']).length, 0);
assert.equal(INTERACTION_KNOWLEDGE_STATUS.absenceMeaning, 'not-found-not-cleared');

const legacyLactationRow = convertMedicamentoRowToMedicamento({
  id: 'synthetic-lactation',
  nome_generico: 'Sintético',
  lactacao: JSON.stringify({ compativel: true, observacao: 'Narrativa limpa' }),
  apresentacoes: [],
  posologia: [],
  interacoes: [],
  indicacoes: [],
  contraindicacoes: [],
  nome_comercial: [],
  disponivel_sus: false,
  classe_terapeutica: 'outros',
} as never);
assert.deepEqual(legacyLactationRow.amamentacao, { compativel: true, observacao: 'Narrativa limpa' });

const readyResult = {
  schemaVersion: 'darwin.sounio.medication-safety-result.v1',
  disposition: 'READY_FOR_CONFIRMATION',
  medicationId: 'synthetic-medication',
  ruleId: 'synthetic-reviewed-rule',
  calculatedDoseMicrogram: 500000,
  unroundedDoseMicrogram: 500000,
  administrationVolumeMicroliter: 10000,
  maximumDoseApplied: false,
  blockers: [],
  warnings: [],
  explanation: ['Synthetic interoperability fixture.'],
  sourceIds: ['synthetic-source'],
  receiptSha256: 'a'.repeat(64),
  integrityVerified: true,
} as const;
const confirmedDraft: StructuredPrescriptionDraftV2 = {
  schemaVersion: 'darwin.structured-prescription-draft.v2',
  medicationId: 'synthetic-medication',
  indicationId: 'synthetic-indication',
  route: 'oral',
  presentationId: 'synthetic-presentation',
  medicamento: 'Medicamento sintético',
  posologia: '500 mg por tomada',
  duracao: '1 dia',
  verificationStatus: 'professionally-confirmed',
  safetyResult: readyResult,
  professionalConfirmation: {
    confirmedAt: '2026-07-31T00:00:00.000Z',
    statementVersion: 'darwin.medication-professional-confirmation.v1',
  },
};
const fhir = toFhirMedicationRequestDraft(confirmedDraft, 'Patient/synthetic');
assert.equal(fhir.resourceType, 'MedicationRequest');
assert.equal(fhir.status, 'draft');
assert.equal(fhir.intent, 'proposal');
assert.throws(() => toFhirMedicationRequestDraft({ ...confirmedDraft, verificationStatus: 'ready-for-confirmation', professionalConfirmation: undefined }));
assert.throws(() => toFhirMedicationRequestDraft({ ...confirmedDraft, safetyResult: { ...readyResult, disposition: 'REFUSE' } }));

console.log('MEDICATION_SAFETY_FIXTURES_VALID');
console.log(JSON.stringify({
  schemaVersion: 'darwin.sounio.medication-safety-fixture-test.v1',
  catalog: { uniqueMedicationIds: 717, doseReviewed: 0 },
  vectorsPassed: vectors.vectors.length,
  hashTamperCasesPassed: expectedHashes.length,
  nativeWasmExactParityReceipt: true,
  runtimeRegexDoseCalculationPresent: false,
  simulatedProntuarioInteractionDatabasePresent: false,
  interactionAbsenceClearsSafety: false,
  fhirStatus: fhir.status,
  fhirIntent: fhir.intent,
  productionDisposition: 'REFUSE',
}, null, 2));
