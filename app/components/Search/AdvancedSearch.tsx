'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Fuse from 'fuse.js';
import { getAllRastreamentos } from '@/lib/data/rastreamentos';
import Link from 'next/link';

export default function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    convergence: 'all',
    yearUpdated: 'all'
  });

  const rastreamentos = getAllRastreamentos();

  // Configuração do Fuse.js para busca fuzzy
  const fuse = useMemo(() => {
    return new Fuse(rastreamentos, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'description', weight: 1 },
        { name: 'recommendations.sus.population', weight: 1 },
        { name: 'recommendations.societies.organization', weight: 1 },
        { name: 'epidemiology.incidence', weight: 0.5 }
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true
    });
  }, [rastreamentos]);

  // Busca e filtros combinados
  const results = useMemo(() => {
    let filtered = rastreamentos;

    // Aplicar busca fuzzy
    if (searchTerm) {
      const fuseResults = fuse.search(searchTerm);
      filtered = fuseResults.map(result => result.item);
    }

    // Aplicar filtros
    if (filters.category !== 'all') {
      filtered = filtered.filter(r => r.category === filters.category);
    }

    if (filters.convergence !== 'all') {
      filtered = filtered.filter(r => r.recommendations.convergence.status === filters.convergence);
    }

    if (filters.yearUpdated !== 'all') {
      filtered = filtered.filter(r => r.lastUpdate.startsWith(filters.yearUpdated));
    }

    return filtered;
  }, [searchTerm, filters, rastreamentos, fuse]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      category: 'all',
      convergence: 'all',
      yearUpdated: 'all'
    });
  };

  return (
    <div className="space-y-6">
      {/* Barra de Busca */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar rastreamentos, populações, métodos, sociedades..."
          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Filtros:</span>
        </div>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-sm"
        >
          <option value="all">Todas as categorias</option>
          <option value="neonatal">Neonatal</option>
          <option value="infantil">Infantil</option>
          <option value="adultos">Adultos (DCNTs)</option>
          <option value="cancer">Câncer</option>
          <option value="gestacao">Gestação</option>
        </select>

        <select
          value={filters.convergence}
          onChange={(e) => setFilters({ ...filters, convergence: e.target.value })}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-sm"
        >
          <option value="all">Todas as convergências</option>
          <option value="convergencia">Convergência Total</option>
          <option value="parcial">Convergência Parcial</option>
          <option value="divergencia">Divergência</option>
          <option value="em_disputa">Em Disputa</option>
        </select>

        <select
          value={filters.yearUpdated}
          onChange={(e) => setFilters({ ...filters, yearUpdated: e.target.value })}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-sm"
        >
          <option value="all">Todas as atualizações</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        {(searchTerm || filters.category !== 'all' || filters.convergence !== 'all' || filters.yearUpdated !== 'all') && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
            Limpar filtros
          </button>
        )}
      </div>

      {/* Contador de Resultados */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        {results.map((rastreamento) => {
          const categoryInfo = getCategoryInfo(rastreamento.category);
          const convergenceInfo = getConvergenceInfo(rastreamento.recommendations.convergence.status);
          
          return (
            <Link
              key={rastreamento.id}
              href={`/${rastreamento.category}#${rastreamento.id}`}
              className="block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                    {rastreamento.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${categoryInfo.color}`}>
                      {categoryInfo.label}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${convergenceInfo.color}`}>
                      {convergenceInfo.icon} {convergenceInfo.label}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Atualizado: {rastreamento.lastUpdate}
                </span>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {rastreamento.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">SUS:</span>
                  <span className="text-neutral-600 dark:text-neutral-400 ml-1">
                    {rastreamento.recommendations.sus.population}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Sociedades:</span>
                  <span className="text-neutral-600 dark:text-neutral-400 ml-1">
                    {rastreamento.recommendations.societies.organization.join(', ')}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}

        {results.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-700" />
            <p className="text-neutral-500 dark:text-neutral-400">
              Nenhum resultado encontrado para sua busca.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Limpar filtros e tentar novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryInfo(category: string) {
  const categories: Record<string, { label: string; color: string }> = {
    neonatal: { label: 'Neonatal', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300' },
    infantil: { label: 'Infantil', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    adultos: { label: 'Adultos', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
    cancer: { label: 'Câncer', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    gestacao: { label: 'Gestação', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  };
  return categories[category] || { label: category, color: 'bg-neutral-100 text-neutral-700' };
}

function getConvergenceInfo(status: string) {
  const statuses: Record<string, { label: string; icon: string; color: string }> = {
    convergencia: { label: 'Convergência', icon: '🟢', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    parcial: { label: 'Parcial', icon: '🟡', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' },
    divergencia: { label: 'Divergência', icon: '🔴', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    em_disputa: { label: 'Em Disputa', icon: '🟣', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  };
  return statuses[status] || { label: status, icon: '⚪', color: 'bg-neutral-100 text-neutral-700' };
}

