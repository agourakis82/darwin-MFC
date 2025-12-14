/**
 * TIPOS PARA SISTEMA CIAP-2 - DARWIN-MFC
 * =======================================
 * 
 * Classificação Internacional de Atenção Primária (CIAP-2)
 * Estrutura oficial com 17 capítulos para organização das doenças
 * 
 * Referência: WONCA - World Organization of Family Doctors
 */

// =============================================================================
// CAPÍTULOS CIAP-2
// =============================================================================

export type CIAP2Chapter = 
  | 'A' // Geral e Inespecífico
  | 'B' // Sangue, Órgãos Hematopoiéticos e Linfáticos
  | 'D' // Aparelho Digestivo
  | 'F' // Olho
  | 'H' // Ouvido
  | 'K' // Aparelho Circulatório
  | 'L' // Sistema Musculoesquelético
  | 'N' // Sistema Nervoso
  | 'P' // Psicológico
  | 'R' // Aparelho Respiratório
  | 'S' // Pele
  | 'T' // Endócrino, Metabólico e Nutricional
  | 'U' // Aparelho Urinário
  | 'W' // Gravidez, Parto e Planejamento Familiar
  | 'X' // Genital Feminino (incluindo Mama)
  | 'Y' // Genital Masculino
  | 'Z'; // Problemas Sociais

// =============================================================================
// INFORMAÇÕES DOS CAPÍTULOS
// =============================================================================

export interface CIAP2ChapterInfo {
  code: CIAP2Chapter;
  nome: string;
  nomeCompleto: string;
  descricao: string;
  icon: string;
  color: string;
  gradient: string;
  exemplos: string[];
  estimatedCount: number;
}

