'use client';

/**
 * LEARNING PROGRESS BAR
 * =====================
 *
 * Visual progress indicator for learning paths.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Circle, Lock, PlayCircle } from 'lucide-react';
import type { LearningModule, ModuleProgress, ModuleProgressStatus } from '@/lib/types/learning';

// =============================================================================
// PROPS
// =============================================================================

interface ProgressBarProps {
  modules: LearningModule[];
  progress: ModuleProgress[];
  currentModuleId?: string;
  onModuleClick?: (moduleId: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ProgressBar({
  modules,
  progress,
  currentModuleId,
  onModuleClick,
  orientation = 'horizontal',
}: ProgressBarProps) {
  const t = useTranslations('learning');

  const getModuleStatus = (moduleId: string): ModuleProgressStatus => {
    const moduleProgress = progress.find((p) => p.moduleId === moduleId);
    return moduleProgress?.status || 'available';
  };

  const getStatusIcon = (status: ModuleProgressStatus, isCurrent: boolean) => {
    if (isCurrent) {
      return <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }

    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'locked':
        return <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />;
      case 'in_progress':
        return <Circle className="w-5 h-5 text-blue-600 dark:text-blue-400 fill-blue-100 dark:fill-blue-900" />;
      case 'failed':
        return <Circle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />;
    }
  };

  const completedCount = progress.filter((p) => p.status === 'completed').length;
  const progressPercent = modules.length > 0 ? (completedCount / modules.length) * 100 : 0;

  if (orientation === 'vertical') {
    return (
      <div className="space-y-4">
        {/* Overall progress */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {completedCount}/{modules.length}
          </span>
        </div>

        {/* Module list */}
        <div className="space-y-2">
          {modules.map((module, index) => {
            const status = getModuleStatus(module.id);
            const isCurrent = module.id === currentModuleId;
            const isClickable = status !== 'locked' && onModuleClick;

            return (
              <button
                key={module.id}
                onClick={() => isClickable && onModuleClick(module.id)}
                disabled={status === 'locked'}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all
                  ${isCurrent
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                  ${status === 'locked' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {/* Order number or icon */}
                <div className="shrink-0">
                  {getStatusIcon(status, isCurrent)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {index + 1}.
                    </span>
                    <span className={`text-sm font-medium truncate ${
                      isCurrent
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {t(module.titleKey.replace('learning.', ''))}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {module.estimatedMinutes} min
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {module.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal orientation (stepper style)
  return (
    <div className="w-full">
      {/* Progress percentage */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('progress')}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {Math.round(progressPercent)}%
        </span>
      </div>

      {/* Stepper */}
      <div className="flex items-center">
        {modules.map((module, index) => {
          const status = getModuleStatus(module.id);
          const isCurrent = module.id === currentModuleId;
          const isLast = index === modules.length - 1;

          return (
            <React.Fragment key={module.id}>
              {/* Step */}
              <button
                onClick={() => status !== 'locked' && onModuleClick?.(module.id)}
                disabled={status === 'locked'}
                className={`
                  relative group shrink-0
                  ${status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                title={t(module.titleKey.replace('learning.', ''))}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : isCurrent
                      ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900'
                      : status === 'locked'
                        ? 'bg-gray-100 dark:bg-gray-800'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}>
                  {getStatusIcon(status, isCurrent)}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {t(module.titleKey.replace('learning.', ''))}
                </div>
              </button>

              {/* Connector line */}
              {!isLast && (
                <div className={`
                  flex-1 h-0.5 mx-1
                  ${status === 'completed' ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
