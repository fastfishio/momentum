import { ECountryApi, ECountrySeo, ELanguage } from './constants/locale';
import { TLocaleAPI, TLocaleSEO } from './types/locale';

const regions = [ECountryApi.UAE, ECountryApi.Saudi, ECountryApi.Egypt];
const countries = [ECountrySeo.UAE, ECountrySeo.Saudi, ECountrySeo.Egypt];
const languages = [ELanguage.English, ELanguage.Arabic];

const generateLocales = () => {
    return countries.reduce(
        (acc, country) => [...acc, ...languages.map((language) => `${country}-${language}` as TLocaleSEO)],
        [] as TLocaleSEO[],
    );
};

const generateApiLocales = () => {
    return regions.reduce(
        (acc, country) => [...acc, ...languages.map((language) => `${language}-${country}` as TLocaleAPI)],
        [] as TLocaleAPI[],
    );
};

const coreConfig = {
    regions,
    countries,
    languages,
    locales: generateLocales(),
    localesApi: generateApiLocales(),
} as const;

export default coreConfig;
