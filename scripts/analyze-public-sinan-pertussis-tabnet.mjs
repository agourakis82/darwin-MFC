import { createHash } from 'node:crypto';
import { execFile as execFileCallback } from 'node:child_process';
import { constants as fsConstants, accessSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import Papa from 'papaparse';
import { parse as parseHtml } from 'parse5';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scriptPath = fileURLToPath(import.meta.url);
const registryPath = join(root, 'clinical/epistemic-firewall/public-data/public-dataset-registry.v1.json');
const outputPath = join(root, '.clinical-kernel-build/public-data/sinan-pertussis-tabnet.json');

const SOURCE_ID = 'br-sinan-pertussis-tabnet';
const LANDING_URL = 'https://datasus.saude.gov.br/acesso-a-informacao/doencas-e-agravos-de-notificacao-de-2007-em-diante-sinan/';
const FORM_URL = 'https://tabnet.datasus.gov.br/cgi/deftohtm.exe?sinannet/cnv/coquebr.def';
const QUERY_URL = 'https://tabnet.datasus.gov.br/cgi/tabcgi.exe?sinannet/cnv/coquebr.def';
const USER_AGENT = 'Darwin-MFC public-data epidemiologic audit/1.0';
const OFFICIAL_HOSTS = new Set(['datasus.saude.gov.br', 'tabnet.datasus.gov.br']);
const DISCLOSURE_THRESHOLD = 30;
const NOTIFICATION_YEARS = Array.from({ length: 20 }, (_, index) => 2007 + index);
const SYMPTOM_YEARS = Array.from({ length: 18 }, (_, index) => 2007 + index);
const AGE_BANDS = [
  '<1 Ano', '1-4', '5-9', '10-14', '15-19', '20-39', '40-59', '60-64', '65-69', '70-79', '80 e +',
];
const FORM_AGE_BANDS = ['Em branco/IGN', ...AGE_BANDS];
const EXPECTED_FORM_MANIFEST_SHA256 = '0c058b7f7fee6727a30ba13323e6d3fdae8769ea7fec34bb3e365ace9d116333';
const EXPECTED_QUERY_BODY_SHA256 = '4a12397dc9fc21431b880a12789386a3eb35f759a177e6a71e0519fac592eb8c';
const EXPECTED_CANONICAL_TABLE_SHA256 = '7b0e47cb791f8f669a20a7177da653df0553d122531501ca2f04f5f6ea6668e1';
const execFile = promisify(execFileCallback);

const sha256 = value => createHash('sha256').update(value).digest('hex');
const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};
const normalizeSpace = value => String(value ?? '').replace(/\s+/g, ' ').trim();

function walk(node, visit) {
  visit(node);
  for (const child of node.childNodes ?? []) walk(child, visit);
}

function findAll(node, predicate) {
  const matches = [];
  walk(node, candidate => {
    if (predicate(candidate)) matches.push(candidate);
  });
  return matches;
}

function getAttribute(node, name) {
  return node.attrs?.find(attribute => attribute.name.toLowerCase() === name.toLowerCase())?.value ?? null;
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(textContent).join('');
}

function parseOptions(select) {
  return findAll(select, node => node.tagName === 'option').map(option => ({
    value: getAttribute(option, 'value') ?? normalizeSpace(textContent(option)),
    text: normalizeSpace(textContent(option)),
    selected: option.attrs?.some(attribute => attribute.name.toLowerCase() === 'selected') ?? false,
  }));
}

function decodeWindows1252(bytes) {
  return new TextDecoder('windows-1252').decode(bytes);
}

