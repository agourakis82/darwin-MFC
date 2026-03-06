import React from 'react';
import { Pressable, View, Text as RNText, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../contexts/ThemeContext';

export default function DarwinTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { colors, theme, reduceTransparency } = useTheme();
  const isDark = theme === 'dark';

  const inactive = isDark ? 'rgba(244,244,242,0.65)' : 'rgba(26,26,24,0.6)';

  return (
    <View style={[styles.root, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {reduceTransparency ? (
        <View
          style={[
            styles.bar,
            {
              borderTopColor: colors.border,
              backgroundColor: colors.surface,
            },
          ]}
        >
          <View style={styles.row}>
            {state.routes.map((route: any, index: number) => {
              const { options } = descriptors[route.key] ?? {};
              const focused = state.index === index;
              const color = focused ? colors.primary : inactive;
              const label = options?.title ?? route.name;

              const onPress = () => {
                Haptics.selectionAsync().catch(() => undefined);
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({ type: 'tabLongPress', target: route.key });
              };

              const icon = options?.tabBarIcon?.({ color, size: 22, focused });

              return (
                <Pressable
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={focused ? { selected: true } : {}}
                  accessibilityLabel={options?.tabBarAccessibilityLabel}
                  testID={options?.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={({ pressed }) => [
                    styles.item,
                    focused ? styles.itemFocused : null,
                    pressed ? (isDark ? styles.itemPressedDark : styles.itemPressedLight) : null,
                  ]}
                >
                  {icon}
                  <RNText style={[styles.label, { color }]} numberOfLines={1}>
                    {label}
                  </RNText>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : (
        <BlurView
          tint={isDark ? 'dark' : 'light'}
          intensity={80}
          style={[
            styles.bar,
            {
              borderTopColor: colors.border,
              backgroundColor: isDark ? 'rgba(15,15,14,0.72)' : 'rgba(251,251,249,0.72)',
            },
          ]}
        >
        <View style={styles.row}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key] ?? {};
            const focused = state.index === index;
            const color = focused ? colors.primary : inactive;
            const label = options?.title ?? route.name;

            const onPress = () => {
              Haptics.selectionAsync().catch(() => undefined);
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({ type: 'tabLongPress', target: route.key });
            };

            const icon = options?.tabBarIcon?.({ color, size: 22, focused });

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={focused ? { selected: true } : {}}
                accessibilityLabel={options?.tabBarAccessibilityLabel}
                testID={options?.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={({ pressed }) => [
                  styles.item,
                  focused ? styles.itemFocused : null,
                  pressed ? (isDark ? styles.itemPressedDark : styles.itemPressedLight) : null,
                ]}
              >
                {icon}
                <RNText style={[styles.label, { color }]} numberOfLines={1}>
                  {label}
                </RNText>
              </Pressable>
            );
          })}
        </View>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bar: {
    borderTopWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 16,
    gap: 4,
  },
  itemFocused: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  itemPressedLight: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  itemPressedDark: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
