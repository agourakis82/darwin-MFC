/**
 * Smart Search Utilities
 * Provides "Did you mean?", related topics, and trending suggestions
 */

import Fuse from 'fuse.js';
import type { SmartSuggestion, EnhancedSearchResult } from '@/lib/types/ai';

// Common medical term corrections (typo -> correct)
const MEDICAL_CORRECTIONS: Record<string, string> = {
  // Portuguese typos
  'diabete': 'diabetes',
  'diabets': 'diabetes',
  'diabeters': 'diabetes',
  'hipertensao': 'hipertensao',
  'hipertencao': 'hipertensao',
  'hipertenso': 'hipertensao',
  'depresao': 'depressao',
  'depressão': 'depressao',
  'anciedade': 'ansiedade',
  'ansciedade': 'ansiedade',
  'infecao': 'infeccao',
  'antibiotico': 'antibioticos',
  'medicamenro': 'medicamento',
  'medicamneto': 'medicamento',
  'prontuario': 'prontuario',
  'protcolo': 'protocolo',
  'protoclo': 'protocolo',

  // English typos
  'hypertention': 'hypertension',
  'diabetis': 'diabetes',
  'anxeity': 'anxiety',
  'depresion': 'depression',
  'medicaiton': 'medication',
  'antibiotic': 'antibiotics',
  'protocal': 'protocol',

  // Common abbreviations expansion
  'has': 'hipertensao arterial sistemica',
  'dm': 'diabetes mellitus',
  'dm2': 'diabetes mellitus tipo 2',
  'itu': 'infeccao trato urinario',
  'dpoc': 'doenca pulmonar obstrutiva cronica',
  'icc': 'insuficiencia cardiaca congestiva',
  'iam': 'infarto agudo miocardio',
  'avc': 'acidente vascular cerebral',
  'tb': 'tuberculose',
  'hiv': 'hiv aids',
  'ist': 'infeccoes sexualmente transmissiveis',
};

// Related topics mapping
const RELATED_TOPICS: Record<string, string[]> = {
  'diabetes': ['hipertensao', 'obesidade', 'nefropatia', 'retinopatia', 'metformina', 'insulina'],
  'hipertensao': ['diabetes', 'avc', 'insuficiencia cardiaca', 'losartana', 'hidroclorotiazida'],
  'depressao': ['ansiedade', 'insonia', 'sertralina', 'fluoxetina', 'escitalopram'],
  'ansiedade': ['depressao', 'panico', 'insonia', 'benzodiazepinicos'],
  'infeccao': ['antibioticos', 'amoxicilina', 'azitromicina', 'ciprofloxacino'],
  'dor': ['analgesicos', 'paracetamol', 'dipirona', 'ibuprofeno', 'anti-inflamatorios'],
  'gravidez': ['prenatal', 'acido folico', 'rastreamento', 'gestacao'],
  'cancer': ['rastreamento', 'mamografia', 'colonoscopia', 'psa'],
  'crianca': ['puericultura', 'vacinas', 'desenvolvimento', 'crescimento'],
  'idoso': ['polifarmacia', 'quedas', 'demencia', 'alzheimer'],
};

// Trending searches (simulated - would come from analytics in production)
const TRENDING_SEARCHES = [
  'hipertensao',
  'diabetes',
  'ansiedade',
  'depressao',
  'amoxicilina',
  'paracetamol',
  'gestacao',
  'rastreamento cancer',
];

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Find "Did you mean?" correction for a query
 */
export function findTypoCorrection(query: string): string | undefined {
  const normalizedQuery = query.toLowerCase().trim();

  // Direct match in corrections dictionary
  if (MEDICAL_CORRECTIONS[normalizedQuery]) {
    return MEDICAL_CORRECTIONS[normalizedQuery];
  }

  // Check for close matches using Levenshtein distance
  const correctionKeys = Object.keys(MEDICAL_CORRECTIONS);
  let bestMatch: string | undefined;
  let bestDistance = Infinity;

  for (const key of correctionKeys) {
    const distance = levenshteinDistance(normalizedQuery, key);
    // Only suggest if distance is small relative to word length
    if (distance <= 2 && distance < bestDistance) {
      bestDistance = distance;
      bestMatch = MEDICAL_CORRECTIONS[key];
    }
  }

  return bestMatch;
}

/**
 * Get related topics for a query
 */
export function getRelatedTopics(query: string): string[] {
  const normalizedQuery = query.toLowerCase().trim();

  // Direct match
  if (RELATED_TOPICS[normalizedQuery]) {
    return RELATED_TOPICS[normalizedQuery];
  }

  // Check if query contains any topic keys
  const matchingTopics: string[] = [];
  for (const [key, related] of Object.entries(RELATED_TOPICS)) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      matchingTopics.push(...related);
    }
  }

  // Remove duplicates and return max 5
  return [...new Set(matchingTopics)].slice(0, 5);
}

/**
 * Get trending searches
 */
export function getTrendingSearches(): string[] {
  return TRENDING_SEARCHES;
}

/**
 * Generate smart suggestions for a query
 */
export function generateSmartSuggestions<T extends { title: string; keywords?: string[] }>(
  query: string,
  items: T[],
  recentSearches: string[] = []
): EnhancedSearchResult {
  const suggestions: SmartSuggestion[] = [];

  // 1. Check for typo correction
  const correction = findTypoCorrection(query);
  if (correction && correction !== query.toLowerCase()) {
    suggestions.push({
      id: `correction-${correction}`,
      type: 'correction',
      text: correction,
      displayText: `Did you mean: ${correction}?`,
      score: 1,
      metadata: { originalQuery: query },
    });
  }

  // 2. Add autocomplete suggestions using Fuse.js
  if (query.length >= 2) {
    const fuse = new Fuse(items, {
      keys: ['title', 'keywords'],
      threshold: 0.4,
      includeScore: true,
    });

    const fuseResults = fuse.search(query).slice(0, 5);
    fuseResults.forEach((result, index) => {
      suggestions.push({
        id: `autocomplete-${index}`,
        type: 'autocomplete',
        text: result.item.title,
        score: 1 - (result.score || 0),
      });
    });
  }

  // 3. Add recent searches that match
  const matchingRecent = recentSearches.filter(
    (s) => s.toLowerCase().includes(query.toLowerCase()) && s !== query
  );
  matchingRecent.slice(0, 3).forEach((term, index) => {
    suggestions.push({
      id: `recent-${index}`,
      type: 'recent',
      text: term,
      score: 0.9 - index * 0.1,
    });
  });

  // 4. Get related topics
  const relatedTopics = getRelatedTopics(query);

  // 5. Get trending (show if query is short or empty)
  const trendingSearches = query.length < 3 ? getTrendingSearches() : [];

  return {
    suggestions: suggestions.sort((a, b) => b.score - a.score),
    didYouMean: correction,
    relatedTopics,
    trendingSearches,
  };
}

/**
 * Highlight matching text in a string
 */
export function highlightMatch(text: string, query: string): string {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export default {
  findTypoCorrection,
  getRelatedTopics,
  getTrendingSearches,
  generateSmartSuggestions,
  highlightMatch,
};
