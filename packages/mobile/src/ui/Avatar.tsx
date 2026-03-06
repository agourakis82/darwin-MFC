import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from './Text';

export interface AvatarProps {
  label: string;
  size?: number;
}

export function Avatar({ label, size = 72 }: AvatarProps) {
  const { colors } = useTheme();

  const initials = useMemo(() => {
    const trimmed = label.trim();
    if (!trimmed) return 'US';
    const parts = trimmed.split(/\s+/g);
    const a = parts[0]?.[0] ?? 'U';
    const b = parts[1]?.[0] ?? parts[0]?.[1] ?? 'S';
    return `${a}${b}`.toUpperCase();
  }, [label]);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text variant="titleLarge" style={{ color: '#fff' }}>
        {initials}
      </Text>
    </View>
  );
}

