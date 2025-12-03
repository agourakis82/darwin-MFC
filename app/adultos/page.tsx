import ComparisonSection from '../components/Comparison/ComparisonSection';
import HeroSection from '../components/Hero/HeroSection';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';
import { Activity, Heart, Droplets, Stethoscope } from 'lucide-react';

export default function AdultosPage() {
  const rastreamentos = getRastreamentosByCategory('adultos');

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* Modern Hero Section */}
        <HeroSection
          icon={<Activity className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={2} />}
          title="Saúde do Adulto"
          subtitle="Rastreamentos em Atenção Primária"
          description="Prevenção e detecção precoce de doenças crônicas não transmissíveis (DCNTs), infecções sexualmente transmissíveis (ISTs) e complicações cardiovasculares. Protocolos baseados em evidências grau A do Ministério da Saúde e sociedades médicas brasileiras."
          gradient="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600"
          stats={[
            { value: `${rastreamentos.length}`, label: 'Protocolos' },
            { value: '8', label: 'Condições' },
            { value: '2025', label: 'Atualizado' },
            { value: 'Q1', label: 'Padrão' }
          ]}
        />

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Cardiometabólicas
          </div>
          <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            ISTs
          </div>
          <div className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            Hepatites
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
              <Activity className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Dados em construção.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

