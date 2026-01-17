'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  Calculator,
  FileText,
  Search,
  AlertTriangle,
  X,
  Plus,
  Pill,
  Stethoscope,
  BookOpen,
} from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

interface QuickAction {
  id: string;
  icon: React.ElementType;
  label: string;
  href?: string;
  onClick?: () => void;
  color: string;
  bgColor: string;
  shortcut?: string;
}

interface FloatingHubProps {
  /** Custom position from bottom (default: 6 = 24px) */
  bottom?: number;
  /** Custom position from right (default: 6 = 24px) */
  right?: number;
  /** Show keyboard shortcuts hints */
  showShortcuts?: boolean;
  /** Custom actions (overrides defaults) */
  customActions?: QuickAction[];
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEFAULT_ACTIONS: QuickAction[] = [
  {
    id: 'calculator',
    icon: Calculator,
    label: 'quickActions.calculator',
    href: '/calculadoras',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/40',
    shortcut: '1',
  },
  {
    id: 'prescription',
    icon: FileText,
    label: 'quickActions.prescription',
    href: '/prontuario',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/40',
    shortcut: '2',
  },
  {
    id: 'search',
    icon: Search,
    label: 'quickActions.search',
    href: '/busca',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/40',
    shortcut: '3',
  },
  {
    id: 'emergency',
    icon: AlertTriangle,
    label: 'quickActions.emergency',
    href: '/protocolos',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/40',
    shortcut: '4',
  },
  {
    id: 'medications',
    icon: Pill,
    label: 'quickActions.medications',
    href: '/medicamentos',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/40',
    shortcut: '5',
  },
  {
    id: 'diseases',
    icon: Stethoscope,
    label: 'quickActions.diseases',
    href: '/doencas',
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-100 dark:bg-teal-900/40',
    shortcut: '6',
  },
  {
    id: 'study',
    icon: BookOpen,
    label: 'quickActions.study',
    href: '/estudo',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
    shortcut: '7',
  },
];

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 20,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.8,
  },
};

const fabVariants = {
  idle: {
    rotate: 0,
    scale: 1,
  },
  open: {
    rotate: 45,
    scale: 1.1,
  },
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.95,
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export function FloatingHub({
  bottom = 6,
  right = 6,
  showShortcuts = true,
  customActions,
}: FloatingHubProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  // Use translations with fallback
  let t: (key: string) => string;
  try {
    t = useTranslations('common');
  } catch {
    // Fallback if translations not available
    t = (key: string) => {
      const fallbacks: Record<string, string> = {
        'quickActions.calculator': 'Calculadoras',
        'quickActions.prescription': 'Prontuario',
        'quickActions.search': 'Busca',
        'quickActions.emergency': 'Emergencia',
        'quickActions.medications': 'Medicamentos',
        'quickActions.diseases': 'Doencas',
        'quickActions.study': 'Estudo',
        'quickActions.openMenu': 'Abrir menu rapido',
        'quickActions.closeMenu': 'Fechar menu',
      };
      return fallbacks[key] || key;
    };
  }

  const actions = customActions || DEFAULT_ACTIONS;

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Toggle menu with Cmd/Ctrl + .
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Handle action shortcuts when menu is open
      if (isOpen && showShortcuts) {
        const actionIndex = parseInt(e.key, 10) - 1;
        if (actionIndex >= 0 && actionIndex < actions.length) {
          const action = actions[actionIndex];
          if (action.href) {
            router.push(action.href);
          } else if (action.onClick) {
            action.onClick();
          }
          setIsOpen(false);
        }

        // Close with Escape
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      }
    },
    [isOpen, showShortcuts, actions, router]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-floating-hub]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleActionClick = (action: QuickAction) => {
    if (action.href) {
      router.push(action.href);
    } else if (action.onClick) {
      action.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div
      data-floating-hub
      className="fixed z-40 hidden md:block"
      style={{
        bottom: `${bottom * 4}px`,
        right: `${right * 4}px`,
      }}
    >
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[-1]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-16 right-0 flex flex-col items-end gap-3 mb-4"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.id}
                variants={itemVariants}
                onClick={() => handleActionClick(action)}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl
                  ${action.bgColor}
                  shadow-lg shadow-black/10 dark:shadow-black/30
                  hover:shadow-xl hover:scale-105
                  active:scale-95
                  transition-all duration-200
                  min-w-[180px] justify-between
                  border border-white/50 dark:border-white/10
                `}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-10 h-10 rounded-xl flex items-center justify-center
                      ${action.bgColor} ${action.color}
                      border border-current/20
                    `}
                  >
                    <action.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span
                    className={`
                      font-semibold text-sm
                      ${action.color}
                    `}
                  >
                    {t(action.label)}
                  </span>
                </div>

                {showShortcuts && action.shortcut && (
                  <kbd
                    className={`
                      px-2 py-1 rounded-lg text-xs font-mono
                      bg-white/50 dark:bg-white/10
                      ${action.color}
                      opacity-60
                    `}
                  >
                    {action.shortcut}
                  </kbd>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        variants={fabVariants}
        initial="idle"
        animate={isOpen ? 'open' : 'idle'}
        whileHover="hover"
        whileTap="tap"
        className={`
          relative w-14 h-14 rounded-full
          bg-gradient-to-br from-blue-500 to-purple-600
          text-white shadow-lg
          hover:shadow-xl
          flex items-center justify-center
          transition-shadow duration-200
        `}
        aria-label={isOpen ? t('quickActions.closeMenu') : t('quickActions.openMenu')}
        aria-expanded={isOpen}
      >
        {/* Pulse animation when closed */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Icon with rotation */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" strokeWidth={2.5} />
          ) : (
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          )}
        </motion.div>

        {/* Keyboard shortcut hint */}
        {!isOpen && showShortcuts && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[10px] font-mono whitespace-nowrap"
          >
            {typeof window !== 'undefined' && navigator.platform.includes('Mac')
              ? 'Cmd+.'
              : 'Ctrl+.'}
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}

export default FloatingHub;
