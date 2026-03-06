import React from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

function sizeStyles(size: ButtonSize): { container: ViewStyle; text: TextStyle } {
  switch (size) {
    case 'sm':
      return { container: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14 }, text: { fontSize: 13, fontWeight: '600' } };
    case 'lg':
      return { container: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 18 }, text: { fontSize: 16, fontWeight: '700' } };
    case 'md':
    default:
      return { container: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 16 }, text: { fontSize: 15, fontWeight: '700' } };
  }
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth,
  containerStyle,
  textStyle,
  disabled,
  onPress,
  ...props
}: ButtonProps) {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const sz = sizeStyles(size);

  const base: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    ...sz.container,
    ...(fullWidth ? { alignSelf: 'stretch' } : null),
  };

  const bgByVariant: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.accent },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
    ghost: { backgroundColor: 'transparent' },
  };

  const textByVariant: Record<ButtonVariant, TextStyle> = {
    primary: { color: '#fff' },
    secondary: { color: isDark ? colors.text : '#fff' },
    outline: { color: colors.text },
    ghost: { color: colors.text },
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      {...props}
      style={({ pressed }) => [
        base,
        bgByVariant[variant],
        disabled ? { opacity: 0.5 } : null,
        pressed && !disabled ? { transform: [{ scale: 0.98 }], opacity: 0.92 } : null,
        containerStyle,
      ]}
    >
      {icon ? <View style={{ marginRight: 2 }}>{icon}</View> : null}
      <Text
        variant="bodyMedium"
        style={[
          { fontWeight: sz.text.fontWeight as any },
          sz.text,
          textByVariant[variant],
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
