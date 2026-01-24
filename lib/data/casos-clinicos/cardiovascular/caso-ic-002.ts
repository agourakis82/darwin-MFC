import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_IC_car_002: CasoClinico = {
  id: 'caso-ic-fep-001',
  titulo: 'Insuficiência Cardíaca com Fração de Ejeção Preservada em Paciente Idosa',
  subtitulo: 'Mulher de 72 anos com dispneia progressiva e edema periférico',
  categoria: 'cardiovascular',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira Santos',
      idade: 72,
      sexo: 'F',
      profissao: 'Aposentada (ex-auxiliar de enfermagem)',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Estou com falta de ar e inchaço nas pernas há duas semanas',
    historiaDoencaAtual: 'Paciente refere dispneia aos esforços moderados, como subir escadas, associada a fadiga e ortopneia. Negam dor torácica ou síncope. História de hipertensão arterial sistêmica há 20 anos, em uso irregular de medicação, e diabetes tipo 2 diagnosticado há 10 anos. Apresenta ganho de peso recente de 3 kg, com edema bilateral em membros inferiores. Sem tabagismo atual, mas ex-fumante (20 maços-ano).'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente relata piora dos sintomas à noite e necessidade de dois travesseiros para dormir. Há história de internações por infecções respiratórias no passado.',
        dicas: ['Investigue fatores de risco como hipertensão, diabetes e hábitos; considere sintomas de congestão em IC [11,12].']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o diagnóstico diferencial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Sintomas de congestão e fatores de risco cardiovascular', correta: true },
          { id: 'c', texto: 'Dieta alimentar detalhada', correta: false },
          { id: 'd', texto: 'Atividades recreativas', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas como ortopneia e edema sugerem IC, especialmente com comorbidades como HAS e DM [11,12].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores de risco e sintomas de congestão guiam o raciocínio para IC.',
        incorreto: 'Priorize elementos que apontem para causas cardiovasculares como IC.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa paciente em eupneia relativa, mas com estertores crepitantes basais bilaterais e edema +/4 em membros inferiores. PA 160/90 mmHg, FC 82 bpm, FR 20 irpm, IMC 29.5 kg/m².',
        dados: {
          'PA': '160/90 mmHg',
          'FC': '82 bpm',
          'FR': '20 irpm',
          'IMC': '29.5 kg/m²',
          'Edema': '+/4 bilateral'
        },
        dicas: ['Sinais de congestão como estertores e edema são clássicos de IC descompensada [12].']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de insuficiência cardíaca?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC 29.5 kg/m²', correta: false },
          { id: 'b', texto: 'Estertores crepitantes e edema periférico', correta: true },
          { id: 'c', texto: 'PA 160/90 mmHg', correta: false },
          { id: 'd', texto: 'FC 82 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sinais de congestão pulmonar e periférica indicam IC, mesmo com FE preservada [12].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram BNP elevado e ecocardiograma com FE 55%.',
        dados: {
          'BNP': '450 pg/mL',
          'NT-proBNP': '1200 pg/mL',
          'Creatinina': '1.1 mg/dL',
          'TFGe': '65 mL/min/1.73m²',
          'Ecocardiograma - FE': '55%',
          'Ecocardiograma - Diástole': 'Disfunção diastólica grau II'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar esses resultados laboratoriais e de imagem?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'BNP normal, descartar IC', correta: false },
          { id: 'b', texto: 'IC com FE preservada (HFpEF) confirmada por BNP elevado e disfunção diastólica', correta: true },
          { id: 'c', texto: 'Apenas insuficiência renal', correta: false },
          { id: 'd', texto: 'IC com FE reduzida', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'BNP >400 pg/mL com sintomas e ecocardiograma mostrando FE ≥50% e disfunção diastólica confirmam HFpEF [12].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pneumonia comunitária', correta: false },
          { id: 'b', texto: 'Insuficiência Cardíaca com Fração de Ejeção Preservada (HFpEF)', correta: true },
          { id: 'c', texto: 'Asma brônquica', correta: false },
          { id: 'd', texto: 'Tromboembolismo pulmonar', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Combinação de sintomas de congestão, BNP elevado e ecocardiograma com FE preservada e disfunção diastólica define HFpEF [7,12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento, considerando diretrizes.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada para HFpEF?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas diuréticos', correta: false },
          { id: 'b', texto: 'Inibidor SGLT2 + diurético + otimização de comorbidades', correta: true },
          { id: 'c', texto: 'Betabloqueador isolado', correta: false },
          { id: 'd', texto: 'Insulina para controle glicêmico', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Diretrizes AHA/ACC recomendam SGLT2i como terapia de primeira linha em HFpEF, além de diuréticos para alívio sintomático e controle de HAS/DM [12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, a paciente retorna com melhora sintomática, PA 130/80 mmHg, peso reduzido em 2 kg e BNP 200 pg/mL.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter terapia e reavaliar em 6 meses com ecocardiograma', correta: true },
          { id: 'b', texto: 'Intensificar diuréticos', correta: false },
          { id: 'c', texto: 'Suspender SGLT2i', correta: false },
          { id: 'd', texto: 'Encaminhar para transplante cardíaco', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Em IC estável, monitorar anualmente ou a cada 6-12 meses, com educação em autocuidado [11,12].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de mulher idosa com HFpEF descompensada por não adesão, tratada com otimização farmacológica e controle de comorbidades, evoluindo favoravelmente.',
    diagnosticoFinal: 'Insuficiência Cardíaca com Fração de Ejeção Preservada (HFpEF) NYHA II, associada a HAS e DM2',
    tratamentoRealizado: 'Inibidor SGLT2 (empagliflozina), furosemida, losartana, metformina; orientação dietética e reabilitação cardíaca',
    evolucao: 'Melhora sintomática em 3 meses, sem reinternações; adesão melhorada ao tratamento',
    licoesPrincipais: [
      'HFpEF é comum em idosos com comorbidades como HAS e DM; diagnóstico requer BNP e ecocardiograma [12].',
      'Terapia GDMT inclui SGLT2i para redução de hospitalizações em HFpEF [12].',
      'Controle de comorbidades é essencial para manejo da IC no SUS [11].',
      'Educação em autocuidado reduz descompensações [11,13].',
      'Monitoramento periódico com BNP e ecocardiograma guia o seguimento [12].'
    ],
    errosComuns: [
      'Subestimar HFpEF por FE preservada, confundindo com causas pulmonares [12].',
      'Não solicitar BNP inicial em dispneia com fatores de risco [11].',
      'Ignorar comorbidades como DM, que agravam IC [7].',
      'Prescrever apenas diuréticos sem terapias modificadoras de prognóstico [12].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais e sintomas de IC com FE preservada em atenção primária.',
    'Interpretar exames como BNP e ecocardiograma no diagnóstico de HFpEF.',
    'Aplicar diretrizes para tratamento farmacológico e não farmacológico de IC.',
    'Planejar seguimento e educação do paciente com IC no contexto brasileiro.'
  ],
  competencias: [
    'Avaliação e diagnóstico de doenças cardiovasculares',
    'Manejo terapêutico de insuficiência cardíaca',
    'Raciocínio clínico em pacientes idosos com comorbidades',
    'Educação em saúde e prevenção de descompensações'
  ],
  doencasRelacionadas: ['insuficiencia-cardiaca'],
  medicamentosRelacionados: ['C09XA02', 'C07AG02', 'C03CA01', 'A10BH02'],
  calculadorasRelacionadas: ['bnP-interpretacao', 'fracao-ejecao'],
  referencias: ['ref-007', 'ref-011', 'ref-012'],
  tags: ['IC', 'HFpEF', 'idoso', 'hipertensao', 'diabetes', 'primaria']
};