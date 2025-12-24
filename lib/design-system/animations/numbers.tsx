/**
 * ANIMATED COUNTERS & NUMBER ANIMATIONS
 * ======================================
 *
 * Smooth number animations, counters, and numerical transitions
 * Odometer effects, currency formatting, percentage animations
 *
 * Features:
 * - Animated counters with easing
 * - Odometer/slot machine effect
 * - Currency formatting
 * - Percentage animations
 * - Timer/countdown components
 * - Number morphing
 * - Digit-by-digit animation
 *
 * @example
 * ```tsx
 * import { AnimatedCounter, AnimatedNumber, Odometer } from '@/lib/design-system/animations/numbers';
 *
 * <AnimatedCounter from={0} to={1000} duration={2} />
 * <AnimatedNumber value={42.5} format="currency" />
 * <Odometer value={12345} />
 * ```
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import { easings, durations } from './presets';

// ============================================================================
// TYPES
// ============================================================================

export type NumberFormat = 'decimal' | 'currency' | 'percentage' | 'compact';

export interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  format?: NumberFormat;
  currency?: string;
  decimals?: number;
  className?: string;
  onComplete?: () => void;
}

export interface AnimatedNumberProps {
  value: number;
  format?: NumberFormat;
  currency?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export interface OdometerProps {
  value: number;
  digits?: number;
  duration?: number;
  className?: string;
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Format number based on type
 */
function formatNumber(
  value: number,
  format: NumberFormat = 'decimal',
  currency: string = 'USD',
  decimals?: number
): string {
  const options: Intl.NumberFormatOptions = {};

  if (decimals !== undefined) {
    options.minimumFractionDigits = decimals;
    options.maximumFractionDigits = decimals;
  }

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        ...options,
      }).format(value);

    case 'percentage':
      return new Intl.NumberFormat('en-US', {
        style: 'percent',
        ...options,
      }).format(value / 100);

    case 'compact':
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        ...options,
      }).format(value);

    default:
      return new Intl.NumberFormat('en-US', options).format(value);
  }
}

// ============================================================================
// ANIMATED COUNTER
// ============================================================================

/**
 * Animated counter with smooth number transitions
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  format = 'decimal',
  currency = 'USD',
  decimals,
  className,
  onComplete,
}) => {
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      delay,
      ease: easings.apple,
      onUpdate: (value) => {
        setDisplayValue(value);
      },
      onComplete,
    });

    return () => controls.stop();
  }, [from, to, duration, delay, onComplete]);

  return (
    <span className={className}>
      {formatNumber(displayValue, format, currency, decimals)}
    </span>
  );
};

// ============================================================================
// ANIMATED NUMBER (WITH SPRING)
// ============================================================================

/**
 * Animated number with spring physics
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  format = 'decimal',
  currency = 'USD',
  decimals,
  duration = 1,
  className,
}) => {
  const spring = useSpring(value, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    spring.set(value);

    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => unsubscribe();
  }, [value, spring]);

  return (
    <span className={className}>
      {formatNumber(displayValue, format, currency, decimals)}
    </span>
  );
};

// ============================================================================
// ODOMETER / SLOT MACHINE EFFECT
// ============================================================================

/**
 * Odometer component with digit flipping animation
 */
export const Odometer: React.FC<OdometerProps> = ({
  value,
  digits: fixedDigits,
  duration = 0.5,
  className,
}) => {
  const valueString = value.toString();
  const digits = fixedDigits || valueString.length;

  // Pad with zeros if needed
  const paddedValue = valueString.padStart(digits, '0');

  return (
    <div className={cn('inline-flex items-center overflow-hidden', className)}>
      {paddedValue.split('').map((digit, index) => (
        <OdometerDigit
          key={index}
          value={parseInt(digit, 10)}
          duration={duration}
        />
      ))}
    </div>
  );
};

/**
 * Single odometer digit
 */
interface OdometerDigitProps {
  value: number;
  duration?: number;
}

