'use client';

/**
 * DARWIN-MFC CALCULATOR CARD
 * ==========================
 *
 * Preview card for displaying calculator information in listings.
 */

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import {
  Calculator,
  ChevronRight,
  FileText,
  Star,
} from 'lucide-react';
import type { ClinicalCalculator, CalculatorCategory } from '@/lib/calculators/types';
import { categoryLabels, categoryIcons } from '@/lib/calculators/types';

// =============================================================================
// TYPES
// =============================================================================

export interface CalculatorCardProps {
  calculator: ClinicalCalculator;
  variant?: 'default' | 'compact' | 'featured';
  showCategory?: boolean;
  showInputCount?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

// =============================================================================
// CATEGORY COLORS
// =============================================================================

const categoryColors: Record<CalculatorCategory, {
  bg: string;
  border: string;
  text: string;
}> = {
  'critical-care': {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-700 dark:text-red-400',
  },
  cardiology: {
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-800',
    text: 'text-rose-700 dark:text-rose-400',
  },
  pulmonology: {
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    border: 'border-sky-200 dark:border-sky-800',
    text: 'text-sky-700 dark:text-sky-400',
  },
  hepatology: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-400',
  },
  nephrology: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-400',
  },
  neurology: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-indigo-200 dark:border-indigo-800',
    text: 'text-indigo-700 dark:text-indigo-400',
  },
  psychiatry: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-800',
    text: 'text-violet-700 dark:text-violet-400',
  },
  'infectious-disease': {
    bg: 'bg-lime-50 dark:bg-lime-950/30',
    border: 'border-lime-200 dark:border-lime-800',
    text: 'text-lime-700 dark:text-lime-400',
  },
  hematology: {
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    border: 'border-pink-200 dark:border-pink-800',
    text: 'text-pink-700 dark:text-pink-400',
  },
  emergency: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-400',
  },
  obstetrics: {
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    border: 'border-fuchsia-200 dark:border-fuchsia-800',
    text: 'text-fuchsia-700 dark:text-fuchsia-400',
  },
  pediatrics: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    border: 'border-cyan-200 dark:border-cyan-800',
    text: 'text-cyan-700 dark:text-cyan-400',
  },
  orthopedics: {
    bg: 'bg-stone-50 dark:bg-stone-950/30',
    border: 'border-stone-200 dark:border-stone-700',
    text: 'text-stone-700 dark:text-stone-400',
  },
  anesthesia: {
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-800',
    text: 'text-teal-700 dark:text-teal-400',
  },
  general: {
    bg: 'bg-gray-50 dark:bg-gray-800/30',
    border: 'border-gray-200 dark:border-gray-700',
    text: 'text-gray-700 dark:text-gray-400',
  },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function CalculatorCard({
  calculator,
  variant = 'default',
  showCategory = true,
  showInputCount = true,
  isFavorite = false,
  onToggleFavorite,
  className,
}: CalculatorCardProps) {
  const locale = useLocale();
  const colors = categoryColors[calculator.category];
  const categoryIcon = categoryIcons[calculator.category];

  if (variant === 'compact') {
    return (
      <Link
        href={`/calculadoras/${calculator.id}`}
        locale={locale}
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg border',
          'bg-white dark:bg-neutral-900/50',
          'border-neutral-200 dark:border-neutral-700',
          'hover:border-[#0071E3] dark:hover:border-[#0071E3]',
          'hover:shadow-md transition-all duration-200',
          className
        )}
      >
        <div
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg',
            colors.bg
          )}
        >
          {categoryIcon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
            {calculator.abbreviation}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            {calculator.name}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative overflow-hidden rounded-2xl border',
          'bg-gradient-to-br from-white to-neutral-50',
          'dark:from-neutral-900 dark:to-neutral-800',
          colors.border,
          'shadow-lg hover:shadow-xl transition-shadow duration-300',
          className
        )}
      >
        <div className={cn('h-2', colors.bg.replace('bg-', 'bg-gradient-to-r from-').replace('/30', ''))} />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div
              className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
                colors.bg
              )}
            >
              {categoryIcon}
            </div>
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite(calculator.id);
                }}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <Star
                  className={cn(
                    'w-5 h-5',
                    isFavorite
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-neutral-400'
                  )}
                />
              </button>
            )}
          </div>

          <h3 className="mt-4 text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {calculator.abbreviation}
          </h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {calculator.name}
          </p>

          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {calculator.description}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
                colors.bg,
                colors.text
              )}
            >
              {categoryLabels[calculator.category]}
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <FileText className="w-3.5 h-3.5" />
              {calculator.inputs.length} inputs
            </span>
          </div>

          <Link
            href={`/calculadoras/${calculator.id}`}
            locale={locale}
            className={cn(
              'mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg',
              'bg-[#0071E3] hover:bg-[#0077ED] text-white',
              'font-medium text-sm transition-colors'
            )}
          >
            <Calculator className="w-4 h-4" />
            Open Calculator
          </Link>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <Link
      href={`/calculadoras/${calculator.id}`}
      locale={locale}
      className={cn(
        'block p-4 rounded-xl border',
        'bg-white dark:bg-neutral-900/50',
        'border-neutral-200 dark:border-neutral-700',
        'hover:border-[#0071E3] dark:hover:border-[#0071E3]',
        'hover:shadow-lg transition-all duration-200',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl',
            colors.bg
          )}
        >
          {categoryIcon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
              {calculator.abbreviation}
            </h3>
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite(calculator.id);
                }}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <Star
                  className={cn(
                    'w-4 h-4',
                    isFavorite
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-neutral-300'
                  )}
                />
              </button>
            )}
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
            {calculator.name}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-1" />
      </div>

      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
        {calculator.description}
      </p>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        {showCategory && (
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
              colors.bg,
              colors.text
            )}
          >
            {categoryLabels[calculator.category]}
          </span>
        )}
        {showInputCount && (
          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <FileText className="w-3 h-3" />
            {calculator.inputs.length} inputs
          </span>
        )}
        {calculator.validationStudy && (
          <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
            Validated
          </span>
        )}
      </div>
    </Link>
  );
}

export default CalculatorCard;
