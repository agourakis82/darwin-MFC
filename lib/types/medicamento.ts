/**
 * TIPOS PARA MÓDULO DE MEDICAMENTOS - DARWIN-MFC
 * ===============================================
 * 
 * Estruturas TypeScript para o bulário da APS
 * Baseado na RENAME 2024 e bulas ANVISA
 * 
 * Referências principais:
 * - RENAME 2024 (Relação Nacional de Medicamentos Essenciais)
 * - Bulas ANVISA
 * - Micromedex / UpToDate Drug Information
 */

import { Citation } from './references';

// =============================================================================
// CLASSES TERAPÊUTICAS
// =============================================================================

export type ClasseTerapeutica =
  | 'anti_hipertensivo'
  | 'antidiabetico'
  | 'hipolipemiante'
  | 'anticoagulante'
  | 'antiagregante'
  | 'analgesico'
  | 'anti_inflamatorio'
  | 'antibiotico'
  | 'antifungico'
  | 'antiviral'
  | 'antiparasitario'
  | 'antidepressivo'
  | 'ansiolitico'
  | 'antipsicotico'
  | 'anticonvulsivante'
  | 'broncodilatador'
  | 'corticoide'
  | 'anti_histaminico'
  | 'inibidor_bomba_protonica'
  | 'hormonio_tireoide'
  | 'contraceptivo'
  | 'vitamina_mineral'
  | 'outros';

export const CLASSES_TERAPEUTICAS: Record<ClasseTerapeutica, { label: string; color: string }> = {
  anti_hipertensivo: { label: 'Anti-hipertensivo', color: 'bg-red-500' },
  antidiabetico: { label: 'Antidiabético', color: 'bg-amber-500' },
  hipolipemiante: { label: 'Hipolipemiante', color: 'bg-orange-500' },
  anticoagulante: { label: 'Anticoagulante', color: 'bg-rose-600' },
  antiagregante: { label: 'Antiagregante', color: 'bg-pink-500' },
  analgesico: { label: 'Analgésico', color: 'bg-blue-500' },
  anti_inflamatorio: { label: 'Anti-inflamatório', color: 'bg-indigo-500' },
  antibiotico: { label: 'Antibiótico', color: 'bg-green-500' },
  antifungico: { label: 'Antifúngico', color: 'bg-lime-500' },
  antiviral: { label: 'Antiviral', color: 'bg-teal-500' },
  antiparasitario: { label: 'Antiparasitário', color: 'bg-emerald-500' },
  antidepressivo: { label: 'Antidepressivo', color: 'bg-purple-500' },
  ansiolitico: { label: 'Ansiolítico', color: 'bg-violet-500' },
  antipsicotico: { label: 'Antipsicótico', color: 'bg-fuchsia-500' },
  anticonvulsivante: { label: 'Anticonvulsivante', color: 'bg-cyan-500' },
  broncodilatador: { label: 'Broncodilatador', color: 'bg-sky-500' },
  corticoide: { label: 'Corticoide', color: 'bg-yellow-500' },
  anti_histaminico: { label: 'Anti-histamínico', color: 'bg-slate-500' },
  inibidor_bomba_protonica: { label: 'IBP', color: 'bg-stone-500' },
  hormonio_tireoide: { label: 'Hormônio Tireoide', color: 'bg-zinc-500' },
  contraceptivo: { label: 'Contraceptivo', color: 'bg-pink-400' },
  vitamina_mineral: { label: 'Vitamina/Mineral', color: 'bg-lime-400' },
  outros: { label: 'Outros', color: 'bg-gray-500' },
};

// =============================================================================
// SUBCLASSES (MECANISMO DE AÇÃO)
// =============================================================================

export type SubclasseMedicamento = 
  // Anti-hipertensivos
  | 'ieca' | 'bra' | 'bcc' | 'diuretico_tiazidico' | 'diuretico_alca' 
  | 'betabloqueador' | 'alfabloqueador' | 'vasodilatador'
  // Antidiabéticos
  | 'biguanida' | 'sulfonilureira' | 'insulina' | 'isglt2' | 'glp1' | 'idpp4'
  // Antibióticos
  | 'penicilina' | 'cefalosporina' | 'macrolidio' | 'fluoroquinolona' | 'sulfonamida'
  // Antidepressivos
  | 'isrs' | 'isrsn' | 'triciclico' | 'atipico'
  // Outros
  | 'outros';

