import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_TB_inf_001: CasoClinico = {
  id: 'caso-tuberculose-pulmonar-001',
  titulo: 'Suspeita de Tuberculose Pulmonar em Paciente com Tosse Crônica',
  subtitulo: 'Homem de 45 anos apresenta tosse persistente, perda de peso e febre noturna',
  categoria: 'infeccioso',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 45,
      sexo: 'M',
      profissao: 'Motorista de ônibus',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Tosse seca há mais de duas semanas que piora à noite',
    historiaDoencaAtual: 'Paciente relata tosse persistente há 3 semanas, associada a febre baixa noturna, sudorese profusa e perda de 5 kg em um mês sem dieta. Nega hemoptise, mas menciona fadiga e dispneia leve ao esforço. Trabalha em rotas urbanas lotadas em área endêmica. Sem comorbidades conhecidas, mas fuma 10 cigarros/dia há 20 anos. Nega contatos conhecidos com TB, mas relata vizinho com "problemas pulmonares" recentes.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona exposição ocupacional a multidões e possível contato domiciliar. O que deseja investigar?',
        dicas: ['Fatores de risco como contatos, tabagismo, condições sociais e comorbidades como HIV ou diabetes']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de câncer pulmonar', correta: false },
          { id: 'b', texto: 'Contatos domiciliares com casos de TB', correta: true },
          { id: 'c', texto: 'Prática de exercícios físicos', correta: false },
          { id: 'd', texto: 'Viagens internacionais recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Identificar contatos próximos é crucial para rastreamento de TB, conforme diretrizes do Ministério da Saúde [1].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Contatos domiciliares aumentam o risco de transmissão.',
        incorreto: 'Priorize fatores de risco epidemiológicos para TB.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa palidez, perda de peso evidente e ruídos respiratórios adventícios em base direita. Sinais vitais:',
        dados: {
          'PA': '120/80 mmHg',
          'FC': '92 bpm',
          'FR': '20 irpm',
          'Temperatura': '37.8°C',
          'IMC': '18.5 kg/m²'
        },
        dicas: ['Note a taquipneia, febre baixa e desnutrição, sugestivos de infecção crônica']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pressão arterial normal', correta: false },
          { id: 'b', texto: 'IMC 18.5 kg/m² com febre baixa', correta: true },
          { id: 'c', texto: 'Frequência cardíaca 92 bpm', correta: false },
          { id: 'd', texto: 'Frequência respiratória 20 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Desnutrição e febre baixa são sinais clássicos de TB pulmonar em populações vulneráveis [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram infiltrado cavitário em lobo superior direito na radiografia de tórax. Exames laboratoriais:',
        dados: {
          'Hemoglobina': '11.2 g/dL',
          'Leucócitos': '8.500/mm³',
          'Baciloscopia de escarro (BAAR)': 'Positiva 2+',
          'Teste rápido molecular (TRM-TB)': 'Mycobacterium tuberculosis detectado, sem resistência a rifampicina',
          'HIV sorologia': 'Negativa'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pneumonia bacteriana comum', correta: false },
          { id: 'b', texto: 'Tuberculose pulmonar confirmada', correta: true },
          { id: 'c', texto: 'Câncer de pulmão primário', correta: false },
          { id: 'd', texto: 'Infecção fúngica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'BAAR positiva e TRM-TB confirmam TB ativa. Radiografia compatível com padrão pulmonar [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese diagnóstica principal.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Tuberculose pulmonar sensível a drogas', correta: true },
          { id: 'b', texto: 'Bronquite crônica por tabagismo', correta: false },
          { id: 'c', texto: 'Tuberculose multirresistente', correta: false },
          { id: 'd', texto: 'Pneumonia aspirativa', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas crônicos, BAAR positiva e TRM-TB sem resistência confirmam TB pulmonar sensível [1,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'O diagnóstico é confirmado. Inicie tratamento conforme protocolo. Considere isolamento respiratório inicial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas antibióticos beta-lactâmicos por 7 dias', correta: false },
          { id: 'b', texto: 'Rifampicina, isoniazida, pirazinamida e etambutol (RIPE) por 2 meses, seguido de rifampicina e isoniazida por 4 meses', correta: true },
          { id: 'c', texto: 'Corticoides isolados', correta: false },
          { id: 'd', texto: 'Tratamento empírico para COVID-19', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Regime RIPE é padrão para TB sensível no SUS, com duração total de 6 meses [1,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 2 meses. Baciloscopia negativa, ganho de peso de 3 kg e resolução parcial na radiografia.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter fase de manutenção do tratamento e monitorar adesão', correta: true },
          { id: 'b', texto: 'Suspender tratamento por melhora', correta: false },
          { id: 'c', texto: 'Intensificar com drogas de segunda linha', correta: false },
          { id: 'd', texto: 'Encaminhar para cirurgia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Conversão baciloscópica indica resposta. Completar 6 meses e rastrear contatos [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 45 anos com sintomas clássicos de TB pulmonar, diagnosticado precocemente por baciloscopia e TRM-TB, tratado com sucesso pelo regime RIPE, com resolução completa após 6 meses.',
    diagnosticoFinal: 'Tuberculose pulmonar sensível a drogas (CID-11: CA23)',
    tratamentoRealizado: 'Rifampicina, isoniazida, pirazinamida e etambutol por 2 meses, seguido de rifampicina e isoniazida por 4 meses, com suplementação nutricional e cessação tabágica.',
    evolucao: 'Melhora clínica e microbiológica em 2 meses, alta com baciloscopia negativa e radiografia normal em 6 meses. Rastreamento de contatos realizado.',
    licoesPrincipais: [
      'Sintomas como tosse >2 semanas em populações de risco demandam investigação imediata para TB [1].',
      'Baciloscopia e TRM-TB são métodos acessíveis e rápidos para confirmação diagnóstica [1,2].',
      'Tratamento padrão RIPE garante cura em >95% dos casos sensíveis, reduzindo transmissão [4].',
      'Rastreamento de contatos e populações vulneráveis é essencial para controle epidêmico [1,3].',
      'Desnutrição e tabagismo agravam o quadro; intervenções sociais melhoram adesão [1].'
    ],
    errosComuns: [
      'Subestimar sintomas crônicos como "gripe comum", atrasando diagnóstico [1].',
      'Não solicitar baciloscopia inicial em sintomáticos, perdendo detecção precoce [2].',
      'Interromper tratamento prematuramente, favorecendo resistência [4].',
      'Ignorar rastreamento de contatos, perpetuando transmissão comunitária [1,3].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais e sintomas de tuberculose pulmonar em contextos de alta prevalência.',
    'Aplicar diretrizes para rastreamento e diagnóstico microbiológico de TB.',
    'Planejar tratamento e acompanhamento conforme protocolos do SUS e OMS.',
    'Entender o impacto epidemiológico e medidas de controle em populações vulneráveis.'
  ],
  competencias: [
    'Diagnóstico diferencial de infecções respiratórias crônicas',
    'Prescrição de antimicrobianos para doenças infecciosas',
    'Aconselhamento em saúde pública e prevenção de transmissão'
  ],
  doencasRelacionadas: ['tuberculose-pulmonar'],
  medicamentosRelacionados: ['J04AB02', 'J04AC01', 'J04AD03', 'J04AK02'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005'],
  tags: ['tuberculose', 'infeccioso', 'pulmonar', 'rastreamento', 'tratamento RIPE']
};