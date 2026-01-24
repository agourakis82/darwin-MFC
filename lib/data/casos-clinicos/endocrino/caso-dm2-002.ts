import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DM2_end_002: CasoClinico = {
  id: 'caso-diabetes-mellitus-2-com-complicacoes-001',
  titulo: 'Diabetes Mellitus Tipo 2 com Complicações Renais e Cardiovasculares',
  subtitulo: 'Paciente de 58 anos com fadiga, edema e dor torácica em contexto de hiperglicemia crônica',
  categoria: 'endocrino',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira Santos',
      idade: 58,
      sexo: 'F',
      profissao: 'Auxiliar de enfermagem',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou me sentindo muito cansada, com muita sede e inchaço nas pernas há semanas',
    historiaDoencaAtual: 'Paciente relata poliúria, polidipsia e fadiga progressiva nos últimos 6 meses, associada a ganho de peso e episódios de dor torácica em repouso. Negam febre ou perda de peso involuntária. História de hipertensão há 10 anos, tabagismo cessado há 5 anos (20 maços-ano). Usa losartana 50 mg/dia irregularmente. Sem acompanhamento prévio para diabetes.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona história familiar de diabetes na mãe e avó, sedentarismo, dieta rica em carboidratos e episódios recentes de infecções urinárias.',
        dicas: ['Investigue fatores de risco, hábitos e complicações microvasculares/macrovascular']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o raciocínio diferencial neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Sintomas sugestivos de neuropatia periférica (formigamento nos pés)', correta: true },
          { id: 'c', texto: 'Preferências alimentares', correta: false },
          { id: 'd', texto: 'Atividades de lazer', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas de neuropatia indicam complicações crônicas do DM2, comum em casos não controlados [9,10].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Identificar complicações precocemente é essencial.',
        incorreto: 'Priorize sintomas que sugiram complicações microvasculares.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa paciente obesa, com edema bilateral em membros inferiores (+++/4+), pulsos femorais presentes mas fracos, e fundoscopia revela microaneurismas retinianos.',
        dados: {
          'PA': '162/98 mmHg',
          'FC': '92 bpm',
          'FR': '18 irpm',
          'IMC': '32.5 kg/m²',
          'Glicemia capilar': '278 mg/dL',
          'Edema MMII': '+++/4+'
        },
        dicas: ['Atenção para sinais de nefropatia (edema) e retinopatia (fundoscopia)']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS indicativo de complicação microvascular?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada', correta: false },
          { id: 'b', texto: 'Edema em membros inferiores', correta: true },
          { id: 'c', texto: 'IMC 32.5 kg/m²', correta: false },
          { id: 'd', texto: 'Glicemia capilar 278 mg/dL', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Edema sugere nefropatia diabética, complicação comum em DM2 avançado [9,10].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Resultados laboratoriais revelam hiperglicemia confirmatória e evidências de dano renal e dislipidemia.',
        dados: {
          'Glicemia de jejum': '168 mg/dL',
          'HbA1c': '9.1%',
          'Creatinina sérica': '1.4 mg/dL',
          'TFGe (CKD-EPI)': '58 mL/min/1.73m²',
          'Relação albumina/creatinina urinária': '450 mg/g',
          'Colesterol total': '238 mg/dL',
          'LDL': '148 mg/dL',
          'HDL': '35 mg/dL',
          'Triglicerídeos': '285 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Qual a interpretação MAIS precisa destes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'DM2 sem complicações', correta: false },
          { id: 'b', texto: 'DM2 com nefropatia e dislipidemia', correta: true },
          { id: 'c', texto: 'Insuficiência renal aguda isolada', correta: false },
          { id: 'd', texto: 'Pré-diabetes com hipertireoidismo', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'HbA1c ≥6,5% confirma DM2; TFGe <60 e albuminúria indicam nefropatia estágio 3 [9,10,11].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integre os dados para formular o diagnóstico, considerando complicações associadas.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável e completo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'DM2 com síndrome metabólica e nefropatia diabética', correta: true },
          { id: 'b', texto: 'DM1 de início tardio com infecção urinária', correta: false },
          { id: 'c', texto: 'Hipertensão essencial com obesidade mórbida', correta: false },
          { id: 'd', texto: 'Diabetes gestacional residual', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Perfil clássico de DM2 complicado por síndrome metabólica (obesidade, HAS, dislipidemia) e nefropatia [9,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Elabore o plano inicial, priorizando controle glicêmico, renoproteção e risco CV.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Metformina isolada + mudanças no estilo de vida', correta: false },
          { id: 'b', texto: 'iSGLT2 + IECA + estatina', correta: true },
          { id: 'c', texto: 'Insulina basal + losartana', correta: false },
          { id: 'd', texto: 'Apenas dieta e exercício por 6 meses', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em DM2 com nefropatia e alto risco CV, iSGLT2 oferece renoproteção e benefício cardiovascular além do controle glicêmico [9,10,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, HbA1c 7.5%, TFGe 62 mL/min, PA 135/85 mmHg, perda de 3 kg, sem novos episódios de dor torácica.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS adequada no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter terapia, monitorar TFGe e HbA1c trimestralmente', correta: true },
          { id: 'b', texto: 'Suspender iSGLT2 por melhora', correta: false },
          { id: 'c', texto: 'Adicionar insulina por HbA1c >7%', correta: false },
          { id: 'd', texto: 'Encaminhar para diálise imediata', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora sugere resposta ao tratamento; manutenção com monitoramento é padrão para DM2 complicado [9,10].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de DM2 de longa data não diagnosticada, apresentando com complicações renais e risco CV elevado, respondendo bem a terapia multifatorial.',
    diagnosticoFinal: 'Diabetes Mellitus Tipo 2 com nefropatia diabética estágio 3A e síndrome metabólica',
    tratamentoRealizado: 'Iniciado dapagliflozina 10 mg/dia, enalapril 20 mg/dia, atorvastatina 40 mg/dia, metformina 1000 mg/dia BID, orientações para MEV e cessação tabágica.',
    evolucao: 'Após 3 meses, melhora glicêmica e renal, sem progressão de complicações; paciente adere ao tratamento e acompanhamento.',
    licoesPrincipais: [
      'Rastreamento precoce em adultos com fatores de risco previne complicações do DM2 [9,11].',
      'iSGLT2 são primeira linha em DM2 com doença renal ou CV, independentemente do HbA1c [10].',
      'Avaliação multifatorial (glicemia, PA, lipídios, função renal) é essencial no manejo [9].',
      'Educação em MEV reduz risco de progressão de complicações microvasculares [11].',
      'Monitoramento anual de TFGe e albuminúria detecta nefropatia diabética precocemente [10].'
    ],
    errosComuns: [
      'Ignorar complicações microvasculares em apresentações iniciais de DM2.',
      'Prescribir metformina em TFGe <45 mL/min sem ajuste.',
      'Subestimar risco CV em pacientes com DM2 e dislipidemia, atrasando estatina.',
      'Não integrar MEV como pilar terapêutico, focando apenas em fármacos.'
    ]
  },

  objetivosAprendizagem: [
    'Identificar e gerenciar complicações crônicas do DM2, como nefropatia e risco CV.',
    'Aplicar diretrizes para terapia farmacológica personalizada em DM2 avançado.',
    'Interpretar exames laboratoriais para estratificação de risco em pacientes diabéticos.',
    'Promover abordagem multifatorial no controle de doenças crônicas não transmissíveis.'
  ],
  competencias: [
    'Raciocínio clínico em endocrinologia',
    'Manejo de comorbidades em atenção primária',
    'Prescrição racional de medicamentos renoprotetores',
    'Educação em saúde para adesão terapêutica'
  ],
  doencasRelacionadas: ['diabetes-mellitus-2'],
  medicamentosRelacionados: ['A10BK03', 'C09AA02', 'C10AA05', 'A10BA02'],
  calculadorasRelacionadas: ['tfg-ckdepi', 'risco-cv-framingham'],
  referencias: ['ref-009', 'ref-010', 'ref-011'],
  tags: ['dm2', 'complicacoes', 'nefropatia-diabetica', 'sindrome-metabolica', 'risco-cv']
};