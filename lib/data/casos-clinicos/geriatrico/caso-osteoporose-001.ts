import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_OSTEOPOROSE_ger_001: CasoClinico = {
  id: 'caso-osteoporose-001',
  titulo: 'Osteoporose com Fratura Vertebral em Mulher Pós-Menopausa',
  subtitulo: 'Paciente idosa com dor lombar após queda, suspeita de fratura osteoporótica',
  categoria: 'geriatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 72,
      sexo: 'F',
      profissao: 'Aposentada (ex-dona de casa)',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Dor forte nas costas que começou depois de uma queda em casa há 3 dias',
    historiaDoencaAtual: 'Paciente relata que escorregou no banheiro e caiu de pé, sentindo dor intensa na região lombar imediatamente após o trauma. A dor é contínua, piora com movimentos e ao ficar em pé, irradiando para as pernas. Nega perda de força ou dormência, mas refere dificuldade para caminhar. Histórico de menopausa aos 48 anos, sem reposição hormonal. Fuma 1 maço/dia há 40 anos, consome álcool socialmente. Nega uso de corticoides crônicos, mas toma diuréticos para hipertensão há 5 anos. Antecedente de fratura de punho aos 65 anos após queda similar. Peso 55 kg, altura 1,52 m (refere ter encolhido 5 cm nos últimos 10 anos).'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona histórico familiar de fraturas em tias idosas e baixa ingestão de laticínios. O que deseja investigar mais?',
        dicas: ['Fatores de risco como tabagismo, menopausa precoce, fraturas prévias e uso de medicamentos']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para avaliar o risco de osteoporose neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Fratura prévia e tabagismo', correta: true },
          { id: 'c', texto: 'Dieta vegetariana', correta: false },
          { id: 'd', texto: 'Atividade sexual', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Fraturas prévias e tabagismo são fatores de risco majoritários para osteoporose e fraturas [3,11,12].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Esses fatores elevam o risco de fratura osteoporótica.',
        incorreto: 'Priorize fatores de risco estabelecidos para osteoporose.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa cifose dorsal leve, perda de altura, sensibilidade à palpação lombar em T12-L1, sem déficit neurológico. Sinais vitais: PA 140/85 mmHg, FC 76 bpm, FR 16 irpm, SatO2 96% em ar ambiente, IMC 23,8 kg/m².',
        dados: {
          'PA': '140/85 mmHg',
          'FC': '76 bpm',
          'FR': '16 irpm',
          'IMC': '23,8 kg/m²',
          'Altura atual': '1,52 m (perda de 5 cm)'
        },
        dicas: ['Observe sinais de fragilidade óssea como cifose e perda de altura']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de osteoporose?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 140/85 mmHg', correta: false },
          { id: 'b', texto: 'Perda de altura e cifose', correta: true },
          { id: 'c', texto: 'Sensibilidade lombar', correta: false },
          { id: 'd', texto: 'IMC 23,8 kg/m²', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Perda de altura >4 cm e cifose indicam fraturas vertebrais compressivas por osteoporose [3,11].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais e densitometria. Resultados laboratoriais e DXA:',
        dados: {
          'Cálcio sérico': '9,2 mg/dL (normal)',
          'Fósforo': '3,5 mg/dL (normal)',
          'Vitamina D 25-OH': '18 ng/mL (deficiência)',
          'Paratormônio (PTH)': '45 pg/mL (normal)',
          'Creatinina': '0,8 mg/dL',
          'TFGe': '75 mL/min/1.73m²',
          'DXA coluna lombar T-score': '-3,2',
          'DXA fêmur proximal T-score': '-2,7'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta os resultados da DXA?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Osteopenia isolada', correta: false },
          { id: 'b', texto: 'Osteoporose confirmada com alto risco de fratura', correta: true },
          { id: 'c', texto: 'Densidade óssea normal', correta: false },
          { id: 'd', texto: 'Secundária a hiperparatireoidismo', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'T-score ≤ -2,5 na DXA confirma osteoporose; deficiência de vitamina D agrava o risco [1,2,3,11].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames, você considera o diagnóstico diferencial incluindo fratura traumática vs. osteoporótica.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Fratura vertebral osteoporótica em mulher pós-menopausa', correta: true },
          { id: 'b', texto: 'Fratura por trauma de alta energia', correta: false },
          { id: 'c', texto: 'Osteoporose secundária a doença renal', correta: false },
          { id: 'd', texto: 'Espondilolistese degenerativa', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Combinação de T-score ≤ -2,5, fratura de baixa trauma e fatores de risco confirma osteoporose com fratura [3,11,12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Você planeja o manejo inicial, incluindo alívio da dor, suplementação e terapia anti-reabsortiva.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas analgésicos e repouso por 6 semanas', correta: false },
          { id: 'b', texto: 'Suplementação de vitamina D + bifosfonato oral', correta: true },
          { id: 'c', texto: 'Teriparatida subcutânea imediata', correta: false },
          { id: 'd', texto: 'Repouso absoluto sem medicação óssea', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Para osteoporose com fratura, bifosfonatos (ex.: alendronato) e correção de vitamina D são recomendados [11,12,13,14].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, a dor lombar melhorou 80%, sem novas fraturas. DXA de controle não disponível ainda, mas paciente aderente à terapia e exercícios.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento, suplementação e retorno em 6 meses com FRAX reavaliação', correta: true },
          { id: 'b', texto: 'Suspender bifosfonato por melhora sintomática', correta: false },
          { id: 'c', texto: 'Intensificar para denosumabe', correta: false },
          { id: 'd', texto: 'Encaminhar para cirurgia vertebral', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Monitoramento anual ou bienal com DXA em alto risco; manter terapia anti-reabsortiva por 3-5 anos [11,12,14].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 72 anos com fratura vertebral osteoporótica confirmada por DXA, tratada com bifosfonato e suplementação, com boa evolução.',
    diagnosticoFinal: 'Osteoporose pós-menopausa com fratura vertebral (CID-11: CA23)',
    tratamentoRealizado: 'Alendronato 70 mg/semana VO, colecalciferol 1000 UI/dia, analgésicos (paracetamol), orientação para exercícios de fortalecimento e cessação tabágica.',
    evolucao: 'Melhora da dor em 3 meses, ganho de mobilidade, sem complicações. Retorno agendado para monitoramento.',
    licoesPrincipais: [
      'Rastreie osteoporose em mulheres ≥65 anos pós-menopausa com DXA se houver fatores de risco [11,12,13].',
      'Fraturas de baixa trauma justificam diagnóstico de osteoporose mesmo sem DXA prévia [3,11].',
      'Terapia com bifosfonatos reduz risco de novas fraturas em 40-50% em pacientes com fratura vertebral [11,14].',
      'Corrija deficiência de vitamina D para otimizar resposta ao tratamento anti-osteoporótico [3,12].',
      'Use FRAX para estratificação de risco e decisão terapêutica [3,11].'
    ],
    errosComuns: [
      'Subestimar fraturas de baixa energia como traumáticas simples, sem investigar osteoporose [11].',
      'Iniciar tratamento sem correção de vitamina D, reduzindo eficácia da terapia [3,12].',
      'Não orientar medidas não farmacológicas como exercícios e dieta rica em cálcio [12,13].',
      'Atrasar DXA em pacientes com múltiplos fatores de risco, perdendo oportunidade de prevenção [13,14].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e sinais clínicos de osteoporose em idosos.',
    'Interpretar resultados de DXA e FRAX para diagnóstico e estratificação de risco.',
    'Aplicar diretrizes para tratamento farmacológico e não farmacológico da osteoporose com fratura.',
    'Reconhecer a importância do acompanhamento para prevenir novas fraturas.'
  ],
  competencias: ['Avaliação geriátrica integral', 'Diagnóstico de doenças metabólicas ósseas', 'Prescrição de terapia anti-reabsortiva', 'Educação em saúde para prevenção de quedas'],
  doencasRelacionadas: ['osteoporose'],
  medicamentosRelacionados: ['M05BA01', 'M05BB05', 'H05AA02'],
  calculadorasRelacionadas: ['FRAX'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-011', 'ref-012', 'ref-013', 'ref-014'],
  tags: ['osteoporose', 'fratura vertebral', 'geriatria', 'pós-menopausa', 'DXA', 'bifosfonatos']
};