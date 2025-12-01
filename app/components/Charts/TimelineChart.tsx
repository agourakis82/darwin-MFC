'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { ano: '2015', mamografia: 28, coloUtero: 58, testePezinho: 91 },
  { ano: '2017', mamografia: 30, coloUtero: 62, testePezinho: 93 },
  { ano: '2019', mamografia: 32, coloUtero: 65, testePezinho: 95 },
  { ano: '2021', mamografia: 25, coloUtero: 60, testePezinho: 94 },
  { ano: '2023', mamografia: 35, coloUtero: 68, testePezinho: 96 },
  { ano: '2025', mamografia: 42, coloUtero: 72, testePezinho: 97 },
];

export default function TimelineChart() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        Evolução da Cobertura (2015-2025)
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        Tendências temporais dos principais rastreamentos
      </p>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="ano" />
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
          <Line 
            type="monotone" 
            dataKey="mamografia" 
            stroke="#ec4899" 
            strokeWidth={3}
            name="Mamografia"
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line 
            type="monotone" 
            dataKey="coloUtero" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            name="Colo do Útero"
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line 
            type="monotone" 
            dataKey="testePezinho" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Teste do Pezinho"
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-xs text-neutral-700 dark:text-neutral-300">
          <strong>Nota 2025:</strong> Observa-se inflexão positiva em mamografia (ampliação 40-49 anos) e 
          colo uterino (incorporação HPV teste). Pandemia COVID-19 causou queda em 2021.
        </p>
      </div>
    </div>
  );
}

