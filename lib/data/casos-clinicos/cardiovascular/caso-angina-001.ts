import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ANGINA_car_001: CasoClinico = {
  id: 'caso-angina-estavel-001',
  titulo: 'Paciente com Dor Torácica ao Esforço',
  subtitulo: 'Homem de 55 anos relata episódios de desconforto torácico durante atividades físicas, aliviados com repouso.',
  categoria: 'cardiovascular',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'José Carlos Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Motorista de ônibus',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: '"Doutor, sinto uma dor apertada no peito quando subo escadas ou ando rápido no trabalho, mas para quando eu paro."',
    historiaDoencaAtual: 'Paciente relata episódios de dor torácica retroesternal de início há 2 meses, desencadeados por esforço físico moderado, com duração de 5-10 minutos, aliviados pelo repouso. Não irradia para braços ou mandíbula, sem sudorese ou náuseas associadas. Frequência: 2-3 vezes por semana. Nega sintomas em repouso ou à noite. Tabagista há 30 anos (20 cigarros/dia), hipertenso diagnosticado há 5 anos em tratamento irregular com losartana.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona fatores de risco adicionais. O que deseja investigar?',
        dicas: ['Considere história familiar, hábitos e medicações atuais']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de diabetes', correta: false },
          { id: 'b', texto: 'Hábitos tabágicos e etílicos', correta: true },
          { id: 'c', texto: 'Atividade física recente', correta: false },
          { id: 'd', texto: 'Viagens internacionais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tabagismo é fator de risco majoritário para doença arterial coronariana, agravando isquemia [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Hábitos como tabagismo são cruciais para estratificação de risco.',
        incorreto: 'Priorize fatores de risco modificáveis como tabagismo no contexto de dor torácica.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa:',
        dados: {
          'Pressão Arterial': '145/92 mmHg',
          'Frequência Cardíaca': '82 bpm',
          'Frequência Respiratória': '16 irpm',
          'IMC': '28.5 kg/m²',
          'Ausculta Cardíaca': 'Ritmo regular, sem sopros',
          'Ausculta Pulmonar': 'Vesicular preservado'
        },
        dicas: ['Note a hipertensão e o sobrepeso como fatores de risco cardiovascular']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Frequência cardíaca de 82 bpm', correta: false },
          { id: 'b', texto: 'Pressão arterial 145/92 mmHg', correta: true },
          { id: 'c', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'd', texto: 'Ausculta cardíaca regular', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hipertensão arterial não controlada aumenta o risco de eventos coronarianos em pacientes com suspeita de isquemia [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados principais:',
        dados: {
          'Eletrocardiograma (ECG) de repouso': 'Ritmo sinusal, sem alterações isquêmicas',
          'Colesterol total': '220 mg/dL',
          'LDL-colesterol': '140 mg/dL',
          'HDL-colesterol': '35 mg/dL',
          'Triglicerídeos': '180 mg/dL',
          'Glicemia de jejum': '110 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Perfil lipídico normal', correta: false },
          { id: 'b', texto: 'Dislipidemia com LDL elevado', correta: true },
          { id: 'c', texto: 'Diabetes mellitus diagnosticado', correta: false },
          { id: 'd', texto: 'ECG sugestivo de infarto prévio', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Dislipidemia aterogênica (LDL > 130 mg/dL) é fator de risco chave para angina estável, demandando intervenção [1,2,4].',
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
          { id: 'a', texto: 'Angina estável por doença arterial coronariana', correta: true },
          { id: 'b', texto: 'Refluxo gastroesofágico', correta: false },
          { id: 'c', texto: 'Ansiedade com dor musculoesquelética', correta: false },
          { id: 'd', texto: 'Infarto agudo do miocárdio', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Dor torácica típica ao esforço, aliviada por repouso, com fatores de risco, sugere angina estável [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial, incluindo não farmacológico e farmacológico.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas repouso e orientação dietética', correta: false },
          { id: 'b', texto: 'Aspirina + betabloqueador + estatina', correta: true },
          { id: 'c', texto: 'Nitroglicerina sublingual isolada', correta: false },
          { id: 'd', texto: 'Anticoagulantes de alto risco', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Terapia anti-isquêmica (betabloqueador), antiagregante (aspirina) e hipolipemiante (estatina) são pilares no manejo de angina estável [1,2,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 1 mês. Relata redução de episódios, PA 130/85 mmHg, LDL 110 mg/dL após adesão ao tratamento. Você agenda teste ergométrico.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e reavaliar em 3-6 meses', correta: true },
          { id: 'b', texto: 'Intensificar medicação imediatamente', correta: false },
          { id: 'c', texto: 'Suspender terapia por melhora', correta: false },
          { id: 'd', texto: 'Encaminhar para angiografia coronária urgente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Em angina estável controlada, follow-up periódico com otimização de risco CV é recomendado [1,3].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com angina estável diagnosticada, otimizado com terapia anti-isquêmica e controle de fatores de risco, sem eventos adversos.',
    diagnosticoFinal: 'Angina Estável (CID-11: CA23)',
    tratamentoRealizado: 'Aspirina 100 mg/dia, atenolol 50 mg/dia, sinvastatina 20 mg/dia, cessação tabágica com suporte, orientação dietética e exercício supervisionado.',
    evolucao: 'Após 3 meses, assintomático, com redução de LDL para 95 mg/dL e PA controlada. Teste ergométrico positivo para isquemia, encaminhado para avaliação cardiológica.',
    licoesPrincipais: [
      'Dor torácica ao esforço aliviada por repouso é clássica de angina estável [1,2].',
      'Estratificação de risco com fatores como tabagismo e dislipidemia guia o manejo [3,4].',
      'Terapia inicial inclui antiagregantes, betabloqueadores e estatinas para prevenção secundária [1,2].',
      'Acompanhamento regular otimiza adesão e previne progressão para síndromes coronarianas agudas [3].',
      'Testes funcionais como ergometria são indicados para confirmação diagnóstica em casos estáveis [1].'
    ],
    errosComuns: [
      'Subestimar sintomas como "apenas estresse" sem investigação cardiovascular.',
      'Não priorizar cessação tabágica, principal fator modificável.',
      'Iniciar terapia sem controle de pressão arterial, aumentando risco de eventos.',
      'Atrasar testes não invasivos em pacientes de risco intermediário/alto.'
    ]
  },

  objetivosAprendizagem: [
    'Identificar sintomas e fatores de risco de angina estável.',
    'Interpretar exames iniciais para estratificação de risco cardiovascular.',
    'Aplicar diretrizes para manejo farmacológico inicial.',
    'Planejar follow-up em pacientes com doença coronariana crônica.'
  ],
  competencias: [
    'Avaliação inicial de dor torácica',
    'Manejo de fatores de risco cardiovascular',
    'Prescrição de terapia anti-isquêmica'
  ],
  doencasRelacionadas: ['angina-estavel'],
  medicamentosRelacionados: ['C01DA02', 'C07AA05', 'C10AA01', 'B01AC06'],
  calculadorasRelacionadas: ['escore-risco-cv'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004'],
  tags: ['dor torácica', 'doença arterial coronariana', 'fatores de risco cv', 'terapia anti-isquêmica']
};