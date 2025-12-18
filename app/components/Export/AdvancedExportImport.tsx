'use client';

import React, { useState, useRef } from 'react';
import { Download, Upload, FileText, FileSpreadsheet, FileJson, FileCode, Check, X, AlertCircle } from 'lucide-react';
import {
  exportDiseasesToJSON,
  exportMedicationsToJSON,
  exportFullDataToJSON,
  exportDiseasesToCSV,
  exportMedicationsToCSV,
  exportDiseasesToXML,
  exportMedicationsToXML,
  exportDiseaseToPDF,
  exportDiseasesToPDF,
  exportMedicationToPDF,
  importDiseasesFromJSON,
  importMedicationsFromJSON,
  importDiseasesFromCSV,
  importMedicationsFromCSV,
  importDiseasesFromXML,
  importMedicationsFromXML,
  downloadFile,
  readFileAsText,
  type ExportFormat,
  type ImportFormat,
} from '@/lib/export';
import type { Doenca } from '@/lib/types/doenca';
import type { Medicamento } from '@/lib/types/medicamento';

interface AdvancedExportImportProps {
  diseases?: Partial<Doenca>[];
  medications?: Medicamento[];
  onImportDiseases?: (diseases: Partial<Doenca>[]) => void;
  onImportMedications?: (medications: Partial<Medicamento>[]) => void;
}

