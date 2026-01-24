import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_TOC_psi_001: CasoClinico = {
  id: 'caso-toc-001',
  titulo: 'Transição de Cuidados para Jovem com Esquizofrenia',
  subtitulo: 'Jovem de 19 anos com histórico de esquizofrenia desde a adolescência, em processo de transição para cuidados adultos',
  categoria: 'psiquiatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Pedro Silva',
      idade: 19,
      sexo: 'M',
      profissao: 'Estudante',
      estadoCivil: 'Solteiro'
    },
    queixaPrincipal: 'Estou confuso com as mudanças nos meus tratamentos e consultas',
    historiaDoencaAtual: 'João é acompanhado no serviço de psiquiatria pediátrica desde os 16 anos, quando foi diagnosticado com esquizofrenia após episódios de alucinações auditivas e delírios persecutórios. Ele foi internado brevemente aos 17 anos por descompensação psicótica. Atualmente, usa risperidona 4mg/dia, mas relata esquecimento de doses e dificuldade em comparecer a consultas devido à mudança para a faculdade. A mãe relata preocupação com a transição para o serviço adulto, pois o atual não atende maiores de 18 anos. Não há comorbidades físicas significativas, mas há histórico familiar de transtorno bipolar no pai.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. João relata adesão irregular à medicação nos últimos meses, com recaídas de sintomas como vozes acusatórias. A mãe menciona falta de orientação sobre o que muda na transição para cuidados adultos.',
        dicas: ['Avalie adesão medicamentosa, suporte familiar e barreiras à transição [1,2]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar detalhada de outras doenças', correta: false },
          { id: 'b', texto: 'Adesão à medicação e suporte familiar', correta: true },
          { id: 'c', texto: 'Hábitos alimentares', correta: false },
          { id: 'd', texto: 'Viagens recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A adesão e o suporte são cruciais na transição de cuidados para evitar descompensações [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Foco na adesão e suporte familiar é essencial para a transição.',
        incorreto: 'Priorize aspectos que impactam diretamente a transição e adesão.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame do Estado Mental',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'No exame do estado mental, você observa aparência desleixada, afeto restrito, pensamento desorganizado com ideias de referência leves e insight parcial sobre a doença. Não há risco suicida imediato.',
        dados: {
          'Afeto': 'Restrito',
          'Pensamento': 'Desorganizado leve',
          'Insight': 'Parcial',
          'Alucinações': 'Auditivas relatadas',
          'Risco': 'Baixo'
        },
        dicas: ['Note os sinais de descompensação parcial e a necessidade de educação [1]']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Aparência desleixada', correta: false },
          { id: 'b', texto: 'Pensamento desorganizado e insight parcial', correta: true },
          { id: 'c', texto: 'Afeto restrito', correta: false },
          { id: 'd', texto: 'Risco baixo', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Esses achados indicam necessidade de reforço na transição para prevenir recaídas [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Avaliação Complementar',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você aplica escalas de avaliação: Escala PANSS total 65 (moderada), e questionário de suporte social mostra rede familiar limitada. Não há exames laboratoriais alterados (risperidona sem toxicidade).',
        dados: {
          'PANSS Total': '65 (moderada)',
          'Suporte Social': 'Limitado (família nuclear)',
          'Adesão (MORISKY)': 'Baixa (2/8)',
          'Função Cognitiva': 'Preservada'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Remissão completa', correta: false },
          { id: 'b', texto: 'Estabilidade moderada com baixa adesão e suporte insuficiente', correta: true },
          { id: 'c', texto: 'Crisis aguda', correta: false },
          { id: 'd', texto: 'Apenas problema social', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'PANSS moderada e baixa adesão destacam a importância da transição coordenada [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base nos dados, formule sua hipótese diagnóstica, considerando o contexto de transição.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Esquizofrenia estável necessitando de transição de cuidados coordenada', correta: true },
          { id: 'b', texto: 'Transtorno bipolar inicial', correta: false },
          { id: 'c', texto: 'Esquizofrenia em remissão total', correta: false },
          { id: 'd', texto: 'Transtorno de ansiedade', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Histórico crônico com sintomas residuais requer planejamento de ToC para integração ao sistema adulto [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano de Transição',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de transição de cuidados.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas manter medicação sem planejamento', correta: false },
          { id: 'b', texto: 'Coordenador de transição + educação familiar + resumo de alta', correta: true },
          { id: 'c', texto: 'Internação imediata', correta: false },
          { id: 'd', texto: 'Mudança para insulina (errado contexto)', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Recomendações incluem coordenadores, educação e comunicação aprimorada na ToC [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento Pós-Transição',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, após transição para CAPS adulto, João adere melhor à risperidona, PANSS cai para 45, e participa de grupo de suporte. Mãe relata maior confiança.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter follow-up trimestral no serviço adulto', correta: true },
          { id: 'b', texto: 'Intensificar medicação', correta: false },
          { id: 'c', texto: 'Suspender acompanhamento', correta: false },
          { id: 'd', texto: 'Encaminhar de volta ao pediátrico', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora com ToC adequada permite monitoramento contínuo [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'João, jovem com esquizofrenia, passou por transição bem-sucedida de cuidados pediátricos para adultos, com foco em adesão e suporte.',
    diagnosticoFinal: 'Esquizofrenia (CID-11: 6A20) em transição de cuidados',
    tratamentoRealizado: 'Manutenção de risperidona 4mg/dia, planejamento com coordenador de transição, educação de paciente e família, resumo de alta padronizado e follow-up no CAPS adulto.',
    evolucao: 'Melhora na adesão e sintomas, com PANSS reduzida e maior participação social após 3 meses.',
    licoesPrincipais: [
      'A transição de cuidados melhora a adesão e qualidade de vida em jovens com condições crônicas psiquiátricas [1,2].',
      'Uso de coordenadores e educação familiar são recomendados para evitar rehospitalizações [1].',
      'Comunicação aprimorada entre serviços pediátrico e adulto é essencial no SUS [2].',
      'Monitoramento contínuo pós-transição previne descompensações [1,2].',
      'Foco em suporte social reduz barreiras na entrada à idade adulta [2].'
    ],
    errosComuns: [
      'Ignorar planejamento de transição, levando a perda de follow-up [1].',
      'Subestimar o papel da família no suporte durante a mudança de serviços [2].',
      'Não usar resumos de alta padronizados, causando falhas na comunicação [1].',
      'Atrasar a iniciação da ToC durante a internação ou reabilitação [1,2].'
    ]
  },

  objetivosAprendizagem: [
    'Compreender o processo de transição de cuidados para jovens com transtornos psiquiátricos crônicos.',
    'Identificar barreiras comuns na adesão e suporte familiar durante a ToC.',
    'Aplicar recomendações de comunicação e coordenação na prática clínica.',
    'Avaliar o impacto da ToC na qualidade de vida e prevenção de recaídas.'
  ],
  competencias: [
    'Gerenciamento de casos crônicos em psiquiatria',
    'Planejamento de transições de cuidado no SUS',
    'Educação em saúde para pacientes e cuidadores',
    'Avaliação de risco e suporte social'
  ],
  doencasRelacionadas: ['toc', 'esquizofrenia'],
  medicamentosRelacionados: ['risperidona'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002'],
  tags: ['transicao-de-cuidados', 'psiquiatria', 'cronico', 'jovens', 'sus']
};