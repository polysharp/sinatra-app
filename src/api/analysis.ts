'use server';

import { Analysis, AnalysisStatus } from '@/interfaces';
import httpClient from './client';

export async function getLastAnalysis(
  workspaceId: string,
  siteId: string | null,
  status: AnalysisStatus[] = [AnalysisStatus.SUCCESS],
): Promise<Analysis | null> {
  const queryParams = new URLSearchParams({
    workspaceId: workspaceId,
    limit: '1',
  });

  status.forEach((stat) => queryParams.append('status', stat as string));

  if (siteId) {
    queryParams.append('siteId', siteId);
  }

  const response = await httpClient(`/analyses?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = (await response.json()) as Analysis[];

  return data.length ? { ...data[0] } : null;
}

export async function getRangeAnalysis(
  workspaceId: string,
  siteId: string | null,
  query?: {
    limit?: number | string;
    startDate?: string;
    endDate?: string;
  },
): Promise<Analysis[]> {
  const queryParams = new URLSearchParams({
    workspaceId: workspaceId,
    limit: `${query?.limit}` || '1',
  });

  if (siteId) {
    queryParams.append('siteId', siteId);
  }

  if (query?.startDate) {
    queryParams.append('startDate', query.startDate);
  }

  if (query?.endDate) {
    queryParams.append('endDate', query.endDate);
  }

  const response = await httpClient(`/analyses?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return (data as Analysis[]).reverse();
}
