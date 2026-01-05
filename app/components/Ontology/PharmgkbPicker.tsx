'use client';

/**
 * DARWIN-MFC PHARMGKB PICKER
 * ==========================
 *
 * A searchable picker for PharmGKB pharmacogenes.
 * Supports autocomplete, keyboard navigation, and CPIC level filtering.
 *
 * @example
 * ```tsx
 * function PharmacogenomicsForm() {
 *   const [gene, setGene] = useState<PharmacogeneMini | null>(null);
 *
 *   return (
 *     <PharmgkbPicker
 *       label="Select Gene"
 *       value={gene}
 *       onChange={setGene}
 *       placeholder="Search for pharmacogene..."
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
  Dna,
  AlertTriangle,
  Shield,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePharmgkbSearch } from '@/lib/ontology/hooks/usePharmgkbBrowser';
import type {
  PharmacogeneMini,
  CpicLevel,
} from '@/lib/ontology/types/pharmgkb';
import { CPIC_LEVEL_INFO } from '@/lib/ontology/types/pharmgkb';

// =============================================================================
// TYPES
// =============================================================================

export interface PharmgkbPickerProps {
  /** Current selected gene */
  value?: PharmacogeneMini | null;

  /** Called when selection changes */
  onChange?: (gene: PharmacogeneMini | null) => void;

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

  /** Filter by CPIC level */
  cpicLevel?: CpicLevel | CpicLevel[];

  /** Only show genes with guidelines */
  hasGuideline?: boolean;

  /** Show CPIC level in results */
  showCpicLevel?: boolean;

  /** Show PharmGKB ID in results */
  showPharmgkbId?: boolean;

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

function getCpicLevelColor(level?: CpicLevel): string {
  if (!level) return 'text-gray-500';

  switch (level) {
    case 'A':
      return 'text-red-500';
    case 'A/B':
      return 'text-orange-500';
    case 'B':
      return 'text-yellow-500';
    case 'B/C':
      return 'text-lime-500';
    case 'C':
      return 'text-green-500';
    case 'C/D':
      return 'text-teal-500';
    case 'D':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
}

function getCpicLevelBgColor(level?: CpicLevel): string {
  if (!level) return 'bg-gray-100 dark:bg-gray-800';

  switch (level) {
    case 'A':
      return 'bg-red-100 dark:bg-red-900/30';
    case 'A/B':
      return 'bg-orange-100 dark:bg-orange-900/30';
    case 'B':
      return 'bg-yellow-100 dark:bg-yellow-900/30';
    case 'B/C':
      return 'bg-lime-100 dark:bg-lime-900/30';
    case 'C':
      return 'bg-green-100 dark:bg-green-900/30';
    case 'C/D':
      return 'bg-teal-100 dark:bg-teal-900/30';
    case 'D':
      return 'bg-blue-100 dark:bg-blue-900/30';
    default:
      return 'bg-gray-100 dark:bg-gray-800';
  }
}

function getCpicIcon(level?: CpicLevel) {
  if (!level) return <Dna className="w-4 h-4" />;

  const info = CPIC_LEVEL_INFO[level];
  if (info.actionRequired) {
    return <AlertTriangle className="w-4 h-4" />;
  }
  return <Shield className="w-4 h-4" />;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface GeneResultItemProps {
  gene: PharmacogeneMini;
  isSelected: boolean;
  showCpicLevel: boolean;
  showPharmgkbId: boolean;
  onClick: () => void;
}

function GeneResultItem({
  gene,
  isSelected,
  showCpicLevel,
  showPharmgkbId,
  onClick,
}: GeneResultItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-start gap-3 px-3 py-2.5 text-left rounded-lg',
        'transition-colors duration-100',
        isSelected
          ? 'bg-emerald-500/10 dark:bg-emerald-500/20'
          : 'hover:bg-gray-100 dark:hover:bg-white/5'
      )}
    >
      {/* Gene icon */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5',
          getCpicLevelBgColor(gene.cpicLevel),
          getCpicLevelColor(gene.cpicLevel)
        )}
      >
        {getCpicIcon(gene.cpicLevel)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
            {gene.symbol}
          </span>
          {showCpicLevel && gene.cpicLevel && (
            <span
              className={cn(
                'text-xs font-medium px-1.5 py-0.5 rounded',
                getCpicLevelBgColor(gene.cpicLevel),
                getCpicLevelColor(gene.cpicLevel)
              )}
            >
              CPIC {gene.cpicLevel}
            </span>
          )}
          {gene.hasCpicGuideline && (
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
          )}
        </div>
        <div className="text-sm text-[#86868b] truncate mt-0.5">
          {gene.name}
        </div>
        {showPharmgkbId && (
          <div className="text-xs text-[#86868b]/70 font-mono mt-1">
            {gene.pharmgkbId}
          </div>
        )}
      </div>

      {/* Selection indicator */}
      <div className="flex-shrink-0">
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </button>
  );
}

