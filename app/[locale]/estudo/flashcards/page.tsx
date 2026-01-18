'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Layers,
  Timer,
  Trophy,
  TrendingUp,
  CalendarDays,
  RotateCcw,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import Flashcard from '@/app/components/Study/Flashcard';
import { Flashcard as FlashcardType } from '@/lib/types/study-mode';
import {
  ReviewSchedule,
  Quality,
  calculateNextInterval,
  initializeSchedule
} from '@/lib/utils/spaced-repetition';

// =============================================================================
// TYPES
// =============================================================================

interface StoredCard {
  card: FlashcardType;
  schedule: ReviewSchedule;
}

interface SessionStats {
  cardsReviewed: number;
  correctCount: number;
  incorrectCount: number;
  totalEaseFactorChange: number;
  startTime: number;
}

type SessionState = 'loading' | 'empty' | 'studying' | 'completed' | 'error';

// =============================================================================
// STORAGE KEY
// =============================================================================

const STORAGE_KEY = 'darwin-study-cards';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getStoredCards(): StoredCard[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    // Restore dates from ISO strings
    return parsed.map((item: any) => ({
      card: item.card,
      schedule: {
        ...item.schedule,
        nextReview: new Date(item.schedule.nextReview),
        lastReviewed: item.schedule.lastReviewed ? new Date(item.schedule.lastReviewed) : undefined,
      }
    }));
  } catch (error) {
    console.error('Error loading cards from localStorage:', error);
    return [];
  }
}

