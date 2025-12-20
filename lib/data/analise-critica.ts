import { CriticalAnalysis } from '../types/analysis';

const analiseCancerMama: CriticalAnalysis = {
  rastreamentoId: 'cancer-mama',
  context: 'A mamografia de rastreamento foi o tema mais disputado nos últimos 10 anos no SUS. Em 2025, as novas diretrizes estabelecem oficialmente a idade de 40 anos como ponto de decisão compartilhada.',
  paradigmShift: true,
  insights: [
    {
      id: 'insight-mama-1',
      type: 'segunda_ordem',
      title: 'Decisão Compartilhada como Estratégia de Transição',
      description: 'A expressão "decisão compartilhada" não é apenas retórica médica. É uma tecnologia de governança clínica que transfere o ônus da decisão para o binômio médico-paciente, preservando orçamento ao mesmo tempo que sinaliza alinhamento com evidências.',
      implication: 'Mulheres de 40-49 anos agora podem solicitar mamografia SUS se convencem seu médico. Isso aumenta demanda sem aumentar meta obrigatória de cobertura.',
      citations: [{ refId: 'ms-mamografia-2025' }]
    },
    {
      id: 'insight-mama-2',
      type: 'terceira_ordem',
      title: 'A Convergência como Epifenômeno Orçamentário',
      description: 'Sociedades médicas recomendam mamografia anual aos 40 anos há uma década. A "convergência" de 2025 não representa mudança científica - representa mudança fiscal possível após reajuste do teto de gastos da saúde.',
      implication: 'O timing da convergência é mais político-fiscal que epidemiológico. Evidências de benefício aos 40 anos existem desde 2010.',
      citations: [{ refId: 'sbm-mamografia-2025' }, { refId: 'inca-estimativa-2023' }]
    },
    {
      id: 'insight-mama-3',
      type: 'segunda_ordem',
      title: 'Perspectiva Global: Índia e o Modelo de Baixo Custo',
      description: 'Enquanto Brasil debate mamografia aos 40 vs 50 anos, a Índia (NP-NCD 2023-2030) prioriza CBE (Exame Clínico das Mamas) a partir de 30 anos como método de baixo custo. CBE pode ser realizado por ASHA workers (agentes comunitários de saúde) treinados, alcançando áreas rurais inacessíveis. Mamografia fica reservada para casos suspeitos em centros terciários.',
      implication: 'A estratégia indiana revela que em contextos de recursos limitados, métodos de baixo custo com alta cobertura populacional podem ser mais efetivos que tecnologias avançadas com baixa cobertura. Brasil poderia aprender: CBE como primeiro nível, mamografia como segundo nível.',
      citations: [{ refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'mohfw-cancer-operational-framework-2023' }]
    },
    {
      id: 'insight-mama-4',
      type: 'terceira_ordem',
      title: 'Comparação Internacional: Brasil vs Índia vs USA',
      description: 'USA (USPSTF): Mamografia bienal 50-74 anos. Brasil (SUS): Mamografia bienal 50-74 anos + decisão compartilhada 40-49. Índia (NP-NCD): CBE anual 30+ anos. Três modelos refletem três realidades: USA tem recursos para tecnologia avançada universal; Brasil tem tecnologia mas limitações orçamentárias; Índia prioriza acesso sobre tecnologia.',
      implication: 'Não existe "melhor prática universal". Cada país adapta evidências ao seu contexto fiscal, geográfico e cultural. A comparação global revela que "padrão-ouro" é relativo.',
      citations: [{ refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'uspstf-screening-2023' }]
    }
  ],
  controversies: [
    {
      id: 'contro-mama-1',
      topic: 'Periodicidade: Anual vs Bienal',
      positionA: {
        entity: 'SBM/CBR',
        argument: 'Recomendam mamografia anual aos 40 anos, argumentando que tumores em mulheres jovens podem crescer mais rapidamente e o intervalo bienal aumenta detecção de casos avançados.',
        citations: [{ refId: 'sbm-mamografia-2025' }]
      },
      positionB: {
        entity: 'INCA/MS',
        argument: 'Mantêm periodicidade bienal mesmo aos 40 anos (quando indicado por decisão compartilhada), baseado em revisões sistemáticas que não mostram superioridade estatística significativa do rastreio anual.',
        citations: [{ refId: 'ms-mamografia-2025' }]
      },
      synthesis: 'Diferença de 2-5% na detecção precoce entre anual/bienal não justifica dobrar custo logístico do programa segundo INCA. Sociedades contra-argumentam que 2-5% representa ~3.000 mulheres/ano.'
    }
  ],
  challenges: [
    {
      operational: 'Capacidade instalada de mamógrafos no SUS é insuficiente mesmo para a meta atual de 50-69 anos bienal. Expansão para 40+ requer aumento de ~40% na oferta.',
      financial: 'Cada mamografia custa ao SUS ~R$80-120. Incluir 40-49 anos com decisão compartilhada pode gerar 1-2 milhões de exames adicionais/ano (R$80-240 milhões).',
      equity: 'Mulheres de áreas urbanas terão acesso facilitado. Norte e Nordeste rural podem levar 3-5 anos para ter cobertura adequada.',
      citations: [{ refId: 'ms-mamografia-2025' }, { refId: 'inca-estimativa-2023' }]
    },
    {
      operational: 'Contexto Indiano: ASHA workers (1 milhão de agentes comunitários) podem realizar CBE após treinamento de 3 dias. Cobertura rural alcança 70%+ vs <30% com mamografia em áreas remotas.',
      financial: 'CBE custa ~$0.50 por exame vs $50-100 da mamografia. Índia prioriza volume sobre precisão: melhor detectar 80% dos casos com CBE do que 20% com mamografia inacessível.',
      equity: 'Desafios indianos: alta carga de tabaco (câncer oral é prioridade #1), acesso rural limitado, custos out-of-pocket altos (60% dos gastos em saúde). NP-NCD foca em métodos que funcionam sem infraestrutura complexa.',
      citations: [{ refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'who-india-ncd-report-2023' }]
    }
  ],
  conclusion: 'A política de 2025 é um avanço discursivo que ancora expectativas sem garantir orçamento. O risco é criar direito subjetivo sem efetividade, gerando judicialização e aprofundando iniquidades.'
};

