/**
 * TOP ITEMS LIST COMPONENT
 * ========================
 *
 * Displays most viewed/used items with rankings
 */

'use client';

import { useMemo } from 'react';
import { Link } from '@/i18n/routing';
import {
  getMostViewedMedications,
  getMostViewedDiseases,
  getMostUsedCalculators,
} from '@/lib/analytics';

interface TopItemsListProps {
  type: 'medications' | 'diseases' | 'calculators';
  limit?: number;
}

const ICONS = {
  medications: '💊',
  diseases: '🦠',
  calculators: '🧮',
};

const TITLES = {
  medications: 'Medicamentos Mais Visualizados',
  diseases: 'Doenças Mais Visualizadas',
  calculators: 'Calculadoras Mais Usadas',
};

const ROUTES = {
  medications: '/medicamentos',
  diseases: '/doencas',
  calculators: '/calculadoras',
};

export default function TopItemsList({ type, limit = 10 }: TopItemsListProps) {
  const items = useMemo(() => {
    switch (type) {
      case 'medications':
        return getMostViewedMedications(limit);
      case 'diseases':
        return getMostViewedDiseases(limit);
      case 'calculators':
        return getMostUsedCalculators(limit);
    }
  }, [type, limit]);

  const maxCount = items[0] ? (items[0] as any).views || (items[0] as any).uses : 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {ICONS[type]} {TITLES[type]}
      </h3>

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Nenhum dado disponível ainda
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const count = (item as any).views || (item as any).uses;
            const percentage = (count / maxCount) * 100;

            return (
              <Link
                key={item.id}
                href={`${ROUTES[type]}/${item.id}`}
                className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${
                        index === 0
                          ? 'bg-yellow-400 text-yellow-900'
                          : index === 1
                          ? 'bg-gray-300 text-gray-700'
                          : index === 2
                          ? 'bg-orange-400 text-orange-900'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }
                    `}
                  >
                    {index + 1}
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {item.name}
                    </div>
                    <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 dark:bg-blue-600 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Count */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {count}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {type === 'calculators' ? 'usos' : 'visualizações'}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
