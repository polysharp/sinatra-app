import Link from 'next/link';

import { getApiKeys, getDomains, getSites } from '@/api';
import { WorkspaceActions } from '@/components';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { AppMain, AppTopbar } from '@/components/layout';

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
            <Link
              key={site.id}
              href={`/workspaces/${workspaceId}/${site.id}`}
              className="rounded-md bg-sidebar text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            >
              <Card className="border-none bg-transparent">
                <CardHeader>
                  <CardTitle>{site.name}</CardTitle>
                  <CardDescription>{site.createdAt}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </AppMain>
    </>
  );
}
