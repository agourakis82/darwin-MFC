'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Heart, Activity, Wind, Brain, Bug, Bone,
  Fingerprint, Utensils, Zap, Droplets, Baby, Users,
  ChevronRight, BookOpen, Pill, FileText, Star
} from 'lucide-react';
import { doencasConsolidadas, getDoencasStats, getDoencasByCategoria } from '@/lib/data/doencas/index';
import { CATEGORIAS_DOENCA, CategoriaDoenca } from '@/lib/types/doenca';

// Mapeamento de ícones
const iconMap: Record<string, React.ElementType> = {
  Heart, Activity, Wind, Brain, Bug, Bone,
  Fingerprint, Utensils, Zap, Droplets, Baby, Users
};

export default function DoencasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaDoenca | 'todas'>('todas');
  
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

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
              Doenças da APS
            </h1>
            <p className="text-lg text-[#86868b]">
              Guia completo das condições mais prevalentes na Atenção Primária
            </p>
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-5 border border-blue-500/30">
          <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7]">
            <strong className="text-blue-600 dark:text-blue-400">📚 {doencasConsolidadas.length} Condições Clínicas</strong> com QuickView (resumo 1 tela) + Versão Completa. 
            Todas com <strong>CIAP-2/CID-10/DOID/SNOMED-CT/MeSH</strong> e referências Q1.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, sinônimo, CIAP-2 ou CID-10..."
            className="w-full pl-12 pr-4 py-4 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50 text-[#1d1d1f] dark:text-[#f5f5f7] focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setSelectedCategoria('todas')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              selectedCategoria === 'todas'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/50 dark:bg-neutral-800/50 text-[#86868b] hover:bg-blue-100 dark:hover:bg-blue-900/30'
            }`}
          >
            Todas ({doencasConsolidadas.length})
          </button>
          {Object.entries(CATEGORIAS_DOENCA).map(([key, value]) => {
            const count = doencasAgrupadas[key]?.length || 0;
            if (count === 0) return null;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategoria(key as CategoriaDoenca)}
                className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedCategoria === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/50 dark:bg-neutral-800/50 text-[#86868b] hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
              >
                {value.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {doencasFiltradas.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-16 h-16 mx-auto mb-4 text-[#86868b] opacity-30" />
          <p className="text-xl text-[#86868b]">Nenhuma doença encontrada</p>
          <p className="text-sm text-[#86868b] mt-2">Tente buscar por outro termo</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doencasFiltradas.filter(d => d.id).map((doenca) => {
            const categoriaInfo = doenca.categoria ? CATEGORIAS_DOENCA[doenca.categoria] : CATEGORIAS_DOENCA['outros'];
            const IconComponent = categoriaInfo ? iconMap[categoriaInfo.icon] || BookOpen : BookOpen;
            
            return (
              <Link
                key={doenca.id}
                href={`/doencas/${doenca.id}`}
                className="group glass-strong rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-blue-500/30"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${categoriaInfo?.color || 'from-gray-400 to-gray-500'} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {doenca.titulo}
                    </h3>
                    <p className="text-sm text-[#86868b] line-clamp-2 mb-3">
                      {doenca.quickView?.definicao || 'Descrição não disponível'}
                    </p>
                    
                    {/* Códigos */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {doenca.ciap2?.slice(0, 2).map(code => (
                        <span key={code} className="px-2 py-0.5 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono rounded">
                          {code}
                        </span>
                      ))}
                      {doenca.cid10?.slice(0, 2).map(code => (
                        <span key={code} className="px-2 py-0.5 bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-mono rounded">
                          {code}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links rápidos */}
                    <div className="flex items-center gap-4 text-xs text-[#86868b]">
                      <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(doencasAgrupadas).slice(0, 4).map(([categoria, doencas]) => {
          const categoriaInfo = CATEGORIAS_DOENCA[categoria as CategoriaDoenca];
          if (!categoriaInfo) return null;
          const IconComponent = iconMap[categoriaInfo.icon] || BookOpen;
          
          return (
            <div key={categoria} className="glass-subtle rounded-xl p-4 text-center">
              <IconComponent className="w-8 h-8 mx-auto mb-2 text-[#86868b]" />
              <div className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                {doencas.length}
              </div>
              <div className="text-sm text-[#86868b]">{categoriaInfo.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

