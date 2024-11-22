'use server';

import { revalidateTag } from 'next/cache';

import { Domain } from '@/interfaces';

import httpClient from './client';
import { CreateDomain } from './schemas';

export async function createDomain(values: CreateDomain): Promise<Domain> {
  const response = await httpClient('/domains', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  revalidateTag('domains');

  return data as Domain;
}

export async function getDomains(workspaceId: string): Promise<Domain[]> {
  const response = await httpClient(`/domains?workspaceId=${workspaceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['domains'],
    },
  });

  const data = await response.json();
  return data as Domain[];
}

export async function verifyDomain(domainId: string) {
  await httpClient(`/domains/${domainId}/verify`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  revalidateTag('domains');
}
