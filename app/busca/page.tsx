import AdvancedSearch from '../components/Search/AdvancedSearch';
import { Search, BookOpen, Pill, Activity } from 'lucide-react';

export default function BuscaPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Search className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
              Busca Unificada
            </h1>
            <p className="text-lg text-[#86868b]">
              Encontre doenças, medicamentos e rastreamentos
            </p>
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-5 border border-blue-500/30">
          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7]">
              <strong className="text-blue-600 dark:text-blue-400">🔍 Busca Inteligente:</strong> Busque por nome, CIAP-2, CID-10, sinônimos ou classe terapêutica.
            </p>
            <div className="flex gap-3 text-sm">
              <span className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 rounded-full">
                <BookOpen className="w-4 h-4 text-blue-500" /> Doenças
              </span>
              <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-full">
                <Pill className="w-4 h-4 text-emerald-500" /> Medicamentos
              </span>
              <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 rounded-full">
                <Activity className="w-4 h-4 text-purple-500" /> Rastreamentos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Componente de Busca */}
      <AdvancedSearch />
    </div>
  );
}

