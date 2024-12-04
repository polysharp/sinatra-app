import { AppMain, AppTopbar } from '@/components/layout';

export default async function Sites({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaceId = (await params).workspaceId;

  return (
    <>
      <AppTopbar
        paths={[
          { label: 'Workspace', href: `/workspaces/${workspaceId}` },
          { label: 'Sites', href: `/workspaces/${workspaceId}/sites` },
        ]}
      />
      <AppMain>
        <h2 className="text-sm">Sites</h2>
      </AppMain>
    </>
  );
}
