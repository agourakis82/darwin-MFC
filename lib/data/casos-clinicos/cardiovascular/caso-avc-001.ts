import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_AVC_car_001: CasoClinico = {
  id: 'caso-avc-001',
  titulo: 'Déficit Neurológico Agudo em Paciente Idoso',
  subtitulo: 'Homem de 68 anos apresenta fraqueza súbita no lado direito do corpo',
  categoria: 'cardiovascular',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'José Silva',
      idade: 68,
      sexo: 'M',
      profissao: 'Aposentado (ex-motorista de ônibus)',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Doutor, de repente meu braço e perna direitos ficaram fracos, e eu não consigo falar direito',
    historiaDoencaAtual: 'Paciente acordou às 6h com sintomas iniciados há 2 horas. Refere cefaleia leve prévia e episódios de hipertensão não controlada. Nega trauma recente. Histórico de tabagismo (30 maços-ano), hipertensão arterial sistêmica diagnosticada há 10 anos, em uso irregular de enalapril 20mg/dia, e diabetes mellitus tipo 2 há 5 anos, controlado com metformina. Sem história de AVC prévio. Sintomas: fraqueza em hemicorpo direito, afasia expressiva leve e desvio de rima à esquerda.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona picos de pressão arterial matinal e irregularidade no uso de medicamentos. O que deseja investigar?',
        dicas: ['Fatores de risco cardiovascular, horários circadianos de sintomas, adesão medicamentosa']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para estratificar o risco e o timing do evento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de demência', correta: false },
          { id: 'b', texto: 'Horário exato do onset dos sintomas e adesão a anti-hipertensivos', correta: true },
          { id: 'c', texto: 'Dieta recente', correta: false },
          { id: 'd',  texto: 'Atividades recreativas', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O onset circadiano (picos matinais) influencia o AVC isquêmico; adesão medicamentosa afeta controle pressórico [8,9].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! O timing é crucial para janela terapêutica.',
        incorreto: 'Priorize o horário do onset para elegibilidade a reperfusão.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa hemiparesia direita (força 2/5), afasia mista, desvio de rima à esquerda e FACe 3/5. Sinais vitais: PA 180/100 mmHg, FC 92 bpm, FR 18 irpm, SatO2 95% em ar ambiente, Temperatura 36.5°C.',
        dados: {
          'Escala NIHSS': '12 pontos',
          'PA': '180/100 mmHg',
          'FC': '92 bpm',
          'Glicemia capilar': '180 mg/dL'
        },
        dicas: ['Avalie NIHSS para gravidade; controle pressórico inicial sem hipotensão']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS indicativo de AVC agudo e requer ação imediata?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada', correta: false },
          { id: 'b', texto: 'NIHSS 12 pontos com hemiparesia e afasia', correta: true },
          { id: 'c', texto: 'Glicemia 180 mg/dL', correta: false },
          { id: 'd', texto: 'FC 92 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'NIHSS ≥ 4 sugere AVC moderado; sintomas focais neurológicos confirmam suspeita [1,9].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita TC de crânio sem contraste (normal, sem hemorragia) e RM cerebral (hiperintensidade em T2 na artéria cerebral média esquerda). Exames laboratoriais: Glicemia 165 mg/dL, INR 1.0, Plaquetas 250.000/mm³, Creatinina 1.1 mg/dL.',
        dados: {
          'TC Crânio': 'Sem hemorragia aguda',
          'RM Cerebral': 'Infarto isquêmico agudo ACM esquerda',
          'INR': '1.0',
          'Glicemia': '165 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta os exames?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'AVC hemorrágico confirmado', correta: false },
          { id: 'b', texto: 'AVC isquêmico agudo elegível para trombólise', correta: true },
          { id: 'c', texto: 'Migraína com aura', correta: false },
          { id: 'd', texto: 'Hipoglicemia reativa', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'TC normal exclui hemorragia; RM confirma isquemia; janela <4,5h permite alteplase [9].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando história, exame e imagens, formule sua hipótese. Considere fatores de risco e impairment cognitivo potencial.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'AVC isquêmico com risco de VCI', correta: true },
          { id: 'b', texto: 'Encefalopatia hipertensiva', correta: false },
          { id: 'c', texto: 'Convulsão focal', correta: false },
          { id: 'd', texto: 'Demência vascular crônica', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas agudos + imagem confirmam AVC isquêmico; risco de VCI em até 60% dos casos [4,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Paciente dentro da janela de 4,5h. Inicie manejo agudo e planeje reabilitação precoce.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas aspirina e reabilitação tardia', correta: false },
          { id: 'b', texto: 'Trombólise com alteplase + controle pressórico', correta: true },
          { id: 'c', texto: 'Anticoagulação plena imediata', correta: false },
          { id: 'd', texto: 'Cirurgia de descompressão', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Trombólise IV em <4,5h para AVC isquêmico elegível; reabilitação precoce na fase aguda [1,7,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 1 mês, paciente em reabilitação: melhora motora (força 4/5), mas queixas de memória recente. Avaliação neuropsicológica sugere VCI leve. PA controlada 130/80 mmHg.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter reabilitação multidisciplinar e monitorar VCI', correta: true },
          { id: 'b', texto: 'Suspender terapia por melhora', correta: false },
          { id: 'c', texto: 'Iniciar anticolinesterásicos', correta: false },
          { id: 'd', texto: 'Encaminhar apenas para neurologia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Reabilitação contínua e avaliação longitudinal de VCI pós-AVC [4,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com AVC isquêmico tratado com trombólise e reabilitação precoce, evoluindo com recuperação parcial motora e detecção precoce de VCI.',
    diagnosticoFinal: 'Acidente Vascular Cerebral Isquêmico (CID-11: CA23)',
    tratamentoRealizado: 'Trombólise IV com alteplase, aspirina, controle pressórico com enalapril, reabilitação motora e cognitiva multidisciplinar.',
    evolucao: 'Alta hospitalar em 7 dias com NIHSS 4; em 3 meses, independência funcional (mRS 2), mas VCI leve persistente.',
    licoesPrincipais: [
      'Reconhecer sintomas de AVC e agir em <4,5h para trombólise [9].',
      'Iniciar reabilitação precoce na fase aguda para otimizar recuperação [1,7].',
      'Avaliar impairment cognitivo vascular em sobreviventes de AVC [4].',
      'Considerar ritmos circadianos no onset de AVC para prevenção [8].',
      'Manejo multidisciplinar reduz mortalidade e melhora qualidade de vida [9].'
    ],
    errosComuns: [
      'Atraso no diagnóstico por subestimar sintomas focais.',
      'Não considerar janela terapêutica para reperfusão.',
      'Ignorar reabilitação precoce, levando a pior prognóstico.',
      'Falha em screening de VCI pós-AVC, afetando adesão ao tratamento.'
    ]
  },

  objetivosAprendizagem: [
    'Identificar e estratificar AVC isquêmico agudo com base em história e exame.',
    'Aplicar diretrizes para trombólise e reabilitação precoce.',
    'Avaliar e manejar impairment cognitivo vascular pós-AVC.',
    'Integrar fatores epidemiológicos como circadianos no raciocínio clínico.'
  ],
  competencias: [
    'Manejo de emergências cerebrovasculares',
    'Avaliação neurológica e escalas (NIHSS)',
    'Reabilitação multidisciplinar',
    'Prevenção secundária de eventos vasculares'
  ],
  doencasRelacionadas: ['avc'],
  medicamentosRelacionados: ['B01AC06', 'B01AC04', 'C10AA05'],
  calculadorasRelacionadas: ['nihss', 'mrs', 'chads2-vasc'],
  referencias: ['ref-001', 'ref-004', 'ref-007', 'ref-008', 'ref-009'],
  tags: ['avc', 'isquemico', 'reabilitacao', 'vci', 'trombolise', 'circadiano']
};