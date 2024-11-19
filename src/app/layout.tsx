import type { Metadata } from 'next';

import '@/styles/tailwind.css';

import { CreateDomainDialog, CreateSiteDialog } from '@/components/dialogs';
import { AppSidebar, AppTopbar } from '@/components/layout';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Sinatra',
  description: 'Sinatra optimized your website SEO',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="dark">
        <SidebarProvider>
          <AppSidebar />

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
      </body>
    </html>
  );
}
