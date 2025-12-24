/**
 * APP SHELL ARCHITECTURE
 * =======================
 *
 * Progressive Web App shell for instant loading
 * Critical rendering path optimization
 *
 * Features:
 * - App shell layout structure
 * - Loading skeletons
 * - Critical CSS inlining
 * - Route-based code splitting helpers
 * - Progressive enhancement
 * - Instant loading experience
 */

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import { Loader2 } from 'lucide-react';

// ============================================================================
// APP SHELL LAYOUT
// ============================================================================

export interface AppShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  bottomNav?: React.ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
  showBottomNav?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  header,
  sidebar,
  bottomNav,
  showHeader = true,
  showSidebar = false,
  showBottomNav = true,
  isLoading = false,
  className,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={cn('app-shell min-h-screen flex flex-col', className)}>
      {/* Header */}
      {showHeader && (
        <header className="app-shell-header sticky top-0 z-40">
          {isClient ? header : <HeaderSkeleton />}
        </header>
      )}

      {/* Main Content Area */}
      <div className="app-shell-main flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <aside className="app-shell-sidebar hidden lg:block w-64 border-r border-neutral-200 dark:border-neutral-800">
            {isClient ? sidebar : <SidebarSkeleton />}
          </aside>
        )}

        {/* Content */}
        <main
          className={cn(
            'app-shell-content flex-1 overflow-y-auto',
            showBottomNav && 'pb-16', // Space for bottom nav
            showHeader && 'pt-14' // Space for header
          )}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ContentSkeleton />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <nav className="app-shell-bottom-nav fixed bottom-0 left-0 right-0 z-40 lg:hidden">
          {isClient ? bottomNav : <BottomNavSkeleton />}
        </nav>
      )}
    </div>
  );
};

// ============================================================================
// LOADING SKELETONS
// ============================================================================

export const HeaderSkeleton: React.FC = () => {
  return (
    <div className="h-14 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 animate-pulse">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
          <div className="w-32 h-6 bg-neutral-200 dark:bg-neutral-700 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
          <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const SidebarSkeleton: React.FC = () => {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded" />
        ))}
      </div>
    </div>
  );
};

export const BottomNavSkeleton: React.FC = () => {
  return (
    <div className="h-16 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 animate-pulse">
      <div className="flex items-center justify-around h-full px-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-700 rounded" />
            <div className="w-12 h-3 bg-neutral-200 dark:bg-neutral-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ContentSkeleton: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Title */}
      <div className="space-y-2">
        <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
      </div>

      {/* Content Cards */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-3"
        >
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-4/6" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 animate-pulse',
        className
      )}
    >
      <div className="space-y-3">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 animate-pulse">
      {/* Header */}
      <div className="bg-neutral-100 dark:bg-neutral-800 p-4">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// ROUTE LOADING WRAPPER
// ============================================================================

export interface RouteLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}

export const RouteLoader: React.FC<RouteLoaderProps> = ({
  children,
  fallback = <ContentSkeleton />,
  delay = 200,
}) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return <Suspense fallback={showFallback ? fallback : null}>{children}</Suspense>;
};

// ============================================================================
// PROGRESSIVE LOADING CONTAINER
// ============================================================================

export interface ProgressiveLoadProps {
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  threshold?: number;
  className?: string;
}

export const ProgressiveLoad: React.FC<ProgressiveLoadProps> = ({
  children,
  skeleton = <CardSkeleton />,
  threshold = 0.1,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, hasLoaded]);

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait">
        {isVisible ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {skeleton}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// LOADING SPINNER
// ============================================================================

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

const spinnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  fullScreen = false,
  className,
}) => {
  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <Loader2
        className={cn(
          spinnerSizes[size],
          'animate-spin text-brand-primary-600 dark:text-brand-primary-400'
        )}
      />
      {message && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-neutral-900 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

// ============================================================================
// PAGE TRANSITION WRAPPER
// ============================================================================

export interface PageTransitionProps {
  children: React.ReactNode;
  pathname: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, pathname }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================================
// APP SHELL PRELOADER (for initial HTML)
// ============================================================================

export const AppShellPreloader: React.FC = () => {
  return (
    <div className="app-shell">
      {/* Header Skeleton */}
      <header className="app-shell-header">
        <HeaderSkeleton />
      </header>

      {/* Main Content */}
      <div className="app-shell-main">
        {/* Sidebar Skeleton (hidden on mobile) */}
        <aside className="app-shell-sidebar hidden lg:block">
          <SidebarSkeleton />
        </aside>

        {/* Content Skeleton */}
        <main className="app-shell-content pb-16 pt-14">
          <ContentSkeleton />
        </main>
      </div>

      {/* Bottom Nav Skeleton */}
      <nav className="app-shell-bottom-nav lg:hidden">
        <BottomNavSkeleton />
      </nav>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  AppShell,
  HeaderSkeleton,
  SidebarSkeleton,
  BottomNavSkeleton,
  ContentSkeleton,
  CardSkeleton,
  TableSkeleton,
  RouteLoader,
  ProgressiveLoad,
  LoadingSpinner,
  PageTransition,
  AppShellPreloader,
};
