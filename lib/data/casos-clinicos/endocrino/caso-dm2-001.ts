import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DM2_end_001: CasoClinico = {
  id: 'caso-diabetes-mellitus-2-001',
  titulo: 'Diabetes Mellitus Tipo 2 Recém-Diagnosticado',
  subtitulo: 'Paciente adulto com sintomas clássicos de hiperglicemia',
  categoria: 'endocrino',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'José Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou com muita sede e urino o tempo todo há duas semanas',
    historiaDoencaAtual: 'Paciente relata poliúria, polidipsia e fadiga progressiva iniciadas há cerca de um mês. Relata perda de peso involuntária de 5 kg no último mês, apesar de apetite preservado. Nega febre, vômitos ou alterações visuais. Antecedente de hipertensão arterial há 5 anos, em uso de enalapril 20 mg/dia. Fuma 20 cigarros/dia há 30 anos e consome álcool socialmente. História familiar de diabetes em mãe e irmão.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a anamnese. O paciente menciona sedentarismo, dieta rica em carboidratos e história familiar de DM2. O que deseja investigar?',
        dicas: ['Considere hábitos de vida, medicamentos e história familiar']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Uso atual de medicamentos', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'Vacinações recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Medicamentos como diuréticos ou corticoides podem precipitar hiperglicemia em DM2 [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Medicamentos podem influenciar o quadro glicêmico.',
        incorreto: 'Priorize fatores que possam agravar ou mascarar sintomas de DM2.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa paciente obeso, com sinais de desidratação leve.',
        dados: {
          'PA': '148/92 mmHg',
          'FC': '85 bpm',
          'FR': '18 irpm',
          'IMC': '29.8 kg/m²',
          'Glicemia capilar': '245 mg/dL'
        },
        dicas: ['Observe a glicemia elevada e o sobrepeso como fatores de risco']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pressão arterial elevada', correta: false },
          { id: 'b', texto: 'Glicemia capilar de 245 mg/dL', correta: true },
          { id: 'c', texto: 'IMC de 29.8 kg/m²', correta: false },
          { id: 'd', texto: 'Frequência cardíaca de 85 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia casual ≥200 mg/dL associada a sintomas clássicos sugere diagnóstico de DM [9,10].',
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
          'Glicemia de jejum': '152 mg/dL',
          'HbA1c': '7.8%',
          'Creatinina sérica': '0.9 mg/dL',
          'TFGe': '88 mL/min/1.73m²',
          'Colesterol total': '220 mg/dL',
          'LDL-colesterol': '140 mg/dL',
          'HDL-colesterol': '40 mg/dL',
          'Triglicerídeos': '210 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pré-diabetes isolado', correta: false },
          { id: 'b', texto: 'DM2 recém-diagnosticado com dislipidemia', correta: true },
          { id: 'c', texto: 'Apenas dislipidemia sem DM', correta: false },
          { id: 'd', texto: 'Insuficiência renal associada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia de jejum ≥126 mg/dL e HbA1c ≥6,5% confirmam DM2. Perfil lipídico indica risco cardiovascular [9,10,11].',
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
          { id: 'a', texto: 'Diabetes Mellitus Tipo 2 com síndrome metabólica', correta: true },
          { id: 'b', texto: 'Diabetes Mellitus Tipo 1 de início tardio', correta: false },
          { id: 'c', texto: 'Diabetes secundário a medicamento', correta: false },
          { id: 'd', texto: 'Diabetes gestacional', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas clássicos, obesidade, dislipidemia e hipertensão configuram síndrome metabólica com DM2 [9,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento, incluindo medidas não farmacológicas e farmacológicas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação dietética e exercício por 3 meses', correta: false },
          { id: 'b', texto: 'Metformina isolada', correta: false },
          { id: 'c', texto: 'Metformina + estatina + otimização da HAS', correta: true },
          { id: 'd', texto: 'Insulina de ação intermediária inicial', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Em DM2 recém-diagnosticado com HbA1c >7%, iniciar metformina; associar estatina por risco CV e controlar HAS [9,10,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses para reavaliação. Relata adesão à dieta e exercícios. HbA1c 6.8%, PA 130/85 mmHg, perda de 3 kg.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento atual e retornar em 3 meses', correta: true },
          { id: 'b', texto: 'Intensificar hipoglicemiantes', correta: false },
          { id: 'c', texto: 'Suspender metformina', correta: false },
          { id: 'd', texto: 'Encaminhar imediatamente ao endocrinologista', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Metas de HbA1c <7% atingidas com medidas iniciais; manter e monitorar trimestralmente [9,10].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 55 anos com DM2 recém-diagnosticado, associado a síndrome metabólica, tratado com sucesso inicial por metformina, estatina e controle pressórico, com melhora glicêmica e perda de peso.',
    diagnosticoFinal: 'Diabetes Mellitus Tipo 2 (CID-11: E11), Hipertensão Arterial Essencial (I10), Dislipidemia Mista (E78.2)',
    tratamentoRealizado: 'Metformina 500 mg BID, sinvastatina 20 mg/noite, enalapril 20 mg/dia; orientação para dieta hipocalórica, exercícios aeróbicos 150 min/semana e cessação tabágica.',
    evolucao: 'Em 3 meses, HbA1c reduziu para 6.8%, PA controlada, peso reduzido em 3 kg. Sem complicações agudas. Acompanhamento contínuo em atenção primária.',
    licoesPrincipais: [
      'Sintomas clássicos (poliúria, polidipsia, perda de peso) em paciente com fatores de risco (obesidade, história familiar) sugerem DM2 [9,10].',
      'Diagnóstico confirmado por glicemia de jejum ≥126 mg/dL ou HbA1c ≥6,5%; rastreamento em adultos ≥35 anos com IMC ≥25 kg/m² [11,12].',
      'Tratamento inicial: metformina como primeira linha, associada a controle de comorbidades como dislipidemia e HAS para redução de risco CV [9,10].',
      'Medidas não farmacológicas (dieta, exercício) são essenciais e podem normalizar glicemia em casos iniciais [11].',
      'Acompanhamento trimestral inicial para monitoramento de metas glicêmicas e prevenção de complicações [9,10].'
    ],
    errosComuns: [
      'Ignorar sintomas clássicos como infecção urinária em vez de hiperglicemia [9].',
      'Não solicitar HbA1c para confirmação diagnóstica em casos ambíguos [10].',
      'Iniciar insulina prematuramente sem tentativa de terapia oral em DM2 [11].',
      'Subestimar risco CV e omitir estatina em paciente com DM2 e dislipidemia [9,10].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e fatores de risco para diagnóstico precoce de DM2.',
    'Interpretar exames laboratoriais para confirmação de DM2 e comorbidades associadas.',
    'Planejar tratamento inicial baseado em diretrizes nacionais e internacionais.',
    'Entender a importância do acompanhamento multidisciplinar em doenças crônicas.'
  ],
  competencias: [
    'Realizar anamnese focada em endocrinopatias',
    'Interpretar exames laboratoriais em contexto clínico',
    'Prescrever terapia inicial para DM2 conforme protocolos SUS',
    'Planejar seguimento em atenção primária'
  ],
  doencasRelacionadas: ['diabetes-mellitus-2'],
  medicamentosRelacionados: ['A10BA02', 'A10AB05', 'A10BH01'],
  calculadorasRelacionadas: ['imc', 'framingham', 'hba1c'],
  referencias: ['ref-001', 'ref-002', 'ref-009', 'ref-010', 'ref-011', 'ref-012'],
  tags: ['diabetes tipo 2', 'hiperglicemia', 'síndrome metabólica', 'endocrinologia', 'atenção primária']
};