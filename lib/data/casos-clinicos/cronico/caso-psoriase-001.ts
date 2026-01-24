import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_PSORIASE_cro_001: CasoClinico = {
  id: 'caso-psoriase-001',
  titulo: 'Psoríase Vulgar em Paciente Adulta',
  subtitulo: 'Mulher de 45 anos com lesões cutâneas crônicas e prurido intenso',
  categoria: 'cronico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 45,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Tenho manchas vermelhas e escamosas na pele que coçam muito há meses',
    historiaDoencaAtual: 'Paciente relata aparecimento de lesões eritematoescamosas há 6 meses, iniciando nos cotovelos e joelhos, com progressão para tronco e couro cabeludo. Prurido moderado a intenso, pior à noite. Nega artralgias ou febre. História familiar positiva para dermatopatias. Usa hidratantes sem melhora. Sem comorbidades conhecidas, mas refere ganho de peso recente.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O que deseja investigar?',
        dicas: ['Considere história familiar, hábitos e medicamentos, pois podem influenciar o quadro psoriásico [1]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'História familiar de psoríase', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'Dieta alimentar detalhada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A psoríase tem forte componente genético, com história familiar em até 30% dos casos [1].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história familiar é um fator de risco chave para psoríase.',
        incorreto: 'Priorize fatores genéticos e desencadeantes na anamnese de psoríase.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa lesões eritematoescamosas bem delimitadas nos cotovelos, joelhos e couro cabeludo, com sinal de Auspitz positivo em algumas placas.',
        dados: {
          'PA': '130/85 mmHg',
          'FC': '80 bpm',
          'IMC': '28.5 kg/m²',
          'Escala PASI inicial': '15% (moderada)'
        },
        dicas: ['Avalie a extensão e gravidade das lesões; note associação com sobrepeso [1]']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de psoríase?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 130/85 mmHg', correta: false },
          { id: 'b', texto: 'Placas eritematoescamosas com sinal de Auspitz', correta: true },
          { id: 'c', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 80 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O sinal de Auspitz (punctiforme sangramento ao remover escamas) é clássico da psoríase [1].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para avaliar comorbidades associadas. Resultados:',
        dados: {
          'Glicemia de jejum': '110 mg/dL',
          'Colesterol total': '220 mg/dL',
          'LDL': '140 mg/dL',
          'HDL': '40 mg/dL',
          'Triglicerídeos': '180 mg/dL',
          'PCR': '5 mg/L (elevada)'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados no contexto da psoríase?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Exames normais, sem relevância', correta: false },
          { id: 'b', texto: 'Dislipidemia e inflamação subclínica, comuns em psoríase', correta: true },
          { id: 'c', texto: 'Apenas pré-diabetes isolado', correta: false },
          { id: 'd', texto: 'Infecção aguda', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Psoríase aumenta risco de síndrome metabólica, com dislipidemia em até 40% dos casos [1].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Psoríase vulgar moderada com comorbidades metabólicas', correta: true },
          { id: 'b', texto: 'Dermatite atópica', correta: false },
          { id: 'c', texto: 'Eczema de contato', correta: false },
          { id: 'd', texto: 'Lúpus eritematoso cutâneo', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Lesões típicas, história familiar e PASI 15% confirmam psoríase moderada [1].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento escalonado.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada para psoríase moderada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas fototerapia sem tópicos', correta: false },
          { id: 'b', texto: 'Corticoides tópicos + análogos de vitamina D', correta: true },
          { id: 'c', texto: 'Imediato uso de biológicos', correta: false },
          { id: 'd', texto: 'Apenas anti-histamínicos para prurido', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Consenso brasileiro recomenda tratamento tópico inicial para psoríase moderada [1].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses. PASI reduzido para 5%, sem novos surtos, mas persiste prurido leve. Peso reduzido em 2 kg com orientação.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento tópico e reavaliar em 3-6 meses', correta: true },
          { id: 'b', texto: 'Escalonar para sistêmico imediatamente', correta: false },
          { id: 'c', texto: 'Suspender todo tratamento', correta: false },
          { id: 'd', texto: 'Encaminhar para reumatologia sem artrite', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resposta parcial permite manutenção e monitoramento trimestral [1].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de psoríase vulgar moderada em mulher de 45 anos, com lesões cutâneas clássicas e comorbidades metabólicas iniciais. Tratamento tópico levou a melhora significativa.',
    diagnosticoFinal: 'Psoríase vulgar (CID-11: CA23) moderada',
    tratamentoRealizado: 'Corticoides tópicos (betametasona) + calcipotriol, emolientes e orientação sobre estilo de vida. Monitoramento de comorbidades.',
    evolucao: 'Melhora clínica com redução de PASI de 15% para 5% em 3 meses. Sem progressão para formas graves.',
    licoesPrincipais: [
      'A psoríase é diagnosticada clinicamente por placas eritematoescamosas; biópsia é rara [1].',
      'Avalie comorbidades como síndrome metabólica, comum em 30-50% dos pacientes [1].',
      'Tratamento escalonado inicia com tópicos para casos moderados, conforme consenso brasileiro [1].',
      'História familiar é fator de risco chave, guiando o raciocínio diagnóstico [1].',
      'Biossimilares podem ser considerados em casos refratários para otimizar custos [2].'
    ],
    errosComuns: [
      'Confundir com dermatite atópica, ignorando distribuição típica (cotovelos/joelhos) [1].',
      'Subestimar comorbidades cardiovasculares, sem solicitar perfil lipídico [1].',
      'Iniciar biológicos precocemente sem tentativa de terapias tópicas [1].',
      'Não educar sobre desencadeantes como estresse e infecções [1].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais clínicos e diagnóstico diferencial da psoríase.',
    'Avaliar gravidade com escala PASI e comorbidades associadas.',
    'Aplicar tratamento escalonado conforme guidelines brasileiros.',
    'Planejar acompanhamento para doenças dermatológicas crônicas.'
  ],
  competencias: [
    'Exame dermatológico sistemático',
    'Raciocínio clínico em dermatologia',
    'Manejo de condições inflamatórias crônicas',
    'Educação em saúde para adesão terapêutica'
  ],
  doencasRelacionadas: ['psoriase'],
  medicamentosRelacionados: ['D05AA', 'D05AC', 'L04AC12', 'L04AX07', 'D11AH02'],
  calculadorasRelacionadas: ['PASI'],
  referencias: [
    '[1] Brazilian Society of Dermatology. Highlights of the Brazilian Society of Dermatology\'s Brazilian Consensus on Psoriasis. An Bras Dermatol. 2025.',
    '[2] Portuguese Group on Biosimilars in Dermatology. Portuguese Position Paper on the Use of Biosimilars in Psoriasis. Acta Med Port. 2016.'
  ],
  tags: ['dermatologia', 'psoriase', 'doencas-cronicas', 'inflamatoria']
};