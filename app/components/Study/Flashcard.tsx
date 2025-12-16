'use client';

import { useState } from 'react';
import { FlipHorizontal, Check, X, RotateCcw } from 'lucide-react';
import { Flashcard as FlashcardType } from '@/lib/types/study-mode';

interface FlashcardProps {
  flashcard: FlashcardType;
  onMasteryChange: (level: number) => void;
  onNext: () => void;
}

export default function Flashcard({ flashcard, onMasteryChange, onNext }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(flashcard.masteryLevel);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastery = (level: number) => {
    setMasteryLevel(level);
    onMasteryChange(level);
    // Auto avançar após escolher mastery
    setTimeout(() => {
      onNext();
      setIsFlipped(false);
      setMasteryLevel(flashcard.masteryLevel);
    }, 300);
  };

  const masteryLabels = [
    { level: 0, label: 'Não sei', color: 'bg-red-500' },
    { level: 1, label: 'Muito difícil', color: 'bg-orange-500' },
    { level: 2, label: 'Difícil', color: 'bg-yellow-500' },
    { level: 3, label: 'Bom', color: 'bg-blue-500' },
    { level: 4, label: 'Fácil', color: 'bg-green-500' },
    { level: 5, label: 'Muito fácil', color: 'bg-emerald-500' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`relative h-96 perspective-1000 cursor-pointer transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-2xl p-8 shadow-2xl backface-hidden ${
            isFlipped ? 'hidden' : 'block'
          } bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-center items-center`}
        >
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-wide mb-4 opacity-80">
              {flashcard.categoria}
            </div>
            <div className="text-2xl font-bold mb-6 leading-relaxed">
              {flashcard.front}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm opacity-75">
              <FlipHorizontal className="w-4 h-4" />
              <span>Clique para ver resposta</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-2xl p-8 shadow-2xl backface-hidden rotate-y-180 ${
            isFlipped ? 'block' : 'hidden'
          } bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex flex-col`}
        >
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-8">
              <div className="text-2xl font-bold leading-relaxed">
                {flashcard.back}
              </div>
            </div>
            
            {/* Mastery buttons */}
            <div className="space-y-4">
              <div className="text-sm font-semibold text-center mb-3">
                Quão bem você conhecia isso?
              </div>
              <div className="grid grid-cols-3 gap-2">
                {masteryLabels.map(({ level, label, color }) => (
                  <button
                    key={level}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMastery(level);
                    }}
                    className={`${color} hover:opacity-90 text-white py-3 px-4 rounded-lg text-sm font-medium transition-all`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full ${
                level <= masteryLevel ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

