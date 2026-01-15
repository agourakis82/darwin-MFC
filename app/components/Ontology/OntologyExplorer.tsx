'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Search,
  X,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Database,
  Dna,
  TestTube,
  Pill,
  Activity,
  Info,
  Loader2,
} from 'lucide-react';
import {
  unifiedSearch,
  type UnifiedSearchResult,
  type UnifiedSearchOptions,
} from '@/lib/ontology/unified-search';
import type { OntologySystem } from '@/lib/ontology/types/ontology';

// =============================================================================
// TYPES
// =============================================================================

interface OntologyExplorerProps {
  /** Initial search query */
  initialQuery?: string;
  /** Filter by entity types */
  filterTypes?: UnifiedSearchOptions['types'];
  /** Maximum results to show */
  maxResults?: number;
  /** Callback when a result is selected */
  onSelect?: (result: UnifiedSearchResult) => void;
  /** Compact mode for embedding */
  compact?: boolean;
}

interface CodeBadgeProps {
  system: OntologySystem | string;
  code: string;
  onCopy?: () => void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const ONTOLOGY_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string; icon: React.ElementType }
> = {
  icd10: {
    label: 'ICD-10',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/40',
    icon: Activity,
  },
  icd11: {
    label: 'ICD-11',
    color: 'text-indigo-700 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
    icon: Activity,
  },
  'snomed-ct': {
    label: 'SNOMED-CT',
    color: 'text-purple-700 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/40',
    icon: Database,
  },
  ciap2: {
    label: 'CIAP-2',
    color: 'text-teal-700 dark:text-teal-400',
    bgColor: 'bg-teal-100 dark:bg-teal-900/40',
    icon: Activity,
  },
  loinc: {
    label: 'LOINC',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/40',
    icon: TestTube,
  },
  doid: {
    label: 'DOID',
    color: 'text-rose-700 dark:text-rose-400',
    bgColor: 'bg-rose-100 dark:bg-rose-900/40',
    icon: Activity,
  },
  mesh: {
    label: 'MeSH',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
    icon: Database,
  },
  umls: {
    label: 'UMLS',
    color: 'text-cyan-700 dark:text-cyan-400',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/40',
    icon: Database,
  },
  atc: {
    label: 'ATC',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/40',
    icon: Pill,
  },
  pharmgkb: {
    label: 'PharmGKB',
    color: 'text-pink-700 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/40',
    icon: Dna,
  },
};

const TYPE_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  disease: { label: 'Doenca', color: 'text-red-600', icon: Activity },
  medication: { label: 'Medicamento', color: 'text-green-600', icon: Pill },
  'lab-test': { label: 'Exame', color: 'text-amber-600', icon: TestTube },
  gene: { label: 'Gene', color: 'text-purple-600', icon: Dna },
  procedure: { label: 'Procedimento', color: 'text-blue-600', icon: Activity },
};

// =============================================================================
// COMPONENTS
// =============================================================================

function CodeBadge({ system, code, onCopy }: CodeBadgeProps) {
  const [copied, setCopied] = useState(false);
  const config = ONTOLOGY_CONFIG[system] || {
    label: system.toUpperCase(),
    color: 'text-gray-700 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    icon: Database,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
        ${config.bgColor} ${config.color}
        text-xs font-medium
        border border-current/10
        hover:border-current/30
        transition-colors duration-200
        group
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title={`Copiar ${config.label}: ${code}`}
    >
      <config.icon className="w-3 h-3 opacity-70" />
      <span className="font-mono">{code}</span>
      {copied ? (
        <Check className="w-3 h-3 text-green-500" />
      ) : (
        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-opacity" />
      )}
    </motion.button>
  );
}