const analiseCancerColoUtero: CriticalAnalysis = {
  rastreamentoId: 'cancer-colo-utero',
  context: 'A transição do exame citológico (Papanicolau) para o teste DNA-HPV representa a maior mudança tecnológica em rastreamento oncológico no SUS em 30 anos.',
  paradigmShift: true,
  insights: [
    {
      id: 'insight-colo-1',
      type: 'segunda_ordem',
      title: 'Intervalo Quinquenal: Ganho de Eficiência ou Risco de Perda de Adesão?',
      description: 'Testes DNA-HPV permitem intervalo de 5 anos (vs 3 anos do Papanicolau) devido à maior sensibilidade. Contudo, intervalos longos reduzem pontos de contato com o sistema de saúde, podendo aumentar perda de seguimento.',
      implication: 'Mulheres podem esquecer de retornar após 5 anos. Sistemas de busca ativa (SMS, e-mail) serão críticos para manter cobertura.',
      citations: [{ refId: 'portaria-saes-13-2025' }]
    },
    {
      id: 'insight-colo-2',
      type: 'segunda_ordem',
      title: 'VIA na Índia: Tecnologia Adaptada ao Contexto',
      description: 'Índia utiliza VIA (Visual Inspection with Acetic Acid) como método primário de rastreamento de câncer de colo do útero (30-65 anos, a cada 3-5 anos). VIA pode ser realizado por profissionais de saúde treinados em nível primário, sem necessidade de laboratório. Custo: ~$2-5 vs $50-100 do HPV-DNA. Sensibilidade: ~70-80% vs 90%+ do HPV-DNA.',
      implication: 'VIA representa compromisso entre custo e efetividade. Para países com recursos limitados, 70% de sensibilidade com 80% de cobertura populacional pode ser superior a 90% de sensibilidade com 20% de cobertura.',
      citations: [{ refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'mohfw-cancer-operational-framework-2023' }]
    },
    {
      id: 'insight-colo-3',
      type: 'terceira_ordem',
      title: 'Comparação Global: VIA (Índia) vs HPV-DNA (Brasil/USA) vs Citologia (Brasil antigo)',
      description: 'Três modelos de rastreamento refletem três níveis de desenvolvimento de infraestrutura: Citologia (baixa sensibilidade, baixo custo, requer laboratório básico) → VIA (sensibilidade intermediária, muito baixo custo, pode ser feito em campo) → HPV-DNA (alta sensibilidade, alto custo, requer laboratório avançado). Brasil migrou de Citologia para HPV-DNA; Índia escolheu VIA como estratégia de transição.',
      implication: 'A "melhor" tecnologia não é sempre a mais avançada. Em contextos onde 60% da população vive em áreas rurais sem acesso a laboratórios, VIA pode salvar mais vidas que HPV-DNA inacessível.',
      citations: [{ refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'portaria-saes-13-2025' }]
    }
  ],
  controversies: [],
  challenges: [
    {
      operational: 'Necessidade de rede laboratorial capaz de processar PCR em tempo hábil (prazo de liberação de resultado deve ser <30 dias).',
      financial: 'Teste DNA-HPV custa ~R$150-200 vs R$12-18 do Papanicolau. Apesar do intervalo maior, custo total por mulher/ano aumenta.',
      equity: 'Capitais já têm laboratórios. Interior depende de logística de transporte de amostras que pode inviabilizar prazo adequado.',
      citations: [{ refId: 'febrasgo-hpv-2024' }, { refId: 'portaria-saes-13-2025' }]
    },
    {
      operational: 'Contexto Indiano: VIA pode ser realizado em postos de saúde primários por profissionais treinados. Não requer transporte de amostras, refrigeração ou laboratório. Resultado imediato permite tratamento no mesmo dia se necessário.',
      financial: 'VIA custa ~$2-5 vs $50-100 do HPV-DNA. Para Índia com 500 milhões de mulheres elegíveis, diferença de custo é crítica. NP-NCD prioriza métodos que podem ser escalados nacionalmente.',
      equity: 'Desafios indianos: alta prevalência de câncer oral (prioridade #1), carga de tabaco, acesso rural limitado. VIA permite rastreamento mesmo em áreas sem infraestrutura laboratorial. HPV-DNA fica reservado para centros terciários e casos suspeitos.',
      citations: [{ refId: 'np-ncd-operational-guidelines-2023' }, { refId: 'icmr-cancer-guidelines-2023' }]
    }
  ],
  conclusion: 'A mudança para DNA-HPV é cientificamente sólida e alinha o Brasil às melhores práticas globais. O desafio reside na infraestrutura logística e nos sistemas de informação para garantir retorno da mulher após 5 anos.'
};

