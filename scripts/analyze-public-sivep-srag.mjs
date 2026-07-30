import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { fileURLToPath } from 'node:url';
import Papa from 'papaparse';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(root, 'clinical/epistemic-firewall/public-data/public-dataset-registry.v1.json');
const outputPath = join(root, '.clinical-kernel-build/public-data/sivep-srag-feasibility.json');
const scriptBytes = readFileSync(fileURLToPath(import.meta.url));
const registryBytes = readFileSync(registryPath);
const registry = JSON.parse(registryBytes.toString('utf8'));
const source = registry.datasets.find(dataset => dataset.sourceId === 'br-sivep-gripe-srag-2025');
if (!source) throw new Error('sivep-source-not-registered');
const sourceProbe = source.probes.find(probe => probe.probeId === 'frozen-csv-header');
if (!sourceProbe) throw new Error('sivep-source-probe-not-registered');

const args = process.argv.slice(2);
const allRows = args.includes('--all');
const maxRowsIndex = args.indexOf('--max-rows');
const maxRows = allRows
  ? Number.POSITIVE_INFINITY
  : maxRowsIndex >= 0 ? Number(args[maxRowsIndex + 1]) : 100000;
if (!allRows && (!Number.isInteger(maxRows) || maxRows <= 0)) throw new Error('sivep-max-rows-invalid');

const sha256 = value => createHash('sha256').update(value).digest('hex');
const emptyTriState = () => ({ present: 0, absent: 0, unknown: 0 });
const updateTriState = (counter, rawValue, presentCodes, absentCodes) => {
  const value = String(rawValue ?? '').trim();
  if (presentCodes.includes(value)) counter.present += 1;
  else if (absentCodes.includes(value)) counter.absent += 1;
  else counter.unknown += 1;
};

const classifyAge = row => {
  const value = Number(row.NU_IDADE_N);
  const unit = String(row.TP_IDADE ?? '').trim();
  if (!Number.isInteger(value) || value < 0) return null;
  if (unit === '1' && value <= 54787) {
    if (value > 6574) return { pediatric: false };
    return { pediatric: true, under2: value < 730, band: value < 730 ? 'under-2' : value < 1826 ? '2-4' : value < 4383 ? '5-11' : '12-17' };
  }
  if (unit === '2' && value <= 1800) {
    if (value >= 216) return { pediatric: false };
    return { pediatric: true, under2: value < 24, band: value < 24 ? 'under-2' : value < 60 ? '2-4' : value < 144 ? '5-11' : '12-17' };
  }
  if (unit === '3' && value <= 150) {
    if (value >= 18) return { pediatric: false };
    return { pediatric: true, under2: value < 2, band: value < 2 ? 'under-2' : value < 5 ? '2-4' : value < 12 ? '5-11' : '12-17' };
  }
  return null;
};

const aggregate = {
  sourceRowsRead: 0,
  pediatricRecords: 0,
  nonPediatricRecords: 0,
  ageUnknownOrInvalid: 0,
  ageBands: { 'under-2': 0, '2-4': 0, '5-11': 0, '12-17': 0 },
  featureObservations: {
    feverReportedProxy: emptyTriState(),
    cough: emptyTriState(),
    soreThroat: emptyTriState(),
    dyspnea: emptyTriState(),
    spo2Below95Proxy: emptyTriState(),
    ageUnder2: emptyTriState(),
  },
  severityOutcomes: {
    icu: emptyTriState(),
    ventilatorySupport: emptyTriState(),
    recovered: 0,
    sragDeath: 0,
    otherCauseDeath: 0,
    outcomeUnknown: 0,
  },
  finalClassification: {
    influenza: 0,
    otherRespiratoryVirus: 0,
    otherEtiology: 0,
    unspecifiedSrag: 0,
    covid19: 0,
    unknown: 0,
  },
};

const response = await fetch(sourceProbe.url, {
  headers: { 'user-agent': 'Darwin-MFC-public-SIVEP-analysis/1.0' },
  redirect: 'follow',
  signal: AbortSignal.timeout(15 * 60 * 1000),
});
if (!response.ok || !response.body) throw new Error(`sivep-source-unreachable:${response.status}`);

const input = Readable.fromWeb(response.body);
const sourceHash = createHash('sha256');
let sourceBytesRead = 0;
const hashingStream = new Transform({
  transform(chunk, _encoding, callback) {
    sourceHash.update(chunk);
    sourceBytesRead += chunk.length;
    callback(null, chunk);
  },
});
const parser = Papa.parse(Papa.NODE_STREAM_INPUT, {
  header: true,
  delimiter: ';',
  skipEmptyLines: true,
  transformHeader: value => value.replace(/^\uFEFF/, '').replace(/^"|"$/g, ''),
});
input.pipe(hashingStream).pipe(parser);

