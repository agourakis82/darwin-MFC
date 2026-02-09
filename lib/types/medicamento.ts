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
import type { RegionalMedicationOverlay, RegionalOverlayMap } from './region';

// =============================================================================
// CLASSES TERAPÊUTICAS
// =============================================================================

export type ClasseTerapeutica =
  // Cardiovascular
  | 'anti_hipertensivo'
  | 'anticoagulante'
  | 'antiagregante'
  | 'hipolipemiante'
  | 'cardiotonico'
  | 'diuretico'
  // Metabolismo
  | 'antidiabetico'
  | 'hormonio_tireoide'
  | 'hormonio'
  // Neuropsiquiatria
  | 'antidepressivo'
  | 'ansiolitico'
  | 'antipsicotico'
  | 'anticonvulsivante'
  | 'antiepileptico'
  | 'estabilizador_humor'
  | 'antiparkinsoniano'
  | 'antidemencia'
  // Dor e Inflamação
  | 'analgesico'
  | 'anti_inflamatorio'
  | 'aine'
  | 'relaxante_muscular'
  | 'antigotoso'
  // Infecciosas
  | 'antibiotico'
  | 'antifungico'
  | 'antiviral'
  | 'antiparasitario'
  // Respiratório
  | 'broncodilatador'
  | 'corticoide_inalatorio'
  | 'corticoide_nasal'
  | 'antileucotrienico'
  | 'mucolitico'
  | 'antitussigeno'
  | 'descongestionante'
  // Gastrointestinal
  | 'gastrointestinal'
  | 'inibidor_bomba_protonica'
  | 'antiemetico'
  | 'antiacido'
  | 'protetor_gastrico'
  | 'laxante'
  | 'antidiarreico'
  | 'antiespamodico'
  | 'enzima_digestiva'
  | 'anti_inflamatorio_intestinal'
  // Alergia
  | 'anti_histaminico'
  // Hormônios e Reprodução
  | 'corticoide'
  | 'corticosteroide'
  | 'indutor_ovulacao'
  | 'contraceptivo'
  // Imunologia
  | 'imunossupressor'
  | 'anti_osteoporose'
  | 'antigotoso'
  // Suplementos
  | 'vitamina'
  | 'suplemento'
  | 'vitamina_mineral'
  // Psiquiatria adicional
  | 'psicoestimulante'
  | 'tratamento_dependencia'
  | 'hipnotico'
  // Endócrino adicional
  | 'antiobesidade'
  | 'antitireoidiano'
  // Dermatológicos
  | 'antiacneico'
  | 'antipsoríatico'
  | 'imunomodulador_topico'
  | 'antialopecia'
  | 'despigmentante'
  // Neurológicos adicionais
  | 'antienxaqueca'
  // Nefrológicos
  | 'quelante_fosfato'
  | 'antihiperparatireoideo'
  // Hepatobiliares
  | 'hepatobiliar'
  // Antianêmicos
  | 'antianemico'
  // Anestesia e Procedimentos
  | 'anestesico'
  | 'anestesico_local'
  | 'sedativo'
  | 'opioide'
  | 'bloqueador_neuromuscular'
  | 'anticolinesterasico'
  | 'antidoto'
  | 'anticolinergico'
  | 'vasopressor'
  // Especiais
  | 'gas_medicinal'
  | 'outros';

