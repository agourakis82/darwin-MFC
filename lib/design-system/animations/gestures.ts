/**
 * GESTURE-BASED INTERACTION HANDLERS
 * ===================================
 *
 * Advanced gesture recognition and handling using @use-gesture/react
 * Seamless integration with Framer Motion animations
 *
 * Features:
 * - Swipe gestures (4 directions)
 * - Drag gestures with constraints
 * - Pinch/zoom gestures
 * - Long press detection
 * - Tap and double tap
 * - Rotation gestures
 * - Multi-touch support
 * - Velocity tracking
 * - Momentum scrolling
 * - Custom thresholds
 *
 * @example
 * ```tsx
 * import { useSwipeGesture, useDragGesture } from '@/lib/design-system/animations/gestures';
 *
 * function MyComponent() {
 *   const swipeHandlers = useSwipeGesture({
 *     onSwipeLeft: () => console.log('Swiped left'),
 *     onSwipeRight: () => console.log('Swiped right'),
 *   });
 *
 *   return <div {...swipeHandlers}>Swipe me!</div>;
 * }
 * ```
 */

'use client';

import { useGesture, useDrag, usePinch, useWheel } from '@use-gesture/react';
import { useMotionValue, useTransform, animate } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { springs } from './presets';

// ============================================================================
// TYPES
// ============================================================================

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

export interface SwipeGestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // Minimum distance to trigger swipe (default: 50px)
  velocityThreshold?: number; // Minimum velocity (default: 0.5)
  preventScroll?: boolean;
}

export interface DragGestureConfig {
  onDragStart?: (info: DragInfo) => void;
  onDrag?: (info: DragInfo) => void;
  onDragEnd?: (info: DragInfo) => void;
  bounds?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  axis?: 'x' | 'y' | 'both';
  elasticity?: number; // 0-1, how much it resists going past bounds
  momentum?: boolean; // Continue motion after release
}

export interface DragInfo {
  offset: [number, number];
  delta: [number, number];
  velocity: [number, number];
  direction: [number, number];
}

export interface PinchGestureConfig {
  onPinchStart?: (scale: number) => void;
  onPinch?: (scale: number) => void;
  onPinchEnd?: (scale: number) => void;
  minScale?: number;
  maxScale?: number;
  scaleSensitivity?: number;
}

export interface LongPressConfig {
  onLongPress: () => void;
  threshold?: number; // Time in ms (default: 500ms)
  onPressStart?: () => void;
  onPressEnd?: () => void;
}

export interface TapConfig {
  onTap?: () => void;
  onDoubleTap?: () => void;
  doubleTapThreshold?: number; // Time window for double tap (default: 300ms)
}

export interface RotationGestureConfig {
  onRotateStart?: (angle: number) => void;
  onRotate?: (angle: number) => void;
  onRotateEnd?: (angle: number) => void;
  sensitivity?: number;
}

// ============================================================================
// SWIPE GESTURES
// ============================================================================

/**
 * Hook for detecting swipe gestures
 */
