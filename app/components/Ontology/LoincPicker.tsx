'use client';

/**
 * DARWIN-MFC LOINC PICKER
 * =======================
 *
 * A searchable picker for LOINC laboratory codes.
 * Supports autocomplete, keyboard navigation, and panel browsing.
 *
 * @example
 * ```tsx
 * function LabOrderForm() {
 *   const [loincCode, setLoincCode] = useState<LoincConceptMini | null>(null);
 *
 *   return (
 *     <LoincPicker
 *       label="Laboratory Test"
 *       value={loincCode}
 *       onChange={setLoincCode}
 *       placeholder="Search for lab test..."
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
  Check,
  FlaskConical,
  Activity,
  Thermometer,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLoincSearch } from '@/lib/ontology/hooks';
import type {
  LoincConceptMini,
  LoincSearchResult,
  LoincClass,
} from '@/lib/ontology/types/loinc';

// =============================================================================
// TYPES
// =============================================================================

export interface LoincPickerProps {
  /** Current selected LOINC code */
  value?: LoincConceptMini | null;

  /** Called when selection changes */
  onChange?: (concept: LoincConceptMini | null) => void;

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

  /** Filter by LOINC class */
  loincClass?: LoincClass | LoincClass[];

  /** Show LOINC code in results */
  showLoincCode?: boolean;

  /** Show specimen type in results */
  showSystem?: boolean;

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
// HELPERS
// =============================================================================

function getClassIcon(loincClass: string) {
  switch (loincClass) {
    case 'CHEM':
    case 'PANEL.CHEM':
      return <FlaskConical className="w-4 h-4" />;
    case 'HEM/BC':
    case 'PANEL.HEM':
    case 'COAG':
      return <Activity className="w-4 h-4" />;
    case 'VITALS':
      return <Thermometer className="w-4 h-4" />;
    default:
      return <FlaskConical className="w-4 h-4" />;
  }
}

function getClassColor(loincClass: string): string {
  switch (loincClass) {
    case 'CHEM':
    case 'PANEL.CHEM':
      return 'text-blue-500';
    case 'HEM/BC':
    case 'PANEL.HEM':
      return 'text-red-500';
    case 'COAG':
      return 'text-purple-500';
    case 'UA':
    case 'PANEL.UA':
      return 'text-yellow-500';
    case 'MICRO':
      return 'text-green-500';
    case 'VITALS':
      return 'text-orange-500';
    default:
      return 'text-gray-500';
  }
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface LoincResultItemProps {
  result: LoincSearchResult;
  isSelected: boolean;
  showLoincCode: boolean;
  showSystem: boolean;
  onClick: () => void;
}

function LoincResultItem({
  result,
  isSelected,
  showLoincCode,
  showSystem,
  onClick,
}: LoincResultItemProps) {
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
      {/* Class icon */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5',
          'bg-gray-100 dark:bg-white/10',
          getClassColor(result.concept.class)
        )}
      >
        {getClassIcon(result.concept.class)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
          {result.concept.longCommonName}
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-sm text-[#86868b]">
          {showLoincCode && (
            <span className="font-mono">{result.concept.loincNum}</span>
          )}
          {showSystem && result.concept.system && (
            <>
              <span>•</span>
              <span>{result.concept.system}</span>
            </>
          )}
        </div>
      </div>

      {/* Selection indicator */}
      <div className="flex-shrink-0">
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-[#0071E3] flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </button>
  );
}

interface SelectedLoincProps {
  concept: LoincConceptMini;
  onClear: () => void;
  disabled: boolean;
}

function SelectedLoinc({ concept, onClear, disabled }: SelectedLoincProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-[#0071E3]/10 dark:bg-[#0071E3]/20 rounded-lg border border-[#0071E3]/20">
      {/* Class icon */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
          'bg-[#0071E3]/20',
          'text-[#0071E3]'
        )}
      >
        {getClassIcon(concept.class)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[#0071E3] truncate">
          {concept.longCommonName}
        </div>
        <div className="text-xs text-[#86868b] font-mono">
          LOINC: {concept.loincNum}
        </div>
      </div>

      {/* Clear button */}
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

export const LoincPicker = forwardRef<HTMLInputElement, LoincPickerProps>(
  function LoincPicker(
    {
      value,
      onChange,
      placeholder = 'Search LOINC codes...',
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      minSearchLength = 2,
      maxResults = 10,
      debounce = 300,
      loincClass,
      showLoincCode = true,
      showSystem = true,
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
    const { search, results, isLoading, query, clear } = useLoincSearch({
      debounce,
      minLength: minSearchLength,
      limit: maxResults,
      class: loincClass,
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
      (concept: LoincConceptMini) => {
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
        const items = results?.results || [];

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
    const showResults =
      isOpen && (isLoading || (results?.results && results.results.length > 0));

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
          <SelectedLoinc
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
                error &&
                  'border-red-500 focus:ring-red-500/50 focus:border-red-500',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label={label || 'Search LOINC codes'}
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
              {isLoading && !results?.results.length && (
                <div className="flex items-center justify-center py-8 text-[#86868b]">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  <span>Searching LOINC...</span>
                </div>
              )}

              {/* Results list */}
              {results?.results && results.results.length > 0 && (
                <div className="max-h-[300px] overflow-y-auto p-1.5">
                  {results.results.slice(0, maxResults).map((result, index) => (
                    <LoincResultItem
                      key={result.concept.loincNum}
                      result={result}
                      isSelected={index === selectedIndex}
                      showLoincCode={showLoincCode}
                      showSystem={showSystem}
                      onClick={() => handleSelect(result.concept)}
                    />
                  ))}
                </div>
              )}

              {/* No results */}
              {!isLoading && query && results?.results.length === 0 && (
                <div className="py-8 text-center text-[#86868b]">
                  <FlaskConical className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No LOINC codes found for "{query}"</p>
                </div>
              )}

              {/* Footer */}
              {results?.results && results.results.length > 0 && (
                <div className="px-3 py-2 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs text-[#86868b]">
                  <span>{results.total.toLocaleString()} results</span>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 rounded">
                      ↑↓
                    </kbd>
                    <span>navigate</span>
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 rounded">
                      ↵
                    </kbd>
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
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export default LoincPicker;
