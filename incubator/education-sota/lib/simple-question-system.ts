/**
 * Sistema de Tipos e Estruturas para Questões Médicas Simples
 * Foco em simplicidade e implementação rápida
 */

// Especialidades médicas principais
export enum Especialidade {
  MEDICINA_INTERNA = 'medicina-interna',
  CARDIOLOGIA = 'cardiologia',
  PEDIATRIA = 'pediatria'
}

// Tipos de questão médica
export enum TipoQuestao {
  DIAGNOSTICO = 'diagnostico',
  TRATAMENTO = 'tratamento',
  FISIOPATOLOGIA = 'fisiopatologia',
  EPIDEMIOLOGIA = 'epidemiologia',
  PROFILAXIA = 'profilaxia'
}

// Níveis de dificuldade
export enum Dificuldade {
  BASICO = 'basico',
  INTERMEDIARIO = 'intermediario',
  AVANCADO = 'avancado'
}

// Estrutura de uma questão médica
export interface QuestaoMedica {
  id: string;
  especialidade: Especialidade;
  tipo: TipoQuestao;
  dificuldade: Dificuldade;

  // Conteúdo da questão
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number; // índice da resposta correta

  // Metadados
  explicacao?: string;
  referencias?: string[];
  tags?: string[];

  // Sistema de pontuação
  pontos: number;
  tempoEstimado: number; // em minutos

  // Dados de uso
  criadaEm: Date;
 ultimaModificacao: Date;
  vezesRespondida: number;
  taxaAcerto: number;
}

// Template para gerar questões
export interface TemplateQuestao {
  especialidade: Especialidade;
  tipo: TipoQuestao;
  dificuldade: Dificuldade;

  // Estrutura do enunciado com placeholders
  enunciadoTemplate: string;

  // Estrutura das alternativas com placeholders
  alternativasTemplates: string[];

  // Dados para preencher os placeholders
  dadosTemplate: any;

  // Resposta correta
  respostaCorreta: number;

  // Configurações
  pontos: number;
  tempoEstimado: number;
}

// Filtros para buscar questões
export interface FiltroQuestoes {
  especialidade?: Especialidade[];
  tipo?: TipoQuestao[];
  dificuldade?: Dificuldade[];
  tags?: string[];
  apenasComTaxaAcerto?: boolean;
  limite?: number;
}

// Estatísticas do sistema
export interface EstatisticasQuestoes {
  totalQuestoes: number;
  porEspecialidade: Record<Especialidade, number>;
  porTipo: Record<TipoQuestao, number>;
  porDificuldade: Record<Dificuldade, number>;

  // Estatísticas de uso
  questoesMaisRespondidas: Array<{
    questao: QuestaoMedica;
    respostas: number;
  }>;

  questoesMaisErradas: Array<{
    questao: QuestaoMedica;
    taxaAcerto: number;
  }>;

  // Performance geral
  tempoMedioResposta: number;
  taxaAcertoGeral: number;
}

// Configuração do sistema
export interface ConfiguracaoSistema {
  maxQuestoesPorSessao: number;
  tempoLimitePorQuestao: number;
  pontosPorRespostaCorreta: number;
  pontosPorRespostaIncorreta: number;

  // Filtros padrão
  filtrosDefault: FiltroQuestoes;

  // Cache
  usarCache: boolean;
  tempoCache: number; // em minutos
}

// Dados médicos por especialidade
export interface DadosEspecialidade {
  [Especialidade.MEDICINA_INTERNA]: {
    doencas: string[];
    sintomas: string[];
    medicamentos: string[];
    procedimentos: string[];
  };
  [Especialidade.CARDIOLOGIA]: {
    doencas: string[];
    sintomas: string[];
    medicamentos: string[];
    procedimentos: string[];
  };
  [Especialidade.PEDIATRIA]: {
    doencas: string[];
    sintomas: string[];
    medicamentos: string[];
    procedimentos: string[];
  };
}

// Resposta do usuário
export interface RespostaUsuario {
  questaoId: string;
  respostaEscolhida: number;
  tempoResposta: number; // em segundos
  correta: boolean;
  respondidaEm: Date;
}

// Sessão de estudo
export interface SessaoEstudo {
  id: string;
  questoes: QuestaoMedica[];
  respostas: RespostaUsuario[];

  estatisticas: {
    inicio: Date;
    fim?: Date;
    pontuacaoTotal: number;
    questoesCorretas: number;
    questoesIncorretas: number;
    tempoTotal: number;
  };
}

// Sistema de pontuação
export interface SistemaPontuacao {
  calcularPontos(questao: QuestaoMedica, correta: boolean, tempoResposta: number): number;
  calcularNivel(pontos: number): number;
  calcularExperiencia(pontos: number): number;
}

// Interface do gerador
export interface GeradorQuestoes {
  gerarQuestoes(templates: TemplateQuestao[], quantidade: number): QuestaoMedica[];
  aplicarFiltros(questoes: QuestaoMedica[], filtros: FiltroQuestoes): QuestaoMedica[];
  calcularEstatisticas(questoes: QuestaoMedica[]): EstatisticasQuestoes;
  exportarQuestoes(questoes: QuestaoMedica[], formato: 'json' | 'csv'): string;
  importarQuestoes(dados: string, formato: 'json'): QuestaoMedica[];
}