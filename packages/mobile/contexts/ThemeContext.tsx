/**
 * Darwin MFC Mobile - Theme Context
 * Provides dark/light theme with MMKV persistence
 */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { colors as tokenColors } from '@darwin-mfc/design-tokens';

const storage = new MMKV();

type ThemeMode = 'system' | 'light' | 'dark';

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
  primary: tokenColors.adenineTeal,
  background: tokenColors.phosphate,
  surface: '#FFFFFF',
  text: tokenColors.carbon[900],
  error: '#DC2626',
  accent: tokenColors.cytosineCyan,
  border: tokenColors.carbon[200],
};

const darkTheme: ThemeColors = {
  primary: tokenColors.cytosineCyan,
  background: tokenColors.carbon[950],
  surface: tokenColors.carbon[900],
  text: tokenColors.carbon[100],
  error: '#DC2626',
  accent: tokenColors.adenineTeal,
  border: tokenColors.carbon[800],
};

interface ThemeContextType {
  theme: Exclude<ThemeMode, 'system'>;
  themeMode: ThemeMode;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  reduceTransparency: boolean;
  setReduceTransparency: (value: boolean) => void;
  toggleReduceTransparency: () => void;
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
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system'); // Follow system by default
  const [systemScheme, setSystemScheme] = useState<'light' | 'dark'>(() => {
    const s = Appearance.getColorScheme();
    return s === 'dark' ? 'dark' : 'light';
  });
  const [reduceTransparency, setReduceTransparencyState] = useState(false);

  useEffect(() => {
    const savedMode = storage.getString('themeMode');
    if (savedMode === 'system' || savedMode === 'light' || savedMode === 'dark') {
      setThemeModeState(savedMode);
    }
    const savedReduce = storage.getString('reduceTransparency');
    if (savedReduce === '1' || savedReduce === '0') {
      setReduceTransparencyState(savedReduce === '1');
    }
  }, []);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      setSystemScheme(colorScheme === 'dark' ? 'dark' : 'light');
    });
    return () => sub.remove();
  }, []);

  const theme: 'light' | 'dark' = themeMode === 'system' ? systemScheme : themeMode;

  const setThemeMode = (mode: ThemeMode) => {
    storage.set('themeMode', mode);
    setThemeModeState(mode);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setThemeMode(next);
  };

  const setReduceTransparency = (value: boolean) => {
    storage.set('reduceTransparency', value ? '1' : '0');
    setReduceTransparencyState(value);
  };

  const toggleReduceTransparency = () => setReduceTransparency(!reduceTransparency);

  const colors = theme === 'light' ? lightTheme : darkTheme;

  const value: ThemeContextType = useMemo(() => ({
    theme,
    themeMode,
    colors,
    setThemeMode,
    toggleTheme,
    reduceTransparency,
    setReduceTransparency,
    toggleReduceTransparency,
  }), [theme, themeMode, colors, reduceTransparency]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
