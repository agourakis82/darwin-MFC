'use client';

import { useState, useCallback, useEffect } from 'react';

export type LayoutMode = 'exploration' | 'focus' | 'compare' | 'clinical';

const STORAGE_KEY = 'darwin-layout-mode';

export function useMedicalLayout(defaultMode: LayoutMode = 'exploration') {
  const [mode, setMode] = useState<LayoutMode>(defaultMode);
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['exploration', 'focus', 'compare', 'clinical'].includes(stored)) {
      setMode(stored as LayoutMode);
    }
  }, []);

  // Save to localStorage
  const changeMode = useCallback((newMode: LayoutMode) => {
    setMode(newMode);
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, newMode);
    }
  }, [isClient]);

  return {
    mode,
    changeMode,
    isClient,
  };
}

export default useMedicalLayout;
