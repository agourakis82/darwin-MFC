import ComparisonSection from '@/app/components/Comparison/ComparisonSection';
import HeroSection from '@/app/components/Hero/HeroSection';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';
import { Baby, Heart, Ear, Eye, AlertCircle } from 'lucide-react';

export default function NeonatalPage() {
  const rastreamentos = getRastreamentosByCategory('neonatal');

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* Hero Section */}
        <HeroSection
          icon={<Baby className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={2} />}
          title="Triagem Neonatal"
          subtitle="Os Testes do Bebê"
          description="Programa Nacional de Triagem Neonatal (PNTN) garante acesso universal aos testes do Pezinho, Orelhinha, Olhinho, Coraçãozinho e Linguinha. Lei 14.154/2021 amplia Teste do Pezinho para até 50 doenças raras com implementação gradual até 2027. Janela de ouro para coleta: 3º ao 5º dia de vida."
          gradient="bg-gradient-to-br from-pink-600 via-rose-600 to-red-600"
          stats={[
            { value: `${rastreamentos.length}`, label: 'Testes' },
            { value: '50', label: 'Doenças' },
            { value: '3-5 dias', label: 'Janela Ideal' },
            { value: 'Q1', label: 'Padrão' }
          ]}
        />

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Teste do Pezinho
          </div>
          <div className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Ear className="w-4 h-4" />
            Orelhinha
          </div>
          <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Olhinho
          </div>
          <div className="px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Coraçãozinho
          </div>
        </div>

        {/* Rastreamentos Grid */}
        <div className="space-y-12">
          {rastreamentos.map((rastreamento) => (
            <div key={rastreamento.id} id={rastreamento.id} className="scroll-mt-24">
              <ComparisonSection rastreamento={rastreamento} />
            </div>
          ))}

          {rastreamentos.length === 0 && (
            <div className="text-center py-20 text-neutral-500 dark:text-neutral-400">
              <Baby className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Dados em construção.</p>
            </div>
          )}
        </div>

        {/* Info Box - Janela de Ouro */}
        <div className="mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800 p-8 shadow-lg">
          <div className="relative flex gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-600/30">
              <AlertCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                Janela de Ouro da Coleta
              </h3>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                A coleta ideal do Teste do Pezinho é entre o <strong>3º e 5º dia de vida</strong>.
                Em regiões remotas, o tempo de transporte da amostra ao laboratório central pode
                exceder o tempo seguro para diagnóstico de doenças metabólicas graves (Hiperplasia Adrenal Congênita, Deficiência de Biotinidase).
                A logística adequada é crucial para efetividade do programa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
