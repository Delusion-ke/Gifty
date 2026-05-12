import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import 'intl-pluralrules';

import en from './locales/en.json';
import sk from './locales/sk.json';
import cs from './locales/cs.json';
import de from './locales/de.json';
import pl from './locales/pl.json';
import hu from './locales/hu.json';

export const SUPPORTED_LANGUAGES = ['en', 'sk', 'cs', 'de', 'pl', 'hu'];

export function detectInitialLanguage(stored) {
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored;
  const deviceLocales = Localization.getLocales();
  const deviceLang = deviceLocales?.[0]?.languageCode;
  if (deviceLang && SUPPORTED_LANGUAGES.includes(deviceLang)) return deviceLang;
  return 'en'; // Default per user choice
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: { translation: en },
    sk: { translation: sk },
    cs: { translation: cs },
    de: { translation: de },
    pl: { translation: pl },
    hu: { translation: hu },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
