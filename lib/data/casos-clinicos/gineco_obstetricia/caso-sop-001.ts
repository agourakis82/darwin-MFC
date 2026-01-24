import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_SOP_gin_001: CasoClinico = {
  id: 'caso-sindrome-ovarios-policisticos-001',
  titulo: 'Mulher jovem com irregularidades menstruais e hirsutismo',
  subtitulo: 'Caso de suspeita de síndrome dos ovários policísticos em atenção primária',
  categoria: 'gineco_obstetricia',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Fernanda Oliveira',
      idade: 28,
      sexo: 'F',
      profissao: 'Auxiliar administrativa',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Meus ciclos menstruais estão irregulares há dois anos e notei mais pelos no rosto',
    historiaDoencaAtual: 'Paciente refere oligomenorreia com ciclos de 40-60 dias desde os 26 anos, associada a ganho de peso de 8 kg no último ano, acne persistente no queixo e hirsutismo moderado em face e abdome. Nega febre, perdas sanguíneas anormais ou dispareunia. Busca ajuda por desejo de gravidez em 1 ano. Antecedente de acne na adolescência, sem comorbidades conhecidas.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente relata ausência de ciclos ovulatórios regulares e sintomas de hiperandrogenismo. O que deseja investigar?',
        dicas: ['História menstrual detalhada, sintomas de hiperandrogenismo, história familiar de DM ou SOP']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'História familiar de diabetes ou infertilidade', correta: true },
          { id: 'c', texto: 'Hábitos alimentares detalhados', correta: false },
          { id: 'd', texto: 'Uso de cosméticos', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História familiar de DM ou SOP é fator de risco e auxilia no rastreamento precoce [1,9].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história familiar orienta a suspeita de SOP e comorbidades metabólicas.',
        incorreto: 'Priorize fatores de risco genéticos e endócrinos para guiar o diagnóstico.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa IMC elevado e sinais de hiperandrogenismo. Achados principais:',
        dados: {
          'PA': '128/85 mmHg',
          'FC': '76 bpm',
          'IMC': '29.5 kg/m²',
          'Escala de hirsutismo de Ferriman-Gallwey': '12 (moderado)',
          'Acne': 'Persistente em face e tronco'
        },
        dicas: ['Note o sobrepeso e os sinais clínicos de hiperandrogenismo']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de hiperandrogenismo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 128/85 mmHg', correta: false },
          { id: 'b', texto: 'Escala de hirsutismo 12', correta: true },
          { id: 'c', texto: 'IMC 29.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 76 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Pontuação ≥ 8 na escala de Ferriman-Gallwey indica hirsutismo clínico significativo [1,9].',
        pontos: 15
      },
      feedback: {
        correto: 'Excelente! O hirsutismo é um critério chave para SOP.',
        incorreto: 'Foco nos sinais clínicos de hiperandrogenismo para suspeita diagnóstica.'
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais para avaliação endócrina e metabólica. Resultados:',
        dados: {
          'Testosterona total': '85 ng/dL (elevada)',
          'Relação LH/FSH': '2.8 (elevada)',
          'Glicemia de jejum': '105 mg/dL (IG)',
          'Ultrassonografia ovariana': 'Ovários policísticos (≥12 folículos de 2-9 mm por ovário)',
          'SHBG': '35 nmol/L (normal)'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipertireoidismo subclínico', correta: false },
          { id: 'b', texto: 'Hiperandrogenismo com morfologia policística', correta: true },
          { id: 'c', texto: 'Intolerância à glicose isolada', correta: false },
          { id: 'd', texto: 'Hipogonadismo hipogonadotrófico', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Elevação de testosterona e relação LH/FSH >2, com ovários policísticos, atendem critérios de Rotterdam para SOP [1,9,10].',
        pontos: 15
      },
      feedback: {
        correto: 'Perfeito! Estes achados confirmam suspeita de SOP.',
        incorreto: 'Integre os resultados hormonais e de imagem para diagnóstico.'
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese. Exclua outras causas como hiperprolactinemia ou tumores adrenais (exames normais).'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Síndrome dos ovários policísticos (SOP)', correta: true },
          { id: 'b', texto: 'Síndrome de Cushing', correta: false },
          { id: 'c', texto: 'Hipotireoidismo subclínico', correta: false },
          { id: 'd', texto: 'Amenorreia hipotalâmica', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Critérios de Rotterdam: oligo/anovulação + hiperandrogenismo + ovários policísticos, após exclusão de outras etiologias [1,9,10].',
        pontos: 20
      },
      feedback: {
        correto: 'Correto! Diagnóstico de SOP baseado em evidências clínicas e laboratoriais.',
        incorreto: 'Considere os critérios diagnósticos consensuais para SOP.'
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial, considerando desejo de fertilidade futura e risco metabólico.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação dietética', correta: false },
          { id: 'b', texto: 'Anticoncepcionais orais (ACO) para regulação menstrual', correta: false },
          { id: 'c', texto: 'Mudanças no estilo de vida + metformina para resistência insulínica', correta: true },
          { id: 'd', texto: 'Clomifeno imediatamente para indução ovulatória', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Estilo de vida (dieta e exercício) é primeira linha; metformina indicada para IG e hiperandrogenismo em SOP [1,7,9].',
        pontos: 20
      },
      feedback: {
        correto: 'Ótimo! Abordagem multifatorial previne complicações.',
        incorreto: 'Inclua intervenção metabólica inicial em pacientes com IG.'
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 6 meses: ciclos mais regulares (35-40 dias), perda de 5 kg, hirsutismo reduzido, glicemia 95 mg/dL.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e reavaliar em 6 meses', correta: true },
          { id: 'b', texto: 'Suspender metformina', correta: false },
          { id: 'c', texto: 'Iniciar ACO apesar do desejo de gravidez', correta: false },
          { id: 'd', texto: 'Encaminhar para especialista em reprodução', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora clínica com seguimento anual para monitoramento de comorbidades [1,7,9].',
        pontos: 10
      },
      feedback: {
        correto: 'Adequado! Acompanhamento contínuo é essencial.',
        incorreto: 'Mantenha o plano com reavaliações regulares.'
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 28 anos com oligomenorreia, hirsutismo e intolerância à glicose diagnosticada com SOP pelos critérios de Rotterdam. Iniciado estilo de vida e metformina, com boa evolução em 6 meses.',
    diagnosticoFinal: 'Síndrome dos ovários policísticos (SOP) com hiperandrogenismo clínico e bioquímico',
    tratamentoRealizado: 'Orientações para perda de peso, exercício aeróbico 150 min/semana, metformina 1500 mg/dia; seguimento para planejamento familiar.',
    evolucao: 'Melhora nos sintomas e parâmetros metabólicos; sem complicações agudas.',
    licoesPrincipais: [
      'SOP é diagnosticada por critérios de Rotterdam: pelo menos 2 de 3 (oligo/anovulação, hiperandrogenismo, ovários policísticos) [1,9].',
      'Rastreio precoce em atenção primária previne infertilidade e DM2 [7,8].',
      'Mudanças no estilo de vida são base do tratamento, com metformina para resistência insulínica [1,9].',
      'Monitorar comorbidades como dislipidemia e HAS anualmente [1,10].',
      'Excluir outras causas endócrinas antes de confirmar SOP [9].'
    ],
    errosComuns: [
      'Não investigar história familiar, subestimando risco genético [3,5].',
      'Ignorar exclusão de causas secundárias como prolactina elevada [1].',
      'Iniciar ACO sem considerar desejo de fertilidade [9].',
      'Subestimar risco metabólico em pacientes com IMC >25 [1,7].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas clínicos e aplicar critérios diagnósticos para SOP.',
    'Interpretar exames hormonais e de imagem no contexto de SOP.',
    'Elaborar plano terapêutico inicial baseado em guidelines brasileiras e internacionais.',
    'Planejar seguimento para prevenção de complicações a longo prazo.'
  ],
  competencias: [
    'Raciocínio clínico em ginecologia endócrina',
    'Avaliação de risco metabólico em mulheres em idade fértil',
    'Prescrição de terapêutica não farmacológica e farmacológica em SOP'
  ],
  doencasRelacionadas: ['sindrome-ovarios-policisticos'],
  medicamentosRelacionados: ['A10BA02', 'G03AA15'],
  calculadorasRelacionadas: ['imc', 'ferriman-gallwey'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-008', 'ref-009', 'ref-010'],
  tags: ['SOP', 'hiperandrogenismo', 'oligoamenorreia', 'resistência insulínica', 'atenção primária']
};