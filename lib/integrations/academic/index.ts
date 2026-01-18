/**
 * Academic Reference Export and Resolution
 * Central index for all academic integration modules
 */

// Type exports
export type { ExportFormat, ExportOptions, ExportResult, ResolvedCitation } from './types';
export type { RISReference, BibTeXReference, EndNoteReference, JsonExportReference } from './types';

// RIS Exporter
export { citationToRIS, exportToRIS, generateRISExport, downloadRISFile } from './ris-exporter';

// BibTeX Exporter
export {
  citationToBibTeX,
  exportToBibTeX,
  generateBibTeXExport,
  downloadBibTeXFile,
} from './bibtex-exporter';

// EndNote Exporter
export { citationToEndNoteXML, exportToEndNoteXML, generateEndNoteExport, downloadEndNoteFile } from './endnote-exporter';

// JSON Exporter
export {
  citationToJSON,
  exportToJSON,
  exportToJSONString,
  generateJSONExport,
  downloadJSONFile,
  parseJSONExport,
  isValidJSONExport,
} from './json-exporter';

// DOI Resolver
export {
  resolveDOI,
  formatDOIUrl,
  isValidDOI,
  resolveDOIBatch,
  extractDOI,
} from './doi-resolver';

// PubMed Resolver
export {
  resolvePMID,
  formatPubMedUrl,
  isValidPMID,
  resolvePMIDBatch,
  extractPMID,
} from './pubmed-resolver';

/**
 * Unified export function supporting all formats
 * @param references - Array of references to export
 * @param format - Export format ('ris', 'bibtex', 'endnote', 'json')
 * @param filename - Optional custom filename
 * @returns ExportResult with content and metadata
 */
export function exportReferences(
  references: any[],
  format: 'ris' | 'bibtex' | 'endnote' | 'json' = 'json',
  filename?: string
) {
  const { generateRISExport } = require('./ris-exporter');
  const { generateBibTeXExport } = require('./bibtex-exporter');
  const { generateEndNoteExport } = require('./endnote-exporter');
  const { generateJSONExport } = require('./json-exporter');

  switch (format) {
    case 'ris':
      return generateRISExport(references, filename || 'referencias.ris');
    case 'bibtex':
      return generateBibTeXExport(references, filename || 'referencias.bib');
    case 'endnote':
      return generateEndNoteExport(references, filename || 'referencias.xml');
    case 'json':
    default:
      return generateJSONExport(references, filename || 'referencias.json');
  }
}

/**
 * Unified download function supporting all formats
 * @param references - Array of references to export
 * @param format - Export format ('ris', 'bibtex', 'endnote', 'json')
 * @param filename - Optional custom filename
 */
export function downloadReferences(
  references: any[],
  format: 'ris' | 'bibtex' | 'endnote' | 'json' = 'json',
  filename?: string
) {
  const { downloadRISFile } = require('./ris-exporter');
  const { downloadBibTeXFile } = require('./bibtex-exporter');
  const { downloadEndNoteFile } = require('./endnote-exporter');
  const { downloadJSONFile } = require('./json-exporter');

  switch (format) {
    case 'ris':
      downloadRISFile(references, filename || 'referencias.ris');
      break;
    case 'bibtex':
      downloadBibTeXFile(references, filename || 'referencias.bib');
      break;
    case 'endnote':
      downloadEndNoteFile(references, filename || 'referencias.xml');
      break;
    case 'json':
    default:
      downloadJSONFile(references, filename || 'referencias.json');
      break;
  }
}
