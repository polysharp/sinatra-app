import Link from 'next/link';

import { getWorkspaces } from '@/api';
import { CreateWorkspaceDialog } from '@/components/dialogs';

export default async function Home() {
  const workspaces = await getWorkspaces();

  return (
    <div>
      <h2 className="text-sm">Page</h2>
      <ul>
        {workspaces.map((workspace) => (
          <li key={workspace.id}>
            <Link href={`/workspaces/${workspace.id}`}>{workspace.name}</Link>
          </li>
        ))}
      </ul>

      <CreateWorkspaceDialog />
    </div>
  );
}
