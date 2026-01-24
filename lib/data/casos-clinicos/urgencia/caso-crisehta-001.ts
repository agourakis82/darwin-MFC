import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_CRISEHTA_urg_001: CasoClinico = {
  id: 'caso-emergencia-hipertensiva-001',
  titulo: 'Emergência Hipertensiva com Encefalopatia',
  subtitulo: 'Paciente com hipertensão grave e sintomas neurológicos agudos',
  categoria: 'urgencia',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'José Silva',
      idade: 58,
      sexo: 'M',
      profissao: 'Pedreiro',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Dor de cabeça intensa e visão embaçada há 2 horas',
    historiaDoencaAtual: 'Paciente relata cefaleia súbita e progressiva, associada a náuseas e confusão mental leve. Nega trauma recente. História de hipertensão arterial não controlada, com adesão irregular ao tratamento. Sem episódios prévios semelhantes. Início agudo, sem febre ou sintomas respiratórios.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona uso irregular de enalapril e tabagismo. O que deseja investigar?',
        dicas: ['Fatores de risco cardiovascular, adesão medicamentosa e sintomas de dano orgânico']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS relevante para guiar a conduta inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Adesão ao tratamento anti-hipertensivo', correta: true },
          { id: 'c', texto: 'Dieta alimentar habitual', correta: false },
          { id: 'd', texto: 'Atividade física semanal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A adesão irregular pode precipitar emergências hipertensivas [3,6].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A adesão medicamentosa é crucial em hipertensos.',
        incorreto: 'Priorize a avaliação de adesão e fatores precipitantes.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa paciente agitado, com PA 220/120 mmHg, FC 110 bpm, FR 20 irpm, SatO2 95%. Fundoscopia revela hemorragias retinianas. IMC 28,5 kg/m².',
        dados: {
          'PA': '220/120 mmHg',
          'FC': '110 bpm',
          'FR': '20 irpm',
          'SatO2': '95%',
          'IMC': '28.5 kg/m²'
        },
        dicas: ['PA grave com sinais de encefalopatia e retinopatia hipertensiva']
      },
      pergunta: {
        enunciado: 'Qual achado físico é MAIS indicativo de dano orgânico agudo?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC 28,5 kg/m²', correta: false },
          { id: 'b', texto: 'Hemorragias na fundoscopia', correta: true },
          { id: 'c', texto: 'FC 110 bpm', correta: false },
          { id: 'd', texto: 'Agitação leve', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Alterações fundoscópicas sugerem encefalopatia hipertensiva [3,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames urgentes. Resultados: Creatinina 1,8 mg/dL, TFGe 45 mL/min/1,73m², Troponina I 0,5 ng/mL, ECG com hipertrofia VE, TC crânio sem sangramento.',
        dados: {
          'Creatinina': '1.8 mg/dL',
          'TFGe': '45 mL/min/1.73m²',
          'Troponina I': '0.5 ng/mL',
          'ECG': 'Hipertrofia ventricular esquerda',
          'TC Crânio': 'Sem sangramento agudo'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar esses resultados no contexto da hipertensão?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Dano renal isolado sem urgência', correta: false },
          { id: 'b', texto: 'Lesão miocárdica e insuficiência renal aguda', correta: true },
          { id: 'c', texto: 'Infarto agudo do miocárdio', correta: false },
          { id: 'd', texto: 'Hemorragia intracraniana', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Elevação de troponina e creatinina indicam dano orgânico em emergência hipertensiva [3,5].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Integre os achados para formular o diagnóstico. PA sustentada >180/120 mmHg com encefalopatia e dano orgânico.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Urgência hipertensiva sem dano orgânico', correta: false },
          { id: 'b', texto: 'Emergência hipertensiva com encefalopatia', correta: true },
          { id: 'c', texto: 'Crise hipertensiva por feocromocitoma', correta: false },
          { id: 'd', texto: 'Hipertensão branca', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'PA grave com sintomas neurológicos e evidência de dano orgânico define emergência hipertensiva [3,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Inicie redução controlada da PA. Monitore em UTI.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica INICIAL MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Nifedipino sublingual imediato', correta: false },
          { id: 'b', texto: 'Nitroprussiato IV com meta de redução 25% em 1h', correta: true },
          { id: 'c', texto: 'Enalapril oral', correta: false },
          { id: 'd', texto: 'Hidralazina IM', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Redução gradual com vasodilatadores IV em ambiente monitorado [3,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após 24h, PA 160/100 mmHg, sintomas resolvidos, creatinina 1,2 mg/dL. Alta para seguimento ambulatorial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter terapia IV e monitorar', correta: false },
          { id: 'b', texto: 'Transição para oral e retorno em 1 semana', correta: true },
          { id: 'c', texto: 'Alta sem medicação', correta: false },
          { id: 'd', texto: 'Encaminhamento imediato para nefrologia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Estabilização permite transição para terapia oral com seguimento próximo [3,6].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente com emergência hipertensiva por adesão irregular, tratado com redução PA IV, evoluindo favoravelmente.',
    diagnosticoFinal: 'Emergência hipertensiva com encefalopatia e dano renal agudo',
    tratamentoRealizado: 'Nitroprussiato IV inicial, transição para losartana + hidroclorotiazida oral, educação sobre adesão',
    evolucao: 'Melhora clínica em 48h, alta em 72h com PA controlada e seguimento em APS',
    licoesPrincipais: [
      'Emergência hipertensiva requer redução PA gradual para evitar isquemia [3]',
      'Avaliar dano orgânico com exames laboratoriais e imagem urgente [6]',
      'Adesão medicamentosa é chave na prevenção de complicações [5]',
      'Monitoramento em UTI para casos com encefalopatia [3]',
      'Educação do paciente sobre sinais de alarme é essencial [10]'
    ],
    errosComuns: [
      'Redução abrupta da PA, levando a hipotensão e isquemia',
      'Subestimar sintomas neurológicos como cefaleia isolada',
      'Não investigar causas secundárias em crises recorrentes',
      'Falta de transição adequada para terapia oral'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais de emergência hipertensiva e diferenciar de urgência',
    'Interpretar exames para dano orgânico em hipertensão grave',
    'Aplicar diretrizes para tratamento inicial com redução controlada da PA',
    'Planejar seguimento para prevenção de recidivas'
  ],
  competencias: [
    'Avaliação e manejo de urgências cardiovasculares',
    'Raciocínio diagnóstico em cenários de alta pressão arterial',
    'Prescrição de terapia anti-hipertensiva em contexto agudo'
  ],
  doencasRelacionadas: ['hipertensao-arterial'],
  medicamentosRelacionados: ['C09', 'C03', 'C02'],
  calculadorasRelacionadas: ['risco-cardiovascular', 'tfge'],
  referencias: ['ref-003', 'ref-005', 'ref-006', 'ref-010'],
  tags: ['hipertensão', 'emergência', 'encefalopatia', 'dano orgânico', 'atenção primária']
};