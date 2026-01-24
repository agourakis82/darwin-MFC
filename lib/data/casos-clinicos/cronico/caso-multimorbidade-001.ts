import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_MULTIMORBIDADE_cro_001: CasoClinico = {
  id: 'caso-multimorbidade-dm2-001',
  titulo: 'Mulher com Fadiga Crônica e Suspeita de Diabetes Mellitus Tipo 2 em Contexto Multimórbido',
  subtitulo: 'Caso de paciente idosa com múltiplas comorbidades crônicas, incluindo possível DM2, hipertensão e dislipidemia',
  categoria: 'cronico',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Ana Paula Santos',
      idade: 62,
      sexo: 'F',
      profissao: 'Dona de casa',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou sempre cansada e com muita sede há dois meses',
    historiaDoencaAtual: 'Paciente relata poliúria, polidipsia e fadiga progressiva nos últimos dois meses, associada a perda de peso involuntária de 5 kg. Refere história de hipertensão arterial sistêmica diagnosticada há 8 anos, em uso irregular de medicação. Nega episódios de hipoglicemia ou cetonúria. Antecedentes incluem obesidade e dislipidemia não tratada. Sem história de tabagismo ou etilismo excessivo.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a anamnese para identificar fatores de risco e comorbidades associadas. A paciente menciona história familiar de diabetes e sedentarismo.',
        dicas: ['Considere hábitos de vida, comorbidades como HAS e história familiar de DM2']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o raciocínio diferencial neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'História familiar de diabetes e sedentarismo', correta: true },
          { id: 'c', texto: 'Uso de fitoterápicos', correta: false },
          { id: 'd', texto: 'Atividade sexual', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Fatores de risco como história familiar e sedentarismo são cruciais para suspeita de DM2 em contexto multimórbido [9,10].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Esses fatores reforçam a suspeita de DM2 associada a síndrome metabólica.',
        incorreto: 'Priorize fatores de risco modificáveis e familiares para guiar o diagnóstico.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'No exame físico, você observa sinais de comorbidades crônicas. A paciente apresenta IMC elevado e sinais de hipertensão.',
        dados: {
          'PA': '158/96 mmHg',
          'FC': '82 bpm',
          'FR': '18 irpm',
          'IMC': '29.8 kg/m²',
          'Glicemia capilar': '212 mg/dL',
          'Circunferência abdominal': '98 cm'
        },
        dicas: ['Note a glicemia elevada e obesidade central, sugestivos de síndrome metabólica']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS indicativo de complicação aguda associada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 158/96 mmHg', correta: false },
          { id: 'b', texto: 'Glicemia capilar 212 mg/dL', correta: true },
          { id: 'c', texto: 'IMC 29.8 kg/m²', correta: false },
          { id: 'd', texto: 'Circunferência abdominal 98 cm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia casual ≥200 mg/dL com sintomas clássicos sugere diagnóstico de DM2 [9,11].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para confirmar diagnóstico e avaliar comorbidades. Os resultados revelam alterações metabólicas múltiplas.',
        dados: {
          'Glicemia de jejum': '148 mg/dL',
          'HbA1c': '7.8%',
          'Creatinina': '0.9 mg/dL',
          'TFGe': '78 mL/min/1.73m²',
          'Colesterol total': '238 mg/dL',
          'LDL': '148 mg/dL',
          'HDL': '40 mg/dL',
          'Triglicerídeos': '210 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Qual a interpretação MAIS precisa desses resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pré-diabetes isolado', correta: false },
          { id: 'b', texto: 'DM2 confirmada com dislipidemia mista', correta: true },
          { id: 'c', texto: 'Insuficiência renal crônica estágio 3', correta: false },
          { id: 'd', texto: 'Hipercolesterolemia familiar', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'HbA1c ≥6,5% confirma DM2; perfil lipídico alterado indica comorbidade aterogênica comum em multimorbidade [9,10,11].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e exames, formule sua hipótese diagnóstica considerando o contexto multimórbido.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico principal e comorbidades MAIS prováveis?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'DM2 + HAS + Dislipidemia (síndrome metabólica)', correta: true },
          { id: 'b', texto: 'DM1 de início tardio + tireoidite', correta: false },
          { id: 'c', texto: 'Diabetes gestacional residual', correta: false },
          { id: 'd', texto: 'Síndrome de Cushing', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Perfil clássico de multimorbidade crônica: DM2 associada a HAS, obesidade e dislipidemia, configurando síndrome metabólica [9,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Elabore o plano terapêutico inicial, considerando evidências para multimorbidade e risco cardiovascular elevado.'
      },
      pergunta: {
        enunciado: 'Qual a abordagem terapêutica INICIAL MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Mudanças no estilo de vida (MEV) isoladas por 6 meses', correta: false },
          { id: 'b', texto: 'Metformina + Estatina', correta: false },
          { id: 'c', texto: 'Metformina + Inibidor de SGLT2 + Estatina + IECA', correta: true },
          { id: 'd', texto: 'Insulina basal imediata', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Em DM2 com comorbidades e risco CV alto, metformina é primeira linha; iSGLT2 adiciona benefício renal/CV; estatina e IECA para dislipidemia e HAS [9,10,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'A paciente retorna em 3 meses para reavaliação. Relata adesão ao tratamento, com melhora sintomática. Exames mostram HbA1c 6.9%, PA 132/84 mmHg, perda de 3 kg e LDL 110 mg/dL.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS adequada no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter regime atual e monitorar trimestralmente', correta: true },
          { id: 'b', texto: 'Intensificar hipoglicemiantes devido a HbA1c elevada', correta: false },
          { id: 'c', texto: 'Suspender medicamentos por melhora', correta: false },
          { id: 'd', texto: 'Encaminhar para cirurgia bariátrica imediata', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Metas atingidas (HbA1c <7%, PA <140/90, LDL <100-130 em risco intermediário); manter MEV e farmacoterapia com acompanhamento regular [9,11].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com DM2 recém-diagnosticada em contexto de multimorbidade (HAS e dislipidemia), tratada com abordagem integrada, alcançando controle glicêmico e redução de risco CV em 3 meses.',
    diagnosticoFinal: 'Diabetes Mellitus Tipo 2 associado a Hipertensão Arterial Sistêmica e Dislipidemia (Síndrome Metabólica)',
    tratamentoRealizado: 'Metformina 1g BID, Dapagliflozina 10mg/dia, Atorvastatina 20mg/dia, Losartana 50mg/dia, além de orientações para MEV (dieta hipocalórica, exercício 150 min/semana).',
    evolucao: 'Melhora clínica e laboratorial em 3 meses, sem complicações agudas; paciente motivada para adesão contínua.',
    licoesPrincipais: [
      'Na multimorbidade crônica, priorize abordagem integrada para otimizar controle glicêmico e reduzir risco CV [9,10].',
      'Rastreamento oportuno de DM2 em pacientes com HAS e obesidade previne complicações [11].',
      'iSGLT2 oferecem benefícios adicionais em pacientes com comorbidades renais ou CV [9].',
      'Monitoramento regular de HbA1c, PA e lipídios é essencial no seguimento de DM2 multimórbida [10,11].',
      'Envolvimento multidisciplinar melhora adesão em casos complexos [12].'
    ],
    errosComuns: [
      'Subestimar comorbidades e tratar DM2 isoladamente, ignorando síndrome metabólica [9].',
      'Iniciar insulina precoce sem otimizar MEV e orais em DM2 não complicada [10].',
      'Não avaliar risco CV basal, omitindo estatina em dislipidemia associada [11].',
      'Falta de personalização do tratamento, desconsiderando função renal (TFGe) [9].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais e sintomas de DM2 em pacientes com multimorbidade crônica.',
    'Interpretar exames laboratoriais para diagnóstico e estratificação de risco em síndrome metabólica.',
    'Elaborar plano terapêutico integrado baseado em diretrizes SUS e SBD para DM2 com comorbidades.',
    'Avaliar evolução e ajustar tratamento no seguimento de pacientes multimórbidos.'
  ],
  competencias: [
    'Raciocínio clínico em doenças crônicas não transmissíveis',
    'Gestão de multimorbidade em atenção primária',
    'Prescrição racional de medicamentos antidiabéticos e cardiovasculares'
  ],
  doencasRelacionadas: ['diabetes-mellitus-2', 'hipertensao-arterial', 'dislipidemia'],
  medicamentosRelacionados: ['A10BA02', 'A10BH01', 'C10AA05', 'C09CA01'],
  calculadorasRelacionadas: ['imc', 'tfg', 'risco-cv-framingham'],
  referencias: ['ref-009', 'ref-010', 'ref-011', 'ref-012'],
  tags: ['diabetes tipo 2', 'multimorbidade', 'síndrome metabólica', 'atenção primária', 'risco cardiovascular']
};