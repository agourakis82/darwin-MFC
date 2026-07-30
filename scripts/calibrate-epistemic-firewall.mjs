import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCompilerSourceReceipt } from './lib/sounio-compiler-receipt.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sounioRoot = process.env.SOUNIO_ROOT || '/Users/demetriosagourakis/dev/sounio';
const compiler = resolve(
  process.env.SOUNIO_COMPILER_PATH
    || join(sounioRoot, 'artifacts/self-hosted/souc-self-hosted-x86_64'),
);
const compilerSourceReceiptPath = process.env.SOUNIO_COMPILER_RECEIPT_PATH
  ? resolve(process.env.SOUNIO_COMPILER_RECEIPT_PATH)
  : null;
const sourceDir = join(root, 'clinical/sounio');
const firewallDir = join(root, 'clinical/epistemic-firewall');
const buildDir = join(root, '.clinical-kernel-build/calibration');
const evidencePath = join(sourceDir, 'evidence-bundle.json');
const kernelPath = join(sourceDir, 'clinical-kernel.sio');
const calibrationTemplatePath = join(firewallDir, 'conformal-calibration.sio');
const cohortSchemaPath = join(firewallDir, 'schemas/retrospective-cohort.schema.json');
const comparatorSchemaPath = join(firewallDir, 'schemas/current-aps-comparator.schema.json');
const calibrationReportSchemaPath = join(firewallDir, 'schemas/calibration-report.schema.json');
const analysisPlanPath = join(root, 'docs/research/epistemic-firewall/statistical-analysis-plan-v1.md');
const cohortProtocolPath = join(root, 'docs/research/epistemic-firewall/cohort-calibration-protocol.md');
const intendedUsePath = join(root, 'docs/research/epistemic-firewall/intended-use-v1.md');
const dataDictionaryPath = join(firewallDir, 'multicenter/data-dictionary.v1.json');
const siteMappingTemplatePath = join(firewallDir, 'multicenter/site-mapping.template.json');
const multicenterValidatorPath = join(root, 'scripts/validate-multicenter-package.mjs');
const sampleSizeMethodPath = join(root, 'docs/research/epistemic-firewall/sample-size-method-note.md');
const comparatorAdapterPath = join(root, 'scripts/score-current-aps-comparator.ts');
const comparatorConfigPath = join(firewallDir, 'current-aps-comparator.json');
const tsxPackagePath = join(root, 'node_modules/tsx/package.json');
const currentHeuristicPath = join(root, 'lib/utils/differential-diagnosis.ts');
const symptomDataPath = join(root, 'lib/data/sintomas.ts');
const diseaseDataDir = join(root, 'lib/data/doencas');
const scriptPath = fileURLToPath(import.meta.url);

const args = process.argv.slice(2);
const cohortArgumentIndex = args.indexOf('--cohort');
const useFixture = args.includes('--fixture');
const validateOnly = args.includes('--validate-only');
const promote = args.includes('--promote');
const cohortPath = cohortArgumentIndex >= 0 && args[cohortArgumentIndex + 1]
  ? resolve(root, args[cohortArgumentIndex + 1])
  : null;
const siteMappingPaths = args.flatMap((value, index) => (
  value === '--site-mapping' && args[index + 1] ? [resolve(root, args[index + 1])] : []
));

if (useFixture === (cohortArgumentIndex >= 0)) {
  throw new Error('Choose exactly one input: --fixture or --cohort <path>.');
}
if (cohortArgumentIndex >= 0 && !args[cohortArgumentIndex + 1]) {
  throw new Error('--cohort requires a JSON file path.');
}

