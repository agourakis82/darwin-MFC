import type { CasoClinico } from '@/lib/types/caso-clinico';

export const casoCASO_DIP_gin_001: CasoClinico = {
  id: 'caso-doenca-inflamatoria-pelvica-001',
  titulo: 'Mulher jovem com dor pélvica e febre',
  subtitulo: 'Caso de suspeita de infecção ascendente em paciente sexualmente ativa',
  categoria: 'gineco_obstetricia',
  dificuldade: 'intermediario',
  tempoEstimado: 25,
  autor: 'Darwin-MFC AI',
  ultimaAtualizacao: '2026-01-23',

  apresentacao: {
    paciente: {
      nome: 'Ana Paula Santos',
      idade: 22,
      sexo: 'F',
      profissao: 'Auxiliar de enfermagem',
      estadoCivil: 'Solteira'
    },
    queixaPrincipal: 'Estou com dor forte na barriga embaixo e febre há dois dias',
    historiaDoencaAtual: 'Paciente refere início há 48 horas de dor abdominal baixa bilateral, de intensidade moderada a grave (7/10 na EVA), associada a febre (38,5°C), corrimento vaginal amarelado com odor fétido e dispareunia. Nega vômitos, diarreia ou sintomas urinários. Relata dois parceiros sexuais nos últimos meses, com uso inconsistente de preservativos. Último exame ginecológico há 6 meses, sem anormalidades. Nega comorbidades ou uso de medicamentos crônicos.'
  },

  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese Complementar',
      tipo: 'anamnese',
      conteudo: {
        texto: 'Você aprofunda a história clínica. A paciente confirma atividade sexual recente e menciona irregularidade menstrual. O que deseja investigar?',
        dicas: ['Fatores de risco para DSTs, história sexual e ginecológica']
      },
      pergunta: {
        enunciado: 'Qual informação é MAIS importante neste momento?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'História familiar de câncer ginecológico', correta: false },
          { id: 'b', texto: 'História sexual e uso de métodos contraceptivos', correta: true },
          { id: 'c', texto: 'Dieta e hábitos alimentares', correta: false },
          { id: 'd', texto: 'Vacinação recente', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'História sexual é essencial para suspeitar de infecções sexualmente transmissíveis causadoras de DIP [1,2].',
        pontos: 10
      },
      feedback: {
        correto: 'Correto! A história sexual direciona o raciocínio para DIP.',
        incorreto: 'Priorize fatores de risco sexuais no contexto de dor pélvica.'
      }
    },
    {
      id: 'etapa-2',
      titulo: 'Exame Físico',
      tipo: 'exame_fisico',
      conteudo: {
        texto: 'Ao exame físico, você observa febre e sensibilidade abdominal. Achados principais:',
        dados: {
          'Temperatura': '38,2°C',
          'PA': '118/76 mmHg',
          'FC': '92 bpm',
          'FR': '18 irpm',
          'Exame abdominal': 'Sensibilidade em QIE, sem defesa',
          'Exame ginecológico': 'Corrimento mucopurulento cervical, dor à mobilização cervical (sinal de Chandelier positivo)'
        },
        dicas: ['Atenção ao sinal de Chandelier e corrimento, sugestivos de infecção pélvica']
      },
      pergunta: {
        enunciado: 'Qual achado é MAIS sugestivo de DIP?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Febre isolada', correta: false },
          { id: 'b', texto: 'Dor à mobilização cervical', correta: true },
          { id: 'c', texto: 'PA normal', correta: false },
          { id: 'd', texto: 'Sensibilidade em QIE', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Dor à mobilização cervical é um critério mínimo para diagnóstico clínico de DIP [1,9].',
        pontos: 15
      }
    },
    {
      id: 'etapa-3',
      titulo: 'Exames Complementares',
      tipo: 'exames_complementares',
      conteudo: {
        texto: 'Você solicita exames iniciais. Resultados laboratoriais e de imagem:',
        dados: {
          'Hemograma': 'Leucocitose (14.000/mm³) com neutrofilia',
          'PCR': '45 mg/L (elevada)',
          'Teste NAAT para Chlamydia': 'Positivo',
          'Teste NAAT para Gonorreia': 'Negativo',
          'Ultrassonografia pélvica': 'Espessamento endometrial e fluido livre em fundo de saco'
        }
      },
      pergunta: {
        enunciado: 'Como você interpreta estes resultados?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Infecção viral inespecífica', correta: false },
          { id: 'b', texto: 'DIP confirmada por Chlamydia', correta: true },
          { id: 'c', texto: 'Apendicite aguda', correta: false },
          { id: 'd', texto: 'Gravidez ectópica', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'NAAT positivo para Chlamydia, associado a critérios clínicos e elevação de PCR, confirma DIP [1,2].',
        pontos: 15
      }
    },
    {
      id: 'etapa-4',
      titulo: 'Raciocínio Diagnóstico',
      tipo: 'diagnostico',
      conteudo: {
        texto: 'Com base na anamnese, exame físico e exames, formule sua hipótese.'
      },
      pergunta: {
        enunciado: 'Qual o diagnóstico MAIS provável?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Doença inflamatória pélvica (DIP) por Chlamydia trachomatis', correta: true },
          { id: 'b', texto: 'Cistite bacteriana', correta: false },
          { id: 'c', texto: 'Endometriose', correta: false },
          { id: 'd', texto: 'Gravidez ectópica', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Critérios CDC para DIP: dor pélvica + dor à mobilização cervical + NAAT positivo [1,9].',
        pontos: 20
      }
    },
    {
      id: 'etapa-5',
      titulo: 'Plano Terapêutico',
      tipo: 'tratamento',
      conteudo: {
        texto: 'Defina o plano inicial de tratamento ambulatorial.'
      },
      pergunta: {
        enunciado: 'Qual a conduta terapêutica MAIS apropriada?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Apenas analgésicos e repouso', correta: false },
          { id: 'b', texto: 'Ceftriaxona IM + Doxiciclina VO por 14 dias', correta: true },
          { id: 'c', texto: 'Azitromicina isolada', correta: false },
          { id: 'd', texto: 'Internação para antibióticos IV', correta: false }
        ],
        respostaCorreta: 'b',
        explicacao: 'Tratamento empírico ambulatorial para DIP não complicada: ceftriaxona 500mg IM + doxiciclina 100mg VO BID por 14 dias [1,3].',
        pontos: 20
      }
    },
    {
      id: 'etapa-6',
      titulo: 'Acompanhamento',
      tipo: 'acompanhamento',
      conteudo: {
        texto: 'Paciente retorna em 7 dias. Refere melhora da dor e febre, mas persistência leve de corrimento. Exames de seguimento mostram resolução da leucocitose.'
      },
      pergunta: {
        enunciado: 'Qual sua conduta agora?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Manter doxiciclina até 14 dias e reavaliar parceiro sexual', correta: true },
          { id: 'b', texto: 'Suspender tratamento por melhora', correta: false },
          { id: 'c', texto: 'Trocar para outro antibiótico', correta: false },
          { id: 'd', texto: 'Encaminhar para hospitalização', correta: false }
        ],
        respostaCorreta: 'a',
        explicacao: 'Completar curso antibiótico e rastrear/notificar parceiros para prevenir reinfecção [1,7].',
        pontos: 10
      }
    }
  ],

  desfecho: {
    resumo: 'Paciente de 22 anos com DIP por Chlamydia, tratada ambulatorialmente com resolução dos sintomas e orientação para prevenção de DSTs.',
    diagnosticoFinal: 'Doença inflamatória pélvica (CID-11: CA23) causada por Chlamydia trachomatis',
    tratamentoRealizado: 'Ceftriaxona 500mg IM dose única + Doxiciclina 100mg VO BID por 14 dias; aconselhamento sobre uso de preservativos e rastreamento de parceiros',
    evolucao: 'Melhora clínica em 7 dias, sem complicações agudas; retorno em 30 dias para reteste e contracepção',
    licoesPrincipais: [
      'DIP é frequentemente assintomática ou subaguda, mas deve ser suspeitada em mulheres jovens sexualmente ativas com dor pélvica [1,2].',
      'Diagnóstico clínico baseado em critérios CDC, complementado por NAAT para Chlamydia e Gonorreia [1,9].',
      'Tratamento empírico com antibióticos de amplo espectro é essencial para prevenir infertilidade e gravidez ectópica [3,4].',
      'Rastreamento anual em mulheres <25 anos sexualmente ativas é recomendado pelo SUS e CDC [7,1].',
      'Notificação e tratamento de parceiros é crucial para controle epidemiológico [5,8].'
    ],
    errosComuns: [
      'Subestimar sintomas como corrimento e dispareunia, atrasando diagnóstico de DIP [2].',
      'Não investigar história sexual, perdendo oportunidade de identificar fatores de risco [1].',
      'Tratamento inadequado, como uso isolado de macrolídeos, sem cobertura para anaeróbios [3].',
      'Falha em rastrear parceiros, aumentando risco de reinfecção [7].'
    ]
  },

  objetivosAprendizagem: [
    'Reconhecer sinais e sintomas de DIP e critérios diagnósticos clínicos.',
    'Entender o papel de infecções sexualmente transmissíveis na etiologia da DIP.',
    'Aplicar recomendações de tratamento empírico e prevenção de complicações.',
    'Discutir importância do rastreamento em populações de risco no contexto brasileiro.'
  ],
  competencias: [
    'Anamnese ginecológica e avaliação de risco para DSTs',
    'Exame físico pélvico e interpretação de achados sugestivos de infecção',
    'Solicitação e interpretação de exames para diagnóstico de DIP',
    'Prescrição de tratamento conforme guidelines nacionais e internacionais'
  ],
  doencasRelacionadas: ['doenca-inflamatoria-pelvica'],
  medicamentosRelacionados: ['J01AA02', 'J01DD01', 'J01MA02'],
  calculadorasRelacionadas: [],
  referencias: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-007', 'ref-008', 'ref-009'],
  tags: ['DIP', 'DST', 'Chlamydia', 'Ginecologia', 'Saúde sexual']
};