/**
 * Demonstração do Sistema de Geração de Questões Médicas
 * Script para testar e validar o funcionamento do sistema
 */

import {
  Especialidade,
  TipoQuestao,
  Dificuldade,
  QuestaoMedica,
  TemplateQuestao,
  EstatisticasQuestoes
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

// Templates expandidos de questões
const templatesQuestoes: TemplateQuestao[] = [
  // Medicina Interna - Diagnóstico Básico
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

  // Medicina Interna - Tratamento Intermediário
  {
    especialidade: Especialidade.MEDICINA_INTERNA,
    tipo: TipoQuestao.TRATAMENTO,
    dificuldade: Dificuldade.INTERMEDIARIO,
    enunciadoTemplate: "Paciente com {diagnostico} apresenta {sintoma}. Qual é o melhor tratamento?",
    alternativasTemplates: [
      "{medicamento1}",
      "{medicamento2}",
      "{procedimento1}",
      "Observação apenas"
    ],
    dadosTemplate: {
      diagnostico: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].doencas[Math.floor(Math.random() * 10)]; },
      sintoma: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].sintomas[Math.floor(Math.random() * 10)]; },
      medicamento1: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].medicamentos[Math.floor(Math.random() * 10)]; },
      medicamento2: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].medicamentos[Math.floor(Math.random() * 10)]; },
      procedimento1: function() { return dadosMedicos[Especialidade.MEDICINA_INTERNA].procedimentos[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 15,
    tempoEstimado: 4
  },

  // Cardiologia - Fisiopatologia Avançado
  {
    especialidade: Especialidade.CARDIOLOGIA,
    tipo: TipoQuestao.FISIOPATOLOGIA,
    dificuldade: Dificuldade.AVANCADO,
    enunciadoTemplate: "No contexto de {doenca}, qual é o principal mecanismo fisiopatológico envolvido?",
    alternativasTemplates: [
      "Obstrução coronariana progressiva",
      "Insuficiência valvar aguda",
      "Disfunção do nodo sinusal",
      "Insuficiência ventricular esquerda"
    ],
    dadosTemplate: {
      doenca: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].doencas[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 20,
    tempoEstimado: 5
  },

  // Cardiologia - Tratamento Básico
  {
    especialidade: Especialidade.CARDIOLOGIA,
    tipo: TipoQuestao.TRATAMENTO,
    dificuldade: Dificuldade.BASICO,
    enunciadoTemplate: "Paciente com {diagnostico} está em tratamento com {medicamento1}. Qual seria a melhor opção terapêutica adicional?",
    alternativasTemplates: [
      "{medicamento2}",
      "{medicamento3}",
      "{procedimento1}",
      "Apenas observação clínica"
    ],
    dadosTemplate: {
      diagnostico: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].doencas[Math.floor(Math.random() * 10)]; },
      medicamento1: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].medicamentos[Math.floor(Math.random() * 10)]; },
      medicamento2: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].medicamentos[Math.floor(Math.random() * 10)]; },
      medicamento3: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].medicamentos[Math.floor(Math.random() * 10)]; },
      procedimento1: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].procedimentos[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 12,
    tempoEstimado: 4
  },

  // Pediatria - Diagnóstico Básico
  {
    especialidade: Especialidade.PEDIATRIA,
    tipo: TipoQuestao.DIAGNOSTICO,
    dificuldade: Dificuldade.BASICO,
    enunciadoTemplate: "Criança de {idade} anos apresenta {sintoma}. Qual é o diagnóstico mais provável?",
    alternativasTemplates: [
      "{doenca1}",
      "{doenca2}",
      "{doenca3}",
      "Virose comum"
    ],
    dadosTemplate: {
      idade: [2, 4, 6, 8, 10, 12],
      sintoma: function() { return dadosMedicos[Especialidade.PEDIATRIA].sintomas[Math.floor(Math.random() * 10)]; },
      doenca1: function() { return dadosMedicos[Especialidade.PEDIATRIA].doencas[Math.floor(Math.random() * 10)]; },
      doenca2: function() { return dadosMedicos[Especialidade.PEDIATRIA].doencas[Math.floor(Math.random() * 10)]; },
      doenca3: function() { return dadosMedicos[Especialidade.PEDIATRIA].doencas[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 8,
    tempoEstimado: 3
  },

  // Pediatria - Tratamento Intermediário
  {
    especialidade: Especialidade.PEDIATRIA,
    tipo: TipoQuestao.TRATAMENTO,
    dificuldade: Dificuldade.INTERMEDIARIO,
    enunciadoTemplate: "Paciente pediátrico com {diagnostico}. Qual é o tratamento de primeira linha?",
    alternativasTemplates: [
      "{medicamento1}",
      "{medicamento2}",
      "{procedimento1}",
      "Suporte sintomático"
    ],
    dadosTemplate: {
      diagnostico: function() { return dadosMedicos[Especialidade.PEDIATRIA].doencas[Math.floor(Math.random() * 10)]; },
      medicamento1: function() { return dadosMedicos[Especialidade.PEDIATRIA].medicamentos[Math.floor(Math.random() * 10)]; },
      medicamento2: function() { return dadosMedicos[Especialidade.PEDIATRIA].medicamentos[Math.floor(Math.random() * 10)]; },
      procedimento1: function() { return dadosMedicos[Especialidade.PEDIATRIA].procedimentos[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 14,
    tempoEstimado: 4
  },

  // Medicina Interna - Epidemiologia Avançado
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
    respostaCorreta: 1,
    pontos: 20,
    tempoEstimado: 5
  },

  // Cardiologia - Profilaxia Básico
  {
    especialidade: Especialidade.CARDIOLOGIA,
    tipo: TipoQuestao.PROFILAXIA,
    dificuldade: Dificuldade.BASICO,
    enunciadoTemplate: "Qual é a principal medida preventiva para {doenca}?",
    alternativasTemplates: [
      "Controle da pressão arterial",
      "Uso de anticoagulantes",
      "Cirurgia profilática",
      "Fisioterapia intensiva"
    ],
    dadosTemplate: {
      doenca: function() { return dadosMedicos[Especialidade.CARDIOLOGIA].doencas[Math.floor(Math.random() * 10)]; }
    },
    respostaCorreta: 0,
    pontos: 12,
    tempoEstimado: 3
  }
];

/**
 * Gerador de questões simplificado
 */
class SimpleQuestionGenerator {

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
}

/**
 * Função principal de demonstração
 */
function demonstrarSistema() {
  console.log('🏥 Sistema de Questões Médicas - Demonstração\n');

  // Inicializar gerador
  const gerador = new SimpleQuestionGenerator();

  // Gerar questões por especialidade
  console.log('📋 Gerando questões...\n');

  const questoesMedicinaInterna = gerador.gerarQuestoes(
    templatesQuestoes.filter(t => t.especialidade === Especialidade.MEDICINA_INTERNA),
    50
  );

  const questoesCardiologia = gerador.gerarQuestoes(
    templatesQuestoes.filter(t => t.especialidade === Especialidade.CARDIOLOGIA),
    50
  );

  const questoesPediatria = gerador.gerarQuestoes(
    templatesQuestoes.filter(t => t.especialidade === Especialidade.PEDIATRIA),
    50
  );

  const todasAsQuestoes = [
    ...questoesMedicinaInterna,
    ...questoesCardiologia,
    ...questoesPediatria
  ];

  console.log(`✅ Geradas ${todasAsQuestoes.length} questões`);
  console.log(`   - Medicina Interna: ${questoesMedicinaInterna.length}`);
  console.log(`   - Cardiologia: ${questoesCardiologia.length}`);
  console.log(`   - Pediatria: ${questoesPediatria.length}\n`);

  // Mostrar algumas questões de exemplo
  console.log('📝 Exemplos de Questões Geradas:\n');

  todasAsQuestoes.slice(0, 3).forEach((questao, index) => {
    console.log(`Questão ${index + 1}:`);
    console.log(`  ID: ${questao.id}`);
    console.log(`  Especialidade: ${questao.especialidade}`);
    console.log(`  Tipo: ${questao.tipo}`);
    console.log(`  Dificuldade: ${questao.dificuldade}`);
    console.log(`  Enunciado: ${questao.enunciado}`);
    console.log(`  Alternativas:`);
    questao.alternativas.forEach((alt, i) => {
      console.log(`    ${String.fromCharCode(65 + i)}. ${alt}`);
    });
    console.log(`  Resposta Correta: ${String.fromCharCode(65 + questao.respostaCorreta)}`);
    console.log(`  Pontos: ${questao.pontos}`);
    console.log(`  Tempo Estimado: ${questao.tempoEstimado} min\n`);
  });

  // Calcular e mostrar estatísticas
  const estatisticas = gerador.calcularEstatisticas(todasAsQuestoes);

  console.log('📊 Estatísticas do Sistema:\n');
  console.log(`Total de Questões: ${estatisticas.totalQuestoes}`);
  console.log('\nPor Especialidade:');
  Object.entries(estatisticas.porEspecialidade).forEach(([esp, qtd]) => {
    console.log(`  ${esp}: ${qtd} questões`);
  });
  console.log('\nPor Tipo:');
  Object.entries(estatisticas.porTipo).forEach(([tipo, qtd]) => {
    console.log(`  ${tipo}: ${qtd} questões`);
  });
  console.log('\nPor Dificuldade:');
  Object.entries(estatisticas.porDificuldade).forEach(([dif, qtd]) => {
    console.log(`  ${dif}: ${qtd} questões`);
  });

  console.log(`\nTempo Médio de Resposta: ${estatisticas.tempoMedioResposta} segundos`);
  console.log(`Taxa de Acerto Geral: ${Math.round(estatisticas.taxaAcertoGeral * 100)}%`);

  // Salvar dados para demonstração web
  const dadosParaWeb = {
    questoes: todasAsQuestoes,
    estatisticas: estatisticas,
    timestamp: new Date().toISOString()
  };

  console.log('\n💾 Salvando dados para interface web...');
  console.log('   Arquivo: public/demo-data.json');

  return {
    questoes: todasAsQuestoes,
    estatisticas: estatisticas,
    dadosJson: JSON.stringify(dadosParaWeb, null, 2)
  };
}

// Executar demonstração se for chamado diretamente
if (require.main === module) {
  const resultado = demonstrarSistema();

  // Salvar arquivo JSON
  const fs = require('fs');
  const path = require('path');

  const outputPath = path.join(__dirname, '../public/demo-data.json');
  fs.writeFileSync(outputPath, resultado.dadosJson);

  console.log(`\n✅ Dados salvos em: ${outputPath}`);
  console.log('\n🚀 Para visualizar a interface web, abra:');
  console.log('   public/demo-questoes-medicas.html');
  console.log('\n🎯 Funcionalidades implementadas:');
  console.log('   ✓ Gerador de questões em volume');
  console.log('   ✓ Templates por especialidade');
  console.log('   ✓ Sistema de filtros');
  console.log('   ✓ Interface web responsiva');
  console.log('   ✓ Exportação JSON/CSV');
  console.log('   ✓ Estatísticas em tempo real');
}

export {
  demonstrarSistema,
  SimpleQuestionGenerator,
  templatesQuestoes,
  dadosMedicos
};