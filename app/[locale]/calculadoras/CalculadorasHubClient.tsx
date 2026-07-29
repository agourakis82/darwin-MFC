'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Baby,
  Bone,
  Brain,
  Bug,
  Calculator,
  ChevronRight,
  Droplets,
  Grid3X3,
  HeartPulse,
  List,
  Search,
  ShieldCheck,
  Siren,
  Star,
  Stethoscope,
  Syringe,
  Wind,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { PageContainer } from '@/app/components/Layout/Containers';
import { cn } from '@/lib/utils';
import {
  allCalculators,
  type CalculatorCategory,
  type ClinicalCalculator,
} from '@/lib/calculators';

type ViewMode = 'grid' | 'list';

type CategoryMeta = {
  label: string;
  icon: LucideIcon;
  color: string;
  surface: string;
};

const categoryMeta: Record<CalculatorCategory, CategoryMeta> = {
  'critical-care': {
    label: 'Terapia intensiva',
    icon: Activity,
    color: 'text-red-300',
    surface: 'bg-red-400/10',
  },
  cardiology: {
    label: 'Cardiologia',
    icon: HeartPulse,
    color: 'text-rose-300',
    surface: 'bg-rose-400/10',
  },
  pulmonology: {
    label: 'Pneumologia',
    icon: Wind,
    color: 'text-sky-300',
    surface: 'bg-sky-400/10',
  },
  hepatology: {
    label: 'Hepatologia',
    icon: Stethoscope,
    color: 'text-amber-300',
    surface: 'bg-amber-400/10',
  },
  nephrology: {
    label: 'Nefrologia',
    icon: Droplets,
    color: 'text-violet-300',
    surface: 'bg-violet-400/10',
  },
  neurology: {
    label: 'Neurologia',
    icon: Brain,
    color: 'text-indigo-300',
    surface: 'bg-indigo-400/10',
  },
  psychiatry: {
    label: 'Psiquiatria',
    icon: Brain,
    color: 'text-fuchsia-300',
    surface: 'bg-fuchsia-400/10',
  },
  'infectious-disease': {
    label: 'Infectologia',
    icon: Bug,
    color: 'text-lime-300',
    surface: 'bg-lime-400/10',
  },
  hematology: {
    label: 'Hematologia',
    icon: Droplets,
    color: 'text-pink-300',
    surface: 'bg-pink-400/10',
  },
  emergency: {
    label: 'Urgência e emergência',
    icon: Siren,
    color: 'text-orange-300',
    surface: 'bg-orange-400/10',
  },
  obstetrics: {
    label: 'Obstetrícia',
    icon: Activity,
    color: 'text-fuchsia-300',
    surface: 'bg-fuchsia-400/10',
  },
  pediatrics: {
    label: 'Pediatria',
    icon: Baby,
    color: 'text-cyan-300',
    surface: 'bg-cyan-400/10',
  },
  orthopedics: {
    label: 'Ortopedia',
    icon: Bone,
    color: 'text-stone-300',
    surface: 'bg-stone-400/10',
  },
  anesthesia: {
    label: 'Anestesiologia',
    icon: Syringe,
    color: 'text-teal-300',
    surface: 'bg-teal-400/10',
  },
  general: {
    label: 'Clínica geral',
    icon: Calculator,
    color: 'text-zinc-300',
    surface: 'bg-zinc-400/10',
  },
};

type CalculatorItemProps = {
  calculator: ClinicalCalculator;
  favorite: boolean;
  viewMode: ViewMode;
  onToggleFavorite: () => void;
};