export default function AdvancedExportImport({
  diseases = [],
  medications = [],
  onImportDiseases,
  onImportMedications,
}: AdvancedExportImportProps) {
  const [exportFormat, setExportFormat] = useState<ExportFormat>('json');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    message: string;
    count?: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      let content: string | Blob;
      let filename: string;
      let mimeType: string;

      switch (exportFormat) {
        case 'json':
          if (diseases.length > 0 && medications.length > 0) {
            content = exportFullDataToJSON(diseases, medications, { pretty: true, includeMetadata: true });
            filename = 'darwin-mfc-full-export.json';
            mimeType = 'application/json';
          } else if (diseases.length > 0) {
            content = exportDiseasesToJSON(diseases, { pretty: true, includeMetadata: true });
            filename = 'darwin-mfc-diseases.json';
            mimeType = 'application/json';
          } else if (medications.length > 0) {
            content = exportMedicationsToJSON(medications, { pretty: true, includeMetadata: true });
            filename = 'darwin-mfc-medications.json';
            mimeType = 'application/json';
          } else {
            alert('Nenhum dado para exportar');
            setIsExporting(false);
            return;
          }
          break;

        case 'csv':
          if (diseases.length > 0) {
            content = exportDiseasesToCSV(diseases, { includeHeaders: true });
            filename = 'darwin-mfc-diseases.csv';
            mimeType = 'text/csv';
          } else if (medications.length > 0) {
            content = exportMedicationsToCSV(medications, { includeHeaders: true });
            filename = 'darwin-mfc-medications.csv';
            mimeType = 'text/csv';
          } else {
            alert('Nenhum dado para exportar');
            setIsExporting(false);
            return;
          }
          break;

        case 'xml':
          if (diseases.length > 0) {
            content = exportDiseasesToXML(diseases, { pretty: true, includeMetadata: true });
            filename = 'darwin-mfc-diseases.xml';
            mimeType = 'application/xml';
          } else if (medications.length > 0) {
            content = exportMedicationsToXML(medications, { pretty: true, includeMetadata: true });
            filename = 'darwin-mfc-medications.xml';
            mimeType = 'application/xml';
          } else {
            alert('Nenhum dado para exportar');
            setIsExporting(false);
            return;
          }
          break;

        case 'pdf':
          if (diseases.length === 1) {
            content = await exportDiseaseToPDF(diseases[0], {
              title: diseases[0].titulo || 'Doença',
              author: 'Darwin-MFC',
            });
            filename = `doenca-${diseases[0].id || 'documento'}.pdf`;
            mimeType = 'application/pdf';
          } else if (diseases.length > 1) {
            content = await exportDiseasesToPDF(diseases, {
              title: 'Lista de Doenças',
              author: 'Darwin-MFC',
            });
            filename = 'darwin-mfc-diseases.pdf';
            mimeType = 'application/pdf';
          } else if (medications.length === 1) {
            content = await exportMedicationToPDF(medications[0], {
              title: medications[0].nomeGenerico || 'Medicamento',
              author: 'Darwin-MFC',
            });
            filename = `medicamento-${medications[0].id || 'documento'}.pdf`;
            mimeType = 'application/pdf';
          } else {
            alert('Nenhum dado para exportar');
            setIsExporting(false);
            return;
          }
          break;

        default:
          alert('Formato não suportado');
          setIsExporting(false);
          return;
      }

      downloadFile(content, filename, mimeType);
      setIsExporting(false);
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert(`Erro ao exportar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      const fileContent = await readFileAsText(file);
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      let importedDiseases: Partial<Doenca>[] = [];
      let importedMedications: Partial<Medicamento>[] = [];

      switch (fileExtension) {
        case 'json':
          try {
            const jsonData = JSON.parse(fileContent);
            if (jsonData.diseases) {
              importedDiseases = jsonData.diseases;
            } else if (Array.isArray(jsonData)) {
              importedDiseases = jsonData;
            } else {
              importedDiseases = importDiseasesFromJSON(fileContent);
            }
            
            if (jsonData.medications) {
              importedMedications = jsonData.medications;
            } else if (!jsonData.diseases && Array.isArray(jsonData)) {
              importedMedications = importMedicationsFromJSON(fileContent);
            }
          } catch {
            // Tenta importar como array simples
            importedDiseases = importDiseasesFromJSON(fileContent);
          }
          break;

        case 'csv':
          // Tenta importar como doenças primeiro
          try {
            importedDiseases = importDiseasesFromCSV(fileContent);
          } catch {
            // Se falhar, tenta como medicamentos
            importedMedications = importMedicationsFromCSV(fileContent);
          }
          break;

        case 'xml':
          importedDiseases = importDiseasesFromXML(fileContent);
          importedMedications = importMedicationsFromXML(fileContent);
          break;

        default:
          throw new Error('Formato de arquivo não suportado');
      }

      // Aplica imports
      if (importedDiseases.length > 0 && onImportDiseases) {
        onImportDiseases(importedDiseases);
      }

      if (importedMedications.length > 0 && onImportMedications) {
        onImportMedications(importedMedications);
      }

      const totalImported = importedDiseases.length + importedMedications.length;
      setImportResult({
        success: true,
        message: `Importação concluída com sucesso!`,
        count: totalImported,
      });

      // Limpa input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao importar arquivo',
      });
    } finally {
      setIsImporting(false);
    }
  };

  const getFormatIcon = (format: ExportFormat) => {
    switch (format) {
      case 'json':
        return <FileJson className="w-4 h-4" />;
      case 'csv':
        return <FileSpreadsheet className="w-4 h-4" />;
      case 'xml':
        return <FileCode className="w-4 h-4" />;
      case 'pdf':
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Export */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
          <Download className="w-5 h-4 text-emerald-600" />
          Exportar Dados
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Formato de Exportação
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['json', 'csv', 'xml', 'pdf'] as ExportFormat[]).map(format => (
                <button
                  key={format}
                  onClick={() => setExportFormat(format)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                    exportFormat === format
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {getFormatIcon(format)}
                  <span className="text-sm font-medium uppercase">{format}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <span>
              {diseases.length > 0 && `${diseases.length} doença${diseases.length > 1 ? 'es' : ''}`}
              {diseases.length > 0 && medications.length > 0 && ' • '}
              {medications.length > 0 && `${medications.length} medicamento${medications.length > 1 ? 's' : ''}`}
            </span>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting || (diseases.length === 0 && medications.length === 0)}
            className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-4" />
            {isExporting ? 'Exportando...' : `Exportar como ${exportFormat.toUpperCase()}`}
          </button>
        </div>
      </div>

      {/* Import */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
          <Upload className="w-5 h-4 text-blue-600" />
          Importar Dados
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Formatos Suportados: JSON, CSV, XML
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.csv,.xml"
              onChange={handleImport}
              disabled={isImporting}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-950/20 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-950/30 disabled:opacity-50"
            />
          </div>

          {importResult && (
            <div
              className={`p-3 rounded-lg flex items-start gap-2 ${
                importResult.success
                  ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800'
              }`}
            >
              {importResult.success ? (
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    importResult.success
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}
                >
                  {importResult.message}
                </p>
                {importResult.success && importResult.count !== undefined && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {importResult.count} item{importResult.count > 1 ? 's' : ''} importado{importResult.count > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <button
                onClick={() => setImportResult(null)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {isImporting && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">Processando arquivo...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

