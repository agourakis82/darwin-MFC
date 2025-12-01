import ComparisonSection from '../components/Comparison/ComparisonSection';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';

export default function NeonatalPage() {
  const rastreamentos = getRastreamentosByCategory('neonatal');

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center text-3xl">
            👶
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Triagem Neonatal
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Os "Testes do Bebê" - Pezinho, Orelhinha, Olhinho, Coraçãozinho e Linguinha
            </p>
          </div>
        </div>
        
        <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Programa Nacional de Triagem Neonatal:</strong> Garante a todo recém-nascido acesso a exames 
            essenciais antes da alta. Lei 14.154/2021 amplia Teste do Pezinho para até 50 doenças raras (implementação gradual até 2027).
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

      {/* Info Box */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-pink-50 dark:from-blue-950/30 dark:to-pink-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-3">Janela de Ouro da Coleta</h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          A coleta ideal do Teste do Pezinho é entre o <strong>3º e 5º dia de vida</strong>. 
          Em regiões remotas, o tempo de transporte da amostra ao laboratório central pode 
          exceder o tempo seguro para diagnóstico de doenças metabólicas graves (Hiperplasia Adrenal, Deficiência de Biotinidase).
        </p>
      </div>
    </div>
  );
}

