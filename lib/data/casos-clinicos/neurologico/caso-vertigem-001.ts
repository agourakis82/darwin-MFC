import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_VERTIGEM_neu_001: CasoClinico = {
  id: 'caso-vertigem-001',
  titulo: 'Vertigem Posicional em Mulher Adulta',
  subtitulo: 'Paciente com episódios de vertigem ao mudar de posição, suspeita de VPPB',
  categoria: 'neurologico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Maria Oliveira',
      idade: 58,
      sexo: 'F',
      profissao: 'Dona de casa',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'O mundo gira quando eu me viro na cama ou me inclino para frente.',
    historiaDoencaAtual: 'Paciente refere episódios de vertigem rotatória de início há 2 semanas, durando segundos a minutos, desencadeados por mudanças posicionais como virar na cama ou olhar para cima. Associado a náuseas leves, sem vômitos, zumbido ou perda auditiva. Nega cefaleia intensa, fraqueza ou sintomas neurológicos focais. Histórico de hipertensão controlada há 5 anos.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente descreve os episódios como breves e relacionados a movimentos da cabeça.',
        dicas: ['Investigue duração, desencadeadores, sintomas associados e fatores de risco como trauma recente ou idade avançada.']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para diferenciar vertigem periférica de central?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de enxaqueca', correta: false },
          { id: 'b', texto: 'Duração dos episódios e desencadeadores posicionais', correta: true },
          { id: 'c', texto: 'Dieta recente', correta: false },
          { id: 'd', texto: 'Nível de estresse', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Episódios breves e posicionais sugerem causa periférica como VPPB, enquanto sintomas centrais são mais prolongados [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Foco em características posicionais é essencial para o diagnóstico inicial.',
        incorreto: 'Priorize os aspectos temporais e desencadeadores para guiar o raciocínio.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'No exame neurológico, a paciente está orientada, sem déficits motores ou sensitivos. Você realiza o teste de Dix-Hallpike.',
        dados: {
          'PA': '135/85 mmHg',
          'FC': '76 bpm',
          'Teste de Dix-Hallpike': 'Positivo no lado direito: nistagmo rotatório e vertigem após latência de 2-5 segundos',
          'Romberg': 'Negativo',
          'Marcha': 'Normal'
        },
        dicas: ['O teste de Dix-Hallpike é chave para VPPB; observe nistagmo e latência.']
      },
      pergunta: {
        enunciado: 'Qual achado confirma suspeita de VPPB?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada', correta: false },
          { id: 'b', texto: 'Teste de Dix-Hallpike positivo com nistagmo', correta: true },
          { id: 'c', texto: 'Romberg positivo', correta: false },
          { id: 'd', texto: 'FC taquicárdica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Nistagmo geotrópico com latência e fatigabilidade no Dix-Hallpike é diagnóstico de VPPB [1,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para descartar causas centrais. Resultados iniciais:',
        dados: {
          'Audiometria': 'Normal bilateral',
          'Hemograma': 'Normal',
          'Glicemia': '98 mg/dL',
          'TSH': '2.5 mUI/L'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar estes resultados no contexto da vertigem?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Suspeita de hipotiroidismo', correta: false },
          { id: 'b', texto: 'Exames normais, compatível com VPPB periférica', correta: true },
          { id: 'c', texto: 'Necessita RM imediata', correta: false },
          { id: 'd', texto: 'Indica labirintite', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exames normais reforçam diagnóstico clínico de VPPB, sem necessidade de imagem em casos típicos [1,8].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integrando anamnese, exame físico e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Vertigem posicional paroxística benigna (VPPB)', correta: true },
          { id: 'b', texto: 'Enxaqueca vestibular', correta: false },
          { id: 'c', texto: 'Neurite vestibular', correta: false },
          { id: 'd', texto: 'Acidente vascular cerebral', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'História posicional, teste positivo e exames normais apontam para VPPB, causa mais comum de vertigem [1,3,11].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Com diagnóstico de VPPB, planeje a intervenção inicial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Repouso absoluto e analgésicos', correta: false },
          { id: 'b', texto: 'Manobra de reposicionamento de Epley', correta: true },
          { id: 'c', texto: 'Antibióticos para infecção', correta: false },
          { id: 'd', texto: 'Encaminhamento imediato para neurologia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A manobra de Epley é o tratamento de primeira linha para VPPB, com eficácia comprovada em >80% dos casos [1,6,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'A paciente retorna em 1 semana após manobra de Epley. Refere resolução completa dos sintomas.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alta com orientações e retorno em 3 meses se recorrência', correta: true },
          { id: 'b', texto: 'Repetir manobra imediatamente', correta: false },
          { id: 'c', texto: 'Solicitar RM craniana', correta: false },
          { id: 'd', texto: 'Iniciar betahistina crônica', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Resolução pós-manobra permite alta, com seguimento para recorrências comuns em idosos [6,8].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 58 anos com vertigem posicional diagnosticada como VPPB, tratada com manobra de Epley com resolução.',
    diagnosticoFinal: 'Vertigem posicional paroxística benigna (VPPB) - canal posterior direito',
    tratamentoRealizado: 'Manobra de reposicionamento de Epley realizada no consultório, orientações para evitar movimentos bruscos e uso de meclizina se náuseas residuais.',
    evolucao: 'Sintomas resolvidos em 1 semana, sem recorrências em 3 meses de seguimento. Manutenção de PA controlada.',
    licoesPrincipais: [
      'VPPB é a causa mais comum de vertigem posicional, diagnosticada clinicamente pelo teste de Dix-Hallpike [1,6].',
      'A manobra de Epley é tratamento eficaz e não invasivo, recomendada como primeira linha [6,10].',
      'Diferencie vertigem periférica (breve, posicional) de central (prolongada, com déficits neurológicos) para evitar investigações desnecessárias [2,9].',
      'Em idosos, avalie risco de quedas associado à vertigem e oriente prevenção [14,15].',
      'Exames complementares são reservados para casos atípicos ou suspeita central [8].'
    ],
    errosComuns: [
      'Solicitar RM craniana rotineiramente em VPPB típica, aumentando custos sem benefício [1].',
      'Confundir VPPB com labirintite, levando a tratamento inadequado como repouso prolongado [2].',
      'Ignorar teste de Dix-Hallpike, atrasando diagnóstico e aumentando ansiedade do paciente [6].',
      'Prescrever supressores vestibulares crônicos sem tentativa de manobra, mascarando o quadro [9].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar características clínicas da vertigem posicional paroxística benigna (VPPB).',
    'Realizar e interpretar o teste de Dix-Hallpike no exame físico.',
    'Aplicar manobra de Epley como tratamento inicial para VPPB.',
    'Diferenciar causas periféricas de centrais de vertigem no atendimento primário.'
  ],
  competencias: [
    'História clínica detalhada em neurologia',
    'Exame físico neurológico básico',
    'Raciocínio diagnóstico em sintomas comuns',
    'Planejamento terapêutico baseado em evidências'
  ],
  doencasRelacionadas: ['vertigem'],
  medicamentosRelacionados: [],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-006', 'ref-008', 'ref-009', 'ref-010', 'ref-011'],
  tags: ['vertigem', 'vppb', 'dix-hallpike', 'epley', 'neurologia', 'primaria']
};