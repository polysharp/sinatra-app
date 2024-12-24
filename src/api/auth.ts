'use server';

import { cookies } from 'next/headers';

import { parseCookies } from '@/lib';

import httpClient from './client';
import { Sign } from './schemas';

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
    const cookies = parseCookies(setCookieHeader);
    const sessionCookie = cookies['session'];

    if (sessionCookie) {
      cookiesStore.set({
        ...sessionCookie,
        domain: 'sinatra.polysharp.fr',
        sameSite: true,
      });
    }
  }

  return;
}