function saveStoredCards(cards: StoredCard[]): void {
  if (typeof window === 'undefined') return;

  try {
    const serialized = cards.map(item => ({
      card: item.card,
      schedule: {
        ...item.schedule,
        nextReview: item.schedule.nextReview.toISOString(),
        lastReviewed: item.schedule.lastReviewed?.toISOString() || null,
      }
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    console.error('Error saving cards to localStorage:', error);
  }
}

function getCardsDueForReview(cards: StoredCard[]): StoredCard[] {
  const now = new Date();

  return cards.filter(item => {
    const reviewDate = new Date(item.schedule.nextReview);
    return reviewDate <= now;
  }).sort((a, b) => {
    // Sort by overdue first (oldest), then by ease factor (harder cards first)
    const aOverdue = now.getTime() - new Date(a.schedule.nextReview).getTime();
    const bOverdue = now.getTime() - new Date(b.schedule.nextReview).getTime();

    if (aOverdue !== bOverdue) {
      return bOverdue - aOverdue; // Most overdue first
    }

    return a.schedule.easeFactor - b.schedule.easeFactor; // Lower ease factor first
  });
}

function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Amanha';
  if (diffDays < 7) return `Em ${diffDays} dias`;
  if (diffDays < 30) return `Em ${Math.ceil(diffDays / 7)} semanas`;
  return `Em ${Math.ceil(diffDays / 30)} meses`;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function FlashcardsStudyPage() {
  const router = useRouter();

  // State
  const [sessionState, setSessionState] = useState<SessionState>('loading');
  const [allCards, setAllCards] = useState<StoredCard[]>([]);
  const [dueCards, setDueCards] = useState<StoredCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    cardsReviewed: 0,
    correctCount: 0,
    incorrectCount: 0,
    totalEaseFactorChange: 0,
    startTime: Date.now(),
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [reviewedInSession, setReviewedInSession] = useState<Set<string>>(new Set());
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Current card
  const currentCard = useMemo(() => {
    return dueCards[currentIndex] || null;
  }, [dueCards, currentIndex]);

  // Load cards on mount
  useEffect(() => {
    try {
      const cards = getStoredCards();
      setAllCards(cards);

      if (cards.length === 0) {
        setSessionState('empty');
        return;
      }

      const due = getCardsDueForReview(cards);
      setDueCards(due);

      if (due.length === 0) {
        setSessionState('empty');
      } else {
        setSessionState('studying');
        setSessionStats(prev => ({ ...prev, startTime: Date.now() }));
      }
    } catch (error) {
      console.error('Error initializing study session:', error);
      setErrorMessage('Erro ao carregar os cards. Por favor, tente novamente.');
      setSessionState('error');
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (sessionState !== 'studying') return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - sessionStats.startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionState, sessionStats.startTime]);

  // Handle response (quality rating)
  const handleResponse = useCallback((quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    if (!currentCard) return;

    const oldEaseFactor = currentCard.schedule.easeFactor;
    const newSchedule = calculateNextInterval(currentCard.schedule, quality as Quality);
    const easeFactorChange = newSchedule.easeFactor - oldEaseFactor;

    // Update the card in allCards
    const updatedAllCards = allCards.map(item => {
      if (item.card.id === currentCard.card.id) {
        return {
          ...item,
          schedule: newSchedule,
        };
      }
      return item;
    });

    setAllCards(updatedAllCards);
    saveStoredCards(updatedAllCards);

    // Update session stats
    const isCorrect = quality >= 3;
    setSessionStats(prev => ({
      ...prev,
      cardsReviewed: prev.cardsReviewed + 1,
      correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
      incorrectCount: !isCorrect ? prev.incorrectCount + 1 : prev.incorrectCount,
      totalEaseFactorChange: prev.totalEaseFactorChange + easeFactorChange,
    }));

    // Track reviewed cards
    setReviewedInSession(prev => new Set([...prev, currentCard.card.id]));

    // Move to next card
    handleNext();
  }, [currentCard, allCards]);

  // Handle next card
  const handleNext = useCallback(() => {
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setSessionState('completed');
    }
  }, [currentIndex, dueCards.length]);

  // Handle flip card
  const handleFlip = useCallback(() => {
    setShowAnswer(prev => !prev);
  }, []);

  // Handle end session early
  const handleEndSession = useCallback(() => {
    if (sessionStats.cardsReviewed > 0) {
      setSessionState('completed');
    } else {
      router.push('/estudo');
    }
  }, [sessionStats.cardsReviewed, router]);

  // Handle restart session
  const handleRestartSession = useCallback(() => {
    const due = getCardsDueForReview(allCards);

    if (due.length === 0) {
      setSessionState('empty');
    } else {
      setDueCards(due);
      setCurrentIndex(0);
      setSessionStats({
        cardsReviewed: 0,
        correctCount: 0,
        incorrectCount: 0,
        totalEaseFactorChange: 0,
        startTime: Date.now(),
      });
      setReviewedInSession(new Set());
      setElapsedTime(0);
      setSessionState('studying');
    }
  }, [allCards]);

  // Calculate next review dates for summary
  const nextReviewDates = useMemo(() => {
    if (sessionState !== 'completed') return [];

    const reviewedCards = allCards.filter(item => reviewedInSession.has(item.card.id));

    return reviewedCards
      .map(item => ({
        cardId: item.card.id,
        cardFront: item.card.front.slice(0, 50) + (item.card.front.length > 50 ? '...' : ''),
        nextReview: item.schedule.nextReview,
        interval: item.schedule.interval,
      }))
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime());
  }, [allCards, reviewedInSession, sessionState]);

  // =============================================================================
  // RENDER: Loading State
  // =============================================================================

  if (sessionState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Carregando cards...</p>
        </div>
      </div>
    );
  }

  // =============================================================================
  // RENDER: Error State
  // =============================================================================

  if (sessionState === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Erro ao carregar
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {errorMessage || 'Ocorreu um erro inesperado. Por favor, tente novamente.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/estudo')}
              className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =============================================================================
  // RENDER: Empty State
  // =============================================================================

  if (sessionState === 'empty') {
    const nextDueCard = allCards.length > 0
      ? allCards.reduce((earliest, current) =>
          new Date(current.schedule.nextReview) < new Date(earliest.schedule.nextReview) ? current : earliest
        )
      : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>

          {allCards.length === 0 ? (
            <>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Nenhum card encontrado
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Voce ainda nao criou nenhum flashcard. Comece adicionando cards para estudar!
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Nenhum card para revisar
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Excelente! Voce esta em dia com suas revisoes.
              </p>
              {nextDueCard && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
                    <CalendarDays className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Proxima revisao: {formatRelativeDate(new Date(nextDueCard.schedule.nextReview))}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push('/estudo')}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" />
                Ir para Modo Estudo
              </span>
            </button>
            <button
              onClick={() => router.back()}
              className="w-full px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =============================================================================
  // RENDER: Completed State (Session Summary)
  // =============================================================================

  if (sessionState === 'completed') {
    const accuracy = sessionStats.cardsReviewed > 0
      ? Math.round((sessionStats.correctCount / sessionStats.cardsReviewed) * 100)
      : 0;

    const avgEaseChange = sessionStats.cardsReviewed > 0
      ? (sessionStats.totalEaseFactorChange / sessionStats.cardsReviewed).toFixed(2)
      : '0.00';

    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Sessao Concluida!
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Otimo trabalho! Aqui esta o resumo da sua sessao de estudo.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <Layers className="w-5 h-5" />
                <span className="text-xs font-medium uppercase">Cards</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {sessionStats.cardsReviewed}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-emerald-500 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-xs font-medium uppercase">Corretos</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {sessionStats.correctCount}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <XCircle className="w-5 h-5" />
                <span className="text-xs font-medium uppercase">Incorretos</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {sessionStats.incorrectCount}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-purple-500 mb-2">
                <Timer className="w-5 h-5" />
                <span className="text-xs font-medium uppercase">Tempo</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatDuration(elapsedTime)}
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Estatisticas Detalhadas
            </h2>

            <div className="space-y-4">
              {/* Accuracy */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Taxa de acerto</span>
                  <span className="font-medium text-slate-900 dark:text-white">{accuracy}%</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>

              {/* Average Ease Factor Change */}
              <div className="flex justify-between items-center py-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Mudanca media no fator de facilidade</span>
                <span className={`font-medium ${
                  parseFloat(avgEaseChange) > 0
                    ? 'text-emerald-500'
                    : parseFloat(avgEaseChange) < 0
                      ? 'text-red-500'
                      : 'text-slate-500'
                }`}>
                  {parseFloat(avgEaseChange) > 0 ? '+' : ''}{avgEaseChange}
                </span>
              </div>

              {/* Cards per minute */}
              <div className="flex justify-between items-center py-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Cards por minuto</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {elapsedTime > 0
                    ? (sessionStats.cardsReviewed / (elapsedTime / 60000)).toFixed(1)
                    : '0'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Next Review Dates */}
          {nextReviewDates.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                Proximas Revisoes
              </h2>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {nextReviewDates.slice(0, 10).map((item, idx) => (
                  <div
                    key={item.cardId}
                    className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-300 truncate flex-1 mr-4">
                      {item.cardFront}
                    </span>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {formatRelativeDate(item.nextReview)} ({item.interval}d)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRestartSession}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <RotateCcw className="w-5 h-5" />
                Nova Sessao
              </span>
            </button>

            <button
              onClick={() => router.push('/estudo')}
              className="flex-1 px-6 py-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Voltar ao Menu
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =============================================================================
  // RENDER: Studying State
  // =============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 dark:from-neutral-950 dark:to-neutral-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Session Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Left: Back button and progress */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleEndSession}
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              title="Encerrar sessao"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Sessao de Estudo
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Layers className="w-4 h-4" />
                  Card {currentIndex + 1} de {dueCards.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Timer and End button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="font-mono text-slate-900 dark:text-white">
                {formatDuration(elapsedTime)}
              </span>
            </div>

            <button
              onClick={handleEndSession}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors font-medium text-sm"
            >
              Encerrar
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / dueCards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-700 dark:text-slate-300">
              {sessionStats.correctCount} corretos
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-slate-700 dark:text-slate-300">
              {sessionStats.incorrectCount} incorretos
            </span>
          </div>
        </div>

        {/* Flashcard */}
        {currentCard && (
          <Flashcard
            front={currentCard.card.front}
            back={currentCard.card.back}
            onResponse={handleResponse}
            showAnswer={showAnswer}
            onFlip={handleFlip}
          />
        )}

        {/* Keyboard shortcuts hint */}
        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
          Clique no card para virar. Escolha a qualidade da sua resposta.
        </div>
      </div>
    </div>
  );
}