const OdometerDigit: React.FC<OdometerDigitProps> = ({
  value,
  duration = 0.5,
}) => {
  const digitHeight = 40; // Height of each digit in pixels
  const offset = -value * digitHeight;

  return (
    <div
      className="relative inline-block overflow-hidden"
      style={{ width: '1ch', height: digitHeight }}
    >
      <motion.div
        className="absolute left-0"
        animate={{ y: offset }}
        transition={{ duration, ease: easings.apple }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <div
            key={digit}
            className="flex items-center justify-center font-mono font-bold text-2xl"
            style={{ height: digitHeight }}
          >
            {digit}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ============================================================================
// FLIP COUNTER
// ============================================================================

interface FlipCounterProps {
  value: number;
  className?: string;
}

/**
 * Flip counter with 3D flip effect
 */
export const FlipCounter: React.FC<FlipCounterProps> = ({ value, className }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 300);
    }
  }, [value, prevValue]);

  return (
    <div
      className={cn(
        'relative inline-block overflow-hidden',
        'w-16 h-20 rounded-lg bg-neutral-900 text-white',
        className
      )}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
        animate={{
          rotateX: isFlipping ? -90 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isFlipping ? prevValue : value}
      </motion.div>
    </div>
  );
};

// ============================================================================
// PERCENTAGE CIRCLE
// ============================================================================

interface PercentageCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showText?: boolean;
  duration?: number;
  className?: string;
}

/**
 * Animated percentage circle
 */
export const PercentageCircle: React.FC<PercentageCircleProps> = ({
  value,
  size = 100,
  strokeWidth = 8,
  color = '#3B82F6',
  showText = true,
  duration = 1.5,
  className,
}) => {
  const [percentage, setPercentage] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: easings.apple,
      onUpdate: (latest) => {
        setPercentage(latest);
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-neutral-200 dark:text-neutral-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration, ease: easings.apple }}
        />
      </svg>
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COUNTDOWN TIMER
// ============================================================================

interface CountdownTimerProps {
  targetDate: Date | number;
  onComplete?: () => void;
  format?: 'dhms' | 'hms' | 'ms' | 's';
  className?: string;
}

/**
 * Countdown timer component
 */
export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onComplete,
  format = 'hms',
  className,
}) => {
  const calculateTimeLeft = () => {
    const target = typeof targetDate === 'number' ? targetDate : targetDate.getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const formatTime = () => {
    const pad = (num: number) => num.toString().padStart(2, '0');

    switch (format) {
      case 'dhms':
        return `${timeLeft.days}d ${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(
          timeLeft.seconds
        )}`;
      case 'hms':
        return `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`;
      case 'ms':
        return `${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`;
      case 's':
        return `${timeLeft.seconds}s`;
      default:
        return '';
    }
  };

  return (
    <div className={cn('font-mono text-2xl font-bold', className)}>
      {formatTime()}
    </div>
  );
};

// ============================================================================
// STOPWATCH
// ============================================================================

interface StopwatchProps {
  isRunning?: boolean;
  initialTime?: number;
  onTick?: (time: number) => void;
  className?: string;
}

/**
 * Stopwatch component
 */
export const Stopwatch: React.FC<StopwatchProps> = ({
  isRunning = false,
  initialTime = 0,
  onTick,
  className,
}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        const newTime = prev + 10;
        onTick?.(newTime);
        return newTime;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [isRunning, onTick]);

  const formatTime = (milliseconds: number) => {
    const ms = Math.floor((milliseconds % 1000) / 10);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    const pad = (num: number) => num.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
  };

  return (
    <div className={cn('font-mono text-2xl font-bold', className)}>
      {formatTime(time)}
    </div>
  );
};

// ============================================================================
// ROLLING NUMBER
// ============================================================================

interface RollingNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

/**
 * Rolling number animation (like slot machine)
 */
export const RollingNumber: React.FC<RollingNumberProps> = ({
  value,
  duration = 0.5,
  className,
}) => {
  const digits = value.toString().split('');

  return (
    <div className={cn('inline-flex items-center', className)}>
      {digits.map((digit, index) => (
        <div
          key={index}
          className="relative overflow-hidden inline-block"
          style={{ width: '1ch', height: '1.2em' }}
        >
          <motion.div
            animate={{ y: `-${parseInt(digit) * 120}%` }}
            transition={{ duration, ease: easings.apple, delay: index * 0.05 }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
              <div key={d} className="h-[1.2em] flex items-center justify-center">
                {d}
              </div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook for animated number value
 */
export function useAnimatedNumber(
  targetValue: number,
  duration: number = 1
): number {
  const [value, setValue] = useState(targetValue);

  useEffect(() => {
    const controls = animate(value, targetValue, {
      duration,
      ease: easings.apple,
      onUpdate: (latest) => setValue(latest),
    });

    return () => controls.stop();
  }, [targetValue, duration]);

  return value;
}

/**
 * Hook for counter with increment/decrement
 */
export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);
  const set = (value: number) => setCount(value);

  return { count, increment, decrement, reset, set };
}
