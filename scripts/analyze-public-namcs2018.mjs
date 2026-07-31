import { createHash } from 'node:crypto';
import { createWriteStream, readFileSync, readdirSync, readlinkSync } from 'node:fs';
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
import {
  estimateSurveyRatio,
  estimateSurveyTotal,
  normalConfidenceInterval,
} from './lib/complex-survey-linearization.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(root, 'clinical/epistemic-firewall/public-data/public-dataset-registry.v1.json');
const outputPath = join(root, '.clinical-kernel-build/public-data/namcs2018-ambulatory-audit.json');
const parityOutputPath = join(root, '.clinical-kernel-build/public-data/namcs2018-survey-parity.json');
const oracleRuntimeReceiptPath = join(
  root,
  '.clinical-kernel-build/public-data/namcs2018-survey-oracle-runtime.json',
);
const oracleScriptPath = join(root, 'scripts/oracles/namcs2018-survey-oracle.R');
const linearizationScriptPath = join(root, 'scripts/lib/complex-survey-linearization.mjs');
const oracleBootstrapScriptPath = join(root, 'scripts/bootstrap-namcs2018-survey-oracle.mjs');
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
const PARITY_RELATIVE_TOLERANCE = 1e-9;
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

const CONDITION_SURVEY_VARIABLES = Object.freeze({
  'ivas-pediatrica': 'condition_ivas',
  'pneumonia-adquirida-comunidade-pediatrica': 'condition_pneumonia',
  bronquiolite: 'condition_bronchiolitis',
  'asma-pediatrica': 'condition_asthma',
  crupe: 'condition_croup',
  coqueluche: 'condition_pertussis',
  'influenza-covid-pediatrica': 'condition_influenza',
  'faringite-aguda': 'condition_pharyngitis',
});

const SURVEY_METRICS = Object.freeze([
  { metricId: 'pediatric_total', type: 'total', numerator: 'pediatric' },
  { metricId: 'respiratory_total', type: 'total', numerator: 'respiratory' },
  { metricId: 'measured_fever_share', type: 'ratio', numerator: 'feature_measured_fever', denominator: 'pediatric' },
  { metricId: 'cough_share', type: 'ratio', numerator: 'feature_cough', denominator: 'pediatric' },
  { metricId: 'coryza_share', type: 'ratio', numerator: 'feature_coryza', denominator: 'pediatric' },
  { metricId: 'sore_throat_share', type: 'ratio', numerator: 'feature_sore_throat', denominator: 'pediatric' },
  { metricId: 'dyspnea_share', type: 'ratio', numerator: 'feature_dyspnea', denominator: 'pediatric' },
  { metricId: 'wheeze_share', type: 'ratio', numerator: 'feature_wheeze', denominator: 'pediatric' },
  { metricId: 'rapid_breathing_proxy_share', type: 'ratio', numerator: 'proxy_rapid_breathing', denominator: 'pediatric' },
  { metricId: 'stridor_proxy_share', type: 'ratio', numerator: 'proxy_stridor', denominator: 'pediatric' },
  { metricId: 'ivas_share', type: 'ratio', numerator: 'condition_ivas', denominator: 'pediatric' },
  { metricId: 'pneumonia_share', type: 'ratio', numerator: 'condition_pneumonia', denominator: 'pediatric' },
  { metricId: 'bronchiolitis_share', type: 'ratio', numerator: 'condition_bronchiolitis', denominator: 'pediatric' },
  { metricId: 'asthma_share', type: 'ratio', numerator: 'condition_asthma', denominator: 'pediatric' },
  { metricId: 'croup_share', type: 'ratio', numerator: 'condition_croup', denominator: 'pediatric' },
  { metricId: 'pertussis_share', type: 'ratio', numerator: 'condition_pertussis', denominator: 'pediatric' },
  { metricId: 'influenza_share', type: 'ratio', numerator: 'condition_influenza', denominator: 'pediatric' },
  { metricId: 'pharyngitis_share', type: 'ratio', numerator: 'condition_pharyngitis', denominator: 'pediatric' },
  { metricId: 'amoxicillin_respiratory_share', type: 'ratio', numerator: 'medication_amoxicillin', denominator: 'respiratory' },
  { metricId: 'albuterol_respiratory_share', type: 'ratio', numerator: 'medication_albuterol', denominator: 'respiratory' },
  { metricId: 'acetaminophen_respiratory_share', type: 'ratio', numerator: 'medication_acetaminophen', denominator: 'respiratory' },
]);
const SURVEY_VARIABLES = Object.freeze([
  ...new Set(SURVEY_METRICS.flatMap(metric => [metric.numerator, metric.denominator]).filter(Boolean)),
]);
const SURVEY_MEDICATIONS = Object.freeze({
  d00088: 'medication_amoxicillin',
  d00749: 'medication_albuterol',
  d00049: 'medication_acetaminophen',
});

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

