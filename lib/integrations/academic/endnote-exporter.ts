/**
 * EndNote XML Format Exporter
 * Produces format compatible with EndNote reference manager
 *
 * Reference: https://support.clarivate.com/Endnote
 */

import { Reference } from '@/lib/types/references';
import { EndNoteReference, ExportResult } from './types';

/**
 * Map Darwin-MFC reference types to EndNote types
 */
function mapToEndNoteType(type: string): string {
  const typeMap: Record<string, string> = {
    artigo: 'Journal Article',
    portaria: 'Report',
    lei: 'Report',
    nota_tecnica: 'Report',
    site: 'Web Page',
    livro: 'Book',
    diretriz: 'Book',
    relatorio: 'Report',
  };
  return typeMap[type] || 'Miscellaneous';
}

/**
 * Escape XML special characters
 * @param text - Text to escape
 * @returns Escaped XML safe text
 */
function escapeXML(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Convert single Reference to EndNote XML format
 * @param reference - The reference to convert
 * @param index - Optional index for record numbering
 * @returns EndNote XML formatted reference
 */
export function citationToEndNoteXML(reference: Reference, index: number = 1): string {
  const endnoteType = mapToEndNoteType(reference.type);

  let xml = `  <record>\n`;
  xml += `    <rec-number>${index}</rec-number>\n`;
  xml += `    <foreign-keys>\n`;
  xml += `      <key app="RefManPlus" db-id="REFMAN_DB">${reference.id}</key>\n`;
  xml += `    </foreign-keys>\n`;
  xml += `    <ref-type name="${escapeXML(endnoteType)}">129</ref-type>\n`;
  xml += `    <contributors>\n`;

  // Add authors
  if (reference.authors && reference.authors.length > 0) {
    reference.authors.forEach((author) => {
      xml += `      <author>${escapeXML(author)}</author>\n`;
    });
  }

  xml += `    </contributors>\n`;
  xml += `    <titles>\n`;
  xml += `      <title>${escapeXML(reference.title)}</title>\n`;

  if (reference.journal) {
    xml += `      <secondary-title>${escapeXML(reference.journal)}</secondary-title>\n`;
  }

  if (reference.publisher) {
    xml += `      <publisher>${escapeXML(reference.publisher)}</publisher>\n`;
  }

  xml += `    </titles>\n`;
  xml += `    <periodical>\n`;
  xml += `      <full-title>${escapeXML(reference.journal || 'N/A')}</full-title>\n`;

  if (reference.volume) {
    xml += `      <volume>${escapeXML(reference.volume)}</volume>\n`;
  }

  xml += `    </periodical>\n`;
  xml += `    <pages>\n`;

  if (reference.pages) {
    const [startPage, endPage] = reference.pages.split('-');
    xml += `      <start-page>${escapeXML(startPage.trim())}</start-page>\n`;
    if (endPage) {
      xml += `      <end-page>${escapeXML(endPage.trim())}</end-page>\n`;
    }
  }

  xml += `    </pages>\n`;
  xml += `    <dates>\n`;
  xml += `      <pub-dates>\n`;
  xml += `        <date>\n`;
  xml += `          <year>${reference.year}</year>\n`;
  xml += `        </date>\n`;
  xml += `      </pub-dates>\n`;

  if (reference.accessDate) {
    xml += `      <access-date>\n`;
    xml += `        <date>${escapeXML(reference.accessDate)}</date>\n`;
    xml += `      </access-date>\n`;
  }

  xml += `    </dates>\n`;
  xml += `    <isbn>${reference.volume || 'N/A'}</isbn>\n`;

  if (reference.doi) {
    xml += `    <custom1>${escapeXML(reference.doi)}</custom1>\n`;
  }

  if (reference.pmid) {
    xml += `    <custom2>${escapeXML(reference.pmid)}</custom2>\n`;
  }

  if (reference.url) {
    xml += `    <url>${escapeXML(reference.url)}</url>\n`;
  }

  if (reference.note) {
    xml += `    <notes>${escapeXML(reference.note)}</notes>\n`;
  }

  if (reference.legalNumber) {
    xml += `    <call-number>${escapeXML(reference.legalNumber)}</call-number>\n`;
  }

  xml += `  </record>\n`;

  return xml;
}

/**
 * Export multiple references to EndNote XML format
 * @param references - Array of references to export
 * @returns Complete EndNote XML document
 */
export function exportToEndNoteXML(references: Reference[]): string {
  if (!references || references.length === 0) {
    return '';
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<xml>\n`;
  xml += `  <records>\n`;

  references.forEach((ref, index) => {
    xml += citationToEndNoteXML(ref, index + 1);
  });

  xml += `  </records>\n`;
  xml += `</xml>\n`;

  return xml;
}

/**
 * Generate EndNote XML file download with proper formatting
 * @param references - Array of references to export
 * @param filename - Optional custom filename
 * @returns ExportResult with metadata
 */
export function generateEndNoteExport(
  references: Reference[],
  filename: string = 'referencias.xml'
): ExportResult {
  try {
    if (!references || references.length === 0) {
      return {
        success: false,
        format: 'endnote',
        content: '',
        itemCount: 0,
        error: 'No references provided for export',
      };
    }

    const content = exportToEndNoteXML(references);

    return {
      success: true,
      format: 'endnote',
      content,
      itemCount: references.length,
      filename,
    };
  } catch (error) {
    return {
      success: false,
      format: 'endnote',
      content: '',
      itemCount: 0,
      filename,
      error: `EndNote export failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Download EndNote XML file to user's computer
 * @param references - Array of references to export
 * @param filename - Optional custom filename
 */
export function downloadEndNoteFile(
  references: Reference[],
  filename: string = 'referencias.xml'
): void {
  const result = generateEndNoteExport(references, filename);

  if (!result.success || !result.content) {
    console.error('Failed to generate EndNote export:', result.error);
    return;
  }

  // Create blob and download
  const blob = new Blob([result.content], { type: 'application/xml; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
