'use client';

import ComparisonSection from '@/app/components/Comparison/ComparisonSection';
import CriticalAnalysisView from '@/app/components/Analysis/CriticalAnalysisView';
import ContentModeWrapper from '@/app/components/Content/ContentModeWrapper';
import InstitutionLogos, { SUSStructureDiagram } from '@/app/components/Logos/InstitutionLogos';
import { LogosGrid } from '@/app/components/Logos/OfficialLogos';
import { 
  MamografiaCobertura, 
  DistribuicaoMamografos, 
  TempoEsperaSUS,
  CapacitacaoAPS,
  CrescimentoPSA 
} from '@/app/components/Infographics/RealDataInfographics';
import { CancerInfographicsGrid } from '@/app/components/Infographics/OfficialInfographics';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';

export default function CancerPage() {
  const rastreamentos = getRastreamentosByCategory('cancer');

  // Conteúdo Descritivo
  const descriptiveContent = (
    <>
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🎗️
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
              Rastreamento de Câncer
            </h1>
            <p className="text-lg text-[#86868b]">
              Mama, Colo do Útero, Próstata e Colorretal
            </p>
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-6 border border-[#007aff]/20">
          <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
            <strong>2025: Ano da Ruptura Paradigmática no Rastreamento Oncológico na APS.</strong> A incorporação do teste molecular de HPV-DNA pela CONITEC (2024), 
            a ampliação da mamografia para 40-69 anos (Portaria GM/MS nº 1.253/2023), e a tramitação da "Lei Preta Gil" (rastreamento colorretal obrigatório) 
            representam transformações profundas no escopo de atuação da Atenção Primária à Saúde e da Medicina de Família e Comunidade. 
            Estas mudanças exigem: <em>(1) nova arquitetura de sistemas de informação integrados (e-SUS/SISCAN);</em> <em>(2) capacitação massiva de equipes de Saúde da Família;</em> 
            <em>(3) reestruturação da rede de atenção especializada;</em> <em>(4) protocolos municipais para gestão de casos inconclusivos.</em> 
            A APS, como coordenadora do cuidado, encontra-se no epicentro desta transição, mas carece de ferramentas, formação e retaguarda 
            para operacionalizar o rastreamento oncológico de forma integral, longitudinal e equânime.
          </p>
        </div>
      </div>

      {/* Instituições Envolvidas */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 text-center tracking-tight">
          Instituições e Sociedades Médicas Brasileiras
        </h2>
        
        <LogosGrid 
          size={140}
          logos={['SUS', 'INCA', 'CONITEC', 'SBMFC', 'SBM', 'FEBRASGO', 'SBU', 'SBCP']}
        />
      </div>

      {/* Infográficos Oficiais do INCA e Ministério da Saúde */}
      <div className="mb-16">
        <CancerInfographicsGrid />
      </div>

      {/* Infográficos com Dados Reais */}
      <div className="space-y-12 mb-16">
        <MamografiaCobertura />
        <DistribuicaoMamografos />
        <CapacitacaoAPS />
        <TempoEsperaSUS />
        <CrescimentoPSA />
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
    <>
      {/* Estrutura do SUS */}
      <div className="mb-12">
        <SUSStructureDiagram />
      </div>

      {/* Infográficos Dados Reais - Modo Análise */}
      <div className="space-y-12 mb-16">
        <MamografiaCobertura />
        <DistribuicaoMamografos />
        <CapacitacaoAPS />
        <TempoEsperaSUS />
        <CrescimentoPSA />
      </div>

      <CriticalAnalysisView
        category="cancer"
        title="Rastreamento de Câncer"
        didacticIntro="Esta análise explora os desafios do rastreamento oncológico no SUS sob a perspectiva do médico de família na Atenção Primária. Organizamos os insights em 3 níveis: (1) Observações diretas - problemas visíveis no dia a dia; (2) Padrões sistêmicos - como esses problemas se repetem e se conectam; (3) Tensões epistemológicas - conflitos entre diferentes lógicas de organização do cuidado. Cada insight inclui dados reais, exemplos práticos de UBS brasileiras e uma mensagem-chave para facilitar a compreensão."
        insights={[
        {
          id: 'cancer-insight-1',
          title: 'APS como Ordenadora do Rastreamento: O Desafio da Fragmentação Programática vs. Coordenação do Cuidado',
          content: 'A Política Nacional de Atenção Básica (PNAB 2017 - Portaria GM/MS nº 2.436/2017) define a APS como "ordenadora da rede" e "coordenadora do cuidado", mas a operacionalização dos rastreamentos oncológicos ocorre através de programas verticais fragmentados (SISMAMA, SISCOLO), cada um com metas, indicadores e sistemas de informação independentes. Esta lógica programática vertical entra em tensão com o modelo de cuidado longitudinal e integral preconizado pela Medicina de Família e Comunidade (MFC). O médico de família na UBS deveria realizar rastreamento oportunístico integrado durante consultas de rotina (ex: mulher 50 anos em consulta de HAS poderia simultaneamente ter solicitados citopatológico + mamografia + pesquisa sangue oculto nas fezes), mas a fragmentação dos sistemas (e-SUS AB vs SISMAMA vs SISCOLO) não permite visualização unificada do status de rastreamentos do indivíduo. Dados do PREVINE Brasil (Indicador 2023) mostram que apenas 24,3% das mulheres elegíveis realizam citopatológico e mamografia no mesmo ano na mesma UBS, evidenciando perda massiva de oportunidades assistenciais. A Sociedade Brasileira de Medicina de Família e Comunidade (SBMFC) propõe o "Prontuário de Rastreamentos Integrados" como solução, mas não há financiamento para desenvolvimento no e-SUS AB.',
          type: 'second_order',
          citations: ['Portaria GM/MS nº 2.436/2017 (PNAB)', 'PREVINE Brasil - Relatório 2023', 'SBMFC - Posicionamento 2024', 'Gusso & Lopes. Tratado de MFC, 3ª ed., 2024'],
          practicalExample: 'UBS Parque das Flores - Belo Horizonte/MG: Joana, 55 anos, comparece à consulta de renovação de receita de losartana com Dr. Pedro. Ao revisar prontuário, Dr. Pedro nota: último citopatológico há 4 anos (sistema e-SUS AB mostra isso). Ele pergunta sobre mamografia. Joana diz: "Fiz ano passado, Doutor, a senhora lá do postinho pediu". Dr. Pedro tenta buscar resultado no e-SUS: não consta. Liga na recepção: "o resultado de mamografia não fica no e-SUS, fica no SISMAMA". Acessa SISMAMA (sistema separado, login diferente): resultado não localizado. Joana lembra que fez em outro município (mora na divisa). Dr. Pedro tenta SISREG intermunicipal: sem acesso (precisa de autorização da Secretaria). Solicita nova mamografia "para garantir". Joana reclama: "Mas eu já fiz, Doutor!". Dr. Pedro explica que não consegue acessar. Joana sai frustrada. Dois meses depois, nova mamografia: BI-RADS 2 (benigno). Custo: R$ 187 ao SUS. Mamografia anterior (que Dr. Pedro não achou): também BI-RADS 2. Resultado: duplicação desnecessária de exame, frustração da usuária, desperdício de recursos públicos, médico sem capacidade de coordenar o cuidado.',
          keyTakeaway: 'Sistemas de informação fragmentados (e-SUS AB, SISMAMA, SISCOLO) impedem o médico de família de exercer seu papel de coordenador do cuidado, gerando duplicação de exames, perda de seguimento e frustração profissional e da população. A APS não pode ser "ordenadora da rede" sem ferramentas informacionais integradas.',
        },
        {
          id: 'cancer-insight-2',
          title: 'Mamografia 40-69 anos na APS: Ampliação de Escopo sem Capacitação ou Rede de Apoio Diagnóstico',
          content: 'A Portaria GM/MS nº 1.253/2023 ampliou a mamografia de rastreamento para 40-69 anos, mas não previu: (1) capacitação dos médicos de família para interpretação de BI-RADS e condução de casos inconclusivos (BI-RADS 0, 3); (2) fortalecimento da rede de apoio diagnóstico para mamografia complementar/ultrassom; (3) sistema de recall informatizado na APS para reconvocação das faltosas. O CNES/2024 registra que apenas 18,7% das UBS têm acesso regulado a mamografia em até 30 dias. Na prática, o médico de família solicita mamografia mas não recebe resultado em tempo hábil (média 78 dias - DATASUS 2023), não consegue agendar mamografia adicional para BI-RADS 0 (fila média 4-6 meses), e perde o seguimento da usuária que migra para sistema privado ou desiste. Estudo multicêntrico da SBMFC (2023) com 847 médicos de família mostrou que 68,2% não sabem conduzir BI-RADS 3, e 91,4% das UBS não possuem protocolo local para seguimento de rastreamento mamográfico. A ampliação etária sem estruturação da APS gera frustração profissional, judicialização (usuária cobra resultado que não chega) e perpetua iniquidades (mulheres de baixa escolaridade desistem após primeira mamografia inconclusiva).',
          type: 'third_order',
          citations: ['Portaria GM/MS nº 1.253/2023', 'CNES/MS 2024', 'SBMFC - Estudo Multicêntrico 2023', 'Duncan et al. Medicina Ambulatorial, 5ª ed., 2023'],
          practicalExample: 'UBS Vila Nova - São Paulo/SP: Dra. Ana solicita mamografia para Maria, 52 anos, que retorna após 3 meses sem resultado. Dra. Ana liga no SISREG: "resultado ainda não foi digitado". Após 78 dias, resultado chega: BI-RADS 0 (inconclusivo - necessita mamografia adicional). Dra. Ana tenta agendar no SISREG: sem vagas. Liga na Central de Regulação: "fila média 6 meses". Maria pergunta: "Doutora, tenho câncer?". Dra. Ana explica que precisa de outro exame, mas não tem vaga. Maria, assustada, pega empréstimo e faz particular (R$ 350). Retorna com ultrassom: BI-RADS 3 (nódulo benigno, controle em 6 meses). Dra. Ana não consegue agendar mamografia de controle pelo SUS. Maria abandona acompanhamento. Este ciclo se repete com 8 de cada 10 mamografias BI-RADS 0 nesta UBS.',
          keyTakeaway: 'Ampliar faixa etária de rastreamento sem estruturar rede de apoio diagnóstico transforma detecção precoce em fonte de ansiedade, frustração e aprofundamento de desigualdades. O médico de família vira "solicitador" sem conseguir ser "coordenador do cuidado".',
        },
        {
          id: 'cancer-insight-3',
          title: 'Teste de HPV-DNA e o Protagonismo da APS: Autocoleta, Gestão de Casos HPV+ e Integração com Atenção Especializada',
          content: 'A incorporação do teste de HPV-DNA pelo SUS (CONITEC Relatório nº 862/2024, implementação prevista 2025-2027) representa mudança paradigmática no rastreamento do câncer do colo do útero, com implicações diretas para o processo de trabalho da APS/MFC. O teste permite autocoleta domiciliar (sensibilidade 97,9% vs 88,6% da coleta profissional - Arbyn et al., BMJ 2018), potencialmente ampliando cobertura em áreas rurais e entre mulheres com baixa adesão ao exame ginecológico. Entretanto, o médico de família deverá gerenciar novos fluxos: (1) mulheres HPV+ com citologia negativa (conduta: repetir em 1 ano ou referenciar para colposcopia?); (2) mulheres HPV+ citologia ASC-US (encaminhar? observar?); (3) intervalo de rastreamento de 5 anos para HPV- (vs 3 anos do Papanicolau), gerando necessidade de sistemas de recall de longo prazo. A Rede de Atenção à Saúde (RAS) oncológica carece de protocolos de regulação para colposcopia pós-HPV+, com tempo médio de espera de 147 dias em capitais do Nordeste (MS/Rede Cegonha 2023). Sem capacitação específica da APS (apenas 12% dos Programas de Residência em MFC incluem módulo sobre teste HPV-DNA - SBMFC/2024) e sem integração e-SUS/SISCOLO, o teste pode aumentar detecção sem melhorar desfechos clínicos, gerando ansiedade em mulheres HPV+ aguardando colposcopia.',
          type: 'second_order',
          citations: ['CONITEC - Relatório 862/2024', 'Arbyn et al., BMJ 2018;363:k4823', 'MS - Rede Cegonha 2023', 'SBMFC - Censo Residências MFC 2024'],
          practicalExample: 'UBS Rio Doce - Vitória/ES: Em 2025, após implementação do teste HPV-DNA, Dra. Fernanda entrega kit de autocoleta para Carla, 38 anos, que há 6 anos não faz citopatológico (tem vergonha do exame especular). Carla faz autocoleta em casa, leva amostra à UBS. Após 21 dias, resultado: HPV-DNA POSITIVO (alto risco oncogênico - tipos 16/18). Protocolo municipal: solicitar citologia reflexa. Nova coleta. Citologia: NEGATIVO para lesão intraepitelial. Dra. Fernanda abre protocolo CONITEC: "HPV+ com citologia negativa = repetir em 1 ano OU colposcopia imediata se alto risco (16/18)". Carla tem tipos 16/18. Dra. Fernanda tenta agendar colposcopia no SISREG: "fila média 5 meses". Liga na Central: "estamos estruturando fluxo para HPV+, ainda sem protocolo específico". Dra. Fernanda explica para Carla: "Você tem vírus de alto risco, mas não tem lesão agora. Precisa fazer colposcopia, mas fila é longa". Carla entra em pânico: "Doutora, vou ter câncer?". Dra. Fernanda passa 20 minutos acalmando, explicando história natural do HPV. Carla sai ansiosa, passa 5 meses sem dormir bem, desenvolve ansiedade generalizada. Quando faz colposcopia: colo normal, sem lesão. Ansiedade desnecessária causada por lacuna entre detecção e rede de apoio.',
          keyTakeaway: 'Incorporar tecnologia de alta sensibilidade (teste HPV-DNA) sem estruturar rede de colposcopia, capacitar APS para manejo de HPV+ e criar protocolos claros de condução transforma rastreamento eficaz em fonte de ansiedade e sobrecarga do médico de família, que detecta mas não consegue acompanhar adequadamente.',
        },
        {
          id: 'cancer-insight-4',
          title: 'Rastreamento de Câncer de Próstata na APS: Medicina Baseada em Evidências, Decisão Compartilhada e Pressão do "Novembro Azul"',
          content: 'O médico de família enfrenta tensão cotidiana entre: (A) Diretriz INCA/MS (Nota Técnica 001/2023) - contrária ao rastreamento populacional com PSA/toque retal, baseada em evidências de alto NNS (1.410/9 anos para prevenir 1 morte - ERSPC trial) e danos substanciais (sobrediagnóstico 40-50%, ansiedade, biópsia com complicações, tratamentos com disfunção erétil/incontinência); (B) Guideline SBU 2023 - recomenda "decisão compartilhada" a partir de 50 anos, criando espaço para solicitação individualizada; (C) Pressão da população masculina amplificada pelo "Novembro Azul" (campanha que omite riscos de sobrediagnóstico e enfatiza apenas benefícios). Estudo qualitativo da SBMFC (2024) com 412 médicos de família revelou que 78,3% relatam "pressão do usuário para solicitar PSA mesmo após explicação de riscos", 62,1% sentem-se "sem respaldo institucional para negar PSA" (receio de denúncia ou judicialização), e 54,7% solicitam PSA "defensivamente" para evitar conflito. Esta situação exemplifica conflito ético-epistemológico de terceira ordem: a APS como espaço de Medicina Baseada em Evidências (MBE) vs. APS como espaço de autonomia do usuário e medicina centrada na pessoa. Dados DATASUS (2023) mostram crescimento de 340% na solicitação de PSA na APS entre 2015-2023, sem correlação com redução de mortalidade ajustada (SIM/DATASUS). A ausência de diretrizes claras para "decisão compartilhada" (script estruturado, material educativo validado) deixa o médico de família isolado neste dilema.',
          type: 'third_order',
          citations: ['Nota Técnica INCA/MS 001/2023', 'Schröder et al., NEJM 2009;360:1320-8', 'SBU - Guideline 2023', 'SBMFC - Estudo Qualitativo 2024', 'SIM/DATASUS 2023'],
          practicalExample: 'UBS Centro - Porto Alegre/RS: Novembro/2024 (Novembro Azul). Roberto, 58 anos, chega à consulta com Dr. Luís: "Doutor, quero fazer os exames da próstata. Vi na TV que todo homem tem que fazer depois dos 50". Dr. Luís abre laptop, mostra infográfico do INCA: "Roberto, as evidências mostram que o rastreamento com PSA previne 1 morte a cada 1.410 homens rastreados por 9 anos, mas causa danos em 40-50% (biópsias, tratamentos desnecessários, impotência, incontinência)". Roberto: "Mas Doutor, meu vizinho descobriu câncer pelo PSA e se curou!". Dr. Luís: "Sim, mas muitos cânceres de próstata nunca causariam problema. O rastreamento pode detectar tumores que nunca ameaçariam sua vida". Roberto, irritado: "O senhor não quer me ajudar? Vou na Defensoria, isso é negligência!". Dr. Luís, exausto: "Roberto, não é isso. Vou solicitar, mas precisamos conversar sobre o que fazer se der alterado". Roberto sai com pedido de PSA. Resultado: PSA 5,2 ng/mL (limítrofe). Roberto entra em pânico. Dr. Luís encaminha para urologista (fila: 4 meses). Roberto, desesperado, paga particular (R$ 450 consulta + R$ 2.800 biópsia). Biópsia: Gleason 6 (baixo risco, muitos urologistas não tratam mais). Urologista oferece: vigilância ativa OU cirurgia. Roberto, com medo, escolhe cirurgia. Pós-op: incontinência urinária leve, disfunção erétil. Roberto volta ao Dr. Luís: "Doutor, fiquei assim por causa do exame que o senhor pediu?". Dr. Luís não sabe o que responder.',
          keyTakeaway: 'Na ausência de protocolos claros de decisão compartilhada e diante de campanhas populacionais que omitem riscos de sobrediagnóstico (Novembro Azul), o médico de família fica preso entre medicina baseada em evidências e medicina defensiva, frequentemente solicitando PSA para evitar conflito, o que perpetua cascata de danos iatrogênicos evitáveis.',
        },
      ]}
      controversies={[
        {
          id: 'cancer-controversy-1',
          title: 'Lei Preta Gil (PL 3.116/2024) e Rastreamento Colorretal: Mandato Legal vs. Capacidade da APS e Rede Diagnóstica',
          description: 'O Projeto de Lei 3.116/2024 ("Lei Preta Gil") propõe rastreamento populacional obrigatório de câncer colorretal a partir dos 45 anos com colonoscopia ou pesquisa de sangue oculto nas fezes (PSOF). A CONITEC ainda não incorporou o rastreamento colorretal no SUS (análise em curso), citando: (1) necessidade de 18.400 colonoscopistas adicionais (vs 4.200 ativos no SUS - CNES 2024); (2) tempo médio atual de espera para colonoscopia diagnóstica de 287 dias (DATASUS 2023); (3) custo de R$ 4,2 bilhões/ano para rastreamento universal (estimativa MS). Na APS, o médico de família não possui: (a) acesso a PSOF imunoquímico (FIT) de alta sensibilidade (disponível apenas em laboratórios privados); (b) protocolo de condução de PSOF+ (encaminhar todos para colonoscopia? Repetir exame?); (c) rede de retaguarda para colonoscopia em tempo hábil. A SBMFC, Associação Brasileira de Medicina de Família e Comunidade (ABRAMGE) e Sociedade Brasileira de Coloproctologia (SBCP) alertam que mandato legal sem estruturação da APS e rede diagnóstica gerará judicialização massiva, desestruturação da regulação e agravamento de iniquidades (população com plano de saúde acessa, SUS-dependente aguarda anos).',
          stakeholders: ['Congresso Nacional', 'CONITEC', 'Ministério da Saúde', 'SBMFC', 'SBCP', 'Judiciário', 'Gestores Municipais'],
          citations: ['PL 3.116/2024 - Câmara dos Deputados', 'CONITEC - Análise em curso 2024', 'CNES/MS 2024', 'SBMFC - Nota Técnica 002/2024'],
          realWorldScenario: 'UBS Jardim das Flores - Recife/PE: Se a Lei Preta Gil for aprovada amanhã, o Dr. Carlos terá que rastrear 1.840 pessoas de 45-75 anos do seu território (população adscrita 8.200). Problema 1: Não existe PSOF imunoquímico no SUS local (só guaiaco, sensibilidade 30%). Problema 2: Atual fila para colonoscopia diagnóstica = 11 meses. Problema 3: Assumindo 10% de PSOF+ (184 pessoas), precisaria de 184 colonoscopias. Capacidade atual da rede: 12 colonoscopias/mês = 15 meses de fila APENAS para este rastreamento, PARALISANDO todas as colonoscopias diagnósticas (sangramento, anemia). Problema 4: Judicialização: paciente com PSOF+ entra na Defensoria Pública exigindo colonoscopia imediata. Resultado: Lei cria direito sem criar estrutura, transformando política pública em promessa não cumprível.',
        },
        {
          id: 'cancer-controversy-2',
          title: 'Mamografia 40-49 anos: Equidade vs. Eficiência - Dilema Alocativo na APS',
          description: 'A Portaria 1.253/2023 (mamografia 40-69 anos) gerou controvérsia entre gestores de saúde, epidemiologistas e sociedades médicas. INCA e economistas da saúde argumentam que o benefício marginal na faixa 40-49 anos é pequeno (NNS de 1.904 para prevenir 1 morte vs 377 na faixa 50-59 anos - meta-análise Nelson et al., Ann Intern Med 2016) e que os recursos deveriam ser direcionados para melhorar cobertura na faixa 50-69 anos, atualmente em 24,1% (meta: 70% - OMS). SBM e FEBRASGO contra-argumentam que 25% dos casos de câncer de mama ocorrem antes dos 50 anos no Brasil (vs 15% em países desenvolvidos) devido a perfil genético/ambiental diferenciado, justificando a ampliação. Na APS, esta controvérsia se traduz em: (1) dilema alocativo - cada mamografia 40-49 anos "rouba" vaga de mamografia 50-69 anos na regulação; (2) pressão sobre médicos de família que precisam "escolher" quem priorizar quando há fila; (3) perpetuação de iniquidades (mulheres com alto capital cultural/social conseguem acesso preferencial, populações vulneráveis ficam desassistidas). Estudo de avaliação econômica (Novaes et al., Cad Saúde Pública 2024) estimou que investir na cobertura 50-69 anos tem razão de custo-efetividade incremental 5,3 vezes superior a ampliar para 40-49 anos.',
          stakeholders: ['INCA', 'SBM', 'FEBRASGO', 'CONASS', 'CONASEMS', 'Médicos de Família', 'Gestores Municipais de Saúde'],
          citations: ['Portaria GM/MS 1.253/2023', 'Nelson et al., Ann Intern Med 2016;164:244', 'INCA - Estimativa 2023', 'Novaes et al., Cad Saúde Pública 2024;40:e00234523'],
          realWorldScenario: 'UBS Boa Vista - Fortaleza/CE: Sexta-feira, 14h. Dra. Juliana tem 2 pacientes na sala de espera. Sala 1: Amanda, 47 anos, advogada, primeira mamografia, mãe teve câncer de mama aos 52 anos. Sala 2: Francisca, 61 anos, faxineira, nunca fez mamografia na vida (não sabia que precisava). Dra. Juliana abre SISREG para agendar mamografias: "3 vagas disponíveis para o próximo trimestre em todo o município". Dilema: Amanda tem direito pela Portaria (40-69 anos) e histórico familiar (risco aumentado). Francisca está na faixa de maior benefício (50-69 anos) e nunca rastreou (maior probabilidade de diagnóstico tardio). Dra. Juliana solicita mamografia para ambas. Amanda, com celular e internet, entra no SISREG às 14h03 e consegue vaga. Francisca, sem celular, pede para filha agendar à noite. Às 19h, filha tenta: sem vagas. Retorna à UBS na segunda: sem vagas. Francisca desiste. Três meses depois, Francisca volta com nódulo palpável de 4cm: câncer estágio IIB. Amanda: mamografia normal. Este cenário se repete diariamente: ampliação etária sem ampliar capacidade gera competição por vagas escassas, onde mulheres com maior capital social (acesso à tecnologia, escolaridade, disponibilidade para agendar online em tempo real) vencem, perpetuando iniquidades. Gestores municipais relatam: "A Portaria ampliou o público-alvo em 52%, mas não veio recurso adicional para ampliar parque mamográfico".',
        },
      ]}
      operationalChallenges={[
        'Ausência de sistema de recall informatizado integrado ao e-SUS AB: médico de família não consegue visualizar quais mulheres do território estão com rastreamento atrasado, impossibilitando busca ativa proativa (apenas 8,7% das UBS têm lista de rastreamento - PMAQ 2023)',
        'Fragmentação dos sistemas de informação (e-SUS AB / SISMAMA / SISCOLO / SISCAN) impede visualização unificada do status de rastreamentos do indivíduo pela equipe de Saúde da Família, gerando duplicação de exames ou perda de seguimento',
        'Tempo médio de retorno de resultado de mamografia à UBS de 78 dias (DATASUS 2023), inviabilizando acompanhamento longitudinal e gerando ansiedade na usuária que precisa retornar múltiplas vezes à UBS perguntando pelo resultado',
        'Insuficiência de vagas reguladas para mamografia diagnóstica complementar (BI-RADS 0) e ultrassom mamário: 81,3% das UBS não conseguem agendar em até 60 dias (CNES 2024), levando usuárias a migrarem para sistema privado ou desistirem',
        'Capacitação inadequada da APS/MFC para rastreamento oncológico: apenas 12% dos Programas de Residência em MFC têm módulo específico sobre teste HPV-DNA, interpretação BI-RADS e decisão compartilhada em rastreamento de próstata (SBMFC - Censo 2024)',
        'Ausência de protocolo municipal padronizado para condução de resultados inconclusivos (BI-RADS 3, ASC-US, HPV+ citologia negativa): cada médico de família decide individualmente, gerando heterogeneidade assistencial e judicialização',
        'Déficit de 37,2% de mamógrafos no SUS (CNES/MS 2024) com distribuição desigual: Região Norte tem 0,34 mamógrafos/100mil mulheres vs 2,1 no Sul, inviabilizando rastreamento equânime',
        'Falta de integração entre APS e atenção especializada oncológica: usuária com mamografia BI-RADS 4/5 entra em "limbo regulatório" entre UBS e serviço de mastologia, com perda de seguimento em 34% dos casos (INCA 2023)',
        'Sobrecarga administrativa na APS: médico de família gasta em média 47 minutos/dia tentando agendar/rastrear resultados de exames de rastreamento pelo SISREG, tempo que poderia ser usado em atendimento clínico (Estudo SBMFC 2024)',
      ]}
      systemicImplications="O rastreamento oncológico no SUS-Brasil expõe uma tensão epistemológica de terceira ordem entre três lógicas operacionais conflitantes: (1) Lógica programática vertical (programas nacionais com metas, indicadores e sistemas de informação independentes); (2) Lógica da coordenação do cuidado pela APS (modelo de Medicina de Família e Comunidade com rastreamento oportunístico integrado, longitudinalidade e território); (3) Lógica da incorporação tecnológica (CONITEC aprovando inovações sem correspondente estruturação da rede de atenção). Esta tripla tensão gera um fenômeno que denominamos 'inflação de demanda sem resolubilidade': a APS amplia detecção (mais mamografias solicitadas, mais testes de HPV), mas a rede de atenção especializada não absorve o fluxo (fila para colonoscopia, colposcopia, mamografia diagnóstica), resultando em aumento de ansiedade populacional, judicialização e perpetuação de iniquidades (quem tem capital social/econômico migra para sistema privado, populações vulneráveis permanecem em filas infinitas). O médico de família, posicionado na interface desta tripla tensão, torna-se simultaneamente agente de rastreamento (solicita exames), gestor de filas (prioriza casos na regulação) e mediador de frustrações (explica à usuária por que o resultado não chegou ou por que a colonoscopia levará 8 meses). Sem investimento robusto em: (A) sistemas de informação integrados; (B) capacitação específica da APS/MFC; (C) ampliação da rede diagnóstica e terapêutica; (D) protocolos municipais padronizados, o rastreamento oncológico no Brasil corre o risco de aprofundar iniquidades ao invés de reduzi-las, transformando uma política de prevenção secundária em fonte de sofrimento e exclusão social."
      />
    </>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <ContentModeWrapper
        descriptiveContent={descriptiveContent}
        criticalAnalysisContent={criticalAnalysisContent}
      />
    </div>
  );
}

