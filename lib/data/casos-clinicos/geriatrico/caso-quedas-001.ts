import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_QUEDAS_ger_001: CasoClinico = {
  id: 'caso-quedas-recorrentes-001',
  titulo: 'Quedas Recorrentes em Idosa com Tontura ao Levantar',
  subtitulo: 'Caso de idosa de 72 anos com episódios frequentes de quedas associadas a hipotensão ortostática',
  categoria: 'geriatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria de Oliveira',
      idade: 72,
      sexo: 'F',
      profissao: 'Aposentada (ex-doméstica)',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Doutor, eu vivo caindo, já quebrei o braço mês passado e agora fico tonta toda vez que me levanto da cama.',
    historiaDoencaAtual: 'Paciente refere três episódios de quedas nos últimos dois meses, todos ocorrendo ao se levantar da posição supina ou sentada. Apresenta tontura pré-síncope, visão embaçada e fraqueza nas pernas por 10-20 segundos. Nega perda de consciência, trauma craniano ou sangramento. Usa losartana 50mg e hidroclorotiazida 25mg para hipertensão há 5 anos, além de alprazolam 0,5mg ocasionalmente para ansiedade. Histórico de diabetes tipo 2 controlado com metformina.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente descreve os episódios como súbitos, relacionados à mudança postural, sem cefaleia ou sintomas neurológicos focais. Relata uso de múltiplos medicamentos e desidratação ocasional devido a baixa ingestão hídrica.',
        dicas: ['Investigue medicamentos hipotensores, sintomas posturais e fatores de risco para quedas em idosos']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o diagnóstico diferencial de quedas recorrentes?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Uso de medicamentos anti-hipertensivos e diuréticos', correta: true },
          { id: 'c', texto: 'Dieta vegetariana', correta: false },
          { id: 'd', texto: 'Atividade física regular', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Medicamentos hipotensores como losartana e hidroclorotiazida são causas comuns de hipotensão ortostática em idosos, aumentando o risco de quedas [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Medicamentos são um fator modificável chave.',
        incorreto: 'Priorize fatores relacionados à mudança postural e medicamentos.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'No exame físico, você realiza medição de pressão arterial em posição supina e ortostática após 3 minutos em pé. Achados incluem:',
        dados: {
          'PA supina': '140/80 mmHg',
          'PA ortostática': '110/70 mmHg (queda de 30/10 mmHg)',
          'FC supina': '72 bpm',
          'FC ortostática': '85 bpm',
          'FR': '16 irpm',
          'IMC': '26.5 kg/m²',
          'Exame neurológico': 'Sem déficits focais, marcha instável'
        },
        dicas: ['Observe a queda significativa na PA ao ortostatismo, definidora de HO']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS indicativo de hipotensão ortostática?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC 26.5 kg/m²', correta: false },
          { id: 'b', texto: 'Queda de PA sistólica ≥20 mmHg ao ortostatismo', correta: true },
          { id: 'c', texto: 'FC supina 72 bpm', correta: false },
          { id: 'd', texto: 'Marcha instável isolada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Definição de HO: redução ≥20 mmHg na PA sistólica ou ≥10 mmHg na diastólica em 3 minutos [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para descartar causas secundárias. Resultados laboratoriais:',
        dados: {
          'Hemoglobina': '12.5 g/dL',
          'Creatinina': '0.9 mg/dL',
          'TFGe': '75 mL/min/1.73m²',
          'Glicemia de jejum': '128 mg/dL',
          'Sódio': '135 mEq/L',
          'Potássio': '4.2 mEq/L',
          'ECG': 'Ritmo sinusal, sem alterações isquêmicas'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar estes resultados no contexto de quedas?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Anemia grave como causa principal', correta: false },
          { id: 'b', texto: 'Função renal preservada, sem hiponatremia significativa', correta: true },
          { id: 'c', texto: 'Diabetes descontrolado isolado', correta: false },
          { id: 'd', texto: 'Arritmia ventricular', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exames normais ou levemente alterados sugerem HO primária ou medicamentosa, sem causas graves como insuficiência renal ou eletrólitos alterados [3,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e exames, a hipótese principal é hipotensão ortostática como causa das quedas recorrentes.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipotensão ortostática neurogênica secundária a medicamentos', correta: true },
          { id: 'b', texto: 'Vertigem periférica', correta: false },
          { id: 'c', texto: 'Doença de Parkinson inicial', correta: false },
          { id: 'd', texto: 'Anemia por deficiência de ferro', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas posturais, queda de PA confirmada e uso de anti-hipertensivos confirmam HO, associada a 30% de quedas em idosos >75 anos [3,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Você planeja intervenções não farmacológicas e ajustes medicamentosos para prevenir novas quedas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica INICIAL MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Aumentar dose de anti-hipertensivos', correta: false },
          { id: 'b', texto: 'Medidas não farmacológicas: hidratação, meias de compressão e redução de diuréticos', correta: true },
          { id: 'c', texto: 'Iniciar midodrina imediatamente', correta: false },
          { id: 'd', texto: 'Encaminhar para neurologia sem ajustes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tratamento inicial de HO em idosos prioriza não farmacológico: ingestão hídrica >2L/dia, compressão elástica e otimização de medicamentos [5,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em retorno após 1 mês, a paciente relata ausência de quedas, PA ortostática estável em 130/78 mmHg, com adesão às medidas não farmacológicas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter medidas e reavaliar em 3 meses', correta: true },
          { id: 'b', texto: 'Iniciar terapia farmacológica agressiva', correta: false },
          { id: 'c', texto: 'Solicitar RM de crânio', correta: false },
          { id: 'd', texto: 'Suspender todos os medicamentos', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Com melhora clínica, manter rastreamento anual em idosos com risco, conforme diretrizes [7,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Idosa com quedas recorrentes diagnosticada com hipotensão ortostática secundária a medicamentos, tratada com ajustes não farmacológicos, evoluindo sem novos episódios.',
    diagnosticoFinal: 'Hipotensão ortostática (CID-11: CA23) associada a quedas recorrentes',
    tratamentoRealizado: 'Redução de hidroclorotiazida, orientação para hidratação (2-3L/dia), uso de meias de compressão, exercícios de equilíbrio e educação sobre mudanças posturais lentas.',
    evolucao: 'Paciente sem quedas em 6 meses de seguimento, PA controlada, qualidade de vida melhorada, sem complicações.',
    licoesPrincipais: [
      'Rastreie HO em idosos ≥65 anos com quedas ou tontura, medindo PA supina e ortostática [1,7].',
      'Medicamentos hipotensores são causa comum; otimize doses antes de intervenções farmacológicas [2,9].',
      'Medidas não farmacológicas são primeira linha, reduzindo risco de quedas em até 50% [5,6].',
      'HO aumenta mortalidade em 50%; identificação precoce previne morbidade [3,4].',
      'Avaliação anual em atenção primária para idosos frágeis [7,8].'
    ],
    errosComuns: [
      'Ignorar medição ortostática, atribuindo quedas apenas a idade avançada.',
      'Iniciar vasopressores sem otimizar não farmacológico, aumentando riscos cardiovasculares.',
      'Não revisar polifarmácia, perpetuando HO iatrogênica.',
      'Subestimar impacto em qualidade de vida, sem educação ao paciente.'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais de hipotensão ortostática como causa de quedas em idosos.',
    'Realizar avaliação postural de PA e interpretar resultados conforme critérios diagnósticos.',
    'Aplicar recomendações para manejo inicial não farmacológico de HO.',
    'Entender epidemiologia e prevenção de complicações em atenção primária.'
  ],
  competencias: [
    'Avaliação geriátrica integral',
    'Diagnóstico diferencial de síndromes geriátricas',
    'Prescrição racional em polimedicados',
    'Prevenção de quedas e promoção de mobilidade'
  ],
  doencasRelacionadas: ['hipotensao-ortostatica'],
  medicamentosRelacionados: ['C01CA21', 'H02AA02', 'N04BC01'],
  calculadorasRelacionadas: ['pa-ortostatica', 'risco-quedas'],
  referencias: [
    'ref-001',
    'ref-002',
    'ref-003',
    'ref-004',
    'ref-005',
    'ref-006',
    'ref-007',
    'ref-009'
  ],
  tags: ['quedas recorrentes', 'hipotensao ortostatica', 'idosos', 'rastreamento geriatrico', 'prevencao quedas']
};