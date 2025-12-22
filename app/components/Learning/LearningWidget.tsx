'use client';

/**
 * LEARNING PROGRESS WIDGET
 * ========================
 *
 * A compact widget showing user's learning progress.
 * Can be embedded in the home page or other pages.
 */

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  GraduationCap,
  Flame,
  Trophy,
  ChevronRight,
  BookOpen,
  PlayCircle,
  Target,
} from 'lucide-react';
import { useLearningStore } from '@/lib/store/learningStore';
import { getPublishedLearningPaths } from '@/lib/data/learning-paths';

export function LearningWidget() {
  const t = useTranslations('learning');

  const { pathProgress, streakDays, certificates, getOverallProgress } = useLearningStore();
  const allPaths = getPublishedLearningPaths();

  // Get paths in progress
  const inProgressPaths = allPaths.filter(
    (path) => pathProgress[path.id]?.status === 'in_progress'
  );

  const completedPathsCount = Object.values(pathProgress).filter(
    (p) => p.status === 'completed' || p.status === 'certified'
  ).length;

  const hasAnyProgress = Object.keys(pathProgress).length > 0;

  // If no progress, show a call-to-action
  if (!hasAnyProgress) {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="w-8 h-8" />
          <h3 className="text-xl font-bold">{t('widget.start_learning') || 'Start Learning'}</h3>
        </div>
        <p className="text-blue-100 mb-4 text-sm">
          {t('widget.start_description') || 'Structured learning paths for primary care professionals. Free forever.'}
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm"
        >
          <BookOpen className="w-4 h-4" />
          {t('widget.explore') || 'Explore Paths'}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <h3 className="font-bold">{t('widget.my_learning') || 'My Learning'}</h3>
          </div>
          <Link
            href="/learn/progress"
            className="text-sm text-white/80 hover:text-white flex items-center gap-1"
          >
            {t('widget.view_all') || 'View All'}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-6 mt-3 text-sm">
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-300" />
            <span>{streakDays} {t('widget.days') || 'days'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span>{certificates.length} {t('widget.certs') || 'certs'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-green-300" />
            <span>{completedPathsCount}/{allPaths.length} {t('widget.paths') || 'paths'}</span>
          </div>
        </div>
      </div>

      {/* In progress paths */}
      <div className="p-4">
        {inProgressPaths.length > 0 ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {t('widget.continue') || 'Continue where you left off'}
            </div>
            {inProgressPaths.slice(0, 2).map((path) => {
              const progress = getOverallProgress(path.id);
              return (
                <Link
                  key={path.id}
                  href={`/learn/paths/${path.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${path.color} text-white flex items-center justify-center shrink-0`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {t(`paths.${path.id}.title`)}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                        {progress}%
                      </span>
                    </div>
                  </div>
                  <PlayCircle className="w-5 h-5 text-blue-500 shrink-0" />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {t('widget.all_completed') || 'All paths completed! Check out new content.'}
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {t('widget.browse') || 'Browse Paths'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningWidget;