interface SelectedGeneProps {
  gene: PharmacogeneMini;
  onClear: () => void;
  disabled: boolean;
}

function SelectedGene({ gene, onClear, disabled }: SelectedGeneProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg border border-emerald-500/20">
      {/* Gene icon */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
          'bg-emerald-500/20',
          'text-emerald-500'
        )}
      >
        <Dna className="w-4 h-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {gene.symbol}
          </span>
          {gene.cpicLevel && (
            <span className="text-xs text-emerald-500/70">
              CPIC {gene.cpicLevel}
            </span>
          )}
        </div>
        <div className="text-xs text-[#86868b] truncate">
          {gene.name}
        </div>
      </div>

      {/* Clear button */}
      {!disabled && (
        <button
          type="button"
          onClick={onClear}
          className="flex-shrink-0 p-1 rounded-full hover:bg-emerald-500/20 text-emerald-500"
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

export const PharmgkbPicker = forwardRef<HTMLInputElement, PharmgkbPickerProps>(
  function PharmgkbPicker(
    {
      value,
      onChange,
      placeholder = 'Search pharmacogenes...',
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      minSearchLength = 2,
      maxResults = 10,
      debounce = 300,
      cpicLevel,
      hasGuideline,
      showCpicLevel = true,
      showPharmgkbId = false,
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
    const { search, results, isLoading, query, clear } = usePharmgkbSearch({
      debounce,
      minLength: minSearchLength,
      limit: maxResults,
      cpicLevel,
      hasGuideline,
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
      (gene: PharmacogeneMini) => {
        onChange?.(gene);
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
              handleSelect(items[selectedIndex].gene);
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

        {/* Selected gene or input */}
        {value && !isOpen ? (
          <SelectedGene
            gene={value}
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
                'focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500',
                error &&
                  'border-red-500 focus:ring-red-500/50 focus:border-red-500',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label={label || 'Search pharmacogenes'}
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
                  <span>Searching PharmGKB...</span>
                </div>
              )}

              {/* Results list */}
              {results?.results && results.results.length > 0 && (
                <div className="max-h-[350px] overflow-y-auto p-1.5">
                  {results.results.slice(0, maxResults).map((result, index) => (
                    <GeneResultItem
                      key={result.gene.pharmgkbId}
                      gene={result.gene}
                      isSelected={index === selectedIndex}
                      showCpicLevel={showCpicLevel}
                      showPharmgkbId={showPharmgkbId}
                      onClick={() => handleSelect(result.gene)}
                    />
                  ))}
                </div>
              )}

              {/* No results */}
              {!isLoading && query && results?.results.length === 0 && (
                <div className="py-8 text-center text-[#86868b]">
                  <Dna className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No pharmacogenes found for "{query}"</p>
                </div>
              )}

              {/* Footer */}
              {results?.results && results.results.length > 0 && (
                <div className="px-3 py-2 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs text-[#86868b]">
                  <span>{results.total} genes</span>
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

export default PharmgkbPicker;
