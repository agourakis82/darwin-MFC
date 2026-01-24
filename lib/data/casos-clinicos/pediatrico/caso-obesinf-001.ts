import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_OBESINF_ped_001: CasoClinico = {
  id: 'caso-obesidade-infantil-001',
  titulo: 'Rastreamento de Obesidade em Criança de 12 Anos',
  subtitulo: 'Criança com ganho de peso progressivo e fatores de risco familiar',
  categoria: 'pediatrico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'João Pedro Silva',
      idade: 12,
      sexo: 'M',
      profissao: 'Estudante',
      estadoCivil: 'Solteiro'
    },
    queixaPrincipal: 'A mãe relata que o filho está ganhando muito peso e come demais nos lanches da escola.',
    historiaDoencaAtual: 'João Pedro, 12 anos, é trazido pela mãe para consulta de rotina. Ela nota aumento significativo de peso nos últimos 2 anos, com roupas apertadas e fadiga ao brincar. Não há queixas de dor abdominal ou alterações no sono, mas a família menciona histórico de obesidade e diabetes em parentes de primeiro grau. A criança pratica pouca atividade física, passando muito tempo em jogos eletrônicos.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A mãe descreve dieta rica em alimentos ultraprocessados e sedentarismo. O que deseja investigar?',
        dicas: ['Considere hábitos alimentares, atividade física e história familiar de comorbidades']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de infecções recentes', correta: false },
          { id: 'b', texto: 'História familiar de obesidade e diabetes', correta: true },
          { id: 'c', texto: 'Vacinação em dia', correta: false },
          { id: 'd', texto: 'Viagens recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História familiar é fator de risco chave para obesidade infantil e comorbidades como DM2 [2,3].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história familiar orienta o rastreamento de riscos.',
        incorreto: 'Priorize fatores de risco familiar para guiar a avaliação.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa criança eutrófica em membros, mas com acúmulo de gordura abdominal. Medidas antropométricas revelam:',
        dados: {
          'Peso': '65 kg',
          'Estatura': '1,50 m',
          'IMC': '28,9 kg/m²',
          'Percentil IMC/idade': '>95º percentil',
          'Circunferência abdominal': '92 cm',
          'PA': '118/76 mmHg'
        },
        dicas: ['Avalie o IMC ajustado para idade e sexo; percentil >95 indica obesidade']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA normal para idade', correta: false },
          { id: 'b', texto: 'IMC no >95º percentil', correta: true },
          { id: 'c', texto: 'Estatura adequada', correta: false },
          { id: 'd', texto: 'Peso absoluto elevado', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'IMC >95º percentil para idade e sexo define obesidade infantil [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para rastreio de comorbidades. Resultados:',
        dados: {
          'Glicemia de jejum': '102 mg/dL',
          'Colesterol total': '210 mg/dL',
          'LDL': '140 mg/dL',
          'HDL': '35 mg/dL',
          'Triglicerídeos': '180 mg/dL',
          'ALT': '45 U/L',
          'Insulina basal': '18 µU/mL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Exames normais', correta: false },
          { id: 'b', texto: 'Dislipidemia e pré-diabetes', correta: true },
          { id: 'c', texto: 'Apenas elevação de ALT', correta: false },
          { id: 'd', texto: 'Diabetes manifesto', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia 100-125 mg/dL indica pré-diabetes; perfil lipídico alterado é comum em obesidade [2,3].',
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
          { id: 'a', texto: 'Obesidade infantil com síndrome metabólica inicial', correta: true },
          { id: 'b', texto: 'Hipotireoidismo', correta: false },
          { id: 'c', texto: 'Obesidade exógena sem riscos', correta: false },
          { id: 'd', texto: 'Síndrome de Cushing', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Obesidade (IMC >95º) + dislipidemia + pré-diabetes sugere síndrome metabólica em fase inicial [1,2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de manejo multidisciplinar.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas orientação nutricional por 6 meses', correta: false },
          { id: 'b', texto: 'Dieta + atividade física + rastreio contínuo', correta: true },
          { id: 'c', texto: 'Medicamentoso imediato', correta: false },
          { id: 'd', texto: 'Cirurgia bariátrica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Abordagem não farmacológica é primeira linha em obesidade infantil; inclua equipe multidisciplinar [2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 3 meses, João Pedro retorna: perdeu 3 kg, IMC 27,5 kg/m², glicemia 95 mg/dL, com adesão à dieta e exercícios.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter plano e reavaliar em 3 meses', correta: true },
          { id: 'b', texto: 'Intensificar com medicamentos', correta: false },
          { id: 'c', texto: 'Suspender intervenções', correta: false },
          { id: 'd', texto: 'Encaminhar para especialista imediatamente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Progresso positivo; manter monitoramento anual ou semestral conforme guidelines [3].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Criança de 12 anos com obesidade diagnosticada por IMC >95º percentil, com dislipidemia e pré-diabetes. Iniciado manejo não farmacológico com boa resposta inicial.',
    diagnosticoFinal: 'Obesidade infantil (CID-11: CA23) com componentes de síndrome metabólica',
    tratamentoRealizado: 'Orientações nutricionais, incentivo à atividade física (60 min/dia), acompanhamento psicológico familiar e reavaliação periódica',
    evolucao: 'Perda de peso e melhora nos parâmetros laboratoriais em 3 meses; manutenção do plano terapêutico',
    licoesPrincipais: [
      'Rastreie obesidade por IMC ajustado para idade e sexo em consultas de rotina [2,3]',
      'Identifique comorbidades precocemente, como dislipidemia e pré-diabetes [1,2]',
      'Abordagem multidisciplinar é essencial para sucesso no manejo [3]',
      'História familiar orienta estratificação de risco [2]',
      'Monitoramento contínuo previne progressão para DM2 e riscos CV [1,3]'
    ],
    errosComuns: [
      'Subestimar sedentarismo como fator principal sem avaliar dieta [2]',
      'Não calcular percentis de IMC, focando apenas no peso absoluto [1]',
      'Ignorar rastreio de comorbidades em obesidade assintomática [3]',
      'Iniciar farmacoterapia sem tentativa não farmacológica [2]'
    ]
  },

  objetivosAprendizagem: [
    'Compreender critérios diagnósticos de obesidade infantil pelo IMC para idade',
    'Aplicar rastreamento de comorbidades associadas à obesidade em pediatria',
    'Elaborar plano terapêutico inicial não farmacológico para obesidade',
    'Reconhecer importância do acompanhamento longitudinal em casos de risco'
  ],
  competencias: [
    'Avaliação antropométrica em crianças',
    'Rastreamento de fatores de risco metabólicos',
    'Educação em saúde para prevenção de obesidade',
    'Manejo integrado em atenção primária'
  ],
  doencasRelacionadas: ['obesidade-infantil'],
  medicamentosRelacionados: ['A10AE05', 'A08AA01'],
  calculadorasRelacionadas: ['calculadora-imc-pediatrico', 'percentis-imc-oms'],
  referencias: ['ref-001', 'ref-002', 'ref-003'],
  tags: ['obesidade', 'pediatria', 'nutrição', 'síndrome metabólica', 'rastreamento']
};