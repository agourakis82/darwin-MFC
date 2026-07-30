import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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
const selfTest = args.includes('--self-test');
const allRows = args.includes('--all');
const maxRowsIndex = args.indexOf('--max-rows');
const maxRows = allRows
  ? Number.POSITIVE_INFINITY
  : maxRowsIndex >= 0 ? Number(args[maxRowsIndex + 1]) : 100000;
if (!allRows && (!Number.isInteger(maxRows) || maxRows <= 0)) throw new Error('sivep-max-rows-invalid');

const EXPECTED_FULL_ROWS = 336260;
const EXPECTED_FULL_BYTES = 381900544;
const EXPECTED_FULL_SHA256 = 'b5def80ae35092c5f64b4766d6d2e5785bdd63978a9aae51cc90521a91a6aaaa';
const MINIMUM_DISCLOSURE_CELL = 30;
const AGE_BANDS = Object.freeze(['under-2', '2-4', '5-11', '12-17']);
const CLASSIFICATIONS = Object.freeze([
  'influenza',
  'otherRespiratoryVirus',
  'otherEtiology',
  'unspecifiedSrag',
  'covid19',
  'unknown',
]);
const OUTCOMES = Object.freeze(['recovered', 'sragDeath', 'otherCauseDeath', 'outcomeUnknown']);
const sha256 = value => createHash('sha256').update(value).digest('hex');
const emptyTriState = () => ({ present: 0, absent: 0, unknown: 0 });
const updateTriState = (counter, rawValue, presentCodes, absentCodes) => {
  const value = String(rawValue ?? '').trim();
  if (presentCodes.includes(value)) counter.present += 1;
  else if (absentCodes.includes(value)) counter.absent += 1;
  else counter.unknown += 1;
};

const classifyFinal = rawValue => ({
  1: 'influenza',
  2: 'otherRespiratoryVirus',
  3: 'otherEtiology',
  4: 'unspecifiedSrag',
  5: 'covid19',
}[String(rawValue ?? '').trim()] ?? 'unknown');

const classifyOutcome = rawValue => ({
  1: 'recovered',
  2: 'sragDeath',
  3: 'otherCauseDeath',
}[String(rawValue ?? '').trim()] ?? 'outcomeUnknown');

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

const emptyOutcomeCounts = () => Object.fromEntries(OUTCOMES.map(outcome => [outcome, 0]));
const createStratifiedTable = () => Object.fromEntries(AGE_BANDS.map(ageBand => [
  ageBand,
  Object.fromEntries(CLASSIFICATIONS.map(classification => [
    classification,
    { records: 0, outcomes: emptyOutcomeCounts() },
  ])),
]));
const createAgeSeverity = () => Object.fromEntries(AGE_BANDS.map(ageBand => [
  ageBand,
  { records: 0, icu: emptyTriState(), ventilatorySupport: emptyTriState() },
]));

const countSmallNonzeroCells = counts => Object.values(counts)
  .filter(count => count > 0 && count < MINIMUM_DISCLOSURE_CELL).length;
const rowKey = (ageBand, classification) => `${ageBand}\u0000${classification}`;

function buildComplementarySuppression(table) {
  const primary = new Set();
  const complementary = new Set();
  for (const ageBand of AGE_BANDS) {
    for (const classification of CLASSIFICATIONS) {
      const row = table[ageBand][classification];
      if (row.records < MINIMUM_DISCLOSURE_CELL || countSmallNonzeroCells(row.outcomes) > 0) {
        primary.add(rowKey(ageBand, classification));
      }
    }
  }

  const suppressed = () => new Set([...primary, ...complementary]);
  const addLowestUnsuppressed = candidates => {
    const hidden = suppressed();
    const available = candidates
      .filter(candidate => !hidden.has(candidate.key))
      .sort((left, right) => (
        left.records - right.records
        || (left.key < right.key ? -1 : Number(left.key > right.key))
      ));
    if (available.length > 0) complementary.add(available[0].key);
  };

  let changed = true;
  while (changed) {
    const before = complementary.size;
    for (const ageBand of AGE_BANDS) {
      const hidden = suppressed();
      const keys = CLASSIFICATIONS.map(classification => rowKey(ageBand, classification));
      if (keys.filter(key => hidden.has(key)).length === 1) {
        addLowestUnsuppressed(CLASSIFICATIONS.map(classification => ({
          key: rowKey(ageBand, classification),
          records: table[ageBand][classification].records,
        })));
      }
    }
    for (const classification of CLASSIFICATIONS) {
      const hidden = suppressed();
      const keys = AGE_BANDS.map(ageBand => rowKey(ageBand, classification));
      if (keys.filter(key => hidden.has(key)).length === 1) {
        addLowestUnsuppressed(AGE_BANDS.map(ageBand => ({
          key: rowKey(ageBand, classification),
          records: table[ageBand][classification].records,
        })));
      }
    }
    changed = complementary.size !== before;
  }
  return { primary, complementary, suppressed: suppressed() };
}

