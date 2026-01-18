/**
 * API Client para Calculadoras Clínicas
 * Implementação client-side que simula endpoints RESTful para calculadoras
 */

import type { ClinicalCalculator, CalculatorCategory, CalculatorResult, ScoreInterpretation, CalculatorMetadata } from '@/lib/calculators/types';
import { extractMetadata } from '@/lib/calculators/types';
import { calculatorRegistry } from '@/lib/calculators/registry';
import type { APIResponse, PaginatedResponse } from './types';

/**
 * Normaliza texto para busca (remove acentos, lowercase)
 */
function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Pagina resultados
 */
function paginate<T>(items: T[], page: number = 1, pageSize: number = 20): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    pagination: {
      total,
      page,
      pageSize,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

/**
 * Interface para filtros de calculadora
 */
export interface CalculatorFilter {
  // Busca
  search?: string;

  // Filtros
  category?: CalculatorCategory;
  ids?: string[];

  // Paginação
  page?: number;
  pageSize?: number;

  // Ordenação
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * GET /api/calculators
 * Lista todas as calculadoras com filtros opcionais
 */
export async function getCalculators(
  filters: CalculatorFilter = {}
): Promise<APIResponse<PaginatedResponse<CalculatorMetadata>>> {
  try {
    let calculators = calculatorRegistry.getAll();

    // Busca textual
    if (filters.search) {
      const searchNormalized = normalizeSearch(filters.search);
      calculators = calculators.filter(calc => {
        const name = normalizeSearch(calc.name);
        const abbrev = normalizeSearch(calc.abbreviation);
        const desc = normalizeSearch(calc.description);
        const id = normalizeSearch(calc.id);

        return name.includes(searchNormalized) ||
               abbrev.includes(searchNormalized) ||
               desc.includes(searchNormalized) ||
               id.includes(searchNormalized);
      });
    }

    // Filtro por categoria
    if (filters.category) {
      calculators = calculators.filter(calc => calc.category === filters.category);
    }

    // Filtro por IDs específicos
    if (filters.ids && filters.ids.length > 0) {
      calculators = calculators.filter(calc => filters.ids!.includes(calc.id));
    }

    // Ordenação
    if (filters.sortBy) {
      const sortOrder = filters.sortOrder || 'asc';
      calculators.sort((a, b) => {
        let aVal: string | number = '';
        let bVal: string | number = '';

        switch (filters.sortBy) {
          case 'name':
            aVal = a.name;
            bVal = b.name;
            break;
          case 'abbreviation':
            aVal = a.abbreviation;
            bVal = b.abbreviation;
            break;
          case 'category':
            aVal = a.category;
            bVal = b.category;
            break;
          case 'id':
            aVal = a.id;
            bVal = b.id;
            break;
          default:
            return 0;
        }

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'asc'
            ? aVal.localeCompare(bVal, 'en')
            : bVal.localeCompare(aVal, 'en');
        }

        return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
      });
    }

    // Converte para metadados
    const metadata = calculators.map(calc => extractMetadata(calc));

    // Aplica paginação
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 20;
    const paginated = paginate(metadata, page, pageSize);

    return {
      success: true,
      data: paginated,
      meta: {
        total: paginated.pagination.total,
        page: paginated.pagination.page,
        pageSize: paginated.pagination.pageSize,
        totalPages: paginated.pagination.totalPages,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        details: error,
      },
    };
  }
}

/**
 * GET /api/calculators/:id
 * Obtém uma calculadora por ID
 */
export async function getCalculatorById(id: string): Promise<APIResponse<ClinicalCalculator>> {
  try {
    const calculator = calculatorRegistry.get(id);

    if (!calculator) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: `Calculadora com ID "${id}" não encontrada`,
        },
      };
    }

    return {
      success: true,
      data: calculator,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        details: error,
      },
    };
  }
}

/**
 * GET /api/calculators/search
 * Busca textual avançada em calculadoras
 */
export async function searchCalculators(
  query: string,
  filters: Omit<CalculatorFilter, 'search'> = {}
): Promise<APIResponse<PaginatedResponse<CalculatorMetadata>>> {
  return getCalculators({
    ...filters,
    search: query,
  });
}

