'use server';

import { cookies } from 'next/headers';

const baseURL = process.env.API_URL || 'http://localhost:3000';

export default async function client(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt');
  const token = jwtToken?.value;

  console.log({ token });

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${jwtToken?.value}` : '',
    },
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${response.statusText}`,
    );
  }

  return response;
}