export const CLASSES_TERAPEUTICAS: Record<ClasseTerapeutica, { label: string; color: string }> = {
  // Cardiovascular
  anti_hipertensivo: { label: 'Anti-hipertensivo', color: 'bg-red-500' },
  anticoagulante: { label: 'Anticoagulante', color: 'bg-rose-600' },
  antiagregante: { label: 'Antiagregante', color: 'bg-pink-500' },
  hipolipemiante: { label: 'Hipolipemiante', color: 'bg-orange-500' },
  cardiotonico: { label: 'Cardiotônico', color: 'bg-red-600' },
  diuretico: { label: 'Diurético', color: 'bg-blue-600' },
  // Metabolismo
  antidiabetico: { label: 'Antidiabético', color: 'bg-amber-500' },
  hormonio_tireoide: { label: 'Hormônio Tireoide', color: 'bg-zinc-500' },
  hormonio: { label: 'Hormônio', color: 'bg-zinc-400' },
  // Neuropsiquiatria
  antidepressivo: { label: 'Antidepressivo', color: 'bg-purple-500' },
  ansiolitico: { label: 'Ansiolítico', color: 'bg-violet-500' },
  antipsicotico: { label: 'Antipsicótico', color: 'bg-fuchsia-500' },
  anticonvulsivante: { label: 'Anticonvulsivante', color: 'bg-cyan-500' },
  antiepileptico: { label: 'Antiepiléptico', color: 'bg-cyan-600' },
  estabilizador_humor: { label: 'Estabilizador de Humor', color: 'bg-violet-600' },
  antiparkinsoniano: { label: 'Antiparkinsoniano', color: 'bg-indigo-400' },
  antidemencia: { label: 'Antidemência', color: 'bg-purple-400' },
  // Dor e Inflamação
  analgesico: { label: 'Analgésico', color: 'bg-blue-500' },
  anti_inflamatorio: { label: 'Anti-inflamatório', color: 'bg-indigo-500' },
  aine: { label: 'AINE', color: 'bg-indigo-400' },
  relaxante_muscular: { label: 'Relaxante Muscular', color: 'bg-indigo-300' },
  antigotoso: { label: 'Antigotoso', color: 'bg-blue-400' },
  // Infecciosas
  antibiotico: { label: 'Antibiótico', color: 'bg-green-500' },
  antifungico: { label: 'Antifúngico', color: 'bg-lime-500' },
  antiviral: { label: 'Antiviral', color: 'bg-teal-500' },
  antiparasitario: { label: 'Antiparasitário', color: 'bg-emerald-500' },
  // Respiratório
  broncodilatador: { label: 'Broncodilatador', color: 'bg-sky-500' },
  corticoide_inalatorio: { label: 'Corticoide Inalatório', color: 'bg-yellow-600' },
  corticoide_nasal: { label: 'Corticoide Nasal', color: 'bg-yellow-400' },
  antileucotrienico: { label: 'Antileucotriênico', color: 'bg-sky-400' },
  mucolitico: { label: 'Mucolítico', color: 'bg-sky-300' },
  antitussigeno: { label: 'Antitussígeno', color: 'bg-blue-300' },
  descongestionante: { label: 'Descongestionante', color: 'bg-cyan-300' },
  // Gastrointestinal
  gastrointestinal: { label: 'Gastrointestinal', color: 'bg-stone-600' },
  inibidor_bomba_protonica: { label: 'IBP', color: 'bg-stone-500' },
  antiemetico: { label: 'Antiemético', color: 'bg-stone-400' },
  antiacido: { label: 'Antiácido', color: 'bg-stone-350' },
  protetor_gastrico: { label: 'Protetor Gástrico', color: 'bg-amber-300' },
  laxante: { label: 'Laxante', color: 'bg-amber-400' },
  antidiarreico: { label: 'Antidiarreico', color: 'bg-amber-600' },
  antiespamodico: { label: 'Antiespasmódico', color: 'bg-orange-300' },
  enzima_digestiva: { label: 'Enzima Digestiva', color: 'bg-orange-400' },
  anti_inflamatorio_intestinal: { label: 'Anti-inflamatório Intestinal', color: 'bg-stone-700' },
  // Alergia
  anti_histaminico: { label: 'Anti-histamínico', color: 'bg-slate-500' },
  // Hormônios e Reprodução
  corticoide: { label: 'Corticoide', color: 'bg-yellow-500' },
  corticosteroide: { label: 'Corticosteroide', color: 'bg-yellow-600' },
  indutor_ovulacao: { label: 'Indutor de Ovulação', color: 'bg-pink-600' },
  contraceptivo: { label: 'Contraceptivo', color: 'bg-pink-400' },
  // Imunologia
  imunossupressor: { label: 'Imunossupressor', color: 'bg-rose-500' },
  anti_osteoporose: { label: 'Anti-osteoporose', color: 'bg-amber-700' },
  // Suplementos
  vitamina: { label: 'Vitamina', color: 'bg-lime-500' },
  suplemento: { label: 'Suplemento', color: 'bg-lime-600' },
  vitamina_mineral: { label: 'Vitamina/Mineral', color: 'bg-lime-400' },
  // Psiquiatria adicional
  psicoestimulante: { label: 'Psicoestimulante', color: 'bg-orange-600' },
  tratamento_dependencia: { label: 'Tratamento Dependência', color: 'bg-emerald-600' },
  hipnotico: { label: 'Hipnótico', color: 'bg-indigo-700' },
  antiobesidade: { label: 'Antiobesidade', color: 'bg-teal-600' },
  antitireoidiano: { label: 'Antitireoidiano', color: 'bg-zinc-600' },
  antiacneico: { label: 'Antiacneico', color: 'bg-pink-500' },
  antipsoríatico: { label: 'Antipsoríatico', color: 'bg-rose-700' },
  imunomodulador_topico: { label: 'Imunomodulador Tópico', color: 'bg-violet-600' },
  antialopecia: { label: 'Antialopecia', color: 'bg-cyan-600' },
  despigmentante: { label: 'Despigmentante', color: 'bg-neutral-500' },
  // Neurológicos adicionais
  antienxaqueca: { label: 'Antienxaqueca', color: 'bg-purple-600' },
  // Nefrológicos
  quelante_fosfato: { label: 'Quelante de Fosfato', color: 'bg-amber-800' },
  antihiperparatireoideo: { label: 'Antihiperparatireoideo', color: 'bg-zinc-700' },
  // Hepatobiliares
  hepatobiliar: { label: 'Hepatobiliar', color: 'bg-emerald-700' },
  // Antianêmicos
  antianemico: { label: 'Antianêmico', color: 'bg-rose-700' },
  // Anestesia e Procedimentos
  anestesico: { label: 'Anestésico Geral', color: 'bg-slate-600' },
  anestesico_local: { label: 'Anestésico Local', color: 'bg-slate-500' },
  sedativo: { label: 'Sedativo', color: 'bg-indigo-600' },
  opioide: { label: 'Opioide', color: 'bg-red-700' },
  bloqueador_neuromuscular: { label: 'Bloqueador Neuromuscular', color: 'bg-zinc-600' },
  anticolinesterasico: { label: 'Anticolinesterásico', color: 'bg-teal-600' },
  antidoto: { label: 'Antídoto', color: 'bg-emerald-600' },
  anticolinergico: { label: 'Anticolinérgico', color: 'bg-cyan-700' },
  vasopressor: { label: 'Vasopressor', color: 'bg-red-800' },
  // Especiais
  gas_medicinal: { label: 'Gás Medicinal', color: 'bg-gray-400' },
  outros: { label: 'Outros', color: 'bg-gray-500' },
};

