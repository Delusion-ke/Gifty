import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      themeMode: 'light', // 'system' | 'light' | 'dark' — default light per design mockup
      language: null, // null = auto-detect on first launch
      hasHydrated: false,

      setThemeMode: (mode) => set({ themeMode: mode }),
      setLanguage: (lang) => {
        i18n.changeLanguage(lang ?? 'en');
        set({ language: lang });
      },
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'gifty.settings',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
