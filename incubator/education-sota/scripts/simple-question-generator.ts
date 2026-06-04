/**
 * Gerador Simples de Questões Médicas
 * Sistema funcional para gerar questões em volume para diferentes especialidades
 */

import {
  Especialidade,
  TipoQuestao,
  Dificuldade,
  QuestaoMedica,
  TemplateQuestao,
  FiltroQuestoes,
  EstatisticasQuestoes,
  RespostaUsuario,
  SessaoEstudo,
  SistemaPontuacao,
  GeradorQuestoes
} from '../lib/simple-question-system';

// Dados médicos por especialidade
const dadosMedicos = {
  [Especialidade.MEDICINA_INTERNA]: {
    doencas: [
      'Hipertensão arterial sistêmica',
      'Diabetes mellitus tipo 2',
      'Doença pulmonar obstrutiva crônica',
      'Insuficiência cardíaca',
      'Gastrite',
      'Hepatite viral',
      'Insuficiência renal crônica',
      'Lúpus eritematoso sistêmico',
      'Fibromialgia',
      'Síndrome do intestino irritável'
    ],
    sintomas: [
      'Dispneia',
      'Dor torácica',
      'Fadiga',
      'Edema de membros inferiores',
      'Náuseas',
      'Vômitos',
      'Dor abdominal',
      'Cefaleia',
      'Tosse',
      'Febre'
    ],
    medicamentos: [
      'Enalapril',
      'Metformina',
      'Salbutamol',
      'Furosemida',
      'Omeprazol',
      'Paracetamol',
      'Dipirona',
      'Amoxicilina',
      'Loratadina',
      'Hidroclorotiazida'
    ],
    procedimentos: [
      'Eletrocardiograma',
      'Ecocardiograma',
      'Radiografia de tórax',
      'Endoscopia digestiva alta',
      'Tomografia computadorizada',
      'Ressonância magnética',
      'Ecografia abdominal',
      'Teste ergométrico',
      'Holter 24h',
      'Biópsia hepática'
    ]
  },
  [Especialidade.CARDIOLOGIA]: {
    doencas: [
      'Infarto agudo do miocárdio',
      'Angina estável',
      'Fibrilação atrial',
      'Insuficiência cardíaca',
      'Hipertensão arterial',
      'Miocardiopatia',
      'Valvopatias',
      'Pericardite',
      'Endocardite',
      'Síncope'
    ],
    sintomas: [
      'Dor torácica típica',
      'Dispneia de esforço',
      'Palpitações',
      'Síncope',
      'Edema',
      'Fadiga',
      'Tosse seca',
      'Orthopneia',
      'Paroxismos noturnos',
      'Claudicação intermitente'
    ],
    medicamentos: [
      'Aspirina',
      'Clopidogrel',
      'Sinvastatina',
      'Losartana',
      'Carvedilol',
      'Furosemida',
      'Amiodarona',
      'Nitroglicerina',
      'Atorvastatina',
      'Enalapril'
    ],
    procedimentos: [
      'Angioplastia coronariana',
      'Cateterismo cardíaco',
      'Ecocardiograma',
      'Teste ergométrico',
      'Holter 24h',
      'Eletrofisiologia',
      'Ecocardiograma de stress',
      'Cintilografia miocárdica',
      'Ressonância magnética cardíaca',
      'Ecocardiograma transesofágico'
    ]
  },
  [Especialidade.PEDIATRIA]: {
    doencas: [
      'Asma',
      'Pneumonia',
      'Gastroenterite',
      'Dermatite atópica',
      'Otite média aguda',
      'Anemia ferropriva',
      'Síndrome gripal',
      'Varicela',
      'Bronquiolite',
      'Caxumba'
    ],
    sintomas: [
      'Tosse',
      'Febre',
      'Vômitos',
      'Diarréia',
      'Irritabilidade',
      'Dor abdominal',
      'Sibilância',
      'Prostração',
      'Falha no crescimento',
      'Choro inconsolável'
    ],
    medicamentos: [
      'Salbutamol',
      'Ibuprofeno',
      'Paracetamol',
      'Amoxicilina',
      'Soro de reidratação oral',
      'Dipirona',
      'Loratadina',
      'Prednisona',
      'Cefalexina',
      'Zinco'
    ],
    procedimentos: [
      'Ausculta pulmonar',
      'Otoscopia',
      'Palpação abdominal',
      'Verificação de peso',
      'Medida de estatura',
      'Vacinoterapia',
      'Curativo de ferida',
      'Nebulização',
      'Aspiração de secreções',
      'Intubação orotraqueal'
    ]
  }
};

