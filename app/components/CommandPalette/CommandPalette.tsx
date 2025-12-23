'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Fuse from 'fuse.js';
import {
  Search,
  BookOpen,
  Pill,
  Activity,
  FileText,
  Sun,
  Moon,
  Stethoscope,
  Calculator,
  Users,
  GraduationCap,
  Home,
  Zap,
  ClipboardList,
  AlertTriangle,
  BarChart3,
  Clock,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import {
  findTypoCorrection,
  getRelatedTopics,
  getTrendingSearches,
} from '@/lib/utils/smart-search';
import { useAppStore } from '@/lib/store/appStore';
import { getAllRastreamentos } from '@/lib/data/rastreamentos';
import { doencas } from '@/lib/data/doencas';
import { medicamentos } from '@/lib/data/medicamentos';

type SearchResultType = 'rastreamento' | 'doenca' | 'medicamento' | 'action' | 'page';

interface SearchItem {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  path?: string;
  action?: () => void;
  icon: React.ReactNode;
  keywords?: string[];
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  let t: (key: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string) => translations(key);
  } catch {
    t = (key: string) => {
      const fallbacks: Record<string, string> = {
        'commandPalette.placeholder': 'Search diseases, medications, protocols...',
        'commandPalette.noResults': 'No results found.',
        'commandPalette.recentSearches': 'Recent',
        'commandPalette.quickActions': 'Quick Actions',
        'commandPalette.navigation': 'Navigation',
        'commandPalette.diseases': 'Diseases',
        'commandPalette.medications': 'Medications',
        'commandPalette.screenings': 'Screenings',
        'commandPalette.toggleTheme': 'Toggle theme',
        'commandPalette.toggleContentMode': 'Toggle content mode',
        'commandPalette.goToHome': 'Go to Home',
        'commandPalette.goToDiseases': 'Go to Diseases',
        'commandPalette.goToMedications': 'Go to Medications',
        'commandPalette.goToProtocols': 'Go to Protocols',
        'commandPalette.goToCalculators': 'Go to Calculators',
        'commandPalette.goToLearn': 'Go to Learning Platform',
        'commandPalette.goToCommunity': 'Go to Community',
      };
      return fallbacks[key] || key;
    };
  }

  const { theme, toggleTheme, contentMode, toggleContentMode } = useAppStore();
  const rastreamentos = getAllRastreamentos();

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('darwin-mfc-recent-searches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  // Save recent searches
  const addRecentSearch = useCallback((term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((s) => s !== term)].slice(0, 5);
      localStorage.setItem('darwin-mfc-recent-searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Build search items
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // Quick Actions
    items.push({
      id: 'action-toggle-theme',
      type: 'action',
      title: t('commandPalette.toggleTheme'),
      subtitle: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
      icon: theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
      action: () => toggleTheme(),
      keywords: ['theme', 'dark', 'light', 'mode', 'tema', 'escuro', 'claro'],
    });

    items.push({
      id: 'action-toggle-content',
      type: 'action',
      title: t('commandPalette.toggleContentMode'),
      subtitle: contentMode === 'descriptive' ? 'Switch to Critical Analysis' : 'Switch to Descriptive',
      icon: <FileText className="w-4 h-4" />,
      action: () => toggleContentMode(),
      keywords: ['content', 'mode', 'descriptive', 'critical', 'analysis', 'modo', 'descritivo', 'critico'],
    });

    // Navigation Pages
    const pages = [
      { id: 'page-home', title: t('commandPalette.goToHome'), path: '/', icon: <Home className="w-4 h-4" />, keywords: ['home', 'inicio'] },
      { id: 'page-diseases', title: t('commandPalette.goToDiseases'), path: '/doencas', icon: <Stethoscope className="w-4 h-4" />, keywords: ['diseases', 'doencas', 'aps'] },
      { id: 'page-medications', title: t('commandPalette.goToMedications'), path: '/medicamentos', icon: <Pill className="w-4 h-4" />, keywords: ['medications', 'medicamentos', 'rename', 'drugs'] },
      { id: 'page-protocols', title: t('commandPalette.goToProtocols'), path: '/protocolos', icon: <FileText className="w-4 h-4" />, keywords: ['protocols', 'protocolos', 'fluxograma'] },
      { id: 'page-calculators', title: t('commandPalette.goToCalculators'), path: '/calculadoras', icon: <Calculator className="w-4 h-4" />, keywords: ['calculators', 'calculadoras', 'score'] },
      { id: 'page-learn', title: t('commandPalette.goToLearn'), path: '/learn', icon: <GraduationCap className="w-4 h-4" />, keywords: ['learn', 'aprender', 'study', 'estudo'] },
      { id: 'page-community', title: t('commandPalette.goToCommunity'), path: '/community', icon: <Users className="w-4 h-4" />, keywords: ['community', 'comunidade', 'mentoria'] },
      { id: 'page-quick', title: 'Quick Consultation', path: '/consulta-rapida', icon: <Zap className="w-4 h-4" />, keywords: ['quick', 'rapida', 'consulta'] },
      { id: 'page-soap', title: 'SOAP Record', path: '/prontuario', icon: <ClipboardList className="w-4 h-4" />, keywords: ['soap', 'prontuario', 'record'] },
      { id: 'page-interactions', title: 'Drug Interactions', path: '/medicamentos/interacoes', icon: <AlertTriangle className="w-4 h-4" />, keywords: ['interactions', 'interacoes', 'drugs'] },
      { id: 'page-timeline', title: 'Timeline 2025', path: '/timeline', icon: <Clock className="w-4 h-4" />, keywords: ['timeline', 'cronograma'] },
      { id: 'page-analytics', title: 'Analytics', path: '/analise', icon: <BarChart3 className="w-4 h-4" />, keywords: ['analytics', 'analise', 'statistics'] },
    ];

    pages.forEach((page) => {
      items.push({
        id: page.id,
        type: 'page',
        title: page.title,
        path: page.path,
        icon: page.icon,
        keywords: page.keywords,
      });
    });

    // Diseases
    doencas.forEach((d) => {
      items.push({
        id: `doenca-${d.id}`,
        type: 'doenca',
        title: d.titulo,
        subtitle: `${d.ciap2.join(', ')} | ${d.cid10.join(', ')}`,
        path: `/doencas/${d.id}`,
        icon: <BookOpen className="w-4 h-4 text-blue-500" />,
        keywords: [...d.ciap2, ...d.cid10, d.titulo.toLowerCase()],
      });
    });

    // Medications
    medicamentos.forEach((m) => {
      items.push({
        id: `medicamento-${m.id}`,
        type: 'medicamento',
        title: m.nomeGenerico,
        subtitle: m.nomesComerciais?.slice(0, 3).join(', ') || '',
        path: `/medicamentos/${m.id}`,
        icon: <Pill className="w-4 h-4 text-emerald-500" />,
        keywords: [m.nomeGenerico.toLowerCase(), ...(m.nomesComerciais || []).map(n => n.toLowerCase())],
      });
    });

    // Screenings
    rastreamentos.forEach((r) => {
      items.push({
        id: `rastreamento-${r.id}`,
        type: 'rastreamento',
        title: r.title,
        subtitle: r.category,
        path: `/${r.category}#${r.id}`,
        icon: <Activity className="w-4 h-4 text-purple-500" />,
        keywords: [r.title.toLowerCase(), r.category],
      });
    });

    return items;
  }, [theme, contentMode, toggleTheme, toggleContentMode, rastreamentos, t]);

  // Fuse.js fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(allItems, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'subtitle', weight: 2 },
        { name: 'keywords', weight: 2 },
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }, [allItems]);

  // Smart suggestions
  const smartSuggestions = useMemo(() => {
    if (!search.trim() || search.length < 2) {
      return {
        correction: undefined,
        relatedTopics: [] as string[],
        trendingSearches: getTrendingSearches(),
      };
    }

    return {
      correction: findTypoCorrection(search),
      relatedTopics: getRelatedTopics(search),
      trendingSearches: [] as string[],
    };
  }, [search]);

  // Filter results
  const filteredItems = useMemo(() => {
    if (!search.trim()) {
      // Show quick actions and pages when empty
      return allItems.filter((item) => item.type === 'action' || item.type === 'page').slice(0, 12);
    }
    const results = fuse.search(search);
    return results.slice(0, 20).map((r) => r.item);
  }, [search, allItems, fuse]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {
      action: [],
      page: [],
      doenca: [],
      medicamento: [],
      rastreamento: [],
    };
    filteredItems.forEach((item) => {
      groups[item.type].push(item);
    });
    return groups;
  }, [filteredItems]);

  // Handle selection
  const handleSelect = useCallback(
    (item: SearchItem) => {
      if (item.action) {
        item.action();
      } else if (item.path) {
        addRecentSearch(item.title);
        router.push(item.path);
      }
      onOpenChange(false);
      setSearch('');
    },
    [router, onOpenChange, addRecentSearch]
  );

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const getGroupLabel = (type: string) => {
    switch (type) {
      case 'action':
        return t('commandPalette.quickActions');
      case 'page':
        return t('commandPalette.navigation');
      case 'doenca':
        return t('commandPalette.diseases');
      case 'medicamento':
        return t('commandPalette.medications');
      case 'rastreamento':
        return t('commandPalette.screenings');
      default:
        return type;
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => onOpenChange(false)}
      />

      {/* Command Dialog */}
      <div className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl px-4">
        <Command
          className="glass-strong rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10 animate-scale-in"
          loop
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 border-b border-black/10 dark:border-white/10">
            <Search className="w-5 h-5 text-[#86868b]" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder={t('commandPalette.placeholder')}
              className="flex-1 py-4 bg-transparent text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none text-lg"
              autoFocus
            />
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-mono text-[#86868b] bg-black/5 dark:bg-white/10 rounded-md">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-12 text-center text-[#86868b]">
              {t('commandPalette.noResults')}
            </Command.Empty>

            {/* Did you mean? - Typo Correction */}
            {smartSuggestions.correction && smartSuggestions.correction !== search.toLowerCase() && (
              <div className="px-3 py-2 mb-2">
                <button
                  onClick={() => setSearch(smartSuggestions.correction!)}
                  className="flex items-center gap-2 text-sm text-[#007aff] dark:text-[#5ac8fa] hover:underline"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Did you mean: <strong>{smartSuggestions.correction}</strong>?</span>
                </button>
              </div>
            )}

            {/* Trending Searches */}
            {!search && smartSuggestions.trendingSearches.length > 0 && (
              <Command.Group heading={
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>Trending</span>
                </div>
              }>
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {smartSuggestions.trendingSearches.slice(0, 6).map((term) => (
                    <button
                      key={`trending-${term}`}
                      onClick={() => setSearch(term)}
                      className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-[#007aff]/10 to-[#5ac8fa]/10 text-[#007aff] dark:text-[#5ac8fa] hover:from-[#007aff]/20 hover:to-[#5ac8fa]/20 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </Command.Group>
            )}

            {/* Related Topics */}
            {search && smartSuggestions.relatedTopics.length > 0 && (
              <Command.Group heading={
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-3 h-3" />
                  <span>Related</span>
                </div>
              }>
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {smartSuggestions.relatedTopics.slice(0, 5).map((topic) => (
                    <button
                      key={`related-${topic}`}
                      onClick={() => setSearch(topic)}
                      className="px-3 py-1.5 text-sm rounded-full bg-[#f5f5f7] dark:bg-white/10 text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#e8e8ed] dark:hover:bg-white/20 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </Command.Group>
            )}

            {/* Recent Searches */}
            {!search && recentSearches.length > 0 && (
              <Command.Group heading={t('commandPalette.recentSearches')}>
                {recentSearches.map((term) => (
                  <Command.Item
                    key={`recent-${term}`}
                    value={`recent-${term}`}
                    onSelect={() => setSearch(term)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 data-[selected=true]:bg-[#007aff]/10 dark:data-[selected=true]:bg-[#5ac8fa]/15"
                  >
                    <Clock className="w-4 h-4 text-[#86868b]" />
                    <span className="flex-1">{term}</span>
                    <ArrowRight className="w-4 h-4 text-[#86868b]" />
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Grouped Results */}
            {(['action', 'page', 'doenca', 'medicamento', 'rastreamento'] as const).map((type) => {
              const items = groupedResults[type];
              if (items.length === 0) return null;

              return (
                <Command.Group key={type} heading={getGroupLabel(type)}>
                  {items.map((item) => (
                    <Command.Item
                      key={item.id}
                      value={item.id}
                      onSelect={() => handleSelect(item)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 data-[selected=true]:bg-[#007aff]/10 dark:data-[selected=true]:bg-[#5ac8fa]/15"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.title}</div>
                        {item.subtitle && (
                          <div className="text-sm text-[#86868b] truncate">{item.subtitle}</div>
                        )}
                      </div>
                      {item.type === 'action' && (
                        <kbd className="hidden sm:flex px-2 py-1 text-xs font-mono text-[#86868b] bg-black/5 dark:bg-white/10 rounded-md">
                          Enter
                        </kbd>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-black/10 dark:border-white/10 text-xs text-[#86868b]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-[10px] font-mono">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-[10px] font-mono">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-[10px] font-mono">↵</kbd>
                select
              </span>
            </div>
            <span className="hidden sm:block">
              Darwin MFC
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
