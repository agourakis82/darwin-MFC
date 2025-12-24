/**
 * SAFE AREA WRAPPER COMPONENT
 * ============================
 *
 * Wrapper component that respects device safe areas
 * Handles notches, home indicators, and rounded corners on modern mobile devices
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';

const safeAreaVariants = cva('w-full', {
  variants: {
    // Which safe areas to respect
    inset: {
      all: 'pt-[env(safe-area-inset-top,0px)] pr-[env(safe-area-inset-right,0px)] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)]',
      top: 'pt-[env(safe-area-inset-top,0px)]',
      bottom: 'pb-[env(safe-area-inset-bottom,0px)]',
      horizontal: 'pr-[env(safe-area-inset-right,0px)] pl-[env(safe-area-inset-left,0px)]',
      vertical: 'pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]',
      none: '',
    },

    // Additional padding beyond safe areas
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    inset: 'all',
    padding: 'none',
  },
});

export interface SafeAreaWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof safeAreaVariants> {
  /**
   * Render as a different element
   */
  as?: React.ElementType;

  /**
   * Minimum padding (used as fallback if safe area not supported)
   */
  minPadding?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

/**
 * SafeAreaWrapper - Respects device safe areas (notches, home indicators)
 *
 * @example
 * ```tsx
 * <SafeAreaWrapper inset="top">
 *   <Header />
 * </SafeAreaWrapper>
 * ```
 *
 * @example Bottom navigation with safe area
 * ```tsx
 * <SafeAreaWrapper inset="bottom" as="nav">
 *   <MobileNavigation />
 * </SafeAreaWrapper>
 * ```
 *
 * @example With minimum fallback padding
 * ```tsx
 * <SafeAreaWrapper inset="all" minPadding={{ top: '1rem', bottom: '1rem' }}>
 *   <Content />
 * </SafeAreaWrapper>
 * ```
 */
export const SafeAreaWrapper = React.forwardRef<HTMLDivElement, SafeAreaWrapperProps>(
  (
    {
      className,
      inset,
      padding,
      minPadding,
      as: Component = 'div',
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Combine user style with min padding fallbacks
    const combinedStyle = React.useMemo(() => {
      if (!minPadding) return style;

      const fallbackStyle: React.CSSProperties = {};

      if (inset === 'all' || inset === 'top' || inset === 'vertical') {
        if (minPadding.top) {
          fallbackStyle.paddingTop = `max(${minPadding.top}, env(safe-area-inset-top, 0px))`;
        }
      }

      if (inset === 'all' || inset === 'bottom' || inset === 'vertical') {
        if (minPadding.bottom) {
          fallbackStyle.paddingBottom = `max(${minPadding.bottom}, env(safe-area-inset-bottom, 0px))`;
        }
      }

      if (inset === 'all' || inset === 'horizontal') {
        if (minPadding.left) {
          fallbackStyle.paddingLeft = `max(${minPadding.left}, env(safe-area-inset-left, 0px))`;
        }
        if (minPadding.right) {
          fallbackStyle.paddingRight = `max(${minPadding.right}, env(safe-area-inset-right, 0px))`;
        }
      }

      return { ...style, ...fallbackStyle };
    }, [style, minPadding, inset]);

    return (
      <Component
        ref={ref}
        className={cn(safeAreaVariants({ inset, padding }), className)}
        style={combinedStyle}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

SafeAreaWrapper.displayName = 'SafeAreaWrapper';

/**
 * Hook to detect if safe area insets are supported
 */
export function useSafeArea() {
  const [hasSafeArea, setHasSafeArea] = React.useState(false);

  React.useEffect(() => {
    // Check if safe-area-inset is supported
    const testElement = document.createElement('div');
    testElement.style.paddingTop = 'env(safe-area-inset-top, 0px)';
    document.body.appendChild(testElement);

    const hasSupport = testElement.style.paddingTop !== '0px';
    setHasSafeArea(hasSupport);

    document.body.removeChild(testElement);
  }, []);

  return hasSafeArea;
}

/**
 * Hook to get safe area inset values
 */
export function useSafeAreaInsets() {
  const [insets, setInsets] = React.useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  React.useEffect(() => {
    const updateInsets = () => {
      const computedStyle = getComputedStyle(document.documentElement);

      setInsets({
        top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top, 0px)')) || 0,
        right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right, 0px)')) || 0,
        bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom, 0px)')) || 0,
        left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left, 0px)')) || 0,
      });
    };

    updateInsets();

    // Update on resize (orientation change)
    window.addEventListener('resize', updateInsets);
    return () => window.removeEventListener('resize', updateInsets);
  }, []);

  return insets;
}