function ResultCard({
  result,
  onSelect,
  compact,
}: {
  result: UnifiedSearchResult;
  onSelect?: (result: UnifiedSearchResult) => void;
  compact?: boolean;
}) {
  const typeConfig = TYPE_CONFIG[result.type] || TYPE_CONFIG.disease;
  const TypeIcon = typeConfig.icon;

  // Collect all available codes
  const codes: Array<{ system: string; codes: string[] }> = [];

  if (result.codes.icd10?.length) {
    codes.push({ system: 'icd10', codes: result.codes.icd10 });
  }
  if (result.codes.icd11?.length) {
    codes.push({ system: 'icd11', codes: result.codes.icd11 });
  }
  if (result.codes.snomedCT) {
    codes.push({ system: 'snomed-ct', codes: [result.codes.snomedCT] });
  }
  if (result.codes.ciap2?.length) {
    codes.push({ system: 'ciap2', codes: result.codes.ciap2 });
  }
  if (result.codes.loinc) {
    codes.push({ system: 'loinc', codes: [result.codes.loinc] });
  }
  if (result.codes.doid) {
    codes.push({ system: 'doid', codes: [result.codes.doid] });
  }
  if (result.codes.meshId) {
    codes.push({ system: 'mesh', codes: [result.codes.meshId] });
  }
  if (result.codes.umlsCui) {
    codes.push({ system: 'umls', codes: [result.codes.umlsCui] });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        group
        bg-white dark:bg-[#1c1c1e]
        border border-gray-200 dark:border-white/10
        rounded-xl
        ${compact ? 'p-3' : 'p-4'}
        hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700
        transition-all duration-200
        cursor-pointer
      `}
      onClick={() => onSelect?.(result)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={`
              flex-shrink-0 w-10 h-10 rounded-xl
              bg-gradient-to-br from-blue-500/10 to-purple-500/10
              flex items-center justify-center
              ${typeConfig.color}
            `}
          >
            <TypeIcon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
              {result.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`
                  text-xs font-medium px-2 py-0.5 rounded-full
                  bg-gray-100 dark:bg-gray-800
                  ${typeConfig.color}
                `}
              >
                {typeConfig.label}
              </span>
              <span className="text-xs text-[#86868b]">
                Score: {result.score}%
              </span>
            </div>
          </div>
        </div>
        <ChevronRight
          className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0"
        />
      </div>

      {/* Description */}
      {result.description && !compact && (
        <p className="text-sm text-[#86868b] mb-3 line-clamp-2">
          {result.description}
        </p>
      )}

      {/* Code Mappings */}
      <div className="flex flex-wrap gap-2">
        {codes.map((codeGroup) =>
          codeGroup.codes.map((code) => (
            <CodeBadge key={`${codeGroup.system}-${code}`} system={codeGroup.system} code={code} />
          ))
        )}
      </div>

      {/* Related entities hint */}
      {result.related && result.related.length > 0 && !compact && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-[#86868b]">
            <Info className="w-3 h-3 inline mr-1" />
            {result.related.length} entidade(s) relacionada(s)
          </p>
        </div>
      )}
    </motion.div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function OntologyExplorer({
  initialQuery = '',
  filterTypes,
  maxResults = 20,
  onSelect,
  compact = false,
}: OntologyExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<UnifiedSearchResult | null>(null);

  // Perform search with debounce-like behavior
  const searchResults = useMemo(() => {
    if (query.length < 2) return null;

    setIsSearching(true);

    try {
      const response = unifiedSearch(query, {
        types: filterTypes,
        limit: maxResults,
        language: 'pt',
        fuzzy: true,
        minScore: 30,
      });

      setIsSearching(false);
      return response;
    } catch (error) {
      console.error('Search error:', error);
      setIsSearching(false);
      return null;
    }
  }, [query, filterTypes, maxResults]);

  const handleSelect = useCallback(
    (result: UnifiedSearchResult) => {
      setSelectedResult(result);
      onSelect?.(result);
    },
    [onSelect]
  );

  const clearQuery = () => {
    setQuery('');
    setSelectedResult(null);
  };

  return (
    <div className={`w-full ${compact ? 'max-w-lg' : 'max-w-3xl'} mx-auto`}>
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="relative">
          <Search
            className={`
              absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5
              text-gray-400
              ${isSearching ? 'animate-pulse' : ''}
            `}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por codigo (E11, J45) ou termo (diabetes, asma)..."
            className={`
              w-full ${compact ? 'pl-11 pr-10 py-3' : 'pl-12 pr-12 py-4'}
              bg-white dark:bg-[#1c1c1e]
              border border-gray-200 dark:border-white/10
              rounded-2xl
              text-[#1d1d1f] dark:text-[#f5f5f7]
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
              transition-all duration-200
            `}
          />
          {query && (
            <button
              onClick={clearQuery}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Search info */}
        {searchResults && (
          <div className="flex items-center justify-between mt-2 px-2 text-xs text-[#86868b]">
            <span>
              {searchResults.total} resultado(s) para &quot;{searchResults.query}&quot;
            </span>
            <span>
              {searchResults.executionTimeMs}ms | Tipo: {searchResults.queryType}
            </span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}

      {/* Results */}
      {searchResults && !isSearching && (
        <AnimatePresence mode="popLayout">
          {searchResults.results.length > 0 ? (
            <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {searchResults.results.map((result) => (
                <ResultCard
                  key={result.id}
                  result={result}
                  onSelect={handleSelect}
                  compact={compact}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Database className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-[#86868b]">Nenhum resultado encontrado</p>
              {searchResults.suggestions && searchResults.suggestions.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-[#86868b] mb-2">Sugestoes:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {searchResults.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(suggestion)}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-[#86868b] hover:text-blue-500 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Empty State */}
      {!searchResults && query.length < 2 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-[#86868b]">
            Digite pelo menos 2 caracteres para buscar
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-md mx-auto">
            {Object.entries(ONTOLOGY_CONFIG)
              .slice(0, 8)
              .map(([key, config]) => (
                <div
                  key={key}
                  className={`
                    p-3 rounded-xl ${config.bgColor}
                    text-center
                  `}
                >
                  <config.icon className={`w-5 h-5 ${config.color} mx-auto mb-1`} />
                  <span className={`text-xs font-medium ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OntologyExplorer;