// =============================================================================
// SUBCLASSES (MECANISMO DE AÇÃO)
// =============================================================================

export type SubclasseMedicamento =
  // Anti-hipertensivos
  | 'ieca' | 'bra' | 'bcc' | 'diuretico_tiazidico' | 'diuretico_alca' | 'alca'
  | 'betabloqueador' | 'alfabloqueador' | 'vasodilatador' | 'tiazidico' | 'poupador_potassio'
  // Antidiabéticos
  | 'biguanida' | 'sulfonilureira' | 'sulfonilureia' | 'insulina' | 'isglt2' | 'glp1' | 'idpp4'
  | 'insulina_intermediaria' | 'insulina_rapida'
  // Antibióticos
  | 'penicilina' | 'penicilina_inibidor' | 'cefalosporina' | 'cefalosporina_1g' | 'cefalosporina_3g'
  | 'cefalosporina_1_geracao' | 'cefalosporina_4g' | 'cefalosporina_5g' | 'cefalosporina_inibidor'
  | 'carbapenemico' | 'glicopeptideo' | 'oxazolidinona' | 'polimixina' | 'aminoglicosideo'
  | 'glicilciclina' | 'antituberculoso' | 'rifamicina' | 'polieno' | 'azol' | 'equinocandina'
  | 'macrolideos' | 'macrolidio' | 'macrolideo'
  | 'fluoroquinolona' | 'sulfonamida' | 'sulfonamida_inibidor_folato' | 'nitroimidazol' | 'nitrofurano' | 'tetraciclina' | 'lincosamida'
  // Analgésicos/AINEs
  | 'analgesico_nao_opioide' | 'nao_opioide' | 'opioide_fraco' | 'opioide_forte' | 'opioide' | 'aine'
  | 'nao_seletivo' | 'seletivo_cox2'
  // Psicotrópicos
  | 'isrs' | 'isrsn' | 'irsn' | 'triciclico' | 'atipico' | 'tipico' | 'benzodiazepínico'
  | 'antipsicotico_tipico' | 'antipsicotico_atipico' | 'bloqueador_canais_sodio' | 'bloqueador_canal_sodio'
  | 'multiplo' | 'multiplos_mecanismos' | 'litio' | 'sal_litio' | 'derivado_valproico' | 'acido_valproico' | 'barbiturico'
  | 'ligante_sv2a' | 'antagonista_nmda' | 'inibidor_colinesterase'
  // Cardiovasculares/Hematológicos
  | 'estatina' | 'inibidor_cox' | 'inibidor_p2y12' | 'antagonista_vitamina_k' | 'doac' | 'glicosideo_cardiaco'
  | 'hbpm' | 'inibidor_fator_xa' | 'inibidor_trombina_direto' | 'heparina_baixo_peso' | 'heparina'
  | 'antifibrinolitico' | 'fator_coagulacao' | 'trombolitico' | 'estimulante_eritropoiese'
  | 'vasopressor' | 'inotropico' | 'antiarritmico'
  // Gastrointestinais
  | 'ibp' | 'antagonista_h2' | 'procinetico' | 'antagonista_d2' | 'antagonista_5ht3' | 'antagonista_nk1'
  | 'barreira_mucosa' | 'bismuto' | 'osmotico' | 'estimulante' | 'opioide_periferico' | 'antissecretor'
  | 'anticolinergico' | 'pancreatica' | 'aminossalicilato'
  // Anti-histamínicos
  | 'h1_1geracao' | 'h1_2geracao' | 'segunda_geracao'
  // Broncodilatadores/Respiratórios
  | 'beta2_agonista_curta' | 'beta2_agonista_longa' | 'ci' | 'ci_laba_combinacao'
  | 'anticolinergico_curta' | 'anticolinergico_longa' | 'glicocorticoide'
  | 'antagonista_receptor' | 'tiol' | 'benzilamin' | 'nao_opioide' | 'simpatomimetico'
  // Antifúngicos/Antiparasitários
  | 'antifungico' | 'sistemico' | 'anti_helmintico' | 'escabicida_pediculicida'
  // Antivirais
  | 'antirretroviral' | 'antiviral_hepatite' | 'antiviral_herpes' | 'antiviral_cmv'
  | 'antiviral_influenza' | 'antiviral_covid'
  // Dermatológicos
  | 'topico' | 'corticoide_topico' | 'retinoides' | 'queratolítico'
  // Vitaminas/Suplementos
  | 'vitamina' | 'vitamina_b' | 'vitamina_d' | 'vitamina_k' | 'antianemico'
  // Hormonais
  | 'tireoidiano' | 'corticosteroide' | 'serm' | 'hormonio_pancreatico'
  // Reumatologia/Imunobiológicos
  | 'dmard' | 'antimetabolito' | 'inibidor_calcineurina' | 'anti_tnf' | 'anti_il6' | 'anti_cd20'
  | 'modulador_coestimulacao' | 'anti_il17' | 'anti_il12_23' | 'inibidor_jak'
  // Gota
  | 'anti_inflamatorio_gota' | 'inibidor_xantina_oxidase' | 'uricosurico'
  // Osteoporose
  | 'bisfosfonato' | 'anticorpo_rankl' | 'analogo_pth' | 'anticorpo_esclerostina'
  // Psicoestimulantes/TDAH
  | 'estimulante_snc' | 'inibidor_recaptacao_noradrenalina'
  // Dependências
  | 'antagonista_opioide' | 'aversivo_alcool' | 'modulador_glutamato' | 'agonista_parcial_opioide'
  | 'agonista_opioide' | 'agonista_parcial_nicotinico' | 'inibidor_recaptacao_da_ne'
  // Hipnóticos
  | 'z_drugs' | 'antagonista_orexina' | 'hormonio_pineal'
  // Antidepressivos adicionais
  | 'ligante_alfa2delta' | 'azapirona' | 'sari' | 'agonista_melatonina' | 'multimodal'
  // Obesidade
  | 'inibidor_lipase' | 'dual_glp1_gip' | 'inibidor_recaptacao_ne_5ht' | 'combinacao_saciedade'
  // Tireoide
  | 'tionamida' | 'radioisotopo'
  // Insulinas
  | 'insulina_longa' | 'insulina_ultralonga' | 'insulina_ultrarapida'
  // Hormônios diversos
  | 'analogo_adh' | 'analogo_somatostatina' | 'agonista_dopamina' | 'mineralocorticoide'
  // Dermatológicos
  | 'retinoide_sistemico' | 'retinoide_topico' | 'antimicrobiano_topico' | 'analogo_vitamina_d'
  | 'queratolítico_antisseborreico' | 'inibidor_calcineurina_topico' | 'anti_il4_il13'
  | 'corticoide_topico_potente' | 'corticoide_topico_superpotente' | 'corticoide_topico_fraco'
  | 'azol_topico' | 'alilamina' | 'pleuromutilin' | 'avermectina' | 'escabicida'
  | 'vasodilatador_topico' | 'inibidor_5alfa_redutase' | 'inibidor_tirosinase' | 'acido_dicarboxilico'
  // Neurológicos
  | 'precursor_dopamina' | 'agonista_dopaminergico' | 'imao_b' | 'inibidor_comt'
  // Enxaqueca
  | 'triptano' | 'anticorpo_cgrp' | 'antagonista_ampa'
  // Nefrologia
  | 'resina' | 'calcio' | 'calcimimetico'
  // Gastrointestinal adicional
  | 'anti_integrina' | 'acido_biliar' | 'agonista_gc_c'
  // Antianêmicos
  | 'ferro_oral' | 'ferro_parenteral'
  // Suplementos adicionais
  | 'mineral'
  // Hormônios sexuais
  | 'estrogeno' | 'progestageno' | 'androgeno' | 'antiandrogeno'
  // Anti-histamínicos
  | 'estabilizador_mastocito'
  // Oftálmicos
  | 'analogo_prostaglandina' | 'inibidor_anidrase_carbonica'
  // Antidiabéticos
  | 'tiazolidinediona' | 'inibidor_alfa_glicosidase'
  // Anti-hipertensivos
  | 'agonista_alfa2'
  // Relaxantes musculares
  | 'relaxante_central' | 'agonista_gaba_b'
  // Cardiovascular adicional
  | 'nitrato' | 'anestesico_local'
  // Emergência/Anestesia
  | 'anestesico_geral' | 'anestesico_dissociativo' | 'bloqueador_neuromuscular' | 'antidoto'
  // Eletrólitos/Nutrientes
  | 'eletrolito' | 'nutriente'
  // Especiais
  | 'oxigenio'
  // Anestesia/Procedimentos - subclasses
  | 'inalatorio' | 'intravenoso' | 'amida' | 'ester'
  | 'despolarizante' | 'nao_despolarizante'
  | 'reversao_bnm' | 'antagonista_benzodiazepinico'
  | 'reversao_anticolinergico' | 'adjuvante_anestesico'
  | 'butirofenona' | 'simpatomimetico_indireto' | 'alfa1_agonista'
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
  // Formas orais sólidas
  | 'comprimido' | 'capsula' | 'dragea'
  | 'comprimido_cr' | 'comprimido_xr' | 'comprimido_er' // liberação controlada/prolongada
  | 'comprimido_liberacao_prolongada' | 'comprimido_orodispersivel'
  | 'comprimido_dispersivel' | 'comprimido_mastigavel'
  | 'capsula_sprinkle' | 'capsula_inalacao' | 'capsula_xr'
  | 'granulado' | 'sache' | 'po_oral'
  // Formas orais líquidas
  | 'solucao_oral' | 'suspensao_oral' | 'xarope' | 'gotas' | 'elixir'
  | 'xarope_pediatrico' | 'xarope_adulto' | 'solucao_gotas'
  // Formas parenterais
  | 'injetavel' | 'injetavel_im' | 'injetavel_iv' | 'injetavel_sc'
  | 'injetavel_longa_acao' | 'po_injetavel'
  // Formas tópicas
  | 'creme' | 'pomada' | 'gel' | 'locao' | 'gel_topico' | 'gel_vaginal' | 'po_topico'
  // Formas oftálmicas/nasais
  | 'colirio' | 'spray_nasal'
  // Formas inalatórias
  | 'inalatorio' | 'aerosol' | 'aerossol' | 'solucao_nebulizacao'
  | 'po_inalacao' | 'solucao_inalacao' | 'suspensao_nebulizacao'
  // Formas retais
  | 'supositorio' | 'ovulo' | 'solucao_retal' | 'enema'
  // Formas especiais
  | 'adesivo' | 'gas' | 'outros';

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
// PHARMGKB - FARMACOGENÉTICA
// =============================================================================

