'use client';

/**
 * ONTOLOGY EXPLORER PAGE - DARWIN-MFC
 * ====================================
 *
 * Interactive ontology explorer with cross-mapping capabilities.
 * Features:
 * - Unified search across ICD-10, ICD-11, SNOMED-CT, CIAP-2, LOINC
 * - Cross-mapping visualization between ontology systems
 * - Multi-language support
 */

import { useState, useMemo, useCallback } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import {
  Search,
  ArrowLeft,
  ArrowRight,
  Network,
  Info,
  Copy,
  Check,
  ChevronRight,
  Dna,
  FlaskConical,
  Stethoscope,
  Activity,
  ExternalLink,
} from 'lucide-react';
import {
  unifiedSearch,
  type UnifiedSearchResult,
  type UnifiedSearchOptions,
} from '@/lib/ontology/unified-search';
import { getCrossMappingStats } from '@/lib/ontology/cross-mapping';
import type { LanguageCode } from '@/lib/ontology/types/ontology';

// Type icons mapping
const TYPE_ICONS: Record<string, React.ElementType> = {
  disease: Stethoscope,
  medication: Activity,
  'lab-test': FlaskConical,
  gene: Dna,
  procedure: Activity,
  phenotype: Stethoscope,
  symptom: Stethoscope,
};

// Ontology system colors
const SYSTEM_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  icd10: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  icd11: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-300 dark:border-indigo-700' },
  'snomed-ct': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-700' },
  ciap2: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700' },
  loinc: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', border: 'border-green-300 dark:border-green-700' },
  doid: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-300 dark:border-purple-700' },
  mesh: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-300 dark:border-pink-700' },
  umls: { bg: 'bg-slate-100 dark:bg-slate-900/30', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-300 dark:border-slate-700' },
  pharmgkb: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-300 dark:border-teal-700' },
};

