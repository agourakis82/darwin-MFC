/**
 * Dados de Exemplo para Sistema de Questões Médicas
 * 150+ questões geradas automaticamente
 */

import {
  Especialidade,
  TipoQuestao,
  Dificuldade,
  QuestaoMedica
} from '../lib/simple-question-system';
import { gerarQuestoesRapido, geradoresPorEspecialidade } from '../scripts/simple-question-generator';

// Gerar 50 questões por especialidade (150 total)
export const questoesExemplo: QuestaoMedica[] = [
  // Medicina Interna (50 questões)
  ...geradoresPorEspecialidade[Especialidade.MEDICINA_INTERNA](50),

  // Cardiologia (50 questões)
  ...geradoresPorEspecialidade[Especialidade.CARDIOLOGIA](50),

  // Pediatria (50 questões)
  ...geradoresPorEspecialidade[Especialidade.PEDIATRIA](50)
];

// Questões específicas adicionais para demonstração
export const questoesEspecificasExemplo: QuestaoMedica[] = [
  {
    id: 'demo_001',
    especialidade: Especialidade.MEDICINA_INTERNA,
    tipo: TipoQuestao.DIAGNOSTICO,
    dificuldade: Dificuldade.BASICO,
    enunciado: "Paciente de 45 anos, gênero masculino, apresenta dispneia. Qual é o diagnóstico mais provável?",
    alternativas: [
      "Hipertensão arterial sistêmica",
      "Diabetes mellitus tipo 2",
      "Doença pulmonar obstrutiva crônica",
      "Gastrite"
    ],
    respostaCorreta: 2,
    explicacao: "A dispneia associada a outros sintomas respiratórios sugere DPOC em paciente com fatores de risco.",
    referencias: ["Protocolo de DPOC - Ministério da Saúde"],
    tags: ["medicina-interna", "diagnostico", "basico"],
    pontos: 10,
    tempoEstimado: 3,
    criadaEm: new Date('2024-01-01'),
    ultimaModificacao: new Date('2024-01-01'),
    vezesRespondida: 25,
    taxaAcerto: 0.72
  },

  {
    id: 'demo_002',
    especialidade: Especialidade.CARDIOLOGIA,
    tipo: TipoQuestao.TRATAMENTO,
    dificuldade: Dificuldade.INTERMEDIARIO,
    enunciado: "Paciente com infarto agudo do miocárdio está em tratamento com aspirina. Qual seria a melhor opção terapêutica adicional?",
    alternativas: [
      "Sinvastatina",
      "Losartana",
      "Clopidogrel",
      "Apenas observação clínica"
    ],
    respostaCorreta: 2,
    explicacao: "A terapia antiagregante dupla (aspirina + clopidogrel) é padrão no tratamento do IAM.",
    referencias: ["Diretrizes Brasileiras de Cardiologia - SBC"],
    tags: ["cardiologia", "tratamento", "intermediario"],
    pontos: 15,
    tempoEstimado: 4,
    criadaEm: new Date('2024-01-01'),
    ultimaModificacao: new Date('2024-01-01'),
    vezesRespondida: 18,
    taxaAcerto: 0.83
  },

  {
    id: 'demo_003',
    especialidade: Especialidade.PEDIATRIA,
    tipo: TipoQuestao.FISIOPATOLOGIA,
    dificuldade: Dificuldade.BASICO,
    enunciado: "Na asma, qual é o principal mecanismo fisiopatológico envolvido?",
    alternativas: [
      "Inflamação e edema da mucosa",
      "Infecção bacteriana invasiva",
      "Obstrução mecânica das vias aéreas",
      "Deficiência enzimática específica"
    ],
    respostaCorreta: 0,
    explicacao: "A asma é caracterizada por inflamação crônica das vias aéreas com hiperresponsividade brônquica.",
    referencias: ["Nelson Pediatrics", "Protocolo de Asma - SBPT"],
    tags: ["pediatria", "fisiopatologia", "basico"],
    pontos: 12,
    tempoEstimado: 3,
    criadaEm: new Date('2024-01-01'),
    ultimaModificacao: new Date('2024-01-01'),
    vezesRespondida: 31,
    taxaAcerto: 0.65
  }
];

