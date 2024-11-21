import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../public/locales/en'
import vi from '../../public/locales/vi'
export const locales = {
  en: 'English',
  vi: 'Việt Nam',
};

const resources = {
  en: {
   common: en
  },
  vi: {
    common: vi
  },
};

const defaultNS = 'common';

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['common'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