function CalculatorItem({
  calculator,
  favorite,
  viewMode,
  onToggleFavorite,
}: CalculatorItemProps) {
  const meta = categoryMeta[calculator.category];
  const Icon = meta.icon;

  if (viewMode === 'list') {
    return (
      <article className="flex items-center gap-3 rounded-md border border-white/10 bg-[#081116] p-3 transition-colors hover:border-cyan-400/35">
        <Link
          href={`/calculadoras/${calculator.id}`}
          className="flex min-w-0 flex-1 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-md', meta.surface, meta.color)}>
            <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">{calculator.abbreviation}</span>
            <span className="block truncate text-xs text-zinc-500">{calculator.name}</span>
          </span>
          <span className={cn('ml-auto hidden text-xs sm:inline', meta.color)}>{meta.label}</span>
          <ChevronRight className="h-4 w-4 shrink-0 text-zinc-600" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={onToggleFavorite}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.05] hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label={favorite ? `Remover ${calculator.abbreviation} dos favoritos` : `Favoritar ${calculator.abbreviation}`}
          title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Star className={cn('h-4 w-4', favorite && 'fill-amber-300 text-amber-300')} aria-hidden="true" />
        </button>
      </article>
    );
  }

  return (
    <article className="flex min-h-[250px] flex-col rounded-md border border-white/10 bg-[#081116] p-5 transition-colors hover:border-cyan-400/35">
      <div className="flex items-start justify-between gap-3">
        <span className={cn('grid h-11 w-11 place-items-center rounded-md', meta.surface, meta.color)}>
          <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <button
          type="button"
          onClick={onToggleFavorite}
          className="grid h-9 w-9 place-items-center rounded-md text-zinc-600 transition-colors hover:bg-white/[0.05] hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label={favorite ? `Remover ${calculator.abbreviation} dos favoritos` : `Favoritar ${calculator.abbreviation}`}
          title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Star className={cn('h-4 w-4', favorite && 'fill-amber-300 text-amber-300')} aria-hidden="true" />
        </button>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-normal text-white">{calculator.abbreviation}</h3>
      <p className="mt-1 line-clamp-1 text-xs text-zinc-400">{calculator.name}</p>
      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-500">{calculator.description}</p>

      <div className="mt-auto flex items-center gap-2 pt-4 text-[10px]">
        <span className={cn('rounded border border-white/10 px-2 py-1', meta.color)}>{meta.label}</span>
        <span className="text-zinc-600">{calculator.inputs.length} parâmetros</span>
        {calculator.validationStudy ? (
          <span className="ml-auto flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Validada
          </span>
        ) : null}
      </div>

      <Link
        href={`/calculadoras/${calculator.id}`}
        className="mt-4 flex h-10 items-center justify-center gap-2 rounded-md border border-cyan-400/50 bg-cyan-400/10 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <Calculator className="h-4 w-4" aria-hidden="true" />
        Abrir calculadora
      </Link>
    </article>
  );
}

