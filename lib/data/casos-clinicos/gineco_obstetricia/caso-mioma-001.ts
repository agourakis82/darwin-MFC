import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_MIOMA_gin_001: CasoClinico = {
  id: 'caso-mioma-uterino-001',
  titulo: 'Mulher com sangramento uterino anormal e dor pélvica',
  subtitulo: 'Paciente de 42 anos relata menorragia intensa e desconforto abdominal há meses',
  categoria: 'gineco_obstetricia',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira Santos',
      idade: 42,
      sexo: 'F',
      profissao: 'Auxiliar de enfermagem',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Tenho um sangramento menstrual muito forte que não para e sinto dor na barriga',
    historiaDoencaAtual: 'Paciente refere menorragia há 6 meses, com trocas de absorventes a cada 1-2 horas, presença de coágulos e duração de 8-10 dias. Associado a dor pélvica crônica, pior durante a menstruação, sem irradiação. Nega febre, perda de peso ou sintomas urinários. Paridade G2P2, última menstruação há 2 semanas. Usa DIU de cobre há 3 anos, sem comorbidades conhecidas.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona que o sangramento piorou após inserção do DIU e nega história familiar de câncer ginecológico.',
        dicas: ['Investigue fatores de risco como etnia, obesidade e uso de contraceptivos', 'Considere impacto na qualidade de vida e anemia']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para guiar a investigação inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Sintomas de anemia como fadiga e palidez', correta: true },
          { id: 'c', texto: 'Atividade física regular', correta: false },
          { id: 'd', texto: 'Dieta alimentar', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Menorragia pode levar a anemia ferropriva, comum em miomas uterinos sintomáticos [5,7].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Avaliar anemia é essencial em casos de sangramento prolongado.',
        incorreto: 'Priorize sintomas sugestivos de complicações como anemia.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, a paciente apresenta palidez cutânea-mucosa, abdome plano sem sinais de defesa, à palpação uterino aumentado para o tamanho de uma gestação de 10 semanas, móvel e indolor. Especulo revela fluxo sanguíneo moderado sem lesões cervicais.',
        dados: {
          'PA': '128/80 mmHg',
          'FC': '82 bpm',
          'IMC': '28.5 kg/m²',
          'Hb': '9.8 g/dL (palidez)',
          'Útero': 'Aumentado, regular'
        },
        dicas: ['O útero aumentado sugere massa pélvica; avalie sinais de anemia']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de mioma uterino?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada', correta: false },
          { id: 'b', texto: 'Útero aumentado e regular', correta: true },
          { id: 'c', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 82 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Utero aumentado é achado clássico em miomas, especialmente submucosos ou intramurais [1,7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram anemia e imagem sugestiva de mioma.',
        dados: {
          'Hemoglobina': '9.2 g/dL',
          'Hematócrito': '28%',
          'Ferritina': '15 ng/mL',
          'Ultrassonografia transvaginal': 'Útero com mioma intramural de 5 cm, sem degeneração',
          'Beta-HCG': 'Negativo'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados laboratoriais e de imagem?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Anemia normocítica sem relação com o quadro', correta: false },
          { id: 'b', texto: 'Anemia ferropriva secundária a menorragia por mioma', correta: true },
          { id: 'c', texto: 'Gravidez ectópica', correta: false },
          { id: 'd', texto: 'Infecção urinária', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Menorragia por mioma causa perda crônica de ferro, levando a anemia [5,11]. USG confirma diagnóstico [1].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames, você formula a hipótese. A paciente é afrodescendente, fator de risco.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Mioma uterino sintomático com anemia secundária', correta: true },
          { id: 'b', texto: 'Carcinoma endometrial', correta: false },
          { id: 'c', texto: 'Endometriose isolada', correta: false },
          { id: 'd', texto: 'Gravidez molar', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas clássicos de menorragia e dor pélvica com USG confirmatória indicam mioma [7,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'A paciente deseja preservar fertilidade. Opções incluem terapia médica inicial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Histerectomia imediata', correta: false },
          { id: 'b', texto: 'Suplementação de ferro e AINEs para dor', correta: false },
          { id: 'c', texto: 'Anticoncepcional oral combinado e reposição de ferro', correta: true },
          { id: 'd', texto: 'Embolização de artérias uterinas', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Terapia hormonal controla sangramento em miomas sintomáticos; ferro corrige anemia [9,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, a paciente retorna com Hb 11.5 g/dL, sangramento reduzido e USG estável.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter terapia e monitorar com USG anual', correta: true },
          { id: 'b', texto: 'Suspender tratamento', correta: false },
          { id: 'c', texto: 'Indicar cirurgia eletiva', correta: false },
          { id: 'd', texto: 'Solicitar RMN imediata', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Miomas estáveis em mulheres sintomáticas requerem monitoramento anual [10,11].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 42 anos com mioma uterino sintomático tratado com terapia hormonal e suplementação, com boa resposta e monitoramento.',
    diagnosticoFinal: 'Mioma uterino intramural sintomático (CID-11: CA23) com anemia ferropriva secundária',
    tratamentoRealizado: 'Anticoncepcional oral, sulfato ferroso 200 mg/dia e AINEs para dor; remoção de DIU',
    evolucao: 'Melhora clínica em 3 meses, sem complicações; paciente assintomática e Hb normalizada',
    licoesPrincipais: [
      'Miomas uterinos são comuns e sintomáticos em 20-40% das mulheres em idade fértil no Brasil [5,6]',
      'Ultrassonografia transvaginal é o método inicial de escolha para diagnóstico [1,9]',
      'Terapia médica é primeira linha para preservação de fertilidade em mulheres jovens [11]',
      'Monitoramento anual é indicado para miomas estáveis [10,12]',
      'Fatores de risco incluem etnia afrodescendente e obesidade [3,4]'
    ],
    errosComuns: [
      'Rastrear assintomáticas, contrariando guidelines [7,9]',
      'Ignorar anemia secundária à menorragia [5]',
      'Diagnosticar malignidade sem evidência, causando ansiedade desnecessária [17]',
      'Não considerar impacto na qualidade de vida e fertilidade [11]'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e fatores de risco de mioma uterino',
    'Interpretar achados de exame físico e ultrassonografia em ginecologia',
    'Aplicar guidelines para manejo inicial conservador',
    'Planejar seguimento e identificar indicações para intervenção cirúrgica'
  ],
  competencias: [
    'Anamnese ginecológica detalhada',
    'Exame físico pélvico',
    'Interpretação de exames de imagem em oncologia benigna',
    'Prescrição de terapia hormonal e suplementação'
  ],
  doencasRelacionadas: ['mioma-uterino'],
  medicamentosRelacionados: ['L02AE01', 'G03DC02'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-005', 'ref-006', 'ref-007', 'ref-009', 'ref-010', 'ref-011'],
  tags: ['ginecologia', 'mioma uterino', 'menorragia', 'anemia', 'ultrassonografia']
};