import { getWorkspace } from '@/api';
import { CreateDomainDialog, CreateSiteDialog } from '@/components/dialogs';
import { AppSidebar, AppTopbar } from '@/components/layout';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

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

      <SidebarInset>
        <AppTopbar>
          <div>Topbar</div>
          <div className="flex items-center justify-center gap-2">
            <CreateDomainDialog />
            <CreateSiteDialog />
          </div>
        </AppTopbar>

        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
