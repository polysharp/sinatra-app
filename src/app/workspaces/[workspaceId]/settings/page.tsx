import { AppMain, AppTopbar } from '@/components/layout';

export default async function Settings({
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
          { label: 'Settings', href: `/workspaces/${workspaceId}/settings` },
        ]}
      />
      <AppMain>Page</AppMain>
    </>
  );
}
