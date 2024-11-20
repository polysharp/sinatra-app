import {
  Domain,
  DomainVerificationStatus,
  Site,
  Workspace,
} from '@/interfaces';

import httpClient from './clients/browserClient';
import serverClient from './clients/serverClient';
import { CreateWorkspace } from './schemas';

export async function getWorkspaces(): Promise<Workspace[]> {
  const response = await serverClient('/workspaces', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['workspaces'] },
  });

  const data = await response.json();
  return data as Workspace[];
}

export async function getWorkspace(workspaceId: string): Promise<Workspace> {
  const response = await serverClient(`/workspaces/${workspaceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: [`/workspaces/${workspaceId}`] },
  });

  const data = await response.json();
  return data as Workspace;
}

export async function createWorkspace(
  payload: CreateWorkspace,
): Promise<Workspace> {
  const response = await httpClient('/workspaces', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data as Workspace;
}

export async function getSites(): Promise<Site[]> {
  return Promise.resolve<Site[]>([
    {
      id: 0,
      domain: 'polysharp.fr',
      apiKey: '0101-abcde-0101',
      status: 'pending',
    },
  ]);
}

const fakeDomains: Domain[] = [
  {
    id: '1',
    workspaceId: '0',
    name: 'polysharp.fr',
    verificationKey: 'sinatra-site-verification=abcde',
    verificationStatus: DomainVerificationStatus.VERIFIED,
    verifiedAt: new Date('2023-11-01'),
    updatedAt: new Date(),
    createdAt: new Date('2023-10-25'),
  },
  {
    id: '2',
    workspaceId: '0',
    name: 'example-workspace0.com',
    verificationKey: 'sinatra-site-verification=klmno',
    verificationStatus: DomainVerificationStatus.VERIFIED,
    verifiedAt: new Date('2023-11-15'),
    updatedAt: new Date(),
    createdAt: new Date('2023-11-10'),
  },
  {
    id: '3',
    workspaceId: '0',
    name: 'test-verified0.net',
    verificationKey: 'sinatra-site-verification=verifiedkey0',
    verificationStatus: DomainVerificationStatus.VERIFIED,
    verifiedAt: new Date('2023-11-20'),
    updatedAt: new Date(),
    createdAt: new Date('2023-11-18'),
  },
  {
    id: '4',
    workspaceId: '0',
    name: 'pending-domain0.org',
    verificationKey: 'sinatra-site-verification=pending0',
    verificationStatus: DomainVerificationStatus.PENDING,
    verifiedAt: null,
    updatedAt: new Date(),
    createdAt: new Date('2023-11-19'),
  },
  {
    id: '5',
    workspaceId: '0',
    name: 'failed-domain0.com',
    verificationKey: 'sinatra-site-verification=failed0',
    verificationStatus: DomainVerificationStatus.FAILED,
    verifiedAt: null,
    updatedAt: new Date(),
    createdAt: new Date('2023-11-15'),
  },
  {
    id: '6',
    workspaceId: '1',
    name: 'yopta.life',
    verificationKey: 'sinatra-site-verification=fghij',
    verificationStatus: DomainVerificationStatus.VERIFIED,
    verifiedAt: new Date('2023-11-01'),
    updatedAt: new Date(),
    createdAt: new Date('2023-10-25'),
  },
  {
    id: '7',
    workspaceId: '1',
    name: 'workspace1-verified.com',
    verificationKey: 'sinatra-site-verification=verifiedkey1',
    verificationStatus: DomainVerificationStatus.VERIFIED,
    verifiedAt: new Date('2023-11-10'),
    updatedAt: new Date(),
    createdAt: new Date('2023-11-08'),
  },
  {
    id: '8',
    workspaceId: '1',
    name: 'test-verified1.net',
    verificationKey: 'sinatra-site-verification=verifiedkey1-test',
    verificationStatus: DomainVerificationStatus.VERIFIED,
    verifiedAt: new Date('2023-11-18'),
    updatedAt: new Date(),
    createdAt: new Date('2023-11-15'),
  },
  {
    id: '9',
    workspaceId: '1',
    name: 'pending-domain1.org',
    verificationKey: 'sinatra-site-verification=pending1',
    verificationStatus: DomainVerificationStatus.PENDING,
    verifiedAt: null,
    updatedAt: new Date(),
    createdAt: new Date('2023-11-19'),
  },
  {
    id: '10',
    workspaceId: '1',
    name: 'failed-domain1.com',
    verificationKey: 'sinatra-site-verification=failed1',
    verificationStatus: DomainVerificationStatus.FAILED,
    verifiedAt: null,
    updatedAt: new Date(),
    createdAt: new Date('2023-11-12'),
  },
];

export async function getDomains(workspaceId: string): Promise<Domain[]> {
  return Promise.resolve<Domain[]>(
    fakeDomains.filter((v) => `${v.workspaceId}` === workspaceId),
  );
}
