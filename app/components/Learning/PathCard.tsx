'use client';

/**
 * LEARNING PATH CARD
 * ==================
 *
 * Display card for a learning path with progress indicator.
 */

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Heart,
  Pill,
  AlertTriangle,
  Brain,
  Baby,
  Users,
  Stethoscope,
  Activity,
  BookOpen,
  Clock,
  CheckCircle2,
  Lock,
  ChevronRight,
} from 'lucide-react';
import type { LearningPath } from '@/lib/types/learning';
import type { UserLearningProgress } from '@/lib/types/learning';

// =============================================================================
// ICON MAPPING
// =============================================================================

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Pill,
  AlertTriangle,
  Brain,
  Baby,
  Users,
  Stethoscope,
  Activity,
  BookOpen,
};

// =============================================================================
// PROPS
// =============================================================================

interface PathCardProps {
  path: LearningPath;
  progress?: UserLearningProgress;
  isLocked?: boolean;
  locale?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function PathCard({ path, progress, isLocked = false, locale = 'pt' }: PathCardProps) {
  const t = useTranslations('learning');

  const IconComponent = iconMap[path.icon] || BookOpen;

  const completedModules = progress?.moduleProgress.filter(
    (m) => m.status === 'completed'
  ).length || 0;
  const totalModules = path.modules.length;
  const progressPercent = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  const difficultyLabels = {
    beginner: t('difficulty.beginner'),
    intermediate: t('difficulty.intermediate'),
    advanced: t('difficulty.advanced'),
  };

  const statusBadge = () => {
    if (isLocked) {
      return (
        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Lock className="w-3 h-3" />
          {t('status.locked')}
        </span>
      );
    }
    if (progress?.status === 'completed' || progress?.status === 'certified') {
      return (
        <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
          <CheckCircle2 className="w-3 h-3" />
          {progress.status === 'certified' ? t('status.certified') : t('status.completed')}
        </span>
      );
    }
    if (progress?.status === 'in_progress') {
      return (
        <span className="text-xs text-blue-600 dark:text-blue-400">
          {t('status.in_progress')}
        </span>
      );
    }
    return (
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {t('status.not_started')}
      </span>
    );
  };

  const cardContent = (
    <div
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-200
        ${isLocked
          ? 'bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-75'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg cursor-pointer'
        }
      `}
    >
      {/* Progress bar */}
      {progressPercent > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`p-3 rounded-lg ${path.color} text-white shrink-0`}>
            <IconComponent className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {t(path.titleKey.replace('learning.', ''))}
              </h3>
              {statusBadge()}
            </div>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {t(path.descriptionKey.replace('learning.', ''))}
            </p>
          </div>
        </div>

        {/* Meta info */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
          {/* Difficulty */}
          <span className={`px-2 py-0.5 rounded-full ${difficultyColors[path.difficulty]}`}>
            {difficultyLabels[path.difficulty]}
          </span>

          {/* Duration */}
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            {path.estimatedHours}h
          </span>

          {/* Modules count */}
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <BookOpen className="w-3 h-3" />
            {completedModules}/{totalModules} {t('modules')}
          </span>

          {/* Certificate badge */}
          {path.certification?.enabled && (
            <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
              <CheckCircle2 className="w-3 h-3" />
              {t('certificate_available')}
            </span>
          )}
        </div>

        {/* CTA */}
        {!isLocked && (
          <div className="mt-4 flex items-center justify-end text-sm text-blue-600 dark:text-blue-400 font-medium">
            {progress?.status === 'in_progress' ? t('continue') : t('start')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        )}
      </div>
    </div>
  );

  if (isLocked) {
    return cardContent;
  }

  return (
    <Link href={`/learn/paths/${path.id}`}>
      {cardContent}
    </Link>
  );
}

export default PathCard;
