import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_PNM_res_001: CasoClinico = {
  id: 'caso-pneumonia-comunitaria-001',
  titulo: 'Pneumonia Adquirida na Comunidade em Adulto',
  subtitulo: 'Paciente de 55 anos apresenta febre, tosse produtiva e dispneia há 3 dias',
  categoria: 'respiratorio',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Motorista',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Estou com febre alta, tosse com catarro e falta de ar há três dias',
    historiaDoencaAtual: 'Paciente relata início abrupto de febre de até 39°C, tosse produtiva com expectoração amarelada, dispneia aos esforços moderados e mialgias generalizadas. Nega comorbidades conhecidas, mas fuma 20 cigarros/dia há 30 anos. Sem viagens recentes ou contato com doentes. Sintomas pioraram nos últimos dois dias, com piora da dispneia.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona tabagismo crônico e ausência de vacinação recente contra influenza ou pneumococo.',
        dicas: ['Considere fatores de risco como tabagismo e comorbidades para estratificação de gravidade']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante para estratificar o risco neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de asma', correta: false },
          { id: 'b', texto: 'Tabagismo e comorbidades', correta: true },
          { id: 'c', texto: 'Dieta alimentar', correta: false },
          { id: 'd', texto: 'Atividade física recente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Fatores como tabagismo aumentam o risco de PAC grave e guiam a decisão terapêutica [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! O tabagismo é um fator de risco chave para complicações.',
        incorreto: 'Priorize fatores de risco respiratórios para melhor avaliação.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa febre, taquipneia e crepitações pulmonares.',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '100 bpm',
          'FR': '24 irpm',
          'SatO2': '92% em ar ambiente',
          'Temperatura': '38.5°C'
        },
        dicas: ['Note a taquipneia e hipoxemia como sinais de gravidade moderada']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante no exame físico?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pressão arterial normal', correta: false },
          { id: 'b', texto: 'Frequência respiratória de 24 irpm e SatO2 92%', correta: true },
          { id: 'c', texto: 'Frequência cardíaca de 100 bpm', correta: false },
          { id: 'd', texto: 'Febre de 38.5°C', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Taquipneia (FR > 22) e hipoxemia sugerem necessidade de oxigenoterapia e avaliação de gravidade [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram leucocitose e infiltrado pulmonar.',
        dados: {
          'Hemograma': 'Leucócitos 14.000/mm³ (neutrófilos 80%)',
          'Gasometria arterial': 'pH 7.42, pO2 70 mmHg, pCO2 35 mmHg',
          'Radiografia de tórax': 'Infiltrado consolidado em lobo inferior direito',
          'Creatinina': '0.9 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados laboratoriais e de imagem?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção viral isolada', correta: false },
          { id: 'b', texto: 'Infecção bacteriana pulmonar com hipoxemia', correta: true },
          { id: 'c', texto: 'Insuficiência renal aguda', correta: false },
          { id: 'd', texto: 'Apenas achados normais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Leucocitose neutrofílica e infiltrado na RX confirmam infecção pulmonar aguda, compatível com PAC [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame e exames, você calcula o escore CURB-65: Idade >50 (1), Taquipneia (1), total 2 pontos (risco moderado).'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável e estratificação de risco?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Pneumonia hospitalar grave', correta: false },
          { id: 'b', texto: 'Pneumonia adquirida na comunidade de risco moderado (CURB-65=2)', correta: true },
          { id: 'c', texto: 'Asma agudizada', correta: false },
          { id: 'd', texto: 'Edema pulmonar cardíaco', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sintomas, exame e imagem confirmam PAC; CURB-65=2 indica tratamento ambulatorial ou internação curta [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'O paciente é candidato a tratamento ambulatorial com antibióticos empíricos.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas suporte sintomático sem antibióticos', correta: false },
          { id: 'b', texto: 'Amoxicilina 500mg 8/8h por 7 dias + oxigênio se necessário', correta: true },
          { id: 'c', texto: 'Ceftriaxona IV em hospital', correta: false },
          { id: 'd', texto: 'Antivirais como oseltamivir', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Para PAC leve-moderada em imunocompetente, beta-lactâmico empírico como amoxicilina é primeira linha [1,2,3,4].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 48 horas. Sintomas melhoraram: febre resolvida, SatO2 96%, sem dispneia.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter antibióticos por 5-7 dias totais e retorno em 1 semana', correta: true },
          { id: 'b', texto: 'Suspender tratamento imediatamente', correta: false },
          { id: 'c', texto: 'Internar para investigação adicional', correta: false },
          { id: 'd', texto: 'Mudar para antibiótico de amplo espectro', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Melhora clínica em 48h confirma resposta; completar curso antibiótico e monitorar [1,2].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 55 anos com PAC moderada tratada ambulatorialmente com amoxicilina, evoluindo com resolução completa dos sintomas em 7 dias.',
    diagnosticoFinal: 'Pneumonia Adquirida na Comunidade (CID-11: CA23)',
    tratamentoRealizado: 'Amoxicilina 500mg 8/8h por 7 dias, repouso, hidratação e analgesia; orientação antitabagista.',
    evolucao: 'Alta ambulatorial após 48h de melhora; retorno em 1 semana sem complicações.',
    licoesPrincipais: [
      'Sintomas clássicos de PAC incluem febre, tosse produtiva e dispneia; suspeitar em adultos com infecção respiratória aguda [1,2].',
      'Usar CURB-65 para estratificar gravidade: escore ≤1 ambulatorial, 2 internação possível [1,2].',
      'Tratamento empírico com amoxicilina para casos leves em imunocompetentes no contexto brasileiro [2,3,4].',
      'Radiografia de tórax confirma diagnóstico em casos suspeitos, especialmente com fatores de risco [1,2].',
      'Aconselhamento antitabagista e vacinação são preventivos essenciais [3,4].'
    ],
    errosComuns: [
      'Subestimar gravidade sem escore de risco, levando a atraso em internação [1,2].',
      'Iniciar antibióticos de amplo espectro desnecessariamente em casos leves [2,4].',
      'Ignorar tabagismo como fator agravante, sem orientação de cessação [3].',
      'Não solicitar imagem em pacientes com dispneia persistente [1].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e sinais de pneumonia adquirida na comunidade em adultos.',
    'Aplicar escore CURB-65 para estratificação de risco e decisão de manejo.',
    'Selecionar tratamento empírico apropriado conforme diretrizes brasileiras e internacionais.',
    'Entender o papel da radiografia de tórax no diagnóstico de PAC.'
  ],
  competencias: [
    'Avaliação clínica de síndromes respiratórias agudas',
    'Prescrição racional de antimicrobianos',
    'Estratificação de risco em infecções comunitárias',
    'Orientação preventiva em atenção primária'
  ],
  doencasRelacionadas: ['pneumonia-comunitaria'],
  medicamentosRelacionados: ['J01CA04', 'J01FA10'],
  calculadorasRelacionadas: ['curb-65'],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004'],
  tags: ['infecção respiratória', 'antibióticos empíricos', 'tabagismo', 'atenção primária']
};