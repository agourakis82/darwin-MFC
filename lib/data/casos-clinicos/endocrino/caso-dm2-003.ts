import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DM2_end_003: CasoClinico = {
  id: 'caso-hipoglicemia-diabetico-001',
  titulo: 'Hipoglicemia em Paciente com Diabetes Mellitus Tipo 2',
  subtitulo: 'Paciente diabético apresenta sintomas sugestivos de hipoglicemia aguda',
  categoria: 'endocrino',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 58,
      sexo: 'M',
      profissao: 'Aposentado (ex-pedreiro)',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou me sentindo fraco, suando frio e tremendo há uma hora',
    historiaDoencaAtual: 'Paciente com diagnóstico de diabetes mellitus tipo 2 há 8 anos, em tratamento com metformina 850 mg BID e insulina NPH 20 UI pela manhã. Relata que hoje pulou o almoço por falta de apetite e tomou a insulina habitual. Início súbito de sintomas há 1 hora, sem perda de consciência. Nega trauma craniano ou uso de álcool. Antecedente de episódios semelhantes no passado, mas sem hospitalizações recentes.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona uso regular de insulina e pular refeições. O que deseja investigar?',
        dicas: ['Considere medicamentos hipoglicemiantes, ingestão alimentar recente e hábitos']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de diabetes', correta: false },
          { id: 'b', texto: 'Dose e horário da última insulina', correta: true },
          { id: 'c', texto: 'Atividade física habitual', correta: false },
          { id: 'd', texto: 'Viagens recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Medicamentos como insulina são causa comum de hipoglicemia em diabéticos [9,10].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A insulina é um fator de risco chave para hipoglicemia.',
        incorreto: 'Priorize o histórico de medicamentos hipoglicemiantes.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa palidez, sudorese profusa e tremores finos. Sinais vitais incluem taquicardia e hipotensão relativa.',
        dados: {
          'PA': '100/60 mmHg',
          'FC': '110 bpm',
          'FR': '20 irpm',
          'Temperatura': '36.5°C',
          'Glicemia capilar': '52 mg/dL'
        },
        dicas: ['Observe sinais autonômicos de hipoglicemia como sudorese e taquicardia']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de hipoglicemia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 100/60 mmHg', correta: false },
          { id: 'b', texto: 'Glicemia capilar 52 mg/dL', correta: true },
          { id: 'c', texto: 'FC 110 bpm', correta: false },
          { id: 'd', texto: 'FR 20 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia <70 mg/dL com sintomas confirma hipoglicemia em diabéticos [9,10].',
        pontos: 15
      },
      feedback: {
        correto: 'Excelente! A glicemia baixa é o achado diagnóstico principal.',
        incorreto: 'A glicemia capilar é essencial para confirmar hipoglicemia aguda.'
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você realiza glicemia capilar confirmatória e solicita hemograma e eletrólitos. Resultados laboratoriais mostram hipoglicemia persistente.',
        dados: {
          'Glicemia venosa': '48 mg/dL',
          'HbA1c': '7.8%',
          'Sódio': '138 mEq/L',
          'Potássio': '4.2 mEq/L',
          'Creatinina': '0.9 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hiperglicemia crônica isolada', correta: false },
          { id: 'b', texto: 'Hipoglicemia aguda em DM2 controlado', correta: true },
          { id: 'c', texto: 'Insuficiência adrenal', correta: false },
          { id: 'd', texto: 'Sepse com hipoglicemia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia <50 mg/dL com HbA1c elevada indica hipoglicemia iatrogênica em DM2 [9,10].',
        pontos: 15
      },
      feedback: {
        correto: 'Perfeito! Confirma hipoglicemia em contexto de tratamento antidiabético.',
        incorreto: 'A baixa glicemia com HbA1c >7% sugere excesso de tratamento.'
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese diagnóstica principal.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipoglicemia iatrogênica por insulina em DM2', correta: true },
          { id: 'b', texto: 'Diabetes mellitus tipo 1 de início tardio', correta: false },
          { id: 'c', texto: 'Hipoglicemia factícia por sulfonilureia', correta: false },
          { id: 'd', texto: 'Insulinoma', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'História de insulina sem refeição e glicemia baixa é clássica de hipoglicemia iatrogênica [9,10].',
        pontos: 20
      },
      feedback: {
        correto: 'Correto! A insulina é a causa mais comum em diabéticos tratados.',
        incorreto: 'Considere o uso de hipoglicemiantes como causa primária.'
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'O paciente está consciente, mas sintomático. Defina o manejo inicial da hipoglicemia.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Administração de 15g de glicose oral e reavaliação', correta: true },
          { id: 'b', texto: 'Iniciar infusão de insulina', correta: false },
          { id: 'c', texto: 'Glucagom IM se consciente', correta: false },
          { id: 'd', texto: 'Observação sem intervenção', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Regra 15-15: 15g carboidrato rápido, reavaliar em 15 min. Ajustar doses futuras [9,10].',
        pontos: 20
      },
      feedback: {
        correto: 'Ótimo! Tratamento imediato previne complicações neurológicas.',
        incorreto: 'Priorize correção rápida da glicemia em paciente consciente.'
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após tratamento, glicemia normaliza para 120 mg/dL. Paciente orientado sobre prevenção. Retorna em 1 semana sem novos episódios.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Ajustar dose de insulina e educar sobre refeições regulares', correta: true },
          { id: 'b', texto: 'Suspender insulina e iniciar apenas metformina', correta: false },
          { id: 'c', texto: 'Encaminhar para internação', correta: false },
          { id: 'd', texto: 'Solicitar RMN de hipófise', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Educação e ajuste terapêutico reduzem recorrências em 50% [9,10].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Prevenção é chave no manejo de hipoglicemia recorrente.',
        incorreto: 'Foco em educação e otimização do regime antidiabético.'
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 58 anos com DM2 em insulina apresenta hipoglicemia iatrogênica por omissão de refeição. Tratado com glicose oral, ajustado regime e educado, evoluindo sem complicações.',
    diagnosticoFinal: 'Hipoglicemia iatrogênica em diabetes mellitus tipo 2',
    tratamentoRealizado: '15g glicose oral, redução de insulina NPH para 16 UI, reforço em metformina e educação nutricional',
    evolucao: 'Glicemia estabilizada, sem recorrências em 1 mês. HbA1c mantida em 7.5%.',
    licoesPrincipais: [
      'Reconhecer sintomas adrenérgicos (sudorese, tremores) como alerta precoce de hipoglicemia',
      'Em diabéticos, hipoglicemia é frequentemente iatrogênica; priorize histórico de medicamentos [9,10]',
      'Tratamento inicial: regra 15-15 para pacientes conscientes; glucagom ou IV se alterados',
      'Educação em prevenção: refeições regulares, ajuste de doses em dias de doença e monitoramento glicêmico',
      'Hipoglicemia aumenta risco CV; otimize controle glicêmico sem excessos [9,10]'
    ],
    errosComuns: [
      'Ignorar histórico de medicamentos, atrasando diagnóstico',
      'Tratar hipoglicemia com insulina em vez de glicose, agravando o quadro',
      'Não educar sobre prevenção, levando a recorrências frequentes',
      'Subestimar risco em idosos ou com comorbidades, resultando em complicações neurológicas'
    ]
  },

  objetivosAprendizagem: [
    'Identificar causas e manejo agudo de hipoglicemia em pacientes diabéticos',
    'Aplicar diretrizes para prevenção de hipoglicemia iatrogênica [9,10]',
    'Reconhecer sinais de alerta e importância da educação do paciente',
    'Integrar raciocínio diagnóstico em cenários de emergência endócrina'
  ],
  competencias: [
    'Anamnese focada em fatores de risco endócrinos',
    'Interpretação de exames laboratoriais em distúrbios metabólicos',
    'Manejo inicial de emergências hipoglicêmicas',
    'Educação em saúde para adesão terapêutica em DM2'
  ],
  doencasRelacionadas: ['diabetes-mellitus-2'],
  medicamentosRelacionados: ['A10AD05', 'A10AE05', 'A10AB05'],
  calculadorasRelacionadas: ['calculadora-glicemia', 'calculadora-imc'],
  referencias: ['ref-009', 'ref-010', 'ref-011'],
  tags: ['hipoglicemia', 'diabetes tipo 2', 'insulina', 'emergência endócrina', 'educação em saúde']
};