function parseFormManifest(html) {
  const document = parseHtml(html);
  const forms = findAll(document, node => node.tagName === 'form');
  const form = forms.find(candidate => getAttribute(candidate, 'action')?.includes('coquebr.def'));
  requireCondition(form, 'sinan-tabnet-form-missing');
  requireCondition(getAttribute(form, 'method')?.toUpperCase() === 'POST', 'sinan-tabnet-form-method-invalid');

  const selects = findAll(form, node => node.tagName === 'select');
  const byName = name => selects.find(select => getAttribute(select, 'name') === name);
  const line = byName('Linha');
  const column = byName('Coluna');
  const increment = byName('Incremento');
  const files = byName('Arquivos');
  const symptomYear = byName('SAno_1º_Sintoma(s)');
  const ageBand = byName('SFaixa_Etária');
  requireCondition(line && column && increment && files && symptomYear && ageBand, 'sinan-tabnet-required-select-missing');

  const fileOptions = parseOptions(files).map(option => ({
    value: option.value,
    year: Number(option.text),
  }));
  const symptomYearOptions = parseOptions(symptomYear)
    .filter(option => /^\d{4}$/.test(option.text))
    .map(option => ({ value: option.value, year: Number(option.text) }));
  const ageOptions = parseOptions(ageBand)
    .filter(option => option.value !== 'TODAS_AS_CATEGORIAS__')
    .map(option => option.text);

  const footer = findAll(document, node => node.tagName === 'div' && getAttribute(node, 'class') === 'rodape_htm')[0];
  requireCondition(footer, 'sinan-tabnet-technical-notes-missing');
  const notes = findAll(footer, node => node.tagName === 'li').map(note => normalizeSpace(textContent(note)));

  const manifest = {
    action: getAttribute(form, 'action'),
    method: getAttribute(form, 'method').toUpperCase(),
    lineValues: parseOptions(line).map(option => option.value),
    columnValues: parseOptions(column).map(option => option.value),
    incrementValues: parseOptions(increment).map(option => option.value),
    notificationFiles: fileOptions,
    symptomYears: symptomYearOptions,
    ageBands: ageOptions,
    notes,
  };

  requireCondition(manifest.action === '/cgi/tabcgi.exe?sinannet/cnv/coquebr.def', 'sinan-tabnet-action-mismatch');
  requireCondition(manifest.lineValues.includes('Faixa_Etária'), 'sinan-tabnet-age-line-unavailable');
  requireCondition(manifest.columnValues.includes('Ano_1º_Sintoma(s)'), 'sinan-tabnet-symptom-year-column-unavailable');
  requireCondition(manifest.incrementValues.length === 1 && manifest.incrementValues[0] === 'Casos_confirmados', 'sinan-tabnet-measure-mismatch');
  requireCondition(
    JSON.stringify(fileOptions.map(option => option.year).sort((a, b) => a - b)) === JSON.stringify(NOTIFICATION_YEARS),
    'sinan-tabnet-notification-files-mismatch',
  );
  requireCondition(
    SYMPTOM_YEARS.every(year => symptomYearOptions.some(option => option.year === year)),
    'sinan-tabnet-symptom-year-range-incomplete',
  );
  requireCondition(JSON.stringify(ageOptions) === JSON.stringify(FORM_AGE_BANDS), 'sinan-tabnet-age-bands-mismatch');
  requireCondition(notes.some(note => note.includes('casos notificados com atraso')), 'sinan-tabnet-late-notification-note-missing');
  requireCondition(notes.some(note => note.includes('2024') && note.includes('sujeitos à revisão')), 'sinan-tabnet-2024-revision-note-missing');
  requireCondition(notes.some(note => note.includes('2026') && note.includes('parciais')), 'sinan-tabnet-partial-year-note-missing');

  return manifest;
}

function encodeLatin1FormComponent(value) {
  return [...Buffer.from(String(value), 'latin1')].map(byte => {
    const character = String.fromCharCode(byte);
    if (/[A-Za-z0-9_.~-]/.test(character)) return character;
    if (byte === 32) return '+';
    return `%${byte.toString(16).toUpperCase().padStart(2, '0')}`;
  }).join('');
}

