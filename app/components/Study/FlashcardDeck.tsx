'use client';

import { useState, useEffect, useMemo } from 'react';
import { Shuffle, RotateCcw, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import Flashcard from './Flashcard';
import { Flashcard as FlashcardType } from '@/lib/types/study-mode';
import { useStudyStore } from '@/lib/store/studyStore';
import { getCardsDueToday, getOverdueCards, getNewCards, calculateReviewStats, Quality } from '@/lib/utils/spaced-repetition';

interface FlashcardDeckProps {
  flashcards: FlashcardType[];
  onComplete?: () => void;
  mode?: 'all' | 'due' | 'new' | 'overdue'; // Modo de filtro de cards
}

export default function FlashcardDeck({ flashcards, onComplete, mode = 'all' }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { 
    flashcardSchedules, 
    initializeFlashcard, 
    updateFlashcardReview,
    getFlashcardSchedule,
    getCardsDueToday: getDueTodayFromStore,
  } = useStudyStore();

  // Initialize schedules for all flashcards
  useEffect(() => {
    flashcards.forEach(flashcard => {
      if (!flashcardSchedules[flashcard.id]) {
        initializeFlashcard(flashcard.id);
      }
    });
  }, [flashcards, flashcardSchedules, initializeFlashcard]);

  // Filter flashcards based on mode
  const filteredFlashcards = useMemo(() => {
    if (mode === 'all') {
      return flashcards;
    }

    const schedules = Object.values(flashcardSchedules).filter(s => 
      flashcards.some(f => f.id === s.cardId)
    );

    if (mode === 'due') {
      const dueSchedules = getCardsDueToday(schedules);
      const dueIds = new Set(dueSchedules.map(s => s.cardId));
      return flashcards.filter(f => dueIds.has(f.id));
    }

    if (mode === 'overdue') {
      const overdueSchedules = getOverdueCards(schedules);
      const overdueIds = new Set(overdueSchedules.map(s => s.cardId));
      return flashcards.filter(f => overdueIds.has(f.id));
    }

    if (mode === 'new') {
      const newSchedules = getNewCards(schedules);
      const newIds = new Set(newSchedules.map(s => s.cardId));
      return flashcards.filter(f => newIds.has(f.id) || !flashcardSchedules[f.id]);
    }

    return flashcards;
  }, [flashcards, mode, flashcardSchedules]);

  const [shuffled, setShuffled] = useState<FlashcardType[]>(filteredFlashcards);

  useEffect(() => {
    setShuffled([...filteredFlashcards]);
    setCurrentIndex(0);
  }, [filteredFlashcards]);

  const handleShuffle = () => {
    const newShuffled = [...shuffled].sort(() => Math.random() - 0.5);
    setShuffled(newShuffled);
    setCurrentIndex(0);
  };

  const handleMasteryChange = (level: number) => {
    const cardId = shuffled[currentIndex].id;
    // Update review using spaced repetition algorithm
    updateFlashcardReview(cardId, level as Quality);
  };

  // Calculate stats
  const stats = useMemo(() => {
    const schedules = Object.values(flashcardSchedules).filter(s =>
      flashcards.some(f => f.id === s.cardId)
    );
    return calculateReviewStats(schedules);
  }, [flashcardSchedules, flashcards]);

  const handleNext = () => {
    if (currentIndex < shuffled.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (shuffled.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">Nenhum flashcard disponível</p>
      </div>
    );
  }

  const currentFlashcard = shuffled[currentIndex];
  const currentSchedule = currentFlashcard ? getFlashcardSchedule(currentFlashcard.id) : null;
  const nextReviewDate = currentSchedule ? new Date(currentSchedule.nextReview) : null;

  return (
    <div className="w-full">
      {/* Stats */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {currentIndex + 1} / {shuffled.length}
            </div>
            {nextReviewDate && (
              <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Próxima revisão: {nextReviewDate.toLocaleDateString('pt-BR')}
              </div>
            )}
          </div>
          <button
            onClick={handleShuffle}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Embaralhar
          </button>
        </div>
        
        {/* Review Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Novos: {stats.new}</span>
          <span>Para hoje: {stats.dueToday}</span>
          <span>Atrasados: {stats.overdue}</span>
          <span>Dominados: {stats.mastered}</span>
        </div>
      </div>

      {/* Flashcard */}
      <Flashcard
        flashcard={currentFlashcard}
        onMasteryChange={handleMasteryChange}
        onNext={handleNext}
      />

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </button>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {stats.total - stats.new} revisados
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex === shuffled.length - 1}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          Próxima
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

