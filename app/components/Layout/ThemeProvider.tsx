'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store/appStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((state) => state.theme);
  const reduceTransparency = useAppStore((state) => state.reduceTransparency);

  useEffect(() => {
    // Aplicar tema imediatamente ao carregar - Dark mode como padrão
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('app-theme');
    
    // Se não houver tema salvo, usar dark como padrão
    if (savedTheme === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      if (!savedTheme) {
        localStorage.setItem('app-theme', 'dark');
      }
    }

    // Apply reduce-transparency as early as possible (best effort).
    try {
      const raw = localStorage.getItem('darwin-mfc-storage');
      if (raw) {
        const parsed = JSON.parse(raw);
        const reduce = Boolean(parsed?.state?.reduceTransparency);
        if (reduce) {
          root.setAttribute('data-reduce-transparency', 'true');
        } else {
          root.removeAttribute('data-reduce-transparency');
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // Aplicar tema ao documento quando mudar
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('app-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('app-theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (reduceTransparency) {
      root.setAttribute('data-reduce-transparency', 'true');
    } else {
      root.removeAttribute('data-reduce-transparency');
    }
  }, [reduceTransparency]);

  return <>{children}</>;
}
