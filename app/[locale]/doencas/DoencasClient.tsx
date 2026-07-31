'use client';

import { useState, useMemo, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { PageContainer } from '@/app/components/Layout/Containers';
import { fadeInUp } from '@/lib/design-system/animations/presets';
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
      <PageContainer className="py-8 md:py-12">
        {/* Header - High Authority */}
        <div className="mb-8 border-b border-carbon-200 pb-6 dark:border-carbon-800 md:mb-12 md:pb-8">
          <div className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h1 className="text-3xl font-display font-bold text-helix-navy dark:text-white sm:text-4xl">
              {t('title')}
            </h1>
            <span className="text-xs font-mono text-carbon-400 font-bold uppercase tracking-widest">
              [ {doencasConsolidadas.length} CONDIÇÕES ]
            </span>
          </div>
          <p className="max-w-2xl font-body text-base leading-relaxed text-carbon-500 sm:text-lg">
            Suporte à decisão clínica para profissionais da atenção primária, com sínteses baseadas em evidências para a prática.
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
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest">Todas</span>
              <span className="text-sm font-semibold">Visão geral</span>
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
        <motion.div
          className="bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg overflow-hidden"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="hidden grid-cols-12 bg-clinical-gray dark:bg-carbon-800/50 border-b border-carbon-200 dark:border-carbon-700 px-6 py-3 text-[10px] font-bold text-carbon-400 uppercase tracking-widest md:grid">
            <div className="col-span-1">Ícone</div>
            <div className="col-span-5">Condição clínica</div>
            <div className="col-span-2">CIAP-2</div>
            <div className="col-span-2">CID-10</div>
            <div className="col-span-2 text-right">Ação</div>
          </div>

          {isLoading ? (
             <div className="py-20 flex flex-col items-center">
               <Loader2 className="w-8 h-8 animate-spin text-adenine-teal mb-4" />
               <span className="text-xs font-mono text-carbon-400 uppercase tracking-widest">Carregando condições...</span>
             </div>
          ) : doencasFiltradas.length === 0 ? (
            <div className="py-20 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-carbon-200" />
              <p className="text-carbon-500 font-body">Nenhuma condição correspondente foi encontrada.</p>
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
                    className="group flex items-start gap-3 px-4 py-4 transition-all hover:bg-clinical-gray/50 dark:hover:bg-carbon-800/30 md:grid md:grid-cols-12 md:items-center md:px-6"
                  >
                    <div className="shrink-0 md:col-span-1">
                      <div className={cn("w-8 h-8 rounded flex items-center justify-center text-white", categoriaInfo.color.replace('from-', 'bg-').split(' ')[0])}>
                         <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 md:col-span-5 md:pr-4">
                      <h3 className="text-base font-semibold text-helix-navy dark:text-white group-hover:text-adenine-teal transition-colors mb-0.5">
                        {d.titulo}
                      </h3>
                      <p className="text-xs text-carbon-500 line-clamp-1 font-body">
                        {d.quickView?.definicao || 'Resumo clínico em revisão.'}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 md:hidden">
                        <span className="rounded bg-carbon-100 px-1.5 py-0.5 font-mono text-[10px] text-carbon-600 dark:bg-carbon-800 dark:text-carbon-400">
                          CIAP-2 {d.ciap2?.[0] || '—'}
                        </span>
                        <span className="rounded bg-carbon-100 px-1.5 py-0.5 font-mono text-[10px] text-carbon-600 dark:bg-carbon-800 dark:text-carbon-400">
                          CID-10 {d.cid10?.[0] || '—'}
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:col-span-2 md:block">
                      <span className="font-mono text-xs text-carbon-600 dark:text-carbon-400 bg-carbon-100 dark:bg-carbon-800 px-1.5 py-0.5 rounded">
                        {d.ciap2?.[0] || '—'}
                      </span>
                    </div>
                    <div className="hidden md:col-span-2 md:block">
                      <span className="font-mono text-xs text-carbon-600 dark:text-carbon-400 bg-carbon-100 dark:bg-carbon-800 px-1.5 py-0.5 rounded">
                        {d.cid10?.[0] || '—'}
                      </span>
                    </div>
                    <div className="hidden text-right md:col-span-2 md:block">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-carbon-300 transition-colors group-hover:text-adenine-teal">
                        Abrir <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Footer Statistics */}
        <div className="mt-8 flex flex-col gap-2 text-[10px] font-bold uppercase tracking-widest text-carbon-400 sm:flex-row sm:items-center sm:justify-between">
           <span>Darwin Medical Hub | Base clínica APS</span>
           <span>Idioma: {locale.toUpperCase()} | Conteúdo local</span>
        </div>
      </PageContainer>
    </div>
  );
}
