/**
 * DARWIN-MFC CALCULATOR REGISTRY
 * ===============================
 *
 * Central registry for all clinical calculators.
 * Provides lookup, search, and categorization functionality.
 */

import type {
  ClinicalCalculator,
  CalculatorCategory,
  CalculatorMetadata,
} from './types';
import { extractMetadata, categoryLabels, categoryIcons } from './types';

// =============================================================================
// REGISTRY CLASS
// =============================================================================

class CalculatorRegistry {
  private calculators: Map<string, ClinicalCalculator> = new Map();
  private byCategory: Map<CalculatorCategory, string[]> = new Map();
  private searchIndex: Map<string, string[]> = new Map(); // keyword -> calculator IDs

  /**
   * Register a calculator
   */
  register(calculator: ClinicalCalculator): void {
    if (this.calculators.has(calculator.id)) {
      console.warn(`Calculator "${calculator.id}" is already registered. Overwriting.`);
    }

    this.calculators.set(calculator.id, calculator);

    // Index by category
    const categoryCalcs = this.byCategory.get(calculator.category) || [];
    if (!categoryCalcs.includes(calculator.id)) {
      categoryCalcs.push(calculator.id);
      this.byCategory.set(calculator.category, categoryCalcs);
    }

    // Build search index
    this.indexCalculator(calculator);
  }

  /**
   * Build search index for a calculator
   */
  private indexCalculator(calculator: ClinicalCalculator): void {
    const keywords = [
      calculator.name.toLowerCase(),
      calculator.abbreviation.toLowerCase(),
      calculator.category,
      ...calculator.description.toLowerCase().split(/\s+/),
      ...(calculator.indications?.flatMap((i) => i.toLowerCase().split(/\s+/)) || []),
    ];

    for (const keyword of keywords) {
      if (keyword.length < 2) continue;

      const existing = this.searchIndex.get(keyword) || [];
      if (!existing.includes(calculator.id)) {
        existing.push(calculator.id);
        this.searchIndex.set(keyword, existing);
      }
    }
  }

  /**
   * Get a calculator by ID
   */
  get(id: string): ClinicalCalculator | undefined {
    return this.calculators.get(id);
  }

  /**
   * Get all calculators
   */
  getAll(): ClinicalCalculator[] {
    return Array.from(this.calculators.values());
  }

  /**
   * Get all calculator IDs
   */
  getAllIds(): string[] {
    return Array.from(this.calculators.keys());
  }

  /**
   * Get calculators by category
   */
  getByCategory(category: CalculatorCategory): ClinicalCalculator[] {
    const ids = this.byCategory.get(category) || [];
    return ids.map((id) => this.calculators.get(id)!).filter(Boolean);
  }

  /**
   * Get all categories that have calculators
   */
  getActiveCategories(): CalculatorCategory[] {
    return Array.from(this.byCategory.keys()).filter(
      (cat) => (this.byCategory.get(cat)?.length || 0) > 0
    );
  }

  /**
   * Get category info with calculator count
   */
  getCategoryInfo(): Array<{
    category: CalculatorCategory;
    label: string;
    icon: string;
    count: number;
  }> {
    return this.getActiveCategories().map((category) => ({
      category,
      label: categoryLabels[category],
      icon: categoryIcons[category],
      count: this.byCategory.get(category)?.length || 0,
    }));
  }

  /**
   * Search calculators by query
   */
  search(query: string): ClinicalCalculator[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return [];

    const matchedIds = new Set<string>();
    const queryWords = normalizedQuery.split(/\s+/);

    // Exact ID match
    if (this.calculators.has(normalizedQuery)) {
      matchedIds.add(normalizedQuery);
    }

    // Search index lookup
    for (const word of queryWords) {
      // Exact keyword match
      const exact = this.searchIndex.get(word);
      if (exact) {
        exact.forEach((id) => matchedIds.add(id));
      }

      // Prefix match
      for (const [keyword, ids] of this.searchIndex) {
        if (keyword.startsWith(word) || word.startsWith(keyword)) {
          ids.forEach((id) => matchedIds.add(id));
        }
      }
    }

    // Also search in name and abbreviation directly
    for (const calc of this.calculators.values()) {
      if (
        calc.name.toLowerCase().includes(normalizedQuery) ||
        calc.abbreviation.toLowerCase().includes(normalizedQuery)
      ) {
        matchedIds.add(calc.id);
      }
    }

    return Array.from(matchedIds)
      .map((id) => this.calculators.get(id)!)
      .filter(Boolean);
  }

  /**
   * Get calculator metadata for listings
   */
  getMetadata(): CalculatorMetadata[] {
    return this.getAll().map(extractMetadata);
  }

  /**
   * Get related calculators
   */
  getRelated(calculatorId: string): ClinicalCalculator[] {
    const calculator = this.get(calculatorId);
    if (!calculator) return [];

    const relatedIds = calculator.relatedCalculators || [];
    const sameCategory = this.getByCategory(calculator.category).filter(
      (c) => c.id !== calculatorId
    );

    const related = new Set<string>();

    // Add explicitly related calculators
    relatedIds.forEach((id) => related.add(id));

    // Add same category (up to 5)
    sameCategory.slice(0, 5).forEach((c) => related.add(c.id));

    return Array.from(related)
      .map((id) => this.calculators.get(id)!)
      .filter(Boolean)
      .slice(0, 6);
  }

  /**
   * Get total count
   */
  get count(): number {
    return this.calculators.size;
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

export const calculatorRegistry = new CalculatorRegistry();

// =============================================================================
// REGISTRATION HELPERS
// =============================================================================

/**
 * Register multiple calculators at once
 */
export function registerCalculators(calculators: ClinicalCalculator[]): void {
  for (const calc of calculators) {
    calculatorRegistry.register(calc);
  }
}

/**
 * Get calculator or throw
 */
export function getCalculatorOrThrow(id: string): ClinicalCalculator {
  const calc = calculatorRegistry.get(id);
  if (!calc) {
    throw new Error(`Calculator not found: ${id}`);
  }
  return calc;
}

// =============================================================================
// EXPORTS
// =============================================================================

export default calculatorRegistry;
