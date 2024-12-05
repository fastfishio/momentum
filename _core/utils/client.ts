'use client';

import Cookies from 'universal-cookie';

const isClient = typeof window !== 'undefined';

export const getCookie = (key: string) => {
    if (!isClient) {
        return null;
    }

    return new Cookies().get(key);
};

export const setCookie = (key: string, value: string) => {
    if (!isClient) {
        return null;
    }

    return new Cookies().set(key, value, { secure: true, path: '/' });
};
