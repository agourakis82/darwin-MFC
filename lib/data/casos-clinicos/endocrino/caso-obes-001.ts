import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_OBES_end_001: CasoClinico = {
  id: 'caso-obesidade-001',
  titulo: 'Paciente com Obesidade Grau III e Fadiga Crônica',
  subtitulo: 'Mulher de meia-idade com ganho de peso progressivo e comorbidades associadas',
  categoria: 'endocrino',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 55,
      sexo: 'F',
      profissao: 'Auxiliar de serviços gerais',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou sempre cansada e não consigo perder peso, mesmo tentando',
    historiaDoencaAtual: 'Paciente relata ganho de peso progressivo nos últimos 5 anos, associado a sedentarismo e dieta rica em carboidratos. Apresenta fadiga diurna, roncos noturnos e episódios de dispneia ao esforço. Nega febre, perda de peso involuntária ou sintomas gastrointestinais. Antecedente de hipertensão há 3 anos, em uso irregular de medicação. IMC prévio estimado em 35 kg/m², evoluindo para valores mais elevados.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a anamnese para entender os fatores contribuintes. O que deseja investigar?',
        dicas: ['Considere hábitos alimentares, atividade física e história familiar de comorbidades metabólicas']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Padrão alimentar e atividade física', correta: true },
          { id: 'c', texto: 'História familiar de câncer', correta: false },
          { id: 'd', texto: 'Uso de tabaco', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Avaliação de hábitos de vida é essencial para manejo inicial da obesidade [11,12].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Hábitos alimentares e sedentarismo são pilares no rastreamento da obesidade.',
        incorreto: 'Priorize fatores modificáveis como dieta e exercício para intervenções iniciais.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'No exame físico, você observa paciente com aparência pleórica, sem sinais de desnutrição. Achados principais:',
        dados: {
          'PA': '148/92 mmHg',
          'FC': '82 bpm',
          'IMC': '42.5 kg/m²',
          'Circunferência abdominal': '108 cm',
          'Edema': 'Ausente'
        },
        dicas: ['Note o IMC >40 indicando obesidade grau III e circunferência abdominal elevada sugerindo risco metabólico']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 148/92 mmHg', correta: false },
          { id: 'b', texto: 'IMC 42.5 kg/m²', correta: true },
          { id: 'c', texto: 'FC 82 bpm', correta: false },
          { id: 'd', texto: 'Circunferência abdominal 108 cm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'IMC ≥40 kg/m² define obesidade grau III, associada a alto risco de comorbidades [11,12].',
        pontos: 15
      },
      feedback: {
        correto: 'Excelente! Obesidade grau III requer manejo integrado e urgente.',
        incorreto: 'O IMC elevado é o marcador principal de risco na obesidade clínica.'
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para avaliação metabólica. Resultados:',
        dados: {
          'Glicemia de jejum': '132 mg/dL',
          'HbA1c': '6.8%',
          'Colesterol total': '238 mg/dL',
          'LDL': '148 mg/dL',
          'HDL': '35 mg/dL',
          'Triglicerídeos': '245 mg/dL',
          'ALT': '45 U/L',
          'TFGe': '78 mL/min/1.73m²'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Perfil lipídico normal', correta: false },
          { id: 'b', texto: 'Dislipidemia mista com pré-diabetes', correta: true },
          { id: 'c', texto: 'Insuficiência renal crônica', correta: false },
          { id: 'd', texto: 'Apenas elevação isolada de ALT', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia 100-125 mg/dL e HbA1c 5.7-6.4% indicam pré-diabetes; perfil lipídico sugere síndrome metabólica [11,12].',
        pontos: 15
      },
      feedback: {
        correto: 'Perfeito! Esses achados reforçam a necessidade de rastreamento de comorbidades na obesidade.',
        incorreto: 'Interprete o conjunto: dislipidemia e glicemia alterada são comuns na obesidade grau III.'
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
          { id: 'a', texto: 'Obesidade grau III com síndrome metabólica', correta: true },
          { id: 'b', texto: 'Hipotireoidismo primário', correta: false },
          { id: 'c', texto: 'Obesidade por Cushing', correta: false },
          { id: 'd', texto: 'Síndrome dos ovários policísticos', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Combinação de IMC ≥40, hipertensão, dislipidemia e pré-diabetes define síndrome metabólica associada à obesidade [11,12].',
        pontos: 20
      },
      feedback: {
        correto: 'Correto! Diagnóstico de obesidade clínica com comorbidades metabólicas.',
        incorreto: 'Exclua causas secundárias após avaliação inicial; foque no perfil multifatorial.'
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Elabore o plano inicial, priorizando mudanças de estilo de vida e manejo de comorbidades.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação dietética por 6 meses', correta: false },
          { id: 'b', texto: 'Estatinas + metformina + orientação multiprofissional', correta: true },
          { id: 'c', texto: 'Cirurgia bariátrica imediata', correta: false },
          { id: 'd', texto: 'Liraglutida isolada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Para obesidade grau III com comorbidades, inicie lifestyle + farmacoterapia para dislipidemia e pré-diabetes; liraglutida se falha em mudanças [12,14].',
        pontos: 20
      },
      feedback: {
        correto: 'Ótimo! Abordagem integrada é chave no SUS e guidelines [13,14].',
        incorreto: 'Não adie farmacoterapia em casos de alto risco; combine com não farmacológico.'
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, paciente retorna: perda de 3 kg, PA 135/85 mmHg, HbA1c 6.4%, aderência parcial à dieta.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Reforçar adesão e reavaliar em 3 meses', correta: true },
          { id: 'b', texto: 'Iniciar liraglutida imediatamente', correta: false },
          { id: 'c', texto: 'Encaminhar para cirurgia', correta: false },
          { id: 'd', texto: 'Suspender estatinas', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Monitoramento a cada 3-6 meses durante tratamento; farmacoterapia adicional se platô após lifestyle [12,13].',
        pontos: 10
      },
      feedback: {
        correto: 'Adequado! Progresso inicial justifica continuidade do plano.',
        incorreto: 'Mantenha reavaliação periódica para ajustes baseados em evidências.'
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com obesidade grau III diagnosticada com síndrome metabólica, submetida a manejo multiprofissional com melhora gradual.',
    diagnosticoFinal: 'Obesidade grau III (IMC 42.5 kg/m²) associada a síndrome metabólica',
    tratamentoRealizado: 'Orientações dietéticas e de atividade física, estatina para dislipidemia, metformina para pré-diabetes, acompanhamento em equipe multiprofissional',
    evolucao: 'Após 6 meses, perda de 6 kg, normalização parcial de perfil lipídico e glicêmico, sem complicações',
    licoesPrincipais: [
      'Rastreie obesidade por IMC e circunferência abdominal em adultos anualmente [11,12]',
      'Manejo inicial foca em mudanças de estilo de vida; farmacoterapia para grau III com comorbidades [12,14]',
      'Síndrome metabólica aumenta risco cardiovascular, exigindo abordagem integrada [11]',
      'No Brasil, priorize estratégias SUS para cuidado crônico da obesidade [13]',
      'Reavalie a cada 3-6 meses para monitorar adesão e eficácia [12,13]'
    ],
    errosComuns: [
      'Subestimar impacto de comorbidades metabólicas na obesidade, atrasando intervenção [11]',
      'Prescrever farmacoterapia sem tentativa inicial de lifestyle modifications [12]',
      'Ignorar rastreamento anual em atenção primária, perdendo oportunidades preventivas [13]',
      'Não considerar liraglutida apenas após falha em mudanças não farmacológicas [14]'
    ]
  },

  objetivosAprendizagem: [
    'Compreender o rastreamento e classificação da obesidade em atenção primária',
    'Identificar comorbidades associadas à obesidade grau III, como síndrome metabólica',
    'Aplicar diretrizes para manejo inicial, incluindo lifestyle e farmacoterapia',
    'Planejar acompanhamento periódico para doenças crônicas como a obesidade'
  ],
  competencias: [
    'Avaliação antropométrica e cálculo de IMC',
    'Rastreamento de fatores de risco metabólicos',
    'Prescrição de intervenções não farmacológicas e farmacológicas na obesidade',
    'Acompanhamento longitudinal de pacientes com DCNT'
  ],
  doencasRelacionadas: ['obesidade'],
  medicamentosRelacionados: ['A10AE05'],
  calculadorasRelacionadas: ['IMC'],
  referencias: ['ref-011', 'ref-012', 'ref-013', 'ref-014'],
  tags: ['obesidade', 'síndrome metabólica', 'rastreamento', 'manejo crônico']
};