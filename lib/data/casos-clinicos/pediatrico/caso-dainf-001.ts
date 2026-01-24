import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DAINF_ped_001: CasoClinico = {
  id: 'caso-dermatite-atopica-pediatrica-001',
  titulo: 'Criança com Prurido Intenso e Lesões Cutâneas',
  subtitulo: 'Caso de uma lactente de 18 meses com erupções eczematosas recorrentes',
  categoria: 'pediatrico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Ana Clara Silva',
      idade: 18,
      sexo: 'F',
      profissao: 'Lactente',
      estadoCivil: 'Solteira'
    },
    queixaPrincipal: 'Minha filha coça muito a pele, especialmente à noite, e tem manchas vermelhas que não melhoram',
    historiaDoencaAtual: 'A mãe relata que os sintomas iniciaram aos 6 meses de idade, com ressecamento cutâneo generalizado e prurido intenso, piorando após contato com sabonetes ou certos alimentos. Há episódios de exacerbação sazonal, com lesões que sangram ao coçar. A criança apresenta distúrbios do sono devido ao prurido. Não há febre ou outros sintomas sistêmicos. História familiar positiva para asma na mãe e rinite no pai.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A mãe menciona que a criança tem pele seca desde o nascimento e coça principalmente nas dobras dos joelhos e cotovelos. O que deseja investigar?',
        dicas: ['História familiar de atopia, desencadeadores ambientais e hábitos de higiene']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de infecções recorrentes', correta: false },
          { id: 'b', texto: 'História familiar de doenças alérgicas', correta: true },
          { id: 'c', texto: 'Vacinação em dia', correta: false },
          { id: 'd', texto: 'Dieta alimentar atual', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História familiar de atopia é um critério diagnóstico chave para dermatite atópica [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história familiar reforça a suspeita de dermatite atópica.',
        incorreto: 'Priorize fatores de risco atópicos para guiar o diagnóstico.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa pele seca e áspera (xerose) em todo o corpo, com placas eritematosas e liquenificadas nas flexuras dos cotovelos, joelhos e pescoço. Há excoriações devido ao coçar. Peso: 10 kg (percentil 50), estatura: 78 cm (percentil 50), sem outros achados.',
        dados: {
          'Peso': '10 kg',
          'Estatura': '78 cm',
          'Frequência cardíaca': '120 bpm',
          'Frequência respiratória': '28 irpm',
          'Temperatura': '36.8°C'
        },
        dicas: ['Observe as lesões típicas em áreas flexurais e sinais de prurido crônico']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de dermatite atópica?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Eritema difuso no tronco', correta: false },
          { id: 'b', texto: 'Placas liquenificadas em flexuras', correta: true },
          { id: 'c', texto: 'Pústulas localizadas', correta: false },
          { id: 'd', texto: 'Lesões vesiculares nas mãos', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Lesões eczematosas em áreas flexurais com prurido são características da dermatite atópica pediátrica [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para descartar outras causas. Resultados mostram eosinofilia leve e IgE total elevada, sem alterações em hemograma ou função hepática. Não há necessidade de biópsia cutânea neste estágio.',
        dados: {
          'Hemoglobina': '11.5 g/dL',
          'Leucócitos': '8.500/mm³',
          'Eosinófilos': '8%',
          'IgE total': '450 UI/mL (elevada para idade)',
          'Albumina sérica': '4.2 g/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Sugestivo de infecção bacteriana', correta: false },
          { id: 'b', texto: 'Compatível com componente alérgico atópico', correta: true },
          { id: 'c', texto: 'Indicativo de imunodeficiência', correta: false },
          { id: 'd', texto: 'Normal para a idade', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Eosinofilia e IgE elevada são comuns na dermatite atópica, suportando o diagnóstico clínico [2,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese diagnóstica utilizando critérios clínicos como os da EAACI.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Dermatite atópica moderada', correta: true },
          { id: 'b', texto: 'Dermatite de contato alérgica', correta: false },
          { id: 'c', texto: 'Psoríase gutata', correta: false },
          { id: 'd', texto: 'Impetigo contagioso', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Prurido, lesões flexurais, história atópica e IgE elevada atendem critérios diagnósticos para dermatite atópica [6,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento, priorizando medidas não farmacológicas e tópicas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas antibióticos orais', correta: false },
          { id: 'b', texto: 'Emolientes diários + corticosteroide tópico de baixa potência', correta: true },
          { id: 'c', texto: 'Antihistamínicos sistêmicos isolados', correta: false },
          { id: 'd', texto: 'Corticosteroide oral imediato', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Emolientes são base do tratamento; corticosteroides tópicos de baixa potência para lesões moderadas em crianças [4,5,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'A paciente retorna em 4 semanas. Há melhora significativa do prurido e redução das lesões, com adesão aos emolientes. SCORAD score diminuiu de 45 para 15.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter emolientes e reavaliar em 3 meses', correta: true },
          { id: 'b', texto: 'Intensificar com imunossupressores', correta: false },
          { id: 'c', texto: 'Suspender todo tratamento', correta: false },
          { id: 'd', texto: 'Encaminhar para alergista imediatamente', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Com resposta favorável, manter tratamento básico e seguimento trimestral conforme guidelines [4,6].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Criança de 18 meses com dermatite atópica moderada, diagnosticada clinicamente e tratada com sucesso inicial com emolientes e corticosteroide tópico.',
    diagnosticoFinal: 'Dermatite Atópica Pediátrica (CID-11: CA23)',
    tratamentoRealizado: 'Emolientes diários (como creme de ureia 5%), hidrocortisona tópica 1% nas lesões ativas por 7-14 dias, orientação para evitar irritantes e banhos curtos.',
    evolucao: 'Melhora clínica em 4 semanas, com redução do prurido e lesões. Acompanhamento contínuo para prevenção de exacerbações.',
    licoesPrincipais: [
      'O diagnóstico de dermatite atópica é primariamente clínico, baseado em prurido e distribuição típica de lesões [1,2].',
      'Emolientes são o pilar do tratamento, aplicados diariamente para restaurar a barreira cutânea [4,6].',
      'História familiar de atopia aumenta o risco e orienta o manejo [2,3].',
      'Evitar desencadeadores como sabonetes agressivos e alérgenos é essencial para controle [5,7].',
      'Monitoramento regular previne complicações como infecções secundárias [6].'
    ],
    errosComuns: [
      'Prescrever corticosteroides sistêmicos como primeira linha, reservando-os para casos graves [4].',
      'Ignorar medidas não farmacológicas, focando apenas em medicações [6].',
      'Confundir com infecções cutâneas sem avaliar prurido crônico [2].',
      'Não educar sobre adesão, levando a recidivas frequentes [5].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer os sinais e sintomas clássicos da dermatite atópica em crianças.',
    'Aplicar critérios diagnósticos clínicos para dermatite atópica pediátrica.',
    'Elaborar um plano terapêutico inicial baseado em evidências para casos leves a moderados.',
    'Entender a importância do acompanhamento e prevenção de exacerbações.'
  ],
  competencias: [
    'Realizar anamnese detalhada em pediatria dermatológica',
    'Interpretar exame físico cutâneo em crianças',
    'Formular diagnóstico diferencial em erupções pediátricas',
    'Prescrever tratamentos tópicos seguros para lactentes'
  ],
  doencasRelacionadas: ['dermatite-atopica-pediatrica'],
  medicamentosRelacionados: ['D07AC01', 'D11AH02'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007'],
  tags: ['dermatologia', 'pediatria', 'atopia', 'eczema', 'prurido']
};