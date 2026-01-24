import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DISLIP_car_001: CasoClinico = {
  id: 'caso-dislipidemia-alto-risco-001',
  titulo: 'Dislipidemia em Paciente com Alto Risco Cardiovascular',
  subtitulo: 'Homem de meia-idade com fatores de risco múltiplos apresenta para check-up anual',
  categoria: 'cardiovascular',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João da Silva',
      idade: 52,
      sexo: 'M',
      profissao: 'Comerciante',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou me sentindo cansado ultimamente e tenho dores no peito de vez em quando.',
    historiaDoencaAtual: 'Paciente relata fadiga progressiva nos últimos 6 meses, associada a episódios de dor torácica atípica, irradiada para o braço esquerdo, desencadeada por esforço moderado e aliviada com repouso. Nega dispneia, palpitações ou sudorese. Fuma 20 cigarros/dia há 30 anos. Histórico de hipertensão arterial diagnosticada há 5 anos, em tratamento irregular com losartana 50 mg/dia. Familiar: pai com infarto agudo do miocárdio aos 48 anos. Dieta rica em gorduras, sedentário.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona tabagismo crônico e dieta inadequada. O que deseja investigar?',
        dicas: ['Considere fatores de risco CV, hábitos de vida e história familiar']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'História familiar de doença cardiovascular precoce', correta: true },
          { id: 'c', texto: 'Uso de suplementos alimentares', correta: false },
          { id: 'd', texto: 'Atividades recreativas', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História familiar de DAC precoce eleva o risco CV e indica necessidade de rastreamento intensivo [1,11].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história familiar é crucial para estratificação de risco.',
        incorreto: 'Priorize fatores de risco familiar para avaliação de dislipidemia.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa paciente eutrófico, mas com circunferência abdominal aumentada. Achados principais:',
        dados: {
          'PA': '148/92 mmHg',
          'FC': '82 bpm',
          'IMC': '28.5 kg/m²',
          'Circunferência abdominal': '102 cm',
          'Xantomas': 'Ausentes'
        },
        dicas: ['Note a hipertensão e obesidade abdominal como fatores de risco']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante para risco CV?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'FC 82 bpm', correta: false },
          { id: 'b', texto: 'PA 148/92 mmHg', correta: true },
          { id: 'c', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'd', texto: 'Circunferência abdominal 102 cm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hipertensão arterial não controlada é fator de risco majoritário para eventos CV em dislipidêmicos [3,11].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita perfil lipídico e outros exames. Resultados:',
        dados: {
          'Colesterol total': '248 mg/dL',
          'HDL': '35 mg/dL',
          'LDL': '160 mg/dL',
          'Triglicerídeos': '220 mg/dL',
          'Glicemia de jejum': '112 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta o perfil lipídico?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Dislipidemia normais', correta: false },
          { id: 'b', texto: 'Hipercolesterolemia com baixo HDL e alto LDL', correta: true },
          { id: 'c', texto: 'Hipertrigliceridemia isolada', correta: false },
          { id: 'd', texto: 'Perfil lipídico ideal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'LDL > 130 mg/dL e HDL < 40 mg/dL em homem com múltiplos fatores de risco indicam dislipidemia de alto risco [1,11,12].',
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
          { id: 'a', texto: 'Dislipidemia primária de baixo risco', correta: false },
          { id: 'b', texto: 'Dislipidemia com alto risco CV (escore SCORE > 5%)', correta: true },
          { id: 'c', texto: 'Dislipidemia secundária a hipotireoidismo', correta: false },
          { id: 'd', texto: 'Hipercolesterolemia familiar', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Presença de tabagismo, HAS, obesidade e história familiar eleva o risco global CV, justificando rastreamento e intervenção [3,5,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial, considerando diretrizes brasileiras.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação dietética por 6 meses', correta: false },
          { id: 'b', texto: 'Estatinas em dose moderada + cessação tabágica', correta: true },
          { id: 'c', texto: 'Fibratos como primeira linha', correta: false },
          { id: 'd', texto: 'Sem intervenção farmacológica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em alto risco CV, estatinas são indicadas para redução de LDL < 70 mg/dL, além de medidas não farmacológicas [1,11,12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após adesão ao tratamento. LDL 95 mg/dL, PA 130/85 mmHg, parou de fumar.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter estatinas e monitorar anualmente', correta: true },
          { id: 'b', texto: 'Aumentar dose de estatina', correta: false },
          { id: 'c', texto: 'Suspender tratamento', correta: false },
          { id: 'd', texto: 'Encaminhar para cardiologia imediata', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resposta adequada ao tratamento em alto risco requer manutenção e rastreamento anual [11,12].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com dislipidemia e múltiplos fatores de risco CV foi diagnosticado e tratado com sucesso inicial, enfatizando prevenção primária.',
    diagnosticoFinal: 'Dislipidemia mista com alto risco cardiovascular (escore SCORE 8%)',
    tratamentoRealizado: 'Sinvastatina 20 mg/dia, orientação dietética, cessação tabágica e exercício aeróbico 150 min/semana',
    evolucao: 'Em 3 meses, melhora nos lipídios e adesão ao tratamento, sem eventos CV',
    licoesPrincipais: [
      'Rastreie dislipidemia em adultos ≥40 anos ou com fatores de risco [11,12]',
      'Calcule escore de risco global para guiar terapia [1,3]',
      'Estatinas são primeira linha em alto risco CV, visando LDL <70 mg/dL [1,11]',
      'Integre mudanças de estilo de vida para redução sustentável de risco [5,12]',
      'História familiar precoce eleva estratificação de risco [3,11]'
    ],
    errosComuns: [
      'Subestimar risco em pacientes com múltiplos fatores, optando por observação [11]',
      'Não calcular escore CV, levando a subtratamento [1,3]',
      'Ignorar tabagismo como modificador de risco majoritário [5]',
      'Prescrever estatinas sem avaliação basal de função hepática [12]'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco para dislipidemia e eventos CV',
    'Interpretar perfil lipídico e estratificar risco global',
    'Aplicar diretrizes para tratamento farmacológico e não farmacológico',
    'Planejar acompanhamento em pacientes de alto risco'
  ],
  competencias: [
    'Avaliação de risco cardiovascular',
    'Prescrição de hipolipemiantes',
    'Orientação em mudanças de estilo de vida'
  ],
  doencasRelacionadas: ['dislipidemia'],
  medicamentosRelacionados: ['C10AA01', 'C10AB05', 'C10BA02'],
  calculadorasRelacionadas: ['SCORE', 'Framingham'],
  referencias: ['ref-001', 'ref-003', 'ref-005', 'ref-011', 'ref-012'],
  tags: ['dislipidemia', 'risco cardiovascular', 'prevenção primária', 'estatinas', 'tabagismo']
};