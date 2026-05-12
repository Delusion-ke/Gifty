import { useColorScheme } from 'react-native';
import { darkColors, lightColors, palette } from './colors';
import { useSettingsStore } from '../store/settingsStore';

export function useTheme() {
  const systemScheme = useColorScheme();
  const themeMode = useSettingsStore((s) => s.themeMode);

  const effectiveScheme =
    themeMode === 'system' ? systemScheme : themeMode;
  const isDark = effectiveScheme === 'dark';

  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
    palette,
  };
}
