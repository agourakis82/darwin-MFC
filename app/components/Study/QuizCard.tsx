'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { QuizQuestion, OpcaoQuiz } from '@/lib/types/study-mode';
import { GeneratedQuestion } from '@/lib/study/quiz-generator';

interface QuizCardProps {
  question: QuizQuestion | GeneratedQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerId: string, isCorrect: boolean, timeSpent: number) => void;
  showImmediateFeedback?: boolean;
  timed?: boolean;
  timeLimit?: number; // in seconds
}

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showImmediateFeedback = true,
  timed = false,
  timeLimit = 60,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!timed) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timed]);

  // Auto-submit when time is up
  useEffect(() => {
    if (isTimeUp && !hasSubmitted) {
      handleSubmit();
    }
  }, [isTimeUp]);

  const isCorrect = (answerId: string): boolean => {
    if (Array.isArray(question.respostaCorreta)) {
      return question.respostaCorreta.includes(answerId);
    }
    return answerId === question.respostaCorreta;
  };

  const handleSubmit = () => {
    if (hasSubmitted) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const answerId = selectedAnswer || '';
    const correct = selectedAnswer ? isCorrect(selectedAnswer) : false;

    setHasSubmitted(true);

    if (showImmediateFeedback) {
      setShowExplanation(true);
    } else {
      onAnswer(answerId, correct, timeSpent);
    }
  };

  const handleContinue = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const answerId = selectedAnswer || '';
    const correct = selectedAnswer ? isCorrect(selectedAnswer) : false;
    onAnswer(answerId, correct, timeSpent);
  };

  const getOptionStyle = (option: OpcaoQuiz) => {
    if (!hasSubmitted) {
      return selectedAnswer === option.id
        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 ring-2 ring-emerald-500'
        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700';
    }

    // After submission
    if (option.correta) {
      return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30';
    }
    if (selectedAnswer === option.id && !option.correta) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/30';
    }
    return 'border-slate-200 dark:border-slate-700 opacity-50';
  };

  const getOptionIcon = (option: OpcaoQuiz) => {
    if (!hasSubmitted) return null;

    if (option.correta) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
    if (selectedAnswer === option.id && !option.correta) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    return null;
  };

  const getDifficultyBadge = () => {
    const q = question as GeneratedQuestion;
    if (!q.difficulty) return null;

    const difficultyStyles = {
      easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    const difficultyLabels = {
      easy: 'Facil',
      medium: 'Medio',
      hard: 'Dificil',
    };

    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyStyles[q.difficulty]}`}>
        {difficultyLabels[q.difficulty]}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
              {questionNumber}/{totalQuestions}
            </span>
            <span className="text-white/80 text-sm">
              {question.pontos} pts
            </span>
            {getDifficultyBadge()}
          </div>
          {timed && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              timeRemaining <= 10
                ? 'bg-red-500/20 text-red-200'
                : 'bg-white/20 text-white'
            }`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {question.enunciado}
            </h2>
          </div>

          {question.tempoEstimado && !timed && (
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Tempo estimado: {question.tempoEstimado}s</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.opcoes?.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !hasSubmitted && setSelectedAnswer(option.id)}
              disabled={hasSubmitted}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${getOptionStyle(option)} ${
                !hasSubmitted ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  hasSubmitted && option.correta
                    ? 'bg-emerald-500 text-white'
                    : hasSubmitted && selectedAnswer === option.id && !option.correta
                    ? 'bg-red-500 text-white'
                    : selectedAnswer === option.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={`flex-1 ${
                  hasSubmitted && option.correta
                    ? 'text-emerald-700 dark:text-emerald-300 font-medium'
                    : hasSubmitted && selectedAnswer === option.id && !option.correta
                    ? 'text-red-700 dark:text-red-300'
                    : 'text-slate-700 dark:text-slate-200'
                }`}>
                  {option.texto}
                </span>
                {getOptionIcon(option)}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Feedback Section */}
        <AnimatePresence>
          {hasSubmitted && showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className={`p-4 rounded-xl ${
                selectedAnswer && isCorrect(selectedAnswer)
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswer && isCorrect(selectedAnswer) ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        Correto!
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="font-semibold text-red-700 dark:text-red-400">
                        {!selectedAnswer ? 'Tempo esgotado!' : 'Incorreto'}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {question.explicacao}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer && !isTimeUp}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
            >
              Confirmar
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : showImmediateFeedback ? (
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
            >
              {questionNumber < totalQuestions ? 'Proxima' : 'Finalizar'}
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-100 dark:bg-slate-700">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
