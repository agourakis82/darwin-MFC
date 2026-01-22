'use client';

import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InteractionSeverity = 'contraindicated' | 'major' | 'moderate' | 'minor' | 'info';

export interface InteractionAlertProps {
  severity: InteractionSeverity;
  drug1: string;
  drug2: string;
  mechanism: string;
  recommendation: string;
  isDismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const severityConfig: Record<InteractionSeverity, { bg: string; border: string; text: string; icon: string }> = {
  contraindicated: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-300 dark:border-red-700',
    text: 'text-red-900 dark:text-red-200',
    icon: '🔴',
  },
  major: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-300 dark:border-orange-700',
    text: 'text-orange-900 dark:text-orange-200',
    icon: '🟠',
  },
  moderate: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-300 dark:border-amber-700',
    text: 'text-amber-900 dark:text-amber-200',
    icon: '🟡',
  },
  minor: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-300 dark:border-green-700',
    text: 'text-green-900 dark:text-green-200',
    icon: '🟢',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-300 dark:border-blue-700',
    text: 'text-blue-900 dark:text-blue-200',
    icon: 'ℹ️',
  },
};

const severityLabels: Record<InteractionSeverity, string> = {
  contraindicated: 'Contraindicated - DO NOT USE',
  major: 'Major Interaction - Monitor Closely',
  moderate: 'Moderate Interaction - May Require Adjustment',
  minor: 'Minor Interaction - Generally Safe',
  info: 'Information',
};

export function InteractionAlert({
  severity,
  drug1,
  drug2,
  mechanism,
  recommendation,
  isDismissible = true,
  onDismiss,
  className,
}: InteractionAlertProps) {
  const config = severityConfig[severity];

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-4 transition-all duration-200',
        config.bg,
        config.border,
        config.text,
        className
      )}
      role="alert"
    >
      <div className="flex gap-3 items-start">
        {/* Icon */}
        <div className="flex-shrink-0 text-xl mt-0.5">{config.icon}</div>

        {/* Content */}
        <div className="flex-1">
          {/* Title */}
          <h4 className="font-bold text-sm mb-1">
            {severityLabels[severity]}
          </h4>

          {/* Drugs Involved */}
          <p className="text-sm font-mono mb-2">
            <span className="font-semibold">{drug1}</span>
            {' + '}
            <span className="font-semibold">{drug2}</span>
          </p>

          {/* Mechanism */}
          <p className="text-sm mb-2">{mechanism}</p>

          {/* Recommendation - Highlighted */}
          <div className={cn(
            'p-2.5 rounded-lg text-sm font-medium border',
            severity === 'contraindicated' && 'bg-red-100 dark:bg-red-900/50 border-red-200 dark:border-red-700',
            severity === 'major' && 'bg-orange-100 dark:bg-orange-900/50 border-orange-200 dark:border-orange-700',
            severity === 'moderate' && 'bg-amber-100 dark:bg-amber-900/50 border-amber-200 dark:border-amber-700',
            severity === 'minor' && 'bg-green-100 dark:bg-green-900/50 border-green-200 dark:border-green-700',
            severity === 'info' && 'bg-blue-100 dark:bg-blue-900/50 border-blue-200 dark:border-blue-700'
          )}>
            💡 {recommendation}
          </div>
        </div>

        {/* Dismiss Button */}
        {isDismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              'flex-shrink-0 p-1 rounded-lg transition-colors opacity-70 hover:opacity-100',
              'hover:bg-black/10 dark:hover:bg-white/10'
            )}
            aria-label="Dismiss interaction alert"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default InteractionAlert;
