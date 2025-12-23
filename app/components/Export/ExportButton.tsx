/**
 * EXPORT BUTTON COMPONENT
 * =======================
 *
 * Unified export button with format selection
 */

'use client';

import { useState } from 'react';

export type ExportFormat = 'csv' | 'pdf' | 'json';

interface ExportButtonProps {
  onExport: (format: ExportFormat) => void | Promise<void>;
  formats?: ExportFormat[];
  label?: string;
  icon?: string;
  className?: string;
  disabled?: boolean;
}

export default function ExportButton({
  onExport,
  formats = ['csv', 'pdf'],
  label = 'Exportar',
  icon = '📥',
  className = '',
  disabled = false,
}: ExportButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [exporting, setExporting] = useState(false);

  const formatLabels: Record<ExportFormat, string> = {
    csv: 'CSV (Planilha)',
    pdf: 'PDF (Documento)',
    json: 'JSON (Dados)',
  };

  const formatIcons: Record<ExportFormat, string> = {
    csv: '📊',
    pdf: '📄',
    json: '{ }',
  };

  const handleExport = async (format: ExportFormat) => {
    setExporting(true);
    setShowMenu(false);

    try {
      await onExport(format);
    } catch (error) {
      console.error('Export error:', error);
      alert('Erro ao exportar. Tente novamente.');
    } finally {
      setExporting(false);
    }
  };

  // Se só há um formato, não mostra menu
  if (formats.length === 1) {
    return (
      <button
        onClick={() => handleExport(formats[0])}
        disabled={disabled || exporting}
        className={`
          px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${className}
        `}
      >
        {exporting ? '⏳ Exportando...' : `${icon} ${label}`}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={disabled || exporting}
        className={`
          px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors flex items-center gap-2
          ${className}
        `}
      >
        {exporting ? '⏳ Exportando...' : `${icon} ${label}`}
        <span className="text-xs">▼</span>
      </button>

      {/* Dropdown Menu */}
      {showMenu && !exporting && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20 min-w-[180px]">
            {formats.map(format => (
              <button
                key={format}
                onClick={() => handleExport(format)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
              >
                <span className="text-lg">{formatIcons[format]}</span>
                <span>{formatLabels[format]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
