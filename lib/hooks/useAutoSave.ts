/**
 * useAutoSave Hook
 * ================
 * Automatically saves data after a debounce period when changes are detected.
 * Provides visual feedback about save state (dirty, saving, saved).
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export type AutoSaveStatus = 'idle' | 'dirty' | 'saving' | 'saved' | 'error';

export interface UseAutoSaveOptions<T> {
  /** Debounce delay in milliseconds (default: 2000) */
  delay?: number;
  /** Callback to perform the save operation */
  onSave: (value: T) => Promise<void> | void;
  /** Callback when save fails */
  onError?: (error: Error) => void;
  /** Callback when save succeeds */
  onSuccess?: () => void;
  /** Whether auto-save is enabled (default: true) */
  enabled?: boolean;
  /** Duration to show "saved" status before returning to idle (default: 2000) */
  savedDuration?: number;
}

export interface UseAutoSaveReturn<T> {
  /** Current save status */
  status: AutoSaveStatus;
  /** Whether there are unsaved changes */
  isDirty: boolean;
  /** Whether a save is currently in progress */
  isSaving: boolean;
  /** Manually trigger a save */
  save: () => Promise<void>;
  /** Reset dirty state without saving */
  reset: () => void;
  /** Update the value (marks as dirty and triggers auto-save) */
  setValue: (value: T) => void;
  /** Last error if any */
  error: Error | null;
}

/**
 * Hook that automatically saves data after a debounce period.
 *
 * @example
 * ```tsx
 * function NoteEditor({ initialContent }: { initialContent: string }) {
 *   const [content, setContent] = useState(initialContent);
 *
 *   const { status, isDirty, setValue } = useAutoSave({
 *     delay: 2000,
 *     onSave: async (value) => {
 *       await saveNoteToServer(value);
 *     },
 *   });
 *
 *   return (
 *     <div>
 *       <textarea
 *         value={content}
 *         onChange={(e) => {
 *           setContent(e.target.value);
 *           setValue(e.target.value);
 *         }}
 *       />
 *       <span>
 *         {status === 'dirty' && 'Unsaved changes...'}
 *         {status === 'saving' && 'Saving...'}
 *         {status === 'saved' && 'Saved!'}
 *         {status === 'error' && 'Save failed!'}
 *       </span>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAutoSave<T>(
  options: UseAutoSaveOptions<T>
): UseAutoSaveReturn<T> {
  const {
    delay = 2000,
    onSave,
    onError,
    onSuccess,
    enabled = true,
    savedDuration = 2000,
  } = options;

  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const [error, setError] = useState<Error | null>(null);

  const valueRef = useRef<T | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (savedTimerRef.current) {
        clearTimeout(savedTimerRef.current);
      }
    };
  }, []);

  // Perform the save operation
  const performSave = useCallback(async () => {
    if (valueRef.current === null) return;

    const valueToSave = valueRef.current;

    try {
      setStatus('saving');
      setError(null);

      await onSave(valueToSave);

      if (isMountedRef.current) {
        setStatus('saved');
        onSuccess?.();

        // Reset to idle after saved duration
        savedTimerRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            setStatus('idle');
          }
        }, savedDuration);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (isMountedRef.current) {
        setStatus('error');
        setError(error);
        onError?.(error);
      }
    }
  }, [onSave, onError, onSuccess, savedDuration]);

  // Manual save function
  const save = useCallback(async () => {
    // Clear any pending debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    await performSave();
  }, [performSave]);

  // Set value and trigger auto-save
  const setValue = useCallback(
    (value: T) => {
      valueRef.current = value;

      if (!enabled) return;

      // Mark as dirty immediately
      setStatus('dirty');
      setError(null);

      // Clear existing saved status timer
      if (savedTimerRef.current) {
        clearTimeout(savedTimerRef.current);
        savedTimerRef.current = null;
      }

      // Clear existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Start new debounce timer
      debounceTimerRef.current = setTimeout(() => {
        performSave();
      }, delay);
    },
    [enabled, delay, performSave]
  );

  // Reset without saving
  const reset = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    if (savedTimerRef.current) {
      clearTimeout(savedTimerRef.current);
      savedTimerRef.current = null;
    }
    valueRef.current = null;
    setStatus('idle');
    setError(null);
  }, []);

  return {
    status,
    isDirty: status === 'dirty',
    isSaving: status === 'saving',
    save,
    reset,
    setValue,
    error,
  };
}

/**
 * Simpler version that just tracks dirty state and calls save on blur or unmount.
 */
export function useAutoSaveOnBlur<T>(
  value: T,
  onSave: (value: T) => Promise<void> | void,
  options: { enabled?: boolean } = {}
): { isDirty: boolean; save: () => Promise<void> } {
  const { enabled = true } = options;
  const [isDirty, setIsDirty] = useState(false);
  const initialValueRef = useRef(value);
  const currentValueRef = useRef(value);

  // Update refs when value changes
  useEffect(() => {
    currentValueRef.current = value;
    setIsDirty(JSON.stringify(value) !== JSON.stringify(initialValueRef.current));
  }, [value]);

  const save = useCallback(async () => {
    if (!enabled || !isDirty) return;

    await onSave(currentValueRef.current);
    initialValueRef.current = currentValueRef.current;
    setIsDirty(false);
  }, [enabled, isDirty, onSave]);

  // Save on unmount if dirty
  useEffect(() => {
    return () => {
      if (isDirty && enabled) {
        onSave(currentValueRef.current);
      }
    };
  }, [isDirty, enabled, onSave]);

  return { isDirty, save };
}

export default useAutoSave;
