import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_GOTA_cro_001: CasoClinico = {
  id: 'caso-gota-001',
  titulo: 'Dor intensa no dedão do pé',
  subtitulo: 'Paciente com episódio agudo de artrite inflamatória',
  categoria: 'cronico',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'João Carlos Silva',
      idade: 55,
      sexo: 'M',
      profissao: 'Motorista de caminhão',
      estadoCivil: 'Casado'
    },
    queixaPrincipal: 'Meu dedão do pé está inchado e doendo muito, não consigo nem calçar o sapato!',
    historiaDoencaAtual: 'Paciente relata início súbito de dor intensa na articulação metatarsofalângica do hallux direito há 2 dias, associada a inchaço, vermelhidão e limitação funcional. A dor é descrita como "fogo queimando" e piora à noite. Nega febre ou trauma recente. Refere episódios semelhantes há 1 ano, mas mais leves. Consome cerveja nos fins de semana e tem histórico de hipertensão e obesidade. Nega uso de diuréticos ou outros medicamentos crônicos.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. O paciente menciona consumo de álcool e dieta rica em carnes. O que deseja investigar?',
        dicas: ['Fatores de risco como álcool, dieta e comorbidades metabólicas']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'Consumo de álcool e dieta', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'História familiar de câncer', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Consumo excessivo de álcool e purinas é fator de risco clássico para gota [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! Fatores desencadeantes como álcool são essenciais.',
        incorreto: 'Priorize fatores de risco para artrite gotosa.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, você observa a articulação do hallux direito eritematosa, edemaciada e quente, com dor à palpação e mobilização. Sinais vitais: PA 148/92 mmHg, FC 82 bpm, FR 16 irpm, IMC 29.5 kg/m². Nega tofos visíveis.',
        dados: {
          'PA': '148/92 mmHg',
          'FC': '82 bpm',
          'FR': '16 irpm',
          'IMC': '29.5 kg/m²',
          'Exame articular': 'Eritema e edema no hallux direito'
        },
        dicas: ['Observe sinais inflamatórios locais e comorbidades como obesidade']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de artrite inflamatória aguda?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'PA elevada', correta: false },
          { id: 'b', texto: 'Eritema e edema no hallux', correta: true },
          { id: 'c', texto: 'IMC 29.5', correta: false },
          { id: 'd', texto: 'FC 82 bpm', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Apresentação clássica de gota aguda na 1ª articulação metatarsofalângica [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames laboratoriais iniciais. Resultados:',
        dados: {
          'Ácido úrico sérico': '8.5 mg/dL',
          'Creatinina': '1.1 mg/dL',
          'TFGe': '75 mL/min/1.73m²',
          'Glicemia de jejum': '112 mg/dL',
          'Colesterol total': '220 mg/dL',
          'Triglicerídeos': '210 mg/dL'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Hiperuricemia isolada sem relevância', correta: false },
          { id: 'b', texto: 'Hiperuricemia com síndrome metabólica', correta: true },
          { id: 'c', texto: 'Insuficiência renal aguda', correta: false },
          { id: 'd', texto: 'Diabetes mellitus tipo 2', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Ácido úrico >7 mg/dL em contexto de comorbidades metabólicas sugere gota [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na história, exame e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Gota aguda', correta: true },
          { id: 'b', texto: 'Artrite séptica', correta: false },
          { id: 'c', texto: 'Artrite reumatoide', correta: false },
          { id: 'd', texto: 'Osteoartrite', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'História clássica, localização e hiperuricemia confirmam gota [1,2].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o tratamento inicial para crise aguda.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas repouso e gelo', correta: false },
          { id: 'b', texto: 'Colchicina 1 mg inicial + AINEs', correta: true },
          { id: 'c', texto: 'Corticoides sistêmicos imediatos', correta: false },
          { id: 'd', texto: 'Alopurinol imediato', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Colchicina ou AINEs são primeira linha para crise aguda de gota [1,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 2 semanas: dor resolvida, ácido úrico 7.2 mg/dL. Mantém comorbidades.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Iniciar alopurinol e educação sobre dieta', correta: true },
          { id: 'b', texto: 'Suspender todo tratamento', correta: false },
          { id: 'c', texto: 'Encaminhar para reumatologia urgente', correta: false },
          { id: 'd', texto: 'Repetir exames em 1 mês sem medicação', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Após crise, iniciar hipouricemiantes em pacientes com recorrência e modificar estilo de vida [1,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 55 anos com gota aguda no hallux, associada a fatores de risco metabólicos. Tratado com colchicina e AINEs, evoluindo para profilaxia com alopurinol.',
    diagnosticoFinal: 'Gota aguda (CID-11: CA23)',
    tratamentoRealizado: 'Colchicina 1 mg VO inicial, seguida de ibuprofeno 400 mg 3x/dia por 5 dias. Iniciado alopurinol 100 mg/dia com escalonamento, além de orientação dietética e controle de comorbidades.',
    evolucao: 'Resolução completa da crise em 7 dias. Em 3 meses, ácido úrico <6 mg/dL, sem novas crises. Perda de 3 kg com mudanças no estilo de vida.',
    licoesPrincipais: [
      'Gota é causada por depósito de cristais de urato, com apresentação clássica no hallux [1,2].',
      'Fatores de risco incluem obesidade, álcool e dieta rica em purinas; rastreie em populações de risco [6,7].',
      'Tratamento agudo prioriza colchicina ou AINEs; profilaxia com alopurinol em casos recorrentes [1,7].',
      'Comorbidades cardiovasculares aumentam risco; integre manejo global [9,11].',
      'Educação sobre estilo de vida é essencial para prevenção [1].'
    ],
    errosComuns: [
      'Iniciar alopurinol durante crise aguda, podendo piorar sintomas [1].',
      'Ignorar diferencial com artrite séptica, sem aspiração articular em casos duvidosos [1,2].',
      'Subestimar comorbidades metabólicas, focando apenas na articulação [6,7].',
      'Não rastrear hiperuricemia em pacientes de alto risco, como hipertensos [6].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer a apresentação clínica clássica da gota aguda.',
    'Identificar fatores de risco e comorbidades associadas à gota.',
    'Aplicar diretrizes para tratamento agudo e profilaxia da gota.',
    'Entender a importância do rastreamento em populações de risco no contexto brasileiro.'
  ],
  competencias: ['Anamnese em reumatologia', 'Exame físico articular', 'Interpretação de exames laboratoriais', 'Raciocínio diagnóstico diferencial', 'Prescrição terapêutica inicial'],
  doencasRelacionadas: ['gota'],
  medicamentosRelacionados: ['M04AA01', 'M04AC01', 'M01BA01'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-005', 'ref-006', 'ref-007', 'ref-009'],
  tags: ['artrite inflamatória', 'hiperuricemia', 'síndrome metabólica', 'profilaxia crônica']
};