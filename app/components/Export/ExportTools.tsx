'use client';

import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';

interface ExportToolsProps {
  contentId?: string;
  contentTitle?: string;
}

export default function ExportTools({ contentId, contentTitle }: ExportToolsProps) {
  const handleExportPDF = () => {
    // Implementação simplificada - em produção usaria jspdf + html2canvas
    window.print();
  };

  const handleExportCSV = () => {
    alert('Funcionalidade de exportação CSV será implementada com papaparse');
  };

  const handleExportJSON = () => {
    alert('Funcionalidade de exportação JSON será implementada');
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleExportPDF}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
        title="Exportar como PDF"
      >
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">PDF</span>
      </button>

      <button
        onClick={handleExportCSV}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors"
        title="Exportar como CSV"
      >
        <FileSpreadsheet className="w-4 h-4" />
        <span className="hidden sm:inline">CSV</span>
      </button>

      <button
        onClick={handleExportJSON}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
        title="Exportar como JSON"
      >
        <FileJson className="w-4 h-4" />
        <span className="hidden sm:inline">JSON</span>
      </button>

      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 px-4 py-2 border-2 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-sm font-semibold transition-colors"
        title="Imprimir"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Imprimir</span>
      </button>
    </div>
  );
}

