/**
 * GLOBAL SEARCH COMPONENT
 * =======================
 *
 * Unified search across all Darwin-MFC entities
 * Medications, Diseases, Protocols, Calculators, Cases
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  search,
  searchSuggestions,
  getSearchHistory,
  saveSearchToHistory,
  clearSearchHistory,
  getSearchStats,
  type SearchResult,
  type EntityType,
  type SearchOptions,
} from '@/lib/search/searchIndex';
import {
  searchWithSynonyms,
  isCodeQuery,
  searchByCode,
  getSpellingSuggestions,
  getRelatedSearches,
  highlightMatches,
  getSavedSearches,
  saveSearch,
  deleteSavedSearch,
  type SpellingSuggestion,
  type SavedSearch,
} from '@/lib/search/advancedSearch';
import VoiceSearch from './VoiceSearch';

interface GlobalSearchProps {
  /** Show as modal overlay */
  modal?: boolean;

  /** Callback when modal should close */
  onClose?: () => void;

  /** Initial search query */
  initialQuery?: string;

  /** Preset filters */
  presetFilters?: Partial<SearchOptions>;
}

const ENTITY_ICONS: Record<EntityType, string> = {
  medication: '💊',
  disease: '🦠',
  protocol: '📋',
  calculator: '🧮',
  case: '📁',
  rastreamento: '🔍',
};

const ENTITY_ROUTES: Record<EntityType, string> = {
  medication: '/medicamentos',
  disease: '/doencas',
  protocol: '/protocolos',
  calculator: '/calculadoras',
  case: '/casos-clinicos',
  rastreamento: '/rastreamento-sus',
};

