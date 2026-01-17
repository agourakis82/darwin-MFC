import { Citation } from './references';
import { ScreeningOntologyMapping } from './ontologies';

export type ConvergenciaStatus = 'convergencia' | 'parcial' | 'divergencia' | 'em_disputa';

export interface Recommendations {
  sus: {
    population: string;
    method: string;
    periodicity: string;
    justification: string;
    /**
     * Current screening coverage percentage or rate in Brazil.
     * When omitted, coverage data is not available or not applicable for this screening.
     */
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
  /**
   * India National Programme for Prevention and Control of Non-Communicable Diseases (NP-NCD) guidelines.
   * When omitted, no specific Indian guidelines are available for this screening.
   */
  india?: {
    organization: string[]; // Ex: ["NP-NCD", "MoHFW"]
    population: string;
    method: string;
    periodicity: string;
    justification: string;
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
    /**
     * Incidence rate of the condition being screened.
     * When omitted, incidence data is not available or not the primary epidemiological metric.
     */
    incidence?: string;
    /**
     * Mortality rate or death statistics related to the condition.
     * When omitted, mortality data is not available or not applicable.
     */
    mortality?: string;
    /**
     * Prevalence of the condition in the target population.
     * When omitted, prevalence data is not available or not the primary epidemiological metric.
     */
    prevalence?: string;
    citations: Citation[];
  };
  lastUpdate: string; // Data da última atualização da diretriz SUS (ex: "2025-11")
  /**
   * Medical ontology mappings (ICD-10, LOINC, SNOMED-CT, etc.) for interoperability.
   * When omitted, ontology mappings have not been assigned to this screening.
   */
  ontologies?: ScreeningOntologyMapping;
}