// =============================================================================
// CLASSIFICAÇÃO GESTAÇÃO (FDA)
// =============================================================================

export type ClassificacaoGestacao = 'A' | 'B' | 'C' | 'D' | 'X' | 'N';

export const CLASSIFICACAO_GESTACAO: Record<ClassificacaoGestacao, { label: string; descricao: string; color: string }> = {
  A: { 
    label: 'Categoria A', 
    descricao: 'Estudos controlados não demonstraram risco fetal', 
    color: 'bg-green-500' 
  },
  B: { 
    label: 'Categoria B', 
    descricao: 'Estudos em animais não demonstraram risco, sem estudos em humanos', 
    color: 'bg-lime-500' 
  },
  C: { 
    label: 'Categoria C', 
    descricao: 'Risco não pode ser descartado, usar se benefício justificar', 
    color: 'bg-yellow-500' 
  },
  D: { 
    label: 'Categoria D', 
    descricao: 'Evidência de risco fetal, pode ser necessário em situações graves', 
    color: 'bg-orange-500' 
  },
  X: { 
    label: 'Categoria X', 
    descricao: 'Contraindicado na gestação - risco supera benefício', 
    color: 'bg-red-600' 
  },
  N: { 
    label: 'Não classificado', 
    descricao: 'Sem dados suficientes para classificação', 
    color: 'bg-gray-500' 
  },
};

// =============================================================================
// FORMAS FARMACÊUTICAS
// =============================================================================

export type FormaFarmaceutica = 
  | 'comprimido' | 'capsula' | 'dragea'
  | 'solucao_oral' | 'suspensao_oral' | 'xarope' | 'gotas'
  | 'injetavel_im' | 'injetavel_iv' | 'injetavel_sc'
  | 'creme' | 'pomada' | 'gel' | 'locao'
  | 'colírio' | 'spray_nasal' | 'inalatorio'
  | 'supositorio' | 'ovulo'
  | 'adesivo' | 'outros';

// =============================================================================
// POSOLOGIA
// =============================================================================

export interface Posologia {
  indicacao: string;
  adultos: {
    dose: string;
    frequencia: string;
    doseMaxima?: string;
    observacoes?: string;
  };
  pediatrico?: {
    dose: string;
    frequencia: string;
    idadeMinima?: string;
    doseMaxima?: string;
    observacoes?: string;
  };
  idosos?: {
    dose: string;
    observacoes?: string;
  };
}

// =============================================================================
// AJUSTE DOSE RENAL
// =============================================================================

export interface AjusteDoseRenal {
  tfg: string; // Ex: ">50", "30-50", "15-30", "<15"
  ajuste: string;
  observacao?: string;
}

// =============================================================================
// INTERAÇÕES MEDICAMENTOSAS
// =============================================================================

export type GravidadeInteracao = 'leve' | 'moderada' | 'grave' | 'contraindicada';

export interface Interacao {
  medicamento: string;
  gravidade: GravidadeInteracao;
  efeito: string;
  mecanismo?: string;
  conduta: string;
}

// =============================================================================
// APRESENTAÇÕES COMERCIAIS
// =============================================================================

export interface ApresentacaoComercial {
  forma: FormaFarmaceutica;
  concentracao: string;
  quantidade?: string;
  disponivelSUS: boolean;
}

// =============================================================================
// INTERFACE PRINCIPAL - MEDICAMENTO
// =============================================================================

export interface Medicamento {
  /** Identificador único */
  id: string;
  
  /** Nome genérico (DCB) */
  nomeGenerico: string;
  
  /** Nomes comerciais principais */
  nomesComerciais?: string[];
  
  /** Classe terapêutica principal */
  classeTerapeutica: ClasseTerapeutica;
  
  /** Subclasse (mecanismo de ação) */
  subclasse?: SubclasseMedicamento;
  
  /** Disponível na RENAME */
  rename: boolean;
  
