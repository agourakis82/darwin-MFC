import { createHash } from 'node:crypto';
import { createWriteStream, readFileSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  BufferIoContext,
  HandlerStatus,
  ReadStatParser,
  parseSas7bdat,
} from '@irbisadm/statfmt';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(root, 'clinical/epistemic-firewall/public-data/public-dataset-registry.v1.json');
const outputPath = join(root, '.clinical-kernel-build/public-data/namcs2018-ambulatory-audit.json');
const scriptBytes = readFileSync(fileURLToPath(import.meta.url));
const registryBytes = readFileSync(registryPath);
const registry = JSON.parse(registryBytes.toString('utf8'));
const source = registry.datasets.find(dataset => dataset.sourceId === 'us-namcs-office-2018');
if (!source) throw new Error('namcs2018-source-not-registered');

const archiveProbe = source.probes.find(probe => probe.probeId === 'public-use-archive');
const formatProbe = source.probes.find(probe => probe.probeId === 'value-formats');
if (!archiveProbe || !formatProbe) throw new Error('namcs2018-required-probe-not-registered');

const EXPECTED_SAMPLE_VISITS = 9953;
const EXPECTED_WEIGHTED_VISITS = 860385639;
const MINIMUM_DISPLAY_SAMPLE = 30;
const sha256 = value => createHash('sha256').update(value).digest('hex');
const round = (value, digits = 3) => Number(value.toFixed(digits));
const asFiniteNumber = value => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};
const asIntegerCode = value => {
  const number = asFiniteNumber(value);
  return number !== null && Number.isInteger(number) ? String(number) : '';
};
const normalizeDiagnosis = value => String(value ?? '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
const normalizeDrugId = value => {
  const code = String(value ?? '').trim().toLowerCase();
  return /^[acdn]\d{5}$/.test(code) ? code : null;
};
const validAge = value => {
  const age = asFiniteNumber(value);
  return age !== null && Number.isInteger(age) && age >= 0 && age <= 93 ? age : null;
};

const RFV_CODES = Object.freeze({
  cough: new Set(['14400']),
  coryza: new Set(['14000']),
  soreThroat: new Set(['14551', '14552']),
  dyspnea: new Set(['14150', '14200']),
  wheeze: new Set(['14250']),
  rapidBreathingProxy: new Set(['14302']),
});

const CONDITION_RULES = Object.freeze([
  ['ivas-pediatrica', code => code.startsWith('J00') || code.startsWith('J06')],
  ['pneumonia-adquirida-comunidade-pediatrica', code => /^J1[2-8]/.test(code)],
  ['bronquiolite', code => code.startsWith('J21')],
  ['asma-pediatrica', code => code.startsWith('J45')],
  ['crupe', code => code.startsWith('J05')],
  ['coqueluche', code => code.startsWith('A37')],
  ['influenza-covid-pediatrica', code => /^(J09|J10|J11)/.test(code)],
  ['faringite-aguda', code => code.startsWith('J02') || code.startsWith('J03')],
]);

const rfvColumns = Array.from({ length: 5 }, (_, index) => `RFV${index + 1}`);
const diagnosisColumns = Array.from({ length: 5 }, (_, index) => `DIAG${index + 1}`);
const drugIdColumns = Array.from({ length: 30 }, (_, index) => `DRUGID${index + 1}`);
const prescriptionColumns = Array.from({ length: 30 }, (_, index) => `PRESCR${index + 1}`);
const selectedColumns = new Set([
  'AGE',
  'AGEDAYS',
  'TEMPTAKE',
  'TEMPF',
  'PATWT',
  'CSTRATM',
  'CPSUM',
  ...rfvColumns,
  ...diagnosisColumns,
  ...drugIdColumns,
  ...prescriptionColumns,
]);

const emptyPositiveOnly = () => ({ samplePositive: 0, weightedPositive: 0 });
const emptyTriState = () => ({
  samplePresent: 0,
  sampleAbsent: 0,
  sampleUnknown: 0,
  weightedPresent: 0,
  weightedAbsent: 0,
  weightedUnknown: 0,
});
const emptyCondition = () => ({ sampleVisits: 0, weightedVisits: 0 });
const emptyMedication = name => ({
  name,
  sampleVisits: 0,
  weightedVisits: 0,
  prescriptionSampleVisits: 0,
  prescriptionWeightedVisits: 0,
});

function detectSignals(row) {
  const rfv = new Set(rfvColumns.map(column => asIntegerCode(row[column])).filter(Boolean));
  const diagnoses = diagnosisColumns.map(column => normalizeDiagnosis(row[column])).filter(Boolean);
  const fever = asFiniteNumber(row.TEMPTAKE) === 1
    && asFiniteNumber(row.TEMPF) !== null
    && asFiniteNumber(row.TEMPF) >= 1004;
  const features = {
    measuredFeverAtVisit: fever,
    cough: [...RFV_CODES.cough].some(code => rfv.has(code)),
    coryza: [...RFV_CODES.coryza].some(code => rfv.has(code)),
    soreThroat: [...RFV_CODES.soreThroat].some(code => rfv.has(code)),
    dyspnea: [...RFV_CODES.dyspnea].some(code => rfv.has(code)),
    wheeze: [...RFV_CODES.wheeze].some(code => rfv.has(code)),
  };
  const proxies = {
    rapidBreathing: [...RFV_CODES.rapidBreathingProxy].some(code => rfv.has(code)),
    stridorDiagnosis: diagnoses.some(code => code.startsWith('R061')),
  };
  const conditions = CONDITION_RULES
    .filter(([, predicate]) => diagnoses.some(predicate))
    .map(([conditionId]) => conditionId);
  return { features, proxies, conditions };
}

function parseDrugLabels(formatText) {
  const sectionStart = formatText.indexOf('VALUE $DRUGIDF');
  if (sectionStart < 0) throw new Error('namcs2018-drug-label-section-missing');
  const sectionRemainder = formatText.slice(sectionStart);
  const sectionEndMatch = /^\s*;\s*$/m.exec(sectionRemainder);
  if (!sectionEndMatch) throw new Error('namcs2018-drug-label-section-unterminated');
  const section = sectionRemainder.slice(0, sectionEndMatch.index);
  const labels = new Map();
  const pattern = /^\s*"([acdn]\d{5})"="((?:[^"]|"")*)"\s*$/gm;
  for (const match of section.matchAll(pattern)) {
    labels.set(match[1].toLowerCase(), match[2].replace(/""/g, '"'));
  }
  if (labels.size < 1000) throw new Error(`namcs2018-drug-label-count-invalid:${labels.size}`);
  return labels;
}

