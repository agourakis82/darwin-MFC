import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DESNUTRI_ger_001: CasoClinico = {
  id: 'caso-deficiencia-vitamina-b12-001',
  titulo: 'Deficiência de Vitamina B12 em Idosa com Fadiga e Neuropatia',
  subtitulo: 'Caso de uma idosa com sintomas neurológicos e hematológicos sugestivos de deficiência nutricional',
  categoria: 'geriatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 72,
      sexo: 'F',
      profissao: 'Aposentada',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'Estou me sentindo muito cansada ultimamente, e tenho um formigamento nas mãos e nos pés que não passa.',
    historiaDoencaAtual: 'Paciente refere fadiga progressiva há 6 meses, associada a perda de apetite e fraqueza generalizada. Negam febre ou perda de peso acentuada, mas menciona dieta pobre em carnes, com preferência por vegetais e pães. Usa inibidor de bomba de prótons (omeprazol) há 2 anos para refluxo gastroesofágico. Sem história de cirurgias gastrointestinais ou alcoolismo. Exame inicial revela palidez discreta e marcha instável.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente relata dieta vegetariana não suplementada há anos e uso crônico de omeprazol. O que mais deseja investigar?',
        dicas: ['Considere hábitos alimentares, medicamentos e sintomas gastrointestinais [1,2]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para o quadro atual?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de câncer', correta: false },
          { id: 'b', texto: 'Dieta vegetariana e uso de inibidores de bomba de prótons', correta: true },
          { id: 'c', texto: 'Atividade física recente', correta: false },
          { id: 'd', texto: 'Viagens internacionais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Dieta vegetariana e uso crônico de IBPs aumentam o risco de deficiência de B12 por má absorção [1,2,5].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores de risco nutricionais e medicamentos são cruciais em idosos.',
        incorreto: 'Priorize fatores de risco para deficiência de B12, como dieta e medicamentos.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa palidez cutânea, diminuição da força muscular em membros inferiores e perda de sensibilidade vibratória nos pés. Marcha atáxica leve.',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '82 bpm',
          'FR': '16 irpm',
          'IMC': '21.5 kg/m²',
          'Exame neurológico': 'Diminuição de sensibilidade vibratória distal'
        },
        dicas: ['Atenção para sinais de anemia e neuropatia periférica [2,4]']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de deficiência de B12?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 130/80 mmHg', correta: false },
          { id: 'b', texto: 'Perda de sensibilidade vibratória e ataxia', correta: true },
          { id: 'c', texto: 'IMC 21.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 82 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Neuropatia sensorial e ataxia são manifestações clássicas da deficiência de B12, podendo ser irreversíveis se não tratadas precocemente [2,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames laboratoriais iniciais. Resultados mostram anemia macrocítica e níveis alterados de metabólitos.',
        dados: {
          'Hemoglobina': '9.8 g/dL',
          'VCM': '105 fL',
          'Vitamina B12 sérica': '150 pg/mL',
          'Ácido metilmalônico': 'Elevado (0.8 µmol/L)',
          'Homocisteína': '25 µmol/L',
          'Ferritina': 'Normal'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar esses resultados laboratoriais?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Anemia ferropriva isolada', correta: false },
          { id: 'b', texto: 'Deficiência de B12 com anemia megaloblástica', correta: true },
          { id: 'c', texto: 'Apenas elevação de homocisteína por idade', correta: false },
          { id: 'd', texto: 'Deficiência de folato', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'B12 <200 pg/mL com MMA e homocisteína elevadas confirmam deficiência funcional de B12. Anemia macrocítica (VCM >100 fL) é comum [1,3,4].',
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
          { id: 'a', texto: 'Deficiência de vitamina B12 por má absorção', correta: true },
          { id: 'b', texto: 'Doença de Parkinson inicial', correta: false },
          { id: 'c', texto: 'Anemia por sangramento oculto', correta: false },
          { id: 'd', texto: 'Hipotireoidismo', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas neurológicos, dieta de risco e exames confirmam deficiência de B12, comum em idosos (prevalência 5-15%) [2,3,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento, considerando evidências para reposição.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Reposição oral de B12 1000 mcg/dia', correta: false },
          { id: 'b', texto: 'Injeções intramusculares de B12 1000 mcg/semana por 1 mês, depois mensal', correta: true },
          { id: 'c', texto: 'Apenas orientação dietética', correta: false },
          { id: 'd', texto: 'Suplemento de folato isolado', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em casos com sintomas neurológicos, reposição IM inicial é preferida para absorção garantida, seguida de manutenção oral ou IM [3,4,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, a paciente retorna com melhora da fadiga e formigamento reduzido. Hemoglobina 12.5 g/dL, B12 normalizada.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter B12 IM mensal e reavaliar em 6 meses', correta: true },
          { id: 'b', texto: 'Suspender tratamento por melhora', correta: false },
          { id: 'c', texto: 'Intensificar dose por persistência de sintomas', correta: false },
          { id: 'd', texto: 'Encaminhar para gastroenterologia imediata', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Manutenção vitalícia é necessária em casos de má absorção; monitorar anualmente em idosos de risco [1,7,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Idosa com deficiência de vitamina B12 manifestada por anemia megaloblástica e neuropatia, associada a dieta vegetariana e uso de IBP. Tratada com reposição IM com boa resposta.',
    diagnosticoFinal: 'Deficiência de vitamina B12 (CID-11: CA23)',
    tratamentoRealizado: 'Cianocobalamina IM 1000 mcg/semana por 4 semanas, seguida de mensal; orientação nutricional e descontinuação de IBP desnecessário.',
    evolucao: 'Melhora clínica e laboratorial em 3 meses; sintomas neurológicos parciais reversíveis.',
    licoesPrincipais: [
      'Rastreie deficiência de B12 em idosos ≥65 anos, especialmente com dietas restritas ou uso de IBPs [7,9].',
      'Sintomas neurológicos como parestesias precedem anemia em até 30% dos casos; intervenha precocemente [2,4].',
      'Dosagem de MMA e homocisteína confirma deficiência funcional quando B12 borderline [1,3].',
      'Reposição IM inicial é segura e eficaz; manutenção oral possível após normalização [3,4].',
      'Prevalência elevada no Brasil (4-8% em idosos) exige vigilância em atenção primária [5].'
    ],
    errosComuns: [
      'Ignorar sintomas neurológicos sutis, atrasando diagnóstico e risco de dano irreversível [2].',
      'Tratar apenas anemia sem investigar causa, como má absorção por medicamentos [1,9].',
      'Iniciar folato sem B12, piorando neuropatia [4].',
      'Não rastrear populações de risco, subdiagnosticando em vegetarianos idosos [5,6].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar fatores de risco e sintomas de deficiência de vitamina B12 em idosos.',
    'Interpretar exames laboratoriais para confirmação diagnóstica.',
    'Aplicar recomendações de rastreamento e tratamento baseadas em evidências.',
    'Planejar seguimento para prevenção de recidiva em atenção primária.'
  ],
  competencias: [
    'Avaliação nutricional em geriatria',
    'Raciocínio diagnóstico em deficiências vitamínicas',
    'Prescrição de suplementação e monitoramento'
  ],
  doencasRelacionadas: ['deficiencia-vitamina-b12'],
  medicamentosRelacionados: ['B03BA03', 'B03BA05'],
  calculadorasRelacionadas: [],
  referencias: [
    'ref-001',
    'ref-002',
    'ref-003',
    'ref-004',
    'ref-005',
    'ref-006',
    'ref-007',
    'ref-008',
    'ref-009',
    'ref-010',
    'ref-011',
    'ref-012',
    'ref-013',
    'ref-014'
  ],
  tags: ['geriatrico', 'nutricao', 'deficiencia-vitamina-b12', 'anemia', 'neuropatia']
};