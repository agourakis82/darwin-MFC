/**
 * Darwin MFC Mobile - Theme Context
 * Provides dark/light theme with MMKV persistence
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

type ThemeMode = 'light' | 'dark';

type ThemeColors = {
  primary: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  accent: string;
  border: string;
};

const lightTheme: ThemeColors = {
  primary: '#6366f1',
  background: '#ffffff',
  surface: '#f1f5f9',
  text: '#1f2937',
  error: '#ef4444',
  accent: '#8b5cf6',
  border: '#e2e8f0',
};

const darkTheme: ThemeColors = {
  primary: '#6366f1',
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  error: '#ef4444',
  accent: '#a78bfa',
  border: '#334155',
};

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark'); // Dark by default

  useEffect(() => {
    const savedTheme = storage.getString('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (mode: ThemeMode) => {
    storage.set('theme', mode);
    setThemeState(mode);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  const value: ThemeContextType = {
    theme,
    colors,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
