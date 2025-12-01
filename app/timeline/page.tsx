import { Clock, TrendingUp } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-amber-600 rounded-xl flex items-center justify-center">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Timeline 2025
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              O Ano da Ruptura Epistemológica
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-600" />
            Mudanças Paradigmáticas em 2025
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300">
            O exercício financeiro e sanitário de 2025 consolidou-se como um marco disruptivo na história 
            das políticas públicas de saúde no Brasil. O modelo vigente priorizava o rastreamento oportunístico 
            em detrimento do rastreamento organizado, caracterizado pela busca ativa e controle de qualidade populacional.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Linha vertical */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800"></div>

        {/* Eventos */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="relative pl-20">
              {/* Dot */}
              <div className={`absolute left-6 w-5 h-5 rounded-full border-4 ${event.color} bg-white dark:bg-neutral-900`}></div>
              
              {/* Card */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                      {event.date}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                      {event.title}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.badgeColor}`}>
                    {event.category}
                  </span>
                </div>
                
                <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                  {event.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="font-semibold">Impacto:</span>
                  <span className={`px-2 py-0.5 rounded ${event.impactColor}`}>
                    {event.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const events = [
  {
    date: 'Agosto 2025',
    title: 'Portaria Conjunta SAES/SECTICS Nº 13',
    description: 'Aprovação das Diretrizes Brasileiras para Rastreamento do Câncer de Colo do Útero com incorporação do teste molecular de DNA-HPV, substituindo gradualmente o Papanicolau.',
    category: 'Portaria',
    impact: 'Alto',
    color: 'border-emerald-500',
    badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    impactColor: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  },
  {
    date: 'Setembro 2025',
    title: 'Ampliação da Mamografia (40-49 anos)',
    description: 'Ministério da Saúde garante acesso à mamografia de rastreamento para mulheres de 40 a 49 anos mediante decisão compartilhada, expandindo para 50-74 anos o rastreamento organizado.',
    category: 'Nota Técnica',
    impact: 'Alto',
    color: 'border-pink-500',
    badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
    impactColor: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  },
  {
    date: 'Setembro 2025',
    title: 'Protocolo M-CHAT-R para TEA',
    description: 'Lançamento da Linha de Cuidado para TEA com triagem universal usando M-CHAT-R entre 16-30 meses, integrado à Caderneta da Criança Digital.',
    category: 'Diretriz',
    impact: 'Alto',
    color: 'border-blue-500',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    impactColor: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  },
  {
    date: '2025 (Em tramitação)',
    title: 'PL 4153/2025 - "Lei Preta Gil"',
    description: 'Projeto de Lei propõe rastreamento de câncer colorretal com PSOF a partir dos 35 anos e colonoscopia aos 45 anos, gerando debate sobre custo-efetividade.',
    category: 'Lei',
    impact: 'Médio',
    color: 'border-purple-500',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    impactColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
  },
  {
    date: 'Novembro 2025',
    title: 'Alerta SBM sobre Termografia',
    description: 'Sociedade Brasileira de Mastologia emite alerta contra comercialização de termografia mamária como método de rastreamento, reforçando que mamografia é o único método validado.',
    category: 'Nota de Sociedade',
    impact: 'Baixo',
    color: 'border-amber-500',
    badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    impactColor: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
  },
];

