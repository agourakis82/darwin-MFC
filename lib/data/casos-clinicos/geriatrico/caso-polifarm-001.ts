import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_POLIFARM_ger_001: CasoClinico = {
  id: 'caso-polifarmacia-001',
  titulo: 'Polifarmácia em Paciente com Demência',
  subtitulo: 'Idosa com declínio cognitivo agravado por múltiplas medicações',
  categoria: 'geriatrico',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 78,
      sexo: 'F',
      profissao: 'Aposentada (ex-dona de casa)',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Estou mais confusa e caí duas vezes esta semana',
    historiaDoencaAtual: 'Paciente idosa com diagnóstico de demência de provável Alzheimer há 2 anos, refere piora progressiva da memória e orientação nos últimos meses, associada a dois episódios de queda em casa sem fraturas. Negam febre ou infecção urinária recente. Toma múltiplas medicações prescritas por diferentes especialistas: donepezila 10mg/dia, memantina 20mg/dia, losartana 50mg/dia, hidroclorotiazida 25mg/dia, metformina 850mg 2x/dia, sinvastatina 20mg/noite, alprazolam 0,5mg à noite e paracetamol 500mg conforme necessário. Familiar relata adesão irregular e possível duplicidade em prescrições.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente e a filha relatam uso de pelo menos 8 medicamentos diários, com prescrições de geriatra, cardiologista e clínico geral. Há suspeita de interações e adesão irregular.',
        dicas: ['Investigue lista completa de medicamentos, interações potenciais e sintomas adversos como confusão e quedas']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento para identificar riscos?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de demência', correta: false },
          { id: 'b', texto: 'Lista completa de medicamentos e posologia', correta: true },
          { id: 'c', texto: 'Hábitos alimentares', correta: false },
          { id: 'd', texto: 'Viagens recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A polifarmácia em idosos com demência aumenta risco de reações adversas e piora cognitiva; revisão medicamentosa é essencial [4,9].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A revisão de medicamentos é crucial em polifarmácia.',
        incorreto: 'Priorize a identificação de polifarmácia e interações potenciais.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa paciente desorientada no tempo, com marcha instável, equimoses em membros inferiores e desidratação leve (mucosas secas).',
        dados: {
          'PA': '142/88 mmHg',
          'FC': '92 bpm',
          'FR': '18 irpm',
          'Sat O2': '95%',
          'IMC': '24.5 kg/m²',
          'Mini-Exame do Estado Mental (MMSE)': '18/30'
        },
        dicas: ['Note a desorientação e instabilidade, sugestivos de efeitos adversos medicamentosos']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante no contexto de polifarmácia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 142/88 mmHg', correta: false },
          { id: 'b', texto: 'MMSE 18/30 com marcha instável', correta: true },
          { id: 'c', texto: 'IMC 24.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 92 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Declínio cognitivo e quedas podem ser exacerbados por medicamentos como benzodiazepínicos e diuréticos em idosos com demência [4,9].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para avaliar efeitos adversos. Resultados mostram hiponatremia leve e função renal preservada, mas com elevação discreta de creatinina.',
        dados: {
          'Sódio': '128 mEq/L',
          'Potássio': '4.2 mEq/L',
          'Creatinina': '1.1 mg/dL',
          'TFGe': '55 mL/min/1.73m²',
          'Glicemia de jejum': '132 mg/dL',
          'HbA1c': '6.8%',
          'Albumina': '3.5 g/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados no contexto clínico?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hiponatremia isolada sem relevância', correta: false },
          { id: 'b', texto: 'Efeito adverso de diurético contribuindo para confusão', correta: true },
          { id: 'c', texto: 'Insuficiência renal aguda', correta: false },
          { id: 'd', texto: 'Descontrole glicêmico grave', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hidroclorotiazida pode causar hiponatremia em idosos, agravando sintomas de demência [4,9].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame e exames, você considera o impacto da polifarmácia na demência.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável contribuindo para o quadro?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Progressão natural da demência sem relação com medicamentos', correta: false },
          { id: 'b', texto: 'Polifarmácia com reações adversas exacerbando demência', correta: true },
          { id: 'c', texto: 'Infecção urinária oculta', correta: false },
          { id: 'd', texto: 'Depressão maior', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Polifarmácia em idosos com demência aumenta risco de eventos adversos, recomendando prevenção e revisão [4,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Você planeja intervenções para otimizar a terapia medicamentosa.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter todos os medicamentos e monitorar', correta: false },
          { id: 'b', texto: 'Suspender hidroclorotiazida e alprazolam, revisar indicações', correta: true },
          { id: 'c', texto: 'Aumentar dose de donepezila', correta: false },
          { id: 'd', texto: 'Iniciar novo antidiabético', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Desprescrição de medicamentos de alto risco (Beers criteria) como benzodiazepínicos e diuréticos é recomendada em idosos com demência para prevenir reações adversas [4,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 1 mês, após ajustes, a paciente apresenta melhora na confusão, sem novas quedas e sódio normalizado (135 mEq/L). MMSE sobe para 21/30.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter desprescrição e acompanhamento multidisciplinar', correta: true },
          { id: 'b', texto: 'Reintroduzir medicamentos suspensos', correta: false },
          { id: 'c', texto: 'Encaminhar para hospitalização', correta: false },
          { id: 'd', texto: 'Solicitar PET imaging imediato', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Monitoramento contínuo e abordagem integrada melhoram qualidade de vida em demência com polifarmácia [3,4,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Idosa com demência agravada por polifarmácia, com hiponatremia e quedas devido a diurético e benzodiazepínico. Após desprescrição, melhora cognitiva e segurança.',
    diagnosticoFinal: 'Demência com agravamento por polifarmácia e reações adversas medicamentosas',
    tratamentoRealizado: 'Desprescrição de hidroclorotiazida e alprazolam; otimização de anti-hipertensivos e antidiabéticos; orientação nutricional e familiar',
    evolucao: 'Melhora em 1 mês: redução de sintomas, normalização laboratorial e maior adesão',
    licoesPrincipais: [
      'Revisão periódica de medicamentos em idosos com demência previne reações adversas [4,9]',
      'Polifarmácia aumenta risco de quedas e confusão; use critérios como Beers para desprescrição [4]',
      'Avaliação cognitiva anual em atenção primária para idosos com fatores de risco [1,3]',
      'Manejo ético inclui nutrição e prevenção de eventos adversos em demência avançada [7,9]',
      'Integração de avaliação odontológica e genética em casos selecionados [2,8]'
    ],
    errosComuns: [
      'Ignorar polifarmácia e atribuir sintomas apenas à progressão da demência',
      'Prescrever sem revisar interações em pacientes idosos multimórbidos',
      'Não envolver família no manejo de adesão e educação terapêutica',
      'Subestimar impacto de medicamentos de alto risco como benzodiazepínicos em quedas'
    ]
  },

  objetivosAprendizagem: [
    'Identificar e gerenciar polifarmácia em pacientes geriátricos com demência',
    'Aplicar recomendações para prevenção de reações adversas medicamentosas [4,9]',
    'Realizar avaliação cognitiva e diagnóstico precoce na atenção primária [1,3]',
    'Entender o papel de biomarcadores e manejo integrado em demência [5,6]'
  ],
  competencias: [
    'Raciocínio clínico em geriatria',
    'Prescrição racional e desprescrição',
    'Comunicação com pacientes e familiares',
    'Manejo ético em demência avançada'
  ],
  doencasRelacionadas: ['demencia'],
  medicamentosRelacionados: ['N06DA01', 'N06DA02', 'N06DA04', 'N06DA52'],
  calculadorasRelacionadas: ['mmse', 'beers-criteria'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-008', 'ref-009', 'ref-010'],
  tags: ['polifarmacia', 'demencia', 'geriatria', 'desprescricao', 'reacoes-adversas']
};