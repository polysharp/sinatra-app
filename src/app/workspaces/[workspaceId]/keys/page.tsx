import { AppMain, AppTopbar } from '@/components/layout';

export default async function Keys({
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
          { label: 'Keys', href: `/workspaces/${workspaceId}/keys` },
        ]}
      />
      <AppMain>Page</AppMain>
    </>
  );
}
