'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// =============================================================================
// INTERACTION WARNING - Nature/Elsevier Journal Style
// Clean table-like presentation for drug interactions
// =============================================================================

export type InteractionSeverity = 'grave' | 'moderada' | 'leve';

export interface InteractionWarningProps {
  severity: InteractionSeverity;
  drug: string;
  children: ReactNode;
  className?: string;
}

const severityConfig = {
  grave: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-500',
    badge: 'bg-red-600',
    label: 'GRAVE',
    description: 'Evitar associação',
  },
  moderada: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-500',
    badge: 'bg-amber-500',
    label: 'MODERADA',
    description: 'Monitorizar',
  },
  leve: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-500',
    badge: 'bg-blue-500',
    label: 'LEVE',
    description: 'Precaução',
  },
};

/**
 * Clinical-grade drug interaction warning
 *
 * Design principles (Health.gov/Section 508):
 * - Minimum 16px body text
 * - Color-coded severity with high contrast
 * - Scannable at a glance in emergency settings
 */
export function InteractionWarning({
  severity,
  drug,
  children,
  className,
}: InteractionWarningProps) {
  const config = severityConfig[severity];

  return (
    <div
      className={cn(
        'my-4 p-5 rounded-xl border-l-4',
        config.bg,
        config.border,
        className
      )}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-neutral-900 dark:text-white">
          {drug}
        </span>
        <span
          className={cn(
            'px-3 py-1 rounded-full text-sm font-bold text-white',
            config.badge
          )}
        >
          {config.label}
        </span>
      </div>

      {/* Content */}
      <div className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// INTERACTION TABLE (For multiple interactions)
// =============================================================================

export interface DrugInteraction {
  drug: string;
  severity: InteractionSeverity;
  mechanism: string;
  management: string;
}

export interface InteractionTableProps {
  interactions: DrugInteraction[];
  className?: string;
}

/**
 * Clinical-grade tabular display of drug interactions
 */
export function InteractionTable({ interactions, className }: InteractionTableProps) {
  return (
    <div className={cn('my-6 overflow-x-auto', className)}>
      <table className="w-full text-base">
        <thead>
          <tr className="border-b-2 border-neutral-300 dark:border-neutral-600">
            <th className="text-left py-3 pr-4 font-bold text-neutral-900 dark:text-white">
              Fármaco
            </th>
            <th className="text-left py-3 pr-4 font-bold text-neutral-900 dark:text-white">
              Gravidade
            </th>
            <th className="text-left py-3 pr-4 font-bold text-neutral-900 dark:text-white">
              Mecanismo
            </th>
            <th className="text-left py-3 font-bold text-neutral-900 dark:text-white">
              Conduta
            </th>
          </tr>
        </thead>
        <tbody>
          {interactions.map((interaction, index) => {
            const config = severityConfig[interaction.severity];
            return (
              <tr
                key={index}
                className="border-b border-neutral-200 dark:border-neutral-700"
              >
                <td className="py-4 pr-4 font-semibold text-neutral-800 dark:text-neutral-200">
                  {interaction.drug}
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-sm font-bold text-white',
                      config.badge
                    )}
                  >
                    {config.label}
                  </span>
                </td>
                <td className="py-4 pr-4 text-neutral-700 dark:text-neutral-300">
                  {interaction.mechanism}
                </td>
                <td className="py-4 text-neutral-700 dark:text-neutral-300">
                  {interaction.management}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InteractionWarning;
