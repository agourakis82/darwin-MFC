import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scriptPath = fileURLToPath(import.meta.url);
const registryPath = join(root, 'clinical/epistemic-firewall/public-data/public-dataset-registry.v1.json');
const outputPath = join(root, '.clinical-kernel-build/public-data/esus-notifica-2024-availability.json');

const SOURCE_ID = 'br-esus-notifica-sg-2024';
const PACKAGE_ID = '1cafa064-b37d-4867-90ff-1e7eb71206ef';
const PACKAGE_NAME = 'notificacoes-de-sindrome-gripal-leve-2024';
const USER_AGENT = 'Darwin-MFC public-data availability audit/1.0';
const EXPECTED_UFS = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'NI',
  'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO',
];

const sha256 = value => createHash('sha256').update(value).digest('hex');
const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

function extractNextData(html) {
  const openingTag = '<script id="__NEXT_DATA__" type="application/json">';
  const start = html.indexOf(openingTag);
  requireCondition(start >= 0, 'esus-next-data-script-missing');
  const contentStart = start + openingTag.length;
  const end = html.indexOf('</script>', contentStart);
  requireCondition(end > contentStart, 'esus-next-data-script-truncated');
  const rawJson = html.slice(contentStart, end);
  return { rawJson, pageProps: JSON.parse(rawJson).props?.pageProps };
}

function extractSingleHttpsUrl(description) {
  const urls = String(description ?? '').match(/https:\/\/[^)\s]+/g) ?? [];
  requireCondition(urls.length === 1, 'esus-csv-description-url-count-invalid');
  return urls[0];
}

function normalizePackage(pageProps) {
  requireCondition(pageProps && typeof pageProps === 'object', 'esus-package-metadata-missing');
  requireCondition(pageProps.id === PACKAGE_ID, 'esus-package-id-mismatch');
  requireCondition(pageProps.name === PACKAGE_NAME, 'esus-package-name-mismatch');
  requireCondition(pageProps.state === 'active', 'esus-package-inactive');
  requireCondition(pageProps.private === false, 'esus-package-private');
  requireCondition(pageProps.num_resources === 31, 'esus-package-resource-count-declared-invalid');
  requireCondition(Array.isArray(pageProps.resources), 'esus-package-resources-missing');
  requireCondition(pageProps.resources.length === 31, 'esus-package-resource-count-observed-invalid');

  const pdfResources = pageProps.resources.filter(resource => resource.format === 'PDF');
  const csvResources = pageProps.resources.filter(resource => resource.format === 'CSV');
  requireCondition(pdfResources.length === 3, 'esus-package-pdf-count-invalid');
  requireCondition(csvResources.length === 28, 'esus-package-csv-count-invalid');
  requireCondition(
    pdfResources.every(resource => resource.state === 'active' && resource.datastore_active === false),
    'esus-package-pdf-state-invalid',
  );

  const normalizedCsv = csvResources.map(resource => {
    requireCondition(resource.state === 'active', `esus-csv-resource-inactive:${resource.id}`);
    requireCondition(resource.datastore_active === false, `esus-csv-datastore-unexpected:${resource.id}`);
    requireCondition(resource.url === '', `esus-csv-primary-url-unexpected:${resource.id}`);
    requireCondition(/^[0-9a-f-]{36}$/.test(resource.id), 'esus-csv-resource-id-invalid');

    const publishedUrl = extractSingleHttpsUrl(resource.description);
    const parsedUrl = new URL(publishedUrl);
    requireCondition(parsedUrl.protocol === 'https:', `esus-csv-protocol-invalid:${resource.id}`);
    requireCondition(parsedUrl.hostname === 's3.sa-east-1.amazonaws.com', `esus-csv-host-invalid:${resource.id}`);
    requireCondition(parsedUrl.username === '' && parsedUrl.password === '', `esus-csv-credentials-present:${resource.id}`);
    requireCondition(parsedUrl.search === '' && parsedUrl.hash === '', `esus-csv-url-token-or-fragment-present:${resource.id}`);

    const pathMatch = parsedUrl.pathname.match(
      /^\/ckan\.saude\.gov\.br\/SGL\/2024\/uf=([A-Z]{2})\/lote=1\/[^/]+\.csv$/,
    );
    requireCondition(pathMatch, `esus-csv-path-invalid:${resource.id}`);
    const uf = pathMatch[1];
    requireCondition(resource.name.includes(uf) || uf === 'NI', `esus-csv-name-uf-mismatch:${resource.id}`);

    return {
      uf,
      resourceId: resource.id,
      resourceName: resource.name,
      publishedUrl,
      publishedUrlSha256: sha256(publishedUrl),
    };
  }).sort((left, right) => left.uf.localeCompare(right.uf));

  requireCondition(
    JSON.stringify(normalizedCsv.map(resource => resource.uf)) === JSON.stringify(EXPECTED_UFS),
    'esus-csv-uf-partition-incomplete',
  );
  requireCondition(new Set(normalizedCsv.map(resource => resource.resourceId)).size === 28, 'esus-csv-resource-id-duplicate');
  requireCondition(new Set(normalizedCsv.map(resource => resource.publishedUrl)).size === 28, 'esus-csv-url-duplicate');

  return {
    package: {
      id: pageProps.id,
      name: pageProps.name,
      title: pageProps.title,
      state: pageProps.state,
      private: pageProps.private,
      metadataCreated: pageProps.metadata_created,
      metadataModified: pageProps.metadata_modified,
      declaredResourceCount: pageProps.num_resources,
      observedResourceCount: pageProps.resources.length,
      pdfResourceCount: pdfResources.length,
      csvResourceCount: normalizedCsv.length,
    },
    csvResources: normalizedCsv,
  };
}