function serializeStratifiedTable(table) {
  const suppression = buildComplementarySuppression(table);
  const rows = [];
  for (const ageBand of AGE_BANDS) {
    for (const classification of CLASSIFICATIONS) {
      const key = rowKey(ageBand, classification);
      const sourceRow = table[ageBand][classification];
      if (suppression.suppressed.has(key)) {
        rows.push({
          ageBand,
          finalClassification: classification,
          disclosureStatus: suppression.primary.has(key) ? 'primary-suppressed' : 'complementary-suppressed',
          records: null,
          outcomes: Object.fromEntries(OUTCOMES.map(outcome => [outcome, null])),
        });
        continue;
      }
      rows.push({
        ageBand,
        finalClassification: classification,
        disclosureStatus: 'published',
        records: sourceRow.records,
        outcomes: Object.fromEntries(OUTCOMES.map(outcome => [outcome, {
          records: sourceRow.outcomes[outcome],
          shareWithinAgeClassification: sourceRow.records > 0
            ? Number((sourceRow.outcomes[outcome] / sourceRow.records).toFixed(6))
            : null,
        }])),
      });
    }
  }
  return {
    rows,
    primarySuppressedRows: suppression.primary.size,
    complementarySuppressedRows: suppression.complementary.size,
    publishedRows: rows.filter(row => row.disclosureStatus === 'published').length,
  };
}

function serializeAgeSeverity(ageSeverity) {
  const metricNames = ['icu', 'ventilatorySupport'];
  const primaryByMetric = Object.fromEntries(metricNames.map(metric => [metric, new Set()]));
  const complementaryByMetric = Object.fromEntries(metricNames.map(metric => [metric, new Set()]));
  for (const metric of metricNames) {
    for (const ageBand of AGE_BANDS) {
      const source = ageSeverity[ageBand][metric];
      if (ageSeverity[ageBand].records < MINIMUM_DISCLOSURE_CELL || countSmallNonzeroCells(source) > 0) {
        primaryByMetric[metric].add(ageBand);
      }
    }
    if (primaryByMetric[metric].size === 1) {
      const candidate = AGE_BANDS
        .filter(ageBand => !primaryByMetric[metric].has(ageBand))
        .sort((left, right) => ageSeverity[left].records - ageSeverity[right].records)[0];
      if (candidate) complementaryByMetric[metric].add(candidate);
    }
  }

  const rows = AGE_BANDS.map(ageBand => ({
    ageBand,
    records: ageSeverity[ageBand].records,
    ...Object.fromEntries(metricNames.map(metric => {
      const source = ageSeverity[ageBand][metric];
      const primary = primaryByMetric[metric].has(ageBand);
      const complementary = complementaryByMetric[metric].has(ageBand);
      if (primary || complementary) {
        return [metric, {
          disclosureStatus: primary ? 'primary-suppressed' : 'complementary-suppressed',
          present: null,
          absent: null,
          unknown: null,
          shareAmongKnown: null,
        }];
      }
      const known = source.present + source.absent;
      return [metric, {
        disclosureStatus: 'published',
        ...source,
        shareAmongKnown: known > 0 ? Number((source.present / known).toFixed(6)) : null,
      }];
    })),
  }));
  return {
    rows,
    primarySuppressedMetrics: metricNames.reduce((sum, metric) => sum + primaryByMetric[metric].size, 0),
    complementarySuppressedMetrics: metricNames.reduce(
      (sum, metric) => sum + complementaryByMetric[metric].size,
      0,
    ),
  };
}

