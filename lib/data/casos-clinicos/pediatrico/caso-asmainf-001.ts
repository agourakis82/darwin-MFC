import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ASMAINF_ped_001: CasoClinico = {
  id: 'caso-asma-infantil-001',
  titulo: 'Criança com episódios recorrentes de sibilância',
  subtitulo: 'Caso de suspeita de asma em paciente pediátrico com sintomas respiratórios noturnos',
  categoria: 'pediatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'João Pedro Silva',
      idade: 8,
      sexo: 'M',
      profissao: 'Estudante',
      estadoCivil: 'Solteiro'
    },
    queixaPrincipal: 'Meu filho está com chiado no peito e falta de ar toda noite há duas semanas.',
    historiaDoencaAtual: 'João Pedro, 8 anos, apresenta episódios recorrentes de sibilância e tosse noturna há 6 meses, exacerbados por exercícios e exposição a poeira. A mãe relata melhora parcial com xarope para tosse, mas sem alívio duradouro. Não há febre ou perda de peso. Antecedente de infecções respiratórias frequentes na creche.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A mãe menciona história familiar de alergias e gatilhos ambientais. O que deseja investigar?',
        dicas: ['Considere história familiar de atopia, gatilhos e resposta a broncodilatadores']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de vacinas em dia', correta: false },
          { id: 'b', texto: 'Gatilhos ambientais e familiares de asma', correta: true },
          { id: 'c', texto: 'Dieta alimentar recente', correta: false },
          { id: 'd', texto: 'Atividades escolares', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Identificar gatilhos e história familiar de atopia é essencial para suspeita de asma [2,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Gatilhos e atopia familiar guiam o diagnóstico.',
        incorreto: 'Priorize elementos que sugiram asma crônica.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa:',
        dados: {
          'Peso': '28 kg',
          'Estatura': '130 cm',
          'FC': '100 bpm',
          'FR': '28 irpm',
          'SatO2': '94% em ar ambiente',
          'Ausculta pulmonar': 'Sibilos bilaterais difusos'
        },
        dicas: ['Note a taquipneia e sibilos, sugestivos de obstrução reversível']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'FC 100 bpm', correta: false },
          { id: 'b', texto: 'Sibilos bilaterais e SatO2 94%', correta: true },
          { id: 'c', texto: 'Peso e estatura normais', correta: false },
          { id: 'd', texto: 'FR 28 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sibilos e hipoxemia indicam obstrução das vias aéreas, compatível com crise asmática [2,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita testes de função pulmonar (pico de fluxo expiratório, pois idade < 5 anos para espirometria plena). Resultados:',
        dados: {
          'Pico de fluxo expiratório (PEF)': '70% do predito',
          'Resposta a broncodilatador (salbutamol)': 'Melhora de 20% no PEF',
          'Hemograma': 'Eosinófilos 8%',
          'IgE total': '450 UI/mL (elevado)'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção bacteriana isolada', correta: false },
          { id: 'b', texto: 'Obstrução reversível com eosinofilia, sugestiva de asma', correta: true },
          { id: 'c', texto: 'Alergia alimentar sem relação respiratória', correta: false },
          { id: 'd', texto: 'Doença cardíaca congênita', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Melhora >12% no PEF pós-broncodilatador e eosinofilia confirmam componente asmático [2,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame e testes, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Asma infantil persistente leve', correta: true },
          { id: 'b', texto: 'Bronquiolite viral recorrente', correta: false },
          { id: 'c', texto: 'Corpo estranho aspirado', correta: false },
          { id: 'd', texto: 'Refluxo gastroesofágico', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas variáveis, reversibilidade e eosinofilia caracterizam asma infantil [2,3,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de manejo escalonado.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas antibióticos orais', correta: false },
          { id: 'b', texto: 'Broncodilatador de resgate (salbutamol) + corticosteroide inalatório (budesonida) baixa dose', correta: true },
          { id: 'c', texto: 'Corticosteroide oral por 7 dias', correta: false },
          { id: 'd', texto: 'Evitar todos os medicamentos e observar', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Manejo escalonado GINA/SBPT: controlador (ICS) + resgate para asma persistente [2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 1 mês. Sintomas controlados, PEF 95% predito, sem sibilos.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter budesonida baixa dose e resgate, retornar em 3 meses', correta: true },
          { id: 'b', texto: 'Suspender todos os medicamentos', correta: false },
          { id: 'c', texto: 'Escalonar para dose alta', correta: false },
          { id: 'd', texto: 'Encaminhar para pneumologista imediatamente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Controle alcançado: manter terapia de manutenção e monitorar periodicamente [2,3,4].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Criança de 8 anos com asma infantil persistente leve, diagnosticada por sintomas recorrentes e testes de função pulmonar. Iniciado manejo com ICS e broncodilatador, com boa resposta.',
    diagnosticoFinal: 'Asma infantil persistente leve (CID-11: CA23)',
    tratamentoRealizado: 'Budesonida inalatória 200 mcg/dia + salbutamol conforme necessário. Educação sobre gatilhos e plano de ação.',
    evolucao: 'Melhora clínica em 1 mês, sem crises. Acompanhamento trimestral no SUS.',
    licoesPrincipais: [
      'Sintomas como sibilância recorrente e tosse noturna sugerem asma em crianças [2,3].',
      'Teste de broncodilatador é chave para confirmar reversibilidade [2].',
      'Manejo escalonado inicia com ICS baixa dose para persistente leve [2,3,4].',
      'Educação familiar e plano de ação reduzem exacerbações [4,5].',
      'Monitoramento no SUS segue periodicidade baseada em controle [4].'
    ],
    errosComuns: [
      'Confundir com infecção viral recorrente sem avaliar reversibilidade [2].',
      'Não investigar gatilhos ambientais, perpetuando crises [3].',
      'Iniciar apenas broncodilatadores sem controlador em asma persistente [2,4].',
      'Subestimar impacto de atopia familiar no risco de asma [3].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer padrões sintomáticos de asma infantil e diagnósticos diferenciais.',
    'Interpretar testes de função pulmonar em pediatria e aplicar critérios GINA.',
    'Aplicar manejo escalonado inicial para asma persistente leve.',
    'Planejar acompanhamento e educação para controle a longo prazo.'
  ],
  competencias: [
    'Anamnese pediátrica em doenças respiratórias',
    'Exame físico pulmonar em crianças',
    'Interpretação de espirometria e PEF',
    'Prescrição de terapia inalatória',
    'Educação em saúde para asma'
  ],
  doencasRelacionadas: ['asma-infantil'],
  medicamentosRelacionados: ['R03AC12', 'R03CC02', 'R03BA08'],
  calculadorasRelacionadas: ['pico-fluxo-expiratorio'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005'],
  tags: ['asma', 'pediatria', 'respiratorio', 'alergia', 'SUS']
};