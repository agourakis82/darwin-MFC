/**
 * RIS (Research Information Systems) Format Exporter
 * Produces format compatible with Zotero, Mendeley, EndNote, RefWorks
 *
 * Reference: https://en.wikipedia.org/wiki/RIS_(file_format)
 */

import { Reference, ReferenceType } from '@/lib/types/references';
import { RISReference, ExportResult } from './types';

/**
 * Map Darwin-MFC reference types to RIS types
 */
function mapToRisType(type: ReferenceType): string {
  const typeMap: Record<ReferenceType, string> = {
    artigo: 'JOUR', // Journal article
    portaria: 'RPRT', // Report (government documents)
    lei: 'RPRT', // Report (legislation)
    nota_tecnica: 'RPRT', // Report (technical notes)
    site: 'ELEC', // Electronic source
    livro: 'BOOK', // Book
    diretriz: 'BOOK', // Treated as book (clinical guidelines)
    relatorio: 'RPRT', // Report
  };
  return typeMap[type] || 'MISC';
}

/**
 * Convert single Reference to RIS format string
 * @param reference - The reference to convert
 * @param index - Optional index for generating citation keys
 * @returns RIS formatted reference as string
 */
export function citationToRIS(reference: Reference, index?: number): string {
  const ris: RISReference = {
    TY: mapToRisType(reference.type),
    AU: reference.authors || ['Author Unknown'],
    TI: reference.title,
    PY: reference.year.toString(),
    ER: '',
  };

  // Add optional fields if present
  if (reference.journal) {
    ris.JO = reference.journal;
  }

  if (reference.volume) {
    ris.VL = reference.volume;
  }

  if (reference.pages) {
    // RIS format uses SP/EP for start/end pages
    const pages = reference.pages.split('-');
    if (pages.length >= 1) {
      ris.SP = pages[0].trim();
    }
    if (pages.length >= 2) {
      ris.EP = pages[1].trim();
    }
  }

  if (reference.doi) {
    ris.DO = reference.doi;
  }

  if (reference.pmid) {
    ris.PM = reference.pmid;
  }

  if (reference.url) {
    ris.UR = reference.url;
  }

  if (reference.publisher) {
    ris.PB = reference.publisher;
  }

  if (reference.legalNumber) {
    ris.T2 = reference.legalNumber;
  }

  if (reference.note) {
    ris.N1 = reference.note;
  }

  // Build RIS format
  let risString = '';
  for (const [key, value] of Object.entries(ris)) {
    if (key === 'ER') continue;
    if (key === 'AU' && Array.isArray(value)) {
      // Multiple authors on separate lines
      value.forEach((author) => {
        risString += `AU  - ${author}\n`;
      });
    } else if (value) {
      risString += `${key}  - ${value}\n`;
    }
  }
  risString += 'ER  - \n';

  return risString;
}

/**
 * Export multiple references to RIS format
 * @param references - Array of references to export
 * @returns Combined RIS format string with all references
 */
export function exportToRIS(references: Reference[]): string {
  if (!references || references.length === 0) {
    return '';
  }

  const risEntries = references.map((ref, index) => citationToRIS(ref, index));
  return risEntries.join('\n');
}

/**
 * Generate RIS file download with proper formatting
 * @param references - Array of references to export
 * @param filename - Optional custom filename
 * @returns ExportResult with metadata
 */
export function generateRISExport(
  references: Reference[],
  filename: string = 'referencias.ris'
): ExportResult {
  try {
    if (!references || references.length === 0) {
      return {
        success: false,
        format: 'ris',
        content: '',
        itemCount: 0,
        error: 'No references provided for export',
      };
    }

    const content = exportToRIS(references);

    return {
      success: true,
      format: 'ris',
      content,
      itemCount: references.length,
      filename,
    };
  } catch (error) {
    return {
      success: false,
      format: 'ris',
      content: '',
      itemCount: 0,
      filename,
      error: `RIS export failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Download RIS file to user's computer
 * @param references - Array of references to export
 * @param filename - Optional custom filename
 */
export function downloadRISFile(
  references: Reference[],
  filename: string = 'referencias.ris'
): void {
  const result = generateRISExport(references, filename);

  if (!result.success || !result.content) {
    console.error('Failed to generate RIS export:', result.error);
    return;
  }

  // Create blob and download
  const blob = new Blob([result.content], { type: 'application/x-ris; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
