import { getDomains, getWorkspace } from '@/api';
import { CreateDomainDialog, CreateSiteDialog } from '@/components/dialogs';
import { AppSidebar, AppTopbar } from '@/components/layout';
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
  const domains = await getDomains(workspaceId);

  return (
    <SidebarProvider>
      <AppSidebar workspace={workspace} />

      <SidebarInset>
        <AppTopbar>
          <div>Topbar</div>
          <div className="flex items-center justify-center gap-2">
            <CreateDomainDialog />
            <CreateSiteDialog domains={domains} />
          </div>
        </AppTopbar>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
