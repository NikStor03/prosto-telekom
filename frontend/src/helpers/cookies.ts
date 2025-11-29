'use server';

import { cookies } from 'next/headers';

import { Env } from '@constants/env';

export interface SetCookieParams {
  name: string;
  value: string;
  maxAge: number;
}

export interface GetCookieParams {
  name: string;
}

export async function setCookie({ name, value, maxAge }: SetCookieParams) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: Env.NODE_ENV === 'production',
    maxAge: maxAge,
  });
}

export async function getCookie({
  name,
}: GetCookieParams): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function deleteCookie({ name }: GetCookieParams) {
  const cookieStore = await cookies();
  cookieStore.set(name, '', {
    path: '/',
    maxAge: 0,
  });
}
