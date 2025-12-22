'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ChevronDown,
  ChevronRight,
  Home,
  Baby,
  Users,
  Heart,
  Activity,
  BookOpen,
  Clock,
  Calculator,
  BookMarked,
  FileSearch,
  Stethoscope,
  GraduationCap,
  Pill,
  Shield,
  FileText,
  Brain,
  Wind,
  Bug,
  Zap,
  ClipboardList,
  AlertTriangle,
  Printer,
  Search,
  Keyboard
} from 'lucide-react';
import { getRastreamentosByCategory } from '@/lib/data/rastreamentos';

interface NavSection {
  title: string;
  icon: React.ElementType;
  path?: string;
  badge?: string;
  subsections?: {
    title: string;
    path: string;
  }[];
}

interface NavGroup {
  title: string;
  sections: NavSection[];
}

// Dynamically generate subsections from actual rastreamentos data
function getSubsectionsForCategory(category: string, path: string) {
  const rastreamentos = getRastreamentosByCategory(category);
  return rastreamentos.map(r => ({
    title: r.title.replace('Rastreamento de ', '').replace('Rastreamento ', ''),
    path: `${path}#${r.id}`
  }));
}

export default function Sidebar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([pathname?.split('#')[0] || '/']));

  const navigationGroups: NavGroup[] = useMemo(() => [
    {
      title: t('sidebar.main'),
      sections: [
        { title: t('sidebar.home'), icon: Home, path: '/' },
        { title: t('sidebar.clinicalCase'), icon: GraduationCap, path: '/aula' },
      ]
    },
    {
      title: t('sidebar.clinicalGuide'),
      sections: [
        { title: t('sidebar.diseasesAPS'), icon: BookOpen, path: '/doencas' },
        { title: t('sidebar.medicationGuide'), icon: Pill, path: '/medicamentos' },
        { title: t('sidebar.protocols'), icon: FileText, path: '/protocolos' },
        { title: t('sidebar.calculators'), icon: Calculator, path: '/calculadoras' },
        { title: t('sidebar.clinicalCases'), icon: GraduationCap, path: '/casos-clinicos', badge: t('common.new') },
      ]
    },
    {
      title: t('sidebar.susScreenings'),
      sections: [
        {
          title: t('sidebar.neonatalScreening'),
          icon: Baby,
          path: '/neonatal',
          get subsections() { return getSubsectionsForCategory('neonatal', '/neonatal'); }
        },
        {
          title: t('sidebar.childHealth'),
          icon: Users,
          path: '/infantil',
          get subsections() { return getSubsectionsForCategory('infantil', '/infantil'); }
        },
        {
          title: t('sidebar.adultsDCNTs'),
          icon: Activity,
          path: '/adultos',
          get subsections() { return getSubsectionsForCategory('adultos', '/adultos'); }
        },
        {
          title: t('sidebar.cancer'),
          icon: Heart,
          path: '/cancer',
          get subsections() { return getSubsectionsForCategory('cancer', '/cancer'); }
        },
        {
          title: t('sidebar.gestationPrenatal'),
          icon: Stethoscope,
          path: '/gestacao',
          get subsections() { return getSubsectionsForCategory('gestacao', '/gestacao'); }
        },
      ]
    },
    {
      title: t('sidebar.fundamentals'),
      sections: [
        { title: t('sidebar.susAPS'), icon: Shield, path: '/sus', badge: t('common.new') },
        { title: t('sidebar.timeline'), icon: Clock, path: '/timeline' },
        { title: t('sidebar.bibliography'), icon: BookMarked, path: '/bibliografia' },
      ]
    },
    {
      title: t('sidebar.clinicalTools'),
      sections: [
        { title: t('sidebar.quickConsultation'), icon: Zap, path: '/consulta-rapida' },
        { title: t('sidebar.soapRecord'), icon: ClipboardList, path: '/prontuario' },
        { title: t('sidebar.studyMode'), icon: GraduationCap, path: '/estudo', badge: t('common.new') },
        { title: t('sidebar.genogram'), icon: Users, path: '/ferramentas/genograma', badge: t('common.new') },
        { title: t('sidebar.ecomap'), icon: Heart, path: '/ferramentas/ecomapa', badge: t('common.new') },
        { title: t('sidebar.drugInteractions'), icon: AlertTriangle, path: '/medicamentos/interacoes' },
        { title: t('sidebar.drugComparator'), icon: Pill, path: '/medicamentos/comparador' },
        { title: t('sidebar.advancedSearch'), icon: FileSearch, path: '/busca' },
      ]
    }
  ], [t]);

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  const renderSection = (section: NavSection) => {
    const Icon = section.icon;
    const isExpanded = expandedSections.has(section.path || section.title);
    const isActive = pathname === section.path;
    const hasSubsections = section.subsections && section.subsections.length > 0;

    return (
      <div key={section.title}>
        {section.path ? (
          <Link
            href={section.path}
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:shadow-sm'
            }`}
            onClick={(e) => {
              if (hasSubsections) {
                e.preventDefault();
                toggleSection(section.path!);
              }
            }}
            aria-current={isActive ? 'page' : undefined}
            aria-expanded={hasSubsections ? isExpanded : undefined}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium">{section.title}</span>
            </div>
            {section.badge && (
              <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full ml-auto mr-2">
                {section.badge}
              </span>
            )}
            {hasSubsections && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSection(section.path!);
                }}
                className="p-1"
                aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            )}
          </Link>
        ) : (
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-expanded={hasSubsections ? isExpanded : undefined}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-medium">{section.title}</span>
            </div>
            {hasSubsections && (
              isExpanded ? (
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              )
            )}
          </button>
        )}

        {hasSubsections && isExpanded && (
          <div className="ml-10 mt-2 space-y-1 border-l-2 border-neutral-200 dark:border-neutral-700 pl-4" role="group">
            {section.subsections!.map((subsection) => {
              const isSubActive = pathname + (typeof window !== 'undefined' ? window.location.hash : '') === subsection.path;

              return (
                <Link
                  key={subsection.path}
                  href={subsection.path}
                  className={`block px-3 py-2 text-sm rounded-lg transition-all ${
                    isSubActive
                      ? 'text-blue-700 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 border-l-2 border-blue-600 -ml-[18px] pl-4'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                  aria-current={isSubActive ? 'page' : undefined}
                >
                  {subsection.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className="w-72 lg:w-80 glass border-r border-neutral-200/80 dark:border-neutral-700/50 h-screen sticky top-0 overflow-y-auto shadow-sm"
      role="complementary"
      aria-label="Sidebar navigation"
    >
      <div className="p-6">
        {/* Sidebar Header */}
        <div className="mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-1">
            {t('common.appName')}
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {t('common.appDescription')}
          </p>
        </div>

        <nav className="space-y-6" role="navigation" aria-label="Clinical guide navigation">
          {navigationGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2 px-4">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.sections.map(renderSection)}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer - Professional Medical Style */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                  {t('sidebar.q1Standard')}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {t('sidebar.q1Description')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>{t('sidebar.lastUpdate')}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

