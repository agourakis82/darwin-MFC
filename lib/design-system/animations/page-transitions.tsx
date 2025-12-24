/**
 * PAGE TRANSITION SYSTEM
 * =======================
 *
 * Page transition system for Next.js App Router
 * Smooth animations between route changes
 *
 * Features:
 * - Route transition wrapper
 * - Multiple transition variants
 * - Template component for layout transitions
 * - Loading states
 * - Error boundaries with transitions
 *
 * @example
 * ```tsx
 * // In app/template.tsx
 * import { PageTransitionTemplate } from '@/lib/design-system/animations/page-transitions';
 *
 * export default function Template({ children }: { children: React.ReactNode }) {
 *   return <PageTransitionTemplate variant="fade">{children}</PageTransitionTemplate>;
 * }
 * ```
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/design-system/utils/cn';
import {
  fadeIn,
  fadeInUp,
  slideInRight,
  slideInLeft,
  scaleIn,
  pageTransition,
  pageFade,
  pageSlide,
  pageScale,
  easings,
  durations,
} from './presets';

// ============================================================================
// TYPES
// ============================================================================

export type PageTransitionVariant =
  | 'fade'
  | 'fadeUp'
  | 'slide'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'none';

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: PageTransitionVariant;
  duration?: number;
  className?: string;
}

// ============================================================================
// TRANSITION VARIANTS
// ============================================================================

const transitionVariants = {
  fade: pageFade,
  fadeUp: pageTransition,
  slide: pageSlide,
  slideLeft: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  slideRight: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  scale: pageScale,
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
};

// ============================================================================
// PAGE TRANSITION WRAPPER
// ============================================================================

/**
 * Wraps page content with transition animations
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  variant = 'fade',
  duration = durations.normal,
  className,
}) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={transitionVariants[variant]}
        transition={{ duration, ease: easings.apple }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================================
// TEMPLATE COMPONENT
// ============================================================================

/**
 * Template component for use in Next.js app/template.tsx
 * Automatically handles route transitions
 */
export const PageTransitionTemplate: React.FC<PageTransitionProps> = ({
  children,
  variant = 'fadeUp',
  duration = durations.normal,
  className,
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={transitionVariants[variant]}
      transition={{ duration, ease: easings.apple }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// LAYOUT TRANSITION
// ============================================================================

interface LayoutTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout transition wrapper
 * For use in app/layout.tsx to animate layout changes
 */
export const LayoutTransition: React.FC<LayoutTransitionProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: durations.fast }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// ROUTE CHANGE INDICATOR
// ============================================================================

/**
 * Loading bar that appears during route transitions
 */
export const RouteChangeIndicator: React.FC<{
  color?: string;
  height?: string;
}> = ({ color = 'bg-brand-primary-600', height = '3px' }) => {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className={cn('fixed top-0 left-0 right-0 z-50 origin-left', color)}
          style={{ height }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.5, ease: easings.easeOut }}
        />
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// VIEW TRANSITION
// ============================================================================

interface ViewTransitionProps {
  children: React.ReactNode;
  id: string;
  variant?: PageTransitionVariant;
  className?: string;
}

/**
 * Transition between different views on the same page
 */
export const ViewTransition: React.FC<ViewTransitionProps> = ({
  children,
  id,
  variant = 'fade',
  className,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={transitionVariants[variant]}
        transition={{ duration: durations.normal, ease: easings.apple }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================================
// TAB TRANSITION
// ============================================================================

interface TabTransitionProps {
  children: React.ReactNode;
  activeTab: string;
  direction?: 'left' | 'right';
  className?: string;
}

/**
 * Transition for tab panels
 */
export const TabTransition: React.FC<TabTransitionProps> = ({
  children,
  activeTab,
  direction = 'right',
  className,
}) => {
  const slideDirection = direction === 'right' ? 1 : -1;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ x: 50 * slideDirection, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50 * slideDirection, opacity: 0 }}
        transition={{ duration: durations.fast, ease: easings.apple }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================================
// STAGGER PAGE SECTIONS
// ============================================================================

interface StaggerPageSectionsProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * Stagger animation for page sections
 */
export const StaggerPageSections: React.FC<StaggerPageSectionsProps> = ({
  children,
  staggerDelay = 0.1,
  className,
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
          }}
          transition={{ duration: durations.normal, ease: easings.apple }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// ============================================================================
// LOADING PAGE TRANSITION
// ============================================================================

interface LoadingPageTransitionProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  className?: string;
}

/**
 * Page transition with loading state
 */
export const LoadingPageTransition: React.FC<LoadingPageTransitionProps> = ({
  isLoading,
  children,
  loadingComponent,
  className,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn('flex items-center justify-center min-h-screen', className)}
        >
          {loadingComponent || (
            <div className="text-lg text-neutral-600 dark:text-neutral-400">
              Loading...
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: durations.normal, ease: easings.apple }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook to detect route changes
 */
export function useRouteChange(callback: (pathname: string) => void) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (pathname && pathname !== prevPathname) {
      callback(pathname);
      setPrevPathname(pathname);
    }
  }, [pathname, prevPathname, callback]);
}

/**
 * Hook for page transition state
 */
export function usePageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPathname) {
      setIsTransitioning(true);
      setPrevPathname(pathname);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname]);

  return { isTransitioning, pathname, prevPathname };
}
