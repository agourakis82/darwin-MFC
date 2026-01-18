'use client';

/**
 * Export Bibliography Button
 * React component for exporting selected citations in multiple formats
 * Supports RIS, BibTeX, EndNote XML, and JSON formats
 */

import React, { useState, useRef, useCallback } from 'react';
import { Reference } from '@/lib/types/references';
import {
  downloadRISFile,
  downloadBibTeXFile,
  downloadEndNoteFile,
  downloadJSONFile,
} from '@/lib/integrations/academic';

interface ExportButtonProps {
  references: Reference[];
  selectedReferenceIds?: string[];
  buttonText?: string;
  showToast?: (message: string, type: 'success' | 'error') => void;
}

interface ExportFormat {
  id: 'ris' | 'bibtex' | 'endnote' | 'json';
  label: string;
  description: string;
  fileExtension: string;
  mimeType: string;
  compatible: string[];
}

const EXPORT_FORMATS: ExportFormat[] = [
  {
    id: 'ris',
    label: 'RIS',
    description: 'Research Information Systems format',
    fileExtension: 'ris',
    mimeType: 'application/x-ris',
    compatible: ['Zotero', 'Mendeley', 'EndNote', 'RefWorks'],
  },
  {
    id: 'bibtex',
    label: 'BibTeX',
    description: 'LaTeX bibliography format',
    fileExtension: 'bib',
    mimeType: 'text/x-bibtex',
    compatible: ['LaTeX', 'Overleaf', 'Citation managers'],
  },
  {
    id: 'endnote',
    label: 'EndNote',
    description: 'EndNote reference manager format',
    fileExtension: 'xml',
    mimeType: 'application/xml',
    compatible: ['EndNote', 'Covidence'],
  },
  {
    id: 'json',
    label: 'JSON',
    description: 'JavaScript Object Notation format',
    fileExtension: 'json',
    mimeType: 'application/json',
    compatible: ['Custom integration', 'Web applications'],
  },
];

/**
 * ExportButton Component
 * Dropdown menu for selecting export format and downloading references
 */
export function ExportButton({
  references,
  selectedReferenceIds,
  buttonText = 'Export Bibliography',
  showToast,
}: ExportButtonProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Get references to export (selected or all)
  const referencesToExport = selectedReferenceIds
    ? references.filter((ref) => selectedReferenceIds.includes(ref.id))
    : references;

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  const handleExport = useCallback(
    async (format: ExportFormat['id']) => {
      try {
        if (referencesToExport.length === 0) {
          showToast?.('No references to export', 'error');
          return;
        }

        setIsLoading(true);

        // Generate filename with current date
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const baseFilename = `darwin-referencias-${dateStr}`;

        const formatConfig = EXPORT_FORMATS.find((f) => f.id === format);
        if (!formatConfig) return;

        const filename = `${baseFilename}.${formatConfig.fileExtension}`;

        // Call appropriate download function
        switch (format) {
          case 'ris':
            downloadRISFile(referencesToExport, filename);
            break;
          case 'bibtex':
            downloadBibTeXFile(referencesToExport, filename);
            break;
          case 'endnote':
            downloadEndNoteFile(referencesToExport, filename);
            break;
          case 'json':
            downloadJSONFile(referencesToExport, filename);
            break;
        }

        showToast?.(
          `Successfully exported ${referencesToExport.length} reference(s) as ${format.toUpperCase()}`,
          'success'
        );
        setIsOpen(false);
      } catch (error) {
        console.error('Export error:', error);
        showToast?.(
          `Error exporting references: ${error instanceof Error ? error.message : 'Unknown error'}`,
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [referencesToExport, showToast]
  );

  if (referencesToExport.length === 0) {
    return (
      <button
        disabled
        className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-not-allowed opacity-50"
        title="Select references to export"
      >
        {buttonText}
      </button>
    );
  }

  return (
    <div ref={menuRef} className="relative inline-block">
      {/* Main Export Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        {buttonText}
        {referencesToExport.length > 0 && (
          <span className="text-xs bg-blue-500 px-2 py-1 rounded">
            {referencesToExport.length}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700">
          {/* Menu Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Export Format</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {referencesToExport.length} reference(s) selected
            </p>
          </div>

          {/* Format Options */}
          <div className="p-2">
            {EXPORT_FORMATS.map((format) => (
              <button
                key={format.id}
                onClick={() => handleExport(format.id)}
                disabled={isLoading}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {/* Format Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {format.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {format.description}
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* Compatible Tools */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {format.compatible.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Footer Info */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <svg
                className="w-3 h-3 inline mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              References will be downloaded as a file to your computer
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Standalone Export Format Selector
 * Can be used independently for more customization
 */
export function ExportFormatSelector({
  format,
  onChange,
}: {
  format: ExportFormat['id'];
  onChange: (format: ExportFormat['id']) => void;
}): React.ReactElement {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        Export Format
      </label>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {EXPORT_FORMATS.map((fmt) => (
          <button
            key={fmt.id}
            onClick={() => onChange(fmt.id)}
            className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
              format === fmt.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {fmt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExportButton;
