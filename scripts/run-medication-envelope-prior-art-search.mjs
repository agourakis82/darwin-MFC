import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(
  root,
  process.argv[2] || 'docs/research/medication-envelope/search-log-2026-08-01.json',
);
const userAgent = 'Darwin-MFC-Medication-Envelope/0.1 (formal prior-art discovery; https://mfc.agourakis.med.br)';
const queries = [
  ['RXE-01', 'proof-carrying prescribing', '"proof-carrying" AND (prescribing OR prescription OR medication)'],
  ['RXE-02', 'dose safety envelope', '"dose safety envelope" OR (dose AND "safety envelope")'],
  ['RXE-03', 'clinical constraint compiler', '"clinical constraint compiler" OR (clinical AND constraint AND compiler)'],
  ['RXE-04', 'executable guideline provenance', '"executable guideline" AND (provenance OR traceability OR evidence)'],
  ['RXE-05', 'assurance case medication', '"assurance case" AND (medication OR prescribing OR prescription)'],
];

const sleep = milliseconds => new Promise(resolvePromise => setTimeout(resolvePromise, milliseconds));

async function getJson(url) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, { headers: { 'user-agent': userAgent, accept: 'application/json' } });
    if (response.ok) return { data: await response.json(), error: null };
    if (response.status !== 429 || attempt === 3) return { data: null, error: `${response.status} ${response.statusText}` };
    await sleep(1000 * (2 ** attempt));
  }
  return { data: null, error: 'unreachable-retry-state' };
}

function manualDatabase(name, urlTemplate, query) {
  return {
    name,
    mode: 'manual-screening-required',
    searchUrl: urlTemplate.replace('{query}', encodeURIComponent(query)),
    resultCount: null,
    records: [],
  };
}

const runs = [];
for (const [id, concept, query] of queries) {
  const crossrefUrl = new URL('https://api.crossref.org/works');
  crossrefUrl.searchParams.set('query.bibliographic', query);
  crossrefUrl.searchParams.set('rows', '25');
  crossrefUrl.searchParams.set('select', 'DOI,title,published,type,URL');
  const europePmcUrl = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
  europePmcUrl.searchParams.set('query', query);
  europePmcUrl.searchParams.set('format', 'json');
  europePmcUrl.searchParams.set('pageSize', '25');
  europePmcUrl.searchParams.set('resultType', 'core');
  const pubmedUrl = new URL('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi');
  pubmedUrl.searchParams.set('db', 'pubmed');
  pubmedUrl.searchParams.set('term', query);
  pubmedUrl.searchParams.set('retmode', 'json');
  pubmedUrl.searchParams.set('retmax', '25');

  const [crossrefResult, europePmcResult, pubmedResult] = await Promise.all([
    getJson(crossrefUrl),
    getJson(europePmcUrl),
    getJson(pubmedUrl),
  ]);
  const crossref = crossrefResult.data;
  const europePmc = europePmcResult.data;
  const pubmed = pubmedResult.data;
  runs.push({
    id,
    concept,
    query,
    databases: [
      {
        name: 'Crossref',
        mode: 'api',
        searchUrl: crossrefUrl.toString(),
        error: crossrefResult.error,
        resultCount: crossref?.message?.['total-results'] ?? null,
        records: (crossref?.message?.items || []).map(item => ({
          title: Array.isArray(item.title) ? item.title[0] : item.title,
          year: item.published?.['date-parts']?.[0]?.[0] ?? null,
          doi: item.DOI ?? null,
          type: item.type ?? null,
          url: item.URL ?? null,
        })),
      },
      {
        name: 'Europe PMC',
        mode: 'api',
        searchUrl: europePmcUrl.toString(),
        error: europePmcResult.error,
        resultCount: europePmc ? Number(europePmc.hitCount || 0) : null,
        records: (europePmc?.resultList?.result || []).map(item => ({
          title: item.title ?? null,
          year: item.pubYear ? Number(item.pubYear) : null,
          doi: item.doi ?? null,
          pmid: item.pmid ?? null,
          url: item.doi
            ? `https://doi.org/${item.doi}`
            : item.pmid
              ? `https://pubmed.ncbi.nlm.nih.gov/${item.pmid}/`
              : null,
        })),
      },
      {
        name: 'PubMed',
        mode: 'api-identifiers',
        searchUrl: pubmedUrl.toString(),
        error: pubmedResult.error,
        resultCount: pubmed ? Number(pubmed.esearchresult?.count || 0) : null,
        records: (pubmed?.esearchresult?.idlist || []).map(pmid => ({
          pmid,
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        })),
      },
      manualDatabase('IEEE Xplore', 'https://ieeexplore.ieee.org/search/searchresult.jsp?queryText={query}', query),
      manualDatabase('ACM Digital Library', 'https://dl.acm.org/action/doSearch?AllField={query}', query),
      manualDatabase('arXiv', 'https://arxiv.org/search/?query={query}&searchtype=all', query),
      manualDatabase('WIPO PATENTSCOPE', 'https://patentscope.wipo.int/search/en/result.jsf?query={query}', query),
      manualDatabase('Espacenet', 'https://worldwide.espacenet.com/patent/search?q={query}', query),
      manualDatabase('Google Patents', 'https://patents.google.com/?q={query}', query),
      manualDatabase('INPI Brasil', 'https://busca.inpi.gov.br/pePI/servlet/PatenteServletController?Action=SearchBasica&query={query}', query),
    ],
  });
  await sleep(400);
}

const log = {
  schemaVersion: 'darwin.medication-envelope-prior-art-search-log.v1',
  searchOpenedAt: new Date().toISOString(),
  status: 'OPEN',
  claimStatus: 'NO_PIONEERING_CLAIM',
  protocol: 'PRISMA-S-inspired discovery search; not a systematic review, freedom-to-operate analysis, or legal novelty opinion.',
  databases: ['PubMed', 'Europe PMC', 'Crossref', 'IEEE Xplore', 'ACM Digital Library', 'arXiv', 'WIPO PATENTSCOPE', 'Espacenet', 'Google Patents', 'INPI Brasil'],
  queries: runs,
  nextActions: [
    'Dual-reviewer title and abstract screening.',
    'Backward and forward citation chaining.',
    'CPC and IPC classification expansion for patent families.',
    'Claim-by-claim novelty matrix and legal review before any public originality claim.',
  ],
  limitations: [
    'API result ranking is retained as returned and has not been adjudicated.',
    'IEEE, ACM, arXiv, and patent databases require manual screening in their native interfaces.',
    'Search strings are discovery queries and do not substitute for professional patent searching.',
  ],
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(log, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, status: log.status, queries: runs.length, databases: log.databases.length }, null, 2));
