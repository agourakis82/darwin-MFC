'use client';

/**
 * STUDY MODE HUB PAGE
 * ===================
 *
 * Main page for all study features including:
 * - Flashcards with spaced repetition
 * - Quiz sessions
 * - Progress statistics
 * - Weekly activity tracking
 */

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { PageContainer } from '@/app/components/Layout/Containers';
import {
  BookOpen,
  Brain,
  TrendingUp,
  Play,
  Calendar,
  Library,
  Flame,
  Target,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  BookMarked,
  RotateCcw,
  Download,
  Zap,
  GraduationCap,
} from 'lucide-react';
import FlashcardDeck from '@/app/components/Study/FlashcardDeck';
import QuizPlayer from '@/app/components/Study/QuizPlayer';
import ExportButtons from '@/app/components/Study/ExportButtons';
import StudyStats from '@/app/components/Study/StudyStats';
import { Flashcard, Quiz, QuizAttempt } from '@/lib/types/study-mode';
import { todosCasosClinicos } from '@/lib/data/casos-clinicos';
import { doencasConsolidadas } from '@/lib/data/doencas/index';
import { useStudyStore } from '@/lib/store/studyStore';
import { calculateReviewStats } from '@/lib/utils/spaced-repetition';

type ViewMode = 'hub' | 'flashcards' | 'quiz';

