/**
 * SCROLL-TRIGGERED ANIMATIONS
 * =============================
 *
 * Animations triggered by scroll position using Intersection Observer
 * Parallax effects, reveal animations, scroll progress, and more
 *
 * Features:
 * - Scroll reveal (fade in on scroll)
 * - Parallax scrolling
 * - Scroll progress indicators
 * - Sticky scroll animations
 * - Pin/unpin on scroll
 * - Scroll-linked transformations
 * - Viewport detection
 *
 * @example
 * ```tsx
 * import { ScrollReveal, ParallaxBox, ScrollProgress } from '@/lib/design-system/animations/scroll';
 *
 * <ScrollReveal animation="fadeInUp">
 *   <h1>Animates when scrolled into view</h1>
 * </ScrollReveal>
 *
 * <ParallaxBox speed={0.5}>
 *   <img src="background.jpg" />
 * </ParallaxBox>
 *
 * <ScrollProgress />
 * ```
 */

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  slideInUp,
  easings,
  durations,
} from './presets';

// ============================================================================
// TYPES
// ============================================================================

export type RevealAnimation =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'slideInUp';

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  threshold?: number; // 0-1, how much of element should be visible
  triggerOnce?: boolean;
  className?: string;
}

export interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // 0-1, lower = slower
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export interface ScrollProgressProps {
  position?: 'top' | 'bottom';
  height?: string;
  color?: string;
  showPercentage?: boolean;
  className?: string;
}

// ============================================================================
// SCROLL REVEAL
// ============================================================================

const animationVariants = {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  slideInUp,
};

/**
 * Reveal element when scrolled into view
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = durations.normal,
  threshold = 0.1,
  triggerOnce = true,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
  });

  const variants = animationVariants[animation];

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: easings.apple,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger children when scrolled into view
 */
interface ScrollRevealListProps {
  children: React.ReactNode;
  staggerDelay?: number;
  animation?: RevealAnimation;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

export const ScrollRevealList: React.FC<ScrollRevealListProps> = ({
  children,
  staggerDelay = 0.1,
  animation = 'fadeInUp',
  threshold = 0.1,
  triggerOnce = true,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
  });

  const variants = animationVariants[animation];

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
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
        <motion.div variants={variants}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

// ============================================================================
// PARALLAX SCROLLING
// ============================================================================

/**
 * Parallax scrolling effect
 */
export const ParallaxBox: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const range = 100;
  const multiplier = direction === 'down' || direction === 'right' ? 1 : -1;

  const transformValue =
    direction === 'up' || direction === 'down'
      ? useTransform(scrollYProgress, [0, 1], [0, range * speed * multiplier])
      : useTransform(scrollYProgress, [0, 1], [0, range * speed * multiplier]);

  const smoothTransform = useSpring(transformValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={
          direction === 'up' || direction === 'down'
            ? { y: smoothTransform }
            : { x: smoothTransform }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * Parallax layers (multiple layers with different speeds)
 */
interface ParallaxLayersProps {
  layers: {
    content: React.ReactNode;
    speed: number;
    zIndex?: number;
  }[];
  className?: string;
}

export const ParallaxLayers: React.FC<ParallaxLayersProps> = ({
  layers,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={ref} className={cn('relative', className)}>
      {layers.map((layer, index) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [0, -100 * layer.speed]
        );
        const smoothY = useSpring(y, {
          stiffness: 100,
          damping: 30,
        });

        return (
          <motion.div
            key={index}
            style={{
              y: smoothY,
              zIndex: layer.zIndex ?? index,
            }}
            className="absolute inset-0"
          >
            {layer.content}
          </motion.div>
        );
      })}
    </div>
  );
};

// ============================================================================
// SCROLL PROGRESS
// ============================================================================

/**
 * Global scroll progress bar
 */
export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  position = 'top',
  height = '4px',
  color = 'bg-brand-primary-600',
  showPercentage = false,
  className,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const percentage = useTransform(scrollYProgress, (value) =>
    Math.round(value * 100)
  );

  const [percentageValue, setPercentageValue] = useState(0);

  useEffect(() => {
    const unsubscribe = percentage.on('change', (latest) => {
      setPercentageValue(latest);
    });
    return () => unsubscribe();
  }, [percentage]);

  return (
    <>
      <motion.div
        className={cn(
          'fixed left-0 right-0 z-50 origin-left',
          color,
          position === 'top' ? 'top-0' : 'bottom-0',
          className
        )}
        style={{ scaleX, height }}
      />
      {showPercentage && (
        <div
          className={cn(
            'fixed right-4 z-50 bg-white dark:bg-neutral-900 px-2 py-1 rounded shadow-lg text-xs font-medium',
            position === 'top' ? 'top-6' : 'bottom-6'
          )}
        >
          {percentageValue}%
        </div>
      )}
    </>
  );
};

/**
 * Section scroll progress (within a container)
 */
