import React from 'react';

import Link from 'next/link';
import clsx from 'clsx';

import { ECountrySeo, ELanguage } from '_core/constants/locale';
import { TLocaleSEO } from '_core/types/locale';
import coreConfig from '_core/config';

import styles from './LanguageSwitcher.module.scss';

type TProps = {
    seoLocale: TLocaleSEO;
};

const LanguageSwitcher = async ({ seoLocale }: TProps) => {
    const [currentRegion, currentLang] = seoLocale.split('-') as [ECountrySeo, ELanguage];

    return (
        <div className={styles.container}>
            <div className={styles.switcher}>
                {coreConfig.languages.map((language) => (
                    <Link
                        key={`lang-${language}`}
                        className={clsx(styles.language, { [styles.active]: currentLang === language })}
                        href={`/${currentRegion}-${language}`}>
                        {language}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
