const baseURL = process.env.NEXT_API_URL || 'http://localhost:3000';

export default async function client(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: localStorage.getItem('jwt') || '',
    },
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${response.statusText}`,
    );
  }

  return response;
}
