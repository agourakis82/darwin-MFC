import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_CONVULSAO_urg_001: CasoClinico = {
  id: 'caso-epilepsia-001',
  titulo: 'Estado de Mal Epiléptico em Adulto com História de Epilepsia',
  subtitulo: 'Paciente de 55 anos apresenta crises convulsivas prolongadas em contexto de não adesão medicamentosa',
  categoria: 'urgencia',
  dificuldade: 'avancado',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Motorista',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Paciente trazido pela família: "Ele está convulsionando há mais de 20 minutos e não para"',
    historiaDoencaAtual: 'Paciente conhecido com diagnóstico de epilepsia focal há 10 anos, em tratamento com carbamazepina 400 mg/dia, mas refere não adesão recente devido a esquecimento e custo. Início súbito de crises tônico-clônicas generalizadas há 25 minutos, sem aura relatada, em domicílio. Sem trauma associado, sem febre ou infecção aparente. Histórico de crises prévias controladas, mas última crise há 6 meses. Nega uso de álcool ou drogas ilícitas recentes. Comorbidades: hipertensão arterial controlada com losartana.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Inicial',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você inicia a anamnese com a família presente. O paciente está pós-ictal, confuso. O que deseja investigar prioritariamente?',
        dicas: ['Foco em duração da crise, medicamentos em uso, triggers e comorbidades']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS crítica para guiar o manejo inicial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de epilepsia', correta: false },
          { id: 'b', texto: 'Adesão à medicação antiepiléptica', correta: true },
          { id: 'c', texto: 'Dieta habitual', correta: false },
          { id: 'd', texto: 'Atividades recreativas', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Não adesão medicamentosa é fator precipitante comum para estado de mal epiléptico [1,7].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A adesão é essencial para prevenir recorrências.',
        incorreto: 'Priorize fatores que possam explicar o desencadeamento da crise prolongada.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico e Avaliação Inicial',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Paciente em crise convulsiva contínua. Você protege vias aéreas e avalia vitais. Achados:',
        dados: {
          'PA': '160/100 mmHg',
          'FC': '120 bpm',
          'FR': '24 irpm',
          'SatO2': '92% (ar ambiente)',
          'Temperatura': '37.5°C',
          'Escala de Glasgow': '8/15 (pós-ictal)',
          'Exame neurológico': 'Rigidez muscular generalizada, sem sinais meníngeos'
        },
        dicas: ['Priorize ABC: vias aéreas, respiração, circulação; suspeite de hipóxia']
      },
      pergunta: {
        enunciado: 'Qual achado requer intervenção imediata?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 160/100 mmHg', correta: false },
          { id: 'b', texto: 'SatO2 92% e FC 120 bpm', correta: true },
          { id: 'c', texto: 'Temperatura 37.5°C', correta: false },
          { id: 'd', texto: 'Escala de Glasgow 8/15', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hipóxia e taquicardia indicam instabilidade hemodinâmica no estado de mal epiléptico [1].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares Urgentes',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Após estabilização inicial, você solicita exames. Resultados iniciais:',
        dados: {
          'Glicemia capilar': '145 mg/dL',
          'Gasometria arterial': 'pH 7.28, pCO2 48 mmHg, HCO3 22 mEq/L',
          'Eletrólitos': 'Na 138 mEq/L, K 3.8 mEq/L, Ca 9.0 mg/dL',
          'Hemograma': 'Hb 13.5 g/dL, plaquetas 200.000/mm³',
          'Função renal': 'Creatinina 1.1 mg/dL',
          'EEG inicial': 'Atividade epiléptica contínua no lobo temporal direito'
        }
      },
      pergunta: {
        enunciado: 'Como interpretar estes resultados no contexto?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Acidose respiratória isolada sem relevância', correta: false },
          { id: 'b', texto: 'Acidose metabólica por acidose láctica secundária à crise', correta: true },
          { id: 'c', texto: 'Hipoglicemia como causa primária', correta: false },
          { id: 'd', texto: 'Hipocalcemia desencadeante', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Crises prolongadas causam acidose láctica; EEG confirma atividade epiléptica [1,7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com crise >30 minutos apesar de medidas iniciais, confirme o diagnóstico.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Crise epiléptica simples autolimitada', correta: false },
          { id: 'b', texto: 'Estado de mal epiléptico convulsivo refratário', correta: true },
          { id: 'c', texto: 'Síncope vasovagal com movimentos clônicos', correta: false },
          { id: 'd', texto: 'Encefalopatia hipertensiva', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Definição de estado de mal epiléptico: crise >5 min ou recorrentes sem recuperação [1,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Manejo Terapêutico Inicial',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Paciente persiste em crise. Inicie protocolo de tratamento.'
      },
      pergunta: {
        enunciado: 'Qual a conduta MAIS apropriada no primeiro nível?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas suporte ventilatório sem medicação', correta: false },
          { id: 'b', texto: 'Lorazepam IV 0.1 mg/kg, repetir se necessário', correta: true },
          { id: 'c', texto: 'Fenitoína como primeira linha', correta: false },
          { id: 'd', texto: 'Propofol para sedação imediata', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Benzodiazepínicos IV são primeira linha no estado de mal epiléptico [1].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento e Estabilização',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Após benzodiazepínicos e fenitoína, crise cessa em 45 minutos. Paciente em UTI, EEG normaliza. Retorna em 24h consciente.'
      },
      pergunta: {
        enunciado: 'Qual a conduta no seguimento imediato?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Alta hospitalar imediata', correta: false },
          { id: 'b', texto: 'Otimizar terapia antiepiléptica e monitorar por 48h', correta: true },
          { id: 'c', texto: 'Suspender todas as medicações', correta: false },
          { id: 'd', texto: 'Realizar RM cerebral urgente sem indicação', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Após resolução, ajustar doses e investigar etiologia; follow-up para prevenção [1,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 55 anos com epilepsia prévia apresenta estado de mal epiléptico por não adesão, tratado com sucesso com benzodiazepínicos e antiepilépticos de segunda linha, evoluindo para alta em 72h.',
    diagnosticoFinal: 'Estado de Mal Epiléptico Convulsivo (CID-11: CA23)',
    tratamentoRealizado: 'Lorazepam IV, fenitoína IV, suporte ventilatório, otimização com levetiracetam oral; investigação etiológica com EEG e RM.',
    evolucao: 'Crise controlada em 45 minutos, sem sequelas neurológicas; alta com plano de adesão medicamentosa e follow-up neurológico.',
    licoesPrincipais: [
      'Estado de mal epiléptico requer intervenção em <5 minutos para minimizar morbimortalidade [1].',
      'Não adesão é causa comum; educar paciente sobre importância da terapia contínua [7].',
      'Protocolo escalonado: benzodiazepínicos primeiro, seguido de antiepilépticos [1].',
      'EEG é essencial para confirmação e monitoramento [7].',
      'Investigar etiologia subjacente em todos os casos [4,5].'
    ],
    errosComuns: [
      'Atraso no uso de benzodiazepínicos, aumentando risco de refratariedade [1].',
      'Ignorar não adesão como fator precipitante, sem ajuste terapêutico [7].',
      'Não proteger vias aéreas em crises prolongadas, levando a aspiração [1].',
      'Falha em monitorar EEG, subestimando atividade subclínica [7].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer e classificar o estado de mal epiléptico conforme diretrizes da ILAE [7].',
    'Aplicar protocolo de manejo agudo em urgência neurológica [1].',
    'Identificar fatores de risco e prevenção em pacientes com epilepsia crônica [4,5].',
    'Interpretar exames complementares no contexto de crises epilépticas [7].'
  ],
  competencias: [
    'Avaliação e estabilização em emergências neurológicas',
    'Raciocínio diagnóstico em distúrbios convulsivos',
    'Manejo farmacológico de epilepsia e status epilepticus',
    'Educação em adesão terapêutica'
  ],
  doencasRelacionadas: ['epilepsia'],
  medicamentosRelacionados: ['N03AA01', 'N03AB01', 'N03AD01', 'N03AF01', 'N03AX14'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-004', 'ref-005', 'ref-007'],
  tags: ['urgencia', 'neurologia', 'epilepsia', 'convulsao', 'status epilepticus']
};