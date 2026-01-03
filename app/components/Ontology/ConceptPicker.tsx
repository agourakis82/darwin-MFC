'use client';

/**
 * DARWIN-MFC CONCEPT PICKER
 * =========================
 *
 * A searchable concept picker for SNOMED-CT concepts.
 * Supports autocomplete, keyboard navigation, and concept preview.
 *
 * @example
 * ```tsx
 * function DiagnosisForm() {
 *   const [concept, setConcept] = useState<SnomedConcept | null>(null);
 *
 *   return (
 *     <ConceptPicker
 *       label="Primary Diagnosis"
 *       value={concept}
 *       onChange={setConcept}
 *       placeholder="Search for diagnosis..."
 *     />
 *   );
 * }
 * ```
 */

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  type KeyboardEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Loader2,
  ChevronRight,
  ExternalLink,
  Info,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSnomedSearch, useSnomedConcept } from '@/lib/ontology/hooks';
import type { SnomedConceptSimple, SnomedSearchResult } from '@/lib/ontology/types/snomed-ct';

// Type alias for simpler usage
type SnomedConcept = SnomedConceptSimple;

// =============================================================================
// TYPES
// =============================================================================

export interface ConceptPickerProps {
  /** Current selected concept */
  value?: SnomedConcept | null;

  /** Called when selection changes */
  onChange?: (concept: SnomedConcept | null) => void;

  /** Input placeholder */
  placeholder?: string;

  /** Field label */
  label?: string;

  /** Helper text below input */
  helperText?: string;

  /** Error message */
  error?: string;

  /** Whether the field is required */
  required?: boolean;

  /** Whether the field is disabled */
  disabled?: boolean;

  /** Minimum search length */
  minSearchLength?: number;

  /** Maximum results to show */
  maxResults?: number;

  /** Debounce delay in ms */
  debounce?: number;

  /** Show concept ID in results */
  showConceptId?: boolean;

  /** Show FSN in results */
  showFsn?: boolean;

  /** Allow clearing selection */
  clearable?: boolean;

  /** Custom class name */
  className?: string;

  /** Called when input is focused */
  onFocus?: () => void;

  /** Called when input is blurred */
  onBlur?: () => void;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface ConceptResultItemProps {
  result: SnomedSearchResult;
  isSelected: boolean;
  showConceptId: boolean;
  showFsn: boolean;
  onClick: () => void;
}

function ConceptResultItem({
  result,
  isSelected,
  showConceptId,
  showFsn,
  onClick,
}: ConceptResultItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-start gap-3 px-3 py-2.5 text-left rounded-lg',
        'transition-colors duration-100',
        isSelected
          ? 'bg-[#0071E3]/10 dark:bg-[#0071E3]/20'
          : 'hover:bg-gray-100 dark:hover:bg-white/5'
      )}
    >
      {/* Status indicator */}
      <div
        className={cn(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5',
          isSelected
            ? 'border-[#0071E3] bg-[#0071E3]'
            : 'border-gray-300 dark:border-gray-600'
        )}
      >
        {isSelected && <Check className="w-3 h-3 text-white" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
          {result.concept.pt}
        </div>
        {showFsn && result.fsn !== result.concept.pt && (
          <div className="text-sm text-[#86868b] truncate mt-0.5">
            {result.fsn}
          </div>
        )}
        {showConceptId && (
          <div className="text-xs text-[#86868b]/70 font-mono mt-1">
            SCTID: {result.concept.conceptId}
          </div>
        )}
      </div>

      {/* Active status */}
      <div className="flex-shrink-0">
        {result.active ? (
          <span className="text-xs text-green-600 dark:text-green-400">Active</span>
        ) : (
          <span className="text-xs text-red-600 dark:text-red-400">Inactive</span>
        )}
      </div>
    </button>
  );
}

interface SelectedConceptProps {
  concept: SnomedConcept;
  onClear: () => void;
  disabled: boolean;
}

