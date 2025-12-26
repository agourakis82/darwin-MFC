'use client';

/**
 * MODULE PLAYER CLIENT COMPONENT
 * ==============================
 *
 * Client-side interactive component for module player pages.
 * Includes automatic certificate generation on path completion.
 */

import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  RefreshCw,
  Award,
  PartyPopper,
  Download,
  X,
} from 'lucide-react';
import { getLearningPathById, getModuleById } from '@/lib/data/learning-paths';
import { useLearningStore } from '@/lib/store/learningStore';
import { QuizEngine } from '@/app/components/Learning';
import { generateCertificate, isEligibleForCertification } from '@/lib/utils/certificates';
import type { LearningModule, ModuleProgress, QuizModuleContent, Certificate } from '@/lib/types/learning';

// =============================================================================
// PROPS
// =============================================================================

interface ModulePlayerClientProps {
  pathId: string;
  moduleId: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function ModulePlayerClient({ pathId, moduleId }: ModulePlayerClientProps) {
  const router = useRouter();
  const t = useTranslations('learning');

  const path = useMemo(() => getLearningPathById(pathId), [pathId]);
  const module = useMemo(() => getModuleById(pathId, moduleId), [pathId, moduleId]);

  // Get progress from learning store
  const {
    getPathProgress,
    startPath,
    startModule,
    completeModule,
    updateModuleTime,
    recordQuizAttempt,
    completePath,
    addCertificate,
    getCertificate,
  } = useLearningStore();

  const pathProgress = getPathProgress(pathId);
  const moduleProgressList: ModuleProgress[] = pathProgress?.moduleProgress || [];
  const currentModuleProgress = moduleProgressList.find((p) => p.moduleId === moduleId);

  // Track time spent on module
  const startTimeRef = useRef<number>(Date.now());
  const lastSaveRef = useRef<number>(Date.now());

  const [isCompleted, setIsCompleted] = useState(
    currentModuleProgress?.status === 'completed'
  );
  const [quizScore, setQuizScore] = useState<number | null>(
    currentModuleProgress?.score ?? null
  );
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [earnedCertificate, setEarnedCertificate] = useState<Certificate | null>(null);

  // Initialize path and module progress on mount
  useEffect(() => {
    if (path && !pathProgress) {
      startPath(pathId, path);
    }
  }, [path, pathProgress, pathId, startPath]);

  useEffect(() => {
    if (pathProgress && currentModuleProgress?.status !== 'completed') {
      startModule(pathId, moduleId);
    }
  }, [pathProgress, pathId, moduleId, currentModuleProgress?.status, startModule]);

  // Track time spent every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const minutesElapsed = Math.floor((now - lastSaveRef.current) / 60000);
      if (minutesElapsed >= 1) {
        updateModuleTime(pathId, moduleId, minutesElapsed);
        lastSaveRef.current = now;
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      // Save remaining time on unmount
      const now = Date.now();
      const minutesElapsed = Math.floor((now - lastSaveRef.current) / 60000);
      if (minutesElapsed >= 1) {
        updateModuleTime(pathId, moduleId, minutesElapsed);
      }
    };
  }, [pathId, moduleId, updateModuleTime]);

  if (!path || !module) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('module_not_found')}
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

  const currentIndex = path.modules.findIndex((m) => m.id === moduleId);
  const prevModule = currentIndex > 0 ? path.modules[currentIndex - 1] : null;
  const nextModule = currentIndex < path.modules.length - 1 ? path.modules[currentIndex + 1] : null;

  // Calculate completed modules count for progress bar
  const completedModulesCount = moduleProgressList.filter(
    (p) => p.status === 'completed'
  ).length;

  const handlePrevious = () => {
    if (prevModule) {
      router.push(`/learn/paths/${pathId}/modules/${prevModule.id}`);
    }
  };

  // Check if path is complete and generate certificate
  const checkAndGenerateCertificate = useCallback(() => {
    if (!path || !pathProgress) return;

    // Get updated progress (current module marked as complete)
    const updatedProgress = {
      ...pathProgress,
      moduleProgress: pathProgress.moduleProgress.map((mp) =>
        mp.moduleId === moduleId
          ? { ...mp, status: 'completed' as const }
          : mp
      ),
    };

    // Check if all modules are now completed
    const allCompleted = updatedProgress.moduleProgress.every(
      (mp) => mp.status === 'completed'
    );

    if (allCompleted && path.certification) {
      // Check if already has certificate
      const existingCert = getCertificate(pathId);
      if (existingCert) return;

      // Check eligibility and generate certificate
      if (isEligibleForCertification(path, updatedProgress)) {
        // Default user name (can be customized)
        const userName = t('default_user'); // TODO: Get from user profile when available
        const certificate = generateCertificate(path, updatedProgress, userName);

        // Save certificate and complete path
        completePath(pathId, certificate);
        setEarnedCertificate(certificate);
        setShowCompletionModal(true);
      } else {
        // Path completed but not certified (didn't meet score requirements)
        completePath(pathId);
      }
    }
  }, [path, pathProgress, pathId, moduleId, getCertificate, completePath]);

  const handleNext = () => {
    if (nextModule) {
      router.push(`/learn/paths/${pathId}/modules/${nextModule.id}`);
    } else {
      // Last module - check for certificate
      checkAndGenerateCertificate();

      // If no modal shown, navigate to path page
      if (!showCompletionModal) {
        router.push(`/learn/paths/${pathId}`);
      }
    }
  };

  const handleComplete = () => {
    completeModule(pathId, moduleId);
    setIsCompleted(true);
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    setQuizScore(score);
    recordQuizAttempt(pathId, moduleId, score, passed);
    if (passed) {
      setIsCompleted(true);
    }
  };

  // Render module content based on type
  const renderModuleContent = () => {
    switch (module.type) {
      case 'content':
        return <ContentModulePlayer module={module} onComplete={handleComplete} />;
      case 'quiz':
        return (
          <QuizModulePlayer
            module={module}
            onComplete={handleQuizComplete}
          />
        );
      case 'case_study':
        return <CaseStudyPlayer module={module} onComplete={handleComplete} t={t} />;
      case 'flashcards':
        return <FlashcardsPlayer module={module} onComplete={handleComplete} t={t} />;
      default:
        return (
          <div className="text-center py-12 text-gray-500">
            <HelpCircle className="w-12 h-12 mx-auto mb-4" />
            <p>Tipo de módulo não suportado: {module.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back button */}
            <button
              onClick={() => router.push(`/learn/paths/${pathId}`)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">{t(path.titleKey.replace('learning.', ''))}</span>
            </button>

            {/* Progress indicator */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>
                {currentIndex + 1} / {path.modules.length}
              </span>
            </div>

            {/* Time estimate */}
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{module.estimatedMinutes} min</span>
            </div>
          </div>

          {/* Mini progress bar */}
          <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((completedModulesCount + (isCompleted && currentModuleProgress?.status !== 'completed' ? 1 : 0)) / path.modules.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Module title */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t(module.titleKey.replace('learning.', ''))}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t(module.descriptionKey.replace('learning.', ''))}
        </p>
      </div>

      {/* Module content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {renderModuleContent()}
      </div>

      {/* Navigation footer */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={!prevModule}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${prevModule
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('previous')}</span>
            </button>

            {isCompleted ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {quizScore !== null ? t('completed_score', { score: quizScore }) : t('completed')}
                </span>
              </div>
            ) : module.type === 'content' ? (
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t('mark_complete')}
              </button>
            ) : null}

            <button
              onClick={handleNext}
              disabled={!isCompleted && module.type === 'quiz'}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${isCompleted || module.type !== 'quiz'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <span className="hidden sm:inline">
                {nextModule ? t('next') : t('complete_path')}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Completion Celebration Modal */}
      {showCompletionModal && (
        <CompletionModal
          certificate={earnedCertificate}
          pathTitle={t(path.titleKey.replace('learning.', ''))}
          onClose={() => {
            setShowCompletionModal(false);
            router.push(`/learn/paths/${pathId}`);
          }}
          onViewCertificate={() => {
            setShowCompletionModal(false);
            router.push('/learn/certificates');
          }}
          t={t}
        />
      )}
    </div>
  );
}

// =============================================================================
// CONTENT MODULE PLAYER
// =============================================================================

interface ContentModulePlayerProps {
  module: LearningModule;
  onComplete: () => void;
}

function ContentModulePlayer({ module, onComplete }: ContentModulePlayerProps) {
  const content = module.content as { type: 'content'; contentRef?: string; contentType: string; customContent?: string };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      {content.customContent ? (
        <div className="prose dark:prose-invert max-w-none">
          {/* TODO: Render markdown content */}
          <p>{content.customContent}</p>
        </div>
      ) : content.contentRef ? (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Este módulo faz referência ao conteúdo: <strong>{content.contentRef}</strong>
          </p>
          <a
            href={`/doencas/${content.contentRef}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Ver conteúdo completo
          </a>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Conteúdo não disponível</p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// QUIZ MODULE PLAYER
// =============================================================================

interface QuizModulePlayerProps {
  module: LearningModule;
  onComplete: (score: number, passed: boolean) => void;
}

function QuizModulePlayer({ module, onComplete }: QuizModulePlayerProps) {
  const quizContent = module.content as QuizModuleContent;
  const passingScore = module.passingScore || 70;

  return (
    <QuizEngine
      content={quizContent}
      passingScore={passingScore}
      maxAttempts={quizContent.maxAttempts}
      onComplete={onComplete}
    />
  );
}

// =============================================================================
// CASE STUDY PLAYER (PLACEHOLDER)
// =============================================================================

interface CaseStudyPlayerProps {
  module: LearningModule;
  onComplete: () => void;
  t: ReturnType<typeof useTranslations<'learning'>>;
}

function CaseStudyPlayer({ module, onComplete, t }: CaseStudyPlayerProps) {
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-center py-8">
        <Lightbulb className="w-12 h-12 mx-auto mb-4 text-amber-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('case_study_player.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('case_study_player.coming_soon')}
        </p>
        <button
          onClick={onComplete}
          className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
        >
          {t('mark_as_viewed')}
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// FLASHCARDS PLAYER (PLACEHOLDER)
// =============================================================================

interface FlashcardsPlayerProps {
  module: LearningModule;
  onComplete: () => void;
  t: ReturnType<typeof useTranslations<'learning'>>;
}

function FlashcardsPlayer({ module, onComplete, t }: FlashcardsPlayerProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-center py-8">
        <RefreshCw className="w-12 h-12 mx-auto mb-4 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('flashcards_player.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('flashcards_player.coming_soon')}
        </p>
        <button
          onClick={onComplete}
          className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          {t('mark_as_viewed')}
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// COMPLETION CELEBRATION MODAL
// =============================================================================

interface CompletionModalProps {
  certificate: Certificate | null;
  pathTitle: string;
  onClose: () => void;
  onViewCertificate: () => void;
  t: ReturnType<typeof useTranslations<'learning'>>;
}

function CompletionModal({
  certificate,
  pathTitle,
  onClose,
  onViewCertificate,
  t,
}: CompletionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration animation background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="absolute top-0 left-3/4 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Content */}
        <div className="text-center relative">
          {/* Icon */}
          <div className="mb-6">
            {certificate ? (
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
            ) : (
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <PartyPopper className="w-10 h-10 text-white" />
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {certificate ? t('completion_modal.congratulations') : t('completion_modal.path_completed')}
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {certificate ? (
              <span dangerouslySetInnerHTML={{
                __html: t('completion_modal.completed_with_cert', { pathTitle })
              }} />
            ) : (
              <span dangerouslySetInnerHTML={{
                __html: t('completion_modal.completed_success', { pathTitle })
              }} />
            )}
          </p>

          {/* Certificate info */}
          {certificate && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300 mb-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">{t('completion_modal.certificate_issued')}</span>
              </div>
              <div className="text-sm text-amber-600 dark:text-amber-400">
                {t('completion_modal.score', { score: certificate.score })}
              </div>
              <div className="text-xs text-amber-500 dark:text-amber-500 mt-1 font-mono">
                {certificate.verificationCode}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {certificate && (
              <button
                onClick={onViewCertificate}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                {t('completion_modal.view_certificate')}
              </button>
            )}
            <button
              onClick={onClose}
              className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                certificate
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg'
              }`}
            >
              {certificate ? t('completion_modal.close') : t('completion_modal.continue')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
