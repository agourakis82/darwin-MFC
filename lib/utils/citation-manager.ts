/**
 * Citation Manager Utility
 *
 * Provides comprehensive citation formatting, validation, and link generation
 * for academic references following Vancouver style guidelines.
 *
 * Features:
 * - Vancouver-style citation formatting
 * - PubMed/DOI link generation
 * - Citation validation
 * - Copy-to-clipboard formatting
 */

import type { Reference, Citation } from '@/lib/types/references';

// ============================================
// LINK GENERATION
// ============================================

/**
 * Generate PubMed URL from PMID
 */
export function generatePubMedUrl(pmid: string): string {
  const cleanPmid = pmid.replace(/[^\d]/g, '');
  return `https://pubmed.ncbi.nlm.nih.gov/${cleanPmid}`;
}

/**
 * Generate DOI URL from DOI string
 */
export function generateDoiUrl(doi: string): string {
  // Handle cases where DOI might already include the URL prefix
  const cleanDoi = doi
    .replace(/^https?:\/\/doi\.org\//i, '')
    .replace(/^doi:/i, '')
    .trim();
  return `https://doi.org/${cleanDoi}`;
}

/**
 * Check if a string is a valid PMID (numeric)
 */
export function isValidPmid(pmid: string): boolean {
  return /^\d+$/.test(pmid.trim());
}

/**
 * Check if a string is a valid DOI format
 */
export function isValidDoi(doi: string): boolean {
  // DOI format: 10.prefix/suffix
  return /^10\.\d{4,}(\.\d+)*\/[^\s]+$/.test(doi.trim());
}

// ============================================
// VANCOUVER STYLE FORMATTING
// ============================================

/**
 * Format authors in Vancouver style
 * - Up to 6 authors: list all
 * - More than 6: first 6 + et al.
 */
export function formatAuthorsVancouver(authors: string[]): string {
  if (!authors || authors.length === 0) {
    return '';
  }

  // Convert each author to Vancouver format: LastName Initials
  const formattedAuthors = authors.map(formatSingleAuthorVancouver);

  if (formattedAuthors.length <= 6) {
    return formattedAuthors.join(', ');
  }

  return `${formattedAuthors.slice(0, 6).join(', ')}, et al.`;
}

/**
 * Format a single author name to Vancouver style
 * Input: "John Smith" or "Smith, John" or "Smith J"
 * Output: "Smith J"
 */
function formatSingleAuthorVancouver(author: string): string {
  // Already in format "LastName Initials" (e.g., "Smith J")
  if (/^[A-Z][a-z]+ [A-Z]+$/.test(author)) {
    return author;
  }

  // Organization names (no comma, multiple words, no clear first/last)
  if (!author.includes(',') && author.split(' ').length > 2) {
    return author;
  }

  // Handle "LastName, FirstName" format
  if (author.includes(',')) {
    const [lastName, firstNames] = author.split(',').map(s => s.trim());
    const initials = firstNames
      .split(/[\s-]+/)
      .map(n => n.charAt(0).toUpperCase())
      .join('');
    return `${lastName} ${initials}`;
  }

  // Handle "FirstName LastName" format
  const parts = author.split(' ').filter(p => p.length > 0);
  if (parts.length === 1) {
    return parts[0];
  }

  const lastName = parts[parts.length - 1];
  const initials = parts
    .slice(0, -1)
    .map(n => n.charAt(0).toUpperCase())
    .join('');

  return `${lastName} ${initials}`;
}

/**
 * Format a complete reference in Vancouver style
 */
export function formatReferenceVancouver(ref: Reference, number?: number): string {
  const parts: string[] = [];

  // Number prefix
  if (number !== undefined) {
    parts.push(`${number}.`);
  }

  // Authors
  if (ref.authors && ref.authors.length > 0) {
    parts.push(formatAuthorsVancouver(ref.authors) + '.');
  }

  // Title
  parts.push(ref.title + '.');

  // Journal/Publisher (italic in actual rendering)
  if (ref.journal) {
    parts.push(ref.journal + '.');
  } else if (ref.publisher) {
    parts.push(ref.publisher + ';');
  }

  // Year
  if (ref.year) {
    parts.push(`${ref.year}`);
  }

  // Volume and pages
  if (ref.volume) {
    parts.push(`;${ref.volume}`);
    if (ref.pages) {
      parts.push(`:${ref.pages}`);
    }
  } else if (ref.pages) {
    parts.push(`:${ref.pages}`);
  }

  // Legal number (for regulations/laws)
  if (ref.legalNumber) {
    parts.push(`[${ref.legalNumber}]`);
  }

  // DOI
  if (ref.doi) {
    parts.push(`doi: ${ref.doi}`);
  }

  // PMID
  if (ref.pmid) {
    parts.push(`PMID: ${ref.pmid}`);
  }

  // URL (if no DOI/PMID)
  if (ref.url && !ref.doi && !ref.pmid) {
    parts.push(`Available from: ${ref.url}`);
    if (ref.accessDate) {
      parts.push(`[Accessed ${formatAccessDate(ref.accessDate)}]`);
    }
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * Format access date for citations
 */
function formatAccessDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${year} ${month} ${day}`;
}

// ============================================
// CITATION VALIDATION
// ============================================

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate a reference for completeness and correctness
 */
export function validateReference(ref: Reference): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!ref.id) {
    errors.push('Reference ID is required');
  }
  if (!ref.title) {
    errors.push('Title is required');
  }
  if (!ref.year) {
    errors.push('Publication year is required');
  }
  if (!ref.type) {
    errors.push('Reference type is required');
  }

  // Type-specific validation
  if (ref.type === 'artigo') {
    if (!ref.journal) {
      warnings.push('Journal name recommended for articles');
    }
    if (!ref.authors || ref.authors.length === 0) {
      warnings.push('Authors recommended for articles');
    }
    if (!ref.doi && !ref.pmid) {
      warnings.push('DOI or PMID recommended for articles');
    }
  }

  // DOI format validation
  if (ref.doi && !isValidDoi(ref.doi)) {
    warnings.push('DOI format may be invalid');
  }

  // PMID format validation
  if (ref.pmid && !isValidPmid(ref.pmid)) {
    errors.push('PMID must be numeric');
  }

  // URL validation
  if (ref.url && !isValidUrl(ref.url)) {
    warnings.push('URL format may be invalid');
  }

  // Access date validation for web resources
  if ((ref.type === 'site' || ref.url) && !ref.accessDate) {
    warnings.push('Access date recommended for web resources');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate a citation object
 */
export function validateCitation(citation: Citation): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!citation.refId) {
    errors.push('Reference ID is required');
  }

  if (citation.qualityScore !== undefined) {
    if (citation.qualityScore < 0 || citation.qualityScore > 10) {
      errors.push('Quality score must be between 0 and 10');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============================================
// COPY TO CLIPBOARD FORMATTING
// ============================================

/**
 * Format reference for clipboard (plain text)
 */
export function formatReferenceForClipboard(ref: Reference): string {
  return formatReferenceVancouver(ref);
}

/**
 * Format multiple references for clipboard (numbered)
 */
export function formatReferencesForClipboard(refs: Reference[]): string {
  return refs
    .map((ref, index) => formatReferenceVancouver(ref, index + 1))
    .join('\n\n');
}

/**
 * Format reference as BibTeX
 */
export function formatReferenceBibTeX(ref: Reference): string {
  const type = mapTypeToBibTeX(ref.type);
  const key = ref.id.replace(/[^a-zA-Z0-9]/g, '_');

  const fields: string[] = [];

  if (ref.authors && ref.authors.length > 0) {
    fields.push(`  author = {${ref.authors.join(' and ')}}`);
  }
  fields.push(`  title = {${ref.title}}`);
  fields.push(`  year = {${ref.year}}`);

  if (ref.journal) {
    fields.push(`  journal = {${ref.journal}}`);
  }
  if (ref.volume) {
    fields.push(`  volume = {${ref.volume}}`);
  }
  if (ref.pages) {
    fields.push(`  pages = {${ref.pages}}`);
  }
  if (ref.doi) {
    fields.push(`  doi = {${ref.doi}}`);
  }
  if (ref.pmid) {
    fields.push(`  pmid = {${ref.pmid}}`);
  }
  if (ref.url) {
    fields.push(`  url = {${ref.url}}`);
  }
  if (ref.publisher) {
    fields.push(`  publisher = {${ref.publisher}}`);
  }

  return `@${type}{${key},\n${fields.join(',\n')}\n}`;
}

function mapTypeToBibTeX(type: string): string {
  const mapping: Record<string, string> = {
    artigo: 'article',
    livro: 'book',
    diretriz: 'manual',
    portaria: 'misc',
    lei: 'misc',
    nota_tecnica: 'techreport',
    site: 'online',
    relatorio: 'report',
  };
  return mapping[type] || 'misc';
}

// ============================================
// CITATION NUMBERING
// ============================================

/**
 * Create a citation number map from an array of reference IDs
 * Returns a map of refId -> citation number
 */
export function createCitationNumberMap(refIds: string[]): Map<string, number> {
  const uniqueIds = [...new Set(refIds)];
  const map = new Map<string, number>();
  uniqueIds.forEach((id, index) => {
    map.set(id, index + 1);
  });
  return map;
}

/**
 * Format citation numbers for display
 * - Single: [1]
 * - Multiple consecutive: [1-3]
 * - Multiple non-consecutive: [1,3,5]
 */
export function formatCitationNumbers(numbers: number[]): string {
  if (numbers.length === 0) return '';
  if (numbers.length === 1) return `[${numbers[0]}]`;

  const sorted = [...numbers].sort((a, b) => a - b);

  // Check if consecutive
  const isConsecutive = sorted.every(
    (num, i) => i === 0 || num === sorted[i - 1] + 1
  );

  if (isConsecutive && sorted.length >= 3) {
    return `[${sorted[0]}-${sorted[sorted.length - 1]}]`;
  }

  return `[${sorted.join(',')}]`;
}

// ============================================
// REFERENCE COMPARISON
// ============================================

/**
 * Check if two references might be duplicates
 */
export function arePotentialDuplicates(ref1: Reference, ref2: Reference): boolean {
  // Same DOI
  if (ref1.doi && ref2.doi && ref1.doi === ref2.doi) {
    return true;
  }

  // Same PMID
  if (ref1.pmid && ref2.pmid && ref1.pmid === ref2.pmid) {
    return true;
  }

  // Same title (normalized)
  const normalizeTitle = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalizeTitle(ref1.title) === normalizeTitle(ref2.title)) {
    return true;
  }

  return false;
}

// ============================================
// EXPORT TYPES
// ============================================

export type CitationFormat = 'vancouver' | 'apa' | 'bibtex' | 'ris';

/**
 * Format reference in specified format
 */
export function formatReference(
  ref: Reference,
  format: CitationFormat,
  number?: number
): string {
  switch (format) {
    case 'vancouver':
      return formatReferenceVancouver(ref, number);
    case 'bibtex':
      return formatReferenceBibTeX(ref);
    case 'apa':
      // APA format implementation could be added here
      return formatReferenceVancouver(ref, number);
    case 'ris':
      // RIS format implementation could be added here
      return formatReferenceVancouver(ref, number);
    default:
      return formatReferenceVancouver(ref, number);
  }
}