/**
 * PharmGKB evidence levels following CPIC/DPWG guidelines
 * 1A = High quality evidence with strong recommendation
 * 1B = High quality evidence with moderate recommendation
 * 2A = Moderate quality evidence with strong recommendation
 * 2B = Moderate quality evidence with moderate recommendation
 * 3 = Low quality evidence
 * 4 = Preliminary evidence
 */
export type PharmGKBEvidenceLevel = '1A' | '1B' | '2A' | '2B' | '3' | '4';

/**
 * Metabolizer phenotypes based on genetic variants
 */
export type MetabolizerPhenotype =
  | 'normal_metabolizer'          // Normal enzyme activity (wild-type)
  | 'intermediate_metabolizer'    // Reduced enzyme activity (heterozygous)
  | 'poor_metabolizer'            // Minimal/no enzyme activity (homozygous variant)
  | 'ultra_rapid_metabolizer'     // Increased enzyme activity (gene duplication)
  | 'increased_function'          // Slightly increased activity
  | 'decreased_function';         // Slightly decreased activity

/**
 * Population frequency data for genetic variants
 */
export interface PopulationFrequency {
  /** European descent */
  european: number;
  /** African descent */
  african: number;
  /** East Asian descent */
  asian: number;
  /** Hispanic/Latino descent */
  hispanic: number;
  /** South Asian descent (India, Pakistan) */
  southAsian?: number;
}

