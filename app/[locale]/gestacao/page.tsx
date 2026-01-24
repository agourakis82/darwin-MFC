'use client';

import ComparisonSection from '@/app/components/Comparison/ComparisonSection';
import CriticalAnalysisView from '@/app/components/Analysis/CriticalAnalysisView';
import ContentModeWrapper from '@/app/components/Content/ContentModeWrapper';
import { ContentContainer } from '@/app/components/Layout/Containers';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';

export default function GestacaoPage() {
  const rastreamentos = getRastreamentosByCategory('gestacao');

  const descriptiveContent = (
    <div>
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🤰
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
              Rastreamentos no Pré-Natal
            </h1>
            <p className="text-lg text-[#86868b]">
              Sífilis, HIV, Hepatites, GBS e Diabetes Gestacional
            </p>
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-6 border border-[#af52de]/20">
          <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
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
          <div className="text-center py-12 text-[#86868b]">
            Dados em construção.
          </div>
        )}
      </div>

      {/* Meta Zero */}
      <div className="mt-12 glass-strong rounded-2xl p-8 border border-[#ff3b30]/20">
        <h3 className="font-bold text-2xl mb-4 text-[#1d1d1f] dark:text-[#f5f5f7]">
          🎯 Meta: Zerar Transmissão Vertical
        </h3>
        <p className="text-base text-[#86868b] mb-6">
          O Brasil aderiu às metas OMS de eliminação da transmissão vertical de HIV, sífilis e hepatite B.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card-base p-4">
            <div className="font-semibold text-lg text-[#1d1d1f] dark:text-[#f5f5f7]">HIV</div>
            <div className="text-sm text-[#86868b] mt-1">Redução de 20-40% → {'<'}1% com TARV</div>
          </div>
          <div className="card-base p-4">
            <div className="font-semibold text-lg text-[#1d1d1f] dark:text-[#f5f5f7]">Sífilis</div>
            <div className="text-sm text-[#86868b] mt-1">Prevenir ~100% com tratamento até 30 dias antes do parto</div>
          </div>
          <div className="card-base p-4">
            <div className="font-semibold text-lg text-[#1d1d1f] dark:text-[#f5f5f7]">Hepatite B</div>
            <div className="text-sm text-[#86868b] mt-1">Redução de 90% → {'<'}5% com profilaxia</div>
          </div>
        </div>
      </div>
    </div>
  );

  const criticalAnalysisContent = (
    <CriticalAnalysisView
      category="gestacao"
      title="Rastreamentos no Pré-Natal"
      systemicImplications="Os rastreamentos gestacionais ilustram o paradoxo entre protocolos bem estabelecidos e falhas na cascata de cuidados. A detecção precoce só se traduz em outcomes quando há tratamento oportuno e seguimento adequado."
    />
  );

  return (
    <ContentContainer className="py-12">
      <ContentModeWrapper
        descriptiveContent={descriptiveContent}
        criticalAnalysisContent={criticalAnalysisContent}
      />
    </ContentContainer>
  );
}

