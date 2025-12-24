/**
 * TOUCH GESTURE ENHANCEMENTS
 * ===========================
 *
 * Mobile-specific touch gesture components and utilities
 * Pull-to-refresh, swipe actions, long press menus, etc.
 *
 * Features:
 * - Pull-to-refresh functionality
 * - Swipe-to-delete/archive actions
 * - Long press context menus
 * - Touch-friendly scroll enhancements
 * - Momentum scrolling
 * - Overscroll effects
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo, useAnimation } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import {
  RefreshCw,
  Trash2,
  Archive,
  Star,
  Check,
  X,
  MoreVertical,
  Share2,
  Edit,
  Copy,
} from 'lucide-react';
import { haptic } from '../../design-system/animations/haptics';

// ============================================================================
// PULL TO REFRESH
// ============================================================================

export interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  threshold?: number;
  children: React.ReactNode;
  className?: string;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  threshold = 80,
  children,
  className,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rotation = useTransform(y, [0, threshold], [0, 360]);
  const opacity = useTransform(y, [0, threshold / 2, threshold], [0, 0.5, 1]);
  const scale = useTransform(y, [0, threshold], [0.5, 1]);

  const handleDragStart = () => {
    if (containerRef.current?.scrollTop === 0) {
      setIsPulling(true);
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isPulling) return;

    const pull = Math.max(0, info.offset.y);
    y.set(pull);

    // Haptic feedback at threshold
    if (pull >= threshold && !isRefreshing) {
      haptic.impact('medium');
    }
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isPulling) return;

    const pull = info.offset.y;

    if (pull >= threshold && !isRefreshing) {
      // Trigger refresh
      setIsRefreshing(true);
      haptic.impact('heavy');

      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        y.set(0);
      }
    } else {
      // Snap back
      y.set(0);
    }

    setIsPulling(false);
  };

  return (
    <div ref={containerRef} className={cn('relative overflow-auto h-full', className)}>
      {/* Pull Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center z-10"
        style={{ height: y, opacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-brand-primary-600 dark:text-brand-primary-400"
          style={{ scale }}
        >
          <motion.div style={{ rotate: rotation }}>
            <RefreshCw className="w-8 h-8" />
          </motion.div>
          <span className="text-sm font-medium">
            {isRefreshing ? 'Refreshing...' : isPulling ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ y: isRefreshing ? threshold : y }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

// ============================================================================
// SWIPE ACTION
// ============================================================================

export interface SwipeAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
  onAction: () => void | Promise<void>;
}

export interface SwipeActionsProps {
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

const actionColors = {
  red: 'bg-red-500 text-white',
  blue: 'bg-blue-500 text-white',
  green: 'bg-green-500 text-white',
  yellow: 'bg-yellow-500 text-white',
  purple: 'bg-purple-500 text-white',
};

export const SwipeActions: React.FC<SwipeActionsProps> = ({
  leftActions = [],
  rightActions = [],
  children,
  threshold = 80,
  className,
}) => {
  const x = useMotionValue(0);
  const [revealed, setRevealed] = useState<'left' | 'right' | null>(null);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;

    if (Math.abs(offset) >= threshold / 2) {
      haptic.impact('light');
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;

    if (offset > threshold && leftActions.length > 0) {
      // Reveal left actions
      setRevealed('left');
      x.set(leftActions.length * 80);
      haptic.impact('medium');
    } else if (offset < -threshold && rightActions.length > 0) {
      // Reveal right actions
      setRevealed('right');
      x.set(-rightActions.length * 80);
      haptic.impact('medium');
    } else {
      // Snap back
      setRevealed(null);
      x.set(0);
    }
  };

  const handleAction = async (action: SwipeAction) => {
    haptic.impact('heavy');
    await action.onAction();

    // Reset
    setRevealed(null);
    x.set(0);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Left Actions */}
      {leftActions.length > 0 && (
        <div className="absolute left-0 top-0 bottom-0 flex">
          {leftActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleAction(action)}
                className={cn(
                  'w-20 flex flex-col items-center justify-center gap-1',
                  actionColors[action.color]
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Right Actions */}
      {rightActions.length > 0 && (
        <div className="absolute right-0 top-0 bottom-0 flex">
          {rightActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleAction(action)}
                className={cn(
                  'w-20 flex flex-col items-center justify-center gap-1',
                  actionColors[action.color]
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Content */}
      <motion.div
        drag="x"
        dragConstraints={{
          left: -rightActions.length * 80,
          right: leftActions.length * 80,
        }}
        dragElastic={0.1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="bg-white dark:bg-neutral-900"
      >
        {children}
      </motion.div>
    </div>
  );
};

// ============================================================================
// LONG PRESS MENU
// ============================================================================

export interface LongPressMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onAction: () => void | Promise<void>;
  variant?: 'default' | 'danger';
}

export interface LongPressMenuProps {
  items: LongPressMenuItem[];
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const LongPressMenu: React.FC<LongPressMenuProps> = ({
  items,
  children,
  delay = 500,
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setMenuPosition({ x: touch.clientX, y: touch.clientY });

    // Start progress animation
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / delay) * 100, 100));
    }, 16);

    // Long press timer
    timerRef.current = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(0);
      setIsMenuOpen(true);
      haptic.impact('heavy');
    }, delay);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setProgress(0);
  };

  const handleMenuItemClick = async (item: LongPressMenuItem) => {
    haptic.impact('medium');
    setIsMenuOpen(false);
    await item.onAction();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEnd}
        className={cn('relative', className)}
      >
        {children}

        {/* Progress Ring */}
        {progress > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-16 h-16 -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-neutral-200 dark:text-neutral-700"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                className="text-brand-primary-600 dark:text-brand-primary-400 transition-all"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50"
            />

            {/* Menu */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                position: 'fixed',
                left: menuPosition.x,
                top: menuPosition.y,
                transform: 'translate(-50%, -50%)',
              }}
              className="z-50 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden min-w-[200px]"
            >
              {items.map((item, index) => {
                const Icon = item.icon;
                const isDanger = item.variant === 'danger';

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item)}
                    className={cn(
                      'flex items-center gap-3 w-full px-4 py-3',
                      'min-h-[44px]', // Touch-friendly
                      'hover:bg-neutral-100 dark:hover:bg-neutral-700',
                      'transition-colors',
                      index > 0 && 'border-t border-neutral-200 dark:border-neutral-700',
                      isDanger && 'text-red-600 dark:text-red-400'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================================
// OVERSCROLL EFFECTS
// ============================================================================

export interface OverscrollEffectProps {
  children: React.ReactNode;
  color?: string;
  maxPull?: number;
  className?: string;
}

export const OverscrollEffect: React.FC<OverscrollEffectProps> = ({
  children,
  color = 'rgba(59, 130, 246, 0.3)', // brand-primary-600 with opacity
  maxPull = 100,
  className,
}) => {
  const [pullTop, setPullTop] = useState(0);
  const [pullBottom, setPullBottom] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // Overscroll at top
    if (scrollTop < 0) {
      setPullTop(Math.min(Math.abs(scrollTop), maxPull));
    } else {
      setPullTop(0);
    }

    // Overscroll at bottom
    const maxScroll = scrollHeight - clientHeight;
    if (scrollTop > maxScroll) {
      setPullBottom(Math.min(scrollTop - maxScroll, maxPull));
    } else {
      setPullBottom(0);
    }
  }, [maxPull]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={containerRef} className={cn('relative overflow-auto h-full', className)}>
      {/* Top Overscroll Indicator */}
      {pullTop > 0 && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: pullTop }}
          className="absolute top-0 left-0 right-0 z-10"
          style={{ backgroundColor: color }}
        />
      )}

      {/* Bottom Overscroll Indicator */}
      {pullBottom > 0 && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: pullBottom }}
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{ backgroundColor: color }}
        />
      )}

      {children}
    </div>
  );
};