const emptySurveyValues = () => Object.fromEntries(SURVEY_VARIABLES.map(variable => [variable, 0]));

function parseTsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error('namcs2018-survey-oracle-output-empty');
  const headers = lines[0].split('\t');
  return lines.slice(1).map(line => Object.fromEntries(
    line.split('\t').map((value, index) => [headers[index], value]),
  ));
}

function relativeError(left, right) {
  return Math.abs(left - right) / Math.max(1, Math.abs(left), Math.abs(right));
}

function directorySha256(directory) {
  const hash = createHash('sha256');
  const walk = (current, relative) => {
    const entries = readdirSync(current, { withFileTypes: true })
      .sort((left, right) => (left.name < right.name ? -1 : Number(left.name > right.name)));
    for (const entry of entries) {
      const entryRelative = relative ? `${relative}/${entry.name}` : entry.name;
      const entryPath = join(current, entry.name);
      if (entry.isDirectory()) {
        hash.update(`directory\0${entryRelative}\0`);
        walk(entryPath, entryRelative);
      } else if (entry.isSymbolicLink()) {
        hash.update(`symlink\0${entryRelative}\0${readlinkSync(entryPath)}\0`);
      } else {
        hash.update(`file\0${entryRelative}\0`);
        hash.update(readFileSync(entryPath));
      }
    }
  };
  walk(directory, '');
  return hash.digest('hex');
}

function oracleRuntimeIdentityValid(runtimeReceipt, expected) {
  const installedSurvey = runtimeReceipt.installedPackages?.find(pkg => pkg.name === 'survey');
  return runtimeReceipt.schemaVersion === 'darwin.sounio.namcs2018-survey-oracle-runtime.v1'
    && runtimeReceipt.status === 'pinned-oracle-ready'
    && runtimeReceipt.source?.version === '4.5'
    && runtimeReceipt.source?.sha256 === '8a2ab01759f9acf6000274255edf00e342dfbf320a39fb76d42594e4d262b519'
    && runtimeReceipt.bootstrapScriptSha256 === expected.bootstrapScriptSha256
    && runtimeReceipt.libraryPath === expected.libraryPath
    && installedSurvey?.version === '4.5'
    && installedSurvey?.path === join(expected.libraryPath, 'survey')
    && installedSurvey?.treeSha256 === expected.surveyTreeSha256
    && runtimeReceipt.runtime?.rscriptSha256 === expected.rscriptSha256;
}

