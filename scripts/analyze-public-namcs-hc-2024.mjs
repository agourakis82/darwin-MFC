import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import {
  createReadStream,
  createWriteStream,
  readFileSync,
  readdirSync,
  readlinkSync,
} from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import {
  estimateSurveyRatio,
  estimateSurveyTotal,
  normalConfidenceInterval,
} from './lib/complex-survey-linearization.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(root, 'clinical/epistemic-firewall/public-data/public-dataset-registry.v1.json');
const outputPath = join(root, '.clinical-kernel-build/public-data/namcs-hc-2024-transportability.json');
const runtimeReceiptPath = join(root, '.clinical-kernel-build/public-data/namcs2018-survey-oracle-runtime.json');
const oracleScriptPath = join(root, 'scripts/oracles/namcs-hc-2024-oracle.R');
const linearizationScriptPath = join(root, 'scripts/lib/complex-survey-linearization.mjs');
const scriptBytes = readFileSync(fileURLToPath(import.meta.url));
const registryBytes = readFileSync(registryPath);
const registry = JSON.parse(registryBytes.toString('utf8'));
const source = registry.datasets.find(dataset => dataset.sourceId === 'us-namcs-health-center-2024');
if (!source) throw new Error('namcs-hc-2024-source-not-registered');
const rdsProbe = source.probes.find(probe => probe.probeId === 'public-use-rds');
if (!rdsProbe) throw new Error('namcs-hc-2024-rds-probe-not-registered');

const EXPECTED_SOURCE_BYTES = 14135511;
const EXPECTED_SOURCE_SHA256 = '66dd4cfefb95a7938b735ecb0da9dadc78ff72825175296e6a7f9aa4e577533c';
const EXPECTED_SAMPLE_VISITS = 503799;
const EXPECTED_WEIGHTED_VISITS = 123817677.10570423;
const EXPECTED_PEDIATRIC_VISITS = 100730;
const EXPECTED_PEDIATRIC_WEIGHTED_VISITS = 23825240.294117916;
const EXPECTED_CENTERS = 107;
const EXPECTED_STRATA = 8;
const EXPECTED_DEGREES_OF_FREEDOM = 99;
const MINIMUM_DISPLAY_SAMPLE = 30;
const MAXIMUM_DISPLAY_RSE = 0.3;
const PARITY_RELATIVE_TOLERANCE = 1e-9;

const AGE_BANDS = Object.freeze([
  ['under_2', age => age < 2],
  ['2_4', age => age >= 2 && age < 5],
  ['5_11', age => age >= 5 && age < 12],
  ['12_17', age => age >= 12 && age < 18],
]);
const CONDITION_RULES = Object.freeze([
  ['ivas', code => code.startsWith('J00') || code.startsWith('J06')],
  ['pneumonia', code => /^J1[2-8]/.test(code)],
  ['bronchiolitis', code => code.startsWith('J21')],
  ['asthma', code => code.startsWith('J45')],
  ['croup', code => code.startsWith('J05')],
  ['pertussis', code => code.startsWith('A37')],
  ['influenza_covid', code => /^(J09|J10|J11|U071)/.test(code)],
  ['pharyngitis', code => code.startsWith('J02') || code.startsWith('J03')],
]);
const DIAGNOSIS_COLUMNS = Object.freeze(Array.from({ length: 30 }, (_, index) => `dx${index + 1}`));

const sha256 = value => createHash('sha256').update(value).digest('hex');
const round = (value, digits = 6) => Number(value.toFixed(digits));
const relativeError = (left, right) => Math.abs(left - right) / Math.max(1, Math.abs(left), Math.abs(right));
const close = (left, right, tolerance = 1e-9) => Math.abs(left - right) <= tolerance;
const normalizeDiagnosis = value => {
  const raw = String(value ?? '').trim().toUpperCase();
  if (!raw || raw === '-9' || raw === '-7') return '';
  return raw.replace(/[^A-Z0-9]/g, '');
};
const validAge = value => {
  const raw = String(value ?? '').trim();
  if (!raw) return null;
  const age = Number(raw);
  return Number.isInteger(age) && age >= 0 && age <= 89 ? age : null;
};
const classifyAgeBand = age => AGE_BANDS.find(([, predicate]) => predicate(age))?.[0] ?? null;
const detectConditions = diagnoses => Object.fromEntries(CONDITION_RULES.map(([condition, predicate]) => [
  condition,
  diagnoses.some(predicate),
]));

