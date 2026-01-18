/**
 * BibTeX Format Exporter
 * Produces format compatible with LaTeX, academic journals, and citation managers
 *
 * Reference: http://www.ctan.org/pkg/bibtex
 */

import { Reference, ReferenceType } from '@/lib/types/references';
import { BibTeXReference, ExportResult } from './types';

/**
 * Map Darwin-MFC reference types to BibTeX types
 */
function mapToBibTeXType(type: ReferenceType): BibTeXReference['type'] {
  const typeMap: Record<ReferenceType, BibTeXReference['type']> = {
    artigo: 'article', // Journal article
    portaria: 'report', // Government report
    lei: 'report', // Legislation as report
    nota_tecnica: 'report', // Technical report
    site: 'misc', // Online sources
    livro: 'book', // Book
    diretriz: 'book', // Clinical guidelines as book
    relatorio: 'report', // Report
  };
  return typeMap[type] || 'misc';
}

/**
 * Generate BibTeX citation key from reference data
 * Format: AUTHORLASTNAME-YEAR or ORGANIZATION-YEAR
 * @param reference - The reference to generate key from
 * @param index - Optional index for uniqueness
 * @returns Generated BibTeX key
 */
function generateBibTeXKey(reference: Reference, index?: number): string {
  let keyBase = '';

  // Try to extract from authors
  if (reference.authors && reference.authors.length > 0) {
    const firstAuthor = reference.authors[0];
    // Extract last word (surname) or organization
    const parts = firstAuthor.split(' ');
    keyBase = parts[parts.length - 1].toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  // If no author, use organization or part of title
  if (!keyBase && reference.type === 'portaria') {
    keyBase = 'ms'; // Ministério da Saúde
  }

  if (!keyBase && reference.title) {
    const titleWords = reference.title.split(' ');
    keyBase = titleWords[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  if (!keyBase) {
    keyBase = reference.type;
  }

  // Add year
  const year = reference.year.toString();
  const key = `${keyBase}${year}`;

  // Add index if provided for uniqueness
  return index !== undefined ? `${key}-${index}` : key;
}

/**
 * Escape special characters in BibTeX fields
 * @param text - Text to escape
 * @returns Escaped text safe for BibTeX
 */
function escapeBibTeXString(text: string): string {
  // Escape special BibTeX characters
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[{}]/g, (char) => `\\${char}`)
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/[_$&%#]/g, (char) => `\\${char}`);
}

/**
 * Convert single Reference to BibTeX entry
 * @param reference - The reference to convert
 * @param index - Optional index for generating citation keys
 * @returns BibTeX formatted reference as string
 */
export function citationToBibTeX(reference: Reference, index?: number): string {
  const bibTeXType = mapToBibTeXType(reference.type);
  const key = generateBibTeXKey(reference, index);

  const fields: Record<string, string> = {};

  // Required fields
  fields.title = `{${escapeBibTeXString(reference.title)}}`;
  fields.year = reference.year.toString();

  // Authors/Organization
  if (reference.authors && reference.authors.length > 0) {
    // BibTeX author format: "Last, First and Last, First"
    fields.author = reference.authors.join(' and ');
  } else if (reference.type === 'portaria' || reference.type === 'lei') {
    fields.author = 'Ministério da Saúde';
  }

  // Optional fields based on reference type
  if (reference.type === 'artigo' && reference.journal) {
    fields.journal = `{${escapeBibTeXString(reference.journal)}}`;
  }

  if (reference.volume) {
    fields.volume = `${reference.volume}`;
  }

  if (reference.pages) {
    fields.pages = `${reference.pages}`;
  }

  if (reference.doi) {
    fields.doi = reference.doi;
  }

  if (reference.url) {
    fields.url = `{${reference.url}}`;
  }

  if (reference.publisher) {
    fields.publisher = `{${escapeBibTeXString(reference.publisher)}}`;
  }

  if (reference.edition) {
    fields.edition = `${reference.edition}`;
  }

  if (reference.legalNumber) {
    fields.note = `{${escapeBibTeXString(reference.legalNumber)}}`;
  }

  if (reference.note) {
    fields.annote = `{${escapeBibTeXString(reference.note)}}`;
  }

  // Build BibTeX entry
  let bibtexString = `@${bibTeXType}{${key},\n`;

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    bibtexString += `  ${fieldName} = ${fieldValue},\n`;
  }

  // Remove last comma and close entry
  bibtexString = bibtexString.slice(0, -2) + '\n}\n';

  return bibtexString;
}

/**
 * Export multiple references to BibTeX format
 * @param references - Array of references to export
 * @returns Combined BibTeX format string with all references
 */
export function exportToBibTeX(references: Reference[]): string {
  if (!references || references.length === 0) {
    return '';
  }

  const bibtexEntries = references.map((ref, index) => citationToBibTeX(ref, index));
  return bibtexEntries.join('\n');
}

/**
 * Generate BibTeX file download with proper formatting
 * @param references - Array of references to export
 * @param filename - Optional custom filename
 * @returns ExportResult with metadata
 */
export function generateBibTeXExport(
  references: Reference[],
  filename: string = 'referencias.bib'
): ExportResult {
  try {
    if (!references || references.length === 0) {
      return {
        success: false,
        format: 'bibtex',
        content: '',
        itemCount: 0,
        error: 'No references provided for export',
      };
    }

    const content = exportToBibTeX(references);

    return {
      success: true,
      format: 'bibtex',
      content,
      itemCount: references.length,
      filename,
    };
  } catch (error) {
    return {
      success: false,
      format: 'bibtex',
      content: '',
      itemCount: 0,
      filename,
      error: `BibTeX export failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Download BibTeX file to user's computer
 * @param references - Array of references to export
 * @param filename - Optional custom filename
 */
export function downloadBibTeXFile(
  references: Reference[],
  filename: string = 'referencias.bib'
): void {
  const result = generateBibTeXExport(references, filename);

  if (!result.success || !result.content) {
    console.error('Failed to generate BibTeX export:', result.error);
    return;
  }

  // Create blob and download
  const blob = new Blob([result.content], { type: 'text/x-bibtex; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
