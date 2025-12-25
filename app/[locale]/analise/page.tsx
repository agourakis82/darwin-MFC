import { getAnaliseCritica } from '@/lib/data/analise-critica';
import InlineCitation from '@/app/components/Bibliography/InlineCitation';
import { Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';

export default function AnalisePage() {
  const analises = ['cancer-mama', 'cancer-colo-utero', 'cancer-prostata', 'tea-autismo'].map(getAnaliseCritica).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Análise Crítica Sistêmica
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Insights de Segunda e Terceira Ordem
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            2025: O Ano da Ruptura Epistemológica
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            O exercício financeiro e sanitário de 2025 consolidou-se como um marco disruptivo na história 
            das políticas públicas de saúde no Brasil. Até o final de 2024, o SUS operava sob uma lógica de 
            rastreamento de DCNTs e neoplasias majoritariamente conservadora. A produção normativa de 2025 
            sinaliza uma reorientação profunda: transição tecnológica (HPV molecular), expansão etária (mamografia 40+), 
            e pressão legislativa (Lei Preta Gil).
          </p>
        </div>
      </div>

      {/* Análises Críticas */}
      <div className="space-y-12">
        {analises.map((analise) => {
          if (!analise) return null;
          
          return (
            <div key={analise.rastreamentoId} className="space-y-6">
              {/* Contexto */}
              <div className="bg-white dark:bg-neutral-900 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {analise.rastreamentoId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </h3>
                {analise.paradigmShift && (
                  <div className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-xs font-bold mb-3">
                    ⚡ Mudança Paradigmática
                  </div>
                )}
                <p className="text-neutral-700 dark:text-neutral-300 italic">
                  {analise.context}
                </p>
              </div>

              {/* Insights */}
              {analise.insights.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Insights Analíticos
                  </h4>
                  
                  {analise.insights.map((insight) => (
                    <div 
                      key={insight.id}
                      className={`border-2 rounded-xl p-5 ${
                        insight.type === 'terceira_ordem' 
                          ? 'border-purple-300 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-700' 
                          : 'border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-bold text-neutral-900 dark:text-neutral-100">
                          {insight.title}
                        </h5>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          insight.type === 'terceira_ordem'
                            ? 'bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-200'
                            : 'bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-200'
                        }`}>
                          {insight.type === 'terceira_ordem' ? '3ª Ordem' : '2ª Ordem'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                        {insight.description}
                      </p>
                      
                      <div className="bg-white dark:bg-neutral-800 rounded-lg p-3">
                        <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                          Implicação Sistêmica:
                        </div>
                        <div className="text-sm text-neutral-800 dark:text-neutral-200">
                          {insight.implication} <InlineCitation citation={insight.citations} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Controvérsias */}
              {analise.controversies.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Controvérsias e Debates
                  </h4>
                  
                  {analise.controversies.map((controversy) => (
                    <div key={controversy.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                      <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800">
                        <h5 className="font-bold text-neutral-900 dark:text-neutral-100">
                          {controversy.topic}
                        </h5>
                      </div>
                      
                      <div className="grid md:grid-cols-2 divide-x divide-neutral-200 dark:divide-neutral-700">
                        {/* Posição A */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                              A
                            </div>
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                              {controversy.positionA.entity}
                            </span>
                          </div>
                          <div className="text-sm text-neutral-700 dark:text-neutral-300">
                            {controversy.positionA.argument} <InlineCitation citation={controversy.positionA.citations} />
                          </div>
                        </div>

                        {/* Posição B */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                              B
                            </div>
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                              {controversy.positionB.entity}
                            </span>
                          </div>
                          <div className="text-sm text-neutral-700 dark:text-neutral-300">
                            {controversy.positionB.argument} <InlineCitation citation={controversy.positionB.citations} />
                          </div>
                        </div>
                      </div>

                      {/* Síntese */}
                      <div className="px-6 py-4 bg-amber-50 dark:bg-amber-950/20 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                          Síntese:
                        </div>
                        <p className="text-sm text-neutral-800 dark:text-neutral-200">
                          {controversy.synthesis}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Desafios */}
              {analise.challenges.length > 0 && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-red-900 dark:text-red-100 mb-4">
                    Desafios de Implementação
                  </h4>
                  
                  {analise.challenges.map((challenge, index) => (
                    <div key={index} className="space-y-3 text-sm">
                      <div>
                        <span className="font-semibold text-red-800 dark:text-red-300">Operacional:</span>
                        <span className="text-neutral-700 dark:text-neutral-300 ml-2">{challenge.operational}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-red-800 dark:text-red-300">Financeiro:</span>
                        <span className="text-neutral-700 dark:text-neutral-300 ml-2">{challenge.financial}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-red-800 dark:text-red-300">Equidade:</span>
                        <span className="text-neutral-700 dark:text-neutral-300 ml-2">{challenge.equity}</span>
                      </div>
                      <div className="pt-2 border-t border-red-200 dark:border-red-800 text-xs">
                        Referências: <InlineCitation citation={challenge.citations} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Conclusão */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  Conclusão Sistêmica
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {analise.conclusion}
                </p>
              </div>

              <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
            </div>
          );
        })}
      </div>

      {/* Conclusão Geral */}
      <div className="mt-16 bg-gradient-to-br from-neutral-900 to-blue-900 dark:from-neutral-950 dark:to-blue-950 border border-neutral-800 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">
          O Desafio da Equidade na Era Tecnológica
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">
            A análise do panorama de rastreamento em 2025 revela um Sistema Único de Saúde em profunda transformação. 
            A incorporação do teste molecular para HPV e a redução da idade da mamografia para 40 anos representam 
            vitórias históricas da medicina baseada em evidência e da sociedade civil.
          </p>
          <p className="mb-4">
            <strong>Contudo, a convergência normativa esconde um abismo operacional.</strong> A "Lei Preta Gil" e as 
            novas portarias criam direitos subjetivos que pressionam orçamentos já exauridos. O risco iminente para 
            2026-2027 é a exacerbação da iniquidade: um Brasil que oferece genotipagem de HPV e mamografia digital 
            nas capitais do Sul e Sudeste, enquanto o Norte e Nordeste lutam para oferecer o básico.
          </p>
          <p>
            <strong>O sucesso das diretrizes de 2025 não será medido pelo número de testes realizados, mas pela 
            redução efetiva da mortalidade e morbidade nos anos subsequentes.</strong> O desafio migrou da caneta do 
            legislador para a planilha do gestor logístico.
          </p>
        </div>
      </div>
    </div>
  );
}

