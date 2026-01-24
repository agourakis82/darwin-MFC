import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ANEMIAINF_ped_001: CasoClinico = {
  id: 'caso-anemia-ferropriva-pediatrica-001',
  titulo: 'Anemia em Lactente com Paleza e Fadiga',
  subtitulo: 'Criança de 12 meses com suspeita de deficiência de ferro',
  categoria: 'pediatrico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira Santos',
      idade: 12,
      sexo: 'F',
      profissao: 'Criança',
      estadoCivil: 'Solteira'
    },
    queixaPrincipal: 'Minha filha está muito pálida e parece cansada o tempo todo',
    historiaDoencaAtual: 'Maria, 12 meses, é trazida pela mãe para consulta de rotina na puericultura. A mãe relata que nos últimos 2 meses notou palidez progressiva na pele e mucosas, além de irritabilidade e menor apetite. A criança foi amamentada exclusivamente até os 6 meses e introduziu complementares, mas com dieta pobre em carnes e rica em leite de vaca. Nega febre, diarreia ou infecções recentes. Peso ao nascer: 3,2 kg (a termo). Vacinação em dia.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A mãe menciona introdução precoce de leite de vaca e baixa ingestão de alimentos ricos em ferro.',
        dicas: ['Investigue hábitos alimentares, crescimento e fatores de risco nutricional']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de talassemia', correta: false },
          { id: 'b', texto: 'Padrão alimentar e ingestão de leite', correta: true },
          { id: 'c', texto: 'Exposição a infecções virais', correta: false },
          { id: 'd', texto: 'Vacinação recente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Dieta pobre em ferro e excesso de leite de vaca são fatores de risco principais para anemia ferropriva em lactentes [1,9].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A anamnese nutricional é essencial para identificar riscos.',
        incorreto: 'Priorize a avaliação dietética, comum em populações vulneráveis.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa palidez cutâneo-mucosa, sem icterícia ou petéquias. Peso: 8,5 kg (percentil 10), estatura: 72 cm (percentil 15), FC: 120 bpm, FR: 28 irpm.',
        dados: {
          'Peso': '8,5 kg (P10)',
          'Estatura': '72 cm (P15)',
          'FC': '120 bpm',
          'FR': '28 irpm',
          'Palidez': 'Cutâneo-mucosa moderada'
        },
        dicas: ['Avalie sinais de desnutrição e crescimento inadequado']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de anemia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Frequência respiratória elevada', correta: false },
          { id: 'b', texto: 'Palidez cutâneo-mucosa', correta: true },
          { id: 'c', texto: 'Peso no percentil 10', correta: false },
          { id: 'd', texto: 'Frequência cardíaca de 120 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Palidez é um sinal clássico de anemia em crianças, especialmente quando associada a outros sintomas [1,9].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita hemograma e outros exames. Resultados: Hemoglobina 8,5 g/dL, hematócrito 28%, VCM 62 fL, ferritina 5 ng/mL, saturação de transferrina 10%.',
        dados: {
          'Hemoglobina': '8,5 g/dL (ref: 11-13 g/dL)',
          'Hematócrito': '28% (ref: 33-39%)',
          'VCM': '62 fL (ref: 70-86 fL)',
          'Ferritina sérica': '5 ng/mL (ref: >12 ng/mL)',
          'Saturação de transferrina': '10% (ref: 20-50%)'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Anemia normocítica normocrômica', correta: false },
          { id: 'b', texto: 'Anemia microcítica hipocrômica por deficiência de ferro', correta: true },
          { id: 'c', texto: 'Anemia por infecção crônica', correta: false },
          { id: 'd', texto: 'Talassemia menor', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Valores baixos de Hb, VCM reduzido e ferritina baixa confirmam anemia ferropriva [1,9,10].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Anemia ferropriva infantil', correta: true },
          { id: 'b', texto: 'Anemia megaloblástica por deficiência de B12', correta: false },
          { id: 'c', texto: 'Anemia hemolítica autoimune', correta: false },
          { id: 'd', texto: 'Anemia de doença crônica', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Quadro clássico de anemia ferropriva em lactente com dieta inadequada e achados laboratoriais confirmatórios [1,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento e orientação.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Suplementação de vitamina C isolada', correta: false },
          { id: 'b', texto: 'Sulfato ferroso oral 3-6 mg/kg/dia + orientação dietética', correta: true },
          { id: 'c', texto: 'Transfusão sanguínea imediata', correta: false },
          { id: 'd', texto: 'Apenas restrição de leite de vaca', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tratamento padrão para anemia ferropriva moderada em crianças inclui ferro oral e correção nutricional [1,9,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'A criança retorna em 1 mês. Hemoglobina 10,8 g/dL, mãe relata melhora no apetite e energia.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter suplementação por mais 2 meses e reavaliar', correta: true },
          { id: 'b', texto: 'Suspender tratamento imediatamente', correta: false },
          { id: 'c', texto: 'Solicitar endoscopia digestiva', correta: false },
          { id: 'd', texto: 'Iniciar ferro intravenoso', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resposta inicial positiva requer manutenção da terapia para repletar estoques e monitoramento [1,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Lactente de 12 meses diagnosticada com anemia ferropriva devido a dieta inadequada, tratada com sucesso com suplementação oral e orientação nutricional.',
    diagnosticoFinal: 'Anemia ferropriva infantil (CID-11: CA23)',
    tratamentoRealizado: 'Sulfato ferroso 4 mg/kg/dia por 3 meses, orientação para dieta rica em ferro e redução de leite de vaca, acompanhamento em puericultura.',
    evolucao: 'Melhora clínica e laboratorial em 1 mês, com hemoglobina normalizando em 3 meses e ganho de peso adequado.',
    licoesPrincipais: [
      'Rastreamento universal de anemia aos 12 meses é recomendado pela SBP e AAP [9,10].',
      'Fatores de risco incluem introdução precoce de leite de vaca e baixa ingestão de ferro heme [1].',
      'Diagnóstico confirmado por hemoglobina baixa, VCM reduzido e ferritina sérica baixa [1,9].',
      'Tratamento oral com ferro é eficaz na maioria dos casos, com resposta em 4 semanas [9,10].',
      'Prevenção envolve educação nutricional em consultas de rotina [7,8].'
    ],
    errosComuns: [
      'Ignorar anamnese nutricional, subestimando fatores dietéticos comuns no Brasil [5,6].',
      'Não dosar ferritina, confundindo com anemia de outra etiologia [1].',
      'Iniciar transfusão desnecessária em anemia moderada sem instabilidade [9].',
      'Suspender suplementação precoce, sem repor estoques de ferro [10].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e sinais clínicos de anemia ferropriva em lactentes.',
    'Interpretar exames laboratoriais para diagnóstico de deficiência de ferro.',
    'Aplicar recomendações de rastreamento e tratamento conforme diretrizes brasileiras e internacionais.',
    'Orientar famílias sobre prevenção nutricional em pediatria.'
  ],
  competencias: [
    'Avaliação clínica em pediatria',
    'Raciocínio diagnóstico nutricional',
    'Prescrição de suplementação em crianças',
    'Educação em saúde para prevenção de deficiências'
  ],
  doencasRelacionadas: ['anemia-ferropriva-pediatrica'],
  medicamentosRelacionados: ['B03AD01', 'B03AA05'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-008', 'ref-009', 'ref-010'],
  tags: ['anemia', 'pediatria', 'nutrição', 'deficiência de ferro', 'lactente']
};