export default function EstudoPage() {
  const t = useTranslations('learning');
  const [viewMode, setViewMode] = useState<ViewMode>('hub');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [flashcardMode, setFlashcardMode] = useState<'all' | 'due' | 'new'>('due');
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering for localStorage access
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    flashcardSchedules,
    flashcardProgress,
    quizProgress,
    streak,
    recordQuizAttempt,
  } = useStudyStore();

  // Generate flashcards from clinical cases
  const generateFlashcardsFromCasos = (): Flashcard[] => {
    const cards: Flashcard[] = [];

    todosCasosClinicos.forEach(caso => {
      const dificuldadeMap: Record<string, 'facil' | 'medio' | 'dificil'> = {
        'iniciante': 'facil',
        'intermediario': 'medio',
        'avancado': 'dificil',
      };
      const dificuldade = dificuldadeMap[caso.dificuldade] || 'medio';

      cards.push({
        id: `caso-${caso.id}-diagnostico`,
        front: `Qual o diagnostico provavel para: ${caso.apresentacao.paciente.nome} (${caso.apresentacao.paciente.idade} anos)?`,
        back: caso.desfecho.diagnosticoFinal,
        categoria: 'caso_clinico',
        tags: [caso.categoria],
        dificuldade,
        fonteId: caso.id,
        masteryLevel: 0,
      });

      cards.push({
        id: `caso-${caso.id}-tratamento`,
        front: `Qual o tratamento de primeira linha para ${caso.titulo}?`,
        back: caso.desfecho.tratamentoRealizado,
        categoria: 'caso_clinico',
        tags: [caso.categoria],
        dificuldade,
        fonteId: caso.id,
        masteryLevel: 0,
      });
    });

    return cards;
  };

  // Generate flashcards from diseases
  const generateFlashcardsFromDoencas = (): Flashcard[] => {
    const cards: Flashcard[] = [];

    doencasConsolidadas.slice(0, 30).forEach(doenca => {
      if (!doenca.titulo || !doenca.quickView) return;

      cards.push({
        id: `doenca-${doenca.id}-definicao`,
        front: `O que e ${doenca.titulo}?`,
        back: doenca.quickView.definicao,
        categoria: 'doenca',
        tags: [doenca.categoria || 'outros'],
        dificuldade: 'medio',
        fonteId: doenca.id,
        masteryLevel: 0,
      });

      if (doenca.quickView.criteriosDiagnosticos && doenca.quickView.criteriosDiagnosticos.length > 0) {
        cards.push({
          id: `doenca-${doenca.id}-criterios`,
          front: `Quais os criterios diagnosticos principais de ${doenca.titulo}?`,
          back: doenca.quickView.criteriosDiagnosticos.join(' | '),
          categoria: 'doenca',
          tags: [doenca.categoria || 'outros'],
          dificuldade: 'medio',
          fonteId: doenca.id,
          masteryLevel: 0,
        });
      }

      if (doenca.quickView.redFlags && doenca.quickView.redFlags.length > 0) {
        cards.push({
          id: `doenca-${doenca.id}-alertas`,
          front: `Quais os sinais de alarme (red flags) de ${doenca.titulo}?`,
          back: doenca.quickView.redFlags.join(' | '),
          categoria: 'doenca',
          tags: [doenca.categoria || 'outros'],
          dificuldade: 'dificil',
          fonteId: doenca.id,
          masteryLevel: 0,
        });
      }
    });

    return cards;
  };

  // Generate quiz from clinical cases
  const generateQuizFromCasos = (numQuestions: number = 10): Quiz => {
    const questoes = todosCasosClinicos.flatMap(caso =>
      caso.etapas
        .filter(e => e.pergunta)
        .map((etapa, idx) => ({
          id: `${caso.id}-etapa-${idx}`,
          tipo: 'multipla_escolha' as const,
          enunciado: etapa.pergunta!.enunciado,
          opcoes: etapa.pergunta!.opcoes?.map(op => ({
            id: op.id,
            texto: op.texto,
            correta: op.correta
          })),
          respostaCorreta: etapa.pergunta!.respostaCorreta,
          explicacao: etapa.pergunta!.explicacao,
          pontos: etapa.pergunta!.pontos || 10,
          categoria: caso.categoria,
          tags: [caso.categoria],
        }))
    );

    // Shuffle and limit questions
    const shuffledQuestions = questoes.sort(() => Math.random() - 0.5).slice(0, numQuestions);

    return {
      id: `quiz-rapido-${Date.now()}`,
      titulo: 'Quiz Rapido',
      descricao: 'Teste seus conhecimentos sobre casos clinicos da APS',
      questoes: shuffledQuestions,
      categoria: 'casos_clinicos',
      dificuldade: 'medio',
      pontuacaoMaxima: shuffledQuestions.reduce((acc, q) => acc + q.pontos, 0),
    };
  };

  // Get all generated flashcards
  const allFlashcards = useMemo(() => {
    const casoCards = generateFlashcardsFromCasos();
    const doencaCards = generateFlashcardsFromDoencas();
    return [...casoCards, ...doencaCards];
  }, []);

  // Calculate review stats
  const reviewStats = useMemo(() => {
    const schedules = Object.values(flashcardSchedules);
    return calculateReviewStats(schedules);
  }, [flashcardSchedules]);

  // Cards due count
  const cardsDue = reviewStats.dueToday + reviewStats.overdue;

  // Quiz completion count
  const quizzesCompleted = Object.values(quizProgress).reduce(
    (acc, p) => acc + p.attempts.length,
    0
  );

  // Handle starting flashcard session
  const handleStartFlashcards = (mode: 'all' | 'due' | 'new' = 'due') => {
    setFlashcardMode(mode);
    setFlashcards(allFlashcards);
    setViewMode('flashcards');
  };

  // Handle starting quiz session
  const handleStartQuiz = (numQuestions: number = 10) => {
    const quiz = generateQuizFromCasos(numQuestions);
    setCurrentQuiz(quiz);
    setViewMode('quiz');
  };

  // Handle quiz completion
  const handleQuizComplete = (attempt: QuizAttempt) => {
    recordQuizAttempt(attempt.quizId, attempt);
  };

  // Handle returning to hub
  const handleBackToHub = () => {
    setViewMode('hub');
    setCurrentQuiz(null);
  };

  // Flashcard View
  if (viewMode === 'flashcards') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Flashcard Session
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Spaced repetition system - {flashcardMode === 'due' ? 'Review due cards' : flashcardMode === 'new' ? 'Learn new cards' : 'All cards'}
              </p>
            </div>
            <button
              onClick={handleBackToHub}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Back to Study Hub
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FlashcardDeck flashcards={flashcards} mode={flashcardMode} />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export to Anki
                </h2>
                <ExportButtons flashcards={flashcards} schedules={flashcardSchedules} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz View
  if (viewMode === 'quiz' && currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {currentQuiz.titulo}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {currentQuiz.descricao}
              </p>
            </div>
            <button
              onClick={handleBackToHub}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Exit Quiz
            </button>
          </div>
          <QuizPlayer
            quiz={currentQuiz}
            onComplete={handleQuizComplete}
            adaptive={true}
          />
        </div>
      </div>
    );
  }

  // Hub View (Main Page)
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
        <PageContainer className="py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Study Mode</h1>
              <p className="text-indigo-100">Learn and review with flashcards and quizzes</p>
            </div>
          </div>

          {/* Quick Stats */}
          {isClient && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Calendar className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-2xl font-bold">{cardsDue}</div>
                <div className="text-sm text-indigo-100">Cards Due Today</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BookOpen className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-2xl font-bold">{allFlashcards.length}</div>
                <div className="text-sm text-indigo-100">Total Cards</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Flame className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-sm text-indigo-100">Day Streak</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Award className="w-6 h-6 mb-2 opacity-80" />
                <div className="text-2xl font-bold">{quizzesCompleted}</div>
                <div className="text-sm text-indigo-100">Quizzes Completed</div>
              </div>
            </div>
          )}
        </PageContainer>
      </div>

      <PageContainer className="py-8">
        {/* Empty State */}
        {!isClient ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-slate-400">Loading...</div>
          </div>
        ) : allFlashcards.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              No Study Cards Available
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              Study cards are generated from clinical cases and diseases.
              Explore the platform to unlock more study content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/casos-clinicos"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Explore Clinical Cases
              </Link>
              <Link
                href="/doencas"
                className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Browse Diseases
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Quick Actions
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Start Review Session */}
                  <button
                    onClick={() => handleStartFlashcards('due')}
                    className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all"
                  >
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5" />
                        </div>
                        {cardsDue > 0 && (
                          <span className="px-2 py-0.5 bg-orange-500 text-xs font-bold rounded-full">
                            {cardsDue} due
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-1">Start Review Session</h3>
                      <p className="text-sm text-blue-100">
                        Review your due flashcards with spaced repetition
                      </p>
                      <ArrowRight className="w-5 h-5 mt-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  {/* Quick Quiz */}
                  <button
                    onClick={() => handleStartQuiz(10)}
                    className="group relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all"
                  >
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Brain className="w-5 h-5" />
                        </div>
                        <span className="px-2 py-0.5 bg-white/20 text-xs font-bold rounded-full">
                          10 questions
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">Quick Quiz</h3>
                      <p className="text-sm text-emerald-100">
                        Test your knowledge with a quick 10-question quiz
                      </p>
                      <ArrowRight className="w-5 h-5 mt-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </section>

              {/* Flashcard Options */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Flashcards
                </h2>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleStartFlashcards('due')}
                      className="flex flex-col items-center p-4 rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                    >
                      <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                      <span className="font-medium text-slate-900 dark:text-white">Due Today</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {cardsDue} cards
                      </span>
                    </button>

                    <button
                      onClick={() => handleStartFlashcards('new')}
                      className="flex flex-col items-center p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                    >
                      <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-2" />
                      <span className="font-medium text-slate-900 dark:text-white">Learn New</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {allFlashcards.length - Object.keys(flashcardProgress).length} cards
                      </span>
                    </button>

                    <button
                      onClick={() => handleStartFlashcards('all')}
                      className="flex flex-col items-center p-4 rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
                    >
                      <Library className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                      <span className="font-medium text-slate-900 dark:text-white">Browse All</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {allFlashcards.length} cards
                      </span>
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>
                      Powered by SM-2 spaced repetition algorithm
                    </span>
                    <Link
                      href="/estudo/biblioteca"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      Card Library <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>

              {/* Quiz Options */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-emerald-500" />
                  Quizzes
                </h2>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleStartQuiz(5)}
                      className="flex flex-col items-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                    >
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">5</div>
                      <span className="font-medium text-slate-900 dark:text-white">Quick Quiz</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">~3 min</span>
                    </button>

                    <button
                      onClick={() => handleStartQuiz(10)}
                      className="flex flex-col items-center p-4 rounded-xl border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 hover:border-emerald-500 transition-all"
                    >
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">10</div>
                      <span className="font-medium text-slate-900 dark:text-white">Standard Quiz</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">~7 min</span>
                    </button>

                    <button
                      onClick={() => handleStartQuiz(20)}
                      className="flex flex-col items-center p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                    >
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">20</div>
                      <span className="font-medium text-slate-900 dark:text-white">Full Quiz</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">~15 min</span>
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>
                      Adaptive difficulty based on your performance
                    </span>
                    <Link
                      href="/estudo/quiz"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      Quiz History <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar - Stats */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <StudyStats totalFlashcards={allFlashcards.length} />

                {/* Study Tips */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800/50">
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Study Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">1.</span>
                      Review your due cards daily to maintain your streak
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">2.</span>
                      Be honest with difficulty ratings for better scheduling
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">3.</span>
                      Take quizzes to test your recall without hints
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">4.</span>
                      Export to Anki for mobile studying
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
