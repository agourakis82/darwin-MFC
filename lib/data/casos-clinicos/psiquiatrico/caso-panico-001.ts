import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_PANICO_psi_001: CasoClinico = {
  id: 'caso-transtorno-panico-001',
  titulo: 'Paciente com Ataques de Pânico Recorrentes',
  subtitulo: 'Mulher de 35 anos relata episódios intensos de ansiedade com medo de morte iminente',
  categoria: 'psiquiatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira Santos',
      idade: 35,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Eu sinto que vou morrer a qualquer momento, meu coração acelera e eu fico sem ar',
    historiaDoencaAtual: 'Paciente relata episódios recorrentes de ansiedade intensa nos últimos 6 meses, com duração de 10-20 minutos cada, acompanhados de palpitações, sudorese, tremores, sensação de asfixia e medo de perder o controle ou morrer. Os ataques ocorrem de forma inesperada, inclusive durante o sono, e ela evita situações sociais por medo de novos episódios. Há preocupação constante sobre futuros ataques, impactando o trabalho e as relações familiares. Nega uso de substâncias, mas menciona estresse no trabalho.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a anamnese para caracterizar os episódios. A paciente descreve ataques súbitos com sintomas somáticos e cognitivos. O que deseja investigar prioritariamente?',
        dicas: ['Explore triggers, duração, impacto funcional e comorbidades']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Histórico de viagens recentes', correta: false },
          { id: 'b', texto: 'Características e frequência dos ataques de pânico', correta: true },
          { id: 'c', texto: 'Hábitos alimentares', correta: false },
          { id: 'd', texto: 'Atividade física semanal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A caracterização dos ataques recorrentes e inesperados é essencial para o diagnóstico de transtorno de pânico [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história detalhada dos ataques guia o diagnóstico.',
        incorreto: 'Priorize os sintomas centrais do transtorno de pânico.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, a paciente apresenta ansiedade visível, mas sem alterações graves. Achados principais:',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '92 bpm',
          'FR': '18 irpm',
          'Sat O2': '98% em ar ambiente',
          'IMC': '24.5 kg/m²',
          'Exame neurológico': 'Normal, sem déficits focais'
        },
        dicas: ['Observe sinais de ansiedade, mas exclua causas orgânicas agudas']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS relevante para o quadro?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 130/80 mmHg', correta: false },
          { id: 'b', texto: 'Taquicardia e ansiedade visível', correta: true },
          { id: 'c', texto: 'IMC 24.5 kg/m²', correta: false },
          { id: 'd', texto: 'Sat O2 98%', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sinais autonômicos como taquicardia são comuns em ataques de pânico, mas o exame normal sugere etiologia psiquiátrica [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Para descartar causas orgânicas, você solicita exames básicos. Resultados:',
        dados: {
          'Hemograma': 'Normal',
          'TSH': '2.5 mUI/L (normal)',
          'T4 livre': '1.2 ng/dL (normal)',
          'ECG': 'Ritmo sinusal, sem alterações',
          'Glicemia de jejum': '85 mg/dL',
          'Eletrólitos': 'Normais'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipertireoidismo confirmado', correta: false },
          { id: 'b', texto: 'Exames normais, sem causas orgânicas evidentes', correta: true },
          { id: 'c', texto: 'Anemia como causa principal', correta: false },
          { id: 'd', texto: 'Arritmia cardíaca grave', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exames normais suportam o diagnóstico psiquiátrico, excluindo tireoidopatias ou problemas cardíacos como causas primárias [1,2,8].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames complementares, formule sua hipótese diagnóstica.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Transtorno de pânico', correta: true },
          { id: 'b', texto: 'Hipertireoidismo subclínico', correta: false },
          { id: 'c', texto: 'Transtorno de ansiedade generalizada isolado', correta: false },
          { id: 'd', texto: 'Ataque cardíaco recorrente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Ataques recorrentes e inesperados com preocupação persistente caracterizam o transtorno de pânico segundo DSM-5 [1,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano de tratamento inicial, considerando evidências.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação e retorno em 6 meses', correta: false },
          { id: 'b', texto: 'Terapia cognitivo-comportamental (TCC) isolada', correta: false },
          { id: 'c', texto: 'Inibidor seletivo de recaptação de serotonina (ISRS) + TCC', correta: true },
          { id: 'd', texto: 'Benzodiazepínicos em dose alta contínua', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Combinação de ISRS (ex.: sertralina) e TCC é o tratamento de primeira linha, com evidência nível Ia [1,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'A paciente retorna em 3 meses após início de sertralina 50mg/dia e TCC. Relata redução de 70% nos ataques, com PDSS melhorando de 18 para 6.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e monitorar a cada 3 meses', correta: true },
          { id: 'b', texto: 'Suspender medicação imediatamente', correta: false },
          { id: 'c', texto: 'Aumentar dose de ISRS', correta: false },
          { id: 'd', texto: 'Encaminhar para psiquiatra de emergência', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resposta positiva requer manutenção por pelo menos 6-12 meses, com monitoramento periódico [1,10].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 35 anos com transtorno de pânico diagnosticado após avaliação completa, tratado com ISRS e TCC, com boa evolução.',
    diagnosticoFinal: 'Transtorno de pânico (CID-11: 6B01)',
    tratamentoRealizado: 'Sertralina 50-100mg/dia + Terapia cognitivo-comportamental semanal por 12 semanas',
    evolucao: 'Redução significativa na frequência de ataques e melhora na qualidade de vida após 3 meses; manutenção do tratamento por 1 ano.',
    licoesPrincipais: [
      'Ataques de pânico são caracterizados por sintomas súbitos e intensos, com preocupação persistente sobre recorrência [1,2].',
      'Excluir causas orgânicas com exames básicos é essencial antes do diagnóstico psiquiátrico [8,9].',
      'Tratamento de primeira linha combina farmacoterapia (ISRS) e psicoterapia (TCC), com evidência de eficácia [1,10].',
      'Rastreamento em atenção primária melhora desfechos em populações de risco [7,8].',
      'Monitoramento regular previne recaídas e comorbidades como depressão [10].'
    ],
    errosComuns: [
      'Confundir com causas cardíacas sem exame físico e ECG, levando a investigações desnecessárias.',
      'Iniciar benzodiazepínicos como monoterapia, aumentando risco de dependência [1].',
      'Subestimar impacto funcional, atrasando encaminhamento para TCC.',
      'Não avaliar comorbidades como TAG ou depressão, comuns em 50% dos casos [2].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar sintomas e critérios diagnósticos do transtorno de pânico segundo DSM-5.',
    'Diferenciar transtorno de pânico de condições orgânicas simuladoras.',
    'Aplicar recomendações de tratamento baseadas em evidências para transtorno de pânico.',
    'Avaliar resposta ao tratamento e planejar seguimento em atenção primária.'
  ],
  competencias: [
    'Realizar anamnese psiquiátrica focada em transtornos de ansiedade.',
    'Interpretar exames complementares para exclusão diferencial.',
    'Prescrever e monitorar psicofármacos em contexto primário.',
    'Promover abordagens integradas (farmacológica e psicoterapêutica).'
  ],
  doencasRelacionadas: ['transtorno-panico'],
  medicamentosRelacionados: [],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-007', 'ref-008', 'ref-009', 'ref-010'],
  tags: ['ansiedade', 'pânico', 'saúde mental', 'atenção primária', 'TCC', 'ISRS']
};