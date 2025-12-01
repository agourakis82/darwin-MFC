import ComparisonSection from '../components/Comparison/ComparisonSection';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';

export default function CancerPage() {
  const rastreamentos = getRastreamentosByCategory('cancer');

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center text-3xl">
            🎗️
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Rastreamento de Câncer
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Mama, Colo do Útero, Próstata e Colorretal
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>2025: Ano da Ruptura Epistemológica.</strong> Incorporação do teste molecular de HPV, 
            ampliação da mamografia para 40-49 anos, e tramitação da "Lei Preta Gil" para rastreamento 
            colorretal marcam mudanças paradigmáticas na política de rastreamento oncológico no Brasil.
          </p>
        </div>
      </div>

      {/* Rastreamentos */}
      <div className="space-y-16">
        {rastreamentos.map((rastreamento) => (
          <div key={rastreamento.id} id={rastreamento.id}>
            <ComparisonSection rastreamento={rastreamento} />
          </div>
        ))}
        
        {rastreamentos.length === 0 && (
          <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
            Nenhum rastreamento encontrado nesta categoria.
          </div>
        )}
      </div>
    </div>
  );
}

