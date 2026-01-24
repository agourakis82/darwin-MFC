import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ENXAQUECA_neu_001: CasoClinico = {
  id: 'caso-enxaqueca-001',
  titulo: 'Mulher com cefaleias crônicas recorrentes',
  subtitulo: 'Paciente de 45 anos relata crises intensas de dor de cabeça com impacto na qualidade de vida',
  categoria: 'neurologico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 45,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Eu tenho essas dores de cabeça terríveis que duram o dia todo e me impedem de trabalhar.',
    historiaDoencaAtual: 'Paciente relata crises de cefaleia unilateral pulsátil, de intensidade moderada a grave, com duração de 6 a 72 horas, ocorrendo mais de 15 dias por mês há pelo menos 3 meses. Associadas a náuseas, fotofobia e fonofobia. Não há aura descrita. As crises pioram com atividade física e são aliviadas parcialmente por repouso em ambiente escuro. Início aos 30 anos, com aumento de frequência nos últimos 2 anos. Nega febre, rigidez nucal ou déficits neurológicos focais. Usa analgésicos comuns com alívio parcial.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente descreve crises pulsáteis unilaterais, com náuseas e sensibilidade à luz e som. Qual aspecto investigar em seguida?',
        dicas: ['Características das crises, triggers, uso de medicamentos, história familiar']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para o diagnóstico diferencial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de trauma craniano recente', correta: false },
          { id: 'b', texto: 'Frequência e características das crises (náuseas, fotofobia)', correta: true },
          { id: 'c', texto: 'Dieta alimentar detalhada', correta: false },
          { id: 'd', texto: 'Exercícios físicos semanais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Critérios ICHD-3 enfatizam frequência >15 dias/mês e sintomas associados para enxaqueca crônica [1,5].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! As características clássicas guiam o diagnóstico.',
        incorreto: 'Priorize os sintomas sugestivos de enxaqueca para diferenciar de cefaleias secundárias.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, a paciente está em crise moderada: PA 130/80 mmHg, FC 76 bpm, FR 14 irpm, sem rigidez nucal, exame neurológico normal, sem déficits focais. Tende à tensão muscular em pescoço e ombros.',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'Exame neurológico': 'Normal, sem sinais de alerta',
          'Tensão muscular': 'Presente em trapézio'
        },
        dicas: ['Ausência de sinais de alerta neurológico sugere cefaleia primária']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS relevante para o manejo inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA levemente elevada', correta: false },
          { id: 'b', texto: 'Exame neurológico normal', correta: true },
          { id: 'c', texto: 'Tensão muscular em ombros', correta: false },
          { id: 'd', texto: 'FC normal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exame neurológico sem "red flags" permite diagnóstico clínico de enxaqueca em atenção primária [1,5].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para descartar causas secundárias: hemograma normal, TSH 2.5 mUI/L, eletrólitos normais. TC de crânio solicitada por dúvida inicial, sem alterações.',
        dados: {
          'Hemograma': 'Normal',
          'TSH': '2.5 mUI/L',
          'Sódio': '140 mEq/L',
          'TC crânio': 'Sem lesões agudas ou massas',
          'Diário de cefaleia': 'Sugere >15 dias/mês com sintomas enxaquecosos'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Necessário RMN adicional', correta: false },
          { id: 'b', texto: 'Exames normais suportam cefaleia primária', correta: true },
          { id: 'c', texto: 'Suspeita de tireoidopatia', correta: false },
          { id: 'd', texto: 'Anemia como causa', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em cefaleias sem red flags, exames normais confirmam abordagem clínica para enxaqueca [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Baseado na história, exame e exames complementares, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Enxaqueca crônica (ICHD-3)', correta: true },
          { id: 'b', texto: 'Cefaleia tensional crônica', correta: false },
          { id: 'c', texto: 'Cefaleia secundária a hipertensão', correta: false },
          { id: 'd', texto: 'Cluster headache', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Critérios ICHD-3: cefaleia em >15 dias/mês por >3 meses, com características enxaquecosas [5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial: tratamento agudo e profilático.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas analgésicos comuns', correta: false },
          { id: 'b', texto: 'Triptano para crises + betabloqueador profilático', correta: true },
          { id: 'c', texto: 'Opioides para alívio imediato', correta: false },
          { id: 'd', texto: 'Antibióticos empíricos', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tratamento agudo com triptanos e profilaxia com betabloqueadores para enxaqueca crônica em atenção primária [1,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, paciente relata redução para 8 dias/mês de cefaleia, com bom controle das crises. Diário de cefaleia confirma melhora.'
      },
      pergunta: {
        enunciado: 'Qual a conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter profilaxia e reavaliar em 6 meses', correta: true },
          { id: 'b', texto: 'Suspender tratamento', correta: false },
          { id: 'c', texto: 'Encaminhar para neurologista imediatamente', correta: false },
          { id: 'd', texto: 'Aumentar dose de triptano', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Seguimento a cada 3-6 meses para pacientes em profilaxia, com ajuste conforme resposta [1,4].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 45 anos com enxaqueca crônica diagnosticada clinicamente, tratada com sucesso em atenção primária.',
    diagnosticoFinal: 'Enxaqueca crônica (CID-11: 8A80)',
    tratamentoRealizado: 'Sumatriptano para crises agudas; propranolol 40mg/dia para profilaxia; orientações sobre triggers e diário de cefaleia.',
    evolucao: 'Redução de frequência das crises para <10 dias/mês após 3 meses, com melhora na qualidade de vida e retorno às atividades.',
    licoesPrincipais: [
      'A enxaqueca é diagnosticada clinicamente pelos critérios ICHD-3, priorizando manejo em atenção primária [1,5].',
      'Ausência de red flags permite evitar exames desnecessários, reduzindo custos [3].',
      'Profilaxia é essencial para enxaqueca crônica (>15 dias/mês), com betabloqueadores como primeira linha [1,4].',
      'Diário de cefaleia auxilia no monitoramento e educação do paciente [1].',
      'Enxaqueca contribui significativamente para anos vividos com incapacidade global [2].'
    ],
    errosComuns: [
      'Solicitar imagem cerebral rotineiramente sem red flags, aumentando exposição à radiação desnecessária [1].',
      'Subestimar necessidade de profilaxia em casos crônicos, levando a overuse de analgésicos e cefaleia por rebote [5].',
      'Ignorar impacto psicossocial, como ansiedade associada às crises [1].',
      'Não educar sobre triggers ambientais e estresse, limitando eficácia do tratamento [3].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer critérios diagnósticos de enxaqueca crônica e diferenciar de cefaleias secundárias.',
    'Aplicar manejo inicial em atenção primária, incluindo tratamento agudo e profilático.',
    'Interpretar ausência de red flags e racionalizar exames complementares.',
    'Planejar seguimento e monitoramento para otimizar adesão e resultados.'
  ],
  competencias: ['Anamnese detalhada em cefaleias', 'Exame neurológico básico', 'Raciocínio diagnóstico em neurologia primária', 'Prescrição de terapêutica para dor crônica'],
  doencasRelacionadas: ['enxaqueca'],
  medicamentosRelacionados: ['sumatriptano', 'propranolol', 'topiramato'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005'],
  tags: ['cefaleia', 'enxaqueca crônica', 'manejo primário', 'dor de cabeça', 'profilaxia']
};