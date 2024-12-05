import { getApiKeys, getDomains, getSites } from '@/api';
import { WorkspaceActions } from '@/components';
import { AppMain, AppTopbar } from '@/components/layout';
import SiteCard from '@/components/site-card';

export default async function WorkspaceWithId({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaceId = (await params).workspaceId;

  const domainsPromise = getDomains(workspaceId);
  const apiKeysPromise = getApiKeys(workspaceId);
  const sitesPromise = getSites(workspaceId);

  const [domains, apiKeys, sites] = await Promise.all([
    domainsPromise,
    apiKeysPromise,
    sitesPromise,
  ]);

  return (
    <>
      <AppTopbar />
      <AppMain>
        <WorkspaceActions
          workspaceId={workspaceId}
          workspaceDomains={domains}
          workspaceApiKeys={apiKeys}
          workspaceSites={sites}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {sites.map((site) => (
            <SiteCard key={site.id} workspaceId={workspaceId} site={site} />
          ))}
        </div>
      </AppMain>
    </>
  );
}