const metricSpec = (() => {
  const metrics = [
    { metricId: 'all_visits_total', type: 'total', numerator: 'all_visits', denominator: null },
    { metricId: 'pediatric_total', type: 'total', numerator: 'pediatric', denominator: null },
  ];
  for (const [ageBand] of AGE_BANDS) {
    metrics.push({
      metricId: `age_${ageBand}_total`,
      type: 'total',
      numerator: `age_${ageBand}`,
      denominator: null,
    });
  }
  for (const [condition] of CONDITION_RULES) {
    const conditionVariable = `condition_${condition}`;
    metrics.push(
      { metricId: `${condition}_total`, type: 'total', numerator: conditionVariable, denominator: null },
      { metricId: `${condition}_share`, type: 'ratio', numerator: conditionVariable, denominator: 'pediatric' },
    );
    for (const [ageBand] of AGE_BANDS) {
      metrics.push({
        metricId: `${condition}_${ageBand}_share`,
        type: 'ratio',
        numerator: `${conditionVariable}_${ageBand}`,
        denominator: `age_${ageBand}`,
      });
    }
  }
  return Object.freeze(metrics);
})();
const surveyVariables = Object.freeze([
  ...new Set(metricSpec.flatMap(metric => [metric.numerator, metric.denominator]).filter(Boolean)),
]);

function emptySurveyValues() {
  return Object.fromEntries(surveyVariables.map(variable => [variable, 0]));
}

function parseTsvLine(line, headers) {
  const values = line.split('\t');
  if (values.length !== headers.length) throw new Error('namcs-hc-2024-tsv-column-count-mismatch');
  return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
}

async function fetchFile(url, destination) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'Darwin-MFC-public-NAMCS-HC-analysis/1.0' },
    redirect: 'follow',
    signal: AbortSignal.timeout(5 * 60 * 1000),
  });
  if (!response.ok || !response.body) throw new Error(`namcs-hc-2024-source-unreachable:${response.status}`);
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

async function loadPinnedRuntime() {
  const bytes = await readFile(runtimeReceiptPath).catch(() => null);
  if (!bytes) throw new Error('namcs-hc-2024-oracle-runtime-unavailable');
  const receipt = JSON.parse(bytes.toString('utf8'));
  const surveyPackage = receipt.installedPackages?.find(pkg => pkg.name === 'survey');
  const rscriptBytes = receipt.runtime?.rscriptPath
    ? await readFile(receipt.runtime.rscriptPath).catch(() => null)
    : null;
  const valid = receipt.schemaVersion === 'darwin.sounio.namcs2018-survey-oracle-runtime.v1'
    && receipt.status === 'pinned-oracle-ready'
    && receipt.source?.version === '4.5'
    && receipt.source?.sha256 === '8a2ab01759f9acf6000274255edf00e342dfbf320a39fb76d42594e4d262b519'
    && surveyPackage?.version === '4.5'
    && surveyPackage?.path === join(receipt.libraryPath, 'survey')
    && surveyPackage?.treeSha256 === directorySha256(surveyPackage.path)
    && rscriptBytes
    && receipt.runtime.rscriptSha256 === sha256(rscriptBytes);
  if (!valid) throw new Error('namcs-hc-2024-oracle-runtime-identity-invalid');
  return { bytes, receipt, surveyPackage };
}

function serializeMetric(metric) {
  const relativeStandardError = Math.abs(metric.node.standardError / metric.node.estimate);
  const displayEligible = metric.sampleNumerator >= MINIMUM_DISPLAY_SAMPLE
    && metric.node.degreesOfFreedom >= 8
    && Number.isFinite(relativeStandardError)
    && relativeStandardError <= MAXIMUM_DISPLAY_RSE;
  if (!displayEligible) {
    return {
      metricId: metric.metricId,
      type: metric.type,
      displayStatus: 'suppressed',
      suppressionReason: metric.sampleNumerator < MINIMUM_DISPLAY_SAMPLE
        ? 'sample-numerator-below-30'
        : 'exploratory-relative-standard-error-above-30-percent',
      sampleNumerator: null,
      sampleDenominator: null,
      estimate: null,
      standardError: null,
      confidenceInterval: null,
    };
  }
  const interval = normalConfidenceInterval(
    metric.node.estimate,
    metric.node.standardError,
    metric.type === 'ratio',
  );
  const present = value => metric.type === 'total'
    ? Math.round(value / 1000) * 1000
    : round(value, 6);
  return {
    metricId: metric.metricId,
    type: metric.type,
    displayStatus: 'published-exploratory',
    sampleNumerator: metric.sampleNumerator,
    sampleDenominator: metric.sampleDenominator,
    estimate: present(metric.node.estimate),
    standardError: present(metric.node.standardError),
    relativeStandardError: round(relativeStandardError, 6),
    confidenceInterval: {
      method: interval.method,
      lower: present(interval.lower),
      upper: present(interval.upper),
    },
  };
}

