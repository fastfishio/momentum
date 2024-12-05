import React from 'react';

import { useTranslationServer } from '_core/i18n/i18nServer';
import { TLocaleSEO } from '_core/types/locale';

import styles from './Header.module.scss';

type TProps = {
    seoLocale: TLocaleSEO;
};

const Header = async ({ seoLocale }: TProps) => {
    const { t } = await useTranslationServer(seoLocale);

    return <header className={styles.container}>{t('_header_title')}</header>;
};

export default Header;
