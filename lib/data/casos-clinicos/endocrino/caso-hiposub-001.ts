import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_HIPOSUB_end_001: CasoClinico = {
  id: 'caso-hipotireoidismo-subclinico-001',
  titulo: 'Mulher idosa com fadiga persistente',
  subtitulo: 'Paciente de 62 anos relata cansaço e ganho de peso recente, com história familiar de tireoidopatias',
  categoria: 'endocrino',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira Santos',
      idade: 62,
      sexo: 'F',
      profissao: 'Aposentada (professora)',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Estou sempre cansada e engordei 5 kg nos últimos meses sem mudar nada na alimentação',
    historiaDoencaAtual: 'Paciente refere fadiga progressiva há 6 meses, associada a sensação de frio excessiva, constipação intestinal e pele seca. Nega febre, perda de peso ou sintomas de compressão cervical. Apresenta história familiar de hipotireoidismo em irmã e mãe. Não usa medicamentos crônicos, mas iniciou amiodarona há 1 ano por fibrilação atrial. Exame físico inicial revela bradicardia (FC 58 bpm), pele seca e leve aumento de volume tireoidiano.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona história familiar de tireoidopatias e uso recente de amiodarona. O que mais deseja investigar?',
        dicas: ['Considere fatores de risco como idade, sexo, medicamentos e sintomas oligossintomáticos']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o diagnóstico diferencial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Uso de medicamentos como amiodarona', correta: true },
          { id: 'c', texto: 'Prática de exercícios físicos', correta: false },
          { id: 'd', texto: 'Dieta alimentar detalhada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Medicamentos como amiodarona podem induzir disfunção tireoidiana, especialmente hipotireoidismo [1,6].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Medicamentos são um fator de risco importante para hipotireoidismo subclínico.',
        incorreto: 'Priorize fatores de risco endócrinos e medicamentos que afetam a tireoide.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'No exame físico, você observa pele seca, cabelos finos, bradicardia e tireoide aumentada de consistência firme, sem nódulos palpáveis.',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '58 bpm',
          'FR': '14 irpm',
          'IMC': '28.5 kg/m²',
          'Peso': '68 kg',
          'Altura': '1,55 m'
        },
        dicas: ['Atenção para sinais sugestivos de hipotireoidismo como bradicardia e pele seca']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de disfunção tireoidiana?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 130/80 mmHg', correta: false },
          { id: 'b', texto: 'FC 58 bpm e pele seca', correta: true },
          { id: 'c', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'd', texto: 'FR 14 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Bradicardia e pele seca são achados clássicos de hipotireoidismo, mesmo na forma subclínica [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita dosagem hormonal tireoidiana e outros exames. Resultados laboratoriais:',
        dados: {
          'TSH': '7.2 mUI/L (ref: 0.4-4.5)',
          'T4 livre': '1.1 ng/dL (ref: 0.8-1.8)',
          'Colesterol total': '240 mg/dL',
          'LDL': '150 mg/dL',
          'HDL': '40 mg/dL',
          'Triglicerídeos': '180 mg/dL',
          'Creatinina': '0.9 mg/dL',
          'TFGe': '85 mL/min/1.73m²'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar esses resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipertireoidismo manifesto', correta: false },
          { id: 'b', texto: 'Hipotireoidismo subclínico com dislipidemia', correta: true },
          { id: 'c', texto: 'Eutiroidismo normal', correta: false },
          { id: 'd', texto: 'Hipotireoidismo primário grave', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'TSH elevado com T4L normal define hipotireoidismo subclínico, associado a dislipidemia [1,2,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame físico e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipotireoidismo subclínico induzido por amiodarona', correta: true },
          { id: 'b', texto: 'Doença de Hashimoto manifesta', correta: false },
          { id: 'c', texto: 'Tireotoxicose factícia', correta: false },
          { id: 'd', texto: 'Carcinoma papilar de tireoide', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'TSH 7.2 mUI/L com T4L normal, sintomas leves e uso de amiodarona confirmam hipotireoidismo subclínico [1,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento, considerando guidelines.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Iniciar levotiroxina 50 mcg/dia imediatamente', correta: true },
          { id: 'b', texto: 'Apenas observação sem medicação', correta: false },
          { id: 'c', texto: 'Encaminhar para biópsia de tireoide', correta: false },
          { id: 'd', texto: 'Suspender amiodarona sem substituição', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Para TSH >5 mUI/L em idosa com sintomas, iniciar levotiroxina em dose baixa é recomendado [1,2,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após início de levotiroxina 50 mcg/dia. Relata melhora da fadiga e constipação. Novos exames: TSH 2.8 mUI/L, T4L 1.3 ng/dL, colesterol total 210 mg/dL.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter dose atual e reavaliar em 6-12 meses', correta: true },
          { id: 'b', texto: 'Aumentar dose para 75 mcg/dia', correta: false },
          { id: 'c', texto: 'Suspender levotiroxina', correta: false },
          { id: 'd', texto: 'Solicitar anticorpos anti-TPO', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'TSH normalizado indica resposta adequada; monitorar anualmente em idosos [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 62 anos com hipotireoidismo subclínico induzido por amiodarona, diagnosticado por TSH elevado e T4L normal, tratado com levotiroxina com boa evolução.',
    diagnosticoFinal: 'Hipotireoidismo subclínico (CID-11: CA23)',
    tratamentoRealizado: 'Levotiroxina 50 mcg/dia, com ajuste baseado em TSH; orientação para dieta e atividade física; continuação de amiodarona com monitoração.',
    evolucao: 'Melhora sintomática em 3 meses, normalização de TSH e redução de colesterol; paciente assintomática em seguimento anual.',
    licoesPrincipais: [
      'Hipotireoidismo subclínico é comum em idosos e mulheres, com prevalência de 5-8% no Brasil [3,5].',
      'Rastreamento seletivo é indicado para grupos de risco, como idosos ≥60 anos e usuários de amiodarona [3,4].',
      'Tratamento com levotiroxina é recomendado para TSH >5-10 mUI/L com sintomas ou comorbidades cardiovasculares [1,2].',
      'Monitorar TSH a cada 6-12 meses após início de terapia para evitar sobredosagem [1,2].',
      'Associação com dislipidemia e risco CV reforça a importância do diagnóstico precoce [6,9].'
    ],
    errosComuns: [
      'Iniciar tratamento em todos os casos de TSH levemente elevado sem considerar sintomas ou risco [1].',
      'Ignorar medicamentos indutores como amiodarona no diagnóstico diferencial [6].',
      'Não confirmar com T4L, levando a sobrediagnóstico [2].',
      'Ajustar dose sem reavaliação laboratorial em idosos, risco de arritmias [1].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar indicações para rastreamento de hipotireoidismo subclínico em populações de risco.',
    'Interpretar dosagens de TSH e T4L para diagnóstico de formas subclínicas.',
    'Aplicar guidelines para decisão terapêutica em idosos com sintomas leves.',
    'Reconhecer associações com comorbidades como dislipidemia e risco cardiovascular.'
  ],
  competencias: [
    'Avaliação clínica de distúrbios endócrinos',
    'Raciocínio diagnóstico em atenção primária',
    'Prescrição e monitoração de terapia hormonal',
    'Educação em saúde para pacientes crônicos'
  ],
  doencasRelacionadas: ['hipotireoidismo-subclinico'],
  medicamentosRelacionados: ['H03AA01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006'],
  tags: ['tireoide', 'hipotireoidismo', 'idosos', 'rastreamento', 'amiodarona']
};