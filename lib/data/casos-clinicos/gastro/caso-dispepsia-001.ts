import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DISPEPSIA_gas_001: CasoClinico = {
  id: 'caso-gastrite-001',
  titulo: 'Dispepsia em Mulher de 45 Anos',
  subtitulo: 'Paciente com dor epigástrica persistente e suspeita de infecção por H. pylori',
  categoria: 'gastro',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 45,
      sexo: 'F',
      profissao: 'Dona de casa',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou com dor na barriga em cima, depois de comer, há dois meses',
    historiaDoencaAtual: 'Paciente refere dor epigástrica intermitente, pós-prandial, de intensidade moderada (5/10), sem irradiação, associada a saciedade precoce e náuseas ocasionais. Nega vômitos, perda de peso, disfagia ou sintomas de alarme. Sintomas pioram com alimentos gordurosos. Usa AINEs esporadicamente para dores articulares.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona uso intermitente de ibuprofeno e história familiar de câncer gástrico no avô. Nega etilismo ou tabagismo. O que deseja investigar mais?',
        dicas: ['Considere fatores de risco para H. pylori, como história familiar e uso de AINEs [1,2]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens internacionais', correta: false },
          { id: 'b', texto: 'Uso de medicamentos anti-inflamatórios', correta: true },
          { id: 'c', texto: 'Prática de exercícios físicos', correta: false },
          { id: 'd', texto: 'Dieta vegetariana', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O uso de AINEs é fator de risco para gastrite e úlceras, além de mascarar sintomas [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! O uso de AINEs é um fator de risco chave para dispepsia orgânica.',
        incorreto: 'Priorize fatores de risco como AINEs e história familiar para gastrite [1].'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, a paciente está em bom estado geral, eupneica, afebril. Abdome plano, flácido, RHA presente, dor leve à palpação epigástrica, sem defesa ou visceromegalias. PA 120/80 mmHg, FC 76 bpm, FR 14 irpm, IMC 26 kg/m².',
        dicas: ['Dor epigástrica sugere possível gastrite; ausência de alarme é tranquilizadora [11,12]']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS relevante para o quadro?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC 26 kg/m²', correta: false },
          { id: 'b', texto: 'Dor leve epigástrica à palpação', correta: true },
          { id: 'c', texto: 'PA 120/80 mmHg', correta: false },
          { id: 'd', texto: 'FC 76 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Dor epigástrica localizada é comum em dispepsia e gastrite, guiando investigação [11,12].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita testes para H. pylori. Resultados: Teste respiratório com ureia positivo. Hemograma normal, sem anemia. Endoscopia superior solicitada devido a idade e sintomas persistentes.',
        dados: {
          'Teste respiratório com ureia': 'Positivo',
          'Hemoglobina': '12.5 g/dL',
          'Glicemia de jejum': '92 mg/dL',
          'Ureia': '35 mg/dL',
          'Creatinina': '0.8 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Dispepsia funcional isolada', correta: false },
          { id: 'b', texto: 'Infecção por H. pylori confirmada', correta: true },
          { id: 'c', texto: 'Apenas anemia ferropênica', correta: false },
          { id: 'd', texto: 'Insuficiência renal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Teste respiratório positivo indica infecção por H. pylori, comum em dispepsia (prevalência 40-60% no Brasil) [3,5,9,10].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Endoscopia revela mucosa gástrica eritematosa com biópsia confirmando gastrite crônica por H. pylori. Sem úlceras ou lesões malignas.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Dispepsia funcional', correta: false },
          { id: 'b', texto: 'Gastrite crônica por H. pylori', correta: true },
          { id: 'c', texto: 'Úlcera péptica ativa', correta: false },
          { id: 'd', texto: 'Câncer gástrico precoce', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas de dispepsia com H. pylori positivo e endoscopia confirmam gastrite, excluindo dispepsia funcional por exclusão [2,11,12].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Com diagnóstico de gastrite por H. pylori, inicie erradicação. Suspenda AINEs e oriente dieta.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Inibidores de bomba de prótons isolados por 4 semanas', correta: false },
          { id: 'b', texto: 'Terapia quádrupla para erradicação de H. pylori', correta: true },
          { id: 'c', texto: 'Apenas antiácidos e dieta', correta: false },
          { id: 'd', texto: 'Endoscopia de controle imediata', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Terapia de erradicação (ex.: amoxicilina, claritromicina, IBP e bismuto) é recomendada para gastrite por H. pylori [2,9,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Seguimento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 6 semanas. Teste de erradicação negativo. Sintomas resolvidos em 80%, com saciedade precoce residual, sugerindo componente funcional.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter IBP em dose baixa e acompanhamento em 3 meses', correta: true },
          { id: 'b', texto: 'Repetir endoscopia', correta: false },
          { id: 'c', texto: 'Suspender todo tratamento', correta: false },
          { id: 'd', texto: 'Encaminhar para gastroenterologista urgente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Erradicação bem-sucedida; sintomas residuais podem ser dispepsia funcional, tratada com IBP e suporte [11,12].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 45 anos com dispepsia investigada, diagnosticada com gastrite por H. pylori, tratada com erradicação bem-sucedida e melhora clínica parcial.',
    diagnosticoFinal: 'Gastrite crônica por H. pylori com componente de dispepsia funcional',
    tratamentoRealizado: 'Terapia quádrupla para H. pylori (amoxicilina, claritromicina, IBP e bismuto) por 14 dias, seguida de IBP por 4 semanas adicionais. Orientação dietética e suspensão de AINEs.',
    evolucao: 'Sintomas melhoraram significativamente após erradicação, com resolução completa em 3 meses. Acompanhamento anual recomendado devido a história familiar.',
    licoesPrincipais: [
      'Teste para H. pylori é essencial em dispepsia não investigada, especialmente em populações de risco no Brasil [9,10,11].',
      'Endoscopia é indicada em adultos >40-60 anos com sintomas persistentes ou alarme [11,12].',
      'Erradicação de H. pylori previne complicações como úlceras e câncer gástrico [2,7,8].',
      'Dispepsia funcional é diagnóstico de exclusão após investigação orgânica [12].',
      'AINEs contribuem para gastrite; suspender e usar alternativas [1,2].'
    ],
    errosComuns: [
      'Ignorar teste para H. pylori em dispepsia, atrasando erradicação [9,11].',
      'Realizar endoscopia rotineira em jovens sem alarme, desnecessária [11,12].',
      'Não confirmar erradicação pós-tratamento, risco de recorrência [2,9].',
      'Tratar apenas sintomaticamente sem investigar causa subjacente [12].'
    ]
  },

  objetivosAprendizagem: [
    'Compreender o manejo inicial da dispepsia e indicações para teste de H. pylori.',
    'Identificar fatores de risco para gastrite e complicações associadas.',
    'Aplicar diretrizes para erradicação de H. pylori e seguimento.',
    'Diferenciar dispepsia orgânica de funcional.'
  ],
  competencias: ['Anamnese em gastroenterologia', 'Interpretação de testes para H. pylori', 'Prescrição de terapia de erradicação', 'Raciocínio diagnóstico em dispepsia'],
  doencasRelacionadas: ['gastrite', 'dispepsia funcional', 'ulcera peptica'],
  medicamentosRelacionados: ['A02BC01', 'A02BC02', 'J01MA02'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-005', 'ref-009', 'ref-010', 'ref-011', 'ref-012'],
  tags: ['dispepsia', 'H. pylori', 'gastrite', 'erradicacao', 'endoscopia']
};