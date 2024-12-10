import { AppMain, AppTopbar } from '@/components/layout';

export default async function Domains({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaceId = (await params).workspaceId;

  // const sites = await getSites(workspaceId);

  return (
    <>
      <AppTopbar
        paths={[
          { label: 'Workspace', href: `/workspaces/${workspaceId}` },
          { label: 'Domains', href: `/workspaces/${workspaceId}/domains` },
        ]}
      />
      <AppMain>Page</AppMain>
    </>
  );
}
