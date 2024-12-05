'use client';

import { useState, useEffect, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { ELanguage, LOCALE_COOKIE_KEY } from '_core/constants/locale';
import { getCookie, setCookie } from '_core/utils/client';
import coreConfig from '_core/config';
import { getLangFromPathname, getLocaleConfig } from '_core/utils/locale';
import { TLocaleSEO } from '_core/types/locale';

import initializeI18n from './initializeI18n';
import config from './config';

const isStreamingOnServer = typeof window === 'undefined';
const lang = !isStreamingOnServer ? getLangFromPathname(window?.location?.pathname) : coreConfig.languages[0];
// Need to bundle client initialization - https://react.i18next.com/latest/using-with-hooks
initializeI18n(lang as ELanguage);

export const useTranslationClient = (seoLocale: TLocaleSEO) => {
    const localeConfig = getLocaleConfig(seoLocale);

    const [, seoLocaleLang] = (seoLocale?.split('-') || []) as [unknown, ELanguage];

    const apiLocaleFromCookie = getCookie(LOCALE_COOKIE_KEY);
    const [langFromCookie] = (apiLocaleFromCookie?.split('-') || []) as [ELanguage, unknown];

    const lang = seoLocaleLang || langFromCookie || coreConfig.languages[0];

    const { i18n } = useTranslation(lang || langFromCookie, config);

    const changeLanguage = useCallback((newLang: string) => {
        setCookie(LOCALE_COOKIE_KEY, `${newLang}-${localeConfig.apiCountry}`);
        i18n.changeLanguage(newLang);
    }, []);

    if (isStreamingOnServer && lang && i18n.resolvedLanguage !== lang) {
        i18n.changeLanguage(lang);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (activeLng === i18n.resolvedLanguage) return;
            setActiveLng(i18n.resolvedLanguage);
        }, [activeLng, i18n.resolvedLanguage]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!lang || i18n.resolvedLanguage === lang) return;
            i18n.changeLanguage(lang);
        }, [lang, i18n]);
    }

    return { ...i18n, changeLanguage };
};