export default function CalculadorasHubClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem('darwin-calculator-favorites');
    if (!stored) return;
    try {
      setFavorites(new Set(JSON.parse(stored)));
    } catch {
      localStorage.removeItem('darwin-calculator-favorites');
    }
  }, []);

  const categories = useMemo(() => {
    const values = new Set<CalculatorCategory>();
    allCalculators.forEach((calculator) => values.add(calculator.category));
    return Array.from(values).sort((a, b) =>
      categoryMeta[a].label.localeCompare(categoryMeta[b].label, 'pt-BR')
    );
  }, []);

  const filteredCalculators = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase('pt-BR');
    return allCalculators.filter((calculator) => {
      if (selectedCategory !== 'all' && calculator.category !== selectedCategory) return false;
      if (!normalizedQuery) return true;
      return [
        calculator.name,
        calculator.abbreviation,
        calculator.description,
        categoryMeta[calculator.category].label,
      ].some((value) => value.toLocaleLowerCase('pt-BR').includes(normalizedQuery));
    });
  }, [searchQuery, selectedCategory]);

  const orderedCalculators = useMemo(
    () =>
      [...filteredCalculators].sort((a, b) => {
        const favoriteDifference = Number(favorites.has(b.id)) - Number(favorites.has(a.id));
        return favoriteDifference || a.abbreviation.localeCompare(b.abbreviation);
      }),
    [favorites, filteredCalculators]
  );

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('darwin-calculator-favorites', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#050b0f] text-zinc-100">
      <PageContainer className="py-8 md:py-12">
        <header className="border-b border-white/10 pb-7">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
              <Calculator className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
                Ferramentas clínicas
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                Calculadoras clínicas
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                Escores e índices para suporte à decisão clínica.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-md border border-amber-400/25 bg-amber-400/[0.06] p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-amber-100/75">
              <strong className="text-amber-200">Aviso clínico:</strong> use os resultados como apoio.
              Considere o contexto individual e não substitua a avaliação médica.
            </p>
          </div>
        </header>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10 pb-5 text-xs">
          <span><strong className="text-xl font-semibold text-cyan-300">{allCalculators.length}</strong> <span className="text-zinc-500">calculadoras</span></span>
          <span><strong className="text-xl font-semibold text-emerald-300">{categories.length}</strong> <span className="text-zinc-500">especialidades</span></span>
          <span><strong className="text-xl font-semibold text-amber-300">{favorites.size}</strong> <span className="text-zinc-500">favoritas</span></span>
        </div>

        <section className="mt-6" aria-label="Busca e filtros de calculadoras">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buscar por nome, sigla ou especialidade"
              className="h-12 w-full rounded-md border border-white/15 bg-[#081116] pl-12 pr-12 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/15"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-md text-zinc-500 hover:bg-white/[0.05] hover:text-white"
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="mt-4 flex items-start gap-3">
            <div className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'h-10 shrink-0 rounded-md border px-3 text-xs font-medium transition-colors',
                  selectedCategory === 'all'
                    ? 'border-cyan-300/70 bg-cyan-400/10 text-cyan-200'
                    : 'border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
                )}
              >
                Todas
              </button>
              {categories.map((category) => {
                const meta = categoryMeta[category];
                const Icon = meta.icon;
                const selected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'flex h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-xs transition-colors',
                      selected
                        ? cn('border-white/25', meta.surface, meta.color)
                        : 'border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-200'
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {meta.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden shrink-0 items-center gap-1 sm:flex" aria-label="Modo de visualização">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={cn('grid h-10 w-10 place-items-center rounded-md', viewMode === 'grid' ? 'bg-cyan-400/15 text-cyan-300' : 'text-zinc-500 hover:bg-white/[0.05]')}
                aria-label="Visualização em grade"
                title="Grade"
              >
                <Grid3X3 className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={cn('grid h-10 w-10 place-items-center rounded-md', viewMode === 'list' ? 'bg-cyan-400/15 text-cyan-300' : 'text-zinc-500 hover:bg-white/[0.05]')}
                aria-label="Visualização em lista"
                title="Lista"
              >
                <List className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-7" aria-labelledby="calculator-list-title">
          <div className="mb-4 flex items-center gap-2">
            <h2 id="calculator-list-title" className="text-base font-semibold tracking-normal text-white">
              {selectedCategory === 'all' ? 'Todas as calculadoras' : categoryMeta[selectedCategory].label}
            </h2>
            <span className="text-xs text-zinc-600">({orderedCalculators.length})</span>
          </div>

          {orderedCalculators.length ? (
            <div className={viewMode === 'grid' ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-2'}>
              {orderedCalculators.map((calculator) => (
                <CalculatorItem
                  key={calculator.id}
                  calculator={calculator}
                  favorite={favorites.has(calculator.id)}
                  viewMode={viewMode}
                  onToggleFavorite={() => toggleFavorite(calculator.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-white/15 py-16 text-center">
              <Calculator className="mx-auto h-10 w-10 text-zinc-700" aria-hidden="true" />
              <h3 className="mt-4 text-sm font-medium text-zinc-300">Nenhuma calculadora encontrada</h3>
              <p className="mt-1 text-xs text-zinc-600">Ajuste a busca ou escolha outra especialidade.</p>
            </div>
          )}
        </section>
      </PageContainer>
    </div>
  );
}
