'use client';

/**
 * CATEGORY CARD COMPONENT
 * =======================
 *
 * Display a forum category in a card format.
 */

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  Stethoscope,
  FileText,
  Users,
  Globe,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import type { ForumCategory, ForumCategoryAccent } from '@/lib/types/community';
import { cn } from '@/lib/utils';

// =============================================================================
// ICON MAP
// =============================================================================

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  FileText,
  Users,
  Globe,
};

// =============================================================================
// PROPS
// =============================================================================

interface CategoryCardProps {
  category: ForumCategory;
}

function accentClasses(accent: ForumCategoryAccent) {
  switch (accent) {
    case 'primary':
      return {
        iconBg: 'bg-brand-primary-50 dark:bg-brand-primary-900/20',
        iconFg: 'text-brand-primary-700 dark:text-brand-primary-300',
        chevron: 'group-hover:text-brand-primary-600 dark:group-hover:text-brand-primary-300',
      };
    case 'secondary':
      return {
        iconBg: 'bg-brand-secondary-50 dark:bg-brand-secondary-900/20',
        iconFg: 'text-brand-secondary-700 dark:text-brand-secondary-300',
        chevron: 'group-hover:text-brand-secondary-600 dark:group-hover:text-brand-secondary-300',
      };
    case 'safe':
      return {
        iconBg: 'bg-guanine-green/10 dark:bg-guanine-green/15',
        iconFg: 'text-clinical-safe-base',
        chevron: 'group-hover:text-clinical-safe-base',
      };
    case 'warning':
      return {
        iconBg: 'bg-thymine-gold/10 dark:bg-thymine-gold/15',
        iconFg: 'text-clinical-warning-base',
        chevron: 'group-hover:text-clinical-warning-base',
      };
    case 'critical':
      return {
        iconBg: 'bg-critical-red-50 dark:bg-critical-red-900/20',
        iconFg: 'text-clinical-critical-base',
        chevron: 'group-hover:text-clinical-critical-base',
      };
    case 'info':
    default:
      return {
        iconBg: 'bg-brand-primary-50 dark:bg-brand-primary-900/15',
        iconFg: 'text-clinical-info-base',
        chevron: 'group-hover:text-clinical-info-base',
      };
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CategoryCard({ category }: CategoryCardProps) {
  const t = useTranslations();

  const IconComponent = iconComponents[category.icon] || MessageSquare;
  const accent = accentClasses(category.accent);

  return (
    <Link
      href={`/community/forums?category=${encodeURIComponent(category.id)}`}
      className={cn(
        'card-darwin group block p-5 apple-transition',
        'hover:shadow-xl'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            'p-3 rounded-2xl border border-carbon-200/70 dark:border-carbon-800/70',
            'shadow-elevation-1',
            'group-hover:scale-[1.04] transition-transform',
            accent.iconBg,
            accent.iconFg
          )}
          aria-hidden="true"
        >
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-carbon-900 dark:text-carbon-100">
              {t(category.nameKey)}
            </h3>
            <ChevronRight
              className={cn(
                'w-5 h-5 text-carbon-400 transition-colors',
                accent.chevron
              )}
            />
          </div>
          <p className="text-sm text-carbon-600 dark:text-carbon-400 mt-1">
            {t(category.descriptionKey)}
          </p>
          <div className="flex items-center gap-1 mt-3 text-xs text-carbon-500 dark:text-carbon-400">
            <MessageSquare className="w-4 h-4" />
            <span>{category.postCount} posts</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
