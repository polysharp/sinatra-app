import { getWorkspace } from '@/api';
import { AppSidebar } from '@/components/layout';
import { SidebarInset, SidebarProvider } from '@/components/ui';

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const workspaceId = (await params).workspaceId;

  const workspace = await getWorkspace(workspaceId);

  return (
    <SidebarProvider>
      <AppSidebar workspace={workspace} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
