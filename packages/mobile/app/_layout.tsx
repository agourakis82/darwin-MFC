/**
 * Darwin MFC Mobile App - Root Layout
 * Uses Expo Router (Apple-native UI kit lives in src/ui)
 */
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemedAppShell />
      </ThemeProvider>
    </AuthProvider>
  );
}

function ThemedAppShell() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modal)" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
