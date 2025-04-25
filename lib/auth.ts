'use server';

import { cookies } from 'next/headers';

export const setTokenCookie = async (token: string) => {
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24,
    });
};

export const getTokenFromCookie =async  () => {
    const cookieStore = await cookies()

    return cookieStore.get('token')?.value || null;
};