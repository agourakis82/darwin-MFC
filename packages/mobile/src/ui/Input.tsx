import React from 'react';
import { View, TextInput, type TextInputProps } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export interface InputProps extends TextInputProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Input({ left, right, style, ...props }: InputProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 16,
          paddingHorizontal: 14,
          paddingVertical: 12,
        },
      ]}
    >
      {left ? <View>{left}</View> : null}
      <TextInput
        {...props}
        placeholderTextColor={colors.text + '99'}
        style={[
          {
            flex: 1,
            color: colors.text,
            fontSize: 15,
          },
          style,
        ]}
      />
      {right ? <View>{right}</View> : null}
    </View>
  );
}

