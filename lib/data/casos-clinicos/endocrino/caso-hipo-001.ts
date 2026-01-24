import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_HIPO_end_001: CasoClinico = {
  id: 'caso-hipotireoidismo-001',
  titulo: 'Mulher com fadiga persistente e ganho de peso',
  subtitulo: 'Paciente de 55 anos relata cansaço excessivo e alterações no peso, sugestivos de disfunção tireoidiana',
  categoria: 'endocrino',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 55,
      sexo: 'F',
      profissao: 'Dona de casa',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou sempre cansada e engordei 8 kg nos últimos 6 meses sem mudar minha alimentação',
    historiaDoencaAtual: 'Maria, 55 anos, relata fadiga intensa há 4 meses, que piora com o frio, intolerância ao frio, constipação intestinal crônica, pele seca e queda de cabelo. Nega febre, perda de peso ou sintomas de hiperatividade. História de artrite reumatoide diagnosticada há 10 anos, em uso de prednisona em doses baixas. Sem comorbidades cardiovasculares conhecidas. Iniciou sintomas após uma infecção respiratória não tratada.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona história familiar de problemas tireoidianos na mãe e uso intermitente de amiodarona no passado por arritmia. O que deseja investigar?',
        dicas: ['Considere história familiar, medicamentos e sintomas associados como intolerância ao frio e constipação']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'História familiar de doenças autoimunes', correta: true },
          { id: 'c', texto: 'Prática de exercícios físicos', correta: false },
          { id: 'd', texto: 'Dieta alimentar detalhada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História familiar de autoimunidade é fator de risco para hipotireoidismo, comum em mulheres adultas [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! A história familiar direciona para causas autoimunes.',
        incorreto: 'Priorize fatores de risco como história familiar para disfunções tireoidianas.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa pele seca e áspera, bradicardia, mixedema pretibial e tireoide aumentada (bócio difuso).',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '58 bpm',
          'FR': '14 irpm',
          'IMC': '28.5 kg/m²',
          'Peso': '68 kg',
          'Estatura': '1,55 m'
        },
        dicas: ['Note a bradicardia e o bócio, achados clássicos de hipotireoidismo']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de hipotireoidismo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 130/80 mmHg', correta: false },
          { id: 'b', texto: 'FC 58 bpm e bócio', correta: true },
          { id: 'c', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'd', texto: 'FR 14 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Bradicardia e bócio são sinais clássicos de hipotireoidismo primário [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados laboratoriais:',
        dados: {
          'TSH': '12,5 mUI/L (ref: 0,4-4,0)',
          'T4 livre': '0,6 ng/dL (ref: 0,8-1,8)',
          'Anti-TPO': 'Positivo (>100 UI/mL)',
          'Colesterol total': '240 mg/dL',
          'Hemoglobina': '11,5 g/dL',
          'Creatinina': '0,9 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipertireoidismo subclínico', correta: false },
          { id: 'b', texto: 'Hipotireoidismo primário autoimune', correta: true },
          { id: 'c', texto: 'Eutiroidismo com dislipidemia', correta: false },
          { id: 'd', texto: 'Hipotireoidismo central', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'TSH elevado com T4 livre baixo e anti-TPO positivo confirmam hipotireoidismo primário por tireoidite de Hashimoto [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese diagnóstica principal.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipotireoidismo primário autoimune', correta: true },
          { id: 'b', texto: 'Hipotireoidismo subclínico', correta: false },
          { id: 'c', texto: 'Doença de Basedow', correta: false },
          { id: 'd', texto: 'Tireoidite subaguda', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas clássicos, bócio, TSH elevado, T4 baixo e anti-TPO positivo apontam para tireoidite de Hashimoto [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano de tratamento inicial, considerando diretrizes.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Observação sem medicação', correta: false },
          { id: 'b', texto: 'Levotiroxina 50 mcg/dia', correta: true },
          { id: 'c', texto: 'Propiltiouracil', correta: false },
          { id: 'd', texto: 'Corticoides isolados', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Reposição com levotiroxina na dose inicial de 1,6 mcg/kg/dia é o tratamento padrão para hipotireoidismo manifesto [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'A paciente retorna em 6 semanas. Relata melhora na fadiga e constipação. TSH agora 2,1 mUI/L, T4 livre 1,2 ng/dL.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter dose e retornar em 6 meses', correta: true },
          { id: 'b', texto: 'Aumentar dose de levotiroxina', correta: false },
          { id: 'c', texto: 'Suspender medicação', correta: false },
          { id: 'd', texto: 'Solicitar USG de tireoide imediatamente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'TSH normalizado indica boa resposta. Acompanhamento semestral em pacientes estáveis [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 55 anos com sintomas clássicos de hipotireoidismo primário autoimune, diagnosticado por TSH elevado e anti-TPO positivo, tratado com levotiroxina com boa evolução.',
    diagnosticoFinal: 'Hipotireoidismo primário autoimune (tireoidite de Hashimoto)',
    tratamentoRealizado: 'Levotiroxina sódica 100 mcg/dia, com ajuste baseado em TSH',
    evolucao: 'Melhora sintomática em 6 semanas, TSH e T4 normalizados, sem complicações',
    licoesPrincipais: [
      'Sintomas como fadiga e ganho de peso em mulheres >35 anos justificam rastreamento de TSH [1,2].',
      'TSH é o exame inicial de escolha; T4 livre e anti-TPO confirmam etiologia [1,2].',
      'Reposição com levotiroxina melhora sintomas e previne complicações cardiovasculares [1,2].',
      'Rastreamento em grupos de risco, como gestantes e idosos, segue diretrizes SUS e SBEM [3,4].',
      'Monitoramento de TSH a cada 6-8 semanas inicialmente, depois anualmente [1,2].'
    ],
    errosComuns: [
      'Atribuir sintomas à "menopausa" ou envelhecimento sem investigar tireoide [1].',
      'Não dosar TSH em pacientes com dislipidemia ou anemia inexplicada [2].',
      'Iniciar dose inadequada de levotiroxina sem considerar peso e comorbidades [1].',
      'Ignorar história de autoimunidade como fator de risco [2].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e sinais clínicos de hipotireoidismo em atenção primária.',
    'Interpretar resultados de TSH, T4 livre e anticorpos antitireoidianos.',
    'Indicar tratamento inicial com levotiroxina e planejar acompanhamento.',
    'Aplicar diretrizes de rastreamento para disfunções tireoidianas em adultos.'
  ],
  competencias: ['Anamnese em endocrinologia', 'Exame físico de tireoide', 'Interpretação de exames laboratoriais', 'Prescrição de reposição hormonal'],
  doencasRelacionadas: ['hipotireoidismo'],
  medicamentosRelacionados: ['H03AA01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004'],
  tags: ['tireoide', 'hipotireoidismo', 'rastreamento', 'endocrinologia', 'autoimune']
};