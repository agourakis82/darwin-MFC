import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_MONO_inf_001: CasoClinico = {
  id: 'caso-mononucleose-infecciosa-001',
  titulo: 'Mononucleose Infecciosa em Jovem Adulto',
  subtitulo: 'Paciente jovem com febre, dor de garganta e fadiga persistente',
  categoria: 'infeccioso',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 20,
      sexo: 'F',
      profissao: 'Estudante universitária',
      estadoCivil: 'Solteira'
    },
    queixaPrincipal: 'Estou com febre e dor de garganta há uma semana, e me sinto muito cansada',
    historiaDoencaAtual: 'Paciente refere início há 7 dias de febre intermitente (até 38,5°C), dor de garganta progressiva com exsudato branco, fadiga intensa que impede atividades diárias, cefaleia leve e mialgias. Nega tosse, dispneia ou sintomas gastrointestinais. Relata beijo com namorado recentemente e convívio em república estudantil. Sem comorbidades conhecidas, vacinas em dia, sem uso de medicamentos.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona convívio próximo com amigos em festas e compartilhamento de utensílios. O que deseja investigar?',
        dicas: ['Considere histórico de exposição, sintomas associados e fatores de risco para infecções virais']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Histórico familiar de alergias', correta: false },
          { id: 'b', texto: 'Exposição recente a contatos próximos com sintomas semelhantes', correta: true },
          { id: 'c', texto: 'Dieta alimentar habitual', correta: false },
          { id: 'd', texto: 'Atividade física regular', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A transmissão do EBV ocorre via saliva, comum em adolescentes com beijos ou compartilhamento [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Exposição é chave para suspeita de mononucleose.',
        incorreto: 'Priorize histórico de contágio para infecções transmissíveis.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa febre axilar de 38,2°C, faringe eritematosa com exsudato, linfonodos cervicais dolorosos e aumentados (cerca de 2 cm), sem esplenomegalia palpável. Sem rash cutâneo ou hepatomegalia.',
        dados: {
          'Temperatura': '38,2°C',
          'FC': '92 bpm',
          'FR': '18 irpm',
          'Peso': '58 kg',
          'Estatura': '1,65 m'
        },
        dicas: ['A tríade clássica é febre, faringite e linfadenopatia [2]']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de mononucleose infecciosa?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Febre isolada', correta: false },
          { id: 'b', texto: 'Linfadenopatia cervical simétrica', correta: true },
          { id: 'c', texto: 'Taquicardia leve', correta: false },
          { id: 'd', texto: 'Faringe normal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Linfadenopatia cervical posterior é característica, associada a faringite e febre [2,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram linfocitose com linfócitos atípicos (15%), teste heterófilo positivo, AST/ALT levemente elevadas (60/55 U/L).',
        dados: {
          'Hemoglobina': '12,8 g/dL',
          'Leucócitos': '12.500/mm³',
          'Linfócitos atípicos': '15%',
          'Teste heterófilo (Monospot)': 'Positivo',
          'AST': '60 U/L',
          'ALT': '55 U/L'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção bacteriana primária', correta: false },
          { id: 'b', texto: 'Mononucleose infecciosa por EBV', correta: true },
          { id: 'c', texto: 'Leucopenia viral inespecífica', correta: false },
          { id: 'd', texto: 'Anemia ferropênica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Linfocitose atípica e teste heterófilo positivo confirmam mononucleose [1,4].',
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
          { id: 'a', texto: 'Faringite estreptocócica', correta: false },
          { id: 'b', texto: 'Mononucleose infecciosa', correta: true },
          { id: 'c', texto: 'Gripe comum', correta: false },
          { id: 'd', texto: 'HIV agudo', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tríade clínica com linfocitose atípica e teste positivo é clássica para EBV [2,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial. Evite aspirina em jovens devido a risco de síndrome de Reye.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Antibióticos como amoxicilina', correta: false },
          { id: 'b', texto: 'Suporte com analgésicos e repouso', correta: true },
          { id: 'c', texto: 'Corticoides sistêmicos imediatos', correta: false },
          { id: 'd', texto: 'Aciclovir antiviral', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tratamento é sintomático; antivirais não são rotineiros em casos não complicados [7,8].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 2 semanas: febre resolvida, fadiga melhorando, linfonodos reduzidos. Sem complicações.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter repouso e retorno em 4 semanas', correta: true },
          { id: 'b', texto: 'Iniciar antivirais', correta: false },
          { id: 'c', texto: 'Solicitar sorologia EBV completa', correta: false },
          { id: 'd', texto: 'Encaminhar para hematologia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resolução espontânea em 2-4 semanas; evitar esportes por 4-6 semanas devido a esplenomegalia [3,8].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Jovem com mononucleose infecciosa confirmada por quadro clínico e teste heterófilo, tratada com suporte e evoluiu favoravelmente.',
    diagnosticoFinal: 'Mononucleose infecciosa por EBV',
    tratamentoRealizado: 'Repouso, hidratação, paracetamol para febre e dor; orientação para evitar contato e esportes.',
    evolucao: 'Melhora completa em 3 semanas, sem complicações como ruptura esplênica.',
    licoesPrincipais: [
      'Suspeitar de mononucleose em jovens com tríade febre-faringite-linfadenopatia [2].',
      'Teste heterófilo é rápido para diagnóstico inicial [4].',
      'Tratamento é sintomático; evitar AINEs em casos graves [7].',
      'Orientar repouso para prevenir ruptura esplênica [3].',
      'Transmissão via saliva requer medidas de higiene [1].'
    ],
    errosComuns: [
      'Prescrever antibióticos desnecessariamente, podendo causar rash [8].',
      'Ignorar linfadenopatia, confundindo com infecção bacteriana.',
      'Não orientar sobre restrições físicas, arriscando complicações.',
      'Subestimar fadiga como sintoma principal em jovens.'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer a apresentação clínica clássica da mononucleose infecciosa.',
    'Interpretar achados laboratoriais como linfócitos atípicos e teste heterófilo.',
    'Aplicar tratamento sintomático e orientações preventivas.',
    'Diferenciar de outras faringites infecciosas.'
  ],
  competencias: ['Anamnese em infecções virais', 'Exame físico de linfonodos e faringe', 'Interpretação de hemograma', 'Raciocínio diagnóstico em primary care'],
  doencasRelacionadas: ['mononucleose-infecciosa'],
  medicamentosRelacionados: ['N02BE01', 'J05AB01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-007', 'ref-008'],
  tags: ['infecção viral', 'adolescente', 'EBV', 'faringite', 'linfadenopatia']
};