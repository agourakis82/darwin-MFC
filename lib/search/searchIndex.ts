/**
 * UNIFIED SEARCH INDEX
 * ====================
 *
 * Indexes all entities for fast, comprehensive search
 * Medications, Diseases, Protocols, Calculators, Clinical Cases
 */

import Fuse from 'fuse.js';
import { medicamentosConsolidados } from '../data/medicamentos/index';
import { todasDoencas } from '../data/doencas/index';
import { calculadoras } from '../utils/calculators';

// ==============================================
// SEARCH RESULT TYPES
// ==============================================

export type EntityType =
  | 'medication'
  | 'disease'
  | 'protocol'
  | 'calculator'
  | 'case'
  | 'rastreamento';

export interface SearchableEntity {
  id: string;
  type: EntityType;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  specialty?: string;
  metadata?: Record<string, any>;
}

export interface SearchResult extends SearchableEntity {
  score: number;
  matches?: string[];
}

// ==============================================
// BUILD SEARCH INDEX
// ==============================================

/**
 * Build comprehensive search index from all entities
 */
export function buildSearchIndex(): SearchableEntity[] {
  const entities: SearchableEntity[] = [];

  // Index medications
  medicamentosConsolidados.forEach(med => {
    entities.push({
      id: med.id,
      type: 'medication',
      title: med.nomeGenerico,
      description: `${med.classeTerapeutica} - ${med.mecanismoAcao || ''}`,
      tags: [
        ...(med.tags || []),
        ...(med.nomesComerciais || []),
        med.classeTerapeutica,
        med.subclasse || '',
        med.atcCode || '',
        ...(med.indicacoes || []),
      ].filter(Boolean),
      category: med.classeTerapeutica,
      metadata: {
        rename: med.rename,
        sus: med.apresentacoes?.some(a => a.disponivelSUS),
        gestacao: med.gestacao,
      },
    });
  });

  // Index diseases
  todasDoencas.forEach(doenca => {
    if (!doenca.id) return;

    const title = (doenca as any).titulo || (doenca as any).nome || '';
    const categoria = (doenca as any).categoria || '';

    if (!title) return;

    entities.push({
      id: doenca.id,
      type: 'disease',
      title: title,
      description: (doenca as any).descricao || (doenca as any).resumo || '',
      tags: [
        ...((doenca as any).tags || []),
        categoria,
        (doenca as any).cid10?.codigo || '',
        (doenca as any).cid10?.nome || '',
        (doenca as any).prevalencia || '',
        ...((doenca as any).sinonimos || []),
      ].filter(Boolean) as string[],
      category: categoria,
      specialty: (doenca as any).especialidade,
      metadata: {
        cid10: (doenca as any).cid10,
        gravidade: (doenca as any).gravidade,
        prevalencia: (doenca as any).prevalencia,
      },
    });
  });

  // Index calculators
  calculadoras.forEach(calc => {
    entities.push({
      id: calc.id,
      type: 'calculator',
      title: calc.nome,
      description: calc.descricao,
      tags: [
        calc.categoria,
        ...(calc.tags || []),
      ].filter(Boolean) as string[],
      category: calc.categoria,
      metadata: {},
    });
  });

  // TODO: Index protocols when available
  // TODO: Index clinical cases when available
  // TODO: Index rastreamentos when available

  return entities;
}

// ==============================================
// FUSE.JS CONFIGURATION
// ==============================================

const fuseOptions = {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'description', weight: 2 },
    { name: 'tags', weight: 1.5 },
    { name: 'category', weight: 1 },
    { name: 'specialty', weight: 1 },
  ],
  threshold: 0.4, // 0 = perfect match, 1 = match anything
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true, // Search anywhere in string
  useExtendedSearch: true, // Enable advanced queries
};

// ==============================================
// SEARCH ENGINE
// ==============================================

let searchEngine: Fuse<SearchableEntity> | null = null;

/**
 * Initialize search engine (lazy loading)
 */
