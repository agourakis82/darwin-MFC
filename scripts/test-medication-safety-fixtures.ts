import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { medicamentosConsolidados } from '../lib/data/medicamentos/index';
import { analyzeMedicationIds, INTERACTION_KNOWLEDGE_STATUS } from '../lib/utils/drug-interactions';
import { toFhirMedicationRequestDraft } from '../lib/medication-safety/fhir';
import type { StructuredPrescriptionDraftV2 } from '../lib/medication-safety/types';
import { convertMedicamentoRowToMedicamento } from '../lib/supabase/transforms/medicamentos';
import {
  getUnknownMedicationCandidateIds,
  mergeMedicamentoCatalogs,
} from '../lib/supabase/merge-medicamentos';

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
const identityBundleBytes = readFileSync(resolve(publicDir, 'medication-identity-bundle.json'));
const identityReceiptBytes = readFileSync(resolve(publicDir, 'medication-identity.receipt.json'));
const searchIndexBytes = readFileSync(resolve(publicDir, 'medication-search-index.json'));
const sourceManifestBytes = readFileSync(resolve(clinicalDir, 'source-manifest.v2.json'));
const reconciliationOverridesBytes = readFileSync(resolve(clinicalDir, 'reconciliation-overrides.v1.json'));
const identityParserBytes = readFileSync(resolve(root, 'scripts/build-medication-identity-bundle.ts'));
const receipt = JSON.parse(receiptBytes.toString('utf8'));
const bundle = JSON.parse(bundleBytes.toString('utf8'));
const compilerReceipt = JSON.parse(compilerBytes.toString('utf8'));
const keyRegistry = JSON.parse(keyRegistryBytes.toString('utf8'));
const vectors = JSON.parse(vectorBytes.toString('utf8'));
const identityBundle = JSON.parse(identityBundleBytes.toString('utf8'));
const identityReceipt = JSON.parse(identityReceiptBytes.toString('utf8'));
const searchIndex = JSON.parse(searchIndexBytes.toString('utf8'));

assert.equal(medicamentosConsolidados.length, 717);
assert.equal(new Set(medicamentosConsolidados.map(item => item.id)).size, 717);
assert.equal(bundle.medications.length, 717);
assert.equal(new Set(bundle.medications.map((item: { medicationId: string }) => item.medicationId)).size, 717);
assert.equal(bundle.doseRules.length, 0);
assert.equal(bundle.audit.doseReviewedCount, 0);
assert.equal(bundle.signature, null);
assert.equal(bundle.schemaVersion, 'darwin.medication-knowledge-bundle.v2');
assert.equal(identityBundle.schemaVersion, 'darwin.medication-identity-bundle.v1');
assert.equal(identityReceipt.schemaVersion, 'darwin.medication-identity-receipt.v1');
assert.equal(identityBundle.aliases.length, 717);
assert.equal(new Set(identityBundle.aliases.map((item: { id: string }) => item.id)).size, 717);
assert.equal(identityBundle.products.length, 1415);
assert.equal(identityBundle.audit.duplicateAtcGroupCount, 78);
assert.equal(identityBundle.audit.duplicateAtcLegacyRecordCount, 171);
assert.equal(identityBundle.audit.legacyInteractionCount, 176);
assert.equal(identityBundle.interactions.length, 152);
assert.equal(identityBundle.interactions.filter((item: { legacyRuleIds: string[] }) => item.legacyRuleIds.length > 1).length, 23);
assert.equal(identityBundle.interactions.filter((item: { severityConflict: boolean }) => item.severityConflict).length, 7);
assert.equal(identityBundle.interactions.every((item: { promotionStatus: string }) => item.promotionStatus === 'not-promoted'), true);
assert.equal(identityBundle.audit.clinicalRulesPromoted, 0);
assert.equal(identityReceipt.signature, null);
assert.equal(identityReceipt.gates.productionAuthorized, false);
assert.equal(searchIndex.entries.length, identityBundle.concepts.length);
assert.equal(hash(identityBundleBytes), identityReceipt.hashes.identityBundleSha256);
assert.equal(hash(searchIndexBytes), identityReceipt.hashes.compactSearchIndexSha256);
assert.equal(hash(sourceManifestBytes), identityReceipt.hashes.sourceManifestSha256);
assert.equal(hash(reconciliationOverridesBytes), identityReceipt.hashes.reconciliationOverridesSha256);
assert.equal(hash(identityParserBytes), identityReceipt.hashes.parserSourceSha256);
assert.equal(identityBundle.aliases.every((alias: { id: string; conceptId: string }) => (
  alias.id !== alias.conceptId
    && identityBundle.concepts.some((concept: { id: string }) => concept.id === alias.conceptId)
)), true);
assert.equal(identityBundle.products.every((product: { status: string; route: string | null }) => (
  product.route !== null || product.status === 'review-required'
)), true);
assert.equal(identityBundle.products.every((product: { strength: { numeratorUnit: string; denominatorUnit: string | null } | null }) => (
  product.strength === null
    || ['microgram', 'milligram', 'gram', 'unit'].includes(product.strength.numeratorUnit)
      && (product.strength.denominatorUnit === null || ['milliliter', 'dose', 'gram'].includes(product.strength.denominatorUnit))
)), true);

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
  [identityBundleBytes, receipt.hashes.medicationIdentityBundleSha256],
  [identityReceiptBytes, receipt.hashes.medicationIdentityReceiptSha256],
  [sourceManifestBytes, receipt.hashes.medicationSourceManifestSha256],
  [reconciliationOverridesBytes, receipt.hashes.medicationReconciliationOverridesSha256],
];
for (const [bytes, expected] of expectedHashes) {
  assert.equal(hash(bytes), expected);
  const tampered = Buffer.from(bytes);
  tampered[Math.max(0, tampered.length - 1)] ^= 1;
  assert.notEqual(hash(tampered), expected);
}

