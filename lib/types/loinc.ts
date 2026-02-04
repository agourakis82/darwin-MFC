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

  /** Reference ranges by age/sex/condition (enhanced for Phase 2) */
  referenceRanges?: ReferenceRange[];

  /** Related diseases (CID-10 codes) */
  relatedDiseases?: string[];

  /** Related medications (ATC codes) */
  relatedMedications?: string[];

  /** Clinical interpretation guidelines */
  clinicalInterpretation?: ClinicalInterpretation;

  /** Ordering guidelines */
  orderingGuidelines?: string;

  /** Common aliases */
  aliases?: string[];
}

/**
 * Enhanced reference range with age/sex/condition specificity
 * Added for Phase 2 Month 4
 */
export interface ReferenceRange {
  /** Age range (optional) */
  age?: {
    min: number;
    max: number;
    unit: 'years' | 'months' | 'days';
  };

  /** Sex-specific range */
  sex?: 'M' | 'F' | 'both';

  /** Special condition (e.g., "pregnant", "fasting") */
  condition?: string;

  /** Lower bound */
  low: number;

  /** Upper bound */
  high: number;

  /** Unit */
  unit: string;

  /** Critical low (panic value) */
  criticalLow?: number;

  /** Critical high (panic value) */
  criticalHigh?: number;

  /** Interpretation labels */
  interpretation: {
    low: string;
    normal: string;
    high: string;
    criticalLow?: string;
    criticalHigh?: string;
  };
}

/**
 * Clinical interpretation guidelines
 */
export interface ClinicalInterpretation {
  lowInterpretation?: string;
  highInterpretation?: string;
  commonCauses?: {
    low?: string[];
    high?: string[];
  };
  followUp?: string;
  repeatTesting?: string;
}

/**
 * Lab result interpretation
 */
export interface InterpretationResult {
  value: number;
  unit: string;
  status: 'critical_low' | 'low' | 'normal' | 'high' | 'critical_high';
  statusLabel: string;
  appliedRange: ReferenceRange;
  interpretation?: string;
  recommendations?: string[];
  color: 'red' | 'yellow' | 'green' | 'orange';
}

/**
 * Patient demographics for lab interpretation
 */
export interface PatientLabData {
  age: number;
  sex: 'M' | 'F';
  condition?: string;
  conditions?: string[];
  medications?: string[];
}

/**
 * Lab test result with interpretation
 */
export interface LabResult {
  id: string;
  loincCode: string;
  value: number;
  unit: string;
  date: Date;
  interpretation?: InterpretationResult;
  notes?: string;
  orderedBy?: string;
  performedBy?: string;
}

/**
 * Lab panel (group of tests)
 */
export interface LabPanel {
  id: string;
  name: string;
  description: string;
  loincCodes: string[];
  indications: string[];
  category: 'screening' | 'diagnostic' | 'monitoring';
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

/**
 * Interprets a lab result value against reference ranges
 * Added for Phase 2 Month 4
 *
 * @param loincCode - LOINC code object
 * @param value - Test result value
 * @param unit - Unit of measurement
 * @param patientData - Patient demographics
 * @returns Interpretation result
 */
export function interpretResult(
  loincCode: LOINCCode,
  value: number,
  unit: string,
  patientData: PatientLabData
): InterpretationResult | null {
  if (!loincCode.referenceRanges || loincCode.referenceRanges.length === 0) {
    return null;
  }

  // Find the most specific reference range that applies
  let applicableRange: ReferenceRange | undefined;

  for (const range of loincCode.referenceRanges) {
    // Check unit match
    if (range.unit !== unit) continue;

    // Check age match
    if (range.age) {
      const ageInYears = patientData.age;
      const minAge = range.age.unit === 'years' ? range.age.min :
                      range.age.unit === 'months' ? range.age.min / 12 :
                      range.age.min / 365;
      const maxAge = range.age.unit === 'years' ? range.age.max :
                      range.age.unit === 'months' ? range.age.max / 12 :
                      range.age.max / 365;

      if (ageInYears < minAge || ageInYears > maxAge) continue;
    }

    // Check sex match
    if (range.sex && range.sex !== 'both' && range.sex !== patientData.sex) {
      continue;
    }

    // Check condition match
    if (range.condition && range.condition !== patientData.condition) {
      continue;
    }

    // This range applies
    applicableRange = range;
    break;
  }

  if (!applicableRange) {
    // Fallback to first range with matching unit
    applicableRange = loincCode.referenceRanges.find(r => r.unit === unit);
  }

  if (!applicableRange) {
    return null;
  }

  // Determine status
  let status: InterpretationResult['status'];
  let statusLabel: string;
  let color: InterpretationResult['color'];

  if (applicableRange.criticalLow && value < applicableRange.criticalLow) {
    status = 'critical_low';
    statusLabel = applicableRange.interpretation.criticalLow || 'Critical Low';
    color = 'red';
  } else if (value < applicableRange.low) {
    status = 'low';
    statusLabel = applicableRange.interpretation.low;
    color = 'yellow';
  } else if (applicableRange.criticalHigh && value > applicableRange.criticalHigh) {
    status = 'critical_high';
    statusLabel = applicableRange.interpretation.criticalHigh || 'Critical High';
    color = 'red';
  } else if (value > applicableRange.high) {
    status = 'high';
    statusLabel = applicableRange.interpretation.high;
    color = 'orange';
  } else {
    status = 'normal';
    statusLabel = applicableRange.interpretation.normal;
    color = 'green';
  }

  // Build interpretation text
  const interpretation = loincCode.clinicalInterpretation ?
    (status === 'low' || status === 'critical_low' ?
      loincCode.clinicalInterpretation.lowInterpretation :
      loincCode.clinicalInterpretation.highInterpretation) :
    undefined;

  // Build recommendations
  const recommendations: string[] = [];
  if (status === 'critical_low' || status === 'critical_high') {
    recommendations.push('Notificar médico imediatamente');
  }
  if (loincCode.clinicalInterpretation?.followUp) {
    recommendations.push(loincCode.clinicalInterpretation.followUp);
  }

  return {
    value,
    unit,
    status,
    statusLabel,
    appliedRange: applicableRange,
    interpretation,
    recommendations,
    color,
  };
}
