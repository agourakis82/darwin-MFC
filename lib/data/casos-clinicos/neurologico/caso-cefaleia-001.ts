import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_CEFALEIA_neu_001: CasoClinico = {
  id: 'caso-cefaleia-tensional-001',
  titulo: 'Cefaleia Tensional em Mulher Adulta Estressada',
  subtitulo: 'Paciente com dor de cabeça bilateral recorrente associada a estresse laboral',
  categoria: 'neurologico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Ana Silva',
      idade: 35,
      sexo: 'F',
      profissao: 'Funcionária de escritório',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Tenho uma dor de cabeça que parece uma faixa apertando ao redor da cabeça, piora no final do dia',
    historiaDoencaAtual: 'Paciente relata episódios de cefaleia bilateral de intensidade leve a moderada há 6 meses, ocorrendo 2-3 vezes por semana, durando 4-6 horas. A dor é descrita como pressão ou aperto, sem náuseas, fotofobia ou piora com atividade física. Associada a estresse no trabalho e tensão muscular nos ombros. Nega trauma craniano recente, perda de peso, febre ou déficits neurológicos. Usa paracetamol ocasionalmente com alívio parcial.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona estresse laboral intenso e postura inadequada no trabalho. O que mais deseja investigar?',
        dicas: ['Fatores desencadeantes, hábitos de sono, uso de medicamentos e exclusão de bandeiras vermelhas']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento para caracterizar a cefaleia?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de cefaleia', correta: false },
          { id: 'b', texto: 'Características da dor (localização, intensidade, duração)', correta: true },
          { id: 'c', texto: 'Atividade física regular', correta: false },
          { id: 'd', texto: 'Viagens recentes', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'As características da dor bilateral de pressão sem sintomas associados sugerem cefaleia primária, conforme critérios ICHD-3 [1].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! As características da dor são essenciais para o diagnóstico diferencial.',
        incorreto: 'Priorize as características da cefaleia para excluir causas secundárias.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa tensão muscular em pescoço e ombros, sem déficits neurológicos. Sinais vitais normais.',
        dados: {
          'PA': '120/80 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'IMC': '24.5 kg/m²',
          'Exame neurológico': 'Normal, sem rigidez de nuca ou sinais meníngeos'
        },
        dicas: ['Ausência de bandeiras vermelhas neurológicas reforça hipótese de cefaleia primária']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS relevante no exame físico?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada', correta: false },
          { id: 'b', texto: 'Tensão muscular em pescoço e ombros', correta: true },
          { id: 'c', texto: 'IMC alterado', correta: false },
          { id: 'd', texto: 'FC taquicárdica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tensão muscular pericraniana é um critério diagnóstico para cefaleia tensional [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Dado ausência de bandeiras vermelhas, você opta por não solicitar exames iniciais, mas para fins educacionais, resultados básicos são normais.',
        dados: {
          'Hemoglobina': '13.2 g/dL',
          'Glicemia de jejum': '92 mg/dL',
          'TSH': '2.5 mUI/L',
          'Exame de imagem (TC crânio, se solicitado)': 'Normal'
        }
      },
      pergunta: {
        enunciado: 'Qual a interpretação MAIS apropriada quanto a exames?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Necessário TC de crânio urgente', correta: false },
          { id: 'b', texto: 'Exames normais, sem necessidade de imagem', correta: true },
          { id: 'c', texto: 'Suspeita de anemia como causa', correta: false },
          { id: 'd', texto: 'Alteração tireoidiana evidente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em cefaleia tensional sem bandeiras vermelhas, exames complementares não são rotineiramente indicados [1,7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese e exame, formule sua hipótese diagnóstica principal.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Cefaleia tensional episódica', correta: true },
          { id: 'b', texto: 'Enxaqueca sem aura', correta: false },
          { id: 'c', texto: 'Cefaleia secundária a sinusite', correta: false },
          { id: 'd', texto: 'Hipertensão intracraniana', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Dor bilateral de pressão, duração <72h, sem náusea ou fotofobia, atende critérios ICHD-3 para cefaleia tensional [1,8].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano de tratamento inicial, priorizando abordagens não farmacológicas.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas analgésicos opioides', correta: false },
          { id: 'b', texto: 'Terapias não farmacológicas + analgésicos simples (paracetamol ou ibuprofeno)', correta: true },
          { id: 'c', texto: 'Profilaxia com betabloqueadores imediatamente', correta: false },
          { id: 'd', texto: 'Encaminhamento urgente a neurologia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tratamento escalonado inicia com medidas não farmacológicas e analgésicos simples para cefaleia tensional episódica [1,7,8].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 1 mês. Relata redução para 1 episódio/semana com relaxamento e paracetamol. Sem novos sintomas.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento atual e retornar em 3 meses', correta: true },
          { id: 'b', texto: 'Intensificar com amitriptilina', correta: false },
          { id: 'c', texto: 'Suspender todo tratamento', correta: false },
          { id: 'd', texto: 'Solicitar RM de crânio', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora com tratamento inicial justifica manutenção e seguimento em atenção primária [6,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 35 anos com cefaleia tensional episódica associada a estresse, diagnosticada clinicamente e tratada com sucesso com medidas não farmacológicas e analgésicos simples.',
    diagnosticoFinal: 'Cefaleia tensional episódica (ICHD-3) [1]',
    tratamentoRealizado: 'Orientações para relaxamento muscular, correção postural, paracetamol 500mg sob demanda e seguimento em atenção primária.',
    evolucao: 'Paciente evoluiu com redução na frequência de episódios e melhora na qualidade de vida após 3 meses.',
    licoesPrincipais: [
      'Cefaleia tensional é diagnosticada por critérios clínicos, sem necessidade de exames em ausência de bandeiras vermelhas [1].',
      'Fatores desencadeantes como estresse e tensão muscular devem ser abordados no manejo inicial [2,7].',
      'Tratamento não farmacológico é primeira linha, com analgésicos simples para alívio sintomático [8].',
      'Atenção primária é o local ideal para manejo de cefaleias primárias recorrentes [6].',
      'Monitoramento contínuo previne cronificação da cefaleia tensional [3].'
    ],
    errosComuns: [
      'Solicitar exames de imagem desnecessariamente, aumentando custos e ansiedade [1].',
      'Confundir com enxaqueca devido a sintomas sobrepostos, ignorando ausência de fotofobia [8].',
      'Iniciar profilaxia precoce sem tentativa de medidas não farmacológicas [7].',
      'Subestimar impacto psicossocial, como estresse laboral, no desencadeamento [2].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer os critérios diagnósticos da cefaleia tensional conforme ICHD-3 [1].',
    'Identificar bandeiras vermelhas para exclusão de cefaleias secundárias.',
    'Aplicar tratamento escalonado inicial em atenção primária para cefaleias primárias [7,8].',
    'Compreender o papel do estresse e hábitos na prevenção de cefaleia tensional [2].'
  ],
  competencias: [
    'Anamnese detalhada em neurologia',
    'Exame físico neurológico básico',
    'Raciocínio diagnóstico diferencial',
    'Manejo conservador em atenção primária'
  ],
  doencasRelacionadas: ['cefaleia-tensional'],
  medicamentosRelacionados: [],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-008'],
  tags: ['cefaleia', 'dor de cabeça', 'estresse', 'atenção primária', 'neurologia']
};