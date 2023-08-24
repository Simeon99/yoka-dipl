import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import '../en/home-page/home.json'
// import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: window.localStorage.getItem("t")
  ? JSON.parse(window.localStorage.getItem("t"))
  : 'sr',
  fallbackLng: window.localStorage.getItem("t")
  ? JSON.parse(window.localStorage.getItem("t"))
  : 'sr',
  resources: {
    en: {
      translations: require('../en/home-page/translations.json')
    },
    sr: {
      translations: require('../sr/home-page/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'sr'];

export default i18n;
