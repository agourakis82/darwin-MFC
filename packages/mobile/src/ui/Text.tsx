import React from 'react';
import { Text as RNText, type TextProps, type TextStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export type TextVariant =
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'bodyMedium'
  | 'bodySmall';

const VARIANTS: Record<TextVariant, TextStyle> = {
  headlineMedium: { fontSize: 30, fontWeight: '700', letterSpacing: -0.4, lineHeight: 36 },
  headlineSmall: { fontSize: 22, fontWeight: '700', letterSpacing: -0.2, lineHeight: 28 },
  titleLarge: { fontSize: 20, fontWeight: '700', letterSpacing: -0.1, lineHeight: 26 },
  titleMedium: { fontSize: 16, fontWeight: '600', letterSpacing: -0.05, lineHeight: 22 },
  bodyMedium: { fontSize: 15, fontWeight: '400', lineHeight: 21 },
  bodySmall: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
};

export interface DarwinTextProps extends TextProps {
  variant?: TextVariant;
}

export function Text({ variant = 'bodyMedium', style, ...props }: DarwinTextProps) {
  const { colors } = useTheme();
  return (
    <RNText
      {...props}
      style={[{ color: colors.text }, VARIANTS[variant], style]}
      allowFontScaling
    />
  );
}

