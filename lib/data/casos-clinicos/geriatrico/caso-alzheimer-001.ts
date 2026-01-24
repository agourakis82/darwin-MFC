import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ALZHEIMER_ger_001: CasoClinico = {
  id: 'caso-alzheimer-001',
  titulo: 'Declínio Cognitivo Progressivo em Idosa',
  subtitulo: 'Paciente de 72 anos com queixas de perda de memória e confusão recente',
  categoria: 'geriatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 72,
      sexo: 'F',
      profissao: 'Aposentada (ex-dona de casa)',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Estou esquecendo as coisas o tempo todo, não consigo lembrar onde guardo minhas chaves ou o que ia fazer',
    historiaDoencaAtual: 'Paciente refere declínio progressivo da memória há cerca de 2 anos, inicialmente com esquecimentos leves de nomes e eventos recentes, evoluindo para dificuldade em realizar tarefas diárias como cozinhar ou gerenciar finanças. A família nota desorientação temporal e espacial, com episódios de repetição de perguntas. Nega cefaleias intensas, quedas recentes ou alterações sensoriais agudas. Usa medicamentos para hipertensão e tem história de diabetes tipo 2 controlado.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente e a filha fornecem mais detalhes sobre o declínio cognitivo.',
        dicas: ['Investigue história familiar, medicamentos e causas reversíveis como depressão ou hipoalbuminemia']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para esclarecer o quadro?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Uso de medicamentos e história familiar de demência', correta: true },
          { id: 'c', texto: 'Preferências alimentares', correta: false },
          { id: 'd', texto: 'Atividades de lazer passadas', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Medicamentos podem causar declínio cognitivo reversível, e história familiar é fator de risco para Alzheimer [1,2,5].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história familiar e medicamentos guiam a avaliação inicial.',
        incorreto: 'Priorize fatores de risco e causas iatrogênicas no idoso.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'No exame físico, você observa sinais neurológicos e vitais estáveis.',
        dados: {
          'PA': '142/88 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'IMC': '27.5 kg/m²',
          'Escala de Glasgow': '15/15',
          'Força muscular': '5/5 em membros',
          'Reflexos': 'Normais',
          'Sinais de foco neurológico': 'Ausentes'
        },
        dicas: ['Avalie orientação e teste cognitivo breve como MMSE']
      },
      pergunta: {
        enunciado: 'Qual achado no exame neurológico é MAIS relevante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada isolada', correta: false },
          { id: 'b', texto: 'Desorientação temporal e pontuação baixa no Mini-Mental State Examination (MMSE 22/30)', correta: true },
          { id: 'c', texto: 'IMC 27.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 76 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'MMSE <24 sugere comprometimento cognitivo; desorientação é comum no Alzheimer [1,2,7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para excluir causas reversíveis de demência. Resultados laboratoriais e testes cognitivos:',
        dados: {
          'Hemoglobina': '12.5 g/dL',
          'Creatinina': '0.9 mg/dL',
          'TFGe': '75 mL/min/1.73m²',
          'TSH': '2.5 mUI/L',
          'Vitamina B12': '350 pg/mL',
          'Glicemia de jejum': '128 mg/dL',
          'MMSE': '22/30',
          'Clock Drawing Test': 'Anormal'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Causas endócrinas como hipotireoidismo', correta: false },
          { id: 'b', texto: 'Comprometimento cognitivo moderado sem causas reversíveis evidentes', correta: true },
          { id: 'c', texto: 'Deficiência grave de B12', correta: false },
          { id: 'd', texto: 'Insuficiência renal avançada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exames normais excluem causas reversíveis comuns; MMSE 22/30 indica declínio cognitivo [1,2,5].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames, formule sua hipótese diagnóstica. Considere critérios NINCDS-ADRDA.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Demência por Alzheimer provável', correta: true },
          { id: 'b', texto: 'Demência vascular isolada', correta: false },
          { id: 'c', texto: 'Comprometimento cognitivo leve (MCI) sem progressão', correta: false },
          { id: 'd', texto: 'Demência por depressão pseudodemência', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Declínio progressivo da memória sem focos neurológicos, com testes cognitivos alterados, atende critérios para Alzheimer provável [2,4,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial, incluindo não farmacológico e farmacológico, com orientação à família.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas suporte psicológico sem medicação', correta: false },
          { id: 'b', texto: 'Iniciar donepezila 5mg/dia + orientações para atividade física e suporte familiar', correta: true },
          { id: 'c', texto: 'Memantina como monoterapia inicial', correta: false },
          { id: 'd', texto: 'Encaminhamento imediato para neuroimagem sem tratamento', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Inibidores de colinesterase como donepezila são primeira linha para Alzheimer leve-moderado; intervenções não farmacológicas são essenciais [1,2,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 6 meses. MMSE 20/30, mas família relata melhora na orientação diária e menos agitação.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter donepezila, reavaliar em 6 meses e monitorar progressão', correta: true },
          { id: 'b', texto: 'Suspender medicação por falta de melhora total', correta: false },
          { id: 'c', texto: 'Aumentar dose imediatamente para 10mg', correta: false },
          { id: 'd', texto: 'Encaminhar para institucionalização', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Monitoramento semestral para MCI e demência; ajustes baseados em resposta clínica [1,10].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Idosa de 72 anos com declínio cognitivo progressivo diagnosticado como Doença de Alzheimer provável após avaliação estruturada, com exclusão de causas reversíveis e início de tratamento sintomático.',
    diagnosticoFinal: 'Doença de Alzheimer (CID-11: 8A20)',
    tratamentoRealizado: 'Donepezila 5mg/dia, otimizado para 10mg; orientações para exercícios cognitivos, suporte familiar e controle de comorbidades como HAS e DM2.',
    evolucao: 'Estabilização do declínio por 12 meses, com MMSE mantido em 20/30; família treinada para cuidados domiciliares, sem necessidade de institucionalização imediata.',
    licoesPrincipais: [
      'Avaliação inicial deve incluir história detalhada e testes cognitivos como MMSE para suspeita de demência [1,2].',
      'Excluir causas reversíveis (ex: hipotiroidismo, B12 baixa) antes de diagnosticar Alzheimer [5].',
      'Tratamento farmacológico com inibidores de colinesterase melhora sintomas em fases iniciais [2,4].',
      'Intervenções não farmacológicas, como atividade física, são recomendadas para prevenção e manejo [10].',
      'Monitoramento regular (6-12 meses) é essencial para rastrear progressão em cuidados primários [1].'
    ],
    errosComuns: [
      'Iniciar rastreamento populacional de demência em idosos assintomáticos, contra diretrizes [5,8].',
      'Ignorar comorbidades como HAS e DM2, que agravam o risco de Alzheimer [5,9].',
      'Prescrever memantina como primeira linha em Alzheimer leve, reservada para moderado-severo [2].',
      'Não envolver família no plano, essencial para adesão e suporte [2,4].'
    ]
  },

  objetivosAprendizagem: [
    'Realizar avaliação diagnóstica estruturada de declínio cognitivo em idosos.',
    'Aplicar critérios clínicos para diagnóstico provável de Doença de Alzheimer.',
    'Planejar tratamento inicial farmacológico e não farmacológico baseado em evidências.',
    'Discutir estratégias de acompanhamento e suporte familiar em demências.'
  ],
  competencias: [
    'Avaliação geriátrica integral',
    'Raciocínio clínico em neurologia',
    'Prescrição em geriatria',
    'Comunicação com pacientes e familiares'
  ],
  doencasRelacionadas: ['alzheimer'],
  medicamentosRelacionados: ['N06DA02', 'N06DA04', 'N06DA01'],
  calculadorasRelacionadas: ['mmse-calculator'],
  referencias: ['ref-001', 'ref-002', 'ref-004', 'ref-005', 'ref-007', 'ref-010'],
  tags: ['demencia', 'alzheimer', 'cognitivo', 'geriatria', 'memoria']
};