function buildQueryBody(manifest) {
  const fileByYear = new Map(manifest.notificationFiles.map(option => [option.year, option.value]));
  const symptomYearByYear = new Map(manifest.symptomYears.map(option => [option.year, option.value]));
  const pairs = [
    ['Linha', 'Faixa_Etária'],
    ['Coluna', 'Ano_1º_Sintoma(s)'],
    ['Incremento', 'Casos_confirmados'],
    ...NOTIFICATION_YEARS.map(year => ['Arquivos', fileByYear.get(year)]),
    ...SYMPTOM_YEARS.map(year => ['SAno_1º_Sintoma(s)', symptomYearByYear.get(year)]),
    ['formato', 'prn'],
    ['mostre', 'Mostra'],
  ];
  requireCondition(pairs.every(([, value]) => value !== undefined), 'sinan-tabnet-query-option-unresolved');
  return pairs.map(([key, value]) => `${encodeLatin1FormComponent(key)}=${encodeLatin1FormComponent(value)}`).join('&');
}

function extractPreformattedTable(html) {
  const document = parseHtml(html);
  const pre = findAll(document, node => node.tagName === 'pre')[0];
  requireCondition(pre, 'sinan-tabnet-result-table-missing');
  return textContent(pre).split(/\r?\n/).map(line => line.trim()).filter(line => line && line !== '&').join('\n');
}

function parseCount(value) {
  const normalized = String(value ?? '').trim();
  if (normalized === '-') return 0;
  requireCondition(/^\d+$/.test(normalized), `sinan-tabnet-count-invalid:${normalized}`);
  return Number(normalized);
}

function parseAndReconcileTable(csv) {
  const parsed = Papa.parse(csv, { header: true, delimiter: ';', skipEmptyLines: true });
  requireCondition(parsed.errors.length === 0, `sinan-tabnet-csv-parse-error:${parsed.errors[0]?.message ?? 'unknown'}`);
  const fields = parsed.meta.fields ?? [];
  const labelField = fields[0];
  const expectedFields = [labelField, ...SYMPTOM_YEARS.map(String), 'Total'];
  requireCondition(JSON.stringify(fields) === JSON.stringify(expectedFields), 'sinan-tabnet-result-columns-mismatch');

  const rows = parsed.data.map(sourceRow => {
    const label = normalizeSpace(sourceRow[labelField]);
    const values = Object.fromEntries(SYMPTOM_YEARS.map(year => [year, parseCount(sourceRow[String(year)])]));
    return { label, values, total: parseCount(sourceRow.Total) };
  });
  const totalRow = rows.find(row => row.label === 'Total');
  const ageRows = rows.filter(row => row.label !== 'Total');
  requireCondition(totalRow, 'sinan-tabnet-total-row-missing');
  requireCondition(ageRows.every(row => AGE_BANDS.includes(row.label) || row.label === 'Em branco/IGN'), 'sinan-tabnet-unexpected-age-row');
  requireCondition(AGE_BANDS.every(label => ageRows.some(row => row.label === label)), 'sinan-tabnet-age-row-missing');

  for (const row of ageRows) {
    requireCondition(
      row.total === SYMPTOM_YEARS.reduce((sum, year) => sum + row.values[year], 0),
      `sinan-tabnet-row-total-mismatch:${row.label}`,
    );
  }
  for (const year of SYMPTOM_YEARS) {
    requireCondition(
      totalRow.values[year] === ageRows.reduce((sum, row) => sum + row.values[year], 0),
      `sinan-tabnet-column-total-mismatch:${year}`,
    );
  }
  requireCondition(
    totalRow.total === SYMPTOM_YEARS.reduce((sum, year) => sum + totalRow.values[year], 0),
    'sinan-tabnet-grand-total-year-mismatch',
  );
  requireCondition(totalRow.total === ageRows.reduce((sum, row) => sum + row.total, 0), 'sinan-tabnet-grand-total-age-mismatch');

  return { fields, ageRows, totalRow };
}

function metric(count, denominator = null) {
  if (count < DISCLOSURE_THRESHOLD || (denominator !== null && denominator < DISCLOSURE_THRESHOLD)) {
    return { status: 'suppressed', count: null, share: null, reason: `count-below-${DISCLOSURE_THRESHOLD}` };
  }
  return {
    status: 'published',
    count,
    share: denominator === null ? null : count / denominator,
  };
}

