/**
 * INTERACTIVE FEEDBACK COMPONENTS
 * =================================
 *
 * Visual feedback components for user interactions
 * Material Design ripples, attention animations, and micro-interactions
 *
 * Features:
 * - Ripple effect (Material Design)
 * - Shake animation (error feedback)
 * - Pulse animation (attention)
 * - Bounce animation
 * - Flash animation
 * - Wiggle animation
 * - Heartbeat animation
 * - Glow effect
 * - Confetti burst
 *
 * @example
 * ```tsx
 * import { RippleButton, ShakeWrapper, PulseWrapper } from '@/lib/design-system/animations/feedback';
 *
 * <RippleButton onClick={handleClick}>Click me</RippleButton>
 * <ShakeWrapper trigger={hasError}>Error content</ShakeWrapper>
 * <PulseWrapper>Pulsing content</PulseWrapper>
 * ```
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  shake,
  pulse,
  bounce,
  heartbeat,
  wobble,
  easings,
  durations,
  springs,
} from './presets';

// ============================================================================
// RIPPLE EFFECT
// ============================================================================

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  duration?: number;
  disabled?: boolean;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  color = 'rgba(255, 255, 255, 0.5)',
  duration = 600,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
        size,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, duration);
    },
    [disabled, duration]
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseDown={createRipple}
      {...props}
    >
      {children}
      <span className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full"
              style={{
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
                width: ripple.size,
                height: ripple.size,
                backgroundColor: color,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration / 1000, ease: easings.easeOut }}
            />
          ))}
        </AnimatePresence>
      </span>
    </div>
  );
};

/**
 * Button with built-in ripple effect
 */
export const RippleButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { rippleColor?: string }
>(({ children, className, rippleColor, ...props }, ref) => {
  return (
    <RippleEffect
      as="button"
      ref={ref}
      color={rippleColor}
      className={cn(
        'relative inline-flex items-center justify-center px-4 py-2 rounded-lg',
        'bg-brand-primary-600 text-white font-medium',
        'hover:bg-brand-primary-700 active:bg-brand-primary-800',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:ring-offset-2',
        className
      )}
      {...(props as any)}
    >
      {children}
    </RippleEffect>
  );
});

RippleButton.displayName = 'RippleButton';

// ============================================================================
// SHAKE WRAPPER
// ============================================================================

interface ShakeWrapperProps {
  children: React.ReactNode;
  trigger?: boolean | number; // Boolean or increment counter
  intensity?: 'light' | 'normal' | 'strong';
  className?: string;
}

export const ShakeWrapper: React.FC<ShakeWrapperProps> = ({
  children,
  trigger = false,
  intensity = 'normal',
  className,
}) => {
  const controls = useAnimation();
  const prevTriggerRef = useRef(trigger);

  const intensityMap = {
    light: [-5, 5, -5, 5, 0],
    normal: [-10, 10, -10, 10, 0],
    strong: [-15, 15, -15, 15, 0],
  };

  useEffect(() => {
    // Trigger animation when trigger changes
    if (trigger !== prevTriggerRef.current && trigger) {
      controls.start({
        x: intensityMap[intensity],
        transition: {
          duration: 0.5,
          ease: easings.apple,
        },
      });
    }
    prevTriggerRef.current = trigger;
  }, [trigger, controls, intensity, intensityMap]);

  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
};

// ============================================================================
// PULSE WRAPPER
// ============================================================================

const pulseVariants = cva('', {
  variants: {
    speed: {
      slow: '',
      normal: '',
      fast: '',
    },
    intensity: {
      subtle: '',
      normal: '',
      strong: '',
    },
  },
  defaultVariants: {
    speed: 'normal',
    intensity: 'normal',
  },
});

interface PulseWrapperProps extends VariantProps<typeof pulseVariants> {
  children: React.ReactNode;
  continuous?: boolean;
  className?: string;
}