const analiseCancerProstata: CriticalAnalysis = {
  rastreamentoId: 'cancer-prostata',
  context: 'Única neoplasia com recomendação contrária ao rastreamento populacional pelo SUS, apesar de pressão legislativa e de sociedades médicas.',
  paradigmShift: false,
  insights: [
    {
      id: 'insight-prostata-1',
      type: 'terceira_ordem',
      title: 'A Não-Recomendação como Ato de Coragem Epistemológica',
      description: 'Em um país onde câncer de próstata mata ~16.000 homens/ano, NÃO recomendar rastreamento vai contra intuição popular. A decisão baseia-se em ensaios clínicos que mostram que o rastreamento universal detecta muitos tumores indolentes que nunca matariam, gerando sobrediagnóstico e sobretratamento (incontinência, impotência).',
      implication: 'MS prioriza medicina baseada em evidência mesmo sob pressão política. Isso representa maturidade institucional.',
      citations: [{ refId: 'conitec-prostata-2023' }]
    }
  ],
  controversies: [
    {
      id: 'contro-prostata-1',
      topic: 'Rastreamento Universal vs Seletivo',
      positionA: {
        entity: 'SBU',
        argument: 'Recomenda PSA + toque retal a partir de 45-50 anos (45 se alto risco: negros, história familiar). Argumenta que estudos europeus mostram redução de mortalidade de ~20%.',
        citations: [{ refId: 'sbu-prostata-2024' }]
      },
      positionB: {
        entity: 'INCA/MS',
        argument: 'Contraindicam rastreamento populacional. Citam estudos americanos (PLCO, ERSPC) mostrando que para cada vida salva, 30-100 homens sofrem danos iatrogênicos evitáveis.',
        citations: [{ refId: 'conitec-prostata-2023' }]
      },
      synthesis: 'A divergência reflete diferença de valores: SBU prioriza detecção precoce mesmo com sobrediagnóstico; MS prioriza não maleficência. Decisão compartilhada é a saída ética.'
    }
  ],
  challenges: [
    {
      operational: 'Pressão da Lei Preta Gil pode forçar inclusão no rastreamento. Implementação exigiria ~10 milhões de PSA/ano.',
      financial: 'Cada PSA custa R$8-15, mas sequência diagnóstica (biópsia se alterado) custa R$500-2.000/caso. Custo total estimado: R$1-3 bilhões/ano.',
      equity: 'População negra tem maior incidência e mortalidade, mas menor acesso a diagnóstico precoce. Rastreamento seletivo por raça é eticamente complexo.',
      citations: [{ refId: 'conitec-prostata-2023' }, { refId: 'inca-estimativa-2023' }]
    }
  ],
  conclusion: 'Próstata é o rastreamento onde o conflito entre sociedade médica e gestão pública é mais agudo. A solução atual - decisão compartilhada sem recomendação populacional - é um compromisso que preserva autonomia do paciente sem desperdiçar recursos públicos.'
};