function runSelfTest() {
  const table = createStratifiedTable();
  for (const ageBand of AGE_BANDS) {
    for (const classification of CLASSIFICATIONS) {
      table[ageBand][classification] = {
        records: 160,
        outcomes: { recovered: 40, sragDeath: 40, otherCauseDeath: 40, outcomeUnknown: 40 },
      };
    }
  }
  table['under-2'].influenza = {
    records: 125,
    outcomes: { recovered: 80, sragDeath: 5, otherCauseDeath: 40, outcomeUnknown: 0 },
  };
  const serialized = serializeStratifiedTable(table);
  const ageSeverity = createAgeSeverity();
  for (const ageBand of AGE_BANDS) {
    ageSeverity[ageBand] = {
      records: 160,
      icu: { present: 40, absent: 80, unknown: 40 },
      ventilatorySupport: { present: 40, absent: 80, unknown: 40 },
    };
  }
  ageSeverity['under-2'].icu = { present: 5, absent: 115, unknown: 40 };
  const serializedSeverity = serializeAgeSeverity(ageSeverity);
  const hidden = serialized.rows.filter(row => row.disclosureStatus !== 'published');
  const hiddenIcu = serializedSeverity.rows.filter(row => row.icu.disclosureStatus !== 'published');
  const hiddenByAge = AGE_BANDS.map(ageBand => hidden.filter(row => row.ageBand === ageBand).length);
  const hiddenByClassification = CLASSIFICATIONS.map(classification => (
    hidden.filter(row => row.finalClassification === classification).length
  ));
  const checks = {
    ageDayBoundary: classifyAge({ NU_IDADE_N: 729, TP_IDADE: '1' })?.band === 'under-2'
      && classifyAge({ NU_IDADE_N: 730, TP_IDADE: '1' })?.band === '2-4',
    ageMonthBoundary: classifyAge({ NU_IDADE_N: 23, TP_IDADE: '2' })?.under2 === true
      && classifyAge({ NU_IDADE_N: 24, TP_IDADE: '2' })?.under2 === false,
    ageYearBoundary: classifyAge({ NU_IDADE_N: 17, TP_IDADE: '3' })?.pediatric === true
      && classifyAge({ NU_IDADE_N: 18, TP_IDADE: '3' })?.pediatric === false,
    finalClassificationCodes: classifyFinal('1') === 'influenza' && classifyFinal('5') === 'covid19',
    outcomeCodes: classifyOutcome('1') === 'recovered' && classifyOutcome('2') === 'sragDeath',
    primarySmallCellSuppressed: serialized.rows.some(row => (
      row.ageBand === 'under-2'
      && row.finalClassification === 'influenza'
      && row.disclosureStatus === 'primary-suppressed'
      && row.records === null
      && Object.values(row.outcomes).every(value => value === null)
    )),
    complementarySuppressionAdded: serialized.complementarySuppressedRows > 0,
    noSingleSuppressedAgeMargin: hiddenByAge.every(count => count !== 1),
    noSingleSuppressedClassificationMargin: hiddenByClassification.every(count => count !== 1),
    publishedCellsMeetThreshold: serialized.rows
      .filter(row => row.disclosureStatus === 'published')
      .every(row => Object.values(row.outcomes).every(cell => (
        cell.records === 0 || cell.records >= MINIMUM_DISCLOSURE_CELL
      ))),
    severityPrimaryAndComplementarySuppression: hiddenIcu.length === 2
      && hiddenIcu.some(row => row.icu.disclosureStatus === 'primary-suppressed')
      && hiddenIcu.some(row => row.icu.disclosureStatus === 'complementary-suppressed')
      && hiddenIcu.every(row => (
        row.icu.present === null && row.icu.absent === null && row.icu.unknown === null
      )),
    severityPublishedCellsMeetThreshold: serializedSeverity.rows.every(row => (
      ['icu', 'ventilatorySupport'].every(metric => (
        row[metric].disclosureStatus !== 'published'
        || ['present', 'absent', 'unknown'].every(key => (
          row[metric][key] === 0 || row[metric][key] >= MINIMUM_DISCLOSURE_CELL
        ))
      ))
    )),
    clinicalActivationBlocked: true,
  };
  if (!Object.values(checks).every(Boolean)) {
    throw new Error(`sivep-stratification-self-test-failed:${JSON.stringify(checks)}`);
  }
  console.log(JSON.stringify({
    schemaVersion: 'darwin.sounio.public-sivep-stratification-self-test.v1',
    status: 'stratification-and-disclosure-policy-valid',
    minimumDisclosureCell: MINIMUM_DISCLOSURE_CELL,
    checks,
    apsCalibrationAuthorized: false,
    clinicalActivationAuthorized: false,
  }, null, 2));
  console.log('PUBLIC_SIVEP_STRATIFICATION_SELF_TEST_VALID');
}

