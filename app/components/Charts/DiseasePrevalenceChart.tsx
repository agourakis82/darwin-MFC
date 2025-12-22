'use client';

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { extractPrevalenceData } from '@/lib/utils/disease-stats';
import type { Doenca } from '@/lib/types/doenca';

interface DiseasePrevalenceChartProps {
  diseases?: Partial<Doenca>[];
  limit?: number; // Top N doenças
  height?: number;
  showLegend?: boolean;
}

export default function DiseasePrevalenceChart({
  diseases,
  limit = 15,
  height = 400,
  showLegend = false,
}: DiseasePrevalenceChartProps) {
  const data = useMemo(() => {
    const prevalenceData = extractPrevalenceData(diseases || []);
    return prevalenceData.slice(0, limit).map(item => ({
      name: item.diseaseName.length > 20 
        ? `${item.diseaseName.substring(0, 20)}...` 
        : item.diseaseName,
      fullName: item.diseaseName,
      prevalence: item.estimatedPrevalence || 0,
      category: item.category,
    }));
  }, [diseases, limit]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-500 dark:text-neutral-400">
        <p>Nenhum dado de prevalência disponível</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-700" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={100}
          tick={{ fill: 'currentColor', fontSize: 12 }}
        />
        <YAxis
          label={{ value: 'Prevalência (%)', angle: -90, position: 'insideLeft' }}
          tick={{ fill: 'currentColor', fontSize: 12 }}
        />
        <Tooltip
          formatter={(value) => `${Number(value).toFixed(2)}%`}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
        {showLegend && <Legend />}
        <Bar
          dataKey="prevalence"
          fill="#3B82F6"
          radius={[8, 8, 0, 0]}
          name="Prevalência"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