export const CIAP2_CHAPTERS: Record<CIAP2Chapter, CIAP2ChapterInfo> = {
  A: {
    code: 'A',
    nome: 'Geral',
    nomeCompleto: 'Geral e Inespecífico',
    descricao: 'Sintomas gerais, sinais inespecíficos, cansaço, febre sem foco, check-ups',
    icon: 'Activity',
    color: 'text-slate-600',
    gradient: 'from-slate-500 to-gray-600',
    exemplos: ['Fadiga crônica', 'Febre de origem indeterminada', 'Check-up preventivo'],
    estimatedCount: 10,
  },
  B: {
    code: 'B',
    nome: 'Sangue',
    nomeCompleto: 'Sangue, Órgãos Hematopoiéticos e Linfáticos',
    descricao: 'Anemias, distúrbios de coagulação, linfonodomegalias',
    icon: 'Droplet',
    color: 'text-red-600',
    gradient: 'from-red-600 to-rose-700',
    exemplos: ['Anemia ferropriva', 'Anemia megaloblástica', 'Púrpura'],
    estimatedCount: 8,
  },
  D: {
    code: 'D',
    nome: 'Digestivo',
    nomeCompleto: 'Aparelho Digestivo',
    descricao: 'Doenças do trato gastrointestinal, fígado, vesícula e pâncreas',
    icon: 'Utensils',
    color: 'text-amber-600',
    gradient: 'from-amber-500 to-orange-600',
    exemplos: ['DRGE', 'Gastrite', 'Úlcera péptica', 'SII', 'Hemorroidas'],
    estimatedCount: 15,
  },
  F: {
    code: 'F',
    nome: 'Olho',
    nomeCompleto: 'Olho',
    descricao: 'Doenças oculares, distúrbios visuais, conjuntivites',
    icon: 'Eye',
    color: 'text-cyan-600',
    gradient: 'from-cyan-500 to-blue-600',
    exemplos: ['Conjuntivite', 'Blefarite', 'Olho seco', 'Glaucoma'],
    estimatedCount: 8,
  },
  H: {
    code: 'H',
    nome: 'Ouvido',
    nomeCompleto: 'Ouvido',
    descricao: 'Doenças otológicas, surdez, vertigem',
    icon: 'Ear',
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-violet-600',
    exemplos: ['Otite média', 'Otite externa', 'Cerume impactado', 'VPPB'],
    estimatedCount: 8,
  },
  K: {
    code: 'K',
    nome: 'Cardiovascular',
    nomeCompleto: 'Aparelho Circulatório',
    descricao: 'Doenças cardíacas e vasculares, hipertensão, insuficiência cardíaca',
    icon: 'Heart',
    color: 'text-red-500',
    gradient: 'from-red-500 to-rose-600',
    exemplos: ['HAS', 'IC', 'FA', 'DAC', 'TVP', 'Varizes'],
    estimatedCount: 18,
  },
  L: {
    code: 'L',
    nome: 'Musculoesquelético',
    nomeCompleto: 'Sistema Musculoesquelético',
    descricao: 'Doenças osteoarticulares, dores, artrites, lombalgias',
    icon: 'Bone',
    color: 'text-stone-600',
    gradient: 'from-stone-500 to-zinc-600',
    exemplos: ['Lombalgia', 'Cervicalgia', 'Osteoartrose', 'Tendinites', 'Fibromialgia'],
    estimatedCount: 15,
  },
  N: {
    code: 'N',
    nome: 'Neurológico',
    nomeCompleto: 'Sistema Nervoso',
    descricao: 'Doenças neurológicas, cefaleias, neuropatias, AVC',
    icon: 'Zap',
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-blue-600',
    exemplos: ['Cefaleia tensional', 'Enxaqueca', 'Epilepsia', 'Neuropatia diabética'],
    estimatedCount: 12,
  },
  P: {
    code: 'P',
    nome: 'Psicológico',
    nomeCompleto: 'Psicológico',
    descricao: 'Transtornos mentais e comportamentais, depressão, ansiedade',
    icon: 'Brain',
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-violet-600',
    exemplos: ['Depressão', 'Ansiedade', 'Insônia', 'Tabagismo', 'Alcoolismo', 'TDAH'],
    estimatedCount: 18,
  },
  R: {
    code: 'R',
    nome: 'Respiratório',
    nomeCompleto: 'Aparelho Respiratório',
    descricao: 'Doenças do trato respiratório superior e inferior',
    icon: 'Wind',
    color: 'text-sky-600',
    gradient: 'from-sky-500 to-blue-600',
    exemplos: ['Asma', 'DPOC', 'IVAS', 'Pneumonia', 'Rinite', 'Sinusite'],
    estimatedCount: 15,
  },
  S: {
    code: 'S',
    nome: 'Pele',
    nomeCompleto: 'Pele',
    descricao: 'Doenças dermatológicas, lesões cutâneas, infecções de pele',
    icon: 'Fingerprint',
    color: 'text-pink-600',
    gradient: 'from-pink-500 to-rose-600',
    exemplos: ['Acne', 'Dermatite atópica', 'Micoses', 'Herpes', 'Escabiose'],
    estimatedCount: 12,
  },
  T: {
    code: 'T',
    nome: 'Endócrino',
    nomeCompleto: 'Endócrino, Metabólico e Nutricional',
    descricao: 'Diabetes, doenças da tireoide, dislipidemias, obesidade',
    icon: 'Droplets',
    color: 'text-teal-600',
    gradient: 'from-teal-500 to-cyan-600',
    exemplos: ['DM2', 'Hipotireoidismo', 'Hipertireoidismo', 'Dislipidemia', 'Obesidade'],
    estimatedCount: 12,
  },
  U: {
    code: 'U',
    nome: 'Urinário',
    nomeCompleto: 'Aparelho Urinário',
    descricao: 'Doenças do trato urinário, DRC, infecções urinárias',
    icon: 'Kidney',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-indigo-600',
    exemplos: ['ITU', 'Litíase renal', 'DRC', 'Incontinência urinária'],
    estimatedCount: 10,
  },
  W: {
    code: 'W',
    nome: 'Gravidez',
    nomeCompleto: 'Gravidez, Parto e Planejamento Familiar',
    descricao: 'Pré-natal, complicações gestacionais, puerpério, contracepção',
    icon: 'Baby',
    color: 'text-pink-500',
    gradient: 'from-pink-400 to-rose-500',
    exemplos: ['Pré-natal normal', 'DMG', 'DHEG', 'Puerpério', 'Planejamento familiar'],
    estimatedCount: 12,
  },
  X: {
    code: 'X',
    nome: 'Genital Feminino',
    nomeCompleto: 'Genital Feminino (incluindo Mama)',
    descricao: 'Doenças ginecológicas, vulvovaginites, alterações menstruais',
    icon: 'Heart',
    color: 'text-rose-500',
    gradient: 'from-rose-400 to-pink-500',
    exemplos: ['Vulvovaginite', 'SOP', 'Endometriose', 'Climatério', 'Mastalgia'],
    estimatedCount: 12,
  },
  Y: {
    code: 'Y',
    nome: 'Genital Masculino',
    nomeCompleto: 'Genital Masculino',
    descricao: 'Doenças urológicas masculinas, HPB, disfunção erétil',
    icon: 'User',
    color: 'text-blue-500',
    gradient: 'from-blue-400 to-indigo-500',
    exemplos: ['HPB', 'Disfunção erétil', 'Orquite/Epididimite', 'Varicocele'],
    estimatedCount: 8,
  },
  Z: {
    code: 'Z',
    nome: 'Social',
    nomeCompleto: 'Problemas Sociais',
    descricao: 'Problemas sociais que afetam a saúde, violência, vulnerabilidade',
    icon: 'Users',
    color: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-600',
    exemplos: ['Violência doméstica', 'Problemas socioeconômicos', 'Abuso de substâncias'],
    estimatedCount: 8,
  },
};