function deriveSeries(table) {
  const byLabel = new Map(table.ageRows.map(row => [row.label, row]));
  const count = (label, year) => byLabel.get(label)?.values[year] ?? 0;
  return SYMPTOM_YEARS.map(year => {
    const total = table.totalRow.values[year];
    const infant = count('<1 Ano', year);
    const age1to4 = count('1-4', year);
    const age5to9 = count('5-9', year);
    const age10to14 = count('10-14', year);
    const age15to19 = count('15-19', year);
    const exactUnder5 = infant + age1to4;
    const exactUnder15 = exactUnder5 + age5to9 + age10to14;
    const adult20Plus = ['20-39', '40-59', '60-64', '65-69', '70-79', '80 e +']
      .reduce((sum, label) => sum + count(label, year), 0);
    const unknownAge = count('Em branco/IGN', year);
    requireCondition(exactUnder15 + age15to19 + adult20Plus + unknownAge === total, `sinan-tabnet-derived-total-mismatch:${year}`);
    return {
      year,
      totalConfirmedNotifications: metric(total),
      infant: metric(infant, total),
      exactUnder5: metric(exactUnder5, total),
      exactUnder15: metric(exactUnder15, total),
      crossBoundaryAge15To19: metric(age15to19, total),
      adult20Plus: metric(adult20Plus, total),
      exactUnder18Available: false,
      symptomaticEncounterDenominatorAvailable: false,
    };
  });
}

function resolveExecutable(name) {
  for (const directory of (process.env.PATH ?? '').split(':')) {
    if (!directory) continue;
    const candidate = join(directory, name);
    try {
      accessSync(candidate, fsConstants.X_OK);
      return candidate;
    } catch {
      // Continue through PATH entries.
    }
  }
  throw new Error(`sinan-tabnet-executable-missing:${name}`);
}

async function requestOfficialOnce(url, options = {}) {
  const parsedUrl = new URL(url);
  requireCondition(parsedUrl.protocol === 'https:', 'sinan-tabnet-transport-must-be-https');
  requireCondition(OFFICIAL_HOSTS.has(parsedUrl.hostname), 'sinan-tabnet-request-host-invalid');
  const body = options.body ?? null;
  const curlPath = resolveExecutable('curl');
  const args = [
    '--ipv4',
    '--silent',
    '--show-error',
    '--fail',
    '--proto', '=https',
    '--connect-timeout', '20',
    '--max-time', '120',
    '--user-agent', USER_AGENT,
    '--header', 'accept: text/html',
  ];
  for (const [name, value] of Object.entries(options.headers ?? {})) {
    args.push('--header', `${name}: ${value}`);
  }
  if ((options.method ?? 'GET') === 'POST') {
    args.push('--request', 'POST', '--data-binary', body ?? '');
  }
  args.push(url);
  const { stdout } = await execFile(curlPath, args, { encoding: 'buffer', maxBuffer: 5 * 1024 * 1024 });
  return Buffer.from(stdout);
}

async function fetchOfficial(url, options = {}) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await requestOfficialOnce(url, options);
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise(resolvePromise => setTimeout(resolvePromise, 500 * attempt));
    }
  }
  throw lastError;
}

function buildSyntheticTableCsv() {
  const years = SYMPTOM_YEARS;
  const rows = AGE_BANDS.map((label, rowIndex) => {
    const values = years.map((year, yearIndex) => (rowIndex + yearIndex) % 4 === 0 ? 0 : 10 + rowIndex + yearIndex);
    return { label, values, total: values.reduce((sum, value) => sum + value, 0) };
  });
  const totals = years.map((year, yearIndex) => rows.reduce((sum, row) => sum + row.values[yearIndex], 0));
  const lines = [
    ['Faixa Etária', ...years, 'Total'],
    ...rows.map(row => [row.label, ...row.values.map(value => value === 0 ? '-' : value), row.total]),
    ['Total', ...totals, totals.reduce((sum, value) => sum + value, 0)],
  ];
  return Papa.unparse(lines, { delimiter: ';', quotes: true });
}

