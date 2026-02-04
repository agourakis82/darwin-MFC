'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// =============================================================================
// KEY POINTS - Nature/Elsevier Abstract Box Style
// Clean, academic, high information density
// =============================================================================

export interface KeyPointsProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Clinical-grade Key Points box
 *
 * Design principles (Health.gov/Section 508):
 * - Minimum 16px body text
 * - High contrast teal accent
 * - Scannable bullets for emergency use
 */
export function KeyPoints({
  title = 'Pontos-chave',
  children,
  className,
}: KeyPointsProps) {
  return (
    <section
      className={cn(
        // Teal highlight - clinical accent color
        'my-8 p-6',
        'bg-teal-50 dark:bg-teal-950/40',
        'border-2 border-teal-200 dark:border-teal-800',
        'rounded-2xl',
        className
      )}
    >
      {/* Header - visible, clinical style */}
      <header className="mb-4">
        <h2 className="text-lg font-bold text-teal-800 dark:text-teal-200 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {title}
        </h2>
      </header>

      {/* Content - minimum 16px, good spacing */}
      <div className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed
        [&>ul]:space-y-3 [&>ul]:list-none [&>ul]:pl-0
        [&_li]:flex [&_li]:items-start [&_li]:gap-3
        [&_li]:before:content-[''] [&_li]:before:w-2 [&_li]:before:h-2 [&_li]:before:rounded-full [&_li]:before:bg-teal-600 [&_li]:before:mt-2 [&_li]:before:flex-shrink-0
        [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-white">
        {children}
      </div>
    </section>
  );
}

// =============================================================================
// ABSTRACT (Full journal-style abstract)
// =============================================================================

export interface AbstractProps {
  sections?: {
    background?: ReactNode;
    methods?: ReactNode;
    results?: ReactNode;
    conclusions?: ReactNode;
  };
  children?: ReactNode;
  className?: string;
}

/**
 * Clinical-grade Abstract - Structured format
 */
export function Abstract({ sections, children, className }: AbstractProps) {
  // If no structured sections, render simple abstract
  if (!sections || Object.keys(sections).length === 0) {
    return (
      <section className={cn('my-8', className)}>
        <header className="mb-3">
          <h2 className="text-base font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Resumo
          </h2>
        </header>
        <div className="text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
          {children}
        </div>
      </section>
    );
  }

  // Structured abstract with labeled sections
  const sectionLabels = {
    background: 'Contexto',
    methods: 'Métodos',
    results: 'Resultados',
    conclusions: 'Conclusões',
  };

  return (
    <section
      className={cn(
        'my-8 p-6',
        'bg-neutral-50 dark:bg-neutral-900/50',
        'border border-neutral-200 dark:border-neutral-800',
        'rounded-2xl',
        className
      )}
    >
      <header className="mb-5">
        <h2 className="text-base font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Resumo
        </h2>
      </header>

      <div className="space-y-4 text-base leading-relaxed">
        {Object.entries(sections).map(([key, content]) => {
          if (!content) return null;
          const label = sectionLabels[key as keyof typeof sectionLabels];
          return (
            <div key={key}>
              <span className="font-bold text-neutral-900 dark:text-white">
                {label}:
              </span>{' '}
              <span className="text-neutral-700 dark:text-neutral-300">
                {content}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// =============================================================================
// TAKE HOME MESSAGE (Clinical summary)
// =============================================================================

export interface TakeHomeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Clinical-grade Take-home message - High visibility summary
 */
export function TakeHome({ children, className }: TakeHomeProps) {
  return (
    <section
      className={cn(
        'my-8 p-6 rounded-2xl',
        'bg-emerald-600 text-white',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">RESUMO</h3>
          <div className="text-lg leading-relaxed opacity-95">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KeyPoints;
