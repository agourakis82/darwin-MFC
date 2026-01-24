import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_VITD_end_001: CasoClinico = {
  id: 'caso-deficiencia-vitamina-d-001',
  titulo: 'Fadiga e dores ósseas em idosa',
  subtitulo: 'Mulher de 60 anos com sintomas sugestivos de deficiência nutricional',
  categoria: 'endocrino',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 60,
      sexo: 'F',
      profissao: 'Aposentada',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Estou cansada o tempo todo e sinto dores nos ossos das costas e pernas há uns três meses.',
    historiaDoencaAtual: 'Paciente refere fadiga progressiva, dores difusas em ossos e músculos, sem febre ou perda de peso. Negam trauma recente. Exposição solar limitada por morar em região sul do Brasil e evitar sol por medo de câncer de pele. Dieta pobre em laticínios e peixes. Antecedente de obesidade e hipertensão arterial controlada com medicação. Sem histórico de cirurgias gastrointestinais ou uso crônico de corticoides.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona baixa exposição solar e dieta inadequada. O que deseja investigar?',
        dicas: ['Considere fatores de risco como exposição solar, dieta e comorbidades como obesidade [1,5].']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de diabetes', correta: false },
          { id: 'b', texto: 'Exposição solar e hábitos alimentares', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'Viagens recentes ao exterior', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Fatores de risco como baixa exposição solar e dieta pobre em vitamina D são fundamentais para suspeita de deficiência [1,5].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Exposição solar e dieta são chaves para o diagnóstico.',
        incorreto: 'Priorize fatores de risco nutricionais e ambientais.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa paciente com IMC elevado e sensibilidade à palpação em vértebras e membros inferiores.',
        dados: {
          'PA': '135/85 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'IMC': '29.5 kg/m²',
          'Pele e mucosas': 'Pálidas, sem icterícia',
          'Músculo-esquelético': 'Dor à palpação em ossos longos'
        },
        dicas: ['Note a obesidade e dor óssea, sugestivos de deficiência de vitamina D [1,2].']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 135/85 mmHg', correta: false },
          { id: 'b', texto: 'Dor à palpação óssea', correta: true },
          { id: 'c', texto: 'IMC 29.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 76 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Dor óssea difusa pode indicar osteomalácia por deficiência de vitamina D [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames laboratoriais iniciais. Resultados chegam:',
        dados: {
          '25-Hidroxivitamina D': '12 ng/mL (ref: 30-100)',
          'Cálcio sérico': '8.9 mg/dL (ref: 8.5-10.2)',
          'Fósforo sérico': '3.2 mg/dL (ref: 2.5-4.5)',
          'PTH intacta': '65 pg/mL (ref: 15-65)',
          'Creatinina': '0.8 mg/dL',
          'TFGe': '85 mL/min/1.73m²'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Deficiência grave de vitamina D com PTH elevada', correta: true },
          { id: 'b', texto: 'Hiperparatireoidismo primário', correta: false },
          { id: 'c', texto: 'Hipocalcemia isolada', correta: false },
          { id: 'd', texto: 'Insuficiência renal crônica', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: '25-OH Vit D <20 ng/mL indica deficiência grave; PTH no limite superior sugere compensação [1,9].',
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
          { id: 'a', texto: 'Deficiência de vitamina D com osteomalácia subclínica', correta: true },
          { id: 'b', texto: 'Osteoporose pós-menopausa isolada', correta: false },
          { id: 'c', texto: 'Artrite reumatoide', correta: false },
          { id: 'd', texto: 'Hipotireoidismo', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas, fatores de risco e dosagem baixa de 25-OH Vit D confirmam deficiência, associada a riscos ósseos [1,2,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano de tratamento inicial, considerando guidelines.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação dietética', correta: false },
          { id: 'b', texto: 'Suplementação de vitamina D 50.000 UI/semana por 8 semanas', correta: true },
          { id: 'c', texto: 'Cálcio IV imediato', correta: false },
          { id: 'd', texto: 'Bifosfonatos orais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Deficiência grave requer reposição de alta dose inicial, seguida de manutenção [1,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Seguimento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após suplementação. Refere melhora na fadiga e dores. Novo exame: 25-OH Vit D 35 ng/mL.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter suplementação de manutenção 1.000 UI/dia e retorno em 6 meses', correta: true },
          { id: 'b', texto: 'Aumentar dose para 100.000 UI/semana', correta: false },
          { id: 'c', texto: 'Suspender toda suplementação', correta: false },
          { id: 'd', texto: 'Encaminhar para densitometria óssea imediata', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Níveis corrigidos; manter profilaxia em grupo de risco e monitorar periodicamente [1,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente idosa com fatores de risco para deficiência de vitamina D apresentou sintomas clássicos, confirmados por dosagem sérica baixa. Tratamento com suplementação levou à resolução dos sintomas e normalização laboratorial.',
    diagnosticoFinal: 'Deficiência de vitamina D (CID-11: CA23)',
    tratamentoRealizado: 'Suplementação de colecalciferol 50.000 UI/semana por 8 semanas, seguida de 1.000 UI/dia, associada a orientação sobre exposição solar e dieta rica em cálcio.',
    evolucao: 'Melhora significativa dos sintomas em 3 meses, com níveis de 25-OH Vit D normalizados e sem complicações.',
    licoesPrincipais: [
      'Rastreie deficiência de vitamina D em populações de risco como idosos, obesos e com baixa exposição solar [1,7].',
      'Dosagem sérica de 25-hidroxivitamina D é o método gold standard para diagnóstico [1,9].',
      'Tratamento inicial com doses altas corrige rapidamente a deficiência, prevenindo osteomalácia e osteoporose [1,2].',
      'Monitoramento anual em grupos de alto risco é recomendado pelas guidelines [7,8].',
      'Associação com riscos extraskeletais como infecções e autoimunidade reforça a importância do rastreamento [2,4].'
    ],
    errosComuns: [
      'Ignorar fatores de risco como baixa insolação, comum no sul do Brasil [5,6].',
      'Não dosar 25-OH Vit D, optando por exames desnecessários como radiografias iniciais.',
      'Subestimar a prevalência em idosos brasileiros (20-40%), atrasando o diagnóstico [5].',
      'Iniciar tratamento sem confirmação laboratorial, arriscando sobredosagem.'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e sintomas de deficiência de vitamina D em atenção primária.',
    'Interpretar dosagem de 25-hidroxivitamina D e exames associados.',
    'Aplicar recomendações de rastreamento e tratamento conforme guidelines brasileiras e internacionais.',
    'Planejar seguimento para prevenção de complicações ósseas e extraskeletais.'
  ],
  competencias: ['anamnese', 'exame_fisico', 'interpretacao_exames', 'raciocinio_diagnostico', 'terapeutica', 'acompanhamento'],
  doencasRelacionadas: ['deficiencia-vitamina-d'],
  medicamentosRelacionados: [],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-005', 'ref-006', 'ref-007', 'ref-008', 'ref-009'],
  tags: ['vitamina D', 'deficiência nutricional', 'osteomalácia', 'rastreamento', 'idosos']
};