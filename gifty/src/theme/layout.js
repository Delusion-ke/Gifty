export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
  screenH: 20,
  screenV: 16,
};

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const shadows = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.13,
    shadowRadius: 32,
    elevation: 6,
  },
  glowPurple: {
    shadowColor: '#7B61FF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 10,
  },
  glowPink: {
    shadowColor: '#FF5EC7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 8,
  },
};

// Gradient stops used across the app.
export const gradients = {
  brand: ['#7B61FF', '#FF5EC7'],
  brandSoft: ['#7B61FF', '#B388FF'],
  cardGlow: ['rgba(123,97,255,0.35)', 'rgba(255,94,199,0.10)'],
  heroDark: ['rgba(123,97,255,0.35)', 'rgba(11,16,32,0)'],
  heroLight: ['rgba(123,97,255,0.12)', 'rgba(245,247,251,0)'],
};
