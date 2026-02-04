'use client';

import { ReactNode } from 'react';
import { AlertTriangle, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// DRUG ALERT - Elsevier/Nature Scientific Journal Style
// Austere, minimal, high credibility
// =============================================================================

export type AlertType =
  | 'pregnancy'
  | 'renal'
  | 'hepatic'
  | 'cardiac'
  | 'neurologic'
  | 'interaction'
  | 'contraindication'
  | 'warning'
  | 'info';

export type AlertSeverity = 'critical' | 'high' | 'moderate' | 'low';

export interface DrugAlertProps {
  type?: AlertType;
  severity?: AlertSeverity;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Clinical-grade alert box
 *
 * Design principles (Health.gov/Section 508):
 * - Minimum 16px body text
 * - High contrast for critical alerts
 * - Scannable at a glance in emergency settings
 */
export function DrugAlert({
  type = 'warning',
  severity = 'moderate',
  title,
  children,
  className,
}: DrugAlertProps) {
  // Clinical color palette
  const severityConfig = {
    critical: {
      bg: 'bg-red-600',
      text: 'text-white',
      border: 'border-red-700',
      icon: XCircle,
      label: 'ALERTA CRÍTICO',
    },
    high: {
      bg: 'bg-red-50 dark:bg-red-950/40',
      text: 'text-neutral-900 dark:text-neutral-100',
      border: 'border-red-500',
      icon: AlertTriangle,
      label: 'Alerta',
    },
    moderate: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-neutral-900 dark:text-neutral-100',
      border: 'border-amber-500',
      icon: AlertCircle,
      label: 'Atenção',
    },
    low: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-neutral-900 dark:text-neutral-100',
      border: 'border-blue-500',
      icon: Info,
      label: 'Nota',
    },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;
  const defaultTitle = title || config.label;

  // Critical alerts get full-width colored background
  if (severity === 'critical') {
    return (
      <aside
        className={cn(
          'my-6 p-6 rounded-2xl',
          config.bg,
          config.text,
          className
        )}
        role="alert"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{defaultTitle}</h3>
            <div className="text-lg leading-relaxed opacity-95">
              {children}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // Other severities use left-border style
  return (
    <aside
      className={cn(
        'my-6 p-5 rounded-xl border-l-4',
        config.bg,
        config.border,
        config.text,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-4">
        <Icon className={cn('w-6 h-6 flex-shrink-0 mt-0.5', {
          'text-red-600 dark:text-red-400': severity === 'high',
          'text-amber-600 dark:text-amber-400': severity === 'moderate',
          'text-blue-600 dark:text-blue-400': severity === 'low',
        })} />
        <div>
          <h3 className={cn('text-base font-bold mb-1', {
            'text-red-800 dark:text-red-200': severity === 'high',
            'text-amber-800 dark:text-amber-200': severity === 'moderate',
            'text-blue-800 dark:text-blue-200': severity === 'low',
          })}>
            {defaultTitle}
          </h3>
          <div className="text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

// =============================================================================
// BOX (Generic scientific box for emphasis)
// =============================================================================

export interface BoxProps {
  variant?: 'highlight' | 'note' | 'example' | 'definition';
  title?: string;
  children: ReactNode;
  className?: string;
}

const boxConfig = {
  highlight: {
    bg: 'bg-amber-50/50 dark:bg-amber-950/20',
    border: 'border-amber-200 dark:border-amber-900',
    titleColor: 'text-amber-800 dark:text-amber-200',
  },
  note: {
    bg: 'bg-neutral-50 dark:bg-neutral-900/50',
    border: 'border-neutral-200 dark:border-neutral-800',
    titleColor: 'text-neutral-600 dark:text-neutral-400',
  },
  example: {
    bg: 'bg-blue-50/50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-900',
    titleColor: 'text-blue-800 dark:text-blue-200',
  },
  definition: {
    bg: 'bg-green-50/50 dark:bg-green-950/20',
    border: 'border-green-200 dark:border-green-900',
    titleColor: 'text-green-800 dark:text-green-200',
  },
};

export function Box({ variant = 'note', title, children, className }: BoxProps) {
  const config = boxConfig[variant];

  return (
    <aside
      className={cn(
        'my-6 p-5',
        'border rounded-xl',
        config.bg,
        config.border,
        className
      )}
    >
      {title && (
        <header className="mb-3">
          <span className={cn('text-sm font-bold uppercase tracking-wider', config.titleColor)}>
            {title}
          </span>
        </header>
      )}
      <div className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

export default DrugAlert;
