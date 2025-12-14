/**
 * TIPOS PARA MÓDULO DE PROTOCOLOS - DARWIN-MFC
 * =============================================
 * 
 * Estruturas TypeScript para protocolos de conduta clínica
 * Baseado em diretrizes nacionais e internacionais
 * 
 * Referências principais:
 * - Sociedades médicas brasileiras (SBC, SBD, SBMFC, etc.)
 * - Guidelines internacionais (AHA, ESC, ADA, GINA, GOLD, etc.)
 * - Cadernos de Atenção Básica - Ministério da Saúde
 */

import { Citation } from './references';

// =============================================================================
// CATEGORIAS DE PROTOCOLOS
// =============================================================================

export type CategoriaProtocolo =
  | 'cardiovascular'
  | 'metabolico'
  | 'respiratorio'
  | 'saude_mental'
  | 'infecciosas'
  | 'pediatria'
  | 'gestacao'
  | 'urgencia'
  | 'preventivo'
  | 'outros';

export const CATEGORIAS_PROTOCOLO: Record<CategoriaProtocolo, { label: string; icon: string; color: string }> = {
  cardiovascular: { label: 'Cardiovascular', icon: 'Heart', color: 'from-red-500 to-rose-600' },
  metabolico: { label: 'Metabólico', icon: 'Activity', color: 'from-amber-500 to-orange-600' },
  respiratorio: { label: 'Respiratório', icon: 'Wind', color: 'from-cyan-500 to-blue-600' },
  saude_mental: { label: 'Saúde Mental', icon: 'Brain', color: 'from-purple-500 to-violet-600' },
  infecciosas: { label: 'Infecciosas', icon: 'Bug', color: 'from-green-500 to-emerald-600' },
  pediatria: { label: 'Pediatria', icon: 'Baby', color: 'from-sky-500 to-blue-600' },
  gestacao: { label: 'Gestação', icon: 'Heart', color: 'from-pink-500 to-rose-600' },
  urgencia: { label: 'Urgência', icon: 'AlertTriangle', color: 'from-red-600 to-red-700' },
  preventivo: { label: 'Preventivo', icon: 'Shield', color: 'from-teal-500 to-emerald-600' },
  outros: { label: 'Outros', icon: 'FileText', color: 'from-gray-500 to-slate-600' },
};

// =============================================================================
// NÍVEL DE EVIDÊNCIA
// =============================================================================

export type NivelEvidencia = 'A' | 'B' | 'C' | 'D' | 'E' | 'GPP';

export const NIVEIS_EVIDENCIA: Record<NivelEvidencia, { label: string; descricao: string }> = {
  A: { label: 'Nível A', descricao: 'Múltiplos ECR ou metanálises de alta qualidade' },
  B: { label: 'Nível B', descricao: 'ECR único ou estudos não randomizados de alta qualidade' },
  C: { label: 'Nível C', descricao: 'Estudos observacionais ou opinião de especialistas' },
  D: { label: 'Nível D', descricao: 'Séries de casos ou estudos de baixa qualidade' },
  E: { label: 'Nível E', descricao: 'Opinião de especialistas sem evidência direta' },
  GPP: { label: 'GPP', descricao: 'Boa Prática Clínica (Good Practice Point)' },
};

// =============================================================================
// GRAU DE RECOMENDAÇÃO
// =============================================================================

export type GrauRecomendacao = 'I' | 'IIa' | 'IIb' | 'III';

export const GRAUS_RECOMENDACAO: Record<GrauRecomendacao, { label: string; descricao: string; color: string }> = {
  I: { 
    label: 'Classe I', 
    descricao: 'Evidência/consenso que é benéfico, útil e efetivo', 
    color: 'bg-green-500' 
  },
  IIa: { 
    label: 'Classe IIa', 
    descricao: 'Peso da evidência/opinião favorece utilidade/eficácia', 
    color: 'bg-lime-500' 
  },
  IIb: { 
    label: 'Classe IIb', 
    descricao: 'Utilidade/eficácia menos estabelecida', 
    color: 'bg-yellow-500' 
  },
  III: { 
    label: 'Classe III', 
    descricao: 'Não é útil/efetivo ou pode ser prejudicial', 
    color: 'bg-red-500' 
  },
};

// =============================================================================
// ESTRUTURA DO FLOWCHART
// =============================================================================

export type TipoNoFlowchart = 
  | 'inicio'
  | 'decisao'
  | 'acao'
  | 'exame'
  | 'medicamento'
  | 'encaminhamento'
  | 'alerta'
  | 'fim';

export interface NoFlowchart {
  /** Identificador único do nó */
  id: string;
  
  /** Tipo do nó */
  tipo: TipoNoFlowchart;
  
  /** Texto do nó */
  texto: string;
  
  /** Descrição expandida (tooltip) */
  descricao?: string;
  
  /** Próximos nós (para decisões, pode ter múltiplos) */
  proximos?: {
    condicao?: string; // Para nós de decisão
    noId: string;
  }[];
  
  /** Nível de evidência para ações */
  evidencia?: NivelEvidencia;
  
  /** Grau de recomendação */
  recomendacao?: GrauRecomendacao;
  
  /** Citações específicas do nó */
  citations?: Citation[];
}

