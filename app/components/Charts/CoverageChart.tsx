'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface CoverageData {
  name: string;
  cobertura: number;
  meta: number;
}

const data: CoverageData[] = [
  { name: 'Câncer de Mama', cobertura: 35, meta: 70 },
  { name: 'Câncer de Colo', cobertura: 65, meta: 70 },
  { name: 'Teste do Pezinho', cobertura: 96, meta: 100 },
  { name: 'TEA (M-CHAT)', cobertura: 15, meta: 80 },
  { name: 'Sífilis Pré-natal', cobertura: 88, meta: 95 },
  { name: 'HIV Pré-natal', cobertura: 95, meta: 100 },
];

export default function CoverageChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Cobertura de Rastreamentos no SUS
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        Porcentagem da população-alvo coberta vs. Meta OMS/MS
      </p>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            label={{ value: 'Cobertura (%)', angle: -90, position: 'insideLeft' }}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '1px solid #e5e5e5',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar dataKey="cobertura" fill="#3b82f6" name="Cobertura Atual" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.cobertura >= entry.meta ? '#10b981' : entry.cobertura >= entry.meta * 0.7 ? '#f59e0b' : '#ef4444'} 
              />
            ))}
          </Bar>
          <Bar dataKey="meta" fill="#e5e5e5" name="Meta" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded"></div>
          <span>Meta atingida</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded"></div>
          <span>70-100% da meta</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>{'<'}70% da meta</span>
        </div>
      </div>
    </div>
  );
}

