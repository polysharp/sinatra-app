import { getWorkspace } from '@/api';
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

  return (
    <SidebarProvider>
      <AppSidebar workspace={workspace} />

      <SidebarInset>
        <AppTopbar>
          <div className="flex items-center justify-center gap-2">
            <div className="h-10" />
          </div>
        </AppTopbar>

        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