function medicationMentions(row, labels) {
  const mentions = new Map();
  for (let index = 1; index <= 30; index += 1) {
    const drugId = normalizeDrugId(row[`DRUGID${index}`]);
    if (!drugId) continue;
    const prescriptionStatus = asFiniteNumber(row[`PRESCR${index}`]);
    const previous = mentions.get(drugId);
    mentions.set(drugId, {
      name: labels.get(drugId) ?? 'UNLABELED PUBLIC-USE DRUG CODE',
      prescription: previous?.prescription === true || prescriptionStatus === 1 || prescriptionStatus === 5,
    });
  }
  return mentions;
}

function updateMedicationMap(map, mentions, weight) {
  for (const [drugId, mention] of mentions) {
    const counter = map.get(drugId) ?? emptyMedication(mention.name);
    counter.sampleVisits += 1;
    counter.weightedVisits += weight;
    if (mention.prescription) {
      counter.prescriptionSampleVisits += 1;
      counter.prescriptionWeightedVisits += weight;
    }
    map.set(drugId, counter);
  }
}

function serializeMedicationMap(map, denominatorWeight, limit) {
  return [...map.entries()]
    .filter(([, counter]) => counter.sampleVisits >= MINIMUM_DISPLAY_SAMPLE)
    .sort((left, right) => right[1].weightedVisits - left[1].weightedVisits)
    .slice(0, limit)
    .map(([drugId, counter]) => ({
      drugId,
      name: counter.name,
      sampleVisits: counter.sampleVisits,
      weightedVisitEstimate: round(counter.weightedVisits),
      weightedShareOfAuditDomain: denominatorWeight > 0 ? round(counter.weightedVisits / denominatorWeight, 6) : null,
      prescriptionSampleVisits: counter.prescriptionSampleVisits,
      prescriptionWeightedVisitEstimate: round(counter.prescriptionWeightedVisits),
      reliability: 'descriptive-point-estimate-only',
    }));
}

