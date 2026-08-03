import {
  createHash,
  createPrivateKey,
  createPublicKey,
  sign,
  verify,
} from 'node:crypto';
import {mkdirSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const formalDir = resolve(repoRoot, 'docs/research/no-hidden-gauge-fixing/formal');

export const observationPathsV12 = {
  source: resolve(formalDir, 'observations/synthetic-observation-source.v1.2.json'),
  registry: resolve(formalDir, 'observations/revocation-registry.v1.2.json'),
  receipt: resolve(formalDir, 'observations/value-carrying-observation.receipt.v1.2.json'),
};

export const sha256V12 = (value) =>
  createHash('sha256').update(value).digest('hex');

const rejectUnsafeNumber = (value) => {
  if (!Number.isSafeInteger(value)) {
    throw new TypeError('canonical JSON permits safe integers only');
  }
  return String(value);
};

export const canonicalJsonV12 = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') {
    return JSON.stringify(value);
  }
  if (typeof value === 'number') return rejectUnsafeNumber(value);
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalJsonV12(entry)).join(',')}]`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value).sort(([left], [right]) =>
      left.localeCompare(right, 'en'));
    if (entries.some(([, entry]) => entry === undefined)) {
      throw new TypeError('canonical JSON rejects undefined values');
    }
    return `{${entries.map(([key, entry]) =>
      `${JSON.stringify(key)}:${canonicalJsonV12(entry)}`).join(',')}}`;
  }
  throw new TypeError(`canonical JSON rejects ${typeof value}`);
};

const fixtureSeed = (label) => Buffer.from(sha256V12(
  `DARWIN-NHGF-V1.2-PUBLIC-TEST-SEED:${label}`,
), 'hex');

const privateKeyFromSeed = (seed) => createPrivateKey({
  key: Buffer.concat([
    Buffer.from('302e020100300506032b657004220420', 'hex'),
    seed,
  ]),
  format: 'der',
  type: 'pkcs8',
});

const publicDescriptor = (privateKey, keyId, role) => {
  const publicDer = createPublicKey(privateKey).export({format: 'der', type: 'spki'});
  return {
    algorithm: 'Ed25519',
    fixtureOnly: true,
    keyId,
    productionTrustEligible: false,
    publicKeyDerBase64: publicDer.toString('base64'),
    publicKeySha256: sha256V12(publicDer),
    role,
  };
};

const observerPrivateKey = privateKeyFromSeed(fixtureSeed('observer'));
const registryPrivateKey = privateKeyFromSeed(fixtureSeed('revocation-registry'));

export const fixtureTrustPolicyV12 = {
  observer: publicDescriptor(
    observerPrivateKey,
    'darwin-test-observer-ed25519-v1',
    'synthetic_observer',
  ),
  registry: publicDescriptor(
    registryPrivateKey,
    'darwin-test-revocation-ed25519-v1',
    'revocation_authority',
  ),
};

const signedDocument = (payload, privateKey, publicKey) => {
  const canonicalPayload = Buffer.from(canonicalJsonV12(payload));
  return {
    payload,
    signature: {
      ...publicKey,
      signedPayloadSha256: sha256V12(canonicalPayload),
      valueBase64: sign(null, canonicalPayload, privateKey).toString('base64'),
    },
  };
};

export const signObservationPayloadForFixtureV12 = (payload) =>
  signedDocument(payload, observerPrivateKey, fixtureTrustPolicyV12.observer);

export const signRegistryPayloadForFixtureV12 = (payload) =>
  signedDocument(payload, registryPrivateKey, fixtureTrustPolicyV12.registry);

const prettyBytes = (value) => Buffer.from(`${JSON.stringify(value, null, 2)}\n`);

const syntheticSource = {
  schema: 'darwin.synthetic-observation-source.v1.2',
  fixtureOnly: true,
  sourceId: 'urn:darwin:nhgf:v1.2:source:identity-triangle-a-false',
  title: 'Synthetic Boolean triangle observation',
  observations: [
    {
      locator: 'observations/0',
      value: false,
      vertex: 'A',
    },
  ],
  warning: 'This source has no patient, clinical, or production semantics.',
};

const registryPayload = {
  schema: 'darwin.observation-revocation-registry.v1.2',
  epoch: 1,
  fixtureOnly: true,
  issuedAt: '2026-08-03T12:00:00.000Z',
  registryId: 'urn:darwin:nhgf:v1.2:revocation-registry:test',
  revokedObservationIds: [],
  validThrough: '2030-01-01T00:00:00.000Z',
};

export const buildObservationArtifactsV12 = () => {
  const sourceBytes = prettyBytes(syntheticSource);
  const registry = signRegistryPayloadForFixtureV12(registryPayload);
  const registryBytes = prettyBytes(registry);
  const kernelSource = readFileSync(resolve(
    formalDir,
    'sounio/no_hidden_gauge_fixing_v1_2.sio',
  ));
  const observationId = 'urn:darwin:nhgf:v1.2:observation:identity-a-false';
  const subjectHash = sha256V12('urn:darwin:synthetic-subject:nhgf-v1.2');
  const contextHash = sha256V12('urn:darwin:synthetic-context:identity-triangle');
  const scopeHash = sha256V12('research:no-hidden-gauge-fixing:v1.2');
  const payload = {
    schema: 'darwin.value-carrying-observation-receipt.v1.2',
    fixtureOnly: true,
    observationId,
    status: 'SYNTHETIC_RESEARCH_ONLY',
    clinicalDisposition: 'REFUSE',
    clinicalUseAllowed: false,
    productionAuthorized: false,
    observation: {
      anchorMask: 1,
      anchorValueMask: 0,
      values: [{value: false, vertex: 'A'}],
    },
    provenance: {
      exactLocator: 'observations/0',
      method: 'deterministic-synthetic-fixture',
      sourceBytes: sourceBytes.length,
      sourceSha256: sha256V12(sourceBytes),
      sourceUri: syntheticSource.sourceId,
    },
    reliability: {
      assessment: 'fixture-integrity-only-not-empirical-reliability',
      basisPoints: 10000,
      calibrationReceipt: null,
    },
    validity: {
      expiresAt: '2030-01-01T00:00:00.000Z',
      observedAt: '2026-08-03T11:55:00.000Z',
      validFrom: '2026-08-03T11:55:00.000Z',
    },
    scope: {
      contextHash,
      purpose: 'research:no-hidden-gauge-fixing:v1.2',
      scopeHash,
      subjectHash,
    },
    revocation: {
      epoch: registryPayload.epoch,
      registryId: registryPayload.registryId,
      registrySha256: sha256V12(registryBytes),
    },
    executableBinding: {
      abi: [7, 1, 0, 2, 2, 2],
      abiSchema: 'darwin.no-hidden-gauge-fixing-abi.v1.2',
      declaredModel: 'boolean-identity-triangle',
      kernelSourceSha256: sha256V12(kernelSource),
    },
    signerCredential: {
      credentialId: 'urn:darwin:credential:synthetic-observer:test-only',
      credentialType: 'synthetic_observer',
      expiresAt: '2030-01-01T00:00:00.000Z',
      issuedAt: '2026-08-03T00:00:00.000Z',
    },
  };
  const receipt = signObservationPayloadForFixtureV12(payload);
  return {receipt, registry, source: syntheticSource};
};

const verifySignedDocument = (document, expectedKey) => {
  const reasons = [];
  if (!document || typeof document !== 'object') return {valid: false, reasons: ['missing-document']};
  let canonicalPayload;
  try {
    canonicalPayload = Buffer.from(canonicalJsonV12(document.payload));
  } catch (error) {
    return {valid: false, reasons: [`noncanonical-payload:${error.message}`]};
  }
  const signature = document.signature ?? {};
  if (signature.algorithm !== 'Ed25519') reasons.push('algorithm-mismatch');
  if (signature.keyId !== expectedKey.keyId) reasons.push('key-id-mismatch');
  if (signature.publicKeySha256 !== expectedKey.publicKeySha256) {
    reasons.push('public-key-hash-mismatch');
  }
  if (signature.signedPayloadSha256 !== sha256V12(canonicalPayload)) {
    reasons.push('payload-digest-mismatch');
  }
  try {
    const publicDer = Buffer.from(signature.publicKeyDerBase64 ?? '', 'base64');
    if (sha256V12(publicDer) !== expectedKey.publicKeySha256) {
      reasons.push('embedded-public-key-mismatch');
    } else if (!verify(
      null,
      canonicalPayload,
      createPublicKey({key: publicDer, format: 'der', type: 'spki'}),
      Buffer.from(signature.valueBase64 ?? '', 'base64'),
    )) {
      reasons.push('signature-invalid');
    }
  } catch (error) {
    reasons.push(`signature-unreadable:${error.message}`);
  }
  return {valid: reasons.length === 0, reasons};
};

const vertexBits = {A: 1, B: 2, C: 4};

export const verifyObservationReceiptV12 = ({
  context,
  evaluatedAt,
  receipt,
  registry,
  sourceBytes,
}) => {
  const reasons = [];
  const signedReceipt = verifySignedDocument(receipt, fixtureTrustPolicyV12.observer);
  const signedRegistry = verifySignedDocument(registry, fixtureTrustPolicyV12.registry);
  reasons.push(...signedReceipt.reasons.map((reason) => `receipt:${reason}`));
  reasons.push(...signedRegistry.reasons.map((reason) => `registry:${reason}`));
  const payload = receipt?.payload ?? {};
  const registryPayloadCandidate = registry?.payload ?? {};
  if (payload.schema !== 'darwin.value-carrying-observation-receipt.v1.2') {
    reasons.push('receipt-schema-mismatch');
  }
  if (registryPayloadCandidate.schema !==
      'darwin.observation-revocation-registry.v1.2') {
    reasons.push('registry-schema-mismatch');
  }
  if (payload.clinicalDisposition !== 'REFUSE' ||
      payload.clinicalUseAllowed !== false ||
      payload.productionAuthorized !== false) {
    reasons.push('clinical-boundary-mismatch');
  }
  if (payload.fixtureOnly !== true || registryPayloadCandidate.fixtureOnly !== true) {
    reasons.push('fixture-boundary-mismatch');
  }
  if (payload.provenance?.sourceSha256 !== sha256V12(sourceBytes)) {
    reasons.push('source-digest-mismatch');
  }
  if (payload.provenance?.sourceBytes !== sourceBytes.length) {
    reasons.push('source-length-mismatch');
  }
  const registryBytes = prettyBytes(registry);
  if (payload.revocation?.registrySha256 !== sha256V12(registryBytes)) {
    reasons.push('registry-digest-mismatch');
  }
  if (payload.revocation?.registryId !== registryPayloadCandidate.registryId ||
      payload.revocation?.epoch !== registryPayloadCandidate.epoch) {
    reasons.push('registry-identity-mismatch');
  }
  if ((registryPayloadCandidate.revokedObservationIds ?? [])
    .includes(payload.observationId)) {
    reasons.push('observation-revoked');
  }
  const now = Date.parse(evaluatedAt);
  const validFrom = Date.parse(payload.validity?.validFrom);
  const expiresAt = Date.parse(payload.validity?.expiresAt);
  const credentialExpiresAt = Date.parse(payload.signerCredential?.expiresAt);
  const registryValidThrough = Date.parse(registryPayloadCandidate.validThrough);
  if (![now, validFrom, expiresAt, credentialExpiresAt, registryValidThrough]
    .every(Number.isFinite)) reasons.push('invalid-time');
  if (Number.isFinite(now) && Number.isFinite(validFrom) && now < validFrom) {
    reasons.push('observation-not-yet-valid');
  }
  if (Number.isFinite(now) && Number.isFinite(expiresAt) && now >= expiresAt) {
    reasons.push('observation-expired');
  }
  if (Number.isFinite(now) && Number.isFinite(credentialExpiresAt) &&
      now >= credentialExpiresAt) reasons.push('credential-expired');
  if (Number.isFinite(now) && Number.isFinite(registryValidThrough) &&
      now >= registryValidThrough) reasons.push('registry-expired');
  if (!Number.isSafeInteger(payload.reliability?.basisPoints) ||
      payload.reliability.basisPoints < context.minimumReliabilityBps ||
      payload.reliability.basisPoints > 10000) {
    reasons.push('reliability-policy-failed');
  }
  if (payload.scope?.purpose !== context.purpose ||
      payload.scope?.scopeHash !== context.scopeHash) reasons.push('scope-mismatch');
  if (payload.scope?.subjectHash !== context.subjectHash) reasons.push('subject-mismatch');
  if (payload.scope?.contextHash !== context.contextHash) reasons.push('context-mismatch');

  let derivedAnchorMask = 0;
  let derivedAnchorValueMask = 0;
  const seen = new Set();
  for (const observation of payload.observation?.values ?? []) {
    const bit = vertexBits[observation.vertex];
    if (!bit || seen.has(observation.vertex) || typeof observation.value !== 'boolean') {
      reasons.push('invalid-observation-value');
      continue;
    }
    seen.add(observation.vertex);
    derivedAnchorMask |= bit;
    if (observation.value) derivedAnchorValueMask |= bit;
  }
  if (derivedAnchorMask !== payload.observation?.anchorMask ||
      derivedAnchorValueMask !== payload.observation?.anchorValueMask) {
    reasons.push('observation-mask-mismatch');
  }
  const abi = payload.executableBinding?.abi;
  if (!Array.isArray(abi) || abi.length !== 6 ||
      abi[1] !== derivedAnchorMask || abi[2] !== derivedAnchorValueMask) {
    reasons.push('abi-observation-mismatch');
  }
  return {
    abi: reasons.length === 0 ? abi : null,
    disposition: reasons.length === 0 ? 'OBSERVATION_ACCEPTED_FOR_RESEARCH' : 'REFUSE',
    valid: reasons.length === 0,
    reasons,
  };
};

export const writeObservationArtifactsV12 = () => {
  const artifacts = buildObservationArtifactsV12();
  for (const [name, path] of Object.entries(observationPathsV12)) {
    mkdirSync(dirname(path), {recursive: true});
    writeFileSync(path, prettyBytes(artifacts[name]));
  }
  return Object.fromEntries(Object.entries(observationPathsV12).map(([name, path]) => [
    name,
    {
      bytes: statSync(path).size,
      path: relative(repoRoot, path).replaceAll('\\', '/'),
      sha256: sha256V12(readFileSync(path)),
    },
  ]));
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const descriptors = writeObservationArtifactsV12();
  process.stdout.write(`${JSON.stringify({
    schema: 'darwin.observation-artifact-generation.v1.2',
    fixtureOnly: true,
    descriptors,
  }, null, 2)}\n`);
}
