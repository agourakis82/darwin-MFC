import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_VARICELA_ped_001: CasoClinico = {
  id: 'caso-varicela-001',
  titulo: 'Criança com exantema vesicular e febre',
  subtitulo: 'Suspeita de varicela em paciente pediátrico não vacinado',
  categoria: 'pediatrico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 3,
      sexo: 'F',
      profissao: 'Criança',
      estadoCivil: 'Solteira'
    },
    queixaPrincipal: 'Minha filha está com bolinhas vermelhas no corpo e febre há dois dias',
    historiaDoencaAtual: 'Maria, 3 anos, é levada à consulta por sua mãe devido a febre de até 38,5°C e aparecimento de lesões cutâneas pruriginosas. A mãe relata que a criança frequenta creche e que um colega de turma apresentou sintomas semelhantes na semana anterior. Maria não foi vacinada contra varicela por esquecimento no calendário vacinal. Não há comorbidades conhecidas, e a criança estava bem até o início dos sintomas. Apresenta irritabilidade e coça as lesões.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A mãe menciona contato próximo com o colega afetado na creche. Qual aspecto é mais relevante para o diagnóstico diferencial?',
        dicas: ['Investigue status vacinal, histórico de exposição e contato com imunossuprimidos']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Histórico de alergias alimentares', correta: false },
          { id: 'b', texto: 'Status vacinal contra varicela', correta: true },
          { id: 'c', texto: 'Dieta recente da criança', correta: false },
          { id: 'd', texto: 'Atividades recreativas', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'O status vacinal e exposição são fundamentais para suspeitar de varicela, uma doença altamente contagiosa [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! O status vacinal é essencial para prevenção e diagnóstico.',
        incorreto: 'Priorize o rastreamento de suscetibilidade vacinal em crianças expostas.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa febre de 38,2°C, lesões maculopapulares eritematosas evoluindo para vesículas em diferentes estágios, distribuídas no tronco, face e membros, com prurido moderado. Sem sinais de infecção secundária.',
        dados: {
          'Temperatura': '38,2°C',
          'FC': '120 bpm',
          'FR': '28 irpm',
          'Peso': '14 kg',
          'Estatura': '95 cm'
        },
        dicas: ['Observe a distribuição e evolução das lesões vesiculares típicas']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS sugestivo de varicela?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Febre isolada', correta: false },
          { id: 'b', texto: 'Lesões vesiculares em estágios variados', correta: true },
          { id: 'c', texto: 'Aumento de linfonodos cervicais', correta: false },
          { id: 'd', texto: 'Exantema maculopapular uniforme', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'As lesões vesiculares pruriginosas em diferentes estágios de evolução são características clássicas da varicela [1,3].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Dado o quadro clínico sugestivo, você opta por diagnóstico clínico, mas considera sorologia em caso de dúvida. Resultados laboratoriais básicos mostram leucopenia leve e VHS elevada, sem alterações hepáticas.',
        dados: {
          'Hemograma': 'Leucócitos 4.200/mm³ (leucopenia)',
          'VHS': '45 mm/h',
          'AST/ALT': 'Normais',
          'Sorologia IgM VZV': 'Positiva (se solicitada)'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes achados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção bacteriana secundária', correta: false },
          { id: 'b', texto: 'Infecção viral aguda compatível com varicela', correta: true },
          { id: 'c', texto: 'Alergia cutânea isolada', correta: false },
          { id: 'd', texto: 'Doença autoimune', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Leucopenia e VHS elevada são comuns em infecções virais como varicela; sorologia IgM confirma infecção aguda [2,7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e dados laboratoriais, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Varicela primária em criança suscetível', correta: true },
          { id: 'b', texto: 'Escarlatina', correta: false },
          { id: 'c', texto: 'Dermatite atópica', correta: false },
          { id: 'd', texto: 'Sarampo', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Exposição, ausência de vacinação e lesões vesiculares confirmam varicela, causada pelo VZV [1,2,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'A criança apresenta forma leve; defina o manejo inicial, incluindo isolamento e prevenção para contatos.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Antibióticos orais imediatos', correta: false },
          { id: 'b', texto: 'Tratamento sintomático com antipiréticos e anti-histamínicos, isolamento por 7 dias', correta: true },
          { id: 'c', texto: 'Aciclovir oral para todos os casos', correta: false },
          { id: 'd', texto: 'Corticoides tópicos', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Na varicela leve em crianças saudáveis, o tratamento é sintomático; isolamento previne transmissão. Vacinação pós-exposição para suscetíveis [3,7,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 7 dias, as lesões secam sem complicações. A mãe relata adesão ao isolamento. Discuta vacinação para irmãos suscetíveis.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter vigilância e vacinar contatos suscetíveis', correta: true },
          { id: 'b', texto: 'Solicitar sorologia de rotina para todos', correta: false },
          { id: 'c', texto: 'Iniciar profilaxia antiviral em família', correta: false },
          { id: 'd', texto: 'Encaminhar para hospitalização', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Evolução favorável; rastreamento e vacinação de contatos reduzem incidência em até 90% [3,4,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Criança de 3 anos com varicela primária após exposição em creche, sem vacinação prévia. Tratamento sintomático levou a resolução sem complicações.',
    diagnosticoFinal: 'Varicela (CID-11: CA23)',
    tratamentoRealizado: 'Antipiréticos (paracetamol), anti-histamínicos para prurido, isolamento domiciliar por 7 dias. Orientação para vacinação de irmãos.',
    evolucao: 'Resolução completa das lesões em 10 dias, sem sequelas. Imunidade natural adquirida.',
    licoesPrincipais: [
      'A varicela é altamente contagiosa; rastreie exposição e status vacinal em exantemas pediátricos [1,2].',
      'Vacinação com duas doses previne até 90% dos casos; recomendada no SUS a partir de 15 meses [5,7].',
      'Diagnóstico clínico baseado em lesões vesiculares em estágios variados; sorologia para confirmação em imunossuprimidos [3,9].',
      'Manejo sintomático em crianças saudáveis; aciclovir reservado para complicações ou alto risco [9,10].',
      'Isolamento e rastreamento de contatos são cruciais para controle epidemiológico [7,8].'
    ],
    errosComuns: [
      'Subestimar importância da vacinação, levando a surtos em creches [4,6].',
      'Confundir com outras exantemáticas sem considerar evolução vesicular [1].',
      'Não isolar o paciente, propagando a doença em famílias suscetíveis [3].',
      'Prescrever antibióticos desnecessariamente, sem suspeita de sobreinfecção [9].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais clínicos e epidemiológicos da varicela em crianças.',
    'Compreender o papel do rastreamento vacinal e prevenção primária.',
    'Aplicar recomendações do SUS e sociedades médicas para vacinação contra VZV.',
    'Gerenciar casos leves e orientar contatos para evitar complicações.'
  ],
  competencias: [
    'Diagnóstico de infecções virais pediátricas',
    'Aconselhamento em imunizações',
    'Manejo de exantemas infecciosos'
  ],
  doencasRelacionadas: ['varicela'],
  medicamentosRelacionados: ['J05AB01'], // Aciclovir
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-008', 'ref-009', 'ref-010'],
  tags: ['varicela', 'vacinação', 'pediatria', 'exantema', 'prevenção']
};