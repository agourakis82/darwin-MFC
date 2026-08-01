import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  buildEvidenceGraph,
  calculateChangeImpact,
  createMedicationEnvelopeTelemetryEvent,
  reconcileAdversarialEvidenceRuns,
  toFhirEnvelopeMedicationRequestDraft,
  type AdversarialEvidenceRunV1,
  type MedicationAssuranceReceiptV1,
  type MedicationEnvelopeArtifactBundleV1,
  type MedicationEnvelopeBenchmarkV1,
  type MedicationEvidenceGraphV1,
} from '../lib/medication-envelope';

const root = process.cwd();
const publicDir = resolve(root, 'public/medication-envelope');
const graph = JSON.parse(readFileSync(resolve(publicDir, 'medication-evidence-graph.json'), 'utf8')) as MedicationEvidenceGraphV1;
const artifacts = JSON.parse(readFileSync(resolve(publicDir, 'medication-envelope-artifacts.json'), 'utf8')) as MedicationEnvelopeArtifactBundleV1;
const benchmark = JSON.parse(readFileSync(resolve(publicDir, 'medication-envelope-benchmark.json'), 'utf8')) as MedicationEnvelopeBenchmarkV1;
const receipt = JSON.parse(readFileSync(resolve(publicDir, 'medication-assurance.receipt.json'), 'utf8')) as MedicationAssuranceReceiptV1;
const migration = readFileSync(resolve(root, 'supabase/migrations/018_medication_evidence_envelopes.sql'), 'utf8');
const loaderSource = readFileSync(resolve(root, 'lib/medication-envelope/loader.ts'), 'utf8');
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function expectRejects(operation: () => Promise<unknown>, expected: string): Promise<void> {
  try {
    await operation();
  } catch (error) {
    assert(error instanceof Error && error.message.includes(expected), `unexpected-error:${String(error)}`);
    return;
  }
  throw new Error(`expected-rejection:${expected}`);
}