/**
 * Dosage recommendation based on genotype/phenotype
 */
export interface DosageRecommendation {
  /** Recommendation text (e.g., "Use standard dose", "Increase dose by 50%", "Consider alternative") */
  recommendation: string;
  /** Clinical reasoning for the recommendation */
  reasoning: string;
  /** Strength of recommendation */
  strength: 'strong' | 'moderate' | 'optional';
  /** CPIC/DPWG classification */
  classification?: string;
}

/**
 * PharmGKB genetic variant data
 */
export interface PharmGKBVariant {
  /** Allele designation (e.g., "*1/*1", "*1/*2", "*2/*2") */
  allele: string;
  /** Metabolizer phenotype */
  phenotype: MetabolizerPhenotype;
  /** Population frequency data */
  frequency: PopulationFrequency;
  /** Clinical implications of this variant */
  implications: string[];
  /** Dosage adjustment recommendation */
  dosageRecommendation: DosageRecommendation;
  /** Alternative medication IDs if this variant contraindicates use */
  alternatives?: string[];
}

/**
 * PharmGKB pharmacogenomics data for a medication
 * Supports both nested variants array (preferred) and legacy flat structure
 */
export interface PharmGKBData {
  /** Gene symbol (e.g., "CYP2D6", "CYP2C19", "TPMT", "DPYD") */
  gene: string;
  /** Array of genetic variants and their implications (preferred structure) */
  variants?: PharmGKBVariant[];
  /** PharmGKB evidence level (CPIC/DPWG classification) */
  level?: PharmGKBEvidenceLevel;
  /** URL to CPIC or DPWG guideline */
  guidelineUrl?: string;
  /** Summary of pharmacogenomic effect */
  summary?: string;

