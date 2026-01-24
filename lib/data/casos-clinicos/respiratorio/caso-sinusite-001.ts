import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_SINUSITE_res_001: CasoClinico = {
  id: 'caso-sinusite-001',
  titulo: 'Sinusite Aguda em Mulher Adulta',
  subtitulo: 'Paciente com congestão nasal e dor facial persistente há mais de 10 dias',
  categoria: 'respiratorio',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 35,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Meu nariz está entupido e sinto dor no rosto há mais de uma semana',
    historiaDoencaAtual: 'Paciente relata início há 12 dias com congestão nasal bilateral, secreção nasal amarelada, dor de cabeça frontal e facial, pior ao inclinar a cabeça. Febre baixa intermitente (até 38°C) nos últimos 3 dias, sem melhora com descongestionantes. Nega tosse, dor de ouvido ou sintomas gastrointestinais. Antecedentes: rinite alérgica sazonal, sem comorbidades crônicas.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona que os sintomas persistem há 12 dias, com piora recente da febre e secreção purulenta.',
        dicas: ['Investigue duração dos sintomas, características da secreção e fatores de risco para infecção bacteriana']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para guiar o diagnóstico diferencial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Duração dos sintomas superior a 10 dias com piora', correta: true },
          { id: 'c', texto: 'Hábitos alimentares', correta: false },
          { id: 'd', texto: 'Atividade física semanal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas persistentes >10 dias ou piora sugerem sinusite bacteriana, justificando antibióticos [1,2,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A duração e progressão são chaves para diferenciar viral de bacteriana.',
        incorreto: 'Priorize a duração e características dos sintomas respiratórios neste contexto.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa congestão nasal com secreção mucopurulenta, sensibilidade à percussão nos seios maxilares e frontal à direita. Temperatura axilar 38,2°C, frequência respiratória 18 irpm.',
        dados: {
          'PA': '120/80 mmHg',
          'FC': '82 bpm',
          'T°': '38,2°C',
          'FR': '18 irpm',
          'Sat O2': '97% em ar ambiente'
        },
        dicas: ['Observe sinais de inflamação sinusal como sensibilidade facial e febre']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de sinusite aguda?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Taquicardia (FC 82 bpm)', correta: false },
          { id: 'b', texto: 'Sensibilidade à percussão dos seios paranasais', correta: true },
          { id: 'c', texto: 'Pressão arterial normal', correta: false },
          { id: 'd', texto: 'Saturação de O2 97%', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sensibilidade sinusal é um sinal clássico de inflamação dos seios paranasais em sinusite aguda [1,2,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames básicos. Resultados mostram leucocitose leve com neutrofilia, sem alterações significativas em outros parâmetros.',
        dados: {
          'Hemoglobina': '12,8 g/dL',
          'Leucócitos': '12.500/mm³',
          'Neutrófilos': '78%',
          'Plaquetas': '280.000/mm³',
          'PCR': '25 mg/L'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção viral isolada sem inflamação', correta: false },
          { id: 'b', texto: 'Sugestivo de infecção bacteriana com resposta inflamatória', correta: true },
          { id: 'c', texto: 'Anemia crônica', correta: false },
          { id: 'd', texto: 'Trombocitopenia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Leucocitose com neutrofilia e PCR elevada indicam infecção bacteriana provável em sinusite aguda [1,2,3].',
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
          { id: 'a', texto: 'Rinite alérgica simples', correta: false },
          { id: 'b', texto: 'Sinusite aguda bacteriana', correta: true },
          { id: 'c', texto: 'Gripe comum', correta: false },
          { id: 'd', texto: 'Dor de cabeça tensional', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas >10 dias, secreção purulenta, febre e sensibilidade sinusal confirmam sinusite aguda bacteriana [1,2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento, considerando guidelines.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas sintomáticos (descongestionantes) por 7 dias', correta: false },
          { id: 'b', texto: 'Antibióticos orais (amoxicilina) + sintomáticos', correta: true },
          { id: 'c', texto: 'Corticoides sistêmicos isolados', correta: false },
          { id: 'd', texto: 'Imagem (TC de seios) imediata', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Para sinusite bacteriana suspeita com sintomas >10 dias, antibióticos orais como amoxicilina são indicados, além de alívio sintomático [1,2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'A paciente retorna em 72 horas. Relata melhora da dor facial e redução da secreção, febre resolvida.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter antibióticos e reavaliar em 7 dias', correta: true },
          { id: 'b', texto: 'Suspender tratamento imediatamente', correta: false },
          { id: 'c', texto: 'Solicitar TC de seios paranasais', correta: false },
          { id: 'd', texto: 'Encaminhar para otorrinolaringologista urgente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora em 48-72 horas confirma resposta ao tratamento; completar curso antibiótico e follow-up [1,2,3].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 35 anos com sinusite aguda bacteriana confirmada clinicamente, tratada com amoxicilina e sintomáticos, com boa evolução.',
    diagnosticoFinal: 'Sinusite aguda bacteriana (CID-11: CA23)',
    tratamentoRealizado: 'Amoxicilina 500mg 8/8h por 10 dias + ibuprofeno e descongestionante nasal',
    evolucao: 'Melhora clínica em 72 horas, resolução completa em 10 dias, sem complicações.',
    licoesPrincipais: [
      'Sintomas persistentes >10 dias ou piora sugerem etiologia bacteriana em sinusite aguda [1,2,3].',
      'Exame físico com sensibilidade sinusal é essencial para o diagnóstico clínico.',
      'Antibióticos orais são indicados apenas em casos bacterianos suspeitos, evitando uso desnecessário.',
      'Reavaliação em 48-72 horas é crucial para monitorar resposta ao tratamento.',
      'No SUS, priorize casos com risco de complicações para terapia antibiótica [1,2,3].'
    ],
    errosComuns: [
      'Prescrever antibióticos para todos os casos de sinusite viral, aumentando resistência.',
      'Ignorar duração dos sintomas, tratando todos como virais inicialmente.',
      'Não investigar comorbidades como rinite alérgica que podem predispor a recorrências.',
      'Omitir alívio sintomático, focando apenas em antibióticos.'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e sinais de sinusite aguda bacteriana versus viral.',
    'Aplicar critérios para indicação de antibióticos em infecções respiratórias.',
    'Interpretar achados clínicos e laboratoriais básicos em infecções sinusal.',
    'Planejar tratamento e acompanhamento conforme guidelines brasileiras e internacionais.'
  ],
  competencias: [
    'Diagnóstico clínico de infecções respiratórias agudas',
    'Manejo farmacológico racional de sinusite',
    'Raciocínio clínico em atenção primária'
  ],
  doencasRelacionadas: ['sinusite'],
  medicamentosRelacionados: ['J01CA04', 'J01FA10', 'R01BA01'],
  calculadorasRelacionadas: [],
  referencias: [
    '[1] Systemic antibiotic treatment in routine practice... PMID: 11924228',
    '[2] Oral antibiotic therapy in current practice: acute sinusitis in children. PMID: 12090153',
    '[3] Oral antibiotic therapy in current practice: acute sinusitis in adults. PMID: 12090154'
  ],
  tags: ['sinusite aguda', 'infecção respiratória', 'antibióticos', 'atenção primária']
};