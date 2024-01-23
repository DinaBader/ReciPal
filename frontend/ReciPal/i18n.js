import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.translations = {
  en: {
    greeting: 'What would you like to eat',
    goodbye: 'Goodbye'
  },
  fr: {
    greeting: 'Bonjour',
    goodbye: 'Au revoir'
  }
};

export default i18n;
