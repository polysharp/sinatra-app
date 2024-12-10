import { AppMain, AppTopbar } from '@/components/layout';

export default async function Analyses({
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
          { label: 'Analyses', href: `/workspaces/${workspaceId}/analyses` },
        ]}
      />
      <AppMain>Page</AppMain>
    </>
  );
}
