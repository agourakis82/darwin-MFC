/**
 * ADAPTIVE CONTENT FILTER
 * ========================
 *
 * Smart content filtering and sorting based on user preferences
 * Automatically adapts to show most relevant content first
 *
 * Features:
 * - Auto-sort by relevance score
 * - Category filtering based on preferences
 * - Hidden category support
 * - Manual override controls
 * - Filter state persistence
 * - Visual relevance indicators
 */

'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Filter,
  SlidersHorizontal,
  Star,
  Eye,
  EyeOff,
  ArrowUpDown,
  Sparkles,
  X,
} from 'lucide-react';
import { Button } from '@/lib/design-system/primitives/button';
import { useUserPreferences } from '../userPreferencesStore';

// ============================================================================
// TYPES
// ============================================================================

export interface FilterableItem {
  id: string;
  title: string;
  category: string;
  tags?: string[];
  relevanceScore?: number;
}

export type SortMode = 'relevance' | 'alphabetical' | 'category' | 'recent';

export interface AdaptiveContentFilterProps<T extends FilterableItem>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof filterVariants> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  categories?: string[];
  defaultSortMode?: SortMode;
  showControls?: boolean;
  showRelevanceScores?: boolean;
  enableAdaptive?: boolean;
  minRelevanceScore?: number;
  emptyMessage?: string;
  onFilterChange?: (filteredItems: T[]) => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const filterVariants = cva(['relative w-full'], {
  variants: {
    variant: {
      default: '',
      contained: 'p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ============================================================================
// CALCULATE RELEVANCE SCORE
// ============================================================================

function calculateRelevanceScore(
  item: FilterableItem,
  contentPreferences: Record<string, { score: number; viewCount: number }>,
  favoriteCategories: string[]
): number {
  let score = 0;

  // Category preference score (0-50 points)
  const categoryPref = contentPreferences[item.category];
  if (categoryPref) {
    score += Math.min(50, categoryPref.score * 0.5);
  }

  // Favorite category bonus (20 points)
  if (favoriteCategories.includes(item.category)) {
    score += 20;
  }

  // Tag matching bonus (5 points per matching tag, max 30)
  if (item.tags) {
    const matchingTags = item.tags.filter((tag) =>
      favoriteCategories.includes(tag)
    );
    score += Math.min(30, matchingTags.length * 5);
  }

  // Use provided relevance score if available
  if (item.relevanceScore !== undefined) {
    score += item.relevanceScore * 0.3;
  }

  return Math.min(100, score);
}

// ============================================================================
// FILTER CONTROLS
// ============================================================================

interface FilterControlsProps {
  sortMode: SortMode;
  onSortModeChange: (mode: SortMode) => void;
  adaptiveEnabled: boolean;
  onAdaptiveToggle: () => void;
  activeCategories: string[];
  allCategories: string[];
  onCategoryToggle: (category: string) => void;
  onReset: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  sortMode,
  onSortModeChange,
  adaptiveEnabled,
  onAdaptiveToggle,
  activeCategories,
  allCategories,
  onCategoryToggle,
  onReset,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Sort Mode Selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          <select
            value={sortMode}
            onChange={(e) => onSortModeChange(e.target.value as SortMode)}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm',
              'bg-white dark:bg-neutral-800',
              'border border-neutral-200 dark:border-neutral-700',
              'text-neutral-900 dark:text-neutral-100',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary-500'
            )}
          >
            <option value="relevance">Most Relevant</option>
            <option value="alphabetical">A-Z</option>
            <option value="category">By Category</option>
            <option value="recent">Recently Viewed</option>
          </select>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Adaptive Toggle */}
          <Button
            variant={adaptiveEnabled ? 'default' : 'outline'}
            size="sm"
            onClick={onAdaptiveToggle}
            iconBefore={<Sparkles className="w-4 h-4" />}
          >
            {adaptiveEnabled ? 'Adaptive On' : 'Adaptive Off'}
          </Button>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            iconBefore={<Filter className="w-4 h-4" />}
          >
            Filters
            {activeCategories.length < allCategories.length && (
              <span className="ml-1 px-1.5 py-0.5 rounded text-xs bg-brand-primary-100 dark:bg-brand-primary-900/30 text-brand-primary-700 dark:text-brand-primary-300">
                {allCategories.length - activeCategories.length}
              </span>
            )}
          </Button>

          {/* Reset */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            aria-label="Reset filters"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => {
                  const isActive = activeCategories.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => onCategoryToggle(category)}
                      className={cn(
                        'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                        'border',
                        isActive
                          ? 'bg-brand-primary-100 dark:bg-brand-primary-900/30 border-brand-primary-300 dark:border-brand-primary-700 text-brand-primary-700 dark:text-brand-primary-300'
                          : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                      )}
                    >
                      {isActive ? (
                        <Eye className="w-3 h-3 inline mr-1" />
                      ) : (
                        <EyeOff className="w-3 h-3 inline mr-1" />
                      )}
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AdaptiveContentFilter<T extends FilterableItem>({
  items,
  renderItem,
  categories,
  defaultSortMode = 'relevance',
  showControls = true,
  showRelevanceScores = false,
  enableAdaptive = true,
  minRelevanceScore = 0,
  emptyMessage = 'No items match your filters',
  onFilterChange,
  variant,
  className,
  ...props
}: AdaptiveContentFilterProps<T>) {
  const contentPreferences = useUserPreferences((state) => state.contentPreferences);
  const favoriteCategories = useUserPreferences(
    (state) => state.usagePattern.favoriteCategories
  );
  const hiddenCategories = useUserPreferences((state) => state.hiddenCategories);

  const [sortMode, setSortMode] = useState<SortMode>(defaultSortMode);
  const [adaptiveEnabled, setAdaptiveEnabled] = useState(enableAdaptive);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  // Extract all categories
  const allCategories = useMemo(() => {
    if (categories) return categories;
    const cats = new Set(items.map((item) => item.category));
    return Array.from(cats);
  }, [items, categories]);

  // Initialize active categories
  React.useEffect(() => {
    if (activeCategories.length === 0) {
      setActiveCategories(
        allCategories.filter((cat) => !hiddenCategories.includes(cat))
      );
    }
  }, [allCategories, hiddenCategories, activeCategories.length]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by active categories
    filtered = filtered.filter((item) =>
      activeCategories.includes(item.category)
    );

    // Calculate relevance scores if adaptive mode
    if (adaptiveEnabled) {
      filtered = filtered.map((item) => ({
        ...item,
        relevanceScore: calculateRelevanceScore(
          item,
          contentPreferences,
          favoriteCategories
        ),
      }));

      // Filter by minimum relevance score
      if (minRelevanceScore > 0) {
        filtered = filtered.filter(
          (item) => (item.relevanceScore || 0) >= minRelevanceScore
        );
      }
    }

    // Sort
    switch (sortMode) {
      case 'relevance':
        filtered.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'recent':
        // Would need lastViewed timestamp on items
        break;
    }

    return filtered;
  }, [
    items,
    activeCategories,
    sortMode,
    adaptiveEnabled,
    contentPreferences,
    favoriteCategories,
    minRelevanceScore,
  ]);

  // Notify parent of filter changes
  React.useEffect(() => {
    onFilterChange?.(filteredItems);
  }, [filteredItems, onFilterChange]);

  // Handlers
  const handleCategoryToggle = useCallback((category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleReset = useCallback(() => {
    setSortMode('relevance');
    setAdaptiveEnabled(enableAdaptive);
    setActiveCategories(
      allCategories.filter((cat) => !hiddenCategories.includes(cat))
    );
  }, [enableAdaptive, allCategories, hiddenCategories]);

  return (
    <div
      className={cn(filterVariants({ variant }), className)}
      {...props}
    >
      {/* Filter Controls */}
      {showControls && (
        <FilterControls
          sortMode={sortMode}
          onSortModeChange={setSortMode}
          adaptiveEnabled={adaptiveEnabled}
          onAdaptiveToggle={() => setAdaptiveEnabled(!adaptiveEnabled)}
          activeCategories={activeCategories}
          allCategories={allCategories}
          onCategoryToggle={handleCategoryToggle}
          onReset={handleReset}
        />
      )}

      {/* Results Info */}
      {showControls && filteredItems.length > 0 && (
        <div className="mb-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
          <span>
            Showing {filteredItems.length} of {items.length} items
          </span>
          {adaptiveEnabled && sortMode === 'relevance' && (
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Personalized for you
            </span>
          )}
        </div>
      )}

      {/* Filtered Items */}
      {filteredItems.length > 0 ? (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                {showRelevanceScores && item.relevanceScore !== undefined && (
                  <div className="flex items-center gap-2 mb-1">
                    <Star
                      className={cn(
                        'w-3 h-3',
                        item.relevanceScore > 70
                          ? 'text-amber-500 fill-amber-500'
                          : item.relevanceScore > 40
                          ? 'text-amber-500'
                          : 'text-neutral-400'
                      )}
                    />
                    <span className="text-xs text-neutral-500 dark:text-neutral-500">
                      {item.relevanceScore.toFixed(0)}% relevant
                    </span>
                  </div>
                )}
                {renderItem(item, index)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Filter className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-3" />
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
            {emptyMessage}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="mt-2"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}

AdaptiveContentFilter.displayName = 'AdaptiveContentFilter';
