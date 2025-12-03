'use client';

import ComparisonSection from '../components/Comparison/ComparisonSection';
import CriticalAnalysisView from '../components/Analysis/CriticalAnalysisView';
import ContentModeWrapper from '../components/Content/ContentModeWrapper';
import { LogosGrid } from '../components/Logos/OfficialLogos';
import { OutrosInfographicsGrid } from '../components/Infographics/OfficialInfographics';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';

export default function OutrosPage() {
  const rastreamentos = getRastreamentosByCategory('outros');

  // Conteúdo Descritivo
  const descriptiveContent = (
    <>
      {/* Introdução */}
      <div className="mb-12">
        <div className="glass-strong rounded-2xl p-6 border border-[#ff9500]/20">
          <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
            📋 Sobre Esta Categoria
          </h2>
          <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed mb-4">
            Esta seção reúne rastreamentos que <strong>não são universais</strong> ou que possuem <strong>indicações específicas</strong>:
          </p>
          <ul className="space-y-2 text-base text-[#86868b]">
            <li className="flex items-start gap-2">
              <span className="text-[#ff9500]">●</span>
              <span><strong>Rastreamentos de Grupos de Risco:</strong> Tuberculose (contatos, PVHA, PPL), Hanseníase (contatos intradomiciliares)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff9500]">●</span>
              <span><strong>Rastreamentos Regionais:</strong> Doença de Chagas (áreas endêmicas de MG, BA, GO, TO)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff9500]">●</span>
              <span><strong>Rastreamentos Oportunísticos:</strong> Saúde Bucal, Violência Doméstica, Depressão na APS</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ff3b30]">●</span>
              <span><strong>NÃO Recomendados Universalmente:</strong> Glaucoma (custo-efetividade desfavorável)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Instituições */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-6 text-center">
          Instituições e Sociedades Relevantes
        </h2>
        <LogosGrid 
          size={120}
          logos={['SUS', 'SBMFC', 'CONITEC']}
        />
      </div>

      {/* Classificação Visual */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="glass-strong rounded-2xl p-6 border-l-4 border-[#34c759]">
          <h3 className="text-xl font-bold text-[#34c759] mb-3">✅ Grupos de Risco</h3>
          <p className="text-base text-[#86868b] mb-4">Rastreamento ativo em populações específicas com alto risco</p>
          <ul className="space-y-2 text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
            <li>• Tuberculose (contatos, PVHA, PPL)</li>
            <li>• Hanseníase (contatos)</li>
            <li>• Chagas (áreas endêmicas)</li>
          </ul>
        </div>

        <div className="glass-strong rounded-2xl p-6 border-l-4 border-[#ff9500]">
          <h3 className="text-xl font-bold text-[#ff9500] mb-3">🔄 Oportunísticos</h3>
          <p className="text-base text-[#86868b] mb-4">Rastreamento durante consultas de rotina na APS</p>
          <ul className="space-y-2 text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
            <li>• Saúde Bucal (Brasil Sorridente)</li>
            <li>• Violência Doméstica</li>
            <li>• Depressão (PHQ-2/PHQ-9)</li>
          </ul>
        </div>

        <div className="glass-strong rounded-2xl p-6 border-l-4 border-[#ff3b30]">
          <h3 className="text-xl font-bold text-[#ff3b30] mb-3">❌ Não Recomendados</h3>
          <p className="text-base text-[#86868b] mb-4">Rastreamento universal não indicado por custo-efetividade</p>
          <ul className="space-y-2 text-sm text-[#1d1d1f] dark:text-[#f5f5f7]">
            <li>• Glaucoma (USPSTF: evidência insuficiente)</li>
            <li>• Depressão universal (controvérsia)</li>
          </ul>
        </div>
      </div>

      {/* Infográficos Oficiais do Ministério da Saúde */}
      <div className="mb-16">
        <OutrosInfographicsGrid />
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
            Nenhum rastreamento encontrado nesta categoria.
          </div>
        )}
      </div>
    </>
  );

  // Conteúdo de Análise Crítica
  const criticalAnalysisContent = (
    <CriticalAnalysisView
      category="outros"
      title="Outros Rastreamentos"
      insights={[
        {
          id: 'outros-insight-1',
          title: 'Rastreamento de Grupos de Risco vs. Rastreamento Universal: Tensões Epistemológicas na APS',
          content: 'A distinção entre rastreamento universal (ex: mamografia 50-69 anos) e rastreamento de grupos de risco (ex: tuberculose em contatos) reflete uma tensão epistemológica fundamental na Medicina de Família e Comunidade: a lógica populacional versus a lógica individual. O rastreamento universal aplica protocolos padronizados a toda população elegível, enquanto o rastreamento de grupos de risco exige identificação ativa de indivíduos com características específicas (contato com TB, residência em área endêmica de Chagas, história de violência). Na prática da APS, esta distinção é operacionalmente desafiadora: o médico de família deve simultaneamente aplicar protocolos universais (mamografia, citopatológico) e identificar ativamente grupos de risco (perguntar sobre contato com TB, investigar sinais de violência). A PNAB 2017 (Portaria GM/MS nº 2.436/2017) define a APS como responsável por ambas as funções, mas não oferece ferramentas integradas para operacionalização. Resultado: rastreamentos universais têm indicadores de cobertura (PREVINE Brasil), enquanto rastreamentos de grupos de risco dependem de iniciativa individual do profissional, gerando heterogeneidade assistencial.',
          type: 'second_order',
          citations: ['PNAB 2017 - Portaria GM/MS nº 2.436/2017', 'PREVINE Brasil - Indicadores 2023', 'Gusso & Lopes. Tratado de MFC, 3ª ed., 2024'],
        },
        {
          id: 'outros-insight-2',
          title: 'Tuberculose e Hanseníase: O Paradoxo das Doenças Negligenciadas em Países de Renda Média',
          content: 'Brasil é o único país da América Latina entre os 30 de maior carga de tuberculose (OMS) e o 2º em casos de hanseníase no mundo (atrás da Índia). Ambas são doenças curáveis com tratamento disponível gratuitamente no SUS, mas persistem como problemas de saúde pública. O rastreamento de contatos é estratégia central para controle, mas enfrenta desafios operacionais na APS: (1) Apenas 56,8% dos contatos de TB são examinados (meta: 100%); (2) Investigação de contatos exige visita domiciliar (ACS) + consulta médica + exames (radiografia, PT, baciloscopia), gerando carga de trabalho adicional; (3) Populações mais afetadas (PPL, PSR, PVHA) têm acesso fragmentado à APS. A SBMFC propõe integração do rastreamento de TB/hanseníase à consulta de rotina (rastreamento oportunístico de sintomáticos respiratórios, exame de pele), mas não há financiamento específico (PREVINE Brasil não inclui indicadores de TB/hanseníase). Resultado: médico de família prioriza indicadores financiados (pré-natal, citopatológico) em detrimento de doenças negligenciadas.',
          type: 'third_order',
          citations: ['Manual de Recomendações para Controle da Tuberculose (MS 2019)', 'Diretrizes para Vigilância da Hanseníase (MS 2016)', 'SINAN 2023 - Indicadores Operacionais'],
        },
        {
          id: 'outros-insight-3',
          title: 'Violência Doméstica na APS: Entre a Notificação Compulsória e a Capacidade de Resposta',
          content: 'O rastreamento de violência doméstica na APS exemplifica a tensão entre mandato legal e capacidade operacional. A Lei 10.778/2003 estabelece notificação compulsória de violência contra mulher, e o ECA (Lei 8.069/1990) obriga notificação de violência contra criança. Porém, a subnotificação é estimada em 60-80%. Estudos qualitativos com médicos de família (SBMFC 2023) identificam barreiras: (1) Medo de represálias do agressor; (2) Falta de articulação com rede de proteção (CRAS, CREAS, Delegacia da Mulher); (3) Ausência de protocolo padronizado de abordagem; (4) Tempo de consulta insuficiente para investigação sensível. A SBMFC recomenda perguntas diretas sobre violência como parte da consulta de rotina, mas não há capacitação sistemática na residência de MFC. Resultado: rastreamento de violência depende de sensibilidade individual do profissional, perpetuando invisibilidade de vítimas que buscam APS por queixas somáticas (dor crônica, insônia, ansiedade) sem revelar contexto de violência.',
          type: 'third_order',
          citations: ['Lei 10.778/2003 - Notificação Compulsória de Violência contra Mulher', 'Linha de Cuidado para Atenção Integral em Situação de Violências (MS 2010)', 'SBMFC - Protocolo de Abordagem de Violência na APS 2023'],
        },
        {
          id: 'outros-insight-4',
          title: 'Depressão na APS: O Dilema do Rastreamento sem Retaguarda de Saúde Mental',
          content: 'O rastreamento de depressão com PHQ-2/PHQ-9 é recomendado pelo USPSTF (grau B) para adultos, mas a SBMFC adota posição mais cautelosa no contexto brasileiro. A controvérsia reflete diferença de contexto: nos EUA, rastreamento positivo leva a tratamento imediato (psicoterapia, antidepressivos); no SUS, a rede de saúde mental é fragmentada (CAPS com filas, psiquiatras escassos, psicólogos insuficientes). Rastrear depressão sem capacidade de tratamento gera: (1) Frustração do paciente (diagnóstico sem solução); (2) Sobrecarga do médico de família (que assume tratamento sem retaguarda); (3) Medicalização excessiva (fluoxetina como única resposta disponível). A SBMFC 2022 recomenda: priorizar rastreamento em grupos de alto risco (gestantes, idosos, doenças crônicas) sobre rastreamento universal; investir em capacitação do médico de família para manejo de depressão leve/moderada na APS; fortalecer NASF-AB (Núcleos de Apoio à Saúde da Família) com psicólogos. Sem esses investimentos, rastreamento universal de depressão pode ser iatrogenicamente prejudicial.',
          type: 'third_order',
          citations: ['USPSTF - Screening for Depression 2023 (JAMA)', 'SBMFC - Protocolo Clínico para Manejo da Depressão na APS 2022', 'Reforma Psiquiátrica Brasileira - Lei 10.216/2001'],
        },
      ]}
      controversies={[
        {
          id: 'outros-controversy-1',
          title: 'Glaucoma: Por Que NÃO Rastrear Universalmente? Lições para a APS',
          description: 'O glaucoma é a principal causa de cegueira irreversível no mundo, afetando 2-3% da população >40 anos (~3 milhões de brasileiros). Apesar da gravidade, USPSTF 2022, CBO e SUS concordam: rastreamento universal NÃO é recomendado. Por quê? (1) Baixo valor preditivo positivo: tonometria isolada gera muitos falsos-positivos (pressão intraocular elevada sem glaucoma); (2) Custo elevado: tonometria + campimetria + fundoscopia para toda população >40 anos é inviável; (3) Progressão lenta: glaucoma leva décadas para causar cegueira, permitindo detecção oportunística; (4) Grupos de risco identificáveis: afrodescendentes, história familiar, miopia alta concentram casos. Esta decisão ilustra princípio fundamental da Medicina Baseada em Evidências: nem toda doença grave justifica rastreamento universal. O médico de família deve identificar grupos de risco e referenciar para avaliação oftalmológica, não aplicar tonometria em massa. Lição para a APS: rastreamento é intervenção de saúde pública que deve ser avaliada por custo-efetividade, não apenas por gravidade da doença.',
          stakeholders: ['CBO', 'USPSTF', 'Ministério da Saúde', 'Médicos de Família'],
          citations: ['USPSTF - Screening for Glaucoma 2022 (JAMA)', 'CBO - Consenso Brasileiro de Glaucoma 2023', 'AAO - Preferred Practice Pattern: Glaucoma 2020'],
        },
        {
          id: 'outros-controversy-2',
          title: 'Doença de Chagas: Rastreamento Regional vs. Invisibilidade Nacional',
          description: 'Estima-se 1-3 milhões de brasileiros infectados por Trypanosoma cruzi, mas Chagas é uma "doença invisível": 70% dos portadores desconhecem o diagnóstico, e a maioria está assintomática até desenvolver cardiopatia chagásica crônica (20-30% dos infectados). O rastreamento é recomendado apenas em áreas endêmicas (MG, BA, GO, TO), mas a implementação depende de iniciativas estaduais fragmentadas. Exemplo: Projeto Norte de Minas (2023) rastreou 48 municípios e identificou 939 casos com ECG, mas não há programa nacional equivalente. Controvérsia: (1) Migrantes de áreas endêmicas para capitais (SP, RJ) não são rastreados; (2) Transmissão vertical (mãe-filho) não é universalmente investigada; (3) Benznidazol (tratamento) é efetivo apenas na fase aguda/indeterminada, gerando debate sobre custo-efetividade do rastreamento em portadores crônicos. A SBC propõe: rastreamento sorológico em gestantes de áreas endêmicas (prevenir transmissão vertical) + ECG anual em soropositivos (detectar cardiopatia precoce). Sem programa nacional, Chagas permanece doença negligenciada em país de renda média.',
          stakeholders: ['Ministério da Saúde', 'SBC', 'Secretarias Estaduais (MG, BA, GO)', 'OMS'],
          citations: ['II Consenso Brasileiro em Doença de Chagas 2015', 'PCDT Doença de Chagas (MS 2018)', 'Projeto de Rastreamento Norte de Minas (SES-MG 2023)'],
        },
      ]}
      operationalChallenges={[
        'Integração de Múltiplos Rastreamentos na Consulta de APS: Médico de família deve realizar simultaneamente rastreamentos universais, condicionais, de grupos de risco e oportunísticos. Tempo médio de consulta na ESF: 15-20 minutos. Sem ferramentas integradas (checklist eletrônico, alertas no prontuário), rastreamentos de grupos de risco são subnotificados.',
        'Capacitação para Rastreamentos Específicos: Rastreamentos como exame dermatoneurológico (hanseníase), identificação de sinais de violência, e aplicação de PHQ-9 (depressão) exigem capacitação específica. Apenas 23% dos programas de residência incluem módulo de hanseníase; 18% incluem abordagem de violência; 45% incluem saúde mental na APS.',
        'Articulação com Rede de Atenção Especializada: Casos positivos exigem referenciamento. Gargalos: TB → leitos escassos; Chagas → fila 6-12 meses para cardiologista; Violência → articulação intersetorial frágil; Depressão → CAPS (cobertura 40% dos municípios). Sem retaguarda, rastreamento gera demanda não absorvida.',
      ]}
      systemicImplications="A categoria 'Outros Rastreamentos' expõe uma tensão estrutural do SUS: a coexistência de lógicas operacionais distintas (universal vs. grupos de risco vs. oportunístico) sem integração adequada. O médico de família, na ponta do sistema, deve operacionalizar todas essas lógicas simultaneamente, mas as ferramentas disponíveis (prontuário eletrônico, indicadores de desempenho, capacitação) são desenhadas predominantemente para rastreamentos universais. Resultado: rastreamentos de grupos de risco (TB, hanseníase, Chagas, violência) dependem de iniciativa individual, gerando iniquidades. A SBMFC propõe: (1) Integração de alertas de grupos de risco no prontuário eletrônico (e-SUS AB); (2) Inclusão de indicadores de TB/hanseníase no PREVINE Brasil; (3) Capacitação sistemática em residência de MFC para rastreamentos específicos; (4) Fortalecimento da articulação APS-rede especializada. Sem essas mudanças, a APS continuará priorizando rastreamentos financiados em detrimento de doenças negligenciadas, perpetuando a invisibilidade de populações vulneráveis."
    />
  );

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-[#ff9500] rounded-xl flex items-center justify-center text-4xl shadow-md">
            📋
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
              Outros Rastreamentos
            </h1>
            <p className="text-lg text-[#86868b]">
              Grupos de Risco, Regionais e Oportunísticos
            </p>
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-6 border border-[#ff9500]/20">
          <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
            <strong>Rastreamentos Específicos na APS:</strong> Esta seção reúne rastreamentos que não se enquadram nas categorias universais 
            (neonatal, câncer, gestação, adultos). Inclui: <em>(1) Rastreamentos de grupos de risco</em> (tuberculose em contatos, PVHA, PPL; 
            hanseníase em contatos intradomiciliares); <em>(2) Rastreamentos regionais</em> (Doença de Chagas em áreas endêmicas); 
            <em>(3) Rastreamentos oportunísticos</em> (saúde bucal, violência doméstica, depressão); e <em>(4) Rastreamentos NÃO recomendados 
            universalmente</em> (glaucoma). Cada rastreamento possui indicações precisas, população-alvo definida e referências Q1+ verificadas.
          </p>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="glass-strong rounded-2xl p-5 text-center">
          <div className="text-4xl font-bold text-[#34c759]">3</div>
          <div className="text-sm text-[#86868b]">Grupos de Risco</div>
        </div>
        <div className="glass-strong rounded-2xl p-5 text-center">
          <div className="text-4xl font-bold text-[#ff9500]">3</div>
          <div className="text-sm text-[#86868b]">Oportunísticos</div>
        </div>
        <div className="glass-strong rounded-2xl p-5 text-center">
          <div className="text-4xl font-bold text-[#007aff]">1</div>
          <div className="text-sm text-[#86868b]">Regional</div>
        </div>
        <div className="glass-strong rounded-2xl p-5 text-center">
          <div className="text-4xl font-bold text-[#ff3b30]">1</div>
          <div className="text-sm text-[#86868b]">Não Recomendado</div>
        </div>
      </div>

      <ContentModeWrapper
        descriptiveContent={descriptiveContent}
        criticalAnalysisContent={criticalAnalysisContent}
      />

      {/* Referências Principais */}
      <div className="mt-16 glass-strong rounded-2xl p-8 border border-[#007aff]/20">
        <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
          📚 Referências Principais (Q1+ SOTA)
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-base">
          <div>
            <h4 className="font-semibold text-[#007aff] mb-3">Tuberculose e Hanseníase</h4>
            <ul className="space-y-2 text-[#86868b]">
              <li>• Manual de Recomendações para Controle da Tuberculose (MS 2019)</li>
              <li>• Protocolo de Vigilância da ILTB (MS 2018)</li>
              <li>• Diretrizes para Vigilância da Hanseníase (MS 2016)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#007aff] mb-3">Doença de Chagas</h4>
            <ul className="space-y-2 text-[#86868b]">
              <li>• II Consenso Brasileiro em Doença de Chagas 2015</li>
              <li>• PCDT Doença de Chagas (MS/CONITEC 2018)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#007aff] mb-3">Saúde Bucal e Violência</h4>
            <ul className="space-y-2 text-[#86868b]">
              <li>• Política Nacional de Saúde Bucal - Brasil Sorridente (MS 2024)</li>
              <li>• Linha de Cuidado para Atenção em Situação de Violências (MS 2010)</li>
              <li>• VIVA: Instrutivo de Notificação de Violência (MS 2017)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#007aff] mb-3">Saúde Mental e Glaucoma</h4>
            <ul className="space-y-2 text-[#86868b]">
              <li>• USPSTF - Screening for Depression 2023 (JAMA)</li>
              <li>• SBMFC - Protocolo de Depressão na APS 2022</li>
              <li>• USPSTF - Screening for Glaucoma 2022 (JAMA)</li>
              <li>• CBO - Consenso Brasileiro de Glaucoma 2023</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

