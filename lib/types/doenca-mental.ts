/**
 * Tipos específicos para Doenças Mentais
 * Extensão do tipo Doenca base com ontologias DSM-5
 */

import type { Doenca, QuickViewContent, FullDoencaContent } from './doenca';
import type { DSM5Code, DSM5DiagnosticCriteria, DSM5Category } from './dsm5';

/**
 * Doença Mental
 * Extensão de Doenca com campos específicos para saúde mental
 * Usamos intersection type para adicionar campos DSM-5 sem quebrar a estrutura base
 */
export type DoencaMental = Doenca & {
  /**
   * Ontologia DSM-5
   */
  dsm5?: {
    /**
     * Código DSM-5 principal
     */
    code: string;
    
    /**
     * Código DSM-5 alternativo (se houver revisão)
     */
    codeAlternative?: string;
    
    /**
     * Categoria DSM-5
     */
    category: DSM5Category;
    
    /**
     * Critérios diagnósticos DSM-5
     */
    diagnosticCriteria?: DSM5DiagnosticCriteria;
    
    /**
     * Especificadores disponíveis
     */
    specifiers?: {
      severity?: string[];
      course?: string[];
      episode?: string[];
      remission?: string[];
      withAnxiousDistress?: boolean;
      withMelancholicFeatures?: boolean;
      withAtypicalFeatures?: boolean;
      withPsychoticFeatures?: boolean;
      withCatatonia?: boolean;
      withPeripartumOnset?: boolean;
      withSeasonalPattern?: boolean;
    };
    
    /**
     * Exclusões (outros diagnósticos que devem ser descartados)
     */
    exclusions?: string[];
    
    /**
     * Notas adicionais DSM-5
     */
    notes?: string;
  };
  
  /**
   * Critérios diagnósticos simplificados (resumo)
   */
  criteriosDiagnosticosSimplificados?: string[];
  
  /**
   * Escalas de avaliação recomendadas
   */
  escalasAvaliacao?: {
    name: string;
    description: string;
    cutoff?: string;
    reference?: string;
  }[];
  
  /**
   * Tratamento primeira linha (específico para saúde mental)
   */
  tratamentoPrimeiraLinha?: {
    psicoterapia?: {
      tipo: string; // CBT, IPT, DBT, etc.
      frequencia: string;
      duracao: string;
    };
    farmacoterapia?: {
      classe: string; // ISRS, antipsicóticos, estabilizadores de humor, etc.
      medicamentos: string[]; // IDs de medicamentos
      doseInicial?: string;
      titulacao?: string;
      duracao?: string;
    };
    outros?: string[];
  };
  
  /**
   * Critérios de encaminhamento para especialista
   */
  criteriosEncaminhamento?: string[];
  
  /**
   * Urgência e emergência em saúde mental
   */
  urgencia?: {
    riscosuicida?: boolean;
    riscoAgressao?: boolean;
    riscoAutolesao?: boolean;
    criterios?: string[];
  };
  
  /**
   * Comorbidades comuns
   */
  comorbidadesComuns?: string[]; // IDs de outras doenças mentais
};

/**
 * Transtorno Neurológico
 * Para doenças neurológicas com especificidades
 */
export type TranstornoNeurologico = Doenca & {
  /**
   * Classificação neurológica
   */
  classificacao?: {
    tipo: 
      | 'epilepsia'
      | 'cefaleia'
      | 'neuropatia'
      | 'miopatia'
      | 'doenca_desmielinizante'
      | 'doenca_neurodegenerativa'
      | 'doenca_cerebrovascular'
      | 'movimento_anormal'
      | 'disturbio_cognitivo'
      | 'outros';
    
    /**
     * Subclassificação
     */
    subtipo?: string;
    
    /**
     * Classificação adicional (ex: Classificação ILAE para epilepsia)
     */
    classificacaoEspecifica?: {
      sistema: string; // Ex: "ILAE 2017", "ICHD-3"
      codigo: string;
      descricao: string;
    };
  };
  
  /**
   * Exames neurológicos específicos
   */
  examesNeurologicos?: {
    tipo: string; // EEG, EMG, RM, etc.
    indicacao: string;
    quandoSolicitar?: string;
  }[];
  
  /**
   * Sinais neurológicos característicos
   */
  sinaisNeurologicos?: string[];
  
  /**
   * Escalas de avaliação neurológica
   */
  escalasNeurologicas?: {
    name: string;
    description: string;
    uso: string;
  }[];
  
  /**
   * Tratamento específico neurológico
   */
  tratamentoNeurologico?: {
    primeiraLinha?: {
      medicamentos: string[]; // IDs
      outrasIntervencoes?: string[];
    };
    segundaLinha?: {
      medicamentos: string[]; // IDs
      outrasIntervencoes?: string[];
    };
    cirurgia?: {
      indicacao?: string;
      tipo?: string;
    };
  };
  
  /**
   * Prognóstico
   */
  prognostico?: {
    curso: 'agudo' | 'subagudo' | 'cronico' | 'recidivante-remitente' | 'progressivo';
    expectativa?: string;
    fatoresPrognosticos?: string[];
  };
};
