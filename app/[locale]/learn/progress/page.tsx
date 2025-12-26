'use client';

/**
 * LEARNING PROGRESS PAGE
 * ======================
 *
 * Shows user's learning progress, achievements, and certificates.
 */

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  Trophy,
  Flame,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  BarChart3,
  Calendar,
  Target,
  Star,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useLearningStore } from '@/lib/store/learningStore';
import { getPublishedLearningPaths } from '@/lib/data/learning-paths';
import type { LearningPath } from '@/lib/types/learning';

// =============================================================================
// COMPONENT
// =============================================================================

export default function ProgressPage() {
  const t = useTranslations('learning');

  const {
    pathProgress,
    certificates,
    streakDays,
    lastActivityDate,
    bookmarkedPaths,
    getOverallProgress,
    getCompletedModules,
    getTotalTimeSpent,
    resetAllProgress,
  } = useLearningStore();

  const allPaths = getPublishedLearningPaths();

  // Calculate overall stats
  const totalModulesCompleted = Object.keys(pathProgress).reduce((sum, pathId) => {
    return sum + getCompletedModules(pathId);
  }, 0);

  const totalTimeSpent = Object.keys(pathProgress).reduce((sum, pathId) => {
    return sum + getTotalTimeSpent(pathId);
  }, 0);

  const completedPaths = Object.values(pathProgress).filter(
    (p) => p.status === 'completed' || p.status === 'certified'
  ).length;

  const inProgressPaths = Object.values(pathProgress).filter(
    (p) => p.status === 'in_progress'
  ).length;

  // Get paths with progress for display
  const pathsWithProgress = allPaths.map((path) => ({
    path,
    progress: pathProgress[path.id],
    overallProgress: getOverallProgress(path.id),
    completedModules: getCompletedModules(path.id),
    timeSpent: getTotalTimeSpent(path.id),
  })).filter((item) => item.progress);

  const handleResetAll = () => {
    if (confirm(t('confirm_reset_all') || 'Are you sure you want to reset all progress? This cannot be undone.')) {
      resetAllProgress();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-10 h-10" />
              <h1 className="text-3xl font-bold">{t('progress.title') || 'My Progress'}</h1>
            </div>
            {Object.keys(pathProgress).length > 0 && (
              <button
                onClick={handleResetAll}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                {t('progress.reset_all') || 'Reset All'}
              </button>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Flame className="w-8 h-8 mb-2 text-orange-300" />
              <div className="text-3xl font-bold">{streakDays}</div>
              <div className="text-sm text-emerald-100">{t('progress.streak_days') || 'Day Streak'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <BookOpen className="w-8 h-8 mb-2 text-blue-300" />
              <div className="text-3xl font-bold">{totalModulesCompleted}</div>
              <div className="text-sm text-emerald-100">{t('progress.modules_completed') || 'Modules'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Clock className="w-8 h-8 mb-2 text-purple-300" />
              <div className="text-3xl font-bold">{totalTimeSpent}</div>
              <div className="text-sm text-emerald-100">{t('progress.minutes_studied') || 'Minutes'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Trophy className="w-8 h-8 mb-2 text-yellow-300" />
              <div className="text-3xl font-bold">{certificates.length}</div>
              <div className="text-sm text-emerald-100">{t('progress.certificates') || 'Certificates'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pathsWithProgress.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('progress.no_progress') || 'No learning progress yet'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('progress.start_learning') || 'Start a learning path to track your progress here.'}
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              {t('progress.browse_paths') || 'Browse Learning Paths'}
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column - Path Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* In Progress */}
              {inProgressPaths > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    {t('progress.in_progress') || 'In Progress'} ({inProgressPaths})
                  </h2>
                  <div className="space-y-4">
                    {pathsWithProgress
                      .filter((item) => item.progress?.status === 'in_progress')
                      .map((item) => (
                        <PathProgressCard
                          key={item.path.id}
                          path={item.path}
                          progress={item.overallProgress}
                          completedModules={item.completedModules}
                          timeSpent={item.timeSpent}
                          lastAccessed={item.progress?.lastAccessedAt}
                          t={t}
                        />
                      ))}
                  </div>
                </section>
              )}

              {/* Completed */}
              {completedPaths > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {t('progress.completed') || 'Completed'} ({completedPaths})
                  </h2>
                  <div className="space-y-4">
                    {pathsWithProgress
                      .filter((item) => item.progress?.status === 'completed' || item.progress?.status === 'certified')
                      .map((item) => (
                        <PathProgressCard
                          key={item.path.id}
                          path={item.path}
                          progress={100}
                          completedModules={item.completedModules}
                          timeSpent={item.timeSpent}
                          lastAccessed={item.progress?.completedAt}
                          isCompleted
                          isCertified={item.progress?.status === 'certified'}
                          t={t}
                        />
                      ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Certificates */}
              {certificates.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      {t('progress.my_certificates') || 'My Certificates'}
                    </h3>
                    <Link
                      href="/learn/certificates"
                      className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      {t('certificate.view_all') || 'View All'}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {certificates.slice(0, 3).map((cert) => (
                      <Link
                        key={cert.id}
                        href="/learn/certificates"
                        className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                      >
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {t(`certs.${cert.learningPathId}.title`)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(cert.issuedAt)} • {cert.score}%
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </Link>
                    ))}
                    {certificates.length > 3 && (
                      <div className="text-center text-sm text-gray-500">
                        +{certificates.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Activity Calendar Placeholder */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  {t('progress.activity') || 'Recent Activity'}
                </h3>
                {lastActivityDate ? (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                      {t('progress.last_active') || 'Last active'}: {formatDate(lastActivityDate)}
                    </p>
                    <div className="flex items-center gap-2 text-orange-500">
                      <Flame className="w-4 h-4" />
                      <span>{streakDays} {t('progress.day_streak') || 'day streak'}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    {t('progress.no_activity') || 'No recent activity'}
                  </p>
                )}
              </div>

              {/* Bookmarked Paths */}
              {bookmarkedPaths.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    {t('progress.bookmarked') || 'Bookmarked'}
                  </h3>
                  <div className="space-y-2">
                    {bookmarkedPaths.map((pathId) => {
                      const path = allPaths.find((p) => p.id === pathId);
                      if (!path) return null;
                      return (
                        <Link
                          key={pathId}
                          href={`/learn/paths/${pathId}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {t(`paths.${pathId}.title`)}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// PATH PROGRESS CARD
// =============================================================================

interface PathProgressCardProps {
  path: LearningPath;
  progress: number;
  completedModules: number;
  timeSpent: number;
  lastAccessed?: string;
  isCompleted?: boolean;
  isCertified?: boolean;
  t: (key: string) => string;
}

function PathProgressCard({
  path,
  progress,
  completedModules,
  timeSpent,
  lastAccessed,
  isCompleted,
  isCertified,
  t,
}: PathProgressCardProps) {
  return (
    <Link
      href={`/learn/paths/${path.id}`}
      className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t(`paths.${path.id}.title`)}
            </h3>
            {isCertified && (
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs rounded-full flex items-center gap-1">
                <Award className="w-3 h-3" />
                {t('status.certified')}
              </span>
            )}
            {isCompleted && !isCertified && (
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                {t('status.completed')}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {completedModules} / {path.modules.length} {t('modules')}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {progress}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full transition-all duration-300 ${
            isCompleted ? 'bg-green-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Meta info */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeSpent} min
          </span>
        </div>
        {lastAccessed && (
          <span>
            {new Date(lastAccessed).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
            })}
          </span>
        )}
      </div>
    </Link>
  );
}