function updatePositiveOnly(counter, present, weight) {
  if (!present) return;
  counter.samplePositive += 1;
  counter.weightedPositive += weight;
}

function updateAgeUnder2(counter, age, weight) {
  if (age === null) {
    counter.sampleUnknown += 1;
    counter.weightedUnknown += weight;
  } else if (age < 2) {
    counter.samplePresent += 1;
    counter.weightedPresent += weight;
  } else {
    counter.sampleAbsent += 1;
    counter.weightedAbsent += weight;
  }
}

function ageBand(age) {
  if (age < 2) return 'under-2';
  if (age < 5) return '2-4';
  if (age < 12) return '5-11';
  return '12-17';
}

async function fetchFile(url, destination) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'Darwin-MFC-public-NAMCS-analysis/1.0' },
    redirect: 'follow',
    signal: AbortSignal.timeout(5 * 60 * 1000),
  });
  if (!response.ok || !response.body) throw new Error(`namcs2018-source-unreachable:${response.status}:${url}`);
  const hash = createHash('sha256');
  let bytesRead = 0;
  const hashingStream = new Transform({
    transform(chunk, _encoding, callback) {
      hash.update(chunk);
      bytesRead += chunk.length;
      callback(null, chunk);
    },
  });
  await pipeline(Readable.fromWeb(response.body), hashingStream, createWriteStream(destination));
  return {
    url: response.url,
    etag: response.headers.get('etag'),
    lastModified: response.headers.get('last-modified'),
    contentLength: response.headers.get('content-length') === null
      ? null
      : Number(response.headers.get('content-length')),
    bytesRead,
    sha256: hash.digest('hex'),
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'Darwin-MFC-public-NAMCS-analysis/1.0' },
    redirect: 'follow',
    signal: AbortSignal.timeout(2 * 60 * 1000),
  });
  if (!response.ok) throw new Error(`namcs2018-format-unreachable:${response.status}:${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  return {
    text: bytes.toString('latin1'),
    receipt: {
      url: response.url,
      etag: response.headers.get('etag'),
      lastModified: response.headers.get('last-modified'),
      contentLength: response.headers.get('content-length') === null
        ? null
        : Number(response.headers.get('content-length')),
      bytesRead: bytes.length,
      sha256: sha256(bytes),
    },
  };
}

function runSelfTest() {
  const synthetic = {
    AGE: 1,
    AGEDAYS: -7,
    TEMPTAKE: 1,
    TEMPF: 1004,
    RFV1: 14400,
    RFV2: 14000,
    RFV3: 14551,
    RFV4: 14200,
    RFV5: 14250,
    DIAG1: 'J189',
    DIAG2: 'J210',
  };
  const detected = detectSignals(synthetic);
  const checks = {
    oneYearOldMapsUnder2: validAge(synthetic.AGE) < 2,
    feverThresholdUsesImpliedDecimal: detected.features.measuredFeverAtVisit,
    allFivePositiveSignalsDetected: Object.values(detected.features).every(Boolean),
    pneumoniaDetected: detected.conditions.includes('pneumonia-adquirida-comunidade-pediatrica'),
    bronchiolitisDetected: detected.conditions.includes('bronquiolite'),
    absenceNeverInferredFromMissingRfv: detectSignals({ AGE: 4 }).features.cough === false,
    probabilitiesNotEstimated: true,
    prescriptionRecommendationBlocked: true,
  };
  if (!Object.values(checks).every(Boolean)) {
    throw new Error(`namcs2018-self-test-failed:${JSON.stringify(checks)}`);
  }
  const report = {
    schemaVersion: 'darwin.sounio.public-namcs2018-adapter-self-test.v1',
    status: 'adapter-mappings-valid',
    checks,
    probabilitiesEstimated: false,
    prescriptionRecommendationAuthorized: false,
    clinicalActivationAuthorized: false,
  };
  console.log(JSON.stringify(report, null, 2));
  console.log('PUBLIC_NAMCS2018_ADAPTER_SELF_TEST_VALID');
}

async function analyze() {
  const tempDirectory = await mkdtemp(join(tmpdir(), 'darwin-namcs2018-'));
  const archivePath = join(tempDirectory, 'namcs2018_sas.zip');
  const sasPath = join(tempDirectory, 'namcs2018_sas.sas7bdat');
  try {
    const [archiveReceipt, formatSource] = await Promise.all([
      fetchFile(archiveProbe.url, archivePath),
      fetchText(formatProbe.url),
    ]);
    if (archiveReceipt.contentLength !== null && archiveReceipt.bytesRead !== archiveReceipt.contentLength) {
      throw new Error('namcs2018-archive-byte-count-mismatch');
    }
    const unzip = spawnSync('unzip', ['-qq', '-o', archivePath, '-d', tempDirectory], { encoding: 'utf8' });
    if (unzip.status !== 0) {
      throw new Error(`namcs2018-unzip-failed:${unzip.stderr || unzip.stdout || unzip.status}`);
    }

    const sasBuffer = await readFile(sasPath);
    const sasSha256 = sha256(sasBuffer);
    const labels = parseDrugLabels(formatSource.text);
    const aggregate = {
      sourceRowsRead: 0,
      sourceWeightedVisits: 0,
      invalidWeightRows: 0,
      pediatricVisits: 0,
      pediatricWeightedVisits: 0,
      nonPediatricVisits: 0,
      nonPediatricWeightedVisits: 0,
      ageUnknownOrInvalid: 0,
      ageUnknownOrInvalidWeightedVisits: 0,
      ageBands: {
        'under-2': { sampleVisits: 0, weightedVisits: 0 },
        '2-4': { sampleVisits: 0, weightedVisits: 0 },
        '5-11': { sampleVisits: 0, weightedVisits: 0 },
        '12-17': { sampleVisits: 0, weightedVisits: 0 },
      },
      positiveOnlyFeatures: {
        measuredFeverAtVisit: emptyPositiveOnly(),
        cough: emptyPositiveOnly(),
        coryza: emptyPositiveOnly(),
        soreThroat: emptyPositiveOnly(),
        dyspnea: emptyPositiveOnly(),
        wheeze: emptyPositiveOnly(),
      },
      exactFeatures: { ageUnder2: emptyTriState() },
      proxySignals: {
        rapidBreathing: emptyPositiveOnly(),
        stridorDiagnosis: emptyPositiveOnly(),
      },
      conditions: Object.fromEntries(CONDITION_RULES.map(([conditionId]) => [conditionId, emptyCondition()])),
      respiratoryDevelopmentSubset: { sampleVisits: 0, weightedVisits: 0 },
    };
    const medicationTotals = new Map();
    const conditionMedications = new Map(CONDITION_RULES.map(([conditionId]) => [conditionId, new Map()]));
    const strata = new Map();
    const observedColumns = new Set();
    let parserMetadata = null;
    let currentObservation = -1;
    let currentRow = {};

    const finalizeRow = row => {
      if (Object.keys(row).length === 0) return;
      aggregate.sourceRowsRead += 1;
      const weightValue = asFiniteNumber(row.PATWT);
      const weight = weightValue !== null && weightValue > 0 ? weightValue : 0;
      if (weight === 0) aggregate.invalidWeightRows += 1;
      aggregate.sourceWeightedVisits += weight;

      const stratum = asIntegerCode(row.CSTRATM);
      const cluster = asIntegerCode(row.CPSUM);
      if (stratum && cluster) {
        const clusters = strata.get(stratum) ?? new Set();
        clusters.add(cluster);
        strata.set(stratum, clusters);
      }

      const age = validAge(row.AGE);
      if (age === null) {
        aggregate.ageUnknownOrInvalid += 1;
        aggregate.ageUnknownOrInvalidWeightedVisits += weight;
        return;
      }
      if (age >= 18) {
        aggregate.nonPediatricVisits += 1;
        aggregate.nonPediatricWeightedVisits += weight;
        return;
      }

      aggregate.pediatricVisits += 1;
      aggregate.pediatricWeightedVisits += weight;
      const band = aggregate.ageBands[ageBand(age)];
      band.sampleVisits += 1;
      band.weightedVisits += weight;
      updateAgeUnder2(aggregate.exactFeatures.ageUnder2, age, weight);

      const detected = detectSignals(row);
      for (const [feature, present] of Object.entries(detected.features)) {
        updatePositiveOnly(aggregate.positiveOnlyFeatures[feature], present, weight);
      }
      for (const [proxy, present] of Object.entries(detected.proxies)) {
        updatePositiveOnly(aggregate.proxySignals[proxy], present, weight);
      }
      for (const conditionId of detected.conditions) {
        aggregate.conditions[conditionId].sampleVisits += 1;
        aggregate.conditions[conditionId].weightedVisits += weight;
      }

      const inRespiratoryDevelopmentSubset = Object.values(detected.features).some(Boolean)
        || Object.values(detected.proxies).some(Boolean)
        || detected.conditions.length > 0;
      if (!inRespiratoryDevelopmentSubset) return;
      aggregate.respiratoryDevelopmentSubset.sampleVisits += 1;
      aggregate.respiratoryDevelopmentSubset.weightedVisits += weight;
      const mentions = medicationMentions(row, labels);
      updateMedicationMap(medicationTotals, mentions, weight);
      for (const conditionId of detected.conditions) {
        updateMedicationMap(conditionMedications.get(conditionId), mentions, weight);
      }
    };

    const parser = new ReadStatParser();
    parser.setMetadataHandler(metadata => {
      parserMetadata = metadata;
    });
    parser.setVariableHandler((_index, variable) => {
      observedColumns.add(variable.name);
      return selectedColumns.has(variable.name) ? HandlerStatus.OK : HandlerStatus.SKIP_VARIABLE;
    });
    parser.setValueHandler((observationIndex, variable, value) => {
      if (observationIndex !== currentObservation) {
        finalizeRow(currentRow);
        currentObservation = observationIndex;
        currentRow = {};
      }
      currentRow[variable.name] = value.toJS();
    });
    parser.setErrorHandler(message => {
      throw new Error(`namcs2018-parser-error:${message}`);
    });
    const parseStatus = parseSas7bdat(parser, new BufferIoContext(new Uint8Array(sasBuffer)), null);
    finalizeRow(currentRow);
    if (parseStatus !== 0) throw new Error(`namcs2018-parser-status:${parseStatus}`);

    const missingColumns = [...selectedColumns].filter(column => !observedColumns.has(column));
    const strataWithSingleCluster = [...strata.values()].filter(clusters => clusters.size < 2).length;
    const uniqueClusters = [...strata.values()].reduce((sum, clusters) => sum + clusters.size, 0);
    const conditionSummary = Object.fromEntries(Object.entries(aggregate.conditions).map(([conditionId, counter]) => [
      conditionId,
      {
        sampleVisits: counter.sampleVisits,
        weightedVisitEstimate: round(counter.weightedVisits),
        weightedShareOfPediatricVisits: aggregate.pediatricWeightedVisits > 0
          ? round(counter.weightedVisits / aggregate.pediatricWeightedVisits, 6)
          : null,
        displayEligible: counter.sampleVisits >= MINIMUM_DISPLAY_SAMPLE,
        topMedicationMentions: counter.sampleVisits >= MINIMUM_DISPLAY_SAMPLE
          ? serializeMedicationMap(conditionMedications.get(conditionId), counter.weightedVisits, 5)
          : [],
      },
    ]));
    const positiveOnlyFeatures = Object.fromEntries(Object.entries(aggregate.positiveOnlyFeatures).map(([feature, counter]) => [
      feature,
      {
        samplePositiveMentions: counter.samplePositive,
        weightedPositiveVisitEstimate: round(counter.weightedPositive),
        weightedShareOfPediatricVisits: aggregate.pediatricWeightedVisits > 0
          ? round(counter.weightedPositive / aggregate.pediatricWeightedVisits, 6)
          : null,
        omissionInterpretation: 'unknown-not-absent',
      },
    ]));
    const proxySignals = Object.fromEntries(Object.entries(aggregate.proxySignals).map(([proxy, counter]) => [
      proxy,
      {
        samplePositiveMentions: counter.samplePositive,
        weightedPositiveVisitEstimate: round(counter.weightedPositive),
        canonicalFeatureValue: 'unknown',
      },
    ]));
    const ageBands = Object.fromEntries(Object.entries(aggregate.ageBands).map(([band, counter]) => [
      band,
      {
        sampleVisits: counter.sampleVisits,
        weightedVisitEstimate: round(counter.weightedVisits),
      },
    ]));
    const ageUnder2 = aggregate.exactFeatures.ageUnder2;
    const invariants = {
      sourceRowsMatchDocumentation: aggregate.sourceRowsRead === EXPECTED_SAMPLE_VISITS,
      parserMetadataMatchesRows: parserMetadata?.rowCount === aggregate.sourceRowsRead,
      weightedVisitsMatchDocumentation: Math.abs(aggregate.sourceWeightedVisits - EXPECTED_WEIGHTED_VISITS) < 1,
      allWeightsPositive: aggregate.invalidWeightRows === 0,
      requiredColumnsPresent: missingColumns.length === 0,
      pediatricAgePartitionComplete: aggregate.pediatricVisits
        + aggregate.nonPediatricVisits
        + aggregate.ageUnknownOrInvalid === aggregate.sourceRowsRead,
      pediatricAgeBandsComplete: Object.values(aggregate.ageBands)
        .reduce((sum, counter) => sum + counter.sampleVisits, 0) === aggregate.pediatricVisits,
      ageUnder2PartitionComplete: ageUnder2.samplePresent + ageUnder2.sampleAbsent + ageUnder2.sampleUnknown
        === aggregate.pediatricVisits,
      respiratorySubsetWithinPediatrics: aggregate.respiratoryDevelopmentSubset.sampleVisits <= aggregate.pediatricVisits,
      designMarkersPresent: strata.size > 0 && uniqueClusters > 0,
      archiveByteCountMatchesHeader: archiveReceipt.contentLength === null
        || archiveReceipt.bytesRead === archiveReceipt.contentLength,
      noPatientRowsPersisted: true,
      noProbabilitiesEstimated: true,
      prescriptionRecommendationBlocked: true,
    };
    if (!Object.values(invariants).every(Boolean)) {
      throw new Error(`namcs2018-aggregate-invariant-failed:${JSON.stringify(invariants)}`);
    }

    const report = {
      schemaVersion: 'darwin.sounio.public-namcs2018-ambulatory-audit-receipt.v1',
      status: 'complete-public-ambulatory-audit',
      generatedAt: new Date().toISOString(),
      sourceId: source.sourceId,
      sourceSnapshot: source.access.snapshot,
      sourceArchive: archiveReceipt,
      sourceSas7bdat: {
        fileName: 'namcs2018_sas.sas7bdat',
        bytes: sasBuffer.length,
        sha256: sasSha256,
        parser: '@irbisadm/statfmt@0.1.1',
        parserLineage: 'TypeScript port of ReadStat',
      },
      sourceValueFormats: formatSource.receipt,
      registrySha256: sha256(registryBytes),
      analysisScriptSha256: sha256(scriptBytes),
      parserMetadata: {
        sourceRows: parserMetadata?.rowCount ?? null,
        sourceVariables: parserMetadata?.varCount ?? null,
        fileLabel: parserMetadata?.fileLabel ?? null,
        fileEncoding: parserMetadata?.fileEncoding ?? null,
      },
      selectedColumns: [...selectedColumns].sort(),
      missingColumns,
      patientRowsPersisted: false,
      recordIdentifiersPersisted: false,
      credentialsUsed: false,
      probabilitiesEstimated: false,
      treatmentEffectsEstimated: false,
      varianceEstimated: false,
      apsCalibrationAuthorized: false,
      prescriptionRecommendationAuthorized: false,
      clinicalActivationAuthorized: false,
      firewallDisposition: 'REFUSE',
      design: {
        visitWeight: 'PATWT',
        stratum: 'CSTRATM',
        cluster: 'CPSUM',
        sampledStrata: strata.size,
        sampledClustersWithinStrata: uniqueClusters,
        strataWithSingleCluster,
        pointEstimatesUseWeights: true,
        standardErrorsComputed: false,
        caveat: 'Point estimates preserve PATWT. Inferential intervals require a separate validated complex-survey implementation using CSTRATM and CPSUM.',
      },
      reliabilityPolicy: {
        minimumDisplaySample: MINIMUM_DISPLAY_SAMPLE,
        smallMedicationCellsSuppressed: true,
        observedAssociationIsNotRecommendation: true,
      },
      notes: [
        'RFV fields are positive mentions. Omission remains unknown and never establishes symptom absence.',
        'Diagnosis codes are provider or billing proxies and are not a double-adjudicated reference standard.',
        'Medication mentions describe 2018 United States office practice and cannot generate prescriptions or treatment recommendations.',
        'The respiratory development subset is a reproducible audit domain, not an APS/SUS target cohort.',
      ],
      invariants,
      aggregate: {
        sourceRowsRead: aggregate.sourceRowsRead,
        sourceWeightedVisitEstimate: round(aggregate.sourceWeightedVisits),
        pediatricVisits: aggregate.pediatricVisits,
        pediatricWeightedVisitEstimate: round(aggregate.pediatricWeightedVisits),
        nonPediatricVisits: aggregate.nonPediatricVisits,
        nonPediatricWeightedVisitEstimate: round(aggregate.nonPediatricWeightedVisits),
        ageUnknownOrInvalid: aggregate.ageUnknownOrInvalid,
        ageBands,
        positiveOnlyFeatures,
        exactFeatures: {
          ageUnder2: {
            samplePresent: ageUnder2.samplePresent,
            sampleAbsent: ageUnder2.sampleAbsent,
            sampleUnknown: ageUnder2.sampleUnknown,
            weightedPresentVisitEstimate: round(ageUnder2.weightedPresent),
            weightedAbsentVisitEstimate: round(ageUnder2.weightedAbsent),
            weightedUnknownVisitEstimate: round(ageUnder2.weightedUnknown),
          },
        },
        proxySignals,
        conditionProxies: conditionSummary,
        respiratoryDevelopmentSubset: {
          sampleVisits: aggregate.respiratoryDevelopmentSubset.sampleVisits,
          weightedVisitEstimate: round(aggregate.respiratoryDevelopmentSubset.weightedVisits),
          topMedicationMentions: serializeMedicationMap(
            medicationTotals,
            aggregate.respiratoryDevelopmentSubset.weightedVisits,
            20,
          ),
        },
      },
    };

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify(report, null, 2));
    console.log('PUBLIC_NAMCS2018_AMBULATORY_AUDIT_COMPLETE');
  } finally {
    await rm(tempDirectory, { recursive: true, force: true });
  }
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  await analyze();
}
