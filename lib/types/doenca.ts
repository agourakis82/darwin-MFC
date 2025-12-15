/**
 * TIPOS PARA MÓDULO DE DOENÇAS - DARWIN-MFC
 * ==========================================
 * 
 * Estruturas TypeScript para o sistema de doenças da APS
 * Padrão Q1: Todas as doenças com citações validadas
 * 
 * Referências principais:
 * - CIAP-2 (Classificação Internacional de Atenção Primária)
 * - CID-10/CID-11 (Classificação Internacional de Doenças)
 * - Diretrizes brasileiras (SBC, SBD, SBMFC, etc.)
 */

import { Citation } from './references';

// =============================================================================
// CATEGORIAS DE DOENÇAS
// =============================================================================

export type CategoriaDoenca = 
  | 'cardiovascular'
  | 'metabolico'
  | 'respiratorio'
  | 'musculoesqueletico'
  | 'saude_mental'
  | 'infecciosas'
  | 'dermatologico'
  | 'gastrointestinal'
  | 'neurologico'
  | 'endocrino'
  | 'hematologico'
  | 'urologico'
  | 'ginecologico'
  | 'pediatrico'
  | 'geriatrico'
  | 'outros';

export const CATEGORIAS_DOENCA: Record<CategoriaDoenca, { label: string; icon: string; color: string }> = {
  cardiovascular: { label: 'Cardiovascular', icon: 'Heart', color: 'from-red-500 to-rose-600' },
  metabolico: { label: 'Metabólico', icon: 'Activity', color: 'from-amber-500 to-orange-600' },
  respiratorio: { label: 'Respiratório', icon: 'Wind', color: 'from-cyan-500 to-blue-600' },
  musculoesqueletico: { label: 'Musculoesquelético', icon: 'Bone', color: 'from-stone-500 to-zinc-600' },
  saude_mental: { label: 'Saúde Mental', icon: 'Brain', color: 'from-purple-500 to-violet-600' },
  infecciosas: { label: 'Infecciosas', icon: 'Bug', color: 'from-green-500 to-emerald-600' },
  dermatologico: { label: 'Dermatológico', icon: 'Fingerprint', color: 'from-pink-500 to-rose-600' },
  gastrointestinal: { label: 'Gastrointestinal', icon: 'Utensils', color: 'from-yellow-500 to-amber-600' },
  neurologico: { label: 'Neurológico', icon: 'Zap', color: 'from-indigo-500 to-blue-600' },
  endocrino: { label: 'Endócrino', icon: 'Droplets', color: 'from-teal-500 to-cyan-600' },
  hematologico: { label: 'Hematológico', icon: 'Droplet', color: 'from-red-600 to-rose-700' },
  urologico: { label: 'Urológico', icon: 'Kidney', color: 'from-blue-500 to-indigo-600' },
  ginecologico: { label: 'Ginecológico', icon: 'Heart', color: 'from-pink-400 to-rose-500' },
  pediatrico: { label: 'Pediátrico', icon: 'Baby', color: 'from-sky-500 to-blue-600' },
  geriatrico: { label: 'Geriátrico', icon: 'Users', color: 'from-slate-500 to-gray-600' },
  outros: { label: 'Outros', icon: 'MoreHorizontal', color: 'from-neutral-500 to-gray-600' },
};

// =============================================================================
// CLASSIFICAÇÃO DE RISCO
// =============================================================================

export type ClassificacaoRisco = 'baixo' | 'moderado' | 'alto' | 'muito_alto';

export interface RiscoInfo {
  nivel: ClassificacaoRisco;
  criterios: string[];
  conduta: string;
}

// =============================================================================
// QUICK VIEW (RESUMO 1 TELA)
// =============================================================================

export interface QuickViewContent {
  /** Definição em 2-3 linhas */
  definicao: string;
  
  /** Critérios diagnósticos principais (bullets) */
  criteriosDiagnosticos: string[];
  
  /** Classificação de risco com conduta */
  classificacaoRisco?: RiscoInfo[];
  
  /** Tratamento de primeira linha */
  tratamentoPrimeiraLinha: {
    naoFarmacologico: string[];
    farmacologico: string[];
  };
  
  /** Red flags - quando encaminhar */
  redFlags: string[];
  
  /** Metas terapêuticas */
  metasTerapeuticas?: string[];
  
  /** Exames iniciais sugeridos */
  examesIniciais?: string[];
}

// =============================================================================
// CONTEÚDO COMPLETO (VERSÃO EXPANDIDA)
// =============================================================================

export interface FullDoencaContent {
  /** Epidemiologia com dados brasileiros */
  epidemiologia: {
    prevalencia?: string;
    incidencia?: string;
    mortalidade?: string;
    faixaEtaria?: string;
    fatoresRisco: string[];
    citations: Citation[];
  };
  
  /** Fisiopatologia resumida */
  fisiopatologia?: {
    texto: string;
    citations: Citation[];
  };
  
