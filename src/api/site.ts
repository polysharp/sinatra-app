import { revalidateTag } from 'next/cache';

import { Site } from '@/interfaces';

import httpClient from './client';
import { CreateSite } from './schemas';

export async function createSite(values: CreateSite): Promise<Site> {
  const response = await httpClient('/sites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  revalidateTag('sites');

  return data as Site;
}
