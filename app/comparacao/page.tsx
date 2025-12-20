import CoverageChart from '../components/Charts/CoverageChart';
import ConvergenceChart from '../components/Charts/ConvergenceChart';
import TimelineChart from '../components/Charts/TimelineChart';
import { BarChart3 } from 'lucide-react';

export default function ComparacaoPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Visão Comparativa Global
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Análise Quantitativa e Panorama de Convergências
            </p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="space-y-8">
        <TimelineChart />
        
        <div className="grid lg:grid-cols-2 gap-8">
          <CoverageChart />
          <ConvergenceChart />
        </div>

        {/* Tabela Resumo */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-600">
            <h3 className="text-xl font-bold text-white">
              Tabela Síntese Comparativa
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Condição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    SUS - População/Frequência
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Sociedades Médicas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    India (NP-NCD)
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {comparativeData.map((row, index) => (
                  <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {row.condicao}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      {row.sus}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      {row.sociedades}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      {row.india || '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Conclusão */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Síntese Analítica
          </h3>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              <strong>Convergências Fundamentais:</strong> Observa-se amplo alinhamento entre políticas públicas e sociedades 
              na maioria das áreas (triagem neonatal, pré-natal, hipertensão). Muitas diretrizes MS são formuladas com 
              participação dessas entidades.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              <strong>Divergências Estratégicas:</strong> Onde divergem, sociedades propõem ampliar rastreamento 
              (mais precocemente ou abrangente) com base em dados atualizados, enquanto SUS avalia custo-efetividade 
              e prioridades para implementação gradual.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              <strong>Implicação Clínica:</strong> Profissionais devem ponderar caso a caso. Onde sociedades recomendam 
              mais amplamente que SUS, seguir evidência científica em benefício do paciente, mas sempre visando equidade - 
              objetivo final é SUS expandir programas conforme viabilidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; icon: string }> = {
    'convergencia': { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300', icon: '🟢' },
    'parcial': { bg: 'bg-amber-100 dark:bg-amber-900', text: 'text-amber-700 dark:text-amber-300', icon: '🟡' },
    'divergencia': { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300', icon: '🔴' },
    'em_disputa': { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-700 dark:text-purple-300', icon: '🟣' },
  };

  const style = styles[status] || styles.convergencia;
  
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      <span>{style.icon}</span>
      <span>{status === 'convergencia' ? 'Alta' : status === 'parcial' ? 'Parcial' : status === 'divergencia' ? 'Divergente' : 'Disputa'}</span>
    </span>
  );
}

const comparativeData = [
  {
    condicao: 'Câncer de Mama',
    sus: '40 anos (Decisão Compartilhada), bienal',
    sociedades: '40 anos (SBM/CBR), anual',
    india: '30+ anos, CBE anual (NP-NCD)',
    status: 'parcial'
  },
  {
    condicao: 'Colo do Útero',
    sus: 'DNA-HPV (30-64 anos), quinquenal',
    sociedades: 'DNA-HPV (FEBRASGO), quinquenal',
    india: '30-65 anos, VIA 3-5 anos (NP-NCD)',
    status: 'convergencia'
  },
  {
    condicao: 'Câncer Oral',
    sus: 'Oportunístico (sem programa organizado)',
    sociedades: 'Oportunístico em grupos de risco',
    india: '30+ anos, OVI anual/bienal (NP-NCD)',
    status: 'parcial'
  },
  {
    condicao: 'Câncer Colorretal',
    sus: 'Em definição (Lei: 35a / Técnica: 50a)',
    sociedades: '45 anos (SBOC)',
    india: '-',
    status: 'em_disputa'
  },
  {
    condicao: 'Câncer de Próstata',
    sus: 'Não Recomendado (decisão compartilhada)',
    sociedades: 'Recomendado 45/50a (SBU)',
    india: '-',
    status: 'divergencia'
  },
  {
    condicao: 'Diabetes Tipo 2',
    sus: '45 anos / Risco CV',
    sociedades: '35 anos (SBD)',
    india: '30+ anos com fatores de risco (NP-NCD)',
    status: 'parcial'
  },
  {
    condicao: 'Hipertensão Arterial',
    sus: '≥18 anos, toda consulta',
    sociedades: '≥18 anos (SBC)',
    india: '≥18 anos (NP-NCD)',
    status: 'convergencia'
  },
  {
    condicao: 'Autismo (TEA)',
    sus: 'M-CHAT-R (16-30m)',
    sociedades: 'M-CHAT-R (SBP)',
    india: '-',
    status: 'convergencia'
  },
  {
    condicao: 'Sífilis Pré-natal',
    sus: '1º tri, 3º tri, parto',
    sociedades: 'Igual + mais se risco (FEBRASGO)',
    india: '-',
    status: 'convergencia'
  },
  {
    condicao: 'HIV Pré-natal',
    sus: '1º tri, 3º tri',
    sociedades: '1º tri, 3º tri, parto (FEBRASGO)',
    india: '-',
    status: 'convergencia'
  },
  {
    condicao: 'Teste do Pezinho',
    sus: 'Universal (3º-5º dia), 6-7 doenças → 50',
    sociedades: 'Universal (SBP)',
    india: '-',
    status: 'convergencia'
  },
];

