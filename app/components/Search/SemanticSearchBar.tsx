'use client';

/**
 * SEMANTIC SEARCH BAR COMPONENT
 * =============================
 *
 * Enhanced search bar with:
 * - Real-time suggestions as user types
 * - Highlighted matched terms
 * - Category badges for results
 * - Faceted filtering
 * - Support for medical abbreviations and synonyms
 * - Keyboard navigation
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import {
  Search,
  X,
  Pill,
  Heart,
  Calculator,
  FileText,
  Activity,
  Filter,
  ChevronDown,
  ChevronUp,
  Loader2,
  Clock,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import {
  getSearchIndex,
  semanticSearchQuery,
  getSearchSuggestions,
  getSearchFacets,
  type SearchResult,
  type SearchFilters,
  type SearchEntityType,
} from '@/lib/search/semantic-search';
import { expandAbbreviation, getTermMetadata } from '@/lib/search/medical-synonyms';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface SemanticSearchBarProps {
  /** Show as modal overlay */
  modal?: boolean;
  /** Callback when modal should close */
  onClose?: () => void;
  /** Initial search query */
  initialQuery?: string;
  /** Placeholder text override */
  placeholder?: string;
  /** Preset filters */
  presetFilters?: SearchFilters;
  /** Show filter panel */
  showFilters?: boolean;
  /** Compact mode (smaller padding) */
  compact?: boolean;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Callback when result is selected */
  onResultSelect?: (result: SearchResult) => void;
}

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const ENTITY_CONFIG: Record<
  SearchEntityType,
  { icon: typeof Heart; color: string; bgColor: string; label: string; labelEn: string }
> = {
  disease: {
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    label: 'Doenca',
    labelEn: 'Disease',
  },
  medication: {
    icon: Pill,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    label: 'Medicamento',
    labelEn: 'Medication',
  },
  calculator: {
    icon: Calculator,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    label: 'Calculadora',
    labelEn: 'Calculator',
  },
  protocol: {
    icon: FileText,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    label: 'Protocolo',
    labelEn: 'Protocol',
  },
  symptom: {
    icon: Activity,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    label: 'Sintoma',
    labelEn: 'Symptom',
  },
  exam: {
    icon: FileText,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    label: 'Exame',
    labelEn: 'Exam',
  },
};

const ENTITY_ROUTES: Record<SearchEntityType, string> = {
  medication: '/medicamentos',
  disease: '/doencas',
  protocol: '/protocolos',
  calculator: '/calculadoras',
  symptom: '/sintomas',
  exam: '/exames',
};

const SEARCH_HISTORY_KEY = 'darwin-semantic-search-history';
const MAX_HISTORY_ITEMS = 10;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function highlightText(
  text: string,
  query: string
): { text: string; highlighted: boolean }[] {
  if (!query || query.length < 2) {
    return [{ text, highlighted: false }];
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: { text: string; highlighted: boolean }[] = [];
  let lastIndex = 0;

  let index = lowerText.indexOf(lowerQuery);
  while (index !== -1) {
    // Add non-highlighted part
    if (index > lastIndex) {
      parts.push({
        text: text.substring(lastIndex, index),
        highlighted: false,
      });
    }

    // Add highlighted part
    parts.push({
      text: text.substring(index, index + query.length),
      highlighted: true,
    });

    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      highlighted: false,
    });
  }

  return parts.length > 0 ? parts : [{ text, highlighted: false }];
}

function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveSearchHistory(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return;
  try {
    const history = getSearchHistory();
    const filtered = history.filter(
      item => item.query.toLowerCase() !== query.toLowerCase()
    );
    filtered.unshift({ query: query.trim(), timestamp: Date.now() });
    const limited = filtered.slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(limited));
  } catch {
    // Ignore localStorage errors
  }
}

function clearSearchHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch {
    // Ignore
  }
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function SemanticSearchBar({
  modal = false,
  onClose,
  initialQuery = '',
  placeholder,
  presetFilters,
  showFilters = true,
  compact = false,
  autoFocus = false,
  onResultSelect,
}: SemanticSearchBarProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('common');

  // State
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [expandedAbbrev, setExpandedAbbrev] = useState<string | null>(null);

  // Filters
  const [filters, setFilters] = useState<SearchFilters>(presetFilters || {});

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Load history on mount
  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  // Auto-focus
  useEffect(() => {
    if (autoFocus || modal) {
      inputRef.current?.focus();
    }
  }, [autoFocus, modal]);

  // Debounced search
  const performSearch = useCallback(
    (searchQuery: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (!searchQuery || searchQuery.trim().length < 2) {
        setResults([]);
        setSuggestions([]);
        setExpandedAbbrev(null);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      // Check for abbreviation expansion
      const expanded = expandAbbreviation(searchQuery);
      setExpandedAbbrev(expanded);

      searchTimeoutRef.current = setTimeout(() => {
        // Get search results
        const searchResults = semanticSearchQuery(searchQuery, {
          filters,
          limit: 20,
          expandSynonyms: true,
        });

        setResults(searchResults);

        // Get suggestions
        const suggestionList = getSearchSuggestions(searchQuery, 5);
        setSuggestions(suggestionList);

        setIsSearching(false);
        setSelectedIndex(-1);
      }, 200);
    },
    [filters]
  );

  // Handle query change
  const handleQueryChange = (value: string) => {
    setQuery(value);
    performSearch(value);
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    saveSearchHistory(query);
    setHistory(getSearchHistory());

    if (onResultSelect) {
      onResultSelect(result);
    }

    if (onClose) {
      onClose();
    }

    const baseRoute = ENTITY_ROUTES[result.type] || '/busca';
    router.push(`${baseRoute}/${result.id}`);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performSearch(suggestion);
    inputRef.current?.focus();
  };

  // Handle history click
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    performSearch(historyQuery);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = results.length;

    if (e.key === 'Escape') {
      if (query) {
        setQuery('');
        setResults([]);
        setSuggestions([]);
      } else if (onClose) {
        onClose();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < totalItems - 1 ? prev + 1 : prev));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      } else if (results.length > 0) {
        handleResultClick(results[0]);
      }
    }
  };

  // Toggle filter
  const toggleTypeFilter = (type: SearchEntityType) => {
    setFilters(prev => {
      const currentTypes = prev.types || [];
      const newTypes = currentTypes.includes(type)
        ? currentTypes.filter(t => t !== type)
        : [...currentTypes, type];
      return { ...prev, types: newTypes.length > 0 ? newTypes : undefined };
    });
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({});
    performSearch(query);
  };

  // Get facets for current results
  const facets = useMemo(() => {
    if (results.length === 0) return null;
    return getSearchFacets(results);
  }, [results]);

  // Labels based on locale
  const labels = useMemo(
    () => ({
      placeholder:
        placeholder ||
        (locale === 'pt'
          ? 'Buscar doencas, medicamentos, calculadoras...'
          : 'Search diseases, medications, calculators...'),
      noResults:
        locale === 'pt'
          ? 'Nenhum resultado encontrado'
          : 'No results found',
      trySearching:
        locale === 'pt'
          ? 'Tente buscar por nome, codigo (CID-10, CIAP-2) ou sinonimo'
          : 'Try searching by name, code (ICD-10, ICPC-2) or synonym',
      recentSearches:
        locale === 'pt' ? 'Buscas recentes' : 'Recent searches',
      suggestions: locale === 'pt' ? 'Sugestoes' : 'Suggestions',
      filters: locale === 'pt' ? 'Filtros' : 'Filters',
      clearFilters:
        locale === 'pt' ? 'Limpar filtros' : 'Clear filters',
      clearHistory:
        locale === 'pt' ? 'Limpar historico' : 'Clear history',
      expandedFrom: locale === 'pt' ? 'Expandido de' : 'Expanded from',
      availableSUS: locale === 'pt' ? 'Disponivel SUS' : 'Available SUS',
      resultsCount: (count: number) =>
        locale === 'pt'
          ? `${count} ${count === 1 ? 'resultado' : 'resultados'}`
          : `${count} ${count === 1 ? 'result' : 'results'}`,
    }),
    [locale, placeholder]
  );

  // Render highlighted text
  const renderHighlightedText = (text: string) => {
    const parts = highlightText(text, query);
    return (
      <>
        {parts.map((part, index) =>
          part.highlighted ? (
            <mark
              key={index}
              className="bg-yellow-200 dark:bg-yellow-700 font-medium rounded px-0.5"
            >
              {part.text}
            </mark>
          ) : (
            <span key={index}>{part.text}</span>
          )
        )}
      </>
    );
  };

  // Render result item
  const renderResultItem = (result: SearchResult, index: number) => {
    const config = ENTITY_CONFIG[result.type];
    const Icon = config.icon;
    const isSelected = index === selectedIndex;
    const typeLabel = locale === 'pt' ? config.label : config.labelEn;

    return (
      <button
        key={result.id}
        onClick={() => handleResultClick(result)}
        className={`
          w-full text-left px-4 py-3 transition-colors
          ${
            isSelected
              ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-4 border-transparent'
          }
        `}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${config.bgColor}`}>
            <Icon className={`w-4 h-4 ${config.color}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                {renderHighlightedText(result.title)}
              </span>

              {/* Category badge */}
              <span
                className={`
                  px-2 py-0.5 text-xs font-medium rounded-full shrink-0
                  ${config.bgColor} ${config.color}
                `}
              >
                {typeLabel}
              </span>

              {/* SUS badge */}
              {result.metadata.availableSUS && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 shrink-0">
                  SUS
                </span>
              )}

              {/* Pregnancy category */}
              {result.metadata.pregnancyCategory && (
                <span
                  className={`
                    px-2 py-0.5 text-xs font-medium rounded-full shrink-0
                    ${
                      result.metadata.pregnancyCategory === 'A' ||
                      result.metadata.pregnancyCategory === 'B'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : result.metadata.pregnancyCategory === 'C'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }
                  `}
                >
                  Cat. {result.metadata.pregnancyCategory}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
              {renderHighlightedText(result.description || result.category)}
            </p>

            {/* Codes */}
            {result.codes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {result.codes.slice(0, 3).map((code, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded"
                  >
                    {code}
                  </span>
                ))}
                {result.codes.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{result.codes.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Expanded from indicator */}
            {result.expandedFrom && (
              <div className="flex items-center gap-1 mt-1 text-xs text-purple-600 dark:text-purple-400">
                <Sparkles className="w-3 h-3" />
                <span>
                  {labels.expandedFrom}: &quot;{result.expandedFrom}&quot;
                </span>
              </div>
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div
      className={`
        ${modal ? 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20' : ''}
      `}
      onClick={modal ? onClose : undefined}
    >
      <div
        className={`
          ${modal ? 'w-full max-w-2xl mx-4' : 'w-full'}
          bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700
          ${compact ? '' : 'min-h-[200px]'}
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${compact ? 'p-3' : ''}`}>
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={labels.placeholder}
                className={`
                  w-full pl-10 pr-10 bg-gray-50 dark:bg-gray-800
                  border border-gray-300 dark:border-gray-600 rounded-lg
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  text-gray-900 dark:text-gray-100 placeholder-gray-500
                  ${compact ? 'py-2 text-sm' : 'py-3 text-base'}
                `}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" />
              )}
              {!isSearching && query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setResults([]);
                    setSuggestions([]);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Abbreviation expansion indicator */}
          {expandedAbbrev && (
            <div className="mt-2 flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
              <Sparkles className="w-4 h-4" />
              <span>
                {labels.expandedFrom} &quot;{query.toUpperCase()}&quot;:{' '}
                <strong>{expandedAbbrev}</strong>
              </span>
            </div>
          )}

          {/* Filter toggle */}
          {showFilters && (
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <Filter className="w-4 h-4" />
                {labels.filters}
                {showFilterPanel ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {filters.types && filters.types.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                    {filters.types.length}
                  </span>
                )}
              </button>

              {(filters.types?.length || 0) > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-600 dark:text-red-400 hover:underline"
                >
                  {labels.clearFilters}
                </button>
              )}
            </div>
          )}

          {/* Filter panel */}
          {showFilterPanel && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(ENTITY_CONFIG) as SearchEntityType[]).map(type => {
                  const config = ENTITY_CONFIG[type];
                  const Icon = config.icon;
                  const isActive = filters.types?.includes(type);
                  const typeLabel = locale === 'pt' ? config.label : config.labelEn;

                  return (
                    <button
                      key={type}
                      onClick={() => toggleTypeFilter(type)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                        ${
                          isActive
                            ? `${config.bgColor} ${config.color}`
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {typeLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div
          ref={resultsRef}
          className={`overflow-y-auto ${modal ? 'max-h-[60vh]' : 'max-h-96'}`}
        >
          {/* No query - show history and suggestions */}
          {!query && history.length > 0 && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {labels.recentSearches}
                </h3>
                <button
                  onClick={() => {
                    clearSearchHistory();
                    setHistory([]);
                  }}
                  className="text-xs text-red-600 dark:text-red-400 hover:underline"
                >
                  {labels.clearHistory}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHistoryClick(item.query)}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {item.query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {query && suggestions.length > 0 && results.length > 0 && (
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {labels.suggestions}
              </h3>
              <div className="flex flex-wrap gap-1">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded text-blue-700 dark:text-blue-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results count */}
          {query && results.length > 0 && (
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
              {labels.resultsCount(results.length)}
            </div>
          )}

          {/* Results list */}
          {query && results.length > 0 && (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {results.map((result, index) => renderResultItem(result, index))}
            </div>
          )}

          {/* No results */}
          {query && !isSearching && results.length === 0 && (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {labels.noResults}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {labels.trySearching}
              </p>
            </div>
          )}
        </div>

        {/* Footer with keyboard shortcuts */}
        {modal && (
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border text-xs">
                    {'\u2191\u2193'}
                  </kbd>{' '}
                  {locale === 'pt' ? 'Navegar' : 'Navigate'}
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border text-xs">
                    Enter
                  </kbd>{' '}
                  {locale === 'pt' ? 'Selecionar' : 'Select'}
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border text-xs">
                    Esc
                  </kbd>{' '}
                  {locale === 'pt' ? 'Fechar' : 'Close'}
                </span>
              </div>
              <div>
                {(() => {
                  const index = getSearchIndex();
                  const stats = index.getStats();
                  return (
                    <span>
                      {stats.totalDocuments.toLocaleString()}{' '}
                      {locale === 'pt' ? 'itens indexados' : 'indexed items'}
                    </span>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
