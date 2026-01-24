import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DPOC_res_002: CasoClinico = {
  id: 'caso-dpoc-001',
  titulo: 'Paciente com Dispneia Crônica e História de Tabagismo',
  subtitulo: 'Homem de 55 anos relata falta de ar progressiva e tosse produtiva há anos',
  categoria: 'respiratorio',
  dificuldade: 'iniciante',
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
    queixaPrincipal: 'Estou com falta de ar toda vez que subo uma escada, doutor, e isso piorou nos últimos meses.',
    historiaDoencaAtual: 'Paciente relata dispneia de esforço moderada iniciada há 5 anos, associada a tosse crônica produtiva com escarro mucoide, pior pela manhã. Fuma 1 maço/dia há 35 anos (índice tabágico de 35 maços-ano). Exposição ocupacional a poeira e fumaça de diesel. Nega febre, hemoptise ou perda de peso recente. Sintomas estáveis, sem exacerbações agudas recentes.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona tabagismo prolongado e exposição ocupacional. O que deseja investigar?',
        dicas: ['Considere hábitos tabágicos, sintomas respiratórios e fatores de risco ocupacionais']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de asma', correta: false },
          { id: 'b', texto: 'História de tabagismo e índice tabágico', correta: true },
          { id: 'c', texto: 'Dieta e hábitos alimentares', correta: false },
          { id: 'd', texto: 'Viagens recentes ao exterior', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O tabagismo é o principal fator de risco para DPOC; índice ≥20 maços-ano indica necessidade de investigação [3,4].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! O tabagismo é fator chave no rastreamento de DPOC.',
        incorreto: 'Priorize fatores de risco respiratórios como o tabagismo.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa tórax em barril, murmúrio vesicular diminuído bilateralmente e sibilos difusos. Sem cianose ou uso de musculatura acessória.',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '82 bpm',
          'FR': '18 irpm',
          'SatO2': '94% em ar ambiente',
          'IMC': '26.5 kg/m²'
        },
        dicas: ['Observe sinais de hiperinsuflação e hipoxemia leve']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de doença obstrutiva crônica?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pressão arterial normal', correta: false },
          { id: 'b', texto: 'Sibilos difusos e murmúrio vesicular diminuído', correta: true },
          { id: 'c', texto: 'Frequência cardíaca de 82 bpm', correta: false },
          { id: 'd', texto: 'IMC de 26.5 kg/m²', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Achados como sibilos e hiperinsuflação sugerem limitação ao fluxo aéreo em DPOC [3,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita espirometria com broncodilatador. Resultados mostram obstrução irreversível.',
        dados: {
          'VEF1': '65% do previsto',
          'CVF': '92% do previsto',
          'Relação VEF1/CVF': '0,58 pós-broncodilatador',
          'Hemoglobina': '14.2 g/dL',
          'Gasometria arterial (ar ambiente)': 'pH 7.40, pCO2 42 mmHg, pO2 80 mmHg'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta a espirometria?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Padrão restritivo', correta: false },
          { id: 'b', texto: 'Obstrução fixa compatível com DPOC', correta: true },
          { id: 'c', texto: 'Normal, sem alterações', correta: false },
          { id: 'd', texto: 'Obstrução reversível, sugestiva de asma', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Relação VEF1/CVF <0,70 pós-broncodilatador confirma DPOC [3,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e espirometria, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Asma de início tardio', correta: false },
          { id: 'b', texto: 'DPOC estável (GOLD B)', correta: true },
          { id: 'c', texto: 'Insuficiência cardíaca congestiva', correta: false },
          { id: 'd', texto: 'Fibrose pulmonar idiopática', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História de tabagismo, sintomas crônicos e obstrução irreversível confirmam DPOC estável [3,4,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial para manejo da DPOC estável.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação sobre cessação tabágica', correta: false },
          { id: 'b', texto: 'Broncodilatador de curta ação isolado', correta: false },
          { id: 'c', texto: 'Cessação tabágica + broncodilatador de longa ação (LAMA)', correta: true },
          { id: 'd', texto: 'Corticosteroide sistêmico', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Para DPOC GOLD B, LAMA como tiotrópio é primeira linha, além de cessação tabágica [3,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após cessação tabágica e uso de tiotrópio. Relata melhora na dispneia (mMRC 1), sem exacerbações.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e retorno em 6 meses', correta: true },
          { id: 'b', texto: 'Adicionar LABA e ICS', correta: false },
          { id: 'c', texto: 'Suspender broncodilatador', correta: false },
          { id: 'd', texto: 'Encaminhar para pneumologista imediatamente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Em DPOC estável controlada, manter terapia e monitorar periodicamente [3,4,6].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com DPOC estável diagnosticada por espirometria, manejada com cessação tabágica e broncodilatador, evoluindo favoravelmente.',
    diagnosticoFinal: 'Doença Pulmonar Obstrutiva Crônica (DPOC) estável, classificação GOLD B',
    tratamentoRealizado: 'Cessação tabágica com suporte, tiotrópio 18 mcg/dia inalado, vacinação influenza e pneumocócica, reabilitação pulmonar leve',
    evolucao: 'Melhora sintomática em 3 meses, sem exacerbações; VEF1 estável em seguimento',
    licoesPrincipais: [
      'O tabagismo é o principal fator de risco para DPOC; rastreie em ≥40 anos com ≥20 maços-ano [3,4]',
      'Espirometria é essencial para diagnóstico, confirmando obstrução com VEF1/CVF <0,70 [3,4]',
      'Manejo inicial em DPOC estável inclui cessação tabágica e broncodilatadores de longa ação [3,4,6]',
      'Classificação GOLD orienta terapia; grupo B prioriza alívio sintomático [3]',
      'Monitoramento anual com espirometria em casos confirmados reduz complicações [5,6]'
    ],
    errosComuns: [
      'Não solicitar espirometria em suspeita, atrasando diagnóstico [3,4]',
      'Subestimar impacto da cessação tabágica, principal intervenção modificável [3,6]',
      'Iniciar corticoides inalados precocemente sem indicação de exacerbações [3,4]',
      'Ignorar vacinação e reabilitação como pilares do manejo [5,6]'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e sintomas sugestivos de DPOC em atenção primária',
    'Interpretar resultados de espirometria para diagnóstico de obstrução crônica',
    'Aplicar diretrizes GOLD e SBPT para manejo inicial de DPOC estável',
    'Planejar seguimento e prevenção de exacerbações em pacientes com DPOC'
  ],
  competencias: [
    'Anamnese focada em sintomas respiratórios e fatores de risco',
    'Realização e interpretação de exame físico torácico',
    'Solicitação e análise de espirometria',
    'Prescrição de terapia farmacológica e não farmacológica para DPOC'
  ],
  doencasRelacionadas: ['dpoc'],
  medicamentosRelacionados: ['R03AC02', 'R03BB04'],
  calculadorasRelacionadas: [],
  referencias: ['ref-003', 'ref-004', 'ref-005', 'ref-006'],
  tags: ['DPOC', 'Tabagismo', 'Espirometria', 'Broncodilatadores', 'Cessação tabágica']
};