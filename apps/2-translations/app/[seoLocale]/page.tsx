import React from 'react';

import { TLocaleSEO } from '_core/types/locale';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import Counter from '@/components/Counter';

type TProps = {
    params: {
        seoLocale: TLocaleSEO;
    };
};

const HomePage = ({ params: { seoLocale } }: TProps) => {
    return (
        <>
            <LanguageSwitcher seoLocale={seoLocale} />
            <Counter seoLocale={seoLocale} />
        </>
    );
};

export default HomePage;
