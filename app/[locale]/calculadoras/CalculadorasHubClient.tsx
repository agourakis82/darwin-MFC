'use client';

/**
 * DARWIN-MFC CALCULATORS HUB CLIENT
 * ==================================
 *
 * Enhanced calculator hub with category filtering, search,
 * and the new clinical calculator system.
 */

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Search,
  Filter,
  Star,
  Grid3X3,
  List,
  X,
  ChevronRight,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

// Calculator system imports
import {
  allCalculators,
  type ClinicalCalculator,
  type CalculatorCategory,
  categoryLabels,
  categoryIcons,
} from '@/lib/calculators';

// =============================================================================
// TYPES
// =============================================================================

type ViewMode = 'grid' | 'list';

// =============================================================================
// CATEGORY COLORS
// =============================================================================

const categoryColors: Record<CalculatorCategory, {
  bg: string;
  bgHover: string;
  border: string;
  text: string;
  gradient: string;
}> = {
  'critical-care': {
    bg: 'bg-red-50 dark:bg-red-950/30',
    bgHover: 'hover:bg-red-100 dark:hover:bg-red-950/50',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-700 dark:text-red-400',
    gradient: 'from-red-500 to-orange-500',
  },
  cardiology: {
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    bgHover: 'hover:bg-rose-100 dark:hover:bg-rose-950/50',
    border: 'border-rose-200 dark:border-rose-800',
    text: 'text-rose-700 dark:text-rose-400',
    gradient: 'from-rose-500 to-pink-500',
  },
  pulmonology: {
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    bgHover: 'hover:bg-sky-100 dark:hover:bg-sky-950/50',
    border: 'border-sky-200 dark:border-sky-800',
    text: 'text-sky-700 dark:text-sky-400',
    gradient: 'from-sky-500 to-blue-500',
  },
  hepatology: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    bgHover: 'hover:bg-amber-100 dark:hover:bg-amber-950/50',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-400',
    gradient: 'from-amber-500 to-yellow-500',
  },
  nephrology: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    bgHover: 'hover:bg-purple-100 dark:hover:bg-purple-950/50',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-400',
    gradient: 'from-purple-500 to-violet-500',
  },
  neurology: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    bgHover: 'hover:bg-indigo-100 dark:hover:bg-indigo-950/50',
    border: 'border-indigo-200 dark:border-indigo-800',
    text: 'text-indigo-700 dark:text-indigo-400',
    gradient: 'from-indigo-500 to-blue-500',
  },
  psychiatry: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    bgHover: 'hover:bg-violet-100 dark:hover:bg-violet-950/50',
    border: 'border-violet-200 dark:border-violet-800',
    text: 'text-violet-700 dark:text-violet-400',
    gradient: 'from-violet-500 to-purple-500',
  },
  'infectious-disease': {
    bg: 'bg-lime-50 dark:bg-lime-950/30',
    bgHover: 'hover:bg-lime-100 dark:hover:bg-lime-950/50',
    border: 'border-lime-200 dark:border-lime-800',
    text: 'text-lime-700 dark:text-lime-400',
    gradient: 'from-lime-500 to-green-500',
  },
  hematology: {
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    bgHover: 'hover:bg-pink-100 dark:hover:bg-pink-950/50',
    border: 'border-pink-200 dark:border-pink-800',
    text: 'text-pink-700 dark:text-pink-400',
    gradient: 'from-pink-500 to-rose-500',
  },
  emergency: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    bgHover: 'hover:bg-orange-100 dark:hover:bg-orange-950/50',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-400',
    gradient: 'from-orange-500 to-red-500',
  },
  obstetrics: {
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30',
    bgHover: 'hover:bg-fuchsia-100 dark:hover:bg-fuchsia-950/50',
    border: 'border-fuchsia-200 dark:border-fuchsia-800',
    text: 'text-fuchsia-700 dark:text-fuchsia-400',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  pediatrics: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    bgHover: 'hover:bg-cyan-100 dark:hover:bg-cyan-950/50',
    border: 'border-cyan-200 dark:border-cyan-800',
    text: 'text-cyan-700 dark:text-cyan-400',
    gradient: 'from-cyan-500 to-teal-500',
  },
  orthopedics: {
    bg: 'bg-stone-50 dark:bg-stone-950/30',
    bgHover: 'hover:bg-stone-100 dark:hover:bg-stone-950/50',
    border: 'border-stone-200 dark:border-stone-700',
    text: 'text-stone-700 dark:text-stone-400',
    gradient: 'from-stone-500 to-gray-500',
  },
  anesthesia: {
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    bgHover: 'hover:bg-teal-100 dark:hover:bg-teal-950/50',
    border: 'border-teal-200 dark:border-teal-800',
    text: 'text-teal-700 dark:text-teal-400',
    gradient: 'from-teal-500 to-emerald-500',
  },
  general: {
    bg: 'bg-gray-50 dark:bg-gray-800/30',
    bgHover: 'hover:bg-gray-100 dark:hover:bg-gray-800/50',
    border: 'border-gray-200 dark:border-gray-700',
    text: 'text-gray-700 dark:text-gray-400',
    gradient: 'from-gray-500 to-slate-500',
  },
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface CalculatorCardEnhancedProps {
  calculator: ClinicalCalculator;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  viewMode: ViewMode;
}

