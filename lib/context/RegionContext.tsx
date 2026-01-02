'use client';

/**
 * REGION CONTEXT - DARWIN-MFC
 * ===========================
 *
 * React Context provider for region state management.
 * Handles region selection with localStorage persistence.
 *
 * Usage:
 * ```tsx
 * // In a parent component (e.g., layout)
 * <RegionProvider>
 *   <App />
 * </RegionProvider>
 *
 * // In any child component
 * const { currentRegion, setRegion } = useRegion();
 * ```
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Region, RegionConfig } from '@/lib/types/region';
import { REGIONS, getRegionConfig, isValidRegion } from '@/lib/data/regions';

// =============================================================================
// CONSTANTS
// =============================================================================

const STORAGE_KEY = 'darwin-mfc-region';
const DEFAULT_REGION: Region = 'BR';

// =============================================================================
// CONTEXT TYPES
// =============================================================================

interface RegionContextValue {
  /** Currently selected region */
  currentRegion: Region;

  /** Configuration for current region */
  currentRegionConfig: RegionConfig;

  /** All available regions */
  availableRegions: Region[];

  /** Set the current region */
  setRegion: (region: Region) => void;

  /** Check if a region is the current one */
  isCurrentRegion: (region: Region) => boolean;

  /** Loading state (during hydration) */
  isLoading: boolean;
}

// =============================================================================
// CONTEXT
// =============================================================================

const RegionContext = createContext<RegionContextValue | undefined>(undefined);

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

interface RegionProviderProps {
  children: ReactNode;
  /** Optional default region override */
  defaultRegion?: Region;
}

export function RegionProvider({
  children,
  defaultRegion = DEFAULT_REGION,
}: RegionProviderProps) {
  const [currentRegion, setCurrentRegion] = useState<Region>(defaultRegion);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && isValidRegion(stored)) {
          setCurrentRegion(stored as Region);
        }
      } catch (error) {
        // localStorage might be unavailable (private browsing, etc.)
        console.warn('Failed to read region from localStorage:', error);
      }
      setIsLoading(false);
    }
  }, []);

  // Persist to localStorage on change
  const setRegion = useCallback((region: Region) => {
    if (!isValidRegion(region)) {
      console.warn(`Invalid region code: ${region}`);
      return;
    }

    setCurrentRegion(region);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, region);
      } catch (error) {
        console.warn('Failed to save region to localStorage:', error);
      }
    }
  }, []);

  // Check if a region is the current one
  const isCurrentRegion = useCallback(
    (region: Region) => currentRegion === region,
    [currentRegion]
  );

  // Get current region configuration
  const currentRegionConfig = useMemo(
    () => getRegionConfig(currentRegion),
    [currentRegion]
  );

  // Get list of available regions
  const availableRegions = useMemo(
    () => Object.keys(REGIONS) as Region[],
    []
  );

  // Memoize context value
  const value = useMemo<RegionContextValue>(
    () => ({
      currentRegion,
      currentRegionConfig,
      availableRegions,
      setRegion,
      isCurrentRegion,
      isLoading,
    }),
    [
      currentRegion,
      currentRegionConfig,
      availableRegions,
      setRegion,
      isCurrentRegion,
      isLoading,
    ]
  );

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook to access region context
 *
 * @throws Error if used outside of RegionProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { currentRegion, setRegion, currentRegionConfig } = useRegion();
 *
 *   return (
 *     <div>
 *       <p>Current region: {currentRegionConfig.name}</p>
 *       <button onClick={() => setRegion('IN')}>Switch to India</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useRegion(): RegionContextValue {
  const context = useContext(RegionContext);

  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }

  return context;
}

// =============================================================================
// OPTIONAL: Safe hook that doesn't throw
// =============================================================================

/**
 * Safe version of useRegion that returns default values if outside provider
 * Useful for components that may or may not be within a RegionProvider
 */
export function useRegionSafe(): RegionContextValue {
  const context = useContext(RegionContext);

  // Return default values if outside provider
  if (context === undefined) {
    return {
      currentRegion: DEFAULT_REGION,
      currentRegionConfig: getRegionConfig(DEFAULT_REGION),
      availableRegions: Object.keys(REGIONS) as Region[],
      setRegion: () => {
        console.warn('useRegionSafe: setRegion called outside RegionProvider');
      },
      isCurrentRegion: (region: Region) => region === DEFAULT_REGION,
      isLoading: false,
    };
  }

  return context;
}

// =============================================================================
// EXPORTS
// =============================================================================

export { RegionContext, DEFAULT_REGION, STORAGE_KEY };
