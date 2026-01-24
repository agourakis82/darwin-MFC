'use client';

/**
 * PÁGINA DE PROTOCOLOS INTERATIVOS - DARWIN MEDICAL HUB
 * ======================================================
 *
 * Fluxogramas clicáveis para decisão clínica
 */

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { GitFork, Search, Workflow, ExternalLink, Filter, Clock, ChevronRight } from 'lucide-react';
import { PageContainer } from '@/app/components/Layout/Containers';
import { todosProtocolosFlowchart } from '@/lib/data/protocolos-flowchart';

export default function ProtocolosPage() {
  const t = useTranslations('protocolos');

  const categorias = [
    { id: 'todos', label: t('categories.all'), cor: 'bg-helix-navy' },
    { id: 'cardiovascular', label: t('categories.cardiovascular'), cor: 'bg-critical-red-500' },
    { id: 'endocrino', label: t('categories.endocrine'), cor: 'bg-thymine-gold' },
    { id: 'respiratorio', label: t('categories.respiratory'), cor: 'bg-cytosine-cyan' },
    { id: 'saude_mental', label: t('categories.mentalHealth'), cor: 'bg-purple-600' },
    { id: 'musculoesqueletico', label: t('categories.musculoskeletal'), cor: 'bg-orange-500' },
    { id: 'infectologia', label: t('categories.infectology'), cor: 'bg-thymine-gold' },
    { id: 'urgencia', label: t('categories.emergency'), cor: 'bg-critical-red-500' },
    { id: 'materno_infantil', label: t('categories.maternalChild'), cor: 'bg-pink-500' },
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

  const protocolosFiltrados = useMemo(() => {
    return todosProtocolosFlowchart.filter(p => {
      const matchSearch = searchTerm === '' || 
        p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.subtitulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchCategoria = categoriaAtiva === 'todos' || p.categoria === categoriaAtiva;
      
      return matchSearch && matchCategoria;
    });
  }, [searchTerm, categoriaAtiva]);

  const getCategoriaGradient = (categoria: string) => {
    const gradients: Record<string, string> = {
      cardiovascular: 'from-critical-red-500 to-red-600',
      endocrino: 'from-thymine-gold to-orange-600',
      respiratorio: 'from-cytosine-cyan to-adenine-teal',
      saude_mental: 'from-purple-500 to-violet-600',
      musculoesqueletico: 'from-orange-500 to-amber-600',
      infectologia: 'from-thymine-gold to-lime-600',
      urgencia: 'from-critical-red-500 to-rose-700',
      materno_infantil: 'from-pink-500 to-rose-600',
    };
    return gradients[categoria] || 'from-helix-navy to-adenine-teal';
  };

  return (
    <div className="min-h-screen bg-phosphate dark:bg-carbon-900">
      <PageContainer className="py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-helix-navy to-adenine-teal rounded-2xl flex items-center justify-center shadow-lg">
            <Workflow className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-helix-navy dark:text-white">
              {t('title')}
            </h1>
            <p className="text-carbon-500 dark:text-carbon-400">
              {t('subtitle', { count: todosProtocolosFlowchart.length })}
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-carbon-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-carbon-800 border border-carbon-200 dark:border-carbon-700 rounded-2xl text-helix-navy dark:text-white placeholder-carbon-400 focus:outline-none focus:ring-2 focus:ring-adenine-teal focus:border-transparent text-lg shadow-sm"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoriaAtiva(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  categoriaAtiva === cat.id
                    ? `${cat.cor} text-white shadow-lg`
                    : 'bg-white dark:bg-carbon-800 text-carbon-600 dark:text-carbon-400 border border-carbon-200 dark:border-carbon-700 hover:border-adenine-teal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-carbon-500 dark:text-carbon-400 mb-6">
          {t('results', { count: protocolosFiltrados.length })}
        </p>

        {/* Protocols Grid */}
        {protocolosFiltrados.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocolosFiltrados.map((protocolo) => {
              const gradient = getCategoriaGradient(protocolo.categoria);
              
              return (
                <Link
                  key={protocolo.id}
                  href={`/protocolos/flowchart/${protocolo.id}`}
                  className="group card-darwin relative overflow-hidden rounded-2xl hover:border-adenine-teal dark:hover:border-cytosine-cyan transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                  
                  <div className="p-6">
                    {/* Title */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-lg font-display font-bold text-helix-navy dark:text-white group-hover:text-adenine-teal dark:group-hover:text-cytosine-cyan transition-colors">
                        {protocolo.titulo}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-carbon-300 group-hover:text-adenine-teal group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>

                    {/* Subtitle */}
                    {protocolo.subtitulo && (
                      <p className="text-sm text-carbon-500 dark:text-carbon-400 mb-4">
                        {protocolo.subtitulo}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-sm text-carbon-600 dark:text-carbon-300 mb-4 line-clamp-2 font-body">
                      {protocolo.descricao}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${gradient} text-white`}>
                        {protocolo.categoria.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-carbon-500 dark:text-carbon-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {t('steps', { count: protocolo.nodes.length })}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {protocolo.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-adenine-teal/10 dark:bg-adenine-teal/20 text-adenine-teal dark:text-cytosine-cyan text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                      {protocolo.tags.length > 4 && (
                        <span className="px-2 py-1 text-carbon-400 text-xs">
                          +{protocolo.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto mb-4 text-carbon-300" />
            <h3 className="text-xl font-display font-semibold text-carbon-600 dark:text-carbon-400 mb-2">
              {t('noResults')}
            </h3>
            <p className="text-carbon-500 dark:text-carbon-500">
              {t('tryOtherTerms')}
            </p>
            <button
              onClick={() => { setSearchTerm(''); setCategoriaAtiva('todos'); }}
              className="mt-4 btn-darwin-primary"
            >
              <span>{t('clearFilters')}</span>
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 p-6 bg-gradient-to-r from-adenine-teal/10 to-guanine-green/10 dark:from-adenine-teal/20 dark:to-guanine-green/20 rounded-2xl border border-adenine-teal/20 dark:border-adenine-teal/30">
          <h3 className="font-display font-bold text-helix-navy dark:text-white mb-3 flex items-center gap-2">
            <Workflow className="w-5 h-5 text-adenine-teal" />
            {t('howToUse.title')}
          </h3>
          <ul className="text-sm text-carbon-600 dark:text-carbon-300 space-y-2 font-body">
            <li className="flex items-start gap-2">
              <span className="text-adenine-teal font-bold">1.</span>
              {t('howToUse.step1')}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-adenine-teal font-bold">2.</span>
              {t('howToUse.step2')}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-adenine-teal font-bold">3.</span>
              {t('howToUse.step3')}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-adenine-teal font-bold">4.</span>
              {t('howToUse.step4')}
            </li>
          </ul>
        </div>
      </PageContainer>
    </div>
  );
}
