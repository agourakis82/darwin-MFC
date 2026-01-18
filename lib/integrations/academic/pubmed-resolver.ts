/**
 * PubMed/NCBI PMID Resolver
 * Client-side resolution using NCBI E-utilities API
 *
 * Reference: https://www.ncbi.nlm.nih.gov/books/NBK25499/
 */

import { ResolvedCitation } from './types';

const NCBI_EUTILS_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const NCBI_TIMEOUT = 10000; // 10 seconds
const NCBI_TOOL = 'darwin-mfc'; // Required by NCBI
const NCBI_EMAIL = 'noreply@agourakis.med.br'; // Required by NCBI

/**
 * Parse NCBI Entrez response to Darwin-MFC Reference format
 * @param xmlResponse - XML response from NCBI
 * @returns ResolvedCitation with parsed data
 */
function parseNcbiResponse(xmlResponse: string): ResolvedCitation | null {
  try {
    // Parse XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlResponse, 'text/xml');

    // Check for parse errors
    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      console.error('Error parsing NCBI XML response');
      return null;
    }

    const medlineCitation = xmlDoc.querySelector('MedlineCitation');
    if (!medlineCitation) {
      return null;
    }

    const article = medlineCitation.querySelector('Article');
    if (!article) {
      return null;
    }

    // Extract title
    const titleElement = article.querySelector('ArticleTitle');
    const title = titleElement?.textContent || 'Unknown Title';

    // Extract authors
    const authors: string[] = [];
    const authorList = article.querySelector('AuthorList');
    if (authorList) {
      authorList.querySelectorAll('Author').forEach((authorEl) => {
        const lastName = authorEl.querySelector('LastName')?.textContent || '';
        const foreName = authorEl.querySelector('ForeName')?.textContent || '';
        const initials = authorEl.querySelector('Initials')?.textContent || '';

        if (lastName) {
          const fullName = foreName ? `${lastName} ${foreName}` : lastName;
          authors.push(fullName);
        } else if (initials) {
          // Collective name (organization)
          const collectiveName = authorEl.querySelector('CollectiveName')?.textContent || '';
          if (collectiveName) {
            authors.push(collectiveName);
          }
        }
      });
    }

    // Extract publication date
    let year: number | undefined;
    const pubDate = article.querySelector('PubDate');
    if (pubDate) {
      const yearEl = pubDate.querySelector('Year');
      if (yearEl?.textContent) {
        year = parseInt(yearEl.textContent, 10);
      }
    }

    // Extract journal information
    const journal = article.querySelector('Journal Title')?.textContent;
    const journalIssue = article.querySelector('JournalIssue');
    const volume = journalIssue?.querySelector('Volume')?.textContent;
    const issue = journalIssue?.querySelector('Issue')?.textContent;

    // Extract pages
    const pagination = article.querySelector('Pagination');
    let pages: string | undefined;
    if (pagination) {
      const mpi = pagination.querySelector('MedlinePgn');
      if (mpi?.textContent) {
        pages = mpi.textContent;
      }
    }

    // Extract PMID
    const pmidElement = medlineCitation.querySelector('PMID');
    const pmid = pmidElement?.textContent;

    // Extract URL (PubMed)
    let url: string | undefined;
    if (pmid) {
      url = formatPubMedUrl(pmid);
    }

    // Build resolved citation
    const citation: ResolvedCitation = {
      title,
      year,
      pmid,
      url,
    };

    if (authors.length > 0) citation.authors = authors;
    if (journal) citation.journal = journal;
    if (volume) citation.volume = volume;
    if (issue) citation.issue = issue;
    if (pages) citation.pages = pages;

    return citation;
  } catch (error) {
    console.error('Error parsing NCBI response:', error);
    return null;
  }
}

/**
 * Fetch citation metadata from PubMed using PMID
 * @param pmid - PubMed ID (with or without "PMID:" prefix)
 * @returns Promise resolving to ResolvedCitation or null if not found/error
 */
