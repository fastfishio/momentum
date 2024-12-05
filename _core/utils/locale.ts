import { ECountrySeo, ELanguage, getApiCountryForSeoCountry, RTLLanguages } from '_core/constants/locale';
import { TLocaleAPI, TLocaleConfig, TLocaleSEO } from '_core/types/locale';

export const getLocaleConfig = (seoLocale: TLocaleSEO): TLocaleConfig => {
    if (!seoLocale) {
        throw new Error('Locale not defined');
    }

    const [seoCountry, lang] = seoLocale.split('-') as [ECountrySeo, ELanguage];
    const apiCountry = getApiCountryForSeoCountry(seoCountry);
    const apiLocale: TLocaleAPI = `${lang}-${apiCountry}`;

    return {
        lang,
        apiCountry,
        seoCountry,
        seoLocale,
        apiLocale,
        isRtl: RTLLanguages.includes(lang),
    };
};

export const getLangFromPathname = (pathname?: string) => {
    const locale = pathname?.split('/')?.[1];
    const [, lang] = (locale?.split('-') || []) as [unknown, ELanguage];
    return lang;
};
