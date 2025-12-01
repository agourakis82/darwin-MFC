'use client';

import { Rastreamento } from '@/lib/types/rastreamentos';
import ComparisonCard from './ComparisonCard';
import InlineCitation from '../Bibliography/InlineCitation';

interface ComparisonSectionProps {
  rastreamento: Rastreamento;
  showEpidemiology?: boolean;
}

export default function ComparisonSection({ 
  rastreamento, 
  showEpidemiology = true 
}: ComparisonSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {rastreamento.title}
          </h2>
          <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full text-xs font-medium">
            Atualização: {new Date(rastreamento.lastUpdate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
          </span>
        </div>
        
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {rastreamento.description}
        </p>
      </div>

      {/* Dados Epidemiológicos */}
      {showEpidemiology && (
        <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Dados Epidemiológicos
          </h3>
          
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {rastreamento.epidemiology.incidence && (
              <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg">
                <dt className="text-neutral-600 dark:text-neutral-400 mb-1 font-medium">
                  Incidência
                </dt>
                <dd className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {rastreamento.epidemiology.incidence}
                </dd>
              </div>
            )}
            
            {rastreamento.epidemiology.mortality && (
              <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg">
                <dt className="text-neutral-600 dark:text-neutral-400 mb-1 font-medium">
                  Mortalidade
                </dt>
                <dd className="text-lg font-bold text-red-600 dark:text-red-400">
                  {rastreamento.epidemiology.mortality}
                </dd>
              </div>
            )}
            
            {rastreamento.epidemiology.prevalence && (
              <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg">
                <dt className="text-neutral-600 dark:text-neutral-400 mb-1 font-medium">
                  Prevalência/Situação
                </dt>
                <dd className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  {rastreamento.epidemiology.prevalence}
                </dd>
              </div>
            )}
          </dl>
          
          {rastreamento.epidemiology.citations.length > 0 && (
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400">
              Fontes: <InlineCitation citation={rastreamento.epidemiology.citations} />
            </div>
          )}
        </div>
      )}

      {/* Card de Comparação */}
      <ComparisonCard 
        title={`Comparação: ${rastreamento.title}`}
        recommendations={rastreamento.recommendations}
      />
    </div>
  );
}

