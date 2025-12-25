'use client';

/**
 * LEARNING PATH DETAIL CLIENT COMPONENT
 * ======================================
 *
 * Client-side interactive component for learning path pages.
 */

import React, { useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ArrowLeft,
  Clock,
  Award,
  BookOpen,
  PlayCircle,
  ChevronRight,
  Lock,
  CheckCircle2,
  Circle,
  Target,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
} from 'lucide-react';
import { getLearningPathById } from '@/lib/data/learning-paths';
import { useLearningStore } from '@/lib/store/learningStore';
import type { ModuleProgress, LearningModule } from '@/lib/types/learning';

// =============================================================================
// ICON MAP
// =============================================================================

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Award,
};

// =============================================================================
// PROPS
// =============================================================================

interface LearningPathClientProps {
  pathId: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function LearningPathClient({ pathId }: LearningPathClientProps) {
  const router = useRouter();
  const t = useTranslations('learning');

  const path = useMemo(() => getLearningPathById(pathId), [pathId]);

  // Get progress from learning store
  const {
    getPathProgress,
    startPath,
    toggleBookmark,
    isBookmarked,
    resetPathProgress,
    getOverallProgress,
    getCompletedModules,
    getTotalTimeSpent,
  } = useLearningStore();

  const pathProgress = getPathProgress(pathId);
  const moduleProgress: ModuleProgress[] = pathProgress?.moduleProgress || [];
  const bookmarked = isBookmarked(pathId);

  // Initialize path progress when first visiting
  useEffect(() => {
    if (path && !pathProgress) {
      // Don't auto-start, wait for user to click start
    }
  }, [path, pathProgress]);

  if (!path) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('path_not_found')}
          </h1>
          <button
            onClick={() => router.push('/learn')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('back_to_paths')}
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = iconComponents[path.icon] || BookOpen;
  const completedModulesCount = getCompletedModules(pathId);
  const progressPercent = getOverallProgress(pathId);
  const totalTimeSpent = getTotalTimeSpent(pathId);

  const handleStartPath = () => {
    if (!pathProgress && path) {
      startPath(pathId, path);
    }
    handleContinue();
  };

  const handleResetProgress = () => {
    if (confirm(t('confirm_reset'))) {
      resetPathProgress(pathId);
    }
  };

  const getModuleStatus = (module: LearningModule, index: number) => {
    const progress = moduleProgress.find((p) => p.moduleId === module.id);
    if (progress) return progress.status;

    // Check prerequisites
    if (module.prerequisites && module.prerequisites.length > 0) {
      const allPrereqsMet = module.prerequisites.every((prereqId) =>
        moduleProgress.some((p) => p.moduleId === prereqId && p.status === 'completed')
      );
      if (!allPrereqsMet) return 'locked';
    }

    // First module is always available
    if (index === 0) return 'available';

    // Check if previous module is completed
    const prevModule = path.modules[index - 1];
    const prevProgress = moduleProgress.find((p) => p.moduleId === prevModule.id);
    if (prevProgress?.status === 'completed') return 'available';

    return 'locked';
  };

  const getModuleTypeLabel = (type: string) => {
    const typeKey = `module_types.${type}`;
    const translated = t(typeKey);
    // If translation exists (not returning the key), use it; otherwise fallback to type
    return translated !== typeKey ? translated : type;
  };

  const handleStartModule = (moduleId: string, status: string) => {
    if (status === 'locked') return;
    router.push(`/learn/paths/${pathId}/modules/${moduleId}`);
  };

  const handleContinue = () => {
    // Find the first available or in_progress module
    for (let i = 0; i < path.modules.length; i++) {
      const status = getModuleStatus(path.modules[i], i);
      if (status === 'in_progress' || status === 'available') {
        router.push(`/learn/paths/${pathId}/modules/${path.modules[i].id}`);
        return;
      }
    }
    // If all completed, go to first module
    if (path.modules.length > 0) {
      router.push(`/learn/paths/${pathId}/modules/${path.modules[0].id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${path.color} text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <button
            onClick={() => router.push('/learn')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{t('back_to_paths')}</span>
          </button>

          {/* Path info */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl shrink-0">
              <IconComponent className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold mb-2">
                {t(path.titleKey.replace('learning.', ''))}
              </h1>
              <p className="text-white/80 mb-4">
                {t(path.descriptionKey.replace('learning.', ''))}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 opacity-80" />
                  <span>{path.modules.length} {t('modules')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 opacity-80" />
                  <span>{path.estimatedHours}h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4 opacity-80" />
                  <span>{t(`difficulty.${path.difficulty}`)}</span>
                </div>
                {path.certification?.enabled && (
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 opacity-80" />
                    <span>{t('certificate_available')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t('progress')}</span>
              <span className="text-sm">{progressPercent}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-white/80">
              <span>{t('modules_completed', { completed: completedModulesCount, total: path.modules.length })}</span>
              {totalTimeSpent > 0 && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {totalTimeSpent} min
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleStartPath}
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              {completedModulesCount > 0 ? t('continue') : t('start')}
            </button>

            <button
              onClick={() => toggleBookmark(pathId)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title={bookmarked ? t('remove_bookmark') : t('add_bookmark')}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>

            {pathProgress && (
              <button
                onClick={handleResetProgress}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title={t('reset_progress')}
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t('path_modules')}
        </h2>

        <div className="space-y-3">
          {path.modules.map((module, index) => {
            const status = getModuleStatus(module, index);
            const isLocked = status === 'locked';
            const progress = moduleProgress.find((p) => p.moduleId === module.id);

            return (
              <button
                key={module.id}
                onClick={() => handleStartModule(module.id, status)}
                disabled={isLocked}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left
                  ${isLocked
                    ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md cursor-pointer'
                  }
                `}
              >
                {/* Order number */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-medium
                  ${status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : status === 'in_progress'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-medium truncate ${
                      isLocked
                        ? 'text-gray-500 dark:text-gray-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {t(module.titleKey.replace('learning.', ''))}
                    </h3>
                    {status === 'in_progress' && (
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                        {t('status.in_progress')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {t(module.descriptionKey.replace('learning.', ''))}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 dark:text-gray-500">
                    <span>{getModuleTypeLabel(module.type)}</span>
                    <span>•</span>
                    <span>{module.estimatedMinutes} min</span>
                    {progress?.score !== undefined && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 dark:text-green-400">
                          {progress.score}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status icon */}
                <div className="shrink-0">
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Certification info */}
        {path.certification?.enabled && (
          <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  {t(path.certification.titleKey.replace('learning.', ''))}
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                  {t(path.certification.descriptionKey.replace('learning.', ''))}
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  {t('minimum_score', { score: path.certification.minimumScore })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
