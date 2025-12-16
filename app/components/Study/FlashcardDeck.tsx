'use client';

import { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import Flashcard from './Flashcard';
import { Flashcard as FlashcardType } from '@/lib/types/study-mode';

interface FlashcardDeckProps {
  flashcards: FlashcardType[];
  onComplete?: () => void;
}

export default function FlashcardDeck({ flashcards, onComplete }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffled, setShuffled] = useState<FlashcardType[]>(flashcards);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    setShuffled([...flashcards]);
  }, [flashcards]);

  const handleShuffle = () => {
    const newShuffled = [...shuffled].sort(() => Math.random() - 0.5);
    setShuffled(newShuffled);
    setCurrentIndex(0);
  };

  const handleMasteryChange = (level: number) => {
    setProgress({
      ...progress,
      [shuffled[currentIndex].id]: level
    });
  };

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
  const completedCount = Object.keys(progress).length;
  const averageMastery = Object.values(progress).length > 0
    ? Object.values(progress).reduce((a, b) => a + b, 0) / Object.values(progress).length
    : 0;

  return (
    <div className="w-full">
      {/* Stats */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {currentIndex + 1} / {shuffled.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Média de domínio: {averageMastery.toFixed(1)}/5
          </div>
        </div>
        <button
          onClick={handleShuffle}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
        >
          <Shuffle className="w-4 h-4" />
          Embaralhar
        </button>
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
          {completedCount} revisados
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

