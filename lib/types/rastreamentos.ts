import { Citation } from './references';

export type ConvergenciaStatus = 'convergencia' | 'parcial' | 'divergencia' | 'em_disputa';

export interface Recommendations {
  sus: {
    population: string;
    method: string;
    periodicity: string;
    justification: string;
    coverage?: string;
    citations: Citation[]; // Citações para cada campo se necessário, ou global
  };
  societies: {
    organization: string[]; // Ex: ["SBM", "FEBRASGO"]
    population: string;
    method: string;
    periodicity: string;
    recommendation: string;
    citations: Citation[];
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

