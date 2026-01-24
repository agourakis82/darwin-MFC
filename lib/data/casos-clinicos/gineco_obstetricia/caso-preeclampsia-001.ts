import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_PREECLAMPSIA_gin_001: CasoClinico = {
  id: 'caso-pre-eclampsia-001',
  titulo: 'Pré-eclâmpsia grave em gestante de alto risco',
  subtitulo: 'Gestante de 28 anos com hipertensão e proteinúria após 20 semanas',
  categoria: 'gineco_obstetricia',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Santos',
      idade: 28,
      sexo: 'F',
      profissao: 'Auxiliar de enfermagem',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou com dor de cabeça forte, visão embaçada e inchaço nas pernas há dois dias',
    historiaDoencaAtual: 'Paciente G2P1, gestação atual de 34 semanas, primigesta anterior sem complicações. Relata início de hipertensão há 1 semana, com PA em casa acima de 140/90 mmHg. Edema progressivo em membros inferiores e face. Cefaleia intensa, episódios de visão turva e epigastralgia. Nega sangramento vaginal ou contrações. Antecedente de obesidade pré-gestacional (IMC 32 kg/m²) e história familiar de hipertensão. Em uso de aspirina 100 mg/dia iniciada às 12 semanas por risco alto.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona ganho de peso excessivo na gestação e multiparidade de risco. O que deseja investigar?',
        dicas: ['Fatores de risco como obesidade, história prévia e multiparidade; hábitos alimentares e medicamentos']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para estratificação de risco neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Fatores de risco para pré-eclâmpsia (obesidade, história familiar)', correta: true },
          { id: 'c', texto: 'Atividade física pré-gestacional', correta: false },
          { id: 'd', texto: 'Dieta vegetariana', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Fatores de risco como obesidade e história familiar aumentam a probabilidade de pré-eclâmpsia [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Identificar riscos permite prevenção e manejo precoce.',
        incorreto: 'Priorize fatores de risco hipertensivos na gestação.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa hipertensão, edema e hiperreflexia. Achados principais:',
        dados: {
          'PA': '160/105 mmHg',
          'FC': '92 bpm',
          'FR': '18 irpm',
          'Peso': '85 kg',
          'Altura': '1,60 m',
          'IMC': '33.2 kg/m²',
          'Edema': '3+ em membros inferiores e mãos',
          'Reflexos': 'Hiperreflexia 3+/4'
        },
        dicas: ['Hipertensão grave ≥160/110 mmHg e edema sugerem pré-eclâmpsia; avalie sinais de HELLP']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS preocupante e indica urgência?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC 33.2 kg/m²', correta: false },
          { id: 'b', texto: 'PA 160/105 mmHg com hiperreflexia', correta: true },
          { id: 'c', texto: 'FC 92 bpm', correta: false },
          { id: 'd', texto: 'Edema 3+ isolado', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'PA ≥160/110 mmHg após 20 semanas com sintomas neurológicos sugere pré-eclâmpsia grave [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames laboratoriais e de urina. Resultados chegam:',
        dados: {
          'Proteinúria (relação proteína/creatinina)': '0.45 mg/mg',
          'Creatinina sérica': '0.9 mg/dL',
          'Plaquetas': '120.000/mm³',
          'AST/ALT': '45/38 U/L',
          'LDH': '350 U/L',
          'Hemoglobina': '11.2 g/dL',
          'Urina tipo I': 'Proteinúria 2+'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção urinária isolada', correta: false },
          { id: 'b', texto: 'Disfunção orgânica com proteinúria e trombocitopenia incipiente', correta: true },
          { id: 'c', texto: 'Anemia por deficiência de ferro', correta: false },
          { id: 'd', texto: 'Apenas elevação enzimática hepática', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Proteinúria >0.3 e plaquetas <150.000 indicam pré-eclâmpsia com disfunção orgânica [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e exames, formule sua hipótese diagnóstica principal.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável com base nos dados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipertensão gestacional benigna', correta: false },
          { id: 'b', texto: 'Pré-eclâmpsia grave', correta: true },
          { id: 'c', texto: 'Síndrome HELLP isolada', correta: false },
          { id: 'd', texto: 'Eclâmpsia iminente sem proteinúria', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hipertensão após 20 semanas + proteinúria + disfunção orgânica (trombocitopenia, enzimas hepáticas) confirmam pré-eclâmpsia grave [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Com diagnóstico de pré-eclâmpsia grave, defina o manejo inicial, considerando internação e preparo para parto.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas repouso e monitorização ambulatorial', correta: false },
          { id: 'b', texto: 'Internação, sulfato de magnésio IV e anti-hipertensivos (labetalol ou nifedipino)', correta: true },
          { id: 'c', texto: 'Indução do parto imediato sem profilaxia convulsiva', correta: false },
          { id: 'd', texto: 'Aspirina em dose alta para prevenção', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em pré-eclâmpsia grave ≥34 semanas, internação com MgSO4 para prevenção de eclâmpsia e controle pressórico é essencial; parto é definitivo [1,2,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após 48 horas de tratamento, PA controlada em 140/90 mmHg, sem crises convulsivas. Parto cesáreo realizado com sucesso. Pós-parto: plaquetas normalizam, proteinúria resolve em 1 semana.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento pós-parto?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alta hospitalar em 72h com monitorização PA e aconselhamento pré-concepcional', correta: true },
          { id: 'b', texto: 'Manter sulfato de magnésio por 2 semanas', correta: false },
          { id: 'c', texto: 'Suspender todos os medicamentos imediatamente', correta: false },
          { id: 'd', texto: 'Encaminhar para avaliação cardiológica urgente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resolução pós-parto é esperada; risco persistente de hipertensão crônica requer seguimento a longo prazo [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Gestante de 28 anos com pré-eclâmpsia grave diagnosticada em 34 semanas, manejada com internação, anti-hipertensivos e sulfato de magnésio, evoluindo para parto cesáreo sem complicações maternas ou fetais.',
    diagnosticoFinal: 'Pré-eclâmpsia grave (CID-11: CA23)',
    tratamentoRealizado: 'Internação, labetalol IV 20 mg, sulfato de magnésio IV carga 4g seguida de manutenção 1g/h, monitorização fetal contínua, cesárea eletiva.',
    evolucao: 'Pós-parto: PA normalizada, proteinúria resolvida em 7 dias, alta em 5 dias. Acompanhamento ambulatorial com resolução completa.',
    licoesPrincipais: [
      'Rastreie PA em todas as consultas pré-natais para gestantes de alto risco [1,4].',
      'Inicie aspirina baixa dose <16 semanas em alto risco para prevenção [8].',
      'Pré-eclâmpsia grave requer internação e profilaxia com MgSO4 para evitar eclâmpsia [1,2].',
      'Parto é o tratamento definitivo após 34 semanas [1,2].',
      'Seguimento pós-parto é crucial devido ao risco de hipertensão crônica [1].'
    ],
    errosComuns: [
      'Subestimar fatores de risco, atrasando prevenção com aspirina [8].',
      'Não reconhecer sinais de gravidade (PA ≥160/110, cefaleia), levando a eclâmpsia [1,2].',
      'Manejo ambulatorial em casos graves, aumentando morbimortalidade [1].',
      'Suspender monitorização pós-parto precocemente, ignorando recorrência em gestações futuras [1,3].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e diagnosticar pré-eclâmpsia com base em critérios ACOG/ISSHP [1,2].',
    'Aplicar medidas preventivas como aspirina em gestantes de alto risco [8].',
    'Gerenciar pré-eclâmpsia grave com anti-hipertensivos e profilaxia convulsiva [1,2,4].',
    'Planejar seguimento pós-parto para prevenção de complicações crônicas [1].'
  ],
  competencias: [
    'Avaliação e manejo de complicações hipertensivas na gravidez',
    'Raciocínio diagnóstico em ginecologia e obstetrícia',
    'Prescrição de medicamentos na gestação (ex.: anti-hipertensivos, aspirina)',
    'Aconselhamento pré e pós-natal'
  ],
  doencasRelacionadas: ['pre-eclampsia'],
  medicamentosRelacionados: ['B01AC06'], // Aspirina
  calculadorasRelacionadas: [], // Nenhuma específica
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-008'],
  tags: ['gestacao', 'hipertensao', 'pre-eclampsia', 'obstetricia', 'risco-materno']
};