import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_HERPES_inf_001: CasoClinico = {
  id: 'caso-herpes-zoster-001',
  titulo: 'Dor intensa com erupção vesicular no tórax',
  subtitulo: 'Paciente idoso com quadro sugestivo de reativação viral',
  categoria: 'infeccioso',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 62,
      sexo: 'M',
      profissao: 'Aposentado (ex-motorista)',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Dor forte no lado direito do peito que começou há 3 dias, agora com bolhas na pele.',
    historiaDoencaAtual: 'Paciente refere história de varicela na infância. Há 3 dias, iniciou dor intensa em queimação no hemitórax direito, precedendo o aparecimento de eritema e vesículas agrupadas. A dor é contínua, agravada pelo toque, e interfere no sono. Nega febre alta, mas refere mal-estar. Sem comorbidades conhecidas, mas relata estresse recente devido a problemas familiares. Antecedentes: hipertensão controlada com losartana 50 mg/dia.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona ter tido catapora na infância e nega contato recente com casos de varicela. Relata uso de anti-hipertensivos e ausência de imunossupressão conhecida.',
        dicas: ['Investigue fatores de risco como idade avançada, estresse e história de varicela; pergunte sobre imunossupressão ou comorbidades [1,3].']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o diagnóstico diferencial neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'História prévia de varicela e idade >50 anos', correta: true },
          { id: 'c', texto: 'Dieta alimentar habitual', correta: false },
          { id: 'd', texto: 'Atividade física recente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A reativação do VZV ocorre em indivíduos com história de varicela, especialmente após 50 anos, devido à imunossenescência [1,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A idade e história de varicela são fatores de risco chave para herpes zoster.',
        incorreto: 'Priorize fatores etiológicos como história de infecção primária por VZV.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa eritema com vesículas claras agrupadas em dermatoma T5-T6 direito, sem disseminação. A área é dolorosa ao toque. Sinais vitais: PA 140/85 mmHg, FC 82 bpm, FR 16 irpm, T 37.2°C.',
        dados: {
          'PA': '140/85 mmHg',
          'FC': '82 bpm',
          'FR': '16 irpm',
          'Temperatura': '37.2°C',
          'Exame dermatológico': 'Vesículas em dermatoma torácico direito'
        },
        dicas: ['Observe o padrão dermatomal das lesões, típico de herpes zoster; avalie disseminação ou envolvimento oftálmico [1,3].']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS característico do quadro?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Febre alta e linfadenopatia generalizada', correta: false },
          { id: 'b', texto: 'Vesículas agrupadas em dermatoma unilateral', correta: true },
          { id: 'c', texto: 'Rash maculopapular difuso', correta: false },
          { id: 'd', texto: 'Lesões purpuricas em extremidades', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O herpes zoster apresenta rash vesicular unilateral em distribuição dermatomal, devido à reativação ganglionar do VZV [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para confirmação e exclusão de complicações. Resultados: PCR para VZV positivo no líquido vesicular; hemograma normal; glicemia 110 mg/dL; função renal preservada (creatinina 0.9 mg/dL).',
        dados: {
          'PCR para VZV': 'Positivo',
          'Hemograma': 'Leucócitos 7.200/mm³, sem linfocitose',
          'Glicemia de jejum': '110 mg/dL',
          'Creatinina': '0.9 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção bacteriana secundária confirmada', correta: false },
          { id: 'b', texto: 'Confirmação etiológica por VZV sem complicações sistêmicas', correta: true },
          { id: 'c', texto: 'Diabetes descontrolado como fator predisponente', correta: false },
          { id: 'd', texto: 'Insuficiência renal aguda', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O PCR positivo para VZV em lesões vesiculares confirma o diagnóstico de herpes zoster; exames básicos excluem imunossupressão grave [1,3].',
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
          { id: 'a', texto: 'Herpes simplex recorrente', correta: false },
          { id: 'b', texto: 'Herpes zoster (shingles)', correta: true },
          { id: 'c', texto: 'Dermatite de contato alérgica', correta: false },
          { id: 'd', texto: 'Zona oftálmica por outra causa', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O padrão dermatomal, dor precedendo rash e PCR positivo são diagnósticos de herpes zoster causado por reativação do VZV [1,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'O paciente está dentro de 72 horas do início do rash. Defina o manejo inicial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas analgésicos tópicos e observação', correta: false },
          { id: 'b', texto: 'Valaciclovir 1g TID por 7 dias + analgésicos orais', correta: true },
          { id: 'c', texto: 'Corticoides sistêmicos isolados', correta: false },
          { id: 'd', texto: 'Antibióticos orais para infecção secundária', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Antivirais orais como valaciclovir dentro de 72 horas reduzem duração do rash e risco de neuralgia pós-herpética em adultos >50 anos [1,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 2 semanas: rash resolvendo, mas dor persistente moderada. Nega disseminação. Você discute prevenção.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter analgésicos e indicar vacinação com Shingrix em 2 doses', correta: true },
          { id: 'b', texto: 'Reiniciar antiviral por dor residual', correta: false },
          { id: 'c', texto: 'Encaminhar imediatamente para neurologia', correta: false },
          { id: 'd', texto: 'Suspender todo tratamento', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Para prevenção de recorrência, vacinar com Shingrix (2 doses, 2-6 meses) em adultos ≥50 anos; monitorar neuralgia pós-herpética [1,3,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 62 anos com herpes zoster torácico direito, tratado precocemente com antiviral, evoluiu com resolução cutânea mas dor residual gerenciada ambulatorialmente.',
    diagnosticoFinal: 'Herpes zoster (CID-11: CA23)',
    tratamentoRealizado: 'Valaciclovir 1g TID por 7 dias; paracetamol para dor; orientação para higiene local e prevenção de disseminação.',
    evolucao: 'Rash resolveu em 10 dias; dor diminuiu em 4 semanas, sem neuralgia pós-herpética grave. Vacinação preventivadora planejada.',
    licoesPrincipais: [
      'Herpes zoster é causado por reativação do VZV em dermatoma, comum após 50 anos [1,3].',
      'Tratamento antiviral deve iniciar em até 72 horas para reduzir complicações como neuralgia [1,3].',
      'Diagnóstico é clínico, confirmado por PCR se necessário; diferencie de herpes simplex [1,3].',
      'Prevenção com vacina Shingrix é recomendada para ≥50 anos ou imunossuprimidos [3,9].',
      'Manejo da dor é essencial, com gabapentinoides se neuralgia persistir [1].'
    ],
    errosComuns: [
      'Atrasar antiviral além de 72 horas, aumentando risco de complicações [1,3].',
      'Confundir com infecção bacteriana e iniciar antibióticos desnecessários.',
      'Não investigar disseminação em imunossuprimidos, levando a hospitalização [6].',
      'Omitir vacinação preventiva em pacientes de risco [9].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer os sinais e sintomas clássicos de herpes zoster e seus fatores de risco.',
    'Indicar tratamento antiviral oportuno e manejo da dor conforme guidelines.',
    'Discutir estratégias preventivas, incluindo vacinação em populações vulneráveis.',
    'Diferenciar herpes zoster de outras erupções vesiculares.'
  ],
  competencias: [
    'Diagnóstico clínico de infecções virais cutâneas',
    'Prescrição de antivirais e analgésicos em atenção primária',
    'Aconselhamento em imunização para doenças infecciosas'
  ],
  doencasRelacionadas: ['herpes-zoster'],
  medicamentosRelacionados: ['aciclovir', 'valaciclovir', 'paracetamol'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-003', 'ref-009'],
  tags: ['herpes zoster', 'cobreiro', 'varicela zoster', 'antiviral', 'vacinação']
};