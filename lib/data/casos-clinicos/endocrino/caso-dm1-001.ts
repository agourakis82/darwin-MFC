import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DM1_end_001: CasoClinico = {
  id: 'caso-diabetes-mellitus-1-001',
  titulo: 'Criança com poliúria, polidipsia e perda de peso inexplicada',
  subtitulo: 'Caso de suspeita de Diabetes Mellitus Tipo 1 em adolescente com história familiar',
  categoria: 'endocrino',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Ana Clara Silva',
      idade: 12,
      sexo: 'F',
      profissao: 'Estudante',
      estadoCivil: 'Solteira'
    },
    queixaPrincipal: 'Estou com muita sede e fazendo xixi o tempo todo, e emagreci sem motivo',
    historiaDoencaAtual: 'Paciente de 12 anos refere poliúria intensa há 2 semanas, com aumento da frequência urinária noturna, polidipsia associada e perda de 3 kg em um mês, apesar de apetite preservado. Relata fadiga e visão embaçada ocasional. Nega febre, vômitos ou diarreia. Irmão mais velho diagnosticado com DM1 aos 10 anos de idade. Sem comorbidades prévias.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A mãe confirma os sintomas e menciona que a paciente tem bebido até 4 litros de água por dia. O que deseja investigar?',
        dicas: ['Considere história familiar, hábitos alimentares e sintomas associados a desidratação']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de infecções urinárias recorrentes', correta: false },
          { id: 'b', texto: 'História familiar de DM1', correta: true },
          { id: 'c', texto: 'Prática de esportes intensos', correta: false },
          { id: 'd', texto: 'Vacinações recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História familiar de DM1 em parentes de primeiro grau aumenta o risco e indica necessidade de rastreamento [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história familiar é crucial para suspeita de DM1.',
        incorreto: 'Priorize fatores de risco genéticos e autoimunes no DM1.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa sinais de desidratação leve e perda de peso. Achados principais:',
        dados: {
          'Peso': '38 kg (percentil 25, perda de 3 kg recente)',
          'Estatura': '1,45 m',
          'IMC': '18,1 kg/m² (baixo para idade)',
          'PA': '100/60 mmHg',
          'FC': '102 bpm',
          'FR': '20 irpm',
          'Glicemia capilar': '312 mg/dL',
          'Sinais de desidratação': 'Mucosas secas, turgor cutâneo diminuído'
        },
        dicas: ['Atenção à glicemia elevada e taquicardia como sinais de hiperglicemia descompensada']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC baixo', correta: false },
          { id: 'b', texto: 'Glicemia capilar 312 mg/dL', correta: true },
          { id: 'c', texto: 'PA 100/60 mmHg', correta: false },
          { id: 'd', texto: 'FR 20 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia casual ≥ 200 mg/dL com sintomas clássicos sugere DM1, exigindo intervenção imediata [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames laboratoriais urgentes. Resultados:',
        dados: {
          'Glicemia de jejum': '285 mg/dL',
          'HbA1c': '9.1%',
          'Autoanticorpos (GAD)': 'Positivo (níveis elevados)',
          'Autoanticorpos (IA-2)': 'Positivo',
          'pH arterial': '7.28',
          'Bicarbonato': '18 mEq/L',
          'Cetonas urinárias': '+++',
          'Creatinina': '0.6 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hiperglicemia isolada sem complicações', correta: false },
          { id: 'b', texto: 'Cetoacidose diabética com DM1', correta: true },
          { id: 'c', texto: 'DM2 com acidose láctica', correta: false },
          { id: 'd', texto: 'Infecção urinária complicada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia ≥ 126 mg/dL, HbA1c ≥ 6.5% e autoanticorpos positivos confirmam DM1; acidose e cetonas indicam cetoacidose [1,2,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base nos dados, formule sua hipótese diagnóstica principal.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Diabetes Mellitus Tipo 1 com cetoacidose diabética', correta: true },
          { id: 'b', texto: 'Diabetes Mellitus Tipo 2', correta: false },
          { id: 'c', texto: 'Diabetes secundário a infecção', correta: false },
          { id: 'd', texto: 'Hiperglicemia transitória por estresse', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas clássicos, autoanticorpos e história familiar confirmam DM1; cetoacidose é complicação aguda comum no diagnóstico [1,2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'A paciente é internada para hidratação e insulinoterapia. Defina o plano inicial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Metformina oral isolada', correta: false },
          { id: 'b', texto: 'Insulina de ação rápida IV + hidratação', correta: true },
          { id: 'c', texto: 'Dieta hipoglicídica sem medicação', correta: false },
          { id: 'd', texto: 'Inibidores de SGLT2', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em DM1 com cetoacidose, insulinoterapia IV e correção de desidratação são essenciais [1,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Seguimento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após 48 horas, a paciente está estável, com glicemia controlada. Iniciada insulinoterapia subcutânea (basal-bolus). Retorna em 1 mês com HbA1c 7.2%, sem episódios de hipoglicemia.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter insulinoterapia e educação em autoglicemia, retorno em 3 meses', correta: true },
          { id: 'b', texto: 'Suspender insulina e iniciar metformina', correta: false },
          { id: 'c', texto: 'Encaminhar para transplante de pâncreas', correta: false },
          { id: 'd', texto: 'Rastreamento anual de complicações renais apenas', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'DM1 requer insulina vitalícia; educação e monitoramento periódico são fundamentais [1,2,3].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Adolescente de 12 anos com apresentação clássica de DM1 e cetoacidose, diagnosticada precocemente devido a sintomas e história familiar. Tratada com sucesso e orientada para manejo contínuo.',
    diagnosticoFinal: 'Diabetes Mellitus Tipo 1 (CID-11: CA23) com cetoacidose diabética',
    tratamentoRealizado: 'Hidratação IV, insulina regular IV inicial, seguida de regime basal-bolus subcutâneo (glargina + aspart). Educação diabetológica e acompanhamento multiprofissional.',
    evolucao: 'Alta hospitalar em 5 dias, com controle glicêmico adequado no seguimento ambulatorial. Sem complicações agudas.',
    licoesPrincipais: [
      'Sintomas clássicos (poliúria, polidipsia, perda de peso) em crianças com história familiar sugerem DM1 e requerem avaliação imediata [1,3].',
      'Dosagem de autoanticorpos (GAD, IA-2) confirma o componente autoimune do DM1 [1,2].',
      'Cetoacidose é a complicação aguda mais comum no diagnóstico de DM1 e exige hospitalização [3].',
      'Manejo do DM1 envolve insulinoterapia vitalícia e educação para prevenção de complicações [1,2].',
      'Rastreamento em familiares de primeiro grau pode identificar casos precoces [1,2].'
    ],
    errosComuns: [
      'Confundir DM1 com DM2 em crianças obesas, ignorando autoanticorpos [1,2].',
      'Atrasar diagnóstico em apresentações atípicas, levando a cetoacidose grave [3].',
      'Não educar sobre hipoglicemia no início do tratamento insulinotérpico [1].',
      'Subestimar a importância da história familiar no risco de DM1 [2].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e sinais de DM1 em crianças e adolescentes.',
    'Interpretar exames laboratoriais para diagnóstico de DM1 e suas complicações agudas.',
    'Planejar tratamento inicial e seguimento para pacientes com DM1.',
    'Aplicar diretrizes de rastreamento em grupos de alto risco [1,2,3].'
  ],
  competencias: [
    'Diagnóstico diferencial de hiperglicemia em pediatria',
    'Manejo de emergências endócrinas',
    'Educação em saúde para doenças crônicas'
  ],
  doencasRelacionadas: ['diabetes-mellitus-1'],
  medicamentosRelacionados: ['A10AE01', 'A10AE04', 'A10AD05'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-005'],
  tags: ['DM1', 'criancas_e_adolescentes', 'cetoacidose', 'insulinoterapia', 'rastreamento']
};