function runSelfTest() {
  const diagnoses = ['J18.9', 'J21.0', 'U07.1', 'A37.0', '-9'].map(normalizeDiagnosis).filter(Boolean);
  const detected = detectConditions(diagnoses);
  const lowCount = serializeMetric({
    metricId: 'synthetic-low-count',
    type: 'ratio',
    sampleNumerator: 29,
    sampleDenominator: 100,
    node: { estimate: 0.29, standardError: 0.02, degreesOfFreedom: 99 },
  });
  const reliable = serializeMetric({
    metricId: 'synthetic-reliable',
    type: 'ratio',
    sampleNumerator: 30,
    sampleDenominator: 100,
    node: { estimate: 0.3, standardError: 0.03, degreesOfFreedom: 99 },
  });
  const checks = {
    ageBoundaries: classifyAgeBand(0) === 'under_2'
      && classifyAgeBand(1) === 'under_2'
      && classifyAgeBand(2) === '2_4'
      && classifyAgeBand(5) === '5_11'
      && classifyAgeBand(12) === '12_17'
      && classifyAgeBand(18) === null
      && validAge('') === null,
    diagnosisNormalization: normalizeDiagnosis('U07.1') === 'U071' && normalizeDiagnosis('-9') === '',
    namedConditionsDetected: detected.pneumonia
      && detected.bronchiolitis
      && detected.influenza_covid
      && detected.pertussis,
    unrelatedConditionsRemainFalse: !detected.ivas && !detected.asthma && !detected.croup && !detected.pharyngitis,
    smallCellSuppressed: lowCount.displayStatus === 'suppressed' && lowCount.sampleNumerator === null,
    thresholdCellPublished: reliable.displayStatus === 'published-exploratory',
    probabilitiesNotEstimated: true,
    prescriptionRecommendationBlocked: true,
    clinicalActivationBlocked: true,
  };
  if (!Object.values(checks).every(Boolean)) {
    throw new Error(`namcs-hc-2024-self-test-failed:${JSON.stringify(checks)}`);
  }
  console.log(JSON.stringify({
    schemaVersion: 'darwin.sounio.public-namcs-hc-2024-adapter-self-test.v1',
    status: 'adapter-and-disclosure-contract-valid',
    minimumDisplaySample: MINIMUM_DISPLAY_SAMPLE,
    checks,
    probabilitiesEstimated: false,
    apsCalibrationAuthorized: false,
    prescriptionRecommendationAuthorized: false,
    clinicalActivationAuthorized: false,
  }, null, 2));
  console.log('PUBLIC_NAMCS_HC_2024_ADAPTER_SELF_TEST_VALID');
}

