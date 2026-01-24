import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ANAFILAXIA_urg_001: CasoClinico = {
  id: 'caso-anafilaxia-001',
  titulo: 'Reação Anafilática Aguda após Exposição a Alérgeno',
  subtitulo: 'Paciente com quadro súbito de urticária, dispneia e hipotensão após ingestão de alimento suspeito',
  categoria: 'urgencia',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2024-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 42,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Estou passando mal, com coceira forte na pele, falta de ar e inchaço no rosto!',
    historiaDoencaAtual: 'Paciente refere ingestão de camarão em refeição familiar há 30 minutos, seguida de prurido cutâneo generalizado, eritema e urticária, progressão para edema de face e língua, dispneia com sibilos e sensação de "garganta fechando". Sem perda de consciência inicial, mas com tontura. Nega trauma ou outros sintomas prévios. Histórico de rinite alérgica, sem episódios prévios graves. Chega ao pronto-socorro acompanhada.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Inicial',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você inicia a anamnese em ambiente de urgência. O que deseja investigar prioritariamente?',
        dicas: ['Foco em gatilhos alérgicos, tempo de início e sintomas associados']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS crítica para guiar o manejo inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de alergias', correta: false },
          { id: 'b', texto: 'Tempo exato de exposição ao suspeito e progressão dos sintomas', correta: true },
          { id: 'c', texto: 'Hábitos alimentares diários', correta: false },
          { id: 'd', texto: 'Viagens recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O início súbito (<1 hora) após exposição sugere anafilaxia IgE-mediada [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A cronologia ajuda a confirmar a suspeita de anafilaxia.',
        incorreto: 'Priorize a história temporal para diferenciar de outras causas.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico Inicial',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa sinais de choque e envolvimento respiratório.',
        dados: {
          'PA': '80/50 mmHg',
          'FC': '120 bpm',
          'FR': '28 irpm',
          'SatO2': '92% em ar ambiente',
          'Temperatura': '36.8°C',
          'Pele': 'Urticária generalizada, edema periorbital e labial',
          'Pulmões': 'Sibilos difusos bilaterais'
        },
        dicas: ['Sinais de instabilidade hemodinâmica e obstrução de vias aéreas são alarmantes']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS indicativo de gravidade?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Urticária generalizada', correta: false },
          { id: 'b', texto: 'Hipotensão (PA 80/50 mmHg) com taquicardia', correta: true },
          { id: 'c', texto: 'Edema periorbital', correta: false },
          { id: 'd', texto: 'Sibilos difusos', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hipotensão e taquicardia sugerem choque anafilático, exigindo intervenção imediata [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares e Avaliação Inicial',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você realiza avaliação rápida e exames iniciais enquanto estabiliza. Resultados preliminares:',
        dados: {
          'Gasometria arterial': 'pH 7.35, pCO2 32 mmHg, pO2 70 mmHg',
          'Triptase sérica': 'Elevada (45 ng/mL, normal <11.4)',
          'Hemograma': 'Eosinófilos 8%',
          'ECG': 'Sinusal taquicárdico'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes achados no contexto?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção respiratória aguda', correta: false },
          { id: 'b', texto: 'Anafilaxia confirmada por triptase elevada e hipoxemia', correta: true },
          { id: 'c', texto: 'Crise asmática isolada', correta: false },
          { id: 'd', texto: 'Choque séptico', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Triptase >2x normal confirma ativação mastocitária em anafilaxia [1,5]. Hipoxemia reforça envolvimento respiratório [2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Anafilaxia induzida por alimento (camarão)', correta: true },
          { id: 'b', texto: 'Ataque de pânico com urticária', correta: false },
          { id: 'c', texto: 'Asma aguda desencadeada por infecção', correta: false },
          { id: 'd', texto: 'Angioedema hereditário', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Critérios clínicos (pele + respiratório + cardiovascular) pós-exposição confirmam anafilaxia [1,2]. Diferencial com asma ou angioedema requer história [11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Manejo Terapêutico Inicial',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina a conduta de emergência prioritária.'
      },
      pergunta: {
        enunciado: 'Qual a intervenção MAIS apropriada e urgente?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Antihistamínico IV isolado', correta: false },
          { id: 'b', texto: 'Adrenalina IM 0,3-0,5 mg (1:1000) imediatamente, seguida de suporte ABC', correta: true },
          { id: 'c', texto: 'Corticosteroide oral', correta: false },
          { id: 'd', texto: 'Aminofilina IV', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Adrenalina é o tratamento de primeira linha em anafilaxia, revertendo choque e broncoespasmo [1,2]. Suporte ABC essencial [11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento e Prevenção',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após administração de adrenalina, paciente estabiliza: PA 110/70 mmHg, SatO2 98%, resolução parcial de sintomas. Observação por 4-6 horas sem recidiva.'
      },
      pergunta: {
        enunciado: 'Qual a conduta para alta e seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alta com prescrição de auto-injetor de adrenalina, antihistamínico e orientação para evitar alérgenos; retorno em 1 semana para alergista', correta: true },
          { id: 'b', texto: 'Alta imediata sem medicação', correta: false },
          { id: 'c', texto: 'Internação por 24h obrigatória', correta: false },
          { id: 'd', texto: 'Apenas orientação verbal', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Educação e prescrição de epinefrina auto-injetável reduzem mortalidade em recidivas (risco 20%) [1,2]. Encaminhamento a alergista para testes [5].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 42 anos apresentou anafilaxia grave após ingestão de camarão, com envolvimento cutâneo, respiratório e cardiovascular. Tratada com sucesso com adrenalina IM, suporte e observação, evoluindo para alta estável.',
    diagnosticoFinal: 'Anafilaxia IgE-mediada por alimento',
    tratamentoRealizado: 'Adrenalina IM 0,3 mg (repetida após 5 min), difenidramina IV, hidrocortisona IV, oxigênio e fluidos IV. Prescrição de auto-injetor de epinefrina e cetirizina.',
    evolucao: 'Melhora rápida após primeira dose de adrenalina; sem recidiva em observação de 6 horas. Alta no mesmo dia com educação sobre alergia.',
    licoesPrincipais: [
      'Reconhecer anafilaxia pelos critérios clínicos (pele + um sistema) e tratar imediatamente com adrenalina IM [1,2].',
      'Triptase sérica auxilia na confirmação retrospectiva, mas não atrasa tratamento [5].',
      'Educação do paciente inclui auto-injetor e plano de ação para evitar fatalidade [1,11].',
      'Diferencial com asma ou urticária isolada requer história de exposição [2].',
      'No Brasil, acesso a epinefrina via SUS é essencial em urgências alérgicas [13].'
    ],
    errosComuns: [
      'Atrasar adrenalina priorizando antihistamínicos, aumentando risco de choque [1].',
      'Subestimar biphasic reaction (recidiva em 20%), sem observação adequada [2].',
      'Não educar sobre alérgenos comuns como frutos do mar em populações brasileiras [12].',
      'Ignorar comorbidades como rinite alérgica que potencializam risco [11].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar e classificar anafilaxia como urgência vital.',
    'Executar manejo inicial com adrenalina e suporte ABC.',
    'Orientar prevenção e seguimento em alergia alimentar.',
    'Diferenciar anafilaxia de condições simuladoras como asma aguda.'
  ],
  competencias: [
    'Manejo de emergências alérgicas',
    'Raciocínio clínico em imunologia',
    'Educação em saúde para prevenção de recidivas'
  ],
  doencasRelacionadas: ['asma', 'urticaria', 'angioedema'],
  medicamentosRelacionados: ['epinefrina', 'difenidramina', 'hidrocortisona'],
  calculadorasRelacionadas: ['escalculo_risco_alergia'],
  referencias: ['ref-001', 'ref-002', 'ref-005', 'ref-011', 'ref-012', 'ref-013'],
  tags: ['anafilaxia', 'urgencia', 'alergia', 'emergencia', 'imunologia']
};