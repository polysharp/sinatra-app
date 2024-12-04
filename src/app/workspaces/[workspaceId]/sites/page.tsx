import Link from 'next/link';

import { getSites } from '@/api';
import { AppMain, AppTopbar } from '@/components/layout';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';

export default async function Sites({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaceId = (await params).workspaceId;

  const sites = await getSites(workspaceId);

  return (
    <>
      <AppTopbar
        paths={[
          { label: 'Workspace', href: `/workspaces/${workspaceId}` },
          { label: 'Sites', href: `/workspaces/${workspaceId}/sites` },
        ]}
      />
      <AppMain>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {sites.map((site) => (
            <Link
              key={site.id}
              href={`/workspaces/${workspaceId}/sites/${site.id}`}
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
