'use client';

import { Rastreamento } from '@/lib/types/rastreamentos';
import ComparisonCard from './ComparisonCard';
import InlineCitation from '../Bibliography/InlineCitation';
import { TrendingUp, Skull, Users, Calendar, BarChart3 } from 'lucide-react';

interface ComparisonSectionProps {
  rastreamento: Rastreamento;
  showEpidemiology?: boolean;
}

export default function ComparisonSection({
  rastreamento,
  showEpidemiology = true
}: ComparisonSectionProps) {
  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="relative">
        {/* Gradient Background Bar */}
        <div className="absolute -left-8 -right-8 top-0 bottom-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent dark:via-blue-950/20 rounded-2xl pointer-events-none" />

        <div className="relative space-y-4 py-6">
          {/* Title & Update Badge */}
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-neutral-50 dark:to-neutral-300 bg-clip-text text-transparent leading-tight">
              {rastreamento.title}
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl shadow-sm">
              <Calendar className="w-4 h-4 text-blue-700 dark:text-blue-400" strokeWidth={2.5} />
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                {new Date(rastreamento.lastUpdate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-5xl">
            {rastreamento.description}
          </p>
        </div>
      </div>

      {/* Premium Epidemiology Section */}
      {showEpidemiology && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900/50 dark:to-neutral-800/50 backdrop-blur-sm shadow-lg">
          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="relative p-8">
            {/* Section Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/30">
                <BarChart3 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                Dados Epidemiológicos
              </h3>
            </div>

            {/* Stats Grid */}
            <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rastreamento.epidemiology.incidence && (
                <div className="group relative overflow-hidden bg-white dark:bg-neutral-800 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3">
                    Incidência
                  </dt>
                  <dd className="text-2xl font-bold text-blue-700 dark:text-blue-400 leading-tight pr-14">
                    {rastreamento.epidemiology.incidence}
                  </dd>
                </div>
              )}

              {rastreamento.epidemiology.mortality && (
                <div className="group relative overflow-hidden bg-white dark:bg-neutral-800 rounded-xl p-6 border-2 border-red-200 dark:border-red-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
                    <Skull className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3">
                    Mortalidade
                  </dt>
                  <dd className="text-2xl font-bold text-red-700 dark:text-red-400 leading-tight pr-14">
                    {rastreamento.epidemiology.mortality}
                  </dd>
                </div>
              )}

              {rastreamento.epidemiology.prevalence && (
                <div className="group relative overflow-hidden bg-white dark:bg-neutral-800 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-3">
                    Prevalência/Situação
                  </dt>
                  <dd className="text-base font-bold text-emerald-700 dark:text-emerald-400 leading-snug pr-14">
                    {rastreamento.epidemiology.prevalence}
                  </dd>
                </div>
              )}
            </dl>

            {/* Citations Footer */}
            {rastreamento.epidemiology.citations.length > 0 && (
              <div className="mt-6 pt-6 border-t-2 border-neutral-200 dark:border-neutral-700">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                  Fontes Epidemiológicas
                </p>
                <div className="text-sm text-neutral-700 dark:text-neutral-300">
                  <InlineCitation citation={rastreamento.epidemiology.citations} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comparison Card */}
      <ComparisonCard
        title={`Comparação: ${rastreamento.title}`}
        recommendations={rastreamento.recommendations}
      />
    </div>
  );
}
