import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DEMENCIA_neu_001: CasoClinico = {
  id: 'caso-demencia-001',
  titulo: 'Investigação de Demência em Idosa com Declínio Cognitivo',
  subtitulo: 'Caso de uma idosa de 75 anos com queixas de esquecimento progressivo e alterações comportamentais',
  categoria: 'neurologico',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira Santos',
      idade: 75,
      sexo: 'F',
      profissao: 'Aposentada (ex-doméstica)',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Estou esquecendo tudo, doutor. Perdi as chaves ontem e não lembro onde as coloquei.',
    historiaDoencaAtual: 'Paciente refere declínio cognitivo progressivo há 2 anos, com episódios iniciais de esquecimento de nomes e objetos, evoluindo para desorientação temporal e dificuldade em realizar tarefas diárias como cozinhar. Familiares notam irritabilidade e apatia recente. Nega cefaleias intensas, quedas ou convulsões. Usa múltiplos medicamentos para hipertensão e artrite. Antecedente de periodontite crônica não tratada.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente e a filha descrevem piora gradual na memória recente, dificuldade em gerenciar finanças e episódios de confusão noturna. Há história familiar de demência na mãe.',
        dicas: ['Investigue fatores de risco como polimedicação, comorbidades e higiene bucal [2,4]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o diagnóstico diferencial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Uso de múltiplos medicamentos e comorbidades', correta: true },
          { id: 'c', texto: 'Preferências alimentares', correta: false },
          { id: 'd', texto: 'Atividades recreativas passadas', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Polimedicação e comorbidades como periodontite podem contribuir para declínio cognitivo e devem ser avaliadas precocemente [2,4].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores modificáveis como medicamentos são cruciais na investigação inicial.',
        incorreto: 'Priorize elementos que possam agravar ou simular demência, como efeitos adversos medicamentosos.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, a paciente está orientada quanto ao lugar, mas desorientada no tempo. Escala de Glasgow 15/15. Sem déficits focais motores, mas tremor fino em repouso nas mãos. Higiene bucal precária com sinais de periodontite.',
        dados: {
          'PA': '145/85 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'IMC': '26.5 kg/m²',
          'Mini-Exame do Estado Mental (MMSE)': '22/30'
        },
        dicas: ['Observe o escore cognitivo e sinais de infecções associadas [2,3]']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS indicativo de comprometimento cognitivo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pressão arterial elevada', correta: false },
          { id: 'b', texto: 'MMSE 22/30', correta: true },
          { id: 'c', texto: 'IMC 26.5 kg/m²', correta: false },
          { id: 'd', texto: 'Frequência cardíaca 76 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'MMSE <24 sugere declínio cognitivo moderado, compatível com demência em investigação [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram função tireoidiana normal, mas alterações sugestivas de processo neurodegenerativo.',
        dados: {
          'Hemoglobina': '12.5 g/dL',
          'Creatinina': '0.9 mg/dL',
          'TSH': '2.5 mUI/L',
          'Vitamina B12': '250 pg/mL (baixa-normal)',
          'Glicemia de jejum': '110 mg/dL',
          'PET imaging (hipocampo)': 'Hipoatividade bilateral',
          'Biomarcadores sanguíneos (p-tau/Aβ42)': 'Elevado'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar esses resultados no contexto de demência?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Causas reversíveis isoladas como hipovitaminose', correta: false },
          { id: 'b', texto: 'Biomarcadores compatíveis com Alzheimer em fase inicial', correta: true },
          { id: 'c', texto: 'Apenas dislipidemia sem relevância', correta: false },
          { id: 'd', texto: 'Infecção aguda primária', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Biomarcadores como p-tau elevado e PET hipoativa suportam diagnóstico de demência de Alzheimer [5,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame e exames, formule sua hipótese. Considere etiologias neurodegenerativas e fatores associados.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Demência de Alzheimer em investigação com fatores de risco', correta: true },
          { id: 'b', texto: 'Delirium agudo por infecção', correta: false },
          { id: 'c', texto: 'Demência vascular isolada', correta: false },
          { id: 'd', texto: 'Depressão pseudodemência', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Declínio progressivo, MMSE alterado e biomarcadores apontam para demência neurodegenerativa, com associação possível a periodontite [2,3,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o manejo inicial, incluindo não farmacológico e encaminhamentos.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Iniciar inibidores de colinesterase imediatamente sem avaliação genética', correta: false },
          { id: 'b', texto: 'Suporte não farmacológico, otimização de medicamentos e encaminhamento a geriatra/neurologista', correta: true },
          { id: 'c', texto: 'Nutrição enteral de rotina', correta: false },
          { id: 'd', texto: 'Antipsicóticos para irritabilidade', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Abordagem inicial foca em suporte familiar, revisão medicamentosa e biomarcadores; inibidores são para casos confirmados [3,4,8].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 6 meses, MMSE 20/30, com melhora na higiene bucal após tratamento odontológico. Filha relata menos apatia com suporte psicossocial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter monitoramento anual com avaliação cognitiva e suporte familiar', correta: true },
          { id: 'b', texto: 'Intensificar farmacoterapia sem necessidade', correta: false },
          { id: 'c', texto: 'Encaminhar para institucionalização imediata', correta: false },
          { id: 'd', texto: 'Suspender todos os cuidados', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Monitoramento progressivo é essencial, com ênfase em qualidade de vida e prevenção de complicações [1,3,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Caso de idosa com demência em investigação, diagnosticada como provável Alzheimer com fatores associados como polimedicação e periodontite. Manejo inicial incluiu otimização terapêutica e suporte multidisciplinar.',
    diagnosticoFinal: 'Demência de Alzheimer em investigação (CID-11: CA23)',
    tratamentoRealizado: 'Revisão medicamentosa, tratamento odontológico integrado, suporte não farmacológico e encaminhamento para neurologista com testes genéticos selecionados.',
    evolucao: 'Estabilização do declínio cognitivo em 6 meses, com melhora na qualidade de vida e redução de irritabilidade.',
    licoesPrincipais: [
      'Diagnóstico precoce de demência utiliza testes cognitivos e biomarcadores para melhorar manejo [1,5,6].',
      'Fatores como periodontite e polimedicação são modificáveis e associados ao risco de demência [2,4].',
      'Abordagem ética prioriza suporte familiar e nutrição, evitando intervenções controversas em estágios avançados [7,9].',
      'Investigação genética é recomendada em casos com história familiar [8].',
      'Monitoramento na atenção primária é chave para populações de risco [3].'
    ],
    errosComuns: [
      'Iniciar antipsicóticos sem avaliação de causas reversíveis, aumentando risco de eventos adversos [4].',
      'Ignorar associações como periodontite, perdendo oportunidade de prevenção integrada [2].',
      'Não considerar biomarcadores, atrasando diagnóstico diferencial [5,6].',
      'Subestimar suporte não farmacológico em favor de intervenções farmacológicas precoces [3,9].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e fatores de risco de demência em idosos na atenção primária.',
    'Interpretar exames complementares, incluindo biomarcadores, no diagnóstico de demência.',
    'Aplicar recomendações para manejo ético e multidisciplinar de pacientes com declínio cognitivo.',
    'Entender a importância da prevenção de complicações associadas, como infecções bucais.'
  ],
  competencias: [
    'Raciocínio clínico em geriatria',
    'Avaliação cognitiva e diagnóstico diferencial',
    'Manejo ético em doenças crônicas neurodegenerativas',
    'Integração de cuidados primários e especializados'
  ],
  doencasRelacionadas: ['demencia'],
  medicamentosRelacionados: ['N06DA01', 'N06DA02', 'N06DA04', 'N06DA52'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-008', 'ref-009', 'ref-010'],
  tags: ['demencia', 'idosos', 'neurologia', 'cognitivo', 'geriatria']
};