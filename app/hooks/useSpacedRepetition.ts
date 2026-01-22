'use client';

import { useState, useCallback, useMemo } from 'react';

export type Quality = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * SM-2 Algorithm Parameters
 * Based on the SuperMemo 2 algorithm for optimal spaced repetition
 */
const SM2_PARAMS = {
  INITIAL_INTERVAL: 1, // days
  INITIAL_EASE_FACTOR: 2.5,
  MIN_EASE_FACTOR: 1.3,
};

/**
 * Flashcard data with spaced repetition metrics
 */
export interface SpacedRepetitionCard {
  id: string;
  front: string;
  back: string;
  interval: number; // days until next review
  easeFactor: number; // SM-2 ease factor
  repetitions: number;
  nextReview: Date;
  lastReview?: Date;
}

/**
 * Hook for managing spaced repetition learning
 * Uses SM-2 algorithm (SuperMemo 2) for optimal review scheduling
 */
export function useSpacedRepetition(initialCards: SpacedRepetitionCard[] = []) {
  const [cards, setCards] = useState<SpacedRepetitionCard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<Array<{ cardId: string; quality: Quality; timestamp: Date }>>([]);

  /**
   * Cards due for review (sorted by review date)
   */
  const dueCards = useMemo(() => {
    const now = new Date();
    return cards
      .filter(card => new Date(card.nextReview) <= now)
      .sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime());
  }, [cards]);

  /**
   * Current card being reviewed
   */
  const currentCard = useMemo(() => {
    return dueCards[currentIndex] || null;
  }, [dueCards, currentIndex]);

  /**
   * Calculate next review date using SM-2 algorithm
   */
  const calculateNextReview = useCallback(
    (card: SpacedRepetitionCard, quality: Quality): SpacedRepetitionCard => {
      let newEaseFactor = card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      newEaseFactor = Math.max(SM2_PARAMS.MIN_EASE_FACTOR, newEaseFactor);

      let newInterval: number;
      let newRepetitions = card.repetitions + 1;

      if (quality < 3) {
        // Failed - restart interval
        newInterval = 1;
        newRepetitions = 1;
      } else if (card.repetitions === 0) {
        newInterval = 1;
      } else if (card.repetitions === 1) {
        newInterval = 3;
      } else {
        newInterval = Math.round(card.interval * newEaseFactor);
      }

      const nextReview = new Date();
      nextReview.setDate(nextReview.getDate() + newInterval);

      return {
        ...card,
        interval: newInterval,
        easeFactor: newEaseFactor,
        repetitions: newRepetitions,
        nextReview,
        lastReview: new Date(),
      };
    },
    []
  );

  /**
   * Record response to current card
   */
  const recordResponse = useCallback(
    (quality: Quality) => {
      if (!currentCard) return;

      // Update card with SM-2 algorithm
      const updatedCard = calculateNextReview(currentCard, quality);

      // Update cards array
      setCards(prevCards =>
        prevCards.map(card => (card.id === updatedCard.id ? updatedCard : card))
      );

      // Record in history
      setHistory(prev => [
        ...prev,
        {
          cardId: currentCard.id,
          quality,
          timestamp: new Date(),
        },
      ]);

      // Move to next card
      if (currentIndex < dueCards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Session complete
        setCurrentIndex(0);
      }
    },
    [currentCard, currentIndex, dueCards.length, calculateNextReview]
  );

  /**
   * Add new card
   */
  const addCard = useCallback((card: Omit<SpacedRepetitionCard, 'interval' | 'easeFactor' | 'repetitions' | 'nextReview'>) => {
    const newCard: SpacedRepetitionCard = {
      ...card,
      interval: SM2_PARAMS.INITIAL_INTERVAL,
      easeFactor: SM2_PARAMS.INITIAL_EASE_FACTOR,
      repetitions: 0,
      nextReview: new Date(),
    };
    setCards(prev => [...prev, newCard]);
  }, []);

  /**
   * Get statistics
   */
  const stats = useMemo(() => {
    const totalCards = cards.length;
    const reviewedCards = cards.filter(c => c.repetitions > 0).length;
    const dueNow = dueCards.length;
    const averageEase = cards.length > 0
      ? cards.reduce((sum, c) => sum + c.easeFactor, 0) / cards.length
      : 0;

    return {
      totalCards,
      reviewedCards,
      dueNow,
      averageEase: parseFloat(averageEase.toFixed(2)),
      percentReviewed: totalCards > 0 ? Math.round((reviewedCards / totalCards) * 100) : 0,
    };
  }, [cards, dueCards.length]);

  /**
   * Reset session
   */
  const resetSession = useCallback(() => {
    setCurrentIndex(0);
    setHistory([]);
  }, []);

  /**
   * Get session statistics
   */
  const sessionStats = useMemo(() => {
    const totalResponses = history.length;
    const correctResponses = history.filter(h => h.quality >= 3).length;
    const accuracy = totalResponses > 0 ? Math.round((correctResponses / totalResponses) * 100) : 0;

    return {
      totalResponses,
      correctResponses,
      accuracy,
      cardsReviewed: new Set(history.map(h => h.cardId)).size,
    };
  }, [history]);

  return {
    // State
    cards,
    currentCard,
    dueCards,
    currentIndex,
    history,

    // Actions
    recordResponse,
    addCard,
    resetSession,
    setCards,

    // Statistics
    stats,
    sessionStats,

    // Computed
    isSessionComplete: currentIndex >= dueCards.length && dueCards.length > 0,
    progressPercent:
      dueCards.length > 0 ? Math.round(((currentIndex + 1) / dueCards.length) * 100) : 0,
  };
}

/**
 * Hook for managing a deck of flashcards with spaced repetition
 */
export function useFlashcardDeck(deckId: string, cards: SpacedRepetitionCard[] = []) {
  const repetition = useSpacedRepetition(cards);

  return {
    deckId,
    ...repetition,
  };
}
