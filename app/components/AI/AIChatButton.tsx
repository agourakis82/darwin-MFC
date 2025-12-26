'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { AIChatInterface } from './AIChatInterface';
import type { ChatContext } from '@/lib/types/ai';

/**
 * Floating AI Chat Button
 * Opens the AI assistant chat interface
 */
export function AIChatButton() {
  const t = useTranslations('ai');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Build context from current page
  const context: Partial<ChatContext> = {
    currentPage: pathname ?? undefined,
    currentDiseaseId: extractIdFromPath(pathname ?? '', '/doencas/'),
    currentMedicationId: extractIdFromPath(pathname ?? '', '/medicamentos/'),
    currentProtocolId: extractIdFromPath(pathname ?? '', '/protocolos/'),
  };

  // Show tooltip briefly on first render
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('darwin-ai-tooltip-seen');
    if (!hasSeenTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        localStorage.setItem('darwin-ai-tooltip-seen', 'true');
        setTimeout(() => setShowTooltip(false), 5000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'a') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <AnimatePresence>
          {(showTooltip || isHovered) && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full right-0 mb-3 px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm whitespace-nowrap shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span>{t('buttonTooltip')}</span>
                <kbd className="px-1.5 py-0.5 rounded bg-gray-700 dark:bg-gray-300 text-xs font-mono">
                  {typeof window !== 'undefined' &&
                  navigator.platform.includes('Mac')
                    ? '⌘⇧A'
                    : 'Ctrl+Shift+A'}
                </kbd>
              </div>
              {/* Arrow */}
              <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-gray-100" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('openChat')}
        >
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Icon */}
          <svg
            className="w-6 h-6 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>

          {/* Beta badge */}
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-[10px] font-bold text-white">
            BETA
          </span>
        </motion.button>
      </div>

      {/* Chat Interface */}
      <AIChatInterface
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        context={context}
      />
    </>
  );
}

/**
 * Extract ID from pathname
 */
function extractIdFromPath(
  pathname: string,
  prefix: string
): string | undefined {
  if (pathname.includes(prefix)) {
    const parts = pathname.split(prefix);
    if (parts[1]) {
      return parts[1].split('/')[0];
    }
  }
  return undefined;
}

export default AIChatButton;
