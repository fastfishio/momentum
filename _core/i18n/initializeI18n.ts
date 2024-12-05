import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
// !! IMPORTANT !! -- please do not change the import
// !! IMPORTANT !! -- from `react-i18next/initReactI18next` to `react-i18next`
import { initReactI18next } from 'react-i18next/initReactI18next';

import config from '_core/i18n/config';
import coreConfig from '_core/config';
import { ELanguage } from '_core/constants/locale';

const initializeI18n = (lang?: ELanguage) =>
    i18next
        .use(LanguageDetector)
        .use(resourcesToBackend((language: string) => import(`./${language}.json`)))
        .use(initReactI18next)
        .init({
            ...config,
            lng: lang,
            fallbackLng: coreConfig.languages[0],
            detection: {
                order: ['path', 'htmlTag', 'navigator'],
            },
            preload: coreConfig.languages,
        });

export default initializeI18n;