interface SectionProgressProps {
  children: React.ReactNode;
  onProgressChange?: (progress: number) => void;
  className?: string;
}

export const SectionProgress: React.FC<SectionProgressProps> = ({
  children,
  onProgressChange,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    if (onProgressChange) {
      const unsubscribe = scrollYProgress.on('change', onProgressChange);
      return () => unsubscribe();
    }
  }, [scrollYProgress, onProgressChange]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// ============================================================================
// SCROLL-LINKED ANIMATIONS
// ============================================================================

/**
 * Scale element based on scroll position
 */
interface ScrollScaleProps {
  children: React.ReactNode;
  scaleRange?: [number, number];
  className?: string;
}

export const ScrollScale: React.FC<ScrollScaleProps> = ({
  children,
  scaleRange = [0.8, 1],
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [
    scaleRange[0],
    scaleRange[1],
    scaleRange[0],
  ]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale }}>{children}</motion.div>
    </div>
  );
};

/**
 * Rotate element based on scroll position
 */
interface ScrollRotateProps {
  children: React.ReactNode;
  rotateRange?: [number, number];
  className?: string;
}

export const ScrollRotate: React.FC<ScrollRotateProps> = ({
  children,
  rotateRange = [0, 360],
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ rotate }}>{children}</motion.div>
    </div>
  );
};

/**
 * Fade element based on scroll position
 */
interface ScrollFadeProps {
  children: React.ReactNode;
  fadeIn?: boolean; // true = fade in, false = fade out
  className?: string;
}

export const ScrollFade: React.FC<ScrollFadeProps> = ({
  children,
  fadeIn = true,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    fadeIn ? [0, 1, 0] : [1, 0, 1]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity }}>{children}</motion.div>
    </div>
  );
};

// ============================================================================
// STICKY SCROLL
// ============================================================================

/**
 * Sticky element with opacity change
 */
interface StickyScrollProps {
  children: React.ReactNode;
  top?: string;
  fadeOnStick?: boolean;
  className?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  children,
  top = '0',
  fadeOnStick = false,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: [1] }
    );

    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '-1px';
    ref.current.appendChild(sentinel);

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn('sticky', className)}
      style={{ top }}
      animate={
        fadeOnStick && isSticky
          ? { opacity: 0.7 }
          : { opacity: 1 }
      }
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// VIEWPORT DETECTION
// ============================================================================

/**
 * Hook for detecting when element enters/exits viewport
 */
export function useViewportEnter(
  callback: (isInView: boolean) => void,
  options?: {
    threshold?: number;
    triggerOnce?: boolean;
  }
) {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting;

        if (options?.triggerOnce && hasTriggered.current) {
          return;
        }

        if (isInView) {
          hasTriggered.current = true;
        }

        callback(isInView);
      },
      {
        threshold: options?.threshold ?? 0.1,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback, options?.threshold, options?.triggerOnce]);

  return ref;
}

/**
 * Hook for tracking scroll direction
 */
export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setDirection('down');
      } else if (currentScrollY < prevScrollY.current) {
        setDirection('up');
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return direction;
}

/**
 * Hook for detecting when user has scrolled past threshold
 */
export function useScrollThreshold(threshold: number = 100) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return hasScrolled;
}

/**
 * Hide/show element on scroll direction
 */
interface HideOnScrollProps {
  children: React.ReactNode;
  hideOnDown?: boolean;
  className?: string;
}

export const HideOnScroll: React.FC<HideOnScrollProps> = ({
  children,
  hideOnDown = true,
  className,
}) => {
  const direction = useScrollDirection();
  const hasScrolled = useScrollThreshold(50);

  return (
    <motion.div
      className={className}
      animate={{
        y: hasScrolled && direction === (hideOnDown ? 'down' : 'up') ? -100 : 0,
        opacity: hasScrolled && direction === (hideOnDown ? 'down' : 'up') ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: easings.apple }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// SCROLL SNAP SECTIONS
// ============================================================================

/**
 * Scroll snap container
 */
interface ScrollSnapProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  proximity?: boolean;
  className?: string;
}

export const ScrollSnap: React.FC<ScrollSnapProps> = ({
  children,
  direction = 'vertical',
  proximity = false,
  className,
}) => {
  return (
    <div
      className={cn(className)}
      style={{
        scrollSnapType: `${direction === 'vertical' ? 'y' : 'x'} ${
          proximity ? 'proximity' : 'mandatory'
        }`,
        overflowY: direction === 'vertical' ? 'scroll' : 'hidden',
        overflowX: direction === 'horizontal' ? 'scroll' : 'hidden',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Scroll snap section
 */
interface ScrollSnapSectionProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export const ScrollSnapSection: React.FC<ScrollSnapSectionProps> = ({
  children,
  align = 'start',
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        scrollSnapAlign: align,
        scrollSnapStop: 'always',
      }}
    >
      {children}
    </div>
  );
};
