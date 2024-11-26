import { getDomains } from '@/api';
import { WorkspaceActions } from '@/components';

export default async function Home({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaceId = (await params).workspaceId;
  const domains = await getDomains(workspaceId);

  return (
    <>
      <WorkspaceActions workspaceId={workspaceId} workspaceDomains={domains} />
      <h2 className="text-sm">Workspace home page</h2>
    </>
  );
}
