'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';

// TypeScript interfaces
export interface ContainerProps {
  children: ReactNode;
  maxWidth?: '5xl' | '6xl' | '7xl' | 'full';
  padding?: 'compact' | 'default' | 'spacious';
  variant?: 'default' | 'elevated' | 'card';
  className?: string;
  minHeight?: string;
}

// Tailwind class helpers
const getMaxWidthClasses = (maxWidth?: ContainerProps['maxWidth']): string => {
  switch (maxWidth) {
    case '5xl':
      return 'max-w-5xl';
    case '6xl':
      return 'max-w-6xl';
    case '7xl':
      return 'max-w-7xl';
    case 'full':
      return 'max-w-full';
    default:
      return 'max-w-7xl';
  }
};

const getPaddingClasses = (padding?: ContainerProps['padding']): string => {
  switch (padding) {
    case 'compact':
      return 'px-4 sm:px-4 md:px-6 lg:px-8 2xl:px-8';
    case 'spacious':
      return 'px-6 sm:px-6 md:px-8 lg:px-12 2xl:px-16';
    case 'default':
    default:
      return 'px-4 sm:px-4 md:px-6 lg:px-8 2xl:px-12';
  }
};

const getVariantClasses = (variant?: ContainerProps['variant']): string => {
  const base = 'bg-paper-white dark:bg-carbon-950';
  switch (variant) {
    case 'elevated':
      return clsx(base, 'shadow-lg border border-carbon-200 dark:border-carbon-700');
    case 'card':
      return clsx(base, 'rounded-lg shadow-md border border-carbon-200 dark:border-carbon-700');
    case 'default':
    default:
      return base;
  }
};

const getMinHeightClasses = (minHeight?: string): string => {
  if (!minHeight) return '';
  return minHeight === 'screen' ? 'min-h-screen' : '';
};

// Base Container component
const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth,
  padding = 'default',
  variant = 'default',
  className,
  minHeight,
}) => {
  const classes = clsx(
    'mx-auto w-full',
    getMaxWidthClasses(maxWidth),
    getPaddingClasses(padding),
    getVariantClasses(variant),
    getMinHeightClasses(minHeight),
    className
  );

  return <div className={classes}>{children}</div>;
};

/**
 * PageContainer - Standard page layout with max-w-7xl
 * Use for main page content that needs consistent width and padding
 */
export const PageContainer: React.FC<ContainerProps> = (props) => (
  <Container maxWidth="7xl" padding="default" {...props} />
);

/**
 * ContentContainer - Narrow content layout with max-w-5xl
 * Use for articles, text-heavy content, or single-column layouts
 */
export const ContentContainer: React.FC<ContainerProps> = (props) => (
  <Container maxWidth="5xl" padding="default" {...props} />
);

/**
 * SectionContainer - Full-width section with internal constraints
 * Use for hero sections, full-width backgrounds with contained content inside
 */
export const SectionContainer: React.FC<ContainerProps> = (props) => (
  <Container maxWidth="full" padding="default" {...props} />
);

export default Container;
