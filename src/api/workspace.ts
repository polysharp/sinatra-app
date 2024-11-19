import { Workspace } from '@/interfaces';
import { notFound } from 'next/navigation';

const fakeWorkspaces: Workspace[] = [
  {
    id: 0,
    name: 'Polysharp',
  },
  {
    id: 1,
    name: 'Yopta',
  },
];

export async function getWorkspaces(): Promise<Workspace[]> {
  return Promise.resolve<Workspace[]>(fakeWorkspaces);
}

export async function getWorkspace(workspaceId: string): Promise<Workspace> {
  const workspace = fakeWorkspaces.find((fw) => `${fw.id}` === workspaceId);

  if (!workspace) {
    throw notFound();
  }

  return Promise.resolve<Workspace>(workspace);
}
