'use client';

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getCID10Distribution, CID10_CATEGORIES } from '@/lib/utils/disease-stats';
import type { Doenca } from '@/lib/types/doenca';

interface CID10DistributionChartProps {
  diseases?: Partial<Doenca>[];
  limit?: number; // Top N categorias
  height?: number;
  orientation?: 'vertical' | 'horizontal';
}

export default function CID10DistributionChart({
  diseases,
  limit = 10,
  height = 400,
  orientation = 'vertical',
}: CID10DistributionChartProps) {
  const data = useMemo(() => {
    const distribution = getCID10Distribution(diseases || []);
    return distribution.slice(0, limit).map(item => ({
      category: item.category,
      name: item.categoryName.length > 30 
        ? `${item.categoryName.substring(0, 30)}...` 
        : item.categoryName,
      fullName: item.categoryName,
      count: item.count,
      percentage: item.percentage,
    }));
  }, [diseases, limit]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-500 dark:text-neutral-400">
        <p>Nenhum dado disponível</p>
      </div>
    );
  }

  if (orientation === 'horizontal') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-700" />
          <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="category"
            width={140}
            tick={{ fill: 'currentColor', fontSize: 12 }}
            tickFormatter={(value) => {
              const item = data.find(d => d.category === value);
              return item ? `${value} - ${item.name}` : value;
            }}
          />
          <Tooltip
            formatter={(value: number, name: string, props: any) => {
              const percentage = props.payload?.percentage?.toFixed(1) || '0';
              return `${value} doenças (${percentage}%)`;
            }}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Bar
            dataKey="count"
            fill="#10B981"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-700" />
        <XAxis
          dataKey="category"
          angle={-45}
          textAnchor="end"
          height={100}
          tick={{ fill: 'currentColor', fontSize: 12 }}
          tickFormatter={(value) => {
            const item = data.find(d => d.category === value);
            return item ? `${value} - ${item.name.split(' ')[0]}...` : value;
          }}
        />
        <YAxis
          label={{ value: 'Número de Doenças', angle: -90, position: 'insideLeft' }}
          tick={{ fill: 'currentColor', fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number, name: string, props: any) => {
            const percentage = props.payload?.percentage?.toFixed(1) || '0';
            return `${value} doenças (${percentage}%)`;
          }}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
        <Bar
          dataKey="count"
          fill="#10B981"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

