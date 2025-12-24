/**
 * TRANSITION WRAPPER COMPONENTS
 * ==============================
 *
 * Reusable transition wrappers for smooth enter/exit animations
 * Modal transitions, route transitions, conditional rendering, and more
 *
 * Features:
 * - FadeTransition (simple opacity)
 * - SlideTransition (slide from any direction)
 * - ScaleTransition (zoom in/out)
 * - CollapseTransition (height animation)
 * - PresenceTransition (AnimatePresence wrapper)
 * - RouteTransition (page transitions)
 * - ModalTransition (modal enter/exit)
 * - DrawerTransition (slide-in drawer)
 * - TooltipTransition (popover transitions)
 *
 * @example
 * ```tsx
 * import { FadeTransition, SlideTransition, PresenceTransition } from '@/lib/design-system/animations/transitions';
 *
 * <FadeTransition show={isVisible}>
 *   <div>Fades in/out</div>
 * </FadeTransition>
 *
 * <SlideTransition show={isOpen} direction="right">
 *   <div>Slides from right</div>
 * </SlideTransition>
 *
 * <PresenceTransition>
 *   {isVisible && <Component />}
 * </PresenceTransition>
 * ```
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  slideInUp,
  slideInDown,
  slideInLeft,
  slideInRight,
  easings,
  durations,
  springs,
} from './presets';

// ============================================================================
// TYPES
// ============================================================================

interface BaseTransitionProps {
  show: boolean;
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  onEnter?: () => void;
  onExit?: () => void;
}

type SlideDirection = 'up' | 'down' | 'left' | 'right';

// ============================================================================
// FADE TRANSITION
// ============================================================================

interface FadeTransitionProps extends BaseTransitionProps {
  fadeFrom?: number; // Starting opacity (default: 0)
  fadeTo?: number; // Ending opacity (default: 1)
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  show,
  children,
  duration = durations.normal,
  delay = 0,
  fadeFrom = 0,
  fadeTo = 1,
  className,
  onEnter,
  onExit,
}) => {
  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <motion.div
          initial={{ opacity: fadeFrom }}
          animate={{ opacity: fadeTo }}
          exit={{ opacity: fadeFrom }}
          transition={{ duration, delay, ease: easings.smooth }}
          onAnimationComplete={onEnter}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// SLIDE TRANSITION
// ============================================================================

interface SlideTransitionProps extends BaseTransitionProps {
  direction?: SlideDirection;
  distance?: number; // Slide distance in pixels
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  show,
  children,
  direction = 'up',
  distance = 20,
  duration = durations.normal,
  delay = 0,
  className,
  onEnter,
  onExit,
}) => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const initial = { opacity: 0, ...directionMap[direction] };
  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <motion.div
          initial={initial}
          animate={animate}
          exit={initial}
          transition={{ duration, delay, ease: easings.apple }}
          onAnimationComplete={onEnter}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// SCALE TRANSITION
// ============================================================================

interface ScaleTransitionProps extends BaseTransitionProps {
  scaleFrom?: number;
  scaleTo?: number;
  transformOrigin?: string;
}

export const ScaleTransition: React.FC<ScaleTransitionProps> = ({
  show,
  children,
  scaleFrom = 0.8,
  scaleTo = 1,
  transformOrigin = 'center',
  duration = durations.normal,
  delay = 0,
  className,
  onEnter,
  onExit,
}) => {
  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: scaleFrom }}
          animate={{ opacity: 1, scale: scaleTo }}
          exit={{ opacity: 0, scale: scaleFrom }}
          transition={{ duration, delay, ease: easings.apple }}
          onAnimationComplete={onEnter}
          style={{ transformOrigin }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// COLLAPSE TRANSITION
// ============================================================================

interface CollapseTransitionProps extends BaseTransitionProps {
  axis?: 'height' | 'width';
  collapsedSize?: number;
}

export const CollapseTransition: React.FC<CollapseTransitionProps> = ({
  show,
  children,
  axis = 'height',
  collapsedSize = 0,
  duration = durations.normal,
  delay = 0,
  className,
  onEnter,
  onExit,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (ref.current) {
      const dimension = axis === 'height' ? 'scrollHeight' : 'scrollWidth';
      setSize(ref.current[dimension]);
    }
  }, [axis, children]);

  return (
    <AnimatePresence initial={false} onExitComplete={onExit}>
      {show && (
        <motion.div
          ref={ref}
          initial={
            axis === 'height'
              ? { height: collapsedSize, opacity: 0 }
              : { width: collapsedSize, opacity: 0 }
          }
          animate={
            axis === 'height'
              ? { height: size, opacity: 1 }
              : { width: size, opacity: 1 }
          }
          exit={
            axis === 'height'
              ? { height: collapsedSize, opacity: 0 }
              : { width: collapsedSize, opacity: 0 }
          }
          transition={{ duration, delay, ease: easings.apple }}
          onAnimationComplete={onEnter}
          style={{ overflow: 'hidden' }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// PRESENCE TRANSITION
// ============================================================================

interface PresenceTransitionProps {
  children: React.ReactNode;
  mode?: 'wait' | 'sync' | 'popLayout';
  initial?: boolean;
  onExitComplete?: () => void;
}

/**
 * Wrapper around AnimatePresence for conditional rendering
 */