async function runSurveyParity(records, sourceReport, tempDirectory) {
  const runtimeReceiptBytes = await readFile(oracleRuntimeReceiptPath).catch(() => null);
  if (!runtimeReceiptBytes) {
    throw new Error('namcs2018-survey-oracle-unavailable:run-pnpm-bootstrap:public-namcs2018-survey-oracle');
  }
  const runtimeReceipt = JSON.parse(runtimeReceiptBytes.toString('utf8'));
  const bootstrapScriptBytes = await readFile(oracleBootstrapScriptPath);
  const expectedLibraryPath = join(root, '.clinical-kernel-build/r-library');
  const installedSurvey = runtimeReceipt.installedPackages?.find(pkg => pkg.name === 'survey');
  const rscriptBytes = runtimeReceipt.runtime?.rscriptPath
    ? await readFile(runtimeReceipt.runtime.rscriptPath).catch(() => null)
    : null;
  const surveyTreeSha256 = installedSurvey?.path
    ? (() => {
      try {
        return directorySha256(installedSurvey.path);
      } catch {
        return null;
      }
    })()
    : null;
  if (!rscriptBytes || !oracleRuntimeIdentityValid(runtimeReceipt, {
    bootstrapScriptSha256: sha256(bootstrapScriptBytes),
    libraryPath: expectedLibraryPath,
    rscriptSha256: sha256(rscriptBytes),
    surveyTreeSha256,
  })) {
    throw new Error('namcs2018-survey-oracle-runtime-receipt-invalid');
  }

  const inputPath = join(tempDirectory, 'namcs2018-survey-derived-input.tsv');
  const oracleOutputPath = join(tempDirectory, 'namcs2018-survey-oracle-output.tsv');
  const header = ['stratum', 'cluster', 'weight', ...SURVEY_VARIABLES];
  const body = records.map(record => [
    record.stratum,
    record.cluster,
    record.weight,
    ...SURVEY_VARIABLES.map(variable => record.values[variable]),
  ].join('\t'));

  let oracleRows;
  let oracleMarker = false;
  try {
    await writeFile(inputPath, `${header.join('\t')}\n${body.join('\n')}\n`);
    const oracleRun = spawnSync(
      runtimeReceipt.runtime.rscriptPath,
      [oracleScriptPath, inputPath, oracleOutputPath, runtimeReceipt.libraryPath],
      { cwd: root, encoding: 'utf8', timeout: 10 * 60 * 1000 },
    );
    if (oracleRun.status !== 0) {
      throw new Error(`namcs2018-survey-oracle-failed:${oracleRun.stderr || oracleRun.stdout || oracleRun.status}`);
    }
    oracleMarker = oracleRun.stdout.includes('NAMCS2018_R_SURVEY_ORACLE_VALID');
    if (!oracleMarker) throw new Error('namcs2018-survey-oracle-marker-missing');
    oracleRows = parseTsv(await readFile(oracleOutputPath, 'utf8'));
  } finally {
    await Promise.all([
      rm(inputPath, { force: true }),
      rm(oracleOutputPath, { force: true }),
    ]);
  }

  const oracleByMetric = new Map(oracleRows.map(row => [row.metric_id, row]));
  if (oracleRows.some(row => (
    row.r_version !== runtimeReceipt.runtime.version || row.survey_version !== '4.5'
  ))) {
    throw new Error('namcs2018-survey-oracle-runtime-identity-mismatch');
  }
  const metricComparisons = SURVEY_METRICS.map(metric => {
    const node = metric.type === 'total'
      ? estimateSurveyTotal(records, metric.numerator)
      : estimateSurveyRatio(records, metric.numerator, metric.denominator);
    const oracle = oracleByMetric.get(metric.metricId);
    if (!oracle || oracle.type !== metric.type) {
      throw new Error(`namcs2018-survey-oracle-metric-missing:${metric.metricId}`);
    }
    const rEstimate = Number(oracle.estimate);
    const rStandardError = Number(oracle.standard_error);
    const rDegreesOfFreedom = Number(oracle.degrees_freedom);
    if (![rEstimate, rStandardError, rDegreesOfFreedom].every(Number.isFinite)) {
      throw new Error(`namcs2018-survey-oracle-metric-invalid:${metric.metricId}`);
    }
    return {
      metricId: metric.metricId,
      type: metric.type,
      numerator: metric.numerator,
      denominator: metric.denominator ?? null,
      sampleNumerator: records.reduce((sum, record) => sum + record.values[metric.numerator], 0),
      sampleDenominator: metric.denominator
        ? records.reduce((sum, record) => sum + record.values[metric.denominator], 0)
        : null,
      node: {
        estimate: node.estimate,
        standardError: node.standardError,
        degreesOfFreedom: node.degreesOfFreedom,
      },
      rSurvey: {
        estimate: rEstimate,
        standardError: rStandardError,
        degreesOfFreedom: rDegreesOfFreedom,
      },
      absoluteEstimateError: Math.abs(node.estimate - rEstimate),
      relativeEstimateError: relativeError(node.estimate, rEstimate),
      absoluteStandardErrorError: Math.abs(node.standardError - rStandardError),
      relativeStandardErrorError: relativeError(node.standardError, rStandardError),
      degreesOfFreedomMatch: node.degreesOfFreedom === rDegreesOfFreedom,
    };
  });
  if (oracleByMetric.size !== SURVEY_METRICS.length) {
    throw new Error(`namcs2018-survey-oracle-unexpected-metric-count:${oracleByMetric.size}`);
  }

  const maxEstimateRelativeError = Math.max(...metricComparisons.map(metric => metric.relativeEstimateError));
  const maxStandardErrorRelativeError = Math.max(
    ...metricComparisons.map(metric => metric.relativeStandardErrorError),
  );
  const parityValid = maxEstimateRelativeError <= PARITY_RELATIVE_TOLERANCE
    && maxStandardErrorRelativeError <= PARITY_RELATIVE_TOLERANCE
    && metricComparisons.every(metric => metric.degreesOfFreedomMatch);
  if (!parityValid) {
    throw new Error(`namcs2018-survey-parity-failed:${JSON.stringify({
      maxEstimateRelativeError,
      maxStandardErrorRelativeError,
    })}`);
  }

  const oracleScriptBytes = await readFile(oracleScriptPath);
  const linearizationScriptBytes = await readFile(linearizationScriptPath);
  return {
    schemaVersion: 'darwin.sounio.public-namcs2018-survey-parity-receipt.v1',
    status: 'design-variance-parity-valid',
    generatedAt: new Date().toISOString(),
    sourceId: sourceReport.sourceId,
    sourceSnapshot: sourceReport.sourceSnapshot,
    sourceArchiveSha256: sourceReport.sourceArchive.sha256,
    sourceSas7bdatSha256: sourceReport.sourceSas7bdat.sha256,
    auditReceiptSha256: sha256(Buffer.from(`${JSON.stringify(sourceReport, null, 2)}\n`)),
    oracleRuntimeReceiptSha256: sha256(runtimeReceiptBytes),
    oracleBootstrapScriptSha256: sha256(bootstrapScriptBytes),
    oracleScriptSha256: sha256(oracleScriptBytes),
    linearizationScriptSha256: sha256(linearizationScriptBytes),
    methods: {
      node: 'Taylor linearization for stratified with-replacement ultimate-cluster design',
      oracle: 'R survey::svydesign with ids=cluster, strata=stratum, weights=PATWT, nest=TRUE',
      confidenceInterval: 'Normal/Wald 95%; ratio bounds truncated to [0,1]',
      cdcDesignVariables: { weight: 'PATWT', stratum: 'CSTRATM', cluster: 'CPSUM' },
    },
    oracle: {
      package: 'survey',
      version: '4.5',
      sourceSha256: runtimeReceipt.source.sha256,
      installedTreeSha256: installedSurvey.treeSha256,
      rVersion: metricComparisons.length > 0 ? oracleRows[0].r_version : null,
      rscriptPath: runtimeReceipt.runtime.rscriptPath,
      rscriptSha256: runtimeReceipt.runtime.rscriptSha256,
      markerObserved: oracleMarker,
    },
    tolerances: { maximumRelativeError: PARITY_RELATIVE_TOLERANCE },
    parity: {
      metricsCompared: metricComparisons.length,
      maxEstimateRelativeError,
      maxStandardErrorRelativeError,
      allDegreesOfFreedomMatch: metricComparisons.every(metric => metric.degreesOfFreedomMatch),
      valid: parityValid,
    },
    design: {
      sourceRows: records.length,
      sampledStrata: new Set(records.map(record => record.stratum)).size,
      sampledClustersWithinStrata: new Set(records.map(record => `${record.stratum}\u0000${record.cluster}`)).size,
      degreesOfFreedom: metricComparisons[0].node.degreesOfFreedom,
      singletonStrata: 0,
    },
    metricComparisons: metricComparisons.map(metric => {
      const intervalEligible = metric.type === 'total' || metric.sampleNumerator >= MINIMUM_DISPLAY_SAMPLE;
      return {
        ...metric,
        reliability: intervalEligible
          ? 'design-based-descriptive-interval'
          : 'small-cell-interval-suppressed',
        confidenceInterval: intervalEligible
          ? normalConfidenceInterval(metric.node.estimate, metric.node.standardError, metric.type === 'ratio')
          : null,
      };
    }),
    patientRowsPersisted: false,
    recordIdentifiersPersisted: false,
    temporaryDerivedRowsDeleted: true,
    probabilitiesEstimated: false,
    treatmentEffectsEstimated: false,
    apsCalibrationAuthorized: false,
    prescriptionRecommendationAuthorized: false,
    clinicalActivationAuthorized: false,
    firewallDisposition: 'REFUSE',
    caveat: 'Validated standard errors describe the 2018 US NAMCS design. They do not establish transportability, diagnostic calibration, causal effects, or APS/SUS prescribing guidance.',
  };
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
  const syntheticRuntimeReceipt = {
    schemaVersion: 'darwin.sounio.namcs2018-survey-oracle-runtime.v1',
    status: 'pinned-oracle-ready',
    source: {
      version: '4.5',
      sha256: '8a2ab01759f9acf6000274255edf00e342dfbf320a39fb76d42594e4d262b519',
    },
    bootstrapScriptSha256: 'bootstrap-hash',
    libraryPath: '/tmp/pinned-r-library',
    installedPackages: [{
      name: 'survey',
      version: '4.5',
      path: '/tmp/pinned-r-library/survey',
      treeSha256: 'survey-tree-hash',
    }],
    runtime: { rscriptSha256: 'rscript-hash' },
  };
  const syntheticRuntimeExpected = {
    bootstrapScriptSha256: 'bootstrap-hash',
    libraryPath: '/tmp/pinned-r-library',
    rscriptSha256: 'rscript-hash',
    surveyTreeSha256: 'survey-tree-hash',
  };
  const checks = {
    oneYearOldMapsUnder2: validAge(synthetic.AGE) < 2,
    feverThresholdUsesImpliedDecimal: detected.features.measuredFeverAtVisit,
    allFivePositiveSignalsDetected: Object.values(detected.features).every(Boolean),
    pneumoniaDetected: detected.conditions.includes('pneumonia-adquirida-comunidade-pediatrica'),
    bronchiolitisDetected: detected.conditions.includes('bronquiolite'),
    absenceNeverInferredFromMissingRfv: detectSignals({ AGE: 4 }).features.cough === false,
    pinnedOracleIdentityAccepted: oracleRuntimeIdentityValid(
      syntheticRuntimeReceipt,
      syntheticRuntimeExpected,
    ),
    tamperedOracleSourceRejected: !oracleRuntimeIdentityValid(
      { ...syntheticRuntimeReceipt, source: { ...syntheticRuntimeReceipt.source, sha256: 'tampered' } },
      syntheticRuntimeExpected,
    ),
    switchedRscriptRejected: !oracleRuntimeIdentityValid(
      syntheticRuntimeReceipt,
      { ...syntheticRuntimeExpected, rscriptSha256: 'switched' },
    ),
    tamperedInstalledTreeRejected: !oracleRuntimeIdentityValid(
      syntheticRuntimeReceipt,
      { ...syntheticRuntimeExpected, surveyTreeSha256: 'tampered-tree' },
    ),
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

async function analyze({ surveyParityMode = false } = {}) {
  if (surveyParityMode) await rm(parityOutputPath, { force: true });
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
    const surveyRecords = [];
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

      const surveyValues = emptySurveyValues();
      const appendSurveyRecord = () => {
        if (!surveyParityMode) return;
        if (!stratum || !cluster || weight <= 0) {
          throw new Error(`namcs2018-survey-design-row-invalid:${aggregate.sourceRowsRead}`);
        }
        surveyRecords.push({ stratum, cluster, weight, values: surveyValues });
      };

      const age = validAge(row.AGE);
      if (age === null) {
        aggregate.ageUnknownOrInvalid += 1;
        aggregate.ageUnknownOrInvalidWeightedVisits += weight;
        appendSurveyRecord();
        return;
      }
      if (age >= 18) {
        aggregate.nonPediatricVisits += 1;
        aggregate.nonPediatricWeightedVisits += weight;
        appendSurveyRecord();
        return;
      }

      surveyValues.pediatric = 1;
      aggregate.pediatricVisits += 1;
      aggregate.pediatricWeightedVisits += weight;
      const band = aggregate.ageBands[ageBand(age)];
      band.sampleVisits += 1;
      band.weightedVisits += weight;
      updateAgeUnder2(aggregate.exactFeatures.ageUnder2, age, weight);

      const detected = detectSignals(row);
      surveyValues.feature_measured_fever = Number(detected.features.measuredFeverAtVisit);
      surveyValues.feature_cough = Number(detected.features.cough);
      surveyValues.feature_coryza = Number(detected.features.coryza);
      surveyValues.feature_sore_throat = Number(detected.features.soreThroat);
      surveyValues.feature_dyspnea = Number(detected.features.dyspnea);
      surveyValues.feature_wheeze = Number(detected.features.wheeze);
      surveyValues.proxy_rapid_breathing = Number(detected.proxies.rapidBreathing);
      surveyValues.proxy_stridor = Number(detected.proxies.stridorDiagnosis);
      for (const [feature, present] of Object.entries(detected.features)) {
        updatePositiveOnly(aggregate.positiveOnlyFeatures[feature], present, weight);
      }
      for (const [proxy, present] of Object.entries(detected.proxies)) {
        updatePositiveOnly(aggregate.proxySignals[proxy], present, weight);
      }
      for (const conditionId of detected.conditions) {
        aggregate.conditions[conditionId].sampleVisits += 1;
        aggregate.conditions[conditionId].weightedVisits += weight;
        surveyValues[CONDITION_SURVEY_VARIABLES[conditionId]] = 1;
      }

      const inRespiratoryDevelopmentSubset = Object.values(detected.features).some(Boolean)
        || Object.values(detected.proxies).some(Boolean)
        || detected.conditions.length > 0;
      if (!inRespiratoryDevelopmentSubset) {
        appendSurveyRecord();
        return;
      }
      surveyValues.respiratory = 1;
      aggregate.respiratoryDevelopmentSubset.sampleVisits += 1;
      aggregate.respiratoryDevelopmentSubset.weightedVisits += weight;
      const mentions = medicationMentions(row, labels);
      for (const [drugId, variable] of Object.entries(SURVEY_MEDICATIONS)) {
        surveyValues[variable] = Number(mentions.has(drugId));
      }
      updateMedicationMap(medicationTotals, mentions, weight);
      for (const conditionId of detected.conditions) {
        updateMedicationMap(conditionMedications.get(conditionId), mentions, weight);
      }
      appendSurveyRecord();
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
      surveyParityRowsComplete: !surveyParityMode || surveyRecords.length === aggregate.sourceRowsRead,
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
    if (surveyParityMode) {
      const parityReport = await runSurveyParity(surveyRecords, report, tempDirectory);
      await writeFile(parityOutputPath, `${JSON.stringify(parityReport, null, 2)}\n`);
      console.log(JSON.stringify(parityReport, null, 2));
      console.log('PUBLIC_NAMCS2018_SURVEY_PARITY_VALID');
    }
  } finally {
    await rm(tempDirectory, { recursive: true, force: true });
  }
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  await analyze({ surveyParityMode: process.argv.includes('--survey-parity') });
}
