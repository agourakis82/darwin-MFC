/**
 * API Client para Medicamentos
 * Implementação client-side que simula endpoints RESTful
 */

import type { Medicamento, Interacao } from '@/lib/types/medicamento';
import { todosMedicamentos } from '@/lib/data/medicamentos/index';
import type { APIResponse, MedicationFilter, PaginatedResponse } from './types';

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
 * Aplica filtros a uma lista de medicamentos
 */
function applyMedicationFilters(
  medications: Medicamento[],
  filters: MedicationFilter = {}
): Medicamento[] {
  let filtered = [...medications];

  // Busca textual
  if (filters.search) {
    const searchNormalized = normalizeSearch(filters.search);
    filtered = filtered.filter(med => {
      const nomeGenerico = normalizeSearch(med.nomeGenerico || '');
      const nomesComerciais = (med.nomesComerciais || []).map(n => normalizeSearch(n)).join(' ');
      const classeTerapeutica = normalizeSearch(med.classeTerapeutica || '');
      const subclasse = normalizeSearch(med.subclasse || '');
      const id = normalizeSearch(med.id || '');
      
      return nomeGenerico.includes(searchNormalized) ||
             nomesComerciais.includes(searchNormalized) ||
             classeTerapeutica.includes(searchNormalized) ||
             subclasse.includes(searchNormalized) ||
             id.includes(searchNormalized);
    });
  }

  // Filtro por classe
  if (filters.classe) {
    filtered = filtered.filter(med => med.classeTerapeutica === filters.classe);
  }

  // Filtro por subclasse
  if (filters.subclasse) {
    filtered = filtered.filter(med => med.subclasse === filters.subclasse);
  }

  // Filtro por forma farmacêutica
  if (filters.formaFarmaceutica) {
    filtered = filtered.filter(med => 
      med.apresentacoes?.some(ap => ap.forma === filters.formaFarmaceutica)
    );
  }

  // Filtro por via de administração
  if (filters.viaAdministracao) {
    filtered = filtered.filter(med => 
      med.apresentacoes?.some(ap => ap.forma === filters.viaAdministracao)
    );
  }

  // Filtro por ATC Code
  if (filters.atcCode) {
    filtered = filtered.filter(med => 
      med.atcCode?.includes(filters.atcCode!)
    );
  }

  // Filtro por RxNorm CUI
  if (filters.rxNormCui) {
    filtered = filtered.filter(med => 
      med.rxNormCui?.includes(filters.rxNormCui!)
    );
  }

  // Filtro por DrugBank ID
  if (filters.drugBankId) {
    filtered = filtered.filter(med => 
      med.drugBankId?.includes(filters.drugBankId!)
    );
  }

  // Filtro por IDs específicos
  if (filters.ids && filters.ids.length > 0) {
    filtered = filtered.filter(med => med.id && filters.ids!.includes(med.id));
  }

  // Ordenação
  if (filters.sortBy) {
    const sortOrder = filters.sortOrder || 'asc';
    filtered.sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      switch (filters.sortBy) {
        case 'nomeGenerico':
          aVal = a.nomeGenerico || '';
          bVal = b.nomeGenerico || '';
          break;
        case 'id':
          aVal = a.id || '';
          bVal = b.id || '';
          break;
        case 'classe':
          aVal = a.classeTerapeutica || '';
          bVal = b.classeTerapeutica || '';
          break;
        default:
          return 0;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal, 'pt-BR')
          : bVal.localeCompare(aVal, 'pt-BR');
      }

      return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
  }

  return filtered;
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
 * GET /api/medications
 * Lista todos os medicamentos com filtros opcionais
 */
export async function getMedications(
  filters: MedicationFilter = {}
): Promise<APIResponse<PaginatedResponse<Medicamento>>> {
  try {
    const filtered = applyMedicationFilters(todosMedicamentos, filters);
    
    // Aplica paginação se especificada
    if (filters.page !== undefined || filters.pageSize !== undefined) {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 20;
      const paginated = paginate(filtered, page, pageSize);
      
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
    }

    return {
      success: true,
      data: {
        items: filtered,
        pagination: {
          total: filtered.length,
          page: 1,
          pageSize: filtered.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      },
      meta: {
        total: filtered.length,
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
 * GET /api/medications/:id
 * Obtém um medicamento por ID
 */
export async function getMedicationById(id: string): Promise<APIResponse<Medicamento>> {
  try {
    const medication = todosMedicamentos.find(m => m.id === id);
    
    if (!medication) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: `Medicamento com ID "${id}" não encontrado`,
        },
      };
    }

    return {
      success: true,
      data: medication,
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
 * GET /api/medications/search
 * Busca textual avançada
 */
export async function searchMedications(
  query: string,
  filters: Omit<MedicationFilter, 'search'> = {}
): Promise<APIResponse<PaginatedResponse<Medicamento>>> {
  return getMedications({
    ...filters,
    search: query,
  });
}

/**
 * GET /api/medications/interactions
 * Busca interações entre medicamentos
 */
export async function getMedicationInteractions(
  medicationIds: string[]
): Promise<APIResponse<Array<{
  medication1: string;
  medication2: string;
  interaction: Interacao;
}>>> {
  try {
    const interactions: Array<{
      medication1: string;
      medication2: string;
      interaction: Interacao;
    }> = [];

    // Para cada par de medicamentos, verifica interações
    for (let i = 0; i < medicationIds.length; i++) {
      for (let j = i + 1; j < medicationIds.length; j++) {
        const med1 = todosMedicamentos.find(m => m.id === medicationIds[i]);
        const med2 = todosMedicamentos.find(m => m.id === medicationIds[j]);

        if (med1 && med2) {
          // Verifica se med1 tem interação com med2
          const interaction = med1.interacoes?.find(
            inter => inter.medicamento === med2.id || inter.medicamento === med2.nomeGenerico
          );

          if (interaction) {
            interactions.push({
              medication1: med1.id,
              medication2: med2.id,
              interaction,
            });
          }

          // Verifica se med2 tem interação com med1 (bidirecional)
          const reverseInteraction = med2.interacoes?.find(
            inter => inter.medicamento === med1.id || inter.medicamento === med1.nomeGenerico
          );

          if (reverseInteraction) {
            interactions.push({
              medication1: med2.id,
              medication2: med1.id,
              interaction: reverseInteraction,
            });
          }
        }
      }
    }

    return {
      success: true,
      data: interactions,
      meta: {
        total: interactions.length,
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
 * GET /api/medications/by-class/:class
 * Lista medicamentos por classe
 */
export async function getMedicationsByClass(
  classe: string
): Promise<APIResponse<PaginatedResponse<Medicamento>>> {
  return getMedications({ classe });
}

/**
 * GET /api/medications/classes
 * Lista todas as classes disponíveis
 */
export async function getMedicationClasses(): Promise<APIResponse<string[]>> {
  try {
    const classes = Array.from(
      new Set(todosMedicamentos.map(m => m.classeTerapeutica).filter(Boolean))
    ) as string[];

    return {
      success: true,
      data: classes.sort(),
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

