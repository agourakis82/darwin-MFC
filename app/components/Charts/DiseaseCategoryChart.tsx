'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, type PieLabelRenderProps } from 'recharts';
import { getDiseaseCategoryStats } from '@/lib/utils/disease-stats';

interface DiseaseCategoryChartProps {
  diseases?: Partial<import('@/lib/types/doenca').Doenca>[];
  showLabels?: boolean;
  showLegend?: boolean;
  height?: number;
}

const COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#06B6D4', // cyan-500
  '#F97316', // orange-500
  '#14B8A6', // teal-500
  '#6366F1', // indigo-500
  '#84CC16', // lime-500
  '#A855F7', // purple-500
];

const CATEGORY_LABELS: Record<string, string> = {
  cardiovascular: 'Cardiovascular',
  metabolico: 'Metabólico',
  respiratorio: 'Respiratório',
  musculoesqueletico: 'Musculoesquelético',
  saude_mental: 'Saúde Mental',
  infecciosas: 'Infecciosas',
  dermatologico: 'Dermatológico',
  gastrointestinal: 'Gastrointestinal',
  neurologico: 'Neurológico',
  endocrino: 'Endócrino',
  hematologico: 'Hematológico',
  urologico: 'Urológico',
  ginecologico: 'Ginecológico',
  pediatrico: 'Pediátrico',
  geriatrico: 'Geriátrico',
  outros: 'Outros',
};

export default function DiseaseCategoryChart({
  diseases,
  showLabels = false,
  showLegend = true,
  height = 300,
}: DiseaseCategoryChartProps) {
  const stats = getDiseaseCategoryStats(diseases);

  const data = stats.map(stat => ({
    name: CATEGORY_LABELS[stat.category] || stat.category,
    value: stat.count,
    percentage: stat.percentage.toFixed(1),
  }));

  const renderLabel = (props: PieLabelRenderProps) => {
    if (!showLabels) return null;
    const payload = props.payload as { name?: string; percentage?: string };
    return `${payload.name || ''}: ${payload.percentage || '0'}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={height * 0.35}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, _name, props) => [
            `${value} doenças (${(props.payload as { percentage?: string }).percentage || '0'}%)`,
            (props.payload as { name?: string }).name || '',
          ]}
        />
        {showLegend && (
          <Legend
            formatter={(value, entry) => (
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {value} ({(entry.payload as { percentage?: string })?.percentage || '0'}%)
              </span>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}