export default function GlobalSearch({
  modal = false,
  onClose,
  initialQuery = '',
  presetFilters,
}: GlobalSearchProps) {
  const t = useTranslations('common');
  const router = useRouter();

  // State
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [spellingSuggestions, setSpellingSuggestions] = useState<SpellingSuggestion[]>([]);
  const [relatedSearches, setRelatedSearches] = useState<string[]>([]);
  const [history, setHistory] = useState(getSearchHistory());
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(getSavedSearches());
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');

  // Filters
  const [selectedTypes, setSelectedTypes] = useState<EntityType[]>(
    presetFilters?.types || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    presetFilters?.categories || []
  );

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Focus input on mount
  useEffect(() => {
    if (modal) {
      inputRef.current?.focus();
    }
  }, [modal]);

  // Debounced search with advanced features
  const performSearch = useCallback((searchQuery: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setSuggestions([]);
      setSpellingSuggestions([]);
      setRelatedSearches([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(() => {
      let searchResults: SearchResult[];

      // Check if query is a CID-10 or ATC code
      if (isCodeQuery(searchQuery)) {
        // Direct code lookup
        searchResults = searchByCode(searchQuery);
      } else {
        // Semantic search with synonym expansion
        searchResults = searchWithSynonyms({
          query: searchQuery,
          types: selectedTypes.length > 0 ? selectedTypes : undefined,
          categories: selectedCategories.length > 0 ? selectedCategories : undefined,
          limit: 50,
        });
      }

      setResults(searchResults);

      // Get spelling suggestions if results are poor
      if (searchResults.length < 3) {
        const suggestions = getSpellingSuggestions(searchQuery);
        setSpellingSuggestions(suggestions);
      } else {
        setSpellingSuggestions([]);
      }

      // Get related searches
      const related = getRelatedSearches(searchQuery, 5);
      setRelatedSearches(related);

      // Get suggestions
      const suggestionList = searchSuggestions(searchQuery, 5);
      setSuggestions(suggestionList);

      // Save to history
      saveSearchToHistory(searchQuery, searchResults.length);
      setHistory(getSearchHistory());

      setIsSearching(false);
      setSelectedIndex(0);
    }, 300); // 300ms debounce
  }, [selectedTypes, selectedCategories]);

  // Handle query change
  const handleQueryChange = (value: string) => {
    setQuery(value);
    performSearch(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (query) {
        setQuery('');
        setResults([]);
      } else if (onClose) {
        onClose();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    }

    if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        handleResultClick(selected);
      }
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    const baseRoute = ENTITY_ROUTES[result.type];
    const url = `${baseRoute}/${result.id}`;

    if (onClose) {
      onClose();
    }

    router.push(url);
  };

  // Handle history click
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    performSearch(historyQuery);
    inputRef.current?.focus();
  };

  // Clear history
  const handleClearHistory = () => {
    clearSearchHistory();
    setHistory([]);
  };

  // Toggle filter
  const toggleType = (type: EntityType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Handle voice search result
  const handleVoiceResult = (transcript: string) => {
    setQuery(transcript);
    performSearch(transcript);
  };

  // Handle spelling suggestion click
  const handleSpellingSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  // Handle related search click
  const handleRelatedSearchClick = (related: string) => {
    setQuery(related);
    performSearch(related);
  };

  // Save current search
  const handleSaveSearch = () => {
    if (!saveSearchName || !query) return;

    saveSearch(saveSearchName, query, {
      types: selectedTypes.length > 0 ? selectedTypes : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    });

    setSavedSearches(getSavedSearches());
    setSaveSearchName('');
    setShowSavedSearches(false);
  };

  // Load saved search
  const handleLoadSavedSearch = (saved: SavedSearch) => {
    setQuery(saved.query);
    setSelectedTypes(saved.filters.types || []);
    setSelectedCategories(saved.filters.categories || []);
    performSearch(saved.query);
    setShowSavedSearches(false);
  };

  // Delete saved search
  const handleDeleteSavedSearch = (id: string) => {
    deleteSavedSearch(id);
    setSavedSearches(getSavedSearches());
  };

  // Get stats
  const stats = getSearchStats();

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<EntityType, SearchResult[]>);

  // Render highlighted text
  const renderHighlightedText = (text: string) => {
    if (!query) return text;

    const matches = highlightMatches(text, query);
    return (
      <>
        {matches.map((match, index) =>
          match.highlighted ? (
            <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 font-semibold">
              {match.text}
            </mark>
          ) : (
            <span key={index}>{match.text}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      className={`
        ${modal ? 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm' : ''}
      `}
      onClick={modal ? onClose : undefined}
    >
      <div
        className={`
          ${modal ? 'absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl' : 'w-full'}
          bg-white dark:bg-gray-900 rounded-lg shadow-2xl
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('search.placeholder') || 'Buscar medicamentos, doenças, protocolos...'}
                className="w-full pl-12 pr-4 py-3 text-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </div>
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
                </div>
              )}
            </div>

            {/* Voice Search */}
            <VoiceSearch onResult={handleVoiceResult} language="pt-BR" />
          </div>

          {/* Action Buttons */}
          <div className="mt-2 flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showFilters ? '▼' : '▶'} Filtros
              {(selectedTypes.length > 0 || selectedCategories.length > 0) && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 rounded-full text-xs">
                  {selectedTypes.length + selectedCategories.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowSavedSearches(!showSavedSearches)}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              {showSavedSearches ? '▼' : '▶'} Buscas Salvas
              {savedSearches.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-purple-100 dark:bg-purple-900 rounded-full text-xs">
                  {savedSearches.length}
                </span>
              )}
            </button>

            {query && (
              <button
                onClick={() => setShowSavedSearches(true)}
                className="text-sm text-green-600 dark:text-green-400 hover:underline"
                title="Salvar esta busca"
              >
                💾 Salvar
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Tipo de conteúdo
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(ENTITY_ICONS).map(([type, icon]) => (
                    <button
                      key={type}
                      onClick={() => toggleType(type as EntityType)}
                      className={`
                        px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                        ${selectedTypes.includes(type as EntityType)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      {icon} {type}
                      {stats.byType[type as EntityType] && (
                        <span className="ml-1 opacity-70">
                          ({stats.byType[type as EntityType]})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Saved Searches */}
          {showSavedSearches && (
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                  💾 Buscas Salvas
                </h3>
              </div>

              {/* Save current search form */}
              {query && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={saveSearchName}
                    onChange={e => setSaveSearchName(e.target.value)}
                    placeholder="Nome para esta busca..."
                    className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-purple-950 border border-purple-300 dark:border-purple-700 rounded"
                  />
                  <button
                    onClick={handleSaveSearch}
                    disabled={!saveSearchName}
                    className="px-3 py-1.5 bg-green-600 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
                  >
                    Salvar
                  </button>
                </div>
              )}

              {/* Saved searches list */}
              {savedSearches.length > 0 ? (
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {savedSearches.map(saved => (
                    <div
                      key={saved.id}
                      className="flex items-center justify-between p-2 bg-white dark:bg-purple-950 rounded hover:bg-purple-100 dark:hover:bg-purple-900"
                    >
                      <button
                        onClick={() => handleLoadSavedSearch(saved)}
                        className="flex-1 text-left text-sm"
                      >
                        <div className="font-medium text-purple-900 dark:text-purple-100">
                          {saved.name}
                        </div>
                        <div className="text-xs text-purple-700 dark:text-purple-300">
                          {saved.query}
                        </div>
                      </button>
                      <button
                        onClick={() => handleDeleteSavedSearch(saved.id)}
                        className="ml-2 p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title="Deletar"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-purple-700 dark:text-purple-300 text-center py-2">
                  Nenhuma busca salva ainda
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* No query - show history */}
          {!query && history.length > 0 && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  📜 Buscas recentes
                </h3>
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-red-600 hover:underline"
                >
                  Limpar
                </button>
              </div>
              <div className="space-y-1">
                {history.slice(0, 10).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(item.query)}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-gray-100">
                        {item.query}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.resultsCount} resultados
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spelling Suggestions */}
          {query && spellingSuggestions.length > 0 && (
            <div className="px-4 pt-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                  💡 Você quis dizer:
                </div>
                <div className="flex flex-wrap gap-2">
                  {spellingSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSpellingSuggestionClick(suggestion.suggestion)}
                      className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-full text-sm text-yellow-900 dark:text-yellow-100 font-medium"
                    >
                      {suggestion.suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {query && results.length > 0 && (
            <div className="p-4 space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </div>

              {Object.entries(groupedResults).map(([type, typeResults]) => (
                <div key={type}>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    {ENTITY_ICONS[type as EntityType]}
                    {type}
                    <span className="text-xs font-normal text-gray-500">
                      ({typeResults.length})
                    </span>
                  </h3>
                  <div className="space-y-1">
                    {typeResults.map((result, index) => {
                      const globalIndex = results.indexOf(result);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className={`
                            w-full text-left px-4 py-3 rounded-lg transition-colors
                            ${isSelected
                              ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-transparent'
                            }
                          `}
                        >
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {renderHighlightedText(result.title)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                            {renderHighlightedText(result.description)}
                          </div>
                          {result.category && (
                            <div className="mt-2">
                              <span className="inline-block px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                                {result.category}
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Related Searches */}
              {relatedSearches.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    🔗 Buscas relacionadas
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {relatedSearches.map((related, index) => (
                      <button
                        key={index}
                        onClick={() => handleRelatedSearchClick(related)}
                        className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full text-sm text-blue-700 dark:text-blue-300"
                      >
                        {related}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No results */}
          {query && !isSearching && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-lg font-medium mb-2">
                Nenhum resultado encontrado
              </div>
              <div className="text-sm">
                Tente buscar por outro termo ou ajuste os filtros
              </div>
            </div>
          )}
        </div>

        {/* Footer with shortcuts */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-600 dark:text-gray-400 flex items-center justify-between rounded-b-lg">
          <div className="flex items-center gap-4">
            <span><kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border">↑↓</kbd> Navegar</span>
            <span><kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border">Enter</kbd> Selecionar</span>
            <span><kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border">Esc</kbd> Fechar</span>
          </div>
          <div>
            {stats.total.toLocaleString()} itens indexados
          </div>
        </div>
      </div>
    </div>
  );
}
