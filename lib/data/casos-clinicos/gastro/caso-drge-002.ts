import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DRGE_gas_002: CasoClinico = {
  id: 'caso-drge-001',
  titulo: 'DRGE com Suspeita de Complicações Esofágicas',
  subtitulo: 'Paciente de 55 anos com azia crônica e disfagia progressiva',
  categoria: 'gastro',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Azia que não passa e dificuldade para engolir alimentos há meses',
    historiaDoencaAtual: 'Paciente relata episódios de azia retroesternal há 6 meses, ocorrendo 4-5 vezes por semana, piorando após refeições pesadas ou ao deitar. Há 2 meses, notou regurgitação ácida e disfagia para sólidos, com perda de 5 kg involuntária. Nega vômitos hemorrágicos ou dor intensa, mas refere sensação de "bolo na garganta". Usa antiácidos esporadicamente sem alívio duradouro. Fator de risco: obesidade e tabagismo (20 maços-ano).'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona uso ocasional de AINEs para dores lombares e histórico familiar de câncer gástrico no pai.',
        dicas: ['Investigue sintomas de alarme como disfagia e perda de peso, além de fatores de risco como obesidade e tabagismo [1,2].']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para estratificar o risco de complicações?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Disfagia progressiva e perda de peso', correta: true },
          { id: 'c', texto: 'Prática de exercícios regulares', correta: false },
          { id: 'd', texto: 'Dieta vegetariana', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas de alarme como disfagia e perda de peso indicam necessidade de endoscopia urgente em DRGE [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Sintomas de alarme priorizam investigação invasiva.',
        incorreto: 'Priorize sintomas de alarme para evitar atraso no diagnóstico de complicações.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, o paciente apresenta-se em bom estado geral, mas com IMC elevado. Não há sinais de desnutrição grave.',
        dados: {
          'PA': '142/88 mmHg',
          'FC': '82 bpm',
          'FR': '14 irpm',
          'IMC': '29.8 kg/m²',
          'Peso': '88 kg',
          'Altura': '1.72 m'
        },
        dicas: ['Avalie obesidade como fator de risco para DRGE e complicações [3,4].']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS significativo no contexto da DRGE?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pressão arterial elevada', correta: false },
          { id: 'b', texto: 'IMC de 29.8 kg/m² (obesidade grau I)', correta: true },
          { id: 'c', texto: 'Frequência cardíaca normal', correta: false },
          { id: 'd', texto: 'Respiração eupneica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Obesidade é fator de risco independente para DRGE e esôfago de Barrett [3,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita endoscopia digestiva alta devido a sintomas de alarme. Relatório: Esofagite erosiva grau C (LA classificação), sem evidência de Barrett inicial, mas biópsias pendentes.',
        dados: {
          'Endoscopia': 'Esofagite erosiva moderada a grave, hérnia de hiato 3 cm',
          'pHmetria 24h': 'Refluxo ácido patológico (índice de DeMeester >14,7)',
          'Hemoglobina': '12.8 g/dL',
          'Ferritina': '45 ng/mL (baixa normal)'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar os resultados da endoscopia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'DRGE leve sem complicações', correta: false },
          { id: 'b', texto: 'DRGE com esofagite erosiva e refluxo patológico', correta: true },
          { id: 'c', texto: 'Úlcera péptica isolada', correta: false },
          { id: 'd', texto: 'Esôfago de Barrett confirmado', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Esofagite grau C e pHmetria anormal confirmam DRGE com complicações [1,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e endoscopia, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'DRGE erosiva com sintomas de alarme', correta: true },
          { id: 'b', texto: 'Azia funcional sem lesão orgânica', correta: false },
          { id: 'c', texto: 'Câncer esofágico inicial', correta: false },
          { id: 'd', texto: 'Espasmo esofágico', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas crônicos, endoscopia com esofagite e pHmetria confirmam DRGE com complicações [1,2,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Biópsias confirmam ausência de displasia, mas esofagite erosiva. Inicie terapia.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Mudanças no estilo de vida isoladas', correta: false },
          { id: 'b', texto: 'IBP em dose dupla por 8 semanas + elevação da cabeceira', correta: true },
          { id: 'c', texto: 'Antácidos sob demanda', correta: false },
          { id: 'd', texto: 'Cirurgia antirrefluxo imediata', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em DRGE com esofagite, IBP em dose dupla é recomendado por 8 semanas, associado a medidas não farmacológicas [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses: sintomas melhoraram 80%, ganho de peso 2 kg, endoscopia de controle mostra cicatrização parcial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter IBP em dose de manutenção e reavaliar em 6 meses', correta: true },
          { id: 'b', texto: 'Suspender terapia por resolução completa', correta: false },
          { id: 'c', texto: 'Encaminhar para cirurgia', correta: false },
          { id: 'd', texto: 'Solicitar pHmetria de controle imediata', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Em DRGE com complicações, manutenção com IBP e vigilância endoscópica a cada 1-3 anos se Barrett [1,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com DRGE erosiva diagnosticada por endoscopia, tratado com IBP e medidas de estilo de vida, com boa resposta inicial.',
    diagnosticoFinal: 'Doença do Refluxo Gastroesofágico (DRGE) com esofagite erosiva (CID-11: CA23)',
    tratamentoRealizado: 'Omeprazol 40 mg/dia por 8 semanas, redução de peso, cessação tabágica e elevação da cabeceira da cama.',
    evolucao: 'Melhora sintomática em 3 meses, cicatrização parcial na endoscopia de controle, sem displasia.',
    licoesPrincipais: [
      'Sintomas de alarme como disfagia e perda de peso em DRGE requerem endoscopia imediata [1,2].',
      'Obesidade e tabagismo são fatores de risco modificáveis para complicações como esôfago de Barrett [3,4].',
      'Terapia com IBP em dose dupla é primeira linha para esofagite erosiva, com evidência nível Ia [1].',
      'Vigilância endoscópica é essencial em casos com complicações para detecção precoce de displasia [1,9].',
      'Integração de medidas não farmacológicas melhora adesão e eficácia do tratamento [2].'
    ],
    errosComuns: [
      'Subestimar sintomas de alarme e optar por teste terapêutico sem endoscopia [1].',
      'Iniciar IBP em dose baixa em esofagite grave, levando a falha terapêutica [2].',
      'Ignorar fatores de risco como obesidade, perpetuando recidivas [3].',
      'Ausência de seguimento, aumentando risco de adenocarcinoma esofágico [4,16].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas de alarme em DRGE e indicar endoscopia apropriadamente [1,2].',
    'Interpretar achados endoscópicos e pHmetria no diagnóstico de complicações [4].',
    'Aplicar diretrizes para tratamento inicial e manutenção em DRGE erosiva [1,9].',
    'Estratificar risco para vigilância em pacientes com fatores predisponentes [3,11].'
  ],
  competencias: [
    'Raciocínio clínico em gastroenterologia',
    'Interpretação de exames endoscópicos',
    'Prescrição racional de inibidores de bomba de prótons',
    'Aconselhamento em modificação de estilo de vida'
  ],
  doencasRelacionadas: ['drge'],
  medicamentosRelacionados: ['omeprazol', 'pantoprazol'],
  calculadorasRelacionadas: ['imc', 'risco-cardiovascular'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-009', 'ref-011'],
  tags: ['drge', 'refluxo', 'endoscopia', 'esofagite', 'complicações']
};