assert.equal(receipt.schemaVersion, 'darwin.sounio.medication-safety-receipt.v2');
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
assert.equal(interactionSource.includes('getMedicationIdentityBundle'), true);
assert.equal(interactionSource.includes('promotionStatus'), true);

const conceptForAlias = (id: string) => identityBundle.aliases.find((alias: { id: string }) => alias.id === id)?.conceptId;
assert.equal(conceptForAlias('amoxicilina'), conceptForAlias('amoxicilina-suspensao'));
assert.notEqual(conceptForAlias('amoxicilina'), conceptForAlias('amoxicilina-clavulanato'));
assert.equal(new Set(['colecalciferol', 'vitamina-d', 'vitamina-d3', 'vitamina-d-gotas'].map(conceptForAlias)).size, 1);
assert.equal(new Set(['nistatina', 'nistatina-oral', 'nistatina-topica'].map(conceptForAlias)).size, 1);
const nystatinProducts = identityBundle.products.filter((product: { conceptId: string }) => product.conceptId === conceptForAlias('nistatina'));
assert.equal(nystatinProducts.some((product: { route: string }) => product.route === 'oral'), true);
assert.equal(nystatinProducts.some((product: { route: string }) => product.route === 'topical'), true);
assert.notEqual(conceptForAlias('sofosbuvir-velpatasvir'), conceptForAlias('glecaprevir-pibrentasvir'));
assert.equal(identityBundle.duplicateAtcGroups.find((group: { atcCode: string }) => group.atcCode === 'J05AP57')?.classification, 'conflict');

const localOverlayFixture = medicamentosConsolidados[0];
const maliciousRemote = {
  ...localOverlayFixture,
  nomeGenerico: 'REMOTE CLINICAL OVERRIDE',
  rename: !localOverlayFixture.rename,
  apresentacoes: [],
  interacoes: [],
  contraindicacoes: [],
  nomesComerciais: ['Alias editorial Supabase'],
  tags: ['overlay-editorial'],
};
const overlaid = mergeMedicamentoCatalogs([localOverlayFixture], [maliciousRemote])[0];
assert.equal(overlaid.nomeGenerico, localOverlayFixture.nomeGenerico);
assert.equal(overlaid.rename, localOverlayFixture.rename);
assert.deepEqual(overlaid.apresentacoes, localOverlayFixture.apresentacoes);
assert.deepEqual(overlaid.interacoes, localOverlayFixture.interacoes);
assert.deepEqual(overlaid.contraindicacoes, localOverlayFixture.contraindicacoes);
assert.equal(overlaid.nomesComerciais?.includes('Alias editorial Supabase'), true);
assert.equal(overlaid.tags?.includes('overlay-editorial'), true);
assert.deepEqual(getUnknownMedicationCandidateIds([localOverlayFixture], [{ ...maliciousRemote, id: 'remote-unknown' }]), ['remote-unknown']);
assert.equal(mergeMedicamentoCatalogs([localOverlayFixture], [{ ...maliciousRemote, id: 'remote-unknown' }]).length, 1);

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
