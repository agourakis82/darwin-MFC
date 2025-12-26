'use client';

import React from 'react';
import { Sparkles, Pill, Stethoscope, FileCode, AlertCircle, CheckCircle2 } from 'lucide-react';
import { analyzeSOAPText, type SOAPAnalysis, type ExtractedEntity } from '@/lib/utils/nlp-soap';
import { Link } from '@/i18n/routing';

interface SOAPNLPSuggestionsProps {
  text: string;
  onSelectDiagnosis?: (doencaId: string) => void;
  onSelectMedication?: (medicamentoId: string) => void;
  onSelectCode?: (code: string, type: 'cid10' | 'ciap2') => void;
  showOnly?: ('diagnoses' | 'medications' | 'codes' | 'all')[];
  maxSuggestions?: number;
}

export default function SOAPNLPSuggestions({
  text,
  onSelectDiagnosis,
  onSelectMedication,
  onSelectCode,
  showOnly = ['all'],
  maxSuggestions = 5,
}: SOAPNLPSuggestionsProps) {
  const analysis = React.useMemo(() => {
    if (!text || text.trim().length < 10) return null;
    
    try {
      return analyzeSOAPText(text, {
        extractDiseases: showOnly.includes('all') || showOnly.includes('diagnoses'),
        extractMedications: showOnly.includes('all') || showOnly.includes('medications'),
        extractCodes: showOnly.includes('all') || showOnly.includes('codes'),
        suggestDiagnoses: showOnly.includes('all') || showOnly.includes('diagnoses'),
        minConfidence: 0.4,
      });
    } catch (error) {
      console.error('Erro ao analisar texto SOAP:', error);
      return null;
    }
  }, [text, showOnly]);

  if (!analysis || analysis.entities.length === 0) {
    return null;
  }

  const hasDiagnoses = analysis.suggestedDiagnoses.length > 0;
  const hasMedications = analysis.suggestedMedications.length > 0;
  const hasCodes = analysis.suggestedCodes.cid10.length > 0 || analysis.suggestedCodes.ciap2.length > 0;

  return (
    <div className="mt-4 space-y-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-semibold text-sm">Sugestões Inteligentes (NLP)</h3>
        <span className="text-xs text-blue-600 dark:text-blue-400">
          ({analysis.entities.length} entidades detectadas)
        </span>
      </div>

      {/* Diagnósticos Sugeridos */}
      {hasDiagnoses && (showOnly.includes('all') || showOnly.includes('diagnoses')) && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Stethoscope className="w-4 h-4" />
            <span>Diagnósticos Sugeridos</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.suggestedDiagnoses.slice(0, maxSuggestions).map((item) => (
              <button
                key={item.doenca.id}
                onClick={() => onSelectDiagnosis?.(item.doenca.id!)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-neutral-800 border border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors group"
                title={`Confiança: ${Math.round(item.confidence * 100)}%`}
              >
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {item.doenca.titulo || item.doenca.id}
                </span>
                <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded">
                  {Math.round(item.confidence * 100)}%
                </span>
                {item.matchedTerms.length > 0 && (
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    ({item.matchedTerms.slice(0, 2).join(', ')})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Medicamentos Sugeridos */}
      {hasMedications && (showOnly.includes('all') || showOnly.includes('medications')) && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Pill className="w-4 h-4" />
            <span>Medicamentos Detectados</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.suggestedMedications.slice(0, maxSuggestions).map((item) => (
              <button
                key={item.medicamento.id}
                onClick={() => onSelectMedication?.(item.medicamento.id)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-neutral-800 border border-green-300 dark:border-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                title={`Confiança: ${Math.round(item.confidence * 100)}%`}
              >
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {item.medicamento.nomeGenerico}
                </span>
                <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded">
                  {Math.round(item.confidence * 100)}%
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Códigos Detectados */}
      {hasCodes && (showOnly.includes('all') || showOnly.includes('codes')) && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <FileCode className="w-4 h-4" />
            <span>Códigos Detectados</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.suggestedCodes.cid10.map((code) => (
              <button
                key={`cid10-${code}`}
                onClick={() => onSelectCode?.(code, 'cid10')}
                className="px-3 py-1.5 bg-white dark:bg-neutral-800 border border-purple-300 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
              >
                <span className="text-sm font-mono font-medium text-purple-700 dark:text-purple-300">
                  CID-10: {code}
                </span>
              </button>
            ))}
            {analysis.suggestedCodes.ciap2.map((code) => (
              <button
                key={`ciap2-${code}`}
                onClick={() => onSelectCode?.(code, 'ciap2')}
                className="px-3 py-1.5 bg-white dark:bg-neutral-800 border border-orange-300 dark:border-orange-700 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors"
              >
                <span className="text-sm font-mono font-medium text-orange-700 dark:text-orange-300">
                  CIAP-2: {code}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Entidades Detalhadas (Colapsável) */}
      {analysis.entities.length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200">
            Ver todas as entidades detectadas ({analysis.entities.length})
          </summary>
          <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
            {analysis.entities.map((entity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs p-2 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700"
              >
                <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded text-neutral-700 dark:text-neutral-300 font-medium">
                  {entity.type}
                </span>
                <span className="flex-1 text-neutral-900 dark:text-neutral-100">{entity.text}</span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  {Math.round(entity.confidence * 100)}%
                </span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

/**
 * Componente compacto para exibir sugestões inline
 */
export function SOAPNLPSuggestionsInline({
  text,
  onSelectDiagnosis,
  onSelectMedication,
}: {
  text: string;
  onSelectDiagnosis?: (doencaId: string) => void;
  onSelectMedication?: (medicamentoId: string) => void;
}) {
  const analysis = React.useMemo(() => {
    if (!text || text.trim().length < 10) return null;
    
    try {
      return analyzeSOAPText(text, {
        extractDiseases: true,
        extractMedications: true,
        suggestDiagnoses: true,
        minConfidence: 0.5,
      });
    } catch {
      return null;
    }
  }, [text]);

  if (!analysis || (analysis.suggestedDiagnoses.length === 0 && analysis.suggestedMedications.length === 0)) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {analysis.suggestedDiagnoses.slice(0, 3).map((item) => (
        <button
          key={item.doenca.id}
          onClick={() => onSelectDiagnosis?.(item.doenca.id!)}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          <Stethoscope className="w-3 h-3" />
          {item.doenca.titulo || item.doenca.id}
        </button>
      ))}
      {analysis.suggestedMedications.slice(0, 3).map((item) => (
        <button
          key={item.medicamento.id}
          onClick={() => onSelectMedication?.(item.medicamento.id)}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
        >
          <Pill className="w-3 h-3" />
          {item.medicamento.nomeGenerico}
        </button>
      ))}
    </div>
  );
}

