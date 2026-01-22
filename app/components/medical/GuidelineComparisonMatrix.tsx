'use client';

import { cn } from '@/lib/utils';

export type GuidelineType = 'SUS' | 'USPSTF' | 'NHS' | 'WHO' | 'NP-NCD';
export type ComparisonAspect = 'start_age' | 'end_age' | 'interval' | 'method' | 'notes';

interface GuidelineValue {
  value: string;
  status: 'full' | 'partial' | 'divergence' | 'disputed';
  note?: string;
}

interface RowData {
  aspect: string;
  guidelines: Record<GuidelineType, GuidelineValue>;
}

export interface GuidelineComparisonMatrixProps {
  title: string;
  description?: string;
  rows: RowData[];
  density?: 'comfortable' | 'compact' | 'clinical';
  showConvergence?: boolean;
  className?: string;
}

const convergenceColors: Record<'full' | 'partial' | 'divergence' | 'disputed', string> = {
  full: 'bg-emerald-100 dark:bg-emerald-950/40 border-l-4 border-l-emerald-500',
  partial: 'bg-amber-100 dark:bg-amber-950/40 border-l-4 border-l-amber-500',
  divergence: 'bg-red-100 dark:bg-red-950/40 border-l-4 border-l-red-500',
  disputed: 'bg-purple-100 dark:bg-purple-950/40 border-l-4 border-l-purple-500',
};

const guidelineAbbreviations: Record<GuidelineType, { color: string; bgColor: string }> = {
  SUS: { color: 'text-green-700 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-950' },
  USPSTF: { color: 'text-blue-700 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-950' },
  NHS: { color: 'text-red-700 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-950' },
  WHO: { color: 'text-yellow-700 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-950' },
  'NP-NCD': { color: 'text-orange-700 dark:text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-950' },
};

export function GuidelineComparisonMatrix({
  title,
  description,
  rows,
  density = 'comfortable',
  showConvergence = true,
  className,
}: GuidelineComparisonMatrixProps) {
  const paddingClass = {
    comfortable: 'p-6',
    compact: 'p-4',
    clinical: 'p-3',
  }[density];

  const cellPaddingClass = {
    comfortable: 'px-4 py-3',
    compact: 'px-3 py-2',
    clinical: 'px-2 py-1.5',
  }[density];

  return (
    <div className={cn('clinical-card dark:clinical-card-dark', paddingClass, className)}>
      {/* Header */}
      <div className="mb-6">
        <h3 className={cn(
          'font-bold text-gray-900 dark:text-white mb-1',
          density === 'comfortable' && 'text-xl',
          density === 'compact' && 'text-lg',
          density === 'clinical' && 'text-base'
        )}>
          {title}
        </h3>
        {description && (
          <p className={cn(
            'text-gray-600 dark:text-gray-400',
            density === 'comfortable' && 'text-sm',
            density === 'compact' && 'text-xs',
            density === 'clinical' && 'text-xs'
          )}>
            {description}
          </p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className={cn(cellPaddingClass, 'text-left font-semibold text-gray-900 dark:text-white')}>
                Aspect
              </th>
              {(['SUS', 'USPSTF', 'NHS', 'WHO', 'NP-NCD'] as GuidelineType[]).map((guideline) => (
                <th
                  key={guideline}
                  className={cn(
                    cellPaddingClass,
                    'text-center font-semibold',
                    guidelineAbbreviations[guideline].color
                  )}
                >
                  <span className={cn(
                    'inline-block px-2 py-1 rounded font-mono text-xs',
                    guidelineAbbreviations[guideline].bgColor,
                    guidelineAbbreviations[guideline].color
                  )}>
                    {guideline}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={cn(
                  'border-b border-gray-200 dark:border-gray-700 transition-colors',
                  'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                )}
              >
                <td className={cn(cellPaddingClass, 'font-medium text-gray-900 dark:text-white')}>
                  {row.aspect}
                </td>
                {(['SUS', 'USPSTF', 'NHS', 'WHO', 'NP-NCD'] as GuidelineType[]).map((guideline) => {
                  const value = row.guidelines[guideline];
                  const isAligned = value.status === 'full';
                  const isPartial = value.status === 'partial';

                  return (
                    <td
                      key={`${rowIdx}-${guideline}`}
                      className={cn(
                        cellPaddingClass,
                        'text-center text-gray-700 dark:text-gray-300',
                        isAligned && 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-400 font-semibold',
                        isPartial && 'bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-400',
                        value.status === 'divergence' && 'bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-400',
                        value.status === 'disputed' && 'bg-purple-50 dark:bg-purple-950/20 text-purple-900 dark:text-purple-400'
                      )}
                      title={value.note}
                    >
                      <span className={cn(
                        'inline-block',
                        density === 'clinical' && 'text-xs',
                        density === 'compact' && 'text-sm',
                        density === 'comfortable' && 'text-base'
                      )}>
                        {value.value}
                      </span>
                      {isPartial && <span className="ml-1">⚡</span>}
                      {value.status === 'divergence' && <span className="ml-1">⚠️</span>}
                      {value.status === 'disputed' && <span className="ml-1">❓</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Convergence Summary */}
      {showConvergence && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
            🔍 Convergence Analysis
          </p>
          <div className="space-y-2">
            <div className={cn('p-3 rounded-lg', convergenceColors.full)}>
              <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-400">
                ✅ Full Agreement: All guidelines recommend mammography as primary screening modality
              </p>
            </div>
            <div className={cn('p-3 rounded-lg', convergenceColors.partial)}>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-400">
                ⚠️ Disagreement: Start age varies (40 vs 50 years)
              </p>
            </div>
            <div className={cn('p-3 rounded-lg', convergenceColors.partial)}>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-400">
                ⚠️ Disagreement: Screening interval (2 vs 3 years)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuidelineComparisonMatrix;
