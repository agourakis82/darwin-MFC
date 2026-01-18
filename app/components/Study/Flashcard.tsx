'use client';

import { useEffect, useCallback } from 'react';
import { RotateCcw, Check, ChevronRight, X } from 'lucide-react';

import { Flashcard as FlashcardType } from '@/lib/types/study-mode';
import { Quality } from '@/lib/utils/spaced-repetition';

export interface FlashcardProps {
  // Pattern 1: Individual props (preferred)
  front?: string;
  back?: string;
  onResponse?: (quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  showAnswer?: boolean;
  onFlip?: () => void;
  // Pattern 2: Flashcard object with callbacks
  flashcard?: FlashcardType;
  onMasteryChange?: (quality: Quality) => void;
  onNext?: () => void;
}

/**
 * Flashcard Component for Medical Learning
 *
 * Features:
 * - 3D CSS flip animation using transforms
 * - Keyboard navigation (Space to flip, 1-4 for response quality)
 * - Mobile-friendly touch interactions
 * - Dark mode compatible
 * - Accessible with ARIA labels
 *
 * Response Quality Mapping:
 * - Again (1): Complete blackout, wrong response
 * - Hard (2): Incorrect response, but upon seeing correct answer, remembered
 * - Good (3): Correct response with serious difficulty
 * - Easy (5): Perfect response with no hesitation
 */
export default function Flashcard(props: FlashcardProps) {
  // Support both prop patterns
  const front = props.front ?? props.flashcard?.front ?? '';
  const back = props.back ?? props.flashcard?.back ?? '';
  const showAnswer = props.showAnswer ?? false;

  // Handle response callbacks
  const handleResponse = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    if (props.onResponse) {
      props.onResponse(quality);
    } else if (props.onMasteryChange) {
      props.onMasteryChange(quality as Quality);
      // Note: onNext should be called by the parent component if needed
      // (it's often bundled into the onMasteryChange handler)
    }
  };

  const handleFlip = () => {
    if (props.onFlip) {
      props.onFlip();
    }
  };
  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Prevent default for handled keys
      if ([' ', '1', '2', '3', '4'].includes(event.key)) {
        event.preventDefault();
      }

      // Space to flip card
      if (event.key === ' ' || event.key === 'Spacebar') {
        handleFlip();
        return;
      }

      // Number keys for response quality (only when answer is shown)
      if (showAnswer) {
        switch (event.key) {
          case '1':
            handleResponse(1); // Again
            break;
          case '2':
            handleResponse(2); // Hard
            break;
          case '3':
            handleResponse(3); // Good
            break;
          case '4':
            handleResponse(5); // Easy (maps to quality 5)
            break;
        }
      }
    },
    [handleFlip, handleResponse, showAnswer]
  );

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Response button configuration
  const responseButtons = [
    {
      label: 'Again',
      shortcut: '1',
      quality: 1 as const,
      className:
        'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-red-500/50',
      icon: X,
    },
    {
      label: 'Hard',
      shortcut: '2',
      quality: 2 as const,
      className:
        'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 focus:ring-orange-500/50',
      icon: RotateCcw,
    },
    {
      label: 'Good',
      shortcut: '3',
      quality: 3 as const,
      className:
        'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-500/50',
      icon: Check,
    },
    {
      label: 'Easy',
      shortcut: '4',
      quality: 5 as const,
      className:
        'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:ring-emerald-500/50',
      icon: ChevronRight,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card Container with 3D Perspective */}
      <div
        className="relative h-80 sm:h-96 cursor-pointer select-none"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={
          showAnswer
            ? 'Flashcard showing answer. Press Space to show question.'
            : 'Flashcard showing question. Press Space to reveal answer.'
        }
      >
        {/* Inner container that flips */}
        <div
          className="relative w-full h-full transition-transform duration-500 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front Face (Question) */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 text-white"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            aria-hidden={showAnswer}
          >
            <div className="text-center w-full">
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6 opacity-70">
                Question
              </div>
              <div
                className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed px-2"
                style={{
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {front}
              </div>
              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-sm opacity-60">
                <span className="hidden sm:inline">Press</span>
                <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">
                  Space
                </kbd>
                <span className="hidden sm:inline">or tap to flip</span>
                <span className="sm:hidden">to flip</span>
              </div>
            </div>
          </div>

          {/* Back Face (Answer) */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-700 dark:via-emerald-800 dark:to-teal-900 text-white"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            aria-hidden={!showAnswer}
          >
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center">
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6 opacity-70">
                  Answer
                </div>
                <div
                  className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed px-2"
                  style={{
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                  }}
                >
                  {back}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Buttons - Only shown when answer is visible */}
      <div
        className={`mt-6 transition-all duration-300 ${
          showAnswer
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        aria-hidden={!showAnswer}
      >
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-4">
          How well did you know this?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {responseButtons.map(({ label, shortcut, quality, className, icon: Icon }) => (
            <button
              key={quality}
              onClick={(e) => {
                e.stopPropagation();
                handleResponse(quality);
              }}
              disabled={!showAnswer}
              className={`
                ${className}
                text-white py-3 px-4 rounded-xl font-medium
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                dark:focus:ring-offset-slate-900
                disabled:opacity-50 disabled:cursor-not-allowed
                flex flex-col items-center justify-center gap-1
                active:scale-95
              `}
              aria-label={`Rate as ${label} (keyboard shortcut: ${shortcut})`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="text-sm sm:text-base">{label}</span>
              <kbd className="text-xs opacity-70 font-mono hidden sm:block">
                {shortcut}
              </kbd>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-3">
          Tip: Use keyboard shortcuts 1-4 for faster review
        </p>
      </div>
    </div>
  );
}
