'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateWorkspaces() {
  revalidateTag('workspaces');
}