const analiseTEA: CriticalAnalysis = {
  rastreamentoId: 'tea-autismo',
  context: 'A Lei Romeo Mion (2019) e a Lei 14.626/2023 tornaram obrigatória a aplicação do M-CHAT-R na atenção primária. É o primeiro rastreamento de transtorno do neurodesenvolvimento a ter caráter universal no SUS.',
  paradigmShift: true,
  insights: [
    {
      id: 'insight-tea-1',
      type: 'segunda_ordem',
      title: 'Rastreamento como Porta de Entrada para Rede Inexistente',
      description: 'M-CHAT-R detecta risco de TEA com sensibilidade ~85%. Mas qual a utilidade de detectar se não há CAPS-infantil, neuropediatra ou terapeuta ocupacional disponível? Lei cria direito sem garantir oferta.',
      implication: 'Famílias recebem "laudo de risco" e enfrentam fila de 1-2 anos para avaliação especializada. Isso gera ansiedade sem benefício terapêutico imediato.',
      citations: [{ refId: 'ms-tea-2025' }]
    },
    {
      id: 'insight-tea-2',
      type: 'terceira_ordem',
      title: 'A Judicialização como Efeito Colateral Previsível',
      description: 'Ao tornar M-CHAT-R obrigatório sem expandir rede de apoio, legislador criou condições para explosão de ações judiciais pedindo terapias (ABA, fonoaudiologia). Judiciário passa a alocar recursos de saúde.',
      implication: 'Orçamento público será parcialmente decidido por juízes, não por planejadores de saúde. Isso compromete racionalidade alocativa.',
      citations: [{ refId: 'ms-tea-2025' }]
    }
  ],
  controversies: [],
  challenges: [
    {
      operational: 'Capacitar ~40.000 profissionais de atenção primária para aplicar M-CHAT-R corretamente. Tempo médio de aplicação: 10-15 min/criança.',
      financial: 'Custo do rastreamento é baixo (questionário gratuito). Custo da rede de apoio pós-diagnóstico: R$2.000-5.000/mês/criança (terapias).',
      equity: 'Regiões metropolitanas têm rede de CAPSi e terapeutas. Interior depende de telemedicina e equipes itinerantes (subótimas para TEA).',
      citations: [{ refId: 'ms-tea-2025' }]
    }
  ],
  conclusion: 'TEA exemplifica o desafio de legislar sobre saúde sem orçamento vinculado. A obrigatoriedade do M-CHAT-R é simbólica se não vier acompanhada de expansão imediata da rede de diagnóstico e intervenção precoce.'
};

// Banco de dados de análises críticas
const analisesMap: Record<string, CriticalAnalysis> = {
  'cancer-mama': analiseCancerMama,
  'cancer-colo-utero': analiseCancerColoUtero,
  'cancer-prostata': analiseCancerProstata,
  'tea-autismo': analiseTEA,
};

export function getAnaliseCritica(rastreamentoId: string): CriticalAnalysis | undefined {
  return analisesMap[rastreamentoId];
}

export function getAllAnalisesCriticas(): CriticalAnalysis[] {
  return Object.values(analisesMap);
}
