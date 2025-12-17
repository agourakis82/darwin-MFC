'use client';

import { useState } from 'react';
import { FlipHorizontal } from 'lucide-react';
import { Flashcard as FlashcardType } from '@/lib/types/study-mode';
import { Quality } from '@/lib/utils/spaced-repetition';

interface FlashcardProps {
  flashcard: FlashcardType;
  onMasteryChange: (level: Quality) => void;
  onNext: () => void;
}

export default function Flashcard({ flashcard, onMasteryChange, onNext }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastery = (level: Quality) => {
    onMasteryChange(level);
    // Auto avançar após escolher mastery
    setTimeout(() => {
      onNext();
      setIsFlipped(false);
    }, 300);
  };

  const masteryLabels: Array<{ level: Quality; label: string; color: string; description: string }> = [
    { level: 0, label: 'Incorreta', color: 'bg-red-500', description: 'Esquecido completamente' },
    { level: 1, label: 'Muito difícil', color: 'bg-orange-500', description: 'Lembrou com muito esforço' },
    { level: 2, label: 'Difícil', color: 'bg-yellow-500', description: 'Lembrou com esforço' },
    { level: 3, label: 'Bom', color: 'bg-blue-500', description: 'Lembrou com algum esforço' },
    { level: 4, label: 'Fácil', color: 'bg-green-500', description: 'Lembrou facilmente' },
    { level: 5, label: 'Muito fácil', color: 'bg-emerald-500', description: 'Lembrou instantaneamente' },
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
                Quão bem você conhecia isso? (Anki Scale)
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {masteryLabels.map(({ level, label, color, description }) => (
                  <button
                    key={level}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMastery(level);
                    }}
                    className={`${color} hover:opacity-90 text-white py-3 px-4 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center`}
                    title={description}
                  >
                    <span className="font-bold">{level}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <div className="text-xs text-center opacity-75 mt-2">
                O algoritmo ajustará o intervalo de revisão baseado na sua resposta
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

