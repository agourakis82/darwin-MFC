'use client';

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { 
  Search, Pill, AlertTriangle, Heart, Baby, Activity,
  ChevronRight, BookOpen, TestTube, Shield, Stethoscope
} from 'lucide-react';
import { medicamentos, getMedicamentosByClasse } from '@/lib/data/medicamentos';
import { CLASSES_TERAPEUTICAS, ClasseTerapeutica, CLASSIFICACAO_GESTACAO } from '@/lib/types/medicamento';

export default function MedicamentosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClasse, setSelectedClasse] = useState<ClasseTerapeutica | 'todas'>('todas');
  const [showRENAME, setShowRENAME] = useState(false);
  
  const medicamentosAgrupados = useMemo(() => getMedicamentosByClasse(medicamentos), []);
  
  const medicamentosFiltrados = useMemo(() => {
    let filtered = medicamentos;
    
    if (showRENAME) {
      filtered = filtered.filter(m => m.rename);
    }
    
    if (selectedClasse !== 'todas') {
      filtered = filtered.filter(m => m.classeTerapeutica === selectedClasse);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.nomeGenerico.toLowerCase().includes(term) ||
        m.nomesComerciais?.some(n => n.toLowerCase().includes(term)) ||
        m.indicacoes.some(i => i.toLowerCase().includes(term)) ||
        m.tags?.some(t => t.toLowerCase().includes(term))
      );
    }
    
    return filtered;
  }, [searchTerm, selectedClasse, showRENAME]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Pill className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
              Bulário APS
            </h1>
            <p className="text-lg text-[#86868b]">
              Medicamentos essenciais para a Atenção Primária à Saúde
            </p>
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-5 border border-emerald-500/30">
          <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7]">
            <strong className="text-emerald-600 dark:text-emerald-400">💊 {medicamentos.length} Medicamentos</strong> com posologia, interações, ajuste renal e segurança na gestação. 
            Baseado na <strong>RENAME 2024</strong> e bulas ANVISA.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome genérico, comercial ou indicação..."
            className="w-full pl-12 pr-4 py-4 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50 text-[#1d1d1f] dark:text-[#f5f5f7] focus:ring-2 focus:ring-emerald-500 text-lg"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* RENAME Toggle */}
        <button
          onClick={() => setShowRENAME(!showRENAME)}
          className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            showRENAME
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-white/50 dark:bg-neutral-800/50 text-[#86868b] hover:bg-emerald-100 dark:hover:bg-emerald-900/30'
          }`}
        >
          <Shield className="w-4 h-4" />
          Apenas RENAME
        </button>
        
        {/* Class Filter */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setSelectedClasse('todas')}
              className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                selectedClasse === 'todas'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/50 dark:bg-neutral-800/50 text-[#86868b] hover:bg-blue-100'
              }`}
            >
              Todas ({medicamentos.length})
            </button>
            {medicamentosAgrupados.slice(0, 8).map(grupo => (
              <button
                key={grupo.classe}
                onClick={() => setSelectedClasse(grupo.classe)}
                className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedClasse === grupo.classe
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/50 dark:bg-neutral-800/50 text-[#86868b] hover:bg-blue-100'
                }`}
              >
                {grupo.label} ({grupo.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {medicamentosFiltrados.length === 0 ? (
        <div className="text-center py-20">
          <Pill className="w-16 h-16 mx-auto mb-4 text-[#86868b] opacity-30" />
          <p className="text-xl text-[#86868b]">Nenhum medicamento encontrado</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicamentosFiltrados.map((med) => {
            const classeInfo = CLASSES_TERAPEUTICAS[med.classeTerapeutica];
            const gestacaoInfo = CLASSIFICACAO_GESTACAO[med.gestacao];
            
            return (
              <Link
                key={med.id}
                href={`/medicamentos/${med.id}`}
                className="group glass-strong rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-emerald-500/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors capitalize">
                      {med.nomeGenerico}
                    </h3>
                    {med.nomesComerciais && (
                      <p className="text-sm text-[#86868b]">
                        {med.nomesComerciais.slice(0, 2).join(', ')}
                      </p>
                    )}
                  </div>
                  {med.rename && (
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full">
                      RENAME
                    </span>
                  )}
                </div>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 ${classeInfo.color} text-white text-xs font-medium rounded-full`}>
                    {classeInfo.label}
                  </span>
                  <span className={`px-2 py-1 ${gestacaoInfo.color} text-white text-xs font-medium rounded-full flex items-center gap-1`}>
                    <Baby className="w-3 h-3" />
                    Cat. {med.gestacao}
                  </span>
                </div>
                
                {/* Indicações */}
                <p className="text-sm text-[#86868b] line-clamp-2 mb-4">
                  {med.indicacoes.slice(0, 2).join(' • ')}
                </p>
                
                {/* Quick Info */}
                <div className="flex items-center gap-4 text-xs text-[#86868b]">
                  {med.interacoes.length > 0 && (
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      {med.interacoes.length} interações
                    </span>
                  )}
                  {med.ajusteDoseRenal && med.ajusteDoseRenal.length > 0 && (
                    <span className="flex items-center gap-1">
                      <TestTube className="w-3 h-3 text-blue-500" />
                      Ajuste renal
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">Classes Terapêuticas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {medicamentosAgrupados.slice(0, 6).map((grupo) => (
            <button
              key={grupo.classe}
              onClick={() => setSelectedClasse(grupo.classe)}
              className="glass-subtle rounded-xl p-4 text-center hover:shadow-lg transition-all hover:scale-105"
            >
              <Pill className="w-8 h-8 mx-auto mb-2 text-[#86868b]" />
              <div className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                {grupo.count}
              </div>
              <div className="text-xs text-[#86868b]">{grupo.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

