import ComparisonSection from '../components/Comparison/ComparisonSection';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';

export default function GestacaoPage() {
  const rastreamentos = getRastreamentosByCategory('gestacao');

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center text-3xl">
            🤰
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Rastreamentos no Pré-Natal
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Sífilis, HIV, Hepatites, GBS e Diabetes Gestacional
            </p>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Pacote de Rastreamentos Gestacionais:</strong> Gestantes constituem grupo com rastreamentos específicos 
            visando proteger saúde materna e principalmente prevenir desfechos adversos fetais. Protocolo regido pelo 
            Manual Técnico de Gestação de Baixo Risco (atualização em andamento).
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
            Dados em construção.
          </div>
        )}
      </div>

      {/* Meta Zero */}
      <div className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-3 text-red-900 dark:text-red-100">
          🎯 Meta: Zerar Transmissão Vertical
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
          O Brasil aderiu às metas OMS de eliminação da transmissão vertical de HIV, sífilis e hepatite B.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100">HIV</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Redução de 20-40% → {'<'}1% com TARV</div>
          </div>
          <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100">Sífilis</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Prevenir ~100% com tratamento até 30 dias antes do parto</div>
          </div>
          <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100">Hepatite B</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Redução de 90% → {'<'}5% com profilaxia</div>
          </div>
        </div>
      </div>
    </div>
  );
}

