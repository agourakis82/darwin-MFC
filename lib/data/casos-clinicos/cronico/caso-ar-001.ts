import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_AR_cro_001: CasoClinico = {
  id: 'caso-artrite-reumatoide-001',
  titulo: 'Dor articular simétrica em mulher de meia-idade',
  subtitulo: 'Paciente com rigidez matinal e inchaço nas mãos, sugerindo doença inflamatória crônica',
  categoria: 'cronico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 52,
      sexo: 'F',
      profissao: 'Auxiliar de enfermagem',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Minhas mãos e pés doem muito pela manhã e não consigo abri-las direito há uns seis meses',
    historiaDoencaAtual: 'Paciente refere dor articular simétrica em mãos, punhos e pés, com rigidez matinal superior a 1 hora, piorando nos últimos 3 meses. Negam trauma recente. Apresenta fadiga e leve perda de peso (3 kg em 2 meses). Usa ibuprofeno ocasionalmente com alívio parcial. Antecedentes: hipertensão controlada com losartana 50 mg/dia, tabagista há 20 anos (10 maços-ano).'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente descreve sintomas inflamatórios articulares. O que deseja investigar?',
        dicas: ['Fatores de risco como tabagismo, história familiar de autoimunidade, sintomas extra-articulares']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Tabagismo e história familiar de doenças autoimunes', correta: true },
          { id: 'c', texto: 'Dieta alimentar habitual', correta: false },
          { id: 'd', texto: 'Atividade física semanal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tabagismo é fator de risco para AR, e história familiar sugere predisposição genética [1,9].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores de risco como tabagismo são cruciais para suspeita de AR.',
        incorreto: 'Priorize fatores de risco para doenças reumáticas autoimunes.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa sinovite em metacarpofalângicas (MCFs) e metatarsofalângicas (MTFs) bilaterais, com limitação de movimento e rigidez.',
        dados: {
          'PA': '135/85 mmHg',
          'FC': '82 bpm',
          'FR': '14 irpm',
          'IMC': '28.5 kg/m²',
          'Exame articular': 'Sinovite em 4 MCFs bilaterais, rigidez >30 min'
        },
        dicas: ['Avalie distribuição simétrica e duração da rigidez matinal']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de artrite inflamatória?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada', correta: false },
          { id: 'b', texto: 'Sinovite simétrica em MCFs com rigidez matinal', correta: true },
          { id: 'c', texto: 'IMC 28.5', correta: false },
          { id: 'd', texto: 'FC 82 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Rigidez matinal >1h e sinovite simétrica são critérios clássicos para AR [1,9].',
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
          'VHS': '45 mm/h',
          'PCR': '2.5 mg/dL',
          'Fator reumatoide (FR)': 'Positivo (150 UI/mL)',
          'Anti-CCP': 'Positivo',
          'Hemoglobina': '12.5 g/dL',
          'RX mãos/pés': 'Erosões iniciais em MCFs'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção bacteriana aguda', correta: false },
          { id: 'b', texto: 'Artrite reumatoide com atividade inflamatória', correta: true },
          { id: 'c', texto: 'Osteoartrite degenerativa', correta: false },
          { id: 'd', texto: 'Lúpus eritematoso sistêmico isolado', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'FR e anti-CCP positivos, VHS/PCR elevados e erosões radiográficas confirmam AR ativa [1,9].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame e exames, calcule o escore ACR/EULAR.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Artrite reumatoide (escore ≥6/10)', correta: true },
          { id: 'b', texto: 'Artrite psoriática', correta: false },
          { id: 'c', texto: 'Osteoartrite', correta: false },
          { id: 'd', texto: 'Fibromialgia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Critérios ACR/EULAR 2010: sinovite persistente, FR/anti-CCP positivos, erosões = escore alto para AR [1,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial, considerando triagem para TB antes de biológicos se necessário.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas AINEs e fisioterapia', correta: false },
          { id: 'b', texto: 'Metotrexato 15 mg/semana + prednisona baixa dose', correta: true },
          { id: 'c', texto: 'Inibidor de TNF isolado', correta: false },
          { id: 'd', texto: 'Hidroxicloroquina isolada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'MTX é primeira linha para AR ativa; prednisona ponte para controle inicial [1,3,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Seguimento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após MTX. DAS28 reduz de 5.5 para 3.1, sem novas erosões.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter MTX e monitorar a cada 3 meses', correta: true },
          { id: 'b', texto: 'Suspender tratamento', correta: false },
          { id: 'c', texto: 'Adicionar biológico imediatamente', correta: false },
          { id: 'd', texto: 'Encaminhar para reumatologista sem follow-up', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resposta boa a MTX; manter e monitorar DAS28 a cada 1-3 meses [1,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 52 anos com AR ativa diagnosticada por critérios ACR/EULAR, tratada com MTX com boa resposta inicial.',
    diagnosticoFinal: 'Artrite Reumatoide (CID-11: CA23)',
    tratamentoRealizado: 'Metotrexato 15 mg/semana + prednisona 5 mg/dia, com educação sobre adesão e cessação tabágica.',
    evolucao: 'Melhora significativa em 3 meses, DAS28 <3.2, sem complicações.',
    licoesPrincipais: [
      'Suspeitar AR em dor simétrica com rigidez matinal >1h [1,9].',
      'Usar critérios ACR/EULAR para diagnóstico precoce [1].',
      'MTX como primeira linha; triar TB antes de biológicos [2,9].',
      'Monitorar DAS28 para ajustar terapia [3,5].',
      'Tabagismo agrava AR; aconselhar cessação [1].'
    ],
    errosComuns: [
      'Confundir com osteoartrite por dor articular, ignorando inflamação [1].',
      'Iniciar apenas AINEs sem DMARDs, atrasando controle [9].',
      'Não triar infecções latentes antes de imunossupressores [2,4].',
      'Subestimar impacto cardiovascular na AR [3].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e critérios diagnósticos de artrite reumatoide.',
    'Interpretar exames laboratoriais e de imagem para confirmação de AR.',
    'Selecionar tratamento inicial baseado em guidelines SUS e sociedades médicas.',
    'Planejar acompanhamento para remissão e prevenção de dano articular.'
  ],
  competencias: [
    'Raciocínio clínico em reumatologia',
    'Prescrição de DMARDs e monitoramento',
    'Educação em saúde para condições crônicas'
  ],
  doencasRelacionadas: ['artrite-reumatoide'],
  medicamentosRelacionados: ['L01BA01', 'L04AA26', 'M01CC01'],
  calculadorasRelacionadas: ['das28'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-005', 'ref-009'],
  tags: ['reumatologia', 'autoimune', 'crônico', 'inflamatório']
};