import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_FA_car_001: CasoClinico = {
  id: 'caso-fibrilacao-atrial-001',
  titulo: 'Rastreamento e Manejo Inicial de Fibrilação Atrial em Idoso',
  subtitulo: 'Paciente idoso com palpitações e fatores de risco cardiovascular',
  categoria: 'cardiovascular',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 68,
      sexo: 'M',
      profissao: 'Aposentado (ex-motorista)',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Sinto o coração "pulando" e fico cansado fácil',
    historiaDoencaAtual: 'Paciente refere episódios intermitentes de palpitações há 2 meses, associados a dispneia aos esforços e fadiga. Nega síncope ou dor torácica. Histórico de hipertensão arterial há 10 anos, em uso de enalapril 20 mg/dia. Fuma 20 cigarros/dia há 40 anos. Nega diabetes ou dislipidemia conhecida. Última consulta de rotina há 1 ano, sem ECG realizado.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona episódios de palpitações irregulares, piorando com estresse. Nega febre ou infecções recentes.',
        dicas: ['Investigue fatores de risco como HAS, tabagismo e histórico familiar de arritmias']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para estratificar o risco?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Histórico de viagens recentes', correta: false },
          { id: 'b', texto: 'Fatores de risco cardiovascular (HAS, tabagismo)', correta: true },
          { id: 'c', texto: 'Dieta alimentar habitual', correta: false },
          { id: 'd', texto: 'Atividade física semanal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Fatores como HAS e tabagismo aumentam o risco de FA e complicações tromboembólicas [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Identificar riscos é essencial para rastreamento.',
        incorreto: 'Priorize fatores de risco cardiovascular no contexto de FA.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você nota pulso irregular, sem déficit neurológico. Medidas vitais incluem:',
        dados: {
          'PA': '148/92 mmHg',
          'FC': '92 bpm (irregular)',
          'FR': '18 irpm',
          'IMC': '28.5 kg/m²',
          'Pulso periférico': 'Irregular, amplitude variável'
        },
        dicas: ['Observe o pulso irregular como sinal clássico de FA']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de arritmia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 148/92 mmHg', correta: false },
          { id: 'b', texto: 'FC 92 bpm irregular', correta: true },
          { id: 'c', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'd', texto: 'FR 18 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Pulso irregular em FC elevada sugere FA paroxística ou persistente [2,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita ECG e exames laboratoriais. O ECG de 12 derivações mostra ritmo irregular sem ondas P, intervalo RR variável. Laboratório:',
        dados: {
          'Hemoglobina': '13.5 g/dL',
          'Creatinina': '1.1 mg/dL',
          'TFGe': '75 mL/min/1.73m²',
          'TSH': '2.5 mUI/L',
          'ECG': 'Fibrilação atrial sem onda P'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar o ECG?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Taquicardia sinusal', correta: false },
          { id: 'b', texto: 'Fibrilação atrial confirmada', correta: true },
          { id: 'c', texto: 'Bloqueio AV de 1º grau', correta: false },
          { id: 'd', texto: 'Extra-sístoles ventriculares', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Ausência de ondas P e ritmo irregular confirmam FA [2,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame e ECG, avalie o risco de complicações.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico e estratificação de risco MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'FA paroxística com CHA2DS2-VASc = 3 (alto risco)', correta: true },
          { id: 'b', texto: 'Flutter atrial com risco baixo', correta: false },
          { id: 'c', texto: 'FA permanente sem risco tromboembólico', correta: false },
          { id: 'd', texto: 'Arritmia sinusal', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Idade ≥65, HAS e sexo masculino dão CHA2DS2-VASc ≥2, indicando anticoagulação [3,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o manejo inicial, considerando controle de frequência e prevenção de AVC.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas betabloqueador para controle de FC', correta: false },
          { id: 'b', texto: 'Betabloqueador + aspirina', correta: false },
          { id: 'c', texto: 'Betabloqueador + anticoagulante oral (ex: apixabana)', correta: true },
          { id: 'd', texto: 'Cardioversão elétrica imediata', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Controle de FC com betabloqueador e anticoagulação para CHA2DS2-VASc ≥2 [2,3,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 1 mês. FC controlada em 70 bpm, em uso de metoprolol e apixabana. Nega sangramentos ou episódios.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e monitorar anualmente', correta: true },
          { id: 'b', texto: 'Suspender anticoagulante', correta: false },
          { id: 'c', texto: 'Encaminhar para ablação', correta: false },
          { id: 'd', texto: 'Intensificar betabloqueador', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Controle adequado; rastreamento anual em idosos com FA [3,8].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 68 anos com FA detectada em rastreamento oportunista, associada a HAS e tabagismo. Iniciado controle de FC e anticoagulação, com boa evolução.',
    diagnosticoFinal: 'Fibrilação atrial paroxística com risco tromboembólico elevado (CHA2DS2-VASc = 3)',
    tratamentoRealizado: 'Metoprolol 50 mg/dia para controle de FC; apixabana 5 mg 2x/dia; cessação tabágica orientada; otimização de HAS com enalapril.',
    evolucao: 'Em 3 meses, FC em repouso 68 bpm, sem recorrências; PA 135/85 mmHg. Paciente orientado sobre adesão e sinais de alerta.',
    licoesPrincipais: [
      'Rastreamento de FA em ≥65 anos com ECG reduz risco de AVC [3,4].',
      'CHA2DS2-VASc ≥2 indica anticoagulação em preferência a antiagregantes [2,9].',
      'Controle de FC <110 bpm em repouso é inicial em FA assintomática [2].',
      'Fatores de risco como HAS e tabagismo devem ser abordados integralmente [1,8].',
      'Monitorização ambulatorial pode confirmar FA paroxística [3].'
    ],
    errosComuns: [
      'Subestimar risco em idosos assintomáticos, ignorando rastreamento [3].',
      'Usar apenas aspirina em vez de anticoagulantes em alto risco [2,9].',
      'Não investigar causas reversíveis como tireoide ou etanol [2].',
      'Atrasar ECG em suspeita de arritmia, perdendo detecção precoce [8].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar sinais de FA na anamnese e exame físico.',
    'Interpretar ECG para diagnóstico de FA e estratificar risco com CHA2DS2-VASc.',
    'Aplicar diretrizes para anticoagulação e controle de frequência.',
    'Reconhecer importância do rastreamento oportunista em atenção primária.'
  ],
  competencias: [
    'Anamnese cardiovascular',
    'Exame físico de pulso e ritmos cardíacos',
    'Interpretação de ECG básico',
    'Estratificação de risco tromboembólico',
    'Prescrição de anticoagulantes em atenção primária'
  ],
  doencasRelacionadas: ['fibrilacao-atrial'],
  medicamentosRelacionados: ['B01AF02', 'C07AB03', 'C09AA02'],
  calculadorasRelacionadas: ['cha2ds2-vasc'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-008', 'ref-009'],
  tags: ['arritmia', 'rastreamento', 'anticoagulacao', 'avc-prevencao', 'idoso']
};