async function analyze() {
  await rm(outputPath, { force: true });
  const tempDirectory = await mkdtemp(join(tmpdir(), 'darwin-namcs-hc-2024-'));
  const sourcePath = join(tempDirectory, 'namcshc2024_R.rds');
  const rawPath = join(tempDirectory, 'namcs-hc-2024-selected-raw.tsv');
  const oracleOutputPath = join(tempDirectory, 'namcs-hc-2024-oracle.tsv');
  try {
    const [sourceReceipt, runtime] = await Promise.all([
      fetchFile(rdsProbe.url, sourcePath),
      loadPinnedRuntime(),
    ]);
    if (sourceReceipt.bytesRead !== EXPECTED_SOURCE_BYTES
      || sourceReceipt.sha256 !== EXPECTED_SOURCE_SHA256
      || (sourceReceipt.contentLength !== null && sourceReceipt.bytesRead !== sourceReceipt.contentLength)) {
      throw new Error(`namcs-hc-2024-source-identity-mismatch:${JSON.stringify(sourceReceipt)}`);
    }

    const oracleRun = spawnSync(
      runtime.receipt.runtime.rscriptPath,
      [oracleScriptPath, sourcePath, rawPath, oracleOutputPath, runtime.receipt.libraryPath],
      { cwd: root, encoding: 'utf8', timeout: 10 * 60 * 1000 },
    );
    if (oracleRun.status !== 0 || !oracleRun.stdout.includes('NAMCS_HC_2024_R_SURVEY_ORACLE_VALID')) {
      throw new Error(`namcs-hc-2024-oracle-failed:${oracleRun.stderr || oracleRun.stdout || oracleRun.status}`);
    }

    const oracleRows = (await readFile(oracleOutputPath, 'utf8')).trim().split(/\r?\n/);
    const oracleHeaders = oracleRows.shift().split('\t');
    const oracleByMetric = new Map(oracleRows.map(line => {
      const row = parseTsvLine(line, oracleHeaders);
      return [row.metric_id, row];
    }));

    const psuMap = new Map();
    const sampleCounts = Object.fromEntries(surveyVariables.map(variable => [variable, 0]));
    const strata = new Map();
    const centers = new Set();
    const centersWithDiagnosis = new Set();
    let sourceRows = 0;
    let sourceWeightedVisits = 0;
    let pediatricVisits = 0;
    let pediatricWeightedVisits = 0;
    let nonPediatricVisits = 0;
    let ageUnknownOrInvalid = 0;
    let headers = null;
    const requiredHeaders = new Set(['age', 'stratum', 'cluster', 'weight', ...DIAGNOSIS_COLUMNS]);
    const input = createInterface({ input: createReadStream(rawPath), crlfDelay: Infinity });
    for await (const line of input) {
      if (headers === null) {
        headers = line.split('\t');
        const missing = [...requiredHeaders].filter(header => !headers.includes(header));
        if (missing.length > 0) throw new Error(`namcs-hc-2024-raw-columns-missing:${missing.join(',')}`);
        continue;
      }
      if (!line) continue;
      const row = parseTsvLine(line, headers);
      sourceRows += 1;
      const weight = Number(row.weight);
      const stratum = String(row.stratum);
      const cluster = String(row.cluster);
      if (!Number.isFinite(weight) || weight <= 0 || !stratum || !cluster) {
        throw new Error(`namcs-hc-2024-design-row-invalid:${sourceRows}`);
      }
      sourceWeightedVisits += weight;
      centers.add(cluster);
      const stratumCenters = strata.get(stratum) ?? new Set();
      stratumCenters.add(cluster);
      strata.set(stratum, stratumCenters);

      const key = `${stratum}\0${cluster}`;
      const psu = psuMap.get(key) ?? { stratum, cluster, weight: 1, values: emptySurveyValues() };
      const activeVariables = ['all_visits'];
      const diagnoses = DIAGNOSIS_COLUMNS.map(column => normalizeDiagnosis(row[column])).filter(Boolean);
      if (diagnoses.length > 0) centersWithDiagnosis.add(cluster);
      const age = validAge(row.age);
      if (age === null) {
        ageUnknownOrInvalid += 1;
      } else if (age < 18) {
        pediatricVisits += 1;
        pediatricWeightedVisits += weight;
        activeVariables.push('pediatric');
        const ageBand = classifyAgeBand(age);
        activeVariables.push(`age_${ageBand}`);
        const conditions = detectConditions(diagnoses);
        for (const [condition, present] of Object.entries(conditions)) {
          if (!present) continue;
          activeVariables.push(`condition_${condition}`, `condition_${condition}_${ageBand}`);
        }
      } else {
        nonPediatricVisits += 1;
      }
      for (const variable of activeVariables) {
        psu.values[variable] += weight;
        sampleCounts[variable] += 1;
      }
      psuMap.set(key, psu);
    }

    const psuRecords = [...psuMap.values()];
    const comparisons = metricSpec.map(metric => {
      const node = metric.type === 'total'
        ? estimateSurveyTotal(psuRecords, metric.numerator)
        : estimateSurveyRatio(psuRecords, metric.numerator, metric.denominator);
      const oracle = oracleByMetric.get(metric.metricId);
      if (!oracle || oracle.type !== metric.type
        || oracle.numerator !== metric.numerator
        || (oracle.denominator || null) !== metric.denominator) {
        throw new Error(`namcs-hc-2024-oracle-metric-mismatch:${metric.metricId}`);
      }
      const rEstimate = Number(oracle.estimate);
      const rStandardError = Number(oracle.standard_error);
      const rDegreesOfFreedom = Number(oracle.degrees_freedom);
      const rSampleNumerator = Number(oracle.sample_numerator);
      const rSampleDenominator = oracle.sample_denominator ? Number(oracle.sample_denominator) : null;
      const sampleNumerator = sampleCounts[metric.numerator];
      const sampleDenominator = metric.denominator ? sampleCounts[metric.denominator] : null;
      return {
        ...metric,
        sampleNumerator,
        sampleDenominator,
        node,
        rSurvey: {
          estimate: rEstimate,
          standardError: rStandardError,
          degreesOfFreedom: rDegreesOfFreedom,
          sampleNumerator: rSampleNumerator,
          sampleDenominator: rSampleDenominator,
        },
        estimateRelativeError: relativeError(node.estimate, rEstimate),
        standardErrorRelativeError: relativeError(node.standardError, rStandardError),
        degreesOfFreedomMatch: node.degreesOfFreedom === rDegreesOfFreedom,
        sampleCountsMatch: sampleNumerator === rSampleNumerator && sampleDenominator === rSampleDenominator,
      };
    });

    const allVisitsMetric = comparisons.find(metric => metric.metricId === 'all_visits_total');
    const pediatricMetric = comparisons.find(metric => metric.metricId === 'pediatric_total');
    const maxEstimateRelativeError = Math.max(...comparisons.map(metric => metric.estimateRelativeError));
    const maxStandardErrorRelativeError = Math.max(...comparisons.map(metric => metric.standardErrorRelativeError));
    const strataWithSingleCenter = [...strata.values()].filter(stratumCenters => stratumCenters.size < 2).length;
    const invariants = {
      sourceRowsMatchDocumentation: sourceRows === EXPECTED_SAMPLE_VISITS,
      sourceWeightedVisitsMatchDocumentation: close(sourceWeightedVisits, EXPECTED_WEIGHTED_VISITS, 0.01),
      pediatricRowsMatchDocumentation: pediatricVisits === EXPECTED_PEDIATRIC_VISITS,
      pediatricWeightedVisitsMatchDocumentation: close(
        pediatricWeightedVisits,
        EXPECTED_PEDIATRIC_WEIGHTED_VISITS,
        0.01,
      ),
      pediatricNodeTotalMatchesAggregate: close(
        pediatricMetric.node.estimate,
        pediatricWeightedVisits,
        0.01,
      ),
      sourceIdentityMatchesFrozenArtifact: sourceReceipt.bytesRead === EXPECTED_SOURCE_BYTES
        && sourceReceipt.sha256 === EXPECTED_SOURCE_SHA256,
      designMatchesDocumentation: centers.size === EXPECTED_CENTERS
        && strata.size === EXPECTED_STRATA
        && psuRecords.length === EXPECTED_CENTERS
        && strataWithSingleCenter === 0,
      allCentersProvideDiagnosisData: centersWithDiagnosis.size === EXPECTED_CENTERS,
      domainAnalysisRetainsAllRows: sampleCounts.all_visits === sourceRows,
      agePartitionComplete: pediatricVisits + nonPediatricVisits + ageUnknownOrInvalid === sourceRows,
      nodeOracleMetricSetComplete: comparisons.length === metricSpec.length
        && oracleByMetric.size === metricSpec.length,
      nodeOraclePointParity: maxEstimateRelativeError <= PARITY_RELATIVE_TOLERANCE,
      nodeOracleStandardErrorParity: maxStandardErrorRelativeError <= PARITY_RELATIVE_TOLERANCE,
      nodeOracleDegreesOfFreedomParity: comparisons.every(metric => metric.degreesOfFreedomMatch)
        && allVisitsMetric.node.degreesOfFreedom === EXPECTED_DEGREES_OF_FREEDOM,
      nodeOracleMappingCountParity: comparisons.every(metric => metric.sampleCountsMatch),
      officialTotalStandardErrorReconciled: Math.abs(allVisitsMetric.node.standardError - 19593238) < 1,
      noPatientRowsPersisted: true,
      noProbabilitiesEstimated: true,
      prescriptionRecommendationBlocked: true,
    };
    if (!Object.values(invariants).every(Boolean)) {
      throw new Error(`namcs-hc-2024-invariant-failed:${JSON.stringify(invariants)}`);
    }

    const serializedMetrics = comparisons.map(serializeMetric);
    await Promise.all([
      rm(rawPath, { force: true }),
      rm(oracleOutputPath, { force: true }),
    ]);
    const report = {
      schemaVersion: 'darwin.sounio.public-namcs-hc-2024-transportability-receipt.v1',
      status: 'complete-public-diagnosis-transportability-audit',
      generatedAt: new Date().toISOString(),
      sourceId: source.sourceId,
      sourceSnapshot: source.access.snapshot,
      sourceRds: sourceReceipt,
      registrySha256: sha256(registryBytes),
      analysisScriptSha256: sha256(scriptBytes),
      oracleScriptSha256: sha256(await readFile(oracleScriptPath)),
      linearizationScriptSha256: sha256(await readFile(linearizationScriptPath)),
      oracleRuntimeReceiptSha256: sha256(runtime.bytes),
      patientRowsPersisted: false,
      recordIdentifiersPersisted: false,
      temporaryDerivedRowsDeleted: true,
      credentialsUsed: false,
      probabilitiesEstimated: false,
      treatmentEffectsEstimated: false,
      apsCalibrationAuthorized: false,
      prescriptionRecommendationAuthorized: false,
      clinicalActivationAuthorized: false,
      firewallDisposition: 'REFUSE',
      methods: {
        sourceParser: 'R base readRDS exports only temporary AGE, design markers, weight and DX1-DX30 values',
        nodeExecutor: 'Independent ICD-10-CM mapping and Taylor linearization over PSU summaries',
        oracle: 'R survey 4.5 independently maps ICD-10-CM and uses svydesign(ids=HCID_S, strata=STRATUM_S, weights=VISWT, nest=TRUE)',
        subpopulation: 'All source rows retained; pediatric and age-band domains are indicator variables',
        confidenceInterval: 'Exploratory normal/Wald 95 percent; ratios truncated to [0,1]',
      },
      oracle: {
        rVersion: comparisons[0].rSurvey ? oracleByMetric.get(comparisons[0].metricId).r_version : null,
        surveyVersion: '4.5',
        surveySourceSha256: runtime.receipt.source.sha256,
        surveyTreeSha256: runtime.surveyPackage.treeSha256,
        rscriptSha256: runtime.receipt.runtime.rscriptSha256,
      },
      design: {
        visitWeight: 'VISWT',
        stratum: 'STRATUM_S',
        cluster: 'HCID_S',
        sampledStrata: strata.size,
        sampledCenters: centers.size,
        degreesOfFreedom: allVisitsMetric.node.degreesOfFreedom,
        strataWithSingleCenter,
        taylorLinearization: true,
      },
      reliabilityPolicy: {
        minimumDisplaySample: MINIMUM_DISPLAY_SAMPLE,
        maximumExploratoryRelativeStandardError: MAXIMUM_DISPLAY_RSE,
        weightedCountsRoundedToNearestThousand: true,
        formalNchsPublicationCertification: false,
        suppressedMetricsContainNoCountsOrEstimates: serializedMetrics
          .filter(metric => metric.displayStatus === 'suppressed')
          .every(metric => metric.sampleNumerator === null && metric.estimate === null),
      },
      parity: {
        metricsCompared: comparisons.length,
        maximumRelativeTolerance: PARITY_RELATIVE_TOLERANCE,
        maxEstimateRelativeError,
        maxStandardErrorRelativeError,
        allDegreesOfFreedomMatch: comparisons.every(metric => metric.degreesOfFreedomMatch),
        allSampleCountsMatch: comparisons.every(metric => metric.sampleCountsMatch),
        valid: true,
      },
      invariants,
      aggregate: {
        sourceRows,
        sourceWeightedVisitEstimate: round(sourceWeightedVisits, 3),
        pediatricVisits,
        pediatricWeightedVisitEstimate: round(pediatricWeightedVisits, 3),
        ageUnknownOrInvalid,
        publishedMetricCount: serializedMetrics.filter(metric => metric.displayStatus !== 'suppressed').length,
        suppressedMetricCount: serializedMetrics.filter(metric => metric.displayStatus === 'suppressed').length,
        metrics: serializedMetrics,
      },
      notes: [
        'The public file contains a five-percent sample of visits from 107 responding US health centers; it is not Brazilian APS or SUS.',
        'DX1-DX30 are overlapping encounter diagnosis-code proxies, not independent double-adjudicated labels and not mutually exclusive classes.',
        'The public file exposes none of the frozen clinical symptom observations, so it cannot estimate diagnostic probabilities or EIG.',
        'Diagnosis data are available from all 107 centers; no center exclusion or weight normalization is required for this diagnosis-only audit.',
      ],
    };

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify(report, null, 2));
    console.log('PUBLIC_NAMCS_HC_2024_TRANSPORTABILITY_AUDIT_COMPLETE');
  } finally {
    await rm(tempDirectory, { recursive: true, force: true });
  }
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  await analyze();
}
