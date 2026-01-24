import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DEPRESSAO_psi_001: CasoClinico = {
  id: 'caso-depressao-001',
  titulo: 'Paciente com sintomas depressivos persistentes',
  subtitulo: 'Mulher de 45 anos relata tristeza crônica e perda de interesse em atividades diárias',
  categoria: 'psiquiatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 45,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou sempre triste, sem energia e não consigo me interessar por nada há meses.',
    historiaDoencaAtual: 'Paciente relata início insidioso de sintomas há 6 meses, com humor deprimido persistente, anedonia, distúrbios do sono (insônia inicial), fadiga diária, perda de apetite com redução de 5 kg em 3 meses, sentimentos de culpa e inutilidade, dificuldade de concentração afetando o trabalho, e ideação suicida passiva sem plano. Nega uso de substâncias ou eventos estressantes recentes, mas menciona estresse crônico no trabalho e histórico familiar de depressão na mãe.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a anamnese psiquiátrica. A paciente descreve sintomas compatíveis com critérios DSM-5 para depressão maior. O que deseja investigar prioritariamente?',
        dicas: ['Avalie sintomas centrais, fatores de risco e comorbidades psiquiátricas ou somáticas']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Histórico de viagens recentes', correta: false },
          { id: 'b', texto: 'Sintomas de ideação suicida e histórico familiar', correta: true },
          { id: 'c', texto: 'Hábitos alimentares', correta: false },
          { id: 'd', texto: 'Atividade física semanal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Avaliação de risco suicida e histórico familiar são cruciais para estratificação de risco em depressão [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A avaliação de suicídio é prioritária em casos suspeitos de depressão.',
        incorreto: 'Priorize o risco suicida e fatores genéticos para guiar o manejo inicial.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, a paciente apresenta-se abatida, com higiene pessoal negligenciada, sem sinais vitais alterados significativos. Achados incluem perda de peso visível e tremor fino nas mãos.',
        dados: {
          'PA': '118/76 mmHg',
          'FC': '82 bpm',
          'FR': '14 irpm',
          'IMC': '21.5 kg/m²',
          'Peso': '58 kg (redução de 5 kg em 3 meses)'
        },
        dicas: ['Observe sinais de negligência e perda de peso como indicadores de gravidade']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA normal', correta: false },
          { id: 'b', texto: 'Perda de peso e negligência higiênica', correta: true },
          { id: 'c', texto: 'FC 82 bpm', correta: false },
          { id: 'd', texto: 'IMC 21.5 kg/m²', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Perda de peso involuntária e negligência sugerem impacto funcional significativo da depressão [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para descartar causas orgânicas. Resultados laboratoriais normais, exceto TSH levemente alterado.',
        dados: {
          'Hemoglobina': '12.5 g/dL',
          'TSH': '5.2 mUI/L (ref: 0.4-4.5)',
          'T4 livre': '0.9 ng/dL (normal)',
          'Glicemia de jejum': '92 mg/dL',
          'Creatinina': '0.8 mg/dL',
          'Vitamina B12': '450 pg/mL (normal)'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipotireoidismo subclínico como causa primária', correta: false },
          { id: 'b', texto: 'Exames normais, compatível com depressão primária', correta: true },
          { id: 'c', texto: 'Deficiência de B12 isolada', correta: false },
          { id: 'd', texto: 'Diabetes incipiente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'TSH levemente elevado pode ser comorbidade, mas não explica o quadro depressivo completo; prosseguir com avaliação psiquiátrica [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame e exames, você aplica o PHQ-9, que resulta em escore de 18 (depressão grave). Formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Depressão maior com risco suicida moderado', correta: true },
          { id: 'b', texto: 'Transtorno de ansiedade generalizada', correta: false },
          { id: 'c', texto: 'Hipotireoidismo sintomático', correta: false },
          { id: 'd', texto: 'Reação depressiva a estresse agudo', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas atendem critérios para depressão maior (≥5 sintomas por ≥2 semanas), com escore PHQ-9 elevado [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial, considerando rastreamento e tratamento em atenção primária.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação e retorno em 6 meses', correta: false },
          { id: 'b', texto: 'Inibidor seletivo de recaptação de serotonina (ISRS) + psicoterapia', correta: true },
          { id: 'c', texto: 'Benzodiazepínicos para ansiedade', correta: false },
          { id: 'd', texto: 'Encaminhamento imediato a psiquiatra sem medicação', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'ISRS como sertralina é primeira linha em atenção primária para depressão maior, associado a terapia cognitivo-comportamental [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 4 semanas. Relata melhora parcial no humor, PHQ-9 agora 10, sem ideação suicida, mas persiste insônia.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter ISRS, adicionar terapia e retornar em 4 semanas', correta: true },
          { id: 'b', texto: 'Aumentar dose do ISRS imediatamente', correta: false },
          { id: 'c', texto: 'Suspender medicação por melhora', correta: false },
          { id: 'd', texto: 'Encaminhar a emergência por piora', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resposta parcial requer otimização com terapia e monitoramento; reavaliação em 4 semanas é padrão [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de depressão maior diagnosticada em atenção primária, com rastreamento via PHQ-9, tratamento inicial com ISRS e psicoterapia, evoluindo com melhora.',
    diagnosticoFinal: 'Depressão maior (F32.2)',
    tratamentoRealizado: 'Sertralina 50 mg/dia (aumentada para 100 mg após 2 semanas) + psicoterapia cognitivo-comportamental semanal + suporte multiprofissional.',
    evolucao: 'Após 3 meses, PHQ-9 reduzido para 5, retorno às atividades laborais, ganho de peso e ausência de ideação suicida; manutenção por 6-12 meses.',
    licoesPrincipais: [
      'O rastreamento oportunístico com PHQ-9 é essencial em atenção primária para identificação precoce da depressão [1,2].',
      'Sintomas como anedonia e ideação suicida requerem avaliação imediata de risco.',
      'Tratamento combinado (farmacológico + psicoterapia) melhora desfechos em depressão maior.',
      'Excluir causas orgânicas com exames básicos antes de diagnóstico psiquiátrico.',
      'Acompanhamento regular é crucial para monitorar resposta e adesão.'
    ],
    errosComuns: [
      'Subestimar risco suicida em pacientes com sintomas depressivos.',
      'Atribuir sintomas exclusivamente a causas somáticas sem avaliação psiquiátrica.',
      'Iniciar tratamento sem rastreamento formal como PHQ-9.',
      'Não associar farmacoterapia a intervenções não farmacológicas.'
    ]
  },

  objetivosAprendizagem: [
    'Identificar sintomas e critérios diagnósticos de depressão maior.',
    'Aplicar ferramentas de rastreamento como PHQ-9 em atenção primária.',
    'Formular plano terapêutico inicial para depressão, incluindo ISRS e psicoterapia.',
    'Avaliar risco suicida e planejar acompanhamento.'
  ],
  competencias: [
    'Avaliação psiquiátrica inicial',
    'Rastreamento de saúde mental',
    'Prescrição de psicofármacos em APS',
    'Interconsulta multiprofissional'
  ],
  doencasRelacionadas: ['depressao'],
  medicamentosRelacionados: ['N06AB04', 'N06AA12', 'N06AB03'],
  calculadorasRelacionadas: ['phq9'],
  referencias: [
    'ref-001',
    'ref-002'
  ],
  tags: ['depressão', 'saúde mental', 'rastreamento', 'PHQ-9', 'ISRS']
};