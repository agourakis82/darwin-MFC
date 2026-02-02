'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/lib/store/appStore';
import { LanguageSelector } from '../LanguageSelector';
import RegionSelector, { RegionSelectorCompact } from '../RegionSelector';
import { Sun, Moon, BookOpen, FileText, Menu, X, Search, Zap, ClipboardList, AlertTriangle, Pill, Calculator, Stethoscope, Keyboard, GraduationCap, Users, Command, StickyNote } from 'lucide-react';
import CommandPalette from '../CommandPalette/CommandPalette';
import { HighYieldToggle } from '../HighYield';
import { DarwinLogo } from '../Brand';
import UserMenu from '../Auth/UserMenu';

// Fallback translations for pages not yet migrated to [locale]
const fallbackTranslations: Record<string, string> = {
  'common.appName': 'DARWIN',
  'common.appSubtitle': 'MEDICAL HUB',
  'nav.neonatal': 'Neonatal',
  'nav.infantil': 'Infantil',
  'nav.adultos': 'Adultos',
  'nav.cancer': 'Câncer',
  'nav.gestacao': 'Gestação',
  'nav.outros': 'Outros',
  'nav.timeline': 'Timeline',
  'nav.doencas': 'Doenças APS',
  'nav.medicamentos': 'Bulário RENAME',
  'nav.protocolos': 'Protocolos',
  'nav.learn': 'Aprender',
  'nav.community': 'Comunidade',
  'nav.notas': 'Notas',
  'header.search': 'Buscar',
  'header.descriptiveMode': 'Descritivo',
  'header.criticalAnalysisMode': 'Análise',
  'header.lightMode': 'Modo claro',
  'header.darkMode': 'Modo escuro',
  'sidebar.quickAccess': 'Guia Clínico',
  'sidebar.rastreamentos': 'Rastreamentos SUS',
  'sidebar.new': 'Novo',
  'contentMode.descriptive': 'Modo Descritivo',
  'contentMode.criticalAnalysis': 'Modo Análise Crítica',
};

function useSafeTranslations() {
  try {
    return useTranslations();
  } catch {
    return ((key: string) => fallbackTranslations[key] || key) as ReturnType<typeof useTranslations>;
  }
}

