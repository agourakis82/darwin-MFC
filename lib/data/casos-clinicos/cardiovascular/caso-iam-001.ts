import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_IAM_car_001: CasoClinico = {
  id: 'caso-infarto-agudo-miocardio-001',
  titulo: 'Infarto Agudo do Miocárdio em Paciente com Dor Torácica Intensa',
  subtitulo: 'Paciente de 58 anos apresenta dor torácica súbita com irradiação, sugerindo evento coronariano agudo em contexto de fatores de risco cardiovascular.',
  categoria: 'cardiovascular',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 58,
      sexo: 'M',
      profissao: 'Pedreiro',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Dor forte no peito que começou há 2 horas e não passa',
    historiaDoencaAtual: 'Paciente relata dor torácica retroesternal opressiva, de início súbito durante atividade física leve, irradiando para o braço esquerdo e mandíbula, associada a sudorese profusa e náuseas. Intensidade 9/10, não aliviada por repouso. Antecedentes: hipertensão arterial há 10 anos, tabagista de 30 maços-ano, dislipidemia não tratada, sedentário. Nega diabetes ou história familiar precoce de DAC.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente confirma tabagismo crônico e uso irregular de anti-hipertensivos. Nega trauma recente ou infecções. O que mais investigar?',
        dicas: ['Fatores de risco para DAC, sintomas associados como dispneia ou sudorese']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para estratificar o risco coronariano?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Tabagismo e hipertensão não controlada', correta: true },
          { id: 'c', texto: 'Dieta alimentar habitual', correta: false },
          { id: 'd', texto: 'Atividade sexual recente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tabagismo e HAS são fatores de risco maiores para IAM, elevando a suspeita de isquemia aguda [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores de risco como tabagismo e HAS guiam a suspeita de evento coronariano.',
        incorreto: 'Priorize fatores de risco cardiovascular estabelecidos para IAM.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, o paciente está ansioso, pálido e diaphoretico. Sinais vitais mostram instabilidade hemodinâmica sugestiva de choque cardiogênico incipiente.',
        dados: {
          'PA': '100/60 mmHg',
          'FC': '110 bpm',
          'FR': '24 irpm',
          'SatO2': '92% AA',
          'IMC': '28.5 kg/m²',
          'Exame cardiovascular': 'B3 presente, sem sopros'
        },
        dicas: ['Hipotensão e taquicardia indicam possível complicação aguda; note hipoxemia']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS alarmante e requer ação imediata?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC 28.5 kg/m²', correta: false },
          { id: 'b', texto: 'PA 100/60 mmHg com FC 110 bpm', correta: true },
          { id: 'c', texto: 'FR 24 irpm', correta: false },
          { id: 'd', texto: 'B3 ao ausculta', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hipotensão e taquicardia sugerem instabilidade hemodinâmica em IAM, demandando suporte imediato [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita ECG de 12 derivações e marcadores cardíacos de urgência. Resultados revelam alterações isquêmicas agudas.',
        dados: {
          'ECG': 'Elevação ST em DII, DIII, aVF (parede inferior)',
          'Troponina I': '2.5 ng/mL (ref <0.04)',
          'CK-MB': '45 U/L (ref <5)',
          'Hemograma': 'Hb 13.5 g/dL, plaquetas 250.000/mm³',
          'Glicemia': '180 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar esses achados laboratoriais e de imagem?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Isquemia transitória sem necrose', correta: false },
          { id: 'b', texto: 'IAM com supradesnivelamento de ST (STEMI)', correta: true },
          { id: 'c', texto: 'Pericardite aguda', correta: false },
          { id: 'd', texto: 'IAM não-STEMI isolado', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Elevação ST + troponina elevada confirmam STEMI, indicando oclusão coronariana aguda [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando história, exame e exames, a hipótese é de evento coronariano agudo com necrose miocárdica.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Angina instável', correta: false },
          { id: 'b', texto: 'Infarto Agudo do Miocárdio (STEMI)', correta: true },
          { id: 'c', texto: 'Dissecção aórtica', correta: false },
          { id: 'd', texto: 'Embolia pulmonar', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas clássicos + ECG com supradesnivelamento ST + elevação de troponina definem STEMI [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Dado o STEMI com <12h de evolução, priorize reperfusão. Paciente é transferido para unidade com hemodinâmica.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica INICIAL MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas betabloqueador e analgésico', correta: false },
          { id: 'b', texto: 'AAS 300mg + clopidogrel + heparina + ICP imediata', correta: true },
          { id: 'c', texto: 'Trombólise isolada sem antiagregantes', correta: false },
          { id: 'd', texto: 'Observação por 24h sem intervenção', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Terapia antiagregante dupla + anticoagulação + reperfusão por ICP é padrão para STEMI [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Pós-ICP bem-sucedida (angioplastia com stent na CD), paciente evolui para UTI. Em 48h, está estável, com troponina normalizando e ECG melhorando. Alta em 5 dias com dupla antiagregação e estatina.'
      },
      pergunta: {
        enunciado: 'Qual o plano de seguimento pós-alta?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Retorno em 1 semana para reavaliação e reabilitação cardíaca', correta: true },
          { id: 'b', texto: 'Suspender antiagregantes após 1 mês', correta: false },
          { id: 'c', texto: 'Sem necessidade de follow-up ambulatorial', correta: false },
          { id: 'd', texto: 'Encaminhamento imediato para cirurgia de revascularização', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Follow-up precoce pós-IAM inclui otimização de terapia e reabilitação para prevenção secundária [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 58 anos com STEMI de parede inferior tratado com ICP bem-sucedida, evoluindo favoravelmente sem complicações maiores.',
    diagnosticoFinal: 'Infarto Agudo do Miocárdio com Supradesnivelamento de ST (CID-11: BA40)',
    tratamentoRealizado: 'AAS 300mg + clopidogrel 600mg de carga, enoxaparina, morfina, ICP com stent na coronária direita, seguida de betabloqueador, IECA e estatina.',
    evolucao: 'Alta hospitalar em 5 dias, com função ventricular preservada (FE 55%) e plano de cessação tabágica e controle de fatores de risco.',
    licoesPrincipais: [
      'Reconhecer sintomas clássicos de IAM (dor opressiva, sudorese) em pacientes de risco para ativação rápida do sistema de reperfusão [1,2].',
      'ECG de 12 derivações é essencial no diagnóstico inicial de STEMI, guiando terapia de urgência [1].',
      'Terapia antiagregante dupla + reperfusão por ICP é o padrão ouro, reduzindo mortalidade em até 30% [2].',
      'Prevenção secundária pós-IAM inclui controle rigoroso de HAS, dislipidemia e tabagismo [3,4].',
      'Estresse psicossocial em profissões manuais pode agravar fatores de risco coronariano [5].'
    ],
    errosComuns: [
      'Subestimar dor torácica em homens de meia-idade como "gastrite", atrasando diagnóstico [1].',
      'Não solicitar ECG imediato em dor torácica <2h, perdendo janela de reperfusão [2].',
      'Omitir antiagregantes em fase aguda, aumentando risco de trombose stent [1,2].',
      'Falhar em educar sobre cessação tabágica, perpetuando risco recorrente [3].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar e estratificar pacientes com suspeita de IAM com base em história e fatores de risco.',
    'Interpretar achados de ECG e biomarcadores para diagnóstico de STEMI.',
    'Aplicar diretrizes de reperfusão e terapia adjuvante em contexto de urgência cardiovascular.',
    'Planejar prevenção secundária pós-IAM para reduzir eventos futuros.'
  ],
  competencias: [
    'Avaliação inicial de emergências cardiovasculares',
    'Interpretação de exames diagnósticos em cardiologia',
    'Manejo farmacológico e intervencionista em DAC aguda',
    'Aconselhamento em prevenção de doenças cardiovasculares'
  ],
  doencasRelacionadas: ['angina-estavel', 'doenca-arterial-coronariana'],
  medicamentosRelacionados: ['C01DA02', 'B01AC06', 'C10AA01', 'C07AA05', 'C09AA05'],
  calculadorasRelacionadas: ['escore-timi', 'escore-grace'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005'],
  tags: ['IAM', 'STEMI', 'dor torácica', 'reperfusao', 'prevencao cardiovascular']
};