// ============================================================================
// TOUCH RIPPLE (Enhanced for mobile)
// ============================================================================

export interface TouchRippleProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  className?: string;
}

export const TouchRipple: React.FC<TouchRippleProps> = ({
  children,
  color = 'rgba(255, 255, 255, 0.5)',
  duration = 600,
  className,
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createRipple = (event: React.TouchEvent | React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    let x: number, y: number;
    if ('touches' in event) {
      const touch = event.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);

    // Haptic feedback
    haptic.impact('light');

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, duration);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={createRipple}
      onMouseDown={createRipple}
      className={cn('relative overflow-hidden', className)}
    >
      {children}

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: duration / 1000 }}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 100,
            height: 100,
            marginLeft: -50,
            marginTop: -50,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// MOMENTUM SCROLL CONTAINER
// ============================================================================

export interface MomentumScrollProps {
  children: React.ReactNode;
  friction?: number;
  className?: string;
}

export const MomentumScroll: React.FC<MomentumScrollProps> = ({
  children,
  friction = 0.95,
  className,
}) => {
  const controls = useAnimation();
  const y = useMotionValue(0);
  const velocityRef = useRef(0);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    velocityRef.current = info.velocity.y;
  };

  const handleDragEnd = () => {
    let velocity = velocityRef.current;

    const animate = () => {
      velocity *= friction;
      y.set(y.get() + velocity);

      if (Math.abs(velocity) > 0.5) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return (
    <motion.div
      drag="y"
      dragElastic={0.1}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{ y }}
      className={cn('overflow-hidden touch-pan-y', className)}
    >
      {children}
    </motion.div>
  );
};
