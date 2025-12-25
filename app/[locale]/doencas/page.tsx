'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Heart, Activity, Wind, Brain, Bug, Bone,
  Fingerprint, Utensils, Zap, Droplets, Baby, Users,
  ChevronRight, BookOpen, ChevronDown, Filter, X
} from 'lucide-react';
import { doencasConsolidadas, getDoencasByCategoria } from '@/lib/data/doencas/index';
import { CATEGORIAS_DOENCA, CategoriaDoenca } from '@/lib/types/doenca';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Heart, Activity, Wind, Brain, Bug, Bone,
  Fingerprint, Utensils, Zap, Droplets, Baby, Users
};

export default function DoencasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaDoenca | 'todas'>('todas');
  const [showFilters, setShowFilters] = useState(false);

  const doencasAgrupadas = useMemo(() => getDoencasByCategoria(doencasConsolidadas), []);

  const doencasFiltradas = useMemo(() => {
    let filtered = doencasConsolidadas;

    if (selectedCategoria !== 'todas') {
      filtered = filtered.filter(d => d.categoria === selectedCategoria);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(d =>
        d.titulo?.toLowerCase().includes(term) ||
        d.sinonimos?.some(s => s.toLowerCase().includes(term)) ||
        d.ciap2?.some(c => c.toLowerCase().includes(term)) ||
        d.cid10?.some(c => c.toLowerCase().includes(term)) ||
        d.tags?.some(t => t.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [searchTerm, selectedCategoria]);

  const selectedCategoriaInfo = selectedCategoria !== 'todas'
    ? CATEGORIAS_DOENCA[selectedCategoria]
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Compact Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
          Doenças da APS
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          {doencasConsolidadas.length} condições clínicas com códigos CIAP-2 e CID-10
        </p>
      </div>

      {/* Search + Filter Row */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, CIAP-2 ou CID-10..."
            className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-[#1d1d1f] dark:text-[#f5f5f7] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-xl border flex items-center gap-2 transition-all ${
            showFilters || selectedCategoria !== 'todas'
              ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400'
              : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filtrar</span>
          {selectedCategoria !== 'todas' && (
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Active Filter Badge */}
      {selectedCategoria !== 'todas' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-neutral-500">Filtro ativo:</span>
          <button
            onClick={() => setSelectedCategoria('todas')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            {selectedCategoriaInfo?.label}
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Category Filter Panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <button
              onClick={() => { setSelectedCategoria('todas'); setShowFilters(false); }}
              className={`p-3 rounded-lg text-left transition-all ${
                selectedCategoria === 'todas'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-neutral-700 hover:bg-blue-50 dark:hover:bg-neutral-600'
              }`}
            >
              <span className="text-sm font-medium">Todas</span>
              <span className="block text-xs opacity-70">{doencasConsolidadas.length}</span>
            </button>
            {Object.entries(CATEGORIAS_DOENCA).map(([key, value]) => {
              const count = doencasAgrupadas[key]?.length || 0;
              if (count === 0) return null;
              const IconComponent = iconMap[value.icon] || BookOpen;
              return (
                <button
                  key={key}
                  onClick={() => { setSelectedCategoria(key as CategoriaDoenca); setShowFilters(false); }}
                  className={`p-3 rounded-lg text-left transition-all ${
                    selectedCategoria === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-neutral-700 hover:bg-blue-50 dark:hover:bg-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium truncate">{value.label}</span>
                  </div>
                  <span className="text-xs opacity-70">{count} condições</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-neutral-500 mb-4">
        {doencasFiltradas.length} resultado{doencasFiltradas.length !== 1 ? 's' : ''}
      </p>

      {/* Results */}
      {doencasFiltradas.length === 0 ? (
        <div className="text-center py-16">
          <Search className="w-12 h-12 mx-auto mb-3 text-neutral-300 dark:text-neutral-600" />
          <p className="text-lg text-neutral-500">Nenhuma doença encontrada</p>
          <p className="text-sm text-neutral-400 mt-1">Tente buscar por outro termo</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {doencasFiltradas.filter(d => d.id).map((doenca) => {
            const categoriaInfo = doenca.categoria ? CATEGORIAS_DOENCA[doenca.categoria] : CATEGORIAS_DOENCA['outros'];
            const IconComponent = categoriaInfo ? iconMap[categoriaInfo.icon] || BookOpen : BookOpen;

            return (
              <Link
                key={doenca.id}
                href={`/doencas/${doenca.id}`}
                className="group p-4 rounded-xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${categoriaInfo?.color || 'from-gray-400 to-gray-500'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {doenca.titulo}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-2">
                      {doenca.quickView?.definicao || 'Descrição não disponível'}
                    </p>

                    {/* Single code badge - cleaner */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {doenca.ciap2?.[0] && (
                          <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs font-mono rounded">
                            {doenca.ciap2[0]}
                          </span>
                        )}
                        {doenca.cid10?.[0] && (
                          <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs font-mono rounded">
                            {doenca.cid10[0]}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

