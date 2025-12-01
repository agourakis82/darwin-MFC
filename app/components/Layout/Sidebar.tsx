'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  FileSearch
} from 'lucide-react';

interface NavSection {
  title: string;
  icon: React.ElementType;
  path?: string;
  subsections?: {
    title: string;
    path: string;
  }[];
}

const navigation: NavSection[] = [
  {
    title: 'Início',
    icon: Home,
    path: '/',
  },
  {
    title: 'Triagem Neonatal',
    icon: Baby,
    path: '/neonatal',
    subsections: [
      { title: 'Teste do Pezinho', path: '/neonatal#pezinho' },
      { title: 'Teste da Orelhinha', path: '/neonatal#orelhinha' },
      { title: 'Teste do Olhinho', path: '/neonatal#olhinho' },
      { title: 'Teste do Coraçãozinho', path: '/neonatal#coracaozinho' },
      { title: 'Teste da Linguinha', path: '/neonatal#linguinha' },
    ],
  },
  {
    title: 'Saúde Infantil',
    icon: Users,
    path: '/infantil',
    subsections: [
      { title: 'Autismo (TEA)', path: '/infantil#tea' },
      { title: 'Desenvolvimento', path: '/infantil#desenvolvimento' },
      { title: 'Anemia Ferropriva', path: '/infantil#anemia' },
      { title: 'Visão', path: '/infantil#visao' },
    ],
  },
  {
    title: 'Adultos (DCNTs)',
    icon: Activity,
    path: '/adultos',
    subsections: [
      { title: 'Hipertensão Arterial', path: '/adultos#has' },
      { title: 'Diabetes Mellitus', path: '/adultos#diabetes' },
      { title: 'Dislipidemias', path: '/adultos#dislipidemia' },
      { title: 'Obesidade', path: '/adultos#obesidade' },
      { title: 'Tabagismo', path: '/adultos#tabagismo' },
    ],
  },
  {
    title: 'Câncer',
    icon: Heart,
    path: '/cancer',
    subsections: [
      { title: 'Câncer de Mama', path: '/cancer#mama' },
      { title: 'Câncer de Colo do Útero', path: '/cancer#colo' },
      { title: 'Câncer Colorretal', path: '/cancer#colorretal' },
      { title: 'Câncer de Próstata', path: '/cancer#prostata' },
    ],
  },
  {
    title: 'Gestação (Pré-natal)',
    icon: Baby,
    path: '/gestacao',
    subsections: [
      { title: 'Sífilis', path: '/gestacao#sifilis' },
      { title: 'HIV', path: '/gestacao#hiv' },
      { title: 'Hepatites B e C', path: '/gestacao#hepatites' },
      { title: 'GBS (Streptococcus)', path: '/gestacao#gbs' },
      { title: 'Diabetes Gestacional', path: '/gestacao#dmg' },
    ],
  },
  {
    title: 'Timeline 2025',
    icon: Clock,
    path: '/timeline',
  },
  {
    title: 'Calculadoras Clínicas',
    icon: Calculator,
    path: '/calculadoras',
  },
  {
    title: 'Bibliografia',
    icon: BookMarked,
    path: '/bibliografia',
  },
  {
    title: 'Busca Avançada',
    icon: FileSearch,
    path: '/busca',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([pathname.split('#')[0]]));

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <aside className="w-64 lg:w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 h-screen sticky top-16 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-1">
          {navigation.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.has(section.path || section.title);
            const isActive = pathname === section.path;
            const hasSubsections = section.subsections && section.subsections.length > 0;

            return (
              <div key={section.title}>
                {section.path ? (
                  <Link
                    href={section.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-semibold'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    onClick={(e) => {
                      if (hasSubsections) {
                        e.preventDefault();
                        toggleSection(section.path!);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </div>
                    {hasSubsections && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSection(section.path!);
                        }}
                        className="p-1"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </div>
                    {hasSubsections && (
                      isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )
                    )}
                  </button>
                )}

                {/* Subsections */}
                {hasSubsections && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {section.subsections!.map((subsection) => {
                      const isSubActive = pathname + (typeof window !== 'undefined' ? window.location.hash : '') === subsection.path;
                      
                      return (
                        <Link
                          key={subsection.path}
                          href={subsection.path}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            isSubActive
                              ? 'text-blue-700 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30'
                              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                          }`}
                        >
                          {subsection.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
            <p className="font-semibold">Padrão Q1</p>
            <p>Todas as afirmações com referências validadas</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Última atualização: Nov/2025</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