let firstRowColumns = null;
let stoppedAtLimit = false;
for await (const row of parser) {
  if (!firstRowColumns) {
    firstRowColumns = Object.keys(row);
    const missingColumns = sourceProbe.requiredColumns.filter(column => !firstRowColumns.includes(column));
    if (missingColumns.length > 0) throw new Error(`sivep-required-columns-missing:${missingColumns.join(',')}`);
  }
  aggregate.sourceRowsRead += 1;
  const age = classifyAge(row);
  if (!age) {
    aggregate.ageUnknownOrInvalid += 1;
  } else if (!age.pediatric) {
    aggregate.nonPediatricRecords += 1;
  } else {
    aggregate.pediatricRecords += 1;
    aggregate.ageBands[age.band] += 1;
    updateTriState(aggregate.featureObservations.feverReportedProxy, row.FEBRE, ['1'], ['2']);
    updateTriState(aggregate.featureObservations.cough, row.TOSSE, ['1'], ['2']);
    updateTriState(aggregate.featureObservations.soreThroat, row.GARGANTA, ['1'], ['2']);
    updateTriState(aggregate.featureObservations.dyspnea, row.DISPNEIA, ['1'], ['2']);
    updateTriState(aggregate.featureObservations.spo2Below95Proxy, row.SATURACAO, ['1'], ['2']);
    updateTriState(aggregate.featureObservations.ageUnder2, age.under2 ? '1' : '0', ['1'], ['0']);
    updateTriState(aggregate.severityOutcomes.icu, row.UTI, ['1'], ['2']);
    updateTriState(aggregate.severityOutcomes.ventilatorySupport, row.SUPORT_VEN, ['1', '2'], ['3']);

    const outcome = String(row.EVOLUCAO ?? '').trim();
    if (outcome === '1') aggregate.severityOutcomes.recovered += 1;
    else if (outcome === '2') aggregate.severityOutcomes.sragDeath += 1;
    else if (outcome === '3') aggregate.severityOutcomes.otherCauseDeath += 1;
    else aggregate.severityOutcomes.outcomeUnknown += 1;

    const classification = String(row.CLASSI_FIN ?? '').trim();
    if (classification === '1') aggregate.finalClassification.influenza += 1;
    else if (classification === '2') aggregate.finalClassification.otherRespiratoryVirus += 1;
    else if (classification === '3') aggregate.finalClassification.otherEtiology += 1;
    else if (classification === '4') aggregate.finalClassification.unspecifiedSrag += 1;
    else if (classification === '5') aggregate.finalClassification.covid19 += 1;
    else aggregate.finalClassification.unknown += 1;
  }

  if (aggregate.sourceRowsRead >= maxRows) {
    stoppedAtLimit = true;
    input.destroy();
    hashingStream.destroy();
    parser.destroy();
    break;
  }
}

const triStateTotal = counter => counter.present + counter.absent + counter.unknown;
const invariantChecks = {
  agePartitionComplete: aggregate.pediatricRecords + aggregate.nonPediatricRecords + aggregate.ageUnknownOrInvalid === aggregate.sourceRowsRead,
  ageBandsComplete: Object.values(aggregate.ageBands).reduce((sum, count) => sum + count, 0) === aggregate.pediatricRecords,
  featurePartitionsComplete: Object.values(aggregate.featureObservations).every(counter => triStateTotal(counter) === aggregate.pediatricRecords),
  severityPartitionsComplete: triStateTotal(aggregate.severityOutcomes.icu) === aggregate.pediatricRecords
    && triStateTotal(aggregate.severityOutcomes.ventilatorySupport) === aggregate.pediatricRecords,
  outcomePartitionComplete: aggregate.severityOutcomes.recovered
    + aggregate.severityOutcomes.sragDeath
    + aggregate.severityOutcomes.otherCauseDeath
    + aggregate.severityOutcomes.outcomeUnknown === aggregate.pediatricRecords,
  classificationPartitionComplete: Object.values(aggregate.finalClassification).reduce((sum, count) => sum + count, 0) === aggregate.pediatricRecords,
  completeByteCountMatchesHeader: stoppedAtLimit
    || response.headers.get('content-length') === null
    || sourceBytesRead === Number(response.headers.get('content-length')),
};
if (!Object.values(invariantChecks).every(Boolean)) {
  throw new Error(`sivep-aggregate-invariant-failed:${JSON.stringify(invariantChecks)}`);
}

const streamedSha256 = sourceHash.digest('hex');

const report = {
  schemaVersion: 'darwin.sounio.public-sivep-feasibility-receipt.v1',
  status: stoppedAtLimit ? 'prefix-feasibility-only' : 'complete-public-snapshot-aggregate',
  generatedAt: new Date().toISOString(),
  sourceId: source.sourceId,
  sourceSnapshot: source.access.snapshot,
  sourceUrl: sourceProbe.url,
  sourceEtag: response.headers.get('etag'),
  sourceLastModified: response.headers.get('last-modified'),
  sourceContentLength: response.headers.get('content-length') === null
    ? null
    : Number(response.headers.get('content-length')),
  sourceBytesRead,
  sourceSha256: stoppedAtLimit ? null : streamedSha256,
  sourcePrefixSha256: stoppedAtLimit ? streamedSha256 : null,
  registrySha256: sha256(registryBytes),
  analysisScriptSha256: sha256(scriptBytes),
  sourceRowsRead: aggregate.sourceRowsRead,
  stoppedAtLimit,
  maximumRows: Number.isFinite(maxRows) ? maxRows : null,
  prefixOrderMayBeBiased: stoppedAtLimit,
  patientRowsPersisted: false,
  sourceAnonymizedByPublisher: true,
  recordIdentifiersPersisted: false,
  credentialsUsed: false,
  probabilitiesEstimated: false,
  apsCalibrationAuthorized: false,
  clinicalActivationAuthorized: false,
  firewallDisposition: 'REFUSE',
  notes: [
    'FEBRE is reported fever and SATURACAO is SpO2 below 95 percent; both remain proxies outside the canonical APS vector.',
    'This aggregate describes hospitalized SRAG surveillance and must not estimate APS priors or treatment effects.',
    ...(stoppedAtLimit
      ? ['A prefix-limited run is an engineering feasibility receipt, not a representative analysis.']
      : ['The full frozen snapshot is aggregated, but its hospital-surveillance population remains outside the APS target domain.']),
  ],
  invariantChecks,
  aggregate,
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
console.log('PUBLIC_SIVEP_FEASIBILITY_COMPLETE');