function evaluateAvailability(probes) {
  const accessible = probes.filter(probe => probe.status === 200 || probe.status === 206);
  const statusCounts = {};
  for (const probe of probes) {
    const key = probe.status === null ? 'network-error' : String(probe.status);
    statusCounts[key] = (statusCounts[key] ?? 0) + 1;
  }
  return {
    status: accessible.length === 0 ? 'row-extraction-blocked' : 'header-review-required',
    statusCounts,
    directCsvAccessible: accessible.length > 0,
    accessiblePartitionCount: accessible.length,
    allDirectCsvRequestsBlocked: accessible.length === 0,
    allDirectCsvRequestsHttp403: probes.length > 0 && probes.every(probe => probe.status === 403),
    headersVerified: false,
    extractionAuthorized: false,
  };
}

async function probePublishedResource(resource) {
  try {
    const response = await fetch(resource.publishedUrl, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        accept: 'text/csv,application/octet-stream;q=0.9,*/*;q=0.1',
        range: 'bytes=0-4095',
        'user-agent': USER_AGENT,
      },
    });
    const result = {
      uf: resource.uf,
      resourceId: resource.resourceId,
      publishedUrlSha256: resource.publishedUrlSha256,
      status: response.status,
      contentType: response.headers.get('content-type'),
      contentLength: response.headers.get('content-length'),
      contentRange: response.headers.get('content-range'),
      etag: response.headers.get('etag'),
      lastModified: response.headers.get('last-modified'),
      location: response.headers.get('location'),
      bodyRead: false,
    };
    await response.body?.cancel();
    return result;
  } catch (error) {
    return {
      uf: resource.uf,
      resourceId: resource.resourceId,
      publishedUrlSha256: resource.publishedUrlSha256,
      status: null,
      error: error instanceof Error ? error.message : String(error),
      bodyRead: false,
    };
  }
}

async function probeWithLimit(resources, concurrency = 4) {
  const results = new Array(resources.length);
  let cursor = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (cursor < resources.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await probePublishedResource(resources[index]);
    }
  });
  await Promise.all(workers);
  return results;
}

