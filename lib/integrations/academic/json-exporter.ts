/**
 * JSON Export Format
 * Internal normalized format for data exchange and storage
 */

import { Reference } from '@/lib/types/references';
import { JsonExportReference, ExportResult } from './types';

/**
 * Convert single Reference to JSON export format
 * @param reference - The reference to convert
 * @returns JsonExportReference object
 */
export function citationToJSON(reference: Reference): JsonExportReference {
  const jsonRef: JsonExportReference = {
    id: reference.id,
    type: reference.type,
    title: reference.title,
    year: reference.year,
  };

  // Add optional fields if present
  if (reference.authors) {
    jsonRef.authors = reference.authors;
  }

  if (reference.journal) {
    jsonRef.journal = reference.journal;
  }

  if (reference.volume) {
    jsonRef.volume = reference.volume;
  }

  if (reference.pages) {
    jsonRef.pages = reference.pages;
  }

  if (reference.doi) {
    jsonRef.doi = reference.doi;
  }

  if (reference.pmid) {
    jsonRef.pmid = reference.pmid;
  }

  if (reference.url) {
    jsonRef.url = reference.url;
  }

  if (reference.publisher) {
    jsonRef.publisher = reference.publisher;
  }

  if (reference.legalNumber) {
    jsonRef.legalNumber = reference.legalNumber;
  }

  if (reference.edition) {
    jsonRef.edition = reference.edition;
  }

  if (reference.accessDate) {
    jsonRef.accessDate = reference.accessDate;
  }

  if (reference.note) {
    jsonRef.note = reference.note;
  }

  return jsonRef;
}

/**
 * Export multiple references to JSON array format
 * @param references - Array of references to export
 * @returns Array of JsonExportReference objects
 */
export function exportToJSON(references: Reference[]): JsonExportReference[] {
  if (!references || references.length === 0) {
    return [];
  }

  return references.map((ref) => citationToJSON(ref));
}

/**
 * Export references as JSON with metadata
 * @param references - Array of references to export
 * @param includeMetadata - Whether to include export metadata
 * @returns JSON string with references and optional metadata
 */
export function exportToJSONString(
  references: Reference[],
  includeMetadata: boolean = true
): string {
  const data = exportToJSON(references);

  if (!includeMetadata) {
    return JSON.stringify(data, null, 2);
  }

  // Include metadata about the export
  const exportData = {
    metadata: {
      exportDate: new Date().toISOString(),
      exportSource: 'Darwin-MFC',
      referenceCount: references.length,
      version: '1.0',
    },
    references: data,
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Generate JSON file download with proper formatting
 * @param references - Array of references to export
 * @param filename - Optional custom filename
 * @param includeMetadata - Whether to include export metadata
 * @returns ExportResult with metadata
 */
export function generateJSONExport(
  references: Reference[],
  filename: string = 'referencias.json',
  includeMetadata: boolean = true
): ExportResult {
  try {
    if (!references || references.length === 0) {
      return {
        success: false,
        format: 'json',
        content: '',
        itemCount: 0,
        error: 'No references provided for export',
      };
    }

    const content = exportToJSONString(references, includeMetadata);

    return {
      success: true,
      format: 'json',
      content,
      itemCount: references.length,
      filename,
    };
  } catch (error) {
    return {
      success: false,
      format: 'json',
      content: '',
      itemCount: 0,
      filename,
      error: `JSON export failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Download JSON file to user's computer
 * @param references - Array of references to export
 * @param filename - Optional custom filename
 * @param includeMetadata - Whether to include export metadata
 */
export function downloadJSONFile(
  references: Reference[],
  filename: string = 'referencias.json',
  includeMetadata: boolean = true
): void {
  const result = generateJSONExport(references, filename, includeMetadata);

  if (!result.success || !result.content) {
    console.error('Failed to generate JSON export:', result.error);
    return;
  }

  // Create blob and download
  const blob = new Blob([result.content], { type: 'application/json; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parse JSON export file back to references
 * @param jsonString - JSON string to parse
 * @returns Array of JsonExportReference objects or null on error
 */
export function parseJSONExport(jsonString: string): JsonExportReference[] | null {
  try {
    const parsed = JSON.parse(jsonString);

    // Handle both direct array and metadata-wrapped format
    if (Array.isArray(parsed)) {
      return parsed;
    }

    if (parsed.references && Array.isArray(parsed.references)) {
      return parsed.references;
    }

    return null;
  } catch (error) {
    console.error('Error parsing JSON export:', error);
    return null;
  }
}

/**
 * Validate JSON export format
 * @param jsonString - JSON string to validate
 * @returns true if valid export format
 */
export function isValidJSONExport(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);

    // Check for array of references
    if (Array.isArray(parsed)) {
      return parsed.length === 0 || (parsed[0] && typeof parsed[0] === 'object' && 'id' in parsed[0]);
    }

    // Check for metadata-wrapped format
    if (parsed.references && Array.isArray(parsed.references)) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