// =============================================================================
// ETAPA DO PROTOCOLO
// =============================================================================

export interface EtapaProtocolo {
  /** Identificador */
  id: string;
  
  /** Título da etapa */
  titulo: string;
  
  /** Descrição */
  descricao: string;
  
  /** Ações/condutas da etapa */
  acoes: {
    texto: string;
    evidencia?: NivelEvidencia;
    recomendacao?: GrauRecomendacao;
  }[];
  
  /** Critérios para avançar */
  criteriosAvanco?: string[];
  
  /** Critérios para encaminhar */
  criteriosEncaminhamento?: string[];
  
  /** Tempo estimado na etapa */
  tempoEstimado?: string;
  
  /** Citações */
  citations: Citation[];
}

// =============================================================================
// INTERFACE PRINCIPAL - PROTOCOLO
// =============================================================================

export interface Protocolo {
  /** Identificador único */
  id: string;
  
  /** Título do protocolo */
  titulo: string;
  
  /** Subtítulo ou descrição curta */
  subtitulo?: string;
  
  /** Categoria */
  categoria: CategoriaProtocolo;
  
  /** Objetivo do protocolo */
  objetivo: string;
  
  /** População-alvo */
  populacaoAlvo: string;
  
  /** Critérios de inclusão */
  criteriosInclusao: string[];
  
  /** Critérios de exclusão */
  criteriosExclusao?: string[];
  
  /** Resumo executivo (QuickView) */
  resumoExecutivo: {
    passosPrincipais: string[];
    alertas: string[];
    metasPrincipais: string[];
  };
  
  /** Etapas do protocolo (versão textual) */
  etapas: EtapaProtocolo[];
  
  /** Flowchart interativo */
  flowchart?: {
    nos: NoFlowchart[];
    noInicial: string;
  };
  
  /** Código Mermaid para renderização */
  mermaidCode?: string;
  
  /** Metas terapêuticas específicas */
  metasTerapeuticas?: {
    parametro: string;
    meta: string;
    evidencia?: NivelEvidencia;
  }[];
  
  /** Monitorização recomendada */
  monitorizacao?: {
    parametro: string;
    frequencia: string;
    observacao?: string;
  }[];
  
  /** Quando encaminhar ao especialista */
  criteriosEncaminhamento: string[];
  
  /** IDs das doenças relacionadas */
  doencasRelacionadas: string[];
  
  /** IDs dos medicamentos do protocolo */
  medicamentos: string[];
  
  /** IDs das calculadoras relevantes */
  calculadoras: string[];
  
  /** Fontes/Guidelines de referência */
  fontesReferencia: {
    nome: string;
    ano: string;
    url?: string;
  }[];
  
  /** Citações */
  citations: Citation[];
  
  /** Data da última atualização */
  lastUpdate: string;
  
  /** Tags para busca */
  tags?: string[];
}

// =============================================================================
// TIPOS AUXILIARES
// =============================================================================

export interface ProtocoloSearchResult {
  protocolo: Protocolo;
  matchType: 'titulo' | 'categoria' | 'doenca' | 'tag';
  score: number;
}

export interface ProtocolosByCategoria {
  categoria: CategoriaProtocolo;
  label: string;
  protocolos: Protocolo[];
  count: number;
}

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

export function getProtocolosByCategoria(protocolos: Protocolo[]): ProtocolosByCategoria[] {
  const grouped = protocolos.reduce((acc, prot) => {
    if (!acc[prot.categoria]) {
      acc[prot.categoria] = [];
    }
    acc[prot.categoria].push(prot);
    return acc;
  }, {} as Record<CategoriaProtocolo, Protocolo[]>);

  return Object.entries(grouped).map(([categoria, prots]) => ({
    categoria: categoria as CategoriaProtocolo,
    label: CATEGORIAS_PROTOCOLO[categoria as CategoriaProtocolo].label,
    protocolos: prots,
    count: prots.length,
  }));
}

export function generateMermaidFromFlowchart(flowchart: { nos: NoFlowchart[]; noInicial: string }): string {
  const lines: string[] = ['flowchart TB'];
  
  const nodeStyles: Record<TipoNoFlowchart, string> = {
    inicio: '([%s])',
    decisao: '{%s}',
    acao: '[%s]',
    exame: '[[%s]]',
    medicamento: '[/%s/]',
    encaminhamento: '>%s]',
    alerta: '{{%s}}',
    fim: '((%s))',
  };
  
  for (const no of flowchart.nos) {
    const format = nodeStyles[no.tipo] || '[%s]';
    const nodeText = format.replace('%s', no.texto.replace(/"/g, "'"));
    lines.push(`    ${no.id}${nodeText}`);
    
    if (no.proximos) {
      for (const prox of no.proximos) {
        if (prox.condicao) {
          lines.push(`    ${no.id} -->|"${prox.condicao}"| ${prox.noId}`);
        } else {
          lines.push(`    ${no.id} --> ${prox.noId}`);
        }
      }
    }
  }
  
  return lines.join('\n');
}

export function getProtocolosByDoenca(
  protocolos: Protocolo[], 
  doencaId: string
): Protocolo[] {
  return protocolos.filter(p => p.doencasRelacionadas.includes(doencaId));
}