export function useSwipeGesture(config: SwipeGestureConfig) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    velocityThreshold = 0.5,
    preventScroll = true,
  } = config;

  const bind = useDrag(
    ({ movement: [mx, my], velocity: [vx, vy], last, event }) => {
      if (!last) return;

      // Prevent default scroll behavior if needed
      if (preventScroll && event) {
        event.preventDefault();
      }

      const absMx = Math.abs(mx);
      const absMy = Math.abs(my);
      const absVx = Math.abs(vx);
      const absVy = Math.abs(vy);

      // Horizontal swipe
      if (absMx > absMy && absMx > threshold && absVx > velocityThreshold) {
        if (mx > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (mx < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
      // Vertical swipe
      else if (absMy > absMx && absMy > threshold && absVy > velocityThreshold) {
        if (my > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (my < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    },
    {
      filterTaps: true,
      axis: undefined, // Allow both axes
    }
  );

  return bind();
}

/**
 * Detect swipe direction from drag state
 */
export function detectSwipeDirection(
  movement: [number, number],
  threshold: number = 50
): SwipeDirection | null {
  const [mx, my] = movement;
  const absMx = Math.abs(mx);
  const absMy = Math.abs(my);

  if (absMx > absMy && absMx > threshold) {
    return mx > 0 ? 'right' : 'left';
  } else if (absMy > absMx && absMy > threshold) {
    return my > 0 ? 'down' : 'up';
  }

  return null;
}

// ============================================================================
// DRAG GESTURES
// ============================================================================

/**
 * Hook for draggable elements with constraints and momentum
 */
export function useDragGesture(config: DragGestureConfig = {}) {
  const {
    onDragStart,
    onDrag,
    onDragEnd,
    bounds,
    axis = 'both',
    elasticity = 0.2,
    momentum = true,
  } = config;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const applyBounds = useCallback(
    (value: number, min?: number, max?: number): number => {
      if (min !== undefined && value < min) {
        return min + (value - min) * elasticity;
      }
      if (max !== undefined && value > max) {
        return max + (value - max) * elasticity;
      }
      return value;
    },
    [elasticity]
  );

  const bind = useDrag(
    ({ offset: [ox, oy], velocity: [vx, vy], delta, direction, first, last }) => {
      const info: DragInfo = {
        offset: [ox, oy],
        delta,
        velocity: [vx, vy],
        direction,
      };

      if (first && onDragStart) {
        onDragStart(info);
      }

      // Apply axis constraints
      const newX = axis === 'y' ? 0 : applyBounds(ox, bounds?.left, bounds?.right);
      const newY = axis === 'x' ? 0 : applyBounds(oy, bounds?.top, bounds?.bottom);

      x.set(newX);
      y.set(newY);

      if (onDrag) {
        onDrag(info);
      }

      if (last) {
        if (onDragEnd) {
          onDragEnd(info);
        }

        // Apply momentum
        if (momentum) {
          const momentumX = newX + vx * 100;
          const momentumY = newY + vy * 100;

          const finalX = bounds?.left !== undefined || bounds?.right !== undefined
            ? Math.max(bounds?.left ?? -Infinity, Math.min(bounds?.right ?? Infinity, momentumX))
            : momentumX;

          const finalY = bounds?.top !== undefined || bounds?.bottom !== undefined
            ? Math.max(bounds?.top ?? -Infinity, Math.min(bounds?.bottom ?? Infinity, momentumY))
            : momentumY;

          animate(x, finalX, { type: 'spring', ...springs.gentle });
          animate(y, finalY, { type: 'spring', ...springs.gentle });
        }
      }
    },
    {
      from: () => [x.get(), y.get()],
      bounds,
      rubberband: elasticity > 0,
    }
  );

  return { bind: bind(), x, y };
}

/**
 * Simplified drag hook for basic dragging
 */
export function useSimpleDrag(onDrag?: (offset: [number, number]) => void) {
  const bind = useDrag(({ offset }) => {
    if (onDrag) {
      onDrag(offset);
    }
  });

  return bind();
}

// ============================================================================
// PINCH GESTURES
// ============================================================================

/**
 * Hook for pinch-to-zoom gestures
 */
export function usePinchGesture(config: PinchGestureConfig = {}) {
  const {
    onPinchStart,
    onPinch,
    onPinchEnd,
    minScale = 0.5,
    maxScale = 3,
    scaleSensitivity = 1,
  } = config;

  const scale = useMotionValue(1);

  const bind = usePinch(
    ({ offset: [d], first, last }) => {
      const newScale = Math.max(
        minScale,
        Math.min(maxScale, 1 + d * scaleSensitivity * 0.01)
      );

      scale.set(newScale);

      if (first && onPinchStart) {
        onPinchStart(newScale);
      }

      if (onPinch) {
        onPinch(newScale);
      }

      if (last && onPinchEnd) {
        onPinchEnd(newScale);
      }
    },
    {
      scaleBounds: { min: minScale, max: maxScale },
    }
  );

  return { bind: bind(), scale };
}

// ============================================================================
// ROTATION GESTURES
// ============================================================================

/**
 * Hook for rotation gestures (two-finger rotation)
 */
export function useRotationGesture(config: RotationGestureConfig = {}) {
  const { onRotateStart, onRotate, onRotateEnd, sensitivity = 1 } = config;

  const rotation = useMotionValue(0);
  const [isRotating, setIsRotating] = useState(false);

  const bind = useGesture(
    {
      onDrag: ({ movement: [, my], first, last }) => {
        if (first) {
          setIsRotating(true);
          if (onRotateStart) {
            onRotateStart(rotation.get());
          }
        }

        // Convert vertical movement to rotation angle
        const angle = my * sensitivity * 0.5;
        rotation.set(angle);

        if (onRotate) {
          onRotate(angle);
        }

        if (last) {
          setIsRotating(false);
          if (onRotateEnd) {
            onRotateEnd(angle);
          }
        }
      },
    },
    {
      drag: {
        filterTaps: true,
      },
    }
  );

  return { bind: bind(), rotation, isRotating };
}

// ============================================================================
// LONG PRESS GESTURES
// ============================================================================

/**
 * Hook for long press detection
 */
export function useLongPress(config: LongPressConfig) {
  const { onLongPress, threshold = 500, onPressStart, onPressEnd } = config;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handlePressStart = useCallback(() => {
    setIsPressed(true);
    if (onPressStart) {
      onPressStart();
    }

    timerRef.current = setTimeout(() => {
      onLongPress();
    }, threshold);
  }, [onLongPress, threshold, onPressStart]);

  const handlePressEnd = useCallback(() => {
    setIsPressed(false);
    if (onPressEnd) {
      onPressEnd();
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [onPressEnd]);

  return {
    onMouseDown: handlePressStart,
    onMouseUp: handlePressEnd,
    onMouseLeave: handlePressEnd,
    onTouchStart: handlePressStart,
    onTouchEnd: handlePressEnd,
    isPressed,
  };
}

// ============================================================================
// TAP GESTURES
// ============================================================================

/**
 * Hook for tap and double tap detection
 */
export function useTapGesture(config: TapConfig) {
  const { onTap, onDoubleTap, doubleTapThreshold = 300 } = config;

  const lastTapRef = useRef<number>(0);
  const tapCountRef = useRef<number>(0);

  const handleTap = useCallback(() => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap < doubleTapThreshold) {
      tapCountRef.current += 1;

      if (tapCountRef.current === 2) {
        if (onDoubleTap) {
          onDoubleTap();
        }
        tapCountRef.current = 0;
        lastTapRef.current = 0;
        return;
      }
    } else {
      tapCountRef.current = 1;
    }

    lastTapRef.current = now;

    // Wait to see if another tap comes
    setTimeout(() => {
      if (tapCountRef.current === 1 && onTap) {
        onTap();
      }
      tapCountRef.current = 0;
    }, doubleTapThreshold);
  }, [onTap, onDoubleTap, doubleTapThreshold]);

  return {
    onClick: handleTap,
  };
}

// ============================================================================
// SCROLL GESTURES
// ============================================================================

/**
 * Hook for wheel/scroll gestures with momentum
 */
export function useWheelGesture(
  onWheel?: (delta: [number, number], velocity: [number, number]) => void
) {
  const bind = useWheel(({ delta, velocity }) => {
    if (onWheel) {
      onWheel(delta, velocity);
    }
  });

  return bind();
}

// ============================================================================
// COMBINED GESTURE HOOKS
// ============================================================================

/**
 * Hook for complete gesture support (drag + pinch + rotate)
 */
export function useMultiGesture(config: {
  onDrag?: (info: DragInfo) => void;
  onPinch?: (scale: number) => void;
  onRotate?: (angle: number) => void;
}) {
  const { onDrag, onPinch, onRotate } = config;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotation = useMotionValue(0);

  const bind = useGesture(
    {
      onDrag: ({ offset: [ox, oy], velocity, delta, direction }) => {
        x.set(ox);
        y.set(oy);

        if (onDrag) {
          onDrag({
            offset: [ox, oy],
            velocity,
            delta,
            direction,
          });
        }
      },
      onPinch: ({ offset: [d] }) => {
        const newScale = 1 + d * 0.01;
        scale.set(newScale);

        if (onPinch) {
          onPinch(newScale);
        }
      },
      onWheel: ({ delta: [, dy] }) => {
        const newRotation = rotation.get() + dy * 0.1;
        rotation.set(newRotation);

        if (onRotate) {
          onRotate(newRotation);
        }
      },
    },
    {
      drag: {
        from: () => [x.get(), y.get()],
      },
    }
  );

  return { bind: bind(), x, y, scale, rotation };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate velocity from movement
 */
export function calculateVelocity(
  movement: [number, number],
  time: number
): [number, number] {
  return [movement[0] / time, movement[1] / time];
}

/**
 * Apply friction to velocity (for momentum)
 */
export function applyFriction(
  velocity: [number, number],
  friction: number = 0.95
): [number, number] {
  return [velocity[0] * friction, velocity[1] * friction];
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate distance between two points
 */
export function distance(
  point1: [number, number],
  point2: [number, number]
): number {
  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate angle between two points
 */
export function angle(point1: [number, number], point2: [number, number]): number {
  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

/**
 * Normalize angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/**
 * Spring animation helper
 */
export function springTo(
  motionValue: any,
  target: number,
  springConfig = springs.gentle
) {
  return animate(motionValue, target, { type: 'spring', ...springConfig });
}
