import React from 'react';
import { View, type ViewProps } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export interface ProgressBarProps extends ViewProps {
  progress: number; // 0..1
}

export function ProgressBar({ progress, style, ...props }: ProgressBarProps) {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View
      {...props}
      style={[
        {
          height: 10,
          borderRadius: 999,
          overflow: 'hidden',
          backgroundColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)',
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View style={{ width: `${clamped * 100}%`, height: '100%', backgroundColor: colors.primary }} />
    </View>
  );
}

