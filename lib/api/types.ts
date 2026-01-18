/**
 * Tipos para API RESTful v1 - Darwin-MFC
 * Compatível com padrões REST e preparado para migração para endpoints server-side
 *
 * Standard response wrappers para todos os endpoints da API.
 * Suporta paginação, tratamento de erros e metadados.
 */

/**
 * Response padrão da API
 */
export interface APIResponse<T> {
  /** Status de sucesso da requisição */
  success: boolean;

  /** Dados da resposta */
  data?: T;

  /** Objeto de erro se falhou */
  error?: {
    /** Código do erro para tratamento programático */
    code: string;

    /** Mensagem de erro legível */
    message: string;

    /** Detalhes adicionais sobre o erro */
    details?: unknown;
  };

  /** Metadados da resposta */
  meta?: {
    /** Total de itens disponíveis */
    total?: number;

    /** Número da página atual (1-indexed) */
    page?: number;

    /** Quantidade de itens por página */
    pageSize?: number;

    /** Total de páginas */
    totalPages?: number;

    /** Timestamp da resposta */
    timestamp?: string;

    /** Versão da API */
    version?: string;
  };
}

export interface APIFilter {
  // Filtros genéricos
  search?: string; // Busca textual
  category?: string; // Categoria específica
  ids?: string[]; // Lista de IDs específicos
  
  // Paginação
  page?: number;
  pageSize?: number;
  
  // Ordenação
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  
  // Filtros específicos de doenças
  cid10?: string;
  ciap2?: string;
  doid?: string;
  snomedCT?: string;
  
  // Filtros específicos de medicamentos
  atcCode?: string;
  rxNormCui?: string;
  drugBankId?: string;
  classe?: string;
  subclasse?: string;
}

export interface DiseaseFilter extends APIFilter {
  categoria?: string;
  riscoMinimo?: 'baixo' | 'moderado' | 'alto' | 'muito_alto';
}

export interface MedicationFilter extends APIFilter {
  classe?: string;
  subclasse?: string;
  formaFarmaceutica?: string;
  viaAdministracao?: string;
}

export interface ProtocolFilter extends APIFilter {
  category?: 'neonatal' | 'infantil' | 'adultos' | 'cancer' | 'gestacao' | 'infecciosas' | 'saude_mental' | 'outros';
}

/**
 * Endpoints disponíveis
 */
export enum APIEndpoint {
  // Doenças
  DISEASES = '/api/diseases',
  DISEASE_BY_ID = '/api/diseases/:id',
  DISEASE_SEARCH = '/api/diseases/search',
  
  // Medicamentos
  MEDICATIONS = '/api/medications',
  MEDICATION_BY_ID = '/api/medications/:id',
  MEDICATION_SEARCH = '/api/medications/search',
  MEDICATION_INTERACTIONS = '/api/medications/interactions',
  
  // Protocolos
  PROTOCOLS = '/api/protocols',
  PROTOCOL_BY_ID = '/api/protocols/:id',
  
  // Casos Clínicos
  CLINICAL_CASES = '/api/clinical-cases',
  CLINICAL_CASE_BY_ID = '/api/clinical-cases/:id',
  
  // Flashcards e Quiz
  FLASHCARDS = '/api/flashcards',
  QUIZ_QUESTIONS = '/api/quiz',
  
  // Checklists
  CHECKLISTS = '/api/checklists',
  CHECKLIST_BY_DISEASE = '/api/checklists/disease/:diseaseId',
}

/**
 * Opções de request
 */
export interface APIRequestOptions {
  filters?: APIFilter;
  headers?: Record<string, string>;
  signal?: AbortSignal; // Para cancelamento
}

/**
 * Resultado de busca paginada
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

