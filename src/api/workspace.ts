import { Workspace } from '@/interfaces';

export async function getWorkspace(): Promise<Workspace> {
  return Promise.resolve<Workspace>({
    id: 0,
    name: 'Polysharp',
  });
}