function buildSyntheticPackage() {
  return {
    id: PACKAGE_ID,
    name: PACKAGE_NAME,
    title: 'Synthetic e-SUS availability fixture',
    state: 'active',
    private: false,
    num_resources: 31,
    metadata_created: '2024-03-11T17:25:11.837348',
    metadata_modified: '2025-12-21T19:01:15.196745',
    resources: [
      ...Array.from({ length: 3 }, (_, index) => ({
        id: `00000000-0000-4000-8000-00000000000${index}`,
        name: `Synthetic PDF ${index}`,
        format: 'PDF',
        url: `https://example.invalid/${index}.pdf`,
        state: 'active',
        datastore_active: false,
      })),
      ...EXPECTED_UFS.map((uf, index) => ({
        id: `10000000-0000-4000-8000-${String(index).padStart(12, '0')}`,
        name: uf === 'NI' ? 'Dados UF Nao Identificada - 20/12' : `Dados ${uf} - 20/12`,
        format: 'CSV',
        url: '',
        state: 'active',
        datastore_active: false,
        description: `[UF-${uf} - Lote 1](https://s3.sa-east-1.amazonaws.com/ckan.saude.gov.br/SGL/2024/uf=${uf}/lote=1/part-00000-fixture.c000.csv)`,
      })),
    ],
  };
}

function runSelfTest() {
  const syntheticNextData = JSON.stringify({ props: { pageProps: buildSyntheticPackage() } });
  const html = `<html><script id="__NEXT_DATA__" type="application/json">${syntheticNextData}</script></html>`;
  const { pageProps } = extractNextData(html);
  const normalized = normalizePackage(pageProps);
  const blocked = evaluateAvailability(normalized.csvResources.map(resource => ({ ...resource, status: 403 })));
  const reachable = evaluateAvailability(normalized.csvResources.map((resource, index) => ({
    ...resource,
    status: index === 0 ? 206 : 403,
  })));

  requireCondition(blocked.status === 'row-extraction-blocked', 'esus-self-test-blocked-state-invalid');
  requireCondition(blocked.allDirectCsvRequestsHttp403 === true, 'esus-self-test-http403-summary-invalid');
  requireCondition(reachable.status === 'header-review-required', 'esus-self-test-reachable-state-invalid');
  requireCondition(reachable.extractionAuthorized === false, 'esus-self-test-reachable-auto-authorized');

  const signedUrlPackage = buildSyntheticPackage();
  signedUrlPackage.resources[3].description = signedUrlPackage.resources[3].description.replace(
    '.csv)',
    '.csv?X-Amz-Signature=fixture)',
  );
  let signedUrlRejected = false;
  try {
    normalizePackage(signedUrlPackage);
  } catch (error) {
    signedUrlRejected = error instanceof Error && error.message.includes('url-token-or-fragment-present');
  }
  requireCondition(signedUrlRejected, 'esus-self-test-signed-url-not-rejected');

  const duplicatePartitionPackage = buildSyntheticPackage();
  duplicatePartitionPackage.resources.at(-1).description = duplicatePartitionPackage.resources[3].description;
  duplicatePartitionPackage.resources.at(-1).name = duplicatePartitionPackage.resources[3].name;
  let duplicatePartitionRejected = false;
  try {
    normalizePackage(duplicatePartitionPackage);
  } catch (error) {
    duplicatePartitionRejected = error instanceof Error && error.message.includes('uf-partition-incomplete');
  }
  requireCondition(duplicatePartitionRejected, 'esus-self-test-duplicate-partition-not-rejected');

  const receipt = {
    schemaVersion: 'darwin.sounio.public-esus-notifica-availability-self-test.v1',
    status: 'pass',
    sourceId: SOURCE_ID,
    packageIdentityVerified: normalized.package.id === PACKAGE_ID,
    statePartitionsVerified: normalized.csvResources.length === 28,
    blockedCaseRefused: blocked.status === 'row-extraction-blocked' && !blocked.extractionAuthorized,
    reachableCaseRequiresHeaderReview: reachable.status === 'header-review-required' && !reachable.extractionAuthorized,
    signedUrlRejected,
    duplicatePartitionRejected,
    unknownNeverCoercedToAbsent: true,
    patientRowsRead: false,
    patientRowsPersisted: false,
    probabilitiesEstimated: false,
    prescriptionRecommendationAuthorized: false,
    apsCalibrationAuthorized: false,
    clinicalActivationAuthorized: false,
    firewallDisposition: 'REFUSE',
  };
  console.log(JSON.stringify(receipt, null, 2));
  console.log('PUBLIC_ESUS_NOTIFICA_AVAILABILITY_SELF_TEST_VALID');
}

