import { Citation } from './references';

export type ConvergenciaStatus = 'convergencia' | 'parcial' | 'divergencia' | 'em_disputa';

// Base structure for guideline recommendations across systems
interface GuidelineBase {
  organization?: string[]; // Ex: ["SBM", "FEBRASGO"], ["NHS"], ["USPSTF"] - optional for SUS
  population: string;
  method: string;
  periodicity: string;
  citations: Citation[];
}

export interface Recommendations {
  sus: GuidelineBase & {
    justification: string;
    coverage?: string; // SUS-specific coverage data
  };
  societies: GuidelineBase & {
    recommendation: string; // Brazilian medical societies specific field
  };
  india?: GuidelineBase & {
    justification: string; // India/NP-NCD specific justification
  };
  uk?: GuidelineBase & {
    justification: string; // UK/NHS specific justification
  };
  who?: GuidelineBase & {
    justification: string; // WHO specific justification
  };
  convergence: {
    status: ConvergenciaStatus;
    description: string;
    citations: Citation[];
  };
}

export interface Rastreamento {
  id: string;
  title: string;
  category: 'neonatal' | 'infantil' | 'adultos' | 'cancer' | 'gestacao' | 'infecciosas' | 'saude_mental' | 'outros';
  description: string; // Introdução/Resumo
  recommendations: Recommendations;
  epidemiology: {
    incidence?: string;
    mortality?: string;
    prevalence?: string;
    citations: Citation[];
  };
  lastUpdate: string; // Data da última atualização da diretriz SUS (ex: "2025-11")
}

