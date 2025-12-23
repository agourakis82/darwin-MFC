/**
 * ACTIVITY CHART COMPONENT
 * ========================
 *
 * Displays user activity patterns over time
 */

'use client';

import { useMemo } from 'react';
import { getActivityByHour, getActivityByDayOfWeek } from '@/lib/analytics';

interface ActivityChartProps {
  type: 'hour' | 'day';
}

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function ActivityChart({ type }: ActivityChartProps) {
  const data = useMemo(() => {
    if (type === 'hour') {
      return getActivityByHour();
    } else {
      return getActivityByDayOfWeek();
    }
  }, [type]);

  const entries = Object.entries(data);
  const maxValue = Math.max(...entries.map(([_, count]) => count), 1);

  const getLabel = (index: string) => {
    if (type === 'hour') {
      return `${index}h`;
    } else {
      return DAYS[parseInt(index)];
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        📊 Atividade por {type === 'hour' ? 'Hora do Dia' : 'Dia da Semana'}
      </h3>

      <div className="space-y-2">
        {entries.map(([index, count]) => {
          const percentage = (count / maxValue) * 100;

          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                {getLabel(index)}
              </div>
              <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                <div
                  className="h-full bg-blue-500 dark:bg-blue-600 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
                {count > 0 && (
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-xs font-medium text-white mix-blend-difference">
                      {count}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
