'use client';

import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, Users, AlertTriangle, Activity } from 'lucide-react';
import { getDiseaseStatistics, getCID10Distribution, extractPrevalenceData } from '@/lib/utils/disease-stats';
import DiseaseCategoryChart from '@/app/components/Charts/DiseaseCategoryChart';
import DiseasePrevalenceChart from '@/app/components/Charts/DiseasePrevalenceChart';
import CID10DistributionChart from '@/app/components/Charts/CID10DistributionChart';
import { doencasConsolidadas } from '@/lib/data/doencas/index';
import type { Doenca } from '@/lib/types/doenca';

interface EpidemiologicalDashboardProps {
  diseases?: Partial<Doenca>[];
  title?: string;
}

export default function EpidemiologicalDashboard({
  diseases = doencasConsolidadas,
  title = 'Dashboard Epidemiológico',
}: EpidemiologicalDashboardProps) {
  const stats = useMemo(() => getDiseaseStatistics(diseases), [diseases]);
  const prevalenceData = useMemo(() => extractPrevalenceData(diseases), [diseases]);

  const statCards = [
    {
      title: 'Total de Doenças',
      value: stats.total,
      icon: Activity,
      color: 'bg-blue-500',
      description: 'Doenças catalogadas',
    },
    {
      title: 'Com Prevalência',
      value: stats.withPrevalence,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      description: 'Com dados de prevalência',
    },
    {
      title: 'Com CID-10',
      value: stats.withCID10,
      icon: BarChart3,
      color: 'bg-purple-500',
      description: 'Com código CID-10',
    },
    {
      title: 'Com CIAP-2',
      value: stats.withCIAP2,
      icon: Users,
      color: 'bg-amber-500',
      description: 'Com código CIAP-2',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{title}</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Visão geral epidemiológica das doenças catalogadas
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">
                    {card.value}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                    {card.description}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Categoria */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Distribuição por Categoria
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            {stats.byCategory.length} categorias identificadas
          </p>
          <DiseaseCategoryChart diseases={diseases} height={300} showLegend={true} />
        </div>

        {/* Distribuição CID-10 */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Distribuição por CID-10
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Classificação Internacional de Doenças (primeira letra)
          </p>
          <CID10DistributionChart diseases={diseases} limit={10} height={300} orientation="vertical" />
        </div>
      </div>

      {/* Prevalência */}
      {prevalenceData.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Top Doenças por Prevalência
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            {prevalenceData.length} doenças com dados de prevalência disponíveis
          </p>
          <DiseasePrevalenceChart diseases={diseases} limit={20} height={400} />
        </div>
      )}

      {/* Top Categorias */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
          Top 10 Categorias
        </h3>
        <div className="space-y-3">
          {stats.byCategory.slice(0, 10).map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {category.category}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {category.percentage.toFixed(1)}% do total
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {category.count}
                </p>
                <p className="text-xs text-neutral-500">doenças</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

