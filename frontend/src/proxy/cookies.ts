import { NextRequest, NextResponse } from 'next/server';

import { Env } from '@constants/env';

export interface SetCookieParams {
  response: NextResponse;
  name: string;
  value: string;
  maxAge: number;
}

export interface GetCookieParams {
  request: NextRequest;
  name: string;
}

export interface DeleteCookieParams {
  response: NextResponse;
  name: string;
}

export function setCookie({ response, name, value, maxAge }: SetCookieParams) {
  response.cookies.set(name, value, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: Env.NODE_ENV === 'production',
    maxAge: maxAge,
  });
}

export function getCookie({
  request,
  name,
}: GetCookieParams): string | undefined {
  return request?.cookies.get(name)?.value;
}

export function deleteCookie({ response, name }: DeleteCookieParams) {
  response.cookies.set(name, '', {
    path: '/',
    maxAge: 0,
  });
}
