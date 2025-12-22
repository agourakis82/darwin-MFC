'use client';

/**
 * QUIZ ENGINE
 * ===========
 *
 * Interactive quiz component for learning modules.
 * Supports single, multiple choice, and true/false questions.
 */

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import type { QuizModuleContent, QuizQuestion, QuizOption } from '@/lib/types/learning';

// =============================================================================
// TYPES
// =============================================================================

interface QuizEngineProps {
  content: QuizModuleContent;
  passingScore: number;
  onComplete: (score: number, passed: boolean) => void;
  maxAttempts?: number;
  currentAttempt?: number;
}

interface QuestionResult {
  questionId: string;
  selectedOptions: string[];
  isCorrect: boolean;
  points: number;
  earnedPoints: number;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function QuizEngine({
  content,
  passingScore,
  onComplete,
  maxAttempts = 3,
  currentAttempt = 1,
}: QuizEngineProps) {
  const t = useTranslations('learning.quiz');

  // Shuffle questions if configured
  const [questions] = useState(() => {
    const qs = [...content.questions];
    if (content.shuffleQuestions) {
      for (let i = qs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qs[i], qs[j]] = [qs[j], qs[i]];
      }
    }
    return qs;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  // ==========================================================================
  // OPTION SELECTION
  // ==========================================================================

  const handleOptionSelect = useCallback((optionId: string) => {
    if (showFeedback) return;

    if (currentQuestion.type === 'single' || currentQuestion.type === 'true_false') {
      setSelectedOptions([optionId]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    }
  }, [showFeedback, currentQuestion.type]);

  // ==========================================================================
  // SUBMIT ANSWER
  // ==========================================================================

  const handleSubmit = useCallback(() => {
    if (selectedOptions.length === 0) return;

    const correctOptions = currentQuestion.options
      .filter((o) => o.isCorrect)
      .map((o) => o.id);

    const isCorrect =
      selectedOptions.length === correctOptions.length &&
      selectedOptions.every((id) => correctOptions.includes(id));

    const earnedPoints = isCorrect ? currentQuestion.points : 0;

    const result: QuestionResult = {
      questionId: currentQuestion.id,
      selectedOptions,
      isCorrect,
      points: currentQuestion.points,
      earnedPoints,
    };

    setResults((prev) => [...prev, result]);

    if (content.showFeedback) {
      setShowFeedback(true);
    } else {
      goToNext();
    }
  }, [selectedOptions, currentQuestion, content.showFeedback]);

  // ==========================================================================
  // NAVIGATION
  // ==========================================================================

  const goToNext = useCallback(() => {
    setShowFeedback(false);
    setSelectedOptions([]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Quiz complete
      const allResults = [...results];
      if (!allResults.find((r) => r.questionId === currentQuestion.id)) {
        // Add current result if not already added
        const correctOptions = currentQuestion.options
          .filter((o) => o.isCorrect)
          .map((o) => o.id);
        const isCorrect =
          selectedOptions.length === correctOptions.length &&
          selectedOptions.every((id) => correctOptions.includes(id));
        allResults.push({
          questionId: currentQuestion.id,
          selectedOptions,
          isCorrect,
          points: currentQuestion.points,
          earnedPoints: isCorrect ? currentQuestion.points : 0,
        });
      }

      const totalEarned = allResults.reduce((sum, r) => sum + r.earnedPoints, 0);
      const score = Math.round((totalEarned / totalPoints) * 100);
      const passed = score >= passingScore;

      setIsComplete(true);
      onComplete(score, passed);
    }
  }, [currentIndex, questions.length, results, currentQuestion, selectedOptions, totalPoints, passingScore, onComplete]);

  // ==========================================================================
  // RESET
  // ==========================================================================

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOptions([]);
    setShowFeedback(false);
    setResults([]);
    setIsComplete(false);
  }, []);

  // ==========================================================================
  // RENDER RESULTS
  // ==========================================================================

  if (isComplete) {
    const totalEarned = results.reduce((sum, r) => sum + r.earnedPoints, 0);
    const score = Math.round((totalEarned / totalPoints) * 100);
    const passed = score >= passingScore;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
        <div className={`inline-flex p-4 rounded-full mb-4 ${
          passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
        }`}>
          {passed ? (
            <Trophy className="w-12 h-12 text-green-600 dark:text-green-400" />
          ) : (
            <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {passed ? t('passed_title') : t('failed_title')}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {passed ? t('passed_message') : t('failed_message')}
        </p>

        <div className="text-4xl font-bold mb-6">
          <span className={passed ? 'text-green-600' : 'text-red-600'}>
            {score}%
          </span>
          <span className="text-gray-400 text-lg ml-2">
            ({t('passing')}: {passingScore}%)
          </span>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {t('correct_answers')}: {results.filter((r) => r.isCorrect).length}/{questions.length}
        </div>

        {!passed && content.allowRetry && currentAttempt < maxAttempts && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {t('retry')} ({maxAttempts - currentAttempt} {t('attempts_remaining')})
          </button>
        )}
      </div>
    );
  }

  // ==========================================================================
  // RENDER QUESTION
  // ==========================================================================

  const options = content.shuffleOptions
    ? [...currentQuestion.options].sort(() => Math.random() - 0.5)
    : currentQuestion.options;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
        <span>{t('question')} {currentIndex + 1}/{questions.length}</span>
        <span>{currentQuestion.points} {t('points')}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="text-lg font-medium mb-6 text-gray-900 dark:text-white">
        {currentQuestion.questionKey}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <OptionButton
            key={option.id}
            option={option}
            isSelected={selectedOptions.includes(option.id)}
            showFeedback={showFeedback}
            questionType={currentQuestion.type}
            onSelect={() => handleOptionSelect(option.id)}
          />
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && currentQuestion.explanationKey && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {currentQuestion.explanationKey}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {showFeedback ? (
          <button
            onClick={goToNext}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentIndex < questions.length - 1 ? t('next') : t('finish')}
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('submit')}
          </button>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// OPTION BUTTON
// =============================================================================

interface OptionButtonProps {
  option: QuizOption;
  isSelected: boolean;
  showFeedback: boolean;
  questionType: QuizQuestion['type'];
  onSelect: () => void;
}

function OptionButton({
  option,
  isSelected,
  showFeedback,
  questionType,
  onSelect,
}: OptionButtonProps) {
  const isCorrect = option.isCorrect;

  let bgColor = 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700';
  let borderColor = 'border-gray-200 dark:border-gray-600';
  let Icon: React.ComponentType<{ className?: string }> | null = null;

  if (isSelected && !showFeedback) {
    bgColor = 'bg-blue-50 dark:bg-blue-900/30';
    borderColor = 'border-blue-500';
  }

  if (showFeedback) {
    if (isCorrect) {
      bgColor = 'bg-green-50 dark:bg-green-900/30';
      borderColor = 'border-green-500';
      Icon = CheckCircle2;
    } else if (isSelected) {
      bgColor = 'bg-red-50 dark:bg-red-900/30';
      borderColor = 'border-red-500';
      Icon = XCircle;
    }
  }

  return (
    <button
      onClick={onSelect}
      disabled={showFeedback}
      className={`
        w-full p-4 rounded-lg border-2 text-left transition-all
        ${bgColor} ${borderColor}
        ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox/Radio indicator */}
        <div className={`
          w-5 h-5 rounded-${questionType === 'multiple' ? 'md' : 'full'} border-2 flex items-center justify-center shrink-0
          ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-500'}
        `}>
          {isSelected && !showFeedback && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>

        {/* Text */}
        <span className="flex-1 text-gray-900 dark:text-white">
          {option.textKey}
        </span>

        {/* Feedback icon */}
        {Icon && (
          <Icon className={`w-5 h-5 ${isCorrect ? 'text-green-600' : 'text-red-600'}`} />
        )}
      </div>

      {/* Option feedback */}
      {showFeedback && isSelected && option.feedbackKey && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-8">
          {option.feedbackKey}
        </p>
      )}
    </button>
  );
}

export default QuizEngine;
