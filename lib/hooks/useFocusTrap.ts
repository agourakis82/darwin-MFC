import { useCallback, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

interface UseFocusTrapOptions {
  /** Whether the trap is active */
  enabled?: boolean;
  /** Whether to auto-focus the first element when trap becomes active */
  autoFocus?: boolean;
  /** Whether to return focus to the previously focused element when trap is deactivated */
  returnFocusOnDeactivate?: boolean;
  /** Callback when user presses Escape */
  onEscape?: () => void;
}

/**
 * Custom hook for trapping focus within a container element
 * Used for modals, dialogs, and other overlay components for WCAG compliance
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  options: UseFocusTrapOptions = {}
) {
  const {
    enabled = true,
    autoFocus = true,
    returnFocusOnDeactivate = true,
    onEscape,
  } = options;

  const containerRef = useRef<T | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Get all focusable elements within the container
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    ).filter(
      (el) =>
        el.offsetWidth > 0 &&
        el.offsetHeight > 0 &&
        getComputedStyle(el).visibility !== 'hidden'
    );
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || !containerRef.current) return;

      // Handle Escape key
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape?.();
        return;
      }

      // Handle Tab key for focus trapping
      if (event.key === 'Tab') {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement as HTMLElement;

        // Shift + Tab: move focus backwards
        if (event.shiftKey) {
          if (activeElement === firstElement || !containerRef.current.contains(activeElement)) {
            event.preventDefault();
            lastElement.focus();
          }
        }
        // Tab: move focus forwards
        else {
          if (activeElement === lastElement || !containerRef.current.contains(activeElement)) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [enabled, getFocusableElements, onEscape]
  );

  // Set up focus trap
  useEffect(() => {
    if (!enabled) return;

    // Store currently focused element
    if (returnFocusOnDeactivate) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    // Auto-focus first element
    if (autoFocus && containerRef.current) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        // Small delay to ensure the element is mounted
        requestAnimationFrame(() => {
          focusableElements[0].focus();
        });
      } else {
        // If no focusable elements, focus the container itself
        containerRef.current.setAttribute('tabindex', '-1');
        containerRef.current.focus();
      }
    }

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Return focus to previous element
      if (returnFocusOnDeactivate && previousFocusRef.current) {
        try {
          previousFocusRef.current.focus();
        } catch {
          // Element may no longer exist
        }
      }
    };
  }, [enabled, autoFocus, returnFocusOnDeactivate, handleKeyDown, getFocusableElements]);

  return {
    containerRef,
    /** Manually focus the first focusable element */
    focusFirst: () => {
      const elements = getFocusableElements();
      if (elements.length > 0) {
        elements[0].focus();
      }
    },
    /** Manually focus the last focusable element */
    focusLast: () => {
      const elements = getFocusableElements();
      if (elements.length > 0) {
        elements[elements.length - 1].focus();
      }
    },
  };
}

export default useFocusTrap;
