'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X, BookOpen, Pill, FileText, Activity } from 'lucide-react';
import Fuse from 'fuse.js';
import { getAllRastreamentos } from '@/lib/data/rastreamentos';
import { doencas } from '@/lib/data/doencas';
import { medicamentos } from '@/lib/data/medicamentos';
import { Link } from '@/i18n/routing';

type SearchResultType = 'rastreamento' | 'doenca' | 'medicamento';

interface UnifiedSearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  badges: { label: string; color: string }[];
  lastUpdate?: string;
}

export default function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
  });

  const rastreamentos = getAllRastreamentos();

  // Unificar todos os itens para busca
  const allItems: UnifiedSearchResult[] = useMemo(() => {
    const items: UnifiedSearchResult[] = [];

    // Rastreamentos
    rastreamentos.forEach(r => {
      items.push({
        id: r.id,
        type: 'rastreamento',
        title: r.title,
        subtitle: getCategoryInfo(r.category).label,
        description: r.description,
        path: `/${r.category}#${r.id}`,
        badges: [
          { label: getCategoryInfo(r.category).label, color: getCategoryInfo(r.category).color },
          { label: getConvergenceInfo(r.recommendations.convergence.status).icon + ' ' + getConvergenceInfo(r.recommendations.convergence.status).label, color: getConvergenceInfo(r.recommendations.convergence.status).color }
        ],
        lastUpdate: r.lastUpdate
      });
    });

    // Doenças
    doencas.forEach(d => {
      items.push({
        id: d.id,
        type: 'doenca',
        title: d.titulo,
        subtitle: d.ciap2.join(', ') + ' | ' + d.cid10.join(', '),
        description: d.quickView.definicao,
        path: `/doencas/${d.id}`,
        badges: [
          { label: 'Doença', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
          ...d.ciap2.slice(0, 1).map(c => ({ label: c, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' })),
          ...d.cid10.slice(0, 1).map(c => ({ label: c, color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300' }))
        ],
        lastUpdate: d.lastUpdate
      });
    });

    // Medicamentos
    medicamentos.forEach(m => {
      items.push({
        id: m.id,
        type: 'medicamento',
        title: m.nomeGenerico,
        subtitle: m.nomesComerciais?.join(', ') || '',
        description: m.indicacoes.slice(0, 2).join(' • '),
        path: `/medicamentos/${m.id}`,
        badges: [
          { label: 'Medicamento', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
          ...(m.rename ? [{ label: 'RENAME', color: 'bg-green-500 text-white' }] : []),
          { label: `Cat. ${m.gestacao}`, color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300' }
        ],
        lastUpdate: m.lastUpdate
      });
    });

    return items;
  }, [rastreamentos]);

  // Configuração do Fuse.js para busca fuzzy
  const fuse = useMemo(() => {
    return new Fuse(allItems, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'subtitle', weight: 2 },
        { name: 'description', weight: 1 },
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }, [allItems]);

  // Busca e filtros combinados
  const results = useMemo(() => {
    let filtered = allItems;

    // Aplicar busca fuzzy
    if (searchTerm.trim()) {
      const fuseResults = fuse.search(searchTerm);
      filtered = fuseResults.map(result => result.item);
    }

    // Aplicar filtros de tipo
    if (filters.type !== 'all') {
      filtered = filtered.filter(r => r.type === filters.type);
    }

    return filtered.slice(0, 50); // Limitar resultados
  }, [searchTerm, filters, allItems, fuse]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      type: 'all',
      category: 'all',
    });
  };

  const getTypeIcon = (type: SearchResultType) => {
    switch (type) {
      case 'rastreamento': return <Activity className="w-5 h-5 text-purple-500" />;
      case 'doenca': return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'medicamento': return <Pill className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getTypeBgColor = (type: SearchResultType) => {
    switch (type) {
      case 'rastreamento': return 'border-l-purple-500';
      case 'doenca': return 'border-l-blue-500';
      case 'medicamento': return 'border-l-emerald-500';
    }
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
          placeholder="Buscar doenças, medicamentos, rastreamentos, CIAP-2, CID-10..."
          className="w-full pl-12 pr-4 py-4 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Filtrar por:</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilters({ ...filters, type: 'all' })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filters.type === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            Todos ({allItems.length})
          </button>
          <button
            onClick={() => setFilters({ ...filters, type: 'doenca' })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filters.type === 'doenca'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Doenças ({doencas.length})
          </button>
          <button
            onClick={() => setFilters({ ...filters, type: 'medicamento' })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filters.type === 'medicamento'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            <Pill className="w-4 h-4" />
            Medicamentos ({medicamentos.length})
          </button>
          <button
            onClick={() => setFilters({ ...filters, type: 'rastreamento' })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filters.type === 'rastreamento'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            Rastreamentos ({rastreamentos.length})
          </button>
        </div>

        {(searchTerm || filters.type !== 'all') && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
            Limpar
          </button>
        )}
      </div>

      {/* Contador de Resultados */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        {searchTerm && ` para "${searchTerm}"`}
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        {results.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            href={item.path}
            className={`block bg-white dark:bg-neutral-900 border-l-4 ${getTypeBgColor(item.type)} border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl p-6 transition-all hover:shadow-lg`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1 capitalize">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              {item.lastUpdate && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.lastUpdate}
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge.color}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </Link>
        ))}

        {results.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-700" />
            <p className="text-neutral-500 dark:text-neutral-400">
              Nenhum resultado encontrado para sua busca.
            </p>
            <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-2">
              Tente buscar por nome da doença, CIAP-2, CID-10, medicamento ou rastreamento.
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

      {/* Quick Tips */}
      <div className="mt-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-6">
        <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-3">💡 Dicas de Busca</h3>
        <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
          <li>• <strong>Por código:</strong> Digite "K86" (CIAP-2) ou "I10" (CID-10) para encontrar a doença</li>
          <li>• <strong>Por medicamento:</strong> Digite o nome genérico (losartana) ou comercial (Cozaar)</li>
          <li>• <strong>Por rastreamento:</strong> Digite a condição (mama, próstata, pezinho)</li>
          <li>• <strong>Busca fuzzy:</strong> Mesmo com erros de digitação, a busca encontra resultados aproximados</li>
        </ul>
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
  return categories[category] || { label: category, color: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300' };
}

function getConvergenceInfo(status: string) {
  const statuses: Record<string, { label: string; icon: string; color: string }> = {
    convergencia: { label: 'Convergência', icon: '🟢', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    parcial: { label: 'Parcial', icon: '🟡', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' },
    divergencia: { label: 'Divergência', icon: '🔴', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    em_disputa: { label: 'Em Disputa', icon: '🟣', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  };
  return statuses[status] || { label: status, icon: '⚪', color: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300' };
}
