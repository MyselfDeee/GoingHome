import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/contexts/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: false }} />
          <Stack.Screen name="parent-dashboard" options={{ headerShown: false }} />
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="re-registration/step1-select" options={{ headerShown: false }} />
            <Stack.Screen name="re-registration/step2-update" options={{ headerShown: false }} />
            <Stack.Screen name="re-registration/step3-success" options={{ headerShown: false }} />
            <Stack.Screen name="re-registration/step4-financing" options={{ headerShown: false }} />
            <Stack.Screen name="re-registration/step5-declaration" options={{ headerShown: false }} />
            <Stack.Screen name="re-registration/step6-review" options={{ headerShown: false }} />
            <Stack.Screen name="re-registration/step7-complete" options={{ headerShown: false }} />
          </Stack.Group>
          <Stack.Screen name="fee-forecasting" options={{ headerShown: false }} />
          <Stack.Screen name="ai-assistant" options={{ headerShown: false }} />
          <Stack.Screen name="request-statement" options={{ headerShown: false }} />
          <Stack.Screen name="admissions" options={{ headerShown: false }} />
          <Stack.Screen name="announcements" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
