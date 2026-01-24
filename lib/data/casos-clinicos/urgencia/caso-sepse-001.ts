import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_SEPSE_urg_001: CasoClinico = {
  id: 'caso-sepse-001',
  titulo: 'Sepse por Pneumonia Adquirida na Comunidade',
  subtitulo: 'Paciente idosa com quadro respiratório agudo evoluindo para sepse',
  categoria: 'urgencia',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 68,
      sexo: 'F',
      profissao: 'Aposentada',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Estou com febre alta e falta de ar há três dias',
    historiaDoencaAtual: 'Paciente refere início há 72 horas com febre intermitente (até 39°C), tosse produtiva com expectoração amarelada e dispneia progressiva. Negou viagens recentes ou contato com doentes, mas menciona piora nos últimos 24 horas com fraqueza e confusão mental leve. Antecedentes: hipertensão arterial controlada com losartana 50 mg/dia, tabagismo crônico (20 maços-ano, ex-fumante há 5 anos) e diabetes tipo 2 diagnosticado há 10 anos, irregular no acompanhamento.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente confirma febre, calafrios e tosse com expectoração purulenta. Relata uso irregular de metformina para diabetes e não vacinada contra influenza recentemente.',
        dicas: ['Investigue comorbidades, hábitos e fatores de risco para infecção grave [1,2].']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para estratificar o risco de gravidade?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens internacionais', correta: false },
          { id: 'b', texto: 'Comorbidades como diabetes e tabagismo', correta: true },
          { id: 'c', texto: 'Dieta alimentar habitual', correta: false },
          { id: 'd', texto: 'Atividade física recente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Comorbidades como diabetes e tabagismo aumentam o risco de pneumonia grave e sepse [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Comorbidades são fatores de risco chave para complicações.',
        incorreto: 'Priorize fatores que impactam a gravidade da infecção.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa febre, taquipneia e sinais de hipoperfusão. Dados vitais:',
        dados: {
          'PA': '90/60 mmHg',
          'FC': '110 bpm',
          'FR': '28 irpm',
          'SatO2': '88% em ar ambiente',
          'Temperatura': '38.5°C',
          'qSOFA': '2 pontos (alteração mental e FR >22)'
        },
        dicas: ['Avalie critérios de sepse como qSOFA e sinais de choque [1,2].']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS indicativo de sepse?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Febre isolada', correta: false },
          { id: 'b', texto: 'Hipotensão e taquicardia com qSOFA ≥2', correta: true },
          { id: 'c', texto: 'Tosse produtiva', correta: false },
          { id: 'd', texto: 'Idade avançada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'qSOFA ≥2 sugere alto risco de mortalidade por sepse em ambiente de urgência [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados laboratoriais e de imagem:',
        dados: {
          'Leucócitos': '18.000/mm³ (neutrofilia)',
          'PCR': '150 mg/L',
          'Lactato': '3.5 mmol/L',
          'Gasometria': 'pH 7.32, pCO2 32 mmHg, HCO3 18 mEq/L',
          'Radiografia de tórax': 'Infiltrado lobar direito sugestivo de pneumonia',
          'Ureia': '45 mg/dL',
          'Creatinina': '1.5 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados no contexto de sepse?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção viral isolada', correta: false },
          { id: 'b', texto: 'Sepse com disfunção orgânica (lactato elevado e acidose)', correta: true },
          { id: 'c', texto: 'Apenas descompensação diabética', correta: false },
          { id: 'd', texto: 'Insuficiência renal crônica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Lactato >2 mmol/L e acidose indicam sepse com hipoperfusão tecidual [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pneumonia comunitária sem complicações', correta: false },
          { id: 'b', texto: 'Sepse por pneumonia adquirida na comunidade', correta: true },
          { id: 'c', texto: 'Exacerbação de DPOC', correta: false },
          { id: 'd', texto: 'Infarto agudo do miocárdio', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas respiratórios + critérios de sepse (SIRS/qSOFA) + infiltrado radiológico confirmam o quadro [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico Inicial',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Inicie o manejo de sepse conforme bundle de hora-1.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas observação e analgésicos', correta: false },
          { id: 'b', texto: 'Hidratação oral e antibiótico ambulatorial', correta: false },
          { id: 'c', texto: 'Reposição volêmica IV, antibióticos de amplo espectro e oxigênio', correta: true },
          { id: 'd', texto: 'Corticoides isolados', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Bundle de sepse inclui fluidos (30 mL/kg), antibióticos em 1h e suporte ventilatório [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento e Evolução',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após 6 horas de tratamento IV (cristaloides 2L, ceftriaxona + azitromicina, O2), a paciente melhora: PA 110/70, FC 95, lactato 1.8. Admitida em enfermaria.'
      },
      pergunta: {
        enunciado: 'Qual a conduta de seguimento apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alta hospitalar imediata', correta: false },
          { id: 'b', texto: 'Monitoramento em UTI por 48h', correta: false },
          { id: 'c', texto: 'Internação em enfermaria com reavaliação em 24h', correta: true },
          { id: 'd', texto: 'Mudança para antibióticos orais agora', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Melhora inicial permite enfermaria, mas requer monitoramento para recidiva [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 68 anos com pneumonia comunitária evoluiu para sepse, tratada com sucesso inicial com bundle de sepse, evoluindo para recuperação.',
    diagnosticoFinal: 'Sepse por pneumonia adquirida na comunidade (CID-11: CA23)',
    tratamentoRealizado: 'Reposição volêmica IV, ceftriaxona 2g/dia + azitromicina 500mg/dia, oxigênio suplementar, suporte glicêmico e internação.',
    evolucao: 'Melhora hemodinâmica em 6h, alta em 7 dias sem sequelas, com orientação para vacinação e controle de comorbidades.',
    licoesPrincipais: [
      'Reconheça precocemente sinais de sepse (qSOFA ≥2) em pacientes com infecções respiratórias [1,2].',
      'Aplique o bundle de hora-1: fluidos, antibióticos e culturas [1,2].',
      'Comorbidades como diabetes aumentam risco de gravidade em pneumonia [1,2].',
      'Use CURB-65 para estratificar pneumonia e guiar internação [1,2].',
      'Vacinação antipneumocócica e influenza previne casos graves [3,4].'
    ],
    errosComuns: [
      'Subestimar gravidade em idosos com comorbidades, atrasando tratamento [1].',
      'Iniciar antibióticos sem cobertura para atípicos em pneumonia comunitária [2].',
      'Ignorar lactato sérico como marcador de hipoperfusão em sepse [1].',
      'Não estratificar risco com ferramentas como qSOFA ou CURB-65 [1,2].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar critérios diagnósticos de sepse em contexto de urgência respiratória.',
    'Aplicar o manejo inicial da sepse conforme diretrizes internacionais e SUS.',
    'Estratificar gravidade de pneumonia comunitária e suas complicações.',
    'Reconhecer impacto de comorbidades no prognóstico de infecções agudas.'
  ],
  competencias: [
    'Avaliação inicial em urgência',
    'Manejo de sepse e choque',
    'Prescrição de antimicrobianos empíricos',
    'Estratificação de risco em doenças infecciosas'
  ],
  doencasRelacionadas: ['pneumonia-comunitaria'],
  medicamentosRelacionados: ['J01CA04', 'J01FA10'],
  calculadorasRelacionadas: ['qSOFA', 'CURB-65'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004'],
  tags: ['sepse', 'pneumonia', 'urgencia', 'infecções respiratórias', 'idosos']
};