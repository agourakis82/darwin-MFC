'use client';

/**
 * QUIZ SESSION PAGE - DARWIN-MFC
 * ==============================
 *
 * Dedicated quiz session page with:
 * - Quiz configuration (difficulty, category, question count)
 * - Real-time score tracking and timer
 * - One question at a time display
 * - Results summary with detailed breakdown
 * - Support for dark mode
 */

import { useState, useMemo, useEffect } from 'react';
import { ContentContainer, PageContainer } from '@/app/components/Layout/Containers';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Clock,
  Award,
  Brain,
  RotateCcw,
  Home,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Zap,
  BarChart3,
} from 'lucide-react';
import QuizPlayer from '@/app/components/Study/QuizPlayer';
import {
  generateQuiz,
  QuizConfig,
  saveQuizHistory,
  QuizHistoryEntry,
} from '@/lib/study/quiz-generator';
import { Quiz, QuizAttempt } from '@/lib/types/study-mode';
import { doencasConsolidadas } from '@/lib/data/doencas/index';
import { medicamentosConsolidados } from '@/lib/data/medicamentos/index';
import { useStudyStore } from '@/lib/store/studyStore';

type PageView = 'config' | 'session' | 'history';

export default function QuizSessionPage() {
  const t = useTranslations('learning');
  const [pageView, setPageView] = useState<PageView>('config');
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizConfig, setQuizConfig] = useState<QuizConfig>({
    numQuestions: 10,
    category: 'mixed',
    difficulty: 'medium',
    timed: false,
    timePerQuestion: 30,
  });
  const [isClient, setIsClient] = useState(false);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryEntry[]>([]);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { recordQuizAttempt } = useStudyStore();

  // Generate quiz based on config
  const handleStartQuiz = () => {
    const quiz = generateQuiz(
      quizConfig,
      doencasConsolidadas,
      medicamentosConsolidados
    );

    if (quiz.questoes.length === 0) {
      alert('Unable to generate quiz. Please check your data source.');
      return;
    }

    setCurrentQuiz(quiz);
    setPageView('session');
  };

  // Handle quiz completion
  const handleQuizComplete = (attempt: QuizAttempt) => {
    recordQuizAttempt(attempt.quizId, attempt);

    // Create history entry
    const categoryBreakdown = attempt.respostas.reduce(
      (acc, r) => {
        const existing = acc.find(
          (c) =>
            c.category ===
            (currentQuiz?.questoes.find((q) => q.id === r.questaoId)
              ?.categoria || 'unknown')
        );
        if (existing) {
          existing.correct += r.correta ? 1 : 0;
          existing.total += 1;
        } else {
          acc.push({
            category:
              currentQuiz?.questoes.find((q) => q.id === r.questaoId)
                ?.categoria || 'unknown',
            correct: r.correta ? 1 : 0,
            total: 1,
          });
        }
        return acc;
      },
      [] as { category: string; correct: number; total: number }[]
    );

    const incorrectQuestions = attempt.respostas
      .filter((r) => !r.correta)
      .map((r) => {
        const question = currentQuiz?.questoes.find((q) => q.id === r.questaoId);
        const correctAnswer = question?.opcoes?.find(
          (o) => o.id === question.respostaCorreta
        );
        return {
          questionId: r.questaoId,
          question: question?.enunciado || '',
          userAnswer:
            question?.opcoes?.find((o) => o.id === r.resposta)?.texto || '',
          correctAnswer: correctAnswer?.texto || '',
          explanation: question?.explicacao || '',
        };
      });

    const historyEntry: QuizHistoryEntry = {
      quizId: attempt.quizId,
      timestamp: Date.now(),
      config: quizConfig,
      score: attempt.pontuacao,
      maxScore: currentQuiz?.pontuacaoMaxima || 0,
      percentage: attempt.porcentagemAcerto,
      correctAnswers: attempt.respostas.filter((r) => r.correta).length,
      totalQuestions: attempt.respostas.length,
      timeSpent: attempt.tempoUtilizado,
      categoryBreakdown,
      incorrectQuestions,
    };

    saveQuizHistory(historyEntry);
    setQuizHistory([historyEntry, ...quizHistory]);
  };

  // Handle retaking quiz
  const handleRetakeQuiz = () => {
    setCurrentQuiz(null);
    setPageView('config');
  };

  // Render configuration view
  if (pageView === 'config' && isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 p-4 md:p-8">
        <ContentContainer>
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/estudo"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              <Home className="w-4 h-4" />
              Back to Study Hub
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Quiz Configuration
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Customize your quiz to match your learning goals
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                Quiz Settings
              </h2>

              {/* Number of Questions */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">
                  Number of Questions
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[10, 20, 30].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        setQuizConfig({
                          ...quizConfig,
                          numQuestions: num as 10 | 20 | 30,
                        })
                      }
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        quizConfig.numQuestions === num
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {quizConfig.numQuestions === 10 && '~5 minutes'}
                  {quizConfig.numQuestions === 20 && '~10 minutes'}
                  {quizConfig.numQuestions === 30 && '~15 minutes'}
                </p>
              </div>

              {/* Category */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">
                  Category
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'diseases', label: 'Diseases' },
                    { value: 'medications', label: 'Medications' },
                    { value: 'mixed', label: 'Mixed (Diseases + Medications)' },
                  ].map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() =>
                        setQuizConfig({
                          ...quizConfig,
                          category: cat.value as 'diseases' | 'medications' | 'mixed',
                        })
                      }
                      className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all ${
                        quizConfig.category === cat.value
                          ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-600 text-blue-900 dark:text-blue-100'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">
                  Difficulty
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'easy', label: 'Easy', desc: 'Definitions, basics' },
                    { value: 'medium', label: 'Medium', desc: 'Clinical criteria, treatments' },
                    { value: 'hard', label: 'Hard', desc: 'Advanced, differential diagnosis' },
                    { value: 'mixed', label: 'Mixed', desc: 'Random difficulty' },
                  ].map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() =>
                        setQuizConfig({
                          ...quizConfig,
                          difficulty: diff.value as 'easy' | 'medium' | 'hard' | 'mixed',
                        })
                      }
                      className={`w-full text-left py-3 px-4 rounded-lg transition-all ${
                        quizConfig.difficulty === diff.value
                          ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-600'
                          : 'bg-slate-100 dark:bg-slate-700 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="font-medium text-slate-900 dark:text-white">
                        {diff.label}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {diff.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartQuiz}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Start Quiz
              </button>
            </div>

            {/* Quick Start Cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Quick Start
              </h2>

              {/* Quick Start 1 */}
              <button
                onClick={() => {
                  setQuizConfig({
                    numQuestions: 10,
                    category: 'mixed',
                    difficulty: 'easy',
                    timed: false,
                  });
                }}
                className="w-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800 hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Beginner
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      10 easy questions
                    </p>
                  </div>
                </div>
              </button>

              {/* Quick Start 2 */}
              <button
                onClick={() => {
                  setQuizConfig({
                    numQuestions: 20,
                    category: 'mixed',
                    difficulty: 'medium',
                    timed: false,
                  });
                }}
                className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Intermediate
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      20 medium questions
                    </p>
                  </div>
                </div>
              </button>

              {/* Quick Start 3 */}
              <button
                onClick={() => {
                  setQuizConfig({
                    numQuestions: 30,
                    category: 'mixed',
                    difficulty: 'hard',
                    timed: false,
                  });
                }}
                className="w-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Advanced
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      30 hard questions
                    </p>
                  </div>
                </div>
              </button>

              {/* Tips Section */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 mt-6">
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Pro Tips
                </h3>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                  <li>• Start with easy questions to build confidence</li>
                  <li>• Medium difficulty covers most clinical scenarios</li>
                  <li>• Hard questions prepare for advanced certifications</li>
                  <li>• Mix categories to test broad knowledge</li>
                </ul>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    );
  }

  // Render quiz session
  if (pageView === 'session' && currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 p-4 md:p-8">
        <PageContainer>
          {/* Header */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {currentQuiz.titulo}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {currentQuiz.descricao}
              </p>
            </div>
            <Link
              href="/estudo"
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Exit
            </Link>
          </div>

          {/* Quiz Player */}
          <QuizPlayer
            quiz={currentQuiz}
            onComplete={handleQuizComplete}
            adaptive={true}
          />
        </PageContainer>
      </div>
    );
  }

  // Render loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 p-4 md:p-8 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Loading quiz...</p>
      </div>
    </div>
  );
}
