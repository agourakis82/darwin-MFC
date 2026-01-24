import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DRC_cro_001: CasoClinico = {
  id: 'caso-doenca-renal-cronica-001',
  titulo: 'Paciente com Fadiga e Edema em Membros Inferiores',
  subtitulo: 'Homem de meia-idade com fatores de risco cardiovascular apresenta sintomas sugestivos de complicação renal',
  categoria: 'cronico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'José Antonio Silva',
      idade: 58,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou muito cansado o tempo todo e minhas pernas estão inchadas há duas semanas.',
    historiaDoencaAtual: 'Paciente relata fadiga progressiva nos últimos meses, associada a edema bilateral em membros inferiores, piorando ao final do dia. Negam oligúria ou disúria, mas refere episódios ocasionais de espuma na urina. Histórico de hipertensão arterial há 10 anos, em uso irregular de medicação, e diabetes mellitus tipo 2 diagnosticado há 5 anos, com controle glicêmico irregular. Fuma 20 cigarros/dia há 30 anos e IMC elevado. Sem febre ou perda de peso.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a anamnese para identificar fatores de risco. O paciente confirma hipertensão mal controlada, diabetes com glicemias irregulares e tabagismo. Relata uso intermitente de enalapril e metformina.',
        dicas: ['Investigue fatores de risco como HAS, DM, tabagismo e uso de medicamentos nefrotóxicos']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o rastreamento de DRC neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Fatores de risco como DM e HAS', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'Dieta alimentar detalhada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Indivíduos com DM, HAS e tabagismo são de alto risco para DRC e requerem rastreamento anual [4,6].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores de risco guiam o rastreamento precoce.',
        incorreto: 'Priorize identificação de riscos cardiovasculares e renais para DRC.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa edema +/++++ em membros inferiores, sem sinais de insuficiência cardíaca congestiva. Pressão arterial elevada.',
        dados: {
          'PA': '162/98 mmHg',
          'FC': '82 bpm',
          'FR': '14 irpm',
          'IMC': '29.8 kg/m²',
          'Edema MMII': 'Bilateral, +/++++'
        },
        dicas: ['Note a hipertensão e obesidade como fatores de risco para DRC']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de possível DRC associada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Frequência respiratória normal', correta: false },
          { id: 'b', texto: 'Edema em membros inferiores', correta: true },
          { id: 'c', texto: 'Frequência cardíaca 82 bpm', correta: false },
          { id: 'd', texto: 'IMC 29.8 kg/m²', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Edema pode indicar retenção hidrossalina em DRC, especialmente com HAS descontrolada [4,5].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para avaliação renal. Resultados mostram alteração na função renal e proteinúria.',
        dados: {
          'Creatinina sérica': '1.4 mg/dL',
          'TFGe (CKD-EPI)': '58 mL/min/1.73m²',
          'Relação albumina/creatinina (ACR)': '45 mg/g',
          'Glicemia de jejum': '148 mg/dL',
          'HbA1c': '7.8%',
          'Potássio': '4.2 mEq/L'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta os resultados renais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Função renal normal', correta: false },
          { id: 'b', texto: 'DRC estágio 3 com albuminúria', correta: true },
          { id: 'c', texto: 'Infecção urinária aguda', correta: false },
          { id: 'd', texto: 'Desidratação isolada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'TFGe 30-59 mL/min/1.73m² define DRC estágio 3; ACR >30 mg/g indica albuminúria [4,5].',
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
          { id: 'a', texto: 'DRC estágio 3 secundária a DM e HAS', correta: true },
          { id: 'b', texto: 'Insuficiência renal aguda por desidratação', correta: false },
          { id: 'c', texto: 'Nefrite intersticial por medicamento', correta: false },
          { id: 'd', texto: 'DRC estágio 5 avançada', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Fatores de risco (DM, HAS, obesidade) com TFGe reduzida e albuminúria confirmam DRC [4,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Elabore o plano inicial, focando em controle de fatores de risco e proteção renal.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação dietética', correta: false },
          { id: 'b', texto: 'Otimizações de HAS e DM com IECA/BRA', correta: true },
          { id: 'c', texto: 'Diálise imediata', correta: false },
          { id: 'd', texto: 'Suspensão total de medicamentos', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'IECA/BRA reduzem proteinúria e retardam progressão de DRC em pacientes com DM e HAS [4,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após adesão ao tratamento. PA 135/85 mmHg, TFGe 62 mL/min/1.73m², ACR 25 mg/g, peso reduzido em 3 kg.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e monitorar anualmente', correta: true },
          { id: 'b', texto: 'Intensificar medicação anti-hipertensiva', correta: false },
          { id: 'c', texto: 'Encaminhar para nefrologista urgente', correta: false },
          { id: 'd', texto: 'Suspender rastreamento', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora na TFGe e redução de albuminúria indicam resposta; seguimento anual para alto risco [6,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com DRC estágio 3A associada a DM2 e HAS, identificado por rastreamento em atenção primária. Tratamento otimizado levou a estabilização da função renal.',
    diagnosticoFinal: 'Doença Renal Crônica estágio 3A (TFGe 58 mL/min/1.73m²) com albuminúria moderada, secundária a diabetes e hipertensão.',
    tratamentoRealizado: 'Otimização de metformina e insulina para DM; enalapril 20mg/dia para HAS e nefroproteção; cessação tabágica; dieta hipossódica e perda de peso.',
    evolucao: 'Em 6 meses, TFGe estabilizou em 60 mL/min/1.73m², ACR reduziu para 20 mg/g, sem progressão para diálise. Acompanhamento contínuo na APS.',
    licoesPrincipais: [
      'Rastreie DRC anualmente em pacientes com DM, HAS ou idade >60 anos usando TFGe e ACR [4,6].',
      'IECA/BRA são primeira linha para nefroproteção em DRC com proteinúria [5].',
      'Controle de fatores de risco como tabagismo e obesidade retarda progressão da DRC [4,7].',
      'Albuminúria é marcador precoce de dano renal e risco cardiovascular [4].',
      'Estadiamento da DRC guia periodicidade de monitoramento e intervenções [5,6].'
    ],
    errosComuns: [
      'Ignorar rastreamento em pacientes de alto risco, atrasando detecção precoce [6].',
      'Não otimizar IECA/BRA em DRC com HAS, perdendo oportunidade de nefroproteção [4].',
      'Subestimar impacto do tabagismo na progressão renal [5].',
      'Interpretar creatinina isolada sem cálculo de TFGe, levando a subdiagnóstico [4].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e indicações para rastreamento de DRC na atenção primária.',
    'Interpretar TFGe e albuminúria para estadiamento e diagnóstico de DRC.',
    'Planejar tratamento inicial para retardar progressão da DRC em comorbidades como DM e HAS.',
    'Compreender o papel do acompanhamento periódico na gestão da DRC.'
  ],
  competencias: ['Avaliação de risco cardiovascular e renal', 'Interpretação de exames laboratoriais nefrológicos', 'Prescrição de terapia nefroprotetora', 'Educação em saúde para adesão ao tratamento crônico'],
  doencasRelacionadas: ['doenca-renal-cronica'],
  medicamentosRelacionados: ['C09AA02', 'C09CA02', 'A10BA02'],
  calculadorasRelacionadas: ['calculadora-tfge'],
  referencias: ['ref-004', 'ref-005', 'ref-006', 'ref-007'],
  tags: ['nefrologia', 'rastreamento', 'doença crônica', 'hipertensão', 'diabetes']
};