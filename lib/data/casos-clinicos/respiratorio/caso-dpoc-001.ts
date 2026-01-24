import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DPOC_res_001: CasoClinico = {
  id: 'caso-dpoc-exacerbacao-001',
  titulo: 'Exacerbação Aguda de DPOC em Paciente Tabagista',
  subtitulo: 'Paciente de 62 anos com piora progressiva de dispneia e tosse produtiva',
  categoria: 'respiratorio',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'José Silva',
      idade: 62,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou sem ar, piorou muito nos últimos três dias e não consigo trabalhar.',
    historiaDoencaAtual: 'Paciente relata dispneia progressiva há anos, com episódios de piora sazonal. Há três dias, iniciou tosse produtiva com escarro amarelado, febre baixa (37,8°C) e aumento da frequência respiratória. História de tabagismo de 40 maços-ano, diagnóstico prévio de DPOC moderada há 5 anos, em uso de salbutamol inalatório sob demanda. Nega comorbidades como cardiopatia ou diabetes, mas refere exposição ocupacional a poeiras. Sem vacinação recente contra influenza ou pneumococo.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente confirma tabagismo atual e exposição ambiental. O que mais deseja investigar?',
        dicas: ['Considere história de tabagismo, gatilhos de exacerbação e comorbidades respiratórias.']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de asma', correta: false },
          { id: 'b', texto: 'História de tabagismo e quantidade em maços-ano', correta: true },
          { id: 'c', texto: 'Dieta alimentar recente', correta: false },
          { id: 'd',  texto: 'Viagens internacionais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A história de tabagismo é fator de risco principal para DPOC e exacerbações [3,4].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! O tabagismo é central no manejo da DPOC.',
        incorreto: 'Priorize fatores de risco respiratórios como tabagismo.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa uso de musculatura acessória, sibilos difusos e cianose periférica leve.',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '100 bpm',
          'FR': '28 irpm',
          'SatO2': '88% em ar ambiente',
          'IMC': '26.5 kg/m²',
          'Ausculta pulmonar': 'Sibilos bilaterais e roncos'
        },
        dicas: ['Note a hipoxemia e taquipneia como sinais de exacerbação aguda.']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 130/80 mmHg', correta: false },
          { id: 'b', texto: 'SatO2 88% em ar ambiente', correta: true },
          { id: 'c', texto: 'IMC 26.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 100 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hipoxemia (SatO2 <92%) indica necessidade imediata de oxigenoterapia em exacerbação de DPOC [3,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram acidose respiratória leve.',
        dados: {
          'Gasometria arterial (ar ambiente)': 'pH 7.32, pCO2 55 mmHg, pO2 60 mmHg, HCO3 28 mEq/L',
          'Hemograma': 'Leucócitos 12.000/mm³ (neutrófilos 80%)',
          'Radiografia de tórax': 'Hiperinsuflação e infiltrados peribronquiais bilaterais',
          'Espirometria prévia (baseline)': 'VEF1/CVF 0.62 pós-broncodilatador'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção bacteriana isolada', correta: false },
          { id: 'b', texto: 'Exacerbação de DPOC com hipercapnia', correta: true },
          { id: 'c', texto: 'Pneumonia comunitária', correta: false },
          { id: 'd', texto: 'Insuficiência cardíaca congestiva', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'pCO2 elevada e VEF1/CVF <0.70 confirmam obstrução e exacerbação de DPOC [3,4].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Exacerbação aguda de DPOC (GOLD grupo B)', correta: true },
          { id: 'b', texto: 'Asma de início tardio', correta: false },
          { id: 'c', texto: 'Edema pulmonar', correta: false },
          { id: 'd', texto: 'Tromboembolismo pulmonar', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas, tabagismo e espirometria confirmam exacerbação de DPOC [3,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o manejo inicial para exacerbação moderada.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas analgésicos e repouso', correta: false },
          { id: 'b', texto: 'Broncodilatadores + corticosteroide sistêmico + antibiótico', correta: true },
          { id: 'c', texto: 'Oxigenoterapia isolada', correta: false },
          { id: 'd', texto: 'Ventilação mecânica imediata', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'GOLD recomenda broncodilatadores de ação curta, prednisona oral e antibiótico se escarro purulento [3,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 1 semana após alta. SatO2 94% em ar ambiente, sem febre, mas dispneia persistente em esforço.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter terapia inalatória e agendar reavaliação em 3 meses', correta: true },
          { id: 'b', texto: 'Internar novamente', correta: false },
          { id: 'c', texto: 'Suspender todos os medicamentos', correta: false },
          { id: 'd', texto: 'Encaminhar para cirurgia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora clínica permite manutenção e educação para cessação tabágica [3,4,6].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com exacerbação aguda de DPOC tratada ambulatorialmente com melhora, mas necessidade de otimização terapêutica crônica.',
    diagnosticoFinal: 'Exacerbação aguda de DPOC moderada (CID-11: CA23)',
    tratamentoRealizado: 'Broncodilatadores (salbutamol + ipratrópio), prednisona 40mg/dia por 5 dias, azitromicina 500mg/dia por 3 dias, oxigenoterapia domiciliar e cessação tabágica.',
    evolucao: 'Alta em 48h com SatO2 >92%, retorno em 1 semana com resolução de sintomas agudos e plano de manutenção com LABA/LAMA.',
    licoesPrincipais: [
      'Identificar exacerbações de DPOC precocemente reduz hospitalizações [3,4].',
      'Tabagismo é o principal fator modificável; cessação melhora prognóstico [3,6].',
      'Espirometria é essencial para diagnóstico, mas gasometria guia manejo agudo [4].',
      'Vacinação e reabilitação pulmonar previnem recorrências [3,5].',
      'Classificação GOLD orienta terapia escalonada [3].'
    ],
    errosComuns: [
      'Subestimar hipoxemia e atrasar oxigenoterapia [3].',
      'Não investigar infecção e omitir antibióticos em escarro purulento [4].',
      'Ignorar cessação tabágica no plano de longo prazo [6].',
      'Exagerar uso de corticoides sem limitação temporal [3].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais e sintomas de exacerbação de DPOC e fatores de risco.',
    'Interpretar exames complementares como gasometria e espirometria no contexto agudo.',
    'Aplicar diretrizes GOLD para manejo inicial e prevenção de recorrências.',
    'Promover educação em saúde para cessação tabágica e vacinação.'
  ],
  competencias: [
    'Avaliação respiratória em atenção primária',
    'Manejo de exacerbações crônicas',
    'Educação em saúde para doenças respiratórias'
  ],
  doencasRelacionadas: ['dpoc'],
  medicamentosRelacionados: ['R03AC02', 'R03BB04', 'R03AK06'],
  calculadorasRelacionadas: ['indice-bode'],
  referencias: ['ref-003', 'ref-004', 'ref-005', 'ref-006'],
  tags: ['DPOC', 'exacerbação', 'tabagismo', 'broncodilatadores', 'corticosteroide']
};