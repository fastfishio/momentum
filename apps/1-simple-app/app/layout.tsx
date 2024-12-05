import React from 'react';

import '_core/styles/theme.scss';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Main from '@/components/Main';

type TProps = {
    children: React.ReactNode;
};

const RootLayout = ({ children }: TProps) => {
    return (
        <html lang="en">
            <body>
                <Header />
                <Main>{children}</Main>
                <Footer />
                <div id="portal"></div>
            </body>
        </html>
    );
};

export default RootLayout;