export const PresenceTransition: React.FC<PresenceTransitionProps> = ({
  children,
  mode = 'wait',
  initial = true,
  onExitComplete,
}) => {
  return (
    <AnimatePresence mode={mode} initial={initial} onExitComplete={onExitComplete}>
      {children}
    </AnimatePresence>
  );
};

// ============================================================================
// MODAL TRANSITION
// ============================================================================

interface ModalTransitionProps extends BaseTransitionProps {
  backdrop?: boolean;
  backdropBlur?: boolean;
  closeOnBackdropClick?: boolean;
  onBackdropClick?: () => void;
}

export const ModalTransition: React.FC<ModalTransitionProps> = ({
  show,
  children,
  duration = durations.normal,
  backdrop = true,
  backdropBlur = true,
  closeOnBackdropClick = true,
  onBackdropClick,
  className,
  onEnter,
  onExit,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (closeOnBackdropClick && onBackdropClick) {
        onBackdropClick();
      }
    }
  };

  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <>
          {backdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration * 0.7 }}
              onClick={handleBackdropClick}
              className={cn(
                'fixed inset-0 z-40 bg-black/50',
                backdropBlur && 'backdrop-blur-sm'
              )}
            />
          )}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration, ease: easings.apple }}
              onAnimationComplete={onEnter}
              className={className}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// DRAWER TRANSITION
// ============================================================================

interface DrawerTransitionProps extends BaseTransitionProps {
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string; // Width or height depending on position
  backdrop?: boolean;
  closeOnBackdropClick?: boolean;
  onBackdropClick?: () => void;
}

export const DrawerTransition: React.FC<DrawerTransitionProps> = ({
  show,
  children,
  position = 'right',
  size = '320px',
  duration = durations.normal,
  backdrop = true,
  closeOnBackdropClick = true,
  onBackdropClick,
  className,
  onEnter,
  onExit,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick && onBackdropClick) {
      onBackdropClick();
    }
  };

  const positionClasses = {
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
  };

  const sizeStyles = {
    left: { width: size },
    right: { width: size },
    top: { height: size },
    bottom: { height: size },
  };

  const slideVariants = {
    left: { x: '-100%' },
    right: { x: '100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' },
  };

  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <>
          {backdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration * 0.7 }}
              onClick={handleBackdropClick}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
          )}
          <motion.div
            initial={{ ...slideVariants[position], opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ ...slideVariants[position], opacity: 0 }}
            transition={{ duration, ease: easings.apple }}
            onAnimationComplete={onEnter}
            className={cn(
              'fixed z-50 bg-white dark:bg-neutral-900',
              positionClasses[position],
              className
            )}
            style={sizeStyles[position]}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// POPOVER TRANSITION
// ============================================================================

interface PopoverTransitionProps extends BaseTransitionProps {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
}

