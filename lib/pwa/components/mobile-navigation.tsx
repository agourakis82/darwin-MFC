/**
 * MOBILE-OPTIMIZED NAVIGATION
 * ============================
 *
 * Mobile-first navigation components
 * Bottom nav, hamburger menu, touch-friendly controls
 *
 * Features:
 * - Bottom navigation bar with icons
 * - Slide-in hamburger menu
 * - Safe area handling (iOS notch, Android bars)
 * - Touch-friendly tap targets (44x44px minimum)
 * - Swipeable navigation
 * - Haptic feedback on interactions
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Home,
  Search,
  Calculator,
  Pill,
  FileText,
  Menu,
  X,
  ChevronRight,
  User,
  Settings,
  Heart,
  BookOpen,
  Stethoscope,
  Activity,
  Award,
  HelpCircle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '../../design-system/primitives/button';
import { haptic } from '../../design-system/animations/haptics';
import { useSwipeGesture } from '../../design-system/animations/gestures';

// ============================================================================
// TYPES
// ============================================================================

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// ============================================================================
// DEFAULT NAVIGATION ITEMS
// ============================================================================

const bottomNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'search', label: 'Search', icon: Search, href: '/busca' },
  { id: 'calculators', label: 'Calculators', icon: Calculator, href: '/calculadoras' },
  { id: 'drugs', label: 'Drugs', icon: Pill, href: '/medicamentos' },
  { id: 'more', label: 'More', icon: Menu, href: '#' },
];

const menuSections: NavSection[] = [
  {
    title: 'Clinical Tools',
    items: [
      { id: 'calculators', label: 'Clinical Calculators', icon: Calculator, href: '/calculadoras' },
      { id: 'drugs', label: 'Medications', icon: Pill, href: '/medicamentos' },
      { id: 'interactions', label: 'Drug Interactions', icon: Activity, href: '/medicamentos/interacoes' },
      { id: 'protocols', label: 'Protocols', icon: FileText, href: '/protocolos' },
    ],
  },
  {
    title: 'Learning',
    items: [
      { id: 'cases', label: 'Clinical Cases', icon: BookOpen, href: '/casos-clinicos' },
      { id: 'diseases', label: 'Diseases', icon: Stethoscope, href: '/doencas' },
      { id: 'screening', label: 'Screening Programs', icon: Award, href: '/rastreamento-sus' },
      { id: 'learn', label: 'Learning Modules', icon: HelpCircle, href: '/learn' },
    ],
  },
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
      { id: 'favorites', label: 'Favorites', icon: Heart, href: '/favorites' },
      { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
    ],
  },
];

// ============================================================================
// BOTTOM NAVIGATION BAR
// ============================================================================

export interface BottomNavBarProps {
  items?: NavItem[];
  onItemClick?: (item: NavItem) => void;
  className?: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  items = bottomNavItems,
  onItemClick,
  className,
}) => {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(items[0].id);

  // Update active item based on pathname
  useEffect(() => {
    if (!pathname) return;
    const matchingItem = items.find((item) => {
      if (item.href === '/') return pathname === '/';
      return pathname.startsWith(item.href);
    });
    if (matchingItem) setActiveId(matchingItem.id);
  }, [pathname, items]);

  const handleClick = (item: NavItem) => {
    haptic.impact('light');
    setActiveId(item.id);
    onItemClick?.(item);
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-white dark:bg-neutral-900',
        'border-t border-neutral-200 dark:border-neutral-800',
        'shadow-lg',
        // Safe area padding for iOS
        'pb-safe',
        className
      )}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleClick(item)}
              className={cn(
                'flex flex-col items-center justify-center',
                'min-w-[44px] min-h-[44px]', // Touch-friendly size
                'px-3 py-2 rounded-xl',
                'transition-colors',
                isActive
                  ? 'text-brand-primary-600 dark:text-brand-primary-400'
                  : 'text-neutral-600 dark:text-neutral-400'
              )}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                <Icon className={cn('w-6 h-6', isActive && 'drop-shadow-lg')} />
                {item.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      'absolute -top-1 -right-1',
                      'min-w-[18px] h-[18px] px-1',
                      'bg-red-500 text-white text-xs font-bold',
                      'rounded-full',
                      'flex items-center justify-center'
                    )}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </motion.span>
                )}
              </div>
              <span className={cn('text-xs mt-1 font-medium', isActive && 'font-semibold')}>
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-primary-600 dark:bg-brand-primary-400 rounded-t-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

// ============================================================================
// HAMBURGER MENU (DRAWER)
// ============================================================================

export interface HamburgerMenuProps {
  sections?: NavSection[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  sections = menuSections,
  isOpen,
  onClose,
  className,
}) => {
  const pathname = usePathname();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-300, 0], [0, 1]);

  // Swipe to close
  const bind = useSwipeGesture({
    onSwipeLeft: onClose,
    threshold: 50,
    velocityThreshold: 0.3,
  });

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleItemClick = () => {
    haptic.impact('light');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            {...(bind as any)}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{ x, opacity }}
            className={cn(
              'fixed left-0 top-0 bottom-0 z-50',
              'w-[280px] max-w-[80vw]',
              'bg-white dark:bg-neutral-900',
              'shadow-2xl',
              'overflow-y-auto',
              // Safe area padding
              'pt-safe pb-safe',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Darwin-MFC
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Sections */}
            <div className="p-4 space-y-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname ? (pathname === item.href || pathname.startsWith(item.href + '/')) : false;

                      return (
                        <motion.a
                          key={item.id}
                          href={item.href}
                          onClick={handleItemClick}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg',
                            'min-h-[44px]', // Touch-friendly
                            'transition-colors',
                            isActive
                              ? 'bg-brand-primary-100 dark:bg-brand-primary-900/30 text-brand-primary-700 dark:text-brand-primary-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          )}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="flex-1 font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 flex-shrink-0 text-neutral-400" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// MOBILE HEADER
// ============================================================================

export interface MobileHeaderProps {
  title?: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
  showBack?: boolean;
  onBackClick?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title = 'Darwin-MFC',
  showMenu = true,
  onMenuClick,
  showBack = false,
  onBackClick,
  actions,
  className,
}) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40',
        'bg-white dark:bg-neutral-900',
        'border-b border-neutral-200 dark:border-neutral-800',
        'shadow-sm',
        // Safe area padding
        'pt-safe',
        className
      )}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left: Menu or Back */}
        <div className="flex items-center gap-2">
          {showMenu && (
            <button
              onClick={() => {
                haptic.impact('light');
                onMenuClick?.();
              }}
              className={cn(
                'p-2 rounded-lg',
                'min-w-[44px] min-h-[44px]', // Touch-friendly
                'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )}
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {showBack && (
            <button
              onClick={() => {
                haptic.impact('light');
                onBackClick?.();
              }}
              className={cn(
                'p-2 rounded-lg',
                'min-w-[44px] min-h-[44px]',
                'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )}
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
          )}
        </div>

        {/* Center: Title */}
        <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 truncate">
          {title}
        </h1>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </motion.header>
  );
};

// ============================================================================
// SWIPEABLE TABS NAVIGATION
// ============================================================================

export interface SwipeableTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface SwipeableTabsProps {
  tabs: SwipeableTab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export const SwipeableTabs: React.FC<SwipeableTabsProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const [direction, setDirection] = useState(0);
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const handleSwipe = (offset: number) => {
    const newIndex = activeIndex + offset;
    if (newIndex >= 0 && newIndex < tabs.length) {
      setDirection(offset);
      setActiveTab(tabs[newIndex].id);
      onTabChange?.(tabs[newIndex].id);
      haptic.impact('light');
    }
  };

  const bind = useSwipeGesture({
    onSwipeLeft: () => handleSwipe(1),
    onSwipeRight: () => handleSwipe(-1),
    threshold: 50,
  });

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Tab Headers */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                onTabChange?.(tab.id);
                haptic.impact('light');
              }}
              className={cn(
                'relative px-4 py-3 whitespace-nowrap',
                'min-h-[44px]', // Touch-friendly
                'font-medium transition-colors',
                isActive
                  ? 'text-brand-primary-600 dark:text-brand-primary-400'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              )}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary-600 dark:bg-brand-primary-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div {...bind} className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ============================================================================
// SAFE AREA WRAPPER
// ============================================================================

export interface SafeAreaProps {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  className?: string;
}

export const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  top = true,
  bottom = true,
  left = true,
  right = true,
  className,
}) => {
  return (
    <div
      className={cn('w-full h-full', className)}
      style={{
        paddingTop: top ? 'env(safe-area-inset-top)' : undefined,
        paddingBottom: bottom ? 'env(safe-area-inset-bottom)' : undefined,
        paddingLeft: left ? 'env(safe-area-inset-left)' : undefined,
        paddingRight: right ? 'env(safe-area-inset-right)' : undefined,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// MOBILE-OPTIMIZED LAYOUT
// ============================================================================

export interface MobileLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  bottomNav?: React.ReactNode;
  showBottomNav?: boolean;
  className?: string;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  header,
  bottomNav,
  showBottomNav = true,
  className,
}) => {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {/* Header */}
      {header}

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 overflow-y-auto',
          header && 'pt-14', // Space for fixed header
          showBottomNav && 'pb-16' // Space for bottom nav
        )}
      >
        <SafeArea>{children}</SafeArea>
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && (bottomNav || <BottomNavBar />)}
    </div>
  );
};