function runSelfTest() {
  const csv = buildSyntheticTableCsv();
  const table = parseAndReconcileTable(csv);
  const series = deriveSeries(table);
  requireCondition(series.length === 18, 'sinan-self-test-year-count-invalid');
  requireCondition(series.every(item => item.exactUnder18Available === false), 'sinan-self-test-cross-boundary-age-used-as-under18');
  requireCondition(series.some(item => item.infant.status === 'suppressed'), 'sinan-self-test-suppression-not-exercised');
  requireCondition(table.ageRows.find(row => row.label === '<1 Ano')?.values[2007] === 0, 'sinan-self-test-dash-zero-invalid');

  const tamperedRows = Papa.parse(csv, { delimiter: ';', skipEmptyLines: true }).data;
  const finalRow = tamperedRows.at(-1);
  finalRow[finalRow.length - 1] = String(Number(finalRow.at(-1)) + 1);
  const tampered = Papa.unparse(tamperedRows, { delimiter: ';', quotes: true });
  let mismatchedTotalRejected = false;
  try {
    parseAndReconcileTable(tampered);
  } catch (error) {
    mismatchedTotalRejected = error instanceof Error && error.message.includes('grand-total');
  }
  requireCondition(mismatchedTotalRejected, 'sinan-self-test-mismatched-total-not-rejected');

  const receipt = {
    schemaVersion: 'darwin.sounio.public-sinan-pertussis-tabnet-self-test.v1',
    status: 'pass',
    sourceId: SOURCE_ID,
    yearColumnsReconciled: true,
    ageRowsReconciled: true,
    dashMappedToExactZero: true,
    smallCellSuppressionApplied: true,
    crossBoundaryAge15To19NotRelabeledUnder18: true,
    mismatchedTotalRejected,
    patientRowsRead: false,
    symptomaticEncounterPriorEstimated: false,
    probabilitiesEstimated: false,
    prescriptionRecommendationAuthorized: false,
    apsCalibrationAuthorized: false,
    clinicalActivationAuthorized: false,
    firewallDisposition: 'REFUSE',
  };
  console.log(JSON.stringify(receipt, null, 2));
  console.log('PUBLIC_SINAN_PERTUSSIS_TABNET_SELF_TEST_VALID');
}

