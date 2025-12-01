interface Insight {
  id: string;
  type: 'segunda_ordem' | 'terceira_ordem';
  title: string;
  description: string;
  implication: string;
  citations: string;
}

interface Controversy {
  id: string;
  topic: string;
  positionA: {
    entity: string;
    argument: string;
    citations: string;
  };
  positionB: {
    entity: string;
    argument: string;
    citations: string;
  };
  synthesis: string;
}

interface Challenge {
  operational: string;
  financial: string;
  equity: string;
  citations: string;
}

interface AnaliseCritica {
  rastreamentoId: string;
  context: string;
  paradigmShift: boolean;
  insights: Insight[];
  controversies: Controversy[];
  challenges: Challenge[];
  conclusion: string;
}

const analiseCancerMama: AnaliseCritica = {
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
      citations: '[4]'
    },
    {
      id: 'insight-mama-2',
      type: 'terceira_ordem',
      title: 'A Convergência como Epifenômeno Orçamentário',
      description: 'Sociedades médicas recomendam mamografia anual aos 40 anos há uma década. A "convergência" de 2025 não representa mudança científica - representa mudança fiscal possível após reajuste do teto de gastos da saúde.',
      implication: 'O timing da convergência é mais político-fiscal que epidemiológico. Evidências de benefício aos 40 anos existem desde 2010.',
      citations: '[1], [2]'
    }
  ],
  controversies: [
    {
      id: 'contro-mama-1',
      topic: 'Periodicidade: Anual vs Bienal',
      positionA: {
        entity: 'SBM/CBR',
        argument: 'Recomendam mamografia anual aos 40 anos, argumentando que tumores em mulheres jovens podem crescer mais rapidamente e o intervalo bienal aumenta detecção de casos avançados.',
        citations: '[1]'
      },
      positionB: {
        entity: 'INCA/MS',
        argument: 'Mantêm periodicidade bienal mesmo aos 40 anos (quando indicado por decisão compartilhada), baseado em revisões sistemáticas que não mostram superioridade estatística significativa do rastreio anual.',
        citations: '[4]'
      },
      synthesis: 'Diferença de 2-5% na detecção precoce entre anual/bienal não justifica dobrar custo logístico do programa segundo INCA. Sociedades contra-argumentam que 2-5% representa ~3.000 mulheres/ano.'
    }
  ],
  challenges: [
    {
      operational: 'Capacidade instalada de mamógrafos no SUS é insuficiente mesmo para a meta atual de 50-69 anos bienal. Expansão para 40+ requer aumento de ~40% na oferta.',
      financial: 'Cada mamografia custa ao SUS ~R$80-120. Incluir 40-49 anos com decisão compartilhada pode gerar 1-2 milhões de exames adicionais/ano (R$80-240 milhões).',
      equity: 'Mulheres de áreas urbanas terão acesso facilitado. Norte e Nordeste rural podem levar 3-5 anos para ter cobertura adequada.',
      citations: '[4], [17]'
    }
  ],
  conclusion: 'A política de 2025 é um avanço discursivo que ancora expectativas sem garantir orçamento. O risco é criar direito subjetivo sem efetividade, gerando judicialização e aprofundando iniquidades.'
};

const analiseCancerColoUtero: AnaliseCritica = {
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
      citations: '[7]'
    }
  ],
  controversies: [],
  challenges: [
    {
      operational: 'Necessidade de rede laboratorial capaz de processar PCR em tempo hábil (prazo de liberação de resultado deve ser <30 dias).',
      financial: 'Teste DNA-HPV custa ~R$150-200 vs R$12-18 do Papanicolau. Apesar do intervalo maior, custo total por mulher/ano aumenta.',
      equity: 'Capitais já têm laboratórios. Interior depende de logística de transporte de amostras que pode inviabilizar prazo adequado.',
      citations: '[6], [7]'
    }
  ],
  conclusion: 'A mudança para DNA-HPV é cientificamente sólida e alinha o Brasil às melhores práticas globais. O desafio reside na infraestrutura logística e nos sistemas de informação para garantir retorno da mulher após 5 anos.'
};

