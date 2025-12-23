/**
 * SEARCH PAGE CLIENT COMPONENT
 * =============================
 *
 * Full-featured search experience
 */

'use client';

import { useSearchParams } from 'next/navigation';
import GlobalSearch from '@/app/components/Search/GlobalSearch';
import { getSearchStats, getPopularSearches } from '@/lib/search/searchIndex';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';

  const stats = getSearchStats();
  const popularSearches = getPopularSearches(15);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            🔍 Busca Darwin-MFC
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Pesquise em {stats.total.toLocaleString()} itens: medicamentos, doenças, protocolos, calculadoras e mais
          </p>
        </div>
      </header>

      {/* Main Search */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <GlobalSearch initialQuery={initialQuery} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {Object.entries(stats.byType).map(([type, count]) => (
            <div
              key={type}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {count.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {type}s
              </div>
            </div>
          ))}
        </div>

        {/* Popular Searches */}
        {!initialQuery && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              📈 Categorias Populares
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map(search => (
                <a
                  key={search}
                  href={`/busca?q=${encodeURIComponent(search)}`}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {search}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              💡 Dicas de Busca
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Use <kbd className="px-2 py-0.5 bg-white dark:bg-blue-950 rounded text-xs">Cmd+K</kbd> para abrir a busca rápida</li>
              <li>• Digite o nome do medicamento, doença ou CID-10</li>
              <li>• Use filtros para refinar os resultados</li>
              <li>• Navegue com ↑↓ e selecione com Enter</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
              ✨ Recursos
            </h3>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <li>• Busca em tempo real com sugestões</li>
              <li>• Histórico de buscas recentes</li>
              <li>• Filtros por tipo e categoria</li>
              <li>• Resultados agrupados e organizados</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