// Estatísticas de exemplo para demonstração
export const estatisticasDemo = {
  totalQuestoes: questoesExemplo.length + questoesEspecificasExemplo.length,
  porEspecialidade: {
    [Especialidade.MEDICINA_INTERNA]: 50,
    [Especialidade.CARDIOLOGIA]: 50,
    [Especialidade.PEDIATRIA]: 50
  },
  porTipo: {
    [TipoQuestao.DIAGNOSTICO]: 60,
    [TipoQuestao.TRATAMENTO]: 45,
    [TipoQuestao.FISIOPATOLOGIA]: 25,
    [TipoQuestao.EPIDEMIOLOGIA]: 15,
    [TipoQuestao.PROFILAXIA]: 5
  },
  porDificuldade: {
    [Dificuldade.BASICO]: 90,
    [Dificuldade.INTERMEDIARIO]: 45,
    [Dificuldade.AVANCADO]: 15
  },
  questoesMaisRespondidas: questoesEspecificasExemplo
    .sort((a, b) => b.vezesRespondida - a.vezesRespondida)
    .slice(0, 3)
    .map(q => ({ questao: q, respostas: q.vezesRespondida })),

  questoesMaisErradas: questoesEspecificasExemplo
    .sort((a, b) => a.taxaAcerto - b.taxaAcerto)
    .slice(0, 3)
    .map(q => ({ questao: q, taxaAcerto: q.taxaAcerto })),

  tempoMedioResposta: 180,
  taxaAcertoGeral: 0.73
};

// Sessões de exemplo para demonstração
export const sessoesExemplo = [
  {
    id: 'sessao_001',
    data: '2024-01-15',
    especialidade: Especialidade.MEDICINA_INTERNA,
    questoesRespondidas: 20,
    corretas: 16,
    tempoTotal: 1800, // 30 minutos
    pontuacao: 240
  },
  {
    id: 'sessao_002',
    data: '2024-01-16',
    especialidade: Especialidade.CARDIOLOGIA,
    questoesRespondidas: 15,
    corretas: 12,
    tempoTotal: 1200, // 20 minutos
    pontuacao: 180
  },
  {
    id: 'sessao_003',
    data: '2024-01-17',
    especialidade: Especialidade.PEDIATRIA,
    questoesRespondidas: 25,
    corretas: 18,
    tempoTotal: 2100, // 35 minutos
    pontuacao: 270
  }
];

// Todas as questões para demonstração
export const todasAsQuestoes = [...questoesExemplo, ...questoesEspecificasExemplo];

// Salvar dados no localStorage para interface web
export function salvarDadosLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('questoes-medicas', JSON.stringify(todasAsQuestoes));
    localStorage.setItem('estatisticas-medicas', JSON.stringify(estatisticasDemo));
    localStorage.setItem('sessoes-estudo', JSON.stringify(sessoesExemplo));
  }
}

// Carregar dados do localStorage
export function carregarDadosLocalStorage() {
  if (typeof window !== 'undefined') {
    const questoes = localStorage.getItem('questoes-medicas');
    const estatisticas = localStorage.getItem('estatisticas-medicas');
    const sessoes = localStorage.getItem('sessoes-estudo');

    return {
      questoes: questoes ? JSON.parse(questoes) : [],
      estatisticas: estatisticas ? JSON.parse(estatisticas) : null,
      sessoes: sessoes ? JSON.parse(sessoes) : []
    };
  }
  return { questoes: [], estatisticas: null, sessoes: [] };
}

// Função para gerar novo conjunto de questões
export function gerarNovoConjunto() {
  return {
    medicinaInterna: geradoresPorEspecialidade[Especialidade.MEDICINA_INTERNA](50),
    cardiologia: geradoresPorEspecialidade[Especialidade.CARDIOLOGIA](50),
    pediatria: geradoresPorEspecialidade[Especialidade.PEDIATRIA](50)
  };
}

// Exportar tudo
export default {
  questoesExemplo,
  questoesEspecificasExemplo,
  todasAsQuestoes,
  estatisticasDemo,
  sessoesExemplo,
  salvarDadosLocalStorage,
  carregarDadosLocalStorage,
  gerarNovoConjunto
};