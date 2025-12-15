/**
 * HOOKS DE RESPONSIVIDADE - DARWIN-MFC
 * =====================================
 * Utilitários para responsividade e detecção de dispositivo
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

// Breakpoints Tailwind
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

/**
 * Hook para detectar tamanho da tela
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Executar no mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

/**
 * Hook para verificar se está em mobile
 */
export function useIsMobile() {
  const { width } = useWindowSize();
  return width !== undefined && width < breakpoints.md;
}

/**
 * Hook para verificar se está em tablet
 */
export function useIsTablet() {
  const { width } = useWindowSize();
  return width !== undefined && width >= breakpoints.md && width < breakpoints.lg;
}

/**
 * Hook para verificar se está em desktop
 */
export function useIsDesktop() {
  const { width } = useWindowSize();
  return width !== undefined && width >= breakpoints.lg;
}

/**
 * Hook para verificar breakpoint específico
 */
export function useBreakpoint(breakpoint: Breakpoint) {
  const { width } = useWindowSize();
  return width !== undefined && width >= breakpoints[breakpoint];
}

/**
 * Hook para detectar orientação
 */
export function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    function handleOrientationChange() {
      if (typeof window !== 'undefined') {
        setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
      }
    }

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return orientation;
}

/**
 * Hook para detectar touch device
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}

/**
 * Hook para scroll lock (útil para modais em mobile)
 */
export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [lock]);
}

/**
 * Hook para swipe gestures
 */
export function useSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  threshold: number = 50
) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > threshold;

    if (isSwipe) {
      if (distance > 0 && onSwipeLeft) {
        onSwipeLeft();
      } else if (distance < 0 && onSwipeRight) {
        onSwipeRight();
      }
    }
  }, [touchStart, touchEnd, threshold, onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

/**
 * Hook para safe area insets (notch, home indicator)
 */
export function useSafeAreaInsets() {
  const [insets, setInsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const computedStyle = getComputedStyle(document.documentElement);
    
    setInsets({
      top: parseInt(computedStyle.getPropertyValue('--sat') || '0', 10),
      right: parseInt(computedStyle.getPropertyValue('--sar') || '0', 10),
      bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0', 10),
      left: parseInt(computedStyle.getPropertyValue('--sal') || '0', 10),
    });
  }, []);

  return insets;
}

/**
 * Classes utilitárias para responsividade
 */
export const responsiveClasses = {
  // Container responsivo
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Grid responsivo
  gridCols: {
    1: 'grid grid-cols-1',
    2: 'grid grid-cols-1 md:grid-cols-2',
    3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  },
  
  // Texto responsivo
  textSize: {
    headline: 'text-2xl sm:text-3xl lg:text-4xl',
    title: 'text-xl sm:text-2xl lg:text-3xl',
    subtitle: 'text-lg sm:text-xl',
    body: 'text-sm sm:text-base',
    small: 'text-xs sm:text-sm',
  },
  
  // Padding responsivo
  padding: {
    section: 'py-8 sm:py-12 lg:py-16',
    card: 'p-4 sm:p-6',
  },
  
  // Gap responsivo
  gap: {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
  },
  
  // Esconder em mobile
  hideOnMobile: 'hidden sm:block',
  hideOnDesktop: 'block lg:hidden',
  
  // Touch targets (mínimo 44px para acessibilidade)
  touchTarget: 'min-h-[44px] min-w-[44px]',
};