function getSearchEngine(): Fuse<SearchableEntity> {
  if (!searchEngine) {
    const index = buildSearchIndex();
    searchEngine = new Fuse(index, fuseOptions);
  }
  return searchEngine;
}

/**
 * Perform unified search across all entities
 */
export interface SearchOptions {
  /** Search query */
  query: string;

  /** Filter by entity types */
  types?: EntityType[];

  /** Filter by categories */
  categories?: string[];

  /** Filter by specialty */
  specialties?: string[];

  /** Maximum results */
  limit?: number;

  /** Include metadata in results */
  includeMetadata?: boolean;
}

export function search(options: SearchOptions): SearchResult[] {
  const {
    query,
    types,
    categories,
    specialties,
    limit = 50,
    includeMetadata = true,
  } = options;

  if (!query || query.trim().length < 2) {
    return [];
  }

  const fuse = getSearchEngine();
  const results = fuse.search(query);

  // Filter and transform results
  let filtered = results
    .map(result => ({
      ...result.item,
      score: result.score || 0,
      matches: result.matches?.map(m => m.key || ''),
      ...(includeMetadata ? {} : { metadata: undefined }),
    }))
    .filter(item => {
      // Filter by type
      if (types && types.length > 0 && !types.includes(item.type)) {
        return false;
      }

      // Filter by category
      if (categories && categories.length > 0 && !categories.includes(item.category || '')) {
        return false;
      }

      // Filter by specialty
      if (specialties && specialties.length > 0 && !specialties.includes(item.specialty || '')) {
        return false;
      }

      return true;
    });

  // Limit results
  if (limit > 0) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}

/**
 * Search with autocomplete suggestions
 */
export function searchSuggestions(query: string, limit = 5): string[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const results = search({ query, limit });

  return results
    .map(r => r.title)
    .filter((title, index, self) => self.indexOf(title) === index) // Unique
    .slice(0, limit);
}

/**
 * Get popular searches based on entity counts
 */
export function getPopularSearches(limit = 10): string[] {
  const index = buildSearchIndex();

  // Count by category
  const categoryCounts = index.reduce((acc, entity) => {
    const cat = entity.category || 'Outros';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort by count
  return Object.keys(categoryCounts)
    .sort((a, b) => categoryCounts[b] - categoryCounts[a])
    .slice(0, limit);
}

/**
 * Get search statistics
 */
export function getSearchStats() {
  const index = buildSearchIndex();

  const stats = {
    total: index.length,
    byType: {} as Record<EntityType, number>,
    byCategory: {} as Record<string, number>,
  };

  index.forEach(entity => {
    // Count by type
    stats.byType[entity.type] = (stats.byType[entity.type] || 0) + 1;

    // Count by category
    const cat = entity.category || 'Outros';
    stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
  });

  return stats;
}

// ==============================================
// SEARCH HISTORY (LocalStorage)
// ==============================================

const SEARCH_HISTORY_KEY = 'darwin-mfc-search-history';
const MAX_HISTORY_ITEMS = 20;

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
  resultsCount: number;
}

/**
 * Save search to history
 */
export function saveSearchToHistory(query: string, resultsCount: number) {
  if (!query || query.trim().length < 2) return;

  const history = getSearchHistory();

  // Remove duplicates
  const filtered = history.filter(item =>
    item.query.toLowerCase() !== query.toLowerCase()
  );

  // Add new search at beginning
  filtered.unshift({
    query: query.trim(),
    timestamp: Date.now(),
    resultsCount,
  });

  // Limit history size
  const limited = filtered.slice(0, MAX_HISTORY_ITEMS);

  // Save to localStorage
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(limited));
  } catch (error) {
    console.error('Failed to save search history:', error);
  }
}

/**
 * Get search history
 */
export function getSearchHistory(): SearchHistoryItem[] {
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!stored) return [];

    const history = JSON.parse(stored);
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error('Failed to load search history:', error);
    return [];
  }
}

/**
 * Clear search history
 */
export function clearSearchHistory() {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear search history:', error);
  }
}
