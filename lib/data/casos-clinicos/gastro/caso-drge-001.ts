import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DRGE_gas_001: CasoClinico = {
  id: 'caso-drge-001',
  titulo: 'Paciente com Sintomas Persistentes de Refluxo Gastroesofágico',
  subtitulo: 'Mulher de meia-idade com azia refratária ao tratamento inicial',
  categoria: 'gastro',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 52,
      sexo: 'F',
      profissao: 'Dona de casa',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Azia que não melhora, mesmo com remédios',
    historiaDoencaAtual: 'Paciente relata episódios de azia intensa e regurgitação ácida há 6 meses, ocorrendo diariamente, piorando após refeições e à noite. Iniciou tratamento com omeprazol 20 mg/dia há 3 meses sem alívio significativo. Nega disfagia, perda de peso involuntária ou hematêmese. Fuma 10 cigarros/dia e tem IMC de 28 kg/m².'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona uso crônico de anti-inflamatórios para dores lombares e consumo frequente de café e alimentos gordurosos.',
        dicas: ['Investigue hábitos alimentares, uso de medicamentos e fatores de risco como tabagismo e obesidade']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o quadro atual?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de diabetes', correta: false },
          { id: 'b', texto: 'Uso crônico de AINEs e hábitos alimentares', correta: true },
          { id: 'c', texto: 'Atividade física regular', correta: false },
          { id: 'd',  texto: 'Viagens recentes ao exterior', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Medicamentos como AINEs podem agravar DRGE, e hábitos alimentares são fatores desencadeantes comuns [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores modificáveis como dieta e medicamentos são essenciais na anamnese de DRGE.',
        incorreto: 'Priorize elementos que possam precipitar ou piorar o refluxo.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, a paciente apresenta-se eutrófica, mas com circunferência abdominal aumentada. Sinais vitais normais, exceto por IMC de 28,5 kg/m². Abdome flácido, sem dor à palpação.',
        dados: {
          'PA': '128/80 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'IMC': '28.5 kg/m²',
          'Peso': '72 kg',
          'Altura': '1,59 m'
        },
        dicas: ['Observe indicadores de obesidade central, fator de risco para DRGE']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS significativo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pressão arterial normal', correta: false },
          { id: 'b', texto: 'IMC de 28,5 kg/m² indicando sobrepeso', correta: true },
          { id: 'c', texto: 'Frequência cardíaca de 76 bpm', correta: false },
          { id: 'd', texto: 'Abdome flácido sem dor', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sobrepeso é um fator de risco importante para DRGE, aumentando a pressão intra-abdominal [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita endoscopia digestiva alta devido à refratariedade. Resultados mostram esofagite erosiva grau B (LA classificação) sem esôfago de Barrett. pHmetria 24h confirma refluxo patológico (índice de DeMeester >14,7).',
        dados: {
          'Endoscopia': 'Esofagite erosiva grau B, sem lesões malignas',
          'pHmetria 24h': 'Tempo total de pH <4: 8,5% (normal <4%)',
          'Manometria esofágica': 'Pressão do LES: 12 mmHg (normal >15 mmHg)',
          'Hemograma': 'Normal',
          'Função hepática': 'Normal'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar esses achados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Refluxo fisiológico sem DRGE', correta: false },
          { id: 'b', texto: 'DRGE confirmada com esofagite e refluxo ácido patológico', correta: true },
          { id: 'c', texto: 'Úlcera péptica isolada', correta: false },
          { id: 'd', texto: 'Motilidade normal sem refluxo', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Endoscopia e pHmetria confirmam DRGE refratária, com LES hipotenso [1,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando história, exame e testes, a paciente tem sintomas clássicos de DRGE persistentes apesar de IBP em dose padrão.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'DRGE refratária a terapia com IBP', correta: true },
          { id: 'b', texto: 'Gastrite por H. pylori', correta: false },
          { id: 'c', texto: 'Esôfago de Barrett inicial', correta: false },
          { id: 'd', texto: 'Azia funcional sem refluxo', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas >4 semanas sem resposta a IBP, confirmados por endoscopia e pHmetria, definem DRGE refratária [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Com diagnóstico de DRGE refratária, planeje escalonamento terapêutico, incluindo otimizações não farmacológicas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter omeprazol 20 mg e reavaliar em 6 meses', correta: false },
          { id: 'b', texto: 'Aumentar omeprazol para 40 mg BID + medidas de estilo de vida', correta: true },
          { id: 'c', texto: 'Iniciar cirurgia antirrefluxo imediatamente', correta: false },
          { id: 'd', texto: 'Adicionar procinéticos sem otimizar IBP', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em DRGE refratária, otimize IBP para dose dupla e associe mudanças de estilo de vida (perda de peso, elevação da cabeceira) [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, após otimização, sintomas reduziram 70%. Endoscopia de controle mostra melhora da esofagite. Paciente perdeu 3 kg com dieta.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter terapia otimizada e reavaliar em 6 meses', correta: true },
          { id: 'b', texto: 'Reduzir dose de IBP imediatamente', correta: false },
          { id: 'c', texto: 'Encaminhar para cirurgia', correta: false },
          { id: 'd', texto: 'Solicitar nova pHmetria', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resposta parcial justifica manutenção e monitoramento, com vigilância endoscópica periódica [1,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 52 anos com DRGE refratária diagnosticada por endoscopia e pHmetria, tratada com otimização de IBP e medidas de estilo de vida, com boa resposta.',
    diagnosticoFinal: 'Doença do Refluxo Gastroesofágico (DRGE) refratária',
    tratamentoRealizado: 'Omeprazol 40 mg BID, cessação tabágica, perda de peso e elevação da cabeceira da cama. Seguimento com gastroenterologista.',
    evolucao: 'Melhora sintomática em 3 meses, sem complicações. Manutenção da terapia.',
    licoesPrincipais: [
      'DRGE refratária é definida por falha ao IBP em dose padrão por >8 semanas [1].',
      'Endoscopia é indicada em casos persistentes para excluir complicações [1,4].',
      'pHmetria confirma refluxo patológico em sintomas atípicos ou refratários [2].',
      'Medidas de estilo de vida são fundamentais no manejo inicial e refratário [1,2].',
      'Vigilância endoscópica é essencial em pacientes com esofagite erosiva [9].'
    ],
    errosComuns: [
      'Não otimizar dose de IBP antes de testes invasivos [1].',
      'Ignorar fatores de risco como obesidade e tabagismo [3].',
      'Diagnosticar DRGE apenas por sintomas sem confirmação em refratários [2].',
      'Subestimar necessidade de seguimento em casos com esofagite [4].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer critérios para DRGE refratária e indicações de exames complementares.',
    'Aplicar raciocínio diagnóstico baseado em guidelines para manejo de refluxo persistente.',
    'Planejar terapia escalonada, incluindo não farmacológica, em DRGE.',
    'Entender o papel da endoscopia e pHmetria no diagnóstico e seguimento.'
  ],
  competencias: [
    'Raciocínio clínico em gastroenterologia',
    'Interpretação de exames endoscópicos e funcionais',
    'Manejo farmacológico e não farmacológico de DRGE',
    'Acompanhamento de condições crônicas refratárias'
  ],
  doencasRelacionadas: ['drge'],
  medicamentosRelacionados: ['omeprazol', 'pantoprazol', 'domperidona'],
  calculadorasRelacionadas: ['imc'],
  referencias: ['ref-001', 'ref-002', 'ref-004', 'ref-009', 'ref-010'],
  tags: ['drge', 'refluxo', 'endoscopia', 'phmetria', 'refrataria']
};