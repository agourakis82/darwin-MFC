import React, { useState, useMemo } from 'react';
import { Search, TestTube2, X } from 'lucide-react';
import { searchLOINC, type LOINCCode, type LOINCSearchResult } from '@/lib/types/loinc';

export interface LabSearchProps {
  onSelect: (code: LOINCCode) => void;
  placeholder?: string;
  selectedCodes?: LOINCCode[];
  onRemove?: (code: LOINCCode) => void;
  maxResults?: number;
  category?: string;
}

export function LabSearch({
  onSelect,
  placeholder = 'Buscar exame (nome ou código LOINC)...',
  selectedCodes = [],
  onRemove,
  maxResults = 10,
  category,
}: LabSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const searchResults = useMemo(() => {
    if (!query || query.trim().length < 2) return [];

    let results = searchLOINC(query);

    // Filter by category if specified
    if (category) {
      results = results.filter(r => r.code.class === category);
    }

    // Filter out already selected codes
    const selectedCodeIds = new Set(selectedCodes.map(c => c.code));
    results = results.filter(r => !selectedCodeIds.has(r.code.code));

    return results.slice(0, maxResults);
  }, [query, category, selectedCodes, maxResults]);

  const handleSelect = (result: LOINCSearchResult) => {
    onSelect(result.code);
    setQuery('');
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (searchResults[highlightedIndex]) {
          handleSelect(searchResults[highlightedIndex]);
        }
        break;
      case 'Escape':
        setQuery('');
        setIsFocused(false);
        break;
    }
  };

  const showResults = isFocused && searchResults.length > 0;

  return (
    <div className="w-full">
      {/* Search input */}
      <div className="relative">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            size={18}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Search results dropdown */}
        {showResults && (
          <div className="absolute z-50 w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={result.code.code}
                onClick={() => handleSelect(result)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  index === highlightedIndex
                    ? 'bg-blue-500/20 border-l-2 border-blue-500'
                    : 'hover:bg-neutral-700/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <TestTube2 className="flex-shrink-0 text-blue-400 mt-0.5" size={16} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-neutral-200 text-sm">
                        {result.code.namePt || result.code.shortName}
                      </p>
                      <span className="flex-shrink-0 px-2 py-0.5 bg-neutral-700 rounded text-xs text-neutral-400 font-mono">
                        {result.code.code}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                      {result.code.longCommonName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-neutral-500">{result.code.class}</span>
                      {result.code.referenceRange && (
                        <>
                          <span className="text-neutral-600">•</span>
                          <span className="text-xs text-neutral-500">
                            {result.code.referenceRange.low}-{result.code.referenceRange.high}{' '}
                            {result.code.referenceRange.unit}
                          </span>
                        </>
                      )}
                      <span className="text-neutral-600">•</span>
                      <span className="text-xs text-blue-400">
                        Match: {Math.round(result.matchScore * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected codes */}
      {selectedCodes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedCodes.map((code) => (
            <div
              key={code.code}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300"
            >
              <TestTube2 size={14} />
              <span>{code.namePt || code.shortName}</span>
              <span className="text-blue-400/60 text-xs">({code.code})</span>
              {onRemove && (
                <button
                  onClick={() => onRemove(code)}
                  className="ml-1 hover:text-blue-100 transition-colors"
                  aria-label={`Remove ${code.namePt || code.shortName}`}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Helper text */}
      {!isFocused && query.length === 0 && (
        <p className="mt-2 text-xs text-neutral-500">
          Digite pelo menos 2 caracteres para buscar. Exemplos: "glicemia", "hemograma", "2345-7"
        </p>
      )}
    </div>
  );
}
