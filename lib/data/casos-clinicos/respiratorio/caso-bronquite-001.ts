import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_BRONQUITE_res_001: CasoClinico = {
  id: 'caso-bronquite-cronica-001',
  titulo: 'Paciente com Tosse Produtiva Crônica',
  subtitulo: 'Homem de 55 anos, fumante, com dispneia progressiva e expectoração persistente',
  categoria: 'respiratorio',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Carlos Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou tossindo com catarro todo dia há meses, e fico sem ar subindo escadas.',
    historiaDoencaAtual: 'Paciente relata tosse produtiva com expectoração mucoide amarelada diária há 4 meses, piorando nos últimos 2 anos. Dispneia aos esforços moderados (grau 2 no mMRC). História de tabagismo de 30 maços-ano, sem cessação recente. Exposição ocupacional a poeira e fumaça de diesel. Nega febre, hemoptise ou perda de peso. Antecedentes: hipertensão controlada com losartana 50 mg/dia.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona piora sazonal da tosse no inverno e infecções respiratórias frequentes.',
        dicas: ['Investigue tabagismo, exposição ambiental e sintomas associados à DPOC [1,2].']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para estratificar o risco?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de asma', correta: false },
          { id: 'b', texto: 'História de tabagismo em maços-ano', correta: true },
          { id: 'c', texto: 'Dieta alimentar', correta: false },
          { id: 'd', texto: 'Atividade sexual', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tabagismo ≥10 maços-ano é fator de risco principal para bronquite crônica e DPOC [1,9].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! O tabagismo é o principal fator de risco modificável.',
        incorreto: 'Priorize a quantificação do tabagismo para guiar o rastreamento.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa tórax em barril, murmúrio vesicular diminuído bilateralmente e sibilos difusos.',
        dados: {
          'PA': '135/85 mmHg',
          'FC': '85 bpm',
          'FR': '18 irpm',
          'SatO2': '94% em ar ambiente',
          'IMC': '28.5 kg/m²',
          'Ausculta pulmonar': 'Sibilos e roncos bilaterais'
        },
        dicas: ['Sinais de hiperinsuflação e obstrução das vias aéreas são sugestivos [1,3].']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS indicativo de doença obstrutiva crônica?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada', correta: false },
          { id: 'b', texto: 'Sibilos e roncos bilaterais', correta: true },
          { id: 'c', texto: 'IMC 28.5', correta: false },
          { id: 'd', texto: 'FR 18 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sibilos indicam obstrução reversível ou fixa, comum na bronquite crônica [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita espirometria e exames básicos. Resultados da espirometria pós-broncodilatador: VEF1/CVF = 0,62 (obstrução moderada), VEF1 65% do previsto.',
        dados: {
          'Hemograma': 'Leucócitos 8.500/mm³, sem eosinofilia',
          'Espirometria - VEF1/CVF': '0,62',
          'Espirometria - VEF1 % previsto': '65%',
          'Gasometria arterial': 'pH 7,38; pCO2 42 mmHg; pO2 82 mmHg',
          'Rx tórax': 'Hiperinsuflação pulmonar, sem infiltrados'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta a espirometria?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Padrão restritivo', correta: false },
          { id: 'b', texto: 'Obstrução fixa compatível com DPOC', correta: true },
          { id: 'c', texto: 'Normal', correta: false },
          { id: 'd', texto: 'Obstrução reversível total (asma)', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'VEF1/CVF < 0,70 pós-broncodilatador confirma obstrução não totalmente reversível, diagnóstica de DPOC [1,9].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e espirometria, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Bronquite crônica como parte de DPOC', correta: true },
          { id: 'b', texto: 'Pneumonia comunitária', correta: false },
          { id: 'c', texto: 'Asma de início tardio', correta: false },
          { id: 'd', texto: 'Insuficiência cardíaca congestiva', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Tosse produtiva ≥3 meses em 2 anos consecutivos + obstrução espirométrica em fumante define bronquite crônica/DPOC [1,2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'O paciente é orientado sobre cessação tabágica. Inicie terapia farmacológica baseada em GOLD.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica INICIAL mais apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas cessação tabágica sem medicação', correta: false },
          { id: 'b', texto: 'Broncodilatador beta-2 de longa ação (LABA) isolado', correta: false },
          { id: 'c', texto: 'Associação LABA + corticosteroide inalatório (CIA)', correta: true },
          { id: 'd', texto: 'Antibióticos profiláticos', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Para DPOC moderada (GOLD B), LABA + CIA reduz exacerbações em pacientes sintomáticos [1,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, paciente cessou tabagismo com apoio, mMRC 1, CAT score 12. Espirometria: VEF1 70% previsto.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e reavaliar em 6 meses', correta: true },
          { id: 'b', texto: 'Intensificar com oxigenoterapia', correta: false },
          { id: 'c', texto: 'Suspender inaladores', correta: false },
          { id: 'd', texto: 'Encaminhar para cirurgia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora clínica e espirométrica justifica manutenção e monitoramento anual [1,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com bronquite crônica/DPOC moderada diagnosticada precocemente, tratado com cessação tabágica e terapia inalatória, evoluindo favoravelmente.',
    diagnosticoFinal: 'Bronquite crônica (CID-11: CA23) como componente de DPOC',
    tratamentoRealizado: 'Cessação tabágica com aconselhamento e nicotina de reposição; formoterol/budesonida inalatório 160/4,5 mcg 2x/dia; vacinação influenza e pneumocócica.',
    evolucao: 'Após 6 meses, redução de exacerbações, melhora na qualidade de vida (CAT <10) e ganho de VEF1.',
    licoesPrincipais: [
      'Rastreie DPOC em fumantes ≥40 anos com espirometria para diagnóstico precoce [1,9].',
      'Cessação tabágica é a intervenção mais eficaz, reduzindo declínio funcional [1,14].',
      'Use questionários como mMRC e CAT para estratificar sintomas e guiar terapia [1,3].',
      'Associação LABA/CIA é primeira linha para DPOC sintomática moderada [1,11].',
      'Vacinação e reabilitação pulmonar previnem exacerbações [9,11].'
    ],
    errosComuns: [
      'Subestimar tabagismo como causa principal, atrasando diagnóstico [1].',
      'Não realizar espirometria, confiando apenas em exame físico [9].',
      'Iniciar antibióticos sem evidência de infecção bacteriana [3].',
      'Ignorar comorbidades como HAS, aumentando risco cardiovascular [1].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e sintomas de bronquite crônica/DPOC.',
    'Interpretar espirometria para diagnóstico de obstrução irreversível.',
    'Aplicar diretrizes GOLD/SBPT para manejo inicial e seguimento.',
    'Enfatizar cessação tabágica como pilar terapêutico.'
  ],
  competencias: [
    'Anamnese focada em riscos respiratórios',
    'Exame físico pulmonar',
    'Interpretação de provas funcionais respiratórias',
    'Prescrição de terapia inalatória',
    'Aconselhamento antitabagista'
  ],
  doencasRelacionadas: ['bronquite-cronica'],
  medicamentosRelacionados: ['R03AC02', 'R03BB04', 'R03BA06'],
  calculadorasRelacionadas: ['calculadora-maços-ano'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-009', 'ref-010', 'ref-011'],
  tags: ['DPOC', 'Tabagismo', 'Espirometria', 'Cessação tabágica', 'Broncodilatadores']
};