if (selfTest) {
  runSelfTest();
  process.exit(0);
}

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
const stratifiedTable = createStratifiedTable();
const ageSeverity = createAgeSeverity();

rmSync(outputPath, { force: true });
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

    const outcome = classifyOutcome(row.EVOLUCAO);
    const classification = classifyFinal(row.CLASSI_FIN);
    aggregate.severityOutcomes[outcome] += 1;
    aggregate.finalClassification[classification] += 1;

    const stratum = stratifiedTable[age.band][classification];
    stratum.records += 1;
    stratum.outcomes[outcome] += 1;
    ageSeverity[age.band].records += 1;
    updateTriState(ageSeverity[age.band].icu, row.UTI, ['1'], ['2']);
    updateTriState(ageSeverity[age.band].ventilatorySupport, row.SUPORT_VEN, ['1', '2'], ['3']);
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
const streamedSha256 = sourceHash.digest('hex');
const stratified = serializeStratifiedTable(stratifiedTable);
const ageSeverityDisclosure = serializeAgeSeverity(ageSeverity);
const stratifiedRows = AGE_BANDS.flatMap(ageBand => CLASSIFICATIONS.map(classification => ({
  ageBand,
  classification,
  ...stratifiedTable[ageBand][classification],
})));
const stratifiedOutcomeTotals = Object.fromEntries(OUTCOMES.map(outcome => [
  outcome,
  stratifiedRows.reduce((sum, row) => sum + row.outcomes[outcome], 0),
]));
const stratifiedClassificationTotals = Object.fromEntries(CLASSIFICATIONS.map(classification => [
  classification,
  stratifiedRows
    .filter(row => row.classification === classification)
    .reduce((sum, row) => sum + row.records, 0),
]));
const stratifiedAgeTotals = Object.fromEntries(AGE_BANDS.map(ageBand => [
  ageBand,
  stratifiedRows
    .filter(row => row.ageBand === ageBand)
    .reduce((sum, row) => sum + row.records, 0),
]));
const suppressedRows = stratified.rows.filter(row => row.disclosureStatus !== 'published');
const suppressedByAge = AGE_BANDS.map(ageBand => (
  suppressedRows.filter(row => row.ageBand === ageBand).length
));
const suppressedByClassification = CLASSIFICATIONS.map(classification => (
  suppressedRows.filter(row => row.finalClassification === classification).length
));
const ageSeverityMetrics = ageSeverityDisclosure.rows.flatMap(row => [row.icu, row.ventilatorySupport]);
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
  stratifiedRowsComplete: stratifiedRows.reduce((sum, row) => sum + row.records, 0) === aggregate.pediatricRecords,
  stratifiedAgeMarginsMatch: AGE_BANDS.every(ageBand => (
    stratifiedAgeTotals[ageBand] === aggregate.ageBands[ageBand]
  )),
  stratifiedClassificationMarginsMatch: CLASSIFICATIONS.every(classification => (
    stratifiedClassificationTotals[classification] === aggregate.finalClassification[classification]
  )),
  stratifiedOutcomeMarginsMatch: OUTCOMES.every(outcome => (
    stratifiedOutcomeTotals[outcome] === aggregate.severityOutcomes[outcome]
  )),
  ageSeverityPartitionsComplete: AGE_BANDS.every(ageBand => (
    ageSeverity[ageBand].records === aggregate.ageBands[ageBand]
      && triStateTotal(ageSeverity[ageBand].icu) === ageSeverity[ageBand].records
      && triStateTotal(ageSeverity[ageBand].ventilatorySupport) === ageSeverity[ageBand].records
  )),
  publishedCellsMeetDisclosureThreshold: stratified.rows
    .filter(row => row.disclosureStatus === 'published')
    .every(row => row.records >= MINIMUM_DISCLOSURE_CELL && Object.values(row.outcomes).every(cell => (
      cell.records === 0 || cell.records >= MINIMUM_DISCLOSURE_CELL
    ))),
  suppressedRowsContainNoCounts: suppressedRows.every(row => (
    row.records === null && Object.values(row.outcomes).every(value => value === null)
  )),
  complementaryAgeMarginsProtected: suppressedByAge.every(count => count !== 1),
  complementaryClassificationMarginsProtected: suppressedByClassification.every(count => count !== 1),
  ageSeverityDisclosureSafe: ageSeverityMetrics.every(metric => (
    metric.disclosureStatus === 'published'
      ? ['present', 'absent', 'unknown'].every(key => metric[key] === 0 || metric[key] >= MINIMUM_DISCLOSURE_CELL)
      : metric.present === null && metric.absent === null && metric.unknown === null
  )),
  frozenSnapshotRowsMatch: stoppedAtLimit || aggregate.sourceRowsRead === EXPECTED_FULL_ROWS,
  frozenSnapshotBytesMatch: stoppedAtLimit || sourceBytesRead === EXPECTED_FULL_BYTES,
  frozenSnapshotSha256Matches: stoppedAtLimit || streamedSha256 === EXPECTED_FULL_SHA256,
  completeByteCountMatchesHeader: stoppedAtLimit
    || response.headers.get('content-length') === null
    || sourceBytesRead === Number(response.headers.get('content-length')),
};
if (!Object.values(invariantChecks).every(Boolean)) {
  throw new Error(`sivep-aggregate-invariant-failed:${JSON.stringify(invariantChecks)}`);
}