async function runLiveAudit() {
  const registryBytes = readFileSync(registryPath);
  const registry = JSON.parse(registryBytes.toString('utf8'));
  const source = registry.datasets.find(dataset => dataset.sourceId === SOURCE_ID);
  requireCondition(source, 'sinan-registry-source-missing');
  requireCondition(source.access.patientLevel === false, 'sinan-registry-patient-level-boundary-invalid');
  requireCondition(source.forbiddenUses.includes('aps-prior-calibration'), 'sinan-registry-prior-forbidden-use-missing');
  const curlPath = resolveExecutable('curl');
  const { stdout: curlVersionOutput } = await execFile(curlPath, ['--version'], { encoding: 'utf8' });
  const curlVersion = curlVersionOutput.split(/\r?\n/)[0];
  requireCondition(curlVersion.startsWith('curl '), 'sinan-tabnet-curl-version-invalid');

  const landingBytes = await fetchOfficial(LANDING_URL);
  const landingHtml = decodeWindows1252(landingBytes);
  requireCondition(landingHtml.includes('texto_relatorio:"Coqueluche"'), 'sinan-landing-pertussis-entry-missing');
  requireCondition(landingHtml.includes('sinannet/cnv/coque'), 'sinan-landing-tabnet-route-missing');

  const formBytes = await fetchOfficial(FORM_URL);
  const formHtml = decodeWindows1252(formBytes);
  const manifest = parseFormManifest(formHtml);
  const manifestSha256 = sha256(JSON.stringify(manifest));
  if (EXPECTED_FORM_MANIFEST_SHA256 !== null) {
    requireCondition(manifestSha256 === EXPECTED_FORM_MANIFEST_SHA256, 'sinan-tabnet-form-manifest-hash-mismatch');
  }

  const queryBody = buildQueryBody(manifest);
  requireCondition(sha256(queryBody) === EXPECTED_QUERY_BODY_SHA256, 'sinan-tabnet-query-body-hash-mismatch');
  const resultBytes = await fetchOfficial(QUERY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: queryBody,
  });
  const resultHtml = decodeWindows1252(resultBytes);
  const resultText = normalizeSpace(textContent(parseHtml(resultHtml)));
  requireCondition(resultText.includes('Casos confirmados por Ano 1º Sintoma(s) segundo Faixa Etária'), 'sinan-tabnet-result-title-mismatch');
  const csv = extractPreformattedTable(resultHtml);
  const table = parseAndReconcileTable(csv);
  const canonicalTable = {
    fields: table.fields,
    rows: [...table.ageRows, table.totalRow],
  };
  const canonicalTableSha256 = sha256(JSON.stringify(canonicalTable));
  if (EXPECTED_CANONICAL_TABLE_SHA256 !== null) {
    requireCondition(canonicalTableSha256 === EXPECTED_CANONICAL_TABLE_SHA256, 'sinan-tabnet-canonical-table-hash-mismatch');
  }
  const series = deriveSeries(table);
  const latest = series.at(-1);
  const reference = series.find(item => item.year === 2019);
  requireCondition(latest?.year === 2024 && reference, 'sinan-tabnet-trend-years-missing');

  const report = {
    schemaVersion: 'darwin.sounio.public-sinan-pertussis-tabnet-receipt.v1',
    generatedAt: new Date().toISOString(),
    sourceId: SOURCE_ID,
    status: 'epidemiologic-context-only',
    transport: {
      protocol: 'HTTPS',
      redirectsFollowed: false,
      ipv4Forced: true,
      executorPath: curlPath,
      executorVersion: curlVersion,
    },
    query: {
      line: 'Faixa Etária',
      column: 'Ano 1º Sintoma(s)',
      measure: 'Casos confirmados',
      notificationYears: NOTIFICATION_YEARS,
      symptomYears: SYMPTOM_YEARS,
      latestSymptomYearIncluded: 2024,
      excludedSymptomYears: [2025, 2026],
      exclusionReason: '2025 is subject to revision and 2026 is partial; notification files remain included for delayed reports',
    },
    disclosure: {
      minimumPublishedCount: DISCLOSURE_THRESHOLD,
      rawAggregateTablePersisted: false,
      suppressedCountsRetained: false,
      formalDATASUSDisclosureCertification: false,
    },
    series,
    temporalContext: {
      comparison: '2024 versus 2019 confirmed notification counts',
      ratio: latest.totalConfirmedNotifications.count / reference.totalConfirmedNotifications.count,
      isSymptomaticEncounterProbability: false,
      isIncidenceRate: false,
    },
    invariants: {
      officialLandingVerified: true,
      formContractVerified: true,
      aggregateTableReconciledByAgeAndYear: true,
      lateNotificationFilesIncluded: true,
      patientRowsAvailable: false,
      patientRowsRead: false,
      patientRowsPersisted: false,
      exactUnder18AgeBandAvailable: false,
      crossBoundaryAge15To19Preserved: true,
      symptomaticEncounterDenominatorAvailable: false,
      symptomaticEncounterPriorEstimated: false,
      incidenceRateEstimated: false,
      likelihoodRatiosEstimated: false,
      probabilitiesEstimated: false,
      treatmentEffectsEstimated: false,
      prescriptionRecommendationAuthorized: false,
      clinicalDecisionInputAuthorized: false,
      apsCalibrationAuthorized: false,
      clinicalActivationAuthorized: false,
      firewallDisposition: 'REFUSE',
    },
    hashes: {
      registrySha256: sha256(registryBytes),
      auditScriptSha256: sha256(readFileSync(scriptPath)),
      transportExecutorSha256: sha256(readFileSync(curlPath)),
      landingPageSha256: sha256(landingBytes),
      formPageSha256: sha256(formBytes),
      formManifestSha256: manifestSha256,
      queryBodySha256: sha256(queryBody),
      queryResponseSha256: sha256(resultBytes),
      canonicalTableSha256,
    },
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  console.log('PUBLIC_SINAN_PERTUSSIS_TABNET_AUDIT_VALID');
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  await runLiveAudit();
}
