import type { Metadata } from 'next';

import '@/styles/tailwind.css';

import CreateDomainDialog from '@/components/dialogs/create-domain-dialog';
import CreateSiteDialog from '@/components/dialogs/create-site-dialog';
import { AppSidebar } from '@/components/layout/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';

export const metadata: Metadata = {
  title: 'Sinatra',
  description: 'Sinatra optimized your website SEO',
};

export default function RootLayout({
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
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#252525] bg-[#111111] px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 h-4 w-[1px] shrink-0 bg-border"
              />
              <div className="flex flex-grow items-center justify-between">
                <div>Topbar</div>
                <div className="flex items-center justify-center gap-2">
                  <CreateDomainDialog />
                  <CreateSiteDialog />
                </div>
              </div>
            </header>

            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
