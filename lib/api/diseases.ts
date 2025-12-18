/**
 * API Client para Doenças
 * Implementação client-side que simula endpoints RESTful
 */

import type { Doenca } from '@/lib/types/doenca';
import { doencasConsolidadas as todasDoencas } from '@/lib/data/doencas/index';
import type { APIResponse, DiseaseFilter, PaginatedResponse } from './types';

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
 * Aplica filtros a uma lista de doenças
 */
function applyDiseaseFilters(
  diseases: Partial<Doenca>[],
  filters: DiseaseFilter = {}
): Partial<Doenca>[] {
  let filtered = [...diseases];

  // Busca textual
  if (filters.search) {
    const searchNormalized = normalizeSearch(filters.search);
    filtered = filtered.filter(disease => {
      const titulo = normalizeSearch(disease.titulo || '');
      const sinonimos = (disease.sinonimos || []).map(s => normalizeSearch(s)).join(' ');
      const definicao = normalizeSearch(disease.quickView?.definicao || '');
      const id = normalizeSearch(disease.id || '');
      
      return titulo.includes(searchNormalized) ||
             sinonimos.includes(searchNormalized) ||
             definicao.includes(searchNormalized) ||
             id.includes(searchNormalized);
    });
  }

  // Filtro por categoria
  if (filters.category || filters.categoria) {
    const categoria = filters.category || filters.categoria;
    filtered = filtered.filter(disease => disease.categoria === categoria);
  }

  // Filtro por CID-10
  if (filters.cid10) {
    filtered = filtered.filter(disease => 
      disease.cid10?.some(cid => cid.includes(filters.cid10!))
    );
  }

  // Filtro por CIAP-2
  if (filters.ciap2) {
    filtered = filtered.filter(disease => 
      disease.ciap2?.some(ciap => ciap.includes(filters.ciap2!))
    );
  }

  // Filtro por DOID
  if (filters.doid) {
    filtered = filtered.filter(disease => 
      disease.doid?.includes(filters.doid!)
    );
  }

  // Filtro por SNOMED-CT
  if (filters.snomedCT) {
    filtered = filtered.filter(disease => 
      disease.snomedCT?.includes(filters.snomedCT!)
    );
  }

  // Filtro por IDs específicos
  if (filters.ids && filters.ids.length > 0) {
    filtered = filtered.filter(disease => disease.id && filters.ids!.includes(disease.id));
  }

  // Ordenação
  if (filters.sortBy) {
    const sortOrder = filters.sortOrder || 'asc';
    filtered.sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      switch (filters.sortBy) {
        case 'titulo':
          aVal = a.titulo || '';
          bVal = b.titulo || '';
          break;
        case 'id':
          aVal = a.id || '';
          bVal = b.id || '';
          break;
        case 'categoria':
          aVal = a.categoria || '';
          bVal = b.categoria || '';
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
 * GET /api/diseases
 * Lista todas as doenças com filtros opcionais
 */
export async function getDiseases(
  filters: DiseaseFilter = {}
): Promise<APIResponse<PaginatedResponse<Partial<Doenca>>>> {
  try {
    const filtered = applyDiseaseFilters(todasDoencas, filters);
    
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
 * GET /api/diseases/:id
 * Obtém uma doença por ID
 */
export async function getDiseaseById(id: string): Promise<APIResponse<Partial<Doenca>>> {
  try {
    const disease = todasDoencas.find(d => d.id === id);
    
    if (!disease) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: `Doença com ID "${id}" não encontrada`,
        },
      };
    }

    return {
      success: true,
      data: disease,
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
 * GET /api/diseases/search
 * Busca textual avançada
 */
export async function searchDiseases(
  query: string,
  filters: Omit<DiseaseFilter, 'search'> = {}
): Promise<APIResponse<PaginatedResponse<Partial<Doenca>>>> {
  return getDiseases({
    ...filters,
    search: query,
  });
}

/**
 * GET /api/diseases/by-cid10/:cid10
 * Busca doenças por código CID-10
 */
export async function getDiseasesByCID10(
  cid10: string
): Promise<APIResponse<PaginatedResponse<Partial<Doenca>>>> {
  return getDiseases({ cid10 });
}

/**
 * GET /api/diseases/by-ciap2/:ciap2
 * Busca doenças por código CIAP-2
 */
export async function getDiseasesByCIAP2(
  ciap2: string
): Promise<APIResponse<PaginatedResponse<Partial<Doenca>>>> {
  return getDiseases({ ciap2 });
}

/**
 * GET /api/diseases/by-category/:category
 * Lista doenças por categoria
 */
export async function getDiseasesByCategory(
  category: string
): Promise<APIResponse<PaginatedResponse<Partial<Doenca>>>> {
  return getDiseases({ category });
}

/**
 * GET /api/diseases/categories
 * Lista todas as categorias disponíveis
 */
export async function getDiseaseCategories(): Promise<APIResponse<string[]>> {
  try {
    const categories = Array.from(
      new Set(todasDoencas.map(d => d.categoria).filter(Boolean))
    ) as string[];

    return {
      success: true,
      data: categories.sort(),
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