export default function Header() {
  const t = useSafeTranslations();

  const { theme, toggleTheme, contentMode, toggleContentMode } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <>
      {/* Skip to content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-gray-900 focus:text-primary focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-primary focus:outline-none"
      >
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-40 header-darwin" role="banner">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo e Título */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 apple-transition-fast"
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#1d1d1f] dark:text-[#f5f5f7]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#1d1d1f] dark:text-[#f5f5f7]" />
                )}
              </button>

            <Link href="/" className="flex items-center gap-3 apple-transition-fast hover:opacity-90">
              <DarwinLogo variant="full" size="md" animated={false} />
            </Link>
          </div>

          {/* Navegação Desktop - Darwin Medical Hub */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            <Link
              href="/doencas"
              className="nav-link-darwin"
            >
              <Stethoscope className="w-4 h-4" />
              {t('nav.doencas')}
            </Link>
            <Link
              href="/medicamentos"
              className="nav-link-darwin"
            >
              <Pill className="w-4 h-4" />
              {t('nav.medicamentos')}
            </Link>
            <Link
              href="/protocolos"
              className="nav-link-darwin"
            >
              <FileText className="w-4 h-4" />
              {t('nav.protocolos')}
            </Link>
            <div className="w-px h-5 bg-carbon-200 dark:bg-carbon-700 mx-1" />
            <Link
              href="/learn"
              className="px-3.5 py-2 text-base font-medium text-adenine-teal dark:text-cytosine-cyan hover:bg-adenine-teal/10 dark:hover:bg-cytosine-cyan/10 rounded-lg apple-transition-fast flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              {t('nav.learn')}
            </Link>
            <Link
              href="/community"
              className="px-3.5 py-2 text-base font-medium text-guanine-green dark:text-guanine-green hover:bg-guanine-green/10 dark:hover:bg-guanine-green/10 rounded-lg apple-transition-fast flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              {t('nav.community')}
            </Link>
            <Link
              href="/notas"
              className="px-3.5 py-2 text-base font-medium text-thymine-gold dark:text-thymine-gold hover:bg-thymine-gold/10 dark:hover:bg-thymine-gold/10 rounded-lg apple-transition-fast flex items-center gap-1.5"
            >
              <StickyNote className="w-4 h-4" />
              {t('nav.notas')}
            </Link>
          </nav>

          {/* Controles */}
          <div className="flex items-center gap-1.5">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-adenine-teal/10 dark:hover:bg-cytosine-cyan/10 apple-transition-fast border border-carbon-200 dark:border-carbon-700"
              aria-label={`${t('header.search')} (Cmd+K)`}
              title={`${t('header.search')} (Cmd+K)`}
            >
              <Search className="w-4 h-4 text-carbon-500" />
              <span className="text-sm text-carbon-500">{t('header.search')}</span>
              <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono text-carbon-500 bg-carbon-200 dark:bg-carbon-700 rounded">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>
            {/* Mobile Search Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="sm:hidden p-2 rounded-xl hover:bg-adenine-teal/10 dark:hover:bg-cytosine-cyan/10 apple-transition-fast"
              aria-label={t('header.search')}
            >
              <Search className="w-5 h-5 text-helix-navy dark:text-white" />
            </button>

            {/* High-Yield Mode Toggle */}
            <HighYieldToggle
              className="hidden md:flex"
              showLabel={false}
            />

            {/* Toggle Modo de Conteúdo */}
            <button
              onClick={toggleContentMode}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 text-base font-medium apple-transition shadow-sm ${
                contentMode === 'descriptive'
                  ? 'bg-adenine-teal/10 text-adenine-teal dark:bg-cytosine-cyan/15 dark:text-cytosine-cyan'
                  : 'bg-guanine-green/10 text-guanine-green dark:bg-guanine-green/15 dark:text-guanine-green'
              }`}
              title={contentMode === 'descriptive' ? t('contentMode.descriptive') : t('contentMode.criticalAnalysis')}
              aria-pressed={contentMode === 'critical_analysis'}
              aria-label={`Content mode: ${contentMode === 'descriptive' ? 'Descriptive' : 'Critical Analysis'}. Click to toggle.`}
            >
              <FileText className="w-5 h-5" aria-hidden="true" />
              <span className="hidden sm:inline">
                {contentMode === 'descriptive' ? t('header.descriptiveMode') : t('header.criticalAnalysisMode')}
              </span>
            </button>

            {/* Region Selector */}
            <RegionSelectorCompact />

            {/* Language Selector */}
            <LanguageSelector className="hidden sm:block" />

            {/* User Menu / Login */}
            <UserMenu />

            {/* Toggle Tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-adenine-teal/10 dark:hover:bg-cytosine-cyan/10 apple-transition-fast"
              aria-label={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
              title={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-helix-navy" aria-hidden="true" />
              ) : (
                <Sun className="w-5 h-5 text-cytosine-cyan" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile - Melhorado */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden pb-6 border-t border-black/10 dark:border-white/10 mt-4 pt-4 animate-fade-in max-h-[85vh] sm:max-h-[80vh] overflow-y-auto"
            role="navigation"
            aria-label="Mobile navigation"
          >
            
            {/* Plataforma Social */}
            <div className="mb-4">
              <p className="px-5 py-2 text-xs font-bold text-[#86868b] uppercase tracking-wider">
                Plataforma
              </p>
              <nav className="grid grid-cols-2 gap-2 px-3">
                <Link
                  href="/learn"
                  className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium">Aprender</span>
                </Link>
                <Link
                  href="/community"
                  className="flex flex-col items-center gap-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-medium">Comunidade</span>
                </Link>
              </nav>
            </div>

            {/* Ferramentas Rápidas */}
            <div className="mb-4">
              <p className="px-5 py-2 text-xs font-bold text-[#86868b] uppercase tracking-wider">
                Ferramentas Clínicas
              </p>
              <nav className="grid grid-cols-2 gap-2 px-3">
                <Link
                  href="/consulta-rapida"
                  className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium">Consulta Rápida</span>
                </Link>
                <Link
                  href="/prontuario"
                  className="flex flex-col items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ClipboardList className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-medium">SOAP</span>
                </Link>
                <Link
                  href="/medicamentos/interacoes"
                  className="flex flex-col items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <span className="text-xs font-medium">Interações</span>
                </Link>
                <Link
                  href="/calculadoras"
                  className="flex flex-col items-center gap-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calculator className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-medium">Calculadoras</span>
                </Link>
                <Link
                  href="/notas"
                  className="flex flex-col items-center gap-2 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <StickyNote className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  <span className="text-xs font-medium">Notas</span>
                </Link>
              </nav>
            </div>

            {/* Guia Clínico */}
            <div className="mb-4">
              <p className="px-5 py-2 text-xs font-bold text-[#86868b] uppercase tracking-wider">
                {t('sidebar.quickAccess')}
              </p>
              <nav className="flex flex-col gap-1 px-3">
                <Link
                  href="/doencas"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Stethoscope className="w-5 h-5 text-[#86868b]" />
                  <span className="font-medium">Doenças APS</span>
                  <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Novo</span>
                </Link>
                <Link
                  href="/medicamentos"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Pill className="w-5 h-5 text-[#86868b]" />
                  <span className="font-medium">Bulário RENAME</span>
                </Link>
                <Link
                  href="/protocolos"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="w-5 h-5 text-[#86868b]" />
                  <span className="font-medium">Protocolos</span>
                </Link>
              </nav>
            </div>

            {/* Rastreamentos */}
            <div className="mb-4">
              <p className="px-5 py-2 text-xs font-bold text-[#86868b] uppercase tracking-wider">
                {t('sidebar.rastreamentos')}
              </p>
              <nav className="flex flex-col gap-1 px-3">
                {[
                  { href: '/neonatal', label: t('nav.neonatal') },
                  { href: '/infantil', label: t('nav.infantil') },
                  { href: '/adultos', label: t('nav.adultos') },
                  { href: '/cancer', label: t('nav.cancer') },
                  { href: '/gestacao', label: t('nav.gestacao') },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2.5 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Region Selector Mobile */}
            <div className="px-5 pt-4 border-t border-black/10 dark:border-white/10">
              <p className="py-2 text-xs font-bold text-[#86868b] uppercase tracking-wider">
                Select Region
              </p>
              <RegionSelector showLabel={false} isCompact={false} className="w-full" />
            </div>

            {/* Language Selector Mobile */}
            <div className="px-5 pt-4 border-t border-black/10 dark:border-white/10">
              <p className="py-2 text-xs font-bold text-[#86868b] uppercase tracking-wider">
                {t('header.selectLanguage')}
              </p>
              <LanguageSelector variant="buttons" />
            </div>

            {/* Atalhos */}
            <div className="px-5 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs text-[#86868b]">
                <Keyboard className="w-4 h-4" aria-hidden="true" />
                <span>
                  Pressione{' '}
                  <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs font-mono">
                    <Command className="w-3 h-3 inline" />K
                  </kbd>{' '}
                  para buscar ou{' '}
                  <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs font-mono">?</kbd>{' '}
                  para atalhos
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>

    {/* Command Palette */}
    <CommandPalette
      open={commandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
    />
    </>
  );
}