  // Legacy flat structure fields (for backwards compatibility)
  /** @deprecated Use variants[].allele instead */
  variant?: string;
  /** @deprecated Use variants[].phenotype instead */
  phenotype?: MetabolizerPhenotype | string;
  /** @deprecated Use variants[].implications instead */
  implications?: string[];
  /** @deprecated Use variants[].dosageRecommendation instead */
  dosageRecommendations?: string[];
  /** @deprecated Use variants[].frequency instead */
  frequency?: PopulationFrequency;
  /** @deprecated Use variants[].alternatives instead */
  alternatives?: string[];
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
  
  // =============================================================================
  // ONTOLOGIAS DE MEDICAMENTOS
  // =============================================================================
  
  /** Código ATC (Anatomical Therapeutic Chemical) - OMS */
  atcCode?: string;
  
  /** RxNorm CUI - NIH (interoperabilidade) */
  rxNormCui?: string;
  
  /** DrugBank ID - Base de dados de medicamentos */
  drugBankId?: string;
  
  /** Código SNOMED-CT para o medicamento */
  snomedCT?: string | string[]; // Support both single string and array for backwards compatibility
  
  /** LOINC codes (for lab tests related to medication monitoring) */
  loinc?: string[];
  
  /** PharmGKB pharmacogenomics data */
  pharmgkb?: PharmGKBData[];
  
