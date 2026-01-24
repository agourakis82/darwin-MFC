import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ASMA_res_001: CasoClinico = {
  id: 'caso-crise-asmatica-001',
  titulo: 'Crise Asmática em Paciente Adulta',
  subtitulo: 'Mulher de 35 anos com história de asma apresenta dispneia aguda',
  categoria: 'respiratorio',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 35,
      sexo: 'F',
      profissao: 'Auxiliar de enfermagem',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou com falta de ar forte e chiado no peito há dois dias',
    historiaDoencaAtual: 'Paciente relata episódio de piora progressiva da dispneia, associada a sibilos e tosse produtiva, iniciada após exposição a poeira no trabalho. História prévia de asma diagnosticada há 10 anos, com crises esporádicas controladas com salbutamol inalatório. Nega febre, mas refere piora noturna. Usa budesonida/formoterol regularmente, mas admite adesão irregular. Sem comorbidades conhecidas.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona gatilhos ambientais e adesão irregular ao tratamento. O que deseja investigar prioritariamente?',
        dicas: ['Considere gatilhos, história familiar, medicamentos e controle da asma']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de hipertensão', correta: false },
          { id: 'b', texto: 'Gatilhos e adesão ao tratamento crônico', correta: true },
          { id: 'c', texto: 'Dieta recente', correta: false },
          { id: 'd', texto: 'Viagens internacionais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Identificar gatilhos e adesão é essencial para manejo da crise e prevenção de recorrências [11,12].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Gatilhos e adesão guiam o manejo imediato e a longo prazo.',
        incorreto: 'Priorize elementos relacionados à asma para avaliação da crise.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa sinais de desconforto respiratório moderado.',
        dados: {
          'PA': '130/85 mmHg',
          'FC': '100 bpm',
          'FR': '24 irpm',
          'SatO2': '92% em ar ambiente',
          'IMC': '27.5 kg/m²',
          'Exame respiratório': 'Sibilos bilaterais, uso de musculatura acessória'
        },
        dicas: ['Avalie gravidade pela FR, SatO2 e ausculta pulmonar']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 130/85 mmHg', correta: false },
          { id: 'b', texto: 'SatO2 92% e sibilos bilaterais', correta: true },
          { id: 'c', texto: 'IMC 27.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 100 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'SatO2 < 95% e sibilos indicam crise moderada, requerendo intervenção imediata [11,13].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para estratificar a gravidade. Resultados chegam rapidamente.',
        dados: {
          'Pico de fluxo expiratório (PFE)': '60% do previsto',
          'Gasometria arterial': 'pH 7.38, pCO2 38 mmHg, pO2 70 mmHg',
          'Hemograma': 'Leucócitos 9.000/mm³, eosinófilos 6%',
          'Eletrocardiograma': 'Normal'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Crise leve, sem necessidade de oxigênio', correta: false },
          { id: 'b', texto: 'Crise moderada com hipoxemia e obstrução', correta: true },
          { id: 'c', texto: 'Infecção bacteriana associada', correta: false },
          { id: 'd', texto: 'Insuficiência respiratória grave', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'PFE 50-75% e SatO2 < 95% confirmam crise moderada; eosinofilia sugere componente alérgico [11,12].',
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
          { id: 'a', texto: 'Crise asmática moderada', correta: true },
          { id: 'b', texto: 'Pneumonia comunitária', correta: false },
          { id: 'c', texto: 'Edema pulmonar cardiogênico', correta: false },
          { id: 'd', texto: 'Ansiedade com hiperventilação', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'História de asma, sibilos e PFE reduzido confirmam exacerbação asmática [11,13].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o manejo inicial da crise.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas observação e alta', correta: false },
          { id: 'b', texto: 'Salbutamol inalado isolado', correta: false },
          { id: 'c', texto: 'Salbutamol + corticosteroide sistêmico + oxigênio se necessário', correta: true },
          { id: 'd', texto: 'Antibióticos empíricos', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'GINA recomenda beta-agonista de ação curta + corticoide para crises moderadas [11,12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após tratamento inicial, a paciente melhora: SatO2 96%, PFE 85%. Ela recebe plano de ação escrito.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alta com seguimento em 1 semana e educação sobre plano de ação', correta: true },
          { id: 'b', texto: 'Internação prolongada', correta: false },
          { id: 'c', texto: 'Suspender todos os medicamentos', correta: false },
          { id: 'd', texto: 'Encaminhamento imediato a pneumologista', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora clínica permite alta com reforço no controle crônico e plano de ação [11,13].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com crise asmática moderada tratada com sucesso no atendimento primário, com ênfase em adesão ao tratamento crônico.',
    diagnosticoFinal: 'Crise asmática moderada (CA23)',
    tratamentoRealizado: 'Salbutamol nebulizado (4 doses), prednisona oral 40mg/dia por 5 dias, oxigênio suplementar breve; reforço em budesonida/formoterol.',
    evolucao: 'Melhora em 2 horas, alta no mesmo dia com plano de ação e retorno em 7 dias. Sem recorrências em 1 mês.',
    licoesPrincipais: [
      'Avaliar gravidade da crise asmática pela história, exame e PFE para guiar terapia [11].',
      'Iniciar broncodilatadores e corticoides precocemente em exacerbações moderadas [12].',
      'Educar sobre plano de ação escrito para empoderar o paciente no autocuidado [13].',
      'Considerar gatilhos ambientais e adesão no manejo a longo prazo [11,12].',
      'Estratificar risco para prevenção de hospitalizações futuras [13].'
    ],
    errosComuns: [
      'Subestimar gravidade e não solicitar PFE ou gasometria [11].',
      'Omitir corticoides em crises moderadas, levando a piora [12].',
      'Não educar sobre adesão, perpetuando crises recorrentes [13].',
      'Confundir com infecção sem evidência, iniciando antibióticos desnecessários [11].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais e sintomas de crise asmática e estratificar gravidade.',
    'Aplicar manejo inicial de exacerbação asmática conforme diretrizes.',
    'Elaborar plano de ação para controle crônico da asma.',
    'Identificar fatores de risco e prevenção de recorrências.'
  ],
  competencias: [
    'Avaliação clínica de emergências respiratórias',
    'Manejo farmacológico de asma',
    'Educação em saúde para doenças crônicas'
  ],
  doencasRelacionadas: ['asma'],
  medicamentosRelacionados: ['salbutamol', 'budesonida-formoterol', 'prednisona'],
  calculadorasRelacionadas: ['pico-fluxo-expiratorio'],
  referencias: ['ref-011', 'ref-012', 'ref-013'],
  tags: ['asma', 'crise asmática', 'exacerbação respiratória', 'manejo primário']
};