/**
 * DOI (Digital Object Identifier) Resolver
 * Client-side resolution using CrossRef API
 *
 * Reference: https://www.crossref.org/documentation/retrieve-metadata/
 */

import { ResolvedCitation } from './types';

const CROSSREF_API_BASE = 'https://api.crossref.org/works';
const CROSSREF_TIMEOUT = 10000; // 10 seconds

/**
 * Parse CrossRef API response to Darwin-MFC Reference format
 * @param data - CrossRef API response data
 * @returns ResolvedCitation with parsed data
 */
function parseCrossRefResponse(data: any): ResolvedCitation | null {
  try {
    if (!data || !data.message) {
      return null;
    }

    const msg = data.message;

    // Extract basic information
    const title = msg.title ? msg.title[0] : undefined;
    const year = msg.issued?.['date-parts']?.[0]?.[0];
    const doi = msg.DOI;

    // Extract authors
    let authors: string[] | undefined;
    if (msg.author && Array.isArray(msg.author) && msg.author.length > 0) {
      authors = msg.author.map((author: any) => {
        const parts: string[] = [];
        if (author.given) parts.push(author.given);
        if (author.family) parts.push(author.family);
        return parts.join(' ');
      });
    }

    // Extract journal/container information
    const containerTitle = msg['container-title']?.[0];
    const volume = msg.volume?.toString();
    const issue = msg.issue?.toString();

    // Extract page information
    let pages: string | undefined;
    if (msg.page) {
      pages = msg.page;
    } else if (msg['article-number']) {
      pages = `e${msg['article-number']}`;
    }

    // Extract URL
    let url: string | undefined;
    if (msg.URL) {
      url = msg.URL;
    } else if (doi) {
      url = `https://doi.org/${doi}`;
    }

    // Extract ISSN
    const issn = msg.ISSN?.[0];

    // Build resolved citation
    const citation: ResolvedCitation = {
      title: title || 'Unknown Title',
      year,
      doi,
      url,
      issn,
    };

    if (authors) citation.authors = authors;
    if (containerTitle) citation.journal = containerTitle;
    if (volume) citation.volume = volume;
    if (issue) citation.issue = issue;
    if (pages) citation.pages = pages;

    return citation;
  } catch (error) {
    console.error('Error parsing CrossRef response:', error);
    return null;
  }
}

/**
 * Fetch citation metadata from CrossRef using DOI
 * @param doi - Digital Object Identifier (with or without "doi:" prefix)
 * @returns Promise resolving to ResolvedCitation or null if not found/error
 */
export async function resolveDOI(doi: string): Promise<ResolvedCitation | null> {
  if (!doi || typeof doi !== 'string') {
    console.error('Invalid DOI provided');
    return null;
  }

  // Clean DOI input (remove "doi:" prefix if present)
  const cleanDoi = doi.replace(/^doi:\s*/i, '').trim();

  if (!cleanDoi) {
    console.error('DOI appears to be empty after cleaning');
    return null;
  }

  try {
    const encodedDoi = encodeURIComponent(cleanDoi);
    const url = `${CROSSREF_API_BASE}/${encodedDoi}`;

    // Add timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CROSSREF_TIMEOUT);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`CrossRef API returned status ${response.status} for DOI: ${cleanDoi}`);
      return null;
    }

    const data = await response.json();
    return parseCrossRefResponse(data);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('DOI resolution timeout');
      } else {
        console.error('Error resolving DOI:', error.message);
      }
    }
    return null;
  }
}

/**
 * Format DOI as HTTP URL
 * @param doi - Digital Object Identifier
 * @returns Full DOI URL (https://doi.org/...)
 */
export function formatDOIUrl(doi: string): string {
  if (!doi) return '';

  const cleanDoi = doi.replace(/^(https?:\/\/)?(doi\.org\/)?/i, '').trim();
  return `https://doi.org/${cleanDoi}`;
}

/**
 * Validate DOI format (basic check)
 * @param doi - Digital Object Identifier to validate
 * @returns true if DOI format appears valid
 */
export function isValidDOI(doi: string): boolean {
  if (!doi || typeof doi !== 'string') {
    return false;
  }

  // DOI pattern: typically starts with 10. followed by publisher number, then slash
  const doiPattern = /^(?:(?:https?:\/\/)?(?:dx\.)?doi\.org\/)?(?:doi:)?(?:10\.\S+\/\S+)$/i;
  return doiPattern.test(doi);
}

/**
 * Batch resolve multiple DOIs
 * @param dois - Array of DOI strings to resolve
 * @returns Promise resolving to array of ResolvedCitation objects (may include nulls for failed resolutions)
 */
export async function resolveDOIBatch(dois: string[]): Promise<(ResolvedCitation | null)[]> {
  if (!Array.isArray(dois) || dois.length === 0) {
    return [];
  }

  // Resolve with concurrency limit to avoid rate limiting
  const concurrencyLimit = 3;
  const results: (ResolvedCitation | null)[] = [];
  const queue = [...dois];

  while (queue.length > 0) {
    const batch = queue.splice(0, concurrencyLimit);
    const batchResults = await Promise.all(batch.map((doi) => resolveDOI(doi)));
    results.push(...batchResults);
  }

  return results;
}

/**
 * Extract DOI from URL or text
 * @param text - Text that may contain a DOI
 * @returns Extracted DOI or null
 */
export function extractDOI(text: string): string | null {
  if (!text || typeof text !== 'string') {
    return null;
  }

  // Match DOI pattern in text
  const doiMatch = text.match(/(?:(?:https?:\/\/)?(?:dx\.)?doi\.org\/)?(?:doi:)?(10\.\S+\/\S+)/i);
  return doiMatch ? doiMatch[1] : null;
}
