import { NextResponse } from 'next/server';
import type { NextRequest as TNextRequest, NextResponse as TNextResponse } from 'next/server';

import { TLocaleAPI } from '_core/types/locale';
import { ECountryApi, ELanguage, getSeoCountryForApiCountry, LOCALE_COOKIE_KEY } from '_core/constants/locale';
import coreConfig from '_core/config';
import { getLocaleConfig } from '_core/utils/locale';

export const config = {
    matcher: '/((?!_svc|_next|images|favicon.ico|image|ads.txt|app-ads.txt|hc).*)',
};

export const middleware = (request: TNextRequest): TNextResponse => {
    const host = request.headers.get('host');
    const { pathname, search } = request.nextUrl;

    const isPathnameMissingLocale = !coreConfig.locales.some(
        (localeSEO) => pathname.startsWith(`/${localeSEO}`) || pathname === `/${localeSEO}`,
    );

    let newUrl: string | undefined;
    let defaultSeoLocale = coreConfig.locales[0];

    const apiLocaleFromCookie = request.cookies.get(LOCALE_COOKIE_KEY)?.value as TLocaleAPI;

    let seoLocaleFromCookie;
    if (apiLocaleFromCookie && coreConfig.localesApi.includes(apiLocaleFromCookie)) {
        const [langFromCookie, apiRegionFromCookie] = apiLocaleFromCookie.split('-') as [ELanguage, ECountryApi];
        const seoRegion = getSeoCountryForApiCountry(apiRegionFromCookie);
        seoLocaleFromCookie = `${seoRegion}-${langFromCookie}`;
    }

    let newSeoLocale = seoLocaleFromCookie || defaultSeoLocale;
    let newApiLocale =
        newSeoLocale === seoLocaleFromCookie ? apiLocaleFromCookie : getLocaleConfig(defaultSeoLocale).apiLocale;

    // Let's redirect if there is no locale or app
    if (isPathnameMissingLocale) {
        newUrl = `https://${host}/${newSeoLocale}/${pathname}`;
        if (search) {
            newUrl = `${newUrl}${search}`;
        }
    } else {
        const seoLocaleFromPathname = coreConfig.locales.find(
            (localeSEO) => pathname.startsWith(`/${localeSEO}`) || pathname === `/${localeSEO}`,
        );
        if (seoLocaleFromPathname && newSeoLocale !== seoLocaleFromPathname) {
            const localeObject = getLocaleConfig(seoLocaleFromPathname);
            newApiLocale = localeObject.apiLocale;
        }
    }

    if (newUrl) {
        console.log('Redirecting to locale URL', newUrl);
        return NextResponse.redirect(newUrl);
    }

    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE_KEY, newApiLocale);

    return response;
};
