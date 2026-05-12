// Gifty design system colors. Never hardcode colors elsewhere.
export const palette = {
  // Brand
  deepNavy: '#0B1020',
  purple: '#7B61FF',
  pinkAccent: '#FF5EC7',
  softLavender: '#B388FF',

  // Dark surfaces
  darkBg: '#0B1020',
  darkSurface: '#141A2E',
  darkSurfaceElevated: '#1B2240',
  darkBorder: '#252C48',

  // Light surfaces
  lightBg: '#F5F7FB',
  lightSurface: '#FFFFFF',
  lightSurfaceElevated: '#F0F2F8',
  lightBorder: '#E6E8F0',

  // Text
  textPrimaryDark: '#FFFFFF',
  textSecondaryDark: '#B6BCD1',
  textTertiaryDark: '#7A8099',
  textPrimaryLight: '#0B1020',
  textSecondaryLight: '#4B5168',
  textTertiaryLight: '#8A90A6',

  // Semantic
  success: '#34C77B',
  warning: '#F5A623',
  error: '#FF5A5F',
  info: '#5AC8FA',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const darkColors = {
  bg: palette.darkBg,
  surface: palette.darkSurface,
  surfaceElevated: palette.darkSurfaceElevated,
  border: palette.darkBorder,
  textPrimary: palette.textPrimaryDark,
  textSecondary: palette.textSecondaryDark,
  textTertiary: palette.textTertiaryDark,
  accent: palette.softLavender,
  primary: palette.purple,
  secondary: palette.pinkAccent,
};

export const lightColors = {
  bg: palette.lightBg,
  surface: palette.lightSurface,
  surfaceElevated: palette.lightSurfaceElevated,
  border: palette.lightBorder,
  textPrimary: palette.textPrimaryLight,
  textSecondary: palette.textSecondaryLight,
  textTertiary: palette.textTertiaryLight,
  accent: palette.purple,
  primary: palette.purple,
  secondary: palette.pinkAccent,
};
