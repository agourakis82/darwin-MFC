import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(
  root,
  process.argv[2] || 'docs/research/epistemic-firewall/search-log-2026-07-29.json',
);

const queries = [
  {
    id: 'NPL-01',
    concept: 'proof-carrying clinical inference',
    query: '("proof carrying" OR "proof-carrying") AND (clinical OR medical OR diagnosis)',
  },
  {
    id: 'NPL-02',
    concept: 'conformal clinical inference with formal verification',
    query: '"conformal prediction" AND clinical AND ("formal verification" OR "runtime verification")',
  },
  {
    id: 'NPL-03',
    concept: 'selective clinical prediction with provenance',
    query: '("selective prediction" OR abstention) AND clinical AND (provenance OR cryptographic OR attestation)',
  },
  {
    id: 'NPL-04',
    concept: 'non-repudiable clinical decision support provenance',
    query: '"clinical decision support" AND ("non-repudiable" OR "cryptographic provenance" OR attestation)',
  },
  {
    id: 'NPL-05',
    concept: 'compiler identity in clinical software assurance',
    query: '(compiler OR WebAssembly OR WASM) AND "clinical decision support" AND (provenance OR verification OR receipt)',
  },
  {
    id: 'NPL-06',
    concept: 'calibration certificate for clinical AI',
    query: '("calibration certificate" OR "coverage certificate") AND (clinical OR medical OR healthcare) AND AI',
  },
];

const userAgent = 'Darwin-MFC-Epistemic-Firewall/0.1 (formal prior-art search; https://mfc.agourakis.med.br)';

const sleep = milliseconds => new Promise(resolvePromise => setTimeout(resolvePromise, milliseconds));

async function getJson(url) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, { headers: { 'user-agent': userAgent, accept: 'application/json' } });
    if (response.ok) return { data: await response.json(), error: null };
    if (response.status !== 429 || attempt === 3) {
      return { data: null, error: `${response.status} ${response.statusText}` };
    }
    await sleep(1500 * (2 ** attempt));
  }
  return { data: null, error: 'unreachable-retry-state' };
}

function normalizeCrossref(item) {
  return {
    title: Array.isArray(item.title) ? item.title[0] : item.title,
    year: item.published?.['date-parts']?.[0]?.[0] ?? null,
    doi: item.DOI ?? null,
    type: item.type ?? null,
    url: item.URL ?? null,
    source: 'Crossref',
  };
}

function normalizeEuropePmc(item) {
  return {
    title: item.title ?? null,
    year: item.pubYear ? Number(item.pubYear) : null,
    doi: item.doi ?? null,
    pmid: item.pmid ?? null,
    type: item.pubType ?? null,
    url: item.doi
      ? `https://doi.org/${item.doi}`
      : item.pmid
        ? `https://pubmed.ncbi.nlm.nih.gov/${item.pmid}/`
        : null,
    source: 'Europe PMC',
  };
}

const runs = [];
for (const query of queries) {
  const crossrefUrl = new URL('https://api.crossref.org/works');
  crossrefUrl.searchParams.set('query.bibliographic', query.query);
  crossrefUrl.searchParams.set('rows', '20');
  crossrefUrl.searchParams.set('select', 'DOI,title,published,type,URL');

  const europePmcUrl = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
  europePmcUrl.searchParams.set('query', query.query);
  europePmcUrl.searchParams.set('format', 'json');
  europePmcUrl.searchParams.set('pageSize', '20');
  europePmcUrl.searchParams.set('resultType', 'core');

  const crossrefResult = await getJson(crossrefUrl);
  const europePmcResult = await getJson(europePmcUrl);
  const crossref = crossrefResult.data;
  const europePmc = europePmcResult.data;

  runs.push({
    ...query,
    databases: [
      {
        name: 'Crossref',
        url: crossrefUrl.toString(),
        error: crossrefResult.error,
        totalResults: crossref?.message?.['total-results'] ?? null,
        records: (crossref?.message?.items || []).map(normalizeCrossref),
      },
      {
        name: 'Europe PMC',
        url: europePmcUrl.toString(),
        error: europePmcResult.error,
        totalResults: europePmc ? Number(europePmc.hitCount || 0) : null,
        records: (europePmc?.resultList?.result || []).map(normalizeEuropePmc),
      },
    ],
  });
  await sleep(750);
}

const log = {
  schemaVersion: 'darwin.prior-art-search-log.v1',
  searchOpenedAt: new Date().toISOString(),
  status: 'open',
  protocol: 'PRISMA-S-inspired discovery search; not a completed systematic review or legal opinion',
  databases: ['Crossref', 'Europe PMC'],
  queries: runs,
  limitations: [
    'Database ranking is retained as returned and has not yet undergone dual-reviewer screening.',
    'Patent searching is recorded separately because PATENTSCOPE and Google Patents do not expose equivalent unauthenticated APIs.',
    'Citation chaining, CPC/IPC classification searching, non-English synonyms, and legal claim construction remain open.',
  ],
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(log, null, 2)}\n`);
console.log(`Prior-art search log written: ${outputPath}`);
