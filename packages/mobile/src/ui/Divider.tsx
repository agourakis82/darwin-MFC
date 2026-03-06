import React from 'react';
import { View, type ViewProps } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export function Divider({ style, ...props }: ViewProps) {
  const { colors } = useTheme();
  return (
    <View
      {...props}
      style={[
        { height: 1, backgroundColor: colors.border, opacity: 0.8 },
        style,
      ]}
    />
  );
}

