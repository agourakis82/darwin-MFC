/**
 * Focus Management Utilities
 * Helps manage focus for accessibility and keyboard navigation
 */

/**
 * Set focus to an element
 */
export function setFocus(element: HTMLElement | null, options?: FocusOptions) {
  if (!element) return;
  
  try {
    element.focus(options);
  } catch (error) {
    console.error('Focus error:', error);
  }
}

/**
 * Trap focus within a container (for modals/dialogs)
 */
export function trapFocus(containerElement: HTMLElement) {
  const focusableElements = containerElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  containerElement.addEventListener('keydown', handleKeyDown);

  // Set initial focus
  setFocus(firstElement);

  return () => {
    containerElement.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Manage focus for modal dialogs
 */
export class FocusManager {
  private stack: HTMLElement[] = [];
  private savedFocus: HTMLElement | null = null;

  push(element: HTMLElement) {
    this.stack.push(element);
    this.savedFocus = document.activeElement as HTMLElement;
    setFocus(element);
  }

  pop() {
    this.stack.pop();
    if (this.savedFocus && document.body.contains(this.savedFocus)) {
      setFocus(this.savedFocus);
    }
  }

  clear() {
    this.stack = [];
    this.savedFocus = null;
  }

  getCurrentElement(): HTMLElement | null {
    return this.stack[this.stack.length - 1] || null;
  }
}

/**
 * Check if element is visible
 */
export function isElementVisible(element: HTMLElement): boolean {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Get all focusable elements in a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input[type="text"]:not([disabled])',
    'input[type="radio"]:not([disabled])',
    'input[type="checkbox"]:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  return Array.from(container.querySelectorAll(selector)) as HTMLElement[];
}
