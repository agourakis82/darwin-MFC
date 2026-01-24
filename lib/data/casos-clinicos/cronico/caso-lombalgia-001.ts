import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_LOMBALGIA_cro_001: CasoClinico = {
  id: 'caso-lombalgia-001',
  titulo: 'Lombalgia Crônica em Trabalhador da Construção',
  subtitulo: 'Paciente de 52 anos com dor lombar persistente há 6 meses, associada a esforço ocupacional.',
  categoria: 'cronico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'José Carlos Silva',
      idade: 52,
      sexo: 'M',
      profissao: 'Pedreiro',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Dói muito as costas, não consigo nem carregar peso no trabalho.',
    historiaDoencaAtual: 'Paciente relata dor lombar bilateral de início insidioso há 6 meses, piorando com esforços físicos no trabalho, como levantamento de materiais pesados. A dor é contínua, de intensidade moderada (5/10 na EVA), irradiando para as nádegas, sem parestesias ou fraqueza nos membros inferiores. Não há febre, perda de peso ou trauma recente. Usa analgésicos esporádicos (ibuprofeno) com alívio parcial. Histórico de tabagismo (20 maços-ano) e sedentarismo fora do trabalho.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona que a dor piora ao final do dia e melhora com repouso. Não há história de câncer, infecção ou uso de esteroides.',
        dicas: ['Investigue fatores de risco ocupacionais, bandeiras vermelhas e impacto funcional.']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para guiar a investigação inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de artrite', correta: false },
          { id: 'b', texto: 'Fatores agravantes ocupacionais e duração da dor', correta: true },
          { id: 'c', texto: 'Viagens recentes ao exterior', correta: false },
          { id: 'd', texto: 'Dieta alimentar habitual', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em lombalgia crônica, identificar fatores ergonômicos e duração >3 meses orienta para abordagem não invasiva [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores ocupacionais são cruciais em trabalhadores manuais.',
        incorreto: 'Priorize elementos relacionados à dor e contexto ocupacional.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, o paciente apresenta limitação na flexão lombar (30 graus), dor à palpação paravertebral, sem déficits neurológicos (força 5/5, sensibilidade preservada). Teste de Lasègue negativo.',
        dados: {
          'PA': '128/80 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'IMC': '28.5 kg/m²',
          'Mobilidade lombar': 'Reduzida'
        },
        dicas: ['Ausência de bandeiras vermelhas neurológicas sugere lombalgia inespecífica.']
      },
      pergunta: {
        enunciado: 'Qual achado do exame físico é MAIS relevante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA normal', correta: false },
          { id: 'b', texto: 'Dor à palpação lombar sem déficits neurológicos', correta: true },
          { id: 'c', texto: 'IMC 28.5', correta: false },
          { id: 'd', texto: 'FC 76 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Achados musculoesqueléticos sem sinais de compressão nervosa indicam lombalgia inespecífica crônica [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para excluir causas graves. Radiografia lombar normal, sem fraturas ou instabilidades. VHS 15 mm/h (leve elevação).',
        dados: {
          'Radiografia lombar': 'Normal, sem alterações degenerativas graves',
          'VHS': '15 mm/h',
          'CK': '120 U/L',
          'Glicemia de jejum': '102 mg/dL',
          'Creatinina': '0.9 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Necessário RMN imediata por suspeita de hérnia', correta: false },
          { id: 'b', texto: 'Exames normais, compatível com lombalgia inespecífica', correta: true },
          { id: 'c', texto: 'Elevação de VHS sugere infecção', correta: false },
          { id: 'd', texto: 'Glicemia alterada como causa primária', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em lombalgia crônica sem bandeiras vermelhas, exames de imagem iniciais são normais e não alteram o manejo [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame e exames, a dor é mecânica, relacionada ao trabalho, sem evidência de causa grave.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Lombalgia crônica inespecífica', correta: true },
          { id: 'b', texto: 'Hérnia de disco lombar', correta: false },
          { id: 'c', texto: 'Espondilite anquilosante', correta: false },
          { id: 'd', texto: 'Osteoporose com fratura', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Dor persistente >3 meses sem causa identificável é lombalgia inespecífica, comum em contextos ocupacionais [3,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Você planeja manejo inicial conservador, priorizando não farmacológico.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Repouso absoluto e opioides', correta: false },
          { id: 'b', texto: 'Exercícios de fortalecimento e educação postural', correta: true },
          { id: 'c', texto: 'Cirurgia lombar imediata', correta: false },
          { id: 'd', texto: 'Apenas AINEs por 6 meses', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Abordagem não invasiva com terapia física e educação é primeira linha para lombalgia crônica [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 4 semanas, o paciente relata melhora na dor (3/10), com adesão aos exercícios. Continua no trabalho com adaptações ergonômicas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter exercícios e reavaliar em 4-6 semanas', correta: true },
          { id: 'b', texto: 'Solicitar RMN lombar', correta: false },
          { id: 'c', texto: 'Suspender todo tratamento', correta: false },
          { id: 'd', texto: 'Encaminhar para ortopedista urgente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Reavaliação periódica e manutenção de terapias multimodais promovem melhora sustentada [1,3].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com lombalgia crônica inespecífica relacionada ao trabalho, manejado com sucesso por abordagem conservadora.',
    diagnosticoFinal: 'Lombalgia crônica inespecífica (CID-11: CA23)',
    tratamentoRealizado: 'Educação postural, exercícios de fortalecimento lombar, AINEs intermitentes e avaliação ergonômica ocupacional.',
    evolucao: 'Melhora progressiva da dor e funcionalidade após 3 meses, com retorno às atividades laborais adaptadas.',
    licoesPrincipais: [
      'Priorize abordagem não farmacológica em lombalgia crônica inespecífica [1].',
      'Identifique fatores ocupacionais para prevenção de recorrências [3,4].',
      'Exclua bandeiras vermelhas antes de exames de imagem [2].',
      'Terapias multimodais melhoram outcomes a longo prazo [1,2].',
      'Educação do paciente é essencial para adesão ao tratamento.'
    ],
    errosComuns: [
      'Solicitar imagem desnecessária, aumentando ansiedade e custos [1].',
      'Prescrever repouso prolongado, que piora a debilidade muscular [2].',
      'Ignorar contexto ocupacional, levando a recidivas [3,4].',
      'Uso excessivo de opioides sem indicação clara.'
    ]
  },

  objetivosAprendizagem: [
    'Compreender o manejo inicial da lombalgia crônica inespecífica.',
    'Identificar bandeiras vermelhas e quando investigar causas graves.',
    'Aplicar recomendações de guidelines para tratamento não invasivo.',
    'Avaliar impacto ocupacional na lombalgia.'
  ],
  competencias: ['Anamnese musculoesquelética', 'Exame físico lombar', 'Raciocínio diagnóstico em dor crônica', 'Planejamento terapêutico conservador'],
  doencasRelacionadas: ['lombalgia'],
  medicamentosRelacionados: ['M01AE01', 'N02BE01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005'],
  tags: ['dor crônica', 'musculoesquelético', 'ergonomia', 'terapia física']
};