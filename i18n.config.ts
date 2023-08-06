import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const {
    languageDetectorPlugin
} = require('./src/utils/languageDetectorPlugin');

import { NativeModules, Platform } from 'react-native';
import detector from 'i18next-browser-languagedetector';

//const locale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
let locale;
if (Platform.OS === 'ios') {
    locale = NativeModules.SettingsManager.settings.AppleLocale; // "fr_FR"
    if (locale === undefined) {
        // iOS 13 workaround, take first of AppleLanguages array  ["en", "en-NZ"]
        locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
        if (locale == undefined) {
            locale = 'en'; // default language
        }
    }
} else {
    locale = NativeModules.I18nManager.localeIdentifier;
}

import { en_US, es_US, fr_FR } from './src/i18n';

const resources = {
    en: {
        translation: en_US
    },
    es: {
        translation: es_US
    },
    fr: {
        translation: fr_FR
    }
};

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: 'en',
        fallbackLng: 'en', // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
