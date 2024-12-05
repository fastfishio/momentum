export enum ECountryApi {
    UAE = 'ae',
    Saudi = 'sa',
    Egypt = 'eg',
}

export enum ECountrySeo {
    UAE = 'uae',
    Saudi = 'saudi',
    Egypt = 'egypt',
}

export enum ELanguage {
    English = 'en',
    Arabic = 'ar',
}

export const RTLLanguages = [ELanguage.Arabic];

export const getApiCountryForSeoCountry = (seoCountry: ECountrySeo): ECountryApi => {
    switch (seoCountry) {
        case ECountrySeo.Saudi: {
            return ECountryApi.Saudi;
        }
        case ECountrySeo.Egypt: {
            return ECountryApi.Egypt;
        }
        default: {
            return ECountryApi.UAE;
        }
    }
};

export const getSeoCountryForApiCountry = (apiCountry: ECountryApi): ECountrySeo => {
    switch (apiCountry) {
        case ECountryApi.Saudi: {
            return ECountrySeo.Saudi;
        }
        case ECountryApi.Egypt: {
            return ECountrySeo.Egypt;
        }
        default: {
            return ECountrySeo.UAE;
        }
    }
};

export const LOCALE_COOKIE_KEY = 'nloc';
