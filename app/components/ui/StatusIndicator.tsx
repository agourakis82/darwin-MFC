'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { semanticColors, convergenceConfig, type ConvergenciaStatus } from '@/lib/design-system/tokens';

// =============================================================================
// MEDSCAPE-STYLE STATUS INDICATOR
// Design principles: Austere, minimal, high information density
// Colors convey meaning, not decoration
// Uses design tokens for consistency across the app
// =============================================================================

// Re-export type for convenience
export type { ConvergenciaStatus } from '@/lib/design-system/tokens';

/**
 * Status configuration using design tokens
 * Maps convergence status to colors and labels
 */
const statusConfig = {
  convergencia: {
    color: semanticColors.success.DEFAULT,
    label: { pt: 'Concordante', en: 'Concordant', es: 'Concordante' },
    abbrev: 'C',
  },
  parcial: {
    color: semanticColors.warning.DEFAULT,
    label: { pt: 'Parcial', en: 'Partial', es: 'Parcial' },
    abbrev: 'P',
  },
  divergencia: {
    color: semanticColors.danger.DEFAULT,
    label: { pt: 'Divergente', en: 'Divergent', es: 'Divergente' },
    abbrev: 'D',
  },
  em_disputa: {
    color: semanticColors.info.DEFAULT,
    label: { pt: 'Em revisão', en: 'Under Review', es: 'En revisión' },
    abbrev: 'R',
  },
} as const;

// =============================================================================
// STATUS INDICATOR (Primary Component)
// =============================================================================

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  status: ConvergenciaStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  locale?: 'pt' | 'en' | 'es';
}

/**
 * Medscape-style status indicator
 * Clean dot + text, no decorative backgrounds
 */
export const StatusIndicator = forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ status, size = 'md', showLabel = true, locale = 'pt', className, ...props }, ref) => {
    const config = statusConfig[status];

    const sizes = {
      sm: { dot: 'w-1.5 h-1.5', text: 'text-xs', gap: 'gap-1.5' },
      md: { dot: 'w-2 h-2', text: 'text-sm', gap: 'gap-2' },
      lg: { dot: 'w-2.5 h-2.5', text: 'text-sm', gap: 'gap-2' },
    };

    const s = sizes[size];

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center', s.gap, className)}
        {...props}
      >
        <span
          className={cn('rounded-full flex-shrink-0', s.dot)}
          style={{ backgroundColor: config.color }}
        />
        {showLabel && (
          <span className={cn(
            s.text,
            'font-medium tracking-tight',
            'text-neutral-700 dark:text-neutral-300'
          )}>
            {config.label[locale]}
          </span>
        )}
      </span>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

// =============================================================================
// STATUS DOT (Minimal variant for tables/lists)
// =============================================================================

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  status: ConvergenciaStatus;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export function StatusDot({ status, size = 'md', pulse = false, className, ...props }: StatusDotProps) {
  const config = statusConfig[status];

  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={cn(
        'inline-block rounded-full',
        sizes[size],
        pulse && 'animate-pulse',
        className
      )}
      style={{ backgroundColor: config.color }}
      title={config.label.pt}
      {...props}
    />
  );
}

// =============================================================================
// EVIDENCE GRADE BADGE (Medscape-style)
// =============================================================================

export type EvidenceGrade = 'A' | 'B' | 'C' | 'D' | 'GPP' | 'I' | 'II' | 'III';

const gradeConfig: Record<EvidenceGrade, { bg: string; description: string }> = {
  A: { bg: semanticColors.success.DEFAULT, description: 'Alta qualidade' },
  B: { bg: semanticColors.primary.DEFAULT, description: 'Moderada qualidade' },
  C: { bg: semanticColors.warning.DEFAULT, description: 'Baixa qualidade' },
  D: { bg: semanticColors.neutral[500], description: 'Muito baixa / Opinião' },
  GPP: { bg: semanticColors.info.DEFAULT, description: 'Boa prática clínica' },
  I: { bg: semanticColors.success.DEFAULT, description: 'Meta-análise / RCT' },
  II: { bg: semanticColors.primary.DEFAULT, description: 'Coorte / Caso-controle' },
  III: { bg: semanticColors.warning.DEFAULT, description: 'Série de casos' },
};

export interface EvidenceGradeBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  grade: EvidenceGrade;
  showTooltip?: boolean;
}

/**
 * Evidence grade badge - Medscape style
 * Small, unobtrusive, informative
 */
export function EvidenceGradeBadge({ grade, showTooltip = true, className, ...props }: EvidenceGradeBadgeProps) {
  const config = gradeConfig[grade];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'min-w-[1.25rem] h-5 px-1',
        'text-[10px] font-bold text-white',
        'rounded',
        className
      )}
      style={{ backgroundColor: config.bg }}
      title={showTooltip ? `Nível ${grade}: ${config.description}` : undefined}
      {...props}
    >
      {grade}
    </span>
  );
}

// =============================================================================
// TRUST INDICATOR (Medscape "Last Updated" style)
// =============================================================================

export interface TrustIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  lastUpdated: string; // ISO date string
  reviewedBy?: string;
  citationCount?: number;
}

/**
 * Trust indicator bar - shows credibility signals
 * Inspired by Medscape's "Reviewed" and "Updated" metadata
 */
export function TrustIndicator({
  lastUpdated,
  reviewedBy,
  citationCount,
  className,
  ...props
}: TrustIndicatorProps) {
  const date = new Date(lastUpdated);
  const formatted = date.toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div
      className={cn(
        'flex items-center gap-4 text-xs',
        'text-neutral-500 dark:text-neutral-400',
        'border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4',
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Atualizado: {formatted}
      </span>

      {reviewedBy && (
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {reviewedBy}
        </span>
      )}

      {citationCount !== undefined && (
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {citationCount} ref.
        </span>
      )}
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export { statusConfig };
export default StatusIndicator;