// Templates de questões por especialidade e tipo
const templatesQuestoes: TemplateQuestao[] = [
  // Medicina Interna - Diagnóstico
  {
    especialidade: Especialidade.MEDICINA_INTERNA,
    tipo: TipoQuestao.DIAGNOSTICO,
    dificuldade: Dificuldade.BASICO,
    enunciadoTemplate: "Paciente de {idade} anos, gênero {genero}, apresenta {sintoma}. Qual é o diagnóstico mais provável?",
    alternativasTemplates: [
      "{doenca1}",
      "{doenca2}",
      "{doenca3}",
      "{doenca4}"
    ],
    dadosTemplate: {
      idade: [35, 45, 55, 65],
      genero: ['masculino', 'feminino'],
      sintoma: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].sintomas[Math.floor(Math.random() * 10)]; },
      doenca1: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].doencas[Math.floor(Math.random() * 10)]; },
      doenca2: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].doencas[Math.floor(Math.random() * 10)]; },
      doenca3: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].doencas[Math.floor(Math.random() * 10)]; },
      doenca4: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].doencas[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 10,
    tempoEstimado: 3
  },

  // Cardiologia - Tratamento
  {
    especialidade: Especialidade.CARDIOLOGIA,
    tipo: TipoQuestao.TRATAMENTO,
    dificuldade: Dificuldade.INTERMEDIARIO,
    enunciadoTemplate: "Paciente com {diagnostico} está em tratamento com {medicamento1}. Qual seria a melhor opção terapêutica adicional?",
    alternativasTemplates: [
      "{medicamento2}",
      "{medicamento3}",
      "{medicamento4}",
      "Apenas observação clínica"
    ],
    dadosTemplate: {
      diagnostico: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].doencas[Math.floor(Math.random() * 10)]; },
      medicamento1: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].medicamentos[Math.floor(Math.random() * 10)]; },
      medicamento2: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].medicamentos[Math.floor(Math.random() * 10)]; },
      medicamento3: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].medicamentos[Math.floor(Math.random() * 10)]; },
      medicamento4: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].medicamentos[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 15,
    tempoEstimado: 4
  },

  // Pediatria - Fisiopatologia
  {
    especialidade: Especialidade.PEDIATRIA,
    tipo: TipoQuestao.FISIOPATOLOGIA,
    dificuldade: Dificuldade.BASICO,
    enunciadoTemplate: "Na {doenca}, qual é o principal mecanismo fisiopatológico envolvido?",
    alternativasTemplates: [
      "Inflamação e edema da mucosa",
      "Infecção bacteriana invasiva",
      "Obstrução mecânica das vias aéreas",
      "Deficiência enzimática específica"
    ],
    dadosTemplate: {
      doenca: function() { return dadosMedicos[Especialidade.PEDIATRIA].doencas[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 12,
    tempoEstimado: 3
  },

  // Medicina Interna - Epidemiologia
  {
    especialidade: Especialidade.MEDICINA_INTERNA,
    tipo: TipoQuestao.EPIDEMIOLOGIA,
    dificuldade: Dificuldade.AVANCADO,
    enunciadoTemplate: "Qual a prevalência de {doenca} na população adulta brasileira?",
    alternativasTemplates: [
      "1-3%",
      "5-10%",
      "15-20%",
      "25-30%"
    ],
    dadosTemplate: {
      doenca: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].doencas[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 20,
    tempoEstimado: 5
  }
];

/**
 * Gerador de questões com implementação simplificada
 */
export class SimpleQuestionGenerator implements GeradorQuestoes {

  /**
   * Gera questões baseado nos templates
   */
  gerarQuestoes(templates: TemplateQuestao[], quantidade: number): QuestaoMedica[] {
    const questoes: QuestaoMedica[] = [];

    for (let i = 0; i < quantidade; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const questao = this.gerarQuestaoPorTemplate(template);
      questoes.push(questao);
    }

    return questoes;
  }

  /**
   * Gera uma questão específica baseado em um template
   */
  private gerarQuestaoPorTemplate(template: TemplateQuestao): QuestaoMedica {
    // Preencher template com dados
    const enunciado = this.preencherTemplate(template.enunciadoTemplate, template.dadosTemplate);
    const alternativas = template.alternativasTemplates.map(alt =>
      this.preencherTemplate(alt, template.dadosTemplate)
    );

    // Gerar ID único
    const id = this.gerarId();

    return {
      id,
      especialidade: template.especialidade,
      tipo: template.tipo,
      dificuldade: template.dificuldade,
      enunciado,
      alternativas,
      respostaCorreta: template.respostaCorreta,
      explicacao: this.gerarExplicacao(template, enunciado),
      referencias: this.gerarReferencias(template.especialidade),
      tags: this.gerarTags(template),
      pontos: template.pontos,
      tempoEstimado: template.tempoEstimado,
      criadaEm: new Date(),
      ultimaModificacao: new Date(),
      vezesRespondida: 0,
      taxaAcerto: 0
    };
  }

  /**
   * Preenche template com dados
   */
  private preencherTemplate(template: string, dados: any): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
      const valor = dados[key];
      if (typeof valor === 'function') {
        return valor();
      }
      if (Array.isArray(valor)) {
        return valor[Math.floor(Math.random() * valor.length)];
      }
      return valor || match;
    });
  }

  /**
   * Gera ID único para questão
   */
  private gerarId(): string {
    return `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Aplica filtros às questões
   */
  aplicarFiltros(questoes: QuestaoMedica[], filtros: FiltroQuestoes): QuestaoMedica[] {
    let questoesFiltradas = [...questoes];

    if (filtros.especialidade?.length) {
      questoesFiltradas = questoesFiltradas.filter(q =>
        filtros.especialidade!.includes(q.especialidade)
      );
    }

    if (filtros.tipo?.length) {
      questoesFiltradas = questoesFiltradas.filter(q =>
        filtros.tipo!.includes(q.tipo)
      );
    }

    if (filtros.dificuldade?.length) {
      questoesFiltradas = questoesFiltradas.filter(q =>
        filtros.dificuldade!.includes(q.dificuldade)
      );
    }

    if (filtros.apenasComTaxaAcerto) {
      questoesFiltradas = questoesFiltradas.filter(q => q.vezesRespondida > 0);
    }

    if (filtros.limite) {
      questoesFiltradas = questoesFiltradas.slice(0, filtros.limite);
    }

    return questoesFiltradas;
  }

  /**
   * Calcula estatísticas das questões
   */
  calcularEstatisticas(questoes: QuestaoMedica[]): EstatisticasQuestoes {
    const porEspecialidade = {} as any;
    const porTipo = {} as any;
    const porDificuldade = {} as any;

    // Contadores
    questoes.forEach(q => {
      porEspecialidade[q.especialidade] = (porEspecialidade[q.especialidade] || 0) + 1;
      porTipo[q.tipo] = (porTipo[q.tipo] || 0) + 1;
      porDificuldade[q.dificuldade] = (porDificuldade[q.dificuldade] || 0) + 1;
    });

    // Questões mais respondidas
    const questoesMaisRespondidas = questoes
      .filter(q => q.vezesRespondida > 0)
      .sort((a, b) => b.vezesRespondida - a.vezesRespondida)
      .slice(0, 10)
      .map(q => ({ questao: q, respostas: q.vezesRespondida }));

    // Questões mais erradas
    const questoesMaisErradas = questoes
      .filter(q => q.vezesRespondida > 0)
      .sort((a, b) => a.taxaAcerto - b.taxaAcerto)
      .slice(0, 10)
      .map(q => ({ questao: q, taxaAcerto: q.taxaAcerto }));

    // Cálculos gerais
    const questoesComResposta = questoes.filter(q => q.vezesRespondida > 0);
    const taxaAcertoGeral = questoesComResposta.length > 0
      ? questoesComResposta.reduce((acc, q) => acc + q.taxaAcerto, 0) / questoesComResposta.length
      : 0;

    const tempoMedioResposta = 180; // 3 minutos padrão

    return {
      totalQuestoes: questoes.length,
      porEspecialidade,
      porTipo,
      porDificuldade,
      questoesMaisRespondidas,
      questoesMaisErradas,
      tempoMedioResposta,
      taxaAcertoGeral
    };
  }

  /**
   * Exporta questões em JSON ou CSV
   */
  exportarQuestoes(questoes: QuestaoMedica[], formato: 'json' | 'csv'): string {
    if (formato === 'json') {
      return JSON.stringify(questoes, null, 2);
    } else {
      // CSV simples
      const headers = ['ID', 'Especialidade', 'Tipo', 'Dificuldade', 'Enunciado', 'Pontos'];
      const rows = questoes.map(q => [
        q.id,
        q.especialidade,
        q.tipo,
        q.dificuldade,
        `"${q.enunciado.replace(/"/g, '""')}"`,
        q.pontos.toString()
      ]);

      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
  }

  /**
   * Importa questões de JSON
   */
  importarQuestoes(dados: string, formato: 'json'): QuestaoMedica[] {
    if (formato === 'json') {
      return JSON.parse(dados);
    }
    return [];
  }

  /**
   * Gera explicação para a questão
   */
  private gerarExplicacao(template: TemplateQuestao, enunciado: string): string {
    const explicacoes = [
      `Esta questão avalia o conhecimento sobre ${template.tipo} em ${template.especialidade}.`,
      `É importante conhecer os critérios diagnósticos para ${template.especialidade}.`,
      `O manejo adequado requer compreensão dos aspectos fisiopatológicos.`,
      `Esta questão verifica a aplicação prática do conhecimento teórico.`
    ];

    return explicacoes[Math.floor(Math.random() * explicacoes.length)];
  }

  /**
   * Gera referências para a questão
   */
  private gerarReferencias(especialidade: Especialidade): string[] {
    const referenciasBase = [
      'Guia de Prática Clínica',
      'Protocolos Hospitalares',
      'Literatura Médica Nacional'
    ];

    const referenciasEspecificas = {
      [Especialidade.MEDICINA_INTERNA]: [
        'Medicina Interna - Harrison',
        'Protocolo de Diabetes SUS'
      ],
      [Especialidade.CARDIOLOGIA]: [
        'Diretrizes Brasileiras de Cardiologia',
        'ESC Guidelines'
      ],
      [Especialidade.PEDIATRIA]: [
        'Nelson Pediatrics',
        'Protocolo de Pedia SUS'
      ]
    };

    return [
      ...referenciasBase,
      ...referenciasEspecificas[especialidade]
    ];
  }

  /**
   * Gera tags para a questão
   */
  private gerarTags(template: TemplateQuestao): string[] {
    return [
      template.especialidade,
      template.tipo,
      template.dificuldade,
      'diagnóstico',
      'clínico'
    ];
  }
}

// Instância global do gerador
export const questionGenerator = new SimpleQuestionGenerator();

// Função utilitária para gerar questões rapidamente
export function gerarQuestoesRapido(especialidade?: Especialidade, quantidade: number = 50): QuestaoMedica[] {
  let templatesParaUsar = templatesQuestoes;

  if (especialidade) {
    templatesParaUsar = templatesQuestoes.filter(t => t.especialidade === especialidade);
  }

  return questionGenerator.gerarQuestoes(templatesParaUsar, quantidade);
}

// Função para gerar questões por especialidade específica
export const geradoresPorEspecialidade = {
  [Especialidade.MEDICINA_INTERNA]: (quantidade: number = 50) =>
    gerarQuestoesRapido(Especialidade.MEDICINA_INTERNA, quantidade),

  [Especialidade.CARDIOLOGIA]: (quantidade: number = 50) =>
    gerarQuestoesRapido(Especialidade.CARDIOLOGIA, quantidade),

  [Especialidade.PEDIATRIA]: (quantidade: number = 50) =>
    gerarQuestoesRapido(Especialidade.PEDIATRIA, quantidade)
};

// Exportar tudo
export default questionGenerator;