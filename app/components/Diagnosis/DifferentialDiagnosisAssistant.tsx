'use client';

import React, { useState } from 'react';
import { Brain, Plus, X, Stethoscope, TestTube, AlertTriangle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import {
  generateDifferentialDiagnosis,
  generateDiagnosticPathway,
  type DifferentialDiagnosisResult,
  type DiagnosticPathway,
} from '@/lib/utils/differential-diagnosis';
import { Link } from '@/i18n/routing';

interface DifferentialDiagnosisAssistantProps {
  initialSymptom?: string;
  initialSecondarySymptoms?: string[];
  onDiagnosisSelect?: (doencaId: string) => void;
}

export default function DifferentialDiagnosisAssistant({
  initialSymptom = '',
  initialSecondarySymptoms = [],
  onDiagnosisSelect,
}: DifferentialDiagnosisAssistantProps) {
  const [sintomaPrincipal, setSintomaPrincipal] = useState(initialSymptom);
  const [sintomasSecundarios, setSintomasSecundarios] = useState<string[]>(initialSecondarySymptoms);
  const [novoSintoma, setNovoSintoma] = useState('');
  const [result, setResult] = useState<DifferentialDiagnosisResult | null>(null);
  const [pathway, setPathway] = useState<DiagnosticPathway | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Atualiza quando initialSymptom muda (ex: quando usuário digita no SOAP)
  React.useEffect(() => {
    if (initialSymptom) {
      setSintomaPrincipal(initialSymptom);
    }
  }, [initialSymptom]);

  React.useEffect(() => {
    if (initialSecondarySymptoms.length > 0) {
      setSintomasSecundarios(initialSecondarySymptoms);
    }
  }, [initialSecondarySymptoms]);

  const handleAnalyze = () => {
    if (!sintomaPrincipal.trim()) return;

    const differential = generateDifferentialDiagnosis(
      sintomaPrincipal,
      sintomasSecundarios,
      []
    );
    setResult(differential);

    const pathwayResult = generateDiagnosticPathway(sintomaPrincipal, sintomasSecundarios);
    setPathway(pathwayResult);
  };

  const handleAddSymptom = () => {
    if (novoSintoma.trim() && !sintomasSecundarios.includes(novoSintoma.trim())) {
      setSintomasSecundarios([...sintomasSecundarios, novoSintoma.trim()]);
      setNovoSintoma('');
    }
  };

  const handleRemoveSymptom = (sintoma: string) => {
    setSintomasSecundarios(sintomasSecundarios.filter(s => s !== sintoma));
  };

  const getProbabilityColor = (probabilidade: string) => {
    switch (probabilidade) {
      case 'alta':
        return 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-700 text-green-700 dark:text-green-300';
      case 'moderada':
        return 'bg-amber-100 dark:bg-amber-900/30 border-amber-500 dark:border-amber-700 text-amber-700 dark:text-amber-300';
      case 'baixa':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-700 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-neutral-100 dark:bg-neutral-900/30 border-neutral-500 dark:border-neutral-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Assistente de Diagnóstico Diferencial
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Análise sistemática de sintomas para diagnóstico diferencial
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Input de Sintomas */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Sintoma Principal *
              </label>
              <input
                type="text"
                value={sintomaPrincipal}
                onChange={e => setSintomaPrincipal(e.target.value)}
                placeholder="Ex: Tosse, Dor abdominal, Cefaleia..."
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAnalyze();
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Sintomas Secundários
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={novoSintoma}
                  onChange={e => setNovoSintoma(e.target.value)}
                  placeholder="Adicionar sintoma secundário..."
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSymptom();
                    }
                  }}
                />
                <button
                  onClick={handleAddSymptom}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
              {sintomasSecundarios.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {sintomasSecundarios.map((sintoma, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {sintoma}
                      <button
                        onClick={() => handleRemoveSymptom(sintoma)}
                        className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!sintomaPrincipal.trim()}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Brain className="w-5 h-5" />
              Analisar Diagnóstico Diferencial
            </button>
          </div>

          {/* Resultados */}
          {result && (
            <div className="space-y-4">
              {/* Diagnósticos Diferenciais */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-purple-600" />
                  Diagnósticos Diferenciais ({result.diagnosticosDiferenciais.length})
                </h3>
                <div className="space-y-4">
                  {result.diagnosticosDiferenciais.map((diff, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${getProbabilityColor(diff.probabilidade)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg">
                              {diff.doenca.titulo || diff.doenca.id}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getProbabilityColor(diff.probabilidade)}`}>
                              {diff.probabilidade.toUpperCase()}
                            </span>
                            <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded text-xs font-mono">
                              Score: {Math.round(diff.score)}%
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                            Critérios atendidos: {diff.criteriosAtendidos}/{diff.criteriosTotais}
                          </p>
                          {diff.doenca.quickView?.definicao && (
                            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                              {diff.doenca.quickView.definicao}
                            </p>
                          )}
                        </div>
                        {onDiagnosisSelect && (
                          <button
                            onClick={() => diff.doenca.id && onDiagnosisSelect(diff.doenca.id)}
                            className="ml-4 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            Selecionar
                          </button>
                        )}
                      </div>

                      {/* Exames Recomendados */}
                      {diff.examesRecomendados.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-current/20">
                          <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                            <TestTube className="w-3 h-3" />
                            Exames Recomendados:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {diff.examesRecomendados.map((exame, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded text-xs"
                              >
                                {exame}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Red Flags */}
                      {diff.redFlags.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-current/20">
                          <p className="text-xs font-semibold mb-1 flex items-center gap-1 text-red-600 dark:text-red-400">
                            <AlertTriangle className="w-3 h-3" />
                            Sinais de Alarme:
                          </p>
                          <ul className="list-disc list-inside text-xs space-y-0.5">
                            {diff.redFlags.map((flag, idx) => (
                              <li key={idx}>{flag}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendações */}
              {result.recomendacoes && (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-purple-600" />
                    Recomendações
                  </h3>

                  {/* Exames */}
                  {result.recomendacoes.exames.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                        <TestTube className="w-4 h-4" />
                        Exames Recomendados
                      </h4>
                      <div className="space-y-2">
                        {result.recomendacoes.exames.map((exame, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${
                              exame.prioridade === 'alta'
                                ? 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-700'
                                : exame.prioridade === 'media'
                                ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700'
                                : 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{exame.nome}</p>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                                  {exame.justificativa}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  exame.prioridade === 'alta'
                                    ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                                    : exame.prioridade === 'media'
                                    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                                    : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                }`}
                              >
                                {exame.prioridade.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Encaminhamentos */}
                  {result.recomendacoes.encaminhamento.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                        Encaminhamentos Sugeridos
                      </h4>
                      <div className="space-y-2">
                        {result.recomendacoes.encaminhamento.map((enc, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${
                              enc.urgencia === 'urgente'
                                ? 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-700'
                                : 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{enc.especialidade}</p>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                                  {enc.motivo}
                                </p>
                              </div>
                              {enc.urgencia === 'urgente' && (
                                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded text-xs font-semibold">
                                  URGENTE
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

