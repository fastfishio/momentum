'use client';

import React, { useCallback, useMemo } from 'react';

import { Trans } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useTranslationClient } from '_core/i18n/i18nClient';
import { TLocaleSEO } from '_core/types/locale';
import { ECountrySeo, ELanguage } from '_core/constants/locale';

import styles from './Footer.module.scss';

type TProps = {
    seoLocale: TLocaleSEO;
};

const Footer = ({ seoLocale }: TProps) => {
    const pathname = usePathname();

    const i18n = useTranslationClient(seoLocale);

    const [currentSeoCountry, currentLang] = useMemo(
        () => seoLocale.split('-') as [ECountrySeo, ELanguage],
        [seoLocale],
    );

    const newLang = useMemo(() => (currentLang === 'en' ? 'ar' : 'en'), [currentLang]);

    const handleSwitchLanguage = useCallback(() => {
        i18n.changeLanguage(newLang);
    }, [newLang]);

    const newUrl = useMemo(() => {
        const newSeoLocale = `${currentSeoCountry}-${newLang}`;
        const pathnameWithoutSeoLocale = pathname.replace(`/${seoLocale}`, '');
        return `/${newSeoLocale}${pathnameWithoutSeoLocale || '/'}`;
    }, [currentSeoCountry, newLang]);

    const LanguageText = <b className={styles.lang}>{newLang}</b>;

    return (
        <footer className={styles.container}>
            <Link className={styles.langSwitch} href={newUrl} onClick={handleSwitchLanguage}>
                <Trans
                    t={i18n.t}
                    i18nKey="_footer_language-switcher"
                    values={{ lang: newLang }}
                    components={{ span: <span />, text: LanguageText }}
                />
            </Link>
            <span className={styles.copy}>&copy; {new Date().getFullYear()} noon.com</span>
        </footer>
    );
};

export default Footer;
