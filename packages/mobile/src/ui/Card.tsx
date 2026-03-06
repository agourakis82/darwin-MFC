import React from 'react';
import { Platform, View, type ViewProps } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export type CardVariant = 'default' | 'elevated';

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  padding?: number;
}

export function Card({ variant = 'default', padding = 16, style, ...props }: CardProps) {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 16,
          padding,
        },
        variant === 'elevated' && {
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOpacity: isDark ? 0.2 : 0.08,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 8 },
            },
            android: {
              elevation: isDark ? 2 : 4,
            },
            default: {},
          }),
        },
        style,
      ]}
    />
  );
}

