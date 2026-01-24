import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ASMA_res_002: CasoClinico = {
  id: 'caso-asma-dificil-controle-001',
  titulo: 'Asma de Difícil Controle em Paciente Adulta',
  subtitulo: 'Mulher de 45 anos com sintomas respiratórios persistentes apesar de tratamento contínuo',
  categoria: 'respiratorio',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 45,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou sempre sem fôlego, mesmo tomando os remédios, e tenho crises à noite',
    historiaDoencaAtual: 'Paciente relata episódios recorrentes de dispneia, sibilos e tosse noturna há 10 anos, diagnosticada com asma moderada persistente aos 35 anos. Usa budesonida/formoterol inalatório 160/4,5 mcg 2x/dia e salbutamol sob demanda, mas refere uso frequente do resgate (mais de 2x/semana). Exacerbações ocorreram 3 vezes no último ano, necessitando de corticoide oral. Nega tabagismo atual, mas exposta a poeira em casa e alérgica a ácaros. Sem comorbidades conhecidas, mas relata rinite alérgica não tratada.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente descreve sintomas noturnos e diurnos persistentes. O que deseja investigar?',
        dicas: ['Avalie adesão ao tratamento, gatilhos ambientais e comorbidades como rinite']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de asma', correta: false },
          { id: 'b', texto: 'Adesão e técnica de inalação dos medicamentos', correta: true },
          { id: 'c', texto: 'Dieta alimentar recente', correta: false },
          { id: 'd', texto: 'Viagens internacionais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Má adesão e técnica inadequada são causas comuns de asma de difícil controle [11,12].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A adesão é fundamental para o controle da asma.',
        incorreto: 'Priorize a avaliação de adesão e técnica inalatória no manejo.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa:',
        dados: {
          'PA': '128/80 mmHg',
          'FC': '92 bpm',
          'FR': '20 irpm',
          'SatO2': '94% em ar ambiente',
          'IMC': '28.5 kg/m²',
          'Exame pulmonar': 'Sibilos difusos bilaterais, sem crepitações'
        },
        dicas: ['Note a taquipneia e hipoxemia leve, sugestivos de obstrução persistente']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 128/80 mmHg', correta: false },
          { id: 'b', texto: 'SatO2 94% e sibilos difusos', correta: true },
          { id: 'c', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 92 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sibilos e hipoxemia indicam controle inadequado da asma, com risco de exacerbação [11,13].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames. Resultados:',
        dados: {
          'Espirometria (pré-BD)': 'VEF1 65% do previsto, VEF1/CVF 62%',
          'Pós-broncodilatador': 'Melhora de 12% no VEF1',
          'FeNO': '45 ppb',
          'IgE total': '450 UI/mL',
          'Eosinófilos': '8%'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Obstrução irreversível sem inflamação', correta: false },
          { id: 'b', texto: 'Asma eosinofílica com obstrução reversível parcial', correta: true },
          { id: 'c', texto: 'DPOC isolada', correta: false },
          { id: 'd', texto: 'Infecção aguda', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'VEF1 reduzido com melhora parcial, FeNO elevado e eosinofilia sugerem fenótipo T2 alto [11,12,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base nos dados, formule sua hipótese diagnóstica, considerando diferenciais como DPOC ou rinite não controlada.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Asma de difícil controle com fenótipo eosinofílico', correta: true },
          { id: 'b', texto: 'DPOC por tabagismo oculto', correta: false },
          { id: 'c', texto: 'Bronquiectasia', correta: false },
          { id: 'd', texto: 'Asma induzida por exercício isolada', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas variáveis, obstrução reversível e marcadores inflamatórios confirmam asma grave não controlada [11,12,13].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial, escalonando terapia e educando sobre adesão.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas aumentar salbutamol sob demanda', correta: false },
          { id: 'b', texto: 'Adicionar anti-histamínico para rinite', correta: false },
          { id: 'c', texto: 'Escalonar para ICS/LABA alta dose + biológico (anti-IL5) se eosinofilia persistir', correta: true },
          { id: 'd', texto: 'Suspender inaladores e observar', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'GINA recomenda escalonamento para step 5 em asma grave, com biológicos para fenótipo T2 [11,12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após escalonamento e educação. ACT 22/25, VEF1 82%, sem exacerbações.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter terapia e monitorar a cada 3 meses', correta: true },
          { id: 'b', texto: 'Escalonar para step 6 com corticoide oral', correta: false },
          { id: 'c', texto: 'Suspender biológico', correta: false },
          { id: 'd', texto: 'Encaminhar para cirurgia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Controle alcançado (ACT >20). Manter plano de ação e avaliações regulares [11,13].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de asma moderada persistente evoluindo para difícil controle devido a má adesão e rinite não tratada. Após avaliação integral, escalonamento terapêutico resultou em bom controle.',
    diagnosticoFinal: 'Asma de Difícil Controle (GINA Step 5) com fenótipo eosinofílico',
    tratamentoRealizado: 'ICS/LABA alta dose + omalizumabe iniciado; educação em técnica inalatória e controle ambiental; tratamento de rinite com corticosteroide nasal.',
    evolucao: 'Melhora significativa em 3 meses, com redução de sintomas e exacerbações. Paciente aderente e autônoma no plano de ação.',
    licoesPrincipais: [
      'Avalie adesão, técnica inalatória e comorbidades antes de escalonar terapia [11,12].',
      'Use marcadores como FeNO e eosinófilos para guiar biológicos em asma grave [11,4].',
      'Educação do paciente é essencial para prevenção de exacerbações [13].',
      'Protocolos SUS enfatizam acesso a medicamentos e monitoramento regular [13,14].',
      'Controle da rinite melhora outcomes na asma alérgica [12].'
    ],
    errosComuns: [
      'Escalonar terapia sem investigar adesão ou gatilhos, levando a polifarmácia desnecessária.',
      'Ignorar comorbidades como rinite, perpetuando sintomas.',
      'Não realizar espirometria para confirmar reversibilidade.',
      'Subestimar o impacto de alérgenos ambientais em pacientes urbanos brasileiros.'
    ]
  },

  objetivosAprendizagem: [
    'Identificar causas de asma de difícil controle, como má adesão e comorbidades.',
    'Interpretar testes de função pulmonar e marcadores inflamatórios na asma.',
    'Aplicar diretrizes GINA e SBPT para escalonamento terapêutico em casos graves.',
    'Planejar acompanhamento e educação para otimizar controle da asma.'
  ],
  competencias: [
    'Avaliação e manejo de doenças respiratórias crônicas',
    'Raciocínio diagnóstico em pneumologia',
    'Prescrição racional de inaladores e biológicos'
  ],
  doencasRelacionadas: ['asma'],
  medicamentosRelacionados: ['budesonida-formoterol', 'omalizumabe', 'salmeterol-fluticasona'],
  calculadorasRelacionadas: ['espirometria-interpretacao', 'act-questionario'],
  referencias: ['ref-011', 'ref-012', 'ref-013', 'ref-004'],
  tags: ['asma', 'controle', 'eosinofilica', 'biologicos', 'gina']
};