'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendDataPoint {
  year: number;
  [key: string]: number | string; // Dynamic disease keys
}

interface DiseaseTrendChartProps {
  data: TrendDataPoint[];
  diseases: Array<{
    id: string;
    name: string;
    color?: string;
  }>;
  height?: number;
  yAxisLabel?: string;
}

const DEFAULT_COLORS = [
  '#3B82F6', // blue
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // violet
  '#EC4899', // pink
];

export default function DiseaseTrendChart({
  data,
  diseases,
  height = 400,
  yAxisLabel = 'Valor',
}: DiseaseTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-700" />
        <XAxis
          dataKey="year"
          tick={{ fill: 'currentColor', fontSize: 12 }}
          label={{ value: 'Ano', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          tick={{ fill: 'currentColor', fontSize: 12 }}
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
        <Legend />
        {diseases.map((disease, index) => (
          <Line
            key={disease.id}
            type="monotone"
            dataKey={disease.id}
            name={disease.name}
            stroke={disease.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

