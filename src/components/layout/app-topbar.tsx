import { Separator, SidebarTrigger } from '@/components/ui';
import { AppBreadcrumb } from './components';

export default function AppTopbar({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border bg-sidebar px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <AppBreadcrumb />
      <div className="flex flex-grow items-center justify-between">
        {children}
      </div>
    </header>
  );
}