function CalculatorCardEnhanced({
  calculator,
  isFavorite,
  onToggleFavorite,
  viewMode,
}: CalculatorCardEnhancedProps) {
  const locale = useLocale();
  const colors = categoryColors[calculator.category];
  const categoryIcon = categoryIcons[calculator.category];

  if (viewMode === 'list') {
    return (
      <Link
        href={`/calculadoras/${calculator.id}`}
        locale={locale}
        className={cn(
          'flex items-center gap-4 p-4 rounded-xl border',
          'bg-white dark:bg-neutral-900/50',
          'border-neutral-200 dark:border-neutral-700',
          'hover:border-[#0071E3] dark:hover:border-[#0071E3]',
          'hover:shadow-lg transition-all duration-200'
        )}
      >
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl',
            colors.bg
          )}
        >
          {categoryIcon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
              {calculator.abbreviation}
            </h3>
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                colors.bg,
                colors.text
              )}
            >
              {categoryLabels[calculator.category]}
            </span>
            {calculator.validationStudy && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                Validated
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
            {calculator.name}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <Star
            className={cn(
              'w-5 h-5',
              isFavorite
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-neutral-300'
            )}
          />
        </button>
        <ChevronRight className="w-5 h-5 text-neutral-400" />
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border',
        'bg-white dark:bg-neutral-900/50',
        colors.border,
        'hover:shadow-xl transition-all duration-300'
      )}
    >
      {/* Gradient header */}
      <div
        className={cn(
          'h-1.5 bg-gradient-to-r',
          colors.gradient
        )}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center text-xl',
              colors.bg
            )}
          >
            {categoryIcon}
          </div>
          <button
            onClick={onToggleFavorite}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <Star
              className={cn(
                'w-5 h-5',
                isFavorite
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-neutral-300'
              )}
            />
          </button>
        </div>

        <h3 className="mt-4 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {calculator.abbreviation}
        </h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
          {calculator.name}
        </p>

        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
          {calculator.description}
        </p>

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium',
              colors.bg,
              colors.text
            )}
          >
            {categoryLabels[calculator.category]}
          </span>
          <span className="text-xs text-neutral-500">
            {calculator.inputs.length} inputs
          </span>
          {calculator.validationStudy && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
              Validated
            </span>
          )}
        </div>

        <Link
          href={`/calculadoras/${calculator.id}`}
          locale={locale}
          className={cn(
            'mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl',
            'bg-[#0071E3] hover:bg-[#0077ED] text-white',
            'font-medium text-sm transition-colors'
          )}
        >
          <Calculator className="w-4 h-4" />
          Open Calculator
        </Link>
      </div>
    </motion.div>
  );
}

interface CategoryFilterProps {
  categories: CalculatorCategory[];
  selectedCategory: CalculatorCategory | 'all';
  onSelect: (category: CalculatorCategory | 'all') => void;
}

