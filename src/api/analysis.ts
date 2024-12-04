'use server';

import { Analysis } from '@/interfaces';
import httpClient from './client';

export async function getLastAnalysis(
  workspaceId: string,
  siteId: string,
): Promise<Analysis | null> {
  const response = await httpClient(
    `/analyses?workspaceId=${workspaceId}&siteId=${siteId}&limit=1`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = (await response.json()) as Analysis[];

  return data.length ? { ...data[0] } : null;
}

export async function getRangeAnalysis(
  workspaceId: string,
  siteId: string,
  query?: {
    startDate?: string;
    endDate?: string;
  },
): Promise<Analysis[]> {
  let url = `/analyses?workspaceId=${workspaceId}&siteId=${siteId}`;

  if (query?.startDate) {
    url += `&startDate=${query.startDate}`;
  }

  if (query?.endDate) {
    url += `&endDate=${query.endDate}`;
  }

  const response = await httpClient(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return (data as Analysis[]).reverse();
}
