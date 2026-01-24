import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_CETOACIDOSE_end_001: CasoClinico = {
  id: 'caso-cetoacidose-diabetica-001',
  titulo: 'Cetoacidose Diabética em Apresentação Inicial de Diabetes Mellitus Tipo 1',
  subtitulo: 'Criança de 12 anos com poliúria, polidipsia e vômitos progressivos',
  categoria: 'endocrino',
  dificuldade: 'avancado',
  tempoEstimado: 30,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 12,
      sexo: 'F',
      profissao: 'Estudante',
      estadoCivil: 'Solteira'
    },
    queixaPrincipal: 'Estou com muita sede, faço xixi o tempo todo e agora estou vomitando',
    historiaDoencaAtual: 'Paciente de 12 anos, previamente hígida, refere início há 2 semanas de aumento da micção e sede intensa, com perda de 3 kg em curto período. Nos últimos 2 dias, evoluiu com náuseas, vômitos pós-prandiais e dor abdominal difusa. Nega febre, diarreia ou contato com doentes. História familiar positiva para diabetes mellitus tipo 1 em prima de primeiro grau.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente confirma poliúria noturna, polidipsia com ingestão de até 4L/dia e fadiga. Nega uso de medicamentos, mas menciona infecção urinária recente tratada empiricamente.',
        dicas: ['Investigue sintomas clássicos de hiperglicemia e gatilhos para DKA, como infecções [1,3]']
      },
      pergunta: {
        enunciado: 'Qual aspecto da anamnese é MAIS relevante para suspeitar de cetoacidose diabética?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Sintomas de poliúria, polidipsia e perda de peso', correta: true },
          { id: 'c', texto: 'Hábitos alimentares', correta: false },
          { id: 'd', texto: 'Vacinações em dia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Os sintomas clássicos de hiperglicemia (poliúria, polidipsia, perda de peso inexplicada) são indicativos de diabetes descompensado, podendo evoluir para DKA em DM1 [1,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Esses sintomas sugerem descompensação glicêmica aguda.',
        incorreto: 'Priorize os sintomas clássicos de diabetes para guiar o raciocínio.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, a paciente apresenta-se letárgica, com respiração profunda e rápida (Kussmaul), desidratada (olhos fundos, mucosa seca, turgor cutâneo diminuído).',
        dados: {
          'Peso': '38 kg (percentil 25)',
          'Estatura': '1,45 m',
          'IMC': '18,1 kg/m²',
          'PA': '100/60 mmHg',
          'FC': '120 bpm',
          'FR': '32 irpm',
          'Sat O2': '96% AA',
          'Temperatura': '37,2°C',
          'Glicemia capilar': '420 mg/dL'
        },
        dicas: ['Observe sinais de desidratação e respiração Kussmaul, clássicos de DKA [1,3]']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de cetoacidose diabética?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Taquicardia (FC 120 bpm)', correta: false },
          { id: 'b', texto: 'Respiração Kussmaul (FR 32 irpm)', correta: true },
          { id: 'c', texto: 'IMC baixo', correta: false },
          { id: 'd', texto: 'Pressão arterial normal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A respiração Kussmaul é um mecanismo compensatório para acidose metabólica na DKA, associada a hiperglicemia grave [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames laboratoriais urgentes. Resultados mostram hiperglicemia grave, acidose e cetonemia.',
        dados: {
          'Glicemia': '450 mg/dL',
          'pH venoso': '7,15',
          'HCO3-': '8 mEq/L',
          'Anion gap': '22 mEq/L',
          'Cetona sérica': 'Positiva (3+',
          'Sódio': '132 mEq/L',
          'Potássio': '5,2 mEq/L',
          'Ureia': '45 mg/dL',
          'Creatinina': '0,8 mg/dL',
          'Hemograma': 'Leucocitose 15.000/mm³',
          'Glicosúria/Cetonúria': '3+/3+'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta esses resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Acidose respiratória isolada', correta: false },
          { id: 'b', texto: 'Cetoacidose diabética moderada', correta: true },
          { id: 'c', texto: 'Insuficiência renal aguda', correta: false },
          { id: 'd', texto: 'Infecção bacteriana', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Critérios para DKA: glicemia >250 mg/dL, pH <7,3, HCO3 <18 mEq/L, cetonas positivas e anion gap elevado confirmam o diagnóstico [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando história, exame e exames, você formula o diagnóstico. Suspeita-se de DM1 de início com DKA, dado a idade e ausência de fatores de risco para DM2.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Diabetes mellitus tipo 2 descompensado', correta: false },
          { id: 'b', texto: 'Cetoacidose diabética em DM tipo 1 de apresentação', correta: true },
          { id: 'c', texto: 'Gastroenterite com desidratação', correta: false },
          { id: 'd', texto: 'Intoxicação por salicilatos', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em crianças e adolescentes, DKA é frequentemente a apresentação inicial de DM1, com componente autoimune [1,2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico Inicial',
      tipo: 'tratamento',
      conteudo: {
        texto: 'A paciente é internada em UTI pediátrica para manejo de DKA. Inicie reposição volêmica e insulina.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica INICIAL MAIS apropriada para DKA?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Insulina regular IV imediata sem fluidos', correta: false },
          { id: 'b', texto: 'Reposição volêmica com SF 0,9% (10-20 mL/kg/h) seguida de insulina IV', correta: true },
          { id: 'c', texto: 'Bicarbonato IV para corrigir acidose', correta: false },
          { id: 'd', texto: 'Metformina oral', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O manejo de DKA inicia com reidratação agressiva para corrigir desidratação (10-15% do peso), seguida de insulina IV após hora inicial de fluidos, monitorando potássio [1,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento e Seguimento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após 12 horas de tratamento, pH 7,35, HCO3 18 mEq/L, glicemia 180 mg/dL. Transição para insulina subcutânea e educação diabetológica. Em 48h, alta para enfermaria.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento imediato?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Continuar insulina IV indefinidamente', correta: false },
          { id: 'b', texto: 'Transição para insulina SC, educação e alta em 3-5 dias', correta: true },
          { id: 'c', texto: 'Suspender tratamento e observar', correta: false },
          { id: 'd', texto: 'Encaminhar para transplante pancreático', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Resolução de DKA permite transição para terapia insulínica basal-bolus, com ênfase em educação para prevenção de recorrências [1,2,3].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Criança de 12 anos apresentou DKA como manifestação inicial de DM1, com resolução após manejo em UTI e transição para tratamento ambulatorial.',
    diagnosticoFinal: 'Cetoacidose diabética em diabetes mellitus tipo 1 autoimune',
    tratamentoRealizado: 'Reposição volêmica com SF 0,9%, insulina regular IV (0,1 U/kg/h), correção de eletrólitos, antibiótico profilático se infecção, seguida de insulina SC (basal-bolus) e educação diabetológica.',
    evolucao: 'Melhora rápida com resolução da acidose em 24h; alta hospitalar em 5 dias com HbA1c 9,5%, autoanticorpos positivos (GAD+). Acompanhamento em ambulatório de endocrinologia pediátrica.',
    licoesPrincipais: [
      'Reconhecer sintomas clássicos de DM1 e DKA para diagnóstico precoce, evitando complicações como edema cerebral [1,3]',
      'Manejo inicial de DKA prioriza reidratação e insulina IV, com monitoramento rigoroso de glicemia e potássio [1,3]',
      'Rastreamento em familiares de alto risco com autoanticorpos pode retardar progressão, mas foco no SUS é diagnóstico sintomático [2,3]',
      'Educação contínua é essencial para adesão ao tratamento e prevenção de recorrências em DM1 [1,2]',
      'Epidemiologia no Brasil: incidência de DM1 em crianças é 8-12/100.000/ano, com DKA em 15-70% das apresentações iniciais [2,6]'
    ],
    errosComuns: [
      'Iniciar insulina sem reidratação inicial, podendo precipitar hipocalemia ou choque [1,3]',
      'Subestimar DKA em crianças sem história prévia de DM, atrasando diagnóstico [1,2]',
      'Não dosar autoanticorpos para confirmação de DM1, levando a confusão com DM2 [1,2]',
      'Ignorar gatilhos infecciosos, como ITU, que precipitam DKA em 30-40% dos casos [3]'
    ]
  },

  objetivosAprendizagem: [
    'Identificar e diagnosticar cetoacidose diabética como complicação aguda de DM1',
    'Aplicar protocolo de manejo inicial de DKA em ambiente pediátrico',
    'Compreender o papel do rastreamento e detecção precoce de DM1 no contexto brasileiro [1,2,3]',
    'Discutir prevenção de recorrências e educação do paciente com DM1'
  ],
  competencias: [
    'Raciocínio clínico em emergências endócrinas',
    'Manejo de acidose metabólica e desequilíbrios eletrolíticos',
    'Educação em saúde para doenças crônicas'
  ],
  doencasRelacionadas: ['diabetes-mellitus-1'],
  medicamentosRelacionados: ['A10AE01', 'A10AE04'],
  calculadorasRelacionadas: ['anion-gap', 'correcao-glicemia'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-005', 'ref-006'],
  tags: ['DKA', 'DM1', 'criancas', 'emergencia', 'acidose', 'insulina']
};