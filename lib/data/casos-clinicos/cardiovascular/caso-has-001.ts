import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_HAS_car_001: CasoClinico = {
  id: 'caso-crise-hipertensiva-001',
  titulo: 'Crise Hipertensiva em Paciente com Histórico de Hipertensão',
  subtitulo: 'Paciente de meia-idade apresenta-se com cefaleia intensa e elevação pressórica grave',
  categoria: 'cardiovascular',
  dificuldade: 'intermediario',
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
    queixaPrincipal: 'Dor de cabeça forte e tontura há 2 dias',
    historiaDoencaAtual: 'Paciente relata cefaleia holocraniana intensa, associada a náuseas e visão embaçada. Refere diagnóstico de hipertensão arterial há 5 anos, com uso irregular de enalapril 20 mg/dia. Nega episódios semelhantes prévios, mas menciona fadiga recente e episódios de palpitações. Sem febre ou sintomas respiratórios agudos.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente confirma hipertensão diagnosticada, mas admite adesão irregular ao tratamento. O que mais deseja investigar?',
        dicas: ['Considere adesão medicamentosa, fatores desencadeantes e sintomas de dano orgânico']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de diabetes', correta: false },
          { id: 'b', texto: 'Adesão ao tratamento anti-hipertensivo', correta: true },
          { id: 'c', texto: 'Atividade física recente', correta: false },
          { id: 'd',  texto: 'Viagens internacionais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A adesão irregular é comum em crises hipertensivas e pode precipitar o quadro [3,6].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A adesão medicamentosa é crucial para avaliar o risco de crise.',
        incorreto: 'Priorize a avaliação da adesão, pois falhas no tratamento contribuem para elevações pressóricas graves.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa paciente ansioso, com PA 210/120 mmHg (ambos os braços), FC 110 bpm, FR 20 irpm. Sem edema pulmonar, mas funduscope revela hemorragias retinianas. IMC 28,5 kg/m².',
        dados: {
          'PA': '210/120 mmHg',
          'FC': '110 bpm',
          'FR': '20 irpm',
          'IMC': '28.5 kg/m²',
          'Fundoscopia': 'Hemorragias retinianas'
        },
        dicas: ['A PA >180/120 com sinais de dano orgânico sugere emergência hipertensiva']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'IMC 28,5 kg/m²', correta: false },
          { id: 'b', texto: 'PA 210/120 mmHg com hemorragias retinianas', correta: true },
          { id: 'c', texto: 'FC 110 bpm', correta: false },
          { id: 'd', texto: 'FR 20 irpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Sinais de dano orgânico endotelial, como alterações fundoscópicas, indicam crise hipertensiva de emergência [3,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames urgentes. Resultados iniciais: Creatinina 1,8 mg/dL (TFGe 55 mL/min), ECG com hipertrofia VE, troponina I 0,05 ng/mL (normal), hemograma sem alterações graves.',
        dados: {
          'Creatinina': '1.8 mg/dL',
          'TFGe': '55 mL/min/1.73m²',
          'ECG': 'Hipertrofia ventricular esquerda',
          'Troponina I': '0.05 ng/mL (normal)',
          'Hemograma': 'Sem alterações significativas'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Dano renal agudo isolado', correta: false },
          { id: 'b', texto: 'Lesão de órgão-alvo com disfunção renal e cardíaca crônica', correta: true },
          { id: 'c', texto: 'Infarto agudo do miocárdio', correta: false },
          { id: 'd', texto: 'Apenas hipertrofia fisiológica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Elevação de creatinina e hipertrofia VE indicam dano de órgão-alvo em crise hipertensiva [3,5,6].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames, formule sua hipótese diagnóstica principal.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Crise hipertensiva de urgência', correta: false },
          { id: 'b', texto: 'Crise hipertensiva de emergência com encefalopatia e dano renal', correta: true },
          { id: 'c', texto: 'Hipertensão essencial sem complicações', correta: false },
          { id: 'd', texto: 'Pheocromocitoma', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'PA >180/120 mmHg com evidência de dano agudo de órgão-alvo define emergência hipertensiva [3,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'O paciente é internado para monitorização. Defina o plano inicial de tratamento.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Redução oral gradual da PA com IECA', correta: false },
          { id: 'b', texto: 'Nitroprussiato de sódio IV com meta de redução de 25% em 24h', correta: true },
          { id: 'c', texto: 'Apenas repouso e observação', correta: false },
          { id: 'd', texto: 'Beta-bloqueador IV imediato sem monitorização', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Em emergência hipertensiva, redução controlada IV é essencial para evitar isquemia [3,6].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após 48h de tratamento IV, PA estabiliza em 160/100 mmHg. Paciente assintomático, creatinina 1,2 mg/dL. Iniciado tratamento oral com losartana 50 mg + hidroclorotiazida 25 mg.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta no seguimento ambulatorial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alta com retorno em 1 semana e educação sobre adesão', correta: true },
          { id: 'b', texto: 'Manter internação por mais 7 dias', correta: false },
          { id: 'c', texto: 'Suspender anti-hipertensivos', correta: false },
          { id: 'd', texto: 'Encaminhar imediatamente para cardiologia terciária', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Com estabilização, alta com seguimento próximo e reforço na adesão previne recidivas [6,10].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 58 anos com crise hipertensiva de emergência devido a adesão irregular, tratado com redução pressórica IV e otimizado com terapia oral, evoluindo favoravelmente.',
    diagnosticoFinal: 'Crise hipertensiva de emergência com encefalopatia hipertensiva e lesão renal aguda',
    tratamentoRealizado: 'Nitroprussiato IV inicial, seguido de losartana + hidroclorotiazida oral; educação sobre estilo de vida e adesão',
    evolucao: 'Melhora clínica em 48h, alta hospitalar com PA controlada e retorno ambulatorial programado',
    licoesPrincipais: [
      'Crise hipertensiva de emergência requer redução pressórica controlada para evitar dano isquêmico [3,6].',
      'Adesão irregular é fator precipitante comum; educação é essencial na atenção primária [6,10].',
      'Sinais de dano de órgão-alvo, como alterações fundoscópicas e elevação de creatinina, guiam a classificação [5,6].',
      'Rastreamento anual de PA em adultos de risco previne complicações [5,10].',
      'Terapia combinada oral é recomendada para controle sustentado [6].'
    ],
    errosComuns: [
      'Confundir urgência com emergência, atrasando tratamento IV em casos com dano orgânico [3].',
      'Redução abrupta da PA, levando a hipotensão e isquemia cerebral [6].',
      'Ignorar adesão e fatores de risco, resultando em recidivas frequentes [10].',
      'Não investigar causas secundárias em crises recorrentes [5].'
    ]
  },

  objetivosAprendizagem: [
    'Identificar sinais de crise hipertensiva de emergência versus urgência.',
    'Aplicar manejo inicial farmacológico em cenários de elevação pressórica grave.',
    'Avaliar dano de órgão-alvo através de exame físico e laboratoriais.',
    'Promover adesão terapêutica e prevenção de complicações cardiovasculares.'
  ],
  competencias: [
    'Avaliação e manejo de urgências cardiovasculares',
    'Raciocínio clínico em hipertensão arterial',
    'Prescrição de anti-hipertensivos conforme diretrizes'
  ],
  doencasRelacionadas: ['hipertensao-arterial'],
  medicamentosRelacionados: ['C09', 'C03', 'C02'],
  calculadorasRelacionadas: ['calculadora-pa', 'calculadora-tfge'],
  referencias: ['ref-003', 'ref-005', 'ref-006', 'ref-010'],
  tags: ['crise hipertensiva', 'emergência', 'hipertensão', 'dano orgânico', 'adesão terapêutica']
};