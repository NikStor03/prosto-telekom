import { NextRequest, NextResponse } from 'next/server';

import { Cookies } from '@constants/cookies';
import { AuthRoutes, Routes } from '@constants/routes';
import { getCookie } from '@proxy/cookies';

export async function proxy(request: NextRequest) {
  const accessToken = getCookie({ request, name: Cookies.ACCESS_TOKEN });

  const currentPath = request.nextUrl.pathname;

  if (!AuthRoutes.includes(currentPath) && !accessToken) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }

  if (AuthRoutes.includes(currentPath) && accessToken) {
    return NextResponse.redirect(new URL(Routes.Dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)',
  ],
};
