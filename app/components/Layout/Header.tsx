'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/lib/store/appStore';
import { LanguageSelector } from '../LanguageSelector';
import { Sun, Moon, BookOpen, FileText, Menu, X, Search, Zap, ClipboardList, AlertTriangle, Pill, Calculator, Stethoscope, Keyboard, GraduationCap, Users, Command, StickyNote } from 'lucide-react';
import CommandPalette from '../CommandPalette/CommandPalette';
import { HighYieldToggle } from '../HighYield';

// Fallback translations for pages not yet migrated to [locale]
const fallbackTranslations: Record<string, string> = {
  'common.appName': 'Darwin MFC',
  'common.appSubtitle': 'Análise Sistêmica 2025',
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
      <header className="sticky top-0 z-40 navbar-glass" role="banner">
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

            <Link href="/" className="flex items-center gap-3 apple-transition-fast hover:opacity-80">
              <div className="w-12 h-12 gradient-apple-blue rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
                  {t('common.appName')}
                </h1>
                <p className="text-sm text-[#86868b] dark:text-[#86868b] hidden sm:block">
                  {t('common.appSubtitle')}
                </p>
              </div>
            </Link>
          </div>

          {/* Navegação Desktop - Simplified */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            <Link
              href="/doencas"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast flex items-center gap-1.5"
            >
              <Stethoscope className="w-4 h-4" />
              {t('nav.doencas')}
            </Link>
            <Link
              href="/medicamentos"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast flex items-center gap-1.5"
            >
              <Pill className="w-4 h-4" />
              {t('nav.medicamentos')}
            </Link>
            <Link
              href="/protocolos"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              {t('nav.protocolos')}
            </Link>
            <div className="w-px h-5 bg-black/10 dark:bg-white/10 mx-1" />
            <Link
              href="/learn"
              className="px-3.5 py-2 text-base font-medium text-[#007aff] dark:text-[#5ac8fa] hover:bg-[#007aff]/10 dark:hover:bg-[#5ac8fa]/10 rounded-lg apple-transition-fast flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              {t('nav.learn')}
            </Link>
            <Link
              href="/community"
              className="px-3.5 py-2 text-base font-medium text-[#af52de] dark:text-[#bf5af2] hover:bg-[#af52de]/10 dark:hover:bg-[#bf5af2]/10 rounded-lg apple-transition-fast flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              {t('nav.community')}
            </Link>
            <Link
              href="/notas"
              className="px-3.5 py-2 text-base font-medium text-[#ff9500] dark:text-[#ff9f0a] hover:bg-[#ff9500]/10 dark:hover:bg-[#ff9f0a]/10 rounded-lg apple-transition-fast flex items-center gap-1.5"
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
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 apple-transition-fast border border-black/10 dark:border-white/10"
              aria-label={`${t('header.search')} (Cmd+K)`}
              title={`${t('header.search')} (Cmd+K)`}
            >
              <Search className="w-4 h-4 text-[#86868b]" />
              <span className="text-sm text-[#86868b]">{t('header.search')}</span>
              <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono text-[#86868b] bg-black/5 dark:bg-white/10 rounded">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>
            {/* Mobile Search Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="sm:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 apple-transition-fast"
              aria-label={t('header.search')}
            >
              <Search className="w-5 h-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
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
                  ? 'bg-[#007aff]/10 text-[#007aff] dark:bg-[#5ac8fa]/15 dark:text-[#5ac8fa]'
                  : 'bg-[#af52de]/10 text-[#af52de] dark:bg-[#bf5af2]/15 dark:text-[#bf5af2]'
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

            {/* Language Selector */}
            <LanguageSelector className="hidden sm:block" />

            {/* Toggle Tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 apple-transition-fast"
              aria-label={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
              title={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-[#1d1d1f] dark:text-[#f5f5f7]" aria-hidden="true" />
              ) : (
                <Sun className="w-5 h-5 text-[#f5f5f7]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile - Melhorado */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden pb-6 border-t border-black/10 dark:border-white/10 mt-4 pt-4 animate-fade-in max-h-[80vh] overflow-y-auto"
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

