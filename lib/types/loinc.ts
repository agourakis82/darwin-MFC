/**
 * LOINC Integration Types for Darwin-MFC
 * Generated via Grok 4 Fast, refined by Claude
 *
 * LOINC (Logical Observation Identifiers Names and Codes) provides
 * standardized codes for laboratory tests and clinical observations.
 */

/**
 * Representa um código LOINC único.
 */
export interface LOINCCode {
  /** Código LOINC (e.g., "2345-7") */
  code: string;
  /** Componente sendo medido (e.g., "Glucose") */
  component: string;
  /** Propriedade da medição (e.g., "MCnc" para concentração de massa) */
  property: string;
  /** Temporalidade (e.g., "Pt" para ponto no tempo) */
  timing: string;
  /** Sistema/espécime (e.g., "Ser/Plas" para soro/plasma) */
  system: string;
  /** Escala (e.g., "Qn" para quantitativo) */
  scale: string;
  /** Método de medição (opcional) */
  method?: string;
  /** Nome comum longo */
  longCommonName: string;
  /** Nome curto */
  shortName: string;
  /** Classe do teste (e.g., "CHEM", "HEM/BC", "MICRO") */
  class: string;
  /** Status do código */
  status: 'ACTIVE' | 'DEPRECATED';
  /** Nome em português (adicionado para Darwin-MFC) */
  namePt?: string;
  /** Valores de referência (adicionado para Darwin-MFC) */
  referenceRange?: {
    low?: number;
    high?: number;
    unit: string;
    population?: 'adult' | 'pediatric' | 'neonatal';
  };
}

/**
 * Representa uma categoria de testes LOINC, agrupando códigos por categoria.
 */
export interface LOINCCategory {
  /** ID da categoria */
  id: string;
  /** Nome em português */
  name: string;
  /** Nome em inglês */
  nameEn: string;
  /** Códigos LOINC nesta categoria */
  codes: LOINCCode[];
  /** Nome do ícone Lucide (opcional) */
  icon?: string;
  /** Descrição da categoria */
  description?: string;
}

/**
 * Resultado de busca LOINC para autocomplete.
 */
export interface LOINCSearchResult {
  /** Código LOINC encontrado */
  code: LOINCCode;
  /** Pontuação de correspondência (0-1) */
  matchScore: number;
  /** Campo onde houve correspondência */
  matchedField: 'component' | 'longCommonName' | 'shortName' | 'code' | 'namePt';
}

/**
 * Mapeamento de doença para exames LOINC recomendados.
 */
export interface DiseaseLOINCMapping {
  /** ID da doença (slug) */
  diseaseId: string;
  /** Códigos LOINC para diagnóstico */
  diagnosticTests: LOINCCode[];
  /** Códigos LOINC para monitoramento */
  monitoringTests: LOINCCode[];
  /** Nível de evidência para cada teste */
  evidenceLevel?: Record<string, 'A' | 'B' | 'C' | 'D'>;
}

// =============================================================================
// DADOS: Categorias de testes laboratoriais para APS
// =============================================================================

export const LOINC_CATEGORIES: LOINCCategory[] = [
  {
    id: 'CHEM',
    name: 'Bioquímica',
    nameEn: 'Chemistry',
    icon: 'test-tube',
    description: 'Exames bioquímicos gerais',
    codes: []
  },
  {
    id: 'HEM/BC',
    name: 'Hematologia',
    nameEn: 'Hematology',
    icon: 'droplets',
    description: 'Hemograma e coagulação',
    codes: []
  },
  {
    id: 'MICRO',
    name: 'Microbiologia',
    nameEn: 'Microbiology',
    icon: 'bug',
    description: 'Culturas e testes microbiológicos',
    codes: []
  },
  {
    id: 'UA',
    name: 'Urinálise',
    nameEn: 'Urinalysis',
    icon: 'flask-conical',
    description: 'Exames de urina',
    codes: []
  },
  {
    id: 'SERO',
    name: 'Sorologia',
    nameEn: 'Serology',
    icon: 'shield',
    description: 'Testes sorológicos e imunológicos',
    codes: []
  },
  {
    id: 'ENDO',
    name: 'Endocrinologia',
    nameEn: 'Endocrinology',
    icon: 'activity',
    description: 'Hormônios e função endócrina',
    codes: []
  }
];

// =============================================================================
// FUNÇÕES DE BUSCA
// =============================================================================

// Store para códigos carregados (populado via lib/data/loinc/)
let loincCodeStore: LOINCCode[] = [];

/**
 * Inicializa o store de códigos LOINC.
 * @param codes - Array de códigos LOINC
 */
export function initializeLOINCStore(codes: LOINCCode[]): void {
  loincCodeStore = codes;
}

/**
 * Busca códigos LOINC por consulta de texto.
 * @param query - String de busca
 * @returns Array de resultados ordenados por relevância
 */
export function searchLOINC(query: string): LOINCSearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const queryLower = query.toLowerCase().trim();
  const results: LOINCSearchResult[] = [];

  for (const code of loincCodeStore) {
    if (code.status !== 'ACTIVE') continue;

    const fieldsToSearch: Array<{
      field: keyof LOINCCode;
      matchedField: LOINCSearchResult['matchedField'];
    }> = [
      { field: 'code', matchedField: 'code' },
      { field: 'component', matchedField: 'component' },
      { field: 'shortName', matchedField: 'shortName' },
      { field: 'longCommonName', matchedField: 'longCommonName' },
      { field: 'namePt', matchedField: 'namePt' }
    ];

    for (const { field, matchedField } of fieldsToSearch) {
      const value = code[field];
      if (typeof value !== 'string') continue;

      const valueLower = value.toLowerCase();
      let score = 0;

      if (valueLower === queryLower) {
        score = 1; // Correspondência exata
      } else if (valueLower.startsWith(queryLower)) {
        score = 0.8; // Inicia com a query
      } else if (valueLower.includes(queryLower)) {
        score = 0.5; // Contém a query
      }

      if (score > 0) {
        results.push({ code, matchScore: score, matchedField });
        break; // Um match por código é suficiente
      }
    }
  }

  // Ordena por score descendente
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Obtém um código LOINC pelo seu código único.
 * @param code - Código LOINC (e.g., "2345-7")
 * @returns Código LOINC ou undefined
 */
export function getLOINCByCode(code: string): LOINCCode | undefined {
  return loincCodeStore.find(c => c.code === code);
}

/**
 * Obtém todos os códigos LOINC de uma categoria.
 * @param categoryId - ID da categoria (e.g., "CHEM")
 * @returns Array de códigos LOINC
 */
export function getLOINCByCategory(categoryId: string): LOINCCode[] {
  return loincCodeStore.filter(c => c.class === categoryId && c.status === 'ACTIVE');
}

/**
 * Obtém exames recomendados para uma doença.
 * @param diseaseId - ID da doença
 * @param mappings - Mapeamentos doença→LOINC
 * @returns Códigos LOINC recomendados
 */
export function getRecommendedTests(
  diseaseId: string,
  mappings: DiseaseLOINCMapping[]
): { diagnostic: LOINCCode[]; monitoring: LOINCCode[] } {
  const mapping = mappings.find(m => m.diseaseId === diseaseId);
  if (!mapping) {
    return { diagnostic: [], monitoring: [] };
  }
  return {
    diagnostic: mapping.diagnosticTests,
    monitoring: mapping.monitoringTests
  };
}
