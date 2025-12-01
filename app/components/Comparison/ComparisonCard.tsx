'use client';

import { Recommendations } from '@/lib/types/rastreamentos';
import InlineCitation from '../Bibliography/InlineCitation';
import { CheckCircle2, AlertCircle, XCircle, Circle } from 'lucide-react';

interface ComparisonCardProps {
  title: string;
  recommendations: Recommendations;
}

export default function ComparisonCard({ title, recommendations }: ComparisonCardProps) {
  const { sus, societies, convergence } = recommendations;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'convergencia':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'parcial':
        return 'border-amber-500 bg-amber-50 dark:bg-amber-900/20';
      case 'divergencia':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'em_disputa':
        return 'border-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'border-neutral-300 bg-neutral-50 dark:bg-neutral-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'convergencia':
        return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'parcial':
        return <Circle className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'divergencia':
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'em_disputa':
        return <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'convergencia':
        return 'Convergência';
      case 'parcial':
        return 'Convergência Parcial';
      case 'divergencia':
        return 'Divergência';
      case 'em_disputa':
        return 'Em Disputa';
      default:
        return status;
    }
  };

  return (
    <div className={`border-2 rounded-xl overflow-hidden ${getStatusColor(convergence.status)}`}>
      {/* Header com Status */}
      <div className="px-6 py-4 border-b border-current/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-current/30">
            {getStatusIcon(convergence.status)}
            <span className="text-sm font-semibold">
              {getStatusLabel(convergence.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Comparação */}
      <div className="grid md:grid-cols-2 divide-x divide-current/20">
        {/* Coluna SUS */}
        <div className="p-6 bg-white dark:bg-neutral-900">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SUS</span>
              </div>
              <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                Sistema Único de Saúde
              </h4>
            </div>
          </div>

          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                População-alvo
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400">
                {sus.population}{' '}
                {sus.citations.length > 0 && <InlineCitation citation={sus.citations} />}
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Método
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400">
                {sus.method}
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Periodicidade
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400">
                {sus.periodicity}
              </dd>
            </div>

            {sus.coverage && (
              <div>
                <dt className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Cobertura
                </dt>
                <dd className="text-neutral-600 dark:text-neutral-400">
                  {sus.coverage}
                </dd>
              </div>
            )}

            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
              <dt className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Justificativa
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400 text-xs italic">
                {sus.justification}
              </dd>
            </div>
          </dl>
        </div>

        {/* Coluna Sociedades */}
        <div className="p-6 bg-white dark:bg-neutral-900">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">SM</span>
              </div>
              <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                Sociedades Médicas
              </h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {societies.organization.map((org) => (
                <span
                  key={org}
                  className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium"
                >
                  {org}
                </span>
              ))}
            </div>
          </div>

          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                População-alvo
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400">
                {societies.population}{' '}
                {societies.citations.length > 0 && <InlineCitation citation={societies.citations} />}
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Método
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400">
                {societies.method}
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Periodicidade
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400">
                {societies.periodicity}
              </dd>
            </div>

            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
              <dt className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Recomendação
              </dt>
              <dd className="text-neutral-600 dark:text-neutral-400 text-xs italic">
                {societies.recommendation}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Análise de Convergência */}
      <div className="px-6 py-4 bg-white/50 dark:bg-neutral-800/50 border-t border-current/20">
        <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 text-sm">
          Análise de Convergência
        </h5>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          {convergence.description}{' '}
          {convergence.citations.length > 0 && <InlineCitation citation={convergence.citations} />}
        </p>
      </div>
    </div>
  );
}