export const PulseWrapper: React.FC<PulseWrapperProps> = ({
  children,
  continuous = true,
  speed = 'normal',
  intensity = 'normal',
  className,
}) => {
  const speedMap = {
    slow: 3,
    normal: 2,
    fast: 1,
  };

  const intensityMap = {
    subtle: { scale: [1, 1.03, 1], opacity: [1, 0.9, 1] },
    normal: { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] },
    strong: { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] },
  };

  return (
    <motion.div
      className={className}
      animate={
        continuous
          ? {
              ...intensityMap[intensity!],
              transition: {
                duration: speedMap[speed!],
                repeat: Infinity,
                ease: easings.smooth,
              },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// BOUNCE WRAPPER
// ============================================================================

interface BounceWrapperProps {
  children: React.ReactNode;
  trigger?: boolean | number;
  height?: number; // Bounce height in pixels
  className?: string;
}

export const BounceWrapper: React.FC<BounceWrapperProps> = ({
  children,
  trigger = false,
  height = 20,
  className,
}) => {
  const controls = useAnimation();
  const prevTriggerRef = useRef(trigger);

  useEffect(() => {
    if (trigger !== prevTriggerRef.current && trigger) {
      controls.start({
        y: [0, -height, 0],
        transition: {
          duration: 0.6,
          ease: easings.bounce,
        },
      });
    }
    prevTriggerRef.current = trigger;
  }, [trigger, controls, height]);

  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
};

// ============================================================================
// FLASH WRAPPER
// ============================================================================

interface FlashWrapperProps {
  children: React.ReactNode;
  trigger?: boolean | number;
  color?: string;
  className?: string;
}

export const FlashWrapper: React.FC<FlashWrapperProps> = ({
  children,
  trigger = false,
  color = 'rgba(255, 255, 0, 0.5)',
  className,
}) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const prevTriggerRef = useRef(trigger);

  useEffect(() => {
    if (trigger !== prevTriggerRef.current && trigger) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 500);
    }
    prevTriggerRef.current = trigger;
  }, [trigger]);

  return (
    <motion.div
      className={cn('relative', className)}
      animate={
        isFlashing
          ? {
              boxShadow: [
                `0 0 0px ${color}`,
                `0 0 20px ${color}`,
                `0 0 40px ${color}`,
                `0 0 20px ${color}`,
                `0 0 0px ${color}`,
              ],
            }
          : {}
      }
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// WIGGLE WRAPPER
// ============================================================================

interface WiggleWrapperProps {
  children: React.ReactNode;
  trigger?: boolean | number;
  className?: string;
}

export const WiggleWrapper: React.FC<WiggleWrapperProps> = ({
  children,
  trigger = false,
  className,
}) => {
  const controls = useAnimation();
  const prevTriggerRef = useRef(trigger);

  useEffect(() => {
    if (trigger !== prevTriggerRef.current && trigger) {
      controls.start({
        rotate: [-5, 5, -5, 5, 0],
        transition: {
          duration: 0.5,
          ease: easings.apple,
        },
      });
    }
    prevTriggerRef.current = trigger;
  }, [trigger, controls]);

  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
};

// ============================================================================
// HEARTBEAT WRAPPER
// ============================================================================

interface HeartbeatWrapperProps {
  children: React.ReactNode;
  continuous?: boolean;
  trigger?: boolean | number;
  className?: string;
}

export const HeartbeatWrapper: React.FC<HeartbeatWrapperProps> = ({
  children,
  continuous = false,
  trigger = false,
  className,
}) => {
  const controls = useAnimation();
  const prevTriggerRef = useRef(trigger);

  const heartbeatAnimation = {
    scale: [1, 1.3, 1, 1.3, 1],
    transition: {
      duration: 1.3,
      times: [0, 0.14, 0.28, 0.42, 0.7],
      ease: easings.smooth,
      ...(continuous ? { repeat: Infinity } : {}),
    },
  };

  useEffect(() => {
    if (continuous) {
      controls.start(heartbeatAnimation);
    } else if (trigger !== prevTriggerRef.current && trigger) {
      controls.start(heartbeatAnimation);
    }
    prevTriggerRef.current = trigger;
  }, [trigger, continuous, controls]);

  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
};

// ============================================================================
// GLOW EFFECT
// ============================================================================

interface GlowWrapperProps {
  children: React.ReactNode;
  color?: string;
  intensity?: 'subtle' | 'normal' | 'strong';
  continuous?: boolean;
  className?: string;
}

export const GlowWrapper: React.FC<GlowWrapperProps> = ({
  children,
  color = 'rgba(59, 130, 246, 0.5)',
  intensity = 'normal',
  continuous = true,
  className,
}) => {
  const intensityMap = {
    subtle: [0, 10, 0],
    normal: [0, 20, 0],
    strong: [0, 40, 0],
  };

  const blurValues = intensityMap[intensity];

  return (
    <motion.div
      className={className}
      animate={
        continuous
          ? {
              filter: [
                `drop-shadow(0 0 ${blurValues[0]}px ${color})`,
                `drop-shadow(0 0 ${blurValues[1]}px ${color})`,
                `drop-shadow(0 0 ${blurValues[2]}px ${color})`,
              ],
            }
          : {}
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: easings.smooth,
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// CONFETTI BURST
// ============================================================================

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
}

interface ConfettiBurstProps {
  trigger?: boolean | number;
  count?: number;
  colors?: string[];
  duration?: number;
  spread?: number;
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
  trigger = false,
  count = 30,
  colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
  ],
  duration = 3000,
  spread = 100,
}) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const prevTriggerRef = useRef(trigger);

  useEffect(() => {
    if (trigger !== prevTriggerRef.current && trigger) {
      const newParticles: ConfettiParticle[] = Array.from(
        { length: count },
        (_, i) => ({
          id: Date.now() + i,
          x: 0,
          y: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          velocityX: (Math.random() - 0.5) * spread,
          velocityY: Math.random() * -spread - 50,
          rotation: Math.random() * 360,
        })
      );

      setParticles(newParticles);

      setTimeout(() => {
        setParticles([]);
      }, duration);
    }
    prevTriggerRef.current = trigger;
  }, [trigger, count, colors, spread, duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: '50%',
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              rotate: particle.rotation,
            }}
            animate={{
              x: particle.x + particle.velocityX,
              y: particle.y + particle.velocityY + 500,
              opacity: 0,
              rotate: particle.rotation + 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: duration / 1000,
              ease: [0.4, 0, 0.6, 1],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// SUCCESS CHECKMARK ANIMATION
// ============================================================================

interface SuccessCheckmarkProps {
  show?: boolean;
  size?: number;
  color?: string;
  duration?: number;
}

export const SuccessCheckmark: React.FC<SuccessCheckmarkProps> = ({
  show = true,
  size = 64,
  color = '#10B981',
  duration = 0.6,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration, ...springs.bouncy }}
        >
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="32"
              cy="32"
              r="30"
              stroke={color}
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: duration * 0.5, ease: easings.easeOut }}
            />
            <motion.path
              d="M20 32L28 40L44 24"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: duration * 0.5,
                delay: duration * 0.3,
                ease: easings.easeOut,
              }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// ERROR X ANIMATION
// ============================================================================

interface ErrorCrossProps {
  show?: boolean;
  size?: number;
  color?: string;
  duration?: number;
}

export const ErrorCross: React.FC<ErrorCrossProps> = ({
  show = true,
  size = 64,
  color = '#EF4444',
  duration = 0.6,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration, ...springs.bouncy }}
        >
          <motion.svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="32"
              cy="32"
              r="30"
              stroke={color}
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: duration * 0.5, ease: easings.easeOut }}
            />
            <motion.path
              d="M22 22L42 42M42 22L22 42"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: duration * 0.5,
                delay: duration * 0.3,
                ease: easings.easeOut,
              }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// TYPING INDICATOR
// ============================================================================

interface TypingIndicatorProps {
  dotColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  dotColor = '#9CA3AF',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 6,
    md: 8,
    lg: 10,
  };

  const dotSize = sizeMap[size];

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
            ease: easings.smooth,
          }}
        />
      ))}
    </div>
  );
};
