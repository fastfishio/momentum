import { ECountryApi, ECountrySeo, ELanguage } from '_core/constants/locale';

export type TLocaleAPI = `${ELanguage}-${ECountryApi}`;
export type TLocaleSEO = `${ECountrySeo}-${ELanguage}`;

export type TLocaleConfig = {
    lang: ELanguage;
    apiCountry: ECountryApi;
    seoCountry: ECountrySeo;
    seoLocale: TLocaleSEO;
    apiLocale: TLocaleAPI;
    isRtl: boolean;
};
