'use client';

import { useMemo } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { ChevronRight, Home } from 'lucide-react';
import clsx from 'clsx';

export interface Breadcrumb {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items?: Breadcrumb[];
  className?: string;
  showHome?: boolean;
}

/**
 * Breadcrumbs Component
 *
 * Displays navigation breadcrumbs for better wayfinding.
 * Can be auto-generated from pathname or accept custom items.
 *
 * Responsive:
 * - Hidden on mobile (< md)
 * - Visible on md+ screens
 * - Max 5 items (hides intermediate items on small screens)
 *
 * Usage:
 * <Breadcrumbs /> - Auto-generate from pathname
 * <Breadcrumbs items={[...]} /> - Custom breadcrumbs
 * <Breadcrumbs showHome={false} /> - Hide home link
 */
export default function Breadcrumbs({
  items,
  className,
  showHome = true
}: BreadcrumbsProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbs = useMemo(() => {
    if (items) {
      return items;
    }

    // Parse pathname to generate breadcrumbs
    const segments = pathname.split('/').filter(Boolean);
    const generated: Breadcrumb[] = [];

    // Add home link if enabled
    if (showHome) {
      generated.push({
        label: 'Home',
        href: '/',
        current: segments.length === 0
      });
    }

    // Add breadcrumb for each segment
    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1;
      const href = '/' + segments.slice(0, index + 1).join('/');

      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      generated.push({
        label,
        href: !isLast ? href : undefined,
        current: isLast
      });
    });

    return generated;
  }, [pathname, items, showHome]);

  // Truncate long breadcrumb trails (show first + last 2)
  const displayBreadcrumbs = useMemo(() => {
    if (breadcrumbs.length <= 4) {
      return breadcrumbs;
    }
    return [
      breadcrumbs[0],
      {
        label: '...',
        current: false
      },
      ...breadcrumbs.slice(-2)
    ];
  }, [breadcrumbs]);

  return (
    <nav
      className={clsx(
        // Responsive visibility
        'hidden md:block',
        // Styling
        'bg-paper-white dark:bg-carbon-950',
        'px-4 md:px-6 lg:px-8',
        'py-2.5 md:py-3',
        'border-b border-carbon-200 dark:border-carbon-700',
        // Custom
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1 md:space-x-2 text-sm">
        {displayBreadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            {/* Separator */}
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 md:mx-2 text-carbon-400 dark:text-carbon-600 flex-shrink-0" aria-hidden="true" />
            )}

            {/* Breadcrumb item */}
            {breadcrumb.href && !breadcrumb.current ? (
              <Link
                href={breadcrumb.href}
                className={clsx(
                  'text-carbon-600 dark:text-carbon-400',
                  'hover:text-carbon-900 dark:hover:text-carbon-200',
                  'hover:underline',
                  'transition-colors duration-200',
                  'font-medium'
                )}
              >
                {breadcrumb.label}
              </Link>
            ) : (
              <span
                className={clsx(
                  breadcrumb.current
                    ? 'text-carbon-900 dark:text-carbon-50 font-semibold'
                    : 'text-carbon-600 dark:text-carbon-400'
                )}
                aria-current={breadcrumb.current ? 'page' : undefined}
              >
                {breadcrumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Breadcrumbs with custom styling for specific sections
 */
export function BreadcrumbsWithIcon({
  items,
  icon: Icon,
  sectionName,
  className
}: BreadcrumbsProps & {
  icon?: React.ReactNode;
  sectionName?: string;
}) {
  return (
    <nav
      className={clsx(
        'hidden md:flex md:items-center md:gap-2 md:px-4 lg:px-6',
        'py-2.5 md:py-3',
        'bg-paper-white dark:bg-carbon-950',
        'border-b border-carbon-200 dark:border-carbon-700',
        'text-sm',
        className
      )}
      aria-label="Breadcrumb"
    >
      {/* Icon + Section name */}
      {Icon && sectionName && (
        <>
          <div className="flex items-center gap-2">
            {Icon}
            <span className="font-semibold text-carbon-900 dark:text-carbon-50">{sectionName}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-carbon-400 dark:text-carbon-600" aria-hidden="true" />
        </>
      )}

      {/* Breadcrumb items */}
      <ol className="flex items-center space-x-2">
        {items?.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-carbon-400 dark:text-carbon-600" aria-hidden="true" />
            )}
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="text-carbon-600 dark:text-carbon-400 hover:text-carbon-900 dark:hover:text-carbon-200 hover:underline transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={item.current ? 'text-carbon-900 dark:text-carbon-50 font-semibold' : 'text-carbon-600 dark:text-carbon-400'}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
