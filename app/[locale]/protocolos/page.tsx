'use client';

/**
 * PÁGINA DE PROTOCOLOS INTERATIVOS - DARWIN-MFC
 * ==============================================
 * 
 * Fluxogramas clicáveis para decisão clínica
 */

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { GitFork, Search, Workflow, ExternalLink, Filter, Clock, ChevronRight } from 'lucide-react';
import { todosProtocolosFlowchart } from '@/lib/data/protocolos-flowchart';

const categorias = [
  { id: 'todos', label: 'Todos', cor: 'bg-slate-500' },
  { id: 'cardiovascular', label: 'Cardiovascular', cor: 'bg-rose-500' },
  { id: 'endocrino', label: 'Endócrino', cor: 'bg-amber-500' },
  { id: 'respiratorio', label: 'Respiratório', cor: 'bg-cyan-500' },
  { id: 'saude_mental', label: 'Saúde Mental', cor: 'bg-purple-500' },
  { id: 'musculoesqueletico', label: 'Musculoesquelético', cor: 'bg-orange-500' },
  { id: 'infectologia', label: 'Infectologia', cor: 'bg-yellow-500' },
  { id: 'urgencia', label: 'Urgência', cor: 'bg-red-600' },
  { id: 'materno_infantil', label: 'Materno-Infantil', cor: 'bg-pink-500' },
];

export default function ProtocolosPage() {
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
      cardiovascular: 'from-rose-500 to-red-600',
      endocrino: 'from-amber-500 to-orange-600',
      respiratorio: 'from-cyan-500 to-blue-600',
      saude_mental: 'from-purple-500 to-violet-600',
      musculoesqueletico: 'from-orange-500 to-amber-600',
      infectologia: 'from-yellow-500 to-lime-600',
      urgencia: 'from-red-600 to-rose-700',
      materno_infantil: 'from-pink-500 to-rose-600',
    };
    return gradients[categoria] || 'from-slate-500 to-slate-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Workflow className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Protocolos Clínicos
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {todosProtocolosFlowchart.length} fluxogramas interativos para tomada de decisão na APS
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar protocolos por nome, categoria ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg shadow-sm"
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
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {protocolosFiltrados.length} protocolo{protocolosFiltrados.length !== 1 ? 's' : ''} encontrado{protocolosFiltrados.length !== 1 ? 's' : ''}
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
                  className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                  
                  <div className="p-6">
                    {/* Title */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {protocolo.titulo}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>

                    {/* Subtitle */}
                    {protocolo.subtitulo && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        {protocolo.subtitulo}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                      {protocolo.descricao}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${gradient} text-white`}>
                        {protocolo.categoria.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {protocolo.nodes.length} etapas
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {protocolo.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                      {protocolo.tags.length > 4 && (
                        <span className="px-2 py-1 text-slate-400 text-xs">
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
            <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Nenhum protocolo encontrado
            </h3>
            <p className="text-slate-500 dark:text-slate-500">
              Tente buscar com outros termos ou limpe os filtros
            </p>
            <button
              onClick={() => { setSearchTerm(''); setCategoriaAtiva('todos'); }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 rounded-2xl border border-purple-200 dark:border-purple-800">
          <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            Como usar os protocolos
          </h3>
          <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-500">1.</span>
              Clique em um protocolo para abrir o fluxograma interativo
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">2.</span>
              Navegue pelos nós clicando nas opções apresentadas
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">3.</span>
              Use o zoom e pan para explorar fluxogramas complexos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">4.</span>
              Ao final, copie a conduta para colar no prontuário
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
