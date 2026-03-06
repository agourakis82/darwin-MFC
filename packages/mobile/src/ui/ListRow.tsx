import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from './Text';

export interface ListRowProps {
  title: string;
  description?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ListRow({ title, description, left, right, onPress, disabled, style }: ListRowProps) {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Pressable
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 14,
          gap: 12,
          opacity: disabled ? 0.5 : 1,
          backgroundColor: pressed ? (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)') : 'transparent',
          borderRadius: 14,
        },
        style,
      ]}
    >
      {left ? <View style={{ width: 24, alignItems: 'center' }}>{left}</View> : null}
      <View style={{ flex: 1 }}>
        <Text variant="bodyMedium" style={{ fontWeight: '600' }}>
          {title}
        </Text>
        {description ? (
          <Text variant="bodySmall" style={{ color: colors.text, opacity: 0.7, marginTop: 2 }}>
            {description}
          </Text>
        ) : null}
      </View>
      {right ? <View>{right}</View> : null}
    </Pressable>
  );
}
