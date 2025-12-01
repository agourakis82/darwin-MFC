import AdvancedSearch from '../components/Search/AdvancedSearch';
import { Search } from 'lucide-react';

export default function BuscaPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
            <Search className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Busca Avançada
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Encontre rastreamentos por conteúdo, categoria ou convergência
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Busca Inteligente:</strong> Utiliza algoritmo fuzzy (Fuse.js) para encontrar resultados mesmo com erros de digitação. 
            Combine busca textual com filtros por categoria, status de convergência e ano de atualização.
          </p>
        </div>
      </div>

      {/* Componente de Busca */}
      <AdvancedSearch />
    </div>
  );
}

