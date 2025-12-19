'use client';

import { AlertTriangle, Info, TrendingUp, AlertCircle, BookOpen, Users, MapPin } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getCriticalAnalysisLocalizationConfig } from '@/lib/i18n/critical-analysis-localization';
import type { DiseaseCriticalAnalysis, MedicationCriticalAnalysis } from '@/lib/types/analysis-medical';
import type { Locale } from '@/i18n/config';

interface MedicalCriticalAnalysisViewProps {
  analysis: DiseaseCriticalAnalysis | MedicationCriticalAnalysis;
  type: 'disease' | 'medication';
}

export default function MedicalCriticalAnalysisView({
  analysis,
  type,
}: MedicalCriticalAnalysisViewProps) {
  const locale = useLocale() as Locale;
  const config = getCriticalAnalysisLocalizationConfig(locale);
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 p-8">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/30">
            <TrendingUp className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              Análise Crítica: {type === 'disease' ? 'Doença' : 'Medicamento'}
            </h2>
            <p className="text-base lg:text-lg text-neutral-600 dark:text-neutral-400">
              Insights sistêmicos, controvérsias e desafios operacionais da realidade de {config.countryName} ({config.healthSystemAbbreviation})
            </p>
          </div>
        </div>
      </div>

      {/* Context */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              📚 Contexto
            </h3>
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {analysis.context}
            </p>
            {analysis.paradigmShift && (
              <div className="mt-3 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-bold inline-block">
                🔄 Mudança de Paradigma Recente
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Didactic Introduction */}
      {analysis.didacticIntro && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                📚 Contexto para Compreensão
              </h3>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {analysis.didacticIntro}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Insights */}
      {analysis.insights.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Info className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-50">
              Insights Sistêmicos
            </h3>
          </div>

          <div className="space-y-5">
            {analysis.insights.map((insight, idx) => (
              <div
                key={insight.id}
                className={`relative overflow-hidden rounded-xl border-2 ${
                  insight.type === 'first_order'
                    ? 'border-emerald-200 dark:border-emerald-800 bg-white dark:bg-neutral-900'
                    : insight.type === 'second_order'
                    ? 'border-blue-200 dark:border-blue-800 bg-white dark:bg-neutral-900'
                    : 'border-purple-200 dark:border-purple-800 bg-white dark:bg-neutral-900'
                } shadow-md hover:shadow-xl transition-all duration-300`}
              >
                {/* Order Badge & Title */}
                <div className="p-6 border-b-2 border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                        insight.type === 'first_order'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : insight.type === 'second_order'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      }`}>
                        {insight.type === 'first_order' ? '1ª Ordem' : insight.type === 'second_order' ? '2ª Ordem' : '3ª Ordem'}
                      </span>
                      {insight.evidenceLevel && (
                        <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded text-xs font-bold">
                          Evidência {insight.evidenceLevel}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-neutral-400">#{idx + 1}</span>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                    {insight.title}
                  </h4>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {insight.content}
                  </p>

                  {/* Practical Example */}
                  {insight.practicalExample && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <p className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-2">
                            💡 Exemplo Prático da Realidade Brasileira
                          </p>
                          <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                            {insight.practicalExample}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Key Takeaway */}
                  {insight.keyTakeaway && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1.5">
                        🎯 Mensagem-Chave
                      </p>
                      <p className="text-sm text-blue-900 dark:text-blue-200 font-medium">
                        {insight.keyTakeaway}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controvérsias */}
      {analysis.controversies.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-600/30">
              <AlertTriangle className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-50">
              Controvérsias e Tensões
            </h3>
          </div>

          <div className="space-y-5">
            {analysis.controversies.map((controversy) => (
              <div
                key={controversy.id}
                className="relative overflow-hidden rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-white dark:bg-neutral-900 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Title */}
                <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-b-2 border-amber-100 dark:border-amber-900">
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                    {controversy.title}
                  </h4>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {controversy.description}
                  </p>

                  {/* Real World Scenario */}
                  {controversy.realWorldScenario && (
                    <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <div>
                          <p className="text-sm font-bold text-red-900 dark:text-red-200 mb-2">
                            🏥 Cenário Real da UBS
                          </p>
                          <p className="text-sm text-red-900 dark:text-red-200 leading-relaxed">
                            {controversy.realWorldScenario}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Current Consensus */}
                  {controversy.currentConsensus && (
                    <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 rounded-lg p-4">
                      <p className="text-sm font-bold text-green-900 dark:text-green-200 mb-2">
                        ✅ Consenso Atual
                      </p>
                      <p className="text-sm text-green-900 dark:text-green-200 leading-relaxed">
                        {controversy.currentConsensus}
                      </p>
                    </div>
                  )}

                  {/* Stakeholders */}
                  {controversy.stakeholders.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                        Atores Envolvidos
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {controversy.stakeholders.map((stakeholder, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-semibold border border-amber-300 dark:border-amber-700"
                          >
                            {stakeholder}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desafios Operacionais */}
      {analysis.operationalChallenges.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30">
              <AlertCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-50">
              Desafios Operacionais do Dia a Dia
            </h3>
          </div>

          <div className="space-y-4">
            {analysis.operationalChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-white dark:bg-neutral-900 shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm ${
                      challenge.severity === 'critical' ? 'bg-red-600 text-white' :
                      challenge.severity === 'high' ? 'bg-red-500 text-white' :
                      challenge.severity === 'medium' ? 'bg-orange-500 text-white' :
                      'bg-yellow-500 text-white'
                    }`}>
                      {challenge.severity === 'critical' ? '🔴' :
                       challenge.severity === 'high' ? '⚠️' :
                       challenge.severity === 'medium' ? '⚡' : 'ℹ️'}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                        {challenge.title}
                      </h4>
                      <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                        {challenge.description}
                      </p>
                      {challenge.potentialSolutions && challenge.potentialSolutions.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                          <p className="text-sm font-bold text-neutral-600 dark:text-neutral-400 mb-2">
                            💡 Soluções Potenciais:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                            {challenge.potentialSolutions.map((solution, idx) => (
                              <li key={idx}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Implicações Sistêmicas */}
      {analysis.systemicImplications && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-8 shadow-lg">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="relative">
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 flex items-center gap-2">
              💡 Implicações Sistêmicas
            </h3>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {analysis.systemicImplications}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

