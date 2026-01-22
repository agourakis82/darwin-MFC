'use client';

import { useState, useMemo, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import {
  Search, Heart, Activity, Wind, Brain, Bug, Bone,
  Fingerprint, Utensils, Zap, Droplets, Baby, Users,
  ChevronRight, BookOpen, Filter, X, Loader2
} from 'lucide-react';
import { doencasConsolidadas, getDoencasByCategoria } from '@/lib/data/doencas/index';
import { CATEGORIAS_DOENCA, CategoriaDoenca } from '@/lib/types/doenca';
import { useLocalizedDiseases, preloadDiseaseTranslations } from '@/lib/hooks/useLocalizedDisease';
import { SupportedLocale, isValidLocale } from '@/lib/data/translations/diseases/schema';
import { cn } from '@/lib/utils';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Heart, Activity, Wind, Brain, Bug, Bone,
  Fingerprint, Utensils, Zap, Droplets, Baby, Users
};

const allDiseaseIds = doencasConsolidadas.filter(d => d.id).map(d => d.id as string);
const allCategories = Array.from(new Set(doencasConsolidadas.map(d => d.categoria).filter((c): c is CategoriaDoenca => !!c)));

export default function DoencasClient() {
  const t = useTranslations('doencas');
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<CategoriaDoenca | 'todas'>('todas');
  const [showFilters, setShowFilters] = useState(false);

  const { diseases: localizedDiseases, isLoading } = useLocalizedDiseases(allDiseaseIds);

  useEffect(() => {
    if (locale !== 'pt' && isValidLocale(locale)) {
      preloadDiseaseTranslations(locale as SupportedLocale, allCategories);
    }
  }, [locale]);

  const doencasAgrupadas = useMemo(() => getDoencasByCategoria(doencasConsolidadas), []);

  const doencasFiltradas = useMemo(() => {
    let filtered = localizedDiseases;
    if (selectedCategoria !== 'todas') filtered = filtered.filter(d => d.categoria === selectedCategoria);
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
  }, [searchTerm, selectedCategoria, localizedDiseases]);

  return (
    <div className="min-h-screen bg-paper-white dark:bg-carbon-950">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header - High Authority */}
        <div className="mb-12 border-b border-carbon-200 dark:border-carbon-800 pb-8">
          <div className="flex items-baseline gap-4 mb-2">
            <h1 className="text-4xl font-display font-bold text-helix-navy dark:text-white">
              {t('title')}
            </h1>
            <span className="text-xs font-mono text-carbon-400 font-bold uppercase tracking-widest">
              [ {doencasConsolidadas.length} REGISTRIES ]
            </span>
          </div>
          <p className="text-lg text-carbon-500 font-body max-w-2xl leading-relaxed">
            Clinical decision support for primary care professionals. Systematic evidence-based reviews for real-world practice.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-carbon-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg text-helix-navy dark:text-white focus:ring-1 focus:ring-adenine-teal outline-none text-sm transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "px-6 py-3 border border-carbon-200 dark:border-carbon-800 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all",
              showFilters ? "bg-helix-navy text-white" : "bg-white dark:bg-carbon-900 text-carbon-600 hover:bg-clinical-gray"
            )}
          >
            <Filter className="w-4 h-4" />
            {t('filter')}
          </button>
        </div>

        {/* Categories Ledger HUD */}
        {showFilters && (
          <div className="mb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-carbon-200 dark:bg-carbon-800 border border-carbon-200 dark:border-carbon-800 rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => setSelectedCategoria('todas')}
              className={cn(
                "p-4 text-left transition-colors",
                selectedCategoria === 'todas' ? "bg-helix-navy text-white" : "bg-white dark:bg-carbon-900 text-carbon-600 hover:bg-clinical-gray"
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-1">ALL</span>
              <span className="text-sm font-semibold">General Registry</span>
            </button>
            {Object.entries(CATEGORIAS_DOENCA).map(([key, value]) => {
              const count = doencasAgrupadas[key]?.length || 0;
              if (count === 0) return null;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategoria(key as CategoriaDoenca)}
                  className={cn(
                    "p-4 text-left transition-colors",
                    selectedCategoria === key ? "bg-adenine-teal text-white" : "bg-white dark:bg-carbon-900 text-carbon-600 hover:bg-clinical-gray"
                  )}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-1">{key.replace('_', ' ')}</span>
                  <span className="text-sm font-semibold truncate block">{value.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* The Clinical Ledger (Table View) */}
        <div className="bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-clinical-gray dark:bg-carbon-800/50 border-b border-carbon-200 dark:border-carbon-700 px-6 py-3 text-[10px] font-bold text-carbon-400 uppercase tracking-widest">
            <div className="col-span-1">CODE</div>
            <div className="col-span-5">CONDITION / CLINICAL REGISTRY</div>
            <div className="col-span-2">CIAP-2</div>
            <div className="col-span-2">CID-10</div>
            <div className="col-span-2 text-right">ACTION</div>
          </div>

          {isLoading ? (
             <div className="py-20 flex flex-col items-center">
               <Loader2 className="w-8 h-8 animate-spin text-adenine-teal mb-4" />
               <span className="text-xs font-mono text-carbon-400 uppercase tracking-widest">SYNCHRONIZING REGISTRY...</span>
             </div>
          ) : doencasFiltradas.length === 0 ? (
            <div className="py-20 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-carbon-200" />
              <p className="text-carbon-500 font-body">No matching medical records found.</p>
            </div>
          ) : (
            <div className="divide-y divide-carbon-100 dark:divide-carbon-800">
              {doencasFiltradas.map((d) => {
                const categoriaInfo = d.categoria ? CATEGORIAS_DOENCA[d.categoria] : CATEGORIAS_DOENCA['outros'];
                const IconComponent = categoriaInfo ? iconMap[categoriaInfo.icon] || BookOpen : BookOpen;
                return (
                  <Link
                    key={d.id}
                    href={`/doencas/${d.id}`}
                    className="grid grid-cols-12 items-center px-6 py-4 hover:bg-clinical-gray/50 dark:hover:bg-carbon-800/30 transition-all group"
                  >
                    <div className="col-span-1">
                      <div className={cn("w-8 h-8 rounded flex items-center justify-center text-white", categoriaInfo.color.replace('from-', 'bg-').split(' ')[0])}>
                         <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="col-span-5 pr-4">
                      <h3 className="text-base font-semibold text-helix-navy dark:text-white group-hover:text-adenine-teal transition-colors mb-0.5">
                        {d.titulo}
                      </h3>
                      <p className="text-xs text-carbon-500 line-clamp-1 font-body">
                        {d.quickView?.definicao || 'Registry detail pending verification.'}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-mono text-xs text-carbon-600 dark:text-carbon-400 bg-carbon-100 dark:bg-carbon-800 px-1.5 py-0.5 rounded">
                        {d.ciap2?.[0] || '—'}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-mono text-xs text-carbon-600 dark:text-carbon-400 bg-carbon-100 dark:bg-carbon-800 px-1.5 py-0.5 rounded">
                        {d.cid10?.[0] || '—'}
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      <button className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-carbon-300 group-hover:text-adenine-teal transition-colors">
                        OPEN HUD <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Statistics */}
        <div className="mt-8 flex justify-between items-center text-[10px] font-bold text-carbon-400 uppercase tracking-widest">
           <span>DARWIN MEDICAL HUB | ACADEMIC REGISTRY v2.6</span>
           <span>LOCALIZED: {locale.toUpperCase()} | ENCRYPTED LINK</span>
        </div>
      </div>
    </div>
  );
}
