import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_HAS_car_002: CasoClinico = {
  id: 'caso-has-resistente-001',
  titulo: 'Paciente com Hipertensão Arterial Resistente',
  subtitulo: 'Homem de 58 anos com pressão arterial persistentemente elevada apesar de terapia farmacológica múltipla',
  categoria: 'cardiovascular',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'José Carlos Oliveira',
      idade: 58,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Doutor, minha pressão não baixa de jeito nenhum, mesmo tomando todos os remédios.',
    historiaDoencaAtual: 'Paciente relata diagnóstico de hipertensão arterial sistêmica há 12 anos, inicialmente controlada com monoterapia. Nos últimos 2 anos, apresenta elevações persistentes da PA, com medições domiciliares acima de 150/95 mmHg. Em uso atual de enalapril 20 mg/dia, hidroclorotiazida 25 mg/dia e anlodipino 10 mg/dia, com adesão referida como boa. Nega cefaleias intensas, visão turva ou episódios de sudorese noturna, mas refere fadiga e dispneia aos esforços moderados. Histórico de tabagismo (20 maços-ano, cessou há 5 anos), etilismo social e dieta rica em sal. Sem comorbidades conhecidas como diabetes ou dislipidemia.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a anamnese para identificar fatores contribuintes à resistência terapêutica. O paciente menciona adesão aos medicamentos, mas revela uso irregular de AINEs para dores lombares crônicas e consumo elevado de sal na dieta.',
        dicas: ['Investigue adesão, uso de medicamentos interferentes e hábitos alimentares [2,5,6]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para explicar a HAS resistente neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de infarto', correta: false },
          { id: 'b', texto: 'Uso de AINEs e alto consumo de sal', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'Viagens recentes ao exterior', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'AINEs podem antagonizar anti-hipertensivos e o alto sódio exacerba a retenção hídrica, contribuindo para resistência [2,6].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores modificáveis como AINEs e sódio são cruciais na HAS resistente.',
        incorreto: 'Priorize fatores que interfiram diretamente na eficácia terapêutica.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'No exame físico, você observa IMC de 29,8 kg/m², sem edema periférico evidente. PA em braço direito 162/102 mmHg (confirmada em braço esquerdo 158/100 mmHg), FC 82 bpm, FR 14 irpm. Fundoscopia revela estreitamento arteriolar moderado (grau II de Keith-Wagener). Ausculta cardíaca normal, sem sopros. Abdome sem massas palpáveis.',
        dados: {
          'PA': '162/102 mmHg',
          'FC': '82 bpm',
          'FR': '14 irpm',
          'IMC': '29,8 kg/m²',
          'Fundoscopia': 'Estreitamento arteriolar (grau II)'
        },
        dicas: ['Avalie sinais de dano em órgãos-alvo, como retinopatia hipertensiva [5,6]']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS indicativo de dano em órgãos-alvo na HAS?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC 29,8 kg/m²', correta: false },
          { id: 'b', texto: 'Estreitamento arteriolar na fundoscopia', correta: true },
          { id: 'c', texto: 'FC 82 bpm', correta: false },
          { id: 'd', texto: 'Ausência de edema', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Retinopatia hipertensiva grau II sugere dano microvascular crônico, comum em HAS não controlada [5,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para avaliação de causas secundárias e comorbidades. Resultados laboratoriais mostram função renal preservada, mas hipocalemia leve e relação aldosterona/renina elevada, sugerindo possível hiperaldosteronismo primário.',
        dados: {
          'Creatinina': '1,1 mg/dL',
          'TFGe': '78 mL/min/1,73m²',
          'Potássio': '3,3 mEq/L',
          'Sódio': '142 mEq/L',
          'Aldosterona': '28 ng/dL',
          'Renina': '0,8 ng/mL/h',
          'Relação A/R': '35',
          'Glicemia de jejum': '102 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Insuficiência renal crônica avançada', correta: false },
          { id: 'b', texto: 'Suspeita de hiperaldosteronismo primário', correta: true },
          { id: 'c', texto: 'Apenas hipocalemia isolada', correta: false },
          { id: 'd', texto: 'Diabetes mellitus tipo 2', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hipocalemia, aldosterona elevada e relação A/R >20 sugerem hiperaldosteronismo como causa secundária de HAS resistente [2,5].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames, você formula hipóteses. A PA persiste >140/90 mmHg apesar de 3 fármacos em doses adequadas (incluindo diurético), confirmando HAS resistente. A suspeita de causa secundária é alta.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'HAS resistente secundária a hiperaldosteronismo primário', correta: true },
          { id: 'b', texto: 'HAS essencial com má adesão', correta: false },
          { id: 'c', texto: 'Síndrome de Cushing', correta: false },
          { id: 'd', texto: 'Estenose de artéria renal bilateral', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Critérios de HAS resistente atendidos; perfil laboratorial clássico de hiperaldosteronismo [2,5,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Você planeja otimização terapêutica e investigação adicional. Adiciona espironolactona como diurético poupador de potássio e orienta redução de sódio. Solicita TC adrenal para confirmação.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação dietética por 3 meses', correta: false },
          { id: 'b', texto: 'Adicionar espironolactona 25 mg/dia ao esquema atual', correta: true },
          { id: 'c', texto: 'Substituir todos os medicamentos por betabloqueador', correta: false },
          { id: 'd', texto: 'Encaminhar imediatamente para cirurgia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Espironolactona é primeira linha em HAS resistente suspeita de hiperaldosteronismo, com benefício em controle pressórico [2,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 1 mês, PA 142/88 mmHg, potássio normalizado. TC adrenal revela adenoma adrenal direito. Paciente encaminhado a endocrinologista para avaliação de adrenalectomia.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter esquema atual e monitorar PA domiciliar, com retorno em 3 meses', correta: false },
          { id: 'b', texto: 'Encaminhar a especialista para investigação e tratamento definitivo', correta: true },
          { id: 'c', texto: 'Suspender diuréticos por melhora', correta: false },
          { id: 'd', texto: 'Iniciar insulina por suspeita de DM', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Adenoma adrenal confirmado requer avaliação especializada para possível cura cirúrgica da HAS secundária [2,5].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de HAS resistente em homem de meia-idade, diagnosticada como secundária a hiperaldosteronismo primário, com otimização terapêutica inicial e encaminhamento especializado.',
    diagnosticoFinal: 'Hipertensão arterial resistente secundária a hiperaldosteronismo primário',
    tratamentoRealizado: 'Otimização com espironolactona 25 mg/dia adicionada ao esquema (enalapril + hidroclorotiazida + anlodipino); orientação dietética baixa em sódio; TC adrenal e encaminhamento a endocrinologia.',
    evolucao: 'Melhora parcial da PA em 1 mês; potássio corrigido. Paciente submetido a adrenalectomia com resolução da HAS e normalização laboratorial em 6 meses.',
    licoesPrincipais: [
      'HAS resistente é definida como PA >140/90 mmHg apesar de 3 fármacos em doses máximas, incluindo diurético [2,6].',
      'Investigar causas secundárias em casos refratários, especialmente hiperaldosteronismo (prevalência 5-10%) [5].',
      'Espironolactona é eficaz como adição terapêutica em HAS resistente [2].',
      'Monitorização domiciliar e adesão são essenciais para confirmação [6].',
      'Dano em órgãos-alvo, como retinopatia, indica urgência no controle [5,6].'
    ],
    errosComuns: [
      'Subestimar causas secundárias, tratando apenas como essencial [2].',
      'Não investigar adesão ou interferentes como AINEs e sódio [6].',
      'Omitir diurético poupador de potássio em suspeita de hiperaldosteronismo [5].',
      'Ignorar exames para dano em órgãos-alvo, como fundoscopia [6].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar critérios e causas de hipertensão arterial resistente.',
    'Avaliar e investigar causas secundárias de HAS em atenção primária.',
    'Otimizar terapia farmacológica em HAS refratária conforme diretrizes.',
    'Reconhecer importância do rastreamento e seguimento na prevenção de complicações cardiovasculares.'
  ],
  competencias: [
    'Raciocínio clínico em hipertensão',
    'Gestão de comorbidades cardiovasculares',
    'Interpretação de exames laboratoriais para causas secundárias',
    'Planejamento terapêutico baseado em evidências'
  ],
  doencasRelacionadas: ['hipertensao-arterial'],
  medicamentosRelacionados: ['C09', 'C03', 'C07', 'C08'],
  calculadorasRelacionadas: ['risco-cardiovascular', 'tfge'],
  referencias: ['ref-002', 'ref-005', 'ref-006', 'ref-010'],
  tags: ['HAS resistente', 'hiperaldosteronismo', 'causas secundárias', 'terapia anti-hipertensiva']
};