async function runLiveAudit() {
  const registryBytes = readFileSync(registryPath);
  const registry = JSON.parse(registryBytes.toString('utf8'));
  const source = registry.datasets.find(dataset => dataset.sourceId === SOURCE_ID);
  requireCondition(source, 'esus-registry-source-missing');
  requireCondition(source.access.level === 'public-metadata', 'esus-registry-access-level-mismatch');
  requireCondition(source.access.credentialsStored === false, 'esus-registry-credentials-forbidden');
  requireCondition(source.featureMappings.every(mapping => mapping.missingMapsTo === -1), 'esus-registry-unknown-policy-invalid');

  const response = await fetch(source.officialDatasetUrl, {
    headers: { accept: 'text/html', 'user-agent': USER_AGENT },
    redirect: 'error',
  });
  requireCondition(response.status === 200, `esus-dataset-page-http-${response.status}`);
  const html = await response.text();
  const { rawJson, pageProps } = extractNextData(html);
  const normalized = normalizePackage(pageProps);
  const probes = await probeWithLimit(normalized.csvResources);
  const availability = evaluateAvailability(probes);

  const manifest = normalized.csvResources.map(resource => ({
    uf: resource.uf,
    resourceId: resource.resourceId,
    resourceName: resource.resourceName,
    publishedUrlSha256: resource.publishedUrlSha256,
  }));
  const report = {
    schemaVersion: 'darwin.sounio.public-esus-notifica-2024-availability-receipt.v1',
    generatedAt: new Date().toISOString(),
    sourceId: SOURCE_ID,
    officialDatasetUrl: source.officialDatasetUrl,
    status: availability.status,
    catalog: {
      httpStatus: response.status,
      ...normalized.package,
    },
    availability,
    probes,
    invariants: {
      metadataStructurallyParsed: true,
      packageIdentityVerified: true,
      resourceCountVerified: true,
      statePartitionsVerified: true,
      resourceUrlsCredentialFree: true,
      responseBodiesRead: false,
      patientRowsRead: false,
      patientRowsPersisted: false,
      unknownNeverCoercedToAbsent: true,
      extractionAuthorized: false,
      probabilitiesEstimated: false,
      treatmentEffectsEstimated: false,
      prescriptionRecommendationAuthorized: false,
      apsCalibrationAuthorized: false,
      clinicalActivationAuthorized: false,
      firewallDisposition: 'REFUSE',
    },
    hashes: {
      registrySha256: sha256(registryBytes),
      auditScriptSha256: sha256(readFileSync(scriptPath)),
      datasetPageHtmlSha256: sha256(html),
      nextDataSha256: sha256(rawJson),
      resourceManifestSha256: sha256(JSON.stringify(manifest)),
    },
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  console.log('PUBLIC_ESUS_NOTIFICA_2024_AVAILABILITY_AUDIT_COMPLETE');
  if (availability.allDirectCsvRequestsHttp403) {
    console.log('PUBLIC_ESUS_NOTIFICA_2024_AVAILABILITY_BLOCKED_SAFE');
  }
}

if (process.argv.includes('--self-test')) {
  runSelfTest();
} else {
  await runLiveAudit();
}