  /** Apresentações disponíveis */
  apresentacoes: ApresentacaoComercial[];
  
  /** Indicações aprovadas */
  indicacoes: string[];
  
  /** Mecanismo de ação resumido */
  mecanismoAcao: string;
  
  /** Posologias por indicação */
  posologias: Posologia[];
  
  /** Contraindicações absolutas */
  contraindicacoes: string[];
  
  /** Precauções e advertências */
  precaucoes?: string[];
  
  /** Efeitos adversos principais */
  efeitosAdversos: {
    comuns: string[];
    graves?: string[];
  };
  
  /** Interações medicamentosas relevantes */
  interacoes: Interacao[];
  
  /** Ajuste de dose na DRC */
  ajusteDoseRenal?: AjusteDoseRenal[];
  
  /** Classificação na gestação */
  gestacao: ClassificacaoGestacao;
  
  /** Segurança na amamentação */
  amamentacao: {
    compativel: boolean;
    observacao: string;
  };
  
  /** Considerações especiais */
  consideracoesEspeciais?: {
    idosos?: string;
    hepatopatas?: string;
    pediatrico?: string;
  };
  
  /** Monitorização necessária */
  monitorizacao?: string[];
  
  /** Orientações ao paciente */
  orientacoesPaciente?: string[];
  
  /** IDs das doenças relacionadas */
  doencasRelacionadas: string[];
  
  /** IDs das calculadoras relevantes (ex: CKD-EPI) */
  calculadoras?: string[];
  
  /** Citações e referências */
  citations: Citation[];
  
  /** Data da última atualização */
  lastUpdate: string;
  
  /** Tags para busca */
  tags?: string[];
}

// =============================================================================
// TIPOS AUXILIARES
// =============================================================================

export interface MedicamentoSearchResult {
  medicamento: Medicamento;
  matchType: 'generico' | 'comercial' | 'classe' | 'indicacao' | 'tag';
  score: number;
}

export interface MedicamentosByClasse {
  classe: ClasseTerapeutica;
  label: string;
  medicamentos: Medicamento[];
  count: number;
}

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

export function getMedicamentosByClasse(medicamentos: Medicamento[]): MedicamentosByClasse[] {
  const grouped = medicamentos.reduce((acc, med) => {
    if (!acc[med.classeTerapeutica]) {
      acc[med.classeTerapeutica] = [];
    }
    acc[med.classeTerapeutica].push(med);
    return acc;
  }, {} as Record<ClasseTerapeutica, Medicamento[]>);

  return Object.entries(grouped).map(([classe, meds]) => ({
    classe: classe as ClasseTerapeutica,
    label: CLASSES_TERAPEUTICAS[classe as ClasseTerapeutica].label,
    medicamentos: meds,
    count: meds.length,
  }));
}

export function getMedicamentosRENAME(medicamentos: Medicamento[]): Medicamento[] {
  return medicamentos.filter(med => med.rename);
}

export function getInteracoesGraves(medicamento: Medicamento): Interacao[] {
  return medicamento.interacoes.filter(
    int => int.gravidade === 'grave' || int.gravidade === 'contraindicada'
  );
}

export function verificarAjusteRenal(
  medicamento: Medicamento, 
  tfgEstimada: number
): AjusteDoseRenal | null {
  if (!medicamento.ajusteDoseRenal || medicamento.ajusteDoseRenal.length === 0) {
    return null;
  }

  // Encontrar o ajuste apropriado para a TFG
  for (const ajuste of medicamento.ajusteDoseRenal) {
    const tfgRange = ajuste.tfg;
    
    if (tfgRange.startsWith('>')) {
      const threshold = parseInt(tfgRange.substring(1));
      if (tfgEstimada > threshold) return ajuste;
    } else if (tfgRange.startsWith('<')) {
      const threshold = parseInt(tfgRange.substring(1));
      if (tfgEstimada < threshold) return ajuste;
    } else if (tfgRange.includes('-')) {
      const [min, max] = tfgRange.split('-').map(Number);
      if (tfgEstimada >= min && tfgEstimada <= max) return ajuste;
    }
  }

  return null;
}

