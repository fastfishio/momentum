'use client';

import React, { useCallback, useState } from 'react';

import { useTranslationClient } from '_core/i18n/i18nClient';
import { TLocaleSEO } from '_core/types/locale';

import styles from './Counter.module.scss';

type TProps = {
    seoLocale: TLocaleSEO;
};

const Counter = ({ seoLocale }: TProps) => {
    const { t } = useTranslationClient(seoLocale);

    const [count, setCount] = useState(0);
    const incrementCount = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    return (
        <>
            <div className={styles.content}>{t('_switcher-content', { count })}</div>
            <button type="button" className={styles.button} onClick={incrementCount}>
                {t('click-me')}
            </button>
        </>
    );
};

export default Counter;
