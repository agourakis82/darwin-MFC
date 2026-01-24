import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_GASTRITE_gas_001: CasoClinico = {
  id: 'caso-gastrite-001',
  titulo: 'Dispepsia Crônica em Mulher Adulta',
  subtitulo: 'Paciente com dor epigástrica persistente e suspeita de infecção por H. pylori',
  categoria: 'gastro',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 52,
      sexo: 'F',
      profissao: 'Dona de casa',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou com dor no estômago faz semanas, parece que queima',
    historiaDoencaAtual: 'Paciente refere dor epigástrica intermitente há 3 meses, piora pós-refeições, associada a náuseas e sensação de plenitude. Nega vômitos, perda de peso ou sangramento. Usa ibuprofeno ocasionalmente para dores articulares. Sem histórico de endoscopia prévia. Sintomas iniciaram após episódio de infecção respiratória não tratada.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona uso frequente de AINEs e origem de região rural com saneamento precário. O que deseja investigar?',
        dicas: ['Considere fatores de risco para H. pylori, como higiene e medicamentos [2,3]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de diabetes', correta: false },
          { id: 'b', texto: 'Uso de AINEs e condições socioeconômicas', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'Viagens internacionais recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'AINEs podem causar gastrite erosiva, e condições de baixa renda aumentam risco de H. pylori [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Fatores de risco são cruciais para suspeita de H. pylori.',
        incorreto: 'Priorize elementos que contribuem para gastrite, como AINEs e epidemiologia local.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, a paciente está em bom estado geral, sem sinais de desnutrição. Abdome doloroso à palpação superficial em epigástrio, sem defesa ou visceromegalias.',
        dados: {
          'PA': '128/80 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'IMC': '27.5 kg/m²',
          'Abdome': 'Doloroso em epigástrio, sem massas'
        },
        dicas: ['Dor epigástrica sugere dispepsia orgânica [11,12]']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS relevante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA normal', correta: false },
          { id: 'b', texto: 'Dor epigástrica à palpação', correta: true },
          { id: 'c', texto: 'IMC 27.5', correta: false },
          { id: 'd', texto: 'FC 76 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Dor localizada em epigástrio orienta para patologias gástricas, como gastrite [1,11].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita testes para H. pylori. Resultados chegam:',
        dados: {
          'Teste respiratório com ureia': 'Positivo',
          'Hemograma': 'Normal (Hb 12.5 g/dL)',
          'Ureia': '45 mg/dL',
          'Creatinina': '0.8 mg/dL',
          'Sorologia IgG H. pylori': 'Positiva'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção ativa por H. pylori confirmada', correta: true },
          { id: 'b', texto: 'Apenas gastrite autoimune', correta: false },
          { id: 'c', texto: 'Úlcera péptica sem infecção', correta: false },
          { id: 'd', texto: 'Refluxo gastroesofágico isolado', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Teste respiratório positivo indica infecção ativa por H. pylori, comum em dispepsia [2,9,10].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame e testes, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Gastrite por H. pylori', correta: true },
          { id: 'b', texto: 'Gastrite erosiva por AINEs isolada', correta: false },
          { id: 'c', texto: 'Câncer gástrico inicial', correta: false },
          { id: 'd', texto: 'Doença celíaca', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas de dispepsia com teste positivo para H. pylori confirmam gastrite associada [2,11,12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de erradicação.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas inibidor de bomba de prótons (IBP) por 4 semanas', correta: false },
          { id: 'b', texto: 'Terapia quádrupla com bismuto por 14 dias', correta: true },
          { id: 'c', texto: 'Antibióticos isolados sem IBP', correta: false },
          { id: 'd', texto: 'Endoscopia imediata sem tratamento', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Terapia quádrupla é recomendada para erradicação de H. pylori em regiões de alta resistência [2,9,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 6 semanas. Sintomas melhoraram, teste respiratório negativo.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter acompanhamento anual e orientar higiene', correta: true },
          { id: 'b', texto: 'Repetir endoscopia imediatamente', correta: false },
          { id: 'c', texto: 'Suspender todo tratamento', correta: false },
          { id: 'd', texto: 'Iniciar profilaxia com IBP vitalício', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Erradicação confirmada; acompanhamento para prevenção de recidiva e complicações [2,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 52 anos com dispepsia diagnosticada como gastrite por H. pylori, tratada com sucesso com terapia de erradicação.',
    diagnosticoFinal: 'Gastrite crônica associada a infecção por Helicobacter pylori (CID-11: CA23)',
    tratamentoRealizado: 'Terapia quádrupla: omeprazol 20mg 2x/dia, bismuto 240mg 4x/dia, tetraciclina 500mg 4x/dia, metronidazol 500mg 3x/dia por 14 dias. Orientação dietética e suspensão de AINEs.',
    evolucao: 'Sintomas resolvidos em 4 semanas, teste de confirmação negativo. Retorno em 6 meses sem recidiva.',
    licoesPrincipais: [
      'Teste para H. pylori é essencial em dispepsia não investigada, especialmente em populações de risco [9,11].',
      'Terapia de erradicação reduz risco de úlceras e câncer gástrico [2,7].',
      'Fatores socioeconômicos no Brasil aumentam prevalência de H. pylori [5,6].',
      'Confirmação pós-tratamento é recomendada para evitar falhas [2,9].',
      'Evitar AINEs em pacientes com gastrite [1,2].'
    ],
    errosComuns: [
      'Ignorar teste para H. pylori em dispepsia, optando por sintomáticos apenas [11].',
      'Usar terapia dupla em vez de quádrupla em áreas de resistência [2].',
      'Não confirmar erradicação, levando a recidivas [9].',
      'Prescrever IBP isolado sem erradicação em infecção confirmada [11,12].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e sintomas de gastrite por H. pylori.',
    'Selecionar testes diagnósticos apropriados para dispepsia.',
    'Aplicar diretrizes de tratamento de erradicação no contexto brasileiro.',
    'Compreender a importância do acompanhamento pós-tratamento.'
  ],
  competencias: [
    'Anamnese e exame físico em gastroenterologia',
    'Interpretação de exames para infecções gastrointestinais',
    'Prescrição de terapias antimicrobianas',
    'Acompanhamento de doenças crônicas em atenção primária'
  ],
  doencasRelacionadas: ['gastrite', 'infecção por H. pylori', 'dispepsia'],
  medicamentosRelacionados: ['A02BC01', 'A02BC02', 'J01MA02'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-005', 'ref-006', 'ref-009', 'ref-010', 'ref-011', 'ref-012'],
  tags: ['gastrite', 'h_pylori', 'dispepsia', 'erradicação', 'atenção primária']
};