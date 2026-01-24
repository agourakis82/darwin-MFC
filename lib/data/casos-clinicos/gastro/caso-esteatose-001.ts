import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ESTEATOSE_gas_001: CasoClinico = {
  id: 'caso-esteatose-hepatica-001',
  titulo: 'Paciente Obeso com Fadiga e Dor Abdominal',
  subtitulo: 'Homem de meia-idade com suspeita de esteatose hepática associada à obesidade',
  categoria: 'gastro',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'José Silva',
      idade: 52,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou me sentindo muito cansado e com dor no lado direito da barriga há duas semanas.',
    historiaDoencaAtual: 'Paciente relata fadiga progressiva, dor abdominal em hipocôndrio direito de caráter surdo, sem irradiação, associada a refeições gordurosas. Nega febre, icterícia ou perda de peso involuntária. Refere ganho de peso nos últimos anos, com dieta rica em carboidratos e gorduras, sedentarismo e consumo ocasional de álcool (2 doses/semana). Antecedente de hipertensão há 5 anos, em uso de losartana 50 mg/dia.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona histórico familiar de diabetes e hipertensão. Há quanto tempo ele nota o ganho de peso?',
        dicas: ['Investigue hábitos alimentares, atividade física e comorbidades metabólicas associadas à obesidade [11,12]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o quadro atual?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Histórico de viagens recentes', correta: false },
          { id: 'b', texto: 'Padrões alimentares e sedentarismo', correta: true },
          { id: 'c', texto: 'Uso de tabaco', correta: false },
          { id: 'd', texto: 'Sintomas respiratórios', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hábitos de vida são fundamentais no rastreamento de obesidade e suas complicações, como esteatose hepática [11,12].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Os hábitos de vida são centrais no manejo da obesidade.',
        incorreto: 'Priorize fatores de risco modificáveis como dieta e exercício.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa paciente eutrófico em membros, mas com acúmulo abdominal de gordura. Medidas antropométricas revelam:',
        dados: {
          'PA': '145/90 mmHg',
          'FC': '82 bpm',
          'IMC': '32.5 kg/m²',
          'Circunferência abdominal': '105 cm',
          'Hepatomegalia': 'Leve, indolor'
        },
        dicas: ['Note o IMC elevado e circunferência abdominal, indicadores de obesidade central e risco metabólico [11,12]']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de complicação metabólica?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 145/90 mmHg', correta: false },
          { id: 'b', texto: 'IMC 32.5 kg/m² e circunferência abdominal 105 cm', correta: true },
          { id: 'c', texto: 'FC 82 bpm', correta: false },
          { id: 'd', texto: 'Hepatomegalia leve', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Obesidade central (circunferência abdominal >102 cm em homens) associa-se a esteatose hepática metabólica [8,11].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados laboratoriais e de imagem mostram:',
        dados: {
          'Glicemia de jejum': '130 mg/dL',
          'Triglicerídeos': '220 mg/dL',
          'ALT': '65 U/L',
          'AST': '50 U/L',
          'Ultrassonografia abdominal': 'Fígado hiperecogênico sugestivo de esteatose',
          'Colesterol total': '210 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar esses resultados no contexto da obesidade?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção viral hepática', correta: false },
          { id: 'b', texto: 'Esteatose hepática não alcoólica associada a síndrome metabólica', correta: true },
          { id: 'c', texto: 'Dislipidemia isolada', correta: false },
          { id: 'd', texto: 'Pré-diabetes sem relevância hepática', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Elevação de enzimas hepáticas e achados ultrassonográficos em paciente obeso sugerem esteatose hepática metabólica [8,11,12].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e exames, qual a hipótese principal?'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Esteatose hepática alcoólica', correta: false },
          { id: 'b', texto: 'Esteatose hepática metabólica secundária à obesidade', correta: true },
          { id: 'c', texto: 'Hepatite autoimune', correta: false },
          { id: 'd', texto: 'Cirrose compensada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Obesidade é fator de risco principal para esteatose hepática metabólica, com comorbidades como dislipidemia e intolerância à glicose [8,11,12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Elabore o plano inicial de manejo, priorizando mudanças de estilo de vida.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Medicamentação imediata com estatina', correta: false },
          { id: 'b', texto: 'Mudanças de estilo de vida (dieta e exercício) com monitoramento', correta: true },
          { id: 'c', texto: 'Encaminhamento cirúrgico para redução de peso', correta: false },
          { id: 'd', texto: 'Uso de liraglutida sem avaliação inicial', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Intervenções lifestyle são primeira linha para obesidade e esteatose hepática; farmacoterapia se falha após 3-6 meses [11,12,13].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, paciente retorna: perda de 5 kg, ALT 45 U/L, triglicerídeos 180 mg/dL, aderente à dieta hipocalórica e exercícios.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter mudanças de estilo de vida e reavaliar em 3 meses', correta: true },
          { id: 'b', texto: 'Iniciar liraglutida imediatamente', correta: false },
          { id: 'c', texto: 'Solicitar biópsia hepática', correta: false },
          { id: 'd', texto: 'Suspender todos os cuidados', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resposta positiva ao manejo não farmacológico; monitoramento periódico para obesidade e complicações [11,12,13,14].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com obesidade grau I apresentou esteatose hepática metabólica, manejada com sucesso inicial por mudanças de estilo de vida, com melhora bioquímica e antropométrica.',
    diagnosticoFinal: 'Esteatose hepática metabólica associada à obesidade e síndrome metabólica',
    tratamentoRealizado: 'Orientações dietéticas (redução calórica, baixa em gorduras), programa de exercícios aeróbicos (150 min/semana), otimização de anti-hipertensivo; monitoramento sem farmacoterapia inicial',
    evolucao: 'Após 3 meses, redução de peso e normalização parcial de enzimas hepáticas; paciente motivado para continuidade',
    licoesPrincipais: [
      'A obesidade é fator de risco principal para esteatose hepática metabólica, exigindo rastreamento antropométrico em atenção primária [11,12]',
      'Mudanças de estilo de vida são a base do tratamento, com perda de 5-10% do peso corporal melhorando a esteatose [8,13]',
      'Monitoramento anual de IMC e circunferência abdominal em adultos com fatores de risco [11,12]',
      'Farmacoterapia como liraglutida indicada após falha em lifestyle, em obesidade grau II/III ou com comorbidades [14]',
      'Integração de comorbidades como hipertensão e dislipidemia no manejo global [12]'
    ],
    errosComuns: [
      'Ignorar hábitos de vida e priorizar exames invasivos como biópsia sem indicação clara [8]',
      'Subestimar o impacto da obesidade central na esteatose, focando apenas em IMC [11]',
      'Iniciar farmacoterapia sem tentativa de 3-6 meses de intervenções não farmacológicas [13,14]',
      'Não rastrear comorbidades metabólicas em pacientes obesos, atrasando diagnóstico precoce [12]'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer a associação entre obesidade e esteatose hepática metabólica',
    'Aplicar diretrizes para rastreamento e manejo inicial da obesidade em atenção primária',
    'Interpretar achados laboratoriais e de imagem sugestivos de esteatose não alcoólica',
    'Elaborar plano terapêutico baseado em evidências, priorizando mudanças de estilo de vida'
  ],
  competencias: [
    'Avaliação antropométrica e identificação de riscos metabólicos',
    'Raciocínio clínico em doenças crônicas multifatoriais',
    'Manejo integrado de comorbidades em atenção primária',
    'Educação em saúde para adesão a mudanças de estilo de vida'
  ],
  doencasRelacionadas: ['obesidade', 'esteatose hepática metabólica'],
  medicamentosRelacionados: ['A10AE05'], // Liraglutida
  calculadorasRelacionadas: ['imc', 'circunferencia-abdominal'],
  referencias: ['ref-008', 'ref-011', 'ref-012', 'ref-013', 'ref-014'],
  tags: ['obesidade', 'esteatose hepática', 'síndrome metabólica', 'atenção primária', 'mudanças de estilo de vida']
};