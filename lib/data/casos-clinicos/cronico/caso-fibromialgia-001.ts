import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_FIBROMIALGIA_cro_001: CasoClinico = {
  id: 'caso-fibromialgia-001',
  titulo: 'Dor Crônica Generalizada e Fadiga em Mulher Adulta',
  subtitulo: 'Paciente de 52 anos relata dor difusa persistente, fadiga e distúrbios do sono há seis meses',
  categoria: 'cronico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira Santos',
      idade: 52,
      sexo: 'F',
      profissao: 'Auxiliar de enfermagem',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Tenho dores fortes em todo o corpo, especialmente nas costas, pernas e braços, e me sinto cansada o tempo todo',
    historiaDoencaAtual: 'Paciente relata dor musculoesquelética generalizada há seis meses, com intensidade moderada a grave (7/10 na escala EVA), afetando múltiplas regiões do corpo. A dor é diurna e noturna, piora com atividade física e estresse, associada a fadiga extrema, dificuldade para iniciar e manter o sono, e sensação de "névoa mental" com dificuldade de concentração. Nega febre, perda de peso, rash cutâneo ou sintomas articulares inflamatórios. Antecedentes: hipertensão arterial controlada com losartana 50 mg/dia, sem cirurgias recentes ou traumas. Início insidioso, sem fator desencadeante claro.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente descreve dor em pelo menos 4 das 5 regiões corporais (tronco, braços, pernas, etc.), com sintomas associados como fadiga e distúrbios cognitivos. O que deseja investigar?',
        dicas: ['Duração dos sintomas, impacto funcional, exclusão de causas secundárias']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para caracterizar o quadro?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Duração da dor por pelo menos 3 meses e presença de fadiga', correta: true },
          { id: 'c', texto: 'Uso de tabaco', correta: false },
          { id: 'd', texto: 'Vacinações em dia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Critérios diagnósticos de fibromialgia requerem dor generalizada por ≥3 meses associada a fadiga e sintomas somáticos [1,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A duração e associação de sintomas são chave para o diagnóstico clínico.',
        incorreto: 'Priorize elementos que suportem critérios validados de fibromialgia.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa paciente eutrófica, sem sinais de inflamação articular. Sensibilidade à palpação em 11 dos 18 pontos tenderos clássicos (ACR 1990), mas priorizando critérios 2016. Sinais vitais normais.',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'IMC': '26.5 kg/m²',
          'Exame musculoesquelético': 'Dor à palpação em múltiplos pontos, sem edema ou limitação articular'
        },
        dicas: ['Avalie tender points e exclua outras patologias reumatológicas']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de fibromialgia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Edema articular', correta: false },
          { id: 'b', texto: 'Sensibilidade generalizada à palpação sem inflamação', correta: true },
          { id: 'c', texto: 'Rigidez matinal >1 hora', correta: false },
          { id: 'd', texto: 'Febre baixa', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A fibromialgia apresenta hiperalgesia sem sinais inflamatórios, diferentemente de artrites [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para excluir outras causas. Resultados laboratoriais normais, sem evidência de inflamação ou distúrbios endócrinos.',
        dados: {
          'Hemoglobina': '12.8 g/dL',
          'Leucócitos': '6.200/mm³',
          'PCR': '2.1 mg/L',
          'Velocidade de hemossedimentação': '18 mm/h',
          'TSH': '2.5 mUI/L',
          'Anticorpos antinucleares (ANA)': 'Negativo',
          'Creatinina': '0.8 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar estes resultados no contexto da suspeita?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Indício de doença inflamatória ativa', correta: false },
          { id: 'b', texto: 'Exames normais, suportando diagnóstico clínico de fibromialgia', correta: true },
          { id: 'c', texto: 'Necessidade de biópsia muscular', correta: false },
          { id: 'd', texto: 'Hipotireoidismo subclínico', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exames complementares de rotina são normais na fibromialgia; servem para exclusão de outras condições [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames normais, aplique os critérios ACR 2016: WPI ≥7 e SSS ≥5, ou WPI 4-6 e SSS ≥9, com sintomas por ≥3 meses e exclusão de outra doença.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Artrite reumatoide', correta: false },
          { id: 'b', texto: 'Fibromialgia', correta: true },
          { id: 'c', texto: 'Lúpus eritematoso sistêmico', correta: false },
          { id: 'd', texto: 'Hipotireoidismo', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Critérios clínicos ACR 2016 confirmam fibromialgia sem necessidade de exames alterados [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Inicie manejo multidisciplinar: educação, exercício aeróbico e farmacoterapia para dor e sono.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica INICIAL MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas analgésicos opioides', correta: false },
          { id: 'b', texto: 'Duloxetina 30 mg/dia + programa de exercícios', correta: true },
          { id: 'c', texto: 'Corticoides sistêmicos', correta: false },
          { id: 'd', texto: 'Repouso absoluto', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'INSS e sociedades recomendam abordagem não farmacológica + ISRSN como duloxetina para fibromialgia [1,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses: dor reduzida para 4/10, fadiga melhorada, com adesão a exercícios e medicação.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e reavaliar em 3-6 meses', correta: true },
          { id: 'b', texto: 'Suspender medicação por melhora', correta: false },
          { id: 'c', texto: 'Intensificar com opioides', correta: false },
          { id: 'd', texto: 'Encaminhar para reumatologista imediatamente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Manejo contínuo com monitoramento periódico é essencial para evolução clínica [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 52 anos com dor generalizada, fadiga e distúrbios do sono diagnosticada com fibromialgia por critérios ACR 2016. Tratamento inicial com educação, exercícios e duloxetina levou a melhora sintomática.',
    diagnosticoFinal: 'Fibromialgia (CID-11: CA23)',
    tratamentoRealizado: 'Educação sobre a doença, programa de exercícios aeróbicos 3x/semana, duloxetina 30 mg/dia (titulado para 60 mg), terapia cognitivo-comportamental referenciada.',
    evolucao: 'Após 6 meses, redução de 50% na intensidade da dor, melhora no sono e qualidade de vida; sem complicações.',
    licoesPrincipais: [
      'O diagnóstico de fibromialgia é clínico, baseado em critérios ACR 2016, sem necessidade de exames de rotina [1,3].',
      'Sintomas associados como fadiga e distúrbios cognitivos são centrais e impactam o funcionamento diário [2].',
      'Manejo multidisciplinar, priorizando não farmacológico, é o padrão ouro para melhora sustentada [1,3].',
      'Excluir outras causas reumatológicas ou endócrinicas é essencial antes de confirmar o diagnóstico [1].',
      'Mulheres adultas são o grupo mais afetado, com prevalência de 2-8% na população geral [1,2].'
    ],
    errosComuns: [
      'Solicitar exames desnecessários, atrasando o diagnóstico clínico [1].',
      'Atribuir sintomas a estresse isolado, sem considerar critérios diagnósticos [2].',
      'Iniciar opioides precocemente, aumentando risco de dependência sem benefício [3].',
      'Ignorar impacto psicológico, subestimando necessidade de suporte multidisciplinar [1].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer os critérios diagnósticos clínicos para fibromialgia conforme ACR 2016.',
    'Diferenciar fibromialgia de outras causas de dor crônica generalizada.',
    'Aplicar princípios de manejo não farmacológico e farmacológico inicial.',
    'Entender o impacto epidemiológico e a importância do acompanhamento longitudinal.'
  ],
  competencias: [
    'Anamnese detalhada em dor crônica',
    'Exame físico reumatológico',
    'Raciocínio diagnóstico diferencial',
    'Prescrição de terapia para dor neuropática',
    'Educação em saúde para condições crônicas'
  ],
  doencasRelacionadas: ['fibromialgia'],
  medicamentosRelacionados: ['N03AX16', 'N06AX21', 'N06AA09'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003'],
  tags: ['dor cronica', 'reumatologia', 'fadiga', 'disturbios do sono', 'sindrome de dor generalizada']
};