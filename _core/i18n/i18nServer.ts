import { UseTranslationResponse } from 'react-i18next';
import i18next from 'i18next';

import { ELanguage } from '_core/constants/locale';
import { TLocaleSEO } from '_core/types/locale';

import initializeI18n from './initializeI18n';

export const useTranslationServer = async (seoLocale: TLocaleSEO) => {
    const [, lang] = (seoLocale.split('-') || []) as [unknown, ELanguage];
    await initializeI18n(lang);

    if (!i18next.isInitialized) {
        throw new Error('i18n is not initialized - server');
    }

    return {
        t: i18next.getFixedT(i18next.language),
        i18n: i18next,
        ready: true,
    } as UseTranslationResponse<'translation', undefined>;
};
