/**
 * TIPOS PARA CASOS CLÍNICOS INTERATIVOS - DARWIN-MFC
 * ===================================================
 */

export interface CasoClinico {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: CategoriaCaso;
  dificuldade: 'iniciante' | 'intermediario' | 'avancado';
  tempoEstimado: number; // em minutos
  autor?: string;
  ultimaAtualizacao: string;
  
  // Apresentação do caso
  apresentacao: ApresentacaoCaso;
  
  // Etapas do caso
  etapas: EtapaCaso[];
  
  // Desfecho
  desfecho: DesfechoCaso;
  
  // Metadados
  objetivosAprendizagem: string[];
  competencias: string[];
  doencasRelacionadas: string[];
  medicamentosRelacionados: string[];
  calculadorasRelacionadas: string[];
  referencias: string[];
  tags: string[];
}

export type CategoriaCaso = 
  | 'cardiovascular'
  | 'respiratorio'
  | 'endocrino'
  | 'neurologico'
  | 'gastro'
  | 'infeccioso'
  | 'psiquiatrico'
  | 'pediatrico'
  | 'geriatrico'
  | 'gineco_obstetricia'
  | 'urgencia'
  | 'cronico';

export interface ApresentacaoCaso {
  paciente: {
    nome: string;
    idade: number;
    sexo: 'M' | 'F';
    profissao?: string;
    estadoCivil?: string;
  };
  queixaPrincipal: string;
  historiaDoencaAtual: string;
  imagemPaciente?: string; // URL opcional para imagem ilustrativa
}

export interface EtapaCaso {
  id: string;
  titulo: string;
  tipo: TipoEtapa;
  conteudo: ConteudoEtapa;
  pergunta?: PerguntaCaso;
  feedback?: FeedbackEtapa;
}

export type TipoEtapa = 
  | 'anamnese'
  | 'exame_fisico'
  | 'exames_complementares'
  | 'diagnostico'
  | 'tratamento'
  | 'acompanhamento'
  | 'educacao';

export interface ConteudoEtapa {
  texto: string;
  dados?: Record<string, string | number>; // Dados estruturados (sinais vitais, labs, etc.)
  imagens?: ImagemCaso[];
  dicas?: string[];
}

export interface ImagemCaso {
  url: string;
  legenda: string;
  tipo: 'ecg' | 'raio_x' | 'tc' | 'rm' | 'lab' | 'foto' | 'outro';
}

export interface PerguntaCaso {
  enunciado: string;
  tipo: 'multipla_escolha' | 'verdadeiro_falso' | 'ordenacao' | 'dissertativa';
  opcoes?: OpcaoResposta[];
  respostaCorreta: string | string[];
  explicacao: string;
  pontos?: number;
}

export interface OpcaoResposta {
  id: string;
  texto: string;
  correta: boolean;
}

export interface FeedbackEtapa {
  correto: string;
  incorreto: string;
  parcial?: string;
}

export interface DesfechoCaso {
  resumo: string;
  diagnosticoFinal: string;
  tratamentoRealizado: string;
  evolucao: string;
  licoesPrincipais: string[];
  errosComuns: string[];
  proximosPassos?: string[];
}

// Estado do progresso do usuário
export interface ProgressoCaso {
  casoId: string;
  usuarioId?: string;
  etapaAtual: number;
  respostas: RespostaUsuario[];
  pontuacao: number;
  iniciado: Date;
  finalizado?: Date;
  status: 'em_andamento' | 'completo' | 'abandonado';
}

export interface RespostaUsuario {
  etapaId: string;
  resposta: string | string[];
  correta: boolean;
  timestamp: Date;
}
