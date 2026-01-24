import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_IC_car_001: CasoClinico = {
  id: 'caso-insuficiencia-cardiaca-001',
  titulo: 'Paciente com Dispneia Progressiva e Edema',
  subtitulo: 'Homem idoso com história de hipertensão apresenta descompensação de insuficiência cardíaca',
  categoria: 'cardiovascular',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'José Antonio Pereira',
      idade: 68,
      sexo: 'M',
      profissao: 'Aposentado (ex-pedreiro)',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou com falta de ar e as pernas inchadas há uma semana, piorando à noite.',
    historiaDoencaAtual: 'Paciente relata dispneia progressiva aos esforços moderados, ortopneia com necessidade de dois travesseiros para dormir, e edema bilateral em membros inferiores que piora ao final do dia. Há ganho de peso de 3 kg em 10 dias. História de hipertensão arterial há 15 anos, em uso irregular de enalapril 20 mg/dia. Nega tabagismo atual, mas fumou por 30 anos (20 mações/ano). Diabetes mellitus tipo 2 diagnosticado há 5 anos, controlado com metformina. Sem história prévia de infarto ou outras comorbidades cardiovasculares relatadas. Sintomas iniciaram após episódio de infecção respiratória superior há 15 dias.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona piora dos sintomas após resfriado recente e adesão irregular à medicação anti-hipertensiva.',
        dicas: ['Investigue fatores precipitantes como infecções, não adesão medicamentosa e hábitos como sal na dieta']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o diagnóstico diferencial neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de câncer', correta: false },
          { id: 'b', texto: 'Adesão à medicação anti-hipertensiva', correta: true },
          { id: 'c', texto: 'Vacinação recente contra gripe', correta: false },
          { id: 'd', texto: 'Consumo de álcool semanal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Não adesão à terapia anti-hipertensiva é um fator precipitante comum de descompensação de IC [11,12].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A adesão medicamentosa é crucial no manejo da IC.',
        incorreto: 'Priorize fatores que precipitam descompensação, como não adesão a medicamentos.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa taquicardia, elevação da pressão venosa jugular e estertores crepitantes em bases pulmonares bilaterais.',
        dados: {
          'Pressão Arterial': '160/100 mmHg',
          'Frequência Cardíaca': '92 bpm',
          'Frequência Respiratória': '20 irpm',
          'Saturação de O2': '92% em ar ambiente',
          'Peso': '82 kg (ganho de 3 kg)',
          'Edema': 'Presente em membros inferiores (+++/4)'
        },
        dicas: ['Observe sinais de congestão: edema, estertores e elevação da JVP indicam sobrecarga volêmica']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de insuficiência cardíaca descompensada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pressão arterial 160/100 mmHg', correta: false },
          { id: 'b', texto: 'Edema periférico bilateral +++/4', correta: true },
          { id: 'c', texto: 'Frequência cardíaca 92 bpm', correta: false },
          { id: 'd', texto: 'Saturação de O2 92%', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Edema periférico reflete retenção de líquidos, sinal clássico de congestão em IC descompensada [1,12].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram elevação de biomarcadores e alterações no ECG.',
        dados: {
          'BNP': '850 pg/mL (ref. <100)',
          'NT-proBNP': '2500 pg/mL (ref. <300)',
          'Creatinina': '1.2 mg/dL (ref. 0.6-1.2)',
          'Potássio': '4.2 mEq/L',
          'ECG': 'Ritmo sinusal, hipertrofia ventricular esquerda',
          'Raio-X Tórax': 'Cardiomegalia, sinais de edema pulmonar'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta o BNP elevado?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção bacteriana isolada', correta: false },
          { id: 'b', texto: 'Alta probabilidade de IC como causa da dispneia', correta: true },
          { id: 'c', texto: 'Arritmia supraventricular', correta: false },
          { id: 'd', texto: 'Anemia crônica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'BNP >400 pg/mL em contexto de dispneia tem alta sensibilidade para IC, auxiliando no diagnóstico [12].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, você formula hipóteses. É necessário ecocardiograma para estratificação.',
        dicas: ['Considere IC com fração de ejeção reduzida (HFrEF) dada a hipertensão crônica']
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pneumonia comunitária', correta: false },
          { id: 'b', texto: 'Insuficiência cardíaca descompensada', correta: true },
          { id: 'c', texto: 'Embolia pulmonar', correta: false },
          { id: 'd', texto: 'DPOC descompensada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas de congestão, BNP elevado e história de HAS confirmam IC descompensada [11,12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'O ecocardiograma revela FE 35% (HFrEF). Inicie terapia guideline-directed.',
        dicas: ['Priorize diuréticos para alívio sintomático e IECA/betabloqueadores para prognóstico']
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica INICIAL mais apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas repouso e restrição hídrica', correta: false },
          { id: 'b', texto: 'Furosemida IV + reinício de enalapril', correta: true },
          { id: 'c', texto: 'Apenas betabloqueador oral', correta: false },
          { id: 'd', texto: 'Antibióticos empíricos', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Diurético de alça (furosemida) para descompressão em IC descompensada; IECA para remodelamento [12,13].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após 1 semana de tratamento hospitalar, o paciente é alta com melhora sintomática. Retorna em 1 mês: peso -2 kg, BNP 300 pg/mL, FE 38%.',
        dicas: ['Monitore adesão, peso e sintomas; otimize GDMT']
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento ambulatorial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter terapia e retorno em 3 meses', correta: true },
          { id: 'b', texto: 'Aumentar dose de diurético', correta: false },
          { id: 'c', texto: 'Suspender IECA por tosse', correta: false },
          { id: 'd', texto: 'Encaminhar para transplante imediato', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Paciente estável; monitoramento regular com educação em autocuidado é essencial [11,12].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com IC descompensada por não adesão e infecção precipitante, tratado com diuréticos e otimização de GDMT, evoluindo favoravelmente.',
    diagnosticoFinal: 'Insuficiência Cardíaca Descompensada com Fração de Ejeção Reduzida (HFrEF)',
    tratamentoRealizado: 'Furosemida IV inicial, enalapril 20 mg/dia, carvedilol 6,25 mg BID, restrição salina, educação em autocuidado e monitoramento ambulatorial.',
    evolucao: 'Alta hospitalar em 5 dias com resolução de sintomas; em 1 mês, assintomático em NYHA II, com ganho de FE.',
    licoesPrincipais: [
      'Sintomas como dispneia e edema em pacientes com fatores de risco (HAS, DM) sugerem IC descompensada [12].',
      'BNP/NT-proBNP é útil para diagnóstico diferencial de dispneia em atenção primária [1,12].',
      'Terapia GDMT (IECA, betabloqueadores, diuréticos) melhora prognóstico em HFrEF [11,12].',
      'Educação em adesão e controle de peso é fundamental para prevenção de reinternações [13].',
      'Fatores precipitantes como infecções devem ser identificados e tratados precocemente [11].'
    ],
    errosComuns: [
      'Subestimar sintomas como ortopneia, atrasando diagnóstico de congestão [12].',
      'Não solicitar BNP em dispneia aguda, levando a diagnósticos errôneos como pneumonia isolada.',
      'Iniciar betabloqueadores em descompensação aguda sem estabilização volêmica prévia [12].',
      'Ignorar comorbidades como DM, que agravam IC e requerem manejo integrado [11].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais e sintomas de insuficiência cardíaca descompensada em pacientes de atenção primária.',
    'Interpretar exames complementares como BNP e ecocardiograma no contexto de IC.',
    'Aplicar recomendações de tratamento inicial para IC descompensada conforme guidelines.',
    'Planejar seguimento ambulatorial para otimização terapêutica e prevenção de recidivas.'
  ],
  competencias: [
    'Avaliação clínica cardiovascular',
    'Manejo farmacológico de doenças crônicas',
    'Raciocínio diagnóstico em emergências',
    'Educação em saúde e adesão terapêutica'
  ],
  doencasRelacionadas: ['insuficiencia-cardiaca'],
  medicamentosRelacionados: ['C09XA02', 'C07AG02', 'C03CA01', 'A10BH02'],
  calculadorasRelacionadas: ['NYHA-class', 'CHA2DS2-VASc', 'FRAMINGHAM-HF'],
  referencias: ['ref-001', 'ref-002', 'ref-011', 'ref-012', 'ref-013'],
  tags: ['IC descompensada', 'HFrEF', 'congestão', 'atenção primária', 'SUS']
};