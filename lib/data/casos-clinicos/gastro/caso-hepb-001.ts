import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_HEPB_gas_001: CasoClinico = {
  id: 'caso-hepatite-b-001',
  titulo: 'Hepatite B Crônica em Paciente Adulto',
  subtitulo: 'Homem de 55 anos com fadiga e história de múltiplos parceiros sexuais',
  categoria: 'gastro',
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
    queixaPrincipal: 'Estou cansado o tempo todo e sem apetite há uns meses',
    historiaDoencaAtual: 'Paciente relata fadiga progressiva iniciada há 6 meses, associada a anorexia e perda de peso de 5 kg. Nega icterícia, dor abdominal ou febre. Refere histórico de múltiplos parceiros sexuais na juventude e tatuagens antigas. Sem comorbidades conhecidas, mas menciona que sua esposa foi vacinada recentemente após exame de rotina.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona viagens frequentes a áreas endêmicas e contato com familiares portadores. O que deseja investigar?',
        dicas: ['Considere fatores de risco para hepatites virais, como hábitos sexuais, uso de drogas e histórico familiar']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Histórico de viagens recentes', correta: false },
          { id: 'b', texto: 'Fatores de risco para transmissão sexual ou parenteral', correta: true },
          { id: 'c', texto: 'Dieta alimentar habitual', correta: false },
          { id: 'd', texto: 'Atividade física', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Fatores de risco como múltiplos parceiros e tatuagens são cruciais para suspeita de hepatite B crônica [1,3,5].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Identificar riscos permite direcionar o rastreamento sorológico.',
        incorreto: 'Priorize fatores de risco para infecções virais hepáticas.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa palidez discreta, sem icterícia. Abdome com hepatomegalia indolor de 2 cm abaixo da margem costal direita. Sem ascite ou esplenomegalia.',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'Peso': '78 kg',
          'Estatura': '1,70 m',
          'IMC': '27 kg/m²'
        },
        dicas: ['Note a hepatomegalia como sinal de doença hepática crônica']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de hepatopatia crônica?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 130/80 mmHg', correta: false },
          { id: 'b', texto: 'Hepatomegalia indolor', correta: true },
          { id: 'c', texto: 'IMC 27 kg/m²', correta: false },
          { id: 'd', texto: 'FC 76 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hepatomegalia em contexto de fadiga sugere infecção viral crônica como hepatite B [3,5].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames laboratoriais iniciais. Resultados mostram elevação de enzimas hepáticas e sorologia positiva para hepatite B.',
        dados: {
          'ALT': '120 U/L',
          'AST': '95 U/L',
          'GGT': '80 U/L',
          'Fosfatase alcalina': '150 U/L',
          'Bilirrubina total': '1,2 mg/dL',
          'HBsAg': 'Positivo',
          'Anti-HBc total': 'Positivo',
          'Anti-HBs': 'Negativo',
          'HBV DNA': 'Detectável (baixa carga)'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hepatite B aguda resolvida', correta: false },
          { id: 'b', texto: 'Infecção crônica por HBV', correta: true },
          { id: 'c', texto: 'Imunidade por vacinação', correta: false },
          { id: 'd', texto: 'Infecção resolvida sem imunidade', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'HBsAg positivo >6 meses com Anti-HBc positivo e Anti-HBs negativo confirma hepatite B crônica [1,3,5].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese diagnóstica. Considere necessidade de biópsia ou elastografia para estadiamento.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hepatite B crônica com baixa replicação', correta: true },
          { id: 'b', texto: 'Hepatite C crônica', correta: false },
          { id: 'c', texto: 'Esteato-hepatite alcoólica', correta: false },
          { id: 'd', texto: 'Cirrose biliar primária', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sorologia e elevação moderada de transaminases indicam hepatite B crônica fase imunotolerante ou inativa [3,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'O paciente é assintomático além da fadiga. HBV DNA baixa, sem cirrose. Defina o plano inicial, incluindo vacinação de contatos.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Iniciar tenofovir imediatamente', correta: false },
          { id: 'b', texto: 'Monitoramento semestral com sorologia e HBV DNA', correta: true },
          { id: 'c', texto: 'Corticoides para inflamação', correta: false },
          { id: 'd', texto: 'Interferon alfa', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em hepatite B crônica inativa, monitoramento é preferível a tratamento antiviral, com vacinação de contatos [1,3,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 6 meses. Fadiga melhorou, ALT normalizou, HBV DNA estável. Esposa e filhos vacinados.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter monitoramento anual e educação sobre prevenção', correta: true },
          { id: 'b', texto: 'Iniciar antiviral profilático', correta: false },
          { id: 'c', texto: 'Suspender todos os exames', correta: false },
          { id: 'd', texto: 'Encaminhar para transplante hepático', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Fase inativa requer acompanhamento para detecção precoce de reativação ou progressão [3,5].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente diagnosticado com hepatite B crônica inativa, gerenciada com monitoramento e prevenção de transmissão familiar.',
    diagnosticoFinal: 'Hepatite B crônica (HBsAg positivo, HBV DNA baixa carga)',
    tratamentoRealizado: 'Monitoramento sorológico e viral semestral; vacinação de contatos próximos; orientação sobre medidas preventivas.',
    evolucao: 'Estável, com melhora sintomática e normalização de transaminases em 6 meses. Sem progressão para cirrose.',
    licoesPrincipais: [
      'Rastreamento sorológico com HBsAg é essencial em grupos de risco para detecção precoce [3,5].',
      'Vacinação universal contra hepatite B previne transmissão vertical e horizontal [1,3].',
      'Na hepatite B crônica inativa, monitoramento é preferível ao tratamento antiviral imediato [5].',
      'Educação sobre fatores de risco e prevenção reduz a transmissão comunitária [1,5].',
      'Sorologia completa (HBsAg, Anti-HBc, Anti-HBs) diferencia infecção crônica de imunidade [3].'
    ],
    errosComuns: [
      'Não investigar fatores de risco, atrasando o diagnóstico [3].',
      'Iniciar antiviral sem avaliação de carga viral ou fibrose hepática [5].',
      'Esquecer de vacinar contatos, perpetuando transmissão [1].',
      'Interpretar erroneamente sorologia, confundindo com infecção resolvida [3].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e realizar rastreamento adequado para hepatite B crônica.',
    'Interpretar sorologia para hepatite B e diferenciar fases da infecção.',
    'Aplicar diretrizes para monitoramento e tratamento em hepatite B crônica.',
    'Enfatizar prevenção por vacinação em contatos de portadores.'
  ],
  competencias: ['rastreamento_infeccioso', 'diagnostico_hepatopatia', 'prevencao_transmissao', 'acompanhamento_cronico'],
  doencasRelacionadas: ['hepatite-b'],
  medicamentosRelacionados: ['J07BC01', 'J05AF08', 'J05AF10'],
  calculadorasRelacionadas: ['fibrose_hepatica'],
  referencias: ['ref-001', 'ref-003', 'ref-005'],
  tags: ['hepatite-b', 'gastroenterologia', 'infeccioso', 'rastreamento', 'vacinação']
};