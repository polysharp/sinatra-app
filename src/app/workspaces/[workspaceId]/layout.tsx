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

  const workspaceFetch = getWorkspace(workspaceId);
  const domainsFetch = getDomains(workspaceId);

  const [workspace, domains] = await Promise.all([
    workspaceFetch,
    domainsFetch,
  ]);

  return (
    <SidebarProvider>
      <AppSidebar workspace={workspace} />

      <SidebarInset>
        <AppTopbar>
          <div />
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
