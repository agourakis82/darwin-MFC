'use client';

/**
 * CATEGORY CARD COMPONENT
 * =======================
 *
 * Display a forum category in a card format.
 */

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Stethoscope,
  FileText,
  Users,
  Globe,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import type { ForumCategory } from '@/lib/types/community';

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

// =============================================================================
// COMPONENT
// =============================================================================

export function CategoryCard({ category }: CategoryCardProps) {
  const t = useTranslations();

  const IconComponent = iconComponents[category.icon] || MessageSquare;

  return (
    <Link
      href={`/community/forums/${category.id}`}
      className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-md group"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${category.color} group-hover:scale-110 transition-transform`}>
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t(category.nameKey)}
            </h3>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {t(category.descriptionKey)}
          </p>
          <div className="flex items-center gap-1 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-4 h-4" />
            <span>{category.postCount} posts</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
