'use client';

import { Recommendations } from '@/lib/types/rastreamentos';
import InlineCitation from '../Bibliography/InlineCitation';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, Building2, Hospital } from 'lucide-react';

interface ComparisonCardProps {
  title: string;
  recommendations: Recommendations;
}

export default function ComparisonCard({ title, recommendations }: ComparisonCardProps) {
  const { sus, societies, convergence } = recommendations;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'convergencia':
        return {
          color: 'emerald',
          icon: CheckCircle2,
          label: 'Convergência Total',
          gradient: 'from-emerald-500/10 to-teal-500/10',
          border: 'border-emerald-200 dark:border-emerald-800',
          badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700'
        };
      case 'parcial':
        return {
          color: 'amber',
          icon: HelpCircle,
          label: 'Convergência Parcial',
          gradient: 'from-amber-500/10 to-orange-500/10',
          border: 'border-amber-200 dark:border-amber-800',
          badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
        };
      case 'divergencia':
        return {
          color: 'red',
          icon: XCircle,
          label: 'Divergência',
          gradient: 'from-red-500/10 to-rose-500/10',
          border: 'border-red-200 dark:border-red-800',
          badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
        };
      case 'em_disputa':
        return {
          color: 'purple',
          icon: AlertTriangle,
          label: 'Em Disputa',
          gradient: 'from-purple-500/10 to-violet-500/10',
          border: 'border-purple-200 dark:border-purple-800',
          badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-700'
        };
      default:
        return {
          color: 'neutral',
          icon: HelpCircle,
          label: status,
          gradient: 'from-neutral-500/10 to-gray-500/10',
          border: 'border-neutral-200 dark:border-neutral-800',
          badge: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
        };
    }
  };

  const statusConfig = getStatusConfig(convergence.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group">
      {/* Main Card Container */}
      <div className={`
        relative overflow-hidden rounded-2xl border-2 ${statusConfig.border}
        bg-gradient-to-br ${statusConfig.gradient}
        backdrop-blur-sm transition-all duration-300
        hover:shadow-2xl hover:scale-[1.01]
      `}>
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

        {/* Header with Title & Status */}
        <div className="relative px-8 py-6 border-b border-neutral-200/50 dark:border-neutral-700/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2 leading-tight">
                {title}
              </h3>
            </div>
            <div className={`
              flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 ${statusConfig.badge}
              shadow-sm transition-transform group-hover:scale-105
            `}>
              <StatusIcon className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-sm font-bold whitespace-nowrap">
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/50 dark:divide-neutral-700/50">
          {/* SUS Column */}
          <div className="relative p-8 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
            {/* SUS Header */}
            <div className="mb-6 pb-5 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <Hospital className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                    Sistema Único de Saúde
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Protocolo Ministério da Saúde
                  </p>
                </div>
              </div>
            </div>

            {/* SUS Content */}
            <dl className="space-y-5">
              <DataField
                label="População-alvo"
                value={sus.population}
                citations={sus.citations}
              />
              <DataField
                label="Método"
                value={sus.method}
              />
              <DataField
                label="Periodicidade"
                value={sus.periodicity}
              />
              {sus.coverage && (
                <DataField
                  label="Cobertura Atual"
                  value={sus.coverage}
                  highlight
                />
              )}
              <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
                <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  Justificativa Técnica
                </dt>
                <dd className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed italic bg-neutral-50 dark:bg-neutral-800/50 px-4 py-3 rounded-lg">
                  {sus.justification}
                </dd>
              </div>
            </dl>
          </div>

          {/* Societies Column */}
          <div className="relative p-8 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
            {/* Societies Header */}
            <div className="mb-6 pb-5 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/30">
                  <Building2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                    Sociedades Médicas
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {societies.organization.map((org) => (
                      <span
                        key={org}
                        className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-md text-xs font-bold border border-emerald-300 dark:border-emerald-700"
                      >
                        {org}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Societies Content */}
            <dl className="space-y-5">
              <DataField
                label="População-alvo"
                value={societies.population}
                citations={societies.citations}
              />
              <DataField
                label="Método"
                value={societies.method}
              />
              <DataField
                label="Periodicidade"
                value={societies.periodicity}
              />
              <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
                <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  Recomendação Detalhada
                </dt>
                <dd className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed italic bg-neutral-50 dark:bg-neutral-800/50 px-4 py-3 rounded-lg">
                  {societies.recommendation}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Convergence Analysis Footer */}
        <div className="relative px-8 py-6 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800/50 dark:to-neutral-900/50 border-t-2 border-neutral-200/50 dark:border-neutral-700/50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <StatusIcon className={`w-6 h-6 text-${statusConfig.color}-600 dark:text-${statusConfig.color}-400`} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Análise de Convergência
              </h5>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {convergence.description}{' '}
                {convergence.citations.length > 0 && <InlineCitation citation={convergence.citations} />}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Data Fields
function DataField({
  label,
  value,
  citations,
  highlight
}: {
  label: string;
  value: string;
  citations?: any[];
  highlight?: boolean;
}) {
  return (
    <div className={highlight ? 'bg-blue-50 dark:bg-blue-900/10 -mx-2 px-2 py-2 rounded-lg' : ''}>
      <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
        {label}
      </dt>
      <dd className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {value}{' '}
        {citations && citations.length > 0 && <InlineCitation citation={citations} />}
      </dd>
    </div>
  );
}