const sha256 = value => createHash('sha256').update(value).digest('hex');
const hashId = value => sha256(Buffer.from(value));
const isSha256 = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const formatNumber = value => {
  if (!Number.isFinite(value)) throw new Error(`Non-finite Sounio value: ${value}`);
  return Number(value).toPrecision(17).replace(/e\+/, 'e');
};
const stableStringify = value => {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    const entries = Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`);
    return `{${entries.join(',')}}`;
  }
  return JSON.stringify(value);
};
const collectFiles = directory => readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  })
  .filter(path => path.endsWith('.ts'));
const hashFileSet = paths => {
  const hash = createHash('sha256');
  for (const path of [...paths].sort()) {
    hash.update(path.slice(root.length));
    hash.update('\0');
    hash.update(readFileSync(path));
    hash.update('\0');
  }
  return hash.digest('hex');
};

const evidenceBytes = readFileSync(evidencePath);
const evidence = JSON.parse(evidenceBytes.toString('utf8'));
const comparatorConfigBytes = readFileSync(comparatorConfigPath);
const comparatorConfig = JSON.parse(comparatorConfigBytes.toString('utf8'));
const tsxPackageBytes = readFileSync(tsxPackagePath);
const tsxPackage = JSON.parse(tsxPackageBytes.toString('utf8'));
const conditionIndex = new Map(evidence.conditions.map((condition, index) => [condition.id, index]));
if (
  comparatorConfig.schemaVersion !== 'darwin.sounio.current-aps-comparator.v1'
  || comparatorConfig.scoreScale !== 'current-product-heuristic-0-to-100'
  || comparatorConfig.probabilityNormalization !== 'sounio-add-one-and-normalize-v1'
  || evidence.conditions.some(condition => !Array.isArray(comparatorConfig.conditionAliases?.[condition.id]))
) {
  throw new Error('Current APS comparator configuration is incompatible with the evidence bundle.');
}

const fixtureFeatureTemplates = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, -1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 1, -1, 1, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, -1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
];
const fixtureAgeDays = [1460, 2920, 365, 2920, 1095, 365, 2920, 2920, 1460];

function createSyntheticFixture() {
  const records = [];
  const start = Date.UTC(2024, 0, 1);
  for (let index = 0; index < 45; index += 1) {
    const label = index % evidence.conditions.length;
    const date = new Date(start + index * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    records.push({
      patientHash: hashId(`synthetic-patient-${index}`),
      encounterHash: hashId(`synthetic-encounter-${index}`),
      siteHash: hashId(`synthetic-site-${index % 3}`),
      encounterDate: date,
      ageDays: fixtureAgeDays[label],
      features: fixtureFeatureTemplates[label],
      adjudicatedConditionId: evidence.conditions[label].id,
      severityOutcome: label === 1 || label === 4,
      adjudicationMethod: 'synthetic-rule',
    });
  }
  return {
    schemaVersion: 'darwin.sounio.retrospective-cohort.v1',
    datasetId: 'synthetic-respiratory-pediatric-fixture-v1',
    createdAt: '2024-02-15T00:00:00.000Z',
    provenance: {
      kind: 'synthetic-fixture',
      sourceSystem: 'deterministic-in-memory-fixture-v1',
      dataUseApprovalId: null,
      deidentificationAttested: true,
      adjudicationProtocol: 'synthetic-rule-v1',
    },
    records,
  };
}

const cohort = useFixture
  ? createSyntheticFixture()
  : JSON.parse(readFileSync(cohortPath, 'utf8'));

const exactKeys = (value, allowed, context) => {
  const unexpected = Object.keys(value).filter(key => !allowed.includes(key));
  if (unexpected.length > 0) throw new Error(`${context} contains forbidden or unknown keys: ${unexpected.join(', ')}`);
};
const validDate = value => typeof value === 'string'
  && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
const validDateTime = value => typeof value === 'string' && Number.isFinite(Date.parse(value));

function validateCohort(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Cohort must be an object.');
  exactKeys(value, ['schemaVersion', 'datasetId', 'createdAt', 'provenance', 'records'], 'Cohort');
  if (value.schemaVersion !== 'darwin.sounio.retrospective-cohort.v1') throw new Error('Unsupported cohort schemaVersion.');
  if (typeof value.datasetId !== 'string' || value.datasetId.length < 1 || value.datasetId.length > 128) throw new Error('Invalid datasetId.');
  if (!validDateTime(value.createdAt)) throw new Error('createdAt must be an ISO date-time.');
  if (!value.provenance || typeof value.provenance !== 'object') throw new Error('Missing cohort provenance.');
  exactKeys(
    value.provenance,
    ['kind', 'sourceSystem', 'dataUseApprovalId', 'deidentificationAttested', 'adjudicationProtocol'],
    'Cohort provenance',
  );
  if (!['synthetic-fixture', 'retrospective-clinical'].includes(value.provenance.kind)) throw new Error('Invalid provenance kind.');
  if (typeof value.provenance.sourceSystem !== 'string' || !value.provenance.sourceSystem) throw new Error('Missing sourceSystem.');
  if (typeof value.provenance.adjudicationProtocol !== 'string' || !value.provenance.adjudicationProtocol) throw new Error('Missing adjudicationProtocol.');
  if (value.provenance.deidentificationAttested !== true) throw new Error('Deidentification attestation is required.');
  if (value.provenance.kind === 'retrospective-clinical') {
    if (typeof value.provenance.dataUseApprovalId !== 'string' || !value.provenance.dataUseApprovalId) {
      throw new Error('A retrospective clinical cohort requires dataUseApprovalId.');
    }
  } else if (value.provenance.dataUseApprovalId !== null) {
    throw new Error('Synthetic fixtures must not claim a data-use approval.');
  }
  if (!Array.isArray(value.records) || value.records.length === 0) throw new Error('Cohort records are required.');

  const encounters = new Set();
  const patients = new Set();
  for (const [index, record] of value.records.entries()) {
    if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error(`Record ${index} must be an object.`);
    exactKeys(
      record,
      ['patientHash', 'encounterHash', 'siteHash', 'encounterDate', 'ageDays', 'features', 'adjudicatedConditionId', 'severityOutcome', 'adjudicationMethod'],
      `Record ${index}`,
    );
    for (const key of ['patientHash', 'encounterHash', 'siteHash']) {
      if (!isSha256(record[key])) throw new Error(`Record ${index} has invalid ${key}.`);
    }
    if (patients.has(record.patientHash)) {
      throw new Error('Cohort v1 requires exactly one index encounter per patient; repeated episodes need cluster-aware analysis.');
    }
    patients.add(record.patientHash);
    if (encounters.has(record.encounterHash)) throw new Error(`Duplicate encounterHash at record ${index}.`);
    encounters.add(record.encounterHash);
    if (!validDate(record.encounterDate)) throw new Error(`Record ${index} has invalid encounterDate.`);
    if (!Number.isInteger(record.ageDays) || record.ageDays < 0 || record.ageDays > 6574) throw new Error(`Record ${index} has invalid ageDays.`);
    if (!Array.isArray(record.features) || record.features.length !== 12 || record.features.some(code => ![-1, 0, 1].includes(code))) {
      throw new Error(`Record ${index} must have exactly 12 trivalent features.`);
    }
    if (!conditionIndex.has(record.adjudicatedConditionId)) throw new Error(`Record ${index} has an unknown adjudicated condition.`);
    if (typeof record.severityOutcome !== 'boolean') throw new Error(`Record ${index} has invalid severityOutcome.`);
    if (!['chart-review-double', 'chart-review-single', 'synthetic-rule'].includes(record.adjudicationMethod)) {
      throw new Error(`Record ${index} has invalid adjudicationMethod.`);
    }
    if (value.provenance.kind === 'synthetic-fixture' && record.adjudicationMethod !== 'synthetic-rule') {
      throw new Error('Synthetic fixtures may only use synthetic-rule adjudication.');
    }
    if (value.provenance.kind === 'retrospective-clinical' && record.adjudicationMethod === 'synthetic-rule') {
      throw new Error('Clinical cohorts may not contain synthetic adjudication.');
    }
  }
}

validateCohort(cohort);

const multicenterValidationArgs = [multicenterValidatorPath];
if (cohort.provenance.kind === 'retrospective-clinical') {
  for (const path of siteMappingPaths) multicenterValidationArgs.push('--mapping', path);
  multicenterValidationArgs.push('--require-locked', '--cohort', cohortPath, '--require-cohort-binding');
}
const multicenterValidationBytes = execFileSync(process.execPath, multicenterValidationArgs, {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
  maxBuffer: 16 * 1024 * 1024,
});

function temporalPatientSplit(records) {
  const patients = new Map();
  for (const record of records) {
    const patient = patients.get(record.patientHash) || { patientHash: record.patientHash, indexDate: record.encounterDate, records: [] };
    patient.records.push(record);
    if (record.encounterDate < patient.indexDate) patient.indexDate = record.encounterDate;
    patients.set(record.patientHash, patient);
  }
  const ordered = [...patients.values()].sort((left, right) => (
    left.indexDate.localeCompare(right.indexDate) || left.patientHash.localeCompare(right.patientHash)
  ));
  if (ordered.length < 5) throw new Error('At least five unique patients are required for a 60/20/20 split.');
  const developmentCount = Math.floor(ordered.length * 0.6);
  const calibrationCount = Math.floor(ordered.length * 0.2);
  const assignment = new Map();
  ordered.forEach((patient, index) => {
    const split = index < developmentCount
      ? 'development'
      : index < developmentCount + calibrationCount ? 'calibration' : 'evaluation';
    assignment.set(patient.patientHash, split);
  });
  const partitions = { development: [], calibration: [], evaluation: [] };
  for (const record of records) partitions[assignment.get(record.patientHash)].push(record);
  for (const split of Object.values(partitions)) {
    split.sort((left, right) => left.encounterDate.localeCompare(right.encounterDate) || left.encounterHash.localeCompare(right.encounterHash));
  }
  return { partitions, orderedPatients: ordered, developmentCount, calibrationCount };
}

const split = temporalPatientSplit(cohort.records);
const { development, calibration, evaluation } = split.partitions;
const splitPatientSets = Object.fromEntries(Object.entries(split.partitions).map(([name, records]) => [name, new Set(records.map(record => record.patientHash))]));
const overlap = [...splitPatientSets.development].filter(id => splitPatientSets.calibration.has(id) || splitPatientSets.evaluation.has(id))
  .concat([...splitPatientSets.calibration].filter(id => splitPatientSets.evaluation.has(id)));
if (overlap.length > 0) throw new Error('Patient leakage detected between temporal splits.');

const uniqueSites = new Set(cohort.records.map(record => record.siteHash));
const calibrationLabels = new Set(calibration.map(record => record.adjudicatedConditionId));
const evaluationLabels = new Set(evaluation.map(record => record.adjudicatedConditionId));
const governanceGates = {
  sitesAtLeast2: uniqueSites.size >= 2,
  allConditionsInCalibration: evidence.conditions.every(condition => calibrationLabels.has(condition.id)),
  allConditionsInEvaluation: evidence.conditions.every(condition => evaluationLabels.has(condition.id)),
  doubleReviewOnly: cohort.provenance.kind === 'retrospective-clinical'
    && cohort.records.every(record => record.adjudicationMethod === 'chart-review-double'),
};
const governanceGatesPassed = Object.values(governanceGates).every(Boolean);

if (promote && cohort.provenance.kind !== 'retrospective-clinical') {
  throw new Error('PROMOTION_REFUSED: synthetic fixtures can never produce or promote a clinical calibration certificate.');
}

const validationSummary = {
  schemaVersion: cohort.schemaVersion,
  datasetId: cohort.datasetId,
  provenanceKind: cohort.provenance.kind,
  records: cohort.records.length,
  uniquePatients: split.orderedPatients.length,
  uniqueSites: uniqueSites.size,
  splits: {
    development: { records: development.length, patients: splitPatientSets.development.size },
    calibration: { records: calibration.length, patients: splitPatientSets.calibration.size },
    evaluation: { records: evaluation.length, patients: splitPatientSets.evaluation.size },
  },
  patientLeakage: overlap.length,
  governanceGates,
};

if (validateOnly) {
  console.log(JSON.stringify(validationSummary, null, 2));
  console.log('COHORT_VALIDATION_OK');
  process.exit(0);
}

mkdirSync(buildDir, { recursive: true });

const compilerBytes = readFileSync(compiler);
const compilerSha256 = sha256(compilerBytes);
const compilerSourceReceipt = compilerSourceReceiptPath
  ? loadCompilerSourceReceipt(compilerSourceReceiptPath, {
    expectedCompilerSha256: compilerSha256,
    requireReconciled: true,
  })
  : null;

const comparatorInput = {
  schemaVersion: 'darwin.sounio.comparator-input.v1',
  features: evidence.features.map(feature => ({ id: feature.id })),
  conditions: evidence.conditions.map(condition => ({ id: condition.id })),
  records: evaluation.map(record => ({ ageDays: record.ageDays, features: record.features })),
};
const comparatorOutputBytes = execFileSync(
  'pnpm',
  ['exec', 'tsx', comparatorAdapterPath],
  {
    cwd: root,
    input: JSON.stringify(comparatorInput),
    stdio: ['pipe', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  },
);
const comparator = JSON.parse(comparatorOutputBytes.toString('utf8'));
if (
  comparator.schemaVersion !== 'darwin.sounio.comparator-scores.v1'
  || comparator.comparatorVersion !== comparatorConfig.comparatorVersion
  || comparator.probabilityNormalization !== comparatorConfig.probabilityNormalization
  || !Array.isArray(comparator.records)
  || comparator.records.length !== evaluation.length
) {
  throw new Error('Current APS comparator output is incompatible with the calibration pipeline.');
}
const comparatorScores = comparator.records.map((record, index) => {
  if (
    record.index !== index
    || !Array.isArray(record.rawScores)
    || record.rawScores.length !== evidence.conditions.length
    || record.rawScores.some(value => !Number.isFinite(value) || value < 0 || value > 100)
  ) {
    throw new Error(`Invalid current APS comparator scores at evaluation record ${index}.`);
  }
  return record.rawScores;
});

const modelValues = [];
for (const condition of evidence.conditions) {
  modelValues.push(
    condition.prior,
    condition.uncertainty.lowerFactor,
    condition.uncertainty.upperFactor,
    condition.uncertainty.confidence,
  );
  for (const feature of evidence.features) {
    const likelihood = condition.likelihoods[feature.id] || [1, 1];
    modelValues.push(likelihood[0], likelihood[1]);
  }
}

let generated = `${readFileSync(kernelPath, 'utf8')}\n\n`;
generated += readFileSync(calibrationTemplatePath, 'utf8')
  .replaceAll('__DEVELOPMENT_COUNT__', String(development.length))
  .replaceAll('__CALIBRATION_COUNT__', String(calibration.length))
  .replaceAll('__EVALUATION_COUNT__', String(evaluation.length));
generated += '\n\nfn load_model() with Mut, Panic {\n';
modelValues.forEach((value, index) => {
  generated += `    ORACLE_MODEL[${index} as usize] = ${formatNumber(value)}\n`;
});
generated += '}\n\n';

const appendInputLoader = (record, name, rawComparatorScores) => {
  generated += `fn ${name}() with Mut, Panic {\n`;
  record.features.forEach((value, index) => {
    generated += `    ORACLE_INPUT[${index} as usize] = ${value}\n`;
  });
  if (rawComparatorScores) {
    rawComparatorScores.forEach((value, index) => {
      generated += `    COMPARATOR_RAW_SCORES[${index} as usize] = ${formatNumber(value)}\n`;
    });
  }
  generated += '}\n\n';
};
calibration.forEach((record, index) => appendInputLoader(record, `load_calibration_${index}`));
evaluation.forEach((record, index) => appendInputLoader(record, `load_evaluation_${index}`, comparatorScores[index]));

generated += 'fn main() -> i64 with IO, Mut, Div, Observe, Panic {\n    load_model()\n';
development.forEach(record => {
  generated += `    development_observation(${conditionIndex.get(record.adjudicatedConditionId)})\n`;
});
calibration.forEach((record, index) => {
  generated += `    load_calibration_${index}()\n`;
  generated += `    calibration_observation(${index}, ${conditionIndex.get(record.adjudicatedConditionId)})\n`;
});
generated += '    compute_thresholds()\n';
evaluation.forEach((record, index) => {
  generated += `    load_evaluation_${index}()\n`;
  generated += `    evaluation_observation(${conditionIndex.get(record.adjudicatedConditionId)}, ${record.ageDays}, ${record.severityOutcome ? 1 : 0})\n`;
});
generated += '    print_calibration_report()\n    0\n}\n';

const generatedSourcePath = join(buildDir, 'conformal-calibration.generated.sio');
const oraclePath = join(buildDir, 'conformal-calibration.elf');
const reportSlug = cohort.datasetId.replace(/[^a-zA-Z0-9._-]/g, '-');
const reportPath = join(buildDir, `${reportSlug}.calibration-report.json`);
writeFileSync(generatedSourcePath, generated);

const shellQuote = value => `'${String(value).replaceAll("'", "'\\''")}'`;
const runLinux = command => execFileSync(
  'limactl',
  ['shell', 'souc-linux', '/bin/bash', '-lc', command],
  { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 32 * 1024 * 1024 },
);
execFileSync('limactl', ['start', 'souc-linux'], { stdio: 'ignore' });
const guestSource = '/tmp/darwin-conformal-calibration.sio';
const guestOracle = '/tmp/darwin-conformal-calibration.elf';
execFileSync('limactl', ['copy', '--backend=scp', generatedSourcePath, `souc-linux:${guestSource}`], { cwd: root, stdio: 'pipe' });
runLinux(
  `export SOUNIO_STDLIB_PATH=${shellQuote(join(sounioRoot, 'stdlib'))}; `
  + `${shellQuote(compiler)} ${shellQuote(guestSource)} ${shellQuote(guestOracle)} && chmod +x ${shellQuote(guestOracle)}`,
);
execFileSync('limactl', ['copy', '--backend=scp', `souc-linux:${guestOracle}`, oraclePath], { cwd: root, stdio: 'pipe' });
const oracleOutput = runLinux(shellQuote(guestOracle));
if (!oracleOutput.includes('SOUNIO_CONFORMAL_CALIBRATION_OK')) {
  throw new Error(`Sounio conformal calibration oracle did not complete:\n${oracleOutput}`);
}

const thresholds = new Array(evidence.conditions.length);
const classCoverage = new Array(evidence.conditions.length);
const subgroupIds = ['age-0-1', 'age-2-5', 'age-6-17'];
const subgroupCoverage = new Array(subgroupIds.length);
const metricsById = new Map();
for (const match of oracleOutput.matchAll(/T\s+(\d+)\s+([-+\d.eE]+)/g)) {
  thresholds[Number(match[1])] = Number(match[2]);
}
for (const match of oracleOutput.matchAll(/C\s+(\d+)\s+(\d+)\s+(\d+)\s+([-+\d.eE]+)/g)) {
  classCoverage[Number(match[1])] = { hits: Number(match[2]), total: Number(match[3]), coverage: Number(match[4]) };
}
for (const match of oracleOutput.matchAll(/G\s+(\d+)\s+(\d+)\s+(\d+)\s+([-+\d.eE]+)/g)) {
  subgroupCoverage[Number(match[1])] = { hits: Number(match[2]), total: Number(match[3]), coverage: Number(match[4]) };
}
for (const match of oracleOutput.matchAll(/M\s+(\d+)\s+([-+\d.eE]+)/g)) {
  metricsById.set(Number(match[1]), Number(match[2]));
}
if (
  thresholds.some(value => !Number.isFinite(value))
  || classCoverage.some(value => !value || !Number.isFinite(value.coverage))
  || subgroupCoverage.some(value => !value || !Number.isFinite(value.coverage))
  || [...Array(13)].some((_, index) => !Number.isFinite(metricsById.get(index + 1)))
) {
  throw new Error(`Incomplete Sounio calibration output:\n${oracleOutput}`);
}

const metrics = {
  marginalCoverage: metricsById.get(1),
  meanPredictionSetSize: metricsById.get(2),
  multiclassBrierScore: metricsById.get(3),
  expectedCalibrationError5Bin: metricsById.get(4),
  pneumoniaTop3Recall: metricsById.get(5),
  redFlagSeveritySensitivity: metricsById.get(6),
  pneumoniaDecisionCurveNetBenefitAt10Percent: metricsById.get(7),
  marginalCoverageWilsonLower95: metricsById.get(8),
  currentApsComparatorBrierScore: metricsById.get(9),
  relativeBrierImprovementVsCurrentAps: metricsById.get(10),
};
const precisionPlan = {
  method: 'wilson-lower-bound-v1',
  anticipatedCoverage: 0.98,
  targetLowerConfidenceBound: 0.95,
  confidenceLevel: 0.95,
  requiredEvaluationPatientsPerClass: Math.round(metricsById.get(11)),
  requiredOverallEvaluationPatientsAtDevelopmentMix: Math.round(metricsById.get(12)),
  minimumCalibrationPatientsPerClassForNonMaximalConformalQuantile: Math.round(metricsById.get(13)),
  scope: 'coverage-precision-only',
};
const calibrationClassCounts = evidence.conditions.map(condition => (
  calibration.filter(record => record.adjudicatedConditionId === condition.id).length
));
const precisionGates = {
  evaluationPatientsMeetOverallPrecisionPlan: precisionPlan.requiredOverallEvaluationPatientsAtDevelopmentMix > 0
    && splitPatientSets.evaluation.size >= precisionPlan.requiredOverallEvaluationPatientsAtDevelopmentMix,
  everyEvaluationClassMeetsPrecisionPlan: classCoverage.every(value => (
    value.total >= precisionPlan.requiredEvaluationPatientsPerClass
  )),
  everyCalibrationClassSupportsNonMaximalQuantile: calibrationClassCounts.every(count => (
    count >= precisionPlan.minimumCalibrationPatientsPerClassForNonMaximalConformalQuantile
  )),
};
const scientificGates = {
  marginalCoverageAtLeast95: metrics.marginalCoverage >= 0.95,
  marginalWilsonLowerAtLeast95: metrics.marginalCoverageWilsonLower95 >= 0.95,
  allClassCoverageAtLeast95: classCoverage.every(value => value.coverage >= 0.95),
  allAgeGroupCoverageAtLeast95: subgroupCoverage.every(value => value.coverage >= 0.95),
  pneumoniaTop3RecallAtLeast95: metrics.pneumoniaTop3Recall >= 0.95,
  severitySensitivityAtLeast95: metrics.redFlagSeveritySensitivity >= 0.95,
  expectedCalibrationErrorAtMost05: metrics.expectedCalibrationError5Bin <= 0.05,
  brierImprovementVsCurrentApsAtLeast10: metrics.relativeBrierImprovementVsCurrentAps >= 0.1,
};
const readinessGates = { ...governanceGates, ...precisionGates };
const readinessGatesPassed = Object.values(readinessGates).every(Boolean);

const report = {
  schemaVersion: 'darwin.sounio.calibration-report.v1',
  reportId: `${cohort.datasetId}-${sha256(Buffer.from(stableStringify(split.partitions))).slice(0, 12)}`,
  status: cohort.provenance.kind === 'synthetic-fixture' ? 'fixture-only' : 'research-only',
  clinicalPromotionAuthorized: false,
  modelVersion: evidence.modelVersion,
  generatedAt: new Date().toISOString(),
  cohort: validationSummary,
  split: {
    method: '60/20/20-temporal-by-patient-index-date',
    patientLeakage: overlap.length,
    developmentDateRange: [development[0]?.encounterDate, development.at(-1)?.encounterDate],
    calibrationDateRange: [calibration[0]?.encounterDate, calibration.at(-1)?.encounterDate],
    evaluationDateRange: [evaluation[0]?.encounterDate, evaluation.at(-1)?.encounterDate],
  },
  conformal: {
    family: 'split-conformal',
    variant: 'class-conditional',
    alpha: 0.05,
    thresholds: Object.fromEntries(evidence.conditions.map((condition, index) => [condition.id, thresholds[index]])),
  },
  comparator: {
    comparatorVersion: comparator.comparatorVersion,
    scoreScale: comparator.scoreScale,
    probabilityNormalization: comparator.probabilityNormalization,
    primarySymptomPolicy: comparator.primarySymptomPolicy,
    mathematicalAuthority: 'clinical/epistemic-firewall/conformal-calibration.sio',
    runtime: { node: process.version, tsx: tsxPackage.version },
  },
  compiler: {
    sha256: compilerSha256,
    sourceReceiptSha256: compilerSourceReceipt ? sha256(compilerSourceReceipt.bytes) : null,
    reconciled: compilerSourceReceipt?.validation.compilerReconciled === true,
    sourceBranch: compilerSourceReceipt?.validation.branch ?? null,
    sourceCommit: compilerSourceReceipt?.validation.commit ?? null,
  },
  precisionPlan,
  coverage: {
    classConditional: Object.fromEntries(evidence.conditions.map((condition, index) => [condition.id, classCoverage[index]])),
    subgroupConditional: Object.fromEntries(subgroupIds.map((id, index) => [id, subgroupCoverage[index]])),
  },
  metrics,
  scientificGates,
  governanceGates,
  precisionGates,
  readinessGates,
  promotion: {
    eligibleForIndependentReview: cohort.provenance.kind === 'retrospective-clinical'
      && readinessGatesPassed
      && Object.values(scientificGates).every(Boolean),
    blockers: [
      ...(cohort.provenance.kind === 'synthetic-fixture' ? ['synthetic-fixture'] : []),
      ...(!governanceGatesPassed ? ['retrospective-cohort-governance-gates'] : []),
      ...(!Object.values(precisionGates).every(Boolean) ? ['coverage-precision-gates'] : []),
      ...(!Object.values(scientificGates).every(Boolean) ? ['scientific-gates'] : []),
      'distribution-drift-reference',
      'independent-statistical-review',
      'production-signature',
    ],
  },
  hashes: {
    cohortSha256: sha256(Buffer.from(stableStringify(cohort))),
    cohortSchemaSha256: sha256(readFileSync(cohortSchemaPath)),
    calibrationReportSchemaSha256: sha256(readFileSync(calibrationReportSchemaPath)),
    developmentCohortSha256: sha256(Buffer.from(stableStringify(development))),
    calibrationCohortSha256: sha256(Buffer.from(stableStringify(calibration))),
    evaluationCohortSha256: sha256(Buffer.from(stableStringify(evaluation))),
    evidenceSha256: sha256(evidenceBytes),
    comparatorOutputSha256: sha256(comparatorOutputBytes),
    comparatorConfigSha256: sha256(comparatorConfigBytes),
    comparatorSchemaSha256: sha256(readFileSync(comparatorSchemaPath)),
    comparatorRuntimeSha256: sha256(Buffer.concat([
      Buffer.from(process.version),
      Buffer.from('\0'),
      tsxPackageBytes,
    ])),
    comparatorAdapterSha256: sha256(readFileSync(comparatorAdapterPath)),
    comparatorDependencySetSha256: hashFileSet([
      currentHeuristicPath,
      symptomDataPath,
      ...collectFiles(diseaseDataDir),
    ]),
    analysisPlanSha256: sha256(readFileSync(analysisPlanPath)),
    cohortProtocolSha256: sha256(readFileSync(cohortProtocolPath)),
    intendedUseSha256: sha256(readFileSync(intendedUsePath)),
    dataDictionarySha256: sha256(readFileSync(dataDictionaryPath)),
    siteMappingSetSha256: sha256(Buffer.concat(
      (siteMappingPaths.length > 0 ? siteMappingPaths : [siteMappingTemplatePath])
        .sort()
        .flatMap(path => [Buffer.from(path.slice(root.length)), Buffer.from('\0'), readFileSync(path), Buffer.from('\0')]),
    )),
    multicenterValidationSha256: sha256(multicenterValidationBytes),
    sampleSizeMethodSha256: sha256(readFileSync(sampleSizeMethodPath)),
    analysisCodeSha256: sha256(readFileSync(scriptPath)),
    sounioSourceSha256: sha256(readFileSync(calibrationTemplatePath)),
    generatedSounioSourceSha256: sha256(Buffer.from(generated)),
    compilerSha256,
    compilerSourceReceiptSha256: compilerSourceReceipt ? sha256(compilerSourceReceipt.bytes) : null,
    oracleSha256: sha256(readFileSync(oraclePath)),
    oracleOutputSha256: sha256(Buffer.from(oracleOutput)),
  },
  limitations: [
    'This report does not authorize clinical use or modify the active calibration certificate.',
    'Fixture metrics demonstrate pipeline execution only and carry no clinical validity.',
    'The current severity metric audits invariant red-flag sensitivity, not a learned severity model.',
    'The comparator reproduces the current APS product score, while Sounio alone converts raw scores into probabilities and calculates Brier skill.',
    'The Wilson sample-size result addresses coverage precision only; full external-validation sizing still requires model-specific calibration, discrimination, prevalence, and net-benefit assumptions.',
    'A distribution reference, independent review, prospective silent study, and production signature remain mandatory.',
  ],
};

if (promote) {
  if (!report.promotion.eligibleForIndependentReview) {
    throw new Error(`PROMOTION_REFUSED: cohort or scientific gates failed: ${report.promotion.blockers.join(', ')}.`);
  }
  throw new Error('PROMOTION_REFUSED: direct promotion is disabled; distribution monitoring, independent review, and an external production signature are still required.');
}

writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  status: report.status,
  reportPath,
  records: cohort.records.length,
  splits: validationSummary.splits,
  metrics,
  promotion: report.promotion,
}, null, 2));
console.log('SOUNIO_CALIBRATION_PIPELINE_OK');
