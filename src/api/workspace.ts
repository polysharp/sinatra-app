'use server';

import { revalidateTag } from 'next/cache';

import { Workspace } from '@/interfaces';
import { httpClient } from '@/lib';

import { CreateWorkspace } from './schemas';

export async function createWorkspace(
  values: CreateWorkspace,
): Promise<Workspace> {
  const response = await httpClient('/workspaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();

  revalidateTag('workspaces');

  return data as Workspace;
}

export async function getWorkspaces(): Promise<Workspace[]> {
  const response = await httpClient('/workspaces', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['workspaces'],
    },
  });

  const data = await response.json();
  return data as Workspace[];
}

export async function getWorkspace(workspaceId: string): Promise<Workspace> {
  const response = await httpClient(`/workspaces/${workspaceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: [`/workspaces/${workspaceId}`],
    },
  });

  const data = await response.json();
  return data as Workspace;
}
