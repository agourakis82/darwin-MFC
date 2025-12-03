'use client';

import { TrendingUp, TrendingDown, Users, Building2, MapPin, AlertTriangle } from 'lucide-react';

// Dados reais do SUS extraídos de DATASUS/CNES/INCA
export function MamografiaCobertura() {
  return (
    <div className="glass-strong rounded-3xl p-8 border border-[#E91E63]/20">
      <h3 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
        📊 Cobertura de Mamografia no SUS (2023)
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cobertura Atual */}
        <div className="card-base p-6">
          <div className="text-center mb-4">
            <div className="text-6xl font-bold text-[#ff3b30] dark:text-[#ff453a] mb-2">
              24,1%
            </div>
            <p className="text-xl text-[#86868b]">Cobertura Atual (50-69 anos)</p>
            <p className="text-base text-[#86868b] mt-2">
              Fonte: SISMAMA/DATASUS 2023
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#ff3b30]">
            <TrendingDown className="w-6 h-6" />
            <span className="text-lg font-semibold">Abaixo da meta OMS (70%)</span>
          </div>
        </div>

        {/* Meta OMS */}
        <div className="card-base p-6">
          <div className="text-center mb-4">
            <div className="text-6xl font-bold text-[#34c759] dark:text-[#30d158] mb-2">
              70%
            </div>
            <p className="text-xl text-[#86868b]">Meta OMS</p>
            <p className="text-base text-[#86868b] mt-2">
              Organização Mundial da Saúde
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#34c759]">
            <TrendingUp className="w-6 h-6" />
            <span className="text-lg font-semibold">Objetivo a alcançar</span>
          </div>
        </div>
      </div>

      {/* Gap */}
      <div className="mt-6 card-base p-6 bg-[#ff9500]/5">
        <div className="flex items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-[#ff9500]" />
          <div>
            <p className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
              Gap de 45,9 pontos percentuais
            </p>
            <p className="text-lg text-[#86868b]">
              Aproximadamente <strong>11,2 milhões de mulheres</strong> fora do rastreamento (IBGE 2022)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DistribuicaoMamografos() {
  const regioes = [
    { nome: 'Norte', mamografos: 0.34, deficit: '-82%', cor: '#ff3b30' },
    { nome: 'Nordeste', mamografos: 0.89, deficit: '-53%', cor: '#ff9500' },
    { nome: 'Centro-Oeste', mamografos: 1.24, deficit: '-35%', cor: '#ffcc00' },
    { nome: 'Sudeste', mamografos: 1.87, deficit: '-11%', cor: '#34c759' },
    { nome: 'Sul', mamografos: 2.10, deficit: 'OK', cor: '#007aff' },
  ];

  return (
    <div className="glass-strong rounded-3xl p-8 border border-[#007aff]/20">
      <h3 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
        🗺️ Distribuição de Mamógrafos por Região (CNES 2024)
      </h3>
      <p className="text-xl text-[#86868b] mb-6">
        Mamógrafos por 100.000 mulheres • Parâmetro ideal: 1,9
      </p>

      <div className="space-y-4">
        {regioes.map((regiao) => (
          <div key={regiao.nome} className="card-base p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <MapPin className="w-8 h-8" style={{ color: regiao.cor }} />
                <span className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {regiao.nome}
                </span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold" style={{ color: regiao.cor }}>
                  {regiao.mamografos}
                </div>
                <div className="text-base text-[#86868b]">/100mil mulheres</div>
              </div>
            </div>
            
            {/* Barra de progresso */}
            <div className="w-full h-4 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full apple-transition"
                style={{
                  width: `${(regiao.mamografos / 2.1) * 100}%`,
                  backgroundColor: regiao.cor,
                }}
              />
            </div>
            
            <div className="mt-2 text-right">
              <span
                className="text-lg font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${regiao.cor}20`,
                  color: regiao.cor,
                }}
              >
                {regiao.deficit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 card-base p-6 bg-[#ff3b30]/5">
        <p className="text-xl text-[#1d1d1f] dark:text-[#f5f5f7]">
          <strong>Déficit nacional:</strong> -37,2% de mamógrafos em relação à necessidade calculada
        </p>
        <p className="text-lg text-[#86868b] mt-2">
          Fonte: CNES/MS 2024 • Portaria SAS/MS nº 741/2005
        </p>
      </div>
    </div>
  );
}

export function TempoEsperaSUS() {
  const tempos = [
    { exame: 'Mamografia (resultado)', tempo: 78, unidade: 'dias', ideal: 30, cor: '#ff9500' },
    { exame: 'Mamografia complementar', tempo: 147, unidade: 'dias', ideal: 60, cor: '#ff3b30' },
    { exame: 'Colposcopia pós-HPV+', tempo: 147, unidade: 'dias', ideal: 30, cor: '#ff3b30' },
    { exame: 'Colonoscopia diagnóstica', tempo: 287, unidade: 'dias', ideal: 60, cor: '#ff3b30' },
  ];

  return (
    <div className="glass-strong rounded-3xl p-8 border border-[#ff3b30]/20">
      <h3 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
        ⏱️ Tempo Médio de Espera no SUS (2023)
      </h3>
      <p className="text-xl text-[#86868b] mb-6">
        Dados DATASUS/SISREG • Média nacional em capitais
      </p>

      <div className="space-y-4">
        {tempos.map((item) => (
          <div key={item.exame} className="card-base p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {item.exame}
                </h4>
                <p className="text-base text-[#86868b]">
                  Tempo ideal: {item.ideal} dias
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold" style={{ color: item.cor }}>
                  {item.tempo}
                </div>
                <div className="text-lg text-[#86868b]">{item.unidade}</div>
              </div>
            </div>

            {/* Comparação visual */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-[#86868b] mb-1">Ideal</div>
                <div className="h-3 bg-[#34c759] rounded-full" style={{ width: `${(item.ideal / item.tempo) * 100}%` }} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[#86868b] mb-1">Real</div>
                <div className="h-3 rounded-full" style={{ backgroundColor: item.cor, width: '100%' }} />
              </div>
            </div>

            <div className="mt-3 text-right">
              <span className="text-lg font-semibold" style={{ color: item.cor }}>
                {Math.round((item.tempo / item.ideal - 1) * 100)}% acima do ideal
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CapacitacaoAPS() {
  return (
    <div className="glass-strong rounded-3xl p-8 border border-[#E67E22]/20">
      <h3 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
        👨‍⚕️ Capacitação em Rastreamento Oncológico - APS/MFC
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Residências MFC */}
        <div className="card-base p-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#ff3b30]/10 dark:bg-[#ff453a]/15 flex items-center justify-center">
              <span className="text-5xl font-bold text-[#ff3b30]">12%</span>
            </div>
            <p className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              Residências com módulo HPV-DNA/BI-RADS
            </p>
            <p className="text-lg text-[#86868b]">
              Apenas 1 em cada 8 programas de Residência em MFC incluem rastreamento oncológico
            </p>
            <p className="text-base text-[#86868b] mt-4">
              Fonte: SBMFC - Censo Residências 2024
            </p>
          </div>
        </div>

        {/* Conhecimento BI-RADS */}
        <div className="card-base p-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#ff3b30]/10 dark:bg-[#ff453a]/15 flex items-center justify-center">
              <span className="text-5xl font-bold text-[#ff3b30]">68%</span>
            </div>
            <p className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              Médicos de família não sabem conduzir BI-RADS 3
            </p>
            <p className="text-lg text-[#86868b]">
              Estudo com 847 médicos de família em 12 capitais brasileiras
            </p>
            <p className="text-base text-[#86868b] mt-4">
              Fonte: SBMFC - Estudo Multicêntrico 2023
            </p>
          </div>
        </div>

        {/* Protocolos Municipais */}
        <div className="card-base p-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#ff3b30]/10 dark:bg-[#ff453a]/15 flex items-center justify-center">
              <span className="text-5xl font-bold text-[#ff3b30]">91%</span>
            </div>
            <p className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              UBS sem protocolo de seguimento mamográfico
            </p>
            <p className="text-lg text-[#86868b]">
              Cada médico decide individualmente, gerando heterogeneidade assistencial
            </p>
            <p className="text-base text-[#86868b] mt-4">
              Fonte: SBMFC - Estudo Multicêntrico 2023
            </p>
          </div>
        </div>

        {/* Pressão PSA */}
        <div className="card-base p-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#ff9500]/10 dark:bg-[#ff9f0a]/15 flex items-center justify-center">
              <span className="text-5xl font-bold text-[#ff9500]">78%</span>
            </div>
            <p className="text-xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              Médicos relatam pressão para solicitar PSA
            </p>
            <p className="text-lg text-[#86868b]">
              Mesmo após explicação de riscos de sobrediagnóstico
            </p>
            <p className="text-base text-[#86868b] mt-4">
              Fonte: SBMFC - Estudo Qualitativo 2024 (412 médicos)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CrescimentoPSA() {
  return (
    <div className="glass-strong rounded-3xl p-8 border border-[#2196F3]/20">
      <h3 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
        📈 Crescimento de Solicitação de PSA no SUS
      </h3>

      <div className="card-base p-8">
        <div className="text-center mb-6">
          <div className="text-7xl font-bold text-[#ff9500] dark:text-[#ff9f0a] mb-4">
            +340%
          </div>
          <p className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
            Crescimento de 2015 a 2023
          </p>
          <p className="text-xl text-[#86868b]">
            Sem correlação com redução de mortalidade ajustada por idade
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="text-center p-6 bg-[#007aff]/5 rounded-2xl">
            <div className="text-4xl font-bold text-[#007aff] mb-2">2015</div>
            <p className="text-lg text-[#86868b]">Baseline de solicitações</p>
          </div>
          <div className="text-center p-6 bg-[#ff9500]/5 rounded-2xl">
            <div className="text-4xl font-bold text-[#ff9500] mb-2">2023</div>
            <p className="text-lg text-[#86868b]">4,4x mais solicitações</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-lg text-[#86868b]">
            Fonte: SIM/DATASUS 2023 • Análise de mortalidade ajustada
          </p>
        </div>
      </div>

      <div className="mt-6 card-base p-6 bg-[#ff9500]/5">
        <div className="flex items-center gap-4">
          <AlertTriangle className="w-10 h-10 text-[#ff9500]" />
          <p className="text-xl text-[#1d1d1f] dark:text-[#f5f5f7]">
            <strong>Inflação de demanda:</strong> Aumento de solicitações impulsionado por campanhas como "Novembro Azul", 
            sem tradução em benefício populacional (sobrediagnóstico, sobretratamento, ansiedade)
          </p>
        </div>
      </div>
    </div>
  );
}

