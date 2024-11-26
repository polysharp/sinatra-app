'use server';

import { revalidateTag } from 'next/cache';

import { ApiKey } from '@/interfaces';

import httpClient from './client';
import { CreateApiKey } from './schemas';

export async function createApiKey(values: CreateApiKey): Promise<ApiKey> {
  const response = await httpClient('/api-keys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  revalidateTag('api-keys');

  return data as ApiKey;
}

export async function getApiKeys(workspaceId: string): Promise<ApiKey[]> {
  const response = await httpClient(`/api-keys?workspaceId=${workspaceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['domains'],
    },
  });

  const data = await response.json();
  return data as ApiKey[];
}
