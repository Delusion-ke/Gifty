import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Gifty Premium — feature flags
 *
 * FREE tier:
 *  - max 3 skupiny
 *  - max 5 wishlist položiek
 *  - affiliate "Kúpiť" tlačidlá (vždy)
 *  - QR príspevok (vždy)
 *
 * PREMIUM tier (neskôr cez RevenueCat / Stripe):
 *  - neobmedzené skupiny
 *  - neobmedzený wishlist
 *  - skrytý wishlist (nikto ho nevidí bez pozvania)
 *  - AI návrhy darčekov
 *  - vlastné témy profilu
 *  - analytika príspevkov
 */
export const FREE_LIMITS = {
  maxGroups: 3,
  maxWishes: 5,
};

export const PREMIUM_FEATURES = {
  unlimitedGroups: 'unlimitedGroups',
  unlimitedWishes: 'unlimitedWishes',
  hiddenWishlist: 'hiddenWishlist',
  aiSuggestions: 'aiSuggestions',
  customThemes: 'customThemes',
  analytics: 'analytics',
};

export const usePremiumStore = create(
  persist(
    (set, get) => ({
      isPremium: false,
      // V produkcii sem príde receipt/token z RevenueCat
      purchaseToken: null,
      hasHydrated: false,

      // Mock aktivácia pre development
      activatePremiumDev: () => set({ isPremium: true, purchaseToken: 'dev_mock' }),
      deactivatePremium: () => set({ isPremium: false, purchaseToken: null }),

      setHasHydrated: (v) => set({ hasHydrated: v }),

      // Skontroluje, či má user daný feature
      canUse: (feature) => {
        const { isPremium } = get();
        // Tieto features sú vždy free:
        const freeFeatures = ['affiliate', 'qr', 'calendar', 'groups_basic'];
        if (freeFeatures.includes(feature)) return true;
        return isPremium;
      },
    }),
    {
      name: 'gifty.premium',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);
