'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Search,
  Wrench,
  Menu,
  X,
  Calculator,
  Pill,
  ClipboardList,
  BookOpen,
  FileText,
  GraduationCap,
  Users,
  Heart,
  Zap,
  AlertTriangle,
  FileSearch,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

// =============================================================================
// TYPES
// =============================================================================

interface NavItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  action?: 'search' | 'tools' | 'menu';
}

interface ToolItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function MobileBottomNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [showTools, setShowTools] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navItems: NavItem[] = [
    { icon: Home, label: t('sidebar.home'), path: '/' },
    { icon: Search, label: t('common.search'), action: 'search' },
    { icon: Wrench, label: t('sidebar.clinicalTools'), action: 'tools' },
    { icon: Menu, label: 'Menu', action: 'menu' },
  ];

  const toolItems: ToolItem[] = [
    { icon: Calculator, label: t('sidebar.calculators'), path: '/calculadoras' },
    { icon: Pill, label: t('sidebar.medicationGuide'), path: '/medicamentos' },
    { icon: ClipboardList, label: t('sidebar.soapRecord'), path: '/prontuario' },
    { icon: Zap, label: t('sidebar.quickConsultation'), path: '/consulta-rapida' },
    { icon: AlertTriangle, label: t('sidebar.drugInteractions'), path: '/medicamentos/interacoes' },
    { icon: FileSearch, label: t('sidebar.advancedSearch'), path: '/busca' },
  ];

  const menuItems: ToolItem[] = [
    { icon: BookOpen, label: t('sidebar.diseasesAPS'), path: '/doencas' },
    { icon: FileText, label: t('sidebar.protocols'), path: '/protocolos' },
    { icon: GraduationCap, label: t('sidebar.clinicalCases'), path: '/casos-clinicos' },
    { icon: Users, label: t('sidebar.genogram'), path: '/ferramentas/genograma' },
    { icon: Heart, label: t('sidebar.ecomap'), path: '/ferramentas/ecomapa' },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.action === 'search') {
      // Trigger command palette (Cmd+K)
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);
    } else if (item.action === 'tools') {
      setShowTools(!showTools);
      setShowMenu(false);
    } else if (item.action === 'menu') {
      setShowMenu(!showMenu);
      setShowTools(false);
    }
  };

  const closeOverlays = () => {
    setShowTools(false);
    setShowMenu(false);
  };

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.2 },
      };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {(showTools || showMenu) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={closeOverlays}
          />
        )}
      </AnimatePresence>

      {/* Tools Action Sheet */}
      <AnimatePresence>
        {showTools && (
          <motion.div
            {...animationProps}
            className="fixed bottom-20 inset-x-4 bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl z-50 md:hidden overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
              <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                {t('sidebar.clinicalTools')}
              </h3>
              <button
                onClick={() => setShowTools(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#86868b]" />
              </button>
            </div>
            <div className="p-2 grid grid-cols-3 gap-2">
              {toolItems.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    onClick={closeOverlays}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#007aff]/10 dark:bg-[#5ac8fa]/15 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#007aff] dark:text-[#5ac8fa]" />
                    </div>
                    <span className="text-xs text-center text-[#1d1d1f] dark:text-[#f5f5f7] font-medium line-clamp-2">
                      {tool.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Drawer */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            {...animationProps}
            className="fixed bottom-20 inset-x-4 bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl z-50 md:hidden overflow-hidden max-h-[60vh] overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between sticky top-0 bg-white dark:bg-[#1c1c1e]">
              <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                Menu
              </h3>
              <button
                onClick={() => setShowMenu(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#86868b]" />
              </button>
            </div>
            <div className="p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeOverlays}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl transition-colors',
                      isActive
                        ? 'bg-[#007aff] text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-white/10 text-[#1d1d1f] dark:text-[#f5f5f7]'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 inset-x-0 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 z-50 md:hidden safe-area-bottom"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path ? pathname === item.path : (item.action === 'tools' && showTools) || (item.action === 'menu' && showMenu);

            if (item.path) {
              return (
                <Link
                  key={item.label}
                  href={item.path}
                  onClick={closeOverlays}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors',
                    isActive
                      ? 'text-[#007aff] dark:text-[#5ac8fa]'
                      : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors',
                  isActive
                    ? 'text-[#007aff] dark:text-[#5ac8fa]'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]'
                )}
                aria-expanded={item.action === 'tools' ? showTools : item.action === 'menu' ? showMenu : undefined}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer for bottom nav */}
      <div className="h-16 md:hidden" aria-hidden="true" />
    </>
  );
}
