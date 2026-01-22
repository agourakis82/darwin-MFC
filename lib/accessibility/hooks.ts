'use client';

import { useEffect, useRef } from 'react';
import { announceToScreenReader } from './focus-manager';

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const prefersReduced = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReduced.current = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReduced.current = e.matches;
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced.current;
}

/**
 * Hook to announce messages to screen readers
 */
export function useScreenReaderAnnouncement() {
  return (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority);
  };
}

/**
 * Hook for keyboard shortcuts
 */
export function useKeyboardShortcut(
  keys: string[],
  callback: () => void,
  options?: { ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean }
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keysMatch = keys.some(
        key => e.key.toLowerCase() === key.toLowerCase()
      );
      const modifiersMatch =
        e.ctrlKey === (options?.ctrlKey || false) &&
        e.shiftKey === (options?.shiftKey || false) &&
        e.altKey === (options?.altKey || false);

      if (keysMatch && modifiersMatch) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, callback, options]);
}

/**
 * Hook to manage skip to main content link
 */
export function useSkipToMainContent() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
