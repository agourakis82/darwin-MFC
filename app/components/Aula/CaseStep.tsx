'use client';

import React, { useState, memo } from 'react';
import { CaseStep as CaseStepType } from '@/lib/data/caso-clinico';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, HelpCircle, ExternalLink } from 'lucide-react';

interface CaseStepProps {
  step: CaseStepType;
  onViewScreening?: (screeningId: string) => void;
}

function CaseStep({ step, onViewScreening }: CaseStepProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [expandedScreenings, setExpandedScreenings] = useState<string[]>([]);

  const toggleScreening = (id: string) => {
    setExpandedScreenings(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'indicated':
        return {
          icon: CheckCircle2,
          color: 'text-emerald-600 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-900/30',
          border: 'border-emerald-300 dark:border-emerald-700',
          label: 'Indicado'
        };
      case 'not-indicated':
        return {
          icon: XCircle,
          color: 'text-neutral-600 dark:text-neutral-400',
          bg: 'bg-neutral-50 dark:bg-neutral-800/50',
          border: 'border-neutral-300 dark:border-neutral-600',
          label: 'Não indicado'
        };
      case 'discuss':
        return {
          icon: HelpCircle,
          color: 'text-amber-600 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-900/30',
          border: 'border-amber-300 dark:border-amber-700',
          label: 'Discutir'
        };
      default:
        return {
          icon: HelpCircle,
          color: 'text-neutral-500',
          bg: 'bg-neutral-50',
          border: 'border-neutral-200',
          label: ''
        };
    }
  };

  const getConvergenceConfig = (convergence: string) => {
    switch (convergence) {
      case 'convergencia':
        return { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/40', label: 'Convergência' };
      case 'parcial':
        return { color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-100 dark:bg-amber-900/40', label: 'Parcial' };
      case 'divergencia':
        return { color: 'text-red-700 dark:text-red-300', bg: 'bg-red-100 dark:bg-red-900/40', label: 'Divergência' };
      default:
        return { color: 'text-neutral-500', bg: 'bg-neutral-100', label: '' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Passo */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl gradient-apple-blue flex items-center justify-center text-white font-black text-2xl shadow-lg">
          {step.id}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {step.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 font-medium">
            {step.subtitle}
          </p>
        </div>
      </div>

      {/* História Clínica */}
      <div className="card-premium overflow-hidden">
        <div className="px-6 py-4 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="text-lg">📋</span>
            História Clínica
          </h3>
        </div>
        <div className="p-6">
          <p className="text-neutral-800 dark:text-neutral-200 whitespace-pre-line leading-relaxed font-medium">
            {step.history}
          </p>
        </div>
      </div>

      {/* Exame Físico */}
      {step.physicalExam && (
        <div className="card-premium overflow-hidden">
          <div className="px-6 py-4 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-lg">🩺</span>
              Exame Físico
            </h3>
          </div>
          <div className="p-6">
            <p className="text-neutral-800 dark:text-neutral-200 font-mono text-sm font-semibold">
              {step.physicalExam}
            </p>
          </div>
        </div>
      )}

      {/* Pergunta para Discussão */}
      <div className="card-premium overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 border-blue-200 dark:border-blue-800">
        <div className="px-6 py-4 bg-blue-100/80 dark:bg-blue-900/40 border-b border-blue-200 dark:border-blue-700">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
            <span className="text-lg">❓</span>
            Pergunta para Discussão
          </h3>
        </div>
        <div className="p-6">
          <p className="text-lg text-blue-900 dark:text-blue-100 font-bold">
            {step.question}
          </p>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            {showAnswer ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Ocultar Resposta
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Revelar Resposta
              </>
            )}
          </button>
        </div>
      </div>

      {/* Rastreamentos (revelados) */}
      {showAnswer && (
        <div className="space-y-4 animate-fade-in-up">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="text-lg">✅</span>
            Rastreamentos a Considerar
          </h3>

          {step.screenings.map((screening) => {
            const statusConfig = getStatusConfig(screening.status);
            const convergenceConfig = getConvergenceConfig(screening.convergence);
            const isExpanded = expandedScreenings.includes(screening.id);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={screening.id}
                className={`rounded-2xl border-2 overflow-hidden transition-all ${statusConfig.border} ${statusConfig.bg}`}
              >
                {/* Cabeçalho do rastreamento */}
                <button
                  onClick={() => toggleScreening(screening.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {screening.name}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${convergenceConfig.bg} ${convergenceConfig.color}`}>
                      {convergenceConfig.label}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Detalhes expandidos */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
                    <div className="pt-4 grid gap-4 md:grid-cols-2">
                      {/* SUS */}
                      <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                        <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                          Recomendação SUS
                        </h4>
                        <p className="text-sm text-neutral-800 dark:text-neutral-200 font-medium">
                          {screening.susRecommendation}
                        </p>
                      </div>

                      {/* Sociedades */}
                      {screening.societiesRecommendation && (
                        <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                          <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-purple-500 rounded-full" />
                            Sociedades Médicas
                          </h4>
                          <p className="text-sm text-neutral-800 dark:text-neutral-200 font-medium">
                            {screening.societiesRecommendation}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Explicação */}
                    <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">
                        💡 Conduta neste caso:
                      </h4>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line font-medium">
                        {screening.explanation}
                      </p>
                    </div>

                    {/* Link para página de rastreamento */}
                    {onViewScreening && (
                      <button
                        onClick={() => onViewScreening(screening.id)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver diretrizes completas
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(CaseStep);
