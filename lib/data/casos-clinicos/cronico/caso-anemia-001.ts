import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ANEMIA_cro_001: CasoClinico = {
  id: 'caso-anemia-ferropriva-001',
  titulo: 'Fadiga Crônica em Mulher Adulta',
  subtitulo: 'Paciente de 35 anos com queixa de cansaço persistente e palidez',
  categoria: 'cronico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 35,
      sexo: 'F',
      profissao: 'Dona de casa',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou me sentindo muito cansada e fraca há meses, não consigo nem fazer as tarefas de casa.',
    historiaDoencaAtual: 'Paciente relata fadiga progressiva iniciada há 6 meses, associada a palidez notada pela família, dispneia leve ao esforço e cefaleias ocasionais. Nega febre, perda de peso ou sangramentos evidentes. Dieta pobre em carnes e vegetais folhosos, com consumo predominante de arroz, feijão e pão. Menstruações abundantes e irregulares nos últimos anos, sem uso de anticoncepcionais. Nega comorbidades conhecidas ou uso de medicamentos crônicos.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona dieta pobre em ferro e menstruações intensas.',
        dicas: ['Investigue hábitos alimentares, história menstrual e fatores de risco para deficiência de ferro [1,2].']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de câncer', correta: false },
          { id: 'b', texto: 'História menstrual e dieta', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'Viagens recentes ao exterior', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História menstrual abundante e dieta pobre são fatores de risco clássicos para anemia ferropriva [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Esses fatores são fundamentais para suspeitar de deficiência de ferro.',
        incorreto: 'Considere os fatores de risco nutricionais e ginecológicos no contexto de fadiga crônica.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa palidez cutâneo-mucosa, taquicardia e unhas em colher.',
        dados: {
          'PA': '110/70 mmHg',
          'FC': '92 bpm',
          'FR': '18 irpm',
          'IMC': '22.5 kg/m²',
          'Peso': '55 kg',
          'Estatura': '1,57 m'
        },
        dicas: ['Note a palidez e taquicardia como sinais sugestivos de anemia [3,4].']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de anemia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 110/70 mmHg', correta: false },
          { id: 'b', texto: 'Palidez cutâneo-mucosa e FC 92 bpm', correta: true },
          { id: 'c', texto: 'IMC 22.5 kg/m²', correta: false },
          { id: 'd', texto: 'FR 18 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Palidez e taquicardia compensatória são achados clássicos de anemia moderada [3,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita hemograma e exames de ferro. Resultados mostram anemia microcítica.',
        dados: {
          'Hemoglobina': '9.2 g/dL',
          'Hematócrito': '28%',
          'VCM': '72 fL',
          'Ferritina sérica': '8 ng/mL',
          'Saturação de transferrina': '12%',
          'Plaquetas': '320.000/mm³'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Anemia normocítica por infecção', correta: false },
          { id: 'b', texto: 'Anemia ferropriva confirmada', correta: true },
          { id: 'c', texto: 'Anemia megaloblástica por B12', correta: false },
          { id: 'd', texto: 'Talassemia menor', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hb <11 g/dL em mulheres, VCM baixo e ferritina <15 ng/mL confirmam deficiência de ferro [1,7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e laboratórios, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Anemia ferropriva por menorragia e dieta inadequada', correta: true },
          { id: 'b', texto: 'Anemia de doença crônica', correta: false },
          { id: 'c', texto: 'Anemia hemolítica autoimune', correta: false },
          { id: 'd', texto: 'Leucemia aguda', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Quadro clínico e laboratorial clássico de anemia ferropriva em mulher fértil [1,2,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento, considerando suplementação e orientação.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação dietética', correta: false },
          { id: 'b', texto: 'Suplementação de ferro oral + dieta rica em ferro', correta: true },
          { id: 'c', texto: 'Transfusão sanguínea imediata', correta: false },
          { id: 'd', texto: 'Suplementação de vitamina B12', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Suplementação oral de ferro (ex: sulfato ferroso 200mg/dia) é primeira linha, associada a orientação nutricional [7,8,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 1 mês. Relata melhora da fadiga; Hb 11.5 g/dL, ferritina 25 ng/mL.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter suplementação por 3 meses e reavaliar', correta: true },
          { id: 'b', texto: 'Suspender tratamento imediatamente', correta: false },
          { id: 'c', texto: 'Encaminhar para gastro para investigação de sangramento', correta: false },
          { id: 'd', texto: 'Iniciar ferro intravenoso', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Tratamento deve durar 3-6 meses para repletar estoques; reavaliar Hb e ferritina [7,8].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 35 anos com anemia ferropriva diagnosticada por fadiga, palidez e exames confirmatórios. Tratada com suplementação oral e orientação nutricional, com boa evolução.',
    diagnosticoFinal: 'Anemia por deficiência de ferro (CID-11: CA23)',
    tratamentoRealizado: 'Suplementação de sulfato ferroso 200 mg/dia por 3 meses, dieta rica em ferro (carnes, vegetais folhosos) e ácido ascórbico para absorção. Avaliação ginecológica para menorragia.',
    evolucao: 'Após 3 meses, Hb 12.8 g/dL, ferritina 40 ng/mL, sintomas resolvidos. Acompanhamento anual recomendado.',
    licoesPrincipais: [
      'Rastreie anemia em populações vulneráveis como mulheres em idade fértil [9,10].',
      'Ferritina sérica é o melhor marcador de estoques de ferro [1,11].',
      'Suplementação oral é eficaz na maioria dos casos ambulatoriais [7,8].',
      'Associe tratamento à correção de causas subjacentes, como dieta e sangramentos [2].',
      'Prevalência alta no Brasil justifica screening em pré-natal e crianças [5,6].'
    ],
    errosComuns: [
      'Ignorar ferritina e tratar apenas por Hb baixa, subestimando deficiência [1].',
      'Não investigar causas gastrointestinais em adultos >50 anos ou com alarme [12].',
      'Prescrever ferro sem orientação, levando a baixa adesão por efeitos colaterais [8].',
      'Confundir com anemia de doença crônica sem dosar ferro sérico [2].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e sinais de anemia ferropriva em atenção primária.',
    'Interpretar hemograma e dosagens de ferro para diagnóstico.',
    'Aplicar recomendações de rastreamento e tratamento no SUS [9,10].',
    'Planejar seguimento para prevenção de recidivas.'
  ],
  competencias: ['anamnese', 'exame_fisico', 'diagnostico', 'tratamento', 'acompanhamento'],
  doencasRelacionadas: ['anemia-ferropriva'],
  medicamentosRelacionados: ['B03AD01', 'B03AA05'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-008', 'ref-009', 'ref-010', 'ref-011', 'ref-012'],
  tags: ['anemia', 'deficiencia-de-ferro', 'nutricao', 'mulheres-ferteis', 'rastreamento']
};