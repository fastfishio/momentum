import { InitOptions } from 'i18next';

import coreConfig from '_core/config';

const config: InitOptions = {
    supportedLngs: coreConfig.languages,
    fallbackLng: coreConfig.languages[0],

    // Only load the current language, and not all.
    load: 'languageOnly',
    // What to do with missing translations
    saveMissing: true,
    saveMissingTo: 'all',
    parseMissingKeyHandler: (key: string) => {
        console.log('Missing Key:', key);

        return '';
    },
    // Turn on for debugging
    debug: false,
};

export default config;
