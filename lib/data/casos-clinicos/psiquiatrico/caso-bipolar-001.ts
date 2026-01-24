import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_BIPOLAR_psi_001: CasoClinico = {
  id: 'caso-transtorno-bipolar-001',
  titulo: 'Paciente com Episódios Alternados de Euforia e Depressão',
  subtitulo: 'Mulher de 42 anos com alterações de humor recorrentes e impacto funcional',
  categoria: 'psiquiatrico',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 42,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Eu me sinto às vezes no topo do mundo, mas depois caio em um buraco negro de tristeza que não acaba.',
    historiaDoencaAtual: 'Paciente relata episódios recorrentes de humor elevado com aumento de energia, diminuição da necessidade de sono, fala acelerada e ideias grandiosas, durando cerca de uma semana, seguidos de períodos de depressão profunda com fadiga, anedonia, ideação suicida e isolamento social, impactando seu trabalho e relacionamentos há 5 anos. Nega uso de substâncias, mas menciona estresse familiar. Histórico familiar de transtorno afetivo não esclarecido.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente descreve episódios de euforia intensa com comportamentos impulsivos e períodos de desânimo profundo. O que deseja investigar?',
        dicas: ['Histórico familiar, hábitos de sono, uso de substâncias e comorbidades']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Histórico de viagens recentes', correta: false },
          { id: 'b', texto: 'Histórico familiar de transtornos afetivos', correta: true },
          { id: 'c', texto: 'Dieta alimentar', correta: false },
          { id: 'd', texto: 'Atividade física semanal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Histórico familiar é fator de risco significativo para transtorno bipolar [1,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! O histórico familiar ajuda a estratificar o risco.',
        incorreto: 'Priorize fatores genéticos e familiares no rastreamento de transtornos bipolares.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Mental',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'No exame mental, a paciente apresenta afeto labile, humor disfórico, pensamento acelerado com ideias de ruminação, insight parcial e julgamento preservado. Escala de humor: MDQ positivo com 7 itens endossados.',
        dados: {
          'Afeto': 'Labile',
          'Humor': 'Disfórico',
          'Pensamento': 'Acelerado, ruminações',
          'Insight': 'Parcial',
          'MDQ Score': '7/13 (positivo)'
        },
        dicas: ['Observe sinais de hipomania atual e histórico de episódios maníacos']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Humor disfórico isolado', correta: false },
          { id: 'b', texto: 'MDQ positivo com histórico de episódios', correta: true },
          { id: 'c', texto: 'Insight parcial', correta: false },
          { id: 'd', texto: 'Julgamento preservado', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'MDQ positivo sugere transtorno bipolar, especialmente com impacto funcional [1,10].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para descartar causas orgânicas. Resultados laboratoriais:',
        dados: {
          'TSH': '2.5 mUI/L (normal)',
          'T4 livre': '1.2 ng/dL (normal)',
          'Hemograma': 'Normal',
          'Glicemia de jejum': '92 mg/dL',
          'Função hepática': 'Normal',
          'Uso de substâncias (teste toxicológico)': 'Negativo'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipotireoidismo como causa primária', correta: false },
          { id: 'b', texto: 'Exames normais, quadro psiquiátrico primário', correta: true },
          { id: 'c', texto: 'Diabetes não diagnosticado', correta: false },
          { id: 'd', texto: 'Anemia subclínica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exames normais descartam causas orgânicas comuns; prosseguir com avaliação psiquiátrica [1,8].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame mental e exames complementares, formule sua hipótese diagnóstica.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Transtorno bipolar tipo I', correta: true },
          { id: 'b', texto: 'Transtorno depressivo maior recorrente', correta: false },
          { id: 'c', texto: 'Transtorno de ansiedade generalizada', correta: false },
          { id: 'd', texto: 'Transtorno bipolar tipo II', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Episódios maníacos plenos com duração >7 dias e impacto funcional confirmam tipo I [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano de tratamento inicial, considerando evidências e riscos.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas psicoterapia cognitivo-comportamental', correta: false },
          { id: 'b', texto: 'Lítio como monoterapia', correta: true },
          { id: 'c', texto: 'Antidepressivos isolados', correta: false },
          { id: 'd', texto: 'Benzodiazepínicos para ansiedade', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Estabilizadores de humor como lítio são primeira linha para transtorno bipolar tipo I, reduzindo risco de mania e suicídio [1,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após início de lítio e psicoterapia. Humor estabilizado, sem ideação suicida, mas relata ganho de peso de 3kg e sedação leve.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter lítio, monitorar níveis séricos e efeitos colaterais, retornar em 1 mês', correta: true },
          { id: 'b', texto: 'Suspender lítio e iniciar valproato', correta: false },
          { id: 'c', texto: 'Adicionar antidepressivo', correta: false },
          { id: 'd', texto: 'Encaminhar para internação', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Monitoramento regular de lítio é essencial; ajustes baseados em resposta e tolerância [8,10].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de mulher de 42 anos com transtorno bipolar tipo I diagnosticado após avaliação abrangente, tratado com lítio e suporte psicoterapêutico, com melhora inicial.',
    diagnosticoFinal: 'Transtorno bipolar tipo I (CID-11: 6A60)',
    tratamentoRealizado: 'Lítio 900mg/dia (níveis séricos 0.8 mEq/L), psicoterapia cognitivo-comportamental semanal, educação familiar sobre a doença.',
    evolucao: 'Após 6 meses, remissão de sintomas afetivos, retorno às atividades laborais, com monitoramento contínuo para prevenção de recaídas.',
    licoesPrincipais: [
      'Rastreamento com MDQ é essencial em pacientes com sintomas afetivos persistentes [1,10].',
      'Histórico familiar e episódios maníacos distinguem bipolar de depressão unipolar [3,7].',
      'Estabilizadores de humor como lítio reduzem risco suicida em até 80% [7,10].',
      'Avaliação orgânica inicial descarta causas secundárias [8].',
      'Acompanhamento multidisciplinar melhora adesão e outcomes [8,9].'
    ],
    errosComuns: [
      'Iniciar antidepressivos sem estabilizador, precipitando mania [1].',
      'Ignorar histórico familiar, subestimando risco genético [3].',
      'Não monitorar níveis de lítio, levando a toxicidade [10].',
      'Subestimar risco suicida em fase depressiva [7].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar sintomas de mania/hipomania e depressão no contexto de atenção primária.',
    'Aplicar ferramentas de rastreamento como MDQ para transtorno bipolar.',
    'Formular diagnóstico diferencial entre transtornos unipolares e bipolares.',
    'Planejar tratamento inicial baseado em guidelines, considerando riscos e comorbidades.'
  ],
  competencias: [
    'Avaliação psiquiátrica inicial',
    'Raciocínio diagnóstico em saúde mental',
    'Prescrição e monitoramento de psicofármacos',
    'Acompanhamento de pacientes com transtornos crônicos psiquiátricos'
  ],
  doencasRelacionadas: ['transtorno-bipolar'],
  medicamentosRelacionados: ['N05AN01', 'N06BA04', 'N03AF02'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-007', 'ref-008', 'ref-009', 'ref-010'],
  tags: ['saúde mental', 'transtorno bipolar', 'rastreamento psiquiátrico', 'estabilizadores de humor']
};