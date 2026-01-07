/**
 * SEMANTIC SEARCH PAGE CLIENT COMPONENT
 * =====================================
 *
 * Demo page for the new semantic search functionality
 * with synonym expansion and faceted filtering
 */

'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import SemanticSearchBar from '@/app/components/Search/SemanticSearchBar';
import {
  getSemanticSearchStats,
  type SearchResult,
} from '@/lib/search/semantic-search';
import {
  MEDICAL_ABBREVIATIONS,
} from '@/lib/search/medical-synonyms';

export default function SemanticSearchPage() {
  const locale = useLocale();
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const stats = getSemanticSearchStats();

  // Sample abbreviations to show
  const sampleAbbreviations = [
    'HAS', 'DM2', 'IAM', 'DPOC', 'ITU', 'FA', 'AVC', 'IC', 'DRC', 'DRGE',
  ];

  const labels = {
    title: locale === 'pt' ? 'Busca Semantica' : 'Semantic Search',
    subtitle: locale === 'pt'
      ? 'Busca inteligente com expansao de sinonimos e abreviacoes medicas'
      : 'Intelligent search with synonym expansion and medical abbreviations',
    totalIndexed: locale === 'pt' ? 'itens indexados' : 'indexed items',
    byType: locale === 'pt' ? 'Por Tipo' : 'By Type',
    byCategory: locale === 'pt' ? 'Por Categoria' : 'By Category',
    topTags: locale === 'pt' ? 'Tags Populares' : 'Popular Tags',
    abbreviations: locale === 'pt' ? 'Abreviacoes Suportadas' : 'Supported Abbreviations',
    features: locale === 'pt' ? 'Recursos' : 'Features',
    featureList: locale === 'pt'
      ? [
          'Expansao automatica de sinonimos medicos',
          'Reconhecimento de abreviacoes (HAS, DM, IAM, etc.)',
          'Busca por codigo CID-10 e CIAP-2',
          'Filtragem por tipo e categoria',
          'Destaque de termos correspondentes',
          'Sugestoes em tempo real',
        ]
      : [
          'Automatic expansion of medical synonyms',
          'Abbreviation recognition (HTN, DM, MI, etc.)',
          'Search by ICD-10 and ICPC-2 codes',
          'Filtering by type and category',
          'Highlighting of matched terms',
          'Real-time suggestions',
        ],
    selectedResult: locale === 'pt' ? 'Resultado Selecionado' : 'Selected Result',
    trySearching: locale === 'pt'
      ? 'Tente buscar por: hipertensao, DM2, losartana, pneumonia, I10, K86...'
      : 'Try searching for: hypertension, T2DM, losartan, pneumonia, I10, K86...',
  };

  const handleResultSelect = (result: SearchResult) => {
    setSelectedResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">{labels.title}</h1>
          <p className="mt-2 text-blue-100">{labels.subtitle}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-blue-200">
            <span className="px-3 py-1 bg-white/10 rounded-full">
              {stats.totalDocuments.toLocaleString()} {labels.totalIndexed}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SemanticSearchBar
            autoFocus={true}
            showFilters={true}
            onResultSelect={handleResultSelect}
          />
        </div>

        {/* Try Searching Hint */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {labels.trySearching}
          </p>
        </div>

        {/* Selected Result Details */}
        {selectedResult && (
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {labels.selectedResult}
            </h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedResult.id}</p>
              <p><strong>Title:</strong> {selectedResult.title}</p>
              <p><strong>Type:</strong> {selectedResult.type}</p>
              <p><strong>Category:</strong> {selectedResult.category}</p>
              <p><strong>Score:</strong> {selectedResult.score.toFixed(4)}</p>
              {selectedResult.codes.length > 0 && (
                <p><strong>Codes:</strong> {selectedResult.codes.join(', ')}</p>
              )}
              {selectedResult.expandedFrom && (
                <p><strong>Expanded from:</strong> {selectedResult.expandedFrom}</p>
              )}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* By Type */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {labels.byType}
            </h3>
            <div className="space-y-2">
              {Object.entries(stats.byType)
                .filter(([, count]) => count > 0)
                .sort(([, a], [, b]) => b - a)
                .map(([type, count]) => (
                  <div
                    key={type}
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {type}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      {count.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* By Category */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {labels.byCategory}
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {Object.entries(stats.byCategory)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
                      {category}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                      {count.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Top Tags */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {labels.topTags}
            </h3>
            <div className="flex flex-wrap gap-2">
              {stats.topTags.slice(0, 15).map(tag => (
                <span
                  key={tag.value}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300"
                >
                  {tag.value}
                  <span className="ml-1 text-xs text-gray-500">({tag.count})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Abbreviations */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {labels.abbreviations}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sampleAbbreviations.map(abbrev => (
              <div
                key={abbrev}
                className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
              >
                <div className="font-mono font-bold text-purple-700 dark:text-purple-300">
                  {abbrev}
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  {MEDICAL_ABBREVIATIONS[abbrev]}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {locale === 'pt'
              ? `+ ${Object.keys(MEDICAL_ABBREVIATIONS).length - 10} outras abreviacoes suportadas`
              : `+ ${Object.keys(MEDICAL_ABBREVIATIONS).length - 10} more abbreviations supported`}
          </p>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
            {labels.features}
          </h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {labels.featureList.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-emerald-800 dark:text-emerald-200"
              >
                <span className="text-emerald-500 mt-0.5">&#10003;</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
