import { AppMain, AppTopbar } from '@/components/layout';

export default async function Members({
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
          { label: 'Members', href: `/workspaces/${workspaceId}/members` },
        ]}
      />
      <AppMain>Page</AppMain>
    </>
  );
}