const report = {
  schemaVersion: 'darwin.sounio.public-sivep-feasibility-receipt.v2',
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
  treatmentEffectsEstimated: false,
  apsCalibrationAuthorized: false,
  prescriptionRecommendationAuthorized: false,
  clinicalActivationAuthorized: false,
  firewallDisposition: 'REFUSE',
  disclosurePolicy: {
    minimumCellRecords: MINIMUM_DISCLOSURE_CELL,
    primarySuppression: 'Suppress the complete age-classification row when its total or any nonzero outcome cell is below 30.',
    complementarySuppression: 'Iteratively suppress an additional row whenever an age or classification margin would contain exactly one suppressed row.',
    zeroCellsMayBePublished: true,
    simpleAgeAndClassificationMarginReconstructionProtected: true,
    formalDisclosureRiskCertification: false,
  },
  notes: [
    'FEBRE is reported fever and SATURACAO is SpO2 below 95 percent; both remain proxies outside the canonical APS vector.',
    'This aggregate describes hospitalized SRAG surveillance and must not estimate APS priors or treatment effects.',
    'Classification and outcome strata are descriptive surveillance closures, not adjudicated APS diagnostic labels.',
    ...(stoppedAtLimit
      ? ['A prefix-limited run is an engineering feasibility receipt, not a representative analysis.']
      : ['The full frozen snapshot is aggregated, but its hospital-surveillance population remains outside the APS target domain.']),
  ],
  invariantChecks,
  aggregate,
  stratifiedAggregate: {
    ageClassificationOutcome: stratified,
    severityByAge: ageSeverityDisclosure,
  },
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
console.log('PUBLIC_SIVEP_FEASIBILITY_COMPLETE');
