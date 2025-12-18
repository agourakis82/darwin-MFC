/**
 * Export/Import Central
 * Módulo unificado para exportação e importação em múltiplos formatos
 */

// JSON
export * from './json';

// CSV
export * from './csv';

// XML
export * from './xml';

// PDF
export * from './pdf';

/**
 * Formatos de exportação suportados
 */
export type ExportFormat = 'json' | 'csv' | 'xml' | 'pdf';

/**
 * Formatos de importação suportados
 */
export type ImportFormat = 'json' | 'csv' | 'xml';

/**
 * Opções de exportação unificadas
 */
export interface UnifiedExportOptions {
  format: ExportFormat;
  pretty?: boolean;
  includeMetadata?: boolean;
  // Opções específicas de PDF
  pdf?: {
    title?: string;
    author?: string;
    orientation?: 'portrait' | 'landscape';
  };
  // Opções específicas de CSV
  csv?: {
    delimiter?: string;
    includeHeaders?: boolean;
  };
  // Opções específicas de XML
  xml?: {
    rootElement?: string;
  };
}

/**
 * Download de arquivo no navegador
 */
export function downloadFile(
  content: string | Blob,
  filename: string,
  mimeType?: string
): void {
  const blob = content instanceof Blob
    ? content
    : new Blob([content], { type: mimeType || 'application/octet-stream' });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Lê arquivo do input file
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Erro ao ler arquivo'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsText(file);
  });
}

/**
 * Lê arquivo como Blob (para PDF)
 */
export function readFileAsBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(new Blob([e.target.result as ArrayBuffer]));
      } else {
        reject(new Error('Erro ao ler arquivo'));
      }
    };
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsArrayBuffer(file);
  });
}

