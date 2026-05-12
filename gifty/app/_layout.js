import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

import '../src/i18n';
import i18n, { detectInitialLanguage } from '../src/i18n';
import { useSettingsStore } from '../src/store/settingsStore';
import { useAuthStore } from '../src/store/authStore';
import { darkColors, lightColors } from '../src/theme/colors';

SplashScreen.preventAutoHideAsync().catch(() => {});

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const onboardingDone = useAuthStore((s) => s.onboardingDone);
  const signedIn = useAuthStore((s) => s.signedIn);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    const inAuth = segments[0] === '(auth)';
    const inTabs = segments[0] === '(tabs)';

    if (!onboardingDone && segments[0] !== '(auth)') {
      router.replace('/(auth)/onboarding');
    } else if (onboardingDone && !signedIn && !inAuth) {
      router.replace('/(auth)/login');
    } else if (signedIn && inAuth) {
      router.replace('/(tabs)/home');
    }
  }, [segments, onboardingDone, signedIn, hasHydrated, router]);
}

export default function RootLayout() {
  const systemScheme = useColorScheme();
  const themeMode = useSettingsStore((s) => s.themeMode);
  const language = useSettingsStore((s) => s.language);
  const settingsHydrated = useSettingsStore((s) => s.hasHydrated);
  const authHydrated = useAuthStore((s) => s.hasHydrated);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  // Apply language on hydration
  useEffect(() => {
    if (!settingsHydrated) return;
    const lang = detectInitialLanguage(language);
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [settingsHydrated, language]);

  useEffect(() => {
    if (fontsLoaded && settingsHydrated && authHydrated) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, settingsHydrated, authHydrated]);

  useProtectedRoute();

  if (!fontsLoaded || !settingsHydrated || !authHydrated) {
    return <View style={{ flex: 1, backgroundColor: '#F5F7FB' }} />;
  }

  const effectiveScheme = themeMode === 'system' ? systemScheme : themeMode;
  const isDark = effectiveScheme === 'dark';
  const bg = isDark ? darkColors.bg : lightColors.bg;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: bg }}>
      <SafeAreaProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: bg },
            animation: 'fade',
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
