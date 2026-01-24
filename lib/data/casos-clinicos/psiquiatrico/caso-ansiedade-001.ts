import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ANSIEDADE_psi_001: CasoClinico = {
  id: 'caso-transtorno-ansiedade-generalizada-001',
  titulo: 'Paciente com Preocupação Excessiva e Inquietação Crônica',
  subtitulo: 'Mulher adulta com sintomas persistentes de ansiedade generalizada afetando o dia a dia',
  categoria: 'psiquiatrico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 45,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou sempre preocupada com tudo, não consigo parar de pensar nas coisas ruins que podem acontecer.',
    historiaDoencaAtual: 'Paciente relata preocupação excessiva e incontrolável há mais de seis meses, envolvendo aspectos como saúde familiar, finanças e trabalho. Apresenta inquietação, fadiga fácil, dificuldade para concentrar-se, irritabilidade e tensão muscular. Os sintomas pioram em situações de estresse e interferem no sono e nas atividades diárias. Nega uso de substâncias ou eventos traumáticos recentes, mas menciona estresse crônico no trabalho.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica para caracterizar os sintomas de ansiedade. O que deseja investigar?',
        dicas: ['Avalie duração, intensidade e impacto funcional dos sintomas; considere comorbidades e fatores precipitantes [1,2]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Duração e impacto dos sintomas de preocupação', correta: true },
          { id: 'c', texto: 'Hábitos alimentares', correta: false },
          { id: 'd', texto: 'Atividade física semanal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O TAG requer preocupação excessiva por pelo menos seis meses com prejuízo funcional [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A caracterização temporal e funcional é essencial para o diagnóstico.',
        incorreto: 'Priorize a avaliação dos critérios diagnósticos de ansiedade persistente.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa sinais de tensão somática associados à ansiedade.',
        dados: {
          'PA': '130/85 mmHg',
          'FC': '92 bpm',
          'FR': '18 irpm',
          'IMC': '26.5 kg/m²',
          'Observações': 'Tremor fino nas mãos, tensão muscular em pescoço e ombros, sem outros achados relevantes'
        },
        dicas: ['Sinais somáticos como taquicardia e tensão muscular são comuns no TAG [1,3]']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de TAG?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 130/85 mmHg', correta: false },
          { id: 'b', texto: 'Tensão muscular e tremor fino', correta: true },
          { id: 'c', texto: 'IMC 26.5 kg/m²', correta: false },
          { id: 'd', texto: 'FR 18 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas somáticos como tensão muscular e inquietação motora são critérios do TAG [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para descartar causas orgânicas de ansiedade. Resultados laboratoriais:',
        dados: {
          'Hemograma': 'Normal',
          'TSH': '2.5 mUI/L (normal)',
          'T4 livre': '1.2 ng/dL (normal)',
          'Glicemia de jejum': '92 mg/dL',
          'Creatinina': '0.8 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alteração tireoidiana confirmada', correta: false },
          { id: 'b', texto: 'Exames normais, sem causas orgânicas evidentes', correta: true },
          { id: 'c', texto: 'Hipertireoidismo subclínico', correta: false },
          { id: 'd', texto: 'Diabetes descontrolado', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exames normais suportam diagnóstico psiquiátrico primário, descartando causas endócrinas comuns [2,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, aplique critérios diagnósticos.',
        dicas: ['Use GAD-7 para triagem e DSM-5 para confirmação [1]']
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Transtorno de Ansiedade Generalizada (TAG)', correta: true },
          { id: 'b', texto: 'Transtorno de Pânico', correta: false },
          { id: 'c', texto: 'Hipertireoidismo', correta: false },
          { id: 'd', texto: 'Depressão maior isolada', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Preocupação excessiva por ≥6 meses com sintomas associados atende critérios do DSM-5 para TAG [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de manejo para TAG em atenção primária.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação e retorno em 6 meses', correta: false },
          { id: 'b', texto: 'Terapia cognitivo-comportamental (TCC) + ISRS (ex: sertralina)', correta: true },
          { id: 'c', texto: 'Benzodiazepínicos como monoterapia', correta: false },
          { id: 'd', texto: 'Encaminhamento imediato a psiquiatra sem tratamento inicial', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'TCC e ISRS de primeira linha para TAG moderado a grave em atenção primária [1,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após TCC e sertralina 50mg/dia. Relata redução de 50% nos sintomas (GAD-7: 8/21), melhor sono e menos irritabilidade.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e monitorar a cada 3 meses', correta: true },
          { id: 'b', texto: 'Aumentar dose de sertralina imediatamente', correta: false },
          { id: 'c', texto: 'Suspender medicação por melhora', correta: false },
          { id: 'd', texto: 'Encaminhar para hospitalização', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora parcial requer manutenção e monitoramento contínuo para prevenção de recaídas [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de mulher de 45 anos com TAG diagnosticado em atenção primária, manejado com TCC e ISRS, com boa resposta inicial.',
    diagnosticoFinal: 'Transtorno de Ansiedade Generalizada (CID-11: 6B00)',
    tratamentoRealizado: 'Terapia cognitivo-comportamental + Sertralina 50mg/dia, com monitoramento via GAD-7.',
    evolucao: 'Após 3 meses, redução significativa dos sintomas e melhora funcional; manutenção do plano.',
    licoesPrincipais: [
      'O TAG é caracterizado por ansiedade excessiva por ≥6 meses com sintomas somáticos [1].',
      'Rastreamento com GAD-7 é recomendado em atenção primária para adultos com sintomas persistentes [2,3].',
      'Tratamento de primeira linha inclui TCC e ISRS, com evidência de eficácia [1].',
      'Exames laboratoriais ajudam a descartar causas orgânicas como tireoidopatias [2].',
      'Monitoramento contínuo é essencial para ajustar terapia e prevenir comorbidades [3].'
    ],
    errosComuns: [
      'Subestimar o impacto funcional da ansiedade, atrasando o diagnóstico [1].',
      'Iniciar benzodiazepínicos como monoterapia devido ao risco de dependência [2].',
      'Não rastrear comorbidades como depressão ou HAS associadas ao TAG [3].',
      'Encaminhar precocemente sem tentativa de manejo em atenção primária [2].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar critérios diagnósticos do Transtorno de Ansiedade Generalizada (TAG) conforme DSM-5.',
    'Aplicar ferramentas de triagem como GAD-7 em atenção primária.',
    'Planejar tratamento inicial com psicoterapia e farmacoterapia para TAG.',
    'Reconhecer a importância do acompanhamento longitudinal em transtornos de ansiedade.'
  ],
  competencias: [
    'Avaliação inicial de saúde mental em adultos',
    'Raciocínio diagnóstico em psiquiatria',
    'Prescrição de psicofármacos em atenção primária',
    'Educação em saúde e manejo não farmacológico'
  ],
  doencasRelacionadas: ['transtorno-ansiedade-generalizada'],
  medicamentosRelacionados: ['N06AB03', 'N06AB05', 'N05BA01'],
  calculadorasRelacionadas: ['GAD-7'],
  referencias: [
    'ref-001',
    'ref-002',
    'ref-003'
  ],
  tags: ['ansiedade', 'saúde mental', 'atenção primária', 'TAG', 'psiquiatria']
};