  /** Quadro clínico detalhado */
  quadroClinico: {
    sintomasPrincipais: string[];
    sinaisExameFisico: string[];
    formasClinicas?: string[];
    citations: Citation[];
  };
  
  /** Diagnóstico */
  diagnostico: {
    criterios: string[];
    diagnosticoDiferencial: string[];
    examesLaboratoriais?: string[];
    examesImagem?: string[];
    outrosExames?: string[];
    citations: Citation[];
  };
  
  /** Tratamento completo */
  tratamento: {
    objetivos: string[];
    naoFarmacologico: {
      medidas: string[];
      citations: Citation[];
    };
    farmacologico: {
      primeiraLinha: TratamentoFarmacologico[];
      segundaLinha?: TratamentoFarmacologico[];
      situacoesEspeciais?: {
        situacao: string;
        conduta: string;
      }[];
      citations: Citation[];
    };
    duracao?: string;
  };
  
  /** Acompanhamento */
  acompanhamento: {
    frequenciaConsultas: string;
    examesControle?: string[];
    metasTerapeuticas: string[];
    criteriosEncaminhamento: string[];
    citations: Citation[];
  };
  
  /** Prevenção */
  prevencao?: {
    primaria: string[];
    secundaria: string[];
    citations: Citation[];
  };
  
  /** Particularidades em populações especiais */
  populacoesEspeciais?: {
    idosos?: string;
    gestantes?: string;
    criancas?: string;
    drc?: string;
    hepatopatas?: string;
  };
}

export interface TratamentoFarmacologico {
  classe: string;
  medicamentos: string[];
  posologia?: string;
  observacoes?: string;
}

// =============================================================================
// INTERFACE PRINCIPAL - DOENÇA
// =============================================================================

export interface Doenca {
  /** Identificador único */
  id: string;
  
  /** Título da doença */
  titulo: string;
  
  /** Sinônimos e termos relacionados (para busca) */
  sinonimos?: string[];
  
  /** 
   * Disease Ontology ID (DOID) 
   * Padrão internacional para identificação de doenças
   * @see https://disease-ontology.org/
   */
  doid?: string;
  
  /** Códigos CIAP-2 */
  ciap2: string[];
  
  /** Códigos CID-10 */
  cid10: string[];
  
  /** Códigos CID-11 (quando disponível) */
  cid11?: string[];
  
  /** Categoria principal */
  categoria: CategoriaDoenca;
  
  /** Subcategoria opcional */
  subcategoria?: string;
  
  /** Conteúdo QuickView (resumo 1 tela) */
  quickView: QuickViewContent;
  
  /** Conteúdo completo expandido */
  fullContent: FullDoencaContent;
  
  /** IDs dos protocolos relacionados */
  protocolos: string[];
  
  /** IDs dos medicamentos principais */
  medicamentos: string[];
  
  /** IDs das calculadoras relevantes */
  calculadoras: string[];
  
  /** IDs dos rastreamentos relacionados */
  rastreamentos?: string[];
  
  /** Citações gerais */
  citations: Citation[];
  
  /** Data da última atualização */
  lastUpdate: string;
  
  /** Tags para busca */
  tags?: string[];
}

// =============================================================================
// TIPOS AUXILIARES
// =============================================================================

export interface DoencaSearchResult {
  doenca: Doenca;
  matchType: 'nome' | 'sinonimo' | 'ciap2' | 'cid10' | 'tag';
  score: number;
}

export interface DoencasByCategoria {
  categoria: CategoriaDoenca;
  label: string;
  doencas: Doenca[];
  count: number;
}

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

export function getDoencasByCategoria(doencas: Doenca[]): DoencasByCategoria[] {
  const grouped = doencas.reduce((acc, doenca) => {
    if (!acc[doenca.categoria]) {
      acc[doenca.categoria] = [];
    }
    acc[doenca.categoria].push(doenca);
    return acc;
  }, {} as Record<CategoriaDoenca, Doenca[]>);

  return Object.entries(grouped).map(([categoria, doencas]) => ({
    categoria: categoria as CategoriaDoenca,
    label: CATEGORIAS_DOENCA[categoria as CategoriaDoenca].label,
    doencas,
    count: doencas.length,
  }));
}

export function searchDoencasByCode(
  doencas: Doenca[], 
  code: string, 
  type: 'ciap2' | 'cid10' | 'both' = 'both'
): Doenca[] {
  const normalizedCode = code.toUpperCase().trim();
  
  return doencas.filter(doenca => {
    if (type === 'ciap2' || type === 'both') {
      if (doenca.ciap2.some(c => c.toUpperCase().includes(normalizedCode))) {
        return true;
      }
    }
    if (type === 'cid10' || type === 'both') {
      if (doenca.cid10.some(c => c.toUpperCase().includes(normalizedCode))) {
        return true;
      }
    }
    return false;
  });
}

