import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ITU_inf_001: CasoClinico = {
  id: 'caso-itu-001',
  titulo: 'Infecção do Trato Urinário Recorrente',
  subtitulo: 'Mulher com episódios repetidos de sintomas urinários',
  categoria: 'infeccioso',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Ana Oliveira',
      idade: 28,
      sexo: 'F',
      profissao: 'Auxiliar de serviços gerais',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Sinto muita vontade de urinar e dor ao fazer xixi, isso já aconteceu várias vezes este ano.',
    historiaDoencaAtual: 'Paciente refere quatro episódios de disúria, polaciúria e urgência miccional nos últimos seis meses, tratados com antibióticos em UBS. Cada episódio dura 2-3 dias e melhora com medicação, mas recidiva em 1-2 meses. Nega febre, calafrios ou dor lombar. Antecedentes: história de ITU na infância, atividade sexual ativa, usa métodos contraceptivos orais.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a anamnese para identificar fatores predisponentes. O que investigar?',
        dicas: ['Pergunte sobre higiene, relações sexuais, comorbidades e uso de contraceptivos']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para guiar o manejo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Frequência de relações sexuais e higiene pós-coito', correta: true },
          { id: 'c', texto: 'Consumo de álcool semanal', correta: false },
          { id: 'd', texto: 'Exercícios físicos regulares', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Atividade sexual e higiene inadequada são fatores de risco principais para ITU recorrente em mulheres jovens [2,4].',
        pontos: 10
      },
      feedback: {
        correto: 'Perfeito! Esses fatores ajudam a prevenir recidivas.',
        incorreto: 'Foco em aspectos comportamentais relacionados à ITU.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Realiza exame físico direcionado.',
        dados: {
          'PA': '122/78 mmHg',
          'FC': '80 bpm',
          'Temperatura': '37.0°C',
          'IMC': '24.8 kg/m²',
          'Abdome': 'Mole, depressível, sem dor à descompressão súbita',
          'Região lombar': 'Sem CVA (dor à punção)'
        },
        dicas: ['Exame normal sugere ITU baixa não complicada']
      },
      pergunta: {
        enunciado: 'Qual achado reforça a suspeita de ITU simples?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC 24.8 kg/m²', correta: false },
          { id: 'b', texto: 'Ausência de dor lombar e febre', correta: true },
          { id: 'c', texto: 'PA 122/78 mmHg', correta: false },
          { id: 'd', texto: 'FC 80 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas isolados baixos urinários sem sinais de infecção ascendente indicam cistite não complicada [2,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Solicita exames iniciais para confirmação.',
        dados: {
          'EAS - Densidade': '1.015',
          'EAS - Leucócitos': '>100/campo',
          'EAS - Eritrócitos': '5-10/campo',
          'EAS - Nitritos': 'Positivo',
          'Urocultura': 'Escherichia coli 10^6 UFC/mL',
          'Glicemia capilar': '98 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Qual a interpretação dos exames?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Leucocituria assintomática', correta: false },
          { id: 'b', texto: 'Confirmação de ITU bacteriana', correta: true },
          { id: 'c', texto: 'Amostra contaminada', correta: false },
          { id: 'd', texto: 'Infecção viral', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Nitritos positivos e bacteriúria significativa com urocultura confirmam ITU [5,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integre os dados para hipótese diagnóstica.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico mais provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'ITU recorrente não complicada', correta: true },
          { id: 'b', texto: 'Pielonefrite aguda', correta: false },
          { id: 'c', texto: 'Cistite intersticial', correta: false },
          { id: 'd', texto: 'ITU de vias baixas complicada', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Recorrência de sintomas urinários inferiores com confirmação microbiológica em mulher sem fatores complicadores [2,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Planeje tratamento do episódio atual e prevenção.'
      },
      pergunta: {
        enunciado: 'Qual a abordagem terapêutica inicial mais adequada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Tratamento empírico sem urocultura', correta: false },
          { id: 'b', texto: 'Nitrofurantoína 100 mg 2x/dia por 5 dias', correta: true },
          { id: 'c', texto: 'Ciprofloxacino por 7 dias', correta: false },
          { id: 'd', texto: 'Observação sem antibiótico', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Nitrofurantoína é primeira linha para ITU não complicada, guiada por urocultura em recorrentes [5,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Retorno em 2 semanas: sintomas resolvidos, mas paciente preocupa-se com recidivas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta para prevenção?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Profilaxia com baixa dose de antibiótico + medidas comportamentais', correta: true },
          { id: 'b', texto: 'Encaminhamento imediato a urologista', correta: false },
          { id: 'c', texto: 'Suplementos de cranberry isolados', correta: false },
          { id: 'd', texto: 'Mudança de contraceptivo sem profilaxia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Para ITU recorrente (≥3/ano), profilaxia com trimetoprima ou nitrofurantoína baixa dose é indicada [5,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de ITU recorrente em mulher jovem, diagnosticada por sintomas e urocultura, tratada com antibiótico e profilaxia preventiva.',
    diagnosticoFinal: 'Infecção do Trato Urinário Recorrente (CID-11: CA23)',
    tratamentoRealizado: 'Nitrofurantoína por 5 dias para episódio agudo; profilaxia com trimetoprima 100 mg/noite por 6 meses; orientações sobre hidratação (>2L/dia), micção pós-coito e higiene.',
    evolucao: 'Assintomática após tratamento, com redução de episódios durante profilaxia; acompanhamento semestral.',
    licoesPrincipais: [
      'Identificar fatores de risco como atividade sexual para ITU recorrente em mulheres [2,4].',
      'Urocultura é essencial em casos recorrentes para guiar antibioticoterapia [5,6].',
      'Profilaxia antibiótica baixa dose previne recidivas em pacientes com ≥3 episódios/ano [7,9].',
      'Rastreamento com EAS e urocultura é recomendado semestralmente em gestantes [5,8].'
    ],
    errosComuns: [
      'Prescrever antibióticos empíricos sem cultura em recorrentes, fomentando resistência [6].',
      'Omitir profilaxia em ITU frequente, levando a mais morbidade [9].',
      'Não orientar medidas não farmacológicas, como hidratação e higiene [2].',
      'Confundir com infecções sexualmente transmissíveis sem exame ginecológico [4].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer e avaliar ITU recorrente em atenção primária.',
    'Interpretar exames como EAS e urocultura para diagnóstico.',
    'Aplicar diretrizes SUS e internacionais para tratamento e prevenção.',
    'Promover educação em saúde para redução de recidivas.'
  ],
  competencias: [
    'Anamnese em infecções geniturinárias',
    'Exame físico em queixas urinárias',
    'Solicitação e interpretação de exames laboratoriais',
    'Prescrição racional de antibióticos',
    'Aconselhamento preventivo em saúde da mulher'
  ],
  doencasRelacionadas: ['itu'],
  medicamentosRelacionados: ['J01XE01', 'J01EA01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-002', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-009'],
  tags: ['ITU recorrente', 'mulher adulta', 'urocultura', 'profilaxia antibiótica', 'prevenção']
};