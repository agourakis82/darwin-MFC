import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(root, 'clinical/epistemic-firewall/public-data/public-dataset-registry.v1.json');
const outputPath = join(root, '.clinical-kernel-build/public-data/source-probe-receipt.json');
const registryBytes = readFileSync(registryPath);
const registry = JSON.parse(registryBytes.toString('utf8'));
const strict = process.argv.includes('--strict');

const sha256 = value => createHash('sha256').update(value).digest('hex');
const userAgent = 'Darwin-MFC-public-data-probe/1.0';

async function readHeaderOnly(response, maximumBytes = 65536) {
  if (!response.body) throw new Error('probe-response-body-missing');
  const reader = response.body.getReader();
  let buffer = Buffer.alloc(0);
  try {
    while (buffer.length < maximumBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer = Buffer.concat([buffer, Buffer.from(value)]);
      const newline = buffer.indexOf(0x0a);
      if (newline >= 0) return buffer.subarray(0, newline).toString('utf8').replace(/\r$/, '');
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  throw new Error('probe-csv-header-not-found-within-limit');
}

async function runProbe(sourceId, probe) {
  const startedAt = new Date().toISOString();
  try {
    const init = {
      method: probe.method === 'HEAD' ? 'HEAD' : 'GET',
      redirect: 'follow',
      headers: { 'user-agent': userAgent },
      signal: AbortSignal.timeout(30000),
    };
    if (probe.method === 'RANGE_HEADER') init.headers.range = 'bytes=0-65535';
    const response = await fetch(probe.url, init);
    const success = response.ok;
    let headerSha256 = null;
    let columnsVerified = null;
    let observedColumnCount = null;
    if (success && probe.method === 'RANGE_HEADER') {
      const header = await readHeaderOnly(response);
      const columns = header.split(probe.delimiter).map(value => value.replace(/^"|"$/g, ''));
      columnsVerified = probe.requiredColumns.every(column => columns.includes(column));
      observedColumnCount = columns.length;
      headerSha256 = sha256(Buffer.from(header, 'utf8'));
    }
    return {
      sourceId,
      probeId: probe.probeId,
      essential: probe.essential,
      method: probe.method,
      url: probe.url,
      startedAt,
      status: success && columnsVerified !== false ? 'reachable' : 'failed',
      httpStatus: response.status,
      finalUrl: response.url,
      etag: response.headers.get('etag'),
      lastModified: response.headers.get('last-modified'),
      contentLength: response.headers.get('content-length'),
      contentType: response.headers.get('content-type'),
      headerSha256,
      observedColumnCount,
      columnsVerified,
      patientRowsPersisted: false,
      credentialsUsed: false,
    };
  } catch (error) {
    return {
      sourceId,
      probeId: probe.probeId,
      essential: probe.essential,
      method: probe.method,
      url: probe.url,
      startedAt,
      status: 'failed',
      error: error instanceof Error ? error.message : String(error),
      patientRowsPersisted: false,
      credentialsUsed: false,
    };
  }
}

const probes = registry.datasets.flatMap(dataset => (
  dataset.probes.map(probe => runProbe(dataset.sourceId, probe))
));
const results = await Promise.all(probes);
const requiredFailures = results.filter(result => result.essential && result.status !== 'reachable');
const report = {
  schemaVersion: 'darwin.sounio.public-data-source-probe-receipt.v1',
  generatedAt: new Date().toISOString(),
  registrySha256: sha256(registryBytes),
  status: requiredFailures.length === 0 ? 'required-sources-reachable' : 'required-source-failure',
  strict,
  totalProbes: results.length,
  reachableProbes: results.filter(result => result.status === 'reachable').length,
  requiredFailures: requiredFailures.map(result => `${result.sourceId}:${result.probeId}`),
  patientRowsPersisted: false,
  credentialsUsed: false,
  apsCalibrationAuthorized: false,
  results,
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
console.log('PUBLIC_CLINICAL_DATASET_PROBE_COMPLETE');
if (strict && requiredFailures.length > 0) process.exitCode = 1;
