/**
 * i18n - Internationalization setup with i18next
 * 
 * Initializes i18next with English and French translations.
 * Auto-detects device language on first launch and persists user
 * preference to AsyncStorage. Defaults to English on error.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../../locales/en.json';
import fr from '../../locales/fr.json';

export const LANGUAGE_KEY = 'app_language';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

export const initI18n = async (): Promise<void> => {
  let language: LanguageCode = 'en';

  try {
    const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (saved === 'en' || saved === 'fr') {
      // Use persisted preference
      language = saved;
    } else {
      // Auto-detect from device locale
      const Localization = await import('expo-localization');
      const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'en';
      language = deviceLocale === 'fr' ? 'fr' : 'en';
    }
  } catch {
    language = 'en';
  }

  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        fr: { translation: fr },
      },
      lng: language,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      compatibilityJSON: 'v4',
    });
};

export const changeLanguage = async (code: LanguageCode): Promise<void> => {
  await AsyncStorage.setItem(LANGUAGE_KEY, code);
  await i18n.changeLanguage(code);
};

export default i18n;
