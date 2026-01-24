import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_OSTEOARTRITE_cro_001: CasoClinico = {
  id: 'caso-osteoartrite-001',
  titulo: 'Dor Crônica no Joelho em Mulher Idosa',
  subtitulo: 'Paciente de 60 anos com dor articular persistente e limitação funcional',
  categoria: 'cronico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Maria Silva',
      idade: 60,
      sexo: 'F',
      profissao: 'Aposentada (ex-auxiliar de serviços gerais)',
      estadoCivil: 'Casada'
    },
    queixaPrincipal: 'Dói muito o joelho esquerdo, doutor, e tá difícil andar.',
    historiaDoencaAtual: 'Paciente refere dor no joelho esquerdo há 6 meses, de início insidioso, piora com esforço e alívio com repouso. Apresenta rigidez matinal de 15-20 minutos, sem inchaço significativo. Nega febre, perda de peso ou trauma recente. Usa analgésicos esporádicos (paracetamol) com alívio parcial. Histórico de obesidade e trabalho manual por 30 anos.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente relata fatores de risco como obesidade e ocupação de alto impacto. O que deseja investigar?',
        dicas: ['Considere história familiar, hábitos e medicamentos atuais']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Fatores de risco como obesidade e trauma prévio', correta: true },
          { id: 'c', texto: 'Hábitos alimentares', correta: false },
          { id: 'd', texto: 'Vacinações em dia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Fatores de risco como obesidade (IMC >30) e trauma aumentam a suspeita de osteoartrite [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Identificar fatores de risco é essencial para o diagnóstico precoce.',
        incorreto: 'Priorize fatores de risco articulares para guiar o raciocínio diagnóstico.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa IMC elevado e alterações articulares. Achados principais:',
        dados: {
          'PA': '132/85 mmHg',
          'FC': '76 bpm',
          'FR': '14 irpm',
          'IMC': '32.5 kg/m²',
          'Joelho esquerdo': 'Crepitação, dor à palpação medial, amplitude de movimento reduzida (flexão 110°)',
          'Outras articulações': 'Sem alterações significativas'
        },
        dicas: ['Note o IMC e os sinais articulares clássicos de OA']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de osteoartrite?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 132/85 mmHg', correta: false },
          { id: 'b', texto: 'Crepitação e limitação de movimento no joelho', correta: true },
          { id: 'c', texto: 'IMC 32.5 kg/m²', correta: false },
          { id: 'd', texto: 'FC 76 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Crepitação, dor e rigidez são achados clínicos clássicos de osteoartrite [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames para confirmar e excluir diagnósticos diferenciais. Resultados:',
        dados: {
          'Hemograma': 'Normal',
          'Velocidade de hemossedimentação (VHS)': '18 mm/h',
          'Radiografia joelho esquerdo': 'Redução do espaço articular, osteófitos marginais (grau 2 Kellgren-Lawrence)',
          'Escala de dor (EVA)': '7/10',
          'Creatinina': '0.8 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Suspeita de artrite inflamatória', correta: false },
          { id: 'b', texto: 'Osteoartrite confirmada por radiografia', correta: true },
          { id: 'c', texto: 'Infecção articular', correta: false },
          { id: 'd', texto: 'Apenas dor musculoesquelética inespecífica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Radiografia com osteófitos e redução do espaço articular confirma OA, com VHS normal excluindo inflamação sistêmica [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese diagnóstica.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Osteoartrite de joelho', correta: true },
          { id: 'b', texto: 'Artrite reumatoide', correta: false },
          { id: 'c', texto: 'Gota aguda', correta: false },
          { id: 'd', texto: 'Lesão ligamentar', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Dor crônica, crepitação e radiografia compatível indicam osteoartrite em paciente com fatores de risco [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano de tratamento inicial, priorizando não farmacológico.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas repouso absoluto', correta: false },
          { id: 'b', texto: 'Exercícios de fortalecimento + perda de peso + paracetamol', correta: true },
          { id: 'c', texto: 'Corticoides intra-articulares imediatos', correta: false },
          { id: 'd', texto: 'Cirurgia de prótese', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Intervenções não farmacológicas são primeira linha para OA, com analgésicos como paracetamol para controle da dor [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Seguimento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses. Relata melhora na dor (EVA 4/10), perdeu 3 kg com orientação nutricional e exercícios.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter plano não farmacológico e reavaliar em 6 meses', correta: true },
          { id: 'b', texto: 'Iniciar AINEs potentes', correta: false },
          { id: 'c', texto: 'Encaminhar para ortopedista imediatamente', correta: false },
          { id: 'd', texto: 'Suspender todo tratamento', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora com intervenções iniciais justifica manutenção e monitoramento semestral [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 60 anos com osteoartrite de joelho confirmada, manejada com sucesso com medidas não farmacológicas e analgésicos.',
    diagnosticoFinal: 'Osteoartrite de joelho (CID-11: CA23)',
    tratamentoRealizado: 'Orientações para perda de peso, exercícios de baixo impacto, paracetamol 500mg 1-2x/dia conforme necessário.',
    evolucao: 'Melhora sintomática em 3 meses, com redução da dor e ganho funcional; paciente adere ao plano e mantém acompanhamento anual.',
    licoesPrincipais: [
      'Diagnóstico de OA é primariamente clínico, com radiografia para confirmação em casos duvidosos [1,2].',
      'Intervenções não farmacológicas (exercício, perda de peso) são fundamentais para melhorar qualidade de vida [1,2].',
      'Fatores de risco como obesidade e idade >50 anos guiam a avaliação em atenção primária [2].',
      'Monitoramento regular previne progressão e comorbidades associadas [1].',
      'Escalas como EVA e WOMAC auxiliam na avaliação funcional [1].'
    ],
    errosComuns: [
      'Solicitar exames desnecessários sem suspeita clínica, aumentando custos [2].',
      'Ignorar medidas não farmacológicas e iniciar AINEs precocemente, com riscos gastrointestinais [1].',
      'Confundir OA com artrite inflamatória sem avaliar VHS ou RF [1,2].',
      'Não considerar impacto psicossocial da dor crônica no paciente [1].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e fatores de risco da osteoartrite em atenção primária.',
    'Realizar exame físico direcionado para doenças articulares degenerativas.',
    'Interpretar radiografias simples no contexto de dor crônica.',
    'Aplicar diretrizes para manejo inicial não farmacológico da OA.'
  ],
  competencias: ['Anamnese em dor musculoesquelética', 'Exame físico articular', 'Interpretação de exames de imagem simples', 'Prescrição de tratamentos conservadores'],
  doencasRelacionadas: ['osteoartrite'],
  medicamentosRelacionados: ['N02BE01', 'M01AE01', 'M01AB05'],
  calculadorasRelacionadas: ['imc', 'eva-dor'],
  referencias: ['ref-001', 'ref-002', 'ref-003'],
  tags: ['dor articular', 'osteoartrite', 'joelho', 'idoso', 'obesidade']
};