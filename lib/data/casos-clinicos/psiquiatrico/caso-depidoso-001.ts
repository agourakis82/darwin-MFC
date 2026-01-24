import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DEPIDOSO_psi_001: CasoClinico = {
  id: 'caso-depressao-idoso-001',
  titulo: 'Depressão em Idosa com Isolamento Social',
  subtitulo: 'Caso de uma idosa de 72 anos com queixas de tristeza persistente e perda de interesse em atividades diárias',
  categoria: 'psiquiatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 72,
      sexo: 'F',
      profissao: 'Aposentada (ex-doméstica)',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Estou me sentindo triste o tempo todo e não tenho mais vontade de fazer nada.',
    historiaDoencaAtual: 'Paciente refere tristeza persistente há 6 meses, após a morte do esposo. Apresenta perda de interesse em atividades antes prazerosas, como cozinhar e visitar familiares, insônia, fadiga diária e apetite reduzido com perda de 5 kg em 3 meses. Nega ideação suicida ativa, mas menciona "pensar que seria melhor não acordar". Histórico de hipertensão controlada e diabetes tipo 2. Nega uso de álcool ou tabagismo. Vive sozinha em casa simples no subúrbio de São Paulo.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a anamnese para avaliar sintomas e fatores de risco. A paciente descreve isolamento social crescente e luto não resolvido.',
        dicas: ['Investigue sintomas depressivos, história de luto, suporte social e comorbidades']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de depressão', correta: false },
          { id: 'b', texto: 'Sintomas de humor e funcionalidade diária', correta: true },
          { id: 'c', texto: 'Dieta habitual', correta: false },
          { id: 'd', texto: 'Vacinações recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Avaliar sintomas centrais como humor deprimido e anedonia é essencial para rastreamento de depressão em idosos [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Foco nos sintomas depressivos guia o diagnóstico.',
        incorreto: 'Priorize os sintomas psiquiátricos para identificar depressão.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa sinais de negligência pessoal e perda de peso. Paciente orientada, mas com humor rebaixado.',
        dados: {
          'PA': '140/85 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'Peso': '52 kg',
          'Estatura': '1,55 m',
          'IMC': '21,6 kg/m²',
          'Aspecto geral': 'Higiene precária, expressão triste'
        },
        dicas: ['Note o IMC reduzido e sinais de desnutrição associada à depressão']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS relevante para o quadro psiquiátrico?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 140/85 mmHg', correta: false },
          { id: 'b', texto: 'IMC 21,6 kg/m² com perda de peso', correta: true },
          { id: 'c', texto: 'FC 76 bpm', correta: false },
          { id: 'd', texto: 'FR 14 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Perda de peso e desnutrição são sintomas somáticos comuns na depressão geriátrica [2,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para descartar causas orgânicas e aplica escala de rastreamento. Resultados laboratoriais normais, exceto leve anemia.',
        dados: {
          'Hemoglobina': '11,2 g/dL',
          'TSH': '2,5 mUI/L',
          'Vitamina B12': '320 pg/mL',
          'Glicemia de jejum': '128 mg/dL',
          'Escala GDS-15': '10/15 (sugestivo de depressão)',
          'PHQ-9': '14 (depressão moderada)'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipotireoidismo como causa principal', correta: false },
          { id: 'b', texto: 'Depressão confirmada por escalas, com anemia associada', correta: true },
          { id: 'c', texto: 'Deficiência de B12 isolada', correta: false },
          { id: 'd', texto: 'Diabetes descontrolado', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'GDS-15 ≥5 e PHQ-9 ≥10 indicam depressão em idosos; anemia pode ser secundária [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Transtorno depressivo maior em idosa', correta: true },
          { id: 'b', texto: 'Demência inicial', correta: false },
          { id: 'c', texto: 'Depressão secundária a hipotireoidismo', correta: false },
          { id: 'd', texto: 'Ansiedade generalizada', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas clássicos com escalas positivas confirmam depressão maior; descartadas causas orgânicas [2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial, considerando SUS e evidências.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas psicoterapia', correta: false },
          { id: 'b', texto: 'Sertralina 50 mg/dia + suporte psicossocial', correta: true },
          { id: 'c', texto: 'Fluoxetina em dose alta imediata', correta: false },
          { id: 'd', texto: 'Benzodiazepínicos para insônia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'ISRS como sertralina é primeira linha em idosos; combinar com terapia não farmacológica [2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 4 semanas. Relata melhora no humor, GDS-15 agora 5/15, mas persiste insônia leve.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter sertralina e agendar retorno em 1 mês com psicoterapia', correta: true },
          { id: 'b', texto: 'Aumentar dose para 100 mg/dia imediatamente', correta: false },
          { id: 'c', texto: 'Suspender medicação por melhora', correta: false },
          { id: 'd', texto: 'Encaminhar para psiquiatra urgente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resposta inicial positiva; monitorar e manter abordagem multimodal [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Idosa com depressão maior diagnosticada por rastreamento na atenção primária, tratada com ISRS e suporte, com boa evolução.',
    diagnosticoFinal: 'Transtorno depressivo maior (CID-11: 6A70)',
    tratamentoRealizado: 'Sertralina 50 mg/dia, psicoterapia cognitivo-comportamental via NASF, orientação familiar e controle de comorbidades.',
    evolucao: 'Após 3 meses, remissão parcial dos sintomas, ganho de peso e reintegração social. Retorno trimestral.',
    licoesPrincipais: [
      'Rastreamento anual com GDS-15 ou PHQ-9 é essencial em idosos no SUS [1].',
      'Depressão em idosos frequentemente se apresenta com sintomas somáticos, como fadiga e perda de peso [2].',
      'Tratamento inicial com ISRS em doses baixas é seguro e eficaz [3].',
      'Abordagem multimodal, incluindo suporte social, melhora adesão e outcomes [4].',
      'Descarte causas orgânicas com exames básicos antes de diagnóstico psiquiátrico [2].'
    ],
    errosComuns: [
      'Subestimar sintomas somáticos como parte da depressão, confundindo com comorbidades crônicas.',
      'Iniciar benzodiazepínicos para insônia, aumentando risco de quedas em idosos.',
      'Não envolver família ou suporte social, perpetuando isolamento.',
      'Ignorar rastreamento em idosos assintomáticos ou com luto recente.'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais de depressão em idosos e aplicar escalas de rastreamento.',
    'Diferenciar depressão de causas orgânicas e demência.',
    'Planejar tratamento farmacológico e não farmacológico adequado ao contexto SUS.',
    'Avaliar resposta ao tratamento e monitorar complicações em idosos.'
  ],
  competencias: [
    'Avaliação de saúde mental em atenção primária',
    'Rastreamento de transtornos psiquiátricos em idosos',
    'Prescrição de psicofármacos com segurança geriátrica',
    'Abordagem multidisciplinar em saúde mental'
  ],
  doencasRelacionadas: ['depressao-idoso'],
  medicamentosRelacionados: ['N06AB03', 'N06AB04', 'N06AB05'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004'],
  tags: ['depressão', 'idoso', 'saúde mental', 'rastreamento', 'SUS']
};