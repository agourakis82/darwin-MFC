import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  canonicalJsonV12,
  fixtureTrustPolicyV12,
  observationPathsV12,
  sha256V12,
  signObservationPayloadForFixtureV12,
  signRegistryPayloadForFixtureV12,
  verifyObservationReceiptV12,
} from './observation-receipt-v12.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(
  repoRoot,
  'docs/research/no-hidden-gauge-fixing/formal/evidence/' +
    'observation-receipt-verification.v1.2.json',
);
const writeEvidence = process.argv.includes('--write-evidence');
const fromRoot = (path) => relative(repoRoot, path).replaceAll('\\', '/');
const descriptor = (path) => ({
  path: fromRoot(path),
  bytes: statSync(path).size,
  sha256: sha256V12(readFileSync(path)),
});

const sourceBytes = readFileSync(observationPathsV12.source);
const receipt = JSON.parse(readFileSync(observationPathsV12.receipt));
const registry = JSON.parse(readFileSync(observationPathsV12.registry));
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const clone = (value) => structuredClone(value);
const context = {
  contextHash: sha256V12('urn:darwin:synthetic-context:identity-triangle'),
  minimumReliabilityBps: 9000,
  purpose: 'research:no-hidden-gauge-fixing:v1.2',
  scopeHash: sha256V12('research:no-hidden-gauge-fixing:v1.2'),
  subjectHash: sha256V12('urn:darwin:synthetic-subject:nhgf-v1.2'),
};
const evaluatedAt = '2026-08-03T12:00:00.000Z';

const baseline = verifyObservationReceiptV12({
  context,
  evaluatedAt,
  receipt,
  registry,
  sourceBytes,
});
check(baseline.valid, `baseline receipt refused: ${baseline.reasons.join(',')}`);
check(JSON.stringify(baseline.abi) === JSON.stringify([7, 1, 0, 2, 2, 2]),
  'baseline ABI drift');

const negativeCases = [];
const runNegative = (id, candidateReceipt, candidateRegistry = registry,
  candidateContext = context, candidateSourceBytes = sourceBytes) => {
  const result = verifyObservationReceiptV12({
    context: candidateContext,
    evaluatedAt,
    receipt: candidateReceipt,
    registry: candidateRegistry,
    sourceBytes: candidateSourceBytes,
  });
  check(!result.valid && result.disposition === 'REFUSE' && result.abi === null,
    `${id} was not refused`);
  negativeCases.push({id, refused: !result.valid, reasons: result.reasons});
};

const valueTamper = clone(receipt);
valueTamper.payload.observation.values[0].value = true;
runNegative('unsigned-value-tamper', valueTamper);

const provenanceTamper = clone(receipt);
provenanceTamper.payload.provenance.exactLocator = 'observations/1';
runNegative('unsigned-provenance-tamper', provenanceTamper);

const signatureTamper = clone(receipt);
signatureTamper.signature.valueBase64 = `${signatureTamper.signature.valueBase64.slice(0, -2)}AA`;
runNegative('signature-tamper', signatureTamper);

const lowReliabilityPayload = clone(receipt.payload);
lowReliabilityPayload.reliability.basisPoints = 8999;
runNegative('signed-low-reliability',
  signObservationPayloadForFixtureV12(lowReliabilityPayload));

const expiredPayload = clone(receipt.payload);
expiredPayload.validity.expiresAt = '2026-08-03T12:00:00.000Z';
runNegative('signed-expired-observation',
  signObservationPayloadForFixtureV12(expiredPayload));

const wrongScopePayload = clone(receipt.payload);
wrongScopePayload.scope.purpose = 'research:other-purpose';
runNegative('signed-scope-mismatch',
  signObservationPayloadForFixtureV12(wrongScopePayload));

const lowTrustContext = {...context, subjectHash: sha256V12('wrong-subject')};
runNegative('subject-context-mismatch', receipt, registry, lowTrustContext);

const revokedRegistryPayload = clone(registry.payload);
revokedRegistryPayload.epoch = 2;
revokedRegistryPayload.revokedObservationIds = [receipt.payload.observationId];
const revokedRegistry = signRegistryPayloadForFixtureV12(revokedRegistryPayload);
const revokedPayload = clone(receipt.payload);
revokedPayload.revocation.epoch = 2;
revokedPayload.revocation.registrySha256 = sha256V12(
  Buffer.from(`${JSON.stringify(revokedRegistry, null, 2)}\n`),
);
runNegative('signed-revocation',
  signObservationPayloadForFixtureV12(revokedPayload), revokedRegistry);

runNegative('source-content-tamper', receipt, registry, context,
  Buffer.concat([sourceBytes, Buffer.from(' ')]));

let floatRejected = false;
try {
  canonicalJsonV12({value: 0.5});
} catch {
  floatRejected = true;
}
check(floatRejected, 'canonical JSON accepted a floating-point value');
check(fixtureTrustPolicyV12.observer.productionTrustEligible === false,
  'fixture observer became production eligible');
check(fixtureTrustPolicyV12.registry.productionTrustEligible === false,
  'fixture registry became production eligible');

const result = {
  schema: 'darwin.value-carrying-observation-verification.v1.2',
  evaluatedAt,
  status: 'SYNTHETIC_RESEARCH_ONLY',
  clinicalDisposition: 'REFUSE',
  clinicalUseAllowed: false,
  productionAuthorized: false,
  noveltyEstablished: false,
  signed: false,
  fixtureSignatureValid: baseline.valid,
  baselineAbi: baseline.abi,
  artifacts: {
    source: descriptor(observationPathsV12.source),
    receipt: descriptor(observationPathsV12.receipt),
    registry: descriptor(observationPathsV12.registry),
  },
  negativeCases,
  negativeCasesPassed: negativeCases.filter((entry) => entry.refused).length,
  canonicalJsonRejectsFloatingPoint: floatRejected,
  testOnlyTrustRoots: true,
  externalClinicalObservationEstablished: false,
  verified: errors.length === 0,
  errors,
};

if (writeEvidence && errors.length === 0) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