function SelectedConcept({ concept, onClear, disabled }: SelectedConceptProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#0071E3]/10 dark:bg-[#0071E3]/20 rounded-lg border border-[#0071E3]/20">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[#0071E3] truncate">{concept.pt}</div>
        <div className="text-xs text-[#86868b] font-mono">
          SCTID: {concept.conceptId}
        </div>
      </div>
      {!disabled && (
        <button
          type="button"
          onClick={onClear}
          className="flex-shrink-0 p-1 rounded-full hover:bg-[#0071E3]/20 text-[#0071E3]"
          aria-label="Clear selection"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const ConceptPicker = forwardRef<HTMLInputElement, ConceptPickerProps>(
  function ConceptPicker(
    {
      value,
      onChange,
      placeholder = 'Search SNOMED CT concepts...',
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      minSearchLength = 2,
      maxResults = 10,
      debounce = 300,
      showConceptId = true,
      showFsn = true,
      clearable = true,
      className,
      onFocus,
      onBlur,
    },
    ref
  ) {
    // State
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Hooks
    const { search, results, isLoading, query, clear } = useSnomedSearch({
      debounce,
      minLength: minSearchLength,
      limit: maxResults,
    });

    // Handle click outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset selected index when results change
    useEffect(() => {
      setSelectedIndex(0);
    }, [results]);

    // Handlers
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        search(newValue);
        setIsOpen(true);
      },
      [search]
    );

    const handleSelect = useCallback(
      (concept: SnomedConcept) => {
        onChange?.(concept);
        setInputValue('');
        clear();
        setIsOpen(false);
        inputRef.current?.blur();
      },
      [onChange, clear]
    );

    const handleClear = useCallback(() => {
      onChange?.(null);
      setInputValue('');
      clear();
      inputRef.current?.focus();
    }, [onChange, clear]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        const items = results?.items || [];

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev < items.length - 1 ? prev + 1 : 0
            );
            break;

          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev > 0 ? prev - 1 : items.length - 1
            );
            break;

          case 'Enter':
            e.preventDefault();
            if (items[selectedIndex]) {
              handleSelect(items[selectedIndex].concept);
            }
            break;

          case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            inputRef.current?.blur();
            break;
        }
      },
      [results, selectedIndex, handleSelect]
    );

    const handleFocus = useCallback(() => {
      setIsOpen(true);
      onFocus?.();
    }, [onFocus]);

    const handleBlur = useCallback(() => {
      // Delay to allow click on results
      setTimeout(() => {
        onBlur?.();
      }, 200);
    }, [onBlur]);

    // Show results dropdown
    const showResults = isOpen && (isLoading || (results?.items && results.items.length > 0));

    return (
      <div ref={containerRef} className={cn('relative', className)}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Selected concept or input */}
        {value && !isOpen ? (
          <SelectedConcept
            concept={value}
            onClear={handleClear}
            disabled={disabled || !clearable}
          />
        ) : (
          <div className="relative">
            {/* Search icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </div>

            {/* Input */}
            <input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                'w-full pl-10 pr-10 py-2.5 rounded-lg',
                'bg-white dark:bg-[#1c1c1e]',
                'border border-gray-200 dark:border-white/10',
                'text-[#1d1d1f] dark:text-[#f5f5f7]',
                'placeholder:text-[#86868b]',
                'focus:outline-none focus:ring-2 focus:ring-[#0071E3]/50 focus:border-[#0071E3]',
                error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label={label || 'Search concepts'}
              aria-expanded={showResults}
              aria-autocomplete="list"
              role="combobox"
            />

            {/* Clear button */}
            {inputValue && (
              <button
                type="button"
                onClick={() => {
                  setInputValue('');
                  clear();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-[#86868b]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Results dropdown */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute z-50 w-full mt-1.5 rounded-xl overflow-hidden',
                'bg-white dark:bg-[#1c1c1e]',
                'border border-gray-200 dark:border-white/10',
                'shadow-xl'
              )}
            >
              {/* Loading state */}
              {isLoading && !results?.items.length && (
                <div className="flex items-center justify-center py-8 text-[#86868b]">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  <span>Searching SNOMED CT...</span>
                </div>
              )}

              {/* Results list */}
              {results?.items && results.items.length > 0 && (
                <div className="max-h-[300px] overflow-y-auto p-1.5">
                  {results.items.slice(0, maxResults).map((result, index) => (
                    <ConceptResultItem
                      key={result.concept.conceptId}
                      result={result}
                      isSelected={index === selectedIndex}
                      showConceptId={showConceptId}
                      showFsn={showFsn}
                      onClick={() => handleSelect(result.concept)}
                    />
                  ))}
                </div>
              )}

              {/* No results */}
              {!isLoading && query && results?.items.length === 0 && (
                <div className="py-8 text-center text-[#86868b]">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No concepts found for "{query}"</p>
                </div>
              )}

              {/* Footer */}
              {results?.items && results.items.length > 0 && (
                <div className="px-3 py-2 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs text-[#86868b]">
                  <span>{results.total.toLocaleString()} results</span>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 rounded">↑↓</kbd>
                    <span>navigate</span>
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 rounded">↵</kbd>
                    <span>select</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Helper text */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-[#86868b]">{helperText}</p>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

export default ConceptPicker;
