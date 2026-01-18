/**
 * Academic Reference Export Format Types
 * Supports multiple citation management formats: RIS, BibTeX, EndNote, JSON
 */

export type ExportFormat = 'ris' | 'bibtex' | 'endnote' | 'json';

/**
 * RIS (Research Information Systems) format reference
 * Used by Zotero, Mendeley, EndNote, RefWorks
 */
export interface RISReference {
  TY: string; // Reference type (JOUR, BOOK, RPRT, etc.)
  AU: string[]; // Authors
  TI: string; // Title
  JO?: string; // Journal
  VL?: string; // Volume
  IS?: string; // Issue
  SP?: string; // Start page
  EP?: string; // End page
  PY?: string; // Year
  DO?: string; // DOI
  PM?: string; // PMID
  UR?: string; // URL
  T2?: string; // Series title (for books/reports)
  PB?: string; // Publisher
  N1?: string; // Note/Description
  ER: string; // End of reference marker
}

/**
 * BibTeX entry format
 * Used by LaTeX, academic journals, citation managers
 */
export interface BibTeXReference {
  type: 'article' | 'book' | 'inproceedings' | 'misc' | 'report' | 'phdthesis' | 'mastersthesis';
  key: string;
  fields: Record<string, string>;
}

/**
 * EndNote XML format reference
 * Used by EndNote reference manager
 */
export interface EndNoteReference {
  title: string;
  authors: string[];
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: number;
  doi?: string;
  pmid?: string;
  url?: string;
  publisher?: string;
  note?: string;
}

/**
 * JSON export format (internal normalized format)
 * Used for data exchange and storage
 */
export interface JsonExportReference {
  id: string;
  type: string;
  title: string;
  authors?: string[];
  year: number;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  url?: string;
  publisher?: string;
  legalNumber?: string; // Brazilian legal documents
  edition?: string;
  accessDate?: string;
  note?: string;
}

/**
 * Export options configuration
 */
export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  includeAccessDates?: boolean;
  includePMID?: boolean;
  includeDOI?: boolean;
}

/**
 * Export result with metadata
 */
export interface ExportResult {
  success: boolean;
  format: ExportFormat;
  content: string;
  itemCount: number;
  filename?: string;
  error?: string;
}

/**
 * Resolver result for DOI and PMID lookups
 */
export interface ResolvedCitation {
  id?: string;
  title: string;
  authors?: string[];
  year?: number;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  url?: string;
  publisher?: string;
  issn?: string;
  doi_url?: string;
}
