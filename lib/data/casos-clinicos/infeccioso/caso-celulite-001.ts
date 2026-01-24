import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_CELULITE_inf_001: CasoClinico = {
  id: 'caso-celulite-001',
  titulo: 'Celulite em Paciente com Fator de Risco',
  subtitulo: 'Homem de 55 anos apresenta eritema e dor na perna após ferimento',
  categoria: 'infeccioso',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Pedreiro',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Minha perna direita está vermelha, inchada e doendo muito há dois dias.',
    historiaDoencaAtual: 'Paciente relata que sofreu um corte na perna direita ao trabalhar com ferramentas há três dias. Inicialmente, houve leve sangramento, mas evoluiu para vermelhidão difusa, inchaço e dor progressiva. Negam febre alta, mas refere calafrios leves. Antecedente de diabetes mellitus tipo 2 diagnosticado há 5 anos, em tratamento irregular com metformina. Nega alergias medicamentosas.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona que o corte ocorreu em um canteiro de obras e não foi limpo adequadamente. O que deseja investigar?',
        dicas: ['Considere fatores de risco como diabetes, higiene do ferimento e comorbidades']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de infecções de pele', correta: false },
          { id: 'b', texto: 'Controle glicêmico recente e adesão à metformina', correta: true },
          { id: 'c', texto: 'Atividade física habitual', correta: false },
          { id: 'd', texto: 'Viagens recentes ao exterior', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Diabetes é fator de risco principal para celulite, e controle glicêmico inadequado agrava infecções [1,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! O diabetes é um fator de risco chave para infecções cutâneas.',
        incorreto: 'Priorize fatores de risco como o diabetes, que predispõe a infecções graves.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa eritema difuso na perna direita, com calor local, edema e dor à palpação. Limites mal definidos, sem flutuação. Sinais vitais: PA 140/85 mmHg, FC 92 bpm, T 38°C, FR 18 irpm.',
        dados: {
          'PA': '140/85 mmHg',
          'FC': '92 bpm',
          'Temperatura': '38°C',
          'FR': '18 irpm',
          'Peso': '85 kg',
          'Estatura': '1,70 m',
          'IMC': '29.4 kg/m²'
        },
        dicas: ['Observe sinais de infecção aguda: eritema, calor, febre e taquicardia']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 140/85 mmHg', correta: false },
          { id: 'b', texto: 'Febre de 38°C e eritema difuso', correta: true },
          { id: 'c', texto: 'IMC 29.4 kg/m²', correta: false },
          { id: 'd', texto: 'FC 92 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Febre e eritema com calor e dor sugerem infecção bacteriana aguda da pele, como celulite [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames laboratoriais iniciais. Resultados: Leucócitos 14.000/mm³ (neutrófilos 80%), PCR 45 mg/L, Glicemia 220 mg/dL, HbA1c 9.1%. Cultura de swab cutâneo pendente.',
        dados: {
          'Leucócitos': '14.000/mm³',
          'Neutrófilos': '80%',
          'PCR': '45 mg/L',
          'Glicemia capilar': '220 mg/dL',
          'HbA1c': '9.1%',
          'Creatinina': '0.9 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção viral leve', correta: false },
          { id: 'b', texto: 'Infecção bacteriana com descontrole glicêmico', correta: true },
          { id: 'c', texto: 'Apenas descompensação diabética', correta: false },
          { id: 'd', texto: 'Insuficiência renal aguda', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Leucocitose com neutrofilia e PCR elevada indicam infecção bacteriana; HbA1c >7% confirma descontrole diabético, fator de risco [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese diagnóstica principal.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Celulite bacteriana em paciente diabético', correta: true },
          { id: 'b', texto: 'Dermatite de contato alérgica', correta: false },
          { id: 'c', texto: 'Tromboflebite superficial', correta: false },
          { id: 'd', texto: 'Erisipela', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Eritema difuso, febre e leucocitose em porta de entrada (corte) com diabetes apontam para celulite [1,3]. Erisipela tem limites mais nítidos.',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano de tratamento inicial, considerando evidências para infecções cutâneas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas repouso e compressas quentes', correta: false },
          { id: 'b', texto: 'Cefalexina 500 mg 4x/dia por 7-10 dias + otimização glicêmica', correta: true },
          { id: 'c', texto: 'Amoxicilina + clavulanato IV imediato', correta: false },
          { id: 'd', texto: 'Drenagem cirúrgica urgente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tratamento empírico oral com cefalexina é primeira linha para celulite não complicada em atenção primária; ajuste glicêmico essencial [1].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 5 dias. Melhora significativa: eritema reduzido, apirexia, PCR 10 mg/L. Glicemia controlada com metformina ajustada.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter antibiótico até completar 10 dias e retorno em 1 semana', correta: true },
          { id: 'b', texto: 'Suspender antibiótico imediatamente', correta: false },
          { id: 'c', texto: 'Encaminhar para internação', correta: false },
          { id: 'd', texto: 'Solicitar RMN da perna', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resolução parcial requer completar curso antibiótico; monitorar recorrências em diabéticos [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com celulite em perna direita secundária a ferimento, associada a diabetes descontrolado. Tratado com antibiótico oral e otimização glicêmica, com boa evolução.',
    diagnosticoFinal: 'Celulite bacteriana (provável Streptococcus ou Staphylococcus) em paciente com DM2',
    tratamentoRealizado: 'Cefalexina 500 mg VO 4x/dia por 10 dias; metformina 1g 2x/dia; elevação de membro e higiene local',
    evolucao: 'Resolução completa em 2 semanas, sem complicações. Retorno trimestral para controle diabético.',
    licoesPrincipais: [
      'Diabetes é fator de risco principal para celulite; otimize controle glicêmico para prevenir recorrências [1,3].',
      'Diagnóstico clínico baseado em eritema difuso, calor e febre; cultura só em casos graves [1].',
      'Tratamento empírico com cefalexina é eficaz em celulite não complicada na atenção primária [1].',
      'Vigilância em populações vulneráveis como diabéticos é essencial no SUS [2].',
      'Monitoramento de evolução evita complicações como abscessos ou sepse [3,4].'
    ],
    errosComuns: [
      'Subestimar gravidade em diabéticos, levando a atraso no tratamento [1].',
      'Iniciar antibióticos de amplo espectro sem indicação, promovendo resistência [3].',
      'Ignorar porta de entrada (ferimentos) na anamnese, atrasando diagnóstico [1].',
      'Não ajustar terapia diabética, perpetuando risco de infecções recorrentes [2].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais clínicos de celulite e fatores de risco como diabetes.',
    'Aplicar tratamento empírico baseado em guidelines para infecções cutâneas.',
    'Entender a importância do controle glicêmico na prevenção de complicações infecciosas.',
    'Avaliar evolução e indicar seguimento adequado em atenção primária.'
  ],
  competencias: ['anamnese', 'exame_fisico', 'raciocinio_diagnostico', 'prescricao_terapeutica', 'acompanhamento'],
  doencasRelacionadas: ['celulite'],
  medicamentosRelacionados: ['J01CF02', 'J01CA01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004'],
  tags: ['infecção cutânea', 'diabetes', 'antibiótico', 'atenção primária']
};