import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_RINITE_res_001: CasoClinico = {
  id: 'caso-rinite-alergica-001',
  titulo: 'Rinite Alérgica Persistente em Adulto Jovem',
  subtitulo: 'Paciente com sintomas nasais crônicos e impacto na qualidade de vida',
  categoria: 'respiratorio',
  dificuldade: 'iniciante',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-22',

  apresentacao: {
    paciente: {
      nome: 'Ana Silva',
      idade: 28,
      sexo: 'F',
      profissao: 'Professora',
      estadoCivil: 'Solteira'
    },
    queixaPrincipal: 'Meu nariz vive entupido e eu não paro de espirrar, especialmente de manhã',
    historiaDoencaAtual: 'Paciente relata sintomas nasais há 6 meses, com episódios de espirros em rajadas, rinorreia aquosa clara, obstrução nasal alternante e coceira no nariz e palato. Os sintomas pioram no ambiente de trabalho (sala de aula com poeira e contato com crianças) e em épocas de florescimento. Nega febre, dor de cabeça intensa ou secreção purulenta. Usa descongestionantes orais esporadicamente, com alívio parcial. Impacto significativo no sono e concentração diária.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente menciona piora sazonal e familiar com asma. O que deseja investigar?',
        dicas: ['História familiar de atopia, exposição a alérgenos, comorbidades respiratórias']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História de viagens recentes', correta: false },
          { id: 'b', texto: 'História familiar de alergias', correta: true },
          { id: 'c', texto: 'Atividade física semanal', correta: false },
          { id: 'd', texto: 'Dieta alimentar', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História familiar de atopia é fator de risco chave para rinite alérgica [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história familiar ajuda na suspeita de mediada por IgE.',
        incorreto: 'Priorize fatores de risco atópicos para guiar o diagnóstico.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame, a paciente apresenta mucosa nasal pálida e edemaciada, com rinorreia clara. Nega febre ou linfonodomegalias.',
        dados: {
          'PA': '118/76 mmHg',
          'FC': '72 bpm',
          'FR': '14 irpm',
          'SatO2': '98%',
          'Exame nasal': 'Turbinados hipertróficos, pálidos, secreção serosa'
        },
        dicas: ['Observe sinais clássicos de inflamação alérgica nasal']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de rinite alérgica?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Secreção purulenta', correta: false },
          { id: 'b', texto: 'Turbinados pálidos e edemaciados', correta: true },
          { id: 'c', texto: 'Hipertrofia amigdalar', correta: false },
          { id: 'd', texto: 'Placas brancas na orofaringe', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Mucosa nasal pálida e edemaciada é característica da rinite alérgica [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita testes para confirmação. Resultados mostram IgE total elevada e teste de prick positivo para ácaros e pólen.',
        dados: {
          'Hemograma': 'Eosinófilos 8% (normal <5%)',
          'IgE total': '450 UI/mL (normal <100)',
          'Teste prick cutâneo': 'Positivo para Dermatophagoides pteronyssinus e pólen de gramíneas',
          'Rinovírus PCR': 'Negativo'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção viral isolada', correta: false },
          { id: 'b', texto: 'Evidência de sensibilização alérgica', correta: true },
          { id: 'c', texto: 'Anemia por deficiência de ferro', correta: false },
          { id: 'd', texto: 'Apenas eosinofilia inespecífica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Eosinofilia e IgE elevada com prick positivo confirmam mecanismo IgE-mediado [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Baseado na história, exame e testes, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Rinite alérgica persistente moderada-grave', correta: true },
          { id: 'b', texto: 'Rinite vasomotora', correta: false },
          { id: 'c', texto: 'Sinusite bacteriana aguda', correta: false },
          { id: 'd', texto: 'Rinite medicamentosa', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Sintomas >4 dias/semana por >4 semanas classificam como persistente moderada-grave per ARIA [1,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial, considerando classificação ARIA.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas medidas de evitação de alérgenos', correta: false },
          { id: 'b', texto: 'Antihistamínico oral isolado', correta: false },
          { id: 'c', texto: 'Corticosteroide nasal + antihistamínico oral', correta: true },
          { id: 'd', texto: 'Antibióticos orais', correta: false }
        ],
        respostaCorreta: 'c',
        explicacao: 'Para rinite persistente moderada-grave, combinação de corticosteroide intranasal e anti-H1 é primeira linha [1,7].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Em 1 mês, sintomas reduzidos em 70%, sem efeitos colaterais. Paciente adota medidas de controle ambiental.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter tratamento e reavaliar em 3 meses', correta: true },
          { id: 'b', texto: 'Suspender medicações imediatamente', correta: false },
          { id: 'c', texto: 'Adicionar imunoterapia', correta: false },
          { id: 'd', texto: 'Encaminhar para otorrinolaringologista', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Controle sintomático bom; monitorar a cada 3-6 meses per ARIA [1,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Mulher de 28 anos com rinite alérgica persistente moderada-grave, diagnosticada por história, exame e testes alérgicos. Tratada com evitação, anti-H1 e corticosteroide nasal, com boa resposta.',
    diagnosticoFinal: 'Rinite alérgica persistente moderada-grave (CID-11: CA08.0)',
    tratamentoRealizado: 'Educação ambiental, loratadina 10mg/dia + budesonida nasal 200mcg/dia. Orientação para seguimento.',
    evolucao: 'Melhora significativa dos sintomas em 4 semanas, sem recorrência aguda. Qualidade de vida aprimorada.',
    licoesPrincipais: [
      'A rinite alérgica é mediada por IgE e associada a atopia familiar [1,2].',
      'Classificação ARIA guia o manejo: intermitente/persistente e leve/moderada-grave [1,7].',
      'Tratamento escalonado inicia com evitação e farmacoterapia tópica/oral [1,7].',
      'Comorbidades como asma devem ser screeningadas [1,2].',
      'Monitoramento contínuo melhora adesão e controle [5,6].'
    ],
    errosComuns: [
      'Confundir com infecção sinusal sem secreção purulenta ou febre [1].',
      'Subestimar impacto na qualidade de vida e sono [2].',
      'Iniciar antibióticos sem evidência bacteriana [5].',
      'Ignorar testes alérgicos em casos persistentes [7].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sintomas e fatores de risco da rinite alérgica.',
    'Aplicar classificação ARIA para diagnóstico e manejo.',
    'Selecionar tratamento inicial baseado em evidências.',
    'Entender a importância do seguimento em doenças alérgicas crônicas.'
  ],
  competencias: [
    'Realizar anamnese focada em alergias respiratórias',
    'Interpretar exame físico nasal e testes alérgicos',
    'Formular diagnóstico diferencial de rinite',
    'Prescrever terapia farmacológica inicial para rinite alérgica'
  ],
  doencasRelacionadas: ['rinite-alergica'],
  medicamentosRelacionados: ['R06AA52', 'R01AD08', 'R03DC03'],
  calculadorasRelacionadas: [],
  referencias: [
    'ref-001',
    'ref-002',
    'ref-007'
  ],
  tags: ['alergia', 'rinite', 'respiratorio', 'primaria', 'criancas-e-adultos']
};