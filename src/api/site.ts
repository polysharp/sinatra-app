import { Site } from '@/interfaces';

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
