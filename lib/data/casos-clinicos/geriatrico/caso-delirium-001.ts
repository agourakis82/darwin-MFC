import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DELIRIUM_ger_001: CasoClinico = {
  id: 'caso-delirio-001',
  titulo: 'Delírio em Idosa com Suspeita de Demência Subjacente',
  subtitulo: 'Paciente idosa apresenta confusão aguda e flutuante, com histórico de declínio cognitivo crônico.',
  categoria: 'geriatrico',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 78,
      sexo: 'F',
      profissao: 'Aposentada (ex-doméstica)',
      estadoCivil: 'Viúva'
    },
    queixaPrincipal: 'A família relata: "Ela está confusa, não reconhece ninguém e fica agitada à noite."',
    historiaDoencaAtual: 'Paciente idosa com histórico de declínio cognitivo progressivo nos últimos 2 anos, diagnosticado como possível demência. Há 3 dias, agravamento agudo com confusão flutuante, desorientação espaço-temporal e alucinações visuais. Nega febre relatada, mas apresenta incontinência urinária recente. Usa múltiplos medicamentos: donepezila 10mg/dia, haloperidol 1mg à noite PRN, e anti-hipertensivos. Vive com filha, bom suporte familiar.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história com a família. Eles mencionam piora súbita após uma queda leve há 4 dias, sem trauma aparente, e aumento na agitação noturna. A paciente tem polimedicação e histórico de infecções urinárias recorrentes.',
        dicas: ['Investigue causas comuns de delírio: infecções, medicamentos, desidratação; diferencie de demência crônica [1,3]']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para esclarecer o quadro agudo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de demência', correta: false },
          { id: 'b', texto: 'Alterações recentes em medicações ou infecções', correta: true },
          { id: 'c', texto: 'Hábitos alimentares diários', correta: false },
          { id: 'd', texto: 'Atividades recreativas passadas', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Delírio é agudo e flutuante, frequentemente precipitado por infecções ou polimedicação em idosos com demência subjacente [1,3,4].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores precipitantes são cruciais para diferenciar delírio de demência.',
        incorreto: 'Priorize elementos agudos; delírio requer identificação rápida de causas reversíveis.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, a paciente está desorientada, com atenção flutuante e agitação leve. Não coopera totalmente.',
        dados: {
          'PA': '142/88 mmHg',
          'FC': '92 bpm',
          'FR': '20 irpm',
          'T°': '38.2°C',
          'IMC': '24.5 kg/m²',
          'Estado mental': 'Desorientada em tempo e lugar, escore CAM positivo para delírio'
        },
        dicas: ['Avalie sinais de infecção ou desidratação; use Confusion Assessment Method (CAM) para delírio [3]']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de delírio agudo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 142/88 mmHg', correta: false },
          { id: 'b', texto: 'Febre de 38.2°C e flutuação atencional', correta: true },
          { id: 'c', texto: 'IMC 24.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 92 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Febre sugere infecção como precipitante; delírio apresenta início agudo e flutuação, diferentemente da demência [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais para investigar causas. Resultados mostram:',
        dados: {
          'Hemograma': 'Leucócitos 14.000/mm³ (neutrofilia)',
          'Ureia': '65 mg/dL',
          'Creatinina': '1.4 mg/dL',
          'Eletrólitos': 'Sódio 132 mEq/L (hiponatremia leve)',
          'Glicemia': '145 mg/dL',
          'Urocultura': 'E. coli >10^5 UFC/mL',
          'Mini-Exame do Estado Mental (MMSE)': '18/30 (declínio cognitivo basal)'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados no contexto do delírio?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas demência progressiva', correta: false },
          { id: 'b', texto: 'Delírio por ITU e desidratação em base demência', correta: true },
          { id: 'c', texto: 'Hipoglicemia isolada', correta: false },
          { id: 'd', texto: 'Insuficiência renal crônica sem relação', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'ITU é causa comum de delírio em idosos; hiponatremia e ureia elevada indicam desidratação. MMSE sugere demência subjacente [2,3,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando história, exame e exames, formule sua hipótese. Considere delírio sobreposto a demência.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Demência de Alzheimer isolada', correta: false },
          { id: 'b', texto: 'Delírio hiperativo secundário a ITU em paciente com demência', correta: true },
          { id: 'c', texto: 'Demência com corpos de Lewy', correta: false },
          { id: 'd', texto: 'Delírio por overdose de donepezila', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Delírio é síndrome aguda com causa identificável (ITU); demência é crônica. Diagnóstico precoce evita complicações [1,3,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o manejo inicial: trate a causa subjacente e suporte não farmacológico.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Aumentar dose de haloperidol para controle agitacional', correta: false },
          { id: 'b', texto: 'Antibiótico para ITU + hidratação + medidas não farmacológicas', correta: true },
          { id: 'c', texto: 'Suspender donepezila imediatamente', correta: false },
          { id: 'd', texto: 'Iniciar antipsicótico atípico de rotina', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tratar ITU com ciprofloxacino ou similar (ajustar por SUS); priorize reorientação, ambiente calmo e evitar polimedicação [3,4,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 48 horas, após antibiótico e hidratação IV, a confusão melhora parcialmente. Urocultura negativa em controle. Paciente mais alerta, mas persiste déficit cognitivo basal.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alta com orientação familiar e reavaliação em 1 semana', correta: true },
          { id: 'b', texto: 'Manter internação por delírio persistente', correta: false },
          { id: 'c', texto: 'Iniciar investigação para demência com PET', correta: false },
          { id: 'd', texto: 'Suspender todos os medicamentos crônicos', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resolução do delírio permite alta; monitore demência e previna recorrências com avaliação medicamentosa [3,5,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Idosa com demência apresenta delírio hiperativo por ITU e desidratação, resolvido com tratamento etiológico e suporte.',
    diagnosticoFinal: 'Delírio agudo sobre demência provável Alzheimer (CID-11: CA23; SNOMED: 38341003)',
    tratamentoRealizado: 'Ciprofloxacino 500mg 12/12h por 7 dias, hidratação oral/IV, reorientação ambiental, revisão medicamentosa (redução haloperidol).',
    evolucao: 'Melhora em 72 horas, alta em 5 dias. Retorno em 1 semana com MMSE 20/30, sem flutuações agudas.',
    licoesPrincipais: [
      'Delírio em idosos requer busca ativa por causas reversíveis como infecções e medicamentos [1,3].',
      'Diferencie delírio (agudo, flutuante) de demência (crônica, progressiva) usando CAM [3].',
      'Polimedicação aumenta risco; revise e deprescriba em geriátricos [4,9].',
      'Diagnóstico precoce de delírio previne complicações como quedas e institucionalização [1,7].',
      'Integre avaliação nutricional e odontológica em idosos com declínio cognitivo [2,9].'
    ],
    errosComuns: [
      'Confundir delírio com exacerbação de demência e tratar apenas sintomaticamente com antipsicóticos [3].',
      'Não investigar causas infecciosas em idosos incontinentes, atrasando resolução [2].',
      'Ignorar impacto de desidratação e eletrólitos em delírio geriátrico [4].',
      'Iniciar biomarcadores avançados sem tratar o agudo, desnecessário no SUS inicial [5,6].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer e diferenciar delírio de demência em contexto geriátrico.',
    'Identificar e tratar causas precipitantes de delírio, priorizando abordagem não farmacológica.',
    'Aplicar recomendações para manejo de delírio em atenção primária, alinhado a consensos.',
    'Avaliar riscos de polimedicação e comorbidades em idosos com declínio cognitivo.'
  ],
  competencias: ['Avaliação geriátrica integral', 'Raciocínio diagnóstico em emergências cognitivas', 'Manejo ético de delírio e demência'],
  doencasRelacionadas: ['delirio', 'demencia'],
  medicamentosRelacionados: ['N06DA01', 'N05AH01'],
  calculadorasRelacionadas: ['cam-delirium', 'mmse-cognitivo'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-008', 'ref-009', 'ref-010'],
  tags: ['delirio', 'geriatria', 'demencia', 'itu-idosos', 'polimedicacao']
};