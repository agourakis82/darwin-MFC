'use client';

/**
 * REAL-TIME FEEDBACK
 * ==================
 *
 * Component for displaying real-time AI feedback during learning sessions.
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Brain,
  Zap,
  Coffee,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useSotaStore } from '../../lib/store/sotaStore';
import type { SOTAAdaptiveFeedback } from '../../lib/types/sota';

// =============================================================================
// TYPES
// =============================================================================

interface RealTimeFeedbackProps {
  onDismiss?: (feedbackIndex: number) => void;
  maxVisible?: number;
  position?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';
}

// =============================================================================
// COMPONENT
// =============================================================================

export function RealTimeFeedback({
  onDismiss,
  maxVisible = 3,
  position = 'bottom-right',
}: RealTimeFeedbackProps) {
  const realtimeFeedback = useSotaStore((state) => state.realtimeFeedback);
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  // Filter out dismissed feedback
  const visibleFeedback = realtimeFeedback
    .filter((_, i) => !dismissed.has(i))
    .slice(-maxVisible);

  // Auto-dismiss after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleFeedback.length > 0) {
        const firstIndex = realtimeFeedback.indexOf(visibleFeedback[0]);
        handleDismiss(firstIndex);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [visibleFeedback, realtimeFeedback]);

  const handleDismiss = (index: number) => {
    setDismissed((prev) => new Set([...prev, index]));
    onDismiss?.(index);
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-left': 'top-4 left-4',
  };

  const getFeedbackIcon = (type: SOTAAdaptiveFeedback['type']) => {
    switch (type) {
      case 'difficulty_adjustment':
        return <TrendingUp className="h-5 w-5" />;
      case 'content_suggestion':
        return <Brain className="h-5 w-5" />;
      case 'pace_adjustment':
        return <Zap className="h-5 w-5" />;
      case 'break_suggestion':
        return <Coffee className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getFeedbackColor = (type: SOTAAdaptiveFeedback['type']) => {
    switch (type) {
      case 'difficulty_adjustment':
        return 'border-blue-500 bg-blue-500/10';
      case 'content_suggestion':
        return 'border-purple-500 bg-purple-500/10';
      case 'pace_adjustment':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'break_suggestion':
        return 'border-green-500 bg-green-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  if (visibleFeedback.length === 0) {
    return null;
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 space-y-2 max-w-sm`}>
      <AnimatePresence mode="popLayout">
        {visibleFeedback.map((feedback, displayIndex) => {
          const actualIndex = realtimeFeedback.indexOf(feedback);
          return (
            <motion.div
              key={actualIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`relative border-l-4 rounded-lg p-4 shadow-lg ${getFeedbackColor(
                feedback.type
              )} bg-card`}
            >
              <button
                onClick={() => handleDismiss(actualIndex)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              <div className="flex items-start gap-3 pr-6">
                <div className="shrink-0 mt-0.5 text-primary">
                  {getFeedbackIcon(feedback.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{feedback.message}</p>
                  {feedback.newDifficulty !== undefined && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Nova dificuldade: {feedback.newDifficulty}/5
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3" />
                      {Math.round(feedback.confidence * 100)}% confiança
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default RealTimeFeedback;
