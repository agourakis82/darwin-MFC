'use client';

import { useState, useCallback, useEffect } from 'react';

export type InfoDensity = 'comfortable' | 'compact' | 'clinical';

const STORAGE_KEY = 'darwin-info-density';

export function useMedicalDensity(defaultDensity: InfoDensity = 'comfortable') {
  const [density, setDensity] = useState<InfoDensity>(defaultDensity);
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['comfortable', 'compact', 'clinical'].includes(stored)) {
      setDensity(stored as InfoDensity);
    }
  }, []);

  // Save to localStorage
  const changeDensity = useCallback((newDensity: InfoDensity) => {
    setDensity(newDensity);
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, newDensity);
    }
  }, [isClient]);

  return {
    density,
    changeDensity,
    isClient,
  };
}

export default useMedicalDensity;
