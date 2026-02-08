'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store/appStore';
import { LanguageSelector } from '../LanguageSelector';
import RegionSelector, { RegionSelectorCompact } from '../RegionSelector';
import { Sun, Moon, BookOpen, FileText, Menu, X, Search, Zap, ClipboardList, AlertTriangle, Pill, Calculator, Stethoscope, Keyboard, GraduationCap, Users, Command, StickyNote } from 'lucide-react';
import CommandPalette from '../CommandPalette/CommandPalette';
import { HighYieldToggle } from '../HighYield';
import { DarwinLogo } from '../Brand';
import UserMenu from '../Auth/UserMenu';
import { DrawerTransition } from '@/lib/design-system/animations/transitions';
import { fadeInUp, listContainer, springs } from '@/lib/design-system/animations/presets';

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

            {/* Content Mode Segmented Control */}
            <div
              className="relative flex items-center bg-carbon-100 dark:bg-carbon-800 rounded-xl p-0.5"
              role="radiogroup"
              aria-label="Content mode"
            >
              <motion.div
                className="absolute top-0.5 bottom-0.5 rounded-lg bg-white dark:bg-carbon-700 shadow-sm"
                layout
                transition={{ type: 'spring', ...springs.bouncy }}
                style={{
                  left: contentMode === 'descriptive' ? '2px' : '50%',
                  right: contentMode === 'descriptive' ? '50%' : '2px',
                }}
              />
              <button
                onClick={() => contentMode !== 'descriptive' && toggleContentMode()}
                className={`relative z-10 px-3 py-1.5 rounded-lg text-sm font-medium apple-transition-fast flex items-center gap-1.5 ${
                  contentMode === 'descriptive'
                    ? 'text-adenine-teal dark:text-cytosine-cyan'
                    : 'text-carbon-500 dark:text-carbon-400'
                }`}
                role="radio"
                aria-checked={contentMode === 'descriptive'}
                title={t('contentMode.descriptive')}
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{t('header.descriptiveMode')}</span>
              </button>
              <button
                onClick={() => contentMode !== 'critical_analysis' && toggleContentMode()}
                className={`relative z-10 px-3 py-1.5 rounded-lg text-sm font-medium apple-transition-fast flex items-center gap-1.5 ${
                  contentMode === 'critical_analysis'
                    ? 'text-guanine-green dark:text-guanine-green'
                    : 'text-carbon-500 dark:text-carbon-400'
                }`}
                role="radio"
                aria-checked={contentMode === 'critical_analysis'}
                title={t('contentMode.criticalAnalysis')}
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{t('header.criticalAnalysisMode')}</span>
              </button>
            </div>

            {/* Region Selector */}
            <RegionSelectorCompact />

            {/* Language Selector */}
            <LanguageSelector className="hidden sm:block" />

            {/* User Menu / Login */}
            <UserMenu />

            {/* Toggle Tema — animated */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-adenine-teal/10 dark:hover:bg-cytosine-cyan/10 apple-transition-fast"
              aria-label={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
              title={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
              aria-pressed={theme === 'dark'}
              whileTap={{ scale: 0.85, rotate: 180 }}
              transition={{ type: 'spring', ...springs.bouncy }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-helix-navy" aria-hidden="true" />
                  ) : (
                    <Sun className="w-5 h-5 text-cytosine-cyan" aria-hidden="true" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <DrawerTransition
          show={mobileMenuOpen}
          position="left"
          size="320px"
          backdrop={true}
          closeOnBackdropClick={true}
          onBackdropClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-menu"
            className="h-full bg-white dark:bg-carbon-950 overflow-y-auto pb-24"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-carbon-200 dark:border-carbon-800">
              <DarwinLogo variant="full" size="sm" animated={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-carbon-100 dark:hover:bg-carbon-800 apple-transition-fast"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-carbon-500" />
              </button>
            </div>

            <motion.div
              variants={listContainer}
              initial="initial"
              animate="animate"
              className="p-4 space-y-6"
            >
              {/* Ferramentas Rápidas */}
              <motion.div variants={fadeInUp}>
                <p className="px-2 py-2 text-xs font-bold text-carbon-400 uppercase tracking-wider">
                  Ferramentas Clínicas
                </p>
                <nav className="grid grid-cols-2 gap-2">
                  {[
                    { href: '/consulta-rapida', icon: Zap, label: 'Consulta Rápida', color: 'text-adenine-teal bg-adenine-teal/10' },
                    { href: '/prontuario', icon: ClipboardList, label: 'SOAP', color: 'text-guanine-green bg-guanine-green/10' },
                    { href: '/medicamentos/interacoes', icon: AlertTriangle, label: 'Interações', color: 'text-red-500 bg-red-500/10' },
                    { href: '/calculadoras', icon: Calculator, label: 'Calculadoras', color: 'text-cytosine-cyan bg-cytosine-cyan/10' },
                    { href: '/notas', icon: StickyNote, label: 'Notas', color: 'text-thymine-gold bg-thymine-gold/10' },
                    { href: '/learn', icon: GraduationCap, label: 'Aprender', color: 'text-adenine-teal bg-adenine-teal/10' },
                  ].map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl apple-transition-fast hover:scale-[1.02] active:scale-95"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-carbon-700 dark:text-carbon-300">{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </motion.div>

              {/* Guia Clínico */}
              <motion.div variants={fadeInUp}>
                <p className="px-2 py-2 text-xs font-bold text-carbon-400 uppercase tracking-wider">
                  {t('sidebar.quickAccess')}
                </p>
                <nav className="flex flex-col gap-1">
                  {[
                    { href: '/doencas', icon: Stethoscope, label: 'Doenças APS', badge: true },
                    { href: '/medicamentos', icon: Pill, label: 'Bulário RENAME' },
                    { href: '/protocolos', icon: FileText, label: 'Protocolos' },
                  ].map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-carbon-100 dark:hover:bg-carbon-800 rounded-xl apple-transition-fast"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-carbon-400" />
                      <span className="font-medium text-carbon-800 dark:text-carbon-200">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-xs bg-guanine-green/10 text-guanine-green px-2 py-0.5 rounded-full font-medium">Novo</span>
                      )}
                    </Link>
                  ))}
                </nav>
              </motion.div>

              {/* Rastreamentos */}
              <motion.div variants={fadeInUp}>
                <p className="px-2 py-2 text-xs font-bold text-carbon-400 uppercase tracking-wider">
                  {t('sidebar.rastreamentos')}
                </p>
                <nav className="flex flex-col gap-0.5">
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
                      className="px-3 py-2.5 text-sm font-medium text-carbon-700 dark:text-carbon-300 hover:bg-carbon-100 dark:hover:bg-carbon-800 rounded-xl apple-transition-fast"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>

              {/* Settings */}
              <motion.div variants={fadeInUp} className="space-y-4 pt-4 border-t border-carbon-200 dark:border-carbon-800">
                <div>
                  <p className="px-2 py-2 text-xs font-bold text-carbon-400 uppercase tracking-wider">
                    Region
                  </p>
                  <RegionSelector showLabel={false} isCompact={false} className="w-full" />
                </div>
                <div>
                  <p className="px-2 py-2 text-xs font-bold text-carbon-400 uppercase tracking-wider">
                    {t('header.selectLanguage')}
                  </p>
                  <LanguageSelector variant="buttons" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </DrawerTransition>
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

