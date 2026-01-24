import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_NEUROPATIA_neu_001: CasoClinico = {
  id: 'caso-neuropatia-periferica-diabetica-001',
  titulo: 'Neuropatia Periférica em Paciente com Diabetes Tipo 2',
  subtitulo: 'Paciente de 55 anos relata formigamento e dor nos membros inferiores',
  categoria: 'neurologico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'José Carlos Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Formigamento e queimação nos pés há 3 meses, pior à noite',
    historiaDoencaAtual: 'Paciente com diagnóstico de diabetes mellitus tipo 2 há 8 anos, em tratamento irregular com metformina. Relata progressão de parestesias simétricas nos pés e pernas distais, associadas a dor em queimação, sem perda de força ou incontinência. Nega trauma recente nos pés. Usa calçados inadequados no trabalho. Histórico de hipertensão arterial e dislipidemia controlados.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona adesão irregular ao tratamento antidiabético e relata tabagismo atual de 20 cigarros/dia. Nega álcool excessivo ou uso de drogas ilícitas.',
        dicas: ['Investigue controle glicêmico, hábitos e fatores de risco para complicações diabéticas']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o quadro atual?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de neuropatia', correta: false },
          { id: 'b', texto: 'Adesão ao tratamento antidiabético e controle glicêmico', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'Viagens recentes ao exterior', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O controle glicêmico inadequado é o principal fator de risco para neuropatia periférica diabética [1,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! O controle glicêmico é essencial para prevenir e gerenciar a NPD.',
        incorreto: 'Priorize fatores relacionados ao diabetes, como adesão terapêutica.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa: PA 148/92 mmHg, FC 85 bpm, FR 16 irpm, IMC 29.8 kg/m². Glicemia capilar 212 mg/dL. Nos pés: perda de sensibilidade à dor e vibração distal, reflexos aquileus diminuídos, pulsos pediosos presentes, sem úlceras visíveis.',
        dicas: ['Realize exame neurossensorial dos pés com monofilamento e diapasão']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS indicativo de neuropatia periférica?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada', correta: false },
          { id: 'b', texto: 'Perda de sensibilidade distal nos pés', correta: true },
          { id: 'c', texto: 'IMC 29.8 kg/m²', correta: false },
          { id: 'd', texto: 'Glicemia capilar 212 mg/dL', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A perda sensorial simétrica distal é clássica da NPD, detectada por monofilamento 10g ou diapasão [1,2].',
        pontos: 15
      },
      feedback: {
        correto: 'Excelente! O exame dos pés é crucial para rastreamento de NPD.',
        incorreto: 'Foco no exame neurológico periférico, especialmente sensibilidade.'
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Resultados laboratoriais: Glicemia de jejum 178 mg/dL, HbA1c 9.1%, Creatinina 0.9 mg/dL, TFG e 89 mL/min/1.73m², Colesterol total 238 mg/dL, LDL 142 mg/dL, HDL 40 mg/dL, Triglicerídeos 210 mg/dL. Eletromiografia sugere polineuropatia sensitivo-motora axonal.',
        dicas: ['Avalie HbA1c para controle glicêmico e perfil lipídico']
      },
      pergunta: {
        enunciado: 'Como interpretar esses resultados no contexto da NPD?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Controle glicêmico adequado sem complicações', correta: false },
          { id: 'b', texto: 'DM2 descontrolado com risco de complicações microvasculares', correta: true },
          { id: 'c', texto: 'Apenas dislipidemia isolada', correta: false },
          { id: 'd', texto: 'Insuficiência renal crônica estágio 3', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'HbA1c >7% indica controle inadequado, acelerando NPD; EMG confirma polineuropatia [1,3].',
        pontos: 15
      },
      feedback: {
        correto: 'Perfeito! A HbA1c elevada reforça a necessidade de otimização terapêutica.',
        incorreto: 'A HbA1c 9.1% sugere descontrole glicêmico contribuinte para neuropatia.'
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e exames, formule a hipótese diagnóstica principal.',
        dicas: ['Considere prevalência de NPD em DM2 e métodos de rastreamento']
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Neuropatia periférica diabética', correta: true },
          { id: 'b', texto: 'Neuropatia alcoólica', correta: false },
          { id: 'c', texto: 'Espondilose lombar com radiculopatia', correta: false },
          { id: 'd', texto: 'Deficiência de vitamina B12', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas simétricos distais em paciente com DM2 descontrolado confirmam NPD [1,2,3].',
        pontos: 20
      },
      feedback: {
        correto: 'Correto! NPD é comum em 30-50% dos diabéticos.',
        incorreto: 'Exclua diagnósticos diferenciais, mas NPD é o mais provável aqui.'
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Elabore o plano inicial: otimize controle glicêmico, inicie analgesia neuropática e eduque sobre cuidados com os pés.',
        dicas: ['Priorize metformina, inibidores SGLT2 para benefício CV e gabapentinoides para dor']
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas educação e monitoramento por 6 meses', correta: false },
          { id: 'b', texto: 'Metformina + gabapentina + cuidados podais', correta: true },
          { id: 'c', texto: 'Insulina isolada sem analgesia', correta: false },
          { id: 'd', texto: 'AINEs para dor + estatina', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Otimização glicêmica com metformina, analgesia com gabapentinoides e rastreamento anual de pés [1,2,14].',
        pontos: 20
      },
      feedback: {
        correto: 'Ótimo! Abordagem multifacetada é essencial na NPD.',
        incorreto: 'Inclua analgesia específica para dor neuropática e cuidados preventivos.'
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, paciente retorna: HbA1c 7.5%, PA 135/85 mmHg, redução da dor (escala VAS de 8 para 4). Sem novas lesões nos pés. Cessou tabagismo.',
        dicas: ['Avalie resposta ao tratamento e ajuste periodicidade']
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e retornar em 3-6 meses para rastreamento', correta: true },
          { id: 'b', texto: 'Intensificar analgesia imediatamente', correta: false },
          { id: 'c', texto: 'Suspender metformina por melhora', correta: false },
          { id: 'd', texto: 'Encaminhar para neurologista urgente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora com otimização glicêmica; rastreamento anual ou mais frequente em alto risco [1,6].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Acompanhamento regular previne complicações como úlceras.',
        incorreto: 'Com melhora, mantenha e monitore; não descontinuar prematuramente.'
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com DM2 apresenta NPD confirmada por exame clínico e EMG. Otimização glicêmica e analgesia resultam em melhora sintomática sem complicações agudas.',
    diagnosticoFinal: 'Neuropatia Periférica Diabética (CID-11: CA23)',
    tratamentoRealizado: 'Ajuste de metformina para 2g/dia + dapagliflozina 10mg/dia + gabapentina 300mg 3x/dia + estatina + educação para cuidados podais e cessação tabágica.',
    evolucao: 'Após 6 meses, HbA1c 7.0%, dor controlada, sensibilidade preservada, sem úlceras. Retorno semestral.',
    licoesPrincipais: [
      'Rastreamento anual de NPD com monofilamento e diapasão é essencial em todos os diabéticos [1,2].',
      'Controle glicêmico rigoroso (HbA1c <7%) retarda progressão da neuropatia [3].',
      'Dor neuropática responde melhor a gabapentinoides ou antidepressivos que a AINEs [14].',
      'Prevenção de úlceras envolve exame dos pés e calçados adequados [6,7].',
      'Tabagismo agrava complicações microvasculares; cessação é prioritária [5].'
    ],
    errosComuns: [
      'Subestimar sintomas iniciais como "normais" no DM, atrasando rastreamento.',
      'Prescrever analgésicos opioides em primeira linha para dor neuropática, ignorando evidências.',
      'Não realizar exame físico dos pés rotineiramente, aumentando risco de amputações.',
      'Focar apenas em glicemia sem abordar analgesia e educação preventiva.'
    ]
  },

  objetivosAprendizagem: [
    'Identificar sintomas e realizar rastreamento de neuropatia periférica diabética.',
    'Interpretar exames complementares para confirmar NPD em contexto de DM2.',
    'Formular plano terapêutico multifacetado, incluindo analgesia e prevenção de complicações.',
    'Compreender o impacto do controle glicêmico na progressão da neuropatia.'
  ],
  competencias: [
    'Avaliação neurológica em atenção primária',
    'Manejo de complicações crônicas do diabetes',
    'Educação em saúde para prevenção de úlceras diabéticas'
  ],
  doencasRelacionadas: ['neuropatia-periferica-diabetica'],
  medicamentosRelacionados: ['N03AX16', 'N06AX21', 'A10BD13'],
  calculadorasRelacionadas: ['calculadora-hba1c', 'calculadora-tfge'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-005', 'ref-006', 'ref-007', 'ref-014'],
  tags: ['diabetes', 'neuropatia', 'pé diabético', 'dor crônica', 'rastreamento']
};