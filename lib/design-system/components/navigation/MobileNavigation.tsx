/**
 * MOBILE NAVIGATION COMPONENT
 * ============================
 *
 * Bottom navigation bar for mobile devices
 * Features: Active indicators, smooth animations, haptic feedback, safe area support
 */

'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Home,
  Stethoscope,
  Pill,
  FileText,
  User,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string | number;
  color?: string;
}

export interface MobileNavigationProps {
  /**
   * Navigation items to display
   */
  items?: NavItem[];

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Callback when a nav item is clicked
   */
  onItemClick?: (item: NavItem) => void;
}

const defaultItems: NavItem[] = [
  { icon: Home, label: 'Início', href: '/' },
  { icon: Stethoscope, label: 'Doenças', href: '/doencas' },
  { icon: Pill, label: 'Meds', href: '/medicamentos' },
  { icon: FileText, label: 'Protocolos', href: '/protocolos' },
  { icon: User, label: 'Perfil', href: '/profile' },
];

/**
 * MobileNavigation - Bottom navigation bar for mobile
 *
 * @example
 * ```tsx
 * <MobileNavigation
 *   items={[
 *     { icon: Home, label: 'Home', href: '/' },
 *     { icon: Search, label: 'Search', href: '/search' },
 *   ]}
 * />
 * ```
 */
export function MobileNavigation({
  items = defaultItems,
  className,
  onItemClick,
}: MobileNavigationProps) {
  const pathname = usePathname();

  const handleItemClick = (item: NavItem) => {
    // Trigger haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    onItemClick?.(item);
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        // Fixed positioning
        'fixed bottom-0 left-0 right-0 z-50',
        // Glass morphism
        'bg-white/80 dark:bg-neutral-900/80',
        'backdrop-blur-md',
        // Border
        'border-t border-neutral-200/50 dark:border-neutral-800/50',
        // Shadow
        'shadow-lg',
        // Safe area support
        'pb-[env(safe-area-inset-bottom,0px)]',
        // Only show on mobile
        'md:hidden',
        className
      )}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item) => {
          const isActive = pathname ? (pathname === item.href || pathname.startsWith(item.href + '/')) : false;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full group"
              onClick={() => handleItemClick(item)}
            >
              {/* Icon container */}
              <motion.div
                className="relative flex flex-col items-center gap-1"
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {/* Icon */}
                <motion.div
                  className={cn(
                    'w-6 h-6 flex items-center justify-center',
                    isActive
                      ? item.color || 'text-brand-primary-600 dark:text-brand-primary-400'
                      : 'text-neutral-500 dark:text-neutral-400'
                  )}
                  animate={{
                    rotate: isActive ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="w-full h-full" />
                </motion.div>

                {/* Label */}
                <motion.span
                  className={cn(
                    'text-xs font-medium transition-colors',
                    isActive
                      ? item.color || 'text-brand-primary-600 dark:text-brand-primary-400'
                      : 'text-neutral-500 dark:text-neutral-400'
                  )}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Badge */}
                {item.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-2 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold text-white bg-red-600 rounded-full"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className={cn(
                    'absolute bottom-0 left-1/2 -translate-x-1/2',
                    'w-12 h-1 rounded-full',
                    item.color?.replace('text-', 'bg-') || 'bg-brand-primary-600 dark:bg-brand-primary-400'
                  )}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 300,
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
