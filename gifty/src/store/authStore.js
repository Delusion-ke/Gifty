import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
  persist(
    (set) => ({
      onboardingDone: false,
      signedIn: false,
      hasHydrated: false,

      completeOnboarding: () => set({ onboardingDone: true }),
      signIn: () => set({ signedIn: true }),
      signOut: () => set({ signedIn: false }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'gifty.auth',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
