import React from 'react';

import { dir } from 'i18next';

import '_core/styles/theme.scss';
import { TLocaleSEO } from '_core/types/locale';
import { ELanguage } from '_core/constants/locale';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Main from '@/components/Main';

type TProps = {
    params: { seoLocale: TLocaleSEO };
    children: React.ReactNode;
};

const RootLayout = async ({ params: { seoLocale }, children }: TProps) => {
    const [, lang] = seoLocale.split('-') as [unknown, ELanguage];

    return (
        <html lang={lang} dir={dir(lang)}>
            <body>
                <Header seoLocale={seoLocale} />
                <Main>{children}</Main>
                <Footer seoLocale={seoLocale} />
            </body>
        </html>
    );
};

export default RootLayout;