/**
 * POST /api/calculators/:id/execute
 * Executa uma calculadora com os valores de entrada fornecidos
 */
export async function executeCalculator(
  id: string,
  inputs: Record<string, number>
): Promise<APIResponse<CalculatorResult>> {
  try {
    const calculator = calculatorRegistry.get(id);

    if (!calculator) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: `Calculadora com ID "${id}" não encontrada`,
        },
      };
    }

    // Valida os inputs
    const errors: Record<string, string> = {};

    for (const input of calculator.inputs) {
      if (input.required && !(input.id in inputs)) {
        errors[input.id] = `Campo obrigatório: ${input.label}`;
      }

      if (input.id in inputs && input.validation) {
        const value = inputs[input.id];

        if (input.validation.min !== undefined && value < input.validation.min) {
          errors[input.id] = input.validation.errorMessage || `Valor mínimo: ${input.validation.min}`;
        }

        if (input.validation.max !== undefined && value > input.validation.max) {
          errors[input.id] = input.validation.errorMessage || `Valor máximo: ${input.validation.max}`;
        }

        if (input.validation.customValidator && !input.validation.customValidator(value)) {
          errors[input.id] = input.validation.errorMessage || 'Valor inválido';
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Erro ao validar os campos',
          details: errors,
        },
      };
    }

    // Calcula o score
    let score: number;
    try {
      score = calculator.calculate(inputs);
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'CALCULATION_ERROR',
          message: error instanceof Error ? error.message : 'Erro ao calcular o score',
          details: error,
        },
      };
    }

    // Interpreta o resultado
    let interpretation: ScoreInterpretation;
    try {
      interpretation = calculator.interpret(score, inputs);
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'INTERPRETATION_ERROR',
          message: error instanceof Error ? error.message : 'Erro ao interpretar o resultado',
          details: error,
        },
      };
    }

    const result: CalculatorResult = {
      calculatorId: id,
      inputs,
      score,
      interpretation,
      timestamp: new Date(),
    };

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        details: error,
      },
    };
  }
}

/**
 * GET /api/calculators/by-category/:category
 * Lista calculadoras por categoria
 */
export async function getCalculatorsByCategory(
  category: CalculatorCategory
): Promise<APIResponse<PaginatedResponse<CalculatorMetadata>>> {
  return getCalculators({ category });
}

/**
 * GET /api/calculators/categories
 * Lista todas as categorias disponíveis
 */
export async function getCalculatorCategories(): Promise<APIResponse<Array<{
  category: CalculatorCategory;
  label: string;
  icon: string;
  count: number;
}>>> {
  try {
    const result = calculatorRegistry.getCategoryInfo();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        details: error,
      },
    };
  }
}

/**
 * GET /api/calculators/count
 * Conta total de calculadoras disponíveis
 */
export async function getCalculatorCount(): Promise<APIResponse<{
  total: number;
  byCategory: Record<CalculatorCategory, number>;
}>> {
  try {
    const calculators = calculatorRegistry.getAll();
    const byCategory: Record<CalculatorCategory, number> = {} as Record<CalculatorCategory, number>;

    for (const calculator of calculators) {
      byCategory[calculator.category] = (byCategory[calculator.category] || 0) + 1;
    }

    return {
      success: true,
      data: {
        total: calculators.length,
        byCategory,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        details: error,
      },
    };
  }
}

/**
 * Valida um conjunto de inputs contra uma calculadora
 */
export function validateCalculatorInputs(
  calculator: ClinicalCalculator,
  inputs: Record<string, number>
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const input of calculator.inputs) {
    if (input.required && !(input.id in inputs)) {
      errors[input.id] = `Campo obrigatório: ${input.label}`;
      continue;
    }

    if (input.id in inputs && input.validation) {
      const value = inputs[input.id];

      if (input.validation.min !== undefined && value < input.validation.min) {
        errors[input.id] = input.validation.errorMessage || `Valor mínimo: ${input.validation.min}`;
      }

      if (input.validation.max !== undefined && value > input.validation.max) {
        errors[input.id] = input.validation.errorMessage || `Valor máximo: ${input.validation.max}`;
      }

      if (input.validation.customValidator && !input.validation.customValidator(value)) {
        errors[input.id] = input.validation.errorMessage || 'Valor inválido';
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
