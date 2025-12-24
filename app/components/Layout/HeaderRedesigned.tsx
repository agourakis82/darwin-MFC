/**
 * REDESIGNED HEADER COMPONENT
 * ============================
 *
 * Modern header using Darwin-MFC Design System
 * Features: Smooth animations, mobile gestures, responsive design
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/lib/store/appStore';
import { LanguageSelector } from '../LanguageSelector';
import { Button } from '@/lib/design-system/primitives/button';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Sun,
  Moon,
  BookOpen,
  FileText,
  Menu,
  X,
  Search,
  Zap,
  ClipboardList,
  AlertTriangle,
  Pill,
  Calculator,
  Stethoscope,
  Keyboard,
  GraduationCap,
  Users,
  Command,
  StickyNote,
} from 'lucide-react';
import CommandPalette from '../CommandPalette/CommandPalette';
import { HighYieldToggle } from '../HighYield';

// Fallback translations
const fallbackTranslations: Record<string, string> = {
  'common.appName': 'Darwin MFC',
  'common.appSubtitle': 'Análise Sistêmica 2025',
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
  'contentMode.descriptive': 'Modo Descritivo',
  'contentMode.criticalAnalysis': 'Modo Análise Crítica',
};

function useSafeTranslations() {
  try {
    return useTranslations();
  } catch {
    return ((key: string) => fallbackTranslations[key] || key) as ReturnType<
      typeof useTranslations
    >;
  }
}

// Animation variants
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as any },
  },
};

const mobileMenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as any },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as any },
  },
};

const navLinkVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

export default function HeaderRedesigned() {
  const t = useSafeTranslations();
  const { theme, toggleTheme, contentMode, toggleContentMode } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className={cn(
          'sticky top-0 z-40',
          'bg-white/70 dark:bg-neutral-900/70',
          'backdrop-blur-md',
          'border-b border-neutral-200/50 dark:border-neutral-800/50',
          'transition-all duration-300',
          scrolled && 'shadow-md'
        )}
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </Button>

              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-brand-primary-600 dark:group-hover:text-brand-primary-400 transition-colors">
                    {t('common.appName')}
                  </h1>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {t('common.appSubtitle')}
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {[
                { href: '/doencas', label: t('nav.doencas'), icon: Stethoscope },
                { href: '/medicamentos', label: t('nav.medicamentos'), icon: Pill },
                { href: '/protocolos', label: t('nav.protocolos'), icon: FileText },
              ].map((item) => (
                <motion.div key={item.href} variants={navLinkVariants} whileHover="hover" whileTap="tap">
                  <Link href={item.href}>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}

              <div className="w-px h-5 bg-neutral-300 dark:bg-neutral-700 mx-1" />

              {[
                { href: '/learn', label: t('nav.learn'), icon: GraduationCap, color: 'text-blue-600 dark:text-blue-400' },
                { href: '/community', label: t('nav.community'), icon: Users, color: 'text-purple-600 dark:text-purple-400' },
                { href: '/notas', label: t('nav.notas'), icon: StickyNote, color: 'text-orange-600 dark:text-orange-400' },
              ].map((item) => (
                <motion.div key={item.href} variants={navLinkVariants} whileHover="hover" whileTap="tap">
                  <Link href={item.href}>
                    <Button variant="ghost" size="sm" className={cn("gap-1.5", item.color)}>
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              {/* Command Palette Trigger - Desktop */}
              <motion.button
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-neutral-200 dark:border-neutral-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`${t('header.search')} (Cmd+K)`}
              >
                <Search className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {t('header.search')}
                </span>
                <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded">
                  <Command className="w-3 h-3" />K
                </kbd>
              </motion.button>

              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCommandPaletteOpen(true)}
                className="sm:hidden"
                aria-label={t('header.search')}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* High-Yield Toggle */}
              <div className="hidden md:block">
                <HighYieldToggle showLabel={false} />
              </div>

              {/* Content Mode Toggle */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={toggleContentMode}
                  variant={contentMode === 'descriptive' ? 'info' : 'default'}
                  size="sm"
                  className="gap-2"
                  aria-pressed={contentMode === 'critical_analysis'}
                  aria-label={`Content mode: ${contentMode}. Click to toggle.`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {contentMode === 'descriptive'
                      ? t('header.descriptiveMode')
                      : t('header.criticalAnalysisMode')}
                  </span>
                </Button>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
                  aria-pressed={theme === 'dark'}
                >
                  <motion.div
                    animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === 'light' ? (
                      <Moon className="w-5 h-5" />
                    ) : (
                      <Sun className="w-5 h-5" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
                className="lg:hidden overflow-hidden"
                role="navigation"
                aria-label="Mobile navigation"
              >
                <div className="pb-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  {/* Platform Links */}
                  <div className="mb-4">
                    <p className="px-4 py-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Plataforma
                    </p>
                    <div className="grid grid-cols-2 gap-2 px-3">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href="/learn"
                          className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-medium">Aprender</span>
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href="/community"
                          className="flex flex-col items-center gap-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs font-medium">Comunidade</span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {/* Quick Tools */}
                  <div className="mb-4">
                    <p className="px-4 py-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Ferramentas Clínicas
                    </p>
                    <div className="grid grid-cols-2 gap-2 px-3">
                      {[
                        { href: '/consulta-rapida', icon: Zap, label: 'Consulta Rápida', color: 'blue' },
                        { href: '/prontuario', icon: ClipboardList, label: 'SOAP', color: 'green' },
                        { href: '/medicamentos/interacoes', icon: AlertTriangle, label: 'Interações', color: 'red' },
                        { href: '/calculadoras', icon: Calculator, label: 'Calculadoras', color: 'purple' },
                        { href: '/notas', icon: StickyNote, label: 'Notas', color: 'orange' },
                      ].map((tool) => (
                        <motion.div key={tool.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            href={tool.href}
                            className={cn(
                              'flex flex-col items-center gap-2 p-4 rounded-xl',
                              `bg-${tool.color}-50 dark:bg-${tool.color}-900/20`
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <tool.icon className={`w-6 h-6 text-${tool.color}-600 dark:text-${tool.color}-400`} />
                            <span className="text-xs font-medium">{tool.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Guide */}
                  <div className="mb-4">
                    <p className="px-4 py-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {t('sidebar.quickAccess')}
                    </p>
                    <div className="flex flex-col gap-1 px-3">
                      {[
                        { href: '/doencas', icon: Stethoscope, label: 'Doenças APS', badge: 'Novo' },
                        { href: '/medicamentos', icon: Pill, label: 'Bulário RENAME' },
                        { href: '/protocolos', icon: FileText, label: 'Protocolos' },
                      ].map((item) => (
                        <motion.div key={item.href} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <item.icon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Keyboard Shortcuts Hint */}
                  <div className="px-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <Keyboard className="w-4 h-4" />
                      <span>
                        Pressione{' '}
                        <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs font-mono">
                          <Command className="w-3 h-3 inline" />K
                        </kbd>{' '}
                        para buscar
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Command Palette */}
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </>
  );
}