function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('all')}
        className={cn(
          'px-4 py-2 rounded-xl text-sm font-medium transition-all',
          selectedCategory === 'all'
            ? 'bg-[#0071E3] text-white shadow-md'
            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
        )}
      >
        All Categories
      </button>
      {categories.map((category) => {
        const colors = categoryColors[category];
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2',
              isSelected
                ? cn('bg-gradient-to-r text-white shadow-md', colors.gradient)
                : cn(colors.bg, colors.text, colors.bgHover)
            )}
          >
            <span>{categoryIcons[category]}</span>
            {categoryLabels[category]}
          </button>
        );
      })}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CalculadorasHubClient() {
  const t = useTranslations('calculadoras');
  const locale = useLocale();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('darwin-calculator-favorites');
    if (stored) {
      try {
        setFavorites(new Set(JSON.parse(stored)));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem('darwin-calculator-favorites', JSON.stringify([...next]));
      return next;
    });
  };

  // Get unique categories from calculators
  const categories = useMemo(() => {
    const cats = new Set<CalculatorCategory>();
    allCalculators.forEach((calc) => cats.add(calc.category));
    return Array.from(cats).sort();
  }, []);

  // Filter calculators
  const filteredCalculators = useMemo(() => {
    return allCalculators.filter((calc) => {
      // Category filter
      if (selectedCategory !== 'all' && calc.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          calc.name.toLowerCase().includes(query) ||
          calc.abbreviation.toLowerCase().includes(query) ||
          calc.description.toLowerCase().includes(query) ||
          categoryLabels[calc.category].toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Separate favorites
  const favoriteCalculators = filteredCalculators.filter((c) => favorites.has(c.id));
  const otherCalculators = filteredCalculators.filter((c) => !favorites.has(c.id));

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0071E3] to-[#5E5CE6] rounded-2xl flex items-center justify-center shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Clinical Calculators
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              Evidence-based clinical decision support tools
            </p>
          </div>
        </div>

        {/* Clinical disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Clinical Disclaimer:</strong> These calculators are decision support tools only.
            Always use clinical judgment and consider the individual patient context.
            Results should not replace proper medical evaluation.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
          <div className="text-3xl font-bold text-[#0071E3]">{allCalculators.length}</div>
          <div className="text-sm text-neutral-500">Total Calculators</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
          <div className="text-3xl font-bold text-emerald-500">{categories.length}</div>
          <div className="text-sm text-neutral-500">Categories</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
          <div className="text-3xl font-bold text-purple-500">
            {allCalculators.filter((c) => c.validationStudy).length}
          </div>
          <div className="text-sm text-neutral-500">Validated</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
          <div className="text-3xl font-bold text-yellow-500">{favorites.size}</div>
          <div className="text-sm text-neutral-500">Favorites</div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="space-y-4 mb-8">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search calculators by name, abbreviation, or keywords..."
            className={cn(
              'w-full pl-12 pr-12 py-3.5 rounded-xl',
              'bg-white dark:bg-neutral-900',
              'border border-neutral-200 dark:border-neutral-700',
              'text-neutral-900 dark:text-neutral-100',
              'placeholder:text-neutral-400',
              'focus:outline-none focus:ring-2 focus:ring-[#0071E3]/50 focus:border-[#0071E3]'
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <X className="w-4 h-4 text-neutral-400" />
            </button>
          )}
        </div>

        {/* Filters row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2.5 rounded-lg transition-colors',
                viewMode === 'grid'
                  ? 'bg-[#0071E3] text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              )}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2.5 rounded-lg transition-colors',
                viewMode === 'list'
                  ? 'bg-[#0071E3] text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Favorites section */}
      {favoriteCalculators.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Favorites
            </h2>
            <span className="text-sm text-neutral-500">({favoriteCalculators.length})</span>
          </div>
          <div
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-3'
            )}
          >
            <AnimatePresence mode="popLayout">
              {favoriteCalculators.map((calc) => (
                <CalculatorCardEnhanced
                  key={calc.id}
                  calculator={calc}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(calc.id)}
                  viewMode={viewMode}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* All calculators */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#0071E3]" />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {selectedCategory === 'all' ? 'All Calculators' : categoryLabels[selectedCategory]}
          </h2>
          <span className="text-sm text-neutral-500">
            ({otherCalculators.length})
          </span>
        </div>

        {otherCalculators.length === 0 ? (
          <div className="text-center py-16">
            <Calculator className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-700" />
            <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400">
              No calculators found
            </h3>
            <p className="text-sm text-neutral-500 mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-3'
            )}
          >
            <AnimatePresence mode="popLayout">
              {otherCalculators.map((calc) => (
                <CalculatorCardEnhanced
                  key={calc.id}
                  calculator={calc}
                  isFavorite={false}
                  onToggleFavorite={() => toggleFavorite(calc.id)}
                  viewMode={viewMode}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Legacy calculators link */}
      <div className="mt-12 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Looking for other calculators?
            </h3>
            <p className="text-sm text-neutral-500 mt-1">
              Access BMI, CKD-EPI, Framingham, PHQ-9, and other screening tools
            </p>
          </div>
          <Link
            href="/calculadoras/geral"
            locale={locale}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl',
              'bg-neutral-200 dark:bg-neutral-800',
              'text-neutral-700 dark:text-neutral-300',
              'hover:bg-neutral-300 dark:hover:bg-neutral-700',
              'font-medium text-sm transition-colors'
            )}
          >
            General Calculators
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
