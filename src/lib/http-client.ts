'use client';

export default async function httpClient(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2000';

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${response.statusText}`,
    );
  }

  return response;
}