  /** Registro ANVISA (número de registro) */
  anvisaRegistro?: string;
  
  /** CAS Number (Chemical Abstracts Service) */
  casNumber?: string;
  
  /** DCB (Denominação Comum Brasileira) - código oficial */
  dcbCode?: string;

  // =============================================================================
  // REGIONAL OVERLAYS (Multi-Country Support)
  // =============================================================================
  // These fields enable region-specific medication information (Brazil/India/EU)
  // Gradually replacing Brazil-specific fields (anvisaRegistro, dcbCode, rename)
  // with a more scalable regional overlay architecture.

  /** Regional-specific medication data (Brazil, India, EU) */
  regionalOverlays?: RegionalOverlayMap<RegionalMedicationOverlay>;

  // =============================================================================
  // CLASSIFICAÇÃO
  // =============================================================================
  
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

/**
 * Get regional medication data for a specific region
 * @param medicamento Base medication
 * @param region Target region (BR, IN, EU)
 * @returns Regional medication overlay if available, null otherwise
 */
export function getRegionalMedicationData(
  medicamento: Medicamento,
  region: 'BR' | 'IN' | 'EU'
): RegionalMedicationOverlay | null {
  if (!medicamento.regionalOverlays) {
    return null;
  }
  return medicamento.regionalOverlays[region] || null;
}

/**
 * Check if medication is available in a specific region's public health system
 * @param medicamento Base medication
 * @param region Target region
 * @returns true if available in public system, false otherwise
 */
export function isAvailableInPublicSystem(
  medicamento: Medicamento,
  region: 'BR' | 'IN' | 'EU'
): boolean {
  const regionalData = getRegionalMedicationData(medicamento, region);
  if (!regionalData) {
    // Fallback to base medication for Brazil if no overlay exists
    if (region === 'BR') {
      return medicamento.apresentacoes.some(ap => ap.disponivelSUS);
    }
    return false;
  }
  return regionalData.availableInPublicSystem;
}

