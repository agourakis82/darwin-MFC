import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_HEPA_gas_001: CasoClinico = {
  id: 'caso-hepatite-a-001',
  titulo: 'Hepatite A Aguda em Jovem Adulta',
  subtitulo: 'Paciente com fadiga, icterícia e sintomas gastrointestinais após consumo de água contaminada',
  categoria: 'gastro',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 28,
      sexo: 'F',
      profissao: 'Dona de casa',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou muito cansada e minha urina está escura há uns dias',
    historiaDoencaAtual: 'Paciente de 28 anos, sexo feminino, refere início há 7 dias de fadiga intensa, náuseas, vômitos ocasionais e perda de apetite. Há 3 dias, notou amarelamento da pele e olhos, além de fezes claras. Nega febre alta, dor abdominal intensa ou sangramentos. Antecedente de consumo de água de poço em visita a familiar no interior há 2 semanas. Sem comorbidades conhecidas.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona possível exposição a água não tratada. O que mais deseja investigar?',
        dicas: ['Fatores de risco como viagens, hábitos alimentares e contatos domiciliares']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o diagnóstico diferencial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de doenças hepáticas', correta: false },
          { id: 'b', texto: 'Viagens recentes ou consumo de alimentos/água suspeitos', correta: true },
          { id: 'c', texto: 'Prática de exercícios físicos', correta: false },
          { id: 'd', texto: 'Uso de tabaco', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A transmissão fecal-oral do HAV é associada a água ou alimentos contaminados [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Exposições ambientais são chave na hepatite A.',
        incorreto: 'Priorize fatores de risco transmissíveis para infecções virais.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa icterícia escleral e cutânea leve, sem sinais de encefalopatia. Abdome doloroso à palpação em hipocôndrio direito, sem defesa.',
        dados: {
          'PA': '110/70 mmHg',
          'FC': '82 bpm',
          'FR': '16 irpm',
          'T': '37.2°C',
          'Peso': '62 kg',
          'Estatura': '1.60 m',
          'IMC': '24.2 kg/m²'
        },
        dicas: ['Observe sinais de icterícia e hepatite aguda']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de hepatite aguda?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipertensão arterial', correta: false },
          { id: 'b', texto: 'Icterícia e dor em hipocôndrio direito', correta: true },
          { id: 'c', texto: 'Taquicardia sinusal', correta: false },
          { id: 'd', texto: 'Febre alta', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Icterícia e hepatomegalia dolorosa são clássicos da hepatite viral aguda [1].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram elevação de enzimas hepáticas e bilirrubina.',
        dados: {
          'ALT': '1200 U/L',
          'AST': '900 U/L',
          'Bilirrubina total': '4.5 mg/dL',
          'Bilirrubina direta': '3.2 mg/dL',
          'Albumina': '3.8 g/dL',
          'TP/INR': '1.2',
          'Anti-HAV IgM': 'Positivo',
          'HBsAg': 'Negativo',
          'Anti-HCV': 'Negativo'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar esses resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Insuficiência hepática crônica', correta: false },
          { id: 'b', texto: 'Hepatite viral aguda por HAV', correta: true },
          { id: 'c', texto: 'Colelitíase obstrutiva', correta: false },
          { id: 'd', texto: 'Hepatite alcoólica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Elevação de transaminases e IgM anti-HAV positivo confirmam hepatite A aguda [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hepatite A aguda', correta: true },
          { id: 'b', texto: 'Hepatite B aguda', correta: false },
          { id: 'c', texto: 'Gastrite aguda', correta: false },
          { id: 'd', texto: 'Intoxicação alimentar', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Quadro clínico e sorologia específica apontam para HAV, doença autolimitada [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'A paciente é orientada sobre repouso e hidratação. Não há antiviral específico.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Antivirais como tenofovir', correta: false },
          { id: 'b', texto: 'Repouso, hidratação e suporte sintomático', correta: true },
          { id: 'c', texto: 'Corticoides em dose alta', correta: false },
          { id: 'd', texto: 'Cirurgia desobstrutiva', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hepatite A é autolimitada; tratamento é sintomático, com prevenção por vacinação [1,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 4 semanas, a paciente retorna assintomática. Exames mostram normalização de enzimas hepáticas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter acompanhamento e vacinar contatos', correta: true },
          { id: 'b', texto: 'Admitir para hospitalização', correta: false },
          { id: 'c', texto: 'Iniciar imunossupressores', correta: false },
          { id: 'd', texto: 'Solicitar biópsia hepática', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resolução espontânea; imunidade vitalícia e vacinação de contatos previnem surtos [4,5].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 28 anos com hepatite A aguda por exposição fecal-oral, evoluindo com melhora completa sem complicações.',
    diagnosticoFinal: 'Hepatite A aguda (CID-11: CA23)',
    tratamentoRealizado: 'Repouso, hidratação oral, antieméticos conforme necessário e orientação dietética.',
    evolucao: 'Melhora clínica em 2 semanas, normalização laboratorial em 1 mês. Sem sequelas.',
    licoesPrincipais: [
      'A hepatite A é transmitida por via fecal-oral, com ênfase em prevenção por higiene e vacinação [1,5].',
      'Diagnóstico confirmado por IgM anti-HAV positivo e elevação de transaminases [3].',
      'Tratamento é suporte, pois a doença é autolimitada na maioria dos casos [1].',
      'Vacinação é recomendada para grupos de risco e contatos domiciliares [5,6].',
      'Epidemiologia no Brasil mostra incidência baixa pós-vacinação infantil [11,12].'
    ],
    errosComuns: [
      'Confundir com hepatites B ou C sem sorologia específica.',
      'Prescrever antivirais desnecessários, ignorando natureza autolimitada.',
      'Subestimar importância de notificação e vacinação de contatos.',
      'Ignorar fatores de risco como água contaminada em anamnese.'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e fatores de risco da hepatite A aguda.',
    'Interpretar exames sorológicos para diagnóstico etiológico.',
    'Aplicar condutas de suporte e medidas preventivas conforme guidelines.',
    'Entender a epidemiologia e prevenção no contexto brasileiro.'
  ],
  competencias: [
    'Anamnese focada em transmissão infecciosa',
    'Exame físico para icterícia e hepatite',
    'Interpretação de exames hepáticos e sorologia',
    'Planejamento de tratamento suporte e prevenção'
  ],
  doencasRelacionadas: ['hepatite-a'],
  medicamentosRelacionados: [],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-008', 'ref-009', 'ref-010', 'ref-011', 'ref-012'],
  tags: ['hepatite', 'viral', 'gastroenterologia', 'infecciosa', 'prevenção']
};