async function main(): Promise<void> {
assert(graph.schemaVersion === 'darwin.medication-evidence-graph.v1', 'graph-schema');
assert(graph.audit.cycleFree && graph.audit.contentAddressed, 'graph-integrity-gates');
assert(graph.audit.staleNodeCount === 0, 'build-graph-must-be-current');
assert(graph.roots.length === 17, 'one-merkle-root-node-per-artifact');
assert(artifacts.artifacts.length === 17, 'exact-seventeen-artifacts');
assert(new Set(artifacts.artifacts.map(artifact => artifact.artifactId)).size === 17, 'unique-artifact-ids');
assert(artifacts.artifacts.every(artifact => artifact.reviewStatus === 'EVIDENCE_REQUIRED'), 'unreviewed-artifact-promoted');
assert(artifacts.pilotAuthorized === false && artifacts.productionAuthorized === false, 'artifact-authorization-must-be-false');
assert(artifacts.signature === null, 'unsigned-artifact-bundle-required');
assert(benchmark.syntheticOnly === true && benchmark.cases.length === 340, 'exact-synthetic-benchmark');
assert(benchmark.cases.every(testCase => testCase.synthetic && testCase.clinicalExpectedDisposition === 'REFUSE'), 'synthetic-case-clinical-refusal');
assert(new Set(benchmark.cases.map(testCase => testCase.id)).size === 340, 'duplicate-benchmark-id');
for (const artifact of artifacts.artifacts) {
  assert(benchmark.cases.filter(testCase => testCase.artifactId === artifact.artifactId).length === 20, `artifact-case-count:${artifact.artifactId}`);
}
for (const scenario of ['WITHIN_FIXTURE', 'SINGLE_VIOLATION', 'COMBINED_VIOLATION', 'MISSING_CONTEXT'] as const) {
  assert(benchmark.cases.filter(testCase => testCase.scenario === scenario).length === 85, `scenario-balance:${scenario}`);
}
assert(receipt.gates.nativeOracleExecuted, 'native-oracle-required');
assert(receipt.gates.wasmInstantiated, 'wasm-instantiation-required');
assert(receipt.gates.nativeWasmExactParity, 'native-wasm-exact-parity-required');
assert(receipt.gates.compilerReconciled, 'source-fresh-compiler-required');
assert(receipt.gates.exactArtifactCount && receipt.gates.exactBenchmarkCount, 'receipt-count-gates');
assert(receipt.gates.pilotAuthorized === false, 'pilot-must-remain-refused');
assert(receipt.gates.productionAuthorized === false, 'production-must-remain-refused');
assert(receipt.signature === null, 'assurance-receipt-signature-must-be-absent');
assert(receipt.refusalReasons.includes('independent-human-consensus-absent'), 'human-consensus-refusal-required');
assert(loaderSource.includes("disposition: 'REFUSE'"), 'loader-refusal-boundary-required');
assert(!loaderSource.includes('expectedEngineeringOutput'), 'engineering-oracle-must-not-enter-loader');
assert(!loaderSource.includes('calculatedDose'), 'typescript-dose-math-forbidden');

await buildEvidenceGraph(graph.nodes, graph.edges, graph.generatedAt, sha256);
const tampered = structuredClone(graph.nodes);
tampered[0].payload = { ...tampered[0].payload, tampered: true };
await expectRejects(
  () => buildEvidenceGraph(tampered, graph.edges, graph.generatedAt, sha256),
  'evidence-payload-hash-mismatch',
);
await expectRejects(
  () => buildEvidenceGraph(graph.nodes, [...graph.edges, { from: graph.nodes[0].id, to: graph.nodes[0].id, kind: 'derives' }], graph.generatedAt, sha256),
  'evidence-graph-cycle',
);

const firstSource = graph.nodes.find(node => node.kind === 'source');
assert(firstSource, 'source-node-required');
const impact = await calculateChangeImpact(graph, [firstSource.id], sha256);
assert(impact.disposition === 'REFUSE', 'stale-impact-must-refuse');
assert(impact.staleDescendantIds.length > 0, 'stale-descendants-required');
assert(impact.affectedArtifactIds.length === 1, 'source-change-must-reach-one-artifact');

const sourceSha256 = sha256('isolated-source-fixture');
const baseRun: AdversarialEvidenceRunV1 = {
  schemaVersion: 'darwin.adversarial-evidence-run.v1',
  mode: 'extractor',
  provider: 'fixture-provider-a',
  model: 'fixture-model-a',
  sourceNodeId: firstSource.id,
  promptSha256: sha256('extractor-prompt'),
  sourceSha256,
  responseSha256: sha256('extractor-response'),
  toolAccess: false,
  networkAccess: false,
  output: {
    claims: [{ statement: 'Synthetic claim only.', locator: 'fixture:1', confidenceBasis: 'fixture' }],
    challenges: [],
  },
  promotionStatus: 'CANDIDATE_ONLY',
};
const falsifier: AdversarialEvidenceRunV1 = {
  ...baseRun,
  mode: 'falsifier',
  provider: 'fixture-provider-b',
  model: 'fixture-model-b',
  promptSha256: sha256('falsifier-prompt'),
  responseSha256: sha256('falsifier-response'),
  output: {
    claims: [],
    challenges: [{ claimIndex: 0, failureMode: 'Population boundary absent.', locator: 'fixture:1' }],
  },
};
const reconciliation = await reconcileAdversarialEvidenceRuns(baseRun, falsifier, sha256);
assert(reconciliation.humanConsensusRequired && !reconciliation.executable, 'ai-cannot-create-executable-evidence');
await expectRejects(
  () => reconcileAdversarialEvidenceRuns(baseRun, { ...falsifier, provider: baseRun.provider }, sha256),
  'evidence-ai-independent-providers-required',
);
await expectRejects(
  () => reconcileAdversarialEvidenceRuns({ ...baseRun, toolAccess: true }, falsifier, sha256),
  'evidence-ai-isolation-required',
);

const serializedBenchmark = JSON.stringify(benchmark).toLocaleLowerCase();
for (const forbidden of ['patientname', 'cpf', 'cns', 'birthdate', 'address', 'free_text']) {
  assert(!serializedBenchmark.includes(forbidden), `phi-shaped-field-in-benchmark:${forbidden}`);
}

const telemetry = createMedicationEnvelopeTelemetryEvent({
  artifactId: artifacts.artifacts[0].artifactId,
  disposition: 'REFUSE',
  constraintCodes: ['PROOF.MISSING', 'PROOF.MISSING'],
  elapsedMilliseconds: 12.6,
  decisionCategory: 'abandoned',
  occurredAt: '2026-08-01T00:00:00.000Z',
});
assert(telemetry.constraintCodes.length === 1 && telemetry.elapsedMilliseconds === 13, 'redacted-telemetry-normalization');
assert(telemetry.patientContextPersisted === false && telemetry.proposedValuesPersisted === false, 'telemetry-must-not-persist-values');
assert(migration.includes('patient_context_persisted BOOLEAN NOT NULL DEFAULT FALSE CHECK (patient_context_persisted = FALSE)'), 'database-phi-persistence-guard');
assert(migration.includes('medication-envelope-records-are-append-only'), 'append-only-database-guard');
assert(migration.includes('active-synthetic-pilot-credential-required'), 'credential-rpc-guard');

const refusedResult = {
  schemaVersion: 'darwin.sounio.medication-envelope-result.v1' as const,
  disposition: 'REFUSE' as const,
  artifactId: artifacts.artifacts[0].artifactId,
  evaluatedConstraints: [],
  unknownVariables: [],
  counterexample: null,
  graphMerkleRootSha256: graph.merkleRootSha256,
  receiptSha256: receipt.hashes.wasmSha256,
  credentialId: null,
  integrityVerified: true,
  clinicalSafetyClaim: null,
};
assert(refusedResult.disposition === 'REFUSE', 'refused-result-fixture');
try {
  toFhirEnvelopeMedicationRequestDraft({
    action: {
      schemaVersion: 'darwin.proposed-medication-action.v1',
      medicationConceptId: artifacts.artifacts[0].medicationConceptIds[0] ?? 'unresolved',
      indicationId: null,
      route: null,
      presentationId: null,
      quantities: {},
      concomitantConceptIds: [],
      observationsPresent: [],
    },
    result: refusedResult,
    professionalConfirmation: {
      confirmedAt: '2026-08-01T00:00:00.000Z',
      confirmerId: 'fixture-reviewer',
      statementVersion: 'darwin.medication-envelope-professional-confirmation.v1',
    },
  });
  throw new Error('fhir-export-should-have-refused');
} catch (error) {
  assert(error instanceof Error && error.message === 'envelope-fhir-export-requires-within-reviewed-envelope', 'fhir-refusal-boundary');
}

console.log('MEDICATION_ENVELOPE_VALID');
console.log(JSON.stringify({
  graphNodes: graph.nodes.length,
  graphEdges: graph.edges.length,
  artifacts: artifacts.artifacts.length,
  benchmarkCases: benchmark.cases.length,
  nativeWasmExactParity: receipt.gates.nativeWasmExactParity,
  staleImpactArtifacts: impact.affectedArtifactIds.length,
  pilotAuthorized: receipt.gates.pilotAuthorized,
  productionAuthorized: receipt.gates.productionAuthorized,
}, null, 2));
}

void main();
