import { getApiKeys, getDomains } from '@/api';
import { WorkspaceActions } from '@/components';

export default async function Home({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaceId = (await params).workspaceId;

  const domainsPromise = getDomains(workspaceId);
  const apiKeysPrimise = getApiKeys(workspaceId);

  const [domains, apiKeys] = await Promise.all([
    domainsPromise,
    apiKeysPrimise,
  ]);

  return (
    <>
      <WorkspaceActions
        workspaceId={workspaceId}
        workspaceDomains={domains}
        workspaceApiKeys={apiKeys}
      />
      <h2 className="text-sm">Workspace home page</h2>
    </>
  );
}