// =============================================================================
// CÓDIGOS CIAP-2 DETALHADOS
// =============================================================================

export interface CIAP2Code {
  code: string;
  chapter: CIAP2Chapter;
  title: string;
  component: CIAP2Component;
  relatedCID10?: string[];
}

export type CIAP2Component = 
  | 'symptoms' // Sintomas e queixas (01-29)
  | 'diagnostic' // Procedimentos diagnósticos (30-49)
  | 'therapeutic' // Procedimentos terapêuticos (50-59)
  | 'results' // Resultados de exames (60-61)
  | 'administrative' // Razões administrativas (62-69)
  | 'referral' // Encaminhamentos (67)
  | 'diagnoses'; // Diagnósticos (70-99)

// =============================================================================
// CICLO DE VIDA (FILTRO COMPLEMENTAR)
// =============================================================================

export type CicloVida = 
  | 'neonato' // 0-28 dias
  | 'lactente' // 29 dias - 2 anos
  | 'pre_escolar' // 2-6 anos
  | 'escolar' // 6-12 anos
  | 'adolescente' // 12-18 anos
  | 'adulto_jovem' // 18-40 anos
  | 'adulto' // 40-60 anos
  | 'idoso' // 60+ anos
  | 'gestante'; // Qualquer idade, gestante

export const CICLOS_VIDA: Record<CicloVida, { label: string; faixaEtaria: string; icon: string }> = {
  neonato: { label: 'Neonato', faixaEtaria: '0-28 dias', icon: 'Baby' },
  lactente: { label: 'Lactente', faixaEtaria: '29 dias - 2 anos', icon: 'Baby' },
  pre_escolar: { label: 'Pré-escolar', faixaEtaria: '2-6 anos', icon: 'Baby' },
  escolar: { label: 'Escolar', faixaEtaria: '6-12 anos', icon: 'GraduationCap' },
  adolescente: { label: 'Adolescente', faixaEtaria: '12-18 anos', icon: 'User' },
  adulto_jovem: { label: 'Adulto Jovem', faixaEtaria: '18-40 anos', icon: 'User' },
  adulto: { label: 'Adulto', faixaEtaria: '40-60 anos', icon: 'User' },
  idoso: { label: 'Idoso', faixaEtaria: '60+ anos', icon: 'Users' },
  gestante: { label: 'Gestante', faixaEtaria: 'Qualquer idade', icon: 'Heart' },
};

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

export function getChapterInfo(chapter: CIAP2Chapter): CIAP2ChapterInfo {
  return CIAP2_CHAPTERS[chapter];
}

export function getAllChapters(): CIAP2ChapterInfo[] {
  return Object.values(CIAP2_CHAPTERS);
}

export function getChapterByCode(code: string): CIAP2Chapter | null {
  const firstChar = code.charAt(0).toUpperCase() as CIAP2Chapter;
  if (CIAP2_CHAPTERS[firstChar]) {
    return firstChar;
  }
  return null;
}

export function getCyclesByAge(ageInYears: number): CicloVida[] {
  const cycles: CicloVida[] = [];
  
  if (ageInYears < 0.08) cycles.push('neonato'); // ~28 dias
  if (ageInYears >= 0.08 && ageInYears < 2) cycles.push('lactente');
  if (ageInYears >= 2 && ageInYears < 6) cycles.push('pre_escolar');
  if (ageInYears >= 6 && ageInYears < 12) cycles.push('escolar');
  if (ageInYears >= 12 && ageInYears < 18) cycles.push('adolescente');
  if (ageInYears >= 18 && ageInYears < 40) cycles.push('adulto_jovem');
  if (ageInYears >= 40 && ageInYears < 60) cycles.push('adulto');
  if (ageInYears >= 60) cycles.push('idoso');
  
  return cycles;
}