export async function resolvePMID(pmid: string): Promise<ResolvedCitation | null> {
  if (!pmid || typeof pmid !== 'string') {
    console.error('Invalid PMID provided');
    return null;
  }

  // Clean PMID input (remove "PMID:" prefix if present)
  const cleanPMID = pmid.replace(/^pmid:\s*/i, '').trim();

  if (!cleanPMID || !/^\d+$/.test(cleanPMID)) {
    console.error('PMID appears to be invalid (must be numeric)');
    return null;
  }

  try {
    // Step 1: Search for PMID to get UID
    const searchUrl = new URL(`${NCBI_EUTILS_BASE}/esearch.fcgi`);
    searchUrl.searchParams.append('db', 'pubmed');
    searchUrl.searchParams.append('term', cleanPMID);
    searchUrl.searchParams.append('tool', NCBI_TOOL);
    searchUrl.searchParams.append('email', NCBI_EMAIL);
    searchUrl.searchParams.append('rettype', 'json');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), NCBI_TIMEOUT);

    const searchResponse = await fetch(searchUrl.toString(), {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!searchResponse.ok) {
      console.warn(`NCBI search returned status ${searchResponse.ok}`);
      return null;
    }

    // Step 2: Fetch full record using efetch
    const fetchUrl = new URL(`${NCBI_EUTILS_BASE}/efetch.fcgi`);
    fetchUrl.searchParams.append('db', 'pubmed');
    fetchUrl.searchParams.append('id', cleanPMID);
    fetchUrl.searchParams.append('rettype', 'medline');
    fetchUrl.searchParams.append('retmode', 'xml');
    fetchUrl.searchParams.append('tool', NCBI_TOOL);
    fetchUrl.searchParams.append('email', NCBI_EMAIL);

    const fetchController = new AbortController();
    const fetchTimeoutId = setTimeout(() => fetchController.abort(), NCBI_TIMEOUT);

    const fetchResponse = await fetch(fetchUrl.toString(), {
      signal: fetchController.signal,
    });

    clearTimeout(fetchTimeoutId);

    if (!fetchResponse.ok) {
      console.warn(`NCBI fetch returned status ${fetchResponse.status}`);
      return null;
    }

    const xmlText = await fetchResponse.text();
    return parseNcbiResponse(xmlText);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('PMID resolution timeout');
      } else {
        console.error('Error resolving PMID:', error.message);
      }
    }
    return null;
  }
}

/**
 * Format PMID as PubMed URL
 * @param pmid - PubMed ID
 * @returns Full PubMed URL
 */
export function formatPubMedUrl(pmid: string): string {
  if (!pmid) return '';

  const cleanPMID = pmid.replace(/^(https?:\/\/)?(pubmed\.ncbi\.nlm\.nih\.gov\/)?/i, '').trim();
  return `https://pubmed.ncbi.nlm.nih.gov/${cleanPMID}/`;
}

/**
 * Validate PMID format (basic check)
 * @param pmid - PubMed ID to validate
 * @returns true if PMID format appears valid
 */
export function isValidPMID(pmid: string): boolean {
  if (!pmid || typeof pmid !== 'string') {
    return false;
  }

  // PMID must be numeric
  const cleanPMID = pmid.replace(/^pmid:\s*/i, '').trim();
  return /^\d{1,8}$/.test(cleanPMID);
}

/**
 * Batch resolve multiple PMIDs with concurrency limiting
 * @param pmids - Array of PMID strings to resolve
 * @returns Promise resolving to array of ResolvedCitation objects (may include nulls)
 */
export async function resolvePMIDBatch(pmids: string[]): Promise<(ResolvedCitation | null)[]> {
  if (!Array.isArray(pmids) || pmids.length === 0) {
    return [];
  }

  // Resolve with concurrency limit to avoid NCBI rate limiting
  const concurrencyLimit = 2; // NCBI recommends no more than 3 requests/second
  const results: (ResolvedCitation | null)[] = [];
  const queue = [...pmids];

  while (queue.length > 0) {
    const batch = queue.splice(0, concurrencyLimit);
    const batchResults = await Promise.all(batch.map((pmid) => resolvePMID(pmid)));
    results.push(...batchResults);

    // Add delay between batches to respect NCBI rate limiting
    if (queue.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  return results;
}

/**
 * Extract PMID from text or URL
 * @param text - Text that may contain a PMID
 * @returns Extracted PMID or null
 */
export function extractPMID(text: string): string | null {
  if (!text || typeof text !== 'string') {
    return null;
  }

  // Match PMID patterns in text
  const pmidMatch = text.match(/(?:(?:https?:\/\/)?(?:pubmed\.ncbi\.nlm\.nih\.gov\/)?)?(?:pmid:)?(\d{1,8})/i);
  return pmidMatch ? pmidMatch[1] : null;
}
