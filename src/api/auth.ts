'use server';

import { cookies } from 'next/headers';

import httpClient from './client';
import { Sign } from './schemas';

function getCookieValueFromSetCookieHeader(
  cookieName: string,
  setCookieHeader: string,
) {
  const cookieRegex = new RegExp(`(?:^|; )${cookieName}=([^;]*)`);
  const match = cookieRegex.exec(setCookieHeader);

  return match ? decodeURIComponent(match[1]) : null;
}

export async function createUser(values: Sign): Promise<void> {
  const cookiesStore = await cookies();
  const response = await httpClient('/auth/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    const sessionToken = getCookieValueFromSetCookieHeader(
      'session',
      setCookieHeader,
    );

    if (sessionToken) {
      cookiesStore.set({
        name: 'session',
        value: sessionToken,
        domain: 'sinatra.polysharp.fr',
        maxAge: 2592000,
        sameSite: true,
        httpOnly: true,
        secure: true,
      });
    }
  }

  return;
}
