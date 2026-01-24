import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_HIPO_urg_001: CasoClinico = {
  id: 'caso-hipoglicemia-grave-001',
  titulo: 'Hipoglicemia Grave em Paciente com Diabetes Mellitus Tipo 2',
  subtitulo: 'Mulher de 58 anos com DM2 apresenta sintomas de confusão e fraqueza súbita',
  categoria: 'urgencia',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2024-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 58,
      sexo: 'F',
      profissao: 'Aposentada',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou me sentindo muito fraca, suando frio e não consigo pensar direito',
    historiaDoencaAtual: 'Paciente conhecida com diabetes mellitus tipo 2 há 12 anos, em uso de metformina e insulina NPH. Relata que pulou o almoço hoje devido a uma consulta e tomou a dose habitual de insulina pela manhã. Início dos sintomas há 1 hora, com tremor, sudorese profusa, confusão mental e dificuldade para falar. Nega trauma, uso de álcool ou outras medicações recentes. Antecedente de episódios hipoglicêmicos prévios, mas não graves.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A família confirma que a paciente é insulinizada e pode ter esquecido de comer. O que deseja investigar?',
        dicas: ['Foco em medicamentos hipoglicemiantes, refeições recentes e episódios prévios']
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
        explicacao: 'Medicações hipoglicemiantes como insulina são causa comum de hipoglicemia grave em DM2 [9,10].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A insulina é um fator precipitante chave.',
        incorreto: 'Priorize o histórico de insulinoterapia para guiar o diagnóstico.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, a paciente está consciente, mas confusa, com sudorese profusa e palidez. Sinais vitais:',
        dados: {
          'PA': '110/70 mmHg',
          'FC': '102 bpm',
          'FR': '20 irpm',
          'Sat O2': '96%',
          'Glicemia capilar': '42 mg/dL',
          'IMC': '28.5 kg/m²'
        },
        dicas: ['Atenção para taquicardia, sudorese e glicemia baixa como sinais clássicos de hipoglicemia']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pressão arterial baixa', correta: false },
          { id: 'b', texto: 'Glicemia capilar 42 mg/dL', correta: true },
          { id: 'c', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'd', texto: 'Frequência cardíaca 102 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia < 70 mg/dL com sintomas neurológicos define hipoglicemia sintomática; < 54 mg/dL é grave [9,10].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você realiza glicemia venosa confirmatória e exames básicos. Resultados:',
        dados: {
          'Glicemia venosa': '38 mg/dL',
          'HbA1c': '7.8%',
          'Potássio': '3.8 mEq/L',
          'Sódio': '138 mEq/L',
          'Creatinina': '0.9 mg/dL',
          'Hemoglobina': '12.5 g/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hiperglicemia descontrolada', correta: false },
          { id: 'b', texto: 'Hipoglicemia grave com bom controle glicêmico crônico', correta: true },
          { id: 'c', texto: 'Insuficiência renal aguda', correta: false },
          { id: 'd', texto: 'Anemia grave', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Glicemia < 54 mg/dL confirma hipoglicemia grave; HbA1c indica controle razoável, mas risco de episódios agudos [9,10].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com os dados, você formula a hipótese. A paciente responde parcialmente à glicose oral inicial, mas persiste confusão.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hipoglicemia grave iatrogênica por insulina em DM2', correta: true },
          { id: 'b', texto: 'Acidente vascular cerebral isquêmico', correta: false },
          { id: 'c', texto: 'Intoxicação por álcool', correta: false },
          { id: 'd', texto: 'Crise de pânico', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas clássicos com glicemia baixa em paciente insulinizado confirmam hipoglicemia iatrogênica [9,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'A paciente está com alteração de consciência. Defina o tratamento imediato.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Aguardar melhora espontânea', correta: false },
          { id: 'b', texto: 'Administração de glicose 50% IV 50 mL', correta: true },
          { id: 'c', texto: 'Injeção de glucagon IM', correta: false },
          { id: 'd', texto: 'Hidratação venosa isolada', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em hipoglicemia grave com alteração de consciência, glicose IV é o tratamento de escolha; glucagon é alternativa se IV não disponível [9,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após glicose IV, a paciente recupera consciência plena em 10 minutos. Glicemia sobe para 120 mg/dL. Você educa sobre prevenção e ajusta insulina.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta no seguimento imediato?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Orientar refeições regulares, ajustar dose de insulina e retorno em 1 semana', correta: true },
          { id: 'b', texto: 'Suspender insulina permanentemente', correta: false },
          { id: 'c', texto: 'Encaminhar para internação prolongada', correta: false },
          { id: 'd', texto: 'Iniciar corticoide para estresse', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Prevenção inclui educação em autocuidado e titulação de hipoglicemiantes; seguimento próximo em atenção primária [9,10].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com DM2 apresentou hipoglicemia grave por dose de insulina sem ingestão adequada. Tratada com glicose IV, evoluiu bem com educação e ajuste terapêutico.',
    diagnosticoFinal: 'Hipoglicemia grave iatrogênica em diabetes mellitus tipo 2',
    tratamentoRealizado: 'Glicose 50% IV 50 mL, lanche rico em carboidratos, redução da dose de insulina NPH e reforço em educação diabética',
    evolucao: 'Recuperação completa sem sequelas neurológicas; paciente orientada sobre sinais de alerta e refeições regulares',
    licoesPrincipais: [
      'Reconhecer sintomas adrenérgicos (sudorese, tremor) e neuroglicopênicos (confusão) de hipoglicemia para intervenção rápida [9,10]',
      'Em DM2 insulinizado, hipoglicemia grave requer glicose IV se consciência alterada; meta glicêmica >70 mg/dL [9,10]',
      'Educação em prevenção é essencial: correlacionar doses com refeições e monitorar glicemia [9,10]',
      'Risco aumentado em idosos ou com comorbidades; rastrear episódios prévios para ajuste terapêutico [9,10]',
      'Hipoglicemia pode mimetizar AVC; sempre medir glicemia em emergências neurológicas [9]'
    ],
    errosComuns: [
      'Atrasar tratamento aguardando exames, arriscando dano cerebral irreversível',
      'Subestimar risco em pacientes com DM2 bem controlado (HbA1c baixa), que ainda podem ter hipoglicemia',
      'Não educar sobre "regra 15-15": 15g carboidrato rápido e reavaliação em 15 min para hipoglicemia leve',
      'Manter doses fixas de insulina sem considerar variações alimentares ou atividade'
    ]
  },

  objetivosAprendizagem: [
    'Identificar causas e sintomas de hipoglicemia grave em pacientes com DM2',
    'Executar manejo inicial de urgência com correção glicêmica segura',
    'Aplicar princípios de prevenção e educação em autocuidado diabético',
    'Diferenciar hipoglicemia de outras emergências neurológicas comuns'
  ],
  competencias: [
    'Avaliação e manejo de emergências endócrinas',
    'Raciocínio clínico em atenção primária',
    'Educação em saúde para doenças crônicas'
  ],
  doencasRelacionadas: ['diabetes-mellitus-2'],
  medicamentosRelacionados: ['A10AB05', 'A10BA02'],
  calculadorasRelacionadas: [],
  referencias: ['ref-009', 'ref-010'],
  tags: ['hipoglicemia', 'diabetes tipo 2', 'urgência endócrina', 'insulina', 'educação diabética']
};