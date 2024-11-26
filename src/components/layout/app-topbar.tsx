import { Separator, SidebarTrigger } from '@/components/ui';
import { AppBreadcrumb } from './components';

export default function AppTopbar({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex shrink-0 items-center gap-2 pb-3">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <AppBreadcrumb />
      <div className="flex flex-grow items-center justify-between">
        {children}
      </div>
    </header>
  );
}
