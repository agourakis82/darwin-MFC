import ComparisonSection from '../components/Comparison/ComparisonSection';
import HeroSection from '../components/Hero/HeroSection';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';
import { Users, Brain, Eye, Droplet, Stethoscope } from 'lucide-react';

export default function InfantilPage() {
  const rastreamentos = getRastreamentosByCategory('infantil');

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* Hero Section */}
        <HeroSection
          icon={<Users className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={2} />}
          title="Saúde Infantil"
          subtitle="Rastreamentos em Pediatria"
          description="Triagem precoce de Transtorno do Espectro Autista (TEA), avaliação do desenvolvimento neuropsicomotor, prevenção de anemia ferropriva e detecção de problemas visuais. Implementação universal do M-CHAT-R para TEA aos 16-30 meses, aproveitando a janela de neuroplasticidade para intervenções precoces com evidências robustas (grau A)."
          gradient="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600"
          stats={[
            { value: `${rastreamentos.length}`, label: 'Protocolos' },
            { value: 'M-CHAT-R', label: 'TEA Universal' },
            { value: '2025', label: 'Atualizado' },
            { value: 'Q1', label: 'Padrão' }
          ]}
        />

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Neurodesenvolvimento
          </div>
          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Visão
          </div>
          <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Droplet className="w-4 h-4" />
            Anemia
          </div>
          <div className="px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Puericultura
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
              <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Dados em construção.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