const analiseCancerProstata: AnaliseCritica = {
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
      citations: '[9]'
    }
  ],
  controversies: [
    {
      id: 'contro-prostata-1',
      topic: 'Rastreamento Universal vs Seletivo',
      positionA: {
        entity: 'SBU',
        argument: 'Recomenda PSA + toque retal a partir de 45-50 anos (45 se alto risco: negros, história familiar). Argumenta que estudos europeus mostram redução de mortalidade de ~20%.',
        citations: '[8]'
      },
      positionB: {
        entity: 'INCA/MS',
        argument: 'Contraindicam rastreamento populacional. Citam estudos americanos (PLCO, ERSPC) mostrando que para cada vida salva, 30-100 homens sofrem danos iatrogênicos evitáveis.',
        citations: '[9]'
      },
      synthesis: 'A divergência reflete diferença de valores: SBU prioriza detecção precoce mesmo com sobrediagnóstico; MS prioriza não maleficência. Decisão compartilhada é a saída ética.'
    }
  ],
  challenges: [
    {
      operational: 'Pressão da Lei Preta Gil pode forçar inclusão no rastreamento. Implementação exigiria ~10 milhões de PSA/ano.',
      financial: 'Cada PSA custa R$8-15, mas sequência diagnóstica (biópsia se alterado) custa R$500-2.000/caso. Custo total estimado: R$1-3 bilhões/ano.',
      equity: 'População negra tem maior incidência e mortalidade, mas menor acesso a diagnóstico precoce. Rastreamento seletivo por raça é eticamente complexo.',
      citations: '[9], [17]'
    }
  ],
  conclusion: 'Próstata é o rastreamento onde o conflito entre sociedade médica e gestão pública é mais agudo. A solução atual - decisão compartilhada sem recomendação populacional - é um compromisso que preserva autonomia do paciente sem desperdiçar recursos públicos.'
};

const analiseTEA: AnaliseCritica = {
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
      citations: '[12]'
    },
    {
      id: 'insight-tea-2',
      type: 'terceira_ordem',
      title: 'A Judicialização como Efeito Colateral Previsível',
      description: 'Ao tornar M-CHAT-R obrigatório sem expandir rede de apoio, legislador criou condições para explosão de ações judiciais pedindo terapias (ABA, fonoaudiologia). Judiciário passa a alocar recursos de saúde.',
      implication: 'Orçamento público será parcialmente decidido por juízes, não por planejadores de saúde. Isso compromete racionalidade alocativa.',
      citations: '[12]'
    }
  ],
  controversies: [],
  challenges: [
    {
      operational: 'Capacitar ~40.000 profissionais de atenção primária para aplicar M-CHAT-R corretamente. Tempo médio de aplicação: 10-15 min/criança.',
      financial: 'Custo do rastreamento é baixo (questionário gratuito). Custo da rede de apoio pós-diagnóstico: R$2.000-5.000/mês/criança (terapias).',
      equity: 'Regiões metropolitanas têm rede de CAPSi e terapeutas. Interior depende de telemedicina e equipes itinerantes (subótimas para TEA).',
      citations: '[11], [12]'
    }
  ],
  conclusion: 'TEA exemplifica o desafio de legislar sobre saúde sem orçamento vinculado. A obrigatoriedade do M-CHAT-R é simbólica se não vier acompanhada de expansão imediata da rede de diagnóstico e intervenção precoce.'
};

// Banco de dados de análises críticas
const analisesMap: Record<string, AnaliseCritica> = {
  'cancer-mama': analiseCancerMama,
  'cancer-colo-utero': analiseCancerColoUtero,
  'cancer-prostata': analiseCancerProstata,
  'tea-autismo': analiseTEA,
};

export function getAnaliseCritica(rastreamentoId: string): AnaliseCritica | undefined {
  return analisesMap[rastreamentoId];
}

export function getAllAnalisesCriticas(): AnaliseCritica[] {
  return Object.values(analisesMap);
}
