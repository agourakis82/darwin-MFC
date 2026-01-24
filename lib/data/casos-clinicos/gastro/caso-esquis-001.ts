import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_ESQUIS_gas_001: CasoClinico = {
  id: 'caso-esquistossomose-001',
  titulo: 'Dor abdominal crônica em pescador de área endêmica',
  subtitulo: 'Paciente com exposição a águas contaminadas apresenta sintomas gastrointestinais persistentes',
  categoria: 'gastro',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'João Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Pescador',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Dor na barriga e cansaço há meses',
    historiaDoencaAtual: 'Paciente refere dor abdominal difusa, intermitente, associada a diarreia com sangue e muco nas fezes, perda de apetite e fadiga progressiva nos últimos 6 meses. Negam febre recente, mas relata exposição frequente a rios locais para pesca. Sem comorbidades conhecidas, mas histórico de infecções gastrointestinais recorrentes na família.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona contato diário com águas de rios em área rural do Nordeste brasileiro. O que deseja investigar?',
        dicas: ['Considere histórico de exposição a água contaminada, hábitos higiênicos e sintomas parasitários']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de câncer colorretal', correta: false },
          { id: 'b', texto: 'Exposição ocupacional a corpos d\'água', correta: true },
          { id: 'c', texto: 'Dieta rica em fibras', correta: false },
          { id: 'd', texto: 'Atividade física regular', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'A exposição a águas contaminadas por caramujos vetores é fator de risco chave para esquistossomose em áreas endêmicas [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Excelente! A exposição aquática é fundamental para suspeita de parasitose.',
        incorreto: 'Priorize fatores de risco ambientais em contextos endêmicos.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa palidez cutânea, abdome doloroso à palpação em hipocôndrio direito, com hepatomegalia moderada (2 cm abaixo da margem costal). Sem esplenomegalia evidente.',
        dados: {
          'PA': '130/80 mmHg',
          'FC': '82 bpm',
          'FR': '16 irpm',
          'Peso': '68 kg',
          'Estatura': '1,70 m',
          'IMC': '23,5 kg/m²'
        },
        dicas: ['Note a hepatomegalia e palidez, sugestivos de infecção crônica']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS preocupante?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA normal', correta: false },
          { id: 'b', texto: 'Hepatomegalia', correta: true },
          { id: 'c', texto: 'IMC normal', correta: false },
          { id: 'd', texto: 'FC 82 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Hepatomegalia pode indicar morbidade hepática por esquistossomose crônica [2,5].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados mostram anemia normocítica e exame parasitológico de fezes positivo para ovos de Schistosoma mansoni.',
        dados: {
          'Hemoglobina': '10,2 g/dL',
          'Hematócrito': '32%',
          'VCM': '85 fL',
          'Exame de fezes (Kato-Katz)': 'Ovos de S. mansoni (moderada intensidade)',
          'Sorologia (ELISA)': 'Positivo para anticorpos anti-Schistosoma',
          'USG abdominal': 'Hepatomegalia com fibrose periportal'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Anemia por deficiência de ferro isolada', correta: false },
          { id: 'b', texto: 'Esquistossomose mansoni com morbidade hepática', correta: true },
          { id: 'c', texto: 'Infecção bacteriana intestinal', correta: false },
          { id: 'd', texto: 'Doença inflamatória intestinal', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Detecção de ovos no Kato-Katz confirma infecção ativa; sorologia e USG indicam cronicidade [3,7].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e laboratoriais, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Esquistossomose mansoni hepatoesplênica', correta: true },
          { id: 'b', texto: 'Hepatite viral B', correta: false },
          { id: 'c', texto: 'Câncer de cólon', correta: false },
          { id: 'd', texto: 'Doença celíaca', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Quadro clássico em área endêmica: exposição aquática, ovos nas fezes e hepatomegalia [1,5].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento e manejo.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas suporte sintomático', correta: false },
          { id: 'b', texto: 'Praziquantel 40-60 mg/kg em dose única', correta: true },
          { id: 'c', texto: 'Corticoides isolados', correta: false },
          { id: 'd', texto: 'Antibióticos de amplo espectro', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Praziquantel é o tratamento de escolha para esquistossomose, conforme diretrizes do MS e WHO [7,10].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 3 meses após tratamento. Exame de fezes negativo, Hb 12,5 g/dL, USG com regressão parcial da fibrose.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter vigilância anual e educação sanitária', correta: true },
          { id: 'b', texto: 'Repetir tratamento imediatamente', correta: false },
          { id: 'c', texto: 'Encaminhar para transplante hepático', correta: false },
          { id: 'd', texto: 'Suspender todo acompanhamento', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Cura parasitológica confirmada; rastreamento contínuo em área endêmica é essencial [7,9].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 55 anos, pescador em área endêmica do Nordeste, apresentou esquistossomose mansoni crônica com hepatomegalia e anemia. Diagnosticada por exame parasitológico e tratada com praziquantel, com boa evolução.',
    diagnosticoFinal: 'Esquistossomose mansoni hepática (CID-11: CA23)',
    tratamentoRealizado: 'Praziquantel 50 mg/kg dose única; suplemento de ferro; orientação sobre prevenção de reinfecção.',
    evolucao: 'Melhora clínica em 3 meses, com eliminação de ovos nas fezes e redução da hepatomegalia. Acompanhamento anual recomendado.',
    licoesPrincipais: [
      'Suspeitar de esquistossomose em pacientes de áreas endêmicas com exposição aquática e sintomas gastrointestinais crônicos [1,2].',
      'Exame parasitológico de fezes (Kato-Katz) é o método diagnóstico padrão ouro para detecção de ovos [3,7].',
      'Tratamento com praziquantel é curativo na fase ativa, mas morbidade crônica requer manejo multidisciplinar [7,10].',
      'Rastreamento anual em populações de risco previne complicações hepatoesplênicas [5,9].',
      'Educação sanitária e saneamento básico são pilares no controle da doença no Brasil [6].'
    ],
    errosComuns: [
      'Subestimar histórico de exposição aquática, confundindo com infecções bacterianas comuns.',
      'Não solicitar exame parasitológico em contextos endêmicos, optando por colonoscopia desnecessária.',
      'Atrasar tratamento em casos crônicos, permitindo progressão para fibrose hepática irreversível.',
      'Ignorar rastreamento familiar e comunitário em focos endêmicos.'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer fatores de risco e apresentação clínica da esquistossomose em populações endêmicas.',
    'Interpretar exames diagnósticos como Kato-Katz e sorologia para confirmação parasitária.',
    'Aplicar diretrizes de tratamento e prevenção conforme SUS e WHO.',
    'Entender a importância do rastreamento em atenção primária para controle de doenças negligenciadas.'
  ],
  competencias: [
    'Raciocínio clínico em doenças infecciosas tropicais',
    'Solicitação e interpretação de exames parasitológicos',
    'Manejo terapêutico de parasitose intestinal',
    'Educação em saúde para prevenção de endemias'
  ],
  doencasRelacionadas: ['esquistossomose'],
  medicamentosRelacionados: ['P02CA01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-005', 'ref-006', 'ref-007', 'ref-009', 'ref-010'],
  tags: ['parasitarias', 'endemicas', 'gastrointestinal', 'rastreamento', 'doencas_negligenciadas']
};