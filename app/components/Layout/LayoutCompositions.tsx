'use client';

import React, { ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

/* ============================================================================
   Layout Composition Components for Darwin-MFC
   Reusable layout patterns for consistent medical education UI
   ============================================================================ */

// Types
type Variant = 'default' | 'compact' | 'spacious';
type Spacing = 'sm' | 'md' | 'lg' | 'xl';

interface Breadcrumb {
  label: string;
  href?: string;
}

// Variant utilities
const getVariantClasses = (variant: Variant = 'default'): string => {
  switch (variant) {
    case 'compact':
      return 'py-2 px-4';
    case 'spacious':
      return 'py-8 px-6';
    case 'default':
    default:
      return 'py-4 px-4 md:px-6';
  }
};

const getSpacingClasses = (spacing: Spacing = 'md'): string => {
  switch (spacing) {
    case 'sm':
      return 'gap-2 space-y-2';
    case 'md':
      return 'gap-4 space-y-4';
    case 'lg':
      return 'gap-6 space-y-6';
    case 'xl':
      return 'gap-8 space-y-8';
    default:
      return 'gap-4 space-y-4';
  }
};

/* ============================================================================
   1. PageHeader - Header with breadcrumbs, title, and actions
   ============================================================================ */

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  variant?: Variant;
  className?: string;
  subtitle?: string;
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  ({ title, breadcrumbs, actions, variant = 'default', className, subtitle }, ref) => {
    const variantClasses = getVariantClasses(variant);
    const headerClasses = clsx(
      'flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-carbon-200 dark:border-carbon-700',
      variantClasses,
      className
    );

    return (
      <header ref={ref} className={headerClasses}>
        <div className="flex flex-col gap-2 flex-1">
          {/* Breadcrumbs - Hidden on mobile */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="hidden md:block">
              <ol className="flex items-center space-x-2 text-sm text-carbon-600 dark:text-carbon-400">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    {crumb.href ? (
                      <a
                        href={crumb.href}
                        className="hover:text-carbon-900 dark:hover:text-carbon-200 transition-colors"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-carbon-700 dark:text-carbon-300 font-medium">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-carbon-900 dark:text-carbon-50">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg text-carbon-600 dark:text-carbon-400 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions - Right side buttons/controls */}
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';

/* ============================================================================
   2. ContentGrid - Responsive grid for cards and content blocks
   ============================================================================ */

interface ContentGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: Spacing;
  variant?: Variant;
  className?: string;
}

export const ContentGrid = forwardRef<HTMLDivElement, ContentGridProps>(
  ({ children, columns = 3, gap = 'md', variant = 'default', className }, ref) => {
    // Responsive column mapping
    const columnClasses = {
      1: 'grid-cols-1',
      2: 'sm:grid-cols-1 lg:grid-cols-2',
      3: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    const gridClasses = clsx(
      'grid w-full',
      columnClasses[columns] || columnClasses[3],
      gapClasses[gap] || gapClasses['md'],
      className
    );

    return (
      <div ref={ref} className={gridClasses}>
        {children}
      </div>
    );
  }
);

ContentGrid.displayName = 'ContentGrid';

/* ============================================================================
   3. SplitLayout - Responsive two-column layout (sidebar + main)
   ============================================================================ */

interface SplitLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  sidebarWidth?: 'narrow' | 'normal' | 'wide';
  gap?: Spacing;
  variant?: Variant;
  className?: string;
}

export const SplitLayout = forwardRef<HTMLDivElement, SplitLayoutProps>(
  ({ sidebar, main, sidebarWidth = 'normal', gap = 'md', variant = 'default', className }, ref) => {
    // Sidebar width mapping
    const sidebarWidthClasses = {
      narrow: 'w-full lg:w-48',
      normal: 'w-full lg:w-64',
      wide: 'w-full lg:w-80',
    };

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    const layoutClasses = clsx(
      'flex flex-col lg:flex-row',
      gapClasses[gap] || gapClasses['md'],
      className
    );

    return (
      <div ref={ref} className={layoutClasses}>
        {/* Sidebar */}
        <aside
          className={clsx(
            'flex-shrink-0',
            sidebarWidthClasses[sidebarWidth] || sidebarWidthClasses['normal']
          )}
          role="complementary"
          aria-label="Sidebar"
        >
          {sidebar}
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {main}
        </main>
      </div>
    );
  }
);

SplitLayout.displayName = 'SplitLayout';

/* ============================================================================
   4. StackLayout - Vertical stack with consistent spacing
   ============================================================================ */

interface StackLayoutProps {
  children: ReactNode;
  spacing?: Spacing;
  variant?: Variant;
  className?: string;
  divider?: boolean;
}

export const StackLayout = forwardRef<HTMLDivElement, StackLayoutProps>(
  ({ children, spacing = 'md', variant = 'default', className, divider = false }, ref) => {
    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    const stackClasses = clsx(
      'flex flex-col',
      gapClasses[spacing] || gapClasses['md'],
      className
    );

    // If divider is true, add separator lines between children
    if (divider) {
      const childArray = React.Children.toArray(children);
      return (
        <div ref={ref} className={stackClasses}>
          {childArray.map((child, index) => (
            <div key={index} className="flex flex-col gap-4">
              {child}
              {index < childArray.length - 1 && (
                <div className="border-t border-carbon-200 dark:border-carbon-700" />
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} className={stackClasses}>
        {children}
      </div>
    );
  }
);

StackLayout.displayName = 'StackLayout';

/* ============================================================================
   5. TwoColumnLayout - Specialized two-column layout for content + sidebar
   ============================================================================ */

interface TwoColumnLayoutProps {
  content: ReactNode;
  sidebar: ReactNode;
  contentWidth?: 'normal' | 'wide';
  gap?: Spacing;
  className?: string;
}

export const TwoColumnLayout = forwardRef<HTMLDivElement, TwoColumnLayoutProps>(
  ({ content, sidebar, contentWidth = 'normal', gap = 'md', className }, ref) => {
    const contentWidthClasses = {
      normal: 'lg:w-3/4',
      wide: 'lg:w-4/5',
    };

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'flex flex-col lg:flex-row',
          gapClasses[gap] || gapClasses['md'],
          className
        )}
      >
        {/* Main Content */}
        <main className={clsx('w-full', contentWidthClasses[contentWidth])}>
          {content}
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 lg:flex-shrink-0" role="complementary">
          {sidebar}
        </aside>
      </div>
    );
  }
);

TwoColumnLayout.displayName = 'TwoColumnLayout';

/* ============================================================================
   6. CenterLayout - Centered layout for hero sections, modals
   ============================================================================ */

interface CenterLayoutProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CenterLayout = forwardRef<HTMLDivElement, CenterLayoutProps>(
  ({ children, maxWidth = 'md', className }, ref) => {
    const maxWidthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'mx-auto px-4',
          maxWidthClasses[maxWidth] || maxWidthClasses['md'],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

CenterLayout.displayName = 'CenterLayout';

export type { Breadcrumb, Variant, Spacing };
