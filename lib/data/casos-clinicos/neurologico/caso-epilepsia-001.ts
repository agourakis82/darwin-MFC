import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_EPILEPSIA_neu_001: CasoClinico = {
  id: 'caso-primeira-crise-convulsiva-001',
  titulo: 'Primeira Crise Convulsiva em Adulto Jovem',
  subtitulo: 'Paciente com episódio de perda de consciência e movimentos convulsivos relatados por familiar',
  categoria: 'neurologico',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 28,
      sexo: 'M',
      profissao: 'Pedreiro',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Eu apaguei e comecei a tremer todo, foi horrível',
    historiaDoencaAtual: 'Paciente refere episódio agudo há 2 dias, durante o trabalho, com perda súbita de consciência por cerca de 2 minutos, seguido de movimentos tônico-clônicos generalizados, mordedura de língua e incontinência urinária, testemunhado por colegas. Recuperação gradual com confusão pós-evento por 30 minutos. Nega febre, trauma craniano recente, uso de álcool ou drogas ilícitas no dia, mas relata privação de sono crônica devido a turnos noturnos. Sem crises prévias conhecidas. Antecedentes: hipertensão arterial controlada com losartana 50mg/dia, sem outras comorbidades.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente nega cefaleias intensas ou auras prévias, mas menciona estresse no trabalho e consumo ocasional de álcool nos fins de semana. O que deseja investigar?',
        dicas: ['Considere fatores precipitantes como sono, álcool e história familiar de epilepsia']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de hipertensão', correta: false },
          { id: 'b', texto: 'Privação de sono e uso de álcool', correta: true },
          { id: 'c', texto: 'Dieta alimentar recente', correta: false },
          { id: 'd', texto: 'Viagens internacionais', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Fatores como privação de sono e álcool podem precipitar crises convulsivas em indivíduos suscetíveis [7].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! Esses fatores são precipitantes comuns para a primeira crise.',
        incorreto: 'Priorize fatores desencadeantes neurológicos e comportamentais.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, o paciente está consciente e orientado, sem déficits neurológicos focais. Achados incluem:',
        dados: {
          'PA': '135/85 mmHg',
          'FC': '82 bpm',
          'FR': '14 irpm',
          'Temperatura': '36.5°C',
          'Pupilas': 'Isocóricas e fotorreativas',
          'Força muscular': '5/5 em todos os membros',
          'Reflexos': 'Normais e simétricos'
        },
        dicas: ['Ausência de focais sugere crise generalizada; verifique sinais de trauma']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS relevante para o diagnóstico diferencial?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA 135/85 mmHg', correta: false },
          { id: 'b', texto: 'Exame neurológico normal sem focais', correta: true },
          { id: 'c', texto: 'FC 82 bpm', correta: false },
          { id: 'd', texto: 'Temperatura 36.5°C', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Exame neurológico normal pós-crise sugere etiologia não estrutural aguda, mas requer investigação [7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais para descartar causas metabólicas e estruturais. Resultados:',
        dados: {
          'Glicemia': '95 mg/dL',
          'Eletrólitos (Na/K)': '140/4.2 mEq/L',
          'Ureia/Creatinina': '30/0.9 mg/dL',
          'EEG': 'Atividade epileptiforme interictal no lobo temporal direito',
          'TC crânio': 'Sem lesões agudas'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Causa metabólica isolada', correta: false },
          { id: 'b', texto: 'Primeira crise com atividade epileptiforme no EEG', correta: true },
          { id: 'c', texto: 'Lesão estrutural na TC', correta: false },
          { id: 'd', texto: 'EEG normal, descartando epilepsia', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'EEG com atividade epileptiforme sugere epilepsia focal; TC normal exclui lesão aguda [4,5,7].',
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
          { id: 'a', texto: 'Primeira crise convulsiva isolada sem epilepsia', correta: false },
          { id: 'b', texto: 'Epilepsia focal com onset na idade adulta', correta: true },
          { id: 'c', texto: 'Síncope vasovagal mimetizando crise', correta: false },
          { id: 'd', texto: 'Crise psicogênica não epiléptica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História de crise tônico-clônica com EEG anormal indica epilepsia; classificação pela ILAE [4,5,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de manejo para esta primeira crise.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Observação sem medicação, apenas orientação', correta: false },
          { id: 'b', texto: 'Iniciar carbamazepina 200mg 2x/dia', correta: true },
          { id: 'c', texto: 'Admitir em UTI para monitorização', correta: false },
          { id: 'd', texto: 'Realizar RM imediata sem medicação', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Para primeira crise com EEG anormal, iniciar antiepiléptico como carbamazepina para prevenção de recorrência [7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 1 mês. Sem novas crises, aderente à medicação. EEG de controle sem atividade epileptiforme.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter carbamazepina e retornar em 6 meses', correta: true },
          { id: 'b', texto: 'Suspender medicação imediatamente', correta: false },
          { id: 'c', texto: 'Trocar para outro antiepiléptico', correta: false },
          { id: 'd', texto: 'Encaminhar para neurocirurgia', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Controle inicial bom; manter tratamento e monitoramento periódico conforme guidelines [7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 28 anos com primeira crise convulsiva tônico-clônica generalizada, EEG com foco temporal direito, diagnosticado como epilepsia focal. Iniciado tratamento com carbamazepina, sem recorrências em follow-up.',
    diagnosticoFinal: 'Epilepsia focal (CID-11: 8A60)',
    tratamentoRealizado: 'Carbamazepina 200mg 2x/dia, orientação sobre evitar precipitantes (sono, álcool), restrições de direção veicular por 6 meses.',
    evolucao: 'Evolução favorável, sem crises adicionais em 3 meses, com RM de crânio normal e EEG controlado sem anormalidades.',
    licoesPrincipais: [
      'A primeira crise convulsiva requer avaliação completa com EEG para estratificar risco de recorrência [7].',
      'Fatores precipitantes como privação de sono e álcool devem ser identificados e modificados [5].',
      'Classificação pela ILAE orienta o manejo, priorizando etiologia e síndrome [4,7].',
      'Tratamento profilático é indicado em casos com EEG anormal, reduzindo risco de novas crises [7].',
      'Acompanhamento multidisciplinar é essencial, incluindo neurologista para síndromes específicas [5].'
    ],
    errosComuns: [
      'Não solicitar EEG, subestimando o risco de epilepsia [7].',
      'Iniciar medicação sem investigação etiológica, ignorando causas reversíveis [4].',
      'Desconsiderar impacto psicossocial, como restrições de direção e emprego [7].',
      'Falhar em orientar sobre adesão e monitoramento de efeitos adversos de antiepilépticos [7].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer a apresentação clínica da primeira crise convulsiva e seu diagnóstico diferencial.',
    'Interpretar achados de EEG e imagem no contexto de epilepsia.',
    'Aplicar guidelines da ILAE para classificação e manejo inicial de epilepsia [4,5,7].',
    'Planejar tratamento e acompanhamento para prevenção de recorrências.'
  ],
  competencias: [
    'Avaliação neurológica inicial em emergências',
    'Interpretação de exames complementares em neurologia',
    'Prescrição de antiepilépticos e manejo de comorbidades',
    'Educação em saúde para pacientes com distúrbios convulsivos'
  ],
  doencasRelacionadas: ['epilepsia'],
  medicamentosRelacionados: ['N03AA01', 'N03AB01', 'N03AD01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-004', 'ref-005', 'ref-007'],
  tags: ['crise convulsiva', 'epilepsia', 'EEG', 'antiepilépticos', 'primeira crise']
};