function getSystemColor(system: string) {
  return SYSTEM_COLORS[system] || { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-300 dark:border-gray-700' };
}

export default function OntologyExplorerPage() {
  const t = useTranslations('common');
  const locale = useLocale() as LanguageCode;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UnifiedSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedResult, setSelectedResult] = useState<UnifiedSearchResult | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState(0);

  // Get cross-mapping statistics
  const stats = useMemo(() => getCrossMappingStats(), []);

  // Search handler
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    // Perform search
    const options: UnifiedSearchOptions = {
      language: locale,
      limit: 30,
      includeCrossMappings: true,
    };

    const response = unifiedSearch(searchQuery, options);
    setSearchResults(response.results);
    setExecutionTime(response.executionTimeMs);
    setIsSearching(false);
    setSelectedResult(null);
  }, [searchQuery, locale]);

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Copy code to clipboard
  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Render code badge
  const renderCodeBadge = (system: string, code: string | string[] | undefined) => {
    if (!code) return null;
    const codes = Array.isArray(code) ? code : [code];
    const colors = getSystemColor(system);

    return codes.map((c, i) => (
      <button
        key={`${system}-${c}-${i}`}
        onClick={() => copyToClipboard(c)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${colors.bg} ${colors.text} ${colors.border} border rounded-md text-xs font-mono transition-all hover:scale-105 group`}
        title={`Copy ${system.toUpperCase()} code`}
      >
        <span className="font-semibold uppercase text-[10px] opacity-70">{system}</span>
        <span>{c}</span>
        {copiedCode === c ? (
          <Check className="w-3 h-3" />
        ) : (
          <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('back') || 'Back'}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Network className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {locale === 'pt' ? 'Explorador de Ontologias' : 'Ontology Explorer'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {locale === 'pt'
                    ? 'Busca unificada e mapeamento cruzado entre ICD-10, ICD-11, SNOMED-CT, CIAP-2 e LOINC'
                    : 'Unified search and cross-mapping between ICD-10, ICD-11, SNOMED-CT, CIAP-2, and LOINC'}
                </p>
              </div>
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.total}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Entidades Unificadas' : 'Unified Entities'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.coverage.icd10.percent}%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Cobertura ICD-10' : 'ICD-10 Coverage'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.coverage.snomed.percent}%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Cobertura SNOMED' : 'SNOMED Coverage'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.coverage.fullyMapped.percent}%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Totalmente Mapeadas' : 'Fully Mapped'}
                </div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    locale === 'pt'
                      ? 'Busque por codigo (E11, J45, I10) ou termo (diabetes, asma)...'
                      : 'Search by code (E11, J45, I10) or term (diabetes, asthma)...'
                  }
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {isSearching
                  ? locale === 'pt'
                    ? 'Buscando...'
                    : 'Searching...'
                  : locale === 'pt'
                    ? 'Buscar'
                    : 'Search'}
              </button>
            </div>

            {/* Info Banner */}
            <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  <p className="font-medium mb-1">
                    {locale === 'pt' ? 'Exemplos de busca:' : 'Search examples:'}
                  </p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>
                      <strong>{locale === 'pt' ? 'Por codigo:' : 'By code:'}</strong> E11.9, J45, I10, 5A11, 73211009
                    </li>
                    <li>
                      <strong>{locale === 'pt' ? 'Por termo:' : 'By term:'}</strong> diabetes, hipertensao, asma, pneumonia
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Results List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    {searchResults.length}{' '}
                    {locale === 'pt'
                      ? `resultado${searchResults.length !== 1 ? 's' : ''} encontrado${searchResults.length !== 1 ? 's' : ''}`
                      : `result${searchResults.length !== 1 ? 's' : ''} found`}
                  </span>
                  <span>{executionTime}ms</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {locale === 'pt'
                        ? 'Nenhum resultado encontrado. Tente um codigo ou termo diferente.'
                        : 'No results found. Try a different code or term.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {searchResults.map((result) => {
                      const TypeIcon = TYPE_ICONS[result.type] || Stethoscope;
                      const isSelected = selectedResult?.id === result.id;

                      return (
                        <button
                          key={result.id}
                          onClick={() => setSelectedResult(result)}
                          className={`w-full text-left bg-white dark:bg-gray-800 rounded-xl p-4 border transition-all hover:shadow-md ${
                            isSelected
                              ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              result.type === 'disease' ? 'bg-blue-100 dark:bg-blue-900/30' :
                              result.type === 'lab-test' ? 'bg-green-100 dark:bg-green-900/30' :
                              result.type === 'gene' ? 'bg-purple-100 dark:bg-purple-900/30' :
                              'bg-gray-100 dark:bg-gray-700'
                            }`}>
                              <TypeIcon className={`w-5 h-5 ${
                                result.type === 'disease' ? 'text-blue-600 dark:text-blue-400' :
                                result.type === 'lab-test' ? 'text-green-600 dark:text-green-400' :
                                result.type === 'gene' ? 'text-purple-600 dark:text-purple-400' :
                                'text-gray-600 dark:text-gray-400'
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                  {result.title}
                                </h3>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                  {result.score}%
                                </span>
                              </div>
                              {result.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">
                                  {result.description}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-1.5">
                                {renderCodeBadge('icd10', result.codes.icd10)}
                                {renderCodeBadge('icd11', result.codes.icd11)}
                                {renderCodeBadge('snomed-ct', result.codes.snomedCT)}
                                {renderCodeBadge('ciap2', result.codes.ciap2)}
                                {renderCodeBadge('loinc', result.codes.loinc)}
                              </div>
                            </div>
                            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-1">
                {selectedResult ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 sticky top-4 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                      <h3 className="font-bold text-white text-lg">{selectedResult.title}</h3>
                      <p className="text-indigo-100 text-sm capitalize">{selectedResult.type}</p>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                      {/* Description */}
                      {selectedResult.description && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                            {locale === 'pt' ? 'Descricao' : 'Description'}
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{selectedResult.description}</p>
                        </div>
                      )}

                      {/* Cross-mappings */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                          {locale === 'pt' ? 'Mapeamentos Cruzados' : 'Cross-Mappings'}
                        </h4>
                        <div className="space-y-2">
                          {selectedResult.codes.icd10 && selectedResult.codes.icd10.length > 0 && (
                            <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">ICD-10</span>
                              <div className="flex gap-1">
                                {selectedResult.codes.icd10.map((code) => (
                                  <span key={code} className="font-mono text-sm text-blue-800 dark:text-blue-200">
                                    {code}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {selectedResult.codes.icd11 && selectedResult.codes.icd11.length > 0 && (
                            <div className="flex items-center justify-between p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">ICD-11</span>
                              <div className="flex gap-1">
                                {selectedResult.codes.icd11.map((code) => (
                                  <span key={code} className="font-mono text-sm text-indigo-800 dark:text-indigo-200">
                                    {code}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {selectedResult.codes.snomedCT && (
                            <div className="flex items-center justify-between p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">SNOMED-CT</span>
                              <span className="font-mono text-sm text-emerald-800 dark:text-emerald-200">
                                {selectedResult.codes.snomedCT}
                              </span>
                            </div>
                          )}
                          {selectedResult.codes.ciap2 && selectedResult.codes.ciap2.length > 0 && (
                            <div className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">CIAP-2</span>
                              <div className="flex gap-1">
                                {selectedResult.codes.ciap2.map((code) => (
                                  <span key={code} className="font-mono text-sm text-amber-800 dark:text-amber-200">
                                    {code}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {selectedResult.codes.loinc && (
                            <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <span className="text-sm font-medium text-green-700 dark:text-green-300">LOINC</span>
                              <span className="font-mono text-sm text-green-800 dark:text-green-200">
                                {selectedResult.codes.loinc}
                              </span>
                            </div>
                          )}
                          {selectedResult.codes.doid && (
                            <div className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">DOID</span>
                              <span className="font-mono text-sm text-purple-800 dark:text-purple-200">
                                {selectedResult.codes.doid}
                              </span>
                            </div>
                          )}
                          {selectedResult.codes.meshId && (
                            <div className="flex items-center justify-between p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                              <span className="text-sm font-medium text-pink-700 dark:text-pink-300">MeSH</span>
                              <span className="font-mono text-sm text-pink-800 dark:text-pink-200">
                                {selectedResult.codes.meshId}
                              </span>
                            </div>
                          )}
                          {selectedResult.codes.umlsCui && (
                            <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">UMLS CUI</span>
                              <span className="font-mono text-sm text-slate-800 dark:text-slate-200">
                                {selectedResult.codes.umlsCui}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Visual Cross-mapping */}
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                          {locale === 'pt' ? 'Fluxo de Mapeamento' : 'Mapping Flow'}
                        </h4>
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          {selectedResult.codes.icd10 && (
                            <>
                              <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">
                                ICD-10
                              </span>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                            </>
                          )}
                          {selectedResult.codes.icd11 && (
                            <>
                              <span className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium">
                                ICD-11
                              </span>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                            </>
                          )}
                          {selectedResult.codes.snomedCT && (
                            <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium">
                              SNOMED-CT
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                    <Network className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {locale === 'pt'
                        ? 'Selecione um resultado para ver os mapeamentos cruzados'
                        : 'Select a result to view cross-mappings'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Initial State - Before Search */}
          {!hasSearched && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="text-center mb-8">
                <Network className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {locale === 'pt' ? 'Comece a Explorar' : 'Start Exploring'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                  {locale === 'pt'
                    ? 'Digite um codigo de ontologia ou termo medico para encontrar mapeamentos cruzados entre diferentes sistemas de classificacao.'
                    : 'Enter an ontology code or medical term to find cross-mappings between different classification systems.'}
                </p>
              </div>

              {/* Ontology Systems Overview */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">ICD-10</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {locale === 'pt'
                      ? 'Classificacao Internacional de Doencas (10a revisao)'
                      : 'International Classification of Diseases (10th revision)'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                  <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">ICD-11</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">
                    {locale === 'pt'
                      ? 'Classificacao Internacional de Doencas (11a revisao)'
                      : 'International Classification of Diseases (11th revision)'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">SNOMED-CT</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    {locale === 'pt'
                      ? 'Nomenclatura Sistematizada de Medicina - Termos Clinicos'
                      : 'Systematized Nomenclature of Medicine - Clinical Terms'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-1">CIAP-2</h3>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {locale === 'pt'
                      ? 'Classificacao Internacional de Atencao Primaria'
                      : 'International Classification of Primary Care'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-1">LOINC</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {locale === 'pt'
                      ? 'Identificadores Logicos de Observacoes Nomes e Codigos'
                      : 'Logical Observation Identifiers Names and Codes'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
                  <h3 className="font-semibold text-teal-700 dark:text-teal-300 mb-1">PharmGKB</h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400">
                    {locale === 'pt'
                      ? 'Base de Conhecimento em Farmacogenomica'
                      : 'Pharmacogenomics Knowledge Base'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
