/**
 * PUBMED CITATION EXTRACTOR - DARWIN-MFC
 * =======================================
 *
 * Automated citation extraction and verification using PubMed E-utilities.
 * Fetches full citation data, validates PMIDs/DOIs, and formats references.
 *
 * Part of SOTA Strategic Plan - Phase 3
 *
 * API Documentation: https://www.ncbi.nlm.nih.gov/books/NBK25500/
 */

import type { Reference, ReferenceType } from '@/lib/types/references';

// =============================================================================
// TYPES
// =============================================================================

export interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  abstract?: string;
  keywords?: string[];
  meshTerms?: string[];
  publicationType?: string[];
}

export interface SearchResult {
  query: string;
  totalResults: number;
  articles: PubMedArticle[];
  webEnvId?: string;
  queryKey?: string;
}

export interface CitationVerification {
  original: string;
  verified: boolean;
  pubmedData?: PubMedArticle;
  formattedReference?: Reference;
  errors?: string[];
}

// =============================================================================
// PUBMED E-UTILITIES API
// =============================================================================

const PUBMED_BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const RATE_LIMIT_MS = 334; // Max 3 requests/second without API key

/**
 * Search PubMed for articles matching a query
 */
export async function searchPubMed(
  query: string,
  options: {
    maxResults?: number;
    sortBy?: 'relevance' | 'date';
    dateRange?: { from: number; to: number };
  } = {}
): Promise<SearchResult> {
  const maxResults = options.maxResults ?? 10;
  const sortBy = options.sortBy ?? 'relevance';

  // Build search URL
  const params = new URLSearchParams({
    db: 'pubmed',
    term: query,
    retmax: maxResults.toString(),
    sort: sortBy === 'date' ? 'pub+date' : 'relevance',
    retmode: 'json',
    usehistory: 'y',
  });

  if (options.dateRange) {
    params.set('mindate', options.dateRange.from.toString());
    params.set('maxdate', options.dateRange.to.toString());
  }

  try {
    // Step 1: Search to get PMIDs
    const searchUrl = `${PUBMED_BASE_URL}/esearch.fcgi?${params}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    const pmids: string[] = searchData.esearchresult?.idlist || [];
    const totalResults = parseInt(searchData.esearchresult?.count || '0', 10);
    const webEnvId = searchData.esearchresult?.webenv;
    const queryKey = searchData.esearchresult?.querykey;

    if (pmids.length === 0) {
      return { query, totalResults: 0, articles: [] };
    }

    // Step 2: Fetch article details
    await delay(RATE_LIMIT_MS);
    const articles = await fetchArticlesByPMID(pmids);

    return {
      query,
      totalResults,
      articles,
      webEnvId,
      queryKey,
    };
  } catch (error) {
    console.error('PubMed search error:', error);
    return { query, totalResults: 0, articles: [] };
  }
}

/**
 * Fetch article details by PMID(s)
 */
export async function fetchArticlesByPMID(pmids: string[]): Promise<PubMedArticle[]> {
  if (pmids.length === 0) return [];

  const params = new URLSearchParams({
    db: 'pubmed',
    id: pmids.join(','),
    retmode: 'xml',
    rettype: 'abstract',
  });

  try {
    const response = await fetch(`${PUBMED_BASE_URL}/efetch.fcgi?${params}`);
    const xml = await response.text();
    return parseArticlesXML(xml);
  } catch (error) {
    console.error('PubMed fetch error:', error);
    return [];
  }
}

/**
 * Parse PubMed XML response
 */
function parseArticlesXML(xml: string): PubMedArticle[] {
  const articles: PubMedArticle[] = [];

  // Simple regex-based XML parsing (for Node.js compatibility)
  const articleMatches = xml.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g);

  for (const match of articleMatches) {
    const articleXml = match[1];

    const pmid = extractXMLValue(articleXml, 'PMID') || '';
    const title = extractXMLValue(articleXml, 'ArticleTitle') || '';
    const journal = extractXMLValue(articleXml, 'Title') || // Journal title
                    extractXMLValue(articleXml, 'ISOAbbreviation') || '';
    const year = parseInt(extractXMLValue(articleXml, 'Year') || '0', 10);
    const volume = extractXMLValue(articleXml, 'Volume');
    const issue = extractXMLValue(articleXml, 'Issue');
    const doi = extractArticleId(articleXml, 'doi');

    // Parse pages
    const medlinePgn = extractXMLValue(articleXml, 'MedlinePgn');
    const pages = medlinePgn || undefined;

    // Parse authors
    const authors: string[] = [];
    const authorMatches = articleXml.matchAll(/<Author[^>]*>([\s\S]*?)<\/Author>/g);
    for (const authorMatch of authorMatches) {
      const lastName = extractXMLValue(authorMatch[1], 'LastName') || '';
      const initials = extractXMLValue(authorMatch[1], 'Initials') || '';
      if (lastName) {
        authors.push(`${lastName} ${initials}`.trim());
      }
    }

    // Parse abstract
    const abstractText = extractXMLValue(articleXml, 'AbstractText');

    // Parse MeSH terms
    const meshTerms: string[] = [];
    const meshMatches = articleXml.matchAll(/<DescriptorName[^>]*>([\s\S]*?)<\/DescriptorName>/g);
    for (const meshMatch of meshMatches) {
      meshTerms.push(meshMatch[1].trim());
    }

    if (pmid) {
      articles.push({
        pmid,
        title: cleanXMLText(title),
        authors,
        journal: cleanXMLText(journal),
        year,
        volume,
        issue,
        pages,
        doi,
        abstract: abstractText ? cleanXMLText(abstractText) : undefined,
        meshTerms: meshTerms.length > 0 ? meshTerms : undefined,
      });
    }
  }

  return articles;
}

/**
 * Extract value from XML tag
 */
function extractXMLValue(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? match[1].trim() : undefined;
}

/**
 * Extract article ID (DOI, PMC, etc.)
 */
function extractArticleId(xml: string, idType: string): string | undefined {
  const match = xml.match(new RegExp(`<ArticleId IdType="${idType}">([^<]+)</ArticleId>`, 'i'));
  return match ? match[1].trim() : undefined;
}

/**
 * Clean XML text (remove tags, decode entities)
 */
function cleanXMLText(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .trim();
}

// =============================================================================
// CITATION VERIFICATION
// =============================================================================

/**
 * Verify a citation string against PubMed
 */
export async function verifyCitation(citationText: string): Promise<CitationVerification> {
  const result: CitationVerification = {
    original: citationText,
    verified: false,
    errors: [],
  };

  try {
    // Try to extract PMID
    const pmidMatch = citationText.match(/PMID:\s*(\d+)/i);
    if (pmidMatch) {
      const pmid = pmidMatch[1];
      const articles = await fetchArticlesByPMID([pmid]);

      if (articles.length > 0) {
        result.verified = true;
        result.pubmedData = articles[0];
        result.formattedReference = pubmedToReference(articles[0]);
        return result;
      } else {
        result.errors?.push(`PMID ${pmid} not found in PubMed`);
      }
    }

    // Try to extract DOI and search
    const doiMatch = citationText.match(/10\.\d+\/[^\s,]+/);
    if (doiMatch) {
      const doi = doiMatch[0];
      await delay(RATE_LIMIT_MS);
      const searchResult = await searchPubMed(`${doi}[doi]`, { maxResults: 1 });

      if (searchResult.articles.length > 0) {
        result.verified = true;
        result.pubmedData = searchResult.articles[0];
        result.formattedReference = pubmedToReference(searchResult.articles[0]);
        return result;
      } else {
        result.errors?.push(`DOI ${doi} not found in PubMed`);
      }
    }

    // Try to search by title/author
    const titleMatch = citationText.match(/^([^.]+)\./);
    if (titleMatch) {
      await delay(RATE_LIMIT_MS);
      const searchQuery = titleMatch[1].substring(0, 100);
      const searchResult = await searchPubMed(searchQuery, { maxResults: 3 });

      if (searchResult.articles.length > 0) {
        // Check if any article matches closely
        const bestMatch = findBestMatch(citationText, searchResult.articles);
        if (bestMatch) {
          result.verified = true;
          result.pubmedData = bestMatch;
          result.formattedReference = pubmedToReference(bestMatch);
          return result;
        }
      }
    }

    result.errors?.push('Could not verify citation against PubMed');
  } catch (error) {
    result.errors?.push(`Verification error: ${error}`);
  }

  return result;
}

/**
 * Verify multiple citations in batch
 */
export async function verifyCitationsBatch(
  citations: string[],
  options: {
    delayMs?: number;
    onProgress?: (current: number, total: number) => void;
  } = {}
): Promise<CitationVerification[]> {
  const delayMs = options.delayMs ?? 500;
  const results: CitationVerification[] = [];

  for (let i = 0; i < citations.length; i++) {
    options.onProgress?.(i + 1, citations.length);
    const result = await verifyCitation(citations[i]);
    results.push(result);

    if (i < citations.length - 1) {
      await delay(delayMs);
    }
  }

  return results;
}

/**
 * Find best matching article
 */
function findBestMatch(citation: string, articles: PubMedArticle[]): PubMedArticle | null {
  const normalizedCitation = citation.toLowerCase();

  for (const article of articles) {
    // Check title similarity
    const normalizedTitle = article.title.toLowerCase();
    const titleWords = normalizedTitle.split(/\s+/).filter(w => w.length > 3);
    const matchingWords = titleWords.filter(w => normalizedCitation.includes(w));

    if (matchingWords.length / titleWords.length > 0.5) {
      return article;
    }

    // Check author match
    for (const author of article.authors) {
      if (normalizedCitation.includes(author.toLowerCase().split(' ')[0])) {
        return article;
      }
    }
  }

  return null;
}

// =============================================================================
// REFERENCE FORMATTING
// =============================================================================

/**
 * Convert PubMed article to Darwin-MFC Reference format
 */
export function pubmedToReference(article: PubMedArticle): Reference {
  // Determine reference type
  let refType: ReferenceType = 'artigo';
  if (article.publicationType?.some(t =>
    t.toLowerCase().includes('guideline') ||
    t.toLowerCase().includes('practice guideline')
  )) {
    refType = 'diretriz';
  }

  return {
    id: `ref-pmid-${article.pmid}`,
    type: refType,
    title: article.title,
    authors: article.authors,
    year: article.year,
    journal: article.journal,
    volume: article.volume,
    pages: article.pages,
    doi: article.doi,
    note: article.pmid ? `PMID: ${article.pmid}` : undefined,
  };
}

/**
 * Format article in Vancouver style
 */
export function formatVancouver(article: PubMedArticle): string {
  const parts: string[] = [];

  // Authors (max 6, then et al.)
  if (article.authors.length > 0) {
    const authorList = article.authors.length > 6
      ? [...article.authors.slice(0, 6), 'et al'].join(', ')
      : article.authors.join(', ');
    parts.push(authorList);
  }

  // Title
  parts.push(article.title);

  // Journal, year
  let journalPart = article.journal;
  if (article.year) {
    journalPart += `. ${article.year}`;
  }
  parts.push(journalPart);

  // Volume, issue, pages
  const volumeParts: string[] = [];
  if (article.volume) {
    let vol = article.volume;
    if (article.issue) {
      vol += `(${article.issue})`;
    }
    volumeParts.push(vol);
  }
  if (article.pages) {
    volumeParts.push(article.pages);
  }
  if (volumeParts.length > 0) {
    parts.push(volumeParts.join(':'));
  }

  let citation = parts.join('. ');

  // Add DOI or PMID
  if (article.doi) {
    citation += `. doi: ${article.doi}`;
  }
  if (article.pmid) {
    citation += `. PMID: ${article.pmid}`;
  }

  return citation;
}

// =============================================================================
// SEARCH HELPERS
// =============================================================================

/**
 * Search for clinical guidelines on a topic
 */
export async function searchGuidelines(
  topic: string,
  options: {
    maxResults?: number;
    yearFrom?: number;
  } = {}
): Promise<SearchResult> {
  const yearFrom = options.yearFrom ?? new Date().getFullYear() - 5;
  const query = `(${topic}) AND ("practice guideline"[pt] OR "guideline"[pt]) AND ${yearFrom}:3000[dp]`;

  return searchPubMed(query, {
    maxResults: options.maxResults ?? 10,
    sortBy: 'date',
  });
}

/**
 * Search for systematic reviews on a topic
 */
export async function searchSystematicReviews(
  topic: string,
  options: {
    maxResults?: number;
    yearFrom?: number;
  } = {}
): Promise<SearchResult> {
  const yearFrom = options.yearFrom ?? new Date().getFullYear() - 5;
  const query = `(${topic}) AND ("systematic review"[pt] OR "meta-analysis"[pt]) AND ${yearFrom}:3000[dp]`;

  return searchPubMed(query, {
    maxResults: options.maxResults ?? 10,
    sortBy: 'date',
  });
}

/**
 * Search for Brazilian guidelines
 */
export async function searchBrazilianGuidelines(
  topic: string,
  options: {
    maxResults?: number;
  } = {}
): Promise<SearchResult> {
  const query = `(${topic}) AND (Brazil[ad] OR Brazilian[tiab]) AND ("practice guideline"[pt] OR "guideline"[tiab] OR "diretriz"[tiab])`;

  return searchPubMed(query, {
    maxResults: options.maxResults ?? 10,
    sortBy: 'date',
  });
}

// =============================================================================
// UTILITIES
// =============================================================================

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Export search results to JSON
 */
export function exportSearchResults(results: SearchResult): string {
  return JSON.stringify({
    query: results.query,
    totalResults: results.totalResults,
    fetchedCount: results.articles.length,
    articles: results.articles.map(a => ({
      pmid: a.pmid,
      title: a.title,
      authors: a.authors.join(', '),
      journal: a.journal,
      year: a.year,
      doi: a.doi,
      vancouver: formatVancouver(a),
    })),
  }, null, 2);
}