export const PopoverTransition: React.FC<PopoverTransitionProps> = ({
  show,
  children,
  placement = 'bottom',
  offset = 8,
  duration = durations.fast,
  className,
  onEnter,
  onExit,
}) => {
  const offsetMap = {
    top: { y: offset },
    bottom: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
  };

  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, ...offsetMap[placement] }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, ...offsetMap[placement] }}
          transition={{ duration, ease: easings.apple }}
          onAnimationComplete={onEnter}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// NOTIFICATION TRANSITION
// ============================================================================

interface NotificationTransitionProps extends BaseTransitionProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const NotificationTransition: React.FC<NotificationTransitionProps> = ({
  show,
  children,
  position = 'top-right',
  duration = durations.normal,
  className,
  onEnter,
  onExit,
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const slideDirection = position.includes('top') ? { y: -100 } : { y: 100 };

  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <motion.div
          initial={{ opacity: 0, ...slideDirection, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, ...slideDirection, scale: 0.95 }}
          transition={{ duration, ...springs.bouncy }}
          onAnimationComplete={onEnter}
          className={cn('fixed z-50', positionClasses[position], className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// ROUTE TRANSITION
// ============================================================================

interface RouteTransitionProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slide' | 'scale' | 'slideUp';
  className?: string;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  variant = 'fade',
  className,
}) => {
  const variants: Record<string, Variants> = {
    fade: fadeIn,
    slide: slideInRight,
    scale: scaleIn,
    slideUp: slideInUp,
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
      transition={{ duration: durations.normal, ease: easings.apple }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// ACCORDION TRANSITION
// ============================================================================

interface AccordionTransitionProps {
  show: boolean;
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

export const AccordionTransition: React.FC<AccordionTransitionProps> = ({
  show,
  children,
  duration = durations.normal,
  className,
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        height: show ? 'auto' : 0,
        opacity: show ? 1 : 0,
      }}
      transition={{
        height: { duration, ease: easings.apple },
        opacity: { duration: duration * 0.7 },
      }}
      style={{ overflow: 'hidden' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// FLIP TRANSITION
// ============================================================================

interface FlipTransitionProps extends BaseTransitionProps {
  axis?: 'x' | 'y';
}

export const FlipTransition: React.FC<FlipTransitionProps> = ({
  show,
  children,
  axis = 'y',
  duration = durations.moderate,
  className,
  onEnter,
  onExit,
}) => {
  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            rotateX: axis === 'y' ? 90 : 0,
            rotateY: axis === 'x' ? 90 : 0,
          }}
          animate={{
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
          }}
          exit={{
            opacity: 0,
            rotateX: axis === 'y' ? -90 : 0,
            rotateY: axis === 'x' ? -90 : 0,
          }}
          transition={{ duration, ease: easings.apple }}
          onAnimationComplete={onEnter}
          style={{ perspective: 1000 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// ZOOM TRANSITION
// ============================================================================

interface ZoomTransitionProps extends BaseTransitionProps {
  zoomFrom?: number;
  zoomTo?: number;
}

export const ZoomTransition: React.FC<ZoomTransitionProps> = ({
  show,
  children,
  zoomFrom = 0,
  zoomTo = 1,
  duration = durations.normal,
  className,
  onEnter,
  onExit,
}) => {
  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: zoomFrom }}
          animate={{ opacity: 1, scale: zoomTo }}
          exit={{ opacity: 0, scale: zoomFrom }}
          transition={{ duration, ...springs.bouncy }}
          onAnimationComplete={onEnter}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// BOUNCE TRANSITION
// ============================================================================

interface BounceTransitionProps extends BaseTransitionProps {
  bounceIntensity?: number;
}

export const BounceTransition: React.FC<BounceTransitionProps> = ({
  show,
  children,
  bounceIntensity = 0.2,
  duration = durations.moderate,
  className,
  onEnter,
  onExit,
}) => {
  return (
    <AnimatePresence onExitComplete={onExit}>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              y: {
                type: 'spring',
                stiffness: 300,
                damping: 10,
                mass: bounceIntensity,
              },
              opacity: { duration: duration * 0.5 },
            },
          }}
          exit={{ opacity: 0, y: -20 }}
          onAnimationComplete={onEnter}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
