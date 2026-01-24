import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ESCARLATINA_ped_001: CasoClinico = {
  id: 'caso-escarlatina-001',
  titulo: 'Escarlatina em Criança Escolar',
  subtitulo: 'Criança de 8 anos com febre, faringite e exantema eritematoso',
  categoria: 'pediatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'João Pedro Silva',
      idade: 8,
      sexo: 'M',
      profissao: 'Estudante',
      estadoCivil: 'Solteiro'
    },
    queixaPrincipal: 'Febre alta e dor de garganta que piora ao engolir',
    historiaDoencaAtual: 'João Pedro, 8 anos, apresenta-se ao consultório com queixa de febre de até 39°C iniciada há 2 dias, associada a dor intensa na garganta, cefaleia e mal-estar. A mãe relata que a criança comeu pouco nos últimos dias devido à disfagia e que surgiu um rash cutâneo avermelhado no tronco e membros há 1 dia, com sensação de "papel de lixa" ao toque. Não há tosse ou coriza. A criança frequenta escola e teve contato com colegas com sintomas semelhantes na semana anterior. Sem comorbidades conhecidas, vacinas em dia e bom estado nutricional.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A mãe menciona exposição escolar e sintomas associados. O que deseja investigar?',
        dicas: ['Considere contágio, sintomas clássicos e fatores de risco em crianças']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de alergias alimentares', correta: false },
          { id: 'b', texto: 'Contato com colegas doentes na escola', correta: true },
          { id: 'c', texto: 'Dieta recente da criança', correta: false },
          { id: 'd', texto: 'Atividades recreativas ao ar livre', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exposição a Streptococcus pyogenes em ambientes escolares é fator de risco chave para escarlatina [1,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A transmissão é facilitada em grupos de crianças.',
        incorreto: 'Priorize histórico epidemiológico para infecções transmissíveis.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa faringite eritematosa com exsudato, língua em framboesa e exantema escarlatiniforme.',
        dados: {
          'Temperatura': '38.5°C',
          'FC': '110 bpm',
          'FR': '24 irpm',
          'Peso': '28 kg',
          'Estatura': '130 cm',
          'Exame de orofaringe': 'Eritematoso com exsudato branco',
          'Pele': 'Rash eritematoso fino no tronco e abdome'
        },
        dicas: ['Observe sinais clássicos como rash e língua saburral']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de escarlatina?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Febre isolada', correta: false },
          { id: 'b', texto: 'Língua em framboesa e rash escarlatiniforme', correta: true },
          { id: 'c', texto: 'Aumento de linfonodos cervicais', correta: false },
          { id: 'd', texto: 'Tosse produtiva', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O exantema eritematoso e a língua em framboesa são sinais patognomônicos de infecção por Streptococcus pyogenes toxigênico [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita testes para confirmação. Resultados laboratoriais e microbiológicos:',
        dados: {
          'Hemograma': 'Leucocitose com neutrofilia (WBC 14.000/mm³, neutrófilos 75%)',
          'ASLO': 'Elevado (450 UI/mL)',
          'Teste rápido para antígeno estreptocócico': 'Positivo',
          'Cultura de orofaringe': 'Streptococcus pyogenes (grupo A)',
          'PCR': 'Normal'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção viral inespecífica', correta: false },
          { id: 'b', texto: 'Infecção por Streptococcus pyogenes confirmada', correta: true },
          { id: 'c', texto: 'Mononucleose infecciosa', correta: false },
          { id: 'd', texto: 'Reação alérgica a medicamento', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Teste rápido positivo e cultura confirmam faringite estreptocócica; ASLO elevado indica infecção recente [1,3,7].',
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
          { id: 'a', texto: 'Escarlatina por Streptococcus pyogenes', correta: true },
          { id: 'b', texto: 'Dengue com rash', correta: false },
          { id: 'c', texto: 'Faringite viral com exantema', correta: false },
          { id: 'd', texto: 'Doença de Kawasaki', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Combinação de faringite, exantema e confirmação microbiológica é clássica para escarlatina [1,2,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o manejo inicial, considerando diretrizes do SUS e IDSA.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Tratamento sintomático apenas', correta: false },
          { id: 'b', texto: 'Penicilina benzatina IM única dose', correta: true },
          { id: 'c', texto: 'Amoxicilina por 3 dias', correta: false },
          { id: 'd', texto: 'Ceftriaxona IV', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tratamento empírico com penicilina erradica o patógeno e previne complicações; notificação ao SUS obrigatória [1,3,8].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'A criança retorna em 10 dias. Sintomas resolvidos, rash desquamativo residual, ASLO normalizando.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alta com orientação e seguimento em 4 semanas para complicações', correta: true },
          { id: 'b', texto: 'Repetir antibiótico', correta: false },
          { id: 'c', texto: 'Solicitar ecocardiograma imediato', correta: false },
          { id: 'd', texto: 'Internar para observação', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resolução clínica com tratamento adequado; vigilância para febre reumática em 2-4 semanas [1,3,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Criança de 8 anos com escarlatina confirmada, tratada com penicilina, evoluiu com resolução completa dos sintomas e sem complicações.',
    diagnosticoFinal: 'Escarlatina (CA23 - CID-11)',
    tratamentoRealizado: 'Penicilina benzatina IM (dose única de 600.000 UI), analgésicos, hidratação e notificação ao SUS.',
    evolucao: 'Melhora rápida em 48 horas, rash desquamativo em 7-10 dias, seguimento sem sequelas.',
    licoesPrincipais: [
      'Reconhecer triade clássica: faringite, exantema e toxemia em crianças escolares [1,2].',
      'Confirmar com teste rápido ou cultura para Streptococcus grupo A [1,3].',
      'Tratar empiricamente com penicilina para prevenir glomerulonefrite e febre reumática [1,8].',
      'Notificação compulsória no Brasil via SUS para vigilância epidemiológica [3,4].',
      'Educação sobre higiene em ambientes escolares reduz surtos [5,9].'
    ],
    errosComuns: [
      'Confundir com infecções virais e omitir antibiótico, arriscando complicações [1].',
      'Não notificar ao SUS, subestimando impacto epidemiológico [3,4].',
      'Usar antibióticos de amplo espectro desnecessariamente, promovendo resistência [8].',
      'Ignorar seguimento para detecção precoce de sequelas não supurativas [2,7].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar sinais e sintomas clássicos de escarlatina em contexto pediátrico.',
    'Aplicar testes diagnósticos recomendados para faringite estreptocócica.',
    'Selecionar tratamento antibiótico conforme diretrizes IDSA e SUS.',
    'Compreender a importância da notificação e prevenção de complicações.'
  ],
  competencias: [
    'Diagnóstico diferencial de exantemas infecciosos em pediatria',
    'Manejo de infecções bacterianas transmissíveis',
    'Adesão a protocolos de vigilância epidemiológica no SUS'
  ],
  doencasRelacionadas: ['escarlatina'],
  medicamentosRelacionados: ['penicilina', 'amoxicilina'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-005', 'ref-007', 'ref-008', 'ref-009'],
  tags: ['pediatria', 'infectologia', 'escarlatina', 'estreptococo', 'exantema']
};