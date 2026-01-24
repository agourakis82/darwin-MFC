import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_PARKINSON_neu_001: CasoClinico = {
  id: 'caso-parkinson-001',
  titulo: 'Paciente com tremor em repouso e lentidão de movimentos',
  subtitulo: 'Homem de 55 anos apresenta tremor e rigidez progressiva',
  categoria: 'neurologico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Carlos Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Minhas mãos tremem muito quando estou parado, e sinto as pernas pesadas para andar',
    historiaDoencaAtual: 'Paciente relata início insidioso de tremor em repouso na mão direita há 6 meses, piorando gradualmente e afetando agora a mão esquerda. Associado a bradicinesia, com dificuldade para iniciar movimentos e rigidez nos membros superiores e inferiores. Nega perda de olfato, constipação ou distúrbios do sono REM iniciais. Sem história de trauma craniano ou exposição a toxinas. Sintomas interferem no trabalho, com queixas de fadiga e redução na destreza manual.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona piora do tremor em repouso e lentidão nos movimentos diários. O que deseja investigar?',
        dicas: ['História familiar, medicamentos, hábitos e sintomas associados como hiposmia ou constipação']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de doenças neurológicas', correta: false },
          { id: 'b', texto: 'Uso de medicamentos atuais ou recentes', correta: true },
          { id: 'c', texto: 'Dieta e hábitos alimentares', correta: false },
          { id: 'd', texto: 'Viagens recentes ao exterior', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Medicamentos como antipsicóticos ou bloqueadores beta podem induzir parkinsonismo secundário, devendo ser excluídos [1,7].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Medicamentos podem mimetizar ou causar sintomas parkinsonianos.',
        incorreto: 'Considere o impacto de medicamentos no quadro neurológico.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame neurológico, você observa tremor em repouso assimétrico (4-6 Hz) nas mãos, rigidez em roda dentada nos braços e bradicinesia com redução da amplitude de movimentos. Face com hipomimia. Marcha com passos curtos e arrastados, sem instabilidade postural evidente. Sinais vitais normais.',
        dados: {
          'PA': '128/80 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'Escala UPDRS (motor)': 'Pontuação 25/108 (moderada)',
          'Força muscular': '5/5 em todos os membros'
        },
        dicas: ['Foco em achados motores assimétricos e ausência de tremor postural']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de doença de Parkinson?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Tremor postural simétrico', correta: false },
          { id: 'b', texto: 'Tremor em repouso assimétrico com bradicinesia', correta: true },
          { id: 'c', texto: 'Rigidez generalizada sem tremor', correta: false },
          { id: 'd', texto: 'Hiperreflexia em membros inferiores', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O tetrade clássica inclui tremor em repouso assimétrico, bradicinesia, rigidez e instabilidade postural tardia [1,7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para excluir causas secundárias. Resultados laboratoriais normais, sem anemia, função tireoidiana ou renal alterada. RM craniana sem lesões focais ou hidrocefalia. DATSCAN (se disponível) mostra redução de captação dopaminérgica assimétrica.',
        dados: {
          'Hemoglobina': '14.2 g/dL',
          'TSH': '2.5 mUI/L',
          'Creatinina': '0.9 mg/dL',
          'TFGe': '90 mL/min/1.73m²',
          'Vitamina B12': '450 pg/mL',
          'RM craniana': 'Sem alterações significativas'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alterações laboratoriais sugestivas de causa metabólica', correta: false },
          { id: 'b', texto: 'Exames normais, compatível com diagnóstico clínico de DP', correta: true },
          { id: 'c', texto: 'Necessidade de biópsia muscular', correta: false },
          { id: 'd', texto: 'Suspeita de infecção crônica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O diagnóstico de DP é clínico; exames servem para excluir secundárias como tireoidopatia ou lesões vasculares [7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame e exames complementares, formule sua hipótese diagnóstica.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Tremor essencial', correta: false },
          { id: 'b', texto: 'Doença de Parkinson inicial', correta: true },
          { id: 'c', texto: 'Parkinsonismo vascular', correta: false },
          { id: 'd', texto: 'Distonia idiopática', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas assimétricos com tremor em repouso e bradicinesia, sem causas secundárias, apontam para DP inicial [1,2,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano de tratamento inicial, considerando manejo multidisciplinar.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas observação por 6 meses', correta: false },
          { id: 'b', texto: 'Terapia física isolada', correta: false },
          { id: 'c', texto: 'Levodopa/carbidopa inicial + terapia física', correta: true },
          { id: 'd', texto: 'Anticolinérgicos como primeira linha', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Em DP inicial sintomática, levodopa é o tratamento farmacológico de escolha; terapia física melhora mobilidade [1,3,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses. Relata redução do tremor em 50% com medicação, melhora na marcha, mas leve discinesia. UPDRS motor: 15/108. Adere à terapia física 2x/semana.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento atual e monitorar a cada 3 meses', correta: true },
          { id: 'b', texto: 'Aumentar dose de levodopa imediatamente', correta: false },
          { id: 'c', texto: 'Suspender medicação por discinesia', correta: false },
          { id: 'd', texto: 'Encaminhar para neurocirurgia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora clínica com adesão; monitoramento regular para ajustar doses e prevenir complicações [1,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 55 anos com DP inicial diagnosticada clinicamente, tratado com levodopa e terapia física, evoluindo com melhora sintomática e qualidade de vida.',
    diagnosticoFinal: 'Doença de Parkinson inicial (CID-11: CA23)',
    tratamentoRealizado: 'Levodopa/carbidopa 100/25 mg 3x/dia, terapia física direcionada 2-3x/semana, orientação nutricional para suporte energético.',
    evolucao: 'Após 6 meses, redução significativa de tremor e bradicinesia, sem quedas. Manutenção do emprego com adaptações.',
    licoesPrincipais: [
      'O diagnóstico de DP é primariamente clínico, baseado na tetrade motora assimétrica [7].',
      'Terapia farmacológica inicial com levodopa melhora sintomas e qualidade de vida [1].',
      'Manejo multidisciplinar, incluindo fisioterapia, é essencial desde o início [1,3].',
      'Excluir parkinsonismo secundário com história e exames básicos é crucial [7].',
      'Monitoramento contínuo previne complicações como discinesia e quedas [7].'
    ],
    errosComuns: [
      'Confundir tremor em repouso com tremor essencial (postural) [2].',
      'Iniciar tratamento sem excluir causas secundárias como medicamentos [7].',
      'Subestimar o papel da terapia física no manejo inicial [1].',
      'Atrasar diagnóstico por esperar sintomas bilaterais ou instabilidade [7].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer os sintomas clássicos iniciais da doença de Parkinson.',
    'Diferenciar DP de outras causas de tremor e parkinsonismo.',
    'Aplicar princípios de manejo inicial farmacológico e não farmacológico.',
    'Entender a importância do acompanhamento multidisciplinar em atenção primária.'
  ],
  competencias: [
    'Avaliação neurológica básica',
    'Raciocínio diagnóstico em neurologia',
    'Prescrição de medicamentos antiparkinsonianos',
    'Planejamento de cuidados crônicos'
  ],
  doencasRelacionadas: ['parkinson'],
  medicamentosRelacionados: ['N04BA02', 'N04BC01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-007', 'ref-009'],
  tags: ['tremor em repouso', 'bradicinesia', 'rigidez', 'terapia física', 'levodopa']
};