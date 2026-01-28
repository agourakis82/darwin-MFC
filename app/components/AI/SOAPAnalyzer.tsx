'use client';

import React, { useState, useCallback } from 'react';
import { Copy, AlertCircle, Loader2, FileText, Check, Stethoscope, Pill, TestTube } from 'lucide-react';
import { parseSOAPNote, type ExtractedSOAP, type MedicalEntity, type SOAPSection } from '@/lib/ai/extraction';

// =============================================================================
// SOAP ANALYZER COMPONENT
// =============================================================================

export function SOAPAnalyzer() {
  const [soapText, setSoapText] = useState('');
  const [extractedData, setExtractedData] = useState<ExtractedSOAP | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Parse SOAP note
  const parseNote = async () => {
    if (!soapText.trim()) {
      setError('Insira uma nota SOAP válida.');
      return;
    }
    setIsParsing(true);
    setError(null);
    try {
      const result = parseSOAPNote(soapText);
      setExtractedData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao analisar a nota SOAP.');
    } finally {
      setIsParsing(false);
    }
  };

  // Copy extracted data to clipboard
  const copyExtractedData = useCallback(async () => {
    if (!extractedData) return;
    const dataStr = JSON.stringify(extractedData, null, 2);
    try {
      await navigator.clipboard.writeText(dataStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Erro ao copiar dados.');
    }
  }, [extractedData]);

  // Get highlighted text with entities marked
  const getHighlightedText = () => {
    if (!extractedData || !soapText) return soapText;

    let highlighted = soapText;
    const allEntities = Array.from(extractedData.entities.values()).flat();
    const sortedEntities = [...allEntities].sort(
      (a, b) => (b.text?.length || 0) - (a.text?.length || 0)
    );

    sortedEntities.forEach((entity) => {
      if (!entity.text) return;
      const escapedText = entity.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedText})`, 'gi');
      const colorClass =
        entity.type === 'MEDICATION'
          ? 'bg-purple-200 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100'
          : entity.type === 'SYMPTOM'
          ? 'bg-orange-200 dark:bg-orange-900/50 text-orange-900 dark:text-orange-100'
          : entity.type === 'EXAM'
          ? 'bg-blue-200 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100'
          : 'bg-green-200 dark:bg-green-900/50 text-green-900 dark:text-green-100';

      highlighted = highlighted.replace(
        regex,
        `<mark class="${colorClass} px-0.5 rounded">${entity.text}</mark>`
      );
    });

    return highlighted;
  };

  // Group entities by type
  const groupedEntities = extractedData
    ? Array.from(extractedData.entities.values())
        .flat()
        .reduce((acc, entity) => {
          const type = entity.type;
          if (!acc[type]) acc[type] = [];
          acc[type].push(entity);
          return acc;
        }, {} as Record<string, MedicalEntity[]>)
    : undefined;

  const sectionLabels: Record<SOAPSection, string> = {
    SUBJECTIVE: 'Subjetivo',
    OBJECTIVE: 'Objetivo',
    ASSESSMENT: 'Avaliacao',
    PLAN: 'Plano'
  };

  const sectionEntries = extractedData ? Array.from(extractedData.sections.entries()) : [];

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'MEDICATION':
        return <Pill className="w-4 h-4" />;
      case 'SYMPTOM':
        return <Stethoscope className="w-4 h-4" />;
      case 'EXAM':
        return <TestTube className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getEntityLabel = (type: string) => {
    switch (type) {
      case 'MEDICATION':
        return 'Medicamentos';
      case 'SYMPTOM':
        return 'Sintomas';
      case 'EXAM':
        return 'Exames';
      case 'VITAL_SIGN':
        return 'Sinais vitais';
      case 'DIAGNOSIS':
        return 'Diagnósticos';
      default:
        return type;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Analisador de Notas SOAP
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Extração automática de entidades clínicas
          </p>
        </div>
      </div>

      {/* SOAP Text Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Nota SOAP
        </label>
        <textarea
          value={soapText}
          onChange={(e) => setSoapText(e.target.value)}
          placeholder={`S: Paciente relata dor de cabeça há 3 dias, sem febre...
O: PA 130/85, FC 78, afebril...
A: Cefaleia tensional
P: Paracetamol 750mg 6/6h, retorno em 7 dias...`}
          className="w-full h-40 p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-vertical font-mono text-sm"
          disabled={isParsing}
        />
      </div>

      {/* Parse Button */}
      <button
        onClick={parseNote}
        disabled={!soapText.trim() || isParsing}
        className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isParsing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analisando...
          </>
        ) : (
          <>
            <FileText className="w-5 h-5" />
            Analisar Nota SOAP
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Results */}
      {extractedData && (
        <div className="mt-6 space-y-6">
          {/* Highlighted Original Text */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              Texto com Entidades Destacadas
            </h3>
            <div
              className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 max-h-60 overflow-y-auto whitespace-pre-wrap font-mono text-sm"
              dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
            />
            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-purple-300 dark:bg-purple-700" />
                Medicamentos
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-orange-300 dark:bg-orange-700" />
                Sintomas
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-blue-300 dark:bg-blue-700" />
                Exames
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-green-300 dark:bg-green-700" />
                Outros
              </span>
            </div>
          </div>

          {/* SOAP Sections */}
          {sectionEntries.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                Seções SOAP Identificadas
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {sectionEntries.map(([section, content], index) => (
                  <div
                    key={index}
                    className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                  >
                    <div className="font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      {sectionLabels[section]}
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                      {content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grouped Entities */}
          {groupedEntities && Object.keys(groupedEntities).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                Entidades Extraídas
              </h3>
              <div className="space-y-4">
                {Object.entries(groupedEntities).map(([type, entities]) => (
                  <div key={type}>
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                      {getEntityIcon(type)}
                      {getEntityLabel(type)}
                      <span className="text-xs text-zinc-500">({entities.length})</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {entities.map((entity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-sm text-zinc-800 dark:text-zinc-200"
                        >
                          {entity.text}
                          {entity.confidence && (
                            <span className="ml-1 text-xs text-zinc-500">
                              ({Math.round(entity.confidence * 100)}%)
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Copy Button */}
          <button
            onClick={copyExtractedData}
            className="py-2 px-4 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700 transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-400" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copiar Dados Extraídos (JSON)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default SOAPAnalyzer;
