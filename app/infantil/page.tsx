import ComparisonSection from '../components/Comparison/ComparisonSection';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';

export default function InfantilPage() {
  const rastreamentos = getRastreamentosByCategory('infantil');

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-3xl">
            🧒
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Saúde Infantil
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Autismo, Desenvolvimento, Anemia e Visão
            </p>
          </div>
        </div>
        
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Novidade 2025:</strong> Implementação universal do M-CHAT-R para triagem de TEA 
            aos 16-30 meses, aproveitando a janela de neuroplasticidade para intervenções precoces.
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
            Dados em construção. Consulte a seção de bibliografia para referências completas.
          </div>
        )}
      </div>
    </div>
  );
}

